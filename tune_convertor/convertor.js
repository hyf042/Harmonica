alert(123);
window.prototype.Convertor = 0;
function(){
	var dist_table = [0,1,1,0.5,1,1,1];
	var dist_from_do = function(note){
		var bias = 0;
		if(note[0]==='#'){
				bias = 0.5;
				note = note[1];
		}
		var num = parseInt(note);
		alert(num);
		for(var i=0;i<num;i++){
			bias += dist_table[i];
		}
		return bias;
	}
	window.Convertor.prototype.DistFromDO = dist_from_do;
}();
