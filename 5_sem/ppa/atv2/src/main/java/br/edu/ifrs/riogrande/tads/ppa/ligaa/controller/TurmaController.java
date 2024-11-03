package br.edu.ifrs.riogrande.tads.ppa.ligaa.controller;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Turma;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.service.TurmaService;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.service.NovaMatricula;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/turmas")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void novaTurma(@RequestBody Turma turma) {
        turmaService.cadastrarTurma(turma);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Turma>> buscaTodas() {
        List<Turma> turmas = turmaService.findAll();
        return ResponseEntity.ok(turmas);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Turma> buscaPorId(@PathVariable("id") Integer id) {
        Optional<Turma> turma = turmaService.buscarPorId(id);
        return turma.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping(path = "/{id}/alunos", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void matriculaAluno(@PathVariable("id") Integer id, @RequestBody NovaMatricula novaMatricula) {
        System.out.println("Matriculando aluno " + novaMatricula.getCpfAluno() + " na turma " + id);
        turmaService.matriculaAluno(id, novaMatricula.getCpfAluno());
    }

    @DeleteMapping(path = "/{id}/alunos/{cpf}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void desmatriculaAluno(@PathVariable("id") Integer id, @PathVariable("cpf") String cpfAluno) {
        System.out.println("Desmatriculando aluno " + cpfAluno + " da turma " + id);
        turmaService.desmatriculaAluno(id, cpfAluno);
    }
}