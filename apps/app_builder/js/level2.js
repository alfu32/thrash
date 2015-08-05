var AbstractBinding=(function(){
    var CLASS=function AbstractBinding(){
        QProperty.call(this,['Targets']);
    }
    return CLASS;
})();

var AbstractView=(function(){
    var CLASS=function AbstractView(){
        QProperty.call(this,['Context']);
        var _VIEW=this;
        this.onViewChanged=function(){}
    }
    return CLASS;
})();
var QPropertyView=(function(){
    var CLASS=function QPropertyView(){
        var _PROPERTY_VIEW=this;
        var expanded=true;
        this.unit=window;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="property view">'
                +'<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">beforeGet<div class="smallLink"></div></div>'
                +'<textarea>##CODE_BEFORE_GET##</textarea>'
                +'<div class="smallTitle">beforeSet<div class="smallLink"></div></div>'
                +'<textarea>##CODE_BEFORE_SET##</textarea>'
                +'<div class="smallTitle">afterSet<div class="smallLink"></div></div>'
                +'<textarea>##CODE_AFTER_SET##</textarea>'
                +'</div>' +
                '</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px"><span class="ubct_identifier">QProperty</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span class="ubct_support ubct_function">call</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_storage ubct_type">this</span><span'
                +' class="ubct_punctuation ubct_operator">,</span><span class="ubct_paren ubct_lparen">[</span>\'<span'
                +' class="ubct_string">##NAME##</span>\'<span class="ubct_paren ubct_rparen">])</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>'
                +'<div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">this</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">##NAME##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">beforeGet</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">function</span><span class="ubct_paren ubct_lparen">(</span><span'
                +' class="ubct_variable ubct_parameter">byRefvalue</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span>' +
                '</div>' +
                '<div class="ubct_line"  style="min-height:15px;padding-left:4em;">' +
                    '<div>##CODE_BEFORE_GET##</div>' +
                '</div>' +
                '<div class="ubct_line" style="height:15px">' +
                    '<span class="ubct_paren ubct_rparen">}</span>' +
                    '<span class="ubct_punctuation ubct_operator">;</span>' +
                '</div>'
                +'<div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">this</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">##NAME##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">beforeSet</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">function</span><span class="ubct_paren ubct_lparen">(</span><span'
                +' class="ubct_variable ubct_parameter">byRefvalue</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span>' +
                '</div>' +
                '<div class="ubct_line"  style="min-height:15px;padding-left:4em;">' +
                    '<div>' +
                        '##CODE_BEFORE_SET##</div>' +
                '</div>' +
                '<div class="ubct_line" style="height:15px">' +
                    '<span class="ubct_paren ubct_rparen">}</span>' +
                    '<span class="ubct_punctuation ubct_operator">;</span>' +
                '</div>'
                +'<div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">this</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">##NAME##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">afterSet</span><span'
                +' class="ubct_keyword ubct_operator">=</span><span class="ubct_storage ubct_type">function</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_variable ubct_parameter">byRefvalue</span><span'
                +' class="ubct_paren ubct_rparen">)</span><span class="ubct_paren ubct_lparen">{</span>' +
                '</div>' +
                '<div class="ubct_line"  style="min-height:15px;padding-left:4em;">' +
                    '<div>##CODE_AFTER_SET##</div>' +
                    '</div>' +
                '<div class="ubct_line" style="height:15px">'
                +'<span class="ubct_paren ubct_rparen">}</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>' +
            '</div>'
        );
        var model={
            NAME:"newProperty"
            ,CODE_BEFORE_GET:" "
            ,CODE_BEFORE_SET:" "
            ,CODE_AFTER_SET:" "//insert code here
        };
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[8].innerHTML=model.NAME;
            codeViewReference.childNodes[1].childNodes[2].innerHTML=model.NAME;
            codeViewReference.childNodes[4].childNodes[2].innerHTML=model.NAME;
            codeViewReference.childNodes[7].childNodes[2].innerHTML=model.NAME;

            if(model.CODE_BEFORE_GET.length==1 && model.CODE_BEFORE_GET[0]==''){
                codeViewReference.childNodes[1].style.display='none';
                codeViewReference.childNodes[2].style.display='none';
                codeViewReference.childNodes[3].style.display='none';
            }else{
                codeViewReference.childNodes[1].style.display=''
                codeViewReference.childNodes[2].style.display=''
                codeViewReference.childNodes[3].style.display=''
            }
            if(model.CODE_BEFORE_SET.length==1 && model.CODE_BEFORE_SET[0]==''){
                codeViewReference.childNodes[4].style.display='none';
                codeViewReference.childNodes[5].style.display='none';
                codeViewReference.childNodes[6].style.display='none';
            }else{
                codeViewReference.childNodes[4].style.display=''
                codeViewReference.childNodes[5].style.display=''
                codeViewReference.childNodes[6].style.display=''
            }
            if(model.CODE_AFTER_SET.length==1 && model.CODE_AFTER_SET[0]==''){
                codeViewReference.childNodes[7].style.display='none';
                codeViewReference.childNodes[8].style.display='none';
                codeViewReference.childNodes[9].style.display='none';
            }else{
                codeViewReference.childNodes[7].style.display=''
                codeViewReference.childNodes[8].style.display=''
                codeViewReference.childNodes[9].style.display=''
            }

            codeViewReference.childNodes[2].childNodes[0].innerHTML=model.CODE_BEFORE_GET.split('\n').join("<br>");
            codeViewReference.childNodes[5].childNodes[0].innerHTML=model.CODE_BEFORE_SET.split('\n').join("<br>");
            codeViewReference.childNodes[8].childNodes[0].innerHTML=model.CODE_AFTER_SET.split('\n').join("<br>");
            //console.log(codeViewReference.childNodes[3].childNodes[11],codeViewReference.childNodes[3].childNodes[2])
        }
        var viewReference;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var bg=view.childNodes[3].childNodes[1];
            var bs=view.childNodes[3].childNodes[3];
            var as=view.childNodes[3].childNodes[5];
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            var _body=view.childNodes[3];
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }

            title.onkeyup=function(event){
                model.NAME=this.value;
                _PROPERTY_VIEW.updateCode(codeViewReference);
            }
            bg.onkeyup=function(event){
                model.CODE_BEFORE_GET=(this.value);;
                //console.log()
                _PROPERTY_VIEW.updateCode(codeViewReference);
            }
            bs.onkeyup=function(event){
                model.CODE_BEFORE_SET=(this.value);
                _PROPERTY_VIEW.updateCode(codeViewReference);
            }
            as.onkeyup=function(event){
                model.CODE_AFTER_SET=(this.value);
                _PROPERTY_VIEW.updateCode(codeViewReference);
            }
            expanded=!expanded;
            handle.onclick();
            return view;
        }
        this.updateView=function(container){

        }
    }
    return CLASS;
})();

var QTemplateView=(function(){
    var CLASS=function QTemplateView(){
        var _TEMPLATE_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="privateMethod view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">template<div class="smallLink"></div></div>'
                +'<textarea>##CODE##</textarea>'
                +'</div>'
                +'<div>'
                +'</div>'
                +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                '<span class="ubct_storage ubct_type">this</span>.<span>##NAME##</span>=<span class="ubct_storage ubct_type">new</span>&nbsp;<span class="ubct_type">QViewTemplate</span>(' +
                '</div>' +
                '<div class="ubct_line"  style="min-height:15px;padding-left:4em;">' +
                '<div class=ubct_storage>##CODE##</div>' +
                '</div>' +
                '<div class="ubct_line" style="height:15px">);</div>' +
                '</div>' +
                '</div>'
        );
        var model={
            NAME:"newTemplate"
            ,CODE:"SELECT `id`,`name`,`date` \n"
            +"FROM `CUSTOMERS` CT \n"
            +"LEFT JOIN `INVOICE` I \n"
            +"ON CT.`ID`=I.`customer_id` \n"
            +"WHERE DATE(CT.`date`)>=DATE('##BEGIN_DATE##') \n"
            +"AND DATE(CT.`date`)<=DATE('##END_DATE##') "
        }
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            _TEMPLATE_VIEW.updateCode(container);
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[2].innerHTML=model.NAME;
            var ttext=(model.CODE).split("\n");

            var codeInit=codeViewReference.childNodes[1].childNodes[0];
            while(codeInit.childNodes.length>0){
                codeInit.removeChild(codeInit.childNodes[0]);
            }
            for(var i=0;i<ttext.length;i++){
                var plus=i==0?"":"+";
                var lijn=MAKE.div({class:"ubct_line"},{},[document.createTextNode(plus+"\""+ttext[i]+"\"")]);
                codeInit.appendChild(lijn);
            }

        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];
            var props=view.childNodes[4];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _TEMPLATE_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.CODE=(this.value);
                _TEMPLATE_VIEW.updateCode(codeViewReference);
                _TEMPLATE_VIEW.genProps(props);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.genProps=function(container){
            var tpl=new QViewTemplate(model.CODE);

            var ihtml="";
            for(var i in tpl.Tags){
                ihtml+="<div>"+i+"<input value='"+tpl.Tags[i]+"'></div>";
            }
            container.innerHTML=ihtml;
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();

var QViewTemplateView=(function(){
    var CLASS=function QViewTemplateView(){
        var _TEMPLATE_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="privateMethod view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">template<div class="smallLink"></div></div>'
                +'<textarea>##CODE##</textarea>'
                +'</div>'
                +'<div>'
                +'</div>'
                +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                '<span class="ubct_storage ubct_type">this</span>.<span>##NAME##</span>=<span class="ubct_storage ubct_type">new</span>&nbsp;<span class="ubct_type">QTemplate</span>(' +
                '</div>' +
                '<div class="ubct_line"  style="min-height:15px;padding-left:4em;">' +
                '<div class=ubct_storage>##CODE##</div>' +
                '</div>' +
                '<div class="ubct_line" style="height:15px">);</div>' +
                '</div>' +
                '</div>'
        );
        var model={NAME:"newTemplate",CODE:"<div>##DATA##</div>"}
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            _TEMPLATE_VIEW.updateCode(container);
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[2].innerHTML=model.NAME;
            var ttext=(model.CODE).split("\n");

            var codeInit=codeViewReference.childNodes[1].childNodes[0];
            while(codeInit.childNodes.length>0){
                codeInit.removeChild(codeInit.childNodes[0]);
            }
            for(var i=0;i<ttext.length;i++){
                var plus=i==0?"":"+";
                var lijn=MAKE.div({class:"ubct_line"},{},[document.createTextNode(plus+"\""+ttext[i]+"\"")]);
                codeInit.appendChild(lijn);
            }

        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];
            var props=view.childNodes[4];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _TEMPLATE_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.CODE=(this.value);
                _TEMPLATE_VIEW.updateCode(codeViewReference);
                _TEMPLATE_VIEW.genProps(props);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.genProps=function(container){
            var tpl=new QViewTemplate(model.CODE);

            var ihtml="";
            for(var i in tpl.Tags){
                ihtml+="<div>"+i+"<input value='"+tpl.Tags[i]+"'></div>";
            }
            container.innerHTML=ihtml;
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();

var QMethodView=(function(){
    var CLASS=function QMethodView(){
        var _METHOD_VIEW=this;
        var expanded=true;
        AbstractView.call(this);

        var vt=new QViewTemplate(
            '<div class="method view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">before<div class="smallLink"></div></div>'
                +'<textarea>##CODE_BEFORE##</textarea>'
                +'<div class="smallTitle">code<div class="smallLink"></div></div>'
                +'<textarea>##CODE##</textarea>'
                +'<div class="smallTitle">after<div class="smallLink"></div></div>'
                +'<textarea>##CODE_AFTER##</textarea>'
                +'</div>'
                +'</div>'
        );

        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">'
            +' <div class="ubct_line" style="height:15px"><span'
                +' class="ubct_storage ubct_type">this</span><span class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">##NAME##</span><span'
                +' class="ubct_keyword ubct_operator">=</span><span class="ubct_storage ubct_type">function</span>&nbsp;<span'
                +' class="ubct_entity ubct_name ubct_function">_##NAME##</span><span class="ubct_paren ubct_lparen">(</span><span'
                +' class="ubct_variable ubct_parameter">_reference</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span></div>'
            +' <div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span'
                    +' class="ubct_storage ubct_type">##UNIT##</span><span class="ubct_punctuation ubct_operator">.</span><span'
                    +' class="ubct_identifier">##NAME##</span><span class="ubct_punctuation ubct_operator">.</span><span'
                    +' class="ubct_identifier">beforeExec</span><span class="ubct_paren ubct_lparen">(</span><span'
                    +' class="ubct_identifier">_reference</span><span class="ubct_paren ubct_rparen">)</span><span'
                    +' class="ubct_punctuation ubct_operator">;</span></div>'
            +'<div class="ubct_line" style="min-height:15px;padding-left:4em;">&nbsp;&nbsp;&nbsp;&nbsp;##CODE##</div>'
            +' <div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span'
                    +' class="ubct_storage ubct_type">##UNIT##</span><span class="ubct_punctuation ubct_operator">.</span><span'
                    +' class="ubct_identifier">##NAME##</span><span class="ubct_punctuation ubct_operator">.</span><span'
                    +' class="ubct_identifier">afterExec</span><span class="ubct_paren ubct_lparen">(</span><span'
                    +' class="ubct_identifier">_reference</span><span class="ubct_paren ubct_rparen">)</span><span'
                    +' class="ubct_punctuation ubct_operator">;</span></div>'
            +' <div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="ubct_keyword">return</span>&nbsp;<span'
                    +' class="ubct_storage ubct_type">this</span><span class="ubct_punctuation ubct_operator">;</span></div>'
            +' <div class="ubct_line" style="height:15px"><span class="ubct_paren ubct_rparen">}</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>'
            +' <div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">##UNIT##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span class="ubct_storage ubct_type">##NAME##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">after</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">function</span><span class="ubct_paren ubct_lparen">(</span><span'
                +' class="ubct_variable ubct_parameter">data</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span></div>'
            +' <div class="ubct_line" style="min-height:15px;padding-left:4em;">##CODE_AFTER##</div>'
            +' <div class="ubct_line" style="height:15px"><span class="ubct_paren ubct_rparen">}</span></div>'
            +' <div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">##UNIT##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span class="ubct_storage ubct_type">##NAME##</span><span'
                +' class="ubct_punctuation ubct_operator">.</span><span'
                +' class="ubct_entity ubct_name ubct_function">before</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">function</span><span class="ubct_paren ubct_lparen">(</span><span'
                +' class="ubct_variable ubct_parameter">data</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span></div>'
            +' <div style="min-height:15px;padding-left:4em;">##CODE_BEFORE##</div>'
            +' <div class="ubct_line" style="height:15px"><span class="ubct_paren ubct_rparen">}</span></div>'
            +'</div>'
        );
        /*var ct=new QViewTemplate(
            '<div><span>##UNIT##</span>.<span>##NAME##</span>=function <span>##NAME##</span>(_reference){' +
            '<span>##UNIT##</span>.<span>##NAME##</span>.beforeExec(_reference);' +
            '<span>##CODE##</span>;' +
            '<span>##UNIT##</span>.<span>##NAME##</span>.afterExec(_reference);' +
            'return <span>##UNIT##</span>;' +
                '};' +
            '<span>##UNIT##</span>.<span>##NAME##</span>.after=function(data){' +
                '<span>##CODE_BEFORE##</span>;' +
                '};' +
            '<span>##UNIT##</span>.<span>##NAME##</span>.before=function(data){' +
                '<span>##CODE_AFTER##</span>' +
                '};</div>'
        );*/
        var model={NAME:"newMethod",UNIT:'_THIS',CODE:' ',CODE_AFTER:' ',CODE_BEFORE:' '};
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            var unit=[0,6,12,16,18,24]
            var name=[2,4,8,14,20,26]
            var code=[10];
            var before=[22]
            var after=[28]

            codeViewReference.childNodes[1].childNodes[2].innerHTML=model.NAME;
            codeViewReference.childNodes[1].childNodes[6].innerHTML=model.NAME;
            codeViewReference.childNodes[3].childNodes[3].innerHTML=model.NAME;
            codeViewReference.childNodes[6].childNodes[3].innerHTML=model.NAME;
            codeViewReference.childNodes[12].childNodes[2].innerHTML=model.NAME;
            codeViewReference.childNodes[18].childNodes[2].innerHTML=model.NAME;


            if(model.CODE.length==1 && model.CODE[0]==''){
                codeViewReference.childNodes[4].style.display='none';
                //console.log('code hidden');
            }else{codeViewReference.childNodes[4].style.display=''}
            if(model.CODE_BEFORE.length==1 && model.CODE_BEFORE[0]==''){
                codeViewReference.childNodes[14].style.display='none';
                //console.log('codeBefore hidden',codeViewReference.childNodes[14]);
            }else{codeViewReference.childNodes[14].style.display=''}
            if(model.CODE_AFTER.length==1 && model.CODE_AFTER[0]==''){
                codeViewReference.childNodes[20].style.display='none';
                //console.log('codeAfter hidden',codeViewReference.childNodes[20]);
            }else{codeViewReference.childNodes[20].style.display=''}
            codeViewReference.childNodes[4].innerHTML=model.CODE.split('\n').join('<br>');
            codeViewReference.childNodes[14].innerHTML=model.CODE_BEFORE.split('\n').join('<br>');
            codeViewReference.childNodes[20].innerHTML=model.CODE_AFTER.split('\n').join('<br>');
        }
        var viewReference;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var code=view.childNodes[3].childNodes[3];
            var codeBefore=view.childNodes[3].childNodes[1];
            var codeAfter=view.childNodes[3].childNodes[5];
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid rgba(0,0,0,0)"}
            var _body=view.childNodes[3];
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }

            title.onkeyup=function(event){
                model.NAME=this.value;
                _METHOD_VIEW.updateCode(codeViewReference);
            }
            code.onkeyup=function(event){
                model.CODE=(this.value);
                console.log(model.CODE);
                _METHOD_VIEW.updateCode(codeViewReference);
            }
            codeBefore.onkeyup=function(event){
                model.CODE_BEFORE=(this.value);
                console.log(model.CODE_BEFORE);
                _METHOD_VIEW.updateCode(codeViewReference);
            }
            codeAfter.onkeyup=function(event){
                model.CODE_AFTER=(this.value);
                console.log(model.CODE_AFTER);
                _METHOD_VIEW.updateCode(codeViewReference);
            }
            expanded=!expanded;
            handle.onclick();
            return view;
        }
        this.updateView=function(container){

        }
    }
    return CLASS;
})();
var QUnitView=(function(_application){
    var CLASS=function QUnitView(){
        var _UNIT_VIEW=this;
        var expanded=true;
        QArray.apply(this,['Model']);
        this.Model.afterSet=function(byRefvalue){
            var m=byRefvalue[0];
            m.genView(contentView);
            m.genCode(codeContentView);
        }
        this.name="newUnit";
        this.unit="_THIS";
        this.code='/*INSERT CODE HERE*/';

        AbstractView.call(this);

        var vt=new QViewTemplate(
        '<div class="object">'
            +'<div class="title">' +
            '<div class="handle"></div>' +
            '<input class="name" value="##NAME##"/>' +
            '</div>'
            +'<div class="body"></div>'
        +'</div>'
        );

        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">'
            +'<div class="ubct_line" style="height:15px"><span class="ubct_storage ubct_type">var</span>&nbsp;<span'
                +' class="ubct_identifier ubct_class">##NAME##</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_storage ubct_type">function</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span></div>'
            +'<div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="ubct_storage ubct_type">var</span>&nbsp;<span'
                +' class="ubct_identifier ubct_class">CLASS</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">function</span>&nbsp;<span class="ubct_entity ubct_name ubct_function">##NAME##</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_paren ubct_lparen">{</span></div>'
            +'<div class="ubct_line">&nbsp;&nbsp;&nbsp;&nbsp;<span'
                +' class="ubct_storage ubct_type">var</span>&nbsp;<span'
                +' class="ubct_identifier">_##UPPERCASE_NAME##</span><span class="ubct_keyword ubct_operator">=</span><span'
                +' class="ubct_storage ubct_type">this</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>'
            +'<div class="ubct_line"><span class="ubct_indent-guide">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;<span'
                +' class="ubct_identifier">##CODE##</span></div>'
            +'<div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="ubct_paren ubct_rparen">}</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>'
            +'<div class="ubct_line" style="height:15px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="ubct_keyword">return</span>&nbsp;<span'
                +' class="ubct_identifier ubct_class">CLASS</span><span class="ubct_punctuation ubct_operator">;</span></div>'
            +'<div class="ubct_line" style="height:15px"><span class="ubct_paren ubct_rparen">})</span><span'
                +' class="ubct_paren ubct_lparen">(</span><span class="ubct_paren ubct_rparen">)</span><span'
                +' class="ubct_punctuation ubct_operator">;</span></div>'
            +'</div>'
        );
        var codeViewReference;
        var codeContentView;
        var model={NAME:'newUnit',CODE:' ',UPPERCASE_NAME:'NEW_UNIT'};
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            container.appendChild(view);
            codeViewReference=view;
            codeContentView=view.childNodes[3].childNodes[2];
            //console.log(codeContentView);
            for(var i=0;i<_UNIT_VIEW.Model().length;i++){
                var v=_UNIT_VIEW.Model()[i].genCode(codeContentView);
            };
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[2].innerHTML=(model.NAME+"");
            codeViewReference.childNodes[1].childNodes[7].innerHTML=(model.NAME+"");
            var tr=(model.NAME+"").split(/[A-Z]/g);tr.splice(0,1);
            var caps=(model.NAME+"").replace(/[^A-Z]/g,"").split("");
            var ccs="";for(var i=0;i<tr.length;i++){ccs+="_"+caps[i]+tr[i].toUpperCase()}
            codeViewReference.childNodes[2].childNodes[3].innerHTML=ccs;
        }
        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);

            viewReference=view;
            view.onmousedown=function (event){
                FOCUSED_UNIT=_UNIT_VIEW;
                view.style.zIndex=parseInt(view.style.zIndex)+1||0;
                view.style.zIndex=parseInt(view.style.zIndex)+1||0;
            }
            var _body=view.childNodes[1];
            var handle=view.childNodes[0].childNodes[0];
            var title=view.childNodes[0].childNodes[1];
            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _UNIT_VIEW.updateCode(codeViewReference);
            }
            view.onmouseover=function(event){
                codeViewReference.style.borderLeft="4px solid blue"
            }
            view.onmouseout=function(event){
                codeViewReference.style.borderLeft="4px solid white"
            }

            for(var i=0;i<_UNIT_VIEW.Model().length;i++){
                var v=_UNIT_VIEW.Model()[i].genView(contentView);
            };
            expanded=!expanded;
            handle.onclick();
            return view;
        }
        this.updateView=function(container){

        }

    }
    return CLASS;
})();

var PublicPropertyView=(function(){
    var CLASS=function PublicPropertyView(){
        var _PUBLIC_PROPERTY_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="publicProperty view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                    +'<div class="smallTitle">data<div class="smallLink"></div></div>'
                    +'<textarea>##DATA##</textarea>'
                +'</div>'
            +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                'this.<span>##NAME##</span>=<span>##DATA##</span>;' +
                '</div>' +
            '</div>'
            );
        var model={NAME:"newPublicProperty",DATA:"{}"}
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[1].innerHTML=model.NAME;
            codeViewReference.childNodes[0].childNodes[3].innerHTML=model.DATA;
        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _PUBLIC_PROPERTY_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.DATA=this.value;
                _PUBLIC_PROPERTY_VIEW.updateCode(codeViewReference);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();

var PrivatePropertyView=(function(){
    var CLASS=function PrivatePropertyView(){
        var _PRIVATE_PROPERTY_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="privateProperty view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">data<div class="smallLink"></div></div>'
                +'<textarea>##DATA##</textarea>'
                +'</div>'
                +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                'var <span>##NAME##</span>=<span>##DATA##</span>;' +
                '</div>' +
                '</div>'
        );
        var model={NAME:"newPrivateProperty",DATA:"{}"}
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[1].innerHTML=model.NAME;
            codeViewReference.childNodes[0].childNodes[3].innerHTML=model.DATA;
        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _PRIVATE_PROPERTY_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.DATA=this.value;
                _PRIVATE_PROPERTY_VIEW.updateCode(codeViewReference);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();

var PublicMethodView=(function(){
    var CLASS=function PublicMethodView(){
        var _PUBLIC_METHOD_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="publicMethod view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">code<div class="smallLink"></div></div>'
                +'<textarea>##CODE##</textarea>'
                +'</div>'
                +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                    'this.<span>##NAME##</span>=function _<span>##NAME##</span>(){' +
                '</div>' +
                '<div class="ubct_line" style="min-height:15px;padding-left:4em;">' +
                    '<div>##CODE##</div>' +
                '</div>' +
                    '<div class="ubct_line" style="height:15px">};</div>' +
                '</div>' +
             '</div>'
        );
        var model={NAME:"newPublicMethod",CODE:" "}
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[1].innerHTML=model.NAME;
            codeViewReference.childNodes[0].childNodes[3].innerHTML=model.NAME;
            codeViewReference.childNodes[1].childNodes[0].innerHTML=(model.CODE).split('\n').join("<br>");
        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _PUBLIC_METHOD_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.CODE=(this.value);
                _PUBLIC_METHOD_VIEW.updateCode(codeViewReference);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();

var PrivateMethodView=(function(){
    var CLASS=function PrivateMethodView(){
        var _PRIVATE_METHOD_VIEW=this;
        var expanded=true;
        AbstractView.call(this);
        var vt=new QViewTemplate(
            '<div class="privateMethod view">' +
                '<div class="handle"></div>'
                +'<input value="##NAME##">'
                +'<div class="link"></div>'
                +'<div>'
                +'<div class="smallTitle">code<div class="smallLink"></div></div>'
                +'<textarea>##CODE##</textarea>'
                +'</div>'
                +'</div>'
        );
        var ct=new QViewTemplate(
            '<div style="padding-left:4em;padding-top:12px;">' +
                '<div class="ubct_line" style="height:15px">' +
                    'this.<span>##NAME##</span>=function _<span>##NAME##</span>(){' +
                '</div>' +
                '<div class="ubct_line" style="min-height:15px;padding-left:4em;">' +
                    '<div>##CODE##</div>' +
                '</div>' +
                '<div class="ubct_line" style="height:15px">};</div>' +
                '</div>' +
            '</div>'
        );
        var model={NAME:"newPrivateMethod",CODE:" "}
        var codeViewReference;
        this.genCode=function(container){
            var view=ct.ViewForArray(model).View();
            codeViewReference=view;
            container.appendChild(view);
            codeViewReference=view;
            return view;
        }
        this.updateCode=function(container){
            codeViewReference.childNodes[0].childNodes[1].innerHTML=model.NAME;
            codeViewReference.childNodes[0].childNodes[3].innerHTML=model.NAME;
            codeViewReference.childNodes[1].childNodes[0].innerHTML=model.CODE.split('\n').join("<br>");
        }

        var viewReference;
        var contentView;
        this.genView=function(container){
            var view=vt.ViewForArray(model).View();
            container.appendChild(view);
            viewReference=view;
            view.onmousedown=function (event){view.style.zIndex+=1}

            var handle=view.childNodes[0];
            var title=view.childNodes[1];
            var link=view.childNodes[2];
            var _body=view.childNodes[3];
            var value=_body.childNodes[1];

            contentView=_body;
            handle.onclick=function(event){
                if(expanded){expanded=false;_body.style.display='none';handle.style.backgroundImage='url("img/win_max.png")';}
                else{expanded=true;_body.style.display='';handle.style.backgroundImage='url("img/win_min.png")';}
            }
            title.onkeyup=function(event){
                model.NAME=this.value;
                _PRIVATE_METHOD_VIEW.updateCode(codeViewReference);
            }
            value.onkeyup=function(event){
                model.CODE=(this.value);
                _PRIVATE_METHOD_VIEW.updateCode(codeViewReference);
            }
            view.onmouseover=function(event){codeViewReference.style.borderLeft="4px solid blue"}
            view.onmouseout=function(event){codeViewReference.style.borderLeft="4px solid white"}
            expanded=!expanded;
            handle.onclick();
        }
        this.updateView=function(container){

        }
    };
    return CLASS;
})();