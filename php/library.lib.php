<?php

global $CON,$_PARM;
$_PARM = array_merge($_GET,$_POST);
global $DB_NAME,$DB_PASS,$DB_USER,$DB_HOST;

function old_session_is_registered($x)
{
    if (isset($_SESSION['$x']))
        return true;
    else
        return false;
}
function old_session_register($n,$val){
    $$n=$val;
    $_SESSION[$n] = $val;
}
function session_is_started(){
    return isset($_COOKIE["PHPSESSID"]);
}
function gen_rand_string($length,$charset){
    $chr=$charset;
    $chlen=strlen($chr);
    $str='';
    for($i=0;$i<$length;$i++){
        $str.=substr($chr,rand(0,$chlen-1),1);
    }
    return $str;
}
function gen_rand_guid($groups,$symbols_per_group,$symbols){
    $uuid='';
    for($i=0;$i<$groups-1;$i++){
        $uuid.=gen_rand_string($symbols_per_group,$symbols)."-";
    }
    $uuid.=gen_rand_string($symbols_per_group,$symbols);
    return $uuid;
}
?>
