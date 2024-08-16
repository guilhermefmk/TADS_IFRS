package negocio;

import java.util.ArrayList;

public enum FilaImpressao {
    INSTANCE;

    private static final int BUFFER = 3;
    private ArrayList<Documento> documentos = new ArrayList<>();

    public boolean enviarParaImpressao(Documento documento) throws InterruptedException{
        if (documentos.size() < BUFFER){
            this.documentos.add(documento);
            return true;
        } 
        return false;
        
    }

    public void imprimir() throws InterruptedException {      
        Documento d = documentos.get(0);
        System.out.println("Imprimindo "+ d.getNome() + "." + d.getExtensao() + " (" + d.getNroPaginas() + " pg.).");
        Thread.sleep(1);
        documentos.remove(0);

    }
    
    
    public FilaImpressao getInstance(){
        return INSTANCE;

    }    
}



