package src.negocio;

public class List extends HtmlDecorator {

    private java.util.List<String> items;

    public List(Html html, java.util.List<String> items) {
        super(html, "");
        this.items = items;
        this.content = buildList();
    }

    private String buildList() {
        StringBuilder listContent = new StringBuilder();
        listContent.append("<ul>\n");
        for (String item : items) {
            listContent.append("  <li>").append(item).append("</li>\n");
        }
        listContent.append("</ul>\n");
        return listContent.toString();
    }

    @Override
    public String getContent() {
        return this.html.getContent() + this.content;
    }
}
