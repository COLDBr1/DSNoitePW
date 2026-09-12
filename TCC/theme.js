(function () {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('unitrigo-theme') || 'light';

    function setToggleText(isDark) {
        if (!toggle) return;

        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.classList.toggle('dark-active', isDark);

        const icon = toggle.querySelector('.theme-icon');
        const text = toggle.querySelector('.theme-text');

        if (icon) {
            icon.textContent = isDark ? '☀️' : '🌙';
        }

        if (text) {
            text.textContent = isDark ? 'Claro' : 'Escuro';
        }
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        body.classList.toggle('dark-theme', isDark);
        setToggleText(isDark);
    }

    applyTheme(savedTheme);

    if (toggle) {
        toggle.addEventListener('click', function () {
            const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            localStorage.setItem('unitrigo-theme', nextTheme);
            applyTheme(nextTheme);
        });
    }
})();
