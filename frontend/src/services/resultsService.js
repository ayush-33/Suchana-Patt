import { mockResults } from '../data/mockResults.js';

export async function getResults(params = {}) {
  const { search = '', status = '', category = '', page = 1, limit = 10 } = params;
  await new Promise((resolve) => setTimeout(resolve, 20));

  let results = [...mockResults];

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.examName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }

  if (status && status !== 'all') {
    results = results.filter((item) => item.status.toLowerCase() === status.toLowerCase());
  }

  if (category && category !== 'all') {
    results = results.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }

  results.sort((a, b) => (b.declarationDate || '').localeCompare(a.declarationDate || ''));

  const total = results.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 10);
  const totalPages = Math.ceil(total / pageSize) || 1;
  const paginated = results.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return {
    data: paginated,
    total,
    page: pageNum,
    totalPages,
    limit: pageSize
  };
}

