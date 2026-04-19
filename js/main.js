// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and times
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('fa-bars');
            navToggle.classList.add('fa-times');
        } else {
            navToggle.classList.remove('fa-times');
            navToggle.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('fa-times');
        navToggle.classList.add('fa-bars');
    });
});

// Scroll animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scrolled');
            observer.unobserve(entry.target); // Optional: only animate once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// Product Filter (Simple implementation)
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add to Cart / WhatsApp Redirection
const cartButtons = document.querySelectorAll('.btn-cart');
cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productTitle = e.target.closest('.product-card').querySelector('.product__title').innerText;
        const message = `¡Hola! Me interesa comprar: ${productTitle}. ¿Me das más información?`;
        const whatsappUrl = `https://wa.me/51931788231?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Form Submission handling with FormSubmit
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('contact-submit-btn');
        const originalBtnText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        fetch('https://formsubmit.co/ajax/fritessweet@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            btn.innerText = originalBtnText;
            btn.disabled = false;
            
            // Show Professional Modal
            const modal = document.getElementById('success-modal');
            const userMsg = document.getElementById('modal-user-msg');
            userMsg.innerText = `¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente. Te responderemos pronto a tu correo.`;
            modal.classList.add('active');
            
            contactForm.reset();
        })
        .catch(error => {
            console.log(error);
            btn.innerText = originalBtnText;
            btn.disabled = false;
            alert("Hubo un error al enviar el mensaje. Por favor intenta por WhatsApp directamente.");
        });
    });
}

// Close Modal Logic
const modalCloseBtn = document.getElementById('modal-close-btn');
if(modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('active');
    });
}

// Product Data and Routing for producto.html
const productosData = {
    'ind1': {
        title: 'Individual',
        basePrice: 5.00,
        img: 'assets/individual1.png',
        desc: '',
        badge: 'NUEVO',
        options: [
            {
                id: 'sabor',
                title: 'Elige un sabor',
                type: 'radio',
                choices: [
                    { label: 'Vainilla', price: 0 },
                    { label: 'Chocolate', price: 0 },
                    { label: 'Vainilla con chispas de chocolate', price: 0 }
                ]
            },
            {
                id: 'topping',
                title: 'Elige el topping',
                type: 'radio',
                choices: [
                    { label: 'Chocolate', price: 0 },
                    { label: 'Chocolate blanco', price: 0 },
                    { label: 'Crema de fresa', price: 0 }
                ]
            }
        ]
    },
    'ind2': {
        title: 'Arma tu combo',
        basePrice: 15.00,
        img: 'assets/armatucombo.jpeg',
        desc: '',
        badge: 'SWEET FRiTES',
        options: [
            {
                id: 'extras',
                title: 'Productos extras',
                type: 'checkbox',
                choices: [
                    { label: 'Canela con clavo 🍂', price: 3.00 },
                    { label: 'Té de frutos rojos 🍓', price: 3.50 },
                    { label: 'Té de durazno 🍑', price: 3.50 }
                ]
            },
            {
                id: 'topping_combo',
                title: 'Elige el Topping',
                type: 'radio',
                choices: [
                    { label: 'Chocolate', price: 1.50 },
                    { label: 'Chocolate blanco', price: 1.50 },
                    { label: 'Crema de fresa', price: 2.00 }
                ]
            },
            {
                id: 'jugo',
                title: 'Jugos naturales',
                type: 'radio',
                choices: [
                    { label: 'Jugo de fresa', price: 7.00 },
                    { label: 'Jugo de maracuya', price: 7.00 },
                    { label: 'Jugo de naranja', price: 5.00 }
                ]
            }
        ]
    },
    'ind3': {
        title: 'Individual 3',
        basePrice: 8.00,
        img: 'assets/individual3.png',
        desc: '',
        badge: 'SWEET FRiTES'
    },
    'com1': {
        title: 'Combo 1',
        basePrice: 5.99,
        img: 'assets/combo1.jpg',
        desc: '',
        badge: 'MÁS VENDIDO'
    },
    'com2': {
        title: 'Combo 2',
        basePrice: 10.00,
        img: 'assets/combo2.png',
        desc: '',
        badge: 'SWEET FRiTES',
        options: [
            {
                id: 'extras_com2',
                title: 'Productos extras',
                type: 'checkbox',
                choices: [
                    { label: 'Canela con clavo 🍂', price: 0 },
                    { label: 'Té de frutos rojos 🍓', price: 0 },
                    { label: 'Té de durazno 🍑', price: 0 },
                    { label: 'Anis', price: 0 },
                    { label: 'Té verde', price: 0 }
                ]
            },
            {
                id: 'topping_com2',
                title: 'Elige el topping',
                type: 'radio',
                choices: [
                    { label: 'Chocolate', price: 0 },
                    { label: 'Chocolate blanco', price: 0 },
                    { label: 'Crema de fresa', price: 0 }
                ]
            },
            {
                id: 'sabor_com2',
                title: 'Elige un sabor',
                type: 'radio',
                choices: [
                    { label: 'Vainilla', price: 0 },
                    { label: 'Chocolate', price: 0 },
                    { label: 'Vainilla con chispas de chocolate', price: 0 }
                ]
            }
        ]
    },
    'com3': {
        title: 'Combo 3',
        basePrice: 15.00,
        img: 'assets/combo3.png',
        desc: '',
        badge: 'SWEET FRiTES',
        options: [
            {
                id: 'topping_com3',
                title: 'Elige el topping',
                type: 'radio',
                choices: [
                    { label: 'Chocolate', price: 0 },
                    { label: 'Chocolate blanco', price: 0 },
                    { label: 'Crema de fresa', price: 0 }
                ]
            },
            {
                id: 'sabor_com3',
                title: 'Sabor de galleta',
                type: 'radio',
                choices: [
                    { label: 'Vainilla', price: 0 },
                    { label: 'Chocolate', price: 0 },
                    { label: 'Vainilla con chispas de chocolate', price: 0 }
                ]
            }
        ]
    }
};

// Check if we are on the producto.html page
if(window.location.pathname.includes('producto.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = productosData[productId];
    let currentTotal = 0;

    if (product) {
        currentTotal = product.basePrice;

        document.getElementById('detail-title').innerText = product.title;
        document.getElementById('detail-price').innerText = `S/ ${currentTotal.toFixed(2)}`;
        document.getElementById('detail-desc').innerText = product.desc;
        document.getElementById('detail-img').src = product.img;
        document.getElementById('detail-badge').innerText = product.badge;

        const optionsContainer = document.getElementById('detail-options');
        
        // Render options if they exist
        if(product.options && optionsContainer) {
            let optionsHTML = '';
            product.options.forEach((optGroup, groupIndex) => {
                optionsHTML += `<div class="option-group">
                    <h4 class="option-group__title">${optGroup.title}</h4>
                    <div class="option-group__choices">`;
                
                optGroup.choices.forEach((choice, choiceIndex) => {
                    const priceLabel = choice.price > 0 ? `+ S/ ${choice.price.toFixed(2)}` : '';
                    const inputType = optGroup.type; // 'radio' or 'checkbox'
                    const inputName = optGroup.id;
                    const inputId = `${inputName}-${choiceIndex}`;
                    
                    optionsHTML += `
                        <label class="option-choice" for="${inputId}">
                            <input type="${inputType}" name="${inputName}" id="${inputId}" value="${choice.label}" data-price="${choice.price}">
                            <span class="choice-details">
                                <span class="choice-name">${choice.label}</span>
                                <span class="choice-price">${priceLabel}</span>
                            </span>
                        </label>
                    `;
                });
                
                optionsHTML += `</div></div>`;
            });
            optionsContainer.innerHTML = optionsHTML;

            // Add event listeners to inputs to calculate live price
            const allInputs = optionsContainer.querySelectorAll('input');
            allInputs.forEach(input => {
                input.addEventListener('change', () => {
                    updateLivePrice();
                });
            });
        }

        const qtyInput = document.getElementById('qty');
        qtyInput.addEventListener('change', updateLivePrice);
        
        // Expose function to update via +/- buttons
        window.updateLivePriceFromButtons = function() {
            setTimeout(updateLivePrice, 50); // delay to let input value catch up
        }

        function updateLivePrice() {
            let total = product.basePrice;
            if(optionsContainer) {
                const checkedOptions = optionsContainer.querySelectorAll('input:checked');
                checkedOptions.forEach(opt => {
                    total += parseFloat(opt.getAttribute('data-price') || 0);
                });
            }
            const qty = parseInt(document.getElementById('qty').value) || 1;
            currentTotal = total * qty;
            document.getElementById('detail-price').innerText = `S/ ${currentTotal.toFixed(2)}`;
        }

        // Handle WhatsApp submission mapping
        const wpBtn = document.getElementById('whatsapp-buy-btn');
        wpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            let message = `¡Hola! Me gustaría hacer un pedido:\n\n*Producto*: ${product.title}\n`;
            
            if(optionsContainer) {
                const checkedOptions = optionsContainer.querySelectorAll('input:checked');
                if(checkedOptions.length > 0) {
                    message += `*Opciones seleccionadas*:\n`;
                    checkedOptions.forEach(opt => {
                        message += `- ${opt.value}\n`;
                    });
                }
            }
            
            const qty = parseInt(document.getElementById('qty').value) || 1;
            message += `*Cantidad*: ${qty}\n`;
            message += `*Total*: S/ ${currentTotal.toFixed(2)}\n`;
            
            const whatsappUrl = `https://wa.me/51931788231?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

    } else {
        document.getElementById('detail-title').innerText = "Producto no encontrado";
        document.getElementById('detail-desc').innerText = "Lo sentimos, el producto que buscas no existe o ha sido retirado.";
        document.getElementById('detail-price').innerText = "";
    }
}
