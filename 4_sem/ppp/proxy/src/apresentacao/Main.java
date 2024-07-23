package apresentacao;

import modelo.Carro;
import modelo.EmpregadoProxy;
import modelo.Model;

public class Main {
    public static void main(String[] args) {
        Model emp1Proxy = new EmpregadoProxy("Vinny", "2000-01-01", "123456789");
        Model emp2Proxy = new EmpregadoProxy("Ana", "2006-05-12", "");
        Model emp3Proxy = new EmpregadoProxy("João", "1995-03-22", "");

        Carro carro = new Carro(2020, "Model S", "Tesla", "ABC-1234", "1HGCM82633A123456");

        emp1Proxy.manobrarCarro(carro);
        emp2Proxy.manobrarCarro(carro);
        emp3Proxy.manobrarCarro(carro);
    }
}
