document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        // Validar telefone (remover caracteres não numéricos)
        const cleanPhone = phone.replace(/\D/g, '');

        // Montar mensagem para WhatsApp
        const whatsappMessage = `Olá! Gostaria de agendar uma consulta.\n\n*Dados do Cliente:*\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n\n*Mensagem:*\n${message}`;

        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Número do WhatsApp (substitua pelo número real)
        const whatsappNumber = '557183579082'; // Formato: 55 + DDD + número

        // Criar URL do WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');

        // Opcional: Limpar formulário após envio
        contactForm.reset();

        // Opcional: Mostrar mensagem de confirmação
        showConfirmationMessage();
    });

    function showConfirmationMessage() {
        // Criar elemento de confirmação
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #25D366;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        confirmation.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>
                <span>Redirecionando para o WhatsApp...</span>
            </div>
        `;

        document.body.appendChild(confirmation);

        // Remover após 3 segundos
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/^(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }

            e.target.value = value;
        });
    }

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Menu Hamburguer
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Alternar ícone do hamburguer
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");

            // Restaurar ícone do hamburguer
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }));

        // Smooth scroll para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });