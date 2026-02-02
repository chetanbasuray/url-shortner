export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function buildUtmUrl(baseUrl, params = {}) {
  if (!baseUrl) return '';

  const [urlWithoutHash, hash] = baseUrl.split('#');
  const [base, query = ''] = urlWithoutHash.split('?');
  const searchParams = new URLSearchParams(query);

  UTM_KEYS.forEach((key) => {
    if (params[key]) {
      searchParams.set(key, params[key]);
    } else {
      searchParams.delete(key);
    }
  });

  const queryString = searchParams.toString();
  const rebuilt = queryString ? `${base}?${queryString}` : base;

  return hash ? `${rebuilt}#${hash}` : rebuilt;
}

export function extractUtmParams(inputUrl) {
  if (!inputUrl) {
    return { baseUrl: '', utmParams: {} };
  }

  const [urlWithoutHash, hash] = inputUrl.split('#');
  const [base, query = ''] = urlWithoutHash.split('?');
  const searchParams = new URLSearchParams(query);
  const utmParams = {};

  UTM_KEYS.forEach((key) => {
    if (searchParams.has(key)) {
      utmParams[key] = searchParams.get(key) ?? '';
      searchParams.delete(key);
    }
  });

  const queryString = searchParams.toString();
  const rebuilt = queryString ? `${base}?${queryString}` : base;

  return { baseUrl: hash ? `${rebuilt}#${hash}` : rebuilt, utmParams };
}
