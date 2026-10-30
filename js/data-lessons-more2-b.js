/* More lessons, round 2, part B (Domains 4-5). Ids use the t16x range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All IP addresses and names in examples are fictional (documentation ranges). */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d4: [
      {
        id: "d4-t163",
        title: "Log Analysis Practice: Reading Authentication, Firewall, Web, and DNS Logs",
        tag: "4.9",
        minutes: 24,
        goal: "Read common log formats, recognize the signature of well-known attacks, and use a repeatable method (including basic grep and counting) to reach a conclusion from raw log lines.",
        why: "Log-reading questions and performance-based tasks hand you a few lines of output and ask what happened. Pattern recognition is the skill, and the same patterns appear across log types.",
        simple:
          "Log analysis is detective work, and a method keeps it from becoming guesswork. First IDENTIFY the log type and its fields (who, what, where, when, result). Then build a TIMELINE using the timestamps, FILTER to the entities of interest (one user, one IP), PIVOT to related logs, and CORRELATE across sources before you conclude. In WINDOWS SECURITY logs the key event IDs are 4624 (successful logon, with a logon type: 2 interactive at the keyboard, 3 network, 10 remote desktop), 4625 (failed logon), 4634 (logoff), 4648 (logon with explicit credentials), 4672 (special privileges assigned, meaning an administrator-level logon), 4688 (process created), 4720 (user account created), 4732 (member added to a security-enabled group), 4740 (account locked out), 1102 (audit log cleared), and 7045 in the System log (service installed). On LINUX, authentication events live in /var/log/auth.log on Debian-based systems or /var/log/secure on Red Hat-based systems, and lines such as 'Failed password for root from 203.0.113.50' reveal brute force. WEB SERVER access logs record the client address, time, the request line, a status code, bytes sent, and the user agent. Status codes group as 2xx success, 3xx redirect, 4xx client error (403 forbidden, 404 not found), and 5xx server error. Attack signatures are visible in the request text: SQL injection (' OR 1=1, UNION SELECT), path traversal (../../etc/passwd), cross-site scripting (<script> tags), and scanner user agents. Many 404s from one source suggest forced browsing or scanning, repeated 401s or 403s suggest password guessing. FIREWALL logs list source and destination addresses and ports, the protocol, and the action: one source hitting many destination ports with mostly denies is a PORT SCAN, outbound connections at regular intervals to the same rare destination suggest BEACONING, large outbound byte counts suggest EXFILTRATION, and an internal host connecting to many internal hosts on ports 445 or 3389 suggests LATERAL MOVEMENT. DNS logs reveal tunneling (very long, random-looking subdomains) and algorithmically generated domains (bursts of failed lookups). To count and rank quickly, analysts use simple command-line tools: grep to filter lines, and a pipeline such as grep 'Failed password' auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr to list the top offending addresses.",
        deepDive: [
          { h: "A repeatable method", list: [
            "Identify: what log is this, and what do the fields mean?",
            "Scope: what time range and which user, host, or IP matter?",
            "Filter: narrow to relevant lines; remove noise.",
            "Pattern: look for repetition, rhythm, volume, and sequence.",
            "Pivot and correlate: check related logs (authentication, firewall, endpoint, DNS).",
            "Conclude: state what happened, how sure you are, and what to do next."
          ] },
          { h: "Worked example 1: authentication log", p: "Lines show: 02:11:03 Failed password for admin from 203.0.113.50, repeated roughly 400 times in 5 minutes, then 02:16:44 Accepted password for admin from 203.0.113.50. Reading: one source, one account, many failures, then a success is a brute-force attack that succeeded. Next steps: block the source, reset and secure the admin account, check what that session did (new accounts, commands), and look for other hosts contacted by the same address." },
          { h: "Worked example 2: web access log", p: "Lines show: 198.51.100.7 GET /products.php?id=5' OR '1'='1 returning 200 with a large byte count, then GET /products.php?id=1 UNION SELECT username,password FROM users returning 500 once and 200 next. Reading: a SQL injection attempt that eventually worked, since the server returned a large successful response. Next steps: block the source, assume data exposure, fix the code with parameterized queries, and add or tune a WAF rule." },
          { h: "Worked example 3: firewall log", p: "Lines show an internal host 10.0.4.22 making one connection per minute to 203.0.113.99 on port 443 with the same small byte count, 24 hours a day, and the destination was first seen yesterday. Reading: regular small connections at a fixed interval are beaconing to a command-and-control server. Next steps: isolate the host with EDR, collect memory, block the destination, and hunt for other hosts contacting it." },
          { h: "Worked example 4: DNS log", p: "A host makes thousands of queries like a8f3k2x9q1.dsafjk3.example-bad.net with TXT record requests. Reading: long random-looking labels and TXT queries to one unfamiliar domain indicate DNS tunneling for exfiltration or command and control. Next steps: sinkhole or block the domain, isolate the host, and review what data it could access." },
          { h: "Useful command-line patterns", list: [
            "grep 'Failed password' auth.log : show failed logins.",
            "grep -c 'Failed password' auth.log : count them.",
            "grep -v 'Accepted' file : exclude matching lines.",
            "grep -i 'error' file : case-insensitive search.",
            "sort | uniq -c | sort -nr : count and rank repeated values (top talkers).",
            "last and lastb : show successful and failed logins on Linux."
          ] },
          { h: "Common pitfalls", list: [
            "Mismatched time zones or unsynchronized clocks make timelines wrong.",
            "A single event rarely proves anything; look for pattern and context.",
            "Failed logons followed by a success matter more than failures alone.",
            "Attackers may clear logs (event 1102); missing logs are themselves evidence."
          ] }
        ],
        keyTerms: [
          { term: "Event ID 4624 / 4625", def: "Windows successful logon and failed logon events." },
          { term: "Event ID 4672", def: "Special privileges assigned to a new logon, indicating an administrator-level session." },
          { term: "Event ID 1102", def: "The Windows Security audit log was cleared." },
          { term: "auth.log / secure", def: "Linux authentication logs (Debian-based and Red Hat-based respectively)." },
          { term: "HTTP Status Codes", def: "2xx success, 3xx redirect, 4xx client error, 5xx server error." },
          { term: "Beaconing", def: "Regular, repeated outbound connections from malware to its controller." },
          { term: "Forced Browsing", def: "Requesting many URLs to discover hidden pages, producing many 404 responses." },
          { term: "Top Talkers", def: "The addresses or hosts generating the most traffic or events." },
          { term: "Pivot", def: "Using one finding (an IP or user) to search other data sources." }
        ],
        analogy:
          "A log is a witness statement, and one statement may be wrong or incomplete. Analysts act like detectives: they line up the statements by time, look for who appears in several of them, and note when someone's story repeats mechanically (like a visitor who tries four hundred keys in a lock and then walks in).",
        technical:
          "An analyst is asked to review a suspicious alert. The Windows Security log shows 4625 failures for the account 'svc-backup' from workstation FIN-PC07 every few seconds, followed by 4624 logon type 3 (network) from the same workstation, then 4672 and 4688 showing a command shell launched under that account. The firewall log shows FIN-PC07 then connecting to many internal hosts on port 445. Correlating these tells a story: password guessing against a service account, a successful network logon with elevated privileges, and lateral movement through file-sharing ports. The analyst isolates FIN-PC07, disables the account, and begins scoping the other hosts contacted.",
        table: {
          headers: ["What you see", "Likely meaning", "Next step"],
          rows: [
            ["Hundreds of 4625 for one account, then 4624", "Brute force that succeeded", "Contain source, reset account, review session"],
            ["One source, many accounts, one failure each", "Password spraying", "Block source, enforce MFA, check for successes"],
            ["One source, many destination ports, mostly denied", "Port scan", "Block, review exposed services"],
            ["Fixed-interval outbound connections to a rare host", "Beaconing / C2", "Isolate host, block destination, hunt"],
            ["' OR 1=1, UNION SELECT, ../../ in URLs", "SQL injection or path traversal attempt", "Block source, check for 200 responses, fix code, tune WAF"],
            ["Large outbound byte counts at night", "Possible exfiltration", "Identify host and data, contain"],
            ["Security log cleared (1102)", "Attacker covering tracks", "Treat as incident; use forwarded logs"],
            ["Long random subdomains and TXT queries", "DNS tunneling", "Block domain, isolate host"]
          ]
        },
        confusion: [
          { a: "Event 4624", b: "Event 4625", diff: "4624 is a successful logon; 4625 is a failed logon." },
          { a: "Logon type 3", b: "Logon type 10", diff: "Type 3 is a network logon (such as file sharing). Type 10 is remote interactive (Remote Desktop)." },
          { a: "HTTP 403", b: "HTTP 404", diff: "403 means access forbidden; 404 means not found. Many 404s suggest forced browsing; repeated 403 or 401 suggests probing access controls." },
          { a: "Port scan", b: "Beaconing", diff: "A port scan is one source touching many ports or hosts quickly. Beaconing is one host contacting the same destination at regular intervals." },
          { a: "auth.log", b: "secure", diff: "They are the same kind of file for different Linux families: Debian-based uses auth.log and Red Hat-based uses secure." }
        ],
        soc: "This skill is the daily work of a SOC. Analysts rarely read raw files line by line; they write queries in the SIEM that implement the same patterns (failures then success, one source against many accounts, regular outbound intervals). Understanding the raw log makes you better at writing and tuning those queries and at spotting when a detection is missing.",
        patterns: [
          ["Many failed logons followed by a success from the same source", "Successful brute-force attack"],
          ["One source, many different accounts, few attempts each", "Password spraying"],
          ["Requests containing ' OR 1=1 or UNION SELECT", "SQL injection"],
          ["Requests containing ../../etc/passwd", "Path (directory) traversal"],
          ["Small outbound connections every 60 seconds to one rare IP", "Beaconing to command and control"],
          ["Internal host connecting to many internal hosts on port 445", "Lateral movement"],
          ["Security log cleared event", "Defense evasion (Event ID 1102)"],
          ["Special privileges assigned on a new logon", "Administrator-level session (Event ID 4672)"]
        ],
        takeaways: [
          "Use a method: identify, scope, filter, pattern, pivot, conclude.",
          "Each attack has a recognizable shape in logs: repetition, rhythm, volume, and sequence.",
          "Correlate across sources before concluding; one line rarely proves an attack."
        ],
        remember: [
          "Windows: 4624 success, 4625 failure, 4672 special privileges, 4688 process created, 4720 account created, 4740 lockout, 1102 log cleared.",
          "Linux auth logs: /var/log/auth.log (Debian) or /var/log/secure (Red Hat).",
          "HTTP status: 2xx success, 3xx redirect, 4xx client error, 5xx server error.",
          "Many failures then a success = brute force that worked. One source, many accounts = spraying.",
          "Regular interval to one rare destination = beaconing. Many ports from one source = port scan.",
          "Long random subdomains and TXT queries = DNS tunneling.",
          "grep filters lines; sort | uniq -c | sort -nr ranks repeated values.",
          "Check time zones and clock sync before building a timeline."
        ],
        taglish:
          "Ang log analysis parang imbestigasyon. Sundin ang method: kilalanin ang uri ng log at mga field, itakda ang saklaw ng oras, i-filter, hanapin ang pattern, i-pivot sa ibang log, at saka magdesisyon. Mga pattern: maraming 4625 tapos may 4624 mula sa iisang IP, brute force na nagtagumpay. Isang IP, maraming account, tig-isang subok, password spraying. Regular na koneksyon palabas tuwing 60 segundo papunta sa iisang kakaibang IP, beaconing. Mga ' OR 1=1 sa URL, SQL injection. At kapag may Event 1102, binura ng attacker ang log para magtago."
      },
      {
        id: "d4-t164",
        title: "MFA Weaknesses and Attacks: SIM Swapping, Push Fatigue, and Adversary-in-the-Middle",
        tag: "4.6",
        minutes: 20,
        goal: "Explain how attackers defeat multi-factor authentication, and rank MFA methods by their resistance to phishing and interception.",
        why: "MFA is the best single defense against stolen passwords, so attackers have adapted. The exam expects you to know that not all MFA is equal and which weakness each method has.",
        simple:
          "Multi-factor authentication combines at least two kinds of evidence: something you know, something you have, something you are, and sometimes where you are. It blocks most password-only attacks, but each method has weaknesses. SMS one-time codes can be intercepted or redirected: in SIM SWAPPING the attacker persuades or bribes a mobile carrier to move your number to their SIM, receiving your codes and resets; weaknesses in the phone network and malware on the phone can also expose texts. TIME-BASED one-time passwords (TOTP, a new code about every 30 seconds from an authenticator app) and HOTP (counter-based) avoid the phone network but can still be phished: if you type the code into a fake site, the attacker uses it at once. PUSH NOTIFICATIONS ask you to approve a login; in an MFA FATIGUE (push bombing) attack, the attacker who already knows the password triggers repeated prompts, hoping the exhausted or confused user taps 'Approve', sometimes while also phoning the victim pretending to be IT. Number matching, where the user must type a number shown on the login screen into the app, defeats blind approval. The most sophisticated attacks are ADVERSARY-IN-THE-MIDDLE (AiTM) phishing: a proxy site relays the victim's real login to the real service, the victim completes MFA normally, and the proxy steals the resulting SESSION COOKIE or token, so the attacker is logged in without ever needing to pass MFA again. Token theft from malware on a device has the same effect. Attackers also go around MFA: help desk social engineering to reset it, weak recovery options (security questions, backup codes stored carelessly), legacy protocols that do not support MFA, and accounts exempted from MFA. The strongest defense is PHISHING-RESISTANT MFA: FIDO2/WebAuthn security keys and passkeys use public-key cryptography bound to the genuine website's domain, so a lookalike site simply cannot obtain a usable response. Smart cards with certificates are also strong. Supporting measures include risk-based (adaptive or conditional) access that considers device, location, and behavior, short session lifetimes, token binding and revoking sessions after a compromise, strict help-desk identity verification, and blocking legacy authentication.",
        deepDive: [
          { h: "Ranking MFA methods (weakest to strongest, in general)", list: [
            "Password only: no second factor.",
            "SMS or voice codes: better than nothing, exposed to SIM swapping and interception.",
            "TOTP authenticator app: stronger, but phishable.",
            "Push approval: convenient; vulnerable to fatigue unless number matching or context is required.",
            "Push with number matching and context: stronger against blind approval, still phishable by AiTM.",
            "FIDO2 security key / passkey or smart card: phishing-resistant."
          ] },
          { h: "How AiTM phishing works", list: [
            "The victim clicks a link to a lookalike site that is really a reverse proxy.",
            "The proxy forwards the victim's username, password, and MFA response to the genuine service.",
            "The genuine service issues a session cookie; the proxy captures it.",
            "The attacker replays the cookie and is logged in; MFA was satisfied by the victim.",
            "Defenses: phishing-resistant MFA, conditional access requiring managed devices, short session lifetimes, and monitoring for impossible travel and new device sign-ins."
          ] },
          { h: "Push fatigue (MFA bombing)", list: [
            "Attacker has a valid password and floods the user with approval prompts.",
            "Sometimes combined with a call or message impersonating IT support.",
            "Mitigations: number matching, show location and application context, rate-limit prompts, alert on repeated denials, and train users to deny and report unexpected prompts."
          ] },
          { h: "Going around MFA", list: [
            "Help desk or account recovery abuse: attackers impersonate the user to enroll their own device.",
            "Legacy protocols (basic authentication) that cannot do MFA.",
            "Excluded accounts and service accounts without MFA.",
            "Stolen session cookies or tokens; also stolen refresh tokens.",
            "Registering a rogue MFA device after compromising the account."
          ] },
          { h: "Adaptive (risk-based) authentication", p: "Instead of treating every login the same, adaptive systems score risk using device health, IP reputation, location, time, and behavior, and respond by allowing, requiring stronger authentication, or blocking. This supports zero trust by evaluating each access request in context." }
        ],
        keyTerms: [
          { term: "MFA", def: "Multi-Factor Authentication: using two or more different categories of evidence to authenticate." },
          { term: "TOTP / HOTP", def: "Time-based and counter-based one-time passwords generated by an app or token." },
          { term: "SIM Swapping", def: "Taking over a victim's phone number by getting a carrier to move it to an attacker's SIM." },
          { term: "MFA Fatigue", def: "Spamming approval prompts until the user approves one." },
          { term: "Number Matching", def: "Requiring the user to enter a number shown at login into the approval app." },
          { term: "AiTM", def: "Adversary-in-the-Middle: a proxy relays a real login to steal the session." },
          { term: "Session Cookie / Token", def: "A credential proving a user already authenticated; stealing it bypasses MFA." },
          { term: "FIDO2 / WebAuthn", def: "Public-key authentication standards bound to the real website, resistant to phishing." },
          { term: "Passkey", def: "A FIDO-based credential, often synced or device-bound, replacing passwords." },
          { term: "Conditional Access", def: "Policies that decide access based on risk signals such as device, location, and behavior." }
        ],
        analogy:
          "MFA is a bank requiring both your card and a PIN. SIM swapping is a thief convincing the phone company to forward your PIN texts to him. Push fatigue is a thief ringing your doorbell all night until you open the door just to make it stop. AiTM is a fake bank branch that relays your card and PIN to the real bank, then keeps the receipt that proves you are logged in. A security key is a card that only works at the real bank's door, so the fake branch gets nothing usable.",
        technical:
          "An attacker with a leaked password triggers dozens of push prompts to an employee at 2 a.m. and phones pretending to be IT. The employee approves one, and the attacker enrolls a new MFA device. The company responds by enabling number matching with location context, requiring phishing-resistant FIDO2 keys for administrators and finance staff, blocking legacy authentication, alerting on new MFA device registrations, and requiring a verified manager approval for help-desk MFA resets.",
        table: {
          headers: ["Method", "Main weakness", "Phishing-resistant?"],
          rows: [
            ["SMS / voice code", "SIM swapping, interception", "No"],
            ["TOTP app", "Code can be phished and relayed", "No"],
            ["Push approval", "MFA fatigue, blind approval", "No"],
            ["Push with number matching", "Still relayed by AiTM", "No (better against fatigue)"],
            ["FIDO2 key / passkey", "Device loss; needs recovery plan", "Yes"],
            ["Smart card / PIV", "Needs infrastructure; stolen card plus PIN", "Yes"]
          ]
        },
        confusion: [
          { a: "SIM swapping", b: "SIM cloning", diff: "SIM swapping moves a victim's number to a new SIM through the carrier. Cloning copies the SIM's identity. Both let attackers receive SMS codes." },
          { a: "MFA fatigue", b: "AiTM phishing", diff: "Fatigue relies on the user approving repeated prompts. AiTM steals the session through a proxy while the user completes MFA legitimately." },
          { a: "TOTP", b: "HOTP", diff: "TOTP codes change with time (about every 30 seconds). HOTP codes change with a counter each time one is used." },
          { a: "Phishing-resistant MFA", b: "Strong MFA", diff: "Strong may only mean a second factor. Phishing-resistant means the credential is cryptographically bound to the real site, as with FIDO2." },
          { a: "Passkey", b: "Password", diff: "A passkey is a public-key credential unique per site; there is no shared secret to steal or phish." }
        ],
        soc: "Signals worth alerting on include many MFA denials followed by an approval, a successful login from a new country right after a prompt flood, a newly registered MFA device, sign-ins with a valid session from a different IP than the one that authenticated, and legacy-protocol sign-ins. Response includes revoking sessions and tokens, not only resetting the password.",
        patterns: [
          ["Attacker took over the victim's phone number", "SIM swapping"],
          ["User approved a push prompt after dozens of repeats", "MFA fatigue (push bombing)"],
          ["Proxy site captured the session cookie after MFA", "Adversary-in-the-middle phishing"],
          ["User must type a displayed number into the app", "Number matching"],
          ["Credential bound to the real website's domain", "FIDO2 / passkey (phishing-resistant)"],
          ["Policy considers device health, location, and behavior", "Adaptive / conditional access"],
          ["Attacker registers their own MFA device after compromise", "Rogue MFA enrollment; alert on new device registration"],
          ["Resetting the password does not log the attacker out", "Revoke active sessions and tokens"]
        ],
        takeaways: [
          "MFA is vital but varies in strength; SMS is weakest, FIDO2 and smart cards are phishing-resistant.",
          "Session theft makes MFA irrelevant after login, so protect and revoke sessions.",
          "Close the side doors: help-desk resets, recovery options, legacy protocols, and exempted accounts."
        ],
        remember: [
          "SMS codes: vulnerable to SIM swapping and interception.",
          "TOTP = time-based; HOTP = counter-based. Both can be phished.",
          "MFA fatigue = repeated push prompts; defend with number matching and context.",
          "AiTM steals the session cookie after the victim completes MFA.",
          "FIDO2/WebAuthn and passkeys are phishing-resistant because they are bound to the real domain.",
          "After compromise: revoke sessions and tokens, remove rogue MFA devices, then reset credentials.",
          "Block legacy authentication and verify identity strictly for help-desk MFA resets."
        ],
        taglish:
          "Magaling ang MFA pero may kahinaan ang bawat uri. SMS, pwedeng nakawin ang number mo sa SIM swapping. Ang TOTP, pwedeng ma-phish kung ita-type mo ang code sa pekeng site. Ang push, pwedeng i-spam ng attacker hanggang mapindot mo ang Approve (MFA fatigue); lunas ang number matching. Ang AiTM, may proxy na magre-relay ng login mo at nanakawin ang session cookie pagkatapos ng MFA. Ang pinakamatibay na panlaban, FIDO2 security key o passkey, kasi nakatali ito sa totoong website. At kapag na-compromise, bawiin ang mga session at token, hindi lang palitan ang password."
      },
      {
        id: "d4-t165",
        title: "Secure Software Development: The SDLC, Secure Coding, and Code Signing",
        tag: "4.1",
        minutes: 22,
        goal: "Describe how security fits into each phase of the software development lifecycle, and apply secure coding practices such as input validation, parameterized queries, secrets management, and code signing.",
        why: "Insecure code is the root of most application vulnerabilities. The exam expects you to know how to build security in rather than bolt it on, and to name the practice that prevents each classic flaw.",
        simple:
          "The software development life cycle (SDLC) is the sequence of phases a product goes through: requirements, design, implementation (coding), testing, deployment, and maintenance. In a SECURE SDLC, security activities are woven into every phase, an idea called SHIFT LEFT because defects are cheaper and easier to fix the earlier they are found. In requirements, the team defines security and privacy needs. In design, THREAT MODELING identifies how the system could be attacked. In coding, developers follow secure coding standards and have peers perform code review. In testing, static analysis (SAST), dynamic testing (DAST), software composition analysis of third-party libraries (SCA), and penetration testing look for flaws. In deployment, release is controlled and verified, and in maintenance, vulnerabilities are patched and monitored. Methodologies differ: waterfall completes each phase in order, while agile and DevOps iterate quickly, so DevSecOps automates security checks inside the CI/CD pipeline. Several coding practices prevent the most common flaws. INPUT VALIDATION means treating all input as untrusted and checking it on the SERVER side against an allowlist of expected formats; this works together with PARAMETERIZED QUERIES (prepared statements), which keep user data separate from SQL commands and are the main defense against SQL injection, and OUTPUT ENCODING, which neutralizes data before it is placed in a web page and is the main defense against cross-site scripting. Error handling should show users a generic message and write details to logs, never revealing stack traces or system information. Secure session handling uses cookies marked Secure, HttpOnly, and SameSite, with sessions that expire. SECRETS such as passwords, API keys, and tokens must never be hard-coded or committed to repositories; they belong in a secrets manager. Applications and service accounts run with least privilege, third-party components are tracked and updated (with a software bill of materials), and development, test, and production environments are kept separate, with real production data kept out of test systems. Finally, CODE SIGNING applies a digital signature to released software so users and systems can verify who published it (authenticity) and that it has not been altered (integrity), while SANDBOXING runs code in an isolated environment to limit the damage it can do.",
        deepDive: [
          { h: "Security activities by phase", list: [
            "Requirements: security, privacy, and compliance requirements; abuse cases.",
            "Design: threat modeling and secure architecture review (data flows, trust boundaries).",
            "Implementation: secure coding standards, code review, secrets management, dependency selection.",
            "Testing: SAST, DAST, SCA, fuzzing, and penetration testing.",
            "Deployment: hardened configuration, signed builds, controlled promotion between environments.",
            "Maintenance: patching, vulnerability disclosure handling, monitoring, and retirement."
          ] },
          { h: "Matching a flaw to its main defense", list: [
            "SQL injection: parameterized queries / prepared statements, plus input validation and least-privilege database accounts.",
            "Cross-site scripting: output encoding and input validation; content security policy.",
            "Cross-site request forgery: anti-CSRF tokens and SameSite cookies.",
            "Buffer overflow: bounds checking, memory-safe languages, ASLR, and DEP.",
            "Hard-coded credentials: secrets manager, scanning repositories for secrets.",
            "Vulnerable components: SCA, SBOM, and timely updates.",
            "Information leakage: generic error messages, detailed logging server-side."
          ] },
          { h: "Testing types", list: [
            "SAST: analyzes source code without running it; finds flaws early; may produce false positives.",
            "DAST: tests the running application from the outside; finds runtime and configuration issues.",
            "SCA: checks open-source and third-party libraries for known vulnerabilities and license issues.",
            "Fuzzing: feeds malformed or random input to find crashes and hidden flaws.",
            "Code review and pair programming: human review catches logic and design flaws."
          ] },
          { h: "Code signing and software integrity", list: [
            "The publisher signs the release with a private key held securely (ideally in an HSM).",
            "Users and operating systems verify the signature with the publisher's certificate.",
            "A valid signature proves who published it and that it was not modified after signing.",
            "Protect signing keys: theft lets attackers sign malware that appears legitimate.",
            "Supply chain integrity also uses hashes, signed packages, and an SBOM."
          ] },
          { h: "Environments and change control", list: [
            "Separate development, test, staging, and production environments.",
            "Use version control with protected branches and required reviews.",
            "Never test with live production data unless it is masked or protected equally.",
            "Promote changes through the pipeline under change management, with rollback plans."
          ] }
        ],
        keyTerms: [
          { term: "SDLC", def: "Software Development Life Cycle: the phases a software product goes through." },
          { term: "Shift Left", def: "Moving security activities earlier in the development process." },
          { term: "Threat Modeling", def: "Systematically identifying how a design could be attacked and how to mitigate it." },
          { term: "Input Validation", def: "Checking that input matches expected formats, preferably with an allowlist on the server side." },
          { term: "Parameterized Query", def: "A database query that keeps user data separate from the command, preventing SQL injection." },
          { term: "Output Encoding", def: "Neutralizing data before inserting it into a page so it cannot execute as code." },
          { term: "SAST / DAST / SCA", def: "Static code analysis, dynamic testing of a running application, and third-party component analysis." },
          { term: "Code Signing", def: "Digitally signing software to prove its publisher and integrity." },
          { term: "Sandboxing", def: "Running code in an isolated environment to contain any damage." },
          { term: "DevSecOps", def: "Integrating automated security into DevOps and CI/CD pipelines." },
          { term: "SBOM", def: "Software Bill of Materials: an inventory of the components in a piece of software." }
        ],
        analogy:
          "Building secure software is like building a house. Threat modeling is the architect asking 'how could a burglar get in?' before drawing the plans. Input validation is the doorman checking everyone's ID against a guest list. Parameterized queries keep messages to the safe-keeper in sealed envelopes so a visitor cannot slip in extra instructions. Code signing is the builder's seal on the finished house that proves who built it and that no one has tampered with it since.",
        technical:
          "A team building a customer portal runs a threat modeling workshop during design and uses a secure coding checklist. The pipeline runs SAST and SCA on every commit, and fails the build when a high-severity finding or a vulnerable library appears. Developers use parameterized queries for all database calls, keep API keys in a secrets manager instead of the repository, and sign releases using a key stored in an HSM. A DAST scan and a penetration test run against the staging environment before each major release, and production data is masked in test.",
        table: {
          headers: ["Threat or flaw", "Primary defense"],
          rows: [
            ["SQL injection", "Parameterized queries + input validation"],
            ["Cross-site scripting (XSS)", "Output encoding + input validation + CSP"],
            ["Cross-site request forgery (CSRF)", "Anti-CSRF tokens, SameSite cookies"],
            ["Hard-coded credentials", "Secrets manager; repository secret scanning"],
            ["Vulnerable third-party library", "SCA, SBOM, timely updates"],
            ["Verbose error messages", "Generic user errors, detailed server logs"],
            ["Tampered or fake software", "Code signing and hash verification"],
            ["Malicious code running unrestricted", "Sandboxing and least privilege"]
          ]
        },
        confusion: [
          { a: "SAST", b: "DAST", diff: "SAST examines source code without running it. DAST tests the running application from the outside." },
          { a: "Input validation", b: "Output encoding", diff: "Validation checks data coming IN. Encoding makes data safe as it goes OUT into a page or command." },
          { a: "Code signing", b: "Encryption", diff: "Code signing proves authenticity and integrity; it does not hide the code. Encryption hides content." },
          { a: "Client-side validation", b: "Server-side validation", diff: "Client-side checks are for convenience and can be bypassed. Security checks must be enforced on the server." },
          { a: "Waterfall", b: "Agile / DevOps", diff: "Waterfall completes phases in sequence. Agile and DevOps iterate in short cycles, so security must be automated in the pipeline." }
        ],
        soc: "Application security feeds the SOC: WAF and application logs show attacks the code should have prevented, and a vulnerable dependency disclosed publicly triggers urgent hunting and patching. Knowing which application uses which components (via an SBOM) turns a day of searching into minutes.",
        patterns: [
          ["Best defense against SQL injection", "Parameterized queries (prepared statements)"],
          ["Best defense against XSS", "Output encoding and input validation"],
          ["Validate input on the server using an allowlist", "Secure input validation"],
          ["Find flaws in source code before it runs", "SAST"],
          ["Test the running application from the outside", "DAST"],
          ["Check open-source libraries for known vulnerabilities", "SCA / SBOM"],
          ["Users must verify that software came from the publisher unchanged", "Code signing"],
          ["API key found in a public repository", "Rotate it and use a secrets manager"]
        ],
        takeaways: [
          "Shift left: build security into every phase rather than testing it in at the end.",
          "Know the flaw-to-defense pairs, especially parameterized queries and output encoding.",
          "Code signing proves who published software and that it was not altered."
        ],
        remember: [
          "SDLC phases: requirements, design, implementation, testing, deployment, maintenance. Add security to each.",
          "Shift left = find and fix issues early.",
          "Threat modeling happens at design.",
          "SQL injection = parameterized queries. XSS = output encoding. CSRF = anti-CSRF tokens and SameSite cookies.",
          "Validate input on the server with an allowlist; client-side checks can be bypassed.",
          "SAST = source code, DAST = running app, SCA = third-party components (SBOM).",
          "Never hard-code secrets; use a secrets manager. Code signing = authenticity + integrity.",
          "Separate dev, test, staging, and production; keep real data out of test."
        ],
        taglish:
          "Ang SDLC ay mga yugto ng paggawa ng software: requirements, design, coding, testing, deployment, at maintenance. Sa secure SDLC, may security sa bawat yugto (shift left, mas maaga mas mura ang ayos). Sa design, threat modeling. Sa coding, input validation sa server, parameterized queries laban sa SQL injection, at output encoding laban sa XSS. Huwag i-hard-code ang password at API key; gumamit ng secrets manager. Sa testing: SAST (code), DAST (tumatakbong app), SCA (third-party library). At ang code signing, pruweba kung sino ang naglabas ng software at na hindi ito binago."
      },
      {
        id: "d4-t166",
        title: "Security Automation in Practice: SOAR, Playbooks, APIs, and CI/CD Guardrails",
        tag: "4.7",
        minutes: 20,
        goal: "Describe common security automation use cases, how SOAR playbooks work, and the benefits and risks of automating security tasks.",
        why: "Automation is how small teams handle enormous alert volumes. The exam lists specific use cases and considerations, so you need both the benefits and the cautions.",
        simple:
          "Security automation uses scripts, tools, and platforms to perform tasks without manual effort. SOAR (Security Orchestration, Automation, and Response) platforms connect many security tools (orchestration), carry out repeatable tasks (automation), and manage the incident workflow (response). The central idea is the PLAYBOOK, a defined sequence of steps and decisions for a type of event, such as phishing or malware. A phishing playbook might extract links and attachments from a reported email, check them against threat intelligence and a sandbox, search all mailboxes for the same message, delete it, block the sender and URL, and create a ticket, all in seconds. A RUNBOOK is similar but typically the step-by-step operational procedure, which may be performed by a person or automated. Common automation use cases include user and resource provisioning and de-provisioning, creating tickets and escalating them, enriching alerts with context, enabling or disabling accounts and services, adjusting firewall rules and security groups, enforcing guardrails (such as preventing a public storage bucket), running continuous integration and testing in pipelines, and integrating tools through APIs. The benefits are speed and consistency, enforcement of baselines, scalability, a lower chance of human error, faster reaction time, and freeing analysts for higher-value work. But automation has risks and costs. It adds complexity, takes time and money to build and maintain, creates a possible single point of failure, can accumulate technical debt as systems change, and requires ongoing support and skills. A badly designed automation can amplify mistakes: a false positive that automatically disables an executive's account or blocks a critical partner can do real damage at machine speed. The accounts and API keys that automation uses are high-value targets and must follow least privilege and secrets management. Good practice is to automate low-risk, high-volume, well-understood tasks first, keep a HUMAN IN THE LOOP for high-impact actions (isolating a production server, deleting data), test playbooks in a safe environment, log every action for audit, build in a way to stop automation quickly (a kill switch), and review playbooks regularly. In development pipelines, CI/CD (continuous integration and continuous delivery) automates building, testing, and deploying code, and security gates such as code scanning, dependency checks, and infrastructure-as-code policy checks stop insecure changes from reaching production.",
        deepDive: [
          { h: "SOAR in three words", list: [
            "Orchestration: connect tools (SIEM, EDR, email, firewall, ticketing) so they work together.",
            "Automation: perform tasks automatically (enrich, block, isolate, notify).",
            "Response: coordinate incident workflow, evidence, and reporting."
          ] },
          { h: "Playbook versus runbook", list: [
            "Playbook: decision logic and steps for a type of incident (what to do if X, then Y).",
            "Runbook: detailed operational procedure for a task, often automated (restart a service, rotate a key).",
            "Both should be version-controlled, tested, and reviewed after incidents."
          ] },
          { h: "Typical automation use cases", list: [
            "Phishing triage: extract indicators, detonate attachments, search and delete from mailboxes.",
            "Alert enrichment: add geolocation, reputation, asset owner, and history to an alert.",
            "Account lifecycle: provision on hire, change access on transfer, disable on departure.",
            "Containment: isolate a host, disable a compromised account, revoke tokens.",
            "Guardrails: automatically revert or block insecure configurations in the cloud.",
            "Ticketing and escalation: create tickets, assign owners, and escalate by severity and time.",
            "CI/CD security gates: fail builds with critical vulnerabilities or exposed secrets."
          ] },
          { h: "Benefits versus considerations", list: [
            "Benefits: speed, consistency, efficiency, scalability, enforcing baselines, reducing human error, and freeing staff.",
            "Considerations: complexity, cost, single point of failure, technical debt, and ongoing supportability.",
            "Danger: automation can spread an error very quickly if it is wrong."
          ] },
          { h: "Safe automation practices", list: [
            "Start small with low-risk, high-volume tasks.",
            "Require human approval for destructive or high-impact actions.",
            "Test in a non-production environment and use staged rollouts.",
            "Give automation accounts least privilege and protect API keys in a secrets manager.",
            "Log all automated actions and review exceptions.",
            "Provide a kill switch and fallback manual procedure."
          ] },
          { h: "APIs and scripting", p: "Most automation depends on APIs (application programming interfaces), which let one tool request data or actions from another, usually over HTTPS with an authentication token. Scripting languages such as Python, PowerShell, and Bash glue tools together. Both must be secured: authenticate and authorize API calls, rate-limit them, and monitor for misuse." }
        ],
        keyTerms: [
          { term: "SOAR", def: "Security Orchestration, Automation, and Response: connects tools and automates incident workflows." },
          { term: "Playbook", def: "A defined set of steps and decisions for responding to a type of event." },
          { term: "Runbook", def: "A step-by-step operational procedure, manual or automated." },
          { term: "Orchestration", def: "Coordinating multiple tools and systems to work together." },
          { term: "Guardrail", def: "An automated control that prevents or reverts insecure configurations." },
          { term: "CI/CD", def: "Continuous Integration and Continuous Delivery: automated build, test, and deploy pipelines." },
          { term: "API", def: "Application Programming Interface: a way for software to request data or actions from other software." },
          { term: "Human in the Loop", def: "Requiring a person to approve high-impact automated actions." },
          { term: "Technical Debt", def: "Accumulated maintenance burden from shortcuts and outdated automation." },
          { term: "Single Point of Failure", def: "A component whose failure stops a whole process." }
        ],
        analogy:
          "Automation is a very fast, very literal assistant. Give it a clear checklist and it will do thousands of tasks without tiring, but if the checklist has a mistake, it will make that mistake thousands of times before anyone notices. A playbook is the checklist, orchestration is the assistant's ability to use every tool in the office, and the human in the loop is the manager who must sign before the assistant does anything irreversible.",
        technical:
          "A SOC receives 300 reported phishing emails a day. A SOAR playbook extracts the URLs and attachments, checks reputation and detonates files in a sandbox, finds the same message in other mailboxes, deletes it, blocks the sender domain, and opens a ticket with all findings. If the sandbox verdict is malicious and the user clicked, the playbook asks an analyst to approve isolating the user's laptop. The team limits the playbook's service account to the minimum mailbox and firewall permissions, stores its API keys in a vault, logs every action, and reviews the playbook monthly.",
        table: {
          headers: ["Use case", "Benefit", "Caution"],
          rows: [
            ["Phishing triage", "Minutes instead of hours; consistent handling", "Do not auto-delete without safeguards for false positives"],
            ["Account provisioning / de-provisioning", "Timely, consistent access changes", "Errors can grant or remove wrong access at scale"],
            ["Host isolation", "Fast containment", "Keep a human approval for critical servers"],
            ["Cloud guardrails", "Prevent misconfigurations automatically", "Test to avoid breaking legitimate workloads"],
            ["CI/CD security gates", "Stop insecure code before release", "Tune to avoid blocking all releases with false positives"],
            ["Alert enrichment", "Faster, better-informed triage", "Depends on the quality of data sources"]
          ]
        },
        confusion: [
          { a: "SOAR", b: "SIEM", diff: "A SIEM collects and correlates logs and raises alerts. A SOAR automates the response workflow to those alerts and orchestrates other tools." },
          { a: "Playbook", b: "Runbook", diff: "A playbook defines the response logic for an incident type. A runbook is a step-by-step operational procedure for a task." },
          { a: "Orchestration", b: "Automation", diff: "Orchestration connects and coordinates multiple tools. Automation executes individual tasks without manual effort." },
          { a: "CI", b: "CD", diff: "Continuous integration builds and tests code changes frequently. Continuous delivery or deployment releases them automatically or on approval." },
          { a: "Automation benefit", b: "Automation risk", diff: "Benefits include speed and consistency. Risks include complexity, single points of failure, and errors amplified at scale." }
        ],
        soc: "Automation changes the analyst's job from clicking through repetitive steps to improving the playbooks and handling the exceptions. A mature SOC measures automation by time saved and error rate, and it watches the automation itself, because a compromised service account or a broken playbook can cause as much harm as an attacker.",
        patterns: [
          ["Platform connects tools and runs response workflows automatically", "SOAR"],
          ["Documented steps and decisions for responding to phishing", "Playbook"],
          ["Automated check that stops a public storage bucket", "Guardrail"],
          ["Pipeline blocks a build that contains a critical vulnerability", "CI/CD security gate"],
          ["Automation disabled the CEO's account because of a false positive", "Need human approval for high-impact actions"],
          ["One automation failure stops incident handling", "Single point of failure consideration"],
          ["Tools exchanging data and actions over HTTPS with tokens", "APIs"],
          ["Automated process accounts holding broad permissions", "Apply least privilege and secrets management"]
        ],
        takeaways: [
          "SOAR connects tools and automates playbooks; SIEM detects, SOAR responds.",
          "Automate low-risk, well-understood tasks first; keep humans in the loop for high-impact ones.",
          "Automation accounts and keys are high-value targets; protect and log them."
        ],
        remember: [
          "SOAR = Security Orchestration, Automation, and Response. SIEM detects; SOAR responds.",
          "Playbook = response logic for an incident type. Runbook = step-by-step operational procedure.",
          "Use cases: provisioning, ticketing and escalation, enrichment, enabling/disabling accounts and services, guardrails, CI/CD.",
          "Benefits: speed, consistency, scale, baseline enforcement, fewer human errors.",
          "Considerations: complexity, cost, single point of failure, technical debt, ongoing supportability.",
          "Keep a human in the loop for destructive actions; test, log, and provide a kill switch.",
          "Secure the APIs and service accounts the automation uses (least privilege, secrets manager)."
        ],
        taglish:
          "Ang SOAR ang nag-uugnay ng iba't ibang security tool at nag-a-automate ng pagtugon. Ang playbook ang nakasulat na hakbang at desisyon para sa isang uri ng insidente (halimbawa phishing). Ang runbook ang detalyadong hakbang ng isang operasyon. Malaki ang benepisyo: mabilis, pare-pareho, at mas kaunting pagkakamali ng tao. Pero may panganib: kumplikado, magastos, pwedeng maging single point of failure, at kapag mali ang automation, dadami ang mali nang napakabilis. Kaya ang mga delikadong aksyon ay dapat may pag-apruba ng tao, at dapat protektado ang mga account at API key na ginagamit ng automation."
      }
    ],

    d5: [
      {
        id: "d5-t162",
        title: "Quantitative Risk Worked Examples: SLE, ARO, ALE, and Control Cost-Benefit",
        tag: "5.2",
        minutes: 22,
        goal: "Calculate single loss expectancy, annualized loss expectancy, and the value of a control, and use the results to justify a risk treatment.",
        why: "The exam can hand you numbers and expect a calculation. The formulas are short, but the setup (what is the asset value, what is the annual rate) is where points are lost, so practice with worked examples matters.",
        simple:
          "Quantitative risk analysis puts money values on risk. The building blocks are: ASSET VALUE (AV), what the asset is worth; EXPOSURE FACTOR (EF), the percentage of the asset's value lost in one incident; SINGLE LOSS EXPECTANCY (SLE), the expected loss from one incident; ANNUALIZED RATE OF OCCURRENCE (ARO), how many times per year the incident is expected; and ANNUALIZED LOSS EXPECTANCY (ALE), the expected loss per year. The formulas are SLE = AV x EF and ALE = SLE x ARO. For example, a server worth 200,000 dollars that would lose 40 percent of its value in a fire has an SLE of 80,000 dollars; if such a fire is expected once every 20 years, the ARO is 0.05 and the ALE is 4,000 dollars a year. To convert a frequency into an ARO, divide one by the number of years between events (once in 5 years = 0.2) or use the number of events per year (once a month = 12). The ALE lets you compare the cost of a control with the loss it prevents. The VALUE OF A CONTROL (annual) equals the ALE before the control, minus the ALE after the control, minus the annual cost of the control. If it is positive, the control pays for itself; if negative, it costs more than it saves. This leads naturally to the risk treatments: MITIGATE (add a control to reduce the likelihood or impact), TRANSFER (shift the financial impact, for example through insurance or a contract with a provider), AVOID (stop the risky activity), or ACCEPT (live with it, ideally with documented approval). INHERENT risk is the risk before controls, and RESIDUAL risk is what remains after controls are applied; residual risk must be compared with the organization's risk appetite (how much risk it is willing to pursue) and risk tolerance (the acceptable variation around it). Quantitative analysis is only as good as its inputs, so many organizations also use QUALITATIVE analysis, rating likelihood and impact as low, medium, or high on a heat map, which is faster and requires less data but is more subjective. A SEMI-QUANTITATIVE approach uses numeric scores (such as 1 to 5) for likelihood and impact.",
        deepDive: [
          { h: "The formulas", list: [
            "SLE = AV x EF (Asset Value times Exposure Factor).",
            "ALE = SLE x ARO.",
            "Annual value of a control = ALE before - ALE after - annual cost of the control.",
            "ARO as a fraction: once every 4 years = 0.25; twice a year = 2; once a month = 12."
          ] },
          { h: "Worked example 1: a data center fire", p: "Asset value is 200,000 dollars, exposure factor 40 percent, so SLE = 200,000 x 0.40 = 80,000 dollars. A fire is expected once in 20 years, so ARO = 0.05 and ALE = 80,000 x 0.05 = 4,000 dollars. A suppression system costing 3,000 dollars a year reduces the ARO to 0.01, giving a new ALE of 800 dollars. Value of the control = 4,000 - 800 - 3,000 = 200 dollars a year. It is worthwhile, but only marginally; compliance or safety needs may also justify it." },
          { h: "Worked example 2: stolen laptops", p: "Each laptop is worth 1,500 dollars and its theft is a total loss (EF = 100 percent), so SLE = 1,500 dollars. Thirty laptops are stolen each year, so ARO = 30 and ALE = 45,000 dollars. A cable-lock and physical security program costing 10,000 dollars a year cuts losses to 10 a year (new ALE = 15,000 dollars). Value of the control = 45,000 - 15,000 - 10,000 = 20,000 dollars a year, a clear win. (Disk encryption would not change the hardware loss but would greatly reduce the data-breach impact, which should be counted separately.)" },
          { h: "Worked example 3: ransomware and insurance", p: "A business-critical system is valued at 5,000,000 dollars. An attack would cost 20 percent, so SLE = 1,000,000 dollars. The ARO is 0.1 (once in 10 years), so ALE = 100,000 dollars. Cyber insurance costs 40,000 dollars a year for coverage of the loss above a deductible. This is risk TRANSFER. Because insurance does not prevent the attack or the downtime, it is usually combined with mitigation such as backups and EDR." },
          { h: "Inherent versus residual risk", list: [
            "Inherent risk: the risk with no controls.",
            "Residual risk: what remains after controls.",
            "If residual risk is above appetite or tolerance, more treatment is needed.",
            "Accepted risk should be documented and approved by the risk owner, and reviewed."
          ] },
          { h: "Qualitative and semi-quantitative methods", list: [
            "Qualitative: likelihood and impact rated low/medium/high; result plotted on a heat map.",
            "Semi-quantitative: numeric scores (for example 1 to 5) multiplied to rank risks.",
            "Quantitative needs reliable data; qualitative is quicker but subjective.",
            "Risk register: a living list of risks with owner, rating, treatment, and status."
          ] },
          { h: "Pitfalls", list: [
            "Forgetting that ARO is per YEAR; convert correctly.",
            "Using total asset value when only part is lost (use the exposure factor).",
            "Ignoring indirect costs such as downtime, fines, and reputation in the SLE.",
            "Treating the numbers as certain; they are estimates and should be revisited."
          ] }
        ],
        keyTerms: [
          { term: "Asset Value (AV)", def: "The value of the asset to the organization." },
          { term: "Exposure Factor (EF)", def: "The percentage of the asset's value lost in a single incident." },
          { term: "SLE", def: "Single Loss Expectancy = AV x EF." },
          { term: "ARO", def: "Annualized Rate of Occurrence: expected number of incidents per year." },
          { term: "ALE", def: "Annualized Loss Expectancy = SLE x ARO." },
          { term: "Inherent Risk", def: "Risk before any controls are applied." },
          { term: "Residual Risk", def: "Risk remaining after controls are applied." },
          { term: "Risk Appetite", def: "The amount and type of risk an organization is willing to pursue." },
          { term: "Risk Tolerance", def: "The acceptable deviation from the risk appetite for a specific objective." },
          { term: "Risk Register", def: "A record of identified risks with owners, ratings, treatments, and status." }
        ],
        analogy:
          "ALE is like budgeting for car accidents. If a crash would cost 10,000 dollars (SLE) and you expect one every five years (ARO 0.2), you should budget about 2,000 dollars a year (ALE). A safety feature that costs 500 dollars a year and halves the risk saves 1,000 dollars a year in expected loss, a net gain of 500 dollars. Insurance is paying someone else to carry the loss; refusing to drive is avoidance.",
        technical:
          "A security manager proposes a 25,000 dollar annual backup and EDR program to protect a system whose ransomware ALE is 100,000 dollars. The program is expected to cut the ARO from 0.1 to 0.03, which lowers the ALE to 30,000 dollars. The value of the control is 100,000 - 30,000 - 25,000 = 45,000 dollars a year. The manager records the residual risk in the risk register, assigns the system owner as risk owner, confirms the residual level is within the board's stated appetite, and keeps cyber insurance for the remaining exposure.",
        table: {
          headers: ["Term", "Formula or meaning", "Example"],
          rows: [
            ["SLE", "AV x EF", "200,000 x 0.40 = 80,000"],
            ["ARO", "Events per year", "Once every 20 years = 0.05"],
            ["ALE", "SLE x ARO", "80,000 x 0.05 = 4,000"],
            ["Control value", "ALE before - ALE after - annual cost", "4,000 - 800 - 3,000 = 200"],
            ["Mitigate", "Reduce likelihood or impact", "Install a suppression system"],
            ["Transfer", "Shift the financial impact", "Buy insurance"],
            ["Avoid", "Stop the activity", "Do not store card data at all"],
            ["Accept", "Live with the risk", "Approved exception"]
          ]
        },
        confusion: [
          { a: "SLE", b: "ALE", diff: "SLE is the loss from ONE incident. ALE is the expected loss per YEAR, which is SLE multiplied by the annual rate of occurrence." },
          { a: "Exposure factor", b: "Asset value", diff: "Asset value is the whole worth of the asset. Exposure factor is the PERCENTAGE of that worth lost in one incident." },
          { a: "Inherent risk", b: "Residual risk", diff: "Inherent risk exists before controls. Residual risk remains after controls are in place." },
          { a: "Risk appetite", b: "Risk tolerance", diff: "Appetite is how much risk the organization is willing to take on. Tolerance is the acceptable variation around that level for a given objective." },
          { a: "Transfer", b: "Avoid", diff: "Transfer shifts the financial consequence to another party (insurance). Avoid eliminates the activity that creates the risk." }
        ],
        soc: "Risk numbers drive priorities that the SOC feels: budget for monitoring, which assets get the most protection, and which incident scenarios are rehearsed. Incident data feeds back into the estimates, since real frequencies and losses make future ARO and EF values more accurate.",
        patterns: [
          ["Asset worth 100,000 dollars, 25 percent lost per incident", "SLE = 25,000 dollars"],
          ["SLE of 25,000 and expected twice per year", "ALE = 50,000 dollars"],
          ["Incident expected once every 10 years", "ARO = 0.1"],
          ["Control costs more than it saves in ALE", "Not cost-effective; consider other treatment"],
          ["Buy cyber insurance", "Risk transfer"],
          ["Stop offering the risky service", "Risk avoidance"],
          ["Remaining risk after controls", "Residual risk"],
          ["Rate likelihood and impact as low/medium/high", "Qualitative analysis (heat map)"]
        ],
        takeaways: [
          "SLE = AV x EF; ALE = SLE x ARO; a control is worthwhile if the ALE reduction exceeds its annual cost.",
          "Convert frequencies to a per-year ARO carefully.",
          "Compare residual risk with appetite and tolerance, and document accepted risk."
        ],
        remember: [
          "SLE = AV x EF. ALE = SLE x ARO.",
          "ARO is per year: once every 5 years = 0.2; once a month = 12.",
          "Control value = ALE before - ALE after - annual cost of the control.",
          "Treatments: mitigate, transfer, avoid, accept.",
          "Inherent = before controls; residual = after controls.",
          "Qualitative = ratings and heat maps; quantitative = money values; semi-quantitative = numeric scores.",
          "Risk register: owner, rating, treatment, status; accepted risk needs documented approval."
        ],
        taglish:
          "Ang mga formula: SLE = Asset Value x Exposure Factor (gaano kalaki ang mawawala sa isang insidente). ALE = SLE x ARO (gaano kalaki ang inaasahang mawawala kada taon). Ang ARO ay bilang ng pangyayari kada taon: minsan sa 20 taon ay 0.05, minsan kada buwan ay 12. Para malaman kung sulit ang control: ALE bago, bawas ang ALE pagkatapos, bawas ang taunang gastos ng control. Kung positibo, sulit. Apat ang pwedeng gawin sa risk: mitigate, transfer (hal. insurance), avoid, o accept. Ang residual risk ay ang natitirang panganib pagkatapos ng controls."
      },
      {
        id: "d5-t163",
        title: "Security Metrics and Reporting: KPIs, KRIs, and Telling the Story to Leaders",
        tag: "5.2",
        minutes: 18,
        goal: "Differentiate KPIs from KRIs, choose metrics that are meaningful and actionable, and present security information appropriately to technical and executive audiences.",
        why: "What gets measured gets managed, and what gets reported to leaders gets funded. The exam mentions key risk indicators and risk reporting, and the skill of choosing good measures is valuable in any security job.",
        simple:
          "Security metrics turn activity into evidence. A KPI (key performance indicator) measures how well a process or control is performing against a target, such as the percentage of systems patched within policy, mean time to detect and respond (MTTD and MTTR), the share of employees who report simulated phishing, the percentage of assets in the inventory, or the age of open vulnerabilities. A KRI (key risk indicator) is an early-warning signal that the level of risk is rising, such as the number of unpatched critical vulnerabilities on Internet-facing systems, an increase in failed login attempts, expiring certificates, overdue access reviews, a vendor's security incidents, or staff turnover in key roles. KPIs tell you how well you are doing; KRIs tell you whether exposure is increasing. Indicators are often described as LEADING (they predict problems before they happen, such as the number of unpatched systems) or LAGGING (they measure what already happened, such as the number of incidents last quarter). Good metrics are measurable, relevant to a goal, consistent over time, comparable, and actionable: someone can do something about them. Poor metrics are 'vanity' numbers that look impressive but change no decisions, such as the number of attacks blocked by the firewall (it says nothing about risk) or counts without context. Metrics should be tied to thresholds that trigger action; for example, a KRI that crosses a defined limit is escalated to the risk owner. Reporting must fit the audience. Executives and boards need a few measures in business language: top risks, trends over time, how risk compares with appetite, major incidents and their cost, and what decisions or funding are needed, often shown with simple red-amber-green indicators and a risk heat map. Operational teams need detailed, near-real-time dashboards for tasks such as patch compliance by team. Reports should be honest about limits and data quality, show trends rather than single numbers, and connect to outcomes such as reduced downtime or faster recovery.",
        deepDive: [
          { h: "KPI versus KRI", list: [
            "KPI: performance of a process or control against a target (how well are we doing?).",
            "KRI: signal that risk is increasing or exceeding tolerance (is our exposure getting worse?).",
            "Example pair: KPI = 95 percent of critical patches applied within 14 days; KRI = number of Internet-facing systems with critical unpatched vulnerabilities older than 30 days."
          ] },
          { h: "Examples of useful metrics", list: [
            "Mean time to detect (MTTD) and mean time to respond or recover (MTTR).",
            "Patch compliance and age of open vulnerabilities by severity.",
            "Percentage of assets with endpoint protection, logging, and MFA enabled.",
            "Phishing simulation click and report rates.",
            "Percentage of vendors assessed and critical findings open.",
            "Backup success rate and restore test results.",
            "Number of privileged accounts and overdue access reviews.",
            "Control test failures and audit findings open past due."
          ] },
          { h: "What makes a metric good", list: [
            "Linked to a business or security objective.",
            "Measurable with reliable data and a clear definition.",
            "Consistent and comparable over time.",
            "Actionable: a person can change the result.",
            "Has a target or threshold that triggers action."
          ] },
          { h: "Reporting to different audiences", list: [
            "Board and executives: a few measures in business terms, trends, comparison to risk appetite, major risks and decisions required.",
            "Management: program progress, resource needs, and risk treatment status.",
            "Technical teams: detailed operational dashboards and priorities.",
            "Auditors and regulators: evidence of control operation and compliance status."
          ] },
          { h: "Common reporting mistakes", list: [
            "Vanity metrics that do not drive decisions.",
            "Too many metrics, or numbers without trend or context.",
            "Reporting only technical detail to executives.",
            "Hiding bad news or data-quality issues.",
            "Metrics that people can easily game, so they stop reflecting reality."
          ] },
          { h: "Visual tools", p: "A risk heat map plots risks by likelihood and impact so leaders can see priorities at a glance. Red-amber-green (RAG) status shows whether a measure is within target, near a threshold, or breached. Trend lines show direction better than a single value. Benchmarking compares you with peers or against a framework such as the NIST CSF." }
        ],
        keyTerms: [
          { term: "KPI", def: "Key Performance Indicator: a measure of how well a process or control meets its target." },
          { term: "KRI", def: "Key Risk Indicator: an early-warning measure that risk exposure is changing." },
          { term: "Leading Indicator", def: "A measure that predicts future problems before they occur." },
          { term: "Lagging Indicator", def: "A measure of outcomes that have already happened." },
          { term: "Threshold", def: "A defined limit that triggers escalation or action when crossed." },
          { term: "Vanity Metric", def: "A number that looks impressive but does not inform decisions." },
          { term: "RAG Status", def: "Red-amber-green indicator of whether a measure is on target, at risk, or off target." },
          { term: "Risk Heat Map", def: "A visual plot of risks by likelihood and impact." },
          { term: "Dashboard", def: "A visual summary of key metrics for a given audience." }
        ],
        analogy:
          "KPIs are the car's speedometer and trip computer, showing how the journey is going. KRIs are the warning lights and the fuel gauge, telling you that trouble is building before the engine fails. A board report is the one-page summary for the owner of the car: arrival time, any red lights, and whether to spend money on repairs, not the full engineering readout.",
        technical:
          "A CISO builds a quarterly board report with eight measures. Two KPIs, patch compliance (target 95 percent) and mean time to contain incidents, show steady improvement. Two KRIs, the count of critical vulnerabilities on Internet-facing systems older than 30 days and the number of third-party vendors with open critical findings, are amber and trending up. A heat map shows the top five risks against the board's stated appetite, one of which exceeds tolerance and is highlighted with a request for funding. Technical teams get a separate daily dashboard with details by system owner.",
        table: {
          headers: ["Measure type", "Question it answers", "Example"],
          rows: [
            ["KPI", "How well is the control or process performing?", "95% of critical patches within 14 days"],
            ["KRI", "Is risk exposure rising?", "Unpatched critical flaws on Internet-facing servers"],
            ["Leading indicator", "What might go wrong soon?", "Overdue access reviews"],
            ["Lagging indicator", "What already happened?", "Incidents last quarter"],
            ["Heat map", "Which risks matter most?", "Likelihood vs impact grid"],
            ["RAG status", "Are we on target?", "Green, amber, or red for each measure"]
          ]
        },
        confusion: [
          { a: "KPI", b: "KRI", diff: "A KPI measures performance against a target. A KRI warns that risk is increasing or nearing tolerance." },
          { a: "Leading indicator", b: "Lagging indicator", diff: "Leading indicators predict future outcomes. Lagging indicators describe outcomes that already occurred." },
          { a: "Metric", b: "Vanity metric", diff: "A metric informs a decision. A vanity metric looks good but changes nothing, such as a raw count of blocked packets." },
          { a: "Executive report", b: "Operational dashboard", diff: "Executives need few, business-focused measures and trends. Operations need detailed, frequent data for daily action." },
          { a: "Risk appetite", b: "Threshold", diff: "Appetite is the overall level of risk accepted. A threshold is a specific measurable limit that triggers action." }
        ],
        soc: "SOC metrics such as MTTD, MTTR, alert volume per analyst, false-positive rate, and detection coverage against frameworks like MITRE ATT&CK show whether the operation is improving and where to invest. They should be reviewed with care: pushing one number (like closing tickets faster) can degrade quality, so a balanced set is better.",
        patterns: [
          ["Percentage of systems patched within policy", "KPI"],
          ["Count of critical unpatched Internet-facing systems rising", "KRI"],
          ["Measures that predict future problems", "Leading indicators"],
          ["Number of incidents last quarter", "Lagging indicator"],
          ["Plots risks by likelihood and impact", "Risk heat map"],
          ["Number of packets blocked by the firewall", "Vanity metric; it does not show risk"],
          ["Board needs a short, business-focused summary", "Executive report with trends and decisions"],
          ["Measure crosses a defined limit and is escalated", "Threshold-based KRI"]
        ],
        takeaways: [
          "KPIs show performance; KRIs warn of rising risk.",
          "Good metrics are actionable, comparable over time, and tied to thresholds.",
          "Tailor reports to the audience and focus on trends, risk versus appetite, and decisions needed."
        ],
        remember: [
          "KPI = how well we are performing. KRI = early warning that risk is rising.",
          "Leading indicators predict; lagging indicators record what happened.",
          "Good metrics are measurable, relevant, consistent, comparable, and actionable.",
          "Set thresholds that trigger escalation to the risk owner.",
          "Executives get a few business-focused measures and trends; operations get detailed dashboards.",
          "Heat maps and RAG status make priorities visible at a glance.",
          "Avoid vanity metrics and be honest about data quality."
        ],
        taglish:
          "Ang KPI ay sukatan kung gaano kahusay ang takbo ng isang proseso (hal. 95% ng critical patch ay nai-apply sa loob ng 14 araw). Ang KRI naman ay babala na tumataas ang panganib (hal. dumarami ang critical na butas sa mga server na nakalantad sa Internet). Ang leading indicator ay hula sa problema bago mangyari; ang lagging ay nagsasabi ng nangyari na. Dapat ang metric ay malinaw, maaaring aksyunan, at may threshold. Iwasan ang vanity metrics (nakakabilib pero walang saysay). At iangkop ang ulat sa tagapakinig: maikli at negosyo ang wika para sa executives, detalyado para sa technical teams."
      }
    ]
  },

  tips: {
    "d4-t163": "Read logs for repetition, rhythm, and sequence: many failures then a success = brute force that worked, one source across many accounts = spraying, fixed-interval outbound = beaconing, many ports from one source = scan. Memorize 4624, 4625, 4672, and 1102.",
    "d4-t164": "Rank MFA by what the attack needs: SMS falls to SIM swapping, push falls to fatigue, TOTP can be phished, AiTM steals the session after MFA. The only answer that stops phishing is a FIDO2 key or passkey bound to the real domain.",
    "d4-t165": "Pair the flaw with its fix: SQL injection = parameterized queries, XSS = output encoding, CSRF = anti-CSRF tokens, hard-coded secrets = secrets manager. 'Earlier in the lifecycle' always means shift left, and code signing proves publisher and integrity.",
    "d4-t166": "SIEM detects, SOAR responds. The exam's balanced answer on automation includes both benefits (speed, consistency) and cautions (complexity, single point of failure, technical debt), and a human in the loop for high-impact actions.",
    "d5-t162": "Write the formulas first, then substitute: SLE = AV x EF, ALE = SLE x ARO, and control value = ALE before - ALE after - cost. Convert 'once every N years' to ARO = 1/N before multiplying.",
    "d5-t163": "KPI = performance, KRI = rising risk. If a metric would not change anyone's decision, it is a vanity metric. For executives choose few, trend-based, business-language measures; for operations choose detailed dashboards."
  },

  summaries: {
    "d4-t163": "Reading logs is pattern recognition: repeated failures then a success, one source against many accounts, regular outbound beacons, and injection strings in URLs each point to a specific attack when you follow a method and correlate across sources.",
    "d4-t164": "MFA stops most password attacks, but SMS, push, and one-time codes can be defeated by SIM swapping, fatigue, and adversary-in-the-middle session theft, while FIDO2 keys and passkeys resist phishing.",
    "d4-t165": "Secure development builds security into every phase of the SDLC with threat modeling, validated input, parameterized queries, secrets management, testing, and signed releases.",
    "d4-t166": "SOAR platforms and playbooks automate repetitive security work at machine speed, which brings consistency and scale but also complexity and risks that call for human approval, testing, and least-privilege automation accounts.",
    "d5-t162": "Quantitative risk analysis calculates SLE from asset value and exposure factor, ALE from SLE and annual rate of occurrence, and judges a control by whether the ALE it removes exceeds its annual cost.",
    "d5-t163": "KPIs show how well controls perform, KRIs warn that risk is rising, and good reporting tailors a few actionable, trend-based measures to each audience, especially executives."
  },

  questions: [
    {
      id: "q-x-d4-21", domainId: "d4", tag: "d4-t163", type: "single",
      prompt: "A log shows about 400 failed SSH logins for the account 'admin' from a single IP address within five minutes, followed by a successful login from the same address. What is the BEST interpretation?",
      choices: [
        { id: "a", text: "A successful brute-force attack" },
        { id: "b", text: "A normal user who forgot a password once" },
        { id: "c", text: "A DNS tunneling attempt" },
        { id: "d", text: "A false positive caused by a time synchronization problem" }
      ],
      correct: "a",
      explanation: "Many rapid failures against one account followed by a success from the same source is the signature of a brute-force attack that succeeded.",
      distractorExplanations: {
        b: "One forgotten password would not generate hundreds of failures in minutes.",
        c: "DNS tunneling would appear in DNS logs as long, random-looking queries, not in SSH logs.",
        d: "Clock problems affect timestamps but do not create hundreds of failed logins."
      }
    },
    {
      id: "q-x-d4-22", domainId: "d4", tag: "d4-t163", type: "single",
      prompt: "A firewall log shows an internal host connecting to the same rare external IP address on port 443 every 60 seconds, 24 hours a day, with identical small byte counts. What does this MOST likely indicate?",
      choices: [
        { id: "a", text: "Beaconing to a command-and-control server" },
        { id: "b", text: "A port scan" },
        { id: "c", text: "A user browsing the web" },
        { id: "d", text: "A backup job" }
      ],
      correct: "a",
      explanation: "Regular, repeated connections at a fixed interval to a single rare destination are characteristic of malware beaconing to a command-and-control server.",
      distractorExplanations: {
        b: "A port scan touches many ports or hosts, not one destination repeatedly at a fixed interval.",
        c: "Human browsing is irregular and goes to many different sites.",
        d: "A backup would transfer large amounts of data, not identical tiny connections every minute."
      }
    },
    {
      id: "q-x-d4-23", domainId: "d4", tag: "d4-t164", type: "single",
      prompt: "An attacker with a stolen password repeatedly triggers push approval requests at night until the employee taps 'Approve'. Which attack is this?",
      choices: [
        { id: "a", text: "MFA fatigue (push bombing)" },
        { id: "b", text: "SIM swapping" },
        { id: "c", text: "Credential stuffing" },
        { id: "d", text: "A rainbow table attack" }
      ],
      correct: "a",
      explanation: "MFA fatigue floods the user with approval prompts hoping they accept one. Number matching and context help defend against it.",
      distractorExplanations: {
        b: "SIM swapping moves the victim's phone number to the attacker's SIM to intercept codes.",
        c: "Credential stuffing replays leaked username and password pairs, not push prompts.",
        d: "Rainbow tables crack password hashes and are unrelated to approval prompts."
      }
    },
    {
      id: "q-x-d4-24", domainId: "d4", tag: "d4-t164", type: "single",
      prompt: "Which authentication method is MOST resistant to phishing and adversary-in-the-middle attacks?",
      choices: [
        { id: "a", text: "A FIDO2 security key or passkey" },
        { id: "b", text: "SMS one-time codes" },
        { id: "c", text: "A time-based one-time password app" },
        { id: "d", text: "Security questions" }
      ],
      correct: "a",
      explanation: "FIDO2/WebAuthn credentials are cryptographically bound to the genuine site's domain, so a lookalike site cannot obtain a usable response.",
      distractorExplanations: {
        b: "SMS codes can be intercepted through SIM swapping and can be phished.",
        c: "TOTP codes can be typed into a fake site and relayed by an attacker's proxy.",
        d: "Security questions are weak knowledge factors that are easy to guess or find."
      }
    },
    {
      id: "q-x-d4-25", domainId: "d4", tag: "d4-t165", type: "single",
      prompt: "A developer wants the MOST effective defense against SQL injection in an application that builds database queries from user input. What should be used?",
      choices: [
        { id: "a", text: "Parameterized queries (prepared statements)" },
        { id: "b", text: "Client-side JavaScript validation only" },
        { id: "c", text: "Hiding error messages only" },
        { id: "d", text: "Encrypting the database" }
      ],
      correct: "a",
      explanation: "Parameterized queries keep user-supplied data separate from the SQL command, so input cannot change the query's structure.",
      distractorExplanations: {
        b: "Client-side validation can be bypassed and does not protect the server.",
        c: "Hiding errors reduces information leakage but does not prevent injection.",
        d: "Encrypting the database protects data at rest but does not stop injected queries from running."
      }
    },
    {
      id: "q-x-d4-26", domainId: "d4", tag: "d4-t165", type: "single",
      prompt: "A software publisher wants users to be able to verify that an installer really came from the company and was not modified after release. Which control provides this?",
      choices: [
        { id: "a", text: "Code signing" },
        { id: "b", text: "Obfuscation" },
        { id: "c", text: "Sandboxing" },
        { id: "d", text: "Fuzzing" }
      ],
      correct: "a",
      explanation: "Code signing applies a digital signature that proves the publisher's identity and that the code has not been altered since it was signed.",
      distractorExplanations: {
        b: "Obfuscation makes code harder to understand but does not prove its origin or integrity.",
        c: "Sandboxing isolates running code to contain damage.",
        d: "Fuzzing tests software with malformed input to find flaws."
      }
    },
    {
      id: "q-x-d4-27", domainId: "d4", tag: "d4-t166", type: "single",
      prompt: "A SOC wants phishing reports to be handled automatically: extract links, check reputation, search for the same email in other mailboxes, delete it, and open a ticket. Which technology BEST fits?",
      choices: [
        { id: "a", text: "SOAR with a phishing playbook" },
        { id: "b", text: "A network hub" },
        { id: "c", text: "A load balancer" },
        { id: "d", text: "A DHCP server" }
      ],
      correct: "a",
      explanation: "A SOAR platform orchestrates multiple tools and automates response steps defined in playbooks.",
      distractorExplanations: {
        b: "A hub repeats network traffic and has no response automation.",
        c: "A load balancer distributes traffic among servers.",
        d: "A DHCP server assigns IP addresses."
      }
    },
    {
      id: "q-x-d4-28", domainId: "d4", tag: "d4-t166", type: "single",
      prompt: "Which is a recognized RISK of heavily automating security responses?",
      choices: [
        { id: "a", text: "An erroneous rule or false positive can cause damage at machine speed, such as disabling critical accounts" },
        { id: "b", text: "Automation always reduces the need to monitor systems" },
        { id: "c", text: "Automated actions cannot be logged" },
        { id: "d", text: "Automation removes all complexity" }
      ],
      correct: "a",
      explanation: "Automation can amplify mistakes quickly, which is why high-impact actions should include human approval and testing.",
      distractorExplanations: {
        b: "Automation still needs monitoring and maintenance, including of the automation itself.",
        c: "Automated actions can and should be logged for audit.",
        d: "Automation typically adds complexity and technical debt rather than removing it."
      }
    },
    {
      id: "q-x-d5-13", domainId: "d5", tag: "d5-t162", type: "single",
      prompt: "A server is worth 300,000 dollars. A flood would destroy 30 percent of its value, and floods are expected once every 10 years. What is the annualized loss expectancy (ALE)?",
      choices: [
        { id: "a", text: "9,000 dollars" },
        { id: "b", text: "90,000 dollars" },
        { id: "c", text: "30,000 dollars" },
        { id: "d", text: "900,000 dollars" }
      ],
      correct: "a",
      explanation: "SLE = 300,000 x 0.30 = 90,000. ARO = 1 / 10 = 0.1. ALE = SLE x ARO = 90,000 x 0.1 = 9,000 dollars.",
      distractorExplanations: {
        b: "90,000 is the single loss expectancy, not the annualized figure.",
        c: "30,000 would result from using 10 percent instead of the correct exposure factor and rate.",
        d: "900,000 results from multiplying by 10 instead of dividing."
      }
    },
    {
      id: "q-x-d5-14", domainId: "d5", tag: "d5-t162", type: "single",
      prompt: "A control costs 5,000 dollars per year and reduces a risk's ALE from 20,000 dollars to 8,000 dollars. What is the annual value of the control?",
      choices: [
        { id: "a", text: "7,000 dollars net benefit" },
        { id: "b", text: "12,000 dollars net benefit" },
        { id: "c", text: "A 5,000 dollar loss" },
        { id: "d", text: "A 13,000 dollar net benefit" }
      ],
      correct: "a",
      explanation: "Value of the control = ALE before - ALE after - annual cost = 20,000 - 8,000 - 5,000 = 7,000 dollars a year.",
      distractorExplanations: {
        b: "12,000 is the reduction in ALE, before subtracting the cost of the control.",
        c: "The control saves more than it costs, so it is not a loss.",
        d: "13,000 incorrectly adds the cost instead of subtracting it."
      }
    },
    {
      id: "q-x-d5-15", domainId: "d5", tag: "d5-t163", type: "single",
      prompt: "Which measure is an example of a KEY RISK INDICATOR (KRI)?",
      choices: [
        { id: "a", text: "A rising number of critical vulnerabilities on Internet-facing systems that remain unpatched" },
        { id: "b", text: "The percentage of employees who completed annual training" },
        { id: "c", text: "The number of firewall rules" },
        { id: "d", text: "The total size of the log archive" }
      ],
      correct: "a",
      explanation: "A KRI is an early-warning measure that exposure is increasing, such as growing counts of exposed unpatched critical vulnerabilities.",
      distractorExplanations: {
        b: "Training completion is more of a performance measure (KPI) than a signal that risk is rising.",
        c: "The count of firewall rules does not by itself indicate changing risk.",
        d: "Archive size is an operational statistic, not a risk warning."
      }
    },
    {
      id: "q-x-d5-16", domainId: "d5", tag: "d5-t163", type: "single",
      prompt: "A CISO is preparing a report for the board of directors. Which approach is BEST?",
      choices: [
        { id: "a", text: "A few business-focused measures with trends, risk compared with appetite, and decisions needed" },
        { id: "b", text: "Raw log excerpts and detailed technical configurations" },
        { id: "c", text: "Only the number of attacks blocked by the firewall" },
        { id: "d", text: "A single number with no context" }
      ],
      correct: "a",
      explanation: "Executives need concise, business-oriented information showing trends, how risk compares with appetite, and what decisions or resources are required.",
      distractorExplanations: {
        b: "Raw technical detail is suited to operational teams, not to board-level decisions.",
        c: "Blocked attacks is a vanity metric that does not show risk or progress.",
        d: "A single number without context does not support decisions."
      }
    }
  ],

  glossary: [
    { term: "Beaconing", domain: "d4", plain: "Malware phoning home at regular intervals.", technical: "Regular, repeated outbound connections from a compromised host to a command-and-control server.", example: "A small connection to the same rare IP every 60 seconds." },
    { term: "SIM Swapping", domain: "d4", plain: "Stealing someone's phone number by tricking the carrier.", technical: "Convincing a mobile carrier to move a victim's number to an attacker's SIM to intercept calls, texts, and codes.", example: "Attacker receives your SMS login codes." },
    { term: "MFA Fatigue", domain: "d4", plain: "Spamming approval prompts until the user gives in.", technical: "An attack that repeatedly triggers MFA push notifications so the user eventually approves one.", example: "Dozens of prompts at 2 a.m." },
    { term: "Passkey", domain: "d4", plain: "A password replacement that cannot be phished.", technical: "A FIDO-based public-key credential unique to each site and bound to its domain.", example: "Signing in with a fingerprint-unlocked passkey." },
    { term: "Parameterized Query", domain: "d4", plain: "A database query that keeps user input separate from the command.", technical: "A prepared statement that binds user data as parameters, preventing SQL injection.", example: "SELECT * FROM users WHERE id = ?" },
    { term: "Code Signing", domain: "d4", plain: "A digital seal on software showing who made it and that it is unchanged.", technical: "Applying a digital signature to code so recipients can verify publisher authenticity and integrity.", example: "A signed installer shown as from a verified publisher." },
    { term: "SOAR", domain: "d4", plain: "Software that automates security response across tools.", technical: "Security Orchestration, Automation, and Response: connects tools and executes playbooks to automate incident response.", example: "Automatically deleting a phishing email from all mailboxes." },
    { term: "Playbook", domain: "d4", plain: "A prepared set of steps for a type of incident.", technical: "A defined set of steps and decision logic for responding to a specific incident type, manual or automated.", example: "A phishing response playbook." },
    { term: "Annualized Loss Expectancy", domain: "d5", plain: "The expected money lost per year from a risk.", technical: "ALE = SLE x ARO: expected yearly loss from a risk event.", example: "A 90,000 loss expected once in 10 years gives 9,000 a year." },
    { term: "Residual Risk", domain: "d5", plain: "The risk left after controls.", technical: "The risk remaining after security controls are applied; compared with risk appetite and tolerance.", example: "Remaining flood risk after buying insurance and moving servers." },
    { term: "Key Risk Indicator", domain: "d5", plain: "A warning sign that risk is rising.", technical: "A measure signaling an increase in risk exposure, usually with thresholds that trigger escalation.", example: "Overdue critical patches on Internet-facing servers." },
    { term: "Key Performance Indicator", domain: "d5", plain: "A measure of how well something is working.", technical: "A metric showing performance of a process or control against a target.", example: "Percentage of systems patched on time." }
  ],

  acronyms: [
    { acro: "SOAR", expansion: "Security Orchestration, Automation, and Response", meaning: "A platform that connects security tools and automates incident response workflows." },
    { acro: "CI/CD", expansion: "Continuous Integration / Continuous Delivery", meaning: "Automated pipelines that build, test, and deploy software." },
    { acro: "SDLC", expansion: "Software Development Life Cycle", meaning: "The phases a software product passes through from requirements to maintenance." },
    { acro: "SBOM", expansion: "Software Bill of Materials", meaning: "An inventory of the components that make up a piece of software." },
    { acro: "CSRF", expansion: "Cross-Site Request Forgery", meaning: "An attack that tricks a logged-in user's browser into sending unwanted requests." },
    { acro: "TOTP", expansion: "Time-based One-Time Password", meaning: "A one-time code that changes about every 30 seconds." },
    { acro: "HOTP", expansion: "HMAC-based One-Time Password", meaning: "A one-time code generated from a counter." },
    { acro: "AiTM", expansion: "Adversary-in-the-Middle", meaning: "An attack where a proxy relays a login to steal the authenticated session." },
    { acro: "KPI", expansion: "Key Performance Indicator", meaning: "A measure of how well a process or control meets its target." },
    { acro: "KRI", expansion: "Key Risk Indicator", meaning: "A measure that signals changing risk exposure." },
    { acro: "RAG", expansion: "Red-Amber-Green", meaning: "A status indicator showing whether a measure is on target, at risk, or off target." }
  ]
});
