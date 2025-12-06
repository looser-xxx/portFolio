# Project Context: Portfolio/Gallery

## Project Overview
This project is a static web portfolio designed to showcase creative work with a "luxury" aesthetic. It features a main landing page (`index.html`) that links to individual project details. The design utilizes a dark matte black theme with metallic gold accents. It is built using standard HTML5, CSS3, and Vanilla JavaScript without external frameworks.

## Directory Structure
*   `index.html`: The main landing page. Contains the Hero section, a "Selected Works" grid linking to individual projects, and a Contact section.
*   `homeCss.css`: Styles specific to the landing page (`index.html`), including the hero animation, project cards, and the responsive contact section.
*   `homeJs.js`: JavaScript for the landing page, handling smooth scrolling and scroll-reveal animations for project cards and the contact section.
*   `project1.html` / `project2.html`: Individual project detail pages (formerly `pro_1.html` and `pro_2.html`). They display image galleries for specific projects.
*   `style.css`: The stylesheet for the individual project pages (`project1.html`, `project2.html`), defining the gallery grid and lightbox styles.
*   `script.js`: Shared JavaScript logic for the project pages, handling the Lightbox (image modal) and gallery animations.
*   `images/`: Stores local image assets.
*   `templetList.md`: A reference list of external resources for web templates.

## Building and Running
Since this is a static site, there is no build process.

**To Run:**
1.  Open `index.html` in any modern web browser to view the main portfolio.
    *   *Example:* Double-click the file in your file explorer or run `xdg-open index.html` (Linux).
2.  Navigate to specific projects by clicking "View Project" on the cards, or open `project1.html` / `project2.html` directly.

## Development Conventions

### HTML
*   **Semantics:** Uses semantic tags like `<header>`, `<main>`, `<section>`, and `<footer>`.
*   **Structure:** `index.html` serves as the hub, linking to detail pages.
*   **Forms:** The contact form uses standard inputs and a textarea, styled for a premium feel.

### CSS
*   **Theme:** Dark mode default (`#0b0b0b` background) with Gold accents (`#d4af37`).
*   **Files:** `homeCss.css` is for the landing page; `style.css` is for the gallery pages.
*   **Layout:**
    *   **Landing Page:** Uses Flexbox for the hero and Grid for the projects and contact sections. The contact section features a 2-column responsive layout.
    *   **Gallery Pages:** Uses CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(500px, 1fr))`) for the image layout.
*   **Responsiveness:** Mobile-responsive adjustments are handled via `@media` queries (e.g., stacking grids on smaller screens).

### JavaScript
*   **Execution:** All logic is wrapped in a `DOMContentLoaded` event listener.
*   **Performance:** Uses `IntersectionObserver` for efficient scroll-based animations (fade-ups) on both the home page and gallery pages.
*   **Interactivity:**
    *   **Home:** Smooth scrolling anchor links and hover effects on cards/buttons.
    *   **Gallery:** Custom Lightbox implementation for viewing full-size images.