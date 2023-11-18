// REGISTRATION
const random_hex_color = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

const setTeamsNumber = () => {
    const teamsNumber = document.getElementById("numberOfTeams").value
    window.localStorage.setItem('numberOfTeams', teamsNumber)
}

const getTeamsNumber = () => {
    return Number(window.localStorage.getItem("numberOfTeams"))
}

const setTeamNames = () => {
    const numberOfTeams = getTeamsNumber()
    const teamsNames = []

    // Captura os iputs
    for(let teamNumber=1; teamNumber <= numberOfTeams; teamNumber++){
        teamsNames.push(document.getElementById(`t${teamNumber}_name`).value)
    }

    // Verifica se há valores vazios
    if (teamsNames.includes("")) {
        Swal.fire("Por favor, preencha todos os campos de nome do time.")
        return false
    }
    // Verifica se há valores duplicados
    if (new Set(teamsNames).size !== teamsNames.length) {
        Swal.fire("Não podem haver times com o mesmo nome")
        return false
    }

    // Armazena os valores no local storage
    for(const [index, teamName] of teamsNames.entries()){
        window.localStorage.setItem(`t${index+1}Name`, teamName)
    }
    
    return true
}

const setTeamColors = () => {
    const numberOfTeams = getTeamsNumber()
    const teamsColors = []

    // Captura os iputs
    for(let teamNumber=1; teamNumber <= numberOfTeams; teamNumber++){
        teamsColors.push(document.getElementById(`t${teamNumber}_color`).value)
    }

    // Armazena os valores no local storage
    for(const [index, teamColor] of teamsColors.entries()){
        window.localStorage.setItem(`t${index+1}Color`, teamColor)
    }

}

const createArray = () => {
    let numberOfTeams = getTeamsNumber()
    return Array.from(Array(numberOfTeams).fill(0).map((e,i)=>i=0))
}

const createTotalGoals = () => {
    const numberOfTeams = getTeamsNumber()
    window.localStorage.setItem(`teamsGoals`, Array.from(Array(numberOfTeams).fill(0).map((e,i)=>i=0)))
}

const createRegistrationButton = () => {

    const divButton = document.createElement("div")
    divButton.classList.add('container')
    divButton.classList.add('mt-3')
    divButton.classList.add('d-grid')
  
    const button = document.createElement("button")
    button.classList.add("btn")
    button.classList.add("btn-primary")
    button.onclick = () => { startTournament() }
    button.innerText= 'Começar torneio!'
  
    divButton.appendChild(button)
  
    return divButton
}

const createRegistrationElements = () => {
    const registrationDiv = document.getElementById('show-content')
    const numberOfTeams = getTeamsNumber()


    const registrationFormsDiv = document.createElement('div')
    registrationFormsDiv.classList.add("container","center","text-center","justify-content-center")
    registrationFormsDiv.setAttribute("id", `content`)

    const title = document.createElement("h1")
    title.innerText = "Registro"
    registrationFormsDiv.appendChild(title)

    for(let teamNumber=1; teamNumber <= numberOfTeams; teamNumber++){
        let card = createRegistrationCard(teamNumber)
        registrationFormsDiv.appendChild(card)
    }

    const button = createRegistrationButton()
        
    registrationDiv.appendChild(registrationFormsDiv)
    registrationDiv.appendChild(button)
}

const createRegistrationCard = (teamNumber) => {
    const registrationCardDiv = document.createElement('div')
    registrationCardDiv.classList.add("card","text-center","col-sm","mb-3")
    // registrationCardDiv.style.width = '16rem'

    const cardHeaderDiv = document.createElement('h5')
    cardHeaderDiv.classList.add("card-header")
    cardHeaderDiv.innerText = `Time ${teamNumber}`

    const cardBodyDiv = document.createElement('div')
    cardBodyDiv.classList.add("card-body")

    const inputNameDiv = document.createElement('div')
    inputNameDiv.classList.add("mb-3")

    const teamNameLabel = document.createElement('label')
    teamNameLabel.innerText = `Nome do time`
    teamNameLabel.setAttribute("for", `t${teamNumber}_name`)
    teamNameLabel.classList.add("form-label")

    const teamNameInput = document.createElement('input')
    teamNameInput.setAttribute("type", 'text')
    teamNameInput.setAttribute("placeholder", 'Nome do time')
    teamNameInput.setAttribute("id", `t${teamNumber}_name`)
    teamNameInput.classList.add("form-control")

    const teamColorLabel = document.createElement('label')
    teamColorLabel.innerText = `Cor do time`
    teamColorLabel.setAttribute("for", `t${teamNumber}_color`)
    teamColorLabel.classList.add("form-label")

    const teamColorInput = document.createElement('input')
    teamColorInput.setAttribute("type", 'color')
    teamColorInput.setAttribute("value", random_hex_color())
    teamColorInput.setAttribute("title", 'Choose your color')
    teamColorInput.setAttribute("id", `t${teamNumber}_color`)
    teamColorInput.classList.add("form-control")


    inputNameDiv.appendChild(teamNameLabel)
    inputNameDiv.appendChild(teamNameInput)
    cardBodyDiv.appendChild(inputNameDiv)
    cardBodyDiv.appendChild(teamColorLabel)
    cardBodyDiv.appendChild(teamColorInput)
    registrationCardDiv.appendChild(cardHeaderDiv)
    registrationCardDiv.appendChild(cardBodyDiv)

    return registrationCardDiv
}

const startRegistration = () => {
    // Set number of teams in localstorage
    setTeamsNumber()

    // Remove initial elements
    document.getElementById('format').remove()

    // Remove some classes from main
    const main = document.getElementById('main')
    main.classList.remove("container","d-flex");

    // Create forms for registration
    createRegistrationElements()

}

// TOURNAMENT

const getTeamDetails = () => {
    const numberOfTeams = getTeamsNumber()

    const teamsDetails = {}

    for (i = 1; i <= numberOfTeams; i++) {
        teamsDetails[`t${i}`] = {
            name:window.localStorage.getItem(`t${i}Name`),
            color:window.localStorage.getItem(`t${i}Color`)
        };
    }
    return teamsDetails
}

function setMatches(matchCombinations) {
    const matchCombinationsJSON = JSON.stringify(matchCombinations)
    window.localStorage.setItem('matches', matchCombinationsJSON)
}

function getMatchResults() {
    return JSON.parse(window.localStorage.getItem('matches'))
}

function generateMatchCombinations(teams) {
    const matchCombinations = {};
    let matchNumber = 1;

    const teamKeys = Object.keys(teams) // Obtenha as chaves do objeto teams

    for (let i = 0; i < teamKeys.length; i++) {
        for (let j = i + 1; j < teamKeys.length; j++) {
            const match = {};
            match[teamKeys[i]] = 0;
            match[teamKeys[j]] = 0;
            matchCombinations[matchNumber] = match;
            matchNumber++;
        }
    }

    return matchCombinations;
}


const createMatchCard = (match, scores) => {
    const matchCardDiv = document.createElement('div')
    const teams = getTeamDetails()
    matchCardDiv.classList.add("card","text-center","mb-3")

    const cardHeaderDiv = document.createElement('div')
    cardHeaderDiv.classList.add("card-header")
    cardHeaderDiv.innerText = `Partida ${match}`

    const cardBodyDiv = document.createElement('div')
    cardBodyDiv.classList.add("card-body")

    const rowDiv = document.createElement('div')
    rowDiv.classList.add("row")

    for(const [key, value] of Object.entries(scores)) {
        let colSmDiv = document.createElement('div')
        colSmDiv.classList.add("col-sm-6")

        let cardBodyDiv = document.createElement('div')
        colSmDiv.classList.add("card-body")

        let rowJustifyDiv = document.createElement('div')
        rowJustifyDiv.classList.add("row","justify-content-center")

        let scoreLabel = document.createElement('label')
        scoreLabel.classList.add("form-label")
        scoreLabel.setAttribute("for", `match${match}_${key}_score`)
        scoreLabel.textContent = teams[`${key}`].name
        scoreLabel.style.color = teams[`${key}`].color

        let scoreInput = document.createElement('input')
        scoreInput.setAttribute("type", "number")
        scoreInput.classList.add("form-control")
        scoreInput.setAttribute("placeholder", 0)
        scoreInput.setAttribute("id", `match${match}_${key}_score`)
        scoreInput.setAttribute("min", 0)

        rowJustifyDiv.appendChild(scoreLabel)
        rowJustifyDiv.appendChild(scoreInput)
        cardBodyDiv.appendChild(rowJustifyDiv)
        colSmDiv.appendChild(cardBodyDiv)
        rowDiv.appendChild(colSmDiv)
    }
    cardBodyDiv.appendChild(rowDiv)
    matchCardDiv.appendChild(cardHeaderDiv)
    matchCardDiv.appendChild(cardBodyDiv)

    return matchCardDiv
}

const createTournamentButton = () => {

    const divButton = document.createElement("div")
    divButton.classList.add('container')
    divButton.classList.add('mt-3')
    divButton.classList.add('d-grid')
  
    const button = document.createElement("button")
    button.classList.add("btn")
    button.classList.add("btn-primary")
    button.onclick = () => { calcResults() }
    button.innerText= 'Começar torneio!'
  
    divButton.appendChild(button)
  
    return divButton
}

const createTournamentElement = () => {
    const showContent = document.getElementById('show-content')
    showContent.innerHTML = ''
    const matches = getMatchResults()

    const contentDiv = document.createElement('div')
    contentDiv.classList.add("container","center","text-center","justify-content-center")
    contentDiv.setAttribute("id", `content`)

    const title = document.createElement("h1")
    title.innerText = "Partidas do torneio"
    contentDiv.appendChild(title)
    
    Object.entries(matches).forEach(([match, scores]) => {
        let card = createMatchCard(match,scores)
        contentDiv.appendChild(card)
    })

    const button = createTournamentButton()
        
    showContent.appendChild(contentDiv)
    contentDiv.appendChild(button)
}

const startTournament = () => {
    const hasSavedTeamNames = setTeamNames()
    if (hasSavedTeamNames) {
      setTeamColors()
      createTotalGoals()
      const teams = getTeamDetails()
      const matchCombinations = generateMatchCombinations(teams)
      setMatches(matchCombinations)
      createTournamentElement()
    } 
}

const setTournamentScores = () => {
    const matches = getMatchResults()
    for (let match in matches){
        for (let team in matches[match]){
            if (document.getElementById(`match${match}_${team}_score`).value < 0){
                Swal.fire("Não podem haver valores negativos!")
                return false
            }
            matches[match][team] = document.getElementById(`match${match}_${team}_score`).value == '' ? 0 : Number(document.getElementById(`match${match}_${team}_score`).value)
        }
    }
    setMatches(matches)
    return true
}

const setTeamsPontuations = (pointsArray) => {
    return  window.localStorage.setItem('teamsPontuations', pointsArray)
}

const getTeamsPontuation = () => {
    const teamsPontuations = window.localStorage.getItem('teamsPontuations').split(',').map(Number)
    return  teamsPontuations
}

const setTeamsGoalScore = (goalsArray) => {
    return  window.localStorage.setItem('teamsGoals', goalsArray)
}

const getTeamsGoalScore = () => { 
    const teamsGoals = window.localStorage.getItem('teamsGoals').split(',').map(Number)
    return  teamsGoals
}

const getTeamsResults = () => {
    const matches = getMatchResults()
    let pointsArray = createArray()
    let goalsArray = createArray()

    for (let match in matches) {
        let team = Object.keys(matches[match])
        console.log(team)
        if (Number(matches[match][team[0]]) < Number(matches[match][team[1]]) ) {
            pointsArray[Number(team[1].substring(1)) - 1] += 3;
        } else if (Number(matches[match][team[0]]) > Number(matches[match][team[1]])) {
            pointsArray[Number(team[0].substring(1)) - 1] += 3;
        } else {
            // Empate
            for (let team in matches[match]) {
                pointsArray[Number(team.substring(1)) - 1] += 1;
            }
        }
        goalsArray[Number(team[1].substring(1)) - 1] += Number(matches[match][team[1]]) - Number(matches[match][team[0]])
        goalsArray[Number(team[0].substring(1)) - 1] += Number(matches[match][team[0]]) - Number(matches[match][team[1]])
    }
    return {
        goalsArray, 
        pointsArray
        }
}

function calcularResultadoCampeonato(pontuacoes, gols) {
    // Crie um array de índices de times ordenados por pontuação e saldo de gols
    const times = Array.from(pontuacoes.keys()).sort((a, b) => {
        if (pontuacoes[a] === pontuacoes[b]) {
            return gols[b] - gols[a];
        }
        return pontuacoes[b] - pontuacoes[a];
    });
    return times;
}

const createTableRow = (numberOfTeam, cont) => {
    const teams = getTeamDetails()
    const points = getTeamsPontuation()
    const goals = getTeamsGoalScore()

    const tr = document.createElement('tr')
    
    const th = document.createElement('th')
    th.setAttribute("scope", `row`)
    th.textContent = `${cont}`

    const tdName = document.createElement('td')
    tdName.style.color = teams[`t${numberOfTeam}`].color
    tdName.textContent = teams[`t${numberOfTeam}`].name
    
    const tdPts = document.createElement('td')
    tdPts.textContent = points[numberOfTeam-1]

    const tdGoals = document.createElement('td')
    tdGoals.textContent = goals[numberOfTeam-1]

    tr.appendChild(th)
    tr.appendChild(tdName)
    tr.appendChild(tdPts)
    tr.appendChild(tdGoals)

    return tr
}

const createResultElements = () => {
    const content = document.getElementById('content')
    content.innerHTML = ''
    const points = getTeamsPontuation()
    const goals = getTeamsGoalScore()
    const tabela = calcularResultadoCampeonato(points, goals)
    let cont = 1

    const title = document.createElement("h1")
    title.innerText = "Tabela"
    content.appendChild(title)
    
    const divTableResponsive = document.createElement('div')
    divTableResponsive.classList.add("table-responsive")

    const table = document.createElement('table')
    table.classList.add("table","table-bordered")

    const tHead = document.createElement('thead')
    tHead.classList.add("table-dark")
    tHead.innerHTML = '<tr><th scope="col">Posição</th><th scope="col">Time</th><th scope="col">Pts.</th><th scope="col">Saldo de gols</th></tr>'
    
    const tBody = document.createElement('tbody')
    tBody.classList.add("table-group-divider")

    console.log(tabela)
    for (let numberOfTeam in tabela){
        console.log(tabela[numberOfTeam]+1)
        let row = createTableRow(Number(tabela[numberOfTeam])+1, cont)
        cont++
        tBody.appendChild(row)
    }

    table.appendChild(tHead)
    table.appendChild(tBody)
    divTableResponsive.appendChild(table)
    content.append(divTableResponsive)

    // const button = createTournamentButton()
        
    // showContent.appendChild(contentDiv)
    // contentDiv.appendChild(button)
}

const calcResults = () => {
    const hasFullPositivesScores = setTournamentScores()
    if (hasFullPositivesScores) {
        const matchesInfos = getTeamsResults()
        setTeamsPontuations(matchesInfos['pointsArray'])
        setTeamsGoalScore(matchesInfos['goalsArray'])
        createResultElements()
    } 
}

