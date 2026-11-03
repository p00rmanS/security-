/* More lessons, round 3, part A. Ids use the t17x range. Registers a bundle
   on globalThis.__DEEP; data-lessons-merge.js merges it.
   All addresses and names in examples are fictional (documentation ranges). */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d2: [
      {
        id: "d2-t170",
        title: "Business Email Compromise and Payment Fraud: When the Attack Has No Malware",
        tag: "2.2",
        minutes: 18,
        goal: "Recognize the main forms of business email compromise, explain why they evade technical filters, and apply process controls that stop fraudulent payments.",
        why: "Business email compromise (BEC) causes some of the largest financial losses of any cybercrime, and it often involves no malware, no link, and no attachment. Scenario questions test whether you reach for process controls instead of only technical ones.",
        simple:
          "Business email compromise is fraud carried out through email in which the attacker impersonates or takes over a trusted person to trick someone into sending money or sensitive data. The common forms are CEO or executive fraud (a fake urgent request from a senior leader to a finance employee, often for a wire transfer or gift cards), VENDOR or INVOICE fraud (a message that appears to come from a real supplier saying its bank details have changed), PAYROLL DIVERSION (an email, apparently from an employee, asking HR to change where their salary is deposited), ATTORNEY impersonation (a confidential, time-critical request during a deal), and DATA THEFT requests (HR or tax records requested by a fake executive). Attackers prepare by researching the organization from public sources, then use one of two methods. In SPOOFING or LOOKALIKE attacks they send mail from a forged address, a display name that matches the executive, or a near-identical domain (one letter changed, or 'rn' used in place of 'm'). In ACCOUNT TAKEOVER they actually compromise a real mailbox through phishing or reused passwords, then read the conversations, wait for a real invoice, and slip in altered payment instructions; they often create inbox rules that hide or forward replies so the victim never sees the warning. BEC evades technical defenses because the message usually contains no malicious link or attachment, and with a hijacked account it genuinely comes from the right sender and passes SPF, DKIM, and DMARC. The pressure comes from urgency, secrecy ('I'm in a meeting, keep this between us'), and authority. Therefore the strongest controls are PROCESS controls: verify requests through a second, independent channel (call a known number, not the one in the email), require dual authorization for payments above a threshold, follow a formal procedure for changing vendor bank details, and separate duties between the person who requests, approves, and sends payments. Technical controls help around the edges: email authentication (SPF, DKIM, DMARC) against spoofing of your domain, banners that mark external senders, monitoring for lookalike domains, MFA on mailboxes, alerts for newly created forwarding or inbox rules, and detection of unusual sign-ins. Training should teach staff to treat urgent, secret payment requests as red flags. If fraud occurs, time is critical: contact the bank immediately to attempt a recall or freeze, report to law enforcement, preserve the emails, reset credentials, remove malicious inbox rules and app permissions, and notify affected partners.",
        deepDive: [
          { h: "Variants and what they target", list: [
            "CEO / executive fraud: urgent wire transfer or gift card purchase requests.",
            "Vendor or invoice fraud: 'our bank details have changed' sent to accounts payable.",
            "Account compromise: a real employee mailbox is used to send fraudulent invoices to customers or vendors.",
            "Payroll diversion: direct deposit details changed to an attacker's account.",
            "Attorney impersonation: confidential, urgent instructions during a transaction.",
            "Data theft: requests for employee tax forms or personal data."
          ] },
          { h: "Why filters miss it", list: [
            "No malware, link, or attachment to scan.",
            "A real compromised account passes authentication checks.",
            "Messages are short, plain, and well researched, so they look like normal business.",
            "Thread hijacking inserts the fraud into a genuine ongoing conversation."
          ] },
          { h: "Signs to look for", list: [
            "Urgency, secrecy, or pressure to bypass normal process.",
            "A new or changed bank account or payment method.",
            "Sender domain differs slightly, or the reply-to address differs from the sender.",
            "Request to use gift cards, cryptocurrency, or unusual payment routes.",
            "Poorly aligned writing style, or an executive who is known to be traveling or unreachable."
          ] },
          { h: "Controls that work", list: [
            "Out-of-band verification: call back using a number from the vendor master file or directory.",
            "Dual authorization and approval thresholds for payments and for changes to payee details.",
            "Segregation of duties: requester, approver, and releaser are different people.",
            "Vendor change procedure with independent confirmation before any bank detail update.",
            "Email authentication, external sender tagging, and lookalike-domain monitoring.",
            "MFA on all mailboxes, and alerts on new forwarding rules or inbox rules.",
            "Regular training with realistic examples and a no-blame way to report suspicion."
          ] },
          { h: "If money has been sent", list: [
            "Notify your bank immediately to request a recall or freeze; speed matters most, ideally within hours.",
            "Report to law enforcement (in the United States, the FBI's Internet Crime Complaint Center).",
            "Preserve email evidence and headers.",
            "Reset affected credentials, revoke sessions, delete malicious inbox rules and OAuth app consents.",
            "Notify customers or vendors whose information or payment instructions may have been affected."
          ] }
        ],
        keyTerms: [
          { term: "BEC", def: "Business Email Compromise: fraud using impersonation or takeover of trusted email identities to obtain money or data." },
          { term: "CEO Fraud", def: "A BEC variant impersonating a senior executive to request payments or data." },
          { term: "Invoice / Vendor Fraud", def: "Impersonating a supplier to redirect payments to a fraudulent account." },
          { term: "Lookalike Domain", def: "A domain that closely resembles a legitimate one to deceive recipients." },
          { term: "Display Name Spoofing", def: "Setting a sender's display name to a trusted person's name while using a different address." },
          { term: "Thread Hijacking", def: "Inserting fraudulent messages into an existing genuine email conversation." },
          { term: "Out-of-Band Verification", def: "Confirming a request through a separate, trusted communication channel." },
          { term: "Dual Authorization", def: "Requiring two people to approve a sensitive transaction." },
          { term: "Inbox Rule", def: "A mailbox setting that automatically moves, forwards, or deletes messages; often abused to hide fraud." }
        ],
        analogy:
          "BEC is a con artist in a convincing uniform walking into the accounts department with a slip of paper that says 'the boss says send this money now'. There is no weapon, no lock picked, and no alarm; the only defenses are the habits of the people at the desk: always phone the boss on a known number, and never let one person move large sums alone.",
        technical:
          "An accounts payable clerk receives a message, apparently from a regular supplier, stating that its bank details have changed and attaching an updated invoice for 48,000 dollars. The sender's domain differs by one letter from the real domain. The company's procedure requires the clerk to call the supplier on the number in the vendor master file before changing any payee details; the supplier confirms it sent nothing. The clerk reports the email, security blocks the lookalike domain, and a rule is added to flag external messages that mention bank detail changes.",
        table: {
          headers: ["Scenario", "Likely BEC form", "Best control"],
          rows: [
            ["Urgent wire request from 'the CEO' who is traveling", "CEO fraud", "Out-of-band verification and dual authorization"],
            ["Supplier says bank details have changed", "Invoice/vendor fraud", "Vendor change procedure with callback to a known number"],
            ["Employee asks HR to change direct deposit by email", "Payroll diversion", "Verify in person or through the HR portal with MFA"],
            ["Customers receive altered invoices from your real account", "Account takeover", "Reset credentials, remove inbox rules, enable MFA"],
            ["Message from a near-identical domain", "Lookalike domain", "Domain monitoring, external banner, user training"]
          ]
        },
        confusion: [
          { a: "BEC", b: "Typical phishing", diff: "Phishing usually tries to steal credentials or deliver malware with links or attachments. BEC often has neither; it persuades a person to move money or data." },
          { a: "Spoofed sender", b: "Compromised mailbox", diff: "A spoofed or lookalike sender can be blocked by email authentication and domain monitoring. A compromised real mailbox passes those checks, so process controls and MFA matter most." },
          { a: "Technical control", b: "Process control", diff: "Technical controls (filters, MFA) help but BEC is best stopped by process controls such as callback verification and dual approval." },
          { a: "Recall request", b: "Investigation", diff: "A bank recall is time-critical and comes first when money has been sent. The forensic investigation follows." }
        ],
        soc: "Detection depends on behavior: a new inbox rule that forwards mail to an external address, a login from an unusual place followed by rule creation, an external message referencing payment changes, or sudden registrations of lookalike domains. Responders prioritize contacting the bank quickly, then cleaning the mailbox and revoking sessions and app consents.",
        patterns: [
          ["Urgent, secret wire transfer request from an executive", "CEO fraud (BEC)"],
          ["Supplier announces new bank details by email", "Vendor/invoice fraud; verify out of band"],
          ["Mail from a domain one letter off from the real one", "Lookalike domain"],
          ["Forwarding rule created after a suspicious sign-in", "Mailbox takeover; remove rule, revoke sessions"],
          ["No link and no attachment, yet money was lost", "BEC"],
          ["Best single control for large payments", "Dual authorization with callback verification"],
          ["First action after a fraudulent wire", "Contact the bank immediately to recall or freeze"],
          ["Message passes SPF, DKIM, and DMARC but is fraudulent", "Compromised legitimate account"]
        ],
        takeaways: [
          "BEC works on people, not software; process controls are the main defense.",
          "Verify payment and bank detail changes through an independent channel.",
          "If money moves, call the bank first, because hours matter."
        ],
        remember: [
          "BEC = impersonation or takeover of trusted email to get money or data, often with no malware or links.",
          "Forms: CEO fraud, vendor/invoice fraud, payroll diversion, attorney impersonation, data theft.",
          "A compromised real mailbox passes SPF/DKIM/DMARC; do not rely on authentication alone.",
          "Best controls: out-of-band verification, dual authorization, segregation of duties, vendor-change procedures.",
          "Watch for urgency, secrecy, changed bank details, gift cards, and lookalike domains.",
          "Alert on new inbox forwarding rules; enforce MFA on mailboxes.",
          "After fraud: bank recall immediately, report to law enforcement, preserve evidence, clean the mailbox."
        ],
        taglish:
          "Ang BEC, panloloko gamit ang email kung saan nagpapanggap o inaagaw ang account ng pinagkakatiwalaang tao para makakuha ng pera. Madalas walang link o attachment, kaya hindi nahuhuli ng filter. Mga uri: CEO fraud (utos na magpadala ng pera agad), vendor fraud (nagbago raw ang bank details), payroll diversion, at iba pa. Ang pinakamabisang depensa ay proseso: tumawag sa kilalang numero para i-verify, dalawang tao ang aprubahan ng malalaking bayad, at may pormal na proseso sa pagpalit ng bank details. Kung nakapagpadala na ng pera, kontakin agad ang bangko, kasi oras ang pinakamahalaga."
      }
    ],

    d3: [
      {
        id: "d3-t170",
        title: "IPv6 Security: Addressing, Neighbor Discovery, Dual-Stack Risks, and Controls",
        tag: "3.2",
        minutes: 20,
        goal: "Read IPv6 address types, explain how IPv6 neighbor discovery differs from ARP and what attacks target it, and describe the security risks of running IPv4 and IPv6 together.",
        why: "IPv6 is enabled by default on most modern systems even when no one manages it, so it is a blind spot in many networks. Understanding its basics prevents both exam errors and real security gaps.",
        simple:
          "IPv6 uses 128-bit addresses written as eight groups of hexadecimal numbers (for example 2001:db8:0:1::10), where one run of zeros can be shortened with a double colon. Important address types: the loopback address is ::1; LINK-LOCAL addresses (fe80::/10) work only on the local link and every IPv6 interface has one; UNIQUE LOCAL addresses (fc00::/7, in practice fd00::) are the private equivalent of IPv4's 10.x addresses; GLOBAL UNICAST addresses (2000::/3) are routable on the Internet; and MULTICAST addresses (ff00::/8) replace broadcast, which IPv6 does not have. Because IPv6 offers a vast address supply, NAT is not needed, so devices can be reachable end to end. That does NOT mean they should be open: a firewall is still required, and a missing IPv6 firewall rule is a classic exposure. Instead of ARP, IPv6 uses the NEIGHBOR DISCOVERY PROTOCOL (NDP), which runs over ICMPv6 and handles finding neighbors' hardware addresses, discovering routers, and detecting duplicate addresses. Devices can configure themselves automatically through SLAAC (stateless address autoconfiguration) by listening to ROUTER ADVERTISEMENTS, or use DHCPv6. These mechanisms are trusting, which attackers exploit: a ROGUE ROUTER ADVERTISEMENT can make victims use the attacker as their default gateway (enabling on-path attacks), NDP SPOOFING forges neighbor replies much like ARP spoofing, and a rogue DHCPv6 server can hand out malicious settings. The switch defenses parallel IPv4: RA Guard blocks router advertisements on ports where no router should be, DHCPv6 Guard and ND inspection validate those messages, and segmentation limits the blast radius. Another important risk is DUAL STACK: systems run IPv4 and IPv6 together, and if the network's firewalls, intrusion detection, and logging only cover IPv4, IPv6 traffic can bypass them completely, sometimes without administrators knowing it exists. Tunneling technologies (such as Teredo and 6to4) can also carry IPv6 inside IPv4 and slip past controls. The right approach is to manage IPv6 deliberately: apply equivalent firewall policy and monitoring to IPv6, or disable it where it is truly unneeded, rather than ignoring it. Do not block all ICMPv6, because parts of it (neighbor discovery and path MTU discovery) are essential for IPv6 to work; allow what is needed and filter the rest. IPv6 also offers privacy extensions that generate temporary, changing addresses for outbound connections, which helps privacy but complicates tracking a host in logs.",
        deepDive: [
          { h: "Address types at a glance", list: [
            "::1 is loopback (like 127.0.0.1).",
            "fe80::/10 is link-local: automatic, not routable beyond the local link.",
            "fc00::/7 (usually fd00::) is unique local: private addressing within an organization.",
            "2000::/3 is global unicast: routable Internet addresses.",
            "ff00::/8 is multicast; there is no broadcast in IPv6.",
            "A single :: can replace one run of consecutive zero groups, and leading zeros in a group may be dropped."
          ] },
          { h: "NDP replaces ARP", list: [
            "Neighbor Solicitation and Advertisement resolve addresses to hardware addresses (like ARP).",
            "Router Solicitation and Advertisement let hosts find routers and learn prefixes.",
            "Duplicate address detection checks that an address is not already in use.",
            "All of this is unauthenticated by default, so forged messages are accepted unless a control blocks them."
          ] },
          { h: "Attacks against IPv6 on the local network", list: [
            "Rogue router advertisements: attacker becomes the default gateway.",
            "NDP spoofing or cache poisoning: the IPv6 equivalent of ARP spoofing.",
            "Rogue DHCPv6 servers distributing malicious DNS servers.",
            "Reconnaissance with multicast pings to discover hosts.",
            "Extension header tricks that evade simple filters.",
            "Tunneled IPv6 used to bypass IPv4-only controls and for command and control."
          ] },
          { h: "Controls", list: [
            "RA Guard, DHCPv6 Guard, and ND inspection on access switches.",
            "IPv6 firewall rules that match your IPv4 policy; default deny inbound.",
            "IPv6-aware IDS/IPS, logging, and vulnerability scanning.",
            "Block unneeded tunneling protocols at the edge.",
            "Allow required ICMPv6 types (neighbor discovery, path MTU discovery, errors) while blocking the rest at the perimeter.",
            "Keep an inventory that includes IPv6 addresses; disable IPv6 only where you have confirmed it is unneeded."
          ] },
          { h: "Myths", list: [
            "'NAT gives security': NAT is not a firewall; IPv6 without NAT needs proper firewall rules.",
            "'IPv6 is too large to scan': attackers find addresses through DNS, logs, and predictable patterns, so it must still be protected.",
            "'We do not use IPv6': most operating systems enable it by default, so you probably do."
          ] }
        ],
        keyTerms: [
          { term: "IPv6", def: "The 128-bit Internet Protocol version designed to replace IPv4." },
          { term: "Link-Local Address", def: "An fe80::/10 address valid only on the local network segment." },
          { term: "Unique Local Address", def: "An fc00::/7 private address range for use within an organization." },
          { term: "NDP", def: "Neighbor Discovery Protocol: IPv6's replacement for ARP, plus router discovery and autoconfiguration." },
          { term: "SLAAC", def: "Stateless Address Autoconfiguration: hosts configure addresses from router advertisements." },
          { term: "Router Advertisement (RA)", def: "A message in which a router announces its presence and network prefix." },
          { term: "RA Guard", def: "A switch feature that blocks router advertisements from untrusted ports." },
          { term: "Dual Stack", def: "Running IPv4 and IPv6 simultaneously on a device or network." },
          { term: "ICMPv6", def: "The IPv6 version of ICMP, essential to neighbor discovery and path MTU discovery." }
        ],
        analogy:
          "IPv4 is a town where everyone shares a few street numbers behind a gatehouse (NAT). IPv6 gives every house its own globally unique address, so every house can be reached directly from outside. That is only safe if every house has its own lock, a firewall. Neighbor discovery is the street where anyone can shout 'I'm the post office, send your letters to me', which is why you need a rule that only the real post office may make that announcement.",
        technical:
          "A company with an IPv4-only firewall and monitoring discovers that laptops on the corporate Wi-Fi have global IPv6 addresses and are reachable from the Internet on an open management port, bypassing every IPv4 control. The team adds IPv6 firewall rules that mirror the IPv4 policy with default-deny inbound, enables RA Guard and DHCPv6 Guard on access switches after a pen test used a rogue router advertisement to redirect traffic, and extends logging and scanning to cover IPv6. ICMPv6 is allowed only for the required types.",
        table: {
          headers: ["IPv4 concept", "IPv6 equivalent", "Security note"],
          rows: [
            ["ARP", "NDP (over ICMPv6)", "NDP spoofing; use ND inspection"],
            ["DHCP", "SLAAC or DHCPv6", "Rogue router advertisements; use RA Guard, DHCPv6 Guard"],
            ["Private 10.x / 192.168.x", "Unique local fc00::/7", "Still needs firewalling"],
            ["169.254.x.x APIPA", "Link-local fe80::/10", "Present on every IPv6 interface"],
            ["Broadcast", "Multicast ff00::/8", "No broadcast addresses exist"],
            ["NAT for sharing addresses", "Not required", "NAT is not security; use a firewall"],
            ["127.0.0.1", "::1", "Loopback"]
          ]
        },
        confusion: [
          { a: "ARP", b: "NDP", diff: "ARP is IPv4's address resolution. NDP is IPv6's, running over ICMPv6 and also handling router discovery." },
          { a: "Link-local", b: "Unique local", diff: "Link-local (fe80::) works only on one link and is automatic. Unique local (fc00::/7) is private but routable inside an organization." },
          { a: "NAT", b: "Firewall", diff: "NAT translates addresses and is not a security control. A firewall filters traffic by policy; IPv6 devices need one." },
          { a: "Dual stack", b: "Tunneling", diff: "Dual stack runs both protocols natively. Tunneling wraps IPv6 inside IPv4 (or the reverse) and can evade IPv4-only controls." },
          { a: "RA Guard", b: "DHCP snooping", diff: "RA Guard blocks rogue IPv6 router advertisements. DHCP snooping (and DHCPv6 Guard) blocks rogue DHCP servers." }
        ],
        soc: "Analysts should confirm that logs, flow data, and detections include IPv6; attackers often use IPv6 or tunnels precisely because defenders look only at IPv4. Alerts on unexpected router advertisements, new IPv6 prefixes, and traffic over tunneling protocols are valuable, and asset inventories must list IPv6 addresses.",
        patterns: [
          ["fe80:: address", "Link-local IPv6"],
          ["::1", "IPv6 loopback"],
          ["IPv6 equivalent of ARP", "Neighbor Discovery Protocol (NDP)"],
          ["Attacker announces itself as the default gateway via IPv6", "Rogue router advertisement; use RA Guard"],
          ["Traffic bypasses an IPv4-only firewall", "Dual-stack gap; apply IPv6 policy"],
          ["IPv6 has no NAT, so devices are secure", "False: a firewall is still required"],
          ["Block all ICMPv6", "Mistake: neighbor discovery and path MTU discovery need it"],
          ["IPv6 hosts configure addresses from router messages", "SLAAC"]
        ],
        takeaways: [
          "IPv6 is probably running on your network already; manage it or consciously disable it.",
          "NDP is trusting, so use RA Guard, DHCPv6 Guard, and ND inspection.",
          "No NAT does not mean no firewall."
        ],
        remember: [
          "IPv6 = 128-bit hexadecimal addresses. ::1 loopback, fe80::/10 link-local, fc00::/7 unique local, 2000::/3 global, ff00::/8 multicast.",
          "No broadcast in IPv6; multicast is used instead.",
          "NDP (over ICMPv6) replaces ARP and handles router discovery; SLAAC configures addresses from router advertisements.",
          "Attacks: rogue router advertisements, NDP spoofing, rogue DHCPv6. Defenses: RA Guard, DHCPv6 Guard, ND inspection.",
          "Dual stack with IPv4-only firewalls and monitoring leaves IPv6 unprotected.",
          "Do not block all ICMPv6; allow required types.",
          "NAT is not a security control; IPv6 devices need firewall rules."
        ],
        taglish:
          "Ang IPv6 ay 128-bit na address. Tandaan ang mga uri: ::1 (loopback), fe80:: (link-local, sa lokal na network lang), fc00::/7 (parang private), 2000::/3 (pang-Internet), at multicast na pumalit sa broadcast. Ang NDP ang pumalit sa ARP, at madaling lokohin kung walang proteksyon: pwedeng magpanggap na router (rogue RA) ang attacker. Panlaban: RA Guard at ND inspection sa switch. Delikado ang dual-stack kung IPv4 lang ang binabantayan ng firewall at monitoring, kasi dadaan ang IPv6 nang walang nakakakita. At tandaan, walang NAT sa IPv6 pero kailangan pa rin ng firewall."
      },
      {
        id: "d3-t171",
        title: "Firewall Rules and ACLs in Practice: Ordering, Statefulness, and Egress Filtering",
        tag: "3.2",
        minutes: 22,
        goal: "Read and write firewall rules, order them correctly, explain stateless versus stateful filtering, and recognize common rule mistakes.",
        why: "Firewall rule ordering is a favorite performance-based question, and rule mistakes are a leading cause of exposure. A few principles let you answer any ruleset question correctly.",
        simple:
          "A firewall or access control list (ACL) is a list of rules, and each rule says: ACTION (allow or deny), PROTOCOL (TCP, UDP, ICMP), SOURCE address, SOURCE port, DESTINATION address, DESTINATION port, and sometimes DIRECTION (inbound to the network or outbound from it). The device checks packets against the rules from the TOP DOWN and the FIRST MATCHING rule wins; no later rule is consulted. So ORDER matters: specific rules must come before broad ones, or the broad rule will shadow them. At the end sits an IMPLICIT DENY (also called default deny), which drops anything not explicitly allowed; best practice is to make it an explicit final rule so it is visible and can be logged. Rules should follow least privilege: allow only the source, destination, and port that a business need requires, never 'any any'. A STATELESS filter (such as a basic router ACL) judges every packet on its own, so return traffic must be explicitly allowed in the opposite direction. A STATEFUL firewall tracks connections in a state table, so when an internal client opens a connection, the matching return packets are allowed automatically, and unsolicited inbound packets are dropped. Cisco-style STANDARD ACLs filter only by source address and should be placed close to the destination, while EXTENDED ACLs filter by source, destination, protocol, and ports and should be placed close to the source. INGRESS filtering controls what enters your network, including blocking spoofed addresses (packets from outside claiming to come from your internal or private ranges, which cannot be legitimate); EGRESS filtering controls what leaves, and it is underused: restricting outbound traffic to what is needed blocks malware command and control, data exfiltration, and use of your network to attack others. Typical design: allow the Internet to reach a web server on 443 only, allow administrators to reach it on 22 from a management network only, allow the web server to reach its database on one port, allow internal clients out to the Internet on 80 and 443, allow DNS to approved resolvers only, and deny everything else. Common mistakes include an allow-any rule placed too high, shadowed or redundant rules, leftover temporary rules, management interfaces exposed to the Internet, and rules nobody can explain. Mitigate with documentation, change management, periodic rule reviews, and logging of denied traffic.",
        deepDive: [
          { h: "Rule anatomy", list: [
            "Action: allow or deny (some devices also have reject or drop).",
            "Protocol: TCP, UDP, ICMP, or IP (any).",
            "Source and destination: single address, subnet (for example 10.1.5.0/24), or any.",
            "Ports: single, range, or any; source ports are usually random high ports on the client side.",
            "Direction and interface: inbound or outbound on a specific interface.",
            "Logging: whether matches are recorded."
          ] },
          { h: "Worked example: ordering matters", p: "A web server at 203.0.113.10 in a screened subnet needs: HTTPS from anyone, SSH only from the admin network 10.1.5.0/24, and nothing else. Correct order: (1) Allow TCP from 10.1.5.0/24 to 203.0.113.10 port 22; (2) Allow TCP from any to 203.0.113.10 port 443; (3) Deny any any (log). Mistake: placing 'Deny any any' first blocks everything; placing 'Allow TCP any to 203.0.113.10 port any' first exposes SSH to the whole Internet because the narrower SSH rule is never reached." },
          { h: "Worked example: shadowed rule", p: "Rules: (1) Allow any any; (2) Deny TCP any to any port 23. Telnet is still allowed because rule 1 matches everything first, so rule 2 can never take effect. The fix is to put the deny above the allow, and then to replace allow-any with specific allows and a final deny." },
          { h: "Stateless versus stateful", list: [
            "Stateless: each packet is checked alone; you must write rules for both directions of a conversation.",
            "Stateful: tracks connection state; return traffic of an allowed outbound connection is permitted automatically; unsolicited inbound is dropped.",
            "Application-aware (next-generation) firewalls add awareness of applications and users on top of state."
          ] },
          { h: "Ingress and egress filtering", list: [
            "Ingress: drop packets from outside that claim an internal or private source address, and block inbound traffic to management ports.",
            "Egress: allow only required outbound traffic (for example web and DNS from specific hosts); this limits command and control and exfiltration.",
            "Block outbound SMTP from everything except mail servers to prevent spam relaying.",
            "Egress filtering also helps prevent your network from being used to launch attacks."
          ] },
          { h: "Rule hygiene", list: [
            "Use clear object names and comments explaining each rule's purpose and owner.",
            "Review rules regularly and remove unused, expired, or duplicate ones.",
            "Test changes in a safe way and run them through change management.",
            "Log denied traffic and important allows, and monitor the logs.",
            "Avoid 'any' in source, destination, or port wherever possible."
          ] },
          { h: "Standard versus extended ACLs", list: [
            "Standard ACL: source address only; place close to the destination.",
            "Extended ACL: source, destination, protocol, and port; place close to the source.",
            "Numbered or named ACLs are evaluated top-down; each interface and direction can have one ACL per protocol."
          ] }
        ],
        keyTerms: [
          { term: "ACL", def: "Access Control List: an ordered list of allow and deny rules." },
          { term: "First Match Wins", def: "Rules are evaluated top to bottom and the first matching rule is applied." },
          { term: "Implicit Deny", def: "Traffic not explicitly allowed is denied by default." },
          { term: "Stateful Firewall", def: "A firewall that tracks connection state and automatically permits return traffic." },
          { term: "Stateless Filter", def: "A filter that evaluates each packet independently." },
          { term: "Ingress Filtering", def: "Controlling traffic entering a network, including blocking spoofed sources." },
          { term: "Egress Filtering", def: "Controlling traffic leaving a network to limit exfiltration and command and control." },
          { term: "Shadowed Rule", def: "A rule that can never match because an earlier rule already matches the same traffic." },
          { term: "Standard / Extended ACL", def: "ACL by source only versus by source, destination, protocol, and ports." },
          { term: "Anti-Spoofing", def: "Blocking packets whose source address cannot be valid for the interface they arrive on." }
        ],
        analogy:
          "A ruleset is a bouncer's list read from the top. The first line that matches the person at the door decides their fate and the bouncer stops reading. If the first line says 'let everyone in', the later lines banning troublemakers never get read. The last line, 'anyone not on the list is refused', is the implicit deny. A stateful bouncer remembers who left to get a coffee and lets them back in, while a stateless one asks for the full story every time.",
        technical:
          "An administrator is asked to publish a web server and nothing else. The final ruleset is: (1) allow TCP from the management subnet to the server on 22; (2) allow TCP from any to the server on 443; (3) allow the server to reach the database server on 1433 only; (4) allow outbound DNS to the two approved resolvers; (5) deny all and log. During a review, a temporary 'allow any to server any port' rule from a past project is found above these, silently overriding the restrictions; it is deleted and the review is added to the quarterly checklist.",
        table: {
          headers: ["Rule #", "Action", "Protocol", "Source", "Destination", "Port"],
          rows: [
            ["1", "Allow", "TCP", "10.1.5.0/24 (admin network)", "203.0.113.10 (web server)", "22"],
            ["2", "Allow", "TCP", "Any", "203.0.113.10", "443"],
            ["3", "Allow", "TCP", "203.0.113.10", "10.2.0.20 (database)", "1433"],
            ["4", "Allow", "UDP/TCP", "203.0.113.10", "10.0.0.53 (approved DNS)", "53"],
            ["5", "Deny + log", "Any", "Any", "Any", "Any"]
          ]
        },
        confusion: [
          { a: "Stateful", b: "Stateless", diff: "Stateful firewalls remember connections so return traffic is allowed automatically. Stateless filters need explicit rules for both directions." },
          { a: "Ingress", b: "Egress", diff: "Ingress filters traffic coming IN. Egress filters traffic going OUT, which stops exfiltration and malware calling home." },
          { a: "Implicit deny", b: "Explicit deny", diff: "Implicit deny is the built-in default at the end. An explicit deny-all rule is one you write so it is visible and can be logged." },
          { a: "Standard ACL", b: "Extended ACL", diff: "Standard filters by source only. Extended filters by source, destination, protocol, and ports." },
          { a: "Specific rule first", b: "Broad rule first", diff: "Because the first match wins, specific rules must come first. A broad rule placed first shadows everything beneath it." }
        ],
        soc: "Firewall logs are only meaningful if the rules are sound. Analysts rely on denied-traffic logs to see scans and exfiltration attempts, and on egress rules to make suspicious outbound connections stand out. Rule reviews and change records also let responders quickly see whether an exposure was an attacker's doing or a misconfiguration.",
        patterns: [
          ["Firewall evaluates rules from top to bottom", "First match wins"],
          ["Traffic not explicitly allowed is dropped", "Implicit (default) deny"],
          ["Allow any any placed at the top", "Shadows later rules; major misconfiguration"],
          ["Return traffic allowed automatically for outbound connections", "Stateful inspection"],
          ["Need rules for both directions of a conversation", "Stateless packet filter"],
          ["Block outbound traffic except what is needed to stop malware callbacks", "Egress filtering"],
          ["Drop outside packets claiming internal source addresses", "Anti-spoofing (ingress filtering)"],
          ["Place an extended ACL near the source", "Extended ACL placement"]
        ],
        takeaways: [
          "First match wins, so specific rules go first and a deny-all goes last.",
          "Use least privilege in every rule and avoid 'any'.",
          "Filter egress as well as ingress, and review rules regularly."
        ],
        remember: [
          "Rules are checked top to bottom; first match wins. Specific before general; deny all last.",
          "Implicit deny drops anything not allowed; write it explicitly and log it.",
          "Stateful = tracks connections, allows return traffic. Stateless = checks each packet alone.",
          "Standard ACL = source only (place near destination). Extended ACL = source, destination, ports (place near source).",
          "Ingress: block spoofed internal sources and management ports. Egress: limit outbound to needs.",
          "Common mistakes: allow-any too high, shadowed or leftover rules, exposed management interfaces.",
          "Document, review, and log; change rules through change management."
        ],
        taglish:
          "Ang firewall rules ay binabasa mula taas pababa at ang unang tumugma ang susundin, kaya mahalaga ang pagkakasunod-sunod: mga tiyak na rule muna, pangkalahatan pagkatapos, at deny-all sa dulo. Ang stateful firewall, naaalala nito ang koneksyon kaya awtomatikong pinapayagan ang pabalik na traffic; ang stateless, kailangan ng rule sa dalawang direksyon. Huwag kalimutan ang egress filtering: limitahan din ang palabas para mahadlangan ang malware na tumatawag sa attacker at ang pagnanakaw ng datos. At iwasan ang 'allow any any', lalo na sa itaas, dahil nakakabaon ito sa lahat ng sumusunod na rule."
      }
    ],

    d4: [
      {
        id: "d4-t170",
        title: "Wireless Authentication Deep Dive: WPA2, WPA3, EAP Methods, and Wi-Fi Attacks",
        tag: "4.1",
        minutes: 22,
        goal: "Compare WPA2 and WPA3, personal and enterprise modes, the main EAP methods, and the common attacks against Wi-Fi along with their defenses.",
        why: "Wireless is both widely deployed and widely attacked. The exam expects you to pair the right authentication method and protocol with each scenario and to name the attack from its description.",
        simple:
          "Wi-Fi security has evolved. WEP used the weak RC4 cipher with a flawed initialization vector and can be broken in minutes; it is obsolete. WPA used TKIP as a stopgap and is also deprecated. WPA2 uses AES with CCMP and is secure when configured well; WPA3 adds improvements: SAE (Simultaneous Authentication of Equals) replaces the pre-shared-key handshake so that captured traffic cannot be used for offline password guessing, each session gets forward secrecy, protected management frames are mandatory, and OWE (Opportunistic Wireless Encryption, branded Enhanced Open) encrypts open networks such as guest Wi-Fi without a password. There are two operating modes. PERSONAL mode uses a shared passphrase (PSK) known to everyone, which is simple but weak at scale: anyone with the passphrase can often decrypt other users' traffic in WPA2, a departing employee keeps access until the key changes, and an attacker who captures the four-way handshake can try passwords offline. ENTERPRISE mode uses 802.1X: each user or device authenticates individually to a RADIUS server through the access point, using an EAP (Extensible Authentication Protocol) method, so access can be revoked per user and credentials are not shared. The EAP methods differ in strength. EAP-TLS uses certificates on both the server and the client (mutual authentication), is the strongest, and avoids passwords but requires a PKI. PEAP creates a TLS tunnel using only a server certificate and then authenticates the user inside it with a password (typically MS-CHAPv2), so it is easier to deploy. EAP-TTLS is similar, tunneling a variety of inner methods. EAP-FAST is Cisco's tunneled method using protected access credentials, and LEAP is an old Cisco method that is broken and should not be used. Attacks include the EVIL TWIN (an attacker's access point copying a legitimate SSID, often with a stronger signal, to lure users and capture credentials or traffic), ROGUE access points (an unauthorized AP plugged into the corporate network, creating a back door), DEAUTHENTICATION attacks (forged management frames that disconnect clients, forcing reconnects to capture handshakes or push them to an evil twin; prevented by protected management frames, 802.11w), WPS PIN brute force (the PIN's design lets it be guessed in hours, so disable WPS), KRACK (a 2017 key reinstallation attack on the WPA2 handshake, fixed with software updates), and jamming (radio interference causing denial of service). Defenses include WPA3 or WPA2-Enterprise, EAP-TLS where possible, validating the RADIUS server's certificate on clients, wireless intrusion prevention (WIPS) to detect rogue and evil twin APs, separate guest and corporate networks on different VLANs, client isolation, strong passphrases for any PSK, and regular site surveys. Hiding the SSID and MAC address filtering are not real security controls because both are trivial to bypass.",
        deepDive: [
          { h: "Protocol progression", list: [
            "WEP: RC4 with a weak IV; broken; never use.",
            "WPA (TKIP): temporary fix; deprecated.",
            "WPA2: AES-CCMP; Personal (PSK) or Enterprise (802.1X).",
            "WPA3: SAE handshake, forward secrecy, mandatory protected management frames, stronger enterprise suite, and OWE for open networks."
          ] },
          { h: "Why WPA3-SAE is better than WPA2-PSK", list: [
            "WPA2-PSK: a captured handshake can be attacked offline with a dictionary, so a weak passphrase is cracked quickly.",
            "SAE: each guess requires interacting with the network, so offline guessing is not possible.",
            "Forward secrecy: a later passphrase compromise does not decrypt past captured traffic.",
            "Individualized data encryption keys even with a shared passphrase."
          ] },
          { h: "802.1X components", list: [
            "Supplicant: the client device.",
            "Authenticator: the access point or switch relaying the exchange.",
            "Authentication server: usually RADIUS, which checks credentials or certificates.",
            "The client should validate the RADIUS server's certificate; otherwise an evil twin can harvest credentials."
          ] },
          { h: "EAP methods compared", list: [
            "EAP-TLS: mutual certificate authentication; strongest; needs client certificates (PKI).",
            "PEAP: server certificate creates a tunnel; user password inside (MS-CHAPv2); common in Windows environments.",
            "EAP-TTLS: tunneled; supports several inner methods.",
            "EAP-FAST: Cisco tunneled method using protected access credentials.",
            "LEAP: obsolete and broken; do not use."
          ] },
          { h: "Wi-Fi attacks and countermeasures", list: [
            "Evil twin: WIPS detection, WPA3/802.1X with server certificate validation, user training.",
            "Rogue AP: scan for unauthorized APs, use port security and 802.1X on wired ports, WIPS.",
            "Deauthentication: protected management frames (802.11w, mandatory in WPA3).",
            "WPS PIN attack: disable WPS.",
            "KRACK: patch clients and access points.",
            "Jamming: physical response and spectrum monitoring; difficult to prevent entirely.",
            "Captive portal phishing: do not enter corporate credentials on open guest networks; use a VPN."
          ] },
          { h: "Design and operations", list: [
            "Site surveys and heat maps to place access points and channels sensibly.",
            "Separate SSIDs and VLANs for corporate, guest, and IoT devices.",
            "Client isolation on guest networks so users cannot reach each other.",
            "Use strong, unique passphrases and rotate PSKs when people leave.",
            "Monitor with a wireless IPS and review logs from controllers and RADIUS."
          ] }
        ],
        keyTerms: [
          { term: "WPA2 / WPA3", def: "Wi-Fi security standards; WPA3 adds SAE, forward secrecy, mandatory protected management frames, and OWE." },
          { term: "SAE", def: "Simultaneous Authentication of Equals: WPA3's handshake that resists offline password guessing." },
          { term: "OWE", def: "Opportunistic Wireless Encryption: encrypts open networks without a password." },
          { term: "PSK (Personal)", def: "Pre-shared key mode using one passphrase for everyone." },
          { term: "802.1X", def: "Port-based network access control using an authenticator and authentication server." },
          { term: "EAP-TLS", def: "Authentication using certificates on both client and server; strongest EAP method." },
          { term: "PEAP", def: "EAP method that tunnels a password-based inner method inside TLS using a server certificate." },
          { term: "Evil Twin", def: "A rogue access point imitating a legitimate network to capture traffic or credentials." },
          { term: "Deauthentication Attack", def: "Forged management frames that disconnect clients; countered by 802.11w." },
          { term: "WPS", def: "Wi-Fi Protected Setup: a PIN-based convenience feature with known weaknesses." },
          { term: "WIPS", def: "Wireless Intrusion Prevention System: detects and blocks rogue and malicious wireless activity." }
        ],
        analogy:
          "WPA2-Personal is a single house key copied for everyone in the family and every visitor: easy, but if one copy is lost or someone moves out you must change the lock for everyone. Enterprise mode gives each person their own key card that can be cancelled individually. EAP-TLS is a key card plus the building proving its own identity to you. An evil twin is a fake front door built next to the real one with the same sign, ready to collect everyone's belongings.",
        technical:
          "A company replaces its single shared Wi-Fi passphrase with WPA2-Enterprise using EAP-TLS: managed laptops receive certificates through the device management system, the RADIUS server presents its own certificate and clients are configured to validate it, and a departing employee's certificate is revoked immediately. Guest Wi-Fi uses a separate SSID on an isolated VLAN with client isolation, and a wireless IPS alerts when an unknown access point broadcasts the corporate SSID, which later turns out to be an employee's personal hotspot configured with the same name.",
        table: {
          headers: ["Method", "Authenticates with", "Strength", "Notes"],
          rows: [
            ["WPA2-Personal", "Shared passphrase", "Moderate to weak at scale", "Offline guessing of captured handshake"],
            ["WPA3-Personal (SAE)", "Shared passphrase, stronger handshake", "Better", "Resists offline guessing; forward secrecy"],
            ["WPA2/WPA3-Enterprise + EAP-TLS", "Client and server certificates", "Strongest", "Needs PKI"],
            ["Enterprise + PEAP", "Server certificate + user password", "Good if server cert validated", "Easier to deploy"],
            ["Enterprise + EAP-TTLS", "Server certificate + inner method", "Good", "Flexible inner methods"],
            ["Open + OWE", "None (encrypts anyway)", "Protects against passive eavesdropping", "No authentication of users"],
            ["WEP / LEAP", "Broken", "None", "Obsolete"]
          ]
        },
        confusion: [
          { a: "Evil twin", b: "Rogue access point", diff: "An evil twin imitates a legitimate SSID to lure users. A rogue AP is an unauthorized access point connected to your network, creating a back door." },
          { a: "WPA2-Personal", b: "WPA2-Enterprise", diff: "Personal uses one shared passphrase. Enterprise uses 802.1X with individual credentials through RADIUS." },
          { a: "EAP-TLS", b: "PEAP", diff: "EAP-TLS needs certificates on both client and server. PEAP needs a certificate only on the server and uses a password inside the tunnel." },
          { a: "WPA3 SAE", b: "WPA2 PSK handshake", diff: "SAE prevents offline guessing of the passphrase and provides forward secrecy. The WPA2 handshake can be captured and attacked offline." },
          { a: "Hiding the SSID", b: "Encryption", diff: "Hiding an SSID only conceals its name and is easily discovered. It is not a security control; encryption and authentication are." }
        ],
        soc: "Wireless alerts include a new access point broadcasting a corporate SSID, bursts of deauthentication frames, repeated 802.1X failures for one user, and clients associating with an unexpected BSSID. RADIUS logs link wireless sessions to individual users, which makes investigation far easier than with a shared passphrase.",
        patterns: [
          ["Access point copies the corporate SSID with a stronger signal", "Evil twin"],
          ["Employee plugs an unauthorized AP into a wall jack", "Rogue access point"],
          ["Forged frames disconnect users from Wi-Fi", "Deauthentication attack; use 802.11w / WPA3"],
          ["Each user authenticates individually through RADIUS", "WPA2/WPA3-Enterprise (802.1X)"],
          ["Mutual certificate authentication for wireless", "EAP-TLS"],
          ["Server certificate and password inside a TLS tunnel", "PEAP"],
          ["Open guest network needs encryption without a password", "OWE (Enhanced Open)"],
          ["PIN-based setup feature that can be brute forced", "WPS; disable it"]
        ],
        takeaways: [
          "Prefer WPA3, or WPA2-Enterprise, and use EAP-TLS where a PKI is available.",
          "Clients must validate the RADIUS server certificate, or evil twins win.",
          "WIPS, protected management frames, and disabling WPS address the most common attacks."
        ],
        remember: [
          "WEP and WPA/TKIP are obsolete. WPA2 = AES-CCMP. WPA3 = SAE, forward secrecy, mandatory protected management frames, OWE.",
          "Personal = shared PSK. Enterprise = 802.1X with RADIUS and an EAP method.",
          "EAP-TLS = client and server certificates (strongest). PEAP = server certificate + password in a tunnel. LEAP is broken.",
          "Evil twin = fake AP with the real SSID. Rogue AP = unauthorized AP on your network.",
          "Deauthentication attacks are stopped by protected management frames (802.11w).",
          "Disable WPS. Hiding the SSID and MAC filtering are not real security.",
          "KRACK attacked the WPA2 handshake; patching fixes it."
        ],
        taglish:
          "Obsolete na ang WEP at WPA/TKIP. Ang WPA2 gumagamit ng AES; ang WPA3 may SAE (hindi na pwedeng i-guess offline ang password), forward secrecy, at OWE para sa open network. Ang Personal mode, iisang password para sa lahat. Ang Enterprise mode, bawat user ay may sariling login sa RADIUS (802.1X). Sa EAP: EAP-TLS ay certificate sa client at server (pinakamatibay), PEAP ay server certificate lang at password sa loob ng tunnel. Mga atake: evil twin (pekeng AP na kapareho ang SSID), rogue AP (hindi awtorisadong AP sa network), at deauth. Huwag gumamit ng WPS, at ang pagtatago ng SSID ay hindi tunay na proteksyon."
      },
      {
        id: "d4-t171",
        title: "Threat Modeling in Practice: STRIDE, DREAD, PASTA, and Attack Trees",
        tag: "4.8",
        minutes: 20,
        goal: "Use the STRIDE categories to find threats in a design, relate each to the security property it violates, and compare STRIDE, DREAD, PASTA, attack trees, the kill chain, and ATT&CK.",
        why: "Threat modeling finds design flaws before code exists, when they are cheapest to fix. STRIDE is the most widely taught method, and each of its letters maps neatly onto a security property that the exam loves to test.",
        simple:
          "Threat modeling is a structured way to ask: what are we building, what can go wrong, what will we do about it, and did we do a good job? The process usually starts with a DATA FLOW DIAGRAM showing external entities, processes, data stores, the flows between them, and the TRUST BOUNDARIES where the level of trust changes (for example between the Internet and a web server). Each element and each boundary crossing is then examined for threats. The classic checklist is STRIDE, and each letter violates a specific security property. SPOOFING is pretending to be someone or something else, a violation of AUTHENTICATION (defend with strong authentication and MFA). TAMPERING is modifying data or code without permission, a violation of INTEGRITY (defend with hashing, digital signatures, integrity checks, and access control). REPUDIATION is denying an action took place, a violation of NON-REPUDIATION (defend with audit logs, digital signatures, and protected timestamps). INFORMATION DISCLOSURE is exposing data to people who should not see it, a violation of CONFIDENTIALITY (defend with encryption and access control). DENIAL OF SERVICE is making a system unavailable, a violation of AVAILABILITY (defend with redundancy, rate limiting, and capacity planning). ELEVATION OF PRIVILEGE is gaining capabilities beyond what was granted, a violation of AUTHORIZATION (defend with least privilege, input validation, and sandboxing). Once threats are found, they are rated and prioritized. DREAD is an older scoring scheme that rates a threat on Damage potential, Reproducibility, Exploitability, Affected users, and Discoverability; it is subjective and largely replaced by other approaches but still appears in study material. PASTA (Process for Attack Simulation and Threat Analysis) is a seven-stage, risk-centric method that links technical threats to business objectives. An ATTACK TREE places the attacker's goal at the root and branches into the alternative ways to achieve it, with AND and OR relationships, so defenders can see the cheapest path and where to place controls. Related frameworks work at different points: the CYBER KILL CHAIN describes the stages of an intrusion (reconnaissance, weaponization, delivery, exploitation, installation, command and control, actions on objectives), the DIAMOND MODEL relates adversary, capability, infrastructure, and victim, and MITRE ATT&CK catalogs real-world attacker tactics and techniques and is used for detection and defense planning. STRIDE is a design-time method for finding what could go wrong; ATT&CK and the kill chain describe how real attacks unfold.",
        deepDive: [
          { h: "STRIDE with the property it breaks and typical controls", list: [
            "Spoofing -> Authentication -> MFA, certificates, strong session handling.",
            "Tampering -> Integrity -> hashing, digital signatures, permissions, secure channels.",
            "Repudiation -> Non-repudiation -> logging, audit trails, digital signatures, time sync.",
            "Information disclosure -> Confidentiality -> encryption, access control, data minimization.",
            "Denial of service -> Availability -> redundancy, rate limiting, scaling, filtering.",
            "Elevation of privilege -> Authorization -> least privilege, validation, isolation."
          ] },
          { h: "The process in four questions", list: [
            "What are we building? Draw the data flow diagram and mark trust boundaries.",
            "What can go wrong? Apply STRIDE to each element and boundary crossing.",
            "What are we going to do about it? Choose mitigations, accept, transfer, or avoid.",
            "Did we do a good job? Validate with review, testing, and re-model when the design changes."
          ] },
          { h: "Data flow diagram elements", list: [
            "External entity: a user or outside system.",
            "Process: code that transforms data.",
            "Data store: database, file, or queue.",
            "Data flow: movement of data between elements.",
            "Trust boundary: where the trust level changes; the most interesting place to look for threats."
          ] },
          { h: "Rating and prioritizing", list: [
            "DREAD: Damage, Reproducibility, Exploitability, Affected users, Discoverability (scored per threat).",
            "Risk-based approaches rate likelihood and impact and link to business objectives (PASTA).",
            "Use whichever approach is consistent and understood by the team; the value is in the discussion."
          ] },
          { h: "Attack trees", list: [
            "Root = attacker's goal (for example 'steal customer database').",
            "Child nodes = ways to achieve it; OR nodes mean any one is enough, AND nodes mean all are needed.",
            "Annotate nodes with cost, difficulty, or likelihood to find the easiest path.",
            "Place defenses at the choke points that cut off the most or cheapest paths."
          ] },
          { h: "How the frameworks differ", list: [
            "STRIDE: design-time categories of threats.",
            "DREAD: scoring scheme for threat severity (older, subjective).",
            "PASTA: seven-stage, risk-centric, attacker-focused methodology.",
            "Attack trees: visual breakdown of how a goal could be achieved.",
            "Cyber kill chain: stages of an intrusion; helps decide where to disrupt it.",
            "Diamond model: relationships among adversary, capability, infrastructure, victim.",
            "MITRE ATT&CK: knowledge base of real attacker tactics, techniques, and procedures."
          ] }
        ],
        keyTerms: [
          { term: "Threat Modeling", def: "A structured process for identifying and prioritizing threats to a system, ideally during design." },
          { term: "STRIDE", def: "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege." },
          { term: "DREAD", def: "Damage, Reproducibility, Exploitability, Affected users, Discoverability: a threat rating scheme." },
          { term: "PASTA", def: "Process for Attack Simulation and Threat Analysis: a seven-stage, risk-centric threat modeling method." },
          { term: "Attack Tree", def: "A diagram with the attacker's goal at the root and branches showing ways to achieve it." },
          { term: "Data Flow Diagram", def: "A diagram of entities, processes, data stores, and flows used in threat modeling." },
          { term: "Trust Boundary", def: "A point in a system where the level of trust changes." },
          { term: "Cyber Kill Chain", def: "A model of the stages of an intrusion from reconnaissance to actions on objectives." },
          { term: "Diamond Model", def: "A model relating adversary, capability, infrastructure, and victim." },
          { term: "MITRE ATT&CK", def: "A knowledge base of adversary tactics and techniques observed in the real world." }
        ],
        analogy:
          "Threat modeling is walking through a building plan with a burglar's eyes before it is built. You mark every door and window (trust boundaries), then for each opening ask the six STRIDE questions: could someone pretend to be the owner, alter the contents, deny they were ever inside, read what they should not, block the entrance for everyone, or talk their way into rooms they should not enter? Fixing a door on paper costs far less than after the building is finished.",
        technical:
          "A team designing an online ordering system draws a data flow diagram with the customer browser, a web application, an order database, and a payment provider, and marks the Internet-to-web-server and web-server-to-database boundaries. Applying STRIDE to the login flow finds spoofing (stolen credentials: add MFA), tampering (modified order totals in the browser: verify prices on the server), repudiation (customers disputing orders: add audit logs and signed confirmations), information disclosure (card data in logs: mask and encrypt), denial of service (floods of login requests: rate limit), and elevation of privilege (customers calling admin APIs: enforce authorization on every endpoint). The findings become tickets and security requirements before any code is written.",
        table: {
          headers: ["STRIDE threat", "Property violated", "Example", "Typical control"],
          rows: [
            ["Spoofing", "Authentication", "Using a stolen password", "MFA, certificates"],
            ["Tampering", "Integrity", "Changing order price in transit", "Digital signatures, integrity checks, server-side validation"],
            ["Repudiation", "Non-repudiation", "'I never placed that order'", "Audit logs, signed receipts"],
            ["Information disclosure", "Confidentiality", "Database dump exposed", "Encryption, access control"],
            ["Denial of service", "Availability", "Request flood", "Rate limiting, redundancy"],
            ["Elevation of privilege", "Authorization", "User calls an admin function", "Least privilege, authorization checks"]
          ]
        },
        confusion: [
          { a: "STRIDE", b: "DREAD", diff: "STRIDE CATEGORIZES the kinds of threats. DREAD SCORES how serious a threat is." },
          { a: "STRIDE", b: "MITRE ATT&CK", diff: "STRIDE is used at design time to find what could go wrong. ATT&CK describes real attacker techniques observed in the wild, used for detection and defense." },
          { a: "Spoofing", b: "Tampering", diff: "Spoofing is pretending to be someone else (authentication). Tampering is changing data or code (integrity)." },
          { a: "Repudiation", b: "Information disclosure", diff: "Repudiation is denying an action took place (non-repudiation). Information disclosure is exposing data (confidentiality)." },
          { a: "Attack tree", b: "Data flow diagram", diff: "An attack tree decomposes an attacker's goal into paths. A data flow diagram shows how the system moves data and where trust changes." }
        ],
        soc: "Threat models guide where to put detection: the trust boundaries and high-value data stores identified in a model are the places where logging and alerts matter most. Findings from real incidents also feed back into the model, since each incident is evidence that a threat was underestimated.",
        patterns: [
          ["Attacker pretends to be a legitimate user", "Spoofing (authentication)"],
          ["Attacker changes data in transit or at rest", "Tampering (integrity)"],
          ["User denies performing an action", "Repudiation (non-repudiation)"],
          ["Sensitive data exposed to unauthorized people", "Information disclosure (confidentiality)"],
          ["Service made unavailable", "Denial of service (availability)"],
          ["Normal user gains administrator rights", "Elevation of privilege (authorization)"],
          ["Rating Damage, Reproducibility, Exploitability, Affected users, Discoverability", "DREAD"],
          ["Diagram with the attacker's goal at the root", "Attack tree"]
        ],
        takeaways: [
          "STRIDE maps six threat types onto six security properties.",
          "Threat model at design time, around data flows and trust boundaries.",
          "STRIDE finds what could go wrong; ATT&CK and the kill chain describe how real attacks unfold."
        ],
        remember: [
          "STRIDE: Spoofing (authentication), Tampering (integrity), Repudiation (non-repudiation), Information disclosure (confidentiality), Denial of service (availability), Elevation of privilege (authorization).",
          "Start with a data flow diagram and mark trust boundaries.",
          "Four questions: what are we building, what can go wrong, what will we do, did we do well?",
          "DREAD = Damage, Reproducibility, Exploitability, Affected users, Discoverability (scoring).",
          "PASTA = seven-stage, risk-centric method. Attack tree = attacker's goal as root with AND/OR branches.",
          "Kill chain = stages of an intrusion. ATT&CK = catalog of real attacker techniques. Diamond = adversary, capability, infrastructure, victim.",
          "Model early: design flaws are cheapest to fix before code is written."
        ],
        taglish:
          "Ang threat modeling ay pag-iisip na parang magnanakaw habang nasa plano pa lang ang sistema. Gumuhit ng data flow diagram at markahan ang trust boundaries. Gamitin ang STRIDE: Spoofing (pagpapanggap, authentication), Tampering (pagbabago ng data, integrity), Repudiation (pagtanggi na ginawa, non-repudiation), Information disclosure (pagtagas, confidentiality), Denial of service (availability), at Elevation of privilege (authorization). Ang DREAD ay pang-scoring ng bigat ng banta. Ang attack tree, nasa ugat ang layunin ng attacker at sanga-sanga ang paraan. Ang STRIDE ay panghanap ng posibleng problema; ang ATT&CK at kill chain ay naglalarawan kung paano talaga umaatake ang mga attacker."
      }
    ]
  },

  tips: {
    "d2-t170": "When money moves because of an email and there is no malware, the best answer is a process control: verify out of band using a known phone number, require dual authorization, and follow a bank-detail change procedure. Passing SPF/DKIM/DMARC does not make a request legitimate if the real mailbox was compromised.",
    "d3-t170": "Three IPv6 facts earn most points: no broadcast (multicast instead), NDP replaces ARP and is attacked with rogue router advertisements (defense: RA Guard), and NAT is not a firewall. fe80:: is link-local and ::1 is loopback.",
    "d3-t171": "For any ruleset question, read top to bottom and stop at the first match. Put specific allows first, the deny-all last, and watch for an 'allow any any' above a deny, which makes the deny useless.",
    "d4-t170": "Match the scenario to the wireless term: fake AP with the real SSID = evil twin, unauthorized AP on the wired network = rogue AP, forged disconnect frames = deauthentication (fix with 802.11w/WPA3), individual logins via RADIUS = 802.1X Enterprise, mutual certificates = EAP-TLS.",
    "d4-t171": "Map each STRIDE letter to the property it breaks: Spoofing = authentication, Tampering = integrity, Repudiation = non-repudiation, Information disclosure = confidentiality, Denial of service = availability, Elevation of privilege = authorization."
  },

  summaries: {
    "d2-t170": "Business email compromise uses impersonation or a hijacked mailbox, usually with no malware, to trick staff into moving money, so verification through a second channel and dual approval are the key defenses.",
    "d3-t170": "IPv6 uses 128-bit addresses and neighbor discovery instead of ARP, is often enabled without being managed, and needs RA Guard, matching firewall policy, and monitoring just like IPv4.",
    "d3-t171": "Firewall rules are read top to bottom with the first match winning, so specific rules go first, a deny-all goes last, and egress filtering is as important as ingress.",
    "d4-t170": "Strong Wi-Fi uses WPA3 or WPA2-Enterprise with 802.1X and EAP-TLS, validates the RADIUS server, and defends against evil twins, rogue access points, and deauthentication attacks.",
    "d4-t171": "STRIDE finds six kinds of threats in a design from a data flow diagram, each tied to the security property it violates, while DREAD, PASTA, attack trees, and ATT&CK help rate threats and understand real attacks."
  },

  questions: [
    {
      id: "q-x-d2-11", domainId: "d2", tag: "d2-t170", type: "single",
      prompt: "An accounts payable clerk receives an email from a vendor's real-looking address saying its bank details have changed, with an updated invoice attached. What is the BEST action before making any payment change?",
      choices: [
        { id: "a", text: "Verify the change by calling the vendor on a known phone number from the vendor master file" },
        { id: "b", text: "Reply to the email asking for confirmation" },
        { id: "c", text: "Call the phone number in the email's signature" },
        { id: "d", text: "Make the payment now to avoid late fees and verify later" }
      ],
      correct: "a",
      explanation: "Out-of-band verification through a known, independently sourced contact detail is the standard control against invoice and vendor fraud.",
      distractorExplanations: {
        b: "Replying uses the same email channel, which the attacker may control.",
        c: "A phone number in the suspicious email's signature may belong to the attacker.",
        d: "Paying first and verifying later risks an unrecoverable fraudulent transfer."
      }
    },
    {
      id: "q-x-d2-12", domainId: "d2", tag: "d2-t170", type: "single",
      prompt: "A finance employee sends a large wire transfer after an urgent, confidential email that appears to come from the CEO's real account. The account had been compromised through a phished password. Which control would MOST directly have prevented the loss?",
      choices: [
        { id: "a", text: "Dual authorization and callback verification for wire transfers" },
        { id: "b", text: "A stronger spam filter" },
        { id: "c", text: "Blocking all email attachments" },
        { id: "d", text: "A longer email signature" }
      ],
      correct: "a",
      explanation: "Because the message came from a genuinely compromised account, process controls such as dual approval and verification through a separate channel are the most effective.",
      distractorExplanations: {
        b: "A spam filter is unlikely to stop a short, plain message from a legitimate internal account.",
        c: "The attack did not rely on attachments.",
        d: "An email signature has no effect on whether fraud succeeds."
      }
    },
    {
      id: "q-x-d3-13", domainId: "d3", tag: "d3-t170", type: "single",
      prompt: "Which IPv6 protocol replaces ARP for resolving neighbor hardware addresses?",
      choices: [
        { id: "a", text: "Neighbor Discovery Protocol (NDP)" },
        { id: "b", text: "DHCPv6" },
        { id: "c", text: "ICMP echo" },
        { id: "d", text: "SLAAC" }
      ],
      correct: "a",
      explanation: "NDP, which runs over ICMPv6, handles address resolution, router discovery, and duplicate address detection in IPv6.",
      distractorExplanations: {
        b: "DHCPv6 assigns configuration information, not hardware address resolution.",
        c: "ICMP echo is used for ping, not address resolution.",
        d: "SLAAC is a method for hosts to build their own addresses from router advertisements."
      }
    },
    {
      id: "q-x-d3-14", domainId: "d3", tag: "d3-t170", type: "single",
      prompt: "An attacker on the local network sends forged IPv6 router advertisements so victims adopt the attacker's machine as their default gateway. Which switch feature BEST defends against this?",
      choices: [
        { id: "a", text: "RA Guard" },
        { id: "b", text: "Port mirroring" },
        { id: "c", text: "Spanning tree root bridge election" },
        { id: "d", text: "A wider subnet mask" }
      ],
      correct: "a",
      explanation: "RA Guard blocks router advertisements arriving on ports where routers should not be connected.",
      distractorExplanations: {
        b: "Port mirroring copies traffic for monitoring and does not block forged advertisements.",
        c: "Spanning tree prevents loops and does not filter router advertisements.",
        d: "Subnet size does not stop rogue router advertisements."
      }
    },
    {
      id: "q-x-d3-15", domainId: "d3", tag: "d3-t171", type: "single",
      prompt: "A firewall has these rules in order: (1) Allow any any; (2) Deny TCP any to any port 23. A user can still use Telnet through the firewall. Why?",
      choices: [
        { id: "a", text: "Rule 1 matches all traffic first, so rule 2 is never evaluated for it" },
        { id: "b", text: "Firewalls ignore deny rules for port 23" },
        { id: "c", text: "Rule 2 is applied before rule 1" },
        { id: "d", text: "Telnet uses UDP, which rule 2 does not cover" }
      ],
      correct: "a",
      explanation: "Rules are evaluated top to bottom and the first match wins, so the allow-any rule shadows the deny beneath it.",
      distractorExplanations: {
        b: "Firewalls honor deny rules; the issue is rule order.",
        c: "Rules are processed from the top, so rule 1 is applied first.",
        d: "Telnet uses TCP port 23, which rule 2 would match if reached."
      }
    },
    {
      id: "q-x-d3-16", domainId: "d3", tag: "d3-t171", type: "single",
      prompt: "A security team wants to limit malware command-and-control callbacks and data exfiltration by allowing workstations to send only web and DNS traffic to the Internet. Which technique is this?",
      choices: [
        { id: "a", text: "Egress filtering" },
        { id: "b", text: "Ingress filtering" },
        { id: "c", text: "Port mirroring" },
        { id: "d", text: "MAC filtering" }
      ],
      correct: "a",
      explanation: "Egress filtering restricts outbound traffic to what is needed, which blocks many malware callbacks and exfiltration channels.",
      distractorExplanations: {
        b: "Ingress filtering controls traffic entering the network.",
        c: "Port mirroring copies traffic for analysis and does not restrict it.",
        d: "MAC filtering restricts devices by hardware address on a network segment."
      }
    },
    {
      id: "q-x-d4-29", domainId: "d4", tag: "d4-t170", type: "single",
      prompt: "An attacker sets up an access point with the same SSID as a company's Wi-Fi and a stronger signal to capture users' credentials. What is this attack called?",
      choices: [
        { id: "a", text: "Evil twin" },
        { id: "b", text: "Jamming" },
        { id: "c", text: "WPS PIN attack" },
        { id: "d", text: "Bluesnarfing" }
      ],
      correct: "a",
      explanation: "An evil twin is a rogue access point that imitates a legitimate network to lure users and intercept traffic or credentials.",
      distractorExplanations: {
        b: "Jamming disrupts the radio signal to deny service rather than imitating a network.",
        c: "A WPS PIN attack brute forces the WPS setup PIN on a legitimate AP.",
        d: "Bluesnarfing is unauthorized access to data over Bluetooth."
      }
    },
    {
      id: "q-x-d4-30", domainId: "d4", tag: "d4-t170", type: "single",
      prompt: "A company wants wireless authentication that uses certificates on both the clients and the RADIUS server, avoiding passwords entirely. Which EAP method should it deploy?",
      choices: [
        { id: "a", text: "EAP-TLS" },
        { id: "b", text: "PEAP with MS-CHAPv2" },
        { id: "c", text: "LEAP" },
        { id: "d", text: "WEP" }
      ],
      correct: "a",
      explanation: "EAP-TLS provides mutual certificate-based authentication, the strongest EAP option, without passwords.",
      distractorExplanations: {
        b: "PEAP needs only a server certificate and uses a password inside the tunnel.",
        c: "LEAP is an obsolete, broken Cisco method.",
        d: "WEP is an obsolete, broken encryption protocol."
      }
    },
    {
      id: "q-x-d4-31", domainId: "d4", tag: "d4-t171", type: "single",
      prompt: "In the STRIDE model, an attacker who gains administrator capabilities from a normal user account is an example of which threat?",
      choices: [
        { id: "a", text: "Elevation of privilege" },
        { id: "b", text: "Spoofing" },
        { id: "c", text: "Repudiation" },
        { id: "d", text: "Information disclosure" }
      ],
      correct: "a",
      explanation: "Elevation of privilege means gaining capabilities beyond what was authorized, violating authorization.",
      distractorExplanations: {
        b: "Spoofing is pretending to be another identity.",
        c: "Repudiation is denying that an action took place.",
        d: "Information disclosure is exposure of data to unauthorized parties."
      }
    },
    {
      id: "q-x-d4-32", domainId: "d4", tag: "d4-t171", type: "single",
      prompt: "A customer claims they never placed an order, and the system has no reliable records to prove otherwise. Which STRIDE threat and security property does this relate to?",
      choices: [
        { id: "a", text: "Repudiation; non-repudiation" },
        { id: "b", text: "Tampering; integrity" },
        { id: "c", text: "Denial of service; availability" },
        { id: "d", text: "Spoofing; confidentiality" }
      ],
      correct: "a",
      explanation: "Repudiation is the ability to deny an action, which is countered by audit logs and signed records that provide non-repudiation.",
      distractorExplanations: {
        b: "Tampering is about unauthorized modification of data, which is not the issue described.",
        c: "Denial of service is about making a system unavailable.",
        d: "Spoofing relates to authentication, not confidentiality."
      }
    }
  ],

  glossary: [
    { term: "Business Email Compromise", domain: "d2", plain: "Email fraud where the attacker pretends to be someone you trust.", technical: "Fraud using impersonation or takeover of email accounts to induce payments or data disclosure, often with no malware.", example: "A fake CEO email demanding an urgent wire transfer." },
    { term: "Lookalike Domain", domain: "d2", plain: "A web address that looks almost identical to the real one.", technical: "A domain registered to resemble a legitimate domain (character substitution or added words) to deceive recipients.", example: "examp1e.com instead of example.com." },
    { term: "IPv6", domain: "d3", plain: "The newer Internet addressing system with very long addresses.", technical: "Internet Protocol version 6, using 128-bit addresses.", example: "2001:db8::10" },
    { term: "Neighbor Discovery Protocol", domain: "d3", plain: "IPv6's way of finding other devices and routers on a network.", technical: "An ICMPv6-based protocol handling address resolution, router discovery, and duplicate address detection in IPv6.", example: "A host asking who owns an address on the local link." },
    { term: "RA Guard", domain: "d3", plain: "Stops fake IPv6 routers on the network.", technical: "A switch feature that blocks IPv6 router advertisements on untrusted ports.", example: "A rogue router's announcements are dropped." },
    { term: "Egress Filtering", domain: "d3", plain: "Controlling what is allowed to leave your network.", technical: "Restricting outbound traffic to approved destinations and services to limit exfiltration and command and control.", example: "Workstations may reach only web and DNS." },
    { term: "Stateful Firewall", domain: "d3", plain: "A firewall that remembers connections.", technical: "A firewall that tracks connection state and automatically allows return traffic for permitted connections.", example: "A reply to an internal request is allowed back in." },
    { term: "Implicit Deny", domain: "d3", plain: "Anything not specifically allowed is blocked.", technical: "A default rule at the end of an access list that denies all traffic not explicitly permitted.", example: "A packet matching no allow rule is dropped." },
    { term: "Evil Twin", domain: "d4", plain: "A fake Wi-Fi network copying a real one.", technical: "A rogue access point imitating a legitimate SSID to capture traffic or credentials.", example: "A café Wi-Fi lookalike offering a stronger signal." },
    { term: "EAP-TLS", domain: "d4", plain: "Wi-Fi login using certificates on both sides.", technical: "An EAP method providing mutual authentication using client and server certificates.", example: "Laptops authenticating to Wi-Fi with installed certificates." },
    { term: "STRIDE", domain: "d4", plain: "A checklist of six kinds of threats.", technical: "A threat model mnemonic: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.", example: "Using STRIDE on each part of a login flow." },
    { term: "Attack Tree", domain: "d4", plain: "A diagram of all the ways to reach an attacker's goal.", technical: "A tree with the attacker's goal at the root and AND/OR branches representing ways to achieve it.", example: "Branches showing ways to steal a customer database." }
  ],

  acronyms: [
    { acro: "BEC", expansion: "Business Email Compromise", meaning: "Email fraud using impersonation or account takeover to obtain money or data." },
    { acro: "NDP", expansion: "Neighbor Discovery Protocol", meaning: "IPv6's mechanism for address resolution and router discovery." },
    { acro: "SLAAC", expansion: "Stateless Address Autoconfiguration", meaning: "IPv6 hosts configuring addresses from router advertisements." },
    { acro: "RA", expansion: "Router Advertisement", meaning: "An IPv6 message in which a router announces itself and its prefix." },
    { acro: "ACL", expansion: "Access Control List", meaning: "An ordered list of allow and deny rules." },
    { acro: "SAE", expansion: "Simultaneous Authentication of Equals", meaning: "WPA3's password-based handshake resistant to offline guessing." },
    { acro: "OWE", expansion: "Opportunistic Wireless Encryption", meaning: "Encryption of open Wi-Fi networks without a password." },
    { acro: "PEAP", expansion: "Protected Extensible Authentication Protocol", meaning: "An EAP method that tunnels password authentication inside TLS." },
    { acro: "WIPS", expansion: "Wireless Intrusion Prevention System", meaning: "A system that detects and blocks rogue and malicious wireless activity." },
    { acro: "STRIDE", expansion: "Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege", meaning: "A mnemonic for six categories of threats used in threat modeling." },
    { acro: "DREAD", expansion: "Damage, Reproducibility, Exploitability, Affected users, Discoverability", meaning: "A scheme for rating the severity of threats." },
    { acro: "PASTA", expansion: "Process for Attack Simulation and Threat Analysis", meaning: "A seven-stage, risk-centric threat modeling methodology." }
  ]
});
