// script.js
// Theme Management
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button state
    themeToggle.setAttribute('aria-label', `Switch to ${currentTheme} mode`);
}

// CV Download Handler
function downloadCV() {
    // Path to the uploaded CV file
    const cvUrl = 'img/Kaveesha_CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Kaveesha_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Download CV
    const downloadCVBtn = document.getElementById('downloadCV');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadCV();
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on page load

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Prevent right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Prevent drag on images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Prevent image selection
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Block all keyboard shortcuts for saving
    document.addEventListener('keydown', function(e) {
        // Block Ctrl+S, Ctrl+Shift+S, Cmd+S, F12, Ctrl+Shift+I, etc.
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        // Block F12 (developer tools)
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (developer tools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // Disable right-click specifically on profile image
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        profileImage.addEventListener('dragstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        profileImage.addEventListener('selectstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        // Prevent keyboard shortcuts for saving
        profileImage.addEventListener('keydown', function(e) {
            // Prevent Ctrl+S, Ctrl+Shift+S, etc.
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
        
        // Prevent long press on mobile devices
        profileImage.addEventListener('touchstart', function(e) {
            // Track touch duration
            const touchTimer = setTimeout(function() {
                e.preventDefault();
            }, 500);
            
            profileImage.addEventListener('touchend', function() {
                clearTimeout(touchTimer);
            });
        });
        
        // Add CSS to prevent image selection and other interactions
        profileImage.style.userSelect = 'none';
        profileImage.style.webkitUserSelect = 'none';
        profileImage.style.mozUserSelect = 'none';
        profileImage.style.msUserSelect = 'none';
        profileImage.style.webkitTouchCallout = 'none';
        profileImage.style.webkitTapHighlightColor = 'transparent';
        
        // Add overlay to prevent direct image access
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '10';
        overlay.style.cursor = 'default';
        
        // Wrap profile image in a container
        const container = profileImage.parentElement;
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        container.appendChild(overlay);
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('nameInput').value,
                email: document.getElementById('emailInput').value,
                subject: document.getElementById('subjectInput').value,
                message: document.getElementById('messageInput').value
            };

            // Here you would typically send the form data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Profile Edit Modal
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModal = document.querySelector('.close-modal');
    const profileForm = document.getElementById('profileForm');

    if (editProfileBtn && editProfileModal) {
        // Open modal
        editProfileBtn.addEventListener('click', () => {
            editProfileModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Close modal when clicking the close button
        closeModal.addEventListener('click', () => {
            editProfileModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === editProfileModal) {
                editProfileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Handle profile form submission
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('editName').value;
                const title = document.getElementById('editTitle').value;
                const email = document.getElementById('editEmail').value;
                const location = document.getElementById('editLocation').value;
                const bio = document.getElementById('editBio').value;

                // Update profile information on the page
                document.getElementById('name').textContent = name;
                document.querySelector('.hero h1').innerHTML = `Hi, I'm <span class="highlight">${name}</span>`;
                document.querySelector('.hero h2').textContent = title;
                
                // Update contact information
                const contactEmail = document.querySelector('.contact-item:first-child span');
                if (contactEmail) contactEmail.textContent = email;
                
                const contactLocation = document.querySelector('.contact-item:last-child span');
                if (contactLocation) contactLocation.textContent = location;

                // Close modal
                editProfileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Show success message
                alert('Profile updated successfully!');
            });
        }
    }

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => {
            const skillLevel = skill.querySelector('.skill-level');
            const percent = skill.getAttribute('data-percent');
            
            if (isInViewport(skill) && !skill.classList.contains('animated')) {
                skill.classList.add('animated');
                skillLevel.style.width = `${percent}%`;
            }
        });
    };

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Run skill bar animation on scroll
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const info = card.querySelector('.project-info');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 20px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 0.5) / 100;
            const y = (window.innerHeight - e.pageY * 0.5) / 100;
            
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }

    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for about image
                if (entry.target.classList.contains('about-image')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Special animation for about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const aboutImage = entry.target.querySelector('.about-image');
                    if (aboutImage && !aboutImage.classList.contains('animate')) {
                        setTimeout(() => {
                            aboutImage.classList.add('animate');
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.3 });
        
        aboutObserver.observe(aboutSection);
    }
});
