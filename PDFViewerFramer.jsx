import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect } from "react"

/**
 * @framerSupportedLayoutWidth fill
 * @framerSupportedLayoutHeight fill
 */
export default function PDFViewer(props) {
    const { 
        document = "presentation",
        width = "100vw", 
        height = "100vh", 
        borderRadius = 0,
        borderColor = "#ccc",
        fallbackText = "Your browser does not support PDF viewing. Please download the PDF to view it."
    } = props

    // Map document enum to GitHub raw URLs
    const getDocumentUrl = (documentType) => {
        const baseUrl = "https://raw.githubusercontent.com/ahmdatef/pdf-viewer/main/"
        switch (documentType) {
            case "presentation":
                return `${baseUrl}Presentation.pdf`
            case "sheet":
                return `${baseUrl}Sheet.pdf`
            default:
                return `${baseUrl}Presentation.pdf`
        }
    }

    const src = getDocumentUrl(document)

    const [viewerType, setViewerType] = useState('pdfjs') // 'pdfjs', 'fallback'
    const [isLoading, setIsLoading] = useState(true)

    const containerStyle = {
        width: '100vw',
        height: '100vh',
        // border: `1px solid ${borderColor}`,
        borderRadius,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
    }

    const objectStyle = {
        width: '100%',
        height: '100%'
    }

    const fallbackStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        color: '#666'
    }

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
        marginTop: '10px',
        padding: '8px 16px',
        border: '1px solid #007bff',
        borderRadius: '4px'
    }

    const downloadButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 10000,
        textDecoration: 'none',
        display: 'inline-block'
    }

    const getDownloadUrl = (url) => {
        // Convert Google Drive preview/view URL to download URL
        if (url.includes('drive.google.com')) {
            const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileIdMatch) {
                return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
            }
        }
        return url;
    }

    const getDirectPDFUrl = (url) => {
        // Convert Google Drive URLs to direct download URLs for PDF.js
        if (url.includes('drive.google.com')) {
            const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileIdMatch) {
                return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
            }
        }
        return url;
    }

    const getPDFJsUrl = (url) => {
        // For Google Drive URLs, we can't use PDF.js due to CORS
        if (url.includes('drive.google.com')) {
            return null;
        }
        
        const directPdfUrl = getDirectPDFUrl(url);
        return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(directPdfUrl)}`;
    }

    const handleIframeError = () => {
        console.log('PDF.js viewer failed, showing download fallback');
        setViewerType('fallback');
    }

    useEffect(() => {
        // Check if we can use PDF.js for this URL
        if (src && src.includes('drive.google.com')) {
            console.log('Google Drive URL detected, using download fallback');
            setViewerType('fallback');
            setIsLoading(false);
        } else {
            // Reset to PDF.js viewer for non-Google Drive URLs
            setViewerType('pdfjs');
            setIsLoading(true);
            
            // Auto-switch to download fallback if PDF.js doesn't load within 10 seconds
            const timeoutId = setTimeout(() => {
                if (isLoading) {
                    console.log('PDF.js viewer timeout, switching to download fallback');
                    setViewerType('fallback');
                }
            }, 10000);
            
            return () => clearTimeout(timeoutId);
        }
    }, [src])
    
    useEffect(() => {
        // Reset loading state when viewer type changes
        if (viewerType !== 'pdfjs') {
            setIsLoading(false);
        }
    }, [viewerType])

    const handleDownload = () => {
        const downloadUrl = getDownloadUrl(src);
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = 'document.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const switchToFallback = () => {
        setViewerType('fallback');
        setIsLoading(false);
    }

    const buttonStyle = {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '10px'
    }

    const renderViewer = () => {
        switch (viewerType) {
            case 'pdfjs':
                const pdfJsUrl = getPDFJsUrl(src);
                if (!pdfJsUrl) {
                    // If we can't create PDF.js URL, switch to fallback
                    setViewerType('fallback');
                    return null;
                }
                return (
                    <iframe
                        src={pdfJsUrl}
                        style={objectStyle}
                        title="PDF Viewer"
                        onError={handleIframeError}
                        onLoad={() => {
                            console.log('PDF.js viewer loaded successfully');
                            setIsLoading(false);
                        }}
                    />
                );
            
            case 'fallback':
            default:
                return (
                    <div style={fallbackStyle}>
                        <h3 style={{marginBottom: '15px', color: '#333'}}>📄 PDF Document</h3>
                        {src && src.includes('drive.google.com') ? (
                            <p>This PDF is hosted on Google Drive and cannot be embedded directly.</p>
                        ) : (
                            <p>PDF viewer is loading or unavailable.</p>
                        )}
                        <p style={{marginTop: '10px', fontSize: '14px', opacity: 0.8}}>
                            Please download the PDF to view it in your device's PDF viewer.
                        </p>
                        <a 
                            href={getDownloadUrl(src)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{...linkStyle, fontSize: '16px', padding: '12px 24px'}}
                        >
                            📥 Download PDF
                        </a>
                        <p style={{marginTop: '15px', fontSize: '12px', opacity: 0.6}}>
                            For best viewing experience, download and open with Adobe Reader, Chrome, or your default PDF viewer.
                        </p>
                    </div>
                );
        }
    }

    return (
        <div style={containerStyle}>
            <button 
                style={downloadButtonStyle}
                onClick={handleDownload}
            >
                📥 Download
            </button>
            {renderViewer()}
        </div>
    )
}

addPropertyControls(PDFViewer, {
    document: {
        title: "Document",
        type: ControlType.Enum,
        options: ["presentation", "sheet"],
        optionTitles: ["Presentation", "Sheet"],
        defaultValue: "presentation",
    },
    width: {
        title: "Width",
        type: ControlType.String,
        defaultValue: "100vw",
    },
    height: {
        title: "Height", 
        type: ControlType.String,
        defaultValue: "100vh",
    },
    borderRadius: {
        title: "Border Radius",
        type: ControlType.Number,
        defaultValue: 0,
        min: 0,
        max: 50,
        unit: "px",
    },
    borderColor: {
        title: "Border Color",
        type: ControlType.Color,
        defaultValue: "#ccc",
    },
    fallbackText: {
        title: "Fallback Text",
        type: ControlType.String,
        defaultValue: "Your browser does not support PDF viewing. Please download the PDF to view it.",
    },
})