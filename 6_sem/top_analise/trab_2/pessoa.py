class Pessoa:
    def __init__(self, nome, email, senha, cpf, telefone):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.cpf = cpf
        self.telefone = telefone

    def get_nome(self):
        return self.nome

    def get_email(self):
        return self.email

    def get_senha(self):
        return self.senha

    def get_cpf(self):
        return self.cpf

    def get_telefone(self):
        return self.telefone

    def alterar_senha(self, senha_atual, nova_senha):
        if senha_atual == self.senha:
            self.senha = nova_senha
            print("Senha alterada com sucesso.")
        else:
            print("Senha atual não consefere.")

    def login(self, email, senha):
        if email == self.email and senha == self.senha:
            return True
        else:
            return False
