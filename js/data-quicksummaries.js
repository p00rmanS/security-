/* Quick Summaries — one plain-English "in one breath" sentence or two per
   lesson, shown at the top of every lesson card before the full 12-part
   breakdown. Keyed by lesson id, looked up in app.js via
   QUICK_SUMMARIES[lesson.id], so the large content files (data-domains.js,
   data-fundamentals.js) didn't need touching to add this. */

const QUICK_SUMMARIES = {
  // ---------- Fundamentals ----------
  "f-boot-process": "Your computer's firmware (BIOS or UEFI) checks the hardware and loads the OS every time you power on — and UEFI's Secure Boot refuses to run anything that isn't digitally signed and trusted.",
  "f-os-fundamentals": "Processes are programs running right now, services run quietly in the background, and permissions decide who can read, change, or run each file — least privilege means giving out only the access that's actually needed.",
  "f-command-line": "A handful of command-line tools answer most troubleshooting questions: ping checks if something's reachable, tracert shows the path, netstat shows local connections, and nslookup checks DNS.",
  "f-file-permissions": "Every file system controls who can read, write, or run a file — NTFS (Windows) and rwx bits (Linux) are both ways of enforcing that only the right people get access.",
  "f-patching": "Patching means installing updates that close known security holes — the longer a system goes unpatched after a fix is public, the bigger the target on its back.",
  "f-virtualization": "A hypervisor lets one physical computer run several separate virtual machines — convenient, but a flaw that lets an attacker break out of one VM into the host (VM escape) is a serious risk unique to virtualization.",
  "f-osi-tcpip": "The OSI model's 7 layers describe where in the network stack a device, protocol, or attack operates — switches work at Layer 2, routers at Layer 3, and most web traffic at Layer 7.",
  "f-ip-subnetting": "IP addresses identify devices on a network; private ranges (like 10.x or 192.168.x) only work inside your own network, and CIDR notation (like /24) is shorthand for how big that network is.",
  "f-ports-protocols": "Every network service listens on a numbered port — knowing the common ones (22 SSH, 53 DNS, 443 HTTPS, 3389 RDP) lets you recognize what traffic is doing at a glance.",
  "f-dns-dhcp": "DHCP automatically hands a device its network settings when it joins, and DNS translates human-friendly website names into the IP addresses computers actually use — both are common attack targets.",
  "f-routing-switching-vlans": "Switches connect devices within one network using MAC addresses; routers connect separate networks using IP addresses; VLANs split one physical network into isolated logical ones.",
  "f-firewall-nat-vpn-wifi": "Firewalls filter traffic in and out, NAT lets many devices share one public IP, VPNs create an encrypted tunnel across the open internet, and modern Wi-Fi security depends on WPA2/WPA3.",

  // ---------- Domain 1 ----------
  "d1-flagship": "Every security control has two labels: a category (technical, managerial, operational, or physical — HOW it's built) and a function (preventive, detective, corrective, deterrent, compensating, or directive — WHAT it does).",
  "d1-t2": "CIA (confidentiality, integrity, availability) is the goal of security; AAA (authentication, authorization, accounting) is how you enforce and track it; zero trust means never assuming anyone is safe just because they're already inside the network.",
  "d1-t3": "Change management is the approval process — request, review, test, schedule, and have a rollback plan — that keeps routine changes from accidentally causing outages or opening security holes.",
  "d1-t4": "Symmetric encryption uses one shared key (fast), asymmetric uses a public/private key pair (slower but no shared-secret problem), and hashing creates a one-way fingerprint used to prove data hasn't changed — not to hide it.",
  "d1-t5": "Physical security controls — fences, locks, badge readers, guards, cameras — protect people and equipment the same way technical controls protect data, and they layer together the same way too.",
  "d1-t4b": "PKI is the trust system behind certificates: a Certificate Authority vouches for identity, and revoked certificates get flagged through a CRL (a downloadable list) or OCSP (a real-time check).",
  "d1-t4c": "Attackers can break weak cryptography through collisions, downgrade attacks (forcing a weaker, older protocol), or poor key management — which is why key length and how keys are stored matter as much as the algorithm itself.",
  "d1-t3b": "Beyond getting approval, a good change request also plans for allow/deny list updates, expected downtime, restart requirements, and — most importantly — mapping what else depends on the thing being changed.",

  // ---------- Domain 2 ----------
  "d2-flagship": "Social engineering attacks (phishing, vishing, smishing, pretexting, whaling) target human psychology instead of technical flaws, exploiting things like urgency, authority, and trust to get people to act without thinking.",
  "d2-t1": "Threat actors are classified by their resources, sophistication, and motivation — nation-states are patient and well-funded, organized crime wants money fast, and hacktivists act publicly for a cause.",
  "d2-t2": "An attack surface is everything an attacker could possibly target; an attack vector is the one specific path they actually used to get in.",
  "d2-t3": "Vulnerabilities fall into a few buckets — application flaws, web-specific issues like SQL injection and XSS, and infrastructure weaknesses — and each has its own typical fix.",
  "d2-t4": "Malware, password attacks, and network attacks each have telltale patterns — like credential stuffing (real leaked passwords) versus password spraying (a few common passwords against many accounts) — that help you name exactly what's happening.",
  "d2-t5": "The right mitigation depends on matching the fix to the exact stage of the attack it addresses — segmentation stops spread, training stops entry, patching closes the hole itself.",
  "d2-t6": "Social engineering works because it exploits real psychological principles — authority, urgency, scarcity, social proof, likability — regardless of which channel (email, phone, text) delivers it.",
  "d2-t7": "Indicators of compromise are the individual clues — odd logins, unexpected file changes, unusual network traffic — that only become convincing evidence when you correlate several of them together.",
  "d2-t8": "Mobile devices have their own risk categories, from jailbreaking/rooting (removing built-in restrictions) to sideloading (installing apps outside the official store) to Bluetooth-specific attacks.",
  "d2-t9": "Risk doesn't just come from inside your own network — it can enter through a vendor's software, hardware, or dependencies, which is why a Software Bill of Materials (SBOM) matters when a new vulnerability is disclosed.",
  "d2-t10": "Not every threat comes from outside: insiders can cause harm on purpose (malicious), by mistake (negligent), or because their account was hijacked (compromised) — and shadow IT is employees quietly using unapproved apps or cloud services that IT can't see or protect.",
  "d2-t11": "Buffer overflows are a memory-size problem, race conditions (TOCTOU) are a timing problem between checking and using something, and memory/DLL injection hides malicious code inside a process security tools already trust.",
  "d2-t12": "ARP poisoning redirects traffic by lying to devices' ARP tables, MAC flooding overwhelms a switch until it broadcasts everything, DNS spoofing sends victims to a fake server under a trusted name, and DHCP starvation clears the way for a rogue DHCP server to hand out malicious settings.",

  // ---------- Domain 3 ----------
  "d3-flagship": "Defense in depth means layering multiple controls so no single failure exposes everything, and network segmentation (DMZs, VLANs, zones) limits how far an attacker can move after breaking in.",
  "d3-t1": "Different deployment models — on-prem, cloud, virtualized, containerized, serverless, edge — trade off cost, control, and who's responsible for what, which the shared responsibility model formalizes for cloud.",
  "d3-t2b": "Proxies, load balancers, and SD-WAN/SASE extend basic segmentation with smarter traffic handling — a reverse proxy protects servers from the internet, a forward proxy protects users going out to it.",
  "d3-t3": "Data needs different protections depending on its state — at rest (stored), in transit (moving), or in use (being processed) — and techniques like masking, tokenization, and classification all support that.",
  "d3-t4": "Resilience techniques (redundancy, clustering, geographic spread) and recovery metrics (RTO = how long you can be down, RPO = how much data you can afford to lose) work together to meet a business continuity requirement.",
  "d3-t2c": "Nearly every insecure legacy protocol has a secure replacement — Telnet to SSH, FTP to SFTP/FTPS, HTTP to HTTPS, SNMP to SNMPv3, LDAP to LDAPS — and the 'S' usually means encrypted.",
  "d3-t5": "Embedded, specialized, and IoT systems (medical devices, industrial controls, smart devices) are hard to patch and secure with normal IT tools, so they rely on compensating controls like network isolation instead.",
  "d3-t6": "Environmental controls — UPS and generators for power, hot/cold aisle containment for cooling, clean-agent fire suppression — protect availability at the physical facility level, not the data level.",
  "d3-t7": "Active/active high availability runs everything at full capacity all the time for zero downtime; active/passive keeps a cheaper backup idle until it's needed — it's a cost-versus-speed tradeoff.",
  "d3-t8": "A full zero trust architecture has three working parts: a policy engine that decides, a policy administrator that activates the decision, and a policy enforcement point that actually sits in the traffic and enforces it.",
  "d3-t9": "Firewalls evolved from simple packet filters to stateful inspection to next-generation (NGFW) with deep application awareness — while a WAF protects web applications specifically and a UTM bundles several security functions into one box.",
  "d3-t10": "Data loss prevention can run at the network, endpoint, or cloud level, and detects sensitive data either by pattern matching (looks like a credit card number) or exact fingerprinting (matches a specific real record).",
  "d3-t11": "Every piece of data has an owner who decides how sensitive it is and a custodian who actually protects it day to day — and when a drive is retired, how you destroy it (clear, purge, or destroy) has to match how sensitive that data was.",
  "d3-t12": "Cloud security responsibility splits between you and the provider, and where that line falls depends on the service model — but no matter what you're renting (IaaS, PaaS, or SaaS), your own data and who can access it is always your job, not the provider's.",
  "d3-t13": "A screened subnet is a network-connected buffer zone, an air gap has no network connection at all, a jump server centralizes admin access through one watched chokepoint, and microsegmentation locks down which individual servers can talk to each other even inside the same zone.",
  "d3-t14": "Full backups copy everything every time, incremental only copies what changed since the last backup of any kind (fast, but needs the whole chain to restore), and differential copies what changed since the last full backup (needs just two files to restore) — and immutable, offline backups are what actually saves you from ransomware that tries to destroy backups too.",

  // ---------- Domain 4 ----------
  "d4-flagship": "Incident response follows a set order — preparation, detection, analysis, containment, eradication, recovery, lessons learned — and skipping or reordering a phase is exactly what exam scenarios test.",
  "d4-t1": "Secure baselines and hardening reduce a system's attack surface by default, and mobile ownership models differ by who owns the device: BYOD (employee), COPE (company), or CYOD (company-owned, employee-chosen).",
  "d4-t2": "Asset management means knowing what you have across its whole lifecycle — you can't secure or properly dispose of a device you don't even know exists.",
  "d4-t3": "Vulnerability management is a full cycle — scan, prioritize, remediate, verify — and prioritization should weigh the CVSS score against real business context, not the score alone.",
  "d4-t4": "SIEM and SOAR tools pull together log sources, baselines, and synchronized time to turn raw data into alerts worth an analyst's attention — too many low-value alerts causes dangerous alert fatigue.",
  "d4-t5": "Layered technical controls — firewalls, IDS/IPS, content filtering, DLP, NAC, EDR/XDR — each catch different things, and the right response escalates from monitor to quarantine to full containment.",
  "d4-t6": "Identity and access management covers the account lifecycle, least privilege, separation of duties, privileged access management, and MFA — the practical machinery behind keeping the right people with the right access.",
  "d4-t7": "Automating security workflows saves time but comes with an 'automation blast radius' risk — a bad automated action can cause damage at scale, faster than a human could catch it.",
  "d4-t9": "Different investigations need different log sources — DHCP logs answer 'which device had this IP,' authentication logs answer 'who logged in' — and most real investigations need more than one source together.",
  "d4-t1b": "WPA3 replaced WPA2's handshake with SAE, a stronger method that resists offline password-guessing attacks WPA2 was vulnerable to — a key exam distinction between the two standards.",
  "d4-t10": "Secure applications are built in from the start with input validation, code signing, and testing — SAST reviews source code without running it, while DAST tests the live, running application.",
  "d4-t8b": "Digital forensics follows strict procedures — legal hold, forensic imaging, write blockers, chain of custody — because evidence that isn't handled correctly can become unusable.",
  "d4-t11": "Threat intelligence comes from several kinds of sources — OSINT (public), ISACs (industry-shared), and dark web monitoring (hidden) — each feeding proactive defense differently.",
  "d4-t12": "Threat hunting is proactively searching for compromise before any alert has fired, which makes it fundamentally different from incident response, which reacts after an alert already triggered.",
  "d4-t13": "Attack frameworks give defenders shared vocabulary: the Cyber Kill Chain describes attack stages in sequence, MITRE ATT&CK catalogs specific named techniques, and the Diamond Model connects adversary, capability, infrastructure, and victim.",
  "d4-t14": "Passkeys and passwordless authentication use public-key cryptography tied to a specific website, so even a perfectly convincing phishing page can't trick them into working on the wrong domain.",
  "d4-t15": "Incident communication means knowing who to notify, in what order, and what a post-incident report needs to contain — the human and organizational half of incident response, not just the technical fixes.",
  "d4-t16": "Kerberos issues tickets to prove identity without resending passwords, LDAP looks up directory information, RADIUS authenticates users connecting to a network, and TACACS+ authenticates administrators managing network devices.",
  "d4-t17": "Accounts have a full lifecycle — created with the right access, periodically rechecked so old access doesn't quietly pile up (privilege creep), and shut off the moment someone leaves — and knowing user vs. privileged vs. service vs. shared account types is exactly what the exam expects you to tell apart.",
  "d4-t18": "SCAP automates checking a system against a benchmark's rulebook, agent-based scanning installs software for deep always-on visibility, agentless scanning checks remotely with nothing installed, and File Integrity Monitoring watches specific critical files for unauthorized changes.",

  // ---------- Domain 5 ----------
  "d5-flagship": "Risk management means identifying risks, deciding how to treat them (avoid, transfer, mitigate, accept), and using ALE (Annualized Loss Expectancy = SLE x ARO) to justify whether a control is worth its cost.",
  "d5-t2": "SLE is actually Asset Value times Exposure Factor, risk assessments can be ad hoc, one-time, recurring, or continuous, and risk appetite (the general attitude), risk tolerance (the specific boundary), and risk exemption/exception (temporary vs. permanent waivers) are all distinct ideas the exam expects you to tell apart.",
  "d5-t1": "Governance documents form a hierarchy — policy sets the overall requirement, standard sets specific mandatory detail, procedure gives step-by-step instructions, and guideline is the only one that's optional.",
  "d5-t3": "Third-party risk means a vendor (or their own vendors) can introduce risk into your organization — supply-chain risk is a weak link in that chain, while concentration risk is relying on too few vendors overall.",
  "d5-t4": "Compliance isn't a one-time checkbox — it's an ongoing responsibility — and privacy principles like data minimization (collect less) and purpose limitation (don't reuse data for something else) run through most data-protection regulation.",
  "d5-t5": "Audits check whether controls actually work — internal audits are self-checks, external audits are independent — and red/blue/purple team exercises test defenses through simulated attack and defense roles.",
  "d5-t6": "A good security awareness program is measured by real outcomes — like faster phishing reporting or lower click rates — not just by who showed up to a training session.",
  "d5-t7": "A Business Continuity Plan keeps the whole organization running during a disruption; a Disaster Recovery Plan is the narrower piece focused specifically on restoring systems and data.",
  "d5-t8": "Anonymization permanently strips data of any way to trace it back to a person, while pseudonymization replaces identifying details with a stand-in that could still be reversed with a separately-held key.",
  "d5-t9": "Penetration tests vary by how much the tester already knows going in — black box (nothing), white box (everything), gray box (partial) — and can start with passive or active reconnaissance."
};
