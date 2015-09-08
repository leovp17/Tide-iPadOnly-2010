<?php 
$range="";
$message="";
$main_text="";
$right_answers=$_GET["total"];

if($right_answers<=2){
	$range="0-2";
	$message="Survivor";
	$main_text="You made it through the quiz. When it comes to stains,you're a survivor. It's tough out there! But Tide can help.";
	$bottom_text="";
}else{
	if($right_answers>2 && $right_answers<=5){
		$range="3-5";
		$message="Student";
		$main_text="Those are some solid quiz results. Study hard, stain fighter. You're well on your way to becoming a brain. ";
		
	}else{
		$range="6-7";
		$message="Genial";
		$main_text="You've got the skills, all right: You breezed through our quiz!You're a regular stain-fighting Einstein.";
		
	}
}

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset = UTF-8" />
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<title>Tide</title>
<link href="css/results_styles.css" rel="stylesheet" type="text/css" />
<link href="css/anim.css" rel="stylesheet" type="text/css">
</head>
<body>
<section id="tide_wrapper">
  <header>
    <div id="tide_logo_hdr"></div>
    <div id="tide_title_small">
      <h1><span class="tide_test_small">Test Your</span><span class="tide_stain_small">Stain</span><span class="tide_brain_small">Brain</span></h1>
    </div>
  </header>
  <section id="tide_content">
    <p><span class="blue_txt"><?php echo $range?> of 7:</span> <span class="orange_txt">Stain <?php echo $message?></span></p>
    <h2>Congratulations!</h2>
    <p class="result_txt"><?php echo $main_text ?></p>
    <p class="footnote">Add to your stain-fighting arsenal with New Tide with Acti-Lift. It's specially formulated to lift off stains with ease, for spotless style.</p>
    <?php 
   		$aThisPageUrl=explode("/",$_SERVER["HTTP_REFERER"]);
   		$action="";
   		for($i=0;$i<count($aThisPageUrl)-1;$i++){
   			$action.=$aThisPageUrl[$i]."/";
   		}
   ?>
    <form action="<?php echo $action?>" method="get">
      <button id="btn_back" type="submit" >Back to HOME</button>
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
