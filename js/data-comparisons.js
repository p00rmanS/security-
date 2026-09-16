/* Section 14 of the rubric: "Important Teaching Comparisons."
   These are terms Security+ learners mix up constantly. Each entry is a
   quick-reference table plus a one-line Taglish memory hook. */

const COMPARISONS = [
  {
    id: "c-aaa",
    title: "Authentication vs Authorization vs Accounting (AAA)",
    rows: [
      ["Authentication", "Proving who you are.", "Typing your username and password, or scanning your fingerprint."],
      ["Authorization", "Deciding what you're allowed to do once you're verified.", "You're logged in, but only allowed to view — not delete — customer records."],
      ["Accounting", "Recording what you actually did.", "The system logs that you viewed record #4521 at 3:04 PM."]
    ],
    taglish: "Authentication = 'Sino ka ba talaga?' Authorization = 'Ano ba pwede mong gawin?' Accounting = 'Ano na ba nagawa mo, may record ba?' Tatlong magkaibang tanong, tatlong magkaibang hakbang."
  },
  {
    id: "c-crypto-terms",
    title: "Encryption vs Hashing vs Encoding vs Obfuscation",
    rows: [
      ["Encryption", "Reversible with the correct key; protects confidentiality.", "AES-encrypted file — unreadable without the decryption key."],
      ["Hashing", "One-way, not meant to be reversed; verifies integrity.", "SHA-256 hash of a downloaded file to confirm it wasn't altered."],
      ["Encoding", "Reversible transformation for compatibility, not security (no key needed).", "Base64-encoding an image to embed it in a text file."],
      ["Obfuscation", "Makes something harder to read/understand, not cryptographically protected.", "Minified JavaScript code — hard to read, but not encrypted."]
    ],
    taglish: "Encryption — may susi (key), pwedeng ibalik sa dati. Hashing — walang balikan, para lang i-verify kung 'ganito pa rin ba talaga' (integrity check). Encoding — reversible pero hindi para sa security, para lang sa compatibility. Obfuscation — pinahirapan lang basahin, pero hindi naman talaga protektado."
  },
  {
    id: "c-sym-asym",
    title: "Symmetric vs Asymmetric Encryption",
    rows: [
      ["Symmetric", "One shared secret key encrypts and decrypts. Fast, but key distribution is the hard part.", "AES encrypting a hard drive."],
      ["Asymmetric", "A key pair: public key encrypts, private key decrypts (or vice versa for signatures). Slower, solves key distribution.", "RSA used to securely exchange a symmetric key during a TLS handshake."]
    ],
    taglish: "Symmetric — iisang susi lang, pareho sa pag-lock at pag-unlock, mabilis pero problema kung paano ipapasa yung susi nang ligtas. Asymmetric — dalawang susi (public at private), mas mabagal pero solusyon yun sa problema ng symmetric — kaya sa totoong buhay, magkasama sila ginagamit (asymmetric muna para ipasa yung symmetric key nang ligtas)."
  },
  {
    id: "c-sig-vs-enc",
    title: "Digital Signature vs Encryption",
    rows: [
      ["Digital Signature", "Proves authenticity and integrity (who sent it, and that it wasn't changed). Signed with the sender's private key, verified with their public key.", "You verify an update file was really published by the vendor and untouched."],
      ["Encryption", "Protects confidentiality (keeps content secret from anyone without the key).", "You encrypt a message so only the intended recipient can read it."]
    ],
    taglish: "Digital Signature = 'Ito talaga galing kay [sender], at hindi ito ni-tamper.' Encryption = 'Walang ibang makakabasa nito kundi yung tatanggap.' Magkaiba ang layunin — yung isa proof of origin, yung isa naman secrecy."
  },
  {
    id: "c-ids-ips",
    title: "IDS vs IPS",
    rows: [
      ["IDS (Intrusion Detection System)", "Passive — monitors traffic and alerts on suspicious activity, does not block it.", "Security team gets an alert about a suspicious login pattern."],
      ["IPS (Intrusion Prevention System)", "Active — sits inline and can automatically block or drop malicious traffic in real time.", "Traffic matching a known exploit signature is dropped before it reaches the server."]
    ],
    taglish: "IDS — parang CCTV camera na nag-aalarm lang, hindi humaharang. IPS — parang guard na aktwal na humaharang bago pa makapasok ang panganib. Same detection logic, pero magkaiba ang ginagawa pagkatapos."
  },
  {
    id: "c-edr-xdr-siem-soar",
    title: "EDR vs XDR vs SIEM vs SOAR",
    rows: [
      ["EDR", "Endpoint Detection and Response — monitors and responds to threats on individual devices (laptops, servers).", "EDR isolates an infected laptop from the network automatically."],
      ["XDR", "Extended Detection and Response — correlates data across endpoints, network, cloud, and email into one view.", "XDR links a suspicious email, a malicious download, and unusual network traffic into one incident."],
      ["SIEM", "Security Information and Event Management — collects and correlates logs from across the organization for detection and reporting.", "SIEM flags a login from an unusual country right after a failed VPN attempt."],
      ["SOAR", "Security Orchestration, Automation, and Response — automates the response workflow (playbooks) triggered by SIEM/EDR alerts.", "SOAR automatically opens a ticket and disables an account after a SIEM alert fires."]
    ],
    taglish: "EDR — bantay sa bawat device. XDR — pinagsama-samang bantay sa device, network, cloud, at email. SIEM — yung 'malaking logbook' na nag-cocollect at nag-cocorrelate ng lahat ng logs. SOAR — yung 'auto-pilot' na gumagawa ng playbook actions kapag may na-detect. Magkasunod sila sa isang modern SOC workflow."
  },
  {
    id: "c-vuln-pentest-audit",
    title: "Vulnerability Scan vs Penetration Test vs Audit",
    rows: [
      ["Vulnerability Scan", "Automated tool identifies known weaknesses; does not exploit them.", "A scanner reports that a server is missing a critical patch."],
      ["Penetration Test", "Authorized humans actively attempt to exploit weaknesses to prove real-world impact.", "A pentester uses that missing patch to actually gain access, with permission, then reports how."],
      ["Audit", "A formal review checking compliance against a policy, standard, or framework.", "An auditor verifies the organization actually follows its own patch management policy."]
    ],
    taglish: "Vulnerability Scan — 'Ito yung mga posibleng butas.' Penetration Test — 'Sinubukan naming pumasok sa butas na yun, at ganito nangyari' (may pahintulot). Audit — 'Sinusunod ba talaga ninyo yung sarili niyong patakaran?' Magkaibang tanong, magkaibang depth."
  },
  {
    id: "c-risk-appetite",
    title: "Risk Appetite vs Risk Tolerance vs Risk Threshold",
    rows: [
      ["Risk Appetite", "The overall amount and type of risk an organization is willing to pursue, broadly speaking.", "\"We are willing to accept moderate risk to move fast in new markets.\""],
      ["Risk Tolerance", "How much variation from the target risk level is acceptable for a specific risk.", "\"We can tolerate up to 2 hours of downtime per quarter.\""],
      ["Risk Threshold", "The specific point at which a risk becomes unacceptable and requires action.", "\"If downtime exceeds 4 hours, it triggers mandatory executive escalation.\""]
    ],
    taglish: "Risk Appetite — general na 'gaano kalaki ang risk na okay lang sa amin' bilang kumpanya. Risk Tolerance — 'gaano karaming pagbabago sa specific na risk ang kaya naming tiisin.' Risk Threshold — 'saan mismong punto ito nagiging hindi na katanggap-tanggap.' Parang appetite mo sa pagkain, tolerance mo sa sakit ng tiyan, at yung punto kung kailan ka na talaga magpapatingin sa doktor."
  },
  {
    id: "c-policy-standard-procedure-guideline",
    title: "Policy vs Standard vs Procedure vs Guideline",
    rows: [
      ["Policy", "High-level, mandatory statement of management intent (the 'why' and 'what').", "\"All company data must be encrypted at rest.\""],
      ["Standard", "Mandatory, specific requirement supporting a policy.", "\"All data at rest must use AES-256 encryption.\""],
      ["Procedure", "Mandatory, step-by-step instructions to accomplish a task.", "\"Steps 1-7 to enable BitLocker on a company laptop.\""],
      ["Guideline", "Recommended, not mandatory, best-practice advice.", "\"Consider using a password manager for personal accounts.\""]
    ],
    taglish: "Policy — 'Bawal/dapat ito' (mandatory, general). Standard — 'Ganito dapat ang eksaktong spec' (mandatory, specific). Procedure — 'Gawin mo nang ganito, hakbang by hakbang' (mandatory, sunud-sunod). Guideline — 'Mabuti kung gagawin mo pero hindi naman required' (optional, suggestion lang)."
  },
  {
    id: "c-rto-rpo",
    title: "RTO vs RPO",
    rows: [
      ["RTO (Recovery Time Objective)", "How long you can be down before it's unacceptable — a time target for restoring service.", "\"We must restore the order system within 4 hours of an outage.\""],
      ["RPO (Recovery Point Objective)", "How much data loss (measured in time) is acceptable — how far back your last good backup must be.", "\"We can lose at most 1 hour of transaction data.\""]
    ],
    taglish: "RTO — 'Gaano katagal kaming pwedeng maka-down?' (oras hanggang bumalik online). RPO — 'Gaano karaming datos ang pwedeng mawala?' (oras pabalik hanggang sa huling maayos na backup). RTO = downtime tolerance, RPO = data-loss tolerance."
  },
  {
    id: "c-sle-aro-ale",
    title: "SLE vs ARO vs ALE",
    rows: [
      ["SLE (Single Loss Expectancy)", "Expected monetary loss from one occurrence of a risk.", "A ransomware incident is estimated to cost 500,000 pesos each time it happens."],
      ["ARO (Annualized Rate of Occurrence)", "How many times per year the event is expected to happen.", "This type of incident is estimated to happen 0.5 times per year (once every two years)."],
      ["ALE (Annualized Loss Expectancy)", "SLE x ARO — the expected yearly cost of the risk.", "500,000 x 0.5 = 250,000 pesos expected loss per year."]
    ],
    taglish: "SLE — 'Magkano ang lugi kada pangyayari?' ARO — 'Ilang beses ito nangyayari kada taon?' ALE — 'Ilan ang inaasahang total na lugi kada taon?' (SLE x ARO). Ginagamit ito para malaman kung sulit bang gumastos sa isang control — kung mas mura ang control kaysa ALE, sulit ipatupad."
  },
  {
    id: "c-hot-warm-cold",
    title: "Hot Site vs Warm Site vs Cold Site",
    rows: [
      ["Hot Site", "Fully equipped, live-replicated, ready to take over almost immediately. Most expensive.", "A mirrored data center that can take over within minutes."],
      ["Warm Site", "Partially equipped with some hardware/data, needs some setup time before it's operational.", "A backup site with servers ready but data needs syncing before going live."],
      ["Cold Site", "Just physical space and basic infrastructure (power, cooling); everything else must be brought in and set up. Cheapest, slowest to activate.", "An empty backup facility that needs equipment shipped in and installed before use."]
    ],
    taglish: "Hot Site — parang bahay na laging nakahanda, ready mo lang pasukin at tapos na. Warm Site — parang bahay na may kasangkapan na pero kailangan mo pang ayusin bago tuluyang matirhan. Cold Site — parang bakanteng lote lang na may kuryente at tubig, kailangan mo pang dalhin lahat ng gamit. Mas mabilis, mas mahal; mas matagal, mas mura."
  },
  {
    id: "c-backup-types",
    title: "Full vs Incremental vs Differential Backup",
    rows: [
      ["Full Backup", "Backs up everything every time. Slowest to create, fastest to restore.", "A complete copy of the entire file server every Sunday."],
      ["Incremental Backup", "Backs up only what changed since the last backup (full or incremental). Fastest to create, slowest to restore (need the full + every increment).", "Monday through Saturday, only backing up files changed since the previous day's backup."],
      ["Differential Backup", "Backs up everything changed since the last full backup. Medium speed to create, faster restore than incremental (need only the full + latest differential).", "Monday through Saturday, each day backs up everything changed since Sunday's full backup."]
    ],
    taglish: "Full — kopyahin LAHAT palagi. Incremental — kopyahin lang yung binago simula noong huling backup (full man o incremental) — mabilis gawin, mahirap i-restore (kailangan lahat ng piraso). Differential — kopyahin lahat ng binago simula noong huling FULL backup — katamtaman gawin, mas madaling i-restore kaysa incremental (full + pinakahuling differential lang kailangan)."
  },
  {
    id: "c-false-pos-neg",
    title: "False Positive vs False Negative",
    rows: [
      ["False Positive", "The system flags something as malicious/a problem, but it's actually legitimate.", "An alert fires on a legitimate admin login flagged as \"brute force.\""],
      ["False Negative", "The system fails to flag something malicious — it looks legitimate but isn't. The more dangerous of the two.", "Real malware runs on a system with no alert generated at all."]
    ],
    taglish: "False Positive — 'Akala ko masama, pero hindi pala' (kulang sa tiwala, nakakaubos ng oras). False Negative — 'Akala ko okay, pero masama pala' (mas mapanganib, dahil walang nag-alarma habang may nangyayaring totoong banta)."
  },
  {
    id: "c-threat-vuln-risk-exploit",
    title: "Threat vs Vulnerability vs Risk vs Exploit",
    rows: [
      ["Threat", "A potential danger — someone or something that could cause harm.", "A ransomware gang actively targeting your industry."],
      ["Vulnerability", "A weakness that could be taken advantage of.", "An unpatched server missing a critical security update."],
      ["Risk", "The likelihood and impact of a threat exploiting a vulnerability.", "\"High risk\" because ransomware groups are actively exploiting this exact unpatched flaw in your industry."],
      ["Exploit", "The actual tool, code, or technique used to take advantage of a vulnerability.", "The specific malware or script that abuses the unpatched flaw to gain access."]
    ],
    taglish: "Threat — 'May taong gustong manira.' Vulnerability — 'May butas sa bakod mo.' Risk — 'Gaano kalaki ang panganib kung pagsamahin yung taong yun at yung butas na yun?' Exploit — 'Yung mismong kagamitan o pamamaraan na ginamit niya para pumasok sa butas.'"
  },
  {
    id: "c-controls-preventive-detective-corrective",
    title: "Preventive vs Detective vs Corrective Controls",
    rows: [
      ["Preventive", "Stops an incident before it happens.", "A firewall blocking unauthorized traffic."],
      ["Detective", "Identifies that an incident is happening or has happened.", "A SIEM alert on unusual login activity."],
      ["Corrective", "Fixes/limits damage after an incident is detected.", "Restoring a system from backup after a ransomware infection."]
    ],
    taglish: "Preventive — hinarang bago pa man mangyari. Detective — na-alarma habang o pagkatapos mangyari. Corrective — inayos/ginamot pagkatapos ma-detect. Timeline: preventive (bago), detective (habang/pagkatapos), corrective (pagkatapos)."
  },
  {
    id: "c-saml-oauth-oidc",
    title: "SAML vs OAuth vs OpenID Connect",
    rows: [
      ["SAML", "XML-based standard mainly for enterprise Single Sign-On (SSO) into web applications.", "Logging into a corporate portal once and gaining access to multiple internal web apps."],
      ["OAuth 2.0", "An authorization framework — grants an application limited access to a resource without sharing the password.", "Letting a photo-printing app access only your cloud photo library, not your full account."],
      ["OpenID Connect (OIDC)", "An identity layer built on top of OAuth 2.0 — adds authentication (proving who you are), not just authorization.", "\"Sign in with Google\" on a third-party website."]
    ],
    taglish: "SAML — mas matandang paraan, common sa corporate SSO (XML-based). OAuth — hindi talaga para sa 'login,' kundi para sa 'pahintulot' (authorization) — halimbawa, pinapayagan mo lang ang app na kunin yung photos mo, hindi buong account. OIDC — dinagdagan ang OAuth ng authentication layer, kaya siya yung ginagamit sa 'Sign in with Google' na button."
  },
  {
    id: "c-containment-eradication-recovery",
    title: "Containment vs Eradication vs Recovery",
    rows: [
      ["Containment", "Limit the spread/impact of an incident right now.", "Disconnecting an infected machine from the network."],
      ["Eradication", "Remove the root cause of the incident completely.", "Deleting the malware and closing the vulnerability it used to get in."],
      ["Recovery", "Restore affected systems to normal operation.", "Restoring the cleaned system from backup and monitoring it closely before returning to full production."]
    ],
    taglish: "Containment — 'Pigilan muna kumalat.' Eradication — 'Alisin talaga hanggang ugat.' Recovery — 'Ibalik sa normal, at bantayan.' Sunud-sunod na hakbang sa Incident Response pagkatapos ma-detect at ma-analyze ang insidente."
  }
];
