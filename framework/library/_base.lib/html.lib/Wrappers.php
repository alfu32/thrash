<?php
function wrap($tag,$text){
	return "<$tag>$text</$tag>";
}
function unwrap($text){
	$l=strlen($text)-1;
	$c=strlen($text);
	$i=0;
	$c0=substr($text,$i,1);
	$c1=substr($text,$l,1);
	while(($c0!=">" || $c1!="<") && $l>=0 && $i<$cnt){
		
		$c0=substr($text,$i,1);
		$c1=substr($text,$l,1);
		
		if($c1!="<")$l--;
		if($c0!=">")$i++;
	}
	return "$i,$l";
}
function unwrap2($html){
	$c=strlen($html);
	$start=-1;$stop=-1;
	for ($i = 0; $i < $c; $i++) {
		if($start==-1 && substr($html,$i,1)==">"){$start=$i;}
		if($stop==-1 && substr($html,$c-1-$i,1)=="<"){$stop=$c-$i-1;}
		///echo "$i - >> ".substr($html,$c-$i-1,1)."<br>";
	}
	return substr($html,$start+1,$stop-$start-1);
}
class StringWrapper{
	public $str="";
	public $trarray=array();
	private $cache=array("already_built"=>false,"last_build"=>"");
	public function __construct($string){
		$this->str=$string;
		$this->cache['already_built']=true;
		$this->cache['last_build']=$string;
	}
	public function add($tag){
		$this->cache['already_built']=false;
		$this->trarray[]=$tag;
		return $this;
	}
	public function replace($tag){
		$this->cache['already_built']=false;
		$this->trarray[count($this->trarray)-1]=$tag;
		return $this;
	}
	public function build(){
		if ($this->cache['already_built']) {
			return $this->cache['last_build'];
		}
		$string=$this->str;
		$l=count($this->trarray)-1;
		for ($i=$l;$i>=0;$i--) {
			$tag=$this->trarray[$i];
			$string="<$tag>".$string."</$tag>";
		}
		$this->cache['already_built']=true;
		$this->cache['last_build']=$string;
		return $string;
	}
	public function __toString(){
		return $this->build();
	}
	
}
class ListWrapper{
	public $list=array();
	public $trarray=array();
	private $cache=array("already_built"=>false,"last_build"=>"");
	public function __construct($list){
		$this->list=$list;
		$this->cache['already_built']=true;
		$this->cache['last_build']=$list;
	}
	public function add($tag){
		$this->cache['already_built']=false;
		$this->trarray[]=$tag;
		return $this;
	}
	public function replace($tag){
		$this->cache['already_built']=false;
		$this->trarray[count($this->trarray)-1]=$tag;
		return $this;
	}
	public function build(){
		if ($this->cache['already_built']) {
			return $this->cache['last_build'];
		}
		
		$string="";$begin="";$end="";
		
		$array=$this->list;
		$l=count($this->trarray);
		for ($i=0;$i<$l;$i++) {
			$tag=$this->trarray[$i];
			$begin="$begin<$tag>";
			$end="</$tag>$end";
		}
		foreach ($array as $entity) {
			$string.="$begin$entity$end";
		}
		$this->cache['already_built']=true;
		$this->cache['last_build']=$string;
		return $string;
	}
	public function __toString(){
		return $this->build();
	}
}