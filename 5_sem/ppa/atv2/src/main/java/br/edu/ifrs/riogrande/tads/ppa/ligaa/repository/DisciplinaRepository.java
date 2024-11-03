package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Disciplina;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class DisciplinaRepository implements IRepository<Disciplina> {

    private final Map<Integer, Disciplina> mapa = new HashMap<>();
    private final AtomicInteger contador = new AtomicInteger(1);

    @Override
    public Disciplina save(Disciplina a) {
        if (a.getId() == null) {
            a.setId(contador.getAndIncrement());
        }
        mapa.put(a.getId(), a);
        return a;
    }

    public boolean disciplinaExists(String nome) {
        return mapa.values().stream()
            .anyMatch(disciplina -> nome.equals(disciplina.getNome()));
    }

    @Override
    public boolean delete(Disciplina e) {
        return mapa.remove(e.getId()) != null;
    }

    @Override
    public List<Disciplina> findAll() {
        return new ArrayList<>(mapa.values());
    }

    public Optional<Disciplina> findById(Integer id) {
        return Optional.ofNullable(mapa.get(id));
    }
}