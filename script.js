document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            const isClosed = mobileDrawer.classList.contains('translate-x-full');
            if (isClosed) {
                mobileDrawer.classList.remove('translate-x-full');
            } else {
                mobileDrawer.classList.add('translate-x-full');
            }
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
