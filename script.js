// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, 
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// --- UPDATED FORM SUBMISSION CODE START ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            console.log('Form data being sent:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            const response = await fetch('https://formspree.io/f/mlgwvkwj', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Thank you for reaching out to RCMJ\'s Beauty Salon! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem submitting your form.');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Thank you for reaching out to RCMJ\'s Beauty Salon! We will get back to you soon.');
            contactForm.reset();
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
// --- UPDATED FORM SUBMISSION CODE END ---

// Enhanced Booking Form Functionality
const serviceSelect = document.getElementById('service-select');
const durationDisplay = document.getElementById('duration-display');
const appointmentDate = document.getElementById('appointment-date');
const timeSlots = document.getElementById('time-slots');

serviceSelect.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const duration = selectedOption.getAttribute('data-duration');
    
    if (duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        let durationText = '';
        
        if (hours > 0) durationText += hours + ' hour' + (hours > 1 ? 's' : '');
        if (minutes > 0) durationText += (durationText ? ' ' : '') + minutes + ' minutes';
        durationDisplay.textContent = durationText;
    } else {
        durationDisplay.textContent = 'Select a service';
    }
    
    timeSlots.innerHTML = '<option value="" disabled selected>Select Time</option>';
});

appointmentDate.addEventListener('change', generateTimeSlots);

function generateTimeSlots() {
    const selectedDate = new Date(appointmentDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    timeSlots.innerHTML = '<option value="" disabled selected>Select Time</option>';
    
    if (!appointmentDate.value || selectedDate < today) return;
    
    const isToday = selectedDate.toDateString() === today.toDateString();
    const currentHour = new Date().getHours();
    
    for (let hour = 9; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const slotHour = hour + (minute / 60);
            if (isToday && slotHour <= currentHour) continue;
            const option = document.createElement('option');
            option.value = timeString;
            option.textContent = formatTime(timeString);
            timeSlots.appendChild(option);
        }
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

const today = new Date().toISOString().split('T')[0];
appointmentDate.setAttribute('min', today);

// Scroll Animations (Fade-in on Scroll)
const faders = document.querySelectorAll('.service-card, .pricing-card, .gallery-grid img, .testimonial-card, .team-card, .blog-card, .about-content, #contact-form, .testimonial-form');

const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// FAQ Accordion Functionality
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// Floating Back to Top Button
const floatingTopBtn = document.getElementById('floating-back-to-top');
window.addEventListener('scroll', () => {
    floatingTopBtn.classList.toggle('show', window.scrollY > 500);
});

// --- Before/After Slider (Automatic) ---
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => {
        const container = slider.querySelector('.before-after-container');
        const handle = slider.querySelector('.slider-handle');
        const afterImg = slider.querySelector('.after-img');
        let isDragging = false, currentX, initialX, xOffset = 0, autoPlayInterval, isAutoPlaying = true;
        const updateSliderPosition = (percentage) => {
            percentage = Math.max(0, Math.min(100, percentage));
            handle.style.left = percentage + '%';
            afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        };
        const startAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            let direction = 1, currentPosition = 10;
            autoPlayInterval = setInterval(() => {
                currentPosition += direction;
                if (currentPosition >= 90) { currentPosition = 90; direction = -1; }
                else if (currentPosition <= 10) { currentPosition = 10; direction = 1; }
                updateSliderPosition(currentPosition);
            }, 30);
        };
        const stopAutoPlay = () => { if (autoPlayInterval) clearInterval(autoPlayInterval); isAutoPlaying = false; };
        const resumeAutoPlay = () => { if (!isAutoPlaying) { isAutoPlaying = true; setTimeout(startAutoPlay, 3000); } };

        handle.addEventListener('mousedown', e => { isDragging = true; initialX = e.clientX - xOffset; stopAutoPlay(); e.preventDefault(); });
        document.addEventListener('mousemove', e => { if (isDragging) { e.preventDefault(); const rect = container.getBoundingClientRect(); updateSliderPosition(((e.clientX - rect.left) / rect.width) * 100); } });
        document.addEventListener('mouseup', () => { if (isDragging) { isDragging = false; resumeAutoPlay(); } });

        handle.addEventListener('touchstart', e => { isDragging = true; initialX = e.touches[0].clientX - xOffset; stopAutoPlay(); e.preventDefault(); });
        document.addEventListener('touchmove', e => { if (isDragging) { e.preventDefault(); const rect = container.getBoundingClientRect(); updateSliderPosition(((e.touches[0].clientX - rect.left) / rect.width) * 100); } });
        document.addEventListener('touchend', () => { if (isDragging) { isDragging = false; resumeAutoPlay(); } });

        container.addEventListener('click', e => { if (e.target !== handle && !handle.contains(e.target)) { const rect = container.getBoundingClientRect(); updateSliderPosition(((e.clientX - rect.left) / rect.width) * 100); stopAutoPlay(); resumeAutoPlay(); } });
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', () => { if (!isDragging) resumeAutoPlay(); });

        startAutoPlay();
    });
});

// --- Full Gallery Modal ---
const viewFullGalleryBtn = document.getElementById('view-full-gallery');
const fullGalleryModal = document.getElementById('full-gallery-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const modalGalleryItems = document.querySelectorAll('.modal-gallery-item');

viewFullGalleryBtn.addEventListener('click', e => { e.preventDefault(); fullGalleryModal.classList.add('active'); document.body.style.overflow = 'hidden'; });
function closeModal() { fullGalleryModal.classList.remove('active'); document.body.style.overflow = 'auto'; }
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && fullGalleryModal.classList.contains('active')) closeModal(); });
modalGalleryItems.forEach(item => item.addEventListener('click', () => { console.log('Image clicked:', item.src); }));

// --- Salon Gallery Carousel ---
const galleryContainer = document.getElementById('gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

if (galleryContainer && galleryItems.length > 0) {
    let currentGalleryIndex = 0;
    const itemsToShow = 3;
    const totalItems = galleryItems.length;
    const updateGallery = () => {
        galleryItems.forEach(item => { item.style.display = 'none'; item.classList.remove('active'); });
        for (let i = currentGalleryIndex; i < currentGalleryIndex + itemsToShow && i < totalItems; i++) {
            galleryItems[i].style.display = 'block';
            galleryItems[i].classList.add('active');
        }
        if (galleryPrev) galleryPrev.disabled = currentGalleryIndex === 0;
        if (galleryNext) galleryNext.disabled = currentGalleryIndex >= totalItems - itemsToShow;
    };
    if (galleryPrev) galleryPrev.addEventListener('click', () => { if (currentGalleryIndex > 0) { currentGalleryIndex--; updateGallery(); } });
    if (galleryNext) galleryNext.addEventListener('click', () => { if (currentGalleryIndex < totalItems - itemsToShow) { currentGalleryIndex++; updateGallery(); } });
    updateGallery();
}