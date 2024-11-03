package br.edu.ifrs.riogrande.tads.ppa.ligaa.entity;


public class Matricula {
    // -- campos de controle
    // private int id;
    // private LocalDateTime dataHoraCriacao;
    // private LocalDateTime dataHoraAlteracao;
    // private boolean desativado; // false

    // --
    Integer contador = 1;
    private Aluno aluno;
    private int frequencia;
    private boolean estaAprovado;

    private Integer id;

    public Matricula() {
        this.id = contador++;
    }

    public Aluno getAluno() {
        return aluno;
    }
    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }
    public int getFrequencia() {
        return frequencia;
    }
    public void setFrequencia(int frequencia) {
        this.frequencia = frequencia;
    }
    public boolean isEstaAprovado() {
        return estaAprovado;
    }
    public void setEstaAprovado(boolean estaAprovado) {
        this.estaAprovado = estaAprovado;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }


    

}
