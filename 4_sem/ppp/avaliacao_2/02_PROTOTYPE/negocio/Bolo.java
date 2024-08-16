package negocio;
public class Bolo implements Cloneable {
    private String nome;
    private String sabor;
    private String qualidadeIngredientes;
    private String categoria;

    public Bolo() {
    }

    public Bolo clone() {
        try {
            return (Bolo) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSabor() {
        return sabor;
    }

    public void setSabor(String sabor) {
        this.sabor = sabor;
    }

    public String getQualidadeIngredientes() {
        return qualidadeIngredientes;
    }

    public void setQualidadeIngredientes(String qualidadeingredientes) {
        this.qualidadeIngredientes = qualidadeingredientes;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    @Override
    public String toString() {
        return "Bolo [nome=" + nome + ", sabor=" + sabor + ", qualidadeIngredientes=" + qualidadeIngredientes
                + ", categoria=" + categoria + "]";
    }
    
}
