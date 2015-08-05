<?php 
$dir="portail/library/_qwidget.lib/layouts";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/CollapsableLayout.js' type='text/javascript'></script>";
	echo "<script src='$dir/VListLayout.js' type='text/javascript'></script>";
	echo "<script src='$dir/HListLayout.js' type='text/javascript'></script>";
}else{
	echo file_get_contents("$cdir/CollapsableLayout.js")."\n";
	echo file_get_contents("$cdir/VListLayout.js")."\n";
	echo file_get_contents("$cdir/HListLayout.js")."\n";
}
?>