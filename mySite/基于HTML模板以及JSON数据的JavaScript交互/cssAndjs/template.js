// JavaScript Document
String.prototype.temp = function(obj) {
	return this.replace(/\$\w+\$/gi, function(matchs) {
		var returns = obj[matchs.replace(/\$/g, "")];
		return (returns + "") == "undefined"? "": returns;
	});
};

var objForTempJson = {
	$: function(id) {
		return document.getElementById(id);
	},
	json: {},
	hash: {},
	dataGroup: function() {
		var data = this.json.datas, length = data && data.length;
		for (var index = 0; index < length; index+=1) {				
			this.hash[data[index].id] = index;
		}
		return this;
	},
	htmlList: function(data) {
		return data.htmlList.call(this);
		
	},
	eventBind: function(data) {
		data.eventBind.call(this);
		return this;
	},
	htmlAppend: function(data) {
		this.listBox.innerHTML = this.htmlTitle + this.htmlList(data);
		this.eventBind(data);
		return this;
	},
	
	init: function(data) {
		this.json = data;
		this.listBox = this.$(data.listBoxId);
		this.htmlTemp = this.$(data.htmlTempId).value;
		this.htmlTitle = this.listBox.innerHTML;
		this.dataGroup().htmlAppend(this.json);
	}
};


