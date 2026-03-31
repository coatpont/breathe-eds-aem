/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero block.
 * Base: hero. Source: https://www.breathe-app.com/
 * Generated: 2026-03-25
 *
 * Source DOM structure (from section.hero):
 *   .hero-copy > h1 (heading)
 *   .hero-copy > p.hero-sub (subtitle)
 *   .store-badges > a.store-link > img.store-badge (App Store + Google Play badges)
 *
 * Target block structure (xwalk simple block - hero model):
 *   Simple block: each non-collapsed field = one row, one column
 *   Collapsed fields (suffix Alt): imageAlt, secondImageAlt
 *   Non-collapsed fields: text, image, secondImage = 3 rows
 *   Row 1: text (richtext) - heading + subtitle, with field hint
 *   Row 2: image (reference) - first store badge (App Store), with field hint
 *   Row 3: secondImage (reference) - second store badge (Google Play), with field hint
 */
export default function parse(element, { document }) {
  // Extract heading from .hero-copy h1
  const heading = element.querySelector('.hero-copy h1, h1');

  // Extract subtitle from .hero-sub or first p
  const subtitle = element.querySelector('.hero-sub, .hero-copy > p');

  // Extract store badge images from .store-badges
  const badgeImages = Array.from(element.querySelectorAll('.store-badges a.store-link img, .store-badges a img'));

  // Row 1: text (richtext with field hint) - heading + subtitle only
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (subtitle) textFrag.appendChild(subtitle);

  // Row 2: image (first badge) with field hint
  const imageFrag = document.createDocumentFragment();
  if (badgeImages[0]) {
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(badgeImages[0]);
  }

  // Row 3: secondImage (second badge) with field hint
  const secondImageFrag = document.createDocumentFragment();
  if (badgeImages[1]) {
    secondImageFrag.appendChild(document.createComment(' field:secondImage '));
    secondImageFrag.appendChild(badgeImages[1]);
  }

  // Simple block: 3 rows x 1 column (text, image, secondImage)
  const cells = [
    [textFrag],
    [badgeImages[0] ? imageFrag : ''],
    [badgeImages[1] ? secondImageFrag : ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
