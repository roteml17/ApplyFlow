export const JOB_STATUSES = [
    "APPLIED",
    "HR",
    "TECH",
    "FINAL",
    "OFFER",
    "REJECTED",
  ] as const;
  
  export type JobStatus = (typeof JOB_STATUSES)[number];
  
  export interface Job {
    id: string;
    companyName: string;
    title: string;
    status: JobStatus;
    notes: string;
    createdAt: string;
  }