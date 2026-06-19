const game = document.getElementById("gamearea");
const missCountEl = document.getElementById("misscount");

let miss = 0;
let lastcolor = "";
let gameRunning = true;
let balloninterval;

function randomcolors(){
    const colors = [ 
        "#b56576", "#6d6875", "#355070", "#e56b6f", "#b5838d",
        "#516484ff", "#2e3d4fff", "#0d2439ff", "#56104bff", "#32637fff","#05254fff", "#2b4e6cff", "#6e2d65ff", "#223e4eff","#310610ff", "#6d9875", "#b4becaff"];

        let color;
        do{
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        while(color === lastcolor);

        lastcolor = color;
        return color;
}

function gameover(){
    gameRunning = false;
    clearInterval(balloninterval);

    let k = document.querySelectorAll(".balloon");
    k.forEach(b => b.remove());

    const overmsg = document.createElement("div");
    overmsg.id = "GameOver";
    overmsg.style.position = "absolute";
    overmsg.style.top = "40%";
    overmsg.style.left = "50%";
    overmsg.style.transform = "translate(-50% , -50%)";
    overmsg.style.fontSize = "40px";
    overmsg.style.fontWeight = "bold";
    overmsg.style.color = "#333";
    overmsg.style.background = "white";
    overmsg.style.padding = "20px 40px";
    overmsg.style.borderRadius = "20px";
    overmsg.style.boxShadow = "0 0 20px #0004";
    overmsg.innerHTML = `Game Over <br> Missed: ${miss}`;

    game.appendChild(overmsg);
}


function popBalloon(balloon){
    balloon.classList.add("pop");
    setTimeout(() => balloon.remove() , 300);
}

function createBalloon(){
    if(!gameRunning) 
    {
        return;
    }

    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    balloon.textContent = letter;
    balloon.dataset.letter = letter;

    balloon.style.left = Math.random() * 90 + "%";
    balloon.style.background = randomcolors();

    setTimeout(() => {
        balloon.style.bottom = "90vh";
    }, 50);


    setTimeout( () => {
        if(document.body.contains(balloon) && gameRunning)
        {
            popBalloon(balloon);
            miss++;
            missCountEl.textContent = miss;

            if(miss >= 10)
            {
                gameover();
            }
        }
    } , 4000);

    game.appendChild(balloon);
}

ballooninterval = setInterval(createBalloon , 1500);

document.addEventListener("keydown" , (e) => {
    if(!gameRunning)
    {
        return;
    }

    const key = e.key.toUpperCase();
    const balloons = document.querySelectorAll(".balloon");

    balloons.forEach(bal =>{
        if(bal.dataset.letter === key) {
            popBalloon(bal);
        }
    });
});
