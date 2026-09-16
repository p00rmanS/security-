/* Pro Tips — exam-taking tricks, common traps, and memorization aids.
   Keyed by lesson id so they can be attached to any fundamentals topic or
   domain lesson without touching those larger data files. Looked up in
   app.js via PRO_TIPS[lesson.id] and rendered as a callout on the lesson. */

const PRO_TIPS = {
  // ---------- Fundamentals ----------
  "f-boot-process": "Exam trick: if a question mentions \"only signed code can run at startup,\" the answer is almost always Secure Boot — not antivirus, not a firewall.",
  "f-os-fundamentals": "If a scenario says a user \"has more access than their job requires,\" the tested concept is almost always a least-privilege violation, even if the question never uses that exact phrase.",
  "f-command-line": "Memorize this pairing: ping = reachability, tracert/traceroute = path, netstat = local connections/ports, nslookup = DNS lookup. The exam often shows sample output and asks which command produced it.",
  "f-file-permissions": "NTFS = permissions + encryption. FAT32 = neither. If a question says a drive \"has no way to restrict who can read a file,\" think FAT32.",
  "f-patching": "\"The vulnerability became public knowledge once the patch was released\" is the standard reasoning behind patch urgency — memorize that logic chain, it shows up in multiple question forms.",
  "f-virtualization": "VM escape breaks the boundary between the VM and the HOST (or other VMs) — don't confuse it with a plain guest-OS compromise, which stays contained inside that one VM.",
  "f-osi-tcpip": "Quick layer recall: switches/MAC = Layer 2, routers/IP = Layer 3, TCP/UDP ports = Layer 4, HTTP/DNS/app content = Layer 7. Most \"what layer\" questions only need these four.",
  "f-ip-subnetting": "You will NOT need to calculate subnets by hand on Security+ (that's Network+ territory) — you only need to recognize private ranges (10.x, 172.16-31.x, 192.168.x) and CIDR notation on sight.",
  "f-ports-protocols": "Build a personal flashcard set for ports 22, 25, 53, 80, 443, 3389, 445, and 389/636. These eight alone cover the majority of port-based exam questions.",
  "f-dns-dhcp": "DORA (Discover, Offer, Request, Acknowledge) is a classic memorization target — expect a question naming one DORA step and asking what happens next.",
  "f-routing-switching-vlans": "If two devices are \"on the same switch but can't talk to each other,\" the answer is almost always that they're on different VLANs with no routing between them.",
  "f-firewall-nat-vpn-wifi": "NAT and firewalls are NOT the same control, even though NAT incidentally hides internal addressing. NAT translates addresses; a firewall filters traffic. Don't merge them on a \"which control provides X\" question.",

  // ---------- Domain 1 ----------
  "d1-flagship": "When a question describes a control, first ask \"HOW is it implemented?\" (category), then \"WHAT does it do?\" (function). Wrong answers often nail one but not the other.",
  "d1-t2": "CIA has no \"A\" for Authentication — don't confuse the CIA triad with AAA. They're two different three-letter acronyms, sometimes tested in the same question.",
  "d1-t3": "If a scenario ends in an outage right after \"someone made a quick fix without approval,\" the tested concept is almost always uncontrolled change, not a technical vulnerability.",
  "d1-t3b": "If an outage happens on a DIFFERENT system right after an unrelated change, the exam wants you to think \"missed dependency,\" not \"coincidence\" or \"new vulnerability.\" Dependency mapping is the specific fix.",
  "d1-t4": "Golden rule for crypto questions: hashing = integrity (one-way), encryption = confidentiality (reversible), digital signature = authenticity + integrity (both). Pick based on WHICH property the question protects.",
  "d1-t5": "If the scenario is about a physical door, badge, fence, or guard, the category is physical — full stop, regardless of how \"high-tech\" the device sounds (a badge reader is still physical).",
  "d1-t4b": "Wildcard and SAN certificates exist to solve a COST/MANAGEMENT problem (fewer certificates to buy and renew), not a stronger-security problem — don't pick them as the \"most secure\" answer by default.",
  "d1-t4c": "If a question mentions \"forced to use an older, weaker version\" of a protocol, that's a downgrade attack — not on-path, not a collision. Read for the word \"older/weaker\" as the trigger.",

  // ---------- Domain 2 ----------
  "d2-flagship": "The exam almost always gives you enough detail to name the EXACT technique (vishing vs. smishing vs. whaling). Read for the channel (call/text/email) and the target (executive = whaling) before answering.",
  "d2-t1": "Resources + motivation + patience = the actor type. Nation-state (high patience, espionage), organized crime (fast, financial), hacktivist (public, ideological). Memorize the motivation, not just the label.",
  "d2-t2": "\"Attack surface\" = everything exposed. \"Attack vector\" = the ONE path actually used. If the question asks which specific path an attacker used, that's a vector question, not a surface question.",
  "d2-t3": "XSS attacks the VICTIM'S BROWSER. CSRF abuses the victim's already-logged-in SESSION. SSRF tricks the SERVER itself. Match the vulnerability to WHO or WHAT is being tricked.",
  "d2-t4": "Spraying = few passwords, many accounts (avoids lockout). Stuffing = real leaked credentials, tried elsewhere. Don't let the similar-sounding names fool you — they attack differently.",
  "d2-t5": "When a mitigation question follows an attack scenario, match the FIX to the exact STAGE of the attack. Segmentation stops spread, not entry; training stops entry, not spread.",
  "d2-t6": "If an exam question asks \"why did this work on the victim\" rather than \"what technique was this,\" it's asking about the psychological principle (authority, urgency, etc.), not the delivery channel.",
  "d2-t7": "No single IoC proves compromise on its own — if an answer choice claims one isolated signal (like one failed login) is definitive proof, that's almost always the wrong answer. The exam rewards CORRELATING multiple indicators.",
  "d2-t8": "Bluejacking = annoying message (like spam). Bluesnarfing = actual theft (like a burglary). If the scenario mentions DATA being taken, it's snarfing, not jacking — the '-snarf' root literally means to grab/steal.",
  "d2-t9": "If a new vulnerability is disclosed in a widely-used library and the question asks how an org would quickly know if they're affected, the answer is almost always \"check the SBOM\" — not \"run a full vulnerability scan\" (too slow) or \"audit every codebase\" (too manual).",
  "d2-t10": "If the scenario says an employee uses PERSONAL or UNAPPROVED cloud storage/apps for work with no malicious intent implied, that's shadow IT — not a malicious insider. Malicious requires intent; negligent is a mistake; compromised means someone ELSE is using their credentials.",

  // ---------- Domain 3 ----------
  "d3-flagship": "If a public web server can freely reach the internal database with no restriction, the tested concept is a segmentation failure — the fix is always \"restrict to the specific port/protocol needed,\" never something unrelated like adding RAM.",
  "d3-t1": "Shared responsibility flips depending on IaaS/PaaS/SaaS — memorize the pattern: the LOWER you go in the stack (IaaS), the MORE the customer manages.",
  "d3-t2b": "Reverse proxy protects servers from inbound traffic; forward proxy protects users' outbound traffic. If the device is shielding INTERNAL SERVERS from the Internet, that's reverse.",
  "d3-t2c": "If a protocol name has an \"S\" at the end or in it (HTTPS, FTPS, SNMPv3, LDAPS), that's usually the secure/encrypted version being tested against its insecure counterpart.",
  "d3-t3": "Masking shows PART of a value (last 4 digits) with the real value stored elsewhere. Tokenization REPLACES the whole value with something meaningless outside its own vault. Don't swap these on the exam.",
  "d3-t4": "RTO = time. RPO = data. If the question gives you a number of HOURS you can be down, that's RTO. If it ties a number to how much data you can afford to LOSE, that's RPO.",
  "d3-t5": "If a scenario says a device \"can't be taken offline for patching\" and involves anything physical (a pump, a pacemaker, a traffic light), the tested concept is availability/safety trumping routine patching in ICS/embedded systems.",
  "d3-t6": "If the scenario is about power, temperature, or fire in a server room, it's an environmental control question — not a network or data control question, even though the GOAL (availability) is the same one tested elsewhere.",
  "d3-t7": "If the question emphasizes ZERO downtime or full capacity used at all times, it's describing active/active. If it emphasizes cost savings with an idle backup, it's active/passive. Cost vs. speed is the tell.",
  "d3-t8": "Three-letter memory hook: PE decides, PA activates, PEP enforces. If a question asks which component actually SITS IN THE TRAFFIC PATH, that's always the PEP — the other two never touch the data directly.",
  "d3-t9": "If the scenario is about protecting a specific WEB APPLICATION from SQL injection or XSS, the answer is WAF, never plain NGFW or UTM — those two protect general network traffic, not application-layer web attacks specifically.",
  "d3-t10": "\"Fewer false positives, catches only known real data\" = fingerprinting/exact data matching. \"Flags anything shaped like a credit card number, real or not\" = pattern matching. The exam tests this exact tradeoff.",
  "d3-t11": "If the exam gives you a role that DECIDES policy, that's the Owner. A role that DOES the technical work is the Custodian/Steward. A role bound by CONTRACT to process data for someone else is the Processor. For destruction: \"drive reused\" = clear or purge; \"drive never touched again\" = destroy.",
  "d3-t12": "\"Who patches the OS\" is the fast differentiator: IaaS = you patch it, PaaS/SaaS = provider patches it. But \"who's responsible for the data and who can access it\" is ALWAYS the customer, no matter the model — the one constant across every shared-responsibility question.",

  // ---------- Domain 4 ----------
  "d4-flagship": "Memorize the 7 phases in order with a sentence: \"Please Detect Any Compromise, Eradicate, Recover, Learn\" (Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons Learned).",
  "d4-t1": "Ownership is the key differentiator: BYOD = employee owns it, COPE = company owns it, CYOD = company owns it but the employee picked the model. If the question emphasizes \"who owns the device,\" start there.",
  "d4-t1b": "WPA2 vs WPA3 questions usually hinge on one word: WPA3 requires a stronger handshake (SAE) that resists offline password-guessing attacks that work against WPA2 — pick WPA3 whenever the scenario mentions resisting offline attacks.",
  "d4-t10": "SAST reads code without running it (works even on incomplete code); DAST tests a running app from the outside. If the question says \"before deployment, reviewing the source,\" that's SAST — if it says \"testing the live application,\" that's DAST.",
  "d4-t8b": "The moment you see \"legal,\" \"litigation,\" or \"investigation\" paired with \"don't delete,\" that's a legal hold — and it overrides whatever the normal retention policy says, every time.",
  "d4-t11": "If the source is INDUSTRY PEERS sharing warnings, that's an ISAC. If it's PUBLIC, open information, that's OSINT. If it's HIDDEN underground forums, that's dark web monitoring. Match the source's visibility, not just the word \"intelligence.\"",
  "d4-t12": "The single word that separates threat hunting from incident response on the exam: PROACTIVE (hunting, no alert yet) vs. REACTIVE (response, alert already fired). If the scenario says \"no alert had triggered yet, but an analyst searched anyway,\" that's hunting.",
  "d4-t13": "If the question gives you a SEQUENCE of attack stages, that's the Cyber Kill Chain. If it gives you a specific named technique with a T-number or asks about a shared vocabulary, that's MITRE ATT&CK. If it connects who/what/where/whom, that's the Diamond Model.",
  "d4-t14": "If a scenario describes a phishing page that a victim fully fell for, but the login STILL failed, the answer is almost always passkeys/FIDO2 — the domain-binding is what saves the day, not user awareness.",
  "d4-t15": "If a question asks who decides whether external/regulatory notification is required, the answer is legal counsel — not the SOC, not IT leadership, and not the analyst who found the incident.",
  "d4-t16": "Fast filter: managing NETWORK DEVICES themselves (routers/switches) = TACACS+. Users connecting TO the network (VPN/Wi-Fi) = RADIUS. \"Can't access anything, password is definitely right\" + Windows domain = check the clock (Kerberos clock skew).",
  "d4-t2": "\"We found a device we didn't know we had\" is a textbook asset management failure clue — don't be tempted to answer \"vulnerability scanning\" when the real gap is inventory and ownership.",
  "d4-t3": "CVSS score alone is a distractor answer. The exam wants you to weigh score AGAINST business context (exposure + data sensitivity) — an isolated critical finding often loses to an exposed medium finding.",
  "d4-t4": "\"So many alerts that real ones get missed\" = alert fatigue, always. It's one of the most consistently tested exact-definition terms on the exam.",
  "d4-t5": "Response-level ladder to memorize: Monitor to Quarantine to Contain to Escalate. Quarantine PRESERVES evidence; it is not the same as deleting or wiping.",
  "d4-t6": "Least privilege limits what ONE ACCOUNT can do. Separation of duties limits what ONE PERSON can complete ALONE across a process. The exam loves testing whether you can tell these apart in a scenario.",
  "d4-t7": "\"Automation blast radius\" is the exact phrase for the risk of a bad automated action happening at scale before a human catches it — automation risk is about SCALE, not slowness.",
  "d4-t9": "DHCP logs answer \"which device had this IP.\" Authentication logs answer \"who logged in.\" You often need BOTH together to go from an IP address to a specific person — expect a two-step log question.",
  "d4-t17": "If the question shows an account that quietly gained access across several role changes with nothing ever removed, that's privilege creep — the fix is periodic access RECERTIFICATION, not a stronger password policy. \"Account still active after someone quit\" is always a deprovisioning failure.",

  // ---------- Domain 5 ----------
  "d5-flagship": "ALE = SLE x ARO. If a question gives you a cost per incident AND a frequency per year, it wants you to multiply them — then usually compare that number to the cost of a proposed control.",
  "d5-t1": "Mandatory vs. optional is the fastest filter: Policy, Standard, Procedure = mandatory. Guideline is the ONLY non-mandatory one of the four. When in doubt, guideline is your \"not required\" answer.",
  "d5-t3": "Supply-chain risk = weakness in a vendor's OWN vendors. Concentration risk = relying on too FEW vendors. Different root causes, often confused on the exam.",
  "d5-t4": "Purpose limitation vs. data minimization: minimization is about collecting LESS in the first place; purpose limitation is about not REUSING what was already collected for something else.",
  "d5-t5": "Gap assessment happens BEFORE a formal audit (self-check). External audit is the independent, credible one for outsiders. Purple teaming is the collaboration AFTER an exercise, not a third team running its own test.",
  "d5-t6": "If an answer choice measures training success by \"attendance,\" it's almost always the wrong answer. The exam consistently rewards OUTCOME-based measurement (click rates, reporting speed) as correct.",
  "d5-t7": "If a question is about keeping the WHOLE BUSINESS running (staff, communication, alternate facilities), it's BCP. If it's specifically about restoring SYSTEMS AND DATA, it's DRP. DRP is a piece of BCP, never the other way around.",
  "d5-t8": "The reversibility test decides it every time: can the original identity ever be recovered by ANYONE, even the organization itself? If no, it's anonymization. If yes (via a separately-held key/mapping), it's pseudonymization — and still counted as personal data.",
  "d5-t9": "Match the amount of GIVEN INFORMATION to the box color: zero info = black, full info = white, partial info = gray. Don't confuse this with red/blue/purple team, which is about WHO plays offense vs. defense, not how much they were told beforehand."
};
