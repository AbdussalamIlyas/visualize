# Project Brief V3 - Visualize

## 1. Why The Brief Is Changing

The previous brief moved the product away from a text-heavy concept map, but it still left too much room for concept-specific UI divergence.

The next version must be more opinionated:
- every concept should use the same core interaction model
- that model should be a 3D interactive guided pipeline
- the visual treatment should stay consistent across the site
- the interface should feel minimalist, calm, and easy to use

This brief replaces explainer-type experimentation with one clear product shape.

---

## 2. Product Vision

Build `Visualize` as a visual-first educational website where each concept is taught through a shared 3D guided pipeline experience.

The user should feel that they are learning one way of navigating the product:
- choose a stage
- watch the pipeline state change
- open extra detail only when needed

Concepts should differ in content, motion, and story, but not in basic interaction logic.

---

## 3. Product Goal

Create a polished MVP where difficult systems become understandable in 2 to 4 minutes through one consistent visual pattern.

Success means:
- a first-time user quickly understands how to use any concept page
- every concept page shares the same visual language and navigation logic
- the 3D guided pipeline is the center of the experience
- supporting text stays secondary and compact
- the product feels simpler as more concepts are added, not more fragmented

---

## 4. Core Product Decisions

### Decision 1
The product is not a CMS, dashboard, or content platform.

### Decision 2
The main unit of learning is a 3D guided pipeline page.

### Decision 3
All concepts should use the same page shell, control placement, and design language.

### Decision 4
There should be no concept hierarchy in the UI such as:
- flagship
- featured
- starter
- experimental alternate layout

### Decision 5
Depth should come from progressive disclosure, not from more panels or more route types.

---

## 5. MVP Scope

### Include
- lightweight home page
- about page
- a concept library of guided pipelines
- one shared concept page shell for all concepts
- concise supporting copy
- responsive design for desktop and mobile
- local structured content data
- accessible controls and focus states
- polished motion and subtle 3D depth cues

### Exclude
- creator tools
- community features
- search across a large content catalog
- dashboards
- multi-layout concept templates
- alternate map-first routes
- content management tooling

---

## 6. Target Audience

### Primary audience
General learners who want a clean mental model of a difficult system without reading a long article first.

### Secondary audience
Curious technical learners who want a fast visual overview before going deeper elsewhere.

The product should especially serve people who learn well through:
- spatial layout
- visible state change
- guided sequencing
- short contextual cues

---

## 7. Experience Principles

### 7.1 Visual-first
The guided pipeline dominates the page.

### 7.2 Consistent interaction model
Every concept should feel immediately familiar once the user has used one page.

### 7.3 Progressive disclosure
The interface shows the main mechanism first and optional detail second.

### 7.4 Cause and effect
User actions should visibly change the system state in a way that improves understanding.

### 7.5 Minimal copy
Text should orient, label, and clarify, not compete with the visual.

### 7.6 Minimal navigation
The user should rarely face more than one primary next action at a time.

### 7.7 Concept-specific content, shared shell
The story and labels change per concept, but the page structure does not.

---

## 8. Unified Interaction Model

Every concept page should use this structure:

1. Compact concept intro
2. Stage rail or guided progress control
3. Large 3D pipeline canvas
4. Lightweight side detail panel
5. Optional glossary and sources in collapsed areas

The intended user flow is:
1. Land on the page
2. Understand the current stage immediately
3. Click or tap the next stage
4. See the pipeline update
5. Open a hotspot only if more detail is needed

This interaction model should remain stable across all concepts.

---

## 9. Usability Requirements

The product should reflect common click-behavior and usability guidance:

### 9.1 Fewer competing actions
Avoid presenting multiple equally weighted paths at once.

### 9.2 Clear primary action
The stage rail should be the most obvious next step.

### 9.3 Fast recognition
Controls should appear in the same places across concept pages so users do not need to relearn the interface.

### 9.4 Reduced cognitive load
Keep labels short, avoid dense option sets, and collapse secondary material by default.

### 9.5 Efficient click flow
The interface should usually allow:
- one click to change stage
- zero extra clicks to see the main visual update
- one extra click only when the user wants more detail

### 9.6 Touch and keyboard support
Targets must be comfortable on touch devices and fully reachable by keyboard.

### 9.7 Mobile clarity
On mobile, the stage rail and visual surface must remain the center of gravity.

---

## 10. Design Direction

### Desired feeling
- minimalist
- premium
- calm
- focused
- modern
- intuitive

### Avoid
- dashboard clutter
- marketing-page bloat
- special treatment for one concept over others
- concept-specific shells that break consistency
- large persistent side rails full of prose
- decorative motion that slows the user down

### Visual principles
- one dominant focal surface
- subtle but readable 3D depth
- restrained motion
- limited on-screen copy
- strong hierarchy
- generous spacing
- obvious active state

---

## 11. Concept Direction For "How AI Works"

`How AI Works` should be taught as a guided pipeline, not as a map or vocabulary browser.

Recommended learning arc:
1. Examples and input enter the system
2. Human input becomes machine-readable representation
3. Training adjusts the model through prediction and error
4. The model stores patterns in learned parameters
5. Inference produces an output for a new input
6. Failure modes appear through weak grounding, ambiguity, and bias

Supporting ideas such as tokens, hallucinations, and grounding should appear as optional hotspots inside the pipeline.

---

## 12. Site Structure

## 12.1 Home Page

### Purpose
Get users into the concept library quickly while teaching the shared interaction model.

### Include
- short value proposition
- preview of the shared guided pipeline pattern
- concept library cards with equal treatment
- clear CTA to browse concepts
- concise explanation of how the interface works

### Avoid
- one featured or flagship concept block
- repeated marketing sections
- long introductory copy before the user sees the library

## 12.2 Concept Page

### Purpose
Deliver the full learning experience through the shared guided pipeline shell.

### Required behavior
- the pipeline canvas dominates the viewport
- the stage rail is easy to scan and click
- the detail panel stays compact
- glossary and sources are collapsible
- the same structure appears on every concept page

### Avoid
- alternate views such as maps or dashboard modes
- long persistent detail rails
- large stat sections
- layout changes that force relearning

## 12.3 About Page

### Purpose
Explain the product model briefly and clearly.

### Include
- why guided pipelines are the core interaction
- why consistency matters across concepts
- why the design stays minimalist
- current MVP scope

---

## 13. Motion Guidelines

Use motion to:
- show causality
- guide the eye to the active stage
- emphasize what changed
- support the 3D depth illusion

Do not use motion to:
- decorate static text
- create constant ambient distraction
- slow navigation
- make one concept feel more important than another

Motion should improve comprehension first and aesthetics second.

---

## 14. Accessibility

Minimum expectations:
- keyboard-accessible stage controls
- touch-friendly targets
- high enough contrast
- reduced-motion support
- semantic structure where possible
- screen-reader labels for interactive controls
- preserved clarity on small screens

The visual-first direction must remain usable, not merely impressive.

---

## 15. Technical Direction

### Required stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion

### UI architecture
- one reusable guided-pipeline page shell
- one reusable pipeline canvas component
- shared stage navigation pattern
- shared support panel pattern

### Data direction
- local structured content for v1
- concept data should describe stages, layers, hotspots, and copy
- rendering logic should stay shared across concepts

---

## 16. Proposed Data Model

The schema should be pipeline-first.

### 16.1 Concept

Fields:
- `slug`
- `title`
- `question`
- `summary`
- `thumbnail`
- `estimatedMinutes`
- `tags`
- `status`
- `theme`

### 16.2 PipelineExplainer

Fields:
- `id`
- `title`
- `summary`
- `intro`
- `heroKicker`
- `heroTitle`
- `heroSummary`
- `defaultStageId`
- `layers`
- `connections`
- `hotspots`
- `stages`
- `sources`
- `glossary`

### 16.3 Stage

Fields:
- `id`
- `label`
- `goal`
- `headline`
- `body`
- `actionLabel`
- `visibleLayerIds`
- `activeHotspotIds`
- `statePatch`

### 16.4 VisualLayer

Fields:
- `id`
- `label`
- `shortLabel`
- `kind`
- `tone`
- `position`
- `description`

### 16.5 Hotspot

Fields:
- `id`
- `anchor`
- `label`
- `body`
- `media`
- `revealsInStages`
- `relatedGlossaryTermIds`

Schema rule:
- do not require alternate explainer types for MVP
- do not model concept maps as first-class UI routes

---

## 17. MVP Content Model For "How AI Works"

Recommended stages:
1. Inputs and examples
2. Representation
3. Training loop
4. Learned model
5. Inference
6. Limits and risks

Recommended optional hotspots:
- tokens
- error signal
- learned parameters
- inference
- grounding
- hallucinations
- bias

---

## 18. Implementation Plan

### Phase 1 - Product reframing
- remove featured or flagship concept treatment
- align the home page around the shared guided-pipeline model
- make the concept library visually consistent

### Phase 2 - Shared page shell
- standardize one concept page layout for every concept
- keep the stage rail, pipeline canvas, and detail panel in stable positions
- move glossary and sources into secondary collapsible areas

### Phase 3 - Story and interaction design
- storyboard each concept as a short guided pipeline
- reduce copy until the main explanation is carried by state change
- ensure one obvious next action at each step

### Phase 4 - Visual refinement
- add subtle 3D depth cues to the pipeline canvas
- keep motion restrained and informative
- validate desktop and mobile clarity

### Phase 5 - Usability pass
- review click flow and tap targets
- confirm stage changes are obvious and low-friction
- check that optional detail never competes with the main task

---

## 19. Non-Goals

This brief does not ask for:
- a featured concept hierarchy
- a map-first learning product
- multiple concept page shells
- a creator platform
- a universal visual editor
- a text-heavy article product
- a database-backed content system

The goal is narrower:
- one strong shared product shape
- one consistent 3D guided pipeline language
- a concept library that grows without increasing UI complexity
