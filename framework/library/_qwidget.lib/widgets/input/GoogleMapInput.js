var GoogleMapInput=(function(){
	var MAPVIEW=function GoogleMapInput(target){
    	Base.call(this,['GoogleMapInput']);
		Widget.call(this);
		var _THIS=this;
		var map=null;
		QProperty.call(this,['Data']);
		
		QProperty.call(this,['OnMarkerClick']);
		_THIS.OnMarkerClick(function(_data,index,coords){
			alert(serializeDict(_data[index])+"//"+_data[index].date);
		});
		var targetCoordinates=(target.value.split('x'));
		targetCoordinates[0]=parseFloat(targetCoordinates[0]);
		targetCoordinates[1]=parseFloat(targetCoordinates[1]);
		var markers=[]
		QProperty.call(this,['MarkerAtIndex']);
		_THIS.MarkerAtIndex(
			function(map,markers,index,_parent){
				var markerData=markers[index];
				var pointCoordinates=(markerData.geocoord.split("x"));
				pointCoordinates[0]=parseFloat(pointCoordinates[0]);
				pointCoordinates[1]=parseFloat(pointCoordinates[1]);
				var coords=markerData.geocoord.split("x");
				var coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
				var newMarker = new google.maps.Marker({
					position:coordinates
				    ,map: map
				    ,draggable:false
					,title: markerData.text
				});
				if(Math.abs(pointCoordinates[0]-targetCoordinates[0])<0.0001
					&&
					Math.abs(pointCoordinates[1]-targetCoordinates[1])<0.0001){
					newMarker.setIcon('image/input_icns/pin.vert.png');
				}else{
					newMarker.setIcon('image/input_icns/pin.small.teal.png');
				}
				
				
				var circle = new google.maps.Circle({
					  zoom: [11,15],
					  map: map,
					  center:coordinates,
					  radius: parseInt(markers[index].dist)*100,    // 10 miles in metres
					  strokeColor: '#48c2e3',
				      strokeOpacity: .15,
				      strokeWeight: 12,
				      fillColor: '#48c2e3',
				      fillOpacity: 0.00,
				      draggable:false
					});
				//console.log(circle);
				/*circle.bindTo('center', newMarker, 'position');*/
				var circle1 = new google.maps.Circle({
					  map: map,
					  center:coordinates,
					  radius: parseInt(markers[index].dist)*200,    // 10 miles in metres
					  strokeColor: '#48c2e3',
				      strokeOpacity: .08,
				      strokeWeight: 4,
				      fillColor: '#48c2e3',
				      fillOpacity: 0.00,
				      draggable:false
					});
				var circle0 = new google.maps.Circle({
					  zoom: [11,15],
					  map: map,
					  center:coordinates,
					  radius: parseInt(markers[index].dist)*30,    // 10 miles in metres
					  strokeColor: '#48c2e3',
				      strokeOpacity: .28,
				      strokeWeight: 12,
				      fillColor: '#48c2e3',
				      fillOpacity: 0.00,
				      draggable:false
					});
				google.maps.event.addListener(newMarker, 'click', function(event) {
					_parent.OnMarkerClick()(markers,index,coordinates);
				});
				
				//console.log(circle);
				/*circle.bindTo('center', newMarker, 'position');*/
		});
		_THIS.MarkerAtIndex.afterSet=function(_markers_map){
			/*for(var i=0;i<_markers_map.length;i++){
				_THIS.MarkerAtIndex()(map,_markers_map,i,_THIS);
			}*/
		}
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,coords){});
		
		QProperty.call(this,['OnChangeAddress']);
		_THIS.OnChangeAddress(function(ref,address){});
		
		this.Data.afterSet=function(_raw_data){
			renderView((_raw_data+'').split('x'));
		}
		QProperty.call(this,['Markers']);
		this.Markers.afterSet=function(_markers_map){
			for(var i=0;i<_markers_map.length;i++){
				_THIS.MarkerAtIndex()(map,_markers_map,i,_THIS);
			}
		}
		var v=MAKE.div({className:'GoogleMapInput'},{width:"546px",height:'380px'});
		var hint=MAKE.div({innerHTML:'double click to change position'},{fontSize:'12px',fontStyle:'italic'})
		var tt=MAKE.div({innerHTML:'double click to change position'},{fontSize:'12px',fontStyle:'italic'})
		this.View(MAKE.div({className:'Input'},{},[tt,v,hint]));

		var geocoder = new google.maps.Geocoder();
		var onGetAddress=function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
			        if (results[1]) {
			          tt.innerHTML=(results[1].formatted_address);
			          _THIS.OnChangeAddress()(_THIS,results[1].formatted_address)
			        }
			      } else {
			        tt.innerHTML=("Geocoder failed due to: " + status);
			      }
			    }
		var renderView=function renderView(coords){
			var coordinates;
			try{
			coordinates=new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));

			geocoder.geocode({'latLng': coordinates}, onGetAddress);
			}catch(err){
				_THIS.View().style.color='#FFFFFF';
				_THIS.View().style.backgroundImage="url('/portail/image/static.gif')";
			 	//_THIS.View().innerHTML="<?php WriteLib("PARAMETRAGEAD.LABEL.NO_INTERNET_ACCESS")?>";
			 	return;
			}
			  var mapOptions = {
			    zoom: 14,
			    center: coordinates,
			    disableDoubleClickZoom: true,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			    ,panControl: true,
			    zoomControl: true,
			    mapTypeControl: false,
			    scaleControl: true,
			    streetViewControl: false,
			    overviewMapControl: true,
			    zoomControlOptions: {
			        style: google.maps.ZoomControlStyle.LARGE
			    }
			  };
			 //var markerData="<?php WriteLib("PARAMETRAGEAD.LABEL.OLD_POSITION")?>";
			 //var newMarkerData="<?php WriteLib("PARAMETRAGEAD.LABEL.NEW_POSITION")?>";
			 if(map==null){
				 map = new google.maps.Map(v,mapOptions);
			 }
			 map.setCenter(coordinates);
			 
			 var newMarker = new google.maps.Marker({
				    position:coordinates
				    ,map: map
				    ,draggable:true//,
				    //title: '<?php WriteLib("PARAMETRAGEAD.MSG.CLICK_TO_ZOOM")?>'
				  });
			  newMarker.setIcon('image/input_icns/pin.rouge.png');
			  
				google.maps.event.addListener(newMarker, 'click', function(event) {
					//console.log(google.maps.MarkerShape);
					_THIS.OnMarkerClick()([{curren:'current'}],0,coordinates);
				})
				google.maps.event.addListener(newMarker, 'dragend', function(event) {
				 	var lat = event.latLng.lat();
				    var lng = event.latLng.lng();
				    geocoder.geocode({'latLng': event.latLng}, onGetAddress);
				    newMarker.setPosition(event.latLng);
				    //console.log(newMarker);
				    target.value=(lat + "x" + lng);
					target.onchange(event);
					_THIS.OnChange()(_THIS,(lat + "x" + lng));
				})
				var circle = new google.maps.Circle({
					  map: map,
					  radius: 20000,    // 10 miles in metres
					  strokeColor: '#DD3300',
				      strokeOpacity: 0.6,
				      strokeWeight: 12,
				      fillColor: '#DD3300',
				      fillOpacity: 0.1
					});
				//console.log(circle);
					circle.bindTo('center', newMarker, 'position');
			  var lastClick=(new Date()).getTime();
			 google.maps.event.addListener(map, 'dblclick', function(event) {
				 //var click=(new Date()).getTime();
				 //if((click-lastClick)<400){
				 	var lat = event.latLng.lat();
				    var lng = event.latLng.lng();
				    geocoder.geocode({'latLng': event.latLng}, onGetAddress);
				    newMarker.setPosition(event.latLng);
				    //console.log(newMarker);
				    target.value=(lat + "x" + lng);
					target.onchange(event);
					_THIS.OnChange()(_THIS,(lat + "x" + lng));
					return false;
				 //}else{lastClick=click}
				  });
			 google.maps.event.addListener(map, 'zoom_changed', function(event) {
				 //console.log(map.getZoom());
				 var type=0;
				 var cz=map.getZoom();
				 	if(cz>11)type=1;
				 	if(cz>15)type=2;
				 	if(cz>19)type=3;
				 	switch(type){
				 	case 0:
				 		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
				 		break;
				 	case 1:
				 		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
				 		break;
				 	case 2:
				 		map.setMapTypeId(google.maps.MapTypeId.HYBRID);
				 		break;
				 	case 3:
				 		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
				 		break;
				 	}
				 	
				  });
				  /*
			 google.maps.event.addListener(marker, 'click', function(event) {
				alert(markerData);
			 });
			 google.maps.event.addListener(newMarker, 'click', function(event) {
				alert(newMarkerData);
			 });*/
		}
		renderView('50x4');
		this.getMap=function(){
			return map;
		}
	};
	WidgetStatic.call(MAPVIEW);
	return MAPVIEW;
})();