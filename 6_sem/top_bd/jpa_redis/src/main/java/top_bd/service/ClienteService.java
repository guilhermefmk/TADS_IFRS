package top_bd.service;


import java.util.List;

import top_bd.model.Cliente;
import top_bd.repository.ClienteRepository;

public class ClienteService {
    
    private final ClienteRepository repository = new ClienteRepository();
    
    public void cadastrar(Cliente cliente) {
        repository.salvar(cliente);
    }
    
    public void atualizar(Cliente cliente) {
        repository.atualizar(cliente);
    }
    
    public void remover(Long id) {
        repository.remover(id);
    }
    
    public Cliente buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
    
    public Cliente buscarPorEmail(String email) {
        return repository.buscarPorEmail(email);
    }
    
    public List<Cliente> listarTodos() {
        return repository.listarTodos();
    }
    
    public Cliente autenticar(String email, String senha) {
        Cliente cliente = repository.buscarPorEmail(email);
        if (cliente != null && cliente.getSenha().equals(senha)) {
            return cliente;
        }
        return null;
    }
}
