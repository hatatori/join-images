
w = []
h = []

ArrayImage = []

function img(src) {
    im = new Image()
    im.src = src
    return im
}


function Text(_str, _x, _y) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = "14px monospace";
    ctx.fillStyle = 'white'
    ctx.strokeText(_str, _x - 1, _y + 10);
    ctx.strokeText(_str, _x + 1, _y + 10);
    ctx.strokeText(_str, _x - 1, _y + 10);
    ctx.strokeText(_str, _x + 1, _y + 10);

    ctx.font = "14px monospace";
    ctx.fillStyle = 'white'
    ctx.fillText(_str, _x, _y + 10)
}

function link(file) {
    r = new FileReader()
    r.readAsDataURL(file)
    r.onload = function () {

        url = this.result

        imagem_canvas = img(url)

        extra.appendChild(imagem_canvas)

        imagem_canvas.onload = function () {

            name = file.name

            ArrayImage.push({
                url: this.src,
                w: this.width,
                h: this.height,
                n: name
            })


            if (k.length == ArrayImage.length) {
                ColDrawImageCanvas(1)
                extra.classList.add("invisible")
            }

        }



    }



}


up.onchange = function (e) {
    k = this.files
    for (i of this.files)
        link(i)





}

function imageToCanvas(src, x, y) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var foto = img(src)
    ctx.drawImage(foto, x, y);
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function horizontalDrawImageCanvas() {

    [x, y] = [0, 0]

    for (i of ArrayImage) {
        x += i.w
        y = y < i.h ? i.h : y
    }


    myCanvas.width = x
    myCanvas.height = y

    x = 0
    y = 0

    // dy = parseInt((maiorFoto[1]-j.h)/2)
    dy = 0

    for (j of ArrayImage) {
        foto = img(j.url)
        ctx.drawImage(foto, x, y + dy);
        x = x + j.w
    }
}

function VerticalDrawImageCanvas() {

    [x, y] = [0, 0]

    for (i of ArrayImage) {
        y += i.h
        x = x < i.w ? i.w : x
    }

    myCanvas.width = x
    myCanvas.height = y

    x = 0
    y = 0

    for (j of ArrayImage) {
        foto = img(j.url)
        ctx.drawImage(foto, x, y);
        y = y + j.h
    }
}

function GetMajorDimension() {
    [ax, ay] = [0, 0]

    for (i of ArrayImage) {
        ay = ay < i.h ? i.h : ay
        ax = ax < i.w ? i.w : ax
    }

    maiorFoto = [ax, ay]
    return maiorFoto
}


function ColDrawImageCanvas(n) {

    [x, y] = [0, 0]

    m = GetMajorDimension()

    largura = m[0] * n
    quantidade = ArrayImage.length
    diferenca = quantidade - n + 1

    myCanvas.width = largura
    myCanvas.height = Math.ceil(quantidade / n) * m[1]

    x = 0
    y = 0

    for (j of ArrayImage) {

        foto = img(j.url)

        dx = parseInt((m[0] - j.w) / 2)
        dy = parseInt((m[1] - j.h) / 2)


        ctx.drawImage(foto, x + dx, y + dy);

        // for(z=0;z<10;z++)
        // if(nameofpic.checked)
        // Text(j.n,x+10,y+m[1]-25)

        // putText()



        x = x + maiorFoto[0]

        y = (x > largura - 1) ? y + m[1] : y

        x = (x > largura - 1) ? 0 : x
    }

    canvasToImage()
}

function canvasToImage() {
    // pega o conteudo do canvas e joga pra dentro do #imagem_conteudo

    const img = document.querySelector("#imagem_conteudo")
    const myCanvas = document.querySelector("#myCanvas")

    // converte o conteúdo do canvas para uma URL de dados no formato PNG
    const dataURL = myCanvas.toDataURL('image/png');
    img.src = dataURL;
    // document.body.appendChild(img);

}


function putText() {
    om = GetMajorDimension()

    px = -1
    py = 0

    for (l of ArrayImage) {

        px++

        nome = l.n
        nome = nome.match(/(.*)(\..+)/i)

        if (px * m[0] == largura) {
            py++
            px = 0
        }

        Text(nome[1], px * m[0] + 10, py * m[1] + m[1] - 25)
    }
}

colums.onchange = function (e) {
    ColDrawImageCanvas(parseInt(this.value))
}

window.onkeyup = function (e) {
    if (e.key == '*')
        ColDrawImageCanvas(1)
}
