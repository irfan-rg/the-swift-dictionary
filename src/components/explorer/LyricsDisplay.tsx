'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getEraColor } from '@/lib/constants';
import type { Word } from '@/lib/types';

interface LyricsDisplayProps {
  lyrics: string;
  vocabWords: Word[];
  albumSlug: string;
  onWordClick: (word: Word) => void;
}

export default function LyricsDisplay({ lyrics, vocabWords, albumSlug, onWordClick }: LyricsDisplayProps) {
  const eraColor = getEraColor(albumSlug);

  // Group lyrics into stanzas separated by empty lines
  const sections = useMemo(() => {
    // Normalize newlines and split by double blank lines
    const rawStanzas = lyrics.replace(/\r\n/g, '\n').split(/\n\s*\n/);
    
    return rawStanzas.map((stanzaText) => {
      const lines = stanzaText.split('\n').map(l => l.trim()).filter(l => l !== '');
      if (lines.length === 0) return null;
      
      let header = '';
      let type = 'verse';
      
      // If stanza has a bracket header
      if (lines[0].startsWith('[') && lines[0].endsWith(']')) {
        header = lines[0].slice(1, -1); // remove brackets
        const lowerHeader = header.toLowerCase();
        
        if (lowerHeader.includes('chorus')) type = 'chorus';
        else if (lowerHeader.includes('bridge')) type = 'bridge';
        else if (lowerHeader.includes('intro') || lowerHeader.includes('outro')) type = 'intro';
        
        lines.shift(); // remove header from lyrics lines
      }
      
      return { type, header, lines };
    }).filter(Boolean) as { type: string, header: string, lines: string[] }[];
  }, [lyrics]);

  // Helper to escape regex
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlightLine = (line: string, index: number) => {
    if (vocabWords.length === 0 || line.trim() === '') {
      return <span key={index}>{line || '\u00A0'}</span>;
    }

    const sortedWords = [...vocabWords].sort((a, b) => b.word.length - a.word.length);
    const pattern = new RegExp(`\\b(${sortedWords.map(w => escapeRegExp(w.word)).join('|')})\\b`, 'gi');
    const parts = line.split(pattern);

    return (
      <span key={index} className="block min-h-[1.5em]">
        {parts.map((part, i) => {
          if (i % 2 === 1) { // matched word
            const matchLower = part.toLowerCase();
            const wordObj = sortedWords.find(w => w.word.toLowerCase() === matchLower);
            if (wordObj) {
              return (
                <span
                  key={i}
                  onClick={() => onWordClick(wordObj)}
                  className="cursor-pointer font-medium hover:opacity-80 transition-opacity"
                  style={{
                    color: eraColor,
                    borderBottom: `1px dotted ${eraColor}`,
                  }}
                  title="View definition"
                >
                  {part}
                </span>
              );
            }
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="font-body text-sm text-[var(--foreground)] leading-[2] space-y-6">
      {sections.map((section, secIdx) => {
        let sectionClasses = "transition-all duration-300 ";
        let headerClasses = "font-body text-[10px] tracking-widest uppercase mb-2 opacity-50";
        let wrapperStyle: React.CSSProperties = {};

        // Apply distinct styling based on section type
        if (section.type === 'chorus') {
          sectionClasses += "pl-4 max-md:pl-3 py-2 border-l-2 rounded-r-sm ";
          wrapperStyle = { 
            borderColor: eraColor,
            backgroundColor: `color-mix(in srgb, ${eraColor} 5%, transparent)`
          };
          headerClasses = "font-body text-[10px] tracking-widest uppercase mb-2 opacity-80 font-medium";
        } else if (section.type === 'bridge') {
          sectionClasses += "italic pl-6 max-md:pl-4 opacity-90 border-l border-[var(--border)] ";
        } else if (section.type === 'intro') {
          sectionClasses += "opacity-60 text-[13px] ";
        } else {
          // Standard Stanza: Simple interactive reading block
          // Adds a subtle hover state to make reading raw text feel polished
          sectionClasses += "opacity-85 hover:opacity-100 pl-4 max-md:pl-2 border-l-2 border-transparent hover:border-[var(--border-focus)] transition-all py-1 -ml-4 max-md:-ml-2 ";
        }

        return (
          <motion.div 
            key={secIdx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: secIdx * 0.05 }}
            className={sectionClasses}
            style={wrapperStyle}
          >
            {section.header && (
              <div 
                className={headerClasses}
                style={section.type === 'chorus' ? { color: eraColor } : {}}
              >
                {section.header}
              </div>
            )}
            <div>
              {section.lines.map((line, lineIdx) => highlightLine(line, lineIdx))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
