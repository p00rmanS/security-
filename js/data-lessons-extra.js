/* Additional lessons, closing SY0-701 coverage gaps found in a keyword audit
   (no existing lesson covered SPF/DKIM/DMARC, DNSSEC, TPM/HSM, IPsec,
   NIST frameworks, gap analysis, or hashing/salting in depth).

   This file loads AFTER data-domains.js, data-protips.js,
   data-quicksummaries.js, data-questions.js, data-glossary.js and
   data-acronyms.js and merges into those globals, so the large original
   data files stay untouched.

   New in this file: every lesson here also carries a `remember` array, the
   "What to remember" box shown near the end of the lesson. For older
   lessons the app falls back to their `takeaways`. */

(function () {
  "use strict";

  const NEW_LESSONS = {
    /* ===================== DOMAIN 1 ===================== */
    d1: [
      {
        id: "d1-t6",
        title: "Hashing, Salting, and Digital Signatures",
        tag: "1.4",
        minutes: 18,
        goal: "Explain what hashing guarantees, how salting protects stored passwords, and how a digital signature combines a hash with asymmetric keys to prove integrity, authenticity, and non-repudiation.",
        why: "Hashing, salting, and signatures are tested constantly, and they are easy to mix up with encryption. Nearly every question about integrity, password storage, or 'proof the sender really sent this' comes down to which of these tools fits.",
        simple:
          "A hash function turns any input into a fixed-length fingerprint called a digest. It is one-way: you cannot work backwards from the digest to the original, and changing even one character of the input changes the digest completely. That makes hashing the standard tool for INTEGRITY: hash a file before and after transfer, and if the digests match, the file did not change. Hashing is not encryption, because there is no key and nothing to decrypt. Two different inputs producing the same digest is called a collision, and algorithms with practical collisions (MD5, SHA-1) are considered broken for security use; SHA-256 and the rest of SHA-2 or SHA-3 are the safe choices. For passwords, systems store the hash rather than the password. But plain hashes can be attacked with rainbow tables (huge precomputed lists of hash-to-password pairs), so each password gets a random SALT added before hashing. The salt is stored next to the hash and is not secret; its job is to make every hash unique, so precomputed tables are useless and two users with the same password get different hashes. A PEPPER is a secret value kept OUTSIDE the database. Slow, deliberately expensive algorithms such as PBKDF2 and bcrypt (key stretching) make each guess costly for an attacker. A digital signature hashes the message and then encrypts that hash with the sender's PRIVATE key; anyone can verify it with the sender's public key. That proves integrity (the hash matches), authentication (only the private key holder could sign), and non-repudiation (the sender cannot credibly deny it). A signature does not hide the message, so it provides no confidentiality. An HMAC mixes a shared secret key into the hash for integrity and authenticity between two parties, but because both share the key, it cannot provide non-repudiation.",
        keyTerms: [
          { term: "Hash / Digest", def: "A fixed-length, one-way fingerprint of data. Used to verify integrity; cannot be reversed." },
          { term: "Collision", def: "Two different inputs producing the same hash. A hash function with practical collisions is broken." },
          { term: "Salt", def: "A random, unique value added to a password before hashing. Stored with the hash; not secret. Defeats rainbow tables." },
          { term: "Pepper", def: "A secret value added to passwords before hashing and kept separate from the database (for example in a vault or HSM)." },
          { term: "Key Stretching", def: "Making each password guess slow on purpose (PBKDF2, bcrypt) so brute force becomes expensive." },
          { term: "Digital Signature", def: "A hash encrypted with the signer's private key. Provides integrity, authentication, and non-repudiation." },
          { term: "HMAC", def: "A hash combined with a shared secret key. Proves integrity and authenticity, but not non-repudiation." }
        ],
        analogy:
          "A hash is like a wax-sealed fingerprint of a document: if anyone changes a single word, the fingerprint no longer matches. A salt is like giving every customer a different random locker number before storing their ticket, so a thief with a list of common tickets cannot match any of them in bulk. A digital signature is your personal notary stamp: only you own the stamp (private key), but anyone can check that it is genuine (public key).",
        technical:
          "A software vendor publishes installer.exe along with its SHA-256 digest. After downloading, you compute the digest locally and compare: a mismatch means the file was corrupted or tampered with. Separately, the vendor signs the installer with its code-signing private key, and the operating system verifies that signature using the vendor's certificate before running it. On the server side, the vendor's login database stores 'salt + bcrypt hash' for each user, never the passwords themselves, so a stolen database does not hand the attacker working passwords.",
        table: {
          headers: ["Tool", "Key used?", "Provides", "Does NOT provide"],
          rows: [
            ["Hash (SHA-256)", "No", "Integrity", "Confidentiality, authentication"],
            ["Salted + stretched hash", "No (salt is not secret)", "Safer password storage", "Reversibility (by design)"],
            ["HMAC", "Shared secret", "Integrity + authenticity", "Non-repudiation"],
            ["Digital signature", "Private key signs, public key verifies", "Integrity + authentication + non-repudiation", "Confidentiality"],
            ["Encryption", "Key(s)", "Confidentiality", "Integrity on its own"]
          ]
        },
        confusion: [
          { a: "Hashing", b: "Encryption", diff: "Hashing is one-way and keyless: you cannot get the original back, and it protects integrity. Encryption is two-way with a key and protects confidentiality." },
          { a: "Salt", b: "Pepper", diff: "A salt is unique per password and stored alongside the hash; it is not secret. A pepper is a secret kept outside the database. Salt defeats rainbow tables; pepper adds protection if the database alone is stolen." },
          { a: "Digital signature", b: "HMAC", diff: "A signature uses an asymmetric key pair, so it proves who signed and gives non-repudiation. HMAC uses a shared secret, so either party could have produced it; no non-repudiation." },
          { a: "Signing a message", b: "Encrypting a message", diff: "You SIGN with your own private key (anyone verifies with your public key). You ENCRYPT with the recipient's public key (only their private key decrypts)." }
        ],
        soc: "When investigating a suspicious file, analysts hash it and look the digest up in threat-intelligence databases; a match to known malware is a fast, low-risk answer. During a breach review, finding unsalted MD5 password hashes in a leaked database tells you how quickly attackers can crack them, and drives the recommendation to move to salted bcrypt or PBKDF2.",
        takeaways: [
          "Hashing protects integrity and is one-way; it is not encryption.",
          "A salt makes every stored hash unique and defeats rainbow tables; it is not secret.",
          "A digital signature gives integrity, authentication, and non-repudiation, but no confidentiality."
        ],
        remember: [
          "Hash = integrity. Encrypt = confidentiality. Sign = integrity + authentication + non-repudiation.",
          "Signing uses the sender's PRIVATE key; verifying uses the sender's PUBLIC key.",
          "Salt: random, unique per password, stored with the hash, NOT secret. It defeats rainbow tables.",
          "Pepper: secret, stored OUTSIDE the database (vault or HSM).",
          "Key stretching (PBKDF2, bcrypt) makes password guessing slow on purpose.",
          "MD5 and SHA-1 have practical collisions: do not use them for security. SHA-256 and SHA-3 are fine.",
          "HMAC cannot give non-repudiation, because both sides share the same secret."
        ],
        taglish:
          "Ang hash parang fingerprint ng data: isang direksyon lang, hindi mo na maibabalik sa orihinal. Kaya hash ang gamit para i-check kung nabago ba ang file (integrity). Ang salt naman, random na dagdag sa bawat password bago i-hash, para kahit pareho ang password ng dalawang tao, magkaiba ang hash nila, at hindi gagana ang rainbow table. Digital signature? Hash ng message na naka-encrypt gamit ang private key mo. Kaya ang makaka-verify ay kahit sino gamit ang public key mo, at hindi mo na maitatanggi na ikaw ang pumirma (non-repudiation). Tandaan: walang confidentiality ang signature, kasi nababasa pa rin yung message."
      },
      {
        id: "d1-t7",
        title: "Hardware Security: TPM, HSM, and Secure Enclaves",
        tag: "1.4",
        minutes: 16,
        goal: "Distinguish the TPM, HSM, secure enclave, and key management service, and match each to the job it does best.",
        why: "The exam loves 'which hardware component should the company use?' questions. The wrong choice is usually a near-neighbor (TPM versus HSM), so knowing what each one is for, and where it lives, wins easy points.",
        simple:
          "Software-only key storage has a weakness: if the operating system is compromised, so are the keys. Dedicated hardware fixes that by keeping keys and crypto operations in a protected, tamper-resistant place. A TPM (Trusted Platform Module) is a small chip on a single computer's motherboard. It stores keys bound to THAT machine, records measurements of the boot process to prove the system has not been tampered with (measured boot and remote attestation), and enables features like full-disk encryption (BitLocker) so the drive only unlocks on the right device in the right state. An HSM (Hardware Security Module) is a separate, hardened, tamper-resistant device (a network appliance, PCIe card, or cloud service) built to generate, store, and use many keys at high speed for an entire organization: certificate authorities, payment processing, code signing, and database encryption keys. Keys inside an HSM are designed never to leave it in plaintext, and good HSMs are validated to FIPS 140. A secure enclave (also called a trusted execution environment) is an isolated area inside a processor where sensitive code and data run protected even from the operating system; phones use it for biometrics and payment credentials. A cloud key management service (KMS) offers key creation, rotation, and access policy as a managed service, often backed by HSMs. The rule of thumb: TPM protects ONE device, HSM protects an ORGANIZATION's keys, enclave protects a running PROCESS, KMS manages keys as a service.",
        keyTerms: [
          { term: "TPM", def: "Trusted Platform Module: a chip on one device's motherboard that stores keys, enables disk encryption, and attests to boot integrity." },
          { term: "HSM", def: "Hardware Security Module: a dedicated, tamper-resistant device for generating and using many keys at scale. Keys do not leave in plaintext." },
          { term: "Secure Enclave / TEE", def: "A protected region of a processor that isolates sensitive code and data, even from the operating system." },
          { term: "KMS", def: "Key Management Service: a managed service to create, store, rotate, and control access to keys, often HSM-backed." },
          { term: "Root of Trust", def: "A hardware-based starting point (like the TPM) that everything else in the chain of trust relies on." },
          { term: "Measured Boot / Attestation", def: "Recording each boot component's hash so a remote system can verify the device has not been tampered with." },
          { term: "Self-Encrypting Drive (SED)", def: "A drive that encrypts data in its own hardware controller, transparent to the operating system." }
        ],
        analogy:
          "A TPM is the lock built into one specific laptop, tied to that exact laptop. An HSM is the bank's vault: bigger, heavily guarded, and handling valuables for the whole company. A secure enclave is a locked room inside the processor where the work happens out of sight even from the building's own staff. A KMS is the bank's vault-as-a-service: you ask for keys and rules, someone else runs the building.",
        technical:
          "A laptop fleet uses BitLocker with the TPM so each drive can only be unlocked on its own machine, and only if the boot chain measures clean. The company's internal certificate authority keeps its root and issuing CA private keys in a network HSM so that even a domain admin cannot copy them out. The mobile app that stores payment tokens relies on the phone's secure enclave, and the cloud team uses a KMS with automatic rotation to protect database encryption keys.",
        table: {
          headers: ["Component", "Where it lives", "Scope", "Typical use"],
          rows: [
            ["TPM", "Chip on one device's motherboard", "That one device", "Disk encryption, secure boot, attestation"],
            ["HSM", "Network appliance, PCIe card, or cloud service", "Whole organization", "CA keys, code signing, payment keys"],
            ["Secure enclave / TEE", "Isolated area of the CPU / SoC", "A running process", "Biometrics, payment credentials"],
            ["KMS", "Cloud or managed service", "Cloud workloads", "Key creation, rotation, access policy"]
          ]
        },
        confusion: [
          { a: "TPM", b: "HSM", diff: "A TPM is a low-cost chip fixed to one device and used for that device's integrity and disk encryption. An HSM is a separate, high-performance, certified appliance that manages many keys for servers and applications." },
          { a: "TPM", b: "Secure enclave", diff: "A TPM is a separate chip that stores keys and measurements. A secure enclave is an isolated area inside the main processor that protects running code and data." },
          { a: "Full-disk encryption (software)", b: "Self-encrypting drive", diff: "Software FDE (like BitLocker) encrypts using the CPU. A self-encrypting drive does it in the drive's own hardware controller. Both can be unlocked with TPM-held keys." }
        ],
        soc: "If a laptop with a TPM-bound BitLocker key is stolen, the data is protected even if the drive is moved to another machine, so the incident often downgrades from a 'data breach' to a 'lost hardware' event. Analysts also watch for TPM attestation failures, which can signal boot-level tampering such as a bootkit.",
        takeaways: [
          "TPM protects one device; HSM protects an organization's keys at scale.",
          "A secure enclave isolates running code from the operating system itself.",
          "Hardware-backed keys are far harder to steal than keys kept in files or memory."
        ],
        remember: [
          "TPM: a chip on ONE device. Disk encryption, measured boot, attestation.",
          "HSM: a dedicated tamper-resistant device for MANY keys at scale (CAs, code signing, payments).",
          "Secure enclave / TEE: isolated area inside the CPU. Runs sensitive code away from the OS.",
          "KMS: keys as a managed cloud service, often backed by HSMs.",
          "Questions saying 'organization-wide', 'CA private key', or 'high-volume cryptographic operations' point to an HSM.",
          "Questions saying 'this laptop', 'BitLocker', or 'verify boot integrity' point to a TPM."
        ],
        taglish:
          "Isipin mo ang TPM bilang lock na naka-built-in sa mismong laptop mo, nakatali lang sa device na 'yon. Ang HSM naman ay parang vault ng bangko: malaki, sobrang higpit ng security, at pang-buong kumpanya ang keys na hawak nito (halimbawa, ang private key ng certificate authority). Ang secure enclave ay isang protected na kwarto sa loob ng processor mismo. At ang KMS ay HSM-style na serbisyo sa cloud. Sa exam: 'isang device' = TPM, 'buong organisasyon, maraming keys' = HSM."
      }
    ],

    /* ===================== DOMAIN 2 ===================== */
    d2: [
      {
        id: "d2-t13",
        title: "Denial of Service and DDoS Attacks",
        tag: "2.4",
        minutes: 16,
        goal: "Classify denial-of-service attacks (volumetric, protocol, application), explain amplification and reflection, and choose the right mitigation.",
        why: "Availability is one third of the CIA triad, and DDoS is the classic availability attack. Security+ expects you to recognize the attack type from a short description and pick the matching defense.",
        simple:
          "A denial-of-service (DoS) attack tries to make a service unavailable by overwhelming it or exhausting a resource. A distributed denial-of-service (DDoS) attack does the same from many machines at once, usually a botnet of compromised devices controlled through command and control, which makes it hard to block by simply banning one address. Attacks fall into three families. VOLUMETRIC attacks flood the network pipe itself with sheer bandwidth (UDP floods, ICMP floods). PROTOCOL attacks abuse how network protocols work to exhaust server or device state: a SYN flood sends many TCP connection starts and never completes the handshake, filling the connection table. APPLICATION-LAYER attacks send requests that look legitimate but are expensive to serve, such as an HTTP flood or a Slowloris attack that holds many connections open with painfully slow requests. Reflection and amplification are tricks attackers use to multiply their power: the attacker sends a small request with a SPOOFED source address (the victim's) to a third-party server such as an open DNS, NTP, or memcached server, and that server sends a much larger response to the victim. Defenses are layered: upstream scrubbing services and CDNs absorb floods, rate limiting and SYN cookies protect servers, a web application firewall filters application-layer floods, anycast spreads traffic across many locations, and the ISP can use remote-triggered blackhole routing as a last resort that sacrifices the targeted address to save the rest of the network. A legitimate traffic surge (a flash crowd) looks similar, so analysts check whether the sources and requests are actually normal.",
        keyTerms: [
          { term: "DoS vs DDoS", def: "DoS comes from one source; DDoS comes from many, usually a botnet." },
          { term: "Botnet", def: "A network of compromised devices controlled by an attacker, used to generate DDoS traffic." },
          { term: "SYN Flood", def: "A protocol attack that sends many TCP SYN packets without completing the handshake, exhausting the server's connection table." },
          { term: "Amplification", def: "A small request triggers a much larger response, multiplying the attacker's bandwidth." },
          { term: "Reflection", def: "Using a third-party server and a spoofed source address so the victim receives the responses." },
          { term: "Slowloris", def: "An application-layer attack that holds many connections open with slow, partial HTTP requests." },
          { term: "Blackhole Routing", def: "Dropping all traffic to a targeted address upstream to protect the rest of the network." }
        ],
        analogy:
          "A DoS is one person standing in a shop doorway so nobody else can enter. A DDoS is a thousand people crowding the door at once, so removing one of them fixes nothing. Amplification is like phoning a company's helpline with a fake callback number and a tiny question that triggers a huge printed catalog to be mailed to the victim.",
        technical:
          "An online store's website goes down during a sale. The monitoring dashboard shows inbound traffic from tens of thousands of unrelated addresses, mostly DNS responses the store never requested. That is a reflection and amplification attack. The team enables the cloud provider's DDoS scrubbing service, moves DNS and the website behind a CDN with anycast, and adds rate limits. Later, a different incident shows normal bandwidth but exhausted web-server threads from slow, partial requests: a Slowloris-style application attack, answered with connection timeouts and a WAF rule.",
        table: {
          headers: ["Family", "Target", "Example", "Best defense"],
          rows: [
            ["Volumetric", "Bandwidth", "UDP flood, DNS/NTP amplification", "Upstream scrubbing, CDN, anycast, ISP blackholing"],
            ["Protocol", "Server or device state", "SYN flood, Ping of Death", "SYN cookies, firewalls, rate limiting"],
            ["Application layer", "Web app or service", "HTTP flood, Slowloris", "WAF, rate limiting, timeouts, bot detection"]
          ]
        },
        confusion: [
          { a: "DoS", b: "DDoS", diff: "One source versus many. Blocking a single address can stop a DoS but will not stop a DDoS." },
          { a: "Reflection", b: "Amplification", diff: "Reflection bounces traffic off a third party using a spoofed source so the victim receives it. Amplification makes the response bigger than the request. Attacks often use both together." },
          { a: "DDoS", b: "Flash crowd", diff: "A DDoS is malicious traffic. A flash crowd is a real surge of legitimate users, for example after a viral post. Check the sources and request patterns to tell them apart." },
          { a: "SYN flood", b: "HTTP flood", diff: "A SYN flood attacks TCP connection state (protocol layer). An HTTP flood sends complete, legitimate-looking web requests (application layer)." }
        ],
        soc: "Typical SOC signals are a sudden spike in inbound packets per second, thousands of source IPs with no prior history, half-open TCP connections piling up, or a service slowing down with no matching internal change. The first response is to confirm it is an attack, engage the upstream provider or scrubbing service, and communicate status to stakeholders, because mitigation usually happens outside your own network.",
        takeaways: [
          "DDoS attacks availability, from many sources, usually through a botnet.",
          "Three families: volumetric (bandwidth), protocol (state), application layer (requests).",
          "Reflection plus amplification relies on a spoofed source address and open third-party servers."
        ],
        remember: [
          "DoS = one source. DDoS = many sources (botnet).",
          "Volumetric = fill the bandwidth. Protocol = exhaust connection state (SYN flood). Application = expensive requests (HTTP flood, Slowloris).",
          "Amplification = small request, large response. Reflection = spoofed source so the VICTIM receives the replies.",
          "Mitigation: upstream scrubbing / CDN, rate limiting, SYN cookies, WAF, anycast, ISP blackhole routing.",
          "Blackhole routing drops ALL traffic to the target; it protects the network but the target goes dark.",
          "A legitimate spike (flash crowd) can look like DDoS, so verify source diversity and request patterns."
        ],
        taglish:
          "Ang DoS, isang source lang na bumabagsak sa server. Ang DDoS, galing sa maraming infected devices (botnet), kaya hindi mo basta-basta ma-block. May tatlong uri: volumetric (pinupuno ang bandwidth), protocol (inuubos ang connection table, halimbawa SYN flood), at application layer (mga request na mukhang legit pero mabigat, tulad ng HTTP flood o Slowloris). Ang amplification, maliit na request pero malaki ang sagot na bumabalik sa biktima, kasi peke ang source IP (spoofed). Depensa: scrubbing service, CDN, rate limiting, WAF, at kung grabe na, blackhole routing ng ISP."
      }
    ],

    /* ===================== DOMAIN 3 ===================== */
    d3: [
      {
        id: "d3-t15",
        title: "VPNs and IPsec: Securing Traffic Across Untrusted Networks",
        tag: "3.2",
        minutes: 18,
        goal: "Describe how site-to-site and remote-access VPNs work, and distinguish IPsec's AH and ESP protocols and its transport and tunnel modes.",
        why: "VPNs are the standard way to protect data in transit across the Internet, and IPsec vocabulary (AH, ESP, tunnel mode, IKE) is fair game for both multiple-choice and performance-based questions.",
        simple:
          "A VPN (virtual private network) builds an encrypted tunnel across an untrusted network so traffic is protected from eavesdropping and tampering. There are two classic shapes. A SITE-TO-SITE VPN permanently connects two networks (a branch office to headquarters) through VPN gateways, and users do not have to do anything. A REMOTE-ACCESS (client-to-site) VPN lets an individual device connect to the corporate network, usually after authenticating with MFA. IPsec is the most common VPN protocol suite and works at the network layer. It has two protocols. AH (Authentication Header, IP protocol 51) provides integrity and authentication but NO encryption. ESP (Encapsulating Security Payload, IP protocol 50) provides encryption plus integrity and authentication, and is what nearly everyone actually uses. IPsec also has two modes. In TRANSPORT mode only the payload is protected and the original IP header stays, which suits host-to-host traffic. In TUNNEL mode the ENTIRE original packet is encrypted and wrapped inside a new packet with a new IP header, which is how gateways build site-to-site tunnels and hide internal addressing. Before any of that, the two sides negotiate keys and algorithms with IKE (Internet Key Exchange, UDP port 500, with NAT traversal on UDP 4500), producing security associations. The alternative to IPsec is an SSL/TLS VPN, which runs over TCP port 443, passes through most firewalls easily, and can provide clientless access through a browser portal. Finally, a FULL-TUNNEL VPN sends all of the user's traffic through the corporate network so it can be inspected, while SPLIT TUNNELING sends only corporate traffic through the tunnel and lets the rest go straight to the Internet, which saves bandwidth but bypasses corporate security controls.",
        keyTerms: [
          { term: "Site-to-Site VPN", def: "A persistent encrypted tunnel connecting two networks through VPN gateways." },
          { term: "Remote-Access VPN", def: "An individual device connects to the corporate network through an encrypted tunnel, usually with MFA." },
          { term: "AH", def: "IPsec Authentication Header (protocol 51): integrity and authentication, no encryption." },
          { term: "ESP", def: "IPsec Encapsulating Security Payload (protocol 50): encryption, integrity, and authentication." },
          { term: "Tunnel Mode", def: "The whole original packet is encrypted and wrapped in a new IP header. Used gateway to gateway." },
          { term: "Transport Mode", def: "Only the payload is protected; the original IP header stays. Used host to host." },
          { term: "IKE", def: "Internet Key Exchange (UDP 500): negotiates the algorithms and keys for IPsec." },
          { term: "Split Tunneling", def: "Only corporate traffic uses the VPN; other traffic goes directly to the Internet." }
        ],
        analogy:
          "A VPN is an armored, windowless tunnel built across a public road. A site-to-site VPN is a permanent tunnel between two company buildings; a remote-access VPN is a private tunnel that opens for one traveling employee. Tunnel mode is like putting your entire sealed letter inside a new, bigger envelope with a new address; transport mode only seals the letter itself and leaves the original address showing.",
        technical:
          "A retail chain connects each store to headquarters with an IPsec site-to-site VPN: the store router and the HQ firewall negotiate with IKE, then pass traffic using ESP in tunnel mode, so the Internet only ever sees traffic between the two gateways. Remote staff use an SSL/TLS VPN client over TCP 443 with MFA. The security team forbids split tunneling for staff who handle payment data, so every packet passes through the corporate firewall and web filter.",
        table: {
          headers: ["Feature", "AH", "ESP"],
          rows: [
            ["IP protocol number", "51", "50"],
            ["Integrity and authentication", "Yes", "Yes"],
            ["Encryption (confidentiality)", "No", "Yes"],
            ["Commonly used today", "Rarely", "Almost always"]
          ]
        },
        confusion: [
          { a: "AH", b: "ESP", diff: "Both authenticate and protect integrity, but ONLY ESP encrypts. If a question needs confidentiality, the answer is ESP." },
          { a: "Tunnel mode", b: "Transport mode", diff: "Tunnel mode encapsulates and protects the whole original packet (gateway to gateway). Transport mode protects only the payload (host to host)." },
          { a: "IPsec VPN", b: "SSL/TLS VPN", diff: "IPsec works at the network layer and usually needs client software or gateway configuration. An SSL/TLS VPN uses TCP 443, travels through nearly any firewall, and can offer clientless browser access." },
          { a: "Full tunnel", b: "Split tunnel", diff: "Full tunnel routes all traffic through the corporate network so it is inspected. Split tunnel only sends corporate traffic, which is faster but bypasses corporate security tools." }
        ],
        soc: "VPN logs are a prime source of authentication and anomaly data: impossible travel (logins from two countries minutes apart), repeated failed logins against the VPN portal, or a user connecting at 3 a.m. from an unfamiliar country. A VPN gateway exposed to the Internet is also a high-value target, so patch timeliness for VPN appliances is a frequent audit finding.",
        takeaways: [
          "ESP encrypts; AH does not. Tunnel mode wraps the whole packet; transport mode protects only the payload.",
          "IKE negotiates the keys and algorithms first (UDP 500).",
          "Split tunneling saves bandwidth but lets non-corporate traffic bypass corporate security controls."
        ],
        remember: [
          "ESP = encryption + integrity + authentication (protocol 50). AH = integrity + authentication ONLY (protocol 51).",
          "Tunnel mode = entire packet wrapped with a new header (gateway to gateway). Transport mode = payload only (host to host).",
          "IKE = UDP 500 (NAT-T uses UDP 4500). It negotiates the security associations.",
          "Site-to-site = network to network. Remote access = one user to the network.",
          "SSL/TLS VPN rides TCP 443 and passes through most firewalls.",
          "Full tunnel = all traffic through the VPN. Split tunnel = only corporate traffic, with a security trade-off."
        ],
        taglish:
          "Ang VPN ay encrypted na tunnel sa pagitan ng dalawang punto sa Internet. Site-to-site, dalawang opisina ang konektado palagi. Remote-access naman, ikaw bilang individual user ang kumokonekta sa kumpanya. Sa IPsec, dalawang protocol: AH (may integrity at authentication, pero walang encryption) at ESP (may encryption). Kapag kailangan ng confidentiality, ESP ang sagot. Tunnel mode, binabalot ang buong packet sa bagong IP header. Transport mode, payload lang ang protektado. Ang split tunneling ay mabilis pero delikado, kasi lumalampas sa security tools ng kumpanya ang ibang traffic."
      },
      {
        id: "d3-t16",
        title: "Infrastructure as Code, Containers, and Microservices",
        tag: "3.1",
        minutes: 17,
        goal: "Explain how infrastructure as code, containers, microservices, and software-defined networking change both the benefits and the risks of modern architectures.",
        why: "Cloud-native design is part of the architecture objective, and its security story is different from traditional servers. Exam questions test whether you understand what each model isolates, and what new mistakes it makes easy.",
        simple:
          "INFRASTRUCTURE AS CODE (IaC) means describing servers, networks, and permissions in machine-readable files (Terraform, CloudFormation, Ansible) and deploying them automatically instead of clicking through consoles. The security upside is consistency and repeatability: every environment is built the same way, changes are reviewed in version control, and drift from the approved baseline is easy to spot. The downside is that one insecure template is copied to every environment at once, and secrets pasted into code repositories leak. Templates should therefore be scanned before deployment (policy as code). In an IMMUTABLE infrastructure model, you never patch a running server; you build a new image and replace it. CONTAINERS package an application and its dependencies and share the host's operating system kernel, isolated using namespaces and control groups. They start in seconds and use fewer resources than virtual machines, but the shared kernel means the isolation is weaker than a hypervisor's, and a container escape could expose the host. Common container risks are vulnerable or untrusted base images, containers running as root or privileged, and secrets baked into images. Defenses are image scanning, minimal base images, signed images from trusted registries, and least-privilege runtime settings. MICROSERVICES split an application into many small, independent services that talk through APIs, often orchestrated by Kubernetes. This limits the blast radius of a single failure and lets teams patch one service quickly, but it multiplies the number of APIs, network paths, and credentials to protect, so service-to-service authentication (mutual TLS) and API security become critical. SERVERLESS (function-as-a-service) removes server management entirely: the provider runs your code on demand and secures the platform, while you remain responsible for the code, its permissions, and its data. SOFTWARE-DEFINED NETWORKING (SDN) separates the control plane (decisions) from the data plane (forwarding), so network policy can be changed centrally and automatically, which is powerful and also makes the controller a high-value target.",
        keyTerms: [
          { term: "Infrastructure as Code (IaC)", def: "Defining and deploying infrastructure through version-controlled, machine-readable files rather than manual configuration." },
          { term: "Immutable Infrastructure", def: "Systems are never modified after deployment; changes are made by replacing them with a new image." },
          { term: "Container", def: "A lightweight package of an application and its dependencies that shares the host OS kernel." },
          { term: "Container Escape", def: "An attack that breaks out of a container to reach the host or other containers." },
          { term: "Microservices", def: "An architecture of many small, independent services that communicate through APIs." },
          { term: "Serverless", def: "Running functions on demand while the cloud provider manages the underlying servers." },
          { term: "SDN", def: "Software-Defined Networking: separates the control plane from the data plane for centralized, programmable network control." },
          { term: "Configuration Drift", def: "When a live system gradually diverges from its approved baseline." }
        ],
        analogy:
          "IaC is a printed, reviewed blueprint that builds identical houses every time, instead of builders improvising each one. Containers are apartments in one building: separate units, but they share the plumbing and foundation (the kernel). Virtual machines are separate detached houses. Microservices are a food court of small specialist stalls instead of one giant kitchen: one stall closing does not close the mall, but there are many more doors to lock.",
        technical:
          "A team keeps its cloud network and server definitions in Terraform stored in Git. A pipeline scans each change for open security groups and hard-coded secrets before approving it. The application runs as dozens of containers on Kubernetes, built from a minimal, signed base image and run as a non-root user. Each microservice authenticates to the others with mutual TLS, and when a vulnerability appears, the team rebuilds the affected image and redeploys it rather than patching running containers.",
        table: {
          headers: ["Model", "Isolation level", "Main benefit", "Main risk"],
          rows: [
            ["Virtual machine", "Hypervisor (strong)", "Full OS separation", "Heavier, slower to start"],
            ["Container", "Shared kernel (weaker)", "Fast, lightweight, portable", "Escape, vulnerable images, root containers"],
            ["Microservices", "Per-service", "Small blast radius, fast patching", "Many APIs and credentials to secure"],
            ["Serverless", "Provider-managed", "No servers to patch", "Over-permissioned functions, vendor lock-in"],
            ["IaC", "n/a (process)", "Consistency, auditability", "One bad template spreads everywhere"]
          ]
        },
        confusion: [
          { a: "Container", b: "Virtual machine", diff: "A VM includes its own guest OS on top of a hypervisor. A container shares the host's kernel, so it is lighter but isolated less strongly." },
          { a: "IaC", b: "Configuration management", diff: "IaC provisions the infrastructure itself (networks, servers, permissions). Configuration management enforces the state of software and settings inside systems. They are often used together." },
          { a: "Microservices", b: "Monolith", diff: "A monolith is one tightly-coupled application. Microservices split functions into independent services, which limits the blast radius but widens the attack surface of APIs." },
          { a: "Control plane", b: "Data plane", diff: "The control plane decides where traffic should go; the data plane actually forwards it. SDN separates the two." }
        ],
        soc: "Cloud-native environments change what analysts investigate: ephemeral containers may be gone before you look, so logs must be shipped centrally. Findings such as a publicly exposed storage bucket or an over-permissioned role often trace back to a flawed IaC template, which means the fix belongs in the template, not just the live resource.",
        takeaways: [
          "IaC gives consistency and auditability, but a flawed template is replicated everywhere, so scan it before deployment.",
          "Containers share the host kernel, so isolation is weaker than a VM's.",
          "Microservices shrink the blast radius of a failure but multiply APIs and credentials to secure."
        ],
        remember: [
          "IaC = infrastructure defined in version-controlled code. Benefits: consistency, auditability. Risk: one bad template spreads everywhere; secrets in repos.",
          "Immutable infrastructure: replace, do not patch.",
          "Containers share the host OS kernel; VMs have their own guest OS. Weaker isolation = container escape risk.",
          "Defend containers with image scanning, minimal signed images, and non-root, least-privilege runtime.",
          "Microservices: small blast radius, but more APIs, so secure service-to-service traffic (mutual TLS) and APIs.",
          "SDN separates the control plane (decisions) from the data plane (forwarding); the controller is a high-value target."
        ],
        taglish:
          "Ang IaC, isinusulat mo bilang code ang infrastructure mo (servers, network, permissions) at automatic itong ide-deploy. Maganda kasi pare-pareho at may history, pero kapag may mali sa template, kumakalat sa lahat. Ang container, nagsha-share ng kernel ng host kaya mas magaan pero mas mahina ang isolation kaysa VM. Ang microservices, maliliit na hiwa-hiwalay na service na nag-uusap sa pamamagitan ng API: kapag may sira, isa lang ang apektado, pero mas marami ang kailangang i-secure. At sa immutable infrastructure, hindi mo pine-patch ang server, pinapalitan mo ng bagong image."
      }
    ],

    /* ===================== DOMAIN 4 ===================== */
    d4: [
      {
        id: "d4-t19",
        title: "Email Security: SPF, DKIM, and DMARC",
        tag: "4.5",
        minutes: 16,
        goal: "Explain how SPF, DKIM, and DMARC work together to stop email spoofing, and match each to the question it answers.",
        why: "Email is the number-one delivery path for phishing. SPF, DKIM, and DMARC appear in scenarios about spoofed senders and email gateways, and they are easy to confuse unless you remember what each one actually checks.",
        simple:
          "Email was designed without any proof that the sender is who they claim to be, so anyone can forge the From address. Three DNS-based standards fix that. SPF (Sender Policy Framework) is a DNS TXT record in which a domain lists the mail servers that are allowed to send email on its behalf. A receiving server checks whether the connecting server's IP is on that list. DKIM (DomainKeys Identified Mail) works differently: the sending server signs each message with a private key, and the receiver looks up the matching public key in DNS to verify the signature. A valid DKIM signature proves the message came from a server authorized by the domain and was not altered in transit. DMARC (Domain-based Message Authentication, Reporting and Conformance) sits on top of the other two. It tells receiving servers how to handle mail that FAILS authentication (none = just monitor, quarantine = treat as suspicious such as send to spam, reject = refuse delivery) and where to send reports about who is sending mail using your domain. DMARC also requires alignment: the domain that passed SPF or DKIM has to match the visible From domain, which is what stops attackers from passing SPF with their own domain while displaying yours. Together they let a company see and block spoofing of its own domain. They do not stop every phishing attack: a lookalike domain such as examp1e.com can pass all three checks on its own domain, and a compromised legitimate account sends perfectly authenticated phishing. Other email controls complete the picture: a secure email gateway for spam, malware, and URL filtering; TLS between mail servers (STARTTLS) to encrypt mail in transit; and S/MIME or PGP for end-to-end encryption and signing.",
        keyTerms: [
          { term: "SPF", def: "A DNS record listing the servers authorized to send mail for a domain. Checks the sending server's IP." },
          { term: "DKIM", def: "A cryptographic signature added to each outgoing message and verified with a public key in DNS. Protects integrity and domain authenticity." },
          { term: "DMARC", def: "A policy that tells receivers what to do when SPF/DKIM fail (none, quarantine, reject) and requests reports." },
          { term: "Alignment", def: "DMARC's requirement that the domain authenticated by SPF or DKIM matches the visible From domain." },
          { term: "Email Spoofing", def: "Forging the sender address so a message appears to come from someone trusted." },
          { term: "Secure Email Gateway", def: "A filter in front of mail servers that blocks spam, phishing, malware attachments, and malicious links." },
          { term: "S/MIME / PGP", def: "Standards for signing and encrypting email content end to end." }
        ],
        analogy:
          "SPF is the guest list at the door: 'only these mail servers may send as our company.' DKIM is a tamper-evident seal stamped on each envelope by the sender. DMARC is the building manager's instruction to the doorman: 'if a guest is not on the list or the seal is broken, reject them, and mail me a report every day.'",
        technical:
          "The domain example.com publishes an SPF record naming its mail provider's servers, enables DKIM signing on outgoing mail, and publishes a DMARC record at _dmarc.example.com, starting with p=none and rua= pointing to a reporting mailbox. After a few weeks of reports confirm that all legitimate senders pass, the policy is tightened to quarantine and then reject. From then on, a forged message claiming to be from example.com and sent from an unauthorized server fails SPF and DKIM and is rejected by receivers that honor DMARC.",
        table: {
          headers: ["Standard", "What it checks", "Lives in", "Answers the question"],
          rows: [
            ["SPF", "Is the sending server's IP allowed?", "DNS TXT record on the domain", "Who may send as us?"],
            ["DKIM", "Is the signature valid and the message unaltered?", "Public key in DNS; signature in message header", "Is this message really from our domain, unchanged?"],
            ["DMARC", "Do SPF/DKIM pass AND align with From?", "DNS TXT record at _dmarc.domain", "What should receivers do if it fails, and who reports back?"]
          ]
        },
        confusion: [
          { a: "SPF", b: "DKIM", diff: "SPF validates the sending SERVER's address against a list. DKIM validates a cryptographic SIGNATURE on the message itself. SPF can break when mail is forwarded; DKIM usually survives forwarding." },
          { a: "DMARC", b: "SPF/DKIM", diff: "SPF and DKIM do the checking. DMARC sets the POLICY (none, quarantine, reject), requires alignment, and provides reporting." },
          { a: "DMARC p=none", b: "p=reject", diff: "p=none only monitors and reports; spoofed mail is still delivered. p=reject tells receivers to refuse failing mail. Start with none, finish at reject." },
          { a: "Email authentication", b: "Email encryption", diff: "SPF, DKIM, and DMARC prove where mail came from. They do not hide its content. TLS, S/MIME, and PGP handle confidentiality." }
        ],
        soc: "When a user reports a CEO-impersonation email, an analyst reads the message headers: SPF and DKIM results, and the DMARC disposition, show quickly whether the mail was spoofed or came from a legitimately authenticated (possibly compromised or lookalike) account. DMARC aggregate reports also reveal unknown servers sending mail as your domain, a useful discovery for shadow IT.",
        takeaways: [
          "SPF checks the sending server, DKIM checks a signature on the message, DMARC sets the policy and reporting.",
          "DMARC needs alignment between the authenticated domain and the visible From domain.",
          "These stop spoofing of YOUR domain; they do not stop lookalike domains or compromised accounts."
        ],
        remember: [
          "SPF = authorized sending servers (DNS TXT). DKIM = digital signature on the message (public key in DNS). DMARC = policy + alignment + reports.",
          "DMARC actions: none (monitor), quarantine, reject.",
          "SPF often breaks on forwarding; DKIM usually survives.",
          "'Tells receivers what to do with failing mail' = DMARC.",
          "None of these encrypt mail. Encryption in transit = TLS (STARTTLS). End to end = S/MIME or PGP.",
          "A lookalike domain (examp1e.com) can pass SPF/DKIM/DMARC for ITS OWN domain, so user training still matters."
        ],
        taglish:
          "Tatlong magkakaibang tanong ang sinasagot nila. SPF: 'Pwede ba talagang magpadala ng email ang server na ito para sa domain na 'to?' DKIM: 'May tamang digital signature ba ang message, at hindi ba ito nabago?' DMARC: 'Kapag bumagsak sa SPF at DKIM, ano ang gagawin (none, quarantine, o reject), at padalhan mo ako ng report.' Pero tandaan, hindi nito napipigilan ang lookalike domain o ang na-hack na legit account, kaya kailangan pa rin ng training."
      },
      {
        id: "d4-t20",
        title: "DNS Security: DNSSEC, Sinkholes, and DNS Filtering",
        tag: "4.5",
        minutes: 16,
        goal: "Describe common DNS attacks and the controls that defend against them: DNSSEC, DNS filtering, sinkholes, encrypted DNS, and restricted zone transfers.",
        why: "Every connection starts with a DNS lookup, so DNS is both a favorite target and a rich source of detection data. Security+ asks you to tell apart the defenses, especially DNSSEC (authenticity) versus encrypted DNS (privacy).",
        simple:
          "DNS translates names into IP addresses, but classic DNS has no built-in way to verify an answer is genuine and no encryption. Attackers exploit that. DNS POISONING (cache poisoning) injects a forged record into a resolver's cache so users who ask for a real site are sent to the attacker's server. DOMAIN HIJACKING takes over the registration of a real domain itself. TYPOSQUATTING registers lookalike names. DNS TUNNELING hides data or command-and-control traffic inside DNS queries and responses, which are usually allowed through firewalls. Malware may also use a domain generation algorithm (DGA) to produce thousands of throwaway domains for its command servers. Defenses start with DNSSEC, which adds digital signatures to DNS records so a resolver can verify an answer really came from the zone owner and was not altered. DNSSEC provides authenticity and integrity, NOT confidentiality: queries and answers are still readable. For privacy, DNS over HTTPS (DoH, TCP 443) and DNS over TLS (DoT, TCP 853) encrypt the lookup between the client and its resolver. DNS FILTERING (protective DNS) refuses to resolve domains that are known to be malicious or in blocked categories. A DNS SINKHOLE goes one step further: the resolver answers for a malicious domain with the address of a server you control, so an infected machine trying to reach its command server is redirected to a safe place, which blocks the attack and reveals exactly which internal hosts are infected. Zone transfers (AXFR) should be limited to authorized secondary servers, because an open zone transfer hands an attacker your entire internal naming map. Split-horizon DNS serves different answers to internal and external users to avoid exposing internal names. Finally, DNS logs are a valuable investigation source for spotting beaconing, tunneling, and newly registered or algorithmically generated domains.",
        keyTerms: [
          { term: "DNS Poisoning", def: "Inserting forged records into a DNS cache so users are redirected to a malicious address." },
          { term: "DNSSEC", def: "DNS Security Extensions: digitally signs DNS records to provide authenticity and integrity (not privacy)." },
          { term: "DoH / DoT", def: "DNS over HTTPS (443) and DNS over TLS (853): encrypt DNS queries for privacy between client and resolver." },
          { term: "DNS Sinkhole", def: "Returning a controlled address for malicious domains to redirect and identify infected hosts." },
          { term: "DNS Filtering", def: "Blocking resolution of malicious or unwanted domains." },
          { term: "DNS Tunneling", def: "Hiding data or command-and-control traffic inside DNS queries and responses." },
          { term: "Zone Transfer (AXFR)", def: "Copying a full DNS zone to another server. Should be restricted to authorized secondaries." },
          { term: "DGA", def: "Domain Generation Algorithm: malware technique that produces many pseudo-random domains for command servers." }
        ],
        analogy:
          "DNS is the Internet's phone book. DNS poisoning is someone slipping a forged page into the phone book so you dial a scammer. DNSSEC puts a notary's signature on every page, so forged pages are detectable, but the book is still open for anyone to read. DoH and DoT are whispering your question to the librarian instead of shouting it. A sinkhole is the operator who, when you ask for a known scammer's number, connects you to the police instead.",
        technical:
          "A SOC sees one workstation making thousands of DNS queries to long, random-looking subdomains of a single unfamiliar domain: a classic sign of DNS tunneling. The team adds the domain to the DNS filter's blocklist and sinkholes it so that any other infected host trying to reach it lands on a monitored server. The sinkhole logs show two additional internal machines checking in, and those are isolated for investigation. In parallel, the company enables DNSSEC validation on its resolvers and restricts zone transfers to its two secondary name servers.",
        table: {
          headers: ["Control", "Protects against", "Provides", "Does NOT provide"],
          rows: [
            ["DNSSEC", "Poisoning, forged answers", "Authenticity + integrity", "Confidentiality"],
            ["DoH / DoT", "Eavesdropping on lookups", "Privacy of queries", "Proof the answer is genuine"],
            ["DNS filtering", "Known malicious or blocked domains", "Prevention at resolution time", "Detection of brand-new domains"],
            ["DNS sinkhole", "Malware reaching its command server", "Containment + identification of infected hosts", "Cleanup of the host"],
            ["Restricted zone transfers", "Reconnaissance of internal names", "Smaller information leak", "Protection of live queries"]
          ]
        },
        confusion: [
          { a: "DNSSEC", b: "DoH / DoT", diff: "DNSSEC proves an answer is authentic and unaltered (signatures). DoH and DoT hide the query from eavesdroppers (encryption). You need DNSSEC for trust and DoH/DoT for privacy." },
          { a: "DNS sinkhole", b: "Blackhole route", diff: "A sinkhole redirects bad lookups to a server you control so you can observe and identify victims. A blackhole route silently drops the traffic." },
          { a: "DNS poisoning", b: "Domain hijacking", diff: "Poisoning corrupts a resolver's cached answers for a domain. Hijacking takes control of the domain registration itself, so the legitimate record is changed at the source." },
          { a: "DNS filtering", b: "Firewall rule", diff: "DNS filtering blocks at name-resolution time based on domain reputation or category. A firewall rule blocks by IP, port, or protocol after the name is already resolved." }
        ],
        soc: "DNS logs are one of the highest-value, lowest-cost data sources in a SOC: they reveal beaconing at regular intervals, queries to newly registered or algorithmically generated domains, and unusually long TXT or subdomain queries typical of tunneling. Sinkhole hits give a clean list of infected internal hosts with almost no false positives.",
        takeaways: [
          "DNSSEC signs records for authenticity and integrity; it does not encrypt.",
          "DoH and DoT encrypt lookups for privacy; they do not prove an answer is genuine.",
          "A sinkhole redirects malicious domain lookups so infected hosts can be found and contained."
        ],
        remember: [
          "DNSSEC = signatures = authenticity + integrity. It does NOT encrypt.",
          "DoH = TCP 443. DoT = TCP 853. Both encrypt DNS queries (privacy).",
          "DNS sinkhole = redirect a malicious domain to a server you control to catch infected hosts.",
          "DNS poisoning = forged data in a resolver's cache. Domain hijacking = taking over the registration.",
          "Long, random-looking subdomain queries = DNS tunneling or DGA malware.",
          "Restrict zone transfers (AXFR) to authorized secondary servers only."
        ],
        taglish:
          "Walang built-in na proteksyon ang lumang DNS, kaya pwedeng i-poison ang cache para madala ka sa pekeng site. Ang DNSSEC ay naglalagay ng digital signature sa mga record para ma-verify na totoo at hindi nabago, pero hindi nito inie-encrypt ang query. Para sa privacy, DoH (443) o DoT (853). Ang DNS sinkhole naman ay nire-redirect ang mga malicious na domain papunta sa server mo, kaya makikita mo kung aling mga computer sa loob ang infected. Kapag may kakaibang haba at random na subdomain, posibleng DNS tunneling na 'yan."
      }
    ],

    /* ===================== DOMAIN 5 ===================== */
    d5: [
      {
        id: "d5-t10",
        title: "Security Frameworks and Gap Analysis",
        tag: "5.1",
        minutes: 17,
        goal: "Recognize the major security frameworks and standards (NIST CSF, NIST RMF, ISO 27001, CIS Controls, SOC 2), and explain how a gap analysis uses them to find and prioritize improvements.",
        why: "Governance questions often name a framework and ask what it is for, or describe a company comparing itself to a standard. Knowing which framework does what, and the difference between a framework and a regulation, removes a whole category of guesswork.",
        simple:
          "A security framework is a structured, organized set of practices an organization can adopt to manage security. Most are voluntary guidance; a REGULATION (HIPAA, GDPR, PCI DSS) is a legal or contractual requirement. The NIST Cybersecurity Framework (CSF) organizes security outcomes into functions: Identify, Protect, Detect, Respond, and Recover, with version 2.0 adding Govern as a sixth. The NIST Risk Management Framework (RMF, SP 800-37) is a step-by-step lifecycle for selecting, implementing, and authorizing controls, used heavily in US government. NIST SP 800-53 is the large catalog of security and privacy controls it draws from. ISO/IEC 27001 is an international standard for building an Information Security Management System (ISMS), and organizations can be CERTIFIED against it; ISO 27002 is the companion guidance on the controls themselves. The CIS Critical Security Controls are a prioritized, practical list of defensive actions, and the CIS Benchmarks are detailed configuration hardening guides for specific products. SOC 2 is an audit report, based on the AICPA Trust Services Criteria, in which an independent auditor attests to a service provider's controls; a Type I report covers the design of controls at one point in time, while a Type II report tests whether they operated effectively over a period. A GAP ANALYSIS compares the current state against a desired state, such as a framework or a regulation, and lists the differences. The output is a prioritized list of gaps with a remediation plan. It answers 'what are we missing versus the standard?', which differs from a risk assessment that asks 'what could go wrong and how bad would it be?'.",
        keyTerms: [
          { term: "Framework", def: "A structured set of practices and outcomes for managing security. Usually voluntary guidance." },
          { term: "NIST CSF", def: "Cybersecurity Framework: Identify, Protect, Detect, Respond, Recover (and Govern in version 2.0)." },
          { term: "NIST RMF", def: "Risk Management Framework: a lifecycle for categorizing systems and selecting, implementing, assessing, and authorizing controls." },
          { term: "ISO/IEC 27001", def: "International standard for an Information Security Management System. Organizations can be certified." },
          { term: "CIS Controls / Benchmarks", def: "Controls: prioritized defensive actions. Benchmarks: secure configuration guides for specific systems." },
          { term: "SOC 2", def: "An independent audit report on a service provider's controls. Type I = design at a point in time; Type II = operating effectiveness over time." },
          { term: "Gap Analysis", def: "Comparing current security posture against a target (framework, standard, or regulation) to find and prioritize what is missing." }
        ],
        analogy:
          "A framework is a recipe book from a respected chef: you choose it, and it guides you, but nobody forces you. A regulation is a food-safety law: the inspector can fine you. A gap analysis is checking your kitchen against the recipe and the law, then writing down exactly what equipment or steps you are missing and in what order to fix them.",
        technical:
          "A software-as-a-service company wants to win enterprise customers who demand SOC 2. It performs a gap analysis by mapping its existing controls to the SOC 2 criteria, and finds it has no formal access reviews, no documented change approvals, and inconsistent logging. It ranks the gaps by importance, assigns owners and dates, and fixes them. Then it undergoes a SOC 2 Type I audit first, and a Type II audit after the controls have operated for several months.",
        table: {
          headers: ["Name", "Type", "Main purpose", "Remember"],
          rows: [
            ["NIST CSF", "Framework (voluntary)", "Organize security outcomes", "Identify, Protect, Detect, Respond, Recover (+ Govern in 2.0)"],
            ["NIST RMF (SP 800-37)", "Framework", "Lifecycle to select and authorize controls", "Common in US government"],
            ["ISO/IEC 27001", "Certifiable standard", "Build and certify an ISMS", "27002 = controls guidance"],
            ["CIS Controls", "Prioritized control set", "Practical defensive actions", "Benchmarks = hardening guides"],
            ["SOC 2", "Audit report", "Assurance on a service provider", "Type I = point in time; Type II = over a period"],
            ["HIPAA / GDPR / PCI DSS", "Regulation / contractual standard", "Legal or contractual requirement", "Mandatory, unlike frameworks"]
          ]
        },
        confusion: [
          { a: "Framework", b: "Regulation", diff: "A framework is voluntary guidance you adopt. A regulation is a legal or contractual requirement with penalties for non-compliance." },
          { a: "ISO 27001", b: "ISO 27002", diff: "27001 sets the requirements for an ISMS and is what you certify against. 27002 is guidance on the individual controls." },
          { a: "SOC 2 Type I", b: "SOC 2 Type II", diff: "Type I describes whether controls are suitably DESIGNED at a single point in time. Type II tests whether they OPERATED effectively over a period (usually 6 to 12 months)." },
          { a: "Gap analysis", b: "Risk assessment", diff: "A gap analysis compares you to a standard to find what is missing. A risk assessment evaluates threats, vulnerabilities, and impact to rank what could hurt you most." },
          { a: "CIS Controls", b: "CIS Benchmarks", diff: "Controls are a prioritized list of defensive practices. Benchmarks are detailed secure-configuration checklists for a specific operating system or product." }
        ],
        soc: "For a SOC, frameworks supply the shared language for reporting. A metric such as 'we have strong Detect and weak Recover capability' is a CSF-shaped statement leadership understands, and a gap analysis against CIS Controls is a common way to decide whether the next budget goes to logging coverage, asset inventory, or response playbooks.",
        takeaways: [
          "Frameworks are voluntary guidance; regulations are mandatory.",
          "NIST CSF has five functions (six with Govern in 2.0); ISO 27001 is certifiable; SOC 2 is an audit report.",
          "A gap analysis finds the difference between your current state and a target, and prioritizes remediation."
        ],
        remember: [
          "NIST CSF: Identify, Protect, Detect, Respond, Recover. Version 2.0 adds Govern.",
          "NIST RMF = lifecycle for authorizing systems. NIST 800-53 = control catalog.",
          "ISO 27001 = certifiable ISMS requirements. ISO 27002 = control guidance.",
          "CIS Controls = prioritized actions. CIS Benchmarks = hardening configuration guides.",
          "SOC 2 Type I = design at a point in time. Type II = operating effectiveness over a period.",
          "Framework = voluntary. Regulation (HIPAA, GDPR) / PCI DSS contractual = mandatory.",
          "Gap analysis = current state versus desired state, then a prioritized remediation plan."
        ],
        taglish:
          "Ang framework, parang gabay na pwede mong piliin (voluntary), tulad ng NIST CSF o ISO 27001. Ang regulation, batas o kontrata na kailangan mong sundin (HIPAA, GDPR). Sa NIST CSF, tandaan: Identify, Protect, Detect, Respond, Recover (at Govern sa version 2.0). Ang ISO 27001 pwede mong ipa-certify. Ang SOC 2 ay audit report: Type I ay snapshot lang ng design, Type II ay sinusubok kung gumagana talaga sa loob ng ilang buwan. Ang gap analysis ay paghahambing ng kasalukuyang estado mo sa target na standard para makita kung ano ang kulang."
      },
      {
        id: "d5-t11",
        title: "Business Impact Analysis: MTD, RTO, RPO, MTBF, and MTTR",
        tag: "5.2",
        minutes: 16,
        goal: "Explain what a business impact analysis produces and use MTD, RTO, RPO, WRT, MTBF, and MTTR correctly.",
        why: "The exam uses these abbreviations as near-lookalikes, and a wrong letter changes the answer. A BIA is also the document that justifies recovery spending, so you need to know what it feeds into.",
        simple:
          "A business impact analysis (BIA) identifies an organization's critical business functions, the systems and people they depend on, and what the damage would be if each were disrupted, measured over time in money, reputation, legal exposure, and safety. Its main outputs are priorities and recovery targets that feed the business continuity plan and the disaster recovery plan. The key metrics: MTD (Maximum Tolerable Downtime, also called MAO) is the longest a function can be unavailable before the business suffers unacceptable harm or may not survive. RTO (Recovery Time Objective) is the target for how quickly a system must be restored; it must be shorter than the MTD. WRT (Work Recovery Time) is the extra time needed after systems are back to verify data and resume normal work, so MTD is roughly RTO plus WRT. RPO (Recovery Point Objective) is how much data loss is acceptable, measured as the time between the last good backup and the incident: an RPO of 4 hours means backups must be at least every 4 hours. Two reliability metrics describe the equipment itself. MTBF (Mean Time Between Failures) is the average time a repairable system runs before it fails; a higher number means a more reliable system. MTTR (Mean Time To Repair or Restore) is the average time to fix it once it breaks; a lower number is better. Availability is approximately MTBF divided by (MTBF plus MTTR). MTTF (Mean Time To Failure) is the equivalent of MTBF for items that are replaced rather than repaired. The BIA also finds single points of failure and identifies mission-essential functions that must be restored first.",
        keyTerms: [
          { term: "BIA", def: "Business Impact Analysis: identifies critical functions and the impact of their disruption over time." },
          { term: "MTD / MAO", def: "Maximum Tolerable Downtime: the longest a function can be down before unacceptable harm." },
          { term: "RTO", def: "Recovery Time Objective: target time to restore a system. Must be shorter than MTD." },
          { term: "RPO", def: "Recovery Point Objective: the maximum acceptable data loss, measured in time since the last good backup." },
          { term: "WRT", def: "Work Recovery Time: time to verify and resume normal operations after systems are restored." },
          { term: "MTBF", def: "Mean Time Between Failures: average uptime between failures of a repairable system. Higher is better." },
          { term: "MTTR", def: "Mean Time To Repair/Restore: average time to fix a failure. Lower is better." },
          { term: "Single Point of Failure", def: "A component whose failure stops an entire function." }
        ],
        analogy:
          "Imagine a hospital's pharmacy. MTD is how long it can be closed before patients are at real risk. RTO is the target time to reopen the pharmacy system. RPO is how many hours of prescription records the hospital can bear to lose. MTBF is how often the pharmacy's refrigerator typically breaks; MTTR is how long the repair technician usually takes to fix it.",
        technical:
          "An online retailer's BIA finds that checkout generates revenue of 40,000 dollars an hour and that more than 6 hours offline would cause customers to leave permanently, so MTD = 6 hours. The team sets RTO = 2 hours, leaving margin for WRT (4 hours to reconcile orders), and RPO = 15 minutes, which requires near-continuous database replication. For the payment server, MTBF is 1,000 hours and MTTR is 4 hours, giving availability of roughly 1000 / 1004, about 99.6 percent, and highlighting that a hot standby is worth funding.",
        table: {
          headers: ["Metric", "Measures", "Better when", "Memory hook"],
          rows: [
            ["MTD / MAO", "Longest tolerable outage", "n/a (a limit)", "The business's breaking point"],
            ["RTO", "Time to restore service", "Lower", "Time (Time to restore)"],
            ["RPO", "Data loss tolerated", "Lower", "Point (back to the last good point)"],
            ["WRT", "Time to resume work after restore", "Lower", "Work (after the tech fix)"],
            ["MTBF", "Time between failures", "Higher", "Between failures"],
            ["MTTR", "Time to repair", "Lower", "Repair"]
          ]
        },
        confusion: [
          { a: "RTO", b: "RPO", diff: "RTO is how long you can be DOWN. RPO is how much DATA you can lose. A system can have a short RTO and a long RPO, or the reverse." },
          { a: "MTD", b: "RTO", diff: "MTD is the business's limit; RTO is the technical target set below it. If RTO exceeds MTD, the plan cannot meet the business need." },
          { a: "MTBF", b: "MTTR", diff: "MTBF is how long a system typically runs between failures (reliability). MTTR is how long it takes to fix it (repairability)." },
          { a: "MTBF", b: "MTTF", diff: "MTBF applies to repairable systems; MTTF applies to non-repairable ones that are replaced after failing." }
        ],
        soc: "BIA outputs tell the SOC and incident responders what to restore first. When a ransomware event hits, the recovery order (identity systems, then payment processing, then reporting) comes straight from the BIA's priority ranking, and its RPO tells you how far back to restore backups.",
        takeaways: [
          "A BIA ranks critical functions and sets recovery targets that feed BCP and DR plans.",
          "RTO is about time to restore; RPO is about data loss; MTD is the limit RTO must stay under.",
          "Higher MTBF and lower MTTR both mean better availability."
        ],
        remember: [
          "RTO = time to restore. RPO = acceptable data loss (time since last good backup). RTO must be shorter than MTD.",
          "MTD (or MAO) = the longest outage the business can survive. MTD is roughly RTO + WRT.",
          "MTBF = time between failures (higher is better). MTTR = time to repair (lower is better).",
          "Availability is roughly MTBF / (MTBF + MTTR).",
          "MTBF is for repairable systems. MTTF is for non-repairable ones.",
          "A BIA identifies mission-essential functions, dependencies, and single points of failure, and sets recovery priority."
        ],
        taglish:
          "Ang BIA ay pag-aaral kung aling mga business function ang pinakamahalaga at magkano ang pinsala kapag nag-down ang mga ito. MTD, ito ang pinakamahabang downtime na kaya ng negosyo. RTO, target na oras para maibalik ang system, kaya dapat mas maikli ito kaysa MTD. RPO, gaano karaming data ang kaya mong mawala (kailan ang huling maayos na backup). MTBF, gaano katagal bago masira ang system (mas mataas, mas maganda). MTTR, gaano katagal ang pag-ayos (mas mababa, mas maganda)."
      }
    ]
  };

  const NEW_PRO_TIPS = {
    "d1-t6": "Scenario shortcut: 'verify the file was not altered' = hash. 'Prove who sent it and that they cannot deny it' = digital signature. 'Keep it secret' = encryption. Never pick encryption for an integrity-only question.",
    "d1-t7": "Count the keys and the devices: ONE laptop and BitLocker means TPM; a whole organization, a certificate authority, or very high crypto volume means HSM. 'Isolated area inside the CPU' means secure enclave.",
    "d2-t13": "Look at what is exhausted. Bandwidth full = volumetric. Half-open TCP connections = SYN flood (protocol). Normal bandwidth but busy web threads = application-layer. Then pick the defense that matches that layer.",
    "d3-t15": "If the question needs 'encrypted', choose ESP, not AH. If it says 'entire original packet hidden' or 'gateway to gateway', choose tunnel mode. If it says 'passes through firewalls on 443', think SSL/TLS VPN.",
    "d3-t16": "Shared kernel is the keyword: if the question says the workload 'shares the host operating system', it is a container, and the matching risk is container escape. A VM has its own guest OS and a hypervisor boundary.",
    "d4-t19": "Ask which question is being asked: 'who may send?' = SPF, 'is the message signed and intact?' = DKIM, 'what should receivers do when those fail?' = DMARC. DMARC is the only one with a reject/quarantine policy.",
    "d4-t20": "DNSSEC and DoH are opposites in purpose: DNSSEC = trust the answer (signatures), DoH/DoT = hide the question (encryption). The exam loves swapping them as distractors.",
    "d5-t10": "Voluntary versus mandatory splits the list instantly: NIST CSF, ISO 27001, CIS are frameworks you choose; HIPAA, GDPR, and PCI DSS are requirements. For SOC 2, 'Type II' always means 'over a period of time'.",
    "d5-t11": "Pair the letters with the word: RTO = Time, RPO = Point (of data), MTD = the maximum the business can tolerate. If a choice has RTO longer than MTD, it is automatically wrong."
  };

  const NEW_SUMMARIES = {
    "d1-t6": "Hashes verify integrity and cannot be reversed, salts make every stored password hash unique, and a digital signature (a hash signed with a private key) proves who sent something and that it was not changed.",
    "d1-t7": "A TPM protects keys and boot integrity on one device, an HSM protects an organization's keys at scale, and a secure enclave isolates running code inside the processor.",
    "d2-t13": "A DDoS floods a service from many sources to take it offline, as bandwidth floods, protocol abuse like SYN floods, or expensive application requests; defenses depend on the layer being hit.",
    "d3-t15": "VPNs wrap traffic in an encrypted tunnel; IPsec uses ESP to encrypt (AH only authenticates), in tunnel mode for whole packets or transport mode for payloads, with IKE negotiating keys first.",
    "d3-t16": "Infrastructure as code, containers, and microservices make environments consistent and fast to change, but they spread one bad template, share a kernel, and multiply APIs to secure.",
    "d4-t19": "SPF lists who may send for your domain, DKIM signs each message, and DMARC tells receivers what to do when those checks fail and sends you reports.",
    "d4-t20": "DNS attacks forge or abuse lookups; DNSSEC proves answers are genuine, DoH/DoT hide queries, filtering blocks bad domains, and sinkholes redirect malware so infected hosts get found.",
    "d5-t10": "Frameworks (NIST CSF, ISO 27001, CIS) are voluntary guidance while regulations are mandatory, and a gap analysis measures where you are against one of them to build a fix list.",
    "d5-t11": "A business impact analysis ranks critical functions and sets recovery targets: MTD is the limit, RTO is time to restore, RPO is tolerable data loss, MTBF and MTTR describe reliability and repair time."
  };

  const NEW_QUESTIONS = [
    {
      id: "q-x-d1-1", domainId: "d1", tag: "d1-t6", type: "single",
      prompt: "A company stores user passwords in a database. Which approach BEST protects them if the database is stolen and attackers have precomputed rainbow tables?",
      choices: [
        { id: "a", text: "Hash each password with a unique random salt using a slow algorithm such as bcrypt" },
        { id: "b", text: "Encrypt the passwords with AES using one key stored on the same server" },
        { id: "c", text: "Hash each password with unsalted MD5" },
        { id: "d", text: "Store the passwords in a Base64-encoded column" }
      ],
      correct: "a",
      explanation: "A unique salt makes every hash different, which defeats precomputed rainbow tables, and a slow algorithm like bcrypt makes each guess expensive.",
      distractorExplanations: {
        b: "Reversible encryption with a key sitting on the same server means the attacker who steals the database can usually steal the key too. Passwords should be hashed, not encrypted.",
        c: "Unsalted MD5 is fast and has known collisions, and is exactly what rainbow tables are built for.",
        d: "Base64 is an encoding, not protection. Anyone can reverse it instantly."
      }
    },
    {
      id: "q-x-d1-2", domainId: "d1", tag: "d1-t6", type: "single",
      prompt: "A manager must be able to prove that an employee sent a signed purchase approval and that the employee cannot later deny it. Which technology provides this?",
      choices: [
        { id: "a", text: "A digital signature" },
        { id: "b", text: "An HMAC with a shared secret" },
        { id: "c", text: "A SHA-256 hash alone" },
        { id: "d", text: "Symmetric encryption" }
      ],
      correct: "a",
      explanation: "A digital signature uses the signer's private key, so it provides integrity, authentication, and non-repudiation.",
      distractorExplanations: {
        b: "An HMAC uses a secret shared by both parties, so either one could have produced it; it cannot provide non-repudiation.",
        c: "A hash alone shows the data did not change but proves nothing about who created it.",
        d: "Symmetric encryption protects confidentiality; the shared key means it cannot prove who sent the message."
      }
    },
    {
      id: "q-x-d1-3", domainId: "d1", tag: "d1-t7", type: "single",
      prompt: "A certificate authority needs to protect its root private key so that even administrators cannot export it, and it must sign thousands of certificates per hour. Which component is the BEST fit?",
      choices: [
        { id: "a", text: "A hardware security module (HSM)" },
        { id: "b", text: "A TPM on the CA server's motherboard" },
        { id: "c", text: "A password-protected file on an encrypted disk" },
        { id: "d", text: "A secure enclave on an administrator's phone" }
      ],
      correct: "a",
      explanation: "An HSM is a tamper-resistant device built to generate, store, and use many keys at high speed without letting them leave in plaintext.",
      distractorExplanations: {
        b: "A TPM is tied to one device and is meant for platform integrity and disk encryption, not high-volume signing for an organization.",
        c: "A file-based key can be copied by anyone with sufficient access.",
        d: "A phone's secure enclave protects that phone's credentials and is not designed for CA signing at scale."
      }
    },
    {
      id: "q-x-d1-4", domainId: "d1", tag: "d1-t7", type: "single",
      prompt: "A laptop fleet uses BitLocker, and the company wants each drive to unlock only on its original machine when the boot process is untampered. Which component makes this possible?",
      choices: [
        { id: "a", text: "TPM" },
        { id: "b", text: "HSM" },
        { id: "c", text: "KMS" },
        { id: "d", text: "SIEM" }
      ],
      correct: "a",
      explanation: "A TPM is bound to the individual device and can release disk-encryption keys only if boot measurements match the expected state.",
      distractorExplanations: {
        b: "An HSM manages organization-wide keys and is not a chip inside each laptop.",
        c: "A KMS is a managed key service, typically in the cloud, not a per-device boot-integrity mechanism.",
        d: "A SIEM collects and correlates logs; it does not hold disk encryption keys."
      }
    },
    {
      id: "q-x-d2-1", domainId: "d2", tag: "d2-t13", type: "single",
      prompt: "A web server shows normal bandwidth usage, but its connection table is full of half-open TCP connections and legitimate users cannot connect. What type of attack is MOST likely occurring?",
      choices: [
        { id: "a", text: "SYN flood (protocol attack)" },
        { id: "b", text: "DNS amplification (volumetric attack)" },
        { id: "c", text: "SQL injection" },
        { id: "d", text: "ARP poisoning" }
      ],
      correct: "a",
      explanation: "Half-open TCP connections exhausting the server's connection table are the signature of a SYN flood, a protocol-level denial of service.",
      distractorExplanations: {
        b: "An amplification attack would saturate bandwidth, which the scenario says is normal.",
        c: "SQL injection targets database queries, not the TCP connection table.",
        d: "ARP poisoning is a local-network on-path attack and does not exhaust connections."
      }
    },
    {
      id: "q-x-d2-2", domainId: "d2", tag: "d2-t13", type: "single",
      prompt: "An attacker sends small DNS requests to open resolvers using the victim's spoofed IP address, causing large responses to flood the victim. Which TWO terms describe this attack?",
      choices: [
        { id: "a", text: "Reflection and amplification" },
        { id: "b", text: "Replay and downgrade" },
        { id: "c", text: "Pass-the-hash and credential stuffing" },
        { id: "d", text: "Typosquatting and pharming" }
      ],
      correct: "a",
      explanation: "A spoofed source sends replies to the victim (reflection), and the small request triggering a much larger response is amplification.",
      distractorExplanations: {
        b: "Replay reuses captured messages and downgrade forces weaker protocols; neither matches the scenario.",
        c: "Those are credential attacks, not denial-of-service techniques.",
        d: "Those are deception techniques for redirecting users, not traffic floods."
      }
    },
    {
      id: "q-x-d3-1", domainId: "d3", tag: "d3-t15", type: "single",
      prompt: "A network engineer needs an IPsec configuration that provides confidentiality for traffic between two branch gateways and hides the original internal IP addresses. Which configuration should be used?",
      choices: [
        { id: "a", text: "ESP in tunnel mode" },
        { id: "b", text: "AH in tunnel mode" },
        { id: "c", text: "AH in transport mode" },
        { id: "d", text: "ESP in transport mode with split tunneling" }
      ],
      correct: "a",
      explanation: "ESP provides encryption, and tunnel mode encapsulates the entire original packet, including its IP header, between gateways.",
      distractorExplanations: {
        b: "AH provides integrity and authentication but no encryption, so confidentiality is missing.",
        c: "AH provides no encryption, and transport mode leaves the original IP header visible.",
        d: "Transport mode keeps the original IP header, and split tunneling is a client routing choice, not a gateway-to-gateway encryption mode."
      }
    },
    {
      id: "q-x-d3-2", domainId: "d3", tag: "d3-t16", type: "single",
      prompt: "A DevOps team defines its cloud networks and servers in version-controlled templates that a pipeline deploys automatically. Which security risk is MOST specific to this approach?",
      choices: [
        { id: "a", text: "A misconfiguration in one template can be replicated across every environment" },
        { id: "b", text: "Physical theft of the hypervisor host" },
        { id: "c", text: "Inability to track who changed the infrastructure" },
        { id: "d", text: "Lack of repeatability between environments" }
      ],
      correct: "a",
      explanation: "Infrastructure as code deploys the same definition everywhere, so a flawed template (for example an open security group) spreads at machine speed unless it is scanned first.",
      distractorExplanations: {
        b: "Physical theft is not specific to infrastructure as code.",
        c: "IaC improves change tracking because changes live in version control.",
        d: "Repeatability is a benefit of IaC, not a risk."
      }
    },
    {
      id: "q-x-d4-1", domainId: "d4", tag: "d4-t19", type: "single",
      prompt: "A company wants receiving mail servers to reject messages that fail authentication for its domain and to receive reports on who is sending mail as the company. Which DNS record should be published?",
      choices: [
        { id: "a", text: "DMARC" },
        { id: "b", text: "SPF" },
        { id: "c", text: "DKIM" },
        { id: "d", text: "MX" }
      ],
      correct: "a",
      explanation: "DMARC defines the policy (none, quarantine, reject) for failing mail and provides aggregate and forensic reporting.",
      distractorExplanations: {
        b: "SPF lists authorized sending servers but does not set a failure policy or send reports.",
        c: "DKIM provides a signature to verify; the policy and reporting come from DMARC.",
        d: "An MX record tells senders where to deliver mail for the domain; it has nothing to do with authentication."
      }
    },
    {
      id: "q-x-d4-2", domainId: "d4", tag: "d4-t19", type: "single",
      prompt: "Which email authentication mechanism uses a public key published in DNS to verify a cryptographic signature added to each outgoing message?",
      choices: [
        { id: "a", text: "DKIM" },
        { id: "b", text: "SPF" },
        { id: "c", text: "S/MIME" },
        { id: "d", text: "STARTTLS" }
      ],
      correct: "a",
      explanation: "DKIM signs messages with a private key and publishes the matching public key in DNS so receivers can verify the signature.",
      distractorExplanations: {
        b: "SPF checks the sending server's IP address against a published list; it uses no signature.",
        c: "S/MIME signs and encrypts message content using certificates, not a DNS-published key.",
        d: "STARTTLS encrypts the connection between mail servers; it does not authenticate the domain's messages."
      }
    },
    {
      id: "q-x-d4-3", domainId: "d4", tag: "d4-t20", type: "single",
      prompt: "A security team wants to redirect lookups for known malicious domains to an internal server so they can identify which hosts are infected. Which technique should they use?",
      choices: [
        { id: "a", text: "DNS sinkhole" },
        { id: "b", text: "DNSSEC" },
        { id: "c", text: "DNS over HTTPS" },
        { id: "d", text: "Zone transfer" }
      ],
      correct: "a",
      explanation: "A DNS sinkhole answers malicious domain queries with a controlled address, blocking the connection and revealing the hosts that tried to reach it.",
      distractorExplanations: {
        b: "DNSSEC verifies that answers are authentic; it does not redirect lookups for malicious domains.",
        c: "DoH encrypts queries for privacy and does not redirect them.",
        d: "A zone transfer copies DNS data between servers and is unrelated to malware detection."
      }
    },
    {
      id: "q-x-d4-4", domainId: "d4", tag: "d4-t20", type: "single",
      prompt: "Which statement correctly describes DNSSEC?",
      choices: [
        { id: "a", text: "It digitally signs DNS records to provide authenticity and integrity, but does not encrypt queries" },
        { id: "b", text: "It encrypts DNS queries between the client and resolver" },
        { id: "c", text: "It blocks access to malicious domains by category" },
        { id: "d", text: "It restricts which servers may request zone transfers" }
      ],
      correct: "a",
      explanation: "DNSSEC adds signatures to DNS data so resolvers can validate that answers are genuine and unaltered. It does not provide confidentiality.",
      distractorExplanations: {
        b: "Encrypting queries is the job of DNS over HTTPS or DNS over TLS.",
        c: "Blocking by category is DNS filtering.",
        d: "Zone transfer restrictions are a separate configuration control."
      }
    },
    {
      id: "q-x-d5-1", domainId: "d5", tag: "d5-t10", type: "single",
      prompt: "A cloud service provider wants to give customers independent assurance that its security controls operated effectively over the past nine months. Which report should it obtain?",
      choices: [
        { id: "a", text: "SOC 2 Type II" },
        { id: "b", text: "SOC 2 Type I" },
        { id: "c", text: "An internal gap analysis" },
        { id: "d", text: "ISO 27002 guidance" }
      ],
      correct: "a",
      explanation: "A SOC 2 Type II report is an independent auditor's opinion on how controls operated over a period of time.",
      distractorExplanations: {
        b: "Type I only evaluates the design of controls at a single point in time.",
        c: "An internal gap analysis is not independent assurance and does not test operation over time.",
        d: "ISO 27002 is guidance on controls, not an audit report."
      }
    },
    {
      id: "q-x-d5-2", domainId: "d5", tag: "d5-t10", type: "single",
      prompt: "An organization compares its current controls to the CIS Critical Security Controls to list what is missing and rank what to fix first. What is this activity called?",
      choices: [
        { id: "a", text: "Gap analysis" },
        { id: "b", text: "Penetration testing" },
        { id: "c", text: "Quantitative risk assessment" },
        { id: "d", text: "Business impact analysis" }
      ],
      correct: "a",
      explanation: "A gap analysis compares the current state to a desired standard and produces a prioritized list of differences to remediate.",
      distractorExplanations: {
        b: "Penetration testing actively attempts to exploit systems; it is not a comparison against a standard.",
        c: "A quantitative risk assessment calculates monetary loss such as SLE and ALE.",
        d: "A BIA measures the impact of losing business functions, not the distance from a control standard."
      }
    },
    {
      id: "q-x-d5-3", domainId: "d5", tag: "d5-t11", type: "single",
      prompt: "A business impact analysis determines that a billing system can lose no more than 30 minutes of transactions. Which metric does this describe?",
      choices: [
        { id: "a", text: "RPO" },
        { id: "b", text: "RTO" },
        { id: "c", text: "MTBF" },
        { id: "d", text: "MTTR" }
      ],
      correct: "a",
      explanation: "The Recovery Point Objective is the maximum acceptable data loss, measured as time since the last good backup.",
      distractorExplanations: {
        b: "RTO is the target time to restore the system, not the amount of data that can be lost.",
        c: "MTBF is the average time between failures of a system.",
        d: "MTTR is the average time to repair a failed system."
      }
    },
    {
      id: "q-x-d5-4", domainId: "d5", tag: "d5-t11", type: "single",
      prompt: "A server has an MTBF of 2,000 hours and an MTTR of 8 hours. Which change would MOST improve its availability?",
      choices: [
        { id: "a", text: "Reducing MTTR by keeping a hot spare" },
        { id: "b", text: "Increasing the RPO" },
        { id: "c", text: "Increasing the MTTR" },
        { id: "d", text: "Decreasing the MTBF" }
      ],
      correct: "a",
      explanation: "Availability is roughly MTBF / (MTBF + MTTR). A shorter repair time, such as swapping to a hot spare, raises availability.",
      distractorExplanations: {
        b: "RPO governs acceptable data loss and does not change how often the server fails or how fast it is repaired.",
        c: "A longer repair time lowers availability.",
        d: "A lower MTBF means more frequent failures, which lowers availability."
      }
    }
  ];

  const NEW_GLOSSARY = [
    { term: "Salt", domain: "d1", plain: "A random extra value added to a password before hashing.", technical: "A unique, non-secret random value stored with the hash so identical passwords produce different hashes and precomputed rainbow tables fail.", example: "Two users with the password 'Summer2024' get completely different stored hashes." },
    { term: "Digital Signature", domain: "d1", plain: "A tamper-proof electronic signature that proves who sent something.", technical: "A hash of the message encrypted with the signer's private key; verified with the public key. Provides integrity, authentication, and non-repudiation.", example: "A signed software installer whose publisher the operating system can verify." },
    { term: "TPM", domain: "d1", plain: "A security chip on one computer that holds keys and checks boot integrity.", technical: "Trusted Platform Module: a hardware chip bound to a device that stores keys, supports disk encryption, and provides measured boot and attestation.", example: "BitLocker keys sealed to the laptop's TPM." },
    { term: "HSM", domain: "d1", plain: "A hardened device that stores and uses an organization's most important keys.", technical: "Hardware Security Module: a tamper-resistant device (often FIPS 140 validated) for generating, storing, and using cryptographic keys at scale.", example: "A certificate authority's root private key held in a network HSM." },
    { term: "DDoS", domain: "d2", plain: "Overwhelming a service from many machines at once so nobody can use it.", technical: "Distributed denial of service: traffic from many sources, often a botnet, exhausts bandwidth, connection state, or application resources.", example: "Thousands of infected cameras flooding a shop's website." },
    { term: "SYN Flood", domain: "d2", plain: "Starting lots of connections and never finishing them.", technical: "A protocol-level DoS attack that sends many TCP SYN packets without completing the handshake, filling the server's connection table.", example: "A server stuck with thousands of half-open connections." },
    { term: "IPsec", domain: "d3", plain: "A set of protocols that encrypts and authenticates IP traffic.", technical: "A network-layer protocol suite using AH and ESP, in transport or tunnel mode, with keys negotiated through IKE.", example: "A site-to-site VPN between two offices." },
    { term: "Infrastructure as Code", domain: "d3", plain: "Building servers and networks from code files instead of by hand.", technical: "Defining and provisioning infrastructure through version-controlled, machine-readable definitions deployed by automation.", example: "A Terraform file that creates a network and servers identically every time." },
    { term: "SPF", domain: "d4", plain: "A DNS list of the servers allowed to send email for a domain.", technical: "Sender Policy Framework: a DNS TXT record listing authorized sending hosts that receivers check against the connecting IP.", example: "example.com lists its mail provider's servers in SPF." },
    { term: "DKIM", domain: "d4", plain: "A digital signature on outgoing email that receivers can verify.", technical: "DomainKeys Identified Mail: a private-key signature on messages, validated with a public key published in DNS.", example: "A DKIM-Signature header on a company's email." },
    { term: "DMARC", domain: "d4", plain: "A policy telling receivers what to do with email that fails SPF and DKIM.", technical: "Domain-based Message Authentication, Reporting and Conformance: sets a none, quarantine, or reject policy, requires alignment, and requests reports.", example: "_dmarc.example.com with p=reject." },
    { term: "DNS Sinkhole", domain: "d4", plain: "Sending bad lookups to a safe server instead of the attacker's.", technical: "A DNS technique that answers queries for malicious domains with a controlled address, blocking malware communication and identifying infected hosts.", example: "Infected PCs trying to reach a botnet server land on a monitored sinkhole." },
    { term: "DNSSEC", domain: "d4", plain: "Digital signatures that prove DNS answers are genuine.", technical: "DNS Security Extensions: cryptographic signatures on DNS records providing authenticity and integrity, but not confidentiality.", example: "A validating resolver rejects a forged record." },
    { term: "Gap Analysis", domain: "d5", plain: "Checking what you have against what a standard requires.", technical: "A comparison of the current security posture to a target framework or regulation to identify and prioritize deficiencies.", example: "Comparing existing controls to the CIS Critical Security Controls." },
    { term: "Business Impact Analysis", domain: "d5", plain: "Working out which business functions matter most and what an outage would cost.", technical: "BIA: identifies critical functions, dependencies, and the impact of disruption over time, and sets recovery priorities and targets such as MTD, RTO, and RPO.", example: "Finding that checkout must be back within 2 hours." }
  ];

  const NEW_ACRONYMS = [
    { acro: "IaC", expansion: "Infrastructure as Code", meaning: "Defining servers, networks, and permissions in version-controlled files so they deploy the same way every time." },
    { acro: "MTD", expansion: "Maximum Tolerable Downtime", meaning: "The longest a business function can be unavailable before the harm becomes unacceptable. Also called MAO." },
    { acro: "CSF", expansion: "Cybersecurity Framework (NIST)", meaning: "A voluntary NIST framework organized into Identify, Protect, Detect, Respond, and Recover (plus Govern in version 2.0)." },
    { acro: "RMF", expansion: "Risk Management Framework (NIST)", meaning: "A lifecycle for categorizing systems and selecting, implementing, assessing, and authorizing security controls." },
    { acro: "WRT", expansion: "Work Recovery Time", meaning: "The time needed after systems are restored to verify data and resume normal operations." },
    { acro: "DoH", expansion: "DNS over HTTPS", meaning: "Encrypting DNS queries inside HTTPS (TCP 443) for privacy." },
    { acro: "DoT", expansion: "DNS over TLS", meaning: "Encrypting DNS queries with TLS (TCP 853) for privacy." }
  ];

  /* ---------- merge into the existing globals ---------- */

  const sortKey = (domain, lesson) => {
    const m = /^(\d+)\.(\d+)$/.exec(lesson.tag || "");
    if (!m || parseInt(m[1], 10) !== domain.number) return 9999;
    return parseInt(m[2], 10);
  };

  DOMAINS.forEach((d) => {
    const extra = NEW_LESSONS[d.id] || [];
    extra.forEach((l) => {
      if (!d.topics.some((t) => t.id === l.id)) d.topics.push(l);
    });
    // Order topics by exam objective (1.1, 1.2, ...); stable for equal keys.
    d.topics = d.topics
      .map((t, i) => ({ t, i, k: sortKey(d, t) }))
      .sort((a, b) => a.k - b.k || a.i - b.i)
      .map((x) => x.t);
  });

  Object.assign(PRO_TIPS, NEW_PRO_TIPS);
  Object.assign(QUICK_SUMMARIES, NEW_SUMMARIES);

  NEW_QUESTIONS.forEach((q) => { if (!QUESTIONS.some((x) => x.id === q.id)) QUESTIONS.push(q); });
  NEW_GLOSSARY.forEach((g) => { if (!GLOSSARY.some((x) => x.term.toLowerCase() === g.term.toLowerCase())) GLOSSARY.push(g); });
  NEW_ACRONYMS.forEach((a) => { if (!ACRONYMS.some((x) => x.acro === a.acro)) ACRONYMS.push(a); });
  ACRONYMS.sort((a, b) => a.acro.localeCompare(b.acro, undefined, { sensitivity: "base" }));
})();
