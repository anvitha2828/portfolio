// Your work history, shown on the About page under "Where I've Worked".
// Add, remove, or reorder entries — newest first.

export type Experience = {
  period: string; // e.g. "2025 - Now"
  role: string;
  company: string;
};

export const experience: Experience[] = [
  { period: "2023 - Now", role: "Systems Engineer", company: "MITRE" },
  {
    period: "2022 - 2023",
    role: "Graduate Assistant",
    company: "Virginia Tech",
  },
  { period: "Summer 2022", role: "Summer Associate", company: "IDA" },
  {
    period: "2020 - 2023",
    role: "Researcher",
    company: "COGENT Lab & 3M Lab, Virginia Tech",
  },
];
