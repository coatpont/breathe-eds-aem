/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Breathe App cleanup.
 * Selectors from captured DOM at https://www.breathe-app.com/
 * Removes non-authorable content: header, footer, ambient bg, language switcher.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove empty ambient background div (decorative only)
    // Found in captured HTML: <div class="ambient"></div>
    WebImporter.DOMUtils.remove(element, ['div.ambient']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found in captured HTML: <header class="site-header">
    // Found in captured HTML: <footer class="site-footer">
    WebImporter.DOMUtils.remove(element, [
      'header.site-header',
      'footer.site-footer',
      'noscript',
      'link',
      'source'
    ]);
  }
}
