/* CompTIA Security+ SY0-701 exam blueprint: every objective and its listed
   sub-topics, written from the published objective outline. Each topic is
   [name, pattern]. The pattern is a case-insensitive regular expression
   source; the Exam Blueprint page searches all lesson text with it to show
   which lessons cover the topic and to flag gaps. This is a study aid, not
   CompTIA's document: always compare against the official exam objectives
   PDF for your exam version before you sit the test.

   FLAGSHIP_OBJ maps each domain's flagship lesson (which has no tag) to the
   objective it primarily covers. */

const FLAGSHIP_OBJ = { "d1-flagship": "1.1", "d2-flagship": "2.2", "d3-flagship": "3.2", "d4-flagship": "4.8", "d5-flagship": "5.2" };

const OBJECTIVES = [
  { id: "1.1", domain: "d1", title: "Compare and contrast various types of security controls", topics: [
    ["Technical controls", "technical control"], ["Managerial controls", "managerial"], ["Operational controls", "operational control"],
    ["Physical controls", "physical control"], ["Preventive controls", "preventive"], ["Deterrent controls", "deterrent"],
    ["Detective controls", "detective"], ["Corrective controls", "corrective"], ["Compensating controls", "compensating"], ["Directive controls", "directive"] ] },
  { id: "1.2", domain: "d1", title: "Summarize fundamental security concepts", topics: [
    ["CIA triad", "confidentiality.{0,60}integrity|CIA triad"], ["Non-repudiation", "non-?repudiation"], ["AAA: authentication, authorization, accounting", "authentication, authorization|AAA\\b"],
    ["Authorization models", "authorization model|access control model"], ["Gap analysis", "gap analysis"],
    ["Zero trust: control plane / policy engine / policy administrator", "policy engine|policy administrator"], ["Zero trust: data plane / policy enforcement point", "policy enforcement point|implicit trust"],
    ["Adaptive identity", "adaptive identity|adaptive authentication|risk-based"], ["Threat scope reduction", "threat scope|attack surface"],
    ["Bollards", "bollard"], ["Access control vestibule (mantrap)", "vestibule|mantrap"], ["Fencing", "fenc(e|ing)"], ["Video surveillance", "video surveillance|cctv"],
    ["Security guards", "security guard|guard"], ["Access badges", "badge"], ["Lighting", "lighting"], ["Sensors (infrared, pressure, microwave, ultrasonic)", "infrared|ultrasonic|microwave"],
    ["Honeypot", "honeypot"], ["Honeynet", "honeynet"], ["Honeyfile", "honeyfile"], ["Honeytoken", "honeytoken"] ] },
  { id: "1.3", domain: "d1", title: "Explain the importance of change management and its impact on security", topics: [
    ["Approval process", "approval"], ["Ownership and stakeholders", "stakeholder"], ["Impact analysis", "impact analysis"], ["Test results", "test results|testing"],
    ["Backout plan", "backout|back-out|rollback"], ["Maintenance window", "maintenance window"], ["Standard operating procedure", "standard operating procedure|SOP"],
    ["Allow lists / deny lists", "allow list|deny list|allowlist|blocklist|denylist"], ["Restricted activities", "restricted activit"], ["Downtime and restarts", "downtime|restart"],
    ["Legacy applications", "legacy"], ["Dependencies", "dependenc"], ["Updating diagrams and documentation", "diagram|documentation"], ["Version control", "version control"] ] },
  { id: "1.4", domain: "d1", title: "Explain the importance of using appropriate cryptographic solutions", topics: [
    ["Public and private keys", "public key|private key"], ["Key escrow", "key escrow"], ["Full-disk / file / database encryption", "full-disk|full disk|database encryption|file-level|volume encryption"],
    ["Encryption in transit (TLS)", "TLS|in transit"], ["Symmetric encryption", "symmetric"], ["Asymmetric encryption", "asymmetric"], ["Key exchange", "key exchange|diffie"],
    ["Algorithms and key length", "key length|key size|AES|RSA"], ["TPM", "\\bTPM\\b"], ["HSM", "\\bHSM\\b"], ["Key management system", "key management"], ["Secure enclave", "secure enclave"],
    ["Steganography", "steganograph"], ["Tokenization", "tokeniz"], ["Data masking", "masking"], ["Hashing", "hash"], ["Salting", "salt"], ["Digital signatures", "digital signature"],
    ["Key stretching", "key stretching|pbkdf2|bcrypt"], ["Blockchain / open public ledger", "blockchain|ledger"], ["Certificate authorities", "certificate authorit"], ["CRL", "\\bCRL\\b|revocation list"],
    ["OCSP", "OCSP"], ["Self-signed certificates", "self-signed"], ["Root of trust", "root of trust|root CA"], ["CSR generation", "\\bCSR\\b|signing request"], ["Wildcard certificates", "wildcard"] ] },

  { id: "2.1", domain: "d2", title: "Compare and contrast common threat actors and motivations", topics: [
    ["Nation-state", "nation-state|nation state"], ["Unskilled attacker", "unskilled|script kiddie"], ["Hacktivist", "hacktivist"], ["Insider threat", "insider threat"],
    ["Organized crime", "organized crime"], ["Shadow IT", "shadow it"], ["Internal vs external actors", "internal.{0,40}external"], ["Resources and funding", "resources.{0,30}funding|funding"],
    ["Level of sophistication", "sophistication"], ["Data exfiltration motive", "exfiltration"], ["Espionage", "espionage"], ["Service disruption", "service disruption|disruption"],
    ["Blackmail", "blackmail|extortion"], ["Financial gain", "financial gain"], ["Philosophical / political beliefs", "political|philosophical|ideolog"], ["Ethical (authorized hacker)", "ethical hack|white hat|white-hat"],
    ["Revenge", "revenge|disgruntled"], ["Chaos / disruption", "chaos"], ["War / cyberwarfare", "\\bwar\\b|warfare"] ] },
  { id: "2.2", domain: "d2", title: "Explain common threat vectors and attack surfaces", topics: [
    ["Message-based vectors (email, SMS, IM)", "email.{0,80}SMS|instant messag|message-based"], ["Image-based vectors", "image-based|malicious image|QR code"], ["File-based vectors", "file-based|malicious file|attachment"],
    ["Voice call vectors", "vishing|voice call"], ["Removable devices", "removable"], ["Vulnerable software (client-based vs agentless)", "agentless"], ["Unsupported systems and applications", "unsupported|end of support"],
    ["Unsecure networks (wireless, wired, Bluetooth)", "bluetooth|unsecure network|open wi-fi"], ["Open service ports", "open port|open service|service port"], ["Default credentials", "default credential|default password"],
    ["Supply chain: MSPs, vendors, suppliers", "managed service provider|\\bMSP\\b|supplier"], ["Phishing", "phishing"], ["Vishing", "vishing"], ["Smishing", "smishing"],
    ["Misinformation / disinformation", "misinformation|disinformation"], ["Impersonation", "impersonation"], ["Business email compromise", "business email compromise|\\bBEC\\b"], ["Pretexting", "pretext"],
    ["Watering hole", "watering hole"], ["Brand impersonation", "brand impersonation"], ["Typosquatting", "typosquat"] ] },
  { id: "2.3", domain: "d2", title: "Explain various types of vulnerabilities", topics: [
    ["Memory injection", "memory injection|dll injection|process injection|code injection"], ["Buffer overflow", "buffer overflow"], ["Race conditions (TOC/TOU)", "race condition|time-of-check|TOCTOU"],
    ["Malicious update", "malicious update|poisoned update|update channel"], ["Operating system vulnerabilities", "operating system vulnerab|OS vulnerab|unpatched operating"], ["SQL injection", "sql injection"],
    ["Cross-site scripting", "cross-site scripting|\\bXSS\\b"], ["Firmware vulnerabilities", "firmware"], ["End-of-life hardware/software", "end of life|end-of-life|\\bEOL\\b"], ["Legacy systems", "legacy"],
    ["VM escape", "vm escape"], ["Resource reuse", "resource reuse"], ["Cloud-specific vulnerabilities", "storage bucket|cloud vulnerab|misconfigured storage"], ["Supply chain: service/hardware/software provider", "supply chain"],
    ["Cryptographic vulnerabilities", "weak cipher|cryptographic vulnerab|outdated protocol|weak key"], ["Misconfiguration", "misconfigur"], ["Side loading", "side-?load"], ["Jailbreaking / rooting", "jailbreak|rooting"], ["Zero-day", "zero-day|zero day"] ] },
  { id: "2.4", domain: "d2", title: "Given a scenario, analyze indicators of malicious activity", topics: [
    ["Ransomware", "ransomware"], ["Trojan", "trojan"], ["Worm", "\\bworm"], ["Spyware", "spyware"], ["Bloatware", "bloatware|potentially unwanted"], ["Virus", "\\bvirus"], ["Keylogger", "keylogger"],
    ["Logic bomb", "logic bomb"], ["Rootkit", "rootkit"], ["Physical brute force", "physical attack|brute force"], ["RFID cloning", "rfid"], ["Environmental attacks", "environmental"],
    ["Amplified DDoS", "amplif"], ["Reflected DDoS", "reflect"], ["DNS attacks", "dns poisoning|dns hijack|dns tunnel|domain hijack"], ["Wireless attacks", "evil twin|deauth|rogue access"],
    ["On-path attack", "on-path|man-in-the-middle|mitm"], ["Credential replay", "replay"], ["Malicious code", "malicious code|malware"], ["Injection attacks", "injection"], ["Privilege escalation", "privilege escalation"],
    ["Forgery (CSRF/SSRF)", "forgery|csrf|ssrf"], ["Directory traversal", "directory traversal|path traversal"], ["Downgrade attack", "downgrade"], ["Collision attack", "collision"], ["Birthday attack", "birthday"],
    ["Password spraying", "spraying"], ["Password brute force", "brute force|brute-force"], ["Account lockout indicator", "lockout"], ["Concurrent session usage", "concurrent session"], ["Blocked content", "blocked content"],
    ["Impossible travel", "impossible travel"], ["Resource consumption", "resource consumption|high cpu"], ["Resource inaccessibility", "inaccessib|unavailable"], ["Out-of-cycle logging", "out-of-cycle|out of cycle"],
    ["Published/documented attacks", "published|documented attack"], ["Missing logs", "missing logs|cleared|log cleared|1102"] ] },
  { id: "2.5", domain: "d2", title: "Explain the purpose of mitigation techniques used to secure the enterprise", topics: [
    ["Segmentation", "segmentation"], ["Access control lists and permissions", "access control list|\\bACL"], ["Application allow list", "allow list|allowlist"], ["Isolation", "isolat"], ["Patching", "patch"],
    ["Encryption", "encrypt"], ["Monitoring", "monitor"], ["Least privilege", "least privilege"], ["Configuration enforcement", "configuration enforcement|configuration management|baseline"], ["Decommissioning", "decommission"],
    ["Endpoint protection", "endpoint protection|endpoint detection|antivirus"], ["Host-based firewall", "host-based firewall|host firewall"], ["HIPS", "\\bHIPS\\b|host-based intrusion"],
    ["Disabling ports and protocols", "disabl.{0,30}(port|protocol|service)"], ["Changing default passwords", "default password|default credential"], ["Removing unnecessary software", "unnecessary software|unneeded software|least functionality"] ] },

  { id: "3.1", domain: "d3", title: "Compare and contrast security implications of different architecture models", topics: [
    ["Cloud responsibility matrix", "shared responsibility|responsibility matrix"], ["Hybrid cloud", "hybrid"], ["Third-party vendors in architecture", "third-party"], ["Infrastructure as code", "infrastructure as code|\\bIaC\\b"],
    ["Serverless", "serverless"], ["Microservices", "microservice"], ["Air-gapped networks", "air gap|air-gap"], ["Logical segmentation", "logical segmentation|vlan"], ["Software-defined networking", "software-defined network|\\bSDN\\b"],
    ["On-premises", "on-premises|on-prem"], ["Centralized vs decentralized", "centralized|decentralized"], ["Containerization", "container"], ["Virtualization", "virtualization|hypervisor"], ["IoT", "\\bIoT\\b|internet of things"],
    ["ICS / SCADA", "\\bICS\\b|SCADA"], ["Real-time operating systems", "RTOS|real-time operating"], ["Embedded systems", "embedded"], ["High availability", "high availability"],
    ["Cost, scalability, responsiveness trade-offs", "scalab|responsiveness|ease of deployment"], ["Risk transference", "risk transfer|transference|cyber insurance"], ["Inability to patch / patch availability", "inability to patch|cannot be patched|patch availability|cannot patch"],
    ["Power and compute considerations", "\\bUPS\\b|generator|compute"] ] },
  { id: "3.2", domain: "d3", title: "Given a scenario, apply security principles to secure enterprise infrastructure", topics: [
    ["Device placement", "device placement|placement"], ["Security zones", "security zone|screened subnet|\\bDMZ\\b"], ["Attack surface", "attack surface"], ["Fail-open / fail-closed", "fail-open|fail-closed|fail open|fail closed"],
    ["Active vs passive devices", "passive"], ["Inline vs tap / monitor", "inline|\\btap\\b|span port"], ["Jump server", "jump server|bastion"], ["Proxy server", "proxy"], ["IDS / IPS", "\\bIPS\\b|\\bIDS\\b"],
    ["Load balancer", "load balanc"], ["Sensors", "sensor"], ["Port security (802.1X)", "802\\.1x"], ["EAP", "\\bEAP"], ["Web application firewall", "web application firewall|\\bWAF\\b"], ["UTM", "\\bUTM\\b|unified threat"],
    ["Next-generation firewall", "next-generation firewall|\\bNGFW\\b"], ["Layer 4 vs Layer 7 firewalls", "layer 4|layer 7"], ["VPN", "\\bVPN\\b"], ["Remote access", "remote access"], ["Tunneling (TLS, IPsec)", "ipsec|tunnel"],
    ["SD-WAN", "SD-WAN"], ["SASE", "\\bSASE\\b"] ] },
  { id: "3.3", domain: "d3", title: "Compare and contrast concepts and strategies to protect data", topics: [
    ["Regulated data", "regulated data|regulated"], ["Trade secrets", "trade secret"], ["Intellectual property", "intellectual property"], ["Legal information", "legal information|legal data"], ["Financial information", "financial information|financial data"],
    ["Human- vs non-human-readable data", "human-readable|non-human"], ["Data classification levels", "confidential.{0,80}public|classification"], ["Data states (at rest, in transit, in use)", "at rest.{0,80}in transit|data states"],
    ["Data sovereignty", "sovereignty"], ["Geolocation", "geolocation|geographic"], ["Geographic restrictions", "geographic restriction|geofenc"], ["Encryption of data", "encrypt"], ["Hashing of data", "hash"],
    ["Masking", "masking"], ["Tokenization", "tokeniz"], ["Obfuscation", "obfuscat"], ["Segmentation of data", "segmentation"], ["Permission restrictions", "permission"] ] },
  { id: "3.4", domain: "d3", title: "Explain the importance of resilience and recovery in security architecture", topics: [
    ["Load balancing vs clustering", "clustering|load balanc"], ["Hot / warm / cold sites", "hot site|warm site|cold site"], ["Geographic dispersion", "geographic dispersion|geographically"], ["Platform diversity", "platform diversity|diversity"],
    ["Multi-cloud", "multi-cloud|multicloud"], ["Continuity of operations", "continuity of operations|\\bCOOP\\b"], ["Capacity planning", "capacity planning"], ["Tabletop exercises", "tabletop"], ["Failover testing", "failover|fail over"],
    ["Simulation testing", "simulation"], ["Parallel processing testing", "parallel processing"], ["Onsite / offsite backups", "offsite|off-site"], ["Backup frequency", "frequency|incremental|differential"], ["Backup encryption", "backup.{0,60}encrypt|encrypt.{0,60}backup"],
    ["Snapshots", "snapshot"], ["Recovery", "restore|recovery"], ["Replication", "replication"], ["Journaling", "journaling"], ["Generators", "generator"], ["UPS", "\\bUPS\\b|uninterruptible"] ] },

  { id: "4.1", domain: "d4", title: "Given a scenario, apply common security techniques to computing resources", topics: [
    ["Secure baselines", "secure baseline|baseline"], ["Hardening: mobile devices", "mobile device"], ["Hardening: workstations and servers", "workstation|server"], ["Hardening: switches and routers", "switch|router"],
    ["Hardening: cloud infrastructure", "cloud infrastructure|cloud"], ["Hardening: ICS/SCADA, embedded, RTOS, IoT", "SCADA|embedded|RTOS|IoT"], ["Wireless site surveys", "site survey"], ["Heat maps", "heat map"], ["MDM", "\\bMDM\\b|mobile device management"],
    ["BYOD", "\\bBYOD\\b"], ["COPE", "\\bCOPE\\b"], ["CYOD", "\\bCYOD\\b"], ["Connection methods (cellular, Wi-Fi, Bluetooth)", "cellular"], ["WPA3", "WPA3"], ["RADIUS / AAA for wireless", "radius"],
    ["Wireless cryptographic and authentication protocols", "EAP-TLS|PEAP|\\bCCMP"], ["Input validation", "input validation"], ["Secure cookies", "secure cookie|httponly|samesite"], ["Static code analysis", "static code|static analysis|\\bSAST\\b"],
    ["Code signing", "code signing"], ["Sandboxing", "sandbox"], ["Application monitoring", "monitor"] ] },
  { id: "4.2", domain: "d4", title: "Explain the security implications of proper hardware, software, and data asset management", topics: [
    ["Acquisition / procurement", "procurement|acquisition"], ["Ownership and accounting", "asset owner|ownership"], ["Asset classification", "classification"], ["Inventory", "inventory"], ["Enumeration", "enumerat"],
    ["Sanitization", "sanitiz"], ["Destruction", "destruction|destroy|shred"], ["Disposal certification", "certificate of destruction|certification of|certif.{0,30}destruction"], ["Data retention", "retention"] ] },
  { id: "4.3", domain: "d4", title: "Explain various activities associated with vulnerability management", topics: [
    ["Vulnerability scanning", "vulnerability scan"], ["Static analysis", "static analysis|\\bSAST\\b"], ["Dynamic analysis", "dynamic analysis|\\bDAST\\b"], ["Package monitoring", "package monitoring|dependency|\\bSCA\\b|software composition"],
    ["OSINT threat feeds", "OSINT"], ["Proprietary / third-party feeds", "proprietary|commercial feed|third-party feed"], ["Information-sharing organizations", "ISAC|information sharing"], ["Dark web", "dark web"], ["Penetration testing", "penetration test"],
    ["Responsible disclosure", "responsible disclosure|coordinated disclosure"], ["Bug bounty", "bug bounty"], ["System / process audit", "audit"], ["False positives", "false positive"], ["False negatives", "false negative"],
    ["CVSS", "CVSS"], ["CVE", "\\bCVE\\b"], ["Vulnerability classification", "classification|severity"], ["Exposure factor", "exposure factor"], ["Environmental variables", "environmental"], ["Industry / organizational impact", "organizational impact|industry impact|business impact"],
    ["Risk tolerance", "risk tolerance"], ["Remediation: patching", "patch"], ["Remediation: insurance", "insurance"], ["Remediation: segmentation / compensating controls", "compensating control"], ["Exceptions and exemptions", "exception|exemption"],
    ["Rescanning / validation", "rescan|validation|verification"], ["Vulnerability reporting", "report"] ] },
  { id: "4.4", domain: "d4", title: "Explain security alerting and monitoring concepts and tools", topics: [
    ["Monitoring systems, applications, infrastructure", "monitoring"], ["Log aggregation", "aggregat"], ["Alerting", "alert"], ["Scanning", "scan"], ["Reporting", "report"], ["Archiving", "archiv"], ["Quarantine", "quarantine"],
    ["Alert tuning", "alert tuning|tuning|false positive"], ["SCAP", "\\bSCAP\\b"], ["Benchmarks", "benchmark"], ["Agents vs agentless", "agent"], ["SIEM", "\\bSIEM\\b"], ["Antivirus", "antivirus"], ["DLP", "\\bDLP\\b|data loss prevention"],
    ["SNMP traps", "snmp"], ["NetFlow", "netflow|ipfix"], ["Vulnerability scanners", "vulnerability scanner"] ] },
  { id: "4.5", domain: "d4", title: "Given a scenario, modify enterprise capabilities to enhance security", topics: [
    ["Firewall rules and access lists", "firewall rule|access list|\\bACL"], ["Screened subnets", "screened subnet|\\bDMZ\\b"], ["IDS / IPS signatures and trends", "signature"], ["Web filter: agent-based vs centralized proxy", "web filter|url filter"],
    ["URL scanning / content categorization / reputation", "content categor|reputation|category"], ["Group Policy", "group policy"], ["SELinux", "selinux"], ["Secure protocol selection (protocol, port, transport)", "secure protocol|protocol selection"],
    ["DNS filtering", "dns filter"], ["DMARC", "DMARC"], ["DKIM", "DKIM"], ["SPF", "\\bSPF\\b"], ["Email gateway", "email gateway|secure email gateway|mail gateway"], ["File integrity monitoring", "file integrity|\\bFIM\\b"],
    ["DLP", "\\bDLP\\b|data loss prevention"], ["NAC", "\\bNAC\\b|network access control"], ["EDR / XDR", "\\bEDR\\b|\\bXDR\\b"], ["User behavior analytics", "user behavior|\\bUEBA\\b|\\bUBA\\b"] ] },
  { id: "4.6", domain: "d4", title: "Given a scenario, implement and maintain identity and access management", topics: [
    ["Provisioning / de-provisioning", "provisioning"], ["Permission assignments", "permission"], ["Identity proofing", "identity proofing"], ["Federation", "federation"], ["SSO", "single sign-on|\\bSSO\\b"],
    ["LDAP", "\\bLDAP\\b"], ["OAuth", "oauth"], ["SAML", "\\bSAML\\b"], ["Interoperability", "interoperab"], ["Attestation", "attestation"], ["MAC", "mandatory access"], ["DAC", "discretionary access"],
    ["RBAC", "role-based"], ["Rule-based access control", "rule-based"], ["ABAC", "attribute-based"], ["Time-of-day restrictions", "time-of-day|time of day"], ["Least privilege", "least privilege"],
    ["MFA: biometrics", "biometric"], ["MFA: tokens (hard / soft)", "hardware token|soft token|authenticator app|\\bTOTP\\b|token"], ["MFA: security keys", "security key|fido"], ["Authentication factors (know, have, are, where)", "something you know|something you have|somewhere you are"],
    ["Password best practices", "password length|complexity|password reuse|expiration|password age"], ["Password managers", "password manager"], ["Passwordless", "passwordless|passkey"], ["Privileged access management", "privileged access|\\bPAM\\b"],
    ["Just-in-time permissions", "just-in-time|\\bJIT\\b"], ["Password vaulting", "vault"], ["Temporal accounts", "temporal account|temporary account"], ["Ephemeral credentials", "ephemeral"] ] },
  { id: "4.7", domain: "d4", title: "Explain the importance of automation and orchestration related to secure operations", topics: [
    ["User provisioning automation", "provisioning"], ["Resource provisioning", "resource provisioning|infrastructure as code"], ["Guard rails", "guard ?rail"], ["Security groups", "security group"], ["Ticket creation and escalation", "ticket|escalat"],
    ["Enabling/disabling services and access", "disabl.{0,30}account|enabl.{0,30}service"], ["Continuous integration and testing", "continuous integration|CI/CD"], ["Integrations and APIs", "\\bAPI"], ["Benefit: efficiency / workforce multiplier", "workforce multiplier|efficiency"],
    ["Benefit: enforcing baselines", "baseline"], ["Benefit: scaling securely", "scal"], ["Benefit: reaction time", "reaction time|response time|speed"], ["Consideration: complexity", "complexity"], ["Consideration: cost", "cost"],
    ["Consideration: single point of failure", "single point of failure"], ["Consideration: technical debt", "technical debt"], ["Consideration: ongoing supportability", "supportab"] ] },
  { id: "4.8", domain: "d4", title: "Explain appropriate incident response activities", topics: [
    ["Preparation", "preparation"], ["Detection", "detection"], ["Analysis", "analysis"], ["Containment", "containment"], ["Eradication", "eradication"], ["Recovery", "recovery"], ["Lessons learned", "lessons learned"],
    ["IR training", "training"], ["Tabletop exercise", "tabletop"], ["Simulation", "simulation"], ["Root cause analysis", "root cause"], ["Threat hunting", "threat hunting"], ["Legal hold", "legal hold"],
    ["Chain of custody", "chain of custody"], ["Evidence acquisition", "acquisition|forensic image|imaging"], ["Forensic reporting", "forensic report|reporting"], ["Evidence preservation", "preserv"], ["E-discovery", "e-discovery|ediscovery"] ] },
  { id: "4.9", domain: "d4", title: "Given a scenario, use data sources to support an investigation", topics: [
    ["Firewall logs", "firewall log"], ["Application logs", "application log"], ["Endpoint logs", "endpoint log|endpoint telemetry"], ["OS-specific security logs", "windows event|event id|auth\\.log|security log"], ["IPS / IDS logs", "ips.{0,20}log|ids.{0,20}log|intrusion.{0,30}log"],
    ["Network logs", "network log|flow data|netflow"], ["Metadata", "metadata"], ["Vulnerability scan data", "vulnerability scan"], ["Automated reports", "automated report"], ["Dashboards", "dashboard"], ["Packet captures", "packet capture|pcap|wireshark|tcpdump"] ] },

  { id: "5.1", domain: "d5", title: "Summarize elements of effective security governance", topics: [
    ["Guidelines", "guideline"], ["Acceptable use policy", "acceptable use"], ["Information security policies", "information security polic"], ["Business continuity policy", "business continuity"], ["Disaster recovery policy", "disaster recovery"],
    ["Incident response policy", "incident response polic|incident response plan"], ["SDLC policy", "\\bSDLC\\b|software development"], ["Change management policy", "change management"], ["Password standards", "password standard|password polic"],
    ["Access control standards", "access control standard"], ["Physical security standards", "physical security standard|physical security polic"], ["Encryption standards", "encryption standard"], ["Onboarding / offboarding procedures", "onboarding|offboarding"],
    ["Playbooks", "playbook"], ["External considerations: regulatory / legal / industry", "regulatory|legal|industry"], ["Local / regional / national / global", "local.{0,30}national|regional|global"], ["Monitoring and revision", "monitoring and revision|review.{0,40}polic|revis"],
    ["Governance structures: boards and committees", "board|committee"], ["Centralized / decentralized governance", "centralized|decentralized"], ["Data owners", "data owner"], ["Data controllers and processors", "controller|processor"], ["Custodians / stewards", "custodian|steward"] ] },
  { id: "5.2", domain: "d5", title: "Explain elements of the risk management process", topics: [
    ["Risk identification", "risk identification|identify.{0,20}risk"], ["Ad hoc / recurring / one-time / continuous assessment", "ad hoc|recurring|continuous"], ["Qualitative analysis", "qualitative"], ["Quantitative analysis", "quantitative"],
    ["SLE", "\\bSLE\\b"], ["ALE", "\\bALE\\b"], ["ARO", "\\bARO\\b"], ["Probability / likelihood", "likelihood|probability"], ["Exposure factor", "exposure factor"], ["Impact", "impact"], ["Risk register", "risk register"],
    ["Key risk indicators", "key risk indicator|\\bKRI"], ["Risk owners", "risk owner"], ["Risk threshold", "risk threshold|threshold"], ["Risk tolerance", "risk tolerance"], ["Risk appetite (expansionary / conservative / neutral)", "expansionary|conservative"],
    ["Risk transfer", "transfer"], ["Risk acceptance (exemption / exception)", "accept"], ["Risk avoidance", "avoid"], ["Risk mitigation", "mitigat"], ["Risk reporting", "risk report"], ["Business impact analysis", "business impact analysis|\\bBIA\\b"],
    ["RTO", "\\bRTO\\b"], ["RPO", "\\bRPO\\b"], ["MTTR", "\\bMTTR\\b"], ["MTBF", "\\bMTBF\\b"] ] },
  { id: "5.3", domain: "d5", title: "Explain the processes associated with third-party risk assessment and management", topics: [
    ["Vendor penetration testing", "penetration test"], ["Right-to-audit clause", "right to audit|right-to-audit"], ["Evidence of internal audits", "internal audit"], ["Independent assessments", "independent assessment|third-party assessment"],
    ["Supply chain analysis", "supply chain"], ["Due diligence", "due diligence"], ["Conflict of interest", "conflict of interest"], ["SLA", "\\bSLA\\b"], ["MOA", "\\bMOA\\b"], ["MOU", "\\bMOU\\b"], ["MSA", "\\bMSA\\b"],
    ["Work order / SOW", "statement of work|\\bSOW\\b|work order"], ["NDA", "\\bNDA\\b"], ["BPA", "\\bBPA\\b"], ["Vendor monitoring", "vendor monitoring|monitor.{0,30}vendor"], ["Questionnaires", "questionnaire"], ["Rules of engagement", "rules of engagement"] ] },
  { id: "5.4", domain: "d5", title: "Summarize elements of effective security compliance", topics: [
    ["Compliance reporting (internal / external)", "compliance report"], ["Fines", "fines"], ["Sanctions", "sanction"], ["Reputational damage", "reputation"], ["Loss of license", "loss of license|license"], ["Contractual impacts", "contractual"],
    ["Due diligence / due care", "due care|due diligence"], ["Attestation and acknowledgement", "attestation|acknowledg"], ["Compliance automation", "automat"], ["Legal implications (local / national / global)", "legal implication|national.{0,40}global|jurisdiction"],
    ["Data subject", "data subject"], ["Controller vs processor", "controller.{0,60}processor"], ["Data ownership", "data owner"], ["Data inventory and retention", "data inventory|retention"], ["Right to be forgotten", "right to be forgotten|erasure"] ] },
  { id: "5.5", domain: "d5", title: "Explain types and purposes of audits and assessments", topics: [
    ["Attestation", "attestation"], ["Internal compliance audits", "internal audit|compliance audit"], ["Audit committee", "audit committee"], ["Self-assessments", "self-assessment|self assessment"], ["Regulatory examinations", "regulatory|examination"],
    ["Independent third-party audit", "third-party audit|independent audit|independent third"], ["Physical penetration testing", "physical penetration|physical test"], ["Offensive (red team)", "offensive|red team"], ["Defensive (blue team)", "defensive|blue team"],
    ["Integrated (purple team)", "integrated|purple team"], ["Known environment (white box)", "known environment|white box|white-box"], ["Partially known (gray box)", "partially known|gray box|grey box"], ["Unknown environment (black box)", "unknown environment|black box|black-box"],
    ["Passive reconnaissance", "passive recon"], ["Active reconnaissance", "active recon"] ] },
  { id: "5.6", domain: "d5", title: "Given a scenario, implement security awareness practices", topics: [
    ["Phishing campaigns / simulations", "phishing simulation|phishing campaign|simulated phishing"], ["Recognizing a phishing attempt", "recogniz.{0,30}phish|phish.{0,40}indicator|suspicious"], ["Responding to reported messages", "reported|report.{0,20}phish"],
    ["Anomalous behavior: risky", "risky"], ["Anomalous behavior: unexpected", "unexpected"], ["Anomalous behavior: unintentional", "unintentional"], ["Policy / handbooks", "handbook|policy"], ["Situational awareness", "situational awareness"],
    ["Insider threat training", "insider threat"], ["Password management training", "password management|password manager"], ["Removable media and cables", "removable media|cable|usb"], ["Social engineering training", "social engineering"],
    ["Operational security", "operational security|opsec"], ["Hybrid / remote work security", "remote work|hybrid work|work from home"], ["Reporting and monitoring (initial / recurring)", "recurring|initial training"],
    ["Training development and execution", "development.{0,40}execution|training program"], ["Measuring effectiveness", "effectiveness|metrics"] ] }
];
