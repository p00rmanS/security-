/* Round 6: five more lessons on topics that were only touched on elsewhere:
   TLS and HTTPS, Active Directory and Group Policy, password cracking,
   wireless attacks, and how a SOC is organised. Ids use the t19x range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d3: [
      {
        id: "d3-t190",
        title: "TLS and HTTPS Under the Hood: Handshake, Cipher Suites, and Certificate Checks",
        tag: "3.2",
        minutes: 20,
        goal: "Explain how a TLS connection is set up, what protects it, and which misconfigurations the exam expects you to spot.",
        why: "Almost everything you do online rides on TLS. Exam questions ask which protocol versions are safe, what a certificate error means, and how keys are exchanged.",
        simple:
          "TLS (Transport Layer Security) gives a connection three things: confidentiality (encryption), integrity (tamper detection), and authentication (the server proves who it is with a certificate). HTTPS is simply HTTP carried inside TLS on port 443. The connection starts with a HANDSHAKE. The client says which TLS versions and CIPHER SUITES it supports. The server picks one and sends its CERTIFICATE. The client checks that the certificate is signed by a trusted CA, has not expired or been revoked, and matches the site name. Then both sides use key exchange (ephemeral Diffie-Hellman, which gives FORWARD SECRECY) to agree on a shared session key. From then on the bulk data is encrypted with fast SYMMETRIC encryption, because asymmetric is too slow for large data. Use TLS 1.2 or 1.3; SSL and TLS 1.0/1.1 are deprecated.",
        deepDive: [
          { h: "Handshake in plain steps", list: [
            "Client hello: supported versions, cipher suites, random value.",
            "Server hello: chosen version and suite, random value, and its certificate.",
            "Client validates the certificate chain, expiry, revocation status, and name match.",
            "Key exchange creates a shared secret; both derive the same session keys.",
            "Both send finished messages; encrypted application data begins.",
            "TLS 1.3 shortens this and removes weak options entirely."
          ] },
          { h: "What a cipher suite names", list: [
            "Key exchange (for example ECDHE) for forward secrecy.",
            "Authentication (RSA or ECDSA) used with the certificate.",
            "Bulk encryption (AES-GCM or ChaCha20).",
            "Integrity or hash (SHA-256 or SHA-384).",
            "Weak suites to disable: NULL, EXPORT, RC4, 3DES, MD5."
          ] },
          { h: "Certificate errors and what they mean", list: [
            "Expired: the validity period ended; renew and automate renewal.",
            "Name mismatch: the certificate was issued for a different hostname (check SAN entries).",
            "Untrusted issuer: self-signed or unknown CA; the chain does not reach a trusted root.",
            "Revoked: the CA withdrew it (checked with CRL or OCSP; OCSP stapling lets the server supply the answer).",
            "Never train users to click through certificate warnings."
          ] },
          { h: "Hardening and attacks", list: [
            "Disable SSL, TLS 1.0 and 1.1; prefer TLS 1.2 and 1.3.",
            "HSTS tells browsers to use HTTPS only, defeating SSL stripping.",
            "Certificate pinning ties a client to an expected certificate or key.",
            "Downgrade attacks try to force a weaker version; disabling old versions stops them.",
            "TLS inspection by a proxy decrypts traffic and needs a trusted internal CA; protect privacy-sensitive categories."
          ] }
        ],
        keyTerms: [
          { term: "TLS", def: "Protocol that encrypts, authenticates, and protects the integrity of network connections." },
          { term: "Cipher suite", def: "The set of algorithms used for key exchange, authentication, encryption, and integrity in a TLS session." },
          { term: "Forward secrecy", def: "Session keys are not derived from the server's long-term key, so a later key theft cannot decrypt old traffic." },
          { term: "HSTS", def: "HTTP Strict Transport Security: tells browsers to only connect over HTTPS." },
          { term: "OCSP stapling", def: "The server attaches a signed, recent revocation status to the handshake." },
          { term: "SAN", def: "Subject Alternative Name: the list of hostnames a certificate is valid for." }
        ],
        analogy:
          "TLS is like meeting a courier. You check their ID badge against the company's registry (certificate and CA), agree on a secret code word using a method nobody overhearing can copy (key exchange), and then speak in that code for the rest of the delivery (symmetric encryption).",
        technical:
          "A browser connects to https://shop.example.test. The server offers a certificate for shop.example.test signed by a public CA. The browser verifies the chain and the name, negotiates TLS 1.3 with an ECDHE exchange, and encrypts all traffic with AES-GCM. If the admin had left TLS 1.0 enabled, an attacker could attempt a downgrade, which is why old versions are turned off.",
        table: {
          headers: ["Item", "Purpose", "Remember"],
          rows: [
            ["Certificate", "Proves server identity", "Check chain, dates, name, revocation"],
            ["Asymmetric key exchange", "Agree on session key", "ECDHE gives forward secrecy"],
            ["Symmetric cipher", "Encrypts the data", "AES-GCM or ChaCha20, fast"],
            ["HSTS", "Force HTTPS", "Stops SSL stripping"],
            ["TLS 1.0/1.1, SSL", "Legacy", "Disable"]
          ]
        },
        confusion: [
          { a: "SSL", b: "TLS", diff: "TLS is the modern successor to SSL. People still say SSL, but only TLS 1.2 and 1.3 should be in use." },
          { a: "HTTPS", b: "TLS", diff: "HTTPS is HTTP inside a TLS connection. TLS is the protection layer and is used by many other protocols too." },
          { a: "CRL", b: "OCSP", diff: "A CRL is a downloaded list of revoked certificates. OCSP asks the status of one certificate; stapling delivers that answer with the handshake." },
          { a: "Asymmetric", b: "Symmetric", diff: "Asymmetric cryptography authenticates and exchanges keys; symmetric cryptography encrypts the actual data quickly." }
        ],
        soc: "Watch for expiring certificates, connections using old TLS versions, certificate name mismatches, self-signed certificates on public services, and unexpected TLS to unusual destinations. Certificate transparency logs can reveal lookalike certificates for your domain.",
        patterns: [
          ["Browser warns the certificate was issued for a different name", "Name mismatch (check SAN)"],
          ["Old traffic must stay unreadable even if the server key is stolen later", "Forward secrecy (ephemeral key exchange)"],
          ["Force browsers to use HTTPS and stop SSL stripping", "HSTS"],
          ["Server supplies a fresh revocation answer during the handshake", "OCSP stapling"],
          ["Bulk data in a TLS session is protected by", "Symmetric encryption"],
          ["Which versions should be disabled", "SSL, TLS 1.0 and 1.1"]
        ],
        takeaways: [
          "Asymmetric proves identity and agrees on keys; symmetric protects the data.",
          "Use TLS 1.2 or 1.3 with strong suites and forward secrecy.",
          "A certificate warning always has a cause; find it instead of clicking through."
        ],
        remember: [
          "HTTPS = HTTP over TLS, port 443.",
          "Handshake: hello, certificate, validate, key exchange, encrypted data.",
          "Validate: trusted chain, not expired, not revoked, name matches.",
          "Forward secrecy comes from ephemeral (ECDHE) key exchange.",
          "Disable SSL, TLS 1.0 and 1.1; avoid RC4, 3DES, NULL, EXPORT.",
          "HSTS defeats SSL stripping; pinning ties a client to a known certificate or key."
        ],
        taglish:
          "Ang TLS ang nagbibigay ng encryption, integrity, at authentication sa koneksyon. Ang HTTPS ay HTTP na nasa loob ng TLS, port 443. Sa handshake, nagkakasundo ang client at server sa version at cipher suite, ipinapadala ng server ang certificate, sinusuri ito ng client (trusted CA, hindi expired, hindi revoked, tama ang pangalan), tapos gumagawa sila ng shared key. Ang asymmetric ay para sa identity at key exchange; ang symmetric ang nag-eencrypt ng aktwal na data dahil mas mabilis. Gamitin lang ang TLS 1.2 o 1.3."
      }
    ],
    d4: [
      {
        id: "d4-t190",
        title: "Active Directory, Group Policy, and LDAP: How Enterprises Manage Identities",
        tag: "4.6",
        minutes: 20,
        goal: "Understand how a directory service centralises identities and policy, and which weaknesses attackers target.",
        why: "Most corporate networks run on Active Directory. The exam expects you to know what a domain controller does, how Group Policy hardens machines, and why directory protocols must be protected.",
        simple:
          "A DIRECTORY SERVICE stores users, groups, computers, and permissions in one place. Microsoft's is ACTIVE DIRECTORY (AD). A DOMAIN CONTROLLER (DC) holds the AD database and authenticates logons, normally with KERBEROS. Objects are arranged in ORGANIZATIONAL UNITS (OUs), which let administrators apply settings to a group of users or computers. GROUP POLICY OBJECTS (GPOs) are bundles of settings applied to OUs: password rules, account lockout, disabling USB storage, enforcing screen locks, restricting software. LDAP is the protocol used to query a directory; plain LDAP on port 389 is cleartext, so use LDAPS (636) or LDAP with StartTLS. Because AD controls everything, protecting it is critical: limit domain admins, use separate admin accounts, tier administration, patch DCs, and monitor changes.",
        deepDive: [
          { h: "Key building blocks", list: [
            "Domain: a security boundary with a shared directory and policies.",
            "Domain controller: authenticates users and holds the directory; keep at least two for redundancy.",
            "OU: container used to organise objects and delegate administration.",
            "Group: collection of users or computers; assign permissions to groups, not individuals (role-based).",
            "GPO: policy applied to a site, domain, or OU; central configuration enforcement."
          ] },
          { h: "Useful Group Policy hardening settings", list: [
            "Password length, history, and lockout threshold.",
            "Disable USB mass storage and autorun.",
            "Enforce screen lock after inactivity.",
            "Application allow lists (such as AppLocker).",
            "Restrict local administrator rights; enable the host firewall; configure audit logging."
          ] },
          { h: "Common AD attacks and defenses", list: [
            "Pass-the-hash and pass-the-ticket reuse stolen credentials; limit admin logons to workstations and use credential guard.",
            "Kerberoasting requests service tickets to crack offline; use long random service account passwords.",
            "Golden ticket forges tickets using the krbtgt secret; rotate it after compromise.",
            "Privilege escalation through over-permissioned groups; review membership regularly.",
            "Weak LDAP: require signing and TLS; block anonymous binds."
          ] },
          { h: "Monitoring", list: [
            "Windows event 4624 (successful logon) and 4625 (failed logon).",
            "4720 (account created), 4728 and 4732 (member added to a security group).",
            "4740 (account locked out).",
            "Alert on changes to privileged groups and on new GPOs."
          ] }
        ],
        keyTerms: [
          { term: "Active Directory", def: "Microsoft's directory service that stores identities and policy for a Windows domain." },
          { term: "Domain controller", def: "Server that authenticates users and hosts the directory database." },
          { term: "OU", def: "Organizational unit: container used to group objects and apply policy." },
          { term: "GPO", def: "Group Policy Object: a set of configuration settings applied to users or computers." },
          { term: "LDAP", def: "Protocol for querying and modifying directory information; LDAPS adds TLS." },
          { term: "Kerberoasting", def: "Requesting service tickets to crack service account passwords offline." }
        ],
        analogy:
          "Active Directory is the company's HR system plus building security office in one. It knows every employee, decides which doors they can open, and Group Policy is the rulebook posted in every department.",
        technical:
          "Security wants USB storage disabled on all finance laptops. An administrator creates a GPO that blocks removable storage and links it to the Finance Computers OU. Within the next policy refresh, every machine in that OU applies the setting, with no per-machine work.",
        table: {
          headers: ["Term", "What it is", "Exam clue"],
          rows: [
            ["Domain controller", "Authenticates and stores directory", "Kerberos logon server"],
            ["OU", "Container for objects", "Delegate admin or apply GPO"],
            ["GPO", "Central settings", "Enforce config on many machines"],
            ["LDAP 389", "Cleartext directory queries", "Use LDAPS 636"],
            ["Kerberos 88", "Ticket-based authentication", "Time sync matters"]
          ]
        },
        confusion: [
          { a: "LDAP", b: "Active Directory", diff: "LDAP is a protocol for talking to a directory. Active Directory is a directory service that supports LDAP." },
          { a: "OU", b: "Group", diff: "An OU organises objects and receives policy. A group is used to assign permissions." },
          { a: "GPO", b: "MDM policy", diff: "GPOs manage domain-joined Windows machines. MDM manages mobile and cloud-managed devices." }
        ],
        soc: "Alert on additions to Domain Admins, spikes of 4625 failures, logons by service accounts at odd hours, many service ticket requests from one account (Kerberoasting), and new or modified GPOs.",
        patterns: [
          ["Apply the same security settings to every computer in a department", "Group Policy Object linked to an OU"],
          ["Directory queries are sent in cleartext", "LDAP on 389; use LDAPS on 636"],
          ["Server that authenticates domain logons", "Domain controller"],
          ["Cracking service account passwords offline from tickets", "Kerberoasting"],
          ["Forged tickets using the krbtgt account", "Golden ticket"],
          ["Event ID for a failed logon", "4625"]
        ],
        takeaways: [
          "Centralised identity makes management easy and makes the directory the top target.",
          "GPOs enforce secure baselines at scale.",
          "Protect LDAP, limit admin accounts, and monitor privileged group changes."
        ],
        remember: [
          "AD = directory; DC = server that authenticates; OU = container; GPO = settings.",
          "Kerberos port 88; LDAP 389; LDAPS 636.",
          "Assign permissions to groups, not individuals.",
          "Event IDs: 4624 success, 4625 failure, 4740 lockout, 4720 account created.",
          "Kerberoasting attacks service accounts; golden ticket forges tickets; pass-the-hash reuses hashes.",
          "Use separate admin accounts and restrict where admins log on."
        ],
        taglish:
          "Ang Active Directory ang sentrong imbakan ng users, groups, at computers sa isang Windows domain. Ang domain controller ang nag-aauthenticate (Kerberos). Ang OU ay lalagyan ng mga object, at ang GPO ay set ng settings na ina-apply sa OU, halimbawa i-disable ang USB. Ang LDAP sa port 389 ay cleartext kaya gamitin ang LDAPS sa 636. Dahil ang AD ang puso ng network, bantayan ang Domain Admins at gumamit ng hiwalay na admin account."
      },
      {
        id: "d4-t191",
        title: "Inside a Security Operations Center: Tiers, Roles, Runbooks, and Metrics",
        tag: "4.8",
        minutes: 18,
        goal: "Describe how a SOC is organised, how alerts move through it, and which metrics show whether it works.",
        why: "Domain 4 is about operations. Scenario questions ask who should handle an alert, when to escalate, and what MTTD and MTTR mean.",
        simple:
          "A SECURITY OPERATIONS CENTER (SOC) is the team and tooling that monitors, detects, and responds to threats. It is often tiered. TIER 1 analysts watch the SIEM queue, triage alerts, and close false positives or escalate. TIER 2 analysts investigate confirmed incidents, contain threats, and do deeper analysis. TIER 3 (or threat hunters and engineers) hunt proactively, reverse malware, and tune detections. A SOC MANAGER runs people and process, and an incident commander leads a major incident. Work follows RUNBOOKS and PLAYBOOKS: written steps for common situations so response is consistent. Tools include SIEM, SOAR, EDR, NDR, and ticketing. Success is measured with MTTD (mean time to detect), MTTR (mean time to respond or recover), false positive rate, and alert volume per analyst.",
        deepDive: [
          { h: "Alert lifecycle", list: [
            "Detect: rule or analytic fires in SIEM or EDR.",
            "Triage: is it real, how severe, which asset?",
            "Investigate: gather logs, endpoint data, and context.",
            "Contain and eradicate: isolate host, disable account, remove malware.",
            "Recover and document: restore, record a ticket, feed lessons back into detections."
          ] },
          { h: "Roles", list: [
            "Tier 1: monitoring and triage.",
            "Tier 2: incident responder and investigator.",
            "Tier 3: threat hunter, detection engineer, malware analyst.",
            "Threat intelligence analyst: supplies context on adversaries.",
            "SOC manager: staffing, metrics, escalation paths."
          ] },
          { h: "Metrics", list: [
            "MTTD: how fast threats are noticed; lower is better.",
            "MTTR: how fast they are contained or resolved.",
            "False positive rate: noisy rules waste analyst time and cause alert fatigue.",
            "Coverage: share of assets and techniques with logging and detections (often mapped to ATT&CK)."
          ] },
          { h: "Healthy SOC practices", list: [
            "Document and test playbooks; automate repetitive steps with SOAR.",
            "Tune detections regularly to reduce noise.",
            "Define escalation criteria and communication paths in advance.",
            "Hold shift handoffs and post-incident reviews."
          ] }
        ],
        keyTerms: [
          { term: "SOC", def: "Security Operations Center: the team and tools that monitor and respond to threats." },
          { term: "Runbook", def: "Step-by-step written procedure for a routine operational task or alert type." },
          { term: "Playbook", def: "Documented response plan for a specific type of incident, often automated in SOAR." },
          { term: "MTTD", def: "Mean time to detect: average time from compromise to detection." },
          { term: "MTTR", def: "Mean time to respond or recover: average time to contain or resolve." },
          { term: "Alert fatigue", def: "Analysts ignoring alerts because of too many false positives." }
        ],
        analogy:
          "A SOC is like a hospital emergency department: triage nurses sort arrivals (Tier 1), doctors treat serious cases (Tier 2), specialists handle the hardest ones and study disease patterns (Tier 3), and checklists keep care consistent.",
        technical:
          "The SIEM raises an alert for 40 failed logons followed by a success. Tier 1 confirms it is not a known scanner and escalates. Tier 2 pulls endpoint logs, sees a new process, isolates the host with EDR, resets the password, and opens an incident. Tier 3 later writes a detection for the pattern and the playbook is updated.",
        table: {
          headers: ["Tier", "Main job", "Escalate when"],
          rows: [
            ["Tier 1", "Monitor and triage", "Alert looks real or is beyond the runbook"],
            ["Tier 2", "Investigate and contain", "Scope is wide or advanced actor"],
            ["Tier 3", "Hunt, reverse, engineer", "New technique needs a new detection"]
          ]
        },
        confusion: [
          { a: "Runbook", b: "Playbook", diff: "A runbook covers routine operational steps; a playbook covers responding to a particular incident type. The terms overlap and are often used loosely." },
          { a: "MTTD", b: "MTTR", diff: "MTTD measures detection speed. MTTR measures how fast you respond or recover after detection." },
          { a: "SIEM", b: "SOAR", diff: "SIEM collects and correlates events to raise alerts. SOAR automates the response workflow." }
        ],
        soc: "Operational health signs: alert backlog age, percentage of alerts closed as false positive, time to first response, and how many incidents were found by detections rather than reported by users.",
        patterns: [
          ["Analyst closes false positives and escalates real alerts", "Tier 1 triage"],
          ["Average time from compromise to detection", "MTTD"],
          ["Written steps so every analyst handles a phishing alert the same way", "Playbook or runbook"],
          ["Analysts ignore alerts because most are false", "Alert fatigue; tune detections"],
          ["Automatically disable an account when a rule fires", "SOAR"],
          ["Proactively search for undetected intruders", "Threat hunting (Tier 3)"]
        ],
        takeaways: [
          "Tiers split triage, investigation, and hunting.",
          "Written playbooks make response consistent and automatable.",
          "Measure detection and response times, and fight alert fatigue through tuning."
        ],
        remember: [
          "Tier 1 triage, Tier 2 investigate and contain, Tier 3 hunt and engineer.",
          "Runbooks and playbooks standardise response.",
          "MTTD = detect, MTTR = respond or recover.",
          "Alert fatigue is solved by tuning, not by ignoring alerts.",
          "SIEM detects and correlates; SOAR automates response.",
          "Lessons learned feed back into detections and playbooks."
        ],
        taglish:
          "Ang SOC ang team na nagbabantay at tumutugon sa banta. Tier 1 ang nagte-triage ng alerts, Tier 2 ang nag-iimbestiga at nagko-contain, at Tier 3 ang nag-hunt at gumagawa ng bagong detection. May runbook at playbook para pare-pareho ang aksyon. Sukatin gamit ang MTTD (bilis ng pagtuklas) at MTTR (bilis ng pagtugon). Kapag sobrang daming false positive, alert fatigue ang kalalabasan, kaya i-tune ang rules."
      }
    ],
    d2: [
      {
        id: "d2-t190",
        title: "Password Cracking: Hashes, Rainbow Tables, Wordlists, and Why Salting and Slow Hashes Win",
        tag: "2.4",
        minutes: 18,
        goal: "Explain how stolen password hashes are cracked and which defenses actually slow attackers down.",
        why: "Credential attacks are everywhere on the exam. Knowing how cracking works explains why salting, long passphrases, and MFA are the right answers.",
        simple:
          "Systems should store a password HASH, not the password. If attackers steal the hash database, they try to recover passwords OFFLINE, where nobody can lock them out. A DICTIONARY attack hashes a wordlist and compares; a BRUTE FORCE attack tries every combination; HYBRID attacks mutate words (adding digits). A RAINBOW TABLE is a precomputed table of hashes that speeds up cracking unsalted hashes. A unique random SALT added to each password before hashing defeats rainbow tables and forces attackers to crack each hash separately. Using a deliberately slow, adaptive algorithm (bcrypt, scrypt, Argon2, PBKDF2) makes each guess expensive. Fast general-purpose hashes like MD5 or SHA-1 are poor for passwords. ONLINE attacks (guessing against the live login) are limited by lockouts and rate limits, so spraying and stuffing are used there.",
        deepDive: [
          { h: "Attack types", list: [
            "Dictionary: wordlists of common passwords.",
            "Brute force: every combination; cost grows with length.",
            "Hybrid: dictionary words plus rules (Password1!).",
            "Rainbow table: precomputed hash lookups; defeated by salts.",
            "Credential stuffing: reuse leaked username-password pairs on other sites.",
            "Password spraying: a few common passwords against many accounts to avoid lockout."
          ] },
          { h: "Defenses", list: [
            "Unique per-user salt, stored with the hash.",
            "Slow key-stretching hashes: bcrypt, scrypt, Argon2, PBKDF2.",
            "A secret pepper held outside the database adds more protection.",
            "Long passphrases and screening against breached-password lists.",
            "MFA so a cracked password alone is not enough.",
            "Lockout, throttling, and monitoring for online attacks."
          ] },
          { h: "Online versus offline", list: [
            "Online: against the live service; rate limiting and lockout apply.",
            "Offline: attacker has the hashes; limited only by compute and hash cost.",
            "Protecting the hash store and detecting breaches matter as much as password rules."
          ] }
        ],
        keyTerms: [
          { term: "Salt", def: "Unique random value added to a password before hashing to defeat precomputed tables." },
          { term: "Pepper", def: "A secret value added to passwords and kept separately from the hash database." },
          { term: "Rainbow table", def: "Precomputed table mapping hashes to passwords for fast lookup." },
          { term: "Key stretching", def: "Making hashing deliberately slow with many iterations." },
          { term: "Credential stuffing", def: "Trying leaked credentials from one breach on other services." },
          { term: "Password spraying", def: "Trying a few common passwords across many accounts." }
        ],
        analogy:
          "Cracking a hash is like guessing a combination for a safe you took home. At home there is no alarm and no limit on tries, so the only defenses are a very complicated lock (slow hash), a lock unique to each safe (salt), and not using a guessable combination (long passphrase).",
        technical:
          "An attacker steals a table of unsalted MD5 hashes. Using a rainbow table, many are recovered in minutes. After the company migrates to Argon2 with per-user salts, each guess takes meaningful time and cannot be shared across users, so only the weakest passwords fall.",
        table: {
          headers: ["Technique", "Idea", "Best defense"],
          rows: [
            ["Dictionary/brute force", "Guess and hash", "Long passphrase, slow hash"],
            ["Rainbow table", "Precomputed lookups", "Unique salt"],
            ["Credential stuffing", "Reused leaked passwords", "MFA, unique passwords, breach screening"],
            ["Password spraying", "Few passwords, many accounts", "Lockout monitoring, MFA"]
          ]
        },
        confusion: [
          { a: "Salt", b: "Pepper", diff: "A salt is unique per password and stored with the hash. A pepper is a secret shared value stored elsewhere." },
          { a: "Credential stuffing", b: "Password spraying", diff: "Stuffing uses known leaked pairs; spraying guesses a few common passwords across many accounts." },
          { a: "Online attack", b: "Offline attack", diff: "Online hits the live login and can be throttled. Offline cracks stolen hashes with no limits." }
        ],
        soc: "Look for many failed logons across many accounts from one source (spraying), successful logins from known-breached credentials, and any evidence of a database or domain controller hash dump, which means offline cracking is likely.",
        patterns: [
          ["Precomputed hashes make cracking fast", "Rainbow table; use salts"],
          ["Same few passwords tried against hundreds of accounts", "Password spraying"],
          ["Leaked credentials replayed on another site", "Credential stuffing"],
          ["Make each guess expensive", "bcrypt, scrypt, Argon2, or PBKDF2"],
          ["A cracked password still does not allow login", "MFA"],
          ["Hashes stolen from a database and guessed on the attacker's hardware", "Offline attack"]
        ],
        takeaways: [
          "Salt every password and use slow, purpose-built hashes.",
          "Offline cracking has no lockout, so password length and hash cost matter.",
          "MFA limits the damage from any cracked or reused password."
        ],
        remember: [
          "Store salted hashes, never plaintext or reversible encryption.",
          "Salt defeats rainbow tables; slow hashes defeat brute force.",
          "Use bcrypt, scrypt, Argon2, or PBKDF2, not plain MD5 or SHA-1.",
          "Spraying = few passwords, many accounts; stuffing = leaked pairs.",
          "Online attacks are throttled; offline attacks are not.",
          "MFA and breached-password screening are key defenses."
        ],
        taglish:
          "Hash ang dapat itago, hindi mismong password. Kapag ninakaw ang hash database, pwedeng i-crack offline na walang lockout. Ang rainbow table ay precomputed na hashes, kaya gamitin ang unique salt sa bawat password. Gumamit ng mabagal na hash tulad ng bcrypt, scrypt, Argon2, o PBKDF2. Ang password spraying ay iilang karaniwang password sa maraming account; ang credential stuffing ay paggamit ng leaked na pares sa ibang site. Ang MFA ang pinakamagandang proteksyon."
      },
      {
        id: "d2-t191",
        title: "Wireless Attacks: Evil Twins, Rogue APs, Deauthentication, and WPS",
        tag: "2.4",
        minutes: 16,
        goal: "Recognise the main wireless attacks and match each to the control that stops it.",
        why: "Wireless is a classic exam topic. Questions describe a symptom, such as users connecting to a fake hotspot, and ask for the attack name and the fix.",
        simple:
          "Wireless attacks target the shared radio medium. A ROGUE ACCESS POINT is any unauthorised AP plugged into your network, often by an employee, creating a back door. An EVIL TWIN is a malicious AP copying a legitimate SSID so users connect to the attacker, who can then capture traffic or credentials (an on-path attack). DEAUTHENTICATION (disassociation) attacks send forged management frames that knock clients off Wi-Fi, used for denial of service or to force reconnection so a handshake can be captured; WPA3 and 802.11w protected management frames help. WPS PIN attacks brute-force the short setup PIN, so disable WPS. JAMMING floods the radio spectrum to deny service. WARDRIVING maps networks. Defenses: WPA3 or WPA2/WPA3-Enterprise, wireless intrusion prevention (WIPS), rogue AP detection, strong passphrases, and VPN on untrusted networks.",
        deepDive: [
          { h: "Attack to defense", list: [
            "Rogue AP: scan for unknown APs, use 802.1X and port security so unauthorised APs cannot connect to the wired network.",
            "Evil twin: use WPA3 or Enterprise with certificate validation, educate users, use a VPN on public Wi-Fi.",
            "Deauthentication: protected management frames (802.11w), WPA3, WIPS detection.",
            "WPS PIN brute force: disable WPS.",
            "Jamming: detect interference, use wired links or frequency changes for critical systems.",
            "Weak PSK handshake capture: long random passphrase or WPA3-SAE."
          ] },
          { h: "Related items", list: [
            "Captive portals often sit on open guest networks and do not encrypt traffic.",
            "War driving and war chalking: finding and recording networks.",
            "Bluetooth equivalents: bluejacking and bluesnarfing.",
            "Replay and IV attacks broke WEP, which should never be used."
          ] }
        ],
        keyTerms: [
          { term: "Rogue AP", def: "An unauthorised access point connected to the organisation's network." },
          { term: "Evil twin", def: "A fake access point imitating a legitimate network's SSID." },
          { term: "Deauthentication", def: "Forged management frames that disconnect clients from a wireless network." },
          { term: "WPS", def: "Wi-Fi Protected Setup: easy pairing with a short PIN that is vulnerable to brute force." },
          { term: "WIPS", def: "Wireless intrusion prevention system: detects and blocks rogue APs and attacks." },
          { term: "802.11w", def: "Amendment that protects wireless management frames." }
        ],
        analogy:
          "An evil twin is a fake coffee-shop sign pointing to a booth run by a thief who looks like staff. A rogue AP is someone cutting a hole in your office wall and leaving a door open to the street.",
        technical:
          "At an airport, a traveller connects to Free_Airport_WiFi. An attacker nearby runs an AP with the same name and a stronger signal, and may deauthenticate clients from the real AP to push them across. The traveller's unencrypted logins are captured. A VPN and HTTPS limit what the attacker sees.",
        table: {
          headers: ["Attack", "What happens", "Fix"],
          rows: [
            ["Rogue AP", "Unauthorised AP on the network", "802.1X, WIPS, scans"],
            ["Evil twin", "Fake AP copies SSID", "WPA3/Enterprise, VPN"],
            ["Deauth", "Clients forced off Wi-Fi", "802.11w, WPA3"],
            ["WPS attack", "PIN brute force", "Disable WPS"],
            ["Jamming", "Radio interference DoS", "Detect, use wired"]
          ]
        },
        confusion: [
          { a: "Rogue AP", b: "Evil twin", diff: "A rogue AP is unauthorised hardware on your network. An evil twin is an attacker's AP that impersonates a legitimate SSID, usually off your network." },
          { a: "Deauthentication", b: "Jamming", diff: "Deauth uses forged management frames to disconnect clients. Jamming floods the radio spectrum with noise." },
          { a: "WPS", b: "WPA3", diff: "WPS is a pairing convenience with a weak PIN. WPA3 is the modern security standard." }
        ],
        soc: "Wireless controllers and WIPS alert on unknown BSSIDs using your SSID, bursts of deauthentication frames, new APs seen on wired ports, and clients associating with APs outside the approved list.",
        patterns: [
          ["Users connect to a hotspot with the company's SSID that the company did not deploy", "Evil twin"],
          ["An employee plugs in a personal AP at their desk", "Rogue access point"],
          ["Clients keep getting disconnected from Wi-Fi by forged frames", "Deauthentication attack; 802.11w"],
          ["Router setup button PIN can be brute-forced", "WPS; disable it"],
          ["Detect and block unauthorised wireless devices", "WIPS"],
          ["Protect your traffic on hotel Wi-Fi", "VPN"]
        ],
        takeaways: [
          "Know rogue AP vs evil twin cold.",
          "WPA3, 802.11w and Enterprise authentication close most gaps.",
          "Disable WPS and never use WEP."
        ],
        remember: [
          "Rogue AP = unauthorised on your network; evil twin = fake copy of a real SSID.",
          "Deauth frames disconnect clients; protected management frames (802.11w) help.",
          "Disable WPS; never use WEP.",
          "WIPS detects rogue APs and attacks.",
          "Use WPA3 or Enterprise, and a VPN on untrusted Wi-Fi.",
          "Jamming is a denial-of-service on radio."
        ],
        taglish:
          "Ang rogue AP ay hindi awtorisadong access point sa loob ng network mo. Ang evil twin ay pekeng AP na kopya ng pangalan (SSID) ng totoo para makuha ang traffic mo. Ang deauthentication ay pekeng frames na nagpapadiskonekta sa clients; panlaban ang 802.11w at WPA3. I-disable ang WPS at huwag gumamit ng WEP. Sa pampublikong Wi-Fi, gumamit ng VPN."
      }
    ]
  },

  tips: {
    "d3-t190": "Asymmetric is for identity and key exchange, symmetric is for the data. If a question says old traffic must stay safe even if the key is stolen later, the answer is forward secrecy. Certificate warning questions: read whether it is expired, name mismatch, or untrusted issuer.",
    "d4-t190": "GPO + OU is the answer whenever the scenario says apply settings to many domain computers. LDAP is cleartext (389) so LDAPS (636) is the secure choice. Kerberoasting attacks service accounts; golden ticket forges tickets.",
    "d4-t191": "Triage is Tier 1, deeper investigation and containment is Tier 2, proactive hunting and detection engineering is Tier 3. Too many false positives means tune the rules, never ignore the alerts.",
    "d2-t190": "Salt beats rainbow tables; slow hashes beat brute force; MFA beats stolen passwords. Spraying means few passwords across many accounts, stuffing means leaked pairs reused.",
    "d2-t191": "Rogue AP is unauthorised hardware on your network; evil twin is a fake copy of your SSID. Deauth is fixed with 802.11w/WPA3, WPS is fixed by turning it off."
  },

  summaries: {
    "d3-t190": "TLS authenticates the server with a certificate, agrees on session keys (ideally with forward secrecy), and encrypts data symmetrically; use TLS 1.2 or 1.3 and investigate every certificate error.",
    "d4-t190": "Active Directory centralises identities, domain controllers authenticate with Kerberos, and Group Policy applies secure settings to OUs, so the directory must be protected, monitored, and kept on LDAPS.",
    "d4-t191": "A tiered SOC triages, investigates, and hunts using playbooks and tooling, and measures itself with MTTD, MTTR, and false positive rate while tuning to avoid alert fatigue.",
    "d2-t190": "Stolen hashes are cracked offline with dictionaries, brute force, and rainbow tables; unique salts, slow hashes like Argon2 or bcrypt, long passphrases, and MFA are the defenses.",
    "d2-t191": "Rogue APs, evil twins, deauthentication, WPS, and jamming each have a specific fix: 802.1X and WIPS, WPA3 or Enterprise with a VPN, protected management frames, disabling WPS, and detection."
  },

  questions: [
    {
      id: "q-x-d3-190a", domainId: "d3", tag: "d3-t190", type: "single",
      prompt: "A security architect wants captured TLS traffic to stay unreadable even if the server's private key is stolen next year. Which feature provides this?",
      choices: [
        { id: "a", text: "Forward secrecy with ephemeral key exchange" },
        { id: "b", text: "A longer certificate validity period" },
        { id: "c", text: "Disabling HSTS" },
        { id: "d", text: "Using TLS 1.0 for compatibility" }
      ],
      correct: "a",
      explanation: "Ephemeral Diffie-Hellman creates per-session keys not derivable from the server's long-term key.",
      distractorExplanations: {
        b: "Validity length has no effect on past sessions.",
        c: "HSTS forces HTTPS but does not provide forward secrecy.",
        d: "TLS 1.0 is deprecated and weaker."
      }
    },
    {
      id: "q-x-d3-190b", domainId: "d3", tag: "d3-t190", type: "single",
      prompt: "Users see a browser warning that the certificate for www.shop.example.test was issued for a different hostname. What is the MOST likely issue?",
      choices: [
        { id: "a", text: "Name mismatch: the certificate's subject or SAN does not include the requested name" },
        { id: "b", text: "The server is using AES" },
        { id: "c", text: "The site uses port 443" },
        { id: "d", text: "The certificate uses a strong hash" }
      ],
      correct: "a",
      explanation: "The browser compares the requested hostname with the certificate's subject and SAN entries.",
      distractorExplanations: {
        b: "AES is a normal encryption algorithm.",
        c: "443 is the standard HTTPS port.",
        d: "A strong hash is not a problem."
      }
    },
    {
      id: "q-x-d4-190a", domainId: "d4", tag: "d4-t190", type: "single",
      prompt: "An administrator must disable USB storage on every computer in the Finance department of a Windows domain. What is the MOST efficient method?",
      choices: [
        { id: "a", text: "Create a Group Policy Object and link it to the Finance computers OU" },
        { id: "b", text: "Visit each computer and change the setting manually" },
        { id: "c", text: "Ask users to avoid USB drives" },
        { id: "d", text: "Install a second domain controller" }
      ],
      correct: "a",
      explanation: "GPOs apply configuration centrally and consistently to all objects in an OU.",
      distractorExplanations: {
        b: "Manual changes do not scale and drift.",
        c: "A request is not an enforced control.",
        d: "A second DC adds redundancy, not policy."
      }
    },
    {
      id: "q-x-d4-190b", domainId: "d4", tag: "d4-t190", type: "single",
      prompt: "Directory queries between an application and the domain controller are visible in cleartext on the network. Which change is BEST?",
      choices: [
        { id: "a", text: "Use LDAPS (port 636) or LDAP with TLS" },
        { id: "b", text: "Move LDAP to a different cleartext port" },
        { id: "c", text: "Use Telnet to query the directory" },
        { id: "d", text: "Disable Kerberos" }
      ],
      correct: "a",
      explanation: "LDAP on 389 is unencrypted by default; LDAPS or StartTLS protects it.",
      distractorExplanations: {
        b: "A different port does not add encryption.",
        c: "Telnet is also cleartext.",
        d: "Disabling Kerberos weakens authentication."
      }
    },
    {
      id: "q-x-d4-191a", domainId: "d4", tag: "d4-t191", type: "single",
      prompt: "SOC analysts are overwhelmed and have begun ignoring most alerts because nearly all are false positives. What should the SOC do FIRST?",
      choices: [
        { id: "a", text: "Tune the detection rules to reduce false positives" },
        { id: "b", text: "Turn off alerting" },
        { id: "c", text: "Hire more Tier 1 analysts only" },
        { id: "d", text: "Delete the SIEM" }
      ],
      correct: "a",
      explanation: "Tuning reduces noise while keeping detection, which fixes alert fatigue at the source.",
      distractorExplanations: {
        b: "Turning off alerts removes detection.",
        c: "More staff does not fix noisy rules.",
        d: "Removing the SIEM eliminates visibility."
      }
    },
    {
      id: "q-x-d4-191b", domainId: "d4", tag: "d4-t191", type: "single",
      prompt: "Which metric measures the average time between a compromise occurring and the SOC discovering it?",
      choices: [
        { id: "a", text: "MTTD" },
        { id: "b", text: "MTBF" },
        { id: "c", text: "RPO" },
        { id: "d", text: "ALE" }
      ],
      correct: "a",
      explanation: "Mean time to detect measures detection speed; MTTR measures response or recovery speed.",
      distractorExplanations: {
        b: "MTBF is average time between failures.",
        c: "RPO is tolerable data loss measured in time.",
        d: "ALE is annualized loss expectancy."
      }
    },
    {
      id: "q-x-d2-190a", domainId: "d2", tag: "d2-t190", type: "single",
      prompt: "A breach exposes a database of unsalted password hashes. Attackers recover many passwords within minutes using precomputed tables. Which control would have MOST reduced this?",
      choices: [
        { id: "a", text: "Unique per-user salts with a slow hashing algorithm such as bcrypt or Argon2" },
        { id: "b", text: "Hashing with MD5 twice" },
        { id: "c", text: "Encrypting passwords with one shared key" },
        { id: "d", text: "Requiring users to change passwords daily" }
      ],
      correct: "a",
      explanation: "Salts defeat rainbow tables and slow hashes make each guess expensive.",
      distractorExplanations: {
        b: "MD5 is fast and weak; repeating it does not fix that.",
        c: "A shared key is a single point of failure and reversible.",
        d: "Frequent changes do not stop offline cracking of weak hashes."
      }
    },
    {
      id: "q-x-d2-190b", domainId: "d2", tag: "d2-t190", type: "multi",
      prompt: "Which TWO are password attacks that avoid account lockout by spreading attempts or reusing known credentials? (Select TWO.)",
      choices: [
        { id: "a", text: "Password spraying" },
        { id: "b", text: "Credential stuffing" },
        { id: "c", text: "Deauthentication" },
        { id: "d", text: "ARP poisoning" }
      ],
      correct: ["a", "b"],
      explanation: "Spraying tries few passwords across many accounts; stuffing replays leaked credential pairs.",
      distractorExplanations: {
        c: "Deauthentication is a wireless attack.",
        d: "ARP poisoning is a layer 2 on-path technique."
      }
    },
    {
      id: "q-x-d2-191a", domainId: "d2", tag: "d2-t191", type: "single",
      prompt: "Employees at a conference connect to a hotspot named like the company's Wi-Fi, but the company did not deploy it. Which attack is this?",
      choices: [
        { id: "a", text: "Evil twin" },
        { id: "b", text: "Rogue access point on the wired network" },
        { id: "c", text: "Bluesnarfing" },
        { id: "d", text: "Jamming" }
      ],
      correct: "a",
      explanation: "An evil twin impersonates a legitimate SSID to lure users.",
      distractorExplanations: {
        b: "A rogue AP is unauthorised hardware connected to your network.",
        c: "Bluesnarfing steals data over Bluetooth.",
        d: "Jamming blocks the signal instead of impersonating a network."
      }
    },
    {
      id: "q-x-d2-191b", domainId: "d2", tag: "d2-t191", type: "single",
      prompt: "Clients repeatedly drop off the Wi-Fi network and logs show floods of forged disassociation frames. Which control helps MOST?",
      choices: [
        { id: "a", text: "Protected management frames (802.11w) with WPA3" },
        { id: "b", text: "Enable WPS" },
        { id: "c", text: "Switch to WEP" },
        { id: "d", text: "Hide the SSID only" }
      ],
      correct: "a",
      explanation: "802.11w authenticates management frames so forged deauthentication frames are ignored.",
      distractorExplanations: {
        b: "WPS adds PIN attack risk.",
        c: "WEP is broken.",
        d: "Hiding the SSID does not stop forged frames."
      }
    }
  ],

  glossary: [
    { term: "Forward Secrecy", domain: "d3", plain: "Old recorded traffic stays safe even if the key is stolen later.", technical: "Session keys come from ephemeral key exchange, so compromise of the long-term key does not expose past sessions.", example: "ECDHE cipher suites in TLS." },
    { term: "Group Policy Object", domain: "d4", plain: "A bundle of settings pushed to many Windows computers.", technical: "Configuration applied to users or computers in an Active Directory site, domain, or OU.", example: "A GPO that blocks USB storage on Finance PCs." },
    { term: "Kerberoasting", domain: "d2", plain: "Stealing service tickets to crack a service account password offline.", technical: "Requesting Kerberos service tickets encrypted with a service account's secret and cracking them offline.", example: "Use long random passwords for service accounts." },
    { term: "Evil Twin", domain: "d2", plain: "A fake Wi-Fi network that copies a real one's name.", technical: "A malicious access point impersonating a legitimate SSID to intercept traffic.", example: "A fake airport Wi-Fi hotspot." },
    { term: "Pepper", domain: "d2", plain: "A secret ingredient added to every password hash, kept away from the database.", technical: "A secret value mixed into password hashing and stored separately from the hash database.", example: "Kept in an HSM or application secret store." }
  ],

  acronyms: [
    { acro: "SOC", expansion: "Security Operations Center", meaning: "Team and tooling that monitors and responds to security events." },
    { acro: "MTTD", expansion: "Mean Time to Detect", meaning: "Average time from compromise to detection." },
    { acro: "MTTR", expansion: "Mean Time to Respond (or Recover)", meaning: "Average time to contain or resolve an incident." },
    { acro: "GPO", expansion: "Group Policy Object", meaning: "A set of settings applied to Windows users or computers in a domain." },
    { acro: "WIPS", expansion: "Wireless Intrusion Prevention System", meaning: "Detects and blocks rogue APs and wireless attacks." },
    { acro: "HSTS", expansion: "HTTP Strict Transport Security", meaning: "Header that tells browsers to use HTTPS only." }
  ]
});
