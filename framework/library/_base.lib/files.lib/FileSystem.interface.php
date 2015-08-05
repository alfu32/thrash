<?php
/**
 * 
 * @author alferaru
 *
 */
interface FileSystem{
	/**
	 * 
	 * @param string $path
	 * @param boolean $deep
	 */
	public function ls($path="",$deep=false);
	/**
	 * 
	 * @param string $path
	 */
	function isdir($path="");
	/**
	 * 
	 * @param string $path
	 */
	public function file_get_contents($path="");
	/**
	 * 
	 * @param string $path
	 */
	public function file_put_contents($path="");
}