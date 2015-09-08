<?php 
@session_start();

$aConfig=Array();


//create document
$document = new DOMDocument();
$document->load("config.xml"); 
//read questions node
$questionsNodes=$document->getElementsByTagName("questions")->item(0)->getElementsByTagName("question");
//read question node information
foreach ($questionsNodes as $question){
	$questionId=null;
	$questionHTML="";
	$error_message="";
	$optionsHTML="";
	
	//get question id
	$questionId=$question->getAttribute("id");
	
	//get cuestion text
	$lines=$question->getElementsByTagName("question_text")->item(0)->getElementsByTagName("line");
	foreach ($lines as $line){
		//get content
		$questionHTML.="<p>";
		$contentNodes=$line->getElementsByTagName("content");
		foreach ($contentNodes as $content){
			if($content->getAttribute("class")==""){
				$questionHTML.=$content->nodeValue;
			}else{
				$questionHTML.="<span class='".$content->getAttribute("class")."'>".$content->nodeValue."</span>";
			}
		}
		$questionHTML.="</p>";
	}

	//get question options
	$optionNodes=$question->getElementsByTagName("options")->item(0)->getElementsByTagName("opt");
	$optionsHTML="<ul id='options_list'>";
	for($i=0;$i<$optionNodes->length;$i++){
		$option=$optionNodes->item($i);
		$optionsHTML.="<li class='option'>";
		$optionsHTML.="<input type='radio' id='radio".$i."' value='".$option->getAttribute("is_correct")."' name='options' />";
		$optionsHTML.="<img height='27' width='27' style='cursor: pointer;' onclick='radioClicked(this)' src='images/btn_radial_unselected.png' id='img_radio".$i."' />";
		$optionsHTML.="<label class='option_txt'>".$option->nodeValue."</label>";
		$optionsHTML.="</li>";
		
	}
	$optionsHTML.="</ul>";
	//get error message
	$error_message=$question->getElementsByTagName("error_message")->item(0)->nodeValue;
	$aConfig[$questionId]=array(
		'text'=>$questionHTML,
		'options'=>$optionsHTML,
		'error'=>$error_message
	);
}

$_SESSION["config"]=$aConfig;

?>