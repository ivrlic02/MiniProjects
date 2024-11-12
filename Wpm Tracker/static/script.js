$(document).ready(function() {
    const typingText = $(".typing_text").text().split(" ")
    let currentWordIndex = 0
    let currentLetterIndex = 0
    let correctWords = []
    
    let countdownTime = 60
    let countdownInterval = null
    let countdownStarted = false

    $(document).on("keydown", async function(event) {
        const currentWord = typingText[currentWordIndex]
        
        // start countdown with first key pressed
        if(!countdownStarted) {
            countdown()
            countdownStarted = true
        }

        // check for valid input
        if(event.key.length === 1 && event.key !== " ") {
            const expectedLetter = currentWord[currentLetterIndex]

            // correct letter
            if(event.key === expectedLetter) {
                currentLetterIndex++
                renderText(true)

                // fully written word 
                if (currentLetterIndex === currentWord.length) {
                    correctWords.push(currentWord)
                    nextWord()
                }
            } else {
                renderText(false) // incorrect letter
            }
        } else if (event.key === " " && counter > 0) {
            nextWord() // if space is pressed while in word skip to next one, ignore if not
        }

        // backend wpm calculation
        const elapsedTime = (60 - countdownTime)
        try {
            const response = await fetch("/calculate_wpm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_words: correctWords, elapsed_time: elapsedTime })
            })
    
            const data = await response.json();
            $("#wpm_counter").text("WPM: " + data.wpm)
        } catch (error) {
            console.error("Error calculating WPM:", error)
        }
    })

    // countdown function updates every sec
    function countdown() {
        countdownInterval = setInterval(function() {
            // stop countdown when time tuns out or all words are written
            if (countdownTime > 0 && currentWordIndex < typingText.length - 1) {
                countdownTime--
                $("#time").text(countdownTime + "s")
            } else {
                clearInterval(countdownInterval)
                $(document).off("keydown") // disable typing
            }
        }, 1000)
    }

    function nextWord() {
        currentWordIndex++
        currentLetterIndex = 0

        renderText(true)
    }

    // render text with highlights
    function renderText(isCorrect) {
        let displayText = ""
        
        typingText.forEach((word, wordIndex) => {
            if (wordIndex < currentWordIndex) {
                if(correctWords.includes(word)) {
                    displayText += `<span class="typing_text" style="color: white;">${word} </span>`
                } else {
                    displayText += `<span class="typing_text" style="color: red;">${word} </span>`
                } 
            } else if (wordIndex === currentWordIndex) {
                word.split("").forEach((char, charIndex) => {
                    if (charIndex < currentLetterIndex) {
                        displayText += `<span class="typing_text" style="color: white;">${char}</span>`
                    } else if (charIndex === currentLetterIndex && !isCorrect) {
                        displayText += `<span class="typing_text" style="color: red;">${char}</span>`
                    } else {
                        displayText += `<span class="typing_text">${char}</span>`
                    }
                })
                displayText += " "
            } else {
                displayText += `${word} `
            }
        })

        $(".typing_text").html(displayText.trim())
    }

})