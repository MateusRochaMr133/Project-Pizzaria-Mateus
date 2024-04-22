
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


/* ---------------- Tamanho das Pizzas ------------------ */

/* Selecionando todos os elementos pizzaInfo--size pegando o tamanho da pizza e a posição dos elementos */
document.querySelectorAll('.pizzaInfo--size').forEach((item, sizeIndex)  => {
    /* sempre que em um sistemas tivermos que selecionar uma opção diferente e uma opção anterior estiver selecionada, devemos primeiro tirar a seleção de todas as opções anteriores e só depois selecionar a nova opção que o usuário selecionou.*/
    item.addEventListener('click', (event) => {

        /* Removendo a classe selecionada dos tamanho da pizza, assim garantimos que nenhuma pizza estará selecionada do usuario selecionar um tamanho */
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        
        /*Adicionando a classe selected ao tamanho que o usuario está clicando*/
        item.classList.add('selected')

    })

}) 


/* ----------- Botão Adicionar ao Carrinho ------------------ */

document.querySelector('.pizzaInfo--addButton').addEventListener('click', () => {
 //Quando o usuário clicar no botão adicionar pizza ao carrinho precisaremos saber - Qual a pizza - Qual o tamanho da pizza, -Quantas pizzas serão adicionadas.
 
    // Qual a pizza
    //console.log("Pizza: "+ modalKey)
 
    //Qual o tamanho da pizza
    //para sabermos o tamanho da pizza, iremos pegar o valor do atributo data-key pois cada número identifica um tamanho de pizza
    //parseInt = converter o tamanho que está no data-key em inteiro pois o mesmo é uma string
    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
    /* Console.log("Tamanho :" +size) */

    /* Criando um identificador para detectar quando estão sendo adicionadas pizzas iguais ao carrinho, assim evitamos que ele crie uma nova chave para a mesma pizza */
    let identifier = pizzaJson[modalKey].id + '@' + size;
    /* console.log(identifier) */

    /* FindIndex procura elementos ou itens iguais ou seja varrendo o vetor cart bucando por itens iguais nele, ou seja por pizzas iguais dentro do vetor */
    let key = cart.findIndex((item) => {
        return item.identifier == identifier
    })

    /* Caso seja encontrado itens iguais no vetor, ou seja pizzas iguais no vetor iremos atualizar a quantidade de pizzas ao invez de adicionar uma nova */
    if (key > -1) {
        cart[key].qt += modalQTD
    } 
    else {
        /* push - Permite adicionar novos elemetnos ao final do array, ou seja , ao usar o push tudo o que for passado a ele será adicionado ao final do array */
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQTD
        })
    }

    /* console.log(cart) */
    updateCart();
    closeModal();
})


/* ----------- Atualização Do Carrinho ---------------------- */


/* Exibindo o carrinho caso tenham pizzas adicionais */
document.querySelector('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        document.querySelector('aside').style.left = '0';
    }
})

/* Escondendo o carrinho ao usuario clicar em fechar carrinho */
document.querySelector('.menu-closer').addEventListener('click', () => {
    document.querySelector('aside').style.left = '100vw';
})


function updateCart() {
    /* Atualizando a quantidade de pizzas no carrinho na versão mobile */
    document.querySelector('.menu-openner span').innerHTML = cart.length;


    /* Verificando se o carrinho possue pizzas adicionadas */
    if (cart.length > 0) {
        /* Adicionando a classe show a tag aside, isso fará com que o carrinho seja exibido na tela */
        document.querySelector('aside').classList.add('show');

        /* Limpando o html antes de exibir as pizzas novamente */
        document.querySelector('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            /* Iremos procurar dentro no pizzaJson itens que tenham o mesmo id da pizza a qual o usuário clicou, a função find irá buscar no array e em seguida jogar dentro do parâmetro item. Nesse caso usamos a função find ao invés de findInde pois queremos retornar todas as informações dos itens do json e não somente o índice dele(posição no array) */
            let pizzaItem = pizzaJson.find((item) => {
                /* Procurando nos itens do array que serão adicionados no parâmetros(variável) item e iremos procurar o id deste item por um item que será igual ao item que estiver no carrinho, assim poderemos exibir as informações desse item */
                return item.id == cart[i].id;
            })

            /* Atualizando o subtotal */
            subTotal += pizzaItem.price * cart[i].qt;

            /* Clonando o elemento pizza-item onde serão exibidos os dados da pizza no carrinho */
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);

            /* O switch case irá percorrer o array de tamanho de pizzas adicionando uma letra correspondente ao tamanho da pizza, se não fizessemos isso não teriamos como o usuário saber o tamanho da pizza que ele está comprando. */
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2 :
                    pizzaSizeName = 'G'
                    break;
            }

            /* Concatenando o nome da pizza com o tamanho da mesma */
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            

        }

    }

}