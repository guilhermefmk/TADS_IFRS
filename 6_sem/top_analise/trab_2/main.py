import unittest

from pessoa import Pessoa


class TestPessoa(unittest.TestCase):

    def setUp(self):
        """Configure initial test environment with a Pessoa instance"""
        self.pessoa = Pessoa(nome="João Silva", email="joao@example.com", senha="senha123", cpf="123.456.789-10", telefone="(51) 98765-4321")

    def test_init(self):
        """Test if initialization correctly sets attributes"""
        self.assertEqual(self.pessoa.nome, "João Silva")
        self.assertEqual(self.pessoa.email, "joao@example.com")
        self.assertEqual(self.pessoa.senha, "senha123")
        self.assertEqual(self.pessoa.cpf, "123.456.789-10")
        self.assertEqual(self.pessoa.telefone, "(51) 98765-4321")

    def test_get_nome(self):
        """Test get_nome method"""
        self.assertEqual(self.pessoa.get_nome(), "João Silva")

    def test_get_email(self):
        """Test get_email method"""
        self.assertEqual(self.pessoa.get_email(), "joao@example.com")

    def test_get_senha(self):
        """Test get_senha method"""
        self.assertEqual(self.pessoa.get_senha(), "senha123")

    def test_get_cpf(self):
        """Test get_cpf method"""
        self.assertEqual(self.pessoa.get_cpf(), "123.456.789-10")

    def test_get_telefone(self):
        """Test get_telefone method"""
        self.assertEqual(self.pessoa.get_telefone(), "(51) 98765-4321")

    def test_login_success(self):
        """Test login with correct credentials"""
        self.assertTrue(self.pessoa.login("joao@example.com", "senha123"))

    def test_login_wrong_email(self):
        """Test login with incorrect email"""
        self.assertFalse(self.pessoa.login("incorreto@example.com", "senha123"))

    def test_login_wrong_password(self):
        """Test login with incorrect password"""
        self.assertFalse(self.pessoa.login("joao@example.com", "senha_errada"))

    def test_alterar_senha_success(self):
        """Test successful password change"""
        self.pessoa.alterar_senha("senha123", "nova_senha")
        self.assertEqual(self.pessoa.get_senha(), "nova_senha")
        # Test login with new password
        self.assertTrue(self.pessoa.login("joao@example.com", "nova_senha"))

    def test_alterar_senha_failure(self):
        """Test failed password change with incorrect current password"""
        original_senha = self.pessoa.get_senha()
        self.pessoa.alterar_senha("senha_incorreta", "nova_senha")
        self.assertEqual(self.pessoa.get_senha(), original_senha)

    def test_pessoa_instance(self):
        """Test that pessoa is an instance of Pessoa class"""
        self.assertIsInstance(self.pessoa, Pessoa)

    @unittest.skipIf(True, "Demonstration of skipIf decorator")
    def test_skipped_test(self):
        """This test is skipped to demonstrate the skipIf decorator"""
        self.fail("This test should be skipped")

    @unittest.skipUnless(False, "Demonstration of skipUnless decorator")
    def test_skipped_unless(self):
        """This test is skipped to demonstrate the skipUnless decorator"""
        self.fail("This test should also be skipped")


if __name__ == "__main__":
    unittest.main()
