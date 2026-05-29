<?php

session_start();

try {

    $db = new PDO("sqlite:" . __DIR__ . "/../database/chat.db");

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*
    |--------------------------------------------------------------------------
    | USERS TABLE
    |--------------------------------------------------------------------------
    */

    $db->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    /*
    |--------------------------------------------------------------------------
    | MESSAGES TABLE
    |--------------------------------------------------------------------------
    */

    $db->exec("
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id INTEGER,
            receiver_id INTEGER,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    /*
    |--------------------------------------------------------------------------
    | ADD last_seen COLUMN
    |--------------------------------------------------------------------------
    */

    try {

        $db->exec("
            ALTER TABLE users
            ADD COLUMN last_seen DATETIME
        ");
        try {

            $db->exec("
                ALTER TABLE messages
                ADD COLUMN voice TEXT
            ");
        
        } catch (Exception $e) {}

    } catch (Exception $e) {}

    /*
    |--------------------------------------------------------------------------
    | ADD image COLUMN
    |--------------------------------------------------------------------------
    */

    try {

        $db->exec("
            ALTER TABLE messages
            ADD COLUMN image TEXT
        ");

    } catch (Exception $e) {}

} catch (PDOException $e) {

    die("Database Error: " . $e->getMessage());

}
?>