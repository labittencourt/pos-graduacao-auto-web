import { randomUUID } from 'node:crypto';

// Campos minerados da US reversa (docs/reverse/cadastro-conta-us-reversa.md, "Formulario de conta").
// Valores de select (title, country, data de nascimento) sao opcoes observadas ao vivo no site em
// 2026-10-22 — suposicao do QA Q02 (docs/analysis/US-01/po-suggestions.md), nao regra do PO.

export type User = {
  signupName: string;
  /** Valor do campo Name do formulario de conta — e o que aparece em "Logged in as" (DIV-02). */
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  birthDay: string;
  /** Valor da option (1-12); o rotulo exibido e o nome do mes. */
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export function buildUser(overrides: Partial<User> = {}): User {
  // Date.now() sozinho colide entre workers paralelos no mesmo milissegundo — o sufixo do UUID evita.
  const uniqueSuffix = `${Date.now()}-${randomUUID().slice(0, 8)}`;
  const name = `QA Automation User ${uniqueSuffix}`;

  return {
    signupName: name,
    name,
    email: `qa-automation-${uniqueSuffix}@example-test.invalid`,
    password: `Qa!${randomUUID().slice(0, 12)}`,
    title: 'Mr',
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1990',
    firstName: 'QA',
    lastName: 'Automation',
    company: 'QA Automation Company',
    address1: 'QA Automation Street 100',
    address2: 'Suite 200',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V 2T6',
    mobileNumber: '+15550000000',
    ...overrides,
  };
}
