import { useState } from "react";
import { JOB_STATUSES, type JobStatus } from "../models/job";
import type { CreateJobDto } from "../api/jobsApi";

type AddJobPageProps = {
  onSubmit: (dto: CreateJobDto) => void | Promise<void>;
  onCancel: () => void;
  error?: string;
};

export default function AddJobPage({
  onSubmit,
  onCancel,
  error,
}: AddJobPageProps) {
  const [companyName, setCompanyName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("APPLIED");
  const [notes, setNotes] = useState<string>("");

  const [localError, setLocalError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalError("");

    const cleanCompany = companyName.trim();
    const cleanTitle = title.trim();
    const cleanNotes = notes.trim();

    // Frontend validation (matches backend expectations)
    if (!cleanCompany) {
      setLocalError("Company name is required.");
      return;
    }
    if (!cleanTitle) {
      setLocalError("Job title is required.");
      return;
    }

    const dto: CreateJobDto = {
      companyName: cleanCompany,
      title: cleanTitle,
      status,
      notes: cleanNotes ? cleanNotes : undefined,
    };

    try {
      setIsSubmitting(true);
      await onSubmit(dto);
      // navigation happens in App after successful create
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="page-content"
      style={{ minHeight: "100vh", padding: "32px 16px" }}
    >
      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 40, margin: 0 }}>Add a New Job</h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>Create a new job</p>
      </header>

      <main style={{ display: "grid", placeItems: "center" }}>
        <section
          style={{
            width: "min(720px, 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ padding: 18, display: "grid", gap: 14 }}
          >
            <label style={{ display: "grid", gap: 8, opacity: 0.9 }}>
              Company Name *
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Microsoft"
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.20)",
                  color: "inherit",
                }}
                autoFocus
              />
            </label>

            <label style={{ display: "grid", gap: 8, opacity: 0.9 }}>
              Job Title *
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Junior Full-Stack Developer"
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.20)",
                  color: "inherit",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8, opacity: 0.9 }}>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.20)",
                  color: "inherit",
                }}
              >
                {JOB_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 8, opacity: 0.9 }}>
              Notes (optional)
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any extra info (links, recruiter name, etc.)"
                rows={4}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.20)",
                  color: "inherit",
                  resize: "vertical",
                }}
              />
            </label>

            {(localError || error) && (
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255, 92, 92, 0.35)",
                  background: "rgba(255, 92, 92, 0.12)",
                }}
              >
                {localError ? localError : error}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 4,
              }}
            >
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  fontWeight: 700,
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(93, 135, 255, 0.35)",
                  cursor: "pointer",
                  fontWeight: 700,
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? "Saving…" : "Save Job"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
