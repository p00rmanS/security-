/* Study path metadata, the set of "core" lessons used by the shorter paths,
   and the port reference used by the flashcards. Path stages themselves are
   built at runtime in app.js from the lesson data, so new lessons appear in
   the right objective order automatically. */

const CORE_LESSON_IDS = [
  "d1-flagship", "d1-t5", "d1-t2", "d1-t37", "d1-t3", "d1-t4", "d1-t6",
  "d2-flagship", "d2-t1", "d2-t2", "d2-t3", "d2-t4", "d2-t5", "d2-t7", "d2-t43",
  "d3-flagship", "d3-t1", "d3-t12", "d3-t2b", "d3-t2c", "d3-t3", "d3-t4", "d3-t14",
  "d4-flagship", "d4-t1", "d4-t2", "d4-t3", "d4-t4", "d4-t5", "d4-t6", "d4-t16", "d4-t7", "d4-t8b", "d4-t9",
  "d5-flagship", "d5-t1", "d5-t2", "d5-t3", "d5-t4", "d5-t5", "d5-t6"
];

const STUDY_PATHS = [
  {
    id: "beginner",
    title: "Zero to Certified",
    audience: "New to security, or rusty on A+/Network+",
    blurb: "The complete route: a networking and systems refresher, then every lesson in all five domains in exam-objective order, with a quiz checkpoint after each domain and a final exam-readiness stage. Plan on roughly 10 to 12 weeks at 8 to 10 hours a week."
  },
  {
    id: "core",
    title: "Fast Track: Core Concepts",
    audience: "Working IT or security professionals",
    blurb: "Skips the refresher and the deep dives. Core lessons only, ordered by exam weight (Security Operations first), with domain quizzes and mock exams. Plan on roughly 3 to 4 weeks."
  },
  {
    id: "cram",
    title: "Final Two Weeks: Exam Cram",
    audience: "Your exam is booked and you need a tight plan",
    blurb: "Core lessons in exam-weight order, daily flashcards, domain practice at a higher bar, and three timed mock exams. Use after you have covered the material at least once."
  },
  {
    id: "weak",
    title: "Fix My Weak Areas",
    audience: "Anyone who has taken some quizzes",
    blurb: "Built from YOUR results: the objectives where you are losing points, the lessons behind the questions you missed, and re-test checkpoints. Take a few quizzes first so it has data to work with."
  }
];

/* Common ports and protocols for the Ports flashcard deck. */
const PORTS = [
  { port: "20/21", proto: "TCP", service: "FTP (data / control)", note: "Cleartext file transfer. Use SFTP or FTPS instead." },
  { port: "22", proto: "TCP", service: "SSH / SFTP / SCP", note: "Encrypted remote administration and file transfer." },
  { port: "23", proto: "TCP", service: "Telnet", note: "Cleartext remote access. Replace with SSH." },
  { port: "25", proto: "TCP", service: "SMTP", note: "Server-to-server email delivery." },
  { port: "49", proto: "TCP", service: "TACACS+", note: "Administrative AAA for network devices; encrypts the whole payload." },
  { port: "53", proto: "UDP/TCP", service: "DNS", note: "Name resolution. TCP used for zone transfers and large responses." },
  { port: "67/68", proto: "UDP", service: "DHCP (server / client)", note: "Automatic IP configuration." },
  { port: "69", proto: "UDP", service: "TFTP", note: "Trivial, unauthenticated file transfer; used for device configs and boot images." },
  { port: "80", proto: "TCP", service: "HTTP", note: "Unencrypted web traffic." },
  { port: "88", proto: "UDP/TCP", service: "Kerberos", note: "Ticket-based authentication in Windows domains." },
  { port: "110", proto: "TCP", service: "POP3", note: "Cleartext mail retrieval. Secure version is 995." },
  { port: "123", proto: "UDP", service: "NTP", note: "Time synchronization." },
  { port: "137-139", proto: "UDP/TCP", service: "NetBIOS", note: "Legacy Windows name and session services." },
  { port: "143", proto: "TCP", service: "IMAP", note: "Cleartext mail access. Secure version is 993." },
  { port: "161", proto: "UDP", service: "SNMP (polling)", note: "Device monitoring. Use SNMPv3." },
  { port: "162", proto: "UDP", service: "SNMP traps", note: "Devices send unsolicited alerts to the manager." },
  { port: "389", proto: "TCP/UDP", service: "LDAP", note: "Directory queries, cleartext. Secure version is 636." },
  { port: "443", proto: "TCP", service: "HTTPS", note: "Web traffic protected by TLS. Also used by SSL/TLS VPNs." },
  { port: "445", proto: "TCP", service: "SMB", note: "Windows file sharing. Heavily abused for lateral movement." },
  { port: "465 / 587", proto: "TCP", service: "SMTP over TLS / mail submission", note: "Secure client-to-server email submission." },
  { port: "500", proto: "UDP", service: "IKE / ISAKMP (IPsec)", note: "Negotiates IPsec keys. NAT traversal uses UDP 4500." },
  { port: "514", proto: "UDP", service: "Syslog", note: "Central log collection. TLS syslog uses TCP 6514." },
  { port: "636", proto: "TCP", service: "LDAPS", note: "LDAP over TLS." },
  { port: "853", proto: "TCP", service: "DNS over TLS (DoT)", note: "Encrypted DNS queries." },
  { port: "993", proto: "TCP", service: "IMAPS", note: "IMAP over TLS." },
  { port: "995", proto: "TCP", service: "POP3S", note: "POP3 over TLS." },
  { port: "1433", proto: "TCP", service: "Microsoft SQL Server", note: "Database; should never be exposed to the Internet." },
  { port: "1521", proto: "TCP", service: "Oracle database", note: "Database listener." },
  { port: "1645/1646 or 1812/1813", proto: "UDP", service: "RADIUS (authentication / accounting)", note: "Network access AAA; encrypts only the password." },
  { port: "3306", proto: "TCP", service: "MySQL / MariaDB", note: "Database." },
  { port: "3389", proto: "TCP", service: "RDP", note: "Windows Remote Desktop. Frequent brute-force target." },
  { port: "5060 / 5061", proto: "TCP/UDP", service: "SIP / SIP over TLS", note: "VoIP call signaling." },
  { port: "5432", proto: "TCP", service: "PostgreSQL", note: "Database." },
  { port: "5900", proto: "TCP", service: "VNC", note: "Remote desktop sharing, often unencrypted." },
  { port: "8080", proto: "TCP", service: "Alternate HTTP / proxy", note: "Common for web proxies and app servers." }
];
