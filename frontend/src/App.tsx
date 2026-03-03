import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import type { Job } from "./models/job";
import { fetchJobs, createJob } from "./api/jobsApi";

import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";

export default function App() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Load jobs on app start
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setError("");
        setIsLoading(true);
        const data = await fetchJobs(controller.signal);
        setJobs(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        const msg = e instanceof Error ? e.message : "Failed to load jobs.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  async function handleCreateJob(dto: Parameters<typeof createJob>[0]) {
    try {
      setError("");
      const created = await createJob(dto);
      setJobs((prev) => [created, ...prev]);
      navigate("/");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create job.";
      setError(msg);
      // נשארים בדף ההוספה כדי שהמשתמש יוכל לתקן
    }
  }

  return (
    <div className="page-with-lights">
      <div className="page-ambient-lights" aria-hidden="true">
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
      </div>
      <Routes>
      <Route
        path="/"
        element={
          <HomePage
            jobs={jobs}
            isLoading={isLoading}
            error={error}
            onAddClick={() => navigate("/add")}
          />
        }
      />
      <Route
        path="/add"
        element={
          <AddJobPage
            onSubmit={handleCreateJob}
            onCancel={() => navigate("/")}
            error={error}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
