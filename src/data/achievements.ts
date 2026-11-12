export const competitions = [
  { event: "ROOTBREACH CTF (NITJ)", place: 1, format: "Team", detail: "300+ teams" },
  { event: "Encrypted (2025)", place: 1 },
  { event: "CYBERWAR", place: 1 },
  { event: "QuickHeal BCA", place: 1, format: "Solo" },
  { event: "CYBERTHON", place: 1 },
  { event: "Digital CyberHunt", place: 1 },
  { event: "Tech Fusion", place: 2 },
  { event: "EXPLOIT 404", place: 2 },
  { event: "Trivarna", place: 3 },
  { event: "RCS CTF 2026", place: 4, format: "Solo in a team-format event" },
];

export const wins = competitions.filter(({ place }) => place === 1).length;
export const podiums = competitions.filter(({ place }) => place <= 3).length;

export const labs = [
  { name: "HTB Dante", progress: "100% complete" },
  { name: "HTB CPTS path", progress: "100% complete" },
  { name: "HTB RastaLabs", progress: "90% complete · In progress" },
];

export const bountySummary = "Two paid critical findings in confidential private programs, resulting in administrative access in one case and remote code execution in the other.";
