var WidgetStatic=function Widget(){
		this.measure=function(node,parent,next){
			var pn=parent.parentNode;
			if(pn==null)document.body.appendChild(parent);
			var m=[node.offsetLeft,node.offsetTop,node.offsetWidth,node.offsetHeight];
			if(pn==null)document.body.removeChild(parent);
			return m;
		}
		this.clearView=function Widget_ClearView(element){
			while(element.childNodes.length>0)
	            element.removeChild(element.childNodes[element.childNodes.length-1]);
			return this;
		};
		this.removeView=function Widget_HideView(widget){
			widget.Parent().removeChild(widget.View());
			widget.Parent(undefined);
			return this;
		};
		this.kill=function Widget_Kill(widgetRef){
			for(var selector in widgetRef.widget){
				delete widgetRef.widget[selector];
			}
			delete widgetRef.widget;
		};
		this.STRINGS={LANG:'ENG'}
		this.STRINGS_FETCH=function(_lang,labels){
			var d=SERVER.requestDictionary(
				'_PORTAL_get_translated_strings.php'
				,{
					cmd:'fetch_labels'
					,component:_lang
					,labels:"'"+labels.join("','")+"'"
				}
			)
			for(var i in d){
				if(i==undefined || d[i]==undefined)continue;
				this.STRINGS[i]=d[i];
			}
		}
		this.STRINGS.SELECTOR_FOR_VALUE=function(ref,value){
			var d=ref.STRINGS
			for(var i in d){
				if(d[i]==value){return i;}
			}
			return [d,value];
		}
	};
var Widget=(function(){
	var CLASS=function Widget(){
    	Base.call(this,['Widget']);
		var _THIS=this;
		this.View;
		this.Parent;
		this.Children;
		this.Visible;
		this.StyleSheet;
		this.append=function(child){
			if(arguments.length==0)return this;
			var children=_THIS.Children();
			if(child.name in children){return this;}
			children[child.name]=child.widget;
			return this;
		};
        
		QProperty.call(this,['WidgetClassName']);
		this.WidgetClassName('Widget');
		
		QProperty.call(this,['StyleSheet']);
		this.StyleSheet.afterSet=function(_styleString){
			document.head.appendChild(MAKE.style({innerText:_styleString}));
		};
		QProperty.call(this,['SetParentCss']);
			this.SetParentCss.afterSet=function(_styleObject){
		};
		_THIS.SetParentCss({});
		
		QProperty.call(this,['CSS']);
		this.CSS.afterSet=function(_styleObject){
			SET.css(_THIS.View(),_styleObject)
		};
		_THIS.SetParentCss({});
		
		
		QProperty.call(this,['Enabled']);
		_THIS.Enabled(true);
		this.Enabled.afterSet=function(state){
			_THIS.View().setAttribute('disabled',!state);
		};
		
		QProperty.call(this,['View']);
		QProperty.call(this,['Parent']);
		this.Parent.afterSet=function(_parent){
			_parent.appendChild(_THIS.View());
			SET.css(_parent,_THIS.SetParentCss())
		};
		QProperty.call(this,['Children']);
		
		QProperty.apply(this,['Visible']);
		this.renderView=function(){return _THIS;};
		this.Visible(true);
		this.Visible.afterSet=function(value){
			_THIS.View().style.display=value?'':'none';
		};
		this.show=function(){
			_THIS.Visible(true);
			return this;
		};
		this.hide=function(){
			_THIS.Visible(false);
			return this;
		};
		this.scroll=function(){
			_THIS.View().scrollIntoView();
			return this;
		};
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();