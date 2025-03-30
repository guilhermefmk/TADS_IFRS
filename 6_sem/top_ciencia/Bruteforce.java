import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public class Bruteforce {
    // The character set with 68 characters
    private static final char[] CHARSET = {
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '#', '$', '%', '&', '*', '+', '-', '.', '*', '=',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 't', 'z', 'x', 'w',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'T', 'Z', 'X', 'W'
    };

    // MD5 hashes to crack
    private static final List<String> HASHES_5_CHARS = Arrays.asList(
        "a12a53e9c429a1561e96f2bf0d46517b",
        "f59537d4f10ef116e5eb15dba1451ed3",
        "818a12c6f3c6b8591e050b00495e7951",
        "82df659723a88d89ca7fdb652d813fa5",
        "4a8fd58e7832f13002b86bb2169ba16b"
    );

    private static final List<String> HASHES_6_CHARS = Arrays.asList(
        "f1b2e83b0cba928b3fa483b46378e9e2",
        "0f8cb70e5ebdb808526f39fd528f39ed"
    );

    private static final List<String> HASHES_TESTE_CHARS = Arrays.asList(
        "b90e8c0e2036464699c3d824a4350efd"
    );

    // Number of threads to use
    private static final int NUM_THREADS = Runtime.getRuntime().availableProcessors();
    
    // Thread-safe MD5 cache for improved performance
    private static final ConcurrentHashMap<String, String> md5Cache = new ConcurrentHashMap<>();
    
    // MessageDigest instances for each thread
    private static final ThreadLocal<MessageDigest> md5Digest = ThreadLocal.withInitial(() -> {
        try {
            return MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 algorithm not available", e);
        }
    });

    public static void main(String[] args) {
        System.out.println("Starting optimized MD5 brute force attack with " + NUM_THREADS + " threads...");
        
        // Crack teste-character passwords
        // System.out.println("\nCracking 6-character passwords:");
        // for (String hash : HASHES_TESTE_CHARS) {
        //     crackPassword(hash, 4);
        // }
        // Crack 5-character passwords
        // System.out.println("\nCracking 5-character passwords:");
        // for (String hash : HASHES_5_CHARS) {
        //     crackPassword(hash, 5);
        // }
        
        // Crack 6-character passwords
        System.out.println("\nCracking 6-character passwords:");
        for (String hash : HASHES_6_CHARS) {
            crackPassword(hash, 6);
        }
    }

    /**
     * Attempts to crack the given MD5 hash with passwords of specified length
     * @param targetHash The MD5 hash to crack
     * @param passwordLength The length of passwords to try
     */
    private static void crackPassword(String targetHash, int passwordLength) {
        System.out.println("Attempting to crack hash: " + targetHash);
        
        long startTime = System.currentTimeMillis();
        AtomicBoolean passwordFound = new AtomicBoolean(false);
        Map<Integer, String> foundPassword = new ConcurrentHashMap<>();
        
        // Divide work among threads
        ExecutorService executor = Executors.newFixedThreadPool(NUM_THREADS);
        CountDownLatch latch = new CountDownLatch(NUM_THREADS);
        
        // Each thread will take a subset of the first character space
        for (int threadId = 0; threadId < NUM_THREADS; threadId++) {
            final int threadIndex = threadId;
            
            executor.execute(() -> {
                try {
                    // Distribute first character evenly among threads
                    for (int i = threadIndex; i < CHARSET.length && !passwordFound.get(); i += NUM_THREADS) {
                        char[] attempt = new char[passwordLength];
                        attempt[0] = CHARSET[i];
                        
                        // Non-recursive approach using iterative counters
                        int[] indices = new int[passwordLength - 1];
                        Arrays.fill(indices, 0);
                        
                        boolean done = false;
                        while (!done && !passwordFound.get()) {
                            // Fill the password attempt with the current indices
                            for (int j = 0; j < indices.length; j++) {
                                attempt[j + 1] = CHARSET[indices[j]];
                            }
                            
                            // Check if this password matches
                            String currentAttempt = new String(attempt);
                            String hash = md5(currentAttempt);
                            
                            if (targetHash.equals(hash)) {
                                foundPassword.put(threadIndex, currentAttempt);
                                passwordFound.set(true);
                                break;
                            }
                            
                            // Increment the indices (like counting with carry)
                            done = true;
                            for (int j = 0; j < indices.length; j++) {
                                indices[j]++;
                                if (indices[j] < CHARSET.length) {
                                    done = false;
                                    break;
                                }
                                indices[j] = 0;
                            }
                        }
                    }
                } finally {
                    latch.countDown();
                }
            });
        }
        
        try {
            latch.await(); // Wait for all threads to complete
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        executor.shutdown();
        
        long endTime = System.currentTimeMillis();
        double seconds = (endTime - startTime) / 1000.0;
        
        if (!foundPassword.isEmpty()) {
            String password = foundPassword.values().iterator().next();
            System.out.println("******* Senha encontrada: " + password);
            System.out.println("Time elapsed: " + seconds + " seconds");
        } else {
            System.out.println("Password not found");
            System.out.println("Time elapsed: " + seconds + " seconds");
        }
    }
    /**
     * Computes the MD5 hash of a string
     * @param input The input string
     * @return The MD5 hash as a hex string
     */
    public static String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(input.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar hash MD5", e);
        }
    }
}