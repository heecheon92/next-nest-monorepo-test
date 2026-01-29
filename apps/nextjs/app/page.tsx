 "use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

    try {
      const res = await fetch(`${baseUrl}/client-info`);
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Next → NestJS demo
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Click the button to fetch client info from the NestJS endpoint.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleFetch}
            disabled={loading}
            className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {loading ? "Loading..." : "Fetch client info"}
          </button>
        </div>

        <div className="mt-6 min-h-[64px] rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          {error && <p className="text-red-600">Error: {error}</p>}
          {!error && message && <p>{message}</p>}
          {!error && !message && (
            <p className="text-zinc-400">Result will appear here.</p>
          )}
        </div>
      </main>
    </div>
  );
}
