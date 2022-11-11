# Overview

### Title

Look Into the Mirror

### By

Ryan Cai

### Description

This mini story is one of the chapters in a visual novel called _Project: Mirror_ that I am currently working on. The main protagonist in this demo is Kagami, meaning "mirror" in Japanese. She is an android that wanders
in Tokyo hoping to find her identity in the real world. This chapter works as a "hidden chapter" in the visual novel and let the players know more about how Kagami perceives the real world.

# Experience Goals

The main goal I want to achieve here is to use text, music, and art to portraits the main protagonist's perception to the world.

- Text: I use a first person point of view as the narration, so that I can dive into Kagami's mind a little bit to show how she feels about a certain thing. For example, she hates the texture of breads.
- Music: I use music to both shape how Kagami sees the world and what the atmosphere is in certain scenes.
- Art: I use artworks to show a little bit of how the world and the surroundings look like in the story.

More broadly, this short story should also work as a "sneak peak" or a "demo" for the actual visual novel, in hope to grasp some audience's interest.

# Reference Art

The general story setting has taken inspirations from sci-fi pieces like [Cyberpunk 2077](https://www.cyberpunk.net/), [Deathloop](https://bethesda.net/en/game/deathloop), and [Do Androids Dream of Electric Sheep?](https://en.wikipedia.org/wiki/Do_Androids_Dream_of_Electric_Sheep%3F).
For character design, I have taken heavily inspirations from [Hatsune Miku](https://www.crypton.co.jp/miku_eng), as the main protagonist Kagami is an android who likes to sing. For the music direction, I use [Music Generator GA](https://music-generator-ga.readthedocs.io/en/latest/),
an ongoing final project for CM146(Game AI) class that I am a part of. Lastly, the art direction for designing the background(like fragments) and the "dream" scene is inspired from a mobile game [Project: Sekai](https://projectsekai.fandom.com/wiki/Project_SEKAI_COLORFUL_STAGE!) and
its art for the character cards, trying to resemble a "broken mirror" vibe that portraits a broken world, and a broken self(since Kagami is "mirror").

# Authoring Process

I authored all the text elements in the game, as well as the music elements. The narration is built upon [P5](https://projectmirror-demo.glitch.me/), adding on more narrations on one branch to make it richer. I use [Music Generator GA](https://music-generator-ga.readthedocs.io/en/latest/)
to generate all music into a MIDI file, then use [FLStudio](https://www.flstudio.com.au/) to edit and mix the track. I also collaborate with an artist, who provides all the art that is tailored specifically for this demo. All background art and images are created and provided from that artist.
She is also part of the team on the original visual novel project, so I think her arts can really enhance the experience of this demo.

# Technical Foundation

I based off the code from [P5-storylets-base](https://glitch.com/~storylets-base), and built upon from [P5](https://glitch.com/edit/#!/projectmirror-demo). I have also taken consideration of [P3](https://glitch.com/edit/#!/projectdark) for adding images. The reason I choose P5 as a starter is because
I like the idea of appending story chunks instead of shifting from one scene to another. In this way, the story seems to be more connected, and easier to recall what happened earlier. And also in P5, the text animation has already been implemented, so it is easier for me to adjust the style, rather
than having to create it from the beginning.

# Artistic Presentation

I made several changes in engine.js to account for the different artistic approach:

- add image as a chunk to the story
- add music
- change background image
  I also modifed style.css:
- changed the body margin
- added opacity for the text chunk
- let all chunks presented in the middle of the page
- changed the background color of the chunk

# Authoring Language

I use [TOML](https://toml.io/en/) as the authoring language for this project. In addition to the fields that are present in P5, I added a few extra fields to account for images and music:

- `music`: stores the url of the music in string.
- `volume`: stores the `volume` attribute for `Audio` in number.
- `background`: stores the url of the background image in string.
- `image`: stores the url of the image to append in string.
- `choices`: stores all possible choices to pass into `provideChoices()` in an array of strings.
- `targets`: stores all possible targets to pass into `provideChoices()` in an array of strings.
- `dependentChoices`: stores the choices that is dependent on selected choices.
- `dependentTargets`: stores the targets that is dependent on selected choices.
- `dependency`: stores the choices/targets that is dependent for the `dependentChoices` and `dependentTargets`.
- `endstate`: an indicator of the end of the story.

# Technical Interpretation

I added a few functions in engine.js to account for the added fields in the authoring language file:

- `appendImage(string)`: add image to the html file with a hardcoded `length` and `width`, this is to keep the image size consistent with the text chunks.
- `changeBackground(string)`: take in a url of image, set the `background-image` field in html to the given url. This also indicates the `size` of the background image to keep it consistent.
- `changeBackgroundColor(string)`: take in a string that indicates color(like "white") or a rgb value(like #feeeee), update the `background-color` field in html.
- `resetChoices()`: set the `choicesContainer` field in html to an empty string.
  Also some changes to rule.js:
- `function start(text)`: display title image using `appendImage`, add music using [Audio()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio).
- `function applyChoices(target)`: calls `appendImage` to display image if condition is passed, calls `changeBackground` to change the background image if condition is passed, change music by calling `audio.pause()` and setting new audio field with [Audio()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio),
  account for endstate using condition and call `resetChoices` to get rid of all choices.
- `function removeChoices()`: remove all items in the choices array, using `array.splice()`.
  I also abandon the ideas of [storylets](https://emshort.blog/2019/11/29/storylets-you-want-them/) and implemented a more structured linear branching narration. As such, all choices and targets are specified in the toml file. I do this to gain more control to the story flow because I find it easier
  this way to tell the story.

# Collaboration

- Art: all artworks, including the images and the background images are all created and provided by huahua.
- Music: all music is generated from [Music Generator GA](https://music-generator-ga.readthedocs.io/en/latest/), a Music AI that I am currently working on for CM146(Game AI). The tool is built and created by Ryan Cai, Matthew Fritsch, Edwin Wang, and Adam Carter.

# Note

- Sometimes the music glitched at the beginning in the title screen.
- [Music Generator GA](https://music-generator-ga.readthedocs.io/en/latest/) is an affordable tool for any game developers to generate music. Be sure to check the website. (the website should have a final update on December 6, 2021 and have published the final version for downloads)
- There is no option to include music or not, and it is intentional. If you dislike the music, simply mute the browser.

# Concept Art

![](https://cdn.glitch.me/e26a2582-f1ba-43ed-af7d-d616d9579e7e%2FKagami2.jpg?v=1638418125908)
![](https://cdn.glitch.me/7200b7bc-64ac-41b1-af90-81f45e8612f9%2FKagami1.jpg?v=1638766938762)
