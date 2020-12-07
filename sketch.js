let buttons = []
let instructionTimer = 5
let sequenceTimer = 5
let finalTimer = 90
let words = "Ready?"
let sequence = []
let guess = []
let correct = false

let img;
let pixDict = {}

function preload() {
  img = loadImage("clueart.png")

}

function setup() {
  let canvas = createCanvas(800, 600);

  for (i = 1; i < 6; i++) {
    buttons.push(new Clicky(i * 120, 300, i))
  }

  image(img, 0, 0)
  loadPixels()

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {

      pixDict[`${x},${y}`] = get(x, y)
    }
  }
  background(220)
}

function draw() {
  if (!correct) {
    background(220);

    //display and change text
    if (sequenceTimer > 0) {
      fill(0)
      textSize(36)
      text(`${words} ${instructionTimer}`, 100, 200)
    } else {
      fill(0)
      textSize(36)
      text(words, 100, 200)
    }

    //draw buttons - static until the sequence ends
    buttons.forEach(button => {
      if (sequenceTimer > 0) {
        button.display()
      } else {
        button.hoverReact()
      }
    })

    //countdown in two parts
    if (frameCount % 60 == 0 && instructionTimer > 0) {
      instructionTimer--
    } else if (instructionTimer == 0) {
      words = "Remember the sequence."
      if (instructionTimer == 0 && frameCount % 60 == 0 && sequenceTimer > 0) {
        console.log("Play")

        let choose = int(random(buttons.length))
        buttons[choose].colorChange()
        sequence.push(buttons[choose].identity)
        sequenceTimer--
      } else if (sequenceTimer == 0) {
        console.log(sequence, guess)
        words = "Click in the correct sequence"
      }
    }

    //check sequence order with guess order
    let correctCount = 0
    if (guess.length == 5) {
      console.log("Clicked 5")
      for (i = 0; i < guess.length; i++) {
        if (guess[i] == sequence[i]) {
          correctCount++
          console.log(correctCount)
        }
      }
      if (correctCount == 5 && correct == false) {
        alert("YOU WON! Move the mouse to color in the screen and reveal your clue.")
        correct = true
      } else if (correctCount != 5 && correct == false) {
        alert("Too bad - try again.")
        window.location.reload()
      }
    } else {
      console.log("No guess")
    }
  } else {
    if (frameCount % 60 == 0 && finalTimer > 0) {
      finalTimer--
    }
    if (finalTimer > 0 && mouseX < width && mouseX>0 && mouseY < height && mouseY > 0) {
      noStroke()
      let circSize = int(random(1, 10))

      fill(pixDict[`${int(mouseX)},${int(mouseY)}`])
      ellipse(mouseX, mouseY, circSize)
    } else {
      image(img, 0, 0)
    }
  }


  console.log(sequence, guess)

}

function mousePressed() {
  buttons.forEach(button => {
    if (collidePointCircle(mouseX, mouseY, button.x, button.y, 100)) {
      guess.push(button.identity)
    }
  })

}

function randomFill() {
  noStroke()

  let x = int(random(0, width))
  let y = int(random(0, height))
  let circSize = int(random(10, 20))

  fill(pixDict[`${x},${y}`])
  rect(x, y, circSize, circSize)
}
