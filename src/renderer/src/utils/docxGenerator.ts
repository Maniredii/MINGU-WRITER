import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun } from 'docx'

interface ImageData {
    id: string
    data: string
    path: string
}

export async function generateDocx(htmlContent: string, images: ImageData[]): Promise<ArrayBuffer> {
    // Parse HTML content and convert to docx elements
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    const body = doc.body

    const paragraphs: Paragraph[] = []

    // Process each element in the HTML
    const processNode = async (node: Node): Promise<void> => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim()
            if (text) {
                paragraphs.push(
                    new Paragraph({
                        children: [new TextRun(text)],
                        spacing: { after: 200 }
                    })
                )
            }
            return
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            const tagName = element.tagName.toLowerCase()

            switch (tagName) {
                case 'h1':
                    paragraphs.push(
                        new Paragraph({
                            text: element.textContent || '',
                            heading: HeadingLevel.HEADING_1,
                            spacing: { before: 400, after: 200 }
                        })
                    )
                    break

                case 'h2':
                    paragraphs.push(
                        new Paragraph({
                            text: element.textContent || '',
                            heading: HeadingLevel.HEADING_2,
                            spacing: { before: 300, after: 200 }
                        })
                    )
                    break

                case 'h3':
                    paragraphs.push(
                        new Paragraph({
                            text: element.textContent || '',
                            heading: HeadingLevel.HEADING_3,
                            spacing: { before: 300, after: 200 }
                        })
                    )
                    break

                case 'h4':
                    paragraphs.push(
                        new Paragraph({
                            text: element.textContent || '',
                            heading: HeadingLevel.HEADING_4,
                            spacing: { before: 200, after: 200 }
                        })
                    )
                    break

                case 'p':
                    const runs: TextRun[] = []
                    processInlineElements(element, runs)
                    if (runs.length > 0 || element.textContent?.trim()) {
                        paragraphs.push(
                            new Paragraph({
                                children: runs.length > 0 ? runs : [new TextRun(element.textContent || '')],
                                spacing: { after: 200 }
                            })
                        )
                    }
                    break

                case 'ul':
                case 'ol':
                    const listItems = element.querySelectorAll('li')
                    listItems.forEach((li, index) => {
                        const liRuns: TextRun[] = []
                        processInlineElements(li, liRuns)
                        paragraphs.push(
                            new Paragraph({
                                children: liRuns.length > 0 ? liRuns : [new TextRun(li.textContent || '')],
                                bullet: tagName === 'ul' ? { level: 0 } : undefined,
                                numbering: tagName === 'ol' ? { reference: 'default-numbering', level: 0 } : undefined,
                                spacing: { after: 100 }
                            })
                        )
                    })
                    break

                case 'img':
                    const imgSrc = element.getAttribute('src')
                    if (imgSrc && imgSrc.startsWith('data:image')) {
                        try {
                            // Extract base64 data
                            const base64Data = imgSrc.split(',')[1]
                            const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))

                            paragraphs.push(
                                new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: imageBuffer,
                                            transformation: {
                                                width: 600,
                                                height: 400
                                            }
                                        })
                                    ],
                                    spacing: { before: 200, after: 200 },
                                    alignment: AlignmentType.CENTER
                                })
                            )
                        } catch (error) {
                            console.error('Error processing image:', error)
                        }
                    }
                    break

                default:
                    // Process child nodes for other elements
                    for (const child of Array.from(node.childNodes)) {
                        await processNode(child)
                    }
            }
        }
    }

    const processInlineElements = (element: HTMLElement, runs: TextRun[]): void => {
        for (const child of Array.from(element.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent
                if (text) {
                    runs.push(new TextRun(text))
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const childElement = child as HTMLElement
                const tagName = childElement.tagName.toLowerCase()
                const text = childElement.textContent || ''

                let isBold = false
                let isItalic = false
                let isUnderline = false
                let isStrike = false

                // Check for formatting
                if (tagName === 'strong' || tagName === 'b') isBold = true
                if (tagName === 'em' || tagName === 'i') isItalic = true
                if (tagName === 'u') isUnderline = true
                if (tagName === 's' || tagName === 'strike') isStrike = true

                runs.push(
                    new TextRun({
                        text,
                        bold: isBold,
                        italics: isItalic,
                        underline: isUnderline ? {} : undefined,
                        strike: isStrike
                    })
                )
            }
        }
    }

    // Process all nodes
    for (const child of Array.from(body.childNodes)) {
        await processNode(child)
    }

    // Create the document
    const document = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 1440,    // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440
                        }
                    }
                },
                children: paragraphs.length > 0 ? paragraphs : [
                    new Paragraph({
                        children: [new TextRun('Empty document')]
                    })
                ]
            }
        ],
        numbering: {
            config: [
                {
                    reference: 'default-numbering',
                    levels: [
                        {
                            level: 0,
                            format: 'decimal',
                            text: '%1.',
                            alignment: AlignmentType.LEFT
                        }
                    ]
                }
            ]
        }
    })

    // Generate and return the buffer
    const buffer = await Packer.toBuffer(document)
    return buffer
}
