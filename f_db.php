<?php
    require_once('config.php');
    //$aaa=new database;

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

        #TODO: 確認這功能有沒有需要
        public function dbQuery($query){
            $arr = array();
            $arr[] = $this->db->query($query);
            return $arr;
        }

        /**
         * 取得某帳號的所有網址
         * echo 至前端之javascript變數
         *
         * @param int $user_id 使用者編號
         * @return void
         */
        public function getURL($user_id){
            $query="SELECT URL FROM user_url WHERE ID = ?";
            $sth = $this->db->query($query);
            $sth->execute( $user_id );
            $i=0;
            echo '<script>';
            foreach( $sth as $row ){
                #TODO: 修改javascript變數名稱
                echo 'var i' . $i . ' = \'' . $row['URL'] . '\';';
                $i++;
            }
            echo '</script>';
        }
        #NOTE 最後工作位置
        #NOTE 工作中止原因：修改Master README需切換branch
        #NOTE 預計下次工作內容：getUserName

        /**
         * 取得某帳號的所有網站名稱
         * echo 至前端之javascript變數
         *
         * @param int $user_id 使用者編號
         * @return void
         */
        public function getSiteName($user_id){
            $query="SELECT site_name FROM user_url WHERE ID = ?";
            $sth = $this->db->query($query);
            $sth->execute( $user_id );
            $i=0;
            echo '<script>';
            foreach( $sth as $row ){
                #TODO: 修改javascript變數名稱
                echo 'var i' . $i . ' = \'' . $row['URL'] . '\';';
                $i++;
            }

            echo '</script>';
        }

        /**
         * 新增使用者
         *
         * @param string $username 使用者帳號
         * @param string $password 使用者密碼
         * @param string $email 電子信箱
         * @return boolean 是否新增成功
         */
        public function newUser($username,$password,$email){
            if($this->checkUser($username)){
                return false;
            }else{
                $password = md5($password);
                $query = "INSERT INTO Account (username,password,email) VALUES (?,?,?)";
                $sth = $this->db->prepare($query);
                $sth->execute( array($username, $password, $email) );
                return true;
            }
        }

        /**
         * 檢查資料庫中是否存在傳入的帳號名稱
         *
         * @param string $username 使用者帳號
         * @return boolean 帳號名稱是否存在
         */
        public function checkUser($username){
            $query = "SELECT username FROM Account WHERE username =?";
            $sth = $this->db->prepare($query);
            $sth->execute( $username );
            foreach($sth as $row){
                if($row['username'] == $username ){
                    return true;
                }else{
                    return false;
                }
            }
        }


    }
?>
