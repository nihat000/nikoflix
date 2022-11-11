let data;
const params = new URLSearchParams(window.location.search)
const paginationNumber = 16
const query = params.get('query');
let myUrl;

if (query) {
   myUrl = `https://api.tvmaze.com/search/shows?q=${query}`
} else {
   myUrl = `https://api.tvmaze.com/shows`
}

document.querySelector('input[type="text"]').value = query;

function search() {
   if (!document.querySelector('input[type="text"]').value) {
      return false;
   }
   window.location.href = `index.html?query=${document.querySelector('input[type="text"]').value}`
}

let page = parseInt(params.get("page"))
let lastPage = Math.ceil(240 / paginationNumber);

if (isNaN(page)) {
   page = 1
} else if (lastPage > paginationNumber) {
   page = lastPage
}

const pageNumberEl = document.querySelector("#page-number");
const btnPrevious = document.getElementById("btn-previous");
const btnNext = document.getElementById("btn-next");


const btnFirst = document.getElementById("btn-first");
const btnLast = document.getElementById("btn-last");

pageNumberEl.innerText = page;
btnPrevious.href = `index.html?page=${page - 1 < 1 ? 1 : page - 1}`
btnNext.href = `index.html?page=${page + 1 > lastPage ? lastPage : page + 1}`
btnLast.href = `index.html?page=${lastPage}`
btnFirst.href = `index.html?page=1`



fetch(myUrl).then((data) => data.json()).then(
   data => load(data)
)


function load(data) {
   console.log(data);
   let list = document.querySelector(".list");
   list.innerHTML = "";

   for (let i = (page - 1) * paginationNumber; i < page * (paginationNumber); i++) {
      let d;
      if (query) {
         d = data[i].show;
      } else {
         d = data[i];
      }
      let el = `<div class="element">
         <div class='img-wrap'>
         <img class='cover' src="${d.image.original}" alt="">
         <img class='effect' src="img/play.svg">
         </div>
         <p class="name" > ${d.name} </p>
               <p class='field-2'>  ${d.genres} </p>
                <div class='field-1'> <span class="year"> ${d.premiered.substring(0, 4)} </span>  
                  <div>
                  <img src='img/star.svg'/> <span> ${d.rating.average} </span>
                  </div> 
               </div>
          <a href='page.html?id=${d.id}'>  View more  → </a> 

      </div> `
      list.innerHTML += el;

   }


}

