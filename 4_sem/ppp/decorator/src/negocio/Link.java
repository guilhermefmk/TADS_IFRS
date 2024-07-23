package src.negocio;

public class Link extends HtmlDecorator {

    public Link(Html html, String url, String text) {
        super(html, "<a href=\"" + url + "\">" + text + "</a>");
    }
}
