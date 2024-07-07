package negocio;

public class HTML extends Html {

    private String name;

    public HTML(String name) {
        super("<h1>Olá " + name + "!</h1>");
        this.name = name;
    }

    @Override
    protected String getTitle() {
        return "Bem-vindo, " + this.name;
    }
}
