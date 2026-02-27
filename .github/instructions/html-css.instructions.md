---
applyTo: "**/*.html,**/*.css,**/*.scss,**/*.sass"
---

# HTML & CSS Code Review Instructions

> Mandatory rules for HTML & CSS code. All rules must pass before code approval.

---

## Review Feedback Format
 
- **[REQUIRED]** When providing feedback on defects or violations, always use **bold** formatting for the defect title/heading to ensure clear visibility.
 
**Example:**
```
**Missing alt attribute on image**
The image on line 42 is missing an alt attribute, which is required for accessibility.
```
 
 
## HTML Rules

### Structure & Semantics

- **[REQUIRED]** Every HTML file must begin with `<!DOCTYPE html>`.
- **[REQUIRED]** `<html>` tag must include `lang` attribute (e.g., `lang="en"`).
- **[REQUIRED]** Use semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — not `<div>` for everything.
- **[REQUIRED]** Only one `<h1>` per page. Headings must follow logical hierarchy (h1 → h2 → h3) — do not skip levels.
- **[REQUIRED]** Use `<button>` for interactive actions and `<a>` for navigation — never swap their purposes.

```html
<!-- ✅ Correct -->
<!DOCTYPE html>
<html lang="en">
  <header>
    <nav>...</nav>
  </header>
  <main>
    <h1>Page Title</h1>
    <section>...</section>
  </main>
</html>

<!-- ❌ Wrong -->
<html>
  <div class="header">
    <div class="title">Page Title</div>
  </div>
</html>
```

### Forms

- **[REQUIRED]** Every `<input>` must have an associated `<label>` using `for` + `id` pairing or wrapped in a `<label>`.
- **[REQUIRED]** Form inputs must include appropriate `type` attributes (`email`, `tel`, `number`, `password`, etc.).

```html
<!-- ✅ Correct -->
<label for="email">Email</label>
<input type="email" id="email" name="email" required />

<!-- ❌ Wrong -->
<input type="text" name="email" />
```

### Images & Media

- **[REQUIRED]** All `<img>` elements must have an `alt` attribute. Use descriptive text for meaningful images, empty `alt=""` for decorative ones.
- **[REQUIRED]** Use `loading="lazy"` on images and iframes below the fold.
- **[REQUIRED]** Specify `width` and `height` attributes on `<img>` to prevent layout shifts.

```html
<!-- ✅ Correct -->
<img src="hero.jpg" alt="Team celebrating product launch" width="1200" height="600" loading="lazy" />
<img src="divider.png" alt="" />

<!-- ❌ Wrong -->
<img src="hero.jpg" />
```

### Security

- **[REQUIRED]** Never use `target="_blank"` without `rel="noopener noreferrer"`.
- **[REQUIRED]** Do not use `javascript:` pseudo-protocol in `href` attributes.

```html
<!-- ✅ Correct -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Site</a>

<!-- ❌ Wrong -->
<a href="https://example.com" target="_blank">Visit Site</a>
<a href="javascript:void(0)">Click</a>
```

### Code Quality

- **[REQUIRED]** Remove all commented-out code before merging.
- **[REQUIRED]** No inline styles except for values set dynamically via JavaScript.
- **[REQUIRED]** No deprecated elements (`<center>`, `<font>`, `<marquee>`, `<blink>`).

---

## CSS Rules

### Variables & Design Tokens

- **[REQUIRED]** No magic numbers — all repeated values (colors, spacing, font sizes, z-index, border radius) must be CSS custom properties defined in `:root`.
- **[REQUIRED]** All CSS variables must be defined in `:root` unless component-scoped overrides.
- **[REQUIRED]** No hardcoded color hex/rgb values outside of `:root`.
- **[REQUIRED]** Z-index values must be managed via variables — no arbitrary numbers.

```css
/* ✅ Correct */
:root {
  --color-primary: #0056d2;
  --color-text: #1a1a1a;
  --color-bg: #ffffff;

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;

  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;

  --radius-sm: 4px;
  --radius-md: 8px;

  --z-dropdown: 100;
  --z-modal: 200;
}

.button {
  background-color: var(--color-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
}

/* ❌ Wrong */
.button {
  background-color: #0056d2;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 9999;
}
```

### Units & Spacing

- **[REQUIRED]** No mixed units — use `rem` for spacing and font sizes, `px` only for borders.
- **[REQUIRED]** Font sizes must be defined in `rem` for scalability and accessibility.

```css
/* ✅ Correct */
.card {
  font-size: 1rem;
  padding: 1rem;
  margin: 2rem 0;
  border: 1px solid var(--color-border);
}

/* ❌ Wrong */
.card {
  font-size: 16px;
  padding: 16px;
  margin: 32px 0;
}
```

### Layout

- **[REQUIRED]** Use Flexbox or Grid for layout. No `float` for layout purposes.
- **[REQUIRED]** No inline styles except for values set dynamically via JavaScript.

```css
/* ✅ Correct */
.container {
  display: flex;
  gap: var(--space-md);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* ❌ Wrong */
.container {
  float: left;
  width: 50%;
}
```

### Specificity & Selectors

- **[REQUIRED]** Never use `!important`.
- **[REQUIRED]** Keep selector specificity low. Prefer single class selectors.
- **[REQUIRED]** Do not use IDs (`#id`) for styling — reserve for JavaScript hooks and anchor links.
- **[REQUIRED]** Avoid deeply nested selectors — max 3 levels.
- **[REQUIRED]** Class names must be lowercase and hyphen-separated (kebab-case).

```css
/* ✅ Correct */
.nav-link { color: var(--color-link); }
.nav-link:hover { color: var(--color-link-hover); }
.button--primary { background: var(--color-primary); }

/* ❌ Wrong */
#header nav ul li a { color: blue; }
div.container .card p span { color: red; }
.title { color: red !important; }
.CardTitle { }  /* PascalCase */
```

### Responsive Design

- **[REQUIRED]** Design must be mobile-first. Write base styles for mobile, use `min-width` media queries to scale up.
- **[REQUIRED]** No horizontal scrollbar on any standard viewport width.
- **[REQUIRED]** Touch targets must be at least 44×44px on mobile.

```css
/* ✅ Correct – Mobile First */
.card {
  display: block;
  padding: 1rem;
}

@media (min-width: 768px) {
  .card {
    display: flex;
    padding: 2rem;
  }
}

/* ❌ Wrong – Desktop First */
.card { display: flex; }
@media (max-width: 768px) {
  .card { display: block; }
}
```

### Performance

- **[REQUIRED]** Animations must use `transform` and `opacity` only — never animate layout properties (`width`, `height`, `top`, `left`, `margin`).
- **[REQUIRED]** Unused CSS must be removed before merging.
- **[REQUIRED]** Avoid `@import` inside CSS files — use `<link>` in HTML or bundler.

```css
/* ✅ Correct – GPU-friendly */
.modal {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal.is-open {
  transform: translateY(0);
  opacity: 1;
}

/* ❌ Wrong – Triggers reflow */
.modal {
  top: 20px;
  transition: top 0.3s ease;
}
```

---

## Accessibility

- **[REQUIRED]** Interactive elements must be keyboard focusable and operable.
- **[REQUIRED]** Do not remove focus outline without providing custom visible replacement.
- **[REQUIRED]** Text color contrast must meet WCAG AA standard — minimum 4.5:1 for normal text, 3:1 for large text.
- **[REQUIRED]** Color must not be the only means of conveying information.

---

## Code Quality

- **[REQUIRED]** Code must be properly indented — use 2 spaces (no tabs).
- **[REQUIRED]** Remove all commented-out or dead code before merging.
- **[REQUIRED]** No trailing whitespace.
- **[REQUIRED]** Files must end with a single newline character.

---

## Quick Review Checklist

### HTML
- [ ] `<!DOCTYPE html>` present
- [ ] `lang` attribute on `<html>`
- [ ] Semantic elements used (not just `<div>`)
- [ ] Single `<h1>`, no skipped heading levels
- [ ] All `<img>` have `alt` attributes
- [ ] All `<input>` have associated `<label>`
- [ ] `<button>` for actions, `<a>` for navigation
- [ ] `loading="lazy"` on below-fold images
- [ ] No commented-out code
- [ ] No inline styles (except dynamic JS)

### CSS
- [ ] CSS custom properties in `:root` for all repeated values
- [ ] No hardcoded colors outside `:root`
- [ ] `rem` for spacing/fonts, `px` for borders only
- [ ] Flexbox or Grid for layout (no `float`)
- [ ] Never use `!important`
- [ ] No ID selectors for styling
- [ ] Max 3 levels of selector nesting
- [ ] Mobile-first responsive design
- [ ] Animations use `transform`/`opacity` only
- [ ] No unused CSS

 