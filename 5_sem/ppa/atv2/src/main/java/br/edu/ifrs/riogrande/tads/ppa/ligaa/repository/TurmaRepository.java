package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Turma;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class TurmaRepository implements IRepository<Turma> {
    
    Integer contador=1;
    private final Map<Integer, Turma> mapa = new HashMap<>();

    @Override
    public Turma save(Turma a) {
        if (a.getId() == null) {
            a.setId(contador++);
        }
        mapa.put(a.getId(), a);
        return a;
    }

    public boolean idExists(Integer id) {
        return mapa.containsKey(id);
    }

    @Override
    public boolean delete(Turma e) {
        return mapa.remove(e.getId()) != null;
    }

    @Override
    public List<Turma> findAll() {
        return new ArrayList<>(mapa.values());
    }

    public Optional<Turma> findById(Integer id) {
        return Optional.ofNullable(mapa.get(id));
    }
}