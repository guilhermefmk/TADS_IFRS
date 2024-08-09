package negocio;

public class Configuracoes {
    private static final Configuracoes INSTANCE = new Configuracoes();

    private String idioma;
    private String tema;
    private String versao;
    private String nomeUsuario;

    private Configuracoes() {
    }

    public static synchronized Configuracoes getInstance() {
        return INSTANCE;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public String getVersao() {
        return versao;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }
}
