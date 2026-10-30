/* In-depth lessons, part B (Domains 4-5). Registers a bundle on
   globalThis.__DEEP; data-lessons-merge.js (loaded last) merges it. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d4: [
      {
        id: "d4-t121",
        title: "Access Control Models: DAC, MAC, RBAC, ABAC, and Rule-Based",
        tag: "4.6",
        minutes: 20,
        goal: "Identify each access control model by who makes the decision and what it is based on, and apply least privilege, separation of duties, and privileged access management.",
        why: "Access control model questions read like short stories: 'the owner of a file decides', 'the system enforces labels', 'access is based on job title'. Each phrase maps to exactly one model, so this is dependable exam territory.",
        simple:
          "An access control model is the rule system that decides who may do what to which resource. In DISCRETIONARY access control (DAC), the OWNER of a resource decides who gets access, typically through permissions or an access control list; it is flexible and common in everyday operating systems, but it relies on every owner making good decisions. In MANDATORY access control (MAC), the SYSTEM enforces access using security labels (classification on data such as Confidential or Secret, clearance on users) and users cannot override it; it is used where confidentiality is paramount, such as military systems and SELinux. In ROLE-BASED access control (RBAC), permissions are attached to ROLES that mirror job functions (nurse, accountant, help-desk), and users receive access by being assigned a role; this scales well and supports separation of duties. In ATTRIBUTE-BASED access control (ABAC), a policy engine evaluates ATTRIBUTES of the user (department, clearance), the resource (sensitivity, owner), and the environment (time, location, device health) for each request, allowing very fine-grained and context-aware decisions; it underpins zero trust. RULE-BASED access control applies fixed rules to everyone, such as a firewall ACL or 'logins only between 8 and 6'. Whatever the model, a few principles apply: LEAST PRIVILEGE (give only the access needed), NEED TO KNOW (even with clearance, only what the job requires), SEPARATION OF DUTIES (no single person controls a whole sensitive process), JOB ROTATION and MANDATORY VACATIONS (to surface fraud), and IMPLICIT DENY (anything not explicitly allowed is denied). Privileged accounts get extra protection through privileged access management (PAM): vaulted credentials, just-in-time elevation, and session recording.",
        deepDive: [
          { h: "Who decides, and based on what", list: [
            "DAC: the resource owner decides. Based on identity and permissions/ACL.",
            "MAC: a central authority and the system decide. Based on labels (classification vs clearance).",
            "RBAC: an administrator assigns roles. Based on job function.",
            "ABAC: a policy engine decides at request time. Based on user, resource, and environment attributes.",
            "Rule-based: fixed rules apply to everyone. Based on conditions like time, source address, or protocol."
          ] },
          { h: "RBAC pitfalls", list: [
            "Role explosion: too many narrow roles become unmanageable.",
            "Privilege creep: people change jobs and keep old roles. Fix with periodic access reviews (recertification).",
            "Toxic combinations: one person holding roles that together violate separation of duties (for example, create vendor and approve payment)."
          ] },
          { h: "Role-based versus rule-based", p: "These two are intentionally confusable. ROLE-based means access follows a person's role. RULE-based means a condition or rule applies regardless of who you are (for example, a time-of-day restriction or a firewall rule). A firewall access list is rule-based; a hospital system that lets nurses see charts is role-based." },
          { h: "Privileged access management in practice", list: [
            "Credentials are stored in a vault; users check them out instead of knowing them.",
            "Just-in-time (JIT) access grants elevation for a limited time and then removes it.",
            "Sessions are recorded and can be audited or terminated.",
            "Standing administrator accounts are minimized; administrators use separate accounts for daily work and privileged tasks."
          ] }
        ],
        keyTerms: [
          { term: "DAC", def: "Discretionary Access Control: the resource owner decides who has access." },
          { term: "MAC", def: "Mandatory Access Control: the system enforces access using labels and clearances; users cannot change it." },
          { term: "RBAC", def: "Role-Based Access Control: permissions are assigned to roles that match job functions." },
          { term: "ABAC", def: "Attribute-Based Access Control: policy evaluated from user, resource, and environment attributes." },
          { term: "Rule-Based Access Control", def: "Fixed rules (for example time of day or an ACL) apply to all users." },
          { term: "Least Privilege", def: "Granting only the minimum access required to do a job." },
          { term: "Separation of Duties", def: "Splitting a sensitive process among people so no one can complete it alone." },
          { term: "Implicit Deny", def: "Access not explicitly allowed is denied by default." },
          { term: "PAM", def: "Privileged Access Management: controlling and monitoring privileged accounts through vaulting, JIT access, and session recording." },
          { term: "Access Recertification", def: "Periodic review confirming each user still needs their access." }
        ],
        analogy:
          "DAC is a homeowner deciding who gets a spare key. MAC is a government building where badge color and room classification are enforced by the building, no matter what the occupant wants. RBAC is access by uniform: all nurses can enter the ward. ABAC is a smart door that checks who you are, what you are carrying, the time, and whether your badge was compromised, every time. Rule-based is the sign saying 'doors close at 6 p.m. for everyone'.",
        technical:
          "A hospital assigns access with RBAC: the 'Nurse' role can read and update charts for its own ward, and the 'Billing' role can view invoices but not clinical notes. Because nurses sometimes cover other wards, the hospital layers ABAC: access to a chart is allowed only if the nurse's current shift assignment matches the patient's ward and the device is a managed hospital laptop. Administrators use a PAM vault with just-in-time elevation, so no one holds standing domain admin rights.",
        table: {
          headers: ["Model", "Who decides", "Based on", "Typical setting", "Key weakness"],
          rows: [
            ["DAC", "Resource owner", "Identity / ACL", "Windows and Linux file permissions", "Depends on owners' judgment; easy to over-share"],
            ["MAC", "System / security admin", "Labels and clearances", "Military, SELinux", "Rigid and administratively heavy"],
            ["RBAC", "Administrator via roles", "Job function", "Enterprise applications, HR, hospitals", "Role explosion, privilege creep"],
            ["ABAC", "Policy engine", "Attributes of user, resource, environment", "Zero trust, cloud, dynamic access", "Complex to design and test"],
            ["Rule-based", "Fixed rules", "Conditions (time, IP, protocol)", "Firewall ACLs, time-of-day logons", "Applies equally to everyone; not tied to identity"]
          ]
        },
        confusion: [
          { a: "Role-based", b: "Rule-based", diff: "Role-based follows the person's job role. Rule-based applies a fixed condition (time, address, protocol) to everyone. Both are abbreviated RBAC in some texts, so read the context." },
          { a: "DAC", b: "MAC", diff: "In DAC the owner can share access at will. In MAC the system enforces labels and even the owner cannot change them." },
          { a: "RBAC", b: "ABAC", diff: "RBAC asks 'what is your role?'. ABAC asks about many attributes and conditions at the time of the request, including environment." },
          { a: "Least privilege", b: "Need to know", diff: "Least privilege limits the RIGHTS a user has. Need to know limits which INFORMATION a cleared user may see." },
          { a: "Separation of duties", b: "Job rotation", diff: "Separation splits one task among several people. Rotation moves people between jobs so hidden fraud or errors are likely to be discovered." }
        ],
        soc: "Access control failures show up as privilege creep (a user from marketing with finance permissions), orphaned accounts after people leave, and standing admin accounts used for routine browsing. Analysts review access recertification results and watch for privileged use outside normal patterns, since misused legitimate access is hard to tell from normal work.",
        patterns: [
          ["The file's owner decides who may open it", "DAC"],
          ["Labels such as Secret and clearances; users cannot override", "MAC"],
          ["Access based on job title or function", "RBAC"],
          ["Decision uses department, device health, time, and location", "ABAC"],
          ["Logins allowed only 8 a.m. to 6 p.m. for everyone", "Rule-based access control"],
          ["No one person can both create and approve a vendor payment", "Separation of duties"],
          ["Employee changed departments but kept old access", "Privilege creep; access recertification"],
          ["Admin rights granted for 2 hours, then removed", "Just-in-time privileged access (PAM)"]
        ],
        takeaways: [
          "Know who decides: owner (DAC), system (MAC), roles (RBAC), policy engine (ABAC), fixed rules (rule-based).",
          "Least privilege, need to know, and separation of duties apply under every model.",
          "PAM and access recertification control the most dangerous accounts and the slow build-up of unneeded access."
        ],
        remember: [
          "DAC = owner decides. MAC = system enforces labels. RBAC = roles. ABAC = attributes and context. Rule-based = fixed rules for all.",
          "Role-based vs rule-based: job function vs a condition that applies to everyone.",
          "Least privilege = minimum rights. Need to know = minimum information. Implicit deny = default no.",
          "Separation of duties = no one completes a sensitive process alone. Job rotation and mandatory vacation expose fraud.",
          "Privilege creep is fixed by periodic access recertification.",
          "PAM: vaulting, just-in-time elevation, session recording.",
          "ABAC is the natural fit for zero trust (context-aware, per-request)."
        ],
        taglish:
          "Tandaan mo kung sino ang nagdedesisyon. DAC, ang may-ari ng file (kaya flexible pero minsan sablay). MAC, ang system mismo gamit ang labels at clearance, hindi pwedeng baguhin ng user. RBAC, batay sa trabaho o role (nurse, accountant). ABAC, tinitingnan pa ang oras, lokasyon, at kalagayan ng device bago payagan. Ang rule-based, parehong patakaran sa lahat, tulad ng 'bawal mag-login pagkatapos ng 6 PM'. At laging isaisip ang least privilege: ibigay lang ang kailangan, hindi higit pa."
      },
      {
        id: "d4-t122",
        title: "Federation and Single Sign-On: SAML, OAuth, and OpenID Connect",
        tag: "4.6",
        minutes: 20,
        goal: "Explain how single sign-on and federation work, and tell SAML, OAuth 2.0, and OpenID Connect apart by purpose.",
        why: "Modern organizations log in to dozens of cloud apps with one identity, and the exam expects you to match the protocol to the job: authentication, authorization, or both. OAuth versus OpenID Connect is the classic trap.",
        simple:
          "SINGLE SIGN-ON (SSO) lets a user authenticate once and reach many applications without logging in to each. FEDERATION extends this across organizational boundaries: one organization's identity provider (IdP) vouches for its users to another organization's service (the service provider or relying party), based on a trust relationship, so partners do not need separate accounts. The identity provider authenticates the user (ideally with MFA) and then passes proof of that authentication in a standard format. Three standards cover most of the ground. SAML (Security Assertion Markup Language) is an XML-based standard for browser SSO, especially for enterprise and workforce apps: the IdP sends the service provider a digitally signed ASSERTION saying who the user is and what attributes they have. OAuth 2.0 is an AUTHORIZATION framework: it lets an application obtain limited, delegated access to a user's resources (for example, 'allow this app to read my calendar') using tokens and scopes, without ever receiving the user's password. By itself OAuth does not tell an app who the user is. OpenID Connect (OIDC) is an AUTHENTICATION layer built on top of OAuth 2.0; it adds an ID token (a signed JSON Web Token) that carries the user's identity, which is what 'Sign in with Google' uses. Kerberos (ticket-based) and LDAP (directory lookups) typically handle authentication inside the corporate network, while SAML and OIDC serve web and cloud applications. Attackers target the weak points: stolen or replayed tokens, session hijacking, misconfigured redirect URIs, forged assertions, and consent phishing that tricks users into granting an attacker's app broad OAuth permissions.",
        deepDive: [
          { h: "Roles in a federated login", list: [
            "User (principal): the person logging in.",
            "Identity Provider (IdP): authenticates the user and issues assertions or tokens (examples: a corporate directory service, a cloud identity platform).",
            "Service Provider / Relying Party (SP/RP): the application that trusts the IdP's statement.",
            "In OAuth terms: resource owner (the user), client (the app), authorization server (issues tokens), and resource server (the API holding the data)."
          ] },
          { h: "A SAML login, step by step", list: [
            "The user opens the service provider and is redirected to the IdP.",
            "The user authenticates at the IdP (password plus MFA).",
            "The IdP sends the browser back to the service provider with a signed SAML assertion.",
            "The service provider verifies the signature and grants access based on the assertion's attributes."
          ] },
          { h: "OAuth tokens", list: [
            "Access token: short-lived credential presented to the API, limited by SCOPES (what it may do).",
            "Refresh token: longer-lived token used to get new access tokens; must be protected carefully.",
            "ID token (OIDC only): a signed JWT describing who authenticated and when."
          ] },
          { h: "How to keep federation safe", list: [
            "Require MFA at the identity provider; one strong control protects every connected app.",
            "Validate token and assertion signatures, audiences, and expiry.",
            "Use short token lifetimes and restrict allowed redirect URIs exactly.",
            "Limit and review OAuth app consents; block or require admin approval for high-risk scopes.",
            "Monitor for impossible travel and token reuse, and be able to revoke sessions centrally."
          ] }
        ],
        keyTerms: [
          { term: "SSO", def: "Single Sign-On: authenticate once to reach multiple applications." },
          { term: "Federation", def: "A trust relationship allowing one organization's identity provider to authenticate users for another's services." },
          { term: "IdP", def: "Identity Provider: the system that authenticates users and asserts their identity." },
          { term: "SP / Relying Party", def: "The application or service that trusts the identity provider's assertion." },
          { term: "SAML", def: "XML-based standard exchanging signed authentication assertions, common for enterprise web SSO." },
          { term: "OAuth 2.0", def: "An authorization framework giving apps delegated, scoped access to resources using tokens." },
          { term: "OpenID Connect", def: "An authentication layer on top of OAuth 2.0 that returns an ID token (JWT)." },
          { term: "JWT", def: "JSON Web Token: a compact, signed token format carrying claims." },
          { term: "Scope", def: "The specific permissions an OAuth token grants." },
          { term: "SCIM", def: "A standard for automating user account provisioning and deprovisioning across systems." }
        ],
        analogy:
          "SSO is a festival wristband: prove yourself once at the gate and every stage lets you in. Federation is two festivals agreeing to honor each other's wristbands. SAML is the gate staff handing you a signed letter that says who you are. OAuth is a valet key: it lets the valet drive the car a short distance (limited scope) without handing over your house keys, but it does not say who the valet is. OpenID Connect adds a name tag to that valet key.",
        technical:
          "A company connects its workforce directory to a cloud HR app using SAML: employees click the HR icon, authenticate with MFA at the company IdP, and the HR app accepts the signed assertion. A project-management app that wants to read employees' calendars uses OAuth 2.0 with a 'calendar read-only' scope, so it never sees a password. A customer-facing app lets users 'Sign in with' a social account using OpenID Connect, receiving an ID token that proves who they are.",
        table: {
          headers: ["Standard", "Purpose", "Format", "Typical use"],
          rows: [
            ["SAML", "Authentication (SSO) and attributes", "XML assertions", "Enterprise/workforce web app SSO"],
            ["OAuth 2.0", "Authorization (delegated access)", "Access and refresh tokens", "Letting an app call an API for you"],
            ["OpenID Connect", "Authentication on top of OAuth", "ID token (JWT)", "Consumer 'Sign in with...' and modern apps"],
            ["Kerberos", "Authentication (internal)", "Tickets", "Windows domains and on-premises resources"],
            ["LDAP", "Directory lookup / simple authentication", "Directory protocol", "Querying and binding to a directory"]
          ]
        },
        confusion: [
          { a: "OAuth", b: "OpenID Connect", diff: "OAuth authorizes access to resources and does not identify the user. OpenID Connect adds authentication, with an ID token, on top of OAuth." },
          { a: "SAML", b: "OAuth", diff: "SAML passes signed identity assertions for SSO (XML, browser based). OAuth passes tokens that let an app act on your behalf with limited scope." },
          { a: "Authentication", b: "Authorization", diff: "Authentication proves who you are. Authorization decides what you may do. OIDC/SAML are mainly about the first; OAuth is about the second." },
          { a: "Federation", b: "SSO", diff: "SSO is one login for many apps, usually inside one organization. Federation adds a trust relationship so identities work across organizations." }
        ],
        soc: "Identity attacks now often start in the cloud: a stolen session token or refresh token bypasses MFA because the user already authenticated. Investigators check sign-in logs for impossible travel and new device sign-ins, review recently granted OAuth app consents, and revoke tokens and sessions rather than only resetting the password.",
        patterns: [
          ["One login for many applications", "SSO"],
          ["Partner organization's users access our app with their own credentials", "Federation"],
          ["XML assertion, enterprise browser SSO", "SAML"],
          ["Third-party app gets limited access to my data without my password", "OAuth 2.0"],
          ["'Sign in with' a social account; returns an ID token", "OpenID Connect"],
          ["User tricked into approving a malicious app's permissions", "Consent phishing (OAuth abuse)"],
          ["Attacker reuses a stolen session token and skips MFA", "Token theft / session hijacking"],
          ["Automatically create and remove accounts across SaaS apps", "SCIM provisioning"]
        ],
        takeaways: [
          "SAML and OpenID Connect authenticate; OAuth authorizes.",
          "Federation extends SSO across organizations through a trust relationship.",
          "Protect the IdP with MFA and protect tokens, because a stolen token can bypass MFA."
        ],
        remember: [
          "SAML = XML assertions for SSO. OAuth 2.0 = AUTHORIZATION with tokens and scopes. OIDC = AUTHENTICATION on top of OAuth (ID token / JWT).",
          "OAuth alone does not say who the user is.",
          "IdP authenticates; service provider (relying party) trusts the assertion.",
          "Federation = trust between organizations. SSO = one login across apps.",
          "Stolen tokens can bypass MFA, so use short lifetimes, validation, and central revocation.",
          "Consent phishing grants a malicious app OAuth permissions without stealing a password.",
          "Kerberos and LDAP are the internal-network counterparts (see the authentication protocols lesson)."
        ],
        taglish:
          "Ang SSO, isang login lang para sa maraming app. Ang federation, pinalawak mo ito sa pagitan ng magkaibang organisasyon dahil may tiwala sila sa isa't isa. Tatlong pangalan ang dapat mong malinaw: SAML, para sa enterprise SSO (XML na assertion). OAuth 2.0, para sa authorization, ibig sabihin binibigyan mo ng limitadong access ang isang app (parang valet key) pero hindi nito sinasabi kung sino ka. OpenID Connect, nasa ibabaw ng OAuth at nagdadagdag ng ID token para sa authentication. Delikado ang nakaw na token, kasi pwede nitong lampasan ang MFA."
      },
      {
        id: "d4-t123",
        title: "Vulnerability Scanning and Prioritization: CVSS, EPSS, and False Results",
        tag: "4.3",
        minutes: 22,
        goal: "Choose the right scan type, interpret CVSS and exploit-likelihood data, recognize false positives and false negatives, and decide how to remediate or document a vulnerability.",
        why: "A scanner produces thousands of findings. Security work is deciding which ones matter. The exam tests scan types, how severity is scored, and how to respond when you cannot simply patch.",
        simple:
          "A vulnerability scan checks systems against a database of known weaknesses. How you scan changes what you learn. CREDENTIALED (authenticated) scans log in to the host and see installed software and configuration, so they are more accurate with fewer false positives; NON-CREDENTIALED scans see only what an outsider sees. AGENT-based scanning runs software on each host, which works for laptops that are off the network, while AGENTLESS scanning probes from a central scanner. Network scans find open ports and services, web application scans probe an app's behavior (dynamic testing), and configuration and compliance scans compare settings to a baseline. Every finding is tagged with a CVE (Common Vulnerabilities and Exposures) identifier so everyone refers to the same flaw. The CVSS (Common Vulnerability Scoring System) gives a severity score from 0 to 10: 0.1 to 3.9 is Low, 4.0 to 6.9 Medium, 7.0 to 8.9 High, and 9.0 to 10.0 Critical. The BASE score reflects the flaw's intrinsic traits (how it is exploited, privileges needed, impact on confidentiality, integrity, and availability); temporal and environmental metrics adjust for current exploit availability and your own environment. But severity alone is a poor way to prioritize, so teams add context: is the system exposed to the Internet, how critical is the asset, is the flaw actively exploited (CISA's Known Exploited Vulnerabilities catalog), and how likely is exploitation (EPSS, a probability score). A FALSE POSITIVE is a finding that is not real; a FALSE NEGATIVE is a real flaw the scan missed, which is more dangerous because it creates false confidence. Remediation options are to patch, change the configuration, apply a compensating control or segmentation, or formally accept the risk with an exception and a review date. After fixing, you rescan to validate and report.",
        deepDive: [
          { h: "Scan types compared", list: [
            "Credentialed vs non-credentialed: inside view vs outside view.",
            "Agent-based vs agentless: continuous local visibility vs central, network-based probing.",
            "Intrusive vs non-intrusive: intrusive checks may try to exploit and can disrupt a system; non-intrusive checks only observe.",
            "Active vs passive: active sends probes; passive listens to traffic and fingerprints systems without touching them (good for fragile OT and medical devices).",
            "Static (SAST) vs dynamic (DAST) application testing: reviewing source code without running it vs testing the running application. Software composition analysis (SCA) checks third-party libraries, and an SBOM lists the components."
          ] },
          { h: "Reading CVSS", list: [
            "Base metrics: attack vector (network, adjacent, local, physical), complexity, privileges required, user interaction, scope, and impact on C, I, and A.",
            "A remotely exploitable flaw needing no privileges and no user interaction scores high.",
            "Temporal: is exploit code available, is a fix available. Environmental: how important is the affected asset to YOU."
          ] },
          { h: "Prioritizing like an analyst", p: "A medium CVSS flaw on an Internet-facing server with a public exploit being used in attacks usually outranks a critical flaw on an isolated test box with no route to anything sensitive. Ask four questions: How severe? How exposed? How critical is the asset? Is it being exploited? Compensating controls such as a WAF rule, segmentation, or disabling the vulnerable feature can lower urgency while a patch is prepared." },
          { h: "When you cannot patch", list: [
            "Compensating control: isolate the system, restrict access, add monitoring, or virtual-patch with an IPS/WAF rule.",
            "Exception or exemption: documented, approved by the risk owner, time-limited, and reviewed.",
            "Insurance and acceptance are risk-management decisions, not fixes.",
            "Always validate with a rescan afterward and keep the report for audit."
          ] },
          { h: "Scanning versus penetration testing", p: "A scan finds known weaknesses broadly and cheaply, usually without exploiting them. A penetration test is a goal-oriented, human-driven attempt to exploit weaknesses and chain them together, proving real impact. A mature program uses both. Bug bounty programs add outside researchers who report flaws, and responsible disclosure sets the rules for reporting and fixing them before details go public." }
        ],
        keyTerms: [
          { term: "CVE", def: "Common Vulnerabilities and Exposures: a unique identifier for a publicly known vulnerability." },
          { term: "CVSS", def: "Common Vulnerability Scoring System: a 0 to 10 severity score (Low, Medium, High, Critical)." },
          { term: "EPSS", def: "Exploit Prediction Scoring System: the estimated probability a vulnerability will be exploited." },
          { term: "KEV Catalog", def: "CISA's list of vulnerabilities known to be exploited in the wild." },
          { term: "Credentialed Scan", def: "A scan that logs in to systems for deeper, more accurate results." },
          { term: "False Positive", def: "A scanner finding that is not actually a vulnerability." },
          { term: "False Negative", def: "A real vulnerability the scanner failed to report." },
          { term: "Compensating Control", def: "An alternative safeguard used when the primary fix is not possible." },
          { term: "SAST / DAST / SCA", def: "Static code analysis, dynamic testing of a running app, and analysis of third-party components." },
          { term: "Bug Bounty", def: "A program paying outside researchers to responsibly report security flaws." }
        ],
        analogy:
          "A vulnerability scan is a building inspector walking the property with a checklist of known defects. A credentialed scan is the inspector with the keys to every room; a non-credentialed scan is the inspector who can only look from the sidewalk. CVSS is the inspector's severity grade for each defect, but a good property manager also asks which defects are on the ground-floor door facing the street and which are in a storage closet nobody enters.",
        technical:
          "A weekly credentialed scan reports 4,000 findings. The team filters to systems that are Internet-facing or hold regulated data, then sorts by CVSS, EPSS, and KEV status. A CVSS 8.1 flaw in the VPN gateway is listed in KEV, so it is patched within 48 hours. A CVSS 9.8 flaw on a lab server on an isolated VLAN gets a documented exception with network restrictions and a 90-day review. A finding flagged as critical turns out to be a false positive because the scanner misread a patched version string; it is marked and tuned out.",
        table: {
          headers: ["CVSS score", "Severity"],
          rows: [
            ["0.0", "None"],
            ["0.1 - 3.9", "Low"],
            ["4.0 - 6.9", "Medium"],
            ["7.0 - 8.9", "High"],
            ["9.0 - 10.0", "Critical"]
          ]
        },
        confusion: [
          { a: "False positive", b: "False negative", diff: "A false positive reports a flaw that is not there (wasted effort). A false negative misses a flaw that IS there (hidden risk, more dangerous)." },
          { a: "CVE", b: "CVSS", diff: "CVE names a specific vulnerability. CVSS rates how severe it is." },
          { a: "CVSS", b: "EPSS", diff: "CVSS is severity if exploited. EPSS is the likelihood it will be exploited. Use both." },
          { a: "Vulnerability scan", b: "Penetration test", diff: "A scan identifies known weaknesses, usually automated and non-exploiting. A penetration test attempts to exploit and chain weaknesses to demonstrate impact." },
          { a: "Compensating control", b: "Risk acceptance", diff: "A compensating control reduces the risk when you cannot patch. Acceptance means leaving the risk in place with approval and a review date." }
        ],
        soc: "Vulnerability data feeds incident response: when a new flaw is announced and exploited, the first question is 'where do we have it?', and an accurate, recent scan plus an asset inventory (and SBOM) answers it in minutes. Analysts also use scan and KEV data to decide which alerts on a given host deserve urgent attention.",
        patterns: [
          ["More accurate results, sees installed software", "Credentialed scan"],
          ["Laptops that are rarely on the corporate network", "Agent-based scanning"],
          ["Scanner reports a flaw that does not exist", "False positive"],
          ["Scanner misses a real flaw", "False negative"],
          ["Score of 9.8", "CVSS Critical"],
          ["Likelihood of exploitation in the next 30 days", "EPSS"],
          ["Cannot patch an old system this quarter", "Compensating control or documented exception"],
          ["Review source code without running it", "SAST"],
          ["Testing the running web application from outside", "DAST"]
        ],
        takeaways: [
          "Credentialed scans are more accurate; agents help for roaming devices.",
          "CVSS says how bad; EPSS and KEV say how likely; asset context says how much it matters to you.",
          "When you cannot patch, use compensating controls or a documented, time-limited exception, then rescan."
        ],
        remember: [
          "Credentialed scan = logs in, more accurate, fewer false positives. Non-credentialed = outsider view.",
          "CVSS: Low 0.1-3.9, Medium 4.0-6.9, High 7.0-8.9, Critical 9.0-10.0.",
          "CVE = the ID. CVSS = the severity. EPSS = the likelihood. KEV = known exploited.",
          "False positive = not real. False negative = missed real flaw (more dangerous).",
          "Prioritize by severity AND exposure AND asset criticality AND active exploitation.",
          "Cannot patch? Compensating control or time-limited exception approved by the risk owner. Then rescan.",
          "Passive scanning suits fragile OT/medical devices. Intrusive scans can disrupt systems.",
          "SAST = source code, DAST = running app, SCA = third-party components (SBOM)."
        ],
        taglish:
          "Ang vulnerability scan, parang inspeksyon ng gusali gamit ang checklist ng mga kilalang sira. Credentialed scan ay may susi sa lahat ng kwarto (mas tumpak), ang non-credentialed ay nakatingin lang sa labas. Ang CVE ay pangalan ng sira, ang CVSS ay grado ng kalubhaan (0 hanggang 10), at ang EPSS ay tsansa na pagsamantalahan ito. Hindi sapat ang CVSS lang: tingnan din kung nakalantad ba sa Internet, gaano kahalaga ang system, at kung ginagamit na ba ng mga attacker. Ang false positive ay pekeng alarma; ang false negative ay hindi nakita na totoong sira, kaya mas delikado."
      },
      {
        id: "d4-t124",
        title: "Log Management: Syslog, SNMP, NetFlow, and Time Synchronization",
        tag: "4.4",
        minutes: 20,
        goal: "Describe the main log sources and protocols, why synchronized time and protected logs matter, and how a SIEM turns raw logs into alerts.",
        why: "Detection and investigation both depend on logs. Questions test whether you know which source answers which question, what syslog, SNMP, and NetFlow each do, and why time sync and log integrity make or break an investigation.",
        simple:
          "Logs are the recorded history of what happened on systems, networks, and applications. Useful sources include operating systems (Windows Event Log, Linux logs), authentication systems, firewalls, IDS/IPS, endpoints and EDR, DNS and web servers, cloud audit logs, and application logs. Several protocols move this data. SYSLOG is the standard for sending log messages to a central server (traditionally UDP port 514, which is unreliable; TCP or TLS-protected syslog is better), and messages carry a severity from 0 (Emergency) to 7 (Debug). SNMP (Simple Network Management Protocol) monitors and manages network devices: a manager POLLS devices on UDP 161 and devices send unsolicited TRAPS to UDP 162; versions 1 and 2c use plaintext community strings, while SNMPv3 adds authentication and encryption, so v3 is the secure choice. NETFLOW (and similar IPFIX or sFlow) records METADATA about network conversations (source and destination, ports, bytes, duration) but not the content, which makes it great for spotting data exfiltration and scanning at low storage cost. A full PACKET CAPTURE records the content and is richer but expensive. A SIEM collects logs from everywhere, NORMALIZES them into a common format, CORRELATES events across sources, applies detection rules, retains them for investigations and compliance, and raises alerts. None of this works unless clocks agree: NTP (UDP 123) keeps every device synchronized, ideally in UTC, so events from different systems can be put in the right order. Finally, logs themselves are targets: attackers clear them to hide (Windows records this as event 1102 for the Security log), so logs should be forwarded off the host in real time and stored in a write-once or integrity-protected way.",
        deepDive: [
          { h: "Which log answers which question", list: [
            "Authentication logs: who logged in, from where, success or failure.",
            "Firewall logs: what network connections were allowed or blocked.",
            "DNS logs: which names a host looked up (beaconing, tunneling, malware domains).",
            "Web server and proxy logs: what URLs and users, and attack attempts like injection strings.",
            "Endpoint/EDR logs: processes started, files changed, commands run.",
            "Cloud audit logs: who changed which configuration or accessed which resource.",
            "NetFlow: who talked to whom and how much data moved."
          ] },
          { h: "Syslog severity levels", p: "0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug. Lower numbers are MORE severe." },
          { h: "Why time synchronization is a security control", p: "If a firewall, a server, and a laptop disagree by even a few minutes, you cannot reconstruct the sequence of an attack, and logs may not hold up as evidence. Use NTP from trusted sources, standardize on UTC, and monitor for clock drift. Attackers may manipulate time to confuse logs or break Kerberos, which tolerates only a small time skew." },
          { h: "SIEM concepts", list: [
            "Aggregation: collect logs in one place.",
            "Normalization: convert different formats into common fields.",
            "Correlation: link events (for example, many failed logins followed by a success followed by a large upload).",
            "Alerting and dashboards: surface what matters.",
            "Retention and archiving: keep data long enough for investigations and for regulatory requirements.",
            "Tuning: reduce false positives and alert fatigue by adjusting rules and thresholds."
          ] },
          { h: "Protecting log integrity", list: [
            "Forward logs off the originating host immediately so a compromised host cannot erase the evidence.",
            "Restrict who can modify or delete logs, and alert on log clearing.",
            "Store archives with integrity protection (hashing, write-once storage).",
            "Encrypt log transport and storage where logs contain sensitive data."
          ] }
        ],
        keyTerms: [
          { term: "Syslog", def: "A standard protocol for sending log messages to a central server, with severity levels 0 to 7." },
          { term: "SNMP", def: "Protocol for monitoring and managing network devices. v3 adds authentication and encryption." },
          { term: "SNMP Trap", def: "An unsolicited alert a device sends to the manager (UDP 162)." },
          { term: "NetFlow / IPFIX", def: "Network traffic metadata (who, to whom, how much) without payload content." },
          { term: "Packet Capture", def: "A full recording of network traffic including content." },
          { term: "SIEM", def: "Security Information and Event Management: collects, normalizes, correlates, retains, and alerts on log data." },
          { term: "NTP", def: "Network Time Protocol (UDP 123): synchronizes clocks across systems." },
          { term: "Correlation", def: "Linking related events from different sources to reveal a pattern." },
          { term: "Log Retention", def: "How long logs are kept, driven by investigation needs and compliance." },
          { term: "Alert Fatigue", def: "Analysts ignoring alerts because there are too many low-value ones." }
        ],
        analogy:
          "Logs are the security cameras, door badges, and visitor books of an IT environment. Syslog is the courier who brings every notebook to head office. NetFlow is the phone bill (who called whom, for how long) while packet capture is the full call recording. The SIEM is the investigator who lays all the notebooks side by side, which only works if every clock in the building shows the same time.",
        technical:
          "An analyst investigating a breach correlates firewall logs, VPN authentication logs, and endpoint telemetry in the SIEM. The VPN log shows a login at 02:14 UTC from a new country; endpoint logs show PowerShell starting at 02:16; NetFlow shows 8 GB leaving to an unfamiliar address at 02:40. Because all devices sync to the same NTP source, the sequence is trustworthy. The attacker also cleared the local Security log, but because logs were forwarded to the SIEM in real time, the evidence survived.",
        table: {
          headers: ["Source or protocol", "What it gives you", "Remember"],
          rows: [
            ["Syslog", "Centralized log messages", "UDP 514 by default; severity 0 (worst) to 7"],
            ["SNMP", "Device monitoring and traps", "Poll UDP 161, traps UDP 162; use v3"],
            ["NetFlow / IPFIX", "Traffic metadata", "Great for exfiltration and scanning detection"],
            ["Packet capture", "Full traffic content", "Rich but storage-heavy"],
            ["Authentication logs", "Logins and failures", "Spraying, brute force, impossible travel"],
            ["DNS logs", "Name lookups", "Beaconing, tunneling, DGA"],
            ["NTP", "Synchronized time", "UDP 123; keep UTC"]
          ]
        },
        confusion: [
          { a: "NetFlow", b: "Packet capture", diff: "NetFlow is metadata only (cheap, long retention). Packet capture includes the content (expensive, short retention)." },
          { a: "SNMP poll", b: "SNMP trap", diff: "A poll is the manager asking the device (UDP 161). A trap is the device announcing an event on its own (UDP 162)." },
          { a: "SNMPv2c", b: "SNMPv3", diff: "v2c uses plaintext community strings. v3 adds authentication and encryption." },
          { a: "Log aggregation", b: "Log correlation", diff: "Aggregation just gathers logs together. Correlation links events across sources to find a pattern." },
          { a: "Syslog severity 0", b: "Syslog severity 7", diff: "0 is Emergency (most severe). 7 is Debug (least severe)." }
        ],
        soc: "A SOC lives in this data. Common detections: many failed logins then a success, a service account used interactively, a large outbound flow to a rare destination, PowerShell with encoded commands, and a Security log cleared. If time sources drift or logs are missing from some sources, investigators have blind spots, so log coverage and time sync are measured and audited like any other control.",
        patterns: [
          ["Send device logs to a central server", "Syslog"],
          ["Manage and monitor routers and switches; secure version", "SNMPv3"],
          ["Detect large data transfers without storing content", "NetFlow"],
          ["Need the actual contents of the traffic", "Packet capture"],
          ["Correlate events across many systems; normalize formats", "SIEM"],
          ["Events from two systems appear out of order", "Time synchronization (NTP)"],
          ["Attacker erased the local logs", "Forward logs off-host; Event ID 1102"],
          ["Too many low-value alerts", "SIEM tuning; alert fatigue"]
        ],
        takeaways: [
          "Know which source answers which question: authentication, firewall, DNS, endpoint, cloud, flow.",
          "Time synchronization and off-host forwarding are what make logs trustworthy evidence.",
          "A SIEM aggregates, normalizes, correlates, retains, and alerts."
        ],
        remember: [
          "Syslog: central log collection; UDP 514 by default; severity 0 (Emergency) to 7 (Debug).",
          "SNMP: poll on UDP 161, traps on UDP 162. Use SNMPv3 (auth + encryption).",
          "NetFlow = metadata (who, to whom, how much). Packet capture = full content.",
          "SIEM: aggregate, normalize, correlate, retain, alert.",
          "NTP (UDP 123) keeps clocks synchronized; use UTC. Without it, correlation fails.",
          "Forward logs off the host in real time; alert on log clearing (Windows 1102 = Security log cleared).",
          "Tune the SIEM to cut false positives and alert fatigue."
        ],
        taglish:
          "Ang logs ang kasaysayan ng lahat ng nangyari sa systems. Ang syslog, nagpapadala ng logs sa gitnang server. Ang SNMP, para sa pagmo-monitor ng network devices (gamitin ang v3 kasi naka-encrypt). Ang NetFlow, parang phone bill: nakikita mong sino ang tumawag kanino at gaano katagal, pero hindi ang laman ng usapan. Ang packet capture, kumpletong recording. Ang SIEM ang nag-iipon, nag-aayos sa iisang format, at nag-uugnay ng mga event para magbigay ng alert. Importante ang NTP, kasi kung magkakaiba ang oras ng mga device, hindi mo maaayos ang tamang pagkakasunod-sunod ng pangyayari."
      },
      {
        id: "d4-t125",
        title: "Endpoint Security: Antivirus, EDR, XDR, and Host-Based Controls",
        tag: "4.5",
        minutes: 18,
        goal: "Compare antivirus, EDR, XDR, and MDR, and explain host-based controls such as HIDS/HIPS, host firewalls, application allowlisting, and file integrity monitoring.",
        why: "Endpoints are where users, email, and the internet meet your data, so they are the most common place attacks land. The exam expects you to match the endpoint tool to the capability described.",
        simple:
          "Traditional ANTIVIRUS compares files to a database of known-malware signatures, which is fast but blind to new or fileless threats. Next-generation antivirus adds heuristics and machine learning. EDR (Endpoint Detection and Response) goes further: it continuously records what happens on each endpoint (processes, commands, network connections, file changes), analyzes behavior for suspicious patterns, and lets responders act remotely, for example isolating a host from the network, killing a process, or quarantining a file. XDR (Extended Detection and Response) extends the same idea across more than endpoints, correlating telemetry from endpoints, email, network, identity, and cloud. MDR (Managed Detection and Response) is a service in which an outside team monitors and responds for you. A host-based intrusion detection system (HIDS) watches a single host and alerts; a host-based intrusion PREVENTION system (HIPS) can also block. A host-based FIREWALL filters traffic to and from that one device, which protects laptops away from the corporate perimeter. APPLICATION ALLOWLISTING (also called whitelisting) lets only approved programs run and denies everything else; it is highly effective against unknown malware but demands management effort. A blocklist (denylist) blocks known-bad items and is easier but weaker. FILE INTEGRITY MONITORING (FIM) records a trusted hash of critical files and alerts on unexpected changes, catching tampering with system files and configuration. Other host controls round out the picture: full-disk encryption, timely patching, a hardened secure baseline (for example CIS benchmarks), removal of unneeded services, device and USB controls, least privilege, and user and entity behavior analytics (UEBA) to spot unusual account behavior.",
        deepDive: [
          { h: "Antivirus versus EDR in one sentence each", p: "Antivirus asks 'Is this file known to be bad?' and blocks it. EDR asks 'What is this system doing, and does that behavior look malicious?', keeps a recorded history, and gives responders tools to contain the host." },
          { h: "What EDR can do during an incident", list: [
            "Isolate an endpoint from the network while keeping the management connection.",
            "Kill or suspend a malicious process; quarantine or delete files.",
            "Search the whole fleet for an indicator (a file hash, a domain, a command line).",
            "Show a process tree: which program launched which, so you can trace a phishing attachment to PowerShell to a network connection.",
            "Roll back changes (some tools) and collect forensic data."
          ] },
          { h: "Allowlist versus blocklist", list: [
            "Allowlist (default deny): only listed software runs. Strong, harder to maintain.",
            "Blocklist (default allow): everything runs except what is listed as bad. Easier, but misses anything new.",
            "Examples: Windows AppLocker or WDAC (allowlisting), classic signature antivirus (blocklisting)."
          ] },
          { h: "Where each control sits", list: [
            "Network-based (NIDS/NIPS, perimeter firewall): sees traffic between devices.",
            "Host-based (HIDS/HIPS, host firewall, EDR): sees activity inside one device, including encrypted traffic after it is decrypted and activity from off-network devices.",
            "Layering both gives defense in depth."
          ] }
        ],
        keyTerms: [
          { term: "Antivirus (signature)", def: "Detects known malware by matching files to signatures." },
          { term: "EDR", def: "Endpoint Detection and Response: continuous endpoint monitoring, behavioral detection, and remote response." },
          { term: "XDR", def: "Extended Detection and Response: correlates telemetry across endpoint, email, network, identity, and cloud." },
          { term: "MDR", def: "Managed Detection and Response: an outsourced service that monitors and responds on your behalf." },
          { term: "HIDS / HIPS", def: "Host-based intrusion detection (alerts) and prevention (can block)." },
          { term: "Host-Based Firewall", def: "A firewall running on an individual device, protecting it wherever it is." },
          { term: "Application Allowlisting", def: "Only approved applications may run; everything else is denied." },
          { term: "File Integrity Monitoring (FIM)", def: "Alerting when critical files change from a trusted baseline hash." },
          { term: "UEBA", def: "User and Entity Behavior Analytics: detecting anomalies in how accounts and devices behave." },
          { term: "Secure Baseline", def: "A documented, hardened configuration used as the starting point for systems." }
        ],
        analogy:
          "Antivirus is a bouncer with a photo book of known troublemakers. EDR is a bouncer with a camera, a notebook, and a radio: he watches behavior, remembers what happened, and can lock the room. XDR is the whole venue's security center linking the door, the bar, the parking lot, and the ticket desk. An allowlist is a guest list where anyone not on it is refused; a blocklist is a banned list where anyone not on it walks in. FIM is a seal on the safe that tells you if it was opened.",
        technical:
          "A user opens a malicious attachment that launches PowerShell. Signature antivirus sees nothing wrong with a trusted Windows tool, but EDR flags the unusual parent-child process chain (Word starting PowerShell with an encoded command) and the new outbound connection. The SOC isolates the host with one click, searches the fleet and finds the same command line on two other machines, and uses FIM alerts to confirm no system files were modified. Application allowlisting on servers already blocked the payload from running there.",
        table: {
          headers: ["Tool", "Looks at", "Can respond?", "Best at"],
          rows: [
            ["Antivirus", "File signatures", "Quarantine files", "Known malware"],
            ["EDR", "Endpoint behavior and history", "Yes: isolate, kill, remediate", "Fileless and novel attacks, investigation"],
            ["XDR", "Endpoint + email + network + identity + cloud", "Yes, across sources", "Correlating multi-stage attacks"],
            ["MDR", "Outsourced monitoring", "Yes, by the provider", "Teams without 24/7 staff"],
            ["HIDS / HIPS", "One host's activity", "HIPS can block", "Host-level intrusion attempts"],
            ["Application allowlisting", "What is allowed to run", "Prevents execution", "Stopping unknown malware"],
            ["FIM", "Changes to critical files", "Alerts", "Detecting tampering"]
          ]
        },
        confusion: [
          { a: "Antivirus", b: "EDR", diff: "Antivirus mostly matches known signatures. EDR analyzes behavior, records history, and gives you response actions like host isolation." },
          { a: "EDR", b: "XDR", diff: "EDR is focused on endpoints. XDR correlates across endpoints, email, network, identity, and cloud." },
          { a: "HIDS", b: "HIPS", diff: "HIDS detects and alerts. HIPS can also block the activity." },
          { a: "Allowlist", b: "Blocklist", diff: "Allowlist = deny by default, only approved items run. Blocklist = allow by default, only listed-bad items are blocked." },
          { a: "Host-based firewall", b: "Network firewall", diff: "A host-based firewall protects one device wherever it goes. A network firewall protects a network segment at a chokepoint." }
        ],
        soc: "EDR is the analyst's main console during triage: it shows the process tree, the command line, and the network connections, and lets you contain a host in seconds. The most valuable detections come from behavior (Office spawning PowerShell, credential dumping attempts, mass file renames), which signature-only tools miss.",
        patterns: [
          ["Continuous monitoring and remote isolation of a laptop", "EDR"],
          ["Correlate telemetry from endpoint, email, and cloud", "XDR"],
          ["Outsourced 24/7 detection and response", "MDR"],
          ["Only approved programs may run", "Application allowlisting"],
          ["Alert when a system file's hash changes", "File integrity monitoring"],
          ["Protect a roaming laptop from network attacks", "Host-based firewall"],
          ["Detects AND blocks on a single host", "HIPS"],
          ["Detects unknown malware by its behavior", "EDR / behavioral analysis"]
        ],
        takeaways: [
          "Antivirus blocks the known; EDR watches behavior and enables response; XDR links more data sources.",
          "Allowlisting is the strongest execution control; FIM detects tampering.",
          "Host-based controls protect devices anywhere, including off the corporate network."
        ],
        remember: [
          "Antivirus = signatures (known). EDR = behavior + history + response (isolate, kill process).",
          "XDR = EDR extended across email, network, identity, cloud. MDR = managed service.",
          "HIDS alerts; HIPS can block.",
          "Allowlist = default deny (strong). Blocklist = default allow (weaker).",
          "FIM = baseline hashes of critical files; alerts on change.",
          "Host-based firewall protects the device wherever it travels.",
          "Hardening: secure baseline, patching, remove unneeded services, disk encryption, device control."
        ],
        taglish:
          "Ang antivirus, nire-recognize ang kilalang malware gamit ang signature. Ang EDR, mas matalino: binabantayan nito ang kilos ng computer, may history, at kaya mo itong i-isolate sa network agad. Ang XDR, dinadagdagan ng datos mula sa email, network, identity, at cloud. Ang MDR, serbisyo na ibang team ang nagbabantay para sa iyo. Ang application allowlisting, ang mga naka-approve lang na program ang tatakbo (mas matibay). Ang FIM, nag-aalarma kapag nagbago ang mahahalagang file."
      }
    ],

    d5: [
      {
        id: "d5-t112",
        title: "Compliance and Regulations in Depth: GDPR, HIPAA, PCI DSS, SOX, and More",
        tag: "5.4",
        minutes: 24,
        goal: "Match each major law or standard to the data and organizations it covers, and explain core privacy concepts such as data subject rights, controller versus processor, and breach notification.",
        why: "Compliance questions describe an organization and its data and ask which rule applies, or what must happen after a breach. If you can map the data type to the regulation in seconds, these are some of the easiest points on the exam.",
        simple:
          "A REGULATION is a legal or contractual requirement, so non-compliance brings fines, sanctions, and reputational damage. The big ones follow the type of data. GDPR (General Data Protection Regulation) is the European Union's privacy law: it protects the personal data of people in the EU, applies to any organization that handles it wherever the organization is located, and grants data subjects rights such as access, correction, erasure (the right to be forgotten), portability, and objection. Organizations must have a lawful basis (such as consent), build in privacy by design, and notify the supervisory authority of a breach within 72 hours; fines can reach 20 million euros or 4 percent of global annual turnover, whichever is higher. HIPAA (Health Insurance Portability and Accountability Act) protects protected health information (PHI) in the United States and applies to covered entities (providers, health plans, clearinghouses) and their business associates; its Security Rule requires administrative, physical, and technical safeguards. PCI DSS (Payment Card Industry Data Security Standard) is a contractual standard, not a law, for anyone who stores, processes, or transmits payment card data: it requires protections such as network segmentation, encryption of stored and transmitted cardholder data, access control, and regular scanning and testing. SOX (Sarbanes-Oxley) targets publicly traded companies and the integrity of financial reporting, which includes IT controls over financial systems, audit trails, and record retention. GLBA (Gramm-Leach-Bliley) requires financial institutions to protect customers' nonpublic personal information. FERPA protects student education records, COPPA restricts collecting data from children under 13 online, CCPA/CPRA gives California residents the right to know, delete, correct, and opt out of the sale or sharing of their data, and FISMA governs information security for US federal agencies. Compliance is proven through audits and attestations, supported by data governance roles (owner, controller, processor, custodian) and by awareness of data sovereignty: laws can apply based on where data is collected, stored, or processed.",
        deepDive: [
          { h: "Privacy roles you must keep straight", list: [
            "Data subject: the individual the data is about.",
            "Data controller: decides WHY and HOW personal data is processed.",
            "Data processor: processes data ON BEHALF of the controller (for example a cloud or payroll provider).",
            "Data owner: the business executive accountable for a data set (classification and access decisions).",
            "Data custodian/steward: handles day-to-day protection and quality.",
            "Data protection officer (DPO): independent privacy advisor required by GDPR in certain cases."
          ] },
          { h: "GDPR highlights", list: [
            "Scope follows the data subject, not the company's location.",
            "Lawful bases include consent, contract, legal obligation, and legitimate interest; consent must be clear and withdrawable.",
            "Data subject rights: access, rectification, erasure, restriction, portability, objection.",
            "Breach notification to the authority within 72 hours of becoming aware (and to individuals if high risk).",
            "Privacy by design and by default; data protection impact assessments (DPIA) for high-risk processing.",
            "Cross-border transfers need an approved legal mechanism."
          ] },
          { h: "PCI DSS essentials", list: [
            "Applies to anyone handling cardholder data; enforced through contracts with card brands and banks, not by statute.",
            "Do not store the card verification code (CVV) after authorization.",
            "Render the card number unreadable when stored (encryption, tokenization, truncation) and encrypt it in transit.",
            "Segment the network so the cardholder data environment is as small as possible; this reduces audit scope.",
            "Regular vulnerability scanning (including approved external scans) and penetration testing."
          ] },
          { h: "HIPAA at a glance", list: [
            "Privacy Rule: who may use or disclose PHI and patient rights.",
            "Security Rule: administrative, physical, and technical safeguards for electronic PHI.",
            "Breach Notification Rule: notify affected individuals and regulators.",
            "Business associates (for example a billing company) must sign a business associate agreement (BAA)."
          ] },
          { h: "When regulations collide", p: "An organization often faces several at once: a hospital handles HIPAA data and card payments (PCI DSS); a multinational online retailer faces GDPR, CCPA, and PCI DSS. The practical approach is to map data types to rules, apply the strictest common controls, and use a framework (such as ISO 27001 or NIST) to organize the program." }
        ],
        keyTerms: [
          { term: "GDPR", def: "EU privacy law protecting personal data of people in the EU; 72-hour breach notice; fines up to 4% of global turnover." },
          { term: "HIPAA", def: "US law protecting health information (PHI) held by covered entities and business associates." },
          { term: "PCI DSS", def: "Contractual security standard for organizations handling payment card data." },
          { term: "SOX", def: "US law on integrity of financial reporting for public companies, including IT controls." },
          { term: "GLBA", def: "US law requiring financial institutions to safeguard customers' nonpublic personal information." },
          { term: "FERPA", def: "US law protecting student education records." },
          { term: "CCPA / CPRA", def: "California laws giving residents rights to know, delete, correct, and opt out of the sale or sharing of their data." },
          { term: "Data Controller / Processor", def: "Controller decides why and how data is processed; processor handles it on the controller's behalf." },
          { term: "Right to Erasure", def: "A data subject's right to have their personal data deleted in certain circumstances." },
          { term: "Data Sovereignty", def: "The principle that data is subject to the laws of the country where it is collected or stored." }
        ],
        analogy:
          "Think of regulations as different inspectors who each care about a specific kind of cargo. The GDPR inspector cares about any package belonging to a person in the EU, even if your warehouse is in another country. The HIPAA inspector only visits medical cargo. The PCI inspector checks anyone carrying payment cards, because the card brands made it a condition of doing business. The SOX inspector only audits public companies' books.",
        technical:
          "An online retailer in Asia sells to customers in the EU and California and accepts card payments. GDPR applies because it handles EU residents' data, CCPA applies to the California customers, and PCI DSS applies because it processes cards. The retailer tokenizes card numbers through a payment processor to shrink PCI scope, publishes a privacy notice with deletion and opt-out processes, appoints a contact for data subject requests, and rehearses a response plan that can notify the EU authority within 72 hours.",
        table: {
          headers: ["Rule", "Protects / covers", "Applies to", "Law or standard?"],
          rows: [
            ["GDPR", "Personal data of people in the EU", "Any organization handling it", "Law (EU)"],
            ["HIPAA", "Protected health information", "Covered entities and business associates", "Law (US)"],
            ["PCI DSS", "Payment card data", "Anyone storing, processing, or transmitting cards", "Contractual standard"],
            ["SOX", "Financial reporting integrity", "Publicly traded companies", "Law (US)"],
            ["GLBA", "Customers' nonpublic financial information", "Financial institutions", "Law (US)"],
            ["FERPA", "Student education records", "Schools receiving federal funds", "Law (US)"],
            ["COPPA", "Data of children under 13 online", "Online services directed at or aware of children", "Law (US)"],
            ["CCPA / CPRA", "California residents' personal data", "Qualifying businesses", "Law (California)"],
            ["FISMA", "Federal information systems", "US federal agencies and contractors", "Law (US)"]
          ]
        },
        confusion: [
          { a: "Data controller", b: "Data processor", diff: "The controller decides why and how personal data is used. The processor acts only on the controller's instructions." },
          { a: "PCI DSS", b: "A law such as GDPR", diff: "PCI DSS is a contractual industry standard enforced through card brands and banks. GDPR is law enforced by regulators." },
          { a: "HIPAA", b: "GDPR", diff: "HIPAA covers US health information held by covered entities. GDPR covers all personal data of people in the EU, in any sector." },
          { a: "Framework (NIST, ISO)", b: "Regulation", diff: "Frameworks are voluntary guidance. Regulations are mandatory." },
          { a: "Data owner", b: "Data custodian", diff: "The owner is accountable and decides classification and access. The custodian operates the controls day to day." }
        ],
        soc: "When an incident involves personal data, the clock starts: the SOC and the privacy or legal team must decide quickly what data was exposed, whose it was, and which notification deadlines apply (for example GDPR's 72 hours). Good incident documentation, accurate data inventories, and data classification make that determination possible; weak ones turn a breach into a compliance failure as well.",
        patterns: [
          ["Personal data of EU residents; right to be forgotten", "GDPR"],
          ["Patient records, PHI, business associate agreement", "HIPAA"],
          ["Credit card numbers; reduce scope with segmentation or tokenization", "PCI DSS"],
          ["Public company; accuracy of financial statements", "SOX"],
          ["Bank or lender protecting customer financial data", "GLBA"],
          ["Student education records", "FERPA"],
          ["California consumers can opt out of the sale of their data", "CCPA / CPRA"],
          ["Online service collecting data from children under 13", "COPPA"],
          ["Breach notice to the regulator within 72 hours", "GDPR"]
        ],
        takeaways: [
          "Let the data type pick the regulation: personal data of EU residents, health records, payment cards, financial reporting.",
          "PCI DSS is contractual; most others are law; frameworks are voluntary.",
          "Know the privacy roles: subject, controller, processor, owner, custodian, DPO."
        ],
        remember: [
          "GDPR = EU residents' personal data; rights (access, erasure, portability); 72-hour breach notice; up to 4% of global turnover.",
          "HIPAA = US health information (PHI); covered entities and business associates; Security Rule safeguards.",
          "PCI DSS = payment cards; contractual, not a law; segment and encrypt; never store CVV after authorization.",
          "SOX = public companies' financial reporting integrity, including IT controls.",
          "GLBA = financial institutions. FERPA = student records. COPPA = children under 13. CCPA = California consumers. FISMA = federal agencies.",
          "Controller decides why/how; processor acts for the controller.",
          "Data sovereignty: laws follow where data is collected, stored, or processed."
        ],
        taglish:
          "Hanapin lang ang uri ng data. Personal data ng mga tao sa EU, GDPR 'yan (72 oras para i-report ang breach, at puwedeng umabot sa 4% ng global na kita ang multa). Records ng pasyente, HIPAA. Credit card, PCI DSS (kontrata ng card brands, hindi batas). Pinansyal na ulat ng public company, SOX. Bangko at customer financial info, GLBA. Student records, FERPA. Bata na wala pang 13, COPPA. Consumers sa California, CCPA. At tandaan ang controller (nagdedesisyon kung bakit at paano gagamitin ang data) at processor (gumagawa lang para sa controller)."
      },
      {
        id: "d5-t113",
        title: "Vendor Agreements and Contract Documents: SLA, MSA, SOW, NDA, BPA, and MOU",
        tag: "5.3",
        minutes: 18,
        goal: "Identify the purpose of each common agreement type, and describe how vendors are selected, assessed, and monitored.",
        why: "Third parties are a leading source of breaches, and the paperwork is how you hold them accountable. The exam uses short scenarios where only one agreement type fits, so you need to know each document's single main job.",
        simple:
          "When an organization depends on a vendor, a set of documents defines the relationship. An SLA (Service Level Agreement) states measurable service commitments such as uptime, response and resolution times, and the remedies (credits or penalties) if they are missed. An MSA (Master Services Agreement) sets the general legal terms for an ongoing relationship so each new project does not renegotiate them; individual projects are then defined in a SOW (Statement of Work), which lists the specific tasks, deliverables, timeline, and price, or in a work order or task order. An NDA (Non-Disclosure Agreement) legally obligates a party to keep shared information confidential. An MOU (Memorandum of Understanding) records the shared intentions of the parties and is generally non-binding, while an MOA (Memorandum of Agreement) is a more formal, binding statement of each party's responsibilities. A BPA (Business Partners Agreement) defines how partners work together, such as responsibilities, profit sharing, and exit terms. An ISA (Interconnection Security Agreement) specifies the technical and security requirements for connecting two organizations' networks. Strong contracts also include a RIGHT-TO-AUDIT clause (you may inspect the vendor's controls or request evidence), security and breach-notification requirements, data handling and return or destruction at termination, and liability terms. Before signing, perform due diligence: check financial health, reputation, references, conflicts of interest, and security posture using questionnaires, independent assessments such as SOC 2 reports or ISO 27001 certification, evidence of internal audits, and in some cases penetration test results. After signing, monitor continuously, because a vendor's risk changes over time: review performance against the SLA, reassess periodically, and plan for offboarding. For penetration tests, the RULES OF ENGAGEMENT document defines scope, allowed methods, timing, and contacts, so testing stays authorized and safe.",
        deepDive: [
          { h: "What each document is for", list: [
            "SLA: measurable service levels and consequences.",
            "MSA: the umbrella contract; common terms for repeated work.",
            "SOW: the specific deliverables, schedule, and cost for one engagement (a work order does a similar job for individual tasks).",
            "NDA: confidentiality obligations; may be one-way or mutual.",
            "MOU: intent to cooperate; usually not legally binding.",
            "MOA: formal agreement describing each party's responsibilities, with more weight than an MOU.",
            "BPA: partnership terms, including roles, profit and loss sharing, and termination.",
            "ISA: security requirements for connecting two systems or networks."
          ] },
          { h: "Vendor selection and due diligence", list: [
            "Evaluate financial stability, reputation, and references.",
            "Check for conflicts of interest.",
            "Send a security questionnaire and review independent evidence (SOC 2, ISO 27001, penetration test summaries).",
            "Analyze the vendor's own supply chain (fourth-party risk).",
            "Match the depth of review to the sensitivity of the data and the criticality of the service."
          ] },
          { h: "Vendor monitoring and offboarding", list: [
            "Track SLA metrics and incidents.",
            "Reassess at regular intervals and after significant events such as a breach or acquisition.",
            "Verify data return or certified destruction when the contract ends.",
            "Revoke vendor accounts and network connections promptly."
          ] },
          { h: "Rules of engagement", p: "For a penetration test or red team exercise, the rules of engagement define what is in scope, what techniques are allowed, when testing may occur, how sensitive findings are reported, and who to contact in an emergency. Without written authorization and clear rules, testing can be unsafe or even illegal." }
        ],
        keyTerms: [
          { term: "SLA", def: "Service Level Agreement: measurable service commitments and remedies." },
          { term: "MSA", def: "Master Services Agreement: umbrella terms for an ongoing relationship." },
          { term: "SOW", def: "Statement of Work: specific deliverables, schedule, and price for one engagement." },
          { term: "NDA", def: "Non-Disclosure Agreement: legally binding confidentiality." },
          { term: "MOU", def: "Memorandum of Understanding: a generally non-binding statement of shared intent." },
          { term: "MOA", def: "Memorandum of Agreement: a more formal statement of each party's responsibilities." },
          { term: "BPA", def: "Business Partners Agreement: defines how partners cooperate and share responsibilities and returns." },
          { term: "ISA", def: "Interconnection Security Agreement: security requirements for connecting networks." },
          { term: "Right to Audit", def: "Contract clause letting the customer inspect or obtain evidence of the vendor's controls." },
          { term: "Rules of Engagement", def: "Written scope and constraints for a penetration test." },
          { term: "Due Diligence", def: "Investigation of a vendor's capability, stability, and security before contracting." }
        ],
        analogy:
          "Hiring a contractor to renovate your home: the MSA is the general terms you both sign once. The SOW is the quote for this specific job (kitchen remodel, 6 weeks, this price). The SLA is the promise that they will respond within 24 hours to a leak. The NDA is the promise not to talk about your valuables. The MOU is a handshake of intent; the MOA is the signed agreement of who does what. The right-to-audit clause is your right to inspect the work.",
        technical:
          "A company hires a managed security provider. The MSA sets liability and confidentiality terms; the SOW defines 24/7 monitoring for 200 servers; the SLA requires critical alerts to be acknowledged within 15 minutes with service credits if missed; the contract includes breach notification within 24 hours, a right-to-audit clause, and data return on termination. Before signing, the company reviewed the provider's SOC 2 Type II report and sent a security questionnaire; afterward it reviews SLA reports monthly and re-assesses annually.",
        table: {
          headers: ["Document", "Main job", "Binding?"],
          rows: [
            ["SLA", "Measurable service levels and remedies", "Yes (part of contract)"],
            ["MSA", "Umbrella terms for ongoing work", "Yes"],
            ["SOW / work order", "Specific tasks, deliverables, timeline, price", "Yes"],
            ["NDA", "Keep shared information confidential", "Yes"],
            ["MOU", "Shared intent and understanding", "Generally no"],
            ["MOA", "Formal responsibilities of each party", "Yes, more formal than MOU"],
            ["BPA", "Partnership roles and profit sharing", "Yes"],
            ["ISA", "Security requirements for connecting networks", "Yes"]
          ]
        },
        confusion: [
          { a: "MSA", b: "SOW", diff: "The MSA is the umbrella with the general terms. The SOW defines the specific work, deliverables, and price for one project under it." },
          { a: "MOU", b: "MOA", diff: "An MOU states shared intent and is generally non-binding. An MOA is a more formal agreement that spells out each party's responsibilities." },
          { a: "SLA", b: "NDA", diff: "An SLA is about service quality and performance. An NDA is about keeping information confidential." },
          { a: "Vulnerability scan", b: "Right to audit", diff: "A scan is a technical test you run. A right-to-audit clause is the contractual permission to inspect a vendor's controls or demand evidence." },
          { a: "Third-party risk", b: "Fourth-party risk", diff: "Third-party risk comes from your vendors. Fourth-party risk comes from THEIR vendors and subcontractors." }
        ],
        soc: "Vendor risk becomes an incident when a supplier is breached or their access is misused. Responders rely on the contract: breach notification timelines, the contact list, and the right to audit determine how quickly they can get facts. Keeping vendor accounts, VPN connections, and API keys inventoried and time-limited is part of operational readiness.",
        patterns: [
          ["99.9% uptime with credits if missed", "SLA"],
          ["General terms for repeated projects", "MSA"],
          ["Deliverables, timeline, and price for one project", "SOW / work order"],
          ["Keep proprietary information confidential", "NDA"],
          ["Non-binding statement of mutual intent", "MOU"],
          ["Formal statement of each party's responsibilities", "MOA"],
          ["Partners share profits and responsibilities", "BPA"],
          ["Security requirements for connecting two networks", "ISA"],
          ["Customer may inspect the vendor's security controls", "Right-to-audit clause"],
          ["Defines the scope and permitted methods of a pen test", "Rules of engagement"]
        ],
        takeaways: [
          "Each agreement type has one main job; match the scenario to that job.",
          "Contracts need security terms: breach notification, right to audit, data return or destruction.",
          "Assess before you sign and keep monitoring after you sign."
        ],
        remember: [
          "SLA = measurable service levels. MSA = umbrella terms. SOW = the specific work. NDA = confidentiality.",
          "MOU = non-binding intent. MOA = formal responsibilities. BPA = partnership terms. ISA = secure network connection.",
          "Right-to-audit clause lets you inspect the vendor or demand evidence.",
          "Due diligence before contract: financial health, reputation, references, conflicts of interest, security evidence (SOC 2, ISO 27001).",
          "Monitor continuously; reassess periodically; plan for offboarding (data return or destruction, access removal).",
          "Rules of engagement define the scope of a penetration test; written authorization is essential.",
          "Fourth-party risk = your vendor's vendors."
        ],
        taglish:
          "Isipin mo ang kontratistang magre-renovate ng bahay mo. Ang MSA, pangkalahatang kasunduan na pirmado mo na. Ang SOW, ang detalye ng partikular na trabaho (gawain, oras, presyo). Ang SLA, ang pangako sa kalidad, halimbawa sasagot sila sa loob ng 24 oras. Ang NDA, pangakong hindi magkukuwento ng sikreto mo. Ang MOU, 'handshake' ng intensyon (karaniwang hindi binding), samantalang ang MOA, mas pormal na kasunduan sa responsibilidad. Ang right-to-audit, karapatan mong inspeksyunin ang vendor. At bago pumirma, mag-due diligence; pagkatapos pumirma, patuloy na mag-monitor."
      }
    ]
  },

  tips: {
    "d4-t121": "Ask 'who decides?': owner = DAC, system with labels = MAC, job function = RBAC, attributes and context = ABAC, same condition for everyone (like time of day) = rule-based. If two answers are RBAC and 'rule-based', check whether the question is about a person's job or a general condition.",
    "d4-t122": "OAuth answers 'what may this app do?' and OpenID Connect answers 'who is this user?'. If the scenario needs a login identity, pick OIDC or SAML; if it only needs delegated API access, pick OAuth.",
    "d4-t123": "Do not choose the highest CVSS automatically. The exam's best answer usually accounts for exposure, asset criticality, and active exploitation. 'Cannot patch' points to a compensating control or a documented exception, never to ignoring it.",
    "d4-t124": "Pair each protocol with its job and port: syslog = central logs (514), SNMP = device management (161 polls, 162 traps, use v3), NetFlow = metadata, NTP = time (123). When two systems disagree about the order of events, the answer is time synchronization.",
    "d4-t125": "If the question needs host isolation, process history, or behavior-based detection, answer EDR, not antivirus. If it spans email, network, identity, and endpoint, answer XDR. 'Only approved applications may run' is always allowlisting.",
    "d5-t112": "Let the data pick the law: EU residents' personal data = GDPR, patient information = HIPAA, card data = PCI DSS (a standard, not a law), public-company financial reporting = SOX, student records = FERPA, bank customer data = GLBA. 72 hours and 4 percent both point to GDPR.",
    "d5-t113": "One agreement, one job: SLA = performance, SOW = this project's work, MSA = the umbrella terms, NDA = secrecy, MOU = intent (non-binding), MOA = formal responsibilities, BPA = partnership, ISA = secure connection."
  },

  summaries: {
    "d4-t121": "Access control models differ by who decides: the owner (DAC), the system with labels (MAC), job roles (RBAC), attributes and context (ABAC), or fixed rules (rule-based), all guided by least privilege.",
    "d4-t122": "Single sign-on and federation let one trusted identity provider vouch for you; SAML and OpenID Connect handle authentication while OAuth handles delegated authorization.",
    "d4-t123": "Vulnerability management means choosing the right scan, reading CVSS with exposure and exploit likelihood in mind, spotting false positives and negatives, and fixing, mitigating, or formally accepting each finding.",
    "d4-t124": "Syslog, SNMP, NetFlow, and packet capture feed a SIEM that correlates events, but only synchronized clocks and tamper-resistant, off-host logs make that evidence trustworthy.",
    "d4-t125": "Antivirus blocks known malware, EDR watches behavior and lets you isolate hosts, XDR widens the view, and allowlisting and file integrity monitoring harden individual endpoints.",
    "d5-t112": "Each regulation follows a type of data: GDPR for EU personal data, HIPAA for health records, PCI DSS for payment cards, SOX for public-company reporting, plus privacy roles and breach-notification duties.",
    "d5-t113": "Vendor relationships are governed by documents with distinct jobs, SLA for performance, MSA for umbrella terms, SOW for the work, NDA for secrecy, plus due diligence before signing and monitoring afterward."
  },

  questions: [
    {
      id: "q-x-d4-5", domainId: "d4", tag: "d4-t121", type: "single",
      prompt: "A hospital grants access to patient charts based on each employee's job title, such as nurse or billing clerk. Which access control model is this?",
      choices: [
        { id: "a", text: "Role-based access control (RBAC)" },
        { id: "b", text: "Discretionary access control (DAC)" },
        { id: "c", text: "Mandatory access control (MAC)" },
        { id: "d", text: "Rule-based access control" }
      ],
      correct: "a",
      explanation: "RBAC assigns permissions to roles that match job functions, and users receive access through their role.",
      distractorExplanations: {
        b: "In DAC the owner of each resource decides who gets access, not the job title.",
        c: "MAC enforces labels and clearances set by the system, not job roles.",
        d: "Rule-based control applies fixed conditions such as time of day to everyone, regardless of role."
      }
    },
    {
      id: "q-x-d4-6", domainId: "d4", tag: "d4-t121", type: "single",
      prompt: "A policy allows access to a document only if the user is in the finance department, is using a company-managed device, and is connecting during business hours. Which model is MOST accurately described?",
      choices: [
        { id: "a", text: "Attribute-based access control (ABAC)" },
        { id: "b", text: "Mandatory access control (MAC)" },
        { id: "c", text: "Discretionary access control (DAC)" },
        { id: "d", text: "Role-based access control (RBAC)" }
      ],
      correct: "a",
      explanation: "ABAC evaluates multiple attributes (user department, device state, time) at the moment of the request.",
      distractorExplanations: {
        b: "MAC relies on classification labels and clearances, not a set of contextual attributes.",
        c: "DAC leaves the decision to the resource owner.",
        d: "RBAC alone considers the user's role, not device and time conditions."
      }
    },
    {
      id: "q-x-d4-7", domainId: "d4", tag: "d4-t122", type: "single",
      prompt: "A web app wants to read a user's calendar without ever receiving the user's password, and the user should be able to limit what the app can do. Which standard is designed for this?",
      choices: [
        { id: "a", text: "OAuth 2.0" },
        { id: "b", text: "SAML" },
        { id: "c", text: "LDAP" },
        { id: "d", text: "RADIUS" }
      ],
      correct: "a",
      explanation: "OAuth 2.0 is an authorization framework that grants an app limited, scoped access to resources through tokens, without sharing the password.",
      distractorExplanations: {
        b: "SAML passes authentication assertions for single sign-on rather than delegating scoped API access.",
        c: "LDAP is a directory access protocol and does not delegate access to third-party apps.",
        d: "RADIUS authenticates network access requests, such as for Wi-Fi or VPN."
      }
    },
    {
      id: "q-x-d4-8", domainId: "d4", tag: "d4-t122", type: "single",
      prompt: "A company wants employees to authenticate once at the corporate identity provider and then access several cloud applications using signed XML assertions. Which technology fits?",
      choices: [
        { id: "a", text: "SAML" },
        { id: "b", text: "Kerberos" },
        { id: "c", text: "TACACS+" },
        { id: "d", text: "SNMPv3" }
      ],
      correct: "a",
      explanation: "SAML exchanges signed XML assertions between an identity provider and service providers to enable browser-based single sign-on.",
      distractorExplanations: {
        b: "Kerberos uses tickets and is mainly for on-premises authentication, not signed XML assertions to cloud apps.",
        c: "TACACS+ authenticates and authorizes administrator access to network devices.",
        d: "SNMPv3 is for secure device management and monitoring."
      }
    },
    {
      id: "q-x-d4-9", domainId: "d4", tag: "d4-t123", type: "single",
      prompt: "A vulnerability scanner reports a critical flaw on a server, but a manual check shows the software was already patched. What is this result called?",
      choices: [
        { id: "a", text: "A false positive" },
        { id: "b", text: "A false negative" },
        { id: "c", text: "A true positive" },
        { id: "d", text: "A zero-day" }
      ],
      correct: "a",
      explanation: "A false positive is a finding the scanner reports that does not actually exist.",
      distractorExplanations: {
        b: "A false negative would be a real vulnerability the scanner failed to report.",
        c: "A true positive is a real, correctly reported vulnerability.",
        d: "A zero-day is an unknown or unpatched flaw with no available fix; the scenario describes a patched system."
      }
    },
    {
      id: "q-x-d4-10", domainId: "d4", tag: "d4-t123", type: "single",
      prompt: "A legacy server has a high-severity vulnerability, and the vendor will not release a patch. The server must stay online. What is the BEST next step?",
      choices: [
        { id: "a", text: "Apply compensating controls such as network isolation and monitoring, and document an approved exception" },
        { id: "b", text: "Ignore the finding because no patch exists" },
        { id: "c", text: "Disable the vulnerability scanner for that server" },
        { id: "d", text: "Lower the CVSS score in the report" }
      ],
      correct: "a",
      explanation: "When patching is not possible, reduce risk with compensating controls and formally document a time-limited exception approved by the risk owner.",
      distractorExplanations: {
        b: "Ignoring a known high-severity flaw leaves the risk unmanaged and undocumented.",
        c: "Hiding the system from the scanner removes visibility without reducing risk.",
        d: "Changing a score does not change the underlying vulnerability."
      }
    },
    {
      id: "q-x-d4-11", domainId: "d4", tag: "d4-t124", type: "single",
      prompt: "An investigator finds that events from the firewall and a domain controller appear several minutes apart for the same attack, making the timeline unreliable. Which control would MOST directly fix this?",
      choices: [
        { id: "a", text: "Synchronizing all systems with NTP" },
        { id: "b", text: "Enabling SNMPv3" },
        { id: "c", text: "Collecting NetFlow" },
        { id: "d", text: "Increasing log retention" }
      ],
      correct: "a",
      explanation: "NTP keeps system clocks synchronized so events from different sources can be correlated in the correct order.",
      distractorExplanations: {
        b: "SNMPv3 secures device management and does not synchronize time.",
        c: "NetFlow provides traffic metadata, not clock accuracy.",
        d: "Longer retention keeps logs longer but does not correct inconsistent timestamps."
      }
    },
    {
      id: "q-x-d4-12", domainId: "d4", tag: "d4-t124", type: "single",
      prompt: "A security team wants to detect large data transfers to unusual destinations while storing as little data as possible and not capturing payload content. Which data source is BEST?",
      choices: [
        { id: "a", text: "NetFlow" },
        { id: "b", text: "Full packet capture" },
        { id: "c", text: "Syslog debug messages" },
        { id: "d", text: "SNMP traps" }
      ],
      correct: "a",
      explanation: "NetFlow records metadata about connections (endpoints, ports, volume) without payloads, which is efficient for spotting exfiltration.",
      distractorExplanations: {
        b: "Full packet capture stores content and is expensive to retain.",
        c: "Debug-level syslog messages are verbose application and system details, not a transfer summary.",
        d: "SNMP traps report device events, not traffic volumes by destination."
      }
    },
    {
      id: "q-x-d4-13", domainId: "d4", tag: "d4-t125", type: "single",
      prompt: "An analyst needs to remotely isolate a compromised laptop from the network while keeping a connection to investigate and view the full process history. Which tool provides this?",
      choices: [
        { id: "a", text: "Endpoint detection and response (EDR)" },
        { id: "b", text: "Signature-based antivirus" },
        { id: "c", text: "A network load balancer" },
        { id: "d", text: "A file integrity monitor" }
      ],
      correct: "a",
      explanation: "EDR records endpoint activity and provides response actions such as host isolation and process termination.",
      distractorExplanations: {
        b: "Signature antivirus detects and quarantines known malicious files but lacks fleet-wide history and isolation features.",
        c: "A load balancer distributes traffic and does not manage endpoint security.",
        d: "FIM alerts on changes to files and does not isolate hosts."
      }
    },
    {
      id: "q-x-d4-14", domainId: "d4", tag: "d4-t125", type: "single",
      prompt: "A security team wants servers to run ONLY an approved list of programs, blocking everything else, including unknown malware. Which control is this?",
      choices: [
        { id: "a", text: "Application allowlisting" },
        { id: "b", text: "A blocklist of known-bad programs" },
        { id: "c", text: "Host-based IDS" },
        { id: "d", text: "Full-disk encryption" }
      ],
      correct: "a",
      explanation: "Allowlisting is default-deny: only approved applications may execute, which stops unknown malware.",
      distractorExplanations: {
        b: "A blocklist only stops items already known to be bad and lets new malware run.",
        c: "A HIDS detects and alerts but does not enforce an approved-program list.",
        d: "Disk encryption protects data at rest and does not control which programs execute."
      }
    },
    {
      id: "q-x-d5-5", domainId: "d5", tag: "d5-t112", type: "single",
      prompt: "A US-based online store suffers a breach exposing personal data of customers in the European Union. Within what time frame must it notify the supervisory authority under GDPR?",
      choices: [
        { id: "a", text: "72 hours of becoming aware of the breach" },
        { id: "b", text: "7 days" },
        { id: "c", text: "30 days" },
        { id: "d", text: "No notification is required for non-EU companies" }
      ],
      correct: "a",
      explanation: "GDPR requires notifying the supervisory authority within 72 hours of becoming aware of a reportable breach, and it applies based on whose data is affected, not where the company is located.",
      distractorExplanations: {
        b: "GDPR does not allow 7 days for authority notification.",
        c: "30 days is not the GDPR notification window.",
        d: "GDPR applies to any organization handling personal data of people in the EU."
      }
    },
    {
      id: "q-x-d5-6", domainId: "d5", tag: "d5-t112", type: "single",
      prompt: "A company stores and processes customers' credit card numbers. Which statement about its main compliance obligation is correct?",
      choices: [
        { id: "a", text: "PCI DSS applies; it is a contractual industry standard rather than a law" },
        { id: "b", text: "HIPAA applies because payments are sensitive" },
        { id: "c", text: "SOX applies to every business that accepts payments" },
        { id: "d", text: "FERPA applies to any customer financial information" }
      ],
      correct: "a",
      explanation: "PCI DSS governs organizations that store, process, or transmit payment card data and is enforced through contracts with card brands and banks.",
      distractorExplanations: {
        b: "HIPAA covers health information, not payment cards.",
        c: "SOX applies to publicly traded companies' financial reporting, not to all merchants.",
        d: "FERPA protects student education records."
      }
    },
    {
      id: "q-x-d5-7", domainId: "d5", tag: "d5-t113", type: "single",
      prompt: "A company contracts with an IT provider that promises 99.9 percent uptime and issues service credits when that target is missed. Which document defines this commitment?",
      choices: [
        { id: "a", text: "Service Level Agreement (SLA)" },
        { id: "b", text: "Non-Disclosure Agreement (NDA)" },
        { id: "c", text: "Memorandum of Understanding (MOU)" },
        { id: "d", text: "Interconnection Security Agreement (ISA)" }
      ],
      correct: "a",
      explanation: "An SLA states measurable service levels such as uptime and the remedies when they are not met.",
      distractorExplanations: {
        b: "An NDA protects confidential information and does not define service performance.",
        c: "An MOU generally records shared intent and is usually non-binding.",
        d: "An ISA defines security requirements for connecting networks."
      }
    },
    {
      id: "q-x-d5-8", domainId: "d5", tag: "d5-t113", type: "single",
      prompt: "A company has signed a master services agreement with a consulting firm. For a new engagement, it now needs a document listing the specific deliverables, schedule, and price. Which document should it use?",
      choices: [
        { id: "a", text: "Statement of Work (SOW)" },
        { id: "b", text: "Business Partners Agreement (BPA)" },
        { id: "c", text: "Service Level Agreement (SLA)" },
        { id: "d", text: "Memorandum of Agreement (MOA)" }
      ],
      correct: "a",
      explanation: "A SOW defines the specific work, deliverables, timeline, and cost for one engagement under the umbrella terms of the MSA.",
      distractorExplanations: {
        b: "A BPA defines a partnership, including roles and profit sharing, rather than project deliverables.",
        c: "An SLA defines ongoing service performance targets, not project deliverables and price.",
        d: "An MOA records formal responsibilities between parties but is not the project work definition."
      }
    }
  ],

  glossary: [
    { term: "RBAC", domain: "d4", plain: "Access based on a person's job role.", technical: "Role-Based Access Control: permissions are assigned to roles that correspond to job functions, and users gain access through role membership.", example: "All nurses can open charts on their ward." },
    { term: "ABAC", domain: "d4", plain: "Access decided by many facts about the user, resource, and situation.", technical: "Attribute-Based Access Control: a policy engine evaluates attributes of the subject, resource, and environment per request.", example: "Allow only finance staff on managed devices during business hours." },
    { term: "SAML", domain: "d4", plain: "A standard for logging in once to many web apps.", technical: "Security Assertion Markup Language: an XML standard exchanging signed authentication assertions between an identity provider and service providers.", example: "Clicking an HR app and being signed in by the company login." },
    { term: "OAuth 2.0", domain: "d4", plain: "Lets an app get limited access to your data without your password.", technical: "An authorization framework that issues scoped access tokens to client applications on behalf of a resource owner.", example: "Allowing a scheduling app to read your calendar." },
    { term: "OpenID Connect", domain: "d4", plain: "A way to prove who you are using an existing account.", technical: "An authentication layer on OAuth 2.0 that returns an ID token (JWT) describing the authenticated user.", example: "Sign in with a social account." },
    { term: "EPSS", domain: "d4", plain: "A score for how likely a flaw is to be exploited.", technical: "Exploit Prediction Scoring System: estimates the probability that a vulnerability will be exploited in the wild.", example: "A 0.92 EPSS score on a newly published flaw." },
    { term: "False Positive", domain: "d4", plain: "An alert or finding that is not real.", technical: "A result indicating a vulnerability or threat that does not actually exist.", example: "A scanner flagging a patched service." },
    { term: "NetFlow", domain: "d4", plain: "A summary of who talked to whom on the network and how much.", technical: "Network traffic metadata (addresses, ports, protocol, byte counts, duration) without payload content.", example: "Spotting 8 GB leaving to a rare address." },
    { term: "EDR", domain: "d4", plain: "Security software that watches endpoint behavior and lets you respond.", technical: "Endpoint Detection and Response: continuous endpoint telemetry, behavioral detection, and response actions such as isolation.", example: "Isolating an infected laptop with one click." },
    { term: "Application Allowlisting", domain: "d4", plain: "Only approved programs are allowed to run.", technical: "A default-deny control that permits execution of explicitly approved applications only.", example: "A server that runs only its approved software." },
    { term: "GDPR", domain: "d5", plain: "The EU law protecting people's personal data.", technical: "General Data Protection Regulation: governs processing of personal data of individuals in the EU, with data subject rights, 72-hour breach notification, and fines up to 4% of global turnover.", example: "A user requesting erasure of their account data." },
    { term: "HIPAA", domain: "d5", plain: "US rules protecting patient health information.", technical: "Health Insurance Portability and Accountability Act: Privacy, Security, and Breach Notification Rules for PHI.", example: "A clinic encrypting patient records." },
    { term: "PCI DSS", domain: "d5", plain: "Security rules for handling payment card data.", technical: "Payment Card Industry Data Security Standard: a contractual standard for protecting cardholder data.", example: "Segmenting the network that processes card payments." },
    { term: "SOX", domain: "d5", plain: "A US law about honest financial reporting by public companies.", technical: "Sarbanes-Oxley Act: requires accurate financial reporting and internal controls, including IT controls over financial systems.", example: "Audit trails on the general ledger system." },
    { term: "Data Controller", domain: "d5", plain: "The organization that decides how and why personal data is used.", technical: "Under GDPR, the entity determining the purposes and means of processing personal data.", example: "A retailer deciding to use customer emails for marketing." },
    { term: "Data Processor", domain: "d5", plain: "A company that handles personal data on someone else's behalf.", technical: "Under GDPR, an entity processing personal data on the instructions of a controller.", example: "A payroll service provider." },
    { term: "Statement of Work (SOW)", domain: "d5", plain: "A document describing exactly what work will be done.", technical: "A contract document defining specific tasks, deliverables, timeline, and price for an engagement.", example: "A 6-week network assessment with a final report." },
    { term: "Right to Audit", domain: "d5", plain: "A contract clause letting you inspect the vendor's security.", technical: "A provision allowing the customer to audit or obtain evidence of a vendor's controls and compliance.", example: "Requesting the vendor's latest assessment and logs." }
  ],

  acronyms: [
    { acro: "SAML", expansion: "Security Assertion Markup Language", meaning: "An XML standard for exchanging authentication assertions to enable single sign-on." },
    { acro: "OIDC", expansion: "OpenID Connect", meaning: "An authentication layer on OAuth 2.0 that provides an ID token." },
    { acro: "JWT", expansion: "JSON Web Token", meaning: "A compact signed token format used to carry claims." },
    { acro: "ABAC", expansion: "Attribute-Based Access Control", meaning: "Access decisions based on attributes of the user, resource, and environment." },
    { acro: "DAC", expansion: "Discretionary Access Control", meaning: "The resource owner decides who has access." },
    { acro: "MAC", expansion: "Mandatory Access Control (also: Media Access Control)", meaning: "System-enforced access using labels and clearances. In networking, MAC means the hardware address of a network interface." },
    { acro: "EPSS", expansion: "Exploit Prediction Scoring System", meaning: "A probability score for whether a vulnerability will be exploited." },
    { acro: "KEV", expansion: "Known Exploited Vulnerabilities", meaning: "CISA's catalog of vulnerabilities confirmed to be exploited in the wild." },
    { acro: "SAST", expansion: "Static Application Security Testing", meaning: "Analyzing source code for flaws without running it." },
    { acro: "DAST", expansion: "Dynamic Application Security Testing", meaning: "Testing a running application for vulnerabilities." },
    { acro: "SCA", expansion: "Software Composition Analysis", meaning: "Identifying vulnerabilities in third-party and open-source components." },
    { acro: "XDR", expansion: "Extended Detection and Response", meaning: "Correlated detection and response across endpoint, email, network, identity, and cloud." },
    { acro: "MDR", expansion: "Managed Detection and Response", meaning: "An outsourced service that monitors and responds to threats for you." },
    { acro: "FIM", expansion: "File Integrity Monitoring", meaning: "Alerting when critical files change from a trusted baseline." },
    { acro: "IPFIX", expansion: "IP Flow Information Export", meaning: "A standard for exporting network flow metadata, similar to NetFlow." },
    { acro: "NTP", expansion: "Network Time Protocol", meaning: "A protocol that synchronizes clocks across systems (UDP 123)." },
    { acro: "GDPR", expansion: "General Data Protection Regulation", meaning: "The EU privacy regulation protecting personal data." },
    { acro: "HIPAA", expansion: "Health Insurance Portability and Accountability Act", meaning: "US law protecting health information." },
    { acro: "PCI DSS", expansion: "Payment Card Industry Data Security Standard", meaning: "A contractual standard for protecting payment card data." },
    { acro: "SOX", expansion: "Sarbanes-Oxley Act", meaning: "US law on financial reporting integrity for public companies." },
    { acro: "GLBA", expansion: "Gramm-Leach-Bliley Act", meaning: "US law requiring financial institutions to protect customer information." },
    { acro: "FERPA", expansion: "Family Educational Rights and Privacy Act", meaning: "US law protecting student education records." },
    { acro: "COPPA", expansion: "Children's Online Privacy Protection Act", meaning: "US law restricting data collection from children under 13." },
    { acro: "CCPA", expansion: "California Consumer Privacy Act", meaning: "California law giving residents rights over their personal data." },
    { acro: "FISMA", expansion: "Federal Information Security Modernization Act", meaning: "US law governing information security for federal agencies." },
    { acro: "DPO", expansion: "Data Protection Officer", meaning: "An independent privacy advisor required by GDPR in certain cases." },
    { acro: "DPIA", expansion: "Data Protection Impact Assessment", meaning: "An assessment of privacy risk for high-risk data processing." },
    { acro: "SOW", expansion: "Statement of Work", meaning: "A document defining specific deliverables, schedule, and price for an engagement." },
    { acro: "MSA", expansion: "Master Services Agreement", meaning: "Umbrella contract terms for an ongoing relationship." },
    { acro: "BPA", expansion: "Business Partners Agreement", meaning: "An agreement defining how business partners cooperate and share responsibilities." },
    { acro: "ISA", expansion: "Interconnection Security Agreement", meaning: "Security requirements for connecting two organizations' systems." },
    { acro: "MOA", expansion: "Memorandum of Agreement", meaning: "A formal agreement describing each party's responsibilities." },
    { acro: "PAM", expansion: "Privileged Access Management", meaning: "Controls and monitoring for privileged accounts, such as vaulting and just-in-time access." },
    { acro: "JIT", expansion: "Just-In-Time", meaning: "Granting elevated access only when needed and for a limited time." },
    { acro: "SCIM", expansion: "System for Cross-domain Identity Management", meaning: "A standard for automating user provisioning across systems." }
  ]
});
