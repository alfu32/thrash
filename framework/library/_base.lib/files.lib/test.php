<?php
	header("Content-Type: text/html; charset:ISO-8859-1"); 
	error_reporting(E_ALL);
	include_once '../../../library/_base.lib/measure.class.php';
	include_once '../../../library/_base.lib/files.lib/FileSystem.interface.php';
	include_once '../../../library/_base.lib/files.lib/File.class.php';
	include_once '../../../library/_base.lib/files.lib/MSFileSystem.php';
	include_once '../../../library/_base.lib/html.lib/Wrappers.php';
	include_once '../../../library/_base.lib/html.lib/AssociativeCollection.php';
	include_once '../../../library/_base.lib/html.lib/HTMLNode.php';
	
	if(isset($_GET['dir'])){
		$up=explode('\\',$_GET['dir']);
		$up=array_splice($up,0,count($up)-1);
		$up=implode('\\',$up);
		
		$dir=addcslashes($_GET['dir'],"\0..\37!@\177..\377");

		$back=new HTMLNode('a','back');
		$back->attributes(array("href"=>"test.php?dir=$up"))
		->style(array("background-color"=>'#EFEF44'));
		
	}else{
		$back=new HTMLNode('div','');
		$dir="\\\\devlop\\wwwroot\\portail\\library";
	}
	$m=new measure();
	$fs=new MSFileSystem($dir);
	$fs->TEMP="\\\\devlop\\wwwroot\\portail\\tmp";
	
	
	if(!isset($_GET['download'])){
		//// LIST FILES
		$list=$fs->ls("",false);
				
		$d=new ListWrapper($list);
		$d->add('tr')->add('td')->add('b')->add('span');
		$e=new StringWrapper($d->build());
		$e->add('table')->add('tbody');
		//echo $e;

		error_reporting(E_ALL);
		$table=new HTMLNode('table','');
		$tbody=new HTMLNode('tbody','');
		$table->appendChild($tbody);
		
		$tbody->attributes(array("id"=>"list","class"=>"file listing","align"=>"left"))
			->style(array("padding"=>"5px"));
		
			foreach ($list as $value) {
				$tr=new HTMLNode('tr','');
				$td=new HTMLNode('td','');
				$td->attributes(array("class"=>"file","align"=>"left","title"=>"$value"))
					->style(array("margin"=>"1px","cursor"=>"pointer"));
				if(($fs->isdir($value))==0){
					$a=new HTMLNode('a',end(explode('\\',$value)));
					$a->attributes(array("href"=>"test.php?download=$value","type"=>'file'));
				}else{
					$a=new HTMLNode('a',end(explode('\\',$value)));
					$a->attributes(array("href"=>"test.php?dir=$value"));
					$a->style(array("background-color"=>'#EFEF44'));
				}
				$td->appendChild($a);
				$tr->appendChild($td);
				$tbody->appendChild($tr);
				
			}
		$m->Time('end');
		$stat=new HTMLNode('div',"listed ".(count($list))." files in ".(($m->time)-($m->start))." seconds");
		$stat->style(array("font-size"=>"10px"));
		echo $back->innerHTML();
		echo $stat->innerHTML();
		echo $table->innerHTML();
	}else{
		//// download file
		$file=$fs->get_file($_GET['download']);
		$asd=file_get_contents($file['tmp_name']);
		//var_dump($file);
		
		header("File:".serialize($file).";");
		header("Content-Type:$file[mime];");
		header("Aham: type '$file[tmp_name]';");
		header("Content-Disposition: inline; filename=\"".$file['name']."\";");
		echo( ($asd));
	}
