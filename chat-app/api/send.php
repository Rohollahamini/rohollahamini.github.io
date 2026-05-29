<?php
include '../includes/config.php';

if (!isset($_SESSION["user_id"])) {
    exit;
}

$message = trim($_POST["message"] ?? "");
$receiver = intval($_POST["receiver_id"]);

$imageName = null;
$voiceName = null;

/*
|--------------------------------------------------------------------------
| IMAGE
|--------------------------------------------------------------------------
*/

if(isset($_FILES["image"])){

    if($_FILES["image"]["error"] == 0){

        $tmp = $_FILES["image"]["tmp_name"];

        $ext = pathinfo(
            $_FILES["image"]["name"],
            PATHINFO_EXTENSION
        );

        $imageName = time() . rand(1000,9999) . "." . $ext;

        move_uploaded_file(
            $tmp,
            "../uploads/" . $imageName
        );
    }
}

/*
|--------------------------------------------------------------------------
| VOICE
|--------------------------------------------------------------------------
*/

if(isset($_FILES["voice"])){

    if($_FILES["voice"]["error"] == 0){

        $tmp = $_FILES["voice"]["tmp_name"];

        $voiceName = time() . rand(1000,9999) . ".webm";

        move_uploaded_file(
            $tmp,
            "../voice/" . $voiceName
        );
    }
}

if (!empty($message) || $imageName || $voiceName) {

    $stmt = $db->prepare("
        INSERT INTO messages
        (sender_id, receiver_id, message, image, voice)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $_SESSION["user_id"],
        $receiver,
        $message,
        $imageName,
        $voiceName
    ]);
}
?>