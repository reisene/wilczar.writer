/**
 * @file script.js
 * @module main
 * @author AKNETH Studio Katarzyna Pawłowska-Malesa
 * @date 2025-06-01
 * @description
 * Główny plik inicjalizujący funkcje interfejsu strony:
 * - Sticky menu fallback dla nagłówka.
 * - Dynamiczna aktualizacja stopki i obsługa przycisku przewijania do góry.
 * - Płynne przewijanie do sekcji po kliknięciu w linki kotwicowe.
 * - Inicjalizacja panelu spisu treści (TOC) na stronach polityk.
 *
 * Wymaga obecności odpowiednich modułów i elementów DOM.
 *
 * @example
 * import { updateFooter, initFooterButton } from './modules/footer.mjs';
 * import { stickyFallback } from './modules/stickywrapper.mjs';
 * import { initToc } from './modules/toc.mjs';
 * // Automatycznie wywoływany po załadowaniu DOM
 */

import { updateFooter, initFooterButton } from './modules/footer.mjs';
import { debounce } from './utils/debounce.mjs';
import { stickyFallback } from './modules/stickywrapper.mjs';
import { initToc } from './modules/toc.mjs';

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

    // Initialize Table of Contents
    const path = window.location.pathname;

    if (
        path.includes("/policies/privacy.html") ||
        path.includes("/policies/rodo.html") ||
        path.includes("/policies/terms.html")
    ) {
        try{
            initToc();
        } catch (error) {
            console.error("Error initializing Table of Contents:", error);
            Sentry.captureException(error, {
                extra: {
                    path: path,
                    message: "Failed to initialize Table of Contents"
                }
            });
        }
    }
});