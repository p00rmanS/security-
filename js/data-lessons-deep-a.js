/* In-depth lessons, part A (Domains 1-3). Loaded after data-lessons-extra.js.
   Registers a bundle on globalThis.__DEEP; data-lessons-deep-b.js (loaded
   next) adds Domains 4-5 and merges every bundle into the app's globals.

   These lessons use two optional fields the renderer supports:
     deepDive: [{ h, p?, list? }]   "Going deeper" sub-sections
     patterns: [[clue, answer]]     "Exam patterns: clue to answer" table */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d1: [
      {
        id: "d1-t8",
        title: "Encryption in Depth: Symmetric, Asymmetric, Modes, and Key Exchange",
        tag: "1.4",
        minutes: 22,
        goal: "Compare symmetric and asymmetric algorithms, explain why real systems combine them, and recognize block cipher modes, Diffie-Hellman key exchange, and perfect forward secrecy.",
        why: "The cryptography lesson gives you the vocabulary; this one gives you the mechanics the exam actually probes: which algorithm fits which job, why ECB is bad, why TLS uses both kinds of keys, and what 'forward secrecy' buys you.",
        simple:
          "Encryption comes in two families. SYMMETRIC encryption uses ONE shared secret key to both encrypt and decrypt. It is fast, so it protects bulk data: files, disks, VPN tunnels, the body of a web session. AES is the modern standard (128-bit blocks, with 128, 192, or 256-bit keys). Older algorithms such as DES (56-bit key) and 3DES are obsolete. Symmetric encryption has one big weakness, key distribution: both sides must somehow get the same secret safely, and the number of keys explodes as people are added (n people who each need a private channel with everyone else need n(n-1)/2 keys). ASYMMETRIC encryption uses a mathematically linked KEY PAIR: whatever one key does, only the other can undo. The public key can be shared openly; the private key never leaves its owner. It is far slower, so it is used for small jobs: exchanging keys, proving identity with digital signatures, and certificates. RSA (security based on the difficulty of factoring large numbers, 2048-bit keys or more) and ECC (elliptic curve cryptography, which gives equal strength with much smaller keys, ideal for phones and IoT) are the two to know. Because each family covers the other's weakness, real protocols use a HYBRID approach: TLS uses asymmetric cryptography to authenticate the server and agree on a session key, then switches to fast symmetric encryption for the actual data. The agreement step usually uses Diffie-Hellman (or its elliptic curve form, ECDHE), a method that lets two parties build a shared secret over an open network without ever sending it. When the Diffie-Hellman values are EPHEMERAL (freshly generated per session), the protocol gains PERFECT FORWARD SECRECY: even if the server's long-term private key is stolen later, recorded past sessions still cannot be decrypted.",
        deepDive: [
          { h: "Block ciphers and their modes", p: "AES is a block cipher: it encrypts fixed 128-bit blocks, and the MODE decides how blocks are chained together. The mode matters as much as the algorithm." },
          { h: "The modes you should recognize", list: [
            "ECB (Electronic Codebook): each block is encrypted independently, so identical plaintext blocks produce identical ciphertext. Patterns survive (the famous encrypted-image penguin still looks like a penguin). Never use it for real data.",
            "CBC (Cipher Block Chaining): each block is mixed with the previous ciphertext block, using a random initialization vector (IV) for the first. Hides patterns, but gives no integrity protection and has padding pitfalls.",
            "CTR (Counter): turns a block cipher into a stream cipher by encrypting an incrementing counter. Fast and parallelizable.",
            "GCM (Galois/Counter Mode): counter mode plus built-in authentication. It is AEAD (authenticated encryption with associated data), giving confidentiality AND integrity in one step. This is what modern TLS prefers."
          ] },
          { h: "Stream ciphers and the IV rule", p: "A stream cipher (such as ChaCha20) encrypts a continuous stream one bit or byte at a time using a keystream. Whatever the cipher, the IV or nonce must be unique for every message under the same key; reusing it can expose the plaintext. The IV does not have to be secret, only unpredictable or unique, depending on the mode." },
          { h: "Why RSA keys are bigger than ECC keys", p: "Breaking RSA means factoring a huge number, which has faster attacks than the best known attacks on elliptic-curve math. So a 256-bit ECC key gives roughly the strength of a 3072-bit RSA key. Smaller keys mean less CPU, less battery, and less bandwidth, which is why ECC dominates mobile and IoT." },
          { h: "Diffie-Hellman in one picture", p: "Each side picks a private number, publishes a value derived from it, and combines the other's public value with their own private number. Both arrive at the same shared secret; an eavesdropper who sees only the public values cannot easily compute it. Plain Diffie-Hellman does NOT authenticate anyone, so on its own it is open to an on-path (man-in-the-middle) attack; protocols pair it with certificates or signatures." },
          { h: "The quantum footnote", p: "A large quantum computer running Shor's algorithm would break RSA, ECC, and Diffie-Hellman. Grover's algorithm only roughly halves the effective strength of symmetric keys, so AES-256 remains comfortable. This is why post-quantum cryptography is being standardized, and why the exam mentions it." }
        ],
        keyTerms: [
          { term: "Symmetric Encryption", def: "One shared key encrypts and decrypts. Fast; used for bulk data. Example: AES." },
          { term: "Asymmetric Encryption", def: "A linked public/private key pair. Slower; used for key exchange, signatures, and certificates. Examples: RSA, ECC." },
          { term: "AES", def: "Advanced Encryption Standard: symmetric block cipher with 128-bit blocks and 128/192/256-bit keys." },
          { term: "ECC", def: "Elliptic Curve Cryptography: asymmetric algorithm giving equal strength to RSA with much smaller keys." },
          { term: "Diffie-Hellman", def: "A key agreement method that creates a shared secret over an insecure channel. It does not authenticate by itself." },
          { term: "Perfect Forward Secrecy", def: "Using ephemeral session keys (DHE/ECDHE) so a later compromise of the long-term key cannot decrypt past sessions." },
          { term: "AEAD", def: "Authenticated Encryption with Associated Data (such as AES-GCM): confidentiality and integrity together." },
          { term: "IV / Nonce", def: "A per-message value that makes identical plaintexts encrypt differently. Must not be reused with the same key." },
          { term: "Hybrid Encryption", def: "Using asymmetric crypto to exchange a session key, then symmetric crypto for the data." }
        ],
        analogy:
          "Symmetric encryption is one padlock key copied for everyone who needs in: fast to use, but you must get the copies to people safely. Asymmetric encryption is a mailbox: anyone can drop a letter in (public key) but only the owner has the key to open it (private key). Hybrid encryption is using the mailbox once to deliver a copy of a fast padlock key, then using the padlock for everything else. Forward secrecy is using a brand-new padlock for every conversation and melting it afterward.",
        technical:
          "When a browser connects to a bank over TLS 1.3, the server presents a certificate, the two sides run an ephemeral elliptic-curve Diffie-Hellman exchange (ECDHE) and sign the handshake to prove identity, and both derive a session key. All page data then flows under AES-256-GCM, which both hides the content and detects any tampering. A year later, an attacker who steals the bank's private key and holds a recording of the traffic still cannot decrypt it, because the session keys were ephemeral and are gone: that is forward secrecy.",
        table: {
          headers: ["Algorithm", "Type", "Typical key size", "Used for", "Status"],
          rows: [
            ["AES", "Symmetric block", "128 / 192 / 256", "Bulk data, disks, VPNs, TLS", "Current standard"],
            ["3DES", "Symmetric block", "112 effective", "Legacy systems", "Deprecated"],
            ["DES", "Symmetric block", "56", "None today", "Broken"],
            ["ChaCha20", "Symmetric stream", "256", "TLS on mobile, VPNs", "Current"],
            ["RSA", "Asymmetric", "2048+", "Key exchange, signatures, certificates", "Current (quantum-vulnerable)"],
            ["ECC / ECDSA", "Asymmetric", "256+", "Mobile, IoT, TLS, signatures", "Current (quantum-vulnerable)"],
            ["Diffie-Hellman / ECDHE", "Key agreement", "2048+ / 256+", "Session key establishment", "Current; use ephemeral"]
          ]
        },
        confusion: [
          { a: "Symmetric", b: "Asymmetric", diff: "Symmetric = one shared key, fast, bulk data, key distribution problem. Asymmetric = key pair, slow, solves key distribution and enables signatures." },
          { a: "ECB mode", b: "CBC / GCM mode", diff: "ECB encrypts every block independently so patterns leak. CBC chains blocks with an IV. GCM adds authentication so tampering is detected." },
          { a: "Diffie-Hellman", b: "RSA", diff: "Diffie-Hellman only AGREES on a shared secret; it does not encrypt data or sign. RSA can encrypt small data and sign. Both appear in TLS handshakes." },
          { a: "Perfect forward secrecy", b: "Long key length", diff: "Longer keys resist brute force. Forward secrecy limits the damage of a FUTURE key theft by making every session key independent and disposable." },
          { a: "Encryption", b: "Encoding (Base64)", diff: "Encoding is reversible by anyone with no key and provides no security. Encryption needs a key." }
        ],
        soc: "Analysts care about crypto mostly through its failures: traffic still using TLS 1.0, certificates with weak keys, or servers offering export-grade ciphers show up in scan reports and are exploited by downgrade attacks. A server without forward secrecy matters in a breach investigation: if its private key was stolen, recorded traffic may be readable after the fact.",
        patterns: [
          ["Fast encryption of large amounts of data / full-disk encryption", "AES (symmetric)"],
          ["Smaller keys with equal strength, battery-powered devices", "ECC"],
          ["Two parties need a shared secret over an untrusted network", "Diffie-Hellman (key exchange)"],
          ["Identical plaintext blocks produce identical ciphertext", "ECB mode weakness"],
          ["Confidentiality and integrity in one mode", "GCM (AEAD)"],
          ["Past sessions stay safe even if the server's key is stolen later", "Perfect forward secrecy (ephemeral DHE/ECDHE)"],
          ["Key distribution is the problem; n(n-1)/2 keys", "Symmetric encryption"],
          ["Which key do I use to send a secret to Alice?", "Alice's PUBLIC key"]
        ],
        takeaways: [
          "Symmetric is fast and used for data; asymmetric solves key distribution and enables signatures; protocols combine both.",
          "Mode matters: ECB leaks patterns, CBC hides them, GCM also authenticates.",
          "Ephemeral key exchange gives perfect forward secrecy."
        ],
        remember: [
          "Symmetric = 1 shared key, FAST, bulk data (AES). Asymmetric = key pair, SLOW, key exchange and signatures (RSA, ECC).",
          "n people with pairwise symmetric keys need n(n-1)/2 keys.",
          "TLS is hybrid: asymmetric to authenticate and agree on a key, symmetric for the data.",
          "ECC gives the same strength as RSA with far smaller keys (good for mobile and IoT).",
          "Diffie-Hellman agrees on a secret; it does NOT authenticate, so it needs certificates or signatures.",
          "ECB is bad (patterns leak). GCM = encryption + integrity (AEAD).",
          "Forward secrecy = ephemeral session keys, so a stolen long-term key cannot decrypt old sessions.",
          "DES and 3DES are obsolete. Quantum computers threaten RSA/ECC, not AES-256."
        ],
        taglish:
          "Ang symmetric encryption, isang susi lang para sa pag-lock at pag-unlock, kaya mabilis. Gamit ito sa malalaking data (AES). Ang problema, paano mo ibibigay ang susi nang ligtas? Ang asymmetric, may pares ng susi (public at private), mabagal pero nasosolusyunan ang key distribution. Kaya sa TLS, pinagsasama: asymmetric muna para magkasundo sa session key, tapos symmetric na para sa data. Ang forward secrecy, bagong susi bawat session, kaya kahit manakaw ang pangmatagalang private key ng server, hindi na mababasa ang mga lumang recorded sessions. At tandaan: iwasan ang ECB mode, kasi lumalabas pa rin ang pattern ng data."
      }
    ],

    d2: [
      {
        id: "d2-t14",
        title: "Malware in Depth: Types, Persistence, and Response",
        tag: "2.4",
        minutes: 22,
        goal: "Identify each malware family by its behavior, explain how malware survives a reboot (persistence), and choose the right detection and response step.",
        why: "Malware questions are scenario-based: a short description of behavior, and you must name the type or the next step. Knowing the behavioral difference between a virus, worm, trojan, rootkit, logic bomb, and fileless attack is what separates a right answer from a near miss.",
        simple:
          "Malware is any software built to harm, spy on, or take control of a system. The most useful way to sort it is by behavior. A VIRUS attaches itself to a legitimate file and spreads only when a person runs that file. A WORM spreads on its own across the network with no user action, which makes it fast and dangerous. A TROJAN pretends to be something useful, and a RAT (remote access trojan) gives the attacker hands-on control. RANSOMWARE encrypts data (or locks the system) and demands payment; modern gangs also steal the data first and threaten to publish it (double extortion). SPYWARE quietly collects information, and a KEYLOGGER records keystrokes to capture passwords. A ROOTKIT hides the malware (and itself) by operating deep in the operating system, a driver, or firmware, so normal tools cannot see it. A LOGIC BOMB sits dormant until a condition is met, such as a date or an employee's account being disabled, and is a classic insider tool. A BOTNET is a group of infected machines taking orders from a command-and-control server, used for DDoS and spam. CRYPTOJACKING secretly uses your CPU or GPU to mine cryptocurrency, and a WIPER simply destroys data. FILELESS malware avoids writing files to disk and instead lives in memory and abuses built-in tools such as PowerShell and WMI (living off the land), which defeats signature-based antivirus. To keep working after a reboot, malware needs PERSISTENCE: registry Run keys, scheduled tasks, startup folders, new services, WMI subscriptions, or cron jobs on Linux. Defense is layered: patching, email filtering, application allowlisting, EDR with behavioral detection, least privilege, and tested offline backups.",
        deepDive: [
          { h: "Spread: how each family travels", list: [
            "Virus: needs a host file and a user action (opening an attachment, running a program).",
            "Worm: scans for vulnerable hosts and copies itself over the network; no user action. Often exploits an unpatched service.",
            "Trojan: delivered by trickery (cracked software, fake updates, malicious attachments); does not self-replicate.",
            "Drive-by and malvertising: a compromised or ad-supplied web page exploits the browser.",
            "Supply chain: legitimate software or an update channel is poisoned before it reaches you."
          ] },
          { h: "Evading detection", list: [
            "Polymorphic malware changes its own code each time it spreads so signatures do not match.",
            "Metamorphic malware rewrites its entire structure.",
            "Packers and obfuscation hide the real payload until runtime.",
            "Fileless techniques leave almost nothing on disk to scan.",
            "Rootkits hide processes, files, and network connections from the operating system's own tools."
          ] },
          { h: "Common persistence locations", list: [
            "Windows: HKCU/HKLM Run and RunOnce registry keys, scheduled tasks, Startup folder, services, WMI event subscriptions, DLL hijacking.",
            "Linux/macOS: cron jobs, systemd services, shell profile files, launch agents.",
            "Boot level: bootkits and firmware implants, which survive even an operating system reinstall."
          ] },
          { h: "Response steps for a suspected infection", list: [
            "Isolate the host from the network (EDR isolation or unplug) to stop spread and command-and-control.",
            "Preserve evidence: capture memory first if you can, because fileless malware and keys live there (order of volatility).",
            "Identify scope: hash the sample, search for the same indicators on other hosts.",
            "Eradicate and recover: for rootkits and firmware, reimage or restore from a known-good backup rather than trusting a cleanup.",
            "Lessons learned: close the entry point (patch, filter, training) and update detections."
          ] },
          { h: "Ransomware specifics", p: "Backups are the best recovery, but only if they are offline or immutable; ransomware hunts for connected backups. Follow the 3-2-1 rule (3 copies, 2 media types, 1 offsite). Paying does not guarantee decryption and funds the attackers, so policy usually discourages it, and legal and law-enforcement contact is part of the response. Also assume data theft and trigger breach-notification analysis." }
        ],
        keyTerms: [
          { term: "Virus", def: "Malware attached to a host file; spreads when a user runs the infected file." },
          { term: "Worm", def: "Self-replicating malware that spreads across networks without user action." },
          { term: "Trojan / RAT", def: "Malware disguised as legitimate software; a RAT gives the attacker remote control." },
          { term: "Ransomware", def: "Malware that encrypts or locks data and demands payment; often paired with data theft (double extortion)." },
          { term: "Rootkit", def: "Malware that hides itself and other malware by operating at kernel, driver, or firmware level." },
          { term: "Logic Bomb", def: "Malicious code that triggers only when a specified condition is met, often planted by an insider." },
          { term: "Fileless Malware", def: "Malware that runs in memory and abuses built-in tools, leaving little on disk." },
          { term: "Persistence", def: "Techniques that let malware survive reboots and logoffs." },
          { term: "Botnet", def: "A network of infected machines controlled through command and control." },
          { term: "Cryptojacking", def: "Secretly using a victim's processing power to mine cryptocurrency." },
          { term: "Wiper", def: "Malware designed to destroy data rather than steal or ransom it." }
        ],
        analogy:
          "A virus is a germ that only spreads when you shake someone's hand; a worm is an airborne illness that spreads on its own through the whole building. A trojan is the gift-wrapped box with a burglar inside. A rootkit is the burglar who also rewires the security cameras so they show an empty room. A logic bomb is a booby-trapped drawer that only goes off when a particular person opens it on a particular day.",
        technical:
          "An analyst is alerted to a finance PC whose CPU sits at 95 percent while the user is idle. EDR shows powershell.exe launching from a scheduled task named 'Updater' and making outbound connections to an unfamiliar domain every 60 seconds. There is no suspicious file on disk: the payload is loaded in memory (fileless), the scheduled task is the persistence mechanism, and the steady connections are command-and-control beaconing. The team isolates the host, captures memory, hunts for the same task name and domain across the fleet, and reimages the machine.",
        table: {
          headers: ["Type", "Key trait", "Needs user action?", "Typical clue in a question"],
          rows: [
            ["Virus", "Attaches to a host file", "Yes", "Spread by opening an infected file"],
            ["Worm", "Self-replicates over the network", "No", "Spread rapidly with no user interaction"],
            ["Trojan / RAT", "Disguised as legitimate", "Yes (installs it)", "Looked like a useful tool; remote control"],
            ["Ransomware", "Encrypts data for payment", "Often (phishing)", "Files renamed, ransom note"],
            ["Rootkit", "Hides at kernel/firmware level", "No (after install)", "Tools show nothing, yet behavior is wrong"],
            ["Logic bomb", "Triggers on a condition", "No", "Fired on a date or after an account was removed"],
            ["Fileless", "Lives in memory, abuses PowerShell/WMI", "Often", "No file found; antivirus saw nothing"],
            ["Cryptojacking", "Mines coins with your CPU", "No", "High CPU, slow systems, electricity use"]
          ]
        },
        confusion: [
          { a: "Virus", b: "Worm", diff: "A virus needs a host file and a user to run it. A worm spreads by itself over the network." },
          { a: "Trojan", b: "Virus", diff: "A trojan does not replicate; it relies on deception to get installed. A virus replicates by infecting files." },
          { a: "Rootkit", b: "Backdoor", diff: "A rootkit's job is hiding. A backdoor's job is giving the attacker a way back in. Malware often has both." },
          { a: "Logic bomb", b: "Time bomb", diff: "A time bomb is a logic bomb whose condition is a date or time. Logic bomb is the broader term (any trigger)." },
          { a: "Antivirus (signature)", b: "EDR (behavioral)", diff: "Signature scanning misses new, polymorphic, and fileless malware. EDR watches behavior such as unusual PowerShell activity and can isolate the host." }
        ],
        soc: "Typical alerts: a spike in file modifications and renamed extensions (ransomware), a workstation beaconing to a rare domain on a regular interval (botnet or RAT), antivirus disabled or tampered with, unexpected scheduled tasks or Run keys, and sustained high CPU on idle servers (cryptojacking). Good analysts pivot from one indicator to fleet-wide hunts for the same hash, domain, or persistence artifact.",
        patterns: [
          ["Spread across the network without user interaction", "Worm"],
          ["Attached to a legitimate file; user opened it", "Virus"],
          ["Looked like legitimate software but gave remote control", "Trojan / RAT"],
          ["Fired when an employee's account was disabled / on a certain date", "Logic bomb"],
          ["Antivirus finds nothing; PowerShell running from memory", "Fileless malware"],
          ["Tools report a clean system but behavior is abnormal", "Rootkit"],
          ["High CPU, no business reason, mining traffic", "Cryptojacking"],
          ["Data encrypted and stolen, threat to publish", "Ransomware (double extortion)"],
          ["Malware reappears after reboot", "Persistence mechanism"]
        ],
        takeaways: [
          "Classify malware by behavior: how it spreads, how it hides, what it does.",
          "Persistence is how malware survives a reboot; find and remove it, not just the payload.",
          "For rootkits and firmware malware, rebuild from a known-good source."
        ],
        remember: [
          "Virus = needs a host file + user action. Worm = spreads on its own.",
          "Trojan = deception. RAT = remote control. Rootkit = hides itself. Logic bomb = waits for a trigger.",
          "Fileless malware lives in memory and abuses PowerShell/WMI; signature antivirus often misses it.",
          "Persistence = Run keys, scheduled tasks, services, startup folders, cron, WMI.",
          "Ransomware defense: offline or immutable backups (3-2-1). Double extortion = encrypt AND steal.",
          "First response: isolate the host; capture memory before power-off when possible.",
          "Rootkit or firmware infection: reimage or restore, do not trust a cleanup.",
          "Polymorphic malware changes its code to dodge signatures; behavioral EDR catches it."
        ],
        taglish:
          "Hatiin natin ayon sa kilos. Ang virus, kailangan ng host file at ng user na magbubukas. Ang worm, kusang kumakalat sa network, walang kailangang i-click. Ang trojan, nagpapanggap na kapaki-pakinabang. Ang rootkit, nagtatago, kaya malinis daw ang scan pero may mali. Ang logic bomb, naghihintay ng kondisyon (petsa, o kapag tinanggal ang account ng empleyado). Ang fileless malware, nasa memory lang at gumagamit ng PowerShell, kaya hindi nahuhuli ng simpleng antivirus. Kapag may infection: i-isolate muna ang host, kunin ang memory, tapos hanapin kung saan pa kumalat. At para sa ransomware, ang pinakamabisa ay offline na backup."
      },
      {
        id: "d2-t15",
        title: "Credential Attacks: Brute Force, Spraying, Stuffing, and Pass-the-Hash",
        tag: "2.4",
        minutes: 20,
        goal: "Distinguish password attacks by their pattern in the logs, explain how stolen hashes and Kerberos tickets are abused, and choose the control that stops each one.",
        why: "Stolen credentials are the most common way into a network, and exam questions often show a log pattern or short story and ask which attack it is. The patterns are distinct once you know what to look for.",
        simple:
          "Attackers go after credentials in several ways, and each leaves a different trail. In a BRUTE-FORCE attack the attacker tries every possible combination against one account; it is slow online (lockout and throttling stop it) but fast offline against a stolen hash file. A DICTIONARY attack tries a list of likely passwords, and a HYBRID attack adds mutations such as 'Summer2024!' to each word. PASSWORD SPRAYING flips the approach: try a small number of very common passwords (like 'Welcome1') against MANY accounts, slowly, so that no single account hits the lockout threshold. CREDENTIAL STUFFING takes username and password pairs leaked in an earlier breach and replays them against other sites, betting on password reuse. RAINBOW TABLES are precomputed hash-to-password lookups for cracking stolen unsalted hashes, which is why salting matters. Some attacks never crack anything at all. In PASS-THE-HASH the attacker takes a captured NTLM hash and presents it directly to authenticate, then moves laterally from machine to machine. KERBEROASTING requests service tickets for accounts with service names and cracks them offline, while a GOLDEN TICKET attack forges a Kerberos ticket-granting ticket after stealing the krbtgt account secret, giving near-unlimited access. Other routes include phishing, shoulder surfing, keylogging, and default or shared passwords on devices. The strongest single defense is multi-factor authentication, backed by throttling and lockout, breached-password screening, long passphrases (current NIST guidance favors length and screening over forced complexity and routine rotation), unique salted and stretched hashes, and restricting where privileged credentials are ever used.",
        deepDive: [
          { h: "Online versus offline attacks", p: "An ONLINE attack must submit each guess to the live system, so the defender can throttle, lock, and log it. An OFFLINE attack happens after the attacker has stolen a hash database; there is no lockout and no logging, only the attacker's hardware speed. That is why protecting the hash file and using slow, salted hashing (bcrypt, PBKDF2) is critical." },
          { h: "Recognizing each attack in logs", list: [
            "Brute force: thousands of failures against ONE account in a short time (Windows event 4625 repeated, possibly ending in 4740 account lockout).",
            "Password spraying: one or a few failures spread across MANY accounts from the same source, often paced to stay under the lockout threshold.",
            "Credential stuffing: mostly valid usernames, failures from many distributed IPs, a few successes (4624) that look like normal logins.",
            "Pass-the-hash: a successful logon with no preceding password prompt, often NTLM network logons moving between hosts.",
            "Kerberoasting: a burst of service-ticket requests (event 4769) for many service accounts, often with weak RC4 encryption."
          ] },
          { h: "Why spraying beats lockout", p: "Lockout policies count failures per account. Spraying makes one attempt per account per round, so no account ever locks. Detecting it means counting failures per SOURCE or per password across accounts, which is what a SIEM correlation rule is for." },
          { h: "Defenses that actually matter", list: [
            "MFA, ideally phishing-resistant (FIDO2/passkeys), makes a stolen password insufficient.",
            "Rate limiting, account lockout, and CAPTCHA for online attacks.",
            "Screen new passwords against known-breached lists; encourage password managers and unique passwords per site.",
            "Salt and stretch stored hashes; never store reversible or unsalted passwords.",
            "Against pass-the-hash and ticket attacks: limit admin logons to dedicated tiered admin workstations, enable Credential Guard, randomize local admin passwords (LAPS), restrict NTLM, use long random passwords for service accounts, and rotate the krbtgt secret after a compromise."
          ] }
        ],
        keyTerms: [
          { term: "Brute Force", def: "Trying every possible password combination, usually against one account." },
          { term: "Dictionary / Hybrid Attack", def: "Trying likely words, optionally with common mutations such as appended numbers or symbols." },
          { term: "Password Spraying", def: "Trying a few common passwords against many accounts to avoid lockout." },
          { term: "Credential Stuffing", def: "Replaying username/password pairs from previous breaches against other services." },
          { term: "Rainbow Table", def: "A precomputed table of hashes and their passwords, defeated by salting." },
          { term: "Pass-the-Hash", def: "Authenticating with a captured password hash instead of the password." },
          { term: "Kerberoasting", def: "Requesting service tickets and cracking them offline to recover service account passwords." },
          { term: "Golden Ticket", def: "A forged Kerberos TGT created after stealing the krbtgt account's secret." },
          { term: "Account Lockout", def: "Temporarily disabling an account after a set number of failed logons." }
        ],
        analogy:
          "Brute force is trying every key on a giant ring on ONE door. Spraying is trying the same single most-likely key on EVERY door in the building, one try each, so no door's alarm trips. Stuffing is using keys copied from a burglary at another building, hoping people reuse the same lock. Pass-the-hash is stealing the badge itself instead of guessing the PIN: the reader never asks for the PIN.",
        technical:
          "A SOC sees 600 failed logons overnight: one failure each against 600 different accounts, all trying the password 'Spring2025!' from a single external address. No account locked out. That is password spraying. The team blocks the source, forces resets on the few accounts that succeeded, enables MFA on the portal, and adds a SIEM rule that alerts when one source fails against more than ten distinct accounts in an hour.",
        table: {
          headers: ["Attack", "Accounts targeted", "Passwords tried", "Stopped by"],
          rows: [
            ["Brute force", "One", "Every combination", "Lockout, throttling, long passwords"],
            ["Dictionary / hybrid", "One", "Likely words and mutations", "Lockout, breached-password screening"],
            ["Spraying", "Many", "A few common ones", "MFA, per-source detection, banned-password list"],
            ["Credential stuffing", "Many", "Real leaked pairs", "MFA, unique passwords, breach monitoring"],
            ["Rainbow table", "Offline hashes", "Precomputed", "Salting, stretching"],
            ["Pass-the-hash", "Many (lateral)", "None (uses the hash)", "Credential Guard, tiering, LAPS, restrict NTLM"]
          ]
        },
        confusion: [
          { a: "Password spraying", b: "Brute force", diff: "Spraying = few passwords across MANY accounts. Brute force = MANY passwords against ONE account." },
          { a: "Credential stuffing", b: "Password spraying", diff: "Stuffing replays real leaked username/password pairs. Spraying guesses common passwords without knowing any real credentials." },
          { a: "Online attack", b: "Offline attack", diff: "Online guesses go to the live system and can be throttled and logged. Offline cracking runs against stolen hashes with no lockout." },
          { a: "Pass-the-hash", b: "Cracking a hash", diff: "Cracking recovers the plaintext password. Pass-the-hash never recovers it; it replays the hash directly." }
        ],
        soc: "Credential attacks are mostly found by correlation, not single events: one source touching many accounts, impossible travel, a successful login immediately after many failures, or a service account authenticating from a workstation it has never used. Good response includes forcing resets, revoking active sessions and tokens, and checking what the account did after login.",
        patterns: [
          ["Thousands of attempts against one account, then lockout", "Brute force"],
          ["One attempt per account, same password, many accounts", "Password spraying"],
          ["Valid pairs from a different company's breach", "Credential stuffing"],
          ["Cracking stolen hashes with precomputed lookups", "Rainbow table (defeat with salt)"],
          ["Authenticated without ever knowing the password; lateral movement", "Pass-the-hash"],
          ["Service tickets requested then cracked offline", "Kerberoasting"],
          ["Forged TGT after krbtgt compromise", "Golden ticket"],
          ["Best single control against all of the above", "Multi-factor authentication"]
        ],
        takeaways: [
          "Learn each attack by its log pattern: one account, many accounts, real leaked pairs, or replayed hashes.",
          "Spraying is designed to evade lockout; detect it by counting per source.",
          "MFA plus salted, stretched hashes and tiered admin practices address most of the list."
        ],
        remember: [
          "Brute force: many passwords, ONE account. Spraying: few passwords, MANY accounts.",
          "Credential stuffing uses REAL leaked credentials and relies on password reuse.",
          "Rainbow tables are defeated by salting. Offline cracking has no lockout.",
          "Pass-the-hash reuses the hash; no cracking needed. Kerberoasting cracks service tickets offline.",
          "Lockout does not stop spraying. MFA does.",
          "Windows event IDs worth knowing: 4625 failed logon, 4624 success, 4740 lockout.",
          "NIST guidance: favor length and breached-password screening over forced complexity and frequent rotation.",
          "After a credential compromise: reset passwords, revoke sessions/tokens, and review what the account did."
        ],
        taglish:
          "Pagkakaiba-iba lang ng pattern ang kailangan mong tandaan. Brute force: sobrang daming password sa isang account. Spraying: iilang pangkaraniwang password (halimbawa 'Welcome1') pero sa maraming account, para hindi ma-lockout ang bawat isa. Stuffing: totoong username at password na na-leak sa ibang site, kasi madalas ginagamit ulit ang password. Pass-the-hash: hindi na hinuhulaan ang password, ginagamit na lang ang nakaw na hash. Ang pinakamabisang panlaban sa karamihan nito ay MFA, dagdag pa ang salted na hash at pag-limit kung saan nagla-log in ang mga admin."
      }
    ],

    d3: [
      {
        id: "d3-t17",
        title: "Securing the Switch: Port Security, 802.1X, DHCP Snooping, and BPDU Guard",
        tag: "3.2",
        minutes: 20,
        goal: "Match each Layer 2 attack to the switch feature that stops it, and explain how 802.1X port-based authentication works.",
        why: "Most perimeter thinking ignores the access switch, but attackers who plug in or compromise an internal device attack Layer 2 directly. Questions pair an attack (rogue DHCP, ARP spoofing, MAC flooding) with a control, and expect you to know which feature is which.",
        simple:
          "A switch forwards traffic by MAC address, and its default behavior trusts every device that plugs in. Several features close that gap. PORT SECURITY limits which and how many MAC addresses may use a port; if an unknown device appears, the port can drop the traffic, log it, or shut down (err-disabled). It also defends against MAC flooding, where an attacker overflows the switch's address table so it starts broadcasting traffic everyone can sniff. 802.1X is PORT-BASED NETWORK ACCESS CONTROL: a device (the supplicant) must authenticate through the switch (the authenticator) to an authentication server, usually RADIUS using EAP, before the port passes normal traffic. DHCP SNOOPING marks switch ports as trusted (where legitimate DHCP servers live) or untrusted (everything else), blocking rogue DHCP servers and building a table of valid IP-to-MAC-to-port bindings. DYNAMIC ARP INSPECTION (DAI) uses that table to drop forged ARP replies, defeating ARP spoofing and many on-path attacks. IP SOURCE GUARD blocks traffic from IP addresses not in the table. For Spanning Tree Protocol (STP), which prevents switching loops, BPDU GUARD shuts down a port that receives BPDUs where none should arrive (such as an end-user port), stopping an attacker from injecting a rogue switch or becoming the root bridge; ROOT GUARD protects the intended root. Loop protection and STORM CONTROL stop broadcast storms from taking the network down. VLAN HOPPING, where an attacker reaches other VLANs by negotiating a trunk or using double 802.1Q tags, is stopped by disabling auto-trunking, setting access ports explicitly, and not using the native VLAN for user traffic. Finally, basic hygiene: shut down unused ports and move them to an isolated, unused VLAN.",
        deepDive: [
          { h: "802.1X step by step", list: [
            "A device connects to a switch port. The port starts in a restricted state that only allows authentication traffic (EAPOL).",
            "The switch (authenticator) asks the device (supplicant) for credentials or a certificate.",
            "The switch relays the request to the authentication server (RADIUS) using EAP.",
            "If accepted, the server can also assign the device to a specific VLAN, and the port opens.",
            "If rejected, the device stays blocked or is placed in a guest or quarantine VLAN."
          ] },
          { h: "Port security violation modes", list: [
            "Protect: drops traffic from unknown MACs silently.",
            "Restrict: drops traffic and logs or alerts.",
            "Shutdown: disables the port (err-disabled) until an administrator re-enables it."
          ] },
          { h: "How DHCP snooping, DAI, and IP source guard fit together", p: "DHCP snooping watches legitimate DHCP exchanges on trusted ports and records each binding (IP, MAC, port, VLAN). DAI and IP source guard then use that table as the source of truth: an ARP reply or packet whose IP-to-MAC mapping does not match the table is dropped. One feature builds the truth; the other two enforce it." },
          { h: "Two layers of attack, two layers of control", p: "Layer 2 attacks come from INSIDE the network. They are invisible to firewalls at the perimeter, which is why switch hardening is part of defense in depth and why 802.1X plus NAC (which also checks a device's health or posture) is a core zero trust building block." }
        ],
        keyTerms: [
          { term: "Port Security", def: "A switch feature that limits the MAC addresses allowed on a port and defines what happens on a violation." },
          { term: "802.1X", def: "IEEE standard for port-based network access control: authenticate before the port is opened." },
          { term: "Supplicant / Authenticator / Authentication Server", def: "The device, the switch or access point, and the RADIUS server in an 802.1X exchange." },
          { term: "DHCP Snooping", def: "Blocks rogue DHCP servers by trusting only designated ports and recording valid bindings." },
          { term: "Dynamic ARP Inspection (DAI)", def: "Drops ARP packets whose IP-to-MAC mapping does not match the DHCP snooping table." },
          { term: "BPDU Guard", def: "Shuts down a port that receives spanning-tree BPDUs where none are expected." },
          { term: "MAC Flooding", def: "Overflowing the switch's MAC table so it floods traffic out all ports, enabling sniffing." },
          { term: "VLAN Hopping", def: "Reaching another VLAN by exploiting trunk negotiation or double tagging." },
          { term: "Storm Control", def: "Limits broadcast, multicast, or unknown traffic to prevent a broadcast storm." }
        ],
        analogy:
          "The switch is a building's front desk. Port security is a guest list per door (only these badges). 802.1X is a guard who checks ID before unlocking the door at all. DHCP snooping is a rule that only the official reception desk may hand out room numbers. DAI is a guard who checks that anyone claiming 'I'm room 5' really is in room 5. BPDU guard is the alarm that rings when someone plugs a second front desk into the wall.",
        technical:
          "A visitor plugs a laptop into a conference-room wall jack and tries to run a rogue DHCP server to hand out a malicious default gateway. DHCP snooping marks that port untrusted and drops the rogue offers. The visitor then tries ARP spoofing against the real gateway; DAI drops the forged replies. Because the jack is also configured for 802.1X, the laptop never received more than the guest VLAN in the first place.",
        table: {
          headers: ["Attack or problem", "Switch control"],
          rows: [
            ["Unauthorized device plugs in", "802.1X + NAC; port security"],
            ["MAC flooding / CAM table overflow", "Port security (limit MACs)"],
            ["Rogue DHCP server", "DHCP snooping (untrusted ports)"],
            ["ARP spoofing / poisoning", "Dynamic ARP Inspection"],
            ["Spoofed source IP addresses", "IP Source Guard"],
            ["Rogue switch / STP manipulation", "BPDU Guard, Root Guard"],
            ["Broadcast storm / loop", "STP, storm control, loop protection"],
            ["VLAN hopping", "Disable DTP/auto-trunking, explicit access ports, unused native VLAN"],
            ["Unused ports used as an entry point", "Shut down and place in an isolated VLAN"]
          ]
        },
        confusion: [
          { a: "Port security", b: "802.1X", diff: "Port security controls WHICH MAC addresses may use a port (identity by MAC, easily spoofed). 802.1X authenticates the device or user with credentials or certificates before opening the port." },
          { a: "DHCP snooping", b: "DAI", diff: "DHCP snooping stops rogue DHCP servers and builds the binding table. DAI uses that table to stop forged ARP replies." },
          { a: "BPDU Guard", b: "Root Guard", diff: "BPDU Guard disables an edge port that receives ANY BPDU. Root Guard lets a port receive BPDUs but refuses to let it become the path to a better root bridge." },
          { a: "MAC flooding", b: "MAC spoofing", diff: "Flooding overflows the table with many fake MACs so the switch acts like a hub. Spoofing impersonates one specific MAC address." }
        ],
        soc: "Switch logs reveal Layer 2 attacks: a port going err-disabled from a port-security violation, a burst of denied ARP or DHCP packets from one port, or BPDU guard shutting down an end-user port. Each tells you the physical port, which maps to a room, a desk, or a jack, and that is what makes physical investigation possible.",
        patterns: [
          ["A rogue device hands out IP addresses", "DHCP snooping"],
          ["Forged ARP replies redirect traffic", "Dynamic ARP Inspection"],
          ["Switch starts acting like a hub; attacker can sniff", "MAC flooding; port security"],
          ["Only authenticated devices may use the wall jack", "802.1X"],
          ["Edge port receives spanning-tree messages", "BPDU Guard"],
          ["Reach another VLAN with double 802.1Q tags", "VLAN hopping; disable auto-trunking"],
          ["Authentication server for 802.1X", "RADIUS"],
          ["Check device health before granting network access", "NAC (posture assessment)"]
        ],
        takeaways: [
          "Layer 2 attacks come from inside the network, so switches need their own controls.",
          "DHCP snooping builds the truth; DAI and IP source guard enforce it.",
          "802.1X authenticates before the port opens, usually with RADIUS and EAP."
        ],
        remember: [
          "802.1X: supplicant (device) - authenticator (switch/AP) - authentication server (RADIUS, uses EAP).",
          "Port security = limit MACs per port. It stops MAC flooding.",
          "DHCP snooping = trusted vs untrusted ports; blocks rogue DHCP servers; builds the binding table.",
          "DAI = drops forged ARP using that table. IP Source Guard = drops spoofed source IPs.",
          "BPDU Guard = disable an edge port that receives BPDUs (stops rogue switches).",
          "VLAN hopping defense: disable DTP, set ports to access mode explicitly, avoid the native VLAN for users.",
          "Shut down unused ports; put them in an isolated VLAN."
        ],
        taglish:
          "Ang switch, sa default, nagtitiwala sa kahit anong device na isasaksak mo. Kaya may mga proteksyon: Port security, limitado ang MAC address kada port. 802.1X, kailangan munang mag-authenticate bago bumukas ang port (gumagamit ng RADIUS). DHCP snooping, ang trusted na port lang ang pwedeng magbigay ng IP, kaya hindi uubra ang rogue DHCP server. Ang DAI, gamit ang talaan ng DHCP snooping, hinaharang nito ang pekeng ARP. Ang BPDU guard, kapag may nag-plug ng sariling switch sa edge port, shutdown agad ang port. Tandaan din na patayin ang mga hindi ginagamit na port."
      }
    ]
  },

  tips: {
    "d1-t8": "Match the key to the job: 'one shared key' or 'bulk data' = symmetric (AES). 'Key pair', 'signature', 'certificate' = asymmetric. If a question says encryption should also detect tampering, the mode is GCM, and if it says patterns in identical blocks are visible, the weakness is ECB.",
    "d2-t14": "Read the spread and the hide: spreads alone = worm, needs a click = virus or trojan, hides from tools = rootkit, waits for a trigger = logic bomb, nothing on disk = fileless. Then pick the response: isolate first, rebuild if it is a rootkit or firmware.",
    "d2-t15": "Count accounts and passwords: one account, many passwords = brute force. Many accounts, one password = spraying. Real leaked pairs = stuffing. If the attacker never learns the password, think pass-the-hash. MFA is almost always the best single answer.",
    "d3-t17": "Memorize attack-to-feature pairs: rogue DHCP = DHCP snooping, forged ARP = DAI, MAC flood = port security, rogue switch = BPDU Guard, 'must authenticate before the port works' = 802.1X with RADIUS."
  },

  summaries: {
    "d1-t8": "Symmetric encryption is fast and protects data, asymmetric encryption solves key exchange and signing, real protocols like TLS combine them, and ephemeral key exchange gives forward secrecy.",
    "d2-t14": "Malware is best sorted by behavior: how it spreads, how it hides, how it survives a reboot, and what it does; response starts with isolating the host and rebuilding when rootkits are involved.",
    "d2-t15": "Brute force, spraying, stuffing, and pass-the-hash each leave a different pattern in the logs, and MFA with salted hashes and tiered admin practices stops most of them.",
    "d3-t17": "Switches trust every device by default, so port security, 802.1X, DHCP snooping, DAI, and BPDU guard each close a specific Layer 2 attack path from inside the network."
  },

  questions: [
    {
      id: "q-x-d1-5", domainId: "d1", tag: "d1-t8", type: "single",
      prompt: "A security architect needs to encrypt large volumes of data on file servers with minimal performance impact. Which type of algorithm is MOST appropriate?",
      choices: [
        { id: "a", text: "Symmetric, such as AES" },
        { id: "b", text: "Asymmetric, such as RSA" },
        { id: "c", text: "A hashing algorithm, such as SHA-256" },
        { id: "d", text: "Diffie-Hellman key exchange" }
      ],
      correct: "a",
      explanation: "Symmetric algorithms are fast and are used for bulk data encryption. Asymmetric algorithms are far slower and are reserved for key exchange and signatures.",
      distractorExplanations: {
        b: "RSA is too slow for large volumes of data and is normally used to protect small values such as keys.",
        c: "Hashing is one-way and cannot be decrypted, so it does not protect data you need to read later.",
        d: "Diffie-Hellman establishes a shared secret; it does not encrypt data."
      }
    },
    {
      id: "q-x-d1-6", domainId: "d1", tag: "d1-t8", type: "single",
      prompt: "A company wants assurance that if its web server's private key is stolen next year, previously recorded encrypted sessions still cannot be decrypted. Which feature provides this?",
      choices: [
        { id: "a", text: "Perfect forward secrecy using ephemeral key exchange" },
        { id: "b", text: "Using a longer RSA key" },
        { id: "c", text: "Switching from AES-128 to AES-256" },
        { id: "d", text: "Enabling ECB mode" }
      ],
      correct: "a",
      explanation: "Perfect forward secrecy uses ephemeral session keys (DHE/ECDHE) that are discarded after each session, so a later theft of the long-term key cannot unlock recorded traffic.",
      distractorExplanations: {
        b: "A longer key resists brute force but does not stop a stolen key from decrypting past sessions in a non-ephemeral exchange.",
        c: "Stronger symmetric keys do not change how the session key was established.",
        d: "ECB is a weak mode that leaks patterns; it has nothing to do with forward secrecy."
      }
    },
    {
      id: "q-x-d2-3", domainId: "d2", tag: "d2-t14", type: "single",
      prompt: "A disgruntled administrator's account is disabled, and shortly afterward, a script they left behind deletes the company's customer database. Which type of malware does this describe?",
      choices: [
        { id: "a", text: "Logic bomb" },
        { id: "b", text: "Worm" },
        { id: "c", text: "Rootkit" },
        { id: "d", text: "Cryptojacker" }
      ],
      correct: "a",
      explanation: "A logic bomb stays dormant until a condition is met, here the account being disabled, and then performs its malicious action.",
      distractorExplanations: {
        b: "A worm self-replicates across a network; nothing in the scenario describes spreading.",
        c: "A rootkit hides malicious activity; the scenario is about a triggered action.",
        d: "Cryptojacking secretly mines cryptocurrency and does not delete databases."
      }
    },
    {
      id: "q-x-d2-4", domainId: "d2", tag: "d2-t14", type: "single",
      prompt: "An EDR alert shows PowerShell running entirely in memory and calling out to an unfamiliar domain every minute. Antivirus scans found no malicious files. Which type of malware is MOST likely?",
      choices: [
        { id: "a", text: "Fileless malware" },
        { id: "b", text: "A boot sector virus" },
        { id: "c", text: "Adware" },
        { id: "d", text: "A logic bomb" }
      ],
      correct: "a",
      explanation: "Fileless malware runs in memory and abuses built-in tools such as PowerShell, which is why file-based antivirus scans miss it.",
      distractorExplanations: {
        b: "A boot sector virus infects the boot area and would typically be found by boot-level scanning.",
        c: "Adware shows unwanted advertising; it does not match in-memory command-and-control beaconing.",
        d: "A logic bomb waits for a trigger condition; the scenario shows steady beaconing."
      }
    },
    {
      id: "q-x-d2-5", domainId: "d2", tag: "d2-t15", type: "single",
      prompt: "Logs show a single source IP made one failed login attempt against each of 800 accounts using the password 'Winter2025!'. No accounts were locked out. What type of attack is this?",
      choices: [
        { id: "a", text: "Password spraying" },
        { id: "b", text: "Brute force" },
        { id: "c", text: "Credential stuffing" },
        { id: "d", text: "Pass-the-hash" }
      ],
      correct: "a",
      explanation: "Trying one common password across many accounts, paced to avoid lockout, is password spraying.",
      distractorExplanations: {
        b: "Brute force tries many passwords against one account, which would trigger lockout.",
        c: "Credential stuffing replays real username/password pairs from a prior breach, not one guessed password.",
        d: "Pass-the-hash reuses a captured hash and involves no password guessing."
      }
    },
    {
      id: "q-x-d2-6", domainId: "d2", tag: "d2-t15", type: "single",
      prompt: "An attacker captures an NTLM hash from one workstation and uses it to authenticate to file servers without ever learning the plaintext password. Which attack is this?",
      choices: [
        { id: "a", text: "Pass-the-hash" },
        { id: "b", text: "Rainbow table attack" },
        { id: "c", text: "Dictionary attack" },
        { id: "d", text: "Shoulder surfing" }
      ],
      correct: "a",
      explanation: "In pass-the-hash the attacker authenticates directly with a stolen hash and never needs the plaintext password.",
      distractorExplanations: {
        b: "A rainbow table attack looks up hashes to recover passwords, which the scenario says never happened.",
        c: "A dictionary attack guesses passwords from a word list.",
        d: "Shoulder surfing is observing someone entering credentials."
      }
    },
    {
      id: "q-x-d3-3", domainId: "d3", tag: "d3-t17", type: "single",
      prompt: "A visitor connects a laptop to a wall jack and starts sending forged ARP replies to redirect traffic through their machine. Which switch feature would BEST block this?",
      choices: [
        { id: "a", text: "Dynamic ARP Inspection" },
        { id: "b", text: "BPDU Guard" },
        { id: "c", text: "Storm control" },
        { id: "d", text: "A screened subnet" }
      ],
      correct: "a",
      explanation: "DAI validates ARP packets against the DHCP snooping binding table and drops forged replies.",
      distractorExplanations: {
        b: "BPDU Guard protects against rogue spanning-tree messages, not ARP forgery.",
        c: "Storm control limits broadcast floods; it does not validate ARP contents.",
        d: "A screened subnet isolates public-facing servers and does not secure internal switch ports."
      }
    },
    {
      id: "q-x-d3-4", domainId: "d3", tag: "d3-t17", type: "single",
      prompt: "A company wants a device to authenticate with a certificate to a RADIUS server before a switch port passes any normal traffic. Which standard should be implemented?",
      choices: [
        { id: "a", text: "802.1X" },
        { id: "b", text: "802.11ac" },
        { id: "c", text: "802.3af" },
        { id: "d", text: "802.1Q" }
      ],
      correct: "a",
      explanation: "802.1X provides port-based network access control, authenticating the supplicant through the authenticator to an authentication server such as RADIUS.",
      distractorExplanations: {
        b: "802.11ac is a Wi-Fi standard and not a port authentication mechanism.",
        c: "802.3af defines Power over Ethernet.",
        d: "802.1Q defines VLAN tagging, not authentication."
      }
    }
  ],

  glossary: [
    { term: "Perfect Forward Secrecy", domain: "d1", plain: "Using throwaway session keys so old recordings stay safe even if a key is stolen later.", technical: "A property of ephemeral key exchange (DHE/ECDHE) in which compromise of a long-term private key does not compromise past session keys.", example: "TLS using ECDHE for every browsing session." },
    { term: "AES-GCM", domain: "d1", plain: "A fast encryption mode that also detects tampering.", technical: "Galois/Counter Mode: an AEAD mode combining counter-mode encryption with authentication.", example: "The cipher suite most modern HTTPS connections use." },
    { term: "Elliptic Curve Cryptography", domain: "d1", plain: "Strong encryption using much smaller keys.", technical: "Asymmetric cryptography based on elliptic curve mathematics, offering equivalent strength to RSA with shorter keys.", example: "A 256-bit ECC key roughly matching a 3072-bit RSA key." },
    { term: "Rootkit", domain: "d2", plain: "Malware that hides itself and other malware from normal tools.", technical: "Malicious software operating at kernel, driver, or firmware level to conceal processes, files, and connections.", example: "A system looks clean in Task Manager while an attacker has control." },
    { term: "Logic Bomb", domain: "d2", plain: "Hidden code that fires only when a certain condition is met.", technical: "Malicious code that remains dormant until a specified trigger such as a date or event occurs.", example: "A script that deletes data when an admin's account is disabled." },
    { term: "Fileless Malware", domain: "d2", plain: "Malware that runs from memory instead of from a file on disk.", technical: "Malicious code executed in memory using built-in tools such as PowerShell or WMI, leaving minimal disk artifacts.", example: "A PowerShell command that downloads and runs a payload directly." },
    { term: "Password Spraying", domain: "d2", plain: "Trying one or two common passwords against lots of accounts.", technical: "A low-and-slow attack that attempts a small set of common passwords across many accounts to avoid lockout thresholds.", example: "'Welcome1' tried once on 800 accounts." },
    { term: "Credential Stuffing", domain: "d2", plain: "Using leaked logins from one site on other sites.", technical: "Automated replay of username/password pairs from prior breaches, exploiting password reuse.", example: "A leaked shopping-site password used to log in to email." },
    { term: "Pass-the-Hash", domain: "d2", plain: "Logging in with a stolen password hash instead of the password.", technical: "An attack that authenticates using a captured NTLM hash without recovering the plaintext password, enabling lateral movement.", example: "An admin hash captured from memory reused on file servers." },
    { term: "Port Security", domain: "d3", plain: "A switch rule limiting which devices can use a port.", technical: "A switch feature restricting the number and identity of MAC addresses on a port, with protect, restrict, or shutdown violation actions.", example: "Only one registered PC may use a desk jack." },
    { term: "802.1X", domain: "d3", plain: "Make devices log in before the network port works.", technical: "IEEE port-based network access control using a supplicant, authenticator, and authentication server (typically RADIUS with EAP).", example: "A laptop presenting a certificate before gaining network access." },
    { term: "DHCP Snooping", domain: "d3", plain: "Stops fake DHCP servers on the network.", technical: "A switch feature that permits DHCP server responses only from trusted ports and records IP-to-MAC bindings.", example: "A rogue router's DHCP offers are dropped." },
    { term: "Dynamic ARP Inspection", domain: "d3", plain: "Blocks forged ARP messages.", technical: "A switch feature that validates ARP packets against the DHCP snooping binding table.", example: "Spoofed gateway replies are dropped." },
    { term: "BPDU Guard", domain: "d3", plain: "Shuts a port that should never hear spanning-tree messages.", technical: "A switch feature that disables an edge port upon receiving BPDUs, preventing rogue switches from influencing STP.", example: "A desk port shuts down when someone plugs in a switch." }
  ],

  acronyms: [
    { acro: "GCM", expansion: "Galois/Counter Mode", meaning: "An authenticated encryption mode that provides confidentiality and integrity together." },
    { acro: "ECB", expansion: "Electronic Codebook", meaning: "A weak block cipher mode that encrypts identical blocks identically, leaking patterns." },
    { acro: "CBC", expansion: "Cipher Block Chaining", meaning: "A block cipher mode where each block is mixed with the previous ciphertext block." },
    { acro: "PFS", expansion: "Perfect Forward Secrecy", meaning: "Ephemeral session keys so a later key theft cannot decrypt past traffic." },
    { acro: "ECC", expansion: "Elliptic Curve Cryptography", meaning: "Asymmetric cryptography with smaller keys for the same strength as RSA." },
    { acro: "RAT", expansion: "Remote Access Trojan", meaning: "A trojan that gives an attacker remote control of the infected system." },
    { acro: "DAI", expansion: "Dynamic ARP Inspection", meaning: "A switch feature that drops ARP packets inconsistent with the DHCP snooping table." },
    { acro: "BPDU", expansion: "Bridge Protocol Data Unit", meaning: "A spanning-tree message exchanged between switches." },
    { acro: "STP", expansion: "Spanning Tree Protocol", meaning: "A protocol that prevents loops in switched networks." },
    { acro: "EAP", expansion: "Extensible Authentication Protocol", meaning: "A framework for authentication methods used with 802.1X and wireless networks." }
  ]
});
