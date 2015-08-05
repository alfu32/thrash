<?php

$gl_extensions=array('PDF','DOC','DOCX','TXT','RTF');
if(isset($_FILES['upl'])){
	//header ("Content-Type: text/html; charset=UTF-8");

	$extension = pathinfo($_FILES['upl']['name']['file'], PATHINFO_EXTENSION);
	if(!in_array(strtoupper($extension),$gl_extensions)){
		echo '{"file":"'.$_FILES['upl']['name']['file'].'","status":"NOK","reason":"file type not allowed"}';
		exit;
	}
	$cnt=@file_get_contents($_FILES['upl']['tmp_name']['file']);
	$file=fopen("uploads/".$_FILES['upl']['name']['file'],'w');
	fwrite($file,$cnt);
	fclose($file);
	$cnt2=file_get_contents("uploads/".$_FILES['upl']['name']['file']);
	if($cnt==$cnt2 && strlen($cnt)>0){
		echo '{"file":"'.$_FILES['upl']['name']['file'].'","status":"OK","bytes":"'.(strlen($cnt)).'","KBytes":"'.(strlen($cnt)/1024).'","MBytes":"'.(strlen($cnt)/1024/1024).'"}';
		exit;
	}
	echo '{"file":"'.$_FILES['upl']['name']['file'].'","status":"NOK","reason":"The '. ini_get('upload_max_filesize').'Bytes `upload_max_filesize` was exceeded."}';
	exit;
}