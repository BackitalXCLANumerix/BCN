
(function(){
    emailjs.init("nf5qIz-Ra8XfSYp19");
})();

document.addEventListener('DOMContentLoaded', function() {
    
    
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            toggleModal(modalId, true);
        });
    });

    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('[role="dialog"]');
            toggleModal(modal.id, false);
        });
    });

    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('[role="dialog"]');
            toggleModal(modal.id, false);
        });
    });

    function toggleModal(modalID, show) {
        const modal = document.getElementById(modalID);
        const body = document.body;
        
        if (show) {
            modal.classList.remove('hidden');
            body.style.overflow = 'hidden'; 
        } else {
            modal.classList.add('hidden');
            body.style.overflow = 'auto'; 
        }
    }



    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const btn = document.getElementById('btn-submit');
            const status = document.getElementById('form-status');
            
            const originalText = btn.innerText;
            btn.innerText = 'Envoi en cours...';
            btn.disabled = true;

            const serviceID = 'service_gdni60q'; 
            const templateID = 'template_x5o1b2b'; 

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerText = 'Envoyé !';
                    btn.classList.replace('bg-white', 'bg-green-500');
                    btn.classList.replace('text-black', 'text-white');
                    
                    status.innerText = "Message reçu 5/5. On revient vers vous très vite.";
                    status.classList.remove('hidden');
                    status.classList.add('text-green-400');
                    status.classList.remove('text-red-400');
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.classList.replace('bg-green-500', 'bg-white');
                        btn.classList.replace('text-white', 'text-black');
                        status.classList.add('hidden');
                        contactForm.reset();
                    }, 5000);
                }, (err) => {
                    btn.innerText = 'Erreur';
                    btn.classList.replace('bg-white', 'bg-red-500');
                    status.innerText = "Oups, une erreur technique. Envoyez-nous un mail direct à contact@backitalxclanumerix.fr";
                    status.classList.remove('hidden');
                    status.classList.add('text-red-400');
                    console.error('Erreur EmailJS:', err); 
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.classList.replace('bg-red-500', 'bg-white');
                    }, 5000);
                });
        });
    }
});