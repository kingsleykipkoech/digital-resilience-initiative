// Simple smooth scrolling for same-page hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // only intercept if target exists on this page
        const el = document.querySelector(targetId);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
        }
        // otherwise allow normal navigation (external or other page)
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