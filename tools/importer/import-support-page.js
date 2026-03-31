/* eslint-disable */
/* global WebImporter */

/**
 * Import script for the support-page template.
 * Orchestrates parsers and transformers for Breathe App support page migration.
 * Template: support-page (27 localized URLs)
 * Generated: 2026-03-25
 */

// PARSER IMPORTS
import supportCardsParser from './parsers/support-cards.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/breathe-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'support-cards': supportCardsParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'support-page',
  description: 'Support and FAQ page with help content and contact information',
  urls: [
    'https://www.breathe-app.com/support/',
    'https://www.breathe-app.com/fr/support/',
    'https://www.breathe-app.com/es/support/',
    'https://www.breathe-app.com/de/support/',
    'https://www.breathe-app.com/nl/support/',
    'https://www.breathe-app.com/it/support/',
    'https://www.breathe-app.com/pt/support/',
    'https://www.breathe-app.com/ja/support/',
    'https://www.breathe-app.com/tr/support/',
    'https://www.breathe-app.com/ro/support/',
    'https://www.breathe-app.com/pl/support/',
    'https://www.breathe-app.com/el/support/',
    'https://www.breathe-app.com/sv/support/',
    'https://www.breathe-app.com/da/support/',
    'https://www.breathe-app.com/no/support/',
    'https://www.breathe-app.com/fi/support/',
    'https://www.breathe-app.com/ar/support/',
    'https://www.breathe-app.com/hi/support/',
    'https://www.breathe-app.com/id/support/',
    'https://www.breathe-app.com/ko/support/',
    'https://www.breathe-app.com/ms/support/',
    'https://www.breathe-app.com/ru/support/',
    'https://www.breathe-app.com/th/support/',
    'https://www.breathe-app.com/uk/support/',
    'https://www.breathe-app.com/vi/support/',
    'https://www.breathe-app.com/zh-Hans/support/',
    'https://www.breathe-app.com/zh-Hant/support/',
  ],
  blocks: [
    {
      name: 'support-cards',
      instances: ['.support-grid'],
    },
  ],
  sections: [
    {
      id: 'content-section',
      name: 'Main Content',
      selector: 'main',
      style: null,
      blocks: ['support-cards'],
      defaultContent: ['.support-page-head h1', '.support-page-head p'],
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

/**
 * Find all blocks on the page based on the embedded template configuration.
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Ensure all images have absolute URLs (preserve source URLs)
    main.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http')) {
        try {
          img.setAttribute('src', new URL(src, params.originalURL).href);
        } catch (e) { /* keep as-is */ }
      }
    });

    // 6. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/support/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
