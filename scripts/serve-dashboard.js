#!/usr/bin/env node
'use strict';

// Servidor estatico zero-dependencia (so http/fs/path do Node) para
// docs/dashboard.html. Existe porque fetch() de arquivo local (file://) e
// bloqueado por CORS na maioria dos navegadores — dashboard.html precisa
// ser servido por http:// para conseguir ler os demais docs/*.md ao lado.

const http = require('http');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '..', 'docs');

// Lista test-scenarios.md sob docs/analysis/**/ (uma subpasta por US/EP/
// TELA/DOC) e docs/reverse/*-test-scenarios.md (telas sem US), pra
// dashboard.html achar o cenario Gherkin de um TC-ID sem precisar adivinhar
// o caminho.
function listScenarioFiles() {
  const results = [];

  function walk(dir, relBase) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (err) {
      return;
    }
    for (const entry of entries) {
      const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel);
      } else if (entry.name === 'test-scenarios.md') {
        results.push(`analysis/${rel}`);
      }
    }
  }
  walk(path.join(DOCS_DIR, 'analysis'), '');

  try {
    for (const f of fs.readdirSync(path.join(DOCS_DIR, 'reverse'))) {
      if (f.endsWith('-test-scenarios.md')) results.push(`reverse/${f}`);
    }
  } catch (err) {
    // docs/reverse/ pode nao existir ainda — sem problema.
  }

  return results;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (reqPath === '/') reqPath = '/dashboard.html';

  // Dashboard.html nao consegue listar um diretorio via fetch() sozinho —
  // esse endpoint e o que permite ele achar relatorios de auditoria/triage
  // em docs/runs/ sem precisar adivinhar nome de arquivo.
  if (reqPath === '/_api/runs') {
    const runsDir = path.join(DOCS_DIR, 'runs');
    fs.readdir(runsDir, (err, entries) => {
      const files = err ? [] : entries.filter((f) => f.endsWith('.md'));
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ files }));
    });
    return;
  }

  if (reqPath === '/_api/scenarios') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ files: listScenarioFiles() }));
    return;
  }

  const filePath = path.join(DOCS_DIR, reqPath);

  if (!filePath.startsWith(DOCS_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Nao encontrado: ${reqPath}`);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(0, () => {
  const { port } = server.address();
  console.log('');
  console.log('  Dashboard rodando em:');
  console.log(`  http://localhost:${port}/dashboard.html`);
  console.log('');
  console.log('  Ctrl+C para encerrar.');
});
