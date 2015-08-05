<?php 

$ECHO="";
if(!isset($_GET['text_plain'])){
	$ECHO.="<script src='library/_base.lib/QObject.class.js' type='text/javascript'></script>";
	$ECHO.="<script src='library/_base.lib/QProperty.class.js' type='text/javascript'></script>";
	$ECHO.="<script src='library/_base.lib/QList.class.js' type='text/javascript'></script>";
	$ECHO.="<script src='library/_base.lib/QMethod.class.js' type='text/javascript'></script>";
	$ECHO.="<script src='library/_base.lib/QEnum.class.js' type='text/javascript'></script>";
	$ECHO.="<script src='library/_base.lib/LinkedList.class.js' type='text/javascript'></script>";

	$ECHO.="<script src='";echo file_get_contents('ServerSideEvents.interface.js');echo"' type='text/javascript'></script>";
}else{
	$ECHO.=file_get_contents("QObject.class.js")."\n";
	$ECHO.=file_get_contents("QProperty.class.js")."\n";
	$ECHO.=file_get_contents("QList.class.js")."\n";
	$ECHO.=file_get_contents("QMethod.class.js")."\n";
	$ECHO.=file_get_contents("QEnum.class.js")."\n";
	$ECHO.=file_get_contents("LinkedList.class.js")."\n";
	$ECHO.=file_get_contents('ServerSideEvents.interface.js')."\n";
	
	header('Content-Type:application/x-javascript');
}
echo $ECHO;
?>