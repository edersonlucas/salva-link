export enum LoginMessage {
  'Usuário e/ou senha inválida.' = 401,
  'Login efetuado com sucesso!' = 200,
  'Preencha todos os campos corretamente.' = 422,
  'Erro interno no servidor.' = 500,
}

export enum RegisterMessage {
  'Usuário cadastrado com sucesso!' = 200,
  'Email já cadastrado.' = 409,
  'Preencha todos os campos corretamente.' = 422,
  'Erro interno no servidor.' = 500,
}

export enum UpdateMessage {
  'Link atualizado com sucesso!' = 204,
  'Faça alguma modificação para salvar.' = 400,
  'Link e/ou título inválido.' = 422,
  'Erro interno no servidor.' = 500,
}

export enum AddMessage {
  'Link adicionado com sucesso!' = 201,
  'Você já tem este link salvo.' = 409,
  'Link e/ou título inválido.' = 422,
  'Erro interno no servidor.' = 500,
}

export enum PasswordUpdate {
  'Senha atualizada com sucesso!' = 204,
  'A nova senha deve ser diferente da anterior.' = 409,
  'Senha inválida.' = 422,
  'Erro interno no servidor.' = 500,
}
