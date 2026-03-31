/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel block.
 * Base: carousel. Source: https://www.breathe-app.com/
 * Generated: 2026-03-25
 *
 * Source DOM structure (from .cap-carousel inside aside.feature-rail):
 *   picture (×7, each containing an app screenshot)
 *     img (screenshot image with alt text)
 *
 * Target block structure (from block library):
 *   2 columns per row: [image, text content (optional)]
 *   Each row is one slide
 *   This carousel has images only, no text content
 */
export default function parse(element, { document }) {
  // Select all picture elements (each is a slide)
  const pictures = Array.from(element.querySelectorAll('picture'));

  const cells = [];
  for (const picture of pictures) {
    const img = picture.querySelector('img');
    const altText = img ? img.getAttribute('alt') || '' : '';

    // Row: [image cell, text cell (alt text as description)]
    const textCell = [];
    if (altText) {
      const p = document.createElement('p');
      p.textContent = altText;
      textCell.push(p);
    }

    cells.push([picture, textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel', cells });
  element.replaceWith(block);
}
