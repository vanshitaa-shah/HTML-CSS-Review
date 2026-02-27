document.addEventListener('DOMContentLoaded', () => {
  const issues = [];
  console.log('script.js quick-check loaded');

  // Helper to mark element visually
  function mark(el, msg) {
    el.style.outline = '3px solid rgba(220,20,60,0.9)';
    el.title = (el.title ? el.title + ' | ' : '') + msg;
  }

  // 1. Check DOCTYPE
  try {
    const hasDoctype = !!document.doctype && document.doctype.name.toLowerCase() === 'html';
    if (!hasDoctype) issues.push('Missing or incorrect DOCTYPE declaration (should be <!DOCTYPE html>).');
  } catch (e) {
    issues.push('Unable to detect DOCTYPE.');
  }

  // 2. Check <html lang>
  const htmlEl = document.documentElement;
  if (!htmlEl.lang || htmlEl.lang.trim() === '') {
    issues.push('<html> element is missing a lang attribute.');
    mark(htmlEl, 'Missing lang attribute');
  }

  // 3. Check stylesheet filename looks like .css
  const sheet = document.querySelector('link[rel="stylesheet"]');
  if (sheet) {
    const href = sheet.getAttribute('href') || '';
    if (!href.endsWith('.css')) {
      issues.push(`Stylesheet href looks incorrect: "${href}" (should end with .css).`);
      mark(sheet, 'Stylesheet href may be incorrect');
    }
  }

  // 4. Images missing alt / missing dimensions
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push(`Image missing alt attribute: ${img.outerHTML.substring(0,80)}`);
      mark(img, 'Missing alt attribute');
    }
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      // not always required, but flag per instructions
      issues.push(`Image missing width/height attributes (may cause layout shift): ${img.src}`);
      mark(img, 'Missing width/height');
    }
  });

  // 5. Deprecated tags (e.g., <center>)
  const deprecated = ['center', 'font', 'marquee', 'blink'];
  deprecated.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      issues.push(`Deprecated element <${tag}> used.`);
      mark(el, `Deprecated <${tag}>`);
    });
  });

  // 6. Inputs without labels
  document.querySelectorAll('input,textarea,select').forEach(control => {
    const id = control.id;
    const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : control.closest('label') !== null;
    if (!hasLabel) {
      issues.push(`Form control missing associated <label>: ${control.outerHTML.substring(0,100)}`);
      mark(control, 'Missing label');
    }
  });

  // 7. Heading checks (single h1 and logical hierarchy)
  const h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) {
    issues.push('No <h1> found on the page.');
  } else if (h1s.length > 1) {
    issues.push(`Multiple <h1> elements found (${h1s.length}). Only one recommended.`);
    h1s.forEach(h => mark(h, 'Multiple h1'));
  }

  // 8. Inputs missing type attribute or generic text used where specific
  document.querySelectorAll('input').forEach(inp => {
    const type = inp.getAttribute('type');
    if (!type || type.trim() === '') {
      issues.push(`Input element missing type attribute: ${inp.outerHTML.substring(0,100)}`);
      mark(inp, 'Missing type attribute');
    }
  });

  // 9. Focus styles: warn when :focus outline removed via inline styles
  // (We can only heuristically check for tabindex removal or inline outline style)
  document.querySelectorAll('[tabindex]').forEach(el => {
    // nothing specific here, but ensure focusable
  });

  // 10. Report unclosed tags cannot be reliably detected here, but we can note malformed HTML if parser fixed structure
  // Provide summary in console

  if (issues.length === 0) {
    console.info('Accessibility/HTML/CSS quick-check: no obvious issues found by script.');
  } else {
    console.warn('Accessibility/HTML/CSS quick-check found issues:');
    issues.forEach((it, i) => console.warn(`${i+1}. ${it}`));
  }

  // Add a small on-page report banner for quick visibility
  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.right = '12px';
  banner.style.bottom = '12px';
  banner.style.background = 'rgba(0,0,0,0.8)';
  banner.style.color = '#fff';
  banner.style.padding = '8px 12px';
  banner.style.borderRadius = '6px';
  banner.style.fontSize = '13px';
  banner.style.zIndex = '99999';
  banner.style.maxWidth = '320px';
  banner.style.boxShadow = '0 6px 18px rgba(0,0,0,0.4)';
  banner.textContent = issues.length === 0 ? 'HTML/CSS quick-check: no obvious issues' : `HTML/CSS quick-check: ${issues.length} issue(s) — check console`;
  banner.addEventListener('click', () => {
    if (issues.length) {
      alert('Open the browser console for detailed list of issues.');
    } else {
      alert('No issues found by quick-check.');
    }
  });
  document.body.appendChild(banner);
});
