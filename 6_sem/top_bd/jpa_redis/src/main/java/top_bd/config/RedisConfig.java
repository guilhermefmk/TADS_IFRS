package top_bd.config;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class RedisConfig {
    private static final String HOST = "localhost";
    private static final int PORT = 6379;
    private static JedisPool jedisPool;
    
    static {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(10);
        poolConfig.setMaxIdle(5);
        poolConfig.setMinIdle(1);
        
        jedisPool = new JedisPool(poolConfig, HOST, PORT);
    }
    
    public static Jedis getConnection() {
        return jedisPool.getResource();
    }
    
    public static void closeJedisPool() {
        if (jedisPool != null && !jedisPool.isClosed()) {
            jedisPool.close();
        }
    }
}