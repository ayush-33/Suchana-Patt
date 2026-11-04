import { mockAdmitCards } from '../data/mockAdmitCards.js';

export async function getAdmitCards(params = {}) {
  const { search = '', status = '', category = '', sort = 'latest', page = 1, limit = 10 } = params;
  await new Promise((resolve) => setTimeout(resolve, 20));

  let results = [...mockAdmitCards];

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
    const s = status.toLowerCase();
    results = results.filter((item) => {
      const itemStatus = item.status.toLowerCase();
      if (s === 'awaiting update' || s === 'not available') {
        return itemStatus === 'awaiting update' || itemStatus === 'not available';
      }
      return itemStatus === s;
    });
  }

  if (category && category !== 'all') {
    results = results.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }

  // Sorting
  results.sort((a, b) => {
    if (sort === 'examDateAsc') {
      return (a.examDate || '9999').localeCompare(b.examDate || '9999');
    }
    return (b.releaseDate || '').localeCompare(a.releaseDate || '');
  });

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

