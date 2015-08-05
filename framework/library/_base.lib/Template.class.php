<?
/**
 * 
 * usage $tpl=new Template("blablablablabla bla bla blablablablabla ##VARIABLE1## bla bla bla blablabla ##VARIABLE2##")
 * $instance1 = $tpl->getValueForData(array('VARIABLE1'=>'something','VARIABLE2'=>'SoMeThInG ElSe'))
 * $instance2 = $tpl->getValueForData(array('VARIABLE1'=>'nothing','VARIABLE2'=>'NoThInG ElSe'))
 * 
 * //$instance1 will be == "blablablablabla bla bla blablablablabla something bla bla bla blablabla SoMeThInG ElSe"
 * //$instance2 will be == "blablablablabla bla bla blablablablabla nothing bla bla bla blablabla NoThInG ElSe"
 */
 
class Template{
	
	private $_template;
	private $_data_object;
	
    public function __construct($string){
    	$this->_template=$string;
    	$this->_data_object=array();
    	$a=explode('##',$string);
    	$l=count($a);
    	for($i=0;$i<$l;$i+=2){
    		$this->_data_object[$a[$i]]=$a[$i];
    	}
    }
    public function getValueForData($data_object){
    	//create a copy of the template
    	$template=$this->_template."";
    	
    	//replace keys with values
    	$patterns = array_keys($data_object);
    	$replacements = array_values($data_object);
    	$l=count($patterns);
    	for($i=0;$i<$l;$i++){
    		$template = preg_replace("/".$patterns[$i]."/",$replacements[$i],$template);
    	}
    	return $template;
    }
    public function getEmptyDataObject(){
    	return $this->_data_object;
    }
}
function Template_test(){
	$tpl_string=urldecode($_GET["template"]);
	$data=explode('###',$_GET["data"]);
	
	$tpl=new Template($tpl_string);
	echo $tpl->getValueForData($data);
}
if($_GET['test']=='YES')Template_test();
?>