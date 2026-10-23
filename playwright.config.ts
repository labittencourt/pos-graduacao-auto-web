import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: '.',
  testIgnore: ['**/_template.spec.ts'],
  // MEM-003: folga medida, nao "timeout enorme". Compra leva 14-17 s; o pico observado com o site
  // compartilhado foi 30,3 s (docs/execucoes.md). 60 s ~ 2x o pico; assertions 10 s.
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    // Tolerância de diff para toHaveScreenshot() (regressão visual, tag @visual).
    // 2% de pixels diferentes ainda passa — absorve antialiasing/fontes sem
    // mascarar uma mudança visual real. Ajuste por projeto se necessário.
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Sem retries: instabilidade é diagnosticada na causa, não mascarada.
  retries: 0,
  // MEM-003: o site e publico e compartilhado — 2 workers locais para nao sobrecarrega-lo; 1 no CI.
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['./src/reporters/console.reporter.ts'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          APP: 'Automation Exercise',
          BASE_URL: process.env.BASE_URL || 'https://www.automationexercise.com',
        },
      },
    ],
  ],
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    baseURL: process.env.BASE_URL || 'https://www.automationexercise.com',
    // Sem retries, 'on-first-retry' nunca grava. Trace em toda falha: linha do tempo de rede para triagem.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
