export const profile = {
  name: "Arman Mishra",
  alias: "Enkidu",
  title: "Penetration Tester",
  availability: "Open to penetration testing and red team internships",
  tagline: "The wild man learnt to enumerate.",
  email: "contact@armanmishra.in",
  linkedin: "https://www.linkedin.com/in/armanmishra/",
  github: "https://github.com/enkidudev",
  education: "BCA, Specialization in Cyber Security",
  university: "Lovely Professional University",
  graduation: "Expected 2028",
  summary:
    "I work across web application, network, Windows, Linux, and Active Directory security. My approach is grounded in careful enumeration, evidence-led validation, and practical security research. Alongside hands-on testing, I build security tools, labs, and CTF challenges.",
};

export const certifications = [
  {
    name: "HTB Certified Penetration Testing Specialist",
    short: "CPTS",
    issuer: "Hack The Box",
    issued: "November 2026",
    description:
      "Practical penetration-testing certification covering end-to-end assessment methodology across network, web, Windows, Linux, and Active Directory environments.",
    url: "https://www.credly.com/badges/42d1f8ac-4481-4d7f-9eb0-e23ea241822c/public_url",
  },
  {
    name: "Practical Junior Penetration Tester",
    short: "PJPT",
    issuer: "TCM Security",
    issued: "2026",
    description:
      "Practical penetration-testing certification focused on foundational internal network and Active Directory assessment skills.",
    url: "https://certified.tcm-sec.com/46c7b3fe-52e3-43b5-a6c5-ea89bf292ccb?key=fcabe8ae0bf92ca6dbe77dd2a6c43e98461ed0745e698c32e0cc78facbf94e60#acc.JEde5BY2",
  },
];

export const skillGroups = [
  {
    title: "Programming & scripting",
    items: ["Python", "C", "C++", "Bash"],
  },
  {
    title: "Reconnaissance & network discovery",
    items: ["Nmap / NSE", "RustScan", "Masscan", "Wireshark"],
  },
  {
    title: "Web application testing",
    items: ["Burp Suite", "ffuf", "Feroxbuster", "Gobuster", "dirsearch", "Nuclei", "Nikto", "SQLmap"],
  },
  {
    title: "Active Directory & Windows",
    items: [
      "NetExec", "Impacket", "BloodHound", "Certipy", "bloodyAD",
      "Kerbrute", "enum4linux-ng", "Windapsearch", "RustHound-CE",
      "Evil-WinRM", "Responder", "Pypykatz",
    ],
  },
  {
    title: "Post-exploitation & credential auditing",
    items: ["Metasploit", "Hashcat", "John the Ripper", "Hydra"],
  },
  {
    title: "Pivoting & personal tooling",
    items: ["Ligolo-ng", "Shredder", "INK"],
  },
];

export const socialLinks = [
  { label: "GitHub", url: profile.github },
  { label: "LinkedIn", url: profile.linkedin },
  { label: "Email", url: `mailto:${profile.email}` },
];
