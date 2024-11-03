package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.entity.Matricula;

@Repository // infraestrutura
public class MatriculaRepository implements IRepository<Matricula> {
    Integer contador=1;
    private Map<Integer, Matricula> mapa = new HashMap<>();

    @Override
    public Matricula save(Matricula a) { // a id=f1323, desativado=true
        
        // LocalDateTime agora = LocalDateTime.now();
        
        if (a.getId() == null) { // não é persistente
            a.setId(contador++); // atribuir um ID
        }
        
        mapa.put(a.getId(), a);
        
        return a;
    }

    // public boolean cpfExists(String cpf) {
    //     return mapa.values().stream()
    //         // qualquer um coincide o CPF?
    //         .anyMatch(Matricula -> cpf.equals(Matricula.getCpf()));
    // }


    @Override
    public boolean delete(Matricula e) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public List<Matricula> findAll() {
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

}
