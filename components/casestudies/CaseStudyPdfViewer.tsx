"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AlertCircle, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker + asset paths are served from /public (copied at setup time).
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDF_OPTIONS = {
  cMapUrl: "/cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "/standard_fonts/",
};

export default function CaseStudyPdfViewer({ file }: { file: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(280);
  const [error, setError] = useState(false);
  const options = useMemo(() => PDF_OPTIONS, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(200, el.clientWidth - 24));
    measure(); // measure immediately so the page never renders wider than the panel
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto overflow-x-hidden px-3 py-3">
      {error ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted">
          <AlertCircle className="h-6 w-6 text-amber" />
          Couldn&apos;t load the PDF.
          <span className="text-xs">Check the file path in lib/constants.ts.</span>
        </div>
      ) : (
        <Document
          file={file}
          options={options}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setError(true)}
          loading={
            <div className="flex h-64 items-center justify-center text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <Page
                pageNumber={i + 1}
                width={width}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading={
                  <div className="flex h-64 items-center justify-center text-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                }
              />
            </div>
          ))}
        </Document>
      )}
    </div>
  );
}
