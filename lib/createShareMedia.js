import { apiGet } from './api';
import { resolveImageUrl } from './images';

function normalize(row) {
  if (!row) return null;
  return {
    ...row,
    id: String(row.id || row._id || ''),
    mediaUrl: resolveImageUrl(row.mediaUrl, ''),
    thumbnailUrl: resolveImageUrl(row.thumbnailUrl || row.mediaUrl, ''),
  };
}

export async function fetchCreateShareMedia({ page = 1, limit = 20, mediaType = '' } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (mediaType) params.set('mediaType', mediaType);
  const response = await apiGet(`/create-share-media?${params}`, { cache: 'no-store' });
  return {
    items: (Array.isArray(response?.data) ? response.data : []).map(normalize).filter(Boolean),
    pagination: response?.pagination || { page, limit, total: 0, totalPages: 0 },
  };
}

export async function fetchCreateShareMediaById(id) {
  const response = await apiGet(`/create-share-media/${encodeURIComponent(id)}`, { cache: 'no-store' });
  return normalize(response?.data);
}
