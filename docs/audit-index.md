# Índice de Auditoria — Pendências de Qualidade de Teste

Fonte única de verdade de pendências de auditoria (Agente 9) ainda não resolvidas. Os
relatórios em `docs/runs/<timestamp>-audit-report.md` são o histórico de cada rodada;
este arquivo é sempre "o que está pendente hoje". Nunca bloqueia execução — é um
lembrete persistente para não deixar a pendência esquecida entre uma auditoria e outra.

| ID | Arquivo | Teste | Regra violada | Severidade | Desde | Última vez visto | Status |
|----|---------|-------|----------------|------------|-------|-------------------|--------|
| AUD-002 | tests/conta.spec.ts | TC01 Register User; TC02 Login User with correct email and password | Assertion genérica demais: "ACCOUNT DELETED!" era a única prova da exclusão, mas a página mostra essa mensagem mesmo sem excluir nada (BUG-004) | WARNING | 2026-10-22 | 2026-10-22 | ✅ Resolvido (2026-10-22) — exclusão confirmada pela API 14 |
| AUD-001 | tests/conta.spec.ts | TC01 Register User | Acessibilidade não coberta (`checkAccessibility()` sem uso) — depende da decisão sobre o extra CT-01-09 | WARNING | 2026-10-22 | 2026-10-22 | ✅ Resolvido (2026-10-22) — `checkAccessibility()` usado no extra CT-01-09 |
