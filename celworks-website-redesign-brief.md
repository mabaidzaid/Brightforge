# CELWORKS: Full Website Redesign & Build Brief

> **Formatting instruction for Antigravity: do not use em dashes (—) anywhere in the generated code, copy, headings, or comments. Use a period, comma, colon, semicolon, or a new sentence instead, wherever a dash would normally be used.**

> Build a full, responsive marketing website for a cinematic animation & video production studio. This brief replaces an existing reference design entirely: new brand name, new visual system, and new headline copy for every section, **except** the card content marked "PRESERVE EXACTLY," which must be kept word-for-word. Do not default to generic AI-generated design patterns (see Section 9). Ground every visual decision in real film/animation-making vernacular: frames, timelines, timecodes, contact sheets, color grading, sprocket holes, edit bays. That vernacular is the source of every distinctive choice below; do not decorate with it randomly.

---

## 1. Brand Identity

**Name:** CELWORKS
*(from "cel," the individual hand-painted sheet in traditional animation, plus "works," a working studio. Grounded in the actual craft, not a generic agency name.)*

**One-line positioning:** An animation and film studio that treats every project like a shot list: deliberate, sequenced, nothing wasted.

**Voice:** Confident, plain-spoken, a little dry. Talks like a working editor, not a hype-man. Active voice. No filler adjectives ("world-class," "cutting-edge"). Every CTA says exactly what happens when clicked.

**Logo concept:** A simple wordmark, "CELWORKS," set in the display serif (see Section 2), with the second "C" in "CELWORKS" formed like a slightly-open aperture/iris shape (subtle, not a literal camera icon). Should work as plain type-only lockup too.

---

## 2. Design System (Site-Wide Settings)

### Color palette
Deliberately avoids warm-cream-plus-terracotta and near-black-plus-neon-green defaults. Palette is drawn from film lighting gels (warm tungsten vs. cool daylight) on a cool graphite base, not a decorative gradient.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#15181D` | Primary text on light surfaces, near-black but cool-toned (never pure `#000` or the tinted `#0B0B0B` cliché) |
| `reel` | `#1E2229` | Dark section backgrounds (footer, CTA, hero) |
| `paper` | `#ECEFEE` | Light section backgrounds; cool pale grey, explicitly not cream |
| `amber` | `#E2A33D` | Warm accent (tungsten gel); headline emphasis, primary CTA fill on dark sections |
| `teal` | `#2E8F86` | Cool accent (daylight gel); links, secondary highlights, icons |
| `brick` | `#C1432B` | Alert/featured accent, used once per section maximum (e.g. the "featured" pricing/service card) |
| `hairline` | `#D8D3C8` (on paper) / `#2A2F36` (on reel) | Borders, dividers |

Rule: never use more than one accent color as a fill in the same viewport. Amber and teal alternate by section, never mixed on one card.

### Typography
- **Display:** Fraunces (variable serif, weights 600/900, italic used only for pull-quotes and the About-page manifesto, never for single-word emphasis inside a headline).
- **Body / UI:** Manrope (400/500/700).
- **Timecode / frame-number readouts only:** a real monospace (JetBrains Mono). This is the one intentional monospace use in the whole site, and it's justified because actual editing software displays timecode in monospace for digit alignment; not used anywhere else as a decorative label font.
- Body line length: max ~72 characters. Body line-height 1.6. Display line-height 1.05 to 1.1.
- Type scale (desktop → mobile): H1 72/40px, H2 48/32px, H3 28/22px, body 17/16px, small 14/13px.

### Layout & spacing
- Base unit: 8px.
- Container: 1280px max-width, 64px side padding desktop, 24px mobile.
- Vertical rhythm between major sections: 120px desktop, 64px mobile.
- Grid: 12-column desktop, 4-column mobile.
- Breakpoints: 1440 / 1024 / 768 / 480.

### Shape & elevation
- Corner radius is a **deliberate signal, not decoration**: 0px (sharp) on frame/media containers and primary buttons, mimicking a cropped film frame; 4px only on small tags/badges. No large soft-rounded "SaaS card" radius anywhere on the site, and no identical drop-shadow applied uniformly to every card; shadows are used only on the two floating elements (nav on scroll, mobile drawer).

### Recurring structural motif: the "timeline scrubber"
Because this is a video studio, the single recurring structural device across the site is a horizontal **edit-timeline bar**: a thin track with a playhead marker and a live timecode readout. It appears as:
- The hero's scroll-progress indicator (Section 3.1)
- The connector between Process steps (Section 3.7), legitimate here because Process genuinely is a 5-step sequence
- A subtle frame-number label (01 to 09) on each Portfolio tile, legitimate because they are literally frames in a reel

Do not add numbered markers anywhere else (testimonials, service cards, etc. are not sequences and should never carry 01/02/03 badges).

### Motion
One signature motion moment: on hero load, the timeline playhead sweeps once from 00:00 to the current scroll position, and the headline reveals via a single clip-path wipe (like a film reveal), not a fade-and-slide. Everywhere else, motion is response-only: hover states shift the accent underline, buttons show a subtle press-state, nothing auto-animates on scroll. Respect `prefers-reduced-motion` by removing the wipe and playhead sweep entirely.

### Accessibility baseline
WCAG AA contrast minimum everywhere, visible keyboard focus ring (2px amber offset), alt text on every image/thumbnail, 44px minimum touch targets, form fields with real `<label>` elements.

---

## 3. Homepage: Sections in Exact Order

The section **sequence** below must match the reference exactly. Only the three sections marked **PRESERVE EXACTLY** keep their original card content; every heading, subheading, and every other section's copy is new.

### 3.1 Header / Navigation
- Left: CELWORKS wordmark.
- Center/right links: Home, **Services** (anchor `#services`, scrolls to 3.4 on this same page), **Portfolio** (anchor `#work`, scrolls to 3.5 on this same page), About (page), Blog (page), Contact (page).
- Right: primary button, "Start a project" (no trailing arrow).
- Mobile: collapses to a hamburger that opens a full-height drawer; anchor links close the drawer and smooth-scroll.

### 3.2 Hero: NEW LAYOUT (not left-text/right-video)
Full-bleed, single-column, cinematic-frame treatment; no side-by-side split.
- Background: a full-viewport muted/desaturated still or looping showreel clip, letterboxed with a thin 24px inset border in `reel` color, so the video reads like a mounted film frame rather than a floating box.
- Headline sits bottom-anchored, large, left-aligned within the frame inset; not centered, not paired with a side image.
- **New headline (replace original "We turn ideas into motion that captivates."):** "Great brands aren't told. They're directed."
- **New subhead:** "CELWORKS is a full-service animation and film studio. We write, shoot, animate, and grade every frame until it earns attention."
- Buttons: "Start a project" (filled, amber) and "Watch the reel" (outline, opens video).
- Bottom edge of the hero: the timeline-scrubber motif (Section 2) runs full-width, showing a live timecode and doubling as the page's scroll-progress bar.

### 3.3 Stats bar
New framing, same idea of four quick metrics.
- **New heading (small, sentence case, not all-caps):** "Not vanity metrics. Just receipts."
- 250+ Productions wrapped · 120+ Brand partners · 15+ Award laurels · 8 Years behind the lens

### 3.4 What We Do (Services): **PRESERVE CARD CONTENT EXACTLY**
**New section heading (replace "Crafted services for every frame of your story."):** "Six ways to put a brand in motion."
**New subhead:** "Pick a format, or let us build the mix that fits your story."

Layout: not a uniform 3×2 rounded-card grid. Use a filmstrip-style horizontal treatment: six unequal-width frames in a single scrollable row on desktop (stacking to one column on mobile), with the featured card (Premium Video) rendered roughly 1.5× the width of the others, in `brick` accent, echoing its "featured" status in the original.

Cards: **content below must stay exactly as written:**

1. **Whiteboard Video**: "Engaging hand-drawn whiteboard animation perfect for simplifying complex concepts, education, and driving high conversions through clear storytelling."
2. **Explainer Video**: "Crystal-clear live-action or animated explainers that turn your most complex ideas into intuitive, engaging visual stories that sell."
3. **Premium Video** *(featured)*: "Full-scale cinematic productions with senior creative direction, custom graphics, and top-tier post-production for ambitious brands."
4. **2D Animation**: "Hand-crafted frame-by-frame animation with character, warmth, and personality that connects emotionally with your audience."
5. **3D Animation**: "Dimensional storytelling with photorealistic renders, dynamic camera work, and cinematic lighting that brings your product to life."
6. **Motion Graphics**: "Kinetic design systems and typography that transform data, ideas, and brands into a living, breathing visual language."

### 3.5 Selected Work / Portfolio: **PRESERVE CARD CONTENT EXACTLY**
**New section heading (replace "A portfolio built on craft and curiosity."):** "Nine frames, one reel."
**Subhead, keep exactly:** "Nine recent projects spanning brand films, animation, motion design, and cinematic product launches."

Layout: a **contact-sheet** grid (a photo lab's sheet of thumbnail prints) instead of a plain 3×3 card grid; thin hairline dividers between tiles, each tile carrying a small monospace frame number (01 to 09, legitimate here since these are literal reel frames), one tile keeping the visible project label **"Solaris: Titles"** as in the original. Hover reveals the project title over a slight desaturation-to-color shift on the thumbnail (film-negative-to-print effect), rather than a generic zoom.

### 3.6 Marquee tagline strip
**New scrolling copy (replace the visible fragment "...nded Stories · Visual Identities · Kinetic Ty...")**: "Character Animation / Live Action / Motion Systems / Sound Design / Color Grade / Storyboards /" (looping).

### 3.7 Process
**New heading (replace "A process built for clarity and momentum."):** "A workflow shaped like a timeline."
**New subhead:** "Five stages, one continuous edit, from first brief to final export."

Keep the five-step structure (it is a genuine sequence, so numbering stays), rendered along the horizontal timeline-scrubber motif with a playhead marking the current step on hover/scroll:
1. **Brief & Discovery**: "Workshops to align on goals, audience, tone, and the story only you can tell."
2. **Script & Storyboard**: "Scripts and style frames lock the creative direction before a single frame moves."
3. **Production & Animation**: "Animation, filming, and design, executed by senior artists frame by frame."
4. **Edit & Grade**: "Color, sound, and motion polish that lifts every frame to a cinematic standard."
5. **Delivery & Launch**: "Final formats and guidance so the film lands with confidence on every channel."

### 3.8 Stats bar 2
**New heading:** "The numbers behind the reel."
250+ Films & spots produced · 120+ Brand partners · 15+ Festival & industry awards · 98% Clients who return for a sequel

### 3.9 Pricing: **PRESERVE CARD CONTENT EXACTLY**
**New section heading (replace "Transparent packages, tailored to your story."):** "Three ways to start rolling."
**New subhead:** "Every package can be recut to fit your budget: nothing hidden in post."

Layout: style the three tiers as **ticket-stub / clapperboard cards**: a perforated-edge visual detail between the header and the feature list (like a ticket tear-line), sharp corners (0px radius per Section 2), the middle package marked as the team's pick with a small `brick`-colored corner tab rather than a raised shadow. Content below is preserved exactly:

**Whiteboard Video** ($698 / 30s)
"Engaging hand-drawn whiteboard animation perfect for explainers and education."
- ✓ High Converting Script
- ✓ Powerful Voice-Over
- ✓ Sound Design
- ✓ Background Music
- ✗ Custom Graphics
- ✗ Premium Animation Team
- ✗ File Source
- ✓ Delivery 4+ weeks
- Button: **Order Now**

**Explainer Video** *(featured)* ($1198 / 30s)
"Custom graphics and dedicated team support for high-quality explainers."
- ✓ High Converting Script
- ✓ Powerful Voice-Over
- ✓ Sound Design
- ✓ Background Music
- ✓ Custom Graphics
- ✓ Premium Animation Team
- ✓ File Source
- ✓ Delivery 8+ weeks
- Button: **Order Now**

**Premium Production** ($1998 / 30s)
"Full-scale production with premium animation team for top-tier results."
- ✓ High Converting Script
- ✓ Powerful Voice-Over
- ✓ Sound Design
- ✓ Custom Graphics
- ✓ Premium Animation Team
- ✓ File Source
- ✓ Delivery 8+ weeks
- Button: **Order Now**

### 3.10 Testimonials
**New heading (replace "Words from partners who felt the difference."):** "What clients say after the credits roll."
**New subhead:** "Real words from the brands we've partnered with."

New placeholder quotes (style as slate/clapperboard cards, not star-rating cards):
1. "Working with CELWORKS felt like handing our story to people who actually cared about every frame."
   **Priya Nandan**, Head of Brand, Northlight Media
2. "They turned a dry product update into something our whole team wanted to rewatch."
   **Marcus Feld**, CMO, Driftwood Films
3. "Every round of feedback made the film better, never smaller. Rare to find that in a partner."
   **Aiko Tanaka**, Founder, Halcyon Studios

### 3.11 CTA (dark section)
**New heading (replace "Let's create something extraordinary together."):** "Let's put your story into motion."
**New subhead:** "Tell us what you're building. We'll find the shot, the sound, and the pace that fits."
Buttons: "Start a project" / "Watch the reel" (no arrows on either).

### 3.12 Footer
- Blurb: "CELWORKS is an animation and film studio that helps ambitious brands move (literally). Every project starts with a script and ends with something worth sharing."
- **Quick Links:** Home, Services (`#services` anchor), Portfolio (`#work` anchor), About, Blog, Contact.
- **Services:** Whiteboard Video, Explainer Video, Premium Video, 2D Animation, 3D Animation, Motion Graphics.
- **Contact:** address, phone, WhatsApp chat link, email.
- Social icons row, copyright line.

---

## 4. About Page

**Purpose:** studio story, values, and team; not a repeat of the homepage hero.

- **Hero:** treat like an opening credits sequence: a short manifesto paragraph in large italic Fraunces, centered, on a `reel`-dark background, e.g.: *"We started CELWORKS because most brand videos get watched once, out of politeness. We wanted to make the kind that get watched twice, on purpose."*
- **Studio story:** 2 to 3 short paragraphs, plain voice, no buzzwords: founding year, what changed, what the studio believes about craft vs. speed.
- **How we work (values), 4 items:** Craft over speed · Collaboration over hand-offs · Curiosity over formula · Precision over guesswork; each with one supporting sentence.
- **Team, styled as a cast list:** grid of team members, name, role, one-line credit line (e.g. "12 years in stop-motion").
- **Studio in numbers:** reuse the stats-bar visual language with different figures (founding year, films completed, awards, team size).
- **CTA banner** at the bottom linking to Contact: "Want to work with us? Let's talk."

---

## 5. Contact Page

- **Hero:** simple, one line: "Let's talk about your next film." No video background here (reserve the cinematic full-bleed treatment for the homepage hero only, so it stays a signature moment rather than a repeated template).
- **Layout:** form on one side, studio info on the other (a split layout is fine here; the "no left/right" rule applies specifically to the homepage hero, not utility pages).
- **Form fields:** Name, Email, Company, Project type (dropdown, reuse the six service names from Section 3.4 for consistency), Budget range, Message. Submit button: "Send message."
- **Direct info block:** email, phone, WhatsApp link, studio address, expected response time (e.g. "We reply within one business day").
- **FAQ accordion:** turnaround time, revision policy, file ownership, payment terms.
- **Footer:** same as homepage.

---

## 6. Blog Page

- **Listing hero:** "Notes from the edit bay." Subhead: "Craft notes, case studies, and things we learned the hard way."
- **Category filters:** Craft, Case Studies, Industry, Studio News.
- **Layout:** one large featured-post card, then a grid of post cards below (thumbnail, category tag, title, excerpt, read time, date). Sharp corners, hairline dividers, consistent with the rest of the site's shape language, not rounded blog-card defaults.
- **Newsletter strip** beneath the grid: "Get one good note a month, not a newsletter you'll regret."
- **Single-post template:** hero image, title, author + date + read time, body copy in Manrope at max ~72-character line length, pull-quotes set in italic Fraunces, related-posts row at the end.

---

## 7. Mobile Responsiveness Rules

- Breakpoints: 1440 desktop / 1024 tablet-landscape / 768 tablet-portrait / 480 mobile.
- Hero: the letterbox inset shrinks but is never removed; headline drops to H1-mobile size; timeline scrubber becomes a slimmer bar.
- All multi-column grids (services filmstrip, portfolio contact-sheet, pricing, testimonials, team) collapse to a single column, preserving the same content order as desktop.
- Nav collapses to a hamburger drawer; anchor links (`#services`, `#work`) still scroll correctly and then close the drawer.
- Marquees keep scrolling but reduce type/logo size by ~30%.
- Minimum touch target 44×44px on all buttons and form fields.

---

## 8. Design Skills & Principles to Apply

Explicitly apply these while building; they are the difference between a distinctive site and a generic one:

- **No em dashes, anywhere.** Not in headings, body copy, button labels, code comments, or placeholder content. Use a period, comma, colon, semicolon, or a new sentence instead.
- **Ground everything in subject matter.** Every structural device (timeline, frame numbers, timecode, contact sheet, ticket-stub pricing cards) must map to something real about how films and animation are actually made, not decoration borrowed from an unrelated industry.
- **Two-typeface system with a real type scale.** One serif for personality (Fraunces), one sans for clarity (Manrope), deliberate weights, body line length under ~72 characters.
- **One signature motion moment**, not scattered animation. The hero timeline sweep is it; everywhere else, motion only answers user action (hover, click, open).
- **Vary corner radius and elevation by role, not uniformly.** Sharp edges on frames/buttons, small radius only on tags. No identical drop-shadow on every card.
- **Numbering only where content is genuinely sequential** (Process steps, Portfolio frame numbers). Never decorate an unordered list with 01/02/03.
- **Avoid these generic AI-design tells specifically:**
  - warm cream background plus terracotta accent, or near-black plus neon-green/vermilion accent
  - identical rounded "SaaS card kit" with the same soft grey shadow on every card
  - ALL-CAPS tracked-out eyebrow labels above every heading
  - meta text joined with middle dots, or labels that pair a word and a fragment with a spaced dash
  - a monospace face used only as decoration on small labels (the one justified exception here is the hero timecode, which is grounded in real content)
  - arrows (→) appended to every button and link
  - accenting a single word in a headline with italics/color as the only distinctive move
- **Restraint.** Spend the boldness budget on the hero's cinematic frame treatment; keep every other section quiet and disciplined around it.
- **Accessibility is baseline, not optional:** WCAG AA contrast, visible focus states, `prefers-reduced-motion` support, real semantic HTML and form labels.
- **Writing voice:** active voice, plain language from the visitor's perspective, consistent vocabulary between a button label and what happens after (e.g. "Start a project" leads to a page that confirms "Project started," not "Submission received").

---

## 9. Content Preservation Summary (quick reference)

Only these blocks must be kept **verbatim**:
- The six service card descriptions in **What We Do** (Section 3.4).
- The intro subhead and the "Solaris: Titles" label in **Selected Work** (Section 3.5).
- All three pricing card names, descriptions, prices, and feature checklists in **Pricing** (Section 3.9).

Every heading, subheading, stat label, testimonial, CTA line, and footer line elsewhere in this brief is new copy, written for CELWORKS, and may be freely adjusted.
