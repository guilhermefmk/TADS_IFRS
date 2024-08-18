<?php
session_start();
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = limpar_input($_POST['email']);
    $senha = $_POST['senha'];

    if (empty($email) || empty($senha)) {
        $erro = "Email e senha são obrigatórios.";
    } else {
        $senha_hash = md5($senha);
        $stmt = $mysqli->prepare("SELECT id, nome FROM usuario WHERE email = ? AND senha = ?");
        $stmt->bind_param("ss", $email, $senha_hash);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $usuario = $result->fetch_assoc();
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_nome'] = $usuario['nome'];
            header('Location: consultas.php');
            exit();
        } else {
            $erro = "Email ou senha inválidos.";
        }
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Login</h2>
        <?php
        if ($erro) echo "<div class='alert alert-danger'>$erro</div>";
        ?>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="mb-3">
                <label for="senha" class="form-label">Senha</label>
                <input type="password" class="form-control" id="senha" name="senha" required>
            </div>
            <button type="submit" class="btn btn-primary">Entrar</button>
        </form>
        <a href="cadastro.php" class="btn btn-link mt-3">Não tem uma conta? Cadastre-se</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>