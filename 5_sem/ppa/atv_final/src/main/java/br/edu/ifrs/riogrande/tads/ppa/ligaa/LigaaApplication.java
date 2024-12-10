package br.edu.ifrs.riogrande.tads.ppa.ligaa;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Aluno;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Disciplina;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Matricula;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Professor;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Turma;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.AlunoJpaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.ProfessorJpaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.DisciplinaJpaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.MatriculaJpaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.TurmaJpaRepository;
import br.edu.ifrs.riogrande.tads.ppa.ligaa.domain.Matricula.Situacao;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class LigaaApplication {

	@Autowired
	private AlunoJpaRepository alunoJpaRepository;
	@Autowired
	private ProfessorJpaRepository professorJpaRepository;
	@Autowired
	private DisciplinaJpaRepository disciplinaJpaRepository;
	@Autowired
	private TurmaJpaRepository turmaJpaRepository;
	@Autowired
	private MatriculaJpaRepository matriculaJpaRepository;

	public static void main(String[] args) {
		SpringApplication.run(LigaaApplication.class, args); 
	}

	@PostConstruct
	void seed() {
		System.out.println("Semeando ... a discórdia!");
		var ppa = new Disciplina();
		ppa.setCodigo("ppa");
		ppa.setNome("Principios e padrões de projeto.");
		ppa.setEmenta("Ensinar principios e padrões de projeto");
		ppa.setCargaHoraria(48);
		ppa.setAulasSemanais(4);
		ppa.setId(UUID.randomUUID());

		disciplinaJpaRepository.save(ppa);

		var can = new Aluno();
        can.setCpf("11122233344");
        can.setDataHoraCriacao(LocalDateTime.now());
        can.setDataHoraAlteracao(LocalDateTime.now());
        can.setDesativado(false);
        can.setEnderecoEletronico("can.robert@gmail.com");
		can.setLogin(can.getEnderecoEletronico());
        can.setNome("Canrobert Junior");
        can.setId(UUID.randomUUID());

		alunoJpaRepository.save(can); // yes you can!

		var marcio = new Professor();
        marcio.setNome("Marcio");
        marcio.setSiape("1810497");
        marcio.setFormacao("Análise de Sistemas");
        marcio.setDesativado(false);
		marcio.setId(UUID.randomUUID());

        professorJpaRepository.save(marcio);

		var can1 = alunoJpaRepository.findByCpf("11122233344");
        var ppa1 = disciplinaJpaRepository.findByCodigo("ppa");
        var marcio1 = professorJpaRepository.findBySiape("1810497");
        
        var ppa20232 = new Turma();
        ppa20232.setCodigo("ppa-2023-2");
        ppa20232.setDisciplina(ppa1);
        ppa20232.setProfessor(marcio1);
        ppa20232.setSemestre("2023-2");
        ppa20232.setVagas(10);
		ppa20232.setId(UUID.randomUUID());

        var ppa20242 = new Turma();
        ppa20242.setCodigo("ppa-2024-2");
        ppa20242.setDisciplina(ppa1);
        ppa20242.setProfessor(marcio1);
        ppa20242.setSemestre("2024-2");
        ppa20242.setVagas(1);
		ppa20242.setId(UUID.randomUUID());

        var mat = new Matricula();
        mat.setAluno(can1);
        mat.setSituacao(Situacao.REPROVADO);
		mat.setTurma(ppa20242);
		mat.setId(UUID.randomUUID());

		var mat1 = new Matricula();
        mat1.setAluno(can1);
        mat1.setSituacao(Situacao.APROVADO);
		mat1.setTurma(ppa20232);
		mat1.setId(UUID.randomUUID());


		
        turmaJpaRepository.save(ppa20232);
        turmaJpaRepository.save(ppa20242);
		
		matriculaJpaRepository.save(mat);
		matriculaJpaRepository.save(mat1);
        System.out.println(ppa20232);
        System.out.println(ppa20242);
	}

	

}
