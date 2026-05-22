#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { parseArgs, showHelp } = require('./args');

const DEFAULTS = {
  title: 'Skilled Worker Visa',
  label: 'Aircounsel',
  desc: 'Avoid threshold failures at intake with clearer issue framing.',
  badge: 'Guide',
  cta: 'Start your assessment',
  out: 'output/og-image.png',
  page: 'Aircounsel',
};

function normalizeList(listValue) {
  if (!listValue) return [];
  return String(listValue)
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(config) {
  const list = normalizeList(config.list)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        font-family: Inter, ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        background: radial-gradient(1200px 500px at right top, #0c4a6e 0%, #0f172a 60%);
        color: #f8fafc;
      }
      .frame {
        width: 100%;
        height: 100%;
        padding: 48px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 24px;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .label {
        font-size: 24px;
        color: #bae6fd;
      }
      .badge {
        padding: 10px 16px;
        border-radius: 999px;
        background: #0284c7;
        font-weight: 700;
      }
      h1 {
        margin: 0 0 16px;
        font-size: 70px;
        line-height: 1.05;
      }
      p {
        margin: 0;
        font-size: 34px;
        color: #e2e8f0;
        max-width: 980px;
      }
      ul {
        margin: 20px 0 0;
        padding-left: 28px;
        font-size: 28px;
        color: #cbd5e1;
      }
      li { margin-bottom: 10px; }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cta {
        font-size: 30px;
        font-weight: 700;
        color: #f0f9ff;
      }
      .page {
        color: #93c5fd;
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <div class="frame">
      <div class="top">
        <div class="label">${escapeHtml(config.label)}</div>
        <div class="badge">${escapeHtml(config.badge)}</div>
      </div>
      <main>
        <h1>${escapeHtml(config.title)}</h1>
        <p>${escapeHtml(config.desc)}</p>
        ${list ? `<ul>${list}</ul>` : ''}
      </main>
      <div class="bottom">
        <div class="cta">${escapeHtml(config.cta)}</div>
        <div class="page">${escapeHtml(config.page)}</div>
      </div>
    </div>
  </body>
</html>`;
}

async function generateImage(options) {
  const config = { ...DEFAULTS, ...options };
  const html = buildHtml(config);
  const outFile = path.resolve(config.out);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const launchOptions = {};
  if (config.chrome) {
    launchOptions.executablePath = config.chrome;
  }

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outFile, type: 'png' });
    return outFile;
  } finally {
    await browser.close();
  }
}

async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    showHelp();
    return;
  }

  try {
    const outFile = await generateImage(args);
    console.log(`OG image generated: ${outFile}`);
  } catch (error) {
    console.error('Failed to generate OG image.');
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  generateImage,
  buildHtml,
  DEFAULTS,
};
