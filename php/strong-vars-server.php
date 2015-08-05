<?php
include('library.lib.php');
include('../library/_table/Queryi.class.php');

$DB_NAME='vars';
$DB_PASS='c0m4t0s3';
$DB_USER='root';
$DB_HOST='localhost';

$CON=mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME);

switch($_PARM['prop_cmd']){
case 'get' :
	getvar($_PARM['package'],$_PARM['name'],$_PARM['user']);
	break;
case 'set' :
	setvar($_PARM['package'],$_PARM['name'],$_PARM['value'],$_PARM['user']);
	break;
case 'getall' :
	getall($_PARM['package'],$_PARM['user']);
	break;
}
function getall($package,$user){
	global $_PARM;
	$query="SELECT 
		`V`.`package`,
		`V`.`name`,
		`V`.`value`,
		`V`.`user`
	FROM `vars` `V`
	WHERE  `V`.`package`='$package'
	AND `V`.`user`='$user';";
		//echo $query;
	echo Queryi::executeStatement($query);
	//die();
	//echo "GET:$package,$name,$user,$session_id,0";
}
function getvar($package,$name,$user){
	global $_PARM;
	$query="SELECT 
		`V`.`package`,
		`V`.`name`,
		`V`.`value`,
		`V`.`user`
	FROM `vars` `V`
	WHERE  `V`.`package`='$package'
	AND `V`.`name`='$name'
	AND `V`.`user`='$user';";
		//echo $query;
	echo Queryi::executeStatement($query);
	//die();
	//echo "GET:$package,$name,$user,$session_id,0";
}
function setvar($package,$name,$value,$user){
	global $_PARM;
	$query="
		INSERT INTO `vars`.`vars`(`package`,`name`,`value`,`user`) 
		VALUES ('$package','$name','$value','$user') 
		ON DUPLICATE KEY UPDATE 
		`vars`.`vars`.`package`=VALUES(`package`),
		 `vars`.`vars`.`name`=VALUES(`name`), 
		`vars`.`vars`.`value`=VALUES(`value`), 
		`vars`.`vars`.`user`=VALUES(`user`);";
		//echo $query;
	echo @Queryi::executeStatement($query);
	//die();
	//echo "SET:$package,$name,$user,$session_id,0";
}
?>
