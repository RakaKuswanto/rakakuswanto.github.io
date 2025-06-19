var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

function isMobileAll(){
    return (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent));
}

function de2ra(degree){ return degree*(Math.PI/180); }

function getCameraAngle(cameraVector){
    return radiansToDegrees(Math.atan2(cameraVector.x, cameraVector.z));
}

function radiansToDegrees(radians){
    return radians * 180 / Math.PI;
}

function getPositionMatrixWordSum(_x, _y, _z, obj){
    var a = new THREE.Vector3( _x, _y, _z ).applyQuaternion( obj.quaternion );
    a.x += obj.position.x;
    a.y += obj.position.y;
    a.z += obj.position.z;
    return a;
}

function getFromMatrixPosition(obj){//usage direct = 
    return new THREE.Vector3().setFromMatrixPosition(obj.matrixWorld);//testar se processing
}

function removeScene(obj, _scene){
    if(_scene == undefined) _scene = scene;
    if(obj != undefined){
        dispose3D(obj);
        /*if(obj.geometry != undefined) {
            if(obj.geometry.dispose != undefined) obj.geometry.dispose();
            obj.geometry = undefined;
        }
        if(obj.material != undefined){
            if(obj.material.dispose != undefined) obj.material.dispose();
            obj.material = undefined;
        }*/
        if(_scene != undefined) _scene.remove(obj);
        obj = undefined;
        //renderer.dispose();//desativado - dando reload images perso
    }
    //delete obj;
    //console.log(obj);
}

function rand(min, max){            
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function randNumber(min, max){            
    return (Math.random() * (max - min + 1)) + min;
}

function getTextureLoader(src){
    var loader = new THREE.TextureLoader();
    return loader.load(src);
}

function isMobileAll(){
    return (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent));
}

function setAutoUpdateMatrix(obj, bool){
    if(obj != undefined){
        obj.matrixAutoUpdate = bool;
        obj.updateMatrix();
    }
}

function getTap(){
    var a = 'tap';
    //if(windowsPhone) a = 'MSPointerUp';
    return a;
}

function getTouchStart(){
    var a = 'mousedown'
    if(mobile) a = 'touchstart';
    //if(windowsPhone) a = 'MSPointerDown';
    return a;
}

function getTouchEnd(){
    var a = 'mouseup'
    if(mobile) a = 'touchend';
    //if(windowsPhone) a = 'MSPointerUp';   
    return a;
}

function getDelay(valueAtual, valueVai, delay){
    //this._x = this._x + (_parent._xmouse - this._x) / 10;
    return valueAtual + (valueVai - valueAtual) / delay;
}

function getBD(){
    //localStorage.clear();
    if(!window.localStorage["PipaCombate10"]) {//se não existe Storage criar
        localStorage.clear();//reseta oq já tiver sido gravado
        var tot = arrPipas.length,
        arr1 = [], arr2 = [];
        for(var c = 0;c < arrPipas.length;c++) {
            if(arrPipas[c].preco == 0) {
                arr1[c] = -1;
            }else{
                arr1[c] = 0;
                if(c < 10) arr1[c] = ((Math.random() < 0.3) ? 3 : 0);
            }

            if(c < 3) arr1[c] = 10;
            
            //arr1[c] = 0;
        }
        for(var c = 0;c < arrLinhas.length;c++) {
            if(arrLinhas[c].preco == 0) {
                arr2[c] = -1;
            }else{
                arr2[c] = 0;
                if(c < 4) arr2[c] = ((Math.random() < 0.5) ? 3 : 0);
            }
            //arr2[c] = 100;
        }

        //pixelRatio ==
        var pixelRatio = 1;
        if(mobile){ 
            pixelRatio = window.devicePixelRatio;//else 1 default
            if(pixelRatio == 1) pixelRatio = 0.85;
            if(pixelRatio == 2) pixelRatio = 1.5;
            if(pixelRatio == 3) pixelRatio = 2.0;
        }
        
        window.localStorage["PipaCombate10"] = JSON.stringify({
            //dinheiro:30,
            //pipas:arr1,
            //linhas:arr2,
            som:true,
            somIntro:true,
            somGrito:true,
            //vento:1,//inicia com vento p/ praia
            pixelRatio:pixelRatio,
            lang:'pt'
        });
    }

    var obj = JSON.parse(window.localStorage.getItem("PipaCombate10"));
    BD = obj;

    //verifQtdPipas();
    //updateDinheiro();

}

function updateBD(){

    window.localStorage["PipaCombate10"] = JSON.stringify({
        //dinheiro:BD.dinheiro,
        //pipas:BD.pipas,
        //linhas:BD.linhas,
        som:BD.som,
        somIntro:BD.somIntro,
        somGrito:BD.somGrito,
        //vento:BD.vento,
        pixelRatio:BD.pixelRatio,
        lang:BD.lang
    });
    
    //updateDinheiro();
    
    $('#config .qualidade').html( Math.round(BD.pixelRatio * 100) + '%' );

}

/*function updateDinheiro(){
    $('.dinheiro')
    .removeClass('placar')
    .html('$'+convertDinheiro(BD.dinheiro));
}*/

function updatePlacarFestival(){

    if(type == 'festival' && paiPipaPrincipal != undefined && paiPipaPrincipal.paiPipa != undefined){
        $('.dinheiro')
        .addClass('placar')
        .html('cortou: '+placarFestival.cortou);
    }
    
}

/*function verifQtdPipas(){

    //NÃO DEIXAR ZERAR TODAS PIPAS
    if(BD.dinheiro <= 0){
        var tot = BD.pipas.length,
        pode = false;
        while(tot--){
            if(BD.pipas[tot] > 0){
                pode = true;
                break;
            }
        }
        if(!pode){
            BD.pipas[0] = BD.pipas[1] = BD.pipas[2] = 1;
            updateBD();
        }
    }

}*/

function convertDinheiro(n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function setMaisUm(_x, _y, _z, morreu){

    var mais = new THREE.Mesh(
        new THREE.PlaneGeometry(parseInt(103/4.5), parseInt(88/4.5), 1, 1), 
        new THREE.MeshBasicMaterial({
            map:getTextureLoader( ((morreu == undefined) ? 'img/+1.png' : 'img/-1.png') ),
            transparent:true,
            side:THREE.DoubleSide
        })
    );
    mais.material.map.minFilter = THREE.LinearFilter;//remove MSG err console (image is not power of two)
    mais.position.set(_x, _y, _z);
    mais.lookAt(camera.position);
    mais.renderOrder = 5;
    scene.add(mais);

    TweenMax.to(mais.position, 0.9, {
        //delay:1,
        y:_y + 30,
        alpha:0,
        ease:Cubic.easeOut,
        onComplete:function(){
            removeScene(mais);
            mais = undefined;
        }
    });


}

function murchar_2_3(geo, vel){
    geo.vertices[5].x = geo.vertices[10].x = -15 + vel;
    geo.vertices[6].x = geo.vertices[11].x = -7.5 + vel;
    //geo.vertices[7].x = geo.vertices[12].x = 0;
    geo.vertices[8].x = geo.vertices[13].x = 7.5 - vel;
    geo.vertices[9].x = geo.vertices[14].x = 15 - vel;
    geo.verticesNeedUpdate = true;
}

function murchar_3(geo, vel){
    geo.vertices[10].x = -15 + vel;
    geo.vertices[11].x = -7.5 + vel;
    //geo.vertices[12].x = 0;
    geo.vertices[13].x = 7.5 - vel;
    geo.vertices[14].x = 15 - vel;
    geo.verticesNeedUpdate = true;
}

function murchar_4(geo, vel){
    geo.vertices[15].x = -15 + vel;
    geo.vertices[16].x = -7.5 + vel;
    //geo.vertices[17].x = 0;
    geo.vertices[18].x = 7.5 - vel;
    geo.vertices[19].x = 15 - vel;
    geo.verticesNeedUpdate = true;
}

function murchar_3_4(geo, vel){
    geo.vertices[10].x = geo.vertices[15].x = -15 + vel;
    geo.vertices[11].x = geo.vertices[16].x = -7.5 + vel;
    //geo.vertices[12].x = geo.vertices[17].x = 0;
    geo.vertices[13].x = geo.vertices[18].x = 7.5 - vel;
    geo.vertices[14].x = geo.vertices[19].x = 15 - vel;
    geo.verticesNeedUpdate = true;
}

function murchar_1_2_3(geo, vel){
    geo.vertices[0].x = geo.vertices[5].x = geo.vertices[10].x = -15 + vel;
    geo.vertices[1].x = geo.vertices[6].x = geo.vertices[11].x = -7.5 + vel;
    //geo.vertices[2].x = geo.vertices[7].x = geo.vertices[12].x = 0;
    geo.vertices[3].x = geo.vertices[8].x = geo.vertices[13].x = 7.5 - vel;
    geo.vertices[4].x = geo.vertices[9].x = geo.vertices[14].x = 15 - vel;
    geo.verticesNeedUpdate = true;
}

function murchar_sput(geo, vel){
    geo.vertices[15].x = -15 + vel * 1.5;
    //geo.vertices[16].x = -7.5 + vel;
    //geo.vertices[17].x = 0;
    //geo.vertices[18].x = 7.5 - vel;
    geo.vertices[19].x = 15 - vel * 1.5;

    geo.vertices[20].x = -15 + vel * 2.2;
    geo.vertices[21].x = -7.5 + vel;
    //geo.vertices[22].x = 0;
    geo.vertices[23].x = 7.5 - vel;
    geo.vertices[24].x = 15 - vel * 2.2;

    geo.verticesNeedUpdate = true;
}

function murchar_caixao(geo, vel){

    geo.vertices[10].x = geo.vertices[15].x = -15 + vel;
    geo.vertices[11].x = geo.vertices[16].x = -7.5 + vel;
    //geo.vertices[12].x = //geo.vertices[17].x = 0;
    geo.vertices[13].x = geo.vertices[18].x = 7.5 - vel;
    geo.vertices[14].x = geo.vertices[19].x = 15 - vel;

    geo.vertices[20].x = -15 + vel * 2.0;
    geo.vertices[21].x = -7.5 + vel * 1.0;
    //geo.vertices[22].x = 0;
    geo.vertices[23].x = 7.5 - vel * 1.0;
    geo.vertices[24].x = 15 - vel * 2.0;

    geo.verticesNeedUpdate = true;
}

function murchar_joystick(geo, vel){

    geo.vertices[10].x = -15 + vel * 1.6;
    //geo.vertices[11].x = -7.5 + vel;
    //geo.vertices[12].x = 0;
    //geo.vertices[13].x = 7.5 - vel;
    geo.vertices[14].x = 15 - vel * 1.6;

    geo.vertices[15].x = -15 + vel * 2.5;
    geo.vertices[16].x = -7.5 + vel * 1;
    //geo.vertices[17].x = 0;
    geo.vertices[18].x = 7.5 - vel * 1;
    geo.vertices[19].x = 15 - vel * 2.5;

    geo.vertices[20].x = -15 + vel * 2.5;
    geo.vertices[21].x = -7.5 + vel * 1.7;
    //geo.vertices[22].x = 0;
    geo.vertices[23].x = 7.5 - vel * 1.7;
    geo.vertices[24].x = 15 - vel * 2.5;

    geo.verticesNeedUpdate = true;
}

function cloneObj(obj){
    return Object.assign({}, obj);
}

function quad3dColision(a, b){

    //http://devdoc.net/web/developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection.html
    var pode = false;
    if(a.z1 <= b.z2 && a.z2 >= b.z1) {//começar pelo z
        if(a.x1 <= b.x2 && a.x2 >= b.x1) {
            if(a.y1 <= b.y2 && a.y2 >= b.y1){
                pode = true;
            }
        }
    }
    return pode;

}

function quad3dColisionForce(a, b){

    //http://devdoc.net/web/developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection.html

    var pode = false;
    if(a.z1 <= b.z2 && a.z2 >= b.z1 || a.z2 <= b.z1 && a.z1 >= b.z2){//começar pelo z
        if(a.x1 <= b.x2 && a.x2 >= b.x1 || a.x2 <= b.x1 && a.x1 >= b.x2){
            if(a.y1 <= b.y2 && a.y2 >= b.y1 || a.y2 <= b.y1 && a.y1 >= b.y2){
                pode = true;
            }
        }
    }
    return pode;

}

function quad3dColision_XZ(a, b){

    //http://devdoc.net/web/developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection.html

    var pode = false;
    if(a.z1 <= b.z2 && a.z2 >= b.z1 || a.z2 <= b.z1 && a.z1 >= b.z2){//começar pelo z
        if(a.x1 <= b.x2 && a.x2 >= b.x1 || a.x2 <= b.x1 && a.x1 >= b.x2){
            //if(a.y1 <= b.y2 && a.y2 >= b.y1 || a.y2 <= b.y1 && a.y1 >= b.y2){
                pode = true;
            //}
        }
    }
    return pode;

}

function quad3dColisionPos(a, b){

    //http://devdoc.net/web/developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection.html
    var pode = false;
    if(a.z <= b.z && a.z >= b.z) {//começar pelo z
        if(a.x <= b.x && a.x >= b.x) {
            if(a.y <= b.y && a.y >= b.y){
                pode = true;
            }
        }
    }
    return pode;

}

function colision(pipaA, pipaB){

    //console.clear();
    //console.log(pipaA.morreu, pipaB.morreu);

    if(pipaA.line != undefined && pipaB.line != undefined && pipaA.pipa != undefined && pipaB.pipa != undefined && pipaA.perso != undefined && pipaB.perso != undefined){
    
        if(quad3dColisionForce(pipaA.quad, pipaB.quad)){//important reduz processing

            var MovingCube = pipaA.line,
            originPoint = MovingCube.position.clone(),
            //tot = MovingCube.geometry.vertices.length;
            
            tot = 10;//MANUAL VERTICES LINHA **** !IMPORTANT reduz processing

            while(tot--) {

                //var localVertex = MovingCube.geometry.vertices[tot].clone(),
                //var globalVertex = MovingCube.geometry.vertices[tot].clone().applyMatrix4( MovingCube.matrix ),
                var directionVector = MovingCube.geometry.vertices[tot].clone().applyMatrix4( MovingCube.matrix ).sub( MovingCube.position ),
                ray = new THREE.Raycaster( originPoint, directionVector.normalize() ),
                collisionResults = ray.intersectObjects( [pipaB.line], true );

                if(collisionResults.length > 0){
                    

                    //Inteligenc... correção Bug - confirm se os vertices estão próximos
                    var vec1 = MovingCube.geometry.vertices[tot].clone(),
                    vec2 = collisionResults[0].point;

                    if(Math.abs(vec1.x - vec2.x) < 50 && Math.abs(vec1.y - vec2.y) < 50 && Math.abs(vec1.z - vec2.z) < 50){
                    //if(a < 45 || (contX < 38 && contY < 38 && contZ < 38) ){//if( a < 75 && a > -75 ){
                    
                        
                        var pipaCortou = undefined, 
                        pipaVoou = undefined,
                        
                        //x1 = pipaA.movPipa.a.x - pipaA.movPipa.b.x,
                        //y1 = pipaA.movPipa.a.y - pipaA.movPipa.b.y,
                        //z1 = pipaA.movPipa.a.z - pipaA.movPipa.b.z,

                        //x2 = pipaB.movPipa.a.x - pipaB.movPipa.b.x,
                        //y2 = pipaB.movPipa.a.y - pipaB.movPipa.b.y,
                        //z2 = pipaB.movPipa.a.z - pipaB.movPipa.b.z,

                        ptsPipaA = 0,
                        ptsPipaB = 0,

                        distanceA = (pipaA.distance - pipaA.pipa.position.distanceTo( pipaA.perso.position )),
                        distanceB = (pipaB.distance - pipaB.pipa.position.distanceTo( pipaB.perso.position ));
                        

// ========================================================
                        
                        var pipaVenceu = relo(pipaA, pipaB);
                        
                        if(pipaVenceu != undefined){
                            
                            /*
                            //pipa não morre

                            var pipaMorreu = ((pipaPontuar == _pipaA) ? _pipaB : _pipaA);
                            pipaMorreu.setMorreu(collisionResults[0].point, collisionResults[0].index);
                            if(!pipaMorreu.pipaPrincipal){
                                pipaMorreu.morreu = true;
                                clearTimeout(pipaMorreu.timeout);
                                pipaMorreu.timeout = setTimeout(function(){pipaMorreu.morreu = false}, 2000);
                            }else{
                                pipaMorreu.setMorreu();
                            }
                            return;break;
                            */


                            if(pipaVenceu == pipaA){
                                pipaCortou = pipaA;
                                pipaVoou = pipaB;
                            }else{
                                pipaCortou = pipaB;
                                pipaVoou = pipaA;
                            }


                            if(type == 'online'){

                                var p = pipasName[pipaVoou.getPerso.name].paiPipa.pipa.position;
                                socket.emit('voou', {
                                    voou:pipaVoou.getPerso.name, 
                                    x:Math.round(p.x), //pos pipas
                                    y:Math.round(p.y), 
                                    z:Math.round(p.z),
                                    _x:Math.round(collisionResults[0].point.x), //pos corte
                                    _y:Math.round(collisionResults[0].point.y),
                                    _z:Math.round(collisionResults[0].point.z),
                                    cortou:pipaCortou.getPerso.name
                                });
                                
                                return;
                            }

//========================== Especial ======================================================================================
                            
                            /*if(pipaA.pipaPrincipal || pipaB.pipaPrincipal){//se cruzo for da pipa principal

                                //==========
                                if(pipaA.pipaPrincipal){
                                    if(pipaA == resultRelo.venceu.pipa){
                                        var resultPipaA = resultRelo.venceu;
                                        var resultPipaB = resultRelo.perdeu;
                                    }else{
                                        var resultPipaB = resultRelo.venceu;
                                        var resultPipaA = resultRelo.perdeu;
                                    }
                                }

                                if(pipaB.pipaPrincipal){
                                    if(pipaB == resultRelo.venceu.pipa){
                                        var resultPipaB = resultRelo.venceu;
                                        var resultPipaA = resultRelo.perdeu;
                                    }else{
                                        var resultPipaA = resultRelo.venceu;
                                        var resultPipaB = resultRelo.perdeu;
                                    }
                                }
                                //=======
                                
                                var htmlEspecial = '<div id="especial"><img src="img/pipas/'+arrPipas[resultPipaA.pipa.id].img+'.png" class="icoPipa1" />'+resultPipaA.tipoCorte+'<b class="b1">'+resultPipaA.dir+'</b><div class="vs"></div><b class="b2">'+resultPipaB.dir+'</b>'+resultPipaB.tipoCorte+'<img src="img/pipas/'+arrPipas[resultPipaB.pipa.id].img+'.png" class="icoPipa2" /></div>';
                                $('#especial').remove();
                                $('body').append(htmlEspecial);
                                TweenMax.from($('#especial').eq(0), 0.3, { delay:0.4, css:{top:'-=80px'}, ease:Cubic.easeOut });
                                //setTimeout(function(){$('#especial').remove();}, 4500);
                                
                            }*/

//==========================================================================================================================

                            if(pipaCortou.pipaPrincipal || type == 'twoPlayer'){
                                
                                playSom('cortou', 1);
                                
                                setTimeout(function(){
                                    setMaisUm(collisionResults[0].point.x, collisionResults[0].point.y, collisionResults[0].point.z);
                                    playSom('cortou/'+getSomCortou(), 1);
                                }, 200);
                                //if(pipaCortou.pipaPrincipal || (singlePlayer && pipaCortou == persos[0].paiPipa) ){
                                
                                if(type == 'festival'){
                                    placarFestival.cortou++;
                                    //BD.dinheiro += 0.50;
                                    updateBD();
                                }
                                
                            }else{
                                //voou
                                
                                if(pipaVoou.pipaPrincipal){
                                    setTimeout(function(){
                                        if(type == 'festival') {
                                            //setMsg('Cortou ' + placarFestival.cortou + ' com essa pipa!<br>Vc e mto pato!!<br><center><img src="img/pato.png" height="80"></center>', 5000);
                                            //setMsg('Cortou ' + placarFestival.cortou + ' com essa pipa!', 3000);
                                            placarFestival.cortou = 0;
                                        }
                                        setMaisUm(collisionResults[0].point.x, collisionResults[0].point.y, collisionResults[0].point.z, true);
                                        playSom('cortou/'+getSomCortou(), 0.7);
                                    }, 200);
                                }
                            }

                            if(type == 'festival') updatePlacarFestival();
                            
                            pipaVoou.setMorreu(collisionResults[0].point, collisionResults[0].index, pipaCortou);
                            if(!(type == 'twoPlayer' && !singlePlayer)) gritoDelay(true);//evita dois sons ao msm tempo

                        }else{
                            console.log('DEU ALGO ERRADO!');
                            //console.log('DEU ALGUM ERRO!! MTOOOOOOOOO ESTRANHO!! dirPipaA:', dirPipaA, 'dirPipaB:', dirPipaB, 'pipaA_status:',pipaA_status,'pipaB_status:',pipaB_status);
                        }

                        
                        break;
                    }

                }

            }

        }

    }
















    /*


    //================= Calculo para ver quem cortou                    
                    
                        var debug = '',
                        debugar = false;

                        if(pipaA.disbicando){
                            if(new Date().getTime() - pipaA.disbicando < 200){
                                if(debugar) debug += '<aa>+0.3 Pipa A</aa> - TENTEIO CORRETO<br>';
                                ptsPipaA += 0.3;
                            }
                        }
                        if(pipaB.disbicando){
                            if(new Date().getTime() - pipaB.disbicando < 200){
                                if(debugar) debug += '<bb>+0.3 Pipa B</bb> - TENTEIO CORRETO<br>';
                                ptsPipaB += 0.3;
                            }
                        }

                        //MAO PARADA
                        if(!pipaA.disbicando){
                            if(distanceA > -0.07 && distanceA < 0.07){
                                if(debugar) debug += '<bb>+3 Pipa B</bb> - Pipa A MAO PARADA<br>';
                                ptsPipaB += 3;
                            }
                        }
                        if(!pipaB.disbicando){
                            if(distanceB > -0.07 && distanceB < 0.07){
                                if(debugar) debug += '<aa>+3 Pipa A</aa> - Pipa B MAO PARADA<br>';
                                ptsPipaA += 3;
                            }
                        }

                        //ESTA SE MOVENDO
                        if(distanceA < -0.07 || distanceA > 0.07){
                            if(debugar) debug += '<aa>+0.5 Pipa A</aa> - SE MOVENDO<br>';
                            ptsPipaA += 0.5;
                        }
                        if(distanceB < -0.07 || distanceB > 0.07){
                            if(debugar) debug += '<bb>+0.5 Pipa B</bb> - SE MOVENDO<br>';
                            ptsPipaB += 0.5;
                        }

                        //OS DOIS DESCARREGANDO
                        if(distanceA < -0.07 && distanceB < -0.07){
                            if(distanceA < distanceB){
                                if(debugar) debug += '<aa>+1 Pipa A</aa> - VENCEU COM OS DOIS DESCARREGANDO<br>';
                                ptsPipaA += 1;
                            }else{
                                if(debugar) debug += '<bb>+1 Pipa B</bb> - VENCEU COM OS DOIS DESCARREGANDO<br>';
                                ptsPipaB += 1;
                            }
                        }
                        //OS DOIS PUXANDO
                        if(distanceA > 0.07 && distanceB > 0.07){
                            if(distanceA > distanceB){
                                if(debugar) debug += '<aa>+1 Pipa A</aa> - VENCEU COM OS DOIS PUXANDO<br>';
                                ptsPipaA += 1;
                            }else{
                                if(debugar) debug += '<bb>+1 Pipa B</bb> - VENCEU COM OS DOIS PUXANDO<br>';
                                ptsPipaB += 1;
                            }
                        }
                        //PIPAA PUXANDO E PIPAB DESCARREGANDO
                        if(distanceB < -0.07 && distanceA > 0.07){
                            if(Math.abs(distanceA) > Math.abs(distanceB)){
                                if(debugar) debug += '<aa>+1 Pipa A</aa> - PUXANDO MAIS RAPIDO Q PIPA B DESCARREGANDO<br>';
                                ptsPipaA += 1;
                            }else{
                                if(debugar) debug += '<bb>+1 Pipa B</bb> - DESCARREGOU MAIS RAPIDO Q PIPA A PUXANDO<br>';
                                ptsPipaB += 1;
                            }
                        }

                        //PIPAB PUXANDO E PIPAA DESCARREGANDO
                        if(distanceA < -0.07 && distanceB > 0.07){
                            if(Math.abs(distanceA) > Math.abs(distanceB)){
                                if(debugar) debug += '<aa>+1 Pipa A</aa> - DESCARREGOU MAIS RAPIDO Q PIPA B PUXANDO<br>';
                                ptsPipaA += 1;
                            }else{
                                if(debugar) debug += '<bb>+1 Pipa B</bb> - PUXANDO MAIS RAPIDO Q PIPA A DESCARREGANDO<br>';
                                ptsPipaB += 1;
                            }
                        }
                        

                        if(collisionResults[0].point.distanceTo(pipaA.pipa.position) < 100){
                            if(debugar) debug += '<bb>+1 Pipa B</bb> - PIPA A TOMOU CABRESTO<br>';
                            ptsPipaB += 1;
                        }
                        if(collisionResults[0].point.distanceTo(pipaB.pipa.position) < 100){
                            if(debugar) debug += '<aa>+1 Pipa A</aa> - PIPA B TOMOU CABRESTO<br>';
                            ptsPipaA += 1;
                        }
                        if(pipaA.distance > 180){//tem q estar distante p/ tomar no dedo
                            if(collisionResults[0].point.distanceTo(pipaA.perso.position) < 150){
                                if(debugar) debug += '<bb>+1 Pipa B</bb> - PIPA A TOMOU NO DEDO<br>';
                                ptsPipaB += 0.4//1;
                            }
                        }
                        if(pipaB.distance > 180){//tem q estar distante p/ tomar no dedo
                            if(collisionResults[0].point.distanceTo(pipaB.perso.position) < 150){
                                if(debugar) debug += '<aa>+1 Pipa A</aa> - PIPA B TOMOU NO DEDO<br>';
                                ptsPipaA += 0.4//1;
                            }
                        }

                        //random p/ nunca emptara
                        (Math.random() < 0.5) ? ptsPipaA += 0.1 : ptsPipaB += 0.1;

                        //console.log( collisionResults[0].point.distanceTo(pipaB.perso.position)  );
                        //console.log( collisionResults[0].point.distanceTo(pipaA.pipa.position) );
                        //console.log('distanceA: '+ distanceA + ' distanceB: ' + distanceB);
                        //console.log('ptsPipaA: '+ptsPipaA + ' ptsPipaB: ' + ptsPipaB);
                        //console.log(collisionResults[0].point);

                        if(debugar) {
                            debug += '<br><aa>Pipa A: '+ptsPipaA + '</aa> <bb>Pipa B: ' + ptsPipaB + '</bb>'; 
                            setTimeout(function(){
                                setMsg('<aside>'+debug+'</aside>', 11000);
                            }, 1000);
                            //return;
                        }


                        //FORCE PIPA PRINCIPAL SEMPRE VENCER
                        //if(pipaA.pipaPrincipal) ptsPipaA = 10000000;
                        //if(pipaB.pipaPrincipal) ptsPipaB = 10000000;


    //=========================================== 
                        if(ptsPipaA == ptsPipaB){
                            //se empatar a pipa mais longe vence
                            if( collisionResults[0].point.distanceTo(pipaA.pipa.position) > collisionResults[0].point.distanceTo(pipaB.pipa.position) ){
                                if(debugar) debug += '<aa>EMPATOU EM PTS</aa> - PIPA A VENCEU<br>';
                                pipaCortou = pipaA;
                                pipaVoou = pipaB;
                            }else{
                                if(debugar) debug += '<bb>EMPATOU EM PTS</bb> - PIPA A VENCEU<br>';
                                pipaCortou = pipaB;
                                pipaVoou = pipaA;
                            }
                            
                        
                        }else if(ptsPipaA > ptsPipaB){
                            pipaCortou = pipaA;
                            pipaVoou = pipaB;
                        }else{
                            pipaCortou = pipaB;
                            pipaVoou = pipaA;
                        }


                        if(type == 'online'){

                            var p = pipasName[pipaVoou.getPerso.name].paiPipa.pipa.position;
                            socket.emit('voou', {
                                voou:pipaVoou.getPerso.name, 
                                x:Math.round(p.x), //pos pipas
                                y:Math.round(p.y), 
                                z:Math.round(p.z),
                                _x:Math.round(collisionResults[0].point.x), //pos corte
                                _y:Math.round(collisionResults[0].point.y),
                                _z:Math.round(collisionResults[0].point.z),
                                cortou:pipaCortou.getPerso.name
                            });
                            
                            return;
                        }

                        if(pipaCortou.pipaPrincipal || type == 'twoPlayer'){
                            
                            playSom('cortou', 1);
                            
                            setTimeout(function(){
                                setMaisUm(collisionResults[0].point.x, collisionResults[0].point.y, collisionResults[0].point.z);
                                playSom('cortou/'+getSomCortou(), 1);
                            }, 200);
                            //if(pipaCortou.pipaPrincipal || (singlePlayer && pipaCortou == persos[0].paiPipa) ){
                            
                            if(type == 'festival'){
                                placarFestival.cortou++;
                                BD.dinheiro += 0.50;
                                updateBD();
                            }
                            
                        }else{
                            //voou
                            
                            if(pipaVoou.pipaPrincipal){
                                setTimeout(function(){
                                    if(type == 'festival') {
                                        //setMsg('Cortou ' + placarFestival.cortou + ' com essa pipa!<br>Vc e mto pato!!<br><center><img src="img/pato.png" height="80"></center>', 5000);
                                        //setMsg('Cortou ' + placarFestival.cortou + ' com essa pipa!', 3000);
                                        placarFestival.cortou = 0;
                                    }
                                    setMaisUm(collisionResults[0].point.x, collisionResults[0].point.y, collisionResults[0].point.z, true);
                                    playSom('cortou/'+getSomCortou(), 0.7);
                                }, 200);
                            }
                        }

                        if(type == 'festival') updatePlacarFestival();
                        
                        pipaVoou.setMorreu(collisionResults[0].point, collisionResults[0].index);
                        if(!(type == 'twoPlayer' && !singlePlayer)) gritoDelay(true);//evita dois sons ao msm tempo

                        //console.log(collisionResults[0], collisionResults[0].index, tot);
                        //console.log(objA, objB);
                        
                        break;
                        
                    }


                }

            }

        }

    }
    */

}

function rabiolaColidiu(pipaA, pipaB){

    /*if(Math.random() < 0.07){
        console.clear();
        console.log('TESTANDO COLIDIU');
    }*/

    if(pipaA.line != undefined && pipaB.lineRabi != undefined){

        var MovingCube = pipaB.lineRabi,
        originPoint = MovingCube.position.clone(),
        //tot = MovingCube.geometry.vertices.length;
        tot = pipaB.totFitasRabiola;
        if(tot > 10) tot = 10;

        while(tot--) {
                
            var localVertex = MovingCube.geometry.vertices[tot].clone(),
            globalVertex = localVertex.applyMatrix4( MovingCube.matrix ),
            directionVector = globalVertex.sub( MovingCube.position ),
            ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() ),
            collisionResults = ray.intersectObjects( [pipaA.line] );


            if(collisionResults.length > 0){
                
                //Inteligen MASTER correção Bug - confirm se os vertices estão proximos
                var vec1 = MovingCube.geometry.vertices[tot].clone(),
                vec2 = collisionResults[0].point;

                if(Math.abs(vec1.x - vec2.x) < 50 && Math.abs(vec1.y - vec2.y) < 50 && Math.abs(vec1.z - vec2.z) < 50){

                    if(type == 'online'){

                        if(pipaA.pipaPrincipal){

                            socket.emit('pipa', {
                                    s:'aparou',
                                    n:pipaA.getPerso.name,//pipa q aparou
                                    d:pipaB.getPerso.name,//pipa q foi aparada
                                    t:tot,//tot
                                    c:collisionResults[0].index,//collision index
                                    i:pipaB.contPipaOnline//id da pipa
                                }
                            );

                            //console.log('EMITOUUU',pipaA,pipaA.getPerso.name,pipaB,pipaB.getPerso.name,tot,collisionResults[0].index);

                        }

                        return;

                    }
                    
                    pipaB.setAparou(pipaA, tot, collisionResults[0].index);
                    break;
                }

            }

            tot--;//pulando 1 item dimunir processing
            if(tot <= 2) break;//somente as primeiras fitinhas da rabiola

        }

    }


}

function deceparColidiu(pipaA, pipaB){

    var MovingCube = pipaB.pipa1,
    originPoint = MovingCube.position.clone(),
    tot = MovingCube.geometry.vertices.length;

    while(tot--) {
            
        var localVertex = MovingCube.geometry.vertices[tot].clone(),
        globalVertex = localVertex.applyMatrix4( MovingCube.matrix ),
        directionVector = globalVertex.sub( MovingCube.position ),
        ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() ),
        collisionResults = ray.intersectObjects( [pipaA.line] );


        if(collisionResults.length > 0){
            
            //Inteligen MASTER correção Bug - confirm se os vertices estão proximos
            var vec1 = MovingCube.geometry.vertices[tot].clone(),
            vec2 = collisionResults[0].point;

            if(Math.abs(vec1.x - vec2.x) < 50 && Math.abs(vec1.y - vec2.y) < 50 && Math.abs(vec1.z - vec2.z) < 50){
                pipaA.setDecepou(pipaB);
                break;
            }

        }

    }

}

function colisionPersoPipa(paiPerso, paiPipa){

    var posPerso = paiPerso.perso.position,
    posPipa = paiPipa.pipa.position;

    var quad1 = { 
        x1:posPerso.x, 
        x2:posPerso.x, 
        z1:posPerso.z, 
        z2:posPerso.z
    };

    var quad2 = { 
        x1:posPipa.x - 30, 
        x2:posPipa.x + 30, 
        z1:posPipa.z - 30, 
        z2:posPipa.z + 30
    };

    if(quad3dColision_XZ(quad1, quad2)){//important reduz processing
        if(paiPerso.pipaPrincipal) playSom('cortou', 1);
        paiPipa.pegouPipa(paiPerso);
    }

}



function playSom(id, volume, force){
    if(BD.som){

        if(!BD.somGrito){
            if(id == 'vai' || id.substr(0,5) == 'delay' || id.substr(0,7) == 'cortou/') return;
        }

        if(volume > 1) volume = 1;
        
        if(volume > 0.02){//se menor ou = a zero nem da o play

            force = ((force == undefined) ? '' : force);
            var nom = sons[id],
            path = getPathAudioId(id);
            //var callStatus = function(){};

            //ANDROID - MEDIA
            /*if(android && startPhonegap){

                try{

                    if(nom == undefined){

                        alert('1:'+id+' 2:'+path);

                        if(id == 'intro'){
                            callStatus = function(status){
                                if(status == 4) {
                                    if(BD.som && BD.somIntro){
                                        var a = getPathAudioId('intro');
                                        sons[a].seekTo(0);
                                        sons[a].play();
                                    }
                                }
                            }
                        }

                        alert(Media);
                        
                        sons[id+force] = new Media(
                            path,
                            function(){alert(sucess);}, 
                            function(error){alert(error);},
                            callStatus
                        );
                        alert('---');

                    }else{
                        //sons[path].stop();
                        sons[id+force].seekTo(0);
                    }

                    sons[id+force].play();

                }catch(err){}


            }else{//BROWSER
            */
                
                if(nom == undefined){
                    var s = document.createElement("audio");
                    s.src = path;
                    s.id = id+force;
                    s.volume = volume;
                    s.autoplay = true;
                    if(id == 'intro') s.loop = true;
                    sons[id+force] = s;
                }else{
                    var s = sons[id+force];
                    if(s != undefined){
                        s.currentTime = 0;
                        s.volume = volume;
                        if(s.currentTime == 0) s.play();//IF evita outro evento pedir pause antes e dar ERRO
                    }
                }

            //}

        }

    }
}

function stopSom(id){
    try{
        if(sons[id] != undefined) sons[id].pause();
    }catch(err){}
}

function getPathAudioId(id){
    /*if(iOS){
        return 'sons/'+id+'.mp3';    
    }else{*/
        //var mypath = location.pathname,
        //idx = mypath.lastIndexOf('/');
        //return mypath.substring(0, idx + 1) + 'sons/'+id+'.mp3';
        //return getPhoneGapPath()+'sons/'+id+'.mp3';//OK = Media
    //}
    return 'sons/'+id+'.mp3';
    
}

//var c = 0;
function clear3D(obj){
    if(obj != undefined){
        while(obj.children.length){
            var a = obj.children[0];
            if(a.children.length > 0) clear3D(a);
            //if(a.parent == scene) console.log(++c);
            dispose3D(a);
            a.parent.remove(a);
            a = undefined;
        }
    }
}



//for each todo itens
function testar(obj){
    if(obj != undefined){
        var tot = obj.children.length;
        while(tot--){
            var a = obj.children[tot];
            a.castShadow = a.receiveShadow = false;

            console.log('castShadow:' ,a.castShadow, 'receiveShadow:' , a.receiveShadow);
            if(a.children.length > 0) testar(a);
            //if(a.parent == scene) console.log(++c);
            
        }
    }
}

function dispose3D(parentObject) {
    parentObject.traverse(function (node) {
        
        //if (node instanceof THREE.Mesh) {

            //console.log(node, (node instanceof THREE.Mesh))

            if (node.geometry) {
                node.geometry.dispose();
                node.geometry = undefined;
            }
            if (node.material) {
                var materialArray;

                if(node.mesh) node.mesh.dispose(); node.mesh = undefined;
                if(node.texture) node.texture.dispose(); node.texture = undefined;

                if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
                    materialArray = node.material.materials;
                }else if(node.material instanceof Array) {
                    materialArray = node.material;
                }
                if(materialArray) {
                    materialArray.forEach(function (mtrl, idx) {
                        if (mtrl.map) mtrl.map.dispose(); mtrl.map = undefined;
                        if (mtrl.lightMap) mtrl.lightMap.dispose(); mtrl.lightMap = undefined;
                        if (mtrl.bumpMap) mtrl.bumpMap.dispose(); mtrl.bumpMap = undefined;
                        if (mtrl.normalMap) mtrl.normalMap.dispose(); mtrl.normalMap = undefined;
                        if (mtrl.specularMap) mtrl.specularMap.dispose(); mtrl.specularMap = undefined;
                        if (mtrl.envMap) mtrl.envMap.dispose(); mtrl.envMap = undefined;
                        mtrl.dispose();
                        mtrl = undefined;
                    });
                }
                else {
                    if (node.material.map) node.material.map.dispose(); node.material.map = undefined;
                    if (node.material.lightMap) node.material.lightMap.dispose(); node.material.lightMap = undefined;
                    if (node.material.bumpMap) node.material.bumpMap.dispose(); node.material.bumpMap = undefined;
                    if (node.material.normalMap) node.material.normalMap.dispose(); node.material.normalMap = undefined;
                    if (node.material.specularMap) node.material.specularMap.dispose(); node.material.specularMap = undefined;
                    if (node.material.envMap) node.material.envMap.dispose();
                    node.material.dispose();
                    node.material = undefined;
                }
            }
        //}
    });
}

function setAlert(msg){
    
    var html = '<div id="info">' +
                '    <nav>' +
                '        <a class="fechar"></a>' +
                '        <aside>' + msg + '</aside>' +
                '    </nav>' +
                '</div>';

    $('body').append(html);
    $('#info .fechar').on(getTap(), function(){
        $('#info').remove();
    });

}

var timeoutConsole = undefined;
function setMsgConsole(msg){
    $('#console').html(msg);
    clearTimeout(timeoutConsole);
    timeoutConsole = setTimeout(function(){
        $('#console').html('');
    }, 3000);
}

function setMsg(msg, delay){

    if(delay == undefined) delay = 3000;

    $('main #msgCenter').remove();
    $('main').append('<div id="msgCenter">' + msg + '</div>');

    clearTimeout(timeoutConsole);
    timeoutConsole = setTimeout(function(){
        $('main #msgCenter').remove();
    }, delay);
    
}

var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";
/*function encodeStr(uncoded) {
  uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
  var coded = "";
  var chr;
  for (var i = uncoded.length - 1; i >= 0; i--) {
    chr = uncoded.charCodeAt(i);
    coded += (chr >= 65 && chr <= 90) ? 
      key.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) :
      String.fromCharCode(chr); 
    }
  return encodeURIComponent(coded);  
}*/
function decodeStr(coded) {
  coded = decodeURIComponent(coded);  
  var uncoded = "";
  var chr;
  for (var i = coded.length - 1; i >= 0; i--) {
    chr = coded.charAt(i);
    uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
      String.fromCharCode(65 + key.indexOf(chr) % 26) :
      chr; 
    }
  return uncoded.toLowerCase();   
}







var vocabulary_pt = {
    online:'Online',//online:'Online<b>BETA</b>',
    //vento:'Vento',
    comprar:'Comprar',
    vender:'Vender',
    txIniPuxar:'PUXAR<br><article>TECLA A ou<br></article>DESLIZE P/ BAIXO',
    txIniDisbicar:'DISBICAR<br><article>TECLA S ou<br></article>TOQUE NA TELA',
    txIniDescarregar:'DESCARREGAR<br><article>TECLA D ou<br></article>DESLIZE P/ CIMA',
    sonsDo:'Sons do jogo:',
    txQuality:'Para melhor desempenho, configure a qualidade de gráfico:<br><span class="qualidade">100%</span>',
    todos:'TODOS',
    gritos:'GRITOS',
    select3pipas:'Selecione 3 pipas',
    selectLine:'Selecione sua linha',
    msgDistante:'DISTANTE DEMAIS PARA JOGAR!',
    msgDistanceAmg:'FIQUE PELO MENOS 7 METROS DE<br>DISTANCIA DO AMIGO PARA EMPINAR',
    msgSemDinheiro:'Sem dinheiro suficiente',
    avalie:'Nos ajude avaliando e dando sugestões<img src="img/estrelas.png" />',
    sim:'Sim',
    nao:'Não',
    bateuParede:'SUA LINHA ARREBENTOU!!<br>CUIDADO para não bater em nenhum item do cenário'
},
vocabulary_en = {
    online:'Multiplayer',
    //vento:'Wind',
    comprar:'Buy',
    vender:'Sell',
    txIniPuxar:'PULL<br><article>KEY A or<br></article>SLIDE DOWN',
    txIniDisbicar:'TO SWING<br><article>KEY S or<br></article>TAP',
    txIniDescarregar:'SEND LINE<br><article>KEY D or<br></article>SLIDE UP',
    sonsDo:'Sounds of the game:',
    txQuality:'For best performance, set the chart quality:<br><span class="qualidade">100%</span>',
    todos:'ALL',
    gritos:'SHOUTING',
    select3pipas:'Select 3 kites',
    selectLine:'Select or line',
    msgDistante:'FAR AWAY TO PLAY!',
    msgDistanceAmg:'STAY AT LEAST 7 METERS FROM<br>DISTANCE FROM THE FRIEND TO BEGIN',
    msgSemDinheiro:'Not enough money',
    avalie:'Help us evaluated and giving suggestions<img src="img/estrelas.png" />',
    sim:'Yes',
    nao:'No',
    bateuParede:'YOUR LINE BROKEN<br>CAUTION for not hitting any scene item'
};

function getVocabulary(v){
    return this['vocabulary_'+BD.lang][v];
}

function updateLanguage(){

    $('#usageAvatar span').html(((usageAvatar) ? getVocabulary('sim') : getVocabulary('nao')));
    
    $('#select .menu .online').html(this['vocabulary_'+BD.lang].online);
    //$('#select .menu .vento span').html(this['vocabulary_'+BD.lang].vento);
    
    $('#comojogar nav div').eq(0).html(this['vocabulary_'+BD.lang].txIniPuxar);
    $('#comojogar nav div').eq(1).html(this['vocabulary_'+BD.lang].txIniDisbicar);
    $('#comojogar nav div').eq(2).html(this['vocabulary_'+BD.lang].txIniDescarregar);

    $('#config .bx h1').html(this['vocabulary_'+BD.lang].sonsDo);
    $('#config .bx h2').html(this['vocabulary_'+BD.lang].txQuality);
    $('#config .bx .icoSom div').html(this['vocabulary_'+BD.lang].todos);
    $('#config .bx .icoSom3 div').html(this['vocabulary_'+BD.lang].gritos);
    $('#select .estrelas').html(this['vocabulary_'+BD.lang].avalie);

    $('#menu .left .lang').removeClass('ativo');
    $('#menu .left .lang.'+BD.lang).addClass('ativo');
    
}

function verificOnline(){


    return true;

    /*var retorno;
    if(desktop){
        retorno = true;
    }else{
        if(iOS || android){
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = false;
            states[Connection.ETHERNET] = true;
            states[Connection.WIFI]     = true;
            states[Connection.CELL_2G]  = true;
            states[Connection.CELL_3G]  = true;
            states[Connection.CELL_4G]  = true;
            states[Connection.CELL]     = true;
            states[Connection.NONE]     = false;

            alert(android)

            if (states[networkState]) {
                retorno = true;
            } else {
                retorno = false;
            }

        }else{
            retorno = window.navigator.onLine;
        }
        if(!retorno) {
            setAlertMsg('Você está offline');
        }
    //}

    return retorno;*/

}

function setMsgChat(m){
    if($('.msgChat').length == 0) $('main').append('<div class="msgChat"></div>')
    $('.msgChat').prepend('<div>'+m+'</div>');
    var obj = $('.msgChat div').eq(0);
    TweenMax.to(obj, 0.4, {delay:10, opacity:0, onComplete:function(a){
        $('.msgChat div').eq($('.msgChat div').length-1).remove();
        if($('.msgChat div').length == 0) $('.msgChat').remove();
    }});
    if($('.msgChat div').length > 4){
        $('.msgChat div').eq($('.msgChat div').length-1).remove();
    }
}

function setAlertMsg(msg){
    $('#popup').remove();
    $('main').append(
        '<div id="popup" class="animated zoomInDown">' +
        '    <div class="tx2">' +
        '        <a class="close"></a>' +
        '        <h1>'+msg+'</h1>' +
        '    </div>' +
        '</div>'
    );
    $('#popup .close').tap(function(){
        $('#popup').remove();
    });
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

function removePopupDelay(){
    //$('#popup, #publicidade').remove();
    //alert('OPA estava desativado!');
    var a = $('#popup, #publicidade');
    TweenMax.to(a, 0.5, {opacity:0, onCompleteParams:[a], onComplete:function(a){
        a.remove();
    } });
}

function setFullscreen() {
    
    var element = document.body;//document.getElementById(id); 

    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    //if (!isInFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
           element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    /*} else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }*/

    setTimeout(function(){
        resize();
    }, 200)

}

/* STATS - stats.js - http://github.com/mrdoob/stats.js */
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.id='stats';c.style.cssText="cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});