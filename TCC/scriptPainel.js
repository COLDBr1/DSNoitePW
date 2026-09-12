const filterButtons = Array.from(document.querySelectorAll('.filter-chip'));
const productCards = Array.from(document.querySelectorAll('.category-card'));
const modal = document.getElementById('product-modal');
const closeModalButton = document.getElementById('close-modal');
const modalName = document.getElementById('modal-product-name');
const modalCategory = document.getElementById('modal-product-category');
const modalUnit = document.getElementById('modal-product-unit');
const modalDescription = document.getElementById('modal-product-description');
const modalImage = document.getElementById('modal-product-image');
const modalWhatsApp = document.getElementById('modal-whatsapp');
const whatsappNumber = '5516000000000';

const menuIcon = document.getElementById('menu-icon');
const mainMenu = document.getElementById('main-menu');

let activeProduct = null;

productCards.forEach(card => {
  const content = card.querySelector('.card-content');
  if (!content || content.querySelector('.product-whatsapp')) return;

  const productWhatsapp = document.createElement('a');
  productWhatsapp.className = 'product-whatsapp';
  productWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto ${card.dataset.name}.`)}`;
  productWhatsapp.target = '_blank';
  productWhatsapp.rel = 'noopener noreferrer';
  productWhatsapp.innerHTML = `<span class="whatsapp-icon" aria-hidden="true">✆</span><span class="whatsapp-text">WhatsApp</span>`;

  content.appendChild(productWhatsapp);
});

if (menuIcon && mainMenu) {
  menuIcon.addEventListener('click', () => {
    const open = mainMenu.classList.toggle('open');
    menuIcon.setAttribute('aria-expanded', String(open));
  });

  window.addEventListener('click', event => {
    if (!event.target.closest('.nav-left')) {
      mainMenu.classList.remove('open');
      menuIcon.setAttribute('aria-expanded', 'false');
    }
  });
}

function applyCategoryFilter(selectedCategory) {
  filterButtons.forEach(item => item.classList.toggle('active', item.dataset.category === selectedCategory));

  productCards.forEach(card => {
    const showCard = selectedCategory === 'todos' || card.dataset.category === selectedCategory;
    card.style.display = showCard ? 'block' : 'none';
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;
    applyCategoryFilter(selectedCategory);
  });
});

productCards.forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');

    activeProduct = card;
    modalName.textContent = card.dataset.name;
    modalCategory.textContent = card.dataset.categoryLabel;
    modalUnit.textContent = card.dataset.unit;
    modalDescription.textContent = card.dataset.description;
    modalImage.src = image ? image.src : '';
    modalImage.alt = image ? image.alt : 'Imagem do produto';

    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto ${card.dataset.name}.`);

    if (modalWhatsApp) {
      modalWhatsApp.href = `https://wa.me/${whatsappNumber}?text=${message}`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.click();
    }
  });
});

modalCategory.addEventListener('click', () => {
  const selectedCategory = modalCategory.textContent.trim().toLowerCase();
  const categoryMap = {
    'trigo': 'trigo',
    'especial': 'especial',
    'pré-mistura': 'premix',
    'pre-mistura': 'premix',
    'integral': 'integral'
  };

  const normalizedCategory = categoryMap[selectedCategory] || 'todos';
  applyCategoryFilter(normalizedCategory);

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

modalCategory.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    modalCategory.click();
  }
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});
