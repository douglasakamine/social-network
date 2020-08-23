<?php
$user = 'root';
$pass = '';
try {
    $dbh = new PDO('mysql:host=localhost;dbname=social_network', $user, $pass);
    foreach($dbh->query('SELECT * from posts') as $row) {
        echo json_encode($result);
    }
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>