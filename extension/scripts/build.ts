import * as esbuild from "esbuild";
import { cpSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";

const extDir = resolve(import.meta.dirname, "..");
const srcDir = resolve(extDir, "src");
const distDir = resolve(extDir, "dist");

// Clean dist
rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

// Build TypeScript files
await esbuild.build({
  entryPoints: [
    resolve(srcDir, "popup/popup.ts"),
    resolve(srcDir, "background/service-worker.ts"),
    resolve(srcDir, "content/content.ts"),
    resolve(srcDir, "suspended/suspended.ts"),
    resolve(srcDir, "settings/settings.ts"),
  ],
  bundle: true,
  outdir: distDir,
  format: "esm",
  target: "chrome120",
  minify: false,
});

// Copy static files
cpSync(resolve(srcDir, "popup/popup.html"), resolve(distDir, "popup/popup.html"));
cpSync(resolve(srcDir, "popup/popup.css"), resolve(distDir, "popup/popup.css"));
cpSync(resolve(extDir, "manifest.json"), resolve(distDir, "manifest.json"));
cpSync(resolve(extDir, "assets"), resolve(distDir, "assets"), { recursive: true });
cpSync(resolve(srcDir, "suspended/suspended.html"), resolve(distDir, "suspended/suspended.html"));
cpSync(resolve(srcDir, "settings/settings.html"), resolve(distDir, "settings/settings.html"));
cpSync(resolve(srcDir, "settings/settings.css"), resolve(distDir, "settings/settings.css"));

console.log("Build complete → extension/dist/");
