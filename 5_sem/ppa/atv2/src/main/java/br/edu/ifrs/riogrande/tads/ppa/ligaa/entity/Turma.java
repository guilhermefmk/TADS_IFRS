package br.edu.ifrs.riogrande.tads.ppa.ligaa.entity;

import java.util.List;

public class Turma {
    // -- campos de controle
    // private int id;
    // private LocalDateTime dataHoraCriacao;
    // private LocalDateTime dataHoraAlteracao;
    // private boolean desativado; // false

    // --
    private Disciplina disciplina;
    private String semestre;
    private String sala;
    private int vagas;
    private String periodo;
    private Professor professor;
    private List<Matricula> matriculas;
    
    public Professor getProfessor() {
        return professor;
    }
    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
    private Integer id;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Disciplina getDisciplina() {
        return disciplina;
    }
    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }
    public String getSemestre() {
        return semestre;
    }
    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }
    public String getSala() {
        return sala;
    }
    public void setSala(String sala) {
        this.sala = sala;
    }
    public int getVagas() {
        return vagas;
    }
    public void setVagas(int vagas) {
        this.vagas = vagas;
    }
    public String getPeriodo() {
        return periodo;
    }
    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }
    public List<Matricula> getMatriculas() {
        return matriculas;
    }
    public void setMatriculas(List<Matricula> matriculas) {
        this.matriculas = matriculas;
    }


}
