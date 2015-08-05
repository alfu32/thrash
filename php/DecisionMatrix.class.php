<?php
class Runnable{
	private $runnable/*=function(){echo 'Runnable not defined'}*/;
	public function __construct($runnable){
		$this->runnable=$runnable;
	}
	public function run($args){
		return $this->runnable($args);
	}
}
class DecisionMatrix{
	public $conditions=array();
	public $actions=array();
	public function __construct($conditions_count,$action_for_codes,$default){
		$max=pow(2,$conditions_count);
		for($i=0;$i<$max;$i++){
			$this->actions[$i]=$default;
		}
		foreach($action_for_codes as $codes=>$action){
			$code_array=explode(',',$codes);
			foreach($code_array as $code){
				$this->actions[$code]=$action;
			}
		}
	}
}
$test=new DecisionMatrix(
	3
	,array(
		'0'=>function(){echo 'not (test1 OR test2 OR test3)<br>';},
		'1,2,3'=>function(){echo 'test1 OR test2 OR (test1 AND test2)<br>';},
		'4,5'=>function(){echo 'test2 OR (test1 AND test3)<br>';}
	)
	,function(){echo 'default<br>';}
);

$test->actions[0]();
$test->actions[1]();
$test->actions[2]();
$test->actions[3]();
$test->actions[4]();
$test->actions[5]();
$test->actions[6]();
$test->actions[7]();
