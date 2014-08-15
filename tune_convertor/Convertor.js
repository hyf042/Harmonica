var Convertor = {
	GetNote:0
};
function(){
	var basic_notes = 
		["0","1","#1","2","#2","3","4","#4","5","#5","6","#6","7"];
		//0	,	1,	2,	 3,  4,   5,  6,  7,   8,  9,   10, 11,  12
	//gamut starts from "[1]"=>1 and thus "1"=>13 
	var get_note = function(gamut){
		if(gamut === 0)
			return basic_notes[gamut];
		//step:judge [1],1,or,(1)
		var step = (int)(gamut/12);
		//parse gamut to 1~12 to get the note
		gamut %= 12;
		if(gamut === 0)
			gamut = 12;
		var note = basic_notes[gamut];
		if(step === 0){
			note = "["+note+"]";
		}
		else if(step ===2){
			note = "("+note+")";
		}
		return note;
	};
	Convertor.GetNote = get_note;
}();
