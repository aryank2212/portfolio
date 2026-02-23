// Data Configuration (Same data, new structure)
const portfolioData = {
    engineering: [
        {
            title: "Hierarchical Multi-Agent Framework",
            category: "AI Research",
            tech: ["LLMs", "Python", "System Design"],
            link: "https://github.com/aryank2212/A-Hierarchical-Multi-Agent-Framework-for-Sustainable-and-Autonomous-Software-Development",
            type: "eng"
        },
        {
            title: "Format Converter",
            category: "Full-Stack",
            tech: ["Node.js", "Express", "FFmpeg"],
            link: "https://github.com/aryank2212/format-converter",
            type: "eng"
        },
        {
            title: "N-Body Simulation",
            category: "Physics & C",
            tech: ["C", "Newtonian Physics"],
            link: "https://github.com/aryank2212/n-body-simulation-c",
            type: "eng"
        },
        {
            title: "Double Pendulum",
            category: "Physics & C",
            tech: ["C", "Runge-Kutta 4"],
            link: "https://github.com/aryank2212/double-pendulum-c",
            type: "eng"
        },
        {
            title: "Text Editor Core",
            category: "Data Structures",
            tech: ["C", "Gap Buffer"],
            link: "https://github.com/aryank2212/win-text-editor-core",
            type: "eng"
        }
    ],
    vfx: [
        {
            title: "Portfolio Reel",
            category: "Editor / Compositor",
            tech: ["After Effects", "Premiere Pro"],
            link: "https://drive.google.com/drive/folders/1mBeqyZXw7U6-PZ-nMQgfzfZwjknV3V_B",
            type: "vfx"
        },
        {
            title: "Empowering Tomorrow",
            category: "Documentary Edit",
            tech: ["Premiere Pro"],
            link: "https://drive.google.com/file/d/1IItSDU-MV_NThhI207Y9isYetKMR06W7/view",
            type: "vfx"
        },
        {
            title: "Combat Sim Cinematics",
            category: "Director",
            tech: ["DCS World", "Premiere Pro"],
            link: "#",
            type: "vfx"
        }
    ],
    tools: [
        {
            title: "Chaos Theory Demo",
            icon: "fa-solid fa-arrows-spin",
            desc: "Interactive double pendulum showing deterministic chaos.",
            link: "../portfolio-main/tools/pendulum.html"
        },
        {
            title: "Gravity Sandbox",
            icon: "fa-solid fa-meteor",
            desc: "N-Body gravitational simulation running in the browser.",
            link: "../portfolio-main/tools/nbody.html"
        },
        {
            title: "Finance Tracker",
            icon: "fa-solid fa-chart-pie",
            desc: "Personal budget visualization and analytics.",
            link: "#"
        },
        {
            title: "Media Converter",
            icon: "fa-solid fa-wrench",
            desc: "Self-hosted file conversion suite.",
            link: "https://github.com/aryank2212/format-converter"
        }
    ]
};

// 1. Render Projects List
function renderProjects(filter = 'all') {
    const grid = document.getElementById('project-list');
    if (!grid) return;

    grid.innerHTML = '';

    let items = [];
    if (filter === 'all') {
        items = [...portfolioData.engineering, ...portfolioData.vfx];
    } else if (filter === 'eng') {
        items = portfolioData.engineering;
    } else if (filter === 'vfx') {
        items = portfolioData.vfx;
    }

    items.forEach((item, index) => {
        const delay = index * 100;
        const techTags = item.tech.map(t => `<span class="project-tech-dot">${t}</span>`).join('<span style="color:#444;">/</span>');

        const row = document.createElement('a');
        row.href = item.link;
        row.target = '_blank';
        row.className = 'project-row reveal magnetic-wrap';
        setTimeout(() => row.classList.add('active'), 50 + delay);

        row.innerHTML = `
            <div class="project-category">${item.category}</div>
            <div class="project-name">${item.title}</div>
            <div class="project-techs">${techTags}</div>
            <div class="project-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        `;
        grid.appendChild(row);

        // Re-attach magnetic listener to new elements
        attachMagnetic(row);
    });
}

// 2. Render Tools
function renderTools() {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    portfolioData.tools.forEach((tool, index) => {
        const card = document.createElement('a');
        card.href = tool.link;
        card.target = '_blank';
        card.className = 'tool-card reveal magnetic-wrap';

        card.innerHTML = `
            <div class="tool-icon"><i class="${tool.icon}"></i></div>
            <h3 style="font-size: 1.25rem;">${tool.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">${tool.desc}</p>
        `;
        grid.appendChild(card);
        attachMagnetic(card);
    });
}

// 3. Filter Controls
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });
}

// 4. Custom Cursor / Magnetic Physics
function setupInteraction() {
    const cursor = document.getElementById('cursor-dot');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Custom cursor follower
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const renderCursor = () => {
            // Spring interpolation
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Cursor dot styles
        cursor.style.position = 'fixed';
        cursor.style.top = '-5px';
        cursor.style.left = '-5px';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'var(--text-primary)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.mixBlendMode = 'difference';
    }

    // Attach to existing magnetic wraps
    document.querySelectorAll('.magnetic-wrap').forEach(attachMagnetic);
}

function attachMagnetic(el) {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;

        // Calculate distance from center
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;

        // Apply transform based on distance (subtle magnetic pull)
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
    });
}

// 5. Scroll Reveals (IntersectionObserver)
function setupObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// 6. Init
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    renderTools();
    setupFilters();
    setupInteraction();

    setTimeout(() => {
        setupObserver();
        // Trigger hero animations explicitly just in case
        document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('active'));
    }, 100);
});
