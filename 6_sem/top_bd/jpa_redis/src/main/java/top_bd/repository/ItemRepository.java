package top_bd.repository;


import java.util.List;

import javax.persistence.EntityManager;

import top_bd.config.JPAConfig;
import top_bd.model.Item;
import top_bd.model.Pedido;

public class ItemRepository {
    
    public void salvar(Item item) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(item);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void atualizar(Item item) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(item);
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
            Item item = em.find(Item.class, id);
            if (item != null) {
                em.remove(item);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public Item buscarPorId(Long id) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            return em.find(Item.class, id);
        } finally {
            em.close();
        }
    }
    
    public List<Item> listarPorPedido(Pedido pedido) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT i FROM Item i WHERE i.pedido = :pedido";
            return em.createQuery(jpql, Item.class)
                    .setParameter("pedido", pedido)
                    .getResultList();
        } finally {
            em.close();
        }
    }
}
