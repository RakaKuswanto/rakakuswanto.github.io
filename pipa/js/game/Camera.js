
var left = true,
vecCam = undefined,
posLookAt = new THREE.Vector3(0, 0, 0);

function camTwoPlayer(){

    if(persos.length == 2){

        var paiPipaA = persos[0].paiPipa,
        paiPipaB = persos[1].paiPipa;

        if(vecCam == undefined) camera.position.set(0, 40, 250);

        if(paiPipaA != undefined || paiPipaB != undefined){

            if(vecCam == undefined) vecCam = vec3D.clone();
            var __x, __y, __z, _z, distanciaX, distanciaY;

            if(paiPipaA != undefined && paiPipaB != undefined){
                //calc meio das duas pipas
                __x = (paiPipaA.quad.x2 + paiPipaB.quad.x2) * 0.5;
                __y = (paiPipaA.quad.y2 + paiPipaB.quad.y2) * 0.5;
                __z = (paiPipaA.quad.z2 + paiPipaB.quad.z2) * 0.5;
                distanciaX = Math.abs(((paiPipaA.quad.x2 + paiPipaB.quad.x2) * 0.5) - paiPipaA.quad.x2);
                distanciaY = Math.abs(((paiPipaA.quad.y2 + paiPipaB.quad.y2) * 0.5) - paiPipaA.quad.y2);
                

                /*if(distanciaX > distanciaY){
                    _z = 430 + (distanciaX * 1.8);// + (distanciaY * 1.8);
                }else{
                    _z = 430 + (distanciaY * 2.4);// + (distanciaY * 1.8);
                }*/

                _z = (paiPipaA.quad.z2 > paiPipaB.quad.z2) ? paiPipaA.quad.z2 + 250 : paiPipaB.quad.z2 + 250;
                _z += (distanciaX * 1.4) + (distanciaY * 1.4);

                
            }else{
                //calc somente uma pipa no alto
                var pipa = ((paiPipaA != undefined && paiPipaB == undefined) ? paiPipaA : paiPipaB);
                __x = pipa.quad.x2;
                __y = pipa.quad.y2;
                __z = pipa.quad.z2;
                _z = 480;
            }

            //apenas p/ não pular usar delay p/ lookAt
            vecCam.x = getDelay(vecCam.x, __x, 30);
            vecCam.y = getDelay(vecCam.y, __y, 30);
            vecCam.z = getDelay(vecCam.z, __z, 30);

        }

        if(vecCam == undefined){
            camera.position.set( 0, 40, 720 );
        }else{
            if(paiPipaA != undefined || paiPipaB != undefined){
                camera.position.set( 0, 30, getDelay(camera.position.z, _z, 40) );
                camera.lookAt(vecCam);
            }
        }

    }

}

function camAndandoPerso(){

    //return;

    if(paiPipaPrincipal != undefined && paiPipaPrincipal.perso != undefined){

        var _x = paiPipaPrincipal.perso.position.x,
        _y = paiPipaPrincipal.perso.position.y + 74;


        
        //paiPipaPrincipal.perso.rotation.y = 0;//paiPipaPrincipal.perso.rotation.x + (0 - paiPipaPrincipal.perso.rotation.x) / 40;
        //console.log(paiPipaPrincipal.perso.rotation.y);
        //_x = 0;




        camera.position.set(_x, _y, paiPipaPrincipal.perso.position.z);
        camera.translateZ( 190 );
        controls.target.set(_x, _y, paiPipaPrincipal.perso.position.z);

        //camera.lookAt(paiPipaPrincipal.perso.position);
        //console.log(camera.rotation)

        if(!controlsUsage){
            camera.rotation.x = camera.rotation.x + (de2ra(0) - camera.rotation.x) / 20;
            camera.rotation.y = camera.rotation.y + (0 - camera.rotation.y) / 20;
            camera.rotation.z = camera.rotation.z + (0 - camera.rotation.z) / 20;
        }

    }

}

function setCameraAutoDirect(){

    cameraTypeFunc = undefined; 
    
    if(paiPipaPrincipal != undefined && paiPipaPrincipal.perso != undefined){
        camera.position.x = paiPipaPrincipal.perso.position.x;
        camera.position.y = 50;
        camera.position.z = paiPipaPrincipal.perso.position.z + 270;
        
        controls.target.x = paiPipaPrincipal.perso.position.x;
        controls.target.y = camYini;
        controls.target.z = paiPipaPrincipal.perso.position.z;

        controls.update();
    }

}

function setCameraAuto(){

    controls.enabled = true;
    cameraTypeFunc = undefined; 

    /*TweenMax.to(camera.position, 1, { 
        overwrite:1,
        x: paiPipaPrincipal.perso.position.x,
        y: paiPipaPrincipal.perso.position.y + 50,
        z: paiPipaPrincipal.perso.position.z + 270
    });

    TweenMax.to(controls.target, 1, { 
        overwrite:1,
        x: paiPipaPrincipal.perso.position.x,
        y: paiPipaPrincipal.perso.position.y + 50,
        z: paiPipaPrincipal.perso.position.z,
        onUpdate:controls.update
    });*/

}

function cam1(){//primeira pessoa default pipa no alto

    var paiPipa = paiPipaPrincipal.paiPipa;
    if(paiPipa != undefined){

        var calcX = paiPipa.quad.x1 - paiPipa.quad.x2,
        calcZ = paiPipa.quad.z1 - paiPipa.quad.z2;
        vai = 85,
        vaiY = paiPipa.quad.y1 + 40;
        
        if(left){
            if(calcX > 105) left = false;
        }else{
            vai = -95;
            if(calcX < -105) left = true;
        }

        //vaiY
        if(calcZ < 190) vaiY = paiPipa.quad.y1 + 80;

        var tt = paiPipa.line.geometry.vertices[7].clone();
        tt.y += 50;

        
        //=== LOOAK - DELAY
        posLookAt.x = getDelay(posLookAt.x, paiPipa.quad.x2, 25);
        posLookAt.y = getDelay(posLookAt.y, paiPipa.quad.y2, 25);
        posLookAt.z = getDelay(posLookAt.z, paiPipa.quad.z2, 25);
        camera.lookAt(posLookAt);//paiPipa.pipa.position;    
        ///===




        var a = getPositionMatrixWordSum(0, 0, paiPipa.distance + 270/*170*/, paiPipa.pipa);
        camera.position.x = getDelay(camera.position.x, a.x + vai, 70);
        camera.position.y = getDelay(camera.position.y, vaiY, 70);
        camera.position.z = getDelay(camera.position.z, a.z, 80);
        

    }

}

function cam2(){//frente perso
    var paiPipa = paiPipaPrincipal.paiPipa;
    if(paiPipa != undefined){


        //=== LOOAK - DELAY
        posLookAt.x = getDelay(posLookAt.x, paiPipa.quad.x2, 25);
        posLookAt.y = getDelay(posLookAt.y, paiPipa.quad.y2, 25);
        posLookAt.z = getDelay(posLookAt.z, paiPipa.quad.z2, 25);
        camera.lookAt(posLookAt);//paiPipa.pipa.position;    
        ///===
        
        
        
        if(!controlsUsage){
            camera.position.x = getDelay(camera.position.x, paiPipaPrincipal.perso.position.x - 5, 80);
            camera.position.y = getDelay(camera.position.y, paiPipa.quad.y1 + 40, 30);
            camera.position.z = getDelay(camera.position.z, paiPipaPrincipal.perso.position.z + 45, 30);
        }
        //camera.position.set(paiPipaPrincipal.perso.position.x - 5, paiPipa.quad.y1 + 30, paiPipaPrincipal.perso.position.z - 15);
    }
}

function cam3(){//meio linha

    var paiPipa = paiPipaPrincipal.paiPipa;
    if(paiPipa != undefined){

        //=== LOOAK - DELAY
        posLookAt.x = getDelay(posLookAt.x, paiPipa.quad.x2, 25);
        posLookAt.y = getDelay(posLookAt.y, paiPipa.quad.y2, 25);
        posLookAt.z = getDelay(posLookAt.z, paiPipa.quad.z2, 25);
        camera.lookAt(posLookAt);//paiPipa.pipa.position;    
        ///===

        var a = paiPipa.line.geometry.vertices[5];
        camera.position.x = getDelay(camera.position.x, a.x, 180);
        camera.position.y = getDelay(camera.position.y, a.y + 30, 180);
        camera.position.z = getDelay(camera.position.z, a.z, 30);
    }

}

function cam4(){//tras
    var paiPipa = paiPipaPrincipal.paiPipa;
    if(paiPipa != undefined){

        //=== LOOAK - DELAY
        posLookAt.x = getDelay(posLookAt.x, paiPipa.quad.x2, 25);
        posLookAt.y = getDelay(posLookAt.y, paiPipa.quad.y2, 25);
        posLookAt.z = getDelay(posLookAt.z, paiPipa.quad.z2, 25);
        camera.lookAt(posLookAt);//paiPipa.pipa.position;    
        ///===
        
        var a = getPositionMatrixWordSum(0, 0, -270, paiPipa.pipa);
        camera.position.x = getDelay(camera.position.x, a.x, 30);
        camera.position.y = getDelay(camera.position.y, paiPipa.pipa.position.y + 90, 30);
        camera.position.z = getDelay(camera.position.z, a.z, 30);
    }
}

function camTrasVerBalao(){//tras
    var balao = baloes[0];
    if(balao != undefined){
        //=== LOOAK - DELAY
        posLookAt.x = getDelay(posLookAt.x, balao.position.x, 125);
        posLookAt.y = getDelay(posLookAt.y, balao.position.y, 125);
        posLookAt.z = getDelay(posLookAt.z, balao.position.z, 125);
        camera.lookAt(posLookAt);//paiPipa.pipa.position;    
        ///===
        
        if(!controlsUsage){
            camera.position.x = getDelay(camera.position.x, 0, 180);
            camera.position.y = getDelay(camera.position.y, 40, 130);
            camera.position.z = getDelay(camera.position.z, 0, 130);
        }
    }
}