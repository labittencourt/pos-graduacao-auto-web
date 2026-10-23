import { APIRequestContext } from '@playwright/test';
import type { User } from '../fixtures/factories/user.factory';

// API publica do site (pagina "API Testing", APIs 11 e 12) — apoio de setup/teardown, nao alvo de teste.
// Gotcha observado em 2026-10-22 (docs/reverse/cadastro-conta-endpoints.md): o HTTP e sempre 200;
// o status real vem em `responseCode` no corpo JSON.

type ApiResult = { responseCode: number; message: string };

async function parse(response: { text(): Promise<string> }): Promise<ApiResult> {
  const body = await response.text();
  try {
    return JSON.parse(body) as ApiResult;
  } catch {
    throw new Error(`Resposta nao-JSON da API de contas: ${body.slice(0, 200)}`);
  }
}

export async function createAccountViaApi(request: APIRequestContext, user: User): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });
  const result = await parse(response);
  if (result.responseCode !== 201) {
    throw new Error(`createAccount falhou para ${user.email}: ${JSON.stringify(result)}`);
  }
}

export type AccountDetail = { id: number; name: string; email: string };

/** Consulta a conta pelo e-mail (API 14). `null` se o site responde 404. */
export async function getAccountByEmail(request: APIRequestContext, email: string): Promise<AccountDetail | null> {
  const response = await request.get('/api/getUserDetailByEmail', { params: { email } });
  const result = (await parse(response)) as ApiResult & { user?: AccountDetail };
  if (result.responseCode === 200 && result.user) return result.user;
  if (result.responseCode === 404) return null;
  throw new Error(`getUserDetailByEmail falhou para ${email}: ${JSON.stringify(result)}`);
}

export async function accountExists(request: APIRequestContext, email: string): Promise<boolean> {
  return (await getAccountByEmail(request, email)) !== null;
}

/**
 * Exclui a conta. Retorna `true` se excluiu agora e `false` se a conta ja nao existia
 * (ex.: o proprio teste a excluiu pela UI). Qualquer outro resultado lanca erro — falha de
 * limpeza nunca e silenciada.
 */
export async function deleteAccountViaApi(request: APIRequestContext, user: User): Promise<boolean> {
  const response = await request.delete('/api/deleteAccount', {
    form: { email: user.email, password: user.password },
  });
  const result = await parse(response);
  if (result.responseCode === 200) return true;
  if (result.responseCode === 404) return false;
  throw new Error(`deleteAccount falhou para ${user.email}: ${JSON.stringify(result)}`);
}
