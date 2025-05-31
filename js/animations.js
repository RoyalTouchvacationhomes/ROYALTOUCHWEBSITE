// ===== Advanced Animations JavaScript for The Royal Touch =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Parallax Scrolling =====
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleParallax);
    });
    
    // ===== Text Animation on Scroll =====
    const animatedTexts = document.querySelectorAll('.animate-text');
    
    function animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.classList.add('letter-animation');
            element.appendChild(span);
        });
    }
    
    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations based on data attributes
                if (entry.target.dataset.animation) {
                    entry.target.classList.add(entry.target.dataset.animation);
                }
                
                // Animate text if it has the class
                if (entry.target.classList.contains('animate-text')) {
                    animateText(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .animate-text, [data-animation]').forEach(el => {
        animationObserver.observe(el);
    });
    
    // ===== Magnetic Cursor Effect =====
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
        });
    });
    
    // ===== Smooth Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // ===== Tilt Effect on Cards =====
    const tiltElements = document.querySelectorAll('.property-card, .service-card');
    
    tiltElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ===== Ripple Effect on Buttons =====
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== Scroll Progress Bar =====
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ===== Morph Animation on Hover =====
    const morphElements = document.querySelectorAll('.morph-hover');
    
    morphElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            elem.style.borderRadius = `${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}%`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.borderRadius = '20px';
        });
    });
    
    // ===== Number Counter Animation =====
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // ===== Floating Elements =====
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((elem, index) => {
        elem.style.animationDelay = `${index * 0.5}s`;
        elem.style.animationDuration = `${3 + Math.random() * 2}s`;
    });
    
    // ===== Custom Cursor Trail =====
    const cursorTrail = [];
    const cursorTrailLength = 20;
    
    for (let i = 0; i < cursorTrailLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail-dot');
        document.body.appendChild(dot);
        cursorTrail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursorTrail() {
        let x = mouseX;
        let y = mouseY;
        
        cursorTrail.forEach((dot, index) => {
            const nextDot = cursorTrail[index + 1] || cursorTrail[0];
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.scale = (cursorTrailLength - index) / cursorTrailLength;
            
            x += (nextDot.offsetLeft - dot.offsetLeft) * 0.3;
            y += (nextDot.offsetTop - dot.offsetTop) * 0.3;
        });
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    animateCursorTrail();
    
    // ===== Particle System =====
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = duration + 's';
        
        document.querySelector('.hero')?.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
    
    // ===== Smooth Page Transitions =====
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Add transition class to body
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                    document.body.classList.remove('transitioning');
                }, 1000);
            }
        });
    });
    
    // ===== Glow Effect on Mouse =====
    const glowElements = document.querySelectorAll('.glow-on-hover');
    
    glowElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            elem.style.setProperty('--mouse-x', `${x}px`);
            elem.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // ===== Text Scramble Effect =====
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            
            this.el.innerText = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const fx = new TextScramble(heroTitle);
        
        setTimeout(() => {
            fx.setText('Experience The Royal Touch In Every Stay');
        }, 1000);
    }
    
    // ===== Performance Monitoring =====
    const perfData = {
        fps: 0,
        frames: 0,
        lastTime: performance.now()
    };
    
    function updatePerformance() {
        perfData.frames++;
        const currentTime = performance.now();
        
        if (currentTime >= perfData.lastTime + 1000) {
            perfData.fps = Math.round((perfData.frames * 1000) / (currentTime - perfData.lastTime));
            perfData.frames = 0;
            perfData.lastTime = currentTime;
            
            // Adjust animation complexity based on FPS
            if (perfData.fps < 30) {
                document.body.classList.add('reduce-animations');
            } else {
                document.body.classList.remove('reduce-animations');
            }
        }
        
        requestAnimationFrame(updatePerformance);
    }
    
    // Start performance monitoring
    updatePerformance();
    
    // ===== Add necessary CSS for animations =====
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.3s ease;
        }
        
        .cursor-trail-dot {
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
        }
        
        .letter-animation {
            display: inline-block;
            opacity: 0;
            animation: letterFadeIn 0.5s ease forwards;
        }
        
        @keyframes letterFadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
            from {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        .glow-on-hover::before {
            content: '';
            position: absolute;
            top: var(--mouse-y);
            left: var(--mouse-x);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(26, 43, 195, 0.5), transparent);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .glow-on-hover:hover::before {
            opacity: 1;
        }
        
        body.transitioning {
            opacity: 0.8;
            transform: scale(0.99);
            transition: all 0.3s ease;
        }
        
        body.reduce-animations * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    `;
    
    document.head.appendChild(style);
});