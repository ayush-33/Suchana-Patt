import { mockScholarships } from '../data/mockScholarships.js';

export async function getScholarships(params = {}) {
  const { search = '', status = '', page = 1, limit = 8 } = params;
  await new Promise((resolve) => setTimeout(resolve, 20));

  let results = [...mockScholarships];

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.studentLevel.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'all') {
    results = results.filter((item) => item.status.toLowerCase() === status.toLowerCase());
  }

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

