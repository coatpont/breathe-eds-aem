var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // tools/importer/import-support-page.js
  var import_support_page_exports = {};
  __export(import_support_page_exports, {
    default: () => import_support_page_default
  });

  // tools/importer/parsers/support-cards.js
  function parse(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".support-card"));
    const cells = [];
    for (const card of cards) {
      const icon = card.querySelector(".support-card-icon");
      const title = card.querySelector("h2");
      const description = card.querySelector("p");
      const actionLink = card.querySelector(".support-card-action a");
      const textCell = [];
      if (title) textCell.push(title);
      if (description) textCell.push(description);
      if (actionLink) textCell.push(actionLink);
      const iconCell = icon || "";
      cells.push([iconCell, textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
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

  // tools/importer/import-support-page.js
  var parsers = {
    "support-cards": parse
  };
  var PAGE_TEMPLATE = {
    name: "support-page",
    description: "Support and FAQ page with help content and contact information",
    urls: [
      "https://www.breathe-app.com/support/",
      "https://www.breathe-app.com/fr/support/",
      "https://www.breathe-app.com/es/support/",
      "https://www.breathe-app.com/de/support/",
      "https://www.breathe-app.com/nl/support/",
      "https://www.breathe-app.com/it/support/",
      "https://www.breathe-app.com/pt/support/",
      "https://www.breathe-app.com/ja/support/",
      "https://www.breathe-app.com/tr/support/",
      "https://www.breathe-app.com/ro/support/",
      "https://www.breathe-app.com/pl/support/",
      "https://www.breathe-app.com/el/support/",
      "https://www.breathe-app.com/sv/support/",
      "https://www.breathe-app.com/da/support/",
      "https://www.breathe-app.com/no/support/",
      "https://www.breathe-app.com/fi/support/",
      "https://www.breathe-app.com/ar/support/",
      "https://www.breathe-app.com/hi/support/",
      "https://www.breathe-app.com/id/support/",
      "https://www.breathe-app.com/ko/support/",
      "https://www.breathe-app.com/ms/support/",
      "https://www.breathe-app.com/ru/support/",
      "https://www.breathe-app.com/th/support/",
      "https://www.breathe-app.com/uk/support/",
      "https://www.breathe-app.com/vi/support/",
      "https://www.breathe-app.com/zh-Hans/support/",
      "https://www.breathe-app.com/zh-Hant/support/"
    ],
    blocks: [
      {
        name: "support-cards",
        instances: [".support-grid"]
      }
    ],
    sections: [
      {
        id: "content-section",
        name: "Main Content",
        selector: "main",
        style: null,
        blocks: ["support-cards"],
        defaultContent: [".support-page-head h1", ".support-page-head p"]
      }
    ]
  };
  var transformers = [
    transform
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
  var import_support_page_default = {
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/support/index"
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
  return __toCommonJS(import_support_page_exports);
})();
