<?php 
$dir="portail/library/_qwidget.lib/widgets/input";
if(!isset($_GET['text_plain'])){
	echo "<script src='$dir/GoogleMapInput.js' type='text/javascript'></script>";
	echo "<script src='$dir/OptionView.js' type='text/javascript'></script>";
	echo "<script src='$dir/SliderView.js' type='text/javascript'></script>";
	echo "<script src='";echo include('Calendar.input.js.php');echo"' type='text/javascript'></script>";
}else{
	echo file_get_contents("GoogleMapInput.js")."\n";
	echo file_get_contents("OptionView.js")."\n";
	echo file_get_contents("SliderView.js")."\n";
	echo include('Calendar.input.js.php')."\n";
}
?>