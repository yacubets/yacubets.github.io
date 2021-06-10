




(function () {
    function Game() {   //Создание глобального объекта Game
        
        if (Game.inst) {
            return Game.inst;
        }
        Game.inst = this;

        this.map = [  // матрица карты для отрисовки, 1 - стена, 2 - прохож с коином, 0 - проход без коина
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,5],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,5],
            [1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1,5],
            [1, 2, 2, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1,5],
            [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1,5],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,5],
            [1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1,5],
            [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1,5],
            [1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 1, 1, 1,5],
            [1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 1,5],
            [1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1,5],
            [1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1,5],
            [1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 1, 1, 2, 1, 1, 1, 1,5],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1,5],
            [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1,5],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1,5],
            [1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1,5],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,5],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        ]

        this.canvas = null;
        this.canvasCtx = null;

        this.pacMan = null;

        this.ghost1 = null;
        this.ghost2 = null;
        this.ghost3 = null;
        this.ghost4 = null;

        this.gameMap = null;

        this.direction = null;

        this.time = 0;

        this.canvas = document.querySelector("canvas");
        this.testIm = document.getElementById("ghost");
        this.testIm2 = document.getElementById("wall");
        this.testIm3 = document.getElementById("coin");

        this.canvasCtx = canvas.getContext('2d')

        const canvasW = canvas.getBoundingClientRect().width;
        this.cellSizeW = Math.floor(canvasW / 21);
        this.cellSizeH = this.cellSizeW;

        this.x = 1;
        this.y = 10;

        this.gameO = false;
        this.restB = false;

        this.init();
    } 
    window['Game'] = Game;

    Game.prototype = {         //Создаем прототим объекта game

        init: function ()  //Инициализация всех игровых объектов 
        {
            this.pacMan = new pacMan(this.x, this.y, this.canvas, this.cellSizeW, this.cellSizeH, this.testIm);

            this.ghost1 = new pacMan(1, 1, this.canvas, this.cellSizeW, this.cellSizeH, document.getElementById("ghost1"));
            this.ghost2 = new pacMan(1, 17, this.canvas, this.cellSizeW, this.cellSizeH, document.getElementById("ghost2"));
            this.ghost3 = new pacMan(19, 1, this.canvas, this.cellSizeW, this.cellSizeH, document.getElementById("ghost3"));
            this.ghost4 = new pacMan(19, 17, this.canvas, this.cellSizeW, this.cellSizeH, document.getElementById("ghost4"));

            this.gameMap = new map(this.map, this.canvas, this.testIm2, this.cellSizeW, this.cellSizeH, this.testIm3);

            this.startListen();
            this.update();
            
        },

        startListen: function ()  // Добавляем слушателей на события
        {
            document.addEventListener('keydown', this.hanldeEv.bind(this));
            document.addEventListener('keyup', this);
        },

        update: function ()  // Методы обновления данных о игровом процессе 
        {
            this.ppp = false;
           

            this.now = new Date().getTime();
            this.deltaTime = this.now - (this.time || this.now);
            this.time = this.now;

            this.clearCanvas();

            
            this.gameMap.update();
            this.ghost1.update(null, this.gameMap.map, this.cellSizeH * 100 / 1000, this.deltaTime, 2);
            this.ghost2.update(null, this.gameMap.map, this.cellSizeH * 100 / 1000, this.deltaTime, 2);
            this.ghost3.update(null, this.gameMap.map, this.cellSizeH * 100 / 1000, this.deltaTime, 2);
            this.ghost4.update(null, this.gameMap.map, this.cellSizeH * 100 / 1000, this.deltaTime, 2);

            this.pacMan.update(this.direction, this.gameMap.map, this.cellSizeH * 70 / 1000, this.deltaTime, 1);
            
           
            if (!this.pacMan.check(this.ghost1, this.ghost2, this.ghost3, this.ghost4)) {
                if (this.pacMan.coins == 196) {
                    this.gameO = true;
                    this.gameOver();
                } else {
                    this.scheduleNextUpdate();
                    
                }
            } 
            else 
            {
                this.gameO = true;
                this.gameOver();
            }
        },
        scheduleNextUpdate: function ()
         {
                this.ppp = true;
                this.update.bind(this);
                requestAnimationFrame(this.update.bind(this));
        },

        /////

        hanldeEv: function (e) 
        {
            return (function (e) { this.test(e); }.bind(this)(e.key));
        },

        gameOver: function () // метод перезапуска игрового процесса, вызывает метод restart, который всё обновляет
         {
            
            this.canvasCtx.drawImage(document.getElementById("pressr"), canvas.getBoundingClientRect().width / 10, canvas.getBoundingClientRect().height / 2.3)

            if(this.restB)
                this.restart();
        },

        restart: function () {
            this.direction = 'none';
            this.pacMan.reset(this.direction);
            this.gameMap.reset();
            this.ghost1.reset();
            this.ghost2.reset();
            this.ghost3.reset();
            this.ghost4.reset();
            this.gameO = false;
            this.restB = false;
            this.update();
        },

        clearCanvas: function ()  // очистка канваса 
        {
            this.canvasCtx.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
        },

        test: function (e) {
            if (!this.gameO) {
                this.direction = e;
            } else if (e == 'r') {
                this.restB = true;
                this.update();
            }
            
        }

        
    }

    function map(map, canvas, img, cellSizeW, cellSizeH, img2)  // обьект игровой карты
    {
        this.canvas = canvas;
        this.sprite = img2;
        this.canvasCtx = canvas.getContext('2d');
        this.wallsprite = img;
        this.map = map;
        this.tmpM = map;
        this.cellSizeW = cellSizeW;
        this.cellSizeH = cellSizeH;

        this.init();
    }

    map.prototype = 
    {
        init: function () 
        {
            for (i = 0; i <= 19; i++)
                for (j = 0; j <= 22; j++) {
                    if (this.map[i][j] == 1 || this.map[i][j] == 0) {
                        this.map[i][j] = new obstacle(this.tmpM[i][j], this.canvas, j, i, this.cellSizeW, this.cellSizeH, this.wallsprite);
                    } else{
                        this.map[i][j] = new obstacle(this.tmpM[i][j], this.canvas, j, i, this.cellSizeW, this.cellSizeH, this.sprite);
                    }
                }
        },

        update: function ()
        {
            this.draw();
        },

        draw: function () {
            for (i = 0; i < 19; i++)
                for (j = 0; j < 22; j++) {
                     this.map[i][j].draw();
                }
        },
        reset: function () {
            for (i = 0; i < 19; i++)
                for (j = 0; j < 22; j++) {
                    if (this.map[i][j].type == 4)
                        this.map[i][j].type = 2;
                }
        }
    }

    function obstacle(type, canvas, x, y, cellSizeW, cellSizeH, img)  //метод отрисовки карты 
    { 
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.type = type;
        this.img = img;
        this.x = x;
        this.y = y;
        this.cellSizeW = cellSizeW;
        this.cellSizeH = cellSizeH;
    }

    obstacle.prototype = {
        update: function () {

        },
        draw: function () {
            if(this.type == 1)
                this.canvasCtx.drawImage(this.img, this.x * this.cellSizeW, this.y * this.cellSizeH, this.cellSizeW, this.cellSizeH);
            else if (this.type == 2)
                this.canvasCtx.drawImage(this.img, this.x * this.cellSizeW + this.cellSizeW / 2.5, this.y * this.cellSizeH + this.cellSizeH / 2.5, this.cellSizeW / 4, this.cellSizeH / 4);
        }
    }

    function pacMan(x, y, canvas, cellSizeW, cellSizeH, img)   // Объект со свойствами игровых персонажей 
    {
        this.map = null;
        this.testIm = img;
        this.canvasCtx = canvas.getContext('2d');
        this.cellSizeW = cellSizeW;
        this.cellSizeH = cellSizeH;
        this.xInPx = x * this.cellSizeW;
        this.yInPx = y * this.cellSizeH;
        this.time = 0;
        this.stime = 0;
        this.changeDtime = 0;
        this.spose = 0;
        this.pdirection = 'none';
        this.coins = 0;
        this.spriteD = document.getElementById("pacman_down");
        this.spriteU = document.getElementById("pacman_up");
        this.spriteL = document.getElementById("pacman_left");
        this.spriteR = document.getElementById("pacman_right");
        this.gflag = false;
        this.type = 2;

        this.predirection = null;
        if (this.testIm == document.getElementById("ghost")) {
            this.type = 1;
            this.testIm = this.spriteR;
        }

    }
    pacMan.prototype = {
        update: function (direction, map, coef, deltaTime, type, ...ghost) {
            this.type = type;
            this.map = map;
            this.floorX = Math.floor(this.yInPx / this.cellSizeW);
            this.floorY = Math.floor(this.xInPx / this.cellSizeW);

            this.time += deltaTime;
            this.stime += deltaTime;
            this.changeDtime += deltaTime;

            if (type != 2 && this.direction == direction) {
                this.direction = direction;
            } else if (type != 2 && this.direction != direction) {
                this.pdirection = direction;
                this.func(coef);
            }
            if ((!this.gflag && type == 2) ) {
      
                    
                    this.direction = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  
                this.gflag = true;
            }



            if (this.type != 2)
                this.c = 0;
            else
                this.c = 30;

            if (this.direction != 'none') {
                this.func(coef, this.direction);
            }

            if (this.time >= this.c) {
                this.time = 0;
                if (this.direction == 'w' || this.direction == 1) {
                    if ((this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][this.floorY].y * this.cellSizeH + this.cellSizeH + coef > this.yInPx &&
                        this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][this.floorY].type == 1) ||
                        (this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][Math.floor((this.xInPx + this.cellSizeW - 1) / this.cellSizeW)].y * this.cellSizeH + this.cellSizeH + coef > this.yInPx - coef &&
                            this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][Math.floor((this.xInPx + this.cellSizeW - 1) / this.cellSizeW)].type == 1)
                    ) {
                        this.direction = 'none';
                        this.yInPx = this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].y * this.cellSizeH;
                        this.gflag = false;
                    }
                    if (this.direction != 'none') {
                        if (this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].y * this.cellSizeH - this.yInPx < coef && this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].y * this.cellSizeH - this.yInPx  != 0) {
                            this.yInPx = this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].y * this.cellSizeH;
                        } else
                            this.yInPx -= coef;
                        this.yInPx = Math.floor(this.yInPx);
                    
                        if (this.type != 2) {
                            this.testIm = this.spriteU;
                        }

                    }

                }
                else if (this.direction == 's' || this.direction == 2) {
                    if ((this.map[this.floorX + 1][this.floorY].y * this.cellSizeH - this.cellSizeH <= this.yInPx + coef &&
                        this.map[this.floorX + 1][this.floorY].type == 1) ||
                        (this.map[Math.floor(this.yInPx / this.cellSizeW) + 1][Math.ceil(this.xInPx / this.cellSizeW)].y * this.cellSizeH - this.cellSizeH <= this.yInPx + coef &&
                            this.map[Math.floor(this.yInPx / this.cellSizeW) + 1][Math.ceil(this.xInPx / this.cellSizeW)].type == 1)) {

                        this.yInPx = this.map[this.floorX + 1][this.floorY].y * this.cellSizeH - this.cellSizeH;
                        this.direction = 'none';
                        this.gflag = false;
                    }

                    if (this.direction != 'none') {
                       
                        if (this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].y * this.cellSizeH - (this.yInPx + this.cellSizeH) < coef && this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].y * this.cellSizeH - (this.yInPx + this.cellSizeH) != 0) {
                            this.yInPx = this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].y * this.cellSizeH - this.cellSizeH;
                        } else {
                            this.yInPx += coef;
                        }
                        this.yInPx = Math.floor(this.yInPx);
                        if (this.type != 2) {
                            this.testIm = this.spriteD;
                        }
                    }
                }
                else if (this.direction == 'd' || this.direction == 3) {
                    if ((this.map[this.floorX][this.floorY + 1].x * this.cellSizeW >= this.xInPx + coef &&
                        this.map[this.floorX][this.floorY + 1].type == 1) ||
                        (this.map[Math.ceil(this.yInPx / this.cellSizeH)][this.floorY + 1].x * this.cellSizeW >= this.xInPx + coef &&
                            this.map[Math.ceil(this.yInPx / this.cellSizeH)][this.floorY + 1].type == 1)
                    ) {
                        this.xInPx = this.map[this.floorX][this.floorY + 1].x * this.cellSizeW - this.cellSizeW;
                        this.direction = 'none';
                        this.gflag = false;
                    }
                    if (this.direction != 'none') {
                        
                        
                        if (this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].x * this.cellSizeH + this.cellSizeH - this.xInPx < coef && this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].x * this.cellSizeH + this.cellSizeH - this.xInPx != 0){
                            this.xInPx = this.map[Math.ceil((this.yInPx + this.cellSizeH) / this.cellSizeW)][this.floorY].x * this.cellSizeH + this.cellSizeH;
                        } else {
                            this.xInPx += coef;
                        }


                        this.xInPx = Math.floor(this.xInPx);
                        if (this.type != 2) {
                            this.testIm = this.spriteR;
                        }
                    }
                }
                else if (this.direction == 'a' || this.direction == 4) {
                    if (((this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH) - 1].x * this.cellSizeW + this.cellSizeW + coef) >= this.xInPx &&
                        this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH) - 1].type == 1) ||
                        ((this.map[Math.ceil(this.yInPx / this.cellSizeW)][Math.ceil(this.xInPx / this.cellSizeH) - 1].x * this.cellSizeW + this.cellSizeW + coef) >= this.xInPx &&
                            this.map[Math.ceil(this.yInPx / this.cellSizeW)][Math.ceil(this.xInPx / this.cellSizeH) - 1].type == 1)
                    ) {

                        this.xInPx = this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH) - 1].x * this.cellSizeW + this.cellSizeW;
                        this.direction = 'none';
                        this.gflag = false;
                    }
                    if (this.direction != 'none') {
                        
                        
                        if (this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].x * this.cellSizeH + this.cellSizeH - this.xInPx < coef && this.map[Math.ceil(this.yInPx / this.cellSizeW)][this.floorY].x * this.cellSizeH + this.cellSizeH - this.xInPx != 0) {
                            this.xInPx = this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH)].x * this.cellSizeW;
                        } else {
                            this.xInPx -= coef;
                        }
                        this.xInPx = Math.floor(this.xInPx);
                        if (this.type != 2) {
                            this.testIm = this.spriteL;
                        }
                    }
                }
            }

            if (this.stime >= 100) {
                this.stime = 0;

                this.spose++;
                if (this.spose > 3)
                    this.spose = 0;
            }

            for (i = 0; i <= 19; i++) 
                for (j = 0; j <= 22; j++)
                    if (Math.sqrt((this.map[i][j].x * this.cellSizeH + this.cellSizeH / 2 - (this.xInPx + this.cellSizeH / 2)) ** 2 + (this.map[i][j].y * this.cellSizeH + this.cellSizeH / 2 - (this.yInPx + this.cellSizeH / 2)) ** 2) <= this.cellSizeH / 2 &&
                        this.map[i][j].type == 2 && type != 2
                    ) {
                        this.map[i][j].type = 4;

                        this.coins++; //если это блок с коином прибавляем единичку к коинам 

                    }


            this.draw(this.spose);
        },

        draw: function (spose)   // отрисовка 
         {
            if (this.type == 2)
                this.canvasCtx.drawImage(this.testIm, this.xInPx, this.yInPx, this.cellSizeW, this.cellSizeH);
            else {
                this.canvasCtx.drawImage(this.testIm, spose * 16, 0, 16, 16, this.xInPx, this.yInPx, this.cellSizeW, this.cellSizeH,);
            }
        },
        check: function (...ghost) {
            this.ghost = ghost;
            let collision = false;
            this.ghost.forEach((ghost) => {
                if (Math.sqrt((ghost.xInPx - this.xInPx) ** 2 + (ghost.yInPx - this.yInPx) ** 2) <= this.cellSizeH / 1.3)
                    collision = true;
            });
            return collision;
        },
        reset: function (direction) {
            this.coins = 0;
            
            if (this.type != 2)
            this.testIm = this.spriteR;
            if (this.type != 2) {
                this.xInPx = 1 * this.cellSizeH;
                this.yInPx = 10 * this.cellSizeH;
                this.direction = 'none';
                this.pdirection = 'none';
            } else if (this.testIm == document.getElementById("ghost1")) {
                this.xInPx = 1 * this.cellSizeH;
                this.yInPx = 1 * this.cellSizeH;
            } else if (this.testIm == document.getElementById("ghost2")) {
                this.xInPx = 1 * this.cellSizeH;
                this.yInPx = 17 * this.cellSizeH;
            } else if (this.testIm == document.getElementById("ghost3")) {
                this.xInPx = 19 * this.cellSizeH;
                this.yInPx = 1 * this.cellSizeH;
            } else if (this.testIm == document.getElementById("ghost4")) {
                this.xInPx = 19 * this.cellSizeH;
                this.yInPx = 17 * this.cellSizeH;
            }

        },
        func: function (coef)  // метод логики передвижения в зависимости от нажатия клавиши 
        {
            
            if (this.pdirection == 'w' || this.pdirection == 1) {
                if ((this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][this.floorY].y * this.cellSizeH + this.cellSizeH + coef > this.yInPx - coef &&
                    this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][this.floorY].type == 1) ||
                    (this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][Math.floor((this.xInPx + this.cellSizeW - 1) / this.cellSizeW)].y * this.cellSizeH + this.cellSizeH + coef > this.yInPx - coef &&
                        this.map[Math.ceil(this.yInPx / this.cellSizeW) - 1][Math.floor((this.xInPx + this.cellSizeW - 1) / this.cellSizeW)].type == 1)
                ) {
                    this.pdirection = 'none';

                }
                if (this.pdirection != 'none') {

                    this.direction = this.pdirection;
                   
                }

            }
            else if (this.pdirection == 's' || this.pdirection == 2) {
                
                if ((this.map[this.floorX + 1][this.floorY].y * this.cellSizeH - this.cellSizeH <= this.yInPx + coef &&
                    this.map[this.floorX + 1][this.floorY].type == 1) ||
                    (this.map[Math.floor(this.yInPx / this.cellSizeW) + 1][Math.ceil(this.xInPx / this.cellSizeW)].y * this.cellSizeH - this.cellSizeH <= this.yInPx + coef &&
                        this.map[Math.floor(this.yInPx / this.cellSizeW) + 1][Math.ceil(this.xInPx / this.cellSizeW)].type == 1)) {

                    this.pdirection = 'none';

                }

                if (this.pdirection != 'none') {
                    this.direction = this.pdirection;
                }
            }
            else if (this.pdirection == 'd' || this.pdirection == 3) {
                if ((this.map[this.floorX][this.floorY + 1].x * this.cellSizeW >= this.xInPx + coef &&
                    this.map[this.floorX][this.floorY + 1].type == 1) ||
                    (this.map[Math.ceil(this.yInPx / this.cellSizeH)][this.floorY + 1].x * this.cellSizeW >= this.xInPx + coef &&
                        this.map[Math.ceil(this.yInPx / this.cellSizeH)][this.floorY + 1].type == 1)
                ) {

                    this.pdirection = 'none';

                }
                if (this.pdirection != 'none') {
                    this.direction = this.pdirection;
                }
            }
            else if (this.pdirection == 'a' || this.pdirection == 4) {
                if (((this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH) - 1].x * this.cellSizeW + this.cellSizeW + coef) >= this.xInPx - coef &&
                    this.map[this.floorX][Math.ceil(this.xInPx / this.cellSizeH) - 1].type == 1) ||
                    ((this.map[Math.ceil(this.yInPx / this.cellSizeW)][Math.ceil(this.xInPx / this.cellSizeH) - 1].x * this.cellSizeW + this.cellSizeW + coef) >= this.xInPx - coef &&
                        this.map[Math.ceil(this.yInPx / this.cellSizeW)][Math.ceil(this.xInPx / this.cellSizeH) - 1].type == 1)
                ) {


                    this.pdirection = 'none';

                }
                if (this.pdirection != 'none') {
                    this.direction = this.pdirection;
                }
            }
        }
    }
})();


function loadg() {
    new Game(); 
}
document.addEventListener('DOMContentLoaded', loadg); // ну тут думаю понятно))))))0