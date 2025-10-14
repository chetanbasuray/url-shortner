'use client';

import { useState } from 'react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: '300px' }}
        />
        <button type="submit">Shorten</button>
      </form>
      {short && (
        <p>
          Short URL: <a href={short}>{short}</a>
        </p>
      )}
    </div>
  );
}
