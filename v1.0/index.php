<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Cookie,Accept');
header('Content-type: application/json');


require_once('users/user.php');
require_once('core/bd.php');
require_once('errorHendler.php');
require_once("app.php");


abstract class API {
    public $base;
    public $params;
    private $method;
    public $requestData;

    public function __construct($bd)
    {
        $this->base = $bd;
        $this->params = explode('/', $_GET['q']);
        $this->method = $_SERVER['REQUEST_METHOD'];
        if($_POST) {
            $this->requestData = $_POST;
        } else {
            $this->requestData = json_decode(file_get_contents("php://input"));
        }
        
    }

    public function GetMethod() {
        if($this->method == 'GET') {
            switch ($this->params[0]) {
                case 'getuser':
                    return 'GetUser';
                    break;
                case 'getuserdata':
                    return 'GetUserData';
                    break;
                case 'getcom':
                    return 'GetCom';
                    break;
                case 'getvac':
                    return 'GetVac';
                    break;
                case 'getvacid':
                    return 'GetVacId';
                    break;
                case 'getuuid':
                    return 'GetUuid';
                    break;
                case 'srch':
                    return 'Srch';
                    break;
                default:
                    MakeError("not params" , 404);
                    exit();
                    break;
            }
        } else if ($this->method == 'POST') {
            switch ($this->params[0]) {
                case 'regist':
                    return 'Regist';
                    break;
                
                case 'addprofile':
                    return 'ProfileAdd';
                    break;
                
                case 'addcomp':
                    return 'AddComp';
                    break;

                case 'creatinte':
                    return 'CreatInte';
                    break;

                case 'delinte':
                    return 'DelInte';
                    break;
                case 'compinte':
                    return 'CompInte';
                    break;
                case 'updtinte':
                    return 'UpdtInte';
                    break;
                case 'updtraiting':
                    return 'UpdtRaiting';
                    break;
                case 'getraiting':
                    return 'GetRaiting';
                    break;
                case 'israit':
                    return 'IsRait';
                    break;
                case 'addcom':
                    return 'AddCom';
                    break;
                case 'addportf':
                    return 'AddPortf';
                    break;
                case 'complitestud':
                    return 'CompliteStud';
                    break;
                case 'eompliteempl':
                    return 'CompliteEmpl';
                    break;
                case 'login':
                    return 'Login';
                    break;
                default:
                    MakeError("not params" , 404);
                    exit();
                    break;
            }
        }
    }


}




$app = new App($conn);

$app->StartApp();