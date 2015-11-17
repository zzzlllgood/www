// JavaScript Document
var ExprNoActive=/\s*active/g;
//拖拽------------------------
function Drag(){
	this.x=0;
	this.y=0;
	this.settings={
		owner:document.createElement('div'),
		length:0
	
	}
	
}
Drag.prototype={
	init:function(){
		var _this=this,
			opts=$.extend(true,_this.settings,opts),
			owner=opts.owner;
		
		
		
	}
}
//选项卡------------------------
function Tab(){
	this.settings={
		owner:document.createElement('div'),
		titleElements:null,
		panelElements:null,
		iNow:0,
		length:0
	};
}
Tab.prototype={
	init:function(opts){
		var _this=this,
			opts=$.extend(true,_this.settings,opts),
			owner=opts.owner,
			lis=owner.getElementsByTagName('li'),
			panels=owner.getElementsByTagName('div'),
			type='',
			eventHandle=null;
			
		opts.titleElements=lis;
		opts.panelElements=panels;
		opts.length=lis.length;
		
		if(opts.events){
			type=opts.events;
			
		}
		
		eventHandle=function(){
			_this.change.call(this,_this);
		}
		
		for(var i=0;i<opts.length;i++){
			lis[i].index=i;
			if ( lis[i].addEventListener ) {
				lis[i].addEventListener( type, eventHandle, false );
			}else if(lis[i].attachEvent){
				lis[i].attachEvent( 'on'+type, eventHandle );
			}
		}
	},
	change:function(t){
		var _this=t,
			opts=_this.settings,
			cls='';
		for(var i=0;i<opts.length;i++){
			if(opts.titleElements[i].className.indexOf('active')>-1){
				cls=opts.titleElements[i].className;
				cls=cls.replace(ExprNoActive,'');  //关于正则替换
				opts.titleElements[i].className=cls;
				
				cls=opts.panelElements[i].className;
				cls=cls.replace(ExprNoActive,'');  //关于正则替换
				opts.panelElements[i].className=cls;

			}
			opts.panelElements[i].style.display='none';
		}
		this.className=this.className.length>0?this.className+' active':'active';
		opts.panelElements[this.index].className=opts.panelElements[this.index].className.length>0?opts.panelElements[this.index].className+' active':'active';
		opts.panelElements[this.index].style.display='block';
		opts.iNow=this.index;
	},
	autoPlay:function(){
		var _this=this,
			opts=_this.settings;
		setInterval(function(){
			if(opts.iNow==opts.length-1){
				opts.iNow=0;
			}else{
				opts.iNow++	
			}
			_this.change.call(opts.titleElements[opts.iNow],_this);
		
		},2000);
		
	}
}

