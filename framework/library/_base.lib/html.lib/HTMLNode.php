<?php
class HTMLNode{
	public $text="";
	public $tagName="div";
	public $attributes;
	public $style;
	public $children=array();
	
	public function __construct($tag='div',$text){
		$this->tagName=$tag;
		$this->text=$text;
		$this->attributes=new AssociativeCollection();
		$this->style=new AssociativeCollection();
	}
	
	public function attributes($attrs){
		$this->attributes->setCollection($attrs);
		return $this;
	}
	public function style($style){
		$this->style->setCollection($style);
		return $this;
	}
	
	public function serialize_attributes(){
		$attrs=$this->attributes->collection;
		$string=array();
		foreach ($attrs as $K=>$V) {
			$string[]="$K=\"$V\"";
		}
		return implode(" ",$string);
	}
	public function serialize_style(){
		$style=$this->style->collection;
		$string=array();
		foreach ($style as $K=>$V) {
			$string[]="$K:$V;";
		}
		return implode(";",$string);
	}
	public function innerHTML(){
		$ihtml="<{$this->tagName} {$this->serialize_attributes()} style={$this->serialize_style()}>\n{$this->text}".chr(13);
		foreach ($this->children as $child){
			$ihtml.=chr(9).$child->innerHTML().chr(13);
		}
		$ihtml.="</{$this->tagName}>".chr(13);
		
		//return "<div>text ::{$this->text}</div>";
		return $ihtml;
	}
	public function innerText($text){
		$this->text=$text;
		return $this;
	}
	public function appendChild($child){
		$this->children[]=$child;
		return $this;
	}
	public function __toString(){
		return $this->innerHTML();
	}
}
