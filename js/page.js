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


   fetch(`https://api.tvmaze.com/shows/${data.id}/cast`).then(data => data.json())
      .then(data => {
         console.log(data);
         for (let i = 0; i < 30; i++) {
            document.querySelector(".cast").innerHTML += `
         <div class="el">
            <img src = "${data[i].person.image.medium}" >  </img>
            <p> ${data[i].person.name}  </p> 
            <p class="mt-1"> ${2022-data[i].person.birthday.substring(0,4) } Years Old </p>
         </div>
      `
         }
      })

}
