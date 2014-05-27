<?php
    require_once('config.php');

    $aaa=new database;
    $aaa->getURL(1);

    class database{
        protected $db;

        public function __Construct(){

        $conn = NULL;
        $dsn = DB_TYPE.':host=' . HOST . ';dbname=' . DB_NAME;
            try{
                $conn = new PDO($dsn, USERNAME, PASSWORD);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                } catch(PDOException $e){
                    echo 'ERROR: ' . $e->getMessage();
                }
                $this->db = $conn;
        }

        public function getConnection(){
            return $this->db;
        }

        public function dbQuery($query){
            $arr = array();
            $arr[] = $this->db->query($query);
            return $arr;
        }

        public function getURL($user_id){
            $query="SELECT URL,username FROM user_url WHERE ID = $user_id";
            $i=0;
            echo '<script>';
            foreach($this->db->query($query) as $row){
                echo 'var i' . $i . ' = \'' . $row['URL'] . '\';';
                $i++;
            }

            echo '</script>';
        }
    }
?>
