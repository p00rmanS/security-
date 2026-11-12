/* Performance-based question tasks. Engine: ext-pbq.js. All addresses, names,
   and logs are fictional. Task types:
     order    items are listed in the CORRECT order here; the app shuffles them
     match    items[{text, answer, why?}] with categories[]
     analysis evidence {kind:"table"|"pre", ...} plus questions[]
     firewall rules[] (candidate rules) and packets[] (traffic that must be
              allowed or denied); graded by simulating first-match-wins
     form     fields[] of kind "select" (one correct option) or "checks"
   `objective` is the SY0-701 objective the task practices. */

const PBQ_TASKS = [
  /* ---------------- firewall ---------------- */
  {
    id: "pbq-fw-web", type: "firewall", title: "Publish a web server safely", objective: "3.2", minutes: 6,
    blurb: "Order and set firewall rules so only the right traffic reaches a public web server.",
    scenario: "A company is publishing a web server (WebSrv) in a screened subnet. The Internet must reach it over HTTPS only. Administrators on the admin network (AdminNet) may use SSH. The web server must be able to query its database (DBSrv) on TCP 1433, and nothing else should be allowed.\nBuild the ruleset: choose Allow or Deny for each rule and put the rules in the right order.",
    rules: [
      { id: "r1", src: "Internet", dst: "WebSrv", proto: "tcp", port: 443, note: "Internet to web server on 443" },
      { id: "r2", src: "AdminNet", dst: "WebSrv", proto: "tcp", port: 22, note: "Admin network to web server on 22" },
      { id: "r3", src: "WebSrv", dst: "DBSrv", proto: "tcp", port: 1433, note: "Web server to database on 1433" },
      { id: "r4", src: "Internet", dst: "WebSrv", proto: "tcp", port: "any", note: "Internet to web server on any TCP port" },
      { id: "r5", src: "any", dst: "any", proto: "any", port: "any", note: "Everything else" }
    ],
    packets: [
      { label: "Internet user opens the website (HTTPS)", src: "Internet", dst: "WebSrv", proto: "tcp", port: 443, expect: "allow" },
      { label: "Administrator connects over SSH from the admin network", src: "AdminNet", dst: "WebSrv", proto: "tcp", port: 22, expect: "allow" },
      { label: "Web server queries the database", src: "WebSrv", dst: "DBSrv", proto: "tcp", port: 1433, expect: "allow" },
      { label: "Attacker on the Internet tries SSH to the web server", src: "Internet", dst: "WebSrv", proto: "tcp", port: 22, expect: "deny" },
      { label: "Attacker on the Internet tries the database directly", src: "Internet", dst: "DBSrv", proto: "tcp", port: 1433, expect: "deny" },
      { label: "Attacker on the Internet tries Remote Desktop to the web server", src: "Internet", dst: "WebSrv", proto: "tcp", port: 3389, expect: "deny" }
    ],
    explanation: "Specific allow rules go first, and the broad rules must be Deny. Allowing 'Internet to web server on any port' would expose SSH and RDP, so that rule must be a deny placed after the HTTPS allow, and the final catch-all must be a deny (default deny)."
  },
  {
    id: "pbq-fw-egress", type: "firewall", title: "Control outbound traffic from workstations", objective: "4.5", minutes: 6,
    blurb: "Egress filtering: allow only what workstations need and block the rest.",
    scenario: "Workstations should reach websites (HTTP and HTTPS) and the internal DNS server (DNSsrv, UDP 53). To stop spam bots and command-and-control callbacks, everything else leaving the workstations must be blocked, including direct SMTP to the Internet. Nothing from the Internet should be able to start a Remote Desktop session to a workstation.\nSet the actions and order the rules.",
    rules: [
      { id: "r1", src: "Workstations", dst: "Internet", proto: "tcp", port: 443, note: "Workstations to Internet on 443" },
      { id: "r2", src: "Workstations", dst: "Internet", proto: "tcp", port: 80, note: "Workstations to Internet on 80" },
      { id: "r3", src: "Workstations", dst: "DNSsrv", proto: "udp", port: 53, note: "Workstations to internal DNS on 53" },
      { id: "r4", src: "Workstations", dst: "Internet", proto: "tcp", port: 25, note: "Workstations direct SMTP to Internet" },
      { id: "r5", src: "Workstations", dst: "Internet", proto: "any", port: "any", note: "Workstations to Internet, anything else" },
      { id: "r6", src: "any", dst: "any", proto: "any", port: "any", note: "Everything else" }
    ],
    packets: [
      { label: "Workstation browses an HTTPS site", src: "Workstations", dst: "Internet", proto: "tcp", port: 443, expect: "allow" },
      { label: "Workstation browses an HTTP site", src: "Workstations", dst: "Internet", proto: "tcp", port: 80, expect: "allow" },
      { label: "Workstation asks the internal DNS server", src: "Workstations", dst: "DNSsrv", proto: "udp", port: 53, expect: "allow" },
      { label: "Malware on a workstation sends mail directly to the Internet", src: "Workstations", dst: "Internet", proto: "tcp", port: 25, expect: "deny" },
      { label: "Malware on a workstation calls home on TCP 4444", src: "Workstations", dst: "Internet", proto: "tcp", port: 4444, expect: "deny" },
      { label: "Internet host tries Remote Desktop to a workstation", src: "Internet", dst: "Workstations", proto: "tcp", port: 3389, expect: "deny" }
    ],
    explanation: "Allow the three required flows first. The 'anything else outbound' rule and the final catch-all must be Deny, and the SMTP rule must be a Deny that sits before any broad allow. Egress filtering is what stops malware callbacks and spam."
  },

  /* ---------------- ordering ---------------- */
  {
    id: "pbq-order-ir", type: "order", title: "Incident response phases", objective: "4.8", minutes: 3,
    blurb: "Put the seven incident response steps in order.",
    scenario: "Arrange the phases of the incident response process in the order they occur.",
    items: ["Preparation", "Detection", "Analysis", "Containment", "Eradication", "Recovery", "Lessons learned"],
    explanation: "Prepare before anything happens, detect and analyze the incident, contain the spread, eradicate the cause, recover to normal operations, then review what to improve."
  },
  {
    id: "pbq-order-volatility", type: "order", title: "Order of volatility", objective: "4.8", minutes: 3,
    blurb: "Collect evidence from most volatile to least volatile.",
    scenario: "You are collecting evidence from a compromised running server. Order the data sources from MOST volatile (collect first) to LEAST volatile (collect last).",
    items: ["CPU registers and cache", "RAM and running processes", "Temporary files and swap space", "Hard drive contents", "Remote logs and monitoring data", "Archived backups"],
    explanation: "The most easily lost evidence must be captured first. Anything in CPU or RAM disappears at power-off, while disks, remote logs, and archives persist."
  },
  {
    id: "pbq-order-change", type: "order", title: "Change management steps", objective: "1.3", minutes: 3,
    blurb: "From change request to closure.",
    scenario: "A team needs to change a production firewall configuration. Put the steps of the change management process in the correct order.",
    items: [
      "Submit a change request with an owner",
      "Perform an impact analysis",
      "Obtain approval from the change board and stakeholders",
      "Test in a non-production environment and record the results",
      "Schedule a maintenance window and prepare the backout plan",
      "Implement following the standard operating procedure and verify",
      "Update documentation and diagrams, then close the change"
    ],
    explanation: "Analysis and approval come before testing, the backout plan and window are set before implementation, and documentation is updated after the change succeeds."
  },
  {
    id: "pbq-order-vuln", type: "order", title: "Vulnerability management workflow", objective: "4.3", minutes: 3,
    blurb: "Identify, analyze, remediate, validate, report.",
    scenario: "Order the activities of a vulnerability management cycle.",
    items: [
      "Run a vulnerability scan to identify weaknesses",
      "Confirm findings and remove false positives",
      "Prioritize using severity, exposure, and business impact",
      "Remediate or apply compensating controls",
      "Rescan to validate the fix",
      "Report results and trends to stakeholders"
    ],
    explanation: "You cannot prioritize unconfirmed findings, and a fix is not complete until a rescan validates it. Reporting closes the loop and feeds the next cycle."
  },

  /* ---------------- matching ---------------- */
  {
    id: "pbq-match-controls", type: "match", title: "Match controls to control types", objective: "1.1", minutes: 4,
    blurb: "Preventive, deterrent, detective, corrective, compensating, directive.",
    scenario: "Match each control to the control TYPE that best describes it.",
    categories: ["Preventive", "Deterrent", "Detective", "Corrective", "Compensating", "Directive"],
    items: [
      { text: "A firewall rule that blocks Telnet", answer: "Preventive" },
      { text: "A sign warning that the premises are monitored by cameras", answer: "Deterrent" },
      { text: "Reviewing authentication logs every morning", answer: "Detective" },
      { text: "Restoring files from backup after a ransomware attack", answer: "Corrective" },
      { text: "Isolating a server that cannot be patched on its own segment", answer: "Compensating" },
      { text: "An acceptable use policy employees must sign", answer: "Directive" },
      { text: "An intrusion detection system raising alerts", answer: "Detective" },
      { text: "A guard who checks badges at the entrance", answer: "Preventive" }
    ],
    explanation: "Preventive stops it, deterrent discourages it, detective notices it, corrective repairs it, compensating substitutes for a control that is not possible, directive tells people what to do."
  },
  {
    id: "pbq-match-attacks", type: "match", title: "Match attacks to their best mitigation", objective: "2.4", minutes: 4,
    blurb: "Pick the control that stops each attack.",
    scenario: "Match each attack to the mitigation that BEST addresses it.",
    categories: ["Parameterized queries", "Anti-CSRF tokens", "Output encoding", "Nonces and short-lived tokens", "DNSSEC", "802.1X and port security", "Rate limiting and MFA", "Disable legacy protocols (HSTS)"],
    items: [
      { text: "SQL injection", answer: "Parameterized queries" },
      { text: "Cross-site request forgery", answer: "Anti-CSRF tokens" },
      { text: "Cross-site scripting", answer: "Output encoding" },
      { text: "Replay attack", answer: "Nonces and short-lived tokens" },
      { text: "DNS cache poisoning", answer: "DNSSEC" },
      { text: "Unauthorized device plugged into a wall jack", answer: "802.1X and port security" },
      { text: "Password spraying", answer: "Rate limiting and MFA" },
      { text: "Downgrade attack on TLS", answer: "Disable legacy protocols (HSTS)" }
    ],
    explanation: "Match the mechanism to the fix: separate data from commands, bind requests to a secret, encode output, make messages single-use, sign DNS answers, authenticate ports, slow guessing with a second factor, and remove weak protocol versions."
  },
  {
    id: "pbq-match-ports", type: "match", title: "Match ports to services", objective: "3.2", minutes: 3,
    blurb: "The ports you must know.",
    scenario: "Match each port to the service that normally uses it.",
    categories: ["SSH", "Telnet", "DNS", "HTTPS", "RDP", "LDAPS", "SMTP", "SNMP"],
    items: [
      { text: "TCP 22", answer: "SSH" }, { text: "TCP 23", answer: "Telnet" }, { text: "UDP/TCP 53", answer: "DNS" }, { text: "TCP 443", answer: "HTTPS" },
      { text: "TCP 3389", answer: "RDP" }, { text: "TCP 636", answer: "LDAPS" }, { text: "TCP 25", answer: "SMTP" }, { text: "UDP 161", answer: "SNMP" }
    ],
    explanation: "Core ports: 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 161 SNMP, 443 HTTPS, 636 LDAPS, 3389 RDP."
  },
  {
    id: "pbq-match-zones", type: "match", title: "Place systems in the right network zone", objective: "3.2", minutes: 4,
    blurb: "Internet, screened subnet, internal, management.",
    scenario: "Place each system in the network zone where it belongs in a secure design.",
    categories: ["Internet (untrusted)", "Screened subnet (DMZ)", "Internal network", "Management network"],
    items: [
      { text: "Public web server", answer: "Screened subnet (DMZ)" },
      { text: "Customer database", answer: "Internal network" },
      { text: "Administrator jump server", answer: "Management network" },
      { text: "An external attacker's host", answer: "Internet (untrusted)" },
      { text: "Reverse proxy or web application firewall", answer: "Screened subnet (DMZ)" },
      { text: "Domain controller", answer: "Internal network" },
      { text: "Switch and firewall management interfaces", answer: "Management network" },
      { text: "Public-facing DNS server", answer: "Screened subnet (DMZ)" }
    ],
    explanation: "Public-facing systems go in the screened subnet so a compromise does not reach the internal network; sensitive data stays internal; administration happens from a separate management network."
  },
  {
    id: "pbq-match-actors", type: "match", title: "Match threat actors to motivations", objective: "2.1", minutes: 3,
    blurb: "Who wants what.",
    scenario: "Match each actor to its most typical motivation.",
    categories: ["Espionage", "Financial gain", "Political or philosophical cause", "Revenge", "Chaos or curiosity"],
    items: [
      { text: "Nation-state group stealing defense designs", answer: "Espionage" },
      { text: "Ransomware gang encrypting a hospital", answer: "Financial gain" },
      { text: "Hacktivists defacing a government website", answer: "Political or philosophical cause" },
      { text: "A disgruntled employee deleting data before leaving", answer: "Revenge" },
      { text: "A script kiddie running downloaded tools", answer: "Chaos or curiosity" },
      { text: "Organized crime selling stolen card numbers", answer: "Financial gain" }
    ],
    explanation: "Motivation points to the actor: states want secrets, criminals want money, hacktivists want a cause, insiders may want revenge, unskilled attackers act out of curiosity or for disruption."
  },

  /* ---------------- analysis ---------------- */
  {
    id: "pbq-analysis-wineventlog", type: "analysis", title: "Read a Windows Security log", objective: "4.9", minutes: 6,
    blurb: "Event IDs 4625, 4624, 4672 and 1102 tell a story.",
    scenario: "The SOC received an alert for the server FILESRV01. Review the Windows Security log excerpt and answer the questions.",
    evidence: {
      kind: "table", caption: "Security log, FILESRV01 (times are UTC)",
      headers: ["Time", "Event ID", "Account", "Source", "Detail"],
      rows: [
        ["02:11:03", "4625", "admin", "203.0.113.50", "An account failed to log on (wrong password)"],
        ["02:11:04", "4625", "admin", "203.0.113.50", "An account failed to log on (wrong password)"],
        ["02:11:05", "4625", "admin", "203.0.113.50", "An account failed to log on (wrong password)"],
        ["02:16:44", "4624", "admin", "203.0.113.50", "An account was successfully logged on (type 3, network)"],
        ["02:16:45", "4672", "admin", "203.0.113.50", "Special privileges assigned to new logon"],
        ["02:19:12", "4688", "admin", "FILESRV01", "A new process was created: powershell.exe -enc JABz..."],
        ["02:31:50", "1102", "admin", "FILESRV01", "The audit log was cleared"]
      ]
    },
    questions: [
      { prompt: "Which attack does events 02:11:03 to 02:16:44 MOST likely describe?", choices: [{ id: "a", text: "A brute-force attack against one account that succeeded" }, { id: "b", text: "Password spraying across many accounts" }, { id: "c", text: "A user who forgot their password" }, { id: "d", text: "A DNS tunneling attempt" }], correct: "a", explanation: "Repeated failures (4625) against one account from one source followed by a success (4624) is brute force that worked." },
      { prompt: "What does event 4672 at 02:16:45 tell you about the new session?", choices: [{ id: "a", text: "It has administrator-level privileges" }, { id: "b", text: "The account was locked out" }, { id: "c", text: "The password was changed" }, { id: "d", text: "A service was installed" }], correct: "a", explanation: "Event 4672 means special privileges were assigned to the new logon, typical of an administrator session." },
      { prompt: "What does event 1102 at 02:31:50 MOST likely indicate?", choices: [{ id: "a", text: "The attacker cleared the audit log to hide their activity" }, { id: "b", text: "Routine log rotation" }, { id: "c", text: "A successful backup" }, { id: "d", text: "A failed logon" }], correct: "a", explanation: "Event 1102 is logged when the Security audit log is cleared. After suspicious activity, that is defense evasion." },
      { prompt: "What is the BEST immediate response?", choices: [{ id: "a", text: "Isolate the server, disable and reset the admin account, and review forwarded logs and the encoded PowerShell command" }, { id: "b", text: "Delete the alert as a false positive" }, { id: "c", text: "Wait until the next business day" }, { id: "d", text: "Only change the server's wallpaper" }], correct: "a", explanation: "Contain the host, secure the account, and investigate using logs that were forwarded off the server, since the local log was cleared." }
    ],
    explanation: "Many failures then a success, followed by elevated privileges, encoded PowerShell, and a cleared log, is a textbook compromise sequence."
  },
  {
    id: "pbq-analysis-netstat", type: "analysis", title: "Interpret netstat output", objective: "4.9", minutes: 5,
    blurb: "Spot the suspicious connection and know what each state means.",
    scenario: "An analyst ran netstat -ano on a finance workstation that is behaving strangely. Review the output.",
    evidence: {
      kind: "pre", caption: "netstat -ano (fictional host)",
      text: "  Proto  Local Address          Foreign Address        State           PID\n  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       904\n  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4\n  TCP    10.0.4.22:50211        198.51.100.20:443      ESTABLISHED     3412\n  TCP    10.0.4.22:51822        203.0.113.99:4444      ESTABLISHED     3180\n  TCP    10.0.4.22:51830        10.0.4.5:445           TIME_WAIT       0\n  UDP    0.0.0.0:123            *:*                                    1120"
    },
    questions: [
      { prompt: "Which entry is MOST suspicious?", choices: [{ id: "a", text: "10.0.4.22:51822 connected to 203.0.113.99:4444 (PID 3180)" }, { id: "b", text: "0.0.0.0:445 LISTENING (PID 4)" }, { id: "c", text: "10.0.4.22:50211 to 198.51.100.20:443" }, { id: "d", text: "UDP 0.0.0.0:123" }], correct: "a", explanation: "An established outbound connection to an unfamiliar external address on port 4444, a common default for remote-access tools, is the one to investigate." },
      { prompt: "What does the state TIME_WAIT mean for the 10.0.4.5:445 line?", choices: [{ id: "a", text: "The connection recently closed and is waiting before the port is reused" }, { id: "b", text: "The host is waiting for a connection" }, { id: "c", text: "A SYN flood is in progress" }, { id: "d", text: "The connection is encrypted" }], correct: "a", explanation: "TIME_WAIT is a normal state after a connection closes." },
      { prompt: "Which command or step would identify the program behind PID 3180?", choices: [{ id: "a", text: "tasklist /fi \"pid eq 3180\" (or netstat -b)" }, { id: "b", text: "ping 3180" }, { id: "c", text: "nslookup 3180" }, { id: "d", text: "ipconfig /release" }], correct: "a", explanation: "Map the PID to a process with tasklist, or use netstat -b to show the executable." },
      { prompt: "Port 123 UDP is MOST likely which service?", choices: [{ id: "a", text: "NTP (time synchronization)" }, { id: "b", text: "DHCP" }, { id: "c", text: "SNMP" }, { id: "d", text: "LDAP" }], correct: "a", explanation: "UDP 123 is the Network Time Protocol." }
    ],
    explanation: "netstat -ano shows listeners and connections with the owning PID; an unexpected established connection to an odd external port is the lead to follow."
  },
  {
    id: "pbq-analysis-weblog", type: "analysis", title: "Spot attacks in a web server log", objective: "4.9", minutes: 6,
    blurb: "Injection, traversal, and scanner patterns.",
    scenario: "A web server's access log shows unusual requests. Review the lines and answer the questions.",
    evidence: {
      kind: "table", caption: "access.log (fictional)",
      headers: ["Client", "Request", "Status", "Bytes", "User agent"],
      rows: [
        ["198.51.100.7", "GET /products.php?id=5' OR '1'='1", "200", "48210", "Mozilla/5.0"],
        ["198.51.100.7", "GET /view.php?file=../../../etc/passwd", "200", "1893", "Mozilla/5.0"],
        ["203.0.113.60", "GET /admin/login.php", "401", "310", "sqlmap/1.7"],
        ["203.0.113.60", "GET /backup.zip", "404", "180", "sqlmap/1.7"],
        ["192.0.2.15", "GET /index.html", "200", "5120", "Mozilla/5.0"],
        ["192.0.2.15", "POST /contact.php", "200", "640", "Mozilla/5.0"]
      ]
    },
    questions: [
      { prompt: "Which attack is shown by the request containing ' OR '1'='1 that returned 200 with a very large response?", choices: [{ id: "a", text: "SQL injection that may have succeeded" }, { id: "b", text: "Cross-site scripting" }, { id: "c", text: "A DNS amplification attack" }, { id: "d", text: "Normal shopping behavior" }], correct: "a", explanation: "The quote-based condition is a classic SQL injection string, and the unusually large 200 response suggests data was returned." },
      { prompt: "What does file=../../../etc/passwd indicate?", choices: [{ id: "a", text: "Directory (path) traversal" }, { id: "b", text: "A buffer overflow" }, { id: "c", text: "A replay attack" }, { id: "d", text: "ARP spoofing" }], correct: "a", explanation: "The ../ sequences attempt to reach files outside the intended directory." },
      { prompt: "What does the sqlmap user agent from 203.0.113.60 suggest?", choices: [{ id: "a", text: "An automated SQL injection scanning tool probing for weaknesses" }, { id: "b", text: "A legitimate customer" }, { id: "c", text: "A search engine crawler" }, { id: "d", text: "A backup program" }], correct: "a", explanation: "sqlmap is an automated tool for finding and exploiting SQL injection." },
      { prompt: "Which control would BEST help stop these attacks?", choices: [{ id: "a", text: "A web application firewall plus parameterized queries and input validation in the code" }, { id: "b", text: "Disabling the web server's logging" }, { id: "c", text: "Opening more ports" }, { id: "d", text: "Using FTP instead of HTTPS" }], correct: "a", explanation: "Fix the code (parameterized queries, validation) and add a WAF as a compensating layer." }
    ],
    explanation: "Status codes and byte counts help judge success: a large 200 after an injection string deserves immediate review, while 401 and 404 responses show probing that was not successful."
  },
  {
    id: "pbq-analysis-arp", type: "analysis", title: "Diagnose with ipconfig and arp", objective: "2.4", minutes: 5,
    blurb: "APIPA addresses and ARP spoofing.",
    scenario: "Two users report network problems. Review the command output collected from their computers.",
    evidence: {
      kind: "pre", caption: "Output from two machines (fictional)",
      text: "User A: ipconfig\n  IPv4 Address. . . . . . . . . . : 169.254.17.8\n  Subnet Mask . . . . . . . . . . : 255.255.0.0\n  Default Gateway . . . . . . . . :\n\nUser B: arp -a\n  Internet Address      Physical Address      Type\n  10.0.4.1              aa-bb-cc-11-22-33     dynamic   (default gateway)\n  10.0.4.77             aa-bb-cc-11-22-33     dynamic\n  10.0.4.130            de-ad-be-ef-00-01     dynamic"
    },
    questions: [
      { prompt: "What does User A's 169.254.x.x address MOST likely mean?", choices: [{ id: "a", text: "The computer could not reach a DHCP server and assigned itself an APIPA address" }, { id: "b", text: "A static address was configured correctly" }, { id: "c", text: "The computer is infected with ransomware" }, { id: "d", text: "DNS poisoning" }], correct: "a", explanation: "An address in 169.254.0.0/16 is automatic private addressing, used when DHCP fails." },
      { prompt: "What is the MOST likely first fix for User A?", choices: [{ id: "a", text: "Check the cable or Wi-Fi connection and DHCP availability, then ipconfig /renew" }, { id: "b", text: "Reinstall the operating system" }, { id: "c", text: "Block port 443" }, { id: "d", text: "Disable the firewall permanently" }], correct: "a", explanation: "Restore connectivity to the DHCP server and renew the lease." },
      { prompt: "What does it mean that 10.0.4.1 and 10.0.4.77 share the same MAC address in User B's arp cache?", choices: [{ id: "a", text: "Possible ARP spoofing: 10.0.4.77 is impersonating the gateway" }, { id: "b", text: "A normal network design" }, { id: "c", text: "DHCP is working correctly" }, { id: "d", text: "The switch is powered off" }], correct: "a", explanation: "Two IP addresses mapping to one MAC, one of them the gateway, indicates a host may be impersonating the gateway to intercept traffic." },
      { prompt: "Which control BEST defends against this on the switch?", choices: [{ id: "a", text: "Dynamic ARP Inspection with DHCP snooping" }, { id: "b", text: "A larger subnet mask" }, { id: "c", text: "Turning off NTP" }, { id: "d", text: "A longer password policy" }], correct: "a", explanation: "DAI validates ARP packets against the DHCP snooping binding table and drops forged replies." }
    ],
    explanation: "169.254 means DHCP failure; duplicate MACs in the ARP cache, especially for the gateway, point to ARP spoofing."
  },

  /* ---------------- forms ---------------- */
  {
    id: "pbq-form-wifi", type: "form", title: "Configure a secure wireless network", objective: "4.1", minutes: 5,
    blurb: "WPA3, 802.1X, guest isolation, and rogue AP detection.",
    scenario: "Configure the corporate Wi-Fi for a company with 300 employees and a managed laptop fleet that has certificates installed. Guests need Internet access only.",
    instruction: "Choose the best setting for each field.",
    fields: [
      { id: "proto", label: "Corporate SSID security protocol", options: ["WEP", "WPA2-Personal with a shared password", "WPA3-Enterprise (802.1X)", "Open network"], correct: "WPA3-Enterprise (802.1X)", why: "Enterprise mode gives each user their own credentials through RADIUS, and WPA3 is the strongest standard." },
      { id: "eap", label: "EAP method for managed laptops with certificates", options: ["LEAP", "EAP-TLS", "PAP", "No EAP"], correct: "EAP-TLS", why: "EAP-TLS uses certificates on both sides, the strongest option, and the scenario says certificates are deployed." },
      { id: "guest", label: "Guest network design", options: ["Same VLAN as corporate with a shared password", "Separate VLAN with client isolation and Internet-only access", "Open network on the corporate VLAN", "Disable guest access and share the corporate password"], correct: "Separate VLAN with client isolation and Internet-only access", why: "Guests must be isolated from corporate resources and from each other." },
      { id: "wps", label: "WPS (Wi-Fi Protected Setup)", options: ["Enabled for convenience", "Disabled"], correct: "Disabled", why: "WPS PINs can be brute forced." },
      { id: "ssid", label: "Hiding the SSID", options: ["Required: hidden SSIDs are secure", "Not a real security control: rely on strong authentication and encryption"], correct: "Not a real security control: rely on strong authentication and encryption", why: "Hidden SSIDs are trivially discovered." },
      { id: "radius", label: "Client validation of the RADIUS server certificate", options: ["Disabled to simplify setup", "Enabled and pinned to the company CA"], correct: "Enabled and pinned to the company CA", why: "Without validation, an evil twin can harvest credentials." },
      { id: "wips", label: "Rogue access point detection", options: ["Not needed", "Wireless IPS and regular site surveys"], correct: "Wireless IPS and regular site surveys", why: "A WIPS detects rogue and evil-twin access points." }
    ],
    explanation: "WPA3-Enterprise with EAP-TLS, validated RADIUS certificates, isolated guests, no WPS, and rogue AP detection form a strong wireless design."
  },
  {
    id: "pbq-form-harden", type: "form", title: "Harden a new server", objective: "2.5", minutes: 4,
    blurb: "Select every setting that reduces the attack surface.",
    scenario: "A new Linux web server is about to go into production. Select ALL the actions that properly harden it.",
    instruction: "Select every correct action. Incorrect selections reduce your score.",
    fields: [
      { id: "actions", kind: "checks", label: "Hardening actions", options: [
        "Disable unused services and close unneeded ports",
        "Change default credentials and remove default accounts",
        "Enable the host firewall with a default-deny policy",
        "Apply the latest security patches",
        "Forward logs to a central SIEM",
        "Remove unnecessary software",
        "Enable Telnet for convenient remote administration",
        "Allow anonymous FTP for file sharing",
        "Share the administrator password among the team",
        "Turn off automatic security updates"
      ], correct: [
        "Disable unused services and close unneeded ports",
        "Change default credentials and remove default accounts",
        "Enable the host firewall with a default-deny policy",
        "Apply the latest security patches",
        "Forward logs to a central SIEM",
        "Remove unnecessary software"
      ], why: "Hardening reduces attack surface and adds visibility. Telnet, anonymous FTP, shared passwords, and disabled updates all increase risk." }
    ],
    explanation: "Least functionality, strong credentials, a default-deny firewall, patching, logging, and removing unneeded software are standard hardening steps."
  },
  {
    id: "pbq-form-cloud", type: "form", title: "Secure a cloud storage bucket", objective: "3.1", minutes: 4,
    blurb: "Avoid the classic public-bucket breach.",
    scenario: "A team is creating a cloud storage bucket to hold customer invoices that only the billing application should read.",
    instruction: "Choose the best setting for each field.",
    fields: [
      { id: "public", label: "Public access", options: ["Allow public read for convenience", "Block all public access"], correct: "Block all public access", why: "Public buckets are a leading cause of cloud data exposure." },
      { id: "enc", label: "Encryption at rest", options: ["Disabled", "Enabled with managed keys (or customer-managed keys)"], correct: "Enabled with managed keys (or customer-managed keys)", why: "Encryption at rest protects data if storage is accessed improperly." },
      { id: "iam", label: "Access policy", options: ["Everyone in the account has full access", "A least-privilege role for the billing application only"], correct: "A least-privilege role for the billing application only", why: "Grant only the access the application needs." },
      { id: "log", label: "Access logging", options: ["Disabled to save cost", "Enabled and sent to central logging"], correct: "Enabled and sent to central logging", why: "Without logs there is no evidence after an incident." },
      { id: "ver", label: "Recovery from deletion or ransomware", options: ["No versioning", "Versioning with object lock or immutable backups"], correct: "Versioning with object lock or immutable backups", why: "Immutable copies survive deletion and encryption attacks." },
      { id: "mfa", label: "Administrators who manage the bucket", options: ["Password only", "MFA required"], correct: "MFA required", why: "Privileged cloud accounts must use MFA." }
    ],
    explanation: "Private by default, encrypted, least privilege, logged, recoverable, and protected by MFA: most cloud breaches come from the customer's configuration."
  }
];
