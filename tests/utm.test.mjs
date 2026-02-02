import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUtmUrl, extractUtmParams } from '../app/lib/utm.mjs';

test('buildUtmUrl appends UTM params and preserves hashes', () => {
  const url = 'https://example.com/landing#section';
  const result = buildUtmUrl(url, {
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'launch',
  });

  assert.equal(
    result,
    'https://example.com/landing?utm_source=facebook&utm_medium=paid_social&utm_campaign=launch#section'
  );
});

test('buildUtmUrl removes empty UTM values and keeps existing query params', () => {
  const url = 'https://example.com/page?ref=newsletter';
  const result = buildUtmUrl(url, {
    utm_source: 'newsletter',
    utm_medium: '',
  });

  assert.equal(result, 'https://example.com/page?ref=newsletter&utm_source=newsletter');
});

test('extractUtmParams returns base url and detected utm values', () => {
  const url =
    'https://example.com/page?utm_source=linkedin&utm_medium=social&ref=sidebar#top';
  const { baseUrl, utmParams } = extractUtmParams(url);

  assert.equal(baseUrl, 'https://example.com/page?ref=sidebar#top');
  assert.deepEqual(utmParams, { utm_source: 'linkedin', utm_medium: 'social' });
});

test('buildUtmUrl overwrites existing utm values while keeping other query params', () => {
  const url =
    'https://example.com/page?utm_source=old&utm_campaign=spring&ref=sidebar&utm_medium=social';
  const result = buildUtmUrl(url, {
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'launch',
  });

  assert.equal(
    result,
    'https://example.com/page?utm_source=facebook&utm_campaign=launch&ref=sidebar&utm_medium=paid_social'
  );
});
