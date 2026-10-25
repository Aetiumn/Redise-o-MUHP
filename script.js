// ==========================================
// INICIALIZACIÓN AUTOMÁTICA AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de la galería de Batalla de Placilla (si existe en la página actual)
  const batallaMainImg = document.querySelector('.gallery-main-img');
  const batallaThumbs = document.querySelectorAll('.gallery-container .thumb-item');
  
  if (batallaMainImg && batallaThumbs.length > 0) {
    const images = Array.from(batallaThumbs).map(thumb => thumb.src);
    
    // Le asignamos un ID temporal si no lo tiene para que tus funciones lo lean sin problemas
    batallaMainImg.id = batallaMainImg.id || 'imgMain';
    const thumbContainer = batallaThumbs[0].closest('.gallery-thumbs');
    if (thumbContainer) {
      thumbContainer.id = thumbContainer.id || 'thumbContainer';
    }

    // Llamamos a tu función initGallery
    initGallery(images, batallaMainImg.id, thumbContainer.id);

    // Conectamos los botones de flecha (prev / next) dinámicamente
    const prevBtn = document.querySelector('.gallery-nav-btn.prev');
    const nextBtn = document.querySelector('.gallery-nav-btn.next');

    if (prevBtn) prevBtn.addEventListener('click', () => changeGalleryImage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeGalleryImage(1));

    // Conectamos las miniaturas para que usen setGalleryImage
    batallaThumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => setGalleryImage(idx));
    });
  }

  // Conexión para los botones de video de YouTube
  const videoButtons = document.querySelectorAll('.video-card-btn');
  videoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const videoId = btn.getAttribute('data-video-id');
      if (videoId) {
        setYoutubeVideo(videoId, 'youtubePlayer', btn);
      }
    });
  });
});

// --- LÓGICA DE GALERÍAS DE IMÁGENES LOCALES ---
let currentImageIndex = 0;
let currentImageList = [];
let currentMainImgId = '';
let currentThumbContainerId = '';

/**
 * Inicializa una galería de imágenes
 * @param {Array} imagesArray - Lista de rutas de imágenes
 * @param {string} mainImgId - ID de la etiqueta <img> principal
 * @param {string} thumbContainerId - ID del contenedor de miniaturas
 */
function initGallery(imagesArray, mainImgId, thumbContainerId) {
  currentImageList = imagesArray;
  currentMainImgId = mainImgId;
  currentThumbContainerId = thumbContainerId;
  currentImageIndex = 0;
  updateGalleryView();
}

function updateGalleryView() {
  const mainImg = document.getElementById(currentMainImgId);
  if (!mainImg) return;

  mainImg.src = currentImageList[currentImageIndex];

  const thumbs = document.querySelectorAll(`#${currentThumbContainerId} .thumb-item, #${currentThumbContainerId} .thumb-item-large`);
  thumbs.forEach((thumb, idx) => {
    if (idx === currentImageIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function changeGalleryImage(direction) {
  if (!currentImageList.length) return;
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = currentImageList.length - 1;
  if (currentImageIndex >= currentImageList.length) currentImageIndex = 0;
  updateGalleryView();
}

function setGalleryImage(index) {
  currentImageIndex = index;
  updateGalleryView();
}

// --- LÓGICA DE REPRODUCTORES DE VIDEO YOUTUBE ---
/**
 * Cambia el video del reproductor de YouTube iframe
 * @param {string} youtubeId - ID del video de YouTube
 * @param {string} iframeId - ID del iframe del reproductor
 * @param {HTMLElement} btnElement - Botón que activó el cambio
 */
function setYoutubeVideo(youtubeId, iframeId, btnElement) {
  const player = document.getElementById(iframeId);
  if (!player) return;
  
  player.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1';

  // Actualiza la clase activa en los botones dentro del mismo contenedor
  if (btnElement) {
    const parent = btnElement.closest('.video-gallery-container');
    if (parent) {
      const buttons = parent.querySelectorAll('.video-card-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');
    }
  }
}

// Inicialización automática de la galería del Salto del Agua
document.addEventListener('DOMContentLoaded', () => {
  const saltoMain = document.getElementById('imgSaltoMain');
  if (saltoMain) {
    const fotosSalto = [
      'img salto-del-agua/muhp-salto-del-agua-1.jpg',
      'img salto-del-agua/muhp-salto-del-agua-2.jpg',
      'img salto-del-agua/muhp-salto-del-agua-3.jpg',
      'img salto-del-agua/muhp-salto-del-agua-4.jpg'
    ];
    initGallery(fotosSalto, 'imgSaltoMain', 'saltoThumbs');
  }
});