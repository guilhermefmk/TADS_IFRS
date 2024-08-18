<?php
session_start();
require_once 'includes/db_connect.php';
require_once 'includes/functions.php';

verificar_login();

$user_id = $_SESSION['user_id'];
$consulta_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$consulta_id) {
    header('Location: consultas.php');
    exit();
}

$stmt = $mysqli->prepare("DELETE FROM consultas WHERE id = ? AND id_usuario = ?");
$stmt->bind_param("ii", $consulta_id, $user_id);

if ($stmt->execute()) {
    header('Location: consultas.php');
} else {
    echo "Erro ao excluir consulta: " . $stmt->error;
}

$stmt->close();