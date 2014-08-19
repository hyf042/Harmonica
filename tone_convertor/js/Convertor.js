/**
* @file		Convertor.js
* @author	gswind123
* @date		2014.8.18
* @brief	Convertor tool for tone convertion
*/

//only can be used when the script is from "[1]" to "(7)"
var Convertor = {
	/** 
	*	function ReadNoteText(raw_note_text_str)
	*	INPUT:
	*		raw_note_text_str : the input music script text
	*	OUTPUT:
	*		an Array with all legal notes converted to a "gamut"(0~36)
	*/
	ReadNoteText: 0,

	/**
	* function CalcToneDistance(src_mark,dest_mark)
	*	INPUT:
	* 	src_mark,dest_mark: a tone mark like "C" or "Bb",etc
	* OUTPUT:
	*		the distance in 12 average law from src to dest,NaN for illegal input:
	*			("C","B") => -1
	*			("C","Db") => 1
	*     ("HA","C") => NaN
	*/
	CalcToneDistance: 0,

	/**
	* function CalcNoteText(gamut)
	* INPUT: 
	* 	a gamut converted by ReadNoteText
	*	OUTPUT:
	* 	a fixed note text string like "[#1]"
	*/
	CalcNoteText: 0,

	/**
	* function ConvertTone(raw_note_text_str,src_mark,dest_mark)
	* OUTPUT:
	* 	the converted music script,as a string:
	*		{
	*				"67~|(1)7(1)|(3)7","D","C" 		=> "56~|#66#6|(2)6"
	*				"###67~|(1)7(1)|(3)7","D","C" => "#56~|#66#6|(2)6"
	*		}
	*/
	ConvertTone: 0
};

/**
* Convertor.ReadNoteText
*/
(function(){
	// map i(1~7) to g(1~12) buy the law of 12 average:
	//	g = note_map[i*2(+1 for "#")];
	var note_map = 
		[ 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9,10,11,12,13];
		//0,#0, 1,#1, 2,#2, 3,#3, 4,#4, 5,#5, 6,#6, 7,#7

	Convertor.ReadNoteText = function(raw_text){
		var note_ary = new Array();
		var step = 1;//mediant
		var chromate = 0;

		for(var i=0;i<raw_text.length;i++){
			var in_char = raw_text[i];
			if (in_char==="["){
				step = 0;
			} else if(in_char==="]"){
				step = 1;
			} else if(in_char==="("){
				step = 2;
			} else if(in_char===")"){
				step = 1;
			} else if(in_char==="#"){
				chromate = 1;
			} else {
				//in_char is a note,need to be pushed	
				var note = "";
				var gamut = parseInt(in_char);
				if(isNaN(gamut) || !(gamut>=0&&gamut<=7)){
					note = in_char;
				} else{//in_char is 0~7
					if(gamut===0){
						note = gamut;
					} else{
						note = note_map[gamut*2+chromate] + step*12;
					}
				}
				note_ary.push(note);
				chromate = 0;
			}
		}// for var i
		return note_ary;
	};
})();

/**
* Convertor.CalcToneDistance
*/
(function(){
	var tone_table = 
		["Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F"];
	
	Convertor.CalcToneDistance = function(src_mark,dest_mark){
		var src_pos  = NaN;
		var dest_pos = NaN;
		for(var i=0;i<tone_table.length;i++){
			if(src_mark===tone_table[i]){
				src_pos = i;
			}
			if(dest_mark === tone_table[i]){
				dest_pos = i;
			}
		}
		if(isNaN(src_pos)||isNaN(dest_pos))
			return NaN;
		else return dest_pos - src_pos;
	};
})();

/**
* Convertor.CalcNoteText
*/
(function(){
	//gamut starts from "[1]"=>1 and thus "1"=>13
	var basic_notes = 
		["0","1","#1","2","#2","3","4","#4","5","#5","6","#6","7"];
		//0	,	1,	 2,	 3,   4,  5,  6,   7,  8,   9,  10, 11,  12

	Convertor.CalcNoteText = function(gamut){
		var int_val = parseInt(gamut);
		//if input is not a legal number,it must be a raw text
		if(isNaN(int_val) || int_val<0 || int_val>36){
			return gamut;
		}
		if(gamut === 0)
			return basic_notes[gamut];
		//step:judge [1],1,or,(1)
		var step = Math.floor((gamut-1)/12);
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
})();

/**
* Convertor.ConvertTone
*/
(function(){
	Convertor.ConvertTone = function(raw_music,src_mark,dest_mark){
		var ary_music = this.ReadNoteText(raw_music);
		var tone_distance = this.CalcToneDistance(src_mark,dest_mark);
		//TODO: error checking:isNaN(tone_distance)
		for(var i=0;i<ary_music.length;i++){
			var note = ary_music[i];
			//if note is a validate music note(1~36)
			if(!isNaN(parseInt(note)) && note>0 && note<=36){
				note += tone_distance;
			}
			ary_music[i] = this.CalcNoteText(note);
		}

		var str_res = "";
		for(var i=0;i<ary_music.length;i++){
			str_res += ary_music[i];
		}
		return str_res;
	}
})();
