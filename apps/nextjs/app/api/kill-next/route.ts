export function GET() {
  setTimeout(() => process.exit(1), 100);
  return new Response("Next.js shutting down...", { status: 200 });
}
