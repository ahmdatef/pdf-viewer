import { addPropertyControls, ControlType } from "framer"

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
        borderColor = "#ccc"
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

    const iframeStyle = {
        width: '100%',
        height: '100%'
    }

    const pdfJsUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(src)}`

    return (
        <div style={containerStyle}>
            <iframe
                src={pdfJsUrl}
                style={iframeStyle}
                title="PDF Viewer"
            />
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
})