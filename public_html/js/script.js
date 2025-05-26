import { updateFooter } from './utils/footer.mjs';

document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    window.addEventListener('resize', updateFooter);
});

