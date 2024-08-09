package apresentacao;

import negocio.Configuracoes;

public class Contexto2 {
    public static void exibirConfiguracoes() {
        Configuracoes config = Configuracoes.getInstance();
        System.out.println("Idioma: " + config.getIdioma());
        System.out.println("Tema: " + config.getTema());
        System.out.println("Versão: " + config.getVersao());
        System.out.println("Nome de Usuário: " + config.getNomeUsuario());
        System.out.println("HashCode: " + config.hashCode());
    }
}