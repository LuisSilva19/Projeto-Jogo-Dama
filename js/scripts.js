//"use-strict";

let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes= document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

//contando jogadas
let player1 = 0;
let player2 = 0;

//adicionando o evento de clic aos boxes
for(let i=0; i< boxes.length; i++){
//debugger;
    boxes[i].addEventListener("click", function(){
        
        let el = checkEl(player1, player2);
        
      
        if(this.childNodes.length == 0){
            let cloneEl = el.cloneNode(true); // clona o objeto
            this.appendChild(cloneEl);
    
            if(player1 == player2){
                player1 ++;

                if(secondPlayer == 'ai-player'){
                   // funcao  executa jogada
                   computerPlay();
                   player2++;
                }
            }else{
                player2 ++;
            }

            checkWin();
        }


    });
}

//eventos para saber se é 2 players ou nao
for(let i=0;i<buttons.length;i++){
    
    buttons[i].addEventListener("click", function(){
        
        secondPlayer= this.getAttribute("id");

        for(let j = 0; j<buttons.length;j++){
            buttons[j].style.display = 'none';
        }

        setTimeout(function(){
             let container = document.querySelector("#container");
             container.classList.remove("hide");
        }, 500);
    });
}

//quem vai jogar
function checkEl(player1, player2){
    if(player1 == player2){
        el = x;// faz a variavel ficar como X 
    }else{
        el = o;// faz a variavel ficar como o
    }
    return el;
}
function checkWin(){
    let b1 = document.getElementById("bloco-1");
    let b2 = document.getElementById("bloco-2");
    let b3 = document.getElementById("bloco-3");
    let b4 = document.getElementById("bloco-4");
    let b5 = document.getElementById("bloco-5");
    let b6 = document.getElementById("bloco-6");
    let b7 = document.getElementById("bloco-7");
    let b8 = document.getElementById("bloco-8");
    let b9 = document.getElementById("bloco-9");

    let posicoes = [b1,b2,b3,b4,b5,b6,b7,b8,b9];
    let bChild = [""]; // para conseguir passar os childNodes de posicoes, é necessario fazer de array para array;
    for (let i = 0; i < posicoes.length; i++) {
       if(posicoes[i].childNodes.length > 0){
           //debugger;
           
             bChild[i] = posicoes[i].childNodes[0].className;

            if(bChild[0] == 'x' && bChild[1] == 'x' && bChild[2] == 'x'){
                declareWinner('x');

            }else if(bChild[3] == 'x' && bChild[4] == 'x' && bChild[5] == 'x'){
                declareWinner('x');

            }else if(bChild[6] == 'x' && bChild[7] == 'x' && bChild[8] == 'x'){    
                declareWinner('x');

            }else if(bChild[0] == 'x' && bChild[3] == 'x' && bChild[6] == 'x'){
                declareWinner('x');

            }else if(bChild[1] == 'x' && bChild[4] == 'x' && bChild[7] == 'x'){
                declareWinner('x');

            }else if(bChild[2] == 'x' && bChild[5] == 'x' && bChild[8] == 'x'){
                declareWinner('x');

            }else if(bChild[0] == 'x' && bChild[4] == 'x' && bChild[8] == 'x'){
                declareWinner('x');

            }else if(bChild[2] == 'x' && bChild[4] == 'x' && bChild[6] == 'x'){ 
                declareWinner('x');
            }

            if(bChild[0] == 'o' && bChild[1] == 'o' && bChild[2] == 'o'){
                declareWinner('y');

            }else if(bChild[3] == 'o' && bChild[4] == 'o' && bChild[5] == 'o'){
                declareWinner('y');

            }else if(bChild[6] == 'o' && bChild[7] == 'o' && bChild[8] == 'o'){    
                declareWinner('y');

            }else if(bChild[0] == 'o' && bChild[3] == 'o' && bChild[6] == 'o'){
                declareWinner('y');

            }else if(bChild[1] == 'o' && bChild[4] == 'o' && bChild[7] == 'o'){
                declareWinner('y');

            }else if(bChild[2] == 'o' && bChild[5] == 'o' && bChild[8] == 'o'){
                declareWinner('y');

            }else if(bChild[0] == 'o' && bChild[4] == 'o' && bChild[8] == 'o'){
                declareWinner('y');
                
            }else if(bChild[2] == 'o' && bChild[4] == 'o' && bChild[6] == 'o'){ 
                declareWinner('y');
            }    
       }
    }

    let counter = 0;

    for(let i =0; i<boxes.length;i++){
        if(boxes[i].childNodes[0] != undefined){
            counter++;
        }
    }
    if(counter ==9){
        declareWinner("Deu velha!")
    }
}

//Limpa o jogo, declara o vencedor e atualiza o placar
function declareWinner(winner){
    let scoreboardX = document.querySelector('#scoreboard-1');
    let scoreboardY = document.querySelector('#scoreboard-2');
    let msg ='';

    if(winner =='x'){
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg ="O jogador 1 venceu";
    }else if(winner == 'y'){
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg ="O jogador 2 venceu";
    }else{
        msg = "Deu velha!";
    }
    //debugger;
    messageText.innerHTML = msg; // troca o texto
    messageContainer.classList.remove("hide");
    //esconde msg
    setTimeout(() =>{
        messageContainer.classList.add("hide");
    }, 3000);
    
    //zera as jogadas
    player1 =0;
    player2 =0;

    //remove x e o
    let boxesToRemove = document.querySelectorAll(".box div");
    for(let i =0; i<boxesToRemove.length; i++){
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }

}
function computerPlay(){
    let cloneO = o.cloneNode(true);
    counter = 0;
    filled = 0;

    //so preencher se estiver vazio o filho
    for(let i= 0; i < boxes.length; i++){
        let randowNumber = Math.floor(Math.random()*5);
        if(boxes[i].childNodes[0]== undefined){
            if(randowNumber <= 1){
               boxes[i].appendChild(cloneO);
               counter++;
               break;
            }
           // checagem de quantas estao preenchidas 
        }else{
            filled++;
        }
    }

    if(counter == 0 && filled < 9){   
        computerPlay();
    }
}