/**
 * @file toc.mjs
 * @module toc
 * @author AKNETH Studio Katarzyna Pawłowska-Malesa
 * @date 2025-06-01
 * @description
 * Inicjalizuje i obsługuje panel spisu treści (TOC) na stronie.
 * Zapewnia płynne przewijanie do sekcji, automatyczne i manualne zamykanie panelu,
 * obsługę klawiatury, dotyku oraz interakcji użytkownika.
 *
 * Wymaga obecności elementów o id: "toc-toggle" (przycisk) i "toc-panel" (panel TOC).
 *
 * @function
 * @export
 * @example
 * import { initToc } from './modules/toc.mjs';
 * initToc();
 */

export function initToc() {

    const toggleButton = document.getElementById("toc-toggle");
    const tocPanel = document.getElementById("toc-panel");

    let tocTimer;

    function showTOC() {
        tocPanel.classList.add("visible");
        toggleButton.classList.add("active");

        clearTimeout(tocTimer); // reset, jeśli klikniesz kilka razy
        tocTimer = setTimeout(() => {
            tocPanel.classList.remove("visible");
            toggleButton.classList.remove("active");
        }, 30000); // 30 sekund
    }

    function hideTOC() {
        tocPanel.classList.remove("visible");
        toggleButton.classList.remove("active");
        clearTimeout(tocTimer);
    }

    toggleButton.addEventListener("click", (e) => {
        e.stopPropagation(); // nie wyzwalaj zamknięcia
        if (tocPanel.classList.contains("visible")) {
            hideTOC();
        }
        else {
            showTOC();
        }
        showTOC();

    });

    document.addEventListener("click", (e) => {
        if (!tocPanel.contains(e.target) && e.target !== toggleButton) {
            hideTOC();
        }
    });
    // Obsługa klawiatury
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hideTOC();
        }
    });
    // Obsługa dotyku
    tocPanel.addEventListener("touchstart", (e) => {
        e.stopPropagation(); // zapobiegaj zamknięciu przy dotyku
    });
    // Obsługa zmiany rozmiaru okna
    window.addEventListener("resize", () => {
        if (tocPanel.classList.contains("visible")) {
            hideTOC();
        }
    });
    // Obsługa przewijania
    window.addEventListener("scroll", () => {
        if (tocPanel.classList.contains("visible")) {
            hideTOC();
        }
    });
    // Obsługa klikania w linki w panelu TOC
    tocPanel.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            hideTOC();
        }
    });
    
    // Obsługa przewijania do sekcji po kliknięciu w link
    tocPanel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                hideTOC();
            }
        });
    });

}