/* Round 7: four more lessons on topics that were thin elsewhere: DNS attacks,
   IDS/IPS detection methods, OS permissions and privilege (Linux and Windows),
   and email encryption (S/MIME and PGP). Ids use the t192 range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d2: [
      {
        id: "d2-t192",
        title: "DNS Attacks: Cache Poisoning, Hijacking, Tunneling, Amplification, and Typosquatting",
        tag: "2.4",
        minutes: 18,
        goal: "Recognise the main attacks that abuse DNS and match each to its defense.",
        why: "DNS turns names into addresses, so whoever controls the answer controls where users go. Exam questions describe a redirect or a flood and ask which DNS attack it is.",
        simple:
          "DNS is trusted by everything and was designed without authentication, so it is a rich target. DNS CACHE POISONING injects false records into a resolver's cache so users asking for a real name get an attacker's address; DNSSEC (digital signatures on records) prevents it. DNS HIJACKING changes where queries go, by altering a router's or device's DNS settings, taking over the registrar account, or compromising the authoritative server (protect with MFA, registry lock). PHARMING is the user-facing result: a correct URL leads to a fake site. DNS TUNNELING hides data or commands inside DNS queries to slip past firewalls. DNS AMPLIFICATION is a DDoS where small spoofed queries to open resolvers produce large responses aimed at a victim; fix with response rate limiting and not running open resolvers. TYPOSQUATTING (URL hijacking) registers lookalike names such as examp1e.test. DOMAIN SHADOWING hides malicious subdomains under a legitimate account. Defenses: DNSSEC, protective DNS and sinkholes, DNS over TLS/HTTPS for privacy, restricting resolvers, monitoring query patterns.",
        deepDive: [
          { h: "Attack and defense map", list: [
            "Cache poisoning: forged answers cached by a resolver; use DNSSEC, randomised source ports and transaction IDs, and patched resolvers.",
            "Hijacking: unauthorised change to DNS settings or registrar records; use MFA, registrar lock, and monitoring of NS and A records.",
            "Pharming: redirection to a fake site; verify TLS certificates and use DNSSEC.",
            "Tunneling: encoded data in queries; inspect query length and rate, block unknown external resolvers.",
            "Amplification/reflection: spoofed source plus open resolver; rate limit, disable recursion for outsiders, ingress filtering.",
            "Typosquatting: lookalike domains; register common variants, user training, web filtering."
          ] },
          { h: "Zone transfers and enumeration", list: [
            "An open zone transfer (AXFR) hands an attacker the whole zone: restrict transfers to authorised secondary servers.",
            "Attackers also guess subdomains; do not expose internal names in public DNS (split-horizon DNS)."
          ] },
          { h: "Defensive uses of DNS", list: [
            "DNS sinkhole returns a harmless address for known-bad domains and shows which hosts are infected.",
            "Protective DNS and DNS filtering block malicious or newly registered domains.",
            "DNS logs are a valuable data source for detecting beaconing and tunneling."
          ] }
        ],
        keyTerms: [
          { term: "Cache poisoning", def: "Inserting false DNS records into a resolver's cache." },
          { term: "DNSSEC", def: "Extensions that digitally sign DNS records so answers can be verified." },
          { term: "Pharming", def: "Redirecting users to a fraudulent site, often by corrupting DNS." },
          { term: "DNS amplification", def: "Reflection DDoS using open resolvers and spoofed source addresses." },
          { term: "Typosquatting", def: "Registering misspelled or lookalike domain names to catch mistakes." },
          { term: "Sinkhole", def: "A DNS answer that redirects malicious domains to a safe address." }
        ],
        analogy:
          "DNS is the phone book. Cache poisoning is slipping a fake page into the copy the librarian keeps; hijacking is bribing the printer to change the original; DNSSEC is signing every entry so fakes are obvious.",
        technical:
          "Users type the correct bank URL but land on a lookalike page. Investigation finds the branch router's DNS setting was changed to an attacker's server (DNS hijacking). The fix is to reset the router, change its admin password, enforce DNSSEC-validating resolvers, and monitor for unauthorised DNS settings changes.",
        table: {
          headers: ["Attack", "Goal", "Key defense"],
          rows: [
            ["Cache poisoning", "Redirect many users", "DNSSEC, patched resolvers"],
            ["Hijacking", "Control the answers", "MFA, registrar lock"],
            ["Tunneling", "Covert channel", "Query inspection, block external DNS"],
            ["Amplification", "DDoS", "Rate limiting, close open resolvers"],
            ["Typosquatting", "Catch typing mistakes", "Register variants, filtering"]
          ]
        },
        confusion: [
          { a: "Cache poisoning", b: "DNS hijacking", diff: "Poisoning corrupts a resolver's cached answers. Hijacking changes the DNS configuration or records at the source." },
          { a: "Pharming", b: "Phishing", diff: "Phishing tricks people with messages. Pharming silently redirects them even when they type the right address." },
          { a: "DNSSEC", b: "DNS over TLS/HTTPS", diff: "DNSSEC proves answers are authentic. DoT/DoH encrypts queries for privacy but does not validate them." }
        ],
        soc: "Hunt for long random subdomains, high NXDOMAIN rates, TXT queries to rare domains, clients using unapproved resolvers, and sudden changes to NS or MX records.",
        patterns: [
          ["Correct URL, wrong site, fixed by signing DNS records", "Cache poisoning/pharming; DNSSEC"],
          ["Router DNS setting changed to an attacker server", "DNS hijacking"],
          ["Small spoofed queries cause huge responses at the victim", "DNS amplification"],
          ["Data encoded in subdomain labels", "DNS tunneling"],
          ["Lookalike domain such as examp1e.test", "Typosquatting"],
          ["Return a safe address for known-bad domains", "DNS sinkhole"]
        ],
        takeaways: [
          "DNSSEC authenticates, DoT/DoH encrypts.",
          "Protect registrar and DNS admin accounts with MFA.",
          "DNS logs are both a target and a detection source."
        ],
        remember: [
          "Poisoning = bad cached answers; hijacking = changed source or settings.",
          "DNSSEC signs records to stop poisoning.",
          "Amplification needs open resolvers and spoofed sources.",
          "Restrict zone transfers to secondary servers.",
          "Sinkholes and protective DNS block known-bad domains.",
          "Port 53; DoT 853."
        ],
        taglish:
          "Ang DNS ang phone book ng internet. Sa cache poisoning, may pekeng sagot na nakalagay sa cache ng resolver; ang DNSSEC ang panlaban dahil pirmado ang records. Sa DNS hijacking, binabago ang DNS settings o records. Ang pharming ay napupunta ka sa pekeng site kahit tama ang tinype mo. Ang amplification ay DDoS gamit ang open resolvers. Ang typosquatting ay lookalike na domain. Gamitin ang sinkhole at i-limit ang zone transfers."
      }
    ],
    d3: [
      {
        id: "d3-t192",
        title: "IDS and IPS in Depth: Detection Methods, Placement, False Positives, and Tuning",
        tag: "3.2",
        minutes: 18,
        goal: "Compare intrusion detection and prevention, their detection methods, and how placement and tuning affect results.",
        why: "Questions ask which sensor detects but does not block, why an alert was a false positive, and how an unknown attack would be caught.",
        simple:
          "An INTRUSION DETECTION SYSTEM (IDS) watches traffic or hosts and alerts; it is typically out of band, receiving a copy of traffic from a tap or SPAN port, so it cannot block. An INTRUSION PREVENTION SYSTEM (IPS) sits inline, so it can drop packets and block attacks in real time, but a failure can interrupt traffic. NETWORK-based (NIDS/NIPS) watches network segments; HOST-based (HIDS/HIPS) watches one device's files, processes, and logs. DETECTION METHODS: SIGNATURE-based matches known attack patterns, accurate for known threats but blind to new ones; ANOMALY-based (behavioural) learns a normal baseline and flags deviations, catching unknown attacks but producing more false positives; HEURISTIC or rule-based detection looks for suspicious characteristics. A FALSE POSITIVE is a harmless event flagged; a FALSE NEGATIVE is a real attack missed, which is more dangerous. Tuning, updated signatures, and good placement reduce errors. Fail-open lets traffic pass if an inline device fails; fail-closed blocks it.",
        deepDive: [
          { h: "IDS versus IPS", list: [
            "IDS: passive, out of band, alerts only, no impact on traffic flow.",
            "IPS: inline, active, can block, reset connections, or drop packets.",
            "Many modern NGFWs include IPS functions.",
            "Inline devices need capacity and redundancy to avoid becoming a bottleneck or single point of failure."
          ] },
          { h: "Detection methods", list: [
            "Signature: match known patterns; keep updated; misses zero-days.",
            "Anomaly/behaviour: baseline versus deviation; finds new attacks; needs tuning.",
            "Heuristic: suspicious traits or behaviour rules.",
            "Reputation and threat intelligence feeds add known-bad addresses and domains."
          ] },
          { h: "Errors and tuning", list: [
            "False positive: alert with no attack; causes fatigue and, on an IPS, can block legitimate traffic.",
            "False negative: attack not detected; the dangerous error.",
            "Tuning: adjust thresholds, disable irrelevant signatures, whitelist known-good, keep signatures current.",
            "Test in detection-only mode before enabling blocking."
          ] },
          { h: "Placement", list: [
            "Behind the perimeter firewall to see what got through, and in front to see all attempts.",
            "On internal segments and the DMZ to catch lateral movement.",
            "Encrypted traffic is invisible unless decrypted or monitored at the host."
          ] }
        ],
        keyTerms: [
          { term: "IDS", def: "Intrusion detection system: monitors and alerts on suspicious activity." },
          { term: "IPS", def: "Intrusion prevention system: inline device that can block detected attacks." },
          { term: "Signature-based", def: "Detection by matching known attack patterns." },
          { term: "Anomaly-based", def: "Detection by flagging deviations from a learned baseline." },
          { term: "False positive", def: "A benign event incorrectly flagged as malicious." },
          { term: "False negative", def: "A malicious event that goes undetected." }
        ],
        analogy:
          "An IDS is a burglar alarm that rings but does not lock the door; an IPS is a guard standing in the doorway who can stop people. Signature detection is a wanted poster; anomaly detection is a guard who notices someone behaving oddly.",
        technical:
          "A company places a network IPS inline behind its firewall. Signature rules block a known exploit. An anomaly engine flags a workstation sending data to an unfamiliar country at 3 a.m. After tuning out a nightly backup that caused false positives, the team switches the anomaly rules from alert-only to blocking for high-confidence events.",
        table: {
          headers: ["Feature", "IDS", "IPS"],
          rows: [
            ["Placement", "Out of band (tap/SPAN)", "Inline"],
            ["Action", "Alert", "Block and alert"],
            ["Risk if it fails", "Lose visibility", "May stop traffic"],
            ["Typical response", "Analyst investigates", "Automatic prevention"]
          ]
        },
        confusion: [
          { a: "Signature-based", b: "Anomaly-based", diff: "Signature detects known patterns accurately. Anomaly flags deviations from normal, catching unknowns but with more false positives." },
          { a: "False positive", b: "False negative", diff: "A false positive is a false alarm. A false negative is a missed attack." },
          { a: "NIDS", b: "HIDS", diff: "Network IDS watches traffic on a segment; host IDS watches activity on one device." }
        ],
        soc: "Measure alert accuracy and time to tune. Review signatures that fire constantly, check sensors still receive mirrored traffic, and verify signature updates are applied.",
        patterns: [
          ["Must detect but never block, receives a copy of traffic", "IDS (out of band)"],
          ["Inline device that drops malicious packets", "IPS"],
          ["Catches known exploits only", "Signature-based"],
          ["Catches never-seen attack through unusual behaviour", "Anomaly-based"],
          ["Real attack not alerted", "False negative"],
          ["Legitimate traffic blocked by an IPS rule", "False positive"]
        ],
        takeaways: [
          "Inline = prevent; out of band = detect.",
          "Signature for known, anomaly for unknown.",
          "False negatives are the more dangerous error."
        ],
        remember: [
          "IDS passive, IPS inline.",
          "Signature = known; anomaly/behaviour = unknown; heuristic = suspicious traits.",
          "False positive = false alarm; false negative = missed attack.",
          "Tune and update signatures regularly.",
          "Run in detect-only before blocking.",
          "Encrypted traffic needs decryption or host sensors."
        ],
        taglish:
          "Ang IDS ay nagbabantay at nag-aalert lang, nasa out-of-band (kopya ng traffic). Ang IPS ay inline kaya kayang mag-block. Ang signature-based ay para sa kilalang atake; ang anomaly-based ay nakakahuli ng bago pero maraming false positive. Ang false negative (hindi nahuli ang atake) ang mas delikado. Mag-tune at mag-update ng signatures."
      }
    ],
    d4: [
      {
        id: "d4-t192",
        title: "Operating System Permissions and Privilege: Linux, Windows, sudo, UAC, and Least Privilege",
        tag: "4.6",
        minutes: 18,
        goal: "Read and set basic file permissions, understand elevation tools, and apply least privilege on Linux and Windows.",
        why: "The exam shows a permission string or asks how to give an administrator task safely. Knowing the tools makes those questions quick.",
        simple:
          "On LINUX each file has an owner, a group, and permissions for owner, group, and others, each made of read (r=4), write (w=2), and execute (x=1). chmod 750 means owner rwx (7), group r-x (5), others none (0). chmod changes permissions, chown changes the owner. The root account has full power, so administrators use SUDO to run single commands with elevated rights, which is logged, instead of logging in as root. The SETUID bit runs a program with its owner's rights and is a classic privilege escalation target. SELinux and AppArmor add mandatory access control. On WINDOWS, NTFS permissions (read, modify, full control) apply to users and groups; User Account Control (UAC) prompts before elevation; and standard users should not be local administrators. Share permissions combine with NTFS permissions and the most restrictive result applies. The principle everywhere is LEAST PRIVILEGE: give only the access needed, review it, and use separate admin accounts.",
        deepDive: [
          { h: "Reading Linux permissions", list: [
            "-rwxr-x--- : first character is the type, then owner, group, others in rwx triplets.",
            "r=4, w=2, x=1; add them for each class: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--.",
            "chmod 644 file: owner read/write, everyone else read.",
            "chmod 600 for private keys; 700 for private directories.",
            "chown user:group file changes ownership."
          ] },
          { h: "Elevation and escalation", list: [
            "sudo: per-command elevation with an audit trail; configured in sudoers.",
            "Avoid shared root passwords and direct root SSH logins.",
            "SetUID binaries and writable scripts run by root enable privilege escalation.",
            "Windows UAC separates standard and elevated tokens; do not disable it.",
            "Local Administrator Password Solution (LAPS) gives each machine a unique admin password."
          ] },
          { h: "Mandatory and role-based controls", list: [
            "SELinux and AppArmor confine processes even if running as root.",
            "RBAC groups permissions by job role.",
            "Review group membership and remove stale access (recertification).",
            "Use just-in-time or privileged access management for admin tasks."
          ] },
          { h: "Auditing", list: [
            "Linux: /var/log/auth.log or secure, and sudo logs.",
            "Windows: events 4672 (special privileges assigned), 4728 and 4732 (group changes).",
            "Alert on new SetUID files, new admin accounts, and unexpected sudo use."
          ] }
        ],
        keyTerms: [
          { term: "chmod", def: "Linux command that changes file permissions." },
          { term: "sudo", def: "Runs a command with elevated privileges while recording who did it." },
          { term: "SetUID", def: "A permission that makes a program run with its owner's rights." },
          { term: "UAC", def: "User Account Control: Windows prompt that separates standard and administrative actions." },
          { term: "Least privilege", def: "Granting only the minimum access required for a task." },
          { term: "SELinux", def: "Linux mandatory access control that confines processes by policy." }
        ],
        analogy:
          "Permissions are keys on a ring: owner, group, and everyone else each get different keys. sudo is borrowing the master key for one door with a sign-out sheet, rather than carrying it around all day.",
        technical:
          "A web application reads a configuration file. Setting it to chmod 640 with owner root and group www-data lets the web service read it, root edit it, and everyone else see nothing. The admin uses sudo for changes, so each edit is logged under their name instead of a shared root login.",
        table: {
          headers: ["Value", "Meaning", "Common use"],
          rows: [
            ["755", "rwxr-xr-x", "Programs and public directories"],
            ["644", "rw-r--r--", "Normal files"],
            ["600", "rw-------", "Private keys"],
            ["750", "rwxr-x---", "Owner and group only"],
            ["777", "rwxrwxrwx", "Avoid: everyone can modify"]
          ]
        },
        confusion: [
          { a: "chmod", b: "chown", diff: "chmod changes who may read, write, or execute. chown changes who owns the file." },
          { a: "sudo", b: "su", diff: "sudo runs one command with elevated rights and logs it. su switches to another user, often root, for a whole session." },
          { a: "UAC", b: "Least privilege", diff: "UAC is a Windows prompt mechanism. Least privilege is the principle of limiting access." }
        ],
        soc: "Watch for chmod 777, new SetUID binaries, new accounts in sudo or Administrators groups, sudo from unusual accounts, and Windows event 4672 for unexpected users.",
        patterns: [
          ["chmod 750 gives owner, group, and others", "rwx, r-x, and none"],
          ["Admin task without sharing the root password", "sudo"],
          ["Program runs with its owner's rights regardless of caller", "SetUID bit"],
          ["Unique local admin password on each Windows machine", "LAPS"],
          ["Confine processes even when they run as root", "SELinux or AppArmor"],
          ["Private SSH key should be", "chmod 600"]
        ],
        takeaways: [
          "Read permissions as owner, group, others and add r=4, w=2, x=1.",
          "Use sudo and UAC rather than permanent admin rights.",
          "Review privileged groups and SetUID files regularly."
        ],
        remember: [
          "r=4, w=2, x=1; 7=rwx, 6=rw-, 5=r-x, 4=r--.",
          "chmod = permissions; chown = owner.",
          "sudo gives logged, per-command elevation.",
          "Never leave files at 777; keep private keys at 600.",
          "Windows: NTFS permissions, UAC, standard user accounts, LAPS.",
          "SELinux and AppArmor are mandatory access controls."
        ],
        taglish:
          "Sa Linux, tatlo ang grupo ng permission: owner, group, at others, at r=4, w=2, x=1. Ang chmod 750 ay rwx para sa owner, r-x para sa group, at wala para sa others. Gamitin ang sudo para sa isang command na may log, huwag mag-login bilang root. Ang SetUID ay delikado dahil tumatakbo sa karapatan ng may-ari. Sa Windows, gamitin ang UAC at standard users, at LAPS para unique ang admin password. Least privilege lagi."
      }
    ],
    d1: [
      {
        id: "d1-t192",
        title: "Securing Email Content: S/MIME, PGP, Transport Encryption, and Signing",
        tag: "1.4",
        minutes: 15,
        goal: "Explain how email can be encrypted and signed end to end, and how that differs from transport protection.",
        why: "Email is sent across many servers. The exam asks which technology provides confidentiality, integrity, or non-repudiation for messages and how keys are trusted.",
        simple:
          "Email protection has two layers. TRANSPORT encryption (TLS between mail servers, and TLS from your client to the server) protects the message while it moves between hops, but the content is readable on each server. END-TO-END protection encrypts the message itself so only the recipient can read it. S/MIME uses X.509 certificates issued by a CA, a hierarchical trust model common in enterprises. PGP (and the open GnuPG) uses a WEB OF TRUST where people sign each other's public keys instead of relying on a CA. Both encrypt with the recipient's public key (confidentiality) and sign with the sender's private key (integrity, authentication, and non-repudiation). In practice a random symmetric key encrypts the message and the recipient's public key encrypts that key. SPF, DKIM, and DMARC protect against spoofed senders but do not encrypt content. Lost private keys mean messages cannot be read, so key backup or escrow matters, and revoked or expired certificates must be handled.",
        deepDive: [
          { h: "What each control provides", list: [
            "Encrypt with recipient's public key: confidentiality.",
            "Sign with sender's private key: integrity, authentication, non-repudiation.",
            "Hash of the message is signed, so any change breaks the signature.",
            "TLS between servers: hop-by-hop confidentiality only."
          ] },
          { h: "S/MIME versus PGP", list: [
            "S/MIME: certificates from a CA; built into many mail clients; fits enterprise PKI.",
            "PGP/GnuPG: web of trust or key servers; popular with individuals and developers.",
            "Both need users to manage private keys safely.",
            "Key exchange and verification of fingerprints prevents impersonation."
          ] },
          { h: "Related protections", list: [
            "SPF, DKIM, DMARC: sender authentication, not content encryption.",
            "DLP can scan or block sensitive content before it leaves.",
            "Secure email gateways filter phishing and malware.",
            "Encrypted messaging apps use end-to-end encryption with forward secrecy."
          ] },
          { h: "Operational issues", list: [
            "Recovering mail after a lost key requires key backup or escrow policy.",
            "Encrypted attachments hide malware from scanners unless decrypted at the gateway.",
            "Expired or revoked certificates cause signature warnings; check CRL or OCSP."
          ] }
        ],
        keyTerms: [
          { term: "S/MIME", def: "Standard for signing and encrypting email using X.509 certificates." },
          { term: "PGP", def: "Pretty Good Privacy: email encryption and signing using public keys and a web of trust." },
          { term: "Web of trust", def: "Trust model where users vouch for each other's keys instead of using a central CA." },
          { term: "Digital signature", def: "Hash signed with a private key to prove origin and integrity." },
          { term: "End-to-end encryption", def: "Only the sender and recipient can read the message content." },
          { term: "Non-repudiation", def: "The sender cannot credibly deny sending a signed message." }
        ],
        analogy:
          "TLS is an armoured van moving sealed mail between depots: the mail is safe in transit but the depots can open the envelope. S/MIME or PGP is a locked box only the recipient can open, with the sender's wax seal proving who sent it.",
        technical:
          "Alice sends a contract to Bob using S/MIME. Her client hashes the message and signs the hash with her private key, then encrypts the message with a fresh symmetric key, which it wraps with Bob's public key. Bob decrypts with his private key and verifies Alice's signature with her certificate, confirming the contract was not changed and came from her.",
        table: {
          headers: ["Goal", "Use", "Key used"],
          rows: [
            ["Confidentiality", "Encrypt", "Recipient's public key"],
            ["Integrity and non-repudiation", "Sign", "Sender's private key"],
            ["Verify signature", "Verify", "Sender's public key"],
            ["Read encrypted message", "Decrypt", "Recipient's private key"]
          ]
        },
        confusion: [
          { a: "S/MIME", b: "PGP", diff: "S/MIME relies on CA-issued certificates; PGP relies on a web of trust. Both provide encryption and signatures." },
          { a: "TLS email", b: "End-to-end email encryption", diff: "TLS protects each hop only. End-to-end encryption protects content from sender to recipient." },
          { a: "DKIM", b: "S/MIME signature", diff: "DKIM signs messages at the domain level for server verification. S/MIME signs per user for the recipient." }
        ],
        soc: "Watch for expired signing certificates, unusual encrypted attachments from external senders, and mailboxes forwarding encrypted content out. Ensure the gateway can inspect or quarantine suspicious encrypted mail per policy.",
        patterns: [
          ["Only the recipient may read the message", "Encrypt with the recipient's public key"],
          ["Prove who sent it and that it was not altered", "Digital signature with sender's private key"],
          ["Users sign each other's keys instead of a CA", "PGP web of trust"],
          ["Email standard that uses X.509 certificates", "S/MIME"],
          ["Protects mail only between servers", "TLS (transport encryption)"],
          ["Sender cannot deny sending", "Non-repudiation via digital signature"]
        ],
        takeaways: [
          "Encrypt with the recipient's public key; sign with your private key.",
          "TLS protects transit; S/MIME and PGP protect the message itself.",
          "SPF, DKIM, and DMARC authenticate senders but do not hide content."
        ],
        remember: [
          "Confidentiality = recipient's public key; signature = sender's private key.",
          "S/MIME uses CA certificates; PGP uses a web of trust.",
          "Digital signatures give integrity, authentication, and non-repudiation.",
          "TLS is hop by hop; end-to-end protects the content.",
          "Back up private keys or lose access to old mail.",
          "SPF/DKIM/DMARC do not encrypt."
        ],
        taglish:
          "May dalawang layer ang proteksyon ng email. Ang TLS ay para lang sa daan ng mensahe sa pagitan ng servers. Ang S/MIME at PGP ay nag-eencrypt ng mismong mensahe: i-encrypt gamit ang public key ng tatanggap para sa confidentiality, at i-sign gamit ang private key mo para sa integrity at non-repudiation. Ang S/MIME ay gumagamit ng CA certificate; ang PGP ay web of trust. Ang SPF, DKIM, at DMARC ay para sa sender authentication, hindi encryption."
      }
    ]
  },

  tips: {
    "d2-t192": "Poisoning corrupts a resolver's cache and DNSSEC is the fix; hijacking changes settings or records and MFA plus registrar lock is the fix. DNSSEC authenticates, DoT/DoH encrypts.",
    "d3-t192": "Inline means IPS, out of band means IDS. Signature catches known, anomaly catches unknown. A false negative (missed attack) is worse than a false positive.",
    "d4-t192": "Convert chmod numbers with r=4, w=2, x=1. Need admin power for one task? sudo. Need to stop a root process doing damage? SELinux/AppArmor. Never 777.",
    "d1-t192": "Encrypt with the recipient's PUBLIC key, sign with your PRIVATE key. TLS only protects the hops; S/MIME and PGP protect the message itself. SPF/DKIM/DMARC never encrypt."
  },

  summaries: {
    "d2-t192": "DNS attacks include cache poisoning, hijacking, pharming, tunneling, amplification, and typosquatting, countered with DNSSEC, strong registrar and admin security, rate limiting, and monitoring of query patterns.",
    "d3-t192": "IDS alerts out of band while IPS blocks inline; signature detection finds known attacks and anomaly detection finds unknown ones, and tuning and placement reduce false positives and false negatives.",
    "d4-t192": "Linux and Windows permissions follow least privilege: read chmod values as owner, group, others, use sudo and UAC rather than standing admin rights, and watch for SetUID abuse and group changes.",
    "d1-t192": "Email can be protected hop by hop with TLS or end to end with S/MIME or PGP, using the recipient's public key for confidentiality and the sender's private key for signatures and non-repudiation."
  },

  questions: [
    {
      id: "q-x-d2-192a", domainId: "d2", tag: "d2-t192", type: "single",
      prompt: "Users who type the correct bank URL land on a fraudulent site. Investigation shows a recursive resolver is returning forged records from its cache. Which attack and control match?",
      choices: [
        { id: "a", text: "DNS cache poisoning; deploy DNSSEC validation" },
        { id: "b", text: "Typosquatting; register lookalike domains" },
        { id: "c", text: "DNS amplification; enable response rate limiting" },
        { id: "d", text: "Bluesnarfing; disable Bluetooth" }
      ],
      correct: "a",
      explanation: "Forged records in a resolver cache are cache poisoning, and signed records validated with DNSSEC stop it.",
      distractorExplanations: {
        b: "Typosquatting depends on users mistyping.",
        c: "Amplification is a DDoS technique.",
        d: "Bluesnarfing is a Bluetooth attack."
      }
    },
    {
      id: "q-x-d2-192b", domainId: "d2", tag: "d2-t192", type: "single",
      prompt: "An attacker sends small spoofed queries to many open DNS resolvers so that large responses flood a victim. Which technique is this?",
      choices: [
        { id: "a", text: "DNS amplification (reflection) DDoS" },
        { id: "b", text: "DNS tunneling" },
        { id: "c", text: "Domain hijacking" },
        { id: "d", text: "Pharming" }
      ],
      correct: "a",
      explanation: "Spoofed source addresses and open resolvers turn small requests into large reflected responses.",
      distractorExplanations: {
        b: "Tunneling hides data inside DNS queries.",
        c: "Hijacking takes control of records or accounts.",
        d: "Pharming redirects users to fake sites."
      }
    },
    {
      id: "q-x-d3-192a", domainId: "d3", tag: "d3-t192", type: "single",
      prompt: "A security team needs a sensor that receives a copy of traffic from a SPAN port and raises alerts without any risk of interrupting production traffic. Which should they deploy?",
      choices: [
        { id: "a", text: "A network IDS" },
        { id: "b", text: "An inline network IPS" },
        { id: "c", text: "A stateless packet filter" },
        { id: "d", text: "A load balancer" }
      ],
      correct: "a",
      explanation: "An out-of-band IDS monitors a copy of traffic and cannot block or disrupt flows.",
      distractorExplanations: {
        b: "An inline IPS can drop traffic and affect availability.",
        c: "A packet filter enforces rules rather than analysing a copy.",
        d: "Load balancers distribute traffic."
      }
    },
    {
      id: "q-x-d3-192b", domainId: "d3", tag: "d3-t192", type: "single",
      prompt: "Which detection method is MOST likely to identify a never-before-seen attack, at the cost of more false positives?",
      choices: [
        { id: "a", text: "Anomaly-based detection" },
        { id: "b", text: "Signature-based detection" },
        { id: "c", text: "Port mirroring" },
        { id: "d", text: "Static allow list" }
      ],
      correct: "a",
      explanation: "Anomaly detection flags deviations from a baseline, so it can catch unknown attacks.",
      distractorExplanations: {
        b: "Signatures only match known patterns.",
        c: "Port mirroring supplies traffic but does not detect.",
        d: "An allow list is a preventive control."
      }
    },
    {
      id: "q-x-d4-192a", domainId: "d4", tag: "d4-t192", type: "single",
      prompt: "A Linux file has permissions 640 (owner root, group webapp). Who can do what?",
      choices: [
        { id: "a", text: "Root can read and write; members of webapp can read; others have no access" },
        { id: "b", text: "Everyone can read and write" },
        { id: "c", text: "Only root can read, nobody else has any access" },
        { id: "d", text: "Root can execute; webapp can write" }
      ],
      correct: "a",
      explanation: "6 = rw- for owner, 4 = r-- for group, 0 = no access for others.",
      distractorExplanations: {
        b: "That would be 666 or 777.",
        c: "The group has read access.",
        d: "No execute bit is set."
      }
    },
    {
      id: "q-x-d4-192b", domainId: "d4", tag: "d4-t192", type: "single",
      prompt: "An administrator needs to run occasional privileged commands on a Linux server while keeping an audit trail of who did what. What is the BEST approach?",
      choices: [
        { id: "a", text: "Use sudo with individual accounts" },
        { id: "b", text: "Share the root password" },
        { id: "c", text: "Allow direct root SSH login for everyone" },
        { id: "d", text: "Set chmod 777 on system files" }
      ],
      correct: "a",
      explanation: "sudo grants per-command elevation and logs the user, supporting least privilege and accountability.",
      distractorExplanations: {
        b: "A shared password destroys accountability.",
        c: "Direct root login removes individual attribution.",
        d: "777 weakens security for everything."
      }
    },
    {
      id: "q-x-d1-192a", domainId: "d1", tag: "d1-t192", type: "single",
      prompt: "A sender wants recipients to be able to verify an email was not altered and truly came from them. Which key does the sender use to create the signature?",
      choices: [
        { id: "a", text: "The sender's private key" },
        { id: "b", text: "The recipient's public key" },
        { id: "c", text: "The recipient's private key" },
        { id: "d", text: "A shared TLS session key" }
      ],
      correct: "a",
      explanation: "Signatures are made with the sender's private key and verified with the sender's public key.",
      distractorExplanations: {
        b: "The recipient's public key is used to encrypt for them.",
        c: "No one else should have the recipient's private key.",
        d: "A TLS session key is not tied to the sender's identity."
      }
    },
    {
      id: "q-x-d1-192b", domainId: "d1", tag: "d1-t192", type: "multi",
      prompt: "Which TWO statements about S/MIME and PGP are correct? (Select TWO.)",
      choices: [
        { id: "a", text: "S/MIME relies on CA-issued X.509 certificates" },
        { id: "b", text: "PGP commonly uses a web of trust" },
        { id: "c", text: "Both only protect email between mail servers" },
        { id: "d", text: "Both replace the need for SPF, DKIM, and DMARC entirely" }
      ],
      correct: ["a", "b"],
      explanation: "S/MIME uses a CA hierarchy; PGP uses a web of trust. Both protect the message itself.",
      distractorExplanations: {
        c: "They protect content end to end, not just between servers.",
        d: "Sender authentication standards address a different problem."
      }
    }
  ],

  glossary: [
    { term: "DNS Cache Poisoning", domain: "d2", plain: "Putting a fake answer into a DNS server's memory.", technical: "Injecting forged DNS records into a resolver's cache so clients are directed to attacker-controlled addresses.", example: "Users asking for a bank's name get the attacker's IP." },
    { term: "IDS vs IPS", domain: "d3", plain: "An IDS warns; an IPS warns and blocks.", technical: "Intrusion detection systems monitor out of band and alert; intrusion prevention systems sit inline and can block traffic.", example: "A network IPS drops a known exploit packet." },
    { term: "SetUID", domain: "d4", plain: "A program that runs with its owner's powers.", technical: "A Unix permission bit that executes a file with the privileges of its owner rather than the caller.", example: "A vulnerable setuid-root program can lead to privilege escalation." },
    { term: "Web of Trust", domain: "d1", plain: "People vouching for each other's keys instead of one central authority.", technical: "A decentralised PGP trust model in which users sign each other's public keys.", example: "Alice signs Bob's key after verifying his fingerprint." }
  ],

  acronyms: [
    { acro: "DNSSEC", expansion: "Domain Name System Security Extensions", meaning: "Digitally signs DNS records so answers can be validated." },
    { acro: "NIDS", expansion: "Network Intrusion Detection System", meaning: "Monitors network traffic for suspicious activity and alerts." },
    { acro: "HIDS", expansion: "Host-based Intrusion Detection System", meaning: "Monitors a single host's files, processes, and logs." },
    { acro: "S/MIME", expansion: "Secure/Multipurpose Internet Mail Extensions", meaning: "Standard for signing and encrypting email using certificates." },
    { acro: "PGP", expansion: "Pretty Good Privacy", meaning: "Public-key email and file encryption using a web of trust." },
    { acro: "LAPS", expansion: "Local Administrator Password Solution", meaning: "Gives each Windows machine a unique, rotated local admin password." }
  ]
});
