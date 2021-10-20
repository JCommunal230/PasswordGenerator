var numberOfcharacters=document.getElementById('characternumber');
var password = document.getElementById('password');
var newPassword = document.getElementById('new');
var options =[];

/*Creation of the arrays containing the characters possible*/
var numbers=[];
for(let i=0; i<10;i++)
	{
		numbers.push(i);
	}
var lowercaseAlphabet =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercaseAlphabet=[];
for(let i=0; i<lowercaseAlphabet.length;i++)
	{
		uppercaseAlphabet.push(lowercaseAlphabet[i].toUpperCase());
	}
var specialCharacters =['!','#', '$', '%', '&', '?', '@', '=', '>', '?', '*', '+', '-', '.', '/', ':', '^', '_', '{', '}', '|', '~', '(', ')', ']', '[', '"', ';', ',', '`']; /*'<\*/
var arrays = [numbers, lowercaseAlphabet, uppercaseAlphabet, specialCharacters];

/*Check options*/
var numberCheck =document.getElementById('numbers');
var uppercaseLetterCheck =document.getElementById('uppercase');
var lowercaseLetterCheck =document.getElementById('lowercase');
var specialCharacterCheck =document.getElementById('special');

/*X Factor*/
function xFactor(type){
	let xFactor= Date.now()%10000;
	switch (type) {
		case 'number':
		return xFactor;
		case 'string':
		return xFactor.toString();
		case 'array':
		let array =[];
		array[3]=Math.round(xFactor%10);
		array[2]=Math.round((xFactor%100-xFactor%10)/10);
		array[1]=Math.round((xFactor%1000-xFactor%100-xFactor%10)/100);
		array[0]=Math.round((xFactor-xFactor%1000-xFactor%100-xFactor%10)/1000);
		return array;
		default:
		alert('the xFactor type required is not available. The types available are : number, string, array');
	}
}

/*Randomization functions*/
function randomNumber(){
	let index = (Math.floor(Math.random()*numbers.length) + xFactor('number'))%numbers.length;
	return numbers[index];
}
function randomUppercaseLetter(){
	let index = (Math.floor(Math.random()*uppercaseAlphabet.length) + xFactor('number'))%uppercaseAlphabet.length;
	return uppercaseAlphabet[index];
}
function randomLowercaseLetter(){
	let index = (Math.floor(Math.random()*lowercaseAlphabet.length) + xFactor('number'))%lowercaseAlphabet.length;
	return lowercaseAlphabet[index];
}
function randomSpecialCharacter(){
	let index = (Math.floor(Math.random()*specialCharacters.length) + xFactor('number'))%specialCharacters.length;
	return specialCharacters[index];
}
function randomCharacter(){	
	y = options[Math.floor(Math.random()*options.length)];
	switch (y) {
		case 0:
		return randomNumber();
		break;
		case 1:
		return randomLowercaseLetter();
		break;
		case 2:
		return randomUppercaseLetter();
		break;
		case 3:
		return randomSpecialCharacter();
		break;
		default:
		alert("An error occured, please reload the page.");
	}		
}

/*Password constructer*/
function randomPassword(length){
	let password = "";
	for(let i=0; i<length; i++){
		password += randomCharacter();		
	}
	return password;
}
newPassword.addEventListener('click', function(){
	options=[];	
	if(numberOfcharacters.value){
		if(numberCheck.checked){
			options.push(0);
		}
		if(lowercaseLetterCheck.checked){
			options.push(1);
		}
		if(uppercaseLetterCheck.checked){
			options.push(2);
		}
		if(specialCharacterCheck.checked){
			options.push(3);
		}
		if(options.length>0){
			password.innerHTML = '<p>'+ randomPassword(numberOfcharacters.value) + '</p>';
		}
		else{
			alert('Please choose a type of character.');
		}
	}
	else{
		alert("Please enter a number of characters.");
	}	
});

/*Button to copy the password*/
var copy = document.getElementById('copy');
copy.addEventListener('click', function(){
    const textarea = document.createElement('textarea');
    const pw = password.innerText;
    if (!pw) {
    	alert('No password to copy.')
        return;
    }
    textarea.value = pw;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert('Password copied ✓');
});