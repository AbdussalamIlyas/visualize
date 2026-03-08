# Project Brief V2 - Visualize

## 1. Why The Brief Is Changing

The current product direction is too centered on "How AI Works" as a concept map and still relies on a large amount of explanatory text around the interaction.

The next version should shift from:
- one concept explained mainly through a clickable map
- multiple layers of surrounding UI copy
- a fixed node-and-detail-panel mental model

To:
- a visual-first educational site
- one interactive explainer page per concept
- an experience where the visual teaches the idea and the text supports it

This brief replaces the map-first framing with an explainer-first framing.

---

## 2. Concise Critique Of The Current UX And IA

### What is working
- The current app has a clear visual identity and a solid technical foundation.
- The codebase already separates content from rendering in a reusable way.
- The current concept route proves there is value in an interactive learning surface.

### Current UX problems
- The experience is still too text-heavy. Users read hero copy, learning objectives, difficulty framing, detail content, examples, misconceptions, and sources before the interaction fully carries the lesson.
- The concept map acts more like navigation for text than the main teaching mechanism.
- The landing page repeats the same message across multiple sections instead of quickly getting users into the explainer.
- The five-level difficulty system increases copy volume and content maintenance without changing the actual interaction model.

### Current information architecture problems
- The IA is organized around one specific content shape: concept -> nodes -> detail panel.
- The schema assumes every concept should be represented as positioned nodes with related links.
- That structure is too narrow for many concepts that would be better taught as a process, simulation, comparison, timeline, or layered scene.
- "How AI Works" is better framed as a sequence or system flow than as a static concept taxonomy.

### Product implication
- The product should no longer optimize for "an excellent concept map."
- It should optimize for "an excellent interactive explainer page," where the visual format is chosen to fit the concept.

---

## 3. Product Vision

Build `Visualize` as a visual-first educational website where each concept is primarily learned through one interactive page.

The user should be able to understand a concept by interacting with the page itself, not by reading a long article beside it.

Text should do four jobs only:
- orient the user
- label the visual
- clarify the current step
- provide optional deeper context

The visual should do the teaching.

---

## 4. Product Goal

Create a polished MVP that proves a single interactive explainer page can teach a difficult concept clearly, quickly, and memorably.

The first concept remains `How AI Works`, but the website should be designed so future concepts can use different explainer formats without changing the product structure.

Success means:
- a first-time user can grasp the core mechanism in 2 to 4 minutes
- the experience feels visual-first rather than article-first
- the interaction teaches the concept, instead of only revealing more text
- the architecture can support future explainers beyond concept maps

---

## 5. MVP Scope

### Include
- lightweight home page
- about page
- one flagship concept page for `How AI Works`
- one dominant interactive explainer surface on that concept page
- concise supporting copy
- responsive design for desktop and mobile
- local structured content data
- polished motion and transitions
- accessible controls and focus states

### Exclude for now
- creator tools
- community features
- comments or reviews
- search across many concepts
- database or CMS
- accounts
- monetization
- complex personalization
- multi-concept platform features

---

## 6. Core Product Decisions

### Decision 1
This MVP is not a platform and not a content management system.

### Decision 2
The main unit of learning is a visual explainer page, not a node map.

### Decision 3
The explainer type should be selected based on the concept.

Possible explainer types:
- pipeline
- simulation
- comparison
- timeline
- layered scene
- map

### Decision 4
Depth should be handled through progressive disclosure, not by default through five fully rewritten versions of the same content.

---

## 7. Target Audience

### Primary audience
General public learners who want to understand difficult systems without needing specialist background first.

### Secondary audience
Curious learners with some technical interest who want a cleaner mental model before reading more formal material.

The product should especially serve users who learn best through:
- motion
- spatial organization
- step-by-step state change
- concrete examples

---

## 8. Experience Principles

### 8.1 Visual-first
The most important thing on the page should be the explainer itself.

### 8.2 One clear interaction model
The page should not compete with itself using too many panels, cards, stats, and explanation blocks.

### 8.3 Progressive disclosure
Show the core idea first. Reveal details only when the user asks for them or reaches the next stage.

### 8.4 Learn by cause and effect
Whenever possible, user interaction should change the visual state so the concept becomes easier to understand.

### 8.5 Short supporting text
Text should be concise by default. Long-form explanation should be optional and secondary.

### 8.6 Concept-fit over template-fit
Do not force every concept into the same visual structure.

---

## 9. Revised Concept Direction For "How AI Works"

`How AI Works` should no longer be taught mainly as an 11-node concept map.

It should be taught as a system flow with visible transformation across stages.

Recommended learning arc:
1. Input enters the system
2. Data becomes machine-readable representation
3. Training adjusts the model using examples and error signals
4. The model stores useful patterns in learned parameters
5. Inference produces an output for a new input
6. Failure modes and limits appear when the system is uncertain, biased, underinformed, or ungrounded

Useful supporting ideas such as tokens, neural networks, and hallucinations should appear when relevant to the stage, not as equally weighted top-level nodes by default.

---

## 10. Page Structure

## 10.1 Home Page

### Purpose
Get users into the explainer quickly.

### Include
- short value proposition
- featured concept card
- interactive or animated preview
- clear primary CTA
- very short explanation of the product model

### Avoid
- multiple sections that restate the same promise
- long marketing copy
- heavy preamble before entering the concept page

---

## 10.2 Concept Page

### Purpose
Deliver the learning experience.

### Required layout behavior
- the explainer surface dominates the viewport
- supporting text is compact and secondary
- sources and glossary are available but collapsible
- mobile still preserves the explainer as the primary focus

### Recommended content zones
- compact page intro
- main interactive visual
- stage controls or guided progress controls
- lightweight contextual copy
- optional deeper notes
- optional sources and glossary

### Avoid
- long persistent detail rails
- large stats sections
- dense objective cards
- treating the explainer like a dashboard

---

## 10.3 About Page

### Purpose
Explain the product philosophy briefly.

### Include
- why the product exists
- who it is for
- why the experience is visual-first
- current MVP scope
- short future direction

The about page should stay concise.

---

## 11. Content Strategy

Each concept should be broken into:
- the core question
- the minimum sequence needed to understand it
- the visual states that make the answer legible
- the optional deeper details

Default rule:
- if the concept can be understood through 4 to 6 stages, prefer a staged explainer
- if the concept depends on relationships across entities, a map may be appropriate
- if the concept depends on comparison, use side-by-side states
- if the concept depends on chronology, use a timeline

---

## 12. Depth Model

The product should reduce dependence on the current five-level rewrite model.

For MVP, prefer one of these approaches:

### Option A
Three depth presets:
- Basic
- Deeper
- Technical

### Option B
Single core mode with optional expandable technical notes

Recommended MVP choice:
- Option B

Reason:
- lower content overhead
- less text duplication
- faster to maintain
- keeps focus on interaction quality

If multiple depth modes remain in scope later, they should change:
- annotation density
- visible callouts
- optional notes

They should not require rewriting the entire page into five prose versions unless there is strong evidence this improves learning.

---

## 13. Interaction Model

The explainer should teach through state changes.

Examples of valid interactions:
- step through a sequence
- scrub through a process
- click hotspots to reveal meaning
- toggle between before and after states
- compare model behavior under different conditions
- reveal error states and limitations in context

Each interaction should answer a learning question, not exist only for decoration.

---

## 14. Design Direction

### Desired feeling
- intentional
- premium
- calm
- modern
- visual
- educational without feeling like a textbook

### Avoid
- dashboard clutter
- generic startup landing-page patterns
- long text blocks
- overuse of glass panels with equally weighted content
- map-heavy layouts when the concept does not require them

### Visual principles
- strong focal area
- clear stage transitions
- limited on-screen text
- layered depth
- restrained but meaningful motion
- clear contrast and hierarchy

---

## 15. Motion Guidelines

Use motion to:
- show causality
- transition between stages
- emphasize what changed
- direct attention to the active part of the visual

Do not use motion to:
- decorate static copy
- create constant ambient distraction
- make navigation feel slower

Motion should improve comprehension first and aesthetics second.

---

## 16. Accessibility And Usability

Minimum expectations:
- keyboard-accessible controls
- touch-friendly interaction targets
- high enough contrast
- reduced-motion support
- semantic structure where possible
- screen-reader labels for explainer controls
- mobile layouts that preserve primary interaction clarity

The visual-first direction must not make the product interaction-only in a way that becomes inaccessible.

---

## 17. Technical Direction

### Required stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion

### Optional by explainer type
- React Flow only when a concept genuinely needs a map
- canvas or SVG-based rendering when they better fit the explainer

### Data direction
- local structured content for v1
- schema should support multiple explainer types
- content should be separated from rendering logic

---

## 18. Proposed Data Model For Visual Explainers

The schema should move from map-first to explainer-first.

### 18.1 Concept

Fields:
- `slug`
- `title`
- `question`
- `summary`
- `thumbnail`
- `estimatedMinutes`
- `tags`
- `status`

### 18.2 ExplainerPage

Fields:
- `conceptSlug`
- `explainerType`
- `theme`
- `defaultStageId`
- `intro`
- `sources`
- `glossary`

### 18.3 ExplainerType

Enum values:
- `pipeline`
- `simulation`
- `comparison`
- `timeline`
- `layered-scene`
- `map`

### 18.4 Stage

Fields:
- `id`
- `label`
- `goal`
- `headline`
- `body`
- `visibleLayerIds`
- `activeHotspotIds`
- `statePatch`

### 18.5 VisualLayer

Fields:
- `id`
- `kind`
- `asset`
- `positioning`
- `states`
- `animations`

### 18.6 Hotspot

Fields:
- `id`
- `anchor`
- `label`
- `body`
- `media`
- `revealsInStages`
- `relatedGlossaryTerms`

### 18.7 DepthPreset

Fields:
- `id`
- `label`
- `copyDensity`
- `enabledHotspots`
- `enabledCallouts`

### 18.8 CheckPoint

Fields:
- `id`
- `prompt`
- `expectedInsight`
- `feedback`

### 18.9 Source

Fields:
- `title`
- `url`
- `appliesTo`
- `note`

### Schema note
Map-specific fields such as node position and graph relationships should exist only inside the `map` explainer variant, not as required fields for every concept.

---

## 19. MVP Content Model For "How AI Works"

Recommended explainer type:
- `pipeline`

Recommended stages:
1. What goes in
2. How data is represented
3. How training works
4. What the model learns
5. How prediction works
6. Where it fails and why

Optional supporting hotspots:
- tokens
- neural networks
- confidence
- hallucinations
- bias
- grounding

---

## 20. Implementation Plan

### Phase 1 - Product reframing
- replace the current concept-map-first brief with this visual-first brief
- align the home page around fast entry into the flagship explainer
- simplify the IA so the concept page is the product center of gravity

### Phase 2 - Story and interaction design
- storyboard `How AI Works` as a 4 to 6 stage interactive sequence
- define what the user sees, changes, and learns at each stage
- reduce copy until the page can teach mostly through visual state change

### Phase 3 - Data model redesign
- replace the current node-map schema with an explainer-first schema
- support multiple explainer types without requiring map fields everywhere
- keep sources, glossary terms, and optional depth notes structured

### Phase 4 - UI architecture
- create a concept page shell centered on the explainer surface
- move sources, glossary, and deep notes into secondary collapsible areas
- remove or reduce large persistent descriptive panels

### Phase 5 - Build the first flagship explainer
- implement `How AI Works` using the new schema and page model
- validate desktop and mobile usability
- confirm the experience remains understandable without reading large blocks of text

### Phase 6 - Evaluate extension path
- decide which future concepts need pipeline, simulation, comparison, timeline, layered scene, or map formats
- only then generalize reusable explainer primitives

---

## 21. Non-Goals For This Brief

This brief does not ask for:
- a creator platform
- a universal visual editor
- a database-backed content system
- a large content library
- a text-heavy educational article experience

The goal is narrower:
- one strong visual learning product shape
- one flagship explainer
- an architecture that can expand without locking every concept into a concept map
