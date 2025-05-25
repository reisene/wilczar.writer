import { updateFooter } from './utils/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    window.addEventListener('resize', updateFooter);
});

