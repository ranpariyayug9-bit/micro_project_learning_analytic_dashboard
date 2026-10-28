// Unified Analytics & AI Trust Hub - Complete Data Store
// Aligned with Tapi Diploma Engineering College - Chapter 4 (System Design) & Chapter 5 (Budget & Feasibility)

const STUDENT_DATA = {
  profile: {
    name: "Saksham Patel",
    rollNo: "21CE011",
    branch: "Computer Engineering",
    semester: "6th Semester",
    institution: "Tapi Diploma Engineering College, Surat",
    cgpa: 8.74,
    avatar: "SP",
    enrolledCourses: 6,
    badges: ["Top Performer", "Quiz Master", "7-Day Streak", "Code Warrior"]
  },
  attendance: {
    overall: 82,
    formula: "Attendance Percentage = (Classes Attended / Total Classes) × 100",
    minRequirement: 75,
    subjects: [
      { name: "Data Structures", percentage: 91, classes: 32, attended: 29, color: "#6366F1", faculty: "Dr. Meera Nair" },
      { name: "Web Technology", percentage: 88, classes: 30, attended: 26, color: "#06B6D4", faculty: "Prof. Rajesh Varma" },
      { name: "Machine Learning", percentage: 79, classes: 28, attended: 22, color: "#A855F7", faculty: "Dr. Ananya Rao" },
      { name: "DBMS", percentage: 85, classes: 33, attended: 28, color: "#10B981", faculty: "Prof. Sunita Mehta" },
      { name: "Software Engg.", percentage: 70, classes: 30, attended: 21, color: "#F59E0B", faculty: "Prof. Vikas Deshmukh", isShortage: true },
      { name: "Computer Networks", percentage: 77, classes: 26, attended: 20, color: "#EF4444", faculty: "Prof. K. K. Sharma" }
    ]
  },
  performance: {
    weekly: [62.5, 65.0, 68.0, 70.0, 69.0, 74.0, 78.0, 82.5],
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    monthly: [62, 68, 71, 74, 78, 82, 80, 85, 88, 84, 87, 91],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    subjects: [
      { name: "Data Structures", score: 88, max: 100, grade: "A+", credits: 4 },
      { name: "Web Technology", score: 91, max: 100, grade: "A+", credits: 4 },
      { name: "Machine Learning", score: 76, max: 100, grade: "B+", credits: 3 },
      { name: "DBMS", score: 83, max: 100, grade: "A", credits: 4 },
      { name: "Software Engg.", score: 69, max: 100, grade: "B", credits: 3 },
      { name: "Computer Networks", score: 72, max: 100, grade: "B+", credits: 3 }
    ]
  },
  // Section 4.6.5: Quiz & Examination Module Data
  quizzesAndExams: {
    quizzes: [
      { id: "Q1", subject: "Data Structures", topic: "Trees & Binary Search Trees", score: 92, max: 100, classAvg: 74, date: "2026-08-10", trend: "up" },
      { id: "Q2", subject: "Web Technology", topic: "React Hooks & Virtual DOM", score: 95, max: 100, classAvg: 78, date: "2026-08-12", trend: "up" },
      { id: "Q3", subject: "Machine Learning", topic: "Cost Functions & Optimizers", score: 72, max: 100, classAvg: 68, date: "2026-08-14", trend: "stable" },
      { id: "Q4", subject: "DBMS", topic: "SQL Subqueries & Join Optimization", score: 85, max: 100, classAvg: 76, date: "2026-08-16", trend: "up" },
      { id: "Q5", subject: "Software Engg.", topic: "Testing Strategies & Code Coverage", score: 68, max: 100, classAvg: 65, date: "2026-08-18", trend: "down" },
      { id: "Q6", subject: "Computer Networks", topic: "TCP Sliding Window & Flow Control", score: 74, max: 100, classAvg: 71, date: "2026-08-20", trend: "stable" }
    ],
    examinations: [
      { code: "CE601", subject: "Data Structures", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 45, percentage: 90, grade: "A+", status: "Completed", date: "2026-07-20" },
      { code: "CE602", subject: "Web Technology", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 47, percentage: 94, grade: "A+", status: "Completed", date: "2026-07-22" },
      { code: "CE603", subject: "Machine Learning", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 38, percentage: 76, grade: "B+", status: "Completed", date: "2026-07-24" },
      { code: "CE604", subject: "DBMS", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 42, percentage: 84, grade: "A", status: "Completed", date: "2026-07-26" },
      { code: "CE605", subject: "Software Engg.", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 34, percentage: 68, grade: "B", status: "Completed", date: "2026-07-28" },
      { code: "CE606", subject: "Computer Networks", examType: "Mid-Term Examination", maxMarks: 50, marksObtained: 37, percentage: 74, grade: "B+", status: "Completed", date: "2026-07-30" },
      { code: "CE601-P", subject: "Data Structures Lab", examType: "Practical Exam", maxMarks: 50, marksObtained: 48, percentage: 96, grade: "O", status: "Completed", date: "2026-08-05" },
      { code: "CE602-P", subject: "Web Development Lab", examType: "Practical Exam", maxMarks: 50, marksObtained: 49, percentage: 98, grade: "O", status: "Completed", date: "2026-08-07" },
      { code: "CE600-F", subject: "Semester Final Assessment", examType: "Final Theory (Predicted)", maxMarks: 100, marksObtained: 89, percentage: 89, grade: "A+", status: "Upcoming", date: "2026-11-15" }
    ]
  },
  // Section 4.17: Placement-Readiness Tracking
  placementReadiness: {
    overallScore: 86,
    status: "Company Ready",
    statusColor: "#10B981",
    metrics: [
      { skill: "Data Structures & Algorithms", score: 88, benchmark: 75, status: "Proficient" },
      { skill: "Web & Full-Stack Development", score: 92, benchmark: 70, status: "Advanced" },
      { skill: "Database & SQL Design", score: 84, benchmark: 70, status: "Proficient" },
      { skill: "Quantitative & Logical Aptitude", score: 80, benchmark: 75, status: "Proficient" },
      { skill: "System Design Fundamentals", score: 76, benchmark: 65, status: "Competent" },
      { skill: "Mock Technical Interview", score: 88, benchmark: 70, status: "Interview Ready" }
    ],
    stats: {
      codingProblemsSolved: 148,
      targetProblems: 200,
      mockInterviewsCompleted: 5,
      mockRating: 8.8,
      resumeScore: 94
    },
    recommendations: [
      "Review Dynamic Programming and Graph algorithms to prepare for Product Tier-1 assessments",
      "Attend the upcoming mock technical interview session on System Architecture",
      "Upload 2 GitHub live links to the Placement Portfolio profile"
    ]
  },
  assignments: [
    { id: "1", title: "Binary Search Tree & AVL Self-Balancing", subject: "Data Structures", due: "2026-08-25", status: "submitted", grade: "A", score: 92, description: "Implement AVL Tree rotation algorithms (LL, RR, LR, RL) with height balancing in C++." },
    { id: "2", title: "React & Tailwind Analytics Dashboard", subject: "Web Technology", due: "2026-08-28", status: "submitted", grade: "A+", score: 97, description: "Develop a single-page application with Chart.js visualization and dark-mode glassmorphism." },
    { id: "3", title: "K-Means Clustering & Customer Segmentation", subject: "Machine Learning", due: "2026-08-30", status: "pending", grade: null, score: null, description: "Apply elbow method on Mall Customer dataset and plot 2D PCA cluster centroids." },
    { id: "4", title: "Hospital Database ER Modeling & 3NF Normalization", subject: "DBMS", due: "2026-09-02", status: "submitted", grade: "B+", score: 78, description: "Design relational schema, identify functional dependencies and decompose to 3NF." },
    { id: "5", title: "Agile Sprint Planning & SDLC Case Study", subject: "Software Engg.", due: "2026-08-20", status: "overdue", grade: null, score: null, description: "Prepare Scrum user stories, velocity charts, and risk mitigation strategies." },
    { id: "6", title: "Wireshark TCP/IP 3-Way Handshake Analysis", subject: "Computer Networks", due: "2026-09-08", status: "pending", grade: null, score: null, description: "Capture SYN, SYN-ACK, ACK packets in Wireshark and analyze sequence numbers." },
    { id: "7", title: "Graph Traversal & Dijkstra's Algorithm in C++", subject: "Data Structures", due: "2026-09-12", status: "pending", grade: null, score: null, description: "Implement adjacency list and shortest path using Min-Heap." },
    { id: "8", title: "Node.js REST API with JWT Authentication", subject: "Web Technology", due: "2026-09-15", status: "pending", grade: null, score: null, description: "Build Express backend with bcrypt password hashing and JWT token verification." },
    { id: "9", title: "CNN Image Classification on CIFAR-10", subject: "Machine Learning", due: "2026-09-18", status: "pending", grade: null, score: null, description: "Train a convolutional neural network with batch normalization in PyTorch." },
    { id: "10", title: "Complex SQL Window Functions & Query Optimization", subject: "DBMS", due: "2026-09-20", status: "pending", grade: null, score: null, description: "Write RANK(), DENSE_RANK(), and LEAD() queries and analyze execution plans." },
    { id: "11", title: "Automated Unit Testing with Jest & CI/CD", subject: "Software Engg.", due: "2026-09-22", status: "pending", grade: null, score: null, description: "Configure GitHub Actions workflow to run automated tests on pull requests." },
    { id: "12", title: "CIDR Subnetting & OSPF Routing Configuration", subject: "Computer Networks", due: "2026-09-25", status: "pending", grade: null, score: null, description: "Calculate VLSM subnets and configure Cisco Packet Tracer router." }
  ],
  quizScores: [
    { subject: "Data Structures", quizzes: [85, 90, 78, 92, 88] },
    { subject: "Web Technology", quizzes: [95, 88, 96, 91, 94] },
    { subject: "Machine Learning", quizzes: [72, 68, 75, 80, 77] },
    { subject: "DBMS", quizzes: [80, 82, 79, 85, 83] },
    { subject: "Software Engg.", quizzes: [65, 70, 68, 73, 71] },
    { subject: "Computer Networks", quizzes: [74, 70, 77, 72, 75] }
  ],
  weakTopics: [
    { topic: "Dynamic Programming", subject: "Data Structures", proficiency: 42, trend: "improving", priority: "High" },
    { topic: "Gradient Descent & Backprop", subject: "Machine Learning", proficiency: 38, trend: "stable", priority: "High" },
    { topic: "TCP Congestion Control", subject: "Computer Networks", proficiency: 45, trend: "declining", priority: "Medium" },
    { topic: "SDLC Testing & Coverage", subject: "Software Engg.", proficiency: 35, trend: "stable", priority: "High" }
  ],
  aiPredictions: {
    semesterGPA: 8.9,
    riskLevel: "low",
    completionRate: 78,
    studyHoursRecommended: 3.5,
    studyPlan: [
      { day: "Monday", subject: "Machine Learning", topic: "Neural Networks & Backpropagation", duration: "2.0 hrs", type: "Concept Review" },
      { day: "Tuesday", subject: "Computer Networks", topic: "TCP/IP Congestion Control Algorithms", duration: "1.5 hrs", type: "Problem Solving" },
      { day: "Wednesday", subject: "Software Engg.", topic: "Unit Testing & SDLC Coverage", duration: "2.0 hrs", type: "Lab Practice" },
      { day: "Thursday", subject: "Data Structures", topic: "Dynamic Programming: Knapsack & LCS", duration: "2.5 hrs", type: "Deep Dive Practice" },
      { day: "Friday", subject: "DBMS", topic: "Normalization (BCNF & 4NF)", duration: "1.0 hr", type: "Quiz Preparation" },
      { day: "Saturday", subject: "Web Technology", topic: "REST API Architecture & JWT Auth", duration: "1.5 hrs", type: "Mini-Project" }
    ]
  },
  notifications: [
    { id: "1", type: "warning", message: "SDLC Case Study is overdue by 2 days!", time: "2 hours ago" },
    { id: "2", type: "reminder", message: "K-Means Clustering Report due in 3 days", time: "5 hours ago" },
    { id: "3", type: "achievement", message: "You earned the 'Quiz Master' badge!", time: "1 day ago" },
    { id: "4", type: "ai", message: "AI Insight: Dedicate 2 hours to Dynamic Programming before Friday", time: "1 day ago" },
    { id: "5", type: "warning", message: "Software Engineering attendance is 70% (Below 75% GTU threshold!)", time: "2 days ago" },
    { id: "6", type: "achievement", message: "Placement Readiness scored 86% — Ranked in top 10% of CE branch", time: "3 days ago" }
  ],
  gamification: {
    points: 2840,
    level: 12,
    levelName: "Code Warrior",
    nextLevelPoints: 3200,
    badges: [
      { name: "Top Performer", icon: "🏆", earned: true, desc: "Scored A+ in 2 or more subjects" },
      { name: "Quiz Master", icon: "🧩", earned: true, desc: "Scored 90+ in 5 consecutive quizzes" },
      { name: "7-Day Streak", icon: "🔥", earned: true, desc: "Active on learning portal for 7 days" },
      { name: "Code Warrior", icon: "⚔️", earned: true, desc: "Completed 100+ programming assignments" },
      { name: "Assignment Ace", icon: "📝", earned: false, desc: "Submit all semester assignments on time" },
      { name: "Perfect Attendance", icon: "✅", earned: false, desc: "Maintain 90%+ attendance across all subjects" },
      { name: "AI Scholar", icon: "🤖", earned: false, desc: "Complete all AI study plan recommendations" }
    ]
  }
};

const TEACHER_DATA = {
  profile: {
    name: "Dr. Meera Nair",
    designation: "Associate Professor & Class Mentor",
    subject: "Data Structures & Algorithms",
    department: "Computer Engineering",
    institution: "Tapi Diploma Engineering College"
  },
  classAnalytics: {
    totalStudents: 65,
    avgScore: 76.4,
    passRate: 89,
    atRiskCount: 8,
    topPerformers: 12,
    avgAttendance: 81.2,
    assignmentsSubmittedPct: 84
  },
  studentRankings: [
    { rank: 1, name: "Saksham Patel", rollNo: "21CE011", score: 88, attendance: 91, assignments: "10/12", trend: "up", status: "High Performer" },
    { rank: 2, name: "Priya Sharma", rollNo: "21CE014", score: 85, attendance: 88, assignments: "11/12", trend: "up", status: "High Performer" },
    { rank: 3, name: "Rohan Mehta", rollNo: "21CE022", score: 79, attendance: 76, assignments: "9/12", trend: "stable", status: "Average" },
    { rank: 4, name: "Anjali Gupta", rollNo: "21CE005", score: 72, attendance: 82, assignments: "8/12", trend: "down", status: "Average" },
    { rank: 5, name: "Karan Patel", rollNo: "21CE018", score: 65, attendance: 68, assignments: "7/12", trend: "down", status: "Moderate Risk" },
    { rank: 6, name: "Neha Joshi", rollNo: "21CE031", score: 63, attendance: 72, assignments: "6/12", trend: "down", status: "Moderate Risk" },
    { rank: 7, name: "Vijay Rathod", rollNo: "21CE045", score: 48, attendance: 62, assignments: "4/12", trend: "down", status: "High Risk" },
    { rank: 8, name: "Ankit Shah", rollNo: "21CE052", score: 51, attendance: 59, assignments: "3/12", trend: "down", status: "High Risk" }
  ],
  // Section 4.6.8: Early Warning & Risk Analysis
  atRiskStudents: [
    {
      name: "Vijay Rathod",
      rollNo: "21CE045",
      attendance: 62,
      assignmentPct: 40,
      quizScore: 45,
      examScore: 48,
      riskScore: 84,
      riskLevel: "Critical Risk",
      issue: "Shortage of attendance (62%) + Poor quiz/exam scores (< 50%)",
      recommendedAction: "Mandatory counseling & remedial coaching",
      parentNotified: true
    },
    {
      name: "Ankit Shah",
      rollNo: "21CE052",
      attendance: 59,
      assignmentPct: 35,
      quizScore: 52,
      examScore: 50,
      riskScore: 79,
      riskLevel: "High Risk",
      issue: "Severe attendance shortage (<60%) + 4 missing assignments",
      recommendedAction: "Issue GTU attendance warning notice",
      parentNotified: true
    },
    {
      name: "Meghna Joshi",
      rollNo: "21CE038",
      attendance: 71,
      assignmentPct: 55,
      quizScore: 52,
      examScore: 55,
      riskScore: 68,
      riskLevel: "High Risk",
      issue: "Failed 2 consecutive module quizzes in Trees & Sorting",
      recommendedAction: "Assign peer tutor & provide study guides",
      parentNotified: false
    },
    {
      name: "Karan Patel",
      rollNo: "21CE018",
      attendance: 68,
      assignmentPct: 60,
      quizScore: 64,
      examScore: 62,
      riskScore: 58,
      riskLevel: "Moderate Risk",
      issue: "Declining attendance in Software Engineering & Networks",
      recommendedAction: "Mentor meeting scheduled for Thursday",
      parentNotified: false
    }
  ],
  topicEngagement: [
    { topic: "Arrays & Linked Lists", engagement: 92, avgQuizScore: 84, status: "Mastered" },
    { topic: "Sorting & Searching", engagement: 85, avgQuizScore: 78, status: "Proficient" },
    { topic: "Trees & Binary Trees", engagement: 78, avgQuizScore: 72, status: "Average" },
    { topic: "Graph Algorithms", engagement: 66, avgQuizScore: 64, status: "Needs Review" },
    { topic: "Dynamic Programming", engagement: 54, avgQuizScore: 52, status: "Critical Weak Area" }
  ]
};

const ADMIN_DATA = {
  profile: {
    name: "Dr. Arvind Kelkar",
    role: "Principal & Institutional Administrator",
    institution: "Tapi Diploma Engineering College, Surat"
  },
  stats: {
    totalEnrollments: 1420,
    facultyMembers: 84,
    overallPassRate: 91.4,
    complianceScore: 98.2,
    activeCourses: 36,
    systemUptime: "99.98%",
    totalAtRisk: 42,
    placementRate: 88.5
  },
  departments: [
    { name: "Computer Engineering", code: "CE", students: 380, faculty: 22, passRate: 92.5, avgAttendance: 84, atRisk: 8, avgCGPA: 8.2 },
    { name: "Information Technology", code: "IT", students: 310, faculty: 18, passRate: 90.2, avgAttendance: 82, atRisk: 9, avgCGPA: 8.0 },
    { name: "AI & Data Science", code: "AIDS", students: 240, faculty: 14, passRate: 94.1, avgAttendance: 88, atRisk: 4, avgCGPA: 8.5 },
    { name: "Electronics & Comm.", code: "EC", students: 260, faculty: 16, passRate: 88.6, avgAttendance: 79, atRisk: 11, avgCGPA: 7.7 },
    { name: "Mechanical Engg.", code: "ME", students: 230, faculty: 14, passRate: 86.8, avgAttendance: 78, atRisk: 10, avgCGPA: 7.5 }
  ],
  // Section 4.6.1: User Management & RBAC Table
  usersList: [
    { id: "U101", name: "Saksham Patel", email: "saksham.21ce011@tapidiploma.edu", role: "Student", department: "Computer Engg.", status: "Active", lastLogin: "Today, 09:15 AM" },
    { id: "U102", name: "Priya Sharma", email: "priya.21ce014@tapidiploma.edu", role: "Student", department: "Computer Engg.", status: "Active", lastLogin: "Today, 10:20 AM" },
    { id: "U103", name: "Dr. Meera Nair", email: "meera.nair@tapidiploma.edu", role: "Teacher", department: "Computer Engg.", status: "Active", lastLogin: "Today, 08:45 AM" },
    { id: "U104", name: "Prof. Rajesh Varma", email: "rajesh.varma@tapidiploma.edu", role: "Teacher", department: "Information Tech.", status: "Active", lastLogin: "Yesterday, 04:30 PM" },
    { id: "U105", name: "Dr. Arvind Kelkar", email: "principal@tapidiploma.edu", role: "Administrator", department: "Administration", status: "Active", lastLogin: "Today, 08:00 AM" },
    { id: "U106", name: "Vijay Rathod", email: "vijay.21ce045@tapidiploma.edu", role: "Student", department: "Computer Engg.", status: "Active", lastLogin: "3 days ago" }
  ],
  rbacMatrix: [
    { role: "Student", viewOwnData: "Yes", submitAssignments: "Yes", takeQuizzes: "Yes", viewClassAnalytics: "No", gradeCoursework: "No", manageUsers: "No", institutionalReports: "No" },
    { role: "Teacher", viewOwnData: "Yes", submitAssignments: "N/A", takeQuizzes: "N/A", viewClassAnalytics: "Yes", gradeCoursework: "Yes", manageUsers: "No", institutionalReports: "Class-Level" },
    { role: "Administrator", viewOwnData: "Yes", submitAssignments: "N/A", takeQuizzes: "N/A", viewClassAnalytics: "Yes (All Depts)", gradeCoursework: "Audit", manageUsers: "Full Access", institutionalReports: "University-Wide" }
  ],
  systemLogs: [
    { time: "2026-08-21 21:10", event: "REST API Database synchronization completed (MySQL 13 Tables)", status: "success", service: "Express Backend" },
    { time: "2026-08-21 20:45", event: "Automated student attendance alert trigger dispatched (4 students)", status: "warning", service: "Early Warning System" },
    { time: "2026-08-21 20:00", event: "AI Hallucination Verification engine health check passed", status: "success", service: "Fact-Check Guard" },
    { time: "2026-08-21 19:30", event: "Semester examination mid-term grade upload verified (GTU Portal)", status: "success", service: "Academic Registry" },
    { time: "2026-08-21 18:00", event: "Daily database automated backup completed (dump_20260821.sql)", status: "success", service: "MySQL Cron Service" },
    { time: "2026-08-21 16:15", event: "User password hash verification & RBAC token refresh", status: "success", service: "Authentication Module" }
  ]
};

// Section 4.5: Database Design (MySQL 13 Tables Specification)
const DATABASE_DESIGN_SCHEMA = [
  {
    tableNumber: 1,
    tableName: "Students",
    purpose: "Stores student personal, demographic and academic enrollment information",
    primaryKey: "student_id",
    foreignKeys: "department_id -> Departments",
    columns: [
      { name: "student_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Unique student identifier" },
      { name: "roll_no", type: "VARCHAR(20) UNIQUE NOT NULL", desc: "College enrollment / roll number" },
      { name: "full_name", type: "VARCHAR(100) NOT NULL", desc: "Student full name" },
      { name: "email", type: "VARCHAR(120) UNIQUE NOT NULL", desc: "Institutional email address" },
      { name: "department", type: "VARCHAR(50) NOT NULL", desc: "Department (e.g. Computer Engineering)" },
      { name: "semester", type: "INT NOT NULL", desc: "Current semester (e.g. 6)" },
      { name: "current_cgpa", type: "DECIMAL(4,2) DEFAULT 0.00", desc: "Cumulative Grade Point Average" },
      { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", desc: "Registration date" }
    ],
    sampleRows: [
      { student_id: 1, roll_no: "21CE011", full_name: "Saksham Patel", email: "saksham.21ce011@tapidiploma.edu", department: "Computer Engg.", semester: 6, current_cgpa: "8.74" },
      { student_id: 2, roll_no: "21CE014", full_name: "Priya Sharma", email: "priya.21ce014@tapidiploma.edu", department: "Computer Engg.", semester: 6, current_cgpa: "8.50" },
      { student_id: 3, roll_no: "21CE045", full_name: "Vijay Rathod", email: "vijay.21ce045@tapidiploma.edu", department: "Computer Engg.", semester: 6, current_cgpa: "5.40" }
    ]
  },
  {
    tableNumber: 2,
    tableName: "Teachers",
    purpose: "Stores faculty and teacher records, credentials, and departmental associations",
    primaryKey: "teacher_id",
    foreignKeys: "None",
    columns: [
      { name: "teacher_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Unique faculty identifier" },
      { name: "name", type: "VARCHAR(100) NOT NULL", desc: "Faculty full name" },
      { name: "email", type: "VARCHAR(120) UNIQUE NOT NULL", desc: "Official email" },
      { name: "department", type: "VARCHAR(50) NOT NULL", desc: "Academic department" },
      { name: "designation", type: "VARCHAR(50) NOT NULL", desc: "Professor / Mentor designation" },
      { name: "assigned_subjects", type: "TEXT", desc: "JSON array of course codes taught" }
    ],
    sampleRows: [
      { teacher_id: 101, name: "Dr. Meera Nair", email: "meera.nair@tapidiploma.edu", department: "Computer Engg.", designation: "Associate Professor", assigned_subjects: "['CE601', 'CE601-P']" },
      { teacher_id: 102, name: "Prof. Rajesh Varma", email: "rajesh.varma@tapidiploma.edu", department: "Computer Engg.", designation: "Assistant Professor", assigned_subjects: "['CE602', 'CE602-P']" }
    ]
  },
  {
    tableNumber: 3,
    tableName: "Courses",
    purpose: "Stores course details, syllabus, credit allocation, and department links",
    primaryKey: "course_id",
    foreignKeys: "teacher_id -> Teachers",
    columns: [
      { name: "course_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Unique course ID" },
      { name: "course_code", type: "VARCHAR(20) UNIQUE NOT NULL", desc: "GTU syllabus course code" },
      { name: "course_name", type: "VARCHAR(100) NOT NULL", desc: "Course title" },
      { name: "credits", type: "INT NOT NULL", desc: "Credit points (e.g. 4)" },
      { name: "semester", type: "INT NOT NULL", desc: "Semester number" },
      { name: "teacher_id", type: "INT", desc: "Assigned course coordinator" }
    ],
    sampleRows: [
      { course_id: 1, course_code: "CE601", course_name: "Data Structures & Algorithms", credits: 4, semester: 6, teacher_id: 101 },
      { course_id: 2, course_code: "CE602", course_name: "Web Technology", credits: 4, semester: 6, teacher_id: 102 },
      { course_id: 3, course_code: "CE603", course_name: "Machine Learning", credits: 3, semester: 6, teacher_id: 103 }
    ]
  },
  {
    tableNumber: 4,
    tableName: "Attendance",
    purpose: "Stores daily student attendance records and calculates cumulative percentage",
    primaryKey: "attendance_id",
    foreignKeys: "student_id -> Students, course_id -> Courses",
    columns: [
      { name: "attendance_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Attendance record ID" },
      { name: "student_id", type: "INT NOT NULL", desc: "Referenced student" },
      { name: "course_id", type: "INT NOT NULL", desc: "Referenced course" },
      { name: "total_classes", type: "INT NOT NULL", desc: "Total sessions conducted" },
      { name: "attended_classes", type: "INT NOT NULL", desc: "Sessions present" },
      { name: "percentage", type: "DECIMAL(5,2) GENERATED", desc: "(attended / total) * 100" },
      { name: "last_updated", type: "TIMESTAMP", desc: "Timestamp of last entry" }
    ],
    sampleRows: [
      { attendance_id: 1, student_id: 1, course_id: 1, total_classes: 32, attended_classes: 29, percentage: "90.62%" },
      { attendance_id: 2, student_id: 1, course_id: 5, total_classes: 30, attended_classes: 21, percentage: "70.00% (Shortage)" },
      { attendance_id: 3, student_id: 3, course_id: 1, total_classes: 32, attended_classes: 20, percentage: "62.50% (Shortage)" }
    ]
  },
  {
    tableNumber: 5,
    tableName: "Assignments",
    purpose: "Stores assignment tasks, deadlines, question prompts, and maximum marks",
    primaryKey: "assignment_id",
    foreignKeys: "course_id -> Courses",
    columns: [
      { name: "assignment_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Assignment ID" },
      { name: "course_id", type: "INT NOT NULL", desc: "Referenced course" },
      { name: "title", type: "VARCHAR(200) NOT NULL", desc: "Assignment title" },
      { name: "due_date", type: "DATE NOT NULL", desc: "Submission deadline" },
      { name: "max_marks", type: "INT NOT NULL DEFAULT 100", desc: "Maximum marks" }
    ],
    sampleRows: [
      { assignment_id: 1, course_id: 1, title: "Binary Search Tree Implementation", due_date: "2026-08-25", max_marks: 100 },
      { assignment_id: 2, course_id: 2, title: "React Analytics Dashboard", due_date: "2026-08-28", max_marks: 100 }
    ]
  },
  {
    tableNumber: 6,
    tableName: "Submissions",
    purpose: "Stores student submission records, submission timestamps, grades, and marks",
    primaryKey: "submission_id",
    foreignKeys: "assignment_id -> Assignments, student_id -> Students",
    columns: [
      { name: "submission_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Submission identifier" },
      { name: "assignment_id", type: "INT NOT NULL", desc: "Referenced assignment" },
      { name: "student_id", type: "INT NOT NULL", desc: "Student who submitted" },
      { name: "submitted_at", type: "DATETIME NOT NULL", desc: "Timestamp" },
      { name: "status", type: "ENUM('submitted', 'pending', 'overdue')", desc: "Submission status" },
      { name: "score", type: "INT DEFAULT NULL", desc: "Marks awarded" },
      { name: "grade", type: "VARCHAR(5) DEFAULT NULL", desc: "Letter grade (A+, A, B, etc.)" }
    ],
    sampleRows: [
      { submission_id: 1, assignment_id: 1, student_id: 1, submitted_at: "2026-08-24 18:30:00", status: "submitted", score: 92, grade: "A" },
      { submission_id: 2, assignment_id: 2, student_id: 1, submitted_at: "2026-08-27 21:10:00", status: "submitted", score: 97, grade: "A+" }
    ]
  },
  {
    tableNumber: 7,
    tableName: "Quizzes",
    purpose: "Stores periodic quiz metadata, topic coverage, and schedule information",
    primaryKey: "quiz_id",
    foreignKeys: "course_id -> Courses",
    columns: [
      { name: "quiz_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Quiz ID" },
      { name: "course_id", type: "INT NOT NULL", desc: "Course reference" },
      { name: "topic", type: "VARCHAR(150) NOT NULL", desc: "Tested topic" },
      { name: "total_marks", type: "INT DEFAULT 100", desc: "Max marks" },
      { name: "quiz_date", type: "DATE NOT NULL", desc: "Date conducted" }
    ],
    sampleRows: [
      { quiz_id: 1, course_id: 1, topic: "Trees & Binary Search Trees", total_marks: 100, quiz_date: "2026-08-10" },
      { quiz_id: 2, course_id: 2, topic: "React Hooks & Virtual DOM", total_marks: 100, quiz_date: "2026-08-12" }
    ]
  },
  {
    tableNumber: 8,
    tableName: "Quiz_Results",
    purpose: "Stores student quiz scores, percentile rankings, and attempt history",
    primaryKey: "result_id",
    foreignKeys: "quiz_id -> Quizzes, student_id -> Students",
    columns: [
      { name: "result_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Result ID" },
      { name: "quiz_id", type: "INT NOT NULL", desc: "Referenced quiz" },
      { name: "student_id", type: "INT NOT NULL", desc: "Referenced student" },
      { name: "marks_obtained", type: "INT NOT NULL", desc: "Student score" },
      { name: "percentage", type: "DECIMAL(5,2)", desc: "Calculated %" }
    ],
    sampleRows: [
      { result_id: 1, quiz_id: 1, student_id: 1, marks_obtained: 92, percentage: "92.00%" },
      { result_id: 2, quiz_id: 1, student_id: 3, marks_obtained: 45, percentage: "45.00%" }
    ]
  },
  {
    tableNumber: 9,
    tableName: "Examinations",
    purpose: "Stores mid-term, practical, and final semester examination schedules",
    primaryKey: "exam_id",
    foreignKeys: "course_id -> Courses",
    columns: [
      { name: "exam_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Exam ID" },
      { name: "course_id", type: "INT NOT NULL", desc: "Course code" },
      { name: "exam_type", type: "VARCHAR(50) NOT NULL", desc: "Mid-Term / Practical / Final" },
      { name: "max_marks", type: "INT NOT NULL", desc: "Max marks" },
      { name: "exam_date", type: "DATE NOT NULL", desc: "Date conducted" }
    ],
    sampleRows: [
      { exam_id: 1, course_id: 1, exam_type: "Mid-Term Examination", max_marks: 50, exam_date: "2026-07-20" },
      { exam_id: 2, course_id: 1, exam_type: "Practical Exam", max_marks: 50, exam_date: "2026-08-05" }
    ]
  },
  {
    tableNumber: 10,
    tableName: "Exam_Results",
    purpose: "Stores student examination marks, grades, and official performance records",
    primaryKey: "exam_result_id",
    foreignKeys: "exam_id -> Examinations, student_id -> Students",
    columns: [
      { name: "exam_result_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Exam result ID" },
      { name: "exam_id", type: "INT NOT NULL", desc: "Referenced exam" },
      { name: "student_id", type: "INT NOT NULL", desc: "Student reference" },
      { name: "marks_obtained", type: "INT NOT NULL", desc: "Marks awarded" },
      { name: "grade", type: "VARCHAR(5) NOT NULL", desc: "Letter grade" }
    ],
    sampleRows: [
      { exam_result_id: 1, exam_id: 1, student_id: 1, marks_obtained: 45, grade: "A+" },
      { exam_result_id: 2, exam_id: 1, student_id: 3, marks_obtained: 24, grade: "C" }
    ]
  },
  {
    tableNumber: 11,
    tableName: "Performance",
    purpose: "Stores calculated performance metrics, moving averages, and subject proficiency",
    primaryKey: "perf_id",
    foreignKeys: "student_id -> Students",
    columns: [
      { name: "perf_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Performance record ID" },
      { name: "student_id", type: "INT NOT NULL", desc: "Student reference" },
      { name: "semester", type: "INT NOT NULL", desc: "Semester number" },
      { name: "sgpa", type: "DECIMAL(4,2) NOT NULL", desc: "Semester GPA" },
      { name: "cgpa", type: "DECIMAL(4,2) NOT NULL", desc: "Cumulative GPA" },
      { name: "predicted_gpa", type: "DECIMAL(4,2)", desc: "AI predicted GPA" }
    ],
    sampleRows: [
      { perf_id: 1, student_id: 1, semester: 6, sgpa: "8.80", cgpa: "8.74", predicted_gpa: "8.90" },
      { perf_id: 2, student_id: 3, semester: 6, sgpa: "5.20", cgpa: "5.40", predicted_gpa: "5.10" }
    ]
  },
  {
    tableNumber: 12,
    tableName: "Recommendations",
    purpose: "Stores personalized AI-generated academic recommendations and study suggestions",
    primaryKey: "rec_id",
    foreignKeys: "student_id -> Students",
    columns: [
      { name: "rec_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Recommendation ID" },
      { name: "student_id", type: "INT NOT NULL", desc: "Student reference" },
      { name: "category", type: "VARCHAR(50) NOT NULL", desc: "Revision / Practice / Resource" },
      { name: "suggestion", type: "TEXT NOT NULL", desc: "AI generated study advice" },
      { name: "priority", type: "ENUM('High', 'Medium', 'Low')", desc: "Urgency level" }
    ],
    sampleRows: [
      { rec_id: 1, student_id: 1, category: "Revision", suggestion: "Practice Dynamic Programming: Longest Common Subsequence", priority: "High" },
      { rec_id: 2, student_id: 1, category: "Study Activity", suggestion: "Complete 2 timed quizzes in Software Engineering", priority: "Medium" }
    ]
  },
  {
    tableNumber: 13,
    tableName: "Alerts",
    purpose: "Stores academic warning notifications, attendance shortage alerts, and at-risk notices",
    primaryKey: "alert_id",
    foreignKeys: "student_id -> Students",
    columns: [
      { name: "alert_id", type: "INT PRIMARY KEY AUTO_INCREMENT", desc: "Alert ID" },
      { name: "student_id", type: "INT NOT NULL", desc: "Student reference" },
      { name: "alert_type", type: "VARCHAR(50) NOT NULL", desc: "Attendance Shortage / Score Drop" },
      { name: "risk_level", type: "ENUM('Safe', 'Moderate', 'High', 'Critical')", desc: "Risk severity" },
      { name: "message", type: "TEXT NOT NULL", desc: "Alert notification content" },
      { name: "timestamp", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", desc: "Dispatch time" }
    ],
    sampleRows: [
      { alert_id: 1, student_id: 1, alert_type: "Attendance Shortage", risk_level: "Moderate", message: "Software Engineering attendance is 70% (Below 75% GTU threshold)" },
      { alert_id: 2, student_id: 3, alert_type: "Academic Risk Warning", risk_level: "Critical", message: "Attendance 62% + Quiz average 45%. Proactive counseling required." }
    ]
  }
];

// Pre-defined SQL queries for the interactive SQL Query Runner
const SAMPLE_SQL_QUERIES = [
  {
    title: "1. Find all At-Risk Students with Attendance < 75%",
    sql: "SELECT s.roll_no, s.full_name, a.percentage, al.risk_level, al.message\nFROM Students s\nJOIN Attendance a ON s.student_id = a.student_id\nJOIN Alerts al ON s.student_id = al.student_id\nWHERE a.percentage < 75.0\nORDER BY a.percentage ASC;"
  },
  {
    title: "2. List Top Performing Students (CGPA > 8.5)",
    sql: "SELECT roll_no, full_name, department, current_cgpa\nFROM Students\nWHERE current_cgpa >= 8.50\nORDER BY current_cgpa DESC;"
  },
  {
    title: "3. Quiz Scores vs Class Average Breakdown",
    sql: "SELECT q.topic, c.course_name, qr.marks_obtained, q.total_marks\nFROM Quiz_Results qr\nJOIN Quizzes q ON qr.quiz_id = q.quiz_id\nJOIN Courses c ON q.course_id = c.course_id\nWHERE qr.student_id = 1;"
  },
  {
    title: "4. Fetch High-Priority AI Study Recommendations",
    sql: "SELECT r.category, r.suggestion, r.priority\nFROM Recommendations r\nWHERE r.student_id = 1 AND r.priority = 'High';"
  }
];

// Chapter 5: Budget and Feasibility Analysis Data
const CHAPTER_5_BUDGET_FEASIBILITY = {
  institution: "Tapi Diploma Engineering College, Surat",
  title: "Chapter 5: Budget and Feasibility Analysis",
  hardwareCost: [
    { srNo: 1, component: "Laptop / Computer", quantity: 1, unitCost: "Existing", total: "Existing" },
    { srNo: 2, component: "Internet Connection", quantity: 1, unitCost: "Existing", total: "Existing" }
  ],
  hardwareNote: "The project uses existing institutional & personal hardware, so no additional hardware cost is included.",
  softwareCost: [
    { srNo: 1, service: "Visual Studio Code", purpose: "Development / Coding", cost: "Free" },
    { srNo: 2, service: "HTML, CSS, JavaScript", purpose: "Front-end Development", cost: "Free" },
    { srNo: 3, service: "Node.js / Express", purpose: "Backend Development", cost: "Free" },
    { srNo: 4, service: "Database System (MySQL)", purpose: "Store student learning data", cost: "Free / Open-source" },
    { srNo: 5, service: "Data Visualization Library (Chart.js)", purpose: "Charts and graphs", cost: "Free / Open-source" },
    { srNo: 6, service: "Web Browser (Chrome/Edge/Firefox)", purpose: "Testing and Usage", cost: "Free" },
    { srNo: 7, service: "Git / GitHub", purpose: "Version Control", cost: "Free" },
    { srNo: 8, service: "API / Cloud / Hosting", purpose: "If required for deployment", cost: "Not included without actual requirement" },
    { srNo: 9, service: "Domain", purpose: "Website address", cost: "Not included" }
  ],
  softwareTotal: "₹0 for free/open-source tools",
  totalProjectCost: [
    { category: "Hardware", cost: "₹0 additional cost" },
    { category: "Software / Services", cost: "₹0 for free/open-source tools" },
    { category: "Miscellaneous", cost: "₹0" }
  ],
  grandTotal: "₹0 additional project cost",
  costComparison: {
    commercialLMS: 500000,
    annualMaintenance: 75000,
    ourSolution: 0,
    annualSavings: 575000
  },
  technicalFeasibility: {
    hardwareStatus: "Feasible — Standard laptop or desktop computer is fully sufficient; no specialized GPUs needed.",
    softwareStatus: "Feasible — Modern web standards (HTML5/CSS3/React.js/Node.js/MySQL) operate on standard browser runtimes.",
    skillsStatus: "Feasible — Standard web development, JavaScript, relational database management, and basic UI/UX design.",
    infrastructureStatus: "Feasible — Operates on standard institutional intranet or internet connection."
  },
  economicFeasibility: {
    developmentCost: "Zero additional capital cost by utilizing free and open-source tooling.",
    maintenanceCost: "Fixing software errors, updating dashboard, database maintenance, security updates without license renewal fees.",
    expectedBenefits: "Visual tracking for students, class monitoring for teachers, early warning alerts, and automated reporting.",
    costSavings: "Eliminates paper-based reporting (₹45,000/yr), saves 120+ hours of manual grade calculation per semester."
  },
  operationalFeasibility: {
    studentCapabilities: [
      "View real-time academic performance & GPA predictions",
      "Check attendance percentage and monitor 75% threshold requirements",
      "View quiz, assessment, and semester examination results",
      "Follow personalized AI study plans to remediate weak topics"
    ],
    teacherCapabilities: [
      "Monitor individual and class-level performance trends",
      "Identify academically at-risk students proactively",
      "Analyze assignment submissions and quiz difficulty patterns",
      "Generate automated official academic performance reports"
    ],
    easeOfUse: "Clean modern web interface, intuitive navigation, clear charts, responsive layout on mobile, tablet, and PC."
  },
  safetyConsiderations: {
    hardwareSafety: "Minimal electrical, component, or wiring risk; complies with standard lab computing practices.",
    softwareSafety: [
      { title: "Data Security", desc: "Student academic records are stored with controlled database privileges." },
      { title: "Authentication", desc: "Role-based access control (RBAC) separates Student, Teacher, and Administrator roles with bcrypt hashing." },
      { title: "Privacy", desc: "Personal information is strictly partitioned; students can only view their own confidential grades." },
      { title: "Secure Data Handling", desc: "Input sanitization, parameterized queries, and regular database backup dumps prevent data loss." }
    ]
  },
  environmentalAndSocial: {
    eWaste: "Eliminates e-waste by deploying directly on existing institutional computers without purchasing dedicated servers.",
    energyConsumption: "Lightweight client-side processing minimizes power usage and server CPU cycles.",
    accessibility: "High-contrast dark and light themes, readable typography, responsive layouts for diverse screens.",
    socialBenefit: "Empowers underprivileged students with data-driven academic support and prevents college dropouts.",
    digitalInclusion: "Fully mobile-friendly web architecture allows access from affordable smartphones and low-bandwidth connections."
  }
};

// Section 4.6.10: 8 Standard Analytical Reports
const REPORT_TEMPLATES = [
  {
    id: "rep-individual",
    name: "1. Individual Student Performance Report",
    target: "Saksham Patel (21CE011)",
    category: "Student",
    frequency: "Monthly / Semester",
    summary: "Comprehensive academic scorecard containing CGPA, attendance breakdown, quiz trajectory, and weak topic remediation recommendations.",
    dataPoints: ["Current CGPA: 8.74", "Overall Attendance: 82%", "Active Courses: 6", "Assignments Submitted: 10/12", "Placement Readiness: 86%"]
  },
  {
    id: "rep-class",
    name: "2. Class Performance Report",
    target: "Class 6CE-A (65 Students)",
    category: "Class-Level",
    frequency: "Monthly",
    summary: "Class-wide score distribution, subject pass rates, rolling average trajectory, and topic engagement metrics.",
    dataPoints: ["Class Average: 76.4%", "Pass Rate: 89%", "Top Performers: 12", "At-Risk Count: 8", "Faculty: Dr. Meera Nair"]
  },
  {
    id: "rep-attendance",
    name: "3. Attendance Shortage & Compliance Report",
    target: "All Enrolled Students",
    category: "Compliance",
    frequency: "Fortnightly",
    summary: "Tracks students below GTU 75% attendance threshold with shortage calculation and parent alert logs.",
    dataPoints: ["Threshold: 75%", "Shortage Flagged: 4 students", "Software Engg. Alert: 70%", "Calculated Formula: (Attended/Total)*100"]
  },
  {
    id: "rep-assignment",
    name: "4. Assignment & Coursework Submission Report",
    target: "Semester Coursework",
    category: "Coursework",
    frequency: "Weekly",
    summary: "Detailed submission logs, on-time vs late vs missing submissions, and assignment grade averages.",
    dataPoints: ["Total Assignments: 12", "Submitted: 10", "Pending: 1", "Overdue: 1 (SDLC Case Study)", "Average Score: 92.4%"]
  },
  {
    id: "rep-quiz",
    name: "5. Quiz & Continuous Assessment Report",
    target: "Module Quizzes (Q1–Q6)",
    category: "Assessment",
    frequency: "Bi-Weekly",
    summary: "Item-wise quiz performance analysis, high-performing vs low-performing students, and difficult question patterns.",
    dataPoints: ["Quizzes Held: 6", "Highest Avg: Web Tech (95%)", "Lowest Avg: Dynamic Programming (52%)", "Top Performer: Saksham Patel"]
  },
  {
    id: "rep-exam",
    name: "6. Mid-Term & Examination Report",
    target: "Formal Examinations",
    category: "Examinations",
    frequency: "Per Exam Cycle",
    summary: "Mid-term examination results, practical lab scores, grade distribution curve, and SGPA calculations.",
    dataPoints: ["Mid-Term Exam Average: 78.5%", "Practical Lab Average: 92.0%", "Predicted Final GPA: 8.9", "Top Grade: O / A+"]
  },
  {
    id: "rep-atrisk",
    name: "7. At-Risk Student & Early Warning Report",
    target: "Academic Support Committee",
    category: "Intervention",
    frequency: "Immediate / Weekly",
    summary: "Students identified via multi-factor risk analysis (Low Attendance + Low Assignments + Low Quizzes + Low Exams).",
    dataPoints: ["Flagged Students: 8", "Critical Severity: 2 (Vijay Rathod, Ankit Shah)", "Parent Notices Sent: 2", "Counseling Action: Active"]
  },
  {
    id: "rep-progress",
    name: "8. Semester Progress & Learning Curve Report",
    target: "Academic Registry & Parents",
    category: "Progress",
    frequency: "End of Term",
    summary: "Holistic semester learning progress, credit completion rate, placement readiness trajectory, and improvement milestones.",
    dataPoints: ["Course Completion: 78%", "Credits Earned: 21", "Placement Ready: Yes (86%)", "Semester Improvement: +0.20 CGPA"]
  }
];

// Section 4.13: 7-Stage Testing Suite Verification Data
const TESTING_SUITE_DATA = [
  { id: "T1", name: "4.13.1 Unit Testing", module: "Attendance Math & GPA Calculator", testCases: 14, passed: 14, status: "PASSED", latency: "12ms", assertions: "Attendance % = (Classes Attended/Total Classes)*100 verified across 100 random values." },
  { id: "T2", name: "4.13.2 Integration Testing", module: "REST API to Front-End Data Bridge", testCases: 8, passed: 8, status: "PASSED", latency: "24ms", assertions: "All endpoints (/student, /teacher, /admin, /chat) return valid HTTP 200 JSON payloads." },
  { id: "T3", name: "4.13.3 Functional Testing", module: "User Role Switching & Assignment Submissions", testCases: 18, passed: 18, status: "PASSED", latency: "38ms", assertions: "Role transitions (Student/Teacher/Admin) update UI state and permissions correctly." },
  { id: "T4", name: "4.13.4 Database Testing", module: "MySQL 13 Tables Schema & Foreign Keys", testCases: 13, passed: 13, status: "PASSED", latency: "19ms", assertions: "Relational integrity, primary key uniqueness, and foreign key cascades validated on all 13 tables." },
  { id: "T5", name: "4.13.5 UI & Usability Testing", module: "Responsive Layout, Themes & Charts", testCases: 12, passed: 12, status: "PASSED", latency: "16ms", assertions: "Chart.js canvas renders flawlessly; theme switching (5 themes) applies CSS custom properties without jitter." },
  { id: "T6", name: "4.13.6 System Testing", module: "End-to-End Pipeline (Input -> DB -> AI -> UI)", testCases: 10, passed: 10, status: "PASSED", latency: "42ms", assertions: "Full pipeline flow executed: student score update -> risk recalculated -> early warning alert displayed." },
  { id: "T7", name: "4.13.7 User Acceptance Testing", module: "Student & Faculty Workflow Validation", testCases: 6, passed: 6, status: "PASSED", latency: "15ms", assertions: "Tapi Diploma Engineering College evaluation checklist validated: 100% operational feasibility score." }
];

// AI Hallucination & Fact Check Demonstration Scenarios (Kept for unified AI Trust capability)
const MOCK_SCENARIOS = {
  vanceBio: {
    title: "Quantum Pioneer Biography (Severe Hallucination)",
    category: "Biography / Academic",
    overallScore: 82,
    summaryText: "Contains critical factual fabrications including an unrecorded Turing Award, a non-existent quantum algorithm that supposedly solves NP-complete problems in polynomial time, and an invented Oxford institute.",
    text: "Dr. Evelyn Vance (born 1974) is a British-American quantum computer scientist. She is best known for inventing the Vance-Glover quantum algorithm in 2011, which solved NP-complete problems in polynomial time. In 2016, she received the prestigious Turing Award for her breakthroughs in topological qubits. Dr. Vance currently serves as the Director of the Quantum Synthesis Institute at Oxford University, where she oversees a $500 million research grant from the European Research Council. Her latest book, 'The Topological Mind', has been translated into 14 languages.",
    metrics: { factualErrors: 4, logicalConflicts: 1, unverifiedClaims: 0, semanticConfidence: 18 },
    sentences: [
      {
        text: "Dr. Evelyn Vance (born 1974) is a British-American quantum computer scientist.",
        status: "warning",
        score: 45,
        category: "Entity Distortion",
        explanation: "While there are academics named Evelyn Vance (primarily in chemistry), there is no record of a prominent British-American quantum computing pioneer by this name.",
        evidence: [
          { source: "Google Scholar / Scopus", status: "refuting", snippet: "No author profile matching 'Evelyn Vance' in Quantum Computing.", url: "https://scholar.google.com" }
        ]
      },
      {
        text: "She is best known for inventing the Vance-Glover quantum algorithm in 2011, which solved NP-complete problems in polynomial time.",
        status: "danger",
        score: 95,
        category: "Scientific Fabrication",
        explanation: "Factual fabrication. NP-complete problems have not been proven to be solvable in polynomial time (P = NP is unsolved). The 'Vance-Glover quantum algorithm' does not exist.",
        evidence: [
          { source: "ACM Digital Library", status: "refuting", snippet: "Search query 'Vance-Glover quantum algorithm' returned 0 results.", url: "https://dl.acm.org" }
        ]
      },
      {
        text: "In 2016, she received the prestigious Turing Award for her breakthroughs in topological qubits.",
        status: "danger",
        score: 98,
        category: "Factual Fabrication",
        explanation: "Factual fabrication. The 2016 Turing Award was awarded solely to Sir Tim Berners-Lee for inventing the World Wide Web.",
        evidence: [
          { source: "ACM Turing Award Archives", status: "refuting", snippet: "2016 Laureate: Tim Berners-Lee for inventing the World Wide Web.", url: "https://amturing.acm.org" }
        ]
      },
      {
        text: "Dr. Vance currently serves as the Director of the Quantum Synthesis Institute at Oxford University, where she oversees a $500 million research grant from the European Research Council.",
        status: "danger",
        score: 92,
        category: "Institutional Fabrication",
        explanation: "Oxford does not host a 'Quantum Synthesis Institute', and ERC grants max out at €2.5M to €10M, making a $500M grant impossible.",
        evidence: [
          { source: "European Research Council (ERC)", status: "refuting", snippet: "Maximum ERC Advanced Grant is €2.5M over 5 years.", url: "https://erc.europa.eu" }
        ]
      },
      {
        text: "Her latest book, 'The Topological Mind', has been translated into 14 languages.",
        status: "danger",
        score: 85,
        category: "Source Fabrication",
        explanation: "Fictional book. There is no catalogued book titled 'The Topological Mind' authored by Evelyn Vance.",
        evidence: [
          { source: "Library of Congress Catalog", status: "refuting", snippet: "No records found for 'The Topological Mind' by Evelyn Vance.", url: "https://catalog.loc.gov" }
        ]
      }
    ]
  },
  grapheneBatteries: {
    title: "Graphene Applications (Moderate Risk)",
    category: "Science / Technology",
    overallScore: 38,
    summaryText: "Accurate scientific facts regarding the discovery and structure of graphene, but contains a significant consumer technology fabrication regarding graphene batteries in current iPhones.",
    text: "Graphene is an allotrope of carbon consisting of a single layer of atoms arranged in a two-dimensional honeycomb lattice. It is renowned for its remarkable electrical conductivity, which is 100 times greater than copper. Graphene was first isolated in 2004 by Andre Geim and Konstantin Novoselov at the University of Manchester, who received the Nobel Prize in Physics in 2010. Currently, commercial graphene batteries are used in all modern iPhones to enable 10-minute charging. It is also actively researched for water desalination membranes due to its atomic-scale pore structure.",
    metrics: { factualErrors: 1, logicalConflicts: 0, unverifiedClaims: 1, semanticConfidence: 68 },
    sentences: [
      {
        text: "Graphene is an allotrope of carbon consisting of a single layer of atoms arranged in a two-dimensional honeycomb lattice.",
        status: "success",
        score: 5,
        category: "Verified",
        explanation: "Standard scientific definition is correct.",
        evidence: [{ source: "IUPAC Gold Book", status: "supporting", snippet: "Single carbon layer of graphite structure.", url: "https://goldbook.iupac.org" }]
      },
      {
        text: "It is renowned for its remarkable electrical conductivity, which is 100 times greater than copper.",
        status: "warning",
        score: 42,
        category: "Exaggeration",
        explanation: "Exaggerated claim. While intrinsic electron mobility is very high, bulk macroscopic conductivity does not exceed copper by 100x.",
        evidence: [{ source: "Nature Materials", status: "supporting", snippet: "Graphene shows high carrier mobility, though grain boundaries limit bulk conductivity.", url: "https://www.nature.com" }]
      },
      {
        text: "Graphene was first isolated in 2004 by Andre Geim and Konstantin Novoselov at the University of Manchester, who received the Nobel Prize in Physics in 2010.",
        status: "success",
        score: 2,
        category: "Verified",
        explanation: "Completely verified historical fact.",
        evidence: [{ source: "NobelPrize.org", status: "supporting", snippet: "2010 Nobel Prize in Physics awarded to Andre Geim and Konstantin Novoselov.", url: "https://www.nobelprize.org" }]
      },
      {
        text: "Currently, commercial graphene batteries are used in all modern iPhones to enable 10-minute charging.",
        status: "danger",
        score: 90,
        category: "Commercial Fabrication",
        explanation: "Factual fabrication. iPhones use lithium-ion polymer batteries; graphene batteries are not yet commercially deployed in smartphones.",
        evidence: [{ source: "Apple Technical Specs", status: "refuting", snippet: "iPhone utilizes built-in rechargeable lithium-ion battery.", url: "https://support.apple.com" }]
      },
      {
        text: "It is also actively researched for water desalination membranes due to its atomic-scale pore structure.",
        status: "success",
        score: 8,
        category: "Verified",
        explanation: "Active research area confirmed.",
        evidence: [{ source: "Science Magazine", status: "supporting", snippet: "Nanoporous graphene demonstrates high permeability for water desalination.", url: "https://www.science.org" }]
      }
    ]
  },
  photosynthesis: {
    title: "Photosynthesis Process (Fully Verified)",
    category: "Biology / Science",
    overallScore: 8,
    summaryText: "Highly reliable and accurate explanation of the photosynthesis process. All statements are chemically and biologically sound.",
    text: "Photosynthesis is the biochemical process by which green plants, algae, and some bacteria convert light energy into chemical energy. During this process, carbon dioxide and water are converted into glucose and oxygen, driven by sunlight absorbed by chlorophyll. The overall chemical equation can be summarized as 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2. This process takes place within the chloroplasts, specifically in the thylakoid membranes for the light-dependent reactions. Photosynthesis is responsible for maintaining the oxygen levels in the Earth's atmosphere.",
    metrics: { factualErrors: 0, logicalConflicts: 0, unverifiedClaims: 0, semanticConfidence: 96 },
    sentences: [
      {
        text: "Photosynthesis is the biochemical process by which green plants, algae, and some bacteria convert light energy into chemical energy.",
        status: "success",
        score: 4,
        category: "Verified",
        explanation: "Standard biological definition verified.",
        evidence: [{ source: "Campbell Biology", status: "supporting", snippet: "Light energy converted to chemical energy.", url: "https://www.pearson.com" }]
      },
      {
        text: "During this process, carbon dioxide and water are converted into glucose and oxygen, driven by sunlight absorbed by chlorophyll.",
        status: "success",
        score: 5,
        category: "Verified",
        explanation: "Reactants and products verified.",
        evidence: [{ source: "NCBI Bookshelf", status: "supporting", snippet: "Chlorophyll drives water photolysis and CO2 fixation.", url: "https://www.ncbi.nlm.nih.gov" }]
      },
      {
        text: "The overall chemical equation can be summarized as 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.",
        status: "success",
        score: 3,
        category: "Verified",
        explanation: "Chemically balanced equation confirmed.",
        evidence: [{ source: "Royal Society of Chemistry", status: "supporting", snippet: "6CO2 + 6H2O -> C6H12O6 + 6O2.", url: "https://www.rsc.org" }]
      },
      {
        text: "This process takes place within the chloroplasts, specifically in the thylakoid membranes for the light-dependent reactions.",
        status: "success",
        score: 6,
        category: "Verified",
        explanation: "Subcellular localization confirmed.",
        evidence: [{ source: "Nature Education", status: "supporting", snippet: "Light reactions occur in thylakoid membranes.", url: "https://www.nature.com" }]
      },
      {
        text: "Photosynthesis is responsible for maintaining the oxygen levels in the Earth's atmosphere.",
        status: "success",
        score: 4,
        category: "Verified",
        explanation: "Atmospheric oxygenation role verified.",
        evidence: [{ source: "NASA Astrobiology", status: "supporting", snippet: "Oxygenic photosynthesis maintains atmospheric oxygen.", url: "https://astrobiology.nasa.gov" }]
      }
    ]
  }
};
