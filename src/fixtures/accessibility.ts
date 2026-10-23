import AxeBuilder from '@axe-core/playwright';
import type { Page, TestInfo } from '@playwright/test';
import type { Result } from 'axe-core';

type CheckAccessibilityOptions = {
  /** Seletores a incluir no scan (default: página inteira). */
  include?: string[];
  /** Seletores a excluir (ex: widget de terceiro conhecido e já aceito). */
  exclude?: string[];
};

/**
 * Roda o axe-core na página atual e anexa o resultado bruto como evidência no
 * relatório (Allure/HTML) — mesmo espírito do evidenceScreenshot, mas para
 * acessibilidade. Não decide sozinho por severidade: retorna todas as
 * violações, quem escreve o teste decide o limiar (ver formatViolations).
 *
 * Uso típico num teste `[@a11y]`:
 *
 *   const results = await checkAccessibility(page, testInfo);
 *   const blocking = results.violations.filter(
 *     (v) => v.impact === 'critical' || v.impact === 'serious'
 *   );
 *   expect(blocking, formatViolations(blocking)).toEqual([]);
 */
export async function checkAccessibility(
  page: Page,
  testInfo: TestInfo,
  options: CheckAccessibilityOptions = {},
) {
  const builder = new AxeBuilder({ page });
  if (options.include) builder.include(options.include);
  if (options.exclude) builder.exclude(options.exclude);

  const results = await builder.analyze();

  await testInfo.attach('accessibility-scan', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });

  return results;
}

/**
 * Violação do axe-core em JSON bruto é ilegível no output padrão do
 * expect() — isso formata uma lista curta e legível (id, impacto, elementos
 * afetados, link de ajuda) para virar a mensagem do assertion.
 */
export function formatViolations(violations: Result[]): string {
  if (violations.length === 0) return 'Nenhuma violação de acessibilidade encontrada.';

  return violations
    .map((v) => {
      const targets = v.nodes.map((n) => n.target.join(' ')).join(', ');
      return [
        `[${v.impact ?? 'unknown'}] ${v.id} — ${v.help}`,
        `  Elementos: ${targets}`,
        `  Mais info: ${v.helpUrl}`,
      ].join('\n');
    })
    .join('\n\n');
}
