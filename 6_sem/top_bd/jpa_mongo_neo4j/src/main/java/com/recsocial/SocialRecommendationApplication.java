package com.recsocial;

import com.recsocial.dto.PostDTO;
import com.recsocial.dto.RelationshipDTO;
import com.recsocial.dto.UserDTO;
import com.recsocial.dto.RecommendationDTO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;
import java.util.Scanner;

import com.recsocial.service.UserService;
import com.recsocial.service.PostService;
import com.recsocial.service.RecommendationService;
import com.recsocial.service.RelationshipService;

@SpringBootApplication
public class SocialRecommendationApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(SocialRecommendationApplication.class, args);
        UserService userService = context.getBean(UserService.class);
        PostService postService = context.getBean(PostService.class);
        RelationshipService relationshipService = context.getBean(RelationshipService.class);
        RecommendationService recommendationService = context.getBean(RecommendationService.class);


        Scanner scanner = new Scanner(System.in);
        int opcao = -1;
        UserDTO usuarioLogado = null;

        while (opcao != 0) {
            System.out.println("\n=== Sistema de Recomendação Social ===");
            if (usuarioLogado == null) {
                System.out.println("Nenhum usuário logado.");
                System.out.println("1. Login");
                System.out.println("2. Cadastrar usuário");
                System.out.println("0. Sair");
                System.out.print("Escolha uma opção: ");
                opcao = scanner.nextInt();
                scanner.nextLine();

                switch (opcao) {
                    case 1:
                        List<UserDTO> users = userService.getAllUsers();
                        if (users.isEmpty()) {
                            System.out.println("Nenhum usuário cadastrado. Cadastre um usuário primeiro!");
                            break;
                        }
                        System.out.println("Usuários disponíveis:");
                        for (int i = 0; i < users.size(); i++) {
                            System.out.println((i+1) + ". " + users.get(i).getName());
                        }
                        System.out.print("Selecione o número do usuário para logar: ");
                        int idx = scanner.nextInt() - 1;
                        scanner.nextLine();
                        if (idx >= 0 && idx < users.size()) {
                            usuarioLogado = users.get(idx);
                            System.out.println("Logado como: " + usuarioLogado.getName());
                        } else {
                            System.out.println("Opção inválida!");
                        }
                        break;
                    case 2:
                        System.out.print("Nome: ");
                        String nome = scanner.nextLine();
                        System.out.print("Bio: ");
                        String bio = scanner.nextLine();
                        System.out.print("Interesses (separados por vírgula): ");
                        String interessesStr = scanner.nextLine();
                        List<String> interesses = List.of(interessesStr.split(","));
                        UserDTO novo = new UserDTO(null, nome, bio, interesses);
                        userService.registerUser(novo);
                        System.out.println("Usuário cadastrado!");
                        break;
                    case 0:
                        System.out.println("Saindo...");
                        break;
                    default:
                        System.out.println("Opção inválida!");
                }
            } else {
                System.out.println("Logado como: " + usuarioLogado.getName());
                System.out.println("1. Listar usuários");
                System.out.println("2. Cadastrar usuário");
                System.out.println("3. Criar post");
                System.out.println("4. Seguir usuário");
                System.out.println("5. Curtir post");
                System.out.println("6. Comentar em post");
                System.out.println("7. Ver recomendações");
                System.out.println("8. Buscar posts por hashtag");
                System.out.println("9. Deslogar");
                System.out.println("0. Sair");
                System.out.print("Escolha uma opção: ");
                opcao = scanner.nextInt();
                scanner.nextLine();

                switch (opcao) {
                    case 1:
                        List<UserDTO> allUsers = userService.getAllUsers();
                        System.out.println("Usuários cadastrados:");
                        for (UserDTO user : allUsers) {
                            System.out.println(user.getName() + " (" + user.getBio() + ")");
                        }
                        break;
                    case 2:
                        System.out.print("Nome: ");
                        String nome = scanner.nextLine();
                        System.out.print("Bio: ");
                        String bio = scanner.nextLine();
                        System.out.print("Interesses (separados por vírgula): ");
                        String interessesStr = scanner.nextLine();
                        List<String> interesses = List.of(interessesStr.split(","));
                        UserDTO novo = new UserDTO(null, nome, bio, interesses);
                        userService.registerUser(novo);
                        System.out.println("Usuário cadastrado!");
                        break;
                    case 3:
                        System.out.print("Conteúdo do post: ");
                        String conteudo = scanner.nextLine();
                        System.out.print("Hashtags (separadas por vírgula): ");
                        String hashtagsStr = scanner.nextLine();
                        List<String> hashtags = List.of(hashtagsStr.split(","));
                        PostDTO novoPost = new PostDTO();
                        novoPost.setUsuarioId(usuarioLogado.getId());
                        novoPost.setConteudo(conteudo);
                        novoPost.setHashtags(hashtags);
                        novoPost.setDataCriacao(java.time.LocalDateTime.now());
                        postService.createPost(novoPost);
                        System.out.println("Post criado!");
                        break;
                    case 4:
                        // Seguir usuário
                        List<UserDTO> allUsers4 = userService.getAllUsers();
                        System.out.println("Usuários disponíveis para seguir:");
                        for (int i = 0; i < allUsers4.size(); i++) {
                            if (!allUsers4.get(i).getId().equals(usuarioLogado.getId())) {
                                System.out.println((i+1) + ". " + allUsers4.get(i).getName());
                            }
                        }
                        System.out.print("Digite o número do usuário para seguir: ");
                        int idxFollow = scanner.nextInt() - 1;
                        scanner.nextLine();
                        if (idxFollow >= 0 && idxFollow < allUsers4.size() && !allUsers4.get(idxFollow).getId().equals(usuarioLogado.getId())) {
                            RelationshipDTO followDto = new RelationshipDTO();
                            followDto.setFollowerId(usuarioLogado.getId());
                            followDto.setFollowedId(allUsers4.get(idxFollow).getId());
                            relationshipService.followUser(followDto);
                            System.out.println("Agora você segue " + allUsers4.get(idxFollow).getName());
                        } else {
                            System.out.println("Opção inválida!");
                        }
                        break;
                    case 5:
                        // Curtir post
                        var posts = postService.getAllPosts();
                        System.out.println("Posts disponíveis:");
                        for (int i = 0; i < posts.size(); i++) {
                            System.out.println((i+1) + ". " + posts.get(i).getConteudo());
                        }
                        System.out.print("Digite o número do post para curtir: ");
                        int idxLike = scanner.nextInt() - 1;
                        scanner.nextLine();
                        if (idxLike >= 0 && idxLike < posts.size()) {
                            RelationshipDTO likeDto = new RelationshipDTO();
                            likeDto.setFollowerId(usuarioLogado.getId());
                            likeDto.setPostId(posts.get(idxLike).getId());
                            relationshipService.likePost(likeDto);
                            System.out.println("Você curtiu o post!");
                        } else {
                            System.out.println("Opção inválida!");
                        }
                        break;
                    case 6:
                        // Comentar em post
                        var posts2 = postService.getAllPosts();
                        System.out.println("Posts disponíveis:");
                        for (int i = 0; i < posts2.size(); i++) {
                            System.out.println((i+1) + ". " + posts2.get(i).getConteudo());
                        }
                        System.out.print("Digite o número do post para comentar: ");
                        int idxComment = scanner.nextInt() - 1;
                        scanner.nextLine();
                        if (idxComment >= 0 && idxComment < posts2.size()) {
                            System.out.print("Digite seu comentário: ");
                            String comentario = scanner.nextLine();
                            RelationshipDTO commentDto = new RelationshipDTO();
                            commentDto.setFollowerId(usuarioLogado.getId());
                            commentDto.setPostId(posts2.get(idxComment).getId());
                            commentDto.setComment(comentario);
                            relationshipService.commentOnPost(commentDto);
                            System.out.println("Comentário registrado!");
                        } else {
                            System.out.println("Opção inválida!");
                        }
                        break;
                    case 7:
                        // Recomendações
                        RecommendationDTO rec = recommendationService.recommendAll(usuarioLogado.getId());
                        System.out.println("Amigos sugeridos:");
                        rec.getFriends().forEach(System.out::println);
                        System.out.println("\nPosts populares sugeridos:");
                        rec.getPosts().forEach(System.out::println);
                        break;
                    case 8:
                        System.out.print("Digite a hashtag para buscar (ex: #CARRO): ");
                        String hashtagBusca = scanner.nextLine();
                        var postsPorHashtag = postService.getPostsByHashtag(hashtagBusca);
                        if (postsPorHashtag.isEmpty()) {
                            System.out.println("Nenhum post encontrado com essa hashtag.");
                        } else {
                            for (var post : postsPorHashtag) {
                                if (post.getUsuarioId() != null) {
                                    UserDTO autor = userService.getUserById(post.getUsuarioId()).orElse(null);
                                    String nomeAutor = (autor != null) ? autor.getName() : "Desconhecido";
                                    System.out.println("- " + post.getConteudo() + " (Autor: " + nomeAutor + ")");
                                } else {
                                    System.out.println("- " + post.getConteudo() + " (Autor: Desconhecido)");
                                }
                            }
                        }
                        break;
                    case 9:
                        usuarioLogado = null;
                        System.out.println("Deslogado com sucesso!");
                        break;
                    case 0:
                        System.out.println("Saindo...");
                        break;
                    default:
                        System.out.println("Opção inválida!");
                }
            }
        }
        scanner.close();
        SpringApplication.exit(context);
    }
}