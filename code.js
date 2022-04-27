const imagenes = document.querySelector(".conteiner_img");
const pages = document.querySelector(".page");
const pages_bt = document.querySelector(".page_btn");
const inputSearch = document.querySelector("input");
const searchINP = document.querySelector(".result__All");

function creating(character) {
  const imagenEL = document.createElement("img");

  imagenEL.classList.add("imagen");
  imagenEL.src = character.image;

  return imagenEL;
}

function createDiv(letter) {
  const divEl = document.createElement("div");
  const h1El = document.createElement("h1");
  const h2El = document.createElement("h1");
  const h3El = document.createElement("h1");
  const h4El = document.createElement("h1");

  divEl.classList.add("hide", "overlay");

  h1El.textContent = "Name: " + letter.name;
  h2El.textContent = "Status: " + letter.status;
  h3El.textContent = "Specie: " + letter.species;
  h4El.textContent = "Planet: " + letter.origin.name;

  divEl.appendChild(h1El);
  divEl.appendChild(h3El);
  divEl.appendChild(h2El);
  divEl.appendChild(h4El);

  return divEl;
}

async function init() {
  const resp = await fetch(`https://rickandmortyapi.com/api/character?page=2`);
  const { results } = await resp.json();
  results.forEach((character) => {
    const divFirst = document.createElement("div");
    divFirst.classList.add("mainFirst");
    const image = creating(character);

    divFirst.appendChild(image);
    const divELe = createDiv(character);

    divFirst.appendChild(divELe);

    imagenes.appendChild(divFirst);

    image.addEventListener("mouseenter", function (e) {
      divELe.style.display = "flex";
      divELe.style.flexDirection = "column";
      divELe.style.flexWrap = "wrap";
    });

    image.addEventListener("mouseleave", function (e) {
      divELe.style.display = " none";

      inputSearch.addEventListener("keypress", function (e) {
        const spacing = e.target.value;
      });
    });
  });
}

function deleteChild() {
  const deleteChildren = document.querySelectorAll(".result_Search");
  deleteChildren.forEach((o) => {
    searchINP.removeChild(o);
  });
}

const mistake = document.createElement("div");

inputSearch.addEventListener("input", async function (e) {
  try {
    const totto = e.target.value.toLowerCase();
    const resp = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${totto}`
    );
    const { results } = await resp.json();

    deleteChild();

    mistake.style.display = "none";
    results.forEach((search) => {
      const divSearch = document.createElement("div");
      const divInfoSearch = document.createElement("div");
      const imgSearch = document.createElement("img");
      const h1Search = document.createElement("h1");
      const h2Search = document.createElement("h1");
      divSearch.classList.add("result_Search");
      divInfoSearch.classList.add("result_Search_Info");
      divSearch.appendChild(imgSearch);

      divInfoSearch.appendChild(h1Search);
      divInfoSearch.appendChild(h2Search);
      divSearch.appendChild(divInfoSearch);
      imgSearch.src = search.image;
      h1Search.textContent = "Name: " + search.name;
      h2Search.textContent = "Planet: " + search.origin.name;
      searchINP.appendChild(divSearch);
      console.log(totto);
      searchINP.style.display = "block";
    });
    if (totto === "") {
      searchINP.style.display = "none";
    }
  } catch (erro) {
    searchINP.appendChild(mistake);
    mistake.textContent = "Not found";
    mistake.style.display = "block";
  }
});

init();
