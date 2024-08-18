<?php
session_start();
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

verificar_login();

$user_id = $_SESSION['user_id'];
$erro = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idade = limpar_input($_POST['idade']);
    $data = limpar_input($_POST['data']);
    $hora = limpar_input($_POST['hora']);
    $motivo = limpar_input($_POST['motivo']);

    if (empty($idade) || empty($data) || empty($hora) || empty($motivo)) {
        $erro = "Todos os campos são obrigatórios.";
    } else {
        $stmt = $mysqli->prepare("INSERT INTO consultas (id_usuario, idade, data, hora, motivo) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iisss", $user_id, $idade, $data, $hora, $motivo);
        
        if ($stmt->execute()) {
            header('Location: consultas.php');
            exit();
        } else {
            $erro = "Erro ao agendar consulta: " . $stmt->error;
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
    <title>Nova Consulta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Agendar Nova Consulta</h2>
        <?php if ($erro) echo "<div class='alert alert-danger'>$erro</div>"; ?>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="mb-3">
                <label for="idade" class="form-label">Idade do Animal</label>
                <input type="number" class="form-control" id="idade" name="idade" required>
            </div>
            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" class="form-control" id="data" name="data" required>
            </div>
            <div class="mb-3">
                <label for="hora" class="form-label">Hora</label>
                <input type="time" class="form-control" id="hora" name="hora" required>
            </div>
            <div class="mb-3">
                <label for="motivo" class="form-label">Motivo</label>
                <textarea class="form-control" id="motivo" name="motivo" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Agendar Consulta</button>
        </form>
        <a href="consultas.php" class="btn btn-secondary mt-3">Voltar</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>