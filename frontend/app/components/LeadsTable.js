"use client";

import { formatCreatedAt } from "../lib/formatCreatedAt";

export default function LeadsTable({ leads, loading }) {
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
              <td className="py-3 pr-6">{lead.status}</td>
              <td className="py-3">{formatCreatedAt(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

