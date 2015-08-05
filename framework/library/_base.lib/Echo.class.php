<?php 
class _Echo {
	public static function chunked($string,$chunk_size=2048){
		$echoarray=str_split($string,$chunk_size);
		foreach ($echoarray as $echo){
			echo $echo;
		}
	}
	function encode($string){
		return $string;
	}
	function parseUtf8ToIso88591(&$string){
		 if(!is_null($string)){
				$iso88591_1 = utf8_decode($string);
				$iso88591_2 = iconv('UTF-8', 'ISO-8859-1', $string);
				$string = mb_convert_encoding($string, 'ISO-8859-1', 'UTF-8');       
		 }
	}
	private $BODY="";
	private $HEAD=array();
	function add_header($key,$val){
		$HEAD[$key]=$val;
	}
	function add_headers($array){
		foreach($array as $name => $value){
			$HEAD[$name]=$value;
		}
	}
	function add_string($string){
		$BODY.=$string;
	}
	function add_query($_query){
		$result=$_query->getArray(";","|");
		foreach($result["headers"] as $name => $value){
			$HEAD[$name]=$value;
		}
		$BODY.=$result["body"];
	}
	function add_file($filename){
		$file=new SplFileInfo($filename);
		$body=file_get_contents($filename);
		//$HEAD['Content-Type']='text/html; charset=utf-8';
		$HEAD["Content-Length"]=mb_strlen ($body);
		//$HEAD["charset"]='utf-8';
		$BODY.=$body;
	}
	function DUMP(){
		foreach($HEAD as $name => $value){
			header("$name: $value");
		}
		//header("Content-Type: text/html; charset=utf-8");
		//header("Charset: ISO-8859-1,utf-8");
		//header("Accept-Charset: ISO-8859-1,utf-8");
		echo encode($BODY);
	}
	function json($array){
		$i=0;
		$l=count($array);
		$jsonString="{";
		foreach($array as $index=>$value){
			//echo $value;
			$jsonString.="'$index':";
			if (is_array($value)) {
				$jsonString.=$this->json($value);
			}else{
				$jsonString.="'$value'";
			}
			if($i<($l-1)){
				$jsonString.=",";
			}
			$i++;
		}
		$jsonString.="}";
		return $jsonString;
	}
	function _string($headers,$body){
		foreach($headers as $name => $value){
			header("$name:$value");
		}
		//header("Content-Type: text/html; charset=utf-8");
		//header("Charset: ISO-8859-1,utf-8");
		//header("Accept-Charset:ISO-8859-1,utf-8");
		echo encode($body);
	}
	function _query($_query){
		$result=$_query->getArray(";","|");
		foreach($result["headers"] as $name => $value){
			header("$name:$value");
		}
		//header("Content-Type: text/html; charset=utf-8");
		//header ("Content-Type: text/html; charset=ISO-8859-15,utf-8");
		//header("Charset: ISO-8859-1,utf-8");
		//header("Accept-Charset: ISO-8859-1,utf-8");
		echo encode($result["body"]);
		return;
	}
	
	function _json($array){
		//$headers=array("Content-Type"=>"application/json",'charset'=>'utf-8');
		$body=$this->json($array);
		$this->_string($headers,$body);
	}
	function _file($filename){
		$file=new SplFileInfo($filename);
		$body=file_get_contents($filename);
		//$headers=array("Content-Length"=>mb_strlen ($body),'charset'=>'utf-8');
		$this->_string($headers,$body);
	}
}
?>