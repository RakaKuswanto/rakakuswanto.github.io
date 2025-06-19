



function emitEvt(a, paiPipa){

	if(paiPipa.pipaPrincipal && type == 'online'){
	
		if(!paiPipa.autoDescarregar){

			socket.emit(1,
				[
					a,
					nomePlayer,
					Math.round(paiPipa.pipa.position.x),
					Math.round(paiPipa.pipa.position.y),
					Math.round(paiPipa.pipa.position.z),
					paiPipa.posZ.toFixed(3),
					paiPipa.pipa.rotation.z.toFixed(3)

					/*,
					Number(paiPipa.group.getX().toFixed(1)),
					Number(paiPipa.group.getY().toFixed(1)),
					Number(paiPipa.pipa.getRotation().toFixed(1)),
					Number(paiPipa.gravidade.toFixed(2)),
					Number(paiPipa.gravidadeRotacao.toFixed(2)),
					paiPipa.directionRight,
					Number(paiPipa.acres.toFixed(2)),
					Number(paiPipa.velocidade.toFixed(2)),
					paiPipa.animatedLadoAlado,
					Number(paiPipa.scale.toFixed(2))*/
				]
			);

		}

	}
		

}



function getPaiPipaPrincipal(){
	if(type == 'twoPlayer'){
		return persos[0];
	}else{
		return paiPipaPrincipal;
	}
}

function controlerClicks(){

//INI TOUCHS / MOBILE EVENTS ==========================================

	var evt = {};
	$('#touch1')
	.on(getTouchStart(), function(e){
		if(controls == undefined) return;
		var paiPipa = getPaiPipaPrincipal();
		if(!controls.enabled && paiPipa != undefined && paiPipa.paiPipa != undefined){
			e.preventDefault();
			evt.x = (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageX : e.pageX);
			evt.y = (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageY : e.pageY);
			if(paiPipa.timeDisbique == 0) paiPipa.timeDisbique = new Date().getTime();
		}
	})
	.on(getTouchEnd(), function(e){

		if(controls == undefined) return;
		var paiPipa = getPaiPipaPrincipal();
		if(!controls.enabled && paiPipa != undefined && paiPipa.paiPipa != undefined){
		
			e.preventDefault();

			evt.x = evt.x - (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageX : e.pageX);
			evt.y = evt.y - (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageY : e.pageY);

			if(Math.abs(evt.x) < 15 && Math.abs(evt.y) < 15){
				/*if(new Date().getTime() - paiPipa.timeDisbique > 1000){//segurou 1 seg disbicar - rancão
					paiPipa.timeDisbique = 0;
					//setMsgConsole('RANCAO!!!!!!!');
					rancao(paiPipa.paiPipa);
					return;
				}else{*/
					disbicar(paiPipa.paiPipa);
				//}
			}else if(evt.y < 0){
				puxar(paiPipa.paiPipa);
			}else{
				descarregar(paiPipa.paiPipa);
			}
			paiPipa.timeDisbique = 0;

		}
		
	});

	var evt2 = {};
	$('#touch2')
	.on(getTouchStart(), function(e){
		if(controls == undefined) return;
		var paiPipa = persos[1];
		if(!controls.enabled && paiPipa != undefined && paiPipa.paiPipa != undefined){
			e.preventDefault();
			evt2.x = (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageX : e.pageX);
			evt2.y = (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageY : e.pageY);
			if(paiPipa.timeDisbique == 0) paiPipa.timeDisbique = new Date().getTime();
		}
	})
	.on(getTouchEnd(), function(e){

		if(controls == undefined) return;
		var paiPipa = persos[1];
		if(!controls.enabled && paiPipa != undefined && paiPipa.paiPipa != undefined){
		
			e.preventDefault();

			evt2.x = evt2.x - (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageX : e.pageX);
			evt2.y = evt2.y - (((e.originalEvent.targetTouches)) ? e.originalEvent.changedTouches[0].pageY : e.pageY);

			if(Math.abs(evt2.x) < 15 && Math.abs(evt2.y) < 15){
				/*if(new Date().getTime() - paiPipa.timeDisbique > 1000){//segurou 1 seg disbicar - rancão
					paiPipa.timeDisbique = 0;
					//setMsgConsole('RANCAO!!!!!!!');
					rancao(paiPipa.paiPipa);
					return;
				}else{*/
					disbicar(paiPipa.paiPipa);
				//}
			}else if(evt2.y < 0){
				puxar(paiPipa.paiPipa);
			}else{
				descarregar(paiPipa.paiPipa);
			}
			paiPipa.timeDisbique = 0;

		}
		
	});

//FIM TOUCHS / MOBILE EVENTS ==========================================

	if(!mobile){

		//comandos para PC
		$(document)
		.off('keydown')
		.on('keydown', function(e){

			if(e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32) return;//permite apenas essas teclas
			
			if($('#popup').length > 0) return;

			var pai = getPaiPipaPrincipal();
			if(pai != undefined) {

				if(e.keyCode == 16){
					if(Math.random() < 0.5){
			    		$('#menu').show();
			    	}else{
			    		$('#menu').hide();
			    	}
				}

				if(pai.paiPipa == undefined && (type == 'festival' || type == 'online')){//só corre sem pipa no alto
				
					if(!paiPipaPrincipal.pressLeft && !paiPipaPrincipal.pressRight && !paiPipaPrincipal.pressUp && !paiPipaPrincipal.pressDown) pai.avatar.rotation.z = de2ra(180);//IMPORTANT

					switch(e.keyCode) {
					    case 37: paiPipaPrincipal.pressLeft = true; break;
					    case 39: paiPipaPrincipal.pressRight = true; break;
					    case 38: paiPipaPrincipal.pressUp = true; break;
					    case 40: paiPipaPrincipal.pressDown = true; break;
					    case 32: paiPipaPrincipal.pular(); break; 
					}

					if(paiPipaPrincipal.pressLeft || paiPipaPrincipal.pressRight || paiPipaPrincipal.pressUp || paiPipaPrincipal.pressDown || paiPipaPrincipal.pressSpace) paiPipaPrincipal.playPersoCorrer();

				}

				if(pai.paiPipa != undefined){
					switch(e.keyCode) {
						case 83: //teclado S
							if(pai.timeDisbique == 0) pai.timeDisbique = new Date().getTime();
						break;
					}
				}

				if(type == 'twoPlayer' && !singlePlayer){
					if(persos[1].paiPipa != undefined){
						switch(e.keyCode) {
							case 75://teclado K 
								if(type == 'twoPlayer'){
									if(persos[1].timeDisbique == 0) persos[1].timeDisbique = new Date().getTime();
								}
							break;
						}
					}
				}



//AJUTANDO SPRITE POSITON

				if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) updateSpritePerso(pai);

				//if(e.keyCode != 32) updateSpritePerso(pai);

				//if(pai.pressUp) pai.directPersoAndar = 0;
				//if(pai.pressUp && pai.pressRight) pai.directPersoAndar = 1;
				//if(pai.pressRight) pai.directPersoAndar = 2;
				//if(pai.pressDown && pai.pressRight) pai.directPersoAndar = 3;
				//if(pai.pressDown) pai.directPersoAndar = 4;
				//if(pai.pressDown && pai.pressLeft) pai.directPersoAndar = 5;
				//if(pai.pressLeft) pai.directPersoAndar = 6;
				//if(pai.pressUp && pai.pressLeft) pai.directPersoAndar = 7;




			}
		})
		.off('keyup')
		.on('keyup', function(e){

			if($('#popup').length > 0) return;

			var pai = getPaiPipaPrincipal();
			if(pai != undefined) {
				//console.log(e.keyCode);

				if(pai.paiPipa == undefined && (type == 'festival' || type == 'online')){//só corre sem pipa no alto
					switch(e.keyCode) {
					    case 37: paiPipaPrincipal.pressLeft = false; break;
					    case 39: paiPipaPrincipal.pressRight = false; break;
					    case 38: paiPipaPrincipal.pressUp = false; break;
					    case 40: paiPipaPrincipal.pressDown = false; break;
					    //case 32: paiPipaPrincipal.pular(); break;
					}

					if(!paiPipaPrincipal.pressLeft && !paiPipaPrincipal.pressRight && !paiPipaPrincipal.pressUp && !paiPipaPrincipal.pressDown) pai.stopPersoCorrer();
				}

				//PIPA PRINCIPAL
				if(pai.paiPipa != undefined){
					switch(e.keyCode) {
						case 83: 
							/*if(new Date().getTime() - pai.timeDisbique > 1000){//segurou 1 seg disbicar - rancão
								pai.timeDisbique = 0;
								//setMsgConsole('RANCAO!!!!!!!');
								rancao(pai.paiPipa);
								return;
							}*/
							pai.timeDisbique = 0;
							disbicar(pai.paiPipa);
						break;
						case 65: puxar(pai.paiPipa); break;
						case 68: descarregar(pai.paiPipa); break;
					}
				}

				//TWO PLAYER
				if(type == 'twoPlayer' && !singlePlayer){
					if(persos[1].paiPipa != undefined){
						switch(e.keyCode) {
						//Two Player
							case 75: 
								/*if(new Date().getTime() - persos[1].timeDisbique > 1000){//segurou 1 seg disbicar - rancão
									persos[1].timeDisbique = 0;
									//setMsgConsole('RANCAO!!!!!!!');
									rancao(persos[1].paiPipa);
									return;
								}*/
								persos[1].timeDisbique = 0;
								disbicar(persos[1].paiPipa);
							break;
							case 74: puxar(persos[1].paiPipa); break;
							case 76: descarregar(persos[1].paiPipa); break;
						}
					}
				}

				if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) updateSpritePerso(pai);
				//if(e.keyCode != 32) updateSpritePerso(pai);	

			}
		});
		
	}

}

function updateSpritePerso(pai){
	if(!usageAvatar) {
		var a = -1;
		if(pai.pressUp) a = 0;
		if(pai.pressRight) a = 2;
		if(pai.pressDown) a = 4;
		if(pai.pressLeft) a = 6;
		if(pai.pressUp && pai.pressRight) a = 1;
		if(pai.pressDown && pai.pressRight) a = 3;
		if(pai.pressDown && pai.pressLeft) a = 5;
		if(pai.pressUp && pai.pressLeft) a = 7;

		pai.stopPersoCorrer();
		pai.directPersoAndar = a;//1 - (umDivididoPorOito * (a+1));
		if(a != -1) pai.playPersoCorrer();

		if(type == 'online'){
    		if(rotPersoOnline != paiPipaPrincipal.directPersoAndar){
    			rotPersoOnline = paiPipaPrincipal.directPersoAndar;
    			//socket.emit(2, [nomePlayer, rotPersoOnline]);
    			socket.emit(2, [nomePlayer, rotPersoOnline, Math.round(paiPipaPrincipal.perso.position.x), Math.round(paiPipaPrincipal.perso.position.y), Math.round(paiPipaPrincipal.perso.position.z)]);
    		}
    	}

	}
}

function puxar(paiPipa){

	
    //console.log(paiPipa.posZ);

	if(paiPipa == undefined) paiPipa = getPaiPipaPrincipal().paiPipa;
	if(!paiPipa.podeCortar || paiPipa.autoDescarregar) return;
	if(paiPipa.pipa.position.y < 40) {//não deixa puxar se tiver proximo ao chão e com o bico p/ baixo
		ajustBugRotacaoPosZ(paiPipa);//!IMPORTANT
		if(Math.abs(paiPipa.posZ) > 1.5) return;
	}

	/*if(paiPipa.pipa.position.y < 45) {
		if(Math.abs(paiPipa.posZ) > 1){
			paiPipa.animatedLadoAlado = true;
			paiPipa.puxar = 0;
			return;	
		}
	}*/

	clearTweenPipa(paiPipa);


	//EVITANDO EXCESSO DE EMIT / EVT
	if(type == 'online'){
		if(paiPipa.puxarTime == undefined){
			paiPipa.puxarTime = new Date().getTime();
		}else{
			if(new Date().getTime() - paiPipa.puxarTime > 100){
				//console.log(new Date().getTime() - paiPipa.puxarTime);	
				paiPipa.puxarTime = new Date().getTime();
			}else{
				return;
			}
		}
	}


	emitEvt(0, paiPipa);

	//Verifica se vai trazer do aparo mais rápido
	if(type != 'online'){
		var tot2 = paiPipa.pipasAparadas.length;
		//console.log(paiPipa.puxar);
		if(paiPipa.puxar > 4){
			while(tot2--) {
				if(paiPipa.pipasAparadas[tot2].indiceLinhaAparou > 0) {
					if(Math.random() < 0.3) paiPipa.pipasAparadas[tot2].indiceLinhaAparou--;
				}
			}
		}
	}
	
	


	paiPipa.velMurchar = paiPipa.murchar * 4.2;/*vel max puxao*/;

	//SOM
	var distance = camera.position.distanceTo(paiPipa.pipa.position);
	var vol = 1.2 - (distance / 550);
	//console.log(vol);
	playSom('puxar', vol*1.2, paiPipa.getPerso.idc);
	//console.log(paiPipa.id);

	//setGravar(2);
	
	if(paiPipa.getPerso.keyframe < 25 || paiPipa.getPerso.keyframe > 38) {
		paiPipa.getPerso.gotoAndPlay(25);
	}

	ajustBugRotacaoPosZ(paiPipa);
	
	paiPipa.descarregar = 0;
	paiPipa.disbicando = false;
	paiPipa.rodar = false;
	
	paiPipa.rotZ = 0;

	
	if(paiPipa.puxar < 3) paiPipa.puxar = 3;	
	
	
	paiPipa.puxar += 2 - (0.7 * paiPipa.pressao);
	//console.log(2 - (paiPipa.peso * 0.7));
	//paiPipa.descarregar = 0.45 + (0.25 * paiPipa.pressao);
	//console.log(paiPipa.distance);

	if(paiPipa.puxar > 5) paiPipa.puxar = 5;
	//if(paiPipa.puxar > 6) paiPipa.puxar = 6;

	
	//clearTweenPipa(paiPipa);
	
}

function descarregar(paiPipa, force){

	if(paiPipa == undefined) paiPipa = getPaiPipaPrincipal().paiPipa;
	if((!paiPipa.podeCortar || paiPipa.autoDescarregar) && force == undefined) return;
	//if(paiPipa.pipa.position.y < 45) return;

	clearTweenPipa(paiPipa);


	//EVITANDO EXCESSO DE EMIT / EVT
	if(type == 'online'){
		if(paiPipa.descarregarTime == undefined){
			paiPipa.descarregarTime = new Date().getTime();
		}else{
			if(new Date().getTime() - paiPipa.descarregarTime > 180){
				//console.log(new Date().getTime() - paiPipa.descarregarTime);	
				paiPipa.descarregarTime = new Date().getTime();
			}else{
				return;
			}
		}
	}


	emitEvt(2, paiPipa);

	if(paiPipa.getPerso.keyframe < 25 || paiPipa.getPerso.keyframe > 42){//se não tiver animando puxando
		if(paiPipa.getPerso.keyframe < 60 || paiPipa.getPerso.keyframe > 43) {//se já tiver descaregando
			paiPipa.getPerso.gotoAndPlay(53);
		}else{
			paiPipa.getPerso.gotoAndPlay(43);
		}
	}

	//setGravar(3);

	ajustBugRotacaoPosZ(paiPipa);

	var velRodar = 1;

	if(paiPipa.totFitasRabiola == 0){

		//RAIA
		//console.log(paiPipa.pipa.rotation.z, paiPipa.descarregar);

		if(paiPipa.rodar == false && paiPipa.puxar < 3.2){
			
			velRodar = 1;

			if(paiPipa.pensa != 0){
				paiPipa.rodar = ((paiPipa.pensa > 0) ? velRodar : -velRodar);
			}else{
				if(paiPipa.pipa.rotation.z > 0) paiPipa.rodar = -velRodar;
				else if(paiPipa.pipa.rotation.z < 0) paiPipa.rodar = velRodar;
			}

		}


	}else{

		//PIPA
		if(paiPipa.disbicando){//somente se tiver disbicando no lado certo(soma) coloca p/ rodar - 
			
			//antes era assim
			/*if(paiPipa.soma > 0 && paiPipa.posZ > 1.2 && paiPipa.posZ < 2.5) paiPipa.rodar = velRodar;
			if(paiPipa.soma < 0 && paiPipa.posZ < -1.2 && paiPipa.posZ > -2.5) paiPipa.rodar = -velRodar;*/

			if(paiPipa.soma > 0 && paiPipa.posZ > 1.2) paiPipa.rodar = velRodar;
			else if(paiPipa.soma < 0 && paiPipa.posZ < -1.2) paiPipa.rodar = -velRodar;



		}

	}

	paiPipa.disbicando = false;
	paiPipa.animatedLadoAlado = true;
	
	if(paiPipa.descarregar < 0.5) {
		//paiPipa.descarregar = 0.65;
		paiPipa.descarregar = 0.45 + (0.25 * paiPipa.pressao);
	}else{
		//paiPipa.descarregar += 0.07;
		paiPipa.descarregar += 0.035 + (0.035 * paiPipa.pressao);
	}
	

	



	//clearTweenPipa(paiPipa);

	
	
	//LARGADA
	/*if(paiPipa.puxar > 3 && paiPipa.descarregar != 0){
		console.log('LARGADA');
		paiPipa.rodar = false;
		paiPipa.puxar += paiPipa.puxar * 0.3;
		paiPipa.descarregar = 0;
		//paiPipa.velZigzag = 0;
	}*/

}

function ajustBugRotacaoPosZ(paiPipa){
	var vai = Math.round(paiPipa.posZ / _360graus);
	paiPipa.posZ = paiPipa.posZ - (vai * _360graus);
}

function ajustBugRotacaoPipaZ(pipa){
	var vai = Math.round(pipa.rotation.z / _360graus);
	pipa.rotation.z = pipa.rotation.z - (vai * _360graus);
}

function disbicar(paiPipa){

	if(paiPipa == undefined) paiPipa = getPaiPipaPrincipal().paiPipa;
	if(!paiPipa.podeCortar || paiPipa.autoDescarregar) return;
	//if(paiPipa.pipa.position.y < 120) return;

	/*if(paiPipa.pipa.position.y < 45){
		if(Math.abs(paiPipa.posZ) > 1){
			paiPipa.animatedLadoAlado = true;
			clearTweenPipa(paiPipa);
			paiPipa.timePrimeiroClick = false;
			return;
		}
	}*/


	clearTweenPipa(paiPipa);
	emitEvt(1, paiPipa);

	paiPipa.velMurchar = paiPipa.murchar * 3.2;/*vel max puxao alterado*/;


	//SOM
	var distance = camera.position.distanceTo(paiPipa.pipa.position);
	//console.log( distance, (distance / 1000), 1.2 - (distance / 1000) );
	var vol = 1.2 - (distance / 550);
	//console.log(vol);
	playSom('disbicar', vol*1.2, paiPipa.getPerso.idc);


	//Verifica se vai fatiar ou não
	if(paiPipa != undefined){
		var tot2 = paiPipa.pipasAparadas.length;
		while(tot2--) {

			var rd = 0.07;
			if(paiPipa.rotDisbique == 0) rd = 0.2;//pipa que não disbica ex: raia chilena

			if(Math.random() < rd) {
				if(type == 'online'){
					if(paiPipa.pipaPrincipal){
						//console.log('emit fatiou')
						socket.emit('pipa',{
								s:'fatiou',
								n:paiPipa.getPerso.name,//name pipa fatiada
								r:tot2,//indice rabiola fatiou
								i:paiPipa.contPipaOnline//id da pipa
							}
						);
					}
					return;
				}
				paiPipa.setFatiar(tot2);
			}
		}
	}


	if(paiPipa.rotDisbique == 0){//pipa que não disbica ex: raia chilena
		if(paiPipa.rodar || paiPipa.puxar < 1.6){//evitar disbique constante q parece puxao mais lento
			puxar(paiPipa);
			descarregar(paiPipa);
		}
		return;
	}

	
	if(paiPipa.getPerso.keyframe < 25 || paiPipa.getPerso.keyframe > 42){//se não tiver animando puxando
		paiPipa.getPerso.gotoAndPlay(3);
	}	


	

	//setGravar(1);

	ajustBugRotacaoPosZ(paiPipa);

	paiPipa.disbicando = new Date().getTime();//true;
	paiPipa.rodar = false;
	//paiPipa.descarregar = 0;
	paiPipa.puxar = 0;

	if(paiPipa.timePrimeiroClick) {//definindo direção da rotação da pipa no primeiro click
		paiPipa.soma = (paiPipa.posZ > 0) ? -0.9 : 0.9;
    }
	paiPipa.soma = (paiPipa.soma > 0) ? -paiPipa.velRotDisbique : paiPipa.velRotDisbique;//important manter essa linha abaixo do calc acima


	
	var delayTween = 700;//700
	clearTimeout(paiPipa.timeout);
    paiPipa.timeout = setTimeout(function(){
    	//if(paiPipa.disbicando) console.log(paiPipa.disbicando, new Date().getTime() - paiPipa.disbicando);
    	ajustBugRotacaoPosZ(paiPipa);
    	paiPipa.animatedLadoAlado = true;
    	paiPipa.disbicando = false;
    	paiPipa.timePrimeiroClick = true;
    }, delayTween);
     
    if(paiPipa.timePrimeiroClick) paiPipa.soma = paiPipa.soma / 2;//reduz a rotação no primeiro disbique

    paiPipa.timePrimeiroClick = false;

	
	//clearTweenPipa(paiPipa);



	
	
	//Rotação
    TweenMax.to(paiPipa, 0.65, { 
    	overwrite:1,
    	ease:Cubic.easeOut,
        posZ: paiPipa.posZ + (paiPipa.soma * paiPipa.rotDisbique)
    });
    	
    //Tween Lateral
    paiPipa.animatedLadoAlado = false;
	paiPipa.myObject = {value:0};
	


	
	//delayTween = (paiPipa.rotDisbique == 0) ? 0.4 : 0.6;
	delayTween = 0.6;
	

	if(paiPipa.scale != 1) paiPipa.soma *= paiPipa.scale;//aqui1

	TweenMax.to(paiPipa.myObject, delayTween, {
		overwrite:1,
		value:paiPipa.soma,
		onUpdate:applyValue,
		//onUpdateParams:[paiPipa.myObject.value],
		ease:Elastic.easeOut/*,
		onComplete:function(){
			//console.log('aa');
			//paiPipa.animatedLadoAlado = true;
		}*/
	});

	function applyValue(){
		/*if(paiPipa.rotDisbique == 0) {//pipa que não disbica
			paiPipa.pipa.translateY( Math.abs(paiPipa.myObject.value*2.6) );//velocidade disbique lados - cada pipa uma velocidade
		}else{//pipa que disbica*/
			paiPipa.pipa.translateX(paiPipa.myObject.value);
			paiPipa.pipa.translateY( Math.abs(paiPipa.myObject.value * paiPipa.widthDisbique/*!IMPORTANT*/) );//velocidade disbique lados - cada pipa uma velocidade
		//}
		paiPipa.updateLine();//processing
	}

}
	
function disbicarDescarregar(paiPipa){

	if(paiPipa == undefined) paiPipa = persos[0].paiPipa;

	//setGravar(4);

	//paiPipa.disbicar = 0.3;

	descarregar(paiPipa);
	disbicar(paiPipa);

}

/*function rancao(paiPipa){

	if(paiPipa == undefined) paiPipa = getPaiPipaPrincipal().paiPipa;
	if(paiPipa.pipa.position.y < 40) return;

	//Verifica se vai fatiar ou não
	if(paiPipa != undefined){
		var tot2 = paiPipa.pipasAparadas.length;
		while(tot2--) paiPipa.setFatiar(tot2);
	}

	puxar(paiPipa);
	descarregar(paiPipa);

}*/