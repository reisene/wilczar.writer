export function updateFooter() {
    const yearEl = document.getElementById('year');
    const sepEl = document.getElementById('separator');
    const baseYear = 2025;
    const currentYear = new Date().getFullYear();

    if (yearEl) {
        yearEl.textContent = currentYear > baseYear
            ? `${baseYear}–${currentYear}`
            : `${baseYear}`;
    }

    if (sepEl) {
        sepEl.innerHTML = window.matchMedia('(max-width: 768px)').matches
            ? '<br>'
            : ' | ';
    }
}
