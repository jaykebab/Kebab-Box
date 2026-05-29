/*
  Kebab Box - Product SKU Menu Data & UI Renderer
*/

// Exact product database matching QSR taxonomy and pricing cards
const MENU_DATA = [
  {
    id: "signature-kebab",
    name: "Signature Kebab (Original)",
    category: "kebabs",
    diet: "non-veg",
    description: "The Original Flavour. Clean, fresh chicken kebabs, marinated daily with our secret house spices and cooked to crispy, golden, tender perfection.",
    image: "assets/images/Signature.jpg",
    spice: "Mild",
    rating: "4.9",
    type: "weight-only",
    variants: [
      { label: "150 Grams", value: "150g", price: 120 },
      { label: "250 Grams", value: "250g", price: 200 },
      { label: "300 Grams", value: "300g", price: 240 },
      { label: "400 Grams", value: "400g", price: 320 },
      { label: "500 Grams", value: "500g", price: 400 },
      { label: "750 Grams", value: "750g", price: 600 },
      { label: "1 Kg", value: "1kg", price: 800 }
    ],
    defaultVariant: "150g"
  },
  {
    id: "flavoured-kebab",
    name: "Flavoured Kebab Box",
    category: "kebabs",
    diet: "non-veg",
    description: "Our signature crispy-fried fresh kebabs loaded with your seasoning of choice. Choose from our 5 epic dry rub toppings.",
    image: "assets/images/Peri_Peri.jpg",
    spice: "Custom",
    rating: "4.8",
    type: "flavor-and-weight",
    flavors: [
      { name: "Peri Peri", code: "peri-peri", icon: "🌶️🌶️", spice: "Medium", image: "assets/images/Peri_Peri.jpg" },
      { name: "Hot & Spicy", code: "hot-spicy", icon: "🌶️🌶️🌶️", spice: "Extra Hot", image: "assets/images/Hot_Spicy.jpg" },
      { name: "Mint", code: "mint", icon: "🌿", spice: "Mild", image: "assets/images/Mint.jpg" },
      { name: "Lemon Chilli", code: "lemon-chilli", icon: "🌶️🍋", spice: "Tangy Spiced", image: "assets/images/Lemon_Chili.jpg" },
      { name: "Korean", code: "korean", icon: "🥢", spice: "Sweet & Spicy", image: "assets/images/Korean.jpg" }
    ],
    variants: [
      { label: "200 Grams", value: "200g", price: 180 },
      { label: "300 Grams", value: "300g", price: 270 },
      { label: "400 Grams", value: "400g", price: 360 },
      { label: "500 Grams", value: "500g", price: 450 },
      { label: "600 Grams", value: "600g", price: 540 },
      { label: "700 Grams", value: "700g", price: 630 },
      { label: "800 Grams", value: "800g", price: 720 }
    ],
    defaultFlavor: "peri-peri",
    defaultVariant: "200g"
  },
  {
    id: "signature-lollipop",
    name: "Signature Chicken Lollipops",
    category: "lollipops",
    diet: "non-veg",
    description: "The Original Flavour. Deep-fried juicy chicken drumettes shaped into perfect lollipops, tender inside and crunchy outside.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80",
    spice: "Mild",
    rating: "4.9",
    type: "size-only",
    variants: [
      { label: "Small (5 pcs)", value: "small", price: 200 },
      { label: "Large (8 pcs)", value: "large", price: 300 }
    ],
    defaultVariant: "small"
  },
  {
    id: "flavored-lollipop",
    name: "Flavored Chicken Lollipops",
    category: "lollipops",
    diet: "non-veg",
    description: "Crispy chicken lollipops tossed in dry rub seasonings of your choice for a flavorful, aromatic kick.",
    image: "assets/images/Peri_Peri.jpg",
    spice: "Custom",
    rating: "4.7",
    type: "flavor-and-size",
    flavors: [
      { name: "Peri Peri", code: "peri-peri", icon: "🌶️🌶️", image: "assets/images/Peri_Peri.jpg" },
      { name: "Hot & Spicy", code: "hot-spicy", icon: "🌶️🌶️🌶️", image: "assets/images/Hot_Spicy.jpg" },
      { name: "Mint", code: "mint", icon: "🌿", image: "assets/images/Mint.jpg" },
      { name: "Lemon Chilli", code: "lemon-chilli", icon: "🌶️🍋", image: "assets/images/Lemon_Chili.jpg" },
      { name: "Korean", code: "korean", icon: "🥢", image: "assets/images/Korean.jpg" }
    ],
    variants: [
      { label: "Small (5 pcs)", value: "small", price: 220 },
      { label: "Large (8 pcs)", value: "large", price: 320 }
    ],
    defaultFlavor: "peri-peri",
    defaultVariant: "small"
  },
  {
    id: "goli-soda",
    name: "Classic Goli Soda",
    category: "drinks",
    diet: "veg",
    description: "A refreshing traditional marble-pop soda. The perfect cooling companion to clear the throat after fiery kebabs.",
    image: "assets/images/goli_soda.jpg",
    spice: "Sweet",
    rating: "4.9",
    type: "single",
    price: 30
  },
  {
    id: "water-bottle",
    name: "Chilled Water Bottle",
    category: "drinks",
    diet: "veg",
    description: "Packaged mineral drinking water, served chilled for absolute refreshment.",
    image: "assets/images/water_bottle.png",
    spice: "None",
    rating: "4.5",
    type: "single",
    price: 10
  }
];

// Tracks current user selectors for each card in the UI
const activeSelections = {};

function initActiveSelections() {
  MENU_DATA.forEach(item => {
    activeSelections[item.id] = {
      variant: item.defaultVariant || null,
      flavor: item.defaultFlavor || null,
      price: item.price || 0
    };
    
    // Calculate initial price if it's a variant-based item
    if (item.variants) {
      const def = item.variants.find(v => v.value === item.defaultVariant);
      if (def) activeSelections[item.id].price = def.price;
    }
  });
}

function handleVariantChange(itemId, variantValue) {
  const item = MENU_DATA.find(i => i.id === itemId);
  if (!item) return;
  
  activeSelections[itemId].variant = variantValue;
  
  const selectedVariant = item.variants.find(v => v.value === variantValue);
  if (selectedVariant) {
    activeSelections[itemId].price = selectedVariant.price;
  }
  
  // Update price display on card
  const priceDisplay = document.querySelector(`#price-${itemId}`);
  if (priceDisplay) {
    priceDisplay.textContent = `₹${activeSelections[itemId].price}`;
  }
  
  // Update buttons state
  const btnGroup = document.querySelector(`#variants-${itemId}`);
  if (btnGroup) {
    btnGroup.querySelectorAll('.select-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-value') === variantValue);
    });
  }
}

function handleFlavorChange(itemId, flavorCode) {
  const item = MENU_DATA.find(i => i.id === itemId);
  if (!item) return;
  
  activeSelections[itemId].flavor = flavorCode;
  
  // Dynamic card image swapping!
  const flavorObj = item.flavors.find(f => f.code === flavorCode);
  if (flavorObj && flavorObj.image) {
    const cardEl = document.getElementById(`menu-card-${itemId}`);
    if (cardEl) {
      const imgEl = cardEl.querySelector('.menu-card-img');
      if (imgEl) {
        imgEl.src = flavorObj.image;
      }
    }
  }
  
  // Update buttons state
  const btnGroup = document.querySelector(`#flavors-${itemId}`);
  if (btnGroup) {
    btnGroup.querySelectorAll('.select-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-value') === flavorCode);
    });
  }
}

// Function to render products inside the grid container
function renderMenu(filterCategory = 'all') {
  const gridContainer = document.getElementById('menu-grid-container');
  if (!gridContainer) return;
  
  gridContainer.innerHTML = '';
  
  const filteredData = filterCategory === 'all' 
    ? MENU_DATA 
    : MENU_DATA.filter(item => item.category === filterCategory);
    
  filteredData.forEach(item => {
    const selection = activeSelections[item.id];
    const card = document.createElement('div');
    card.className = 'menu-card anim-fade-in';
    card.id = `menu-card-${item.id}`;
    
    // Badge generation
    const dietClass = item.diet === 'veg' ? '' : 'non-veg';
    const spiceIndicator = item.spice !== 'None' 
      ? `<span class="tag-spice">${item.spice}</span>` 
      : '';
      
    // Option selectors HTML
    let optionsHtml = '';
    
    if (item.type === 'weight-only' || item.type === 'size-only') {
      optionsHtml = `
        <div class="menu-options">
          <div class="option-group">
            <span class="option-label">${item.type === 'weight-only' ? 'Choose Weight' : 'Choose Size'}</span>
            <div class="option-select-btn-group" id="variants-${item.id}">
              ${item.variants.map(v => `
                <button class="select-btn ${selection.variant === v.value ? 'selected' : ''}" 
                  data-value="${v.value}" 
                  onclick="handleVariantChange('${item.id}', '${v.value}')">
                  ${v.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (item.type === 'flavor-and-weight' || item.type === 'flavor-and-size') {
      const optionLabel = item.type === 'flavor-and-weight' ? 'Choose Weight' : 'Choose Size';
      optionsHtml = `
        <div class="menu-options">
          <div class="option-group">
            <span class="option-label">Choose Topping Flavor</span>
            <div class="option-select-btn-group" id="flavors-${item.id}">
              ${item.flavors.map(f => `
                <button class="select-btn ${selection.flavor === f.code ? 'selected' : ''}" 
                  data-value="${f.code}" 
                  onclick="handleFlavorChange('${item.id}', '${f.code}')">
                  ${f.name} ${f.icon}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="option-group">
            <span class="option-label">${optionLabel}</span>
            <div class="option-select-btn-group" id="variants-${item.id}">
              ${item.variants.map(v => `
                <button class="select-btn ${selection.variant === v.value ? 'selected' : ''}" 
                  data-value="${v.value}" 
                  onclick="handleVariantChange('${item.id}', '${v.value}')">
                  ${v.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    card.innerHTML = `
      <div class="menu-img-container">
        <img src="${item.image}" alt="${item.name}" class="menu-card-img" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80'">
        <div class="menu-badges">
          <span class="tag-diet ${dietClass}"></span>
          ${spiceIndicator}
        </div>
      </div>
      <div class="menu-card-body">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <h3 class="menu-card-title">${item.name}</h3>
          <span style="color: var(--brand-yellow); font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 4px;">
            ★ ${item.rating}
          </span>
        </div>
        <p class="menu-card-desc">${item.description}</p>
        
        ${optionsHtml}
        
        <div class="menu-card-footer">
          <div class="price-container" style="width: 100%; text-align: center;">
            <span class="price" id="price-${item.id}">₹${selection.price}</span>
            <span class="price-subtext">Inclusive of GST</span>
          </div>
        </div>
      </div>
    `;
    
    gridContainer.appendChild(card);
  });
}

// Global exposure for event handlers
window.handleVariantChange = handleVariantChange;
window.handleFlavorChange = handleFlavorChange;

// Initialize selections on file load
initActiveSelections();
