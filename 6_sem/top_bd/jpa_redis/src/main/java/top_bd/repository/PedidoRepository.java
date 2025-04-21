package top_bd.repository;


import java.util.List;

import javax.persistence.EntityManager;

import top_bd.config.JPAConfig;
import top_bd.model.Cliente;
import top_bd.model.Pedido;

public class PedidoRepository {
    
    public void salvar(Pedido pedido) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(pedido);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void atualizar(Pedido pedido) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(pedido);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void remover(Long id) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            Pedido pedido = em.find(Pedido.class, id);
            if (pedido != null) {
                em.remove(pedido);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public Pedido buscarPorId(Long id) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            return em.find(Pedido.class, id);
        } finally {
            em.close();
        }
    }
    
    public List<Pedido> listarTodos() {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT p FROM Pedido p";
            return em.createQuery(jpql, Pedido.class).getResultList();
        } finally {
            em.close();
        }
    }
    
    public List<Pedido> listarPorCliente(Cliente cliente) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT DISTINCT p FROM Pedido p JOIN FETCH p.itens i JOIN FETCH i.produto WHERE p.cliente = :cliente";
            return em.createQuery(jpql, Pedido.class)
                    .setParameter("cliente", cliente)
                    .getResultList();
        } finally {
            em.close();
        }
    }
}
