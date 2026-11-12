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
    title: "INK",
    category: "Credential & evidence management",
    status: "Open source",
    description:
      "A local-first, passphrase-encrypted credential notebook for penetration testing. Capture identities, preserve authentication evidence, track reuse observations, and export offline HTML reports.",
    stack: ["Python", "SQLite", "Fernet", "CLI"],
    href: "/projects/ink/",
    repository: "https://github.com/enkidudev/INK",
    repositoryLabel: "View GitHub repository",
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
