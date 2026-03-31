/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block.
 * Base: cards. Source: https://www.breathe-app.com/
 * Generated: 2026-03-25
 *
 * Source DOM structure (from .background-grid and .rhythm-grid):
 *   .background-card or .rhythm-card (each card)
 *     picture > img (thumbnail image)
 *     h3 (card title: Beach, River, Balance, Relax, etc.)
 *     p or .media-type span (description text: Video/Image or timing)
 *
 * Target block structure (from block library):
 *   2 columns per row: [image, text content]
 *   Text content: Title (heading) + Description
 */
export default function parse(element, { document }) {
  // Select all card items - works for both background-card and rhythm-card
  const cards = Array.from(element.querySelectorAll('.background-card, .rhythm-card'));

  const cells = [];
  for (const card of cards) {
    // Extract image from picture > img
    const img = card.querySelector('picture, img');

    // Extract title (h3)
    const title = card.querySelector('h3');

    // Extract description - media-type span for backgrounds, p for rhythms
    const description = card.querySelector('.media-type, p');

    // Build text content cell
    const textCell = [];
    if (title) textCell.push(title);
    if (description) textCell.push(description);

    // Row: [image cell, text cell]
    cells.push([img || '', textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
