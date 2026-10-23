#!/usr/bin/env node
'use strict';

// Pre-checagem de ambiente (docs/execucoes.md, triagem do CI): o site serve uma verificacao anti-bot
// ("Please wait while your request is being verified...", failedChecks=webdriverCheck) a navegadores
// automatizados depois de trafego continuo vindo de IPs de datacenter. Quando isso acontece, a suite
// inteira falha por motivo de ambiente. Esta checagem usa o MESMO navegador automatizado da suite e
// apenas OBSERVA: nao tenta passar pelo desafio nem esconder a automacao.
//
// Saida 0: site acessivel. Saida 1: ambiente bloqueado (mensagem explica o motivo).

const { chromium, request } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://www.automationexercise.com';
const CHALLENGE_TEXT = 'Please wait while your request is being verified';
const AD_HOSTS = /(^|\.)(googlesyndication\.com|doubleclick\.net|adtrafficquality\.google|fundingchoicesmessages\.google\.com)$/;

async function checkApi() {
  const api = await request.newContext({ baseURL: BASE_URL });
  try {
    const response = await api.get('/api/productsList');
    const body = await response.text();
    try {
      JSON.parse(body);
      return null;
    } catch {
      return `API /api/productsList devolveu HTML em vez de JSON (HTTP ${response.status()}): ${body.slice(0, 120).replace(/\s+/g, ' ')}`;
    }
  } finally {
    await api.dispose();
  }
}

async function checkBrowser() {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    await context.route((url) => AD_HOSTS.test(url.hostname), (route) => route.abort());
    const page = await context.newPage();
    const response = await page.goto(BASE_URL + '/');
    // Espera por condicao: ou o site real (logo) ou a pagina de desafio aparece.
    const logo = page.locator('.logo img');
    const challenge = page.getByText(CHALLENGE_TEXT);
    await logo.or(challenge).first().waitFor({ state: 'visible', timeout: 30_000 });
    if (await challenge.isVisible()) {
      return `a home respondeu HTTP ${response && response.status()} com a verificacao anti-bot do site ("${CHALLENGE_TEXT}...")`;
    }
    return null;
  } finally {
    await browser.close();
  }
}

(async () => {
  const problems = [await checkBrowser(), await checkApi()].filter(Boolean);
  if (problems.length === 0) {
    console.log(`Ambiente OK: ${BASE_URL} acessivel para o navegador automatizado e a API responde JSON.`);
    return;
  }
  console.error('AMBIENTE BLOQUEADO — a suite nao foi executada porque o site recusou este runner:');
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error('Isto e um problema de ambiente (protecao anti-bot do site), nao defeito do produto nem dos testes.');
  process.exitCode = 1;
})().catch((error) => {
  console.error('AMBIENTE INACESSIVEL:', error.message);
  process.exitCode = 1;
});
