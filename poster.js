// ==========================================================================
// LearnIQ & Techis Academic Poster Logic
// Handles Project Switching, Live Editing, Scale / Print / Export
// ==========================================================================

const POSTER_DATA = {
  learniq: {
    badge: "IQ",
    title: "LearnIQ",
    subTitle: "AI Impact Tracker",
    tagline: "Your AI Companion for a Better Tomorrow.",
    abstract: "LearnIQ is an AI-powered educational platform designed to improve academic retention and performance by analysing attendance cues, predicting CGPA trajectories, detecting early drop-out risks under the 75% GTU rule, adapting personalised study roadmaps, and applying safety checks to encourage helpful and responsible learning.",
    problem: "Traditional college management portals are static and retrospective—failing to detect early attendance shortages, lacking automated grade risk alerts, and offering zero personalised remediation before final GTU examinations.",
    objectives: [
      "Real-time GTU 75% attendance shortage prediction & remediation",
      "Predictive CGPA regression & grade risk classification",
      "AI-driven dynamic personalised study roadmap generation",
      "Multi-portal transparency for Students, Teachers & Admin",
      "Safer AI communication with zero-hallucination fact verification"
    ],
    features: [
      {
        title: "Attendance Risk Tracking",
        desc: "Instant 75% shortage detector and recovery calculator.",
        icon: "calendar-check"
      },
      {
        title: "AI Response Generation",
        desc: "Generate relevant, curriculum-accurate answers.",
        icon: "bot"
      },
      {
        title: "Predictive CGPA Engine",
        desc: "Regression model forecasting final semester grade.",
        icon: "chart-line"
      },
      {
        title: "Safety Checking",
        desc: "Prevent harmful or inaccurate responses with Trust Guard.",
        icon: "shield-check"
      },
      {
        title: "Personality & Portal Selection",
        desc: "Friendly, Professional, Motivational, and Exam-focused.",
        icon: "users"
      },
      {
        title: "User-Friendly Interface",
        desc: "Intuitive glassmorphic UI with zero learning curve.",
        icon: "layout"
      }
    ],
    screenBrand: "LearnIQ",
    screenNav: ["Home", "Attendance Calc", "Performance", "AI Study Plan", "Settings", "About"],
    chatUserMsg: "I am worried about my Dynamic Programming exam and attendance shortage.",
    chatAiMsg: "It's completely normal to feel worried before an exam. You've attended 82% of lectures—comfortably above the 75% GTU threshold! For Dynamic Programming, start with Memoization before Tabulation. Take a deep breath and try to stay positive. 💙",
    chatInputPlaceholder: "Ask LearnIQ AI Tutor...",
    widget1Title: "Risk Detection",
    widget1Emoji: "😊",
    widget1Status: "Status: Safe (82.4% > 75%)",
    widget2Title: "Personality Selection",
    widget2Pills: ["Friendly", "Professional", "Motivational", "Simple"],
    widget3Title: "Safety Handling",
    widget3Status: "Safe Response",
    workflowSteps: [
      { label: "User Input", icon: "user" },
      { label: "Attendance Analysis", icon: "activity" },
      { label: "Context Analysis", icon: "file-text" },
      { label: "Personality Selection", icon: "star" },
      { label: "AI Response Generation", icon: "cpu" },
      { label: "Safety Check", icon: "shield" },
      { label: "Final Response", icon: "check-circle" }
    ],
    techList: [
      { name: "Python", class: "tech-py", label: "PY" },
      { name: "Flask", class: "tech-flask", label: "FL" },
      { name: "HTML5", class: "tech-html", label: "5" },
      { name: "CSS3", class: "tech-css", label: "3" },
      { name: "JavaScript", class: "tech-js", label: "JS" },
      { name: "MySQL", class: "tech-sql", label: "SQL" },
      { name: "Gemma 4 (LM Studio)", class: "tech-ai", label: "AI" }
    ],
    testing: [
      "Positive & Negative Emotions",
      "Ambiguous Messages & Follow-up Questions",
      "75% GTU Attendance Math Verification",
      "Empty Input & Session Fallback Handling",
      "AI Service Offline & Rate Limit Handling"
    ],
    futureScope: [
      "Improved Emotion & Stress Detection",
      "Multilingual Support (Gujarati & Hindi)",
      "Voice Interaction & Speech Synthesis",
      "Enhanced Personalisation & Adaptive Quiz Engine"
    ],
    team: "Saksham Patel<br>Ved Patel<br>Ranpariya Yug<br>Nakrani Pavan<br>Pansuriya Urvish",
    guides: "Dr. Meera Nair (Associate Professor)<br>Prof. Rajesh Varma (Assistant Professor)",
    dept: "Department of Computer Engineering"
  },

  techis: {
    badge: "T",
    title: "Techis",
    subTitle: "AI Impact Tracker",
    tagline: "Your AI Companion for a Better Tomorrow.",
    abstract: "Techis is an AI-powered chatbot designed to improve human–AI communication by analysing emotional cues in user messages, understanding conversation context, adapting response styles, generating relevant answers, and applying safety checks to encourage helpful and responsible interactions.",
    problem: "Traditional chatbots may overlook emotions, previous messages, and user communication preferences.",
    objectives: [
      "Emotion-aware interaction",
      "Contextual understanding",
      "Personalised responses",
      "Safer AI communication"
    ],
    features: [
      {
        title: "Emotion Detection",
        desc: "Identify possible emotions (happy, sad, worried, etc.).",
        icon: "heart"
      },
      {
        title: "AI Response Generation",
        desc: "Generate relevant and helpful answers.",
        icon: "bot"
      },
      {
        title: "Context Analysis",
        desc: "Understand previous messages.",
        icon: "message-square"
      },
      {
        title: "Safety Checking",
        desc: "Prevent harmful or inappropriate responses.",
        icon: "shield-check"
      },
      {
        title: "Personality Selection",
        desc: "Friendly, Professional, Motivational and Simple Styles.",
        icon: "user-check"
      },
      {
        title: "User-Friendly Interface",
        desc: "Simple and intuitive UI.",
        icon: "globe"
      }
    ],
    screenBrand: "Techis",
    screenNav: ["Home", "Chat History", "Settings", "About"],
    chatUserMsg: "I am worried about tomorrow's exam.",
    chatAiMsg: "It's completely normal to feel worried before an exam. You've prepared well, and you can do it! Take a deep breath and try to stay positive. 💙",
    chatInputPlaceholder: "Type your message...",
    widget1Title: "Emotion Detection",
    widget1Emoji: "😄",
    widget1Status: "Feeling: Worried",
    widget2Title: "Personality Selection",
    widget2Pills: ["Friendly", "Professional", "Motivational", "Simple"],
    widget3Title: "Safety Handling",
    widget3Status: "Safe Response",
    workflowSteps: [
      { label: "User Input", icon: "user" },
      { label: "Emotion Detection", icon: "smile" },
      { label: "Context Analysis", icon: "file-text" },
      { label: "Personality Selection", icon: "star" },
      { label: "AI Response Generation", icon: "bot" },
      { label: "Safety Check", icon: "shield" },
      { label: "Final Response", icon: "check-circle" }
    ],
    techList: [
      { name: "Python", class: "tech-py", label: "PY" },
      { name: "Flask", class: "tech-flask", label: "FL" },
      { name: "HTML", class: "tech-html", label: "5" },
      { name: "CSS", class: "tech-css", label: "3" },
      { name: "JavaScript", class: "tech-js", label: "JS" },
      { name: "Gemma 4 (LM Studio)", class: "tech-ai", label: "AI" }
    ],
    testing: [
      "Positive & Negative Emotions",
      "Ambiguous Messages",
      "Follow-up Questions",
      "Empty Input Validation",
      "AI Service Failure Handling"
    ],
    futureScope: [
      "Improved Emotion Detection",
      "Multilingual Support",
      "Voice Interaction",
      "Enhanced Personalisation"
    ],
    team: "Saksham Patel<br>Ved Patel<br>Ranpariya Yug<br>Nakrani Pavan<br>Pansuriya Urvish",
    guides: "Faculty Guide - Dept. of IT<br>Tapi Diploma Engineering College",
    dept: "Department of Information Technology"
  }
};

let currentProject = 'learniq';
let isEditMode = false;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderProject('learniq');
  setupEventListeners();
});

let selectedPaperSize = 'a4';

function setupEventListeners() {
  // Mode switcher tabs
  const tabLearniq = document.getElementById('tab-learniq');
  const tabTechis = document.getElementById('tab-techis');

  if (tabLearniq && tabTechis) {
    tabLearniq.addEventListener('click', () => {
      tabLearniq.classList.add('active');
      tabTechis.classList.remove('active');
      renderProject('learniq');
      showToast('Switched to LearnIQ Analytics Project');
    });

    tabTechis.addEventListener('click', () => {
      tabTechis.classList.add('active');
      tabLearniq.classList.remove('active');
      renderProject('techis');
      showToast('Switched to Techis Reference Replica');
    });
  }

  // Paper Size Tabs (A4 vs A3)
  const tabA4 = document.getElementById('tab-paper-a4');
  const tabA3 = document.getElementById('tab-paper-a3');
  if (tabA4 && tabA3) {
    tabA4.addEventListener('click', () => {
      tabA4.classList.add('active');
      tabA3.classList.remove('active');
      selectedPaperSize = 'a4';
      updatePrintPageSize('a4');
      showToast('Print format: A4 (Single Sheet 1-Page)');
    });

    tabA3.addEventListener('click', () => {
      tabA3.classList.add('active');
      tabA4.classList.remove('active');
      selectedPaperSize = 'a3';
      updatePrintPageSize('a3');
      showToast('Print format: A3 (Large Poster 1-Page)');
    });
  }

  // 1-Click Guaranteed 1-Page PDF Download
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', async () => {
      await generateOnePagePdf();
    });
  }

  // Edit Mode Toggle
  const btnEdit = document.getElementById('btn-toggle-edit');
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      isEditMode = !isEditMode;
      document.body.classList.toggle('editing', isEditMode);
      btnEdit.classList.toggle('active', isEditMode);
      btnEdit.innerHTML = isEditMode 
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Exit Edit Mode`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg> Edit Poster`;
      
      const editables = document.querySelectorAll('.editable-text');
      editables.forEach(el => {
        el.setAttribute('contenteditable', isEditMode ? 'true' : 'false');
      });

      showToast(isEditMode ? 'Edit Mode ON: Click any text on the poster to modify' : 'Edit Mode OFF: Changes preserved!');
    });
  }

  // Browser Print (Ctrl+P)
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      showToast('Opening Print Dialog... Ensure Margins: None & Background Graphics: ON', false, 3500);
      setTimeout(() => {
        window.print();
      }, 300);
    });
  }

  // Interactive Personality Pills in Poster
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('widget-pill')) {
      const parent = e.target.closest('.widget-pills-stack');
      if (parent) {
        parent.querySelectorAll('.widget-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
      }
    }
  });

  // Fit Screen / Full Width Toggle
  const btnFit = document.getElementById('btn-fit-screen');
  const canvas = document.getElementById('poster-canvas');
  if (btnFit && canvas) {
    let isFitted = false;
    btnFit.addEventListener('click', () => {
      isFitted = !isFitted;
      if (isFitted) {
        const availableWidth = window.innerWidth - 40;
        const scale = Math.min(1, availableWidth / 1180);
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transformOrigin = 'top center';
        btnFit.classList.add('active');
        btnFit.innerText = `Zoom 100%`;
      } else {
        canvas.style.transform = 'none';
        btnFit.classList.remove('active');
        btnFit.innerText = `Fit Screen`;
      }
    });
  }
}

async function generateOnePagePdf() {
  const canvas = document.getElementById('poster-canvas');
  if (!canvas) return;

  const btnLabel = document.getElementById('btn-pdf-label');
  const originalText = btnLabel ? btnLabel.innerText : 'Download 1-Page PDF';
  if (btnLabel) btnLabel.innerText = 'Creating 1-Page PDF...';

  showToast('Rendering high-resolution 1-Page PDF...', true, 0);

  try {
    const wasEditing = isEditMode;
    if (wasEditing) {
      document.body.classList.remove('editing');
    }

    // Reset zoom transformation before capturing
    const originalTransform = canvas.style.transform;
    canvas.style.transform = 'none';

    const projectName = currentProject === 'learniq' ? 'LearnIQ' : 'Techis';
    const filename = `${projectName}_Project_Poster_TDEC_${selectedPaperSize.toUpperCase()}_1Page.pdf`;

    if (window.html2pdf) {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 1200
        },
        jsPDF: {
          unit: 'mm',
          format: selectedPaperSize, // 'a4' or 'a3'
          orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all' }
      };

      await html2pdf().set(opt).from(canvas).save();
      showToast('✅ 1-Page PDF Downloaded Successfully!', false, 4000);
    } else {
      window.print();
    }

    canvas.style.transform = originalTransform;
    if (wasEditing) {
      document.body.classList.add('editing');
    }
  } catch (err) {
    console.error('PDF Export Error:', err);
    showToast('Failed to generate direct PDF. Opening browser print...', false, 3500);
    window.print();
  } finally {
    if (btnLabel) btnLabel.innerText = originalText;
  }
}

function updatePrintPageSize(size) {
  let styleEl = document.getElementById('dynamic-page-size');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-page-size';
    document.head.appendChild(styleEl);
  }
  styleEl.innerHTML = `@media print { @page { size: ${size} portrait !important; margin: 0mm !important; } }`;
}

function showToast(message, isSpinning = false, duration = 3000) {
  let toast = document.getElementById('poster-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'poster-toast';
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }

  toast.innerHTML = isSpinning 
    ? `<div class="toast-spinner"></div><span>${message}</span>`
    : `<span>${message}</span>`;
  
  toast.style.display = 'flex';
  toast.style.opacity = '1';

  if (!isSpinning && duration > 0) {
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 300);
    }, duration);
  }
}

function renderProject(key) {
  currentProject = key;
  const d = POSTER_DATA[key];
  if (!d) return;

  // Header Dept
  setText('college-dept-text', d.dept);
  setText('seal-dept-text', d.dept);

  // Title Banner
  setText('brand-letter', d.badge);
  setText('project-name', d.title);
  setText('project-tagline-sub', d.subTitle);
  setText('project-slogan', d.tagline);

  // Left Cards
  setText('abstract-text', d.abstract);
  setText('problem-text', d.problem);

  // Objectives List
  const objList = document.getElementById('objectives-list');
  if (objList) {
    objList.innerHTML = d.objectives.map(item => `
      <li class="bullet-item">
        <span class="bullet-dot"></span>
        <span class="editable-text" contenteditable="${isEditMode}">${item}</span>
      </li>
    `).join('');
  }

  // Features Grid
  const featGrid = document.getElementById('features-grid');
  if (featGrid) {
    featGrid.innerHTML = d.features.map(f => `
      <div class="feature-cell">
        <div class="feat-icon-wrap">
          ${getIconSvg(f.icon)}
        </div>
        <div>
          <div class="feat-title editable-text" contenteditable="${isEditMode}">${f.title}</div>
          <div class="feat-desc editable-text" contenteditable="${isEditMode}">${f.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // Screen UI
  setText('screen-brand-text', d.screenBrand);
  const screenNav = document.getElementById('screen-nav-list');
  if (screenNav) {
    screenNav.innerHTML = d.screenNav.map((n, idx) => `
      <div class="screen-nav-item ${idx === 0 ? 'active' : ''}">
        ${idx === 0 ? '🏠' : '📁'} ${n}
      </div>
    `).join('');
  }
  setText('chat-user-msg', d.chatUserMsg);
  setText('chat-ai-msg', d.chatAiMsg);
  const inputEl = document.getElementById('chat-input-placeholder');
  if (inputEl) inputEl.textContent = d.chatInputPlaceholder;

  // Sub Widgets
  setText('widget1-title', d.widget1Title);
  setText('widget1-emoji', d.widget1Emoji);
  setText('widget1-status', d.widget1Status);

  setText('widget2-title', d.widget2Title);
  const pillsWrap = document.getElementById('widget2-pills');
  if (pillsWrap) {
    pillsWrap.innerHTML = d.widget2Pills.map((pill, idx) => `
      <div class="widget-pill ${idx === 0 ? 'active' : ''}">
        ${idx === 0 ? '✔ ' : ''}${pill}
      </div>
    `).join('');
  }

  setText('widget3-title', d.widget3Title);
  setText('widget3-status', d.widget3Status);

  // Workflow Pipeline
  const wfWrap = document.getElementById('workflow-pipeline');
  if (wfWrap) {
    wfWrap.innerHTML = d.workflowSteps.map((step, idx) => `
      <div class="workflow-step">
        <div class="wf-icon-wrap">${getStepIcon(step.icon)}</div>
        <div class="wf-step-label editable-text" contenteditable="${isEditMode}">${step.label}</div>
      </div>
      ${idx < d.workflowSteps.length - 1 ? '<div class="workflow-arrow">➔</div>' : ''}
    `).join('');
  }

  // Tech Badges
  const techWrap = document.getElementById('tech-badges-grid');
  if (techWrap) {
    techWrap.innerHTML = d.techList.map(t => `
      <div class="tech-badge-chip">
        <span class="tech-icon-square ${t.class}">${t.label}</span>
        <span class="editable-text" contenteditable="${isEditMode}">${t.name}</span>
      </div>
    `).join('');
  }

  // Testing Checklist
  const testWrap = document.getElementById('testing-list');
  if (testWrap) {
    testWrap.innerHTML = d.testing.map(t => `
      <div class="check-item">
        <span class="check-icon">✔</span>
        <span class="editable-text" contenteditable="${isEditMode}">${t}</span>
      </div>
    `).join('');
  }

  // Future Scope Checklist
  const scopeWrap = document.getElementById('future-scope-list');
  if (scopeWrap) {
    scopeWrap.innerHTML = d.futureScope.map(s => `
      <div class="check-item">
        <span class="check-icon">✔</span>
        <span class="editable-text" contenteditable="${isEditMode}">${s}</span>
      </div>
    `).join('');
  }

  // Footer Metadata
  setHtml('footer-team-list', d.team);
  setHtml('footer-guide-list', d.guides);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function getIconSvg(iconName) {
  switch(iconName) {
    case 'calendar-check':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`;
    case 'bot':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="15" x2="8.01" y2="15"/><line x1="16" y1="15" x2="16.01" y2="15"/></svg>`;
    case 'chart-line':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`;
    case 'shield-check':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
    case 'users':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    case 'layout':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;
    case 'heart':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    case 'message-square':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
    case 'user-check':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`;
    case 'globe':
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    default:
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function getStepIcon(iconName) {
  switch(iconName) {
    case 'user':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`;
    case 'smile':
    case 'activity':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
    case 'file-text':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
    case 'star':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    case 'bot':
    case 'cpu':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
    case 'shield':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    case 'check-circle':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    default:
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}
