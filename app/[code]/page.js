import { redirect } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default async function RedirectPage({ params }) {
  const { code } = await params;

  const { data } = await supabase.from('urls').select('original').eq('code', code).single();
  console.log(data);

  if (!data) return <p>URL not found</p>;

  redirect(data.original); // 307 redirect
}
