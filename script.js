
let modalQTD;
let modalKey = 0;
let cart = [];

/* Map - Vai ler linha a linha do array, ele vai ler a 1 linha do vetor, a 2 linha do vetor e assim por diante vai ser obrigado a passar dois parametros entao ele vai pegar o 1 item na posiçao 0(index) que e o primeiro item do array que começa na posição 0 */
pizzaJson.map ((item,index) => {
    /* Clonando o pizza-item, clona o elemento e toda a estrutura dele o true e pra ele entender que precisa clonar ,precisa colocar true no clonenode pra ele entender que ele precisa clonar*/
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);


    /* Append vai jogar por ultimo, nao vai apagar o que ja tem so vai adicionar por ultimo*/
    document.querySelector('.pizza-area').append(pizzaItem)


    document.querySelector('.pizza-item--img img').src = item.img;

    /* Tofixed - Adiciona 2 casas decimais */
    /* Replace - Trocara o . pela , */
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.' , ',')}`;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    /* SetAttribute - Definindo um atributo chamado data-key ao elemento .pizza-item contendo o id da pizza que foi selecionado pelo usuario */
    /* O atributo data-key permite enviar dados através do html, esses dados podem ser utilizados posteriormente por uma janela modal ou por qualquer outro componente */
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        /* Iniciando a variavel sempre com o valor 1 */
        modalQTD = 1;

        /* Está variavel será usada para identificar em qual pizza o usuario clicar em adicionar pizza ao carrinho */
        modalKey = index;

        /* queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
        closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.
        getAttribute =  pega o valor de um atributo */
        let key = event.target.closest('.pizza-item').getAttribute('data-key');


        /* Definindo a opacidade 0 para que a modal não seja exibida na tela logo de inicio */
        document.querySelector('.pizzaWindowArea').style.opacity = 0;

        /* Exibindo a janela modal na tela ao clicar em uma pizza */
        document.querySelector('.pizzaWindowArea').style.display = 'flex';

        /* setTimeout = permite executar um código depois de um tempo estipulado, esse tempo será em milisegundos */
        setTimeout(() => {
            /* Definindo a opacidade para 1 para que a modal seja exibida na tela , lembrando no css temos uma transition e assim qualquer animação adicionada irá demorar o tempo da transition para acontecer, nesse caso será de 0.5s, assim a opacidade irá do 0 ao 1 demorando 0.5s para acontecer, isso irá gerar um efeito de transição suave dando a impressao que a modal está surgindo na tela */
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 150);

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;

        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `RS ${pizzaJson[key].price.toFixed(2).replace('.' , ',')}`;

        /* Removendo a classe selecionada dos tamanhos de pizza, assim garantimos que nenhuma pizza estará selecionada antes*/
        /* .pizzaInfo--size.selected - Quando no JavaScript quisermos fazer refêrencia a um elemento que possui duas classes, devemos informar o nome destas classes juntas conforme fizemos abaixo, desta forma o javascript irá entender que deve selecionar apenas o elemento que possuir as duas classes*/
        document.querySelector('.pizzaInfo--size.selected').classList.remove('.selected');

        /* Selecionando todos elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos */
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

            /* Fará que o tamanho grande sempre seja selecionada por padrão ao usuário licar em uma pizza */
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            /* Size.queryselector('span').innerHTML = '123'; */
        });

        
    })

    /* Append vai jogar por ultimo, nao vai apagar o que ja tem so vai adicionar por ultimo*/
    document.querySelector('.pizza-area').append(pizzaItem);
})

/* --------- Fim Exibe Informações das pizzas ------------- */


/* --------- Funcionalidades Janela Modal ------------------*/

/* --------- Função que Fecha o Modal --------------------- */
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'; 
    }, 500)
}

/* Estamos usando o forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em algum botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela. */
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

/* document.querySelector('pizzaInfo--cancelButton').addEventListener('click', (event) => {
    closeModal();
})

document.querySelector('pizzaInfo--cancelMobileButton').addEventListener('click', (event) => {
    closeModal();
}) */

/* ---------------- Quantidade de Pizzas ------------------ */

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    /* A cada vez que o usuario cliar no modal a variavel modalQTD será incrementada em +1 */
    modalQTD++;

    /* Selecionando o elemento onde a quantidade de pizzas irá aparecer e atualizando-o conforme a variavel modalQTD */
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQTD;
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {    
    if (modalQTD > 1) {
        modalQTD--
    }

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQTD;
});



