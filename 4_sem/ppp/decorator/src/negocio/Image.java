package src.negocio;

public class Image extends HtmlDecorator {

    public Image(Html html, String src) {
        super(html, "<img src=\"" + src + "\" alt=\"Imagem\">");
    }
}