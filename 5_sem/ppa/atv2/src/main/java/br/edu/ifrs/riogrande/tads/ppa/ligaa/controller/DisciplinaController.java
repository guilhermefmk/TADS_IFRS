package br.edu.ifrs.riogrande.tads.ppa.ligaa.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Aluno;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Disciplina;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.service.DisciplinaService;

import java.util.List;
import java.util.Optional;

@RestController
public class DisciplinaController {

    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @PostMapping(path = "/api/v1/disciplina", 
                 consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void novaDisciplina(@RequestBody Disciplina disciplina) {
        System.out.println(disciplina);
        disciplinaService.cadastrarDisciplina(disciplina); 
    }

    @GetMapping(path = "/api/v1/disciplinas")
    public ResponseEntity<List<Disciplina>> buscaTodos() {
        return ResponseEntity.ok(disciplinaService.findAll()); 
    }

    @GetMapping(path = "/api/v1/disciplina/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Disciplina> buscaPorId(@PathVariable("id") Integer id) {
        Optional<Disciplina> disciplina = disciplinaService.buscarPorId(id);
        return disciplina.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}