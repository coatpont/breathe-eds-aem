var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const heading = element.querySelector(".hero-copy h1, h1");
    const subtitle = element.querySelector(".hero-sub, .hero-copy > p");
    const badgeImages = Array.from(element.querySelectorAll(".store-badges a.store-link img, .store-badges a img"));
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (subtitle) textFrag.appendChild(subtitle);
    const imageFrag = document.createDocumentFragment();
    if (badgeImages[0]) {
      imageFrag.appendChild(document.createComment(" field:image "));
      imageFrag.appendChild(badgeImages[0]);
    }
    const secondImageFrag = document.createDocumentFragment();
    if (badgeImages[1]) {
      secondImageFrag.appendChild(document.createComment(" field:secondImage "));
      secondImageFrag.appendChild(badgeImages[1]);
    }
    const cells = [
      [textFrag],
      [badgeImages[0] ? imageFrag : ""],
      [badgeImages[1] ? secondImageFrag : ""]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".background-card, .rhythm-card"));
    const cells = [];
    for (const card of cards) {
      const img = card.querySelector("picture, img");
      const title = card.querySelector("h3");
      const description = card.querySelector(".media-type, p");
      const textCell = [];
      if (title) textCell.push(title);
      if (description) textCell.push(description);
      cells.push([img || "", textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel.js
  function parse3(element, { document }) {
    const pictures = Array.from(element.querySelectorAll("picture"));
    const cells = [];
    for (const picture of pictures) {
      const img = picture.querySelector("img");
      const altText = img ? img.getAttribute("alt") || "" : "";
      const textCell = [];
      if (altText) {
        const p = document.createElement("p");
        p.textContent = altText;
        textCell.push(p);
      }
      cells.push([picture, textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/breathe-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["div.ambient"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.site-header",
        "footer.site-footer",
        "noscript",
        "link",
        "source"
      ]);
    }
  }

  // tools/importer/transformers/breathe-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = section.selector;
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
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "cards": parse2,
    "carousel": parse3
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Main landing page with app overview, features, download links, and promotional content",
    urls: [
      "https://www.breathe-app.com/",
      "https://www.breathe-app.com/da/",
      "https://www.breathe-app.com/de/",
      "https://www.breathe-app.com/el/",
      "https://www.breathe-app.com/es/",
      "https://www.breathe-app.com/fi/",
      "https://www.breathe-app.com/fr/",
      "https://www.breathe-app.com/it/",
      "https://www.breathe-app.com/ja/",
      "https://www.breathe-app.com/nl/",
      "https://www.breathe-app.com/no/",
      "https://www.breathe-app.com/pl/",
      "https://www.breathe-app.com/pt/",
      "https://www.breathe-app.com/ro/",
      "https://www.breathe-app.com/sv/",
      "https://www.breathe-app.com/tr/",
      "https://www.breathe-app.com/ar/",
      "https://www.breathe-app.com/hi/",
      "https://www.breathe-app.com/id/",
      "https://www.breathe-app.com/ko/",
      "https://www.breathe-app.com/ms/",
      "https://www.breathe-app.com/ru/",
      "https://www.breathe-app.com/th/",
      "https://www.breathe-app.com/uk/",
      "https://www.breathe-app.com/vi/",
      "https://www.breathe-app.com/zh-Hans/",
      "https://www.breathe-app.com/zh-Hant/"
    ],
    blocks: [
      {
        name: "hero",
        instances: ["section.hero"]
      },
      {
        name: "cards",
        instances: [".background-grid", ".rhythm-grid"]
      },
      {
        name: "carousel",
        instances: [".cap-carousel"]
      }
    ],
    sections: [
      {
        id: "hero-section",
        name: "Hero Section",
        selector: "section.hero",
        style: "midnight",
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "capabilities-section",
        name: "Capabilities Section",
        selector: "div.section#capabilities",
        style: "midnight",
        blocks: [],
        defaultContent: [".section-head h2", ".section-head p", "ul.feature-list"]
      },
      {
        id: "backgrounds-section",
        name: "Backgrounds Section",
        selector: "div.section#backgrounds",
        style: "midnight",
        blocks: ["cards"],
        defaultContent: ["#backgrounds .section-head h2", "#backgrounds .section-head p"]
      },
      {
        id: "rhythms-section",
        name: "Breathing Rhythms Section",
        selector: "div.section#rhythms",
        style: "midnight",
        blocks: ["cards"],
        defaultContent: ["#rhythms .section-head h2", "#rhythms .section-head p"]
      },
      {
        id: "screenshots-section",
        name: "App Screenshots Section",
        selector: "aside.feature-rail",
        style: null,
        blocks: ["carousel"],
        defaultContent: []
      },
      {
        id: "footer-section",
        name: "Footer Section",
        selector: "footer.site-footer",
        style: null,
        blocks: [],
        defaultContent: ["footer.site-footer div"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = {
      ...payload,
      template: PAGE_TEMPLATE
    };
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      main.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http")) {
          try {
            img.setAttribute("src", new URL(src, params.originalURL).href);
          } catch (e) {
          }
        }
      });
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
