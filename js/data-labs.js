/* Hands-on labs. All data below is fictional (fake IPs, fake domains,
   fake employee names). No lab ever asks the learner to attack, scan, or
   access a real system. Each lab: scenario, evidence to review, a short
   set of scenario tasks with immediate feedback, hints, and a reflection
   question saved locally. */

const LABS = [
  {
    id: "lab-auth-logs",
    title: "Triage a Suspicious Authentication Log",
    minutes: 20,
    domainId: "d4",
    objective: "Read a small authentication log and identify signs of a credential-based attack.",
    scenario: "You are the on-call SOC analyst. A ticket says several failed logins were noticed on the account jdelacruz. Review the log below (fictional company, fictional IPs) and decide what happened.",
    evidence: {
      type: "log",
      headers: ["Timestamp", "Username", "Source IP", "Result", "Country (GeoIP)"],
      rows: [
        ["09:14:02", "jdelacruz", "203.0.113.44", "SUCCESS", "Philippines"],
        ["14:02:11", "jdelacruz", "198.51.100.9", "FAILURE", "Unknown VPN exit node"],
        ["14:02:14", "jdelacruz", "198.51.100.9", "FAILURE", "Unknown VPN exit node"],
        ["14:02:19", "jdelacruz", "198.51.100.9", "FAILURE", "Unknown VPN exit node"],
        ["14:02:55", "jdelacruz", "198.51.100.9", "SUCCESS", "Unknown VPN exit node"],
        ["14:03:40", "jdelacruz", "198.51.100.9", "SUCCESS - Password Changed", "Unknown VPN exit node"]
      ]
    },
    hints: [
      "Compare the source IP and country of the 09:14 login against the later logins.",
      "Multiple rapid failures followed by a success is a classic pattern.",
      "What did the attacker do immediately after the successful login?"
    ],
    tasks: [
      { id: "t1", prompt: "What technique does the pattern at 14:02:11-14:02:19 most resemble?", choices: [ {id:"a", text:"Brute force against a single account"}, {id:"b", text:"Password spraying across many accounts"}, {id:"c", text:"A normal user mistyping their password a few times"}, {id:"d", text:"DNS poisoning"} ], correct: "a", explanation: "Multiple rapid failed attempts against the same account (jdelacruz) from one source is consistent with brute force, not spraying (which targets many accounts) or normal typos (which don't usually chain into an immediate success from an unfamiliar location)." },
      { id: "t2", prompt: "Why is the successful login at 14:02:55 suspicious, even though the password was eventually correct?", choices: [ {id:"a", text:"It came from an unfamiliar source (VPN exit node, different from the legitimate 09:14 login) immediately after several failures"}, {id:"b", text:"Successful logins are never suspicious"}, {id:"c", text:"The timestamp format is invalid"}, {id:"d", text:"jdelacruz is not a real username format"} ], correct: "a", explanation: "Context matters: the same account logging in from a very different, unfamiliar source right after multiple failures strongly suggests the password was eventually guessed or cracked, not typed correctly by the real user." },
      { id: "t3", prompt: "What is the most urgent containment action after seeing the 14:03:40 entry?", choices: [ {id:"a", text:"Immediately disable/lock the account and force a password reset through a verified channel"}, {id:"b", text:"Wait until tomorrow's shift to review it"}, {id:"c", text:"Delete the log entries to keep the log clean"}, {id:"d", text:"Email jdelacruz asking if they changed their own password, with no other action"} ], correct: "a", explanation: "Because the attacker changed the password, the legitimate user is now locked out and the attacker may still have control. Locking the account and forcing a verified reset is the correct immediate containment step. Deleting logs would destroy evidence and is never appropriate." }
    ],
    reflectionPrompt: "In your own words: what single log field made this incident easy to spot, and why should analysts always check that field, not just the username and result?"
  },
  {
    id: "lab-firewall-logs",
    title: "Read Firewall Allow/Deny Entries",
    minutes: 15,
    domainId: "d3",
    objective: "Interpret basic firewall log entries to understand what traffic was allowed or blocked, and why it might matter.",
    scenario: "A fictional small business's edge firewall log shows the following entries from the last few minutes. Review them to answer the questions.",
    evidence: {
      type: "log",
      headers: ["Time", "Source IP", "Destination IP:Port", "Action", "Rule"],
      rows: [
        ["10:01:03", "192.168.1.15", "93.184.216.34:443", "ALLOW", "Outbound-HTTPS"],
        ["10:01:04", "203.0.113.77", "192.168.1.50:3389", "DENY", "Default-Deny-Inbound"],
        ["10:01:09", "203.0.113.77", "192.168.1.50:3389", "DENY", "Default-Deny-Inbound"],
        ["10:01:11", "203.0.113.77", "192.168.1.50:22", "DENY", "Default-Deny-Inbound"],
        ["10:01:20", "192.168.1.22", "198.51.100.5:25", "ALLOW", "Outbound-SMTP"]
      ]
    },
    hints: [
      "192.168.x.x addresses are internal (private); other addresses in this log are external.",
      "Port 3389 is RDP, port 22 is SSH, port 443 is HTTPS, port 25 is SMTP.",
      "What is the external address 203.0.113.77 trying to reach, and on which ports?"
    ],
    tasks: [
      { id: "t1", prompt: "What is 203.0.113.77 most likely attempting to do?", choices: [ {id:"a", text:"Scan for open remote-access services (RDP, then SSH) on an internal host"}, {id:"b", text:"Send a normal outbound email"}, {id:"c", text:"Resolve a DNS name"}, {id:"d", text:"Perform a routine software update"} ], correct: "a", explanation: "The external IP is probing an internal host on RDP (3389) and then SSH (22), both common remote-access ports — a classic reconnaissance/attack pattern, correctly blocked by the default-deny rule." },
      { id: "t2", prompt: "Why did the default-deny rule block these attempts, and what does that tell you about the firewall's posture?", choices: [ {id:"a", text:"The firewall only allows explicitly permitted inbound traffic, blocking everything else by default — this is a secure default posture"}, {id:"b", text:"The firewall allows all inbound traffic by default and only blocks specific bad IPs"}, {id:"c", text:"The rule blocked it because the destination port was invalid"}, {id:"d", text:"The firewall is misconfigured because it blocked traffic at all"} ], correct: "a", explanation: "A default-deny posture blocks all inbound traffic unless explicitly allowed — the correct, secure default for a firewall protecting internal hosts from unsolicited external connections." },
      { id: "t3", prompt: "Is the 10:01:20 entry (192.168.1.22 to 198.51.100.5:25, ALLOW) cause for immediate concern by itself?", choices: [ {id:"a", text:"Not necessarily — it's an internal host sending outbound email traffic on the standard SMTP port, which is routine, though it's still worth knowing which hosts are allowed to send mail"}, {id:"b", text:"Yes, any outbound traffic is automatically an attack"}, {id:"c", text:"Yes, because port 25 is always malicious"}, {id:"d", text:"No log entry is ever worth reviewing"} ], correct: "a", explanation: "Outbound SMTP from an internal host is routine business traffic, not inherently malicious — the key skill is telling routine allowed traffic apart from the earlier reconnaissance pattern, not assuming all traffic is dangerous." }
    ],
    reflectionPrompt: "If this internal host (192.168.1.50) had actually needed legitimate remote access for an administrator, what safer alternative to leaving RDP/SSH open to the Internet could the business use instead?"
  },
  {
    id: "lab-phishing-email",
    title: "Analyze a Phishing Email",
    minutes: 20,
    domainId: "d2",
    objective: "Identify red flags in a fictional phishing email's headers and content.",
    scenario: "An employee forwarded this fictional email to the security team, asking if it's legitimate.",
    evidence: {
      type: "text",
      content:
        "From: IT Support <it-support@secure-updates-portal.net>\n" +
        "Reply-To: it.helpdesk.verify@mail-recover.info\n" +
        "To: jdelacruz@fictionalcorp.example\n" +
        "Subject: URGENT: Your mailbox will be suspended in 2 hours\n\n" +
        "Dear Employee,\n\n" +
        "Our system detected unusual activity on your account. Your mailbox will be permanently suspended in 2 hours unless you verify your identity immediately.\n\n" +
        "Click here to verify now: http://secure-updates-portal.net.verify-login.co/session=88213\n\n" +
        "Failure to act will result in permanent loss of access.\n\n" +
        "IT Support Team"
    },
    hints: [
      "Compare the From domain to the Reply-To domain — do they match?",
      "Look closely at the link's actual domain, not just the visible text.",
      "What emotional pressure tactics are being used?"
    ],
    tasks: [
      { id: "t1", prompt: "Which detail is the strongest technical red flag in this email?", choices: [ {id:"a", text:"The From domain (secure-updates-portal.net) and Reply-To domain (mail-recover.info) don't match, and the link's real domain differs from what it claims to be"}, {id:"b", text:"The email uses the word 'Dear Employee'"}, {id:"c", text:"The email was sent during business hours"}, {id:"d", text:"The subject line contains capital letters"} ], correct: "a", explanation: "Mismatched sender/reply-to domains and a link domain that doesn't match the claimed organization are strong technical indicators of phishing — legitimate IT communications don't route replies through unrelated domains." },
      { id: "t2", prompt: "What social engineering technique is most clearly used in the subject line and body?", choices: [ {id:"a", text:"Urgency (a short deadline pressuring quick, unverified action)"}, {id:"b", text:"Baiting with a physical item"}, {id:"c", text:"Tailgating"}, {id:"d", text:"Shoulder surfing"} ], correct: "a", explanation: "The 2-hour deadline and threat of permanent loss of access are classic urgency tactics meant to prevent the victim from pausing to verify the request." },
      { id: "t3", prompt: "What is the correct first action for the security team after receiving this forwarded email?", choices: [ {id:"a", text:"Confirm no one has clicked the link or entered credentials, and block the sender/link before deciding on further action"}, {id:"b", text:"Reply to the sender asking them to stop"}, {id:"c", text:"Forward it to all employees telling them to click the link to test it"}, {id:"d", text:"Take no action since the employee already reported it correctly"} ], correct: "a", explanation: "The priority is determining exposure (did anyone interact with it) and blocking the malicious indicators, rather than engaging with the attacker or ignoring the report entirely." }
    ],
    reflectionPrompt: "What is one specific coaching point you would give the employee who reported this, to reinforce the good behavior they already showed?"
  },
  {
    id: "lab-cvss-priority",
    title: "Prioritize Vulnerabilities Using CVSS Plus Business Context",
    minutes: 20,
    domainId: "d4",
    objective: "Practice combining a raw CVSS severity score with business context to decide what to fix first.",
    scenario: "A monthly vulnerability scan returned the following fictional findings. Leadership wants a prioritized remediation order, not just a list sorted by CVSS score.",
    evidence: {
      type: "table",
      headers: ["Finding", "CVSS Score", "Asset", "Business Context"],
      rows: [
        ["Missing TLS patch", "9.8 (Critical)", "Internal test server, isolated VLAN, no production data", "Not Internet-facing, no sensitive data"],
        ["Outdated web framework", "7.5 (High)", "Public customer login portal", "Internet-facing, handles customer credentials"],
        ["Weak cipher suite enabled", "5.3 (Medium)", "Internal file server", "Internal only, moderate sensitivity data"],
        ["Default admin credentials still active", "9.1 (Critical)", "Public-facing customer login portal (same as above)", "Internet-facing, handles customer credentials"]
      ]
    },
    hints: [
      "A high raw score on an isolated, low-value asset is often lower real priority than a slightly lower score on an exposed, high-value asset.",
      "Two findings on the same Internet-facing, credential-handling asset compound each other's risk.",
      "Business context (exposure + data sensitivity) can outweigh the raw CVSS number."
    ],
    tasks: [
      { id: "t1", prompt: "Which finding should most likely be remediated FIRST?", choices: [ {id:"a", text:"Default admin credentials on the public customer login portal"}, {id:"b", text:"Missing TLS patch on the isolated internal test server"}, {id:"c", text:"Weak cipher suite on the internal file server"}, {id:"d", text:"They should all be fixed in the exact order of their CVSS score, ignoring context"} ], correct: "a", explanation: "This finding combines a critical CVSS score with the highest possible exposure (Internet-facing) and highest possible impact (default admin credentials on a customer-facing, credential-handling system) — it should be prioritized first despite a nearly-identical CVSS score to the test server finding." },
      { id: "t2", prompt: "Why should the missing TLS patch on the isolated test server likely be prioritized LOWER than its 9.8 CVSS score alone would suggest?", choices: [ {id:"a", text:"It's isolated, not Internet-facing, and holds no production data, significantly reducing real-world exploitability and impact"}, {id:"b", text:"CVSS scores above 9.0 should always be ignored"}, {id:"c", text:"TLS vulnerabilities are never serious"}, {id:"d", text:"Test servers cannot be exploited"} ], correct: "a", explanation: "Business context — isolation, lack of Internet exposure, and no sensitive data — substantially lowers real-world risk even though the raw technical severity score is high. This doesn't mean ignore it; it means it's not the top priority relative to actively exposed, high-value assets." },
      { id: "t3", prompt: "What should the prioritized report communicate to leadership, beyond just a sorted list?", choices: [ {id:"a", text:"A brief justification for each priority ranking, connecting technical severity to business exposure and impact"}, {id:"b", text:"Only the CVSS numbers, with no explanation"}, {id:"c", text:"A recommendation to ignore all findings below Critical severity"}, {id:"d", text:"A request to shut down all affected systems immediately regardless of business impact"} ], correct: "a", explanation: "Effective vulnerability reporting explains the 'why' behind prioritization in business terms, helping non-technical stakeholders understand and support the remediation plan." }
    ],
    reflectionPrompt: "Describe, in your own words, one real-world scenario where a LOW CVSS score finding might still deserve high priority because of business context."
  },
  {
    id: "lab-ir-timeline",
    title: "Build an Incident Timeline and Choose Containment Actions",
    minutes: 20,
    domainId: "d4",
    objective: "Apply the incident response lifecycle to a realistic scenario and choose the correct next action at each stage.",
    scenario: "A fictional SOC receives the following sequence of events over 40 minutes involving a workstation named FIN-WS-14.",
    evidence: {
      type: "log",
      headers: ["Time", "Event"],
      rows: [
        ["09:00", "SIEM alert: FIN-WS-14 is beaconing every 60 seconds to an IP with no legitimate business reason to be contacted"],
        ["09:05", "Analyst confirms the destination IP is listed on a threat intelligence feed as a known command-and-control server"],
        ["09:07", "Analyst checks and confirms only FIN-WS-14 is affected; no other hosts show the same beaconing pattern"],
        ["09:10", "Analyst disconnects FIN-WS-14 from the network"],
        ["09:20", "Analyst identifies the malware file and the phishing email that delivered it, and removes both"],
        ["09:35", "Workstation is reimaged from a known-good baseline and monitored closely before returning to the user"],
        ["09:50", "Team documents the incident and updates email filtering rules to block similar phishing patterns"]
      ]
    },
    hints: [
      "Match each timestamp to one of the seven IR phases: Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons Learned.",
      "Preparation isn't shown in this timeline because it happened before the incident — that's normal.",
      "Notice how scoping (checking other hosts) happens before, not after, containment."
    ],
    tasks: [
      { id: "t1", prompt: "Which phase does the 09:07 event (\"confirms only FIN-WS-14 is affected\") represent?", choices: [ {id:"a", text:"Analysis"}, {id:"b", text:"Containment"}, {id:"c", text:"Eradication"}, {id:"d", text:"Preparation"} ], correct: "a", explanation: "Determining scope (which systems are affected) and confirming severity is part of Analysis, which happens before containment decisions are made." },
      { id: "t2", prompt: "Which phase does the 09:10 event (disconnecting the workstation) represent?", choices: [ {id:"a", text:"Containment"}, {id:"b", text:"Eradication"}, {id:"c", text:"Recovery"}, {id:"d", text:"Detection"} ], correct: "a", explanation: "Disconnecting the affected workstation limits the spread/impact right now — this is Containment." },
      { id: "t3", prompt: "Which phase does the 09:35 event (reimaging and monitoring before returning to the user) represent?", choices: [ {id:"a", text:"Recovery"}, {id:"b", text:"Eradication"}, {id:"c", text:"Detection"}, {id:"d", text:"Containment"} ], correct: "a", explanation: "Restoring the system to normal, verified operation is Recovery — Eradication (removing the malware and phishing email) already happened at 09:20." },
      { id: "t4", prompt: "The 09:50 event (documenting and updating filtering rules) is an example of which phase, and why does it matter even though the incident is technically over?", choices: [ {id:"a", text:"Lessons Learned — it improves defenses and process for the next incident, closing the loop"}, {id:"b", text:"Preparation — it's identical to the first phase and doesn't need to happen"}, {id:"c", text:"Detection — a second incident is being detected here"}, {id:"d", text:"It is not part of the incident response lifecycle at all"} ], correct: "a", explanation: "Lessons Learned captures what worked and what to improve, feeding directly back into better Preparation for future incidents — skipping this step is a common real-world mistake." }
    ],
    reflectionPrompt: "If FIN-WS-14 had belonged to a finance employee with access to wire-transfer approval, would you change any of the containment urgency or communication steps? Explain briefly."
  },
  {
    id: "lab-risk-register",
    title: "Create and Update a Basic Risk Register",
    minutes: 15,
    domainId: "d5",
    objective: "Practice classifying risks with the correct treatment option and understand what a risk register needs to track.",
    scenario: "A fictional small organization has identified three risks. Decide the most appropriate treatment for each, and understand what fields a real risk register would need.",
    evidence: {
      type: "table",
      headers: ["Risk", "Details"],
      rows: [
        ["Single point of failure: one admin knows all root passwords", "If that admin is unavailable, no one else can access critical systems"],
        ["Optional add-on feature has a known low-impact bug", "Fixing it would cost more in developer time than the bug could ever realistically cost the business"],
        ["A core business process depends entirely on one uninsured, low-cost vendor with no backup vendor identified", "If that vendor fails, the core process stops entirely"]
      ]
    },
    hints: [
      "Match each risk to avoid / transfer / mitigate / accept based on what makes practical sense.",
      "Not every risk needs an expensive fix — sometimes documented acceptance is the right, professional answer.",
      "A single point of failure is usually addressed by reducing the risk, not simply accepting or transferring it."
    ],
    tasks: [
      { id: "t1", prompt: "What is the most appropriate treatment for the single-admin password risk?", choices: [ {id:"a", text:"Mitigate — implement a PAM solution or documented secure backup-access process so no single person is a single point of failure"}, {id:"b", text:"Accept — do nothing further"}, {id:"c", text:"Avoid — stop using passwords entirely"}, {id:"d", text:"Transfer — buy insurance and take no technical action"} ], correct: "a", explanation: "This is a control gap that can and should be actively reduced (mitigated) with a proper access-management solution, rather than accepted or merely insured against." },
      { id: "t2", prompt: "What is the most appropriate treatment for the low-impact optional feature bug?", choices: [ {id:"a", text:"Accept — formally document that the cost of fixing exceeds the potential impact"}, {id:"b", text:"Avoid — remove the entire feature immediately"}, {id:"c", text:"Transfer — this must be insured"}, {id:"d", text:"Mitigate at any cost, regardless of the bug's real impact"} ], correct: "a", explanation: "When the cost of treatment clearly exceeds the potential loss, formal, documented acceptance is the appropriate, professional risk treatment." },
      { id: "t3", prompt: "What is the most appropriate treatment for the uninsured, no-backup critical vendor dependency?", choices: [ {id:"a", text:"Mitigate/transfer — identify a backup vendor and/or require insurance or contractual guarantees, given this is a critical, uninsured single point of failure"}, {id:"b", text:"Accept — this is a minor risk, no action needed"}, {id:"c", text:"Ignore it since it's a vendor's responsibility, not the organization's"}, {id:"d", text:"Avoid — immediately shut down the core business process"} ], correct: "a", explanation: "A critical, uninsured, single-vendor dependency with no backup is high concentration risk — active steps (identifying a backup vendor, requiring insurance/guarantees) are warranted, not passive acceptance or ignoring it." }
    ],
    reflectionPrompt: "Besides the risk description and treatment decision, name two other fields a real risk register entry should track (hint: think about who is accountable and how progress is reviewed over time)."
  },
  {
    id: "lab-hash-compare",
    title: "Compare File Hashes to a Threat-Intelligence List",
    minutes: 15,
    domainId: "d2",
    objective: "Compare file hashes found on a workstation against a fictional threat-intelligence feed to identify a known-malicious file.",
    scenario: "A workstation is showing unusual CPU activity. You pull a list of recently modified files and their SHA-256 hashes, then check them against a fictional threat-intelligence feed of known-malicious file hashes.",
    evidence: {
      type: "text",
      content:
        "WORKSTATION FILE SCAN (fictional)\n" +
        "File                    Location                         SHA-256 Hash (local)\n" +
        "invoice_Q3.pdf.exe      C:\\Users\\jsantos\\Downloads\\       3f2504e0a1d6c8b9e2f1a4d7c6b5a8e9f0d1c2b3a4e5f6d7c8b9a0e1f2d3c4b5\n" +
        "updater.exe             C:\\Windows\\Temp\\                 9e2a1c88b7f6e5d4c3b2a1908f7e6d5c4b3a2918f7e6d5c4b3a29180f7e6d5c\n" +
        "report.docx             C:\\Users\\jsantos\\Documents\\      7c4a8d09ca3762af61e59520943dc264\n\n" +
        "THREAT INTELLIGENCE FEED (fictional, known-malicious hashes)\n" +
        "SHA-256 Hash                                                     Known As\n" +
        "9e2a1c88b7f6e5d4c3b2a1908f7e6d5c4b3a2918f7e6d5c4b3a29180f7e6d5c  Trojan.GenericKD.Downloader\n" +
        "5f4dcc3b5aa765d61d8327deb882cf9911223344556677889900aabbccddeeff  Ransomware.LockBitClone"
    },
    hints: [
      "Match each local file's hash character-for-character against the threat-intel list.",
      "A hash match means the exact same file content — even if the file has been renamed.",
      "Location and naming patterns (like a fake 'invoice' or 'updater' name) are additional context clues, not proof by themselves."
    ],
    tasks: [
      { id: "t1", prompt: "Which local file's hash matches an entry on the threat-intelligence feed?", choices: [ {id:"a", text:"updater.exe"}, {id:"b", text:"invoice_Q3.pdf.exe"}, {id:"c", text:"report.docx"}, {id:"d", text:"None of them match"} ], correct: "a", explanation: "updater.exe's hash (9e2a1c88...) exactly matches the threat-intel entry for Trojan.GenericKD.Downloader, despite its innocent-sounding filename." },
      { id: "t2", prompt: "Why is comparing a file's hash to a threat-intel list more reliable than comparing file names alone?", choices: [ {id:"a", text:"A hash is a near-unique fingerprint of the file's exact content, so renamed or disguised malware is still caught"}, {id:"b", text:"Hashes reveal the file's encryption key"}, {id:"c", text:"Every version of a program always has the same hash"}, {id:"d", text:"File names cannot be changed by attackers"} ], correct: "a", explanation: "A hash reflects the file's actual content, not its name — an attacker can rename a malicious file to anything they want, but the hash of the underlying content stays the same, which is exactly why hash comparison catches it." },
      { id: "t3", prompt: "Even before checking the hash, why might updater.exe's LOCATION alone raise suspicion?", choices: [ {id:"a", text:"Legitimate updaters are rarely placed directly into a Temp folder by a user, which is a common malware staging location"}, {id:"b", text:"Temp folders are always malicious and should be deleted entirely"}, {id:"c", text:".exe files can only ever exist inside Temp folders"}, {id:"d", text:"Windows automatically blocks every file placed in Temp"} ], correct: "a", explanation: "Temp folders are a very common place attackers drop and run malware from, since they're writable and often overlooked — it's a useful contextual clue, though not proof by itself." }
    ],
    reflectionPrompt: "If invoice_Q3.pdf.exe had NOT matched any known hash, would you conclude it's safe? Explain what a hash match tells you, and what a hash NON-match does and does not tell you about a completely unfamiliar file."
  },
  {
    id: "lab-harden-workstation",
    title: "Harden a Fictional Workstation Using a Checklist",
    minutes: 18,
    domainId: "d4",
    objective: "Review a workstation's current configuration against basic hardening practices and identify which issues need fixing first.",
    scenario: "IT is preparing a new-hire laptop image for review before it's approved for company-wide rollout. The current configuration is listed below.",
    evidence: {
      type: "table",
      headers: ["Setting", "Current State"],
      rows: [
        ["Local administrator rights", "Standard user account has full Administrator rights"],
        ["Windows Firewall", "Disabled"],
        ["Guest account", "Enabled"],
        ["Unused Bluetooth service", "Running"],
        ["Full-disk encryption (BitLocker)", "Not enabled"],
        ["Automatic updates", "Disabled"],
        ["BIOS/UEFI password", "None set (blank)"]
      ]
    },
    hints: [
      "Compare each row against 'reduce attack surface' (Domain 2) and 'least privilege' (Domain 1/4).",
      "Not every finding is equally severe — some directly expose data, others mainly reduce visibility or control.",
      "Think about which single fix protects data confidentiality specifically if the device were lost or stolen."
    ],
    tasks: [
      { id: "t1", prompt: "Which setting is the clearest violation of least privilege?", choices: [ {id:"a", text:"Standard user account has full Administrator rights"}, {id:"b", text:"Guest account enabled"}, {id:"c", text:"Firewall disabled"}, {id:"d", text:"BIOS password blank"} ], correct: "a", explanation: "Least privilege means giving an account only the access it needs for its job — a standard day-to-day user account almost never needs full administrator rights." },
      { id: "t2", prompt: "Which single change would most directly protect data confidentiality if this laptop were lost or stolen?", choices: [ {id:"a", text:"Enable full-disk encryption (BitLocker)"}, {id:"b", text:"Enable the Windows Firewall"}, {id:"c", text:"Disable the Guest account"}, {id:"d", text:"Set a BIOS/UEFI password"} ], correct: "a", explanation: "Full-disk encryption directly protects the confidentiality of data at rest — even if the physical drive is removed, the data stays unreadable without the decryption key. The firewall, guest account, and BIOS password all matter, but none of them protect stored data confidentiality the way encryption does." },
      { id: "t3", prompt: "Besides disabling it, what else is good hardening practice for the built-in Guest account?", choices: [ {id:"a", text:"Where possible, rename or remove it entirely, since attackers often specifically target well-known default account names"}, {id:"b", text:"Grant it administrator rights for convenience"}, {id:"c", text:"Share it among all new hires as a shortcut"}, {id:"d", text:"Nothing further is needed once it's disabled"} ], correct: "a", explanation: "Well-known default account names (like 'Guest' or 'Administrator') are common targets for automated attacks — renaming or removing them, in addition to disabling unused ones, further reduces the attack surface." }
    ],
    reflectionPrompt: "Pick any two findings from the table and explain, in your own words, what a real attacker could actually do if each one were left unfixed."
  },
  {
    id: "lab-least-privilege-matrix",
    title: "Build a Least-Privilege Access Matrix",
    minutes: 18,
    domainId: "d4",
    objective: "Assign the minimum appropriate access level to each role in a fictional small company, based on their actual job duties.",
    scenario: "A small company is configuring role-based access for its new HR and finance system. Review each role's actual job duties and decide the correct access level.",
    evidence: {
      type: "table",
      headers: ["Role", "Job Duties"],
      rows: [
        ["HR Assistant", "Enters new-hire data and updates existing employee records"],
        ["Finance Clerk", "Creates payment requests for vendor invoices"],
        ["Finance Manager", "Reviews and approves payment requests created by others"],
        ["IT Helpdesk", "Resets passwords and unlocks locked accounts"],
        ["Marketing Intern", "Has no business need to access the HR or finance system at all"]
      ]
    },
    hints: [
      "For every role, ask: what is the MINIMUM access that lets them do their actual job, and nothing more?",
      "If one role both creates and approves the same sensitive action, that's a separation-of-duties red flag.",
      "'Helpdesk needs SOME administrative ability' does not mean they need ALL administrative ability."
    ],
    tasks: [
      { id: "t1", prompt: "What access level should the Marketing Intern have to the HR/finance system?", choices: [ {id:"a", text:"No access at all"}, {id:"b", text:"Read-only access"}, {id:"c", text:"Full edit access"}, {id:"d", text:"Administrator access"} ], correct: "a", explanation: "Least privilege means access is granted only when there's a real business need. The intern has no described need to access HR or finance systems, so the correct access level is none." },
      { id: "t2", prompt: "Should the Finance Clerk, who CREATES payment requests, also be able to APPROVE them?", choices: [ {id:"a", text:"No — approval should belong to a different role (like Finance Manager), to enforce separation of duties"}, {id:"b", text:"Yes, for convenience and speed"}, {id:"c", text:"Only for requests under a certain dollar amount"}, {id:"d", text:"Only if the clerk has worked there over a year"} ], correct: "a", explanation: "Separation of duties means no single person should both create and approve the same sensitive transaction — otherwise one person could create and approve a fraudulent payment entirely on their own." },
      { id: "t3", prompt: "The IT Helpdesk role needs to reset passwords. What is the least-privilege way to grant that ability?", choices: [ {id:"a", text:"Grant a scoped permission specifically for password resets, not full administrator rights over every system"}, {id:"b", text:"Give them full domain administrator rights"}, {id:"c", text:"Give them the same access as the Finance Manager"}, {id:"d", text:"Require no access at all, since users can reset their own passwords"} ], correct: "a", explanation: "Least privilege applies to admin-adjacent roles too — a helpdesk technician needing to reset passwords doesn't need broad administrator rights over unrelated systems; a scoped permission covers exactly what the job requires." }
    ],
    reflectionPrompt: "Why is it risky to give a new employee broad access 'just in case they need it later,' compared to expanding their access only when a real, specific need arises?"
  },
  {
    id: "lab-chain-of-custody",
    title: "Complete Chain-of-Custody Documentation",
    minutes: 18,
    domainId: "d4",
    objective: "Review an evidence-handling log for a seized laptop and identify where chain of custody was properly maintained versus broken.",
    scenario: "A laptop is seized as evidence in a suspected data-theft investigation. Below is the handling log recorded so far by the security and forensics teams.",
    evidence: {
      type: "table",
      headers: ["Date/Time", "Action", "Handled By", "Signature Recorded?"],
      rows: [
        ["2026-01-10 09:15", "Laptop seized from desk, bagged and tagged", "A. Reyes (Security)", "Yes"],
        ["2026-01-10 09:40", "Transported to evidence locker", "A. Reyes (Security)", "Yes"],
        ["2026-01-11 14:00", "Removed from locker for forensic imaging", "B. Cruz (Forensics)", "Yes"],
        ["2026-01-11 18:30", "Returned to locker after imaging", "(not recorded)", "No"],
        ["2026-01-14 08:00", "Removed for a second review", "C. Santos (Forensics)", "Yes"]
      ]
    },
    hints: [
      "Chain of custody requires EVERY handoff to be recorded — who, what, when, and their signature.",
      "A documentation gap doesn't necessarily mean the evidence was tampered with, but it does mean tampering can no longer be ruled out.",
      "Never alter or remove a documentation record after the fact, even to 'clean up' a mistake."
    ],
    tasks: [
      { id: "t1", prompt: "Which entry breaks the chain of custody?", choices: [ {id:"a", text:"The 2026-01-11 18:30 entry — who returned it and their signature were not recorded"}, {id:"b", text:"The 2026-01-10 09:15 entry"}, {id:"c", text:"The 2026-01-11 14:00 entry"}, {id:"d", text:"The 2026-01-14 08:00 entry"} ], correct: "a", explanation: "Every handoff must record who handled the evidence and their signature. The 18:30 return entry is missing both, creating an unaccounted-for gap in custody." },
      { id: "t2", prompt: "Why does this specific gap matter if the case ever goes to a legal or HR proceeding?", choices: [ {id:"a", text:"It creates a window where the evidence's integrity can no longer be fully verified, which could be challenged"}, {id:"b", text:"It doesn't matter, since the laptop was already imaged before the gap"}, {id:"c", text:"Only the very first entry in a chain-of-custody log actually matters"}, {id:"d", text:"Chain of custody only applies to the physical laptop, not any digital images made from it"} ], correct: "a", explanation: "An unbroken chain of custody is what proves evidence wasn't altered or tampered with. A gap — even an innocent clerical one — creates room to challenge whether the evidence (or the image made from it) can be fully trusted, which matters a great deal in legal or HR proceedings." },
      { id: "t3", prompt: "What should the forensics team do now that this gap has been discovered?", choices: [ {id:"a", text:"Document the gap explicitly in the case file and tighten the sign-in/sign-out process going forward"}, {id:"b", text:"Quietly delete the incomplete entry so the log looks clean"}, {id:"c", text:"Ignore it, since the laptop is back in the locker now"}, {id:"d", text:"Destroy the evidence since the chain is no longer perfect"} ], correct: "a", explanation: "The correct response to a documentation gap is transparency — disclose it honestly and fix the process going forward. Altering or deleting a record to hide the gap would be a far more serious integrity violation than the original clerical mistake." }
    ],
    reflectionPrompt: "In your own words, explain the difference between 'this evidence was definitely tampered with' and 'this evidence's chain of custody has a gap that can't rule out tampering.' Why does that distinction still matter even though neither is a good outcome?"
  }
];
