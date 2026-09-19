/* Module 0 — A+ / Network+ Fundamentals Refresher
   Security+ assumes you already know this. This module exists for learners
   who have forgotten their A+/Network+ basics before starting Security+
   prep, so every topic here is written as a refresher, not as new
   material. */

const FUNDAMENTALS = [
  {
    id: "f-boot-process",
    category: "A+",
    title: "How a Computer Boots (BIOS/UEFI, POST, Bootloader)",
    goal: "Explain what happens between pressing the power button and reaching the login screen, and why that matters for security.",
    simple:
      "When you press power, firmware (BIOS or the newer UEFI) runs first. It does a POST (Power-On Self-Test) to check hardware, then hands control to a bootloader, which loads the operating system. UEFI is the modern replacement for BIOS: it supports larger drives, faster boot, and a feature called Secure Boot, which only allows digitally signed, trusted software to run at boot time.",
    analogy:
      "Think of BIOS/UEFI as the security guard who opens the building in the morning. POST is the guard walking the halls checking that the lights, elevators, and doors work. Secure Boot is the guard checking ID badges before letting anyone in — if the software trying to load isn't signed by someone trusted, it doesn't get in.",
    taglish:
      "Yung BIOS/UEFI parang yung unang gumigising sa computer mo bago pa man mag-Windows o Linux. Si POST, parang check-up muna kung okay lahat ng parts (RAM, disk, atbp). Tapos i-hahand-over na niya sa bootloader para i-load na yung OS. Yung Secure Boot, parang bantay sa pinto — bawal pumasok kung hindi verified/signed yung software, kasi baka malware yun na sumasabay mag-load bago pa mag-start yung Windows (tinatawag na bootkit o rootkit).",
    keyPoints: [
      "BIOS = older firmware standard; UEFI = modern replacement (faster, supports bigger drives, GUI-capable).",
      "POST = Power-On Self-Test, checks hardware before the OS loads.",
      "Secure Boot blocks unsigned/untrusted code from running during boot — this stops bootkits and rootkits.",
      "TPM (Trusted Platform Module) is a chip that stores encryption keys and supports Secure Boot and disk encryption."
    ],
    keyTerms: [
      { term: "BIOS", def: "Basic Input/Output System — legacy firmware that initializes hardware at startup." },
      { term: "UEFI", def: "Unified Extensible Firmware Interface — modern firmware standard replacing BIOS." },
      { term: "POST", def: "Power-On Self-Test — firmware routine that checks hardware before boot continues." },
      { term: "Secure Boot", def: "A UEFI feature that only allows cryptographically signed bootloaders/OS code to run." },
      { term: "TPM", def: "Trusted Platform Module — hardware chip that securely stores encryption keys." }
    ]
  },
  {
    id: "f-os-fundamentals",
    category: "A+",
    title: "OS Fundamentals: Processes, Services, Permissions",
    goal: "Recognize the building blocks of an operating system that Security+ constantly refers to: processes, services, users, and permissions.",
    simple:
      "A process is a running instance of a program. A service (Windows) or daemon (Linux) is a process that runs in the background, usually without a user interface, often starting automatically at boot (examples: a web server, a print spooler, an antivirus engine). Every file and folder has permissions that decide who can read, write, or execute it. Windows uses NTFS permissions and user/group accounts; Linux uses read/write/execute (rwx) bits for owner, group, and others, plus the root account for full control.",
    analogy:
      "A process is like one employee doing one task right now. A service is like a security guard who is always on duty, even when no one is watching. Permissions are like keycards — your keycard might open the lobby and your office, but not the server room, because you don't need that access (least privilege).",
    taglish:
      "Yung process, isang gawain lang na tumatakbo ngayon (halimbawa, binuksan mong Notepad). Yung service, parang laging naka-standby sa likod — kahit hindi mo binubuksan, tumatakbo siya (halimbawa, antivirus service). Yung permissions naman, parang ID access card mo sa opisina — pwede kang pumasok sa ilang kwarto lang, hindi lahat, dahil hindi mo naman kailangan lahat (least privilege, isa sa pinaka-importante na concept sa Security+).",
    keyPoints: [
      "Process = one running instance of a program (foreground or background).",
      "Service/daemon = background process, often auto-starts, no user interaction needed.",
      "Windows permissions: NTFS ACLs tied to user/group accounts (Administrator, Standard User).",
      "Linux permissions: read (r), write (w), execute (x) for owner, group, others; root = full control.",
      "Least privilege: give a user/process only the access it needs, nothing more — this is a recurring Security+ theme."
    ],
    keyTerms: [
      { term: "Process", def: "A running instance of a program." },
      { term: "Service / Daemon", def: "A background process that typically starts automatically and has no user interface." },
      { term: "NTFS Permissions", def: "Windows file-system access control (read, write, modify, full control) tied to users/groups." },
      { term: "rwx", def: "Linux permission bits — read, write, execute — applied to owner, group, and others." },
      { term: "Least Privilege", def: "Giving an account or process the minimum access needed to do its job." }
    ]
  },
  {
    id: "f-command-line",
    category: "A+",
    title: "Command-Line Basics You Will See Again in Security+",
    goal: "Recall the everyday command-line tools used to check network status, connectivity, and running processes — these show up constantly in log and troubleshooting scenarios.",
    simple:
      "You don't need to be a command-line expert for Security+, but you must recognize what common commands do, because exam scenarios describe their output. ipconfig (Windows) / ifconfig or ip addr (Linux) shows your IP configuration. ping tests if a host answers. tracert (Windows) / traceroute (Linux) shows the path packets take, hop by hop. nslookup queries DNS. netstat shows active connections and listening ports. tasklist / ps shows running processes.",
    analogy:
      "ping is like knocking on a door to see if anyone's home. tracert is like tracking every stop a delivery truck makes on the way to your house. netstat is like a guest list showing who is currently connected to your party (your computer) and through which door (port).",
    taglish:
      "Hindi mo kailangang maging command-line master, pero dapat alam mo kung ano ginagawa ng bawat isa dahil laging lalabas sa exam scenarios. Ipconfig/ifconfig — makikita mo yung IP address mo. Ping — parang 'kumatok' ka lang para malaman kung buhay/naa-access yung isang server. Tracert — makikita mo yung buong 'ruta' papunta doon, station by station. Netstat — makikita mo kung sino-sino kumokonekta sa computer mo ngayon, at saang port sila pumasok.",
    keyPoints: [
      "ipconfig / ifconfig / ip addr — shows IP address, subnet mask, default gateway.",
      "ping — tests basic reachability to a host using ICMP.",
      "tracert / traceroute — shows the hop-by-hop path to a destination.",
      "nslookup / dig — queries DNS records for a domain.",
      "netstat — shows active connections and listening ports on the local machine.",
      "tasklist / ps — lists running processes."
    ],
    keyTerms: [
      { term: "ping", def: "Tests basic network reachability using ICMP echo request/reply." },
      { term: "traceroute / tracert", def: "Shows the path (each router hop) packets take to a destination." },
      { term: "netstat", def: "Displays active network connections and listening ports on a host." },
      { term: "nslookup", def: "Queries DNS servers to resolve domain names to IP addresses (or the reverse)." }
    ]
  },
  {
    id: "f-file-permissions",
    category: "A+",
    title: "File Systems and Permissions",
    goal: "Compare common file systems and understand why permission design is a security control, not just an IT-admin convenience.",
    simple:
      "NTFS (Windows) supports detailed permissions, encryption (EFS), and auditing. FAT32 is older, simpler, and has no built-in permission or encryption support — a security downgrade if used on sensitive systems. Linux file systems like ext4 use owner/group/other permission bits. Access Control Lists (ACLs) let you get more specific than basic read/write/execute, e.g., 'this one user can write, everyone else can only read.'",
    analogy:
      "FAT32 is like a public bulletin board — anyone who can reach it can read or change what's pinned there. NTFS with proper permissions is like a filing cabinet with individual locked drawers, where only the right badge opens the right drawer.",
    taglish:
      "Si FAT32 parang bulletin board sa labas — kahit sino makakabasa/makakapag-edit basta naabot niya. Si NTFS naman parang filing cabinet na may kani-kanyang lock bawat drawer — kailangan tama yung access/badge mo bago makapasok sa specific na drawer. Kaya sa mga sensitive files, mas maganda gamitin NTFS na may tamang permissions kaysa FAT32.",
    keyPoints: [
      "NTFS supports granular permissions, encryption (EFS), and file auditing.",
      "FAT32 has no native permission or encryption model — avoid for sensitive data.",
      "Linux uses owner/group/other permission bits (rwx) plus optional ACLs for finer control.",
      "ACLs allow permission rules beyond the basic owner/group/other model."
    ],
    keyTerms: [
      { term: "ACL", def: "Access Control List — a set of rules specifying which accounts get which permissions on a resource." },
      { term: "EFS", def: "Encrypting File System — Windows feature for encrypting individual files/folders on NTFS." }
    ]
  },
  {
    id: "f-patching",
    category: "A+",
    title: "Patching and Updates",
    goal: "Connect the routine IT task of 'installing updates' to the security concept of reducing the attack surface.",
    simple:
      "A patch is a software update that fixes a bug, and often a security vulnerability. Unpatched software is one of the most common ways attackers get in, because vulnerabilities are publicly documented (see CVE, covered later in Domain 4) once a patch exists. Organizations use patch management processes: test patches in a lab, schedule maintenance windows, and roll out in stages instead of everywhere at once, so a bad patch doesn't break everything.",
    analogy:
      "An unpatched system is like a house with a lock the locksmith already published the bypass trick for. Everyone, including burglars, knows about the fix — if you don't apply it, you're leaving the door as it was.",
    taglish:
      "Yung patch, parang tinatapalan yung butas sa bakod. Once na-release na yung patch, alam na rin ng mga attacker kung ano yung butas na sinasara niyan — kaya kung hindi mo i-a-apply agad, mas mataas chance na ma-exploit ka. Sa companies, hindi basta-basta pinapatch agad — tinetest muna sa lab, tapos may 'maintenance window' (oras na pwedeng mag-restart/magpatch) bago i-roll out sa lahat.",
    keyPoints: [
      "Patches fix bugs and, critically, known security vulnerabilities.",
      "Once a patch is published, the vulnerability it fixes becomes public knowledge — a race against attackers.",
      "Patch management: test, schedule a maintenance window, stage the rollout, document.",
      "Unpatched/legacy systems are a recurring exam theme as a vulnerability category."
    ],
    keyTerms: [
      { term: "Patch", def: "A software update that fixes bugs or security vulnerabilities." },
      { term: "Maintenance Window", def: "A pre-approved time period for applying changes/patches with minimal user impact." }
    ]
  },
  {
    id: "f-virtualization",
    category: "A+",
    title: "Virtualization Basics",
    goal: "Describe what a hypervisor and virtual machine are, and why virtualization changes the security conversation (shared hardware, snapshots, VM escape).",
    simple:
      "A hypervisor lets one physical machine run multiple virtual machines (VMs), each with its own OS. Type 1 hypervisors run directly on hardware (used in data centers/cloud). Type 2 hypervisors run as software on top of a host OS (used for labs on a laptop). A snapshot freezes a VM's state so you can roll back. Because multiple VMs share the same physical hardware, a flaw that lets an attacker 'escape' a VM and reach the host or other VMs (VM escape) is a serious cloud/virtualization risk covered in Domain 2.",
    analogy:
      "A physical server running several VMs is like an apartment building: each tenant (VM) has their own locked unit, but they all share the same building foundation, water lines, and electricity (the hypervisor and hardware). If someone breaks through a shared wall (VM escape), they can reach other tenants.",
    taglish:
      "Isipin mo yung isang building na maraming units — kanya-kanyang unit yan (VM), locked at separated, pero iisa lang naman yung pundasyon, tubig, at kuryente (hypervisor/hardware). Kapag may nakalusot sa 'shared wall' na yan (VM escape), maaabot niya yung ibang units o pati mismong building management (host). Kaya sa cloud/virtualized environments, importante isolate nang maayos ang bawat VM.",
    keyPoints: [
      "Hypervisor Type 1 = runs directly on hardware (bare-metal, common in data centers/cloud).",
      "Hypervisor Type 2 = runs on top of a host OS (common for personal labs).",
      "Snapshot = a saved state of a VM you can revert to.",
      "VM escape = an attacker breaking out of a VM to reach the host or other VMs — a real virtualization vulnerability."
    ],
    keyTerms: [
      { term: "Hypervisor", def: "Software that creates and manages virtual machines." },
      { term: "VM Escape", def: "An attack where malicious code breaks out of a virtual machine to access the host system." }
    ]
  },
  {
    id: "f-osi-tcpip",
    category: "Network+",
    title: "OSI Model and TCP/IP Model",
    goal: "Use the 7-layer OSI model (or the simpler 4-layer TCP/IP model) to describe where a device, protocol, or attack operates — a skill Security+ scenario questions expect.",
    simple:
      "The OSI model breaks networking into 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application (mnemonic: 'Please Do Not Throw Sausage Pizza Away'). The TCP/IP model simplifies this into 4 layers: Network Access, Internet, Transport, Application. You mainly need to recognize which layer something belongs to: switches/MAC addresses = Layer 2 (Data Link); routers/IP addresses = Layer 3 (Network); TCP/UDP ports = Layer 4 (Transport); HTTP/DNS/email = Layer 7 (Application). Many attacks and controls are described by layer, e.g., a firewall filtering by port is working at Layer 4.",
    analogy:
      "Think of the OSI model like sending a physical letter: the paper and ink is Physical; the envelope and address format is Data Link; the postal routing system is Network; making sure the whole package arrives correctly is Transport; and the actual letter content you read is Application.",
    taglish:
      "Isipin mo yung pagpapadala ng liham. Yung papel at tinta, Physical layer. Yung sobre at address format, Data Link. Yung buong postal system na nagruruta, Network layer. Yung pagsisiguro na kumpleto at tama ang dating ng padala, Transport. Yung laman mismo ng sulat na binabasa mo, Application layer. Sa exam, madalas tatanungin kung 'anong layer' gumagana yung isang device o attack — switch/MAC = Layer 2, router/IP = Layer 3, TCP/UDP ports = Layer 4, HTTP/DNS = Layer 7.",
    keyPoints: [
      "OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      "TCP/IP 4 layers: Network Access, Internet, Transport, Application (a simplified real-world model).",
      "Switches operate at Layer 2 (MAC addresses); routers at Layer 3 (IP addresses).",
      "Firewalls filtering by port operate at Layer 4; web/app-layer attacks (like XSS) happen at Layer 7."
    ],
    keyTerms: [
      { term: "OSI Model", def: "A 7-layer conceptual model describing how network communication functions." },
      { term: "TCP/IP Model", def: "A simplified 4-layer model that reflects how the real Internet protocol suite is structured." },
      { term: "MAC Address", def: "A hardware address burned into a network interface, used at Layer 2." }
    ]
  },
  {
    id: "f-ip-subnetting",
    category: "Network+",
    title: "IP Addressing and Subnetting Basics",
    goal: "Recognize IPv4 address structure, tell private from public ranges, and read basic CIDR notation without needing deep subnetting math.",
    simple:
      "An IPv4 address is four numbers 0-255 separated by dots (e.g., 192.168.1.10). A subnet mask (e.g., 255.255.255.0) or CIDR notation (e.g., /24) defines which part of the address is the network and which part is the host. Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are not routable on the public Internet and are used inside organizations; a device needs NAT (covered later) to reach the Internet using a public IP.",
    analogy:
      "Think of an IP address like a street address: the network portion is like the street name (everyone on that street shares it), and the host portion is like the house number (unique to you on that street). Private IP ranges are like apartment unit numbers — they only make sense inside that one building, not out in the wider city.",
    taglish:
      "Yung IP address parang address ng bahay mo. Yung network portion, parang pangalan ng kalye (pareho lahat ng kapitbahay mo). Yung host portion, parang house number mo (ikaw lang may ganyan sa kalye niyo). Yung private IP naman (10.x, 172.16-31.x, 192.168.x), parang unit number sa loob ng isang building lang — walang silbi kung sasabihin mo sa labas ng building, kailangan may 'front desk' (NAT) para ma-translate papunta sa publikong address.",
    keyPoints: [
      "IPv4 = four octets (0-255), e.g., 192.168.1.10.",
      "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — not routable on the public Internet.",
      "CIDR notation (/24, /16, etc.) states how many bits are the network portion.",
      "A /24 network (255.255.255.0) gives 254 usable host addresses — you don't need to calculate this by hand for Security+, just recognize the notation."
    ],
    keyTerms: [
      { term: "CIDR", def: "Classless Inter-Domain Routing notation, e.g., /24, showing how many bits form the network portion." },
      { term: "Private IP Address", def: "An address reserved for internal use (RFC 1918) that is not routed on the public Internet." },
      { term: "Public IP Address", def: "A globally routable address reachable from the Internet." }
    ]
  },
  {
    id: "f-ports-protocols",
    category: "Network+",
    title: "Ports and Common Protocols",
    goal: "Recall the well-known ports and protocols that appear constantly in Security+ scenario and log-analysis questions.",
    simple:
      "A port number identifies which service on a host a connection is meant for. Ports 0-1023 are 'well-known' ports tied to standard services. You should be able to instantly recognize the common ones below, because firewall rules, log entries, and scenario questions reference them directly rather than explaining them.",
    analogy:
      "If an IP address is a building's street address, a port number is the specific door or window a visitor is trying to use. Port 80 is the main lobby door (HTTP); port 443 is the same lobby but with a security checkpoint (HTTPS); port 22 is a side door reserved for maintenance staff with a keycard (SSH).",
    taglish:
      "Kung ang IP address parang address ng building, ang port naman parang specific na pinto o bintana na gustong pasukan ng bisita. Port 80 — main entrance (HTTP, walang encryption). Port 443 — same entrance pero may security check na (HTTPS, may encryption). Port 22 — side door para sa maintenance staff lang na may keycard (SSH, remote admin access). Bawal basta-basta bukas lahat ng pinto — dapat lang bukas yung kailangan talaga (attack surface reduction).",
    keyPoints: [
      "20/21 FTP (file transfer, unencrypted) — 22 SSH (encrypted remote login) — 23 Telnet (unencrypted remote login, avoid).",
      "25 SMTP (send email) — 53 DNS — 67/68 DHCP — 80 HTTP (unencrypted web) — 110 POP3 / 143 IMAP (email retrieval).",
      "443 HTTPS (encrypted web) — 389 LDAP / 636 LDAPS (directory services) — 445 SMB (Windows file sharing).",
      "3389 RDP (Windows remote desktop) — 3306 MySQL — 1433 MS SQL Server.",
      "Rule of thumb: encrypted versions of a protocol usually use a different, higher port than the unencrypted original."
    ],
    keyTerms: [
      { term: "Port", def: "A numbered logical endpoint that identifies a specific service on a host." },
      { term: "Well-Known Ports", def: "Ports 0-1023, reserved for standard, widely used services." },
      { term: "TCP vs UDP", def: "TCP is connection-oriented and reliable (handshake, guaranteed delivery); UDP is connectionless and faster but not guaranteed — used for things like streaming and DNS queries." }
    ]
  },
  {
    id: "f-dns-dhcp",
    category: "Network+",
    title: "DNS and DHCP",
    goal: "Explain how a device automatically gets network settings (DHCP) and how domain names resolve to IP addresses (DNS) — both are common attack targets.",
    simple:
      "DHCP (Dynamic Host Configuration Protocol) automatically assigns a device an IP address, subnet mask, default gateway, and DNS server when it joins a network, through a 4-step process called DORA (Discover, Offer, Request, Acknowledge). DNS (Domain Name System) translates human-readable names like example.com into IP addresses computers use, through queries against DNS servers holding different record types (A record = IPv4 address, MX = mail server, TXT = text/verification data).",
    analogy:
      "DHCP is like checking into a hotel: the front desk automatically assigns you a room number, tells you which floor, and how to reach the concierge — you don't need to already know any of that. DNS is like a phone book: you know a person's name (example.com) but need the phone book to find their actual number (IP address).",
    taglish:
      "Yung DHCP parang pag-check-in sa hotel — automatic ka nang bibigyan ng room number, sasabihin sa'yo kung anong floor ka, at paano maka-contact sa concierge, hindi mo na kailangan i-set manually. Yung DNS naman parang phone book — alam mo yung pangalan (example.com) pero kailangan mo ng phone book para malaman yung actual number (IP address). Both DHCP at DNS ay common target ng attacks — halimbawa, rogue DHCP server (peke na 'front desk') o DNS poisoning (pinalitan yung entries sa phone book para magdala sa maling number).",
    keyPoints: [
      "DHCP process = DORA: Discover, Offer, Request, Acknowledge.",
      "A rogue DHCP server can hand out malicious settings (e.g., a fake default gateway) — a real attack vector.",
      "DNS translates domain names to IP addresses using distributed DNS servers and cached records.",
      "Common DNS record types: A (IPv4 address), AAAA (IPv6 address), MX (mail server), TXT (text/verification), CNAME (alias).",
      "DNS poisoning/spoofing corrupts DNS answers to redirect users to malicious sites — covered again in Domain 2."
    ],
    keyTerms: [
      { term: "DHCP", def: "Protocol that automatically assigns IP configuration to devices joining a network." },
      { term: "DNS", def: "System that translates human-readable domain names into IP addresses." },
      { term: "A Record", def: "A DNS record mapping a domain name to an IPv4 address." }
    ]
  },
  {
    id: "f-routing-switching-vlans",
    category: "Network+",
    title: "Routing, Switching, and VLANs",
    goal: "Distinguish what a switch does from what a router does, and understand why VLANs are a basic segmentation tool.",
    simple:
      "A switch connects devices within the same local network and forwards traffic using MAC addresses (Layer 2). A router connects different networks together and forwards traffic using IP addresses (Layer 3), typically sitting at the edge between your internal network and the Internet, or between internal network segments. A VLAN (Virtual LAN) lets you logically split one physical switch into multiple separate broadcast domains — devices on different VLANs can't talk directly to each other unless a router or Layer 3 switch allows it. This is a foundational segmentation control referenced throughout Security+ Domain 3.",
    analogy:
      "A switch is like the hallway connecting rooms on the same floor of a building. A router is like the elevator connecting different floors (different networks) to each other. A VLAN is like assigning keycard zones on that same floor — even though the rooms are physically next to each other, people in Zone A can't walk into Zone B without going through a checkpoint (the router).",
    taglish:
      "Yung switch parang hallway na nagkokonekta ng mga kwarto sa parehong palapag (parehong network). Yung router parang elevator na nagkokonekta sa ibang palapag (ibang network), kadalasan nasa 'edge' — pagitan ng internal network niyo at ng Internet. Yung VLAN naman parang paghahati ng iisang palapag sa 'zones' gamit ang keycard — magkatabi man physically ang mga kwarto, hindi basta-basta makakapasok yung nasa Zone A papunta Zone B kung walang checkpoint (router) na magpapadaan.",
    keyPoints: [
      "Switch = connects devices on the same network (Layer 2, uses MAC addresses).",
      "Router = connects different networks together (Layer 3, uses IP addresses).",
      "VLAN = logically separates one physical network into multiple isolated broadcast domains.",
      "Devices on separate VLANs need a router (or Layer 3 switch) to communicate — a core segmentation/security control."
    ],
    keyTerms: [
      { term: "Switch", def: "A Layer 2 device that forwards traffic between devices on the same local network using MAC addresses." },
      { term: "Router", def: "A Layer 3 device that forwards traffic between different networks using IP addresses." },
      { term: "VLAN", def: "Virtual Local Area Network — logically segments one physical network into isolated broadcast domains." }
    ]
  },
  {
    id: "f-firewall-nat-vpn-wifi",
    category: "Network+",
    title: "Firewalls, NAT, VPNs, and Wireless Basics",
    goal: "Summarize the four network fundamentals that Security+ builds heavily on: firewalls, NAT, VPNs, and wireless security basics.",
    simple:
      "A firewall filters traffic in or out of a network based on rules (source/destination IP, port, protocol). NAT (Network Address Translation) lets many internal private-IP devices share one public IP address when reaching the Internet, and incidentally hides internal addressing from outside. A VPN (Virtual Private Network) creates an encrypted tunnel over an untrusted network (like the public Internet) so traffic inside it stays confidential. For wireless, WPA2 and the newer WPA3 are the current secure encryption standards for Wi-Fi; open (unencrypted) Wi-Fi networks expose traffic to anyone nearby.",
    analogy:
      "A firewall is a checkpoint guard checking IDs against a list before letting anyone through. NAT is like a company mailroom that puts everyone's outgoing mail under one company return address, so outsiders never see individual employee addresses. A VPN is an armored, sealed tunnel through public streets — even though the road (Internet) is public, no one outside the tunnel can see what's being carried.",
    taglish:
      "Yung firewall parang guard sa checkpoint na chine-check yung ID base sa listahan bago papasukin. Yung NAT parang mailroom ng kumpanya — lahat ng padala palabas, iisang 'company address' lang makikita ng outsiders, hindi individual na address ng bawat empleyado. Yung VPN naman parang armored at sealed na tunnel sa gitna ng pampublikong kalsada — kahit pampubliko yung daan (Internet), walang makakakita sa laman habang nasa loob ng tunnel. Sa Wi-Fi, gamitin lagi ang WPA2 o WPA3 — iwasan ang open/unencrypted na Wi-Fi dahil kahit sino pwede makabasa ng traffic mo doon.",
    keyPoints: [
      "Firewall = filters traffic based on rules (source/destination, port, protocol).",
      "NAT = translates private internal IPs to a shared public IP for Internet access; also hides internal addressing.",
      "VPN = creates an encrypted tunnel across an untrusted network to protect confidentiality.",
      "WPA2/WPA3 = current secure Wi-Fi encryption standards; open Wi-Fi has no encryption at all."
    ],
    keyTerms: [
      { term: "Firewall", def: "A device or software that filters network traffic based on defined rules." },
      { term: "NAT", def: "Network Address Translation — maps private internal addresses to a public address for Internet access." },
      { term: "VPN", def: "Virtual Private Network — an encrypted tunnel across an untrusted network." },
      { term: "WPA2 / WPA3", def: "Current Wi-Fi Protected Access encryption standards for securing wireless networks." }
    ]
  }
];
