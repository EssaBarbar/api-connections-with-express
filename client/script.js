window.addEventListener('load', start)

async function start() {
    const result = await fetch('/api/facts')
    const data = await result.json()

}



async function showRandomFact() {
    event.preventDefault()
    const animalName = document.getElementById("animalName").value

    try {
        const result = await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=' + animalName)
        const fact = await result.json()

        console.log(fact.text)
        document.getElementById("theFact").innerText = fact.text
    }
    catch (err) {
        document.getElementById("theFact").innerText = "The name of the animal you wrote couldn't be recognized, pls try another animal name"
        console.log(err.message)
    }
}

async function saveToFavorites() {
    const theFact = document.getElementById("theFact").innerText

    const result = await fetch('/api/facts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: theFact
        })
    })
    const data = await result.json()
    console.log(data)
}

async function showFavorites() {
    const result = await fetch('/api/facts')
    const facts = await result.json()

    let myList = document.getElementById("myFavoritesList")
    myList.innerText = ""
    facts.forEach(fact => {
        let theText = document.createElement("li")
        theText.innerText = fact.text
        myList.appendChild(theText)
    });
}
