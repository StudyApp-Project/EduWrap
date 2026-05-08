import * as pdfjsLib from 'pdfjs-dist';
import localforage from 'localforage';

// Setup PDF.js worker via CDN to avoid bundler issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// Initialize localforage store for PDF text content
const pdfTextStore = localforage.createInstance({
  name: "EduWrap",
  storeName: "pdf_text_content"
});

/**
 * Extract text from a given PDF array buffer
 * @param {ArrayBuffer} data 
 * @returns {Promise<string>} extracted text
 */
async function extractTextFromPDF(data) {
  try {
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw error;
  }
}

/**
 * Fetch a PDF from a URL, extract text, and save to IndexedDB
 * @param {string} id - The note ID to associate with the text
 * @param {string} url - The URL of the PDF (e.g. '/pdfs/file.pdf')
 */
export async function processPDFFromUrl(id, url) {
  // Check if we already extracted this text
  const existing = await pdfTextStore.getItem(id);
  if (existing) return existing;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    
    const text = await extractTextFromPDF(buffer);
    await pdfTextStore.setItem(id, text);
    return text;
  } catch (error) {
    console.error(`Failed to process PDF from URL ${url}:`, error);
    throw error;
  }
}

/**
 * Extract text from a File object and save to IndexedDB
 * @param {string} id 
 * @param {File} file 
 */
export async function processPDFFromFile(id, file) {
  try {
    const buffer = await file.arrayBuffer();
    const text = await extractTextFromPDF(buffer);
    await pdfTextStore.setItem(id, text);
    return text;
  } catch (error) {
    console.error("Failed to process uploaded PDF:", error);
    throw error;
  }
}

/**
 * Get extracted text from IndexedDB
 * @param {string} id 
 */
export async function getPDFText(id) {
  return await pdfTextStore.getItem(id);
}
