/* eslint-disable */
/* global WebImporter */

/**
 * Import script for the homepage template.
 * Orchestrates parsers and transformers for Breathe App homepage migration.
 * Template: homepage (28 localized URLs)
 * Generated: 2026-03-25
 */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import carouselParser from './parsers/carousel.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/breathe-cleanup.js';
import sectionsTransformer from './transformers/breathe-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'cards': cardsParser,
  'carousel': carouselParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Main landing page with app overview, features, download links, and promotional content',
  urls: [
    'https://www.breathe-app.com/',
    'https://www.breathe-app.com/da/',
    'https://www.breathe-app.com/de/',
    'https://www.breathe-app.com/el/',
    'https://www.breathe-app.com/es/',
    'https://www.breathe-app.com/fi/',
    'https://www.breathe-app.com/fr/',
    'https://www.breathe-app.com/it/',
    'https://www.breathe-app.com/ja/',
    'https://www.breathe-app.com/nl/',
    'https://www.breathe-app.com/no/',
    'https://www.breathe-app.com/pl/',
    'https://www.breathe-app.com/pt/',
    'https://www.breathe-app.com/ro/',
    'https://www.breathe-app.com/sv/',
    'https://www.breathe-app.com/tr/',
    'https://www.breathe-app.com/ar/',
    'https://www.breathe-app.com/hi/',
    'https://www.breathe-app.com/id/',
    'https://www.breathe-app.com/ko/',
    'https://www.breathe-app.com/ms/',
    'https://www.breathe-app.com/ru/',
    'https://www.breathe-app.com/th/',
    'https://www.breathe-app.com/uk/',
    'https://www.breathe-app.com/vi/',
    'https://www.breathe-app.com/zh-Hans/',
    'https://www.breathe-app.com/zh-Hant/',
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['section.hero'],
    },
    {
      name: 'cards',
      instances: ['.background-grid', '.rhythm-grid'],
    },
    {
      name: 'carousel',
      instances: ['.cap-carousel'],
    },
  ],
  sections: [
    {
      id: 'hero-section',
      name: 'Hero Section',
      selector: 'section.hero',
      style: 'midnight',
      blocks: ['hero'],
      defaultContent: [],
    },
    {
      id: 'capabilities-section',
      name: 'Capabilities Section',
      selector: 'div.section#capabilities',
      style: 'midnight',
      blocks: [],
      defaultContent: ['.section-head h2', '.section-head p', 'ul.feature-list'],
    },
    {
      id: 'backgrounds-section',
      name: 'Backgrounds Section',
      selector: 'div.section#backgrounds',
      style: 'midnight',
      blocks: ['cards'],
      defaultContent: ['#backgrounds .section-head h2', '#backgrounds .section-head p'],
    },
    {
      id: 'rhythms-section',
      name: 'Breathing Rhythms Section',
      selector: 'div.section#rhythms',
      style: 'midnight',
      blocks: ['cards'],
      defaultContent: ['#rhythms .section-head h2', '#rhythms .section-head p'],
    },
    {
      id: 'screenshots-section',
      name: 'App Screenshots Section',
      selector: 'aside.feature-rail',
      style: null,
      blocks: ['carousel'],
      defaultContent: [],
    },
    {
      id: 'footer-section',
      name: 'Footer Section',
      selector: 'footer.site-footer',
      style: null,
      blocks: [],
      defaultContent: ['footer.site-footer div'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
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

    // 7. Generate sanitized path (full localized path without extension)
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
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
