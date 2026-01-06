# Project Context: Portfolio/Gallery

## Project Overview
This project is a static web portfolio designed to showcase creative work with a "luxury" aesthetic. It features a main landing page (`index.html`) that links to individual project details. The design utilizes a dark matte black theme with metallic gold accents. It is built using standard HTML5, CSS3, and Vanilla JavaScript, with a strong focus on media optimization and performance.

## Directory Structure
*   `index.html`: The main landing page. Contains the Hero section, a "Selected Works" grid linking to individual projects, a specialized Showreel section, and a Contact section.
*   `style.css`: Styles specific to the landing page (`index.html`). Includes hero animation, project cards, responsive layout adjustments, and custom video player styling.
*   `script.js`: JavaScript for the landing page. Handles:
    *   Smooth scrolling and scroll-reveal animations.
    *   **Smart Showreel Logic:** Auto-play/mute on scroll, audio cross-fading, and interaction with custom controls.
    *   **YouTube Integration:** Logic to pause/mute local video when the external YouTube link is clicked.
*   `project1.html` / `project2.html`: Individual project detail pages featuring a modern **CSS Grid Mosaic layout** for image galleries. **Note:** These pages share a similar structure and the same stylesheet (`projectStyle.css`); modifications to one should generally be mirrored in the other to maintain consistency.
*   `project3.html`: **Platinum Series** project page. Features a distinct, seamless **Instagram-style grid** layout. This page is auto-generated via scripts.
*   `brandWorks.html`: **Private Portfolio Page.** A separate page featuring a 3x3 video grid of brand works in 9:16 vertical format.
    *   **One-Way Access:** This page is intentionally isolated; `index.html` does **not** link to it. Users must have the direct link to access it, but can return to the homepage via "Back to Homepage" buttons.
    *   `brandWorks.css`: Dedicated styles for this page, maintaining the dark/gold theme but with specific grid layouts (69vw width).
*   `projectStyle.css`: Stylesheet for individual project pages. Contains specific overrides for the Platinum Series seamless grid (`.masonry-container.three-col`).
*   `projectScript.js`: Shared logic for project pages, primarily handling the Lightbox (image modal) and scroll animations.
*   `scripts/`: Contains Python automation scripts.
    *   `generate_gallery.py`: Generates the `project3.html` file, handling image ordering, layout structure, and sticky navigation injection.
*   `images/`: Stores **web-optimized WebP image assets**.
*   `videos/`: Stores highly optimized video assets in dual formats for maximum compatibility and performance.
    *   `backGrounds/`:
        *   `hero_bg.webm` & `hero_bg.mp4`: ~2MB optimized background loops (1080p/720p scaled).
    *   `showReel/`:
        *   `showReel.webm` & `showReel.mp4`: ~5MB high-quality vertical showreel videos (VP9/H.264).

## Building and Running
Since this is a static site, there is no build process.

**To Run Locally:**
1.  Open a terminal in the project root directory.
2.  Run the Python server: `python3 run_server.py`
3.  Open `http://localhost:8000` in any modern web browser.

## Development Conventions

### HTML
*   **Semantics:** Uses semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`).
*   **Video Strategy:** Uses the `<video>` tag with multiple `<source>` elements (WebM first, then MP4) to ensure the best compression (VP9) is used on supported browsers while maintaining H.264 compatibility.
*   **Structure:**
    *   **Hero:** Full-screen (`min-height: 100vh`) section with an absolute-positioned background video.
    *   **Showreel:** Contains a vertical video wrapper styled to look like a mobile device, with custom playback controls.

### CSS
*   **Theme:** Dark mode default (`#0b0b0b` background) with Gold accents (`#d4af37`).
*   **Fonts:** **'Montserrat'** for a modern, premium feel.
*   **Responsive Design:**
    *   **Hero:** Uses Flexbox for robust centering and `min-height: 100vh` to prevent content collapse on mobile.
    *   **Typography:** fluid font sizes and media queries (`@media (max-width: 768px)`) to adjust headings and spacing for smaller screens.
    *   **Grids:** Project grids stack to single columns on mobile.

### JavaScript
*   **Performance:** Extensive use of `IntersectionObserver` for efficient scroll-based interactions (animations, auto-playing video).
*   **Showreel Logic:**
    *   **Auto-Play/Mute:** The video automatically plays and un-mutes (with a smooth volume fade-in) when scrolled into view (>50% visibility) and mutes/fades out when scrolled away.
    *   **User Override:** If the user manually mutes the video, it stays muted until they explicitly unmute it or click "View Showreel".
    *   **External Link:** Clicking "Watch on YouTube" automatically pauses and mutes the local video to prevent audio clash.