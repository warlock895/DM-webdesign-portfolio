const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'ytchnl-static');
const htmlFiles = ['index.html', 'services.html', 'contact.html', 'pinterest.html', 'youtube.html'];

const menuToggleHTML = `
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
`;

// 1. Update HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Check if already added
        if (!content.includes('menu-toggle')) {
            // Replace <ul class="nav-links"> with the menu toggle + ul
            content = content.replace('<ul class="nav-links">', menuToggleHTML + '        <ul class="nav-links">');
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}`);
        }
    }
});

// 2. Update CSS
const cssPath = path.join(dir, 'styles.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    if (!cssContent.includes('.menu-toggle')) {
        const cssToAdd = `
/* Mobile Menu Toggle */
.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.menu-toggle .bar {
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    margin: 4px 0;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }
    
    .nav-links {
        display: none; 
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 80px; /* height of navbar */
        left: 0;
        background-color: var(--bg-color);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 0;
    }
    
    .nav-links.active {
        display: flex;
    }
    
    .nav-links li {
        margin: 1rem 0;
        text-align: center;
    }
}
`;
        // We need to remove the existing .nav-links { display: none; } inside the @media (max-width: 768px) block to avoid conflicts, or just append this to the very end since CSS cascades. Appending to the end will override previous rules.
        fs.appendFileSync(cssPath, cssToAdd);
        console.log('Updated styles.css');
    }
}

// 3. Update JS
const jsPath = path.join(dir, 'script.js');
const jsToAdd = `
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
`;
if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    if (!jsContent.includes('mobile-menu')) {
        fs.appendFileSync(jsPath, jsToAdd);
        console.log('Updated script.js');
    }
} else {
    fs.writeFileSync(jsPath, jsToAdd);
    console.log('Created script.js');
}
