package negocio;

public class MiraOitoVezes extends AcessorioDecorator {

    public MiraOitoVezes(Arma arma) {
        super(arma);
        this.description = "Mira 8X";
        this.cost = 100;
    }
    
}
