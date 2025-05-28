import { updateFooter, initFooterButton } from './modules/footer.mjs';
import { debounce } from './utils/debounce.mjs';
import { stickyFallback } from './modules/stickywrapper.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize sticky menu fallback
    stickyFallback();
    
    // Update footer and initialize footer button
    updateFooter();
    window.addEventListener('resize', debounce(updateFooter, 300));
    initFooterButton();

    /* Smooth scroll for anchor links
    * This will allow smooth scrolling for links that point to sections within the page */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

