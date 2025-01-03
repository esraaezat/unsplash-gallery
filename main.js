const accessKey = "aK2MTMIZAzXB7bNLTdM0Ndo6PUertd2gxE5i27F03qQ"; 

async function fetchImages() {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${"aK2MTMIZAzXB7bNLTdM0Ndo6PUertd2gxE5i27F03qQ"}&per_page=50`);
    const images = await response.json();

   
    displayCarousel(images.slice(0, 3)); 
    displayGallery(images.slice(3)); 
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function displayCarousel(images) {
  const carousel = document.querySelector('.carousel');
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.urls.small;
    carousel.appendChild(img);
  });
}

function displayGallery(images) {
  const gallery = document.querySelector('.gallery');
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description;
    img.loading = "lazy";
    img.addEventListener('click', () => openImage(image));
    gallery.appendChild(img);
  });
}

function openImage(image) {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <img src="${image.urls.full}" style="width: 30%px; height:50%;">
    <button onclick="downloadImage('${image.links.download}')">Download</button>
    <script>
      function downloadImage(url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        a.click();
      }
    </script>
  `);
}


fetchImages();
