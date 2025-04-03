<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $title = isset($_GET['title']) ? $_GET['title'] : null;
    $section = isset($_GET['section']) ? $_GET['section'] : null;
    
    if (!$title || !$section) {
        http_response_code(400);
        echo json_encode(["error" => "Movie title and section are required"]);
        exit();
    }

    // Choose the table and column name based on section
    if ($section === 'top') {
        $table = 'top_movies';
        $column = 'Title';
    } else {
        $table = 'Other_Movies';
        $column = 'Item';
    }
    
    // Prepare and execute delete query using the correct column name
    $query = "DELETE FROM $table WHERE $column = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $title);
    
    if (mysqli_stmt_execute($stmt)) {
        http_response_code(200);
        echo json_encode(["message" => "Movie deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete movie: " . mysqli_error($conn)]);
    }
    
    mysqli_stmt_close($stmt);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

mysqli_close($conn);
?>