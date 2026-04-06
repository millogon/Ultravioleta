<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$nombre   = htmlspecialchars(strip_tags(trim($_POST['nombre'] ?? '')));
$empresa  = htmlspecialchars(strip_tags(trim($_POST['empresa'] ?? '')));
$email    = filter_var(trim($_POST['correo'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars(strip_tags(trim($_POST['telefono'] ?? '')));
$tipo     = htmlspecialchars(strip_tags(trim($_POST['tipo'] ?? '')));
$volumen  = htmlspecialchars(strip_tags(trim($_POST['volumen'] ?? '')));
$mensaje  = htmlspecialchars(strip_tags(trim($_POST['mensaje'] ?? '')));

if (!$nombre || !$email || !$mensaje) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Correo inválido']);
    exit;
}

$destinatario = 'info@ultravioleta.org';
$asunto = "Nuevo contacto desde ultravioleta.org – $nombre";

$cuerpo = "Nombre: $nombre\n";
if ($empresa)  $cuerpo .= "Empresa: $empresa\n";
$cuerpo .= "Correo: $email\n";
if ($telefono) $cuerpo .= "Teléfono: $telefono\n";
if ($tipo)     $cuerpo .= "Tipo de aplicación: $tipo\n";
if ($volumen)  $cuerpo .= "Volumen de agua: $volumen\n";
$cuerpo .= "\nMensaje:\n$mensaje\n";

$headers  = "From: no-reply@ultravioleta.org\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado! Nos pondremos en contacto pronto.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al enviar. Por favor intente nuevamente.']);
}
?>
