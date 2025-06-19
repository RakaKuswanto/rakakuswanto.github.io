
function Perso(){
	
	this.cont = 0;	
	this.idc = undefined;//indice array perso
	this.perso = undefined;
	this.paiPipa = undefined;
	this.pipaPrincipal = false;
	this.avatar = undefined;
	this.mixer = undefined;
	this.animations = undefined;
	this.keyframe = 0;
	this.correndo = false;
	this.skeleton = undefined;
	this.txt = undefined;
	this.timeout = undefined;
	this.value = undefined;
	this.gravity = 0;
	this.direction = 0;
	this.sprite = "";
	
	this.vezesPular = 0;
	this.maxVezesPular = 2;

	this.directPersoAndar = 0;

	this.pressLeft = false; this.pressRight = false; this.pressUp = false; this.pressDown = false; this.pressSpace = false;

	this.contPipaOnline = 0;//apenas p/ o online

	this.indicadorMaoDireita = undefined;
	this.dedoMinimoMaoDireita = undefined;
	this.dedaoMaoEsquerda = undefined;
	//this.dedinhoMaoEsquerda = undefined;

	this.autoAndar = undefined;//{ x:0,  z:0 };//y não precisa é fixo

	var instance = this;
	
	this.init = function(obj){

		instance.perso = new THREE.Object3D();//THREE.Cache.get('quadrado').clone();

		if(usageAvatar){

			var loader = new THREE.ColladaLoader();

			if(type != 'online') instance.idc = persos.length-1;
			if(instance.idc > 3) instance.idc = parseInt(Math.random() * 3) + 1;//não pega o primeiro todo branco

			var collada = loader.parse( getKid(instance.idc + 1), 'models/kid/' );//PEGANDO XML memory - colocar path ref imgs
			collada.scene.children.splice(0, 1);//deletando iluminação
			

			instance.avatar = collada.scene;
			instance.animations = collada.animations;

			for (var c = 0; c < instance.avatar.children.length; c++) {
				instance.avatar.children[c].frustumCulled = false;
			}

			instance.mixer = new THREE.AnimationMixer( instance.avatar );
			instance.mixer.clipAction( instance.animations[0] ).play();

			instance.avatar.scale.set(0.2, 0.2, 0.2);
			instance.avatar.rotation.x = de2ra(-90);
			instance.avatar.rotation.z = de2ra(180);

			instance.skeleton = instance.avatar.children[0].skeleton;//instance.skeleton = instance.avatar.skeleton;

			instance.perso.add( instance.avatar );

			//Skeleton
			instance.indicadorMaoDireita = instance.skeleton.bones[75];
			instance.dedoMinimoMaoDireita = instance.skeleton.bones[69];
			instance.dedaoMaoEsquerda = instance.skeleton.bones[31];
			//instance.dedinhoMaoEsquerda = instance.skeleton.bones[31];

			instance.gotoAndPlay(70);//parado

			instance.ajustBugTexturePerso();
			setTimeout(instance.ajustBugTexturePerso, 1000);
			setTimeout(instance.ajustBugTexturePerso, 3000);

		}else{

			if(type != 'online') instance.idc = persos.length-1;
			if(instance.idc > 7) instance.idc = parseInt(Math.random() * 8);//instance.idc -= 8;//recomeça as cores


			/*var loader = new THREE.TextureLoader();
			var texture = loader.load('img/sprite_teste.png', function ( texture ) {

			    //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			    texture.offset.set( -0.6, 0 );

			    var c = 0;
			    setInterval(function(){
			    	c-=0.01;
			    	texture.offset.set( -0.5-c, 0 );
			    }, 50)

			    //texture.repeat.set( 2, 2 );

			} );*/

			if(type == 'online'){

			}else if(type != 'online' && instance.pipaPrincipal){
				instance.sprite = spriteSlc;
			}else{
				instance.sprite = parseInt((Math.random() * 8));
			}

			if(instance.sprite == undefined){
				console.log('ERRO: instance.sprite: ', instance.sprite);
				instance.sprite = 0;
			}

			instance.avatar = new THREE.Mesh( 
				new THREE.PlaneGeometry( 30, 46, 1, 1 ), 
				//new THREE.MeshBasicMaterial({map:texture, transparent:true, depthWrite:false, side:THREE.DoubleSide})
				new THREE.MeshBasicMaterial({map:getTextureLoader('img/'+instance.sprite+'.png'), transparent:true, depthWrite:false, side:THREE.DoubleSide})
				//new THREE.MeshBasicMaterial({map:getTextureLoader('img/p'+instance.idc+'.png'), transparent:true, depthWrite:false, side:THREE.DoubleSide})
				//new THREE.MeshBasicMaterial({map:getTextureLoader('img/pass'+parseInt(Math.random() * 1)+'.png'), transparent:true, depthWrite:false, side:THREE.DoubleSide})
				//new THREE.MeshBasicMaterial({map:getTextureLoader('img/perso'+parseInt(Math.random() * 10)+'.png'), transparent:true, depthWrite:false, side:THREE.DoubleSide})
				//new THREE.MeshBasicMaterial({map:getTextureLoader('img/perso.png'), transparent:true, side:THREE.DoubleSide})
				//new THREE.MeshBasicMaterial({map:getTextureLoader('img/mineteste.png'), transparent:true, side:THREE.DoubleSide})
			);



			//instance.avatar.material.map.wrapS = instance.avatar.material.map.wrapT = THREE.RepeatWrapping; 
			//instance.avatar.material.map.repeat.set( 3, 3 );

			instance.avatar.material.map.repeat.set(1/6, 1/8);
			//instance.avatar.material.map.offset.x = (1/8) * 0;

			


			
			//instance.avatar.rotation.set(de2ra(-90), de2ra(-180), de2ra(180));
			//instance.avatar.renderOrder = 1;
			//a.frustumCulled = false;//evita pipa sumir
			//instance.avatar.frustumCulled = false;//evita pipa sumir

			//CUBO
			/*var cubo = new THREE.CubeGeometry( 20, 20, 20, 1, 1, 1 );
			var mat = new THREE.MeshBasicMaterial( {color: 0xFF0000, side: THREE.DoubleSide} );
			var a = addMesh( cubo, 1, 0, 10, 0, 0,0,0, mat );
			instance.perso.add( a );*/
			

			instance.avatar.position.set(0, 23, 0);
			//instance.avatar.position.set(0, 23, 0);
			//instance.avatar.position.set(0, -123, 0);
			instance.perso.add( instance.avatar );
			instance.avatar.renderOrder = 4;
			//instance.perso.renderOrder = 4;

			//instance.avatar.frustumCulled = false;
			//instance.perso.frustumCulled = true;

		}

		scene.add( instance.perso );
			

		

		

		



		//SORT pos perso
		if(type == 'festival'){
			if(instance.pipaPrincipal){
				instance.perso.position.x = 0;
				instance.perso.position.z = 430;
				//instance.perso.position.y = 230;//teste laje
			}else{
				var pos = instance.verifPosEmpinar();
				instance.perso.position.x = pos.x;
				instance.perso.position.y = 2;
				instance.perso.position.z = pos.z;
			}
		}else if(type == 'online'){
			//console.log('obj:',obj);
			instance.perso.position.x = obj.x;
			instance.perso.position.y = obj.y;
			instance.perso.position.z = obj.z;
		}

		
		if(type == 'twoPlayer'){
			if(instance.idc == 0) instance.perso.position.x = -150;
			if(instance.idc == 1) instance.perso.position.x = 150;

			//console.log('ta aqui ', instance.idc)
			instance.perso.position.z = 430;
		}

		if(!instance.pipaPrincipal && type == 'festival') {
			instance.initPipa();
		}

		if(instance.pipaPrincipal) setCameraAutoDirect();
		//console.log('instance.pipaPrincipal:', instance.pipaPrincipal)


		if(type == 'online'){

			/*var loader = new THREE.FontLoader();
			var font = loader.load('font/helvetiker_regular.json', function (font) {*/

				//if(!instance.pipaPrincipal){

					instance.txt = new THREE.Mesh(
						new THREE.TextGeometry(instance.nick, {
						    font:font,
						    size:5,
						    height:0,
						    curveSegments:0
						}),
						new THREE.MeshBasicMaterial({color:instance.getColorTxt()}) 
					);

					instance.txt.geometry.computeBoundingBox();//!important
	    			instance.txt.position.x -= (instance.txt.geometry.boundingBox.max.x - instance.txt.geometry.boundingBox.min.x) / 2;
	    			instance.txt.position.z += 3;
	    			instance.txt.position.y = ((usageAvatar) ? 58 : 45);
	    			instance.txt.renderOrder = 5;

					//scene.add(instance.txt);
					instance.perso.add(instance.txt);

				//}

			//});

		}

		instance.avatar.material.map.offset.y = 1 - ((1/8) * 1);//inicia boneco virado p/ frente
		

		/*if(!instance.pipaPrincipal){
			arrScene.push({ 
		        x1:instance.perso.position.x - 10,
		        x2:instance.perso.position.x + 10,
		        y1:instance.perso.position.y - 10,
		        y2:instance.perso.position.y + 10,
		        z1:instance.perso.position.z - 10,
		        z2:instance.perso.position.z + 10
		    });
		}*/

	}

	this.getColorTxt = function(){
		var cor = 0xFFFFFF;
		switch(instance.idc) {
		    case 0 : cor = 0xebc71e; break;
		    case 1 : cor = 0x128612; break;
		    case 2 : cor = 0xca37ef; break;
		    case 3 : cor = 0x04a6e4; break;
		    case 4 : cor = 0x2525f6; break;
		    case 5 : cor = 0xf29500; break;
		    case 6 : cor = 0xff3939; break;
		    case 7 : cor = 0x79858a; break;

		    case 8 : cor = 0xebc71e; break;
		    case 9 : cor = 0x128612; break;
		    case 10: cor = 0xca37ef; break;
		    case 11: cor = 0x04a6e4; break;
		    case 12: cor = 0x2525f6; break;
		    case 13: cor = 0xf29500; break;
		    case 14: cor = 0xff3939; break;
		    case 15: cor = 0x79858a; break;
		}
		return cor;
	}

	this.ajustBugTexturePerso = function(){
		if(usageAvatar){
			if(scene != undefined && instance.perso != undefined){
				//if(Math.random() < 0.5) instance.avatar.children[0].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/kid/images/0_kid-map01_2.jpg' ) } ).map;
				if(instance.avatar.children[0] != undefined && instance.avatar.children[0].map != undefined) instance.avatar.children[0].material.map.needsUpdate = true;
			}
		}
	}

	this.verifPosEmpinar = function(obj, returnBoolean, cont){

		var pode = true,
		distance = 75;

		if(cont == undefined) cont = 0;

		if(obj == undefined){
			if(cont < 5){
				obj = {x:rand(-550, 550), y:0, z:rand(430, 200)};
			}else{
				obj = {x:rand(-900, 900), y:0, z:rand(-900, 900)};	
			}
			distance = 75;
		}

		if(type == 'online') persos = Object.keys(pipasName);//!IMPORTANT

		if(persos.length > 1){

			var tot2 = persos.length;
			while(tot2--) {


// ######################################## NENHUM XEPEIRO NASCE PRÓXIMO DE ITEM DO CENÁRIO


				if(returnBoolean == undefined){//returnBoolean = true // só ocorre quando pede apenas p/ colocar no alto, e não sortear pos

					var tot5 = arrScene.length;
					while(tot5--){

				    	var quad2 = arrScene[tot5];
				    	var quad1 = { 
						    x1:obj.x - 100, 
						    x2:obj.x + 100, 
						    y1:obj.y - 100, 
						    y2:obj.y + 100, 
						    z1:obj.z - 100, 
						    z2:obj.z + 100
						};
				    	
						if(quad3dColision(quad1, quad2)) {
							//console.log('COLIDIU ITEM CENÁRIO');
							pode = false;//não pode empinar mto próximo
							break;
						}

					}

				}

// -------------------------- ######################################## 				


				var paiPipa = ((type == 'online') ? pipasName[ persos[tot2] ] : persos[tot2]);//!IMPORTANT

				if(paiPipa != instance && paiPipa != undefined){

					if(paiPipa.paiPipa != undefined || paiPipa.pipaPrincipal){

						var vec1 = vec3D.clone().set(obj.x, obj.y, obj.z),
						vec2 = paiPipa.perso.position.clone();

						if( vec1.distanceTo(vec2) < 170 ){
							pode = false;//não pode empinar mto próximo
						    break;
						}

					}	

				}

			}

		}



		////LIMITE EXTREMOS QUADRADO - COMENTADO - 31/05/20
		//if(obj.x < -950 || obj.x > 950 || obj.z > 920 || obj.z < -920){
		if(obj.x < limitecenario.x2 || obj.x > limitecenario.x1 || obj.z > limitecenario.z1 || obj.z < limitecenario.z2){	
			return 'limite extremos';
		}else if(returnBoolean){
			return pode;
		}else{
			if(pode || cont > 10){
				//console.log('FOI', cont);
				return obj;
			}else{
				cont++;	
				//console.log('ERROR SORT NOVAMENTE', cont);
				return instance.verifPosEmpinar(undefined, undefined, cont);//LOOPING
			}
		}


	}



	this.xepar = function(pipa){


		//console.log('xepando pipa:', pipa);

		if(instance.paiPipa != undefined) return;//se tiver com pipa no alto não pode xepar
		
		if(usageAvatar) instance.avatar.rotation.z = de2ra(180);//IMPORTANT


		//var vec = vec3D.clone().set(190, 0, -80)//pipa.pipa.position.clone();
		var vec = pipa.pipa.position.clone();
		vec.y = 0;

		instance.autoAndar = {x:vec.x, z:vec.z};
		
		instance.playPersoCorrer();
		//instance.pressLeft = instance.pressRight = instance.pressUp = instance.pressDown = instance.pressSpace = false;

		instance.perso.lookAt(vec);
		instance.perso.rotation.y += _180graus;



	}

	this.initPipaDelay = function(delay){
		clearTimeout(instance.timeout);
		if(instance.perso != undefined){
			//console.log('4000');
			instance.timeout = setTimeout(instance.initPipa, delay);
		}
	}

	this.initPipa = function(id){


		//console.log(id, instance.linha);

		if(instance.pipaPrincipal && type == 'online'){

			//console.log('Socket Envia - AddPipa');
			//console.log('instance.contPipaOnline: '+ instance.contPipaOnline, instance.name)

			socket.emit('pipa', 
				{	
					i:instance.contPipaOnline,//indice p/ quando pegar pipa Perso.js
					s:'add',
					n:nomePlayer,
					pipa:id,
					linha:instance.linha,
					x:Math.round(instance.perso.position.x),
					y:Math.round(instance.perso.position.y),
					z:Math.round(instance.perso.position.z)
				}
			);

		}
		

		instance.contPipaOnline += 1;
		


		if(instance.paiPipa != undefined || instance.perso == undefined){
			//console.log('Vc já está com Pipa no Alto!');
			return;
			//if(instance.paiPipa != undefined) instance.paiPipa.setMorreu();
			//return;
		}
		

		//verifica Xepa
		if(type == 'festival'){
			
			if(Math.random() < 0.3){////só correr atras de vez em quando random
				var pode = false;
				if(!instance.pipaPrincipal){
					if(pipas.length > 0){
						var tot = pipas.length;
						while(tot--){
							var pipa = pipas[tot];
							if(!pipa.pipaNoAlto) {
								
								//verifico se essa pipa é a mais próxima p/ correr atras
								if(pode){
									var calcA = Math.abs(instance.perso.position.x - pipa.pipa.position.x) + Math.abs(instance.perso.position.z - pipa.pipa.position.z),
									calcB = Math.abs(instance.perso.position.x - pode.pipa.position.x) + Math.abs(instance.perso.position.z - pode.pipa.position.z);
									if(calcA < calcB) pode = pipa;
								}else{
									pode = pipa;	
								}
								//break;
							}
						}
					}
				}

				if(pode && instance.paiPipa == undefined) {
					instance.xepar(pode);
					return;	
				}
			}

			//sort pos empinar caso esteja próximo a outro perso
			if(!instance.pipaPrincipal){
				var pos = instance.verifPosEmpinar({ x:instance.perso.position.x, y:instance.perso.position.y, z:instance.perso.position.z });
				//console.log('###',pos);
				
				if(pos.x != instance.perso.position.x && pos.z != instance.perso.position.z){
				//if(pos.x != instance.perso.position.x && pos.z != instance.perso.position.z){
					if(usageAvatar) instance.avatar.rotation.z = de2ra(180);//IMPORTANT
					var vec = vec3D.clone();
					vec.x = pos.x;
					vec.z = pos.z;
					if(pos == 'limite extremos') vec.x = vec.z = 0;
					instance.autoAndar = {x:vec.x, z:vec.z};
					instance.perso.lookAt(vec);
					instance.perso.rotation.y += _180graus;
					instance.playPersoCorrer();
					return;
				}
				
			}
		
		}

		/*instance.avatar.rotation.x = de2ra(-90);
		instance.avatar.rotation.z = de2ra(180);
		instance.perso.rotation.y = 0;*/
		
		instance.stopPersoCorrer();


		instance.paiPipa = new Pipa();
		instance.paiPipa.perso = instance.perso;
		instance.paiPipa.getPerso = instance;
		if(instance.pipaPrincipal) instance.paiPipa.pipaPrincipal = true;
		instance.paiPipa.contPipaOnline = instance.contPipaOnline;
		instance.paiPipa.id = id;

		if(singlePlayer){

			var player = ((persos[0] == instance) ? 'player1' : 'player2' );

			playSom('vai', 1);

			if(player == 'player1'){
				instance.paiPipa.id = infoTwoPlayer.player1.pipas[0];
				instance.paiPipa.linha = infoTwoPlayer.player1.linha;
			}else{
				instance.paiPipa.id = infoTwoPlayer.player1.cortou;
				instance.paiPipa.linha = undefined;//sortea no pipa.js
			}

			setMsg('LEVEL ' + (infoTwoPlayer.player1.cortou+1) + '<br>'+arrPipas[infoTwoPlayer.player1.cortou].nome);


		}else if(type == 'festival' || type == 'online'){
			
			if(instance.linha == undefined) instance.linha = parseInt(arrLinhas.length * Math.random());
			instance.paiPipa.linha = instance.linha

			//if(type == 'online') instance.paiPipa.linha = instance.linha;
			//if(type == 'festival') instance.paiPipa.linha = parseInt(arrLinhas.length * Math.random());

			if(instance.pipaPrincipal) {
				playSom('vai', 1);
				//if(type == 'festival'){
					if(cameraDefault != undefined) cameraTypeFunc = cameraDefault;
					controls.enabled = ((cameraTypeFunc == setCameraAuto || cameraTypeFunc == undefined) ? true : false);
				//}
			}

		}else if(type == 'twoPlayer'){
			
			var player = ((persos[0] == instance) ? 'player1' : 'player2' );

			if(persos[0].paiPipa != undefined && persos[1].paiPipa != undefined){
				playSom('vai', 1);
			}

			if(player == 'player1'){
				instance.paiPipa.id = infoTwoPlayer.player1.pipas[infoTwoPlayer.player2.cortou];
				instance.paiPipa.linha = parseInt(infoTwoPlayer.player1.linha);
			}else{
				instance.paiPipa.id = infoTwoPlayer.player2.pipas[infoTwoPlayer.player1.cortou];
				instance.paiPipa.linha = parseInt(infoTwoPlayer.player2.linha);
			}

		}

		instance.perso.rotation.set(0,0,0);//IMPORTANT perso sempre virado em direção do vento
		instance.paiPipa.init();
		
		//MSG COMO JOGAR INI PARTIDA
		if(singlePlayer){
			if(!msgComoJogar.singlePlayer){
				msgComoJogar.singlePlayer = true;
				$('#comojogar').addClass('show');
				$('#touch1, #touch2').removeClass('twoPlayer');
			}
		}else if(type == 'festival' || type == 'online') {
			if(instance.pipaPrincipal) {
				if(!msgComoJogar.festival){
					msgComoJogar.festival = true;
					$('#comojogar').addClass('show');
					$('#touch1, #touch2').removeClass('twoPlayer');
				}
			}
		}else if(type == 'twoPlayer') {
			if((persos[0].paiPipa != undefined && persos[1].paiPipa != undefined)) {
				if(!msgComoJogar.twoPlayer){
					msgComoJogar.twoPlayer = true;
					$('#comojogar').addClass('show twoPlayer');
					$('#touch1, #touch2').addClass('twoPlayer');
				}
			}
		}
    	/*if(type == 'festival') {
			if(instance.pipaPrincipal) {
				$('#comojogar').show();
				$('#comojogar nav div').show();	
				$('#comojogar nav aside').hide();
				$('#touch1, #touch2').removeClass('twoPlayer');
			}
		}else if(type == 'twoPlayer'){
			if(singlePlayer || (persos[0].paiPipa != undefined && persos[1].paiPipa != undefined)) {
				$('#comojogar').show();	
				if(singlePlayer) {
					$('#comojogar nav div').show();	
					$('#comojogar nav aside').hide();
					$('#touch1, #touch2').removeClass('twoPlayer');
				}else{
					$('#comojogar nav div').hide();	
					$('#comojogar nav aside').show();
					$('#touch1, #touch2').addClass('twoPlayer');
				}
			}
		}*/


/* ==============================================================
	TESTE DE APARO
============================================================== */
		/*if(instance.pipaPrincipal){
			setTimeout(function(){
				if(persos[0].paiPipa != undefined){
					//somente para teste automático de aparo
					for(var c = 0;c < 5;c++){
						var vertLinhaTot = 9,
						pipa = new Pipa();
						pipa.id = 0;
						pipa.init();
						pipa.setAparou(persos[0].paiPipa, 5, 4 + parseInt(Math.random() * (vertLinhaTot - 4)));
						pipas.push(pipa);
					}
				}else{
					console.log('teste de aparo não funciona sem pipa no alto');
				}
			}, 2000);
		}*/

		if(cameraTypeFunc == cam4){
			instance.avatar.material.map.offset.y = 1 - ((5/8) * 1);//inicia boneco virado p/ trás
		}else{
			instance.avatar.material.map.offset.y = 1 - ((1/8) * 1);//inicia boneco virado p/ frente
		}
		instance.autoAndar == undefined;//Evit BUG do perso não fazer lookAt direção camera
			



	}

	this.perdeuPipa = function(){

		pipas.push(instance.paiPipa);
		instance.paiPipa = undefined;

		instance.perso.rotation.set(0, 0, 0);

		if(type == 'festival'){
			if(instance.pipaPrincipal) {
				//minhaPipaVoada = pipas.length-1;
			}else{
				//setTimeout(instance.initPipa, 4000);
				instance.initPipaDelay(4000);
			}
		}
		
	}

	this.update = function(obj){

		if(instance.paiPipa != undefined) instance.paiPipa.update();
		if(!usageAvatar){
			if(instance.correndo){
				instance.avatar.material.map.offset.x = (1/6) * Math.round(instance.cont);
				instance.cont+=0.08;
				if(instance.cont >= 4) instance.cont = 2;
			}else{
				//instance.avatar.material.map.offset.x = 0;

				//====== PERSO SEMPRE OLHANDO P/ FRENTE
				/*if(!instance.pipaPrincipal && type == 'festival'){//DESATIVADO 28/06
					var c = Math.round(cameraAngle / 51.4);//Math.round(cameraAngle/(360/7));
					//instance.avatar.material.map.offset.y = 1 - (0.125 * (8-directionCamera));//COD CORRETO PROCESSING --> instance.avatar.material.map.offset.y = 1 - ((1/8) * (8-directionCamera));
					instance.avatar.material.map.offset.y = 1 - (0.125 * (c+1));//== 1 - ((1/8) * (c+1));
				}*/

			}
		}


		if(instance.correndo) {
			if(instance.autoAndar != undefined){

				var _x = Math.abs(instance.autoAndar.x - instance.perso.position.x),
				_z = Math.abs(instance.autoAndar.z - instance.perso.position.z);

				if(_x < 15 && _z < 15){
					//console.log('PARAR');
					instance.stopPersoCorrer();
					instance.autoAndar = undefined;
					instance.initPipa();
					return;
				}

				//$('#console').html(_x + ' - ' + _y);//instance.autoAndar.x + ' - ' + instance.autoAndar.z);
			}
		}




		//txt
		/*if(instance.txt != undefined) {
			if(instance.txt != undefined && camera.position != undefined){
				instance.txt.lookAt(camera.position);
				instance.txt.position.x = instance.perso.position.x;
				instance.txt.position.y = instance.perso.position.y + 62;
				instance.txt.position.z = instance.perso.position.z;
			} 
		}*/

		if(usageAvatar){//lookAt
			if(instance.avatar != undefined && instance.paiPipa != undefined){
				if(instance.paiPipa.pipa != undefined) instance.avatar.rotation.z = instance.paiPipa.pipa.rotation.y - _180graus;
				//instance.avatar.rotation.x = -_90graus;
				//instance.avatar.rotation.y = 0;
			}
		}else{


			
				
			
			if(instance.autoAndar == undefined){	
				
				instance.avatar.rotation.z = 0;
				var a = camera.position.clone();
				a.y += instance.perso.position.y;
				if(a.y > 22) a.y = instance.perso.position.y + 22;

				instance.perso.lookAt(a);//NEW

			}

			//if(!instance.correndo) instance.perso.lookAt(camera.position);//DESATIVADO - LOOK AT stopPersoCorrer
			

			//instance.perso.rotation.x = 0;
			/*if(!instance.correndo && !instance.pipaPrincipal){
				var cameraAngle = getCameraAngle(camera.getWorldDirection()) + 180;
				cameraAngle = Math.round(cameraAngle/(360/7));
				console.clear();
				console.log(cameraAngle);
				instance.avatar.material.map.offset.y = 1 - ((1/8) * (cameraAngle+1));
			}*/

			

			//console.log(camera.rotation.x/0.8);


			/*heading = camera.rotation.y;
			radians = heading > 0 ? heading : (2 * Math.PI) + heading;
			degrees = THREE.Math.radToDeg(radians);
			console.log(degrees);*/


		}

		setAutoUpdateMatrix(instance.avatar, false);
		setAutoUpdateMatrix(instance.perso, false);



		if(instance.mixer != undefined) {

			var timeUpdate = 0.01;//0.00002;//0.02;
			instance.keyframe = parseInt(instance.mixer._actions[0].time * 30);

			switch (instance.keyframe) {
			    case 2   : timeUpdate = 0;            break;//instance.gotoAndPlay(1);//parado com pipa no alto
			    case 21  : instance.gotoAndPlay(1);   break;//disbicando parou
			    case 60  : instance.gotoAndPlay(1);   break;//descarregando parou
			    case 72  : timeUpdate = 0;            break;//parado sem pipa no alto
			    case 89  : instance.gotoAndPlay(74);  break;//correndo do 74 até 90 LOOP
			    //case 84  : instance.gotoAndPlay(68);  break;//correndo mão p/ cima LOOP
			    //case 148 : instance.gotoAndPlay(132);  break;//correndo mão p/ baixo
			    case 42  : instance.gotoAndPlay(1);   break;//puxando parou
			    case 37  : //puxando verifico se ainda está puxando
			    	if(instance.paiPipa != undefined){
			    		if(instance.paiPipa.puxar > 1 && !instance.paiPipa.rodar) {
			    			instance.gotoAndPlay(25);//puxando LOOP
			    		}else if(instance.paiPipa.descarregar > 0){//se já estiver descarregando
			    			instance.gotoAndPlay(43);
			    		}
			    	}
			    break;

			}

			if(instance.correndo) timeUpdate = 0.025;

			if(instance.paiPipa != undefined){
				if(instance.paiPipa.puxar > 0){
					if(instance.keyframe > 25 && instance.keyframe < 38) {
						timeUpdate += instance.paiPipa.puxar * 0.0020;//velocidade o puxão
					}
				}
			}

			if(timeUpdate != 0) {
				instance.mixer.update( timeUpdate/*clock.getDelta()*/ );
			}

		}
		
//======================================================
//COLISION SCENE ===================

		//if(instance.paiPipa == undefined){

			var speed = 1.3;
			var halfSize = 50;
			var nearHalfSize = halfSize-5;

			var posPerso = instance.perso.position;
			var quad1 = { //tamanho do quadrado deve ser do tamanho do perso
		        x1:posPerso.x - 7, 
		        x2:posPerso.x + 7, 
		        y1:posPerso.y - 0, //testar se está ok
		        y2:posPerso.y + 20, //testar se está ok
		        z1:posPerso.z - 7, 
		        z2:posPerso.z + 7
		    };

		    //colocar esse codifo todo em perso.js - if(instance.correndo) {
			
		    var tot = arrScene.length,
		    podemover = (instance.correndo || Math.abs(instance.gravity) != 0 && instance.paiPipa == undefined),
		    podecolidirparede = (instance.paiPipa != undefined && !instance.paiPipa.autoDescarregar);

		    if(podemover && instance.autoAndar == undefined){
			    if(instance.pressUp) instance.perso.position.z -= speed;
			    if(instance.pressDown) instance.perso.position.z += speed;
			    if(instance.pressLeft) instance.perso.position.x -= speed;
			    if(instance.pressRight) instance.perso.position.x += speed;
			    if(instance.gravity != 0) instance.perso.position.y += instance.gravity;
			}

			if(instance.correndo) {

				if(instance.autoAndar != undefined && type == 'festival') {


// ############################################# Verifica se xepeiro colidiu com item do cenario
					var tot5 = arrScene.length;
					while(tot5--){

				    	var quad2 = arrScene[tot5];

						var posPerso = instance.perso.position;
						var quad1 = { //tamanho do quadrado deve ser do tamanho do perso
					        x1:posPerso.x - 7, 
					        x2:posPerso.x + 7, 
					        y1:posPerso.y - 0, //testar se está ok
					        y2:posPerso.y + 20, //testar se está ok
					        z1:posPerso.z - 7, 
					        z2:posPerso.z + 7
					    };
				    	
						if(quad3dColision(quad1, quad2)) {
							
							//console.log('PAROUUU BATEU CENARIO');
							//inverto direção perso
							//instance.autoAndar = {x:-(instance.autoAndar.x/5), z:-(instance.autoAndar.z/5)};

							var pos = instance.verifPosEmpinar();
							instance.autoAndar = {x:pos.x, z:pos.z};


							/*if(instance.perso.position.x > instance.autoAndar.x){
								instance.perso.position.x = instance.perso.position.x - 2;
							}else{
								instance.perso.position.x = instance.perso.position.x + 2;
							}

							if(instance.perso.position.z > instance.autoAndar.z){
								instance.perso.position.z = instance.perso.position.z - 2;
							}else{
								instance.perso.position.z = instance.perso.position.z + 2;
							}

							instance.autoAndar = undefined
							instance.xepar();*/

							instance.perso.rotation.y += _180graus;
							instance.perso.position.y = 2;
							break;

						}

					}

					// #############################################

					instance.perso.translateZ( -1.3 );

				}

				//instance.perso.translateZ( -2.5 );//desativado 21/02/2019
				/*if(instance.pipaPrincipal) camAndandoPerso();
				
				var x = instance.perso.position.x,
				z = instance.perso.position.z,
				limite = 1700;//LIMITE EXTREMOS CENARIO
				if(z < -limite) instance.perso.position.z = -limite;
				else if(z > limite) instance.perso.position.z = limite;
				if(x < -limite) instance.perso.position.x = -limite;
				else if(x > limite) instance.perso.position.x = limite;*/

				var x = instance.perso.position.x,
				z = instance.perso.position.z,
				limite = 1200;//LIMITE EXTREMOS CENARIO
				if(z < limitecenario.z2) instance.perso.position.z = limitecenario.z2;
				else if(z > limitecenario.z1) instance.perso.position.z = limitecenario.z1;
				if(x < limitecenario.x2) instance.perso.position.x = limitecenario.x2;
				else if(x > limitecenario.x1) instance.perso.position.x = limitecenario.x1;

			}

			if(podemover || podecolidirparede){

				var colidiuUp = colidiuDown = colidiuLeft = colidiuRight = colidiuSpace = false;

			    while(tot--){

			    	var quad2 = arrScene[tot];

			    	if(podemover){

					    if(instance.pressUp){
						    var _quad1 = cloneObj(quad1);//clone object
						    _quad1.z1 -= speed;
						    _quad1.z2 -= speed;
						    if(quad3dColision(_quad1, quad2)) colidiuUp = true;
						}

						if(instance.pressDown){
						    var _quad1 = cloneObj(quad1);//clone object
						    _quad1.z1 += speed;
						    _quad1.z2 += speed;
						    if(quad3dColision(_quad1, quad2)) colidiuDown = true;
						}

						if(instance.pressLeft){
						    var _quad1 = cloneObj(quad1);//clone object
						    _quad1.x1 -= speed;
						    _quad1.x2 -= speed;
						    if(quad3dColision(_quad1, quad2)) colidiuLeft = true;
						}

						if(instance.pressRight){
						    var _quad1 = cloneObj(quad1);//clone object
						    _quad1.x1 += speed;
						    _quad1.x2 += speed;
						    if(quad3dColision(_quad1, quad2)) colidiuRight = true;
						}

						if(instance.gravity != 0){
						    var _quad1 = cloneObj(quad1);//clone object
						    _quad1.y1 += instance.gravity;
						    _quad1.y2 += instance.gravity;
						    if(quad3dColision(_quad1, quad2)) colidiuSpace = true;
						}

					}

//==========================================================
//COLISION PIPA COM AS PAREDE

					if(type == 'festival' || (type == 'online' && instance.pipaPrincipal)){

						if(podecolidirparede && instance.paiPipa != undefined){

							var MovingCube = instance.paiPipa.line,
				            _tot = 10;//MANUAL VERTICES LINHA **** !IMPORTANT reduz processing
				            
				            while(_tot--) {
				                var localVertex = MovingCube.geometry.vertices[_tot].clone(),
				                distance = 1,
				                quad1 = { 
								    x1:localVertex.x - distance, 
								    x2:localVertex.x + distance, 
								    y1:localVertex.y - distance, 
								    y2:localVertex.y + distance, 
								    z1:localVertex.z - distance, 
								    z2:localVertex.z + distance
								};

								if(quad3dColision(quad1, quad2)){//quad3dColisionForce
						            
						            
						            if(type == 'online'){
			                            var p = instance.paiPipa.pipa.position;
			                            socket.emit('bateuparede', {
			                                voou:instance.name, 
			                                x:Math.round(p.x), //pos pipas
			                                y:Math.round(p.y), 
			                                z:Math.round(p.z)
			                            });
			                            //console.log('BATEU PAREDEEEEE');
			                        }
						           	instance.paiPipa.setMorreu();
						            if(instance.pipaPrincipal) setMsg('<article>'+getVocabulary('bateuParede')+'</article>', 5000);
						            

						            /*if(instance.paiPipa.puxar > 0){
						            	instance.paiPipa.pipa.translateY( (2*-instance.paiPipa.puxar) * instance.paiPipa.velocidadePuxao );
						            }
						            instance.paiPipa.puxar = 0;
									instance.paiPipa.descarregar = 0;
									instance.paiPipa.animatedLadoAlado = true;
									instance.paiPipa.rodar = false;*/

						            break;
						        }

				            }//fim while
					        

				        }

				    }

			    }//fim while

			}

		    if(podemover){

		    	speed += 0.000001;

			    if(colidiuUp) instance.perso.position.z += speed;
			    if(colidiuDown) instance.perso.position.z -= speed;
			    if(colidiuLeft) instance.perso.position.x += speed;
			    if(colidiuRight) instance.perso.position.x -= speed;
			    if(colidiuSpace) {
			    	instance.perso.position.y -= instance.gravity - 0.000001;
			    	if(instance.gravity > 0) instance.pressSpace = false;
			    	instance.setNotGravity();
			    	//console.log('colidiuSpace');
			    }
				
				//=======>>>

				if(instance.pressSpace && instance.gravity <= 0) {
					instance.gravity = 3;
					//console.log(Math.random());
				}else{
					if(instance.gravity != 0 || instance.correndo) instance.gravity -= 0.1;//IF important evita processing
				}
				
				//if(instance.gravity != 0) instance.perso.position.y += instance.gravity;
				if(instance.perso.position.y < 2) {
					instance.perso.position.y = 2;
					instance.setNotGravity();
				}

			}

		//}


	}

	this.setNotGravity = function(){
		//instance.pressSpace = false;
		instance.vezesPular = 0;
		instance.gravity = 0;
	}

	this.pular = function(){
		//if(!instance.pressSpace){

		//console.log(instance.gravity, instance.vezesPular);
			
		//if((instance.gravity == 0 || instance.gravity == -0.1)){
		if(instance.vezesPular < instance.maxVezesPular && (instance.gravity >= -1.3 && instance.gravity <= 1.3) ){
			
			instance.gravity = 0;
			instance.pressSpace = true;
			instance.correndo = true;
			
			//setTimeout(function(){ 
				instance.update();//resolveu
				instance.pressSpace = false;
				//instance.correndo = false;
				if(!instance.pressLeft && !instance.pressRight && !instance.pressUp && !instance.pressDown) instance.correndo = false;

				//if(!instance.pressLeft && !instance.pressRight && !instance.pressUp && !instance.pressDown) instance.stopPersoCorrer();
			//},25);

			if(instance.pipaPrincipal && type == 'online'){
				socket.emit(2, [nomePlayer, 'pular', Math.round(instance.perso.position.x), Math.round(instance.perso.position.y), Math.round(instance.perso.position.z)]);
			}

			instance.vezesPular++;
			
		}
	}

	this.playPersoCorrer = function(){
		if(/*!instance.correndo && */instance.avatar != undefined){
			instance.correndo = true;
			//instance.perso.rotation.set(0, 0, 0);
			if(instance.pipaPrincipal || type == 'online'){
				instance.perso.rotation.x = 0;
				instance.perso.rotation.z = 0;
			}

			//console.clear();
			//console.log(instance.directPersoAndar);

			if(usageAvatar){
				instance.gotoAndPlay(74);//correndo
			}/*else{

				function getArmacao(v){
					return [
						0, 0, 0, 0, 0,
				        0, 0, 0, 0, 0,
				        0, 0, 0, 0, 0,
				        0, 0, 0, 0, 0,
				        -4*v, -4*v, 0, 4*v, 4*v
			    	]	    	
			    }
			    function getArmacaoX(v){
					return [
						-15, -7.5, 0, 7.5, 15,
				        -15, -7.5, 0, 7.5, 15,
				        -15, -7.5, 0, 7.5, 15,
				        -15, -7.5, 0, 7.5, 15,
				        -15*v, -7.5*v, 0, 7.5*v, 15*v
			    	]	    	
			    }
			    function getArmacaoY(v){
					return [
						23, 23, 23, 23, 23,
				        11.5, 11.5, 11.5, 11.5, 11.5, 
				        1*v,1*v,1*v,1*v,
				        -11.5, -11.5, -11.5, -11.5, -11.5,
				        -23, -23, -23, -23, -23
			    	]	    	
			    }

				instance.value = {v:-1};
				TweenMax.to(instance.value, 0.3, {v:1, repeat:-1, yoyo:true, ease:Linear.easeNone, onUpdate:function(){
					if(instance.avatar != undefined && instance.avatar.geometry != undefined) {
						var arm = getArmacao(instance.value.v * 2);
						//var armX = getArmacaoX(targ.x);
						//var armY = getArmacaoY(targ.x);
						for(var t = 0; t < 25;t++){
							//a.geometry.vertices[t].y = armY[t];
							//a.geometry.vertices[t].x = armX[t];
							instance.avatar.geometry.vertices[t].z = arm[t];
						}
						instance.avatar.geometry.verticesNeedUpdate = true;
					}
					
				}});

			}*/
			
		}

		if(!usageAvatar && !instance.pressSpace) {

			if(instance.correndo) {
			    switch (instance.directPersoAndar) {
				    case 0 : instance.pressUp = true; break;
				    case 1 : instance.pressUp = true; instance.pressRight = true; break;
				    case 2 : instance.pressRight = true; break;
				    case 3 : instance.pressDown = true; instance.pressRight = true; break;
				    case 4 : instance.pressDown = true; break;
				    case 5 : instance.pressDown = true; instance.pressLeft = true; break;
				    case 6 : instance.pressLeft = true; break;
				    case 7 : instance.pressUp = true; instance.pressLeft = true; break;
				    //case 8 : pressDown = true; pressRight = true; break;
				}
			}
			
			if(instance.directPersoAndar != -1) {
				

				//instance.avatar.material.map.offset.y = 1 - (0.125 * (8-cameraAngle));//COD CORRETO PROCESSING --> instance.avatar.material.map.offset.y = 1 - ((1/8) * (8-directionCamera));


				var _directPersoAndar = instance.directPersoAndar;
				var cc = 8 - Math.round(cameraAngle/(360/7));
				
				//console.clear();
				//console.log(instance.directPersoAndar, cameraAngle, cc, instance.directPersoAndar-cc);

				//AJUSTA DIREÇÃO CONFORME ROTAÇÃO DA CAMERA
				_directPersoAndar -= cc;
				if(_directPersoAndar < 0) _directPersoAndar = 8 - Math.abs(_directPersoAndar);

				//instance.directPersoAndar += cc;
				//if(instance.directPersoAndar > 7) instance.directPersoAndar = -1 + Math.abs(instance.directPersoAndar);

				//=============
				


				instance.avatar.material.map.offset.y = 1 - (umDivididoPorOito * (_directPersoAndar+1));
			}

		}

	}



	this.stopPersoCorrer = function(pulando){
		if(instance.correndo){
			//instance.gotoAndPlay(1);
			if(usageAvatar){
				instance.gotoAndPlay(70);
			}else{
				//instance.avatar.children[0].x = 1000000;
				TweenMax.killTweensOf(instance.value);
			}
	        //instance.perso.rotation.y = 0;
	    }
	    instance.correndo = false;


	    //console.log('STOP PERSO CORRER');
	    //console.log(instance.avatar.material.map.offset.y, umDivididoPorOito, instance.directPersoAndar);
	    //console.log('instance.directPersoAndar', instance.directPersoAndar)

	    var dirPersoAndar = instance.directPersoAndar;
	    if(dirPersoAndar < 0) dirPersoAndar = 0; 

	    //var arrAnimPersoStopCorrer = [2, 1, 1, 2, 1, 0, 1, 3];
	    //instance.avatar.material.map.offset.x = (1/6) * arrAnimPersoStopCorrer[dirPersoAndar];
	    instance.avatar.material.map.offset.x = 0;//(1/6) * 0;
	    

	    //instance.directPersoAndar = 0;
	    //if(pulando == undefined) instance.pressLeft = instance.pressRight = instance.pressUp = instance.pressDown = false;
	    //console.log('stopPersoCorrer');
	}

	this.gotoAndPlay = function(keyframe){
		if(usageAvatar){
			if(instance.avatar != undefined) {
				instance.mixer._actions[0].time = (keyframe / 30);
				//console.clear();
				//console.log(instance.mixer, instance.mixer._actions[0].time,instance.mixer._actions[0].time*30);
			}
		}
	}

	this.matarPipa = function(puxeiPipa){

		if(instance.pipaPrincipal && type == 'online'){
			//console.log('Socket Envia - matarPipa::::', obj);
			socket.emit('pipa', 
				{
					s:'rem',
					n:nomePlayer
				}
			);
			//console.log('mandou matar')
		}

		instance.stopPersoCorrer();//!important
		if(instance.paiPipa != undefined){
			instance.paiPipa.matarPipa();
			instance.paiPipa = undefined;
			instance.perso.rotation.set(0, 0, 0);
			//delete instance.paiPipa;
			//if(instance.pipaPrincipal) cameraFoco('primeiraPerso');
		}/*else{
			console.log('erro tentando matar pipa ou não tem pipa no alto');
		}*/
	}

	this.removePerso = function(){
		
		for(var c = 0;c < persos.length;c++){
			if(persos[c] == instance){
				persos.splice(c, 1);
				break;
			}
		}

		/*for(var c = 0;c < allPersos.length;c++){//libero p/ ser usado novamente
			if(allPersos[c].avatar == instance.avatar){
				//allPersos.splice(c, 1);
				allPersos[c].usage = false;
				break;
			}
		}*/

		//return;
		instance.matarPipa();

		removeScene(instance.avatar, instance.perso);
		removeScene(instance.perso);
		
		instance.perso = undefined;
		instance.avatar = undefined;

		clearTimeout(instance.timeout);


		//não posso mais remover abaixo senão sai da memory !IMPORTANT
		//clear3D( instance.perso );
		//clear3D( instance.avatar );
		//instance.avatar = undefined;
	    //instance.animations = undefined;



		//instance = undefined;
		//this = undefined;

	}

}