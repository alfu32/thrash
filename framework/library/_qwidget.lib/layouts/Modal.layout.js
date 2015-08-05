var ModalLayout = (function() {
    var CLASS = function ModalLayout() {
    	Base.call(this,['ModalLayout']);
        var _THIS = this;
        Widget.call(this);
        THIS.Parent.afterSet=function(parent){
        	parent.appendCHild(_THIS.View());
        }
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();