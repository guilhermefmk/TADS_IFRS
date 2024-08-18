<?php
session_start();
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

verificar_login();

$user_id = $_SESSION['user_id'];

$query = "SELECT c.*, u.nome as nome_usuario FROM consultas c 
          JOIN usuario u ON c.id_usuario = u.id 
          ORDER BY c.data, c.hora";
$result = $mysqli->query($query);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Consultas Agendadas</h2>
        <a href="nova_consulta.php" class="btn btn-primary mb-3">Nova Consulta</a>
        <?php if ($result->num_rows > 0): ?>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Paciente</th>
                        <th>Idade</th>
                        <th>Motivo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($consulta = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo date('d/m/Y', strtotime($consulta['data'])); ?></td>
                            <td><?php echo $consulta['hora']; ?></td>
                            <td><?php echo $consulta['nome_usuario']; ?></td>
                            <td><?php echo $consulta['idade']; ?></td>
                            <td><?php echo $consulta['motivo']; ?></td>
                            <td>
                                <?php if ($consulta['id_usuario'] == $user_id): ?>
                                    <a href="editar_consulta.php?id=<?php echo $consulta['id']; ?>" class="btn btn-sm btn-warning">Editar</a>
                                    <a href="excluir_consulta.php?id=<?php echo $consulta['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Tem certeza que deseja excluir esta consulta?')">Excluir</a>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>Não há consultas marcadas.</p>
        <?php endif; ?>
        <a href="logout.php" class="btn btn-secondary">Sair</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>