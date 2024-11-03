package br.edu.ifrs.riogrande.tads.ppa.ligaa.entity;

import java.util.ArrayList;

public class Disciplina {
    // -- campos de controle
    // private int id;
    // private LocalDateTime dataHoraCriacao;
    // private LocalDateTime dataHoraAlteracao;
    // private boolean desativado; // false

    // --
    private String nome;
    private String ementa;
    private int cargaHoraria;
    private ArrayList<String> preRequisitos;
    private int aulasSemanais;

    private Integer id;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmenta() {
        return ementa;
    }
    public void setEmenta(String ementa) {
        this.ementa = ementa;
    }
    public int getCargaHoraria() {
        return cargaHoraria;
    }
    public void setCargaHoraria(int cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }
    public ArrayList<String> getPreRequisitos() {
        return preRequisitos;
    }
    public void setPreRequisitos(ArrayList<String> preRequisitos) {
        this.preRequisitos = preRequisitos;
    }
    public int getAulasSemanais() {
        return aulasSemanais;
    }
    public void setAulasSemanais(int aulasSemanais) {
        this.aulasSemanais = aulasSemanais;
    }

    

}
