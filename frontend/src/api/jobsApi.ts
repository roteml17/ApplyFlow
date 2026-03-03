import type { Job, JobStatus } from "../models/job";

export type CreateJobDto = {
  companyName: string;
  title: string;
  status: JobStatus; // "APPLIED" | "HR" | "TECH" | "FINAL" | "OFFER" | "REJECTED"
  notes?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.toString() ?? "http://localhost:3001";

 //GET /api/positions
export async function fetchJobs(signal?: AbortSignal): Promise<Job[]> {
  const res = await fetch(`${API_BASE_URL}/api/positions`, { signal });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as Job[];
}

//POST /api/positions
export async function createJob(dto: CreateJobDto): Promise<Job> {
  const res = await fetch(`${API_BASE_URL}/api/positions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    let msg = `Failed to create job: ${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
      else if (typeof data === "string") msg = data;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }

  return (await res.json()) as Job;
}