"use client";

import { useEffect, useRef } from "react";

import { STATUS_VALUES } from "../lib/leadConstants";

export default function AddLeadModal({
  name,
  email,
  status,
  submitting,
  error,
  onNameChange,
  onEmailChange,
  onStatusChange,
  onSubmit,
  onClose,
}) {
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Give keyboard focus to the first field when the modal opens.
    nameInputRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        // Close only when clicking the overlay/outside the modal card.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-950"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium">Add New Lead</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Create a lead and it will appear in the list.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
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
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={onNameChange}
                  ref={nameInputRef}
                  autoFocus
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={onEmailChange}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:ring-zinc-800"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={onStatusChange}
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
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium cursor-pointer text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {submitting ? "Adding..." : "Add Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}

