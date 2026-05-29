<?php
include '../includes/config.php';

if(isset($_SESSION["user_id"])){

    $stmt = $db->prepare("
        UPDATE users
        SET last_seen = datetime('now')
        WHERE id = ?
    ");

    $stmt->execute([$_SESSION["user_id"]]);
}
?>