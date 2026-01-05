// ========================================
// DOM Elements
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const skillBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');

// ========================================
// Navigation
// ========================================

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section, footer#contact');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Reveal Animations on Scroll
// ========================================
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// Skill Bars Animation
// ========================================
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', progress + '%');
        bar.classList.add('animated');
    });
};

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                animateSkillBars();
            }
        });
    }, {
        threshold: 0.3
    });

    skillsObserver.observe(skillsSection);
}

// ========================================
// Counter Animation
// ========================================
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const step = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, step);
};

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    statsObserver.observe(statsSection);
}

// ========================================
// Particle Animation (Hero Background)
// ========================================
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(240, 96, 0, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            opacity: 0;
        `;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.style.opacity = '1';
        }, 100);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 20000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }

    // Continuously create new particles
    setInterval(createParticle, 1000);

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Typing Effect for Hero (Optional)
// ========================================
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const text = heroTagline.textContent;
    heroTagline.textContent = '';
    heroTagline.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after page load animation
    setTimeout(typeWriter, 1500);
}

// ========================================
// Image Loading Effect
// ========================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function () {
        this.classList.add('loaded');
    });
});

// ========================================
// Experience CSV Loading
// ========================================

// 預設的顏色調色盤（HSL 格式便於生成對應的淺色背景）
const TAG_COLORS = [
    { hue: 20, sat: 95, light: 47 },   // 橘色
    { hue: 177, sat: 82, light: 38 },  // 青綠色
    { hue: 262, sat: 52, light: 47 },  // 紫色
    { hue: 340, sat: 82, light: 52 },  // 粉紅色
    { hue: 210, sat: 79, light: 46 },  // 藍色
    { hue: 145, sat: 63, light: 42 },  // 綠色
    { hue: 45, sat: 93, light: 47 },   // 金黃色
    { hue: 0, sat: 72, light: 51 },    // 紅色
];

async function loadExperience() {
    const unifiedList = document.querySelector('.unified-list');
    if (!unifiedList) return;

    try {
        const response = await fetch('experience.csv');
        const csvText = await response.text();

        // 解析 CSV
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');

        const experiences = [];
        for (let i = 1; i < lines.length; i++) {
            // 處理 CSV 中可能包含逗號的欄位
            const values = parseCSVLine(lines[i]);
            if (values.length >= 5) {
                experiences.push({
                    type: values[0],
                    year: values[1],
                    title: values[2],
                    venue: values[3],
                    link: values[4]
                });
            }
        }

        // 找出所有不同的類型並分配顏色
        const typeSet = new Set(experiences.map(exp => exp.type));
        const types = Array.from(typeSet);
        const typeColorMap = {};

        types.forEach((type, index) => {
            const colorIndex = index % TAG_COLORS.length;
            const color = TAG_COLORS[colorIndex];
            typeColorMap[type] = {
                background: `hsla(${color.hue}, ${color.sat}%, ${color.light}%, 0.1)`,
                text: `hsl(${color.hue}, ${color.sat}%, ${color.light}%)`
            };
        });

        // 清空現有內容
        unifiedList.innerHTML = '';

        // 渲染經歷
        experiences.forEach(exp => {
            const li = document.createElement('li');
            const colors = typeColorMap[exp.type];

            li.innerHTML = `
                <a href="${exp.link}" target="_blank">
                    <span class="tag" style="background: ${colors.background}; color: ${colors.text};">${exp.type}</span>
                    <span class="year">${exp.year}</span>
                    <span class="title">${exp.title}</span>
                    <span class="venue">${exp.venue}</span>
                </a>
            `;
            unifiedList.appendChild(li);
        });
    } catch (error) {
        console.error('載入經歷資料時發生錯誤:', error);
    }
}

// 解析 CSV 行，處理包含逗號的欄位
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}

// ========================================
// Page Load
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    loadExperience();
});
