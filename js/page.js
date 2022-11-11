const url = new URLSearchParams(window.location.search);
const id = parseInt(url.get("id"))
let data;



if (isNaN(id)) id = 1;

fetch(`https://api.tvmaze.com/shows/${id}`).then((data) => data.json()).then(
   (d) => { data = d; load() }
)

function load() {
   const x = data;
   document.querySelector('.s img').src = x.image.medium
   document.querySelector('.s #name').innerText = x.name
   document.querySelector('.s #summary ').innerHTML = x.summary
   document.querySelector('.s #premiered').innerHTML = "Premiered : " + x.premiered
   document.querySelector('.s #ended').innerHTML = "Ended : " + x.ended
   document.querySelector('.s #genre').innerHTML = "Genre : " + x.genres;
   document.querySelector('.s #country').innerHTML = "Country: " + x.network.country.name
   document.querySelector('#bg').src = data.image.original
}
