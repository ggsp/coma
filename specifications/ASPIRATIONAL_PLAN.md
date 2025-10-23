# MVP Development Plan

**Product:** Research & Funding Community Platform
**Version:** MVP 1.0
**Horizon:** 12 weeks

---

## 1. Vision and Product Narrative

**Goal:**
Build a **digital platform** where researchers, funding bodies, and the public can explore past and ongoing research projects, see where funds went, and engage in topic-based communities to improve collaboration and funding allocation decisions.

**Tagline:**

> “Discover what has been researched, funded, and learned — and connect with the people behind it.”

**Unique Value Proposition:**
Combine **research transparency** (data, metrics, impact) with **community engagement** (collaboration, discussion, recommendations).

---

## 2. Primary Stakeholders and Personas

| Persona               | Description                      | Key Needs                                                                | Success Metrics                                                     |
| --------------------- | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **Researcher**        | Academic or applied scientist    | Showcase projects and results, find collaborators, access funding trends | Visibility, new collaborations, more efficient proposal matching    |
| **Funding Officer**   | Employee in funding agency       | Gain transparency on past funding, assess impact, identify gaps          | Faster funding decisions, measurable impact, better fund allocation |
| **Community Manager** | Admin or moderator               | Curate discussions, approve data, ensure trustworthiness                 | Active members, high-quality content                                |
| **Public/Observer**   | Journalist, policymaker, citizen | Explore research impact in simple visual form                            | Understanding of spending and results                               |

---

## 3. MVP Objectives and Success Criteria

| Objective                                                         | KPI / Success Indicator                    |
| ----------------------------------------------------------------- | ------------------------------------------ |
| Enable users to browse past research projects and funding data    | >1,000 searchable records integrated       |
| Allow authenticated researchers to create or claim their profiles | 100+ verified researcher profiles          |
| Enable basic community interaction                                | >100 posts / comments                      |
| Allow funding officers to tag or annotate projects                | >50 annotations or impact notes            |
| Demonstrate value to funding agencies                             | 1 pilot MoU with a national funding agency |

---

## 4. MVP Scope (In Scope vs. Out of Scope)

**In Scope (MVP)**

* Project and funding exploration
* Researcher and funding body profiles
* Discussion spaces per topic or funding call
* Project tagging and categorization (by theme, program, year, funding amount, outcome)
* Basic search and filters
* Authentication and role management
* Public/private visibility
* Analytics dashboard (basic insights)
* Admin backend for moderation and data import

**Out of Scope (Later versions)**

* Grant application workflow
* Automated impact metrics (citations, media mentions)
* Full proposal evaluation
* Recommendation engine (phase 2)
* Mobile apps (PWA only for MVP)

---

## 5. MVP Product Features (Prioritized by Value and Effort)

| Priority | Feature                   | Description                                                                                                                       |
| -------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🟢 P0    | **Project Database**      | Import and structure research projects and their funding data (title, PI, funding body, amount, duration, summary, results, tags) |
| 🟢 P0    | **Search & Filter**       | Search by title, keywords, funding body, researcher, topic, amount, year                                                          |
| 🟢 P0    | **Profiles**              | Researcher & funding body profiles with bio, projects, and affiliations                                                           |
| 🟢 P0    | **Community Spaces**      | Topic-based spaces (e.g., “Climate Research”, “AI for Health”) with posts and discussions                                         |
| 🟡 P1    | **Comments & Reactions**  | Comments and likes on projects and posts                                                                                          |
| 🟡 P1    | **Role-based Access**     | Researcher, Funder, Admin, Visitor (with different visibility levels)                                                             |
| 🟢 P0    | **Data Import Tool**      | CSV/Excel upload or API integration with open databases (e.g. FFG, Horizon Europe, NIH)                                           |
| 🟢 P0    | **Dashboard**             | Simple metrics: total funding, #projects, #researchers, average funding size, top topics                                          |
| 🟢 P0    | **Authentication**        | Email + OAuth (Google, ORCID for researchers)                                                                                     |
| 🟡 P1    | **Moderation Panel**      | Approve posts, flag inappropriate content                                                                                         |
| ⚪️ P2    | **Recommendation Engine** | Similar projects, funders, or researchers                                                                                         |
| ⚪️ P2    | **Advanced Analytics**    | Impact metrics (publications, outcomes, geography)                                                                                |

---

## 6. MVP Architecture Overview

**Overall approach:** Modular, multi-tenant Next.js + Azure architecture.

**Frontend:**

* **Next.js 15 App Router**
* **TailwindCSS + shadcn/ui**
* **NextAuth for OAuth (Google, ORCID, Entra External ID)**
* **Next-Intl** for i18n (EN + DE)
* **React Query** or server actions for data fetching
* **Client**: Responsive, PWA-capable, optimized for desktop & tablet

**Backend:**

* **Next.js API routes** or **NestJS BFF**
* **Azure SQL Database** (or PostgreSQL)
* **Prisma ORM**
* **Azure Blob Storage** for documents & attachments
* **Azure AI Search** for full-text and semantic project search
* **Redis Cache** for trending projects, sessions
* **Azure Web PubSub** for live updates (later)

**Data Model (MVP subset):**

```
User(id, name, email, role, affiliation)
Profile(userId, bio, orcidId, avatarUrl)
Funder(id, name, description)
Project(id, title, summary, startDate, endDate, fundingAmount, funderId, piUserId, tags[], status)
Post(id, spaceId, authorId, content, createdAt)
Comment(id, postId, authorId, content, createdAt)
Space(id, name, description, visibility)
Tag(id, name, category)
```

**Integrations:**

* ORCID API (researcher verification)
* Public grant datasets (via CSV/API)
* Azure Cognitive Search + OpenAI embeddings for semantic search

---

## 7. UX Flow (High-Level)

1. **Visitor View**

   * Explore funded projects (no login required)
   * Search & filter results
   * View funding overview dashboard

2. **Researcher View (Logged In)**

   * Claim/create profile (verify with ORCID)
   * Create or edit project details
   * Join or post in topic spaces
   * Comment on other projects

3. **Funder View**

   * Annotate projects (impact, relevance)
   * Moderate or highlight exemplary cases
   * View aggregate dashboards

4. **Admin**

   * Import funding data
   * Manage users, roles, and permissions
   * Approve edits and moderate discussions

---

## 8. Development Phases (12-Week MVP Plan)

### **Phase 1 – Foundation (Weeks 1–3)**

* Set up repo (Turborepo, pnpm, Next.js, Prisma, Azure CI/CD)
* Define data model and seed with synthetic data
* Implement authentication (NextAuth + Google + ORCID)
* Implement tenant-aware architecture and user roles
* Basic UI framework and theme setup

**Deliverables:**

* Running dev environment
* Auth + basic navigation
* Database + API skeleton

---

### **Phase 2 – Core Features (Weeks 4–7)**

* Implement Projects module (CRUD + search)
* Implement Profiles (researcher & funder)
* Implement Spaces (discussion areas)
* Implement Posts & Comments
* Basic dashboard for analytics
* CSV Import for projects

**Deliverables:**

* End-to-end “Discover → View → Discuss” flow
* Data import + search operational
* Public demo environment

---

### **Phase 3 – Polishing & Pilot (Weeks 8–12)**

* Advanced search & filters (topics, funder, year)
* Role-based visibility (e.g., private annotations for funders)
* Moderation tools
* Basic semantic search (optional AI integration)
* Analytics charts and digests
* Usability testing with pilot users

**Deliverables:**

* Functional MVP with 3 roles and 3 data sets
* Pilot version for one funding body
* Documentation and admin dashboard

---

## 9. Non-Functional Requirements

| Category           | Target                                              |
| ------------------ | --------------------------------------------------- |
| **Performance**    | p95 < 300 ms read, < 500 ms write                   |
| **Availability**   | 99.9%                                               |
| **Security**       | GDPR compliant, TLS enforced, Key Vault for secrets |
| **Data Residency** | Hosted in EU                                        |
| **Accessibility**  | WCAG 2.2 AA                                         |
| **Scalability**    | 100k projects, 10k users                            |
| **Compliance**     | GDPR (DSR endpoints, audit logs)                    |

---

## 10. KPIs and Validation Metrics

| Category     | Metric                                  | Target |
| ------------ | --------------------------------------- | ------ |
| Adoption     | Registered researchers                  | 100+   |
| Engagement   | Avg. 3+ interactions per user per month |        |
| Transparency | % of funding mapped to projects         | >70%   |
| Activity     | 10+ active topic spaces                 |        |
| Conversion   | 1 partnership with funding institution  |        |
| Retention    | 40% returning monthly active users      |        |

---

## 11. Open Technical Questions

1. Should project metadata originate from **existing public APIs** (e.g., OpenAIRE, CORDIS) or **manual CSV import** for MVP?
2. Should semantic search be **powered via Azure OpenAI** (embeddings) from MVP or added later?
3. Should we include **data validation workflows** (funders verifying projects) now or post-MVP?
4. Is user-generated project creation allowed or admin-only?

---

## 12. Deliverable Summary (for MVP Demo)

* **Deployed web app (PWA)** with 3 role types and seed data
* **Project Explorer** with search & filter
* **Profile pages** for researchers and funders
* **Community discussions** per topic
* **Dashboard with key metrics**
* **Admin console** for data import and moderation
* **Documentation** (README, ADR, ERD, API Spec)
