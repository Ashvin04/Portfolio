import fs from 'fs';

const xmlPath = 'd:/Projects/Portfolio/KnockOutDocumentation/temp_extracted/word/document.xml';
const relsPath = 'd:/Projects/Portfolio/KnockOutDocumentation/temp_extracted/word/_rels/document.xml.rels';
const outPath = 'd:/Projects/Portfolio/scratch/image_contexts.txt';

const xmlContent = fs.readFileSync(xmlPath, 'utf8');
const relsContent = fs.readFileSync(relsPath, 'utf8');

const relations = {};
const relRegex = /Id="([^"]+)"[^>]+Target="media\/([^"]+)"/g;
let match;
while ((match = relRegex.exec(relsContent)) !== null) {
  relations[match[1]] = match[2];
}

const paragraphs = [];
const pRegex = /<w:p[^>]*>([\s\S]*?)<\/w:p>/g;
while ((match = pRegex.exec(xmlContent)) !== null) {
  paragraphs.push(match[1]);
}

let outText = `Found ${paragraphs.length} paragraphs.\n`;

for (const [rId, filename] of Object.entries(relations)) {
  outText += `\n=================== ${rId} -> ${filename} ===================\n`;
  
  let foundIndex = -1;
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].includes(rId)) {
      foundIndex = i;
      break;
    }
  }
  
  if (foundIndex !== -1) {
    const startIdx = Math.max(0, foundIndex - 2);
    const endIdx = Math.min(paragraphs.length - 1, foundIndex + 2);
    
    for (let j = startIdx; j <= endIdx; j++) {
      const isTarget = (j === foundIndex);
      const cleanP = paragraphs[j].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      outText += `[P ${j}]${isTarget ? ' >>> TARGET <<< ' : ' '} ${cleanP}\n`;
    }
  } else {
    outText += `rId ${rId} not found in any paragraph.\n`;
  }
}

fs.writeFileSync(outPath, outText, 'utf8');
console.log('Wrote contexts to', outPath);
