/* More lessons, part B (Domains 4-5). Ids use the t16x range to avoid
   collisions with other contributors' lessons. Registers a bundle on
   globalThis.__DEEP; data-lessons-merge.js (loaded last) merges it. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d4: [
      {
        id: "d4-t160",
        title: "Threat Intelligence Sharing: STIX, TAXII, ISACs, and Using Intel Well",
        tag: "4.3",
        minutes: 18,
        goal: "Describe the types and sources of threat intelligence, how it is shared in standard formats, and how to judge whether a piece of intel is worth acting on.",
        why: "Threat intelligence is only useful if it is accurate, timely, and relevant. The exam asks where intel comes from, how organizations exchange it, and what makes it good, and it expects you to know the names STIX, TAXII, and ISAC.",
        simple:
          "Threat intelligence is evidence-based knowledge about adversaries, their tools, and their methods that helps defenders make decisions. It comes from many sources. OSINT (open-source intelligence) is gathered from public information such as security blogs, vendor reports, social media, and vulnerability databases. Proprietary or commercial feeds are sold by security vendors, closed or private sources are shared among trusted groups, government sources such as CISA publish alerts, and the dark web is monitored for stolen credentials and plans being discussed. ISACs (Information Sharing and Analysis Centers) are industry-specific communities, for example for financial services or healthcare, in which members share threats relevant to their sector. Intel is also classified by purpose. STRATEGIC intelligence is high-level trends for executives; OPERATIONAL intelligence describes campaigns and attacker intent for incident responders and hunters; TACTICAL intelligence covers adversary tactics, techniques, and procedures (TTPs) that defenders use to build detections; and TECHNICAL intelligence consists of concrete indicators of compromise (IOCs) such as file hashes, IP addresses, and domains. To share intel between organizations and tools automatically, the community uses standards. STIX (Structured Threat Information eXpression) is a common LANGUAGE for describing threat information, and TAXII (Trusted Automated eXchange of Indicator Information) is the TRANSPORT that carries STIX content between systems over HTTPS. CISA's Automated Indicator Sharing (AIS) program uses these standards. Not all intel is equal, so it is evaluated by its timeliness (is it current?), relevance (does it apply to our industry, technology, and region?), and accuracy and confidence (how reliable is the source?). Indicators age quickly: an IP address used by an attacker last month may belong to an innocent customer today, so stale or unverified IOCs cause false positives. The most durable intelligence is about behavior (TTPs), because attackers can change a file hash trivially but find it much harder to change how they operate. Good programs turn intel into action: updating blocklists and detection rules, guiding threat hunts, prioritizing patching of vulnerabilities that attackers are exploiting, and informing risk decisions.",
        deepDive: [
          { h: "Source types and trust", list: [
            "OSINT: free and plentiful, but needs verification.",
            "Commercial/proprietary feeds: curated and often enriched, at a cost.",
            "Government (for example CISA advisories, national CERTs): authoritative and often free.",
            "ISACs/ISAOs: sector-specific, trusted communities with highly relevant context.",
            "Internal intelligence: your own incident data and logs, which is the most relevant of all.",
            "Dark web and underground forums: early warning of leaked credentials and planned attacks, with attribution and legal care required."
          ] },
          { h: "The four intelligence levels", list: [
            "Strategic: who is targeting our sector and why; informs executives and budgets.",
            "Operational: details of specific campaigns and timing; informs hunters and incident responders.",
            "Tactical: attacker TTPs, often mapped to frameworks such as MITRE ATT&CK; informs detection engineering.",
            "Technical: IOCs such as hashes, IPs, domains, and URLs; informs automated blocking."
          ] },
          { h: "STIX and TAXII in one sentence each", p: "STIX defines WHAT is said about a threat (indicators, malware, actors, campaigns, relationships) in a consistent, machine-readable structure. TAXII defines HOW that content is exchanged between servers and clients (for example, a collection you subscribe to, or push to partners). Together they let tools exchange intelligence without manual copying." },
          { h: "The Pyramid of Pain", p: "Security researcher David Bianco ranked indicators by how much it hurts an attacker when you detect and block them. At the bottom, file hashes and IP addresses are trivial for an attacker to change. Domain names and network or host artifacts are harder. Tools are harder still. At the top, TTPs, the way the attacker actually operates, are the most painful to change. Defenses based on TTPs last the longest." },
          { h: "Judging intel before you act on it", list: [
            "Source reliability and how the intel was obtained.",
            "Age: when was it observed, and is it still valid?",
            "Context: does it apply to our industry, technology stack, and geography?",
            "Corroboration: is it confirmed by a second source?",
            "Confidence level and the chance of false positives, especially for IP-based indicators."
          ] }
        ],
        keyTerms: [
          { term: "OSINT", def: "Open-source intelligence: information gathered from publicly available sources." },
          { term: "ISAC", def: "Information Sharing and Analysis Center: an industry-specific community for sharing threat intelligence." },
          { term: "STIX", def: "Structured Threat Information eXpression: a standardized language for describing cyber threat information." },
          { term: "TAXII", def: "Trusted Automated eXchange of Indicator Information: the protocol for exchanging STIX content." },
          { term: "IOC", def: "Indicator of Compromise: observable evidence of an intrusion such as a hash, IP address, or domain." },
          { term: "TTP", def: "Tactics, techniques, and procedures: how an adversary operates." },
          { term: "AIS", def: "Automated Indicator Sharing: CISA's service for exchanging indicators using STIX/TAXII." },
          { term: "Threat Feed", def: "A continuous stream of indicators or intelligence items from a provider." },
          { term: "Confidence Level", def: "A rating of how reliable a piece of intelligence is." }
        ],
        analogy:
          "Threat intelligence is like neighborhood-watch news. OSINT is what you read in the public newspaper; an ISAC is the tight group of shop owners on your street who tell each other about the specific scammer who visited this week. STIX is the standard incident-report form everyone fills out the same way, and TAXII is the courier service that delivers those forms. A license-plate number (an IOC) is useful today but the thief changes cars; knowing his habit of striking at closing time (a TTP) helps you for a long time.",
        technical:
          "A hospital's security team joins a healthcare ISAC and receives a STIX bundle over TAXII describing a ransomware campaign targeting hospitals, including file hashes, command-and-control domains, and the group's TTPs. The team automatically loads the domains and hashes into its DNS filter and EDR, checks logs for the past 30 days for matches (finding none), and uses the TTPs to write a detection for the attacker's habit of disabling backups with a particular command. A week later, an IP address from the feed turns up as a false positive because it now belongs to a legitimate cloud service, so the team adds an expiry date to all IP-based indicators.",
        table: {
          headers: ["Level", "Audience", "Content", "Shelf life"],
          rows: [
            ["Strategic", "Executives", "Trends, motives, sector risk", "Long"],
            ["Operational", "Responders, hunters", "Campaigns, timing, attacker intent", "Medium"],
            ["Tactical", "Detection engineers, SOC", "TTPs, techniques", "Long"],
            ["Technical", "Automated tools", "Hashes, IPs, domains (IOCs)", "Short"]
          ]
        },
        confusion: [
          { a: "STIX", b: "TAXII", diff: "STIX is the format (the language) describing the threat. TAXII is the transport (the delivery mechanism) that exchanges it." },
          { a: "IOC", b: "TTP", diff: "An IOC is a specific artifact (a hash, an IP). A TTP is the attacker's behavior. TTPs last longer because they are harder to change." },
          { a: "OSINT", b: "ISAC intelligence", diff: "OSINT is public and open to all. ISAC intelligence is shared within a trusted, sector-specific community." },
          { a: "Threat intelligence", b: "Threat hunting", diff: "Intelligence is knowledge about adversaries. Hunting is the proactive search through your own environment, often guided by that intelligence." },
          { a: "Timely intel", b: "Relevant intel", diff: "Timely means current. Relevant means it applies to your environment. Good intel needs both." }
        ],
        soc: "In a SOC, intelligence arrives as feeds into the SIEM, EDR, and DNS filter, as ISAC alerts, and as advisories about vulnerabilities being exploited. Analysts enrich alerts with intel to decide priority, retro-hunt logs for newly published indicators, and manage indicator lifecycles so expired or low-confidence items do not generate noise.",
        patterns: [
          ["Industry-specific community sharing threats among members", "ISAC"],
          ["Language that describes threat information in a standard format", "STIX"],
          ["Protocol that transports threat information between systems", "TAXII"],
          ["Information gathered from public sources", "OSINT"],
          ["File hashes, IP addresses, and domains seen in an attack", "IOCs (technical intelligence)"],
          ["How an adversary operates, mapped to ATT&CK", "TTPs (tactical intelligence)"],
          ["Indicator is months old and may no longer be valid", "Timeliness / stale intel risk"],
          ["Which indicators are hardest for attackers to change", "TTPs (top of the Pyramid of Pain)"]
        ],
        takeaways: [
          "STIX describes, TAXII delivers; ISACs share within an industry.",
          "Judge intel by timeliness, relevance, and accuracy before acting on it.",
          "Behavior (TTPs) outlasts artifacts (hashes and IPs)."
        ],
        remember: [
          "STIX = the language/format. TAXII = the transport. ISAC = sector-specific sharing community.",
          "OSINT = public sources. Proprietary/commercial = paid feeds. Government sources = for example CISA.",
          "Four levels: strategic (executives), operational (campaigns), tactical (TTPs), technical (IOCs).",
          "Evaluate intel for timeliness, relevance, and accuracy/confidence.",
          "IOCs go stale quickly; TTPs are the most durable and hardest for attackers to change.",
          "Use intel to update blocks and detections, guide threat hunts, and prioritize patching.",
          "Your own incident data is the most relevant intelligence you have."
        ],
        taglish:
          "Ang threat intelligence ay kaalaman tungkol sa mga attacker at paraan nila. Galing ito sa OSINT (pampublikong impormasyon), bayad na feed, gobyerno (tulad ng CISA), at ISAC (grupo ng parehong industriya na nagbabahagian ng banta). Para mapag-usapan ng mga tool: STIX ang wika o format, TAXII ang paraan ng paghahatid. Hindi lahat ng intel ay mapagkakatiwalaan: tingnan kung napapanahon ba, kaugnay sa iyo, at tama. Madaling mapalitan ng attacker ang hash at IP (IOC), pero mahirap baguhin ang kanilang kilos (TTP), kaya mas tumatagal ang depensa na nakabatay doon."
      },
      {
        id: "d4-t161",
        title: "Hardening the Operating System: Secure Boot, Group Policy, SELinux, and Baselines",
        tag: "4.1",
        minutes: 20,
        goal: "Explain how secure boot builds a chain of trust, and apply operating system hardening using baselines, Group Policy, SELinux, and the principle of least functionality.",
        why: "Hardening is the unglamorous work that prevents a huge share of compromises, and the exam names its building blocks: secure boot, baselines, group policy, SELinux, patching, and disabling unneeded services.",
        simple:
          "HARDENING means reducing a system's attack surface by removing or locking down everything it does not need. It starts before the operating system loads. UEFI firmware replaced the old BIOS, and SECURE BOOT makes the firmware verify the digital signature of each boot component (bootloader, kernel, drivers) against trusted keys, refusing to run anything unsigned or tampered with, which blocks bootkits and rootkits. MEASURED BOOT goes a step further by recording a hash of each component into the TPM, so a remote system can check (attest) that the device booted in a known-good state. Firmware should itself be updated and protected with an administrator password, and booting from USB should be disabled where it is not needed. Within the operating system, hardening is guided by a SECURE BASELINE: a documented, approved configuration, often based on industry guidance such as the CIS Benchmarks or DISA STIGs, that every new system starts from. The core idea is LEAST FUNCTIONALITY: remove unneeded software, disable unused services, ports, and protocols, change default credentials, apply security updates, and enable logging. In Windows domains, GROUP POLICY lets administrators push configuration centrally to many computers and users at once: password and lockout policies, restrictions on removable storage, firewall settings, application restrictions such as AppLocker, and audit settings. On Linux, SELINUX (and similar tools such as AppArmor) adds mandatory access control: even a process running as root is confined by policy to what it is explicitly allowed to do, which limits the damage if a service is compromised. Other standard measures include using standard user accounts with least privilege (and sudo for elevation), key-based authentication for SSH with root login disabled, host firewalls, full-disk encryption, and application allowlisting. Finally, hardening is not a one-time job: configuration drift is detected by comparing systems against the baseline, using tools that check compliance (for example SCAP-based scanners), and changes are made through change management.",
        deepDive: [
          { h: "The chain of trust at boot", list: [
            "Firmware (UEFI) verifies the bootloader's signature using keys stored in firmware.",
            "The bootloader verifies the operating system kernel.",
            "The kernel verifies drivers and early-launch components.",
            "With measured boot, each stage's hash is recorded in the TPM, enabling attestation.",
            "A failure at any step stops the boot or flags the system as untrusted."
          ] },
          { h: "Boot-level threats this stops", list: [
            "Bootkits and rootkits that load before the operating system and its security tools.",
            "Unsigned or tampered drivers.",
            "Booting a rogue operating system from a USB drive to bypass the installed one (also address with firmware password and disabling external boot)."
          ] },
          { h: "Baseline and least-functionality checklist", list: [
            "Start from an approved baseline image (CIS Benchmark, DISA STIG, or vendor guidance).",
            "Remove unneeded software and disable unnecessary services, ports, and protocols (for example legacy SMBv1, Telnet).",
            "Change default accounts and passwords; disable or rename built-in accounts where possible.",
            "Apply patches on a defined schedule and enable automatic updates where appropriate.",
            "Enable and forward logs; synchronize time.",
            "Turn on host firewall and endpoint protection; encrypt disks.",
            "Restrict administrative rights; require MFA for privileged access."
          ] },
          { h: "Group Policy examples", list: [
            "Enforce password length, complexity or banned-password rules, and account lockout thresholds.",
            "Block or restrict USB storage devices.",
            "Control which applications may run (AppLocker or similar).",
            "Configure the Windows firewall and audit policy centrally.",
            "Apply settings to organizational units (OUs) so different groups can have different baselines."
          ] },
          { h: "SELinux in plain terms", p: "Normal Linux permissions are discretionary: the owner decides. SELinux adds a mandatory layer in which every process and file has a label, and a central policy says which labels may interact. A compromised web server process, even running with high privileges, can only touch what the policy allows for web servers. Modes are enforcing (policy is applied and violations blocked), permissive (violations are logged but allowed, used for testing), and disabled." },
          { h: "Keeping systems hardened", list: [
            "Detect configuration drift with compliance scans against the baseline.",
            "Manage changes through approved change requests and update the baseline when requirements change.",
            "Use configuration management or infrastructure as code so systems are rebuilt to the same standard."
          ] }
        ],
        keyTerms: [
          { term: "Secure Boot", def: "UEFI feature that only runs signed, trusted boot components." },
          { term: "Measured Boot", def: "Recording hashes of boot components into the TPM to enable attestation." },
          { term: "UEFI", def: "Unified Extensible Firmware Interface: the modern replacement for BIOS, supporting secure boot." },
          { term: "Secure Baseline", def: "A documented, hardened configuration used as the starting point for systems." },
          { term: "CIS Benchmarks", def: "Detailed secure configuration guides for specific operating systems and products." },
          { term: "Least Functionality", def: "Configuring systems to provide only the functions required and nothing more." },
          { term: "Group Policy", def: "Windows domain feature for centrally managing configuration and security settings." },
          { term: "SELinux", def: "Linux mandatory access control framework that confines processes using labels and policy." },
          { term: "Configuration Drift", def: "Gradual deviation of a system from its approved baseline." },
          { term: "Attestation", def: "Cryptographic proof, usually via the TPM, that a device is in a known-good state." }
        ],
        analogy:
          "Hardening a computer is like preparing a house for sale to a nervous buyer. Secure boot is a guard who checks the ID of every contractor before they enter at the start of the day. The baseline is the checklist of what every house must have. Least functionality is removing doors and windows nobody uses. Group Policy is the building manager changing every lock in the complex from one office. SELinux is house rules that apply even to the owner's own plumber: he may touch the pipes, but not open the safe.",
        technical:
          "A company builds a standard Windows image from the CIS Benchmark, with Secure Boot and BitLocker enabled, SMBv1 and Telnet disabled, and local administrator passwords randomized. Group Policy pushes password and lockout settings, blocks USB mass storage for most departments, and applies an application allowlist on finance machines. On the Linux web servers, SELinux runs in enforcing mode, SSH allows only key-based logins with root disabled, and unneeded packages are removed. A weekly compliance scan compares every machine with the baseline and opens tickets for drift.",
        table: {
          headers: ["Control", "Where it works", "What it does"],
          rows: [
            ["Secure Boot", "Firmware / startup", "Only signed boot components run"],
            ["Measured Boot + TPM", "Startup", "Records boot hashes for attestation"],
            ["Secure baseline (CIS/STIG)", "Whole OS", "Approved, hardened starting configuration"],
            ["Group Policy", "Windows domain", "Central configuration and restrictions"],
            ["SELinux / AppArmor", "Linux", "Mandatory access control confining processes"],
            ["Disable unneeded services and ports", "Whole OS", "Reduces attack surface"],
            ["Compliance scanning (SCAP)", "Fleet", "Detects configuration drift"]
          ]
        },
        confusion: [
          { a: "Secure Boot", b: "Measured Boot", diff: "Secure Boot BLOCKS unsigned boot components. Measured Boot RECORDS what loaded (in the TPM) so it can be verified later." },
          { a: "UEFI", b: "BIOS", diff: "UEFI is the modern firmware interface that supports secure boot and larger drives. BIOS is the older legacy interface without those protections." },
          { a: "SELinux enforcing", b: "SELinux permissive", diff: "Enforcing blocks policy violations. Permissive only logs them, useful when developing a policy." },
          { a: "Baseline", b: "Hardening", diff: "A baseline is the documented target configuration. Hardening is the work of applying it and removing unneeded exposure." },
          { a: "Group Policy", b: "Local policy", diff: "Group Policy is applied centrally across a domain. Local policy applies to a single machine." }
        ],
        soc: "Hardening shows up in investigations as the reason an attack failed (the macro was blocked by policy, USB was disabled) or the reason it succeeded (a default password, SMBv1 still on, SELinux set to permissive). Drift alerts and failed secure-boot or attestation checks are early signs of tampering that analysts should treat seriously.",
        patterns: [
          ["Only digitally signed bootloaders and drivers may load", "Secure Boot (UEFI)"],
          ["Prove to a remote system that the device booted cleanly", "Measured boot with TPM attestation"],
          ["Approved starting configuration for every new server", "Secure baseline / hardened image"],
          ["Push password and USB restrictions to all domain PCs", "Group Policy"],
          ["Confine a Linux service even if it runs as root", "SELinux (mandatory access control)"],
          ["Remove unneeded services, ports, and software", "Least functionality / attack surface reduction"],
          ["System slowly differs from the approved configuration", "Configuration drift; compliance scanning"],
          ["Block booting from an external USB drive", "Firmware settings and password"]
        ],
        takeaways: [
          "Secure boot builds a chain of trust; measured boot records it for attestation.",
          "Harden from an approved baseline and apply least functionality.",
          "Group Policy (Windows) and SELinux (Linux) enforce configuration and confinement at scale."
        ],
        remember: [
          "Secure Boot = only signed boot components run. Measured Boot = hashes recorded in the TPM for attestation.",
          "UEFI replaced BIOS and supports Secure Boot.",
          "Baselines: CIS Benchmarks, DISA STIGs. Start every system from one.",
          "Least functionality: disable unneeded services, ports, protocols, and software; change defaults.",
          "Group Policy = central Windows configuration. SELinux = Linux mandatory access control (enforcing vs permissive).",
          "Detect configuration drift with compliance scans; change baselines through change management.",
          "Also: host firewall, full-disk encryption, least privilege, key-based SSH, patching."
        ],
        taglish:
          "Ang hardening ay pagbabawas ng pwedeng atakihin sa system. Magsisimula ito sa boot: ang Secure Boot, mga naka-sign lang na bootloader at driver ang papayagang tumakbo, at ang Measured Boot, nire-record sa TPM ang bawat hakbang para ma-verify ng ibang system. Sa OS, gumamit ng baseline (tulad ng CIS Benchmark), patayin ang hindi kailangang service at port, at palitan ang default na password. Sa Windows, ang Group Policy ang nagtutulak ng setting sa maraming computer nang sabay. Sa Linux, ang SELinux ang naglilimita sa kayang gawin ng bawat proseso, kahit root pa ito. At bantayan ang configuration drift."
      },
      {
        id: "d4-t162",
        title: "Incident Response Exercises, Root Cause Analysis, and Metrics",
        tag: "4.8",
        minutes: 20,
        goal: "Compare incident response exercise types, carry out a root cause analysis and lessons-learned review, and recognize the metrics that show whether response is improving.",
        why: "A plan nobody has practiced fails under pressure. The exam asks which exercise fits a goal, what a lessons-learned review should produce, and how NIST's phases map to the seven steps you already know.",
        simple:
          "An incident response plan is only as good as the people who have rehearsed it. EXERCISES test the plan, roles, tools, and communication before a real incident. A TABLETOP exercise is a facilitated discussion in which participants talk through a scenario ('ransomware has hit the file servers; what do we do?') without touching any systems; it is cheap and ideal for decision-makers. A WALKTHROUGH steps through the plan's procedures to check they are complete and make sense. A SIMULATION adds realistic, hands-on elements, such as injected alerts in a test environment, so analysts practice using tools. A full-scale LIVE exercise or adversary-emulation test (red team or purple team) exercises people, process, and technology together under realistic pressure. After a real incident or an exercise, the team holds a LESSONS-LEARNED (post-incident) review, ideally within days or a couple of weeks while memories are fresh. The review is blameless in tone and produces a timeline, an assessment of what worked and what did not, and corrective actions with owners and due dates, which feed back into the plan, playbooks, training, and controls. A key part is ROOT CAUSE ANALYSIS (RCA): looking beyond the symptom to the underlying reason the incident was possible. Techniques include the '5 Whys' (keep asking why until you reach a cause you can fix) and fishbone diagrams. For example, 'the server was encrypted' leads to 'a user opened a malicious attachment', then 'the email filter did not block it', then 'the filter rule update was delayed', and finally 'no one owned the update process'. Fixing only the first answer leaves the real weakness. Response is also measured. MTTD (mean time to detect) and MTTR (mean time to respond or recover) show speed, DWELL TIME is how long an attacker was present before discovery, and counts, costs, and recurrence rates show trends. NIST SP 800-61 describes the process in four phases (preparation; detection and analysis; containment, eradication, and recovery; and post-incident activity), which correspond to the seven steps the exam uses: preparation, detection, analysis, containment, eradication, recovery, and lessons learned.",
        deepDive: [
          { h: "Exercise types compared", list: [
            "Tabletop: discussion only, low cost and low risk; tests decisions, roles, and communication.",
            "Walkthrough: step-by-step review of the plan to find gaps and confusing instructions.",
            "Simulation: realistic scenario with hands-on actions in a safe environment.",
            "Live / full-scale exercise: exercises real systems and people; highest realism and risk.",
            "Red/purple team engagement: an adversary emulation to test detection and response; purple teaming has attackers and defenders collaborating to improve detection."
          ] },
          { h: "A good lessons-learned meeting", list: [
            "Held soon after the incident, with everyone involved, in a blameless format.",
            "Build an accurate timeline: when it started, when detected, when contained, when recovered.",
            "Ask: what happened, what worked, what did not, what would we do differently?",
            "Record corrective actions with an owner and a deadline; track them to completion.",
            "Update the plan, playbooks, detections, and training; share findings with leadership."
          ] },
          { h: "Root cause analysis methods", list: [
            "5 Whys: repeatedly ask 'why' to move from symptom to underlying cause.",
            "Fishbone (Ishikawa) diagram: map contributing causes by category such as people, process, technology.",
            "Timeline analysis: line up events to find where controls failed.",
            "Aim for causes you can fix (a missing process or control), not 'human error' alone."
          ] },
          { h: "Metrics that matter", list: [
            "MTTD: average time from compromise to detection.",
            "MTTR: average time to respond to, contain, or recover from incidents (define which in your program).",
            "Dwell time: how long an attacker stayed before being found.",
            "Incident counts by type, cost, and repeat incidents of the same cause.",
            "Exercise results: time to assemble the team, decisions made, gaps found."
          ] },
          { h: "Mapping the frameworks", p: "The exam uses seven steps: preparation, detection, analysis, containment, eradication, recovery, lessons learned. NIST SP 800-61 groups them as preparation; detection and analysis; containment, eradication, and recovery; and post-incident activity. They describe the same lifecycle with different groupings." }
        ],
        keyTerms: [
          { term: "Tabletop Exercise", def: "A discussion-based walk through an incident scenario with no systems touched." },
          { term: "Walkthrough", def: "A step-by-step review of the response plan's procedures." },
          { term: "Simulation", def: "A realistic, hands-on scenario run in a safe environment." },
          { term: "Lessons Learned", def: "A post-incident review producing findings and corrective actions." },
          { term: "Root Cause Analysis", def: "Identifying the underlying cause of an incident rather than only its symptoms." },
          { term: "5 Whys", def: "A technique that repeatedly asks 'why' to reach a root cause." },
          { term: "MTTD", def: "Mean Time To Detect: average time from compromise to detection." },
          { term: "MTTR", def: "Mean Time To Respond or Recover: average time to handle an incident." },
          { term: "Dwell Time", def: "How long an attacker is present in an environment before being detected." },
          { term: "Purple Team", def: "Collaboration between attackers (red) and defenders (blue) to improve detection and response." }
        ],
        analogy:
          "A fire drill is the right comparison. A tabletop is the managers sitting around a table discussing 'what if there is a fire on the second floor'. A walkthrough is walking the escape route while reading the plan. A simulation is sounding the alarm and actually evacuating one floor. A live exercise is a full building evacuation with the fire department. The lessons-learned review is the debrief afterward, and root cause analysis asks not 'who forgot the door' but 'why did the door stay locked'.",
        technical:
          "After a phishing-driven ransomware incident, the team's review builds a timeline showing the compromise began 9 days before encryption (dwell time) and was detected only when files were encrypted (MTTD of 9 days). A 5 Whys analysis traces the incident to an email filter rule that had not been updated because nobody owned the task. Corrective actions assign an owner, add a detection for the early-stage behavior the EDR logged but nobody reviewed, and schedule a tabletop for executives on ransomware decision-making, including whether to pay and when to notify regulators.",
        table: {
          headers: ["Exercise", "Systems touched?", "Participants", "Best for"],
          rows: [
            ["Tabletop", "No", "Decision-makers and responders", "Roles, decisions, communication"],
            ["Walkthrough", "No", "Plan owners and responders", "Finding gaps in procedures"],
            ["Simulation", "Test environment", "Analysts and responders", "Practicing tools and technical steps"],
            ["Live / full-scale", "Yes", "Everyone involved", "End-to-end realism"],
            ["Red / purple team", "Yes (controlled)", "Attackers and defenders", "Testing and improving detection"]
          ]
        },
        confusion: [
          { a: "Tabletop", b: "Simulation", diff: "A tabletop is discussion only. A simulation includes realistic hands-on actions with tools and alerts." },
          { a: "Root cause", b: "Symptom", diff: "The symptom is what you see (files encrypted). The root cause is the underlying failure that made it possible (no owner for filter updates)." },
          { a: "MTTD", b: "MTTR", diff: "MTTD measures how quickly you notice an incident. MTTR measures how quickly you respond or recover once it is noticed." },
          { a: "Dwell time", b: "MTTD", diff: "Dwell time is how long the attacker was present. MTTD is the average of those detection delays across incidents." },
          { a: "Lessons learned", b: "Blame assignment", diff: "A lessons-learned review aims to improve processes and controls. It should be blameless so people share facts freely." }
        ],
        soc: "Exercise results and incident metrics are how a SOC proves it is improving: shorter detection and containment times, fewer repeat causes, and playbooks that match what analysts actually do. After-action items must be tracked to closure, because the most common failure is writing a good report and never fixing what it found.",
        patterns: [
          ["Executives discuss a ransomware scenario without touching systems", "Tabletop exercise"],
          ["Analysts respond to injected alerts in a test environment", "Simulation"],
          ["Read through the plan step by step to check it is complete", "Walkthrough"],
          ["Ask 'why' repeatedly to find the underlying cause", "Root cause analysis (5 Whys)"],
          ["Meeting after the incident to improve the plan", "Lessons learned / post-incident review"],
          ["Average time to notice an intrusion", "MTTD"],
          ["How long the attacker was inside before discovery", "Dwell time"],
          ["Attackers and defenders collaborate to improve detection", "Purple team"]
        ],
        takeaways: [
          "Match the exercise to the goal: tabletop for decisions, simulation for hands-on skills, live for full realism.",
          "Lessons learned must produce corrective actions with owners and deadlines.",
          "Root cause analysis looks past the symptom to a fixable underlying cause."
        ],
        remember: [
          "Tabletop = discussion. Walkthrough = step-through of the plan. Simulation = hands-on in a safe environment. Live = real systems.",
          "Lessons learned: blameless, timely, produces a timeline and assigned corrective actions.",
          "Root cause analysis: 5 Whys or fishbone; fix the cause, not just the symptom.",
          "MTTD = time to detect. MTTR = time to respond/recover. Dwell time = attacker's time undetected.",
          "Seven steps: preparation, detection, analysis, containment, eradication, recovery, lessons learned.",
          "NIST SP 800-61 groups them into four phases ending with post-incident activity.",
          "Purple team = red and blue collaborating."
        ],
        taglish:
          "Hindi sapat na may plano lang, kailangan itong ipraktis. Tabletop, usapan lang ng scenario, walang ginagalaw na system. Walkthrough, binabasa at sinusuri ang mga hakbang ng plano. Simulation, may totoong hands-on na gawain sa test environment. Pagkatapos ng insidente, gawin ang lessons-learned, walang sisihan, at gumawa ng timeline at mga corrective action na may may-ari at deadline. Gamitin ang root cause analysis (5 Whys) para hanapin ang tunay na ugat, hindi lang ang sintomas. At sukatin: MTTD (gaano kabilis natuklasan), MTTR (gaano kabilis naresolba), at dwell time (gaano katagal nakapasok ang attacker)."
      }
    ],

    d5: [
      {
        id: "d5-t160",
        title: "The Penetration Test Lifecycle: Reconnaissance, Exploitation, Reporting, and Team Colors",
        tag: "5.5",
        minutes: 20,
        goal: "Describe the stages of a penetration test, distinguish passive from active reconnaissance, and explain the roles of rules of engagement and the red, blue, purple, and white teams.",
        why: "Penetration testing is tested as both a concept and a process. Knowing the order of the stages, that written authorization comes first, and which team does what lets you answer scenario questions quickly.",
        simple:
          "A penetration test is an authorized, simulated attack against a system to find weaknesses before real attackers do. Everything starts with PRE-ENGAGEMENT: a written agreement defining the scope (what is in and out of bounds), the RULES OF ENGAGEMENT (allowed techniques, timing, emergency contacts, how sensitive findings are handled), and explicit authorization, which is the legal difference between testing and crime. The test then follows a lifecycle. RECONNAISSANCE gathers information. PASSIVE reconnaissance collects information without touching the target's systems, using public sources such as search engines, WHOIS and DNS records, social media, job postings, and certificate logs; it is hard for the target to detect. ACTIVE reconnaissance interacts directly with the target, for example port scanning and probing services, which can be detected and logged. Next, SCANNING AND ENUMERATION identifies live hosts, open ports, services, and vulnerabilities. In EXPLOITATION, the tester attempts to use a weakness to gain access. POST-EXPLOITATION shows what an attacker could do next: escalate privileges, establish persistence, move laterally (pivoting) to other systems, and reach sensitive data, which proves the real business impact of the flaw. The tester then cleans up any tools or accounts created, and writes the REPORT, which includes an executive summary, the findings with evidence, risk ratings, and prioritized remediation recommendations; a retest verifies fixes. Tests also differ by how much the tester knows in advance: a KNOWN environment (white box) gives full information such as source code and diagrams, a PARTIALLY KNOWN environment (gray box) gives limited information such as a normal user account, and an UNKNOWN environment (black box) gives none. Engagements are described by type: PHYSICAL testing tries to bypass locks, badges, and guards; OFFENSIVE testing (the red team) emulates attackers; DEFENSIVE (the blue team) is the group that detects and responds; and INTEGRATED or purple team work has attackers and defenders collaborate. A WHITE team acts as referee and coordinator. Penetration tests complement, but are different from, vulnerability scans: a scan finds known weaknesses broadly, while a test exploits and chains them to prove impact.",
        deepDive: [
          { h: "Stages in order", list: [
            "Pre-engagement: scope, rules of engagement, authorization, legal and communication arrangements.",
            "Reconnaissance: passive then active information gathering.",
            "Scanning and enumeration: map hosts, ports, services, and vulnerabilities.",
            "Exploitation: gain initial access using discovered weaknesses.",
            "Post-exploitation: privilege escalation, persistence, lateral movement, data access.",
            "Cleanup: remove tools, accounts, and artifacts.",
            "Reporting and debrief: findings, risk, remediation; retest after fixes."
          ] },
          { h: "Passive versus active reconnaissance", list: [
            "Passive: WHOIS, DNS records, search engines, social media, job ads, leaked data, certificate transparency logs, OSINT tools. No packets sent to the target.",
            "Active: ping sweeps, port scans, banner grabbing, vulnerability scans. Target systems can log and detect it."
          ] },
          { h: "Rules of engagement checklist", list: [
            "Scope: which networks, systems, applications, and locations are allowed, and which are excluded.",
            "Allowed techniques: for example whether social engineering, denial of service, or physical entry are permitted.",
            "Schedule: dates, hours, and blackout periods.",
            "Contacts and escalation: who to call if something breaks or a critical flaw is found.",
            "Data handling: how sensitive information found during testing is protected.",
            "Written authorization signed by someone with authority to approve."
          ] },
          { h: "Team colors", list: [
            "Red team: offensive; emulates attackers.",
            "Blue team: defensive; detects and responds.",
            "Purple team: red and blue work together to improve detection and defenses.",
            "White team: referees and coordinates the exercise and enforces rules.",
            "Yellow team (building and developing) and green team terms are sometimes used but the four above are the core."
          ] },
          { h: "Test knowledge levels", list: [
            "Known environment (white box): full knowledge; thorough and efficient.",
            "Partially known (gray box): limited knowledge such as a user account; models an insider or an attacker who already has a foothold.",
            "Unknown environment (black box): no prior knowledge; models an outside attacker and tests detection as well."
          ] }
        ],
        keyTerms: [
          { term: "Rules of Engagement", def: "The written scope, allowed techniques, timing, and contacts governing a penetration test." },
          { term: "Passive Reconnaissance", def: "Gathering information without directly interacting with the target." },
          { term: "Active Reconnaissance", def: "Directly probing the target, such as port scanning." },
          { term: "Pivoting", def: "Using a compromised system as a stepping stone to reach other systems." },
          { term: "Persistence", def: "Maintaining access to a compromised system across reboots or logoffs." },
          { term: "Red Team", def: "Offensive team that emulates adversaries." },
          { term: "Blue Team", def: "Defensive team that detects and responds to attacks." },
          { term: "Purple Team", def: "Collaboration between red and blue teams to improve defenses." },
          { term: "White Team", def: "Referees and coordinates a security exercise." },
          { term: "Known / Partially Known / Unknown Environment", def: "White-box, gray-box, and black-box testing based on prior knowledge given to the tester." }
        ],
        analogy:
          "A penetration test is a locksmith hired by a bank to try to break in, with a signed letter allowing it. First the locksmith studies the building from the street, reads public records, and checks job ads (passive recon). Then he walks up and tests the doors (active recon). He picks a lock (exploitation), sees how far he can get inside and what he could take (post-exploitation), tidies up, and hands the bank a report with photos and a to-do list. The security guards are the blue team; the referee watching for rule-breaking is the white team.",
        technical:
          "A company hires a firm for a gray-box test of its customer portal. The rules of engagement authorize testing of two named domains between 10 p.m. and 5 a.m., prohibit denial of service and social engineering, and list a 24-hour emergency contact. The tester starts with public sources and certificate logs (passive), runs port and web scans (active), exploits a vulnerable file-upload function to get a foothold, escalates to administrator, and reaches a test copy of the customer database to prove impact. After cleanup, the report ranks findings by risk with remediation steps, and the firm retests after the fixes.",
        table: {
          headers: ["Stage", "Goal", "Example activity"],
          rows: [
            ["Pre-engagement", "Authorization and boundaries", "Signed scope and rules of engagement"],
            ["Reconnaissance", "Learn about the target", "WHOIS, DNS, search engines (passive); port scans (active)"],
            ["Scanning / enumeration", "Find hosts, services, weaknesses", "Vulnerability scan, service enumeration"],
            ["Exploitation", "Gain access", "Exploit a web flaw or weak credential"],
            ["Post-exploitation", "Show impact", "Privilege escalation, pivoting, data access"],
            ["Cleanup", "Leave no trace of the test", "Remove tools and test accounts"],
            ["Reporting", "Drive remediation", "Findings, risk ratings, recommendations, retest"]
          ]
        },
        confusion: [
          { a: "Passive reconnaissance", b: "Active reconnaissance", diff: "Passive gathers public information without touching the target. Active interacts with the target directly and can be detected." },
          { a: "Vulnerability scan", b: "Penetration test", diff: "A scan identifies known weaknesses, usually without exploiting them. A penetration test exploits and chains weaknesses to prove real impact." },
          { a: "Red team", b: "Blue team", diff: "Red attacks (offense). Blue defends (detection and response). Purple combines them." },
          { a: "Rules of engagement", b: "Report", diff: "Rules of engagement are agreed BEFORE testing and define what is allowed. The report is delivered AFTER testing with findings." },
          { a: "Gray box", b: "Black box", diff: "Gray box gives limited knowledge (such as a user account). Black box gives none." }
        ],
        soc: "For defenders, a penetration test is also a test of the SOC: did the blue team notice the scanning, the exploitation, and the lateral movement? Detection gaps found during a test are as valuable as the vulnerabilities, and results should lead to new detections and playbook updates. Testers must coordinate with the SOC or the white team to avoid triggering a real incident response.",
        patterns: [
          ["Written scope, allowed techniques, and emergency contacts", "Rules of engagement"],
          ["Looking up WHOIS and social media; no packets sent to the target", "Passive reconnaissance"],
          ["Port scanning the target", "Active reconnaissance"],
          ["Using one compromised host to reach other internal systems", "Pivoting / lateral movement"],
          ["Tester has no information about the environment", "Unknown environment (black box)"],
          ["Tester has a normal user account and limited documentation", "Partially known environment (gray box)"],
          ["Attackers and defenders work together to improve detection", "Purple team"],
          ["Group that referees and enforces the exercise rules", "White team"]
        ],
        takeaways: [
          "Written authorization and rules of engagement come before any testing.",
          "Passive reconnaissance does not touch the target; active reconnaissance does.",
          "A penetration test proves impact by exploiting and chaining weaknesses; a scan only finds them."
        ],
        remember: [
          "Order: pre-engagement (authorization, scope, ROE) > reconnaissance > scanning > exploitation > post-exploitation > cleanup > report.",
          "Passive recon = no contact with the target (OSINT, WHOIS). Active recon = direct probing (port scans).",
          "Rules of engagement define scope, techniques, timing, and contacts.",
          "Known = white box, partially known = gray box, unknown = black box.",
          "Red = offense, blue = defense, purple = collaboration, white = referee.",
          "Post-exploitation: privilege escalation, persistence, lateral movement (pivoting).",
          "Pen test exploits to prove impact; vulnerability scan finds known weaknesses."
        ],
        taglish:
          "Bago mag-test, kailangan ng nakasulat na pahintulot at rules of engagement (saklaw, pinapayagang paraan, oras, at contact). Ang unang hakbang ay reconnaissance: passive (public info lang, walang direktang hawak sa target, tulad ng WHOIS at social media) o active (direktang sinusubukan, tulad ng port scan). Susunod ang scanning, exploitation, post-exploitation (escalation, persistence, pivoting), cleanup, at ulat. Ang red team ang umaatake, blue team ang nagtatanggol, purple team ang nagtutulungan, at white team ang referee. Tandaan: ang pen test, ine-exploit para mapatunayan ang epekto, samantalang ang vulnerability scan ay naghahanap lang ng kilalang butas."
      },
      {
        id: "d5-t161",
        title: "Exam Strategy: Performance-Based Questions, Question Wording, and Pacing",
        tag: "Exam",
        minutes: 18,
        goal: "Approach the SY0-701 exam with a repeatable method for performance-based questions, tricky wording, and time management.",
        why: "Many candidates who know the material lose points to pacing, misread questions, and performance-based questions (PBQs) they have never practiced. A method turns knowledge into a passing score.",
        simple:
          "The exam is a 90-minute test of up to 90 questions, scored from 100 to 900 with 750 needed to pass; the score is scaled, not a simple percentage. It mixes standard multiple-choice questions with PERFORMANCE-BASED QUESTIONS (PBQs): short interactive tasks in which you do something instead of choosing an answer, such as ordering firewall rules, matching attacks to defenses by dragging items, reading a log excerpt and answering questions about it, running a command in a simulated terminal, or configuring settings for a wireless network or a device. PBQs usually appear near the start. Because they take longer, a common strategy is to look at them, flag them, and return after the multiple-choice questions so that time is spent where it earns points most reliably; make sure you do come back, and answer every one, because there is no penalty for guessing. For multiple-choice questions, read the LAST sentence first to see what is being asked, then read the scenario for clues. Notice the qualifiers: BEST, MOST likely, FIRST, NEXT, and LEAST all change the answer. Several options may be technically true, but only one is the best fit for the stated requirement. Eliminate answers that are clearly wrong, then compare the remaining ones against the scenario's key constraint (cost, speed, scope, who is affected). Watch for the exam's favorite traps: confusing near-identical terms (for example RTO and RPO, or authentication and authorization), choosing an answer that sounds more technical rather than one that meets the requirement, and picking a reactive control when the question asks for preventive. For ordering questions, remember typical sequences: the incident response steps in order, and firewall rules evaluated top to bottom with the first match winning, so specific rules come before general ones and a default deny belongs at the end. Pace yourself: with roughly one minute per question on average, set checkpoints (for example, be near the halfway question by about the 40-minute mark), flag hard questions and move on, and use leftover time to review flagged items. Preparation matters as much as test-day technique: work through lessons, take domain quizzes, review every missed question and its explanation, memorize the acronyms and common ports, and take full timed mock exams until you consistently score well above the passing mark.",
        deepDive: [
          { h: "The PBQ method", list: [
            "Read the whole task before touching anything; note exactly what the scenario asks you to produce.",
            "Do the parts you are sure about first; partial work is better than nothing.",
            "For drag-and-drop matching, place the certain items first, and the remainder usually falls into place by elimination.",
            "For firewall or ACL tasks, think top-down, first match wins, specific before general, and end with deny-all unless the question says otherwise.",
            "For log analysis, identify the field the question asks about (source, destination, action, time) and filter your attention to it.",
            "For command-line tasks, recall what each tool is for: ping (reachability), tracert (path), nslookup (DNS), netstat (connections), ipconfig (addressing)."
          ] },
          { h: "Decoding question wording", list: [
            "BEST / MOST: several answers are partly right; choose the one that fits every stated requirement.",
            "FIRST: choose the earliest step in the process (in incident response, think containment before eradication; in forensics, volatility and preservation).",
            "NEXT: choose the step after the one just completed.",
            "LEAST: reverse your normal thinking and find the weakest or least relevant option.",
            "'Which TWO' / 'select all': read how many are required; each choice must be individually correct.",
            "Unfamiliar term in a choice: eliminate what you can and choose between the rest."
          ] },
          { h: "Common traps", list: [
            "Near-twins: RTO vs RPO, authentication vs authorization, encoding vs encryption, vulnerability scan vs penetration test, virus vs worm.",
            "Preventive vs detective vs corrective controls: match the function the question asks for.",
            "A flashy technical answer when the question wants a policy or process control (or the reverse).",
            "Answers that are true statements but do not answer THIS question."
          ] },
          { h: "Pacing plan", list: [
            "Average about one minute per question; PBQs take several minutes each.",
            "Flag and move on rather than burning time; never leave a question blank.",
            "Reserve the final 10 to 15 minutes to revisit PBQs and flagged questions.",
            "Do not change an answer without a concrete reason; first instincts are right more often than second-guessing."
          ] },
          { h: "Study plan that works", list: [
            "Learn concepts with the lessons and explanations, not only flash cards.",
            "Take domain quizzes, then read the explanation for EVERY miss and the wrong choices.",
            "Use the Compare and Contrast cards and acronym list for confusable terms.",
            "Memorize the common ports and the incident response and OSI orders.",
            "Take timed full-length mock exams; aim for steady scores well above the passing level before booking."
          ] }
        ],
        keyTerms: [
          { term: "PBQ", def: "Performance-Based Question: an interactive task such as ordering rules, matching items, or analyzing a log." },
          { term: "Scaled Score", def: "An exam score converted onto a fixed scale (100 to 900 for SY0-701), not a raw percentage." },
          { term: "Qualifier Word", def: "A word such as BEST, FIRST, or LEAST that changes what the question is asking." },
          { term: "Distractor", def: "An incorrect answer choice designed to look plausible." },
          { term: "Process of Elimination", def: "Removing clearly wrong choices to improve the odds on the rest." },
          { term: "Flagging", def: "Marking a question to revisit before the exam ends." },
          { term: "First Match Wins", def: "Firewall and ACL rule evaluation stops at the first matching rule." },
          { term: "Implicit Deny", def: "Traffic not explicitly allowed is denied by default." }
        ],
        analogy:
          "Taking the exam is like a timed driving test with a few special maneuvers. The multiple-choice questions are the regular road; the PBQs are the parallel-parking sections that take longer. A good driver glances at the maneuver, decides to do it once the rest of the route is under control, and keeps an eye on the clock. Reading the last sentence first is like checking the road sign before reading the paragraph of directions.",
        technical:
          "A candidate opens a PBQ asking them to arrange four firewall rules for a web server. They note the requirement (allow HTTPS from anywhere, allow SSH only from the admin subnet, deny everything else), flag the question, and finish the multiple-choice section first. On returning, they order the rules specific first: allow admin subnet to SSH, allow any to HTTPS, then deny all, remembering that a broad rule placed first would shadow the more specific ones. With the remaining minutes they review flagged questions without changing answers they were already sure of.",
        table: {
          headers: ["Word in the question", "What it means for your answer"],
          rows: [
            ["BEST / MOST likely", "Choose the option that fits ALL stated requirements, even if others are partly true"],
            ["FIRST", "Earliest step; think preparation, containment, preservation"],
            ["NEXT", "The step after the one already completed"],
            ["LEAST", "Find the weakest or least applicable option"],
            ["EXCEPT / NOT", "Three are true; find the false one"],
            ["Select TWO / ALL", "Count how many are needed; each choice must stand on its own"]
          ]
        },
        confusion: [
          { a: "PBQ", b: "Multiple-choice question", diff: "A PBQ is an interactive task (ordering, matching, log analysis, simulation). A multiple-choice question asks you to select from listed options." },
          { a: "Scaled score", b: "Percentage", diff: "A score of 750 on a 100 to 900 scale is not 75 percent. The scale is converted from your results, so do not try to calculate a percentage." },
          { a: "BEST answer", b: "Correct-sounding answer", diff: "Several options can be true. The best answer meets the stated requirement and constraint most completely." },
          { a: "Flagging", b: "Skipping", diff: "Flagging marks a question for return; skipping without returning leaves it unanswered. Always return, and never leave an answer blank." }
        ],
        soc: "These habits carry into real work: reading the actual question being asked, noting constraints, ordering steps correctly under pressure, and checking assumptions are the same skills an analyst uses when triaging an alert and choosing the best next action.",
        patterns: [
          ["Interactive task: arrange firewall rules, match items, read a log", "Performance-based question"],
          ["Several answers sound right; one must be the BEST", "Check each against the stated requirement and constraint"],
          ["The word FIRST in an incident response question", "Choose the earliest appropriate step, such as containment"],
          ["Firewall rules in a PBQ", "Specific rules first; first match wins; deny-all last"],
          ["Question takes too long", "Flag it, move on, and return with remaining time"],
          ["Unsure between two options", "Eliminate distractors, then pick the one that best matches the scenario"],
          ["Passing score on the exam", "750 on a 100 to 900 scale"],
          ["Leaving a question blank", "Never: there is no penalty for guessing"]
        ],
        takeaways: [
          "Treat PBQs with a method: read, do what you are sure of, flag if needed, and come back.",
          "Qualifier words (BEST, FIRST, LEAST, NEXT) change the answer; read the last sentence first.",
          "Pacing and review time protect the points your knowledge has earned."
        ],
        remember: [
          "90 minutes, up to 90 questions, scaled score 100 to 900, 750 to pass (not a percentage).",
          "PBQs are interactive tasks (ordering, matching, log analysis, simulation). Flag and return if needed, and always answer.",
          "Read the LAST sentence of a question first, then the scenario.",
          "BEST / MOST / FIRST / NEXT / LEAST change the answer. Eliminate wrong choices before deciding.",
          "Firewall rules: top to bottom, first match wins, specific before general, deny-all last.",
          "Watch near-twin terms: RTO/RPO, authentication/authorization, scan/pen test, virus/worm.",
          "Reserve time at the end; do not change answers without a concrete reason."
        ],
        taglish:
          "May 90 minuto at hanggang 90 tanong ang exam, at kailangan ng 750 sa scale na 100 hanggang 900 (hindi ito porsyento). May mga PBQ na parang maliliit na gawain (pag-aayos ng firewall rules, pagtutugma ng items, pagbasa ng log). Kung matagal, i-flag at balikan, pero siguraduhing masasagutan ang lahat. Sa multiple-choice, basahin muna ang huling pangungusap para malaman kung ano ang hinihingi, at bantayan ang mga salitang BEST, FIRST, NEXT, at LEAST. Sa firewall rules: mula itaas pababa, ang unang tumugma ang susundin, kaya mas tiyak na rule muna at deny-all sa dulo."
      }
    ]
  },

  tips: {
    "d4-t160": "Format versus delivery: STIX is the language, TAXII is the transport. 'Industry-specific sharing community' always points to an ISAC. When the question asks what lasts longest or is hardest for an attacker to change, answer TTPs, not hashes or IP addresses.",
    "d4-t161": "Secure Boot blocks, Measured Boot records. If the scenario says a remote system must verify the device booted cleanly, choose measured boot with TPM attestation. For 'push settings to all domain computers', choose Group Policy; for Linux process confinement, choose SELinux.",
    "d4-t162": "Match the exercise to what it touches: discussion only = tabletop, hands-on in a test environment = simulation, real systems = live exercise. Lessons learned always ends with assigned corrective actions, and root cause analysis asks 'why' until you reach something you can fix.",
    "d5-t160": "Authorization first, always: if a question asks what must happen before a penetration test starts, the answer is written authorization and rules of engagement. Passive means no packets to the target; port scanning is active. Gray box means the tester has partial information such as an account.",
    "d5-t161": "On the exam itself: read the last sentence first, underline BEST, FIRST, or LEAST mentally, and eliminate before choosing. For firewall-rule PBQs, remember top-down first-match and put specific rules before general ones with deny-all at the end."
  },

  summaries: {
    "d4-t160": "Threat intelligence from OSINT, vendors, governments, and ISACs is shared with STIX (the format) and TAXII (the transport), and is only valuable when it is timely, relevant, and accurate.",
    "d4-t161": "Hardening starts with secure and measured boot, applies an approved baseline with least functionality, and uses Group Policy on Windows and SELinux on Linux to enforce and maintain it.",
    "d4-t162": "Incident response is practiced through tabletop, walkthrough, simulation, and live exercises, then improved through blameless lessons-learned reviews, root cause analysis, and metrics like MTTD, MTTR, and dwell time.",
    "d5-t160": "A penetration test starts with written authorization and rules of engagement, moves from passive and active reconnaissance through exploitation and post-exploitation, and ends with a report, with red, blue, purple, and white teams playing distinct roles.",
    "d5-t161": "Passing the exam takes method as well as knowledge: a plan for performance-based questions, close reading of qualifier words, firewall-rule ordering logic, and steady pacing with time left to review."
  },

  questions: [
    {
      id: "q-x-d4-15", domainId: "d4", tag: "d4-t160", type: "single",
      prompt: "A security vendor wants to publish threat information in a standardized, machine-readable format that other organizations' tools can understand. Which standard describes the format?",
      choices: [
        { id: "a", text: "STIX" },
        { id: "b", text: "TAXII" },
        { id: "c", text: "SNMP" },
        { id: "d", text: "SAML" }
      ],
      correct: "a",
      explanation: "STIX (Structured Threat Information eXpression) is the standardized language for describing cyber threat information.",
      distractorExplanations: {
        b: "TAXII is the protocol that transports STIX content between systems, not the format itself.",
        c: "SNMP monitors and manages network devices.",
        d: "SAML exchanges authentication assertions for single sign-on."
      }
    },
    {
      id: "q-x-d4-16", domainId: "d4", tag: "d4-t160", type: "single",
      prompt: "A group of hospitals shares details about attacks targeting the healthcare sector through a trusted community. What is this type of organization called?",
      choices: [
        { id: "a", text: "An ISAC" },
        { id: "b", text: "A SOC" },
        { id: "c", text: "A CASB" },
        { id: "d", text: "A honeynet" }
      ],
      correct: "a",
      explanation: "An Information Sharing and Analysis Center is an industry-specific community that shares threat intelligence among its members.",
      distractorExplanations: {
        b: "A SOC is an internal team that monitors and responds to security events.",
        c: "A CASB enforces security policy between users and cloud services.",
        d: "A honeynet is a decoy network used to attract and study attackers."
      }
    },
    {
      id: "q-x-d4-17", domainId: "d4", tag: "d4-t161", type: "single",
      prompt: "A company wants to guarantee that only digitally signed bootloaders and drivers can run when its laptops start, blocking bootkits. Which feature should be enabled?",
      choices: [
        { id: "a", text: "UEFI Secure Boot" },
        { id: "b", text: "A host-based firewall" },
        { id: "c", text: "Full-disk encryption alone" },
        { id: "d", text: "Disabling automatic updates" }
      ],
      correct: "a",
      explanation: "Secure Boot verifies the digital signatures of boot components and refuses to run unsigned or tampered code.",
      distractorExplanations: {
        b: "A host firewall filters network traffic and does not validate boot components.",
        c: "Disk encryption protects data at rest but does not verify the integrity of the boot chain.",
        d: "Disabling updates leaves systems more vulnerable and does nothing to validate boot code."
      }
    },
    {
      id: "q-x-d4-18", domainId: "d4", tag: "d4-t161", type: "single",
      prompt: "An administrator needs to push password policy and USB storage restrictions to hundreds of domain-joined Windows computers from one place. Which tool should be used?",
      choices: [
        { id: "a", text: "Group Policy" },
        { id: "b", text: "SELinux" },
        { id: "c", text: "A load balancer" },
        { id: "d", text: "A DNS sinkhole" }
      ],
      correct: "a",
      explanation: "Group Policy centrally manages configuration and security settings for domain-joined Windows computers and users.",
      distractorExplanations: {
        b: "SELinux is a Linux mandatory access control framework.",
        c: "A load balancer distributes traffic and does not apply endpoint configuration.",
        d: "A DNS sinkhole redirects malicious domain lookups and does not configure computers."
      }
    },
    {
      id: "q-x-d4-19", domainId: "d4", tag: "d4-t162", type: "single",
      prompt: "Executives and managers meet to talk through how they would respond to a ransomware scenario, without using any real systems. Which type of exercise is this?",
      choices: [
        { id: "a", text: "Tabletop exercise" },
        { id: "b", text: "Full interruption test" },
        { id: "c", text: "Penetration test" },
        { id: "d", text: "Parallel processing test" }
      ],
      correct: "a",
      explanation: "A tabletop exercise is a discussion-based walk through a scenario that tests decisions, roles, and communication without touching systems.",
      distractorExplanations: {
        b: "A full interruption test actually moves production to another site.",
        c: "A penetration test is an authorized simulated attack on systems.",
        d: "A parallel processing test runs recovery systems alongside production."
      }
    },
    {
      id: "q-x-d4-20", domainId: "d4", tag: "d4-t162", type: "single",
      prompt: "After an incident, the team asks 'why' repeatedly, moving from 'the server was encrypted' to 'no one owned the filter update process'. Which technique are they using?",
      choices: [
        { id: "a", text: "Root cause analysis (5 Whys)" },
        { id: "b", text: "Vulnerability scanning" },
        { id: "c", text: "Penetration testing" },
        { id: "d", text: "Log aggregation" }
      ],
      correct: "a",
      explanation: "The 5 Whys technique repeatedly asks why to move from the visible symptom to an underlying cause that can be fixed.",
      distractorExplanations: {
        b: "Vulnerability scanning finds known weaknesses and is not a method for analyzing an incident's cause.",
        c: "Penetration testing simulates attacks rather than analyzing why an incident occurred.",
        d: "Log aggregation collects logs in one place but does not by itself identify a root cause."
      }
    },
    {
      id: "q-x-d5-9", domainId: "d5", tag: "d5-t160", type: "single",
      prompt: "A tester gathers information about a target from WHOIS records, social media, and job postings without sending any traffic to the target's systems. What type of reconnaissance is this?",
      choices: [
        { id: "a", text: "Passive reconnaissance" },
        { id: "b", text: "Active reconnaissance" },
        { id: "c", text: "Pivoting" },
        { id: "d", text: "Privilege escalation" }
      ],
      correct: "a",
      explanation: "Passive reconnaissance collects information from public sources without directly interacting with the target.",
      distractorExplanations: {
        b: "Active reconnaissance directly probes the target, such as with port scans.",
        c: "Pivoting means using a compromised system to reach others, which occurs after access is gained.",
        d: "Privilege escalation is raising access levels on a compromised system."
      }
    },
    {
      id: "q-x-d5-10", domainId: "d5", tag: "d5-t160", type: "single",
      prompt: "Before a penetration test begins, which document defines the scope, permitted techniques, testing hours, and emergency contacts?",
      choices: [
        { id: "a", text: "Rules of engagement" },
        { id: "b", text: "The final test report" },
        { id: "c", text: "A service level agreement" },
        { id: "d", text: "A business impact analysis" }
      ],
      correct: "a",
      explanation: "The rules of engagement, agreed in writing before testing, define what is in scope, how testing may be performed, timing, and contacts.",
      distractorExplanations: {
        b: "The final report is delivered after testing with findings and recommendations.",
        c: "An SLA defines service performance commitments, not the terms of a penetration test.",
        d: "A BIA assesses the impact of disruptions to business functions."
      }
    },
    {
      id: "q-x-d5-11", domainId: "d5", tag: "d5-t161", type: "single",
      prompt: "On a performance-based question, a candidate must arrange firewall rules to allow HTTPS from anywhere, allow SSH only from the admin subnet, and deny all other traffic. Which ordering is correct?",
      choices: [
        { id: "a", text: "Allow SSH from the admin subnet, allow HTTPS from any, then deny all" },
        { id: "b", text: "Deny all, then allow SSH from the admin subnet, then allow HTTPS from any" },
        { id: "c", text: "Allow all, then deny SSH from non-admin addresses" },
        { id: "d", text: "Allow HTTPS from any, deny all, then allow SSH from the admin subnet" }
      ],
      correct: "a",
      explanation: "Firewall rules are evaluated top to bottom and the first match wins, so specific allow rules come first and the default deny goes last.",
      distractorExplanations: {
        b: "A deny-all rule at the top matches everything first, so the later allow rules would never apply.",
        c: "Allowing all traffic first defeats the requirement to deny everything not explicitly permitted.",
        d: "The deny-all rule placed before the SSH allow would block the admin subnet's SSH access."
      }
    },
    {
      id: "q-x-d5-12", domainId: "d5", tag: "d5-t161", type: "single",
      prompt: "A candidate is stuck on a time-consuming performance-based question early in the exam. What is the BEST strategy?",
      choices: [
        { id: "a", text: "Flag it, continue with other questions, and return to it later with remaining time" },
        { id: "b", text: "Spend as long as needed until it is solved" },
        { id: "c", text: "Leave it blank because there is no way to earn partial credit" },
        { id: "d", text: "End the exam early" }
      ],
      correct: "a",
      explanation: "Flagging and returning protects time for questions that earn points more reliably, and every question should still be answered before the exam ends.",
      distractorExplanations: {
        b: "Spending unlimited time on one question risks running out of time for others.",
        c: "Leaving a question blank gives up any chance of earning points; there is no penalty for answering.",
        d: "Ending early forfeits remaining questions and the chance to review."
      }
    }
  ],

  glossary: [
    { term: "STIX", domain: "d4", plain: "A standard language for describing cyber threats.", technical: "Structured Threat Information eXpression: a standardized, machine-readable format for sharing threat intelligence.", example: "A file describing a malware campaign and its indicators." },
    { term: "TAXII", domain: "d4", plain: "The delivery system for sharing threat intelligence.", technical: "Trusted Automated eXchange of Indicator Information: a protocol for exchanging STIX content over HTTPS.", example: "A tool subscribing to a partner's threat feed." },
    { term: "ISAC", domain: "d4", plain: "An industry group that shares threat information.", technical: "Information Sharing and Analysis Center: a sector-specific community for sharing threat intelligence.", example: "A financial-services ISAC alert." },
    { term: "Secure Boot", domain: "d4", plain: "Only trusted, signed startup code is allowed to run.", technical: "A UEFI feature that verifies the digital signatures of boot components before executing them.", example: "A rootkit's unsigned bootloader is refused." },
    { term: "Group Policy", domain: "d4", plain: "Central control of settings on Windows computers.", technical: "A Windows domain feature for centrally configuring security and system settings for users and computers.", example: "Blocking USB drives across a department." },
    { term: "SELinux", domain: "d4", plain: "A Linux feature that strictly limits what each program can do.", technical: "Security-Enhanced Linux: a mandatory access control framework confining processes using labels and policy.", example: "A compromised web server cannot read other services' files." },
    { term: "Root Cause Analysis", domain: "d4", plain: "Finding the real reason something went wrong.", technical: "A structured method for identifying the underlying cause of an incident rather than its symptoms.", example: "Using 5 Whys after a breach." },
    { term: "Dwell Time", domain: "d4", plain: "How long an attacker stayed hidden.", technical: "The period between an initial compromise and its detection.", example: "An attacker present for 9 days before discovery." },
    { term: "Rules of Engagement", domain: "d5", plain: "The ground rules for a penetration test.", technical: "A written agreement defining the scope, permitted methods, timing, and contacts for a penetration test.", example: "No denial-of-service testing, only between 10 p.m. and 5 a.m." },
    { term: "Passive Reconnaissance", domain: "d5", plain: "Learning about a target without touching its systems.", technical: "Gathering information from public sources without directly interacting with the target.", example: "Reading WHOIS records and job postings." },
    { term: "Pivoting", domain: "d5", plain: "Using one hacked machine to reach others.", technical: "Using a compromised system as a stepping stone to attack other systems in the network.", example: "Moving from a web server to the internal database." },
    { term: "Purple Team", domain: "d5", plain: "Attackers and defenders working together.", technical: "A collaborative approach in which red and blue teams share findings to improve detection and defenses.", example: "Replaying an attack technique while tuning alerts." },
    { term: "Performance-Based Question", domain: "d5", plain: "An exam question where you do a task instead of picking an answer.", technical: "An interactive exam item such as ordering rules, matching items, or analyzing a log.", example: "Arranging firewall rules in the correct order." }
  ],

  acronyms: [
    { acro: "STIX", expansion: "Structured Threat Information eXpression", meaning: "A standard language for describing cyber threat information." },
    { acro: "TAXII", expansion: "Trusted Automated eXchange of Indicator Information", meaning: "A protocol for exchanging threat information, typically STIX content." },
    { acro: "ISAC", expansion: "Information Sharing and Analysis Center", meaning: "An industry-specific community for sharing threat intelligence." },
    { acro: "AIS", expansion: "Automated Indicator Sharing", meaning: "CISA's program for sharing threat indicators using STIX and TAXII." },
    { acro: "UEFI", expansion: "Unified Extensible Firmware Interface", meaning: "Modern firmware interface that replaced BIOS and supports secure boot." },
    { acro: "GPO", expansion: "Group Policy Object", meaning: "A collection of settings applied through Group Policy in a Windows domain." },
    { acro: "SELinux", expansion: "Security-Enhanced Linux", meaning: "A Linux mandatory access control framework." },
    { acro: "STIG", expansion: "Security Technical Implementation Guide", meaning: "DISA secure configuration guidance for systems and applications." },
    { acro: "MTTD", expansion: "Mean Time To Detect", meaning: "Average time from compromise to detection of an incident." },
    { acro: "RCA", expansion: "Root Cause Analysis", meaning: "Determining the underlying cause of an incident." },
    { acro: "ROE", expansion: "Rules of Engagement", meaning: "The written scope and constraints governing a penetration test." },
    { acro: "PBQ", expansion: "Performance-Based Question", meaning: "An interactive exam task where you perform an action instead of selecting an answer." }
  ]
});
