<?php
include('adodb/adodb.inc.php');
$dbdriver="mysql";
$server="localhost";
$user="root";
$password="";
function RecursiveCopy($source, $dest, $diffDir = ''){ 
    $sourceHandle = opendir($source); 
    if(!$diffDir) 
            $diffDir = $source; 
    
    mkdir($dest . '/' . $diffDir,0777); 
    //echo 'mkdir('.$dest . '/' . $diffDir.',0777)<br>'; 
    
    while($res = readdir($sourceHandle)){ 
        //echo $res;
        if($res == '.' || $res == '..') 
            continue; 
        if(is_dir($source . '/' . $res)){ 
            RecursiveCopy($source . '/' . $res, $dest, $diffDir . '/' . $res); 
           // RecursiveCopy($source . '/' . $res, $dest, $diffDir . '/' . $res); 
        } else { 
            copy($source . '/' . $res, $dest . '/' . $diffDir . '/' . $res); 
            //echo 'copy('.$source . '/' . $res.','. $dest . '/' . $diffDir . '/' . $res.')<br>'; 
            
        } 
    } 
}
function createFiles($usr){
$base='./usr/'.$usr;
//mkdir($base,0777);
$template='./usr/template';
RecursiveCopy($template,'./usr',$usr);
}
function createUser($userData,$dbdriver,$server,$user,$password){
	$db = ADONewConnection($dbdriver);
	$db->Connect($server, $user, $password, 'simple3d');
	$values="'$userData[user]','$userData[password]','$userData[email]'";
	$result = $db->Execute("INSERT INTO `users`  ( `name` , `password` , `email`) VALUES ($values)");
	$result = $db->Execute("SELECT * FROM `user_data`  WHERE `userName`='template'");
	$array=$result->GetRows();
	$values=$array['textures'].','.$array['models'].','.$array['renderings'].','.$array['modelsServer'].','.$array['objectsServer'].','.$array['imagesServer'].','.$array['render'].',';
	$result = $db->Execute("INSERT INTO `user_data`  ( `textures`,`models`,`renderings`,`modelsServer`,`objectsServer`,`imagesServer`,`render` ) VALUES ($values)");
	createFiles($userData['user']);
}
function genSSID(){
return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
function getUserData($userData,$dbdriver,$server,$user,$password){
		$db = ADONewConnection($dbdriver);
        $db->Connect($server, $user, $password, $database);
		$result = $db->Execute("SELECT * FROM `users` WHERE (`name`='".$userData['user']."')");
		$array=$result->GetRows();
		$data=$array[0]['userID'];
		$SSID=genSSID();
		$result = $db->Execute("UPDATE `users` SET `loggedin`='$SSID' WHERE (`name`='".$userData['user']."')");
		$result = $db->Execute("SELECT * FROM `user_data` WHERE `userName`='".$userData['user']."'");
		$array=$result->GetRows();
		$array=$array[0];
		$servers="{'objects':'$array[objects]','textures':'$array[textures]','models':'$array[models]','renderings':'$array[renderings]','modelsServer':'$array[modelsServer]','objectsServer':'$array[objectsServer]','imagesServer':'$array[imagesServer]','render':'$array[render]'}";
		return "{'SSID':'$SSID','servers':$servers}";
}
function sendMail($to,$subject,$body){
 require_once "Mail.php";

        $from = "alferaru.ioan@gmail.com";
        //$to = "<to.yahoo.com>";
       // $subject = "Hi!";
        //$body = "Hi,\n\nHow are you?";

        $host = "ssl://smtp.gmail.com";
        $port = "465";
        $username = "register.simplecad@gmail.com";
        $password = "*c0m4t0s3*";

        $headers = array ('From' => $from,
          'To' => $to,
          'Subject' => $subject,
		  'Content-Type'=>'text/html; charset=ISO-8859-1\r\n');
        $smtp = Mail::factory('smtp',
          array ('host' => $host,
            'port' => $port,
            'auth' => true,
            'username' => $username,
            'password' => $password));

        $mail = $smtp->send($to, $headers, $body);

        if (PEAR::isError($mail)) {
          return ("{'mailermessage':'" . $mail->getMessage() . "'}");
         } else {
          return ("{'mailermessage':'success'}");
         }
}
function genPassword(){
$c='bcdfgklmnpqrstvxz';
$v='aeiou';
$sv='hjwy';
$p='';
for($i=1,$L=4;$i<$L;$i++){$p.=substr($c,mt_rand(0, 17),1).substr($v,mt_rand(0, 5),1).substr($sv,mt_rand(0, 4),1);}
return $p;
return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
function checkUser($udata,$dbdriver,$server,$user,$password,$database,$table){
        $db = ADONewConnection($dbdriver);
        $db->Connect($server, $user, $password, $database);
		
		$result = $db->Execute("SELECT * FROM `users` WHERE (`email`='".$udata['email']."')");
		$array=$result->GetRows();
		$invalid=true;
		$t=explode('@',$udata['email']);
		if($t[1]!==NULL){$v=explode('.',$t[1]);if($v[1]!==NULL){$invalid=false;}}
		$usedEmail=(count($array)>0)||$invalid;
        $userExists=false;
		$userLoggedin=false;
		$passwordCheck=false;
		$result = $db->Execute("SELECT * FROM `users` WHERE (`loggedin`='".$udata['SSID']."')");
		$array=$result->GetRows();
		$loggedin=(count($array)>0);
		
		$result = $db->Execute("SELECT * FROM `users` WHERE (`name`='".$udata['user']."')");
		$array=$result->GetRows();
		$userExists=count($array)>0;//($array[0]['name']==$udata['user']);
			if($userExists){$userLoggedin=($array[0]['loggedin']!=='out');//&&$userExists;
			$passwordCheck=($array[0]['password']==$udata['password']);//&&$userExists	;
			}
		$val=array('a'=>$userExists*1,'b'=>$userLoggedin*1,'c'=>$passwordCheck*1,'d'=>$usedEmail*1);
		$signInMessages=array('invalid name or password','already logged-in','login');
		$signUpMessages= array('use another email address','name already taken','signup');
		$logOutMessages= array('not logged-in','logged-in');
		$message= array('user'=>$udata['name'],'email'=>$udata['email'],'password'=>$udata['password']);
		$login=(!$userExists + $userExists * !$passwordCheck)*2+($userExists * $passwordCheck * $userLoggedin)*3+($userExists * !$userLoggedin * $passwordCheck)*4;
		$logout=(!$loggedin)*2+($loggedin)*3;
		$signup=(!$userExists && $usedEmail)*2+($userExists)*3+(!$userExists && !$usedEmail)*4;
		$message['login']=$signInMessages[$login-2];//." : $login";
		$message['signup']=$signUpMessages[$signup-2];//." : $signup";
		//$message['signup']=$signUpMessages[2];//." : $signup";
		$message['logout']=$logOutMessages[$logout-2];//." : $signup";
		//var_dump($message);
		return $message;
		
}
function logOutUser($SSID,$dbdriver,$server,$user,$password){
$ID=$SSID;
 $db = ADONewConnection($dbdriver);
        $db->Connect($server, $user, $password, 'simple3d');
		if($result = $db->Execute("UPDATE `users` SET `loggedin`='out' WHERE `loggedin`='$SSID'")){
			return "{ logout : 'succeded'}";
		} else {
		return "{ logout : 'failed' }";
		};
		
		
}
if(1==1){
$userData= array();
$userData['user']=$_GET['usr'];
$userData['password']=$_GET['pwd'];
$userData['email']=$_GET['mail'];
$userData['SSID']=$_GET['SSID'];
//var_dump($userData);
$cmd=$_GET['cmd'];
$chkUsr=checkUser($userData,$dbdriver,$server,$user,$password,'simple3d','users');
if($cmd=='login'){
	if($chkUsr['login']=='login'){
		$data=getUserData($userData,$dbdriver,$server,$user,$password);
		$echo="{status:'exists',data:$data}";
		}
	else {
		$echo= "{'status':'invalid' , 'error': '".$chkUsr['login']."' }";
		}
	}
if($cmd=='makeuser'){
	if($chkUsr['signup']=='signup'){
		$userData['password']=genPassword();
		createUser($userData,$dbdriver,$server,$user,$password);
		$SSID=genSSID($userData,$dbdriver,$server,$user,$password,'simple3d','users');
		$echo="{status:'created','SSID':'$SSID'}";
		$confaddress='http://http://94-224-114-25.access.telenet.be/authenticate/confirm-account-creation.php?';
		sendMail($userData['email'],'Simple3D Account Confirmation','<html><body>Dear '.$userData['user'].'<br> <br>Thank you for your subscription. <br> The last step is the confirmation of the account request at'.$confaddress.' .<br><br>Please note that your password is <u><b>'.$userData['password']."</b></u><br><br> With kind regards,<br><br> Ioan Alferaru <br><br> <b>simplecad s.r.l.</b> <br> Burdujeni 8<br> 032768 Bucharest<br> Romania<br>tel 0040722361909<br><br>Please disregard this message if it is not addressed to you</body></html>");
		$usrStr='New Registration<br>';foreach($userData as $i=>$v){$usrStr.='<b>'.$i.'</b>:'.$v.'<br>';}
		sendMail('info.simplecad@gmail.com','Simple3D Account Creation',"<html><body>$usrStr</body></html>");
	}
	else {
		$echo= "{'status':'invalid' , 'error': '".$chkUsr['signup']."' }";
	}
}
if($cmd=='logout'){
	if($chkUsr['logout']=='logged-in'){
		$data=logOutUser($userData['SSID'],$dbdriver,$server,$user,$password);
		$echo="{status:'logout',data:$data}";
	} else {
		$echo="{status:'invalid',error:$data}";
	}
}
echo $echo;
}
?>