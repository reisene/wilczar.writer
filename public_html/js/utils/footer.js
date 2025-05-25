export function updateFooter() {
    const footer = document.getElementById('copyright');
    const year = new Date().getFullYear();

    if (footer) {
        const text =
            window.matchMedia('(max-width: 768px)').matches
                ? `&copy; ${year} Katarzyna Wiłczar.<br>Wszelkie prawa zastrzeżone.`
                : `&copy; ${year} Katarzyna Wiłczar. Wszelkie prawa zastrzeżone.`;
        
        footer.innerHTML = text;
    }
}
