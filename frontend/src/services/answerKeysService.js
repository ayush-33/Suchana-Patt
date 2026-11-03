import { mockAnswerKeys } from '../data/mockAnswerKeys.js';

export async function getAnswerKeys(params = {}) {
  const { search = '', status = '', page = 1, limit = 8 } = params;
  await new Promise((resolve) => setTimeout(resolve, 20));

  let results = [...mockAnswerKeys];

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.examName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'all') {
    results = results.filter((item) => item.status.toLowerCase().includes(status.toLowerCase()));
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

