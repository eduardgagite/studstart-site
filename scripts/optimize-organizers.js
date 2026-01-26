const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const organizersDir = path.join(__dirname, '../public/images/organizers');
const subdirs = ['prof', 'record', 'uni'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Determine optimal settings based on image type
    let sharpInstance = sharp(inputPath);
    
    // Resize if image is too large (max 800px width/height for profile photos)
    if (metadata.width > 800 || metadata.height > 800) {
      sharpInstance = sharpInstance.resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Optimize based on format
    if (inputPath.endsWith('.png')) {
      // Convert PNG to optimized PNG or WebP
      await sharpInstance
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath);
    } else if (inputPath.endsWith('.jpg') || inputPath.endsWith('.jpeg')) {
      // Optimize JPEG
      await sharpInstance
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputPath);
    }
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      newSize,
      savings: parseFloat(savings),
      success: true,
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function optimizeAll() {
  console.log('Starting image optimization...\n');
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let processed = 0;
  let failed = 0;
  
  for (const subdir of subdirs) {
    const subdirPath = path.join(organizersDir, subdir);
    
    if (!fs.existsSync(subdirPath)) {
      console.log(`Directory ${subdir} does not exist, skipping...`);
      continue;
    }
    
    const files = fs.readdirSync(subdirPath).filter(
      file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
    );
    
    console.log(`\nProcessing ${subdir} (${files.length} files)...`);
    
    for (const file of files) {
      const inputPath = path.join(subdirPath, file);
      const tempPath = path.join(subdirPath, `temp_${file}`);
      
      const result = await optimizeImage(inputPath, tempPath);
      
      if (result.success) {
        // Replace original with optimized version
        fs.renameSync(tempPath, inputPath);
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        processed++;
        
        const sizeMB = (result.originalSize / 1024 / 1024).toFixed(2);
        const newSizeMB = (result.newSize / 1024 / 1024).toFixed(2);
        console.log(`  ✓ ${file}: ${sizeMB}MB → ${newSizeMB}MB (${result.savings}% saved)`);
      } else {
        // Remove temp file if optimization failed
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
        failed++;
        console.log(`  ✗ ${file}: Failed - ${result.error}`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Optimization Summary:');
  console.log(`  Processed: ${processed} files`);
  console.log(`  Failed: ${failed} files`);
  console.log(`  Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Optimized total: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total savings: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('='.repeat(50));
}

optimizeAll().catch(console.error);
