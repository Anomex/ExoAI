// Create a new file for parallax effects
class ParallaxManager {
    constructor() {
        this.sections = document.querySelectorAll('.content-section');
        this.setupSections();
        this.initializeEventListeners();
        this.initializeTiltEffects();
    }

    setupSections() {
        this.sections.forEach(section => {
            // Add floating elements
            this.addFloatingElements(section);
            
            // Add fade-in class to content
            section.querySelectorAll('.text-content, .image-container').forEach(el => {
                el.classList.add('fade-in');
            });

            // Setup image parallax
            const image = section.querySelector('.image-wrapper');
            if (image) {
                this.setupImageParallax(image);
            }
        });
    }

    addFloatingElements(section) {
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.width = `${Math.random() * 100 + 50}px`;
            element.style.height = element.style.width;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            section.appendChild(element);
        }
    }

    setupImageParallax(image) {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(image, {
                duration: 0.5,
                rotationY: x * 10,
                rotationX: -y * 10,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(image, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    }

    initializeEventListeners() {
        // Scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Parallax scroll effect
        window.addEventListener('scroll', () => {
            this.sections.forEach(section => {
                const scroll = window.pageYOffset - section.offsetTop;
                const elements = section.querySelectorAll('.floating-element');
                
                elements.forEach((el, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scroll * speed;
                    gsap.set(el, {
                        y: yPos,
                        rotation: scroll * (speed * 0.2)
                    });
                });
            });
        });

        // Mouse parallax for text
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            gsap.to('.text-content h3', {
                duration: 0.5,
                x: mouseX * 50,
                y: mouseY * 50,
                ease: 'power2.out'
            });

            gsap.to('.text-content p', {
                duration: 0.5,
                x: mouseX * 30,
                y: mouseY * 30,
                ease: 'power2.out'
            });
        });
    }

    initializeTiltEffects() {
        const images = document.querySelectorAll('.image-container');
        
        images.forEach(container => {
            // Initialize vanilla-tilt with enhanced settings
            VanillaTilt.init(container, {
                max: 15, // Maximum tilt rotation (degrees)
                speed: 400, // Speed of the enter/exit transition
                scale: 1.03, // Subtle scale effect
                glare: true, // Enable glare effect
                "max-glare": 0.3, // Maximum glare opacity
                perspective: 1000,
                transition: true,
                easing: "cubic-bezier(.03,.98,.52,.99)", // Smooth easing
                gyroscope: true, // Enable device orientation detection
                gyroscopeMinAngleX: -45,
                gyroscopeMaxAngleX: 45,
                gyroscopeMinAngleY: -45,
                gyroscopeMaxAngleY: 45
            });

            // Add custom mouse movement effect
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / container.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / container.clientHeight) * 100;
                
                // Update glow effect position
                container.style.setProperty('--mouse-x', `${x}%`);
                container.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }
}

// Initialize parallax effects
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxManager();
});
