// EDIT ME: name, movies, letter pages, snacks. Files go in /public (see README).
export const CFG = {
 name:"Tshimollo",seat:"C-14",
 music:"/music/across-the-stars.mp3",
 clip:60, // seconds of film before it ends
 movies:[
  {title:"Star Wars",poster:"/posters/star-wars.png",video:"/movies/star-wars.mp4",praise:"star wars. ok, you have taste."},
  {title:"Project Hail Mary",poster:"/posters/project-hail-mary.png",video:"/movies/project-hail-mary.mp4",praise:"project hail mary. a science-y pick, love it."},
  {title:"Fantastic Mr. Fox",poster:"/posters/fantastic-mr-fox.png",video:"/movies/fantastic-mr-fox.mp4",praise:"fantastic mr. fox. wes anderson? that's elite."}],
 booth:[
  {q:"popcorn toppings",multi:1,o:[["butter","#ffd23f"],["caramel","#b5651d"],["cheese","#ff9a1f"],["salt","#fffdf5"]]},
  {q:"drink",o:[["cola","#3b1d0e"],["sprite","#c9f0a0"],["fanta","#ff8a1f"],["iced tea","#c27a2c"],["water","#bfe6ff"]]},
  {q:"chocolate",o:[["kitkat","#d9202c"],["snickers","#2a4a9c"],["twix","#e0a020"],["none",""]]}],
 clerk:"hi {name}. i work here now. build your order.",
 usher:["{pop} popcorn, {drink}, {choc}. solid, {name}.","your seat's reserved. don't ask how.","pick a movie. no judgment."],
 letter:["ok so. here comes the plot twist.","hopefully you enjoyed the movie.","i know you have good taste, so i trust you.","but the whole reason for this was to actually tell you something.","i esteem you.","i know we haven't spoken much,","but i can see your character is godly and whimsy.","and i would really like to get to know you more.","i was taught that if you find a godly woman whom you esteem,","you take her out.","so i would love to take you out for a film.","for real this time.","i have an idea for one, but you'll let me know."],
 question:"so. a real film?",no:"let me think",done:"in the meantime, enjoy the views, twimsy :)"
}
