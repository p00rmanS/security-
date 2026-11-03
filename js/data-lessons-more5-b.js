/* Round 5, part B: lessons for topics the Exam Blueprint checker found only
   inside other objectives' lessons (Domains 4-5). Ids use the t18x range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d4: [
      {
        id: "d4-t183",
        title: "Mobile Solutions and Connection Methods: MDM, Deployment Models, Cellular, Wi-Fi, Bluetooth, and NFC",
        tag: "4.1",
        minutes: 22,
        goal: "Secure mobile devices with MDM and the right deployment model, and understand the security of each connection method.",
        why: "Mobile devices carry corporate data everywhere and connect over several radio technologies. The exam lists deployment models and connection methods and expects you to match each to its risks and controls.",
        simple:
          "Mobile security combines device management, deployment choices, and safe connectivity. MOBILE DEVICE MANAGEMENT (MDM), often part of unified endpoint management, enrolls devices and enforces policy: required passcodes and encryption, approved apps, OS update requirements, remote lock and wipe, certificate and Wi-Fi profile delivery, and compliance checks that can block non-compliant devices from corporate resources. Containerization or work profiles separate corporate apps and data from personal ones so the organization can wipe only its own data. DEPLOYMENT MODELS decide who owns and chooses devices. BYOD (bring your own device) uses personal devices, which is cheap and convenient but raises privacy, ownership, and control questions; COPE (corporate-owned, personally enabled) gives staff a company-owned device they may also use personally, giving the organization strong control; CYOD (choose your own device) lets staff pick from an approved list of company-owned devices; and fully corporate-owned, business-only devices give the most control. Policy should state what the organization may monitor or wipe, particularly on BYOD. CONNECTION METHODS each have risks. CELLULAR (4G and 5G) connects through carriers, is generally safer than public Wi-Fi, but can be attacked with rogue base stations (IMSI catchers), and SMS is not a secure channel for authentication codes. WI-FI should use WPA3 or enterprise authentication on trusted networks; public hotspots are risky because of evil twin and eavesdropping attacks, so a VPN is advised. BLUETOOTH enables short-range pairing and is exposed to attacks such as bluejacking (unsolicited messages), bluesnarfing (unauthorized data access), and flaws in implementations; reduce risk by turning it off when not needed, disabling discoverability, and keeping devices updated. NFC works at a few centimeters and powers contactless payments, with risks of skimming and relay attacks, reduced by distance and by payment tokenization. USB tethering and personal hotspots create additional paths that bypass corporate network controls. Other mobile hardening measures include blocking SIDELOADING (installing apps from outside the official store) and detecting jailbroken or rooted devices, using app vetting and mobile threat defense, patching promptly, using strong authentication and biometrics, geofencing sensitive access, and training users about phishing by SMS (smishing) and malicious apps. For wireless infrastructure, a SITE SURVEY measures coverage and interference, and a HEAT MAP visualizes signal strength so access points are placed well and rogue devices can be noticed.",
        deepDive: [
          { h: "What MDM can enforce", list: [
            "Passcode and biometric requirements; full-device encryption.",
            "Approved or blocked applications; app store restrictions.",
            "Minimum OS and patch levels; compliance reporting.",
            "Remote lock, locate, and wipe (full or selective).",
            "Distribution of certificates, VPN, and Wi-Fi profiles.",
            "Separation of work and personal data (containers or work profiles).",
            "Conditional access: only compliant devices reach corporate data."
          ] },
          { h: "Deployment models compared", list: [
            "BYOD: user-owned; lowest cost; hardest to control; privacy considerations; use containers and clear policy.",
            "COPE: company-owned, personal use allowed; strong control with user convenience.",
            "CYOD: user chooses from approved company-owned devices; balances choice and control.",
            "Corporate-owned, business-only: maximum control, least flexibility."
          ] },
          { h: "Connection methods and risks", list: [
            "Cellular: carrier network; rogue base stations; SMS interception and SIM swapping.",
            "Wi-Fi: evil twins, open hotspots, weak encryption. Use WPA3 or WPA2-Enterprise and a VPN on untrusted networks.",
            "Bluetooth: bluejacking, bluesnarfing, pairing flaws. Turn off when unused; limit discoverability.",
            "NFC: skimming and relay attacks at short range; use tokenized payments and lock the device.",
            "USB and tethering: malware via cables or charging stations (juice jacking) and bypass of network controls."
          ] },
          { h: "Mobile application and device threats", list: [
            "Sideloading and unofficial app stores bring malware.",
            "Jailbreaking or rooting removes OS protections.",
            "Outdated OS versions lack security fixes.",
            "Excessive app permissions leak data.",
            "Lost or stolen devices expose data without encryption and remote wipe."
          ] },
          { h: "Wireless planning", list: [
            "Site survey: measure coverage, interference, and capacity before and after installation.",
            "Heat map: visual signal strength map used to place access points and spot dead zones or unexpected coverage outside the building.",
            "Choose channels and power to reduce interference and limit signal leakage.",
            "Plan for rogue access point detection and guest network separation."
          ] }
        ],
        keyTerms: [
          { term: "MDM", def: "Mobile Device Management: enrolling and enforcing policy on mobile devices." },
          { term: "BYOD", def: "Bring Your Own Device: employees use personal devices for work." },
          { term: "COPE", def: "Corporate-Owned, Personally Enabled: company devices that may also be used personally." },
          { term: "CYOD", def: "Choose Your Own Device: employees select from an approved list of company-owned devices." },
          { term: "Containerization", def: "Separating corporate apps and data from personal ones on a device." },
          { term: "Sideloading", def: "Installing apps from outside the official app store." },
          { term: "Jailbreak / Root", def: "Removing OS restrictions on a mobile device, weakening its security." },
          { term: "Bluesnarfing", def: "Unauthorized access to data on a device over Bluetooth." },
          { term: "Site Survey", def: "Measuring wireless coverage and interference to plan access points." },
          { term: "Heat Map", def: "A visual map of wireless signal strength." }
        ],
        analogy:
          "Mobile management is like running a fleet of company vehicles and personal cars used for work. MDM is the fleet manager's rules and tracking. BYOD is staff driving their own cars (cheap, but you cannot dictate the maintenance), COPE is a company car they may also use on weekends, CYOD is picking from approved models, and corporate-only is a pool car. The roads are the connection methods: cellular is a toll road, public Wi-Fi is an unlit side street, Bluetooth is a whispered conversation within earshot, and NFC is a handshake.",
        technical:
          "A company allows BYOD for email only. Devices must enroll in MDM, which requires a passcode, encryption, a minimum OS version, and installs a work profile that holds corporate email and files. The company can remotely wipe only the work profile. Jailbroken devices fail compliance and lose access. Executives receive COPE phones with stricter controls. After a pen test shows the guest Wi-Fi leaks outside the building, the network team runs a site survey, adjusts access point power using a heat map, and enforces WPA3 on corporate SSIDs.",
        table: {
          headers: ["Model", "Owner", "Control level", "Main concern"],
          rows: [
            ["BYOD", "Employee", "Lowest", "Privacy, mixed personal and work data"],
            ["COPE", "Company", "High", "Personal use of company device"],
            ["CYOD", "Company", "High", "Supporting a list of approved models"],
            ["Corporate-owned, business only", "Company", "Highest", "Cost, less flexibility"]
          ]
        },
        confusion: [
          { a: "BYOD", b: "COPE", diff: "BYOD is employee-owned. COPE is company-owned with personal use allowed." },
          { a: "COPE", b: "CYOD", diff: "COPE devices are assigned by the company and personally enabled. CYOD lets the employee choose among approved company-owned models." },
          { a: "MDM", b: "Containerization", diff: "MDM manages the device and enforces policy. Containerization is a feature that separates work data from personal data, often delivered through MDM." },
          { a: "Bluejacking", b: "Bluesnarfing", diff: "Bluejacking sends unsolicited messages. Bluesnarfing steals data from the device." },
          { a: "Site survey", b: "Heat map", diff: "A site survey is the measurement activity. A heat map is the visual result of those measurements." }
        ],
        soc: "Mobile signals include devices failing compliance checks, impossible travel from a mobile app, new device enrollments, jailbreak detections, and phishing links delivered by SMS. Remote lock and selective wipe are standard containment actions for lost or compromised devices.",
        patterns: [
          ["Employees use their personal phones for work email", "BYOD"],
          ["Company-owned phone that staff may also use personally", "COPE"],
          ["Employee picks a phone from an approved list owned by the company", "CYOD"],
          ["Wipe only corporate data from a lost personal phone", "MDM with containerization (selective wipe)"],
          ["Installing apps from outside the official store", "Sideloading"],
          ["Removing OS restrictions on a phone", "Jailbreaking / rooting"],
          ["Unsolicited Bluetooth messages", "Bluejacking"],
          ["Visual map of wireless signal strength", "Heat map from a site survey"]
        ],
        takeaways: [
          "MDM enforces policy; the deployment model decides how much control you have.",
          "Each connection method has its own attacks; use VPN on untrusted Wi-Fi and disable unused radios.",
          "Block sideloading and jailbroken devices."
        ],
        remember: [
          "MDM: passcode, encryption, app control, patch level, remote lock and wipe, compliance.",
          "BYOD = personal device; COPE = company-owned, personally enabled; CYOD = choose from approved company devices.",
          "Containerization separates work and personal data and allows selective wipe.",
          "Connection methods: cellular, Wi-Fi, Bluetooth, NFC, USB tethering.",
          "Bluetooth: bluejacking (messages), bluesnarfing (data theft). Turn off when not needed.",
          "Public Wi-Fi: use a VPN; watch for evil twins.",
          "Site survey measures signal; heat map visualizes it."
        ],
        taglish:
          "Ang MDM ang nagpapatupad ng patakaran sa mobile: passcode, encryption, aprubadong app, update ng OS, remote lock at wipe. Mga modelo: BYOD (sariling device ng empleyado), COPE (device ng kumpanya na pwede ring personal), CYOD (pumili sa aprubadong listahan ng device ng kumpanya). Gumamit ng containerization para mahiwalay ang trabaho sa personal at mabura lang ang data ng kumpanya. Sa koneksyon: cellular, Wi-Fi (gumamit ng VPN sa public), Bluetooth (bluejacking at bluesnarfing, patayin kapag hindi ginagamit), at NFC. Iwasan ang sideloading at jailbroken na device."
      },
      {
        id: "d4-t184",
        title: "The Vulnerability Management Workflow: Identify, Analyze, Respond, Validate, and Report",
        tag: "4.3",
        minutes: 24,
        goal: "Carry a vulnerability through identification, analysis, response, validation, and reporting, using exposure, environment, and risk tolerance to prioritize.",
        why: "Objective 4.3 is a workflow, and exam questions test where in the workflow you are and what comes next. Knowing the full sequence, including analysis factors like exposure factor and risk tolerance, makes the answers predictable.",
        simple:
          "Vulnerability management is a repeating cycle. IDENTIFICATION finds weaknesses through VULNERABILITY SCANS, application security testing (STATIC analysis of source code and DYNAMIC analysis of running applications), PACKAGE MONITORING of third-party components, THREAT FEEDS (open-source OSINT, proprietary or third-party feeds, information-sharing organizations, and the dark web), PENETRATION TESTING, a RESPONSIBLE DISCLOSURE program (often with a BUG BOUNTY), and system or process AUDITS. ANALYSIS then decides what matters. CONFIRMATION verifies results and separates FALSE POSITIVES (not real) from FALSE NEGATIVES (real flaws that were missed). PRIORITIZATION uses the CVSS score for severity and the CVE identifier to name the flaw, plus VULNERABILITY CLASSIFICATION (type and severity) and context: the EXPOSURE FACTOR (how much of an asset's value would be lost if exploited), ENVIRONMENTAL VARIABLES (internet exposure, compensating controls, how the asset is used, network location), the INDUSTRY or ORGANIZATIONAL IMPACT (what an exploit would mean for the business, customers, safety, or compliance), and the organization's RISK TOLERANCE (how much risk it will accept). A medium-severity flaw on an Internet-facing payment system may outrank a critical flaw on an isolated test system. RESPONSE AND REMEDIATION options are PATCHING, applying COMPENSATING CONTROLS, SEGMENTATION or isolation to limit reachability, INSURANCE to transfer some financial impact, and formal EXCEPTIONS or EXEMPTIONS when the flaw cannot be fixed right away, which are documented, approved by the risk owner, time-limited, and reviewed. VALIDATION OF REMEDIATION proves the fix worked: RESCANNING to confirm the flaw is gone, an AUDIT of the process or change, and VERIFICATION by testing that the system still works and the weakness cannot be exploited. REPORTING communicates status and trends to technical teams, management, and auditors, including counts by severity, age, time to remediate, exceptions, and risk reduction, so decisions and funding are informed. Then the cycle repeats, because new vulnerabilities and assets appear constantly.",
        deepDive: [
          { h: "Identification methods", list: [
            "Vulnerability scans: network, credentialed, agent-based, and configuration scans.",
            "Application security: static analysis (source code), dynamic analysis (running app), and package or dependency monitoring (software composition analysis).",
            "Threat feeds: OSINT, proprietary feeds, information-sharing organizations (ISACs), and dark web monitoring.",
            "Penetration testing: attempts to exploit and chain weaknesses.",
            "Responsible disclosure and bug bounty programs: external researchers report flaws.",
            "System and process audits: reviews of controls and configurations."
          ] },
          { h: "Analysis factors", list: [
            "Confirmation: validate findings; recognize false positives and false negatives.",
            "CVSS and CVE: severity score and a unique identifier.",
            "Classification: type of weakness and severity category.",
            "Exposure factor: share of the asset's value that would be lost if exploited.",
            "Environmental variables: Internet-facing or internal, existing compensating controls, and asset role.",
            "Industry and organizational impact: effect on operations, safety, customers, and regulation.",
            "Risk tolerance: the level of risk leadership will accept; sets deadlines and exceptions."
          ] },
          { h: "Worked prioritization", p: "Three findings: (A) CVSS 9.8 on an isolated lab server with no sensitive data and no network route from outside; (B) CVSS 6.5 on an Internet-facing web server handling customer data, with a public exploit in active use; (C) CVSS 8.1 on an internal file server behind segmentation. B ranks first because exposure, impact, and active exploitation outweigh raw severity. C is next, and A can follow a longer timeline or be accepted with a documented exception." },
          { h: "Response and remediation options", list: [
            "Patch: the preferred fix when available and safe.",
            "Compensating control: WAF rule, disabling a feature, stronger monitoring.",
            "Segmentation or isolation: limit who can reach the vulnerable system.",
            "Insurance: transfers some financial impact but does not remove the flaw.",
            "Exception or exemption: documented, approved, time-limited acceptance with an owner and review date."
          ] },
          { h: "Validation and reporting", list: [
            "Rescan after remediation to confirm the finding is closed.",
            "Audit the process to confirm change control and evidence.",
            "Verify functionality and that the exploit no longer works.",
            "Report by severity, asset criticality, age, remediation time, open exceptions, and trends.",
            "Tailor reports to audience: technical detail for operators, risk summaries for executives."
          ] }
        ],
        keyTerms: [
          { term: "Static / Dynamic Analysis", def: "Testing source code without running it, and testing a running application." },
          { term: "Package Monitoring", def: "Tracking third-party components and dependencies for known vulnerabilities." },
          { term: "Responsible Disclosure", def: "A process for researchers to report vulnerabilities privately so they can be fixed before publication." },
          { term: "Bug Bounty", def: "A program that pays researchers for reporting valid vulnerabilities." },
          { term: "False Positive / False Negative", def: "A reported flaw that is not real, and a real flaw that was not reported." },
          { term: "Exposure Factor", def: "The percentage of an asset's value that would be lost if a threat exploited it." },
          { term: "Environmental Variables", def: "Conditions of the specific environment that change a vulnerability's real risk." },
          { term: "Risk Tolerance", def: "The level of risk an organization is willing to accept." },
          { term: "Exception / Exemption", def: "A documented decision to leave a vulnerability unremediated for a period." },
          { term: "Rescanning", def: "Scanning again after remediation to confirm a vulnerability is fixed." }
        ],
        analogy:
          "Managing vulnerabilities is running a health clinic for your systems. Screening and check-ups find problems (identification). The doctor confirms which findings are real and ranks them by danger and by the patient's circumstances (analysis). Treatment is medicine, a workaround, or isolation (response). A follow-up test confirms recovery (validation), and monthly statistics go to the hospital board (reporting).",
        technical:
          "A weekly credentialed scan finds 900 vulnerabilities. The team confirms the results, removes 60 false positives, and classifies the rest. Using environmental data (Internet exposure, asset criticality, active exploitation in threat feeds), it moves a medium-severity flaw in the customer portal ahead of several high-severity internal findings. The portal flaw is patched within 48 hours, a legacy system that cannot be patched receives a WAF rule and segmentation under a documented 90-day exception, and rescans confirm the fixes. The monthly report shows time to remediate and the age of open items.",
        table: {
          headers: ["Phase", "Key activities", "Output"],
          rows: [
            ["Identification", "Scans, SAST/DAST, package monitoring, threat feeds, pen tests, bug bounty, audits", "Raw findings"],
            ["Analysis", "Confirm, CVSS/CVE, classify, exposure factor, environment, impact, risk tolerance", "Prioritized list"],
            ["Response / remediation", "Patch, compensating controls, segmentation, insurance, exceptions", "Fixes or approved exceptions"],
            ["Validation", "Rescan, audit, verification", "Evidence the fix worked"],
            ["Reporting", "Metrics and trends for each audience", "Decisions and funding"]
          ]
        },
        confusion: [
          { a: "CVE", b: "CVSS", diff: "CVE identifies a specific vulnerability. CVSS rates its severity." },
          { a: "Exposure factor", b: "CVSS score", diff: "Exposure factor is the percentage of asset value lost if exploited. CVSS is a standardized severity rating of the flaw itself." },
          { a: "Exception", b: "Remediation", diff: "An exception documents a decision not to fix right now. Remediation actually fixes or mitigates the weakness." },
          { a: "Rescanning", b: "Audit", diff: "Rescanning technically checks that the vulnerability is gone. An audit reviews the process and evidence." },
          { a: "Responsible disclosure", b: "Bug bounty", diff: "Responsible disclosure is the reporting process. A bug bounty adds payment for valid reports." }
        ],
        soc: "Vulnerability data tells the SOC where attacks are likely to succeed. When a flaw is being exploited in the wild, analysts search for exposure and for signs of exploitation, and align alert priority with open, exploitable vulnerabilities on the affected hosts.",
        patterns: [
          ["Scanner reports a flaw that is not actually present", "False positive"],
          ["A real flaw was missed by the scan", "False negative"],
          ["Medium-severity flaw on Internet-facing system under active attack", "Prioritize above higher-severity internal flaws"],
          ["Cannot patch this quarter", "Compensating control or documented, time-limited exception"],
          ["Confirm the fix by scanning again", "Validation of remediation (rescan)"],
          ["Researcher reports a flaw privately and is paid", "Responsible disclosure with bug bounty"],
          ["Monitor third-party libraries for known flaws", "Package monitoring"],
          ["Counts by severity and age sent to management", "Vulnerability reporting"]
        ],
        takeaways: [
          "Follow the workflow: identify, analyze, respond, validate, report, repeat.",
          "Prioritize with severity, exposure, environment, impact, and risk tolerance together.",
          "Always validate fixes and document exceptions."
        ],
        remember: [
          "Identification: scans, static and dynamic analysis, package monitoring, threat feeds (OSINT, proprietary, ISACs, dark web), pen tests, responsible disclosure/bug bounty, audits.",
          "Analysis: confirm (false positive/negative), prioritize with CVSS, CVE, classification, exposure factor, environmental variables, impact, risk tolerance.",
          "Response: patch, compensating controls, segmentation, insurance, exceptions or exemptions.",
          "Validation: rescan, audit, verification.",
          "Reporting: severity, age, time to remediate, exceptions, trends.",
          "Exposure and active exploitation can outrank a higher CVSS score.",
          "Exceptions need an owner, approval, and a review date."
        ],
        taglish:
          "Ang vulnerability management ay paulit-ulit na siklo. Identification: scan, static at dynamic analysis, package monitoring, threat feeds, pen test, responsible disclosure o bug bounty, at audit. Analysis: kumpirmahin (false positive o false negative), saka unahin gamit ang CVSS, CVE, exposure factor, environmental variables, epekto sa negosyo, at risk tolerance. Response: patch, compensating control, segmentation, insurance, o exception. Validation: rescan, audit, at verification. Reporting: ulat sa bawat tagapakinig. Ang medium na butas sa Internet-facing na sistema na ginagamit na ng attacker ay maaaring mas mataas ang prayoridad kaysa critical na butas sa nakahiwalay na lab."
      },
      {
        id: "d4-t185",
        title: "Modifying Enterprise Capabilities: Firewalls, IDS/IPS, Web Filters, Secure Protocols, DNS, Email, FIM, DLP, NAC, EDR/XDR",
        tag: "4.5",
        minutes: 24,
        goal: "Given a problem, choose and tune the right enterprise security capability, including firewall rules, IDS/IPS signatures, web filters, operating system controls, secure protocols, and the monitoring and prevention tools listed in objective 4.5.",
        why: "Objective 4.5 is scenario-based: you are given an incident or requirement and must change a control. Questions reward knowing what each tool does, how it is tuned, and when to prefer one configuration over another.",
        simple:
          "Enhancing security often means modifying a capability the organization already has. FIREWALLS: write and order RULES and ACCESS LISTS (first match wins, specific before general, default deny), control which PORTS and PROTOCOLS pass, and place public servers in SCREENED SUBNETS (a DMZ) so a compromise does not reach the internal network. IDS AND IPS rely on SIGNATURES for known attacks and anomaly or behavioral detection for unusual activity; keeping signatures current, tuning out false positives, reviewing alert TRENDS, and deciding whether a sensor should only alert (IDS) or also block (IPS, inline) are routine modifications. WEB FILTERS control browsing and can be AGENT-BASED (software on the endpoint, so policy follows the device on and off the network) or use a CENTRALIZED PROXY (a gateway all traffic passes through, simpler to manage but only protecting traffic that goes through it). Their techniques include URL SCANNING, CONTENT CATEGORIZATION (blocking categories such as gambling or malware), REPUTATION scoring, and BLOCK RULES with allow and deny lists. OPERATING SYSTEM SECURITY uses GROUP POLICY on Windows to push settings such as password rules, USB restrictions, and firewall configuration, and SELINUX on Linux to confine processes with mandatory access control. IMPLEMENTATION OF SECURE PROTOCOLS means choosing the PROTOCOL (replace Telnet with SSH, HTTP with HTTPS, FTP with SFTP, SNMPv1 or v2 with SNMPv3, LDAP with LDAPS), the PORT (use the secure variant and close the insecure one), and the TRANSPORT method (TLS for application traffic, IPsec for network tunnels). DNS FILTERING blocks known malicious and unwanted domains at name resolution. EMAIL SECURITY combines DMARC, DKIM, and SPF to stop spoofing with a secure email GATEWAY that filters spam, malware, and malicious links. FILE INTEGRITY MONITORING (FIM) alerts when critical files change from a baseline. DATA LOSS PREVENTION (DLP) detects and blocks sensitive data leaving through email, web, endpoints, or cloud. NETWORK ACCESS CONTROL (NAC) checks a device's identity and health before allowing it on the network and can quarantine non-compliant devices. EDR and XDR monitor behavior across endpoints and other sources and enable response such as isolation, and USER BEHAVIOR ANALYTICS (UBA or UEBA) baselines normal behavior and flags anomalies such as unusual data access. The skill is to read the scenario and choose the change that addresses the cause.",
        deepDive: [
          { h: "Problem to capability change", list: [
            "Public web server compromised and attacker reached internal hosts: place it in a screened subnet and tighten firewall rules between zones.",
            "Telnet and FTP in use: replace with SSH and SFTP, close ports 23 and 21.",
            "Emails spoofing your domain: publish SPF, DKIM, and a DMARC policy.",
            "Users reaching malware sites: DNS filtering and web filtering with reputation and categories.",
            "Laptops browsing the Internet off the corporate network: agent-based web filter or cloud proxy.",
            "Critical system files silently modified: file integrity monitoring.",
            "Sensitive documents emailed to personal accounts: DLP.",
            "Unmanaged or non-compliant devices joining the network: NAC with quarantine.",
            "Fileless malware and lateral movement on endpoints: EDR or XDR with isolation.",
            "Employee suddenly downloads thousands of files: user behavior analytics."
          ] },
          { h: "Tuning IDS and IPS", list: [
            "Keep signatures updated; disable irrelevant ones to cut noise.",
            "Review alert trends to find noisy rules and real patterns.",
            "Start in alert-only mode for new rules, then move to blocking once false positives are understood.",
            "Place inline for prevention (fail-open versus fail-closed decisions) or passive for monitoring.",
            "Combine signature-based and anomaly-based detection."
          ] },
          { h: "Agent-based versus centralized web filtering", list: [
            "Agent-based: policy travels with the device, covers remote users, needs deployment and maintenance.",
            "Centralized proxy: single enforcement point, easier to manage, but off-network devices bypass it unless forced through a cloud service.",
            "URL scanning inspects links and downloads; categorization groups sites; reputation scores their risk; block rules set allow and deny exceptions."
          ] },
          { h: "Secure protocol choices", list: [
            "Telnet to SSH (22); HTTP to HTTPS (443); FTP to SFTP or FTPS.",
            "SNMPv1 or v2c to SNMPv3; LDAP (389) to LDAPS (636); POP3 and IMAP to their TLS versions.",
            "Choose TLS for application traffic and IPsec for site-to-site or remote-access tunnels.",
            "Disable old protocol versions (SSL, TLS 1.0 and 1.1) and weak ciphers."
          ] },
          { h: "Operating system controls", list: [
            "Group Policy: central settings for password rules, lockout, USB restrictions, application control, and firewall.",
            "SELinux: mandatory access control confining each process to defined permissions; enforcing mode blocks violations, permissive logs them.",
            "Both enforce baselines and reduce the damage of compromise."
          ] }
        ],
        keyTerms: [
          { term: "Screened Subnet", def: "A network zone (DMZ) for public-facing systems, separated from the internal network by firewalls." },
          { term: "Signature-Based Detection", def: "Detecting known attacks by matching patterns." },
          { term: "Web Filter", def: "A control that allows or blocks web access by URL, category, or reputation." },
          { term: "Agent-Based Filtering", def: "Filtering enforced by software installed on the endpoint." },
          { term: "Centralized Proxy", def: "A gateway through which traffic passes for inspection and policy enforcement." },
          { term: "Group Policy", def: "Windows domain feature for centrally enforcing settings." },
          { term: "SELinux", def: "A Linux mandatory access control framework." },
          { term: "File Integrity Monitoring", def: "Detecting unauthorized changes to critical files." },
          { term: "Data Loss Prevention", def: "Detecting and blocking unauthorized transfer of sensitive data." },
          { term: "Network Access Control", def: "Checking device identity and health before granting network access." },
          { term: "User Behavior Analytics", def: "Detecting anomalies by comparing activity to a baseline of normal behavior." }
        ],
        analogy:
          "Modifying enterprise capabilities is like adjusting building security after an incident. You move the public reception into a lobby separate from the offices (screened subnet), change the lock policy on certain doors (firewall rules), replace a flimsy latch with a deadbolt (secure protocols), add a mail screening room (email security), put seals on the files that must not be touched (FIM), check IDs and equipment at the gate (NAC), and add an analyst who notices when someone behaves strangely (user behavior analytics).",
        technical:
          "After a phishing incident and a data leak, a company makes several changes. It publishes DMARC with a reject policy, adds link sandboxing at the email gateway, and enables DNS filtering. DLP rules block uploads of files labeled Restricted to personal webmail, and an agent-based web filter extends category and reputation rules to laptops. Legacy FTP is replaced by SFTP with port 21 closed. A new NAC policy quarantines devices that lack endpoint protection. The IDS is tuned after a trend review shows two noisy signatures producing 70 percent of alerts, and EDR isolation is added to the response playbook.",
        table: {
          headers: ["Capability", "What it does", "Typical modification"],
          rows: [
            ["Firewall", "Filters traffic by rule", "Reorder rules, close ports, add screened subnet"],
            ["IDS / IPS", "Detects (and blocks) attacks", "Update and tune signatures; move inline"],
            ["Web filter", "Controls web access", "Block categories, reputation, agent-based vs proxy"],
            ["Group Policy / SELinux", "Enforce OS settings and confinement", "Apply baseline settings centrally"],
            ["Secure protocols", "Encrypt and authenticate communications", "Replace insecure protocol, port, and transport"],
            ["DNS filtering", "Blocks malicious domains at resolution", "Add categories and threat feeds"],
            ["Email security", "Stops spoofing, spam, malicious messages", "SPF, DKIM, DMARC, gateway rules"],
            ["FIM", "Alerts on file changes", "Baseline critical files"],
            ["DLP", "Stops sensitive data leaving", "Create rules by classification"],
            ["NAC", "Gates network access by device health", "Quarantine non-compliant devices"],
            ["EDR / XDR", "Detects and responds on endpoints and beyond", "Enable isolation and response actions"],
            ["UBA", "Flags abnormal user behavior", "Tune baselines and thresholds"]
          ]
        },
        confusion: [
          { a: "Agent-based filter", b: "Centralized proxy", diff: "Agent-based filtering travels with the endpoint. A centralized proxy filters only traffic that passes through the gateway." },
          { a: "IDS", b: "IPS", diff: "An IDS detects and alerts. An IPS sits inline and can block." },
          { a: "FIM", b: "DLP", diff: "FIM detects changes to files. DLP detects and blocks sensitive data leaving the organization." },
          { a: "NAC", b: "Firewall", diff: "NAC decides whether a device may join the network based on identity and health. A firewall filters traffic between networks by rules." },
          { a: "Protocol selection", b: "Port selection", diff: "Protocol selection chooses the secure protocol (SSH rather than Telnet). Port selection ensures the secure port is used and the insecure one is closed." }
        ],
        soc: "Each modification changes what the SOC sees: new DLP and DNS filter events, DMARC reports, NAC quarantine logs, and FIM alerts. Tuning matters because a noisy tool is ignored. Analysts track which modifications reduced incidents and false positives.",
        patterns: [
          ["Public server compromised, attacker reached internal network", "Screened subnet and stricter firewall rules"],
          ["Cleartext Telnet in use", "Replace with SSH and close port 23"],
          ["Spoofed email from your domain", "SPF, DKIM, and DMARC"],
          ["Remote laptops need web policy off-network", "Agent-based web filter"],
          ["Detect unauthorized changes to system files", "File integrity monitoring"],
          ["Block sensitive files from leaving by email", "DLP"],
          ["Quarantine devices missing endpoint protection", "NAC"],
          ["Flag an employee suddenly downloading thousands of files", "User behavior analytics"]
        ],
        takeaways: [
          "Identify the cause, then modify the capability that addresses it.",
          "Tune detection tools: updated signatures, trend reviews, and staged blocking.",
          "Choose secure protocols, ports, and transports deliberately."
        ],
        remember: [
          "Firewall: ordered rules, first match wins, default deny; use screened subnets for public servers.",
          "IDS/IPS: signatures plus tuning; IPS blocks inline.",
          "Web filter: agent-based (endpoint) vs centralized proxy; URL scanning, categories, reputation, block rules.",
          "Group Policy (Windows) and SELinux (Linux) enforce OS security.",
          "Secure protocols: pick protocol, port, and transport (TLS or IPsec).",
          "Email: SPF, DKIM, DMARC plus gateway. DNS filtering blocks bad domains.",
          "FIM = file changes; DLP = data leaving; NAC = device admission; EDR/XDR = detect and respond; UBA = abnormal behavior."
        ],
        taglish:
          "Hanapin ang ugat ng problema, tapos baguhin ang tamang capability. Firewall: ayusin ang pagkakasunod ng rules, deny-all sa dulo, at gumamit ng screened subnet para sa public server. IDS/IPS: i-update at i-tune ang signature; ang IPS ay humaharang. Web filter: agent-based (sumusunod sa device) o centralized proxy. Palitan ang Telnet ng SSH, HTTP ng HTTPS, FTP ng SFTP. Para sa email: SPF, DKIM, DMARC. FIM para sa pagbabago ng file, DLP para sa pagtagas ng sensitibong data, NAC para sa pagpasok ng device, EDR/XDR para sa deteksyon at tugon, at UBA para sa kakaibang kilos ng user."
      },
      {
        id: "d4-t186",
        title: "Security Alerting Workflow: Triage, Quarantine, Alert Tuning, SCAP, and Archiving",
        tag: "4.4",
        minutes: 22,
        goal: "Run an alert from detection through triage, response (including quarantine), validation, tuning, reporting, and archiving, and name the monitoring tools in objective 4.4.",
        why: "Alerts are the SOC's daily input, and objective 4.4 names the activities and tools. Questions describe an alert situation and ask for the next step or the right tool.",
        simple:
          "Security monitoring watches COMPUTING RESOURCES: SYSTEMS (servers and endpoints), APPLICATIONS, and INFRASTRUCTURE (network devices, cloud services). The core ACTIVITIES are LOG AGGREGATION (collecting logs centrally), ALERTING (generating notifications when rules or thresholds are met), SCANNING (looking for vulnerabilities and misconfigurations), REPORTING (summaries and metrics), and ARCHIVING (retaining data for investigations and compliance). When an alert fires, the workflow is: receive the alert, triage and enrich it with context (asset, user, threat intelligence), classify it as a true or false positive, and decide on a response. ALERT RESPONSE AND REMEDIATION can include QUARANTINE (isolating a file, email, or device so it cannot cause harm while preserving it for analysis), blocking indicators, disabling accounts, patching, or escalating to incident response. VALIDATION confirms that the response worked and the threat is contained. ALERT TUNING then improves the system: adjusting thresholds, refining rules, whitelisting known-good activity, and disabling noisy rules so that false positives drop without hiding real attacks; unmanaged noise causes ALERT FATIGUE and missed incidents. Several TOOLS support this. SCAP (Security Content Automation Protocol) is a suite of standards that lets tools exchange and automatically check security configuration and vulnerability data in a common format, including identifiers such as CVE and CPE and scoring such as CVSS. BENCHMARKS (such as CIS Benchmarks) are secure configuration baselines that tools measure systems against. AGENTS installed on devices send detailed local data, while AGENTLESS monitoring collects information over the network or APIs without software on the target. A SIEM aggregates and correlates logs and generates alerts. ANTIVIRUS detects and quarantines known malware. DLP detects sensitive data leaving. SNMP TRAPS are unsolicited alerts from network devices. NETFLOW provides traffic metadata. VULNERABILITY SCANNERS find weaknesses. Good monitoring defines what is collected, who reviews it, how fast alerts must be handled, how long data is kept, and how effectiveness is measured, such as mean time to detect and respond and the false positive rate.",
        deepDive: [
          { h: "The alert lifecycle", list: [
            "Detect: a rule or tool fires an alert.",
            "Triage: check severity, asset importance, and context; enrich with intelligence.",
            "Classify: true positive, false positive, or benign true positive.",
            "Respond: contain (quarantine), eradicate, and escalate as required.",
            "Validate: confirm the threat is gone and systems are healthy.",
            "Tune: adjust rules and thresholds based on what was learned.",
            "Report and archive: document, measure, and retain."
          ] },
          { h: "Quarantine in practice", list: [
            "Email: move a malicious message out of inboxes into a quarantine store.",
            "Endpoint: antivirus or EDR isolates a file or the whole host.",
            "Network: NAC or switch changes place a device in a restricted VLAN.",
            "Quarantine preserves evidence and allows later release if the alert was a false positive."
          ] },
          { h: "Alert tuning", list: [
            "Raise or lower thresholds to match normal behavior.",
            "Add exceptions for approved activity (for example a scheduled scanner).",
            "Combine conditions to reduce noise (many failures then a success).",
            "Retire rules that never produce value.",
            "Avoid tuning so aggressively that real attacks are hidden; test and document changes."
          ] },
          { h: "Tools and standards", list: [
            "SCAP: standards (such as CVE, CVSS, CPE, and configuration checking formats) for automated vulnerability and compliance checks.",
            "Benchmarks: CIS and vendor hardening guides used as baselines.",
            "SIEM: aggregation, correlation, alerting, dashboards, and retention.",
            "Antivirus and EDR: detection and quarantine of malicious files and behavior.",
            "DLP: monitoring of data movement.",
            "SNMP traps and NetFlow: network device alerts and traffic metadata.",
            "Vulnerability scanners: discover weaknesses and verify remediation."
          ] },
          { h: "Agents versus agentless monitoring", list: [
            "Agent-based: richer local telemetry and works off-network, but requires deployment and maintenance.",
            "Agentless: no software on the target, quicker to start, but less detail and dependent on network reachability and credentials."
          ] },
          { h: "Archiving and reporting", list: [
            "Retain logs and alerts according to legal, regulatory, and investigative needs.",
            "Protect archives from tampering and control access.",
            "Report on volume, time to detect and respond, false positive rate, and coverage."
          ] }
        ],
        keyTerms: [
          { term: "Log Aggregation", def: "Collecting logs from many sources into a central system." },
          { term: "Alert Tuning", def: "Adjusting detection rules and thresholds to reduce false positives and improve accuracy." },
          { term: "Quarantine", def: "Isolating a file, message, or device so it cannot cause harm while preserving it." },
          { term: "Alert Fatigue", def: "Reduced attention caused by too many low-value alerts." },
          { term: "SCAP", def: "Security Content Automation Protocol: standards for automating security configuration and vulnerability checks." },
          { term: "Benchmark", def: "A secure configuration baseline such as a CIS Benchmark." },
          { term: "Agent / Agentless", def: "Monitoring with software installed on the target versus without installing anything." },
          { term: "SNMP Trap", def: "An unsolicited alert from a network device." },
          { term: "True Positive / False Positive", def: "An alert for a real problem versus an alert for something harmless." },
          { term: "Archiving", def: "Long-term retention of logs and records for investigation and compliance." }
        ],
        analogy:
          "Alerting is a hospital triage desk. Alarms (alerts) come in, the nurse checks the patient's chart (context), decides if it is a real emergency (true or false positive), isolates a contagious patient (quarantine), confirms the patient is stable afterward (validation), and adjusts the alarm settings so the machine stops beeping for harmless readings (tuning), while records are filed for the future (archiving).",
        technical:
          "A SIEM alert reports a workstation connecting to a known bad domain. The analyst enriches it with the asset owner and threat intelligence, confirms it as a true positive, and has the EDR quarantine the host while preserving memory. The email gateway quarantines the matching message across all mailboxes. After validation, the team finds that a noisy rule had been producing 200 daily false alerts from an approved vulnerability scanner; they add an exception for the scanner's address and require two conditions before alerting. A weekly SCAP-based scan compares systems against the CIS benchmark and reports drift, and alerts and logs are archived for 12 months.",
        table: {
          headers: ["Activity", "Purpose", "Example"],
          rows: [
            ["Log aggregation", "Centralize data", "Forward logs to the SIEM"],
            ["Alerting", "Notify on suspicious events", "Rule fires on repeated failed logins"],
            ["Scanning", "Find weaknesses", "Weekly vulnerability scan"],
            ["Reporting", "Communicate status and metrics", "Monthly MTTD and false positive rate"],
            ["Archiving", "Retain for investigation and compliance", "Keep logs for 12 months"],
            ["Quarantine", "Contain a threat", "Isolate infected host or message"],
            ["Alert tuning", "Reduce noise and improve accuracy", "Whitelist the approved scanner"],
            ["Validation", "Confirm the response worked", "Verify host is clean and reconnected"]
          ]
        },
        confusion: [
          { a: "Quarantine", b: "Deletion", diff: "Quarantine isolates and preserves an item for analysis and possible release. Deletion destroys it." },
          { a: "Alert tuning", b: "Alert suppression", diff: "Tuning refines rules for accuracy. Suppression silences alerts, which can hide real attacks if done carelessly." },
          { a: "SCAP", b: "SIEM", diff: "SCAP is a set of standards for automating security configuration and vulnerability checking. A SIEM collects and correlates logs and raises alerts." },
          { a: "Agent-based", b: "Agentless", diff: "Agent-based needs installed software and gives detailed local data. Agentless collects remotely without installing software." },
          { a: "Log aggregation", b: "Archiving", diff: "Aggregation gathers logs for current analysis. Archiving retains data long term." }
        ],
        soc: "Daily SOC performance depends on this workflow: how quickly alerts are triaged, how much noise analysts face, whether quarantine actions are reversible, and whether tuning is documented. Metrics from the workflow, such as time to detect, time to respond, and false positive rates, guide staffing and tool decisions.",
        patterns: [
          ["Isolate a suspicious file while keeping it for analysis", "Quarantine"],
          ["Too many false alerts from an approved scanner", "Alert tuning (add an exception, refine the rule)"],
          ["Analysts ignore alerts because there are so many", "Alert fatigue"],
          ["Standards for automated configuration and vulnerability checks", "SCAP"],
          ["Secure configuration baseline to measure systems against", "Benchmark (such as CIS)"],
          ["Monitoring without installing software on the target", "Agentless"],
          ["Keep logs for a required number of months", "Archiving"],
          ["Confirm the threat is gone after the response", "Validation"]
        ],
        takeaways: [
          "Alerts follow a lifecycle from detection to tuning and archiving.",
          "Quarantine contains and preserves; tuning reduces noise without hiding attacks.",
          "Know the tools: SCAP, benchmarks, agents, SIEM, antivirus, DLP, SNMP traps, NetFlow, scanners."
        ],
        remember: [
          "Monitor systems, applications, and infrastructure.",
          "Activities: log aggregation, alerting, scanning, reporting, archiving, alert response (quarantine) and validation, alert tuning.",
          "Quarantine isolates but preserves; validate afterward.",
          "Tuning reduces false positives; avoid hiding real attacks; document changes.",
          "SCAP = standards for automated checks; benchmarks = secure baselines.",
          "Agent-based gives rich data; agentless is simpler but shallower.",
          "Track MTTD, MTTR, and false positive rate."
        ],
        taglish:
          "Ang monitoring ay sa mga sistema, aplikasyon, at imprastraktura. Mga gawain: log aggregation, alerting, scanning, reporting, at archiving. Kapag may alert: i-triage, tukuyin kung tunay o false positive, at tumugon (hal. quarantine na naghihiwalay pero nag-iingat ng ebidensya), tapos i-validate. Ang alert tuning, ina-adjust ang rules para bumaba ang false positive; iwasan ang alert fatigue. Mga tool: SCAP (pamantayan para sa awtomatikong pag-check ng configuration at vulnerability), benchmark (hal. CIS), agent o agentless, SIEM, antivirus, DLP, SNMP trap, NetFlow, at vulnerability scanner."
      }
    ],

    d5: [
      {
        id: "d5-t184",
        title: "Compliance Program Operations: Reporting, Due Care and Due Diligence, Consequences, and Monitoring",
        tag: "5.4",
        minutes: 22,
        goal: "Explain how a compliance program reports, monitors, and enforces obligations, distinguish due diligence from due care, and describe the consequences of non-compliance.",
        why: "Compliance is ongoing work, not a one-time certificate. The exam covers the reporting, monitoring, and consequences pieces, and tests the due diligence versus due care distinction.",
        simple:
          "A compliance program ensures the organization follows the laws, regulations, contracts, and internal policies that apply to it. COMPLIANCE REPORTING flows in two directions. INTERNAL reporting gives management, the audit committee, and the board the status of controls, findings, and remediation, so leaders can act and show oversight. EXTERNAL reporting delivers required information to regulators, auditors, customers, and certification bodies, such as breach notifications, regulatory filings, and attestation reports. The CONSEQUENCES OF NON-COMPLIANCE can be severe: FINES, SANCTIONS (such as restrictions on business activity), REPUTATIONAL DAMAGE and loss of customer trust, LOSS OF LICENSE or authorization to operate, and CONTRACTUAL IMPACTS such as penalties, lost contracts, or termination. COMPLIANCE MONITORING checks that obligations continue to be met. It includes DUE DILIGENCE, the investigation and research done before a decision or commitment to understand risk (for example assessing a vendor or an acquisition), and DUE CARE, the ongoing actions a reasonable organization takes to protect assets and meet obligations once in place (maintaining controls, patching, training, and monitoring). A simple way to remember: due diligence is doing your homework; due care is doing the right things on an ongoing basis. Monitoring also relies on ATTESTATION AND ACKNOWLEDGEMENT: employees and managers confirm that they have read and will follow policies, and control owners attest that controls are operating. Monitoring can be INTERNAL (self-assessments and internal audits) and EXTERNAL (regulators and independent auditors), and AUTOMATION supports it through continuous controls monitoring, governance, risk, and compliance (GRC) tools, automated evidence collection, and dashboards that flag control failures early. PRIVACY compliance adds specific elements. Legal implications vary at LOCAL, REGIONAL, NATIONAL, and GLOBAL levels, and organizations operating internationally must satisfy several regimes at once. A DATA SUBJECT is the individual the data is about, with rights over it. The CONTROLLER determines why and how personal data is processed, and the PROCESSOR handles it on the controller's behalf. Data OWNERSHIP assigns accountability for each data set. A DATA INVENTORY shows what personal data exists and where, supporting RETENTION schedules, and the RIGHT TO BE FORGOTTEN (erasure) lets individuals request deletion of their data, subject to legal exceptions such as legal holds and required retention.",
        deepDive: [
          { h: "Reporting audiences and content", list: [
            "Board and audit committee: risk-focused summaries, major findings, trends, and remediation status.",
            "Management: detailed control status, resource needs, and deadlines.",
            "Regulators: filings, incident and breach notifications, and responses to examinations.",
            "Customers and partners: attestation reports and questionnaire responses.",
            "Auditors: evidence of controls and testing."
          ] },
          { h: "Consequences of non-compliance", list: [
            "Fines: financial penalties set by regulators or contracts.",
            "Sanctions: restrictions, orders, or penalties limiting operations.",
            "Reputational damage: loss of trust, customers, and partners.",
            "Loss of license: authority to operate in a regulated industry can be removed.",
            "Contractual impacts: penalties, lost business, or termination for breach of agreements."
          ] },
          { h: "Due diligence versus due care", list: [
            "Due diligence: investigate before acting (assess a vendor, evaluate a regulation's impact, review an acquisition).",
            "Due care: act responsibly on an ongoing basis (implement and maintain controls, train staff, respond to incidents).",
            "Failing at due care after identifying a risk can be treated as negligence.",
            "Both are demonstrated with records."
          ] },
          { h: "Monitoring mechanisms", list: [
            "Attestation: owners confirm controls operate; acknowledgement: staff confirm they have read policies.",
            "Internal monitoring: self-assessments, control testing, internal audit.",
            "External monitoring: regulatory exams and independent audits.",
            "Automation: continuous controls monitoring, GRC platforms, automated evidence collection, alerts for control drift."
          ] },
          { h: "Privacy compliance elements", list: [
            "Local, regional, national, and global legal implications; map data flows to jurisdictions.",
            "Data subject rights: access, correction, deletion (right to be forgotten), portability, objection.",
            "Controller versus processor responsibilities and contracts.",
            "Data ownership and a data inventory.",
            "Retention schedules, legal holds, and secure deletion."
          ] },
          { h: "Worked example", p: "A fintech company operating in several countries maps each regulation to its controls in a GRC tool. The tool collects automated evidence (for example evidence that access reviews were completed) and flags a missed review. Due diligence was performed on a new payment processor before contracting. Due care continues through patching and training. Managers sign quarterly attestations, the board receives a quarterly compliance report, and a regulator's examination later finds one control gap, resulting in a corrective plan but no fine because the company can show consistent monitoring and prompt remediation." }
        ],
        keyTerms: [
          { term: "Compliance Reporting", def: "Communicating compliance status internally to leadership and externally to regulators and others." },
          { term: "Due Diligence", def: "Investigation and research performed before a decision or commitment to understand risk." },
          { term: "Due Care", def: "Ongoing reasonable actions taken to protect assets and meet obligations." },
          { term: "Attestation", def: "A formal statement that controls or obligations are being met." },
          { term: "Acknowledgement", def: "Confirmation by a person that they have read and will follow a policy." },
          { term: "Sanction", def: "A penalty or restriction imposed for non-compliance." },
          { term: "Continuous Controls Monitoring", def: "Automated, ongoing testing and evidence collection for controls." },
          { term: "GRC", def: "Governance, Risk, and Compliance: processes and tools for managing these areas together." },
          { term: "Data Subject", def: "The individual to whom personal data relates." },
          { term: "Right to be Forgotten", def: "An individual's right to request deletion of their personal data in certain circumstances." }
        ],
        analogy:
          "Due diligence is checking a used car thoroughly before you buy it. Due care is servicing it regularly after you own it. Compliance reporting is sending the insurer proof of the inspection and the service history, and telling your family if there is a problem. Consequences of ignoring the rules include fines, losing the right to drive (license), and lost trust.",
        technical:
          "A healthcare company must comply with privacy law and with payment card rules. Policies are published and staff acknowledge them annually. Control owners attest quarterly. A GRC platform maps each requirement to controls and collects evidence automatically, alerting when, for example, encryption is disabled on a data store. Internal audit tests a sample of controls and reports to the audit committee, while an external assessor performs an annual payment card assessment. When a patient requests deletion, the privacy team uses the data inventory to find all copies, deletes what it can, and documents the legal exception for records it must retain.",
        table: {
          headers: ["Element", "Meaning", "Example"],
          rows: [
            ["Internal reporting", "To management and board", "Quarterly compliance dashboard to the audit committee"],
            ["External reporting", "To regulators, customers, certifiers", "Breach notification; attestation report"],
            ["Due diligence", "Investigate before acting", "Assess a vendor before signing"],
            ["Due care", "Maintain protections over time", "Patching, training, monitoring"],
            ["Attestation / acknowledgement", "Confirm controls operate; confirm policies read", "Quarterly attestation; annual policy sign-off"],
            ["Automation", "Continuous evidence and drift alerts", "GRC platform checks"],
            ["Consequences", "Fines, sanctions, reputation, license, contracts", "Fine plus loss of a major customer"]
          ]
        },
        confusion: [
          { a: "Due diligence", b: "Due care", diff: "Due diligence is researching and assessing before a decision. Due care is acting responsibly and maintaining protections afterward." },
          { a: "Attestation", b: "Acknowledgement", diff: "Attestation is a formal statement that controls are in place and working. Acknowledgement is confirmation that someone has read and will follow a policy." },
          { a: "Internal reporting", b: "External reporting", diff: "Internal reporting goes to management and the board. External reporting goes to regulators, customers, and certifiers." },
          { a: "Fine", b: "Sanction", diff: "A fine is a monetary penalty. A sanction is a broader penalty or restriction, which may include limits on activities." },
          { a: "Controller", b: "Processor", diff: "The controller decides why and how personal data is processed. The processor acts on the controller's instructions." }
        ],
        soc: "Security operations supply much of the compliance evidence: log retention proofs, incident records, vulnerability remediation timelines, and access review results. Automation that exports this evidence regularly reduces audit effort and shows continuous compliance rather than point-in-time effort.",
        patterns: [
          ["Researching a vendor's security before contracting", "Due diligence"],
          ["Regularly patching and training staff to protect assets", "Due care"],
          ["Quarterly report of control status to the board", "Internal compliance reporting"],
          ["Notification sent to a regulator after a breach", "External compliance reporting"],
          ["Employees sign that they have read the policy", "Acknowledgement"],
          ["Tool automatically collects evidence and flags control drift", "Compliance automation / continuous monitoring"],
          ["Regulator removes the company's authorization to operate", "Loss of license (consequence of non-compliance)"],
          ["Individual asks for their data to be erased", "Right to be forgotten; subject to legal exceptions"]
        ],
        takeaways: [
          "Compliance is continuous: monitor, report, and remediate.",
          "Due diligence comes before the decision; due care continues after it.",
          "Consequences go beyond fines to sanctions, reputation, licenses, and contracts."
        ],
        remember: [
          "Reporting: internal (management, board) and external (regulators, customers, certifiers).",
          "Consequences: fines, sanctions, reputational damage, loss of license, contractual impacts.",
          "Due diligence = investigate before; due care = maintain after.",
          "Monitoring: attestation and acknowledgement, internal and external checks, automation.",
          "Privacy: local, regional, national, global law; data subject; controller vs processor; ownership; data inventory and retention; right to be forgotten.",
          "Legal holds and required retention can override deletion requests.",
          "Automate evidence collection to show continuous compliance."
        ],
        taglish:
          "Ang compliance reporting: internal (sa management at board) at external (sa regulator, customer, at certifier). Kapag hindi sumunod: multa, sanctions, pinsala sa reputasyon, pagkawala ng lisensya, at epekto sa kontrata. Due diligence ay pag-iimbestiga bago magdesisyon; due care ay patuloy na pag-aalaga ng proteksyon pagkatapos. Monitoring: attestation (pormal na pahayag na gumagana ang controls), acknowledgement (nabasa ang policy), internal at external na pagsusuri, at automation. Sa privacy: data subject, controller laban sa processor, data inventory, retention, at right to be forgotten na maaaring mapigilan ng legal hold."
      }
    ]
  },

  tips: {
    "d4-t183": "Sort by who owns the device: employee-owned = BYOD, company-owned with personal use = COPE, employee chooses from an approved company list = CYOD. A lost BYOD phone calls for a selective wipe of the work container. Disable Bluetooth and NFC when not in use and use a VPN on public Wi-Fi.",
    "d4-t184": "Walk the workflow in order: identify, analyze (confirm, rank), respond, validate, report. When ranking, weigh exposure, active exploitation, and asset importance together with CVSS. Cannot fix now means a compensating control or a documented, time-limited exception.",
    "d4-t185": "Translate the symptom to the tool: spoofed email = SPF/DKIM/DMARC, file changes = FIM, data leaving = DLP, unhealthy device joining = NAC, endpoint behavior = EDR, odd user activity = UBA, insecure protocol = switch to its secure version and port, public server compromise = screened subnet.",
    "d4-t186": "Quarantine contains while preserving evidence; tuning reduces noise without hiding attacks. If analysts are ignoring alerts, the answer is tuning. SCAP means standards for automated configuration and vulnerability checks; benchmarks are the baselines it checks against.",
    "d5-t184": "Due diligence happens BEFORE (investigating a vendor or deal) and due care happens AFTER and continues (maintaining controls). Consequences always include more than fines: sanctions, reputation, license, and contracts. Legal obligations to retain data override erasure requests while they apply."
  },

  summaries: {
    "d4-t183": "Mobile security combines MDM policy enforcement, a deployment model (BYOD, COPE, CYOD) that sets the level of control, and safe use of cellular, Wi-Fi, Bluetooth, and NFC, with sideloading and jailbreaking blocked.",
    "d4-t184": "Vulnerability management cycles from identification through analysis, response, validation, and reporting, prioritizing by severity together with exposure, environment, impact, and risk tolerance, and recording exceptions when fixes must wait.",
    "d4-t185": "Strengthening an enterprise means choosing and tuning the right capability for the problem, from firewall rules and screened subnets to secure protocols, email authentication, FIM, DLP, NAC, EDR, and behavior analytics.",
    "d4-t186": "An alert is triaged, classified, answered with actions such as quarantine, validated, and used to tune detection, supported by SCAP, benchmarks, SIEM, and other tools and by archiving and reporting.",
    "d5-t184": "Compliance is an ongoing program of reporting internally and externally, due diligence before decisions and due care afterward, attestation and automation for monitoring, and awareness of fines, sanctions, reputation loss, license loss, and contract impacts."
  },

  questions: [
    {
      id: "q-x-d4-47", domainId: "d4", tag: "d4-t183", type: "single",
      prompt: "A company wants employees to choose a phone from an approved list of company-owned models. Which deployment model is this?",
      choices: [
        { id: "a", text: "CYOD (choose your own device)" },
        { id: "b", text: "BYOD (bring your own device)" },
        { id: "c", text: "A company-owned, business-only device with no choice" },
        { id: "d", text: "Shadow IT" }
      ],
      correct: "a",
      explanation: "CYOD lets employees select from an approved list of company-owned devices.",
      distractorExplanations: {
        b: "BYOD uses devices the employee already owns.",
        c: "Business-only devices are assigned without employee choice.",
        d: "Shadow IT is technology used without approval."
      }
    },
    {
      id: "q-x-d4-48", domainId: "d4", tag: "d4-t183", type: "single",
      prompt: "An employee loses a personal phone that holds corporate email. The company wants to remove corporate data without erasing the employee's personal photos. Which capability is MOST appropriate?",
      choices: [
        { id: "a", text: "MDM selective wipe of the work container" },
        { id: "b", text: "A full factory reset of the device" },
        { id: "c", text: "Disabling Bluetooth" },
        { id: "d", text: "Installing an additional app store" }
      ],
      correct: "a",
      explanation: "With MDM and containerization, the organization can remove only corporate apps and data while leaving personal data intact.",
      distractorExplanations: {
        b: "A full reset would also erase the employee's personal data, which the company wants to avoid.",
        c: "Disabling Bluetooth does not remove corporate data from a lost device.",
        d: "Adding an app store does not address data on a lost device."
      }
    },
    {
      id: "q-x-d4-49", domainId: "d4", tag: "d4-t184", type: "single",
      prompt: "A vulnerability scan reports a critical flaw, but a manual check shows the system is not vulnerable. What is this finding?",
      choices: [
        { id: "a", text: "A false positive" },
        { id: "b", text: "A false negative" },
        { id: "c", text: "A true positive" },
        { id: "d", text: "A compensating control" }
      ],
      correct: "a",
      explanation: "A reported vulnerability that does not actually exist is a false positive.",
      distractorExplanations: {
        b: "A false negative would be a real vulnerability the scan failed to report.",
        c: "A true positive is a real, correctly reported finding.",
        d: "A compensating control is an alternative safeguard, not a scan result."
      }
    },
    {
      id: "q-x-d4-50", domainId: "d4", tag: "d4-t184", type: "single",
      prompt: "After patching a vulnerable server, which step proves that the vulnerability has been remediated?",
      choices: [
        { id: "a", text: "Rescanning the server and verifying the finding is gone" },
        { id: "b", text: "Closing the ticket without testing" },
        { id: "c", text: "Increasing the CVSS score" },
        { id: "d", text: "Archiving the original scan report only" }
      ],
      correct: "a",
      explanation: "Validation of remediation uses rescanning and verification to confirm the vulnerability is no longer present.",
      distractorExplanations: {
        b: "Closing without testing leaves no evidence the fix worked.",
        c: "A CVSS score does not change by patching and is unrelated to proof of remediation.",
        d: "Archiving the original report does not confirm the issue is fixed."
      }
    },
    {
      id: "q-x-d4-51", domainId: "d4", tag: "d4-t185", type: "single",
      prompt: "A company still allows FTP and Telnet for administration. Which change BEST improves security?",
      choices: [
        { id: "a", text: "Replace them with SFTP and SSH and close the insecure ports" },
        { id: "b", text: "Leave them enabled but add a banner" },
        { id: "c", text: "Move them to non-standard ports" },
        { id: "d", text: "Enable file integrity monitoring only" }
      ],
      correct: "a",
      explanation: "Choosing secure protocols and ports (SFTP and SSH) and closing insecure ones removes cleartext administration.",
      distractorExplanations: {
        b: "A banner does not encrypt traffic or stop credential theft.",
        c: "Changing ports does not encrypt the traffic.",
        d: "FIM detects file changes and does not protect cleartext protocols."
      }
    },
    {
      id: "q-x-d4-52", domainId: "d4", tag: "d4-t185", type: "single",
      prompt: "Employees use laptops both in the office and at home, and the company wants web filtering policies to apply everywhere. Which approach fits BEST?",
      choices: [
        { id: "a", text: "An agent-based web filter on the endpoints" },
        { id: "b", text: "A centralized proxy in the headquarters only" },
        { id: "c", text: "A hub in the server room" },
        { id: "d", text: "Disabling web access" }
      ],
      correct: "a",
      explanation: "Agent-based filtering travels with the device, so policy applies on and off the corporate network.",
      distractorExplanations: {
        b: "A headquarters-only proxy does not see traffic from laptops that bypass it when off the network.",
        c: "A hub only repeats network traffic and provides no filtering.",
        d: "Disabling web access is impractical and not a filtering approach."
      }
    },
    {
      id: "q-x-d4-53", domainId: "d4", tag: "d4-t186", type: "single",
      prompt: "A security tool isolates a suspicious email attachment so users cannot open it, while keeping it for analysis. What is this action called?",
      choices: [
        { id: "a", text: "Quarantine" },
        { id: "b", text: "Archiving" },
        { id: "c", text: "Enumeration" },
        { id: "d", text: "Tokenization" }
      ],
      correct: "a",
      explanation: "Quarantine isolates an item so it cannot cause harm while preserving it for analysis or release.",
      distractorExplanations: {
        b: "Archiving retains data long term and does not isolate threats.",
        c: "Enumeration discovers assets or accounts.",
        d: "Tokenization replaces sensitive values with tokens."
      }
    },
    {
      id: "q-x-d4-54", domainId: "d4", tag: "d4-t186", type: "single",
      prompt: "A SOC receives hundreds of daily alerts from one approved scanner, and analysts are starting to ignore alerts. What is the BEST action?",
      choices: [
        { id: "a", text: "Tune the rule by adding an exception for the approved scanner and refining conditions" },
        { id: "b", text: "Disable all alerting" },
        { id: "c", text: "Ignore the alerts" },
        { id: "d", text: "Delete the logs" }
      ],
      correct: "a",
      explanation: "Tuning reduces false positives from known-good activity while keeping detection of real threats, countering alert fatigue.",
      distractorExplanations: {
        b: "Disabling all alerting removes visibility into real attacks.",
        c: "Ignoring alerts is what alert fatigue leads to and risks missing incidents.",
        d: "Deleting logs destroys evidence and does not fix the noisy rule."
      }
    },
    {
      id: "q-x-d5-27", domainId: "d5", tag: "d5-t184", type: "single",
      prompt: "A company thoroughly investigates a vendor's financial health and security posture before signing a contract. Which concept does this describe?",
      choices: [
        { id: "a", text: "Due diligence" },
        { id: "b", text: "Due care" },
        { id: "c", text: "Attestation" },
        { id: "d", text: "Sanctions" }
      ],
      correct: "a",
      explanation: "Due diligence is the research and assessment performed before a decision or commitment.",
      distractorExplanations: {
        b: "Due care refers to ongoing responsible actions after commitments are made.",
        c: "Attestation is a formal statement that controls are in place.",
        d: "Sanctions are penalties for non-compliance."
      }
    },
    {
      id: "q-x-d5-28", domainId: "d5", tag: "d5-t184", type: "single",
      prompt: "Which of the following is a consequence of non-compliance with a regulation?",
      choices: [
        { id: "a", text: "Fines, sanctions, reputational damage, or loss of license" },
        { id: "b", text: "Automatic exemption from future audits" },
        { id: "c", text: "Lower insurance premiums in every case" },
        { id: "d", text: "No consequence if no breach occurred" }
      ],
      correct: "a",
      explanation: "Non-compliance can bring fines, sanctions, reputational harm, loss of license, and contractual impacts, even without a breach.",
      distractorExplanations: {
        b: "Non-compliance usually increases scrutiny rather than granting exemptions.",
        c: "Non-compliance typically does not reduce insurance costs.",
        d: "Regulatory penalties can apply even when no breach has occurred."
      }
    }
  ],

  glossary: [
    { term: "COPE", domain: "d4", plain: "A company phone you are allowed to use personally too.", technical: "Corporate-Owned, Personally Enabled: company-owned devices that employees may also use for personal purposes.", example: "A company-issued phone with a personal profile." },
    { term: "CYOD", domain: "d4", plain: "Pick your own device from the company's list.", technical: "Choose Your Own Device: employees select from an approved list of company-owned devices.", example: "Choosing between three approved phones." },
    { term: "Sideloading", domain: "d4", plain: "Installing apps from outside the official store.", technical: "Installing applications from sources other than the device's official app store.", example: "Installing an APK downloaded from a website." },
    { term: "Exposure Factor", domain: "d4", plain: "How much of an asset's value is lost if the threat hits.", technical: "The percentage of an asset's value that would be lost if a threat exploited a vulnerability.", example: "40 percent of a server's value." },
    { term: "SCAP", domain: "d4", plain: "Standards that let tools check security settings automatically.", technical: "Security Content Automation Protocol: standards for exchanging and automating vulnerability and configuration assessment.", example: "Scanning systems against a CIS benchmark." },
    { term: "Alert Tuning", domain: "d4", plain: "Adjusting alerts so fewer are false.", technical: "Refining detection rules and thresholds to reduce false positives while preserving detection.", example: "Adding an exception for an approved scanner." },
    { term: "Quarantine", domain: "d4", plain: "Isolating something dangerous without deleting it.", technical: "Isolating a file, message, or device so it cannot cause harm while preserving it for analysis.", example: "Moving a malicious email out of inboxes." },
    { term: "Due Diligence", domain: "d5", plain: "Doing your homework before you decide.", technical: "Investigation and assessment performed before a decision or commitment to understand risk.", example: "Reviewing a vendor's security before signing." },
    { term: "Due Care", domain: "d5", plain: "Doing the right things to protect assets on an ongoing basis.", technical: "Ongoing, reasonable actions to protect assets and meet obligations after commitments are made.", example: "Regular patching and staff training." }
  ],

  acronyms: [
    { acro: "UEM", expansion: "Unified Endpoint Management", meaning: "A platform managing all endpoint types, including mobile devices, under one set of policies." },
    { acro: "SCAP", expansion: "Security Content Automation Protocol", meaning: "Standards for automating security configuration and vulnerability checks." },
    { acro: "CPE", expansion: "Common Platform Enumeration", meaning: "A standard naming scheme for IT products and platforms." },
    { acro: "GRC", expansion: "Governance, Risk, and Compliance", meaning: "Processes and tools for managing governance, risk, and compliance together." },
    { acro: "UEBA", expansion: "User and Entity Behavior Analytics", meaning: "Detecting anomalies by baselining the behavior of users and devices." }
  ]
});
