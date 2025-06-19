function addPos3DobjArr(obj){

	var _x = obj.geometry.parameters.width * 0.5,
	_y = obj.geometry.parameters.height * 0.5,
	_z = obj.geometry.parameters.depth * 0.5;

	return { 
        x1:obj.position.x - _x, 
        x2:obj.position.x + _x, 
        y1:obj.position.y - _y, 
        y2:obj.position.y + _y, 
        z1:obj.position.z - _z, 
        z2:obj.position.z + _z
	}

}

function setPanoramic(){
	cenario.scale.set(0.15, 0.15, 0.15);
	cenario.position.y = -10;//ajusta risco união chão cenario
	
	//RESOLVE BUG CENARIO com RANDOOM E COD ABAIXO
	//if(mobile){
		//var r = Math.random() * 10000;
		//cenario.children[0].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/1.png?' + r ) } ).map;
		//cenario.children[1].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/2.png?' + r ) } ).map;
		//cenario.children[2].material.map = new THREE.MeshBasicMaterial( { map:new THREE.TextureLoader().load( 'models/panoramic/img/3.png?' + r ) } ).map;
	//}
	

	//CRISTO
	if(cristo == undefined){
		
	    cristo = new THREE.Mesh(new THREE.PlaneGeometry(794*5, 555*5, 1, 1), new THREE.MeshBasicMaterial({
			map:getTextureLoader('img/cristo.png'),
			transparent:true,
			depthWrite:false,
			side:THREE.FrontSide
		}));
	    if(noturno){
			cristo.material.transparent = true;
			cristo.material.opacity = 0.6;
		}

	    cristo.rotation.x = _90graus;
	    cristo.scale.set(8, 8, 8);
	    cristo.position.set(7600,35900,14500);
	    cristo.frustumCulled = false;
    	//cristo.lookAt(vec3D);
	}

	//if(BD.vento == 0) {
		//cenario.rotation.z = 0;
	/*}else{
		cenario.rotation.z = _180graus;
	}*/

    cenario.add(cristo);
    scene.add(cenario);
}

function setCenario1(){

	//return;

	if(type != 'festival' && type != 'online') return;

	setPanoramic();
	
	//return;

// MATERIAIS =================================================

	var matMuro3Casas = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/tijolo.jpg'), side:THREE.FrontSide});
	matMuro3Casas.map.wrapS = THREE.RepeatWrapping;
	matMuro3Casas.map.wrapT = THREE.RepeatWrapping;
	matMuro3Casas.map.repeat.set( 1.8, 1.8 );
	matMuro3Casas.map.needsUpdate = true;

	var cimentolaje = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/cimento.jpg'), side:THREE.FrontSide});
	var materialvaziobottom = new THREE.MeshBasicMaterial({side:THREE.BackSide});
	var _3casas = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide});

// =================================================
	

	//casa favela
	var cubo = new THREE.CubeGeometry( 90, 90, 90, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_janela.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_porta.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -380, 90/2, 300, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	
	//3casas left
	var a = addMesh(
		new THREE.CubeGeometry( 350, 180, 200, 1, 1, 1 ), 1, 
		-620, 180/2, 300, 
		0, 0, 0, 
		[
			matMuro3Casas,//right
			matMuro3Casas,//left
			cimentolaje,//top
			materialvaziobottom,//bottom
			_3casas,//tras
			matMuro3Casas
		]);
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//3casas right
	var a = addMesh(
		new THREE.CubeGeometry( 356, 170, 600, 1, 1, 1 ), 1, 1008 - 30, 170/2, 100, 0,0,0, 
		[
			matMuro3Casas,//right
			_3casas,//left
			cimentolaje,//top
			materialvaziobottom,//bottom
			_3casas,//tras
			matMuro3Casas
		]);
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));



	//casa favela 2
	var cubo = new THREE.CubeGeometry( 90, 90, 90, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_porta.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral_graffiti.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -1200, 90/2, 300, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//casa favela 3
	var cubo = new THREE.CubeGeometry( 90, 90, 90, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_janela.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_lateral.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/barraco_porta.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -1680, 90/2, 300, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));


	

	



	//arquibancada 1
	var cubo = new THREE.CubeGeometry( 30*3, 30, 600, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/cimento.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set( 1, 1 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 800-45, 11, 100, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//arquibancada 2
	var cubo = new THREE.CubeGeometry( 30*2, 30, 600, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/cimento.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	//mat.map.repeat.set( 1, 878 / 156 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 800-30, 11 + 30, 100, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//arquibancada 3
	var cubo = new THREE.CubeGeometry( 30, 30, 600, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/cimento.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	//mat.map.repeat.set( 1, 878 / 156 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 800-15, 11 + 60, 100, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//Campo futebol
	var campofutebol = new THREE.Mesh(
		new THREE.PlaneGeometry(600, 376, 1, 1), 
		new THREE.MeshBasicMaterial( { map:new getTextureLoader('img/cenario/campo.jpg'), side: THREE.BackSide } )
	);
	campofutebol.position.set(480, 4, 100);
	campofutebol.rotation.x = _90graus;	
	campofutebol.rotation.z = _90graus;	
	campofutebol.renderOrder = 4;
	campofutebol.frustumCulled = false;
	scene.add(campofutebol);
	





	
	//casa favela
	var cubo = new THREE.CubeGeometry( 2500/6, 1500/6, 1500/6, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -400, (1500/6)/2, -1100-500, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));


	//casa favela
	/*var cubo = new THREE.CubeGeometry( 2500/6, 1500/6, 1500/6, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/3casas.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -400+2500/6+100, (1500/6)/2, -1100, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));*/

	//BNH
	var cubo = new THREE.CubeGeometry( 2500/3, 1500/3, 1500/3, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, 900, (1500/3)/2, -1250-500, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//BNH
	var cubo = new THREE.CubeGeometry( 2500/3, 1500/3, 1500/3, 1, 1, 1 );
	var mat = [
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//right
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//left
		cimentolaje,//top
		new THREE.MeshBasicMaterial({side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide}),//tras
		new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/bnh.jpg'), side:THREE.FrontSide})//frente
	];
	var a = addMesh( cubo, 1, -1300, (1500/3)/2, -1250-500, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	





//Terreno de barro ==


	var floorTexture = new getTextureLoader('img/cenario/barro.jpg');
	floorTexture.wrapT = floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.magFilter = THREE.NearestFilter;
	floorTexture.minFilter = THREE.LinearMipMapLinearFilter;
	floorTexture.repeat.set( 40, 40 );
	var barro = new THREE.Mesh(
		new THREE.PlaneGeometry(1910+2000, 1850+1000, 1, 1), 
		new THREE.MeshBasicMaterial( { map:floorTexture, side: THREE.BackSide } )
	);
	barro.position.set(0, 2, 0)
	barro.rotation.x = Math.PI / 2;
	barro.renderOrder = 3;
	barro.frustumCulled = false;//evita pipa sumir
	scene.add(barro);

	//Muro Frente
	var cubo = new THREE.CubeGeometry( 1910+2000, 60, 10, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/tijolo.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set( 18, 0.5 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 0, 60/2, -930-500, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//Muro Trás
	/*var cubo = new THREE.CubeGeometry( 1910, 60, 10, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/tijolo.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set( 8, 0.5 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 0, 60/2, 930, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));*/

	//Muro Left
	var cubo = new THREE.CubeGeometry( 10, 60, 1870+1000, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/tijolo.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set( 18, 0.5 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, -1960, 60/2, 0, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));

	//Muro Right
	var cubo = new THREE.CubeGeometry( 10, 60, 1870+1000, 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial({map:getTextureLoader('img/cenario/tijolo.jpg'), side:THREE.FrontSide});
	mat.map.wrapS = THREE.RepeatWrapping;
	mat.map.wrapT = THREE.RepeatWrapping;
	mat.map.repeat.set( 18, 0.5 );
	mat.map.needsUpdate = true;
	var a = addMesh( cubo, 1, 1960, 60/2, 0, 0,0,0, mat );
	scene.add(a);
	arrScene.push(addPos3DobjArr(a));


	



	



}