package br.edu.ifrs.riogrande.tads.ppa.ligaa.service;
// new AlunoService()


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Disciplina;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.DisciplinaRepository;

@Service // qualificando o objeto
public class DisciplinaService {

    // dependência
    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public void cadastrarDisciplina(Disciplina novaDisciplina) {

        if (disciplinaRepository.disciplinaExists(novaDisciplina.getNome())) {
            throw new IllegalStateException("Disciplina já existe: " + novaDisciplina.getNome());
        }

        // ONDE FICAM AS REGRAS DE DOMÍNIO
        Disciplina disciplina = new Disciplina();


        disciplina.setNome(novaDisciplina.getNome());
        disciplina.setEmenta(novaDisciplina.getEmenta());
        disciplina.setCargaHoraria(novaDisciplina.getCargaHoraria());
        disciplina.setPreRequisitos(novaDisciplina.getPreRequisitos());
        disciplina.setAulasSemanais(novaDisciplina.getAulasSemanais());

        disciplinaRepository.save(disciplina);        
    }


    public List<Disciplina> findAll() {
        return disciplinaRepository.findAll();
    }

    public Optional<Disciplina> buscarPorId(Integer id) {
        return disciplinaRepository.findById(id);
    }
 
}
