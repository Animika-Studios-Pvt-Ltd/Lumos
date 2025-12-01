<?php
$to      = 'india.lumos@gmail.com';
$subject = "New Message From Your Website";
$message = $_POST['message'];
$headers = 'From: ' . $_POST['name'] . ' <india.lumos@gmail.com>' . "\r\n" .
    'Reply-To: india.lumos@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($to, $subject, $message, $headers);
header('Location: thank-you.html');
exit();
?>