/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 1/9/13
 * Time: 6:10 PM
 * To change this template use File | Settings | File Templates.
 */
function PatternStyle(/*color,*/procedure,rectangle,repeatOption,scale){
    //this.color=color;
    this.procedure=procedure;
    this.rectangle=rectangle;
    this.repeatOption=repeatOption;
    this.scale=scale;
}
PatternStyle.constructor=PatternStyle;
PatternStyle.prototype=new PatternStyle();
PatternStyle.prototype.clone=function(){
    return new PatternStyle(this.procedure,this.rectangle,this.repeatOption,this.scale)
}
PatternStyle.prototype.set=function(parameter){
    if(typeof parameter=='function'){
        this.procedure=parameter;
        return this
    }
    if(typeof parameter=='string'){
        this.repeatOption=parameter;
        return this
    }
    if(typeof parameter=='number'){
        this.scale=parameter;
        return this
    }
    if(parameter instanceof Rectangle){
        this.rectangle=parameter;
        return this
    }
}

PatternStyle.REPEAT_OPTION={
    repeat:'repeat',
    repeatX:'repeat-x',
    repeatY:'repeat-y',
    noRepeat:'no-repeat'
}
PatternStyle.ANSI={
    DASHED:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.DASHED.scale;
            context.fillRect(0,0,s/2,10);
        },
        new Rectangle(0,0,2000,10),
        PatternStyle.REPEAT_OPTION.repeat,
        2000
    ),
    DASHED2X:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.DASHED2X.scale;
            context.fillRect(0,0,s/2,10);
        },
        new Rectangle(0,0,1000,10),
        PatternStyle.REPEAT_OPTION.repeat,
        1000
    ),
    DOTDASH:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.DOTDASH.scale;
            context.fillRect(0,0,s/2,10);
            context.fillRect(3*s/4-50,0,100,10);
        },
        new Rectangle(0,0,2000,10),
        PatternStyle.REPEAT_OPTION.repeat,
        2000
    ),
    CENTER:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.CENTER.scale/8;
            context.fillRect(0,0,5*s,10);
            context.fillRect(6*s,0,s,10);
        },
        new Rectangle(0,0,2000,10),
        PatternStyle.REPEAT_OPTION.repeat,
        2000
    ),
    ANSI31:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.ANSI31.scale;
            //log(s);
            context.beginPath();
            context.moveTo(s/2-100,-100);
            context.lineTo(s+100,s/2+100);
            context.moveTo(-100,s/2-100);
            context.lineTo(s/2+100,s+100);
            context.stroke();
        },
        new Rectangle(0,0,1000,1000),
        PatternStyle.REPEAT_OPTION.repeat,
        1000
    ),
    ANSI32:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.ANSI32.scale;
            //log(s);
            context.beginPath();
            context.moveTo(-s/2-100,-100);
            context.lineTo(s/2+100,s+100);
            context.moveTo(s/2-100,-100);
            context.lineTo(3*s/2+100,s+100);

            context.translate(s/3,0);

            context.moveTo(-s/2-100,-100);
            context.lineTo(s/2+100,s+100);
            context.moveTo(s/2-100,-100);
            context.lineTo(3*s/2+100,s+100);

            context.stroke();
        },
        new Rectangle(0,0,1000,1000),
        PatternStyle.REPEAT_OPTION.repeat,
        1000
    ),
    ANSI33:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.ANSI33.scale;
            //log(s);
            context.moveTo(s/2-100,-100);
            context.lineTo(s+100,s/2+100);
            context.moveTo(-100,s/2-100);
            context.lineTo(s/2+100,s+100);
            context.moveTo(s/2+100,-100);
            context.lineTo(-100,s/2+100);

            context.moveTo(s+100,s/2-100);
            context.lineTo(s/2-100,s+100);
            context.stroke();
        },
        new Rectangle(0,0,1000,1000),
        PatternStyle.REPEAT_OPTION.repeat,
        1000
    ),
    BRICK:new PatternStyle(/*"#FFff00",*/
        function(context){
            var s=PatternStyle.ANSI.ANSI33.scale;
            //log(s);
            context.strokeRect()
        },
        new Rectangle(0,0,1000,1000),
        PatternStyle.REPEAT_OPTION.repeat,
        1000
    )
}
/**
 *
 * @param definition
 * @constructor
 */
function Pattern(definition,color,scale){
    var _pattern=this;
    this.onPatternCreated=function(pattern){}
    this.createPatternFromURL=function(imageURL,repeatOption){
        var i=new Image();
        i.onload=function(event){
            var canvas=document.createElement("canvas");
            var context=canvas.getContext('2d');
            _pattern.pattern = context.createPattern(i, repeatOption||PatternStyle.REPEAT_OPTION.repeat);
            _pattern.onPatternCreated(_pattern);
        }
        i.src=imageURL;
        return this;
    }
    this.createPatternFromStyle=function(proto,color,scale){
        var repeatOption=proto.repeatOption,procedure=proto.procedure,rectangle=proto.rectangle;
        //proto.scale=scale;
        var canvas=document.createElement("canvas");
        canvas.width=proto.rectangle.width//proto.scale;
        canvas.height=proto.rectangle.height//proto.scale;
        var context=canvas.getContext('2d');
        var w=50//proto.scale;
        //context.scale(proto.scale,proto.scale);
        //log(w);
        context.lineWidth=w;
        context.strokeStyle=color;
        context.fillStyle=color;
        proto.color=color;
        context.globalAlpha=1;
        procedure(context);
        _pattern.pattern = context.createPattern(canvas, 'repeat');
        _pattern.pattern.proto=proto;
        _pattern.onPatternCreated(_pattern);
        return this;
    }
    if(definition!=null){
        this.createPatternFromStyle(definition,color||"#FF8800",scale||definition.scale);
        this.definition=definition;
    }
}
Pattern.constructor=Pattern;
Pattern.prototype=new Pattern;

