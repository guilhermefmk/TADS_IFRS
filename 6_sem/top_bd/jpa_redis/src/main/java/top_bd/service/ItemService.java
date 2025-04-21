package top_bd.service;


import java.util.List;

import top_bd.model.Item;
import top_bd.model.Pedido;
import top_bd.repository.ItemRepository;

public class ItemService {
    
    private final ItemRepository repository = new ItemRepository();
    
    public void salvar(Item item) {
        repository.salvar(item);
    }
    
    public void atualizar(Item item) {
        repository.atualizar(item);
    }
    
    public void remover(Long id) {
        repository.remover(id);
    }
    
    public Item buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
    
    public List<Item> listarPorPedido(Pedido pedido) {
        return repository.listarPorPedido(pedido);
    }
}
