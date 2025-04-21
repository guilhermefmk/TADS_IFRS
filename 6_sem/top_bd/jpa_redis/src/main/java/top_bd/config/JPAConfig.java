package top_bd.config;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAConfig {
    private static final String PERSISTENCE_UNIT_NAME = "ecommerce-pu";
    private static EntityManagerFactory factory;
    
    public static EntityManager getEntityManager() {
        if (factory == null) {
            factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        }
        return factory.createEntityManager();
    }
    
    public static void closeEntityManagerFactory() {
        if (factory != null && factory.isOpen()) {
            factory.close();
        }
    }
}