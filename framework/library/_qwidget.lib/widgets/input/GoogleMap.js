var GoogleMap=(function(){
	var MAPVIEW=function GoogleMap(options){
    	Base.call(this,['GoogleMap']);
		var _THIS=this;
		Widget.call(this);
		var map;
		var geocoder;/* = new google.maps.Geocoder();*/
		
		var v;
		this.View(v=MAKE.div({className:'GoogleMapInput'},{width:'350px',height:'350px'}));//width:"546px",
        var earthTypeOptions={
            /*maxZoom: 19,*/
            minZoom: 10,
            zoom: options?options.zoom||10:10,
            center: new google.maps.LatLng(50,4),
            disableDoubleClickZoom: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL}
        };
        
		_THIS.Parent.afterSet=function(parent){
			parent.appendChild(_THIS.View());
			try{
				_init(earthTypeOptions);
			}catch(error){
			}
				setTimeout(function(){
					var lnkGoogle=_THIS.View().children[0].children[1].children[0];
					var lnkTerms=_THIS.View().children[0].children[5].children[1].children[0];
					var lnkError=_THIS.View().children[0].children[6].children[1].children[0];
					lnkGoogle.onclick=function(event){NORM.preventDefault(event);NORM.stopPropagation(event)}
					lnkError.onclick=function(event){NORM.preventDefault(event);NORM.stopPropagation(event)}
					//lnkTerms.href="http://devlop/portail/docs/Google%20Maps%20Earth%20Additional%20Terms%20of%20Service%20%E2%80%93%20Google.htm";
					
					lnkError.onclick=lnkGoogle.onclick=lnkTerms.onclick=function(event){
						NORM.preventDefault(event);
						NORM.stopPropagation(event);
						var ifr,div=MAKE.div({align:'right'}
							,{
								position:'absolute'
								,top:GET.Y(this)-200+'px'//'12.5%'//
								,left:'12.5%'
								,width:'75%'
								,height:'75%'
								,backgroundColor:"#FFF"
								,padding:'0px'
								,border:"8px solid #aaF"
							}
							,[
							    MAKE.span({innerHTML:this.href})
							    ,MAKE.button({
							    	innerHTML:'close',onclick:function(event){document.body.removeChild(div)}}
							    	,{margin:'5px'})
							    
								,MAKE.hr()
							    ,MAKE.iframe({src:this.href},{width:'100%',height:'100%'
								,overflow:'auto'})
						]);
						document.body.appendChild(div);
					}
				},2000);
		}
		
		QProperty.call(this,['Center']);
		this.Center.afterSet=function(point){
			try{
				map.setCenter(new google.maps.LatLng(point.x,point.y))
			}catch(err){}
		}

		QProperty.call(this,['Size']);
		this.Size.afterSet=function(size){
			SET.css(_THIS.View(),size);
			try{
				google.maps.event.trigger(map, "resize");
			}catch(err){
				setTimeout(function(){google.maps.event.trigger(map, "resize");},1000);
			}
		}
		_THIS.Size({width:'480px',height:'320px'})
		QProperty.call(this,['OnMarkerClick']);
		this.OnMarkerClick(function(map,data,index,marker){
		})
		
		
		var extraMarkers=[];
		QProperty.call(this,['ExtraMarkers']);
		this.ExtraMarkers(function(map){
			return [];
		})
		this.ExtraMarkers.afterSet=function(_constructor){
			if(map==null)return;
            for (var i = 0; i < extraMarkers.length; i++ ) {
                extraMarkers[i].setMap(null);
            }
            extraMarkers.length=0;
			var _markers=_constructor(map);
			for(var i=0;i<_markers.length;i++){
				try{
					extraMarkers[i]=_markers[i]
				}catch(err){}
			}
		}
		QProperty.call(this,['MarkerAtIndex']);
		this.MarkerAtIndex(function(_map,_data,_index){
				var newMarker = new google.maps.Marker({
					position:new google.maps.LatLng(50,4),
					map:_map,
					title: 'Marker'
				});
				google.maps.event.addListener(newMarker, 'click', function(event) {
					_THIS.OnMarkerClick()(_map,_data,_index,newMarker);
				});
				newMarker.setIcon('https://cdn1.iconfinder.com/data/icons/30_Free_Black_ToolBar_Icons/40/Black_MapDrop.png');
				return newMarker;
		});
		QProperty.call(this,['OnViewportChanged']);
		this.OnViewportChanged(function(_map,_this){
			var lat0 = _map.getBounds().getNorthEast().lat();
			var lng0 = _map.getBounds().getNorthEast().lng();
			var lat1 = _map.getBounds().getSouthWest().lat();
			var lng1 = _map.getBounds().getSouthWest().lng();
		})
		var markers=[];
		QProperty.call(this,['Markers']);
		this.Markers.beforeSet=function(_markers_map){
		}
		this.Markers.afterSet=function(_markers){
			if(map==null)return;
            for (var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
                //console.log(markers[i]);
            }
            markers.length=0;
            //console.log(_markers);
			for(var i=0;i<_markers.length;i++){
				try{
					markers[i]=_THIS.MarkerAtIndex()(map,_markers,i);
				}catch(err){
					/*console.log('error',map,markers[i]);*/
				}
			}
		}
		function _init(options){
			map = new google.maps.Map(v,earthTypeOptions);
			map.setCenter(new google.maps.LatLng(_THIS.Center().x,_THIS.Center().y))
			
			_THIS.Size({width:'480px',height:'320px'});
			//console.log(_THIS.Markers())
			_THIS.Markers(_THIS.Markers());
			_THIS.ExtraMarkers(_THIS.ExtraMarkers());
			var styles = [
				{
					stylers: [
						{ hue: "#00ffe6" },
						{ saturation: -20 }
					]
				},{
					featureType: "landscape",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "poi",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "administrative.country",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "administrative.land_parcel",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "administrative.locality",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "administrative.locality",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "administrative.neighborhood",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "road.arterial",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "road.local",
					elementType: "all",
					stylers: [
						{ visibility: "off" }
					]
				},{
					featureType: "road.highway",
					elementType: "all",
					stylers: [
						{ visibility: "off" },
						{ hue: "#00ffe6" },
						{ saturation: -20 }
					]
				},{
					featureType: "all",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			];

			//map.setOptions({styles: styles});
			google.maps.event.addListener(map, 'zoom_changed', function(event) {
				try{
					_THIS.OnViewportChanged()(map,_THIS);
				}catch(err){}
			});
			google.maps.event.addListener(map,"center_changed", function(event) {
				viewportChanged=true;
			});
			var viewportChanged = false;
			google.maps.event.addListener(map,"mouseup", function() {
				if(viewportChanged){
					try{
						_THIS.OnViewportChanged()(map,_THIS);
					}catch(err){}
					viewportChanged = false;
				}
			});

			google.maps.event.addListener(map,"mousedown", function() {
				
			});
			geocoder = new google.maps.Geocoder();
		}
        this.getMap=function(){
            return map;
        }
	};
	WidgetStatic.call(MAPVIEW);
	return MAPVIEW;
})();


/* example
var ___MAP___=new GoogleMap()
    .Center({x:50.88,y:4.365})
    .OnViewportChanged(function(_map,_this){
        try{
            var lat0 = _map.getBounds().getNorthEast().lat();
            var lng0 = _map.getBounds().getNorthEast().lng();
            var lat1 = _map.getBounds().getSouthWest().lat();
            var lng1 = _map.getBounds().getSouthWest().lng();
        }catch(err){
            console.log(err);
        }
    })
    .OnMarkerClick(function(_map,_data,_index,_marker){
        var row=_data[_index];
    })
    .MarkerAtIndex(function(_map,_data,_index){
        var dat=_data[_index];
        var _x_=30,_y_=30;
        var newMarker = new google.maps.Circle({
            center:new google.maps.LatLng(_x_,_y_),
            strokeColor: '',
            strokeOpacity:.5,
            strokeWeight:1,
            fillColor: '',
            fillOpacity: 0.1,
            radius: 30000,
            map:_map
        });
        google.maps.event.addListener(newMarker, 'click', function(event) {
            _map.OnMarkerClick()(_map,_data,_index,newMarker);
        });
        return newMarker;
    })
    .Markers([])//REQ_TABLE({cmd:'get_map',te:-50,rri:-50,b:50,le:50})
    //.Parent(document.getElementById('map_container'));
    */
