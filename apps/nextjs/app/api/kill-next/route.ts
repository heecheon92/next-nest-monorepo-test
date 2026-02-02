export function GET() {
  const hostName = process.env.HOST_MACHINE_NAME ?? "unknown";
  const startedAt = Date.now();
  console.warn(`${hostName}: kill-next invoked - shutting down`, { startedAt });
  setTimeout(() => process.exit(1), 100);
  return new Response(`${hostName}: Next.js shutting down...`, { status: 200 });
}
