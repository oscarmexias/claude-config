---
name: |
  cv-build
description: |
  Builds tailored CV PDFs for Oscar Mejia from job vacancy URLs using ReportLab
---

# cv-build

Builds a tailored CV PDF for Oscar Mejia from a job vacancy URL.

## Invocation

```
/user:cv-build https://jobs.lever.co/celonis/pm-ai
```

Takes a single argument: the URL of the job vacancy.

---

## PHASE 1 — Parse vacancy

Use WebFetch to fetch the job URL.

Extract and record:
- **Company name** (clean, no punctuation — used for filename)
- **Role title** (exact title as written in the posting)
- **Key requirements** (top 5–8 bullet points or phrases)
- **Tools/tech mentioned** (e.g. SQL, Python, Figma, Salesforce, Jira)
- **Seniority level** (IC, Lead, Director, etc.)
- **Domain signals** — identify which of these apply: B2C, B2B, Fintech/Payments, AI/ML/Data, Web3/Crypto, Mobility, Enterprise SaaS, E-commerce, Health-tech, EdTech, Other

**Identify top 3 match signals** — what does this role value most? Examples:
- "Data-driven prioritization, SQL, ML literacy"
- "Consumer product, growth loops, B2C funnel"
- "Enterprise sales cycles, C-level stakeholders, API products"
- "Payments infrastructure, compliance, fintech regulation"

Print a summary block before proceeding:
```
VACANCY PARSED
  Company:       Celonis
  Role:          AI Product Manager
  Seniority:     Senior IC
  Domain:        Enterprise SaaS, AI/ML
  Top 3 signals: Process mining literacy · Data-driven PM · Enterprise sales cycles
```

---

## PHASE 2 — Read Oscar's data

Read these two files:
- `/Users/oscar.mejia/Desktop/Proyectos/CVs/build_cv_general.py` — canonical bullets and content
- `/Users/oscar.mejia/Desktop/Proyectos/CVs/build_cv_celonis.py` — reference implementation (most up-to-date structure)

Also scan for any existing `build_cv_[company].py` whose domain matches the target role — use it as an additional reference for tone and bullet selection.

**Oscar's background by domain (baked in — do not re-read from files):**

| Domain | Strongest card |
|---|---|
| Mobility / B2C | Bochito — founder, PMF, 5K users, Plug and Play Sunnyvale |
| Payments / Fintech | Socios — MiCA, FCA, CHZ migration, 20+ payment methods, passkey |
| Enterprise / B2B | Wizeline — C-level, 200+ stores POS integration, retail + health-tech |
| AI / ML / Data | IBM — IoT predictive maintenance, ML anomaly detection, 60% cost reduction, 35% uptime |
| Web3 / Crypto | Socios — Chiliz Chain, on-chain flows, CHZ token |
| Teaching | SBS Swiss Business School — MSc level, Digital Customer, AI-driven personalization |
| Squad leadership | Socios — 2 squads, 18 people |
| Languages | ES native, EN C1, DE B1, IT A2 — asset for DACH/EU roles |
| Founder / 0→1 | Bochito — built from zero, institutional partnerships, seed funding |

**Standard experience order:** Socios → Wizeline → IBM → Bochito → SBS
- If role is explicitly ML/data-heavy: IBM can be surfaced in bullets emphasis, but keep the order unless it makes strong contextual sense to move it
- Never remove any company from the CV — always include all 5 roles

---

## PHASE 3 — Generate tailored build_cv_[company].py

Derive the company slug: lowercase, no spaces, no punctuation (e.g. "Celonis" → `celonis`, "Crypto.com" → `cryptocom`, "MotorK" → `motork`).

Create `/Users/oscar.mejia/Desktop/Proyectos/CVs/build_cv_[slug].py`

**Base the file on `build_cv_celonis.py`** — it is the canonical ReportLab implementation. Do not use `build_cv_from_template.py` (that is a legacy docx approach). Copy the full ReportLab boilerplate and modify only the content sections.

### Design system (MUST follow — never change any of these)

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, inch

_F = '/System/Library/Fonts/Supplemental/'
# Register: Arial, Arial Bold, Arial Italic, Arial Bold Italic

C_PRIMARY   = colors.HexColor('#1d1d1f')
C_SECONDARY = colors.HexColor('#6e6e73')
C_MUTED     = colors.HexColor('#8a8a8e')
C_RULE      = colors.HexColor('#c8c8cc')

doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=0.55*inch, rightMargin=0.55*inch,
    topMargin=0.43*inch,  bottomMargin=0.39*inch,
)
```

Output path: `/Users/oscar.mejia/Desktop/Proyectos/CVs/Oscar_Mejia_CV_[Slug].pdf`
(where `[Slug]` is CamelCase, e.g. `Celonis`, `CryptoCom`, `MotorK`)

### Content rules

**1. Title line**
Match the target role title exactly. Use what the job posting says. Examples:
- "AI Product Manager" (not "Senior PM" if the posting says "AI PM")
- "Product Lead" (if the posting uses that term)
- "Senior Product Manager, Payments" (if role is payments-specific)

**2. Summary (max 4 sentences)**
- Open with the domain the company operates in or the problem the company solves
- Connect Oscar's most relevant experience to that domain in sentence 2
- Sentence 3: any cross-domain depth that adds signal (e.g. ML literacy for AI roles)
- Sentence 4: the specific capability the company cares about most (from top 3 signals)
- No pronouns. Direct voice. No AI vices (see banned words below).
- Do NOT use "I" — CV convention is subject-pronoun-free.

Example structure for an AI/data role:
> "Ten years shipping data products, with roots in operational intelligence at IBM. [Domain connection.] [Supporting depth — e.g. payments at scale, 0→1 founding experience.] [Signal sentence — e.g. 'data-driven prioritization is how I make roadmaps defensible.']"

**3. Experience bullets**

Per job, max 3 bullets (use fewer if the role has low relevance to a specific company).

Bullet selection guide by domain signal:

| Signal | Surface these bullets |
|---|---|
| Payments / Fintech | Socios: payment migration (20+ methods), MiCA/FCA, passkey |
| AI / ML | IBM: predictive maintenance, ML anomaly detection, 60% cost, 35% uptime; Socios: event-level analysis |
| Enterprise B2B | Wizeline: POS 200+ stores, C-level alignment, cut TTM 40% |
| B2C / Consumer | Bochito: 5K users, PMF, Plug and Play; Socios: funnel/A/B |
| Web3 / Crypto | Socios: CHZ, Chiliz Chain, on-chain |
| 0→1 / Founding | Bochito: built from zero, partnerships, seed funding |
| Squad / Org | Socios: 2 squads, 18 people |

Bochito always gets 1 bullet (never 0, never more than 2).
SBS always gets the existing description paragraph (no bullet — it's a teaching role).

**4. Core Competences — reorder to lead with most relevant category**

Default order: AI & ML → Product → Enterprise → Languages
For a pure B2C consumer role: Product → AI & ML → Enterprise → Languages
For a payments/fintech role: Product → Enterprise → AI & ML → Languages
For an enterprise/SaaS role: Enterprise → Product → AI & ML → Languages

Adjust the content inside each category to emphasize tools mentioned in the job posting.
Example: if posting mentions "Amplitude" and Oscar has used it, add it. If posting says "SQL required" and it's not in competences, add it.

**5. File ends with the page-count verification block** (copy from celonis.py verbatim):

```python
import subprocess
r = subprocess.run(
    ['python3', '-c',
     'from pypdf import PdfReader; r=PdfReader(__import__("sys").argv[1]); print(len(r.pages))',
     OUTPUT],
    capture_output=True, text=True)
pages = r.stdout.strip()
print(f'{"✅" if pages=="1" else "⚠️ "} {pages} page(s) — {OUTPUT}')
```

---

## PHASE 4 — Build PDF

```bash
cd /Users/oscar.mejia/Desktop/Proyectos/CVs && python3 build_cv_[slug].py
```

Check the output line:
- `✅ 1 page(s)` → proceed to Phase 5
- `⚠️  2 page(s)` or more → tighten content:
  - Reduce spaceBefore/spaceAfter on section headers (try -1pt each)
  - Trim the longest bullet to one fewer clause
  - Reduce S_BODY leading from 14 to 13.5
  - Rebuild and re-check. Repeat until 1 page.

Do NOT change margins, font sizes, or page format to achieve fit. Only reduce content or micro-adjust spacing.

---

## PHASE 5 — Evaluate (iterative gate, minimum score 9.5/10)

Score each section from 0.0 to 10.0 against the rubric below.

### Scoring rubric

**1. Specificity (weight: high)**
Every claim must have a number, a concrete outcome, or a named mechanism.
- FAIL: "cut discovery cycles", "improved performance", "delivered results"
- PASS: "cut discovery time by 3 weeks", "raised uptime 35%", "shipped to 5,000 users"

**2. Active voice, strong verbs (weight: high)**
- FAIL: "was responsible for", "helped with", "assisted", "worked on"
- PASS: "Shipped", "Led", "Defined", "Cut", "Built", "Diagnosed", "Migrated", "Wired"

**3. No AI vices (weight: high — automatic blocker)**
These words are BANNED anywhere in the CV body:
`thrive, leverage, utilize, facilitate, streamline, innovative, robust, scalable` (as buzzword), `synergies, cross-functional` (as filler), `spearhead, orchestrate, driving, impactful, transformative, cutting-edge, game-changing, best-in-class, world-class, passionate, dynamic, results-driven, detail-oriented, thought leader, ecosystem`

**4. No em-dash chains (weight: high — automatic blocker)**
Pattern `X — Y` in bullet text is banned.
- FAIL: "Built the platform — cut costs by 40%"
- PASS: "Built the platform; cut costs 40%"
(Em-dashes are allowed in non-bullet text like company context descriptions, but never as a connector chain in bullets)

**5. Summary relevance (weight: medium)**
Summary must contain a direct signal for the target role's domain. If the role is AI/data and the summary has zero AI or data language → fail.

**6. Bullet structure (weight: medium)**
Structure: [verb] + [method/what] + [measurable result]. No bullet with only action and no result. No bullet with only result and no action.

**7. CV voice (weight: medium)**
No subject pronoun. "I Built" → remove the "I". No qualifying adverbs: "successfully", "effectively", "proactively".

**8. No filler openers (weight: low)**
No bullet starting with: "Worked on", "Helped", "Assisted", "Supported", "Participated in"

### Absolute blockers (automatic fail regardless of score)
- Vague metric with no number in any experience bullet
- Summary with zero domain signal for the target role
- Any AI vice word in body copy
- Em-dash connector chain in a bullet (`X — Y`)
- Passive voice as the main construction of a bullet

### Score table to print after each evaluation

```
┌─────────────┬───────┬──────────────────────────────────────────────────┐
│ Section     │ Score │ Issue                                            │
├─────────────┼───────┼──────────────────────────────────────────────────┤
│ summary     │  9.0  │ No fintech signal in sentence 1                  │
│ socios      │  9.5  │ —                                                │
│ wizeline    │  9.5  │ —                                                │
│ ibm         │  9.5  │ —                                                │
│ bochito     │  9.0  │ "closed seed funding" — no number                │
│ sbs         │  9.5  │ —                                                │
├─────────────┼───────┼──────────────────────────────────────────────────┤
│ OVERALL     │  9.2  │ Iterating (1/4)                                  │
└─────────────┴───────┴──────────────────────────────────────────────────┘
```

### Iteration loop

MAX 4 iterations.

Each iteration:
1. Fix the failing sections using the Edit tool (minimal targeted edits)
2. Rebuild: `python3 build_cv_[slug].py`
3. Confirm still 1 page
4. Re-score and print the updated table

**Stop condition:** OVERALL ≥ 9.5 with zero blockers.

If still below 9.5 after 4 iterations: save the best version and report remaining issues.

---

## PHASE 6 — Output

On pass (score ≥ 9.5, zero blockers):
```
✅ CV APPROVED — 9.7/10
   /Users/oscar.mejia/Desktop/Proyectos/CVs/Oscar_Mejia_CV_[Company].pdf
   Ready to send.
```

On fail (still below after 4 iterations):
```
⚠️  CV BLOCKED — best score 9.1/10
   Remaining issues:
   - bochito: "closed seed funding" needs a dollar amount or investor name
   - summary: no signal for [target domain]
   Manual review needed before sending.
```

---

## Copy house rules (enforce throughout all phases)

- No em-dash chains (X — Y) in bullets
- No AI vices (full list in Phase 5 rubric)
- Active voice — strong opening verbs
- No subject pronoun (CV convention — no "I Led", just "Led")
- Specific over vague — every claim needs a number or concrete outcome
- Outcomes over actions — what happened as a result, not just what was done
- No "help", "assist", "support", "participate" as the main verb of a bullet
- No qualifying adverbs — never "successfully shipped", just "shipped"

---

## Notes

- This skill is self-contained. Do not reference external skills or files for rules — everything needed is above.
- The canonical code template to clone is `build_cv_celonis.py` (ReportLab, A4, Arial).
- Never use `build_cv_from_template.py` — it is a legacy docx approach.
- Never modify margins or font sizes to achieve 1-page fit. Reduce content instead.
- The design system (colors, fonts, margins) is locked. Treat it as immutable.

## CLI Commands

```bash
# Add user content
skill-creator add-skill --pwd "/Users/oscar.mejia/.claude/skills/cv-build" [--title "Title" --content "Content"]|[--file=*.md]

# Search documentation
skill-creator search-skill --pwd "/Users/oscar.mejia/.claude/skills/cv-build" "query" [--mode=auto|chroma|fuzzy]
```
