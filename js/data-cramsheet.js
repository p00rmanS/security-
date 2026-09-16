/* Exam Cram Sheet content: mnemonics and must-memorize quick facts.
   Pro Tips (data-protips.js) are pulled in separately by the render
   function and grouped by domain, so they aren't duplicated here. */

const MNEMONICS = [
  { line: "Please Detect Any Compromise, Eradicate, Recover, Learn", expands: "Incident Response phases, in order: Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons Learned." },
  { line: "Please Do Not Throw Sausage Pizza Away", expands: "OSI model layers, bottom to top: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { line: "AAA = Authenticate, then Authorize, then Account", expands: "The order AAA happens in practice: prove who you are, THEN decide what you can do, THEN log what you did." },
  { line: "ALE = SLE times ARO", expands: "Annualized Loss Expectancy = Single Loss Expectancy x Annualized Rate of Occurrence. Cost-per-incident times incidents-per-year." },
  { line: "RTO is about Time, RPO is about data you'd Regret losing", expands: "Recovery Time Objective = how long you can be down. Recovery Point Objective = how much data you can afford to lose." },
  { line: "Hash it to check it, encrypt it to keep it secret", expands: "Hashing verifies integrity (one-way). Encryption protects confidentiality (reversible with a key)." },
  { line: "DORA: Discover, Offer, Request, Acknowledge", expands: "The four-step DHCP process a device goes through to get an IP address." },
  { line: "Spray wide, stuff what you already stole", expands: "Password spraying = one password against many accounts. Credential stuffing = reusing already-leaked real credentials elsewhere." }
];

const MUST_MEMORIZE = [
  { label: "Exam duration / question count", value: "90 minutes, maximum of 90 questions (multiple-choice + performance-based)." },
  { label: "Passing score", value: "750 on a scale of 100-900 — NOT a percentage. Don't panic at a number that looks low." },
  { label: "Domain weights", value: "General Concepts 12% · Threats/Vulns 22% · Architecture 18% · Operations 28% · Governance 20%." },
  { label: "CIA Triad", value: "Confidentiality, Integrity, Availability — the three goals almost every control maps back to." },
  { label: "AAA", value: "Authentication (who), Authorization (what you can do), Accounting (what you did)." },
  { label: "Incident Response phases (7)", value: "Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons Learned." },
  { label: "ALE formula", value: "ALE = SLE x ARO (cost per incident x incidents per year)." },
  { label: "RTO vs RPO", value: "RTO = max acceptable downtime (time). RPO = max acceptable data loss (measured in time since last good backup)." },
  { label: "Four risk treatments", value: "Avoid, Transfer, Mitigate, Accept." },
  { label: "Governance hierarchy", value: "Policy (mandatory, high-level) > Standard (mandatory, specific) > Procedure (mandatory, step-by-step) > Guideline (optional)." },
  { label: "Order of volatility", value: "Collect the most easily-lost evidence first: RAM, then disk, then remote logs." },
  { label: "Common ports", value: "22 SSH · 25 SMTP · 53 DNS · 80 HTTP · 443 HTTPS · 389/636 LDAP/LDAPS · 445 SMB · 3389 RDP." },
  { label: "OSI quick layers", value: "L2 switches/MAC · L3 routers/IP · L4 TCP/UDP ports · L7 HTTP/DNS/app content." },
  { label: "MFA factor categories", value: "Something you know, something you have, something you are (and increasingly somewhere you are / something you do)." }
];
