package negocio;

public abstract class AcessorioDecorator extends Arma  {

    private Arma arma;

    public AcessorioDecorator(Arma arma){
        this.arma = arma;
    }

    public String getDescription(){
        return this.arma.getDescription()+"\n"+this.description;
    }

    public double cost(){
        return this.arma.cost()+this.cost;
    }
}
