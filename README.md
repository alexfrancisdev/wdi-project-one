# Snake
<p align="center">
  <img width="800" height="550" alt="Intro Screen" src="https://imgur.com/VpVIMOP.png">
</p>

[Play Snake on GitHub Pages](https://alexfrancisdev.github.io/wdi-project-one/)

[View Snake on GitHub](https://github.com/alexfrancisdev/wdi-project-one


## Game instructions

This is my take on the classic computer game 'SNAKE'. The main objective of the game is to collect as many of the glowing 'apples' and special tiles as you can without crossing your own tail or crashing into the boundary of the grid. The more your snake eats the longer and faster it becomes, making the game increasingly difficult.

I added the option to play the game with two players. In this mode one player controls their snake using the arrow keys, while the other makes use of the WASD keys. Users can still collect apples to grow their snake but the speed is constant. The winner is the player who manages to avoid crashing into themselves, the other user, or the walls the longest.


## Project brief

This was my first project at General Assembly and was my first opportunity to put to practice my new JavaScript skills on a project of my choosing.

Our brief required that we:
* Produce a 'grid-based' game
* Allow for two players
* Must be winning and losing players
* Built using HTML, CSS, and JavaScript
* Deployed to GitHub Pages
* **Timeframe: 1 week**


## Technologies used

  * HTML & HTML Audio
  * CSS
  * Vanilla JavaScript
  * jQuery
  * Google Fonts
  * Adobe Photoshop
  * GitHub
  * Git


## Approach taken

### Grid Layout

My first difficulty was working out out to create the grid that would be used to display my game. I decided that the simplest way to create this grid would be by using divs. I manually created a 5x5 grid as a proof-of-concept to check it would work, and it did. However for my game I wished to have a 20x20 grid, meaning that 400 divs would be required, an automated way of rendering the grid was needed.

To overcome this I created a function that would loop over the defined height of the grid to create 'rows', and then loop over the defined width of the grid to push 'pixels'(divs) into the rows.

### Functionality

#### Displaying the snake and apples
