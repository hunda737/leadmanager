"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";
const STATUS_VALUES = [
  "New",
  "Engaged",
  "Proposal Sent",
  "Closed-Won",
  "Closed-Lost",
];

function formatCreatedAt(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

export default function LeadManagerPage() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const refreshLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/leads`);
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.message || `Failed to fetch leads (${res.status})`);
      }

      setLeads(Array.isArray(json) ? json : []);
    } catch (err) {
      setError(err?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const openModal = () => {
    setError(null);
    setSuccess(null);
    setName("");
    setEmail("");
    setStatus("New");
    setIsModalOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setSuccess(null);
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        name,
        email,
        status,
      };

      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.message || `Failed to add lead (${res.status})`);
      }

      setSuccess("Lead added successfully.");
      setName("");
      setEmail("");
      setStatus("New");
      await refreshLeads();
      setIsModalOpen(false);
    } catch (err) {
      setError(err?.message || "Failed to add lead");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Lead Manager</h1>

        <div className="mt-6">
          {error ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-200">
              {success}
            </div>
          ) : null}

          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Leads</h2>
            <button
              type="button"
              onClick={openModal}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Add New Lead
            </button>
          </div>

          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            {loading ? (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Loading...</p>
            ) : leads.length === 0 ? (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                No leads yet.
              </p>
            ) : (
              <table className="w-full min-w-full text-left text-sm">
                <thead className="border-b border-zinc-200 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <tr>
                    <th className="py-3 pr-6">Name</th>
                    <th className="py-3 pr-6">Email</th>
                    <th className="py-3 pr-6">Status</th>
                    <th className="py-3">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800"
                    >
                      <td className="py-3 pr-6 font-medium">{lead.name}</td>
                      <td className="py-3 pr-6">{lead.email}</td>
                      <td className="py-3 pr-6">{lead.status}</td>
                      <td className="py-3">{formatCreatedAt(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>

        {isModalOpen ? (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-950">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">Add New Lead</h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Create a lead and it will appear in the list.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-2 py-1 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {error ? (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
                  {error}
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
                  >
                    {STATUS_VALUES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  {submitting ? "Adding..." : "Add Lead"}
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
