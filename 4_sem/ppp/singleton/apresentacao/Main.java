package apresentacao;

import negocio.Configuracoes;

public class Main {
    public static void main(String[] args) {
        Configuracoes config = Configuracoes.getInstance();
        config.setIdioma("Português");
        config.setTema("Escuro");
        config.setVersao("1.0.0");
        config.setNomeUsuario("Usuario123");

        System.out.println("Exibindo configurações em Contexto 1:");
        Contexto1.exibirConfiguracoes();

        System.out.println("\nExibindo configurações em Contexto 2:");
        Contexto2.exibirConfiguracoes();

        System.out.println("\nExibindo configurações em Contexto 3:");
        Contexto3.exibirConfiguracoes();
    }
}