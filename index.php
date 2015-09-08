<?php 
include 'config.php';
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<meta http-equiv="Content-Type" content="text/html; charset = UTF-8" />
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="images/downy.png"/>
<title>Tide</title>
<link href="css/tide_global_styles.css" rel="stylesheet" type="text/css">
<link href="css/anim.css" rel="stylesheet" type="text/css">
</head>
<body>
<section id="tide_wrapper">
  <header>
    <div id="tide_logo_hdr"></div>
    <div id="tide_title">
      <h1><span class="tide_test">Test your</span><span class="tide_brain">stain</span><span class="tide_stain">brain</span></h1>
    </div>
  </header>
  <section  class="home" id="tide_content">
    <p>Can you tackle grass, rewrite ink, or kiss lipstick stains goodbye?</p>
    <h4>Take the quiz &amp; put your stain-solving skills to the test.</h4>
    <form id="tide_form" action="question.php?id=1" method="post">
      <input type="hidden" name="correct_count" value=0 id="correct_count_input" />
      <button type="Submit" class="tide_home_submit">Start QUIZ</button>
    </form>
  </section>
  <footer id="tide_footer"></footer>
</section>
<div id="canvas"></div>
<script src="scripts/protoclass.js"></script>
<script src='scripts/box2d.js'></script>
<script src='scripts/Main.js'></script>
<div style="position: absolute; top: 30px; right: 30px">
  <script type="text/javascript">
   var flattr_url = 'http://mrdoob.com/projects/chromeexperiments/ball_pool/';
   var flattr_btn='compact';
  </script>
  <script src="scripts/load.js" type="text/javascript"></script>
</div>
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
