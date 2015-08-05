<?php
/* 
echo "<script type='text/javascript'>";
if($_GET['all'] || $_GET['browser_compat']){
	echo file_get_contents("library/_base.lib/browser_compat.lib.js");
}
if($_GET['all'] || $_GET['dom_helper']){
	echo file_get_contents("library/_base.lib/dom_helper.lib.js");
}
if($_GET['all'] || $_GET['serialization']){
	echo file_get_contents("library/_base.lib/serialization.lib.js");
}
echo "</script>";
*/

$ECHO="";
if(!isset($_GET['text_plain']))$ECHO="<script type='text/javascript'>";
else header('Content-Type:application/x-javascript');
$ECHO.=file_get_contents("browser_compat.lib.js")."\n";
$ECHO.=file_get_contents("browser_normalization.lib.js")."\n";
$ECHO.=file_get_contents("dom_helper.lib.js")."\n";
$ECHO.=file_get_contents("serialization.lib.js")."\n";
$ECHO.=file_get_contents("SERVER.js")."\n";
if(!isset($_GET['text_plain']))$ECHO.="</script>";
echo $ECHO;
?>