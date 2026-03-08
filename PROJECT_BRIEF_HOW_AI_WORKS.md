# Project Brief — How AI Works

## 1. Project Overview

Build a polished, interactive educational website that explains **how AI works** to the general public through a **visual, clickable concept map**.

This is **not** the full community platform yet. It is a **focused MVP** with one concept only: **How AI Works**.

The product goal is to help **visual learners** understand a complex concept through:
- image-first design
- minimal but clear explanations
- clickable visual sections
- five selectable difficulty levels
- a modern, premium, interactive interface

The experience should feel closer to an **interactive infographic / concept explorer** than a blog post or textbook.

---

## 2. Product Goal

Create a website where a user can:
1. Land on a clear, visually compelling homepage
2. Open an interactive explainer for **How AI Works**
3. Click through core concepts visually
4. Switch between difficulty levels:
   - Child
   - Teenager
   - College Student
   - Graduate Student
   - Expert
5. Read the explanation for the selected concept node at the selected difficulty level

The website should teach the same underlying concept at multiple levels without changing the overall conceptual structure.

---

## 3. MVP Scope

### Include
- Landing page
- About page
- Main concept page for **How AI Works**
- One interactive concept map
- Five difficulty levels
- Clickable nodes
- Detail / explanation panel
- Responsive design for desktop and mobile
- Dark-mode-first visual system
- Seeded local content data
- Smooth motion and polished interactions

### Exclude for now
- User-generated public concepts
- Public editor / creator tools
- Comments
- Reviews
- Ranking pages
- Search across many concepts
- Monetization
- Full social features
- Expert verification system
- Multilingual support
- True 3D explainer engine
- CMS / admin panel

---

## 4. Core Product Decision

This MVP is **one excellent interactive concept explainer**, not a platform.

The first version should prove:
- the learning experience works
- the visual approach works
- the difficulty-level system works
- the UI feels premium enough to be memorable

---

## 5. Target Audience

**Primary audience:** general public

The design should support users with very different prior knowledge. The site must feel approachable even to beginners while still offering meaningful depth for advanced users.

---

## 6. Learning Model

The visual structure of the concept should stay stable across difficulty levels.

Only these should change by level:
- vocabulary complexity
- explanation depth
- amount of detail
- technical precision
- examples / caveats

The concept map should remain recognizable across all five levels so the user feels they are exploring the same system from different depths.

---

## 7. Difficulty Levels

Use exactly these labels:
- Child
- Teenager
- College Student
- Graduate Student
- Expert

### Intended behavior
- **Child**: extremely simple, intuitive, analogy-based, minimal jargon
- **Teenager**: simple but more structured, introduces basic technical ideas gently
- **College Student**: solid conceptual explanation with some technical language
- **Graduate Student**: more formal, more precise, more system-level detail
- **Expert**: concise but technically stronger, includes limitations / nuance

---

## 8. Concept Format

The main explainer should be a **layered interactive concept map**.

### Recommended presentation
- central canvas with interconnected concept nodes
- right-side or bottom detail panel
- node selection highlights current area
- connected nodes visually react to selection
- subtle motion and glow states
- minimal but strong information density

### Do not build
- a freeform creator canvas
- a slide editor
- a giant scrolling article
- a heavy 3D scene

---

## 9. Main Concept Content

The concept page is for **How AI Works**.

It should include these core nodes:
- What AI Is
- Data
- Patterns
- Training
- Model
- Prediction
- Tokens
- Neural Networks
- Errors / Hallucinations
- Limits / Risks
- Real-World Examples

These nodes can be renamed slightly for better UX, but the meaning should stay intact.

---

## 10. Content Rules

Each node should contain:
- `id`
- `title`
- `shortSummary`
- `icon`
- `position` (for map layout)
- `relatedNodeIds`
- `example`
- `misconception`
- `difficultyExplanations` for all 5 levels
- `sources`

### Top-level concept data should contain
- concept title
- subtitle
- hero summary
- learning objectives
- theme / styling hints
- node list

### Source policy
- include sources for the explainer content
- sources should be attached at the node or concept level
- use concise, trustworthy sources

---

## 11. User Flow

### Landing page flow
1. User lands on homepage
2. Sees value proposition: understand AI visually
3. Sees preview of the concept map
4. Sees 5 difficulty levels
5. Clicks CTA to open the explainer

### Concept page flow
1. User opens **How AI Works** page
2. Sees visual concept map
3. Chooses a difficulty level
4. Clicks a node
5. Reads explanation in the detail panel
6. Clicks related nodes to keep exploring

### About page flow
1. User reads why the project exists
2. Learns this is an educational visual explainer
3. Can navigate back to the main explainer

---

## 12. Page Structure

## 12.1 Landing Page

### Purpose
Explain the product immediately and direct users into the concept experience.

### Suggested sections
- Hero
- One-sentence product promise
- CTA button
- Visual preview / mock concept map
- Difficulty-level teaser
- “Why this exists” short section
- Footer

### Suggested hero copy direction
- “Understand AI visually”
- “Learn complex ideas through interactive visuals”
- “Explore AI from child level to expert level”

---

## 12.2 Main Concept Page

### Purpose
Deliver the actual learning experience.

### Main layout
- header / top nav
- difficulty selector
- central concept map canvas
- detail panel
- optional source section

### Behavior
- clicking a node updates detail panel
- active node is clearly highlighted
- related nodes are subtly emphasized
- changing difficulty updates explanation content immediately
- UI should feel smooth and premium

---

## 12.3 About Page

### Purpose
Add context and credibility.

### Include
- project purpose
- design philosophy
- who it is for
- current scope
- future vision (briefly)

---

## 13. Design Direction

### Desired feeling
- premium
- modern
- dark-mode-first
- slightly futuristic
- educational, not corporate
- clear, calm, visual

### Avoid
- over-clutter
- too much text
- childish cartoon style
- loud neon cyberpunk styling
- overly sterile enterprise dashboard feel

### Visual language
- soft glows
- layered cards
- subtle gradients
- vector/icon-based concept markers
- clear node hierarchy
- high readability

### Interaction feel
Should feel somewhat inspired by polished Framer-style interfaces, but focused on educational clarity rather than marketing theatrics.

---

## 14. Motion Guidelines

Use motion carefully to support understanding.

### Use motion for
- page transitions
- node hover states
- node selection states
- panel transitions
- subtle relationship highlighting
- difficulty switch transitions

### Do not use motion for
- decorative overload
- distracting continuous animation
- unnecessary parallax everywhere

Motion should improve orientation and delight, not reduce clarity.

---

## 15. Responsive Design Requirements

The site must work well on both desktop and mobile.

### Desktop
- concept map centered
- detail panel at right
- difficulty switcher visible and easy to access

### Mobile
- stacked layout is acceptable
- concept map can take top section
- detail panel can move below
- difficulty selector must remain easy to access
- interactions must still feel usable on touch devices

---

## 16. Accessibility / Usability

Minimum expectations:
- semantic HTML where possible
- keyboard-accessible controls
- sufficient contrast
- focus states
- readable typography
- not too much text at once
- touch-friendly tap targets on mobile

---

## 17. Technical Stack

Use the fastest modern stack suitable for a polished MVP.

### Required stack
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Flow** for the concept map
- **Motion** for animations

### Data
- seeded local structured data for v1
- no CMS required
- no database required for initial version

### Optional future extension points
- Supabase for accounts / stars / saved state
- OpenAI API for concept generation later

---

## 18. Architecture Guidance

### Preferred approach
- clean modular component structure
- reusable UI primitives where reasonable
- concept data separated from rendering logic
- strong typing for explainer data schema
- easy extension path for future concepts

### Avoid
- tangled monolithic page files
- inline hardcoded content everywhere
- unnecessary abstraction early
- adding auth/database before needed

---

## 19. Suggested App Structure

This is only guidance; adjust if needed.

```text
app/
  layout.tsx
  page.tsx
  about/page.tsx
  concept/how-ai-works/page.tsx

components/
  layout/
  landing/
  concept/
  ui/

lib/
  concept-schema.ts
  concept-utils.ts

data/
  how-ai-works.ts

styles/
  globals.css