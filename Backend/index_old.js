const express = require("express");
const multer = require("multer");
const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());

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
app.post("/convertFile", upload.single("file"), (req, res, next) => {
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

        docxToPDF(req.file.path, outputPath, (err, result) => {
            if (err) {
                console.error("Conversion error:", err); // problem
                return res.status(500).json({
                    message: "Error converting docx to pdf: " + err.message,
                });
            }

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
        });
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