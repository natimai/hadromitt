# BRIEF: Hadromit outdoor-events landing page, second variant ("al-haesh")

**Self-authored under explicit creative delegation.** The owner asked for "another
landing page, not instead of what you built, so we can see if this is nicer",
earlier asked for "animations like a good animator, elements not necessarily taken
from our regular site's design, the goal is to impress them, keep the language
(colours etc.) but develop it a bit", and stated the site is mobile-first. No
interview was run; the decisions below are authored and labelled as such. Quotes
are the owner's own words, translated from Hebrew.

Deploy path: `public/lp/al-haesh/` → `https://www.hadromit.co.il/lp/al-haesh`.
Sibling of the React landing page at `/lp/outdoor-events`, which stays untouched.

## Evidence (facts from the brand, not invented)

- Restaurant: מסעדת הדרומית, Be'er Sheva, meat restaurant, kosher (כשר חלק למהדרין).
- Outdoor events in the south and the centre of Israel. Everything on the
  restaurant menu is available at outdoor events (owner: "everything in the
  restaurant we also bring to outdoor events").
- Contact for events is **only** WhatsApp 050-313-3001. No email shown, no
  restaurant phone (owner: "only the number there for WhatsApp is the only number
  in the context of events, not email and not the restaurant number").
- WhatsApp buttons are WhatsApp green (owner's request).
- Menu item names come from `src/data/menuData.ts` (chef-recommended items).
- Photos are real: `public/outdoor-events/**`, `public/gallery/**`.
- Brand colours: red #ED1D24, ink #1A0000, warm paper #FDFBF7.
- No verified figures exist (events served, guests, years). **No counters.**
- No prices on the page. No packages (owner: package text was temporary).

## The eight topics (authored)

1. **Vibe:** smoke, heat, appetite, a backyard at night. References: the sound
   of fat hitting coals; a butcher's chalkboard; a Tel Aviv street-food sign.
2. **Journey:** appetite first, then the host's real problem (stuck at the grill),
   the relief (we bring the fire), the fire itself, what's on it, proof from real
   events, how it works, the questions, then the ask.
3. **Energy:** hot open, a cold honest beat, a loud relief, a deliberate silence,
   the peak, then fast and generous, then calm and administrative, then a hot close.
4. **Feeling:** see the curve below. The one moment: the coals flare.
5. **The thing no site does:** scrolling lights the grill. A bed of coals lives at
   the bottom of the phone screen, under the action buttons, and every screen you
   pass lights more of it.
6. **Range:** maximalist food energy on a dark ground, not premium-minimal. Loud
   condensed display type, hard cuts between grounds.
7. **World:** distinct scenes (hard cuts), not one continuous world.
8. **Assets:** real event photography only. No generated imagery, no key, no spend.

## Grammar: Rhythmic cutlist (§2.8)

Events and food energy, phone-first thumb scrolling, the visitor should feel a
pulse rather than follow an argument. Short acts, hard cuts, no pinning.

Why the other seven lost:
- Filmic one-shot: needs footage to scrub; we have stills. Also the React page
  already reads as a continuous flowing film.
- Chaptered editorial: this is a 20-second decision on a phone, not a read.
- Live surface: not software.
- Continuous world: no real geography to travel through.
- Typographic poster: the photography is the strongest asset; hiding it loses.
- Gallery/catalog: the menu is a section, not the whole argument; the visitor's
  question is "can they do my event", not "what are the options".
- Split stage: tempting (host at the grill vs. host at the party) but two columns
  at 390px are two cramped columns.

Grammar consequences: no `pin`, no `dwell`, no `parallax` device, no spotlight,
no magnet, every act ≤ 1.4 viewport-heights, loud bar, abrupt close with the CTA
at full bleed. The peak lives in the fixed chrome (the coal bed), per §2.8.

## Signature move: the coal bed

A fixed bed of coals along the bottom edge. On phones it is the ground of the
action bar. Coals light from right to left (reading direction) as page progress
grows, each lit coal flickers, embers rise from lit coals only. Passing the peak
section makes the bed flare (a heat wash rises behind the bottom of the screen
and settles). At the close every coal is lit and the form sits above a glowing
bed. The heat value also warms every photograph on the page slightly, so one
input (how far you have come) regrades the whole page.

**Tell-someone sentence:** "It's the site where scrolling lights the grill: by
the time you get to the bottom the coals under the buttons are glowing, and when
the steaks show up the whole bottom of the screen flares."

## Journey and feeling curve (curve first)

```
1  Appetite      skewers on a board, layered over their own blurred shadow, embers drifting, the first coal catches
2  Recognition   bone paper ground, big honest type: you want to celebrate, not stand at the grill
3  Relief        a red wipe takes the whole screen: we bring the fire, three plain lines
4  Anticipation  authored silence on charcoal: one small line, nothing else (deliberate, not dead scroll)
5  Awe [PEAK]    steaks going onto the grill in smoke, an iris opens on them under "על האש.", the coals flare under the thumb
6  Abundance     the menu as a chalkboard: item names land one after another at poster scale
7  Trust         real events, hard cuts between three photos with factual captions
8  Ease          how it works in three plain steps on paper
9  Reassurance   the questions, short answers, open/close
10 Resolve       red ground, every coal lit, the form and the WhatsApp button, holds
```

**Peak:** act 5, "the screen went dark for a second, then steaks on the grill
filled it and the coals at the bottom flared up". It gets the best photograph
(`outdoor-events/meat/event-meat-08.jpg`), the silence before it (act 4), and
the biggest act on the page (1.4vh, the grammar's ceiling) plus the chrome flare.

**Authored silence:** act 4 is a near-empty charcoal screen with one small line.
It is anticipation, not a loading failure.

**Ending:** resolves and holds on the form over a fully lit bed.

## Score

| # | Beat | Device | Why |
|---|---|---|---|
| 1 | Appetite | layered hero (overlap + scale/blur depth, independent ember plane) + `kinetic` lines on entry | depth without the banned parallax device; the cut starts hot |
| 2 | Recognition | `flow` + `in`, hard ground cut to paper | an honest sentence needs stillness and plain type |
| 3 | Relief | `reveal` up (full-bleed red wipe) | a wipe is a change of state, which is what relief is |
| 4 | Anticipation | ground only, one line | silence before the drop |
| 5 | Awe (peak) | `reveal` iris on the photo + chrome flare (signature) | the loudest device, used once, at the peak |
| 6 | Abundance | bespoke chalkboard lines driven from `--sc-p` | a menu is a list; landing it line by line reads as plenty |
| 7 | Trust | hard cuts, `reveal` left/right alternating | proof at speed, one photo per cut |
| 8 | Ease | `flow` + `in` stagger | administrative, compressed |
| 9 | Reassurance | native `<details>`, `flow` | administrative, compressed |
| 10 | Resolve | full-bleed red close, form, coal bed fully lit | abrupt, holds |

Device families: hero layering, kinetic, flow/in, reveal, bespoke `--sc-p`, chrome.
No family twice in a row in the experience-carrying acts (1 to 7).

## Known compromises (stated, not hidden)

- Length: a lead page needs the steps, FAQ and form, so the page runs past the
  cutlist's 8 to 14vh budget. Those parts are compressed flow sections.
- Hebrew RTL: engine copy anchors are left/right based; the page uses its own
  positioning and only the engine's direction-neutral devices.
- Verification runs in bundled Chromium (no Chrome installed). There is no video
  on this page, so the h264 caveat does not apply. A real phone was not tested.

## Feel check (cold scroll of the mobile sheet, then diffed)

| Act | Intended | Felt | Change |
|---|---|---|---|
| 1 | Appetite | Appetite | none |
| 2 | Recognition | Recognition, after the fix | engine line-split merged the two lines and dropped the red emphasis; replaced with a page-local scroll-driven line rise |
| 3 | Relief | Relief | none |
| 4 | Anticipation | Quiet | none; authored silence reads as intended |
| 5 | Awe | Heat, not awe (first pass: blurry close-up) | photo was stretched over 140svh and cropped to a raw-meat close-up; recomposed as a wide band under the headline. The steaks in the only grill photo are raw, so the copy changed from "ישר מהאש" (implies cooked) to "על האש." |
| 6 | Abundance | Abundance | none |
| 7 | Trust | Trust | none |
| 8 to 9 | Ease, reassurance | Plain, quick | none |
| 10 | Resolve | Resolve, holds on the form | form stayed visible after send (CSS overrode `hidden`); fixed |

The peak is the largest visual change on the sheet (iris plus flare) and holds the most scroll room (140svh). It reads as heat rather than awe; a better peak needs a real photo or clip of cooked meat over live coals.

## Verification

- Harness (`shoot.mjs`, bundled Chromium, no video on the page): mobile 390x844, desktop 1440x900, reduced motion. No dead scroll; every cue clears 4.5:1 at its worst frame (first run failed at 2.03:1 on the peak headline; fixed by recomposition and a denser scrim).
- Form: empty submit shows the error and focuses the name field; valid submit opens WhatsApp with the full message, posts the background copy with campaign and keyword, shows the confirmation and hides the form.
- Keyboard: skip link first, then bar, hero CTAs, FAQ. No horizontal overflow at 390px.
- Not verified: a real phone (iOS Safari date input, touch scroll feel, Low Power Mode), and the tracking scripts, which the sandbox blocks.
