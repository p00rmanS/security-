/* Gap-closing lessons, round 4, part A (Domains 1-2). Written against the
   Exam Blueprint checker (data-objectives.js): each lesson fills topics the
   checker flagged as missing or thin. Ids use the t18x range. Registers a
   bundle on globalThis.__DEEP; data-lessons-merge.js merges it.
   All names and addresses in examples are fictional. */

(globalThis.__DEEP = globalThis.__DEEP || []).push({
  lessons: {
    d1: [
      {
        id: "d1-t180",
        title: "Classifying Security Controls: A Method and 20 Worked Examples",
        tag: "1.1",
        minutes: 22,
        goal: "Classify any control by its category and its type using a two-question method, and handle the tricky cases the exam likes.",
        why: "Control classification is the first thing the exam tests and it reappears everywhere. Both the matching-style performance questions and scenario questions reward a reliable method more than memorization.",
        simple:
          "Every control has two independent labels. The CATEGORY says what the control is made of or who runs it: TECHNICAL (implemented with technology, such as a firewall or encryption), MANAGERIAL (a decision, plan, or policy made by management, such as a risk assessment or a security policy), OPERATIONAL (carried out day to day by people following a process, such as security awareness training, log review, or job rotation), and PHYSICAL (a tangible barrier or device in the real world, such as a fence, lock, or camera). The TYPE says what the control does in relation to an incident: PREVENTIVE (stops it from happening), DETERRENT (discourages an attempt without physically stopping it), DETECTIVE (notices that something is happening or has happened), CORRECTIVE (limits damage and restores things afterward), COMPENSATING (an alternative that meets the need when the normal control cannot be used), and DIRECTIVE (tells people what they must or must not do). Use two questions. Question one, for the category: is it technology, a management decision or document, a human routine, or a physical object? Question two, for the type: does it act before, discourage, detect, repair, substitute, or instruct? Most controls can be described by one category and one type, but the same control may legitimately serve more than one purpose, so read what the question emphasizes. A camera is physical; if the question stresses that people see it and think twice, it is deterrent, and if it stresses recording an event after the fact, it is detective. The traps: PREVENTIVE blocks while DETERRENT only discourages; DETECTIVE finds while CORRECTIVE fixes; DIRECTIVE instructs people, while PREVENTIVE technically blocks; and COMPENSATING appears only when a primary control is impractical (for example, segmenting an unpatchable legacy system).",
        deepDive: [
          { h: "Twenty classification examples", list: [
            "Network firewall blocking port 23: technical, preventive.",
            "Intrusion detection system raising alerts: technical, detective.",
            "Antivirus quarantining a file: technical, corrective.",
            "Restoring data from backup after ransomware: technical (or operational), corrective.",
            "Full-disk encryption on laptops: technical, preventive.",
            "Honeypot that records attacker activity: technical, detective (and deterrent).",
            "Security policy that prohibits sharing passwords: managerial, directive.",
            "Acceptable use policy: managerial, directive.",
            "Risk assessment performed each year: managerial, (preventive/detective in nature).",
            "Security awareness training: operational, preventive.",
            "Reviewing logs each morning: operational, detective.",
            "Job rotation and mandatory vacations: operational, detective.",
            "Separation of duties for payments: operational (or managerial), preventive.",
            "Fence around a data center: physical, preventive.",
            'A "Premises monitored by CCTV" sign: physical, deterrent.',
            "Security camera recording an entrance: physical, detective.",
            "Exterior lighting: physical, deterrent.",
            "Locked server cage with a badge reader: physical, preventive.",
            "Network segmentation used because a legacy server cannot be patched: technical, compensating.",
            "Requiring a manager's signature when MFA cannot be deployed: operational, compensating."
          ] },
          { h: "Ambiguous cases and how to decide", list: [
            "Security guard: physical presence, but performed by people. If the question says the guard checks badges, think preventive; if it says the guard is a visible reminder, think deterrent.",
            "Incident response plan: a managerial document (directive) whose execution corrects damage (corrective).",
            "Patch management: a technical activity often described as preventive (and corrective for known flaws).",
            "Biometric door lock: physical and technical; the exam usually asks you to pick the label the scenario highlights."
          ] },
          { h: "Why both labels matter", p: "Category tells you who must own and operate the control and how it fails (technology fails differently from people). Type tells you where it sits on the timeline of an incident. A balanced program has controls of every type: prevention reduces incidents, detection finds the rest, correction limits the damage, deterrence reduces attempts, directive controls set expectations, and compensating controls close known gaps." }
        ],
        keyTerms: [
          { term: "Technical Control", def: "A control implemented through technology." },
          { term: "Managerial Control", def: "A control based on management decisions, planning, and policy." },
          { term: "Operational Control", def: "A control performed by people following routine processes." },
          { term: "Physical Control", def: "A control using tangible barriers or devices in the physical world." },
          { term: "Preventive Control", def: "Stops an incident from occurring." },
          { term: "Deterrent Control", def: "Discourages an attempt without physically stopping it." },
          { term: "Detective Control", def: "Identifies that an incident is occurring or has occurred." },
          { term: "Corrective Control", def: "Limits damage and restores normal operation after an incident." },
          { term: "Compensating Control", def: "An alternative control used when the primary one cannot be applied." },
          { term: "Directive Control", def: "Instructs people on required or prohibited behavior." }
        ],
        analogy:
          "Think of a bank. The vault door is a physical, preventive control. The sign on the door warning of cameras is physical and deterrent. The camera is physical and detective. The rule book given to tellers is managerial and directive. The daily checking of the cash drawer is operational and detective. The insurance claim after a robbery helps correct the loss. And if the vault door is broken, the extra guard standing in front of it while it is repaired is a compensating control.",
        technical:
          "A company wants to protect an old manufacturing server that cannot be patched. It places the server in an isolated network segment behind a firewall that allows only one needed protocol (technical, compensating), documents the exception and review date in a risk register (managerial), assigns a technician to review the server's logs each shift (operational, detective), and locks the server in a cabinet with a badge reader (physical, preventive).",
        table: {
          headers: ["Question to ask", "If the answer is...", "Then it is..."],
          rows: [
            ["What is it made of or who runs it?", "Technology", "Technical"],
            ["", "A management decision or document", "Managerial"],
            ["", "People following a routine", "Operational"],
            ["", "A physical barrier or device", "Physical"],
            ["When does it act?", "Before, by blocking", "Preventive"],
            ["", "Before, by discouraging", "Deterrent"],
            ["", "During or after, by noticing", "Detective"],
            ["", "After, by repairing", "Corrective"],
            ["", "Instead of the normal control", "Compensating"],
            ["", "By telling people what to do", "Directive"]
          ]
        },
        confusion: [
          { a: "Preventive", b: "Deterrent", diff: "Preventive controls actually stop the action (a locked door). Deterrent controls only make an attacker think twice (a warning sign)." },
          { a: "Detective", b: "Corrective", diff: "Detective controls find out something happened. Corrective controls fix or limit the damage afterward." },
          { a: "Directive", b: "Preventive", diff: "Directive controls tell people what to do (a policy). Preventive controls physically or technically stop it from happening." },
          { a: "Managerial", b: "Operational", diff: "Managerial controls are decisions and plans made by leadership. Operational controls are the day-to-day activities people perform." },
          { a: "Compensating", b: "Corrective", diff: "Compensating controls substitute for a control that cannot be used. Corrective controls repair after an incident." }
        ],
        soc: "Analysts use the same vocabulary when reporting on defenses: 'Our preventive technical controls failed to stop the phish, our detective controls caught it in six minutes, and the corrective playbook contained it.' Balanced reporting across types shows where the program is thin.",
        patterns: [
          ["Firewall rule blocking a port", "Technical, preventive"],
          ["Alert on suspicious logins", "Technical, detective"],
          ["Company policy requires MFA", "Managerial, directive"],
          ["Training users to spot phishing", "Operational, preventive"],
          ["Warning signs and visible cameras", "Physical, deterrent"],
          ["Restoring from backup after an attack", "Corrective"],
          ["Alternative safeguard because patching is impossible", "Compensating"],
          ["Daily review of access logs by staff", "Operational, detective"]
        ],
        takeaways: [
          "Always give a control two labels: category and type.",
          "Prevent blocks, deter discourages, detect notices, correct repairs, compensate substitutes, direct instructs.",
          "Read what the question emphasizes when a control fits more than one type."
        ],
        remember: [
          "Categories: technical, managerial, operational, physical.",
          "Types: preventive, deterrent, detective, corrective, compensating, directive.",
          "Preventive stops it. Deterrent discourages it. Detective notices it. Corrective fixes it. Compensating substitutes. Directive instructs.",
          "Policies and risk assessments are managerial; routines performed by people are operational.",
          "Fences and locks are physical preventive; signs and visible cameras are physical deterrent; recording cameras are physical detective.",
          "Compensating means the normal control is not possible.",
          "The same control can have more than one type; follow the question's emphasis."
        ],
        taglish:
          "Dalawang tanong lang: Anong kategorya (technical, managerial, operational, physical)? At anong uri (preventive, deterrent, detective, corrective, compensating, directive)? Ang preventive, hinaharang talaga. Ang deterrent, pinapaisip lang ang attacker (hal. warning sign). Ang detective, nakakapansin. Ang corrective, nag-aayos pagkatapos. Ang compensating, kapalit kapag hindi magagamit ang karaniwang control. At ang directive, nag-uutos sa tao (policy). Kapag pwedeng dalawa ang sagot, tingnan kung ano ang binibigyang-diin ng tanong."
      },
      {
        id: "d1-t181",
        title: "Fundamental Concepts in Depth: CIA, AAA, Non-Repudiation, Gap Analysis, and Zero Trust Planes",
        tag: "1.2",
        minutes: 24,
        goal: "Explain confidentiality, integrity, availability, non-repudiation, authentication, authorization, accounting, gap analysis, and the control-plane and data-plane components of zero trust.",
        why: "Objective 1.2 is the conceptual core of the exam. Its terms are used throughout every later domain, and the zero trust vocabulary (policy engine, policy administrator, policy enforcement point) is easy to confuse without seeing how the pieces fit.",
        simple:
          "The CIA TRIAD is the set of three goals security protects. CONFIDENTIALITY means only authorized parties can read information (encryption, access control, classification). INTEGRITY means information is accurate and unchanged except by authorized parties (hashing, digital signatures, version control, change control). AVAILABILITY means systems and data are accessible when needed (redundancy, backups, DDoS protection, patching). NON-REPUDIATION means a party cannot credibly deny having performed an action, supported by digital signatures and tamper-resistant audit logs. AAA describes access in three steps. AUTHENTICATION proves identity, of people (passwords, MFA, biometrics) and of systems (certificates, tokens). AUTHORIZATION decides what the authenticated identity may do, using a model such as discretionary, mandatory, role-based, or attribute-based access control. ACCOUNTING (also auditing) records what was done, by whom, and when, creating the logs that support investigation and accountability. A GAP ANALYSIS compares the current state with a desired state, such as a framework, regulation, or target maturity level, then lists the differences and a plan to close them. The steps are: define the target, assess the current state, identify gaps, prioritize them by risk, and plan and track remediation. ZERO TRUST is a model that assumes no implicit trust based on network location; every access request is verified. Its logical architecture has two planes. The CONTROL PLANE makes decisions. Its parts are ADAPTIVE IDENTITY (authentication that adapts to risk signals such as device health and location), THREAT SCOPE REDUCTION (limiting the paths an attacker could use by minimizing access and exposure), POLICY-DRIVEN ACCESS CONTROL (access decided by defined policy rather than ad hoc), the POLICY ENGINE (evaluates each request against policy, trust signals, and context and decides allow or deny), and the POLICY ADMINISTRATOR (carries out the engine's decision by establishing or tearing down the session and instructing the enforcement point). The DATA PLANE carries the actual traffic. It includes the SUBJECT or SYSTEM requesting access, IMPLICIT TRUST ZONES (the area behind the enforcement point where traffic can flow once a request is approved), and the POLICY ENFORCEMENT POINT (the gateway that enables, monitors, and ends connections as directed). In short: the engine decides, the administrator instructs, and the enforcement point enforces.",
        deepDive: [
          { h: "CIA with controls and failures", list: [
            "Confidentiality: encryption, least privilege, classification, DLP. Failure example: a database exposed publicly.",
            "Integrity: hashing, digital signatures, change control, file integrity monitoring. Failure example: tampered financial figures.",
            "Availability: redundancy, backups, load balancing, DDoS mitigation. Failure example: ransomware stops operations."
          ] },
          { h: "Authentication versus authorization versus accounting", list: [
            "Authentication: 'Who are you?' (password, MFA, certificate).",
            "Authorization: 'What may you do?' (role, attribute, policy).",
            "Accounting: 'What did you do?' (logs, audit trails, session records).",
            "Authenticating systems matters too: devices and services prove identity with certificates or tokens.",
            "Common protocols: RADIUS and TACACS+ provide AAA for network access and device administration."
          ] },
          { h: "Authorization models at a glance", list: [
            "Discretionary (DAC): the owner decides.",
            "Mandatory (MAC): the system enforces labels and clearances.",
            "Role-based (RBAC): access follows job role.",
            "Attribute-based (ABAC): access follows attributes of user, resource, and environment.",
            "Rule-based: fixed rules such as time of day or network address."
          ] },
          { h: "Running a gap analysis", list: [
            "Choose the target: a framework (NIST CSF, ISO 27001), a regulation, or an internal standard.",
            "Assess the current state with evidence: interviews, documentation, technical checks.",
            "List gaps with their risk and the effort to fix them.",
            "Prioritize and assign owners and deadlines.",
            "Repeat periodically to track progress."
          ] },
          { h: "Zero trust planes in one scenario", p: "A user on a laptop requests access to an HR application. The request reaches the policy enforcement point, which asks the policy engine for a decision. The engine checks the user's identity and role, the device's health, the location, and the sensitivity of the application. If policy is satisfied, it approves; the policy administrator then tells the enforcement point to open a session to that one application. The user can reach only that app (threat scope reduction), and the session is monitored and ended if risk changes (adaptive identity). Nothing is trusted simply because the user is inside the office network." }
        ],
        keyTerms: [
          { term: "Confidentiality", def: "Ensuring information is accessible only to authorized parties." },
          { term: "Integrity", def: "Ensuring information is accurate and unaltered by unauthorized changes." },
          { term: "Availability", def: "Ensuring systems and data are accessible when needed." },
          { term: "Non-Repudiation", def: "Preventing a party from credibly denying an action they performed." },
          { term: "AAA", def: "Authentication, Authorization, and Accounting." },
          { term: "Gap Analysis", def: "Comparing current state to a desired state and identifying the differences." },
          { term: "Policy Engine", def: "Zero trust component that evaluates requests and decides to allow or deny." },
          { term: "Policy Administrator", def: "Zero trust component that carries out the engine's decision by setting up or ending sessions." },
          { term: "Policy Enforcement Point", def: "The gateway in the data plane that enables, monitors, and terminates connections." },
          { term: "Adaptive Identity", def: "Authentication that adjusts to risk signals such as device posture and location." },
          { term: "Threat Scope Reduction", def: "Limiting the access and exposure available to an attacker." },
          { term: "Implicit Trust Zone", def: "The area behind the enforcement point where approved traffic flows." }
        ],
        analogy:
          "Zero trust is an airport. The policy engine is the security supervisor who decides whether you may fly, using your ticket, ID, and risk profile. The policy administrator is the agent who issues your boarding pass and tells the gate staff. The policy enforcement point is the gate itself, which lets you through only to your flight and can stop you at any moment. Once through, you are in a controlled zone (the implicit trust zone), but you cannot wander onto other planes (threat scope reduction).",
        technical:
          "A company moves from a VPN that gives remote users broad network access to a zero trust model. Users authenticate through the identity provider, which checks MFA and device compliance (adaptive identity). A cloud gateway acts as the policy enforcement point; each request is evaluated by the policy engine against role and device posture, and the policy administrator provisions a short-lived, per-application connection. Compromised credentials alone no longer expose the whole network, because each app is a separate decision. The security team also runs a gap analysis against the NIST Cybersecurity Framework and finds that logging coverage (Detect) is weaker than access control (Protect), which drives the next budget.",
        table: {
          headers: ["Zero trust part", "Plane", "Role"],
          rows: [
            ["Policy engine", "Control", "Decides allow or deny using policy and context"],
            ["Policy administrator", "Control", "Establishes or terminates the session per the decision"],
            ["Adaptive identity", "Control", "Risk-based authentication"],
            ["Threat scope reduction", "Control", "Minimize reachable resources"],
            ["Policy-driven access control", "Control", "Access determined by defined policy"],
            ["Policy enforcement point", "Data", "Enforces the decision on the traffic path"],
            ["Subject / system", "Data", "The user or device requesting access"],
            ["Implicit trust zone", "Data", "Area where approved traffic flows"]
          ]
        },
        confusion: [
          { a: "Authentication", b: "Authorization", diff: "Authentication proves who you are. Authorization decides what you may do. Authentication always comes first." },
          { a: "Authorization", b: "Accounting", diff: "Authorization grants rights. Accounting records what was actually done with them." },
          { a: "Policy engine", b: "Policy enforcement point", diff: "The engine DECIDES. The enforcement point ENFORCES the decision on the traffic." },
          { a: "Policy engine", b: "Policy administrator", diff: "The engine makes the decision. The administrator executes it by setting up or tearing down the connection." },
          { a: "Integrity", b: "Non-repudiation", diff: "Integrity means data was not altered. Non-repudiation means the sender cannot deny sending it; digital signatures provide both." }
        ],
        soc: "Accounting is the SOC's raw material: without authenticated identities and complete audit logs, investigations stall. Zero trust adds rich telemetry because every request is evaluated: denied requests and risk-score changes become detection signals. Gap analysis results help the SOC argue for investment in the weakest areas.",
        patterns: [
          ["Only authorized parties can read the data", "Confidentiality"],
          ["Data was changed without authorization", "Integrity violation"],
          ["Service is down and users cannot work", "Availability violation"],
          ["Signer cannot deny signing", "Non-repudiation (digital signature)"],
          ["Compare the current controls with a framework and list differences", "Gap analysis"],
          ["Component that decides allow or deny in zero trust", "Policy engine"],
          ["Component that executes the decision and opens or closes the session", "Policy administrator"],
          ["Gateway that enforces access on the data path", "Policy enforcement point"]
        ],
        takeaways: [
          "CIA names the three goals; non-repudiation and AAA support them.",
          "Zero trust separates decision (control plane) from enforcement (data plane).",
          "A gap analysis turns a target into a prioritized to-do list."
        ],
        remember: [
          "CIA: confidentiality (secret), integrity (unchanged), availability (accessible).",
          "Non-repudiation: cannot deny; digital signatures and audit logs.",
          "AAA: authenticate (who), authorize (what), account (what happened).",
          "Gap analysis: target vs current, then prioritize and remediate.",
          "Zero trust control plane: adaptive identity, threat scope reduction, policy-driven access control, policy engine, policy administrator.",
          "Zero trust data plane: subject/system, implicit trust zones, policy enforcement point.",
          "Engine decides, administrator instructs, enforcement point enforces."
        ],
        taglish:
          "Ang CIA: confidentiality (sikreto), integrity (hindi nabago), availability (magagamit). Ang non-repudiation, hindi maitatanggi ng gumawa. Ang AAA: authentication (sino ka), authorization (ano ang pwede mo), accounting (ano ang ginawa mo). Ang gap analysis, ihambing ang kasalukuyan sa target at ilista ang kulang. Sa zero trust: ang policy engine ang nagdedesisyon, ang policy administrator ang nagpapatupad (nagbubukas o nagsasara ng session), at ang policy enforcement point ang tagabantay sa daan ng data. Walang pinagkakatiwalaan dahil lang nasa loob ng network."
      },
      {
        id: "d1-t182",
        title: "Change Management Walkthrough: From Request to Rollback",
        tag: "1.3",
        minutes: 20,
        goal: "Follow a change through approval, testing, scheduling, implementation, backout, and documentation, and describe its technical security implications.",
        why: "Unmanaged change is a major cause of outages and security gaps. The exam names each stage (approval, impact analysis, test results, backout plan, maintenance window) and the technical side effects (restarts, downtime, dependencies), so a walkthrough makes them stick.",
        simple:
          "Change management is the controlled process for modifying systems so that changes are reviewed, tested, scheduled, and reversible. Most organizations classify changes. A STANDARD change is low-risk, routine, and pre-approved (adding a user to a group). A NORMAL change follows the full process. An EMERGENCY change is expedited to fix an urgent problem, such as a critical zero-day vulnerability, with a faster approval and a review afterward. The process moves through stages. A change is requested and recorded with its purpose and OWNER (the person accountable). An IMPACT ANALYSIS identifies which systems, users, and security controls could be affected and what the risks are. The request goes to an APPROVAL authority, often a change advisory board, representing the STAKEHOLDERS who depend on the system. The change is tested in a non-production environment and the TEST RESULTS are recorded. A BACKOUT (rollback) PLAN describes exactly how to return to the previous state if the change fails. The change is scheduled in a MAINTENANCE WINDOW, when impact is lowest, and stakeholders are notified. It is implemented following a STANDARD OPERATING PROCEDURE, verified, and closed with DOCUMENTATION: updated network diagrams, configuration records, policies, and procedures, with VERSION CONTROL so earlier configurations can be retrieved. Technical implications deserve attention. Changing ALLOW LISTS or DENY LISTS (firewall rules, application control) can open exposure or block legitimate work. Some activities are RESTRICTED (not permitted during business hours or without approval). A change can require DOWNTIME, a SERVICE restart, or an APPLICATION restart. LEGACY applications may not tolerate updates, and DEPENDENCIES between systems mean a change in one place can break another. Unauthorized changes bypass all of this, causing outages, hidden vulnerabilities, and audit failures, which is why change monitoring and configuration baselines detect drift.",
        deepDive: [
          { h: "Worked example: a firewall rule change", list: [
            "Request: allow the new payroll service to reach the database on port 1433; owner is the payroll manager.",
            "Impact analysis: affects the payroll service and the database; risk is exposing the database port; mitigations are source address restriction and logging.",
            "Approval: the change advisory board approves with the stakeholders from finance and security.",
            "Testing: the rule is tested in staging and results documented.",
            "Backout plan: save the current configuration and prepare a command to remove the rule.",
            "Schedule: Saturday 2 to 4 a.m. maintenance window, with notification to stakeholders.",
            "Implement and verify: apply per procedure; confirm payroll works and nothing else changed.",
            "Document and close: update the network diagram, the rule documentation, and the configuration repository."
          ] },
          { h: "Standard, normal, and emergency changes", list: [
            "Standard: pre-approved, repeatable, low-risk.",
            "Normal: assessed and approved each time.",
            "Emergency: urgent fix; fast-track approval and a mandatory post-implementation review.",
            "Even emergencies need a record and a backout plan."
          ] },
          { h: "Technical implications to anticipate", list: [
            "Allow/deny list changes: confirm exposure and business impact.",
            "Restricted activities: respect freeze periods and approval limits.",
            "Downtime and restarts: plan for service interruption and session loss.",
            "Legacy applications: verify compatibility; some cannot be changed without vendor involvement.",
            "Dependencies: map which systems rely on the one being changed.",
            "Documentation and version control: update diagrams and policies; keep configuration history for rollback and audit."
          ] },
          { h: "Why security cares", list: [
            "Changes can weaken controls (opening a port, disabling logging) if not reviewed.",
            "Unauthorized changes may indicate an attacker or a policy violation.",
            "Patching is a change and must go through the process, with expedited paths for urgent security fixes.",
            "Records prove due diligence to auditors and support incident investigation."
          ] }
        ],
        keyTerms: [
          { term: "Change Advisory Board (CAB)", def: "A group that reviews and approves significant changes." },
          { term: "Standard Change", def: "A low-risk, routine, pre-approved change." },
          { term: "Emergency Change", def: "An expedited change made to resolve an urgent issue." },
          { term: "Impact Analysis", def: "Assessment of how a change could affect systems, users, and security." },
          { term: "Backout Plan", def: "Steps to return to the prior state if a change fails." },
          { term: "Maintenance Window", def: "A scheduled period for making changes with minimal disruption." },
          { term: "Standard Operating Procedure (SOP)", def: "A documented step-by-step method for performing a task consistently." },
          { term: "Version Control", def: "Tracking changes to files or configurations so earlier versions can be restored." },
          { term: "Configuration Drift", def: "Gradual deviation of a system from its approved configuration." },
          { term: "Dependency", def: "A relationship in which one system relies on another to function." }
        ],
        analogy:
          "Changing a production system is like renovating a hospital wing. You do not start knocking down walls on a Tuesday afternoon. You plan, check which rooms and pipes depend on the wall, get approvals, rehearse the work, schedule it for a quiet night, keep a plan to put everything back, and update the building plans afterward.",
        technical:
          "An administrator is asked to apply a critical operating system patch to a payment server. As an emergency change, a quick approval is obtained from the on-call manager, the patch is tested on a clone, the previous system snapshot is kept as the backout plan, and the update is applied during a short window with the payment team on standby. The patch requires a restart that interrupts connections for four minutes, and a legacy reporting tool that depends on an older library fails afterward; the team uses the backout plan to restore service while the vendor supplies a fix. The change record, test results, and lessons learned are saved, and the baseline documentation is updated.",
        table: {
          headers: ["Stage", "Question it answers", "Artifact"],
          rows: [
            ["Request and ownership", "What and who is accountable?", "Change request with owner"],
            ["Impact analysis", "What could break or be exposed?", "Risk and dependency assessment"],
            ["Approval", "Who agrees, including stakeholders?", "Approval record"],
            ["Testing", "Does it work safely?", "Test results"],
            ["Backout plan", "How do we undo it?", "Rollback procedure and backups"],
            ["Maintenance window", "When is it least disruptive?", "Schedule and notifications"],
            ["Implementation (SOP)", "How is it done consistently?", "Procedure and change log"],
            ["Documentation and version control", "What changed and where is the record?", "Updated diagrams, policies, config history"]
          ]
        },
        confusion: [
          { a: "Backout plan", b: "Disaster recovery plan", diff: "A backout plan reverses one failed change. A disaster recovery plan restores services after a major disruption." },
          { a: "Standard change", b: "Emergency change", diff: "Standard changes are routine and pre-approved. Emergency changes are urgent, expedited, and reviewed afterward." },
          { a: "Impact analysis", b: "Test results", diff: "Impact analysis predicts effects before testing. Test results show what actually happened in a non-production trial." },
          { a: "Maintenance window", b: "Restricted activity", diff: "A maintenance window is the time when changes are allowed. A restricted activity is something that may not be done without special approval or at certain times." },
          { a: "Documentation", b: "Version control", diff: "Documentation explains the system and the change. Version control stores the actual earlier versions so they can be restored." }
        ],
        soc: "Change records are a detection resource: when an alert fires for a new firewall rule or a service restart at 2 a.m., analysts check whether a matching approved change exists. Unmatched changes are treated as suspicious. Responders also use configuration history to see exactly what an attacker altered.",
        patterns: [
          ["Routine, low-risk, pre-approved change", "Standard change"],
          ["Urgent patch for an actively exploited flaw", "Emergency change with after-the-fact review"],
          ["Steps to return to the previous configuration if the change fails", "Backout plan"],
          ["Time chosen to minimize business disruption", "Maintenance window"],
          ["Group that reviews and approves changes", "Change advisory board"],
          ["Change breaks another system that relies on it", "Dependency not identified in impact analysis"],
          ["Updated network diagram after a change", "Documentation requirement"],
          ["Unapproved change detected on a server", "Configuration drift or unauthorized change; investigate"]
        ],
        takeaways: [
          "Every change needs an owner, impact analysis, approval, testing, a backout plan, a window, and documentation.",
          "Know the technical side effects: restarts, downtime, dependencies, legacy systems, and list changes.",
          "Emergency changes are faster, not exempt from records and review."
        ],
        remember: [
          "Stages: request/owner, impact analysis, approval (stakeholders), test results, backout plan, maintenance window, SOP, documentation/version control.",
          "Change types: standard (pre-approved), normal, emergency (expedited, reviewed afterward).",
          "Technical implications: allow/deny lists, restricted activities, downtime, service and application restarts, legacy applications, dependencies.",
          "Always have a backout plan before implementing.",
          "Update diagrams, policies, and procedures after the change; keep version history.",
          "Unauthorized changes cause outages and security gaps; detect drift against baselines.",
          "Patches are changes too."
        ],
        taglish:
          "Ang change management ay kontroladong paraan ng pagbabago sa sistema. Mga hakbang: request na may may-ari, impact analysis (ano ang maaapektuhan), approval kasama ang stakeholders, testing (resulta ng test), backout plan (paano ibabalik kung pumalpak), maintenance window (oras na pinakamaliit ang abala), pagsunod sa SOP, at documentation (update ng diagram at policy, may version control). Tatlong uri: standard (pre-approved), normal, at emergency (mabilis pero rerepasuhin pagkatapos). Mag-ingat sa restart, downtime, legacy application, at dependencies, kasi pwedeng masira ang ibang sistema."
      }
    ],

    d2: [
      {
        id: "d2-t180",
        title: "Threat Actors in Depth: Attributes, Motivations, and Ethical Hackers",
        tag: "2.1",
        minutes: 22,
        goal: "Profile each threat actor type by its attributes (internal or external, resources, sophistication) and motivations, and place hacker 'hat' colors and ethical hacking in context.",
        why: "Threat actor questions give a short description and ask who it is or what they want. Knowing the typical attributes and motivations for each actor makes these quick.",
        simple:
          "A THREAT ACTOR is a person or group that poses a risk to an organization. They differ in three ATTRIBUTES. First, whether they are INTERNAL (employees, contractors) or EXTERNAL. Second, their RESOURCES and FUNDING: from almost none to the budgets of a government. Third, their level of SOPHISTICATION and capability: from running downloaded tools to developing custom exploits. The main actors are: NATION-STATES, external, with very large resources and high sophistication, often running long-term campaigns called advanced persistent threats, motivated by espionage, data theft, disruption of critical infrastructure, and war; UNSKILLED ATTACKERS (script kiddies), usually external, with few resources and low skill who use ready-made tools, motivated by curiosity, status, or disruption; HACKTIVISTS, external and variably skilled, motivated by philosophical or political beliefs and using website defacement, denial of service, and leaks to make a point; ORGANIZED CRIME, external, well funded and professional, motivated by financial gain through ransomware, fraud, and selling data; INSIDER THREATS, internal people with legitimate access, motivated by revenge, financial gain, or sometimes acting unintentionally through mistakes; and SHADOW IT, internal but not malicious: employees using unapproved technology, creating unmanaged risk. Motivations include DATA EXFILTRATION (stealing information), ESPIONAGE (gathering secrets for government or competitive advantage), SERVICE DISRUPTION (making systems unusable), BLACKMAIL (extorting by threatening exposure), FINANCIAL GAIN, PHILOSOPHICAL or POLITICAL BELIEFS, ETHICAL motives (authorized testing to improve security), REVENGE, DISRUPTION and CHAOS (causing harm for its own sake), and WAR (cyber operations as part of conflict, targeting infrastructure and communications). Hackers are often described by hat colors. WHITE HAT hackers are authorized and ethical: they test systems with permission, such as penetration testers and bug bounty researchers. BLACK HAT hackers act without authorization and with malicious or criminal intent. GRAY HAT hackers act without authorization but without malicious intent, for example finding a flaw and disclosing it, which is still unauthorized. Blue, red, and purple refer to defensive, offensive, and collaborative security teams.",
        deepDive: [
          { h: "Profiles at a glance", list: [
            "Nation-state: external; very high resources; very high sophistication; espionage, disruption, war.",
            "Organized crime: external; high resources; high sophistication; financial gain.",
            "Hacktivist: external; low to medium resources; low to high skill; political or philosophical goals.",
            "Unskilled attacker: external; minimal resources; low skill; chaos, curiosity, reputation.",
            "Insider threat: internal; access rather than money; varied skill; revenge, money, or accident.",
            "Shadow IT: internal; not malicious; convenience; creates unmanaged risk."
          ] },
          { h: "Why attributes drive defense", list: [
            "Internal actors already hold access, so least privilege, monitoring, and separation of duties matter most.",
            "High-resource actors can use zero-days and supply chain attacks; defense in depth and threat intelligence matter.",
            "Low-skill actors rely on known vulnerabilities; patching and hardening stop most of them.",
            "Financially motivated actors target what can be monetized: payment data, ransomware targets, business email."
          ] },
          { h: "Motivation definitions to know", list: [
            "Data exfiltration: stealing data for use or sale.",
            "Espionage: secret information gathering for state or commercial advantage.",
            "Service disruption: denial of service, sabotage.",
            "Blackmail: threats to expose information unless paid or obeyed.",
            "Financial gain: direct profit.",
            "Philosophical/political: advancing a cause.",
            "Ethical: authorized testing and responsible disclosure to improve security.",
            "Revenge: retaliation, common for disgruntled insiders.",
            "Disruption/chaos: causing damage for its own sake.",
            "War: cyber operations as part of armed conflict, often against infrastructure."
          ] },
          { h: "Hat colors", list: [
            "White hat: authorized, ethical hacker (penetration tester, bug bounty hunter).",
            "Black hat: unauthorized and malicious (criminal).",
            "Gray hat: unauthorized but without malicious intent; still not permitted.",
            "Red team attacks, blue team defends, purple team collaborates; these describe roles, not legality."
          ] }
        ],
        keyTerms: [
          { term: "Threat Actor", def: "A person or group that poses a security risk to an organization." },
          { term: "Nation-State Actor", def: "A government-sponsored group with substantial resources and capability." },
          { term: "APT", def: "Advanced Persistent Threat: a skilled adversary maintaining long-term access to a target." },
          { term: "Script Kiddie", def: "An unskilled attacker using tools created by others." },
          { term: "Hacktivist", def: "An attacker motivated by political or philosophical beliefs." },
          { term: "Insider Threat", def: "Risk from someone with legitimate access who misuses it, intentionally or accidentally." },
          { term: "Shadow IT", def: "Technology used without the approval or knowledge of the IT department." },
          { term: "White / Black / Gray Hat", def: "Authorized ethical hacker, malicious attacker, and unauthorized hacker without malicious intent." },
          { term: "Espionage", def: "Secretly gathering information for advantage." },
          { term: "Blackmail", def: "Threatening to reveal information to coerce a victim." }
        ],
        analogy:
          "Threat actors are like different kinds of people interested in a bank. A foreign government wants the vault's secrets and plans for years (nation-state). A professional gang wants cash (organized crime). A protester wants to embarrass the bank (hacktivist). A bored teenager wants to try a trick he saw online (unskilled attacker). A teller with a grudge already holds a key (insider). A white hat is a hired security consultant who tests the locks with the manager's written permission.",
        technical:
          "An analyst classifies three incidents. A months-long intrusion at a defense contractor that steals designs, using custom malware, points to a nation-state with espionage as the motive. A ransomware attack that demands cryptocurrency from a hospital points to organized crime for financial gain. A website defaced with a political slogan and a DDoS announced on social media points to hacktivists. A finance employee quietly copying customer lists before resigning is an insider threat driven by financial gain; a marketing team using an unapproved file-sharing service is shadow IT, which is not malicious but still a risk.",
        table: {
          headers: ["Actor", "Internal / external", "Resources", "Sophistication", "Typical motivation"],
          rows: [
            ["Nation-state", "External", "Very high", "Very high", "Espionage, disruption, war"],
            ["Organized crime", "External", "High", "High", "Financial gain, blackmail"],
            ["Hacktivist", "External", "Low to medium", "Low to high", "Philosophical or political"],
            ["Unskilled attacker", "External", "Very low", "Low", "Chaos, curiosity, status"],
            ["Insider threat", "Internal", "Access", "Varies", "Revenge, financial gain, or accident"],
            ["Shadow IT", "Internal", "Employee tools", "Low", "Convenience (not malicious)"]
          ]
        },
        confusion: [
          { a: "Hacktivist", b: "Nation-state", diff: "Hacktivists pursue a cause with modest resources. Nation-states are government-backed with large resources and long-term goals." },
          { a: "Insider threat", b: "Shadow IT", diff: "An insider threat is someone misusing or accidentally abusing access. Shadow IT is unapproved technology use, usually well intended but risky." },
          { a: "Gray hat", b: "White hat", diff: "White hats have permission. Gray hats act without permission, even if they mean no harm." },
          { a: "Espionage", b: "Data exfiltration", diff: "Espionage is the purpose (secret intelligence). Exfiltration is the act of removing data, which may serve espionage, profit, or blackmail." },
          { a: "Unskilled attacker", b: "APT", diff: "An unskilled attacker uses simple off-the-shelf tools. An APT uses advanced, persistent, often custom techniques." }
        ],
        soc: "Understanding the likely actor shapes the response: a financially motivated gang calls for fast containment and recovery plus law enforcement contact, an insider needs HR and legal involvement, and a suspected nation-state calls for deeper investigation and information sharing with government and industry partners.",
        patterns: [
          ["Long-term, well-funded campaign stealing secrets", "Nation-state (espionage)"],
          ["Ransomware gang seeking payment", "Organized crime (financial gain)"],
          ["Website defaced with a political message", "Hacktivist"],
          ["Downloaded tools used without understanding them", "Unskilled attacker (script kiddie)"],
          ["Disgruntled employee deletes data on the way out", "Insider threat (revenge)"],
          ["Staff using an unapproved cloud storage service", "Shadow IT"],
          ["Authorized penetration tester with written permission", "White hat / ethical hacker"],
          ["Cyber operations targeting infrastructure during a conflict", "War motivation (nation-state)"]
        ],
        takeaways: [
          "Describe an actor by internal/external, resources, sophistication, and motivation.",
          "Insiders hold access; nation-states hold resources; criminals hold a profit motive.",
          "Authorization, not skill, makes a hacker ethical."
        ],
        remember: [
          "Actors: nation-state, unskilled attacker, hacktivist, insider threat, organized crime, shadow IT.",
          "Attributes: internal vs external, resources/funding, sophistication.",
          "Motivations: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political, ethical, revenge, disruption/chaos, war.",
          "Nation-state = highest resources and sophistication; organized crime = money; hacktivist = cause.",
          "Insider threat can be malicious or unintentional; shadow IT is unapproved technology.",
          "White hat = authorized; black hat = malicious; gray hat = unauthorized without malicious intent.",
          "Red, blue, and purple teams are roles, not legal status."
        ],
        taglish:
          "Ilarawan ang attacker sa tatlong bagay: internal o external, laki ng resources, at galing (sophistication). Nation-state: pinakamalaking resources, espionage at digmaan. Organized crime: pera (ransomware). Hacktivist: adhikain o pulitika. Unskilled attacker (script kiddie): gumagamit lang ng ready-made na tools. Insider: may legit na access, galit o pera ang dahilan, minsan aksidente lang. Shadow IT: gumagamit ng hindi aprubadong teknolohiya. Ang white hat ay may pahintulot, ang black hat ay masama ang intensyon, at ang gray hat ay walang pahintulot pero hindi masama ang intensyon."
      },
      {
        id: "d2-t181",
        title: "Mitigation Techniques in Depth: Choosing the Right Defense for the Scenario",
        tag: "2.5",
        minutes: 22,
        goal: "Explain each mitigation technique and its hardening measures, and choose the best technique for a described situation.",
        why: "Objective 2.5 is a short list of techniques the exam expects you to apply to scenarios. The skill is matching the technique to the problem: unpatchable system, lateral movement, unknown malware, lost laptop.",
        simple:
          "Mitigation techniques are the practical measures that reduce the likelihood or impact of attacks. SEGMENTATION divides a network into zones so that a compromise in one cannot easily spread to another. ACCESS CONTROL, through ACCESS CONTROL LISTS and PERMISSIONS, limits who and what can reach each resource. APPLICATION ALLOW LISTS let only approved software run, blocking unknown malware by default. ISOLATION separates a system completely, for example quarantining an infected machine or placing a fragile legacy system on its own network. PATCHING removes known vulnerabilities. ENCRYPTION protects data at rest and in transit so that stolen data is unreadable. MONITORING provides visibility so attacks are noticed early. LEAST PRIVILEGE gives users, processes, and services only the access they need. CONFIGURATION ENFORCEMENT keeps systems in line with secure baselines using tools such as group policy, configuration management, and compliance scanning, and corrects drift. DECOMMISSIONING securely retires systems and data at end of life so forgotten assets do not remain as targets. HARDENING is the work of reducing a system's attack surface, and the exam lists specific techniques: installing ENDPOINT PROTECTION (antivirus or EDR); enabling a HOST-BASED FIREWALL; using a host-based intrusion prevention system (HIPS); DISABLING unneeded PORTS and PROTOCOLS and services; CHANGING DEFAULT PASSWORDS and accounts; REMOVING UNNECESSARY SOFTWARE; and encrypting storage. Choosing well means reading the scenario: if a system cannot be patched, isolate and segment it and add monitoring; if the worry is unknown malware, use an application allow list; if an attacker moves laterally, apply segmentation and least privilege; if a laptop might be stolen, use encryption; if default credentials exist, change them; if old systems linger, decommission them. No single technique is enough, and they work in layers.",
        deepDive: [
          { h: "What each technique answers", list: [
            "Segmentation: how do we stop spread? (zones, VLANs, firewalls, microsegmentation)",
            "Access control (ACLs and permissions): who may access what?",
            "Application allow list: what software is permitted to run?",
            "Isolation: how do we separate a risky or infected system entirely?",
            "Patching: how do we remove known flaws?",
            "Encryption: how do we make stolen data useless?",
            "Monitoring: how do we notice and investigate?",
            "Least privilege: how do we limit damage from compromised accounts?",
            "Configuration enforcement: how do we keep systems secure over time?",
            "Decommissioning: how do we retire systems safely?"
          ] },
          { h: "Hardening techniques named in the objectives", list: [
            "Encryption of drives and communications.",
            "Installation of endpoint protection.",
            "Host-based firewall to filter traffic to and from the device.",
            "Host-based intrusion prevention to block malicious behavior on the host.",
            "Disabling unused ports, protocols, and services.",
            "Changing default passwords and removing default accounts.",
            "Removing unnecessary software to shrink the attack surface."
          ] },
          { h: "Scenario matching", list: [
            "A legacy server cannot be patched: isolate or segment it, restrict access, monitor, add compensating controls.",
            "Ransomware keeps spreading between departments: segmentation and least privilege, plus isolation of infected hosts.",
            "Unknown executable files keep appearing on servers: application allow list.",
            "A company laptop is lost with customer data: full-disk encryption makes it a lost device, not a breach.",
            "Router still uses its factory login: change default credentials and disable remote management.",
            "Old servers found with no owner: decommission after checking retention and legal holds.",
            "Admin accounts used for email and browsing: apply least privilege and separate accounts."
          ] },
          { h: "Layering", p: "Techniques complement each other. Segmentation limits where an attacker can go; least privilege limits what a stolen account can do; allow lists limit what code can run; encryption protects data even when other layers fail; monitoring catches what slips through; patching and configuration enforcement keep the base solid; decommissioning removes forgotten risk. This is defense in depth." }
        ],
        keyTerms: [
          { term: "Segmentation", def: "Dividing a network into zones to contain compromise and control traffic." },
          { term: "Isolation", def: "Fully separating a system or network from others." },
          { term: "Application Allow List", def: "A control that permits only approved applications to run." },
          { term: "Least Privilege", def: "Granting only the minimum access required." },
          { term: "Configuration Enforcement", def: "Keeping systems aligned with secure baselines and correcting deviations." },
          { term: "Decommissioning", def: "Securely retiring systems and data at end of life." },
          { term: "Hardening", def: "Reducing a system's attack surface by removing or restricting unneeded features." },
          { term: "Host-Based Firewall", def: "A firewall running on the individual device." },
          { term: "HIPS", def: "Host-based Intrusion Prevention System: detects and blocks malicious host activity." },
          { term: "Attack Surface", def: "The sum of points where an attacker can try to enter or extract data." }
        ],
        analogy:
          "Securing a building uses the same layers. Segmentation is fire doors between sections. Access control lists are the guest list at each door. An allow list is a rule that only badge-holders may bring in equipment. Isolation is a quarantine room. Patching is repairing a known broken lock. Encryption is a safe inside the vault. Monitoring is the camera room. Least privilege is giving the cleaner a key to the hallway, not the vault. Decommissioning is clearing and locking an old wing rather than leaving it open and forgotten.",
        technical:
          "After a security review, a company hardens its servers: unused services and the legacy SMBv1 protocol are disabled, a host firewall allows only required ports, EDR is installed, default vendor passwords are changed and local administrator passwords are randomized, unnecessary software is removed, and drives are encrypted. Group policy enforces the baseline and a weekly scan reports drift. The finance network is segmented behind a firewall with an ACL listing only required systems, application allow lists block unapproved programs on payment servers, and 30 forgotten test servers are decommissioned after confirming nothing needs retention.",
        table: {
          headers: ["Scenario", "Best technique"],
          rows: [
            ["Cannot patch a critical old system", "Isolation or segmentation plus monitoring"],
            ["Attacker moved from one department to another", "Segmentation and least privilege"],
            ["Prevent unknown malware from executing", "Application allow list"],
            ["Stolen laptop must not expose data", "Encryption"],
            ["Router uses factory login", "Change default passwords"],
            ["Servers run services nobody uses", "Disable unneeded ports/services; remove software"],
            ["Systems drift from the approved build", "Configuration enforcement"],
            ["Unowned legacy servers still online", "Decommissioning"],
            ["Notice attacks quickly", "Monitoring"]
          ]
        },
        confusion: [
          { a: "Segmentation", b: "Isolation", diff: "Segmentation separates networks into controlled zones that can still communicate through rules. Isolation removes a system's connectivity almost completely." },
          { a: "Allow list", b: "Block list", diff: "An allow list permits only approved items (default deny). A block list blocks known-bad items (default allow)." },
          { a: "Patching", b: "Configuration enforcement", diff: "Patching fixes known software flaws. Configuration enforcement keeps settings aligned with the secure baseline." },
          { a: "HIPS", b: "Host-based firewall", diff: "A host firewall filters network traffic by rules. HIPS watches for and blocks malicious behavior on the host." },
          { a: "Decommissioning", b: "Isolation", diff: "Decommissioning permanently retires a system with sanitization. Isolation is a temporary or compensating separation while the system continues to exist." }
        ],
        soc: "Mitigations shape what analysts see. Strong segmentation makes lateral movement stand out as denied connections; allow lists turn unknown executables into high-confidence alerts; encryption turns a lost-device incident into a lower-severity event; configuration drift alerts catch tampering.",
        patterns: [
          ["Limit lateral movement between networks", "Segmentation"],
          ["Only approved applications may run", "Application allow list"],
          ["Quarantine an infected machine from the network", "Isolation"],
          ["Disable Telnet and unused services on a server", "Hardening (disabling ports/protocols)"],
          ["Change the vendor's default admin password", "Hardening (default credentials)"],
          ["Make stolen data unreadable", "Encryption"],
          ["Keep machines matching the secure build and fix deviations", "Configuration enforcement"],
          ["Securely retire servers that nobody uses", "Decommissioning"]
        ],
        takeaways: [
          "Match the technique to the problem: spread, execution, theft, drift, or neglect.",
          "Hardening reduces attack surface: remove, disable, change defaults, protect, encrypt.",
          "Layer techniques; none is sufficient alone."
        ],
        remember: [
          "Techniques: segmentation, access control (ACLs/permissions), application allow list, isolation, patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning.",
          "Hardening: encryption, endpoint protection, host-based firewall, HIPS, disable ports/protocols, change default passwords, remove unnecessary software.",
          "Cannot patch: isolate, segment, monitor.",
          "Unknown malware: allow list. Lateral movement: segmentation and least privilege. Lost laptop: encryption.",
          "Allow list = default deny; block list = default allow.",
          "Configuration enforcement fixes drift from the baseline.",
          "Decommission securely: sanitize data, check retention and holds, update inventory."
        ],
        taglish:
          "Pumili ng depensa batay sa problema. Kumakalat ang atake sa network: segmentation at least privilege. Hindi kilalang malware: application allow list (mga aprubadong program lang ang tatakbo). Hindi ma-patch ang lumang sistema: isolation, restricted access, monitoring. Nawalang laptop: encryption. Gumagamit pa ng default password: palitan. May mga serbisyong walang gumagamit: i-disable at alisin ang hindi kailangang software (hardening). At kapag luma at walang may-ari ang server, i-decommission nang maayos."
      },
      {
        id: "d2-t182",
        title: "Operating System, Firmware, and Hardware Vulnerabilities",
        tag: "2.3",
        minutes: 20,
        goal: "Describe vulnerabilities that live in operating systems, firmware, and hardware, and the controls that reduce them.",
        why: "Objective 2.3 lists operating system-based and hardware vulnerabilities (firmware, end-of-life, legacy) alongside application and cloud flaws. Flaws below the application are harder to see and fix, which is why attackers value them.",
        simple:
          "OPERATING SYSTEM vulnerabilities are flaws or weak settings in the OS itself. Common examples are missing security updates, unsupported OS versions, default configurations with unnecessary services enabled, weak file and registry permissions, insecure legacy protocols such as SMBv1, vulnerable drivers, and flaws that allow PRIVILEGE ESCALATION (a low-privilege user or process gaining administrator or kernel rights). Because the OS sits under every application, an OS compromise can defeat the security of everything above it. FIRMWARE is the low-level software stored on a device that starts and controls its hardware: the UEFI or BIOS on a computer, the firmware of routers, printers, cameras, drives, network cards, and out-of-band management controllers. Firmware vulnerabilities matter because they run before the operating system, are rarely updated, and can host malware (a bootkit or implant) that survives reinstalling the OS and is invisible to normal security tools. Updates should be signed and verified, and secure boot and a hardware root of trust protect the boot chain. HARDWARE vulnerabilities include design flaws and physical weaknesses. SIDE-CHANNEL attacks infer secrets from physical behavior: the Spectre and Meltdown flaws (disclosed in 2018) exploited speculative execution in processors to read data across security boundaries, and Rowhammer exploits repeated memory access to flip bits in neighboring memory. Exposed debugging interfaces (such as JTAG), direct memory access through external ports, counterfeit or tampered components, and hardware that has reached END OF LIFE (no more firmware updates) add to the risk. Hardware flaws often cannot be fixed by software alone, so mitigations include microcode and operating system updates, replacing hardware, and compensating controls. General defenses are: apply operating system and firmware updates on a managed schedule, replace unsupported systems, harden OS configurations to a baseline, enable secure boot and measured boot with a TPM, use endpoint protection and application allow lists, disable unused ports and interfaces, control physical access, buy hardware from trusted suppliers and verify its integrity (a supply chain control), and inventory every device and firmware version so that when a vulnerability is announced you know where you are exposed.",
        deepDive: [
          { h: "Operating system weaknesses", list: [
            "Unpatched or unsupported versions with known exploits.",
            "Default installations with unneeded services and open ports.",
            "Weak permissions and excessive local administrators.",
            "Legacy protocols and weak authentication settings (for example NTLM or SMBv1).",
            "Vulnerable drivers and kernel flaws leading to privilege escalation.",
            "Missing logging or disabled security features."
          ] },
          { h: "Firmware risks", list: [
            "Runs below the operating system and may be invisible to endpoint tools.",
            "Updates are infrequent and sometimes unsigned or unauthenticated.",
            "Implants can survive OS reinstallation and disk replacement.",
            "Embedded devices and network gear often ship with outdated firmware.",
            "Baseboard management controllers provide powerful remote access if exposed."
          ] },
          { h: "Hardware-level issues", list: [
            "Side channels (timing, cache, power, electromagnetic) leak secrets without breaking software controls.",
            "Spectre and Meltdown: speculative execution flaws in processors; mitigated with microcode, OS, and compiler updates.",
            "Rowhammer: repeated access to memory rows flipping bits in adjacent rows.",
            "Exposed debug and maintenance ports allowing direct access.",
            "Direct memory access attacks through external interfaces; mitigated by IOMMU and port controls.",
            "Counterfeit, tampered, or backdoored components in the supply chain."
          ] },
          { h: "Defensive controls", list: [
            "Patch management for OS and firmware with a tracked schedule.",
            "Secure boot, measured boot, and TPM-based attestation.",
            "Hardened baselines (CIS benchmarks) enforced by configuration management.",
            "Replace end-of-life hardware or isolate it with compensating controls.",
            "Procurement from trusted vendors with integrity verification and tamper-evident packaging.",
            "Physical port control and disabling unused interfaces.",
            "Asset inventory with firmware versions to scope exposure quickly."
          ] }
        ],
        keyTerms: [
          { term: "Operating System Vulnerability", def: "A flaw or weak configuration in the operating system that can be exploited." },
          { term: "Privilege Escalation", def: "Gaining higher access rights than originally granted." },
          { term: "Firmware", def: "Low-level software that initializes and controls hardware." },
          { term: "Bootkit", def: "Malware that infects the boot process to load before the operating system." },
          { term: "Side-Channel Attack", def: "Extracting secrets by observing physical behavior such as timing or power use." },
          { term: "Spectre / Meltdown", def: "Processor speculative-execution flaws that can leak data across security boundaries." },
          { term: "Rowhammer", def: "A technique that flips bits in memory by rapidly accessing neighboring rows." },
          { term: "Hardware Root of Trust", def: "A tamper-resistant hardware foundation used to verify that software has not been altered." },
          { term: "End-of-Life Hardware", def: "Equipment for which the vendor no longer supplies updates." },
          { term: "Counterfeit Component", def: "A fake or tampered part inserted into the supply chain." }
        ],
        analogy:
          "The operating system is the foundation and plumbing of a building, firmware is the wiring inside the walls, and hardware is the structure itself. A burglar who gets into the plumbing or the walls is beneath the locks and alarms you installed on the doors. That is why flaws in these layers are serious and why you want inspection, trusted builders, and a record of what was installed where.",
        technical:
          "A company's vulnerability report lists a critical flaw in the management firmware of its servers. Because firmware is outside the operating system, the endpoint agent shows nothing, so the team uses its asset inventory to identify affected models and firmware versions, applies the vendor's signed update during a maintenance window, and restricts the management interfaces to a dedicated administration network. Separately, a batch of old network switches that reached end of support are placed behind stricter access control and scheduled for replacement. Servers also boot with secure boot enabled, so an unsigned bootloader would be rejected.",
        table: {
          headers: ["Layer", "Example weakness", "Main controls"],
          rows: [
            ["Operating system", "Missing patches, unneeded services, privilege escalation flaws", "Patching, hardening baselines, least privilege, endpoint protection"],
            ["Firmware", "Outdated or unsigned firmware; bootkits", "Signed updates, secure boot, firmware inventory, restricted management interfaces"],
            ["Hardware design", "Spectre/Meltdown, Rowhammer", "Microcode and OS mitigations, replacement, isolation of sensitive workloads"],
            ["Hardware access", "Exposed debug ports, DMA attacks", "Disable or protect ports, physical security, IOMMU"],
            ["Supply chain", "Counterfeit or tampered parts", "Trusted vendors, integrity verification, tamper-evident packaging"],
            ["End of life", "No more firmware or OS updates", "Replace, isolate, compensating controls"]
          ]
        },
        confusion: [
          { a: "OS vulnerability", b: "Application vulnerability", diff: "An OS vulnerability is in the operating system itself. An application vulnerability is in software running on top of it. OS flaws can undermine every application." },
          { a: "Firmware", b: "Operating system", diff: "Firmware is low-level code tied to hardware that runs before and beneath the operating system. Reinstalling the OS does not remove firmware malware." },
          { a: "Side-channel attack", b: "Software exploit", diff: "A side-channel attack extracts secrets from physical or microarchitectural behavior. A software exploit abuses a coding flaw." },
          { a: "End of life", b: "Legacy", diff: "End of life means the vendor stopped selling or updating. Legacy simply means old technology still in use." },
          { a: "Secure boot", b: "Measured boot", diff: "Secure boot blocks unsigned boot components. Measured boot records measurements of what loaded for later attestation." }
        ],
        soc: "Below-the-OS compromises are hard to see. Analysts watch for failed secure boot or attestation checks, firmware version drift, unexpected out-of-band management logins, and hosts behaving strangely while endpoint tools report clean. A reliable asset inventory with firmware versions turns an announced flaw into a quick exposure list.",
        patterns: [
          ["Low-privilege user obtains administrator rights through a kernel flaw", "Privilege escalation (OS vulnerability)"],
          ["Malware survives reinstalling the operating system", "Firmware or bootkit infection"],
          ["Secrets leaked via speculative execution in the processor", "Spectre / Meltdown (hardware side channel)"],
          ["Repeated memory access flips neighboring bits", "Rowhammer"],
          ["Vendor no longer provides firmware updates", "End-of-life hardware"],
          ["Only signed bootloaders may run", "Secure boot"],
          ["Tampered or counterfeit chips in a delivery", "Hardware supply chain vulnerability"],
          ["Server management controller exposed to the Internet", "Firmware/management interface exposure; restrict to an admin network"]
        ],
        takeaways: [
          "Flaws below the application can defeat everything above them.",
          "Firmware and hardware are rarely patched, so inventory, signed updates, and replacement planning matter.",
          "Secure boot, trusted procurement, and port control address low-level risks."
        ],
        remember: [
          "OS vulnerabilities: missing patches, default services, weak permissions, legacy protocols, privilege escalation.",
          "Firmware runs under the OS; infections can survive OS reinstalls.",
          "Spectre/Meltdown = processor speculative-execution side channels; Rowhammer = memory bit flips.",
          "End-of-life hardware stops receiving updates; replace or isolate.",
          "Secure boot blocks unsigned boot code; measured boot enables attestation.",
          "Control debug and external ports; buy from trusted suppliers and verify integrity.",
          "Keep an inventory with firmware versions."
        ],
        taglish:
          "May mga butas din sa ilalim ng aplikasyon. Sa operating system: kulang sa patch, mga serbisyong hindi kailangan, mahinang permissions, at privilege escalation. Ang firmware, nasa ilalim ng OS kaya kahit i-reinstall ang OS, nandoon pa rin ang malware, at bihirang ma-update. Sa hardware: Spectre at Meltdown (side channel sa processor), Rowhammer (pagbabago ng bits sa memory), at pekeng parte sa supply chain. Lunas: update na naka-sign, secure boot, tamang inventory kasama ang bersyon ng firmware, at palitan ang kagamitang end-of-life."
      },
      {
        id: "d2-t183",
        title: "Indicators of Malicious Activity: Reading the Signs",
        tag: "2.4",
        minutes: 22,
        goal: "Recognize each named indicator of malicious activity (account lockout, concurrent sessions, blocked content, impossible travel, resource consumption, resource inaccessibility, out-of-cycle logging, published or documented indicators, and missing logs) and infer the likely attack.",
        why: "Objective 2.4 ends with a list of indicators, and scenario questions describe symptoms and ask what is happening. Each indicator points to a small set of attacks.",
        simple:
          "An INDICATOR of malicious activity is an observable sign that something is wrong. Learn the named ones and what they usually mean. ACCOUNT LOCKOUT: many accounts locked in a short time suggests password spraying or brute force, or an attacker deliberately causing lockouts. CONCURRENT SESSION USAGE: the same account logged in from two places at once, or from two different devices or countries, suggests stolen credentials or session theft. BLOCKED CONTENT: web filters, email gateways, or endpoint tools repeatedly blocking downloads or connections to malicious sites can show a user or device being targeted, or malware trying to reach its command server. IMPOSSIBLE TRAVEL: logins from places so far apart that the person could not have travelled between them in the time elapsed, indicating a compromised account. RESOURCE CONSUMPTION: unusual spikes in processor use, memory, disk, or bandwidth suggest cryptojacking, malware activity, or data exfiltration; a large outbound transfer at night is a classic sign. RESOURCE INACCESSIBILITY: systems, files, or services suddenly unavailable suggest denial of service, ransomware encrypting data, or a wiper. OUT-OF-CYCLE LOGGING: log entries at unusual times or patterns outside normal business behavior, such as administrative actions at 3 a.m. or scheduled jobs that run at odd moments, can show an attacker operating when staff are absent or a hidden task. PUBLISHED OR DOCUMENTED indicators: activity that matches a known published attack pattern, such as an indicator of compromise in a threat report, a vendor advisory, or a documented exploit, is high-confidence evidence because it matches something already analyzed. MISSING LOGS: gaps, deleted entries, or cleared logs (such as the Windows Security log cleared event) suggest an attacker covering their tracks or a failure in logging. Other familiar indicators include unexpected software (including BLOATWARE or potentially unwanted programs that consume resources or leak data), disabled security tools, new accounts, unfamiliar processes or scheduled tasks, and altered files. No single indicator proves an attack; analysts weigh several together, consider context, and validate before acting.",
        deepDive: [
          { h: "Indicator to likely cause", list: [
            "Account lockouts across many accounts: password spraying or brute force.",
            "Same user active from two countries at once: stolen credentials or token theft.",
            "Impossible travel between two successful logins: compromised account.",
            "Repeated blocked downloads or connections to bad domains: malware or phishing activity being stopped.",
            "High CPU on idle servers: cryptojacking or runaway malware.",
            "Large outbound data volume to a rare destination: exfiltration.",
            "Files and services suddenly inaccessible: ransomware, wiper, or DoS.",
            "Admin activity at odd hours: attacker using off-hours, or a hidden scheduled task.",
            "Cleared or missing logs: defense evasion."
          ] },
          { h: "Published and documented indicators", p: "Threat reports and advisories list file hashes, IP addresses, domains, registry keys, and behavior patterns tied to known attacks. If your logs match them, you have strong evidence. Because indicators age quickly, check dates and confidence. Documented attack techniques (such as those in MITRE ATT&CK) help recognize behavior even when specific artifacts change." },
          { h: "Out-of-cycle logging explained", p: "Every environment has a normal rhythm: backups run at night, staff log in during working hours, updates arrive on a schedule. Events outside that rhythm are worth attention: a service account interactively logging in on a Sunday, a log source that starts sending at an unusual time, or sudden bursts of audit events. Out-of-cycle simply means outside the expected cycle." },
          { h: "Bloatware and unwanted software", p: "Bloatware is preinstalled or bundled software the user does not need. It uses resources, increases attack surface, and may collect data or contain vulnerabilities. Potentially unwanted programs behave similarly. Removing them is part of hardening." },
          { h: "Triage approach", list: [
            "Collect the facts: which account, host, time, and source.",
            "Correlate with other logs (authentication, firewall, endpoint, DNS).",
            "Check for a benign explanation (travel, VPN, scheduled maintenance).",
            "Contain if evidence supports compromise; preserve logs and evidence.",
            "Document and tune detections to cut false positives."
          ] }
        ],
        keyTerms: [
          { term: "Indicator of Compromise", def: "An observable artifact that suggests a system has been breached." },
          { term: "Account Lockout", def: "An account disabled after repeated failed authentication attempts." },
          { term: "Concurrent Session", def: "Simultaneous active sessions for one account, possibly from different places." },
          { term: "Impossible Travel", def: "Successful logins from locations too far apart for the elapsed time." },
          { term: "Resource Consumption", def: "Abnormal use of CPU, memory, disk, or bandwidth." },
          { term: "Resource Inaccessibility", def: "Systems or data becoming unavailable." },
          { term: "Out-of-Cycle Logging", def: "Log activity occurring outside the normal expected pattern or schedule." },
          { term: "Missing Logs", def: "Gaps or deletions in log data, suggesting tampering or failure." },
          { term: "Blocked Content", def: "Content a filter or security tool prevented from reaching a user or system." },
          { term: "Bloatware", def: "Unneeded preinstalled or bundled software that adds risk and consumes resources." }
        ],
        analogy:
          "Indicators are like clues at a burgled house: the same key used at two doors at once (concurrent sessions), a delivery truck that arrived from another continent an hour ago (impossible travel), the lights on at 3 a.m. (out-of-cycle activity), the power bill suddenly high (resource consumption), the CCTV recordings missing for one night (missing logs), and the neighbor who recognizes the burglar's method from a police bulletin (published indicators).",
        technical:
          "A SOC sees three alerts for the same user: a login from Manila at 09:00 and another from a foreign data center at 09:12 (impossible travel), two concurrent sessions with different devices, and, minutes later, a mail rule forwarding messages externally. The proxy also shows blocked downloads from a newly registered domain that appears in a published threat report. The analyst resets the password, revokes tokens, removes the rule, and starts a search for other accounts logged in from the same foreign address. During the review, the Security log on a related server is found cleared (event 1102), which raises the severity.",
        table: {
          headers: ["Indicator", "What it suggests"],
          rows: [
            ["Account lockout (many accounts)", "Password spraying or brute force"],
            ["Concurrent session usage", "Stolen credentials or session hijacking"],
            ["Blocked content", "Malicious downloads or C2 attempts being stopped"],
            ["Impossible travel", "Compromised account"],
            ["Resource consumption", "Cryptojacking, malware, or exfiltration"],
            ["Resource inaccessibility", "DoS, ransomware, or wiper"],
            ["Out-of-cycle logging", "Attacker activity outside normal patterns, hidden tasks"],
            ["Published/documented indicators", "Known attack; high-confidence match"],
            ["Missing logs", "Log tampering or defense evasion"]
          ]
        },
        confusion: [
          { a: "Impossible travel", b: "Concurrent session", diff: "Impossible travel compares the locations of successive logins over time. Concurrent session usage is simultaneous activity from different places or devices." },
          { a: "Resource consumption", b: "Resource inaccessibility", diff: "Consumption is abnormal use of a resource (high CPU, bandwidth). Inaccessibility is a resource becoming unavailable." },
          { a: "Missing logs", b: "Out-of-cycle logging", diff: "Missing logs are gaps or deletions. Out-of-cycle logging is activity occurring at unexpected times." },
          { a: "Account lockout", b: "Impossible travel", diff: "Lockouts indicate failed guessing. Impossible travel indicates a successful login by someone elsewhere." },
          { a: "Published indicator", b: "Anomaly", diff: "A published indicator matches a known analyzed attack. An anomaly is merely unusual and needs investigation to decide whether it is malicious." }
        ],
        soc: "These indicators become detection rules: failed-then-successful logins, impossible travel, new inbox rules after unusual sign-ins, sudden spikes in outbound bytes, and log-clearing events. Because each rule produces some false positives, analysts combine indicators into a story before declaring an incident.",
        patterns: [
          ["Many accounts locked out at once", "Password spraying or brute force"],
          ["Logins from two distant countries within minutes", "Impossible travel; compromised account"],
          ["High CPU on an otherwise idle server", "Cryptojacking or malware"],
          ["Large outbound transfer at 3 a.m.", "Data exfiltration"],
          ["Files suddenly inaccessible and renamed", "Ransomware"],
          ["Security log cleared by an administrator account at night", "Missing logs; defense evasion"],
          ["Hash and domain match a threat report", "Published indicator; high confidence"],
          ["Preinstalled unneeded software using resources", "Bloatware (remove as part of hardening)"]
        ],
        takeaways: [
          "Each named indicator points to a few likely attacks.",
          "Correlate several indicators and check for benign explanations.",
          "Missing or cleared logs are themselves evidence."
        ],
        remember: [
          "Account lockout: spraying or brute force. Concurrent sessions: stolen credentials.",
          "Impossible travel: logins too far apart for the time.",
          "Resource consumption: cryptojacking, malware, exfiltration. Resource inaccessibility: DoS, ransomware, wiper.",
          "Out-of-cycle logging: activity outside the normal schedule.",
          "Published/documented indicators: matches to known threat reports (high confidence).",
          "Missing logs: tampering (Windows event 1102 = Security log cleared).",
          "Bloatware: unneeded software that adds risk; remove during hardening."
        ],
        taglish:
          "Ito ang mga palatandaan: maraming account na na-lockout (password spraying o brute force); iisang account na naka-login sa dalawang lugar nang sabay (nakaw na credentials); impossible travel (dalawang login na imposibleng mapuntahan ng tao sa ganung oras); sobrang taas na CPU o bandwidth (cryptojacking o exfiltration); biglang hindi ma-access ang mga file o serbisyo (ransomware o DoS); aktibidad sa kakaibang oras (out-of-cycle logging); tugma sa nakalathalang threat report (published indicator); at nawawala o binura na log (tinatakpan ang bakas). Pagsamahin ang ilang palatandaan bago magdesisyon."
      }
    ]
  },

  tips: {
    "d1-t180": "Use the two-question method: category first (technology, management document, people routine, physical object) then type (blocks, discourages, detects, repairs, substitutes, instructs). A sign or visible camera used to make people think twice is deterrent; a locked door is preventive.",
    "d1-t181": "In zero trust, remember the verbs: the policy engine decides, the policy administrator instructs, the policy enforcement point enforces. The first two live in the control plane and the enforcement point is in the data plane.",
    "d1-t182": "If a question asks what must exist BEFORE a change is implemented, think approval, testing, a backout plan, and a maintenance window. Documentation and updated diagrams come after. An emergency change is faster but still needs a record and a review.",
    "d2-t180": "Match the motivation first: espionage or war points to a nation-state, ransom or fraud to organized crime, a political cause to hacktivists, revenge to an insider, curiosity with downloaded tools to an unskilled attacker. Authorization, not skill, separates white hat from gray and black.",
    "d2-t181": "Work backward from the problem: cannot patch means isolate and segment, unknown software means allow list, spreading means segmentation and least privilege, stolen device means encryption, factory logins mean change defaults, forgotten systems mean decommission.",
    "d2-t182": "Remember the layer: flaws in the OS affect everything above, firmware malware survives an OS reinstall, Spectre/Meltdown/Rowhammer are hardware-level, and end-of-life hardware means no more updates. Secure boot and trusted procurement are the standard answers.",
    "d2-t183": "Translate the symptom: lockouts mean guessing, two places at once means stolen credentials, high CPU or bandwidth means mining or exfiltration, files inaccessible means ransomware or DoS, odd-hour activity means out-of-cycle, and cleared logs mean the attacker is covering tracks."
  },

  summaries: {
    "d1-t180": "Every control gets two labels, a category (technical, managerial, operational, physical) and a type (preventive, deterrent, detective, corrective, compensating, directive), found by asking what it is made of and when it acts.",
    "d1-t181": "CIA names security's three goals, AAA and non-repudiation support them, a gap analysis compares reality to a target, and zero trust separates the deciding control plane from the enforcing data plane.",
    "d1-t182": "Change management moves a change through ownership, impact analysis, approval, testing, a backout plan, a maintenance window, and documentation, while watching for restarts, dependencies, and legacy systems.",
    "d2-t180": "Threat actors differ by internal or external status, resources, sophistication, and motivation, from nation-states and organized crime to hacktivists, insiders, unskilled attackers, and shadow IT, with ethical hackers defined by authorization.",
    "d2-t181": "Mitigations such as segmentation, allow lists, isolation, patching, encryption, least privilege, configuration enforcement, and decommissioning are chosen by matching the technique to the problem, with hardening reducing attack surface.",
    "d2-t182": "Operating system, firmware, and hardware flaws sit beneath applications and can defeat everything above them, so patching, secure boot, trusted procurement, and replacing end-of-life gear matter.",
    "d2-t183": "Named indicators such as lockouts, concurrent sessions, impossible travel, resource spikes, inaccessible resources, out-of-cycle activity, and missing logs each suggest specific attacks and are weighed together."
  },

  questions: [
    {
      id: "q-x-d1-11", domainId: "d1", tag: "d1-t180", type: "single",
      prompt: "A company posts signs warning that premises are monitored by security cameras to discourage trespassers. Which control type and category does the sign BEST represent?",
      choices: [
        { id: "a", text: "Deterrent, physical" },
        { id: "b", text: "Preventive, technical" },
        { id: "c", text: "Corrective, operational" },
        { id: "d", text: "Directive, managerial" }
      ],
      correct: "a",
      explanation: "A physical sign that discourages attempts without actually stopping them is a physical deterrent control.",
      distractorExplanations: {
        b: "The sign does not technically block anything and is not technology based.",
        c: "A sign does not repair damage after an incident.",
        d: "A directive managerial control would be a policy instructing employees, not a sign aimed at trespassers."
      }
    },
    {
      id: "q-x-d1-12", domainId: "d1", tag: "d1-t180", type: "single",
      prompt: "A legacy server cannot be patched, so the company places it on an isolated network segment with a firewall allowing only the single protocol it needs. How is this control BEST described?",
      choices: [
        { id: "a", text: "Compensating control" },
        { id: "b", text: "Detective control" },
        { id: "c", text: "Directive control" },
        { id: "d", text: "Deterrent control" }
      ],
      correct: "a",
      explanation: "When the primary control (patching) cannot be applied, an alternative safeguard such as segmentation is a compensating control.",
      distractorExplanations: {
        b: "Detective controls identify events and this control does not primarily detect anything.",
        c: "Directive controls tell people what to do, such as policies.",
        d: "Deterrent controls discourage attempts rather than limit exposure technically."
      }
    },
    {
      id: "q-x-d1-13", domainId: "d1", tag: "d1-t181", type: "single",
      prompt: "In a zero trust architecture, which component evaluates each access request against policy and decides whether to allow it?",
      choices: [
        { id: "a", text: "Policy engine" },
        { id: "b", text: "Policy enforcement point" },
        { id: "c", text: "Implicit trust zone" },
        { id: "d", text: "Subject" }
      ],
      correct: "a",
      explanation: "The policy engine, part of the control plane, evaluates requests and decides to grant or deny.",
      distractorExplanations: {
        b: "The policy enforcement point carries out the decision on the traffic path rather than making it.",
        c: "An implicit trust zone is where approved traffic flows after a request is granted.",
        d: "The subject is the user or device making the request."
      }
    },
    {
      id: "q-x-d1-14", domainId: "d1", tag: "d1-t181", type: "single",
      prompt: "A system records which user accessed which file and when, so activity can be reviewed later. Which part of AAA is this?",
      choices: [
        { id: "a", text: "Accounting" },
        { id: "b", text: "Authentication" },
        { id: "c", text: "Authorization" },
        { id: "d", text: "Availability" }
      ],
      correct: "a",
      explanation: "Accounting records what was done, by whom, and when, producing audit trails.",
      distractorExplanations: {
        b: "Authentication verifies identity before access is granted.",
        c: "Authorization determines what an identity is allowed to do.",
        d: "Availability is a CIA goal, not part of AAA."
      }
    },
    {
      id: "q-x-d1-15", domainId: "d1", tag: "d1-t182", type: "single",
      prompt: "Which item should be prepared BEFORE implementing a change so the team can restore service if the change fails?",
      choices: [
        { id: "a", text: "A backout plan" },
        { id: "b", text: "An updated network diagram" },
        { id: "c", text: "A post-implementation review" },
        { id: "d", text: "A new acceptable use policy" }
      ],
      correct: "a",
      explanation: "A backout (rollback) plan describes how to return to the previous state and must exist before the change is implemented.",
      distractorExplanations: {
        b: "Updating diagrams is part of documentation after the change.",
        c: "A post-implementation review happens after the change.",
        d: "An acceptable use policy governs user behavior and does not help reverse a failed change."
      }
    },
    {
      id: "q-x-d1-16", domainId: "d1", tag: "d1-t182", type: "single",
      prompt: "A critical vulnerability is being actively exploited and a patch must be applied immediately outside the normal schedule. What type of change is this?",
      choices: [
        { id: "a", text: "Emergency change" },
        { id: "b", text: "Standard change" },
        { id: "c", text: "Deferred change" },
        { id: "d", text: "Informal change that needs no record" }
      ],
      correct: "a",
      explanation: "An emergency change is expedited to address an urgent issue, with faster approval and a review afterward.",
      distractorExplanations: {
        b: "A standard change is routine, low-risk, and pre-approved.",
        c: "Deferring the change would leave an actively exploited flaw unaddressed.",
        d: "Even urgent changes need a record and a backout plan."
      }
    },
    {
      id: "q-x-d2-13", domainId: "d2", tag: "d2-t180", type: "single",
      prompt: "A well-funded group maintains long-term, stealthy access to a defense contractor's network to steal designs, using custom malware. Which threat actor and motivation BEST fit?",
      choices: [
        { id: "a", text: "Nation-state; espionage" },
        { id: "b", text: "Unskilled attacker; chaos" },
        { id: "c", text: "Hacktivist; political protest" },
        { id: "d", text: "Insider threat; revenge" }
      ],
      correct: "a",
      explanation: "Long-term, resourced, sophisticated intrusions to steal sensitive designs are characteristic of nation-state espionage.",
      distractorExplanations: {
        b: "Unskilled attackers use simple tools and lack the resources for sustained custom campaigns.",
        c: "Hacktivists seek publicity for a cause and typically do not quietly steal designs for years.",
        d: "The scenario describes an external group, not someone with legitimate internal access."
      }
    },
    {
      id: "q-x-d2-14", domainId: "d2", tag: "d2-t180", type: "single",
      prompt: "A security researcher finds a flaw in a company's website without permission and emails the company to report it, with no intent to cause harm. How is this person BEST described?",
      choices: [
        { id: "a", text: "Gray hat" },
        { id: "b", text: "White hat" },
        { id: "c", text: "Black hat" },
        { id: "d", text: "Authorized penetration tester" }
      ],
      correct: "a",
      explanation: "Acting without authorization but without malicious intent describes a gray hat hacker.",
      distractorExplanations: {
        b: "A white hat has permission to test; this researcher did not.",
        c: "A black hat acts with malicious or criminal intent, which is not described.",
        d: "An authorized tester operates under a written agreement, which was not the case here."
      }
    },
    {
      id: "q-x-d2-15", domainId: "d2", tag: "d2-t181", type: "single",
      prompt: "A company wants to prevent unknown executables from running on its payment servers, even if they have never been seen before. Which mitigation is MOST effective?",
      choices: [
        { id: "a", text: "Application allow list" },
        { id: "b", text: "Signature-based antivirus only" },
        { id: "c", text: "A block list of known-bad programs" },
        { id: "d", text: "Increasing the log retention period" }
      ],
      correct: "a",
      explanation: "An allow list permits only approved applications, so unknown software is blocked by default.",
      distractorExplanations: {
        b: "Signature antivirus detects known malware and can miss new or unknown executables.",
        c: "A block list only stops items already known to be bad.",
        d: "Log retention supports investigation but does not prevent execution."
      }
    },
    {
      id: "q-x-d2-16", domainId: "d2", tag: "d2-t181", type: "single",
      prompt: "Which hardening step addresses the risk that an attacker logs in to a newly installed router using the manufacturer's documented credentials?",
      choices: [
        { id: "a", text: "Change default passwords and remove default accounts" },
        { id: "b", text: "Install additional monitoring software" },
        { id: "c", text: "Enable full-disk encryption" },
        { id: "d", text: "Increase the logging level" }
      ],
      correct: "a",
      explanation: "Changing default passwords and accounts removes the well-known credentials attackers try first.",
      distractorExplanations: {
        b: "Monitoring may detect misuse but does not remove the default credential weakness.",
        c: "Disk encryption protects stored data and does not stop a login with default credentials.",
        d: "Higher logging records activity but does not prevent the login."
      }
    },
    {
      id: "q-x-d2-17", domainId: "d2", tag: "d2-t182", type: "single",
      prompt: "Malware keeps returning on a server even after the operating system is reinstalled and the disk is replaced. Which location is MOST likely infected?",
      choices: [
        { id: "a", text: "Firmware" },
        { id: "b", text: "A user's browser extension" },
        { id: "c", text: "An application configuration file" },
        { id: "d", text: "The recycle bin" }
      ],
      correct: "a",
      explanation: "Firmware lives on the hardware beneath the operating system and survives OS reinstallation and disk replacement.",
      distractorExplanations: {
        b: "A browser extension would not persist across an OS reinstall and disk replacement on a server.",
        c: "A configuration file on the replaced disk would be gone.",
        d: "The recycle bin is part of the file system and would not survive a reinstall and disk replacement."
      }
    },
    {
      id: "q-x-d2-18", domainId: "d2", tag: "d2-t182", type: "single",
      prompt: "A processor flaw allows one program to infer data from another by exploiting speculative execution, without any software bug in the targeted program. What type of vulnerability is this?",
      choices: [
        { id: "a", text: "Hardware side-channel vulnerability" },
        { id: "b", text: "SQL injection" },
        { id: "c", text: "Cross-site scripting" },
        { id: "d", text: "Weak password policy" }
      ],
      correct: "a",
      explanation: "Spectre and Meltdown-style flaws leak data through processor behavior, which is a hardware side-channel vulnerability.",
      distractorExplanations: {
        b: "SQL injection abuses unsafe database queries in applications.",
        c: "Cross-site scripting injects script into web pages.",
        d: "A weak password policy concerns authentication settings, not processor behavior."
      }
    },
    {
      id: "q-x-d2-19", domainId: "d2", tag: "d2-t183", type: "single",
      prompt: "A user account logs in from Manila and, eleven minutes later, from a city in another country that cannot be reached in that time. What does this BEST indicate?",
      choices: [
        { id: "a", text: "Impossible travel suggesting a compromised account" },
        { id: "b", text: "A normal password change" },
        { id: "c", text: "Out-of-cycle logging only" },
        { id: "d", text: "Bloatware activity" }
      ],
      correct: "a",
      explanation: "Logins from distant locations within a time too short to travel are a classic sign of credential compromise.",
      distractorExplanations: {
        b: "A password change would not cause logins from two distant places.",
        c: "Out-of-cycle logging refers to activity at unusual times, not geographic impossibility.",
        d: "Bloatware is unneeded software and does not explain distant logins."
      }
    },
    {
      id: "q-x-d2-20", domainId: "d2", tag: "d2-t183", type: "single",
      prompt: "During an investigation, an analyst finds that the Security event log on a server was cleared late at night by an administrator account. Which indicator is this?",
      choices: [
        { id: "a", text: "Missing logs (defense evasion)" },
        { id: "b", text: "Resource consumption" },
        { id: "c", text: "Blocked content" },
        { id: "d", text: "Account lockout" }
      ],
      correct: "a",
      explanation: "Cleared or missing logs suggest an attacker covering their tracks and are evidence in themselves.",
      distractorExplanations: {
        b: "Resource consumption concerns abnormal CPU, memory, disk, or bandwidth use.",
        c: "Blocked content describes filters preventing malicious downloads or connections.",
        d: "Account lockout results from repeated failed logins."
      }
    }
  ],

  glossary: [
    { term: "Gray Hat Hacker", domain: "d2", plain: "Someone who breaks in without permission but does not mean harm.", technical: "A hacker who acts without authorization but without malicious intent, for example by reporting a flaw they found.", example: "Finding a bug on a site and emailing the owner." },
    { term: "Impossible Travel", domain: "d2", plain: "Logins from places too far apart for one person to travel between.", technical: "A detection that flags successful authentications from geographically distant locations within an impossibly short time.", example: "Manila at 9:00 and Frankfurt at 9:10." },
    { term: "Out-of-Cycle Logging", domain: "d2", plain: "Activity showing up in logs at odd times.", technical: "Log events or administrative actions occurring outside the normal expected schedule or pattern.", example: "A service account logging in on a Sunday at 3 a.m." },
    { term: "Bloatware", domain: "d2", plain: "Extra software you did not want that came with a device.", technical: "Unneeded preinstalled or bundled software that consumes resources and increases attack surface.", example: "Trial software preloaded on a new laptop." },
    { term: "Application Allow List", domain: "d2", plain: "Only approved programs may run.", technical: "A default-deny control permitting execution of explicitly approved applications.", example: "Servers running only a vetted software list." },
    { term: "Policy Engine", domain: "d1", plain: "The part of zero trust that decides yes or no.", technical: "A control-plane component that evaluates access requests against policy and context and decides to allow or deny.", example: "Checking user, device health, and location." },
    { term: "Policy Enforcement Point", domain: "d1", plain: "The gate that enforces the decision.", technical: "A data-plane component that enables, monitors, and terminates connections based on the policy administrator's instructions.", example: "A gateway opening a session to one application." },
    { term: "Backout Plan", domain: "d1", plain: "How to undo a change if it goes wrong.", technical: "A documented procedure to return a system to its prior state if a change fails.", example: "Restoring the saved firewall configuration." },
    { term: "Gap Analysis", domain: "d1", plain: "Measuring what is missing against a target.", technical: "Comparing current security posture with a desired state to identify and prioritize differences.", example: "Mapping controls to NIST CSF and listing missing ones." }
  ],

  acronyms: [
    { acro: "APT", expansion: "Advanced Persistent Threat", meaning: "A skilled adversary that maintains long-term access to a target." },
    { acro: "CAB", expansion: "Change Advisory Board", meaning: "A group that reviews and approves significant changes." },
    { acro: "SOP", expansion: "Standard Operating Procedure", meaning: "A documented step-by-step method for performing a task consistently." },
    { acro: "PE", expansion: "Policy Engine", meaning: "Zero trust component that decides whether to grant access." },
    { acro: "PA", expansion: "Policy Administrator", meaning: "Zero trust component that executes the engine's decision." },
    { acro: "PEP", expansion: "Policy Enforcement Point", meaning: "Zero trust gateway that enforces access decisions." },
    { acro: "PUP", expansion: "Potentially Unwanted Program", meaning: "Software a user may not want, such as bundled bloatware or adware." }
  ]
});
