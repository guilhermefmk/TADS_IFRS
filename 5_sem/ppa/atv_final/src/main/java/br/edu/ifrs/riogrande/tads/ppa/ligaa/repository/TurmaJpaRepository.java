package br.edu.ifrs.riogrande.tads.ppa.ligaa.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Aluno;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Turma;

@Repository
public interface TurmaJpaRepository extends CrudRepository<Turma, UUID> {

    Turma findByCodigo(String codigo);

    @Query("SELECT t FROM Turma t JOIN Matricula m ON m.turma = t WHERE m.aluno = :aluno")
    List<Turma> findAllByAluno(@Param("aluno") Aluno aluno);
}
