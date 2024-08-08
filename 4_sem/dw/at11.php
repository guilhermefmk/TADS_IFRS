<?php
// Conexão com o banco de dados usando PDO
try {
    $con = new PDO('mysql:host=localhost;dbname=aulapi2', 'root', '');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparação da consulta SQL
    $sth = $con->prepare('SELECT id, email, senha, nome, idade FROM usuarios WHERE email = :email');

    // Bind do valor do email
    $sth->bindValue(':email', 'profcleberfonseca@gmail.com');

    // Execução da consulta
    $sth->execute();

    // Recuperação dos resultados
    $user = $sth->fetch(PDO::FETCH_ASSOC);

    // Exibição do resultado
    if ($user) {
        echo "Usuário encontrado:\n";
        echo "ID: " . $user['id'] . "\n";
        echo "Nome: " . $user['nome'] . "\n";
        echo "E-mail: " . $user['email'] . "\n";
        echo "Idade: " . $user['idade'] . "\n";
    } else {
        echo "Nenhum usuário encontrado com o e-mail fornecido.\n";
    }

} catch (PDOException $e) {
    echo 'Erro: ' . $e->getMessage();
}
?>

