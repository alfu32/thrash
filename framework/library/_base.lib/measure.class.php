<?php
class measure {
	public $start;
	public $time;
	public $last_time;
	public $ontimechanged;
	public $buffer;
	private $last_message;
	public static $DECIMAL_PLACES=3;
	
	private function diff($t1,$t2){
		return ((integer)(pow(10,self::$DECIMAL_PLACES+1)*($t2-$t1)))/pow(10,self::$DECIMAL_PLACES+1);
	}
	public function __construct() {
		$this->last_message=null;
		$this->start=1*microtime(true);
		$this->last_time=1*microtime(true);
		$this->buffer[]=(($this->start)/1).";;started";
	}
	public function Time($message) {
		$this->time=1*microtime(true);
		
		if($this->last_message!==null){
			$this->buffer[]="----- [ ".$this->diff($this->start,$this->time)."; diff ".$this->diff($this->last_time,$this->time)." ]";
			$this->buffer[] = "END ".($this->last_message).' @'.$this->time;
			$this->buffer[] = "";
		}
		$this->buffer[]="BEGIN  ".$message.' @'.$this->time;
		$this->last_time=$this->time;
		
		$this->last_message=$message;
		return $this;
	}
	public function end() {
		$this->Time("end measure :: ");
		$this->time=microtime(true);
		$this->buffer[]=(microtime(true)).";;ended";
		$this->buffer[]=$this->diff($this->start,microtime(true))."ms;;total";
		return $this;
	}
	public function report_html() {
		return "<div>".implode('<br>',$this->buffer)."</div>";
	}
}