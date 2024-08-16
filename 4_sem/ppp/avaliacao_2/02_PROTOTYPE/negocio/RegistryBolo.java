package negocio;

import java.util.HashMap;
import java.util.Map;

public class RegistryBolo {
    private static RegistryBolo INSTANCE = new RegistryBolo();
    private Map<String, Bolo> vetTipoBolo;

    private RegistryBolo() {
        this.vetTipoBolo = new HashMap<>();

        Bolo chocolateSupremeBase = new Bolo();
        chocolateSupremeBase.setSabor("Chocolate");
        chocolateSupremeBase.setQualidadeIngredientes("Supreme");
        chocolateSupremeBase.setCategoria("chocolate supreme");
        this.vetTipoBolo.put("chocolate supreme", chocolateSupremeBase);

        Bolo chocolatePremiumBase = new Bolo();
        chocolatePremiumBase.setSabor("Chocolate");
        chocolatePremiumBase.setQualidadeIngredientes("Premium");
        chocolatePremiumBase.setCategoria("chocolate premium");
        this.vetTipoBolo.put("chocolate premium", chocolatePremiumBase);

        Bolo chocolateBasicBase = new Bolo();
        chocolateBasicBase.setSabor("Chocolate");
        chocolateBasicBase.setQualidadeIngredientes("Basic");
        chocolateBasicBase.setCategoria("chocolate basic");
        this.vetTipoBolo.put("chocolate basic", chocolateBasicBase);
    }

    public Bolo criaBolo(String tipo) {
        try {
            return this.vetTipoBolo.get(tipo).clone();
        } catch (Exception e) {
            System.out.println("Tipo inexistente!");
        }
        return null;
    }

    public void adicionaModeloBolo(Bolo bolo) {
        this.vetTipoBolo.put(bolo.getCategoria(), bolo);
    }

    public static synchronized RegistryBolo getInstance() {
        return RegistryBolo.INSTANCE;
    }
}
