// Pillah Priscilah JS

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form Steps Engine
    const stepsData = [
        { id: 1, title: 'Choose Your Occasion', type: 'radio', name: 'occasion', options: ['Birthday', 'Wedding', 'Anniversary', 'Graduation', 'Baby Shower', 'Bridal Shower', 'Kids Celebration', 'Corporate Event', 'Other'] },
        { id: 2, title: 'Choose Your Cake Style', type: 'radio', name: 'style', options: ['Vintage', 'Minimalist', 'Floral', 'Elegant', 'Cartoon/Themed', 'Heart-shaped', 'Luxury', 'Traditional', 'Custom Design'] },
        { id: 3, title: 'Cake Details', type: 'multi-input', fields: [{name: 'size', placeholder: 'e.g. 8 inch'}, {name: 'servings', placeholder: 'Number of servings'}, {name: 'shape', placeholder: 'Round, Square, Heart...'}, {name: 'tiers', placeholder: 'Number of tiers'}] },
        { id: 4, title: 'Choose Flavours', type: 'checkbox', name: 'flavours', options: ['Vanilla', 'Chocolate', 'Red Velvet', 'Black Forest', 'White Forest', 'Strawberry', 'Lemon', 'Marble'] },
        { id: 5, title: 'Personalise Your Cake', type: 'textarea', name: 'message', placeholder: 'Message to write on the cake, decorations, theme...' },
        { id: 6, title: 'Describe Your Dream Design', type: 'textarea', name: 'description', placeholder: 'Describe the cake you have in mind in detail...' },
        { id: 7, title: 'Date & Collection', type: 'multi-input', fields: [{name: 'date', type: 'date', placeholder: 'Required Date'}, {name: 'delivery', placeholder: 'Collection or Delivery location'}] }
    ];

    let currentStep = 1;
    const totalSteps = stepsData.length;
    const form = document.getElementById('cakeForm');
    
    // Generate Steps HTML dynamically
    const generateSteps = () => {
        stepsData.forEach((step, index) => {
            if(index === 0) return; // Step 1 is in HTML already for SEO/fallback
            let html = `<div class="form-step hidden" data-step="${step.id}"><h3>${step.title}</h3>`;
            
            if (step.type === 'radio' || step.type === 'checkbox') {
                html += `<div class="options-grid">`;
                step.options.forEach(opt => {
                    html += `<label class="option-card"><input type="${step.type}" name="${step.name}" value="${opt}"><span>${opt}</span></label>`;
                });
                html += `</div>`;
            } else if (step.type === 'textarea') {
                html += `<textarea name="${step.name}" placeholder="${step.placeholder}" rows="4" style="width:100%; padding:1rem; border:1px solid var(--peach); border-radius:8px; margin-top:1rem;"></textarea>`;
            } else if (step.type === 'multi-input') {
                html += `<div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">`;
                step.fields.forEach(f => {
                    html += `<input type="${f.type || 'text'}" name="${f.name}" placeholder="${f.placeholder}" style="padding:1rem; border:1px solid var(--peach); border-radius:8px;">`;
                });
                html += `</div>`;
            }
            html += `</div>`;
            form.insertBefore(document.createRange().createContextualFragment(html), document.querySelector('.step-actions'));
        });
    };
    
    generateSteps();

    // Logic
    const updateSummary = () => {
        const formData = new FormData(form);
        const summary = document.getElementById('summary-content');
        let html = '';
        
        for (let [key, value] of formData.entries()) {
            if(value) {
                html += `<strong>${key.toUpperCase()}:</strong> ${value}<br>`;
            }
        }
        
        if (html === '') {
            summary.innerHTML = '<p class="empty-msg">Start selecting to build your cake.</p>';
        } else {
            summary.innerHTML = `<p style="font-size:0.9rem; line-height:1.8;">${html}</p>`;
        }
    };

    form.addEventListener('change', updateSummary);
    form.addEventListener('input', updateSummary);

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentStep < totalSteps) {
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('hidden');
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('hidden');
            document.getElementById('current-step').innerText = currentStep;
            
            document.getElementById('prevBtn').classList.remove('hidden');
            if (currentStep === totalSteps) {
                document.getElementById('nextBtn').classList.add('hidden');
                document.getElementById('submitBtn').classList.remove('hidden');
            }
            document.getElementById('progress').style.width = `${(currentStep / totalSteps) * 100}%`;
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentStep > 1) {
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('hidden');
            currentStep--;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('hidden');
            document.getElementById('current-step').innerText = currentStep;
            
            document.getElementById('nextBtn').classList.remove('hidden');
            document.getElementById('submitBtn').classList.add('hidden');
            if (currentStep === 1) {
                document.getElementById('prevBtn').classList.add('hidden');
            }
            document.getElementById('progress').style.width = `${(currentStep / totalSteps) * 100}%`;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let msg = "Hello Pillah Priscilah! I would love to enquire about a custom cake.%0A%0A";
        
        for (let [key, value] of formData.entries()) {
            if(value) msg += `*${key.toUpperCase()}:* ${value}%0A`;
        }
        
        msg += "%0A(Remember to attach your inspiration image here!)";
        window.open(`https://wa.me/254742025817?text=${msg}`, '_blank');
    });
});
