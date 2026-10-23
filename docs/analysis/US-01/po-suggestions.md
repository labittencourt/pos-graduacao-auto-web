# Sugestões para o PO — US-01 Cadastrar nova conta (TC 1)

> ⚠️ Estas são sugestões, não decisões. Cada uma precisa da confirmação
> explícita do PO antes de virar regra — nunca trate como resolvida
> silenciosamente, mesmo que pareça óbvia.

**Analisado em:** 2026-10-22 · **Agente:** /qa-analise-demanda (Modo A, Passo 2.5)

**Status (2026-10-22):** sem retorno ao PO (MEM-001). As sugestões abaixo foram adotadas como **suposições do QA** e não como regras confirmadas pelo PO. Elas serão listadas em `docs/auditoria.md`.

Como a memória do projeto ainda está vazia e esta é a primeira US analisada, não há precedente. As "convenções do projeto" abaixo vêm do prompt do trabalho ([prompt-automation-exercise.md](../../../prompt-automation-exercise.md)) e das premissas transversais das stories ([docs/user-stories/README.md](../../user-stories/README.md#premissas-transversais)).

| ID da pergunta | Sugestão | Base | Fonte |
|-----------------|----------|------|-------|
| Q02 | Valores fictícios gerados por execução. Título, país e estado escolhidos entre as opções que o site oferece (observadas na Fase 3), sem inventar opção. | Convenção do projeto | prompt-automation-exercise.md, "Regras de conduta": "Nada de dados reais: cartão, senha e dados pessoais são fictícios e gerados" |
| Q04 | Incluir `Então a home é exibida`, com oráculo em URL + um elemento estável da home definido na Fase 3. | Convenção de mercado | conhecimento geral de QA/domínio |
| Q05 | Sim, usar os rótulos literais do TC como oráculo. | Convenção do projeto | prompt-automation-exercise.md, "Contexto": "Os casos de teste originais são a referência de rastreabilidade" |
| Q06 | Não incluir caminhos de erro na US-01. Se quiser, propor 1–2 cenários extras, marcados como extras e só implementados com sua aprovação. | Convenção do projeto | prompt-automation-exercise.md, Fase 1 ("sem mudar o escopo dos casos de teste") e Fase 2 ("poucos cenários extras de risco, claramente marcados como extras") |
| Q07 | E-mail com timestamp + UUID curto no domínio de teste da convenção do projeto: `qa-automation-<timestamp>-<uuid>@example-test.invalid`. (Corrigido em 2026-10-22: a sugestão original era `@example.com`, ver OC-07 em `docs/agentes-ocorrencias.md`. O site aceitou `.invalid`.) | Convenção do projeto | docs/user-stories/README.md: "E-mail único por execução (timestamp/UUID)"; `CLAUDE.md`, "Tag `@create`": domínio `@example-test.invalid` |
| Q08 | Exclusão no teardown da fixture, executada mesmo se o teste falhar: por API se a página "API Testing" permitir (a confirmar), senão por UI. | Convenção do projeto | prompt-automation-exercise.md, Fase 4: "excluir conta (teardown garantido mesmo se o teste falhar)"; README das stories, premissas transversais |

Sem sugestão (sem base concreta): **Q01, Q03, Q09, Q10**. São perguntas de comportamento do site e vão ser respondidas por observação na Fase 3.
