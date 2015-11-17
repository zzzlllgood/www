/*
* common plugins 
* create by alian
*/
;(function($){
	/*头尾部加载*/
	 window.menuIndex=0;
	 window.load_header_footer=function(fn_header,fn_footer){
	 	var headerId="header";
	 	var footerId="footer";
	 	$("#"+headerId).load("header.html",fn_header);
	 	$("#"+footerId).load("footer.html",fn_footer);
		function fn_header(){
			var $ul=$("#"+headerId).find("ul");
			var $li=$ul.find("li");
			$li.on("click",{fun:window.menuChange},function(event){
				menuIndex=$(this).index();
				$li.removeClass('cur').eq(menuIndex).addClass('cur');
				if(event.data.fun)event.data.fun();
			}).removeClass('cur').eq(menuIndex).addClass('cur');
			//alert("header");
		}
		function fn_footer(){
			//alert("footer");	
		}
	 };


window.TempEngine=function(element,opts){
	this.box=element;
	this.rule=opts.rule;
	this.engine = baidu.template || opts.engine;
	this.datas=opts.datas;
	this.callback=opts.callback;
	this.editable=opts.editable||false;
	
}
TempEngine.VERSION  = '1.0';
TempEngine.DEFAULTS = {}
TempEngine.prototype={
	init:function(opts){
		var _this=this;
		_this.build();
		return _this;
	},
	renderFun:function(){
		var _this=this;
		return _this.renderFun;
	},
	render:function(data){
		var _this=this;
		return _this.datas&&_this.renderFun(data||_this.datas);
	},
	build:function(data){
		var _this=this;
		_this.renderFun= _this.rule&&_this.engine(_this.rule);
		var html=_this.datas&&_this.renderFun(data||_this.

			datas);
		_this.box.innerHTML=html;
		if(_this.callback){_this.callback();};
	},
	sort:function(inc,fn){
		var _this=this;
		var sort=document.creatElement('div');
		sort.className = inc?"sort sort-down":"sort sort-up";
		_this.box.appendChild(sort);
		_this.datas.lists.entry.sort(fn?fn:function(a, b){
		  return (inc?1:-1)*a.name.localeCompare(b.name);
		});
		_this.insertHTML();
	},
	state:function(opts,s){
		var _this=this;	
		//设置所有为s状态
		if(typeof opts=="string"){
			s=opts;
			opts=null;
			$.each(_this.datas.lists.entry, function(i,value){
				value.state = s;
			});	
		}else{
			var opts=opts||_this.datas.lists.entry;
			var i=opts.index||0,id=opts.id||0;
			if(i&&_this.datas.lists.entry[i])_this.datas.lists.entry[i].state=s;
			id&&$.each(_this.datas.lists.entry[i], function(i,value){
				if(value.id == opts.id){
					value.state = s;
				}
			});
		}
		_this.insertHTML(); 
	},
	getState:function(opts){
		var _this=this,
			opts=opts||_this.datas.lists.entry,
			i=opts.index||0,
			id=opts.id||0;
		if(i)return _this.datas.lists.entry[i]&&_this.datas.lists.entry[i].state;
		id&&$.each(_this.datas.lists.entry[i], function(i,value){
		   if(value.id == opts.id){
				return value.state;
			}
		});
	},
	create : function(opts,fn){
		var _this=this;
		_this.datas.lists.entry.unshift(opts);
		_this.insertHTML();
		if(fn)fn.call(_this,opts);
	},
	edit:function(opts){
		var _this=this;
		if(!opts){
			opts='edit';
		}
		_this.state(opts);
	},
	del : function(opts){
		var _this=this,
			i=opts.index,
			id=opts.id;
		if(!opts){
			_this.datas.lists.entry=[];
			return;
		}
		if(i&&_this.datas.lists.entry[i]){_this.datas.lists.entry.splice(i,1)};
		id&&$.each(_this.datas.lists.entry, function(i,value){	
			if(value.id == opts.id){
				$.extend(true,value,opts);
				_this.datas.lists.entry.splice(i,1);
			}
		});
		_this.insertHTML();
	},
	save : function(opts){
		var _this=this;
		if(!opts){
			opts='normal';
		}
		_this.state(opts);
	},
	cancel : function(opts){
		var _this=this;
		if(!opts){
			opts='normal';
		}
		_this.state(opts);
		_this.insertHTML();
	},
	_bindEvent:function(){
		var _this=this;
	}
	
}
var old = $.fn.tempEngine;
$.fn.tempEngine= tempEngine;
$.fn.tempEngine.Constructor = TempEngine;
function tempEngine(option){
	return this.each(function () {
      var $this=$(this);
      //var data=$this.data('tempEngine');
      var options=$.extend({}, TempEngine.DEFAULTS, $this.data(), typeof option == 'object' && option);
      $this.data('tempEngine', (data = new TempEngine(this, options)));
      var action=typeof option == 'string' ? option : 'init';
      if (action) data[action]();
    });
}
$.fn.tempEngine.noConflict = function () {
$.fn.tempEngine = old
	return this
}
	
//------------------------------------
/*按模块异步加载数据公用函数*/
var module=window.module={
	loadData:function(option){
		$.getJSON(option.url,function(json, textStatus) {//http://api.douban.com/v2/book/1220562
			var data={lists:json};
			if(!option.cacheData||option.cacheData!=data)option.cacheData=data;
			var opts={
				rule:option.rule,
				datas:data,
				callback:function(){
					if(option.callback)option.callback(data);
				}
			};
			option.box.tempEngine(opts);
			var html=option.box.data("tempEngine").render();
			if(!option.cacheHTML||option.cacheHTML!=html)option.cacheHTML=html;
		});
	},
	loadDatas:function(option){
		var arr=module.combine(option);
		for(var i=0;i<arr.length;i++){
			module.loadData(arr[i]);
		}
	},
	combine:function(option){
		var modules=option.modules,boxs=option.boxs,rules=option.rules,callbacks=option.callbacks,arrModules=[];
		if(modules.length>0){
			for(var m in modules){
				if(m!="length"){
					modules[m].box=boxs[menuIndex][m]||document.body;
					modules[m].rule=rules[menuIndex][m]||'';
					modules[m].callback=callbacks[menuIndex][m]||function(){};
					arrModules.push(modules[m]);
				}
			}
		}
		return arrModules;
	}
}


/*
	before after 使伪元素支持IE6-8
	html:<div class="example" data-content="◀"></div>
	css:.example:before, .example before { content: attr(data-content); ... }
	.example:after, .example after { content: attr(data-content); ... }
*/
var $beforeAfter = function(dom) {
    if (document.querySelector || !dom && dom.nodeType !== 1) return;
    
    var content = dom.getAttribute("data-content") || '';     
    var before = document.createElement("before")
        , after = document.createElement("after");
      
    // 内部content
    before.innerHTML = content;
    after.innerHTML = content;
    // 前后分别插入节点
    dom.insertBefore(before, dom.firstChild);
    dom.appendChild(after);
};





	//----------------------------------------------------
	/*nav toggle，一二级导航dd*/
	$.fn.navs = function(options1,options2){ 
		var defaults1 = {ctag: 'li',curCss: 'current',overCss:'hover',click:null},
			defaults2 = {subnav: '#subnav',ptag:'ul',ctag:'li',curCss:'current',overCss:'hover',click:null},
			opts1 = $.extend(defaults1, options1),
			opts2 = $.extend(defaults2, options2);
		
		return this.each(function() {
			var o = $.meta ? $.extend(opts1, $this.data()) : opts1;
			var oo = $.meta ? $.extend(opts2, $this.data()) : opts2;
			var $this = $(this),
				nodes = $this.find(o.ctag),
				subnav = $(oo.subnav),
				subNavs = subnav.find(oo.ptag);
			//一级
			nodes.each(function(i,e){
				$(e).hover(function(){
					$(this).toggleClass(o.overCss);
				}).bind("click",{index:i},function(event){
					nodes.removeClass(o.curCss);
					$(this).addClass(o.curCss);
					var subCNodes = subNavs.hide().eq(i).find(oo.ctag);
					if(subCNodes.size()>0){
						subNavs.eq(i).show();
						subCNodes.removeClass(oo.curCss).eq(0).addClass(oo.curCss);
					}else{
						subNavs.eq(i).hide()
					}
					if(subNavs.eq(0).find(oo.ctag).size()>0) subNavs.eq(0).show();
					if(o.click) o.click(event.data.index);
				});
			});
			//二级
			subNavs.each(function(){
				var subCNodes = $(this).find(oo.ctag);
				subCNodes.each(function(i,e){
				    $(e).hover(function() {
                        $(this).toggleClass(o.overCss);
                    }).bind('click', {index:i},function(event) {
                        subCNodes.removeClass(oo.curCss);
                        $(this).addClass(oo.curCss);
                        if(oo.click) oo.click(event.data.index);
                    });
				});
			});			
		});
	};
	/*menu slider，菜单目前只支持到二级*/
    $.fn.menus = function(options){
        var defaults = {headTag:'.menuhead',conTag:'.menucon',height:0,curCss:'current',overCss:'hover',openFirst:true,click:null};
            opts = $.extend(true, defaults, options);
        return this.each(function(){
            var $this = $(this),
                o = $.meta ? $.extend(opts, $this.data()) : opts;
            $this.children(o.headTag).each(function(){
                $(this).unbind("click").bind("click",function(){
                    if($(this).hasClass(o.curCss)) return;
                    sildeLi($(this),$(this).next(o.conTag),o);
                    if(o.click) o.click($(this));
                }).unbind("hover").bind("hover",function(){
                    $(this).toggleClass(o.overCss);
                }); 
                if(o.height==0)
                    $(this).next(o.conTag).hide();
                else
                    $(this).next(o.conTag).height(0);
            });
            if(o.openFirst){
                var first = $this.children(o.headTag).first();
                sildeLi(first,first.next(o.conTag),o,true); 
            }
        });
        function sildeLi(head,con,o,notSlider){
            if(notSlider){
                if(con.height()>0){
                    con.height(0);
                }else{
                    con.height(o.height);
                }
                return; 
            }
            if(o.height==0){
                if(con.css("display")=="none"){
                    head.addClass(o.curCss);
                    con.slideDown("fast");
                }else{
                    head.removeClass(o.curCss);
                    con.slideUp("fast");
                }
            }else{
                if(con.height()>0){
                    con.animate({"height":0}, {complete:function(){head.removeClass(o.curCss);con.css("overflow","hidden")}});
                }else{
                    head.addClass(o.curCss);
                    con.animate({"height":o.height}, {complete:function(){con.css("overflow","auto")}});
                }
            }
        }
    };
	
    /*
	*wresize
	*/
	$.fn.wresize = function(f){
		function handleWResize(e){
			if(f){
				if(f.tid)clearTimeout(f.tid);
				f.tid=setTimeout(function(){
					f.call([e]);
				},100)
			}
		}
		this.each(function(){
			if (this == window){
				$(this).resize(handleWResize);
			}else{
				$(this).resize(f);
			}
		});
		return this;
	};
	/*datagrid.methods*/
	if($.fn.datagrid){
    	$.extend($.fn.datagrid.methods, {
    		editCell: function(jq,param){
    			return jq.each(function(){
    				var opts = $(this).datagrid('options');
    				var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
    				for(var i=0; i<fields.length; i++){
    					var col = $(this).datagrid('getColumnOption', fields[i]);
    					col.editor1 = col.editor;
    					if (fields[i] != param.field){
    						col.editor = null;
    					}
    				}
    				$(this).datagrid('beginEdit', param.index);
    				for(var i=0; i<fields.length; i++){
    					var col = $(this).datagrid('getColumnOption', fields[i]);
    					col.editor = col.editor1;
    				}
    				$(".datagrid-editable-input").focus();
    			});
    		},
			// 激活某字段表格列的编辑状态
			// create by guoshun.hou 20130926
			activateColumnEditor:function(jq,columnsNames){
				jq.each(function(){
					var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
					for(var i=0; i<fields.length; i++){
						var col = $(this).datagrid('getColumnOption', fields[i]);
						col.editor1 = col.editor;
						if (columnsNames.indexOf(fields[i])<0){
							col.editor = null;
						}
					}
					for(var i=0; i<$(this).datagrid('getRows').length; i++){
						$(this).datagrid('beginEdit', i);
					}
					for(var i=0; i<fields.length; i++){
						var col = $(this).datagrid('getColumnOption', fields[i]);
						col.editor = col.editor1;
					}
				});
			},
			// 合并指定列内容相同的单元格
			// create by guoshun.hou 20130922
			mergeCellsByField: function(jq, colList){
				var ColArray = colList.split(',');
				var TableRowCnts = jq.datagrid('getRows').length;
				var tmpA;
				var tmpB;
				var PerTxt = '';
				var CurTxt = '';
				var alertStr = '';
				for(j=ColArray.length-1;j>=0;j--){
					PerTxt = "";
					tmpA = 1;
					tmpB = 0;
					for(i=0;i<=TableRowCnts;i++){
						if(i==TableRowCnts)
							CurTxt = '';
						else
							CurTxt = jq.datagrid('getRows')[i][ColArray[j]];
						if(PerTxt==CurTxt)
							tmpA += 1;
						else{
							tmpB += tmpA;
							jq.datagrid('mergeCells',{
								index: i-tmpA,
								field: ColArray[j],
								rowspan: tmpA,
								colspan: null
							});
							tmpA = 1;
						}
						PerTxt = CurTxt;
					}
				}
				jq.datagrid("selectComplexRow");
			},
			// 复杂表格整行背景色
			// create by guoshun.hou 20130930
			selectComplexRow:function(jq){
				var rowspan = 1;
				var table =  jq.datagrid('getPanel').find('.datagrid-body table');
				table.each(function(){
					$(this).find('tr').each(function(i){
						$(this).find('td').each(function(){
							this.beginRowIndex = i + 1;
							rowspan = $(this).attr('rowspan');
							this.endRowIndex = i + (rowspan?parseInt(rowspan):1);
							$(this).mouseover(function(){
								var _this = this;
								table.find('td').each(function(){
									//sender为单行
									if(_this.beginRowIndex == _this.endRowIndex){
										if(_this.beginRowIndex >= this.beginRowIndex && _this.endRowIndex <= this.endRowIndex){$(this).addClass('td-over');}
									}else{
										//target为单行
										if(this.beginRowIndex == this.endRowIndex){
											if(_this.beginRowIndex <= this.beginRowIndex && _this.endRowIndex >= this.endRowIndex){$(this).addClass('td-over');}
										}else{
											if((this.beginRowIndex <= _this.beginRowIndex && this.endRowIndex >= _this.endRowIndex) || (_this.beginRowIndex <= this.beginRowIndex && _this.endRowIndex >= this.endRowIndex)){$(this).addClass('td-over');}
										}
									}
								});
							}).mouseout(function(){table.find('td').removeClass('td-over');});
						});
					});
				});
			}
    	});
    	$.extend($.fn.datagrid.defaults.editors, {  
    	    select: {  
    	        init: function(container, options){
    	        	var data = options.data,len=data.length,html="",onchange = options.onChange;
    	        	while(len--){
    	        		html += "<option value="+data[len].value+">"+data[len].text+"</option>";
    	        	}
    	            var select = $('<select>'+html+'</select>').appendTo(container).on("change",function(){if(typeof onchange == "function") onchange(this);});
    	            return select;
    	        },
    	        getValue: function(target){  
    	            return $(target).val();
    	        },
    	        setValue: function(target, value){  
    	            $(target).val(value);
    	        },
    	        resize: function(target, width){  
    	            var select = $(target);  
    	            if ($.boxModel == true){  
    	            	select.width(width - (select.outerWidth() - select.width())-10);  
    	            } else {  
    	            	select.width(width-10);
    	            }  
    	        }  
    	    }  
    	});
   	};
})(jQuery);

//格式化json模板
function formatJson(str,args){
	if(!str) return str='';
	for(var i in args){
		var reg= new RegExp('\{('+i+')\}',"g");
		str = str.replace(reg,args[i]);
	}
	return str;
}
//debugging    
function debug(info) {
	if (window.console && window.console.log)    
	window.console.log('out: ' + info);
};
//双击不选中
var clearSelection = function () {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    }
    else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
	}
};

(function($){
    //按钮效果
    $("button.button").hover(function(){$(this).toggleClass("bhover")}).mousedown(function(){$(this).addClass("bclick");}).mouseup(function(){$(this).removeClass("bclick")});
    $("button.sbutton").hover(function(){$(this).toggleClass("shover")}).mousedown(function(){$(this).addClass("sclick");}).mouseup(function(){$(this).removeClass("sclick")});
    $("button.bbutton").hover(function(){$(this).toggleClass("bbhover")}).mousedown(function(){$(this).addClass("bbclick");}).mouseup(function(){$(this).removeClass("bbclick")});
	$("button.selbutton1").hover(function(){$(this).toggleClass("selhover1")}).mousedown(function(){$(this).addClass("selclick1");}).mouseup(function(){$(this).removeClass("selclick1")});
	$("button.selbutton2").hover(function(){$(this).toggleClass("selhover2")}).mousedown(function(){$(this).addClass("selclick2");}).mouseup(function(){$(this).removeClass("selclick2")});
	$("button.selbutton3").hover(function(){$(this).toggleClass("selhover3")}).mousedown(function(){$(this).addClass("selclick3");}).mouseup(function(){$(this).removeClass("selclick3")});
	$("button.selbutton4").hover(function(){$(this).toggleClass("selhover4")}).mousedown(function(){$(this).addClass("selclick4");}).mouseup(function(){$(this).removeClass("selclick4")});
	$(".sch input.txt").click(function(){$(this).val("").addClass("on");}).blur(function(){if(this.value=="")$(this).val("输入名称或编号").removeClass("on");});
	$(".extend-button").on("click",function(){$(this).text($(this).text()=="展开"?"收起":"展开");$(this).toggleClass('extend-button-collapse');});
	$(".extend-sch-button").unbind().on("click",function(){$(this).text($(this).text()=="显示搜索栏"?"隐藏搜索栏":"显示搜索栏");$(this).toggleClass('extend-button-collapse');});
})(jQuery);


//日期比较、日期不能晚于今天
(function($){
	$.fn.tdDate = function(options){ 
		var defaults = {obj:'div.calendar-body',children: 'td',className:'calendar-other-month',click:null},
			opts = $.extend(defaults, options);
		return this.each(function() {
			var o = $.meta ? $.extend(opts1, $this.data()) : opts;
			var $this = $(this);
				$children = $this.find(o.children);
				$children.each(function(){
					var tdDate=$(this).attr("abbr");
					var tdArray=tdDate.split(',');
					tdArray[1]=formatorDate(tdArray[1]);
					tdArray[2]=formatorDate(tdArray[2]);
					tdDate=tdArray[0]+"-"+tdArray[1]+"-"+tdArray[2];
					var d1=curDate();
					var d2=tdDate;
					var bool=dateCompare2(d1,d2);
					if(bool)
					{
						$(this).addClass("calendar-other-month");
					}
				});
						
		});
}
	
})(jQuery);
function curDate(){
	 	var today = new Date();
		var y = today.getFullYear();
		var m = today.getMonth()+1;
		var d = today.getDate();
		var tdDate=null;
		m=formatorDate(m);
		d=formatorDate(d);
		var d1=y+"-"+m+"-"+d;
		return d1;
	 
	 }
function dateCompare(d2){
	var d1=curDate();
	dateCompare1(d1,d2);   
}
function dateCompare1(d1,d2){
	var reg=new RegExp("-","g"); //创建正则RegExp对象  
	var tempBeginTime=d1.replace(reg,"\/");      
	var tempEndTime=d2.replace(reg,"\/");       
	//比较时间大小，开始时间一定要小于结束时间       
	if(Date.parse(new Date(tempBeginTime))>Date.parse(new Date(tempEndTime))){
		alert("开始时间不能晚于结束时间");
		$('#js_planstart').datebox("setValue",d1);
		return;
	} 
}
function dateCompare2(d1,d2){
	var reg=new RegExp("-","g"); //创建正则RegExp对象  
	var tempBeginTime=d1.replace(reg,"\/");      
	var tempEndTime=d2.replace(reg,"\/");       
	//比较时间大小，开始时间一定要小于结束时间       
	if(Date.parse(new Date(tempBeginTime))>Date.parse(new Date(tempEndTime))){
		return true;
	} 
	else{
	 return false;
	}
}
 //格式化月和日
 function formatorDate(time){
	if(time.toString().length == 1)
	{
		time="0"+time;
		return time;
	}
	else{
		return time;
	}
 }

//textarea自动增高
function addEvent(){
	var obj_textarea = document.getElementsByTagName("textarea");
	if(obj_textarea[0]=="undefined"||obj_textarea[0]==null) return;
	for(var i=0;i<3;i++){
		if(obj_textarea[i])
		{
			if (window.addEventListener) {//Mozilla系列
				obj_textarea[i].addEventListener('input', TextAreaH_NOIE, false);
			} else if (window.attachEvent) {//IE
				obj_textarea[i].attachEvent('onpropertychange',function (){
					TextAreaH_NOIE.call(event.srcElement);
				});
			}
		}
	}
	function TextAreaH_NOIE(){
		if((this.scrollHeight-this.clientHeight)>0)this.style.height=this.scrollHeight + 'px';
	}
}
//create by guoshun.hou on 20130917
//目录树节点：上（-1）下（1）移
function move(sender, path, fn){
	var tr = $(sender).parents('.datagrid-row');
	var trSub = tr.next('tr.treegrid-tr-tree');
	if(path==1){
		var sib = tr.nextAll('tr:not(.treegrid-tr-tree):first');
		var sibSub = sib.next('tr.treegrid-tr-tree');
		if(sib[0]){
			if(sibSub[0]){
				tr.insertAfter(sibSub);
			}else{
				tr.insertAfter(sib);
			}
			trSub.insertAfter(tr);
			if(fn)fn.call(tr,sib);
		}else{
			alert('已到最下位置');	
		}
	}else{
		var sib = tr.prevAll('tr:not(.treegrid-tr-tree):first');
		var sibSub = sib.next('tr.treegrid-tr-tree');
		if(sib[0]){
			tr.insertBefore(sib);
			trSub.insertAfter(tr);
			if(fn)fn.call(tr,sib);
		}else{
			alert('已到最上位置');	
		}
	}
}

//textarea align
function textareAlign(parent){
	var winWidth = $(window).width(),winHeight=$(window).height();
	$("textarea.equalW").width(winWidth*0.5+224);
	var hScroll,hh,wScroll,ww;
	hScroll=document.getElementById(parent).scrollHeight;
	hh=document.getElementById(parent).clientHeight;
	wScroll=document.getElementById(parent).scrollWidth;
	ww=document.getElementById(parent).clientWidth;
	if ((hScroll-hh<=0)&&(wScroll-ww<=0))	//no vertical and no line
	{	//alert("both no");
		$("textarea.equalW").width(winWidth*0.5+224);
	}
	else if ((hScroll-hh>0)&&(wScroll-ww>0)) //vertical and line
	{	//alert("both");
		$("textarea.equalW").width(586);
		if(navigator.userAgent.indexOf("MSIE 6.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0){
			$("textarea.equalW").width(winWidth*0.5+224);
			$("#"+parent).addClass("hidden-x").addClass("hidden-y");
			if((hScroll-hh<18)&&(wScroll-ww<18))
			{	//alert("both ie no");
				$("textarea.equalW").width(winWidth*0.5+244);
				$("#"+parent).addClass("hidden-x").addClass("hidden-y");
			}
			else if((hScroll-hh<18)&&(wScroll-ww>=18)){
				//alert("ie l");
				$("textarea.equalW").width(604);
				$("#"+parent).addClass("hidden-y").removeClass("hidden-x");
			}
			else if((hScroll-hh>=18)&&(wScroll-ww<18)){
				//alert("ie v");
				$("textarea.equalW").width(winWidth*0.5+224);
				$("#"+parent).addClass("hidden-x").removeClass("hidden-y");
			}
			else if((hScroll-hh>=18)&&(wScroll-ww>=18)){
				//alert("ie both");
				$("textarea.equalW").width(604);
				$("#"+parent).removeClass("hidden-x").removeClass("hidden-y");
			}
		}
	}
	else if((hScroll-hh>0)&&(wScroll-ww<=0))  //vertical
	{	//alert("v");
		$("textarea.equalW").width(winWidth*0.5+216);
	}
	else if((hScroll-hh<=0)&&(wScroll-ww>0)){ //line
		//alert("l");
		$("textarea.equalW").width(586);
	}	
}








