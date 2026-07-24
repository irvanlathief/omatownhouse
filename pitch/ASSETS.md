# OMA Townhouse pitch — assets manifest

Everything referenced by `OMA-Townhouse-Pitch.md`. Two kinds of asset:

1. **Bundled (local)** — sitting in this `pitch/` folder, travels with the deck. Use these when you want the deck to render offline (e.g. as a PDF export).
2. **Linked (external)** — high-res 3D render scenes hosted on the OMA CloudFront CDN. Renders inline whenever the recipient has internet. If you need them as local files, you can grab each one from the URL with a browser or `curl`.

To send this deck to someone, zip the entire `pitch/` folder. The markdown plus the `assets/` subfolders are everything they need.

---

## Bundled assets (in this folder)

### `assets/floor-plans/`

| File | Description |
|---|---|
| `floor-plan-first.webp` | Ground floor architectural plan (66.7 sqm) |
| `floor-plan-second.webp` | Upper floor architectural plan (30.8 sqm) |

### `assets/area/`

Location, lifestyle and market context shots used in the deck.

| File | Used on slide |
|---|---|
| `tabanan-rice-terrace-aerial.webp` | "Where it is" |
| `nuanu-creative-city.jpg` | "Why this location, why now" |
| `luna-beach-club.jpg` | "Why this location, why now" |
| `bali-villa-tropical-pool.webp` | "The Airbnb numbers" |
| `dubai-skyline-day.webp` | "OMA vs Dubai" |
| `bali-coastal-cliff-tabanan.webp` | (available, not in current deck) |
| `bali-rural-road-rice-fields.webp` | (available, not in current deck) |
| `canggu-beach-sunset-crowd.webp` | (available, not in current deck) |
| `kedungu-beach.jpg` | (available, not in current deck) |
| `tanah-lot-temple-coast.webp` | (available, not in current deck) |
| `family-pool-tropical-villa.webp` | (available, not in current deck) |
| `real-estate-growth-chart.webp` | (available, drop into the ROI slide if you want a chart placeholder) |
| `architectural-floor-plan.webp` | (available, generic architectural plan visual) |
| `digital-nomad-cafe.webp` | (available, lifestyle shot) |

Drop any of the "available, not in current deck" shots into the markdown if you want a denser visual.

---

## Linked assets (CloudFront CDN, render-only)

All 11 architectural render scenes of OMA Townhouse, hosted at
`https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/`

| Scene | URL | Used on slide |
|---|---|---|
| 22 — Exterior | [Scene22.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene22.webp) | Cover |
| 23 — Street view | [Scene23.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene23.webp) | Gallery |
| 26 — Pool area | [Scene26.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene26.webp) | "What you are buying" |
| 32 — Living area | [Scene32.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene32.webp) | Gallery |
| 33 — Entryway | [Scene33.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene33.webp) | Gallery |
| 39 — Kitchen | [Scene39.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene39.webp) | (available) |
| 41 — Home office | [Scene41.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene41.webp) | Gallery |
| 51 — Bathroom | [Scene51.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene51.webp) | Gallery |
| 52 — Living and kitchen | [Scene52.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene52.webp) | Gallery |
| 76 — Master bedroom | [Scene76.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene76.webp) | Gallery |
| 77 — Bedroom (TV wall) | [Scene77.webp](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene77.webp) | Gallery |

Thumbnails are also available — append `_thumb` before `.webp` in the URL.

---

## To bundle the CloudFront renders locally

If you want a fully offline pitch package (e.g. a PDF for someone with no internet), download the 11 scenes into `assets/gallery/` and then swap each `https://d2xsxph8kpxj0f.cloudfront.net/...` URL in the markdown for the matching local path `assets/gallery/SceneNN.webp`.

A one-liner from this folder:

```bash
mkdir -p assets/gallery && for n in 22 23 26 32 33 39 41 51 52 76 77; do
  curl -L "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene${n}.webp" \
       -o "assets/gallery/Scene${n}.webp"
done
```

(That had to be run from a normal network — the agent environment that generated this deck has CloudFront blocked at the corporate proxy, which is why the renders are linked rather than bundled here.)

---

## Exporting to PDF / slides

The markdown is plain CommonMark with no extensions. To produce a polished output:

- **PDF**: `pandoc OMA-Townhouse-Pitch.md -o OMA-Townhouse-Pitch.pdf --pdf-engine=xelatex` (or open in any markdown-to-PDF tool — Typora, Marp, VS Code's "Markdown PDF" extension).
- **Slides**: open with [Marp](https://marp.app/) — each `---` divider already maps to a slide break. You can add `---\nmarp: true\ntheme: default\n---` at the very top if you want Marp styling.
- **Web**: deploy as a GitHub repo or convert to HTML — links and images all resolve as-is.

---

## What is NOT in this folder (intentionally)

- **Pricing PDFs / brochures**: not yet produced. The deck embeds the live pricing from omatownhouse.com.
- **Legal templates**: the PPJB, POA, and PPAT contact go on the channel after the buyer signals intent. Not part of the public pitch.
- **Resend / lead email config**: separate ops work, not investor-facing.
