package br.edu.ifrs.riogrande.tads.ppa.ligaa.service;
// new AlunoService()

import org.springframework.stereotype.Service;

import br.edu.ifrs.riogrande.tads.ppa.ligaa.repository.MatriculaRepository;

@Service // qualificando o objeto
public class MatriculaService {

    // dependência
    private final MatriculaRepository matriculaRepository;

    public MatriculaService(MatriculaRepository matriculaRepository) {
        this.matriculaRepository = matriculaRepository;
    }

    // public void cadastrarAluno(NovoAluno novoAluno) {

    //     if (alunoRepository.cpfExists(novoAluno.getCpf())) {
    //         throw new IllegalStateException("CPF já existe: " + novoAluno.getCpf());
    //     }

    //     // ONDE FICAM AS REGRAS DE DOMÍNIO
    //     Aluno aluno = new Aluno();

    //     aluno.setCpf(novoAluno.getCpf());
    //     aluno.setNome(novoAluno.getNome());
    //     aluno.setLogin(novoAluno.getEnderecoEletronico());
    //     aluno.setEnderecoEletronico(novoAluno.getEnderecoEletronico());

    //     alunoRepository.save(aluno);        
    // }

    // public List<Aluno> findAll() {
    //     return alunoRepository.findAll();
    // }

    // public Aluno buscarAluno(@NonNull String cpf) {
    //     return new Aluno();
    // }
 
}
