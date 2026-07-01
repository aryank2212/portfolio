export const SITE = {
  name: "Aryan Kumar Rajput",
  initials: "AR",
  role: "AI/ML Engineer & Builder",
  email: "ak24682212@gmail.com",
  url: "https://aryanrajput.dev",
  socials: [
    { label: "Github", href: "https://github.com/aryank2212" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-kumar-rajput-13b308343/" },
    { label: "X", href: "https://x.com/aryan22_12" },
    { label: "Instagram", href: "https://www.instagram.com/aryan.d3v/" },
  ],
};

export const NAV_LINKS = [
  { id: "workloads", label: "Workloads", title: "Projects" },
  { id: "runtime", label: "Runtime", title: "About" },
  { id: "changelog", label: "Changelog", title: "Experience" },
  { id: "docs", label: "Docs", title: "Holy Tech Quotes" },
  { id: "peer-reviews", label: "Field Notes", title: "Field Notes" },
  { id: "connect", label: "Connect", title: "Contact" }
];

export const TECH = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face",
  "LangChain", "NumPy", "Pandas", "OpenCV", "C", "C++", "TypeScript",
  "Node.js", "React", "Next.js", "Linux", "Git", "Bash",
];

export interface Project {
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  featured: boolean;
  link: string;
  internalId: "streamline" | "lens" | "devkit";
}

export const PROJECTS: Project[] = [
  {
    title: "KAAL",
    category: "Multi-Agent Systems",
    description:
      "A hierarchical multi-agent framework for autonomous drone swarms — pairing GPS-free flocking (MARL) with an adversarial-patch anomaly detector so the swarm keeps flying even when vision is spoofed or signal is jammed.",
    impact: "Swarm MARL · adversarial defense",
    tags: ["Python", "MARL", "Computer Vision"],
    featured: true,
    link: "https://github.com/aryank2212/KAAL",
    internalId: "streamline",
  },
  {
    title: "KAAL (ASE)",
    category: "OSINT / Agents",
    description:
      "The All-Seeing Eye — an intelligent OSINT investigator that blends web scraping and social discovery with a local-LLM relevance loop to automate research and filter out the noise.",
    impact: "ML-guided OSINT · local LLM",
    tags: ["Python", "LLM", "Ollama"],
    featured: false,
    link: "https://github.com/aryank2212/KAAL_ASE_Release",
    internalId: "lens",
  },
  {
    title: "Infer",
    category: "AI Agent Framework",
    description:
      "A Python agent framework that turns complex objectives into executable plans. A decision engine, goal analyzer, and planner dispatch work to specialized worker agents that carry out the tasks.",
    impact: "Objective → plan → execution",
    tags: ["Python", "Agents", "FastAPI"],
    featured: false,
    link: "https://github.com/aryank2212/Infer",
    internalId: "devkit",
  },
  {
    title: "RedClove",
    category: "Side Project",
    description:
      "A multi-page marketing site with a terminal / hacker aesthetic. Built with React + Vite.",
    impact: "Live · React + Vite",
    tags: ["React", "Vite"],
    featured: false,
    link: "https://redclove.vercel.app/",
    internalId: "devkit",
  },
];

export interface Job {
  date: string;
  role: string;
  company: string;
  current: boolean;
  version: string;
  points: string[];
}

export const JOBS: Job[] = [
  {
    date: "2025–present",
    role: "Video Editor & VFX Artist",
    company: "Google Developer Groups, Dronacharaya College of Engineering, Gurugram",
    current: true,
    version: "v1.0",
    points: [
      "created eye catching and engaging instagram reels for gdg.",
      "Collaborated with the marketing team to create visually appealing graphics and videos for events.",
      "Worked on motion graphics and animations to enhance the user experience.",
    ],
  },
  {
    date: "2025–2025",
    role: "Video Editor",
    company: "Youth India Foundation",
    current: false,
    version: "v1.x",
    points: [
      "created edits for social media and events.",
      "collaborated with the marketing team to create visually appealing videos for events.",
    ],
  },
  {
    date: "2023–2024",
    role: "Video Editor & Motion Graphics Artist",
    company: "Freelance",
    current: false,
    version: "v1.0",
    points: [
      "created edits for social media and events.",
      "collaborated with the marketing team to create visually appealing videos for events.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    text: "He is a very good video editor and motion graphics artist. He has a keen eye for detail and a deep understanding of storytelling. I would highly recommend him for any video editing or motion graphics work.",
    name: "Manas Thakur",
    title: "President of Google Developer Groups, Dronacharaya College of Engineering, Gurugram",
  },
  {
    text: "He is a very good video editor and motion graphics artist. He has a keen eye for detail and a deep understanding of storytelling. I would highly recommend him for any video editing or motion graphics work.",
    name: "Abhishek Kumar",
    title: "Lead, Youth India Foundation",
  },
];

// #Holy_Tech_Quotes — straight from my GitHub profile.
export const QUOTES = [
  {
    text: "C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do, it blows your whole leg off.",
    tag: "C / C++",
  },
  {
    text: "A program which can't be written in JavaScript, will eventually be written in JavaScript.",
    tag: "JavaScript",
  },
  {
    text: "Machine learning taught me that anything can learn except me.",
    tag: "Machine Learning",
  },
  {
    text: "Python is the second-best language for everything.",
    tag: "Python",
  },
  {
    text: "git commit -m 'fix' — famous last words.",
    tag: "Git",
  },
  {
    text: "In order to understand recursion, you must first understand recursion.",
    tag: "Recursion",
  },
  {
    text: "C is the programming equivalent of Russian roulette with six bullets and a smile.",
    tag: "C",
  },
];

export const TERMINAL_LINES = [
  "$ whoami",
  "aryan — ai/ml engineer, builder, relentless learner",
  "$ cat values.txt",
  "curiosity · craft · first-principles · ship-it energy",
];

export const FACTS = [
  { label: "Location", value: "New Delhi, IN" },
  { label: "Languages", value: "English, Hindi" },
  { label: "Education", value: "B.Tech, Computer Science" },
  { label: "Favorite tools", value: "Neovim, Ollama, PyTorch" },
  { label: "Current obsession", value: "Multi-agent systems, MARL, LLMs" },
  { label: "Coffee status", value: "Always brewing" },
];