# 📱 Acompanhar Chamada

Aplicação web para **retirada e acompanhamento de senhas de atendimento**.

O usuário escolhe o tipo de atendimento, retira sua senha e acompanha o status da fila diretamente pelo celular.

## ✨ Funcionalidades

- 🎫 Retirada de senha
- 📢 Acompanhamento da senha
- 📋 Histórico de chamadas
- 💾 Persistência da senha no navegador
- 📱 Interface focada em dispositivos móveis
- 🔄 Atualização automática do status

## 🛠️ Tecnologias

- React
- Vite
- Axios
- Tailwind CSS

## 🔄 Fluxo

```text
Escolher atendimento
        ↓
   Retirar senha
        ↓
   Gerar senha
        ↓
 Acompanhar chamada
        ↓
   Senha chamada
```

## 🏗️ Estrutura

```text
src/
├── components/   # Componentes reutilizáveis
├── pages/        # Telas da aplicação
├── services/     # Comunicação com a API
├── context/      # Gerenciamento de estado
├── assets/       # Imagens e recursos
├── App.jsx
└── main.jsx
```

## ⚙️ Como executar

Clone o projeto:

```bash
git clone https://github.com/Felipe-conc/acompanhar_chamada.git
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=/api
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

> **Observação:** o projeto utiliza uma API externa para gerenciamento das senhas. O backend não está incluído neste repositório.

## 👨‍💻 Autor

**Felipe Conceição**

[GitHub](https://github.com/Felipe-conc)
