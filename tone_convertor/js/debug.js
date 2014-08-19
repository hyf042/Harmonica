 var toHTML = function(utf){
	var html = "";
	for(var i=0;i<utf.length;i++){
		if(utf[i]===" "){
			html += "&nbsp";
		} else if (utf[i]=="\n"||utf[i]=="\r"){
			html += "<br>";
		} else{
			html += utf[i];
		}
	}
	return html;
};
var parseString = function(obj){
	var res = "";
	for(var ele in obj){
		res += obj[ele].toString();
	}
	return res;
}
