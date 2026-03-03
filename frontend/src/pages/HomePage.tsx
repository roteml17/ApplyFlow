import type { Job } from "../models/job";

//the props the homepage component expects to recieve
type HomePageProps = {
  jobs: Job[];
  isLoading: boolean;
  error: string;
  onAddClick: () => void;
};

export default function HomePage({
  jobs,
  isLoading,
  error,
  onAddClick,
}: HomePageProps) {
  return (
    <div style={{ minHeight: "100vh", padding: "32px 16px" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>Welcome to ApplyFlow</h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Track your job applications in one simple place.
        </p>
      </header>

      {/* Content */}
      <main style={{ display: "grid", placeItems: "center" }}>
        <section
          style={{
            width: "min(900px, 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              padding: 16,
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18 }}>Current Jobs</h2>
            <div style={{ opacity: 0.8, fontSize: 13 }}>
              Total: <strong>{jobs.length}</strong>
            </div>
          </div>

          {/* States */}
          {isLoading ? (
            <div style={{ padding: 16, opacity: 0.85 }}>Loading jobs…</div>
          ) : error ? (
            <div
              style={{
                padding: 16,
                background: "rgba(255, 92, 92, 0.12)",
                borderTop: "1px solid rgba(255, 92, 92, 0.25)",
              }}
            >
              <strong>Something went wrong:</strong> {error}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", opacity: 0.8 }}>
                    <th style={{ padding: "12px 16px", fontSize: 12 }}>
                      Company
                    </th>
                    <th style={{ padding: "12px 16px", fontSize: 12 }}>
                      Job Title
                    </th>
                    <th style={{ padding: "12px 16px", fontSize: 12 }}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: 16,
                          opacity: 0.8,
                          textAlign: "center",
                        }}
                      >
                        No jobs yet. Click “Add New Job” to create your first
                        one.
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job.id}>
                        <td
                          style={{
                            padding: "14px 16px",
                            borderTop: "1px solid rgba(255,255,255,0.10)",
                            fontWeight: 600,
                          }}
                        >
                          {job.companyName}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            borderTop: "1px solid rgba(255,255,255,0.10)",
                          }}
                        >
                          {job.title}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            borderTop: "1px solid rgba(255,255,255,0.10)",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              padding: "6px 10px",
                              borderRadius: 999,
                              border: "1px solid rgba(255,255,255,0.15)",
                              background: "rgba(255,255,255,0.06)",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: 22,
        }}
      >
        <button
          onClick={onAddClick}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(93, 135, 255, 0.35)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          + Add New Job
        </button>
      </footer>
    </div>
  );
}
