const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />'
//aqui é criado duas constante para o uso das imagens no formulário, especificando a tag inteira da html dela sem o necessário uso de ID
const atividades = []
const notas = []
//aqui são criados dois arrays vazios que vão ser preenchidos pelo push dentro da função de adicionar linha
const spanAprovado = '<span class="resultado aprovado"> Aprovado</span>';
const spanReprovado = '<span class="resultado Reprovado"> Reprovado</span>';
//aqui é criado duas constantes para exibição do conteúdo de aprovação ou reprovação, seguindo a mesma lógica dos emojis
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));
//aqui é feito um input do usuário para definir a nota mínima, deixando a escolha do usuário
let linhas = '';
//como o professor mostra, é necessário trazer para o escopo global, pois sempre que o submit é feito, ele reseta o valor, evitando de adicionar uma linha a mais
form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal()
//aqui o professor explica que é melhor separar as funçoes para evitar um código muito convoluto
})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {

    atividades.push (inputNomeAtividade.value);
    notas.push (parseFloat(inputNotaAtividade.value));
//aqui é utilizado o push para preencher as constantes no escopo global
//parseFloat é utilizado aqui para que o JS reconheça o value como numero, float é usado para caso seja um numero quebrado, int para numeros inteiros

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';
// aqui o sinal de += é uma concatenação, aqui é feito o conteudo que vai ser adicionado dentro da tabela, não esquecer a linha final com </tr> para fechar
//também é calculado a nota usando o >= sendo maior ou igual ? = if , : = else 

    linhas += linha;
//aqui é usado a concatenação para indicar que linhas sempre vai adicionar uma linha a mais
    }
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
//aqui é feito a limpeza do campo após os cálculos
    
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
//aqui é settado uma constante selecionando onde o conteudo vai ser adicionado, dentro da tabela
//usando o innerHTML = linha; ele usa a função feita e indica para o JS que é para inserir o código dentro da HTML
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
//aqui é feito a inserção dos resultados no HTML também calculando e exibindo a mensagem de aprovado ou reprovado
//novamente usando o >= diz que se a média for maior ou igual a notaMinima ?=if aprovado :else reprovado

}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }
//i é igual a zero e sempre que o i for menor que a quantidade de notas que o usuario insere o i++ acrescenta mais
    return somaDasNotas / notas.length;
//aqui é criado uma constante para fazer a média das notas, utilizando / para dividir a soma das notas pela quantidade de inputs do usuário com notas.lenght
}