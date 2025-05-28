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
