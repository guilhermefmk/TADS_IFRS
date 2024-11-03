package br.edu.ifrs.riogrande.tads.ppa.ligaa.service;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Professor;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public Professor buscarProfessor(Integer id) {
        return professorRepository.findById(id).orElse(null);
    }

    public List<Professor> listarProfessores() {
        return professorRepository.findAll();
    }

    public Professor cadastrarProfessor(Professor professor) {
        if (professorRepository.findById(professor.getId()).isPresent()) {
            throw new IllegalStateException("Professor com ID " + professor.getId() + " já existe.");
        }
        return professorRepository.save(professor);
    }

    public void excluirProfessor(Integer id) {
        Optional<Professor> professorOpt = professorRepository.findById(id);
        if (!professorOpt.isPresent()) {
            throw new IllegalStateException("Professor com ID " + id + " não encontrado.");
        }
        professorRepository.delete(professorOpt.get());
    }
}