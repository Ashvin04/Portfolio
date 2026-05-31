import fs from 'fs';

const xmlPath = 'd:/Projects/Portfolio/KnockOutDocumentation/temp_extracted/word/document.xml';
const relsPath = 'd:/Projects/Portfolio/KnockOutDocumentation/temp_extracted/word/_rels/document.xml.rels';

const xmlContent = fs.readFileSync(xmlPath, 'utf8');
const relsContent = fs.readFileSync(relsPath, 'utf8');

const relations = {};
const relRegex = /Id="([^"]+)"[^>]+Target="media\/([^"]+)"/g;
let match;
while ((match = relRegex.exec(relsContent)) !== null) {
  relations[match[1]] = match[2];
}

// Let's divide document.xml into paragraphs (<w:p>...</w:p>)
const paragraphs = [];
const pRegex = /<w:p[^>]*>([\s\S]*?)<\/w:p>/g;
while ((match = pRegex.exec(xmlContent)) !== null) {
  paragraphs.push(match[1]);
}

console.log(`Found ${paragraphs.length} paragraphs.`);

for (const [rId, filename] of Object.entries(relations)) {
  console.log(`\n=================== ${rId} -> ${filename} ===================`);
  
  // Find which paragraph contains this rId
  let foundIndex = -1;
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].includes(rId)) {
      foundIndex = i;
      break;
    }
  }
  
  if (foundIndex !== -1) {
    // Print 3 paragraphs before, the containing paragraph, and 3 paragraphs after
    const startIdx = Math.max(0, foundIndex - 2);
    const endIdx = Math.min(paragraphs.length - 1, foundIndex + 2);
    
    for (let j = startIdx; j <= endIdx; j++) {
      const isTarget = (j === foundIndex);
      const cleanP = paragraphs[j].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`[P ${j}]${isTarget ? ' >>> TARGET <<< ' : ' '} ${cleanP}`);
    }
  } else {
    console.log(`rId ${rId} not found in any paragraph.`);
  }
}
