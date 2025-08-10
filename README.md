# Framer PDF Viewer

A robust PDF viewer component for Framer websites with intelligent fallback support and cross-platform compatibility.

## Features

- 🖥️ **PDF.js Integration**: Uses Mozilla's PDF.js for reliable PDF rendering
- 📱 **Mobile Friendly**: Works consistently across desktop and mobile browsers  
- 🔄 **Smart Fallbacks**: Graceful degradation when embedding fails
- 🚀 **Google Drive Support**: Handles Google Drive URLs with direct download
- ⚙️ **Framer Ready**: Built specifically for Framer websites with property controls
- 🎨 **Customizable**: Full styling control through Framer properties

## Installation

1. Copy `PDFViewerFramer.jsx` to your Framer project
2. Import and use as a component in your Framer website

## Usage

### Basic Usage

```jsx
import PDFViewer from './PDFViewerFramer'

// Use with any PDF URL
<PDFViewer src="https://example.com/document.pdf" />

// Use with Google Drive
<PDFViewer src="https://drive.google.com/file/d/1ABC123.../view" />

// Use with local file (from same repo)
<PDFViewer src="./sample.pdf" />
```

### Framer Properties

The component includes these customizable properties in Framer:

- **PDF URL**: The URL or path to your PDF file
- **Width**: Component width (default: 100vw)
- **Height**: Component height (default: 100vh)  
- **Border Radius**: Rounded corners in pixels
- **Border Color**: Border color (when enabled)
- **Fallback Text**: Custom text for download fallback

## How It Works

### Smart URL Detection
- **Regular PDFs**: Uses PDF.js viewer for embedded viewing
- **Google Drive URLs**: Automatically detects and provides download option
- **Failed Loading**: Falls back to download option after timeout

### Viewer Strategy
1. **Primary**: PDF.js iframe viewer (for non-Google Drive URLs)
2. **Fallback**: Download button with user-friendly messaging

### URL Conversion
Google Drive sharing URLs are automatically converted to direct download format:
```
From: https://drive.google.com/file/d/1ABC123.../view
To:   https://drive.google.com/uc?export=download&id=1ABC123...
```

## Browser Support

- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile) 
- ✅ Firefox (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ iOS Safari
- ✅ Android Chrome

## File Structure

```
framer-pdf-viewer/
├── PDFViewerFramer.jsx    # Main component
├── sample.pdf             # Test PDF file
├── package.json           # Project metadata
└── README.md             # This file
```

## Testing

Test the component with the included sample PDF:
```jsx
<PDFViewer src="./sample.pdf" />
```

## Limitations

- **Google Drive CORS**: Google Drive URLs cannot be embedded due to CORS restrictions
- **File Size**: Very large PDFs may take time to load
- **Network**: Requires internet connection for PDF.js CDN

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test across different browsers and devices
5. Submit a pull request

## License

MIT License - feel free to use in your Framer projects!

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify PDF URL is accessible
3. Test with the included sample.pdf file
4. Open an issue with details about your setup

---

Built for the Framer community 🎨