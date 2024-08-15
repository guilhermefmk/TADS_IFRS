package negocio;

public class Silenciador extends AcessorioDecorator {

    public Silenciador(Arma arma) {
        super(arma);
        this.description = "Silenciador";
        this.cost = 50;
    }
    
}
