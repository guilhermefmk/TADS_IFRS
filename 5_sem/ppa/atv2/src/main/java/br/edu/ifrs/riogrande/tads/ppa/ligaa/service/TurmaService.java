package br.edu.ifrs.riogrande.tads.ppa.ligaa.service;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Aluno;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Disciplina;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Matricula;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Professor;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Turma;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.DisciplinaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.ProfessorRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.TurmaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final AlunoService alunoService;
    private final ProfessorService professorService;
    private final DisciplinaRepository disciplinaRepository;
    private final ProfessorRepository professorRepository;

    public TurmaService(TurmaRepository turmaRepository, AlunoService alunoService, ProfessorService professorService, DisciplinaRepository disciplinaRepository, ProfessorRepository professorRepository) {
        this.turmaRepository = turmaRepository;
        this.alunoService = alunoService;
        this.professorService = professorService;
        this.disciplinaRepository = disciplinaRepository;
        this.professorRepository = professorRepository;
    }

    public void cadastrarTurma(Turma turma) {
        Optional<Disciplina> disciplinaOpt = disciplinaRepository.findById(turma.getDisciplina().getId());
        if (!disciplinaOpt.isPresent()) {
            throw new IllegalStateException("Disciplina com ID " + turma.getDisciplina().getId() + " não encontrada.");
        }
        turma.setDisciplina(disciplinaOpt.get());

        Optional<Professor> professorOpt = professorRepository.findById(turma.getProfessor().getId());
        if (!professorOpt.isPresent()) {
            throw new IllegalStateException("Professor com ID " + turma.getProfessor().getId() + " não encontrado.");
        }
        turma.setProfessor(professorOpt.get());

        for (Matricula matricula : turma.getMatriculas()) {
            Aluno aluno = alunoService.buscarAluno(matricula.getAluno().getCpf());
            if (aluno == null) {
                throw new IllegalStateException("Aluno com CPF " + matricula.getAluno().getCpf() + " não encontrado.");
            }
            matricula.setAluno(aluno);
        }
        
        turmaRepository.save(turma);
    }

    public List<Turma> findAll() {
        return turmaRepository.findAll();
    }

    public Optional<Turma> buscarPorId(Integer id) {
        return turmaRepository.findById(id);
    }

    public void matriculaAluno(Integer id, String cpfAluno) {
        Optional<Turma> turmaOpt = turmaRepository.findById(id);
        if (!turmaOpt.isPresent()) {
            throw new IllegalStateException("Turma com ID " + id + " não encontrada.");
        }

        Aluno aluno = alunoService.buscarAluno(cpfAluno);
        if (aluno == null) {
            throw new IllegalStateException("Aluno com CPF " + cpfAluno + " não encontrado.");
        }

        Turma turma = turmaOpt.get();
        Matricula matricula = new Matricula();
        matricula.setAluno(aluno);
        turma.getMatriculas().add(matricula);
        turmaRepository.save(turma);
    }

    public void desmatriculaAluno(Integer id, String cpfAluno) {
        Optional<Turma> turmaOpt = turmaRepository.findById(id);
        if (turmaOpt.isPresent()) {
            Turma turma = turmaOpt.get();
            turma.getMatriculas().removeIf(matricula -> {
                Aluno aluno = matricula.getAluno();
                return aluno != null && cpfAluno.equals(aluno.getCpf());
            });
            turmaRepository.save(turma);
        }
    }
}