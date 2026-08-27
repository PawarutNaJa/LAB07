const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    { from: /bg-white\/60/g, to: 'bg-white/60 dark:bg-zinc-900/60' },
    { from: /bg-zinc-50\/80/g, to: 'bg-zinc-50/80 dark:bg-zinc-900/80' },
    { from: /bg-zinc-50\/60/g, to: 'bg-zinc-50/60 dark:bg-zinc-900/60' },
    { from: /bg-zinc-50(?![\/\w])/g, to: 'bg-zinc-50 dark:bg-zinc-900' },
    { from: /bg-zinc-100\/80/g, to: 'bg-zinc-100/80 dark:bg-zinc-800/80' },
    { from: /bg-zinc-100(?![\/\w])/g, to: 'bg-zinc-100 dark:bg-zinc-800' },
    { from: /bg-zinc-200\/50/g, to: 'bg-zinc-200/50 dark:bg-zinc-800/50' },
    
    // borders
    { from: /border-white\/60/g, to: 'border-white/60 dark:border-zinc-800/60' },
    { from: /border-zinc-200\/90/g, to: 'border-zinc-200/90 dark:border-zinc-800/90' },
    { from: /border-zinc-200\/80/g, to: 'border-zinc-200/80 dark:border-zinc-800/80' },
    { from: /border-zinc-200\/70/g, to: 'border-zinc-200/70 dark:border-zinc-800/70' },
    { from: /border-zinc-200\/50/g, to: 'border-zinc-200/50 dark:border-zinc-800/50' },
    { from: /border-zinc-200(?![\/\w])/g, to: 'border-zinc-200 dark:border-zinc-800' },
    { from: /border-zinc-100(?![\/\w])/g, to: 'border-zinc-100 dark:border-zinc-800' },
    
    // text colors
    { from: /text-zinc-950/g, to: 'text-zinc-950 dark:text-zinc-50' },
    { from: /text-zinc-900/g, to: 'text-zinc-900 dark:text-zinc-100' },
    { from: /text-zinc-800/g, to: 'text-zinc-800 dark:text-zinc-200' },
    { from: /text-zinc-700/g, to: 'text-zinc-700 dark:text-zinc-300' },
    { from: /text-zinc-600/g, to: 'text-zinc-600 dark:text-zinc-400' },
    { from: /text-zinc-500/g, to: 'text-zinc-500 dark:text-zinc-400' },
    { from: /text-zinc-400/g, to: 'text-zinc-400 dark:text-zinc-500' },
    
    // solid bg colors (dots/buttons)
    { from: /bg-zinc-950/g, to: 'bg-zinc-950 dark:bg-zinc-100' },
    { from: /bg-zinc-900(?![\/\w])/g, to: 'bg-zinc-900 dark:bg-zinc-100' },
    { from: /text-white/g, to: 'text-white dark:text-zinc-950' },
    
    // hover states
    { from: /hover:bg-zinc-50/g, to: 'hover:bg-zinc-50 dark:hover:bg-zinc-800' },
    { from: /hover:bg-zinc-100/g, to: 'hover:bg-zinc-100 dark:hover:bg-zinc-800' },
    { from: /hover:bg-zinc-800/g, to: 'hover:bg-zinc-800 dark:hover:bg-zinc-200' },
    { from: /hover:border-zinc-300/g, to: 'hover:border-zinc-300 dark:hover:border-zinc-600' },
    { from: /hover:border-zinc-400/g, to: 'hover:border-zinc-400 dark:hover:border-zinc-600' },
    
    // special cases where dark variant is already applied (cleanup to prevent duplication)
    { from: /dark:bg-zinc-900\/60 dark:bg-zinc-900\/60/g, to: 'dark:bg-zinc-900/60' },
    { from: /dark:text-zinc-50 dark:text-zinc-50/g, to: 'dark:text-zinc-50' },
  ];

  let newContent = content;
  
  // Apply replacements
  for (const r of replacements) {
    newContent = newContent.replace(r.from, (match, p1, offset, string) => {
      // Avoid replacing if it already has dark: in front of it
      if (offset >= 5 && string.substring(offset - 5, offset) === 'dark:') {
        return match;
      }
      return r.to;
    });
  }

  // Double check some edge cases: 
  // "dark:text-white dark:text-zinc-950" -> "dark:text-zinc-950"
  newContent = newContent.replace(/dark:text-white dark:text-zinc-950/g, 'dark:text-white');
  newContent = newContent.replace(/dark:bg-zinc-50 dark:bg-zinc-900/g, 'dark:bg-zinc-50');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        traverse(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (!filePath.includes('layout.tsx')) { // we manually did layout
        processFile(filePath);
      }
    }
  }
}

traverse(path.join(__dirname, 'app'));
traverse(path.join(__dirname, 'components'));
