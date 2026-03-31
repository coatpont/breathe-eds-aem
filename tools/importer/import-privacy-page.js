/* eslint-disable */
/* global WebImporter */

/**
 * Import script for the privacy-page template.
 * This is a simple default-content page (no blocks).
 * Template: privacy-page (27 localized URLs)
 * Generated: 2026-03-25
 */

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/breathe-cleanup.js';

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'privacy-page',
  description: 'Privacy policy page with legal text about data collection and usage',
  urls: [
    'https://www.breathe-app.com/privacy/',
    'https://www.breathe-app.com/fr/privacy/',
    'https://www.breathe-app.com/es/privacy/',
    'https://www.breathe-app.com/de/privacy/',
    'https://www.breathe-app.com/nl/privacy/',
    'https://www.breathe-app.com/it/privacy/',
    'https://www.breathe-app.com/pt/privacy/',
    'https://www.breathe-app.com/ja/privacy/',
    'https://www.breathe-app.com/tr/privacy/',
    'https://www.breathe-app.com/ro/privacy/',
    'https://www.breathe-app.com/pl/privacy/',
    'https://www.breathe-app.com/el/privacy/',
    'https://www.breathe-app.com/sv/privacy/',
    'https://www.breathe-app.com/da/privacy/',
    'https://www.breathe-app.com/no/privacy/',
    'https://www.breathe-app.com/fi/privacy/',
    'https://www.breathe-app.com/ar/privacy/',
    'https://www.breathe-app.com/hi/privacy/',
    'https://www.breathe-app.com/id/privacy/',
    'https://www.breathe-app.com/ko/privacy/',
    'https://www.breathe-app.com/ms/privacy/',
    'https://www.breathe-app.com/ru/privacy/',
    'https://www.breathe-app.com/th/privacy/',
    'https://www.breathe-app.com/uk/privacy/',
    'https://www.breathe-app.com/vi/privacy/',
    'https://www.breathe-app.com/zh-Hans/privacy/',
    'https://www.breathe-app.com/zh-Hant/privacy/',
  ],
  blocks: [],
  sections: [
    {
      id: 'content-section',
      name: 'Main Content',
      selector: 'main section.section',
      style: null,
      blocks: [],
      defaultContent: ['.section-head h1', '.section-head p', '.card.wide h2', '.card.wide ul.feature-list', '.card.wide p'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
];

/**
 * Execute all page transformers for a specific hook.
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. No blocks to parse - this is all default content

    // 3. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 4. Ensure all images have absolute URLs (preserve source URLs)
    main.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        try {
          img.setAttribute('src', new URL(src, params.originalURL).href);
        } catch (e) { /* keep as-is */ }
      }
    });

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);

    // 5. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/privacy/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: [],
      },
    }];
  },
};
