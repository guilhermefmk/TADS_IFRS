package builder.negocio;

import java.time.LocalDate;

public class Vendedor extends Pessoa {
    private LocalDate inicio;
    private LocalDate fim;

    public Vendedor(int id, String nome, LocalDate inicio) {
        super(id, nome);
        this.inicio = inicio;
    }

    public LocalDate getInicio() {
        return inicio;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getFim() {
        return fim;
    }

    public void setFim(LocalDate fim) {
        this.fim = fim;
    }

    @Override
    public String toString() {
        return "Vendedor [inicio=" + inicio + ", id=" + id + ", fim=" + fim + ", nome=" + nome + ", hashCode()="
                + hashCode() + "]";
    }

}