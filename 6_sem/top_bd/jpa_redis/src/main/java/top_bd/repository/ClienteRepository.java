package top_bd.repository;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import top_bd.config.JPAConfig;
import top_bd.model.Cliente;

public class ClienteRepository {
    
    public void salvar(Cliente cliente) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(cliente);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public void atualizar(Cliente cliente) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(cliente);
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
            Cliente cliente = em.find(Cliente.class, id);
            if (cliente != null) {
                em.remove(cliente);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
    
    public Cliente buscarPorId(Long id) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            return em.find(Cliente.class, id);
        } finally {
            em.close();
        }
    }
    
    public Cliente buscarPorEmail(String email) {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT c FROM Cliente c WHERE c.email = :email";
            TypedQuery<Cliente> query = em.createQuery(jpql, Cliente.class);
            query.setParameter("email", email);
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        } finally {
            em.close();
        }
    }
    
    public List<Cliente> listarTodos() {
        EntityManager em = JPAConfig.getEntityManager();
        try {
            String jpql = "SELECT c FROM Cliente c";
            return em.createQuery(jpql, Cliente.class).getResultList();
        } finally {
            em.close();
        }
    }
}
