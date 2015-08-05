<?php

/**
 *
 * @author alferaru
 *
 */
CLASS File{
	/**
	 *
	 * @var string
	 */
	public $name="";
	/**
	 *
	 * @var string
	 */
	public $type="";
	/**
	 *
	 * @var string
	 */
	public $tmp_name="";
	/**
	 *
	 * @var uint
	 */
	public $error=0;
	/**
	 *
	 * @var uint
	 */
	public $size=0;

	/**
	 *
	 * @param $_FILES $FILES
	 */
	public function fromFILES($FILES) {
		$this->names=$_FILES['name'];
		$this->type=$_FILES['type'];
		$this->tmp_name=$_FILES['tmp_name'];
		$this->error=$_FILES['error'];
		$this->size=$_FILES['size'];
	}
	/**
	 *
	 * @param associative_array $ARRAY
	 */
	public function fromArray($ARRAY) {
		$this->names=$ARRAY['name'];
		$this->type=$ARRAY['type'];
		$this->tmp_name=$ARRAY['tmp_name'];
		$this->error=$ARRAY['error'];
		$this->size=$ARRAY['size'];
	}
	/**
	 *
	 * @param string $name
	 * @param string $type
	 * @param string $tmp_name
	 * @param uint $error
	 * @param uint $size
	 */
	public function __construct($name,$type,$tmp_name,$error,$size) {
		$this->names=$name;
		$this->type=$type;
		$this->tmp_name=$tmp_name;
		$this->error=$error;
		$this->size=$size;
	}
}