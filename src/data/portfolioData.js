export const portfolioData = {
  personalInfo: {
    name: "Aryan Dadwal",
    title: "Full Stack Developer",
    subtitle: "Computer Science Student & Software Engineer",
    summary:
      "Computer Science student and Full Stack Developer focused on building practical web applications, AI-powered solutions, and algorithmic systems. Experienced in MERN stack architecture, Java & DSA, and decoupled cloud deployments.",
    email: "aryandadwal709@gmail.com",
    phone: "+91 8626963353",
    location: "Punjab / Himachal Pradesh, India",
    university: "Lovely Professional University, Phagwara, Punjab",
    degree: "B.Tech in Computer Science and Engineering",
    cgpa: "7.07",
    status: "Available for Internships & Full-time Roles",
    profileImage: "/aryan-profile.jpg",
    resumePdf: "/Aryan_Dadwal_Professional_Resume.pdf",
    cvPdf: "/Aryan_Dadwal_CV.pdf",
    whatsAppUrl: "https://wa.me/918626963353?text=Hi%20Aryan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you."
  },

  socialLinks: {
    linkedin: "https://www.linkedin.com/in/aryan-dadwal-cse/",
    github: "https://github.com/Aryan204227",
    email: "mailto:aryandadwal709@gmail.com",
    whatsapp: "https://wa.me/918626963353?text=Hi%20Aryan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.",
    phone: "tel:+918626963353"
  },

  skills: {
    languages: [
      { name: "JavaScript", category: "Languages", icon: "Code2" },
      { name: "TypeScript", category: "Languages", icon: "FileCode" },
      { name: "Java", category: "Languages", icon: "Coffee" },
      { name: "C++", category: "Languages", icon: "Cpu" },
      { name: "C", category: "Languages", icon: "Binary" },
      { name: "Python", category: "Languages", icon: "Terminal" }
    ],
    webFrameworks: [
      { name: "React.js", category: "Web & Frameworks", icon: "Atom" },
      { name: "Node.js", category: "Web & Frameworks", icon: "Server" },
      { name: "Express.js", category: "Web & Frameworks", icon: "Network" },
      { name: "HTML5", category: "Web & Frameworks", icon: "Layout" },
      { name: "CSS3", category: "Web & Frameworks", icon: "Palette" },
      { name: "Vite", category: "Web & Frameworks", icon: "Zap" },
      { name: "Tailwind CSS", category: "Web & Frameworks", icon: "Sparkles" },
      { name: "REST APIs", category: "Web & Frameworks", icon: "Webhook" }
    ],
    toolsDatabase: [
      { name: "Git", category: "Tools & Database", icon: "GitBranch" },
      { name: "GitHub", category: "Tools & Database", icon: "GitCommit" },
      { name: "Render", category: "Tools & Database", icon: "Cloud" },
      { name: "MongoDB", category: "Tools & Database", icon: "Database" },
      { name: "DBMS", category: "Tools & Database", icon: "HardDrive" }
    ],
    csFundamentals: [
      { name: "Data Structures & Algorithms", category: "CS Fundamentals", icon: "Brain" },
      { name: "Recursion & Backtracking", category: "CS Fundamentals", icon: "Repeat" },
      { name: "DFS (Depth First Search)", category: "CS Fundamentals", icon: "GitFork" },
      { name: "Object-Oriented Programming (OOP)", category: "CS Fundamentals", icon: "Boxes" },
      { name: "DBMS & SQL", category: "CS Fundamentals", icon: "TableProperties" },
      { name: "Multithreading", category: "CS Fundamentals", icon: "Workflow" }
    ],
    softSkills: [
      { name: "Problem-Solving", category: "Professional Strengths", icon: "CheckCircle2" },
      { name: "Time Management", category: "Professional Strengths", icon: "Clock" },
      { name: "Adaptability", category: "Professional Strengths", icon: "Compass" }
    ]
  },

  projects: [
    {
      id: "career-guidance-system",
      number: "01",
      title: "Career Guidance System",
      date: "Apr 2026",
      tagline: "AI-driven career counselling & aptitude-analysis platform built on the MERN stack.",
      summary:
        "Architected an AI-driven career counselling and aptitude-analysis platform on the MERN stack to help students make informed career choices, covering 12 aptitude questions across 4 assessment categories.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "MERN Stack", "Render"],
      github: "https://github.com/Aryan204227/career-guidance-system",
      live: "https://career-guidance-system-l855.onrender.com/",
      isFeatured: true,
      features: [
        "12 structured aptitude assessment questions spanning 4 key evaluation categories",
        "Weighted-sum matching algorithm calculating tailored fit scores for 22 distinct career trajectories",
        "Decoupled frontend & backend services with clean separation of concerns and RESTful endpoints",
        "Persistent user session & test scoring integration using MongoDB",
        "Production-deployed on Render with responsive, client-side UX"
      ],
      architecture: "Modular MERN Stack (React Single Page App client + Express/Node.js API + MongoDB Database)",
      metrics: [
        { label: "Aptitude Questions", value: "12 Questions" },
        { label: "Assessment Categories", value: "4 Domains" },
        { label: "Career Options", value: "22 Paths" },
        { label: "Scoring Engine", value: "Weighted-Sum" }
      ]
    },
    {
      id: "maze-solver",
      number: "02",
      title: "Maze Solver",
      date: "Jul 2026",
      tagline: "Desktop Java maze generator & pathfinding visualizer using DFS & recursive backtracking.",
      summary:
        "Created a Java desktop maze solver using DFS and recursive backtracking, tested on a 15×15 maze grid. Features live pathfinding animations, dynamic wall toggling, and real-time execution statistics.",
      tags: ["Java", "Swing", "AWT", "DFS", "Backtracking", "Java2D"],
      github: "https://github.com/Aryan204227/Maze-Solver",
      live: null,
      isFeatured: false,
      features: [
        "Interactive maze grid supporting custom wall editing, start/end point selection, and grid reset",
        "Pathfinding engine leveraging Depth First Search (DFS) and recursive state backtracking",
        "Real-time visual animation of exploring search paths rendered with Java2D & Swing/AWT",
        "Live diagnostic HUD displaying visited nodes, current recursion depth, and execution elapsed time",
        "Benchmarked on a 15×15 maze grid with verifiable deterministic execution"
      ],
      architecture: "Java Desktop GUI (Java2D / Swing event-dispatching loop with recursive algorithm engine)",
      metrics: [
        { label: "Benchmark Grid", value: "15×15 Grid" },
        { label: "Visited Nodes", value: "172 Nodes" },
        { label: "Max Recursion Depth", value: "79 Levels" },
        { label: "Solving Time", value: "17.259s" },
        { label: "Optimal Path", value: "29 Steps" }
      ]
    },
    {
      id: "stocksense-ai",
      number: "03",
      title: "StockSense AI",
      date: "Apr 2026",
      tagline: "AI-powered stock market sentiment-analysis chatbot with decoupled architecture.",
      summary:
        "Developed an AI-powered stock market sentiment-analysis chatbot built on a decoupled client-server architecture. Structured independent client and server modules to simplify development, testing, and deployment cycles.",
      tags: ["JavaScript", "Node.js", "Express.js", "AI Chatbot", "Sentiment Analysis", "Render"],
      github: "https://github.com/Aryan204227/stocksense-ai",
      live: "https://stocksense-ai-r24w.onrender.com/",
      isFeatured: false,
      features: [
        "Conversational AI interface delivering contextual sentiment analysis on market trends and stocks",
        "Decoupled client-server modular architecture ensuring clean isolation and zero-dependency coupling",
        "Streamlined API endpoints designed for rapid query response and easy extensibility",
        "End-to-end version control on GitHub with structured modular directory organization",
        "Production cloud deployment on Render for seamless public accessibility"
      ],
      architecture: "Decoupled Client-Server (Independent Frontend UI + Node.js API processing service)",
      metrics: [
        { label: "Architecture", value: "Decoupled" },
        { label: "Backend Core", value: "Node.js" },
        { label: "Deployment", value: "Render Cloud" },
        { label: "Version Control", value: "GitHub Managed" }
      ]
    }
  ],

  training: [
    {
      title: "Job Ready DSA Boot Camp Using Java (With LeetCode)",
      organization: "Eduniketan Private Limited / TheEduBootCamp",
      duration: "Jun 2026 – Jul 2026",
      topics: [
        "Arrays & Matrices",
        "Recursion & Backtracking",
        "Problem Solving Fundamentals",
        "Coding Efficiency & Time/Space Optimization",
        "Interview Readiness & Pattern Recognition"
      ],
      description:
        "Completed an intensive DSA boot camp in Java, solving structured problem sets on LeetCode to build strong problem-solving fundamentals. Practiced core data-structure and algorithm patterns including arrays, recursion, and backtracking under guided instruction and strengthened coding efficiency and interview readiness.",
      certificateUrl: "https://drive.google.com/file/d/1oFLpPiIKxd1TkzgK49i0SQRCVR2NSlTf/view?usp=sharing"
    }
  ],

  certificates: [
    {
      id: "cpp-infosys",
      title: "Programming Using C++",
      organization: "Infosys Springboard",
      date: "Aug 2025",
      description: "Demonstrated mastery of C++ syntax, object-oriented concepts, memory handling, and algorithmic problem solving through Infosys Springboard curriculum.",
      url: "https://drive.google.com/file/d/1Ire_dgcS6KyFEWtfFGzcCR736dPcp0Ld/view?usp=sharing"
    },
    {
      id: "cybersmart-wns",
      title: 'CSR Internship – "CyberSmart Awareness"',
      organization: "WNS Cares Foundation",
      date: "Aug 2025",
      description: "Completed social responsibility internship focused on cyber hygiene, digital threat mitigation, and online safety awareness.",
      url: "https://drive.google.com/file/d/1cqwuX66tpbwr920Ra_VnjhsTOQODlmkm/view?usp=drive_link"
    },
    {
      id: "codestorm-hackathon",
      title: "CODE STORM 36-Hour Hackathon",
      organization: "Spirit Organisation × Microsoft Student Ambassadors",
      date: "Jun 2025",
      description: "Participated in an intense 36-hour continuous hackathon developing innovative tech solutions under tight deadlines and collaborative team conditions.",
      url: "https://drive.google.com/file/d/1ufNiNbsB2_O0t2_uUfamYjVoC4rVTQen/view?usp=drive_link"
    }
  ],

  education: [
    {
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      period: "Aug 2024 – Present",
      grade: "CGPA: 7.07",
      isCurrent: true,
      highlights: [
        "Core coursework in Data Structures, Algorithms, DBMS, OOP, and Web Technologies",
        "Active member of developer and algorithmic problem-solving communities"
      ]
    },
    {
      institution: "Tagore Model Sen Sec School",
      location: "Rehan, Himachal Pradesh",
      degree: "Intermediate (12th Grade)",
      field: "Non-Medical / Science Stream",
      period: "Apr 2022 – Jun 2024",
      grade: "Percentage: 88%",
      isCurrent: false,
      highlights: [
        "Academic excellence with 88% overall aggregate",
        "Strong foundation in Mathematics, Physics, and analytical logic"
      ]
    },
    {
      institution: "Tagore Model Sen Sec School",
      location: "Rehan, Himachal Pradesh",
      degree: "Matriculation (10th Grade)",
      field: "Secondary School Examination",
      period: "Apr 2021 – Jun 2022",
      grade: "Percentage: 89%",
      isCurrent: false,
      highlights: [
        "Graduated with high distinction achieving 89% aggregate score"
      ]
    }
  ],

  highlights: [
    {
      title: "Full Stack MERN Development",
      description: "Building production-ready web apps with React, Node.js, Express, and MongoDB with clean client-server decoupling.",
      icon: "Layers"
    },
    {
      title: "Java & Algorithmic Problem Solving",
      description: "Solid grasp of Data Structures, recursion, backtracking, and DFS with structured LeetCode problem-solving practice.",
      icon: "Binary"
    },
    {
      title: "Decoupled Cloud Architecture",
      description: "Experience deploying independent frontend and backend cloud services on Render with modular maintainability.",
      icon: "Cloud"
    },
    {
      title: "Clean Code & Version Control",
      description: "Structured Git & GitHub workflow with disciplined commit history, modular directory structures, and clear separation of concerns.",
      icon: "GitBranch"
    }
  ]
};
