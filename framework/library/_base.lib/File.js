var File1=(function(){
	var PROTO=function File1(){
		var _THIS=this;
		Widget.call(_THIS);
		var frame,form,remove,txt,msg,div,fileInput;
		var _THIS = this;

		QProperty.call(this, [ 'OnLoad' ]);
		this.OnLoad.afterSet = function(byRefvalue) {
		};
		_THIS.OnLoad(function(result){})
		QProperty.call(this, [ 'OnChange' ]);
		this.OnChange.afterSet = function(byRefvalue) {
		};
		_THIS.OnLoad(function(result){})
		this.choose = function _choose() {
		};
		function onload(event){
			var dbody=frame.contentWindow || frame.contentDocument;
			
			if(dbody.document.body.innerText.length>0){
					try{
						eval('try { HTTP_UPLOAD_RESPONSE_BODY='+dbody.document.body.innerText+';}catch(error){}');
					}catch(err){
						var fname=fileInput.value.split('\\')
						HTTP_UPLOAD_RESPONSE_BODY={file:fname[fname.length-1],status:'NOK',reason:'The 8 MBytes `post_max_size` limit was exceeded '}
					}
					if(HTTP_UPLOAD_RESPONSE_BODY.status=='OK'){
						setTimeout(function(){
							msg.style.backgroundImage='url(image/icongen/v_bk_032.png)';
							txt.title='';
							msg.style.cursor='pointer';
							txt.style.cursor='pointer';
							msg.parentNode.style.backgroundColor='';
							msg.onclick=(function(message){return function(event){
								alert(message);
							}})(' `'+HTTP_UPLOAD_RESPONSE_BODY.file+'` uploaded successfully.\n   '+HTTP_UPLOAD_RESPONSE_BODY.bytes+' bytes sent');
						},200)
					}else{
						setTimeout(function(){
							msg.parentNode.style.backgroundColor='#FF8';
							msg.style.backgroundImage='url(image/icongen/NOK_bk_032.png)'
							msg.style.cursor='pointer';
							txt.style.cursor='pointer';
							msg.onclick=(function(message){return function(event){
								alert(message);
							}})('Cannot upload '+HTTP_UPLOAD_RESPONSE_BODY.file+'\nReason :'+HTTP_UPLOAD_RESPONSE_BODY.reason);
						},500);
					}
			}else{
				msg.style.backgroundImage='url(image/icongen/NOK_bk_032.png)';
				msg.onclick=(function(message){return function(event){
					alert(message);
				}})(' unknown error ');
			}
		}
		frame=MAKE.IFRAME({
				id:'upload_iframe'
				,name:'upload_iframe'
				,onload:function(event){
					onload(event);
				}
			},{display:'none'},[]);
		
		form=MAKE.form({
			target:'upload_iframe'
			,action:"action_points.php"
			,method:"post"
			,enctype:"multipart/form-data"
			,encoding:"multipart/form-data"
		},{width:'340px'},[
			div=make.div({},{},[
				fileInput=make.input({
					type:'file'
					,name:"upl[file]"
					,onchange:function(event){
						var _this=this;
						msg.style.backgroundImage='url(image/loadinfo_EEF.gif)'
						form.submit();
					}
				},{display:''})
				,txt=make.box({align:'left'},{display:'inline-block'})
				,msg=make.box({align:'left'}
					,{
						backgroundRepeat:'no-repeat'
						,backgroundPosition:'50% 50%'
						,display:'inline-block'
						,width:'19px',height:'19px'
					},[])
			])
		]);
		
		_THIS.View(make.div({},{},[frame,form]));
	}
	WidgetStatic.call(PROTO);
	return PROTO;
})();