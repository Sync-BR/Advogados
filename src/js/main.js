document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       FORMULÁRIO JURÍDICO -> WHATSAPP
    ===================================================== */

    const assessmentForm = document.getElementById('assessmentForm');

    if (assessmentForm) {

        assessmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação nativa do HTML
            if (!assessmentForm.checkValidity()) {
                assessmentForm.reportValidity();
                return;
            }

            const formData = new FormData(assessmentForm);

            const nome = formData.get('nome')?.trim() || '';
            const telefone = formData.get('telefone')?.trim() || '';
            const email = formData.get('email')?.trim() || 'Não informado';
            const areaJuridica = formData.get('area_juridica') || 'Não informada';
            const descricao = formData.get('descricao')?.trim() || '';
            const urgencia = formData.get('urgencia') || 'Não informada';

            /* =====================================================
               MENSAGEM
            ===================================================== */

            const whatsappMessage =
`Olá! Gostaria de solicitar um atendimento jurídico.

*DADOS PARA CONTATO*

*Nome:* ${nome}
*Telefone/WhatsApp:* ${telefone}
*E-mail:* ${email}

*ÁREA JURÍDICA*

${areaJuridica}

*RESUMO DO CASO*

${descricao}

*URGÊNCIA OU PRAZO PRÓXIMO*

${urgencia}

Aguardo retorno para orientação sobre os próximos passos.`;

            const encodedMessage = encodeURIComponent(whatsappMessage);

            /* =====================================================
               WHATSAPP DO ESCRITÓRIO
            ===================================================== */

            const whatsappNumber = '557192832116';

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            /* =====================================================
               FEEDBACK
            ===================================================== */

            showConfirmationMessage();

            /*
             Pequeno atraso para o usuário perceber o feedback
            */
            setTimeout(() => {
                window.open(
                    whatsappURL,
                    '_blank',
                    'noopener,noreferrer'
                );
            }, 350);

            /*
             Não limpo imediatamente para evitar perda dos dados
             caso o navegador bloqueie a nova aba.
            */

            setTimeout(() => {
                assessmentForm.reset();
            }, 1500);
        });
    }


    /* =====================================================
       MÁSCARA DE TELEFONE
    ===================================================== */

    const phoneInput = document.getElementById('telefone');

    if (phoneInput) {

        phoneInput.addEventListener('input', function (e) {

            let value = e.target.value.replace(/\D/g, '');

            /*
             Limite brasileiro:
             DDD + número = 11 dígitos
            */
            value = value.substring(0, 11);

            if (value.length === 0) {
                e.target.value = '';
                return;
            }

            if (value.length <= 2) {

                value = value.replace(
                    /^(\d{0,2})/,
                    '($1'
                );

            } else if (value.length <= 6) {

                value = value.replace(
                    /^(\d{2})(\d{0,4})/,
                    '($1) $2'
                );

            } else if (value.length <= 10) {

                value = value.replace(
                    /^(\d{2})(\d{4})(\d{0,4})/,
                    '($1) $2-$3'
                );

            } else {

                value = value.replace(
                    /^(\d{2})(\d{5})(\d{0,4})/,
                    '($1) $2-$3'
                );

            }

            e.target.value = value;
        });
    }


    /* =====================================================
       FEEDBACK DE REDIRECIONAMENTO
    ===================================================== */

    function showConfirmationMessage() {

        /*
         Evita criar várias mensagens ao clicar mais de uma vez
        */
        const existing =
            document.querySelector('.whatsapp-confirmation');

        if (existing) {
            existing.remove();
        }


        const confirmation =
            document.createElement('div');

        confirmation.className =
            'whatsapp-confirmation';

        confirmation.innerHTML = `
            <div class="whatsapp-confirmation__icon">
                <i class="fa-brands fa-whatsapp"></i>
            </div>

            <div class="whatsapp-confirmation__content">
                <strong>Solicitação preparada</strong>
                <span>
                    Abrindo o WhatsApp para finalizar o envio...
                </span>
            </div>

            <button
                type="button"
                class="whatsapp-confirmation__close"
                aria-label="Fechar mensagem"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;


        document.body.appendChild(confirmation);


        const closeButton =
            confirmation.querySelector(
                '.whatsapp-confirmation__close'
            );

        closeButton?.addEventListener(
            'click',
            function () {

                confirmation.classList.add(
                    'whatsapp-confirmation--hide'
                );

                setTimeout(
                    () => confirmation.remove(),
                    250
                );
            }
        );


        setTimeout(() => {

            if (!confirmation.isConnected) {
                return;
            }

            confirmation.classList.add(
                'whatsapp-confirmation--hide'
            );


            setTimeout(
                () => confirmation.remove(),
                250
            );

        }, 4000);
    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const hamburger =
        document.querySelector('.hamburger');

    const navMenu =
        document.querySelector('.nav-menu');


    if (hamburger && navMenu) {

        hamburger.addEventListener(
            'click',
            function () {

                const isActive =
                    navMenu.classList.toggle('active');

                hamburger.classList.toggle(
                    'active',
                    isActive
                );

                hamburger.setAttribute(
                    'aria-expanded',
                    String(isActive)
                );
            }
        );


        /*
         Fecha ao clicar em um item
        */

        document
            .querySelectorAll('.nav-link')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    function () {

                        closeMenu();
                    }
                );

            });


        /*
         Fecha ao clicar fora
        */

        document.addEventListener(
            'click',
            function (e) {

                if (!navMenu.classList.contains('active')) {
                    return;
                }

                const clickedMenu =
                    navMenu.contains(e.target);

                const clickedHamburger =
                    hamburger.contains(e.target);

                if (!clickedMenu && !clickedHamburger) {
                    closeMenu();
                }

            }
        );


        /*
         Fecha com ESC
        */

        document.addEventListener(
            'keydown',
            function (e) {

                if (
                    e.key === 'Escape' &&
                    navMenu.classList.contains('active')
                ) {

                    closeMenu();
                    hamburger.focus();
                }

            }
        );


        function closeMenu() {

            navMenu.classList.remove('active');

            hamburger.classList.remove('active');

            hamburger.setAttribute(
                'aria-expanded',
                'false'
            );
        }
    }


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                'click',
                function (e) {

                    const targetId =
                        this.getAttribute('href');

                    if (
                        !targetId ||
                        targetId === '#'
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }


                    e.preventDefault();


                    const header =
                        document.querySelector('.site-header, header');

                    const headerHeight =
                        header?.offsetHeight || 80;


                    const position =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });

                }
            );

        });


    /* =====================================================
       HEADER AO ROLAR
    ===================================================== */

    const header =
        document.querySelector('.site-header, header');


    if (header) {

        function updateHeader() {

            header.classList.toggle(
                'scrolled',
                window.scrollY > 20
            );
        }


        updateHeader();

        window.addEventListener(
            'scroll',
            updateHeader,
            {
                passive: true
            }
        );
    }


    /* =====================================================
       CSS DO TOAST
    ===================================================== */

    const style =
        document.createElement('style');


    style.textContent = `

        .whatsapp-confirmation {

            position: fixed;

            top: 100px;
            right: 24px;

            z-index: 9999;

            width: min(
                390px,
                calc(100vw - 32px)
            );

            display: grid;

            grid-template-columns:
                44px
                1fr
                30px;

            align-items: center;

            gap: 13px;

            padding: 15px;

            border:
                1px solid
                rgba(196, 160, 85, 0.20);

            border-radius: 14px;

            background:
                rgba(24, 24, 27, 0.97);

            color:
                rgb(245, 245, 245);

            box-shadow:
                0 20px 50px
                rgba(0, 0, 0, 0.28);

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            animation:
                whatsappToastIn
                300ms ease;
        }


        .whatsapp-confirmation--hide {

            opacity: 0;

            transform:
                translateX(20px);

            transition:
                opacity 250ms ease,
                transform 250ms ease;
        }


        .whatsapp-confirmation__icon {

            display: flex;

            align-items: center;
            justify-content: center;

            width: 44px;
            height: 44px;

            border-radius: 12px;

            background:
                rgba(37, 211, 102, 0.14);

            color:
                rgb(37, 211, 102);

            font-size: 1.25rem;
        }


        .whatsapp-confirmation__content {

            display: flex;

            flex-direction: column;

            gap: 2px;
        }


        .whatsapp-confirmation__content strong {

            color:
                rgb(255, 255, 255);

            font-size:
                0.88rem;
        }


        .whatsapp-confirmation__content span {

            color:
                rgb(180, 180, 185);

            font-size:
                0.76rem;

            line-height:
                1.4;
        }


        .whatsapp-confirmation__close {

            width: 30px;
            height: 30px;

            display: flex;

            align-items: center;
            justify-content: center;

            border: 0;

            border-radius: 8px;

            background: transparent;

            color:
                rgb(160, 160, 165);

            cursor: pointer;

            transition:
                background-color 180ms ease,
                color 180ms ease;
        }


        .whatsapp-confirmation__close:hover {

            background:
                rgba(255, 255, 255, 0.07);

            color:
                rgb(255, 255, 255);
        }


        @keyframes whatsappToastIn {

            from {

                opacity: 0;

                transform:
                    translateX(30px);
            }

            to {

                opacity: 1;

                transform:
                    translateX(0);
            }

        }


        @media (max-width: 600px) {

            .whatsapp-confirmation {

                top: 88px;

                left: 16px;
                right: 16px;

                width: auto;
            }

        }


        @media (
            prefers-reduced-motion: reduce
        ) {

            .whatsapp-confirmation {

                animation: none;
            }

        }

    `;


    document.head.appendChild(style);

});