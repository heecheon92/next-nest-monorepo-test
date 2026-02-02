"use client";

import { useState } from "react";

export function HomeView({ hostname }: { hostname: string }) {
  const [loading, setLoading] = useState(false);
  const [killingNext, setKillingNext] = useState(false);
  const [killingNest, setKillingNest] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    console.info(`${hostname}: ui click: fetch client info`, {
      at: new Date().toISOString(),
    });
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/client-info");
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const text = await res.text();
      console.info(`${hostname}: ui fetch client info success`, {
        length: text.length,
        at: new Date().toISOString(),
      });
      setMessage(text);
    } catch (err) {
      console.error(`${hostname}: ui fetch client info failed`, {
        error: err instanceof Error ? err.message : String(err),
        at: new Date().toISOString(),
      });
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKillNext = async () => {
    console.warn(`${hostname} ui click: kill next`, {
      at: new Date().toISOString(),
    });
    setKillingNext(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/kill-next");
      const text = await res.text();
      console.info(`${hostname}: ui kill next response`, {
        status: res.status,
        length: text.length,
        at: new Date().toISOString(),
      });
      setMessage(text);
    } catch (err) {
      console.error(`${hostname}: ui kill next failed`, {
        error: err instanceof Error ? err.message : String(err),
        at: new Date().toISOString(),
      });
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setKillingNext(false);
    }
  };

  const handleKillNest = async () => {
    console.warn(`${hostname} ui click: kill nest`, {
      at: new Date().toISOString(),
    });
    setKillingNest(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/kill-nest");
      const text = await res.text();
      console.info(`${hostname}: ui kill nest response`, {
        status: res.status,
        length: text.length,
        at: new Date().toISOString(),
      });
      setMessage(text);
    } catch (err) {
      console.error(`${hostname}: ui kill nest failed`, {
        error: err instanceof Error ? err.message : String(err),
        at: new Date().toISOString(),
      });
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setKillingNest(false);
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

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleKillNext}
            disabled={killingNext}
            className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {killingNext ? "Killing Next.js..." : "Kill Next.js"}
          </button>
          <button
            type="button"
            onClick={handleKillNest}
            disabled={killingNest}
            className="inline-flex items-center rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-amber-400"
          >
            {killingNest ? "Killing NestJS..." : "Kill NestJS"}
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
