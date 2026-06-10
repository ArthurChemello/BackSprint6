# 📋 Lume System — Documentação da API

## Índice

- [Introdução](#introdução)
- [URL Base](#url-base)
- [Autenticação](#autenticação)
- [Códigos de Resposta](#códigos-de-resposta)
- [Módulos](#módulos)
  - [Auth](#auth)
  - [Doctors](#doctors)
  - [Patients](#patients)
  - [Guardians](#guardians)
  - [Appointments](#appointments)
  - [Evolutions](#evolutions)
  - [Evolution Blocks](#evolution-blocks)
  - [Doctor Patients](#doctor-patients)
  - [Access Codes](#access-codes)
- [Como Usar no Frontend](#como-usar-no-frontend)
- [Exemplos Práticos](#exemplos-práticos)
- [Doctor Search](#doctor-search)
- [Sistema de Emails](#sistema-de-emails)
- [Senha Inicial do Paciente](#senha-inicial-do-paciente)
- [Upload de Arquivos](#upload-de-arquivos)
- [Tratamento de Erros](#tratamento-de-erros)


---

## Introdução

O **Lume System** é uma API RESTful desenvolvida com **NestJS** e **TypeScript** para gerenciamento de pacientes voltado para profissionais de saúde e terapeutas. Permite cadastro de pacientes, agendamento de consultas, prontuários eletrônicos e controle de acesso entre médicos.

### Tecnologias utilizadas

- **NestJS** — Framework backend
- **Supabase** — Banco de dados PostgreSQL
- **JWT** — Autenticação
- **Google Calendar API** — Sincronização de consultas
- **Resend** — Envio de emails
- **AWS EC2** — Hospedagem

---

## URL Base

```
http://13.216.250.227:3010
```

Todas as rotas devem ser prefixadas com essa URL base.

---

## Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação. Após o login, você receberá um token que deve ser enviado no header de todas as requisições protegidas.

### Como enviar o token

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

### Exemplo com axios

```javascript
const response = await axios.get('/patients', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### Tempo de expiração

O token expira em **7 dias**. Após esse período, o usuário precisa fazer login novamente.

---

## Códigos de Resposta

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 401 | Não autorizado (token ausente ou inválido) |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Módulos

---

## Auth

Rotas de autenticação e recuperação de senha.

---

### POST /auth/doctor/login

Login do médico.

**Não requer autenticação.**

**Body:**
```json
{
  "email": "medico@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "doctor": {
    "id": "uuid",
    "name": "Dr. João Silva",
    "email": "medico@email.com",
    "specialty": "Psicólogo",
    "crm": "12345",
    "phone": "51999999999",
    "profile_picture": "https://url-da-foto.com",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

---

### POST /auth/patient/login

Login do paciente.

**Não requer autenticação.**

**Body:**
```json
{
  "email": "paciente@email.com",
  "password": "senha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "patient": {
    "id": "uuid",
    "name": "Maria Souza",
    "email": "paciente@email.com",
    "first_login": false,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

> **Atenção:** Se `first_login` for `true`, redirecione o paciente para a tela de troca de senha obrigatória.

---

### GET /auth/google?doctorId=UUID

Retorna a URL de autorização do Google Calendar para o médico.

**Requer autenticação.**

**Query Params:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| doctorId | string (UUID) | Sim | ID do médico |

**Resposta de sucesso (200):**
```json
"https://accounts.google.com/o/oauth2/auth?..."
```

---

### GET /auth/google/callback

Callback do Google OAuth. Salva os tokens do médico no banco.

**Chamado automaticamente pelo Google após autorização.**

---

### POST /auth/forgot-password

Solicita redefinição de senha.

**Não requer autenticação.**

**Body:**
```json
{
  "email": "usuario@email.com"
}
```

**Resposta de sucesso (200):**
```json
{
{
  "message": "Código enviado para o email!"
}
```

---

### POST /auth/reset-password

Redefine a senha com o código recebido por email.

**Não requer autenticação.**

**Body:**
```json
{
  "email": "usuario@email.com",
  "code": "A3X9K2",
  "newPassword": "novaSenha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Senha alterada com sucesso!"
}
```

---

## Doctors

Gerenciamento de médicos e profissionais de saúde.

---

### POST /doctors

Cadastra um novo médico.

**Não requer autenticação.**

**Body:**
```json
{
  "name": "Dr. João Silva",
  "email": "medico@email.com",
  "password": "senha123",
  "specialty": "Psicólogo",
  "crm": "12345",
  "phone": "51999999999"
}
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| name | string | Sim |
| email | string | Sim |
| password | string | Sim |
| specialty | string | Não |
| crm | string | Não |
| phone | string | Não |

---

### GET /doctors

Lista todos os médicos.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
[
  {
    "id": "uuid",
    "name": "Dr. João Silva",
    "email": "medico@email.com",
    "specialty": "Psicólogo",
    "crm": "12345",
    "phone": "51999999999",
    "profile_picture": null,
    "created_at": "2026-01-01T00:00:00Z"
  }
]
```

---

### GET /doctors/:id

Busca um médico pelo ID.

**Requer autenticação.**

**Parâmetros:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | UUID | ID do médico |

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "name": "Dr. João Silva",
  "email": "medico@email.com",
  "specialty": "Psicólogo",
  "crm": "12345",
  "phone": "51999999999",
  "profile_picture": null,
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### PATCH /doctors/:id

Atualiza os dados de um médico. Suporta upload de foto de perfil via `multipart/form-data`.

**Requer autenticação.**

**Body (multipart/form-data):**
```
name: "Dr. João Silva"
specialty: "Fisioterapeuta"
phone: "51988888888"
file: [arquivo de imagem]
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| name | string | Não |
| email | string | Não |
| password | string | Não |
| specialty | string | Não |
| crm | string | Não |
| phone | string | Não |
| file | imagem (jpg, png, webp) | Não |

---

### DELETE /doctors/:id

Remove um médico.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Médico removido com sucesso!"
}
```

---

## Patients

Gerenciamento de pacientes.

---

### POST /patients

Cadastra um novo paciente. A senha inicial é gerada automaticamente com base na **data de nascimento + cidade**.

**Requer autenticação.**

**Exemplo de senha gerada:** data `1990-05-15` + cidade `Porto Alegre` → `19900515PortoAlegre`

**Body:**
```json
{
  "name": "Maria Souza",
  "birth_date": "1990-05-15",
  "phone": "51999999999",
  "email": "maria@email.com",
  "cpf": "123.456.789-00",
  "address": "Rua das Flores, 123",
  "city": "Porto Alegre",
  "profession": "Professora",
  "origin": "Indicação",
  "allergies": "Dipirona",
  "chronic_diseases": "Hipertensão",
  "current_medications": "Losartana",
  "blood_type": "A+"
}
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| name | string | Sim |
| birth_date | date (YYYY-MM-DD) | Sim |
| phone | string | Não |
| email | string | Não |
| cpf | string | Não |
| address | string | Não |
| city | string | Não |
| profession | string | Não |
| origin | string | Não |
| allergies | string | Não |
| chronic_diseases | string | Não |
| current_medications | string | Não |
| blood_type | string (A+, A-, B+, B-, AB+, AB-, O+, O-) | Não |

---

### GET /patients

Lista todos os pacientes.

**Requer autenticação.**

---

### GET /patients/search?name=NOME

Busca pacientes pelo nome (busca parcial).

**Requer autenticação.**

**Query Params:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| name | string | Sim | Nome ou parte do nome |

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "phone": "51999999999",
  "first_login": false
}
```

**Exemplo:** `/patients/search?name=Maria`

---

### GET /patients/search/doctor/:doctorId?name=NOME

Busca pacientes vinculados a um médico filtrando pelo nome.

**Requer autenticação.**

**Parâmetros:**
| Parâmetro | Tipo | 
|-----------|------|
| doctorId | UUID | 


**Parâmetros:**
| Parâmetro | Tipo | 
|-----------|------|
| name | string | 

**Exemplo:** `GET /patients/search/doctor/uuid-do-medico?name=maria`  
**Resposta de sucesso (200):**
```json
  {
    "id": "uuid",
    "name": "Maria Souza",
    "email": "maria@email.com",
    "phone": "51999999999"
  }
```
---

### GET /patients/:id

Busca um paciente pelo ID.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "birth_date": "1990-05-15",
  "phone": "51999999999",
  "email": "maria@email.com",
  "cpf": "12345678900",
  "city": "Porto Alegre",
  "profession": "Professora",
  "blood_type": "A+",
  "first_login": false
}
```

---

### PATCH /patients/:id

Atualiza os dados de um paciente. Ao atualizar a senha, `first_login` é automaticamente definido como `false`.

**Requer autenticação.**

**Body:**
```json
{
  "phone": "51988888888",
  "password": "novaSenha123"
}
```

---

### DELETE /patients/:id

Remove um paciente.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Paciente removido com sucesso"
}
```

---

## Guardians

Gerenciamento de responsáveis dos pacientes.

---

### POST /guardians

Cadastra um responsável para um paciente.

**Requer autenticação.**

**Body:**
```json
{
  "patient_id": "uuid-do-paciente",
  "name": "Carlos Souza",
  "phone": "51999999999",
  "email": "carlos@email.com",
  "relationship": "pai"
}
```

| Campo | Tipo | Obrigatório | Valores aceitos |
|-------|------|-------------|-----------------|
| patient_id | UUID | Sim | — |
| name | string | Sim | — |
| phone | string | Não | — |
| email | string | Não | — |
| relationship | string | Não | pai, mãe, cônjuge, filho, cuidador, outro |

---

### GET /guardians/patient/:patientId

Lista todos os responsáveis de um paciente.

**Requer autenticação.**

---

### GET /guardians/:id

Busca um responsável pelo ID.

**Requer autenticação.**

---

### PATCH /guardians/:id

Atualiza os dados de um responsável.

**Requer autenticação.**

---

### DELETE /guardians/:id

Remove um responsável.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Responsável removido com sucesso!"
}
```

---

## Appointments

Gerenciamento de consultas. Ao criar uma consulta, um evento é automaticamente criado no Google Calendar do médico e o paciente recebe um convite por email com lembretes automáticos.

---

### POST /appointments

Cria uma consulta.

**Requer autenticação.**

**Body:**
```json
{
  "patient_id": "uuid-do-paciente",
  "doctor_id": "uuid-do-medico",
  "title": "Consulta de retorno",
  "date": "2026-06-15",
  "start_time": "09:00",
  "end_time": "10:00"
}
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| patient_id | UUID | Sim |
| doctor_id | UUID | Sim |
| title | string | Sim |
| date | date (YYYY-MM-DD) | Sim |
| start_time | time (HH:MM) | Sim |
| end_time | time (HH:MM) | Sim |

---

### GET /appointments

Lista todas as consultas.

**Requer autenticação.**

---

### GET /appointments/doctor/:doctorId

Lista todas as consultas de um médico.

**Requer autenticação.**

---

### GET /appointments/patient/:patientId

Lista todas as consultas de um paciente. Retorna os dados do médico para exibição do mini painel.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
[
  {
    "id": "uuid",
    "title": "Consulta de retorno",
    "date": "2026-06-15",
    "start_time": "09:00:00",
    "end_time": "10:00:00",
    "google_event_id": "google_event_id",
    "doctors": {
      "name": "Dr. João Silva",
      "phone": "51999999999",
      "specialty": "Psicólogo",
      "profile_picture": "https://url-da-foto.com"
    }
  }
]
```

---

### GET /appointments/:id

Busca uma consulta pelo ID.

**Requer autenticação.**

---

### PATCH /appointments/:id

Atualiza uma consulta.

**Requer autenticação.**

**Body:**
```json
{
  "title": "Consulta alterada",
  "date": "2026-06-20",
  "start_time": "10:00",
  "end_time": "11:00"
}
```

---

### DELETE /appointments/:id

Remove uma consulta e deleta o evento do Google Calendar automaticamente.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Consulta removida com sucesso!"
}
```

---

## Evolutions

Gerenciamento de prontuários e evoluções dos pacientes.

---

### POST /evolutions

Cria um prontuário.

**Requer autenticação.**

**Body:**
```json
{
  "patient_id": "uuid-do-paciente",
  "doctor_id": "uuid-do-medico",
  "consultation_type": "primeira_consulta",
  "date": "2026-06-15",
  "start_time": "09:00",
  "end_time": "10:00"
}
```

| Campo | Tipo | Obrigatório | Valores aceitos |
|-------|------|-------------|-----------------|
| patient_id | UUID | Sim | — |
| doctor_id | UUID | Sim | — |
| consultation_type | string | Sim | primeira_consulta, retorno, emergencia |
| date | date (YYYY-MM-DD) | Sim | — |
| start_time | time (HH:MM) | Sim | — |
| end_time | time (HH:MM) | Sim | — |

---

### GET /evolutions/patient/:patientId

Lista todas as evoluções de um paciente com os blocos de conteúdo incluídos. Ordenado do mais recente para o mais antigo.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "consultation_type": "retorno",
  "date": "2026-06-15",
    "blocks": []
}
```

---

### GET /evolutions/doctor/:doctorId

Lista todas as evoluções registradas por um médico.

**Requer autenticação.**

---

### GET /evolutions/:id

Busca uma evolução pelo ID com todos os blocos de conteúdo.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "patient_id": "uuid",
  "doctor_id": "uuid",
  "consultation_type": "retorno",
  "date": "2026-06-15",
  "blocks": []

}
```
---

### PATCH /evolutions/:id

Atualiza os dados de uma evolução.

**Requer autenticação.**

---

### DELETE /evolutions/:id

Remove uma evolução e todos os seus blocos.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Evolução removida com sucesso!"
}
```

---

## Evolution Blocks

Blocos de conteúdo de um prontuário. Cada bloco pode ser texto ou imagem e pertence a uma seção específica.

---

### POST /evolution-blocks

Cria um bloco de conteúdo. Para blocos de imagem, envie via `multipart/form-data`.

**Requer autenticação.**

**Body (texto — application/json):**
```json
{
  "evolution_id": "uuid-da-evolucao",
  "type": "texto",
  "section": "clinico",
  "content": "Paciente relata dores de cabeça frequentes há 2 semanas.",
  "order": 1
}
```

**Body (imagem — multipart/form-data):**
```
evolution_id: uuid-da-evolucao
section: avaliacao
order: 2
file: [arquivo de imagem]
```

| Campo | Tipo | Obrigatório | Valores aceitos |
|-------|------|-------------|-----------------|
| evolution_id | UUID | Sim | — |
| type | string | Sim | texto, imagem |
| section | string | Sim | identificacao, clinico, avaliacao, conduta, evolucao |
| content | string | Não | texto livre ou URL da imagem |
| order | number | Não | ordem de exibição |
| file | imagem | Não | somente para type = imagem |

---

### GET /evolution-blocks/evolution/:evolutionId

Lista todos os blocos de uma evolução ordenados pelo campo `order`.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "section": "clinico",
  "type": "texto",
  "content": "Paciente apresenta melhora.",
  "order": 1
}
```
---

### GET /evolution-blocks/:id

Busca um bloco pelo ID.

**Requer autenticação.**

---

### PATCH /evolution-blocks/:id

Atualiza um bloco de conteúdo. Para atualizar a imagem, envie via `multipart/form-data`.

**Requer autenticação.**

---

### DELETE /evolution-blocks/:id

Remove um bloco de conteúdo.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Bloco removido com sucesso!"
}
```

---

## Doctor Patients

Gerenciamento de vínculos entre médicos e pacientes.

---

### POST /doctor-patients

Cria um vínculo entre médico e paciente. O status inicial é sempre `pending` e o tipo de acesso padrão é `emergency`.

**Requer autenticação.**

**Body:**
```json
{
  "doctor_id": "uuid-do-medico",
  "patient_id": "uuid-do-paciente",
  "access_type": "emergency"
}
```

| Campo | Tipo | Obrigatório | Valores aceitos |
|-------|------|-------------|-----------------|
| doctor_id | UUID | Sim | — |
| patient_id | UUID | Sim | — |
| access_type | string | Não | emergency, full |

---

### GET /doctor-patients/doctor/:doctorId

Lista todos os pacientes vinculados a um médico.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
  {
    "id": "uuid",
    "patient_id": "uuid",
    "status": "active",
    "access_type": "full"
  }
```

---

### GET /doctor-patients/patient/:patientId

Lista todos os médicos vinculados a um paciente.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
  {
    "id": "uuid",
    "doctor_id": "uuid",
    "status": "active",
    "access_type": "full"
  }
```


---

### PATCH /doctor-patients/:id

Atualiza o status ou tipo de acesso de um vínculo.

**Requer autenticação.**

**Body:**
```json
{
  "status": "active",
  "access_type": "full"
}
```

| Campo | Tipo | Valores aceitos |
|-------|------|-----------------|
| status | string | pending, active, rejected |
| access_type | string | emergency, full |

---

### DELETE /doctor-patients/:id

Remove um vínculo entre médico e paciente.

**Requer autenticação.**

**Resposta de sucesso (200):**
```json
{
  "message": "Vínculo removido com sucesso!"
}
```

---

## Access Codes

Sistema de pedido e validação de acesso completo ao prontuário de um paciente.

---

### POST /access-codes/request

Solicita acesso completo ao prontuário de um paciente. Gera um código de 6 caracteres e envia por email para o paciente ou responsável.

**Requer autenticação.**

**Body:**
```json
{
  "doctor_id": "uuid-do-medico",
  "patient_id": "uuid-do-paciente"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Código enviado com sucesso!"
}
```

> O código expira em **24 horas** e só pode ser usado uma vez.

---

### POST /access-codes/validate

Valida o código recebido e libera o acesso completo ao prontuário. Cria ou atualiza o vínculo na tabela `doctor_patients` com `access_type: full` e `status: active`.

**Requer autenticação.**

**Body:**
```json
{
  "doctor_id": "uuid-do-medico",
  "code": "A3X9K2"
}
```

**Resposta de sucesso (200):**
```json
{
  "message": "Acesso liberado com sucesso!",
  "data": {
    "id": "uuid",
    "doctor_id": "uuid",
    "patient_id": "uuid",
    "access_type": "full",
    "status": "active"
  }
}
```

---

## Como Usar no Frontend

### Configuração com Axios

```javascript
// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://56.124.126.184:3010',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Configuração com Fetch

```javascript
const BASE_URL = 'http://56.124.126.184:3010';

async function request(method, path, body = null) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return response.json();
}
```

---

## Exemplos Práticos

### 1. Login do médico e salvar token

```javascript
async function loginDoctor(email, password) {
  const response = await api.post('/auth/doctor/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data.doctor;
}
```

### 2. Criar paciente

```javascript
async function createPatient(data) {
  const response = await api.post('/patients', {
    name: 'Maria Souza',
    birth_date: '1990-05-15',
    email: 'maria@email.com',
    city: 'Porto Alegre',
  });
  return response.data;
}
```

### 3. Buscar consultas do paciente

```javascript
async function getPatientAppointments(patientId) {
  const response = await api.get(`/appointments/patient/${patientId}`);
  return response.data;
}
```

### 4. Criar prontuário com blocos

```javascript
// Cria a evolução
const evolution = await api.post('/evolutions', {
  patient_id: 'uuid-do-paciente',
  doctor_id: 'uuid-do-medico',
  consultation_type: 'retorno',
  date: '2026-06-15',
  start_time: '09:00',
  end_time: '10:00',
});

// Adiciona bloco de texto
await api.post('/evolution-blocks', {
  evolution_id: evolution.data.id,
  type: 'texto',
  section: 'clinico',
  content: 'Paciente relata melhora significativa.',
  order: 1,
});

// Adiciona bloco de imagem
const formData = new FormData();
formData.append('evolution_id', evolution.data.id);
formData.append('section', 'avaliacao');
formData.append('order', '2');
formData.append('file', imagemFile);

await api.post('/evolution-blocks', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### 5. Pedir acesso ao prontuário de um paciente

```javascript
// Médico B solicita acesso
await api.post('/access-codes/request', {
  doctor_id: 'uuid-do-medico-b',
  patient_id: 'uuid-do-paciente',
});

// Médico B recebe o código do paciente e valida
await api.post('/access-codes/validate', {
  doctor_id: 'uuid-do-medico-b',
  code: 'A3X9K2',
});
```

### 6. Upload de foto de perfil do médico

```javascript
const formData = new FormData();
formData.append('file', fotoFile);
formData.append('name', 'Dr. João Silva');

await api.patch(`/doctors/${doctorId}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

## Observações Importantes

- Senhas são armazenadas com **hash bcrypt** e nunca retornadas nas respostas
- O campo `password` nunca aparece nas respostas da API
- Pacientes com `first_login: true` devem ser redirecionados para trocar a senha
- O Google Calendar só funciona se o médico tiver autorizado o acesso via `/auth/google`
- Códigos de acesso expiram em **24 horas** e só podem ser usados **uma vez**
- Códigos de recuperação de senha expiram em **1 hora**

## Doctor Search

### 1. Busca de médicos por nome.

### GET /doctors/search?name=NOME

`Realiza busca parcial pelo nome do médico.`
`Requer autenticação.`

**Query Params:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| name | string  | Sim | Nome ou parte do nome |

Exemplo:
GET /doctors/search?name=joao

**Resposta de sucesso (200):**
```json
{
  "id": "uuid",
  "name": "Dr. João Silva",
  "email": "medico@email.com",
  "specialty": "Psicólogo",
  "crm": "12345",
  "phone": "51999999999",
  "profile_picture": null
}
```

---

## Sistema de Emails

A API utiliza o serviço Resend para envio automático de emails.
### Criação de consulta

**Ao criar uma consulta:**
-	Um evento é criado no Google Calendar do médico.
- O paciente recebe um email contendo:
  -	Data da consulta
  - Horário da consulta
  - Informações do profissional

### Recuperação de senha

**Ao utilizar:**
POST /auth/forgot-password
  - usuário recebe um código de recuperação de 6 caracteres.
`Liberação de acesso ao prontuário`

**Ao utilizar:**
POST /access-codes/request
  - paciente recebe um código de autorização para liberar acesso ao prontuário para outro profissional.

**O código:**
-	possui 6 caracteres;
-	expira em 24 horas;
-	pode ser utilizado apenas uma vez.

---

## Senha Inicial do Paciente

**Quando um paciente é criado, uma senha inicial é gerada automaticamente utilizando:**
-	Data de nascimento (sem separadores)
-	Cidade (sem espaços)

Exemplo:
`Data de nascimento:`
1990-05-15
`Cidade:`
Porto Alegre

**Senha gerada:**
`19900515PortoAlegre`

Após o primeiro login o paciente deve alterar sua senha.

**Enquanto o campo:**
first_login = true
o frontend deve redirecionar automaticamente para a tela de alteração de senha.

---

## Upload de Arquivos

**Tipos aceitos:**
-	JPG
-	JPEG
-	PNG
-	WEBP

**Rotas que aceitam upload:**
-	`PATCH /doctors/:id`
-	`POST /evolution-blocks`
-	`PATCH /evolution-blocks/:id`

**Formato:**
multipart/form-data

---

## Tratamento de Erros

**400 - Dados inválidos**
```json
{
  "statusCode": 400,
  "message": "Dados inválidos",
  "error": "Bad Request"
}
```

**401 - Não autorizado**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**404 - Recurso não encontrado**
```json
{
  "statusCode": 404,
  "message": "Paciente não encontrado"
}
```

**500 - Erro interno**
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
---