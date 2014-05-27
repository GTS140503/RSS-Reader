<?php
    $public_dbc;
    function db_connection($host,$username,$password,$db_name){
        $public_dbc=mysqli_connect($host,$username,$password,$db_name);
        if (mysqli_connect_errno()) {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
    }

    function db_close_connection(){
        mysqli_close($public_dbc);
    }
?>
