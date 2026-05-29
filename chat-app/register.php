<?php
include 'includes/config.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    if (!empty($username) && !empty($password)) {

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        try {

            $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $stmt->execute([$username, $hashedPassword]);

            header("Location: login.php");
            exit;

        } catch(PDOException $e) {
            $error = "Username already exists!";
        }

    } else {
        $error = "Fill all fields!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div class="container">

    <form method="POST" class="form-box">

        <h1>Create Account</h1>

        <?php if($error): ?>
            <p class="error"><?= $error ?></p>
        <?php endif; ?>

        <input type="text" name="username" placeholder="Username">

        <input type="password" name="password" placeholder="Password">

        <button type="submit">Register</button>

        <a href="login.php">Login</a>

    </form>

</div>

</body>
</html>