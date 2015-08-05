<?php
global $CON;
class Queryi {
	private $_query;
	function __construct($query){
		$this->_query=$query;
		//echo "built:'".$this->_query."'<br>";
	}
	function Parameters($paramsArray) {
		
	}
	public static function executeStatement($stmt,$row_SEPARATOR=";",$col_SEPARATOR="|"){
		$_query=new Queryi($stmt);
		$result=$_query->getArray($row_SEPARATOR,$col_SEPARATOR,'error','1024');
		return ($result["body"]);
	}
	function getArray($row_SEPARATOR=";",$col_SEPARATOR="|",$onerror_message,$error_code){
        global $CON;
		$response=array("headers"=>array(),"body"=>"");
		//echo "begin";
		$rs = mysqli_query ($CON,$this->_query);
		if ($rs){
			$response["body"]=("OK");
			$rows_count=0;
			$row_length=0;
			$array=array();
			while ($row=mysqli_fetch_row($rs))
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
			$response["headers"]["Response-Stat"]="OK";
			if($rows_count==0)$response["headers"]["Query"]=$this->_query;
			$response["headers"]["Content-Length"]=strlen ($response["body"]);
			$response["headers"]["Table-RowsCount"]=$rows_count;
			$response["headers"]["Table-RowLength"]=$row_length;
			$response["headers"]["Table-Separator-Row"]=$row_SEPARATOR;
			$response["headers"]["Table-Separator-Column"]=$col_SEPARATOR;
		}else{
            $onerrorMessage='';
            $error_code='100';
			$response["headers"]["Response-Stat"]="NOK";
			$response["headers"]["Response-Code"]=$error_code;
			$response["headers"]["Content-Length"]=3;
			$response["headers"]["Query"]=$this->_query;
			$response["body"]="NOK$row_SEPARATOR $onerrorMessage $col_SEPARATOR";
		}
        //if($response["body"]=='OK')$response["body"]='OK;';
		//$e=new _Echo();
		//$e->_string($response["headers"],$response["body"]);
		return $response;
	}
	function getAssoc($row_SEPARATOR=";",$col_SEPARATOR="|",$onerror_message,$error_code){
        global $CON;

		$response=array("headers"=>array(),"body"=>"");
		$columns=array();
		$rs = mysqli_query ($CON,$this->_query);
		if ($rs){
			$response["body"]=("OK");
			$rows_count=0;
			$row_length=0;
			while ($row=mysqli_fetch_assoc($rs))
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
