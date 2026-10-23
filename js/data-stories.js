/* Stories from the Field — short narratives that make each lesson stick.
   Keyed by lesson id (like PRO_TIPS) and looked up in app.js via
   STORIES[lesson.id]. Each entry is an array of { title, kind, text, moral }.
   kind "real" = a widely reported public incident, told briefly and without
   unverifiable detail. kind "scenario" = an invented composite, clearly
   labeled as such in the UI. */

const STORIES = {
  // ---------- Fundamentals ----------
  "f-boot-process": [
    { title: "The Laptop That Booted Fine and Was Already Lost", kind: "scenario",
      text: "A finance manager's laptop passed every antivirus scan, yet kept phoning home. The analyst found a bootkit: malware that loaded before the operating system, so the OS and its security tools never saw it. Secure Boot had been switched off months earlier to make a Linux dual-boot work.",
      moral: "Whatever loads first gets to lie to everything that loads after. Secure Boot and measured boot protect the earliest link in the chain." }
  ],
  "f-os-fundamentals": [
    { title: "The Service Nobody Remembered", kind: "scenario",
      text: "During a routine review, a junior admin listed running services on an old file server and found one running as Administrator that nobody could explain. It had been installed by a vendor three years earlier for a project that ended. An attacker who reached that box would have inherited full admin for free.",
      moral: "Every running service is attack surface, and every service account is a set of privileges. If nobody owns it, disable it." }
  ],
  "f-command-line": [
    { title: "Netstat at 2 a.m.", kind: "scenario",
      text: "A help-desk tech was told a PC felt slow. Instead of rebooting it, they ran netstat -ano and saw an established connection to an unfamiliar foreign address owned by a process called svchost.exe running from a user's temp folder. The real svchost lives in System32. One command turned a slow PC ticket into an incident.",
      moral: "Knowing basic commands lets you see what the GUI hides. Process name plus location plus connection tells the story." }
  ],
  "f-file-permissions": [
    { title: "Everyone Means Everyone", kind: "scenario",
      text: "An HR share was set to Everyone: Full Control so a contractor could drop in a file quickly. Months later an intern, not an attacker, accidentally deleted a folder of payroll scans. The ticket said 'ransomware?' but the cause was one permission shortcut.",
      moral: "Over-broad permissions cause accidents as often as attacks. Grant the minimum, to groups, and review it." }
  ],
  "f-patching": [
    { title: "Equifax and the Missed Patch", kind: "real",
      text: "In 2017 Equifax disclosed a breach that exposed personal data of roughly 147 million people. The entry point was a known flaw in the Apache Struts web framework for which a patch had been available for weeks. The vulnerable system was not patched in time and had not been found by scanning.",
      moral: "Once a patch ships, the flaw is public knowledge and attackers race you. Asset inventory plus vulnerability scanning plus fast patching is the defense." }
  ],
  "f-virtualization": [
    { title: "The Snapshot That Time-Traveled", kind: "scenario",
      text: "An admin reverted a VM to last week's snapshot to fix a bad update. It worked, but it also rolled back the antivirus signatures, the local audit policy, and a password change made after a staff departure. The ex-employee's old password worked again for a day.",
      moral: "Snapshots restore state, including old weaknesses. Treat reverts as changes that need review, and watch for VM sprawl and forgotten images." }
  ],
  "f-osi-tcpip": [
    { title: "Layer by Layer", kind: "scenario",
      text: "Users couldn't reach an app. The new analyst guessed at the firewall. The senior analyst walked up the stack: link light on (L1), the switch port learning MACs (L2), a valid IP and gateway (L3), the port reachable (L4), and only then the application. The fault was an expired certificate at the top, which the firewall had nothing to do with.",
      moral: "The OSI model is a troubleshooting map. Name the layer and you stop guessing." }
  ],
  "f-ip-subnetting": [
    { title: "The /24 That Held Everything", kind: "scenario",
      text: "A small company put servers, cameras, guest Wi-Fi, and laptops all in one 192.168.1.0/24 network. When a guest's infected phone began scanning, it could see and probe every server. Splitting the network into subnets would not have stopped the infection, but it would have given the firewall places to say no.",
      moral: "Subnetting is not only about address math. Separate networks create boundaries where you can enforce policy." }
  ],
  "f-ports-protocols": [
    { title: "Telnet Was Still Listening", kind: "scenario",
      text: "A routine scan showed port 23 open on a switch closet device. Telnet sends everything, including the admin password, in plain text. A packet capture from a compromised printer on the same VLAN proved the password was readable by anyone who looked. Moving to SSH on port 22 took ten minutes.",
      moral: "Know the secure replacement for each legacy protocol: Telnet to SSH, HTTP to HTTPS, FTP to SFTP/FTPS, SNMPv1/2 to SNMPv3." }
  ],
  "f-dns-dhcp": [
    { title: "The Phone Book Was Lying", kind: "scenario",
      text: "Staff complained that the company's banking portal looked slightly off. The URL was right. A compromised router had been configured to hand out an attacker's DNS server, so the genuine name resolved to a copy of the site. Checking which DNS server DHCP was assigning exposed it within minutes.",
      moral: "DHCP decides who your DNS server is, and DNS decides where names go. Control either and you can steer victims without touching their devices." }
  ],
  "f-routing-switching-vlans": [
    { title: "One Cable, Two Networks", kind: "scenario",
      text: "An office plugged a conference-room jack straight into the same VLAN as the finance servers because it was easier. A visitor's laptop, plugged in for a presentation, could ping the accounting database. The fix was assigning the port to a guest VLAN and routing it through the firewall.",
      moral: "VLANs are logical walls. Unused or convenient ports in the wrong VLAN quietly remove them." }
  ],
  "f-firewall-nat-vpn-wifi": [
    { title: "The Rogue Access Point Under the Desk", kind: "scenario",
      text: "A well-meaning employee plugged a cheap Wi-Fi router into a wall jack to get better signal at their desk, and left it on default settings. It bridged an open wireless network directly into the internal LAN, bypassing the perimeter firewall completely. The wireless survey caught it on its next sweep.",
      moral: "A firewall only protects the paths that go through it. Rogue devices create back doors, so monitor for them." }
  ],

  // ---------- Domain 1 ----------
  "d1-t2": [
    { title: "Target and the HVAC Contractor", kind: "real",
      text: "In 2013 attackers reached Target's network using credentials stolen from a heating and air-conditioning vendor, then moved from that low-trust foothold toward the point-of-sale systems, ultimately exposing payment card data. The vendor only needed access to billing and project systems, not the core of the network.",
      moral: "Least privilege and segmentation limit how far one stolen credential can travel. Access should match the job." },
    { title: "Two Keys for the Vault", kind: "scenario",
      text: "A small bank required two managers to approve any wire over a threshold. One day a convincing email 'from the CEO' asked a single manager to rush a transfer. The manager's reflex was 'I can't, I need a second approver', and that delay gave time for the call-back that exposed the fraud.",
      moral: "Separation of duties turns one person's mistake or compromise into a recoverable event." }
  ],
  "d1-t3": [
    { title: "Knight Capital's 45 Minutes", kind: "real",
      text: "In 2012 trading firm Knight Capital deployed new software to its servers, but one server missed the update and kept old code that was triggered by the new release. In about forty-five minutes it sent a flood of unintended orders and lost roughly $440 million, nearly ending the firm.",
      moral: "Uncontrolled or inconsistent deployments are a security and business risk. Tested changes, a verified rollout, and a rollback plan are not bureaucracy." }
  ],
  "d1-t4": [
    { title: "The Password Database Nobody Salted", kind: "scenario",
      text: "A forum stored passwords as plain unsalted hashes. After a leak, attackers matched hashes against precomputed tables and recovered most passwords in hours, and because users reused them, the damage spread to other sites. With a unique salt per password and a slow hash such as bcrypt, the same leak would have been far less useful.",
      moral: "Hashing is not encryption. Salt defeats precomputed tables, and slow hashing makes guessing expensive." }
  ],
  "d1-t5": [
    { title: "The Tailgater With Coffee", kind: "scenario",
      text: "A tester in a business casual outfit carried two coffees to the secure door and smiled at an employee who badged in. The employee held the door open. Inside, the tester plugged a device into an unused wall port and left. A mantrap or a guard, plus a habit of challenging strangers, would have stopped it.",
      moral: "Badges only help if people don't hold doors. Physical controls fail at the human step." }
  ],
  "d1-t4b": [
    { title: "DigiNotar Loses the Keys", kind: "real",
      text: "In 2011 attackers compromised the Dutch certificate authority DigiNotar and issued fraudulent certificates, including ones for major websites. Browsers had to remove trust in the CA entirely, and the company went bankrupt shortly after.",
      moral: "Everything in PKI rests on trust in the CA. When a CA is compromised, certificate revocation and removing the root from trust stores become the response." }
  ],
  "d1-t4c": [
    { title: "Heartbleed: When the Key Leaves the Building", kind: "real",
      text: "In 2014 the Heartbleed bug in OpenSSL let attackers read chunks of a server's memory, which could include private keys and session data. Admins had to patch, then revoke and reissue certificates, because anyone who might have copied the old private key could impersonate the server.",
      moral: "Strong algorithms don't help if key management fails. A possibly exposed private key means rotate and revoke." }
  ],
  "d1-t3b": [
    { title: "The Firewall Rule That Fixed Everything", kind: "scenario",
      text: "At 4 p.m. on a Friday an engineer added an 'allow any any' rule to stop a vendor complaining, with no ticket. The rule was never removed. Months later a scan showed the internal database reachable from the internet. The change log had nothing, so nobody knew who, when, or why.",
      moral: "Change management is the paper trail and the safety net: approval, impact analysis, testing, a rollback plan, and documentation." }
  ],

  // ---------- Domain 2 ----------
  "d2-t1": [
    { title: "Why Would a Nation-State Want My Small Firm?", kind: "scenario",
      text: "A 40-person engineering consultancy assumed it was too small to matter. Investigators found long-term quiet access aimed at one client's design files. The firm itself was not the target; it was the softer door into a bigger one.",
      moral: "Match actor to motive. Nation-states are patient and well-funded, criminals want money, hacktivists want attention, insiders want grievance or gain. Small organizations are often stepping stones." }
  ],
  "d2-t2": [
    { title: "The USB in the Parking Lot", kind: "scenario",
      text: "A security team dropped branded USB sticks in a parking lot as an authorized test. Nearly half were plugged into company machines within days. Each stick carried only a harmless beacon, but a real one could have been malware.",
      moral: "Vectors include removable media, email, web, supply chain, and more. Curiosity is an attack surface." }
  ],
  "d2-t3": [
    { title: "A Zero-Day Is Only Zero Until It Isn't", kind: "scenario",
      text: "A vendor learned its VPN appliance had an unpatched flaw already being exploited in the wild. There was no patch yet. The security team disabled the vulnerable management feature, restricted access by IP, and watched logs until the fix came.",
      moral: "When there's no patch, use compensating controls. A zero-day has no fix yet; a known vulnerability has one waiting to be applied." },
    { title: "Log4Shell Weekend", kind: "real",
      text: "In December 2021 a flaw in the widely used Log4j logging library let attackers run code by getting a crafted string logged. Organizations scrambled because they often did not know which of their applications included Log4j at all.",
      moral: "You can't patch what you don't know you have. Software inventories and SBOMs matter before the crisis." }
  ],
  "d2-t4": [
    { title: "Colonial Pipeline", kind: "real",
      text: "In 2021 a ransomware attack on Colonial Pipeline led the company to halt pipeline operations for several days, causing fuel shortages across parts of the U.S. East Coast. Reporting indicated attackers entered through a legacy VPN account protected only by a password.",
      moral: "Ransomware hurts most when it reaches operations. Multifactor authentication, segmentation, and tested recovery blunt it." },
    { title: "The Slow Burn of a Keylogger", kind: "scenario",
      text: "An accountant noticed their typing lagging slightly. A keylogger had been quietly recording credentials for weeks, and the attacker waited to use them until payroll day. The only clue had been a tiny, unexplained process.",
      moral: "Not all malware is loud. Spyware and keyloggers aim for quiet, long-term access, so watch for small anomalies." }
  ],
  "d2-t5": [
    { title: "Layers That Saved a Tuesday", kind: "scenario",
      text: "A user clicked a phishing link. The email gateway had already stripped the attachment, endpoint protection blocked the payload, segmentation kept the workstation away from servers, and the immutable backups meant nothing was lost anyway. Four partial controls, one calm Tuesday.",
      moral: "Defense in depth assumes each control will sometimes fail. Mitigation is about stacking them so one failure isn't a breach." }
  ],
  "d2-t6": [
    { title: "MGM and a Phone Call", kind: "real",
      text: "In 2023 MGM Resorts suffered a major disruption that was widely reported to have begun with a social-engineering call to the help desk by someone posing as an employee. The call, not a technical exploit, got the attackers a foothold.",
      moral: "Help desks are targets. Verify identity with a process that doesn't rely on what the caller already knows." },
    { title: "The CEO Who Needed Gift Cards", kind: "scenario",
      text: "An assistant received a text from 'the CEO' asking for gift-card codes immediately, with 'I'm in a meeting, can't talk.' The urgency and authority were the whole attack. A quick call to the real CEO's number ended it in thirty seconds.",
      moral: "Authority, urgency, and scarcity are the levers. Slow down and verify through a second channel." }
  ],
  "d2-t7": [
    { title: "The Impossible Traveler", kind: "scenario",
      text: "A SIEM alert showed the same user signing in from Manila and then from Frankfurt twelve minutes apart. Nobody travels that fast. Credentials had been stolen, and the account was disabled before any mail was read.",
      moral: "Indicators of compromise like impossible travel, odd hours, unusual data volume, and new admin accounts work together. One clue is a question; several are an answer." }
  ],
  "d2-t8": [
    { title: "Jailbroken and Forgotten", kind: "scenario",
      text: "A sales director's personal phone, jailbroken years earlier, was enrolled in corporate email. Because the phone's built-in protections were disabled, a malicious app read the mail cache. MDM compliance checks would have flagged the jailbreak and blocked access.",
      moral: "Rooting and jailbreaking remove the platform's guardrails. MDM enforces health checks, encryption, and remote wipe." }
  ],
  "d2-t9": [
    { title: "SolarWinds", kind: "real",
      text: "In 2020 attackers inserted malicious code into the build process of SolarWinds' Orion software, so a legitimately signed update delivered a backdoor to thousands of customers, including government agencies. Defenders trusted the update because it came from the vendor.",
      moral: "Supply chain attacks abuse trust. Vendor risk reviews, monitoring for odd behavior from trusted software, and software bills of materials help." }
  ],
  "d2-t10": [
    { title: "The Departing Engineer", kind: "scenario",
      text: "An engineer who had given notice began downloading far more files than usual, then emailed project archives to a personal account. A DLP rule and a behavior alert caught it two days before their last day. Another colleague was caught in a different case simply running an unapproved file-sharing app because it was 'easier' — shadow IT with no malicious intent.",
      moral: "Insider risk spans malicious, negligent, and compromised. Monitor, offboard promptly, and give people approved tools so they don't invent their own." }
  ],
  "d2-t11": [
    { title: "Heartbleed in One Sentence", kind: "real",
      text: "Heartbleed was a missing bounds check: the code trusted a length value supplied by the requester and returned more memory than it should have. It wasn't clever. It was a size problem, the cousin of the buffer overflow, in one of the most widely used encryption libraries.",
      moral: "Many headline vulnerabilities come down to unchecked input. Input validation and safe memory handling prevent whole families of attacks." },
    { title: "The Race to the Symlink", kind: "scenario",
      text: "A backup script checked that a file was safe, then opened it. An attacker with local access repeatedly swapped the file for a link to a sensitive one, winning the race in the gap between check and use. The script ran as root and happily read what it shouldn't.",
      moral: "TOCTOU is a timing flaw. Make the check and the use a single atomic operation." }
  ],
  "d2-t12": [
    { title: "Coffee Shop Redirect", kind: "scenario",
      text: "In a café, a traveler's laptop silently began sending traffic through another customer's device after forged ARP replies claimed that device was the gateway. Only a VPN kept the sessions unreadable. On corporate networks, dynamic ARP inspection and DHCP snooping on the switches are what block this.",
      moral: "Layer 2 trusts everyone by default. Switch features like port security, DHCP snooping, and ARP inspection restore some skepticism." }
  ],

  // ---------- Domain 3 ----------
  "d3-t1": [
    { title: "Capital One and a Cloud Misstep", kind: "real",
      text: "In 2019 Capital One disclosed a breach of data on over 100 million people in the U.S. and Canada, reported to involve a misconfigured web application firewall and an over-privileged role that let an attacker reach storage in the cloud.",
      moral: "Architecture is more than boxes. Misconfiguration and excess permissions in cloud environments are among the most common causes of breaches." }
  ],
  "d3-t2b": [
    { title: "The Jump Server That Became a Choke Point", kind: "scenario",
      text: "A company stopped letting admins connect straight to servers and forced all access through a hardened jump server with session recording. When a contractor's laptop was later compromised, the attacker could only reach the jump server's login, where MFA stopped them, and every attempt was logged.",
      moral: "Centralizing privileged access gives you one place to harden, monitor, and audit." }
  ],
  "d3-t3": [
    { title: "The Laptop in the Taxi", kind: "scenario",
      text: "An executive left a laptop in a taxi. Panic lasted ten minutes, until IT confirmed full-disk encryption was enforced and the recovery key was escrowed. The loss became a hardware replacement ticket instead of a breach notification.",
      moral: "Protect data at rest, in transit, and in use. Encryption turns a lost device into an inconvenience." }
  ],
  "d3-t4": [
    { title: "NotPetya and the Domain Controller in Ghana", kind: "real",
      text: "In 2017 the NotPetya malware devastated shipping giant Maersk, wiping a huge number of its systems. Reporting later described how recovery was possible partly because one domain controller in a remote office had been offline from a power outage and so escaped the wipe.",
      moral: "Resilience cannot depend on luck. Offline copies, tested restores, and geographic separation are the planned version of that accident." }
  ],
  "d3-t2c": [
    { title: "The Plain-Text FTP Habit", kind: "scenario",
      text: "A vendor insisted on FTP for nightly file drops, 'because it always worked.' An audit showed credentials crossing the network in cleartext. Switching to SFTP, which runs over SSH, kept the same workflow and removed the exposure.",
      moral: "Pair every insecure protocol with its secure sibling, and know the ports and what each one encrypts." }
  ],
  "d3-t5": [
    { title: "Mirai and the Default Password", kind: "real",
      text: "In 2016 the Mirai botnet recruited huge numbers of internet-connected cameras and routers simply by logging in with factory-default credentials, then used them to launch record-sized denial-of-service attacks.",
      moral: "IoT devices are often unpatchable and shipped with default passwords. Change defaults, isolate them on their own network, and never expose them directly." },
    { title: "The Medical Pump on the Guest Wi-Fi", kind: "scenario",
      text: "A hospital found an infusion pump on a flat network with office PCs. It ran an old OS that could not be patched without vendor approval. The compensating control was a dedicated VLAN with strict firewall rules, since the device itself couldn't be fixed.",
      moral: "When you can't patch, you segment. Compensating controls protect specialized and legacy systems." }
  ],
  "d3-t6": [
    { title: "The Server Room Next to the Kitchen", kind: "scenario",
      text: "A small firm kept its servers in a closet beside the kitchen. A leaking pipe and a hot summer later, the machines shut down in the middle of month-end. There was no temperature sensor, no water detection, and no UPS capacity left for a clean shutdown.",
      moral: "Environmental controls are security controls: HVAC, fire suppression, power conditioning, and monitoring protect availability." }
  ],
  "d3-t7": [
    { title: "Black Friday, Node by Node", kind: "scenario",
      text: "A retailer's single web server collapsed under holiday traffic. The next year a load balancer spread requests across several nodes with health checks, so when one node failed the others carried on and customers never noticed.",
      moral: "High availability removes single points of failure. Load balancing, clustering, and redundancy keep services up." }
  ],
  "d3-t8": [
    { title: "Never Trust, Always Verify", kind: "scenario",
      text: "After a contractor's VPN credentials were stolen, the old network trusted anything inside the VPN. The redesign evaluated every request on identity, device health, and context, per resource, so a stolen login alone no longer opened anything meaningful.",
      moral: "Zero trust removes implicit trust based on network location. Verify explicitly, use least privilege, and assume breach." }
  ],
  "d3-t9": [
    { title: "The Firewall That Couldn't Read", kind: "scenario",
      text: "A stateful firewall allowed port 443 outbound, so malware tunneled its command-and-control traffic over HTTPS and sailed through. A next-generation firewall with application awareness and TLS inspection later identified the traffic as something other than normal web browsing.",
      moral: "Port-based rules can't see what's inside allowed traffic. NGFWs and WAFs inspect at the application layer." }
  ],
  "d3-t10": [
    { title: "The Spreadsheet That Tried to Leave", kind: "scenario",
      text: "A well-meaning analyst tried to email a spreadsheet of customer numbers to a personal address 'to work from home.' The DLP system matched the pattern and quarantined the message, then notified the analyst and security. No lecture needed; the tool just stopped the mistake.",
      moral: "DLP finds sensitive data by patterns, keywords, and labels, and can block, alert, or encrypt across email, endpoints, and cloud." }
  ],
  "d3-t11": [
    { title: "Everything Was 'Confidential'", kind: "scenario",
      text: "A company labeled every document Confidential. Within a year, nobody took the label seriously, and genuinely sensitive files weren't handled differently. A simple four-tier scheme with clear handling rules, and named data owners, restored meaning.",
      moral: "Classification only works if labels differ in treatment. Owners decide, custodians protect, and disposal must match sensitivity." }
  ],
  "d3-t12": [
    { title: "The Open Bucket", kind: "scenario",
      text: "A startup stored customer exports in a cloud bucket set to public 'temporarily.' A researcher found it with a simple search and reported it. The provider's infrastructure was secure; the customer's configuration was not.",
      moral: "In the shared responsibility model the provider secures the cloud, and you secure what you put in it: configuration, identities, and data." }
  ],
  "d3-t13": [
    { title: "Stuxnet Crossed the Air Gap", kind: "real",
      text: "Stuxnet, discovered in 2010, targeted industrial control systems in an isolated network and is widely reported to have spread via removable media. It is a reminder that an air gap with no network link can still be crossed by a human carrying a USB drive.",
      moral: "An air gap stops network paths, not people. Control removable media and physical access too." }
  ],
  "d3-t14": [
    { title: "Code Spaces Had Backups. In the Same Account.", kind: "real",
      text: "In 2014 hosting company Code Spaces was attacked; the intruder gained access to its cloud control panel and deleted data and backups that lived in the same environment. The company never recovered.",
      moral: "Backups need separation: offline or immutable copies, different credentials, and tested restores. 3-2-1 exists for a reason." }
  ],

  // ---------- Domain 4 ----------
  "d4-t1": [
    { title: "The Golden Image", kind: "scenario",
      text: "A company rebuilt every new laptop from a hardened baseline image: unnecessary services off, host firewall on, disk encryption enforced. When a new vulnerability dropped, they patched the image once and every future laptop was fixed.",
      moral: "Secure baselines and hardening make security repeatable. Fix it once in the template." }
  ],
  "d4-t2": [
    { title: "The Server Nobody Owned", kind: "scenario",
      text: "A forgotten test server had been running an old web app for years. When it was compromised there was no owner to call, no patch schedule, and no record it existed. Asset management, with owners and lifecycle tracking, would have retired it long before.",
      moral: "You can't protect what you don't know about. Inventory, ownership, and decommissioning matter." }
  ],
  "d4-t3": [
    { title: "A Scan, 3,000 Findings, and a Plan", kind: "scenario",
      text: "A first scan produced thousands of findings. The team triaged by severity, exploitability, and asset importance: patch internet-facing, exploited-in-the-wild flaws first, schedule the rest. They also rescanned afterward to confirm fixes, not assume them.",
      moral: "Vulnerability management is prioritize, remediate, verify. CVSS is an input, not the whole decision." }
  ],
  "d4-t4": [
    { title: "Target Saw the Alert", kind: "real",
      text: "In the 2013 Target breach, public reporting indicated that security tooling raised alerts about the malware, but they were not acted on in time. The signal existed; the response didn't.",
      moral: "Monitoring is only as useful as the triage and response behind it. Tune alerts so people trust them." }
  ],
  "d4-t5": [
    { title: "The Firewall Rule Review", kind: "scenario",
      text: "A yearly rule review found hundreds of rules, many with no owner and some obsolete. Cleaning them up shrank the attack surface and made incidents easier to understand.",
      moral: "Enterprise controls drift. Review firewall rules, web filters, and email security regularly." }
  ],
  "d4-t6": [
    { title: "Uber and the MFA Fatigue", kind: "real",
      text: "In 2022 a teenager attacker was widely reported to have gained access to Uber systems partly by repeatedly pushing MFA prompts to a contractor until they approved one, after obtaining their credentials. Push fatigue turned a second factor into a nuisance people clicked through.",
      moral: "MFA helps but not all factors are equal. Number matching, phishing-resistant methods, and user training reduce prompt bombing." }
  ],
  "d4-t7": [
    { title: "The Playbook at 3 a.m.", kind: "scenario",
      text: "Phishing reports used to take an analyst thirty minutes each. A SOAR playbook now extracts the links, checks reputation, pulls matching mail from all inboxes, and opens a ticket in under a minute, leaving analysts for the hard cases.",
      moral: "Automation handles the repetitive; people handle judgment. Test playbooks, because a bad automated action scales its mistakes." }
  ],
  "d4-t9": [
    { title: "Stitching the Timeline", kind: "scenario",
      text: "A suspicious IP appeared in a firewall log. The analyst traced it through DHCP to a laptop, through endpoint logs to a process, and through DNS to a suspicious domain. Each source had only part of the story. Together they were the incident.",
      moral: "Know which log answers which question, and keep clocks synchronized so the timeline lines up." }
  ],
  "d4-t1b": [
    { title: "The Evil Twin at the Airport", kind: "scenario",
      text: "A traveler connected to 'Airport_Free_WiFi' — a hotspot set up by someone sitting nearby, using the same name as the real one. Everything the traveler did passed through the attacker. Using the corporate VPN and WPA3 where available shields against it.",
      moral: "Wireless attacks like evil twin and rogue AP exploit trust in a name. Prefer authenticated networks and use a VPN on public Wi-Fi." }
  ],
  "d4-t10": [
    { title: "Fixing It in Design Is Cheap", kind: "scenario",
      text: "A team found an injection flaw during code review. The fix took twenty minutes. The same flaw found after release would have meant an emergency patch, customer notices, and an investigation.",
      moral: "Shift left: threat model early, review code, test in CI, and validate input. The cost of fixing grows with every stage." }
  ],
  "d4-t8b": [
    { title: "The Chain of Custody Gap", kind: "scenario",
      text: "A company found proof an employee stole data, but the drive had sat unlabeled on an admin's desk for two days. The defense argued it could have been altered, and the evidence was weakened. Hashing the image and logging every handoff would have protected it.",
      moral: "Preserve evidence in order of volatility, hash it, document every transfer, and work on copies." }
  ],
  "d4-t11": [
    { title: "A Feed That Was Actually Useful", kind: "scenario",
      text: "A feed warned that a particular criminal group was targeting the company's industry with a specific phishing lure. The team searched mail logs for it and blocked three infected messages before anyone opened them.",
      moral: "Threat intelligence is valuable when it's relevant, timely, and actioned. Know sources like ISACs, OSINT, and commercial feeds." }
  ],
  "d4-t12": [
    { title: "No Alert, but a Hunch", kind: "scenario",
      text: "A hunter reasoned that attackers using stolen credentials often log in at odd hours from rarely used workstations. They searched for it, no alert had fired, and found a quiet intruder who had been inside for weeks.",
      moral: "Hunting starts with a hypothesis, not an alert. It finds what detections miss and then improves them." }
  ],
  "d4-t13": [
    { title: "Mapping to ATT&CK", kind: "scenario",
      text: "After a red-team exercise, the blue team mapped what was detected and what was missed onto MITRE ATT&CK. The map showed strong coverage of initial access and a bare patch around lateral movement, which told them exactly what to build next.",
      moral: "Frameworks give a shared language and a way to spot gaps. Know ATT&CK, the Cyber Kill Chain, and the Diamond Model." }
  ],
  "d4-t14": [
    { title: "The Passkey That Couldn't Be Phished", kind: "scenario",
      text: "A user clicked a fake login page. A password would have been typed in and lost. The passkey would not work: it is bound to the real website's domain, so the fake page got nothing to steal.",
      moral: "Passkeys and FIDO2 resist phishing because the credential only works for the genuine origin." }
  ],
  "d4-t15": [
    { title: "Who Do We Tell, and When?", kind: "scenario",
      text: "During an incident, two executives issued conflicting statements to customers. Afterward the company defined roles: a single communications lead, a legal reviewer, a stakeholder list, and a rule to use out-of-band channels in case email was compromised.",
      moral: "Incident response includes communication: internal escalation, legal and regulatory notification, and consistent external messaging." }
  ],
  "d4-t16": [
    { title: "Golden Ticket", kind: "scenario",
      text: "An attacker who stole the credentials behind Kerberos' ticket-granting system could forge tickets for almost any account and keep access even after password changes. The remedy was resetting the key account's secret twice and rebuilding trust carefully.",
      moral: "Know what each protocol does: Kerberos tickets, LDAP directory queries, RADIUS network access, TACACS+ device administration." }
  ],
  "d4-t17": [
    { title: "The Ghost Account", kind: "scenario",
      text: "A contractor left but their account stayed active. Eight months later it was used to log in from another country. Automated deprovisioning tied to HR offboarding would have closed it the day they left.",
      moral: "Accounts have a lifecycle. Provision, review, and promptly deprovision, and watch for privilege creep." }
  ],
  "d4-t18": [
    { title: "The Scanner That Couldn't See the Laptop", kind: "scenario",
      text: "A network scanner reported a clean estate. But half the laptops were off-site and powered off during scans, so they were never assessed. Agents installed on each laptop reported in whenever it came online and revealed dozens of missing patches.",
      moral: "Agentless scanning has blind spots for roaming and offline devices. Choose the method for the environment." }
  ],

  // ---------- Domain 5 ----------
  "d5-t1": [
    { title: "A Policy Nobody Read", kind: "scenario",
      text: "A thirty-page security policy sat in a shared drive. After an incident, nobody could say who owned what. The rewrite had clear policies, supporting standards, procedures people could follow, and named owners and review dates.",
      moral: "Governance is a hierarchy: policies state intent, standards set requirements, procedures give steps, guidelines advise." }
  ],
  "d5-t3": [
    { title: "The Vendor Who Held the Keys", kind: "scenario",
      text: "A company outsourced payroll to a vendor and never asked for an assessment. When the vendor was breached, the company's employees' data was exposed. A contract with security requirements, audit rights, and a breach-notification clause would have changed the outcome.",
      moral: "You are responsible for your data even when a third party holds it. Assess vendors and put expectations in the SLA, MSA, and NDA." }
  ],
  "d5-t4": [
    { title: "The Right to Be Forgotten", kind: "scenario",
      text: "A customer asked a company to delete their personal data. Nobody knew where it all lived: databases, backups, marketing tools. A data inventory and retention schedule turned a scramble into a routine request.",
      moral: "Privacy and compliance rules such as GDPR require knowing what personal data you hold, why, and for how long." }
  ],
  "d5-t5": [
    { title: "The Audit That Found the Real Problem", kind: "scenario",
      text: "An internal audit checked whether access reviews were actually performed, not just whether a policy existed. They had stopped two years earlier. The finding led to a control that was documented, owned, and evidenced.",
      moral: "Audits test controls against evidence. Internal, external, and regulatory audits each serve a purpose, and assessments should lead to remediation." }
  ],
  "d5-t6": [
    { title: "Phishing Simulation Done Kindly", kind: "scenario",
      text: "A company stopped publicly shaming people who failed simulated phishing tests and started rewarding reporting. Report rates rose sharply, and real phishing emails were flagged by staff within minutes.",
      moral: "Awareness works when it builds a reporting culture, not fear. Train on phishing, passwords, physical safety, and insider-risk signs." }
  ],
  "d5-t7": [
    { title: "The DR Test That Failed Usefully", kind: "scenario",
      text: "During a tabletop exercise, the team discovered their recovery plan relied on a person who had left the company and a phone tree with outdated numbers. Better to fail in a test than in a crisis.",
      moral: "Continuity plans need exercises. Business impact analysis sets priorities, and RTO and RPO set the targets." }
  ],
  "d5-t8": [
    { title: "Useful Data Without the Names", kind: "scenario",
      text: "Analysts needed realistic customer data for testing. Instead of using production data, the team masked names and tokenized card numbers, so testers had realistic formats and nobody had real identities.",
      moral: "Privacy-enhancing technologies like masking, tokenization, pseudonymization, and anonymization reduce exposure while keeping data useful." }
  ],
  "d5-t9": [
    { title: "Rules of Engagement", kind: "scenario",
      text: "A penetration tester was hired to test a web application. The written rules of engagement listed scope, dates, and contacts. When they found a path into an out-of-scope payroll system, they stopped and reported it instead of continuing.",
      moral: "Authorization and scope separate a penetration test from a crime. Know black, white, and gray box and the phases of a test." }
  ],
  "d5-t2": [
    { title: "Doing the Math Before the Meeting", kind: "scenario",
      text: "A CISO asked for budget to fix a flaw. The CFO asked 'how much does it cost us if we don't?' With an asset worth 400,000, an exposure factor of 50 percent, and an annual rate of 0.5, the ALE was 100,000 — more than the 40,000 fix. Funding approved.",
      moral: "SLE = asset value x exposure factor; ALE = SLE x ARO. Numbers let you compare risk to the cost of controls." }
  ],
  "d2-t43": [
    {
      "title": "The Wire That Almost Went Out",
      "kind": "scenario",
      "text": "A mid-size manufacturer's finance clerk got an email from a regular supplier's address asking to change bank details before a large payment. A check of the supplier's real number found the supplier had never sent it; their mailbox had been hijacked weeks earlier. Hundreds of thousands were saved by one phone call.",
      "moral": "BEC contains no malware. The control is process: verify payment changes out-of-band."
    },
    {
      "title": "The Voice on the Call",
      "kind": "scenario",
      "text": "An employee took a call from someone who sounded exactly like their director, asking for an urgent transfer. The voice was synthetic. The employee's company had a rule that no transfer is approved on a single call, and that rule held.",
      "moral": "Deepfakes make impersonation convincing. Procedures beat instincts."
    }
  ],
  "d2-t14": [
    {
      "title": "The Seasonal Password",
      "kind": "scenario",
      "text": "A company noticed one IP address attempting a single login to each of 8,000 accounts overnight. No account locked out. Forty accounts used the same seasonal password. MFA, rolled out the next week, would have made that password worthless on its own.",
      "moral": "Spraying hides under lockout thresholds. Watch for one source across many accounts."
    }
  ],
  "d2-t15": [
    {
      "title": "The Developer Who Planned to Leave",
      "kind": "scenario",
      "text": "A developer, expecting to be fired, hid code that would erase production servers if their account was ever disabled. It was found during an unrelated code review after their departure, hours before it would have triggered.",
      "moral": "Logic bombs are triggered by conditions, and they are best caught by review and insider-risk controls."
    }
  ],
  "d5-t40": [
    {
      "title": "What Target, Equifax, and Colonial Had in Common",
      "kind": "scenario",
      "text": "Lined up on a whiteboard, the three cases shared an uncomfortable pattern: a gap in the basics that was known or knowable. A vendor with too much access, a patch not applied, a password without a second factor. None required genius from the attacker.",
      "moral": "Exam-style scenarios usually reward the boring answer: patch, segment, verify identity, back up."
    }
  ],
  "d1-t36": [
    {
      "title": "The Recorded Traffic That Stayed Locked",
      "kind": "scenario",
      "text": "An agency recorded years of encrypted traffic hoping to decrypt it if it ever obtained the server's private key. When the key was finally stolen, it opened nothing: every session had used a fresh ephemeral key, so there was nothing to unlock.",
      "moral": "Perfect forward secrecy limits the blast radius of a future key compromise."
    },
    {
      "title": "MD5 and the Forged Certificate",
      "kind": "real",
      "text": "In 2008 researchers demonstrated that weaknesses in MD5 could be used to create a rogue certificate authority certificate. Certificate authorities moved away from MD5 afterwards.",
      "moral": "A broken hash is not a theoretical problem; collisions can be turned into forged trust."
    }
  ],
  "d1-t37": [
    {
      "title": "The Fake AWS Key",
      "kind": "scenario",
      "text": "A team planted a fake cloud access key in a code repository. Weeks later a login attempt with it came from an unfamiliar country. The key was never used by anyone real, so the alert proved the repository had leaked, and the team rotated real secrets before any damage.",
      "moral": "Honeytokens give high-confidence breach detection for almost no cost."
    }
  ],
  "d1-t8": [
    {
      "title": "The Phone That Wiped Itself",
      "kind": "scenario",
      "text": "A seized phone was dropped into an ordinary evidence bag. Minutes later its owner sent a remote-wipe command and the evidence vanished. After that, the lab used Faraday bags that block the signal for every seized device.",
      "moral": "Shielding is a security control: it prevents remote commands from ever arriving."
    }
  ],
  "d2-t16": [
    {
      "title": "The 2016 Dyn Outage",
      "kind": "real",
      "text": "In October 2016 a large DDoS attack against DNS provider Dyn made many well-known websites hard to reach for hours. Reporting linked it to the Mirai botnet of infected IoT devices.",
      "moral": "DDoS can hit a shared dependency like DNS and take down many sites at once."
    }
  ],
  "d2-t17": [
    {
      "title": "The Free USB Giveaway",
      "kind": "scenario",
      "text": "At a trade show, a vendor handed out branded USB drives. One attendee plugged theirs into a work laptop. It identified itself as a keyboard and typed a command that downloaded a remote access tool within seconds. The antivirus never saw a 'file' because the keyboard was the attack.",
      "moral": "A USB device is more than storage. Control which device classes are allowed."
    }
  ],
  "d2-t18": [
    {
      "title": "Capital One and SSRF",
      "kind": "real",
      "text": "The 2019 Capital One breach was widely reported to involve server-side request forgery against a misconfigured web application firewall, which was used to reach cloud credentials and then storage.",
      "moral": "SSRF is powerful in the cloud because internal metadata services trust the server's network position."
    },
    {
      "title": "The Comment That Stole Sessions",
      "kind": "scenario",
      "text": "A blog allowed HTML in comments. One comment hid a script that sent each visitor's session cookie to an attacker's server. Setting HttpOnly on cookies and encoding output would have neutralized it.",
      "moral": "XSS is about where untrusted data ends up. Encode on output."
    }
  ],
  "d2-t19": [
    {
      "title": "The Fake Press Release",
      "kind": "scenario",
      "text": "A realistic but fabricated press release announcing an executive resignation spread on social media. Staff answered customer questions from it for an hour before communications confirmed it was false. Afterward the company published a verification page and a single official channel for announcements.",
      "moral": "A clear, known official channel is the best defense against impersonation."
    }
  ],
  "d3-t46": [
    {
      "title": "The Region Nobody Chose",
      "kind": "scenario",
      "text": "A developer spun up a storage bucket in the default cloud region, which happened to be in another country. An audit later found customer records there, which broke a contractual residency promise. A policy that only allows approved regions closed the gap.",
      "moral": "Residency problems are often accidents of defaults. Restrict regions by policy."
    }
  ],
  "d3-t18": [
    {
      "title": "The RAID That Mirrored the Mistake",
      "kind": "scenario",
      "text": "An admin deleted the wrong folder from a RAID 1 server. Both disks mirrored the deletion instantly. The team restored from last night's backup, and added a rule: RAID is for uptime, backups are for recovery.",
      "moral": "Redundancy protects against hardware failure, not human or malicious error."
    }
  ],
  "d3-t19": [
    {
      "title": "The Key in the Repository",
      "kind": "scenario",
      "text": "A developer pushed a cloud access key to a public repository. Bots found it within minutes and launched expensive compute jobs for cryptomining. Secret scanning in the pipeline and short-lived credentials would have blocked it.",
      "moral": "Never put secrets in code. Scan for them automatically and prefer short-lived credentials."
    }
  ],
  "d4-t49": [
    {
      "title": "The Intern With Admin Rights",
      "kind": "scenario",
      "text": "An intern was given access by copying a senior engineer's account permissions 'to save time.' The intern could suddenly read finance files. Moving to role-based groups with an approval workflow fixed the root issue.",
      "moral": "Copying one person's permissions invites privilege creep. Use roles."
    }
  ],
  "d4-t50": [
    {
      "title": "The Capture That Caught the Beacon",
      "kind": "scenario",
      "text": "A workstation seemed fine in every dashboard. A packet capture showed a tiny request leaving every sixty seconds to the same address, a steady beacon. The pattern was invisible in daily summaries but obvious in the raw traffic.",
      "moral": "Different tools show different truths. Escalate from summaries to packets when something is odd."
    }
  ],
  "d4-t21": [
    {
      "title": "The Conference-Room Access Point",
      "kind": "scenario",
      "text": "During a site survey, the team found an unknown access point with default settings plugged into a meeting-room jack. It bridged an unprotected wireless network straight into the internal network. Wireless monitoring now flags unknown APs automatically.",
      "moral": "Surveys are security tools too: they find what shouldn't be there."
    }
  ],
  "d4-t22": [
    {
      "title": "The Researcher Who Was Thanked, Not Sued",
      "kind": "scenario",
      "text": "A student found a flaw in a company's website and, instead of publishing it, emailed the address listed in the company's disclosure policy. The company fixed it in days, publicly credited the student, and paid a bounty. A clear policy turned a potential crisis into a routine fix.",
      "moral": "A published way to report vulnerabilities keeps researchers on your side."
    }
  ],
  "d5-t41": [
    {
      "title": "The Questionnaire That Stalled a Deal",
      "kind": "scenario",
      "text": "A mid-size software firm lost weeks of a big sale because the customer's security questionnaire asked for a SOC 2 report the firm didn't have. They spent the next year building controls and evidence, and then won deals faster. Compliance became a sales asset.",
      "moral": "Frameworks and audits are how customers decide to trust you."
    }
  ],
  "d5-t12": [
    {
      "title": "The Treasurer Who Never Took Leave",
      "kind": "scenario",
      "text": "A long-serving treasurer insisted they could not take time off. When a mandatory-vacation rule was finally enforced, the colleague who covered noticed payments to a vendor that did not exist. The scheme had run for years and the rule exposed it within two weeks.",
      "moral": "People who never leave their post can be hiding something. Mandatory vacation is a detective control."
    }
  ],
  "d5-t13": [
    {
      "title": "Nobody's Risk",
      "kind": "scenario",
      "text": "A risk register listed forty items, but the owner column read 'IT' for every one. Months later, an expired certificate took down a key service and no one felt responsible. After the review, each risk had a named business owner and a review date.",
      "moral": "A risk without a named owner is a risk nobody manages."
    }
  ],
  "d5-t14": [
    {
      "title": "The Deletion Request Nobody Could Answer",
      "kind": "scenario",
      "text": "A customer asked a retailer to delete their data. The team found it in the main database, but only later discovered more copies in an analytics warehouse, a marketing tool, and old backups. A data inventory and a vendor deletion process turned weeks of scrambling into a routine task.",
      "moral": "You cannot honor privacy rights for data you cannot find. Inventory first."
    }
  ],
  "d1-t9": [
    {
      "title": "The Penguin That Survived Encryption",
      "kind": "scenario",
      "text": "A developer encrypted a bitmap logo using ECB mode. The picture came out scrambled in color, but the outline of the penguin was still plainly visible, because identical blocks produced identical ciphertext. Switching to a randomized mode hid the shape completely.",
      "moral": "A mode that leaks patterns defeats strong algorithms. Mode matters as much as the cipher."
    }
  ],
  "d2-t20": [
    {
      "title": "The Number That Changed Hands",
      "kind": "scenario",
      "text": "A founder's phone suddenly lost service. Within minutes, password-reset codes sent by SMS were used to take over their email and then their cloud accounts. The carrier had been convinced by a caller with a few personal details to swap the SIM. A carrier PIN and an authenticator app would have stopped it.",
      "moral": "SMS is the weakest second factor because the carrier is a social-engineering target."
    }
  ],
  "d2-t21": [
    {
      "title": "The Invoice Next Door",
      "kind": "scenario",
      "text": "A customer noticed an invoice number in a URL and changed the last digit out of curiosity. The page showed another company's invoice. The bug was reported responsibly, and the fix was a server-side check that the logged-in user owns the requested record.",
      "moral": "Hiding IDs is not authorization. Check ownership on the server for every request."
    }
  ],
  "d2-t22": [
    {
      "title": "Sixty Seconds, Every Time",
      "kind": "scenario",
      "text": "A hunter plotted outbound connection times from one workstation and found a perfect sixty-second rhythm to a rarely seen domain. Real users are never that regular. The steady pulse was a beacon from malware that had gone unnoticed for weeks.",
      "moral": "Machines are punctual and humans are not. Regularity can be an indicator of compromise."
    }
  ],
  "d2-t23": [
    {
      "title": "When the Backups Worked and It Still Hurt",
      "kind": "scenario",
      "text": "A company restored from clean backups within two days after ransomware. Then the attackers posted samples of customer files and emailed the customers. Recovery solved availability but not confidentiality, which is the exact point of double extortion.",
      "moral": "Plan for data theft as well as encryption."
    }
  ],
  "d3-t21": [
    {
      "title": "The Resold Hard Drives",
      "kind": "scenario",
      "text": "A reporter bought used hard drives from an online reseller and recovered customer records from them. The company had only formatted the disks before selling them. A proper wipe or crypto erase and a certificate from the disposal vendor would have prevented the embarrassment.",
      "moral": "Format is not erase. Sanitize and document."
    }
  ],
  "d4-t23": [
    {
      "title": "The Spoofed Fingerprint",
      "kind": "scenario",
      "text": "Researchers showed that a fingerprint reader could be fooled with a molded copy of a print. The vendor added liveness detection, which checks for signs of a living finger, and required a PIN for sensitive actions.",
      "moral": "Biometrics are convenient but not secret. Pair them with another factor and use liveness checks."
    }
  ],
  "d4-t24": [
    {
      "title": "The Sinkhole That Found the Infection",
      "kind": "scenario",
      "text": "After taking over a malware domain, defenders pointed it at a sinkhole. Within hours the logs listed every infected machine that tried to call home, including several inside a company that had no idea it was compromised.",
      "moral": "Sinkholes block communication and also provide a victim list."
    }
  ],
  "d3-t22": [
    {
      "title": "The Sensor That Became an Outage",
      "kind": "scenario",
      "text": "A company moved its IPS inline without a bypass. A software crash in the device took down the whole internet link for an hour. Afterward they deployed it in a redundant pair with a defined failure mode and health monitoring.",
      "moral": "Inline security devices are also single points of failure. Decide the failure mode on purpose."
    }
  ],
  "d4-t25": [
    {
      "title": "The Lost Phone at the Airport",
      "kind": "scenario",
      "text": "A sales manager left a BYOD phone in a taxi. Because MDM had enforced encryption and a passcode, IT locked the device remotely and selectively wiped the work container within minutes, leaving the manager's family photos intact and the company data protected.",
      "moral": "MDM turns a lost device from a breach into a minor incident, and selective wipe respects personal data."
    }
  ],
  "d4-t26": [
    {
      "title": "The Clocks That Disagreed",
      "kind": "scenario",
      "text": "An investigation stalled because the firewall clock was seven minutes ahead of the server clock, so events appeared to happen in the wrong order. After the incident, the team enforced NTP everywhere, and later timelines lined up exactly.",
      "moral": "If timestamps are wrong, evidence becomes confusing. Synchronize time first."
    }
  ],
  "d4-t27": [
    {
      "title": "The Valet Key",
      "kind": "scenario",
      "text": "A user wanted a budgeting app to read bank transactions. Instead of handing over a bank password, they approved a read-only OAuth scope. When they later revoked the app, its token stopped working, and the password never changed hands.",
      "moral": "OAuth lets you grant limited access without sharing credentials, and revoke it later."
    }
  ],
  "d4-t28": [
    {
      "title": "The Lower Score That Mattered",
      "kind": "scenario",
      "text": "A team patched in strict CVSS order and left a 7.5 flaw in a VPN appliance for last. Attackers were already exploiting it. After that week the team added exploitation data and exposure to its prioritization, so actively exploited internet-facing flaws jumped the queue.",
      "moral": "Score alone is not risk. Exploitation and exposure change the order."
    }
  ],
  "d4-t29": [
    {
      "title": "The Rebooted Server",
      "kind": "scenario",
      "text": "Responding to a suspected intrusion, an eager admin rebooted the server 'to be safe.' The reboot erased the running processes and network connections that would have shown how the attacker got in, and the case could never be fully proven. The next playbook said: isolate, capture memory, and do not reboot.",
      "moral": "Volatile evidence disappears quickly. Capture it before touching anything."
    }
  ],
  "d1-t6": [
    {
      "title": "The Breach Where Passwords Were Easy to Crack",
      "kind": "scenario",
      "text": "A small site stored passwords as plain unsalted hashes. After a leak, attackers matched common hashes against precomputed tables and recovered most passwords within hours, then reused them elsewhere. A unique salt per user and a slow hashing algorithm would have made each guess costly.",
      "moral": "Hashing alone is not enough for passwords. Salt them and use a slow algorithm."
    }
  ],
  "d1-t7": [
    {
      "title": "The Laptop That Stayed Locked",
      "kind": "scenario",
      "text": "A laptop was stolen from a car. Its disk was encrypted with a key sealed in the TPM, and it would not decrypt when moved to another machine. The incident became a hardware-loss ticket instead of a data breach.",
      "moral": "Keys held in hardware are far harder to copy than keys held in files."
    }
  ],
  "d2-t13": [
    {
      "title": "Dyn and the Internet-Wide Outage",
      "kind": "real",
      "text": "In October 2016 a large DDoS attack on DNS provider Dyn made many well-known websites hard to reach for hours. Reporting linked it to the Mirai botnet of infected IoT devices.",
      "moral": "DDoS can hit a shared dependency and take down many services at once."
    }
  ],
  "d3-t15": [
    {
      "title": "The Tunnel That Protected the Coffee Shop",
      "kind": "scenario",
      "text": "A consultant working from a cafe connected through the company VPN. Another customer on the same Wi-Fi was capturing traffic, but everything the consultant sent was inside an encrypted IPsec tunnel and unreadable.",
      "moral": "A VPN protects traffic across networks you do not control."
    }
  ],
  "d3-t16": [
    {
      "title": "The Template That Fixed Everything Once",
      "kind": "scenario",
      "text": "A team defined its network and servers in version-controlled templates. When a security group was found too open, they fixed it once in the template and redeployed, and every environment was corrected the same day. They also caught a leaked key in review before it shipped.",
      "moral": "Infrastructure as code makes secure settings repeatable, but it can also repeat mistakes at scale, so review it like application code."
    }
  ],
  "d4-t19": [
    {
      "title": "The Email From the CEO's Own Domain",
      "kind": "scenario",
      "text": "Fake invoices appeared to come from a company's real domain. The domain had no DMARC policy, so receivers had no instruction on what to do with forged mail. After publishing SPF and DKIM records and a DMARC policy set to reject, forged messages from the domain were dropped.",
      "moral": "SPF, DKIM, and DMARC together tell the world which mail is genuinely yours."
    }
  ],
  "d4-t20": [
    {
      "title": "The Poisoned Answer",
      "kind": "scenario",
      "text": "Customers reached a fake copy of a bank's website even though they typed the correct address, because a forged DNS answer had been cached by a resolver. A resolver that validated DNSSEC signatures would have rejected the forged record.",
      "moral": "DNS answers can be forged. DNSSEC proves authenticity, and DNS filtering blocks known-bad destinations."
    }
  ],
  "d5-t10": [
    {
      "title": "The Gap Nobody Had Listed",
      "kind": "scenario",
      "text": "A company said it followed a security framework but had never compared its actual controls against it. A gap analysis showed missing logging, no tested restores, and no vendor reviews. Each gap got an owner and a date, and the next audit was calm.",
      "moral": "You cannot close gaps you have not measured."
    }
  ],
  "d5-t11": [
    {
      "title": "The Three-Day Outage Nobody Planned For",
      "kind": "scenario",
      "text": "A distributor lost its order system for three days. A business impact analysis later showed the system could only be down for four hours before major customers left, so the recovery target had been wildly unrealistic. Recovery objectives were rewritten from the business impact outward.",
      "moral": "RTO and RPO come from the business impact analysis, not from what is convenient for IT."
    }
  ]
};
