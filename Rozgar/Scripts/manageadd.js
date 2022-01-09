function change1(){
	document.getElementById('edit1').style.display="none";
	document.getElementById('add').style.display="block";
}

function change2(){
	document.getElementById('edit1').style.display="block";
	document.getElementById('add').style.display="none";
}
function show(){
	var x=document.getElementById("greet_nav");
	if(x.style.display=="none"){
		x.style.display="block";
	}else{
		x.style.display="none";
	}
}