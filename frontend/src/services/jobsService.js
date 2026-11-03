import { mockJobs } from '../data/mockJobs.js';

/**
 * Normalizes string for search comparisons
 */
function normalize(str) {
  return (str || '').toLowerCase().trim();
}

/**
 * Service to retrieve jobs with search, multi-group filtering, sorting, and pagination
 */
export async function getJobs(params = {}) {
  const {
    search = '',
    jobType = [],
    qualification = [],
    experience = [],
    ageRange = [],
    category = [],
    location = [],
    status = [],
    sort = 'latest',
    page = 1,
    limit = 12
  } = params;

  // Simulate async delay for realistic lifecycle (50ms)
  await new Promise((resolve) => setTimeout(resolve, 30));

  let results = [...mockJobs];

  // 1. Text Search Filter across title, organization, category, qualifications, location
  const query = normalize(search);
  if (query) {
    results = results.filter((job) => {
      const titleMatch = normalize(job.title).includes(query);
      const orgMatch = normalize(job.organization).includes(query);
      const catMatch = normalize(job.category).includes(query);
      const deptMatch = normalize(job.department).includes(query);
      const locMatch = normalize(job.location).includes(query);
      const qualMatch = (job.qualification || []).some((q) => normalize(q).includes(query));
      return titleMatch || orgMatch || catMatch || deptMatch || locMatch || qualMatch;
    });
  }

  // 2. Job Type filter (Government / Private)
  const jobTypeArray = Array.isArray(jobType) ? jobType : [jobType].filter(Boolean);
  if (jobTypeArray.length > 0) {
    const lowerTypes = jobTypeArray.map((t) => t.toLowerCase());
    results = results.filter((job) => lowerTypes.includes((job.jobType || '').toLowerCase()));
  }

  // 3. Qualification filter (10th Pass, 12th Pass, Diploma, Graduate, Postgraduate)
  const qualArray = Array.isArray(qualification) ? qualification : [qualification].filter(Boolean);
  if (qualArray.length > 0) {
    results = results.filter((job) => {
      const jobQuals = job.qualification || [];
      return qualArray.some((targetQual) =>
        jobQuals.some((jq) => normalize(jq) === normalize(targetQual))
      );
    });
  }

  // 4. Experience filter (Fresher, 0–1 Years, 1–3 Years, 3+ Years, Not Required)
  const expArray = Array.isArray(experience) ? experience : [experience].filter(Boolean);
  if (expArray.length > 0) {
    results = results.filter((job) => {
      const exp = job.experienceRange || job.experience || '';
      return expArray.some((targetExp) => normalize(exp) === normalize(targetExp));
    });
  }

  // 5. Age Range filter (18-25 Years, 26-35 Years, 36+ Years)
  const ageArray = Array.isArray(ageRange) ? ageRange : [ageRange].filter(Boolean);
  if (ageArray.length > 0) {
    results = results.filter((job) => {
      return ageArray.some((targetRange) => {
        if (job.ageRange && normalize(job.ageRange) === normalize(targetRange)) return true;
        // Numeric fallback check
        const max = job.maxAge || 30;
        if (targetRange === '18-25 Years') return max <= 25;
        if (targetRange === '26-35 Years') return max > 25 && max <= 35;
        if (targetRange === '36+ Years') return max > 35;
        return false;
      });
    });
  }

  // 6. Category / Department filter (Railway, Banking, Teaching, Defence, Police, SSC, State Government, IT / Private Sector)
  const catArray = Array.isArray(category) ? category : [category].filter(Boolean);
  if (catArray.length > 0) {
    results = results.filter((job) =>
      catArray.some((c) => normalize(job.category) === normalize(c))
    );
  }

  // 7. Location filter
  const locArray = Array.isArray(location) ? location : [location].filter(Boolean);
  if (locArray.length > 0) {
    results = results.filter((job) =>
      locArray.some((loc) => normalize(job.location) === normalize(loc))
    );
  }

  // 8. Application Status filter (open, upcoming, closed)
  const statusArray = Array.isArray(status) ? status : [status].filter(Boolean);
  if (statusArray.length > 0) {
    const lowerStatuses = statusArray.map((s) => s.toLowerCase());
    results = results.filter((job) => lowerStatuses.includes((job.status || '').toLowerCase()));
  }

  // 9. Sorting
  results.sort((a, b) => {
    switch (sort) {
      case 'oldest':
        return (a.publishedAt || '').localeCompare(b.publishedAt || '');
      case 'lastDateAsc':
        return (a.lastDate || '9999-12-31').localeCompare(b.lastDate || '9999-12-31');
      case 'lastDateDesc':
        return (b.lastDate || '').localeCompare(a.lastDate || '');
      case 'titleAsc':
        return (a.title || '').localeCompare(b.title || '');
      case 'vacanciesDesc':
        return (b.vacancies || 0) - (a.vacancies || 0);
      case 'latest':
      default:
        return (b.publishedAt || '').localeCompare(a.publishedAt || '');
    }
  });

  const total = results.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 12);
  const totalPages = Math.ceil(total / pageSize) || 1;

  const startIndex = (pageNum - 1) * pageSize;
  const paginatedData = results.slice(startIndex, startIndex + pageSize);

  // Compute dynamic filter counts from the current dataset
  const filterCounts = calculateFilterCounts(mockJobs);

  return {
    data: paginatedData,
    total,
    page: pageNum,
    totalPages,
    limit: pageSize,
    filterCounts
  };
}

/**
 * Calculates current counts for all available filter options
 */
export function calculateFilterCounts(dataset) {
  const counts = {
    jobType: { government: 0, private: 0 },
    qualification: {
      '10th Pass': 0,
      '12th Pass': 0,
      'Diploma': 0,
      'Graduate': 0,
      'Postgraduate': 0
    },
    experience: {
      'Fresher': 0,
      '0–1 Years': 0,
      '1–3 Years': 0,
      '3+ Years': 0,
      'Not Required': 0
    },
    ageRange: {
      '18-25 Years': 0,
      '26-35 Years': 0,
      '36+ Years': 0
    },
    category: {
      'Railway': 0,
      'Banking': 0,
      'Teaching': 0,
      'Defence': 0,
      'Police': 0,
      'SSC': 0,
      'State Government': 0,
      'IT / Private Sector': 0
    },
    location: {},
    status: {
      'open': 0,
      'upcoming': 0,
      'closed': 0
    }
  };

  dataset.forEach((job) => {
    // Job Type
    const jt = (job.jobType || '').toLowerCase();
    if (counts.jobType[jt] !== undefined) counts.jobType[jt]++;

    // Qualification
    (job.qualification || []).forEach((q) => {
      if (counts.qualification[q] !== undefined) counts.qualification[q]++;
    });

    // Experience
    const exp = job.experienceRange || job.experience;
    if (counts.experience[exp] !== undefined) {
      counts.experience[exp]++;
    }

    // Age Range
    if (counts.ageRange[job.ageRange] !== undefined) {
      counts.ageRange[job.ageRange]++;
    }

    // Category
    if (counts.category[job.category] !== undefined) {
      counts.category[job.category]++;
    }

    // Location
    if (job.location) {
      counts.location[job.location] = (counts.location[job.location] || 0) + 1;
    }

    // Status
    const st = (job.status || '').toLowerCase();
    if (counts.status[st] !== undefined) counts.status[st]++;
  });

  return counts;
}

/**
 * Service to fetch a single job by id or slug
 */
export async function getJobById(id) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (!id) return null;
  const cleanId = id.trim().toLowerCase();
  return (
    mockJobs.find(
      (job) => job.id.toLowerCase() === cleanId || (job.slug && job.slug.toLowerCase() === cleanId)
    ) || null
  );
}

/**
 * Service to fetch related jobs for a given jobId
 */
export async function getRelatedJobs(jobId, limit = 4) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  const current = mockJobs.find((j) => j.id === jobId);
  if (!current) return mockJobs.slice(0, limit);

  // Pick explicitly configured related jobs first
  let related = [];
  if (current.relatedJobIds && current.relatedJobIds.length > 0) {
    related = mockJobs.filter((j) => current.relatedJobIds.includes(j.id));
  }

  // If not enough, fill with same category
  if (related.length < limit) {
    const sameCat = mockJobs.filter(
      (j) => j.category === current.category && j.id !== current.id && !related.some((r) => r.id === j.id)
    );
    related = [...related, ...sameCat];
  }

  // Fallback to remaining
  if (related.length < limit) {
    const others = mockJobs.filter((j) => j.id !== current.id && !related.some((r) => r.id === j.id));
    related = [...related, ...others];
  }

  return related.slice(0, limit);
}

/**
 * Service to get top featured jobs for homepage
 */
export async function getFeaturedJobs(limit = 8) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return mockJobs.slice(0, limit);
}

