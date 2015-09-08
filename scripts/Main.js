var canvas;

var width_tide=980;
var height_tide=748;
var delta = [ 0, 0 ];
var stage = [ window.screenX, window.screenY, width_tide, height_tide ];
getBrowserDimensions();

var themes = [ [ "#ffffff", "#b02206", "#ff6732","#ffd680"] ];
var theme;

var colors = [ "#74974a", "#283c0f", "#ff6732", "#b02206", "#8ee1dc", "#08a15e", "#94072b", "#3c0212", "#fcc058", "#fc5605", "#dc8e48", "#61352d", "#72c2f5", "#0459b5", "#fd9da2",  "#fd3006", "#fb527a", "#950224", "#fb7c0c", "#c32303", "#f82557", "#9a0b04", "#845dcc","#2c17c5", "#fa92de", "#f705b5", "#e99bd2", "#bc0a88", "#94072b", "#3c0212", "#a26cf2", "#4508c3",  "#72f0f5", "#0496b5", "#ed7ffd", "#a013b5", "#f82557", "#9a0b04"]

var images = [ "img_ball_1.png", "img_ball_2.png", "img_ball_3.png", "img_ball_4.png", "img_ball_5.png", "img_ball_6.png", "img_ball_7.png", "img_ball_8.png", "img_ball_9.png", "img_ball_10.png", "img_ball_11.png", "img_ball_12.png", "img_ball_13.png", "img_ball_14.png", "img_ball_15.png", "img_ball_16.png", "img_ball_17.png", "img_ball_18.png", "img_ball_19.png"]

var worldAABB, world, iterations = 1, timeStep = 1 / 20;

var walls = [];
var wall_thickness = 200;
var wallsSetted = false;

var bodies, elements, text;

var createMode = false;
var destroyMode = false;

var isMouseDown = false;
var mouseJoint;
var mouseX = 0;
var mouseY = 0;

var width = 600;
var height = 400;

var PI2 = Math.PI * 2;

var timeOfLastTouch = 0;

init();
play();

function init() {

	canvas = document.getElementById( 'canvas' );

	document.onmousedown = onDocumentMouseDown;
	document.onmouseup = onDocumentMouseUp;
	document.onmousemove = onDocumentMouseMove;
	document.ondblclick = onDocumentDoubleClick;

	//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	//document.addEventListener( 'touchend', onDocumentTouchEnd, false );

	// init box2d

	worldAABB = new b2AABB();
	worldAABB.minVertex.Set( -200, -200 );
	worldAABB.maxVertex.Set( screen.width + 200, screen.height + 200 );

	world = new b2World( worldAABB, new b2Vec2( 0, 0 ), true );

	setWalls();
	reset();
}

function play() {
	setInterval( loop, 1000 / 40 );
}

function reset() {

	var i;
	var a;
	var b;

	if ( bodies ) {

		for ( i = 0; i < bodies.length; i++ ) {

			var body = bodies[ i ]
			canvas.removeChild( body.GetUserData().element );
			world.DestroyBody( body );
			body = null;
		}
	}

	// color theme
	theme = themes[ Math.random() * themes.length >> 0 ];
	document.body.style[ 'backgroundColor' ] = theme[ 0 ];

	bodies = [];
	elements = [];
	
	MainBall();
	
	a = 0;
	b = 1;
	for( i = 0; i < 10; i++ ) { //num balls
		createBallTide( i, a, b );
		a = a + 2;
		b = b + 2;
	}
}

//

function onDocumentMouseDown() {

	isMouseDown = true;
	return false;
}

function onDocumentMouseUp() {

	isMouseDown = false;
	return false;
}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX;
	mouseY = event.clientY;
}

function onDocumentDoubleClick() {

	return false;
	//reset();
}

function onDocumentTouchStart( event ) {

	if( event.touches.length == 1 ) {

		event.preventDefault();

		// Faking double click for touch devices

		var now = new Date().getTime();

		if ( now - timeOfLastTouch  < 250 ) {

			//reset();
			return;
		}

		timeOfLastTouch = now;

		mouseX = event.touches[ 0 ].pageX;
		mouseY = event.touches[ 0 ].pageY;
		isMouseDown = true;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX;
		mouseY = event.touches[ 0 ].pageY;

	}

}

function onDocumentTouchEnd( event ) {

	if ( event.touches.length == 0 ) {

		event.preventDefault();
		isMouseDown = false;

	}

}

//

function MainBall() {

	var size = 293;

	var element = document.createElement( 'div' );
	element.width = size;
	element.height = size;
	element.style.position = 'absolute';
    element.style.left = -200 + 'px';
	element.style.top = -200 + 'px';
	element.style.cursor = "default";

	canvas.appendChild(element);
	elements.push( element );

	var circle = document.createElement( 'canvas' );

	circle.width = size;
	circle.height = size;
	
	var graphics = circle.getContext( '2d' );
	
	var g2 = graphics.createLinearGradient(0, 0, 0, size);
	 g2.addColorStop(0, '#fdd67b');
	 g2.addColorStop(1, '#ffce67');
  
    graphics.fillStyle = g2;
	//graphics.fillStyle = theme[ 3 ];
	graphics.beginPath();
	graphics.arc( size * .5, size * .5, size * .5, 0, PI2, true );
	graphics.closePath();
	graphics.fill();

	
	element.appendChild( circle );

	text = document.createElement( 'div' );
	text.onSelectStart = null;
	text.innerHTML = '<img src="images/img_smiling_girl.png" border="0" alt=""/>';
	text.style.position = 'absolute';
	text.style.left = '0px';
	text.style.right = '210px';
	text.style.bottom = '50px';
	text.style.top = '0px';
	element.appendChild(text);

	text.style.left = ((250 - text.clientWidth) / 2) +'px';
	text.style.top = ((250 - text.clientHeight) / 2) +'px';	

	var b2body = new b2BodyDef();

	var circle = new b2CircleDef();
	circle.radius = size / 2;
	circle.density = 1;
	circle.friction = 0.3;
	circle.restitution = 0.3;
	b2body.AddShape(circle);
	b2body.userData = {element: element};

	b2body.position.Set( 450, 0 );
	//b2body.position.Set( Math.random() * stage[2], Math.random() * -200 );
	b2body.linearVelocity.Set( Math.random() * 400 - 100 , Math.random() * 400 - 100 );
	bodies.push( world.CreateBody(b2body) );	
	

}


function createBall( x, y ) {

	var x = x || Math.random() * stage[2];
	var y = y || Math.random() * -200;

	//var size = (Math.random() * 100 >> 0) + 20; // balls change sizes
	var size = 96;

	var element = document.createElement("canvas");
	element.width = size;
	element.height = size;
	element.style['position'] = 'absolute';
	element.style['left'] = -200 + 'px';
	element.style['top'] = -200 + 'px';

	var graphics = element.getContext("2d");

	var num_circles = Math.random() * 1 >> 0; //num_circles

	for (var i = size; i > 0; i-= (size/num_circles)) {

		graphics.fillStyle = theme[ (Math.random() * 0 >> 0) + 1]; // num black balls //ball style
		graphics.beginPath();
		graphics.arc(size * .5, size * .5, i * .5, 0, PI2, true); 
		graphics.closePath();
		graphics.fill();
	}

	canvas.appendChild(element);

	elements.push( element );

	var b2body = new b2BodyDef();

	var circle = new b2CircleDef();
	circle.radius = size >> 1;
	circle.density = 1;
	circle.friction = 0.3;
	circle.restitution = 0.3;
	b2body.AddShape(circle);
	b2body.userData = {element: element};

	b2body.position.Set( x, y );
	b2body.linearVelocity.Set( Math.random() * 400 - 200, Math.random() * 400 - 200 );
	bodies.push( world.CreateBody(b2body) );
}

function createBallTide( i, a, b ) {
	
	var size = 96;

	var element = document.createElement( 'div' );
	element.width = size;
	element.height = size;
	element.style.position = 'absolute';
	element.style.left = -200 + 'px';
	element.style.top = -200 + 'px';
	element.style.cursor = "default";

	canvas.appendChild(element);
	elements.push( element );

	var circle = document.createElement( 'canvas' );
	circle.width = size;
	circle.height = size;

	var graphics = circle.getContext( '2d' );
	
	 var g2 = graphics.createLinearGradient(0, 0, 0, size);
	 g2.addColorStop(0, colors[ a ]);
	 g2.addColorStop(1, colors[ b ]);
  
    graphics.fillStyle = g2;
	graphics.beginPath();
	graphics.arc( size * .5, size * .5, size * .5, 0, PI2, true );
	graphics.closePath();
	graphics.fill();

	element.appendChild( circle );

	text = document.createElement( 'div' );
	text.onSelectStart = null;
	text.innerHTML = '<img src="images/' + images[ i ] + '" border="0" alt=""/>';
	text.style.position = 'absolute';
	text.style.left = '12px';
	text.style.top = '15px';
	text.style.textAlign = 'center';
	element.appendChild(text);	

	var b2body = new b2BodyDef();

	var circle = new b2CircleDef();
	circle.radius = size / 2;
	circle.density = 1;
	circle.friction = 0.3;
	circle.restitution = 0.3;
	b2body.AddShape(circle);
	b2body.userData = {element: element};

	b2body.position.Set( Math.random() * stage[2], Math.random() * -200 );
	b2body.linearVelocity.Set( Math.random() * 400 - 200, Math.random() * 400 - 200 );
	bodies.push( world.CreateBody(b2body) );	
}

//

function loop() {

	if (getBrowserDimensions()) {

		setWalls();

	}

	delta[0] += (0 - delta[0]) * .5;
	delta[1] += (0 - delta[1]) * .5;

	world.m_gravity.x = 0 + delta[0];
	world.m_gravity.y = 350 + delta[1];

	mouseDrag();
	world.Step(timeStep, iterations);

	for (i = 0; i < bodies.length; i++) {

		var body = bodies[i];
		var element = elements[i];

        if (i == 0){
		element.style.left = (body.m_position0.x - (element.width >> 1)) + 'px';
		element.style.top = (body.m_position0.y - (element.height >> 1)) + 'px';
		}
		else{
		element.style.left = (body.m_position0.x - (element.width >> 1)) + 'px';
		element.style.top = (body.m_position0.y - (element.height >> 1)) + 'px';

		if (element.tagName == 'DIV') {

			var rotationStyle = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg)';
			text.style.WebkitTransform = rotationStyle;
			text.style.MozTransform = rotationStyle;
			text.style.OTransform = rotationStyle;

		}
		}

	}

}


// .. BOX2D UTILS

function createBox(world, x, y, width, height, fixed) {

	if (typeof(fixed) == 'undefined') {

		fixed = true;

	}

	var boxSd = new b2BoxDef();

	if (!fixed) {

		boxSd.density = 1.0;

	}

	boxSd.extents.Set(width, height - 60);

	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);

	return world.CreateBody(boxBd);

}

function mouseDrag()
{
	// mouse press
	if (createMode) {

		createBall( mouseX, mouseY );

	} else if (isMouseDown && !mouseJoint) {

		var body = getBodyAtMouse();

		if (body) {

			var md = new b2MouseJointDef();
			md.body1 = world.m_groundBody;
			md.body2 = body;
			md.target.Set(mouseX, mouseY);
			md.maxForce = 30000 * body.m_mass;
			md.timeStep = timeStep;
			mouseJoint = world.CreateJoint(md);
			body.WakeUp();

		} else {

			createMode = false;

		}

	}


	// mouse release
	if (!isMouseDown) {

		createMode = false;
		destroyMode = false;

		if (mouseJoint) {

			world.DestroyJoint(mouseJoint);
			mouseJoint = null;

		}

	}

	// mouse move
	if (mouseJoint) {

		var p2 = new b2Vec2(mouseX, mouseY);
		mouseJoint.SetTarget(p2);
	}
}

function getBodyAtMouse() {

	// Make a small box.
	var mousePVec = new b2Vec2();
	mousePVec.Set(mouseX, mouseY);

	var aabb = new b2AABB();
	aabb.minVertex.Set(mouseX - 1, mouseY - 1);
	aabb.maxVertex.Set(mouseX + 1, mouseY + 1);

	// Query the world for overlapping shapes.
	var k_maxCount = 10;
	var shapes = new Array();
	var count = world.Query(aabb, shapes, k_maxCount);
	var body = null;

	for (var i = 0; i < count; ++i) {

		if (shapes[i].m_body.IsStatic() == false) {

			if ( shapes[i].TestPoint(mousePVec) ) {

				body = shapes[i].m_body;
				break;

			}

		}

	}

	return body;

}

function setWalls() {

	if (wallsSetted) {

		world.DestroyBody(walls[0]);
		world.DestroyBody(walls[1]);
		world.DestroyBody(walls[2]);
		world.DestroyBody(walls[3]);

		walls[0] = null; 
		walls[1] = null;
		walls[2] = null;
		walls[3] = null;
	}

	walls[0] = createBox(world, stage[2] / 2, - wall_thickness, stage[2], wall_thickness);
	walls[1] = createBox(world, stage[2] / 2, stage[3] + wall_thickness, stage[2], wall_thickness);
	walls[2] = createBox(world, - wall_thickness, stage[3] / 2, wall_thickness, stage[3]);
	walls[3] = createBox(world, stage[2] + wall_thickness, stage[3] / 2, wall_thickness, stage[3]);	

	wallsSetted = true;

}

// BROWSER DIMENSIONS

function getBrowserDimensions() {

	var changed = false;

	if (stage[0] != window.screenX) {

		delta[0] = (window.screenX - stage[0]) * 50;
		stage[0] = window.screenX;
		changed = true;

	}

	if (stage[1] != window.screenY) {

		delta[1] = (window.screenY - stage[1]) * 50;
		stage[1] = window.screenY;
		changed = true;

	}

	if (stage[2] != width_tide) {

		stage[2] = width_tide;
		changed = true;

	}

	if (stage[3] != height_tide) {

		stage[3] = height_tide;
		changed = true;

	}

	return changed;

}

