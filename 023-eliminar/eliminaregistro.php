<?php
// Path to your JSON file
$jsonFile = $_GET['tabla'].'.json';

// Get the ID from the query string (GET request)
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Load the JSON data from the file
    $jsonData = file_get_contents($jsonFile);
    
    // Decode the JSON data into a PHP array
    $data = json_decode($jsonData, true);
    
    // Initialize a variable to track if deletion was successful
    $deleted = false;
    
    // Loop through the array to find the matching id and remove the entry
    foreach ($data as $key => $item) {
        if ($item['id'] == $id) {
            unset($data[$key]); // Remove the entry from the array
            $deleted = true;
            break;
        }
    }
    
    if ($deleted) {
        // Re-index the array (if necessary)
        $data = array_values($data);
        
        // Encode the updated array back to JSON
        $newJsonData = json_encode($data, JSON_PRETTY_PRINT);
        
        // Save the updated JSON back to the file
        file_put_contents($jsonFile, $newJsonData);
        
        // Return a success message
        echo json_encode([
            'status' => 'success',
            'message' => 'Record deleted successfully'
        ]);
    } else {
        // Return an error message if no record with that ID was found
        echo json_encode([
            'status' => 'error',
            'message' => 'Record not found'
        ]);
    }
} else {
    // Return an error message if no ID was provided
    echo json_encode([
        'status' => 'error',
        'message' => 'No ID provided'
    ]);
}
?>
