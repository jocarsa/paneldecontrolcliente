<?php
// Define the path to your JSON file
$jsonFilePath = $_GET['tabla'].'.json';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the raw POST data
    $jsonInput = file_get_contents('php://input');
    
    // Decode the incoming JSON data to a PHP array
    $newData = json_decode($jsonInput, true);
    
    // Check if the incoming data is valid
    if ($newData === null || !is_array($newData)) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Invalid JSON or data structure"]);
        exit();
    }

    // Read the existing data from the JSON file
    if (file_exists($jsonFilePath)) {
        $jsonData = file_get_contents($jsonFilePath);
        $existingData = json_decode($jsonData, true);
        
        // Ensure existing data is an array
        if (!is_array($existingData)) {
            $existingData = []; // Initialize as empty array if not valid
        }
    } else {
        $existingData = []; // Initialize as empty array if file doesn't exist
    }

    // Append the new data to the existing array
    // Assuming $newData is an array of objects or a single object to append
    if (isset($newData[0])) {
        // If $newData is an array, merge all objects into the existing array
        $updatedData = array_merge($existingData, $newData);
    } else {
        // If $newData is a single object, append it directly
        $existingData[] = $newData;
        $updatedData = $existingData;
    }

    // Encode the updated array back to JSON
    $updatedJson = json_encode($updatedData, JSON_PRETTY_PRINT);

    // Save the updated JSON back to the file
    if (file_put_contents($jsonFilePath, $updatedJson) !== false) {
        // Send a success response
        echo json_encode(["message" => "Data updated successfully"]);
    } else {
        // Send an error response
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Failed to save data"]);
    }
} else {
    // Send a method not allowed response
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Invalid request method"]);
}
