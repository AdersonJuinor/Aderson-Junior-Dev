document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.getElementById('navbar');

    // 1. Função de Scroll Spy e Navbar Sticky
    function updateScroll() {
        let current = '';

        // Identifica a seção visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Ajuste para o tamanho da navbar
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Adiciona a classe 'active' ao link correto
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Adiciona um box-shadow na navbar ao rolar (efeito 'sticky' visual)
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }

    // Chama a função ao rolar a página
    window.addEventListener('scroll', updateScroll);
    // Chama a função uma vez ao carregar a página
    updateScroll(); 

    // Opcional: Animação de Scroll Suave ao clicar nos links (já é nativo do CSS 'scroll-behavior: smooth', mas garantindo o fallback)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 60, 
                behavior: 'smooth'
            });
        });
    });

});
// ... código JavaScript anterior ...

document.addEventListener('DOMContentLoaded', function() {
    // ... código de Scroll Spy e Navbar Sticky ...
    
    // NOVO: Atualiza o ano no Rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});