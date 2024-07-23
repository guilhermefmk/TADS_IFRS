package src.apresentacao;
import java.util.Arrays;

import src.negocio.*;

public class Main {
    public static void main(String[] args) {
        Html html = new HTML("Guilherme");
        html.writeToFile("guilherme.html");
        System.out.println(html.buildHtml());
        System.out.println("=================");

        Html html2 = new HTML("André");
        html2 = new Image(html2, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png");
        html2 = new Link(html2, "https://www.google.com", "Google");
        html2 = new Br(html2);
        html2 = new Button(html2, "Clique aqui");
        html2 = new Br(html2);

        java.util.List<String> items = Arrays.asList("Item 1", "Item 2", "Item 3");
        html2 = new List(html2, items);

        html2.writeToFile("andre.html");
        System.out.println(html2.buildHtml());
    }
}

