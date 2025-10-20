'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [copied, setCopied] = useState(false);

  // UTM parameters
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  // ✅ Detect existing UTM params in pasted URL and auto-fill them
  useEffect(() => {
    try {
      if (!url) return;
      const parsed = new URL(url);
      const params = parsed.searchParams;

      let hasUTMs = false;
      const utms = {};

      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
        if (params.has(key)) {
          hasUTMs = true;
          utms[key] = params.get(key);
          params.delete(key);
        }
      });

      if (hasUTMs) {
        setUtmSource(utms.utm_source || '');
        setUtmMedium(utms.utm_medium || '');
        setUtmCampaign(utms.utm_campaign || '');
        setUtmTerm(utms.utm_term || '');
        setUtmContent(utms.utm_content || '');

        // Remove UTM params from URL input
        const cleanUrl = parsed.origin + parsed.pathname + parsed.hash;
        setUrl(cleanUrl);
      }
    } catch (err) {
      // ignore invalid URLs
    }
  }, [url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build URL with UTM params if provided
    let fullUrl = url.trim();
    const utmParams = new URLSearchParams();

    if (utmSource) utmParams.append('utm_source', utmSource);
    if (utmMedium) utmParams.append('utm_medium', utmMedium);
    if (utmCampaign) utmParams.append('utm_campaign', utmCampaign);
    if (utmTerm) utmParams.append('utm_term', utmTerm);
    if (utmContent) utmParams.append('utm_content', utmContent);

    if ([...utmParams].length > 0) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + utmParams.toString();
    }

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: fullUrl }),
    });
    const data = await res.json();
    if (data.code) setShort(`${window.location.origin}/${data.code}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(short);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8 font-sans">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-purple-700 mb-6 text-center"
      >
        🌸 Welcome to BloomShort 🌸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-purple-800 mb-10 text-center max-w-lg"
      >
        Transform your long URLs into delightful, tiny blossoms! Add UTM tags easily or let BloomShort detect them for you. 🌺
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex flex-col items-center space-y-4 w-full max-w-md"
      >
        <input
          type="url"
          placeholder="Enter your magical URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white rounded-lg shadow-lg font-bold transform transition duration-300"
        >
          🌟 Shorten & Bloom 🌟
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {short && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-purple-700 font-semibold"
          >
            ✨ Your tiny bloom:{" "}
            <a href={short} target="_blank" rel="noopener noreferrer" className="underline">
              {short}
            </a>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                📋 Copy
              </button>
              <a
                href={short}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                🔗 Open
              </a>
            </div>

            <div className="flex justify-center mt-6">
              <QRCodeCanvas value={short} size={128} bgColor="#ffffff" fgColor="#7e22ce" />
            </div>

            <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-600 mt-4"
                >
                  ✅ Copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
