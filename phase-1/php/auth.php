<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: *');


$conn = mysqli_connect("localhost", "root", "", "Movie_Gallery");

if (!$conn) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed'
    ]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required'
    ]);
    exit();
}

$username = mysqli_real_escape_string($conn, $data['email']);  // Using 'email' as username
$password = mysqli_real_escape_string($conn, $data['password']);

// Query to fetch user details
$query = "SELECT * FROM users WHERE UserName = '$username' AND Password = '$password'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    $role = strtolower($user['Role']); // Normalize role comparison

    $response = [
        'success' => true,
        'message' => 'Login successful',
        'role' => $role
    ];

    if ($role === 'admin') {
        $response['redirect'] = '/crud';
    }

    echo json_encode($response);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password'
    ]);
}

mysqli_close($conn);
?>