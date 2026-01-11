// 1. Select DOM Elements
const contentArea = document.getElementById('content-area');
const modeLabel = document.getElementById('mode-label');
const resumeBtn = document.getElementById('resume-btn');
const typeText = document.getElementById('typewriter-text');
const btnEng = document.getElementById('btn-eng');
const btnVfx = document.getElementById('btn-vfx');

const btnContact = document.getElementById('btn-contact');
const modalOverlay = document.getElementById('contact-modal');
const btnCloseContact = document.getElementById('close-contact');
const contactContent = document.getElementById('contact-content');
const cursorLight = document.getElementById('cursor-light');

// 2. Typewriter
const nameText = "ARYAN KUMAR";
let charIndex = 0;
function typeWriter() {
    if (charIndex < nameText.length) {
        if(typeText) typeText.innerHTML += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// 3. Clock & Coordinates
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();

document.addEventListener('mousemove', (e) => {
    const coordsEl = document.getElementById('cursor-pos');
    if(coordsEl) coordsEl.innerText = `X:${e.clientX.toString().padStart(3, '0')} Y:${e.clientY.toString().padStart(3, '0')}`;
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// 4. Contact Modal
function openContact() {
    if(!contactInfo) return;
    contactContent.innerHTML = `
        <div class="contact-row"><span>STATUS</span><span style="color:#fff">OPEN_FOR_WORK</span></div>
        <a href="mailto:${contactInfo.email}" class="contact-row"><span>EMAIL</span><span>${contactInfo.email}</span></a>
        <a href="${contactInfo.linkedin}" target="_blank" class="contact-row"><span>LINKEDIN</span><span>PROFILE</span></a>
        <a href="${contactInfo.github}" target="_blank" class="contact-row"><span>GITHUB</span><span>REPO</span></a>
        <div class="contact-row"><span>LOC</span><span>${contactInfo.location}</span></div>
    `;
    modalOverlay.classList.remove('hidden');
    setTimeout(() => modalOverlay.classList.add('active'), 10);
}

function closeContact() {
    modalOverlay.classList.remove('active');
    setTimeout(() => modalOverlay.classList.add('hidden'), 400);
}

// 5. Render Engineering (TIMELINE STYLE)
function renderEngineering() {
    document.body.className = 'mode-eng';
    if(modeLabel) modeLabel.innerText = "COMPUTER SCIENCE";
    if(contentArea) contentArea.innerHTML = '';
    
    if (typeof engineeringData === 'undefined') return;

    const list = document.createElement('div');
    list.className = 'timeline-container';

    engineeringData.forEach((p, index) => {
        const delay = index * 100;
        list.innerHTML += `
            <div class="log-entry animate-in" style="animation-delay: ${delay}ms">
                <div class="log-meta">
                    <span class="mono">${p.year}</span>
                    <span class="tag">${p.tag}</span>
                </div>
                <div class="log-content">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="tech-stack">${p.tech.map(t => `<span>[${t}]</span>`).join('')}</div>
                    <a href="${p.link}" class="cmd-link" target="_blank">./view_repo.sh</a>
                </div>
            </div>
        `;
    });
    contentArea.appendChild(list);
    addTiltEffect();
    if(resumeBtn) {
        resumeBtn.href = "assets/resumes/resume_engineering.pdf";
        resumeBtn.innerText = "[ DOWNLOAD :: ENG_RESUME.PDF ]";
    }
}

// 6. Render VFX
function renderVFX() {
    document.body.className = 'mode-vfx';
    if(modeLabel) modeLabel.innerText = "VISUAL :: NARRATIVE";
    if(contentArea) contentArea.innerHTML = '';

    if (typeof vfxData === 'undefined') return;

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    vfxData.forEach((p, index) => {
        const delay = index * 100;
        grid.innerHTML += `
            <div class="gallery-card animate-in" style="animation-delay: ${delay}ms; background-image: url('${p.image}')">
                <div class="card-overlay">
                    <h3>${p.title}</h3>
                    <p class="role">${p.role}</p>
                    <div class="tools">${p.tools.join(' · ')}</div>
                    <a href="${p.link}" class="play-btn" target="_blank">▶ WATCH</a>
                </div>
            </div>
        `;
    });
    contentArea.appendChild(grid);
    addTiltEffect();
    if(resumeBtn) {
        resumeBtn.href = "assets/resumes/resume_vfx.pdf";
        resumeBtn.innerText = "[ DOWNLOAD :: VFX_RESUME.PDF ]";
    }
}

// 7. Init
if(btnEng) btnEng.addEventListener('click', renderEngineering);
if(btnVfx) btnVfx.addEventListener('click', renderVFX);
if(btnContact) btnContact.addEventListener('click', openContact);
if(btnCloseContact) btnCloseContact.addEventListener('click', closeContact);
if(modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeContact(); });

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') renderEngineering();
    if (e.key.toLowerCase() === 'v') renderVFX();
    if (e.key === 'Escape') closeContact();
});

setTimeout(typeWriter, 500);
renderEngineering();

function addTiltEffect() {
    const cards = document.querySelectorAll('.gallery-card, .log-entry');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xRotation = -1 * ((y - rect.height / 2) / rect.height * 10);
            const yRotation = (x - rect.width / 2) / rect.width * 10;
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}