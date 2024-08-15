package negocio;

public class Documento {
    private String nome;
    private String extensao;
    private int nroPaginas;


    public Documento(String nome, String extensao, int nroPaginas) {
        this.nome = nome;
        this.extensao = extensao;
        this.nroPaginas = nroPaginas;
    }
    
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getExtensao() {
        return extensao;
    }
    public void setExtensao(String extensao) {
        this.extensao = extensao;
    }
    public int getNroPaginas() {
        return nroPaginas;
    }
    public void setNroPaginas(int nroPaginas) {
        this.nroPaginas = nroPaginas;
    }

    



}
