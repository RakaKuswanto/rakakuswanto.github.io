var persos = [],
pipas = [],
baloes = [],
pipasName = {},
stats = undefined,
socket = undefined,
json = undefined,
infosOnline = {},
font = undefined,
controlsUsage = false,

cores = ['eec400','00b200','ca37ef','04a6e4','f468e8','f29500','ff3939','79858a'],

spriteSlc = "",
cenarioSlc = "",

/*online*/
indiceServer = undefined,
sala = undefined,
nick = undefined,
timeClickOnline = undefined,
nomePlayer = undefined,

sons = {},
//som = true,//true
//somIntro = true,
//somGritos = true,
idcSomCortou = parseInt(Math.random() * 32),
idcSomDelay = parseInt(Math.random() * 13),

umDivididoPorOito = 1/8,

paused = false,
//clock = new THREE.Clock(),
type = undefined,
infoTwoPlayer = undefined,
singlePlayer = false,

camYini = 90,
cameraDefault = cam1,//setCameraAuto,
cameraTypeFunc = undefined,

timeout = undefined,
mobile = isMobileAll(),
_90graus = de2ra(90),
_180graus = de2ra(180),
_360graus = de2ra(360),
paiPipaPrincipal = undefined,

cenario = undefined,
cristo = undefined,

timeoutInterstitial = 0,

//pressLeft = false, pressRight = false, pressUp = false, pressDown = false, pressSpace = false,

vec3D = new THREE.Vector3(0, 0, 0),//usage uma vez apenas, clone instance not refactor

rotPersoOnline = 0,
//directionCamera = 0,
cameraAngle = 0,

scene = undefined,
camera = undefined,
controls = undefined,
requestAnimation = undefined,
renderer = undefined,

joystick = undefined,
controlePipa = true,

chao = undefined,
ceu = undefined,

msgComoJogar = {festival:false, twoPlayer: false, singlePlayer:false},
placarFestival = { cortou:0 },

BD = {
	/*dinheiro:undefined,
	minhasPipas:undefined,
	minhasLinhas:undefined*/
},

swiper = undefined,
swiperPlayer1 = undefined,
swiperPlayer2 = undefined,


android = isMobile.Android(),
iOS = isMobile.iOS(),
mobile = isMobileAll(),
startPhonegap = false,//index.js active

//limitecenario = {x1:1200, x2:-1200, z1:1200, z2:-930},
limitecenario = {x1:1200+1000, x2:-1200-1000, z1:1200+500, z2:-930-500},


//xmlPerso = undefined,
//pathPerso = undefined,
//teste = undefined,
//allPersos = [],
maxPersos = 4,//4 default
timeoutGrito = undefined,
extJpg = 'jpg',
extPng = 'png',
usageAvatar = false,
noturno = false,

isTestingAdMob = false;

//var timeTeste = 0;

function init(){

	try{
		if(AndroidFullScreen != undefined) AndroidFullScreen.immersiveMode();//important - sem isso BUG input text nick    
	}catch(err){}



	getBD();
	updateLanguage();
	//BD.dinheiro = 1000;
	
	//criarRewardVideoAdMob();
	//sortReward();
	
	//banners site
	initAdsBannerIni();
	
	loadingCenario();

	window.addEventListener('resize', resize);
	resize();

}

function loadingCenario(){

//Ceu ==

	ceu = new THREE.Mesh( new THREE.CubeGeometry( 14000, 14000, 14000, 1, 1, 1 ), [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/ceu/px.jpg'), side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/ceu/nx.jpg'), side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/ceu/py.jpg'), side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/ceu/pz.jpg'), side:THREE.BackSide }),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/ceu/nz.jpg'), side:THREE.BackSide })
	] );
	if(noturno){
		for(var c = 0;c < 6;c++) {
			ceu.material[c].transparent = true;
			ceu.material[c].opacity = 0.2;
		}
	}
	//ceu.rotation.y = _360graus * Math.random();
	ceu.rotation.y = de2ra(10);
	ceu.position.y = 0;


//Chão ==
	var floorTexture = new getTextureLoader('img/chao.png');
	floorTexture.wrapT = floorTexture.wrapS = THREE.RepeatWrapping;

	floorTexture.magFilter = THREE.NearestFilter;
	floorTexture.minFilter = THREE.LinearMipMapLinearFilter;

	floorTexture.repeat.set( 40, 40 );

	chao = new THREE.Mesh(
		new THREE.PlaneGeometry(1600 * 6, 1600 * 6, 1, 1), 
		new THREE.MeshBasicMaterial( { map:floorTexture, side: THREE.BackSide } )
	);

	if(noturno){
		chao.material.transparent = true;
		chao.material.opacity = 0.6;
	}
	chao.position.y = 0;
	chao.rotation.x = Math.PI / 2;

//Font ==

	var l = new THREE.FontLoader();
	l.load('font/AvantGardeITCbyBT_Bold.json', function(_font) {
		font = _font;
	});
	

	
//PANORAMIC CENARIO ==
	var loader = new THREE.ColladaLoader();
	var collada = loader.parse( getPanoramic(), 'panoramic/panoramic/' );//PEGANDO XML memory - colocar path ref imgs
	collada.scene.children.splice(0, 1);//deletando iluminação
	cenario = collada.scene;

	cenario.children[0].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/1.png' ) } ).map;
	cenario.children[1].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/2.png' ) } ).map;
	cenario.children[2].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/3.png' ) } ).map;
	//cenario.frustumCulled = false;

	if(noturno){
		for(var c = 0;c < 3;c++) {
			cenario.children[c].material.transparent = true;
			cenario.children[c].material.opacity = 0.6;
		}
	}

	//ajusta material invertido
	cenario.children[0].scale.x = cenario.children[1].scale.x = cenario.children[2].scale.x = -Math.round(cenario.children[0].scale.x);

	loadingPersos();

}

			
function loadingPersos(){

//Security - deixar ativado apenas no site PC
	//if(top.location != window.location) return;//não usar
	//if(window.location.href.indexOf(decodeStr('hhS%2F2zBxsVjwShkJ%2FBQHDISGHf')) == -1 && window.location.href.indexOf(decodeStr('VHG.LqSsujwSJkh')) == -1 && window.location.href.indexOf(decodeStr('LBxsVjGxhkJ%2FVjw.ijHszGSl.QJhS')) == -1) return;

	//init2();

	var delayLogo = 2;

	if(startPhonegap){
		delayLogo = 7;
		try{
		    if(AdMob){
		    	
		    	setTimeout(function(){
		    		AdMob.prepareInterstitial({
						adId:'ca-app-pub-4736032489372828/3511082362',
						//autoShow:false,
						isTesting:isTestingAdMob
					},function(){
						//if($('#logo').length == 1) {
						if(parseInt($('#logo').css('opacity')) == 1){
							AdMob.showInterstitial();
							//alert('PODE EXIBIR BANNER');
						}else{
							//alert('NÃO PODE EXIBIR BANNER');
						}
					});
				}, 1800);

			}
		}catch(err){}
	}

	TweenMax.to($('#logo'), 1, { 
        delay:delayLogo, 
        opacity:0,
        onComplete:function(obj, vol){
        	$('#logo').remove();
        	//criarInterstitialAdMob(true);
        	setTimeout(function(){
        		$('#logo').remove();
				init2();
			}, 500);
        }
    });

}

function init2(){

	//AdMob - Start memory
	criarBannerAdMob();
	criarInterstitialAdMob();

	//desativa scrool mobile ios
	document.getElementById('main').addEventListener('touchmove', function(e) {
      	e.preventDefault();
    }, { passive:false, useCapture: false });
	//desativa double tap zoom ios
    document.getElementById('main').addEventListener('touchstart', function(e) {
      	e.preventDefault();
    }, { passive:false, useCapture: false });

    
    


	if(mobile) $('body').addClass('mobile');

	$('main').show();
	$('#console').html('');
	
	initMenu();
	controlerClicks();
    setVento();
    
	if(!BD.som) $('.icoSom figure').addClass('not');
	if(!BD.somIntro) $('.icoSom2 figure').addClass('not');
	if(!BD.somGrito) $('.icoSom3 figure').addClass('not');
	if(BD.som && BD.somIntro) playSom('intro', 1);

	//===
	if(mobile) {
		$('#comojogar').addClass('mobile');



		//<gap:plugin name="cordova-plugin-google-analytics" source="npm" /> ===> window.ga
    	//<gap:plugin name="cordova-plugin-analytics" source="npm" /> ===> analytics
		/*if(analytics != undefined) window.ga = analytics;//força p/ funciona com os dois plugins acima
		if(startPhonegap && android && window.ga != undefined) window.ga.startTrackerWithId('UA-119745043-1', 30);*/
		/*if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase && cordova.plugins.firebase.analytics) {
			alert('START - cordova.plugins.firebase.analytics');
			cordova.plugins.firebase.analytics.setEnabled(true);
			cordova.plugins.firebase.analytics.setCurrentScreen('telainicial');
			alert('START2 confirm - cordova.plugins.firebase.analytics');
		}*/
		/*
		try{
			//if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase.analytics) {
				cordova.plugins.firebase.analytics.setEnabled(true);
				cordova.plugins.firebase.analytics.setCurrentScreen("TelaInicial");
			//}
		}catch(err){}
		*/
		
		

		
	}

	//nick
	if(window.localStorage["nick"]){
		nick = window.localStorage.getItem("nick");
		$('.nick').val(nick);
	}

}

function setVento(_vento){
	if(_vento != undefined) BD.vento = _vento;
	$('.menu .vento .cima, .menu .vento .baixo').removeClass('on');
	if(BD.vento == 0) $('.menu .vento .cima').addClass('on');
    if(BD.vento == 1) $('.menu .vento .baixo').addClass('on');
    updateBD();
}

function fechar(viewAdMob){

	/*if(type == 'twoPlayer') {
		window.location.reload();
		return;
	}*/

	//stopSom('praia');
	if(BD.somIntro) playSom('intro', 1);

	removeJoystick();

	if(scene == undefined) return;

	var tot2 = persos.length;
	while(tot2--) {
		if(type == 'online'){
			var perso = pipasName[persos[tot2]];
		}else{
			var perso = persos[tot2];	
		}
		if(perso != undefined) perso.removePerso();
	}
	tot2 = pipas.length;
	while(tot2--) {
		pipas[tot2].matarPipa();
		pipas.splice(tot2, 1);
	}

	tot2 = baloes.length;
	while(tot2--) {
		baloes[tot2].matarBalao();
		baloes.splice(tot2, 1);
	}
	
	if(controls != undefined){
		controls.dispose();
		controls = undefined;
	}

	if(stats != undefined){
		stats.end();
		$('#stats').remove();
		stats = undefined;
	}

	scene.remove(chao);
	scene.remove(ceu);
	//clear3D(cenario);
	cenario.remove(cristo);
	scene.remove(cenario);
	


	//renderer.render( scene, camera );

	clear3D(camera); scene.remove(camera); camera = undefined;


	for(var c = 0;c < baloes.length;c++){
		var balao = baloes[c];
		clear3D(balao); scene.remove(balao); balao = undefined;
		stopSom('balao');
	}
	baloes = [];

	/*if(type == 'online' && nomePlayer != undefined) {
		console.log('DESCONECTAR')
		socket.emit('desconectar', nomePlayer);
		disconnectSocket();
		nomePlayer = undefined;
	}*/

	clear3D(scene);

	cancelAnimationFrame(requestAnimation);// Stop the animation

	renderer.renderLists.dispose();
	renderer.dispose();
	renderer.forceContextLoss(); //renderer.forceContextRestore()
	renderer.context = undefined;
	renderer.domElement = undefined;

	type = undefined;
	paiPipaPrincipal = undefined;
	cameraTypeFunc = undefined;
	vecCam = undefined;
	singlePlayer = false;
	scene = undefined;
	pipasName = {};
	persos = [];

	$('#placar').addClass('hide');
	$('#console').html('');
	$('main #msgCenter').remove();
	$('#menu .voltar').hide();
	$('#topDir').show();
	$('#topDir .pipas, #pular').hide();
	$('.bots').hide();
	$('#menu .lang').show();
	$('#players').remove();
	$('#comojogar').removeClass('show twoPlayer');
	$('#message').remove();

	clearTimeout(timeoutTwoPlayer);
	clearTimeout(timeoutConsole);
	clearTimeout(timeoutGrito);

	msgComoJogar = {festival:false, twoPlayer: false, singlePlayer:false};


	$('#ThreeJS canvas, #pipas').remove();//.remove();
	$('#select').show();
	$('.reward').show();


// === Banner site ou INTERSTITIAL Admob ==========================================

	//console.log(viewAdMob, startPhonegap);

	if(new Date().getTime() - timeoutInterstitial > (1000 * 30)){
		//console.log('exibir banner');
		//timeoutInterstitial = new Date().getTime();

		//if(viewAdMob == undefined){//browser banner
		if(!startPhonegap){
			initAdsBannerIni();
			if($('#ads').length == 1) initAds();
			//console.log('ADSENSE SITE');
		}else{
			//console.log('ADMOB APP');
			//if(startPhonegap) Appodeal.show(Appodeal.INTERSTITIAL);
			//AdMob
			criarInterstitialAdMob(true);
			//sortReward();
				
		}

	}else{
		//console.log('Não exibir banner, somente se jogar por 30seg');
	}
	timeoutInterstitial = new Date().getTime();//estando fora do if, só exibe banner se tiver jogado por mais de 30seg
	
	//ADD BANNER
	criarBannerAdMob();
	
}



function initAdsBannerIni(){
	if($('#ads').length == 1){
		if(mobile){
			$('#ads').html('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle bannerIniPq" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-4736032489372828" data-ad-slot="5774245713"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
		}else{
			$('#ads').html('<ins class="adsbygoogle bannerIni" data-ad-client="ca-pub-4736032489372828" data-ad-slot="7035137997"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script><script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');	
		}
	}
}

/*function init3D(){
	var loader = new THREE.FileLoader();
	loader.load( "models/kid.dae", function(text){
		xmlPerso = text;
		pathPerso = THREE.LoaderUtils.extractUrlBase("models/kid.dae");
		init3D_2();
	} );
}*/

function init3D(){

	removeBannerAdMob();

	$('#ads').html('');
	$('#menu .right').show();
	$('#menu .voltar').show();
	$('#select, #menuOnline').hide();
	$('#menu .lang').hide();
	$('#players').show();
	$('#pular').hide();

	if(!mobile) {
		$('#comojogar').removeClass();
		if(type == 'twoPlayer' && !singlePlayer) $('#comojogar').addClass(type);
	}
	if(type == 'festival'){
		$('#ThreeJS').removeClass('twoPlayer');
		//if(startPhonegap && window.ga != undefined) window.ga.trackView('festival');
		/*try{
			if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase.analytics) cordova.plugins.firebase.analytics.setCurrentScreen("Festival");
		}catch(err){}*/
	}else if(type == 'twoPlayer'){
		
		if(singlePlayer){
			$('#ThreeJS').removeClass('twoPlayer');
			//if(startPhonegap && window.ga != undefined) window.ga.trackView('singlePlayer');
			/*try{
				if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase.analytics) cordova.plugins.firebase.analytics.setCurrentScreen("SinglePlayer");
			}catch(err){}*/
		}else{
			$('#ThreeJS').addClass('twoPlayer');
			$('#topDir').hide();
			//if(startPhonegap && window.ga != undefined) window.ga.trackView('twoPlayer');
			/*try{
				if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase.analytics) cordova.plugins.firebase.analytics.setCurrentScreen("TwoPlayer");
			}catch(err){}*/
		}
		
		infoTwoPlayer = {
			player1:{ cortou:0, pipas:[], linha:undefined }, 
			player2:{ cortou:0, pipas:[], linha:undefined }
		};
		montarPipas();
		setInfoTwoPlayer();
	}else if(type == 'online'){
		//if(startPhonegap && window.ga != undefined) window.ga.trackView('online');
		/*try{
			if(startPhonegap && cordova && cordova.plugins && cordova.plugins.firebase.analytics) cordova.plugins.firebase.analytics.setCurrentScreen("Online");
		}catch(err){}*/
	}


	resize();
	
	//playSom('praia', 0.3);
	stopSom('intro');

	if(scene == undefined) scene = new THREE.Scene();
	
	var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
	
	renderer = new THREE.WebGLRenderer({
		antialias:true, 
		alpha:false,
		clearColor:0x000000//cor de fundo
	});

	renderer.setClearColor("#000", 0);

	

	renderer.setPixelRatio(BD.pixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	/*var scala = 1;
	renderer.setSize(window.innerWidth/scala, window.innerHeight/scala);
	$('#ThreeJS').css({
	  'transform-origin': '0 0',
	  '-webkit-transform' : 'scale(' + scala + ')',
	  '-moz-transform'    : 'scale(' + scala + ')',
	  '-ms-transform'     : 'scale(' + scala + ')',
	  '-o-transform'      : 'scale(' + scala + ')',
	  'transform'         : 'scale(' + scala + ')'
	});*/
	
	
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20000);

	camera.castShadow = false;
	camera.position.set(0, 50, 400);
	scene.add(camera);
	THREEx.WindowResize(renderer, camera);// automatically resize renderer
	
	$( '#ThreeJS' ).append( renderer.domElement );

	//controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls = new THREE.OrbitControls( camera, document.getElementById('touch1') );
	if(mobile) controls.enableZoom = controls.enablePan = false;
	//controls.maxPolarAngle = _180graus * 0.57;
	//controls.minPolarAngle = _180graus * 0.34;
	controls.maxPolarAngle = _180graus * 0.85;
	controls.minPolarAngle = _180graus * 0.20;
	controls.addEventListener('start', function(){ controlsUsage = true; }, false );
	controls.addEventListener('end', function(){ 
		controlsUsage = false; 
		paiPipaPrincipal.perso.visible = true;
	}, false );
		
	

	
	
	
	scene.add(chao, ceu);
	arrScene = [];
	if(cenarioSlc == 'favela') setCenario1();//cenarios.js

	ceu.renderOrder = 0;
	if(cristo != undefined) cristo.renderOrder = -1;//resolve bug
	chao.renderOrder = 2;
	cenario.renderOrder = 3;




	setAutoUpdateMatrix(chao, false);
	setAutoUpdateMatrix(ceu, false);
	setAutoUpdateMatrix(cenario, false);
	setAutoUpdateMatrix(cristo, false);

	/*var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
	scene.add( ambientLight );
	console.log('desativar iluminação');*/

	//var ambient = new THREE.AmbientLight( 0xFFFFFF );
	//scene.add(ambient);

	/*var light = new THREE.PointLight( 0x000000, 10, 100000000 );
	light.position.set( 0, 1450, 550 );
	scene.add( light )*/

	


	if(type == 'festival'){
		for(var c = 0;c < maxPersos;c++) addPerso(c);
		cameraTypeFunc = undefined;
		menuSemPipaNoAlto();
	}else if(type == 'twoPlayer'){
		addPerso(0);
		addPerso(1);
		cameraTypeFunc = camTwoPlayer;
		controls.enabled = false;
	}else if(type == 'online'){
		cameraTypeFunc = undefined;
		menuSemPipaNoAlto();
	}

	
	animate();//init render
	//setTimeout(animate, 1000);
	createJoystick();

	$('#console').html('');

	/*$('#console').html(new Date().getTime() - timeTeste);
	setTimeout(function(){
		$('#console').html('');
	}, 4000);*/

	/*if(type == 'festival')*/ gritoDelay(true);


//MERGE
/*var mergedGeometry = new THREE.Geometry(),
boxGeometry = new THREE.BoxGeometry(10, 10, 10),
material = new THREE.MeshBasicMaterial({color: 0xff00ff});

for (var i = 0; i < 1000; i++) {

    var x = Math.random() * 1500 - 750,
    y = 10,//Math.random() * 1500 - 750,
    z = Math.random() * 1500 - 750;


    boxGeometry.translate(x, y, z);
    mergedGeometry.merge(boxGeometry);
    boxGeometry.translate(-x, -y, -z);



}

var cubes = new THREE.Mesh(mergedGeometry, material);
scene.add(cubes);

console.log(cubes);*/

//scene.add(pipa);
//pipa.position.y = 100;


/*var teste = setInterval(function(){
	//console.log(cubes.geometry.vertices[0].x )
	//for(var c = 0;c<1000;c++){
	//	cubes.geometry.vertices[c].x = Math.random() * 1000;
	//	cubes.geometry.vertices[c].y = Math.random() * 1000;
	//	cubes.geometry.vertices[c].z = Math.random() * 1000;
	//}
	cubes.geometry.verticesNeedUpdate = true;
	

},100)*/





/*var MAX_POINTS = 100 * 3;
line = new THREE.Line( new THREE.BufferGeometry(),  new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
line.geometry.addAttribute( 'position', new THREE.BufferAttribute(
	new Float32Array( MAX_POINTS * 1 )
	, 3 
));
scene.add( line );

setInterval(function(){
	
	x = y = z = index = 0;

	var positions = line.geometry.attributes.position.array;

	for ( var i = 0, l = MAX_POINTS; i < l; i ++ ){

	    positions[ index ++ ] = x;
	    positions[ index ++ ] = y;
	    positions[ index ++ ] = z;

	    x += 50 - (Math.random() * 100);
	    y += (Math.random() * 10);
	    //z += 5 - (Math.random() * 100);

	}

	line.geometry.setDrawRange(0, MAX_POINTS);//itens draw
	line.geometry.attributes.position.needsUpdate = true;

},100);*/


	//stats = new Stats();
	//$('#menu .left').append( stats.domElement );



	/*var casa1 = new THREE.Mesh( new THREE.CubeGeometry( 180, 130, 130, 1, 1, 1 ), [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1.jpg'), side:THREE.FrontSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1_2.jpg'), side:THREE.FrontSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1_2.jpg'), side:THREE.FrontSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1_2.jpg'), side:THREE.FrontSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1_2.jpg'), side:THREE.FrontSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/casa1_2.jpg'), side:THREE.FrontSide})
	] );
	casa1.position.set(0, 130/2, -500);
	scene.add(casa1);*/

	/*parede = new THREE.Mesh( new THREE.PlaneGeometry(150, 150, 1, 1), new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} ) );
	scene.add( parede );*/




/*new THREE.MTLLoader()
.setTexturePath( 'models/' )
.setPath( 'models/' )
.load( 'stadium1.mtl', function ( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'models/' );
    objLoader.load('stadium1.obj', function(obj){

			obj.scale.set(22, 22, 22);
			obj.position.set(0, -30, 0);
			scene.add(obj);

			console.log(obj)

			//for(var c = 0;c < obj.children.length;c++){
				//obj.children[c].castShadow = false;
				//obj.children[c].material.lights = false;
			//}


			//for(var c = 0;c < 20;c++){
				//var teste = obj.clone();
				//scene.add(teste);
				//teste.position.set(Math.random() * 1000, 0, 0)
			//}

		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log( 'An error happened' );
		}
	);

});*/

}

function resize(){

	var stageWidth = document.documentElement.clientWidth,
    stageHeight = document.documentElement.clientHeight;  

	if(stageHeight > stageWidth){
		if($('#landscapemsg').length < 1) $('body').prepend('<div id="landscapemsg"></div>');	
	}else{
		$('#landscapemsg').remove();
	}
	
	if(mobile && !startPhonegap) setFullscreen();


	$('style').html('#pipas .it{width:'+((stageWidth / parseInt(stageWidth / 90)) - 4)+'px}');

	//$('#pipas .it').css({'width': ((stageWidth / parseInt(stageWidth / 90)) - 4) + 'px' });//90 - 4px(borda)
	

	var itsCenter = $('.centralizeJS');
    for(var c = 0;c < itsCenter.length;c++){

    	var it = itsCenter.eq(c),
    	w = parseInt(it.css('width')),
    	h = parseInt(it.css('height')),
    	x = (w/2),
    	y = (h/2);

    	it.css({
    		'position':'absolute',
    		'top':'50%',
    		'left':'50%',
    		'margin':'-'+y+'px 0px 0px -'+x+'px'
    	});

    }

}

var arrScene = [];
function addMesh( geometry, scale, x, y, z, rx, ry, rz, material ) {
	mesh = new THREE.Mesh( geometry, material );
	mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
	mesh.position.set(x,y,z);
	mesh.rotation.set(rx,ry,rz);
	mesh.overdraw = true;
	mesh.doubleSided = false;
	mesh.updateMatrix();
	return mesh;
}

function criarBannerAdMob(view){
	//console.log('CRIAR BANNER:', Math.random());
	if(startPhonegap){
		try{
		    if(AdMob){

		    	clearTimeout(timeoutBannerAdMob);

		    	//if(view != undefined) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
			    //setTimeout(function(){
				    AdMob.createBanner({
					    adId:'ca-app-pub-4736032489372828/2205920468',//'ca-app-pub-4736032489372828/4488138685',
					    position:AdMob.AD_POSITION.BOTTOM_CENTER,
					    autoShow:true,
					    isTesting:isTestingAdMob
					},function(){
						//if($('#pipas').length > 0) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
					},function(err){
						//alert('erro:'+err);
						setAlertMsg('erro:'+err);
					});
					AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
				//}, 300);
			}
		}catch(err){}
	}
}
var timeoutBannerAdMob = undefined;
function removeBannerAdMob(){
	if(startPhonegap){
		try{
			if(AdMob) {
				clearTimeout(timeoutBannerAdMob);
				timeoutBannerAdMob = setTimeout(function(){
					AdMob.hideBanner();
				}, 200)
			}
		}catch(err){}
	}
}
var timeUltBannerView = 0;
function criarInterstitialAdMob(view){
	
	//console.log('CRIAR Interstitial:', Math.random());



// ============= EVITA EXIBIR SEM INTERVALO OS BANNERS
	if(view != undefined){
		if(new Date().getTime() - timeUltBannerView > 5000){//5000 = 5seg
			//console.log('EXIBE BANNER', new Date().getTime() - timeUltBannerView)
			timeUltBannerView = new Date().getTime();
		}else{
			//console.log('NÃO EXIBE BANNER', new Date().getTime() - timeUltBannerView)
			timeUltBannerView = new Date().getTime();
			return;
		}
	}
// ===================================================




	if(startPhonegap){
		try{
		    if(AdMob){
		    	if(view != undefined) AdMob.showInterstitial();
	    		AdMob.prepareInterstitial({
					adId:'ca-app-pub-4736032489372828/7451057027',//'ca-app-pub-4736032489372828/9769343384', 
					autoShow:false,
					isTesting:isTestingAdMob
				},function(){
					//alert('CARREGOU: ' + type)
				});
			}
		}catch(err){}
	}
}

/*function criarRewardVideoAdMob(view){
	if(startPhonegap){
		try{
		    if(AdMob){
		    	if(view != undefined) AdMob.showRewardVideoAd();
	    		AdMob.prepareRewardVideoAd({
			        adId:'ca-app-pub-4736032489372828/9310933604',//'ca-app-pub-4736032489372828/3614104353',
			        autoShow:false,
					isTesting:isTestingAdMob
			    });
			}
		}catch(err){}
	}
}
document.addEventListener('onAdPresent', completedRewardVideoAdMob);
function completedRewardVideoAdMob(data){
	if(data.adType == 'rewardvideo'){
		//console.log(data.rewardType, data.rewardAmount); 
		if(rewardType == 'pipa') BD.pipas[parseInt($('.reward').attr('attr-id'))] += 5;
		if(rewardType == 'linha') BD.linhas[parseInt($('.reward').attr('attr-id'))] += 5;
		updateBD();
		$('.reward').hide();
	}
}

var rewardType = 'pipa';
function sortReward(){

	var arrSort = [];
	$('.reward img').removeClass('linha');
	rewardType = (Math.random() > 0.5) ? 'pipa' : 'linha';

	if(rewardType == 'pipa'){
		for(var c = 0;c < arrPipas.length;c++){
			if(BD.pipas[c] == 0) arrSort.push(c);
		}
		if(arrSort == 0) {//se tiver todas pipas, sorteia uma qualquer
			for(var c = 0;c < arrPipas.length;c++) arrSort.push(c);
		}
		var id = arrSort[parseInt(arrSort.length * Math.random())];
		$('.reward').attr({'attr-id':id}).find('img').attr({src:'img/pipas/' + arrPipas[id].img + '.png'});
	}
	if(rewardType == 'linha'){
		for(var c = 0;c < arrLinhas.length;c++){
			if(BD.linhas[c] == 0) arrSort.push(c);
		}
		if(arrSort == 0) {//se tiver todas pipas, sorteia uma qualquer
			for(var c = 0;c < arrLinhas.length;c++) arrSort.push(c);
		}
		var id = arrSort[parseInt(arrSort.length * Math.random())];
		$('.reward').attr({'attr-id':id}).find('img').addClass('linha').attr({src:'img/linhas/' + arrLinhas[id].img + '.png'});
	}

	if(arrSort.length == 0) $('.reward').hide();//se tiver todas pipas não aparece presente

}*/

function gritoDelay(apenasDelay){

	//FORCE verif se perso != 0, está com pipa no alto *BUG - se não tiver empina
	if(apenasDelay == undefined){
		if(type == 'festival'){
			var tot = persos.length;
			while(tot--){
				var perso = persos[tot];
				if(!perso.pipaPrincipal && perso.paiPipa == undefined){
					perso.initPipa();
				}
				if(tot == 1) break;
			}
		}
	}


	if(apenasDelay == undefined){
		playSom('delay/' + getSomDelay(), 1);
	}
	clearTimeout(timeoutGrito);
	timeoutGrito = setTimeout(gritoDelay, 13000);
}

function getSomDelay(){
    if(++idcSomDelay > 13) idcSomDelay = 1;
    return idcSomDelay;
}

function getSomCortou(){
    if(++idcSomCortou > 32) idcSomCortou = 1;
    return idcSomCortou;
}

function setBalao(){
	
	var loader = new THREE.ColladaLoader();
	loader.load('models/baloes/piao.dae', function(collada){

		if(collada.scene.children[0].name.toLowerCase() == 'camera') collada.scene.children.splice(0, 1);

		var balao = collada.scene.children[0].clone();
		balao.material.side = 2;
		
		balao.scale.set(75, 75, 75);
		balao.rotation.set(-_90graus, 0, 0);
		//if(BD.vento == 0){
			balao.position.set(-1700, -50, -5400);
		//}else{
			//balao.position.set(1700, -50, 5400);
		//}
		
		scene.add(balao);
		baloes.push(balao);

		if(!BD.som) $('.icoSom').tap();//força ativar o som quando zerar

		playSom('balao', 1);
		
	});
	
}

function setBalaoJapones(){
	var balao = new Balao();
	balao.init(arrBaloes[0]);
	var paiPipa = getPaiPipaPrincipal();
	balao.balao.position.x = paiPipa.perso.position.x;
	balao.balao.position.z = paiPipa.perso.position.z-20;
	baloes.push(balao);
}

var timeoutTwoPlayer = undefined;
function setInfoTwoPlayer(playerVenceu){

	if(playerVenceu != undefined){

		infoTwoPlayer[playerVenceu].cortou++;//obj

		var pipa = (playerVenceu == 'player1') ? persos[0].paiPipa : persos[1].paiPipa,
		player = (playerVenceu == 'player1') ? 'Player 1' : 'Player 2';

		if(singlePlayer){

			//if(infoTwoPlayer.player1.cortou >= arrPipas.length){

			//if(infoTwoPlayer.player1.cortou == 2) setBalao();


			if(infoTwoPlayer.player1.cortou >= arrPipas.length){
				setZerou();
			}else if(playerVenceu == 'player2'){
				setMsg('GAME OVER');
				clearTimeout(timeoutTwoPlayer);
				timeoutTwoPlayer = setTimeout(function(){
					if(scene != undefined){
						menuSemPipaNoAlto();
						fechar();
					}
				}, 8000);
			}else{

				clearTimeout(timeoutTwoPlayer);
				timeoutTwoPlayer = setTimeout(function(){
					if(scene != undefined){
						persos[0].matarPipa();
						persos[0].initPipa();
						persos[1].matarPipa();
						persos[1].initPipa();
						camera.position.set(0, 450, 400);
					}
				}, 8000);

			}

		}else{		

			setTimeout(function(){
				if(scene != undefined){
					if(infoTwoPlayer.player1.cortou == 3 || infoTwoPlayer.player2.cortou == 3){
						setMsg('RESULTADO FINAL<br>'+infoTwoPlayer.player1.cortou + ' X ' + infoTwoPlayer.player2.cortou+'<br>' + player + ' Venceu!!');
					}else{
						setMsg(player + ' - ' + arrPipas[pipa.id].nome + '<br>Venceu!');
					}
				} 
			}, 3000);

			clearTimeout(timeoutTwoPlayer);
			timeoutTwoPlayer = setTimeout(function(){
				if(scene != undefined){
					if(infoTwoPlayer.player1.cortou == 3 || infoTwoPlayer.player2.cortou == 3){
						menuSemPipaNoAlto();
						fechar();
					}else{
						persos[0].matarPipa();
						persos[0].initPipa();
						persos[1].matarPipa();
						persos[1].initPipa();
						camera.position.set(0, 450, 400);
					}
				}
			}, 8000);

		}

	}

	if(type == 'twoPlayer' && !singlePlayer) $('#placar').html(infoTwoPlayer.player1.cortou + ' x ' + infoTwoPlayer.player2.cortou);
	
}

function setZerou(){

	setMsg('ZEROU!!');
	clearTimeout(timeoutGrito);
	setBalao();
	if(BD.vento == 1) setCam(camTrasVerBalao);

}

function soltarFogos(){
	
	for(var c = 0;c < 212;c++){
		
		var teste = new THREE.Mesh( new THREE.PlaneGeometry( 3, 3, 3 ), new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} ) );
		scene.add( teste );
		
		var timeTransition = 1.5 + (Math.random() * 1.5),
		vol = 0.3;
		if(c == 9) {vol = 0.6; timeTransition = 3.1};
		if(c == 10) {vol = 0.6; timeTransition = 3.2};
		if(c == 11) {vol = 1;timeTransition = 3.5};
		
		TweenMax.to(teste.position, timeTransition, { 
	    	ease:Back.easeOut,
	        x:rand(-50, 50),
	        y:rand(300, 500),
	        onCompleteParams:[teste, vol],
	        onComplete:function(obj, vol){
	        	playSom('tiroFogos', vol, true);
	        	clear3D(obj); scene.remove(obj); obj = undefined;
	        }
	    });

	}

}

function soltarTremeterra(){
	
	var a = new THREE.Mesh( 
		new THREE.PlaneGeometry( 34/4, 500/4, 1, 1 ), 
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/tremeterra.png'), transparent:true, depthWrite:false, side:THREE.DoubleSide})
	);
	a.renderOrder = 4;
	scene.add(a);

	TweenMax.to(a.position, 1.5, { 
    	//ease:Cubic.easeOut,
    	x:rand(-50, 50),
        y:rand(200, 400),
        onCompleteParams:[a],
        onComplete:function(obj){
        	playSom('tiroFogos', 1, true);
        	clear3D(a); scene.remove(a); a = undefined;
        }
    });

}

function removeJoystick(){
	if(joystick != undefined) {
		joystick.destroy();
		joystick = undefined;
	}
}

function createJoystick(){
	removeJoystick();
	if(type == 'festival' || type == 'online'){
		joystick = nipplejs.create({
	        zone:document.getElementById('joystick'),
	        mode:'static',
	        position:{ bottom:'60px', left:'60px' },
	        color:'#FFF',
	        size:80,
	        multitouch:true,
	        restOpacity:1, 
	        maxNumberOfNipples:2//max touchs
	    }).on('start', function (evt, data) {
	        //console.log('start');
	        //paiPipaPrincipal.perso.rotation.y = 0;
	        paiPipaPrincipal.avatar.rotation.z = de2ra(180);//IMPORTANT
	        if(type == 'online'){
	        	var perso = pipasName[nomePlayer].perso;
	    		socket.emit(2, [nomePlayer, Math.round(perso.position.x), Math.round(perso.position.y), Math.round(perso.position.z)]);
	    	}

	    	$('#players').hide();
	    	$('#pular').show();


	    }).on('end', function (evt, data) {
	    	paiPipaPrincipal.pressLeft = paiPipaPrincipal.pressRight = paiPipaPrincipal.pressUp = paiPipaPrincipal.pressDown = false;
	        paiPipaPrincipal.stopPersoCorrer();
	        //setCameraAuto();

	        if(type == 'online'){
	        	var perso = pipasName[nomePlayer].perso;
	    		socket.emit(2, [nomePlayer, Math.round(perso.position.x), Math.round(perso.position.y), Math.round(perso.position.z)]);
	    	}

	    	$('#players').show();
	    	$('#pular').hide();

	    	paiPipaPrincipal.directPersoAndar = -1;

	    }).on('move', function (evt, data) {

	    	//var pct2 = parseInt(data.angle.degree / 4);
	    	//var vai = (pct2 * 4);
	    	//paiPipaPrincipal.vai = de2ra(vai - 90);

	    	var dt = Math.round(data.angle.degree/45),
	    	a = 0;


	    	/* ==========
	    	// Ativar ajute cam rotation perso
	    	dt -= directionCamera;
	    	if(dt < 0) dt = 8 + dt;
	    	========== */
	    	

	    	paiPipaPrincipal.pressLeft = paiPipaPrincipal.pressRight = paiPipaPrincipal.pressUp = paiPipaPrincipal.pressDown = false;

	    	switch (dt) {
			    case 2 : a = 0; break;
			    case 1 : a = 1; break;
			    case 0 : a = 2; break;
			    case 8 : a = 2; break;
			    case 7 : a = 3; break;
			    case 6 : a = 4; break;
			    case 5 : a = 5; break;
			    case 4 : a = 6; break;
			    case 3 : a = 7; break;
			    //case 8 : pressDown = true; pressRight = true; break;
			}

			
			/* ==========
	    	// Ativar ajute cam rotation perso
			if(!usageAvatar) paiPipaPrincipal.avatar.material.map.offset.y = 1 - ((1/8) * (a+1));
			========== */
			//if(!usageAvatar) paiPipaPrincipal.avatar.material.map.offset.y = 1 - (1/8);


			
			if(!usageAvatar) {
				//paiPipaPrincipal.avatar.material.map.offset.y = vai;
				//paiPipaPrincipal.directPersoAndar = 1 - (umDivididoPorOito * (a+1));
				paiPipaPrincipal.directPersoAndar = a;//1 - (umDivididoPorOito * (a+1));
			}
	    	

	    	//OLD - 15/02/2019
	    	//paiPipaPrincipal.perso.rotation.y = de2ra(data.angle.degree - 90).toFixed(1);
	    	paiPipaPrincipal.playPersoCorrer();


	    	if(type == 'online'){
	    		//console.log('emit', Math.random())
	    		if(rotPersoOnline != paiPipaPrincipal.directPersoAndar){
	    			rotPersoOnline = paiPipaPrincipal.directPersoAndar;
	    			//socket.emit(2, [nomePlayer, rotPersoOnline]);
	    			socket.emit(2, [nomePlayer, rotPersoOnline, Math.round(paiPipaPrincipal.perso.position.x), Math.round(paiPipaPrincipal.perso.position.y), Math.round(paiPipaPrincipal.perso.position.z)]);
	    		}
	    	}




	    	//OK
	    	/*paiPipaPrincipal.perso.rotation.y = de2ra(data.angle.degree - 90).toFixed(1);
	    	paiPipaPrincipal.playPersoCorrer();

	    	if(type == 'online'){
	    		//console.log('emit', Math.random())
	    		if(rotPersoOnline != paiPipaPrincipal.perso.rotation.y){
	    			rotPersoOnline = paiPipaPrincipal.perso.rotation.y;
	    			socket.emit(2, [nomePlayer, rotPersoOnline]);
	    		}
	    	}*/

	    });

	}

}

function openMessage(){

	var html = '' + 		
	'<div id="popup" class="animated zoomInDown">' +
	'	<div class="tx4 ms"><a class="close"></a>' +
	'		<article class="salas sons">' +
	'        <input class="msg" type="text" maxlength="45" name="msg" placeholder="Digite uma mensagem">' +
    '        <a class="btnOk">OK</a>' +
	'		</article>' +
	'	</div>' + 
	'</div>';

	$('main').append(html);
	$('#popup .close')
	.on(getTap(), function(){
		$('#popup').remove();
	});

	$('#popup .btnOk')
	.on(getTap(), function(e){
		if($('#popup .msg').val() != ''){
			socket.emit('setMsg', $('#popup .msg').val());
			$('#popup').remove();
			$('#popup .msg').val('');
		}
	});

	$('#popup .msg').on("keypress", function(e) {
        if (e.keyCode == 13) {
       		if($('#popup .msg').val() != ''){
				socket.emit('setMsg', $('#popup .msg').val());
				$('#popup').remove();
				$('#popup .msg').val('');
			} 	
        }
    });

	$('#popup .msg').focus();

}

function addPerso(c){

	if(type == undefined) return;
	
	var perso = new Perso();

	if(type == 'festival'){
		if(c == 0) {
			perso.pipaPrincipal = true;
			perso.idc = c;
			paiPipaPrincipal = perso;
		}
	}

	if(type == 'online'){

		//console.log('obj:', c);

		//infosOnline = {};
        infosOnline[c.name] = {nick:c.nick};//gravando nick nessa var p/ evitar transferir essa info no placar
    	
		removePerso(c.name);
		if(c.name == nomePlayer){
			perso.pipaPrincipal = true;
			paiPipaPrincipal = perso;
		}
		perso.sprite = c.i;
		perso.name = c.name;
		perso.nick = c.nick;
		pipasName[c.name] = perso;

		perso.idc = Object.keys(pipasName).length - 1;

		//console.log('PIPAAAAA', c);

	}else{
		persos.push(perso);	
	}

	
	perso.init(c);

}

function removePerso(name){
	if(pipasName[name] != undefined){
		//console.log('removePerso -----', name, pipasName[name])
		pipasName[name].removePerso();
		delete pipasName[name];
	}
}

function clearTweenPipa(paiPipa){
	TweenMax.killTweensOf(paiPipa);
	TweenMax.killTweensOf(paiPipa.myObject);
	TweenMax.killTweensOf(paiPipa.myObject2);
	TweenMax.killTweensOf(paiPipa.pipa.rotation);
	TweenMax.killTweensOf(paiPipa.pipa.rotation);
	//TweenMax.killTweensOf(paiPipa.pipa1.rotation);
	//TweenMax.killTweensOf(paiPipa.pipa2.rotation);
}


function animate(){
    requestAnimation = requestAnimationFrame(animate);
	if(!paused) render();

	//var interval = setInterval(render, 1000 / 60);//ativ requestAnimationFrame - comentar essa linha e liberar as duas acima
}


//Ativando o gravar - alem de tirar os comentarios aqui - liberar setGravar do controler.js
/*var arrGravar = [],
cont = 0,
gravar = true;
console.log('GRAVANDO');

function setGravar(type){
	// 1:disbicar 2:puxar 3:descarregar
	if(gravar) arrGravar[cont-1] = type;
}

function getGravar(){
	var html = '',
	tot2 = arrGravar.length;
	arrGravar.reverse();
	while(tot2--){
		html += arrGravar[tot2]+',';
	}
	$('body').html('<textarea style="width:100%;height:100%;">['+html+']</textarea>');
}*/

function render(){

	/*if(gravar){
		arrGravar[cont] = 0;
		cont++;
	}*/
	var totBaloes = baloes.length;
	while(totBaloes--){
		baloes[totBaloes].update();
	}

	//if(ceu != undefined) ceu.rotation.y += 0.00009;
	//$('#console').html('geometries: '+renderer.info.memory.geometries+' - textures: '+renderer.info.memory.textures);




//====================================	directionCamera + cameraAngle

	cameraAngle = getCameraAngle(camera.getWorldDirection(vec3D)) + 180;
	if(cameraAngle > 358) cameraAngle = 0;//arredonda p/ ajustar pos boneco
	
	/*var vector = camera.getWorldDirection(vec3D.clone());
	angle = THREE.Math.radToDeg( Math.atan2(vector.x,vector.z) );
	var div = 51.42857142857143;//360 / 7;
	directionCamera = -Math.round((angle-180)/div);*/


//====================================


	if(type == 'online'){
			
		
		var pipaA = pipasName[nomePlayer];

		if(pipaA != undefined){

			pipaA = pipaA.paiPipa;

			for(var p in pipasName){

				var mainPipaB = pipasName[p],
				pipaB = mainPipaB.paiPipa;
				if(pipaA != undefined && pipaB != undefined){
					if(!mainPipaB.pipaPrincipal) {
						//ONLINE não precisa verificar colisão de terceiros
						if(!pipaA.autoDescarregar && !pipaB.autoDescarregar) {
							colision(pipaA, pipaB);
							colision(pipaB, pipaA);//da erro ao ativar falta de visible
						}
					}
				}

				pipasName[p].update();
				
			}

		}

	}else{

		var tot2 = persos.length;
		while(tot2--) {
			
			var tot3 = tot2,
			persoA = persos[tot2];
			while(tot3--){

				var pipaA = persoA.paiPipa,
				pipaB = persos[tot3].paiPipa;

				if(pipaA != undefined && pipaB != undefined){
					if(pipaA.podeCortar && pipaB.podeCortar) {
						if(!pipaA.autoDescarregar && !pipaB.autoDescarregar) {
							colision(pipaB, pipaA);
							colision(pipaA, pipaB);
						}
					}
				}

			}
			
			persoA.update();



			/*if(persoA.paiPipa != undefined && parede != undefined && persoA.paiPipa.pipaPrincipal){

				var MovingCube = persoA.paiPipa.line,
		        originPoint = MovingCube.position.clone(),
		        tot = MovingCube.geometry.vertices.length;

		        while(tot--) {

		            var localVertex = MovingCube.geometry.vertices[tot].clone(),
		            globalVertex = localVertex.applyMatrix4( MovingCube.matrix ),
		            directionVector = globalVertex.sub( MovingCube.position ),
		            ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() ),
		            collisionResults = ray.intersectObjects( [parede], true );

		            if(collisionResults.length > 0){
		                console.clear();
		                console.log('COLIDIUDUIDUI');
		            }

		        }

		    }*/







		}

	}








	//PIPAS VOADAS
	tot2 = pipas.length;

	while(tot2--) {

		var paiPipa = pipas[tot2];

		if(paiPipa == undefined){
			pipas.splice(tot2, 1);//Resolve BUG
		}else{

			//if(!paiPipa.morreu) paiPipa.setMorreu();

			paiPipa.update();//manter antes do while q pode exluir pipa


			if(type == 'online') {
				//!IMPORTANT - deixo o array(persos) somente com perso principal, somente ele precisa testar colisão
				persos = [paiPipaPrincipal];//Object.keys(pipasName);
				//persos = Object.keys(pipasName);
			}

			var tot3 = persos.length;
			
			
			while(tot3--) {
				if(!paiPipa.aparou){

					/*if(type == 'online'){
						var paiPerso = pipasName[ persos[tot3] ],
						paiPipa2 = paiPerso.paiPipa;
					}else{*/
						var paiPerso = persos[tot3],
						paiPipa2 = paiPerso.paiPipa;
					//}



					//aparo
					if(/*paiPerso.perso != undefined &&*/ paiPipa2 != undefined && paiPipa.pipa != undefined && paiPipa.pipaNoAlto) {
						if(paiPipa.totFitasRabiola > 0 && paiPipa.podeAparar && !paiPipa.aparou) {
							rabiolaColidiu(paiPipa2, paiPipa);//paiPipa = pipa q pode ser aparada
						}
						//if(!paiPipa.decepou) deceparColidiu(paiPipa2, paiPipa);
					}
					//pegou pipa
					//if(type == 'festival' || type == 'online'){
						if(paiPerso.correndo){//só testa se tiver se movendo
							if(paiPerso.perso != undefined && paiPipa.pipa != undefined) {
								if(paiPipa2 == undefined && paiPipa.pipa.position.y < 50) {
									colisionPersoPipa(paiPerso, paiPipa);//só pega se não tiver com pipa no alto
								}
							}
						}
					//}
				}
			}





		}
	}




	if(cameraTypeFunc == undefined) cameraTypeFunc = camAndandoPerso;//edit 25/02/2019
	/*if(!controlsUsage)*/
	if(scene != undefined/* && !controlsUsage*/) cameraTypeFunc.call();

	if(controlsUsage){
		if(camera.position.y < 0){
			paiPipaPrincipal.perso.visible = false;
		}else{
			paiPipaPrincipal.perso.visible = true;
		}
	}
	

	//renderer.clear();
	renderer.render( scene, camera );
	if(stats != undefined) stats.update();
	//$('#console').html('geometries: '+renderer.info.memory.geometries+' textures: '+renderer.info.memory.textures+' triangles: '+renderer.info.render.triangles);

}



/* SOCKET */

function initOnlineGame(){

	
	type = 'online';

	if($(".nick").is(":focus")) return;
	if(!verificOnline()) return;

	if(sala == undefined){
		setAlertMsg('SELECIONE O SERVER E SALA');
		return;
	}

	addEventsSala();

	//console.log('salaaaa: '+ sala, 'nomePlayer: ' + nomePlayer);

	//clearTimeout(timeout);
	//timeout = setTimeout(function() {

		var nick = $('.nick').val();
		nick = nick.replace(/\</g,"&lt;");
    	nick = nick.replace(/\>/g,"&gt;");
		
		if(nomePlayer) {
			socket.emit('adduser', 
				{
					i:spriteSlc,
					name:nomePlayer,
					line:1,
					img:1,
					sala:sala,
					nick:nick
				}
			);
		}

	//}, 500);

}

function disconnectSocket(){
	if(socket != undefined) {
		//console.log("disconnectSocket!!");
		socket.off('disconnect');
		socket.off('conectado1');
		socket.off('salalotada');
		socket.disconnect();
		//socket.close();//auto disconnect
		socket = undefined;
	}
}

function startSocket(i){

	$('.msgConect').show().html('Conectando Server '+servers[i].n+'<div id="loadingSvg"></div>');
	
	disconnectSocket();

	if(!verificOnline()) return;

	indiceServer = i;
	sala = undefined;

	socket = io.connect(servers[indiceServer].ip, {secure:false, forceNew:true, reconnection:false});
	//socket = io.connect(servers[indiceServer].ip);
	
	
	//socket = io.connect(servers[indiceServer].ip, {secure:false, forceNew:true, reconnection:false});
	//socket = io.connect('http://infra3212.infrananuvem.com.br:3116', {secure: true, forceNew:true, reconnection:false});

	
	
	socket.off('disconnect');
    socket.on('disconnect', function(){

    	voltarSelectOnline();
    	setAlertMsg('SEM CONEXÃO COM SERVIDOR!');
    	$('.msgConect').show().html('');

    	/*if(type != undefined){//perdeu conexão
    		voltarSelectOnline();
			menuSemPipaNoAlto();
    	}*/
    });

	socket.off('conectado1');
	socket.on('conectado1', function(lotado){
		if(lotado){
			setAlertMsg('SERVER LOTADO!');
			$('.msgConect').show().html('');
			disconnectSocket();
		}else{
			//setMsgConect();
	    	initSalasLivres();
	    }
    });

	socket.off('salalotada');
    socket.on('salalotada', function(salas, id){
    	
    	//setAlertMsg('SALA LOTADA!');
    	
		socket.emit('desconectar', nomePlayer);	
		fechar(true);
		menuSemPipaNoAlto();

		//console.log('SALA LOTADA!', type);
		$('.msgConect').show().html('<span style="color:red">*** Sala ' + sala + ' Lotada! ***</span>');
		sala = undefined;
		//initSalasLivres();
		
		
    });

}

function setMsgConect(){
	var s = ((sala != undefined) ? ' - Sala ' + sala : '');
	$('.msgConect').show().html('Conectado Server ' + servers[indiceServer].n + s);
}

function initServers(){

	if(!verificOnline()) return;

	if(json != undefined) json.abort();json = undefined;

	var urlJ = "http://pipacombate.com/3d/json/servers11.json?" + (Math.random() * 5000);
	//var urlJ = "json/servers1.json?" + (Math.random() * 5000);
	if(window.location.protocol == "https:"){
		window.location.href = "http://pipacombate.com/3d/";//por enquanto só funciona http
		//urlJ = "https://pipacombate.com/3d/json/servers1https.json?";
		return;
	}
    json = $.getJSON(urlJ+Math.random(), function(e){
    	
    	if(e.m != '') setAlertMsg(e.m);//caso tenha alguma mensagem de alerta exibir
    	servers = e.a;

    	//publicidade
    	if(e.p != undefined){
    		if(e.p.u != '') setPublicidade(e.p.u, e.p.l);
    	}


    	if(servers.length > 0){

    		$('#menuOnline').show();

			var html = '';
			for(var c = 0;c < servers.length;c++){
				html += '<a class="itc" attr-tipo="'+servers[c].tipo+'"><h2>'+servers[c].t+'</h2>'+servers[c].n+'</a>';
			}
			html += '<a class="close"></a>';
			$('.servers')
			.html(html)
			.find('.itc')
			.on(getTap(), function(e){
				playSom('clickPu', 1);
				if($('.nick').val() == '' || $('.nick').val().substr(0,1) == ' '){
					setAlertMsg('INSIRA SEU NICKNAME');
				}else{
					cenarioSlc = servers[$(this).index()].tipo;
					startSocket($(this).index());
				}
			});

			$('.servers .close').tap(function(){
				playSom('clickPu', 1);
				$('#menuOnline').hide();
				disconnectSocket();
				$('.msgConect').html('');
			});
			
			//console.log(servers)

		}

	});

}

function initSalasLivres(){

	window.localStorage["nick"] = $('.nick').val();

	//type = undefined;

	socket.off('salas');
	socket.on('salas', function(salas, id, _sala, _tot){
		
		//if(type != undefined) return;//só segue se não tiver em jogo

		//console.log('**** sala:'+sala, '_sala:'+_sala);
		//console.log(salas);
		
		if($('.salas .it').length > 0) return;//resolve BUG salas vazias


    	if(nomePlayer == id && _sala != undefined) sala = _sala;
    	if(id != undefined) nomePlayer = id;
    	
    	
    	//console.log(indiceServer)

    	/*if(_sala != undefined){
    		sala = _sala;
    		initOnlineGame();//novo
    	}*/

    	var html = '';
    	for(var i in salas){
    		var selected = ((sala == i) ? ' selected' : '');
    		selected += ((salas[i].t > servers[indiceServer].u-1) ? ' lotado' : '');
    		var vazia = ((salas[i].t < 1) ? ' vazia' : '');
    		var t = ((salas[i].t > servers[indiceServer].u-1) ? 'Lotado' : salas[i].t+' users');
    		html += '<a class="it'+vazia+selected+'" attr-id="'+i+'"><h4><b>'+i+'</b><br>'+t+'</h4></a>';
    	}

    	setPopupSalas();
    	setMsgConect();
    	$('.servers .itc').removeClass('ativo').eq(indiceServer).addClass('ativo');


    	if(_tot != undefined) $('.salas').html(html+'<div class="clear" style="margin:0 0 8px 0;"></div>'+_tot+' conectados');
    	
    	
    	$('.salas .it')
		.on(getTap(), function(e){

			playSom('clickPu', 1);


			//console.log('RRRRRRRR', sala, $(this).attr('attr-id'));

			if(sala != undefined && sala != $(this).attr('attr-id')){
				//console.log('DIFERENTE !!!!')
				removeEventsSala();
			}


			sala = $(this).attr('attr-id');

			$('.msgConect').show().html('Conectando...<div id="loadingSvg"></div>');
			socket.emit('addSala', sala);

			//if(sala != undefined){
				$('#popup').remove();
				initOnlineGame();//novo
			/*}else{
				//$('.msgConect').show().html('Conectando... ' + servers[indiceServer].n + ' - Sala ' + $(this).attr('attr-id'));
				//socket.emit('addSala', $(this).attr('attr-id'));
				$('#popup').hide();
	    		removePopupDelay();
	    		//alert('sala: '+sala)
	    	}*/

		});

    });

	setTimeout(function(){//resolve BUG
		socket.emit('getSalas');
	}, 300);
    

}

function setPublicidade(img, lk){


	var ultPublicidade = window.localStorage["publicidade"];
	if(ultPublicidade == img){
		//se for oq ta no cache já apareceu uma vez não exibir novamente
	}else{
		
		window.localStorage["publicidade"] = img;

		$('#publicidade').remove();
	    $('main').append(
	        '<div id="publicidade" class="animated zoomInDown">' + 
	        '  <div class="banner"><a href="'+lk+'" target="_blank"><img src="'+img+'" /></a><a class="close"></a></div>' + 
	        '</div>'
	    );
	    $('#publicidade').tap(function(){
	    	setTimeout(function(){
	    		$('#publicidade').remove();	
	    	}, 200);//Manter delay p/ funcionar link
	    });//qualquer lugar q clicar fecha o banner

	}
    
}

function setPopupSalas(){
    $('#popup').remove();
    $('main').append(
        '<div id="popup" class="animated zoomInDown">' + 
        '    <div class="tx4">' + 
        '        <a class="close"></a>' + 
        '        <article class="salas"><div class="clear"></div>' + 
        '    </div>' + 
        '</div>'
    );
    $('#popup .close').tap(function(){
    	$('#popup').remove();
    });
}

function addEventsSala(){

	removeEventsSala();

	socket.on('game', function(users, placar){
		
		init3D();
		//console.log(users);
		
		infosOnline = {};//IMPORTANT

        for(var index in users){
        	
        	addPerso(users[index]);

        	var obj = users[index];
        	//console.log('OPAAAAA', obj);
        	
    		if(obj.pipa.length > 2){//se já tiver com pipa no alto cria ela

	    		var paiPerso = pipasName[obj.name];
	    		paiPerso.linha = obj.pipa[1];
	    		paiPerso.name = obj.name;
	    		paiPerso.initPipa(obj.pipa[0]);

	    		if(obj.z != obj.pipa[4] && obj.pipa[4] != 0){//se perso e pipa tiverem marcando msm posição não setar pos
	    			clearTimeout(paiPerso.paiPipa.timeout);
	    			paiPerso.paiPipa.podeCortar = true;
					paiPerso.paiPipa.autoDescarregar = false;
					paiPerso.paiPipa.descarregar = paiPerso.paiPipa.puxar = paiPerso.paiPipa.disbicar = 0;
	    			paiPerso.paiPipa.pipa.position.set(obj.pipa[2], obj.pipa[3], obj.pipa[4]);
					//paiPerso.paiPipa.posZ = Number(obj[5]);//BUGANDO NÃO SEI PQ
					//paiPerso.paiPipa.pipa.rotation.z = obj[6];//BUGANDO NÃO SEI PQ
	    		}
    		
    		}

        }

        updatePlacar(placar);

    });

    socket.on('addPerso', function(obj, placar){//insert Perso
    	if(type != 'online') return;
    	addPerso(obj);
    	//console.log("socket.on('addPerso'", obj);
    	updatePlacar(placar);
    });

    socket.on('removePerso', function(name, placar){//remove Perso
    	//console.log('removePerso')
    	if(type != 'online') return;
    	removePerso(name);
    	updatePlacar(placar);
    });

    socket.on('saiu', function(n, placar){
    	if(type == 'online'){
	    	if(pipasName[n]) {
	    		if(nomePlayer == n) {
	    			//console.log('SAIU HEIN 1');
	    			voltarSelectOnline();
	    		}else{
	    			//console.log('SAIU HEIN 2');
	    			removePerso(n);
	    			if(placar != undefined) updatePlacar(placar);
	    		}
	    	}
	    }
    });

    socket.on('pipa', function(obj, placar){
    	if(type != 'online') return;
    	//console.log('Socket Recebe - pipa::::', obj);
    	var paiPerso = pipasName[obj.n];
    	if(paiPerso != undefined){
    		if(obj.s == 'add'){
    			paiPerso.perso.position.set(obj.x, obj.y, obj.z);
	    		paiPerso.linha = obj.linha;
	    		paiPerso.name = obj.n;
	    		paiPerso.initPipa(obj.pipa);
	    		//console.log('##############',obj);
	    	}
	    	if(obj.s == 'rem'){
	    		paiPerso.matarPipa();
	    	}
	    	if(obj.s == 'pegou'){
	    		for(var c = 0;c < pipas.length;c++){
	    			var pipa = pipas[c];
	    			//console.log(obj.n , pipa.getPerso.name , pipa.contPipaOnline , obj.i);
	    			if(pipa != undefined && obj.d == pipa.getPerso.name && pipa.contPipaOnline == obj.i){
	    				if(pipa != undefined && pipasName[obj.n] != undefined){
	    					pipa.pegouPipa(pipasName[obj.n], true);
	    				}
	    			}
	    		}
	    		//pipasName[obj.n].peg
	    	}
	    	if(obj.s == 'aparou'){
	    		if(pipasName[obj.n] != undefined){
	                var pipaAparou = pipasName[obj.n].paiPipa,
	                pipaAparada = getPipaVoadaName(obj.d);
	                if(pipaAparou != undefined && pipaAparada != undefined){
	                	pipaAparada.setAparou(pipaAparou, obj.t, obj.c);	
	                }
	            }
	    	}
	    	if(obj.s == 'fatiou'){
	    		var pipaAparou = pipasName[obj.n];
	    		if(pipaAparou != undefined){
	    			//console.log('veio aquiiiii',pipaAparou, obj.r);
	    			if(pipaAparou.paiPipa != undefined && obj.r != undefined) pipaAparou.paiPipa.setFatiar(obj.r);	
	    		}
	    	}
	    	if(obj.s == 'xepou'){
	    		//faz nada só updatePlacar
	    	}
    	}
    	if(placar != undefined) updatePlacar(placar);
    });

    socket.on(1, function(obj){
    	
    	if(type != 'online') return;

    	var perso = pipasName[obj[1]];

    	if(perso != undefined && perso.paiPipa != undefined){

    		clearTweenPipa(perso.paiPipa);

    		var evt = obj[0];

    		//evita atualizar posição a todo momento atualiza apenas se intervalo for maior
    		var _x = (Math.abs(perso.paiPipa.pipa.position.x - obj[2]) > 50) ? obj[2] : '',
    		_y = (Math.abs(perso.paiPipa.pipa.position.y - obj[3]) > 50) ? obj[3] : '',
    		_z = (Math.abs(perso.paiPipa.pipa.position.z - obj[4]) > 50) ? obj[4] : '';

			if(_x != '') perso.paiPipa.pipa.position.x = _x;
			if(_y != '') perso.paiPipa.pipa.position.y = _y;
			if(_z != '') perso.paiPipa.pipa.position.z = _z;
    		//perso.paiPipa.pipa.position.set(obj[2], obj[3], obj[4]);



			if(evt != 2){//se tiver descarregando não ficar atualizando giro, somente no disbique e puxar
				perso.paiPipa.posZ = Number(obj[5]);
				perso.paiPipa.pipa.rotation.z = obj[6];
			}

    			 if(evt == 0) puxar(perso.paiPipa);
    		else if(evt == 1) disbicar(perso.paiPipa);
    		else if(evt == 2) descarregar(perso.paiPipa);

    	}

    });

    socket.on(2, function(arr){//andar perso

    	//if(arr[1] == -1) return;

    	if(type != 'online') return;
    	
    	var paiPerso = pipasName[arr[0]];
    	//paiPerso.avatar.rotation.z = de2ra(180);//IMPORTANT
    	if(paiPerso != undefined){
	    	if(arr.length == 5){//andar

	    		if(paiPerso.paiPipa != undefined) paiPerso.matarPipa();//se andar com pipa no alto, matar pipa erro !IMPORTANT

	    		if(arr[1] == 'pular'){
			    	
					//PULAR
			    	//console.log('PULARRRRRR ----->', arr[2], arr[3], arr[4]);
			    	paiPerso.perso.position.set(arr[2], arr[3], arr[4]);
			    	paiPerso.pular();
			    }else{

			    	//ANDAR
			    	paiPerso.directPersoAndar = arr[1];// + cameraAngle;
			    	paiPerso.pressLeft = paiPerso.pressRight = paiPerso.pressUp = paiPerso.pressDown = paiPerso.pressSpace = false;//!IMPORTANT
			    	paiPerso.perso.position.set(arr[2], arr[3], arr[4]);

			    	if(paiPerso.directPersoAndar == -1){
			    		paiPerso.stopPersoCorrer();
			    	}else{
			    		paiPerso.playPersoCorrer();
			    	}
			    	
			    }

		    }else{//parar de andar
		    	paiPerso.perso.position.set(arr[1], arr[2], arr[3]);
		    	//paiPerso.stopPersoCorrer();
		    	paiPerso.correndo = false;
		    	paiPerso.pressLeft = paiPerso.pressRight = paiPerso.pressUp = paiPerso.pressDown = paiPerso.pressSpace = false;//!IMPORTANT
		    	//pressLeft = false, pressRight = false, pressUp = false, pressDown = false;
		    }
		}
    });

	socket.on('bateuparede', function(obj){
		
		if(type != 'online') return;
		//console.log('AE')

		var pipaVoou = pipasName[obj.voou];
		if(pipaVoou != undefined && pipaVoou.paiPipa != undefined && pipaVoou.paiPipa.pipa != undefined){
			pipaVoou.paiPipa.pipa.position.set(obj.x, obj.y, obj.z);
			pipaVoou.paiPipa.setMorreu();
		}

	});

    socket.on('voou', function(obj, placar){

    	if(type != 'online') return;

    	//console.log(obj,pipasName[obj.voou]);
    	var pipaVoou = pipasName[obj.voou],
    	pipaCortou = pipasName[obj.cortou];
    	if(pipaVoou != undefined && pipaCortou != undefined){
	        if(!pipaVoou.morreu){
		        
		        if(pipaVoou.paiPipa != undefined && pipaVoou.paiPipa.pipa != undefined){
			        pipaVoou.paiPipa.pipa.position.set(obj.x, obj.y, obj.z);
			        pipaVoou.paiPipa.setMorreu(undefined, undefined, pipaCortou);

			        if(pipaVoou.pipaPrincipal) setMaisUm(obj._x, obj._y, obj._z, true);	
			        if(pipaCortou.pipaPrincipal) setMaisUm(obj._x, obj._y, obj._z);
			        
	                if(pipaCortou.pipaPrincipal || pipaVoou.pipaPrincipal) playSom('cortou/'+getSomCortou(), 1);
	                if(pipaCortou.pipaPrincipal) {
	                	//BD.dinheiro += 0.5;
	                	updateBD();
	                }
	            }

			}
	    }
	    updatePlacar(placar);
    });
    
    /*//desativado
    socket.on('updatePlacar', function(obj){
    	if(type == 'online') updatePlacar(obj);
    });*/

    socket.on('venceu', function(n){

    	if(type != 'online') return;
    	
    	setAlertMsg("<b style='color:green'>"+n.toUpperCase()+" VENCEU!</b>");

    	setTimeout(function(){
    		if(nomePlayer != undefined && type != undefined){
    			socket.emit('desconectar', nomePlayer);
    		} 
    	}, 6000);

    });

    socket.on('setMsg', function(m){
    	if(type == 'online') setMsgChat(m);
	});

	/*

    socket.on('reload', function(obj){
    	if(stage == undefined) return;
		if(obj.name == nomePlayer) setMsgVai();
		insertPipaOnline(obj);
    });

    socket.on('aparou', function(obj, placar){
        if(stage == undefined) return;
        if(pipasName[obj.pipaAparada] != undefined){
	        reloadPipaDelay(obj.pipaAparada);
	    	pipasName[obj.pipaAparada].rabiolaColidiu = {
				pipa:pipasName[obj.pipa],
				x:obj.x,
				y:obj.y,
				pct:obj.pct,
				indice:obj.indice
			}
			pipasName[obj.pipa].pipasAparadas.push(pipasName[obj.pipaAparada]);
			pipasName[obj.pipa].aparou();

	        if(pipasName[obj.pipa].pipaPrincipal) {
				sons.play('aparou');
				setVibrate();
			}
			updatePlacar(placar);
		}

    });

    socket.on('fatiar', function(obj){
    	if(pipasName[obj.pipa] != undefined){
    		pipasName[obj.pipa].fatiarPipa(obj.indice);
    	}
    });

    

	*/

}

function getPipaVoadaName(name){
	var tot = pipas.length;
	while(tot--){
		var pipa = pipas[tot];
		if(pipa != undefined){
			if(pipa.getPerso.name == name){
				return pipa;
				break;
			}
		}
	}
}

function updatePlacar(obj){

	//console.log('PLACAR::::')
	//console.log(obj);

	//===
	if(obj != undefined){//atualizando variaveis
		for(var index in obj){
			if(pipasName[index] != undefined){
	    		pipasName[index].cortou = obj[index][0];
	    		pipasName[index].voou = obj[index][1];
	    		pipasName[index].xepou = obj[index][2];
	    	}
		}
	}
	
	///
	if(!$('#players').length) $('#ThreeJS').append('<div id="players"><a class="close"></a><table></table></div>');
	if($('#message').length == 0){
		$('#topDir').append('<div id="message" class="btn"></div>');
		$('#message').on(getTap(), openMessage);
	}

	var arr = [],
	c = 0;
	for(var index in pipasName){
		var pName = pipasName[index];
		arr.push({
			cor:c++,
			name:pName.name,
			line:pName.line,
			cortou:pName.cortou,
			voou:pName.voou,
			xepou:pName.xepou
		});
    }
    //order by cortou
    arr.sort(function(a, b){return parseFloat(b.cortou) - parseFloat(a.cortou);});

    
    var html = '<tr class="tit"><td colspan="4">Server '+servers[indiceServer].n+' - Sala '+sala+'</td></tr>';
    html += '<tr class="tit"><td>Player</td><td>Cortou</td><td>Perdeu</td><td>Xepou</td></tr>';
	for(var c = 0;c < arr.length;c++){
		//console.log('=======', infosOnline,arr[c].name)
		var _nick = ((infosOnline[arr[c].name] != undefined) ? infosOnline[arr[c].name].nick : '?');
		//var selected = ((nomePlayer == arr[c].name) ? ' class="selected"' : ''),
		sprite = arr[c].sprite;
		html += '<tr class="p'+arr[c].cor+'"><td>'+_nick+'</td><td>'+arr[c].cortou+'</td><td>'+arr[c].voou+'</td><td>'+arr[c].xepou+'</td></tr>';
    }
    
    $('#players table').html(html);

}

function voltarSelectOnline(){
	
	if(type == 'online'){
		initServers();
		removeEventsSala();
		initSalasLivres();
	}

	
	fechar();
	menuSemPipaNoAlto();
	
}

function removeEventsSala(){

	/*if(salaEvent != undefined){
		socket.off('game');
		socket.off('setMsg');
		socket.off('reload');
		socket.off('addPerso');
		socket.off('removePerso');
		socket.off('updatePlacar');
		socket.off('saiu');
		//socket.off(0);
		socket.off('voou');
		socket.off('venceu');
		socket.off('aparou');
		socket.off(1);
	}*/

	if(socket != undefined){
		socket.off('salas');
		socket.off('game');
	    socket.off('removePerso');
	    socket.off('saiu');
	    socket.off('pipa');
	    socket.off(1);
	    socket.off(2);
	    socket.off('bateuparede');
	    socket.off('voou');
	    socket.off('updatePlacar');
	    socket.off('setMsg');
	    socket.off('reload');
	    socket.off('aparou');
	    socket.off('fatiar');
	    socket.off('venceu');
	}

}