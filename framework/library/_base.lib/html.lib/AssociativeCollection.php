<?php
class AssociativeCollection{
	public $collection=array();
	public function setCollection($array){
		foreach ($array as $key=>$value){
			$this->collection[$key]=$value;
		}
		return $this;
	}
	public function getCollection($array){
		return $this->collection;
	}
}
