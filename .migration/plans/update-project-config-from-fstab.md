Let me review the current state of both files first.# Plan: Review fstab.yaml and Update .migration/project.json

## Current State

### fstab.yaml
- **Mountpoint URL**: `https://author-p190307-e1982421.adobeaemcloud.com/bin/franklin.delivery/coatpont/breathe-eds-aem/main`
- **Type**: `markup`
- **Suffix**: `.html`
- This confirms an **xwalk** (Universal Editor / AEM Sites) project — author instance URL with `type: "markup"` and `suffix: ".html"`.

### .migration/project.json (current)
```json
{
  "type": "xwalk",
  "libraryUrl": "https://main--sta-xwalk-boilerplate--aemysites.aem.page/tools/sidekick/library.json",
  "contentHostUrl": "https://content.da.live/coatpont/breathe-eds-aem/"
}
```

## Issues Identified

1. **`contentHostUrl` is incorrect** — Points to `content.da.live` (DA/Document Authoring host), but this is an **xwalk** project. The content host should be derived from the AEM author instance in fstab.yaml, not a DA endpoint.
2. **`type` is correct** — Already set to `"xwalk"`.
3. **`libraryUrl` is correct** — Points to the xwalk-specific boilerplate library.

## Proposed Changes

Update `.migration/project.json` to replace the DA content host with the correct xwalk-derived content host URL based on fstab.yaml:

```json
{
  "type": "xwalk",
  "libraryUrl": "https://main--sta-xwalk-boilerplate--aemysites.aem.page/tools/sidekick/library.json",
  "contentHostUrl": "https://main--breathe-eds-aem--coatpont.aem.page"
}
```

The `contentHostUrl` is derived from the fstab mountpoint: `coatpont` (org) + `breathe-eds-aem` (repo) + `main` (branch) → `https://main--breathe-eds-aem--coatpont.aem.page`.

## Checklist

- [x] Read fstab.yaml to identify project type and configuration
- [x] Read current .migration/project.json
- [x] Identify discrepancies between fstab.yaml and project.json
- [ ] Update `contentHostUrl` to match xwalk project (derived from fstab.yaml mountpoint)
- [ ] Verify updated project.json is valid

> **Note:** Execution requires switching out of Plan mode.
