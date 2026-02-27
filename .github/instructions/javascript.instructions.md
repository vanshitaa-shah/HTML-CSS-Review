---
applyTo: "**/*.js,**/*.jsx,**/*.ts,**/*.tsx"
---

# *JavaScript Instructions*

*Formatting:* All JavaScript instructions in this file should be written in *italics*.

*Reviewer headings:* When Copilot generates review comments or headings for JavaScript files, format those headings in *italics*.

*No console:* Do not leave `console` statements in production code; remove `console.log`/debugging output before merging.

Purpose
- Required rules and checklist for JavaScript/TypeScript code reviews in this repo.

---

## General Principles

- **[REQUIRED]** Prefer small, single-responsibility functions and modules.
- **[RECOMMENDED]** Use ES Modules (`import` / `export`) for new code.
- **[REQUIRED]** Avoid polluting the global scope; always scope variables with `const`/`let` or module scope.
- **[REQUIRED]** Use `const` by default; use `let` only when re-assignment is necessary. Do not use `var`.
- **[REQUIRED]** Keep code free of console.log/debug statements before merging.
- **[REQUIRED]** Do not use `eval()` or `new Function()`.
- **[REQUIRED]** Avoid inline scripts in HTML; prefer external files.

## Style & Formatting

- **[REQUIRED]** Follow repository linting rules (`eslint`) and fix all lint errors.
- **[RECOMMENDED]** Use Prettier or the project's formatter for consistent formatting.
- **[REQUIRED]** Use 2 spaces for indentation unless the repo config specifies otherwise.
- **[REQUIRED]** Include JSDoc or concise comments for exported functions and complex logic.

## Types & Safety

- **[RECOMMENDED]** Prefer TypeScript for new modules; if using JS, add JSDoc types where helpful.
- **[REQUIRED]** Validate external inputs and avoid trusting user-provided data directly.
- **[REQUIRED]** Sanitize any data inserted into the DOM to prevent XSS.

## DOM & Accessibility

- **[REQUIRED]** Do not modify accessibility attributes (aria-*, role) incorrectly; prefer progressive enhancement.
- **[REQUIRED]** Ensure dynamic elements are keyboard-focusable where appropriate and expose correct ARIA roles.
- **[RECOMMENDED]** Use feature detection over user-agent sniffing.

## Performance

- **[REQUIRED]** Debounce or throttle expensive event handlers (scroll, resize, input) when appropriate.
- **[RECOMMENDED]** Batch DOM reads and writes to avoid layout thrashing.
- **[REQUIRED]** Avoid long-running synchronous work on the main thread; break into microtasks or use requestIdleCallback/worker if necessary.

## Events & Listeners

- **[REQUIRED]** Clean up event listeners when components are removed to avoid memory leaks.
- **[RECOMMENDED]** Use event delegation for large lists of dynamic items.

## Security

- **[REQUIRED]** Never construct HTML via string concatenation with untrusted input. Use `textContent`, `createElement`, or sanitizers.
- **[REQUIRED]** Validate and escape data sent to external services.

## Async & Error Handling

- **[REQUIRED]** Always handle promise rejections (use try/catch in async functions or .catch).
- **[RECOMMENDED]** Provide user-friendly error messages and graceful fallbacks.

## Testing

- **[RECOMMENDED]** Add unit tests for logic-heavy modules and integration tests for important flows.
- **[REQUIRED]** New behavior should include at least one test when practical.

## Build & Bundling

- **[RECOMMENDED]** Keep bundle size in mind; avoid large transitive dependencies for simple tasks.
- **[REQUIRED]** Do not check-in build artifacts unless the repo policy requires it.

## Dependencies

- **[REQUIRED]** Keep third-party dependencies minimal and review them for security and maintenance.
- **[REQUIRED]** Update `package.json` and lockfile together when adding/removing deps.

## Code Quality

- **[REQUIRED]** No trailing whitespace; files must end with a single newline.
- **[REQUIRED]** Remove dead code and commented-out blocks before merging.

---

## Quick Review Checklist

- [ ] No `var` used; `const`/`let` only.
- [ ] No global variables introduced.
- [ ] All promises handled; no unhandled rejections.
- [ ] No `console.log` or debug statements left.
- [ ] No `eval`, `new Function`, or dangerous patterns.
- [ ] Inputs validated and sanitized before use.
- [ ] Event listeners cleaned up and not leaking memory.
- [ ] Accessibility checks for dynamic content (focus management, ARIA roles).
- [ ] Linting passes (ESLint) and formatting applied.
- [ ] Unit tests added/updated where applicable.


## Review Feedback Format
 
- **[REQUIRED]** When providing feedback on defects or violations, always use **bold** formatting for the defect title/heading to ensure clear visibility. Also Captialize the title
 
**Example:**
```
**Missing alt attribute on image**
The image on line 42 is missing an alt attribute, which is required for accessibility.
```