# 📄 PUREPDF - Word to PDF Converter

![PUREPDF Banner](https://img.shields.io/badge/PUREPDF-Word%20to%20PDF-blue?style=for-the-badge&logo=pdf)

**A modern, responsive web application for converting Word documents to PDF format instantly.**

---

## ✨ Features

- 🚀 **Lightning Fast Conversion** - Convert .doc and .docx files to PDF in seconds
- 📱 **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Beautiful gradients, animations, and smooth transitions
- 📁 **Drag & Drop Support** - Simply drag files or click to upload
- 🔒 **100% Secure** - Files are processed securely and not stored permanently
- 💯 **Free to Use** - No registration required, completely free
- ⚡ **Real-time Progress** - Loading indicators and status messages
- 📥 **Instant Download** - PDF files download automatically after conversion

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload middleware
- **docx-pdf** - Document conversion library
- **CORS** - Cross-origin resource sharing

## 🚀 Live Demo

- **Frontend**: [https://purepdf-frontend.vercel.app](https://purepdf-frontend.vercel.app)
- **Backend API**: [https://purepdf-backend.vercel.app](https://purepdf-backend.vercel.app)

## 📷 Screenshots

### Desktop View

![Desktop View](https://via.placeholder.com/800x400/6366f1/ffffff?text=PUREPDF+Desktop+View)

### Mobile View

![Mobile View](https://via.placeholder.com/400x800/6366f1/ffffff?text=PUREPDF+Mobile+View)

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/tarun6546/PUREPDF.git
   cd PUREPDF
   ```

2. **Setup Backend**

   ```bash
   cd Backend
   npm install
   npm start
   # Backend runs on http://localhost:3000
   ```

3. **Setup Frontend**

   ```bash
   cd Frontend
   npm install
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start converting Word documents to PDF!

## 📁 Project Structure

```
PUREPDF/
├── Frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx   # Navigation bar
│   │   │   ├── Home.jsx     # Main conversion interface
│   │   │   └── Footer.jsx   # Footer component
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── Backend/                 # Node.js Backend
│   ├── index.js            # Main server file
│   ├── uploads/            # Temporary file storage
│   ├── files/              # Converted PDF storage
│   └── package.json        # Backend dependencies
│
└── DEPLOYMENT_GUIDE.md     # Deployment instructions
```

## 🎯 Usage

1. **Upload File**: Drag and drop a Word document or click to browse
2. **Convert**: Click the "Convert to PDF" button
3. **Download**: Your PDF will download automatically
4. **Enjoy**: Professional PDF ready to use!

## 🔄 API Endpoints

### POST `/convertFile`

Convert Word document to PDF

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing the Word document

**Response:**

- Success: PDF file download
- Error: JSON error message

## 🌟 Features in Detail

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect experience on tablets
- **Desktop Enhanced**: Full feature set on desktop

### File Support

- **Formats**: .doc, .docx files
- **Size Limit**: Up to 50MB per file
- **Validation**: Automatic file type checking

### User Experience

- **Drag & Drop**: Intuitive file upload
- **Progress Indicators**: Real-time conversion status
- **Error Handling**: Clear error messages
- **Success Feedback**: Confirmation messages

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions on Vercel.

## 📝 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

### Production (.env.production)

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhi Poddar**

- GitHub: [@tarun6546](https://github.com/tarun6546)
- LinkedIn: [Abhi Poddar](https://linkedin.com/in/tarun-varshney)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

### 💝 Show your support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ by Abhi Poddar**
