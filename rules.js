/* global toml */
/* global engine */

let domain;
let chosen = new Set()
let choices = []
let audio;

function start(text) {
  // Load toml file
  domain = toml.parse(text);
  let node = domain['storylets']
  
  // Set title
  engine.setTitle(domain.title)
  
  // Set background color
  engine.changeBackgroundColor("white")
  
  // Display introduction page
  engine.appendImage(domain.titleScreen)
  
  // Play intro music
  audio = new Audio(domain.titleMusic)
  audio.loop = true
  audio.volume = 0.5
  audio.play()
  
  
  // Add choices and targets
  for(let i = 0; i < domain.choices.length; i++) {
    choices.push({text: domain.choices[i], target: domain.targets[i]})
  }
  
  // Show choices
  engine.provideChoices(choices)
}

// When the choice is selected
function applyChoice(target) {
  
  let node = domain['storylets']
  
  // mute the music
  if(node[target].pause) {
    audio.pause()
  }
  
  // play the music
  if(node[target].music) {
    audio.pause()
    audio = new Audio(node[target].music)
    audio.volume = node[target].volume
    audio.loop = true
    audio.play()
  }
  
  // change the background
  if(node[target].background) {
    engine.changeBackground(node[target].background)
  }
  
  // add the target to the set
  chosen.add(target)

  // remove choices
  removeChoices(choices)
  
  // append image chunk
  if(node[target].image) {
    engine.appendImage(node[target].image)
  }
  
  
  // append text chunk
  if(typeof(node[target].description) == 'string') {
    engine.appendChunk(node[target].description)
  }
  else {
    for(let i = 0; i < node[target].description.length; i ++) {
      engine.appendChunk(node[target].description[i])
    }
  }
  

  
  for(let i = 0; i < node[target].choices.length; i++) {
    choices.push({text: node[target].choices[i], target: node[target].targets[i]})
  }

  if(node[target].dependency != null) {
    let valid = true
    for(let j = 0; j < node[target].dependency.length; j++) {
      if(chosen.has(node[target].dependency[j])) {
        valid = true
      }
      else {
        valid = false
        break
      }
    }
    if(valid == true) {
      for(let i = 0; i < node[target].dependentChoices.length; i++) {
        choices.push({text: node[target].dependentChoices[i], target: node[target].dependentTargets[i]})
      }
    }
  }
  
  if(node[target].endstate) {
    removeChoices(choices)
    engine.appendImage(node[target].endImage)
  }

 
  
  engine.provideChoices(choices)
  
}

function removeChoices(choices) {
  choices.splice(0, choices.length)
}
