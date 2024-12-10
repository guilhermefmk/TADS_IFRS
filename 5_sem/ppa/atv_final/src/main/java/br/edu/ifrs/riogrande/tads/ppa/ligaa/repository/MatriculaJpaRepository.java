package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Aluno;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Matricula;

@Repository
public interface MatriculaJpaRepository extends ListCrudRepository<Matricula, UUID> {

    List<Matricula> findAllByAluno(Aluno aluno);
}
