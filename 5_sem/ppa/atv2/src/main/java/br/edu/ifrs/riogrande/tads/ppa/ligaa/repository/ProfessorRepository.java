package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Professor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;

@Repository
public class ProfessorRepository implements IRepository<Professor> {

    private Integer contador = 1;
    private final Map<Integer, Professor> mapa = new HashMap<>();

    @Override
    public Professor save(Professor a) {
        if (a.getId() == null) {
            a.setId(contador++);
            a.setDataHoraCriacao(LocalDateTime.now());
        }
        a.setDataHoraAlteracao(LocalDateTime.now());
        if (a.getFormacao() == null) {
            a.setFormacao("Formação Padrão");
        }
        mapa.put(a.getId(), a);
        return a;
    }


    public boolean idExists(Integer id) {
        return mapa.containsKey(id);
    }

    @Override
    public boolean delete(Professor e) {
        return mapa.remove(e.getId()) != null;
    }

    @Override
    public List<Professor> findAll() {
        return new ArrayList<>(mapa.values());
    }

    public Optional<Professor> findById(Integer id) {
        return Optional.ofNullable(mapa.get(id));
    }
}