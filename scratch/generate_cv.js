/**
 * Generates ashvin_jeevarasa_cv.pdf — two-column layout matching the preferred template.
 * Edit CONTENT below for text changes, then run: npm run generate:cv
 * (Regenerating replaces the PDF — avoid hand-editing the PDF file directly.)
 */
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'ashvin_jeevarasa_cv.pdf');

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 0;
const HEADER_H = 108;
const CHEVRON_H = 18;
const SIDEBAR_W = 188;
const PAD = 22;

const COLORS = {
  header: '#3d3d3d',
  sidebar: '#f2ebe2',
  body: '#ffffff',
  title: '#2a2a2a',
  muted: '#777777',
  line: '#c8c8c8',
  white: '#ffffff',
  link: '#3d3d3d',
};

const CONTENT = {
  name: 'Ashvin Jeevarasa',
  role: 'Gameplay & Systems Developer',
  email: 'ashvinjeevarasa20@gmail.com',
  emailUrl: 'mailto:ashvinjeevarasa20@gmail.com',
  linkedin: 'linkedin.com/in/ashvin-jeevarasa',
  linkedinUrl: 'https://www.linkedin.com/in/ashvin-jeevarasa',
  portfolio: 'ashvin04.github.io/Portfolio',
  portfolioUrl: 'https://ashvin04.github.io/Portfolio/',
  summary:
    'Gameplay and systems developer focused on responsive multiplayer architecture, dynamic camera rigs, and polished player-facing UI. Experienced structuring server-authoritative netcode and iterative gameplay loops. Always refines mechanics and feel based on playtest and design feedback.',
  education: [
    {
      degree: 'BSc (Hons) Computer Games Design and Programming',
      school: 'Staffordshire University',
    },
    {
      degree: 'A Levels — Mathematics, Further Mathematics, Computer Science',
      school: 'North Bristol Post 16',
    },
  ],
  skills: [
    ['C# / Unity', 'Expert'],
    ['Gameplay Systems', 'Expert'],
    ['Netcode & Multiplayer', 'Expert'],
    ['UI Toolkit', 'Advanced'],
    ['Dynamic Camera & Audio', 'Advanced'],
    ['XR / VR (XRI)', 'Advanced'],
    ['State Machine AI', 'Advanced'],
  ],
  experience: [
    {
      title: 'Tech Lead — Collaborative Game Project',
      dates: 'University Collaboration',
      bullets: [
        'Led technical direction for a large multi-disciplinary team; delegated work and kept the group aligned on milestones.',
        'Stayed in regular communication with other discipline leads to resolve blockers and scope gameplay systems.',
        'Built a shared system log so designers could check out Blueprint / UAsset work and avoid merge conflicts in version control.',
        'Iterated on gameplay design from playtest and lead feedback, tuning systems until they met the team vision.',
      ],
    },
    {
      title: 'Gameplay & Systems Developer — Knock Out',
      dates: 'Staffordshire University',
      bullets: [
        'Physics-based multiplayer hex brawler with tethered players; featured server-authoritative netcode and deep combat.',
        'Implemented dynamic camera tracking, adaptive audio fades, and UI Toolkit layouts for responsive in-game HUD.',
        'Delivered shrinking battle map logic, rogue-lite catch-up mechanics, and netcode-synchronized combat states.',
      ],
    },
    {
      title: 'Developer — 2D Platformer',
      dates: 'Personal Project',
      bullets: [
        'Coyote-time platforming, slow-motion energy resource, and decoupled ScriptableObject event channels for clean architecture.',
      ],
    },
    {
      title: 'Developer — Unity VR Framework',
      dates: 'Personal Project',
      bullets: [
        'Extended XR Interaction Toolkit with velocity-based combat, two-handed grip, tag sockets, and sensory shader effects.',
      ],
    },
  ],
  references: 'References available upon request.',
};

function drawHeader(doc) {
  doc.save();
  doc.rect(0, 0, PAGE_W, HEADER_H).fill(COLORS.header);
  doc.fillColor(COLORS.white).font('Helvetica-Bold').fontSize(28);
  doc.text(CONTENT.name, PAD, 36, { width: PAGE_W - PAD * 2 });
  doc.font('Helvetica').fontSize(13);
  doc.text(CONTENT.role, PAD, 72, { width: PAGE_W - PAD * 2 });
  doc.restore();
}

function drawChevron(doc) {
  const y = HEADER_H;
  const mid = SIDEBAR_W;
  doc.save();
  doc.moveTo(0, y).lineTo(mid, y + CHEVRON_H).lineTo(PAGE_W, y).closePath();
  doc.fill(COLORS.header);
  doc.restore();
}

function drawBackgrounds(doc) {
  const top = HEADER_H + CHEVRON_H;
  doc.save();
  doc.rect(0, top, SIDEBAR_W, PAGE_H - top).fill(COLORS.sidebar);
  doc.rect(SIDEBAR_W, top, PAGE_W - SIDEBAR_W, PAGE_H - top).fill(COLORS.body);
  doc.restore();
}

function sectionHeading(doc, x, y, text, width) {
  doc.fillColor(COLORS.title).font('Helvetica-Bold').fontSize(11);
  doc.text(text, x, y, { width });
  const lineY = doc.y + 4;
  doc.moveTo(x, lineY).lineTo(x + width, lineY).strokeColor(COLORS.line).lineWidth(0.75).stroke();
  return lineY + 10;
}

function drawContactLine(doc, x, y, w, label, url) {
  doc.fillColor(COLORS.title).font('Helvetica').fontSize(8.5);
  doc.text(label, x, y, { width: w, underline: true, link: url });
  return doc.y + 6;
}

function sidebarSection(doc, y, title, render) {
  const x = PAD;
  const w = SIDEBAR_W - PAD * 2;
  let nextY = sectionHeading(doc, x, y, title, w);
  nextY = render(doc, x, nextY, w);
  return nextY + 14;
}

function bodySection(doc, y, title, render) {
  const x = SIDEBAR_W + PAD;
  const w = PAGE_W - SIDEBAR_W - PAD * 2;
  let nextY = sectionHeading(doc, x, y, title, w);
  nextY = render(doc, x, nextY, w);
  return nextY + 16;
}

function drawSidebar(doc, startY) {
  let y = startY;

  y = sidebarSection(doc, y, 'Personal Info', (doc, x, cy, w) => {
    let ny = cy;
    ny = drawContactLine(doc, x, ny, w, CONTENT.email, CONTENT.emailUrl);
    ny = drawContactLine(doc, x, ny, w, CONTENT.linkedin, CONTENT.linkedinUrl);
    ny = drawContactLine(doc, x, ny, w, CONTENT.portfolio, CONTENT.portfolioUrl);
    return ny + 2;
  });

  y = sidebarSection(doc, y, 'Education', (doc, x, cy, w) => {
    let ny = cy;
    CONTENT.education.forEach((entry, i) => {
      doc.fillColor(COLORS.title).font('Helvetica-Bold').fontSize(9);
      doc.text('• ' + entry.degree, x, ny, { width: w });
      ny = doc.y + 2;
      doc.fillColor(COLORS.muted).font('Helvetica').fontSize(8.5);
      doc.text(entry.school, x + 8, ny, { width: w - 8 });
      ny = doc.y + (i < CONTENT.education.length - 1 ? 8 : 2);
    });
    return ny;
  });

  sidebarSection(doc, y, 'Skills', (doc, x, cy, w) => {
    let ny = cy;
    CONTENT.skills.forEach(([skill, level], i) => {
      doc.fillColor(COLORS.title).font('Helvetica').fontSize(9);
      doc.text(`${skill} — ${level}`, x, ny, { width: w });
      ny = doc.y + (i < CONTENT.skills.length - 1 ? 5 : 2);
    });
    return ny;
  });
}

function drawExperienceEntry(doc, x, y, w, entry) {
  doc.fillColor(COLORS.title).font('Helvetica-Bold').fontSize(10);
  doc.text(entry.title, x, y, { width: w });
  const dateY = doc.y + 2;
  doc.fillColor(COLORS.muted).font('Helvetica').fontSize(8.5);
  doc.text(entry.dates, x, dateY, { width: w });
  let ny = doc.y + 6;
  doc.fillColor(COLORS.title).font('Helvetica').fontSize(9);
  entry.bullets.forEach((bullet) => {
    doc.text('•  ' + bullet, x + 4, ny, { width: w - 8, lineGap: 2 });
    ny = doc.y + 4;
  });
  return ny + 4;
}

function drawBody(doc, startY) {
  let y = startY;

  y = bodySection(doc, y, 'Summary', (doc, x, cy, w) => {
    doc.fillColor(COLORS.title).font('Helvetica').fontSize(9.5);
    doc.text(CONTENT.summary, x, cy, { width: w, align: 'justify', lineGap: 3 });
    return doc.y + 2;
  });

  y = bodySection(doc, y, 'Work Experience', (doc, x, cy, w) => {
    let ny = cy;
    CONTENT.experience.forEach((entry, i) => {
      ny = drawExperienceEntry(doc, x, ny, w, entry);
      if (i < CONTENT.experience.length - 1) ny += 2;
    });
    return ny;
  });

  bodySection(doc, y, 'References', (doc, x, cy, w) => {
    doc.fillColor(COLORS.title).font('Helvetica').fontSize(9.5);
    doc.text(CONTENT.references, x, cy, { width: w });
    return doc.y;
  });
}

function generate() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
  const stream = fs.createWriteStream(OUT);
  doc.pipe(stream);

  drawHeader(doc);
  drawChevron(doc);
  drawBackgrounds(doc);

  const contentTop = HEADER_H + CHEVRON_H + 20;
  drawSidebar(doc, contentTop);
  drawBody(doc, contentTop);

  doc.end();

  stream.on('finish', () => {
    console.log('CV written to', OUT);
  });
}

generate();
