'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data.code) setShort(`${window.location.origin}/${data.code}`);
  };

  const handleCopy = () => {
    if (short) {
      navigator.clipboard.writeText(short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    }
  };

  const handleOpen = () => {
    if (short) {
      window.open(short, '_blank');
    }
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
        Transform your long URLs into delightful, tiny blossoms! Each link is lovingly encoded for you. Try it out below and watch your links bloom. 🌺
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
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white rounded-lg shadow-lg font-bold hover:scale-105 transform transition duration-300"
        >
          🌟 Shorten & Bloom 🌟
        </button>
      </motion.form>

      {short && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center text-purple-700 font-semibold flex flex-col items-center space-y-2"
        >
          ✨ Your tiny bloom:{" "}
          <a href={short} target="_blank" rel="noopener noreferrer" className="underline">
            {short}
          </a>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500 transition"
            >
              Copy
            </button>
            <button
              onClick={handleOpen}
              className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
            >
              Open
            </button>
          </div>

          {/* AnimatePresence for disappearing message */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 px-4 py-2 bg-green-400 text-white rounded shadow"
              >
                ✅ Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
