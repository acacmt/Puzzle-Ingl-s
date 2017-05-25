window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //Variaveis Globais
        var images = []; //array de objetos Image
        var img = [];//ARRAY DE IMAGENS
        var rects = [];//ARRAY DE RETANGULOS
        var pontos = 0;//variavel contadora dos pontos
        var num = 0;//variavel utilizada para o desenho das imagens

        //Carregar  Todas as Imagens contidas para o canvas aleatoriamente
        var numImagesLoaded = 0;
        var numImagesToLoad = 0;

        //array com todos os nomes das imagens
        var animais = ["Bear", "Bee", "Bird", "Dog", "Fish", "Mouse", "Pig", "Tiger", "Turtle"];
        var numA = 0;

        loadImage();
        function loadImage() {

            var rdm = Math.round(Math.random() * (animais.length - 1));//criar aleatorio para os nomes das imagens
            var image = new Image();
            image.src = "Images/" + animais[rdm] + ".png";//diretorio das imagens

            img.push(new Imagem(520, 350, 146, 146, image, animais[rdm]));//adicionar ao array de imagens 

            animais.splice(rdm, 1);//remove imagem colocada corretamente do array de imagens
        }

        //Contrutor de Imagens
        function Imagem(x, y, w, h, img, animal) {
            this.x = x; //abcissa do canto superior direito
            this.y = y; //ordenada do canto superior direito
            this.w = w; //largura
            this.h = h; //altura
            this.selected = false; //flag que indica se está ou não seleccionado
            this.draw = false; //flag que indica se esta desenhado
            this.img = img;//nome da Imagem
            this.animal = animal;//nome do animal para comparaçao
            this.desenha = function () {
                ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
            } //funçao para desenhar
        }

        //Contrutor de Rectangulos
        function Rectangulo(x, y, w, h, animal) {
            this.x = x; //abcissa do canto superior direito
            this.y = y; //ordenada do canto superior direito
            this.w = w; //largura
            this.h = h; //altura
            this.animal = animal;//nome do animal para comparaçao
            this.desenha = function () {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y, this.w, this.h);
            }
        }

        //Funçao prototipada para verificar se o cursor se encontra dentro da imagem
        // mx e my: coordenadas do rato
        Imagem.prototype.isInside = function (mx, my) {
            // verificar se mx ϵ [x, x + width] e my ϵ [y, y + height]
            return (mx >= this.x) && (mx <= this.x + this.w) &&
                (my >= this.y) && (my <= this.y + this.h);
        }

        //Variaveis particulares para a criaçao de retangulos
        var x = 50;//abcissa do primeiro retangulo
        var y = 50;//ordenada do primeiro retangulo
        var cont = 0;

        //array com nome dos animais para verificaçao de acertividade
        var animaisRect = ["Bird", "Bear", "Dog", "Bee", "Mouse", "Turtle", "Tiger", "Pig", "Fish"];

        //Ciclo de criaçao de retangulos
        for (var i = 0; i < 9; i++) {
            rects.push(new Rectangulo(x, y, 150, 150, animaisRect[i]));//Adiciona borda de retangulo ao array e relaciona um animal
            //condiçoes para o desenho dos retangulos
            x += 150;
            if (cont == 2 || cont == 5) {
                y += 150;
                x = 50;
            }
            cont++;
        }
        
        //Criaçao de cor de fundo
        var color = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        color.addColorStop(0, "rgb(84, 9, 42)");
        color.addColorStop(0.50, "rgb(202,5,51)");
        color.addColorStop(0.80, "rgb(255,145,34)");
        color.addColorStop(1, "rgb(254,213,1)");

        //Criaçao da funçao fundo
        function fundo() {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //Colocar a aficsaçao dos pontos
            ctx.fillStyle = "White";
            ctx.font = '25px Verdana';
            ctx.fillText("Pontos", 550, 130);
            ctx.fillText("______", 550, 135);
            ctx.fillText("Points", 550, 160);
            ctx.fillText(pontos, 550, 190);

            //Varias areas com diferentes retangulos 
            ctx.lineWidth = 4;
            for (var i = 0; i < rects.length; i++) {
                rects[i].desenha();
            }

            //Varias areas com diferentes nomes 
            ctx.font = '35px Verdana';
            ctx.fillStyle = "black";
            ctx.fillText("Bird", 80, 140);
            ctx.fillText("Bear", 230, 140);
            ctx.fillText("Dog", 390, 140);
            ctx.fillText("Bee", 85, 290);
            ctx.fillText("Mouse", 215, 290);
            ctx.fillText("Turtle", 375, 290);
            ctx.fillText("Tiger", 80, 440);
            ctx.fillText("Pig", 240, 440);
            ctx.fillText("Fish", 390, 440);
        }

        //Variaveis particulares do Drag&Drop
        var mouseX;
        var mouseY;

        function mouseDown(e) {
            // obtém as coordenadas do rato dentro do Canvas
            mouseX = e.pageX - canvas.offsetLeft;
            mouseY = e.pageY - canvas.offsetTop;
            // verifica se o rato se encontra posicionado em alguma Imagem
            for (var i = 0; i < img.length; i++) {
                if (img[i].isInside(mouseX, mouseY)) {
                    img[i].selected = true;
                    //ativa evento MouseMove
                    canvas.addEventListener('mousemove', mouseMove);
                }
            }
        }
        canvas.addEventListener('mousedown', mouseDown);

        function mouseMove(e) {
            // obtém as coordenadas do rato dentro do Canvas
            var mX = e.pageX - canvas.offsetLeft;
            var mY = e.pageY - canvas.offsetTop;
            //Novos valores para as imagens
            var changeInX = mX - mouseX;
            var changeInY = mY - mouseY;
            // guarda a nova posição do rato
            mouseX = mX;
            mouseY = mY;
            if (img[num].selected == true) {
                // atualiza posição do retângulo seleccionado
                img[num].x += changeInX;
                img[num].y += changeInY;
            }
        }

        function mouseUp(e) {
            // obtém as coordenadas do rato dentro do Canvas
            var mX = e.pageX - canvas.offsetLeft;
            var mY = e.pageY - canvas.offsetTop;

            //verificar acertividade
            acertividade();

            // desativa a flag do(s) rectângulo(s) seleccionado(s)
            img[num].selected = false;
            // remove evento mouseMove
            canvas.removeEventListener('mousemove', mouseMove);
        }
        canvas.addEventListener('mouseup', mouseUp);

        img[num].desenhada = true;

        //Funçao com sweetAlert de parabens 
        function Fim() {
            swal({
                title: "Parabéns!",
                text: pontos + " pontos",
                type: "success",
                confirmButtonText: "OK"
            });
        }

        //funçao para verificar a acertividade 
        function acertividade() {
            for (var j = 0; j < rects.length; j++) {
                //comparaçoes de pociçao
                if (img[num].x >= rects[j].x && img[num].x <= rects[j].x + 40 && img[num].y >= rects[j].y && img[num].y <= rects[j].y + 40) {
                    if (img[num].animal == rects[j].animal) {
                        // Ajusta a pociçao da imagem para ficar no sitio 
                        img[num].x = rects[j].x + 2;
                        img[num].y = rects[j].y + 2;
                        //Imagem correta fica sem a flag desenhada
                        img[num].desenhada = false;
                        //aumenta a variavel global para desenhar a proxima imagem
                        num++;

                        //aumenta os pontos do jogador quanda acerta
                        pontos = pontos + 10;

                        //condiçao para mostrar mensagem de Parabens de fim do jogo
                        if (num >= 9) {
                            Fim();
                        }

                        //carrega as imagens enquanto o array nao estiver vazio
                        if (animais.length != 0) {
                            loadImage();
                        }

                    } else {
                        //retira pontos ao jogador caso falhe no sitio 
                        pontos = pontos - 5;
                    }
                }
            }
        }

        //Animaçao
        var timer;
        function animar() {
            //atualizar fundo do jogo
            fundo();

            //desenha imagens do array
            for (var i = 0; i < img.length; i++) {
                img[i].desenha();
            }
        }
        timer = window.setInterval(animar, 10);

    }
}