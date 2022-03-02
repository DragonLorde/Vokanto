<?php
require_once("users/user.php");

class App extends API {

    private $methodName;

    public function StartApp() {
        $this->methodName = $this->GetMethod();
        $this->{$this->methodName}();
    }


    private function GetInfE($id) {
        //SELECT * FROM `employer` WHERE `user_id` = 
        $stmt = $this->base->prepare("SELECT * FROM `employer` WHERE `user_id` = ?");
        $stmt->execute( array( $id ) );
        $res = $stmt->fetch();
        return $res;
    }

    private function Srch() {
        $vacArr = []; 
        $id = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `internship` WHERE `name` LIKE CONCAT('%', ? , '%')");
        $stmt->execute( array( $id ) );
        while($row = $stmt->fetch()) {
            array_push($vacArr, array(
                "vac" => $row,
                "comp" => $this->GetCompVac($row['uuid']),
                "emp" => $this->GetInfE($row['emp_id'])
            ));
        }
        echo json_encode($vacArr, JSON_UNESCAPED_UNICODE);
    }

    private function GetUuid() {
        $id = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `id` = ?");
        $stmt->execute( array($id) );
        
        $res = $stmt->fetch();
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    private function GetVac() {
        //SELECT * FROM `internship`
        $vacArr = []; 
        $stmt = $this->base->prepare("SELECT * FROM `internship` ORDER BY `internship`.`date` DESC");
        $stmt->execute( );
        while($row = $stmt->fetch()) {
            array_push($vacArr, array(
                "vac" => $row,
                "comp" => $this->GetCompVac($row['uuid']),
                "emp" => $this->GetInfE($row['emp_id'])
            ));
        }
        echo json_encode($vacArr, JSON_UNESCAPED_UNICODE);
    }

    private function GetCompVac($uuid) {
        //SELECT * FROM `intem_comp` WHERE `intem_id` =
        $compArr = [];
        $stmt = $this->base->prepare("SELECT * FROM `intem_comp` WHERE `intem_id` = ?");
        $stmt->execute( array( $uuid ) );
        while($row = $stmt->fetch()) {
            array_push($compArr,  $this->GetComp($row['comp_id']));
        }
        return $compArr;
    }

    

    private function GetVacId() {
        //SELECT * FROM `internship`
        $vacArr = []; 
        $id = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `internship` WHERE `emp_id` = ?");
        $stmt->execute( array( $id ) );
        while($row = $stmt->fetch()) {
            array_push($vacArr, array(
                "vac" => $row,
                "comp" => $this->GetCompVac($row['uuid']),
                "emp" => $this->GetInfE($row['emp_id'])
            ));
        }
        echo json_encode($vacArr, JSON_UNESCAPED_UNICODE);
    }


    private function GetCom() {
        //SELECT * FROM `coments` WHERE `user_id` =
        $arrCom = [];
        $uuid = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `coments` WHERE `user_id` = ?");
        $stmt->execute( array( $uuid ) );
        while($res = $stmt->fetch()) {
            array_push($arrCom, $res);
        }
        echo json_encode($arrCom, JSON_UNESCAPED_UNICODE);
    }

    private function GetUser() {
        //SELECT * FROM `users` WHERE `uuid` = '607ba6bfe3763'
        $uuid = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `uuid` = ?");
        $stmt->execute( array( $uuid ) );
        $res = $stmt->fetch();
        echo json_encode($res);
    }

    private function GetUserData() {
        //SELECT * FROM `users` WHERE `uuid` = '607ba6bfe3763'
        $uuid = $this->params[1];
        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `uuid` = ?");
        $stmt->execute( array( $uuid ) );
        $res = $stmt->fetch();
        $type = $res['type'];
        $id = $res['id'];
        switch ($type) {
            case 1:
            $this->UserBd('SELECT * FROM `students` WHERE `user_id` = ?', $res, $id);        
                break;
            case 2:
            $this->UserBd('SELECT * FROM `employer` WHERE `user_id` = ?', $res, $id);        
                break;
            
        }
    }

    private function UserBd($q, $user, $id) {
        $stmt = $this->base->prepare($q);
        $stmt->execute( array( $id ) );
        $res = $stmt->fetch();
        $comp = $this->GetCompId($id);
        $data = array(
            "user" => $user,
            "data" => $res,
            "comp" => $comp 
        );
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    //SELECT * FROM `students_comp` WHERE `stud_id` = 4

    private function GetCompId($id) {
        $compArr = [];
        $stmt = $this->base->prepare("SELECT * FROM `students_comp` WHERE `stud_id` = ?");
        $stmt->execute( array( $id ) );
        while($res = $stmt->fetch()) {
            $rs = $this->GetComp($res['comp_id']);
            array_push($compArr, $rs);
        }
        return $compArr;
    }

    //SELECT * FROM `comp` WHERE `id` =

    private function GetComp($id) {
        $stmt = $this->base->prepare("SELECT * FROM `comp` WHERE `id` = ?");
        $stmt->execute( array( $id ) );
        $res = $stmt->fetch();
        return $res;
    }

    private function Regist() {
        $data = $this->requestData;
        $email = $data['email'];
        $pass = $data['pass'];
        $phone = $data['phone'];
        $type = $data['type'];
        if($this->IsUser($email, $phone)) {
            $uuid = uniqid();
            $stmt = $this->base->prepare("INSERT INTO `users`(`email`, `pass`, `phone`, `type`, `uuid`) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute( array( $email, $pass, $phone, $type, $uuid ) );
            if($stmt) {
                http_response_code(201);
                echo json_encode( 
                    array(
                        "uuid" => $uuid,
                        "status" => "true"
                    )
                 );
            }
        } else {
            MakeError("user not register" , 401);
        }
    }

    private function IsUser($email, $phone) {
        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `email` = ? AND `phone` = ?");
        $stmt->execute( array( $email, $phone));
        if(!$stmt->fetch()) {
            return true;
        }
            return false;
    }

    private function ProfileAdd() {
        $data = $this->requestData;
        $type = $this->GetType($data);
        switch ($type[0]) {
            case 1:
                Users::ProfileStud($data, $type[1], $this->base);
                break;
            case 2:
                Users::ProfilEmpl($data, $type[1], $this->base);
                break;
            case 3:
                Users::ProfileEdu($data, $type[1], $this->base);
                break;
            
        }
    }

    private function GetType($data) {
        $uuid = $data['uuid'];
        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `uuid` = ?");
        $stmt->execute( array( $uuid ) );
        $type = $stmt->fetch(PDO::FETCH_LAZY);
        return [$type['type'], $type['id']];
    }


    private function AddComp() {
        $data = $this->requestData;
        $name = $data['name'];
        $type = $data['type'];
        if($this->IsComp($name)) {
            $stmt = $this->base->prepare("INSERT INTO `comp`(`name`, `type`) VALUES (?, ?)");
            $stmt->execute( array( $name, $type ) );
            if($stmt) {
                echo json_encode(
                    array(
                        "status" => "true"
                    )
                );
            }
        } else {
            MakeError("false" , 404);
        }
    }

    private function IsComp($name) {
        $stmt = $this->base->prepare("SELECT * FROM `comp` WHERE `name` = ?");
        $stmt->execute( array( $name));
        if(!$stmt->fetch()) {
            return true;
        }
            return false;
    }

    private function CreatInte() {

        $data = $this->requestData;
        $name = $data['name'];
        $city = $data['city'];
        $pay = $data['pay'];
        $text = $data['text'];
        $resp = $data['resp'];
        $requ = $data['requ'];
        $cond = $data['cond'];
        $len = $data['len'];
        $date = date('d.m.y h:i:s');
        $emp_id = $this->GetType($data)[1];
        $count = 0;
        $uuid = uniqid();

        $comp = json_decode($data['comp'], true);

        $stmt = $this->base->prepare("INSERT INTO 
        `internship`( `name`, `city`, `pay`, `text`, `resp`, `requ`, `cond`, `len`, `date`, `emp_id`, `count`, `uuid`, `show`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute( array( $name, $city, $pay, $text, $resp, $requ, $cond, $len, $date, $emp_id, $count, $uuid, 1) );
        if($stmt) {
            foreach( $comp as $prop ) {
                $this->AddCompInte($uuid, $prop);
            }
            echo json_encode( 
                array(
                    "status" => "true"
                )
            );
        }

    }

    private function AddCompInte($id, $comp_id) {
        $stmt = $this->base->prepare("INSERT INTO `intem_comp`(`intem_id`, `comp_id`) VALUES (?, ?)");
        $stmt->execute( array( $id, $comp_id ) );
    }

    private function DelInte() {
        $data = $this->requestData;
        $id = $data['id'];

        $stmt = $this->base->prepare("DELETE FROM `internship` WHERE `id` = ?");
        $stmt->execute( array( $id ) );
        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }
    }


    private function AddCount($intern_id) {

        $stmt = $this->base->prepare("UPDATE `internship` SET `count` = `count` + 1 WHERE `id` = ?");
        $stmt->execute( array( $intern_id ));
    }

    private function CompInte() {
        $data = $this->requestData;
        $stud_id = $data['stud_id'];
        $empl_id = $data['empl_id'];
        $satus = 0;
        $intern_id = $data['intern_id'];
        $progress = $data['progress'];

        
        if($this->IsInte($stud_id)) {
            $stmt = $this->base->prepare("INSERT INTO `user_intern`(`stud_id`, `empl_id`, `satus`, `intern_id`, `progress`) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute( array( $stud_id, $empl_id, $satus, $intern_id, $progress));
            if($stmt) {
                $this->AddCount($intern_id);
                echo json_encode(
                    array(
                        "status" => "true"
                    )
                );
            } 
        } else {
            MakeError("not data", 404);
        }
    }

    private function IsInte($stud_id) {
        $stmt = $this->base->prepare("SELECT * FROM `user_intern` WHERE `stud_id` = ?");
        $stmt->execute( array( $stud_id));
        if(!$stmt->fetch()) {
            return true;
        }
            return false;
    }

    private function UpdtInte() {
        $data = $this->requestData;
        $progress = $data['prog'];
        $intern_id = $data['id'];

        $stmt = $this->base->prepare("UPDATE `user_intern` SET `progress`=  ? WHERE `id` = ?");
        $stmt->execute( array($progress, $intern_id));
        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }

    }

    private function UpdtRaiting() {
        $data = $this->requestData;
        $user_id = $data['user_id'];
        $guest_id = $data['guest_id'];
        $mark = $data['mark'];

        $stmt = $this->base->prepare("INSERT INTO `raiting`( `user_id`, `guest_id`, `mark`) VALUES (?, ?, ?)");
        $stmt->execute( array($user_id, $guest_id, $mark));
        if($stmt) {
            $this->GetRaiting();
        }
        
    }

    private function GetRaiting() {

        $data = $this->requestData;
        $user_id = $data['user_id'];


        $stmtDis = $this->base->prepare("SELECT COUNT(`mark`) FROM `raiting` WHERE `user_id` = ? AND `mark` = 0");
        $stmtDis->execute( array($user_id));
        $dis = $stmtDis->fetch()['COUNT(`mark`)'];

        $stmtLike = $this->base->prepare("SELECT COUNT(`mark`) FROM `raiting` WHERE `user_id` = ? AND `mark` = 1");
        $stmtLike->execute( array($user_id));
        $like = $stmtLike->fetch()['COUNT(`mark`)'];
        $res = ($like + $dis) / $dis;
        $cnt = $this->CountRait();
        if($cnt > 9) {
            if($res <= 0) {
                echo json_encode(
                    array(
                        "status" => "true",
                        "raiting" => 0
                    )
                );
            } else if($res >= 10) {
                echo json_encode(
                    array(
                        "status" => "true",
                        "raiting" => 10
                    )
                );
            } else {
                echo json_encode(
                    array(
                        "status" => "true",
                        "raiting" => round($res, 0)
                    )
                );
            }
        } else {
            echo json_encode(
                array(
                    "status" => "true",
                    "raiting" => 'Недостаточно оценок'
                )
            );
        }
    }

    private function CountRait() {
        $data = $this->requestData;
        $user_id = $data['user_id'];

        $stmt = $this->base->prepare("SELECT COUNT(*) FROM `raiting` WHERE `user_id` = ?");
        $stmt->execute( array($user_id));
        $count = $stmt->fetch()['COUNT(*)'];
        return $count;
    }

    private function IsRait() {
        $data = $this->requestData;
        $user_id = $data['guest_id'];

        $stmt = $this->base->prepare("SELECT * FROM `raiting` WHERE `guest_id` = ? ");
        $stmt->execute( array($user_id));
        $res = $stmt->fetch();
        echo json_encode($res);
    }

    private function AddCom() {
        $data = $this->requestData;
        $name = $data['name'];
        $text = $data['text'];
        $user_id = $data['user_id'];

        $stmt = $this->base->prepare("INSERT INTO `coments`( `name`, `text`, `user_id`) VALUES (?, ?, ?)");
        $stmt->execute( array($name, $text, $user_id));

        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }


    }

    private function AddPortf() {
        $data = $this->requestData;
        $user_id = $data['user_id'];
        $avatar = $data['avatar'];
        $text = $data['text'];

        $stmt = $this->base->prepare("INSERT INTO `portf`( `user_id`, `avatar`, `text`) VALUES (?, ?, ?)");
        $stmt->execute( array($user_id, $avatar, $text));

        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }
    }

    private function CompliteStud() {
        $data = $this->requestData;
        $status = $data['status'];
        $id = $data['id'];

        $stmt = $this->base->prepare("UPDATE `students` SET `status`= ? WHERE `id` = ?");
        $stmt->execute( array($status, $id));

        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }
    }

    private function CompliteEmpl() {
        $data = $this->requestData;
        $status = $data['status'];
        $id = $data['id'];

        $stmt = $this->base->prepare("UPDATE `employer` SET `status`= ? WHERE `id` = ?");
        $stmt->execute( array($status, $id));

        if($stmt) {
            echo json_encode(
                array(
                    "status" => "true"
                )
            );
        }
    }

    private function Login() {
        $data = $this->requestData;
        $email = $data['email'];
        $pass = $data['pass'];

        $stmt = $this->base->prepare("SELECT * FROM `users` WHERE `email` = ? AND `pass` = ?");
        $stmt->execute( array($email, $pass));
        $res = $stmt->fetch();
        if($res) {
            echo json_encode(
               $res 
            );
        }
    }
}