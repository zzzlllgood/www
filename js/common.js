// JavaScript Document
var stringToDom=function(htmlString){
    var div= document.createElement("div");
    div.innerHTML=htmlString;
    return div.children[0];
}

var domToStirng=function(htmlDOM){
    if(outerHTML in htmlDOM){
        return htmlDOM.outerHTML;
    } else {
        var div= document.createElement("div");
        div.appendChild(htmlDOM);
        return div.innerHTML
    }
}

var getTop=function(obj) {
	var iTop = 0;
	while(obj) {
		iTop+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return iTop;
}

var	getMinHeight=function(arr){
	var index=0;
	var ih = arr[index].offsetHeight;
	for (var i=1; i<arr.length; i++) {
		if ( arr[i].offsetHeight < ih ) {
			index = i;
			ih = arr[i].offsetHeight;
		}
	}
	return index;
}
