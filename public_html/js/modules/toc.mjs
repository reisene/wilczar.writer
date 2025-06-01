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

let tocTimer;
let toggleButton;
let tocPanel;

const showTOC = () => {
    tocPanel.classList.remove('hidden');
    tocPanel.classList.add("visible");
    toggleButton.classList.add("active");
    clearTimeout(tocTimer);
    tocTimer = setTimeout(hideTOC, 30000);
};

const hideTOC = () => {
    tocPanel.classList.remove("visible");
    tocPanel.classList.add('hidden')
    toggleButton.classList.remove("active");
    clearTimeout(tocTimer);
};

const handleToggleClick = e => {
    e.stopPropagation();
    if (tocPanel.classList.contains("visible")) {
        hideTOC();
    } else {
        showTOC();
    }
};

const handleDocumentClick = e => {
    if (!tocPanel.contains(e.target) && e.target !== toggleButton) {
        hideTOC();
    }
};

const handleKeydown = e => {
    if (e.key === "Escape") hideTOC();
};

const handleTouchStart = e => {
    e.stopPropagation();
};

const handleResize = () => {
    if (tocPanel.classList.contains("visible")) hideTOC();
};

const handleScroll = () => {
    if (tocPanel.classList.contains("visible")) hideTOC();
};

const handleTocLinkClick = e => {
    if (e.target.tagName === "A") hideTOC();
};

const setupSmoothScrollLinks = () => {
    tocPanel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                hideTOC();
            }
        });
    });
};

export function initToc() {
    toggleButton = document.getElementById("toc-toggle");
    tocPanel = document.getElementById("toc-panel");
    toggleButton.addEventListener("click", handleToggleClick);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);
    tocPanel.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    tocPanel.addEventListener("click", handleTocLinkClick);
    setupSmoothScrollLinks();
}