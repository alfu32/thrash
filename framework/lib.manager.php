<?php

include('library/__jstools_lib/JSMin.php');
include('library/__jstools_lib/JSLint.php');
/*echo JSMin::minify(file_get_contents('js/MAKE.js'));*/
$TEXTE_FR=PHP_EOL."
/*--------------------------------------------------------------------------------------------------
	// *********************************
	// * JSLIBRARY APPLICATION ENGINE *
	// *********************************
	// LIB.MANAGER VERSION: 1.0b
	// PORTAIL VERSION: 0.1
	// CONTEXT: DEV".PHP_EOL."
*/";
$LIBRARY=array(
    //'gmaps.api'=>array('path'=>'https://maps.googleapis.com/maps/api/js?signature=AIzaSyDP3mbkMsWQ2q_Zx-qKVmtCjfMPJvO2q3Q&sensor=false','depends'=>array(),'type'=>'js','status'=>'beta')
// accessories;NORM;MAKE;DO;GET;SET;HAS;REPORT;serialization;SERVER
	'Base'=>array('path'=>'library/_qsys.lib/Base.js','depends'=>array(''),'type'=>'js','status'=>'stable')
	,'xform'=>array('path'=>'library/__jstools_lib/xform.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
	,'gmaps.api'=>array('path'=>'library/_base.lib/serialization.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'ANIM'=>array('path'=>'library/_base.lib/anim.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'PACKAGE'=>array('path'=>'library/_base.lib/package.js','depends'=>array(),'type'=>'js','status'=>'beta')
    ,'accessories'=>array('path'=>'library/_base.lib/accessories.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'RANDOM'=>array('path'=>'library/_base.lib/RANDOM.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
    ,'Net'=>array('path'=>'library/_base.lib/Net.js','depends'=>array('Base','PACKAGE','QProperty','QConstantProperty'),'type'=>'js','status'=>'alpha')
    ,'NORM'=>array('path'=>'library/_base.lib/browser_normalization.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
    ,'NORM2'=>array('path'=>'library/_base.lib/browser_compat.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
    ,'MAKE'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
    ,'DO'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
    ,'GET'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'SET'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
    ,'HAS'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
    ,'REPORT'=>array('path'=>'library/_base.lib/dom_helper.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'serialization'=>array('path'=>'library/_base.lib/serialization.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'SERVER'=>array('path'=>'library/_base.lib/SERVER.js','depends'=>array('serialization','Base','PACKAGE'),'type'=>'js','status'=>'beta')
    ,'THREAD'=>array('path'=>'library/_base.lib/Thread.js','depends'=>array('QProperty','Base','PACKAGE'),'type'=>'js','status'=>'alpha')
    ,'XHR'=>array('path'=>'library/_base.lib/XHR.prototype.js','depends'=>array('QProperty','Base','PACKAGE'),'type'=>'js','status'=>'alpha')
// Iterator;CircularIterator;MatrixIterator
	,'Iterator'=>array('path'=>'library/_collections.lib/Iterators.unit.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'CircularIterator'=>array('path'=>'library/_collections.lib/Iterators.unit.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'MatrixIterator'=>array('path'=>'library/_collections.lib/Iterators.unit.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
	,'ArrayCatalog'=>array('path'=>'library/_collections.lib/Catalogs.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'DictCatalog'=>array('path'=>'library/_collections.lib/Catalogs.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
// Expression2;TimedInstructionSequence
	,'Expression2'=>array('path'=>'library/_compile.lib/Expression.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'TimedInstructionSequence'=>array('path'=>'library/_compile.lib/TimedInstructionSequence.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	//stacktrace;Console
	,'stacktrace'=>array('path'=>'library/_debug.lib/stacktrace.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'Console'=>array('path'=>'library/_debug.lib/Console.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'alpha')
// Color;FreeVector;Matrix2;Rectangle;System2;Transform2D;Transform2D;Vector
	,'Color'=>array('path'=>'library/_graphics.lib/Color.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'FreeVector'=>array('path'=>'library/_graphics.lib/FreeVector.js','depends'=>array('Base','PACKAGE','Vector','System2','Rectangle'),'type'=>'js','status'=>'stable')
	,'Matrix2'=>array('path'=>'library/_graphics.lib/Matrix2.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'Rectangle'=>array('path'=>'library/_graphics.lib/Rectangle.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'System2'=>array('path'=>'library/_graphics.lib/System2.js','depends'=>array('Base','PACKAGE','Vector'),'type'=>'js','status'=>'stable')
	,'Transform2D'=>array('path'=>'library/_graphics.lib/Transform2D.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'Vector'=>array('path'=>'library/_graphics.lib/Vector.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'COORD'=>array('path'=>'library/_graphics.lib/COORD.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
// Domain;Transform
	,'Domain'=>array('path'=>'library/_math.lib/functions.lib.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
	,'Transform'=>array('path'=>'library/_math.lib/functions.lib.js','depends'=>array('Base','PACKAGE','Domain'),'type'=>'js','status'=>'alpha')
// QObject;QProperty;QMethod;QList;QEnum;LinkedList;ServerSideEvents
	,'QObject'=>array('path'=>'library/_qsys.lib/QObject.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'QProperty'=>array('path'=>'library/_qsys.lib/QProperty.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'QConstantProperty'=>array('path'=>'library/_qsys.lib/QConstantProperty.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'SProperty'=>array('path'=>'library/_qsys.lib/StrongVar.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'QMethod'=>array('path'=>'library/_qsys.lib/QMethod.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'QList'=>array('path'=>'library/_qsys.lib/QList.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'QEnum'=>array('path'=>'library/_qsys.lib/QEnum.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'beta')
	,'LinkedList'=>array('path'=>'library/_qsys.lib/LinkedList.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'alpha')
	,'EXPOSE'=>array('path'=>'library/_qsys.lib/EXPOSE.js','depends'=>array('Base','PACKAGE','QProperty'),'type'=>'js','status'=>'alpha')
	,'ServerSideEvents'=>array('path'=>'library/_qsys.lib/ServerSideEvents.interface.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'abandoned')
	
	,'KEEP_CALLING'=>array('path'=>'library/_base.lib/CALL.js','depends'=>array('Base','PACKAGE','QProperty'),'type'=>'js','status'=>'alpha')
	,'XML'=>array('path'=>'library/_base.lib/XML.js','depends'=>array('Base','PACKAGE','serialization'),'type'=>'js','status'=>'alpha')
// HTMLTemplate;WidgetStatic;Widget
	,'WidgetStatic'=>array('path'=>'library/_qwidget.lib/QWidget.class.js','depends'=>array('Base','PACKAGE','QProperty','SERVER'),'type'=>'js','status'=>'beta')
	,'Widget'=>array('path'=>'library/_qwidget.lib/QWidget.class.js','depends'=>array('Base','PACKAGE','QProperty','WidgetStatic'),'type'=>'js','status'=>'beta')
	,'HTMLTemplate'=>array('path'=>'library/_qwidget.lib/HTMLTemplate.factory.js','depends'=>array('Base','PACKAGE','QProperty'),'type'=>'js','status'=>'alpha')
// CollapsableLayout;EditableTableLayout;FlexGridLayout;HListLayout;HLayout;VListLayout;VLayout;MultipageLayout
// SequenceLayout;HTabController;VTabController;SequenceController;HTabsLayout;VTabsLayout;TableLayout;VFlowGridLayout;
// WindowLayout
	,'CollapsableLayout'=>array('path'=>'library/_qwidget.lib/layouts/CollapsableLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'EditableTableLayout'=>array('path'=>'library/_qwidget.lib/layouts/EditableTableLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'FlexGridLayout'=>array('path'=>'library/_qwidget.lib/layouts/FlexGridLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'HListLayout'=>array('path'=>'library/_qwidget.lib/layouts/HListLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	,'HLayout'=>array('path'=>'library/_qwidget.lib/layouts/HListLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'VListLayout'=>array('path'=>'library/_qwidget.lib/layouts/VListLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	,'VLayout'=>array('path'=>'library/_qwidget.lib/layouts/VListLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'MultipageLayout'=>array('path'=>'library/_qwidget.lib/layouts/MultipageLayout.js','depends'=>array('Base','PACKAGE','Iterator','CircularIterator','SequenceLayout','SequenceController'),'type'=>'js','status'=>'stable')
	,'SequenceLayout'=>array('path'=>'library/_qwidget.lib/layouts/SequenceLayout.unit.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'HTabController'=>array('path'=>'library/_qwidget.lib/layouts/SequenceLayout.unit.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'VTabController'=>array('path'=>'library/_qwidget.lib/layouts/SequenceLayout.unit.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'SequenceController'=>array('path'=>'library/_qwidget.lib/layouts/SequenceLayout.unit.js','depends'=>array('Base','PACKAGE','Widget','Iterator'),'type'=>'js','status'=>'stable')
	,'HTabsLayout'=>array('path'=>'library/_qwidget.lib/layouts/TabbedLayout.unit.js','depends'=>array('Base','PACKAGE','SequenceLayout'),'type'=>'js','status'=>'stable')
	,'VTabsLayout'=>array('path'=>'library/_qwidget.lib/layouts/TabbedLayout.unit.js','depends'=>array('Base','PACKAGE','SequenceLayout'),'type'=>'js','status'=>'stable')
	,'TableLayout'=>array('path'=>'library/_qwidget.lib/layouts/TableLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'VFlowGridLayout'=>array('path'=>'library/_qwidget.lib/layouts/VFlowGridLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')
	,'WindowLayout'=>array('path'=>'library/_qwidget.lib/layouts/WindowLayout.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'stable')

	,'CollapsableLayout.css'=>array('path'=>'library/_qwidget.lib/layouts/CollapsableLayout.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'CollapsableLayout.css.ie'=>array('path'=>'library/_qwidget.lib/layouts/CollapsableLayout.lteie8.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'HListLayout.css'=>array('path'=>'library/_qwidget.lib/layouts/HListLayout.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'HListLayout.css.ie'=>array('path'=>'library/_qwidget.lib/layouts/HListLayout.lteie8.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'VListLayout.css'=>array('path'=>'library/_qwidget.lib/layouts/VListLayout.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'VListLayout.css.ie'=>array('path'=>'library/_qwidget.lib/layouts/VListLayout.lteie8.css','depends'=>array(),'type'=>'css','status'=>'beta')
// EditableTable;ListView;ListItemView;Popover;Progress;Selector;TableView;Title
// TableView.css;CollapsableLayout.css.ie;CollapsableLayout.css
	,'EditableTable'=>array('path'=>'library/_qwidget.lib/widgets/EditableTable.class.js','depends'=>array('Base','PACKAGE','Widget','SelectView','QEnum','TableView2'),'type'=>'js','status'=>'beta')
	,'EditableTable1'=>array('path'=>'library/_qwidget.lib/widgets/EditableTable1.js','depends'=>array('Base','PACKAGE','Widget','SelectView','QEnum','TableView2'),'type'=>'js','status'=>'beta')
	,'EditableTable2'=>array('path'=>'library/_qwidget.lib/widgets/EditableTable2.js','depends'=>array('Base','PACKAGE','Widget','SelectView','QEnum','TableView2'),'type'=>'js','status'=>'beta')
	,'TableControllerView'=>array('path'=>'library/_qwidget.lib/widgets/TableControllerView.js','depends'=>array('Base','PACKAGE','Table','Widget','SelectView','CalendarInput','QEnum','TableView2'),'type'=>'js','status'=>'beta')
	,'LifecycleViewer'=>array('path'=>'library/_qwidget.lib/widgets/LifecycleViewer.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'ListView2'=>array('path'=>'library/_qwidget.lib/widgets/ListView2.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'ListView'=>array('path'=>'library/_qwidget.lib/widgets/ListView.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'ListViewItems'=>array('path'=>'library/_qwidget.lib/widgets/ListViewItems.prototype.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'ListItemView'=>array('path'=>'library/_qwidget.lib/widgets/ListItemView.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	,'PivotView'=>array('path'=>'library/_qwidget.lib/widgets/PivotView.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'Popover'=>array('path'=>'library/_qwidget.lib/widgets/Popover.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'Progress'=>array('path'=>'library/_qwidget.lib/widgets/Progress.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'alpha')
	,'Selector'=>array('path'=>'library/_qwidget.lib/widgets/Selector.object.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'TableView'=>array('path'=>'library/_qwidget.lib/widgets/TableView.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'TableView2'=>array('path'=>'library/_qwidget.lib/widgets/TableView2.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'Title'=>array('path'=>'library/_qwidget.lib/widgets/Title.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	
	,'TableView.css'=>array('path'=>'library/_qwidget.lib/widgets/TableView.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'ListView.css'=>array('path'=>'library/_qwidget.lib/widgets/ListView.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'ListItemView.css'=>array('path'=>'library/_qwidget.lib/widgets/ListView.css','depends'=>array(),'type'=>'css','status'=>'beta')
// CheckboxGroupView;CheckboxView;EditableCell;EditableRow;FilterViewControl;ImageButton
// Menu;SelectView;ToolButton
// TableView.css
	,'CheckboxGroupView'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/CheckboxGroupView.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'CheckboxView'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/CheckboxView.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'EditableCell'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/EditableCell.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	,'EditableRow'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/EditableRow.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	,'FilterViewControl'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/FilterViewControl.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'alpha')
	,'ImageButton'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/ImageButton.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'ImageButton2'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/ImageButton.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'Menu'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/Menu.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'alpha')
	,'Menu2'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/Menu.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'alpha')	,'SelectView'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/SelectView.js','depends'=>array('Widget'),'type'=>'js','status'=>'beta')
	,'ToolButton'=>array('path'=>'library/_qwidget.lib/widgets/controlViews/ToolButton.class.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
// CalendarInput;GoogleMapInput;GoogleMap;OptionView;SliderView;TimeInput;TimeInput2;DateInput
// CalendarInput.css;CalendarInput.ltie8.css;GoogleMapInput.css;SliderView.css
	,'CalendarInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Calendar.input.js','depends'=>array('Base','PACKAGE','CALENDAR_UTILS','Month','Widget'),'type'=>'js','status'=>'beta')
	,'GoogleMap'=>array('path'=>'library/_qwidget.lib/widgets/input/GoogleMap.js','depends'=>array('Base','PACKAGE','gmaps.api','Widget'),'type'=>'js','status'=>'beta')
	,'GoogleMapInput'=>array('path'=>'library/_qwidget.lib/widgets/input/GoogleMapInput.js','depends'=>array('Base','PACKAGE','gmaps.api','Widget'),'type'=>'js','status'=>'beta')
	,'OptionView'=>array('path'=>'library/_qwidget.lib/widgets/input/OptionView.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'SliderView'=>array('path'=>'library/_qwidget.lib/widgets/input/SliderView.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'TimeInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Time.input.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'abandoned')
	
	,'FileInput'=>array('path'=>'library/_qwidget.lib/widgets/input/FileInput.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'SingleFileInput'=>array('path'=>'library/_qwidget.lib/widgets/input/FileInput.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
		
	,'TimeInput2'=>array('path'=>'library/_qwidget.lib/widgets/input/Time.input.js','depends'=>array('Base','PACKAGE','Widget'),'type'=>'js','status'=>'beta')
	,'DateInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Date.input.js','depends'=>array('Base','PACKAGE','Widget','CalendarInput','Popover'),'type'=>'js','status'=>'beta')
	,'CalendarInput.css'=>array('path'=>'library/_qwidget.lib/widgets/input/Calendar.input.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'CalendarInput.css.ie'=>array('path'=>'library/_qwidget.lib/widgets/input/Calendar.input.lteie8.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'OptionView.css'=>array('path'=>'library/_qwidget.lib/widgets/input/OptionView.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'OptionView.css.ie'=>array('path'=>'library/_qwidget.lib/widgets/input/OptionView.lteie8.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'SliderView.css'=>array('path'=>'library/_qwidget.lib/widgets/input/SliderView.css','depends'=>array(),'type'=>'css','status'=>'beta')
	,'GoogleMapInput.css'=>array('path'=>'library/_qwidget.lib/widgets/input/GoogleMapInput.css','depends'=>array(),'type'=>'css','status'=>'beta')
// advanced
	,'Calculator'=>array('path'=>'library/_qwidget.lib/widgets/advanced/Calculator.fragment.js','depends'=>array('Base','PACKAGE','Widget','Popover'),'type'=>'js','status'=>'beta')
	//,'FormFrame'=>array('path'=>'library/_qwidget.lib/widgets/advanced/FormFrame.js','depends'=>array('Widget','Popover'),'type'=>'js','status'=>'beta')
	,'ConfirmDialog'=>array('path'=>'library/_qwidget.lib/widgets/advanced/ConfirmDialog.js','depends'=>array('Base','PACKAGE','Widget','WindowLayout','ImageButton2'),'type'=>'js','status'=>'beta')
	,'NumberInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Number.input.js','depends'=>array('Base','PACKAGE','Widget','Popover','Calculator'),'type'=>'js','status'=>'beta')
	,'MailInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Mail.input.js','depends'=>array('Base','PACKAGE','Widget','Popover'),'type'=>'js','status'=>'beta')
	,'TextInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Text.input.js','depends'=>array('Base','PACKAGE','Widget','Popover'),'type'=>'js','status'=>'beta')
	,'TextareaInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Textarea.input.js','depends'=>array('Base','PACKAGE','Widget','Popover'),'type'=>'js','status'=>'beta')
	,'MapInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Map.input.js','depends'=>array('Base','PACKAGE','Widget','Popover','GoogleMapInput'),'type'=>'js','status'=>'beta')
	,'AddressInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Address.input.js','depends'=>array('Base','PACKAGE','Widget','Popover','GoogleMapInput'),'type'=>'js','status'=>'beta')
	,'PhoneInput'=>array('path'=>'library/_qwidget.lib/widgets/input/Phone.input.js','depends'=>array('Base','PACKAGE','Widget','Popover','GoogleMapInput'),'type'=>'js','status'=>'beta')
	,'File'=>array('path'=>'library/_base.lib/File.js','depends'=>array('Base','PACKAGE','Widget','Popover','GoogleMapInput'),'type'=>'js','status'=>'beta')
// CALENDAR_UTILS;ValidDay;InvalidDay;Month
	,'SearchBox'=>array('path'=>'library/_qwidget.lib/widgets/input/SearchBox.input.js','depends'=>array('Base','PACKAGE','Widget','Popover','GoogleMapInput'),'type'=>'js','status'=>'beta')
	,'CALENDAR_UTILS'=>array('path'=>'library/_time.lib/Calendar.class.js','depends'=>array('Base','PACKAGE','WidgetStatic'),'type'=>'js','status'=>'stable')
	,'ValidDay'=>array('path'=>'library/_time.lib/Calendar.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'InvalidDay'=>array('path'=>'library/_time.lib/Calendar.class.js','depends'=>array('Base','PACKAGE','ValidDay','InvalidDay'),'type'=>'js','status'=>'stable')
	,'Month'=>array('path'=>'library/_time.lib/Calendar.class.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'Meter'=>array('path'=>'library/_time.lib/Meter.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
	,'TIME'=>array('path'=>'library/_time.lib/TIME.js','depends'=>array('Base','PACKAGE'),'type'=>'js','status'=>'stable')
		
	,'Table'=>array('path'=>'library/_table.lib/Table.js','depends'=>array('Base','PACKAGE','QProperty'),'type'=>'js','status'=>'stable'));

error_reporting(E_ERROR);

$lib=$_GET['load'];
if(isset($_PARMS['all'])){
	//header('Content-Type:text/html');
	if($_PARMS['all']=='inline'){
		foreach($LIBRARY as $i => $libr){
			$tx=file_get_contents($libr['path']);
			if(isset($_PARMS['min'])){
				//$tx=JSMin::minify($tx);
			}
			if(isset($_PARMS['lint'])){
				echo "<br><br>/**************  LINT ****************/<br>".PHP_EOL;
				echo "/******** ".$libr['path']." */<br>".PHP_EOL;
				echo "/*************************************/<br>".PHP_EOL;
				$tx=JSLEngine::test($tx);
			}
			if($libr['type']=='js'){
				echo("<script type='text/javascript' id='$i'>");
				echo($tx);
				echo("</script>\n\r");
			}else{
				//echo("<style type='text/css' id='$i'>");
				//echo($tx);
				//echo("</style>");
			}
		}
	} else {
		/*echo '<!--';
		var_dump($LIBRARY);
		echo '-->';*/
		$_scriptlist=array();
		foreach($LIBRARY as $i => $libr){
			if($libr['type']=='js'){
				$_scriptlist[$libr['path']]=$libr['path'];
			}
		}
		foreach($_scriptlist as $libr){
			echo("<script rel='all-not-inline' type='text/javascript' src='".$libr."'>");
			echo("</script>\n\r");
		}
	}
}	else {
	//echo($lib);
	$libs=explode(";",$lib);
	
	
	/** build dependecy list */
	$dependencies=array();
	$files=array();
	foreach($libs as $l){
	    //echo implode("<br> LIB ",$LIBRARY[$l]['depends']);
	    if(isset($LIBRARY[$l])){
	        $lst=$LIBRARY[$l]['depends'];
	        foreach($lst as $i=>$val){
	            $dependencies[$i]=$val;
	        }
	        $dependencies[$l]=$l;
	    }
	}
	$fl="";
	$A=isset($_GET['type']);
	$B=false;$C=false;if($A){$B=$_GET['type']=='js';};if($A){$C=$_GET['type']=='css';}
	/**
		$address = "India+Panchkula";
		$url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=India";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		$response = curl_exec($ch);
		curl_close($ch);
		$response_a = json_decode($response);
		echo $lat = $response_a->results[0]->geometry->location->lat;
		echo "<br />";
		echo $long = $response_a->results[0]->geometry->location->lng;
	
	 */
	$filelist=array();
	foreach($dependencies as $index=>$lib_to_load){
		$filelist[$LIBRARY[$lib_to_load]['path']]=false;
	}
	foreach($dependencies as $index=>$lib_to_load){
		if($filelist[$LIBRARY[$lib_to_load]['path']])continue;
		try{
			if(!$A||$A&&!$C){
				if($LIBRARY[$lib_to_load]['type']=='js')
					$fl.=
					" $TEXTE_FR ".PHP_EOL
					.PHP_EOL."/**--------------------------------- $lib_to_load------------------------------------**/".PHP_EOL
					.PHP_EOL."// FILE :".$LIBRARY[$lib_to_load]['path'].PHP_EOL.PHP_EOL
					.file_get_contents($LIBRARY[$lib_to_load]['path']).PHP_EOL;
			}
			if($A&&!$B&&$C){
				if($LIBRARY[$lib_to_load]['type']=='css')
					$fl.="$TEXTE_FR".PHP_EOL
					.PHP_EOL."/**--------------------------------- $lib_to_load------------------------------------**/".PHP_EOL
					.PHP_EOL."/* FILE :".$LIBRARY[$lib_to_load]['path']."*/".PHP_EOL.PHP_EOL
					.file_get_contents($LIBRARY[$lib_to_load]['path']);
			}
		}catch(Exception $err){
			if(!$A||$A&&!$C)$fl.=PHP_EOL.PHP_EOL."alert('failed to load $lib_to_load, \n invalid path: \n ".$LIBRARY[$lib_to_load]['path']."')".PHP_EOL;
			if($A&&!$B&&$C)$fl.=PHP_EOL.PHP_EOL.".STYLE_LIBRARY_NOT_FOUND_$lib_to_load{}".PHP_EOL.PHP_EOL;
		}
		$filelist[$LIBRARY[$lib_to_load]['path']]=true;
	}
	$stl=count($fl);
	if(!$A||$A&&!$C)header('Content-Type:text/javascript');
	if($A&&!$B&&$C)header('Content-Type:text/css');
	//header('Content-Length: $stl');
	
	echo $fl;
}
?>
