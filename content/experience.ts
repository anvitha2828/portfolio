// Your work history, shown on the About page under "Where I've Worked".
// Add, remove, or reorder entries — newest first.

export type Experience = {
  period: string; // e.g. "2025 - Now"
  role: string;
  company: string;
};

export const experience: Experience[] = [
  { period: "2025 - Now", role: "Your Role", company: "Company" },
  { period: "2023 - 2025", role: "Your Role", company: "Company" },
  { period: "2021 - 2023", role: "Your Role", company: "Company" },
];
