<?php
session_start();
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

verificar_login();

$user_id = $_SESSION['user_id'];
$consulta_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$erro = '';

if (!$consulta_id) {
    header('Location: consultas.php');
    exit();
}

$stmt = $mysqli->prepare("SELECT * FROM consultas WHERE id = ? AND id_usuario = ?");
$stmt->bind_param("ii", $consulta_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    header('Location: consultas.php');
    exit();
}

$consulta = $result->fetch_assoc();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idade = limpar_input($_POST['idade']);
    $data = limpar_input($_POST['data']);
    $hora = limpar_input($_POST['hora']);
    $motivo = limpar_input($_POST['motivo']);

    if (empty($idade) || empty($data) || empty($hora) || empty($motivo)) {
        $erro = "Todos os campos são obrigatórios.";
    } else {
        $stmt = $mysqli->prepare("UPDATE consultas SET idade = ?, data = ?, hora = ?, motivo = ? WHERE id = ? AND id_usuario = ?");
        $stmt->bind_param("isssii", $idade, $data, $hora, $motivo, $consulta_id, $user_id);
        
        if ($stmt->execute()) {
            header('Location: consultas.php');
            exit();
        } else {
            $erro = "Erro ao atualizar consulta: " . $stmt->error;
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
    <title>Editar Consulta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Editar Consulta</h2>
        <?php if ($erro) echo "<div class='alert alert-danger'>$erro</div>"; ?>
        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"] . "?id=" . $consulta_id);?>">
            <div class="mb-3">
                <label for="idade" class="form-label">Idade do Animal</label>
                <input type="number" class="form-control" id="idade" name="idade" value="<?php echo $consulta['idade']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" class="form-control" id="data" name="data" value="<?php echo $consulta['data']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="hora" class="form-label">Hora</label>
                <input type="time" class="form-control" id="hora" name="hora" value="<?php echo $consulta['hora']; ?>" required>
            </div>
            <div class="mb-3">
                <label for="motivo" class="form-label">Motivo</label>
                <textarea class="form-control" id="motivo" name="motivo" required><?php echo $consulta['motivo']; ?></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Atualizar Consulta</button>
        </form>
        <a href="consultas.php" class="btn btn-secondary mt-3">Voltar</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>