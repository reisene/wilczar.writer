/**
 * @file stickywrapper.mjs
 * @module stickywrapper
 * @author AKNETH Studio Katarzyna Pawłowska-Malesa
 * @date 2025-06-01
 * @description
 * Zapewnia fallback dla efektu sticky nagłówka nawigacji.
 * Po przewinięciu strony dodaje klasę 'is-sticky' do #header-wrapper i odpowiednio ustawia margines górny dla <main>,
 * aby treść nie była zasłonięta przez nagłówek.
 *
 * Wymaga obecności elementów o id: 'header-wrapper' (nawigacja) i <main> (główna treść).
 *
 * @function stickyFallback
 * @export
 * @example
 * import { stickyFallback } from './modules/stickywrapper.mjs';
 * stickyFallback();
 */

export function stickyFallback() {
    const nav = document.getElementById('header-wrapper');
    const main = document.querySelector('main');

    if (!nav || !main) return;

    const navHeight = nav.offsetHeight;
    const navOffset = nav.offsetTop;

    const onScroll = () => {
        if (window.scrollY >= navOffset) {
            if (!nav.classList.contains('is-sticky')) {
                nav.classList.add('is-sticky');
                main.style.marginTop = `${navHeight}px`; // Zrównoważ pozycjonowanie
            }
        } else {
            nav.classList.remove('is-sticky');
            main.style.marginTop = null;
        }
    };

    window.addEventListener('scroll', onScroll);
}
