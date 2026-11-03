/* Gap-closing lessons, round 4, part B (Domains 3-5). Written against the
   Exam Blueprint checker (data-objectives.js). Ids use the t18x range.
   Registers a bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d3: [
      {
        id: "d3-t180",
        title: "Data Types and Classification Schemes: Regulated, Trade Secret, Legal, Financial, and Beyond",
        tag: "3.3",
        minutes: 20,
        goal: "Identify each data type named in the exam, assign classification levels, and match handling rules to the classification.",
        why: "Protecting data starts with knowing what it is. The exam lists data types and classification labels and asks which applies to a scenario and what protections follow.",
        simple:
          "Different data deserves different protection, so organizations first identify its TYPE and then its CLASSIFICATION. Common data types are: REGULATED data, which a law or standard controls (personal data, health records, payment card data); TRADE SECRETS, valuable confidential business information that gives a competitive edge, such as a formula or process, protected by confidentiality and secrecy measures; INTELLECTUAL PROPERTY (IP), creations of the mind such as patents, copyrights, trademarks, designs, and source code; LEGAL INFORMATION, such as contracts, litigation files, and attorney-client privileged communications, which is often subject to privilege and to legal holds; and FINANCIAL INFORMATION, such as account records, payroll, tax data, and financial statements, which fraud and regulation make sensitive. Data can also be HUMAN-READABLE (documents, email, images people can view directly) or NON-HUMAN-READABLE (binary files, database blobs, encrypted data, machine-generated telemetry) that needs software to interpret; the form affects how it is searched, scanned by data loss prevention tools, and controlled. A CLASSIFICATION SCHEME labels data by sensitivity so that handling rules can follow the label. Commercial schemes commonly use PUBLIC (safe to share), PRIVATE or INTERNAL (for the organization), SENSITIVE, CONFIDENTIAL (harm if disclosed), RESTRICTED (tightly limited, need-to-know), and CRITICAL (essential to operations or safety). Governments use schemes such as unclassified, controlled unclassified information, confidential, secret, and top secret. Data owners decide the classification; custodians apply controls. Labels drive rules: more sensitive data requires stronger access control, encryption at rest and in transit, restricted sharing, monitoring, logging, and secure disposal, while public data needs integrity and availability controls but little confidentiality control. Data should be inventoried and classified at creation, labeled so people and tools can recognize it, protected through its states (at rest, in transit, in use), and reclassified or declassified as its sensitivity changes.",
        deepDive: [
          { h: "Data types and what makes them sensitive", list: [
            "Regulated: personal data (PII), health information (PHI), payment card data (PCI), education records. Mishandling brings fines and breach notification duties.",
            "Trade secret: protected by keeping it secret; if it leaks, protection may be lost. Controls include NDAs, need-to-know, and monitoring.",
            "Intellectual property: patents, copyrights, trademarks, source code, designs. Protect against theft and unauthorized copying.",
            "Legal information: contracts, case files, privileged communications. Subject to confidentiality and legal hold.",
            "Financial information: bank details, payroll, forecasts, and financial reports. Targeted for fraud and regulated by financial laws."
          ] },
          { h: "Human-readable versus non-human-readable", list: [
            "Human-readable: documents, emails, spreadsheets, images. Easy for DLP and reviewers to inspect.",
            "Non-human-readable: binary files, compressed or encrypted data, database contents, logs and machine data. Need tools to interpret; may hide sensitive content from simple scanners.",
            "Metadata and encryption can make classification and detection harder, so labels and inventories are important."
          ] },
          { h: "Classification levels and handling", list: [
            "Public: no confidentiality requirement; protect integrity and availability.",
            "Private/Internal: for internal use; basic access control.",
            "Sensitive/Confidential: restricted to authorized groups; encryption and logging.",
            "Restricted: the most sensitive; strict need-to-know, strong encryption, tight sharing rules, and auditing.",
            "Critical: essential to operations or safety; emphasis on integrity, availability, and resilience."
          ] },
          { h: "Putting classification to work", list: [
            "Inventory data and map where it lives (databases, endpoints, cloud, backups).",
            "Assign an owner who classifies and approves access.",
            "Label files, systems, and records so tools can enforce rules (DLP, access control, encryption).",
            "Apply controls according to the label and the data state.",
            "Review and reclassify as value and regulation change; dispose of data securely at end of life."
          ] }
        ],
        keyTerms: [
          { term: "Regulated Data", def: "Data whose handling is controlled by law or standard, such as PII, PHI, and cardholder data." },
          { term: "Trade Secret", def: "Confidential business information that provides competitive advantage and is protected by secrecy." },
          { term: "Intellectual Property", def: "Creations of the mind such as patents, copyrights, trademarks, and source code." },
          { term: "Legal Information", def: "Data such as contracts, litigation records, and privileged communications." },
          { term: "Financial Information", def: "Data about money and accounts, such as payroll, banking, and financial statements." },
          { term: "Human-Readable Data", def: "Data directly understandable by people, such as documents and images." },
          { term: "Non-Human-Readable Data", def: "Data requiring software to interpret, such as binary or encrypted data." },
          { term: "Data Classification", def: "Labeling data by sensitivity to determine required protection." },
          { term: "Data Owner", def: "The person accountable for a data set who assigns its classification." },
          { term: "Declassification", def: "Lowering or removing a classification when sensitivity decreases." }
        ],
        analogy:
          "Classification is like sorting mail at a company mailroom. Public brochures go in the open bin. Internal memos go in a staff-only tray. Confidential contracts go in a locked cabinet. The CEO's merger documents go in the safe, and only a short list of named people can open it. The label on the envelope tells the mailroom staff exactly what to do without reading the contents.",
        technical:
          "A software company classifies its data. The public website content is Public. Employee payroll is Confidential and regulated. Source code and the secret recipe-like algorithm behind its product are Restricted intellectual property and trade secrets, stored in a repository with strict access control and logging. Litigation documents are legal information held under a legal hold. A DLP tool uses labels and patterns to block uploads of Restricted files to personal email, and a scan finds that a compressed, encrypted archive of customer data moved to a cloud folder, a reminder that non-human-readable data needs labels and monitoring too.",
        table: {
          headers: ["Data type", "Example", "Typical concern"],
          rows: [
            ["Regulated", "Patient records, cardholder data", "Legal compliance and breach notification"],
            ["Trade secret", "Proprietary formula or algorithm", "Loss of competitive advantage"],
            ["Intellectual property", "Patents, source code, designs", "Theft and unauthorized copying"],
            ["Legal information", "Contracts, privileged emails, case files", "Privilege and legal hold"],
            ["Financial information", "Payroll, bank accounts, forecasts", "Fraud and financial regulation"],
            ["Human-readable", "Documents, email", "Easy to inspect and leak"],
            ["Non-human-readable", "Binary, encrypted, database files", "Harder to scan, needs labeling"]
          ]
        },
        confusion: [
          { a: "Trade secret", b: "Intellectual property", diff: "A trade secret is protected by keeping it confidential. Other IP, such as patents and copyrights, is protected by law through registration or ownership and is often public." },
          { a: "Regulated data", b: "Sensitive data", diff: "Regulated data is controlled by law or standard. Sensitive is a classification label an organization applies by its own scheme; regulated data is usually also sensitive." },
          { a: "Confidential", b: "Restricted", diff: "Both limit access, but restricted is typically the stricter level with the tightest need-to-know and strongest controls." },
          { a: "Human-readable", b: "Non-human-readable", diff: "Human-readable data can be viewed directly. Non-human-readable data needs software to interpret and can hide sensitive content from simple scanning." },
          { a: "Data owner", b: "Data custodian", diff: "The owner decides classification and access. The custodian implements and operates the controls." }
        ],
        soc: "Classification gives analysts priority: an alert involving a Restricted data store is escalated faster than one involving public marketing files. DLP, access logs, and encryption policies all key off labels, and an unlabeled data store is a blind spot worth fixing.",
        patterns: [
          ["Patient or cardholder data governed by law", "Regulated data"],
          ["Secret formula that gives a competitive edge", "Trade secret"],
          ["Patents, copyrights, and source code", "Intellectual property"],
          ["Attorney-client privileged emails and case files", "Legal information"],
          ["Payroll and bank account records", "Financial information"],
          ["Highest level, strict need-to-know", "Restricted classification"],
          ["Safe to share publicly", "Public classification"],
          ["Encrypted archive that DLP cannot read", "Non-human-readable data; label and monitor it"]
        ],
        takeaways: [
          "Identify the data type, then apply a classification label, then apply controls that match the label.",
          "Owners classify; custodians implement.",
          "Labels let tools such as DLP and access control enforce rules automatically."
        ],
        remember: [
          "Types: regulated, trade secret, intellectual property, legal information, financial information; human-readable vs non-human-readable.",
          "Commercial labels: public, private, sensitive, confidential, restricted, critical.",
          "Government labels: unclassified, CUI, confidential, secret, top secret.",
          "Trade secrets stay protected by secrecy; leaks can end the protection.",
          "Stronger classification means stronger access control, encryption, logging, and disposal.",
          "The data owner assigns the classification; the custodian applies controls.",
          "Reclassify or declassify as sensitivity changes."
        ],
        taglish:
          "Kilalanin muna ang uri ng data: regulated (kontrolado ng batas), trade secret (lihim na nagbibigay ng kalamangan), intellectual property (patent, source code), legal information (kontrata, kaso, privileged), at financial information (payroll, bank). Pagkatapos, lagyan ng label: public, private, sensitive, confidential, restricted, critical. Mas mataas ang label, mas mahigpit ang proteksyon (encryption, logging, need-to-know). Ang may-ari ang nagtatakda ng class; ang custodian ang nagpapatupad ng controls. Ang non-human-readable na data (hal. encrypted file) ay mahirap i-scan, kaya kailangan ng label at monitoring."
      }
    ],

    d4: [
      {
        id: "d4-t180",
        title: "Identity Lifecycle Details: Proofing, Provisioning, Attestation, and Temporary and Ephemeral Access",
        tag: "4.6",
        minutes: 22,
        goal: "Explain how identities are proofed, provisioned, reviewed, and retired, and how temporary accounts and ephemeral credentials reduce risk.",
        why: "Most breaches involve an identity that should not have existed, had too much access, or was never removed. The exam covers the full lifecycle, including terms like identity proofing, attestation, interoperability, temporal accounts, and ephemeral credentials.",
        simple:
          "Identity and access management covers the whole life of an identity. It starts with IDENTITY PROOFING: confirming that a person is who they claim to be before an account or credential is issued, using documents, knowledge checks, in-person or remote verification, and sometimes biometrics. Stronger assurance is used for higher-risk access (NIST describes identity assurance levels from self-asserted claims up to in-person verification). PROVISIONING creates the account and grants permissions, ideally automatically from a trusted source such as the HR system, following the joiner-mover-leaver pattern: joiners receive access for their role, movers have access adjusted when they change jobs, and leavers are DE-PROVISIONED promptly. Delays create ORPHANED accounts and PRIVILEGE CREEP, in which people accumulate permissions they no longer need. PERMISSION ASSIGNMENT has implications: assign by role or group rather than individually, grant least privilege, and recognize that nested groups, default access, and inherited permissions can grant more than intended. ATTESTATION (access recertification) is the periodic confirmation, by managers and resource owners, that each person's access is still appropriate; it catches excess access and is a common audit requirement. Systems built by different vendors must work together, so INTEROPERABILITY relies on standards such as SAML, OAuth, OpenID Connect, LDAP, and SCIM, with attention to attribute mapping and trust relationships when identities are federated across organizations. Some access should not be permanent. TEMPORAL (temporary) ACCOUNTS exist for a limited time, for example for a contractor or a guest, and should have an expiration date that automatically disables them. JUST-IN-TIME (JIT) access grants elevated privileges only when needed and for a short period. EPHEMERAL CREDENTIALS are short-lived tokens or certificates issued per task or session, such as cloud tokens that expire in an hour, so a stolen credential quickly becomes useless. PASSWORD VAULTING stores privileged credentials securely and rotates them, and privileged access management records sessions. Time-of-day restrictions limit when access is allowed. Different account types need different controls: standard users, privileged administrators, service accounts, guest accounts, and shared accounts (which should be avoided because they destroy accountability).",
        deepDive: [
          { h: "Joiner, mover, leaver", list: [
            "Joiner: create the account from an authoritative source with role-based access and required training.",
            "Mover: remove old access when a person changes roles, instead of only adding new access.",
            "Leaver: disable promptly (ideally at the moment of departure), then archive and later delete; recover devices and revoke tokens, certificates, and keys.",
            "Automation from HR events reduces delays and mistakes."
          ] },
          { h: "Identity proofing in practice", list: [
            "Verify government ID documents, compare with records, or use trusted third-party checks.",
            "Remote proofing may use live video and document verification; in-person proofing gives higher assurance.",
            "Higher-risk access (administrators, financial approvers) deserves stronger proofing.",
            "Proofing differs from authentication: proofing establishes who someone is once; authentication confirms it each time."
          ] },
          { h: "Attestation and access reviews", list: [
            "Managers and owners certify that each user's access is still required.",
            "Run reviews at least annually, and more often for privileged access.",
            "Remove access not re-approved; record decisions for auditors.",
            "Also applies to service accounts and third-party access."
          ] },
          { h: "Temporary and ephemeral access", list: [
            "Temporal accounts: fixed lifetime with automatic expiry, for contractors, interns, and guests.",
            "Just-in-time elevation: privileges granted on request, for a limited duration, with approval and logging.",
            "Ephemeral credentials: short-lived tokens or certificates minted for a session or job; reduce the value of theft.",
            "Password vaulting: check-out and rotation of privileged passwords, with session recording."
          ] },
          { h: "Interoperability considerations", list: [
            "Use open standards (SAML, OAuth, OIDC, LDAP, SCIM) so systems from different vendors integrate.",
            "Map attributes and roles consistently across systems.",
            "Establish and monitor trust between identity providers and service providers.",
            "Plan for provisioning and de-provisioning across all connected applications, not only the main directory."
          ] },
          { h: "Account types to manage", list: [
            "Standard user accounts: least privilege.",
            "Privileged accounts: separate from daily accounts, vaulted, monitored.",
            "Service accounts: long random secrets in a vault, narrow permissions, no interactive login.",
            "Guest accounts: restricted and time-limited.",
            "Shared or generic accounts: avoid; they prevent accountability."
          ] }
        ],
        keyTerms: [
          { term: "Identity Proofing", def: "Verifying that a person is who they claim to be before issuing an identity or credential." },
          { term: "Provisioning / De-provisioning", def: "Creating accounts and permissions, and removing them when no longer needed." },
          { term: "Joiner-Mover-Leaver", def: "The lifecycle of an identity as a person joins, changes roles, and leaves." },
          { term: "Attestation (Access Recertification)", def: "Periodic confirmation by managers or owners that access is still appropriate." },
          { term: "Privilege Creep", def: "Accumulation of access rights beyond what a person currently needs." },
          { term: "Orphaned Account", def: "An account with no active owner, often left from a departed user." },
          { term: "Temporal Account", def: "A temporary account with an automatic expiration." },
          { term: "Ephemeral Credential", def: "A short-lived credential issued for a session or task." },
          { term: "Just-in-Time Access", def: "Granting elevated privileges only when needed and for a limited time." },
          { term: "Interoperability", def: "The ability of different systems to work together, usually through standards." }
        ],
        analogy:
          "An identity lifecycle is like issuing a hotel keycard. Identity proofing is checking your ID at the front desk. Provisioning is programming the card for your room only. Attestation is the manager periodically confirming you still need the room. A temporal account is a card that stops working at checkout time. An ephemeral credential is a one-time code that expires in minutes. Leaving without handing in the card, and having it still open your room next month, is an orphaned account.",
        technical:
          "A company links its HR system to its identity platform. When a contractor is hired, identity proofing is performed with a government ID check, an account is created with the contractor role and a 90-day expiry, and access to one project is granted automatically. Quarterly attestation emails ask the project owner to confirm the access. When an employee moves from finance to marketing, the finance permissions are removed, not just supplemented. Administrators use just-in-time elevation through a vault, receiving a four-hour credential that is revoked when the task ends, and cloud workloads use one-hour tokens instead of stored keys.",
        table: {
          headers: ["Concept", "Purpose", "Example"],
          rows: [
            ["Identity proofing", "Confirm real-world identity before issuing credentials", "ID document check"],
            ["Provisioning", "Create accounts and grant access", "HR-triggered account creation"],
            ["De-provisioning", "Remove access when no longer needed", "Disable account at departure"],
            ["Attestation", "Confirm access is still appropriate", "Quarterly manager review"],
            ["Temporal account", "Time-limited access", "Contractor account with expiry date"],
            ["Just-in-time access", "Elevate only when needed", "Four-hour admin rights"],
            ["Ephemeral credential", "Make stolen credentials short-lived", "Token valid for one hour"],
            ["Interoperability standards", "Let systems from different vendors integrate", "SAML, OAuth, OIDC, LDAP, SCIM"]
          ]
        },
        confusion: [
          { a: "Identity proofing", b: "Authentication", diff: "Proofing establishes who a person is when the identity is created. Authentication confirms that identity each time they access something." },
          { a: "Provisioning", b: "Attestation", diff: "Provisioning grants access. Attestation periodically re-confirms that the access is still justified." },
          { a: "Temporal account", b: "Ephemeral credential", diff: "A temporal account is a whole account that expires. An ephemeral credential is a short-lived token or certificate used within an account or workload." },
          { a: "Privilege creep", b: "Orphaned account", diff: "Privilege creep is a current user accumulating too much access. An orphaned account has no valid owner." },
          { a: "Mover", b: "Joiner", diff: "A joiner gets new access. A mover must have old access removed as well as new access added." }
        ],
        soc: "Identity hygiene issues become incidents: active accounts of former employees, service accounts with interactive logins, privileged accounts used for email, and tokens that live for months. Analysts monitor for dormant accounts suddenly used, logins by contractors after contract end, and creation of new privileged accounts.",
        patterns: [
          ["Verify a new hire's government ID before issuing credentials", "Identity proofing"],
          ["Disable the account when the employee resigns", "De-provisioning"],
          ["Employee moves departments and keeps all old access", "Privilege creep; remove old access at the move"],
          ["Managers confirm each person's access every quarter", "Attestation / access recertification"],
          ["Contractor account that disables itself after 90 days", "Temporal account"],
          ["Cloud token that expires after one hour", "Ephemeral credential"],
          ["Admin rights granted only for the duration of a task", "Just-in-time access"],
          ["Different vendors' systems exchanging identity data", "Interoperability through standards (SAML, OIDC, SCIM)"]
        ],
        takeaways: [
          "Manage identities from proofing to removal, and automate from an authoritative source.",
          "Review access regularly and remove what is not needed.",
          "Make high-risk access temporary and credentials short-lived."
        ],
        remember: [
          "Identity proofing: verify the person before issuing an identity.",
          "Provision and de-provision promptly; use joiner-mover-leaver.",
          "Attestation (access recertification) catches privilege creep.",
          "Temporal accounts expire automatically; ephemeral credentials are short-lived.",
          "Just-in-time access and password vaulting protect privileged accounts.",
          "Interoperability depends on standards: SAML, OAuth, OIDC, LDAP, SCIM.",
          "Avoid shared accounts; secure service accounts."
        ],
        taglish:
          "Ang identity lifecycle: identity proofing (i-verify kung sino talaga ang tao bago bigyan ng account), provisioning (pagbibigay ng access), at de-provisioning (pag-alis ng access kapag umalis o lumipat). Ang attestation, regular na pagkumpirma ng manager na kailangan pa ang access. Ang temporal account, may petsa ng pag-expire. Ang ephemeral credential, maikli ang buhay (hal. token na isang oras lang). Ang just-in-time access, binibigay lang ang admin rights kapag kailangan at sandali lang. At ang interoperability, gumagamit ng standards (SAML, OIDC, SCIM) para magkasundo ang iba't ibang sistema."
      },
      {
        id: "d4-t181",
        title: "Asset Management Lifecycle: Procurement, Ownership, Tracking, Enumeration, and Decommissioning",
        tag: "4.2",
        minutes: 22,
        goal: "Describe how security is applied at each stage of the hardware, software, and data asset lifecycle, from acquisition to certified disposal.",
        why: "You cannot protect what you do not know you have. Objective 4.2 follows an asset from purchase to retirement, and the exam asks which step addresses which risk.",
        simple:
          "Asset management tracks every hardware, software, and data asset through its life. ACQUISITION or PROCUREMENT is where security begins: requirements for security features and support duration are written into purchases, vendors are assessed, and the supply chain is considered so that counterfeit or tampered products are avoided; new devices are checked on arrival and configured to a secure baseline before use. ASSIGNMENT and ACCOUNTING ties each asset to an OWNER responsible for it, records its CLASSIFICATION and criticality, and enters it in an inventory or configuration management database (CMDB) with details such as location, function, and support dates. MONITORING and ASSET TRACKING keep that inventory accurate: ENUMERATION is the process of discovering what is actually present on the network, using scans, agents, network access control, and cloud tooling, so that unknown or shadow devices and rogue software are found; software inventory tracks versions, licenses, and unapproved applications, and a data inventory shows where sensitive data lives. Assets are maintained through patching, configuration management, and monitoring, and their support end dates are tracked so replacement is planned. At the end of life, DISPOSAL or DECOMMISSIONING must be done securely. First check requirements: legal holds and retention rules may require data to be kept. Then SANITIZE storage so data cannot be recovered: NIST SP 800-88 describes clear (logical overwrite), purge (techniques such as cryptographic erase or degaussing that make recovery infeasible even with lab techniques), and destroy (physical destruction such as shredding or incineration). Methods are chosen by the sensitivity of the data and the media type. DESTRUCTION may be done by the organization or a vendor, and a CERTIFICATE of destruction or sanitization provides CERTIFICATION and evidence for auditors. Finally, update the inventory, remove the asset from monitoring and network records, disable its accounts, certificates, and licenses, and handle remaining data according to the data retention policy. Failing at any step leaves risk: unknown assets are unpatched, unowned assets are unmanaged, and improperly disposed media leak data.",
        deepDive: [
          { h: "Procurement and onboarding", list: [
            "Set security requirements in purchasing (patch support length, encryption, secure boot).",
            "Prefer approved vendors; verify authenticity and integrity of hardware and software.",
            "Inspect packaging for tampering and verify hashes of downloaded software.",
            "Apply the secure baseline and change default credentials before deployment.",
            "Record the asset immediately in the inventory."
          ] },
          { h: "Ownership, classification, and the inventory", list: [
            "Every asset has an owner and a custodian.",
            "Record classification and business criticality to prioritize protection.",
            "A CMDB links assets to services, owners, and dependencies.",
            "Keep fields current: location, function, version, support dates, assigned user."
          ] },
          { h: "Enumeration and tracking", list: [
            "Enumerate with network discovery scans, agents, NAC, DHCP and DNS records, and cloud APIs.",
            "Compare discovered assets with the inventory to find rogue devices and shadow IT.",
            "Track software versions and licenses, including unapproved applications.",
            "Maintain a data inventory of where sensitive data resides.",
            "Tag and track mobile and portable devices (including lost and stolen reporting)."
          ] },
          { h: "Disposal and decommissioning", list: [
            "Confirm retention requirements and legal holds before destruction.",
            "Sanitize or destroy storage: clear (overwrite), purge (cryptographic erase, degauss), destroy (shred, incinerate, disintegrate).",
            "Use verification and obtain a certificate of destruction from vendors.",
            "Remove accounts, certificates, licenses, DNS and DHCP entries, and monitoring agents.",
            "Update the inventory to show the asset as retired, with the date and method."
          ] },
          { h: "Matching method to media", list: [
            "Magnetic hard drives: overwrite, degauss, or shred.",
            "Solid-state drives: cryptographic erase or physical destruction (degaussing does not work).",
            "Optical media and paper: shredding or pulping.",
            "Mobile devices: factory reset plus encryption, then destruction if highly sensitive.",
            "Cloud data: delete with provider tools, revoke keys (crypto-shredding), and verify with the provider's attestations."
          ] }
        ],
        keyTerms: [
          { term: "Asset Inventory", def: "A record of an organization's hardware, software, and data assets." },
          { term: "CMDB", def: "Configuration Management Database: stores assets and their relationships." },
          { term: "Enumeration", def: "Discovering what assets and services actually exist on a network." },
          { term: "Asset Owner", def: "The person accountable for an asset and its protection." },
          { term: "Sanitization", def: "Removing data from media so it cannot be recovered." },
          { term: "Clear / Purge / Destroy", def: "NIST sanitization levels: logical overwrite, techniques making recovery infeasible, and physical destruction." },
          { term: "Degaussing", def: "Using a strong magnetic field to erase magnetic media." },
          { term: "Cryptographic Erase", def: "Destroying encryption keys so encrypted data becomes unrecoverable." },
          { term: "Certificate of Destruction", def: "A document proving that media was destroyed by a stated method." },
          { term: "Decommissioning", def: "Formally retiring an asset and removing it from service and records." }
        ],
        analogy:
          "Asset management is a library's record of every book. Buying a book from a trusted publisher is procurement. The catalog card with the book's owner and section is accounting. Walking the shelves to find books missing from the catalog is enumeration. Withdrawing an old book means checking whether it must be kept, removing the library stamp, shredding any private notes inside, and recording the date and method on the card.",
        technical:
          "During a network discovery scan, the team finds 23 devices that are not in the asset inventory, including an unmanaged switch and a contractor's laptop. It identifies owners, brings legitimate devices under management, and removes the rest. At refresh time, 200 retired laptops with encrypted drives are processed: the team confirms no legal hold applies, performs a cryptographic erase, obtains a certificate from the recycling vendor stating the drives were shredded, removes the machines from the inventory, and deletes their certificates and accounts.",
        table: {
          headers: ["Stage", "Key security actions", "Evidence"],
          rows: [
            ["Acquisition / procurement", "Security requirements, vendor checks, integrity verification", "Purchase requirements, approved vendor record"],
            ["Assignment / accounting", "Assign owner, classify, record in inventory", "Inventory or CMDB entry"],
            ["Monitoring / tracking", "Enumeration, software inventory, patching, support dates", "Scan results, inventory reconciliation"],
            ["Disposal / decommissioning", "Check retention, sanitize or destroy, remove accounts and records", "Certificate of destruction, updated inventory"]
          ]
        },
        confusion: [
          { a: "Clear", b: "Purge", diff: "Clear overwrites data using normal commands. Purge uses stronger methods (cryptographic erase, degaussing) that make recovery infeasible even with laboratory techniques." },
          { a: "Purge", b: "Destroy", diff: "Purge leaves the media reusable. Destroy physically ruins the media." },
          { a: "Enumeration", b: "Inventory", diff: "Enumeration discovers what is actually present. The inventory is the record of what you think you have. Comparing them reveals rogue assets." },
          { a: "Sanitization", b: "Certification", diff: "Sanitization is the act of removing the data. Certification is the documentation proving it was done." },
          { a: "Asset owner", b: "Custodian", diff: "The owner is accountable for the asset and its classification. The custodian performs the day-to-day maintenance and protection." }
        ],
        soc: "A complete inventory is the SOC's foundation. When a new vulnerability is announced, analysts use the inventory to learn which systems are affected. Unknown devices appearing on the network are investigated as potential rogue or compromised assets, and decommissioned assets still sending traffic may reveal forgotten systems.",
        patterns: [
          ["Writing security requirements into purchase contracts", "Acquisition / procurement"],
          ["Each asset has a named owner and a classification", "Assignment and accounting"],
          ["Scan finds devices not in the inventory", "Enumeration revealing rogue or shadow assets"],
          ["Overwrite the drive with a single pass", "Clear (sanitization)"],
          ["Destroy encryption keys so data is unreadable", "Cryptographic erase (purge)"],
          ["Shred the drives and obtain proof", "Destruction with a certificate of destruction"],
          ["Check legal hold before disposing of data", "Retention check before decommissioning"],
          ["Remove accounts, certificates, and DNS entries of retired server", "Decommissioning cleanup"]
        ],
        takeaways: [
          "Know what you own, who owns it, and how important it is.",
          "Enumerate regularly to find assets that are not in the inventory.",
          "Dispose securely, with retention checks first and certification afterward."
        ],
        remember: [
          "Lifecycle: acquisition/procurement, assignment/accounting, monitoring/tracking, disposal/decommissioning.",
          "Assign an owner and classification to every asset; keep an inventory or CMDB.",
          "Enumeration discovers what actually exists; compare it to the inventory.",
          "Sanitization levels (NIST 800-88): clear, purge, destroy.",
          "SSDs: use cryptographic erase or physical destruction, not degaussing.",
          "Get a certificate of destruction; update the inventory and remove accounts and certificates.",
          "Check data retention and legal holds before disposal."
        ],
        taglish:
          "Ang asset management: pagbili (procurement) na may security requirements, pagtatalaga ng may-ari at classification (inventory o CMDB), pagsubaybay (enumeration para makita ang lahat ng talagang nasa network, kasama ang rogue devices), at maayos na pagtatapon. Bago itapon, tingnan kung may retention o legal hold. Sa pag-sanitize: clear (overwrite), purge (cryptographic erase o degauss), destroy (durugin). Kumuha ng certificate of destruction, i-update ang inventory, at alisin ang accounts at certificates ng retiradong asset."
      },
      {
        id: "d4-t182",
        title: "Investigation Data Sources: Logs, Metadata, Reports, Dashboards, and Packet Captures",
        tag: "4.9",
        minutes: 22,
        goal: "Select the right data source for an investigative question and explain what each source reveals and its limits.",
        why: "Objective 4.9 asks you to pick data sources for a scenario. The skill is knowing which source answers which question, and how to combine them into a timeline.",
        simple:
          "An investigation answers who, what, when, where, and how, and each data source covers part of that. FIREWALL LOGS show allowed and denied connections by address, port, and protocol, revealing scans, command-and-control traffic, and data leaving the network. APPLICATION LOGS record what an application did: user actions, errors, transactions, and attack attempts against it. ENDPOINT LOGS (including EDR telemetry) show processes started, files changed, and commands run on a device. OS-SPECIFIC SECURITY LOGS record authentication and system events, such as Windows event IDs 4624 and 4625 for logons and 4688 for new processes, or the authentication log on Linux. IPS and IDS LOGS list alerts raised by detection rules, with the signature, severity, source, destination, and whether traffic was blocked; they show attack attempts but need validation because some alerts are false positives. NETWORK LOGS and flow records show which systems talked to which, when, and how much data moved. METADATA is data about data: email headers (path, sending server, authentication results), file metadata (author, creation and modification times, location in photos), and connection metadata (who connected to whom without content); metadata often survives when content is encrypted and helps build timelines and attribute actions. VULNERABILITY SCAN results show what weaknesses existed on which systems when, useful for judging how an attacker got in and what else is exposed. AUTOMATED REPORTS are scheduled summaries from tools such as a SIEM or EDR (daily failed logons, top talkers, compliance status) that surface trends and give investigators a baseline. DASHBOARDS visualize current and historical data, such as alerts over time or login activity by region, letting analysts spot anomalies quickly. PACKET CAPTURES record actual network traffic, including payloads, in formats such as pcap, analyzed with tools like Wireshark and tcpdump; they give the most detail about what was sent but are large, short-lived, and sensitive, and encrypted content cannot be read without keys. Good investigators combine sources: the firewall shows the connection, the endpoint log shows the process, the authentication log shows the account, DNS shows the domain, and metadata shows when files were touched. Integrity matters: synchronize clocks, protect logs from tampering, preserve originals with hashes, and keep chain of custody if the matter may become legal.",
        deepDive: [
          { h: "Which source answers which question", list: [
            "Who logged in, from where? Authentication and OS security logs, VPN logs.",
            "What did the host do? Endpoint/EDR logs, process creation events.",
            "What network connections occurred? Firewall, flow, and proxy logs.",
            "What did the application receive and return? Application and web server logs.",
            "Was an attack attempted? IPS/IDS logs and WAF logs.",
            "What was in the traffic? Packet captures.",
            "What changed and when? File metadata and change logs.",
            "What was weak? Vulnerability scan history."
          ] },
          { h: "Reading an IDS/IPS alert", p: "A typical alert contains a timestamp, a signature name and ID, severity, source and destination address and port, protocol, and the action taken (alert only or blocked). Example (fictional): 2026-03-02 02:14:09 SID 2024897 'ET MALWARE Possible C2 Beacon' severity high, 10.0.4.22:51822 to 203.0.113.99:4444, action allowed. Analysts check whether the destination is known, whether the host shows related endpoint activity, and whether the rule is prone to false positives." },
          { h: "Metadata examples", list: [
            "Email headers: Received lines trace the path, and SPF, DKIM, and DMARC results show authentication.",
            "File metadata: author, created and modified times, and in images the camera and location.",
            "Flow metadata: source, destination, ports, bytes, and duration without content.",
            "Metadata can be altered, so treat it as evidence to corroborate, not proof by itself."
          ] },
          { h: "Reports and dashboards", list: [
            "Automated reports provide scheduled, consistent views and baselines (for example daily failed logons).",
            "Dashboards show live or recent data visually, helping detect spikes and patterns.",
            "Both depend on correct data collection; gaps in logging produce misleading charts.",
            "Use them to find leads, then confirm with raw logs."
          ] },
          { h: "Packet capture considerations", list: [
            "Provides full content, enabling reconstruction of files and sessions (if unencrypted).",
            "Requires placement at the right point (tap or SPAN port) and enough storage.",
            "Short retention because of volume; start capture early when an incident is suspected.",
            "Captures may contain sensitive data, so restrict access and handle as evidence.",
            "Display filters such as ip.addr == 10.0.4.22 or tcp.port == 4444 focus analysis."
          ] },
          { h: "Combining sources into a timeline", list: [
            "Normalize time zones and confirm clocks are synchronized.",
            "Anchor on one indicator (an IP, user, or file hash) and pivot across sources.",
            "Record each finding with its source and timestamp.",
            "State what is confirmed, what is likely, and what is unknown."
          ] }
        ],
        keyTerms: [
          { term: "Firewall Log", def: "A record of allowed and denied connections." },
          { term: "Application Log", def: "A record of events generated by a specific application." },
          { term: "Endpoint Log", def: "Telemetry from a device, including processes and file changes." },
          { term: "OS Security Log", def: "Operating system records of authentication and security events." },
          { term: "IDS / IPS Log", def: "Alerts generated by intrusion detection or prevention rules." },
          { term: "Metadata", def: "Data that describes other data, such as email headers or file timestamps." },
          { term: "Packet Capture", def: "A recording of network packets, including payloads." },
          { term: "Automated Report", def: "A scheduled summary generated by a security tool." },
          { term: "Dashboard", def: "A visual display of key data for monitoring and analysis." },
          { term: "Pivoting", def: "Using one finding to search other data sources." }
        ],
        analogy:
          "Investigators combine different kinds of witnesses. The firewall log is the doorman's guest list, the OS log is the receptionist's sign-in sheet, the endpoint log is the security camera inside the room, the IDS is the alarm company's alerts, the metadata is the postmark and handwriting on an envelope, and the packet capture is a full audio recording of the conversation. The dashboard is the summary board in the control room, and automated reports are the daily briefing notes.",
        technical:
          "An alert says a workstation contacted a known malicious address. The analyst checks the firewall log for the connection and finds it recurring every minute, the DNS log for the domain, and the endpoint log, which shows PowerShell launched by a Word document. The OS log shows which user was logged in, and email metadata shows the attachment arrived from a lookalike domain at 08:41. A dashboard reveals two other hosts contacting the same domain, and a short packet capture on the first host confirms the beacon structure. The team writes a timeline from these sources and isolates the three hosts.",
        table: {
          headers: ["Source", "Best for", "Limitation"],
          rows: [
            ["Firewall logs", "Allowed and denied connections", "No content; encrypted traffic opaque"],
            ["Application logs", "App actions and attack attempts", "Only what the app records"],
            ["Endpoint logs / EDR", "Process, file, and command activity", "Only on instrumented hosts"],
            ["OS security logs", "Authentication and system events", "Can be cleared by an attacker"],
            ["IDS/IPS logs", "Detected attack signatures", "False positives; missed unknown attacks"],
            ["Network / flow logs", "Who talked to whom and how much", "No payload"],
            ["Metadata", "Timelines, origin, attribution clues", "Can be altered or missing"],
            ["Vulnerability scans", "What weaknesses existed when", "Point-in-time; may have false results"],
            ["Packet captures", "Exact content of traffic", "Large, short retention, encryption limits"],
            ["Dashboards / automated reports", "Trends and anomalies", "Only as good as the data feeding them"]
          ]
        },
        confusion: [
          { a: "Flow data", b: "Packet capture", diff: "Flow data records who communicated and how much, without content. Packet capture records the content too." },
          { a: "IDS log", b: "Firewall log", diff: "An IDS log lists suspected attacks matched by signatures. A firewall log lists connections allowed or denied by rules." },
          { a: "Metadata", b: "Content", diff: "Metadata describes the data (who, when, where). Content is the data itself." },
          { a: "Dashboard", b: "Report", diff: "A dashboard is a live or recent visual display. A report is a scheduled, often periodic, summary." },
          { a: "Endpoint log", b: "OS security log", diff: "Endpoint logs and EDR telemetry capture detailed activity such as processes and commands. OS security logs focus on authentication and security events recorded by the operating system." }
        ],
        soc: "Daily SOC work is source selection: deciding which logs to pull, where to look first, and how to stitch them together. Gaps matter, so analysts also assess whether a source was even collecting during the period of interest, and note limitations in their conclusions.",
        patterns: [
          ["Which hosts talked to the malicious IP and when", "Firewall or flow logs"],
          ["What process launched the connection", "Endpoint log / EDR"],
          ["Which account was used to log in", "OS security or authentication logs"],
          ["Did a signature detect the attack", "IDS/IPS logs"],
          ["When was a file created and by whom", "File metadata"],
          ["Exact contents of the traffic", "Packet capture"],
          ["Spot a spike in failed logins at a glance", "Dashboard"],
          ["Daily scheduled summary of top blocked sources", "Automated report"]
        ],
        takeaways: [
          "Each source answers different questions; combine them into a timeline.",
          "Metadata and flow data often remain when content is encrypted.",
          "Protect log integrity, synchronize clocks, and note the limits of each source."
        ],
        remember: [
          "Sources: firewall, application, endpoint, OS security, IPS/IDS, network logs, metadata, vulnerability scans, automated reports, dashboards, packet captures.",
          "Firewall = connections; endpoint = processes; OS security = logons; IDS/IPS = signature alerts; packet capture = content.",
          "Metadata is data about data: email headers, file timestamps, flow records.",
          "Packet captures are detailed but large and short-lived; encrypted payloads stay unreadable.",
          "Dashboards and reports reveal trends; confirm leads in raw logs.",
          "Correlate across sources; pivot from one indicator to others.",
          "Preserve originals, hash evidence, and keep clocks synchronized."
        ],
        taglish:
          "Bawat log source may sagot sa iba't ibang tanong. Firewall log: aling koneksyon ang pinayagan o hinarang. Endpoint log: anong proseso ang tumakbo. OS security log: sinong account ang nag-login. IDS/IPS log: anong atake ang natukoy ng signature. Metadata: datos tungkol sa datos (email header, oras ng file). Packet capture: ang mismong laman ng traffic. Ang dashboard, mabilis na tingin sa trend; ang automated report, regular na buod. Pagsamahin ang mga source para makabuo ng timeline, at tiyaking sync ang oras ng lahat ng device."
      }
    ],

    d5: [
      {
        id: "d5-t180",
        title: "Building a Security Awareness Program: Phishing Simulations, Behavior, OPSEC, and Measuring Effectiveness",
        tag: "5.6",
        minutes: 24,
        goal: "Design and run an awareness program covering phishing, anomalous behavior, situational awareness, operational security, remote work, and measure whether it works.",
        why: "People are involved in most breaches, so awareness is a control. Objective 5.6 lists specific topics, and scenario questions ask what a good program does or how to respond to a user behavior.",
        simple:
          "A security awareness program changes behavior, not just knowledge. It rests on several practices. PHISHING is the main focus: CAMPAIGNS send realistic simulated phishing emails to measure and train, and the goal is to teach people to RECOGNIZE a phishing attempt (urgent tone, unexpected requests, mismatched sender or link, requests for credentials or payment) and to RESPOND correctly by reporting it, not by clicking or deleting it silently. A one-click report button and quick feedback on reported messages encourage reporting, and handling REPORTED SUSPICIOUS MESSAGES is a workflow: triage, analysis, removal from other mailboxes, and a reply to the reporter. Programs should reward reporting and avoid punishing mistakes, which teaches people to hide them. ANOMALOUS BEHAVIOR RECOGNITION teaches staff to notice three kinds of concerning behavior: RISKY behavior (sharing passwords, using unapproved tools, bypassing controls), UNEXPECTED behavior (a colleague asking for something unusual, a system acting strangely, an unfamiliar prompt), and UNINTENTIONAL behavior (honest mistakes such as sending an email to the wrong recipient or leaving a screen unlocked), which are responses to which training and process design can reduce. USER GUIDANCE AND TRAINING covers policies and handbooks (what is required and why), SITUATIONAL AWARENESS (paying attention to surroundings and context: tailgating, shoulder surfing, unknown visitors, strange devices, unusual requests), the INSIDER THREAT (recognizing and reporting warning signs), PASSWORD MANAGEMENT (unique passwords, password managers, MFA), REMOVABLE MEDIA and CABLES (never plugging in found USB drives or unknown charging cables, which can carry malware or attack hardware), SOCIAL ENGINEERING (pretexting, vishing, smishing), OPERATIONAL SECURITY or OPSEC (protecting information adversaries could piece together, such as not oversharing on social media, keeping sensitive discussions private, and following need-to-know and clean desk rules), and security for HYBRID and REMOTE WORK (securing home networks and routers, using the VPN, avoiding public Wi-Fi for sensitive work, protecting screens and devices, and not letting family use work devices). A program is built through DEVELOPMENT (needs assessment, role-based content, the right formats), EXECUTION (new-hire training at onboarding, recurring refreshers, targeted training after incidents, tracking completion), and REPORTING and MONITORING (initial and recurring training, with results reported to management). EFFECTIVENESS is measured with metrics such as phishing click rate and, more importantly, report rate, time to report, repeat-clicker trends, assessment scores, and reduction in related incidents, then used to adjust content.",
        deepDive: [
          { h: "Recognizing phishing", list: [
            "Unexpected message creating urgency or fear.",
            "Sender address or display name that does not match; lookalike domains.",
            "Links whose real destination differs from the text; attachments that were not expected.",
            "Requests for credentials, payments, gift cards, or sensitive data.",
            "Poor fit with how the supposed sender normally communicates."
          ] },
          { h: "The reporting loop", list: [
            "Provide an easy report button in the mail client.",
            "Acknowledge reports quickly and thank the reporter.",
            "Analyze and remove the message from all mailboxes if malicious.",
            "Use real reported messages as training examples."
          ] },
          { h: "Three kinds of anomalous behavior", list: [
            "Risky: deliberately or carelessly bypassing security (sharing credentials, using shadow IT).",
            "Unexpected: out-of-pattern requests or system behavior that should be questioned and reported.",
            "Unintentional: honest mistakes (misaddressed email, lost device); fix through training, safer defaults, and an easy path to report quickly."
          ] },
          { h: "Situational awareness and OPSEC", list: [
            "Notice tailgaters, strangers without badges, unfamiliar devices, and shoulder surfers.",
            "Lock screens and apply clean desk practice.",
            "Do not share sensitive details publicly or on social media that an attacker could assemble.",
            "Verify unusual requests through a separate channel.",
            "Report anything suspicious early, even if unsure."
          ] },
          { h: "Remote and hybrid work", list: [
            "Use the corporate VPN or zero trust access for company resources.",
            "Secure the home router (strong Wi-Fi password, updated firmware, no default credentials).",
            "Avoid public Wi-Fi for sensitive work or use a VPN.",
            "Keep work and personal use separate; protect devices from family members and theft.",
            "Be careful in public spaces: privacy screens and no sensitive calls overheard."
          ] },
          { h: "Developing, executing, and measuring", list: [
            "Needs assessment: risks, roles, and past incidents shape content.",
            "Role-based training: finance (payment fraud), IT (privileged access), executives (targeted attacks), developers (secure coding).",
            "Delivery: onboarding, recurring modules, short reminders, simulations, and just-in-time teachable moments.",
            "Measure: report rate and time to report, click rate trends, quiz results, incident reductions.",
            "Improve: adjust topics, difficulty, and frequency based on results and feedback."
          ] }
        ],
        keyTerms: [
          { term: "Phishing Simulation / Campaign", def: "Sending realistic fake phishing messages to measure and train users." },
          { term: "Anomalous Behavior", def: "Behavior that deviates from the norm, whether risky, unexpected, or unintentional." },
          { term: "Situational Awareness", def: "Attention to one's surroundings and context to notice threats." },
          { term: "OPSEC", def: "Operational Security: protecting information that adversaries could combine to harm you." },
          { term: "Clean Desk Policy", def: "A rule to keep sensitive material and credentials out of sight and secured." },
          { term: "Role-Based Training", def: "Training tailored to the risks of a person's job." },
          { term: "Report Rate", def: "The proportion of simulated phishing messages that users report." },
          { term: "Tailgating", def: "Following an authorized person through a secured door." },
          { term: "Shoulder Surfing", def: "Observing someone's screen or keyboard to steal information." },
          { term: "Teachable Moment", def: "Immediate feedback at the point of a mistake to reinforce learning." }
        ],
        analogy:
          "An awareness program is like teaching a neighborhood to look out for each other. Phishing simulations are fire drills. The report button is the easy-to-reach alarm. Situational awareness is noticing the stranger trying doors. OPSEC is not telling the whole street when you will be on vacation. And measuring effectiveness is counting how many neighbors actually pull the alarm, not just how many attended the meeting.",
        technical:
          "A company launches a quarterly phishing simulation program. The first campaign shows a 28 percent click rate and a 6 percent report rate. The team adds a one-click report button, publishes a short guide on recognizing phishing, gives instant feedback to people who click, and trains finance staff on payment fraud. Over the next two quarters, the click rate falls to 9 percent and the report rate rises to 41 percent, and reported messages now average two minutes to the security team. A real campaign is caught early because several employees reported it before anyone clicked.",
        table: {
          headers: ["Topic", "What staff should do"],
          rows: [
            ["Phishing", "Recognize, do not click, report with the report button"],
            ["Risky behavior", "Never share passwords or bypass controls; use approved tools"],
            ["Unexpected requests", "Verify through a separate channel and report"],
            ["Unintentional mistakes", "Report quickly without fear of blame"],
            ["Situational awareness", "Watch for tailgaters, shoulder surfers, unknown devices"],
            ["Removable media and cables", "Never plug in unknown USB drives or cables"],
            ["OPSEC", "Do not overshare; follow need-to-know and clean desk"],
            ["Remote work", "Secure home network, use VPN, protect devices"],
            ["Passwords", "Use a password manager and MFA"]
          ]
        },
        confusion: [
          { a: "Risky behavior", b: "Unintentional behavior", diff: "Risky behavior involves deliberately or carelessly bypassing security. Unintentional behavior is an honest mistake." },
          { a: "Click rate", b: "Report rate", diff: "Click rate shows how many fell for the test. Report rate shows how many acted correctly, and is often the better sign of a healthy security culture." },
          { a: "Situational awareness", b: "OPSEC", diff: "Situational awareness is noticing what is happening around you. OPSEC is controlling what information you reveal to adversaries." },
          { a: "Awareness", b: "Training", diff: "Awareness keeps security in mind through reminders and campaigns. Training teaches specific skills and procedures." },
          { a: "Punishing clickers", b: "Teachable moment", diff: "Punishment discourages reporting. A teachable moment gives immediate guidance that improves behavior." }
        ],
        soc: "Awareness feeds detection: employees are sensors. A fast reporting culture gives the SOC early warning, and reported messages become a stream of fresh indicators. Metrics from campaigns show which departments need targeted help.",
        patterns: [
          ["Realistic fake phishing emails sent to staff", "Phishing simulation campaign"],
          ["Employee found a USB drive in the parking lot", "Do not plug it in; report it to security"],
          ["Staff overshare travel plans and projects on social media", "OPSEC risk"],
          ["Employee leaves a screen unlocked and sensitive papers visible", "Clean desk and situational awareness"],
          ["Honest mistake such as emailing the wrong person", "Unintentional behavior; report promptly"],
          ["Training tailored for finance about payment fraud", "Role-based training"],
          ["Best sign that awareness is working", "High and fast reporting plus fewer incidents"],
          ["Working from a coffee shop", "Use VPN, avoid public Wi-Fi for sensitive work, protect the screen"]
        ],
        takeaways: [
          "Aim to change behavior: recognize, respond, and report.",
          "Measure reporting and incident reduction, not only completion.",
          "Support people with easy reporting and a no-blame culture."
        ],
        remember: [
          "Phishing program: simulations, recognition, reporting button, triage of reported messages.",
          "Anomalous behavior: risky, unexpected, unintentional.",
          "Topics: policies and handbooks, situational awareness, insider threat, password management, removable media and cables, social engineering, OPSEC, remote and hybrid work.",
          "Program lifecycle: development, execution (initial and recurring), reporting and monitoring, effectiveness.",
          "Measure report rate, time to report, click trends, and incident reduction.",
          "Do not punish reporting; give teachable moments.",
          "Role-based training targets the risks of each job."
        ],
        taglish:
          "Ang layunin ng awareness program ay baguhin ang kilos. Gumamit ng phishing simulation, turuan silang kilalanin ang phishing, at gawing madali ang pag-report (report button). Tatlong uri ng kakaibang kilos: risky (sinasadyang lampasan ang security), unexpected (kakaibang hiling o pangyayari), at unintentional (aksidenteng pagkakamali). Mga paksa: situational awareness, OPSEC (huwag mag-overshare), USB at kable, password manager, at pag-iingat sa remote work. Sukatin ang report rate at pagbaba ng insidente, hindi lang kung gaano karami ang nakatapos ng training."
      },
      {
        id: "d5-t181",
        title: "Audits and Assessments in Depth: Internal, External, Attestation, and Compliance Reporting",
        tag: "5.5",
        minutes: 22,
        goal: "Differentiate internal and external audits, assessments, and attestations, describe the audit process, and explain compliance reporting.",
        why: "Auditors and assessments are how organizations prove that controls exist and work. The exam asks you to recognize audit types, who performs them, and what they produce.",
        simple:
          "An AUDIT is a formal, evidence-based examination of whether something meets a defined standard, performed independently so the conclusion is trustworthy. An ASSESSMENT is a broader evaluation (of risk, vulnerabilities, or maturity) that may be less formal and need not give a pass or fail opinion. ATTESTATION is a formal statement that something is true, for example management attesting that controls are operating, or an independent auditor issuing an opinion on a service provider's controls (as in a SOC 2 report). Audits fall into two groups. INTERNAL audits are performed by the organization's own staff and include COMPLIANCE audits against policy or regulation, SELF-ASSESSMENTS in which the control owners evaluate themselves, and oversight by an AUDIT COMMITTEE, a committee of the board of directors, independent from management, that supervises internal audit, financial reporting, and the handling of audit findings. EXTERNAL audits are performed by outsiders: REGULATORY audits and EXAMINATIONS by government or industry regulators who check compliance with law, and INDEPENDENT THIRD-PARTY audits by qualified firms, such as a SOC 2 examination, an ISO 27001 certification audit, or a payment card assessment. The audit process follows steps: planning and scoping, gathering evidence (interviews, observation, document review, system inspection, re-performance of controls, and sampling), evaluating results against criteria, reporting findings with severity, obtaining management responses, and tracking remediation with follow-up testing. Auditors must be independent and objective; people should not audit their own work, which is why external audits carry more weight with outsiders, while internal audits and self-assessments are quicker and cheaper and prepare for external ones. COMPLIANCE REPORTING communicates results. INTERNAL reporting goes to management, the audit committee, and the board; EXTERNAL reporting goes to regulators, customers, partners, and certification bodies, often as formal reports or attestations. Typical consequences of findings are corrective action plans and deadlines, and for serious non-compliance, fines, sanctions, or loss of certification.",
        deepDive: [
          { h: "Audit versus assessment versus attestation", list: [
            "Audit: formal and independent; compares evidence to a defined standard; produces an opinion or findings.",
            "Assessment: evaluates risk, vulnerabilities, or maturity; informs decisions; may not follow a fixed standard.",
            "Attestation: a formal assertion or opinion that controls or statements are accurate, by management or an independent party."
          ] },
          { h: "Internal audit types", list: [
            "Compliance audit: checks adherence to laws, policies, and standards.",
            "Self-assessment: control owners review their own controls; quick and cheap but less objective.",
            "Audit committee: independent board-level committee overseeing internal and external audit and the response to findings.",
            "Internal audit function: staff independent of operations who test controls and report to the committee."
          ] },
          { h: "External audit types", list: [
            "Regulatory audit or examination: performed by government or industry regulators.",
            "Independent third-party audit: performed by an accredited or qualified firm (for example a SOC 2 examination, ISO 27001 certification, or a payment card assessor).",
            "Customer or partner audits under contract (right-to-audit clauses).",
            "External results carry more assurance for outsiders because of independence."
          ] },
          { h: "How an audit runs", list: [
            "Plan and scope: objectives, criteria, systems, period.",
            "Collect evidence: documents, configurations, logs, interviews, observation, re-performance, sampling.",
            "Evaluate: compare evidence to criteria and decide whether controls are designed and operating effectively.",
            "Report: findings with severity and evidence.",
            "Respond: management accepts findings and sets corrective actions with owners and dates.",
            "Follow up: verify remediation."
          ] },
          { h: "Compliance reporting", list: [
            "Internal reporting: status, findings, and trends to management, the audit committee, and the board.",
            "External reporting: reports and attestations to regulators, customers, and certification bodies.",
            "Include scope, period, results, exceptions, and remediation status.",
            "Automation and continuous monitoring can supply evidence more frequently than annual audits."
          ] },
          { h: "Why independence matters", p: "Auditors should not review their own work or answer to the people they audit. Independence (organizational placement, reporting lines, and absence of conflicts of interest) protects objectivity and credibility. That is why audit committees receive internal audit reports directly and why external auditors are engaged by parties outside the operational chain." }
        ],
        keyTerms: [
          { term: "Audit", def: "A formal, independent examination of evidence against a defined standard." },
          { term: "Assessment", def: "An evaluation of risk, vulnerabilities, or maturity to inform decisions." },
          { term: "Attestation", def: "A formal statement or opinion that controls or statements are accurate." },
          { term: "Internal Audit", def: "An audit conducted by the organization's own independent staff." },
          { term: "Self-Assessment", def: "A review of controls by the people who own them." },
          { term: "Audit Committee", def: "A board committee independent of management that oversees audit and financial reporting." },
          { term: "Regulatory Examination", def: "An inspection by a regulator to check compliance with law." },
          { term: "Independent Third-Party Audit", def: "An audit performed by an external qualified firm." },
          { term: "Finding", def: "A documented deficiency or observation identified during an audit." },
          { term: "Corrective Action Plan", def: "A plan with owners and deadlines to fix audit findings." }
        ],
        analogy:
          "Think of a school. A self-assessment is a student grading their own quiz. An internal audit is the school's own quality team checking classrooms. The audit committee is the school board, independent of the principal, reviewing those reports. A regulatory examination is the education department's inspector. An independent third-party audit is an accreditation body that visits and issues a certificate, and attestation is the signed statement from the principal or the accreditor that the standards are met.",
        technical:
          "A software provider prepares for a SOC 2 examination. First it runs a self-assessment and then an internal compliance audit that finds two issues: access reviews were skipped last quarter and a backup restore test was not documented. The audit committee receives the report, management responds with a corrective action plan, and the issues are fixed. An independent third-party auditor then tests the controls over a six-month period using document review, sampling, and re-performance, and issues a report with an unqualified opinion. The company shares that attestation with customers who ask for assurance, and reports status internally to the board each quarter.",
        table: {
          headers: ["Type", "Performed by", "Purpose"],
          rows: [
            ["Self-assessment", "Control owners", "Quick internal check and preparation"],
            ["Internal compliance audit", "Internal audit staff", "Verify adherence to policy and regulation"],
            ["Audit committee oversight", "Board committee", "Independent oversight of audit and findings"],
            ["Regulatory examination", "Regulator", "Verify legal compliance"],
            ["Independent third-party audit", "External qualified firm", "Objective assurance for customers and certifiers"],
            ["Attestation", "Management or independent auditor", "Formal assertion or opinion on controls"]
          ]
        },
        confusion: [
          { a: "Audit", b: "Assessment", diff: "An audit is formal and independent and compares evidence with a defined standard. An assessment evaluates risk, weakness, or maturity and need not follow a fixed standard or issue an opinion." },
          { a: "Internal audit", b: "External audit", diff: "Internal audits are done by the organization's own independent staff. External audits are done by outsiders such as regulators or accredited firms and carry more weight with third parties." },
          { a: "Self-assessment", b: "Independent audit", diff: "In a self-assessment the control owners evaluate themselves. An independent audit is performed by people with no stake in the result." },
          { a: "Attestation", b: "Audit", diff: "An attestation is the formal statement or opinion. An audit is the examination that supports it." },
          { a: "Audit committee", b: "Internal audit", diff: "The audit committee is a board-level oversight body. Internal audit is the function of staff who perform audits and report to it." }
        ],
        soc: "Auditors ask the SOC for evidence: logs retained for the required period, incident records, evidence that alerts were reviewed, and access reviews. Keeping records organized and tamper-proof turns audits from a scramble into routine. Audit findings also drive improvements, such as added monitoring or documented procedures.",
        patterns: [
          ["Control owners review their own controls", "Self-assessment"],
          ["Board committee independent of management overseeing audits", "Audit committee"],
          ["Government agency inspects compliance with law", "Regulatory examination (external)"],
          ["Accredited firm issues a SOC 2 report", "Independent third-party audit; attestation"],
          ["Audit of adherence to the company's own policies", "Internal compliance audit"],
          ["Formal statement that controls are operating effectively", "Attestation"],
          ["Plan with owners and deadlines to fix findings", "Corrective action plan"],
          ["Results reported to the board and executives", "Internal compliance reporting"]
        ],
        takeaways: [
          "Know who performs each audit type and what it produces.",
          "Independence gives audits their credibility.",
          "Findings lead to corrective actions that are tracked to closure."
        ],
        remember: [
          "Audit = formal, independent, evidence against a standard. Assessment = evaluation of risk or maturity.",
          "Attestation = formal statement or opinion that controls are accurate.",
          "Internal: compliance audits, self-assessments, audit committee oversight.",
          "External: regulatory examinations and independent third-party audits.",
          "Audit steps: scope, evidence, evaluate, report, management response, follow-up.",
          "Internal compliance reporting goes to management and the board; external reporting goes to regulators, customers, and certifiers.",
          "Serious non-compliance risks fines, sanctions, and loss of certification."
        ],
        taglish:
          "Ang audit ay pormal at independiyenteng pagsusuri ng ebidensya laban sa pamantayan. Ang assessment ay mas malawak na pagtatasa ng risk o maturity. Ang attestation ay pormal na pahayag na tama ang mga control. Internal: compliance audit, self-assessment (sarili ang nag-eeksamin), at audit committee (komite ng board na independiyente sa management). External: regulatory examination (galing sa regulator) at independent third-party audit (hal. SOC 2). Hakbang: scope, ebidensya, pagsusuri, ulat, tugon ng management, at follow-up."
      },
      {
        id: "d5-t182",
        title: "Governance Documents in Depth: Policies, Standards, Procedures, Guidelines, and Governance Structures",
        tag: "5.1",
        minutes: 22,
        goal: "Distinguish policies, standards, procedures, and guidelines, name the common policy types and example standards, and describe governance structures and lifecycle.",
        why: "Governance is how security becomes organization-wide. The exam lists specific policies, standards, and procedures and expects you to place any example in the right tier.",
        simple:
          "Security governance is the system of direction and accountability that aligns security with business goals and legal duties. Its documents form a hierarchy. POLICIES are high-level, mandatory statements of intent approved by senior management, such as the ACCEPTABLE USE POLICY (what users may and may not do with company systems), INFORMATION SECURITY policies (overall security expectations), BUSINESS CONTINUITY and DISASTER RECOVERY policies, the INCIDENT RESPONSE policy, the SOFTWARE DEVELOPMENT LIFE CYCLE (SDLC) policy, and the CHANGE MANAGEMENT policy. STANDARDS are specific, mandatory requirements that implement policies, such as a PASSWORD standard (minimum length, lockout settings), an ACCESS CONTROL standard (how access is requested, approved, and reviewed), a PHYSICAL SECURITY standard (badge use, visitor logs, camera coverage, lighting, and locks), and an ENCRYPTION standard (approved algorithms, key lengths, and protocols). PROCEDURES are detailed, mandatory step-by-step instructions for performing a task, such as the change management procedure, ONBOARDING and OFFBOARDING procedures, and incident response PLAYBOOKS. GUIDELINES are recommendations and good practices that are not mandatory. A simple memory aid: policies say WHAT and WHY, standards say HOW MUCH or WHICH, procedures say HOW, and guidelines say what is advisable. Governance must consider EXTERNAL factors: REGULATORY requirements, LEGAL obligations, INDUSTRY standards, and the laws at LOCAL, REGIONAL, NATIONAL, and GLOBAL levels, which may differ or conflict for organizations operating in many places. Documents are not finished once written: they are communicated, acknowledged by staff, monitored for compliance, and REVIEWED and REVISED regularly and after incidents, audits, or changes in law or technology. GOVERNANCE STRUCTURES provide oversight: a BOARD of directors holds ultimate accountability, COMMITTEES (such as a risk committee or security steering committee) guide strategy and approve policy, and GOVERNMENT ENTITIES may impose requirements. Governance can be CENTRALIZED, with a single authority setting policy for the whole organization (consistent, efficient, but less flexible), or DECENTRALIZED, with local units setting their own (flexible and responsive, but less consistent). Clear ROLES and RESPONSIBILITIES are essential: data OWNERS are accountable for data and its classification, CONTROLLERS decide why and how personal data is processed, PROCESSORS handle it on a controller's behalf, and CUSTODIANS or STEWARDS carry out day-to-day protection and quality.",
        deepDive: [
          { h: "The documentation hierarchy", list: [
            "Policy: mandatory, high-level, approved by management. Example: Acceptable Use Policy.",
            "Standard: mandatory, specific requirements. Example: passwords must be at least 14 characters.",
            "Procedure: mandatory, step-by-step actions. Example: how to onboard a new employee.",
            "Guideline: optional advice. Example: tips for creating memorable passphrases."
          ] },
          { h: "Policies named in the objectives", list: [
            "Acceptable use policy (AUP).",
            "Information security policies.",
            "Business continuity policy and disaster recovery policy.",
            "Incident response policy.",
            "Software development life cycle (SDLC) policy.",
            "Change management policy."
          ] },
          { h: "Standards named in the objectives", list: [
            "Password standard: length, complexity or screening, lockout, storage.",
            "Access control standard: request, approval, review, least privilege.",
            "Physical security standard: badges, visitor management, camera coverage and retention, lighting, locks, guards.",
            "Encryption standard: approved algorithms, key lengths, protocols, and key management."
          ] },
          { h: "Procedures", list: [
            "Change management procedure: the steps from request to closure.",
            "Onboarding: create accounts, assign roles, provide equipment, and require policy acknowledgment and training.",
            "Offboarding: disable accounts, recover devices, revoke access and tokens, and conduct an exit review.",
            "Playbooks: step-by-step responses for incident types."
          ] },
          { h: "External considerations", list: [
            "Regulatory: required by regulators (for example financial or healthcare rules).",
            "Legal: laws and court requirements, including privacy law and contracts.",
            "Industry: standards and best practices such as payment card rules.",
            "Local, regional, national, and global: requirements vary by jurisdiction; international organizations must reconcile differences."
          ] },
          { h: "Lifecycle and structures", list: [
            "Draft, approve, publish, communicate, acknowledge, enforce, monitor, review, revise, retire.",
            "Review at least annually and after major incidents, audits, or regulatory changes.",
            "Board: accountable; committees: guide and approve; management: implements.",
            "Centralized governance gives consistency; decentralized gives local flexibility."
          ] }
        ],
        keyTerms: [
          { term: "Policy", def: "A mandatory high-level statement of management intent and requirements." },
          { term: "Standard", def: "A mandatory, specific requirement that supports a policy." },
          { term: "Procedure", def: "A mandatory step-by-step set of instructions." },
          { term: "Guideline", def: "A recommended, non-mandatory practice." },
          { term: "Acceptable Use Policy", def: "A policy defining proper and improper use of organizational resources." },
          { term: "Playbook", def: "A documented set of steps for responding to a particular scenario." },
          { term: "Governance Committee", def: "A group that guides security strategy and approves policy." },
          { term: "Centralized Governance", def: "A single authority sets direction for the whole organization." },
          { term: "Data Custodian / Steward", def: "The person who implements protection and quality for data owned by someone else." },
          { term: "Policy Acknowledgment", def: "Staff confirmation that they have read and will follow a policy." }
        ],
        analogy:
          "Governance documents are like the rules of a country's roads. The policy is the law: drive safely and respect others. The standard is the speed limit and the required lane markings. The procedure is the step-by-step test for getting a license. The guideline is the advice to leave early in heavy rain. The government and courts are the governance structures, local councils can set their own rules (decentralized), and the national highway authority sets the same rules everywhere (centralized).",
        technical:
          "A company's information security policy requires that sensitive data be encrypted. The encryption standard specifies AES-256 for stored data and TLS 1.2 or newer in transit, with keys held in an HSM. The key management procedure explains step by step how keys are created, rotated, and retired. A guideline recommends using the corporate file-sharing tool for external transfers. The security steering committee reviews the policy every year and after a regional privacy law changes, and staff must acknowledge updated policies in the learning system.",
        table: {
          headers: ["Tier", "Mandatory?", "Level of detail", "Example"],
          rows: [
            ["Policy", "Yes", "High-level (what and why)", "Acceptable Use Policy"],
            ["Standard", "Yes", "Specific requirements", "Password standard: 14-character minimum"],
            ["Procedure", "Yes", "Step by step (how)", "Offboarding checklist"],
            ["Guideline", "No", "Advice", "Tips for strong passphrases"]
          ]
        },
        confusion: [
          { a: "Policy", b: "Standard", diff: "A policy states what must be done and why at a high level. A standard states the specific measurable requirement that implements it." },
          { a: "Standard", b: "Procedure", diff: "A standard defines the requirement (for example the encryption algorithm). A procedure explains the steps to carry out a task." },
          { a: "Procedure", b: "Guideline", diff: "Procedures are mandatory step-by-step instructions. Guidelines are optional recommendations." },
          { a: "Centralized", b: "Decentralized governance", diff: "Centralized governance sets rules from one authority for consistency. Decentralized governance lets units decide, offering flexibility with less consistency." },
          { a: "Data owner", b: "Data custodian", diff: "The owner is accountable and decides classification and access. The custodian carries out the protection day to day." }
        ],
        soc: "Policies and playbooks define the SOC's authority and steps: who may isolate a host, what must be reported and when, and how long logs must be kept. Gaps in these documents show up as hesitation during incidents, so tabletop exercises test them and revisions follow.",
        patterns: [
          ["Defines what users may and may not do with company systems", "Acceptable use policy"],
          ["Requires passwords of at least 14 characters", "Standard (password standard)"],
          ["Step-by-step instructions for onboarding a new employee", "Procedure"],
          ["Optional advice for choosing good passphrases", "Guideline"],
          ["One authority sets rules for the whole organization", "Centralized governance"],
          ["Board committee that approves security strategy", "Governance committee"],
          ["Policy must be updated after a new privacy law", "Monitoring and revision; external considerations"],
          ["Staff confirm they read the policy", "Policy acknowledgment"]
        ],
        takeaways: [
          "Policies set direction, standards set specifics, procedures set steps, guidelines advise.",
          "Governance responds to regulatory, legal, industry, and geographic requirements.",
          "Documents are living: communicate, monitor, review, and revise."
        ],
        remember: [
          "Hierarchy: policy (what/why), standard (specific requirement), procedure (how), guideline (optional).",
          "Policies: AUP, information security, business continuity, disaster recovery, incident response, SDLC, change management.",
          "Standards: password, access control, physical security, encryption.",
          "Procedures: change management, onboarding/offboarding, playbooks.",
          "External considerations: regulatory, legal, industry; local, regional, national, global.",
          "Review regularly and after incidents or legal changes; require acknowledgment.",
          "Roles: owner, controller, processor, custodian/steward."
        ],
        taglish:
          "Ang hirarkiya: policy (ano at bakit, mataas na antas), standard (tiyak na kailangan, hal. 14 character ang password), procedure (hakbang-hakbang kung paano), at guideline (payo lang, hindi sapilitan). Mga policy: AUP, information security, BCP, DR, incident response, SDLC, at change management. Isaalang-alang ang batas at regulasyon (lokal, rehiyonal, pambansa, global). Regular na rebyuhin at baguhin ang mga dokumento. May mga papel: owner, controller, processor, at custodian. Ang governance ay maaaring centralized (isang awtoridad) o decentralized (bawat unit)."
      },
      {
        id: "d5-t183",
        title: "Third-Party Risk Management Process: Selection, Conflicts of Interest, Monitoring, and Offboarding",
        tag: "5.3",
        minutes: 20,
        goal: "Walk through the lifecycle of managing a vendor relationship and apply tiering, due diligence, conflict-of-interest controls, monitoring, and offboarding.",
        why: "Vendors extend your attack surface and your risk. Objective 5.3 covers the full process, including conflicts of interest during selection and ongoing monitoring, which are easy to overlook.",
        simple:
          "Third-party risk management is the process of identifying, assessing, and controlling risks from vendors, suppliers, and partners. It follows a lifecycle. First, identify the need and classify the vendor by TIER, based on the sensitivity of data it handles, how critical its service is, and its access to your systems: a payroll provider holding personal data is high risk; a catering supplier is low. Higher tiers receive deeper review. VENDOR SELECTION includes DUE DILIGENCE: checking the vendor's financial stability, reputation, references, legal and regulatory standing, and security posture through questionnaires, independent assessments such as SOC 2 reports or ISO 27001 certificates, evidence of internal audits, and sometimes penetration test results and a SUPPLY CHAIN analysis of the vendor's own suppliers (fourth parties). Selection must be fair and free of CONFLICTS OF INTEREST, situations where a decision-maker's personal interests (a family relationship, financial stake, gifts, or hope of future employment) could influence the choice. Controls include disclosure and declaration forms, recusal of conflicted people from the decision, independent evaluation by a committee, documented criteria, competitive bidding where appropriate, and gift and hospitality rules. Next comes CONTRACTING with the documents covered earlier: an MSA, SOW, SLA, and NDA, plus security requirements, breach notification terms, a RIGHT-TO-AUDIT clause, and data handling and return provisions. During ONBOARDING, grant only the access needed (least privilege), review technical integrations, issue vendor accounts with expiry dates, and confirm the vendor has the training and controls promised. Then comes ongoing VENDOR MONITORING: track performance against the SLA, review updated audit reports, reassess periodically (more often for high-tier vendors), watch for news of breaches and financial trouble, require incident notifications, and keep contacts current. Risk can also concentrate when many functions depend on one provider (CONCENTRATION RISK), so alternatives and exit plans matter. Finally, OFFBOARDING at contract end: revoke access, retrieve or securely destroy data with certification, remove connections and keys, and conduct a closing review. A vendor's penetration test or your test of a vendor system is governed by written RULES OF ENGAGEMENT.",
        deepDive: [
          { h: "Tiering vendors", list: [
            "High: handles sensitive or regulated data, has privileged access, or supports critical functions. Requires full assessment and frequent review.",
            "Medium: some data or access, moderate impact. Standard assessment.",
            "Low: no sensitive data or access, easily replaceable. Lightweight checks.",
            "Re-tier when the relationship changes."
          ] },
          { h: "Due diligence checklist", list: [
            "Financial health and stability.",
            "Reputation, references, and legal or regulatory history.",
            "Security questionnaire and evidence: SOC 2, ISO 27001, penetration test summaries, internal audit evidence.",
            "Business continuity and incident response capability.",
            "Supply chain analysis: critical subcontractors and fourth parties.",
            "Location and data residency, including legal jurisdiction."
          ] },
          { h: "Managing conflicts of interest", list: [
            "Require disclosure of relationships, financial interests, and gifts.",
            "Recuse conflicted individuals from evaluation and approval.",
            "Use an evaluation committee with documented scoring criteria.",
            "Apply gift, entertainment, and hospitality limits.",
            "Document the decision and review it independently when value is high.",
            "Rotate responsibilities where practical."
          ] },
          { h: "Ongoing monitoring", list: [
            "Review SLA metrics and incident reports.",
            "Reassess annually or on triggers (breach, acquisition, new service, financial trouble).",
            "Review new audit reports and certificates before they expire.",
            "Check access lists for vendor accounts and remove unused ones.",
            "Track fourth-party and concentration risk."
          ] },
          { h: "Offboarding", list: [
            "Disable accounts and revoke tokens, certificates, and API keys.",
            "Remove network connections and VPN tunnels.",
            "Return or destroy data and obtain certification.",
            "Confirm termination of obligations and hold a lessons-learned review.",
            "Update inventories and risk registers."
          ] }
        ],
        keyTerms: [
          { term: "Third-Party Risk", def: "Risk arising from relationships with vendors, suppliers, and partners." },
          { term: "Vendor Tiering", def: "Classifying vendors by risk to decide how much scrutiny they receive." },
          { term: "Due Diligence", def: "Investigation of a vendor before engagement." },
          { term: "Conflict of Interest", def: "A situation where personal interests could improperly influence a business decision." },
          { term: "Recusal", def: "Stepping aside from a decision because of a conflict of interest." },
          { term: "Fourth Party", def: "A subcontractor or supplier used by your vendor." },
          { term: "Concentration Risk", def: "Risk from depending heavily on a single vendor or technology." },
          { term: "Vendor Monitoring", def: "Ongoing evaluation of a vendor's performance and risk." },
          { term: "Offboarding", def: "Ending a vendor relationship by removing access and securing data." },
          { term: "Right to Audit", def: "Contract clause permitting inspection of a vendor's controls." }
        ],
        analogy:
          "Hiring a vendor is like hiring a contractor to work inside your home. You decide how much trust each job needs (a plumber with house keys is higher risk than a florist). You check references and insurance, make sure the person choosing the contractor is not his cousin, sign a clear contract, give him access only to the rooms he needs, check in during the work, and when he finishes you collect the keys and any copies of your plans.",
        technical:
          "A hospital chooses a billing vendor that will hold patient data (high tier). The evaluation committee scores three finalists using documented criteria, and the procurement manager discloses that a relative works for one bidder and is recused. Due diligence includes a SOC 2 Type II report, a security questionnaire, and a review of the vendor's own subcontractors. The contract includes breach notification within 24 hours and a right-to-audit clause. After go-live, the hospital reviews SLA reports monthly, reassesses the vendor annually, and tracks its certificate renewals. When the contract ends, accounts and VPN access are removed, and the vendor certifies destruction of patient data.",
        table: {
          headers: ["Stage", "Key actions", "Control or artifact"],
          rows: [
            ["Tiering", "Classify by data sensitivity, access, criticality", "Risk tier"],
            ["Selection", "Due diligence, conflict-of-interest checks", "Questionnaire, evidence, disclosure forms, recusal"],
            ["Contracting", "Security terms, SLA, right to audit", "MSA, SOW, SLA, NDA"],
            ["Onboarding", "Least privilege, integration review", "Vendor accounts with expiry"],
            ["Monitoring", "SLA review, reassessment, incident notices", "Reports, certificates, risk reviews"],
            ["Offboarding", "Revoke access, return or destroy data", "Certification of destruction, closing review"]
          ]
        },
        confusion: [
          { a: "Due diligence", b: "Monitoring", diff: "Due diligence happens before engagement to decide whether to hire the vendor. Monitoring continues after to ensure the vendor remains acceptable." },
          { a: "Conflict of interest", b: "Fourth-party risk", diff: "A conflict of interest concerns a decision-maker's personal interests. Fourth-party risk concerns your vendor's own suppliers." },
          { a: "Vendor tier", b: "Vendor size", diff: "Tier reflects risk (data sensitivity, access, criticality), not company size." },
          { a: "Concentration risk", b: "Supply chain risk", diff: "Concentration risk is dependence on one provider. Supply chain risk is risk passing through the chain of suppliers." },
          { a: "Recusal", b: "Right to audit", diff: "Recusal removes a conflicted person from a decision. A right-to-audit clause lets you inspect the vendor." }
        ],
        soc: "Vendors appear in incidents as the entry point or as the source of data loss. The SOC needs a current list of vendor accounts and connections, vendor contact details in the incident plan, and monitoring on vendor access. Offboarding failures, such as an active account for a vendor that ended its contract, are common findings.",
        patterns: [
          ["Rate each vendor by data sensitivity and criticality", "Vendor tiering"],
          ["Procurement manager's relative works for a bidder", "Conflict of interest; recusal"],
          ["Review of a vendor's SOC 2 report before signing", "Due diligence"],
          ["Annual reassessment and SLA reviews after go-live", "Vendor monitoring"],
          ["Vendor's subcontractor handles your data", "Fourth-party / supply chain risk"],
          ["Entire business depends on one cloud provider", "Concentration risk"],
          ["Contract ends; accounts disabled and data destruction certified", "Offboarding"],
          ["Right to inspect the vendor's controls", "Right-to-audit clause"]
        ],
        takeaways: [
          "Match scrutiny to risk with tiering.",
          "Keep selection fair by managing conflicts of interest.",
          "Third-party risk is a lifecycle: select, contract, onboard, monitor, offboard."
        ],
        remember: [
          "Lifecycle: tier, select (due diligence), contract, onboard, monitor, offboard.",
          "Tier vendors by data sensitivity, access, and criticality.",
          "Due diligence: financial health, reputation, security evidence (SOC 2, ISO 27001), questionnaires, supply chain analysis.",
          "Conflict of interest: disclose, recuse, use independent evaluation, limit gifts.",
          "Contracts: MSA, SOW, SLA, NDA, right to audit, breach notification.",
          "Monitor continuously and reassess periodically; watch fourth parties and concentration risk.",
          "Offboard: revoke access, return or destroy data with certification."
        ],
        taglish:
          "Ang third-party risk management ay may siklo: i-tier ang vendor ayon sa panganib (gaano kasensitibo ang data at access), due diligence bago pumili (pinansyal, reputasyon, SOC 2, questionnaire, supply chain), kontrata (MSA, SOW, SLA, NDA, right to audit), onboarding na least privilege, tuloy-tuloy na monitoring, at offboarding (bawiin ang access, sirain ang data at kumuha ng certificate). Iwasan ang conflict of interest: magdeklara, mag-recuse, at gumamit ng independiyenteng komite sa pagpili. Bantayan din ang fourth party at concentration risk."
      }
    ]
  },

  tips: {
    "d3-t180": "Work in two steps: name the data type (regulated, trade secret, IP, legal, financial) and then apply the classification label (public, private, sensitive, confidential, restricted, critical). Higher labels always mean stronger access control, encryption, and logging.",
    "d4-t180": "Ask where in the identity lifecycle the problem sits: before issuing is proofing, at creation is provisioning, after job change is removing old access, periodic confirmation is attestation, expires on its own is a temporal account, and short-lived token is an ephemeral credential.",
    "d4-t181": "Sort sanitization by strength: clear overwrites, purge makes recovery infeasible (cryptographic erase, degauss), destroy ruins the media. SSDs cannot be degaussed. Always check legal hold and retention before disposal and keep the certificate of destruction.",
    "d4-t182": "Pick the source by the question: connections = firewall or flow, process activity = endpoint/EDR, who logged in = OS or authentication log, detected attack = IDS/IPS, who/when for files and email = metadata, exact contents = packet capture.",
    "d5-t180": "A good awareness answer emphasizes reporting and a no-blame culture, not punishment. Distinguish risky (deliberate bypass), unexpected (out-of-pattern), and unintentional (honest mistake) behavior, and measure report rate rather than completion alone.",
    "d5-t181": "Who performs it decides the category: control owners = self-assessment, company staff = internal audit, board committee = audit committee oversight, government = regulatory examination, outside accredited firm = independent third-party audit. Attestation is the formal statement.",
    "d5-t182": "Sort any example by its job: what and why = policy, specific measurable requirement = standard, step-by-step instructions = procedure, optional advice = guideline. Playbooks and onboarding checklists are procedures.",
    "d5-t183": "Conflict of interest is solved by disclosure, recusal, and independent evaluation. Due diligence is before signing; monitoring and reassessment follow after; offboarding revokes access and certifies data destruction."
  },

  summaries: {
    "d3-t180": "Data is typed (regulated, trade secret, intellectual property, legal, financial) and labeled by classification (public through restricted and critical), and the label determines how strongly it is protected.",
    "d4-t180": "Identities are proofed, provisioned, reviewed through attestation, and promptly retired, with temporary accounts and short-lived ephemeral credentials limiting exposure.",
    "d4-t181": "Assets are tracked from procurement through ownership and enumeration to decommissioning, where retention is checked, media is cleared, purged, or destroyed, and a certificate of destruction is kept.",
    "d4-t182": "Investigations combine firewall, application, endpoint, OS, IDS/IPS, and network logs with metadata, reports, dashboards, and packet captures, choosing each source for the question it can answer.",
    "d5-t180": "A security awareness program teaches people to recognize and report phishing, spot risky, unexpected, and unintentional behavior, practice OPSEC and situational awareness, and is judged by reporting and incident reduction.",
    "d5-t181": "Audits are formal independent examinations and assessments are broader evaluations; internal audits include self-assessments and audit committee oversight, external ones include regulatory examinations and independent third-party audits, and attestation is the formal assurance.",
    "d5-t182": "Policies state direction, standards state specific requirements, procedures give steps, and guidelines advise, all shaped by regulatory and legal factors and kept current through governance structures and regular review.",
    "d5-t183": "Third-party risk runs through tiering, due diligence with conflict-of-interest controls, contracting, least-privilege onboarding, continuous monitoring, and offboarding that revokes access and certifies data destruction."
  },

  questions: [
    {
      id: "q-x-d3-17", domainId: "d3", tag: "d3-t180", type: "single",
      prompt: "A company's secret manufacturing process gives it a major competitive advantage and is protected by NDAs and strict need-to-know access. Which data type is this?",
      choices: [
        { id: "a", text: "Trade secret" },
        { id: "b", text: "Public data" },
        { id: "c", text: "Regulated health data" },
        { id: "d", text: "Human-readable log data" }
      ],
      correct: "a",
      explanation: "Confidential business information that gives competitive advantage and is protected by secrecy is a trade secret.",
      distractorExplanations: {
        b: "Public data is safe to share and requires no confidentiality protection.",
        c: "Regulated health data is governed by healthcare law and does not describe a manufacturing process.",
        d: "Log data is operational data, not a secret process."
      }
    },
    {
      id: "q-x-d3-18", domainId: "d3", tag: "d3-t180", type: "single",
      prompt: "Who is responsible for deciding the classification level of a data set?",
      choices: [
        { id: "a", text: "The data owner" },
        { id: "b", text: "The data custodian" },
        { id: "c", text: "The help desk" },
        { id: "d", text: "An external attacker" }
      ],
      correct: "a",
      explanation: "The data owner is accountable for the data and decides its classification; the custodian implements the controls.",
      distractorExplanations: {
        b: "The custodian applies and operates protections but does not decide the classification.",
        c: "The help desk supports users and does not set data classification.",
        d: "An attacker has no role in legitimate classification."
      }
    },
    {
      id: "q-x-d4-41", domainId: "d4", tag: "d4-t180", type: "single",
      prompt: "A manager periodically reviews a list of what each employee can access and confirms or removes permissions that are no longer needed. What is this practice called?",
      choices: [
        { id: "a", text: "Attestation (access recertification)" },
        { id: "b", text: "Identity proofing" },
        { id: "c", text: "Federation" },
        { id: "d", text: "Key stretching" }
      ],
      correct: "a",
      explanation: "Attestation is the periodic confirmation by managers or owners that access remains appropriate, which helps catch privilege creep.",
      distractorExplanations: {
        b: "Identity proofing verifies a person's real-world identity before issuing credentials.",
        c: "Federation lets identities be trusted across organizations.",
        d: "Key stretching slows password guessing and is unrelated to access reviews."
      }
    },
    {
      id: "q-x-d4-42", domainId: "d4", tag: "d4-t180", type: "single",
      prompt: "A contractor needs access to one system for 60 days. Which approach BEST limits risk?",
      choices: [
        { id: "a", text: "A temporal account that expires automatically after 60 days" },
        { id: "b", text: "A shared administrator account with no expiry" },
        { id: "c", text: "Using a permanent employee's credentials" },
        { id: "d", text: "No account; send data by email" }
      ],
      correct: "a",
      explanation: "A time-limited account with automatic expiry ensures the access ends when the need ends.",
      distractorExplanations: {
        b: "A shared, non-expiring administrator account violates least privilege and accountability.",
        c: "Using someone else's credentials destroys accountability and is a policy violation.",
        d: "Emailing data bypasses access controls and increases leakage risk."
      }
    },
    {
      id: "q-x-d4-43", domainId: "d4", tag: "d4-t181", type: "single",
      prompt: "A company retires solid-state drives that held sensitive data. Which sanitization method is MOST appropriate for SSDs, in addition to or instead of overwriting?",
      choices: [
        { id: "a", text: "Cryptographic erase or physical destruction" },
        { id: "b", text: "Degaussing" },
        { id: "c", text: "Deleting files and emptying the recycle bin" },
        { id: "d", text: "Reformatting the drive once" }
      ],
      correct: "a",
      explanation: "SSDs store data in flash memory, so cryptographic erase or physical destruction is effective; degaussing does not work on flash.",
      distractorExplanations: {
        b: "Degaussing erases magnetic media and has no effect on flash storage.",
        c: "Deleting files leaves recoverable data.",
        d: "A single quick reformat does not reliably remove data."
      }
    },
    {
      id: "q-x-d4-44", domainId: "d4", tag: "d4-t181", type: "single",
      prompt: "A scan of the network finds several devices that do not appear in the asset inventory. Which activity discovered them?",
      choices: [
        { id: "a", text: "Enumeration" },
        { id: "b", text: "Sanitization" },
        { id: "c", text: "Decommissioning" },
        { id: "d", text: "Procurement" }
      ],
      correct: "a",
      explanation: "Enumeration discovers what assets actually exist on the network, which can then be compared with the inventory.",
      distractorExplanations: {
        b: "Sanitization removes data from media.",
        c: "Decommissioning formally retires assets.",
        d: "Procurement is the process of acquiring assets."
      }
    },
    {
      id: "q-x-d4-45", domainId: "d4", tag: "d4-t182", type: "single",
      prompt: "An investigator needs the exact contents of traffic between a host and a suspicious server to reconstruct a file transfer. Which data source is BEST?",
      choices: [
        { id: "a", text: "Packet capture" },
        { id: "b", text: "Firewall log" },
        { id: "c", text: "NetFlow record" },
        { id: "d", text: "A dashboard" }
      ],
      correct: "a",
      explanation: "Packet captures record the payload of network traffic, allowing reconstruction of transfers if the content is not encrypted.",
      distractorExplanations: {
        b: "A firewall log records connection details, not payload content.",
        c: "NetFlow records metadata about conversations without content.",
        d: "A dashboard summarizes data visually and does not contain packet contents."
      }
    },
    {
      id: "q-x-d4-46", domainId: "d4", tag: "d4-t182", type: "single",
      prompt: "An analyst wants to see the path an email took, which servers handled it, and the SPF and DKIM results. Which data should be examined?",
      choices: [
        { id: "a", text: "Email header metadata" },
        { id: "b", text: "A vulnerability scan report" },
        { id: "c", text: "A DHCP lease table" },
        { id: "d", text: "A backup catalog" }
      ],
      correct: "a",
      explanation: "Email headers contain the delivery path and authentication results, which are metadata about the message.",
      distractorExplanations: {
        b: "A vulnerability scan report lists weaknesses on systems and not email routing.",
        c: "A DHCP lease table shows IP assignments, not email paths.",
        d: "A backup catalog lists backed up data and has no mail routing details."
      }
    },
    {
      id: "q-x-d5-19", domainId: "d5", tag: "d5-t180", type: "single",
      prompt: "An employee receives a suspicious email and uses the report button, then receives a thank-you message and feedback. What is the MAIN benefit of this practice?",
      choices: [
        { id: "a", text: "It encourages reporting and gives the security team early warning" },
        { id: "b", text: "It removes the need for email filtering" },
        { id: "c", text: "It punishes employees who click links" },
        { id: "d", text: "It guarantees no phishing email will ever succeed" }
      ],
      correct: "a",
      explanation: "Easy reporting with feedback builds a reporting culture and gives the SOC early warning about real attacks.",
      distractorExplanations: {
        b: "Reporting complements technical filters and does not replace them.",
        c: "Good programs avoid punishment because it discourages reporting.",
        d: "No program can guarantee that no phishing attempt will succeed."
      }
    },
    {
      id: "q-x-d5-20", domainId: "d5", tag: "d5-t180", type: "single",
      prompt: "An employee accidentally emails a spreadsheet of customer data to the wrong recipient. Which category of anomalous behavior is this?",
      choices: [
        { id: "a", text: "Unintentional" },
        { id: "b", text: "Risky" },
        { id: "c", text: "Malicious insider" },
        { id: "d", text: "Unexpected request" }
      ],
      correct: "a",
      explanation: "An honest mistake without intent to cause harm is unintentional behavior, best addressed by training, safer defaults, and prompt reporting.",
      distractorExplanations: {
        b: "Risky behavior involves deliberately or carelessly bypassing security controls.",
        c: "A malicious insider acts with harmful intent, which is not described.",
        d: "An unexpected request is an unusual ask from someone else, not the employee's own mistake."
      }
    },
    {
      id: "q-x-d5-21", domainId: "d5", tag: "d5-t181", type: "single",
      prompt: "A board-level committee that is independent of management and oversees internal audit and the handling of audit findings is called what?",
      choices: [
        { id: "a", text: "Audit committee" },
        { id: "b", text: "Change advisory board" },
        { id: "c", text: "Incident response team" },
        { id: "d", text: "Help desk" }
      ],
      correct: "a",
      explanation: "The audit committee is a board committee independent of management that oversees audit activities and findings.",
      distractorExplanations: {
        b: "A change advisory board reviews and approves operational changes.",
        c: "An incident response team handles security incidents.",
        d: "The help desk provides user support."
      }
    },
    {
      id: "q-x-d5-22", domainId: "d5", tag: "d5-t181", type: "single",
      prompt: "A regulator visits a bank to inspect its compliance with financial security rules. What type of audit is this?",
      choices: [
        { id: "a", text: "External regulatory examination" },
        { id: "b", text: "Internal self-assessment" },
        { id: "c", text: "Penetration test with a red team" },
        { id: "d", text: "Tabletop exercise" }
      ],
      correct: "a",
      explanation: "An inspection performed by a regulator to check legal compliance is an external regulatory examination.",
      distractorExplanations: {
        b: "A self-assessment is performed by the organization's own control owners.",
        c: "A penetration test simulates attacks and is not a compliance inspection by a regulator.",
        d: "A tabletop exercise is a discussion-based drill."
      }
    },
    {
      id: "q-x-d5-23", domainId: "d5", tag: "d5-t182", type: "single",
      prompt: "A document states that passwords must be at least 14 characters and accounts lock after five failed attempts. Which tier of governance documentation is this?",
      choices: [
        { id: "a", text: "Standard" },
        { id: "b", text: "Policy" },
        { id: "c", text: "Guideline" },
        { id: "d", text: "Playbook" }
      ],
      correct: "a",
      explanation: "A standard defines specific, mandatory, measurable requirements that implement a policy.",
      distractorExplanations: {
        b: "A policy is a high-level statement of intent and does not typically list exact lengths.",
        c: "A guideline is optional advice, not mandatory requirements.",
        d: "A playbook gives step-by-step responses to scenarios such as incidents."
      }
    },
    {
      id: "q-x-d5-24", domainId: "d5", tag: "d5-t182", type: "single",
      prompt: "Step-by-step instructions that explain how to onboard a new employee, including creating accounts and assigning equipment, are an example of which document type?",
      choices: [
        { id: "a", text: "Procedure" },
        { id: "b", text: "Policy" },
        { id: "c", text: "Standard" },
        { id: "d", text: "Guideline" }
      ],
      correct: "a",
      explanation: "A procedure is a mandatory, detailed, step-by-step set of instructions for performing a task.",
      distractorExplanations: {
        b: "A policy is a high-level statement of requirements and intent.",
        c: "A standard states specific requirements rather than the steps for a task.",
        d: "A guideline is optional advice."
      }
    },
    {
      id: "q-x-d5-25", domainId: "d5", tag: "d5-t183", type: "single",
      prompt: "A procurement manager evaluating vendors discloses that a close relative is a senior employee at one of the bidders. What is the MOST appropriate action?",
      choices: [
        { id: "a", text: "Recuse the manager from the evaluation and decision" },
        { id: "b", text: "Allow the manager to decide because disclosure was made" },
        { id: "c", text: "Choose the relative's company to avoid awkwardness" },
        { id: "d", text: "Hide the relationship from the selection committee" }
      ],
      correct: "a",
      explanation: "Recusal removes the conflicted person from the decision so the selection remains fair and independent.",
      distractorExplanations: {
        b: "Disclosure alone does not remove the conflict; the person should step aside.",
        c: "Favoring the relative's company is a clear conflict of interest.",
        d: "Hiding the relationship worsens the conflict and breaches ethics rules."
      }
    },
    {
      id: "q-x-d5-26", domainId: "d5", tag: "d5-t183", type: "single",
      prompt: "A vendor contract has ended. Which action is MOST important to complete during offboarding?",
      choices: [
        { id: "a", text: "Revoke the vendor's access and obtain certification that company data was returned or destroyed" },
        { id: "b", text: "Keep vendor accounts active in case they return" },
        { id: "c", text: "Leave the vendor VPN tunnel configured" },
        { id: "d", text: "Delete the contract record from the files" }
      ],
      correct: "a",
      explanation: "Offboarding must remove the vendor's access and ensure that data is returned or securely destroyed, with evidence.",
      distractorExplanations: {
        b: "Leaving accounts active creates an unmonitored access path.",
        c: "An unused vendor VPN tunnel is an unnecessary exposure.",
        d: "Deleting the contract record removes evidence needed for audits and disputes."
      }
    }
  ],

  glossary: [
    { term: "Trade Secret", domain: "d3", plain: "Secret business information that gives you an edge.", technical: "Confidential business information providing competitive advantage that remains protected as long as it is kept secret.", example: "A proprietary recipe or algorithm." },
    { term: "Identity Proofing", domain: "d4", plain: "Checking that a person is really who they say they are before giving them an account.", technical: "The process of verifying a claimed identity using documents, knowledge, or in-person checks before issuing credentials.", example: "Verifying a government ID for a new administrator." },
    { term: "Attestation", domain: "d4", plain: "A formal statement or confirmation that something is true.", technical: "In access management, periodic confirmation that access is still needed; in audit, a formal assurance or opinion about controls.", example: "A manager recertifying team access every quarter." },
    { term: "Temporal Account", domain: "d4", plain: "A temporary account that stops working on its own.", technical: "An account created for a limited period with an automatic expiration.", example: "A 60-day contractor account." },
    { term: "Ephemeral Credential", domain: "d4", plain: "A password or token that is valid for a very short time.", technical: "A short-lived credential issued for a session or task that expires automatically.", example: "A cloud token valid for one hour." },
    { term: "Enumeration", domain: "d4", plain: "Discovering what is actually on your network.", technical: "Identifying and listing assets, services, or accounts present in an environment.", example: "A scan that finds unlisted devices." },
    { term: "Cryptographic Erase", domain: "d4", plain: "Making encrypted data unreadable by destroying the key.", technical: "A sanitization method that deletes encryption keys so encrypted data cannot be recovered.", example: "Wiping an encrypted SSD by destroying its key." },
    { term: "Metadata", domain: "d4", plain: "Information about data, like who made a file and when.", technical: "Data that describes other data, such as email headers or file timestamps.", example: "The Received lines in an email header." },
    { term: "OPSEC", domain: "d5", plain: "Not revealing information that helps an attacker.", technical: "Operational security: identifying and protecting information that adversaries could combine to harm an organization.", example: "Not posting travel plans and project details online." },
    { term: "Situational Awareness", domain: "d5", plain: "Noticing what is going on around you.", technical: "Awareness of one's surroundings and context to recognize threats such as tailgating or suspicious behavior.", example: "Spotting someone without a badge following you in." },
    { term: "Audit Committee", domain: "d5", plain: "A board group that oversees audits independently.", technical: "A board-level committee independent of management that oversees internal and external audit and financial reporting.", example: "Reviewing internal audit findings each quarter." },
    { term: "Conflict of Interest", domain: "d5", plain: "When personal interests could sway a business decision.", technical: "A situation in which an individual's personal interests could improperly influence their professional judgment.", example: "Choosing a vendor owned by a relative." },
    { term: "Guideline", domain: "d5", plain: "Optional advice on how to do something well.", technical: "A recommended, non-mandatory practice that supports policies and standards.", example: "Tips for creating memorable passphrases." }
  ],

  acronyms: [
    { acro: "CMDB", expansion: "Configuration Management Database", meaning: "A database of assets and their relationships." },
    { acro: "JML", expansion: "Joiner-Mover-Leaver", meaning: "The lifecycle of an identity as a person joins, changes roles, and leaves." },
    { acro: "PII", expansion: "Personally Identifiable Information", meaning: "Data that can identify a specific individual." },
    { acro: "PHI", expansion: "Protected Health Information", meaning: "Health data about an individual protected by law." },
    { acro: "CUI", expansion: "Controlled Unclassified Information", meaning: "Sensitive government information that is not classified but requires protection." },
    { acro: "OPSEC", expansion: "Operational Security", meaning: "Protecting information that adversaries could use to cause harm." },
    { acro: "AUP", expansion: "Acceptable Use Policy", meaning: "A policy defining acceptable use of organizational systems and data." },
    { acro: "IAL", expansion: "Identity Assurance Level", meaning: "NIST measure of confidence in a claimed identity." }
  ]
});
