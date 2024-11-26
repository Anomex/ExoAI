class FeaturesManager {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.initializeCards();
    }

    initializeCards() {
        this.cards.forEach(card => {
            // Enhanced mouse move effect
            this.setupMouseEffect(card);

            // Expand button functionality
            const expandBtn = card.querySelector('.feature-expand-btn');
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleCard(card);
                });
            }

            // Initialize counters
            const numbers = card.querySelectorAll('.detail-number');
            numbers.forEach(num => {
                this.initializeCounter(num);
            });
        });
    }

    setupMouseEffect(card) {
        // Add mousemove event
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            requestAnimationFrame(() => {
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });

        // Add mouseenter event to ensure effect is visible
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });

        // Add mouseleave event to reset
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    }

    toggleCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        // Close all cards
        this.cards.forEach(c => c.classList.remove('expanded'));
        
        if (!isExpanded) {
            card.classList.add('expanded');
            this.animateNumbers(card);
        }

        // Smooth scroll if needed
        if (!isExpanded) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    initializeCounter(element) {
        const target = parseInt(element.textContent);
        element.dataset.target = target;
        element.textContent = '0';
    }

    animateNumbers(card) {
        card.querySelectorAll('.detail-number').forEach(num => {
            const target = parseInt(num.dataset.target);
            const duration = 1500;
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    num.textContent = Math.round(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    num.textContent = target;
                }
            };

            requestAnimationFrame(updateNumber);
        });
    }
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    new FeaturesManager();
});
