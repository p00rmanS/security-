/* More lessons, round 2, part A (Domains 2-3). Ids use the t16x range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d2: [
      {
        id: "d2-t161",
        title: "Legacy, End-of-Life, and Unsupported Systems: Managing Risk You Cannot Patch",
        tag: "2.3",
        minutes: 18,
        goal: "Explain the difference between end-of-life and end-of-support, why legacy systems are risky, and which compensating controls and lifecycle practices reduce that risk.",
        why: "Unsupported systems are one of the most common reasons a known vulnerability stays open. The exam names end-of-life and legacy hardware and software directly, and expects you to choose mitigations when replacement is not possible.",
        simple:
          "Every product has a lifecycle. END OF LIFE (EOL) means the vendor stops selling or promoting a product, and END OF SUPPORT (EOS or EOSL, end of service life) means the vendor stops providing security patches and technical help. After that date, any newly discovered vulnerability stays unpatched forever, and attackers know it: they target unsupported systems precisely because the flaws are public and permanent. A LEGACY system is old technology that is still in use, often because it runs a critical process, replacement would be expensive, the software is custom, or a certified medical or industrial device cannot be changed without re-approval. Legacy systems carry predictable problems: no security updates, outdated protocols and ciphers (SMBv1, TLS 1.0, weak encryption), no support for modern controls such as multi-factor authentication or endpoint agents, failing hardware with no spare parts, and a shrinking pool of people who understand them. Hardware has a similar issue: firmware that is no longer updated leaves permanent holes below the operating system. Because replacement may take months or years, security teams reduce the risk with COMPENSATING CONTROLS: isolate the system on its own network segment, allow only the connections it needs, block Internet access, restrict who can log in, apply virtual patching through an intrusion prevention system or web application firewall, use application allowlisting, monitor it closely, and disable unneeded services. Where possible, buy extended support, run the old application in a contained virtual environment, or plan a migration. If the risk is accepted, the decision should be a documented exception approved by the risk owner with a review date, not an unspoken default. The best defense is managing the whole lifecycle: record support end dates in the asset inventory, plan replacements before dates arrive, and include security and supportability in procurement requirements so that tomorrow's legacy problem is smaller.",
        deepDive: [
          { h: "Terms that sound alike", list: [
            "End of life (EOL): the vendor stops selling the product; support may continue for a while.",
            "End of support / end of service life (EOS, EOSL): no more patches or help. This is the date that matters for security.",
            "Legacy: still in use, regardless of whether it is supported.",
            "Technical debt: the accumulated cost of putting off upgrades and fixes."
          ] },
          { h: "Why attackers love unsupported systems", list: [
            "Known vulnerabilities will never be fixed, so exploit code stays useful for years.",
            "Worm-style malware spreads through old, unpatched services.",
            "Old systems often lack logging, so intrusions go unnoticed.",
            "They are frequently trusted on the internal network with broad access."
          ] },
          { h: "Compensating controls in practice", list: [
            "Network isolation or an air gap with strict firewall rules.",
            "Virtual patching: an IPS or WAF blocks known exploits before they reach the system.",
            "Application allowlisting and removal of unneeded services and accounts.",
            "Enhanced monitoring and alerting, with log forwarding from a trusted collector.",
            "Access only through a jump host with MFA.",
            "Offline backups and a tested recovery plan, since the system is likely to fail or be compromised."
          ] },
          { h: "Managing the lifecycle", list: [
            "Acquisition: set security and support-duration requirements in procurement.",
            "Deployment and operation: patch, monitor, and track in the asset inventory.",
            "Tracking: record EOL and EOS dates and alert months before they arrive.",
            "Retirement: sanitize or destroy storage, remove accounts and network paths, and update the inventory.",
            "Exceptions: formal, time-limited, owned by a named risk owner."
          ] }
        ],
        keyTerms: [
          { term: "End of Life (EOL)", def: "The vendor stops selling or actively promoting a product." },
          { term: "End of Support / EOSL", def: "The vendor stops providing security patches and technical support." },
          { term: "Legacy System", def: "Older technology that remains in use, often supporting a critical function." },
          { term: "Compensating Control", def: "An alternative safeguard used when the primary fix is not possible." },
          { term: "Virtual Patching", def: "Using an IPS or WAF rule to block exploitation of a vulnerability that cannot be patched." },
          { term: "Technical Debt", def: "Accumulated risk and cost from deferring upgrades and maintenance." },
          { term: "Risk Exception", def: "A documented, approved decision to operate with a known risk for a limited time." },
          { term: "Asset Lifecycle", def: "The stages from acquisition through operation to retirement of an asset." }
        ],
        analogy:
          "A legacy system past its support date is an old bridge that the maker no longer inspects or repairs. You can keep using it, but you must limit the traffic, put guards at both ends, watch it constantly, and plan its replacement. EOL is the day the maker stops selling that bridge model; end of support is the day they stop sending repair crews.",
        technical:
          "A factory runs a control workstation on an operating system whose support ended years ago, because the machine vendor has not certified any newer version. The security team places it on a dedicated VLAN behind a firewall that allows only the specific protocol to its controller, removes Internet access, enables application allowlisting, forwards its logs to a central collector, and adds an IPS rule set to block known exploits against its services. A formal risk exception documents the decision, names the plant manager as risk owner, and is reviewed every six months while a replacement project is funded.",
        table: {
          headers: ["Situation", "Risk", "Best response"],
          rows: [
            ["Vendor no longer provides patches", "Permanent known vulnerabilities", "Isolate, virtual patch, monitor, plan replacement"],
            ["Old protocols like SMBv1 or TLS 1.0 required", "Weak or broken security", "Disable where possible; restrict to the required hosts"],
            ["Cannot replace for cost or certification reasons", "Ongoing exposure", "Documented exception with compensating controls and review date"],
            ["Firmware no longer updated", "Permanent hardware-level flaws", "Segment, monitor, replace at the earliest opportunity"],
            ["Only one person knows the system", "Key-person risk", "Documentation, cross-training, migration plan"]
          ]
        },
        confusion: [
          { a: "End of life", b: "End of support", diff: "EOL means the vendor stops selling the product. End of support means patches stop. Security risk increases sharply at end of support." },
          { a: "Legacy", b: "Unsupported", diff: "Legacy is about age and continued use. Unsupported is about the vendor no longer patching. A legacy system may or may not still be supported." },
          { a: "Compensating control", b: "Risk acceptance", diff: "A compensating control lowers the risk when the fix is impossible. Acceptance leaves the risk in place with approval." },
          { a: "Virtual patching", b: "Patching", diff: "Real patching fixes the flaw in the software. Virtual patching blocks exploitation at a network control but leaves the flaw." }
        ],
        soc: "Legacy and unsupported assets are worth special alert rules because a single compromise there is likely to be both easy and damaging. Analysts keep an up-to-date list of such systems, watch for new connections to them from unusual sources, and treat any scan finding on them as a permanent condition that needs a compensating control, not a ticket that will be closed by a patch.",
        patterns: [
          ["Vendor no longer releases security updates", "End of support (EOSL)"],
          ["Old system still running a critical process", "Legacy system"],
          ["Cannot patch and cannot replace this year", "Isolate it, add compensating controls, document the exception"],
          ["IPS rule blocks the exploit for an unpatched server", "Virtual patching"],
          ["Backlog of postponed upgrades increases risk", "Technical debt"],
          ["Track support end dates for every asset", "Asset inventory and lifecycle management"],
          ["Retired server still holds data", "Sanitize or destroy storage during decommissioning"],
          ["Firmware never updated on network devices", "Hardware vulnerability; segment and plan replacement"]
        ],
        takeaways: [
          "End of support is the date that matters, because patches stop.",
          "Isolate, restrict, monitor, and virtually patch what you cannot fix.",
          "Track lifecycle dates and plan replacements before they arrive."
        ],
        remember: [
          "EOL = vendor stops selling. EOSL/EOS = vendor stops patching and supporting.",
          "Legacy = old but still in use. It brings unpatched flaws, weak protocols, and no support for modern controls.",
          "Cannot patch? Compensating controls: segmentation, firewall rules, virtual patching, allowlisting, monitoring.",
          "Accepting risk requires a documented exception, a named owner, and a review date.",
          "Lifecycle: acquire with requirements, operate and patch, track dates, retire with sanitization.",
          "Firmware and hardware also reach end of support.",
          "Technical debt grows the longer replacement is deferred."
        ],
        taglish:
          "Ang EOL, huminto na ang vendor sa pagbebenta. Ang end of support, huminto na sila sa pag-release ng patch at tulong, at ito ang mas delikado sa security. Ang legacy system, luma pero ginagamit pa rin, kadalasan dahil mahal palitan o hindi pwedeng baguhin (halimbawa kagamitang medikal o pang-industriya). Kapag hindi mapa-patch o mapalitan, gumamit ng compensating controls: ihiwalay sa network, limitahan ang access, virtual patching gamit ang IPS, at bantayan nang mabuti. Kung tatanggapin ang panganib, isulat ito bilang pormal na exception na may may-ari at petsa ng review."
      }
    ],

    d3: [
      {
        id: "d3-t162",
        title: "SD-WAN, SASE, ZTNA, and Modern Secure Remote Access",
        tag: "3.2",
        minutes: 20,
        goal: "Explain how SD-WAN, SASE, SSE, and ZTNA differ from traditional WANs and VPNs, and choose a secure remote-access approach for a given need.",
        why: "As applications moved to the cloud and staff moved out of the office, the old model of backhauling everything through headquarters stopped working. These terms appear throughout the infrastructure objective, and they are easy to confuse.",
        simple:
          "A traditional wide-area network (WAN) connects branch offices to headquarters over expensive private circuits, and remote users connect in through a VPN, so even traffic bound for cloud services is routed through the central data center to be inspected. That adds delay and cost. SD-WAN (software-defined WAN) replaces this with a flexible overlay managed by a central controller: it can use several links at once (broadband, LTE or 5G, private circuits), choose the best path for each application based on performance and policy, encrypt traffic between sites, and let new branches be set up automatically (zero-touch provisioning). SD-WAN improves connectivity, but the security still has to be delivered somewhere. SASE (Secure Access Service Edge, pronounced 'sassy') combines SD-WAN networking with security functions delivered from the cloud, close to users: a secure web gateway (SWG), a cloud access security broker (CASB), firewall as a service (FWaaS), and zero trust network access (ZTNA), all driven by the identity of the user and the health of the device rather than by network location. SSE (Security Service Edge) is the security portion of SASE without the SD-WAN networking. ZTNA deserves its own explanation: instead of putting a user ON the network, as a traditional VPN does, ZTNA verifies the user and device and then connects them only to the specific application they are allowed to use, hiding everything else. That reduces lateral movement because a compromised remote device cannot scan the whole internal network. Other remote-access methods still have a place: an IPsec or SSL/TLS VPN gives network-level access; a clientless portal gives browser-based access to selected apps; virtual desktop infrastructure (VDI) keeps data in the data center and sends only screen images to the user; and a jump server (bastion host) is a hardened gateway through which administrators reach sensitive systems, with MFA and session logging. When choosing, weigh what is being accessed, how sensitive it is, whether the device is managed, performance needs, and operational cost. Be aware of trade-offs: cloud security services add dependence on a provider, can introduce latency if the nearest point of presence is distant, and require TLS inspection decisions that touch privacy and legal considerations.",
        deepDive: [
          { h: "What SD-WAN does", list: [
            "Central controller defines policy; edge devices at each site follow it.",
            "Application-aware routing: send video calls over the best link and bulk backups over the cheapest.",
            "Uses multiple transports and fails over automatically.",
            "Encrypts site-to-site traffic with IPsec tunnels.",
            "Allows direct-to-cloud (local internet breakout) instead of backhauling to headquarters."
          ] },
          { h: "SASE building blocks", list: [
            "SWG: filters web traffic, blocks malicious sites, can inspect TLS.",
            "CASB: enforces policy and shows visibility into cloud app use, including shadow IT.",
            "FWaaS: firewall functions delivered from the cloud.",
            "ZTNA: per-application access after verifying identity and device posture.",
            "Often adds DLP, DNS filtering, and remote browser isolation."
          ] },
          { h: "VPN versus ZTNA", list: [
            "VPN: authenticates the user, then places the device on the network; trust is broad and based on network access.",
            "ZTNA: authenticates user AND device posture, grants access to one application at a time, and continuously re-evaluates.",
            "ZTNA hides applications from the Internet (no inbound open ports), shrinking the attack surface.",
            "VPNs remain common, but appliances exposed to the Internet are frequent targets and need rapid patching."
          ] },
          { h: "Other remote-access options", list: [
            "Clientless/browser portal: quick access to specific web apps; limited functionality.",
            "VDI / desktop-as-a-service: data stays in the data center; protects against data loss from lost devices.",
            "Jump server / bastion host: single hardened entry point for administrators; require MFA, log sessions, and allow only specific targets.",
            "Always-on VPN and split tunneling: always-on keeps traffic protected; split tunneling saves bandwidth but bypasses corporate inspection."
          ] },
          { h: "Trade-offs to remember", list: [
            "Provider dependence and potential lock-in.",
            "Latency if users are far from the nearest cloud security point of presence.",
            "Inspecting encrypted traffic requires deploying a trusted certificate to devices and raises privacy questions.",
            "A single misconfigured policy can affect every site at once."
          ] }
        ],
        keyTerms: [
          { term: "SD-WAN", def: "Software-defined WAN: a centrally managed overlay that selects the best path for each application across multiple links." },
          { term: "SASE", def: "Secure Access Service Edge: converges networking (SD-WAN) and cloud-delivered security services." },
          { term: "SSE", def: "Security Service Edge: the cloud-delivered security portion of SASE." },
          { term: "ZTNA", def: "Zero Trust Network Access: per-application access granted after verifying user and device." },
          { term: "SWG", def: "Secure Web Gateway: filters and inspects web traffic." },
          { term: "CASB", def: "Cloud Access Security Broker: policy enforcement and visibility for cloud service use." },
          { term: "FWaaS", def: "Firewall as a Service: firewall functions delivered from the cloud." },
          { term: "VDI", def: "Virtual Desktop Infrastructure: desktops run in the data center and are streamed to users." },
          { term: "Jump Server", def: "A hardened gateway used to reach sensitive systems, with MFA and logging." },
          { term: "Split Tunneling", def: "Sending only some traffic through the VPN while the rest goes directly to the Internet." }
        ],
        analogy:
          "The old model is routing every employee's mail through headquarters before it goes out, even if it is addressed to a company across the street. SD-WAN lets each branch pick the best road for each package. SASE puts a security checkpoint at every major road junction in the cloud, rather than one checkpoint at headquarters. A VPN gives a visitor a key card to the whole building; ZTNA escorts them to exactly one meeting room.",
        technical:
          "A retailer with 200 stores replaces expensive private circuits with SD-WAN, using cheap broadband and LTE backup and sending cloud-app traffic directly to the Internet from each store. Security moves to a cloud service that provides web filtering, CASB, and ZTNA. Head-office staff and contractors reach internal apps through ZTNA, which checks that their laptop is managed and encrypted and exposes only the apps they need, instead of giving them full VPN access. Administrators reach servers only through a jump server that requires MFA and records sessions.",
        table: {
          headers: ["Technology", "Main purpose", "Key idea"],
          rows: [
            ["SD-WAN", "Connect sites efficiently", "Central policy, multiple links, application-aware routing"],
            ["SASE", "Networking plus security in the cloud", "SD-WAN + SWG + CASB + FWaaS + ZTNA, identity-driven"],
            ["SSE", "Cloud-delivered security only", "SASE without the SD-WAN piece"],
            ["ZTNA", "Secure per-app access", "Verify user and device; no broad network access"],
            ["VPN", "Encrypted network-level access", "User joins the network"],
            ["VDI", "Keep data in the data center", "Screen is streamed to the device"],
            ["Jump server", "Controlled admin access", "Single hardened entry point with MFA and logging"]
          ]
        },
        confusion: [
          { a: "SD-WAN", b: "SASE", diff: "SD-WAN is the networking part (smart routing across links). SASE adds cloud-delivered security services on top of it." },
          { a: "SASE", b: "SSE", diff: "SSE is just the security services of SASE. SASE also includes the SD-WAN networking." },
          { a: "VPN", b: "ZTNA", diff: "A VPN puts the device on the network. ZTNA connects a verified user and device to a single application and hides the rest." },
          { a: "VDI", b: "VPN", diff: "VDI keeps data and processing in the data center and streams the display. A VPN lets the user's own device access resources over an encrypted tunnel." },
          { a: "Jump server", b: "VPN", diff: "A VPN provides the network path. A jump server is a controlled stepping-stone to reach specific sensitive systems after you are in." }
        ],
        soc: "As the perimeter dissolves, logs come from cloud security services as well as local devices. Analysts correlate ZTNA and identity logs with endpoint posture to spot a compromised device or stolen credentials, and watch for policy changes in the SASE console, since one malicious change there can expose many sites. Visibility depends on making sure these services forward logs to the SIEM.",
        patterns: [
          ["Choose the best link per application across broadband and LTE", "SD-WAN"],
          ["Networking and cloud security delivered together", "SASE"],
          ["Only the cloud-delivered security portion", "SSE"],
          ["Grant access to one application only after verifying user and device", "ZTNA"],
          ["Data must never leave the data center", "VDI"],
          ["Administrators reach servers through one hardened gateway", "Jump server (bastion host)"],
          ["Corporate security tools bypassed for some traffic", "Split tunneling risk"],
          ["Discover unapproved cloud apps", "CASB"]
        ],
        takeaways: [
          "SD-WAN is smart networking; SASE adds cloud security; SSE is the security half.",
          "ZTNA gives per-application access instead of network access.",
          "Choose the remote-access method by sensitivity, device management, and performance."
        ],
        remember: [
          "SD-WAN = central policy and application-aware routing over multiple links, with local Internet breakout.",
          "SASE = SD-WAN + SWG + CASB + FWaaS + ZTNA. SSE = the security services only.",
          "ZTNA = per-application access after verifying user and device. VPN = network-level access.",
          "VDI keeps data in the data center; a jump server is a controlled admin gateway with MFA and logging.",
          "Split tunneling saves bandwidth but bypasses corporate inspection.",
          "Cloud security services create dependence on a provider and need log forwarding to the SIEM.",
          "Inspecting TLS traffic requires a trusted certificate on devices and raises privacy considerations."
        ],
        taglish:
          "Ang SD-WAN, matalinong pagpili ng ruta para sa bawat application gamit ang maraming koneksyon (broadband, LTE) na kontrolado mula sa gitna. Ang SASE, pinagsasama ang SD-WAN at security na galing sa cloud (SWG, CASB, FWaaS, ZTNA). Ang SSE, ang security lang na bahagi. Ang ZTNA, hindi ka ipinapasok sa buong network tulad ng VPN; kokonekta ka lang sa partikular na application matapos i-verify ang user at device. Ang VDI, nasa data center ang datos at screen lang ang ipinapadala. Ang jump server, iisang matibay na pintuan para sa mga admin, may MFA at recording."
      },
      {
        id: "d3-t163",
        title: "Web Gateways: Forward Proxies, Reverse Proxies, WAFs, and TLS Inspection",
        tag: "3.2",
        minutes: 18,
        goal: "Distinguish forward and reverse proxies, secure web gateways, and web application firewalls, and explain how TLS inspection and URL filtering work.",
        why: "Web traffic is the main path for both user-side attacks and attacks on web applications. The exam asks you to choose the right device for the direction of traffic and the layer being protected.",
        simple:
          "A PROXY sits between two parties and handles traffic on behalf of one of them. A FORWARD proxy serves INTERNAL users going OUT to the Internet: clients send requests to the proxy, which can filter by URL or category, block malware, enforce an acceptable use policy, cache content, and log activity. A REVERSE proxy serves EXTERNAL users going IN to your servers: it sits in front of web servers, hiding their addresses, terminating TLS, balancing load, caching, and screening requests before they reach the application. A SECURE WEB GATEWAY (SWG) is a forward proxy with a rich set of security features, such as URL and content category filtering, reputation checks, malware scanning, data loss prevention, and application control, and it is now often delivered from the cloud. A transparent proxy intercepts traffic without client configuration, while an explicit proxy requires clients to be configured to use it. URL FILTERING (web filtering) decides whether a site may be visited using categories (gambling, adult content, malware), reputation, or allow and deny lists. A WEB APPLICATION FIREWALL (WAF) is different from both: it works at Layer 7 and examines HTTP and HTTPS requests to PROTECT A WEB APPLICATION from attacks such as SQL injection, cross-site scripting, and malicious file uploads. A WAF can use a negative model (block known-bad patterns) or a positive model (allow only known-good requests), and it can virtually patch a flaw in an application until the code is fixed. It is not the same as a traditional or next-generation firewall, which filters by addresses, ports, and applications. Because most traffic is encrypted, these devices often use TLS INSPECTION: the proxy decrypts traffic, inspects it, and re-encrypts it, presenting the client with a certificate signed by an internal certificate authority that devices have been configured to trust. This enables malware and data-loss detection inside HTTPS, but it requires careful handling: some sensitive categories (banking, healthcare) are usually exempted, applications that pin certificates will break, and the decryption point itself becomes a high-value target and a privacy and legal matter.",
        deepDive: [
          { h: "Forward versus reverse proxy", list: [
            "Forward: protects and controls USERS going out; the server sees the proxy, not the client.",
            "Reverse: protects SERVERS taking requests in; the client sees the proxy, not the real server.",
            "A common memory aid: forward = users to the Internet; reverse = Internet to servers."
          ] },
          { h: "What a secure web gateway adds", list: [
            "Category and reputation-based URL filtering.",
            "Malware and sandbox scanning of downloads.",
            "TLS inspection and data loss prevention.",
            "Application controls (allow a service but block uploads, for example).",
            "Logging and reporting for investigation and compliance."
          ] },
          { h: "WAF in detail", list: [
            "Operates at Layer 7 on HTTP/HTTPS.",
            "Blocks common attacks: SQL injection, XSS, CSRF, command injection, path traversal.",
            "Negative security model: block known-bad signatures. Positive model: allow only what the application should receive.",
            "Modes: monitoring (detect and log) and blocking (prevent). Start in monitoring to tune false positives.",
            "Can rate-limit and block bots, and provide virtual patching.",
            "Deployed as an appliance, software, or cloud service in front of the application."
          ] },
          { h: "TLS inspection mechanics and cautions", list: [
            "The gateway terminates the user's TLS session, inspects the content, and starts a new TLS session to the real server.",
            "Devices must trust the organization's inspection CA certificate.",
            "Exempt sensitive categories and applications that use certificate pinning.",
            "Protect the inspection device and logs, because decrypted content is sensitive.",
            "Check legal and privacy requirements, and tell users in policy."
          ] },
          { h: "Choosing the right control", list: [
            "Users browsing the Internet: forward proxy or SWG with URL filtering.",
            "Protecting a public web application: WAF (often with a reverse proxy and load balancer).",
            "Filter by address, port, and application at the network edge: firewall or NGFW.",
            "Control cloud service usage: CASB."
          ] }
        ],
        keyTerms: [
          { term: "Forward Proxy", def: "A proxy that handles requests from internal users to the Internet." },
          { term: "Reverse Proxy", def: "A proxy in front of servers that handles requests from the Internet to those servers." },
          { term: "Secure Web Gateway", def: "A forward proxy with security services such as URL filtering, malware scanning, and DLP." },
          { term: "WAF", def: "Web Application Firewall: filters HTTP/HTTPS at Layer 7 to protect web applications." },
          { term: "URL Filtering", def: "Allowing or blocking sites by category, reputation, or list." },
          { term: "TLS Inspection", def: "Decrypting and re-encrypting HTTPS traffic at a gateway to inspect its contents." },
          { term: "Transparent Proxy", def: "A proxy that intercepts traffic without client configuration." },
          { term: "Negative / Positive Security Model", def: "Block known-bad patterns versus allow only known-good ones." },
          { term: "Virtual Patching", def: "Blocking exploitation of a flaw with a WAF or IPS rule until the code can be fixed." }
        ],
        analogy:
          "A forward proxy is a company mailroom that screens and logs all outgoing letters from employees. A reverse proxy is the receptionist at the front desk who takes visitors' requests, never reveals which office the managers sit in, and sends visitors to whichever clerk is free. A WAF is a specialist at the front desk who reads each form handed in and rejects any with suspicious instructions. TLS inspection is the mailroom opening sealed envelopes with the sender's permission, reading them, and resealing them.",
        technical:
          "A company routes all employee web traffic through a cloud secure web gateway that blocks malware and gambling categories, scans downloads, and decrypts TLS for most sites while exempting banking and healthcare portals. Its customer-facing website sits behind a reverse proxy with a WAF. During an attack, the WAF's logs show requests with SQL injection strings against a search form. The WAF blocks them, and a virtual patching rule protects the vulnerable parameter until developers fix the code.",
        table: {
          headers: ["Device", "Protects", "Traffic direction", "Works at"],
          rows: [
            ["Forward proxy / SWG", "Users", "Internal users to Internet", "Application (web)"],
            ["Reverse proxy", "Servers", "Internet to internal servers", "Application (web)"],
            ["WAF", "Web applications", "Inbound requests to a web app", "Layer 7 (HTTP/HTTPS)"],
            ["Network firewall / NGFW", "Networks", "Both directions", "Layers 3 to 7 (addresses, ports, apps)"],
            ["CASB", "Cloud service use", "Users to cloud services", "Application / API"]
          ]
        },
        confusion: [
          { a: "Forward proxy", b: "Reverse proxy", diff: "A forward proxy represents CLIENTS going out. A reverse proxy represents SERVERS taking requests in." },
          { a: "WAF", b: "Network firewall", diff: "A WAF inspects the content of web requests to stop application attacks. A network firewall filters by address, port, and protocol (NGFWs add application awareness)." },
          { a: "SWG", b: "WAF", diff: "An SWG protects USERS browsing out. A WAF protects a WEB APPLICATION from inbound attacks." },
          { a: "Transparent proxy", b: "Explicit proxy", diff: "Transparent intercepts without client setup. Explicit requires clients to be configured to use it." },
          { a: "Negative model", b: "Positive model", diff: "Negative blocks known-bad patterns. Positive permits only known-good requests, which is stricter but harder to maintain." }
        ],
        soc: "Proxy and WAF logs are a rich evidence source: proxy logs show which user visited which site and what was downloaded, and WAF logs show attack attempts against applications. Analysts search for requests to newly registered or uncategorized domains, large uploads, and repeated blocked injection attempts from one source.",
        patterns: [
          ["Filter employees' web browsing by category", "Forward proxy / SWG with URL filtering"],
          ["Hide the real web servers and distribute requests", "Reverse proxy (with load balancing)"],
          ["Block SQL injection and XSS against a web app", "WAF"],
          ["Inspect HTTPS contents at a gateway", "TLS inspection"],
          ["Protect a vulnerable app until developers can fix it", "WAF virtual patching"],
          ["Allow only known-good requests", "Positive security model"],
          ["App stops working after TLS inspection is enabled", "Certificate pinning conflict; exempt the app"],
          ["Control which cloud apps staff may use", "CASB"]
        ],
        takeaways: [
          "Forward proxies protect users; reverse proxies and WAFs protect servers and applications.",
          "A WAF works at Layer 7 against application attacks.",
          "TLS inspection reveals encrypted threats but needs exemptions, trust deployment, and careful handling."
        ],
        remember: [
          "Forward proxy = users out. Reverse proxy = Internet in to servers.",
          "SWG = forward proxy plus URL filtering, malware scanning, DLP, and TLS inspection.",
          "WAF = Layer 7 protection for web apps (SQLi, XSS); supports virtual patching.",
          "Negative model = block known bad; positive model = allow only known good.",
          "TLS inspection needs an internal CA trusted by devices; exempt banking and health sites and pinned apps.",
          "Start a WAF in monitoring mode to tune false positives before blocking.",
          "A firewall filters by address/port/app; it is not a substitute for a WAF."
        ],
        taglish:
          "Ang forward proxy, nasa gitna ng mga empleyado at ng Internet: sinasala nito ang pupuntahan ng users. Ang reverse proxy, nasa harap ng mga server: tinatago nito ang totoong server at kadalasan ay nagba-balance ng load. Ang SWG, forward proxy na marami pang security feature (URL filtering, malware scan, DLP). Ang WAF, binabasa nito ang laman ng HTTP request para harangin ang SQL injection at XSS, at pwede ring mag-virtual patch. Ang TLS inspection, binubuksan ang HTTPS para suriin; kailangan ng trusted na certificate sa mga device at dapat i-exempt ang banking at health sites."
      }
    ]
  },

  tips: {
    "d2-t161": "End of SUPPORT is the dangerous date, because patches stop. When the question says the system cannot be patched or replaced, the best answer combines isolation, restricted access, virtual patching or monitoring, and a documented exception, not simply 'accept the risk' or 'ignore it'.",
    "d3-t162": "Spot the layer: moving traffic efficiently across several links = SD-WAN, networking plus cloud security = SASE, security only = SSE, access to one app after verifying user and device = ZTNA. 'Data never leaves the data center' = VDI.",
    "d3-t163": "Ask which direction and what is protected: users going out = forward proxy or SWG, servers taking requests in = reverse proxy, a web app facing SQL injection or XSS = WAF. A WAF does not replace a firewall, and a firewall does not replace a WAF."
  },

  summaries: {
    "d2-t161": "Once a vendor stops supporting a product, its vulnerabilities are permanent, so legacy systems are isolated, monitored, and virtually patched under a documented exception while replacement is planned.",
    "d3-t162": "SD-WAN routes traffic intelligently across links, SASE adds cloud-delivered security, and ZTNA replaces broad VPN access with per-application access based on user and device verification.",
    "d3-t163": "Forward proxies and secure web gateways control users going out, reverse proxies and WAFs protect servers and web applications, and TLS inspection lets them see inside encrypted traffic."
  },

  questions: [
    {
      id: "q-x-d2-9", domainId: "d2", tag: "d2-t161", type: "single",
      prompt: "A factory must keep running an old control workstation whose operating system is no longer supported, and the equipment vendor will not certify a newer version. Which approach is BEST?",
      choices: [
        { id: "a", text: "Isolate it on a restricted segment, limit access, add monitoring and virtual patching, and document a risk exception" },
        { id: "b", text: "Leave it on the main network because it has always worked" },
        { id: "c", text: "Connect it directly to the Internet for remote support" },
        { id: "d", text: "Remove it from the asset inventory so scans do not report it" }
      ],
      correct: "a",
      explanation: "When replacement is not possible, compensating controls such as segmentation, restricted access, monitoring, and virtual patching, plus a documented exception, reduce the risk.",
      distractorExplanations: {
        b: "Leaving an unsupported system on the main network exposes everything else to its permanent vulnerabilities.",
        c: "Direct Internet exposure greatly increases the chance of exploitation.",
        d: "Hiding a system from inventory removes visibility and does not reduce risk."
      }
    },
    {
      id: "q-x-d2-10", domainId: "d2", tag: "d2-t161", type: "single",
      prompt: "Which statement correctly describes end of support (EOSL) for a software product?",
      choices: [
        { id: "a", text: "The vendor no longer provides security patches or technical support" },
        { id: "b", text: "The vendor stops advertising the product but still patches it" },
        { id: "c", text: "The product's license automatically renews" },
        { id: "d", text: "The software becomes open source" }
      ],
      correct: "a",
      explanation: "End of support means no more security updates or help from the vendor, so new vulnerabilities remain unpatched.",
      distractorExplanations: {
        b: "Stopping sales or promotion describes end of life, which is not the same as the end of patching.",
        c: "Licensing renewal is unrelated to support lifecycle.",
        d: "End of support does not change the software's license model."
      }
    },
    {
      id: "q-x-d3-9", domainId: "d3", tag: "d3-t162", type: "single",
      prompt: "A company wants remote workers to reach only the specific internal applications they are authorized for, after verifying both the user and the health of their device, instead of placing them on the corporate network. Which technology fits BEST?",
      choices: [
        { id: "a", text: "Zero Trust Network Access (ZTNA)" },
        { id: "b", text: "A traditional full-tunnel VPN" },
        { id: "c", text: "A hub-and-spoke WAN" },
        { id: "d", text: "A network hub" }
      ],
      correct: "a",
      explanation: "ZTNA grants access to individual applications after verifying the user and device posture, rather than granting broad network access.",
      distractorExplanations: {
        b: "A traditional VPN typically places the device on the network with broad access.",
        c: "A hub-and-spoke WAN describes site connectivity, not per-application access control.",
        d: "A hub simply repeats traffic to all ports and provides no access control."
      }
    },
    {
      id: "q-x-d3-10", domainId: "d3", tag: "d3-t162", type: "single",
      prompt: "A retailer wants to replace expensive private circuits and let each store choose the best path for each application across broadband and LTE links, managed from a central controller. Which technology should it adopt?",
      choices: [
        { id: "a", text: "SD-WAN" },
        { id: "b", text: "VDI" },
        { id: "c", text: "A jump server" },
        { id: "d", text: "802.1X" }
      ],
      correct: "a",
      explanation: "SD-WAN uses a central controller to steer traffic over multiple links based on application and policy.",
      distractorExplanations: {
        b: "VDI streams virtual desktops from a data center and does not route traffic between sites.",
        c: "A jump server is a controlled gateway for administrators.",
        d: "802.1X is port-based network access control."
      }
    },
    {
      id: "q-x-d3-11", domainId: "d3", tag: "d3-t163", type: "single",
      prompt: "A company wants to protect its public web application from SQL injection and cross-site scripting attacks by inspecting HTTP requests. Which control is MOST appropriate?",
      choices: [
        { id: "a", text: "A web application firewall (WAF)" },
        { id: "b", text: "A forward proxy for employee browsing" },
        { id: "c", text: "A network switch with port security" },
        { id: "d", text: "A DHCP server" }
      ],
      correct: "a",
      explanation: "A WAF inspects HTTP/HTTPS requests at Layer 7 and blocks application attacks such as SQL injection and XSS.",
      distractorExplanations: {
        b: "A forward proxy controls outbound user traffic and does not protect an inbound web application.",
        c: "Port security limits devices on switch ports, not web application attacks.",
        d: "A DHCP server assigns addresses and provides no web attack filtering."
      }
    },
    {
      id: "q-x-d3-12", domainId: "d3", tag: "d3-t163", type: "single",
      prompt: "Which device sits in front of internal web servers, hides their real addresses, and distributes incoming requests among them?",
      choices: [
        { id: "a", text: "A reverse proxy" },
        { id: "b", text: "A forward proxy" },
        { id: "c", text: "A secure web gateway" },
        { id: "d", text: "A DNS sinkhole" }
      ],
      correct: "a",
      explanation: "A reverse proxy represents servers to Internet clients, hiding backend addresses and often providing load balancing and TLS termination.",
      distractorExplanations: {
        b: "A forward proxy represents internal clients going out to the Internet.",
        c: "A secure web gateway controls users' outbound web access.",
        d: "A DNS sinkhole redirects lookups for malicious domains and does not front web servers."
      }
    }
  ],

  glossary: [
    { term: "End of Support", domain: "d2", plain: "The date the vendor stops fixing security problems.", technical: "The point at which a vendor ceases to provide security patches and technical support for a product.", example: "An operating system that no longer receives updates." },
    { term: "Legacy System", domain: "d2", plain: "An old system that is still in use.", technical: "Older technology that remains in operation, often supporting a critical function, and may lack current security features or support.", example: "A decades-old control workstation." },
    { term: "SD-WAN", domain: "d3", plain: "Smart, centrally managed routing between sites.", technical: "Software-defined WAN: an overlay that centrally manages and steers traffic across multiple links based on application policy.", example: "Using broadband for web traffic and LTE as backup." },
    { term: "SASE", domain: "d3", plain: "Networking and cloud security delivered together.", technical: "Secure Access Service Edge: converges SD-WAN with cloud-delivered security such as SWG, CASB, FWaaS, and ZTNA.", example: "A branch sending traffic through a cloud security edge." },
    { term: "ZTNA", domain: "d3", plain: "Access to one app at a time after checking user and device.", technical: "Zero Trust Network Access: grants per-application access after verifying identity and device posture.", example: "A contractor reaching only the project tracker." },
    { term: "Reverse Proxy", domain: "d3", plain: "A front desk for your servers.", technical: "A proxy that receives Internet requests on behalf of backend servers, hiding them and often providing load balancing and TLS termination.", example: "A proxy in front of three web servers." },
    { term: "Web Application Firewall", domain: "d3", plain: "A filter that reads web requests and blocks attacks.", technical: "A Layer 7 control that inspects HTTP/HTTPS requests to block application attacks such as SQL injection and XSS.", example: "Blocking a malicious search query." },
    { term: "TLS Inspection", domain: "d3", plain: "Opening encrypted web traffic to check it for threats.", technical: "Decrypting and re-encrypting TLS traffic at a gateway, using an internal CA trusted by clients, to inspect its contents.", example: "A proxy scanning a download inside HTTPS." }
  ],

  acronyms: [
    { acro: "SD-WAN", expansion: "Software-Defined Wide Area Network", meaning: "A centrally managed overlay that steers WAN traffic across multiple links." },
    { acro: "SASE", expansion: "Secure Access Service Edge", meaning: "Networking plus cloud-delivered security services." },
    { acro: "SSE", expansion: "Security Service Edge", meaning: "The cloud-delivered security portion of SASE." },
    { acro: "ZTNA", expansion: "Zero Trust Network Access", meaning: "Per-application access after verifying user and device." },
    { acro: "SWG", expansion: "Secure Web Gateway", meaning: "A forward proxy with web security features." },
    { acro: "FWaaS", expansion: "Firewall as a Service", meaning: "Firewall functions delivered from the cloud." },
    { acro: "VDI", expansion: "Virtual Desktop Infrastructure", meaning: "Desktops hosted in the data center and streamed to users." },
    { acro: "WAF", expansion: "Web Application Firewall", meaning: "A control that filters HTTP/HTTPS traffic to protect web applications." },
    { acro: "EOL", expansion: "End of Life", meaning: "The vendor stops selling or promoting a product." },
    { acro: "EOSL", expansion: "End of Service Life", meaning: "The vendor stops providing patches and support." }
  ]
});
