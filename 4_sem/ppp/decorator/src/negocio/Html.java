package src.negocio;

import java.io.FileWriter;
import java.io.IOException;

public abstract class Html {
    protected String content;

    public Html(String content) {
        this.content = content;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String buildHtml() {
        return "<html>\n" +
               "  <title> " + getTitle() + " </title>\n" +
               "  <body>\n" +
               getContent() +
               "  </body>\n" +
               "</html>";
    }

    protected abstract String getTitle();

    public void writeToFile(String filename) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write(buildHtml());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
