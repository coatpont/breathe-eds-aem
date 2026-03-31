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

  // tools/importer/import-privacy-page.js
  var import_privacy_page_exports = {};
  __export(import_privacy_page_exports, {
    default: () => import_privacy_page_default
  });

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

  // tools/importer/import-privacy-page.js
  var PAGE_TEMPLATE = {
    name: "privacy-page",
    description: "Privacy policy page with legal text about data collection and usage",
    urls: [
      "https://www.breathe-app.com/privacy/",
      "https://www.breathe-app.com/fr/privacy/",
      "https://www.breathe-app.com/es/privacy/",
      "https://www.breathe-app.com/de/privacy/",
      "https://www.breathe-app.com/nl/privacy/",
      "https://www.breathe-app.com/it/privacy/",
      "https://www.breathe-app.com/pt/privacy/",
      "https://www.breathe-app.com/ja/privacy/",
      "https://www.breathe-app.com/tr/privacy/",
      "https://www.breathe-app.com/ro/privacy/",
      "https://www.breathe-app.com/pl/privacy/",
      "https://www.breathe-app.com/el/privacy/",
      "https://www.breathe-app.com/sv/privacy/",
      "https://www.breathe-app.com/da/privacy/",
      "https://www.breathe-app.com/no/privacy/",
      "https://www.breathe-app.com/fi/privacy/",
      "https://www.breathe-app.com/ar/privacy/",
      "https://www.breathe-app.com/hi/privacy/",
      "https://www.breathe-app.com/id/privacy/",
      "https://www.breathe-app.com/ko/privacy/",
      "https://www.breathe-app.com/ms/privacy/",
      "https://www.breathe-app.com/ru/privacy/",
      "https://www.breathe-app.com/th/privacy/",
      "https://www.breathe-app.com/uk/privacy/",
      "https://www.breathe-app.com/vi/privacy/",
      "https://www.breathe-app.com/zh-Hans/privacy/",
      "https://www.breathe-app.com/zh-Hant/privacy/"
    ],
    blocks: [],
    sections: [
      {
        id: "content-section",
        name: "Main Content",
        selector: "main section.section",
        style: null,
        blocks: [],
        defaultContent: [".section-head h1", ".section-head p", ".card.wide h2", ".card.wide ul.feature-list", ".card.wide p"]
      }
    ]
  };
  var transformers = [
    transform
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
  var import_privacy_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/privacy/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: []
        }
      }];
    }
  };
  return __toCommonJS(import_privacy_page_exports);
})();
