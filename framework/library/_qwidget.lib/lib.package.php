<?php 
include('widgets/lib.package.php');
include('layouts/lib.package.php');
$dir="portail/library/_qwidget.lib";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/QWidget.class.js' type='text/javascript'></script>";
	echo "<script src='$dir/HTMLTemplate.factory.js' type='text/javascript'></script>";
}else{
	echo file_get_contents("QWidget.class.js")."\n";
	echo file_get_contents("HTMLTemplate.factory.js")."\n";
}
?>