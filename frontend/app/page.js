"use client";

import { useEffect, useState } from "react";

import AddLeadModal from "./components/AddLeadModal";
import LeadsTable from "./components/LeadsTable";

// NEXT_PUBLIC_* is required for env vars to be available in browser (client components).
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

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
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium cursor-pointer text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Add New Lead
            </button>
          </div>

          <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <LeadsTable leads={leads} loading={loading} />
          </section>
        </div>

        {isModalOpen ? (
          <AddLeadModal
            name={name}
            email={email}
            status={status}
            submitting={submitting}
            error={error}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onStatusChange={(e) => setStatus(e.target.value)}
            onSubmit={onSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
