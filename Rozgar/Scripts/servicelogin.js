function showsubcategory(){
	var category=document.getElementById('category').value;
	switch(category){
		case "teacher":
		document.getElementById("teacher").style.display="inline-block";
		document.getElementById("mr").style.display="none";
		document.getElementById("other").style.display="none";
		document.getElementById("hr").style.display="none";
		document.getElementById("Notmentioned").style.display="none";
		break;

		case "hr":
		document.getElementById("hr").style.display="inline-block";
		document.getElementById("mr").style.display="none";
		document.getElementById("other").style.display="none";
		document.getElementById("teacher").style.display="none";
		document.getElementById("Notmentioned").style.display="none";
		break;

		case "mr":
		document.getElementById("mr").style.display="inline-block";
		document.getElementById("other").style.display="none";
		document.getElementById("hr").style.display="none";
		document.getElementById("teacher").style.display="none";
		document.getElementById("Notmentioned").style.display="none";
		break;

		case "other":
		document.getElementById("other").style.display="inline-block";
		document.getElementById("mr").style.display="none";
		document.getElementById("hr").style.display="none";
		document.getElementById("teacher").style.display="none";
		document.getElementById("Notmentioned").style.display="none";
		break;

		case "Notmentioned":
		document.getElementById("Notmentioned").style.display="inline-block";
		document.getElementById("mr").style.display="none";
		document.getElementById("hr").style.display="none";
		document.getElementById("teacher").style.display="none";
		document.getElementById("other").style.display="none";
	}
}