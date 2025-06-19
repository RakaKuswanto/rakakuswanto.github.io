
var typeSelect = "",
comprar = "";

function initMenu(){

	$('#usageAvatar').on(getTap(), function(e){
		playSom('clickPu', 1);
		usageAvatar = !usageAvatar;
		$('#usageAvatar span').html(((usageAvatar) ? getVocabulary('sim') : getVocabulary('nao')));
	});

	$('#menu .left .lang').on(getTap(), function(e){
		playSom('clickPu', 1);
		BD.lang = ($(this).hasClass('pt')) ? 'pt' : 'en';
		updateBD();
		updateLanguage();
	});

	$('.reward').on(getTap(), function(e){
		criarRewardVideoAdMob(true);
	});

	$('#menu .voltar').on(getTap(), function(e){
		
		playSom('clickPu', 1);

		if(type == 'online'){
			voltarSelectOnline();
			socket.emit('desconectar', nomePlayer);
			return;
		}
			
		fechar();
		menuSemPipaNoAlto();
		
	});

	$('#comojogar .ok').on(getTap(), function(e){
		$('#comojogar').removeClass('show twoPlayer');
		$('#touch1, #touch2').removeClass('twoPlayer');
	});

	$('.menu .vento .cima').on(getTap(), function(e){
		setVento(0);
		playSom('clickPu', 1);
	});

	$('.menu .vento .baixo').on(getTap(), function(e){
		setVento(1);
		playSom('clickPu', 1);
	});

	$('.camera').on(getTap(), function(e){
		if($(".cameras").is( ":hidden" )){
			$('.cameras').css('display', 'block');

			$('.cameras a').removeClass('ativo');
			if(cameraTypeFunc == cam1) $('.cameras .cam1').addClass('ativo');
			if(cameraTypeFunc == cam2) $('.cameras .cam2').addClass('ativo');
			if(cameraTypeFunc == cam3) $('.cameras .cam3').addClass('ativo');
			if(cameraTypeFunc == cam4) $('.cameras .cam4').addClass('ativo');

		}else{
			$('.cameras').hide();
		}
		playSom('clickPu', 1);
	});

	$('#topDir .pipas').on(getTap(), function(){
		playSom('clickPu', 1);
		typeSelect = "";//IMPORTANT
		montarPipas();
	});
	/*$('#topDir .comprarPipas').on(getTap(), function(){
		playSom('clickPu', 1);
		montarPipas(true);
	});
	$('#topDir .comprarLinhas').on(getTap(), function(){
		playSom('clickPu', 1);
		montarLinhas(true);
	});*/
	//$('.linhas').on(getTap(), montarLinhas);

	$('#pular').on(getTouchStart(), function(){
		//playSom('clickPu', 1);
		paiPipaPrincipal.pular();
	});
	
	

	

	//Camêras
	$('.cameras .auto').on(getTap(), function(){ playSom('clickPu', 1); controls.enabled = true; setCameraAuto(); cameraDefault = undefined; $('.cameras').hide(); updateBD(); });
	$('.cameras .cam1').on(getTap(), function(){ setCam(cam1); paiPipaPrincipal.avatar.material.map.offset.y = 1 - ((1/8) * 1);});
	$('.cameras .cam2').on(getTap(), function(){ setCam(cam2); paiPipaPrincipal.avatar.material.map.offset.y = 1 - ((1/8) * 1);});
	$('.cameras .cam3').on(getTap(), function(){ setCam(cam3); paiPipaPrincipal.avatar.material.map.offset.y = 1 - ((1/8) * 1);});
	$('.cameras .cam4').on(getTap(), function(){ setCam(cam4); paiPipaPrincipal.avatar.material.map.offset.y = 1 - ((5/8) * 1);});

	/*$('.estancar').on(getTap(), function(){

		paiPipaPrincipal.paiPipa.setMorreu({
			x:paiPipaPrincipal.paiPipa.line.geometry.vertices[4].x,
			y:paiPipaPrincipal.paiPipa.line.geometry.vertices[4].y, 
			z:paiPipaPrincipal.paiPipa.line.geometry.vertices[4].z
		}, 3);

	});*/
	
	$('.mais1').on(getTap(), function(){
		playSom('clickPu', 1);
		//if(persos.length < allPersos.length || !usageAvatar) 
		addPerso(persos.length);
		setMsg(persos.length + ' BOTS IN GAME', 800);
	});
	$('.menos1').on(getTap(), function(){
		playSom('clickPu', 1);
		if(persos.length > 1) persos[persos.length-1].removePerso();
		setMsg(persos.length + ' BOTS IN GAME', 800);
	});

	$('#select .festival').on(getTap(), function(){
		playSom('clickPu', 1);
		type = 'festival';
		//$('#console').html('LOADING...');
		//timeTeste = new Date().getTime();
		//setTimeout(init3D, 100);
		resize();//force fullscreen
		addPopSelect();
	});

	$('#select .singlePlayer').on(getTap(), function(){
		playSom('clickPu', 1);
		type = 'twoPlayer';
		singlePlayer = true;
		//$('#console').html('LOADING...');
		//timeTeste = new Date().getTime();
		//setTimeout(init3D, 100);
		resize();//force fullscreen
		addPopSelect();
	});

	$('#select .twoPlayer').on(getTap(), function(){
		playSom('clickPu', 1);
		type = 'twoPlayer';
		$('#console').html('LOADING...');
		singlePlayer = false;
		//timeTeste = new Date().getTime();
		resize();//force fullscreen
		setTimeout(init3D, 100);
	});

	$('#select .online').on(getTap(), function(){

		playSom('clickPu', 1);

		type = 'online';

		if(!verificOnline()) return;

		//TIME CLICK
		if(timeClickOnline != undefined){
			if( (new Date().getTime() - timeClickOnline) < 400) return;
		}
		timeClickOnline = new Date().getTime();

		resize();//force fullscreen
		addPopSelect();
		//initServers();


	});

	//CONFIG

	$('#menu .btnConfig').on(getTap(), function(){
		playSom('clickPu', 1);
		$('#config').css('display', 'block');
		if(type != undefined){
			stats = new Stats();
			$('#config nav .bx').append( stats.domElement );
			$('#usageAvatar').hide();
		}else{
			$('#usageAvatar').show();

			$('#ytplayer').remove();
			//$('#config nav .bx').append('<iframe id="ytplayer" type="text/html" width="100%" height="200" src="http://www.youtube.com/embed/7ttSp1R7zxI?autoplay=2" frameborder="0"/></iframe>');
		}
	});

	$('#config .fechar').on(getTap(), function(){
		
		$('#stats').remove();
		if(stats != undefined){
			stats.end();
			$('#stats').remove();
			stats = undefined;
		}
		playSom('clickPu', 1);
		$('#config').hide();
	});
	$('#config .mais').on(getTap(), function(){
		playSom('clickPu', 1);
		BD.pixelRatio += 0.025;
		if(BD.pixelRatio > window.devicePixelRatio) BD.pixelRatio = window.devicePixelRatio;
		if(type != undefined) renderer.setPixelRatio( BD.pixelRatio );
		updateBD();
		
	});

	$('#config .menos').on(getTap(), function(){
		playSom('clickPu', 1);
		if(BD.pixelRatio > 0.120){
			BD.pixelRatio -= 0.025;
			if(type != undefined) renderer.setPixelRatio( BD.pixelRatio );
			updateBD();
		}
	});


	// ======== SOM
	$('.icoSom')
	.on(getTap(), function(e){
		if(BD.som){
			$(this).find('figure').addClass('not');
			BD.som = false;
			stopSom('intro');
			playSom('clickPu', 1);
		}else{
			$(this).find('figure').removeClass('not');
			BD.som = true;
			playSom('click', 1);
			if(BD.somIntro && type == undefined) playSom('intro', 1);
		}
		updateBD();
	});

	$('.icoSom2')
	.on(getTap(), function(e){
		if(BD.somIntro){
			$(this).find('figure').addClass('not');
			playSom('clickPu', 1);
			BD.somIntro = false;
			stopSom('intro');
		}else{
			$(this).find('figure').removeClass('not');
			BD.somIntro = true;
			playSom('click', 1);
			if(BD.som && type == undefined) playSom('intro', 1);
		}
		updateBD();
	});

	$('.icoSom3')
	.on(getTap(), function(e){
		if(BD.somGrito){
			$(this).find('figure').addClass('not');
			playSom('clickPu', 1);
			BD.somGrito = false;
		}else{
			$(this).find('figure').removeClass('not');
			BD.somGrito = true;
			playSom('click', 1);
		}
		updateBD();
	});

}

//== Pop Select ============================================

function addPopSelect(){

	var htmlCenario = '';

	if(type != 'online'){
		
		htmlCenario = '' +
		'        <h1>Select Scene</h1>' +
        '        <div class="cenario">' +
        '            <a attr-id="favela"><img src="img/cenariofavela.png" /></a>' +
        '            <a attr-id="praia"><img src="img/cenariopraia.png" /></a>' +
        '        </div>' +
        '        <div class="clear"></div>';

    }



	var htmlPop = '' +
	 	'<div id="popSelect">' +
        '    <div class="bx centralizeJS">' +
        '        <a class="fechar"></a>' +
        htmlCenario +
        '        <h1>Select Character</h1>' +
        '        <div class="perso">' +
        '            <a attr-id="0"><img src="img/0tb.png" /></a>' +
        '            <a attr-id="1"><img src="img/1tb.png" /></a>' +
        '            <a attr-id="2"><img src="img/2tb.png" /></a>' +
        '            <a attr-id="3"><img src="img/3tb.png" /></a>' +
        '            <a attr-id="4"><img src="img/4tb.png" /></a>' +
        '            <a attr-id="5"><img src="img/5tb.png" /></a>' +
        '            <a attr-id="6"><img src="img/6tb.png" /></a>' +
        '            <a attr-id="7"><img src="img/7tb.png" /></a>' +
        '        </div>' +
        '        <div class="clear"></div>' +
        '        <a class="play">PLAY</a><div class="clear"></div>' +
        '    </div>' +
        '</div>';
    $('body').append(htmlPop);
    resize();

//anim =========================================================================

    TweenMax.from($('#popSelect'), 0.4, { delay:0, css:{opacity:0}, ease:Cubic.easeOut });
    TweenMax.from($('#popSelect .bx'), 0.4, { delay:0, css:{marginTop:'+=200px'}, ease:Cubic.easeOut });

//==============================================================================
	
	initPopSelect();
		
	$('#popSelect .cenario a').on(getTap(), function(){
		playSom('clickPu', 1);
		$('#popSelect .cenario a').removeClass('ativo');
		$(this).addClass('ativo');
	});
	$('#popSelect .perso a').on(getTap(), function(){
		if($(this).attr('attr-id') != ""){
			playSom('clickPu', 1);
			$('#popSelect .perso a').removeClass('ativo');
			$(this).addClass('ativo');
		}
	});
	$('#popSelect .fechar').on(getTap(), function(){
		playSom('clickPu', 1);
		closePopSelect();
	});

	$('#popSelect .play').on(getTap(), function(){

		playSom('clickPu', 1);

		cenarioSlc = $('#popSelect .cenario a.ativo').attr('attr-id');
		spriteSlc = $('#popSelect .perso a.ativo').attr('attr-id');
		if(type != 'online') $('#console').html('LOADING...');
		//$('main').hide();
		closePopSelect();
		if(type == 'online'){
			initServers();
		}else{
			setTimeout(init3D, 100);
		}
		
	});

}

//==========================================================	

function initPopSelect(){
	$('#popSelect .cenario a').removeClass('ativo').eq(parseInt($('#popSelect .cenario a').length*Math.random())).addClass('ativo');
	//$('#popSelect .perso a').removeClass('ativo').eq(parseInt($('#popSelect .perso a').length*Math.random())).addClass('ativo');
	$('#popSelect .perso a').removeClass('ativo').eq(parseInt($('#popSelect .perso a').length*Math.random())).addClass('ativo');
}

function closePopSelect(){
	TweenMax.to($('#popSelect'), 0.4, { delay:0, css:{opacity:0}, ease:Cubic.easeOut });
	TweenMax.to($('#popSelect .bx'), 0.4, { css:{marginTop:'+=200px'}, ease:Cubic.easeOut, onComplete:function(){
		$('#popSelect').remove();	
	} });
}

function setCam(func){
	playSom('clickPu', 1); 
	controls.enabled = false;
	cameraTypeFunc = func;
	cameraDefault = func;
	$('.cameras').hide();
	setStatusVisiblePerso();
	updateBD();
}

function verifAntesPosEmpinar(){
	if(type == 'festival' || type == 'online'){
		var pode = paiPipaPrincipal.verifPosEmpinar({ x:paiPipaPrincipal.perso.position.x, y:paiPipaPrincipal.perso.position.y, z:paiPipaPrincipal.perso.position.z }, true)
		//console.log('pode:',pode)
		if(pode == 'limite extremos'){
			setMsg(getVocabulary('msgDistante'), 5000);
			return false;
		}else if(!pode){
			//setAlert('NÃO PODE EMPINAR, PRÓXIMO DEMAIS AO AMIGO!');
			setMsg(getVocabulary('msgDistanceAmg'), 5000);
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}
}

function montarPipas(_comprar){

	comprar = _comprar;
	
	if(comprar == undefined) comprar = false;

	//verifica se está proximo de algum perso
	if(!comprar){
		if(!verifAntesPosEmpinar()) return;
	}

	$('main #msgCenter').remove();

	var _type = ((type == 'online') ? 'festival' : type);//ajusta p/ não refazer menu

	viewBanner();

	var htmlIf = (type == "twoPlayer") ? '' : '<a class="bt if">I</a>',
	html = '';
	for(var c = 0;c < arrPipas.length;c++){

		var ative = 'on';

		//if(BD.pipas[c] == undefined) BD.pipas[c] = 0;//resolve BUG BD undefined

		//if(BD.pipas[c] == 0) ative = 'off';
		//if(BD.pipas[c] > 0/* || _type == 'festival'*/){
		//if(comprar || BD.pipas[c] > 0 || BD.pipas[c] == -1){

			var htmlNome = '';
			//if(comprar) htmlNome += '$' + convertDinheiro(arrPipas[c].preco) + ' ' + arrPipas[c].nome;
			//if(!comprar && _type == 'festival' || (_type == 'twoPlayer' && singlePlayer)) htmlNome += arrPipas[c].nome;
			if(_type == 'festival' || (_type == 'twoPlayer' && singlePlayer)) htmlNome = '<div class="num">' + arrPipas[c].nome + '</div>';

			//var htmlComprar = '  <a class="bt cp">'+getVocabulary('comprar')+'</a><a class="bt vd">'+getVocabulary('vender')+'</a>';
			//if(!comprar) htmlComprar = '';

			//var htmlNum = '';
			//if((_type == 'festival' || singlePlayer) &&  (BD.pipas[c] > 0 || comprar)) htmlNum = '  <div class="num2">' + BD.pipas[c] + '</div>';
			//if( !(_type == 'twoPlayer' && !singlePlayer) && BD.pipas[c] != -1 ) htmlNum = '  <div class="num2">' + BD.pipas[c] + '</div>'

			//if(comprar && BD.pipas[c] < 0){

			//}else{

				if(typeSelect == '' || arrPipas[c].type == typeSelect){

					html += '<div class="it ' + ative + '" attr-id="' + c + '">' +
							htmlNome + 
							'  <img src="img/pipas/' + arrPipas[c].img + '.png" width="100%">' +
							//htmlNum + htmlComprar + 
							htmlIf +
							'</div>';
				}
			//}
		//}
	}

			

	$('#pipas').remove();

//========== Filtro Type Pipa
	var tot = typePipas.length,
	htmlTypePipas = '<div id="type">';
	for(var c = 0;c < typePipas.length;c++){
		htmlTypePipas += '<a>' + typePipas[c] + '</a>';
	}
	htmlTypePipas += '</div>';



	if(_type == 'festival' || singlePlayer || _type == undefined){
		$('body').append('<div id="pipas"><a class="fechar"></a>' + htmlTypePipas +
        	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
        	html + '<div class="clear"></div><br><br>' + 
        	'</div></div></div>' +
        	'</div>');
	}else if(_type == 'twoPlayer'){
        $('body').append('<div id="pipas" class="player1">' +
        	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
        	'<h2>PLAYER 1 - '+getVocabulary('select3pipas')+':</h2>' + 
        	html + '<div class="clear"></div><br><br>' + 
        	'</div></div></div>' +
        	'</div>');

        $('body').append('<div id="pipas" class="player2"><a class="fechar"></a>' +
        	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
        	'<h2>PLAYER 2 - '+getVocabulary('select3pipas')+':</h2>' + 
        	html + '<div class="clear"></div><br><br>' + 
        	'</div></div></div>' +
        	'</div>');
    }

    //if(!comprar){

    	$('#pipas').removeClass('comprar');
    	
    	$('#pipas .it .if').on(getTap(), montarInfo);

	    $('#pipas .it img').on(getTap(), function(e){
	    	
	    	playSom('clickPu', 1);

	    	if(singlePlayer){
	    		infoTwoPlayer.player1.pipas.push($(this).parent().attr('attr-id'));
	    		$('#pipas').remove();
	    		montarLinhas(false);
	    	}else if(type == 'twoPlayer'){

	    		if(!$(this).parent().hasClass('selected')){
	    			//$(this).parent().removeClass('selected');

	    			var player = $(this).parent().parent().parent().parent().parent().attr('class');
	    		
	    			if($(this).parent().parent().find('.selected').length < 3) $(this).parent().addClass('selected');

	    			infoTwoPlayer[player].pipas.push($(this).parent().attr('attr-id'));
		    		//console.log('>>>', infoTwoPlayer[player]);

		    		if($(this).parent().parent().find('.selected').length == 3) montarLinhas(false, player);

	    		}
	    		
	    	}else{

		    	if(!$(this).parent().hasClass( "off" )){

		    		//console.log('PODE EMPINAR?');

		    		//verifica se está proximo de algum perso
					if(type == 'festival' && !paiPipaPrincipal.verifPosEmpinar({ x:paiPipaPrincipal.perso.position.x, y:paiPipaPrincipal.perso.position.y, z:paiPipaPrincipal.perso.position.z }, true)){
						setMsg(getVocabulary('msgDistanceAmg'), 5000);
						menuSemPipaNoAlto();
					}else{

						
						var idc = $(this).parent().attr('attr-id')
						if(arrPipas[idc].type == 'Balão'){
							$('#pipas').remove();
							setBalaoJapones();
						}else{
							paiPipaPrincipal.idPipa = $(this).parent().attr('attr-id');
							montarLinhas(false);	
						}
						
					}
					
				}

			}
			
		});

	/*}else{

		$('#pipas').addClass('comprar');

		$('#pipas .it img').on(getTap(), montarInfo);
		

		$('#pipas .it .cp').on(getTap(), function(e){
			playSom('clickPu', 1);
			var idc = $(this).parent().attr('attr-id');

			if((BD.dinheiro - arrPipas[idc].preco) < 0  ){
				setMsg(getVocabulary('msgSemDinheiro'), 2000);
			}else{

				BD.dinheiro -= arrPipas[idc].preco;
				BD.pipas[idc]++;
				updateBD();
				
				$(this).parent().find('.num2').html(BD.pipas[idc]);
				$(this).parent().removeClass('off');
				
			}
			
		});

		$('#pipas .it .vd').on(getTap(), function(e){
			playSom('clickPu', 1);
			var idc = $(this).parent().attr('attr-id');

			if(BD.pipas[idc] > 0){

				BD.dinheiro += arrPipas[idc].preco;
				BD.pipas[idc]--;
				updateBD();

				$(this).parent().find('.num2').html(BD.pipas[idc]);
				$(this).parent().removeClass('off');
				if(BD.pipas[idc] <= 0) $(this).parent().addClass('off');
				
			}else{
				//alert('sem item para vender: '+BD.pipas[idc]);
			}
			
		});

	}*/

	$('#pipas #type a').on(getTap(), function(e){
		playSom('clickPu', 1);
		typeSelect = $(this).html();
		if(typeSelect == 'All') typeSelect = '';
		montarPipas(comprar);///comprar vai dinamica
    });

	$('#pipas .fechar').on(getTap(), function(e){

		playSom('clickPu', 1);

		typeSelect = "";//IMPORTANT
		singlePlayer = false;

		if(_type == undefined){
			menuSemPipaNoAlto();
		}else if(_type == 'festival'){

			if(paiPipaPrincipal.paiPipa != undefined){
				menuPipaNoAlto();
			}else{
				menuSemPipaNoAlto();
			}

		}else{
			menuSemPipaNoAlto();
			fechar();
		}

		closeBanner();

	});
	

	addSwipperPipas();
	initBannerPipas();
	
	embaralharItens();

}

function embaralharItens(){
	//shuffe - sorteando ordem das pipas
	if(type != 'twoPlayer' && typeSelect == ""){
		var its = $("#pipas .it");
		for(var i = 0; i < its.length; i++){
		    var target = Math.floor(Math.random() * its.length -1) + 1,
		    target2 = Math.floor(Math.random() * its.length -1) +1;
		    its.eq(target).before(its.eq(target2));
		}
	}
	$("#pipas #type a:contains('"+((typeSelect == '') ? 'All' : typeSelect)+"')" ).addClass('ativo');//seleciona item de menu ativo
}

function initBannerPipas(){
	if($('#ads').length == 1) $('#pipas .swiper-slide').append('<div id="bannerPipas"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-4736032489372828" data-ad-slot="7986008910"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>');
}

function montarLinhas(comprar, player){

	viewBanner();

	var _type = ((type == 'online') ? 'festival' : type);//ajusta p/ não refazer menu

	playSom('clickPu', 1);

	$('main #msgCenter').remove();

	var html = '';
	for(var c = 0;c < arrLinhas.length;c++){

		var ative = ' on',
		selected = '';

		//if(BD.linhas[c] == undefined) BD.linhas[c] = 0;//resolve BUG BD undefined

		//if(BD.linhas[c] <= 0 && BD.linhas[c] != -1) ative = ' off';

		//if(BD.linhas[c] > 0 || comprar || BD.linhas[c] == -1){

			
			//if(comprar && BD.linhas[c] == -1){

			//}else{

				//var htmlComprar = '  <a class="bt cp">'+getVocabulary('comprar')+'</a><a class="bt vd">'+getVocabulary('vender')+'</a>';
				//if(!comprar) htmlComprar = '';

				//var htmlNum = '  <div class="num2">' + BD.linhas[c] + '</div>';
				//if(!comprar) htmlNum = '';


				var htmlNome = '';
				if(comprar) htmlNome += '$' + convertDinheiro(arrLinhas[c].preco) + ' ' + arrLinhas[c].nom + '<br>Linha ' + arrLinhas[c].tipo;
				if(!comprar && _type == 'festival' || (_type == 'twoPlayer' && singlePlayer)) htmlNome += arrLinhas[c].nom + '<br>Linha ' + arrLinhas[c].tipo;



				var bgColor = '';
				if(arrLinhas[c].img == 'carretelpeq') bgColor = ' style="background:' + arrLinhas[c].cor + '"';

				html += '<div class="it' + ative + '" attr-id="' + c + '">' +
						'  <div class="num">' + htmlNome + '</div>' +
						'  <div class="_linha"><div class="' + arrLinhas[c].img + '"' + bgColor + '></div><img src="img/linhas/' + arrLinhas[c].img + '.png"></div>' +
						//htmlNum + htmlComprar + 
						'</div>';

			//}

		//}
	}


	if(_type == 'festival' || singlePlayer || _type == undefined){
		removeSwipperPipas();
		$('#pipas').remove();
	}else{
		removeSwipperPipas();
		$('#pipas.'+player).remove();
	}
    
    if(_type == 'festival' || singlePlayer || _type == undefined){
	    $('body').append('<div id="pipas" class="linhas"><a class="fechar"></a>' +
	    	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
	    	html + '<div class="clear"></div><br><br>' + 
	    	'</div></div></div>' +
	    	'</div>');
	}else if(_type == 'twoPlayer'){
		
		if(player == 'player1'){
			$('body').append('<div id="pipas" class="linhas player1">' +
		    	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
		    	'<h2>PLAYER 1 - '+getVocabulary('selectLine')+':</h2>' + 
		    	html + '<div class="clear"></div><br><br>' + 
		    	'</div></div></div>' +
		    '</div>');
		}

		if(player == 'player2'){
		    $('body').append('<div id="pipas" class="linhas player2"><a class="fechar"></a>' +
		    	'<div class="swiper-container"><div class="swiper-wrapper"><div class="swiper-slide">' +
		    	'<h2>PLAYER 2 - '+getVocabulary('selectLine')+':</h2>' + 
		    	html + '<div class="clear"></div><br><br>' + 
		    	'</div></div></div>' +
		    '</div>');
		}

	}

	$('#pipas.linhas .fechar').on(getTap(), function(e){
		playSom('clickPu', 1);

		typeSelect = "";//IMPORTANT

		if(_type == undefined){
			menuSemPipaNoAlto();
		}else if(_type == 'festival'){

			if(paiPipaPrincipal.paiPipa != undefined){
				menuPipaNoAlto();
			}else{
				menuSemPipaNoAlto();
			}

		}else{
			menuSemPipaNoAlto();
			fechar();
		}

		closeBanner();

	});

	//if(!comprar){
		$('#pipas.linhas .it img').on(getTap(), function(e){
			
			playSom('clickPu', 1);

			if((type == 'festival' || type == 'online') && paiPipaPrincipal.gravity != 0) return;

			if(!verifAntesPosEmpinar()) return;

			var idc = $(this).parent().parent().attr('attr-id');
			//if(!$(this).parent().hasClass( "off" )){

			if(singlePlayer){
				infoTwoPlayer.player1.linha = idc;
				persos[0].initPipa();
				persos[1].initPipa();
				menuPipaNoAlto();
				closeBanner();
				removeSwipperPipas();
			}else if(_type == 'festival'){	
				//if(BD.linhas[idc] > 0 || BD.linhas[idc] == -1){
					removeSwipperPipas();
					paiPipaPrincipal.linha = idc;
					paiPipaPrincipal.initPipa(paiPipaPrincipal.idPipa);
					menuPipaNoAlto();
					closeBanner();
				//}
			}else{
				
				var player = $(this).parent().parent().parent().parent().parent().parent().attr('class');
				player = player.toString().substr(-7);

				infoTwoPlayer[player].linha = idc;


				$('#pipas.'+player+' .swiper-slide').html('');

				if(player == 'player1'){
					persos[0].initPipa();
				}else{
					persos[1].initPipa();
				}

				if(infoTwoPlayer.player1.linha != undefined && infoTwoPlayer.player2.linha != undefined){
					menuPipaNoAlto();
					$('#placar').removeClass('hide');
					closeBanner();
					$('#pipas.linhas').remove();
				}

	    		
			}
		});
	
	/*}else{

		$('#pipas.linhas .it .cp').on(getTap(), function(e){
			playSom('clickPu', 1);
			var idc = $(this).parent().attr('attr-id');
			if((BD.dinheiro - arrLinhas[idc].preco) < 0  ){
				setMsg('Sem dinheiro suficiente', 2000);
			}else{
				BD.dinheiro -= arrLinhas[idc].preco;
				BD.linhas[idc]+=1;
				updateBD();
				$(this).parent().find('.num2').html(BD.linhas[idc]);
				$(this).parent().removeClass('off');
			}
		});

		$('#pipas.linhas .it .vd').on(getTap(), function(e){
			playSom('clickPu', 1);
			var idc = $(this).parent().attr('attr-id');
			
			if(BD.linhas[idc] > 0){
				BD.dinheiro += arrLinhas[idc].preco;
				BD.linhas[idc]-=1;
				updateBD();
				$(this).parent().find('.num2').html(BD.linhas[idc]);
				$(this).parent().removeClass('off');
				if(BD.linhas[idc] <= 0) $(this).parent().addClass('off');
			}else{
				//alert('sem item para vender: '+BD.linhas[idc]);
			}
			
		});

	}*/

	addSwipperPipas();
	initBannerPipas();

	embaralharItens();

}

function viewBanner(){
	//if(startPhonegap) Appodeal.show(Appodeal.BANNER);
	//$('#banner').show();

	criarBannerAdMob(true);

}

function closeBanner(){
	//if(startPhonegap) Appodeal.hide(Appodeal.BANNER);	
	//$('#banner').hide();

	removeBannerAdMob();

}

function montarInfo(){

	$('#pipas').hide();

	var id = $(this).parent().attr('attr-id'),
	arr = arrPipas[id], 
	//empinar = (((BD.pipas[id] > 0 || BD.pipas[id] == -1) && type != undefined) ? '<a class="empinar">EMPINAR</a>' : '');
	empinar = '<a class="empinar">EMPINAR</a>';
	
	var html = '<div id="info">' +
		        '    <nav>' +
		        '        <a class="fechar"></a>' +
		        '        <aside>' +
		        '            <div class="it left">' +
		        '                <img src="img/pipas/' + arr.img + '.png" class="frente" />' +
		        //'                <img src="img/pipas/' + arr.img + 'v.png" class="verso off" />' +
		        //'                <h3>Você tem ' + BD.pipas[id] + ' pipas</h3>' + 
		        '            </div>' +
		        '            <div class="it right">' +
		        '                <h2>' + arr.nome + '</h2>' + arr.desc +
		        '                  <br>' + empinar + 
		        //'                <br><a class="comprar">COMPRAR</a><a class="vender">VENDER</a>' + empinar + '<a class="frentVers">VERSO</a>' +
		        //'                <br>' + empinar + '<a class="frentVers">VERSO</a>' +
		        '            </div>' +
		        '            <div class="clear"></div>' +
		        '        </aside>' +
		        '    </nav>' +
		        '</div>';

	$('body').append(html);
	$('#info .fechar').on(getTap(), function(){
		$('#info').remove();
		$('#pipas').show();
		swiper.reInit();
	});

	$('#info nav .it .empinar').on(getTap(), function(){

		$('#info').remove();
		$('#pipas').show();

		paiPipaPrincipal.idPipa = id;
		montarLinhas(false);
		
	});

	$('#info nav .it .frentVers').on(getTap(), function(){
		
		if($(this).html() == 'VERSO'){
			$(this).html('FRENTE');
			$('#info .frente').addClass('off');
			$('#info .verso').removeClass('off')
		}else{
			$(this).html('VERSO');
			$('#info .frente').removeClass('off');
			$('#info .verso').addClass('off');
		}

	});
	

}

function addSwipperPipas(){
	removeSwipperPipas();
	if(type != 'twoPlayer' || singlePlayer){
		swiper = new Swiper('#pipas .swiper-container', {
	        scrollContainer:true,
	        mousewheelControl:true,
	        mode:'vertical',
	        grabCursor: true
	    });
	}else{
	    swiperPlayer1 = new Swiper('#pipas.player1 .swiper-container', {
	        scrollContainer:true,
	        mousewheelControl:true,
	        mode:'vertical',
	        grabCursor: true
	    });
	    swiperPlayer2 = new Swiper('#pipas.player2 .swiper-container', {
	        scrollContainer:true,
	        mousewheelControl:true,
	        mode:'vertical',
	        grabCursor: true
	    });
	}
}
function removeSwipperPipas(){
	if(swiper != undefined){
		swiper.destroy();
        swiper = undefined;
	}
	if(swiperPlayer1 != undefined){
		swiperPlayer1.destroy();
        swiperPlayer1 = undefined;
	}
	if(swiperPlayer2 != undefined){
		swiperPlayer2.destroy();
        swiperPlayer2 = undefined;
	}
}

function setStatusVisiblePerso(){
	if(type == "festival" || type == "online" ){
		if(paiPipaPrincipal != undefined) {
			if(cameraTypeFunc == cam2){
				paiPipaPrincipal.perso.visible = false;
			}else{
				paiPipaPrincipal.perso.visible = true;
			}
		}
	}
}

function menuPipaNoAlto(){
	removeSwipperPipas();
	$('#pipas').remove();
	$('#menu, .estancar').css('display', 'block');

	$('.bots').hide();
	
	//$('#joystick').hide();
	removeJoystick();

	if(type == 'festival' || type == 'online') $('.camera').css('display', 'block');
	
	$('#topDir .pipas, #pular, #topDir .comprarPipas, #topDir .comprarLinhas').hide();

	$('#pular').hide();

	updatePlacarFestival();

	setStatusVisiblePerso();

}

function menuSemPipaNoAlto(){
	removeSwipperPipas();
	$('#pipas').remove();
	$('.estancar, .camera, .cameras').hide();

	if(type == 'festival') $('.bots').show();
	
	//$('#joystick').css('display', 'block');
	createJoystick();
	
	$('#topDir .pipas, #topDir .comprarPipas, #topDir .comprarLinhas').css('display', 'block');
	if(type == undefined) $('#topDir .pipas, #pular').hide();

	//updateDinheiro();
	$('.dinheiro').html('');

	if(type == "festival" || type =="online" ){
		if(paiPipaPrincipal != undefined) paiPipaPrincipal.perso.visible = true;
	}

}