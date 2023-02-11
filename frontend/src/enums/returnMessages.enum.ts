export enum LoginMessage {
  "Usuário e/ou senha inválida." = 401,
  "Login efetuado com sucesso!" = 200,
  "Preencha todos os campos corretamente." = 422,
}

export enum RegisterMessage {
  "Usuário cadastrado com sucesso!" = 200,
  "Email já cadastrado." = 409,
  "Preencha todos os campos corretamente." = 422,
}

export enum UpdateMessage {
  "Link atualizado com sucesso!" = 204,
  "Faça alguma modificação para salvar." = 400,
  "Link e/ou título inválido." = 422,
}
