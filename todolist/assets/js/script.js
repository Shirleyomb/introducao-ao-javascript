
const novaTarefa = document.querySelector("#input_id");
const botaoAdd = document.getElementById('botao_add_id');
const formulario = document.getElementById('form_id');
const listaDeTarefas = document.getElementById('lista_id');
const botaoMarca = document.getElementById('botao_marca_id');
const botaoLimpa = document.getElementById('botao_limpa_id');
// para o desafio extra
const modelo = document.getElementById('modelo_id')
const containerDeTarefas = document.getElementById('tarefas_id')

// 2. Processamentos através de eventos e funções

// função de adicionar a partir do click da usuária, um evento
botaoAdd.addEventListener('click', (event) => {
  event.preventDefault()

  const elementoLista = document.createElement('li')
  const textoTarefa = document.createElement('p')
  const iconeDeleta = document.createElement('span')

  textoTarefa.innerText = novaTarefa.value;
  iconeDeleta.innerText = "🗑"

  if(textoTarefa.innerText.trim() === '') {
    alert('Você precisa adicionar uma tarefa!')
    novaTarefa.classList.add('erro'); //adiciona classe erro ao elemento novaTarefa (input) - a classe está no css
    novaTarefa.addEventListener('animationend', event => { 
      novaTarefa.classList.remove('erro');
    })
  } else {
    listaDeTarefas.appendChild(elementoLista)
    elementoLista.appendChild(textoTarefa)
    elementoLista.appendChild(iconeDeleta)
    modelo.style.display = "none"
    containerDeTarefas.style.display = "block"
    formulario.reset()
  }
  novaTarefa.focus()

  // função para marcar individualmente uma tarefa
  textoTarefa.addEventListener('click', () => {
    textoTarefa.classList.toggle('checked')
    verificarMarcados() 
  })

  // função para deletar individualmente uma terefa
  iconeDeleta.addEventListener('click', () => {
    elementoLista.remove();
    if(listaDeTarefas.innerText == '') {
      modelo.style.display = "flex"
      containerDeTarefas.style.display = "none"
    } 
    verificarMarcados();
  })
  verificarMarcados() 
})

// função para marcar todas as tarefas:

botaoMarca.addEventListener('click', () => {
  let todasAsTarefas = document.querySelectorAll('p')

  if(botaoMarca.innerText === "Marcar todos") {
    todasAsTarefas.forEach((tarefa) => {
      tarefa.classList.add("checked")
    })
    botaoMarca.innerText = "Desmarcar todos"
  } else {
    todasAsTarefas.forEach((tarefa) => {
      tarefa.classList.remove("checked")
    })
    botaoMarca.innerText = "Marcar todos"
  }
})

// função para limpar todas as tarefas:
botaoLimpa.addEventListener('click', () => {
  listaDeTarefas.innerHTML = '';
  modelo.style.display = "flex";
  containerDeTarefas.style.display = "none"
})

// função que verifica se se todos estão marcados

function verificarMarcados() {
  let todasAsTarefas = document.querySelectorAll('p')
  let verificacao = [] //array vazia que recebe as tarefas que estão desmarcadas (que não possui classe checked)

  todasAsTarefas.forEach(tarefa => { //forEach pra verificar cada tarefa da array todasAsTarefas
    if(!tarefa.classList.contains("checked")){ //condição que verifica se a tarefa NÃO possui a classe checked
      verificacao.push(tarefa) //insere as tarefas desmarcadas na array verificacao
    };
  })
  
  //verificação se alguma tarefa estava desmarcada e foi adicionada no array verificacao
  if(verificacao.length === 0 && todasAsTarefas) { //se a array tiver vazia e existir uma lista de tarefas ele muda o texto do botão pra "Desmarcar"
    botaoMarca.innerText = "Desmarcar todos"  
  } else { //se a array verificacao tiver algum item, ele vai mudar o texto do botao para "Marcar"
    botaoMarca.innerText = "Marcar todos"
  }
} 

