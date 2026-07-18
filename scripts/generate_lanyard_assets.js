const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

const outDir = path.join(__dirname, '../public/assets/lanyard');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateFrontCard() {
  const width = 600;
  const height = 900;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background Ivory
  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, width, height);

  // Border Bronze
  ctx.strokeStyle = '#E7D8C8';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, width - 10, height - 10);

  // Top Accent Stripe
  ctx.fillStyle = '#C08552';
  ctx.fillRect(0, 0, width, 20);

  // Portrait Image
  try {
    const imgPath = path.join(__dirname, '../public/images/fardeen-hero.png');
    if (fs.existsSync(imgPath)) {
      const img = await loadImage(imgPath);
      // Draw centered portrait at top
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(150, 100, 300, 300, 20);
      ctx.clip();
      ctx.drawImage(img, 150, 100, 300, 300);
      ctx.restore();
    }
  } catch (e) {
    console.error("No image found, using placeholder");
    ctx.fillStyle = '#C08552';
    ctx.roundRect(150, 100, 300, 300, 20);
    ctx.fill();
  }

  // Text
  ctx.fillStyle = '#3B2A1E';
  ctx.textAlign = 'center';
  
  ctx.font = 'bold 50px sans-serif';
  ctx.fillText('Fardeen Ansari', width / 2, 480);
  
  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#C08552';
  ctx.fillText('Full Stack Engineer', width / 2, 530);

  ctx.font = '24px sans-serif';
  ctx.fillStyle = '#3B2A1E';
  ctx.fillText('IoT • AI • Web', width / 2, 590);
  ctx.fillText('📍 Kolkata, India', width / 2, 630);

  // Badge
  ctx.strokeStyle = '#C08552';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(100, 700, 400, 100, 15);
  ctx.stroke();

  ctx.fillStyle = '#C08552';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('Smart India Hackathon', width / 2, 745);
  ctx.font = 'italic 20px serif';
  ctx.fillText('National Finalist', width / 2, 780);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, 'front-card.png'), buffer);
}

async function generateBackCard() {
  const width = 600;
  const height = 900;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#E7D8C8';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, width - 10, height - 10);

  ctx.fillStyle = '#3B2A1E';
  ctx.textAlign = 'center';
  ctx.font = 'bold 40px sans-serif';
  ctx.fillText('SCAN FOR MORE', width / 2, 150);

  // Fake QR Code
  ctx.fillStyle = '#3B2A1E';
  ctx.fillRect(200, 250, 200, 200);
  ctx.fillStyle = '#FFF8F0';
  for(let i=0; i<40; i++) {
    ctx.fillRect(200 + Math.random()*190, 250 + Math.random()*190, 10, 10);
  }
  ctx.fillStyle = '#3B2A1E';
  ctx.fillRect(210, 260, 40, 40);
  ctx.fillRect(350, 260, 40, 40);
  ctx.fillRect(210, 400, 40, 40);

  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#C08552';
  ctx.fillText('github.com/FardeenAnsari', width / 2, 550);
  ctx.fillText('linkedin.com/in/itsfardeen', width / 2, 600);
  ctx.fillText('imailfard@gmail.com', width / 2, 650);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, 'back-card.png'), buffer);
}

async function generateLanyardTexture() {
  const width = 1024;
  const height = 128;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF8F0';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#C08552';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  
  const text = 'FARDEEN • FULL STACK • AI • IoT • 2026 • ';
  ctx.fillText(text.repeat(3), 0, height / 2);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, 'lanyard-texture.png'), buffer);
}

async function run() {
  await generateFrontCard();
  await generateBackCard();
  await generateLanyardTexture();
  console.log('Assets generated successfully!');
}

run();
