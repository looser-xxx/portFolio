# Project Context: Portfolio/Gallery

## Project Overview
This project is a static web portfolio designed to showcase creative work with a "luxury" aesthetic. It features a main landing page (`index.html`) that links to individual project details. The design utilizes a dark matte black theme with metallic gold accents. It is built using standard HTML5, CSS3, and Vanilla JavaScript without external frameworks.

## Directory Structure
*   `index.html`: The main landing page. Contains the Hero section, a "Selected Works" grid linking to individual projects, and a Contact section.
*   `style.css`: Styles specific to the landing page (`index.html`), including the hero animation, project cards, and the responsive contact section. (Formerly `homeCss.css`).
*   `script.js`: JavaScript for the landing page, handling smooth scrolling and scroll-reveal animations for project cards and the contact section. (Formerly `homeJs.js`). Now includes logic for the **Showreel Video Switcher** (synchronized playback, sequential cross-fade transitions).
*   `project1.html` / `project2.html`: Individual project detail pages. These now feature a modern **CSS Grid Mosaic layout** for image galleries.
*   `projectStyle.css`: The stylesheet for the individual project pages (`project1.html`, `project2.html`), defining the new mosaic grid, lightbox styles, and general project page theme. (Formerly `style.css`).
*   `projectScript.js`: Shared JavaScript logic for the project pages, handling the Lightbox (image modal) and scroll-reveal animations for gallery items. (Formerly `script.js`).
*   `images/`: Stores **web-optimized WebP image assets** (compressed to <100KB, max 1920px on longest side). Original heavy PNGs have been replaced.
*   `videos/`: Stores video assets.
    *   `backGrounds/hero_bg.mp4`: Optimized H.264 background video for the hero section (transcoded from high-quality EXR sequence).
    *   `showReel/`: Contains the synchronized showreel layers: `beauty.mp4`, `ambientOcclusion.mp4`, `viewPort.mp4`, `color.mp4`, `gloss.mp4`, `wire.mp4`.
*   `templetList.md`: A reference list of external resources for web templates.
*   `run_server.py`: A Python script to easily run a local development server for the static site.

## Building and Running
Since this is a static site, there is no build process.

**To Run Locally:**
1.  Open a terminal in the project root directory.
2.  Run the Python server: `python3 run_server.py`
3.  Open `http://localhost:8000` in any modern web browser to view the main portfolio.
4.  Navigate to specific projects by clicking "View Project" on the cards, or directly open `http://localhost:8000/project1.html` / `http://localhost:8000/project2.html`.

**To Run on a Server (e.g., via Cloudflare Tunnel):**
1.  Ensure Python3 is installed.
2.  Clone the repository: `git clone https://github.com/looser-xxx/portFolio.git` (if not already done).
3.  Navigate into the project directory: `cd portFolio`.
4.  Start the Python server in the background: `nohup python3 run_server.py &`
5.  Use a tunneling service (e.g., Cloudflare Tunnel) to expose port `8000` to the internet.

## Development Conventions

### HTML
*   **Semantics:** Uses semantic tags like `<header>`, `<main>`, `<section>`, and `<footer>`.
*   **Structure:** `index.html` serves as the hub, linking to detail pages. The "Showreel" section is now fully functional, featuring a custom video player that allows switching between different render passes (Beauty, AO, Wireframe, etc.) while maintaining playback synchronization.
*   **Forms:** The contact form has been removed.
*   **Images:** Image sources have been updated to optimized `.webp` formats.

### CSS
*   **Theme:** Dark mode default (`#0b0b0b` background) with Gold accents (`#d4af37`).
*   **Fonts:** Uses **'Montserrat'** for a modern, premium, and readable aesthetic across the site.
*   **Files:** `style.css` is for the landing page; `projectStyle.css` is for the gallery pages.
*   **Layout:**
    *   **Landing Page (`index.html`):** Uses Flexbox for the hero and Grid for the projects. The Showreel section uses a specific full-width layout with a centered 80vw video container.
    *   **Gallery Pages (`project1.html`, `project2.html`):** Now utilize a **CSS Grid Mosaic layout** (`grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); grid-auto-rows: 500px; grid-auto-flow: dense;`) to display images with varying sizes (wide, tall, big) for a dynamic, professional feel. The container covers approximately 85% of the screen width.
*   **Responsiveness:** Mobile-responsive adjustments are handled via `@media` queries (e.g., stacking grids on smaller screens for project galleries).
*   **Interactivity:** Refined hover effects on buttons and gallery images (scaling zoom, no dimming). Social links use Font Awesome icons with hover effects.

### JavaScript
*   **Execution:** All logic is wrapped in a `DOMContentLoaded` event listener.
*   **Performance:** Uses `IntersectionObserver` for efficient scroll-based animations (fade-ups) on the home page and individual gallery items.
*   **Interactivity:**
    *   **Home:** Smooth scrolling anchor links and hover effects on cards/buttons.
    *   **Showreel:** Displays a single high-quality vertical showreel video (`videos/showReel/showReel.mp4`) within a stylized mobile-view container. The section features a blurred background video for depth and a smooth scroll-to behavior from the hero section.
    *   **Gallery Pages:** Custom Lightbox implementation for viewing full-size images on click, with no overlay icon on hover.
