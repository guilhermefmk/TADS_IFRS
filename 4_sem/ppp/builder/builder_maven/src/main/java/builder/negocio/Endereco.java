package builder.negocio;


public class Endereco {
    private int id;
    private String rua;
    private String bairro;
    private String complemento;
    private String nro;

    public Endereco(int id, String rua, String bairro, String nro, String complemento) {
        this.id = id;
        this.rua = rua;
        this.bairro = bairro;
        this.nro = nro;
        this.complemento = complemento;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getNro() {
        return nro;
    }

    public void setNro(String nro) {
        this.nro = nro;
    }

    @Override
    public String toString() {
        return "Endereco [id=" + id + ", rua=" + rua + ", bairro=" + bairro + ", complemento=" + complemento + ", nro="
                + nro + "]";
    }
    
}