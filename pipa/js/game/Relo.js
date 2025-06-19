function relo(_pipaA, _pipaB){  

    //if(_pipaA.pipa == undefined || _pipaB.pipa == undefined) return undefined;

    var dirPipaA = getDirPipa(_pipaA.pipa),
    dirPipaB = getDirPipa(_pipaB.pipa),
    pipaMorreu = undefined;

    //=== Status
    var pipaA_status = "";//mão parada
    if(_pipaA.puxar > 0 || _pipaA.disbicando) pipaA_status = "puxando";
    if(_pipaA.descarregar > 0) pipaA_status = "descarregando";
    var pipaB_status = "";//mão parada
    if(_pipaB.puxar > 0 || _pipaB.disbicando) pipaB_status = "puxando";
    if(_pipaB.descarregar > 0) pipaB_status = "descarregando";
    //=======

    //console.log(dirPipaA+"("+pipaA_status+")", dirPipaB+"("+pipaB_status+")");


    //←↑→↓↖↗↘↙ - //calculo base esquerda - depois codigo inverte no final
    var pipaPontuar = undefined;

    
    if(pipaA_status == "" && pipaB_status == ""){
        pipaPontuar = (Math.random() < 0.5) ? _pipaA : _pipaB;
        //console.log('OS DOIS COM MÃO PARADA, RANDOM!');
    }else if(pipaA_status != "" && pipaB_status == ""){//Quem tiver de mão parada sempre voa
        pipaPontuar = _pipaA;
        //console.log('MÃO PARADA, PIPA A VENCEU!');
    }else if(pipaB_status != "" && pipaA_status == "") {//Quem tiver de mão parada sempre voa
        pipaPontuar = _pipaB;
        //console.log('MÃO PARADA, PIPA B VENCEU!');
    }else{
        
        var adversarioNaEsquerda = (_pipaA.getPerso.perso.position.x > _pipaB.getPerso.perso.position.x);

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        
        if(dirPipaA == "↑"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }
        }

//↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖

        if(dirPipaA == "↖"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }

        }         

//←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

        if(dirPipaA == "←"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }           

        }   

//↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙↙

        if(dirPipaA == "↙"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }           

        }

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

        if(dirPipaA == "↓"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;//CERROU
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }           

        }

//↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘

        if(dirPipaA == "↘"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }           

        }

//→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→

        if(dirPipaA == "→"){
            switch(dirPipaB) {
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }

        }

//↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗↗

        if(dirPipaA == "↗"){
            switch(dirPipaB){
                case '↑':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↖':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB; 
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '←':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↙':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↓':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↘':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '→':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
                case '↗':
                    if(adversarioNaEsquerda){
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaA;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaA;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }else{//DIREITA
                        if(pipaA_status == 'puxando'){
                            if(pipaB_status == 'puxando') pipaPontuar = disputarPuxao(_pipaA, _pipaB);
                            if(pipaB_status == 'descarregando') pipaPontuar = _pipaB;
                        }else if(pipaA_status == 'descarregando'){
                            if(pipaB_status == 'puxando') pipaPontuar = _pipaB;
                            if(pipaB_status == 'descarregando') pipaPontuar = disputarDescarregando(_pipaA, _pipaB);
                        }
                    }
                break;
            }

        }


    }

//==========================================

    /*if(pipaPontuar == undefined || pipaPontuar.puxar == undefined){
        pipaPontuar = "";
        console.clear();
        console.log('ERRO AQUI!');
    }else{
        
        //var tipoCortePipaA = getTipoCorte(pipaA);
        //var tipoCortePipaA = getTipoCorte(pipaB);


        
        var txtExtraA = ((_pipaA.pipaPrincipal) ? "#" : "");
        var txtExtraB = ((_pipaB.pipaPrincipal) ? "#" : "");
        var _dirPipaA = txtExtraA+((pipaA_status != 'descarregando') ? dirPipaA : "") + ' ' + pipaA_status;
        var _dirPipaB = txtExtraB+((pipaB_status != 'descarregando') ? dirPipaB : "") + ' ' + pipaB_status;
        var esquerdaOUdireita = ((adversarioNaEsquerda) ? 'ESQUERDA' : 'DIREITA');

        setMsgChat(_dirPipaA+' - '+_dirPipaB+' - '+esquerdaOUdireita);

        
        //console.log('CORTOU: '+((pipaPontuar == _pipaA) ? 'pipaA' : 'pipaB'), 'VOOU: '+((pipaPontuar == _pipaA) ? 'pipaB' : 'pipaA'), dirPipaA+"(pipaA:"+txtExtraA+pipaA_status+")", dirPipaB+"(pipaB:"+txtExtraB+pipaB_status+")", ' == '+((adversarioNaEsquerda) ? 'ESQUERDA' : 'DIREITA')  );
        //console.log(tipoDeCorte);
        //console.log('=======================');

    }*/

    
    
    /*if(pipaPontuar == _pipaA){
        return { 
            venceu:{
                pipa:_pipaA, 
                tipoCorte:getTipoCorte(_pipaA, dirPipaA, _pipaB, dirPipaB),
                dir:dirPipaA
            },
            perdeu:{
                pipa:_pipaB, 
                tipoCorte:getTipoCorte(_pipaB, dirPipaB, _pipaA, dirPipaA),
                dir:dirPipaB
            }
        }    
    }else{
        return { 
            venceu:{
                pipa:_pipaB, 
                tipoCorte:getTipoCorte(_pipaB, dirPipaB, _pipaA, dirPipaA),
                dir:dirPipaB
            },
            perdeu:{
                pipa:_pipaA, 
                tipoCorte:getTipoCorte(_pipaA, dirPipaA, _pipaB, dirPipaB),
                dir:dirPipaA
            }
        }
    }*/

//== Evitar cortar toda hora sem deixar dar linha
    if(_pipaA.distance < 230){
        if(Math.random() < 0.31) pipaPontuar = _pipaA;
    }
    if(_pipaB.distance < 230){
        if(Math.random() < 0.31) pipaPontuar = _pipaB;
    }
//================================================

    return pipaPontuar;
    

}

function getTipoCorte(pipa, dir, dirAdversario){
    
    //←↑→↓↖↗↘↙

    var tipoDeCorte = "";
    if(pipa.descarregar > 0) tipoDeCorte = "DESCARREGANDO";
    if(pipa.puxar > 0) tipoDeCorte = "PUXANDO";
    if(pipa.puxar > 0 && dir == "↑") tipoDeCorte = "SUSPENDEU";
    if(pipa.puxar > 0 && dir == "↓") tipoDeCorte = "FACÃO";

    

    if(pipa.descarregar > 0 && pipa.rodar) tipoDeCorte = "RODAMENTO";
    if(pipa.disbicando > 0) tipoDeCorte = "TENTIANDO";




    return tipoDeCorte;
}

function disputarDescarregando(_pipaA, _pipaB){
    var vencedor = ((_pipaA.descarregar >= _pipaB.descarregar) ? _pipaA : _pipaB);
    //console.log('Disputou descarregando, venceu: ', ((_pipaA.descarregar >= _pipaB.descarregar) ? 'pipaA' : 'pipaB'));
    return vencedor;
}

function disputarPuxao(_pipaA, _pipaB){
    var vencedor = ((_pipaA.puxar >= _pipaB.puxar) ? _pipaA : _pipaB);
    //console.log('Disputou puxando, venceu: ', ((_pipaA.puxar >= _pipaB.puxar) ? 'pipaA' : 'pipaB'));
    return vencedor;
}

function getDirPipa(pipa){

    //console.log('pipa', pipa);
    
    var rotZ = new THREE.Euler().setFromQuaternion(pipa.quaternion).z,
    radians = rotZ > 0 ? rotZ : (2 * Math.PI) + rotZ,
    degrees = THREE.Math.radToDeg(radians),
    calc = Math.round(degrees/(360/8));
    //console.log(calc);

    var tipo = "↑";//←↑→↓↖↗↘↙

        //if(calc == 0) tipo = "↑";
         if(calc == 1) tipo = "↖";
    else if(calc == 2) tipo = "←";
    else if(calc == 3) tipo = "↙";
    else if(calc == 4) tipo = "↓";
    else if(calc == 5) tipo = "↘";
    else if(calc == 6) tipo = "→";
    else if(calc == 7) tipo = "↗";
    //else if(calc == 8) tipo = "↑";

    return tipo;

}