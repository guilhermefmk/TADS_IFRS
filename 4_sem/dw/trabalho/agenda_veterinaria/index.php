<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda Veterinária</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Bem-vindo à Agenda Veterinária</h1>
        <div class="row mt-5">
            <div class="col-md-6 offset-md-3 text-center">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="consultas.php" class="btn btn-primary btn-lg">Minhas Consultas</a>
                    <a href="logout.php" class="btn btn-secondary btn-lg mt-3">Sair</a>
                <?php else: ?>
                    <a href="login.php" class="btn btn-primary btn-lg">Login</a>
                    <a href="cadastro.php" class="btn btn-secondary btn-lg">Cadastre-se</a>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>