<?php 
class Query {
	private $_query;
	public static $_ROW=";";
	public static $_COL="|";
	private static function id($t){return $t;}
	
	function __construct($query){
		$this->_query=$query;
		//echo "built:'".$this->_query."'<br>";
	}
	function Parameters($paramsArray) {
		
	}
	public static function executeStatement($stmt,$pref="OK",$row_SEPARATOR=";",$col_SEPARATOR="|"){
		$_query=new Query($stmt);
		$result=$_query->getArray(Query::$_ROW,Query::$_COL,$stmt,"99",$pref);
		return ($result["body"]);
	}
	public static function echoStatement($stmt,$field_transform,$pref="OK",$row_SEPARATOR=";",$col_SEPARATOR="|"){
		$_query=new Query($stmt);
		$result=$_query->get_php_array($field_transform);
		$return=array();
		foreach ($result as $r => $row) {
			$return[]=implode($col_SEPARATOR,$row);
		}
		return $pref.$row_SEPARATOR.implode($row_SEPARATOR,$return);
	}
	public static function get_array($stmt){
		$_query=new Query($stmt);
		return $_query->get_php_array();
	}
	
	public function get_php_array($transform){
		$_transform=isset($transform)?$transform:'Query::id';
		$response=array();
		//echo "begin";
		$rs = mysql_query ($this->_query);
		if ($rs){
			while ($row=mysql_fetch_row($rs)){
				foreach ($row as $c => $cell) {
					$row[$c]=call_user_func($_transform,$cell);
				};
				$response[]=$row;
			}
		}
		return $response;
	}
	public function getArray($row_SEPARATOR=";",$col_SEPARATOR="|",$stmt,$error_code,$OK="OK"){
		$response=array("headers"=>array(),"body"=>"");
		//echo "begin";
		$rs = mysql_query ($this->_query);
		if ($rs){
			$response["body"]=("$OK");
			$rows_count=0;
			$row_length=0;
			$array=array();
			while ($row=mysql_fetch_row($rs))
			{
				$response["body"].=$row_SEPARATOR;
				$array[$rows_count]=$row;
				$l=count($row);
				for ($i=0;$i<$l;$i++){
					if($rows_count>4){
						if($array[1][$i]=='text' || $array[1][$i]=='label' || $array[1][$i]=='field'){
							$response["body"].=tdentities($row[$i]);
						}else{
							$response["body"].=($row[$i]);
						}
					}else{
						$response["body"].=($row[$i]);
					}
					//echo $row[$i]."<br>";
					if($i<($l-1)){
						$response["body"].=$col_SEPARATOR;
					}
				}
				if($l>$row_length)$row_length=$l;
				$rows_count++;
			}
			$response["headers"]["Response-Stat"]="$OK";
			if($rows_count==0)$response["headers"]["Query"]=$this->_query;
			$response["headers"]["Content-Length"]=strlen ($response["body"]);
			$response["headers"]["Table-RowsCount"]=$rows_count;
			$response["headers"]["Table-RowLength"]=$row_length;
			$response["headers"]["Table-Separator-Row"]=$row_SEPARATOR;
			$response["headers"]["Table-Separator-Column"]=$col_SEPARATOR;
		}else{
			$response["headers"]["Response-Stat"]="N$OK";
			$response["headers"]["Response-Code"]=$error_code;
			$response["headers"]["Content-Length"]=3;
			$response["headers"]["Query"]=$this->_query;
			$onerrorMessage=$this->_query;
			$response["body"]="N$OK$row_SEPARATOR".mysql_errno ().'-'.mysql_error()."$row_SEPARATOR$onerrorMessage$row_SEPARATOR";
		}
		//$e=new _Echo();
		//$e->_string($response["headers"],$response["body"]);
		return $response;
	}
	function getAssoc($row_SEPARATOR=";",$col_SEPARATOR="|",$onerror_message,$error_code){
		$response=array("headers"=>array(),"body"=>"");
		$columns=array();
		$rs = mysql_query ($this->_query);
		if ($rs){
			$response["body"]=("OK");
			$rows_count=0;
			$row_length=0;
			while ($row=mysql_fetch_assoc($rs))
			{
				$response["body"].=$row_SEPARATOR;
				$l=count($row);
				$i=0;
				foreach($row as $index=>$value){
					//usleep(1);
					$response["body"].=($value);
					if($i<($l-1)){
						$response["body"].=$col_SEPARATOR;
					}
					
					$columns[$index]=$index;
					$i++;
				}
				if($l>$row_length){
					$row_length=$l;
				}
				$rows_count++;
			}
			$i=0;
			$l=count($columns);
			$columnString="";
			foreach($columns as $index=>$value){
				$columnString.=tdentities($value);
				if($i<($l-1)){
					$columnString.=$col_SEPARATOR;
				}
				$i++;
			}

			$response["headers"]["Response-Stat"]="OK";
			$response["headers"]["Content-Length"]=mb_strlen ($response["body"]);
			$response["headers"]["Table-ColumnNames"]=$columnString;
			$response["headers"]["Table-RowsCount"]=$rows_count;
			$response["headers"]["Table-RowLength"]=$row_length;
			$response["headers"]["Table-Separator-Row"]=$row_SEPARATOR;
			$response["headers"]["Table-Separator-Column"]=$col_SEPARATOR;
		}else{
			$response["headers"]["Response-Stat"]="NOK";
			$response["headers"]["Response-Code"]=$error_code;
			$response["headers"]["Content-Length"]=3;
			$response["headers"]["Query"]=$this->_query;
			$response["body"]=("NOK");
		}
		return $response;
	}
}
?>