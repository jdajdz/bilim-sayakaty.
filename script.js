let currentLevel = 1;
let currentGame = 0;

function startGame(gameNum) {
    currentGame = gameNum;
    currentLevel = 1;
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    loadLevel();
}

function loadLevel() {
    const display = document.getElementById('display');
    document.getElementById('lvl-display').innerText = "Level: " + currentLevel;
    display.innerHTML = "";

    if (currentGame === 1) { // 1. ЖАЛБЫРАК ТАБУУ
        let count = 4 + (currentLevel * 2); 
        display.innerHTML = `<h2>Жалбырактарды тап</h2><div class='mem-grid' id='mem-grid'></div>`;
        let icons = ['🍃','🍀','🍎','⭐','💎','🔥','🔔','🎈','☀','🌙'].slice(0, count/2);
        let gameIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
        let opened = [];
        let matched = 0;
        gameIcons.forEach(icon => {
            const card = document.createElement('div');
            card.className = 'mem-card';
            card.dataset.icon = icon;
            card.onclick = function() {
                if(opened.length < 2 && !this.classList.contains('open')) {
                    this.classList.add('open'); this.innerText = icon; opened.push(this);
                    if(opened.length === 2) {
                        setTimeout(() => {
                            if(opened[0].dataset.icon === opened[1].dataset.icon) {
                                opened[0].classList.add('match'); opened[1].classList.add('match');
                                matched += 2; if(matched === gameIcons.length) nextLevel();
                            } else {
                                opened[0].classList.remove('open'); opened[0].innerText = "";
                                opened[1].classList.remove('open'); opened[1].innerText = "";
                            }
                            opened = [];
                        }, 400);
                    }
                }
            };
            document.getElementById('mem-grid').appendChild(card);
        });
    } else if (currentGame === 2) { // 2. КРЕСТИКИ-НОЛИКИ
        display.innerHTML = `<h2>Крестики-нолики</h2><p id='st'>Кезек: X</p><div class='ttt-grid' id='ttt'></div>`;
        let board = ["","","","","","","","",""], cur = "X";
        for(let i=0; i<9; i++) {
            const cell = document.createElement('div');
            cell.className = 'ttt-cell';
            cell.onclick = function() {
                if(board[i] === "") {
                    board[i] = cur; cell.innerText = cur;
                    if(checkTTTWin(board, cur)) { alert(cur + " жеңди!"); nextLevel(); return; }
                    if(!board.includes("")) { alert("Тең чыгуу!"); loadLevel(); return; }
                    cur = (cur === "X") ? "O" : "X";
                    document.getElementById('st').innerText = "Кезек: " + cur;
                }
            };
            document.getElementById('ttt').appendChild(cell);
        }
    } else if (currentGame === 3) { // 3. ПРОГРАММАЛОО
        const qs = ["",{q:"HTML деген эмне?",a:"Белгилөө тили"},{q:"CSS эмне үчүн?",a:"Стиль"},{q:"JS эмне кылат?",a:"Жандандырат"},{q:"ID белгиси?",a:"#"},{q:"Класс белгиси?",a:"."}];
        display.innerHTML = `<h2>Программалоо</h2><p>${qs[currentLevel].q}</p><input type='text' id='pAns'><br><button class='back-btn' onclick="checkP('${qs[currentLevel].a}')">Жооп</button>`;
    } else if (currentGame === 4) { // 4. САНДЫ ТАП
        let max = currentLevel * 20; let target = Math.floor(Math.random() * max) + 1;
        display.innerHTML = `<h2>Санды тап (1-${max})</h2><input type='number' id='g'><br><button class='back-btn' onclick="checkG(${target})">Текшерүү</button><p id='h'></p>`;
    }
}

function nextLevel() {
    if (currentLevel < 5) { alert(currentLevel + "-деңгээл бүттү!"); currentLevel++; loadLevel(); }
    else { alert("УРАА! Баарын өттүңүз! 🎉"); location.reload(); }
}
function checkP(a) { if(document.getElementById('pAns').value.toLowerCase().includes(a.toLowerCase())) nextLevel(); else alert("Ката!"); }
function checkG(t) { 
    let v = document.getElementById('g').value; 
    if(v == t) nextLevel(); 
    else document.getElementById('h').innerText = v < t ? "↑ Чоңураак" : "↓ Кичине"; 
}
function checkTTTWin(b, p) {
    const w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return w.some(s => b[s[0]]===p && b[s[1]]===p && b[s[2]]===p);
}
