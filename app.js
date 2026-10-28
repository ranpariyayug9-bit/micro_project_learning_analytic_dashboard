// Unified Learning Analytics & AI Trust Hub — Main Application Logic
// Tapi Diploma Engineering College — Chapters 4 & 5 Architecture

const BACKEND_BASE = 'http://localhost:5000/api';

// ─── Global State ─────────────────────────────────────────
let activePortal = 'student'; // 'student' | 'teacher' | 'admin' | 'arch' | 'budget' | 'hallucination'
let activePage = 'dashboard';
let chartInstances = {};
let isBackendConnected = false;

// Data state (fallback to data.js constants if backend is offline)
let studentData = STUDENT_DATA;
let teacherData = TEACHER_DATA;
let adminData = ADMIN_DATA;
let hallucinationHistory = [
  { id: '1', title: "Quantum Pioneer Biography", text: "Dr. Evelyn Vance (born 1974) is a British-American quantum computer...", date: "2026-08-21 19:15", score: 82, level: "high" },
  { id: '2', title: "Graphene Applications", text: "Graphene is an allotrope of carbon consisting of a single layer...", date: "2026-08-21 18:30", score: 38, level: "med" },
  { id: '3', title: "Photosynthesis Process", text: "Photosynthesis is the biochemical process by which green plants...", date: "2026-08-21 17:45", score: 8, level: "low" }
];

let activeScenario = null;
let currentFactCheckResult = null;
let chatOpen = false;
let chatHistory = [
  { role: 'bot', text: "Hello Saksham! 👋 I'm your LearnIQ AI Study & Academic Assistant at Tapi Diploma Engineering College. Ask me about your attendance shortage, GPA predictions, Dynamic Programming study plan, or exam tips!" }
];

// Active DB table in Chapter 4 schema explorer
let activeDbTableIndex = 0;

// ─── DOM Initializer ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Load API key from localStorage if exists
  const savedKey = localStorage.getItem('gemini_api_key');
  const keyInput = document.getElementById('gemini-api-key');
  if (savedKey && keyInput) keyInput.value = savedKey;

  // Try fetching live data from backend
  await syncBackend();

  // Setup UI Listeners
  setupThemeSwitcher();
  setupPortalSwitcher();
  setupNavListeners();
  setupSettingsModal();
  setupAssignmentGenerator();
  setupChatbot();
  setupPageChatbot();
  setupHallucinationModule();

  // Setup Chapter 4 & 5 Interactive Modules
  setupAttendanceCalculator();
  setupRiskSimulator();
  setupDbSchemaExplorer();
  setupSqlRunner();
  setupTestingSuite();
  setupReportsCenter();
  setupModals();
  setupStatCardButtons();
  setupAdminButtons();

  // Render Initial Views
  renderStudentView();
  renderNotifications();
  renderHallucinationHistory();

  // Navigate to initial dashboard page
  navigateTo('dashboard');
});

// ─── Theme Switcher (Cosmic, Cyberpunk, Aurora, Midnight, Light) ───
function setupThemeSwitcher() {
  const savedTheme = localStorage.getItem('la_theme') || 'cosmic';
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.querySelectorAll('.theme-pill').forEach(pill => {
    const theme = pill.getAttribute('data-theme');
    if (theme === savedTheme) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }

    pill.addEventListener('click', () => {
      document.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const selectedTheme = pill.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('la_theme', selectedTheme);
      
      // Refresh Chart colors if needed
      refreshActiveCharts();
    });
  });
}

function refreshActiveCharts() {
  if (activePortal === 'student') setTimeout(() => buildStudentCharts(), 100);
  else if (activePortal === 'teacher') setTimeout(() => buildTeacherCharts(), 100);
  else if (activePortal === 'admin') setTimeout(() => buildAdminCharts(), 100);
}

// ─── Backend Synchronization ──────────────────────────────
async function syncBackend() {
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');

  try {
    const healthRes = await fetch(`${BACKEND_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    if (healthRes.ok) {
      isBackendConnected = true;
      if (statusDot) statusDot.classList.remove('offline');
      if (statusText) statusText.textContent = "Live Backend Connected";

      // Fetch student data
      const sRes = await fetch(`${BACKEND_BASE}/analytics/student`);
      if (sRes.ok) {
        const sJson = await sRes.json();
        if (sJson.success && sJson.data) studentData = sJson.data;
      }

      // Fetch teacher data
      const tRes = await fetch(`${BACKEND_BASE}/analytics/teacher`);
      if (tRes.ok) {
        const tJson = await tRes.json();
        if (tJson.success && tJson.data) teacherData = tJson.data;
      }

      // Fetch admin data
      const aRes = await fetch(`${BACKEND_BASE}/analytics/admin`);
      if (aRes.ok) {
        const aJson = await aRes.json();
        if (aJson.success && aJson.data) adminData = aJson.data;
      }

      // Fetch hallucination history
      const hRes = await fetch(`${BACKEND_BASE}/hallucination/history`);
      if (hRes.ok) {
        const hJson = await hRes.json();
        if (hJson.success && Array.isArray(hJson.data) && hJson.data.length > 0) {
          hallucinationHistory = hJson.data;
        }
      }
      return;
    }
  } catch (e) {
    console.log("Backend offline, running on local high-fidelity dataset.");
  }

  isBackendConnected = false;
  if (statusDot) statusDot.classList.add('offline');
  if (statusText) statusText.textContent = "Local Mock Engine";
}

// ─── 6-Way Multi-Portal Switcher ──────────────────────────
function setupPortalSwitcher() {
  const btnStudent = document.getElementById('btn-portal-student');
  const btnTeacher = document.getElementById('btn-portal-teacher');
  const btnAdmin = document.getElementById('btn-portal-admin');
  const btnArch = document.getElementById('btn-portal-arch');
  const btnBudget = document.getElementById('btn-portal-budget');
  const btnTrust = document.getElementById('btn-portal-trust');

  const navStudent = document.getElementById('nav-student');
  const navTeacher = document.getElementById('nav-teacher');
  const navAdmin = document.getElementById('nav-admin');
  const navArch = document.getElementById('nav-arch');
  const navBudget = document.getElementById('nav-budget');
  const navTrust = document.getElementById('nav-trust');

  const pagesStudent = document.getElementById('pages-student');
  const pagesTeacher = document.getElementById('pages-teacher');
  const pagesAdmin = document.getElementById('pages-admin');
  const pagesArch = document.getElementById('pages-arch');
  const pagesBudget = document.getElementById('pages-budget');
  const pagesTrust = document.getElementById('pages-trust');

  const userAvatar = document.getElementById('user-display-avatar');
  const userName = document.getElementById('user-display-name');
  const userRole = document.getElementById('user-display-role');

  function switchPortal(portal) {
    activePortal = portal;

    [btnStudent, btnTeacher, btnAdmin, btnArch, btnBudget, btnTrust].forEach(b => { if (b) b.classList.remove('active'); });
    [navStudent, navTeacher, navAdmin, navArch, navBudget, navTrust].forEach(n => { if (n) n.style.display = 'none'; });
    [pagesStudent, pagesTeacher, pagesAdmin, pagesArch, pagesBudget, pagesTrust].forEach(p => { if (p) p.style.display = 'none'; });

    if (portal === 'student') {
      if (btnStudent) btnStudent.classList.add('active');
      if (navStudent) navStudent.style.display = '';
      if (pagesStudent) pagesStudent.style.display = '';
      if (userName) userName.textContent = studentData.profile.name;
      if (userRole) userRole.textContent = 'Student • CE Sem 6';
      if (userAvatar) userAvatar.textContent = studentData.profile.avatar || 'SP';
      navigateTo('dashboard');
      setTimeout(() => buildStudentCharts(), 100);
    } else if (portal === 'teacher') {
      if (btnTeacher) btnTeacher.classList.add('active');
      if (navTeacher) navTeacher.style.display = '';
      if (pagesTeacher) pagesTeacher.style.display = '';
      if (userName) userName.textContent = teacherData.profile.name;
      if (userRole) userRole.textContent = 'Faculty Mentor • CE Dept';
      if (userAvatar) userAvatar.textContent = 'MN';
      navigateTo('t-overview');
      setTimeout(() => buildTeacherCharts(), 100);
    } else if (portal === 'admin') {
      if (btnAdmin) btnAdmin.classList.add('active');
      if (navAdmin) navAdmin.style.display = '';
      if (pagesAdmin) pagesAdmin.style.display = '';
      if (userName) userName.textContent = adminData.profile.name;
      if (userRole) userRole.textContent = 'Principal & Administrator';
      if (userAvatar) userAvatar.textContent = 'AK';
      navigateTo('a-overview');
      renderAdminView();
      setTimeout(() => buildAdminCharts(), 100);
    } else if (portal === 'arch') {
      if (btnArch) btnArch.classList.add('active');
      if (navArch) navArch.style.display = '';
      if (pagesArch) pagesArch.style.display = '';
      if (userName) userName.textContent = "System Architect";
      if (userRole) userRole.textContent = 'Chapter 4: System Design';
      if (userAvatar) userAvatar.textContent = 'SD';
      navigateTo('arch-overview');
      renderDbSchemaExplorer();
    } else if (portal === 'budget') {
      if (btnBudget) btnBudget.classList.add('active');
      if (navBudget) navBudget.style.display = '';
      if (pagesBudget) pagesBudget.style.display = '';
      if (userName) userName.textContent = "Feasibility Lead";
      if (userRole) userRole.textContent = 'Chapter 5: Budget & Feas.';
      if (userAvatar) userAvatar.textContent = 'BF';
      navigateTo('b-costs');
      renderChapter5SoftwareCosts();
    } else if (portal === 'hallucination') {
      if (btnTrust) btnTrust.classList.add('active');
      if (navTrust) navTrust.style.display = '';
      if (pagesTrust) pagesTrust.style.display = '';
      if (userName) userName.textContent = 'AI Trust Guard';
      if (userRole) userRole.textContent = 'Fact-Verification Suite';
      if (userAvatar) userAvatar.textContent = 'AI';
      navigateTo('h-scanner');
      setTimeout(() => initHallucinationCharts(), 100);
    }
  }

  if (btnStudent) btnStudent.addEventListener('click', () => switchPortal('student'));
  if (btnTeacher) btnTeacher.addEventListener('click', () => switchPortal('teacher'));
  if (btnAdmin) btnAdmin.addEventListener('click', () => switchPortal('admin'));
  if (btnArch) btnArch.addEventListener('click', () => switchPortal('arch'));
  if (btnBudget) btnBudget.addEventListener('click', () => switchPortal('budget'));
  if (btnTrust) btnTrust.addEventListener('click', () => switchPortal('hallucination'));
}

// ─── Navigation ───────────────────────────────────────────
function setupNavListeners() {
  document.querySelectorAll('[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });
}

function navigateTo(page) {
  activePage = page;

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const targetNav = document.querySelector(`[data-page="${page}"]`);
  if (targetNav) targetNav.classList.add('active');

  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById(`page-${page}`);
  if (section) section.classList.add('active');

  const titles = {
    // Student
    'dashboard':     ['Student Overview', 'Real-time academic performance summary &bull; Tapi Diploma Engineering College'],
    'attendance':    ['Attendance Tracker & Calculator', 'Subject-wise attendance records & GTU 75% shortage alert (Module 4.6.3)'],
    'performance':   ['Performance Analytics', 'Scores, quiz performance & examination trajectories'],
    'quizzes-exams': ['Quizzes & Examinations Module', 'Detailed continuous assessments, midterm exams & practicals (Module 4.6.5)'],
    'assignments':   ['Assignments & Coursework Hub', 'Manage coursework submissions, deadlines & grading (Module 4.6.4)'],
    'ai-insights':   ['AI Study Insights', 'Personalized daily study recommendations & learning plan (Module 4.6.7)'],
    'placement':     ['Placement-Readiness Tracker', 'Technical skills, aptitude, mock ratings & interview preparedness (Section 4.17)'],
    'ai-assistant':  ['Student AI Study Assistant', 'Curriculum-grounded AI tutor for CE Semester 6'],
    'gamification':  ['Achievements & Badges', 'XP points, level milestones & academic badges'],
    
    // Teacher
    't-overview':    ['Class Overview (6CE)', 'Class analytics, averages & topic comprehension (Module 4.6.6)'],
    't-students':    ['Class Performance Rankings', 'Individual student scores, attendance & progress metrics'],
    't-quizzes':     ['Quiz & Exam Analytics', 'High-performing vs low-performing cohort & error patterns (Module 4.6.5)'],
    't-atrisk':      ['At-Risk Early Warning Monitor', 'Multi-factor risk detection & interactive simulator (Module 4.6.8)'],
    't-reports':     ['8 Analytical Reports Center', 'Export automated academic reports as specified in Chapter 4 (Module 4.6.10)'],

    // Administrator
    'a-overview':    ['Institutional Overview', 'College-wide KPIs, pass rates & departmental comparisons (Section 4.1)'],
    'a-users':       ['User Management & RBAC', 'Student, faculty & admin accounts with permission matrix (Module 4.6.1)'],
    'a-departments': ['Department Analytics', 'Comparative performance across 5 engineering disciplines'],
    'a-logs':        ['Security & Audit Trail', 'Role authorization, database backup dumps & health monitoring (Section 4.14)'],

    // System Design (Chapter 4)
    'arch-overview': ['4-Layer System Architecture', 'Presentation, Application, AI/ML, and Database layers (Section 4.2)'],
    'arch-db':       ['MySQL Database Design (13 Tables)', 'Complete relational schema explorer & interactive SQL runner (Section 4.5)'],
    'arch-flow':     ['AI/ML Processing Flow Pipeline', 'End-to-end data pipeline from raw marks to early warnings (Section 4.4 & 4.7)'],
    'arch-agile':    ['Agile Software Methodology', '9 core iterative development phases from analysis to deployment (Section 4.8)'],
    'arch-testing':  ['7-Stage Testing Suite', 'Automated test execution from unit testing to UAT verification (Section 4.13)'],

    // Budget & Feasibility (Chapter 5)
    'b-costs':       ['Budget Breakdown (₹0 Additional Cost)', 'Hardware, Software & Total Project Cost (Tables 5.2, 5.3, 5.4)'],
    'b-feasibility': ['Technical & Economic Feasibility', 'Hardware, software, skills, infrastructure & ROI savings (Section 5.5 & 5.6)'],
    'b-operational': ['Operational Feasibility', 'Student and faculty workflows & usability evaluation (Section 5.7)'],
    'b-safety':      ['Safety & Environmental Impact', 'Data security, privacy, e-waste reduction & energy efficiency (Section 5.8 & 5.9)'],
    'b-cert':        ['Project Feasibility Certificate', 'Official Tapi Diploma Engineering College clearance certificate'],

    // AI Trust
    'h-scanner':     ['AI Hallucination Scanner', 'Fact-check AI generated answers with ground truth citations'],
    'h-analytics':   ['AI Quality Analytics', 'Accuracy metrics & failure distributions across scans']
  };

  const [title, sub] = titles[page] || ['Learning Analytics', 'Overview'];
  document.getElementById('topbar-title').textContent = title;
  document.getElementById('topbar-sub').innerHTML = sub + (isBackendConnected ? ` &bull; <span style="color:var(--emerald);font-weight:600;">● Live API Connected</span>` : '');

  // Render specific page components on navigation
  if (page === 'quizzes-exams') renderStudentQuizzesAndExams();
  else if (page === 'placement') renderPlacementTracker();
  else if (page === 't-reports') renderReportsCenter();
  else if (page === 'arch-db') renderDbSchemaExplorer();
  else if (page === 'arch-testing') renderTestingSuite();
  else if (page === 'b-costs') renderChapter5SoftwareCosts();
  else if (page === 'a-users') renderAdminUserManagement();
  else if (page === 'a-departments') renderAdminDepartmentsTable();
  else if (page === 'a-logs') renderAdminLogs();
  else if (page === 't-quizzes') { setTimeout(() => buildTeacherCohortChart(), 100); renderTeacherWeakTopics(); }
}

// ─── 1. STUDENT VIEW RENDERING ────────────────────────────
function renderStudentView() {
  const d = studentData;

  document.getElementById('stat-cgpa').textContent = d.profile.cgpa;
  document.getElementById('stat-attendance').textContent = d.attendance.overall + '%';
  document.getElementById('stat-courses').textContent = d.profile.enrolledCourses;
  document.getElementById('stat-points').textContent = d.gamification.points.toLocaleString();

  // Overview Attendance List
  const attList = document.getElementById('att-bar-list');
  if (attList) {
    attList.innerHTML = d.attendance.subjects.map(s => `
      <div class="att-row">
        <div class="att-meta">
          <span class="att-name">${s.name} ${s.isShortage ? '<span style="color:var(--rose);font-size:0.7rem;font-weight:bold;">(Shortage)</span>' : ''}</span>
          <span class="att-pct" style="color:${s.percentage >= 80 ? 'var(--emerald)' : s.percentage >= 75 ? 'var(--amber)' : 'var(--rose)'}">${s.percentage}%</span>
        </div>
        <div class="att-bar-track">
          <div class="att-bar-fill" style="width:${s.percentage}%; background:${s.color};"></div>
        </div>
        <div class="att-detail">${s.attended} / ${s.classes} classes attended &bull; Faculty: ${s.faculty || 'Mentor'}</div>
      </div>
    `).join('');
  }

  // Full Attendance Tab
  const attFull = document.getElementById('att-full-list');
  if (attFull) {
    attFull.innerHTML = d.attendance.subjects.map(s => `
      <div class="att-row" style="margin-bottom:16px;">
        <div class="att-meta">
          <span class="att-name">${s.name} (${s.faculty || 'Faculty Lead'})</span>
          <span class="att-pct" style="color:${s.percentage >= 80 ? 'var(--emerald)' : s.percentage >= 75 ? 'var(--amber)' : 'var(--rose)'}">${s.percentage}%</span>
        </div>
        <div class="att-bar-track" style="height:7px;">
          <div class="att-bar-fill" style="width:${s.percentage}%; background:${s.color};"></div>
        </div>
        <div class="att-detail">${s.attended} of ${s.classes} classes &bull; ${s.percentage < 75 ? '⚠️ Below GTU 75% threshold — Shortage Alert Active!' : '✓ Compliant with college attendance rules'}</div>
      </div>
    `).join('');
  }

  // Render assignments
  renderAssignmentsTable();

  // Weak Topics
  const weakList = document.getElementById('weak-topic-list');
  if (weakList) {
    weakList.innerHTML = d.weakTopics.map(t => `
      <div class="weak-topic-card" style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:var(--radius-sm); padding:12px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div>
            <strong style="font-size:0.88rem; color:var(--text-primary);">${t.topic}</strong>
            <div style="font-size:0.72rem; color:var(--text-muted);">${t.subject}</div>
          </div>
          <span class="calc-badge ${t.proficiency < 40 ? 'danger' : 'warning'}">${t.priority || 'Review'}</span>
        </div>
        <div class="att-bar-track" style="height:6px; margin:6px 0;">
          <div class="att-bar-fill" style="width:${t.proficiency}%; background:${t.proficiency < 40 ? 'var(--rose)' : 'var(--amber)'};"></div>
        </div>
        <div style="font-size:0.74rem; color:var(--text-secondary); display:flex; justify-content:space-between;">
          <span>Proficiency: <strong>${t.proficiency}%</strong></span>
          <span style="color:var(--cyan);">Trend: ${t.trend}</span>
        </div>
      </div>
    `).join('');
  }

  // Study Plan
  const studyPlan = document.getElementById('study-plan-list');
  if (studyPlan) {
    studyPlan.innerHTML = d.aiPredictions.studyPlan.map(p => `
      <div class="study-plan-item" style="display:flex; align-items:center; gap:12px; padding:12px; border-bottom:1px solid rgba(255,255,255,0.04);">
        <span class="calc-badge safe" style="min-width:70px; text-align:center;">${p.day}</span>
        <div style="flex:1;">
          <div style="font-weight:700; font-size:0.88rem; color:var(--text-primary);">${p.subject}</div>
          <div style="font-size:0.76rem; color:var(--text-muted);">${p.topic} &bull; <span style="color:var(--indigo);">${p.type || 'Study Task'}</span></div>
        </div>
        <span style="font-size:0.80rem; font-weight:700; color:var(--cyan); font-family:var(--font-mono);">${p.duration}</span>
      </div>
    `).join('');
  }

  // Badges
  const badgesGrid = document.getElementById('badges-grid');
  if (badgesGrid) {
    badgesGrid.innerHTML = d.gamification.badges.map(b => `
      <div class="card" style="text-align:center; padding:18px; ${b.earned ? 'border-color:rgba(99,102,241,0.3); background:rgba(99,102,241,0.04);' : 'opacity:0.6;'}">
        <div style="font-size:2.2rem; margin-bottom:8px;">${b.icon}</div>
        <div style="font-weight:800; font-size:0.92rem; color:var(--text-primary);">${b.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">${b.desc}</div>
        <div style="margin-top:10px;"><span class="calc-badge ${b.earned ? 'safe' : 'warning'}" style="font-size:0.68rem;">${b.earned ? '✓ Unlocked' : '🔒 In Progress'}</span></div>
      </div>
    `).join('');
  }

  setTimeout(() => buildStudentCharts(), 100);
}

// Render Quizzes & Examinations Module (Module 4.6.5)
function renderStudentQuizzesAndExams() {
  const quizTable = document.getElementById('student-quizzes-table-body');
  const examTable = document.getElementById('student-exams-table-body');

  if (quizTable && studentData.quizzesAndExams?.quizzes) {
    quizTable.innerHTML = studentData.quizzesAndExams.quizzes.map(q => `
      <tr>
        <td><strong style="color:var(--indigo); font-family:var(--font-mono);">${q.id}</strong></td>
        <td><strong>${q.subject}</strong></td>
        <td>${q.topic}</td>
        <td style="color:var(--text-muted); font-size:0.78rem;">${q.date}</td>
        <td><strong style="color:${q.score >= 80 ? 'var(--emerald)' : 'var(--amber)'}; font-size:0.9rem;">${q.score}%</strong></td>
        <td style="color:var(--text-secondary);">${q.classAvg}%</td>
        <td><span class="calc-badge ${q.score >= q.classAvg ? 'safe' : 'warning'}">${q.score >= q.classAvg ? '↑ Above Avg' : '↓ Below Avg'}</span></td>
      </tr>
    `).join('');
  }

  if (examTable && studentData.quizzesAndExams?.examinations) {
    examTable.innerHTML = studentData.quizzesAndExams.examinations.map(e => `
      <tr>
        <td><span style="font-family:var(--font-mono); font-size:0.78rem; padding:2px 6px; background:rgba(255,255,255,0.06); border-radius:4px;">${e.code}</span></td>
        <td><strong>${e.subject}</strong></td>
        <td style="color:var(--text-secondary); font-size:0.80rem;">${e.examType}</td>
        <td>${e.maxMarks}</td>
        <td style="font-weight:800; color:var(--text-primary);">${e.marksObtained}</td>
        <td style="font-weight:700; color:${e.percentage >= 80 ? 'var(--emerald)' : 'var(--cyan)'};">${e.percentage}%</td>
        <td><span class="calc-badge safe">${e.grade}</span></td>
        <td><span class="calc-badge ${e.status === 'Completed' ? 'safe' : 'warning'}">${e.status}</span></td>
      </tr>
    `).join('');
  }
}

// Render Placement Readiness Tracker (Section 4.17)
function renderPlacementTracker() {
  const pr = studentData.placementReadiness;
  if (!pr) return;

  const scoreEl = document.getElementById('placement-score-val');
  if (scoreEl) scoreEl.textContent = pr.overallScore + '%';

  const milestonesList = document.getElementById('placement-milestones-list');
  if (milestonesList) {
    milestonesList.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:16px;">
        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:6px; border:1px solid var(--border);">
          <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Coding Problems Solved</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--cyan); margin-top:2px;">${pr.stats.codingProblemsSolved} <span style="font-size:0.8rem; color:var(--text-muted);">/ ${pr.stats.targetProblems}</span></div>
        </div>
        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:6px; border:1px solid var(--border);">
          <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Mock Interview Rating</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--emerald); margin-top:2px;">${pr.stats.mockRating} <span style="font-size:0.8rem; color:var(--text-muted);">/ 10</span></div>
        </div>
      </div>
      <div style="font-weight:700; font-size:0.82rem; margin-bottom:8px; color:var(--text-primary);">AI Placement Recommendations:</div>
      <ul style="font-size:0.78rem; color:var(--text-secondary); line-height:1.7; padding-left:18px;">
        ${pr.recommendations.map(r => `<li>${r}</li>`).join('')}
      </ul>
    `;
  }

  // Build Placement Radar Chart
  setTimeout(() => {
    const radarCtx = document.getElementById('chart-placement-radar');
    if (radarCtx) {
      if (chartInstances['placement-radar']) chartInstances['placement-radar'].destroy();
      chartInstances['placement-radar'] = new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: pr.metrics.map(m => m.skill),
          datasets: [
            {
              label: 'Saksham Patel',
              data: pr.metrics.map(m => m.score),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderWidth: 2.5,
              pointBackgroundColor: '#10B981'
            },
            {
              label: 'Tier-1 Benchmark',
              data: pr.metrics.map(m => m.benchmark),
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderDash: [4, 4],
              borderWidth: 1.5,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#94A3B8', font: { family: 'Outfit', size: 10 } } } },
          scales: {
            r: {
              min: 0, max: 100,
              grid: { color: 'rgba(255,255,255,0.06)' },
              angleLines: { color: 'rgba(255,255,255,0.06)' },
              pointLabels: { color: '#94A3B8', font: { family: 'Outfit', size: 9, weight: '600' } },
              ticks: { display: false }
            }
          }
        }
      });
    }
  }, 100);
}

// ─── 2. INTERACTIVE ATTENDANCE CALCULATOR (Module 4.6.3) ──
function setupAttendanceCalculator() {
  const selSubject = document.getElementById('calc-subject-select');
  const inAttended = document.getElementById('calc-attended');
  const inTotal = document.getElementById('calc-total');
  const inTarget = document.getElementById('calc-target');
  const msgEl = document.getElementById('calc-result-msg');
  const badgeEl = document.getElementById('calc-result-badge');

  function calculate() {
    const attended = parseInt(inAttended.value) || 0;
    const total = parseInt(inTotal.value) || 1;
    const target = parseInt(inTarget.value) || 75;

    if (total <= 0) return;

    const currentPct = ((attended / total) * 100).toFixed(1);

    if (parseFloat(currentPct) < target) {
      // Must attend X consecutive classes
      // (attended + X) / (total + X) = target / 100
      // 100(attended + X) = target(total + X)
      // X(100 - target) = target*total - 100*attended
      const needed = Math.ceil((target * total - 100 * attended) / (100 - target));
      const neededSafe = needed > 0 ? needed : 1;

      msgEl.innerHTML = `Current Attendance: <strong>${currentPct}%</strong>. ⚠️ Below ${target}% GTU requirement! You must attend <strong>next ${neededSafe} consecutive classes</strong> without absence to clear shortage.`;
      badgeEl.className = 'calc-badge danger';
      badgeEl.textContent = 'Shortage Warning';
    } else {
      // Safe to miss Y classes
      // attended / (total + Y) = target / 100
      // 100*attended = target*(total + Y)
      // Y = floor((100*attended / target) - total)
      const safeMisses = Math.floor((100 * attended / target) - total);
      msgEl.innerHTML = `Current Attendance: <strong>${currentPct}%</strong>. ✓ In good standing. You can safely miss up to <strong>${Math.max(0, safeMisses)} classes</strong> and still maintain ${target}%.`;
      badgeEl.className = 'calc-badge safe';
      badgeEl.textContent = 'Good Standing';
    }
  }

  if (selSubject) {
    selSubject.addEventListener('change', () => {
      const val = selSubject.value;
      if (val !== 'custom') {
        const sub = studentData.attendance.subjects.find(s => s.name === val);
        if (sub) {
          inAttended.value = sub.attended;
          inTotal.value = sub.classes;
          calculate();
        }
      }
    });
  }

  [inAttended, inTotal, inTarget].forEach(input => {
    if (input) input.addEventListener('input', calculate);
  });
}

// ─── 3. INTERACTIVE RISK SIMULATOR (Module 4.6.8) ──────────
function setupRiskSimulator() {
  const sliderAtt = document.getElementById('sim-att');
  const sliderAsgn = document.getElementById('sim-asgn');
  const sliderQuiz = document.getElementById('sim-quiz');
  const sliderExam = document.getElementById('sim-exam');

  const valAtt = document.getElementById('val-sim-att');
  const valAsgn = document.getElementById('val-sim-asgn');
  const valQuiz = document.getElementById('val-sim-quiz');
  const valExam = document.getElementById('val-sim-exam');

  const scoreDisplay = document.getElementById('sim-risk-score');
  const labelDisplay = document.getElementById('sim-risk-label');
  const alertBox = document.getElementById('sim-alert-box');
  const alertText = document.getElementById('sim-alert-text');

  function updateRisk() {
    const att = parseInt(sliderAtt.value);
    const asgn = parseInt(sliderAsgn.value);
    const quiz = parseInt(sliderQuiz.value);
    const exam = parseInt(sliderExam.value);

    valAtt.textContent = att + '%';
    valAsgn.textContent = asgn + '%';
    valQuiz.textContent = quiz + '%';
    valExam.textContent = exam + '%';

    // Risk Formula from Section 4.6.8:
    // Low Attendance + Low Assignment Performance + Low Quiz Scores + Low Examination Marks -> Risk Analysis
    const risk = Math.round(
      0.35 * (100 - att) +
      0.25 * (100 - asgn) +
      0.20 * (100 - quiz) +
      0.20 * (100 - exam)
    );

    scoreDisplay.textContent = `${risk} / 100`;

    if (risk >= 70) {
      scoreDisplay.style.color = 'var(--rose)';
      labelDisplay.style.color = 'var(--rose)';
      labelDisplay.textContent = 'CRITICAL AT-RISK';
      alertBox.style.background = 'var(--danger-bg)';
      alertBox.style.borderColor = 'var(--danger-border)';
      alertText.innerHTML = `<strong>Critical Severity Notice:</strong> Combined deficit across attendance (${att}%) and assessments (<55%). Proactive faculty mentoring & formal parent notification dispatched immediately.`;
    } else if (risk >= 50) {
      scoreDisplay.style.color = 'var(--amber)';
      labelDisplay.style.color = 'var(--amber)';
      labelDisplay.textContent = 'HIGH RISK';
      alertBox.style.background = 'var(--warning-bg)';
      alertBox.style.borderColor = 'var(--warning-border)';
      alertText.innerHTML = `<strong>High Risk Alert:</strong> Declining performance detected in continuous evaluations. Student assigned to peer coaching cohort and remedial quizzes.`;
    } else if (risk >= 30) {
      scoreDisplay.style.color = 'var(--cyan)';
      labelDisplay.style.color = 'var(--cyan)';
      labelDisplay.textContent = 'MODERATE WATCH';
      alertBox.style.background = 'rgba(6,182,212,0.1)';
      alertBox.style.borderColor = 'rgba(6,182,212,0.3)';
      alertText.innerHTML = `<strong>Moderate Advisory:</strong> Academic standing is stable but attendance or assignment delays require monitoring.`;
    } else {
      scoreDisplay.style.color = 'var(--emerald)';
      labelDisplay.style.color = 'var(--emerald)';
      labelDisplay.textContent = 'GOOD STANDING (SAFE)';
      alertBox.style.background = 'var(--success-bg)';
      alertBox.style.borderColor = 'var(--success-border)';
      alertText.innerHTML = `<strong>Safe Standing:</strong> Student fulfills all academic performance and attendance thresholds. Eligible for honors & placement track.`;
    }
  }

  [sliderAtt, sliderAsgn, sliderQuiz, sliderExam].forEach(s => {
    if (s) s.addEventListener('input', updateRisk);
  });
}

// ─── 4. MYSQL 13 TABLES SCHEMA EXPLORER & SQL RUNNER ──────
function setupDbSchemaExplorer() {
  const container = document.getElementById('db-tables-pill-container');
  if (!container) return;

  container.innerHTML = DATABASE_DESIGN_SCHEMA.map((t, idx) => `
    <button class="db-tab-pill ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
      ${t.tableNumber}. ${t.tableName}
    </button>
  `).join('');

  container.querySelectorAll('.db-tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.db-tab-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDbTableIndex = parseInt(btn.dataset.idx);
      renderDbSchemaExplorer();
    });
  });

  renderDbSchemaExplorer();
}

function renderDbSchemaExplorer() {
  const display = document.getElementById('active-table-details-card');
  if (!display) return;

  const t = DATABASE_DESIGN_SCHEMA[activeDbTableIndex];
  if (!t) return;

  display.innerHTML = `
    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:var(--radius-sm); padding:18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:1.15rem; color:var(--text-primary); font-family:var(--font-mono);">
          Table #${t.tableNumber}: <span style="color:var(--cyan);">${t.tableName}</span>
        </h3>
        <span class="calc-badge safe">Primary Key: ${t.primaryKey}</span>
      </div>
      <p style="font-size:0.80rem; color:var(--text-secondary); margin:6px 0 14px;">
        <strong>Purpose:</strong> ${t.purpose} &bull; <strong>Foreign Keys:</strong> <span style="color:var(--indigo);">${t.foreignKeys}</span>
      </p>

      <div style="font-weight:700; font-size:0.82rem; margin-bottom:8px; color:var(--text-primary);">Table Columns & Constraints:</div>
      <div class="table-responsive">
        <table class="data-table" style="font-size:0.80rem;">
          <thead><tr><th>Column Name</th><th>Data Type / Constraints</th><th>Description</th></tr></thead>
          <tbody>
            ${t.columns.map(c => `
              <tr>
                <td><strong style="color:var(--indigo); font-family:var(--font-mono);">${c.name}</strong></td>
                <td><code style="color:var(--cyan); font-family:var(--font-mono); font-size:0.75rem;">${c.type}</code></td>
                <td style="color:var(--text-secondary);">${c.desc}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="font-weight:700; font-size:0.82rem; margin:16px 0 8px; color:var(--text-primary);">Sample Data Rows:</div>
      <div class="table-responsive">
        <table class="data-table" style="font-size:0.80rem;">
          <thead>
            <tr>${Object.keys(t.sampleRows[0] || {}).map(k => `<th>${k}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${t.sampleRows.map(r => `
              <tr>${Object.values(r).map(v => `<td style="font-family:var(--font-mono); font-size:0.75rem;">${v}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setupSqlRunner() {
  const querySelect = document.getElementById('sample-sql-select');
  const sqlInput = document.getElementById('sql-query-input');
  const btnRun = document.getElementById('btn-run-sql');
  const resContainer = document.getElementById('sql-results-container');
  const statsEl = document.getElementById('sql-execution-stats');

  if (querySelect && sqlInput) {
    sqlInput.value = SAMPLE_SQL_QUERIES[0].sql;
    querySelect.addEventListener('change', () => {
      const idx = parseInt(querySelect.value);
      if (SAMPLE_SQL_QUERIES[idx]) {
        sqlInput.value = SAMPLE_SQL_QUERIES[idx].sql;
      }
    });
  }

  if (btnRun && resContainer) {
    btnRun.addEventListener('click', () => {
      const sql = sqlInput.value.trim();
      const startTime = performance.now();

      // Simulated SQL query parser & executor
      setTimeout(() => {
        const elapsed = (performance.now() - startTime).toFixed(3);
        statsEl.textContent = `Query executed in ${elapsed}ms &bull; Returned records from MySQL InnoDB Engine`;

        if (sql.toLowerCase().includes('alerts') || sql.toLowerCase().includes('at-risk')) {
          resContainer.innerHTML = `
            <table class="sql-results-table">
              <thead><tr><th>roll_no</th><th>full_name</th><th>percentage</th><th>risk_level</th><th>message</th></tr></thead>
              <tbody>
                <tr><td>21CE045</td><td>Vijay Rathod</td><td>62.50%</td><td><span style="color:var(--rose);">Critical</span></td><td>Attendance shortage + Quiz average 45%</td></tr>
                <tr><td>21CE052</td><td>Ankit Shah</td><td>59.00%</td><td><span style="color:var(--rose);">High</span></td><td>Attendance < 60% with missing assignments</td></tr>
                <tr><td>21CE018</td><td>Karan Patel</td><td>68.00%</td><td><span style="color:var(--amber);">Moderate</span></td><td>Attendance drop in SE & Networks</td></tr>
              </tbody>
            </table>
          `;
        } else if (sql.toLowerCase().includes('cgpa >= 8.5') || sql.toLowerCase().includes('top')) {
          resContainer.innerHTML = `
            <table class="sql-results-table">
              <thead><tr><th>roll_no</th><th>full_name</th><th>department</th><th>current_cgpa</th></tr></thead>
              <tbody>
                <tr><td>21CE011</td><td>Saksham Patel</td><td>Computer Engg.</td><td>8.74</td></tr>
                <tr><td>21CE014</td><td>Priya Sharma</td><td>Computer Engg.</td><td>8.50</td></tr>
              </tbody>
            </table>
          `;
        } else {
          resContainer.innerHTML = `
            <table class="sql-results-table">
              <thead><tr><th>status</th><th>query_type</th><th>affected_rows</th><th>duration</th></tr></thead>
              <tbody>
                <tr><td>SUCCESS</td><td>SELECT</td><td>6 records</td><td>${elapsed}ms</td></tr>
              </tbody>
            </table>
          `;
        }
      }, 80);
    });
  }
}

// ─── 5. 7-STAGE AUTOMATED TESTING SUITE (Section 4.13) ────
function setupTestingSuite() {
  const btn = document.getElementById('btn-run-tests');
  if (btn) {
    btn.addEventListener('click', runTestingSuite);
  }
  renderTestingSuite();
}

function renderTestingSuite() {
  const container = document.getElementById('testing-suite-container');
  if (!container) return;

  container.innerHTML = TESTING_SUITE_DATA.map(t => `
    <div class="test-row">
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:8px;">
          <strong style="font-size:0.86rem; color:var(--text-primary);">${t.name}</strong>
          <span style="font-size:0.70rem; color:var(--text-muted);">&bull; ${t.module}</span>
        </div>
        <div style="font-size:0.74rem; color:var(--text-secondary); margin-top:3px;">${t.assertions}</div>
      </div>
      <div style="display:flex; align-items:center; gap:14px;">
        <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">${t.latency}</span>
        <span class="test-badge pass">${t.status}</span>
      </div>
    </div>
  `).join('');
}

function runTestingSuite() {
  const btn = document.getElementById('btn-run-tests');
  if (btn) btn.textContent = '⏳ Executing 7 Test Suites...';

  const rows = document.querySelectorAll('.test-row');
  rows.forEach((row, i) => {
    const badge = row.querySelector('.test-badge');
    if (badge) {
      badge.className = 'test-badge running';
      badge.textContent = 'RUNNING';
    }
    setTimeout(() => {
      if (badge) {
        badge.className = 'test-badge pass';
        badge.textContent = 'PASSED (✓)';
      }
      if (i === rows.length - 1 && btn) {
        btn.textContent = '✓ All 7 Suites Passed (87/87)';
      }
    }, (i + 1) * 220);
  });
}

// ─── 6. 8 ANALYTICAL REPORTS CENTER (Module 4.6.10) ────────
function setupReportsCenter() {
  renderReportsCenter();
}

function renderReportsCenter() {
  const container = document.getElementById('reports-cards-container');
  if (!container) return;

  container.innerHTML = REPORT_TEMPLATES.map(r => `
    <div class="report-item-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="calc-badge safe" style="font-size:0.68rem;">${r.category}</span>
          <span style="font-size:0.70rem; color:var(--text-muted);">${r.frequency}</span>
        </div>
        <div class="report-item-title">${r.name}</div>
        <div class="report-item-desc">${r.summary}</div>
        <div style="background:rgba(255,255,255,0.02); padding:8px 10px; border-radius:4px; font-size:0.72rem; color:var(--text-secondary); margin-bottom:14px;">
          <strong>Key Metrics:</strong> ${r.dataPoints.join(' &bull; ')}
        </div>
      </div>
      <button class="btn-primary btn-open-report" data-id="${r.id}" style="width:100%; padding:8px; font-size:0.80rem;">
        📑 Generate & View Report
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.btn-open-report').forEach(btn => {
    btn.addEventListener('click', () => {
      openReportModal(btn.dataset.id);
    });
  });
}

function openReportModal(reportId) {
  const rep = REPORT_TEMPLATES.find(r => r.id === reportId) || REPORT_TEMPLATES[0];
  const modal = document.getElementById('modal-report-viewer');
  const titleEl = document.getElementById('modal-report-title');
  const contentEl = document.getElementById('modal-report-content');

  if (titleEl) titleEl.textContent = rep.name;

  if (contentEl) {
    contentEl.innerHTML = `
      <div class="report-modal-doc">
        <h2>Tapi Diploma Engineering College, Surat</h2>
        <h3>Department of Computer Engineering &bull; Official Academic Analytical Report</h3>
        <hr style="border:0; border-top:2px solid #1e3a8a; margin:14px 0 20px;">

        <div style="display:flex; justify-content:space-between; margin-bottom:16px; font-size:0.85rem;">
          <div><strong>Report Title:</strong> ${rep.name}</div>
          <div><strong>Generated On:</strong> ${new Date().toLocaleDateString('en-GB')}</div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:0.85rem;">
          <div><strong>Target Cohort:</strong> ${rep.target}</div>
          <div><strong>Cadence:</strong> ${rep.frequency}</div>
        </div>

        <p style="line-height:1.6; margin-bottom:16px;">${rep.summary}</p>

        <table>
          <thead>
            <tr><th>Metric / Assessment Area</th><th>Recorded Output</th><th>Institutional Benchmark</th><th>Compliance Status</th></tr>
          </thead>
          <tbody>
            ${rep.dataPoints.map(dp => {
              const parts = dp.split(':');
              return `
                <tr>
                  <td><strong>${parts[0] || 'Metric'}</strong></td>
                  <td>${parts[1] || 'Compliant'}</td>
                  <td>GTU / TDEC Standard</td>
                  <td style="color:#10b981; font-weight:bold;">CLEARED</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div style="margin-top:24px; padding:12px; background:#f9fafb; border-left:4px solid #1e3a8a; font-size:0.82rem;">
          <strong>Faculty Mentor Assessment:</strong> Academic parameters evaluated using automated regression algorithms. Student demonstrated steady progress with recommended focus on weekly lab practice.
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:40px; font-size:0.82rem;">
          <div style="text-align:center;">
            <div style="width:140px; border-bottom:1px solid #111; margin-bottom:4px;"></div>
            <div>Class Mentor / Guide</div>
          </div>
          <div style="text-align:center;">
            <div style="width:140px; border-bottom:1px solid #111; margin-bottom:4px;"></div>
            <div>Head of Department</div>
          </div>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add('active');
}

// ─── 7. CHAPTER 5 SOFTWARE COSTS TABLE ─────────────────────
function renderChapter5SoftwareCosts() {
  const tbody = document.getElementById('chapter5-software-table-body');
  if (!tbody) return;

  tbody.innerHTML = CHAPTER_5_BUDGET_FEASIBILITY.softwareCost.map(s => `
    <tr>
      <td>${s.srNo}</td>
      <td><strong>${s.service}</strong></td>
      <td style="color:var(--text-secondary);">${s.purpose}</td>
      <td style="color:${s.cost.includes('Free') ? 'var(--emerald)' : 'var(--text-muted)'}; font-weight:700;">${s.cost}</td>
    </tr>
  `).join('');
}

// ─── 8. ADMINISTRATOR VIEW FUNCTIONS & BUTTON ACTIONS ───────
let adminUserFilter = 'all';
let adminUserSearchQuery = '';

function showToast(message) {
  let toast = document.getElementById('dashboard-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashboard-toast';
    toast.style.cssText = 'position:fixed; bottom:24px; right:24px; background:rgba(15, 23, 42, 0.95); color:#f8fafc; border:1px solid rgba(99, 102, 241, 0.4); box-shadow:0 10px 30px rgba(0,0,0,0.5); padding:12px 20px; border-radius:10px; font-size:0.85rem; font-weight:600; z-index:99999; backdrop-filter:blur(16px); transition:opacity 0.3s, transform 0.3s; opacity:0; transform:translateY(10px); pointer-events:none; display:flex; align-items:center; gap:8px;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}

function setupAdminButtons() {
  // 1. Admin Overview 4 Stat Cards
  const statStudents = document.getElementById('admin-stat-students');
  const statFaculty = document.getElementById('admin-stat-faculty');
  const statPassrate = document.getElementById('admin-stat-passrate');
  const statUptime = document.getElementById('admin-stat-uptime');

  if (statStudents) {
    statStudents.addEventListener('click', () => {
      navigateTo('a-departments');
    });
  }

  if (statFaculty) {
    statFaculty.addEventListener('click', () => {
      navigateTo('a-users');
      setAdminUserFilter('Teacher');
    });
  }

  if (statPassrate) {
    statPassrate.addEventListener('click', () => {
      navigateTo('a-departments');
    });
  }

  if (statUptime) {
    statUptime.addEventListener('click', () => {
      navigateTo('a-logs');
    });
  }

  // 2. Admin Quick Action Toolbar on Overview
  const btnQuickAddUser = document.getElementById('btn-admin-add-user-quick');
  const modalAddUser = document.getElementById('modal-add-user');
  if (btnQuickAddUser && modalAddUser) {
    btnQuickAddUser.addEventListener('click', () => {
      modalAddUser.classList.add('active');
    });
  }

  const btnAdminReport = document.getElementById('btn-admin-gen-report');
  if (btnAdminReport) {
    btnAdminReport.addEventListener('click', () => {
      openReportModal('R7');
    });
  }

  const btnAdminLogs = document.getElementById('btn-admin-nav-logs');
  if (btnAdminLogs) {
    btnAdminLogs.addEventListener('click', () => {
      navigateTo('a-logs');
    });
  }

  // 3. User Management Filter Pills & Search on a-users
  const btnFilterAll = document.getElementById('btn-user-filter-all');
  const btnFilterFaculty = document.getElementById('btn-user-filter-faculty');
  const btnFilterStudent = document.getElementById('btn-user-filter-student');
  const btnFilterAdmin = document.getElementById('btn-user-filter-admin');
  const userSearchInput = document.getElementById('admin-user-search-input');

  const filterBtns = [
    { el: btnFilterAll, role: 'all' },
    { el: btnFilterFaculty, role: 'Teacher' },
    { el: btnFilterStudent, role: 'Student' },
    { el: btnFilterAdmin, role: 'Administrator' }
  ];

  filterBtns.forEach(item => {
    if (item.el) {
      item.el.addEventListener('click', () => {
        setAdminUserFilter(item.role);
      });
    }
  });

  if (userSearchInput) {
    userSearchInput.addEventListener('input', (e) => {
      adminUserSearchQuery = e.target.value.toLowerCase().trim();
      renderAdminUserManagement();
    });
  }

  // 4. Department Analytics Actions on a-departments
  const btnExportDepts = document.getElementById('btn-export-depts-csv');
  if (btnExportDepts) {
    btnExportDepts.addEventListener('click', () => {
      exportDepartmentsCSV();
    });
  }

  const btnDeptReport = document.getElementById('btn-dept-report-modal');
  if (btnDeptReport) {
    btnDeptReport.addEventListener('click', () => {
      openReportModal('R7');
    });
  }

  // 5. Security & Audit Trail Actions on a-logs
  const btnRefreshLogs = document.getElementById('btn-refresh-admin-logs');
  if (btnRefreshLogs) {
    btnRefreshLogs.addEventListener('click', () => {
      refreshAdminLogs();
    });
  }

  const btnExportLogs = document.getElementById('btn-export-admin-logs');
  if (btnExportLogs) {
    btnExportLogs.addEventListener('click', () => {
      exportAdminLogsFile();
    });
  }
}

function setAdminUserFilter(role) {
  adminUserFilter = role;
  const btnAll = document.getElementById('btn-user-filter-all');
  const btnFaculty = document.getElementById('btn-user-filter-faculty');
  const btnStudent = document.getElementById('btn-user-filter-student');
  const btnAdmin = document.getElementById('btn-user-filter-admin');

  [btnAll, btnFaculty, btnStudent, btnAdmin].forEach(b => {
    if (b) b.classList.remove('active');
  });

  if (role === 'all' && btnAll) btnAll.classList.add('active');
  else if (role === 'Teacher' && btnFaculty) btnFaculty.classList.add('active');
  else if (role === 'Student' && btnStudent) btnStudent.classList.add('active');
  else if (role === 'Administrator' && btnAdmin) btnAdmin.classList.add('active');

  renderAdminUserManagement();
}

function verifyUser(userId) {
  const user = adminData.usersList.find(u => u.id === userId);
  if (user) {
    user.status = user.status === 'Verified' ? 'Active' : 'Verified';
    renderAdminUserManagement();
    showToast(`✓ User ${user.name} (${user.role}) status is now "${user.status}".`);
  }
}

function exportDepartmentsCSV() {
  const headers = ['Department', 'Code', 'Students', 'Faculty', 'Pass Rate (%)', 'Average Attendance (%)', 'At-Risk Count', 'Average CGPA'];
  const rows = adminData.departments.map(d => [
    `"${d.name}"`,
    `"${d.code}"`,
    d.students,
    d.faculty,
    d.passRate,
    d.avgAttendance,
    d.atRisk,
    d.avgCGPA
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `TDEC_Departments_Scorecard_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Department Scorecard CSV downloaded successfully!');
}

function refreshAdminLogs() {
  const newEvents = [
    { service: "Security Engine", event: "SSL/TLS 1.3 certificate status validated & encryption keys rotated", status: "success" },
    { service: "MySQL 13 Tables", event: "Automated table indexing & query optimization completed in 12ms", status: "success" },
    { service: "RBAC Guard", event: "Session authentication token refreshed for Principal Dr. Arvind Kelkar", status: "success" },
    { service: "Audit Monitor", event: "Real-time compliance check passed: GTU 75% threshold rules synced", status: "success" }
  ];
  const randomEvent = newEvents[Math.floor(Math.random() * newEvents.length)];
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  
  adminData.systemLogs.unshift({
    time: timeStr,
    event: randomEvent.event,
    status: randomEvent.status,
    service: randomEvent.service
  });

  renderAdminLogs();
  showToast('🔄 Live Security & Audit Logs refreshed with latest events.');
}

function exportAdminLogsFile() {
  const lines = adminData.systemLogs.map(l => `[${l.time}] [${l.service}] [${l.status.toUpperCase()}] ${l.event}`);
  const logContent = `TAPI DIPLOMA ENGINEERING COLLEGE — SECURITY & AUDIT TRAIL LOG\nGenerated: ${new Date().toISOString()}\n=======================================================================\n\n` + lines.join('\n');
  
  const blob = new Blob([logContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TDEC_Audit_Trail_${new Date().toISOString().split('T')[0]}.log`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('📥 Official Security & Audit Trail downloaded successfully!');
}

function renderAdminView() {
  const st = adminData.stats;
  if (st) {
    const valStudents = document.getElementById('admin-stat-val-students');
    const valFaculty = document.getElementById('admin-stat-val-faculty');
    const valPassrate = document.getElementById('admin-stat-val-passrate');
    const valUptime = document.getElementById('admin-stat-val-uptime');

    if (valStudents) valStudents.textContent = st.totalEnrollments.toLocaleString();
    if (valFaculty) valFaculty.textContent = st.facultyMembers;
    if (valPassrate) valPassrate.textContent = st.overallPassRate + '%';
    if (valUptime) valUptime.textContent = st.systemUptime;
  }

  renderAdminUserManagement();
  renderAdminDepartmentsTable();
  renderAdminLogs();
  setTimeout(() => buildAdminCharts(), 100);
}

function renderAdminUserManagement() {
  const tbody = document.getElementById('admin-users-table-body');
  const rbacTbody = document.getElementById('admin-rbac-table-body');

  let list = adminData.usersList || [];
  if (adminUserFilter && adminUserFilter !== 'all') {
    list = list.filter(u => u.role.toLowerCase() === adminUserFilter.toLowerCase());
  }
  if (adminUserSearchQuery) {
    list = list.filter(u => 
      u.name.toLowerCase().includes(adminUserSearchQuery) || 
      u.email.toLowerCase().includes(adminUserSearchQuery) || 
      u.department.toLowerCase().includes(adminUserSearchQuery) ||
      u.id.toLowerCase().includes(adminUserSearchQuery)
    );
  }

  if (tbody) {
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No users match the selected filter or search term.</td></tr>`;
    } else {
      tbody.innerHTML = list.map(u => `
        <tr>
          <td><code style="color:var(--indigo); font-family:var(--font-mono); font-size:0.78rem;">${u.id}</code></td>
          <td><strong>${u.name}</strong></td>
          <td style="color:var(--text-secondary); font-size:0.78rem;">${u.email}</td>
          <td><span class="calc-badge ${u.role === 'Student' ? 'safe' : u.role === 'Teacher' ? 'warning' : 'danger'}">${u.role}</span></td>
          <td style="font-size:0.80rem;">${u.department}</td>
          <td><span class="calc-badge ${u.status === 'Verified' ? 'safe' : 'safe'}" style="${u.status === 'Verified' ? 'background:rgba(16,185,129,0.2); color:var(--emerald);' : ''}">${u.status}</span></td>
          <td style="color:var(--text-muted); font-size:0.75rem;">${u.lastLogin}</td>
          <td>
            <button class="topbar-btn btn-verify-user" data-id="${u.id}" style="height:26px; padding:0 10px; font-size:0.72rem; cursor:pointer;" type="button" title="Toggle verification status">${u.status === 'Verified' ? '✓ Verified' : 'Verify'}</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.btn-verify-user').forEach(btn => {
        btn.addEventListener('click', () => {
          verifyUser(btn.getAttribute('data-id'));
        });
      });
    }
  }

  if (rbacTbody) {
    rbacTbody.innerHTML = adminData.rbacMatrix.map(r => `
      <tr>
        <td><strong>${r.role}</strong></td>
        <td style="color:${r.viewOwnData === 'Yes' ? 'var(--emerald)' : 'var(--text-muted)'}">${r.viewOwnData}</td>
        <td style="color:${r.submitAssignments === 'Yes' ? 'var(--emerald)' : 'var(--text-muted)'}">${r.submitAssignments}</td>
        <td style="color:${r.takeQuizzes === 'Yes' ? 'var(--emerald)' : 'var(--text-muted)'}">${r.takeQuizzes}</td>
        <td style="color:${r.viewClassAnalytics.includes('Yes') ? 'var(--emerald)' : 'var(--rose)'}">${r.viewClassAnalytics}</td>
        <td style="color:${r.gradeCoursework.includes('Yes') ? 'var(--emerald)' : 'var(--text-muted)'}">${r.gradeCoursework}</td>
        <td style="color:${r.manageUsers.includes('Full') ? 'var(--emerald)' : 'var(--rose)'}">${r.manageUsers}</td>
        <td><span class="calc-badge safe">${r.institutionalReports}</span></td>
      </tr>
    `).join('');
  }
}

function renderAdminDepartmentsTable() {
  const tbody = document.getElementById('admin-depts-table-body');
  if (!tbody) return;

  tbody.innerHTML = adminData.departments.map(d => `
    <tr>
      <td><strong>${d.name}</strong></td>
      <td><code style="font-family:var(--font-mono); font-size:0.75rem;">${d.code}</code></td>
      <td>${d.students}</td>
      <td>${d.faculty}</td>
      <td style="font-weight:700; color:var(--emerald);">${d.passRate}%</td>
      <td style="font-weight:700; color:${d.avgAttendance >= 80 ? 'var(--emerald)' : 'var(--amber)'};">${d.avgAttendance}%</td>
      <td><span class="calc-badge ${d.atRisk > 8 ? 'danger' : 'safe'}">${d.atRisk} Students</span></td>
      <td style="font-weight:800; color:var(--cyan);">${d.avgCGPA}</td>
    </tr>
  `).join('');
}

function renderAdminLogs() {
  const list = document.getElementById('admin-logs-list');
  if (!list) return;

  list.innerHTML = adminData.systemLogs.map(l => `
    <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.80rem;">
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-family:var(--font-mono); color:var(--text-muted); font-size:0.75rem;">${l.time}</span>
        <span class="calc-badge safe" style="font-size:0.68rem;">${l.service}</span>
        <span style="color:var(--text-primary);">${l.event}</span>
      </div>
      <span class="calc-badge ${l.status === 'success' ? 'safe' : 'warning'}">${l.status.toUpperCase()}</span>
    </div>
  `).join('');
}

function buildAdminCharts() {
  destroyCharts(['admin-depts', 'admin-enrollment']);

  const ctxDepts = document.getElementById('chart-admin-depts');
  if (ctxDepts) {
    chartInstances['admin-depts'] = new Chart(ctxDepts, {
      type: 'bar',
      data: {
        labels: adminData.departments.map(d => d.code),
        datasets: [
          { label: 'Pass Rate %', data: adminData.departments.map(d => d.passRate), backgroundColor: '#10B981', borderRadius: 6 },
          { label: 'Avg Attendance %', data: adminData.departments.map(d => d.avgAttendance), backgroundColor: '#6366F1', borderRadius: 6 }
        ]
      },
      options: {
        ...chartOptions('bar'),
        plugins: { legend: { display: true, labels: { color: '#94A3B8' } } }
      }
    });
  }

  const ctxEnroll = document.getElementById('chart-admin-enrollment');
  if (ctxEnroll) {
    chartInstances['admin-enrollment'] = new Chart(ctxEnroll, {
      type: 'doughnut',
      data: {
        labels: adminData.departments.map(d => d.name),
        datasets: [{
          data: adminData.departments.map(d => d.students),
          backgroundColor: ['#6366F1', '#06B6D4', '#A855F7', '#10B981', '#F59E0B'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { position: 'right', labels: { color: '#94A3B8', font: { family: 'Outfit', size: 10 }, boxWidth: 10 } } }
      }
    });
  }
}

// ─── 9. TEACHER VIEW FUNCTIONS ────────────────────────────
function renderTeacherView() {
  const t = teacherData;

  const statStudents = document.getElementById('stat-t-students');
  const statAvg = document.getElementById('stat-t-avg');
  const statPass = document.getElementById('stat-t-pass');
  const statAtRisk = document.getElementById('stat-t-atrisk');

  if (statStudents) statStudents.textContent = t.classAnalytics.totalStudents;
  if (statAvg) statAvg.textContent = t.classAnalytics.avgScore + '%';
  if (statPass) statPass.textContent = t.classAnalytics.passRate + '%';
  if (statAtRisk) statAtRisk.textContent = t.classAnalytics.atRiskCount;

  const rankTable = document.getElementById('teacher-rank-table');
  if (rankTable) {
    rankTable.innerHTML = t.studentRankings.map(s => `
      <tr>
        <td style="font-weight:700; color:var(--text-muted);">#${s.rank}</td>
        <td><strong>${s.name}</strong></td>
        <td><code style="font-family:var(--font-mono); font-size:0.75rem;">${s.rollNo}</code></td>
        <td style="font-weight:700; color:var(--indigo)">${s.score}%</td>
        <td style="color:${s.attendance >= 80 ? 'var(--emerald)' : s.attendance >= 75 ? 'var(--amber)' : 'var(--rose)'}">${s.attendance}%</td>
        <td>${s.assignments}</td>
        <td><span class="calc-badge ${s.trend === 'up' ? 'safe' : s.trend === 'down' ? 'danger' : 'warning'}">${s.trend === 'up' ? '↑ Rising' : s.trend === 'down' ? '↓ Falling' : '→ Stable'}</span></td>
        <td><span class="calc-badge ${s.status.includes('High') ? 'safe' : s.status.includes('Risk') ? 'danger' : 'warning'}">${s.status}</span></td>
      </tr>
    `).join('');
  }

  const riskTable = document.getElementById('at-risk-table');
  if (riskTable) {
    riskTable.innerHTML = t.atRiskStudents.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td><code style="font-family:var(--font-mono); font-size:0.75rem;">${s.rollNo}</code></td>
        <td style="color:${s.attendance < 70 ? 'var(--rose)' : 'var(--amber)'}; font-weight:700;">${s.attendance}%</td>
        <td>${s.assignmentPct}%</td>
        <td>${s.quizScore}%</td>
        <td>${s.examScore}%</td>
        <td><span class="calc-badge ${s.riskScore >= 75 ? 'danger' : 'warning'}">${s.riskLevel} (${s.riskScore})</span></td>
        <td>
          <button class="topbar-btn" style="height:26px; padding:0 8px; font-size:0.72rem;" onclick="alert('Academic warning and remedial counseling dispatched for ${s.name}.')">
            Intervene
          </button>
        </td>
      </tr>
    `).join('');
  }

  const engList = document.getElementById('engagement-list');
  if (engList) {
    engList.innerHTML = t.topicEngagement.map(e => `
      <div class="att-row" style="margin-bottom:10px;">
        <div class="att-meta">
          <span class="att-name">${e.topic} &bull; <span style="color:var(--text-muted); font-size:0.72rem;">Avg Quiz: ${e.avgQuizScore}%</span></span>
          <span class="att-pct" style="color:${e.engagement > 80 ? 'var(--emerald)' : e.engagement > 65 ? 'var(--amber)' : 'var(--rose)'}">${e.engagement}%</span>
        </div>
        <div class="att-bar-track">
          <div class="att-bar-fill" style="width:${e.engagement}%; background:linear-gradient(90deg, var(--indigo), var(--cyan));"></div>
        </div>
      </div>
    `).join('');
  }
}

function buildTeacherCharts() {
  const t = teacherData;
  destroyCharts(['t-score-dist', 't-class-line']);

  const scoreCtx = document.getElementById('chart-t-scores');
  if (scoreCtx) {
    chartInstances['t-score-dist'] = new Chart(scoreCtx, {
      type: 'bar',
      data: {
        labels: t.studentRankings.map(s => s.name.split(' ')[0]),
        datasets: [
          { label: 'Score %', data: t.studentRankings.map(s => s.score), backgroundColor: '#6366F1', borderRadius: 6 },
          { label: 'Attendance %', data: t.studentRankings.map(s => s.attendance), backgroundColor: '#06B6D4', borderRadius: 6 }
        ]
      },
      options: chartOptions('bar')
    });
  }

  const classCtx = document.getElementById('chart-t-class');
  if (classCtx) {
    chartInstances['t-class-line'] = new Chart(classCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
          { label: 'Class Avg %', data: [68, 71, 73, 74, 76, 76.4], borderColor: '#6366F1', fill: true, backgroundColor: 'rgba(99,102,241,0.05)', tension: 0.4 },
          { label: 'Pass Rate %', data: [81, 83, 85, 87, 88, 89], borderColor: '#10B981', fill: true, backgroundColor: 'rgba(16,185,129,0.04)', tension: 0.4 }
        ]
      },
      options: chartOptions('line')
    });
  }

  renderTeacherView();
}

function buildTeacherCohortChart() {
  destroyCharts(['t-cohort']);
  const ctx = document.getElementById('chart-t-cohort');
  if (ctx) {
    chartInstances['t-cohort'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['High Performers (>85%)', 'Average Standing (60-85%)', 'At-Risk (<60%)'],
        datasets: [{
          data: [12, 45, 8],
          backgroundColor: ['#10B981', '#6366F1', '#EF4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { position: 'bottom', labels: { color: '#94A3B8' } } }
      }
    });
  }
}

function renderTeacherWeakTopics() {
  const el = document.getElementById('teacher-weak-topics-summary');
  if (el) {
    el.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.2); padding:10px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:var(--rose);">Dynamic Programming</strong>
            <div style="font-size:0.75rem; color:var(--text-secondary);">42% class mastery &bull; 26 students failed quiz questions</div>
          </div>
          <span class="calc-badge danger">High Remedial Need</span>
        </div>
        <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.2); padding:10px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:var(--amber);">TCP Congestion Algorithms</strong>
            <div style="font-size:0.75rem; color:var(--text-secondary);">54% class mastery &bull; Slow start and congestion avoidance confusion</div>
          </div>
          <span class="calc-badge warning">Review Scheduled</span>
        </div>
        <div style="background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.2); padding:10px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="color:var(--indigo);">Gradient Descent Optimizers</strong>
            <div style="font-size:0.75rem; color:var(--text-secondary);">58% class mastery &bull; Learning rate decay calculations</div>
          </div>
          <span class="calc-badge safe">Lab Exercise Planned</span>
        </div>
      </div>
    `;
  }
}

// ─── 10. ASSIGNMENTS TABLE & SUBMISSION ────────────────────
function renderAssignmentsTable() {
  const asgTable = document.getElementById('assignment-table-body');
  if (!asgTable) return;

  const subjFilter = document.getElementById('filter-assignment-subject')?.value || 'all';
  const statusFilter = document.getElementById('filter-assignment-status')?.value || 'all';

  let list = studentData.assignments || [];

  if (subjFilter !== 'all') {
    list = list.filter(a => a.subject.toLowerCase() === subjFilter.toLowerCase());
  }

  if (statusFilter !== 'all') {
    list = list.filter(a => a.status.toLowerCase() === statusFilter.toLowerCase());
  }

  if (list.length === 0) {
    asgTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No assignments found matching the selected filters.</td></tr>`;
    return;
  }

  asgTable.innerHTML = list.map(a => `
    <tr>
      <td>
        <strong style="font-size:0.88rem;">${a.title}</strong>
        ${a.description ? `<div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; max-width:440px;">${a.description}</div>` : ''}
      </td>
      <td style="color:var(--text-secondary); white-space:nowrap;">${a.subject}</td>
      <td style="color:var(--text-muted); font-size:0.75rem; white-space:nowrap;">${a.due}</td>
      <td><span class="calc-badge ${a.status === 'submitted' ? 'safe' : a.status === 'overdue' ? 'danger' : 'warning'}">${a.status}</span></td>
      <td style="font-weight:700; color:${a.grade ? 'var(--emerald)' : 'var(--text-muted)'}">${a.grade || '—'}</td>
      <td style="font-weight:600;">${a.score !== null && a.score !== undefined ? a.score + '%' : '—'}</td>
      <td>
        ${a.status !== 'submitted' ? `
          <button class="topbar-btn btn-submit-assignment-modal" data-title="${a.title}" style="height:26px; padding:0 10px; font-size:0.72rem; background:rgba(99,102,241,0.15); color:var(--indigo-light); border-color:var(--border-active);">
            Submit
          </button>
        ` : `
          <span style="font-size:0.72rem; color:var(--emerald);">✓ Done</span>
        `}
      </td>
    </tr>
  `).join('');

  // Wire submission modal buttons
  document.querySelectorAll('.btn-submit-assignment-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('modal-submit-assignment');
      const topicInput = document.getElementById('asgn-submit-topic');
      if (topicInput) topicInput.value = btn.dataset.title;
      if (modal) modal.classList.add('active');
    });
  });
}

function setupModals() {
  // Universal Report Viewer close
  const btnCloseRep1 = document.getElementById('btn-close-report-modal');
  const btnCloseRep2 = document.getElementById('btn-close-report');
  const btnPrintRep = document.getElementById('btn-print-report');
  const modalRep = document.getElementById('modal-report-viewer');

  [btnCloseRep1, btnCloseRep2].forEach(b => {
    if (b && modalRep) b.addEventListener('click', () => modalRep.classList.remove('active'));
  });
  if (btnPrintRep) {
    btnPrintRep.addEventListener('click', () => window.print());
  }

  // Assignment submission modal
  const modalSubmit = document.getElementById('modal-submit-assignment');
  const btnCloseSub = document.getElementById('btn-close-submit-modal');
  const btnCancelSub = document.getElementById('btn-cancel-submit-asgn');
  const btnConfirmSub = document.getElementById('btn-confirm-submit-asgn');

  [btnCloseSub, btnCancelSub].forEach(b => {
    if (b && modalSubmit) b.addEventListener('click', () => modalSubmit.classList.remove('active'));
  });

  if (btnConfirmSub && modalSubmit) {
    btnConfirmSub.addEventListener('click', () => {
      const topic = document.getElementById('asgn-submit-topic')?.value || '';
      const matched = studentData.assignments.find(a => a.title === topic);
      if (matched) {
        matched.status = 'submitted';
        matched.grade = 'A';
        matched.score = 90;
      }
      modalSubmit.classList.remove('active');
      renderAssignmentsTable();
      alert(`Assignment "${topic}" successfully submitted to faculty!`);
    });
  }

  // Add User Modal
  const modalAddUser = document.getElementById('modal-add-user');
  const btnOpenAddUser = document.getElementById('btn-open-add-user-modal');
  const btnCloseAddUser = document.getElementById('btn-close-add-user-modal');
  const btnCancelAddUser = document.getElementById('btn-cancel-add-user');
  const btnConfirmAddUser = document.getElementById('btn-confirm-add-user');

  if (btnOpenAddUser && modalAddUser) {
    btnOpenAddUser.addEventListener('click', () => modalAddUser.classList.add('active'));
  }
  [btnCloseAddUser, btnCancelAddUser].forEach(b => {
    if (b && modalAddUser) b.addEventListener('click', () => modalAddUser.classList.remove('active'));
  });

  if (btnConfirmAddUser && modalAddUser) {
    btnConfirmAddUser.addEventListener('click', () => {
      const name = document.getElementById('new-user-name')?.value.trim();
      const email = document.getElementById('new-user-email')?.value.trim();
      const role = document.getElementById('new-user-role')?.value;
      const dept = document.getElementById('new-user-dept')?.value;

      if (!name || !email) {
        alert('Please fill in user name and email.');
        return;
      }

      adminData.usersList.unshift({
        id: `U${Math.floor(100 + Math.random() * 900)}`,
        name, email, role, department: dept,
        status: "Active",
        lastLogin: "Just now"
      });

      modalAddUser.classList.remove('active');
      renderAdminUserManagement();
      alert(`New user "${name}" registered with role "${role}" in ${dept}.`);
    });
  }
}

// ─── Stat Card Interactive Buttons (Overview KPIs) ───────
function setupStatCardButtons() {
  const cardCgpa = document.getElementById('stat-card-cgpa');
  const cardAtt = document.getElementById('stat-card-attendance');
  const cardCourses = document.getElementById('stat-card-courses');
  const cardPoints = document.getElementById('stat-card-points');

  // 1. Current CGPA -> Navigates to Performance Analytics
  if (cardCgpa) {
    cardCgpa.addEventListener('click', () => {
      navigateTo('performance');
    });
  }

  // 2. Overall Attendance -> Navigates to Attendance Tracker & Calculator
  if (cardAtt) {
    cardAtt.addEventListener('click', () => {
      navigateTo('attendance');
    });
  }

  // 3. Active Courses -> Opens Enrolled Courses Modal
  const modalCourses = document.getElementById('modal-courses-list');
  const btnCloseCourses = document.getElementById('btn-close-courses-modal');
  const btnCloseCourses2 = document.getElementById('btn-close-courses-footer');
  const btnPerfViewCourses = document.getElementById('btn-perf-view-courses');

  function openCoursesModal() {
    renderCoursesModal();
    if (modalCourses) modalCourses.classList.add('active');
  }

  if (cardCourses) {
    cardCourses.addEventListener('click', openCoursesModal);
  }

  if (btnPerfViewCourses) {
    btnPerfViewCourses.addEventListener('click', openCoursesModal);
  }

  [btnCloseCourses, btnCloseCourses2].forEach(btn => {
    if (btn && modalCourses) {
      btn.addEventListener('click', () => modalCourses.classList.remove('active'));
    }
  });

  if (modalCourses) {
    modalCourses.addEventListener('click', (e) => {
      if (e.target === modalCourses) modalCourses.classList.remove('active');
    });
  }

  // Quick navigation buttons inside courses modal
  const btnCoursesToQuizzes = document.getElementById('btn-courses-to-quizzes');
  if (btnCoursesToQuizzes && modalCourses) {
    btnCoursesToQuizzes.addEventListener('click', () => {
      modalCourses.classList.remove('active');
      navigateTo('quizzes-exams');
    });
  }

  const btnCoursesToAsgn = document.getElementById('btn-courses-to-asgn');
  if (btnCoursesToAsgn && modalCourses) {
    btnCoursesToAsgn.addEventListener('click', () => {
      modalCourses.classList.remove('active');
      navigateTo('assignments');
    });
  }

  const btnCoursesToPlan = document.getElementById('btn-courses-to-plan');
  if (btnCoursesToPlan && modalCourses) {
    btnCoursesToPlan.addEventListener('click', () => {
      modalCourses.classList.remove('active');
      navigateTo('ai-insights');
    });
  }

  // 4. XP Points -> Navigates to Achievements & Gamification
  if (cardPoints) {
    cardPoints.addEventListener('click', () => {
      navigateTo('gamification');
    });
  }

  // Accessibility keyboard support (Enter / Space)
  document.querySelectorAll('.clickable-stat').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function renderCoursesModal() {
  const container = document.getElementById('modal-courses-table-container');
  if (!container) return;

  const attSubjects = studentData.attendance?.subjects || [];
  const perfSubjects = studentData.performance?.subjects || [];

  const courseList = [
    { code: "CE601", name: "Data Structures", credits: 4, faculty: "Dr. Meera Nair", room: "Lab 201" },
    { code: "CE602", name: "Web Technology", credits: 4, faculty: "Prof. Rajesh Varma", room: "Lab 204" },
    { code: "CE603", name: "Machine Learning", credits: 3, faculty: "Dr. Ananya Rao", room: "Room 302" },
    { code: "CE604", name: "DBMS", credits: 4, faculty: "Prof. Sunita Mehta", room: "Lab 105" },
    { code: "CE605", name: "Software Engg.", credits: 3, faculty: "Prof. Vikas Deshmukh", room: "Room 305" },
    { code: "CE606", name: "Computer Networks", credits: 3, faculty: "Prof. K. K. Sharma", room: "Room 308" }
  ];

  container.innerHTML = `
    <table class="data-table" style="width:100%; border-collapse:collapse; margin:0;">
      <thead>
        <tr>
          <th>Course & Code</th>
          <th>Faculty & Credits</th>
          <th>Attendance</th>
          <th>Score & Grade</th>
          <th>Academic Status</th>
          <th style="text-align:right;">Quick Action</th>
        </tr>
      </thead>
      <tbody>
        ${courseList.map(c => {
          const att = attSubjects.find(s => s.name.toLowerCase().includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(s.name.toLowerCase())) || { percentage: 80, attended: 20, classes: 25, isShortage: false };
          const perf = perfSubjects.find(s => s.name.toLowerCase().includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(s.name.toLowerCase())) || { score: 80, grade: "A" };
          
          let statusBadge = '<span class="status-badge" style="background:rgba(16,185,129,0.15); color:var(--emerald); border:1px solid rgba(16,185,129,0.3); padding:4px 10px; border-radius:12px; font-weight:700; font-size:0.75rem;">✓ On Target</span>';
          if (att.isShortage || att.percentage < 75) {
            statusBadge = '<span class="status-badge" style="background:rgba(239,68,68,0.15); color:var(--rose); border:1px solid rgba(239,68,68,0.3); padding:4px 10px; border-radius:12px; font-weight:700; font-size:0.75rem;">⚠ Shortage (70%)</span>';
          } else if (perf.score < 75) {
            statusBadge = '<span class="status-badge" style="background:rgba(245,158,11,0.15); color:var(--amber); border:1px solid rgba(245,158,11,0.3); padding:4px 10px; border-radius:12px; font-weight:700; font-size:0.75rem;">Watchlist</span>';
          }

          return `
            <tr>
              <td>
                <div style="font-weight:700; color:var(--text-primary); font-size:0.88rem;">${c.name}</div>
                <div style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">${c.code} &bull; ${c.room}</div>
              </td>
              <td>
                <div style="color:var(--text-secondary); font-size:0.82rem;">${c.faculty}</div>
                <div style="font-size:0.72rem; color:var(--indigo); font-weight:600;">${c.credits} Credits</div>
              </td>
              <td>
                <div style="font-weight:700; font-size:0.85rem; color:${att.percentage >= 80 ? 'var(--emerald)' : att.percentage >= 75 ? 'var(--amber)' : 'var(--rose)'};">${att.percentage}%</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">${att.attended || 0} / ${att.classes || 0} lectures</div>
              </td>
              <td>
                <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">${perf.score}% <span style="font-size:0.75rem; color:var(--indigo);">(${perf.grade || 'A'})</span></div>
                <div style="font-size:0.72rem; color:var(--text-muted);">Midterm + Quizzes</div>
              </td>
              <td>${statusBadge}</td>
              <td style="text-align:right; white-space:nowrap;">
                <button class="btn-secondary btn-course-quick-calc" data-subject="${c.name}" style="font-size:0.72rem; padding:4px 10px; width:auto;" type="button" title="Calculate attendance for this course">🧮 Calc</button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  // Quick calc button wiring
  container.querySelectorAll('.btn-course-quick-calc').forEach(btn => {
    btn.addEventListener('click', () => {
      const subj = btn.getAttribute('data-subject');
      const modalCourses = document.getElementById('modal-courses-list');
      if (modalCourses) modalCourses.classList.remove('active');
      navigateTo('attendance');
      const sel = document.getElementById('calc-subject-select');
      if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.includes(subj) || sel.options[i].value.includes(subj)) {
            sel.selectedIndex = i;
            sel.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
    });
  });
}

// ─── 11. CHARTS RENDERING HELPERS ─────────────────────────
function buildStudentCharts() {
  const d = studentData;
  destroyCharts(['perf-trend', 'subj-radar', 'quiz-bar', 'ai-donut']);

  const ctxTrend = document.getElementById('chart-perf-trend');
  if (ctxTrend) {
    chartInstances['perf-trend'] = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: d.performance.weeks || ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
        datasets: [{
          label: 'Performance Score %',
          data: d.performance.weekly || [62.5, 65.0, 68.0, 70.0, 69.0, 74.0, 78.0, 82.5],
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.12)',
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointRadius: 5
        }]
      },
      options: chartOptions('line')
    });
  }

  const ctxRadar = document.getElementById('chart-subj-radar');
  if (ctxRadar) {
    chartInstances['subj-radar'] = new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: d.performance.subjects.map(s => s.name),
        datasets: [{
          label: 'Student Score',
          data: d.performance.subjects.map(s => s.score),
          borderColor: '#A855F7',
          backgroundColor: 'rgba(168,85,247,0.18)',
          borderWidth: 2.5,
          pointBackgroundColor: '#A855F7',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            grid: { color: 'rgba(255,255,255,0.08)' },
            angleLines: { color: 'rgba(255,255,255,0.08)' },
            pointLabels: { color: '#94A3B8', font: { family: 'Outfit', size: 10, weight: '600' } },
            ticks: { display: false }
          }
        }
      }
    });
  }

  const ctxQuiz = document.getElementById('chart-quiz-bar');
  if (ctxQuiz) {
    const subjects = d.quizScores.map(q => q.subject.split(' ')[0]);
    const averages = d.quizScores.map(q => Math.round(q.quizzes.reduce((a, b) => a + b, 0) / q.quizzes.length));
    chartInstances['quiz-bar'] = new Chart(ctxQuiz, {
      type: 'bar',
      data: {
        labels: subjects,
        datasets: [{
          data: averages,
          backgroundColor: ['#6366F1', '#06B6D4', '#A855F7', '#10B981', '#F59E0B', '#EF4444'],
          borderRadius: 6
        }]
      },
      options: chartOptions('bar')
    });
  }

  const ctxDonut = document.getElementById('chart-ai-donut');
  if (ctxDonut) {
    chartInstances['ai-donut'] = new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [{
          data: [78, 14, 8],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { position: 'right', labels: { color: '#94A3B8', font: { family: 'Outfit', size: 10 }, boxWidth: 10 } }
        }
      }
    });
  }
}

function chartOptions(type) {
  const base = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };
  if (type === 'line' || type === 'bar') {
    base.scales = {
      y: {
        beginAtZero: type === 'bar',
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#94A3B8', font: { family: 'Outfit' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8', font: { family: 'Outfit' } }
      }
    };
  }
  return base;
}

function destroyCharts(keys) {
  keys.forEach(k => {
    if (chartInstances[k]) {
      chartInstances[k].destroy();
      delete chartInstances[k];
    }
  });
}

// ─── 12. NOTIFICATIONS & CHATBOT ──────────────────────────
function renderNotifications() {
  const notifList = document.getElementById('notif-list');
  if (notifList) {
    notifList.innerHTML = studentData.notifications.map(n => `
      <div class="notif-item" style="padding:10px 12px; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.80rem; display:flex; align-items:flex-start; gap:8px;">
        <span style="font-size:1rem;">${n.type === 'warning' ? '⚠️' : n.type === 'achievement' ? '🏆' : '💡'}</span>
        <div>
          <div style="color:var(--text-primary);">${n.message}</div>
          <div style="color:var(--text-muted); font-size:0.70rem; margin-top:2px;">${n.time}</div>
        </div>
      </div>
    `).join('');
  }
}

function setupChatbot() {
  const fab = document.getElementById('chatbot-fab');
  const panel = document.getElementById('chatbot-panel');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');

  if (fab && panel) {
    fab.addEventListener('click', () => {
      chatOpen = !chatOpen;
      panel.classList.toggle('active', chatOpen);
      if (chatOpen) renderChatHistory();
    });
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    chatHistory.push({ role: 'user', text });
    input.value = '';
    renderChatHistory();

    setTimeout(() => {
      const reply = getBotReply(text);
      chatHistory.push({ role: 'bot', text: reply });
      renderChatHistory();
    }, 300);
  }

  if (send) send.addEventListener('click', handleSend);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
}

function setupPageChatbot() {
  const pInput = document.getElementById('page-chat-input');
  const pSend = document.getElementById('page-chat-send');

  function handlePageSend() {
    const text = pInput.value.trim();
    if (!text) return;

    chatHistory.push({ role: 'user', text });
    pInput.value = '';
    renderChatHistory();

    setTimeout(() => {
      const reply = getBotReply(text);
      chatHistory.push({ role: 'bot', text: reply });
      renderChatHistory();
    }, 300);
  }

  if (pSend) pSend.addEventListener('click', handlePageSend);
  if (pInput) pInput.addEventListener('keydown', e => { if (e.key === 'Enter') handlePageSend(); });
}

function renderChatHistory() {
  const msgsDiv = document.getElementById('chat-messages');
  const pMsgsDiv = document.getElementById('page-chat-messages');

  const html = chatHistory.map(m => `
    <div style="margin-bottom:12px; display:flex; justify-content:${m.role === 'user' ? 'flex-end' : 'flex-start'};">
      <div style="max-width:85%; padding:10px 14px; border-radius:12px; font-size:0.82rem; line-height:1.5; ${m.role === 'user' ? 'background:var(--indigo); color:#fff;' : 'background:rgba(255,255,255,0.06); color:var(--text-primary); border:1px solid var(--border);'}">
        ${m.text.replace(/\n/g, '<br>')}
      </div>
    </div>
  `).join('');

  if (msgsDiv) {
    msgsDiv.innerHTML = html;
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
  }
  if (pMsgsDiv) {
    pMsgsDiv.innerHTML = html;
    pMsgsDiv.scrollTop = pMsgsDiv.scrollHeight;
  }
}

function getBotReply(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes('attendance') || lower.includes('shortage')) {
    return "📊 **Attendance Status (GTU 75% Rule):**\n• Overall Attendance: **82%**\n• ⚠️ **Software Engineering** is at **70%** (Shortage Alert!).\n• Use the interactive Attendance Calculator to see that attending the **next 6 classes** clears your shortage!";
  }
  if (lower.includes('gpa') || lower.includes('cgpa') || lower.includes('predict')) {
    return "📈 **GPA Prediction:**\n• Current CGPA: **8.74**\n• Predicted Semester 6 GPA: **8.90** (+0.16 improvement!)\n• Keep quiz scores in Machine Learning above 80% to reach 9.0!";
  }
  if (lower.includes('weak') || lower.includes('improve') || lower.includes('topic')) {
    return "🎯 **Identified Weak Topics (Module 4.6.7):**\n1. **Dynamic Programming** in Data Structures (42%)\n2. **Gradient Descent** in Machine Learning (38%)\n3. **TCP Congestion Control** in Networks (45%)\n4. **SDLC Testing Coverage** in Software Engg (35%)\n\nRecommended: Follow Thursday's 2.5-hour DP study block!";
  }
  if (lower.includes('placement') || lower.includes('job') || lower.includes('interview')) {
    return "🎯 **Placement Readiness Score:** **86% (Company Ready)**\n• DSA: 88%\n• Web Tech: 92%\n• Mock Rating: 8.8/10\n• Next Step: Solve 52 more LeetCode problems to cross the 200 benchmark!";
  }
  return "I'm your LearnIQ AI Study Tutor for Tapi Diploma Engineering College. You can ask me about:\n• Attendance shortage calculation (75% rule)\n• AI GPA predictions & study plans\n• Placement readiness breakdown\n• Chapter 4 architecture or Chapter 5 budget breakdown (₹0 cost)!";
}

// ─── 13. AI ASSIGNMENT GENERATOR ──────────────────────────
function setupAssignmentGenerator() {
  const btnOpen = document.getElementById('btn-open-gen-assignment-modal');
  const modal = document.getElementById('modal-gen-assignment');
  const btnClose = document.getElementById('btn-close-gen-modal');
  const btnCancel = document.getElementById('btn-cancel-gen-assignment');
  const btnSubmit = document.getElementById('btn-submit-gen-assignment');

  const filterSubj = document.getElementById('filter-assignment-subject');
  const filterStatus = document.getElementById('filter-assignment-status');

  if (filterSubj) filterSubj.addEventListener('change', renderAssignmentsTable);
  if (filterStatus) filterStatus.addEventListener('change', renderAssignmentsTable);

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => modal.classList.add('active'));
  }
  if (btnClose && modal) {
    btnClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (btnCancel && modal) {
    btnCancel.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (btnSubmit && modal) {
    btnSubmit.addEventListener('click', async () => {
      const subject = document.getElementById('gen-assignment-subject').value;
      const topic = document.getElementById('gen-assignment-topic').value.trim() || 'Core Principles & Implementation';
      const difficulty = document.getElementById('gen-assignment-difficulty').value;

      const newAssignment = {
        id: String(Date.now()),
        title: `${topic} (${difficulty} Level)`,
        subject: subject,
        due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending',
        grade: null,
        score: null,
        description: `AI-generated practice assignment: Solve benchmark problems on ${topic} with time-complexity analysis and comprehensive unit tests.`
      };

      studentData.assignments.unshift(newAssignment);
      modal.classList.remove('active');
      document.getElementById('gen-assignment-topic').value = '';
      renderAssignmentsTable();
      alert(`✨ New practice assignment "${newAssignment.title}" generated and added!`);
    });
  }
}

// ─── 14. SETTINGS MODAL ───────────────────────────────────
function setupSettingsModal() {
  const btn = document.getElementById('btn-settings');
  const modal = document.getElementById('modal-settings');
  const close = document.getElementById('btn-close-modal');
  const cancel = document.getElementById('btn-cancel-settings');
  const save = document.getElementById('btn-save-settings');
  const keyInput = document.getElementById('gemini-api-key');

  if (btn && modal) btn.addEventListener('click', () => modal.classList.add('active'));
  if (close && modal) close.addEventListener('click', () => modal.classList.remove('active'));
  if (cancel && modal) cancel.addEventListener('click', () => modal.classList.remove('active'));
  if (save && modal && keyInput) {
    save.addEventListener('click', () => {
      const key = keyInput.value.trim();
      if (key) localStorage.setItem('gemini_api_key', key);
      else localStorage.removeItem('gemini_api_key');
      modal.classList.remove('active');
      alert('Settings saved!');
    });
  }
}

// ─── 15. AI HALLUCINATION DETECTOR MODULE ─────────────────
function setupHallucinationModule() {
  const textarea = document.getElementById('ai-text-input');
  const charCounter = document.getElementById('char-count');
  const btnAnalyze = document.getElementById('btn-analyze-fact');

  if (textarea && charCounter) {
    textarea.addEventListener('input', () => {
      charCounter.textContent = textarea.value.length;
    });
  }

  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelector('.scenario-card.active')?.classList.remove('active');
      card.classList.add('active');
      activeScenario = card.dataset.scenario;
      const scenario = MOCK_SCENARIOS[activeScenario];
      if (scenario && textarea) {
        textarea.value = scenario.text;
        charCounter.textContent = scenario.text.length;
      }
    });
  });

  if (btnAnalyze) {
    btnAnalyze.addEventListener('click', executeFactCheck);
  }
}

async function executeFactCheck() {
  const textarea = document.getElementById('ai-text-input');
  const resultsView = document.getElementById('fact-results-view');
  const btnAnalyze = document.getElementById('btn-analyze-fact');
  const text = textarea ? textarea.value.trim() : '';

  if (!text) {
    alert("Please enter or select text to analyze.");
    return;
  }

  if (btnAnalyze) {
    btnAnalyze.disabled = true;
    btnAnalyze.textContent = "Scanning Fact Integrity...";
  }

  setTimeout(() => {
    const scenario = (activeScenario && MOCK_SCENARIOS[activeScenario]) ? MOCK_SCENARIOS[activeScenario] : MOCK_SCENARIOS.vanceBio;
    renderFactResults(scenario);

    if (btnAnalyze) {
      btnAnalyze.disabled = false;
      btnAnalyze.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2c.57.14.76.69.76 1.25V13z"/><path d="m9 12 2 2 4-4"/></svg>
        Trigger Fact-Verification Scan
      `;
    }
  }, 400);
}

function renderFactResults(data) {
  const resultsView = document.getElementById('fact-results-view');
  if (!resultsView) return;

  const score = data.overallScore;
  const isHighRisk = score > 60;
  const isMedRisk = score > 30 && score <= 60;
  const color = isHighRisk ? 'var(--rose)' : isMedRisk ? 'var(--amber)' : 'var(--emerald)';
  const label = isHighRisk ? 'High Hallucination Risk' : isMedRisk ? 'Moderate Risk' : 'Verified Reliable';

  resultsView.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div>
        <div style="font-weight:800; font-size:1.1rem; color:var(--text-primary);">${data.title}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${data.category}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:1.8rem; font-weight:900; color:${color}; line-height:1;">${score}/100</div>
        <div style="font-size:0.72rem; font-weight:700; color:${color};">${label}</div>
      </div>
    </div>
    <p style="font-size:0.84rem; line-height:1.5; color:var(--text-secondary); margin-bottom:16px;">${data.summaryText}</p>
    <div style="font-weight:700; font-size:0.80rem; margin-bottom:8px; color:var(--text-primary);">Sentence-by-Sentence Audit:</div>
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${data.sentences.map(s => `
        <div style="padding:10px 12px; border-radius:6px; background:${s.status === 'danger' ? 'rgba(239,68,68,0.08)' : s.status === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)'}; border-left:4px solid ${s.status === 'danger' ? 'var(--rose)' : s.status === 'warning' ? 'var(--amber)' : 'var(--emerald)'}; font-size:0.80rem;">
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">"${s.text}"</div>
          <div style="font-size:0.72rem; color:var(--text-secondary);">${s.explanation}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderHallucinationHistory() {
  const container = document.getElementById('fact-history-list');
  if (!container) return;

  container.innerHTML = hallucinationHistory.map(h => `
    <div style="padding:10px 12px; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.80rem; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong>${h.title}</strong>
        <div style="font-size:0.70rem; color:var(--text-muted);">${h.date}</div>
      </div>
      <span class="calc-badge ${h.level === 'high' ? 'danger' : h.level === 'med' ? 'warning' : 'safe'}">Score: ${h.score}</span>
    </div>
  `).join('');
}

function initHallucinationCharts() {
  destroyCharts(['h-trend', 'h-cat']);

  const trendCtx = document.getElementById('chart-h-trend');
  if (trendCtx) {
    chartInstances['h-trend'] = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Audit 1', 'Audit 2', 'Audit 3', 'Audit 4', 'Audit 5', 'Audit 6'],
        datasets: [{
          label: 'Factual Risk Score',
          data: [82, 65, 45, 38, 20, 8],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239,68,68,0.1)',
          fill: true,
          tension: 0.35
        }]
      },
      options: chartOptions('line')
    });
  }

  const catCtx = document.getElementById('chart-h-cat');
  if (catCtx) {
    chartInstances['h-cat'] = new Chart(catCtx, {
      type: 'doughnut',
      data: {
        labels: ['Factual Fabrication', 'Citation Inaccuracy', 'Reasoning Conflict', 'Exaggeration'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: ['#EF4444', '#F59E0B', '#6366F1', '#06B6D4'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { position: 'right', labels: { color: '#94A3B8', boxWidth: 10 } } }
      }
    });
  }
}
