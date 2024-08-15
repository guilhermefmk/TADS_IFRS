
import negocio.*;


public class Main {
    public static void main(String[] args) {
        Arma ex1 =  new Pistola();
        System.out.println(ex1.getDescription() + ":" + ex1.cost());
        System.out.println("=================");
        Arma ex2 = new Fuzil();
        ex2 = new Silenciador(ex2);
        ex2 = new MiraOitoVezes(ex2);
        System.out.println(ex2.getDescription() + ":" + ex2.cost());
        System.out.println("===============");

    }
}