package top_bd.service;


import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import redis.clients.jedis.Jedis;
import top_bd.config.RedisConfig;
import top_bd.model.Cliente;
import top_bd.model.Item;
import top_bd.model.Pedido;
import top_bd.model.Produto;

public class CarrinhoService {
    
    private final ProdutoService produtoService = new ProdutoService();
    private final Gson gson = new Gson();
    
    private static final String CARRINHO_PREFIX = "carrinho:";
    
    public void criarCarrinho(Cliente cliente) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            if (!jedis.exists(carrinhoKey)) {
                jedis.hset(carrinhoKey, "clienteId", cliente.getId().toString());
                jedis.hset(carrinhoKey, "itens", "{}");
            }
        }
    }
    
    public void adicionarItem(Cliente cliente, Long produtoId, Integer quantidade) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            
            if (!jedis.exists(carrinhoKey)) {
                criarCarrinho(cliente);
            }
            
            Produto produto = produtoService.buscarPorId(produtoId);
            if (produto == null) {
                throw new RuntimeException("Produto não encontrado");
            }
            
            Map<String, Integer> itens = getItensFromRedis(jedis, carrinhoKey);
            
            String produtoKey = produtoId.toString();
            if (itens.containsKey(produtoKey)) {
                itens.put(produtoKey, itens.get(produtoKey) + quantidade);
            } else {
                itens.put(produtoKey, quantidade);
            }
            
            saveItensToRedis(jedis, carrinhoKey, itens);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao adicionar item ao carrinho", e);
        }
    }
    
    public void atualizarQuantidade(Cliente cliente, Long produtoId, Integer quantidade) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            
            if (!jedis.exists(carrinhoKey)) {
                throw new RuntimeException("Carrinho não encontrado");
            }
            
            Map<String, Integer> itens = getItensFromRedis(jedis, carrinhoKey);
            
            String produtoKey = produtoId.toString();
            if (itens.containsKey(produtoKey)) {
                if (quantidade <= 0) {
                    itens.remove(produtoKey);
                } else {
                    itens.put(produtoKey, quantidade);
                }
            } else {
                throw new RuntimeException("Item não encontrado no carrinho");
            }
            
            saveItensToRedis(jedis, carrinhoKey, itens);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar quantidade do item", e);
        }
    }
    
    public void removerItem(Cliente cliente, Long produtoId) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            
            if (!jedis.exists(carrinhoKey)) {
                throw new RuntimeException("Carrinho não encontrado");
            }
            
            Map<String, Integer> itens = getItensFromRedis(jedis, carrinhoKey);
            
            String produtoKey = produtoId.toString();
            if (itens.containsKey(produtoKey)) {
                itens.remove(produtoKey);
                
                saveItensToRedis(jedis, carrinhoKey, itens);
            } else {
                throw new RuntimeException("Item não encontrado no carrinho");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao remover item do carrinho", e);
        }
    }
    
    public List<Item> getItensCarrinho(Cliente cliente) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            
            if (!jedis.exists(carrinhoKey)) {
                return new ArrayList<>();
            }
            
            Map<String, Integer> itensMap = getItensFromRedis(jedis, carrinhoKey);
            List<Item> itens = new ArrayList<>();
            
            for (Map.Entry<String, Integer> entry : itensMap.entrySet()) {
                Long produtoId = Long.parseLong(entry.getKey());
                Integer quantidade = entry.getValue();
                
                Produto produto = produtoService.buscarPorId(produtoId);
                if (produto != null) {
                    Item item = new Item(produto, quantidade);
                    itens.add(item);
                }
            }
            
            return itens;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao obter itens do carrinho", e);
        }
    }
    
    public BigDecimal calcularTotal(Cliente cliente) {
        List<Item> itens = getItensCarrinho(cliente);
        BigDecimal total = BigDecimal.ZERO;
        
        for (Item item : itens) {
            total = total.add(item.getValor());
        }
        
        return total;
    }
    
    public Pedido finalizarCarrinho(Cliente cliente, PedidoService pedidoService) {
        List<Item> itens = getItensCarrinho(cliente);
        
        if (itens.isEmpty()) {
            throw new RuntimeException("Carrinho vazio");
        }
        
        Pedido pedido = new Pedido(cliente);
        
        for (Item item : itens) {
            pedido.adicionarItem(item);
        }
        
        pedidoService.salvar(pedido);
        
        limparCarrinho(cliente);
        
        return pedido;
    }
    
    public void limparCarrinho(Cliente cliente) {
        try (Jedis jedis = RedisConfig.getConnection()) {
            String carrinhoKey = CARRINHO_PREFIX + cliente.getId();
            jedis.del(carrinhoKey);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao limpar carrinho", e);
        }
    }
    
    private Map<String, Integer> getItensFromRedis(Jedis jedis, String carrinhoKey) {
        try {
            String itensJson = jedis.hget(carrinhoKey, "itens");
            if (itensJson == null || itensJson.equals("{}")) {
                return new HashMap<>();
            }
            Type type = new TypeToken<Map<String, Integer>>(){}.getType();
            return gson.fromJson(itensJson, type);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao ler itens do Redis", e);
        }
    }
    
    private void saveItensToRedis(Jedis jedis, String carrinhoKey, Map<String, Integer> itens) {
        try {
            String itensJson = gson.toJson(itens);
            jedis.hset(carrinhoKey, "itens", itensJson);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar itens no Redis", e);
        }
    }
}