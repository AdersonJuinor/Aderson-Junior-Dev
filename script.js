document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.getElementById('navbar');

    // =======================================
    // NOVO: Animação de Entrada ao Scrollar (Repetível)
    // =======================================
    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível dispara a animação
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const animationClass = element.dataset.animation;
            const delay = element.dataset.delay;

            if (entry.isIntersecting) {
                // Elemento ENTROU na viewport: aplica a animação
                if (delay) {
                    element.style.transitionDelay = delay;
                }
                // Aplica as classes que disparam a animação
                element.classList.add('animated', animationClass);
                // A animação irá disparar. Não chamamos 'unobserve' para que ela repita.

            } else {
                // Elemento SAIU da viewport: reseta o estado para a próxima entrada
                // Remove as classes 'animated' e a classe de animação (resetando para o estado inicial/oculto)
                element.classList.remove('animated', animationClass);
                // Reseta o delay imediatamente para a próxima animação
                element.style.transitionDelay = '0s'; 
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

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