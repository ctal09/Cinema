<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: *');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["error" => "Invalid input. All fields are required."]);
        exit;
    }

    $username = mysqli_real_escape_string($conn, $data['username']);
    $password = mysqli_real_escape_string($conn, $data['password']);
    $role = "user";

    // Validate username (alphanumeric only, should not start with a number)
    if (!preg_match("/^[a-zA-Z][a-zA-Z0-9]*$/", $username)) {
        echo json_encode(["error" => "Username must be alphanumeric and should not start with a number."]);
        exit;
    }

    // Check for duplicate username
    $check_query = "SELECT * FROM users WHERE UserName = '$username'";
    $result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["error" => "Username already exists."]);
        exit;
    }

    // Insert new user
    $sql = "INSERT INTO users (UserName, Role, Password) VALUES ('$username', '$role', '$password')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["message" => "User added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>