<?php 
$dir="portail/library/_qwidget.lib/widgets/controlViews";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/CheckboxGroupView.js' type='text/javascript'></script>";
	echo "<script src='$dir/CheckboxView.js' type='text/javascript'></script>";
}else{
	echo file_get_contents("CheckboxGroupView.js")."\n";
	echo file_get_contents("CheckboxView.js")."\n";
}
?>