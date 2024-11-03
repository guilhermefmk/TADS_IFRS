package br.edu.ifrs.riogrande.tads.ppa.ligaa.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

// Data Transfer Object
// JavaBean

public class NovaMatricula {
    // CoC: Convention over Configuration
    // Convenção antes de Configuração

    private String cpfAluno;
    private int turmaId;


    public int getTurmaId() {
        return turmaId;
    }
    public void setTurmaId(int turmaId) {
        this.turmaId = turmaId;
    }
    public String getCpfAluno() {
        return cpfAluno;
    }
    public void setCpfAluno(String cpfAluno) {
        this.cpfAluno = cpfAluno;
    }




    
}
