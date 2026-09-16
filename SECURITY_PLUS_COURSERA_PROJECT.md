# Security+ Learning Platform — Claude Code Project Brief

## 1. Mission

Build a polished, Coursera-inspired web learning platform that teaches the CompTIA Security+ V7 (SY0-701) objectives from beginner level through exam readiness.

The learner is James, an IT student preparing for cybersecurity and SOC analyst work. Assume he understands basic IT and networking but is still learning security terminology. Lessons must be clear, practical, encouraging, and easy to follow.

This is an independent study platform inspired by modern online-course UX. It must not copy Coursera branding, layouts, copyrighted course content, or CompTIA questions. Display this disclaimer in the footer and About page:

> Security+ is a trademark of CompTIA. This independent study tool is not affiliated with or endorsed by CompTIA. All practice questions are original.

## 2. Claude Code Instructions

You are the lead product designer, curriculum architect, frontend engineer, and QA engineer.

1. Inspect the existing repository before changing anything.
2. Preserve useful existing code and follow the project's current stack when practical.
3. If the repository is empty, use React, TypeScript, Vite, Tailwind CSS, and Lucide icons.
4. Create a responsive, accessible, production-quality application.
5. Use local structured data for course content so the application works without a backend.
6. Use `localStorage` for progress, bookmarks, notes, quiz history, settings, and study streaks.
7. Do not require paid APIs, authentication, or external services for the MVP.
8. Do not use placeholder pages, fake buttons, dead links, lorem ipsum, or unfinished TODOs.
9. Write original explanations and questions. Do not reproduce proprietary CompTIA or commercial training content.
10. Run type-checking, linting, tests, and a production build. Fix all errors before finishing.
11. Create a concise `README.md` with setup, scripts, architecture, and content-editing instructions.

## 3. Product Name and Visual Direction

Working title: **Security+ Learning Path**

Subtitle: **From IT Foundations to SOC Analyst Readiness**

Design direction:

- Professional modern learning platform with a calm cybersecurity identity.
- Deep navy and charcoal foundation, white/light learning surfaces, teal or electric blue accents.
- Strong typography, generous spacing, rounded cards, subtle borders, and restrained shadows.
- Use icons, timelines, progress rings, and small diagrams where they improve learning.
- Avoid hacker clichés, excessive neon, matrix backgrounds, skulls, and clutter.
- Support light and dark mode.
- Fully responsive on desktop, tablet, and mobile.
- Meet WCAG-friendly color contrast, keyboard navigation, visible focus states, and semantic HTML.

## 4. Official Exam Snapshot

Create an Exam Overview page and dashboard card using this supplied baseline:

| Item | Detail |
| --- | --- |
| Certification | CompTIA Security+ V7 |
| Exam code | SY0-701 |
| Launch date | November 7, 2023 |
| Questions | Maximum of 90 |
| Question types | Multiple-choice and performance-based questions |
| Duration | 90 minutes |
| Passing score | 750 on a scale of 100–900 |
| Languages | English, Japanese, Portuguese, Spanish, and Thai |
| Recommended experience | Network+ knowledge and two years in a security or systems administrator role |
| English retirement | June 11, 2027 |
| Other listed language retirement | August 13, 2027 |

Add a small “Last reviewed” label in the content data. Exam policies and dates can change, so provide a visible link to the official CompTIA Security+ page for verification.

## 5. Learning Outcomes

By completing the course, the learner should be able to:

- Explain core security principles using plain language.
- Identify common threats, vulnerabilities, attack paths, and mitigations.
- Compare secure architecture choices across on-premises, cloud, IoT, ICS, and virtualized systems.
- Interpret logs and alerts and recommend an appropriate first response.
- Apply identity, endpoint, network, data, and cloud security controls.
- Follow incident response, vulnerability management, and digital forensics processes.
- Explain governance, risk, compliance, audit, privacy, and third-party risk concepts.
- Solve original multiple-choice and PBQ-style scenarios under exam timing.
- Connect Security+ concepts to entry-level SOC analyst responsibilities.

## 6. Course Structure

Build a guided course with an orientation, five weighted domains, a review module, and a final exam. Each module must contain lessons, short knowledge checks, a domain quiz, and at least one applied activity.

### Module 0 — Start Here

- Welcome and how to use the platform
- SY0-701 exam format and scoring
- Diagnostic assessment: 20 original questions
- How to read scenario questions
- Study-plan selection: 4-week intensive, 8-week balanced, or 12-week relaxed
- Basic networking refresher: IP, ports, protocols, DNS, DHCP, HTTP/S, routing, switching, VLANs, VPNs, and firewalls
- Basic operating-system refresher: processes, permissions, services, logs, patching, and command-line concepts
- Ethics and legal boundaries for security labs

### Module 1 — General Security Concepts (12%)

#### 1.1 Security Controls

- Control categories: technical, managerial, operational, and physical
- Control types: preventive, deterrent, detective, corrective, compensating, and directive
- Teach the difference between category and function
- Use examples from a restaurant, university, cloud account, and SOC

#### 1.2 Fundamental Security Concepts

- Confidentiality, integrity, and availability (CIA)
- Non-repudiation
- Authentication, authorization, and accounting (AAA)
- Zero trust: control plane, data plane, policy enforcement, least privilege, and continuous verification
- Deception and disruption: honeypots, honeynets, honeyfiles, honeytokens, and fake telemetry

#### 1.3 Change Management

- Approval processes, ownership, stakeholders, impact analysis, testing, rollback, maintenance windows, documentation, standard operating procedures, and version control
- Security risks caused by undocumented or untested change
- Scenario: updating a production firewall rule safely

#### 1.4 Cryptographic Solutions

- Symmetric and asymmetric encryption
- Hashing, salting, key stretching, digital signatures, certificates, PKI, certificate authorities, certificate revocation, and key management
- Data at rest, in transit, and in use
- Obfuscation, tokenization, masking, and steganography
- Blockchain concepts and appropriate use cases
- Scenario: choose the correct cryptographic solution without doing advanced mathematics

**Applied activity:** Match security controls to risks and build a safe change request for a firewall update.

### Module 2 — Threats, Vulnerabilities, and Mitigations (22%)

#### 2.1 Threat Actors and Motivations

- Nation-state, organized crime, hacktivist, insider, unskilled attacker, competitor, and shadow IT
- Internal versus external actors
- Resources, sophistication, access, intent, and motivations
- Data exfiltration, espionage, disruption, financial gain, revenge, ideology, and war

#### 2.2 Threat Vectors and Attack Surfaces

- Email, SMS, instant message, QR code, voice call, removable media, wireless, Bluetooth, open services, default credentials, vulnerable software, supply chain, third party, and social engineering
- Phishing, spear phishing, whaling, smishing, vishing, pretexting, impersonation, baiting, tailgating, and shoulder surfing

#### 2.3 Vulnerabilities

- Application: injection, buffer overflow, race condition, insecure design, misconfiguration, and outdated components
- Web: XSS, CSRF, SSRF, directory traversal, session issues, and insecure APIs
- Hardware, firmware, mobile, OS, virtualization, VM escape, container, cloud, and supply-chain weaknesses
- Zero-day and legacy-system risk

#### 2.4 Malicious Activity

- Malware: ransomware, trojan, worm, virus, rootkit, spyware, keylogger, logic bomb, and fileless malware
- Password: brute force, dictionary, spraying, credential stuffing, rainbow table, and offline cracking
- Network: on-path, replay, spoofing, poisoning, DoS/DDoS, evil twin, rogue AP, and DNS attacks
- Application, physical, and cryptographic attacks
- Indicators of compromise and behavior-based indicators

#### 2.5 Mitigation Techniques

- Segmentation, isolation, least privilege, allowlisting, access control, configuration enforcement, hardening, patching, secure protocols, monitoring, and user training
- Select mitigations based on the attack rather than memorizing isolated definitions

**Applied activity:** Investigate a fictional phishing-to-ransomware attack chain, identify evidence, and choose prioritized mitigations.

### Module 3 — Security Architecture (18%)

#### 3.1 Architecture Models

- On-premises, public/private/hybrid cloud, virtualization, containers, serverless, edge, IoT, ICS/SCADA, and infrastructure as code
- Shared responsibility model
- Availability, scalability, cost, control, and security tradeoffs

#### 3.2 Enterprise Infrastructure

- Network zones, segmentation, VLANs, DMZ, screened subnet, air gaps, jump servers, bastion hosts, proxies, load balancers, firewalls, IDS/IPS, VPN, SD-WAN, and SASE concepts
- Secure protocols and remote access
- North-south versus east-west traffic
- Control placement and defense in depth

#### 3.3 Data Protection

- Data types, ownership, sovereignty, residency, retention, disposal, and lifecycle
- Classifications and handling requirements
- Encryption, hashing, masking, tokenization, DLP, access restrictions, and backups

#### 3.4 Resilience and Recovery

- High availability, clustering, redundancy, load balancing, fault tolerance, geographic dispersion, and platform diversity
- Hot, warm, cold, and mobile sites
- Full, incremental, differential, snapshot, replication, and offline/immutable backups
- RTO, RPO, MTTR, MTBF, continuity of operations, tabletop exercises, failover testing, and restoration testing
- UPS, generators, and power considerations

**Applied activity:** Design a secure and resilient small-business/cloud architecture by placing controls on an interactive diagram.

### Module 4 — Security Operations (28%)

This is the largest module and should receive the most lessons, quiz questions, and practice time.

#### 4.1 Secure Computing Resources

- Secure baselines, hardening, patching, configuration management, host firewalls, endpoint protection, application security, sandboxing, wireless security, mobile device management, and monitoring
- BYOD, COPE, CYOD, and corporate-owned device considerations

#### 4.2 Asset Management

- Acquisition, inventory, classification, ownership, assignment, monitoring, secure disposal, sanitization, and decommissioning
- Hardware, software, data, cloud resource, and license tracking

#### 4.3 Vulnerability Management

- Identification, scanning, analysis, prioritization, remediation, exception handling, validation, and reporting
- CVE, CVSS, false positives, environmental context, exploitability, exposure, and business impact
- Credentialed versus non-credentialed and intrusive versus non-intrusive scans

#### 4.4 Alerting and Monitoring

- SIEM, SOAR, syslog, SNMP, NetFlow, packet capture, vulnerability scanners, log aggregation, dashboards, and alert tuning
- Baselines, thresholds, correlation, trends, false positives, false negatives, and alert fatigue
- Time synchronization and log retention

#### 4.5 Enterprise Security Controls

- Firewall rules, IDS/IPS signatures, web filters, DNS filtering, email security, DLP, NAC, EDR, XDR, secure web gateways, and network sensors
- When to block, quarantine, isolate, contain, monitor, or escalate

#### 4.6 Identity and Access Management

- Account provisioning and deprovisioning
- Least privilege, role-based/access models, separation of duties, privileged access management, just-in-time permissions, and periodic access review
- Passwordless authentication, MFA factors, SSO, federation, LDAP, Kerberos, RADIUS, SAML, OAuth, and OpenID Connect at an exam-appropriate level

#### 4.7 Automation and Orchestration

- Repeatable workflows, scripting, APIs, playbooks, infrastructure as code, automated containment, ticket creation, enrichment, and reporting
- Benefits: speed, consistency, scale, and reduced manual error
- Risks: bad inputs, excessive privilege, lack of human review, technical debt, and automation blast radius

#### 4.8 Incident Response

- Preparation, detection, analysis, containment, eradication, recovery, and lessons learned
- Roles, communication, escalation, playbooks, tabletop exercises, root-cause analysis, threat hunting, and evidence handling
- Order of volatility, chain of custody, legal hold, acquisition, preservation, analysis, and reporting

#### 4.9 Investigation Data Sources

- Firewall, DNS, DHCP, VPN, authentication, endpoint, application, web server, cloud, identity provider, email, and network-flow logs
- Packet captures, metadata, vulnerability scans, threat intelligence, and file hashes
- Recognize useful fields: timestamp, source/destination IP, port, username, action, status, process, parent process, URL/domain, and hash

**Applied activities:**

1. Triage a suspicious-login alert.
2. Analyze a small set of fictional firewall, authentication, DNS, and endpoint logs.
3. Prioritize vulnerabilities using CVSS plus business context.
4. Build an incident timeline and choose containment actions.
5. Complete a SOC analyst shift simulation with five alerts, including benign activity and false positives.

### Module 5 — Security Program Management and Oversight (20%)

#### 5.1 Security Governance

- Policies, standards, procedures, guidelines, governance structures, committees, roles, responsibilities, monitoring, and external considerations
- Explain the hierarchy and how each document is used

#### 5.2 Risk Management

- Risk identification, assessment, analysis, register, owner, appetite, tolerance, threshold, reporting, and monitoring
- Avoid, transfer, mitigate, accept, and exception/escalation decisions
- Likelihood, impact, exposure factor, SLE, ARO, and ALE with simple worked examples
- Business impact analysis, critical functions, dependencies, RTO, and RPO

#### 5.3 Third-Party Risk

- Vendor assessment, due diligence, selection, questionnaires, audits, monitoring, right-to-audit clauses, data-processing agreements, NDAs, SLAs, MOUs, MSAs, and rules of engagement
- Supply-chain and concentration risk

#### 5.4 Compliance and Privacy

- Compliance monitoring and reporting
- Consequences of non-compliance
- Privacy principles: data minimization, purpose limitation, consent, retention, deletion, and data-subject rights
- Explain regulations conceptually; avoid presenting the application as legal advice

#### 5.5 Audits and Assessments

- Internal and external audit, attestation, evidence, gap assessment, vulnerability assessment, penetration test, red team, blue team, purple team, and rules of engagement

#### 5.6 Security Awareness

- Phishing simulations, reporting processes, anomalous behavior, insider risk, clean desk, removable media, password habits, social engineering, and role-based training
- Measure outcomes rather than training attendance alone

**Applied activity:** Create a small risk register and decide how to treat each risk within a fictional organization.

### Module 6 — Final Review and Exam Readiness

- Acronym and ports review
- “Choose the BEST answer” strategy
- Performance-based question strategy
- Weak-domain review generated from quiz performance
- Timed mini exams: 15, 30, and 45 questions
- Full mock exam: up to 90 original questions in 90 minutes
- Final readiness report by domain
- Personalized next-step recommendations

## 7. Standard Lesson Formula

Every lesson must use the same predictable learning sequence:

1. **Lesson goal** — one sentence explaining what the learner will be able to do.
2. **Why this matters** — connect it to an exam scenario and a real SOC or IT task.
3. **Simple explanation** — plain English first; avoid circular definitions.
4. **Key terms** — expandable glossary cards with acronym pronunciation/expansion.
5. **Real-life analogy** — use familiar examples such as a house, restaurant, school, airport, or cloud application.
6. **Technical example** — realistic but safe scenario.
7. **Visual summary** — a compact comparison table, flow, or diagram when useful.
8. **Common confusion** — explicitly compare terms learners often mix up.
9. **SOC analyst connection** — explain what the learner may see in an alert, ticket, log, or interview.
10. **Knowledge check** — 3–5 original questions with immediate feedback.
11. **Key takeaway** — no more than three memorable points.
12. **Optional Taglish help** — collapsible beginner explanation, not a full duplicate of the lesson.

Keep initial lesson sections concise and use progressive disclosure for deeper details.

## 8. Assessment System

### Question Types

- Single-answer multiple choice
- Multiple select with the required number clearly stated
- Matching
- Ordering/sequence
- Categorization
- Fill-in-the-blank for acronyms or ports
- PBQ-style scenarios using drag-and-drop or selection interactions
- Log-analysis questions
- Architecture/control-placement questions

### Question Requirements

- All questions must be original.
- Every answer must include why the correct choice is right and why each distractor is wrong.
- Avoid trivia that is outside the supplied objectives.
- Scenario questions should test application, not only recognition.
- Randomize answer order without changing question meaning.
- Allow flagging questions for review.
- Do not reveal answers until the learner submits the current question or quiz.
- Track attempts, time, score, confidence, and objective tags.
- Use an objective-balanced question bank with at least 150 original questions for the completed MVP.
- Weight full mock exams approximately by official domain weighting: 12%, 22%, 18%, 28%, and 20%.
- Use percentage scores for internal practice. Clearly state that practice percentages do not convert directly to CompTIA's scaled score.

### Recommended Mastery Rules

- Lesson completed: learner reaches the end and submits the knowledge check.
- Lesson mastered: at least 80% on its best knowledge-check attempt.
- Domain mastered: at least 80% on the domain quiz and all required applied activities attempted.
- Exam ready: at least 85% on two recent timed mock exams, no domain below 75%, and all required modules completed.

These are study recommendations, not guarantees of passing.

## 9. Hands-On Lab Design

Labs must be safe, legal, and runnable without attacking real systems. Use simulated logs, fictional domains/IP addresses, sandboxed local examples, or guided analysis.

Each lab includes:

- Objective
- Estimated time
- Scenario
- Materials or provided data
- Step-by-step tasks
- Hint system
- Validation/check-answer action
- Explanation of expected findings
- Reflection question
- SOC ticket or short report generated by the learner

Suggested labs:

- Identify suspicious fields in authentication logs
- Read firewall allow/deny entries
- Analyze a phishing email using fictional headers and links
- Compare file hashes to a fictional threat-intelligence list
- Categorize vulnerabilities by priority
- Harden a fictional workstation using a checklist
- Build a least-privilege access matrix
- Arrange incident response steps
- Complete chain-of-custody documentation
- Create and update a basic risk register

Never ask the learner to scan, exploit, phish, disrupt, or access a system they do not own or have explicit permission to test.

## 10. Core Pages and User Experience

### Landing Page

- Strong course title and description
- Exam facts
- Five-domain overview
- “Start learning” and “Continue course” actions
- Benefits: guided learning, original practice, hands-on simulations, and SOC connections
- Independent-study disclaimer

### Learner Dashboard

- Overall course completion
- Domain mastery bars using official weights
- Continue-learning card
- Current study plan and today's task
- Study streak and weekly minutes
- Recent quiz scores
- Weak objectives needing review
- Bookmarked lessons
- Readiness indicator with an explanation, not just a color

### Course Catalog / Syllabus

- Expandable modules and lessons
- Objective codes/tags
- Estimated time
- Completion and mastery state
- Locked sequencing optional in settings; default to free navigation

### Lesson Player

- Left sidebar curriculum on desktop; drawer on mobile
- Main lesson content
- Sticky progress/header controls
- Previous and next lesson actions
- Bookmark, personal notes, mark complete, and glossary controls
- Reading progress
- Keyboard accessible interactions

### Practice Center

- Practice by domain, objective, question type, incorrect answers, bookmarks, or weak areas
- Custom quiz builder
- Timed and untimed modes
- Immediate-feedback and exam-simulation modes
- Quiz history and review

### Labs / SOC Simulator

- Scenario briefing
- Evidence tabs for logs, alerts, assets, and notes
- Task checklist
- Decision controls
- Results with an expert walkthrough

### Progress and Analytics

- Domain scores
- Objective mastery heatmap
- Time studied
- Attempts and improvement trend
- Frequently missed concepts
- Activity history
- Export progress as a local JSON file
- Import a previously exported progress JSON file with validation and confirmation

### Glossary

- Searchable acronym and concept list
- Filters by domain
- Plain-language definition, technical definition, example, and related terms

### Exam Readiness

- Exam-day facts and checklist
- Readiness criteria
- Weak-domain action plan
- Timed mock exams
- Results report with recommended review lessons

### Settings

- Light/dark/system theme
- 4-, 8-, or 12-week plan
- Daily time goal
- Optional Taglish help
- Reduced motion
- Reset-progress action with explicit confirmation

## 11. Data and State Model

Keep course data separate from UI components. Use typed objects similar to:

```ts
type Domain = {
  id: string;
  number: number;
  title: string;
  examWeight: number;
  description: string;
  modules: Module[];
};

type Lesson = {
  id: string;
  objectiveTags: string[];
  title: string;
  estimatedMinutes: number;
  learningGoal: string;
  sections: LessonSection[];
  knowledgeCheckIds: string[];
  labId?: string;
};

type Question = {
  id: string;
  domainId: string;
  objectiveTags: string[];
  difficulty: "foundation" | "exam" | "challenge";
  type: "single" | "multi" | "matching" | "ordering" | "categorization" | "pbq";
  prompt: string;
  scenario?: string;
  choices?: Choice[];
  correctAnswer: unknown;
  explanation: string;
  distractorExplanations?: Record<string, string>;
};
```

Persist a versioned learner-state object. Include migration/fallback handling so future content changes do not corrupt progress. Do not store secrets or sensitive personal data.

## 12. Study-Plan Logic

Generate plans based on total estimated course minutes and selected schedule:

- **4-week intensive:** six study days per week; longer sessions and two practice blocks weekly.
- **8-week balanced:** five study days per week; moderate lessons plus weekly review.
- **12-week relaxed:** four study days per week; shorter sessions plus spaced repetition.

Allocate study time proportionally to domain weight, then add extra review time to weak objectives. Allow the learner to mark a day complete, skip, reschedule, or regenerate remaining tasks without deleting historical progress.

## 13. Seed Content Requirement

Do not ship an empty course shell. The initial implementation must include:

- Complete navigation and descriptions for all modules and lessons listed above.
- At least one fully written flagship lesson per official domain using the Standard Lesson Formula.
- Concise but useful learning content for every other listed lesson.
- At least 150 original practice questions distributed by exam weighting.
- At least 10 safe applied labs or simulations.
- A glossary of at least 120 relevant terms/acronyms.
- One 20-question diagnostic assessment.
- Domain quizzes.
- 15-, 30-, and 45-question mini-exam modes.
- A 90-question full mock-exam mode drawn from the question bank without obvious repetition.

If generating all content in one pass risks low quality, implement it in verified batches. Keep the application working after every batch and record content coverage in `CONTENT_STATUS.md`.

## 14. Important Teaching Comparisons

Include especially clear comparison tables or interactive cards for:

- Authentication vs authorization vs accounting
- Encryption vs hashing vs encoding vs obfuscation
- Symmetric vs asymmetric encryption
- Digital signature vs encryption
- IDS vs IPS
- EDR vs XDR vs SIEM vs SOAR
- Vulnerability scan vs penetration test vs audit
- Risk appetite vs tolerance vs threshold
- Policy vs standard vs procedure vs guideline
- RTO vs RPO
- SLE vs ARO vs ALE
- Hot vs warm vs cold sites
- Full vs incremental vs differential backup
- False positive vs false negative
- Threat vs vulnerability vs risk vs exploit
- Preventive vs detective vs corrective controls
- SAML vs OAuth vs OpenID Connect
- Containment vs eradication vs recovery

## 15. Quality and Accuracy Rules

- Prioritize the supplied SY0-701 scope and map content to official objectives.
- Do not invent official objective numbers when uncertain; use internal topic tags until verified.
- Keep exam facts in one configuration file so they are easy to update.
- Distinguish facts, simplified explanations, and learning analogies.
- Avoid implying that one tool or control solves every security problem.
- Make command examples safe and explain expected output.
- Use documentation-only example IP ranges, fictional organizations, and non-live domains.
- Proofread acronyms, protocol names, and security terminology.
- Include source links only to authoritative, legal, freely accessible references where needed.
- Never promise certification success.

## 16. Functional Requirements

- All navigation, filters, search, tabs, accordions, theme controls, quizzes, timers, bookmarks, notes, and progress actions must work.
- Refreshing the page must preserve learner state.
- A learner must be able to resume the last lesson and unfinished quiz.
- Search must find lessons and glossary entries.
- Quiz timers must survive accidental navigation where practical.
- Mock-exam submission must show score, time, domain breakdown, flagged questions, and explanations.
- Progress calculations must be deterministic and tested.
- Domain weighting must total 100%.
- Reset and import operations must require confirmation.
- App must work without horizontal scrolling at common mobile widths.
- Empty states and error states must be thoughtfully designed.

## 17. Testing and Verification

Create tests for the most important logic:

- Domain weights total 100%.
- Study-plan allocation works for 4, 8, and 12 weeks.
- Quiz scoring handles single and multiple-select questions.
- Mock-exam generation respects approximate domain weights.
- Progress persistence and state migration work.
- Import rejects malformed progress files.
- Readiness status follows the documented mastery rules.

Before completion:

1. Run the app and inspect every primary route.
2. Test one complete learner journey: diagnostic → lesson → knowledge check → lab → domain quiz → dashboard.
3. Test a mock exam from start to results.
4. Check mobile and desktop layouts.
5. Verify keyboard navigation and visible focus states.
6. Confirm there are no console errors, broken imports, or dead controls.
7. Run tests, lint, type-check, and production build.

## 18. Definition of Done

The project is complete only when:

- The platform feels like a cohesive online course rather than a static notes website.
- All five official domains are represented according to their exam weights.
- A beginner can understand the lessons without a separate textbook.
- The learner can study, practice, complete labs, take mock exams, and track mastery.
- The course contains meaningful seeded content, not placeholders.
- Progress reliably persists locally.
- The experience is responsive and accessible.
- All primary interactions work.
- Automated checks and the production build pass.
- `README.md` and `CONTENT_STATUS.md` are accurate.

## 19. Recommended Build Order

1. Inspect repository and document the plan.
2. Establish design system, routing, and shared layout.
3. Implement typed curriculum/question/lab data models.
4. Build dashboard, syllabus, and lesson player.
5. Add progress persistence, bookmarks, notes, and settings.
6. Build quizzes, practice center, timers, and result explanations.
7. Build labs and SOC simulator interactions.
8. Add analytics, glossary, study plans, and readiness logic.
9. Seed and audit course content in batches.
10. Test the full learner journey and refine responsive/accessibility behavior.

Start by inspecting the repository, then implement the complete MVP. Make reasonable product decisions without repeatedly asking for confirmation. When finished, summarize what was built, the commands run, test/build results, and any genuinely optional future improvements.
