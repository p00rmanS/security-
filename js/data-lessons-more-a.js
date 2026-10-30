/* More lessons, part A (Domains 1-3). Ids use the t16x range to avoid
   collisions with other contributors' lessons. Registers a bundle on
   globalThis.__DEEP; data-lessons-merge.js (loaded last) merges it. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d1: [
      {
        id: "d1-t160",
        title: "Hiding and Replacing Data: Masking, Tokenization, Steganography, and Blockchain",
        tag: "1.4",
        minutes: 20,
        goal: "Distinguish masking, tokenization, anonymization, obfuscation, and steganography, and explain what a blockchain actually guarantees.",
        why: "These terms sound alike and the exam deliberately blurs them. Each protects data in a different way (and some are reversible while others are not), so questions reward knowing the single defining trait of each.",
        simple:
          "Encryption is not the only way to protect sensitive data. DATA MASKING replaces real values with realistic but fake ones (a card number shown as XXXX-XXXX-XXXX-1234, or fake names in a test database) so people and systems that do not need the real data never see it; masking is normally one-way. TOKENIZATION swaps a sensitive value for a random TOKEN that has no mathematical relationship to the original, and the real value is held in a separate, tightly protected vault; only the vault can map a token back. Because the stored token is worthless to a thief, tokenization is popular for payment card data and shrinks compliance scope. Unlike encryption, there is no key that can unlock a token on its own. ANONYMIZATION irreversibly removes the link between data and a person, while PSEUDONYMIZATION replaces identifiers with substitutes that can be re-linked using separately held information; under privacy law, pseudonymized data is still personal data, and truly anonymized data is not. OBFUSCATION means making something hard to understand, such as scrambling program code so it is difficult to reverse engineer; it raises the effort for an attacker but is not a substitute for real security. STEGANOGRAPHY hides the very EXISTENCE of a message by embedding it inside an innocent-looking carrier, such as the least significant bits of an image, an audio file, or unused fields in network packets. Attackers use it to smuggle data out or hide malware instructions, and defenders look for it with steganalysis (unusual file size, statistical oddities, comparing against the original). A BLOCKCHAIN is a distributed ledger in which records are grouped into blocks, and each block contains the hash of the previous block, so altering an old record would break every later link. Many independent nodes agree on new blocks through a consensus mechanism, which makes the ledger tamper-evident and hard to rewrite. A blockchain guarantees integrity and a shared history; it does not by itself guarantee confidentiality or that the data put into it was true in the first place.",
        deepDive: [
          { h: "Masking in practice", list: [
            "Static masking: a sanitized copy of a database is created for development and testing, so real customer data never leaves production.",
            "Dynamic masking: data is masked on the fly depending on who asks (a support agent sees only the last four digits, a billing system sees the full value).",
            "Typical methods: substitution with realistic fake values, shuffling values between rows, character masking, and nulling out fields."
          ] },
          { h: "Tokenization versus encryption", list: [
            "Encryption is mathematically reversible by anyone holding the key; the ciphertext still 'contains' the original.",
            "A token contains nothing; it is a random reference, and the mapping lives in a vault.",
            "If an attacker steals a database of tokens, they have nothing usable. If they steal a database of encrypted values plus the key, they have everything.",
            "Format-preserving tokens or encryption keep the same length and shape (16 digits), so legacy systems still work."
          ] },
          { h: "Where steganography shows up", list: [
            "Data exfiltration disguised as ordinary image uploads.",
            "Malware that pulls its next instructions out of a harmless-looking picture.",
            "Digital watermarking: legitimate hiding of ownership information in media.",
            "Detection: steganalysis tools, comparing a suspicious file to a known original, and DLP rules that look for unusual file characteristics."
          ] },
          { h: "What a blockchain does and does not give you", list: [
            "Integrity and tamper evidence: each block's hash covers the one before it.",
            "Transparency and a shared record, with no single owner.",
            "Possible uses: provenance and supply-chain tracking, audit trails, digital asset ownership, smart contracts.",
            "Not automatically confidential (public chains are readable by everyone), not a fix for bad input data, and weaker if an attacker controls most of the network (a 51 percent attack)."
          ] },
          { h: "Security through obscurity", p: "Hiding how something works is not a security control by itself. Obfuscation and steganography can add friction, but they must sit on top of real controls such as encryption and access control, because a determined attacker will eventually see through concealment." }
        ],
        keyTerms: [
          { term: "Data Masking", def: "Replacing real values with realistic fake or partial ones so the real data is not exposed. Usually one-way." },
          { term: "Tokenization", def: "Replacing a sensitive value with a random token; the real value is stored in a protected vault." },
          { term: "Anonymization", def: "Irreversibly removing identifying information so data cannot be tied to a person." },
          { term: "Pseudonymization", def: "Replacing identifiers with substitutes that can be re-linked using separately stored information." },
          { term: "Obfuscation", def: "Making data or code deliberately hard to understand or reverse engineer." },
          { term: "Steganography", def: "Hiding the existence of a message inside another file or medium." },
          { term: "Blockchain", def: "A distributed ledger of hash-linked blocks that is tamper-evident and agreed on by consensus." },
          { term: "Consensus", def: "The method by which a distributed network agrees on the next valid block." },
          { term: "Steganalysis", def: "Techniques for detecting hidden data in carrier files." }
        ],
        analogy:
          "Masking is putting a sticker over most of a credit card number. Tokenization is giving the coat-check ticket instead of the coat: the ticket is worthless to a thief, and only the coat-check room (the vault) can match it to your coat. Steganography is a secret note written in invisible ink inside a children's book. A blockchain is a notebook passed around a hundred people where every page carries a fingerprint of the page before it, so tearing out or rewriting one page is obvious to everyone.",
        technical:
          "A bank gives its developers a nightly copy of the customer database with names replaced by fake ones and card numbers statically masked, so test systems hold no real data. In production, the payment application stores only tokens; the real card numbers sit in a vault inside a small, heavily controlled network segment, which shrinks the scope of a PCI DSS audit. During an investigation, analysts notice a workstation uploading large JPEG files to a photo-sharing site and find that the images are several times larger than comparable photos, suggesting data hidden by steganography.",
        table: {
          headers: ["Technique", "Reversible?", "Goal", "Typical example"],
          rows: [
            ["Masking", "Normally no", "Hide real values from people and test systems", "XXXX-XXXX-XXXX-1234; fake names in test data"],
            ["Tokenization", "Only through the vault", "Remove real data from systems; reduce compliance scope", "Payment tokens"],
            ["Encryption", "Yes, with the key", "Confidentiality", "AES-encrypted database column"],
            ["Anonymization", "No", "Remove link to a person", "Aggregated statistics"],
            ["Pseudonymization", "Yes, with separate data", "Reduce identifiability", "Customer ID replaces name"],
            ["Obfuscation", "Effort only", "Slow down analysis", "Scrambled program code"],
            ["Steganography", "Yes, if you know where to look", "Hide that a message exists", "Data in image pixels"],
            ["Blockchain", "n/a", "Tamper-evident shared record", "Supply chain provenance ledger"]
          ]
        },
        confusion: [
          { a: "Tokenization", b: "Encryption", diff: "A token has no mathematical link to the original and needs a vault lookup. Encrypted data can be decrypted by anyone with the key." },
          { a: "Masking", b: "Tokenization", diff: "Masking shows a fake or partial version of data, normally one-way. Tokenization substitutes a random reference that can be mapped back through a vault." },
          { a: "Anonymization", b: "Pseudonymization", diff: "Anonymized data cannot be re-linked to a person. Pseudonymized data can, so it is still treated as personal data." },
          { a: "Steganography", b: "Encryption", diff: "Encryption makes a message unreadable but visibly present. Steganography hides that a message exists at all. The two are often combined." },
          { a: "Blockchain integrity", b: "Data accuracy", diff: "A blockchain proves records have not been altered since they were added. It cannot prove the data was correct when it was entered." }
        ],
        soc: "Steganography is hard to spot, so analysts look at context: an employee suddenly uploading many large images, files whose size does not match their visible content, or malware pulling 'pictures' from unusual servers. For tokenization and masking, the SOC concern is making sure the vault and the unmasked source are the heavily monitored crown jewels, since everything else holds worthless substitutes.",
        patterns: [
          ["Show only the last four digits of a card number", "Data masking"],
          ["Store a random placeholder; real value held in a separate vault", "Tokenization"],
          ["Reduce PCI DSS scope", "Tokenization"],
          ["Data cannot be linked back to a person by any means", "Anonymization"],
          ["Identifiers replaced but can be re-linked with extra data", "Pseudonymization"],
          ["Secret message hidden inside an image file", "Steganography"],
          ["Each block contains the hash of the previous block", "Blockchain"],
          ["Make code hard to reverse engineer", "Obfuscation"]
        ],
        takeaways: [
          "Masking hides; tokenization substitutes through a vault; encryption transforms with a key.",
          "Pseudonymized data is still personal data; anonymized data is not.",
          "A blockchain gives tamper-evident integrity, not confidentiality or truth."
        ],
        remember: [
          "Masking = fake or partial values (usually one-way). Tokenization = random token + vault lookup.",
          "Tokenization can shrink PCI DSS scope because stolen tokens are worthless.",
          "Anonymization is irreversible; pseudonymization can be re-linked (still personal data).",
          "Steganography hides that a message EXISTS; encryption hides what it SAYS.",
          "Blockchain = hash-linked blocks, distributed, consensus, tamper-evident. Not automatically confidential.",
          "Obfuscation slows attackers down; it is not real security by itself.",
          "Static masking = sanitized copy for test. Dynamic masking = masked at query time."
        ],
        taglish:
          "Magkakaiba ang paraan ng pagprotekta. Masking, pinapalitan ng peke o partial na value (hal. XXXX-1234). Tokenization, pinapalitan ng random na token, at nasa hiwalay na vault ang tunay na data, kaya walang silbi sa magnanakaw ang token. Ang anonymization, tuluyan nang hindi maibabalik sa tao; ang pseudonymization, pwede pang ibalik kaya personal data pa rin. Ang steganography, itinatago ang mismong pag-iral ng mensahe sa loob ng larawan o audio. At ang blockchain, mga block na magkakakabit gamit ang hash, kaya halata kapag may binago, pero hindi nito sinisiguro na tama ang orihinal na datos."
      },
      {
        id: "d1-t161",
        title: "Certificate Lifecycle and Validation: CSR, CRL, OCSP, Stapling, and Pinning",
        tag: "1.4",
        minutes: 20,
        goal: "Walk through the life of a certificate from request to revocation, and explain how a client decides whether to trust one.",
        why: "Expired or wrongly trusted certificates cause real outages and real attacks. The exam tests the vocabulary around requesting, validating, and revoking certificates, which the broader PKI lessons only touch on.",
        simple:
          "A digital certificate binds a public key to an identity and is signed by a Certificate Authority (CA). Its life has stages. First, the owner generates a key pair and creates a CSR (Certificate Signing Request) containing the PUBLIC key and identity details (domain name, organization); the private key never leaves the owner. The CA verifies the request (a domain-validated certificate only proves control of the domain, while organization-validated and extended-validation certificates verify more about the business) and issues the certificate. The owner installs it, uses it, and renews it before its expiration date; expired certificates break trust and cause outages. If the private key is stolen or the certificate was issued in error, it must be REVOKED. Clients learn about revocation in two main ways. A CRL (Certificate Revocation List) is a signed list of revoked serial numbers published by the CA; it can be large and may be out of date between publications. OCSP (Online Certificate Status Protocol) lets a client ask an OCSP responder in real time whether a specific certificate is good, revoked, or unknown, but it adds a lookup for every connection and can reveal which sites a user visits. OCSP STAPLING fixes both problems: the SERVER periodically fetches a signed OCSP response and attaches ('staples') it to the TLS handshake, so the client gets fresh proof without contacting the CA. When a client validates a certificate it checks that the chain leads through trusted intermediate CAs to a root already in its trust store, that every signature is valid, that the certificate is within its validity period, that the name in the certificate matches the site (the Common Name or, more importantly, a Subject Alternative Name), and that it has not been revoked. CERTIFICATE PINNING goes further for sensitive apps: the app is built to accept only a specific certificate or public key for a service, so even a certificate from a trusted-but-rogue CA is rejected; the cost is that rotating certificates carelessly can lock out your own users. CERTIFICATE TRANSPARENCY adds public, append-only logs of issued certificates so domain owners can spot certificates they did not request.",
        deepDive: [
          { h: "The lifecycle in order", list: [
            "Generate a key pair on the server (ideally protecting the private key in a TPM or HSM).",
            "Create a CSR containing the public key and subject information, signed with the private key.",
            "Submit the CSR to a CA, which validates the requester and issues the certificate.",
            "Install the server certificate AND the intermediate certificates so clients can build the chain.",
            "Monitor expiry and renew early; automate where possible.",
            "Revoke immediately if the private key is compromised, then reissue with a new key pair.",
            "At end of life, retire the key and certificate cleanly."
          ] },
          { h: "How a browser validates a server certificate", list: [
            "Does the chain lead to a trusted root in the local trust store, through valid intermediates?",
            "Are all signatures valid and is the current date inside the validity period?",
            "Does the hostname match a name (SAN) in the certificate?",
            "Has it been revoked (CRL, OCSP, or a stapled OCSP response)?",
            "Does the certificate allow the intended use (for example server authentication)?"
          ] },
          { h: "CRL versus OCSP versus stapling", list: [
            "CRL: a downloaded list; simple but can be large and stale.",
            "OCSP: real-time per-certificate query; fresher but slower and a privacy leak; if the responder is down, clients must decide whether to fail open or closed.",
            "OCSP stapling: the server delivers a fresh signed status itself; faster and more private."
          ] },
          { h: "Certificate types you should recognize", list: [
            "Domain validated (DV), organization validated (OV), extended validation (EV): increasing identity checking.",
            "Wildcard: covers all subdomains of one domain; SAN: covers a list of specific names.",
            "Self-signed: signed by its own key; not trusted by outsiders.",
            "Code-signing, email (S/MIME), and client-authentication certificates serve other purposes."
          ] },
          { h: "Common failures and what they mean", list: [
            "Expired certificate: the most common outage cause; fix with monitoring and automated renewal.",
            "Name mismatch: certificate does not cover the hostname used.",
            "Untrusted issuer or incomplete chain: a missing intermediate or a private CA the client does not trust.",
            "Revoked certificate: the key was compromised or the certificate misissued."
          ] }
        ],
        keyTerms: [
          { term: "CSR", def: "Certificate Signing Request: a signed message containing the public key and identity details sent to a CA." },
          { term: "CRL", def: "Certificate Revocation List: a CA-published, signed list of revoked certificate serial numbers." },
          { term: "OCSP", def: "Online Certificate Status Protocol: real-time query of a certificate's revocation status." },
          { term: "OCSP Stapling", def: "The server attaches a fresh, signed OCSP response to the TLS handshake." },
          { term: "Certificate Pinning", def: "Configuring a client to accept only a specific certificate or public key for a service." },
          { term: "Certificate Transparency", def: "Public, append-only logs of issued certificates that help detect misissuance." },
          { term: "Trust Store", def: "The set of root CA certificates a device or browser trusts." },
          { term: "Subject Alternative Name (SAN)", def: "The certificate field listing the hostnames it is valid for." },
          { term: "Revocation", def: "Declaring a certificate invalid before its expiration date." }
        ],
        analogy:
          "A certificate is a passport. The CSR is your passport application (with your photo, which is the public key). The CA is the passport office. The CRL is the printed list of cancelled passports at the border; OCSP is the border officer phoning the passport office each time; stapling is you handing over a freshly stamped 'still valid' note from the office. Pinning is a hotel that only accepts one specific passport number for a reservation, no matter how official someone else's passport looks.",
        technical:
          "An e-commerce site's certificate expires at midnight and its renewal was never automated, so customers see browser warnings and sales stop until the team renews it. As a fix, they deploy automated renewal and certificate expiry monitoring with alerts 30 days ahead. Separately, a developer's laptop with a web server's private key is stolen, so the team revokes the certificate, issues a new one from a fresh key pair, and enables OCSP stapling so clients quickly learn the old one is revoked. The mobile banking app pins the bank's public key so a rogue CA's certificate would be rejected even on a hostile Wi-Fi network.",
        table: {
          headers: ["Mechanism", "How it works", "Strength", "Weakness"],
          rows: [
            ["CRL", "Client downloads a list of revoked serials", "Simple, works offline once downloaded", "Large and can be stale"],
            ["OCSP", "Client asks the CA's responder about one certificate", "Fresh status", "Extra lookup, privacy exposure, responder dependency"],
            ["OCSP stapling", "Server attaches a signed status response", "Fast and private, fresh", "Requires server support"],
            ["Pinning", "Client accepts only a specific cert or key", "Blocks rogue or misissued certs", "Rotation mistakes can lock users out"],
            ["Certificate Transparency", "Public logs of issued certificates", "Detects misissuance", "Detection after the fact, not prevention"]
          ]
        },
        confusion: [
          { a: "CRL", b: "OCSP", diff: "A CRL is a list you download and check. OCSP is a live question about one certificate. OCSP is fresher but adds a request." },
          { a: "OCSP", b: "OCSP stapling", diff: "With plain OCSP the CLIENT contacts the CA. With stapling the SERVER includes the CA's signed answer in the handshake." },
          { a: "CSR", b: "Certificate", diff: "A CSR is the request (public key plus identity). The certificate is what the CA issues back, signed by the CA." },
          { a: "Revocation", b: "Expiration", diff: "Expiration is the planned end of validity. Revocation is an early cancellation, usually after key compromise or misissuance." },
          { a: "Wildcard certificate", b: "SAN certificate", diff: "A wildcard covers any subdomain of one domain. A SAN certificate lists specific names, which can span different domains." }
        ],
        soc: "Certificate problems appear as outages and as security events: an expired certificate on a critical service, a certificate issued for your domain that you did not request (found through certificate transparency logs), or TLS connections using self-signed certificates to unfamiliar servers, which can indicate malware command and control. Inventory and monitoring of every certificate is an operational control.",
        patterns: [
          ["Sends the public key and identity information to the CA", "CSR"],
          ["Signed list of revoked serial numbers", "CRL"],
          ["Real-time check of one certificate's status", "OCSP"],
          ["Server includes the signed revocation status in the handshake", "OCSP stapling"],
          ["App accepts only one specific certificate or public key", "Certificate pinning"],
          ["Private key stolen", "Revoke the certificate and reissue with a new key pair"],
          ["Browser shows a name mismatch warning", "Hostname not in the certificate's SAN"],
          ["Missing intermediate certificate", "Incomplete chain; install the chain on the server"]
        ],
        takeaways: [
          "A CSR carries the public key; the private key never leaves the owner.",
          "CRL is a list, OCSP is a live check, stapling lets the server deliver the check.",
          "Pinning blocks rogue CAs but needs careful rotation."
        ],
        remember: [
          "CSR = public key + identity, sent to the CA. The private key stays with the owner.",
          "CRL = downloaded list of revoked serials. OCSP = live status query. OCSP stapling = server attaches a signed OCSP response.",
          "Validation checks: trusted chain, valid signatures, dates, hostname (SAN), revocation, allowed use.",
          "Key compromised: revoke immediately and reissue with a NEW key pair.",
          "Pinning rejects unexpected certificates, even from trusted CAs; plan for rotation.",
          "Certificate Transparency logs help owners detect certificates they did not request.",
          "Expired certificates are the most common cause of certificate outages; monitor and automate renewal."
        ],
        taglish:
          "Ang proseso: gumagawa ka ng key pair, gumagawa ng CSR (may public key at pangalan ng domain mo), ipinapadala sa CA, at babalik ang certificate. Hindi umaalis ang private key mo. Kapag nanakaw ang private key, i-revoke agad. Para malaman ng client kung revoked na, may tatlong paraan: CRL (listahan na dina-download), OCSP (live na tanong sa CA), at OCSP stapling (ang server mismo ang nagbibigay ng bagong patunay). Ang pinning naman, tatanggap lang ang app ng isang partikular na certificate o key, kaya kahit galing sa ibang CA na pinagkakatiwalaan, tatanggihan. At bantayan ang expiration dahil iyon ang pinakamadalas na sanhi ng outage."
      }
    ],

    d2: [
      {
        id: "d2-t160",
        title: "Virtualization and Cloud Vulnerabilities: VM Escape, Sprawl, Resource Reuse, and Misconfiguration",
        tag: "2.3",
        minutes: 20,
        goal: "Identify the weaknesses specific to virtualized and cloud environments and match each to a mitigation.",
        why: "Most organizations now run on hypervisors and cloud platforms, and the exam's vulnerability objective names virtualization and cloud-specific flaws directly. The wrong answer is usually a classic server weakness that does not fit the scenario.",
        simple:
          "Virtualization lets many virtual machines (VMs) share one physical host through a HYPERVISOR. A Type 1 hypervisor runs directly on the hardware (bare metal, common in data centers), while a Type 2 hypervisor runs as an application on top of a normal operating system (common on laptops). Because the hypervisor sits beneath every VM, a flaw in it is serious. A VM ESCAPE is an attack in which code inside one VM breaks out of its isolation to reach the hypervisor, the host, or other VMs. VM SPRAWL happens when virtual machines are created so easily that nobody tracks them: forgotten machines stay unpatched, unmonitored, and still holding data. RESOURCE REUSE (data remanence) means that memory or storage released by one VM and handed to another may still contain the previous tenant's data if it is not scrubbed. SNAPSHOTS and backups of VMs can contain memory contents, keys, and credentials, and need the same protection as the live system. Shared hardware also opens side-channel attacks, where one VM infers secrets from another through timing or cache behavior (the Spectre and Meltdown family). Cloud environments add their own risks, and the provider and customer split responsibility (the shared responsibility model). The usual cloud failures are on the CUSTOMER's side: misconfigured storage that is open to the public, overly permissive identity and access management roles, exposed access keys, unprotected management consoles, disabled logging, and insecure APIs. Multitenancy means customers share infrastructure, so isolation failures matter, and shadow IT (unapproved cloud services) hides data from the security team. Mitigations include keeping hypervisors patched, strictly limiting and monitoring management access, tracking and decommissioning VMs through a lifecycle process, scrubbing reused resources and encrypting data at rest, protecting snapshots, using cloud security posture management to detect misconfigurations, and enforcing least privilege on cloud identities.",
        deepDive: [
          { h: "Hypervisor types", list: [
            "Type 1 (bare metal): installed directly on hardware; used for servers and cloud platforms; smaller attack surface.",
            "Type 2 (hosted): runs on top of an operating system; convenient for desktops and testing; exposed to that OS's vulnerabilities."
          ] },
          { h: "Virtualization risks and fixes", list: [
            "VM escape: patch the hypervisor and guest tools, disable unneeded features such as shared clipboards and folders, isolate sensitive workloads on separate hosts.",
            "VM sprawl: central inventory, approval and expiration dates for VMs, automated decommissioning.",
            "Resource reuse: provider or administrator scrubs memory and storage; encrypt data so leftovers are unreadable.",
            "Snapshots: treat as sensitive data; restrict who can create or restore them; delete when no longer needed.",
            "Management plane: protect the console and APIs with MFA and network restrictions; compromise here is compromise of every VM."
          ] },
          { h: "The most common cloud failures", list: [
            "Public storage buckets exposing sensitive files.",
            "Access keys or secrets committed to code repositories.",
            "Administrator roles granted to everyone, or no MFA on privileged accounts.",
            "Logging and alerting turned off, so there is no evidence after an incident.",
            "Default security groups left open to the whole Internet.",
            "Insecure or unauthenticated APIs."
          ] },
          { h: "Who is responsible for what", p: "In the shared responsibility model, the provider secures the underlying infrastructure and hypervisor, while the customer secures their own data, identities, configurations, and (depending on the service model) operating systems and applications. The more managed the service (IaaS, then PaaS, then SaaS), the more the provider handles; data and access are always the customer's job." },
          { h: "Detecting cloud misconfiguration", p: "Cloud security posture management (CSPM) tools continuously compare cloud settings with best-practice baselines and alert on drift, such as a bucket becoming public. A cloud access security broker (CASB) sits between users and cloud services to enforce policy and reveal shadow IT." }
        ],
        keyTerms: [
          { term: "Hypervisor", def: "Software that creates and runs virtual machines. Type 1 runs on hardware; Type 2 runs on an operating system." },
          { term: "VM Escape", def: "An attack that breaks out of a virtual machine to reach the hypervisor, host, or other VMs." },
          { term: "VM Sprawl", def: "Uncontrolled growth of virtual machines that are forgotten, unpatched, and unmanaged." },
          { term: "Resource Reuse", def: "Leftover data in memory or storage reassigned to another tenant." },
          { term: "Multitenancy", def: "Multiple customers sharing the same underlying infrastructure." },
          { term: "Side-Channel Attack", def: "Inferring secrets from timing, cache, or power behavior of shared hardware." },
          { term: "CSPM", def: "Cloud Security Posture Management: continuous detection of cloud misconfiguration." },
          { term: "CASB", def: "Cloud Access Security Broker: enforces security policy between users and cloud services." },
          { term: "Shadow IT", def: "Technology or cloud services used without the security team's approval." }
        ],
        analogy:
          "A hypervisor is the building manager of an apartment block, and each VM is an apartment. VM escape is a tenant who finds a way through the wall to the manager's office. VM sprawl is a hundred rented storage units that nobody remembers paying for or locking. Resource reuse is the next tenant finding the previous tenant's papers in the drawer. A public cloud bucket left open is a filing cabinet placed on the sidewalk with a sign saying 'Help yourself'.",
        technical:
          "During an audit, the team finds 140 virtual machines in a test environment with no owners, 60 of them running an out-of-date operating system. They implement a VM lifecycle policy with owner tags and expiry dates and retire the unused machines. A cloud scan then reveals a storage bucket containing customer exports that was set to public read; CSPM now alerts on any bucket policy that allows anonymous access. The administrators also move the hypervisor management console behind a VPN with MFA.",
        table: {
          headers: ["Weakness", "What happens", "Best mitigation"],
          rows: [
            ["VM escape", "Guest breaks isolation to reach host or other VMs", "Patch hypervisor, disable guest integration features, separate sensitive workloads"],
            ["VM sprawl", "Forgotten, unpatched VMs", "Inventory, ownership, expiry, automated decommissioning"],
            ["Resource reuse", "Previous tenant's data left in reassigned resources", "Scrubbing and encryption at rest"],
            ["Exposed snapshots", "Sensitive memory and data copied", "Restrict and protect snapshots, delete when done"],
            ["Public storage / open security groups", "Direct Internet exposure", "CSPM, least-privilege policies, private by default"],
            ["Over-permissive IAM", "Stolen account has too much power", "Least privilege, MFA, regular reviews"],
            ["Shadow IT", "Unapproved cloud data stores", "CASB, discovery, clear policy and approved alternatives"]
          ]
        },
        confusion: [
          { a: "VM escape", b: "Guest OS compromise", diff: "Compromising software inside a VM stays inside it. VM escape crosses the boundary to the hypervisor or other VMs, which is why it is far more serious." },
          { a: "Type 1 hypervisor", b: "Type 2 hypervisor", diff: "Type 1 runs directly on the hardware. Type 2 runs as an application on a host operating system." },
          { a: "VM sprawl", b: "VM escape", diff: "Sprawl is a management failure (too many forgotten VMs). Escape is an attack that breaks isolation." },
          { a: "Provider responsibility", b: "Customer responsibility", diff: "The provider secures the infrastructure; the customer secures their data, identities, and configuration. Open storage buckets are almost always the customer's problem." },
          { a: "CSPM", b: "CASB", diff: "CSPM finds misconfiguration in your cloud accounts. A CASB controls and monitors how users access cloud services, including unapproved ones." }
        ],
        soc: "Cloud incidents leave different evidence: audit logs of API calls, new access keys created, unusual regions or instance types launched (cryptojacking), and snapshots shared to unknown accounts. If logging was never enabled, the investigation has nothing to work with, so turning on audit logging is a first-day control.",
        patterns: [
          ["Code in one VM reaches the host or other VMs", "VM escape"],
          ["Hundreds of forgotten, unpatched virtual machines", "VM sprawl"],
          ["New tenant finds the previous tenant's data", "Resource reuse (data remanence)"],
          ["Customer files readable by anyone on the Internet", "Misconfigured storage (customer responsibility)"],
          ["Leaked access key in a code repository", "Secrets exposure; rotate the key and use a secrets manager"],
          ["Continuously detect cloud misconfiguration", "CSPM"],
          ["Discover and control unapproved cloud apps", "CASB"],
          ["Hypervisor running directly on hardware", "Type 1 (bare metal)"]
        ],
        takeaways: [
          "Hypervisors are high-value targets; VM escape breaks isolation.",
          "Sprawl, snapshots, and resource reuse are management and data-handling problems.",
          "Most cloud breaches come from customer misconfiguration, not provider failure."
        ],
        remember: [
          "Type 1 = bare metal. Type 2 = hosted on an OS.",
          "VM escape = breaking out of the VM to the hypervisor/host. VM sprawl = untracked, unpatched VMs.",
          "Resource reuse = leftover data given to the next tenant; fix with scrubbing and encryption.",
          "Snapshots can contain secrets in memory: protect them.",
          "Shared responsibility: provider secures infrastructure; customer secures data, identities, and configuration.",
          "Public buckets, open security groups, and over-permissive IAM roles are the classic cloud failures.",
          "CSPM detects misconfiguration; CASB controls access and discovers shadow IT."
        ],
        taglish:
          "Ang hypervisor ang nagpapatakbo ng maraming VM sa isang makina. Ang VM escape, kapag nakalabas ang attacker mula sa isang VM papunta sa hypervisor o sa ibang VM. Ang VM sprawl, sobrang daming VM na wala nang nakakaalala, kaya hindi na napa-patch. Ang resource reuse, naiwan na datos ng dating tenant sa memory o storage. Sa cloud, kadalasan ang mali ay nasa customer: bukas na storage bucket, sobrang laking permission, at nakalabas na access key. Gamitin ang CSPM para mahuli ang maling configuration, at CASB para makontrol ang shadow IT."
      }
    ],

    d3: [
      {
        id: "d3-t160",
        title: "Industrial Control Systems and OT Security: SCADA, PLCs, and the Purdue Model",
        tag: "3.1",
        minutes: 22,
        goal: "Explain how operational technology differs from IT, describe the main ICS components, and apply segmentation and passive monitoring to protect them.",
        why: "Power, water, manufacturing, and healthcare run on operational technology, and the exam lists ICS, SCADA, RTOS, and embedded systems as architecture topics. The key insight is that OT priorities invert the usual IT ones.",
        simple:
          "Operational technology (OT) is the hardware and software that monitors and controls physical processes: opening valves, spinning turbines, moving conveyor belts. An INDUSTRIAL CONTROL SYSTEM (ICS) is the umbrella term, and SCADA (Supervisory Control and Data Acquisition) is a type of ICS that supervises geographically spread equipment from a central point. The main components are SENSORS and ACTUATORS (which measure and act on the physical world), PLCs (programmable logic controllers, rugged computers that run the control logic) and RTUs (remote terminal units) at remote sites, an HMI (human-machine interface) where operators see and command the process, and a HISTORIAN that records process data. Many run a real-time operating system (RTOS) that guarantees actions happen within strict deadlines. OT differs from IT in important ways. SAFETY and AVAILABILITY come first: a plant that stops or a safety system that fails can hurt people, so confidentiality is usually the lowest priority. Equipment lives for decades, often runs legacy operating systems, and cannot be patched casually because downtime is expensive and vendors must certify changes. Classic industrial protocols such as Modbus and DNP3 were designed for reliability on closed networks and typically have NO authentication or encryption. The Purdue model describes the layers: Level 0 is the physical process (sensors and actuators), Level 1 is basic control (PLCs), Level 2 is supervisory control (HMI, SCADA servers), Level 3 is site operations (historians and manufacturing systems), then an IT/OT demilitarized zone, Level 4 is the business network, and Level 5 is the Internet and cloud. The defensive strategy is built on that structure: strict SEGMENTATION between IT and OT with controlled, monitored conduits, minimal and tightly controlled remote access (jump host, MFA), application allowlisting, a complete asset inventory, physical security, and PASSIVE monitoring (listening to traffic instead of scanning actively, because probes can crash fragile devices). Where patching is impossible, use compensating controls such as virtual patching and network isolation. Air gaps help but are leaky: USB drives and vendor laptops cross them, as the Stuxnet malware showed.",
        deepDive: [
          { h: "IT versus OT priorities", list: [
            "IT: confidentiality, integrity, availability (in that rough order).",
            "OT: safety and availability first, then integrity, with confidentiality last.",
            "IT patches monthly and reboots; OT may run for years between maintenance windows.",
            "IT systems last 3 to 5 years; OT equipment can last 20 to 30."
          ] },
          { h: "The Purdue model, level by level", list: [
            "Level 0: the physical process, sensors, and actuators.",
            "Level 1: basic control; PLCs and RTUs.",
            "Level 2: supervisory control; HMIs and SCADA servers.",
            "Level 3: site operations; historians and production management systems.",
            "Level 3.5: the IT/OT demilitarized zone (DMZ) where data is exchanged safely.",
            "Level 4: enterprise/business systems.",
            "Level 5: the Internet and cloud services."
          ] },
          { h: "Why OT is hard to secure", list: [
            "Unauthenticated protocols (Modbus, DNP3) trust any device on the network.",
            "Legacy, unsupported operating systems that cannot be updated.",
            "Active vulnerability scans can disrupt or crash controllers.",
            "Vendor remote access is often permanent and weakly protected.",
            "IT and OT networks are increasingly connected for efficiency, widening the attack surface."
          ] },
          { h: "Practical controls", list: [
            "Segment with firewalls between Purdue levels and between IT and OT; allow only required protocols and directions.",
            "Use a jump host with MFA and session logging for all remote access; remove permanent vendor tunnels.",
            "Monitor passively with network sensors that understand industrial protocols.",
            "Allowlist applications on HMIs and engineering workstations.",
            "Use data diodes (one-way gateways) where data must leave a sensitive zone but nothing may enter.",
            "Control USB and removable media and scan vendor laptops before connecting them."
          ] },
          { h: "Real-world lessons", p: "Stuxnet (discovered 2010) spread by USB drives into an air-gapped facility and manipulated industrial controllers while showing operators normal readings. Later attacks on safety systems showed that adversaries study OT deliberately. In the Colonial Pipeline incident of 2021, ransomware hit the company's IT systems, and the operator shut down pipeline operations as a precaution, showing how IT compromise can force an OT outage even without touching controllers." }
        ],
        keyTerms: [
          { term: "OT", def: "Operational Technology: systems that monitor and control physical processes." },
          { term: "ICS", def: "Industrial Control System: the family of systems used to control industrial processes." },
          { term: "SCADA", def: "Supervisory Control and Data Acquisition: supervises and controls distributed industrial equipment from a central location." },
          { term: "PLC", def: "Programmable Logic Controller: a rugged controller that executes control logic for a physical process." },
          { term: "HMI", def: "Human-Machine Interface: the operator's screen to view and command the process." },
          { term: "RTU", def: "Remote Terminal Unit: a field device that collects data and relays commands at remote sites." },
          { term: "Historian", def: "A system that records time-series process data." },
          { term: "RTOS", def: "Real-Time Operating System: guarantees tasks complete within strict deadlines." },
          { term: "Purdue Model", def: "A layered reference architecture (Levels 0 to 5) for separating industrial and business networks." },
          { term: "Data Diode", def: "A hardware device that allows data to flow in only one direction." }
        ],
        analogy:
          "IT is the office, where a computer crash means lost documents. OT is the factory floor, where a 'crash' can mean a spilled chemical or a stopped city water supply. The PLC is the factory's autopilot, the HMI is the cockpit display, and the Purdue model is the series of locked doors between the cockpit, the control room, and the head office, with a guarded lobby (the DMZ) in between.",
        technical:
          "A water utility's treatment plant uses PLCs to run pumps and chemical dosing, controlled from an HMI in the plant control room and from a SCADA server at headquarters over cellular links. After a risk assessment, the utility inventories every device, places a firewall between the plant network and the corporate network with a DMZ for the historian, replaces a permanent vendor VPN with an MFA-protected jump host, and installs a passive monitoring sensor that alerts when an unknown device sends write commands to a PLC. Because the old HMI cannot be patched, it is isolated on its own segment with application allowlisting.",
        table: {
          headers: ["Purdue level", "What lives there", "Examples"],
          rows: [
            ["0", "Physical process", "Sensors, actuators, motors, valves"],
            ["1", "Basic control", "PLCs, RTUs"],
            ["2", "Supervisory control", "HMIs, SCADA servers"],
            ["3", "Site operations", "Historians, production management"],
            ["3.5", "IT/OT DMZ", "Jump hosts, data replication servers"],
            ["4", "Business network", "ERP, email, corporate systems"],
            ["5", "Internet / cloud", "External services and partners"]
          ]
        },
        confusion: [
          { a: "SCADA", b: "ICS", diff: "ICS is the broad category of industrial control systems. SCADA is one type, focused on supervising spread-out sites from a central point." },
          { a: "PLC", b: "HMI", diff: "The PLC runs the control logic directly on the process. The HMI is the human operator's interface to monitor and command it." },
          { a: "IT priorities", b: "OT priorities", diff: "IT often prioritizes confidentiality. OT prioritizes safety and availability first, with confidentiality last." },
          { a: "Air gap", b: "Segmentation", diff: "An air gap is physical isolation with no network connection. Segmentation allows controlled, monitored connections. Air gaps are still bridged by USB drives and laptops." },
          { a: "Active scanning", b: "Passive monitoring", diff: "Active scans send probes that can crash fragile OT devices. Passive monitoring only listens to traffic." }
        ],
        soc: "OT monitoring watches for changes that IT tools miss: an unknown device appearing on a control network, a PLC receiving program-download commands outside a maintenance window, or a remote session from a vendor at an odd hour. Any alert in OT must be weighed against safety and operational impact, so responders coordinate with plant engineers before isolating anything.",
        patterns: [
          ["Controls a physical process such as a valve or pump", "OT / ICS"],
          ["Supervises distributed sites from a central point", "SCADA"],
          ["Runs control logic for machinery", "PLC"],
          ["Operator's screen to view and command the process", "HMI"],
          ["Cannot be patched; long equipment lifespan", "Compensating controls: segmentation, allowlisting, virtual patching"],
          ["Scanning could crash the controller", "Use passive monitoring"],
          ["Data must leave a sensitive zone but nothing may enter", "Data diode (one-way gateway)"],
          ["Neutral zone between IT and OT networks", "DMZ (Purdue Level 3.5)"]
        ],
        takeaways: [
          "OT puts safety and availability first, which changes how you patch, scan, and respond.",
          "Segmentation along the Purdue model, with a DMZ and controlled conduits, is the foundation.",
          "Monitor passively; use compensating controls where patching is impossible."
        ],
        remember: [
          "OT priorities: safety and availability first; confidentiality last.",
          "PLC = control logic on the process. HMI = operator interface. SCADA = central supervision of distributed sites. RTU = remote field unit.",
          "Modbus and DNP3 were built without authentication or encryption.",
          "Purdue model: Level 0 process, 1 control, 2 supervisory, 3 operations, 3.5 IT/OT DMZ, 4 business, 5 Internet.",
          "Use passive monitoring; active scans can crash devices.",
          "Cannot patch? Segment, allowlist, virtual patch, and restrict remote access.",
          "Air gaps are bridged by USB drives and vendor laptops (Stuxnet)."
        ],
        taglish:
          "Ang OT ang mga sistemang kumokontrol sa totoong mundo: valve, pump, makina. Kaya iba ang prayoridad: kaligtasan at availability muna, at pinakahuli ang confidentiality. Ang PLC ang nagpapatakbo ng control logic, ang HMI ang screen ng operator, at ang SCADA ang nagbabantay sa maraming site mula sa gitna. Kadalasan, luma na ang mga kagamitan at hindi basta-basta mapa-patch, at walang authentication ang mga protocol tulad ng Modbus. Kaya hiwalay dapat ang IT at OT (Purdue model, may DMZ sa gitna), passive monitoring ang gamitin (hindi active scan na pwedeng mag-crash), at mahigpit ang remote access."
      },
      {
        id: "d3-t161",
        title: "Disaster Recovery Sites and Testing: Hot, Warm, Cold, and Failover",
        tag: "3.4",
        minutes: 20,
        goal: "Choose the right recovery site type for a given RTO and budget, compare replication methods, and match each testing method to what it proves.",
        why: "Resilience questions turn on matching business needs to a site type and a test type. The trade-off is always speed versus cost, and the testing methods differ in risk and realism.",
        simple:
          "When a primary site is lost, an organization recovers at an ALTERNATE SITE. A HOT SITE is fully equipped and kept running with near-real-time copies of data, so failover takes minutes to hours; it is the most expensive. A WARM SITE has hardware and connectivity in place but needs recent data restored from backups, so recovery takes hours to days at moderate cost. A COLD SITE is just space, power, and cooling with no equipment or data, taking days to weeks to bring online; it is the cheapest. A MOBILE site is a trailer or container that can be driven to where it is needed, and CLOUD-based recovery (disaster recovery as a service) provides capacity on demand. The site you pick comes straight from the BUSINESS IMPACT ANALYSIS: a short RTO (recovery time objective) and short RPO (recovery point objective) demand a hot site, while a lenient one can use warm or cold. GEOGRAPHIC DISPERSION matters too: an alternate site in the same flood zone or power grid offers little protection. Data reaches the alternate site by REPLICATION. Synchronous replication writes to both sites at the same time, giving almost zero data loss but requiring low latency and therefore limited distance. Asynchronous replication copies data with a short delay, so it works over long distances but can lose the last few moments. JOURNALING records every change in a log so a system can replay or roll back to a consistent state, and SNAPSHOTS capture a point-in-time image. Plans must be TESTED, and the testing methods differ. A TABLETOP exercise is a discussion of a scenario with no systems touched. A WALKTHROUGH steps through the plan's procedures. A SIMULATION runs a realistic scenario with some hands-on activity. PARALLEL PROCESSING brings up the recovery systems while production keeps running, proving recoverability without risk. A FULL INTERRUPTION (failover) test actually shifts production to the alternate site; it is the most realistic and the riskiest. Every test should produce lessons learned and plan updates.",
        deepDive: [
          { h: "Site types compared", list: [
            "Hot: equipment installed, data live; recovery in minutes to hours; highest cost; for critical functions.",
            "Warm: equipment present, data restored from recent backups; hours to days; mid cost.",
            "Cold: empty facility; days to weeks; lowest cost; for non-critical functions.",
            "Mobile: portable trailer or container; flexible but limited capacity.",
            "Cloud / DRaaS: pay-as-you-go recovery capacity; fast to start, but requires planning for bandwidth and access."
          ] },
          { h: "Matching site to objective", list: [
            "RTO of minutes and RPO near zero: hot site with synchronous or near-synchronous replication.",
            "RTO of hours to a day: warm site with frequent backups or asynchronous replication.",
            "RTO of weeks and tolerance for data loss: cold site or rebuild from backups.",
            "Always confirm with the BIA and revisit when the business changes."
          ] },
          { h: "Replication and data protection", list: [
            "Synchronous: both sites confirm every write; near-zero loss; latency limits distance.",
            "Asynchronous: small lag; works over any distance; some data may be lost in a failure.",
            "Journaling: transaction log used to replay or roll back to a consistent state.",
            "Snapshots: point-in-time images; fast to take, not a replacement for off-site backups.",
            "Remember backups must be tested by actually restoring them."
          ] },
          { h: "Testing methods from safest to riskiest", list: [
            "Tabletop: discuss the scenario around a table; checks roles, communication, and assumptions.",
            "Walkthrough: read through the procedures step by step to find gaps.",
            "Simulation: realistic scenario with partial hands-on actions.",
            "Parallel processing: run recovery systems alongside production to prove they work.",
            "Full interruption / failover: move production to the alternate site; proves everything and carries real risk."
          ] },
          { h: "Related resilience ideas", list: [
            "Platform diversity and multi-cloud: avoid a single vendor or technology failure.",
            "Continuity of operations planning (COOP): keep essential functions running during disruption.",
            "Capacity planning: the alternate site must handle the load it takes over.",
            "Power: UPS bridges short outages and generators supply long ones."
          ] }
        ],
        keyTerms: [
          { term: "Hot Site", def: "A fully equipped alternate site with live data; recovery in minutes to hours." },
          { term: "Warm Site", def: "An alternate site with equipment but needing recent data restored; recovery in hours to days." },
          { term: "Cold Site", def: "An alternate site with space and utilities only; recovery in days to weeks." },
          { term: "Synchronous Replication", def: "Writes confirmed at both sites at once; near-zero data loss, distance-limited." },
          { term: "Asynchronous Replication", def: "Data copied with a delay; works over distance but may lose recent data." },
          { term: "Journaling", def: "Logging changes so a system can recover to a consistent state." },
          { term: "Tabletop Exercise", def: "A discussion-based walk through a disaster scenario." },
          { term: "Parallel Processing Test", def: "Running recovery systems alongside production to verify they work." },
          { term: "Failover", def: "Switching production workloads to the alternate site or system." },
          { term: "DRaaS", def: "Disaster Recovery as a Service: cloud-provided recovery capacity." }
        ],
        analogy:
          "Think of a restaurant that loses its kitchen. A hot site is a second, fully staffed kitchen running next door with the same ingredients, ready to serve in minutes. A warm site is a kitchen with the stoves installed but you must bring the day's ingredients. A cold site is an empty room with a gas line; you must buy and install everything. A tabletop test is the managers talking through 'what if the kitchen burns down'; a full failover test is actually closing the real kitchen for a day and serving from the backup.",
        technical:
          "A payments company's BIA sets an RTO of 15 minutes and an RPO of near zero for its transaction system, so it runs a hot site 80 kilometers away using synchronous replication over a dedicated link. Its HR and reporting systems have an RTO of three days and use a warm site with nightly backups. Each year it runs a tabletop exercise with executives, a parallel processing test every quarter that brings up the recovery environment without touching production, and one annual planned failover during a low-traffic window.",
        table: {
          headers: ["Site", "Equipment", "Data", "Recovery time", "Cost"],
          rows: [
            ["Hot", "Installed and running", "Live replication", "Minutes to hours", "Highest"],
            ["Warm", "Installed", "Restore from recent backup", "Hours to days", "Medium"],
            ["Cold", "None", "None", "Days to weeks", "Lowest"],
            ["Cloud (DRaaS)", "On demand", "Replicated or restored", "Minutes to hours depending on design", "Pay as you use"]
          ]
        },
        confusion: [
          { a: "Hot site", b: "Warm site", diff: "A hot site already has current data and is nearly ready to run. A warm site has equipment but must restore data first, so it is slower and cheaper." },
          { a: "Synchronous replication", b: "Asynchronous replication", diff: "Synchronous gives near-zero data loss but needs low latency. Asynchronous tolerates distance but can lose recent data." },
          { a: "Tabletop", b: "Simulation", diff: "A tabletop is a discussion only. A simulation includes realistic hands-on actions." },
          { a: "Parallel processing", b: "Full interruption", diff: "Parallel testing runs recovery systems beside production with no disruption. Full interruption actually moves production, which is riskier." },
          { a: "Snapshot", b: "Backup", diff: "A snapshot is a quick point-in-time copy usually on the same system. A backup is a separate copy that survives loss of that system." }
        ],
        soc: "Incident responders depend on tested recovery: after a ransomware event, the question is which clean backups and which alternate environment can be brought up within the RTO. Exercises also test communication, so people know who declares a disaster and who approves a failover.",
        patterns: [
          ["Minutes of downtime tolerated; very little data loss", "Hot site with synchronous replication"],
          ["Cheapest option; days to weeks to recover", "Cold site"],
          ["Hardware ready, data restored from backups", "Warm site"],
          ["Discussion-only exercise with managers", "Tabletop"],
          ["Bring up recovery systems while production keeps running", "Parallel processing test"],
          ["Actually shift production to the alternate site", "Full interruption / failover test"],
          ["Long distance between sites; some data loss acceptable", "Asynchronous replication"],
          ["Alternate site in the same flood zone", "Poor geographic dispersion"]
        ],
        takeaways: [
          "Pick the site from the BIA: the shorter the RTO and RPO, the hotter (and costlier) the site.",
          "Synchronous replication protects data but limits distance; asynchronous trades some data for distance.",
          "Test in increasing realism and risk: tabletop, walkthrough, simulation, parallel, full failover."
        ],
        remember: [
          "Hot = live and ready (minutes-hours, most expensive). Warm = equipment, restore data (hours-days). Cold = empty shell (days-weeks, cheapest).",
          "Choose the site type from the BIA's RTO and RPO.",
          "Synchronous = near-zero loss, distance-limited. Asynchronous = distance-friendly, possible data loss.",
          "Tabletop = discussion. Parallel = run beside production. Full interruption = move production (riskiest).",
          "Geographic dispersion: do not put the alternate site in the same disaster zone.",
          "Test backups by restoring them; every test ends with lessons learned and plan updates.",
          "Cloud DRaaS provides recovery capacity on demand."
        ],
        taglish:
          "Hot site, kumpleto at live ang data, ilang minuto lang ang recovery pero pinakamahal. Warm site, may kagamitan pero kailangan pang i-restore ang data mula sa backup. Cold site, bakanteng lugar lang, pinakamura pero linggo ang bibilangin. Piliin ayon sa RTO at RPO mula sa BIA. Sa pag-test: tabletop (usapan lang), simulation (may kaunting hands-on), parallel (patakbuhin ang recovery habang tuloy ang production), at full interruption (talagang ililipat ang production, pinakadelikado pero pinakatotoo). Huwag ilagay ang alternate site sa parehong lugar na pwedeng bahain o mawalan ng kuryente."
      }
    ]
  },

  tips: {
    "d1-t160": "Ask what is left behind: a fake or partial value = masking, a random placeholder with a vault = tokenization, a key-reversible scramble = encryption, a hidden message inside a picture = steganography. If the question mentions shrinking PCI scope, the answer is tokenization.",
    "d1-t161": "Match the verb: 'request' = CSR, 'list of revoked serials' = CRL, 'real-time status check' = OCSP, 'server provides the status' = stapling, 'only accept this one certificate' = pinning. A stolen private key always means revoke and reissue with a new key pair.",
    "d2-t160": "Decide whether it is an attack or a management failure: breaking out of a VM is VM escape (attack), too many forgotten VMs is sprawl (management), leftover data for the next tenant is resource reuse. For cloud breaches, default to customer misconfiguration.",
    "d3-t160": "When a scenario mentions industrial equipment, flip your priorities: safety and availability first, passive monitoring instead of scans, segmentation and compensating controls instead of patching. PLC runs the logic, HMI shows it to the operator, SCADA supervises many sites.",
    "d3-t161": "Rank by cost and speed: hot (fast, costly) > warm > cold (slow, cheap), and pick from the stated RTO. For testing, the more a test touches production, the riskier it is: tabletop is safest, full interruption is riskiest."
  },

  summaries: {
    "d1-t160": "Masking hides real values behind fake ones, tokenization swaps them for random tokens kept in a vault, steganography hides that a message exists, and a blockchain makes records tamper-evident but not confidential.",
    "d1-t161": "A certificate is requested with a CSR, validated through a trusted chain, and cancelled early by revocation, which clients learn about through CRLs, OCSP, or a stapled OCSP response; pinning narrows which certificates an app will trust.",
    "d2-t160": "Virtualization adds risks like VM escape, sprawl, and resource reuse, while most cloud breaches come from customer misconfiguration such as public storage and over-permissive access.",
    "d3-t160": "Industrial and operational technology puts safety and availability first, runs legacy equipment that is hard to patch, and is defended by Purdue-style segmentation, tight remote access, and passive monitoring.",
    "d3-t161": "Hot, warm, and cold sites trade cost against recovery speed, replication can be synchronous or asynchronous, and recovery plans are validated through tests ranging from a tabletop discussion to a full failover."
  },

  questions: [
    {
      id: "q-x-d1-7", domainId: "d1", tag: "d1-t160", type: "single",
      prompt: "A retailer wants its payment application to store no real card numbers, keeping them only in a small, tightly controlled vault, so that a database theft yields nothing usable. Which technique does this describe?",
      choices: [
        { id: "a", text: "Tokenization" },
        { id: "b", text: "Steganography" },
        { id: "c", text: "Hashing" },
        { id: "d", text: "Obfuscation" }
      ],
      correct: "a",
      explanation: "Tokenization replaces the real value with a random token and stores the mapping in a protected vault, so stolen tokens are worthless.",
      distractorExplanations: {
        b: "Steganography hides the existence of data inside another file; it does not replace values with tokens.",
        c: "Hashing is one-way and cannot restore the card number when the business needs it.",
        d: "Obfuscation makes data or code harder to understand but does not remove the real data from the system."
      }
    },
    {
      id: "q-x-d1-8", domainId: "d1", tag: "d1-t160", type: "single",
      prompt: "A security analyst finds that large JPEG images uploaded by an employee are far bigger than normal photos and contain stolen documents inside the pixel data. Which technique is being used?",
      choices: [
        { id: "a", text: "Steganography" },
        { id: "b", text: "Tokenization" },
        { id: "c", text: "Data masking" },
        { id: "d", text: "Key stretching" }
      ],
      correct: "a",
      explanation: "Steganography hides data inside another file, such as an image, so the very existence of the data is concealed.",
      distractorExplanations: {
        b: "Tokenization substitutes values with tokens and is a data protection method, not a hiding technique for exfiltration.",
        c: "Masking replaces real values with fake or partial ones for display or testing.",
        d: "Key stretching slows password guessing and has nothing to do with hiding files."
      }
    },
    {
      id: "q-x-d1-9", domainId: "d1", tag: "d1-t161", type: "single",
      prompt: "A web server administrator wants clients to receive proof that the server's certificate has not been revoked without each client contacting the certificate authority. Which feature should be enabled?",
      choices: [
        { id: "a", text: "OCSP stapling" },
        { id: "b", text: "A longer CRL download interval" },
        { id: "c", text: "Certificate pinning" },
        { id: "d", text: "A wildcard certificate" }
      ],
      correct: "a",
      explanation: "With OCSP stapling, the server attaches a signed, recent OCSP response to the TLS handshake so clients do not need to query the CA themselves.",
      distractorExplanations: {
        b: "A less frequent CRL download makes revocation information staler, not better.",
        c: "Pinning restricts which certificate a client accepts and does not deliver revocation status.",
        d: "A wildcard certificate covers many subdomains and does not provide revocation proof."
      }
    },
    {
      id: "q-x-d1-10", domainId: "d1", tag: "d1-t161", type: "single",
      prompt: "A server's private key is believed to have been stolen. What should the administrator do FIRST regarding the certificate?",
      choices: [
        { id: "a", text: "Revoke the certificate and request a new one using a new key pair" },
        { id: "b", text: "Wait for the certificate to expire naturally" },
        { id: "c", text: "Reissue the certificate using the same private key" },
        { id: "d", text: "Convert it to a self-signed certificate" }
      ],
      correct: "a",
      explanation: "A compromised private key means the certificate can no longer be trusted, so it must be revoked and replaced with a certificate from a new key pair.",
      distractorExplanations: {
        b: "Waiting leaves a certificate backed by a stolen key trusted until it expires.",
        c: "Reusing the compromised private key leaves the same weakness in place.",
        d: "A self-signed certificate would not be trusted by clients and does not fix the compromise."
      }
    },
    {
      id: "q-x-d2-7", domainId: "d2", tag: "d2-t160", type: "single",
      prompt: "An audit discovers hundreds of virtual machines that nobody owns, many unpatched and still holding data. Which virtualization problem does this describe?",
      choices: [
        { id: "a", text: "VM sprawl" },
        { id: "b", text: "VM escape" },
        { id: "c", text: "A side-channel attack" },
        { id: "d", text: "A buffer overflow" }
      ],
      correct: "a",
      explanation: "VM sprawl is the uncontrolled growth of virtual machines that are forgotten, unpatched, and unmanaged.",
      distractorExplanations: {
        b: "VM escape is an attack that breaks out of a virtual machine to reach the hypervisor or host.",
        c: "A side-channel attack infers secrets from shared hardware behavior, which is not described here.",
        d: "A buffer overflow is a memory-handling software flaw, not a management problem."
      }
    },
    {
      id: "q-x-d2-8", domainId: "d2", tag: "d2-t160", type: "single",
      prompt: "A company's customer data is exposed because a cloud storage bucket was configured for public access. Under the shared responsibility model, who is MOST likely responsible?",
      choices: [
        { id: "a", text: "The customer, for misconfiguring the storage" },
        { id: "b", text: "The cloud provider, for the physical data center" },
        { id: "c", text: "The hypervisor vendor" },
        { id: "d", text: "No one; it is an unavoidable risk" }
      ],
      correct: "a",
      explanation: "Securing data and configuring access to cloud resources is the customer's responsibility under the shared responsibility model.",
      distractorExplanations: {
        b: "The provider secures the underlying facilities and infrastructure, not the customer's bucket settings.",
        c: "The hypervisor vendor is not responsible for how a customer sets access to its storage.",
        d: "Misconfiguration is preventable with correct settings and posture management."
      }
    },
    {
      id: "q-x-d3-5", domainId: "d3", tag: "d3-t160", type: "single",
      prompt: "A utility wants to monitor its industrial network for anomalies, but active vulnerability scans have crashed fragile controllers in the past. Which approach is BEST?",
      choices: [
        { id: "a", text: "Passive network monitoring that only listens to traffic" },
        { id: "b", text: "More frequent active scans at night" },
        { id: "c", text: "Replacing all controllers every year" },
        { id: "d", text: "Connecting the controllers directly to the Internet for cloud monitoring" }
      ],
      correct: "a",
      explanation: "Passive monitoring observes traffic without sending probes, so it does not disrupt fragile industrial devices.",
      distractorExplanations: {
        b: "More frequent active scans would increase the risk of crashing controllers.",
        c: "Annual replacement is impractical given long equipment lifecycles and costs.",
        d: "Direct Internet exposure greatly increases attack risk for industrial systems."
      }
    },
    {
      id: "q-x-d3-6", domainId: "d3", tag: "d3-t160", type: "single",
      prompt: "In an industrial environment, which device runs the control logic that directly operates machinery such as pumps and valves?",
      choices: [
        { id: "a", text: "PLC" },
        { id: "b", text: "HMI" },
        { id: "c", text: "Historian" },
        { id: "d", text: "SIEM" }
      ],
      correct: "a",
      explanation: "A programmable logic controller executes the control logic that operates physical equipment.",
      distractorExplanations: {
        b: "An HMI is the operator's interface for viewing and commanding the process, not the device running the control logic.",
        c: "A historian records process data over time.",
        d: "A SIEM collects and correlates security logs; it does not run machinery."
      }
    },
    {
      id: "q-x-d3-7", domainId: "d3", tag: "d3-t161", type: "single",
      prompt: "A hospital needs its patient records system back within minutes of a data center failure, with almost no data loss. Which recovery arrangement BEST fits?",
      choices: [
        { id: "a", text: "A hot site with synchronous replication" },
        { id: "b", text: "A cold site" },
        { id: "c", text: "A warm site restoring from weekly backups" },
        { id: "d", text: "Rebuilding from scratch after the disaster" }
      ],
      correct: "a",
      explanation: "A very short RTO and near-zero RPO require a hot site with live (synchronous) replication.",
      distractorExplanations: {
        b: "A cold site takes days to weeks to bring online.",
        c: "Restoring from weekly backups would take hours to days and lose up to a week of data.",
        d: "Rebuilding takes far longer than minutes and has no data protection."
      }
    },
    {
      id: "q-x-d3-8", domainId: "d3", tag: "d3-t161", type: "single",
      prompt: "A team wants to test its disaster recovery plan by bringing up recovery systems while production continues to run normally. Which test is this?",
      choices: [
        { id: "a", text: "Parallel processing test" },
        { id: "b", text: "Tabletop exercise" },
        { id: "c", text: "Full interruption test" },
        { id: "d", text: "Walkthrough" }
      ],
      correct: "a",
      explanation: "A parallel processing test runs the recovery environment alongside production, proving it works without disrupting operations.",
      distractorExplanations: {
        b: "A tabletop is a discussion of a scenario and does not start any systems.",
        c: "A full interruption test actually moves production to the alternate site.",
        d: "A walkthrough reviews plan procedures step by step without running recovery systems."
      }
    }
  ],

  glossary: [
    { term: "Tokenization", domain: "d1", plain: "Swapping a sensitive value for a random placeholder kept in a vault.", technical: "Replacing sensitive data with a non-sensitive token that has no mathematical relationship to the original; the mapping is stored in a secured vault.", example: "A payment token stored instead of a real card number." },
    { term: "Steganography", domain: "d1", plain: "Hiding a secret message inside an ordinary-looking file.", technical: "Concealing the existence of data within a carrier such as an image, audio file, or network traffic.", example: "Stolen files hidden in the pixels of a photo." },
    { term: "Blockchain", domain: "d1", plain: "A shared record where each entry is chained to the one before.", technical: "A distributed ledger of hash-linked blocks agreed on through consensus, providing tamper evidence.", example: "Tracking a product's journey through a supply chain." },
    { term: "OCSP Stapling", domain: "d1", plain: "The server hands you proof its certificate is still good.", technical: "A TLS extension in which the server includes a signed, timestamped OCSP response in the handshake.", example: "A web server delivering a fresh status with each connection." },
    { term: "Certificate Pinning", domain: "d1", plain: "An app only trusts one specific certificate or key.", technical: "Configuring a client to accept only a specified certificate or public key for a service.", example: "A banking app rejecting any other certificate for its server." },
    { term: "VM Escape", domain: "d2", plain: "Breaking out of a virtual machine into the host.", technical: "An attack in which code inside a VM bypasses isolation to access the hypervisor, host, or other VMs.", example: "A flaw in virtual hardware used to reach other tenants." },
    { term: "VM Sprawl", domain: "d2", plain: "Too many forgotten virtual machines.", technical: "Uncontrolled proliferation of virtual machines that are unmanaged, unpatched, and unmonitored.", example: "Hundreds of old test VMs still running." },
    { term: "SCADA", domain: "d3", plain: "A system that supervises equipment across many sites from one place.", technical: "Supervisory Control and Data Acquisition: a type of ICS that gathers data from and controls geographically distributed equipment.", example: "A pipeline control center." },
    { term: "PLC", domain: "d3", plain: "A rugged computer that runs machinery.", technical: "Programmable Logic Controller: executes control logic for industrial processes.", example: "A controller that runs a factory conveyor." },
    { term: "Purdue Model", domain: "d3", plain: "A layered map of industrial networks.", technical: "A reference architecture dividing industrial and business networks into levels 0 to 5 with segmentation between them.", example: "Level 3.5 DMZ between plant and corporate networks." },
    { term: "Hot Site", domain: "d3", plain: "A ready-to-go backup location.", technical: "A fully equipped alternate site with live data that can take over in minutes to hours.", example: "A mirrored data center in another region." },
    { term: "Warm Site", domain: "d3", plain: "A backup location with equipment but old data.", technical: "An alternate site with hardware and connectivity that requires data restoration before use.", example: "Servers installed, data restored from last night's backup." },
    { term: "Cold Site", domain: "d3", plain: "An empty backup location.", technical: "An alternate facility with space and utilities but no equipment or data.", example: "A leased empty room for emergencies." }
  ],

  acronyms: [
    { acro: "CSR", expansion: "Certificate Signing Request", meaning: "A request sent to a CA containing the public key and identity details." },
    { acro: "CRL", expansion: "Certificate Revocation List", meaning: "A CA-published list of revoked certificates." },
    { acro: "OCSP", expansion: "Online Certificate Status Protocol", meaning: "A real-time check of a certificate's revocation status." },
    { acro: "OT", expansion: "Operational Technology", meaning: "Systems that monitor and control physical processes." },
    { acro: "ICS", expansion: "Industrial Control System", meaning: "Systems used to control industrial processes." },
    { acro: "SCADA", expansion: "Supervisory Control and Data Acquisition", meaning: "A type of ICS that supervises distributed equipment from a central point." },
    { acro: "PLC", expansion: "Programmable Logic Controller", meaning: "A rugged controller that runs industrial control logic." },
    { acro: "HMI", expansion: "Human-Machine Interface", meaning: "The operator's interface for monitoring and commanding a process." },
    { acro: "RTU", expansion: "Remote Terminal Unit", meaning: "A field device that collects data and relays commands at remote sites." },
    { acro: "RTOS", expansion: "Real-Time Operating System", meaning: "An operating system guaranteeing tasks meet strict timing deadlines." },
    { acro: "CSPM", expansion: "Cloud Security Posture Management", meaning: "Tools that continuously detect cloud misconfigurations." },
    { acro: "CASB", expansion: "Cloud Access Security Broker", meaning: "A control point enforcing security policy between users and cloud services." },
    { acro: "DRaaS", expansion: "Disaster Recovery as a Service", meaning: "Cloud-provided recovery capacity on demand." },
    { acro: "COOP", expansion: "Continuity of Operations Planning", meaning: "Planning to keep essential functions running during disruption." }
  ]
});
