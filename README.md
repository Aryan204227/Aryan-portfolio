# Aryan Dadwal — Full Stack Developer Portfolio

A personal developer portfolio built for **Aryan Dadwal** (Full Stack Developer & Computer Science Student at Lovely Professional University).

Built with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide React**.

---

## 📁 Repository Structure

```text
Aryan-Portfolio/
├── Aryan_Dadwal_CV.pdf                 # Original CV source of truth
├── Aryan_Dadwal_Professional_Resume.pdf # Final resume linked to download button
├── aryan-profile.jpg                   # Authentic professional portrait
├── public/                             # Public static assets
│   ├── aryan-profile.jpg
│   ├── Aryan_Dadwal_Professional_Resume.pdf
│   ├── Aryan_Dadwal_CV.pdf
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx                  # Footer with verified links & back-to-top
│   │   ├── Navbar.jsx                  # Sticky navigation + mobile drawer
│   │   ├── ProjectModal.jsx            # Deep architecture & testing metrics modal
│   │   ├── ScrollProgress.jsx          # Top scroll progress bar
│   │   ├── TechBadge.jsx               # Reusable tech pill with icon
│   │   └── WhatsAppFloat.jsx           # Floating WhatsApp CTA button
│   ├── data/
│   │   └── portfolioData.js            # Single source of truth from CV
│   ├── sections/
│   │   ├── About.jsx                   # Education, MERN & algorithmic focus
│   │   ├── Certificates.jsx            # Infosys, WNS, Code Storm Hackathon
│   │   ├── Contact.jsx                 # Direct WhatsApp, Email, LinkedIn, GitHub
│   │   ├── Education.jsx               # Vertical timeline: LPU & High School
│   │   ├── Hero.jsx                    # Hero with authentic photo & key CTAs
│   │   ├── Highlights.jsx              # Core engineering pillars
│   │   ├── Projects.jsx                # Exactly 3 projects with real metrics
│   │   └── Skills.jsx                  # Categorized skills without fake percentages
│   ├── App.jsx                         # Main application container
│   ├── index.css                       # Tailwind directives & glassmorphic styling
│   └── main.jsx                        # React root entry point
├── index.html                          # Complete SEO meta tags & typography
├── tailwind.config.js                  # Custom dark theme color palette
└── vite.config.js                      # Vite configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎯 Verified Highlights & Sources
* **No fake projects or stats:** Contains strictly the 3 verified projects:
  1. **Career Guidance System** (React, Node, Express, MongoDB, 12 aptitude questions, 22 careers)
  2. **Maze Solver** (Java, Swing, AWT, DFS, Backtracking, 15×15 grid, 172 visited nodes, 79 recursion depth, 17.259s solving time)
  3. **StockSense AI** (JavaScript, Node.js, Decoupled client-server)
* **Real Documents:** Official Resume PDF attached to download button.
* **Direct WhatsApp Integration:** Uses standard `https://wa.me/918626963353` with pre-filled message.
