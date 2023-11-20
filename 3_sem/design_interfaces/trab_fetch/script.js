document.addEventListener('DOMContentLoaded', function () {
    // Carregar os dados dos países ao carregar a página
    carregarPaises();

    // Consultas a CEPs fixos quando a página é carregada
    consultarCEPFixo('01311300', 'resultadoCEPFixo1');
    consultarCEPFixo('20040902', 'resultadoCEPFixo2');
    consultarCEPFixo('04870470', 'resultadoCEPFixo3');
});

function carregarPaises() {
    fetch('paises.json')
        .then(response => response.json())
        .then(data => {
            const selectPaises = document.getElementById('paisesSelect');

            // Adicionar opções ao campo select
            data.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.sigla; // Use a sigla do país como valor
                option.text = pais.nome_pais; // Use o nome do país como texto
                selectPaises.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar países:', error));
}

// Consulta à Brasil API: Informações sobre CEP
function consultarCEP() {
    const cepInput = document.getElementById('cepInput').value;
    fetch(`https://brasilapi.com.br/api/cep/v1/${cepInput}`)
        .then(response => response.json())
        .then(data => {
            const resultado = JSON.stringify(data, null, 2);
            exibirResultadoConsulta(resultado, 'resultadoCEP');
        })
        .catch(error => console.error('Erro na consulta à Brasil API:', error));
}

// Consulta à Brasil API: Informações sobre CEP
function consultarDDD() {
    const dddInput = document.getElementById('dddInput').value;

    fetch(`https://brasilapi.com.br/api/ddd/v1/${dddInput}`)
        .then(response => response.json())
        .then(data => {
            const resultado = JSON.stringify(data, null, 2);
            exibirResultadoConsulta(resultado, 'resultadoDDD');
        })
        .catch(error => console.error('Erro na consulta à Brasil API:', error));
}

// Consulta à Brasil API: Informações sobre CEP
function consultarBanco() {
    const bancoInput = document.getElementById('bancoInput').value;

    fetch(`https://brasilapi.com.br/api/banks/v1/${bancoInput}`)
        .then(response => response.json())
        .then(data => {
            const resultado = JSON.stringify(data, null, 2);
            exibirResultadoConsulta(resultado, 'resultadoBanco');
        })
        .catch(error => console.error('Erro na consulta à Brasil API:', error));
}

function carregarDadosPais() {
    const selectPaises = document.getElementById('paisesSelect');
    const dadosPaisDiv = document.getElementById('dadosPais');

    // Limpar dados anteriores
    dadosPaisDiv.innerHTML = '';

    // Obter a sigla do país selecionado
    const siglaSelecionada = selectPaises.value;

    // Carregar os dados específicos do país
    fetch('paises.json')
        .then(response => response.json())
        .then(data => {
            const paisSelecionado = data.find(pais => pais.sigla === siglaSelecionada);

            // Usar reduce para construir o parágrafo com as informações do país
            const paragrafo = Object.keys(paisSelecionado).reduce((acc, key) => {
                return acc + `${key.charAt(0).toUpperCase() + key.slice(1)}: ${paisSelecionado[key]}, `;
            }, '');

            // Adicionar o parágrafo à div
            dadosPaisDiv.innerHTML = `<p>${paragrafo.slice(0, -2)}</p>`;
        })
        .catch(error => console.error('Erro ao carregar dados do país:', error));
}

function carregarDadosMetadados() {
    const selectMetadados = document.getElementById('metadadosInputForm');
    const dadosMetadadosDiv = document.getElementById('infoTabela');

    // Limpar dados anteriores
    dadosMetadadosDiv.innerHTML = '';

    // Obter o tipo de metadado selecionado
    const metadadoSelecionado = selectMetadados.value;

    // Carregar os dados específicos do metadado usando destructuring
    fetch(`https://www.ipeadata.gov.br/api/odata4/Metadados('${metadadoSelecionado}')`)
        .then(response => response.json())
        .then(({ value: [primeiroItem] }) => {
            const paragrafos = [];
        
            // Filtrar as chaves que não têm valores vazios
            const chavesNaoVazias = Object.entries(primeiroItem).filter(([_, valor]) => valor !== '');
        
            // Iterar sobre as chaves e valores filtrados
            chavesNaoVazias.forEach(([key, valor]) => {
                const paragrafo = document.createElement('p');
                paragrafo.textContent = `${key}: ${valor}`;
                paragrafos.push(paragrafo);
            });
        
            // Adicionar os parágrafos à div
            paragrafos.forEach(paragrafo => {
                dadosMetadadosDiv.appendChild(paragrafo);
            });
        })
        .catch(error => console.error('Erro ao carregar dados dos metadados:', error));
}


function consultarMetadados() {
    const selectMetadados = document.getElementById('metadadosInputForm');
    const dadosMetadadosDiv = document.getElementById('infoTabela');

    // Limpar dados anteriores
    dadosMetadadosDiv.innerHTML = '';

    // Obter o tipo de metadado selecionado
    const metadadoSelecionado = selectMetadados.value;

    // Realizar o fetch dos dados do metadado
    fetch(`https://www.ipeadata.gov.br/api/odata4/Metadados('${metadadoSelecionado}')/Valores/`)
        .then(response => response.json())
        .then(data => {
            data = data.value
            console.log(data)
            if (data.length > 0) {
                // Criar a tabela
                const tabela = document.createElement('table');
                tabela.border = '1';

                // Criar o cabeçalho da tabela
                const cabecalho = tabela.createTHead();
                const linhaCabecalho = cabecalho.insertRow();

                // Adicionar cabeçalho para cada propriedade no primeiro item do JSON
                for (const key in data[0]) {
                    const th = document.createElement('th');
                    th.textContent = key;
                    linhaCabecalho.appendChild(th);
                }

                // Adicionar as linhas da tabela com os dados
                data.forEach(item => {
                    const linha = tabela.insertRow();
                    for (const key in item) {
                        const celula = linha.insertCell();
                        celula.textContent = item[key];
                    }
                });

                // Adicionar a tabela à div
                dadosMetadadosDiv.appendChild(tabela);
            } else {
                dadosMetadadosDiv.textContent = 'Nenhum dado encontrado.';
            }
        })
        .catch(error => console.error('Erro ao carregar dados dos metadados:', error));
}

// Função para tratar os resultados da consulta à Brasil API
function exibirResultadoConsulta(resultado, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<p>${resultado}</p>`;
}


// Consulta à Brasil API: Informações sobre CEP fixo
function consultarCEPFixo(cep, containerId) {
    fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(response => response.json())
        .then(data => {
            const resultado = JSON.stringify(data, null, 2);
            exibirResultadoConsulta(resultado, containerId);
        })
        .catch(error => console.error('Erro na consulta à Brasil API:', error));
}


function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  }
  
  function fetchDataWithPromiseAny() {
    const urls = [
      'https://jsonplaceholder.typicode.com/todos/1',
      'https://jsonplaceholder.typicode.com/todos/2',
      'https://jsonplaceholder.typicode.com/todos/3'
    ];
  
    Promise.any(urls.map(url => fetchData(url)))
      .then(json => {
        const anyDiv = document.getElementById('anyDiv');
        anyDiv.textContent = `Promise.any resolved: ${JSON.stringify(json)}`;
      })
      .catch(error => {
        const anyDiv = document.getElementById('anyDiv');
        anyDiv.textContent = `Promise.any rejected: ${error.message}`;
      });
  }
  
  function fetchDataWithPromiseRace() {
    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2',
      'https://jsonplaceholder.typicode.com/posts/3'
    ];
  
    Promise.race(urls.map(url => fetchData(url)))
      .then(json => {
        const raceDiv = document.getElementById('raceDiv');
        raceDiv.textContent = `Promise.race resolved: ${JSON.stringify(json)}`;
      })
      .catch(error => {
        const raceDiv = document.getElementById('raceDiv');
        raceDiv.textContent = `Promise.race rejected: ${error.message}`;
      });
  }
  
  function fetchDataWithPromiseAll() {
    const urls = [
      'https://jsonplaceholder.typicode.com/comments/1',
      'https://jsonplaceholder.typicode.com/comments/2',
      'https://jsonplaceholder.typicode.com/comments/3'
    ];
  
    Promise.all(urls.map(url => fetchData(url)))
      .then(jsonArray => {
        const allDiv = document.getElementById('allDiv');
        allDiv.textContent = `Promise.all resolved: ${JSON.stringify(jsonArray)}`;
      })
      .catch(error => {
        const allDiv = document.getElementById('allDiv');
        allDiv.textContent = `Promise.all rejected: ${error.message}`;
      });
  }
  