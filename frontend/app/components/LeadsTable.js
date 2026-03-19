"use client";

import { formatCreatedAt } from "../lib/formatCreatedAt";

export default function LeadsTable({ leads, loading }) {
  const statusBadge = (status) => {
    const base =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";

    switch (status) {
      case "New":
        return (
          <span className={`${base} border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200`}>
            {status}
          </span>
        );
      case "Engaged":
        return (
          <span className={`${base} border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200`}>
            {status}
          </span>
        );
      case "Proposal Sent":
        return (
          <span className={`${base} border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-900/60 dark:bg-purple-950/30 dark:text-purple-200`}>
            {status}
          </span>
        );
      case "Closed-Won":
        return (
          <span className={`${base} border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200`}>
            {status}
          </span>
        );
      case "Closed-Lost":
        return (
          <span className={`${base} border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200`}>
            {status}
          </span>
        );
      default:
        return (
          <span className={`${base} border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-200`}>
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        Loading...
      </p>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        No leads yet.
      </p>
    );
  }

  return (
    <div className="mt-3 overflow-auto">
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
                <td className="py-3 pr-6">{statusBadge(lead.status)}</td>
              <td className="py-3">{formatCreatedAt(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

