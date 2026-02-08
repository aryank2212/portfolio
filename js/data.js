const portfolioData = {
  engineering: [
    {
      year: "2025",
      title: "Hierarchical Multi-Agent Framework",
      tag: "AI Research Paper",
      desc: "Proposed a sovereign AI architecture for sustainable software development, minimizing token usage via specialized agent roles.",
      tech: ["LLMs", "Python", "System Design"],
      link: "https://github.com/aryank2212/A-Hierarchical-Multi-Agent-Framework-for-Sustainable-and-Autonomous-Software-Development"
    },
    {
      year: "2026",
      title: "Format Converter",
      tag: "Full-Stack",
      desc: "Self-hosted file converter with modern web UI. Convert images, transcode videos, and extract audio — all processing on your server.",
      tech: ["Node.js", "Express", "FFmpeg", "Sharp"],
      link: "https://github.com/aryank2212/format-converter"
    },
    {
      year: "2026",
      title: "N-Body Gravitational Simulation",
      tag: "C & Physics",
      desc: "A simple N-body gravitational simulation written in C using Newtonian mechanics.",
      tech: ["C", "Physics"],
      link: "https://github.com/aryank2212/n-body-simulation-c"
    },
    {
      year: "2026",
      title: "Double Pendulum Simulation",
      tag: "C & Python",
      desc: "A numerical simulation of a double pendulum using Runge-Kutta 4 integration. A classic example of deterministic chaos.",
      tech: ["C", "Physics", "Python"],
      link: "https://github.com/aryank2212/double-pendulum-c"
    },
    {
      year: "2026",
      title: "Text Editor Core",
      tag: "C Data Structures",
      desc: "Text buffer implementation with gap-buffer data structure and undo/redo stack. Core engine for building text editors.",
      tech: ["C", "Data Structures"],
      link: "https://github.com/aryank2212/win-text-editor-core"
    },
    {
      year: "2026",
      title: "Number Guessing Game",
      tag: "C Basics",
      desc: "Terminal-based game showcasing C fundamentals, random number generation, and user input handling.",
      tech: ["C"],
      link: "https://github.com/aryank2212/number-guessing-game-c"
    }
  ],

  vfx: [
    {
      title: "Portfolio",
      role: "Editor / Compositor",
      desc: "My portfolio showcasing my journey and experience as an editor.",
      tools: ["After Effects", "Premiere Pro"],
      image: "assets/vfx/project1_thumb.jpg",
      link: "https://drive.google.com/drive/folders/1mBeqyZXw7U6-PZ-nMQgfzfZwjknV3V_B"
    },
    {
      title: "Empowering Tomorrow",
      role: "Editor / Compositor",
      desc: "Reel on empowering young students from villages.",
      tools: ["After Effects", "Premiere Pro"],
      image: "assets/vfx/project1_thumb.jpg",
      link: "https://drive.google.com/file/d/1IItSDU-MV_NThhI207Y9isYetKMR06W7/view"
    },
    {
      title: "Atmospheric Horror Concept",
      role: "Editor / Compositor",
      desc: "Color grading and sound design inspired by True Detective aesthetics.",
      tools: ["After Effects", "DaVinci Resolve"],
      image: "assets/vfx/project1_thumb.jpg",
      link: "https://youtube.com/..."
    },
    {
      title: "Combat Sim Cinematics",
      role: "Director",
      desc: "High-fidelity flight recording and cinematic editing using DCS World.",
      tools: ["DCS World", "Premiere Pro"],
      image: "assets/vfx/project2_thumb.jpg",
      link: "https://youtube.com/..."
    }
  ],

  tools: [
    {
      id: "pendulum",
      title: "Double Pendulum",
      icon: "🔄",
      desc: "Interactive chaotic motion with adjustable parameters. Control rod lengths, masses, gravity, and watch deterministic chaos unfold.",
      hasDemo: true,
      demoUrl: "tools/pendulum.html",
      github: "https://github.com/aryank2212/double-pendulum-c"
    },
    {
      id: "nbody",
      title: "N-Body Simulation",
      icon: "🌌",
      desc: "Click to add bodies, right-click for stars. Features zoom, pan, velocity vectors, and 6 presets including galaxy collision.",
      hasDemo: true,
      demoUrl: "tools/nbody.html",
      github: "https://github.com/aryank2212/n-body-simulation-c"
    },
    {
      id: "network",
      title: "Network Radar",
      icon: "📡",
      desc: "Live packet visualization with radar sweep animation. Monitor simulated TCP, UDP, HTTP, and HTTPS traffic in real-time.",
      hasDemo: true,
      demoUrl: "tools/network.html"
    },
    {
      id: "notes",
      title: "Notes",
      icon: "📝",
      desc: "Markdown note-taking with split-view editing. Auto-saves to localStorage with live preview.",
      hasDemo: true,
      demoUrl: "tools/notes.html"
    },
    {
      id: "playground",
      title: "Code Playground",
      icon: "💻",
      desc: "Live HTML/CSS/JS editor with instant preview, console output, and starter templates.",
      hasDemo: true,
      demoUrl: "tools/playground.html"
    },
    {
      id: "finance",
      title: "Finance Visualizer",
      icon: "💰",
      desc: "Personal budget tracker with charts, expense breakdown by category, and savings rate calculation.",
      hasDemo: true,
      demoUrl: "tools/finance.html"
    },
    {
      id: "converter",
      title: "Format Converter",
      icon: "🔧",
      desc: "Full-stack file converter with metadata extraction, format analysis, and PDF toolkit. Requires Node.js backend.",
      hasDemo: false,
      github: "https://github.com/aryank2212/format-converter"
    }
  ],

  contact: {
    email: "ak24682212@gmail.com",
    linkedin: "https://www.linkedin.com/in/aryan-kumar-rajput-13b308343/",
    github: "https://github.com/aryank2212",
    location: "New Delhi, India"
  }
};

// Export for both module and global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}

// Global references for app.js
const engineeringData = portfolioData.engineering;
const vfxData = portfolioData.vfx;
const toolsData = portfolioData.tools;
const contactInfo = portfolioData.contact;
