/*
  Kebab Box - Bangalore Outlets Status Handler
*/

const OUTLETS_DATA = [
  {
    id: "hebbal",
    name: "Hebbal Outlet (Active)",
    address: "Ayyappa Layout, Hebbal, Bengaluru, Karnataka",
    phone: "+91 99012 19116",
    hours: "4:00 PM - 11:00 PM",
    openHour: 16, // 24-hr format
    openMin: 0,
    closeHour: 23,
    closeMin: 0,
    maps: "https://maps.app.goo.gl/KD2cw6unjDa87dS1A"
  },
  {
    id: "rt-nagar",
    name: "RT Nagar Outlet",
    address: "RT Nagar, Bengaluru, Karnataka",
    phone: "",
    hours: "",
    comingSoon: true
  },
  {
    id: "sanjay-nagar",
    name: "Sanjay Nagar Outlet",
    address: "Sanjay Nagar, Bengaluru, Karnataka",
    phone: "",
    hours: "",
    comingSoon: true
  },
  {
    id: "nagavara",
    name: "Nagavara Outlet",
    address: "Nagavara, Bengaluru, Karnataka",
    phone: "",
    hours: "",
    comingSoon: true
  }
];

function isOutletOpen(outlet) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  
  const currentVal = currentHour * 60 + currentMin;
  const openVal = outlet.openHour * 60 + outlet.openMin;
  const closeVal = outlet.closeHour * 60 + outlet.closeMin;
  
  return currentVal >= openVal && currentVal < closeVal;
}

function renderLocations() {
  const container = document.getElementById('locations-grid-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  OUTLETS_DATA.forEach(outlet => {
    const card = document.createElement('div');
    card.className = 'location-card anim-fade-in';
    card.id = `outlet-${outlet.id}`;
    
    if (outlet.comingSoon) {
      card.classList.add('coming-soon-card');
      card.innerHTML = `
        <div class="location-header">
          <div class="location-icon" style="background: rgba(240, 90, 34, 0.03); color: var(--text-muted); border: 1px solid rgba(255, 255, 255, 0.05);">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span class="status-badge coming-soon" style="background: rgba(240, 90, 34, 0.08); color: var(--brand-orange); border: 1px solid rgba(240, 90, 34, 0.15);">Coming Soon</span>
        </div>
        
        <h3>${outlet.name}</h3>
        <p>${outlet.address}</p>
        
        <div class="coming-soon-message" style="margin-top: auto; border-top: 1px dashed var(--glass-border); padding-top: 16px; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
          Bringing fresh, crispy chicken kebabs to your neighborhood soon!
        </div>
      `;
    } else {
      const open = isOutletOpen(outlet);
      const badgeText = open ? 'Open Now' : 'Closed';
      const badgeClass = open ? 'open' : 'closed';
      
      card.innerHTML = `
        <div class="location-header">
          <div class="location-icon">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span class="status-badge ${badgeClass}">${badgeText}</span>
        </div>
        
        <h3>${outlet.name}</h3>
        <p>${outlet.address}</p>
        
        <ul class="location-details">
          <li class="location-detail-item">
            <svg width="14" height="14" fill="none" stroke="var(--brand-orange)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.183-3.916-6.74-6.74l1.293-.97c.362-.271.528-.733.417-1.173L6.763 2.12c-.124-.501-.575-.852-1.091-.852H2.25A2.25 2.25 0 002.25 6.75z" />
            </svg>
            <span>Call Outlet: ${outlet.phone}</span>
          </li>
          <li class="location-detail-item">
            <svg width="14" height="14" fill="none" stroke="var(--brand-orange)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Hours: ${outlet.hours}</span>
          </li>
        </ul>
        
        <div style="margin-top: 20px;">
          <a href="${outlet.maps}" target="_blank" class="btn-outline" style="font-size: 0.8rem; padding: 6px 14px; border-radius: var(--radius-sm); width: 100%; justify-content: center;">
            Get Directions
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-left: 4px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      `;
    }
    
    container.appendChild(card);
  });
}

// Global exposure
window.renderLocations = renderLocations;
