package modelo;

import java.time.LocalDate;
import java.time.Period;

public class Empregado implements Model {
    private String nome;
    private LocalDate dataNascimento;
    private String numeroCarteiraMotorista;

    public Empregado(String nome, String dataNascimento, String numeroCarteiraMotorista) {
        this.nome = nome;
        this.dataNascimento = LocalDate.parse(dataNascimento);
        this.numeroCarteiraMotorista = numeroCarteiraMotorista;
    }

    public String getNome() {
        return nome;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getNumeroCarteiraMotorista() {
        return numeroCarteiraMotorista;
    }

    public int getIdade() {
        return Period.between(dataNascimento, LocalDate.now()).getYears();
    }

    @Override
    public void manobrarCarro(Carro carro) {
        carro.manobrar(this);
    }
}
