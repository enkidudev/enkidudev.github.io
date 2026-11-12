export const competitions = [
  {
    event: "ROOTBREACH CTF 2026 (NITJ)",
    place: 1,
    format: "Team",
    detail: "300+ teams",
  },
  {
    event: "Encrypted CTF 2025",
    place: 1,
    format: "Team",
    detail: "~90 teams",
  },
  {
    event: "CYBERWAR CTF 2026",
    place: 1,
    format: "Team",
    detail: "300+ teams",
  },
  {
    event: "QuickHeal BCA CTF 2026",
    place: 1,
    format: "Team",
    participation: "Solo",
    detail: "~80 teams",
  },
  {
    event: "CYBERTHON CTF 2026",
    place: 1,
    format: "Team",
    detail: "~100 teams",
  },
  {
    event: "Digital CyberHunt CTF 2026",
    place: 1,
    format: "Team",
    detail: "~85 teams",
  },
  {
    event: "Tech Fusion CTF 2026",
    place: 2,
    format: "Team",
    detail: "~95 teams",
  },
  {
    event: "EXPLOIT 404 CTF 2026",
    place: 2,
    format: "Team",
    detail: "~90 teams",
  },
  {
    event: "Trivarna CTF 2026",
    place: 3,
    format: "Team",
    detail: "~80 teams",
  },
  {
    event: "RCS CTF 2026",
    place: 4,
    format: "Team",
    participation: "Solo",
    detail: "~100 teams",
  },
];

export const wins = competitions.filter(({ place }) => place === 1).length;
export const podiums = competitions.filter(({ place }) => place <= 3).length;

export const labs = [
  { name: "HTB Dante", progress: "100% complete" },
  { name: "HTB CPTS path", progress: "100% complete" },
  { name: "HTB RastaLabs", progress: "90% complete · In progress" },
];

export const bountySummary = "Two paid critical findings in confidential private programs, resulting in administrative access in one case and remote code execution in the other.";
