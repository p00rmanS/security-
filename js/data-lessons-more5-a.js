/* Round 5, part A: lessons that thicken topics the Exam Blueprint checker
   found only inside other objectives' lessons (Domains 2-3). Ids use the
   t18x range. Registers a bundle on globalThis.__DEEP; data-lessons-merge.js
   merges it. All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d2: [
      {
        id: "d2-t184",
        title: "Attacks by Layer: Application, Cryptographic, Physical, and Network Attack Recognition",
        tag: "2.4",
        minutes: 24,
        goal: "Recognize each named attack in objective 2.4 from a short description and name the control that stops it.",
        why: "Scenario questions describe what an attacker did and ask you to name the attack or the defense. Organizing attacks by layer lets you answer quickly and spot the distractors.",
        simple:
          "Group attacks by where they happen. APPLICATION attacks target software logic. INJECTION inserts attacker-controlled commands into an interpreter (SQL, command, LDAP, or XML injection), defeated by parameterized queries and input validation. A BUFFER OVERFLOW writes more data than a memory buffer can hold, corrupting memory so code may run; defenses are bounds checking, memory-safe languages, address space layout randomization (ASLR), and data execution prevention (DEP). A REPLAY attack captures a valid message or token and resubmits it; defenses are nonces, timestamps, short-lived tokens, and session binding. PRIVILEGE ESCALATION raises access, vertically (to administrator) or horizontally (to another user's data); defenses are patching, least privilege, and authorization checks. FORGERY attacks make a request appear legitimate: cross-site request forgery (CSRF) tricks a logged-in browser into sending an unwanted request (anti-CSRF tokens and SameSite cookies), and server-side request forgery (SSRF) tricks a server into making requests to internal resources (allow lists and egress filtering). DIRECTORY TRAVERSAL uses sequences such as ../ to reach files outside the intended folder (input canonicalization and restricted file permissions). CRYPTOGRAPHIC attacks target algorithms and protocols. A DOWNGRADE attack forces a connection to use a weaker protocol or cipher (disable legacy protocols, enforce modern versions, use HSTS). A COLLISION attack finds two different inputs that produce the same hash, undermining integrity or signatures (retire MD5 and SHA-1). A BIRTHDAY attack exploits the mathematics of probability (like the birthday paradox) to find collisions far faster than brute force, which is why hash outputs must be long enough. PHYSICAL attacks include BRUTE FORCE against physical barriers (forcing doors and locks), RFID CLONING (copying a proximity badge's data to make a duplicate; defenses are encrypted smart credentials, badge plus PIN, and shielding), and ENVIRONMENTAL attacks (interfering with power, cooling, water, or fire suppression to cause outages; defenses are environmental monitoring, redundancy, and physical protection). NETWORK attacks include DDoS, in which AMPLIFIED attacks make a small request produce a large response and REFLECTED attacks bounce traffic off third parties using a spoofed source address; DNS attacks such as poisoning, hijacking, and tunneling; WIRELESS attacks such as the evil twin and deauthentication; ON-PATH attacks (also called man-in-the-middle) where an attacker intercepts and relays communications; CREDENTIAL REPLAY (reusing captured credentials or hashes, as in pass-the-hash); and MALICIOUS CODE delivered by malware. The key skill is reading the clue and mapping it to the attack.",
        deepDive: [
          { h: "Application attack clues", list: [
            "Quote characters or SQL keywords in input fields: injection.",
            "Unusually long input crashing a program or running code: buffer overflow.",
            "Old captured request accepted again: replay.",
            "A normal user gains admin rights: privilege escalation (vertical); reads another user's records: horizontal.",
            "A link or hidden form silently causes a logged-in user to perform an action: CSRF.",
            "A server fetches an internal URL on an attacker's behalf: SSRF.",
            "../../etc/passwd in a URL: directory traversal."
          ] },
          { h: "Cryptographic attack clues", list: [
            "Client and server end up using SSL 3.0 or an export cipher because an attacker interfered with negotiation: downgrade.",
            "Two different files have the same hash: collision.",
            "Finding any two inputs with the same hash is much easier than finding one matching a given hash: birthday attack.",
            "Prevent with strong, long hashes (SHA-256 or better), modern TLS only, and key management."
          ] },
          { h: "Physical attack clues", list: [
            "Crowbar, lock picking, or battering a door: physical brute force.",
            "Someone holds a reader near a badge in a crowd and later enters with a copy: RFID cloning.",
            "Cooling failure, power sabotage, or water damage causing outages: environmental attack.",
            "Controls: stronger locks and barriers, guards, encrypted credentials, environmental monitoring, and redundancy."
          ] },
          { h: "Network attack clues", list: [
            "Small DNS or NTP queries producing huge responses to a victim: amplified DDoS.",
            "Responses reaching a victim who never asked, from many servers: reflected DDoS using a spoofed source.",
            "Users sent to the wrong site despite typing the right name: DNS poisoning or hijacking.",
            "Traffic passing through an attacker's machine: on-path attack (ARP spoofing, rogue gateway, evil twin).",
            "Captured hash or token reused to authenticate: credential replay."
          ] },
          { h: "Matching defenses", list: [
            "Injection: parameterized queries, input validation, least-privilege database accounts.",
            "Buffer overflow: bounds checking, ASLR, DEP, memory-safe languages, patching.",
            "Replay: nonces, timestamps, one-time tokens, encryption with session keys.",
            "CSRF: anti-CSRF tokens, SameSite cookies. SSRF: allow lists and network egress controls.",
            "Downgrade: disable legacy protocols, require modern TLS, HSTS.",
            "Collision/birthday: strong hashes and sufficient output length.",
            "On-path: encryption with authentication, DAI, 802.1X, certificate validation.",
            "DDoS: scrubbing, rate limiting, anycast; DNS: DNSSEC and secured resolvers."
          ] }
        ],
        keyTerms: [
          { term: "Injection", def: "Inserting attacker-controlled input that is executed by an interpreter." },
          { term: "Buffer Overflow", def: "Writing beyond the bounds of a memory buffer, corrupting adjacent memory." },
          { term: "Replay Attack", def: "Capturing a valid transmission and resending it to gain access or repeat an action." },
          { term: "CSRF", def: "Cross-Site Request Forgery: forcing a user's browser to send an unwanted authenticated request." },
          { term: "SSRF", def: "Server-Side Request Forgery: making a server send requests to unintended internal targets." },
          { term: "Directory Traversal", def: "Using path sequences to access files outside the intended directory." },
          { term: "Downgrade Attack", def: "Forcing use of a weaker protocol or cipher." },
          { term: "Collision Attack", def: "Finding two inputs that produce the same hash value." },
          { term: "Birthday Attack", def: "A collision-finding method exploiting probability to reduce the work required." },
          { term: "RFID Cloning", def: "Copying the data from a proximity credential to create a working duplicate." },
          { term: "Amplification / Reflection", def: "DDoS techniques that enlarge attack traffic and bounce it off third parties." },
          { term: "On-Path Attack", def: "An attacker positioned between two parties to intercept or alter communications." }
        ],
        analogy:
          "Attacks by layer are different ways to rob a bank. Application attacks trick the teller with a forged slip (injection, CSRF). Cryptographic attacks trick the vault's lock design (downgrading to a weaker lock, finding two keys that both fit). Physical attacks go through the door, copy a staff badge, or cut the power. Network attacks jam the street outside (DDoS), mislead the map (DNS), or stand secretly between customer and teller (on-path).",
        technical:
          "A security analyst reviews five incidents. A search page returns every user record after a quote was typed into it (SQL injection). A mobile app accepts a captured login token days later (replay). A badge copied in a crowded elevator opens the server room (RFID cloning). A website offers only SSL 3.0 after an attacker interfered with the handshake (downgrade). A small spoofed request to open DNS resolvers floods a customer with large responses (amplified and reflected DDoS). Each has a different fix: parameterized queries, short-lived signed tokens, encrypted badges with a PIN, disabling legacy protocols, and upstream DDoS scrubbing.",
        table: {
          headers: ["Attack", "Layer", "Typical clue", "Main defense"],
          rows: [
            ["Injection", "Application", "Quotes or commands in input", "Parameterized queries, validation"],
            ["Buffer overflow", "Application", "Oversized input crashes or runs code", "Bounds checking, ASLR, DEP"],
            ["Replay", "Application / network", "Old valid request accepted again", "Nonces, timestamps, short-lived tokens"],
            ["Privilege escalation", "Application / OS", "User gains higher rights", "Patching, least privilege"],
            ["CSRF / SSRF", "Application", "Forged request from browser or server", "Anti-CSRF tokens; allow lists"],
            ["Directory traversal", "Application", "../ in file paths", "Path validation, permissions"],
            ["Downgrade", "Cryptographic", "Weaker protocol negotiated", "Disable legacy protocols, HSTS"],
            ["Collision / birthday", "Cryptographic", "Two inputs, same hash", "Strong, long hashes"],
            ["RFID cloning", "Physical", "Duplicate badge works", "Encrypted credentials, badge plus PIN"],
            ["Environmental", "Physical", "Power or cooling sabotage", "Monitoring, redundancy"],
            ["Amplified / reflected DDoS", "Network", "Small requests, huge responses", "Scrubbing, rate limiting, anti-spoofing"],
            ["DNS attack", "Network", "Users sent to wrong site", "DNSSEC, secured resolvers"],
            ["On-path", "Network", "Traffic relayed through attacker", "Encryption, DAI, 802.1X"]
          ]
        },
        confusion: [
          { a: "Replay", b: "On-path attack", diff: "Replay resends a previously captured message later. An on-path attacker sits between parties and can read or modify traffic in real time." },
          { a: "Collision attack", b: "Birthday attack", diff: "A collision attack finds two inputs with the same hash. A birthday attack is a probability-based method that finds collisions much faster than brute force." },
          { a: "Amplification", b: "Reflection", diff: "Amplification makes responses larger than requests. Reflection uses a third party and a spoofed source so replies hit the victim. They are often combined." },
          { a: "CSRF", b: "SSRF", diff: "CSRF abuses a user's browser and session. SSRF abuses a server's ability to make requests." },
          { a: "Vertical escalation", b: "Horizontal escalation", diff: "Vertical gains higher privilege (user to admin). Horizontal accesses another user's resources at the same level." }
        ],
        soc: "Detection mirrors recognition: injection strings and traversal sequences in web logs, repeated token reuse across sessions, unusual badge reads, downgraded TLS versions in logs, and sudden floods of inbound response traffic. Analysts map alerts to these attack names to select the right playbook.",
        patterns: [
          ["' OR 1=1 in a form field", "SQL injection"],
          ["Very long input crashes a service", "Buffer overflow"],
          ["Captured login token works again later", "Replay attack"],
          ["Hidden request sent using the victim's logged-in session", "CSRF"],
          ["../../etc/passwd in a URL", "Directory traversal"],
          ["Connection falls back to a weak protocol version", "Downgrade attack"],
          ["Two files with the same hash", "Collision attack"],
          ["Copied proximity badge opens a door", "RFID cloning"],
          ["Spoofed small requests cause huge responses to a victim", "Amplified and reflected DDoS"]
        ],
        takeaways: [
          "Map each attack to its layer and clue.",
          "Parameterized queries, bounds checking, nonces, strong hashes, encrypted credentials, and modern protocols address most of the list.",
          "Defense follows the attack: fix the mechanism, not just the symptom."
        ],
        remember: [
          "Application: injection, buffer overflow, replay, privilege escalation, forgery (CSRF/SSRF), directory traversal.",
          "Cryptographic: downgrade, collision, birthday.",
          "Physical: brute force, RFID cloning, environmental.",
          "Network: amplified and reflected DDoS, DNS attacks, wireless, on-path, credential replay, malicious code.",
          "Injection: parameterized queries. Replay: nonces/timestamps. Downgrade: disable legacy protocols.",
          "Birthday attack makes collisions easier; use long hash outputs.",
          "RFID cloning: encrypted credentials plus a second factor."
        ],
        taglish:
          "Ayusin ayon sa layer. Application: injection (parameterized query ang lunas), buffer overflow, replay (nonce at timestamp), privilege escalation, forgery (CSRF, SSRF), directory traversal (../). Cryptographic: downgrade (pinipilit sa mahinang protocol), collision (dalawang input, parehong hash), birthday (mas mabilis na paghanap ng collision). Physical: brute force, RFID cloning (kinopya ang badge), environmental (sabotahe sa kuryente o aircon). Network: amplified at reflected DDoS, DNS attack, wireless, on-path, credential replay. Basahin ang clue at itugma sa pangalan ng atake."
      },
      {
        id: "d2-t185",
        title: "Threat Vectors and Attack Surface Review: From Messages and Files to Default Credentials",
        tag: "2.2",
        minutes: 22,
        goal: "Name every threat vector in objective 2.2, explain how client-based and agentless software differ as attack surface, and match each vector to the best control.",
        why: "The vectors list is long, and exam questions describe how an attacker arrived and ask for the vector or for the control that closes it. A single review pass turns the list into a mental checklist.",
        simple:
          "A THREAT VECTOR is the path an attacker uses to reach a target, and the ATTACK SURFACE is the total set of such paths. The exam's vectors are: MESSAGE-BASED (email, SMS, and instant messaging carrying malicious links, attachments, or social engineering); IMAGE-BASED (malicious images, images that exploit viewer or parser flaws, or QR codes that lead to hostile sites, sometimes with hidden data using steganography); FILE-BASED (documents with macros, PDFs, archives, and executables disguised as legitimate files); VOICE CALL (vishing, including spoofed caller ID and increasingly cloned voices); REMOVABLE DEVICES (USB drives and cables that deliver malware or act as keyboards); VULNERABLE SOFTWARE, split into CLIENT-BASED software (applications and agents installed on endpoints that must be patched and can themselves be flawed, such as browsers, office suites, and management agents) and AGENTLESS approaches (systems monitored or managed without installing software on them, such as web or SaaS applications, where risk sits in the service and its configuration and in the access credentials, and where scanners and managers use network protocols or APIs); UNSUPPORTED SYSTEMS AND APPLICATIONS (no patches available); UNSECURE NETWORKS (open or poorly protected wireless, wired networks without access control, and Bluetooth); OPEN SERVICE PORTS (network services listening unnecessarily); DEFAULT CREDENTIALS (factory usernames and passwords); the SUPPLY CHAIN, including MANAGED SERVICE PROVIDERS (MSPs), vendors, and suppliers, through which an attacker reaches many customers at once; and HUMAN VECTORS or SOCIAL ENGINEERING (phishing, vishing, smishing, misinformation and disinformation, impersonation, business email compromise, pretexting, watering hole attacks, brand impersonation, and typosquatting). To shrink the attack surface, take inventory of what is exposed, remove or disable what is not needed, patch what remains, restrict and authenticate access, monitor, and train people. The same vector can be addressed at several layers, for example email: filtering and authentication (technical), blocking macros and attachments (configuration), and phishing training (human).",
        deepDive: [
          { h: "Vector to control", list: [
            "Message-based: secure email gateway, link and attachment sandboxing, SPF/DKIM/DMARC, user reporting.",
            "Image-based: keep viewers and libraries patched, scan images, treat QR codes as untrusted links.",
            "File-based: disable macros by default, scan attachments, application allow lists, file type blocking.",
            "Voice call: call-back verification, policies on sensitive requests by phone, training.",
            "Removable devices: disable autorun, USB device control, endpoint protection, no unknown media or cables.",
            "Vulnerable software: patch management, minimizing installed software, vulnerability scanning.",
            "Unsupported systems: replace, isolate, and compensate.",
            "Unsecure networks: WPA3 or 802.1X, VPN, network access control, Bluetooth off when unused.",
            "Open ports: scan, close, and firewall; follow least functionality.",
            "Default credentials: change on deployment; automate credential rotation.",
            "Supply chain: vendor assessment, contracts, least-privilege vendor access, monitoring.",
            "Human vectors: training, verification procedures, and technical filters."
          ] },
          { h: "Client-based versus agentless", list: [
            "Client-based: software installed on the endpoint. Pros: deep visibility and control, works off-network. Cons: must be deployed and patched, and the client or agent can itself be a vulnerability.",
            "Agentless: nothing installed on the target. Pros: easy to deploy and fewer endpoint vulnerabilities. Cons: less visibility, relies on network access and credentials, and may miss offline devices.",
            "Both apply to scanning, monitoring, and management tools, and to the applications themselves (installed apps versus web or SaaS apps)."
          ] },
          { h: "Human vectors defined", list: [
            "Phishing: fraudulent messages (usually email) that trick users.",
            "Vishing: voice phishing. Smishing: SMS phishing.",
            "Misinformation: false information spread without intent to harm. Disinformation: deliberate false information.",
            "Impersonation: pretending to be a trusted person or role.",
            "Business email compromise: fraud through compromised or spoofed executive or vendor email.",
            "Pretexting: inventing a believable scenario to obtain information.",
            "Watering hole: compromising a site that the target group visits.",
            "Brand impersonation: fake sites or messages using a trusted brand.",
            "Typosquatting: registering misspelled domains to catch typing mistakes."
          ] },
          { h: "Reducing the attack surface", list: [
            "Inventory internal and external assets, including shadow IT and cloud services.",
            "Remove unneeded services, ports, and accounts.",
            "Segment and restrict what remains reachable.",
            "Patch quickly and retire unsupported systems.",
            "Monitor external exposure continuously (attack surface management)."
          ] }
        ],
        keyTerms: [
          { term: "Threat Vector", def: "A path or method an attacker uses to reach a target." },
          { term: "Attack Surface", def: "The total set of points where an attacker could try to enter or extract data." },
          { term: "Client-Based Software", def: "Applications or agents installed on endpoints." },
          { term: "Agentless", def: "Managing, scanning, or using services without installing software on the target." },
          { term: "Managed Service Provider (MSP)", def: "A vendor that manages IT services for customers, often with privileged access." },
          { term: "Watering Hole Attack", def: "Compromising a website frequented by targets to infect visitors." },
          { term: "Typosquatting", def: "Registering misspelled domain names to exploit user typing mistakes." },
          { term: "Pretexting", def: "Using an invented scenario to obtain information or access." },
          { term: "Brand Impersonation", def: "Mimicking a trusted brand to deceive victims." },
          { term: "Open Service Port", def: "A network port with a listening service that is reachable by others." }
        ],
        analogy:
          "The attack surface is every door, window, vent, delivery slot, and phone line of a building. Vectors are the ways someone can come through each: a forged letter through the mail slot (message-based), a package with a hidden device (file or removable device), a phone call pretending to be the landlord (voice), the old back door nobody locks (unsupported system or default credentials), and the cleaning contractor with a master key (supply chain or MSP). Reducing the attack surface means removing doors you do not need and locking the rest.",
        technical:
          "A company maps its attack surface. It finds 14 externally reachable services it did not know about (open ports), an old file server with no vendor support, network cameras still using factory credentials, and an MSP technician account with broad access and no MFA. It closes ports, isolates the old server, rotates the camera credentials, and enforces MFA and time-limited access for the MSP. For people, it blocks macros in email attachments, adds link sandboxing, and trains staff on voice and SMS scams after a smishing attempt impersonated the payroll provider.",
        table: {
          headers: ["Vector", "Example", "Best control"],
          rows: [
            ["Message-based", "Phishing email with a malicious link", "Email security, user training"],
            ["Image-based", "QR code leading to a fake login", "Treat QR codes as links; URL inspection"],
            ["File-based", "Macro-enabled document", "Disable macros; sandbox attachments"],
            ["Voice call", "Fake IT support call", "Call-back verification"],
            ["Removable device", "USB drive left in a parking lot", "Device control; no unknown media"],
            ["Vulnerable software", "Unpatched client application", "Patch management and scanning"],
            ["Unsupported system", "Operating system out of support", "Replace or isolate"],
            ["Unsecure network", "Open Wi-Fi or Bluetooth pairing", "WPA3/802.1X, VPN, disable when unused"],
            ["Open service port", "Remote desktop exposed to the Internet", "Close or restrict; VPN or zero trust"],
            ["Default credentials", "Camera with admin/admin", "Change at install"],
            ["Supply chain / MSP", "Compromised vendor update or account", "Vendor assessment, least privilege, monitoring"],
            ["Human / social engineering", "Pretexting call to the help desk", "Verification procedures and training"]
          ]
        },
        confusion: [
          { a: "Attack vector", b: "Attack surface", diff: "A vector is one specific path. The attack surface is the sum of all possible paths." },
          { a: "Client-based", b: "Agentless", diff: "Client-based requires software installed on the endpoint. Agentless works without installing anything on the target." },
          { a: "Misinformation", b: "Disinformation", diff: "Both spread false information. Disinformation is deliberate; misinformation may be spread without intent to deceive." },
          { a: "Phishing", b: "Pretexting", diff: "Phishing uses fraudulent messages to trick people. Pretexting builds an invented scenario to obtain information, often by conversation." },
          { a: "Watering hole", b: "Typosquatting", diff: "A watering hole compromises a legitimate site the targets visit. Typosquatting relies on lookalike or misspelled domains." }
        ],
        soc: "Vector awareness guides detection: email gateway and proxy logs for message and file vectors, USB device events for removable media, external port scans against your own ranges, and monitoring of vendor and MSP accounts for abnormal activity. Attack surface findings feed vulnerability management priorities.",
        patterns: [
          ["Malicious link in an SMS message", "Smishing; message-based vector"],
          ["QR code leading to a fake login page", "Image-based vector"],
          ["Macro-enabled spreadsheet attachment", "File-based vector"],
          ["Unknown USB drive plugged in", "Removable device vector"],
          ["Management agent on laptops has a vulnerability", "Client-based vulnerable software"],
          ["Compromised MSP account used to reach many customers", "Supply chain vector"],
          ["Router still using its factory password", "Default credentials"],
          ["Website popular with employees is compromised to infect visitors", "Watering hole attack"]
        ],
        takeaways: [
          "Attack surface is the sum of all vectors; reduce it by inventory, removal, patching, and restriction.",
          "Match each vector to controls at technical, configuration, and human layers.",
          "Supply chain and MSP access deserve extra scrutiny because of their reach."
        ],
        remember: [
          "Vectors: message-based, image-based, file-based, voice call, removable device, vulnerable software (client-based vs agentless), unsupported systems, unsecure networks, open service ports, default credentials, supply chain (MSPs, vendors, suppliers), human/social engineering.",
          "Human vectors: phishing, vishing, smishing, mis/disinformation, impersonation, BEC, pretexting, watering hole, brand impersonation, typosquatting.",
          "Client-based software needs patching; agentless relies on network access and credentials.",
          "Close unneeded ports; change default credentials; retire unsupported systems.",
          "Treat QR codes and unknown removable media as untrusted.",
          "Limit and monitor vendor and MSP access.",
          "Reduce attack surface through inventory, removal, patching, and restriction."
        ],
        taglish:
          "Ang vector ay daan na ginagamit ng attacker; ang attack surface ay lahat ng posibleng daan. Mga vector: message-based (email, SMS, IM), image-based (QR code, nakakahamak na larawan), file-based (macro, PDF), voice call (vishing), removable device (USB), vulnerable software (client-based na naka-install o agentless), unsupported systems, unsecure networks (Wi-Fi, Bluetooth), open ports, default credentials, supply chain (MSP, vendor), at human vectors (phishing, pretexting, watering hole, typosquatting). Paliitin ang attack surface: mag-inventory, alisin ang hindi kailangan, mag-patch, at limitahan ang access."
      }
    ],

    d3: [
      {
        id: "d3-t181",
        title: "Architecture Trade-Offs: Availability, Resilience, Cost, Scalability, and the Inability to Patch",
        tag: "3.1",
        minutes: 22,
        goal: "Evaluate architecture models against the exam's considerations (availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, and compute) and choose the best fit for a scenario.",
        why: "Objective 3.1 asks you to compare models, not just define them. Questions describe constraints and ask which architecture or control fits, so you need to reason with trade-offs.",
        simple:
          "Every architecture choice trades one property for another, and the exam's list of CONSIDERATIONS is the checklist for reasoning about it. AVAILABILITY is how reliably a service stays up; RESILIENCE is the ability to withstand and recover from failures; COST covers purchase, operation, and staffing; RESPONSIVENESS is how quickly the system serves requests and adapts; SCALABILITY is the ability to grow or shrink capacity; EASE OF DEPLOYMENT is how quickly and simply new systems can be rolled out; RISK TRANSFERENCE is shifting some risk to another party, for example to a cloud provider by contract or through insurance; EASE OF RECOVERY is how quickly a system can be restored; PATCH AVAILABILITY asks whether the vendor provides fixes at all; the INABILITY TO PATCH describes systems that cannot be updated (embedded, industrial, medical, and legacy systems), which forces compensating controls; POWER concerns energy needs and supply, especially for remote or battery-powered devices; and COMPUTE concerns processing capacity, which limits what security software or cryptography a small device can run. These apply to the models you studied. ON-PREMISES gives maximum control and data locality, with high upfront cost, slower scaling, and full responsibility for patching and recovery. CLOUD (public, private, or hybrid) offers elasticity, fast deployment, and built-in redundancy and shifts some responsibility to the provider under the shared responsibility (responsibility) matrix, but adds dependence on third-party vendors and on correct customer configuration. HYBRID combines both and adds integration and consistency challenges. CENTRALIZED architectures are easier to manage and secure consistently but can be a single point of failure; DECENTRALIZED architectures distribute risk and improve local resilience but are harder to govern. Virtualization and containers raise efficiency and ease of deployment; serverless and microservices improve scalability but change what you secure; IoT, ICS/SCADA, RTOS, and embedded systems usually have limited compute and power, long lifespans, and an inability to patch, so isolation, segmentation, and monitoring replace endpoint agents and rapid updates. HIGH AVAILABILITY designs use redundancy, load balancing, and failover. There is rarely a perfect answer, so choose the design whose strengths match the stated priority and compensate for its weaknesses with controls.",
        deepDive: [
          { h: "Reading the considerations", list: [
            "Availability: uptime targets, redundancy, failover.",
            "Resilience: tolerance of component or site failures and speed of healing.",
            "Cost: capital versus operating expense, staffing, licensing.",
            "Responsiveness: latency, performance under load, ability to adapt.",
            "Scalability: elastic growth in cloud versus fixed capacity on premises.",
            "Ease of deployment: automation, templates, infrastructure as code.",
            "Risk transference: contracts, cloud responsibility, and insurance move financial or operational risk (not accountability).",
            "Ease of recovery: snapshots, backups, rebuild from code.",
            "Patch availability and inability to patch: drives compensating controls.",
            "Power and compute: constrain what is practical on small or remote devices."
          ] },
          { h: "Model comparison", list: [
            "On-premises: control and locality; cost, slower scale, own all patching.",
            "Public cloud: scale and speed; shared responsibility, configuration risk, vendor dependence.",
            "Private cloud: control with some cloud benefits; cost and management burden remain.",
            "Hybrid: flexibility; integration and consistent policy are harder.",
            "Centralized: consistent control; single point of failure.",
            "Decentralized: local resilience and autonomy; consistency and governance challenges.",
            "Containers and microservices: fast deployment and scaling; more components to secure.",
            "Serverless: no servers to patch; you secure code, permissions, and data."
          ] },
          { h: "Cloud responsibility matrix in brief", list: [
            "IaaS: provider secures hardware and virtualization; customer secures OS, applications, data, and identities.",
            "PaaS: provider also manages the platform and runtime; customer secures applications, data, and identities.",
            "SaaS: provider manages the application; customer secures data, access, and configuration.",
            "In all models, the customer remains accountable for data and access."
          ] },
          { h: "Systems that cannot be patched", list: [
            "Examples: embedded devices, medical equipment, industrial controllers, legacy applications, vendor-locked appliances.",
            "Controls: network segmentation or isolation, strict firewall rules, passive monitoring, allow lists, virtual patching, physical security, and planned replacement.",
            "Document the exception, owner, and review date."
          ] },
          { h: "Power and compute constraints", list: [
            "Battery-powered sensors cannot run heavy agents or complex cryptography; use lightweight protocols and gateways.",
            "Remote sites may need UPS and generators for continuity.",
            "Compute limits mean security must often be provided around the device (network controls) rather than on it."
          ] }
        ],
        keyTerms: [
          { term: "Availability", def: "The degree to which a service is accessible when needed." },
          { term: "Resilience", def: "The ability to withstand and recover from disruption." },
          { term: "Scalability", def: "The ability to increase or decrease capacity as demand changes." },
          { term: "Risk Transference", def: "Shifting some risk to another party through contracts, services, or insurance." },
          { term: "Ease of Recovery", def: "How quickly and reliably a system can be restored after failure." },
          { term: "Inability to Patch", def: "A condition where a system cannot be updated, requiring compensating controls." },
          { term: "Responsibility Matrix", def: "A model showing which security duties belong to the provider and which to the customer." },
          { term: "Hybrid Cloud", def: "A combination of on-premises and cloud environments." },
          { term: "Centralized Architecture", def: "A design where control and resources are concentrated in a single place." },
          { term: "Compute", def: "The processing capacity available on a device or platform." }
        ],
        analogy:
          "Choosing an architecture is like choosing how to run a restaurant. Owning your own building and kitchen gives total control but costs more and scales slowly (on-premises). Renting a ghost kitchen from a provider scales quickly and shares the burden of maintenance, but you rely on them and must still run your own recipes safely (cloud). One central kitchen is efficient but a single failure stops everything; several small kitchens survive local failures but are harder to keep consistent. An old oven you cannot repair (cannot patch) needs a fire guard standing by.",
        technical:
          "A hospital chooses an architecture for three systems. Its patient portal must scale during flu season and be reachable anywhere, so it uses a public cloud SaaS-style platform with the hospital securing identities and data and the provider handling the infrastructure. Its imaging devices cannot be patched and have a 15-year life, so they sit on an isolated segment with strict firewall rules and passive monitoring. Its core database needs low latency to on-site systems and strict control, so it remains on premises with a hot standby in a second data center, and its disaster recovery plan includes snapshots for quick recovery. Cyber insurance transfers part of the financial risk.",
        table: {
          headers: ["Requirement", "Architecture leaning", "Compensate for"],
          rows: [
            ["Rapid, elastic scaling", "Public cloud, containers, serverless", "Configuration risk, vendor dependence"],
            ["Maximum control and data locality", "On-premises or private cloud", "Cost, slower scaling, own patching"],
            ["Consistent central policy", "Centralized", "Single point of failure"],
            ["Survive local outages", "Decentralized or multi-site", "Governance consistency"],
            ["Cannot patch the device", "Isolation, segmentation, monitoring", "Document exception; plan replacement"],
            ["Limited power and compute", "Gateway-based security, lightweight crypto", "Less on-device protection"],
            ["Fast recovery", "Virtualization, snapshots, infrastructure as code", "Protect and test backups"],
            ["Shift some financial risk", "Cloud contracts, insurance", "You remain accountable for data"]
          ]
        },
        confusion: [
          { a: "Availability", b: "Resilience", diff: "Availability measures how often the service is up. Resilience is the ability to withstand and recover from failures." },
          { a: "Risk transference", b: "Risk elimination", diff: "Transference shifts some consequences to another party; accountability and residual risk remain with you." },
          { a: "Scalability", b: "High availability", diff: "Scalability is capacity growth. High availability is staying up despite failures." },
          { a: "Centralized", b: "Decentralized", diff: "Centralized concentrates control and resources, easing management but creating a single point of failure. Decentralized distributes them." },
          { a: "Inability to patch", b: "Patch availability", diff: "Patch availability asks whether the vendor offers fixes. Inability to patch describes systems that cannot apply them even if available." }
        ],
        soc: "Architecture decisions determine monitoring needs: cloud adds provider logs and identity events, unpatchable devices need network-based detection, decentralized sites require consistent log forwarding, and limited-compute devices must be watched through the network around them.",
        patterns: [
          ["Need to scale up quickly for seasonal demand", "Cloud elasticity"],
          ["Medical device cannot be patched", "Isolate and segment; compensating controls"],
          ["Need strict control and low latency locally", "On-premises"],
          ["Provider handles infrastructure; you secure data and identities", "Cloud responsibility matrix"],
          ["Cyber insurance reduces financial exposure", "Risk transference"],
          ["Battery-powered sensors cannot run security agents", "Compute and power constraints; use network controls"],
          ["One site failure takes down everything", "Centralized single point of failure"],
          ["Rebuild quickly from code", "Ease of recovery via infrastructure as code"]
        ],
        takeaways: [
          "Every architecture trades properties; choose by the stated priority and compensate for weaknesses.",
          "Cloud shifts some responsibility, never all of it.",
          "When you cannot patch or run agents, secure around the device."
        ],
        remember: [
          "Considerations: availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, compute.",
          "On-premises = control; cloud = scale and speed with shared responsibility; hybrid = both with integration effort.",
          "Centralized = consistent but single point of failure; decentralized = resilient but harder to govern.",
          "Risk transference shifts consequences, not accountability.",
          "Cannot patch: isolate, segment, monitor, document the exception.",
          "Limited compute and power: lightweight protocols and network-based protection.",
          "Customer always owns data and access security."
        ],
        taglish:
          "Bawat disenyo ay may kapalit. Mga konsiderasyon: availability, resilience, gastos, bilis ng tugon, scalability, dali ng deployment, risk transference (paglilipat ng panganib sa iba, hal. cloud o insurance, pero ikaw pa rin ang may pananagutan), dali ng recovery, patch availability, kawalan ng kakayahang mag-patch, kuryente, at compute. On-premises: kontrolado mo pero mahal at mabagal lumaki. Cloud: mabilis at elastic pero may shared responsibility. Kapag hindi ma-patch ang device, ihiwalay, i-segment, at bantayan sa network."
      },
      {
        id: "d3-t182",
        title: "Methods to Secure Data: Geographic Restrictions, Encryption, Hashing, Masking, Tokenization, Obfuscation, Segmentation, and Permissions",
        tag: "3.3",
        minutes: 20,
        goal: "Choose the right data protection method for a scenario and explain how each method works and what it does not do.",
        why: "Objective 3.3 lists eight methods to secure data. The exam describes a goal such as 'reduce PCI scope' or 'prevent access from outside the country' and expects the matching method.",
        simple:
          "Data can be protected in several ways, and each fits a different goal. GEOGRAPHIC RESTRICTIONS limit where data may be stored, processed, or accessed from, using data residency rules, geofencing, and geo-blocking of access by country or region; they address sovereignty laws and reduce exposure to threats from certain regions, but location can be disguised by VPNs. ENCRYPTION makes data unreadable without a key and protects it at rest, in transit, and in some cases in use; it protects confidentiality but does not control who with the key can access it, and keys must be protected. HASHING creates a one-way fingerprint that verifies integrity and stores passwords safely; it does not allow recovery of the original. MASKING replaces real values with fake or partial ones so that people and systems that do not need the real data see only the masked version (for example showing the last four digits or creating a sanitized test database). TOKENIZATION replaces a sensitive value with a random token and stores the real value in a separate secure vault, which removes real data from most systems and reduces compliance scope. OBFUSCATION makes data or code harder to understand or reverse (for example scrambling code), which slows attackers but is not strong protection by itself. SEGMENTATION separates data stores and the networks that reach them, so a breach of one area does not expose everything and high-value data lives in tightly controlled zones. PERMISSION RESTRICTIONS apply access controls such as ACLs, role-based access, least privilege, and need-to-know so only authorized identities can read or change data. To choose, start with the goal. Keep data in a legal region: geographic restrictions. Make stolen data unreadable: encryption. Prove it was not altered, or store passwords: hashing. Show only part of the value to staff or developers: masking. Remove real card numbers from the application: tokenization. Slow reverse engineering: obfuscation. Contain the blast radius: segmentation. Control who can access: permission restrictions. Real programs layer several, for example encrypting a database, restricting access by role, segmenting it, masking it for support staff, and logging access. Data states matter: at rest, in transit, and in use each need appropriate controls, and data classification determines how strict they must be.",
        deepDive: [
          { h: "Geographic restrictions and related terms", list: [
            "Data residency: requirements that data be stored in a particular country or region.",
            "Data sovereignty: data is subject to the laws of the country where it is located.",
            "Geofencing: policies that allow or block actions based on a defined geographic boundary.",
            "Geolocation: determining a device or user's location, used in access decisions and logging.",
            "Limits: IP-based location can be spoofed; combine with identity and device checks."
          ] },
          { h: "Encryption, hashing, masking, tokenization at a glance", list: [
            "Encryption: reversible with a key; protects confidentiality.",
            "Hashing: one-way; verifies integrity; password storage with salt and slow hashing.",
            "Masking: shows fake or partial data; usually not reversible; good for display and testing.",
            "Tokenization: random token replaces the value; real value in a vault; good for payment data."
          ] },
          { h: "Obfuscation, segmentation, and permissions", list: [
            "Obfuscation: raises effort for attackers or reverse engineers; not a replacement for real controls.",
            "Segmentation: separate networks, databases, and tenants so a breach is contained.",
            "Permission restrictions: ACLs, roles, attributes, least privilege, and need-to-know, with regular access reviews."
          ] },
          { h: "Choosing by scenario", list: [
            "A developer needs realistic data without real customers: masking (a sanitized copy).",
            "A web shop wants to avoid storing card numbers: tokenization.",
            "A laptop might be lost: full-disk encryption.",
            "A regulator requires EU data to stay in the EU: geographic restrictions and residency.",
            "Check that a downloaded file is unchanged: hashing.",
            "Limit the damage if one server is breached: segmentation.",
            "Only HR should see salary records: permission restrictions."
          ] },
          { h: "Combining methods", p: "No single method covers everything. For example, a payment system uses tokenization to remove card numbers from most systems, encryption for the vault and database, segmentation to keep the vault in a restricted network zone, permission restrictions for the few who can detokenize, hashing for integrity checks and password storage, and geographic restrictions to meet data residency rules. Data classification tells you how many layers are required." }
        ],
        keyTerms: [
          { term: "Geographic Restriction", def: "Limiting where data can be stored, processed, or accessed based on location." },
          { term: "Data Residency", def: "A requirement that data be stored in a specific country or region." },
          { term: "Geofencing", def: "Allowing or blocking activity based on geographic boundaries." },
          { term: "Encryption", def: "Transforming data so it is unreadable without a key." },
          { term: "Hashing", def: "Creating a one-way fixed-length digest of data." },
          { term: "Masking", def: "Replacing real data with fake or partial values for display or testing." },
          { term: "Tokenization", def: "Replacing a sensitive value with a token while the real value is stored in a vault." },
          { term: "Obfuscation", def: "Making data or code deliberately difficult to understand." },
          { term: "Segmentation", def: "Separating systems or data to contain breaches." },
          { term: "Permission Restriction", def: "Limiting access rights to authorized identities and actions." }
        ],
        analogy:
          "Protecting a valuable document uses different tools for different jobs. Geographic restrictions are keeping it in a vault within a certain country. Encryption is sealing it in a locked box. Hashing is a tamper-evident seal. Masking is a photocopy with names blacked out. Tokenization is giving people a numbered ticket and keeping the real document in the vault. Obfuscation is writing it in a confusing style. Segmentation is putting it in a separate wing. Permission restrictions are the list of who may open the vault.",
        technical:
          "An online retailer protects customer data. Card numbers are tokenized by a payment processor, so the retailer's systems store only tokens. The remaining customer database is encrypted, sits in a segmented network zone, and is reachable only by the application and a small DBA group (permission restrictions). Support agents see masked emails and partial phone numbers. The development team works from a sanitized masked copy. EU customer records are stored in an EU region to meet residency rules, and file hashes are checked on each deployment to confirm integrity.",
        table: {
          headers: ["Goal", "Method"],
          rows: [
            ["Keep data within a country or region", "Geographic restrictions / data residency"],
            ["Make stolen data unreadable", "Encryption"],
            ["Verify data has not changed; store passwords", "Hashing (with salt for passwords)"],
            ["Show only part of a value", "Masking"],
            ["Remove real card numbers from systems", "Tokenization"],
            ["Make reverse engineering harder", "Obfuscation"],
            ["Limit breach impact", "Segmentation"],
            ["Control who can read or modify", "Permission restrictions (ACLs, RBAC, least privilege)"]
          ]
        },
        confusion: [
          { a: "Masking", b: "Tokenization", diff: "Masking hides or alters displayed data and is usually not reversible. Tokenization substitutes a token and can be reversed only through the vault." },
          { a: "Encryption", b: "Hashing", diff: "Encryption is reversible with a key and protects confidentiality. Hashing is one-way and verifies integrity." },
          { a: "Obfuscation", b: "Encryption", diff: "Obfuscation only makes data harder to understand. Encryption cryptographically protects it with a key." },
          { a: "Geographic restriction", b: "Segmentation", diff: "Geographic restriction concerns location. Segmentation concerns separation of systems and data regardless of location." },
          { a: "Data residency", b: "Data sovereignty", diff: "Residency is where data is stored. Sovereignty is which country's laws apply to it." }
        ],
        soc: "Monitoring follows the controls: alerts for access from blocked regions, bulk reads from a tokenization vault, encryption key access, and permission changes on sensitive stores. Masking and tokenization reduce the sensitivity of data that analysts see in logs and tickets.",
        patterns: [
          ["Data must stay in the EU", "Geographic restrictions / data residency"],
          ["Show only the last four digits of an account number", "Masking"],
          ["Replace card numbers with random values stored in a vault", "Tokenization"],
          ["Lost laptop must not expose data", "Encryption"],
          ["Verify file integrity after download", "Hashing"],
          ["Only HR may read salary data", "Permission restrictions"],
          ["A breach of one system must not expose all data", "Segmentation"],
          ["Make source code harder to analyze", "Obfuscation"]
        ],
        takeaways: [
          "Start with the goal and pick the method that achieves it.",
          "Layer methods; none covers every risk alone.",
          "Classification determines how many layers are required."
        ],
        remember: [
          "Methods: geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions.",
          "Encryption = confidentiality (reversible with key). Hashing = integrity (one-way).",
          "Masking = fake or partial values. Tokenization = token plus vault; reduces PCI scope.",
          "Obfuscation slows analysis but is not strong security.",
          "Segmentation contains breaches; permissions control access.",
          "Residency = where stored; sovereignty = whose laws apply.",
          "Protect data in all states: at rest, in transit, in use."
        ],
        taglish:
          "Piliin ang paraan batay sa layunin. Dapat manatili sa isang bansa ang data: geographic restrictions. Gawing hindi mabasa ang nakaw na data: encryption. Patunayang hindi nabago: hashing. Ipakita lang ang bahagi ng value: masking. Alisin ang totoong card number sa sistema: tokenization. Pahirapan ang reverse engineering: obfuscation. Limitahan ang pinsala ng breach: segmentation. Kontrolin kung sino ang makaka-access: permission restrictions. Karaniwan, pinagsasama-sama ang ilang paraan."
      }
    ]
  },

  tips: {
    "d2-t184": "Read the clue and map it: quotes or SQL keywords = injection, ../ = traversal, captured token works again = replay, hidden request riding a logged-in session = CSRF, weaker protocol negotiated = downgrade, two inputs same hash = collision (birthday is the faster method), copied badge = RFID cloning.",
    "d2-t185": "For any 'how did the attacker arrive' question, name the vector (message, image, file, voice, removable device, software, unsupported system, network, open port, default credentials, supply chain, human). Then pick the control that closes that exact path. Client-based means installed; agentless means nothing installed.",
    "d3-t181": "State the priority first (scale, control, uptime, cost, recovery) and pick the model that favors it. Cloud shifts some responsibility but never accountability for data. If a device cannot be patched or run agents, the answer is isolation, segmentation, and monitoring around it.",
    "d3-t182": "Match the verb to the method: keep in region = geographic, make unreadable = encryption, prove unchanged = hashing, show partially = masking, replace with a vault reference = tokenization, slow understanding = obfuscation, limit blast radius = segmentation, restrict who = permissions."
  },

  summaries: {
    "d2-t184": "Attacks are easiest to recognize by layer: injection, overflow, replay, forgery, and traversal in applications; downgrade, collision, and birthday attacks on cryptography; brute force, RFID cloning, and environmental sabotage physically; and DDoS, DNS, wireless, and on-path attacks on networks.",
    "d2-t185": "A threat vector is the path an attacker uses and the attack surface is all of them: messages, images, files, voice calls, removable devices, vulnerable and unsupported software, unsecure networks, open ports, default credentials, the supply chain, and people.",
    "d3-t181": "Architecture choices trade availability, resilience, cost, scalability, deployment ease, risk transference, recovery, and patchability against each other, so you choose by stated priority and compensate for gaps such as devices that cannot be patched.",
    "d3-t182": "Data is protected by geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, and permission restrictions, each suited to a different goal and best used in layers."
  },

  questions: [
    {
      id: "q-x-d2-21", domainId: "d2", tag: "d2-t184", type: "single",
      prompt: "An attacker captures a valid authentication token from network traffic and submits it again a day later to gain access. Which attack is this?",
      choices: [
        { id: "a", text: "Replay attack" },
        { id: "b", text: "Birthday attack" },
        { id: "c", text: "Directory traversal" },
        { id: "d", text: "Buffer overflow" }
      ],
      correct: "a",
      explanation: "Resubmitting a previously captured valid message or token is a replay attack, mitigated by nonces, timestamps, and short-lived tokens.",
      distractorExplanations: {
        b: "A birthday attack finds hash collisions using probability.",
        c: "Directory traversal uses path sequences to reach unauthorized files.",
        d: "A buffer overflow writes beyond a memory buffer's bounds."
      }
    },
    {
      id: "q-x-d2-22", domainId: "d2", tag: "d2-t184", type: "single",
      prompt: "A web request contains the string ../../../etc/passwd in a file parameter and the server returns the file. Which attack succeeded?",
      choices: [
        { id: "a", text: "Directory traversal" },
        { id: "b", text: "Cross-site scripting" },
        { id: "c", text: "Downgrade attack" },
        { id: "d", text: "RFID cloning" }
      ],
      correct: "a",
      explanation: "Path sequences such as ../ that reach files outside the intended directory indicate directory traversal.",
      distractorExplanations: {
        b: "Cross-site scripting injects script into pages viewed by other users.",
        c: "A downgrade attack forces a weaker protocol or cipher.",
        d: "RFID cloning copies proximity badge data."
      }
    },
    {
      id: "q-x-d2-23", domainId: "d2", tag: "d2-t185", type: "single",
      prompt: "An employee scans a QR code on a poster and is taken to a fake login page that steals credentials. Which threat vector is this?",
      choices: [
        { id: "a", text: "Image-based vector" },
        { id: "b", text: "Removable device" },
        { id: "c", text: "Default credentials" },
        { id: "d", text: "Open service port" }
      ],
      correct: "a",
      explanation: "QR codes are images that can lead to malicious sites, making this an image-based vector.",
      distractorExplanations: {
        b: "A removable device vector involves physical media such as USB drives.",
        c: "Default credentials involve factory-set logins on devices.",
        d: "An open service port is a reachable network service, not a poster."
      }
    },
    {
      id: "q-x-d2-24", domainId: "d2", tag: "d2-t185", type: "single",
      prompt: "An attacker compromises a managed service provider's administrator account and uses it to access many of the provider's customers. Which vector is this?",
      choices: [
        { id: "a", text: "Supply chain" },
        { id: "b", text: "Voice call" },
        { id: "c", text: "Open service port" },
        { id: "d", text: "File-based" }
      ],
      correct: "a",
      explanation: "Reaching many customers through a provider or vendor with privileged access is a supply chain vector.",
      distractorExplanations: {
        b: "Voice call vectors use phone calls for social engineering.",
        c: "An open service port is an exposed network service rather than a provider relationship.",
        d: "File-based vectors deliver malicious files such as documents or archives."
      }
    },
    {
      id: "q-x-d3-19", domainId: "d3", tag: "d3-t181", type: "single",
      prompt: "A company needs to quickly increase capacity during seasonal demand and pay only for what it uses. Which architecture feature BEST meets this need?",
      choices: [
        { id: "a", text: "Cloud elasticity (scalability)" },
        { id: "b", text: "Air-gapped on-premises servers" },
        { id: "c", text: "A single centralized server" },
        { id: "d", text: "Embedded RTOS devices" }
      ],
      correct: "a",
      explanation: "Cloud platforms allow capacity to scale up and down on demand with usage-based billing.",
      distractorExplanations: {
        b: "Air-gapped on-premises servers are hard to scale quickly and are not pay-as-you-go.",
        c: "A single server is a bottleneck and single point of failure.",
        d: "Embedded RTOS devices are fixed-function and do not provide elastic capacity."
      }
    },
    {
      id: "q-x-d3-20", domainId: "d3", tag: "d3-t181", type: "single",
      prompt: "An industrial controller cannot be patched and cannot run endpoint security software. Which approach is MOST appropriate?",
      choices: [
        { id: "a", text: "Isolate it on a segmented network with strict firewall rules and passive monitoring" },
        { id: "b", text: "Connect it directly to the Internet for vendor support" },
        { id: "c", text: "Install a full desktop antivirus agent anyway" },
        { id: "d", text: "Ignore it because it cannot be patched" }
      ],
      correct: "a",
      explanation: "When a device cannot be patched or run agents, compensating controls such as segmentation, filtering, and network-based monitoring protect it.",
      distractorExplanations: {
        b: "Direct Internet exposure greatly increases risk for unpatchable devices.",
        c: "The scenario says it cannot run endpoint software.",
        d: "Ignoring a known limitation leaves the risk unmanaged."
      }
    },
    {
      id: "q-x-d3-21", domainId: "d3", tag: "d3-t182", type: "single",
      prompt: "A regulation requires that customer data be stored only within a particular region. Which method addresses this requirement?",
      choices: [
        { id: "a", text: "Geographic restrictions (data residency)" },
        { id: "b", text: "Hashing" },
        { id: "c", text: "Obfuscation" },
        { id: "d", text: "Tokenization" }
      ],
      correct: "a",
      explanation: "Geographic restrictions and data residency controls keep data within permitted locations.",
      distractorExplanations: {
        b: "Hashing provides integrity verification, not location control.",
        c: "Obfuscation makes data harder to understand but does not control where it is stored.",
        d: "Tokenization replaces values with tokens and does not by itself determine storage location."
      }
    },
    {
      id: "q-x-d3-22", domainId: "d3", tag: "d3-t182", type: "single",
      prompt: "A support team needs to see only the last four digits of customers' phone numbers. Which method is BEST?",
      choices: [
        { id: "a", text: "Data masking" },
        { id: "b", text: "Full-disk encryption" },
        { id: "c", text: "Hashing the phone numbers" },
        { id: "d", text: "Geofencing" }
      ],
      correct: "a",
      explanation: "Masking shows partial or fake values so users who do not need the full data see only what they require.",
      distractorExplanations: {
        b: "Full-disk encryption protects stored data but would not limit what authorized users see.",
        c: "Hashing is one-way and would not display the last four digits.",
        d: "Geofencing restricts access by location and does not alter displayed values."
      }
    }
  ],

  glossary: [
    { term: "Downgrade Attack", domain: "d2", plain: "Forcing a connection to use a weaker, older security setting.", technical: "An attack that causes parties to negotiate a weaker protocol version or cipher than they support.", example: "Forcing a connection back to SSL 3.0." },
    { term: "Birthday Attack", domain: "d2", plain: "A shortcut for finding two things with the same hash.", technical: "A collision attack exploiting the birthday paradox to find hash collisions with far less work than brute force.", example: "Finding two documents with matching hashes." },
    { term: "Collision", domain: "d2", plain: "Two different inputs giving the same hash.", technical: "A condition in which two distinct inputs produce identical hash outputs, weakening integrity guarantees.", example: "Two files with the same MD5 hash." },
    { term: "RFID Cloning", domain: "d2", plain: "Copying a badge so a duplicate works.", technical: "Reading and replicating the data of a proximity credential to create a working copy.", example: "A copied access badge opening a server room." },
    { term: "Watering Hole Attack", domain: "d2", plain: "Hacking a website your targets visit.", technical: "Compromising a site frequented by a target group in order to infect visitors.", example: "A trade association site serving malware." },
    { term: "Risk Transference", domain: "d3", plain: "Shifting some of the risk to someone else.", technical: "Moving some consequences of a risk to another party through contracts, services, or insurance.", example: "Buying cyber insurance." },
    { term: "Data Residency", domain: "d3", plain: "Rules about which country data is stored in.", technical: "A requirement that data be stored in a specified geographic location.", example: "EU data kept in an EU data center." },
    { term: "Geofencing", domain: "d3", plain: "Allowing or blocking things based on where you are.", technical: "A control that permits or denies actions based on a defined geographic boundary.", example: "Blocking logins from outside approved countries." }
  ],

  acronyms: [
    { acro: "ASLR", expansion: "Address Space Layout Randomization", meaning: "A defense that randomizes memory addresses to make exploitation harder." },
    { acro: "DEP", expansion: "Data Execution Prevention", meaning: "A defense that prevents code from running in data memory regions." },
    { acro: "SSRF", expansion: "Server-Side Request Forgery", meaning: "An attack that makes a server send unintended requests, often to internal resources." },
    { acro: "HSTS", expansion: "HTTP Strict Transport Security", meaning: "A policy that forces browsers to use HTTPS and helps prevent downgrade attacks." },
    { acro: "MSP", expansion: "Managed Service Provider", meaning: "A vendor that manages IT services for customers." }
  ]
});
