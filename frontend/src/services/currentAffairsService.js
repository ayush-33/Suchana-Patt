import { mockCurrentAffairs } from '../data/mockCurrentAffairs.js';

export async function getCurrentAffairs(params = {}) {
  const { search = '', category = '', page = 1, limit = 8 } = params;
  await new Promise((resolve) => setTimeout(resolve, 20));

  let results = [...mockCurrentAffairs];

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'all') {
    results = results.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()));
  }

  results.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const total = results.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 8);
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

