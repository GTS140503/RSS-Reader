<?php
    /**
     * database
     * <p>
     * 說明：資料庫相關操作
     * <p>
     * @version 1.0.0
     * @author	TangSong jim20259@gmail.com
     * @link	http://www.plurk.com/tangsong
     */
    require_once('config.php');
    $test = new database;
    $test->getURL(2);

    //$test->getUsername(2);

    //$test->getSiteName(1);

    $test->newUser('newuserh','1234','emmmaaail@email.com');

    $test->addList(2,'www.google.com.tw','Google');

    $test->addList(2,'www.yahoo.com.tw','yahoo');

    $test->addList(2,'www.google.com.tw','gggggle');

    $test->deleteURL('admin2','www.yahoo.com.tw');
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
            $query="SELECT URL FROM user_url WHERE ID = :user_id";
            $sth = $this->db->prepare($query);
            $sth->bindParam(':user_id', $user_id);
            $sth->execute();
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
         * 取得某帳號的名稱
         * echo 至前端之javascript變數
         *
         * @param int $user_id 使用者編號
         * @return void
         */
        public function getUsername($user_id){
            $query="SELECT username FROM user_url WHERE ID = :user_id";
            $sth = $this->db->query($query);
            $sth->bindParam(':user_id', $user_id);
            $sth->execute();
            $i=0;
            echo '<script>';
            foreach( $sth as $row ){
                #TODO: 修改javascript變數名稱
                echo 'var i' . $i . ' = \'' . $row['username'] . '\';';
                $i++;
            }
            echo '</script>';
        }

        /**
         * 取得某帳號的所有網站名稱
         * echo 至前端之javascript變數
         *
         * @param int $user_id 使用者編號
         * @return void
         */
        public function getSiteName($user_id){
            $query="SELECT site_name FROM user_url WHERE ID = :user_id";
            $sth = $this->db->query($query);
            $sth->bindParam(':user_id', $user_id);
            $sth->execute();
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
                $query = "INSERT INTO Account (username,password,email) VALUES (:username, :password, :email)";
                $sth = $this->db->prepare($query);
                $sth->bindParam(':username', $username);
                $sth->bindParam(':password', $password);
                $sth->bindParam(':email', $email);
                $sth->execute();
                return true;
            }
        }

        /**
         * 檢查資料庫中是否存在傳入的帳號名稱
         *
         * @param string $username 使用者帳號
         * @return boolean 帳號名稱是否存在
         */
        private function checkUser($username){
            $query = "SELECT username FROM Account WHERE username = :username";
            $sth = $this->db->prepare($query);
            $sth->bindParam(':username', $username);
            $sth->execute();
            foreach($sth as $row){
                if($row['username'] == $username ){
                    return true;
                }else{
                    return false;
                }
            }
        }

        /**
         * 增加一筆 使用者-URL-網站名稱 的關聯資料
         *
         * @param int $user_id 使用者編號
         * @param string $URL 網址
         * @param string $site_name 網站名稱
         * @return void
         */
        public function addList($user_id,$URL,$site_name){
            $checkURL = $this->checkURL($URL);
            if($checkURL){
                $query = "INSERT INTO List (UID, URL_ID, site_name) VALUES (:user_id, :URL, :site_name)";
                $sth = $this->db->prepare($query);
                $sth->bindParam(':user_id', $user_id);
                $sth->bindParam(':URL', $URL);
                $sth->bindParam(':site_name', $site_name);
                $sth->execute();
            }else{
                $this->newURL($URL);
                $this->addList($user_id,$URL,$site_name);
            }
        }

        /**
         * 增加一筆URL資料
         *
         * @param string $URL 網址
         * @return void
         */
        private function newURL($URL){
            $query = "INSERT INTO URL (HASH, URL) VALUES (:HASH, :URL)";
            $sth = $this->db->prepare($query);
            $sth->bindParam(':HASH', md5($URL));
            $sth->bindParam(':URL', $URL);
            $sth->execute();
        }

        /**
         * 檢查資料庫中是否存在傳入的網址
         *
         * @param string $URL 網址
         * @return int 若存在則回傳該網址之ID，若不存在則回傳 0
         */
        private function checkURL($URL){
            $query = "SELECT HASH,ID FROM URL WHERE HASH = :HASH";
            $sth = $this->db->prepare($query);
            $sth->bindParam(':HASH', md5($URL));
            $sth->execute();
            foreach($sth as $row){
                if($row['HASH'] == md5($URL) ){
                    return $row['ID'];
                }else{
                    return 0;
                }
            }
        }

        /**
         * 刪除 使用者-URL-網站名稱 的關聯資料
         *
         * @param string $user_id 使用者編號
         * @param string $URL 網址
         * @return void
         */
        public function deleteURL($user_id,$URL){
            $query = "DELETE FROM List WHERE UID = :user_id and URL_ID = :URL_ID";
            $sth = $this->db->prepare($query);
            $sth->bindParam(':user_id', $user_id);
            $sth->bindParam(':URL_ID', $this->checkURL($URL));
            $sth->execute();
        }
    }
?>
