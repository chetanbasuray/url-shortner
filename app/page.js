'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShort('');

    let fullUrl = url;

    // Append UTM parameters if provided
    const params = new URLSearchParams();
    if (utmSource) params.append('utm_source', utmSource);
    if (utmMedium) params.append('utm_medium', utmMedium);
    if (utmCampaign) params.append('utm_campaign', utmCampaign);
    if (utmTerm) params.append('utm_term', utmTerm);
    if (utmContent) params.append('utm_content', utmContent);

    if ([...params].length > 0) {
      const separator = url.includes('?') ? '&' : '?';
      fullUrl += separator + params.toString();
    }

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: fullUrl }),
    });

    const data = await res.json();

    if (res.ok && data.code) {
      setShort(`${window.location.origin}/${data.code}`);
    } else {
      setError(data.error || 'Something went wrong!');
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleCopy = () => {
    if (short) {
      navigator.clipboard.writeText(short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpen = () => {
    if (short) {
      window.open(short, '_blank');
    }
  };

  // unified input style
  const inputClass =
    "w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 text-purple-900 font-medium text-lg";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-8 font-sans">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-purple-900 mb-6 text-center"
      >
        🌸 Welcome to BloomShort 🌸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg text-purple-900 mb-10 text-center max-w-lg"
      >
        Transform your long URLs into delightful, tiny blossoms! Add UTM parameters to track your marketing campaigns. 🌺
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
          className={inputClass}
        />

        {/* UTM fields */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <input
            type="text"
            placeholder="utm_source"
            value={utmSource}
            onChange={(e) => setUtmSource(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="utm_medium"
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="utm_campaign"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="utm_term"
            value={utmTerm}
            onChange={(e) => setUtmTerm(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="utm_content"
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            className={inputClass + ' col-span-2'}
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 1.05 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white rounded-lg shadow-lg font-bold hover:scale-105 transform transition duration-300 text-lg"
        >
          🌟 Shorten & Bloom 🌟
        </motion.button>
      </motion.form>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow"
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {short && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center text-purple-900 font-semibold flex flex-col items-center space-y-4"
        >
          ✨ Your tiny bloom:{" "}
          <a href={short} target="_blank" rel="noopener noreferrer" className="underline">
            {short}
          </a>

          <div className="flex space-x-2 mt-2">
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 1.2 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition"
            >
              Copy
            </motion.button>
            <motion.button
              onClick={handleOpen}
              whileTap={{ scale: 1.2 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
            >
              Open
            </motion.button>
          </div>

          {/* Copied message */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-4 py-2 bg-green-500 text-white rounded shadow"
              >
                ✅ Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Code */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4"
          >
            <QRCodeCanvas value={short} size={128} bgColor="#fdf6ff" fgColor="#6b21a8" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
