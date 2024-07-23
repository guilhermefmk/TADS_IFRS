package src.negocio;

public class Button extends HtmlDecorator {

    public Button(Html html, String texto) {
        super(html, "<button>" + texto + "</button>");
    }
}
