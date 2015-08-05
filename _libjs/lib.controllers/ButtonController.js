/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/6/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

function ButtonController(name,click){
    var _controller=this;
    this.name=name||"tool";
    this.click=click;
    this.onClick=function(event,extras){
        _controller.click;
    }
}
ButtonController.constructor=ButtonController;
ButtonController.prototype=new Controller();