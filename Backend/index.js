const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mammoth = require("mammoth");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

//564786765

// Ensure upload and files directories exist
const uploadDir = path.join(__dirname, "uploads");
const filesDir = path.join(__dirname, "files");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

// Setting up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        // Add timestamp to prevent filename conflicts
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        cb(null, `${basename}_${timestamp}${extension}`);
    },
});

// File filter to only allow .doc and .docx files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword', // .doc
    ];

    if (allowedTypes.includes(file.mimetype) ||
        file.originalname.toLowerCase().endsWith('.docx') ||
        file.originalname.toLowerCase().endsWith('.doc')) {
        cb(null, true);
    } else {
        cb(new Error('Only .doc and .docx files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

// API endpoint for file conversion
app.post("/convertFile", upload.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        console.log(`Converting file: ${req.file.originalname}`);

        // Defining output file path
        const outputFilename = `${path.basename(req.file.filename, path.extname(req.file.filename))}.pdf`;
        const outputPath = path.join(__dirname, "files", outputFilename);

        try {
            // Convert DOCX to HTML using mammoth
            console.log("Converting DOCX to HTML...");
            const result = await mammoth.convertToHtml({ path: req.file.path });
            const htmlContent = result.value;

            // Create a styled HTML document
            const styledHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            font-family: 'Times New Roman', serif;
                            font-size: 12pt;
                            line-height: 1.6;
                            margin: 40px;
                            color: #333;
                        }
                        h1, h2, h3, h4, h5, h6 {
                            color: #2c3e50;
                            margin-bottom: 15px;
                        }
                        p {
                            margin-bottom: 12px;
                            text-align: justify;
                        }
                        table {
                            border-collapse: collapse;
                            width: 100%;
                            margin: 20px 0;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        ul, ol {
                            margin: 12px 0;
                            padding-left: 30px;
                        }
                        li {
                            margin-bottom: 5px;
                        }
                        .watermark {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            font-size: 10pt;
                            color: #888;
                            opacity: 0.7;
                        }
                    </style>
                </head>
                <body>
                    ${htmlContent}
                    <div class="watermark">Converted by PUREPDF - By Abhi Poddar</div>
                </body>
                </html>
            `;

            // Convert HTML to PDF using puppeteer
            console.log("Converting HTML to PDF...");
            const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage'
  ]
});

            const page = await browser.newPage();
            await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

            await page.pdf({
                path: outputPath,
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    bottom: '20mm',
                    left: '20mm',
                    right: '20mm'
                }
            });

            await browser.close();

            console.log(`File converted successfully: ${outputFilename}`);

            res.download(outputPath, `${path.basename(req.file.originalname, path.extname(req.file.originalname))}.pdf`, (downloadErr) => {
                if (downloadErr) {
                    console.error("Download error:", downloadErr);
                } else {
                    console.log("File downloaded successfully");

                    // Clean up uploaded file after successful download
                    setTimeout(() => {
                        fs.unlink(req.file.path, (unlinkErr) => {
                            if (unlinkErr) console.error("Error deleting uploaded file:", unlinkErr);
                        });
                        fs.unlink(outputPath, (unlinkErr) => {
                            if (unlinkErr) console.error("Error deleting converted file:", unlinkErr);
                        });
                    }, 1000); // Wait 1 second before cleanup
                }
            });

        } catch (conversionError) {
            console.error("Conversion error:", conversionError);
            return res.status(500).json({
                message: "Error converting docx to pdf: " + conversionError.message,
            });
        }

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            message: "Internal server error: " + error.message,
        });
    }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File too large. Maximum size is 50MB.'
            });
        }
    }

    if (error.message === 'Only .doc and .docx files are allowed!') {
        return res.status(400).json({
            message: 'Invalid file type. Only .doc and .docx files are allowed.'
        });
    }

    res.status(500).json({
        message: 'Something went wrong: ' + error.message
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    return res.json({
        status: "OK",
        message: "PUREPDF Backend Server is running!",
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`🚀 PUREPDF Backend Server is listening on port ${port}`);
    console.log(`📁 Upload directory: ${uploadDir}`);
    console.log(`📄 Files directory: ${filesDir}`);
});