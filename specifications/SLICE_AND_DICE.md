# 🔭 1. USER JOURNEY OVERVIEW (Top-Level Flows)

| # | Journey                            | Primary User                 | Core Value                                    |
| - | ---------------------------------- | ---------------------------- | --------------------------------------------- |
| 1 | **Discover Research & Funding**    | Public / Researcher / Funder | See what has been researched and funded       |
| 2 | **Join and Explore the Community** | Researcher                   | Onboard, create profile, find relevant spaces |
| 3 | **Engage and Discuss**             | Researcher / Funder          | Comment, share insights, start conversations  |
| 4 | **Annotate and Analyze**           | Funder / Admin               | Add impact notes, categorize, view stats      |
| 5 | **Administer and Moderate**        | Admin / Data Manager         | Manage data, users, and quality               |

Each journey builds on the previous.
So our **MVP development sequence** will deliver these in thin, end-to-end vertical slices.

---

# 🚀 2. SLICED DEVELOPMENT BY USER JOURNEY

---

## **Journey 1: Discover Research & Funding**

> *“I want to explore completed research and understand how funding was distributed.”*

### **Goal**

Enable anyone to browse, search, and filter research projects and funding data.

### **MVP Slice 1 (Weeks 1–3)**

**Objective:** End-to-end “see what exists”
**Deliverable:** Public “Project Explorer”

**User Steps**

1. Visit platform landing page
2. View sample dataset of funded projects
3. Filter by topic, funding body, or year
4. Open project detail page

**What to Build**

* [Backend] Project entity (with funder, PI, amount, keywords)
* [Frontend] Public Explorer page with filters (topic, funder, year)
* [Search] Simple full-text search (Azure SQL / Prisma)
* [Data] Seed CSV import script
* [UI] Project detail page (title, abstract, funding info, related tags)

**Why first:**
Because it delivers **instant transparency** and a **working “wow moment”** — the reason the platform exists.

---

## **Journey 2: Join and Explore the Community**

> *“I want to join, create my profile, and find relevant topics or colleagues.”*

### **Goal**

Provide onboarding and profile creation, enabling personalization.

### **MVP Slice 2 (Weeks 3–5)**

**Objective:** User signup → profile → first interaction

**User Steps**

1. Click “Join” or “Login”
2. Sign in via Google or ORCID (for researchers)
3. Fill in short onboarding form (research area, institution, interests)
4. Arrive at personalized dashboard (recommended projects / spaces)

**What to Build**

* [Auth] NextAuth with Google + ORCID OAuth
* [Profile] Profile entity linked to user
* [Onboarding UI] Interest tags + affiliation form
* [Dashboard] Personalized “My Projects / My Topics” feed
* [Spaces] Predefined thematic spaces (e.g., AI, Energy, Health)

**Dependency:** Needs basic Project + Tag data from Slice 1
**Why second:** Converts “visitors” into “members,” enabling network effects

---

## **Journey 3: Engage and Discuss**

> *“I want to share knowledge and engage with others around specific topics or funding calls.”*

### **Goal**

Enable meaningful interactions and discussions around projects or themes.

### **MVP Slice 3 (Weeks 5–7)**

**Objective:** End-to-end conversation flow

**User Steps**

1. Researcher visits a project or topic space
2. Writes a post (“Lessons from Horizon 2020 Projects”)
3. Others comment, react, or mention peers
4. Researcher gets a notification and replies

**What to Build**

* [Frontend] Space page (list of posts, create new post)
* [Backend] Post & Comment entities
* [UI] Rich-text editor (Markdown)
* [Notifications] Basic in-app “new comment” alerts
* [Moderation] Flagging & admin queue
* [Analytics] Track post/comment count per space

**Why third:**
Builds **engagement and retention** — people stay for the conversation, not just the data.

---

## **Journey 4: Annotate and Analyze**

> *“I want to add insights, mark relevant projects, and view funding patterns.”*

### **Goal**

Support funding body users and admins in adding structured meta-data and analytics.

### **MVP Slice 4 (Weeks 7–9)**

**Objective:** Enable funders to contribute insight and visualize impact

**User Steps**

1. Log in as “Funder”
2. Search projects by funding call
3. Add annotation (“High Impact,” “Needs Follow-up”)
4. View analytics dashboard

**What to Build**

* [Backend] Annotation entity linked to Project and User
* [Frontend] Project detail page: editable notes for authorized roles
* [Dashboard] Simple charts: total funding, #projects per year, per topic
* [Role-Based Access] RBAC (Admin, Researcher, Funder, Guest)

**Why fourth:**
Delivers **funding body value** and closes the loop between data and decision-making

---

## **Journey 5: Administer and Moderate**

> *“I want to keep the platform clean, organized, and compliant.”*

### **Goal**

Provide admin controls to manage users, imports, and moderation.

### **MVP Slice 5 (Weeks 9–12)**

**Objective:** Enable admins to control content and data integrity

**User Steps**

1. Admin logs in
2. Imports new funding data (CSV upload)
3. Reviews flagged content
4. Exports reports

**What to Build**

* [Backend] Admin routes (import/export endpoints)
* [UI] Admin dashboard (users, data import, moderation)
* [File Handling] Azure Blob Storage for import files
* [Audit Logs] Record user edits and admin actions
* [GDPR] Export / Delete user data functionality

**Why last:**
Needed for maintainability and compliance but not for early user engagement

---

# ⚙️ 3. BUILD SEQUENCE — VALUE-FIRST ORDER

| Phase | Journey Focus      | Deliverables                                   | Duration |
| ----- | ------------------ | ---------------------------------------------- | -------- |
| **1** | Discover Research  | Public Explorer, Project Details, Basic Search | 3 weeks  |
| **2** | Join & Profile     | Auth, Profile, Interests, Spaces, Dashboard    | 2 weeks  |
| **3** | Engage & Discuss   | Posts, Comments, Notifications, Moderation     | 2 weeks  |
| **4** | Annotate & Analyze | Annotations, Roles, Dashboard                  | 2 weeks  |
| **5** | Administer         | Imports, Audit, Data Quality, GDPR Tools       | 3 weeks  |

→ **Each phase = one vertical slice** delivering full front-to-back value.
At the end of each phase, demo the flow to stakeholders (researchers, funders) for feedback.

---

# 🧩 4. DEPENDENCIES MAP (Critical Path)

1. **Authentication & Identity (Phase 2)**

   * Needed before any profile or annotation work
2. **Search & Project Schema (Phase 1)**

   * Core dataset needed before any engagement
3. **Role Management (Phase 4)**

   * Required before funder/admin workflows
4. **Data Import (Phase 5)**

   * Can come late — seed static data early

---

# 🎯 5. WHAT TO DO FIRST (Next 3 Weeks)

**Immediate Actions (Week 1–3)**
✅ Define minimal data model (Projects, Funders, Researchers)
✅ Build CSV import + seed script
✅ Deploy minimal Project Explorer (read-only)
✅ Implement simple search + filters
✅ Add dummy analytics dashboard (placeholder cards)
✅ Prepare visual identity + public landing page

**Outcome:**
A **publicly explorable database** of past funded projects that immediately delivers transparency — before login, before community, before anything else.

That’s your *“Minimum Lovable Product”* baseline: real, explorable, shareable, and aligned with your mission.
