<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid input data"]);
    exit();
}

$oldTitle = mysqli_real_escape_string($conn, $data['oldTitle']);
$newTitle = mysqli_real_escape_string($conn, $data['title']);
$description = mysqli_real_escape_string($conn, $data['description']);
$url = mysqli_real_escape_string($conn, $data['url']);
$section = mysqli_real_escape_string($conn, $data['section']);

// Validate URL format
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode(["error" => "Invalid URL format."]);
    exit();
}

// Check if the new title already exists (excluding the current record being updated)
if ($oldTitle !== $newTitle) {
    $check_query = "SELECT * FROM top_movies WHERE Title = '$newTitle' UNION SELECT * FROM Other_Movies WHERE Item = '$newTitle'";
    $result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["error" => "Movie title already exists."]);
        exit();
    }
}

// Update query based on section
$table = ($section === 'top') ? 'top_movies' : 'Other_Movies';
$column = ($section === 'top') ? 'Title' : 'Item';

$sql = "UPDATE $table SET $column = '$newTitle', Description = '$description', Image = '$url' WHERE $column = '$oldTitle'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Movie updated successfully"]);
} else {
    echo json_encode(["error" => "Error updating record: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
