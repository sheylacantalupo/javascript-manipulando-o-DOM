
// elementos podem ficar dentro de uma variável


// buscar todos os elementos dessa classe, vai retornar uma lista de elementos que possuem essa classe.
const controle = document.querySelectorAll(".controle-ajuste")

controle.forEach( (elemento) => {
    
    elemento.addEventListener("click", (evento) => {

        manipulaDados(evento.target.textContent, evento.target.parentNode);

    })


})



function manipulaDados (operacao, controle) {

    const peca = controle.querySelector('.controle-contador');

    if(operacao === '-') {
        peca.value = parseInt(peca.value) -1;
    }
    else {
        peca.value = parseInt(peca.value) +1;
    }
}