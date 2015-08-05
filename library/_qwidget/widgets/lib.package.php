<?php 
include('controlViews/lib.package.php');
include('input/lib.package.php');
$dir="/portail/library/_qwidget.lib/widgets";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/TableView.js' type='text/javascript'></script>";
}else{
	echo file_get_contents("TableView.js")."\n";
}
?>