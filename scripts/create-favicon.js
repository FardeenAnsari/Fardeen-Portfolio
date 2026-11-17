const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processIcon() {
  try {
    const inputPath = path.join(__dirname, 'public/images/fardeen-hero.png');
    const outputPath = path.join(__dirname, 'src/app/icon.png');
    
    // Backup original icon just in case
    if (fs.existsSync(outputPath) && !fs.existsSync(outputPath + '.bak')) {
      fs.copyFileSync(outputPath, outputPath + '.bak');
    }

    const metadata = await sharp(inputPath).metadata();
    
    const size = Math.floor(Math.min(metadata.width, metadata.height * 0.45));
    const left = Math.floor((metadata.width - size) / 2);
    const top = Math.floor(metadata.height * 0.05); // 5% from the top for better face framing
    
    // Create a circular SVG mask of size 128x128 since we resize the extracted image to 128x128
    const maskSize = 128;
    const circleSvg = `<svg width="${maskSize}" height="${maskSize}">
      <circle cx="${maskSize/2}" cy="${maskSize/2}" r="${maskSize/2}" />
    </svg>`;

    await sharp(inputPath)
      .extract({ left, top, width: size, height: size })
      .resize(maskSize, maskSize)
      .composite([{
        input: Buffer.from(circleSvg),
        blend: 'dest-in'
      }])
      .png()
      .toFile(outputPath);
      
    console.log('Circular favicon created successfully.');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

processIcon();
