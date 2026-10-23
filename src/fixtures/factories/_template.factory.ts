// Renomeie para <recurso>.factory.ts e crie um arquivo por recurso/formulario com teste @create.
// Preenchido pelo Agente 2 quando ja havia campo minerado (base de conhecimento, mapa de
// codigo, backlog de endpoints ou US reversa do Agente 3, nessa ordem de prioridade — em
// frontend, a US reversa costuma ser a fonte mais comum, ja lista os campos do formulario
// observado ao vivo) — campo sem fonte minerada nasce como // TODO: confirmar valor valido,
// nunca com um valor chutado.
//
// Convencao de nomenclatura (ver CLAUDE.md, secao "Factories de dado de teste"): prefixo
// `QA Automation <Recurso>` em campos de nome/descricao, dominio `@example-test.invalid` em
// campos de email, e um valor unico (Date.now()) em todo campo que precisa ser unico no
// sistema — sempre, mesmo em campo que a mineracao nao cobriu.

export function buildFormValues(overrides: Partial<Record<string, string>> = {}) {
  const uniqueSuffix = Date.now();

  return {
    // name: `QA Automation <Recurso> ${uniqueSuffix}`,
    // email: `qa-automation-${uniqueSuffix}@example-test.invalid`,
    // <campoMinerado>: '<valor>', // TODO: confirmar valor valido (select/referencia)
    ...overrides,
  };
}
