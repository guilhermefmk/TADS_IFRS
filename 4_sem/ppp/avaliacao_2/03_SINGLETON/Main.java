import negocio.Documento;
import negocio.FilaImpressao;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola1", "pdf", 5)));
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola2", "txt", 52)));
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola3", "docx", 25)));
        FilaImpressao.INSTANCE.getInstance().imprimir();
        FilaImpressao.INSTANCE.getInstance().imprimir();
        FilaImpressao.INSTANCE.getInstance().imprimir();


        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola4", "txt", 53)));
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola5", "pdf", 15)));
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola6", "docx", 3)));
        System.out.println(FilaImpressao.INSTANCE.getInstance().enviarParaImpressao(new Documento("cola7", "pdf", 45)));

        System.out.println(FilaImpressao.INSTANCE.getInstance().hashCode());
        System.out.println(FilaImpressao.INSTANCE.getInstance().hashCode());
        

    }
}