const NEST_INTERNAL_URL = process.env.NEST_INTERNAL_URL || "http://nestjs:3001";

export async function GET() {
  const res = await fetch(`${NEST_INTERNAL_URL}/kill`);
  const text = await res.text();
  return new Response(text, { status: res.status });
}
