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
// Projects Loading from repo-cache
// ========================================
async function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = ''; // Clear container

    try {
        const response = await fetch('repo-cache/projects.json');
        if (!response.ok) throw new Error('Failed to load projects list');

        const projectFolders = await response.json();

        for (const folder of projectFolders) {
            try {
                // Fetch necessary files in parallel
                const [readmeRes, metaRes, treeRes] = await Promise.all([
                    fetch(`repo-cache/${folder}/readme.html`),
                    fetch(`repo-cache/${folder}/meta.json`),
                    fetch(`repo-cache/${folder}/tree.json`)
                ]);

                // Extract data
                const readmeText = readmeRes.ok ? await readmeRes.text() : '';
                const meta = metaRes.ok ? await metaRes.json() : {};
                const tree = treeRes.ok ? await treeRes.json() : {};

                const info = extractProjectInfo(folder, readmeText, meta, tree);
                createProjectCard(info, projectsGrid);

            } catch (err) {
                console.warn(`Skipping project ${folder}`, err);
            }
        }

        // Re-trigger reveal animations for new elements
        const newReveals = projectsGrid.querySelectorAll('.reveal-up');
        newReveals.forEach(el => revealObserver.observe(el));

    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p class="error-msg">無法載入專案資料，請稍後再試。</p>';
    }
}

// Helper to extract info from raw files
function extractProjectInfo(folderName, readmeHtml, meta, tree) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(readmeHtml, 'text/html');

    // 1. Title: Use Folder Name directly
    let title = folderName.replace('gkwang4912__', '');

    // 2. Description: First Paragraph with significant text
    let description = "No description available.";
    const paragraphs = doc.querySelectorAll('p');
    for (const p of paragraphs) {
        const text = p.textContent.trim();
        if (text && text.length > 10 && !text.startsWith('http')) {
            description = text;
            if (description.length > 150) description = description.substring(0, 150) + '...';
            break;
        }
    }

    // 3. Image: Generate deterministic gradient
    const visual = generateProjectStyle(title);

    // 4. GitHub Link
    let githubLink = "#";
    if (meta.owner && meta.repo) {
        githubLink = `https://github.com/${meta.owner}/${meta.repo}`;
    }

    // 5. Tags: Infer from extensions in tree.json
    const tags = new Set();
    const keywords = {
        'py': 'Python',
        'js': 'JavaScript',
        'html': 'HTML',
        'css': 'CSS',
        'jsx': 'React',
        'ts': 'TypeScript',
        'java': 'Java',
        'cpp': 'C++',
        'c': 'C',
        'go': 'Go',
        'ipynb': 'Jupyter'
    };

    // Recursive search for extensions
    function traverse(node) {
        if (!node) return;
        if (node.name) {
            const ext = node.name.split('.').pop().toLowerCase();
            if (keywords[ext]) tags.add(keywords[ext]);
        }
        if (node.children) {
            node.children.forEach(traverse);
        }
    }
    traverse(tree);

    // Add default tags if empty
    if (tags.size === 0) tags.add('Project');

    return {
        title,
        description,
        visual,
        tags: Array.from(tags).slice(0, 3), // Limit to 3 tags
        githubLink,
        folderName
    };
}

// Generate a deterministic color/gradient based on string
function generateProjectStyle(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate two colors
    const h1 = Math.abs(hash % 360);
    const h2 = Math.abs((hash >> 3) % 360);
    const s = 65 + (Math.abs(hash) % 20); // 65-85% saturation
    const l = 20 + (Math.abs(hash >> 2) % 15); // 20-35% lightness (dark theme)

    return `linear-gradient(135deg, hsl(${h1}, ${s}%, ${l}%) 0%, hsl(${h2}, ${s}%, ${l}%) 100%)`;
}

function createProjectCard(info, container) {
    const article = document.createElement('article');
    article.className = 'project-card reveal-up';

    // Generate tags HTML
    const tagsHtml = (info.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');

    // Store folder name on the card for reference
    if (info.folderName) {
        article.setAttribute('data-folder', info.folderName);
        article.style.cursor = 'pointer';
        article.addEventListener('click', () => openProjectModal(info.folderName));
    }


    // Marquee logic: If title is long (> 15 chars approx), add marquee class.
    const isLongTitle = info.title.length > 15;
    const marqueeClass = isLongTitle ? 'marquee-active' : '';

    article.innerHTML = `
        <div class="project-thumb" style="background: ${info.visual}; height: 200px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            <!-- Marquee Title -->
            <div class="thumb-title-wrapper ${marqueeClass}">
                <span class="thumb-title">${info.title}</span>
            </div>
            
            <!-- Overlay for better text contrast/hover effect -->
            <div class="project-overlay" style="background: rgba(0,0,0,0.2);">
                <div class="project-links">
                    <button class="view-details-btn" aria-label="View Details" style="background:none;border:none;color:white;cursor:pointer;">
                        <svg viewBox="0 0 24 24" fill="none" class="view-icon" style="width:48px;height:48px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
                           <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                        </svg>
                    </button>
                    ${info.githubLink ? `
                    <a href="${info.githubLink}" target="_blank" aria-label="View on GitHub" onclick="event.stopPropagation()">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
        <div class="project-info">
            <!-- Title removed (moved to thumb) -->
            <p class="project-desc">${info.description}</p>
            <div class="project-tags">
                ${tagsHtml}
            </div>
        </div>
    `;

    container.appendChild(article);
}

// ========================================
// Modal Logic
// ========================================
const modal = document.getElementById('project-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const readmeContent = document.getElementById('readme-content');
const fileTree = document.getElementById('file-tree');

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
}

// Close modal when clicking outside content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(folderName) {
    if (!modal) return;

    // Reset content
    readmeContent.innerHTML = '<div class="loading" style="padding:40px;text-align:center;color:#666;">Loading content...</div>';
    fileTree.innerHTML = '<div class="loading" style="padding:20px;text-align:center;color:#666;">Loading structure...</div>';

    modal.style.display = 'flex';
    // Trigger reflow
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Fetch Readme
    fetch(`repo-cache/${folderName}/readme.html`)
        .then(res => {
            if (!res.ok) throw new Error('Readme not found');
            return res.text();
        })
        .then(html => {
            readmeContent.innerHTML = html;

            // Re-highlight code blocks if highlight.js is available
            if (window.hljs) {
                readmeContent.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            }

            // Render Mermaid Diagrams
            // Convert <pre><code class="language-mermaid"> to <div class="mermaid">
            const mermaidBlocks = readmeContent.querySelectorAll('pre code.language-mermaid');
            mermaidBlocks.forEach(block => {
                const pre = block.parentElement;
                const div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = block.textContent;
                pre.replaceWith(div);
            });

            // Run Mermaid
            if (window.mermaid) {
                mermaid.run({
                    nodes: readmeContent.querySelectorAll('.mermaid')
                });
            }
        })
        .catch(err => {
            readmeContent.innerHTML = '<p class="error" style="text-align:center;padding:40px;color:red;">Failed to load documentation. (readme.html not found)</p>';
            console.error(err);
        });

    // Fetch File Tree
    fetch(`repo-cache/${folderName}/tree.json`)
        .then(res => {
            if (!res.ok) throw new Error('Tree not found');
            return res.json();
        })
        .then(tree => {
            fileTree.innerHTML = '<ul>' + renderFileTree(tree) + '</ul>';
        })
        .catch(err => {
            fileTree.innerHTML = '<p class="error" style="padding:20px;color:red;">Failed to load structure.</p>';
            console.error(err);
        });
}

function closeProjectModal() {
    if (!modal) return;

    modal.classList.remove('active');
    setTimeout(() => {
        if (!modal.classList.contains('active')) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }, 300); // Wait for transition
}

function renderFileTree(node) {
    if (node.type === 'file') {
        return `<li class="file">${node.name}</li>`;
    }

    if (node.type === 'dir') {
        // If node.children is undefined or empty, handle gracefully
        const childrenHtml = (node.children && node.children.length > 0)
            ? `<ul>${node.children.map(child => renderFileTree(child)).join('')}</ul>`
            : '';

        // Don't show root folder name if it's empty string
        const displayName = node.name || 'Project Root';
        if (displayName === 'Project Root' && !node.children) return '';

        return `
            <li>
                <span class="folder">${displayName}</span>
                ${childrenHtml}
            </li>
        `;
    }
    return '';
}

// ========================================
// Page Load
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    loadExperience();
    loadProjects();
});
