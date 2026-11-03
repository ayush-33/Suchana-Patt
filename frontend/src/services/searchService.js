import { mockJobs } from '../data/mockJobs.js';
import { mockAdmitCards } from '../data/mockAdmitCards.js';
import { mockResults } from '../data/mockResults.js';
import { mockAdmissions } from '../data/mockAdmissions.js';
import { mockScholarships } from '../data/mockScholarships.js';
import { mockSyllabus } from '../data/mockSyllabus.js';
import { mockAnswerKeys } from '../data/mockAnswerKeys.js';
import { formatDate } from '../utils/formatters.js';

/**
 * Splits query into clean search tokens
 */
function extractTokens(query) {
  if (!query || typeof query !== 'string') return [];
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Checks if all query tokens are present in the searchable text,
 * with support for common English plural/singular variations (e.g. card/cards, job/jobs, key/keys).
 */
function matchesQueryTokens(searchableText, tokens) {
  if (!tokens || tokens.length === 0) return true;
  const lowerText = (searchableText || '').toLowerCase();

  return tokens.every((token) => {
    if (lowerText.includes(token)) return true;

    // Check simple singular if token ends with 's' (e.g., 'cards' -> 'card', 'jobs' -> 'job')
    if (token.length > 3 && token.endsWith('s')) {
      const singular = token.slice(0, -1);
      if (lowerText.includes(singular)) return true;
    }

    // Check simple plural if token doesn't end with 's' (e.g., 'card' -> 'cards')
    if (token.length > 2 && !token.endsWith('s')) {
      if (lowerText.includes(token + 's')) return true;
    }

    return false;
  });
}

/**
 * Calculates a deterministic relevance score for search results
 */
function calculateRelevanceScore(item, query, tokens) {
  let score = 0;
  const qLower = (query || '').toLowerCase().trim();
  const titleLower = (item.title || '').toLowerCase();
  const orgLower = (item.organization || '').toLowerCase();
  const catLower = (item.category || '').toLowerCase();
  const typeLower = (item.typeLabel || '').toLowerCase();

  // Full exact title match gets highest score
  if (titleLower === qLower) {
    score += 200;
  } else if (titleLower.startsWith(qLower)) {
    score += 120;
  } else if (titleLower.includes(qLower)) {
    score += 80;
  }

  // Token matches
  tokens.forEach((token) => {
    if (titleLower.includes(token)) score += 35;
    if (orgLower.includes(token)) score += 20;
    if (catLower.includes(token) || typeLower.includes(token)) score += 15;
  });

  // Small freshness boost for active items
  if (item.statusType === 'open' || item.status === 'Released' || item.status === 'Declared') {
    score += 5;
  }

  return score;
}

/**
 * Sorts items according to selected criteria
 */
function sortItems(items, sortKey) {
  const sorted = [...items];
  switch (sortKey) {
    case 'latest':
      return sorted.sort((a, b) => {
        const timeA = a.sortDate ? new Date(a.sortDate).getTime() : 0;
        const timeB = b.sortDate ? new Date(b.sortDate).getTime() : 0;
        return timeB - timeA;
      });

    case 'deadline':
      return sorted.sort((a, b) => {
        const timeA = a.deadlineDate ? new Date(a.deadlineDate).getTime() : Infinity;
        const timeB = b.deadlineDate ? new Date(b.deadlineDate).getTime() : Infinity;
        return timeA - timeB;
      });

    case 'vacanciesDesc':
      return sorted.sort((a, b) => {
        const vacA = a.raw && typeof a.raw.vacancies === 'number' ? a.raw.vacancies : 0;
        const vacB = b.raw && typeof b.raw.vacancies === 'number' ? b.raw.vacancies : 0;
        return vacB - vacA;
      });

    case 'titleAsc':
      return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

    case 'relevance':
    default:
      return sorted.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }
}

/**
 * Derives available filter options and counts dynamically from matching items
 */
function deriveAvailableFilters(items) {
  const orgCounts = {};
  const statusCounts = {};
  const jobTypeCounts = {};
  const qualCounts = {};
  const catCounts = {};
  const levelCounts = {};

  items.forEach((item) => {
    // Organization
    if (item.organization) {
      orgCounts[item.organization] = (orgCounts[item.organization] || 0) + 1;
    }

    // Status
    if (item.status) {
      statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    }

    // Job Type
    if (item.jobType) {
      jobTypeCounts[item.jobType] = (jobTypeCounts[item.jobType] || 0) + 1;
    }

    // Category
    if (item.category) {
      catCounts[item.category] = (catCounts[item.category] || 0) + 1;
    }

    // Qualifications
    if (item.qualification) {
      const quals = Array.isArray(item.qualification) ? item.qualification : [item.qualification];
      quals.forEach((q) => {
        if (q && typeof q === 'string') {
          let cleanQ = q.trim();
          if (cleanQ.toLowerCase().includes('10th')) cleanQ = '10th Pass';
          else if (cleanQ.toLowerCase().includes('12th')) cleanQ = '12th Pass';
          else if (cleanQ.toLowerCase().includes('graduate') || cleanQ.toLowerCase().includes('bachelor')) cleanQ = 'Graduate';
          else if (cleanQ.toLowerCase().includes('post') || cleanQ.toLowerCase().includes('master')) cleanQ = 'Postgraduate';
          else if (cleanQ.toLowerCase().includes('diploma') || cleanQ.toLowerCase().includes('polytechnic')) cleanQ = 'Diploma';
          qualCounts[cleanQ] = (qualCounts[cleanQ] || 0) + 1;
        }
      });
    }

    // Level
    if (item.level) {
      levelCounts[item.level] = (levelCounts[item.level] || 0) + 1;
    }
  });

  const toList = (countsObj) =>
    Object.entries(countsObj)
      .map(([value, count]) => ({ value, label: value, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  return {
    organizations: toList(orgCounts),
    statuses: toList(statusCounts),
    jobTypes: toList(jobTypeCounts),
    qualifications: toList(qualCounts),
    categories: toList(catCounts),
    levels: toList(levelCounts)
  };
}

/**
 * Applies secondary faceted filters to items
 */
function applySecondaryFilters(items, filters = {}) {
  return items.filter((item) => {
    // 1. Organization filter
    if (filters.organization && filters.organization.length > 0) {
      if (!filters.organization.some((o) => o.toLowerCase() === (item.organization || '').toLowerCase())) {
        return false;
      }
    }

    // 2. Status filter
    if (filters.status && filters.status.length > 0) {
      const match = filters.status.some(
        (s) =>
          s.toLowerCase() === (item.status || '').toLowerCase() ||
          s.toLowerCase() === (item.statusType || '').toLowerCase()
      );
      if (!match) return false;
    }

    // 3. Job Type filter
    if (filters.jobType && filters.jobType.length > 0) {
      if (!item.jobType || !filters.jobType.some((j) => j.toLowerCase() === item.jobType.toLowerCase())) {
        return false;
      }
    }

    // 4. Qualification filter
    if (filters.qualification && filters.qualification.length > 0) {
      const itemQuals = Array.isArray(item.qualification)
        ? item.qualification.join(' ').toLowerCase()
        : (item.qualification || '').toLowerCase();

      const hasMatch = filters.qualification.some((q) => {
        const qLow = q.toLowerCase();
        if (qLow.includes('10th') && itemQuals.includes('10th')) return true;
        if (qLow.includes('12th') && itemQuals.includes('12th')) return true;
        if (qLow.includes('graduate') && (itemQuals.includes('graduate') || itemQuals.includes('bachelor') || itemQuals.includes('degree'))) return true;
        if (qLow.includes('post') && (itemQuals.includes('post') || itemQuals.includes('master'))) return true;
        if (qLow.includes('diploma') && (itemQuals.includes('diploma') || itemQuals.includes('polytechnic'))) return true;
        return itemQuals.includes(qLow);
      });
      if (!hasMatch) return false;
    }

    // 5. Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(item.category)) {
        return false;
      }
    }

    // 6. Level filter
    if (filters.level && filters.level.length > 0) {
      if (!item.level || !filters.level.includes(item.level)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Global search service across all recruitment and examination entities
 * Supports query matching, category partitioning, secondary faceted filtering, sorting and pagination.
 */
export async function searchAll(query = '', optionsOrActiveType = 'all') {
  // Simulate minimal asynchronous tick (10ms)
  await new Promise((resolve) => setTimeout(resolve, 10));

  let options = {};
  if (typeof optionsOrActiveType === 'string') {
    options = { activeType: optionsOrActiveType };
  } else if (optionsOrActiveType && typeof optionsOrActiveType === 'object') {
    options = optionsOrActiveType;
  }

  const activeType = options.activeType || 'all';
  const filters = options.filters || {};
  const sort = options.sort || 'relevance';
  const page = Math.max(1, parseInt(options.page || 1, 10));
  const limit = Math.max(1, parseInt(options.limit || 10, 10));

  const tokens = extractTokens(query);

  const emptyCounts = {
    all: 0,
    jobs: 0,
    'admit-cards': 0,
    results: 0,
    admissions: 0,
    scholarships: 0,
    syllabus: 0,
    'answer-keys': 0
  };

  const emptyAvailableFilters = {
    organizations: [],
    statuses: [],
    jobTypes: [],
    qualifications: [],
    categories: [],
    levels: []
  };

  // If query is empty or whitespace-only, return clean empty result structure
  if (tokens.length === 0) {
    return {
      query: '',
      tokens: [],
      counts: emptyCounts,
      availableFilters: emptyAvailableFilters,
      totalMatchesInType: 0,
      totalFiltered: 0,
      page: 1,
      limit,
      totalPages: 1,
      startIndex: 0,
      endIndex: 0,
      results: []
    };
  }

  // 1. Search Jobs
  const matchingJobs = mockJobs
    .filter((job) => {
      const searchable = [
        job.title,
        job.organization,
        job.category,
        job.department,
        job.location,
        Array.isArray(job.qualification) ? job.qualification.join(' ') : job.qualification,
        job.shortDescription,
        job.slug,
        job.jobType === 'private' ? 'private sector company job jobs' : 'government sarkari naukri job jobs recruitment'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((job) => {
      const item = {
        id: job.id,
        title: job.title,
        organization: job.organization,
        category: job.category,
        contentType: 'jobs',
        typeLabel: job.jobType === 'private' ? 'Private Job' : 'Government Job',
        jobType: job.jobType || 'government',
        status: job.status === 'open' ? 'Apply Open' : job.status || 'Active',
        statusType: job.status || 'open',
        qualification: job.qualification,
        dateLabel: 'Last Date',
        dateValue: formatDate(job.lastDate),
        sortDate: job.publishedAt || job.lastDate,
        deadlineDate: job.lastDate,
        destinationUrl: `/jobs/${job.id}`,
        actionUrl: null,
        actionText: 'View Job Details',
        raw: job
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 2. Search Admit Cards
  const matchingAdmitCards = mockAdmitCards
    .filter((ac) => {
      const searchable = [
        ac.examName,
        ac.organization,
        ac.category,
        ac.instructions,
        'admit card admit cards hall ticket call letter exam'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((ac) => {
      const item = {
        id: ac.id,
        title: ac.examName,
        organization: ac.organization,
        category: ac.category,
        contentType: 'admit-cards',
        typeLabel: 'Admit Card',
        status: ac.status,
        statusType: ac.status === 'Released' ? 'released' : ac.status === 'Not Available' ? 'closed' : 'upcoming',
        dateLabel: 'Exam Date',
        dateValue: ac.examDateText,
        sortDate: ac.releaseDate || ac.examDate,
        deadlineDate: ac.examDate,
        destinationUrl: ac.relatedJobId ? `/jobs/${ac.relatedJobId}` : `/admit-cards`,
        actionUrl: ac.downloadUrl || null,
        actionText: ac.downloadUrl ? 'Download Admit Card' : 'View Schedule',
        raw: ac
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 3. Search Results
  const matchingResults = mockResults
    .filter((res) => {
      const searchable = [
        res.examName,
        res.organization,
        res.category,
        res.summary,
        res.cutOffMarks,
        'result results scorecard marks cutoff merit list exam'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((res) => {
      const item = {
        id: res.id,
        title: res.examName,
        organization: res.organization,
        category: res.category,
        contentType: 'results',
        typeLabel: 'Examination Result',
        status: res.status,
        statusType: res.status === 'Declared' ? 'released' : 'upcoming',
        dateLabel: 'Declared On',
        dateValue: res.declarationDateText,
        sortDate: res.declarationDate,
        deadlineDate: res.declarationDate,
        destinationUrl: res.relatedJobId ? `/jobs/${res.relatedJobId}` : `/results`,
        actionUrl: res.resultUrl || null,
        actionText: 'Check Scorecard',
        raw: res
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 4. Search Admissions
  const matchingAdmissions = mockAdmissions
    .filter((adm) => {
      const searchable = [
        adm.title,
        adm.institution,
        adm.programCategory,
        adm.qualification,
        adm.description,
        'admission admissions entrance counselling exam'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((adm) => {
      const item = {
        id: adm.id,
        title: adm.title,
        organization: adm.institution,
        category: adm.programCategory,
        contentType: 'admissions',
        typeLabel: 'Admission / Entrance',
        status: adm.status,
        statusType: adm.status === 'Open' ? 'open' : 'upcoming',
        qualification: adm.qualification,
        level: adm.programCategory,
        dateLabel: 'Last Date',
        dateValue: formatDate(adm.lastDate),
        sortDate: adm.startDate || adm.lastDate,
        deadlineDate: adm.lastDate,
        destinationUrl: `/admissions`,
        actionUrl: adm.officialUrl || null,
        actionText: 'Admission Details',
        raw: adm
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 5. Search Scholarships
  const matchingScholarships = mockScholarships
    .filter((sch) => {
      const searchable = [
        sch.title,
        sch.department,
        sch.studentLevel,
        sch.eligibilityCriteria,
        sch.description,
        'scholarship scholarships grant fee reimbursement allowance'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((sch) => {
      const item = {
        id: sch.id,
        title: sch.title,
        organization: sch.department,
        category: sch.studentLevel,
        contentType: 'scholarships',
        typeLabel: 'Scholarship',
        status: sch.status,
        statusType: sch.status === 'Open' ? 'open' : 'closed',
        level: sch.studentLevel,
        dateLabel: 'Deadline',
        dateValue: formatDate(sch.lastDate),
        sortDate: sch.startDate || sch.lastDate,
        deadlineDate: sch.lastDate,
        destinationUrl: `/up-scholarship`,
        actionUrl: sch.officialPortalUrl || null,
        actionText: 'Scholarship Portal',
        raw: sch
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 6. Search Syllabus
  const matchingSyllabus = mockSyllabus
    .filter((syl) => {
      const searchable = [
        syl.examName,
        syl.organization,
        syl.category,
        syl.examLevel,
        (syl.sections || []).join(' '),
        syl.summary,
        'syllabus pattern curriculum question paper marking scheme'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((syl) => {
      const item = {
        id: syl.id,
        title: syl.examName,
        organization: syl.organization,
        category: syl.category,
        contentType: 'syllabus',
        typeLabel: 'Exam Syllabus',
        status: syl.fileSize || 'PDF Available',
        statusType: 'released',
        level: syl.examLevel,
        dateLabel: 'Exam Level',
        dateValue: syl.examLevel,
        sortDate: null,
        deadlineDate: null,
        destinationUrl: `/syllabus`,
        actionUrl: syl.syllabusUrl || null,
        actionText: 'Download PDF',
        raw: syl
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // 7. Search Answer Keys
  const matchingAnswerKeys = mockAnswerKeys
    .filter((ak) => {
      const searchable = [
        ak.examName,
        ak.organization,
        ak.category,
        ak.summary,
        'answer key answer keys objection challenge solution sheet'
      ].join(' ');
      return matchesQueryTokens(searchable, tokens);
    })
    .map((ak) => {
      const item = {
        id: ak.id,
        title: ak.examName,
        organization: ak.organization,
        category: ak.category,
        contentType: 'answer-keys',
        typeLabel: 'Answer Key',
        status: ak.status,
        statusType: ak.status.includes('Open') ? 'upcoming' : 'open',
        dateLabel: 'Released On',
        dateValue: ak.releaseDateText,
        sortDate: ak.releaseDate,
        deadlineDate: ak.objectionLastDate && ak.objectionLastDate !== 'Closed' ? ak.objectionLastDate : null,
        destinationUrl: `/answer-keys`,
        actionUrl: ak.downloadUrl || null,
        actionText: 'Key & Response Sheet',
        raw: ak
      };
      item.relevanceScore = calculateRelevanceScore(item, query, tokens);
      return item;
    });

  // Aggregated Pre-Filter Category Counts
  const counts = {
    all:
      matchingJobs.length +
      matchingAdmitCards.length +
      matchingResults.length +
      matchingAdmissions.length +
      matchingScholarships.length +
      matchingSyllabus.length +
      matchingAnswerKeys.length,
    jobs: matchingJobs.length,
    'admit-cards': matchingAdmitCards.length,
    results: matchingResults.length,
    admissions: matchingAdmissions.length,
    scholarships: matchingScholarships.length,
    syllabus: matchingSyllabus.length,
    'answer-keys': matchingAnswerKeys.length
  };

  // Select items for active category tab
  let categoryItems = [];
  if (activeType === 'jobs') {
    categoryItems = matchingJobs;
  } else if (activeType === 'admit-cards') {
    categoryItems = matchingAdmitCards;
  } else if (activeType === 'results') {
    categoryItems = matchingResults;
  } else if (activeType === 'admissions') {
    categoryItems = matchingAdmissions;
  } else if (activeType === 'scholarships') {
    categoryItems = matchingScholarships;
  } else if (activeType === 'syllabus') {
    categoryItems = matchingSyllabus;
  } else if (activeType === 'answer-keys') {
    categoryItems = matchingAnswerKeys;
  } else {
    // 'all': prioritize jobs first, then admit cards, results, admissions, etc.
    categoryItems = [
      ...matchingJobs,
      ...matchingAdmitCards,
      ...matchingResults,
      ...matchingAdmissions,
      ...matchingScholarships,
      ...matchingSyllabus,
      ...matchingAnswerKeys
    ];
  }

  // Derive dynamic filter facet options from the category matches before secondary filtering
  const availableFilters = deriveAvailableFilters(categoryItems);

  // Apply secondary faceted filters
  const filteredItems = applySecondaryFilters(categoryItems, filters);

  // Apply deterministic sorting
  const sortedItems = sortItems(filteredItems, sort);

  // Compute pagination parameters
  const totalFiltered = sortedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / limit));
  const safePage = Math.min(page, totalPages);
  const startIndex = totalFiltered > 0 ? (safePage - 1) * limit : 0;
  const endIndex = Math.min(startIndex + limit, totalFiltered);
  const paginatedResults = sortedItems.slice(startIndex, endIndex);

  return {
    query: query.trim(),
    tokens,
    counts,
    availableFilters,
    totalMatchesInType: categoryItems.length,
    totalFiltered,
    page: safePage,
    limit,
    totalPages,
    startIndex: totalFiltered > 0 ? startIndex + 1 : 0,
    endIndex,
    results: paginatedResults
  };
}
