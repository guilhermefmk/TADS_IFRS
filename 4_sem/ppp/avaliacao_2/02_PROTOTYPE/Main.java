import negocio.*;

public class Main {
    public static void main(String[] args) {
        RegistryBolo registry = RegistryBolo.getInstance();

        Bolo bolo1 = registry.criaBolo("chocolate supreme");
        bolo1.setNome("Guilherme");

        Bolo bolo2 = registry.criaBolo("chocolate basic");
        bolo2.setNome("Hannah");

        System.out.println(bolo1);
        System.out.println(bolo2);

        System.out.println(bolo1.hashCode());
        System.out.println(bolo2.hashCode());
    }
}