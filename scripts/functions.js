var checkedImage = "images/btn_radial_selected.png";
var unCheckedImage = "images/btn_radial_unselected.png";
var imagePrefix = "img_";

function radioClicked(img)
{
     imgLength = imagePrefix.length;
     imgId = img.id;
     radioId = imgId.substring(imagePrefix.length,imgId.length);
     
     // Get all inputs  
     inputs = document.getElementsByTagName("input");
     for(i=0;i<inputs.length;i++)
     {
        radioButton = inputs[i];
        
        //Apply only to radio buttons
        if(radioButton.type == "radio")
        {
            radioButton.checked = false;
            document.getElementById(imagePrefix + radioButton.id).src = unCheckedImage;
        }
         
     }
    //Check the clicked button
    document.getElementById(radioId).checked = true;
    document.getElementById(imgId).src = checkedImage;
    processAnswer(document.getElementById(radioId));
}


function processAnswer(option,count){
	var answer=option.value;
	document.getElementById("correct_count_input").value=parseInt(document.getElementById("correct_count_input").value)+parseInt(answer);
	document.getElementById("do_selection_input").value=1;
	validateAnswer(answer);
	blockOptions();
	
}

function validateAnswer(answer){
	var verificationClass="";
	var verification_text="";
	var display="";
	if(answer==1){//correct
		verificationClass="correct_answer";
		verification_text="correct";
		display="none";
	}else{
		if(answer==0){
			verificationClass="wrong_answer";		
			verification_text="incorrect";
			display="inline";
		}
	}
	document.getElementById("verification_icon").className=verificationClass;
	document.getElementById("verification_icon").innerHTML=verification_text;
	document.getElementById("wrong_notice").style.display=display;
}

function blockOptions(){
	var ul_element=document.getElementById("options_list");
	var li_elements=ul_element.getElementsByTagName("li");
	for(i=0; i<li_elements.length; i++){
		var img=li_elements[i].getElementsByTagName("img")[0].onclick="";
	}
}

function submitQuestion(form){
	if(document.getElementById("do_selection_input").value==1){
		document.getElementById(form).submit();
	}else{
		document.getElementById("error_message").style.display="block";
		
	}
}

function submitIndex(){
	document.getElementById("tide_form").submit();
}


