# BLOCKS: rich content vocabulary for article bodies

The article `body` field is raw HTML rendered into `.blog-body`. Styling lives in
`client/src/index.css` under "Blog body rich content". This file is the markup
contract: use these blocks and nothing else, so every article looks like it came
from the same publication.

All HUMANIZER.md character bans apply inside blocks. No em dash, en dash, curly
quote or emoji in a table cell, a caption, or an SVG label.

## Why this matters

Tables and labelled diagrams are the most extractable formats there are. A
comparison table is far more likely to be lifted into a Google featured snippet
or quoted by an AI assistant than the same facts buried in a paragraph. The
prerender renders this markup to static HTML, so crawlers get the table and the
diagram without running JavaScript. Prose is the fallback, not the default.

## Budget per article

Aim for two to four blocks in a 200 to 400 word article. One is thin, five is
clutter. Every article that compares two things must contain a comparison table.
Every investment article must contain one `callout warn`.

---

## 1. Comparison table

The workhorse. Any "X vs Y", any rate that varies by taxpayer, any cost
breakdown. Always wrap in `.table-wrap` or it will break the page on mobile.

```html
<div class="table-wrap"><table>
  <thead><tr><th>Item</th><th>Leasehold</th><th>PT PMA</th></tr></thead>
  <tbody>
    <tr><th>US forms each year</th><td>Schedule E, Form 1116</td><td>Plus 5471, 926, 8938, FBAR</td></tr>
    <tr><th>Annual US compliance cost</th><td>USD 300 to 800</td><td>USD 2,500 to 6,000</td></tr>
  </tbody>
  <caption>Illustrative ranges for a single villa. Not tax advice.</caption>
</table></div>
```

Rules. Row labels go in `<th>` inside `<tbody>`, column headers in `<thead>`.
Keep to four columns at most. Use `<caption>` for the source or the caveat, not
for a title. Never put a bare number in a cell without its unit or currency.

## 2. Stat row

Two to four pulled figures. Use when the numbers are the point and a table would
be overkill. Not for decoration.

```html
<div class="stat-row">
  <div class="stat"><b>20%</b><span>Indonesian withholding on gross rent for a non-resident owner</span></div>
  <div class="stat"><b>30 years</b><span>ADS depreciation period for foreign residential rental</span></div>
  <div class="stat"><b>USD 10,000</b><span>Minimum annual penalty for a missed Form 5471</span></div>
</div>
```

## 3. Callout

`callout` for context worth separating. `callout warn` is reserved for the
uncomfortable truth that every investment article must carry above the fold.

```html
<aside class="callout warn">
  <b>The number most Bali marketing gets wrong</b>
  <p>The 10 percent rental tax quoted across the industry is the Indonesian tax resident rate. A US owner who never spends 183 days in Indonesia is a non-resident and pays 20 percent of gross under PPh 26.</p>
</aside>
```

## 4. Figure with inline SVG

For diagrams and charts. Hand-author the SVG. Never use a client-side chart
library here: it renders nothing into the prerendered HTML, so crawlers and AI
assistants see an empty box.

Requirements. Set `viewBox` and omit `width`/`height` so it scales. Add
`role="img"` and a `<title>` as the first child for screen readers. Use the `dg-`
classes rather than inline `fill` so the palette stays consistent. Always pair
with a `<figcaption>`.

```html
<figure>
  <svg viewBox="0 0 640 200" role="img" xmlns="http://www.w3.org/2000/svg">
    <title>Gross rental yield reduced to net yield by four cost lines</title>
    <rect class="dg-bar" x="0" y="40" width="420" height="28" rx="4"/>
    <text class="dg-label" x="430" y="60">Gross USD 16,000</text>
    <rect class="dg-bar-muted" x="0" y="90" width="160" height="28" rx="4"/>
    <text class="dg-sub" x="170" y="110">Net USD 6,050 after fees, tax and costs</text>
  </svg>
  <figcaption>Illustrative waterfall on a USD 150,000 villa. Ranges vary by occupancy and management. Not financial advice.</figcaption>
</figure>
```

Diagram classes available: `dg-box`, `dg-box-accent`, `dg-bar`, `dg-bar-muted`,
`dg-line`, `dg-label`, `dg-sub`.

Diagram types that earn their place here: a decision tree routing the reader to
the right ownership structure, a cost waterfall from gross to net, a purchase or
construction timeline, a side-by-side bar comparison. If the picture only
restates the sentence next to it, cut it.

## 5. Headings and lists

`<h2>` and `<h3>` are available and should be used once an article passes about
three paragraphs. Ordered lists for sequences, unordered for sets. Do not use a
list where a table belongs.

---

## Checklist before shipping a body

- [ ] Every `<table>` is wrapped in `<div class="table-wrap">`
- [ ] Every comparison article has a comparison table
- [ ] Every investment article has one `callout warn`
- [ ] Every `<svg>` has `viewBox`, `role="img"` and a `<title>`
- [ ] Every `<figure>` has a `<figcaption>`
- [ ] No banned characters inside any cell, caption, label or heading
- [ ] Two to four blocks total, not more
