<?php
$name=$_GET['img'];
function pad($n){
	if(trim($n)>100){return trim($n);}
	if(trim($n)>10){return '0'.trim($n);}
	return '00'.trim($n);
}
if(isset($_GET['img'])){
	$name=$_GET['img']."_icons";
}else{
	$name='._icons';
}
if(isset($_GET['type'])){
	$type=$_GET['type'].'_Icons';
}else{
	$type='1_Desktop_Icons';
}
if(isset($_GET['res'])){
	$res='icon_'.pad($_GET['res']).'.png';
}else{
	$res='icon_032.png';
}
/*$f=file_get_contents("/portail/image/icongen/$name/$type/$res");
header("Content-Type:image/png");
header("Content-Length: ".count($f));*/
header("File-Name:image/icongen/$name/$type/$res");
$remoteImage = "image/icongen/$name/$type/$res";
$imginfo = getimagesize($remoteImage);
header("Content-type: ".$imginfo['mime']);
$f=readfile($remoteImage);
echo $f;
?>