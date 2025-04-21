package top_bd.repository;

import java.util.List;

import javax.persistence.EntityManager;

import top_bd.config.JPAConfig;
import top_bd.model.Produto;

public class ProdutoRepository {
    
    public void salvar(Produto produto) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(produto);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void atualizar(Produto produto) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(produto);
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
            Produto produto = em.find(Produto.class, id);
            if (produto != null) {
                em.remove(produto);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public Produto buscarPorId(Long id) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            return em.find(Produto.class, id);
        } finally {
            em.close();
        }
    }
    
    public List<Produto> listarTodos() {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT p FROM Produto p";
            return em.createQuery(jpql, Produto.class).getResultList();
        } finally {
            em.close();
        }
    }
}