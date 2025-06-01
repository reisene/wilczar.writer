// script-legacy.js – fallback dla starszych przeglądarek bez wsparcia ES6 modules
// UWAGA: Wymaga dołączenia wszystkich zależnych plików JS w HTML przed tym plikiem!

(function() {
    // Sticky menu fallback
    function stickyFallback() {
        var nav = document.getElementById('header-wrapper');
        var main = document.querySelector('main');
        if (!nav || !main) return;
        var navHeight = nav.offsetHeight;
        var navOffset = nav.offsetTop;
        window.addEventListener('scroll', function() {
            if (window.scrollY >= navOffset) {
                if (!nav.classList.contains('is-sticky')) {
                    nav.classList.add('is-sticky');
                    main.style.marginTop = navHeight + 'px';
                }
            } else {
                nav.classList.remove('is-sticky');
                main.style.marginTop = null;
            }
        });
    }

    // Footer update
    function updateFooter() {
        var yearEl = document.getElementById('year');
        var sepEls = document.getElementsByClassName('separator');
        var baseYear = 2025;
        var currentYear = new Date().getFullYear();
        var isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (yearEl) {
            yearEl.textContent = currentYear > baseYear ? (baseYear + '–' + currentYear) : (baseYear + '');
        }
        for (var i = 0; i < sepEls.length; i++) {
            sepEls[i].innerHTML = isMobile ? '<br>' : ' | ';
        }
    }

    // Footer button
    function initFooterButton() {
        var toTopBtn = document.getElementById('toTopBtn');
        var topIcon = document.getElementById('topIcon');
        if (!toTopBtn || !topIcon) return;
        toTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toTopBtn.addEventListener('mouseenter', function() {
            topIcon.classList.replace('bi-arrow-up-circle', 'bi-arrow-up-circle-fill');
        });
        toTopBtn.addEventListener('mouseleave', function() {
            topIcon.classList.replace('bi-arrow-up-circle-fill', 'bi-arrow-up-circle');
        });
    }

    // Debounce
    function debounce(fn, delay) {
        var timeout;
        delay = delay || 200;
        return function() {
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() { fn.apply(null, args); }, delay);
        };
    }

    // Smooth scroll for anchor links
    function enableSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // TOC (tylko na stronach polityk)
    function initToc() {
        var toggleButton = document.getElementById('toc-toggle');
        var tocPanel = document.getElementById('toc-panel');
        var tocTimer;
        if (!toggleButton || !tocPanel) return;
        function showTOC() {
            tocPanel.classList.add('visible');
            toggleButton.classList.add('active');
            clearTimeout(tocTimer);
            tocTimer = setTimeout(hideTOC, 30000);
        }
        function hideTOC() {
            tocPanel.classList.remove('visible');
            toggleButton.classList.remove('active');
            clearTimeout(tocTimer);
        }
        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (tocPanel.classList.contains('visible')) {
                hideTOC();
            } else {
                showTOC();
            }
        });
        document.addEventListener('click', function(e) {
            if (!tocPanel.contains(e.target) && e.target !== toggleButton) {
                hideTOC();
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') hideTOC();
        });
        tocPanel.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        window.addEventListener('resize', function() {
            if (tocPanel.classList.contains('visible')) hideTOC();
        });
        window.addEventListener('scroll', function() {
            if (tocPanel.classList.contains('visible')) hideTOC();
        });
        tocPanel.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') hideTOC();
        });
        var links = tocPanel.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    hideTOC();
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        stickyFallback();
        updateFooter();
        window.addEventListener('resize', debounce(updateFooter, 300));
        initFooterButton();
        enableSmoothScroll();
        var path = window.location.pathname;
        if (path.indexOf('/policies/privacy.html') !== -1 || path.indexOf('/policies/rodo.html') !== -1) {
            try {
                initToc();
            } catch (error) {
                if (window.Sentry) {
                    Sentry.captureException(error, {
                        extra: {
                            path: path,
                            message: 'Failed to initialize Table of Contents'
                        }
                    });
                }
                if (window.console && window.console.error) {
                    console.error('Error initializing Table of Contents:', error);
                }
            }
        }
    });
})();
