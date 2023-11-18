const setTeamNames = () => {
  const t1Name = document.getElementById("team1_name").value
  const t2Name = document.getElementById("team2_name").value
  const t3Name = document.getElementById("team3_name").value
  const t4Name = document.getElementById("team4_name").value

  if (t1Name === "" || t2Name === "" || t3Name === "" || t4Name === "") {
    Swal.fire("Por favor, preencha todos os campos de nome do time.")
    return false
  }
  window.localStorage.setItem('t1Name', t1Name)
  window.localStorage.setItem('t2Name', t2Name)
  window.localStorage.setItem('t3Name', t3Name)
  window.localStorage.setItem('t4Name', t4Name)

  return true
}

const setTeamColors = () => {
  const t1Color = document.getElementById("team1_color").value
  const t2Color = document.getElementById("team2_color").value
  const t3Color = document.getElementById("team3_color").value
  const t4Color = document.getElementById("team4_color").value

  window.localStorage.setItem('t1Color', t1Color)
  window.localStorage.setItem('t2Color', t2Color)
  window.localStorage.setItem('t3Color', t3Color)
  window.localStorage.setItem('t4Color', t4Color)
}

const setScores = (teams, etapa, penaltis = false) => {
  if(penaltis == true){
    let scores = []
    for (let team in teams) {
      const teamName = teams[team].name
      const element = document.getElementById(`${teamName}Score`)
      if(element != null){
        scores.push(element.value)
      }
    }
    if (scores[0] === scores[1]) {
      Swal.fire("Não há empates em disputa por penaltis")
      return false
    }
  }
  Object.keys(teams).forEach((team, i) =>{
    const teamName = teams[team].name
    const element = document.getElementById(`${teamName}Score`)
    if(element != null){
      const teamScore = element.value == '' ? 0 : element.value;
      if(etapa === 'Semifinal') {
        window.localStorage.setItem(`t${i+1}${etapa}Score`, teamScore)
      } else {
        window.localStorage.setItem(`${team}${etapa}Score`, teamScore)
      }
    }
  })
}

const setSemifinalResults = (semifinalResults) => {
  let indexTeams = 1
  Object.keys(semifinalResults).forEach((match, indexMatch) =>{
    const scoreT1 = semifinalResults[match][`t${indexTeams}`]
    const scoreT2 = semifinalResults[match][`t${indexTeams+1}`]

    result = scoreT1 > scoreT2 
      ? `t${indexTeams}` 
      : scoreT1 < scoreT2
      ? `t${indexTeams+1}`
      : 'empate'

    window.localStorage.setItem(`SemifinalMatch${indexMatch+1}`, result)
    indexTeams += 2
  })
}

const setFinalResults = (finalResults, finalists) => {
  let indexTeams = 1
  Object.keys(finalResults).forEach((match, indexMatch) =>{
    const scoreT1 = finalResults[match][`${finalists[0]}`]
    const scoreT2 = finalResults[match][`${finalists[1]}`]

    result = scoreT1 > scoreT2 
      ? `${finalists[0]}`
      : scoreT1 < scoreT2
      ? `${finalists[1]}`
      : 'empate'

    window.localStorage.setItem(`FinalMatch${indexMatch+1}`, result)
    indexTeams += 2
  })
}

const getTeamDetails = () => ({
  t1: {
    name: window.localStorage.getItem("t1Name"),
    color: window.localStorage.getItem("t1Color"),
  },
  t2: {
    name: window.localStorage.getItem("t2Name"),
    color: window.localStorage.getItem("t2Color"),
  },
  t3: {
    name: window.localStorage.getItem("t3Name"),
    color: window.localStorage.getItem("t3Color"),
  },
  t4: {
    name: window.localStorage.getItem("t4Name"),
    color: window.localStorage.getItem("t4Color"),
  },
})

const getSemifinalScores = () => ({
  match1: {
    t1: window.localStorage.getItem("t1SemifinalScore"),
    t2: window.localStorage.getItem("t2SemifinalScore"),
  },
  match2: {
    t3: window.localStorage.getItem("t3SemifinalScore"),
    t4: window.localStorage.getItem("t4SemifinalScore"),
  },
})

const getSemifinalResults = () => ({
  match1: window.localStorage.getItem("SemifinalMatch1"),
  match2: window.localStorage.getItem("SemifinalMatch2"),
})

const getFinalScores = (finalists) => {
  const match1 = {};

  for (const finalist of finalists) {
    match1[finalist] = window.localStorage.getItem(`${finalist}FinalScore`);
  }

  return { match1 };
}

const getFinalResults = () => ({
  match1: window.localStorage.getItem("FinalMatch1"),
})

function createTeamDiv(team) {
  const teamDiv = document.createElement("div")
  teamDiv.classList.add("mb-3")
  teamDiv.classList.add("row")
  teamDiv.classList.add('justify-content-center')
  
  const idDiv = `${team.name}Score`

  const ScoreLabel = document.createElement("label")
  ScoreLabel.setAttribute("for",idDiv)
  ScoreLabel.classList.add("form-label")
  ScoreLabel.textContent = team.name
  ScoreLabel.style.color = team.color

  const scoreInput = document.createElement("input")
  scoreInput.setAttribute("type", "number")
  scoreInput.classList.add("form-control")
  scoreInput.setAttribute("placeholder", 0)
  scoreInput.setAttribute("id", idDiv)
  scoreInput.setAttribute("min", 0)
  
  teamDiv.appendChild(ScoreLabel)
  teamDiv.appendChild(scoreInput)

  return teamDiv
}

const createMatchCard = (team1, team2) => {
  const card = document.createElement("div")
  card.classList.add("card")
  card.classList.add("text-center")
  card.classList.add("col-sm")

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")

  const matchTitle = `${team1.name} &nbsp;&nbsp;<i class="bi bi-arrows-angle-contract"></i>&nbsp;&nbsp;  ${team2.name}`
  const title = document.createElement("div")
  title.classList.add("card-title")
  title.innerHTML = matchTitle

  const team1Div = createTeamDiv(team1)
  const team2Div = createTeamDiv(team2)

  cardBody.appendChild(title)
  cardBody.appendChild(team1Div)
  cardBody.appendChild(team2Div)

  card.appendChild(cardBody)

  return card
}

const createCheckResultsButton = (teams, etapa, penalti = false) => {
  let onclick
  if(etapa === 'Semifinal') {
    onclick = () => { checkSemifinalsResults(teams, penalti) }
  } else if (etapa === 'Final'){
    onclick = () => { checkFinalsResults(teams, penalti) }
  }
  const divButton = document.createElement("div")
  divButton.classList.add('row')
  divButton.classList.add('mt-3')
  divButton.classList.add('d-grid')

  const button = document.createElement("button")
  button.classList.add("btn")
  button.classList.add("btn-primary")
  button.onclick = onclick
  button.innerText= 'Checar resultados'

  divButton.appendChild(button)

  return divButton
}

const createSemiFinalsElement = (teams) => {
  document.getElementById('registration').remove()
  const showContent = document.getElementById('show-content')
  
  const semiFinalsFormsDiv = document.createElement('div')
  semiFinalsFormsDiv.classList.add("row")
  semiFinalsFormsDiv.classList.add("center")
  semiFinalsFormsDiv.classList.add("text-center")
  semiFinalsFormsDiv.classList.add("justify-content-around")
  
  const title = document.createElement("h1")
  title.innerText = "Semifinais"
  
  const match1Card = createMatchCard(teams.t1, teams.t2)
  const match2Card = createMatchCard(teams.t3, teams.t4)
  const button = createCheckResultsButton(teams, 'Semifinal')
  
  semiFinalsFormsDiv.appendChild(title)
  semiFinalsFormsDiv.appendChild(match1Card)
  semiFinalsFormsDiv.appendChild(match2Card)
  showContent.appendChild(semiFinalsFormsDiv)
  showContent.appendChild(button)
}

const startTournament = () => {
  const hasSavedTeamNames = setTeamNames()
  if (hasSavedTeamNames) {
    setTeamColors()
  
    const teams = getTeamDetails()
    createSemiFinalsElement(teams)
  } 
}

const checkSemifinalsResults = (teams, penalti) => {
  let empate = false

  setScores(teams, 'Semifinal', penalti)
  const SemifinalScores = getSemifinalScores()
  setSemifinalResults(SemifinalScores, 'Semifinal')
  const SemifinalResults = getSemifinalResults()

  Object.keys(SemifinalResults).forEach((match) => {
    if(SemifinalResults[match] == 'empate') {
      empate = true
    }
  })

  if(empate){
    createPenaltiesElement(teams, 'Semifinais')
  } else {
    startFinal()
  }
}

const createPenaltiesElement = (teams, etapa, finalists = null) => {
  let button
  const showContent = document.getElementById('show-content')
  showContent.innerHTML = ''

  const penaltisFormsDiv = document.createElement('div')
  penaltisFormsDiv.classList.add("row")
  penaltisFormsDiv.classList.add("center")
  penaltisFormsDiv.classList.add("text-center")
  penaltisFormsDiv.classList.add("justify-content-around")
  
  const title = document.createElement("h1")
  title.innerText = `${etapa} Penaltis`
  penaltisFormsDiv.appendChild(title)

  if(finalists && etapa === 'Final'){
    const team1 = teams[finalists[0]]
    const team2 = teams[finalists[1]]
    penaltisFormsDiv.appendChild(createMatchCard(team1, team2))
    button = createCheckResultsButton(teams, 'Final', true)
  } else {
    const SemifinalResults = getSemifinalResults()
    Object.keys(SemifinalResults).forEach((match) => {
      if(SemifinalResults[match] == 'empate') {
        if(match === "match1"){
          penaltisFormsDiv.appendChild(createMatchCard(teams.t1, teams.t2))
        }
        if(match === "match2"){
          penaltisFormsDiv.appendChild(createMatchCard(teams.t3, teams.t4))
        }
      }
    })
    
    button = createCheckResultsButton(teams, 'Semifinal', true)
  }

  showContent.appendChild(penaltisFormsDiv)
  showContent.appendChild(button)
}

function startFinal(penalti = false) {
  const SemifinalResults = getSemifinalResults()
  const teams = getTeamDetails()

  const showContent = document.getElementById('show-content')
  showContent.innerHTML = ''

  const finalFormsDiv = document.createElement('div')
  finalFormsDiv.classList.add("row")
  finalFormsDiv.classList.add("center")
  finalFormsDiv.classList.add("text-center")
  finalFormsDiv.classList.add("justify-content-around")
  
  const title = document.createElement("h1")
  if(penalti == false){
    title.innerText = "Grande Final"
  } else {
    title.innerText = "Final Penaltis"
  }
  
  finalFormsDiv.appendChild(title)

  finalFormsDiv.appendChild(createMatchCard(teams[SemifinalResults['match1']], teams[SemifinalResults['match2']]))

  const button = createCheckResultsButton(teams, 'Final', penalti)
  
  showContent.appendChild(finalFormsDiv)
  showContent.appendChild(button)
}

const checkFinalsResults = (teams, penalti = false) => {
  let empate = false
  const SemifinalResults = getSemifinalResults()
  const finalists = Object.values(SemifinalResults)

  setScores(teams, 'Final', penalti)
  const FinalScores = getFinalScores(finalists)
  setFinalResults(FinalScores, finalists)
  const finalResults = getFinalResults()

  Object.keys(finalResults).forEach((match) => {
    if(finalResults[match] == 'empate') {
      empate = true
    }
  })

  if(empate){
    startFinal(true)
  } else {
    mostraCampeao(finalResults['match1'], teams)
  }
}

const mostraCampeao = (champion, teams) => {
  const championColor = teams[champion].color
  const championName = teams[champion].name
  Swal.fire({title: "Resultado", text : `${championName} foi o grande campeão!`, icon: 'success', background : championColor})
}
