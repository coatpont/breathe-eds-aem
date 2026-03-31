/* eslint-disable */
/* global WebImporter */

/**
 * Parser for support cards block.
 * Base: cards. Source: https://www.breathe-app.com/support/
 * Generated: 2026-03-25
 *
 * Source DOM structure (from .support-grid):
 *   .support-card (×2)
 *     .support-card-icon (emoji)
 *     h2 (card title)
 *     p (description)
 *     .support-card-action (CTA link)
 *
 * Target block structure:
 *   2 columns per row: [icon/image, text content]
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.support-card'));

  const cells = [];
  for (const card of cards) {
    const icon = card.querySelector('.support-card-icon');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const actionLink = card.querySelector('.support-card-action a');

    const textCell = [];
    if (title) textCell.push(title);
    if (description) textCell.push(description);
    if (actionLink) textCell.push(actionLink);

    // Use icon text as image placeholder
    const iconCell = icon || '';
    cells.push([iconCell, textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
