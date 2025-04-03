<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate required fields
    if (!isset($data['title']) || !isset($data['description']) || !isset($data['url']) || !isset($data['section'])) {
        echo json_encode(["error" => "Invalid input. All fields are required."]);
        exit;
    }

    // Escape strings to prevent SQL injection
    $title = mysqli_real_escape_string($conn, $data['title']);
    $description = mysqli_real_escape_string($conn, $data['description']);
    $image_url = mysqli_real_escape_string($conn, $data['url']);
    $section = mysqli_real_escape_string($conn, $data['section']);

    // Validate URL format
    if (!filter_var($image_url, FILTER_VALIDATE_URL)) {
        echo json_encode(["error" => "Invalid URL format."]);
        exit;
    }

    // Validate unique movie title
    $check_query = "SELECT * FROM top_movies WHERE Title = '$title' UNION SELECT * FROM Other_Movies WHERE Item = '$title'";
    $result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["error" => "Movie title already exists."]);
        exit;
    }

    $table = ($section === 'top') ? 'top_movies' : 'Other_Movies';
    $column = ($section === 'top') ? 'Title' : 'Item';

    // Insert data into the database
    $sql = "INSERT INTO $table ($column, Description, Image) VALUES ('$title', '$description', '$image_url')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["message" => "Movie added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . mysqli_error($conn)]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT Title, Description, Image FROM top_movies";
    $result = $conn->query($sql);

    $movies = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
    }
    echo json_encode($movies);
}

mysqli_close($conn);
?>
