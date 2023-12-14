// Animation au scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    if(scrolled > 100) {
        document.body.style.backgroundColor = '#f5f5f5';
    } else {
        document.body.style.backgroundColor = 'white';
    }
});
