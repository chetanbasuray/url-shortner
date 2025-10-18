import { supabase } from '../../lib/supabase';
import fetch from 'node-fetch';

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req) {
  const { url } = await req.json();
  if (!url) return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });

  // --- URL Safety Check ---
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_KEY;
  const safeBrowsingUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  const body = {
    client: { clientId: "bloomshort", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const check = await fetch(safeBrowsingUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const result = await check.json();

    if (result.matches && result.matches.length > 0) {
      return new Response(JSON.stringify({ error: 'URL is unsafe and cannot be shortened.' }), { status: 400 });
    }
  } catch (err) {
    console.error('Safety check error:', err);
    // Fail open: allow shortening if API fails
  }

  // --- Generate unique code ---
  let code = generateCode();
  let { data } = await supabase.from('urls').select('code').eq('code', code);
  while (data.length > 0) {
    code = generateCode();
    ({ data } = await supabase.from('urls').select('code').eq('code', code));
  }

  const { error } = await supabase.from('urls').insert([{ code, original: url }]);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ code }), { status: 200 });
}
