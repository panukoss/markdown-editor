import React, { useState } from 'react';
import { FileText, FileDown, AlertCircle } from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore';
import { exportToPDF } from '../../utils/exportPDF';
import { exportToDocx } from '../../utils/exportDocx';
import { exportToMarkdown } from '../../utils/exportMarkdown';

type ExportFormat = 'pdf' | 'docx' | 'md';

interface ExportOption {
  format: ExportFormat;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ExportModal: React.FC = () => {
  const { content } = useEditorStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportOptions: ExportOption[] = [
    {
      format: 'pdf',
      title: 'PDF Document',
      description: 'Export as PDF with formatted text and syntax highlighting',
      icon: <FileText className="w-8 h-8 text-red-500" />
    },
    {
      format: 'docx',
      title: 'Word Document',
      description: 'Export as DOCX for editing in Microsoft Word',
      icon: <FileText className="w-8 h-8 text-blue-500" />
    },
    {
      format: 'md',
      title: 'Markdown File',
      description: 'Export raw markdown for version control or sharing',
      icon: <FileText className="w-8 h-8 text-gray-500" />
    }
  ];

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    setExportError(null);

    try {
      const fileName = `document_${new Date().toISOString().split('T')[0]}`;
      
      switch (format) {
        case 'pdf':
          await exportToPDF(content, fileName);
          break;
        case 'docx':
          await exportToDocx(content, fileName);
          break;
        case 'md':
          exportToMarkdown(content, fileName);
          break;
      }
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {!content && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <AlertCircle className="w-5 h-5" />
            <span>No content to export. Please add some text to the editor.</span>
          </div>
        </div>
      )}
      
      {content && (
        <p className="text-gray-600 dark:text-gray-400">
          Choose your preferred export format:
        </p>
      )}

      {exportError && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-200">Export Error</p>
            <p className="text-sm text-red-600 dark:text-red-400">{exportError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((option) => (
          <button
            key={option.format}
            onClick={() => handleExport(option.format)}
            disabled={isExporting || !content}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center space-y-3">
              {option.icon}
              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              </div>
              {isExporting && (
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Exporting...
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};