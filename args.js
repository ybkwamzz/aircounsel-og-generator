const SUPPORTED_FLAGS = new Set([
  '--title',
  '--label',
  '--desc',
  '--badge',
  '--cta',
  '--out',
  '--page',
  '--list',
  '--chrome',
  '--help',
  '-h',
]);

function toKey(flag) {
  return flag.replace(/^--/, '');
}

function parseArgs(argv) {
  const parsed = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (!SUPPORTED_FLAGS.has(token)) {
      throw new Error(`Unsupported flag: ${token}`);
    }

    if (token === '--help' || token === '-h') {
      parsed.help = true;
      continue;
    }

    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      throw new Error(`Missing value for ${token}`);
    }

    parsed[toKey(token)] = next;
    i += 1;
  }

  return parsed;
}

function showHelp() {
  console.log(`\nUsage:\n  node index.js --title "Skilled Worker" --desc "Threshold failures at intake" --out output/skilled-worker.png\n\nFlags:\n  --title   Main heading text\n  --label   Top-left brand label\n  --desc    Supporting description\n  --badge   Top-right pill label\n  --cta     Bottom call-to-action text\n  --out     Output path for PNG\n  --page    Bottom-right page label\n  --list    Pipe-separated bullets, e.g. "One|Two|Three"\n  --chrome  Optional path to Chrome/Chromium executable\n  --help, -h  Show this help message\n`);
}

module.exports = {
  parseArgs,
  showHelp,
};
