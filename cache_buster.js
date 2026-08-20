const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'ytchnl-static');
const htmlFiles = ['index.html', 'services.html', 'contact.html', 'pinterest.html', 'youtube.html'];

const newVersion = Date.now();

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update styles.css cache buster
        content = content.replace(/styles\.css\?v=\d+/g, "styles.css?v=" + newVersion);
        
        // Add or update script.js cache buster
        content = content.replace(/script\.js(\?v=\d+)?/g, "script.js?v=" + newVersion);
        
        fs.writeFileSync(filePath, content);
        console.log("Updated cache buster in " + file);
    }
});
