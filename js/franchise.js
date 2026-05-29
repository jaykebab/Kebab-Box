/*
  Kebab Box - Custom Multi-Step Google Forms Integration
  Captures data directly on-page and posts to Google Forms via a hidden iframe
*/

let submitted = false;
let contactSubmitted = false;
window.contactSubmitted = false;
let currentStep = 1;
const totalSteps = 3;

function initFranchiseForm() {
  const form = document.getElementById('google-franchise-form');
  if (!form) return;
  
  // Set up navigation buttons
  updateFormSteps(false);
}

function nextStep() {
  if (validateStep(currentStep)) {
    if (currentStep < totalSteps) {
      currentStep++;
      updateFormSteps(true);
    }
  } else {
    showToast("Please fill out all required fields in this step.");
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateFormSteps(true);
  }
}

function validateStep(step) {
  const stepContainer = document.querySelector(`.step-panel[data-step="${step}"]`);
  if (!stepContainer) return true;
  
  const requiredInputs = stepContainer.querySelectorAll('[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('input-error');
      
      // Remove error class on focus/input
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
      }, { once: true });
    }
  });
  
  return isValid;
}

function updateFormSteps(shouldScroll = false) {
  // Show/Hide panels
  document.querySelectorAll('.step-panel').forEach(panel => {
    const stepNum = parseInt(panel.getAttribute('data-step'));
    panel.classList.toggle('active', stepNum === currentStep);
  });
  
  // Update progress indicators
  document.querySelectorAll('.step-indicator-item').forEach(indicator => {
    const stepNum = parseInt(indicator.getAttribute('data-step'));
    indicator.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      indicator.classList.add('active');
    } else if (stepNum < currentStep) {
      indicator.classList.add('completed');
    }
  });
  
  // Scroll form into view if needed
  if (shouldScroll) {
    const formContainer = document.querySelector('.franchise-form-container');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function handleFranchiseSubmit() {
  submitted = true;
  
  // Show submitting status on button
  const submitBtn = document.getElementById('btn-fran-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Submitting Application <span class="spinner"></span>`;
  }
}

function handleFormSuccess() {
  // Reset submission state
  submitted = false;
  
  // Hide form and show beautiful success state
  const formContainer = document.querySelector('.franchise-form-container');
  if (formContainer) {
    formContainer.innerHTML = `
      <div class="success-state-wrapper anim-fade-in" style="text-align: center; padding: 40px 20px;">
        <div class="success-checkmark-wrapper" style="width: 80px; height: 80px; border-radius: 50%; background: rgba(34, 197, 94, 0.1); border: 2px solid var(--accent-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
          <svg width="40" height="40" fill="none" stroke="var(--accent-green)" stroke-width="3" viewBox="0 0 24 24" style="animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Application Received!</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 380px; margin: 0 auto 24px auto; line-height: 1.6;">
          Thank you for applying. Your franchise query has been successfully recorded in our backend database. Our corporate F&B relations team will reach out to you within 24-48 business hours.
        </p>
        <button class="btn-outline" onclick="location.reload()" style="font-size: 0.85rem; padding: 10px 24px; border-radius: var(--radius-md);">Submit Another Query</button>
      </div>
    `;
  }
}

function handleContactSubmit() {
  contactSubmitted = true;
  window.contactSubmitted = true;
  
  // Show submitting status on button
  const submitBtn = document.getElementById('btn-contact-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending Message <span class="spinner"></span>`;
  }
}

function handleContactSuccess() {
  // Reset submission state
  contactSubmitted = false;
  window.contactSubmitted = false;
  
  // Hide form and show beautiful success state
  const formContainer = document.getElementById('contact-form-container');
  if (formContainer) {
    formContainer.innerHTML = `
      <div class="success-state-wrapper anim-fade-in" style="text-align: center; padding: 40px 20px;">
        <div class="success-checkmark-wrapper" style="width: 80px; height: 80px; border-radius: 50%; background: rgba(34, 197, 94, 0.1); border: 2px solid var(--accent-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto;">
          <svg width="40" height="40" fill="none" stroke="var(--accent-green)" stroke-width="3" viewBox="0 0 24 24" style="animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Message Sent!</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 380px; margin: 0 auto 24px auto; line-height: 1.6;">
          Thank you for reaching out. Your query has been successfully submitted in the background. Our support relations team will get back to you shortly.
        </p>
        <button class="btn-outline" onclick="location.reload()" style="font-size: 0.85rem; padding: 10px 24px; border-radius: var(--radius-md);">Send Another Message</button>
      </div>
    `;
  }
}

// Global exposure
window.nextStep = nextStep;
window.prevStep = prevStep;
window.handleFranchiseSubmit = handleFranchiseSubmit;
window.handleFormSuccess = handleFormSuccess;
window.handleContactSubmit = handleContactSubmit;
window.handleContactSuccess = handleContactSuccess;

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', initFranchiseForm);
