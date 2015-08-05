/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/6/13
 * Time: 10:59 AM
 * To change this template use File | Settings | File Templates.
 */
function FiniteToolController(name,clickCallbacks,moveCallBacks){
    this.selected=false;
    var _controller=this;
    this.name=name||"tool";
    this.clickIndex=0;
    this.moveIndex=-1;
    this.clicks=clickCallbacks||[];
    this.moves=moveCallBacks||[];
    this.onClick=function(event,extras){
        if(_controller.clickIndex==_controller.clicks.length){
            _controller.clickIndex=0;
            _controller.moveIndex=-1;
        }
        _controller.clicks[_controller.clickIndex](event,extras);
        _controller.clickIndex++;
        _controller.moveIndex++;
    }
    this.onMove=function(event,extras){
        _controller.moves[_controller.moveIndex](event,extras);
    }
}
FiniteToolController.constructor=FiniteToolController;
FiniteToolController.prototype=new Controller();