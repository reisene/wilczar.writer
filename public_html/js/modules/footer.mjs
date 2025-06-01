/**
 * @file footer.mjs
 * @module footer
 * @author AKNETH Studio Katarzyna Pawłowska-Malesa
 * @date 2025-06-01
 * @description
 * Moduł obsługujący dynamiczną aktualizację stopki strony.
 * - updateFooter: Ustawia zakres lat w stopce oraz zmienia separatory w zależności od szerokości ekranu.
 * - initFooterButton: Obsługuje przycisk przewijania do góry oraz efekt ikony na hover.
 *
 * Wymaga obecności elementów: #year, .separator, #toTopBtn, #topIcon.
 *
 * @function updateFooter
 * @function initFooterButton
 * @export
 * @example
 * import { updateFooter, initFooterButton } from './modules/footer.mjs';
 * updateFooter();
 * initFooterButton();
 */

export function updateFooter() {
    const yearEl = document.getElementById('year');
    const sepEls = document.getElementsByClassName('separator');
    const baseYear = 2025;
    const currentYear = new Date().getFullYear();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (yearEl) {
        yearEl.textContent = currentYear > baseYear
            ? `${baseYear}–${currentYear}`
            : `${baseYear}`;
    }

    for (let i = 0; i < sepEls.length; i++) {
        sepEls[i].innerHTML = isMobile ? '<br>' : ' | ';
    }
}

export function initFooterButton() {
    const toTopBtn = document.getElementById('toTopBtn');
    const topIcon = document.getElementById('topIcon');

    if (!toTopBtn || !topIcon) return;

    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toTopBtn.addEventListener('mouseenter', () => {
        topIcon.classList.replace('bi-arrow-up-circle', 'bi-arrow-up-circle-fill');
    });

    toTopBtn.addEventListener('mouseleave', () => {
        topIcon.classList.replace('bi-arrow-up-circle-fill', 'bi-arrow-up-circle');
    });
}

