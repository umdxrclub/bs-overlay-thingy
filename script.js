const UPDATE_DELAY_MS = Math.floor(1000 / 2)
const [QUEST_IP, NAME] = window.location.hash.substring(1).split("-")
console.log(QUEST_IP, NAME)

const $ = q => document.querySelector(q)

$("#name").textContent = NAME

let oldData = {location: 0}

const updateUI = data => {
    if (oldData.location === 1 && data.location === 0) {
        console.log(oldData)
    }
    
    $("#rank").textContent = data.rank
    $("#rank").className = "r-" + data.rank

    $("#bar").style.width = `${data.energy * 100}%`
    $(".energy").style.display = data.energy !== 0 ? "block" : "none"
    $("#fail-indicator").style.display = data.energy === 0 ? "block" : "none"

    $("#combo").textContent = "COMBO " + data.combo

    $("#combo").className = data.badCuts === 0 && data.missedNotes === 0 ? "fc" : ""

    $("#percentage").textContent = `${(data.accuracy * 100).toFixed(2)}%`

    $("#score").textContent = data.score.toString().replace(/(.)(?=(\d{3})+$)/g, "$1 ")

    oldData = data
}

setInterval(async () => {
    const resp = await fetch(`http://${QUEST_IP}:53502/data`)
    const data = await resp.json()

    updateUI(data)
}, UPDATE_DELAY_MS)