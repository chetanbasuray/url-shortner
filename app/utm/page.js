'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { buildUtmUrl, extractUtmParams } from '../lib/utm.mjs';

const PRESETS = [
  {
    id: 'facebook-post',
    label: 'Facebook Post',
    values: { utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'post' },
  },
  {
    id: 'facebook-comment',
    label: 'Facebook Comment',
    values: { utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'comment' },
  },
  {
    id: 'facebook-ads',
    label: 'Facebook Ads',
    values: { utm_source: 'facebook', utm_medium: 'paid_social', utm_campaign: 'facebook_ads' },
  },
  {
    id: 'facebook-messenger',
    label: 'Facebook Messenger',
    values: { utm_source: 'facebook', utm_medium: 'messenger', utm_campaign: 'dm' },
  },
  {
    id: 'instagram-story',
    label: 'Instagram Story',
    values: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'story' },
  },
  {
    id: 'instagram-reel',
    label: 'Instagram Reel',
    values: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'reel' },
  },
  {
    id: 'instagram-dm',
    label: 'Instagram DM',
    values: { utm_source: 'instagram', utm_medium: 'messenger', utm_campaign: 'dm' },
  },
  {
    id: 'x-post',
    label: 'X (Twitter) Post',
    values: { utm_source: 'x', utm_medium: 'social', utm_campaign: 'post' },
  },
  {
    id: 'x-reply',
    label: 'X (Twitter) Reply',
    values: { utm_source: 'x', utm_medium: 'social', utm_campaign: 'reply' },
  },
  {
    id: 'x-dm',
    label: 'X (Twitter) DM',
    values: { utm_source: 'x', utm_medium: 'messenger', utm_campaign: 'dm' },
  },
  {
    id: 'linkedin-sponsored',
    label: 'LinkedIn Sponsored',
    values: { utm_source: 'linkedin', utm_medium: 'paid_social', utm_campaign: 'sponsored' },
  },
  {
    id: 'linkedin-post',
    label: 'LinkedIn Post',
    values: { utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'post' },
  },
  {
    id: 'linkedin-comment',
    label: 'LinkedIn Comment',
    values: { utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'comment' },
  },
  {
    id: 'linkedin-message',
    label: 'LinkedIn Message',
    values: { utm_source: 'linkedin', utm_medium: 'messenger', utm_campaign: 'dm' },
  },
  {
    id: 'tiktok-video',
    label: 'TikTok Video',
    values: { utm_source: 'tiktok', utm_medium: 'social', utm_campaign: 'video' },
  },
  {
    id: 'tiktok-comment',
    label: 'TikTok Comment',
    values: { utm_source: 'tiktok', utm_medium: 'social', utm_campaign: 'comment' },
  },
  {
    id: 'tiktok-dm',
    label: 'TikTok DM',
    values: { utm_source: 'tiktok', utm_medium: 'messenger', utm_campaign: 'dm' },
  },
  {
    id: 'youtube-description',
    label: 'YouTube Description',
    values: { utm_source: 'youtube', utm_medium: 'video', utm_campaign: 'description' },
  },
  {
    id: 'youtube-comment',
    label: 'YouTube Comment',
    values: { utm_source: 'youtube', utm_medium: 'social', utm_campaign: 'comment' },
  },
  {
    id: 'youtube-community',
    label: 'YouTube Community Post',
    values: { utm_source: 'youtube', utm_medium: 'social', utm_campaign: 'community_post' },
  },
];

export default function UtmBuilderPage() {
  const [url, setUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url || !url.includes('utm_')) return;
    const { baseUrl, utmParams } = extractUtmParams(url);
    if (Object.keys(utmParams).length === 0) return;
    setUrl(baseUrl);
    setUtmSource(utmParams.utm_source ?? '');
    setUtmMedium(utmParams.utm_medium ?? '');
    setUtmCampaign(utmParams.utm_campaign ?? '');
    setUtmTerm(utmParams.utm_term ?? '');
    setUtmContent(utmParams.utm_content ?? '');
  }, [url]);

  const utmUrl = useMemo(
    () =>
      buildUtmUrl(url, {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
      }),
    [url, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]
  );

  const handleCopy = async () => {
    if (!utmUrl) return;
    await navigator.clipboard.writeText(utmUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    setUtmSource(preset.values.utm_source);
    setUtmMedium(preset.values.utm_medium);
    setUtmCampaign(preset.values.utm_campaign);
  };

  const resetFields = () => {
    setUtmSource('');
    setUtmMedium('');
    setUtmCampaign('');
    setUtmTerm('');
    setUtmContent('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200 p-8 font-sans">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-purple-700">UTM Builder</h1>
          <Link href="/" className="text-purple-700 underline">
            Back to BloomShort
          </Link>
        </div>

        <p className="text-purple-700">
          Paste a URL, add UTM parameters, and copy the tracking-ready link.
        </p>

        <div className="space-y-4">
          <input
            type="url"
            placeholder="https://example.com/landing-page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="utm_source"
              value={utmSource}
              onChange={(e) => setUtmSource(e.target.value)}
              className="p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
            />
            <input
              type="text"
              placeholder="utm_medium"
              value={utmMedium}
              onChange={(e) => setUtmMedium(e.target.value)}
              className="p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
            />
            <input
              type="text"
              placeholder="utm_campaign"
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              className="p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
            />
            <input
              type="text"
              placeholder="utm_term"
              value={utmTerm}
              onChange={(e) => setUtmTerm(e.target.value)}
              className="p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
            />
            <input
              type="text"
              placeholder="utm_content"
              value={utmContent}
              onChange={(e) => setUtmContent(e.target.value)}
              className="p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-purple-700">Quick presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-4 py-2 rounded-full bg-purple-200 text-purple-800 font-semibold shadow-sm hover:bg-purple-300 transition"
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              onClick={resetFields}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-300 transition"
            >
              Reset UTMs
            </button>
          </div>
        </div>

        <div className="bg-white/80 rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-lg font-semibold text-purple-700">Your tracking URL</h2>
          <input
            type="text"
            value={utmUrl}
            readOnly
            placeholder="Your UTM URL will appear here"
            className="w-full p-3 rounded-lg border border-purple-200 bg-white text-purple-900 font-medium"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Copy URL
            </button>
            {utmUrl && (
              <a
                href={utmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Open URL
              </a>
            )}
          </div>
          {copied && <p className="text-green-600 font-semibold">✅ Copied to clipboard!</p>}
        </div>
      </div>
    </div>
  );
}
