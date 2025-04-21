package top_bd.service;


import java.util.List;

import top_bd.model.Cliente;
import top_bd.model.Pedido;
import top_bd.repository.PedidoRepository;

public class PedidoService {
    
    private final PedidoRepository repository = new PedidoRepository();
    
    public void salvar(Pedido pedido) {
        repository.salvar(pedido);
    }
    
    public void atualizar(Pedido pedido) {
        repository.atualizar(pedido);
    }
    
    public void remover(Long id) {
        repository.remover(id);
    }
    
    public Pedido buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
    
    public List<Pedido> listarTodos() {
        return repository.listarTodos();
    }
    
    public List<Pedido> listarPorCliente(Cliente cliente) {
        return repository.listarPorCliente(cliente);
    }
}
