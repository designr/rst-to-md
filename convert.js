
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { glob } = require('glob');

// Define metadata keys that we care about
const metadataKeys = ['title', 'tags', 'category', 'date', 'slug', 'description', 'author', 'location', 'mood', 'type'];

// Function to convert RST metadata to Markdown front-matter
function convertMetadataToFrontMatter(metadata) {
  let frontMatter = '---\n';

  metadata.forEach(({ key, value }) => {
    if (key === 'tags' || key === 'category') {
      // Convert tags and categories to array format
      frontMatter += `${key}: ["${value.replace(/,\s*/g, '", "')}"]\n`;
      frontMatter = frontMatter.replace("category", "categories"); // specifically for md files for our hugo site
    } else {
      frontMatter += `${key}: "${value}"\n`;
    }
  });

  frontMatter += '---\n';
  console.log(`frontmatter :\n ${frontMatter}\n\n`)
  return frontMatter;
}

// Function to process each RST file
function processFile(filePath, targetPath) {
  console.log(`Entered processFile(), processing ${filePath}`)
  const filename = path.basename(filePath, '.rst');
  const metadata = [];

  // Read the RST file content
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract metadata
  metadataKeys.forEach((key) => {
    const regex = new RegExp(`^.. ${key}:(.*)`, 'm');
    const match = content.match(regex);

    if (match) {
      let value = match[1].trim();

      // Handle default values or empty metadata
      if (!value) {
        value = 'n/a';
      }

      // Special handling for 'author'
      if (key === 'author' && value === 'n/a') {
        value = 'Kamal Morjal'; // default author
      }

      if (key === 'date' && value !== 'n/a' && value !== '') {
        let v_i = value.split(' ');
        v_i = v_i.map((v) => v.includes('UTC') ? v.replace('UTC','') : v);
        let date = v_i.shift()
        let time = v_i.shift()
        let offset = v_i.pop()
        value = date + "T" + time + offset;
      }

      // console.log(`{${key}: ${value}}`);
      metadata.push({ key, value });
    }
  });

  // Convert the metadata to front-matter
  const frontMatter = convertMetadataToFrontMatter(metadata);

  // Run pandoc to convert RST to Markdown
  exec(`pandoc -f rst -t gfm "${filePath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running pandoc on ${filePath}: ${stderr}`);
      return;
    }

    // Combine the front-matter and the converted Markdown content
    const finalContent = frontMatter + stdout;

    // Write the final content to a Markdown file
    const outputFilePath = path.join(targetPath, `${filename}.md`);
    fs.writeFileSync(outputFilePath, finalContent, 'utf-8');
    console.log(`Converted ${filePath} to ${outputFilePath}`);
  });
}

// Main function to process all RST files in the source directory
async function convertRstToMd(sourcePath, targetPath) {
  console.log(`convertRstToMd(): sourcepath: ${sourcePath}, targetpath: ${targetPath}`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source directory ${sourcePath} does not exist`);
    return;
  }

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Find all .rst files in the source directory
  // glob(`${sourcePath}/*.rst`, (err, files) => {
  //   if (err) {
  //     console.error('Error reading RST files:', err);
  //     return;
  //   }

  //   files.forEach((file) => {
  //     console.log(`processing file: ${file}`)
  //     processFile(file, targetPath);
  //   });
  // });
  // ^ this might have worked upto glob v8; it doesn't after
  // a major refactor. Please see their version history and docs.

  let files = await glob(`${sourcePath}/*.rst`, {})
  files.forEach((file) => {
    console.log(`processing file: ${file}`)
    processFile(file, targetPath);
  });
}

// Check if the correct number of arguments are passed
if (process.argv.length !== 4) {
  console.log('Usage: node script.js [source_path] [target_path]');
  process.exit(1);
}

// Get the source and target directories from command-line arguments
const sourcePath = process.argv[2];
const targetPath = process.argv[3];

// Start the conversion process
convertRstToMd(sourcePath, targetPath);
