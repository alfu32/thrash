/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/22/12
 * Time: 9:36 AM
 * To change this template use File | Settings | File Templates.
 */
function FileDialogController(connectionController){
    var d=document.height-100;
    DialogViewControler.call(this,[d]);
    var fileDialogController=this;
    this.current=null;
    //var body=this.getBody();
    var head=this.getHead();
    ///head.view.children[0].style.fontSize="18px";
    head.view.parentNode.parentNode.style.width="300px";
    function makeFolder_listener(dialog){
        return function(event){
            var cf=dialog.current==null?"/":dialog.current.path;
            var name=prompt("folder name");
            connectionController.mkdir(cf+"\/"+name,function(error,stat){
                dialog.list();
            });
        }
    }
    function makeFile_listener(dialog){
        return function(event){
            var cf=dialog.current==null?"/":dialog.current.path;
            var name=prompt("file name");
            connectionController.writeFile(
                cf+"\/"+name+".u2d",JSON.stringify(layerManager.serialize()),
                function(error,stat){
                    dialog.list();
                });
        }
    }
    var lowerBar=new ViewController();
    lowerBar.initWithHTML("<div class='horizontalList_head'>" +
        "<div class='button' style='display:inline-block;margin-left: 1px;;width:125px'>New Folder</div>" +
        "<div class='button' style='display:inline-block;margin-left: 1px;;width:125px'>Save here</div>" +
        "</div>");
    lowerBar.view.children[0].addEventListener("click",makeFolder_listener(this),true);
    lowerBar.view.children[1].addEventListener("click",makeFile_listener(this),true);
    head.view.appendChild(lowerBar.view);

    var path=new ViewController();
    path.initWithHTML("<div class='horizontalList_head'></div>");
    path.renderItemAtIndex=function(_table,_index){
        var gotoFolder=function(_view,_t,_i,_link){
            //_view.innerHTML="a\sadd";//(_t[_i]=="")?"\/":_t[_i];
            return function(event){
                //log(_link);
                fileDialogController.list(_link);
            }
        }
        var lnk="/";
        for(var i=0;i<_index;i++){
            lnk+=_table[i]+"\/"
        }
        lnk+=_table[_index];
        var c=new ViewController();
        var n=""+_table[_index]+"";
        c.view=document.createElement("div");
        c.view.className="_button";
        c.view.innerHTML=(_table[_index]=="")?"\/":(_table[_index]+"");
        c.view.style.marginRight="3px";
        c.view.style.marginTop="8px";
        //c.initWithHTML("<div class='_button' title='"+lnk+"'></div>");
        //c.view.innerHTML=n;
        //log(c.view.innerHTML,_table[_index]);
        if(_table.length!=(_index+1))c.view.addEventListener("click",gotoFolder(c.view,_table,_index,lnk),true);
        else c.view.className="_button_disabled";
        return c.view;
    }
    head.view.appendChild(path.view);
    var fileList=this.getBody();//body;
    //log(body)
    fileList.renderItemAtIndex=function(table,index){
        var c=new DetailedCellViewController();
        var fileClick=function(controller,tab,i,ctrl){
            return function(event){
                var fileDialog=new DialogViewControler(104+3*44);
                var fileDialogBody=fileDialog.getBody();

                fileDialogBody.children=[
                    new ListItemView().Text("overwrite").Click(function(event,listItem){
                        var sure=confirm("confirm overwriting "+tab[i].path+"?");
                        if(sure){
                            var serial=layerManager.serialize();
                            log(serial);
                            var data=JSON.stringify(serial);
                            connectionController.writeFile(
                                tab[i].path,data,
                                function(error,stat){
                                    var l=StringUtils.toKilo(data.length);
                                    alert(l+"kB overwriten "+tab[i].path);
                                    controller.list();
                                });
                        }
                        fileDialog.dismiss();
                    }),
                    new ListItemView().Text("open").Click(function(event,listItem){
                        var sure=layerManager.unsaved?confirm("are you sure ?"):true;
                        if(sure){
                            connectionController.readFile(
                                tab[i].path,
                                function(error,fileName,data){
                                    var l=StringUtils.toKilo(data.length);
                                    layerManager.deserialize(JSON.parse(data));
                                    log(JSON.parse(data));
                                    log(l+"kB read from "+tab[i].path);
                                    controller.dismiss();
                                });
                        }
                        fileDialog.dismiss();
                    }),
                    new ListItemView().Text("delete").Click(function(event,listItem){
                        connectionController.delete(tab[i].path,function(error,stat){
                            controller.list();
                            fileDialog.dismiss();
                            alert("deleted "+tab[i].path);
                        });
                    })
                    /*,new ListItemView().Text("copy").Click(function(event,listItem){
                        fileDialog.dismiss();
                        alert("delete "+tab[i].path);
                    })
                    ,new ListItemView().Text("cut").Click(function(event,listItem){
                        fileDialog.dismiss();
                        alert("delete "+tab[i].path);
                    })*/
                ]
                fileDialogBody.renderItemAtIndex=function(table,index){
                    //log(index);
                    return table[index];
                }
                fileDialog.Title(tab[i].name);
                fileDialog.layout();
                fileDialog.show();
                event.stopPropagation();
            }
        }
        var folderEdit=function(controller,tab,i,ctrl){
            return function(event){
                var fileDialog=new DialogViewControler(104+4*44);
                var fileDialogBody=fileDialog.getBody();
                fileDialogBody.children=[
                    new ListItemView().Text("rename").Click(function(event,listItem){
                        var cf=controller.current==null?"/":controller.current.path;
                        var name=prompt("file name");
                        connectionController.writeFile(
                            tab[i].path,JSON.stringify(layerManager.serialize()),
                            function(error,stat){
                                controller.list();
                            });
                        fileDialog.dismiss();
                        alert("rename "+tab[i].path);
                    }),
                    new ListItemView().Text("delete").Click(function(event,listItem){
                        connectionController.delete(tab[i].path,function(error,stat){
                            controller.list();
                            fileDialog.dismiss();
                            alert("deleted "+tab[i].path);
                        });
                    }),
                    new ListItemView().Text("copy").Click(function(event,listItem){
                        fileDialog.dismiss();
                        alert("delete "+tab[i].path);
                    }),
                    new ListItemView().Text("cut").Click(function(event,listItem){
                        fileDialog.dismiss();
                        alert("delete "+tab[i].path);
                    })
                ]
                fileDialogBody.renderItemAtIndex=function(table,index){
                    //log(index);
                    return table[index];
                }
                fileDialog.Title(tab[i].name);
                fileDialog.layout();
                fileDialog.show();
                event.stopPropagation();
            }
        }
        var folderClick=function(controller,tab,i,ctrl){
            return function(event){
                ctrl.Icon(DropboxController.ICON_RESOURCE.LOADING);
                controller.list(tab[i].path);
                //controller.back=controller.current;
            }
        }
        var folderIconOver=function(){
            return function(event){
                this.src=DetailedCellViewController.ICONS.TABLE_NEXT_BUTTON;
            }
        }
        var folderIconOut=function(){
            return function(event){
                this.src=DetailedCellViewController.ICONS.DEFAULT;
            }
        }
        c.view.style.width="300px";
        c.view.style.cursor="pointer";
        if(table[index].isFolder){
            c.iconElement.addEventListener("click",folderEdit(fileDialogController,table,index,c),false)
            c.iconElement.addEventListener("mouseover",folderIconOver(),false)
            c.iconElement.addEventListener("mouseout",folderIconOut(),false)
            c.view.addEventListener("click",folderClick(fileDialogController,table,index,c),false);}
        else{
            c.view.addEventListener("click",fileClick(fileDialogController,table,index,c),false);
        }
        if(!table[index].isFolder)c.view.style.background="#edEdFF";
        //c.view.className="button";
        c.Detail(table[index].mimeType);
        c.Message(table[index].name);
        if(table[index].typeIcon in FileDialogController.ICONS_POSITION){
            c.IconBackground(
            "../../_libimg/dropbox/web_sprites-vflWSPSdY.png",
            FileDialogController.ICONS_POSITION[table[index].typeIcon])
        }else{
            c.IconBackground(
                "../../_libimg/dropbox/web_sprites-vflWSPSdY.png",
                FileDialogController.ICONS_POSITION.page_white)
        }
        return c;
    }
    //this.back=null;
    //this.current=null;
    this.list=function(dir){
        var pathString=(dir?((dir=="")?"/":dir):(this.current?this.current.path:"/"));
        //log(pathString);
        connectionController.listDir(pathString,function(error,entries,stat,entriesStat){
            entriesStat.sort(function(a,b){var af=""+(a.isFolder?"0":"1")+ a.name,bf=""+(b.isFolder?"0":"1")+ b.name;/*log(af,bf,af>bf)*/;return af>bf});
            fileDialogController.Title("Dropbox");//stat.path);
            fileList.children=[];
            fileDialogController.current=stat;
            path.children=(stat.path.split("\/"));

            //if(path.children.length>0)path.children.length-=1;
            path.layout();
            fileList.children=fileList.children.concat(entriesStat);
            //log(stat.path.split("\/"));
            //log(entriesStat);
            fileDialogController.layout();
        })
    }


}
FileDialogController.ICONS_POSITION={
    folder:2615,
    sharedFolder:3188,
    page_white_text:7899,
    page_white:5722,
    page_white_excel:6654,
    page_white_compressed:6122,
    page_white_tux:7999,
    page_white_powerpoint:7553,
    page_white_word:8281,
    page_white_acrobat:5773,

    page_white_picture:7467,
    page_white_sound:7799,
    page_white_film:6737,

    page_white_vector:8115,
    page_white_paint:7301,

    page_white_csharp:6338,
    page_white_code:6039,//html
    page_white_c:5956,
    page_white_cplusplus:6255,
    page_white_flash:6820,
    page_white_cup:6421,//java
    page_white_php:7384,
    page_white_ruby:7716,//ruby
}
FileDialogController.constructor=FileDialogController;
FileDialogController.prototype=new ViewController();