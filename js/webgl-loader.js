/**
 * WebGL Project Loader
 * 
 * This script handles the logic for opening WebGL projects.
 * Since WebGL builds are often heavy, we usually want to load them 
 * in a separate container or iframe only when requested.
 */

// Example usage: <button onclick="openProject('projects/city-twin/index.html')">Play</button>

function openProject(url) {
    // Option 1: Open in new tab (safest for full screen WebGL)
    window.open(url, '_blank');

    // Option 2: Maximize an iframe overlay (for single page feel)
    // createOverlay(url);
}

function createOverlay(url) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#000';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close Project';
    closeBtn.style.padding = '10px';
    closeBtn.style.backgroundColor = '#333';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => document.body.removeChild(overlay);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    overlay.appendChild(closeBtn);
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
}
