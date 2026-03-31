/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Breathe App sections.
 * Adds section breaks (<hr>) and Section Metadata blocks from template sections.
 * Selectors from captured DOM at https://www.breathe-app.com/
 * Runs in afterTransform only, uses payload.template.sections.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const template = payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const sections = template.sections;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selector = section.selector;

      // Find the first element matching this section's selector
      let sectionEl;
      if (Array.isArray(selector)) {
        for (const sel of selector) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
      } else {
        sectionEl = element.querySelector(selector);
      }

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> before section (except first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
