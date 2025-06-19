

var arrBaloes = [
	{
		scale:10,
		y:70,
		peso:0.8
	}
];


function Balao(){
	
	this.peso = 10;
	this.balao = undefined

	var instance = this;
	
	this.init = function(arr){


		var loader = new THREE.ColladaLoader();
		var collada = loader.parse( getJapones(), 'models/baloes/' );//PEGANDO XML memory - colocar path ref imgs
		
		instance.balao = collada.scene.clone().children[0].clone();
		//var balao = new THREE.Mesh( mat.geometry.clone(), mat.material.clone() );

		instance.balao.position.y = arr.y;
		
		instance.balao.material.side = 2;
		instance.balao.scale.set(15, 15, 15);
		instance.balao.rotation.set(-_90graus, 0, Math.random() * _360graus);
		
		scene.add(instance.balao);
		
	}

	this.update = function(){
		
		instance.balao.position.y += 0.11;
		instance.balao.position.z -= 0.15;

		instance.balao.rotation.z += 0.002;

		if(instance.balao.position.y > 1800){
			instance.matarBalao();
		}

	}

	this.matarBalao = function(){
		var totBaloes = baloes.length;
		while(totBaloes--){
			var instanceBalao = baloes[totBaloes];
			if(instanceBalao == instance){
				removeScene(instanceBalao.balao);
				instanceBalao.balao = undefined;
				baloes.splice(totBaloes, 1);
				instance = undefined;
				break;
			}	
		}
	}

}