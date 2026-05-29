<?php
include '../includes/config.php';

if (!isset($_SESSION["user_id"])) {
    exit;
}

$stmt = $db->prepare("
    SELECT * FROM users
    WHERE id != ?
");

$stmt->execute([$_SESSION["user_id"]]);

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach($users as $user){

    $online = false;

    if($user["last_seen"]){

        $last = strtotime($user["last_seen"]);
        $now = time();

        if(($now - $last) < 10){
            $online = true;
        }
    }

    echo '
    <div class="user-item" onclick="selectUser('.$user["id"].')">

        <div class="user-avatar">
            '.strtoupper(substr($user["username"],0,1)).'
        </div>

        <div class="user-info">

            <div class="user-name">
                '.$user["username"].'
            </div>

            <div class="user-status">
                '.($online ? '🟢 Online' : '⚫ Offline').'
            </div>

        </div>

    </div>
    ';
}
?>