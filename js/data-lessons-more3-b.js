/* More lessons, round 3, part B. Ids use the t17x range. Registers a bundle
   on globalThis.__DEEP; data-lessons-merge.js merges it.
   All addresses and names in examples are fictional (documentation ranges). */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d4: [
      {
        id: "d4-t172",
        title: "API Security: Authentication, Object-Level Authorization, Rate Limiting, and Gateways",
        tag: "4.1",
        minutes: 20,
        goal: "Identify the most common API weaknesses and apply the controls that address them: strong authentication, per-object authorization, input and schema validation, rate limiting, and an inventory of every API.",
        why: "APIs now carry most application traffic, including mobile apps and cloud integrations, and attackers target them directly. The exam's application-security and automation topics assume you can reason about how an API is protected.",
        simple:
          "An API (application programming interface) lets one piece of software request data or actions from another, usually over HTTPS. Common styles include REST (resources addressed by URLs and manipulated with methods such as GET, POST, PUT, and DELETE), SOAP (XML messages), and GraphQL (a flexible query language). Because APIs expose application logic and data directly, without a human-friendly page in front, their weaknesses are often about WHO may do WHAT to WHICH object. AUTHENTICATION proves the caller's identity. API keys are simple identifiers for an application and are weak on their own (they are easily leaked in code and cannot prove who the user is); stronger options are OAuth 2.0 access tokens, signed tokens such as JWTs (which must be validated for signature, expiry, and audience), and mutual TLS between services. AUTHORIZATION must then be enforced on EVERY request. The most common and serious flaw is broken OBJECT-LEVEL authorization (also known as an insecure direct object reference): an API accepts /orders/1001 from a logged-in user and returns the order without checking that it belongs to that user, so changing the number reveals other customers' data. Related flaws are broken function-level authorization (a normal user can call an administrative endpoint), EXCESSIVE DATA EXPOSURE (the API returns whole database records and relies on the app to hide fields), and MASS ASSIGNMENT (the API blindly accepts extra fields such as 'isAdmin: true' in a request). Protect the API from abuse with RATE LIMITING, throttling, and quotas, which slow brute force, credential stuffing, scraping, and denial of service. Validate everything that arrives: check types, lengths, and formats against a schema, reject unexpected fields, and use parameterized queries to prevent injection. Use HTTPS only, return generic error messages, and log requests for investigation. Operationally, many breaches come from APIs nobody knew existed, so keep an INVENTORY, retire old versions (zombie APIs) and test or undocumented endpoints (shadow APIs), and put APIs behind an API GATEWAY that centralizes authentication, rate limiting, logging, and policy, often together with a web application firewall or dedicated API protection. Browsers add their own rule, the same-origin policy, and CORS (cross-origin resource sharing) is the mechanism that lets a server permit specific other origins; it should be configured to allow only trusted origins and is not a substitute for authentication. Finally, keep secrets such as keys and tokens out of code and rotate them when exposed.",
        deepDive: [
          { h: "Common API weaknesses", list: [
            "Broken object-level authorization (BOLA / IDOR): changing an ID reveals someone else's data. This is consistently the top API risk.",
            "Broken authentication: weak or missing token validation, long-lived tokens, keys in client code.",
            "Broken function-level authorization: regular users reach admin functions.",
            "Excessive data exposure: returning more fields than the client needs.",
            "Mass assignment: accepting unexpected fields that change protected attributes.",
            "Lack of rate limiting: allows brute force, scraping, and resource exhaustion.",
            "Security misconfiguration: verbose errors, open CORS, debug endpoints, unnecessary methods.",
            "Improper inventory: forgotten old versions and undocumented endpoints."
          ] },
          { h: "Authentication options compared", list: [
            "API key: identifies an application; weak; treat as a secret; easy to leak and hard to attribute to a person.",
            "OAuth 2.0 access token: scoped, expiring, tied to a user or client; the standard for delegated access.",
            "JWT: a signed token; validate signature, issuer, audience, and expiry; keep lifetimes short.",
            "Mutual TLS: both client and server present certificates; strong for service-to-service calls.",
            "Basic authentication over HTTPS: sends credentials on every call; avoid for sensitive APIs."
          ] },
          { h: "Worked example: object-level authorization", p: "A mobile app calls GET /api/invoices/5043 and receives the invoice. An attacker logged in as a different user changes the number to 5044 and receives another customer's invoice. The server verified that the token was valid but never checked that invoice 5044 belongs to the caller. The fix is to enforce, on the server for every request, that the authenticated user is allowed to access that specific object, rather than relying on hard-to-guess IDs or on the client to hide data." },
          { h: "Rate limiting and abuse controls", list: [
            "Limit requests per user, key, or address over a time window; return HTTP 429 when exceeded.",
            "Apply tighter limits to sensitive endpoints such as login and password reset.",
            "Use quotas and spike arrest to protect backend capacity.",
            "Combine with bot detection and monitoring for unusual access patterns."
          ] },
          { h: "API gateway roles", list: [
            "Central point for authentication, authorization checks, and token validation.",
            "Rate limiting, throttling, and quotas.",
            "Request and schema validation.",
            "Logging, monitoring, and analytics.",
            "TLS termination and routing; works alongside a WAF."
          ] },
          { h: "CORS in one paragraph", p: "Browsers block web pages from reading responses from a different origin unless the server explicitly allows it with CORS headers. Allowing every origin with a wildcard, especially together with credentials, can expose users' data to malicious sites. CORS controls what browsers permit; it does not authenticate callers, and non-browser clients ignore it completely." }
        ],
        keyTerms: [
          { term: "API", def: "Application Programming Interface: a way for software to request data or actions from other software." },
          { term: "BOLA / IDOR", def: "Broken Object Level Authorization (insecure direct object reference): accessing another user's object by changing an identifier." },
          { term: "Excessive Data Exposure", def: "An API returning more data than the client needs, relying on the client to hide it." },
          { term: "Mass Assignment", def: "An API accepting extra fields that change attributes the caller should not control." },
          { term: "Rate Limiting", def: "Restricting how many requests a client may make in a time period." },
          { term: "API Gateway", def: "A front door for APIs that centralizes authentication, rate limiting, logging, and policy." },
          { term: "JWT", def: "JSON Web Token: a compact signed token carrying claims." },
          { term: "CORS", def: "Cross-Origin Resource Sharing: browser mechanism for allowing specific other origins to access a resource." },
          { term: "Shadow / Zombie API", def: "An undocumented API (shadow) or an old unsupported version still running (zombie)." },
          { term: "Schema Validation", def: "Checking requests against a defined structure, types, and allowed fields." }
        ],
        analogy:
          "An API is a restaurant's order window. Authentication is showing your table number; object-level authorization is the cook checking that the plate you ask for actually belongs to your table, not anyone who knows another table's number. Rate limiting is the rule that one customer cannot place a thousand orders a minute. The API gateway is the maître d' who checks every guest, limits the crowd, and writes everything in the log.",
        technical:
          "A security review of a mobile banking API finds three issues: statement requests accept any account number once the user is logged in (broken object-level authorization), the login endpoint has no rate limit so credential stuffing is possible, and an old v1 version of the API with weaker checks is still reachable. The fixes are a server-side ownership check on every request, rate limiting and lockout on login, retirement of v1, placing all endpoints behind an API gateway with schema validation and logging, and rotating a key that had been committed to a code repository.",
        table: {
          headers: ["Weakness", "Example", "Control"],
          rows: [
            ["Broken object-level authorization", "Changing /orders/1001 to /orders/1002 shows another user's order", "Server-side ownership check on every request"],
            ["Broken function-level authorization", "User calls /admin/deleteUser", "Role checks on every function"],
            ["Excessive data exposure", "Response includes password hash and internal flags", "Return only needed fields"],
            ["Mass assignment", "Request includes isAdmin=true and is accepted", "Allowlist accepted fields"],
            ["No rate limiting", "Millions of login attempts", "Rate limits, lockout, bot detection"],
            ["Improper inventory", "Old v1 API still reachable", "API inventory and retirement of old versions"],
            ["Leaked API key", "Key committed to a public repository", "Secrets manager, rotation, scanning"]
          ]
        },
        confusion: [
          { a: "Authentication", b: "Authorization", diff: "Authentication proves who is calling. Authorization decides whether that caller may access a specific object or function. APIs most often fail at authorization." },
          { a: "API key", b: "OAuth token", diff: "An API key identifies an application and is easily leaked. An OAuth token is scoped, expires, and is tied to a user or client." },
          { a: "BOLA", b: "Broken function-level authorization", diff: "BOLA concerns access to individual objects (records). Function-level concerns access to whole operations such as admin endpoints." },
          { a: "CORS", b: "Authentication", diff: "CORS tells browsers which other origins may read responses. It does not verify who the caller is." },
          { a: "API gateway", b: "WAF", diff: "A gateway manages access, limits, and routing for APIs. A WAF inspects requests for attack patterns. They are often used together." }
        ],
        soc: "API abuse shows up as one token or key requesting thousands of different object IDs in sequence, large volumes of 401, 403, and 404 responses, a burst of requests from a single address to a login endpoint, or calls to endpoints that no client should use. Analysts need gateway and application logs with the user identity attached to each call to tell abuse from normal use.",
        patterns: [
          ["Changing an ID in the URL shows another user's record", "BOLA / IDOR (broken object-level authorization)"],
          ["Regular user successfully calls an admin endpoint", "Broken function-level authorization"],
          ["API returns entire database rows and the app hides some fields", "Excessive data exposure"],
          ["Request adds 'role=admin' and the server accepts it", "Mass assignment"],
          ["Thousands of login attempts against the API", "Missing rate limiting; credential stuffing"],
          ["Old version of the API still running", "Zombie API; improper inventory"],
          ["Centralize authentication, throttling, and logging for APIs", "API gateway"],
          ["Browser setting that allows other websites to read API responses", "CORS (configure to trusted origins only)"]
        ],
        takeaways: [
          "Authorize every request for the specific object and function, not just authenticate the caller.",
          "Rate limit, validate, and log; return only the data needed.",
          "Inventory and retire APIs, and protect keys and tokens."
        ],
        remember: [
          "Broken object-level authorization (BOLA/IDOR) is the top API risk: check object ownership on the server for every request.",
          "API keys identify apps and leak easily; prefer OAuth tokens, validated JWTs, or mutual TLS.",
          "Return only needed fields (avoid excessive data exposure); allowlist input fields (avoid mass assignment).",
          "Rate limiting and quotas stop brute force, scraping, and resource exhaustion (HTTP 429).",
          "Keep an API inventory; retire old versions (zombie) and undocumented endpoints (shadow).",
          "An API gateway centralizes authentication, throttling, validation, and logging; pair it with a WAF.",
          "CORS controls browser cross-origin access; it is not authentication."
        ],
        taglish:
          "Ang API ay paraan para magkausap ang mga software. Ang pinakamadalas na butas, authorization: halimbawa, binago mo ang numero sa /orders/1001 at nakita mo ang order ng ibang tao (BOLA o IDOR). Dapat tiyakin ng server sa bawat request kung pag-aari mo ba talaga ang object na hinihingi. Iwasan din ang excessive data exposure (huwag ibalik ang lahat ng field) at mass assignment (huwag tanggapin ang sobrang field tulad ng isAdmin). Maglagay ng rate limiting para mapigilan ang brute force. Magkaroon ng listahan ng lahat ng API, at patayin ang luma. At ang API gateway ang nagsasentro ng authentication, limit, at logging."
      },
      {
        id: "d4-t173",
        title: "Reading Command-Line Tool Output: ping, tracert, nslookup, ipconfig, netstat, arp, and nmap",
        tag: "4.9",
        minutes: 24,
        goal: "Interpret the output of common network and security command-line tools, and use it to diagnose connectivity problems and spot suspicious activity.",
        why: "Performance-based questions often show a snippet of command output and ask what it means. Each tool has a few output patterns that answer most questions.",
        simple:
          "A small set of command-line tools answers most diagnostic questions, and knowing what each tells you is more important than memorizing every switch. PING sends ICMP echo requests to test reachability and measure round-trip time; the output shows replies with a time and a TTL (time to live), plus a summary of packets lost. 'Request timed out' means no reply (the host is down or a firewall blocks ICMP), 'Destination host unreachable' usually comes from a router that has no route, and 'TTL expired in transit' suggests a routing loop. TRACERT (Windows) or TRACEROUTE (Linux) lists each router hop between you and a destination with three timing results per hop; a line of asterisks means that hop did not reply (often filtered, not necessarily broken), and a sudden jump in delay shows where a slow link lies. NSLOOKUP and DIG query DNS. The output names the DNS server used, and 'Non-authoritative answer' means the reply came from a cache rather than the zone's own server. Record types matter: A (IPv4 address), AAAA (IPv6), MX (mail servers), NS (name servers), TXT (text, used for SPF and DMARC), CNAME (alias), PTR (reverse lookup). IPCONFIG (Windows) or IFCONFIG and IP (Linux) shows the host's IP address, subnet mask, default gateway, DNS servers, and MAC address ('Physical Address'); an address beginning 169.254 is an APIPA self-assigned address, which means the host failed to get one from DHCP. ipconfig /release and /renew refresh a DHCP lease, and /flushdns clears the DNS cache. NETSTAT lists network connections and listening ports; the common form netstat -ano shows all connections numerically with the owning process ID. States include LISTENING (waiting for connections), ESTABLISHED (active), TIME_WAIT (recently closed), and SYN_SENT or SYN_RECEIVED (handshake in progress; many SYN_RECEIVED can indicate a SYN flood). Suspicious signs are an unexpected listener on an unusual port, or an ESTABLISHED connection from a workstation to a rare external address on a strange port. On Linux, ss -tulpn is the modern equivalent. ARP -a shows the ARP cache (IP to MAC mappings); two different IP addresses mapped to the same MAC, or the gateway's MAC suddenly changing, is evidence of ARP spoofing. NMAP scans hosts and reports ports as open, closed, or filtered (a firewall dropped the probe); common options are -sS (SYN scan), -sV (service versions), -O (OS detection), -p (ports), and -Pn (skip host discovery). Packet analyzers complete the set: tcpdump (command line) and Wireshark (graphical) capture traffic, and display filters such as ip.addr == 10.0.0.5 or tcp.port == 443 narrow what you see. CURL fetches web content and, with -I, shows response headers, and netcat can test ports or grab banners.",
        deepDive: [
          { h: "ping output", p: "Example: Reply from 203.0.113.20: bytes=32 time=18ms TTL=117. The time is round-trip latency. TTL starts at a value set by the sender's operating system (commonly 64, 128, or 255) and drops by one at each router, so a TTL of 117 suggests a start of 128 and about 11 hops. At the end: Packets: Sent = 4, Received = 4, Lost = 0 (0 percent loss) is healthy; high loss or large time swings suggest congestion or a faulty link. A blocked ICMP policy can make a healthy host look down." },
          { h: "tracert output", p: "Example lines: 1  1 ms  1 ms  1 ms  192.168.1.1; 2  9 ms  8 ms  9 ms  10.20.0.1; 3  *  *  *  Request timed out; 4  35 ms  36 ms  35 ms  203.0.113.1. Hop 3 did not answer but later hops did, so traffic still flows and that router simply does not send replies. If every hop after a point shows asterisks, the path is blocked or broken there." },
          { h: "nslookup output", p: "Example: Server: dns1.example.net, Address: 10.0.0.53. Non-authoritative answer: Name: www.example.org, Address: 198.51.100.44. The non-authoritative label means the answer came from the resolver's cache. nslookup -type=mx example.org lists mail servers, and -type=txt shows SPF, DKIM, and DMARC text records. A wrong or unexpected answer can indicate DNS poisoning or a misconfigured record." },
          { h: "ipconfig /all fields", list: [
            "IPv4 Address and Subnet Mask: the host's address and network size.",
            "Default Gateway: the router for off-network traffic; blank means no outside access.",
            "DHCP Server and lease times: where the address came from.",
            "DNS Servers: which resolvers the host uses (a malicious resolver is a red flag).",
            "Physical Address: the MAC address.",
            "169.254.x.x: automatic private addressing; DHCP failed."
          ] },
          { h: "netstat -ano examples", list: [
            "TCP 0.0.0.0:443 LISTENING PID 4: a service is waiting on port 443.",
            "TCP 10.0.4.22:51822 203.0.113.99:4444 ESTABLISHED PID 3180: a workstation talking to an external host on port 4444; investigate process 3180 (a common default port for remote access tools).",
            "Many SYN_RECEIVED entries from many addresses: possible SYN flood.",
            "Use the PID with tasklist (Windows) to identify the program, or netstat -b to show the executable."
          ] },
          { h: "arp -a clues", list: [
            "Normal: each IP maps to one MAC address.",
            "Suspicious: several IP addresses sharing one MAC, or the default gateway's MAC changing without a hardware change, indicates ARP spoofing.",
            "Static ARP entries and Dynamic ARP Inspection are mitigations."
          ] },
          { h: "nmap results", list: [
            "open: a service is listening and accepting connections.",
            "closed: reachable, but nothing is listening.",
            "filtered: a firewall or filter is blocking probes, so the state is unknown.",
            "-sS stealth SYN scan, -sV version detection, -O OS fingerprinting, -p 1-1024 port range, -Pn treat host as up."
          ] },
          { h: "Capture filters and display filters", list: [
            "tcpdump -i eth0 -nn port 80: capture HTTP traffic without name resolution.",
            "Wireshark display filters: ip.addr == 10.0.0.5, tcp.port == 443, dns, http, tcp.flags.syn == 1.",
            "Packet captures contain content; protect them and limit who can access them."
          ] }
        ],
        keyTerms: [
          { term: "ICMP", def: "Internet Control Message Protocol: used by ping and traceroute for diagnostics." },
          { term: "TTL", def: "Time To Live: a counter reduced at each router that limits a packet's life." },
          { term: "APIPA", def: "Automatic Private IP Addressing: a 169.254.x.x address a host assigns itself when DHCP fails." },
          { term: "Non-Authoritative Answer", def: "A DNS reply served from a cache rather than the zone's authoritative server." },
          { term: "DNS Record Types", def: "A, AAAA, MX, NS, TXT, CNAME, and PTR records provide different kinds of DNS information." },
          { term: "LISTENING / ESTABLISHED", def: "netstat states for a port waiting for connections and an active connection." },
          { term: "ARP Cache", def: "A table of IP-to-MAC address mappings learned on the local network." },
          { term: "Open / Closed / Filtered", def: "nmap port states: accepting connections, reachable but unused, and blocked or unknown." },
          { term: "PID", def: "Process ID: a number identifying a running program, shown by netstat -o." },
          { term: "Display Filter", def: "A Wireshark expression that limits which captured packets are shown." }
        ],
        analogy:
          "These tools are a mechanic's gauges. Ping is tapping the pipe to see whether anyone answers. Tracert is following the pipe segment by segment to see where it slows. Nslookup is asking directory assistance for a number. Ipconfig is reading your own address label. Netstat is listing every phone call currently in progress, and arp is checking the building's name-to-room list for duplicates. Nmap is knocking on every door of a building to see which are open, locked, or guarded.",
        technical:
          "A user cannot reach the Internet. Ipconfig /all shows an IPv4 address of 169.254.17.8 and no default gateway, so the host never obtained a DHCP lease (APIPA); the cause is a disconnected cable. In a second case, a security analyst runs netstat -ano on a workstation and finds an ESTABLISHED connection to 203.0.113.99 on port 4444 owned by process 3180; tasklist maps it to an unfamiliar program from a temporary folder, and the host is isolated. In a third case, arp -a on a user's PC shows the gateway 10.0.4.1 and a second host 10.0.4.77 sharing the same MAC address, which points to ARP spoofing by the second host.",
        table: {
          headers: ["Tool", "Answers", "Look for"],
          rows: [
            ["ping", "Is the host reachable, and how fast?", "Replies, time, TTL, packet loss"],
            ["tracert / traceroute", "Where does the path slow or stop?", "Hop-by-hop delays, asterisks, last responding hop"],
            ["nslookup / dig", "What does DNS return?", "Record type, authoritative or cached, unexpected addresses"],
            ["ipconfig / ifconfig / ip", "What is this host's network configuration?", "169.254.x.x, missing gateway, wrong DNS"],
            ["netstat / ss", "What is connected or listening?", "Odd listeners, unknown external connections, SYN_RECEIVED floods"],
            ["arp -a", "Which MAC belongs to which IP?", "Duplicate MACs, changed gateway MAC"],
            ["nmap", "Which ports and services are exposed?", "open, closed, filtered; service versions"],
            ["tcpdump / Wireshark", "What is actually on the wire?", "Protocols, conversations, payloads, handshakes"]
          ]
        },
        confusion: [
          { a: "Request timed out", b: "Destination host unreachable", diff: "Timed out means no reply came back (host down or ICMP blocked). Unreachable means a router reported that it has no route to the destination." },
          { a: "Open port", b: "Filtered port", diff: "Open means a service answered. Filtered means a firewall blocked or dropped the probe, so nmap cannot tell." },
          { a: "LISTENING", b: "ESTABLISHED", diff: "LISTENING means a service is waiting for connections. ESTABLISHED means a connection is active right now." },
          { a: "Authoritative", b: "Non-authoritative", diff: "Authoritative answers come from the zone's own DNS server. Non-authoritative answers come from a cache." },
          { a: "tracert", b: "ping", diff: "Ping tests the destination only. Tracert shows each router along the path." }
        ],
        soc: "Responders use these tools constantly: netstat and ss to find suspicious connections on a host, nslookup or dig to check what a domain resolves to, arp to confirm spoofing, and nmap from an authorized scanner to verify what a system exposes. Output should be captured with timestamps in the incident record, because the state changes quickly.",
        patterns: [
          ["Address starts with 169.254", "APIPA; the host failed to get a DHCP lease"],
          ["Traceroute shows asterisks for one hop but later hops respond", "That router does not reply to probes; the path still works"],
          ["Two IP addresses share the same MAC in the ARP cache", "Possible ARP spoofing"],
          ["Many SYN_RECEIVED connections from many sources", "Possible SYN flood"],
          ["Workstation connected to an unknown external IP on port 4444", "Suspicious outbound connection; investigate the PID"],
          ["Port shown as filtered by nmap", "A firewall is blocking the probes"],
          ["Non-authoritative answer", "The DNS reply came from a cache"],
          ["TXT record query for a domain", "Used to view SPF, DKIM, and DMARC policies"]
        ],
        takeaways: [
          "Know what question each tool answers and the one or two output patterns that matter.",
          "169.254.x.x, duplicate MACs, unexpected listeners, and filtered ports are the classic clues.",
          "Capture command output with timestamps during an investigation."
        ],
        remember: [
          "ping = reachability and latency; tracert = path and slow hop; nslookup/dig = DNS; ipconfig = host configuration; netstat = connections and listeners; arp -a = IP-to-MAC; nmap = port scan.",
          "169.254.x.x means APIPA (DHCP failed).",
          "Asterisks in tracert mean no reply from that hop, not necessarily a failure.",
          "netstat -ano shows the owning PID; ESTABLISHED to a rare IP on a strange port is suspicious.",
          "arp -a: duplicate MACs or a changed gateway MAC suggest ARP spoofing.",
          "nmap states: open, closed, filtered. Options: -sS, -sV, -O, -p, -Pn.",
          "DNS record types: A, AAAA, MX, NS, TXT, CNAME, PTR. Non-authoritative = cached answer."
        ],
        taglish:
          "Ito ang mga gamit sa pag-diagnose. Ping, para malaman kung may sumasagot at gaano kabilis. Tracert, nakikita ang bawat hop sa daan (ang asterisk ay walang sagot mula sa hop na iyon, hindi laging sira). Nslookup, para sa DNS records (A, MX, TXT, atbp.). Ipconfig, para makita ang IP, gateway, at DNS; kapag 169.254.x.x, pumalpak ang DHCP. Netstat -ano, mga koneksyon at listening port; kahina-hinala ang koneksyon papunta sa kakaibang IP sa kakaibang port. Arp -a, kapag dalawang IP ang pareho ng MAC, posibleng ARP spoofing. Nmap, nagsasabi kung open, closed, o filtered ang port."
      },
      {
        id: "d4-t174",
        title: "Incident Playbooks by Scenario: Ransomware, Account Compromise, Data Breach, DDoS, and Insider",
        tag: "4.8",
        minutes: 24,
        goal: "Apply the incident response phases to specific scenarios, and make the key decisions on containment, evidence, communication, and recovery for each.",
        why: "The exam rarely asks you to recite phases; it asks what to do FIRST or NEXT in a particular situation. Scenario playbooks build that judgment, because the right first step differs between ransomware, a compromised account, and an insider.",
        simple:
          "An incident response plan is the organization's overall approach, and a PLAYBOOK adapts it to one kind of incident with specific steps and decisions. All playbooks follow the same lifecycle (preparation, detection, analysis, containment, eradication, recovery, lessons learned), but the emphasis changes. A few principles apply everywhere. First, classify SEVERITY quickly using impact and scope, because that decides who is involved. Second, CONTAIN to stop the damage from spreading while PRESERVING EVIDENCE: take notes and timestamps, capture volatile data such as memory when practical, and avoid actions that destroy evidence, such as wiping a machine before imaging it. Third, assemble the right people: an incident lead, technical responders, legal counsel, communications, human resources (for people issues), and executives who can make business decisions. Fourth, communicate through approved channels, ideally out of band if email may be compromised, and share on a need-to-know basis. The scenarios differ as follows. RANSOMWARE: isolate affected hosts from the network quickly (EDR isolation or disconnecting) to stop encryption spreading, identify patient zero and the variant, disable compromised accounts, protect and verify offline backups, and avoid rebuilding before evidence is collected; assume data may have been stolen as well (double extortion) and involve legal early; paying is generally discouraged because it funds crime and does not guarantee recovery, and legal checks such as sanctions rules apply; recover from clean backups in the priority set by the business impact analysis, rebuild rather than trust cleaned machines, and reset credentials broadly. COMPROMISED ACCOUNT or BUSINESS EMAIL COMPROMISE: reset the password and revoke all active sessions and tokens, remove malicious inbox rules and OAuth app consents, review sign-in logs and what the account accessed, check for lateral phishing sent from it, enforce MFA, and alert the bank if money moved. DATA BREACH: determine what data and whose data was exposed, stop the exfiltration path, preserve evidence, and work with legal to meet notification deadlines (for example GDPR's 72 hours for notifying the authority). DDoS: confirm it is an attack rather than a legitimate surge, engage the ISP or a scrubbing service, apply rate limiting and filtering, scale capacity, and communicate status. INSIDER THREAT: involve HR and legal from the start, preserve evidence quietly, avoid tipping off the person, decide carefully when to remove access, and follow policy and law. MALWARE OUTBREAK: isolate segments, block indicators, patch the exploited flaw, and sweep for the same indicators across the fleet. LOST OR STOLEN DEVICE: remote wipe if possible, revoke certificates and tokens, and verify whether the device was encrypted. WEB APPLICATION COMPROMISE: preserve logs and a copy of the system, take the application offline if needed, patch the flaw, rotate secrets, and look for backdoors.",
        deepDive: [
          { h: "Decision points common to every incident", list: [
            "Isolate, or monitor to learn more? Isolation stops harm; covert monitoring gathers intelligence but risks continued damage. Default to containment unless there is a deliberate reason.",
            "Power off or leave running? Powering off destroys memory evidence; disconnecting from the network is usually preferred, unless shutting down is needed to stop imminent destruction.",
            "Who must be told, and when? Legal, executives, regulators, customers, insurers, and law enforcement have different triggers and deadlines.",
            "When is it safe to restore? Only after the entry point is closed and credentials are reset; otherwise the attacker returns."
          ] },
          { h: "Ransomware playbook in order", list: [
            "Detect: mass file renames, ransom notes, EDR alerts, backup deletion attempts.",
            "Contain: isolate hosts and network segments, disable affected accounts, block known command-and-control addresses.",
            "Analyze: find patient zero, the initial access method, the variant, and whether data was stolen.",
            "Protect backups: verify offline or immutable copies are intact and not connected.",
            "Eradicate: remove persistence and the entry vector; rebuild systems from known-good images.",
            "Recover: restore in business-priority order; reset all potentially exposed credentials (including service accounts and, for a domain compromise, the Kerberos krbtgt account).",
            "Communicate and decide: legal, insurer, law enforcement, and whether and how to notify; evaluate payment only with legal and executive input.",
            "Lessons learned: close the initial access path and improve backups and detection."
          ] },
          { h: "Compromised account checklist", list: [
            "Reset the password and revoke sessions, refresh tokens, and app passwords.",
            "Remove attacker-created inbox rules, forwarding addresses, and OAuth app consents.",
            "Remove rogue MFA devices and enroll MFA properly.",
            "Review sign-in and audit logs for what was accessed and from where.",
            "Look for further phishing sent internally or to partners.",
            "Notify affected parties and the bank if payments were involved."
          ] },
          { h: "Data breach essentials", list: [
            "Scope: what data, how many people, which regulations apply.",
            "Contain: close the exfiltration path and secure the data.",
            "Preserve evidence and keep an accurate timeline.",
            "Legal-led notification to regulators and individuals within required time limits.",
            "Offer remediation such as credit monitoring where appropriate."
          ] },
          { h: "DDoS essentials", list: [
            "Confirm the pattern and rule out a legitimate traffic surge.",
            "Activate the DDoS protection or CDN service and contact the ISP.",
            "Rate limit, filter, and scale; protect critical services first.",
            "Communicate status to users and leadership; document for after-action review."
          ] },
          { h: "Insider incident essentials", list: [
            "Involve HR and legal before taking any action against an employee.",
            "Preserve evidence discreetly using logs, DLP, and endpoint data.",
            "Limit the circle of people who know to avoid tipping off.",
            "Time the access removal to prevent sabotage or data theft, and follow policy and law."
          ] },
          { h: "Severity classification", p: "A simple severity scale (for example low, medium, high, critical) based on business impact, data sensitivity, number of systems, and whether the attack is ongoing helps decide staffing and escalation. Define it in advance so it is applied consistently in a crisis." }
        ],
        keyTerms: [
          { term: "Playbook", def: "A scenario-specific set of steps and decisions for responding to a type of incident." },
          { term: "Containment", def: "Actions that stop an incident from spreading or causing more damage." },
          { term: "Eradication", def: "Removing the cause of an incident, including malware, persistence, and vulnerabilities." },
          { term: "Patient Zero", def: "The first system or account compromised in an incident." },
          { term: "Double Extortion", def: "Ransomware that both encrypts data and threatens to publish stolen data." },
          { term: "Out-of-Band Communication", def: "Using a channel separate from the possibly compromised one to coordinate response." },
          { term: "Volatile Evidence", def: "Data such as memory contents that is lost when a system loses power." },
          { term: "Severity Classification", def: "A defined scale used to rate an incident's impact and decide the response level." },
          { term: "Legal Hold", def: "A requirement to preserve potentially relevant information." },
          { term: "Notification Deadline", def: "A legally required time limit for informing regulators or individuals of a breach." }
        ],
        analogy:
          "A general emergency plan says 'call the fire department'. Playbooks are the specific procedures for a kitchen fire, a chemical spill, and a power outage: the same overall approach but very different first moves. Water on a grease fire is a disaster; unplugging the toaster is not. In incident response, isolating a host is right for ransomware, but for an insider you may first need to quietly gather evidence and involve HR.",
        technical:
          "At 6 a.m. the SOC sees EDR alerts for mass file renaming on a file server. The ransomware playbook is invoked: the incident lead declares a critical incident, the server and two infected workstations are isolated, backups are verified as offline and intact, and a memory capture is taken from the server before it is rebuilt. Analysis finds patient zero was a laptop that opened a phishing attachment nine days earlier, and that data was copied out beforehand, so legal begins breach assessment while executives decide on communications. Systems are restored in the order set by the business impact analysis, credentials are reset, the phishing vector is closed, and the lessons-learned review adds email attachment sandboxing.",
        table: {
          headers: ["Scenario", "Key first moves", "Special considerations"],
          rows: [
            ["Ransomware", "Isolate hosts, protect and verify backups, disable accounts", "Assume data theft; legal and law enforcement; rebuild instead of trusting cleanup"],
            ["Compromised account / BEC", "Reset password, revoke sessions and tokens, remove inbox rules and app consents", "Check for lateral phishing; bank recall if money moved"],
            ["Data breach", "Close the exfiltration path, scope the data", "Notification deadlines (for example 72 hours under GDPR)"],
            ["DDoS", "Confirm, engage ISP or scrubbing, rate limit", "Distinguish from a legitimate surge"],
            ["Insider threat", "Involve HR and legal, preserve evidence quietly", "Avoid tipping off; time access removal"],
            ["Malware outbreak", "Isolate segments, block indicators, patch", "Sweep the fleet for the same indicators"],
            ["Lost or stolen device", "Remote wipe, revoke certificates and tokens", "Was the device encrypted?"],
            ["Web app compromise", "Preserve logs, take the app offline if needed, patch", "Rotate secrets; hunt for backdoors"]
          ]
        },
        confusion: [
          { a: "Incident response plan", b: "Playbook", diff: "The plan is the overall policy and structure. A playbook is the scenario-specific procedure for one kind of incident." },
          { a: "Containment", b: "Eradication", diff: "Containment stops the spread. Eradication removes the cause. Containment comes first." },
          { a: "Isolate the host", b: "Power off the host", diff: "Isolating cuts network access while keeping memory evidence. Powering off destroys volatile evidence." },
          { a: "Restore", b: "Rebuild", diff: "Restoring returns data from backup. Rebuilding reinstalls systems from known-good sources, which is safer after serious compromise." },
          { a: "Breach notification", b: "Incident containment", diff: "Containment is technical and immediate. Notification is a legal obligation with deadlines, handled with counsel." }
        ],
        soc: "Playbooks turn into SOAR workflows and checklists. Analysts must know not only the steps but the decision points, such as when to escalate, who can authorize taking a production system offline, and when to involve legal. Practicing with tabletop exercises reveals gaps in the playbook before a real incident does.",
        patterns: [
          ["Mass file encryption detected; what first?", "Isolate affected systems to stop spread (while preserving evidence)"],
          ["Attacker has a user's password and session", "Reset password and revoke all sessions and tokens"],
          ["Malicious inbox forwarding rule found", "Remove it as part of account compromise response"],
          ["Personal data of EU residents exfiltrated", "Legal-led notification within 72 hours"],
          ["Employee suspected of stealing data", "Involve HR and legal; preserve evidence quietly"],
          ["Traffic flood from many sources", "Engage DDoS protection or ISP; rate limit"],
          ["Safest way to recover after serious compromise", "Rebuild from known-good images and reset credentials"],
          ["Coordinate response while email may be compromised", "Use an out-of-band channel"]
        ],
        takeaways: [
          "The lifecycle is constant, but the first moves depend on the scenario.",
          "Contain quickly while preserving evidence, and involve legal early when data or people are involved.",
          "Close the entry point and reset credentials before restoring service."
        ],
        remember: [
          "Playbook = scenario-specific steps built on the incident response lifecycle.",
          "Ransomware: isolate, protect offline backups, assume data theft, rebuild, restore by business priority.",
          "Compromised account: reset password AND revoke sessions/tokens, remove inbox rules and app consents, enforce MFA.",
          "Data breach: scope the data, close the exfiltration path, meet notification deadlines (GDPR 72 hours).",
          "Insider: involve HR and legal, preserve evidence quietly, avoid tipping off.",
          "Isolate rather than power off to keep volatile evidence.",
          "Classify severity early; coordinate out of band if email may be compromised."
        ],
        taglish:
          "Pareho ang pangkalahatang yugto ng pagtugon, pero iba ang unang hakbang depende sa uri ng insidente. Ransomware: i-isolate agad ang apektadong host, tiyaking ligtas ang offline backup, ipagpalagay na may nakaw na datos, at mag-rebuild sa malinis na image. Na-hack na account: palitan ang password at bawiin ang lahat ng session at token, alisin ang kahina-hinalang inbox rule. Data breach: alamin kung anong datos at kaninong datos, at sundin ang deadline ng abiso (GDPR, 72 oras). Insider: isama ang HR at legal, at huwag ipaalam sa taong sangkot. Iwasan ang pag-patay ng computer kung kailangan pa ang memory bilang ebidensya."
      },
      {
        id: "d4-t175",
        title: "Password Policy and Modern Guidance: Length, Complexity, Rotation, Lockout, and Password Managers",
        tag: "4.6",
        minutes: 18,
        goal: "Distinguish traditional password policy settings from current NIST-style guidance, and recommend sensible controls for passwords, lockout, storage, and password managers.",
        why: "Password questions can reflect either the older complexity-and-rotation model or the newer length-and-screening model. Knowing both, and why guidance changed, helps you choose the best answer for the way the question is framed.",
        simple:
          "Traditional password policy used several settings: MINIMUM LENGTH, COMPLEXITY (requiring uppercase, lowercase, digits, and symbols), PASSWORD HISTORY (preventing reuse of recent passwords), MAXIMUM AGE (forcing a change every 60 or 90 days), MINIMUM AGE (preventing an immediate change back to an old password), and ACCOUNT LOCKOUT (locking an account after a number of failed attempts). These are still found in many policies and on the exam. Research later showed that complexity rules and forced rotation often backfire: people respond with predictable patterns ('Summer2025!' becomes 'Fall2025!') and write passwords down. Current guidance, such as NIST Special Publication 800-63B, therefore emphasizes: LENGTH over complexity (long passphrases are strong and easier to remember); allowing long passwords and all characters, including spaces; SCREENING new passwords against lists of commonly used, breached, and context-specific passwords (the company name, the username); NOT requiring periodic changes unless there is evidence of compromise; allowing PASTE and password managers; limiting guessing through rate limiting and lockout or throttling; using MFA; avoiding knowledge-based security questions; and protecting stored passwords with salted, slow hashing (bcrypt, PBKDF2, or similar). A PASSPHRASE is a sequence of several random words that is long yet memorable. A PASSWORD MANAGER generates and stores unique, random passwords for every site behind one strong master credential, which defeats password reuse (the cause of credential stuffing) and helps users resist phishing because the manager fills credentials only on the genuine site; the risk is that the vault becomes a high-value target, so it needs a strong master password, MFA, and a trusted provider. Other considerations: account lockout stops online guessing but can be abused to lock out legitimate users (a denial-of-service), so many systems use throttling or temporary lockouts; default and shared passwords must be changed or eliminated; service and administrator accounts need long random passwords stored in a vault; and passwords should never be sent or stored in plaintext. Password-less approaches such as passkeys and security keys remove the problem where possible.",
        deepDive: [
          { h: "Traditional settings and their meaning", list: [
            "Minimum length: shortest allowed password.",
            "Complexity: required character classes.",
            "Password history: number of old passwords remembered to prevent reuse.",
            "Maximum age: days before a change is forced.",
            "Minimum age: days before a user may change again (stops cycling through history).",
            "Account lockout threshold and duration: failures allowed and how long the account stays locked."
          ] },
          { h: "Why guidance changed", list: [
            "Forced complexity produces predictable substitutions and does little against modern cracking.",
            "Forced rotation encourages small, predictable changes and weaker choices.",
            "Length and unpredictability add the most strength.",
            "Checking against breached-password lists blocks passwords attackers already try first.",
            "Rotation is still appropriate after a known or suspected compromise."
          ] },
          { h: "Practical recommendations", list: [
            "Require a sensible minimum length, and favor passphrases.",
            "Permit very long passwords and paste; support password managers.",
            "Screen against breached and common lists, and block context-specific words.",
            "Rate limit guesses and use temporary lockout or throttling.",
            "Require MFA, preferably phishing-resistant, for important accounts.",
            "Store passwords with a unique salt and a slow hash; never in plaintext or reversible form.",
            "Remove default and shared credentials; vault service and admin account secrets."
          ] },
          { h: "Password manager benefits and risks", list: [
            "Benefits: unique strong passwords everywhere, no reuse, autofill only on matching sites (phishing resistance), secure sharing.",
            "Risks: a compromised vault or master password exposes everything; mitigate with a strong master secret, MFA, and recovery planning.",
            "Enterprise managers add audit, policy, and sharing controls."
          ] },
          { h: "Lockout trade-offs", list: [
            "Lockout stops online brute force but not spraying across many accounts or offline cracking.",
            "Attackers can deliberately lock out users (denial of service).",
            "Balance with throttling, CAPTCHA, and risk-based challenges."
          ] },
          { h: "Beyond passwords", p: "Passkeys and FIDO2 security keys replace shared secrets with public-key cryptography that cannot be phished or reused. Where they are available, they are the strongest option; passwords then become a fallback that is still screened and rate limited." }
        ],
        keyTerms: [
          { term: "Password Complexity", def: "A requirement to include multiple character types." },
          { term: "Password History", def: "A setting that prevents reuse of recent passwords." },
          { term: "Maximum / Minimum Password Age", def: "How long a password may be used before change is required, and how soon it may be changed again." },
          { term: "Account Lockout", def: "Temporarily disabling an account after repeated failed logins." },
          { term: "Passphrase", def: "A long password made of several words, easier to remember and strong because of its length." },
          { term: "Password Manager", def: "Software that generates, stores, and fills unique passwords behind a master credential." },
          { term: "Breached Password Screening", def: "Rejecting passwords that appear in known leak or common-password lists." },
          { term: "NIST SP 800-63B", def: "US guidance on digital identity authentication, including password recommendations." },
          { term: "Throttling", def: "Slowing repeated authentication attempts to limit guessing." },
          { term: "Salted Hash", def: "A password hash combined with a unique random value, making precomputed attacks ineffective." }
        ],
        analogy:
          "The old advice was like telling people to change their door lock every 90 days and use a code with at least one capital letter and a symbol: they ended up with 'Door2025!' then 'Door2026!'. The newer advice is to make the lock long and unique, check that the code is not on the list of codes burglars try first, and only change it if there is a reason to think it has been seen.",
        technical:
          "A company updates its policy: 14-character minimum with passphrases encouraged, no composition rules, no scheduled expiration, new passwords screened against a breached-password list and the company name, pasting and a corporate password manager allowed, progressive delays after failed logins instead of permanent lockout, and MFA required for all remote access. Service accounts receive long random passwords stored in a vault. After a vendor breach exposes some employee credentials, those specific users are forced to change passwords immediately.",
        table: {
          headers: ["Topic", "Traditional approach", "Current guidance"],
          rows: [
            ["Strength", "Complexity rules", "Length, passphrases, and screening"],
            ["Changes", "Forced every 60 to 90 days", "Only on evidence of compromise"],
            ["Reuse", "Password history", "Unique per site, via a password manager"],
            ["Guessing", "Hard lockout", "Throttling and rate limits, plus MFA"],
            ["Reset questions", "Security questions", "Avoid knowledge-based questions"],
            ["Storage", "Hashed", "Unique salt and slow hash (bcrypt, PBKDF2)"]
          ]
        },
        confusion: [
          { a: "Maximum age", b: "Minimum age", diff: "Maximum age forces a change after a set number of days. Minimum age prevents changing again too soon, which stops users cycling back to an old password." },
          { a: "Password history", b: "Password age", diff: "History remembers old passwords to block reuse. Age controls how long a current password may be kept or how soon it can change." },
          { a: "Complexity", b: "Length", diff: "Complexity requires character types. Length adds more strength per added character and is favored by current guidance." },
          { a: "Lockout", b: "Throttling", diff: "Lockout disables the account after failures. Throttling slows attempts without disabling it, which avoids easy denial of service." },
          { a: "Password manager", b: "Single sign-on", diff: "A password manager stores many separate credentials. SSO lets one login unlock many applications through a trusted identity provider." }
        ],
        soc: "Credential attacks show in authentication logs: many failures, lockouts across many accounts, or logins from unusual places after a breach elsewhere. Screening for breached passwords at creation time and monitoring leak databases for corporate email addresses prevents many of these before they cause incidents.",
        patterns: [
          ["Prevent users from going back to an old password", "Password history (with minimum age)"],
          ["Force a change every 90 days", "Maximum password age (older practice)"],
          ["Reject passwords seen in known breaches", "Breached password screening (current guidance)"],
          ["Long memorable phrase of several words", "Passphrase"],
          ["Stops users reusing the same password everywhere", "Password manager"],
          ["Attackers deliberately lock out users", "Lockout abuse; use throttling"],
          ["Best storage for passwords", "Unique salt plus a slow hash such as bcrypt or PBKDF2"],
          ["Replace passwords with phishing-resistant credentials", "Passkeys / FIDO2 security keys"]
        ],
        takeaways: [
          "Know both the traditional settings and the modern length-and-screening guidance.",
          "Unique passwords per site (via a manager) and MFA matter more than complexity rules.",
          "Store passwords with salted, slow hashes and rate limit guessing."
        ],
        remember: [
          "Traditional settings: length, complexity, history, maximum age, minimum age, lockout.",
          "Current NIST guidance: favor length, allow long passwords and paste, screen against breached lists, avoid forced periodic rotation and composition rules, avoid security questions.",
          "Rotate after a known or suspected compromise.",
          "Password managers prevent reuse and fill only on genuine sites; protect the master password with MFA.",
          "Lockout stops online guessing but can be abused; throttling is a balanced alternative.",
          "Store with unique salts and slow hashes (bcrypt, PBKDF2).",
          "Passkeys and FIDO2 keys remove the shared secret entirely."
        ],
        taglish:
          "Ang lumang patakaran: minimum length, complexity, history, maximum age, minimum age, at lockout. Napansin na ang pilit na complexity at palit-palit na password ay nauuwi sa predictable na pattern (hal. Summer2025! tapos Fall2025!). Ngayon, mas pinapaboran ang haba (passphrase), pag-screen sa mga na-leak na password, at hindi na pinipilit ang regular na pagpalit maliban kung may hinala ng compromise. Gumamit ng password manager para unique ang password sa bawat site, at MFA. Itago ang password gamit ang salted at mabagal na hash (bcrypt o PBKDF2)."
      }
    ],

    d5: [
      {
        id: "d5-t170",
        title: "Data Retention, Legal Hold, and e-Discovery: Keeping the Right Data for the Right Time",
        tag: "5.4",
        minutes: 18,
        goal: "Explain retention schedules, legal holds, and e-discovery, and balance requirements to keep data against requirements to delete it.",
        why: "Organizations face pressure from both sides: laws require keeping some records, privacy rules require deleting others, and a lawsuit can freeze everything. The exam expects you to know which rule wins and what the process looks like.",
        simple:
          "A DATA RETENTION policy states how long each type of data is kept and how it is destroyed afterward. Retention periods come from laws and regulations, contracts, business needs, and the value of the data for operations and investigations. Keeping data too briefly risks non-compliance and the inability to investigate; keeping it too long raises storage cost and enlarges the damage of a breach, which is why privacy rules encourage DATA MINIMIZATION and storage limitation (keep only what you need, only as long as you need it). Typical examples include security and audit log retention requirements (for instance, the payment card standard asks that audit logs be kept for at least a year with the most recent three months immediately available), healthcare compliance documentation (commonly six years under HIPAA), and financial and audit records for public companies (commonly seven years under Sarbanes-Oxley); exact periods vary by jurisdiction and record type, so organizations confirm requirements with legal counsel. When litigation, an investigation, or an audit is reasonably anticipated, a LEGAL HOLD (litigation hold) overrides the normal retention schedule: relevant data must be preserved, and routine deletion, auto-delete settings, backup rotation, and device reimaging must be suspended for the affected people and systems. Destroying or altering relevant evidence, called SPOLIATION, can lead to heavy sanctions, so holds are issued in writing to custodians, tracked, and released only when legal says so. E-DISCOVERY is the process of identifying, preserving, collecting, processing, reviewing, and producing electronically stored information (ESI) in response to legal requests. Its stages, as described by the EDRM model, run from information governance and identification through preservation, collection, processing, review, analysis, production, and presentation. Throughout, evidence must be handled with a documented chain of custody and collected in a way that preserves integrity (hashing and forensic copies), and sensitive or privileged material must be protected. Tensions arise between rules: a person's right to have their data erased under privacy law may conflict with a legal hold or a regulatory retention requirement, and legal obligations generally take precedence over the request for erasure for as long as they apply. Backups complicate things, since deleted data may persist in archives. Good practice is to maintain a data inventory and classification so you know what you have and where, define retention schedules by category, automate deletion where permitted, suspend it when a hold applies, and destroy data securely at the end of its life.",
        deepDive: [
          { h: "Why retention schedules exist", list: [
            "Comply with laws and regulations that require keeping certain records.",
            "Support business operations, audits, and investigations.",
            "Reduce risk and cost by not keeping data longer than necessary.",
            "Provide defensible, consistent disposal rather than ad hoc deletion."
          ] },
          { h: "Examples of retention drivers (confirm locally)", list: [
            "Payment card standard: retain audit log history for at least 12 months, with 3 months immediately available.",
            "HIPAA: retain required compliance documentation for six years.",
            "Sarbanes-Oxley: retain audit and related records for several years (commonly seven).",
            "GDPR: storage limitation; keep personal data only as long as necessary for its purpose.",
            "Contracts and industry rules may add their own requirements."
          ] },
          { h: "Legal hold procedure", list: [
            "Trigger: litigation, government investigation, or audit is reasonably anticipated.",
            "Legal issues a written hold notice to the people and systems likely to hold relevant data.",
            "IT suspends auto-delete, backup tape rotation, and device wipes for the scope.",
            "Custodians acknowledge the notice; the hold is tracked and periodically reminded.",
            "Legal releases the hold in writing when the matter ends."
          ] },
          { h: "e-Discovery stages (EDRM)", list: [
            "Identification: find sources of potentially relevant ESI.",
            "Preservation: stop deletion and protect data from change.",
            "Collection: gather data in a forensically sound way.",
            "Processing and review: reduce volume, check relevance and privilege.",
            "Analysis and production: deliver responsive data to the requesting party in agreed formats.",
            "Presentation: use the evidence in proceedings."
          ] },
          { h: "Conflicts between obligations", list: [
            "Right to erasure versus legal hold or regulatory retention: legal obligations to keep data generally prevail while they apply.",
            "Data minimization versus 'keep everything just in case': keeping everything increases breach exposure and discovery cost.",
            "Backups: deleted data may remain in backups until they expire; define how this is handled."
          ] },
          { h: "Secure end of life", list: [
            "Destroy data when retention ends and no hold applies.",
            "Use appropriate sanitization (wiping, cryptographic erase, destruction) and document it with certificates where needed.",
            "Include copies in archives, backups, and cloud storage."
          ] }
        ],
        keyTerms: [
          { term: "Data Retention Policy", def: "Rules for how long different data types are kept and how they are destroyed." },
          { term: "Legal Hold", def: "A requirement to preserve potentially relevant data, overriding normal deletion." },
          { term: "e-Discovery", def: "The process of identifying, preserving, collecting, and producing electronic evidence for legal matters." },
          { term: "ESI", def: "Electronically Stored Information: data in digital form that may be evidence." },
          { term: "Spoliation", def: "Destroying or altering evidence that should have been preserved." },
          { term: "Data Minimization", def: "Collecting and keeping only the data necessary for a purpose." },
          { term: "Storage Limitation", def: "A privacy principle that personal data should not be kept longer than necessary." },
          { term: "Chain of Custody", def: "Documentation of who handled evidence and when, to prove it was not altered." },
          { term: "Data Inventory", def: "A record of what data an organization holds and where it is stored." },
          { term: "Defensible Disposal", def: "Documented, policy-based destruction of data that is consistent and justifiable." }
        ],
        analogy:
          "A retention schedule is a household rule: keep tax records for seven years, throw out junk mail immediately. A legal hold is a court telling you 'do not throw away anything related to the dispute', even the junk mail you would normally discard, until you are told otherwise. Spoliation is shredding those papers anyway, and e-discovery is the careful process of finding and handing over the right papers.",
        technical:
          "A company's policy deletes chat messages after 90 days and email after 3 years. When a customer lawsuit is threatened, legal issues a hold covering the sales team and the relevant systems. IT suspends the auto-delete for those mailboxes and chat channels, pulls affected devices from the reimaging queue, and preserves a copy of the relevant backups. During collection, an analyst creates forensic copies, hashes them, and records chain of custody. Separately, a former customer's request to erase their personal data is handled by deleting data not subject to the hold and documenting that the remainder is retained under a legal obligation.",
        table: {
          headers: ["Concept", "Purpose", "Key point"],
          rows: [
            ["Retention schedule", "Keep data for required periods, then dispose", "Driven by law, contracts, and business need"],
            ["Data minimization", "Limit exposure and cost", "Keep only what you need"],
            ["Legal hold", "Preserve potential evidence", "Suspends deletion; overrides the schedule"],
            ["e-Discovery", "Produce electronic evidence for legal matters", "Identify, preserve, collect, review, produce"],
            ["Chain of custody", "Prove evidence integrity", "Document every handler and transfer"],
            ["Secure disposal", "Destroy data at end of life", "Sanitize or destroy; include backups"]
          ]
        },
        confusion: [
          { a: "Retention policy", b: "Legal hold", diff: "A retention policy sets normal keep-and-delete timelines. A legal hold suspends deletion for specific data because of anticipated legal action." },
          { a: "Data minimization", b: "Retention for compliance", diff: "Minimization says keep only what you need. Compliance retention says you MUST keep certain records for set periods. Together they define the right period." },
          { a: "Right to erasure", b: "Legal hold", diff: "The erasure right lets individuals request deletion, but a legal hold or required retention can lawfully prevent deletion for as long as it applies." },
          { a: "Spoliation", b: "Secure disposal", diff: "Spoliation is improper destruction of evidence that should have been preserved. Secure disposal is authorized, policy-based destruction after retention ends." },
          { a: "e-Discovery", b: "Digital forensics", diff: "e-Discovery responds to legal requests for relevant information. Digital forensics investigates what happened on systems. They share evidence handling methods." }
        ],
        soc: "Security teams support legal holds by preserving logs, mailboxes, and images, and by documenting chain of custody. Retention also affects detection: log retention that is too short makes slow-moving intrusions impossible to investigate, while retention that is too long increases cost and privacy exposure, so log retention is set deliberately by risk and regulation.",
        patterns: [
          ["Lawsuit anticipated; auto-delete must stop for relevant data", "Legal hold"],
          ["Destroying relevant evidence after a lawsuit is likely", "Spoliation"],
          ["Keep only the data you need for as long as you need it", "Data minimization / storage limitation"],
          ["Collecting and producing electronic records for a lawsuit", "e-Discovery"],
          ["Documenting who handled evidence and when", "Chain of custody"],
          ["Customer asks for erasure but a legal hold applies", "Legal obligation takes precedence while it applies"],
          ["Audit logs kept for 12 months, 3 months immediately available", "Payment card standard requirement"],
          ["List of what data exists and where it is stored", "Data inventory"]
        ],
        takeaways: [
          "Retention is set by law, contracts, and need; minimization limits how long you keep data.",
          "A legal hold overrides normal deletion; breaking it risks spoliation sanctions.",
          "Evidence must be preserved with integrity and a chain of custody."
        ],
        remember: [
          "Retention policy: how long each data type is kept and how it is destroyed.",
          "Legal hold suspends normal deletion (including auto-delete and backup rotation) for relevant data.",
          "Spoliation = destroying evidence that should have been preserved.",
          "e-Discovery: identify, preserve, collect, process, review, produce ESI.",
          "Data minimization and storage limitation: keep only what you need, only as long as needed.",
          "Legal retention duties generally prevail over erasure requests while they apply.",
          "Maintain a data inventory; destroy securely at end of life, including backups; document chain of custody."
        ],
        taglish:
          "Ang data retention policy ay nagsasabi kung gaano katagal itatago ang bawat uri ng datos at paano ito sisirain pagkatapos. Dapat sundin ang batas at kontrata, pero huwag ding itago nang sobra (data minimization). Kapag may inaasahang kaso o imbestigasyon, may legal hold: ititigil ang pagbura ng mga kaugnay na datos, kahit ang auto-delete at backup rotation. Kapag sinadya mong sirain ang ebidensya, spoliation iyon at may parusa. Ang e-discovery ang proseso ng paghanap, pag-preserve, pagkolekta, at pagbibigay ng elektronikong ebidensya. At kapag may legal hold, mas matimbang iyon kaysa sa hiling na burahin ang datos."
      }
    ]
  },

  tips: {
    "d4-t172": "If an API lets a logged-in user see someone else's record by changing an ID, the answer is broken object-level authorization (BOLA/IDOR), fixed by a server-side ownership check on every request. Rate limiting answers brute force and scraping; an API gateway centralizes those controls.",
    "d4-t173": "Memorize one clue per tool: 169.254.x.x = DHCP failed (APIPA), duplicate MACs in arp -a = ARP spoofing, asterisks in tracert = that hop does not reply, filtered in nmap = a firewall is blocking, and an ESTABLISHED connection to an odd external port in netstat = investigate the PID.",
    "d4-t174": "Read the scenario for the first move: ransomware = isolate (do not power off) and protect backups, compromised account = reset password AND revoke sessions, insider = involve HR and legal and do not tip them off, breach = legal and notification deadlines. 'Rebuild from known-good' beats 'clean and trust'.",
    "d4-t175": "Pick the framing: if the question lists age, history, complexity, and lockout settings, use the traditional definitions (maximum age forces change, minimum age prevents quick changes). If it asks what current guidance recommends, choose length, breached-password screening, and no forced periodic rotation.",
    "d5-t170": "A legal hold always overrides the normal deletion schedule, and spoliation is the penalty-bearing mistake. When retention rules conflict with an erasure request, the legal or regulatory obligation to keep the data wins while it applies."
  },

  summaries: {
    "d4-t172": "APIs fail most often at authorization, especially when a caller can reach another user's object by changing an ID, so servers must check ownership on every request, limit rates, validate input, and keep an inventory behind a gateway.",
    "d4-t173": "A handful of tools answer most diagnostic questions, and a few output patterns, such as a 169.254 address, duplicate MACs, filtered ports, and odd listening connections, reveal connectivity problems and suspicious activity.",
    "d4-t174": "Incident playbooks apply the response lifecycle to specific scenarios, where the right first move differs: isolate and protect backups for ransomware, revoke sessions for a compromised account, and involve HR and legal for an insider.",
    "d4-t175": "Traditional password policy used complexity, history, and forced rotation, while current guidance favors length, breached-password screening, password managers, throttling, MFA, and salted slow hashing.",
    "d5-t170": "Retention schedules say how long data is kept, legal holds suspend deletion when litigation is anticipated, e-discovery produces electronic evidence, and minimization limits how much is kept in the first place."
  },

  questions: [
    {
      id: "q-x-d4-33", domainId: "d4", tag: "d4-t172", type: "single",
      prompt: "A logged-in user changes the account number in an API request URL from /accounts/1001 to /accounts/1002 and sees another customer's data. Which weakness does this describe?",
      choices: [
        { id: "a", text: "Broken object-level authorization (IDOR)" },
        { id: "b", text: "Missing HTTPS" },
        { id: "c", text: "A SYN flood" },
        { id: "d", text: "Weak password hashing" }
      ],
      correct: "a",
      explanation: "The API authenticated the user but did not check that the requested object belongs to that user, which is broken object-level authorization.",
      distractorExplanations: {
        b: "Missing HTTPS exposes traffic to eavesdropping but does not explain access to another user's object by changing an ID.",
        c: "A SYN flood is a denial-of-service attack on TCP connections.",
        d: "Weak password hashing affects stored credentials, not access to other users' records."
      }
    },
    {
      id: "q-x-d4-34", domainId: "d4", tag: "d4-t172", type: "single",
      prompt: "A company notices attackers sending millions of login attempts to its API using leaked credentials. Which control would MOST directly reduce this abuse?",
      choices: [
        { id: "a", text: "Rate limiting and throttling on the login endpoint" },
        { id: "b", text: "Returning more detailed error messages" },
        { id: "c", text: "Allowing all origins in CORS" },
        { id: "d", text: "Using longer API URLs" }
      ],
      correct: "a",
      explanation: "Rate limiting and throttling restrict how many attempts can be made, slowing credential stuffing and brute force.",
      distractorExplanations: {
        b: "Detailed errors give attackers more information and do not limit attempts.",
        c: "Opening CORS to all origins weakens browser protections and does nothing to limit login attempts.",
        d: "URL length has no effect on credential attacks."
      }
    },
    {
      id: "q-x-d4-35", domainId: "d4", tag: "d4-t173", type: "single",
      prompt: "A workstation shows an IP address of 169.254.43.12 and no default gateway. What is the MOST likely cause?",
      choices: [
        { id: "a", text: "The host could not reach a DHCP server and assigned itself an APIPA address" },
        { id: "b", text: "The host has a static IP address configured correctly" },
        { id: "c", text: "DNS poisoning" },
        { id: "d", text: "A port scan against the host" }
      ],
      correct: "a",
      explanation: "A 169.254.x.x address is an automatic private IP address that a host assigns itself when DHCP does not respond.",
      distractorExplanations: {
        b: "A correctly configured static address would not fall in the 169.254 range and would include a gateway.",
        c: "DNS poisoning affects name resolution, not the host's own IP address assignment.",
        d: "A port scan targets services and does not change the host's address."
      }
    },
    {
      id: "q-x-d4-36", domainId: "d4", tag: "d4-t173", type: "single",
      prompt: "The ARP cache on a user's PC shows the default gateway's IP address and another host's IP address mapped to the same MAC address. What does this MOST likely indicate?",
      choices: [
        { id: "a", text: "ARP spoofing" },
        { id: "b", text: "A healthy network" },
        { id: "c", text: "A DHCP failure" },
        { id: "d", text: "A broken DNS server" }
      ],
      correct: "a",
      explanation: "Two IP addresses sharing one MAC address, especially involving the gateway, suggests another host is impersonating the gateway through ARP spoofing.",
      distractorExplanations: {
        b: "Normally each IP address maps to its own MAC address.",
        c: "A DHCP failure would show as an APIPA address, not duplicate ARP mappings.",
        d: "DNS issues affect name resolution and do not change ARP entries."
      }
    },
    {
      id: "q-x-d4-37", domainId: "d4", tag: "d4-t174", type: "single",
      prompt: "A SOC detects ransomware encrypting files on a file server. What is the BEST immediate action?",
      choices: [
        { id: "a", text: "Isolate the affected systems from the network to stop the spread while preserving evidence" },
        { id: "b", text: "Pay the ransom immediately" },
        { id: "c", text: "Wipe and reimage the server before collecting any evidence" },
        { id: "d", text: "Wait to see how many files are encrypted" }
      ],
      correct: "a",
      explanation: "Containment by isolating affected systems stops further encryption and spread while keeping evidence available for analysis.",
      distractorExplanations: {
        b: "Paying is generally discouraged, does not guarantee recovery, and should not be the first reaction.",
        c: "Wiping before collecting evidence destroys information needed to find the cause and scope.",
        d: "Waiting allows more files and systems to be encrypted."
      }
    },
    {
      id: "q-x-d4-38", domainId: "d4", tag: "d4-t174", type: "single",
      prompt: "After a user's email account is compromised through phishing, the password has been reset. Which additional step is ESSENTIAL?",
      choices: [
        { id: "a", text: "Revoke active sessions and tokens and remove malicious inbox rules and app consents" },
        { id: "b", text: "Do nothing more; the password reset is sufficient" },
        { id: "c", text: "Disable the company firewall" },
        { id: "d", text: "Increase the password maximum age" }
      ],
      correct: "a",
      explanation: "An attacker may remain logged in through existing sessions or tokens and may have created forwarding rules or app permissions, so these must be revoked and removed.",
      distractorExplanations: {
        b: "A password reset alone does not end sessions already authenticated or remove persistence mechanisms.",
        c: "Disabling the firewall would increase exposure and does not address the compromise.",
        d: "Increasing the maximum age has no effect on an existing compromise."
      }
    },
    {
      id: "q-x-d4-39", domainId: "d4", tag: "d4-t175", type: "single",
      prompt: "Which password policy setting prevents a user from changing their password several times in a row to cycle back to a previously used password?",
      choices: [
        { id: "a", text: "Minimum password age (together with password history)" },
        { id: "b", text: "Maximum password age" },
        { id: "c", text: "Account lockout duration" },
        { id: "d", text: "Password complexity" }
      ],
      correct: "a",
      explanation: "A minimum password age prevents immediate repeated changes, so users cannot quickly exhaust the history and return to an old password.",
      distractorExplanations: {
        b: "Maximum age forces a change after a period but does not stop rapid cycling.",
        c: "Lockout duration controls how long an account stays locked after failed logins.",
        d: "Complexity controls the character types required, not reuse."
      }
    },
    {
      id: "q-x-d4-40", domainId: "d4", tag: "d4-t175", type: "single",
      prompt: "Which approach is MOST consistent with current NIST-style password guidance?",
      choices: [
        { id: "a", text: "Favor long passphrases and screen new passwords against breached-password lists without forcing periodic changes" },
        { id: "b", text: "Require a change every 30 days with strict complexity rules" },
        { id: "c", text: "Block pasting into password fields" },
        { id: "d", text: "Use security questions as the primary recovery method" }
      ],
      correct: "a",
      explanation: "Current guidance emphasizes length and screening against known-bad passwords, and does not require routine rotation without evidence of compromise.",
      distractorExplanations: {
        b: "Frequent forced changes and strict composition rules are discouraged because they lead to predictable passwords.",
        c: "Blocking paste interferes with password managers and is discouraged.",
        d: "Knowledge-based security questions are weak and discouraged."
      }
    },
    {
      id: "q-x-d5-17", domainId: "d5", tag: "d5-t170", type: "single",
      prompt: "A company expects to be sued by a former customer. Its email system automatically deletes messages after 90 days. What should the company do?",
      choices: [
        { id: "a", text: "Issue a legal hold and suspend automatic deletion for relevant data" },
        { id: "b", text: "Continue deleting as usual to follow the retention policy" },
        { id: "c", text: "Delete the relevant emails immediately to avoid disclosure" },
        { id: "d", text: "Encrypt the mailboxes and keep deleting" }
      ],
      correct: "a",
      explanation: "When litigation is anticipated, a legal hold requires preserving relevant data and suspending routine deletion.",
      distractorExplanations: {
        b: "Continuing automatic deletion could destroy relevant evidence and expose the company to sanctions.",
        c: "Deliberately deleting relevant emails is spoliation and can lead to severe penalties.",
        d: "Encryption does not preserve data that is still being deleted."
      }
    },
    {
      id: "q-x-d5-18", domainId: "d5", tag: "d5-t170", type: "single",
      prompt: "Which term describes the improper destruction or alteration of evidence that should have been preserved for legal proceedings?",
      choices: [
        { id: "a", text: "Spoliation" },
        { id: "b", text: "Data minimization" },
        { id: "c", text: "Sanitization" },
        { id: "d", text: "Tokenization" }
      ],
      correct: "a",
      explanation: "Spoliation is destroying or altering evidence that should have been preserved, which can lead to sanctions.",
      distractorExplanations: {
        b: "Data minimization is the practice of keeping only the data needed for a purpose.",
        c: "Sanitization is authorized, policy-based removal of data from media at end of life.",
        d: "Tokenization replaces sensitive values with random tokens."
      }
    }
  ],

  glossary: [
    { term: "BOLA / IDOR", domain: "d4", plain: "Seeing someone else's data by changing a number in a request.", technical: "Broken Object Level Authorization (insecure direct object reference): an API or app does not verify that the requested object belongs to the caller.", example: "Changing /orders/1001 to /orders/1002." },
    { term: "Rate Limiting", domain: "d4", plain: "Capping how many requests someone can make.", technical: "Restricting the number of requests a client may make in a time window to prevent abuse.", example: "Returning HTTP 429 after too many login attempts." },
    { term: "API Gateway", domain: "d4", plain: "A single front door for all API traffic.", technical: "A service that centralizes authentication, rate limiting, validation, and logging for APIs.", example: "All mobile app calls pass through the gateway." },
    { term: "APIPA", domain: "d4", plain: "An address a computer gives itself when it cannot get one.", technical: "Automatic Private IP Addressing: a 169.254.0.0/16 address self-assigned when DHCP is unavailable.", example: "169.254.17.8 on a disconnected PC." },
    { term: "Patient Zero", domain: "d4", plain: "The first system or account hit in an attack.", technical: "The initial compromised host or account in an incident, identified to trace the attack path.", example: "A laptop that opened a phishing attachment." },
    { term: "Double Extortion", domain: "d4", plain: "Ransomware that also threatens to leak stolen data.", technical: "A ransomware tactic of encrypting data and exfiltrating it, threatening publication if payment is not made.", example: "A ransom note listing stolen files." },
    { term: "Passphrase", domain: "d4", plain: "A long password made of several words.", technical: "A long memorized secret composed of multiple words, whose length provides strength.", example: "four random words strung together" },
    { term: "Password Manager", domain: "d4", plain: "An app that remembers a different strong password for every site.", technical: "Software that generates, stores, and autofills unique passwords protected by a master credential.", example: "One master password unlocks all stored logins." },
    { term: "Legal Hold", domain: "d5", plain: "An order to keep data that might be needed in a legal case.", technical: "A requirement to preserve potentially relevant information, suspending normal deletion.", example: "Pausing email auto-delete for the sales team." },
    { term: "Spoliation", domain: "d5", plain: "Destroying evidence you should have kept.", technical: "The destruction, alteration, or failure to preserve evidence relevant to legal proceedings.", example: "Deleting emails after a lawsuit is threatened." },
    { term: "e-Discovery", domain: "d5", plain: "Finding and handing over electronic records for a legal case.", technical: "The process of identifying, preserving, collecting, reviewing, and producing electronically stored information.", example: "Producing relevant emails and chat logs." },
    { term: "Data Minimization", domain: "d5", plain: "Only keep the data you really need.", technical: "A privacy principle of collecting and retaining only the personal data necessary for a specified purpose.", example: "Deleting old customer records no longer required." }
  ],

  acronyms: [
    { acro: "IDOR", expansion: "Insecure Direct Object Reference", meaning: "Accessing another user's object by changing an identifier because authorization is not checked." },
    { acro: "BOLA", expansion: "Broken Object Level Authorization", meaning: "An API flaw where object ownership is not verified; the API-world term for IDOR." },
    { acro: "CORS", expansion: "Cross-Origin Resource Sharing", meaning: "A browser mechanism that lets a server allow other origins to access its resources." },
    { acro: "JWT", expansion: "JSON Web Token", meaning: "A compact signed token used to carry claims." },
    { acro: "APIPA", expansion: "Automatic Private IP Addressing", meaning: "A 169.254.x.x address a host assigns itself when DHCP fails." },
    { acro: "TTL", expansion: "Time To Live", meaning: "A counter that limits how long a packet or DNS record may live." },
    { acro: "ESI", expansion: "Electronically Stored Information", meaning: "Digital data that may be evidence in legal matters." },
    { acro: "EDRM", expansion: "Electronic Discovery Reference Model", meaning: "A model describing the stages of the e-discovery process." },
    { acro: "SP 800-63B", expansion: "NIST Special Publication 800-63B", meaning: "NIST guidance on authentication, including password recommendations." }
  ]
});
