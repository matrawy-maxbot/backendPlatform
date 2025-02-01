import { createWriteStream, readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

// دالة عشان تطبع محتوى الملفات في ملف نصي
function printFilesContentToFile(rootDir, outputFilePath) {
  // نفتح ملف الناتج عشان نكتب فيه
  const outputStream = createWriteStream(outputFilePath);

  // دالة عشان نقرا الفولدرات والملفات بشكل متكرر (recursive)
  function readDirectory(dir) {
    const files = readdirSync(dir);

    files.forEach((file) => {
      const filePath = join(dir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        // لو ده فولدر، ندخل فيه ونكمل القراية
        readDirectory(filePath);
      } else {
        // لو ده ملف، نقرا المحتوى بتاعه
        const content = readFileSync(filePath, 'utf8').trim(); // نقرا المحتوى ونشيل المسافات الفاضية

        // لو الملف مش فاضي، نكتب مساره ومحتواه في ملف الناتج
        if (content) {
            outputStream.write(`File: ${filePath}\n`);
            outputStream.write('Content:\n');
            outputStream.write(content);
            outputStream.write('\n\n||------------------------------------------------------||\n\n'); // فاصل بين الملفات
        }
      }
    });
  }

  // نبدأ القراية من الفولدر الرئيسي
  readDirectory(rootDir);

  // نغلق ملف الناتج بعد ما نخلص
  outputStream.end();
  console.log(`The file has been created successfuly: ${outputFilePath}`);
}

// نستخدم الدالة
const projectPath = './src'; // المسار بتاع مشروعك
const outputFile = 'projectFilesContent.txt'; // اسم الملف اللي هيتم إنشاءه
printFilesContentToFile(projectPath, outputFile);