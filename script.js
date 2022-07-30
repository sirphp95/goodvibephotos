const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

//api
const initialCount = 5;
const apiKey = "EtkdYo3bxegMfRwBjRMmW-X0GrG7C1ZhkZfFGxmM6J8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}
`;

// NEW Block****
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }
// checa se a img foi carregada
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }
// ajuda a funcao a setar atributos no dom
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// cria elementos e adiciona ao dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // ativa a funcao pra cada objeto no photosarray
  photosArray.forEach((photo) => {
    //  criar uma ancora para o link da api
    const item = document.createElement("a");

    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // cria img para foto
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // evento listen percebe se finalizou o carrgamento
    img.addEventListener("load", imageLoaded);
    // imagem dentro da ancora e os 2 dentro do imagecontainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// pega fotos da api
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
      if (isInitialLoad) { // NEW LINE ****
        updateAPIURLWithNewCount(30) // NEW LINE ****
        isInitialLoad = false // NEW LINE ****
      } // NEW LINE ****
    } catch (error) {
      // Catch Error Here
    }
  }

// checa se o scroll esta perto do final da pagina
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// ligado
getPhotos();
