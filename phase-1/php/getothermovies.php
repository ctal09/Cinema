<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit;
}

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $sql = "SELECT Item, Description, Image FROM Other_Movies";
        $result = $conn->query($sql);
    
        $movies = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $movies[] = $row;
            }
        }
        echo json_encode($movies);
    }

    ?>