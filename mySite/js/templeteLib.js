;var Rules=window.Rules={
	maRule: '<div class=""><%=lists.title.$t%></div>' +
				'<ul class="list">' +
			        '<%for(var i=0;i<lists.entry.length;i++){%>' +
			            '<li><div class=""><%=lists.entry[i].title.$t%></div><div class=""><%=lists.entry[i].author[0].name.$t%></div></li>' +
			        '<%}%>' +
			    '</ul>',
	mbRule: '<div class=""><%=lists.title.$t%>:<input type="button" class="btn" value="编辑所有" id="editAll"/><input type="button" class="btn" value="保存所有" id="saveAll"/></div>' +
						'<ul class="list">' +
					        '<%for(var i=0;i<lists.entry.length;i++){%>' +
					            '<li class="state '+
								'<%lists.entry[i].state=="edit"?lists.entry[i].state="edit":lists.entry[i].state="normal";%><%=lists.entry[i].state%>'+
								'">'+
								'<div class=""><span><%=lists.entry[i].title.$t%></span><input type="text" class="txt" value="<%=lists.entry[i].title.$t%>"/></div>'+
								'<div class=""><span><%=lists.entry[i].author[0].name.$t%></span><input type="text" class="txt" value="<%=lists.entry[i].author[0].name.$t%>"/></div></li>' +
					        '<%}%>' +
					    '</ul>',
	mcRule: '<div class=""><%=lists.title.$t%></div>' +
				'<ul class="list">' +
			        '<%for(var i=0;i<lists.entry.length;i++){%>' +
			            '<li><div class=""><%=lists.entry[i].title.$t%></div><div class=""><%=lists.entry[i].author[0].name.$t%></div></li>' +
			        '<%}%>' +
			    '</ul>',
	mdRule: '<div class=""><%=lists.title.$t%>:</div>' +
						'<ul class="list">' +
					        '<%for(var i=0;i<lists.entry.length;i++){%>' +
					            '<li class="state '+
								'<%lists.entry[i].state=="edit"?lists.entry[i].state="edit":lists.entry[i].state="normal";%><%=lists.entry[i].state%>'+
								'">'+
								'<div class=""><span><%=lists.entry[i].title.$t%></span><input type="text" class="txt" value="<%=lists.entry[i].title.$t%>"/><input type="button" data-role="edit" class="btn" value="编辑"/><input type="button" data-role="save" class="btn" value="保存"/></div>'+
								'<div class=""><span><%=lists.entry[i].author[0].name.$t%></span><input type="text" class="txt" value="<%=lists.entry[i].author[0].name.$t%>"/></div></li>' +
					        '<%}%>' +
					    '</ul>'
}