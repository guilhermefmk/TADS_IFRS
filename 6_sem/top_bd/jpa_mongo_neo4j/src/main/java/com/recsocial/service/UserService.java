package com.recsocial.service;

import com.recsocial.dto.UserDTO;
import com.recsocial.model.mongodb.User;
import com.recsocial.model.neo4j.UserNode;
import com.recsocial.repository.mongodb.UserRepository;
import com.recsocial.repository.neo4j.Neo4jUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final Neo4jUserRepository neo4jUserRepository;

    @Autowired
    public UserService(UserRepository userRepository, Neo4jUserRepository neo4jUserRepository) {
        this.userRepository = userRepository;
        this.neo4jUserRepository = neo4jUserRepository;
    }

    public User registerUser(UserDTO userDTO) {
        String id = userDTO.getId();
        if (id == null || id.isEmpty()) {
            id = UUID.randomUUID().toString();
            userDTO.setId(id);
        }

        // Cria usuário no MongoDB
        User user = new User(id, userDTO.getName(), userDTO.getBio(), userDTO.getInterests());
        userRepository.save(user);

        // Cria nó no Neo4j
        UserNode userNode = new UserNode(id, userDTO.getName(), userDTO.getBio(), userDTO.getInterests());
        neo4jUserRepository.save(userNode);

        return user;
    }

    public User getUserProfile(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUserProfile(String id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userDTO.getName());
        user.setBio(userDTO.getBio());
        user.setInterests(userDTO.getInterests());
        User updated = userRepository.save(user);
        UserNode userNode = new UserNode(
            updated.getId(),
            updated.getName(),
            updated.getBio(),
            updated.getInterests()
        );
        neo4jUserRepository.save(userNode);
        return updated;
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
        neo4jUserRepository.deleteById(userId);
    }

    public Optional<UserDTO> getUserById(String userId) {
        return userRepository.findById(userId)
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getBio(), user.getInterests()));
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(user -> new UserDTO(user.getId(), user.getName(), user.getBio(), user.getInterests()))
            .collect(Collectors.toList());
    }
}