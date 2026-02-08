# Aryan Kumar - Portfolio

A stunning tech-themed portfolio website with an Iron Man HUD aesthetic, showcasing engineering projects, VFX work, and interactive tools.

🔗 **Live:** [portfolio-weld-five-25.vercel.app](https://portfolio-weld-five-25.vercel.app/)

## Features

### 🎯 Three Display Modes
- **ENGINEERING** - Timeline of software projects with tech stacks
- **VFX / EDIT** - Gallery of video editing and VFX work
- **TOOLS** - Interactive physics simulations and utilities

### ✨ Visual Effects
- Typewriter animation on name
- Cursor-following flashlight effect on grid background
- 3D tilt effect on cards
- Animated Arc Reactor element
- Scanline animation
- Mode-specific color themes (Green/Red/Cyan)

### 🧪 Interactive Demos
- **Double Pendulum** - Chaotic motion with RK4 integration
- **N-Body Simulation** - Gravitational physics with multiple presets

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `E` | Engineering mode |
| `V` | VFX mode |
| `T` | Tools mode |
| `Esc` | Close contact modal |

## Project Structure
```
Site - portfolio/
├── index.html          # Main page
├── 404.html            # Error page
├── css/
│   └── core.css        # All styles (HUD theme)
├── js/
│   ├── data.js         # Projects & contact data
│   └── app.js          # Mode switching & interactions
├── tools/
│   ├── pendulum.html   # Double pendulum demo
│   └── nbody.html      # N-body simulation demo
└── assets/
    ├── vfx/            # VFX project thumbnails
    ├── resumes/        # Resume PDFs
    └── engineering/    # Engineering screenshots
```

## Running Locally
Simply open `index.html` in a modern browser. No build step required.

## Technologies
- Vanilla HTML/CSS/JavaScript
- Canvas API for physics simulations
- Google Fonts (Inter, Courier Prime)

## License
MIT
