package negocio;

public abstract class HtmlDecorator extends Html {

    protected Html html;

    public HtmlDecorator(Html html, String content) {
        super(content);
        this.html = html;
    }

    @Override
    public String getContent() {
        return this.html.getContent() + this.content;
    }

    @Override
    protected String getTitle() {
        return this.html.getTitle();
    }
}
