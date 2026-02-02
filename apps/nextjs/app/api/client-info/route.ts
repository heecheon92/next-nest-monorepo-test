const NEST_INTERNAL_URL = process.env.NEST_INTERNAL_URL || "http://nestjs:3001";
const HOST_MACHINE_NAME = process.env.HOST_MACHINE_NAME ?? "unknown";

export async function GET() {
  const target = `${NEST_INTERNAL_URL}/client-info`;
  const startedAt = Date.now();
  console.info(`${HOST_MACHINE_NAME}: client-info proxy start`, {
    target,
    startedAt,
  });
  try {
    const res = await fetch(target);
    const text = await res.text();
    const durationMs = Date.now() - startedAt;
    console.info(`${HOST_MACHINE_NAME}: client-info proxy success`, {
      target,
      status: res.status,
      length: text.length,
      durationMs,
    });
    return new Response(text, { status: res.status });
  } catch (err) {
    const durationMs = Date.now() - startedAt;
    console.error(`${HOST_MACHINE_NAME}: client-info proxy failed`, {
      target,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      durationMs,
    });
    return new Response(
      `${HOST_MACHINE_NAME}: Failed to reach NestJS. target=${target} error=${err instanceof Error ? err.message : String(err)}`,
      { status: 502 },
    );
  }
}
