$(function(){

$index_i=$(".index i");
$index_span_img=$(".index span img");
$index_img=$(".index_img");
$index_img_em=$index_img.find("em");

$index_span_img_width=$index_span_img.width();
$index_span_img_height=$index_span_img.height();

$index_i_width=60;//带上边框
$index_i_height=60;

//获取主区域X轴Y轴位置
$index_offset_left=$index_span_img.offset().left;
$index_offset_top=$index_span_img.offset().top;

$index_img_width=300;
$index_img_height=300;
//原图大小
$index_img_width_original=1500;
$index_img_double=$index_img_width_original/$index_img_width;

//右侧定位
$index_img.css({"left":$index_offset_left+$index_span_img_width+"px","top":$index_offset_top+"px",
"width":$index_img_width+"px","height":$index_img_height+"px"});

$index_span_img.hover(function(){
	$index_i.attr({"id":"index_i"});
	$(".index_img").show();
	$index_i.show();
	window.onmousemove=function(){
	$event_x=event.x;
	$event_y=event.y;

//检测图片上的元素位置
$index_i_offset_top=$index_i.offset().top-$index_offset_top;
$index_i_offset_left=$index_i.offset().left-$index_offset_left;

//当鼠标移动的时候右侧也变化
$index_img_em.stop();
$index_img_em.animate({"top":"-"+($index_i_offset_top*$index_img_double)+"px","left":"-"+($index_i_offset_left*$index_img_double)+"px"});

//左侧图片上面鼠标选区
$index_i.stop();
$index_i.css({"top":($event_y-$index_i_width/2)+"px","left":$event_x-$index_i_width/2+"px"});

//不能超出左侧
if ($event_x-$index_offset_left<=0+25) {
	$index_i.css({"top":event.y-$index_i_width/2+"px","left":($index_offset_left)+"px"});
}
//不能超出右侧
if ($event_x>=$index_offset_left+$index_span_img_width-$index_i_width/2) {
	$index_i.css({"top":$event_y-$index_i_height/2+"px","left":($index_offset_left+$index_span_img_width-$index_i_width)+"px"});
}
//不能超出下侧
if ($event_y>=($index_offset_top+$index_span_img_height)-$index_i_height/2) {
	$index_i.css({"top":($index_offset_left+$index_span_img_height-$index_i_height)+"px","left":$event_x-$index_i_width/2+"px"});
}

//不能超出上侧
if($event_y-$index_offset_top<=0+25){
	$index_i.css({"top":($index_offset_top)+"px","left":event.x-$index_i_width/2+"px"});
}
//不能超出左上
if($event_y-$index_offset_top<=0+25 && $event_x-$index_offset_left<=0+25){
	$index_i.css({"top":($index_offset_top)+"px","left":($index_offset_left)+"px"});
}

//不能超出左下
if($event_x-$index_offset_left<=0+25 && $event_y>=$index_offset_top+$index_span_img_height-$index_i_height/2){
	$index_i.css({"top":($index_offset_top+$index_span_img_height-$index_i_height)+"px","left":($index_offset_left)+"px"});
}

//不能超出右上
if($event_x>=$index_offset_left+$index_span_img_width-25 && $event_y-$index_offset_top<=0+25){
	$index_i.css({"top":($index_offset_top)+"px","left":($index_offset_left+$index_span_img_width-$index_i_width)+"px"});
}

//不能超出右下
if($event_y>=$index_offset_top+$index_span_img_height-$index_i_height/2 && $event_x>=$index_offset_left+$index_span_img_width-$index_i_width/2){
	$index_i.css({"top":($index_offset_top+$index_span_img_height-$index_i_height)+"px","left":($index_offset_left+$index_span_img_width-$index_i_width)+"px"});
}


		
	};
});


$index_i.mouseout(function(){
	$index_i.removeAttr("id").hide();
	$index_img.hide();
});




});