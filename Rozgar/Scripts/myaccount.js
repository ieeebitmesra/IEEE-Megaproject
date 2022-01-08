function change1(){
	var inedit1=document.getElementById('edit1').innerHTML;
	if(inedit1=='Edit'){
		document.getElementById('edit1').innerHTML='Cancel';
		document.getElementById('fname').readOnly=false;
		document.getElementById('lname').readOnly=false;
		document.getElementById('male').disabled=false;
		document.getElementById('female').disabled=false;
		document.getElementById('save1').style.display="block";
	}else if(inedit1=='Cancel'){
		document.getElementById('edit1').innerHTML='Edit';
		document.getElementById('fname').readOnly=true;
		document.getElementById('lname').readOnly=true;
		document.getElementById('male').disabled=true;
		document.getElementById('female').disabled=true;
		document.getElementById('save1').style.display="none";
	}
}

function change2(){
	var inedit2=document.getElementById('edit2').innerHTML;
	if(inedit2=='Edit'){
		document.getElementById('edit2').innerHTML='Cancel';
		document.getElementById('emailad').readOnly=false;
		document.getElementById('save2').style.display="block";
	}else if(inedit2=='Cancel'){
		document.getElementById('edit2').innerHTML='Edit';
		document.getElementById('emailad').readOnly=true;
		document.getElementById('save2').style.display="none";
	}
}

function change3(){
	var inedit3=document.getElementById('edit3').innerHTML;
	if(inedit3=='Edit'){
		document.getElementById('edit3').innerHTML='Cancel';
		document.getElementById('mobno').readOnly=false;
		document.getElementById('save3').style.display="block";
	}else if(inedit3=='Cancel'){
		document.getElementById('edit3').innerHTML='Edit';
		document.getElementById('mobno').readOnly=true;
		document.getElementById('save3').style.display="none";
	}
}

function show(){
	var x=document.getElementById("greet_nav");
	if(x.style.display=="none"){
		x.style.display="block";
	}else{
		x.style.display="none";
	}
}
