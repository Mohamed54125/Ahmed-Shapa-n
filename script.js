document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.main-nav');

    function applyTheme(t){
        if(t === 'light'){
            body.setAttribute('data-theme','light');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            toggle.setAttribute('aria-pressed','true');
        } else {
            body.setAttribute('data-theme','dark');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            toggle.setAttribute('aria-pressed','false');
        }
        localStorage.setItem('site-theme', t);
    }

    const saved = localStorage.getItem('site-theme') || 'dark';
    applyTheme(saved);

    toggle.addEventListener('click', ()=>{
        const current = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(current);
    });

    menuToggle && menuToggle.addEventListener('click', ()=>{
        const opened = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!opened));
        nav.style.display = opened ? 'none' : 'block';
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                nav.style.display = 'none';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });


    

    document.getElementById('year').textContent = new Date().getFullYear();

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_w18sytt';
   const templateID = 'template_hbvykcr';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});