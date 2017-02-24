/**
 Returns a array with 3 values and a solution
**/
class MathGenerator{

	constructor(){
		this.numberList=[];
		this.solution=0;
	}


	createFour(){

		this.numberList = [];

		function getRandomIntInclusive(min, max){
  		min = Math.ceil(min);
 		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var picker = getRandomIntInclusive(1,3);

		switch(picker){
			case 1:
				console.log("1");
				var rand = getRandomIntInclusive(1,50);			
				for(var i=0;i<3;i++){
					this.numberList.push(i+rand)
				}
				this.solution = this.numberList[2]+1;
				break;
			case 2:
				console.log("2");
				var rand = getRandomIntInclusive(4,50);			
				for(var i=0;i<3;i++){
					this.numberList.push(rand-i);
				}
				this.solution = this.numberList[2]-1;
				break;
			case 3:
				console.log("3");
				var rand = getRandomIntInclusive(1,20);
				var qp = getRandomIntInclusive(1,20);
				var n = rand;
				for(var i=0;i<3;i++){
					this.numberList.push((n+qp));
					n = n+qp;
				}
				this.solution = this.numberList[2]+ qp;
				break;
			// case 4:
			// 	console.log("4");
			// 	var rand = getRandomIntInclusive(1,5);
			// 	var qp = getRandomIntInclusive(1,4);
			// 	var n = rand;
			// 	for(var i=0;i<4;i++){
			// 		console.log(n +": n")
			// 		console.log(qp +": qp")
			// 		console.log(rand +": Rand")
			// 		console.log(this.numberList[i]);
			// 		var exp = Math.pow(, qp);
			// 		last = exp;
			// 		this.numberList.push(last)

			// 	}
			// 	this.solution = Math.pow(this.numberList[2], qp);
			// 	break;

		}
	}
}
var p = new MathGenerator();
p.createFour();
var input="";
var solution="";
var score = 0;
var scoreBox = document.getElementById("scoreBox");
var sequence = document.getElementById("sequence");
var seqTxt = "";
for(var i = 0; i < p.numberList.length; i++){
	seqTxt += p.numberList[i];
	seqTxt += ","
}
sequence.innerHTML=seqTxt;
scoreBox.innerHTML="Score: "+ score;
document.getElementById("calculate").addEventListener("click", function(){
input += document.getElementById("inputer").value;
solution += p.solution;
console.log(input);
console.log(p.solution);
if(input === solution){
	console.log("test inside the if");
	score++;
	scoreBox.innerHTML = ("Score: " + score);
	p.createFour();
}
});




