const JsBarcode = require('jsbarcode');
const jsPDF = require('jspdf');

// elementos podem ficar dentro de uma variável

// buscar todos os elementos dessa classe, vai retornar uma lista de elementos que possuem essa classe. (4)

const controle = document.querySelectorAll("[data-controle]");

const estatisticas = document.querySelectorAll("[data-estatistica]");
console.log(estatisticas);
console.log(estatisticas["forca"])



// a busca através do getElementById é mais rápida
const gerarpdf = document.getElementById('gerarpdf');

const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

// usando o forEach por se tratar de uma lista de elementos, onde todos precisam ser verificador da mesma forma
controle.forEach( (elemento) => {
    
    elemento.addEventListener("click", (evento) => {

        manipulaDados(evento.target.dataset.controle, evento.target.parentNode);

        atualizaEstatisticas(evento.target.dataset.peca);
        
    })
})


function manipulaDados (operacao, controle) {

    const peca = controle.querySelector("[data-contador]");
    

    if(operacao === '-') {
        peca.value = parseInt(peca.value) -1;
    }
    else {
        peca.value = parseInt(peca.value) +1;
    }
}


function atualizaEstatisticas (peca) {

    // testando se a lógica do clic está correta 
    console.log(pecas[peca]);

    //texto ser atualizdo com um novo valor a cada vez que um item for clicado
    estatisticas.forEach( (elemento) => {

        console.log(elemento.dataset.estatistica);

        elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica]
    })

}


gerarpdf.addEventListener("click", () => {

    console.log("entrei no evento");

    gerarPdf();

})



function gerarPdf() {

    window.jsPDF = window.jspdf.jsPDF;
    
    var doc = new jsPDF('p', 'mm', 'a4');
   

    // var logo = 'https://s3.amazonaws.com//beta-img.b2bstack.net/uploads/production/product/product_image/3870/ypcontrol.jpg';
    // var logo = 'https://cdn.logo.com/hotlink-ok/logo-social.png';
    // var imgURL = 'https://logospng.org/wp-content/uploads/bradesco.jpg';

    //doc.addImage(imgURL, 'JPEG', 100, 100, 50, 50);

    let texto = estatisticas[0].textContent;
    let texto1 = estatisticas[1].textContent;
    let texto2 = estatisticas[2].textContent;
    let texto3 = estatisticas[3].textContent;

    // doc.setLineCap("round");


    var borderWidth = 10; // 10mm = 1cm
    var x = borderWidth;
    var y = borderWidth;
    var width = doc.internal.pageSize.width - borderWidth * 2;
    var height = doc.internal.pageSize.height - borderWidth * 2;
    // espessura da borda
    doc.setLineWidth(1);
    // borda do pdf
    doc.rect(x, y, width, height);

    

    doc.setFontSize(22);
    doc.text(100, 100, texto);
    doc.text(100, 110, texto1);
    doc.text(100, 120, texto2);
    doc.text(100, 130, texto3);
    doc.text(50, 20, 'Relatório - Produção Robotrom');

    // doc.addImage(logo, 'JPEG', 15, 40, 180, 160);

    doc.autoPrint();

    // Abre em nova janela
    // doc.output("dataurlnewwindow");


    doc.save('relatório.pdf');


}



// <input  type="submit" value="Imprimir relatório" class="producao" id="gerarPdf">

