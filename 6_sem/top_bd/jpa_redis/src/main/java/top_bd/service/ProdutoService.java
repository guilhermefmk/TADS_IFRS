package top_bd.service;


import java.util.List;

import top_bd.model.Produto;
import top_bd.repository.ProdutoRepository;

public class ProdutoService {
    
    private final ProdutoRepository repository = new ProdutoRepository();
    
    public void cadastrar(Produto produto) {
        repository.salvar(produto);
    }
    
    public void atualizar(Produto produto) {
        repository.atualizar(produto);
    }
    
    public void remover(Long id) {
        repository.remover(id);
    }
    
    public Produto buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
    
    public List<Produto> listarTodos() {
        return repository.listarTodos();
    }
}
