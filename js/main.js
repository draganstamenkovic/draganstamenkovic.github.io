document.addEventListener('DOMContentLoaded', () => {
    // Tab Logic for Experience Section
    const tabs = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function handleTabClick(e) {
        // Deselect all
        tabs.forEach(tab => {
            tab.setAttribute('aria-selected', false);
            tab.classList.remove('active');
        });
        tabPanels.forEach(panel => {
            panel.hidden = true;
            panel.classList.remove('active');
        });

        // Select clicked
        const clickedTab = e.currentTarget;
        const panelId = clickedTab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(panelId);

        clickedTab.setAttribute('aria-selected', true);
        clickedTab.classList.add('active');
        
        targetPanel.hidden = false;
        targetPanel.classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // Scroll Reveal Logic (Simple Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-scroll-reveal="enter bottom"]');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Header hide on scroll
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Downscroll
            header.style.transform = 'translateY(-100%)';
        } else {
            // Upscroll
            header.style.transform = 'translateY(0)';
            if (scrollTop > 0) {
                 header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            } else {
                 header.style.boxShadow = 'none';
            }
        }
        lastScrollTop = scrollTop;
    });

    // Sequential fade in for Hero elements
    const heroElements = document.querySelectorAll('.fade-in-entry');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.5}s`;
    });
});

// Add keyframes for hero anim via JS or just rely on CSS globally
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`;
document.head.appendChild(styleSheet);
