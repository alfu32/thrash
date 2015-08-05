<?php
	header ("Content-Type: text/plain; charset=UTF-8");
		//header("Content-Type: text/html;charset=utf-8");
	//header("Accept-Charset", "utf-8");
	header("Accept-Charset: utf-8");

	error_reporting(E_ERROR);
	include("library/_base.lib/Echo.class.php");
	include("library/_table.lib/Query.class.php");
	include "portail_lib.php";
if(isset($_GET['ext'])){
	$cnt=file_get_contents("image/mime-types/$_GET[size]/$_GET[ext]-128.png");
	
	//header ("Content-Type: image/png");
	//header ("Content-Disposition: attachement");
	
	//echo($cnt);
	
	//echo ('devlop/portail/image/mime-types/'.$_GET['ext'].'-128.png');
	//echo('data:image/png;base64,'.base64_encode($cnt));

	header ("Content-Type: text/html; charset=UTF-8");
	echo('<img src="data:image/png;base64,'.base64_encode($cnt).'"/>');
}
if(isset($_GET['rn'])){
	header ("Content-Type: text/html; charset=UTF-8");
	$basedir="image/mime-types/128/";
	$handle = opendir($basedir);
	while(false !== ($file = readdir($handle))){
		if(!is_dir($file)){
			$newname=str_replace('-128','',$file);
			//echo("rename $basedir$file $newname".'<br>');
			echo(rename("$basedir$file","$basedir$newname"));
			
		}
	}
}
