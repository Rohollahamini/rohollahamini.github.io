<?php
include '../includes/config.php';

if (!isset($_SESSION["user_id"])) {
    exit;
}

$user1 = $_SESSION["user_id"];
$user2 = intval($_GET["user_id"]);

$stmt = $db->prepare("
SELECT messages.*, users.username
FROM messages

JOIN users ON users.id = messages.sender_id

WHERE
(sender_id = ? AND receiver_id = ?)
OR
(sender_id = ? AND receiver_id = ?)

ORDER BY messages.id ASC
");

$stmt->execute([
    $user1,
    $user2,
    $user2,
    $user1
]);

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach($messages as $msg){

    $mine = $msg["sender_id"] == $_SESSION["user_id"];

    echo '
    <div class="message '.($mine ? 'mine' : 'other').'">

        <div class="message-user">
            '.$msg["username"].'
        </div>

        <div class="message-text">
            '.$msg["message"].'
        </div>

        '.(
            $msg["image"]
            ?
            '<img src="uploads/'.$msg["image"].'" class="message-image">'
            :
            ''
        ).'

    </div>
    ';
}
?>