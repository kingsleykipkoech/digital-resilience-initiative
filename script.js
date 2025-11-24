// Simple smooth scrolling for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal on scroll using Intersection Observer
function setupRevealObserver(){
    const items = document.querySelectorAll('.reveal');
    if(!items.length) return;
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    },{threshold:0.12});
    items.forEach(i=>obs.observe(i));
}

// Simple parallax effect for hero background on scroll
function setupHeroParallax(){
    const heroBg = document.querySelector('.hero-bg');
    if(!heroBg) return;
    window.addEventListener('scroll', ()=>{
        const rect = heroBg.getBoundingClientRect();
        const offset = Math.max(-rect.top, 0);
        // translateY a small amount for parallax
        heroBg.style.transform = `translateY(${offset * 0.12}px)`;
    }, {passive:true});
}

document.addEventListener('DOMContentLoaded', ()=>{
    setupRevealObserver();
    setupHeroParallax();
});