<?php  
@session_start();
$question_id=$_GET["id"];
if(isset($_POST["correct_count"])){
	$correctAnswers=$_POST["correct_count"];
}else{
	$correctAnswers=0;
}
$aData=$_SESSION["config"]["question_".$question_id];
if($aData){
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset = UTF-8" />
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<title>Tide</title>
<link href="css/tide_global_styles.css" rel="stylesheet" type="text/css" />
<!--  <script type="text/javascript" src="scripts/RB.js"></script>-->
<script type="text/javascript" src="scripts/functions.js"></script>
<link href="css/anim.css" rel="stylesheet" type="text/css">
</head>
<body>
<section id="tide_wrapper" class="main">
  <header>
    <div id="tide_logo_hdr"></div>
    <div id="tide_title_small">
      <h1><span class="tide_test_small">Test Your</span><span class="tide_stain_small">Stain</span><span class="tide_brain_small">Brain</span></h1>
    </div>
  </header>
  <section id="tide_content">
    <div id="tide_question"><?php echo $aData["text"];?></div>
    <span id="error_message" style="display: none;">Select an option below</span>
    <form action="question.php?id=<?php echo $question_id+1 ?>" method="post" id="question_form">
      <input type="hidden" name="correct_count" id="correct_count_input" value=<?php echo $_POST["correct_count"]?> />
      <input type="hidden" name="do_selection" id="do_selection_input" value=0 />
      <?php echo $aData["options"];?>
      <div id="tide_verification"> <span id="verification_icon"></span> <span  id="wrong_notice" style="display: none"><?php echo $aData["error"];?></span> </div>
      <button id="btn_next" type="button" onClick="submitQuestion('question_form')">Next</button>
      <span id="tide_question_footer">Question <?php echo $question_id;?> of 7</span>
    </form>
  </section>
  <footer></footer>
</section>
<script type="text/javascript">
 var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
 document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
 </script>
<script type="text/javascript">
 try {
 var pageTracker = _gat._getTracker("UA-86951-7");
 pageTracker._trackPageview();
 } catch(err) {}</script>
</body>
</html>
<?php 
}else{
	$total=$_POST["correct_count"];
	$aRequestURL=explode("/",$_SERVER["HTTP_REFERER"]);
	$requestUrl="";
	for($i=0;$i<count($aRequestURL)-1;$i++){
		$requestUrl.=$aRequestURL[$i]."/";
	}
	$requestUrl.="result.php?total=".$total;
	header("Location:".$requestUrl);
}
?>
