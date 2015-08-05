
var MapInput=(function(){
	var CLASS=function MapInput(){
    	Base.call(this,['MapInput']);
		var _THIS=this;
		Widget.call(this);
		var map;
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,coords){});
		
		QProperty.call(this,['Markers']);
		_THIS.Markers([]);
		_THIS.Markers.afterSet=function(markers){
			try{
				map.Markers(markers);
			}catch(err){}
		};
		QProperty.call(this,['OnMarkerClick']);
		_THIS.OnMarkerClick.afterSet=function(func){
			try{
				map.OnMarkerClick(func);
			}catch(err){}
		};
		_THIS.OnMarkerClick(function(_data,index,marker){
			alert(serializeDict(_data[index]));
		});
		
		QProperty.call(this,['MarkerAtIndex']);
		_THIS.MarkerAtIndex(function(map,markers,index,parent){
				var markerData=markers[index];
				var pointCoordinates=(markerData.geocoord.split("x"));
				var coords=markerData.geocoord.split("x");
				var coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
				
				var newMarker = new google.maps.Marker({
					position:coordinates
				    ,map: map
				    ,draggable:false
					,title: markerData.text
				});
				newMarker.setIcon('image/input_icns/pin.small.teal.png');
				
				google.maps.event.addListener(newMarker, 'click', function(event) {
					parent.OnMarkerClick()(markers,index,coordinates);
				});
				return newMarker;
		});
		
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		var inp;
		var geocoder = new google.maps.Geocoder();
		_THIS.View(
			inp=MAKE.input({
				onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,addrs,center;
						if(this.value!=''){
							var _x_=parseFloat(this.value.split('x')[0]),_y_=parseFloat(this.value.split('x')[1]);
						   center={x:_x_,y:_y_}
						}else{ center={x:50.84506976112555,y:4.3710243701934814};}
						
							map=new GoogleMap({zoom:15})
							.MarkerAtIndex(function(_map,_data,_index){
								return _THIS.MarkerAtIndex()(_map,_data,_index)
							})
							.Markers(_THIS.Markers())
							.ExtraMarkers(function(_gmap){
								var p0,p1;
								var line = [
								    p0=new google.maps.LatLng(center.x,center.y),
								    p1=new google.maps.LatLng(center.x,center.y)
								  ];
								  var path = new google.maps.Polyline({
								    path: line,
								    strokeColor: "#FF0000",
								    strokeOpacity: 1.0,
								    strokeWeight: 2
								  });
								  path.setMap(_gmap);
								  
								var newMarker = new google.maps.Marker({
									position:p1
								    ,map: _gmap
								    ,draggable:false
								});
								newMarker.setIcon('image/input_icns/pin.rouge.png');
								
								newMarker = new google.maps.Marker({
									position:p1
								    ,map: _gmap
								    ,draggable:true
								});
								newMarker.setIcon('image/input_icns/pin.bleu.png');
								
								google.maps.event.addListener(newMarker, 'drag', function(event) {
									var lat = event.latLng.lat();
									var lng = event.latLng.lng();
									line[1]=event.latLng;
									path.setPath(line);
									_THIS.OnChange()(inp,lat.toFixed(7)+'x'+lng.toFixed(7));
								});
								google.maps.event.addListener(newMarker, 'mouseup', function(event) {
									var lat = event.latLng.lat();
									var lng = event.latLng.lng();
									var tmp;
								    new WidgetStatic().clearView(addrs);
								    addrs.appendChild(tmp=MAKE.select({},{width:'100%',backgroundImage:'url(image/loader_003.gif)',backgroundPosition:'0% 50%',backgroundRepeat:'no-repeat'}))
									setTimeout(function(){
									    geocoder.geocode({'latLng': event.latLng}, function(results, status) {
									      setTimeout(function(){
									    	if (status == google.maps.GeocoderStatus.OK) {
										    new WidgetStatic().clearView(addrs);
										    addrs.appendChild(tmp=MAKE.select({},{width:'100%'}));
									        for(var k in results){
									        	if(k>2)break;
									        	if(results[k].formatted_address!==undefined){
									        		tmp.appendChild(MAKE.option({value:k,innerHTML:results[k].formatted_address}));
									        	}
									        }
									      } else {
									        alert("Geocoder failed due to: " + status);
									      }},200)
								    });},200)
								});
								return [newMarker];
							})
						
						p=new Popover(this,900000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(MAKE.div({},{},[addrs=MAKE.div(),ct=MAKE.div()]))
    						.Size({x:500,y:420})
							.Icon(Popover.ICONS.QUESTION)
					    	p.align(_this,true)
					    	SET.css(map.View(),{backgroundColor:'',border:''});
					    	//map.show();
					   
					    	map.Center(center).Parent(ct);
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
			},{
				width:'22em'
				,backgroundImage:'url(image/input_icns/input.gpslocation.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			));
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();


var MapDistInput=(function(){
	var CLASS=function MapDistInput(){
		var _THIS=this;
		Widget.call(this);
		var map;
		
		QProperty.call(this,['Center']);
		_THIS.Center({x:50.84506976112555,y:4.3710243701934814});
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,coords){});
		
		QProperty.call(this,['Markers']);
		_THIS.Markers([]);
		_THIS.Markers.afterSet=function(markers){
			try{
				map.Markers(markers);
			}catch(err){}
		};
		QProperty.call(this,['OnMarkerClick']);
		_THIS.OnMarkerClick.afterSet=function(func){
			try{
				map.OnMarkerClick(func);
			}catch(err){}
		};
		_THIS.OnMarkerClick(function(_data,index,marker){
			alert(serializeDict(_data[index]));
		});
		
		QProperty.call(this,['MarkerAtIndex']);
		_THIS.MarkerAtIndex(function(map,markers,index,parent){
				var markerData=markers[index];
				var pointCoordinates=(markerData.geocoord.split("x"));
				var coords=markerData.geocoord.split("x");
				var coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
				var newMarker = new google.maps.Marker({
					position:coordinates
				    ,map: map
				    ,draggable:false
					,title: markerData.text
				});
				newMarker.setIcon('image/input_icns/pin.small.teal.png');
				
				google.maps.event.addListener(newMarker, 'click', function(event) {
					parent.OnMarkerClick()(markers,index,coordinates);
				});
				return newMarker;
		});
		
		
		QProperty.call(this,['Value']);
		_THIS.Value.afterSet=function(value){
			_THIS.View().value=value;
		};
		var inp;
		_THIS.View(
			inp=MAKE.input({
				onmousedown:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					var cal;
					if(x>0){
						var _this=this;
						var p,ct,center=_THIS.Center();
						
							map=new GoogleMap()
							.MarkerAtIndex(function(_map,_data,_index){
								return _THIS.MarkerAtIndex()(_map,_data,_index)
							})
							.Markers(_THIS.Markers())
							.ExtraMarkers(function(_gmap){
								var p0,p1;
								var line = [
								    p0=new google.maps.LatLng(center.x,center.y),
								    p1=new google.maps.LatLng(center.x,center.y)
								  ];
								  var circle = new google.maps.Circle({
								    center: p0,
								    strokeColor: "#FF0000",
								    strokeOpacity: 1.0,
								    strokeWeight: 2,
								    radius:parseFloat(this.value)*1000
								  });
								  circle.setMap(_gmap);
								  
								var cMarker = new google.maps.Marker({
									position:p1
								    ,map: _gmap
								    ,draggable:false
								});
								cMarker.setIcon('image/input_icns/pin.rouge.png');
								
								var newMarker = new google.maps.Marker({
									position:p1
								    ,map: _gmap
								    ,draggable:true
								});
								newMarker.setIcon('image/input_icns/pin.bleu.png');
								
								google.maps.event.addListener(newMarker, 'drag', function(event) {
									//console.log(event.latLng);
									var lat = event.latLng.lat();
									var lng = event.latLng.lng();
									var dist=google.maps.geometry.spherical.computeDistanceBetween (line[0],line[1]);
									line[1]=event.latLng;
									circle.setRadius(dist);
									_THIS.OnChange()(inp,dist);
								});
								return [newMarker];
							})
							/*.OnChange(
    							function(ref,val){
    								_THIS.OnChange()(ref,val);
    							}
    						)
							.OnClose(function(calRef){
								_THIS.OnClose()(_THIS);
							})*/;
						
						p=new Popover(this,900000)
							.OnClose(function(ref){
    							p.Parent().removeChild(p.View());
								_this.disabled=false;
							})
    						.Node(ct=MAKE.div())
    						.Size({x:530,y:420})
							.Icon(Popover.ICONS.QUESTION)
					    	p.align(_this,true)
					    	SET.css(map.View(),{backgroundColor:'',border:''});
					    	//map.show();
					   
					    	map.Center(center).Parent(ct);
					}
				}
				,onmousemove:function(event){
					var x=28+NORM.mouseX(event)-this.offsetWidth;
					SET.css(this,{cursor:x>0?'pointer':''});
					//this.value=x;
				}
			},{
				width:'11em'
				,backgroundImage:'url(image/input_icns/input.dist.png)'
				,backgroundRepeat:'no-repeat'
				,backgroundPosition:'100% 50%'}
			));
	}
	WidgetStatic.call(CLASS);
	return CLASS;
})();