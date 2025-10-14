import { supabase } from '../../lib/supabase';

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
