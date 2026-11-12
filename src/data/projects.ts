export const projects = [
  {
    number: "01",
    title: "Shredder",
    category: "Reconnaissance tooling",
    status: "Open source",
    description:
      "A Python-based reconnaissance and service-enumeration tool combining fast port discovery, Nmap fingerprinting, script-based enumeration, and evidence-led triage.",
    stack: ["Python", "RustScan", "Nmap", "NSE"],
    href: "/projects/shredder/",
    repository: "https://github.com/enkidudev/shredder",
    repositoryLabel: "View GitHub repository",
  },
  {
    number: "02",
    title: "Ink",
    category: "Operator workflow",
    status: "Private project",
    description:
      "A lightweight SQLite-backed credential notebook for organizing discovered identities, credentials, authentication validation, and credential-reuse observations during assessments.",
    stack: ["Python", "SQLite", "CLI"],
    href: "/projects/ink/",
    repository: "",
    repositoryLabel: "",
  },
  {
    number: "03",
    title: "Active Directory Attack Lab",
    category: "Lab engineering",
    status: "Built & tested",
    description:
      "A custom three-machine Active Directory environment built by hand to study identity and endpoint configuration.",
    stack: ["Active Directory", "Windows", "Kerberos", "NTLM"],
    href: "/projects/active-directory-lab/",
    repository: "",
    repositoryLabel: "",
  },
];
