<?php
include 'includes/config.php';
include 'includes/auth.php';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Chat App</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div class="chat-app">

    <div class="sidebar">

        <div class="sidebar-top">
            <h2>Chats</h2>
        </div>

        <div id="users-list"></div>

    </div>

    <div class="chat-container">

        <div class="top-bar">

            <div>
                <?= $_SESSION["username"] ?>
            </div>

            <a href="logout.php" class="logout-btn">
                Logout
            </a>

        </div>

        <div class="chat-box" id="chat-box"></div>

        <form id="message-form" class="message-form" enctype="multipart/form-data">
        <button type="button" id="record-btn" class="record-btn">
    🎤
</button>
        <label class="upload-btn">
    +
    <input type="file" id="image-input" hidden>
</label>

<input type="text" id="message-input" placeholder="Type message...">
            <button type="submit">Send</button>

        </form>

    </div>

</div>

<script>
const MY_ID = <?= $_SESSION["user_id"] ?>;
</script>

<script src="assets/app.js"></script>

</body>
</html>