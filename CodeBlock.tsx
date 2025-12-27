interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

// Simple syntax highlighting for Python
const highlightPython = (code: string): React.ReactNode[] => {
  const keywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'return', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'pass', 'break', 'continue', 'global', 'nonlocal', 'assert', 'yield', 'raise'];
  const builtins = ['print', 'input', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'bool', 'type', 'isinstance', 'open', 'file', 'abs', 'sum', 'min', 'max', 'sorted', 'enumerate', 'zip', 'map', 'filter'];
  
  const lines = code.split('\n');
  
  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIndex = 0;
    
    // Process comments
    const commentIndex = remaining.indexOf('#');
    let comment = '';
    if (commentIndex !== -1) {
      comment = remaining.slice(commentIndex);
      remaining = remaining.slice(0, commentIndex);
    }
    
    // Process strings
    const stringRegex = /(["'])((?:\\\1|(?:(?!\1)).)*)(\1)/g;
    let lastIndex = 0;
    let match;
    const segments: { type: 'text' | 'string'; value: string }[] = [];
    
    while ((match = stringRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', value: remaining.slice(lastIndex, match.index) });
      }
      segments.push({ type: 'string', value: match[0] });
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < remaining.length) {
      segments.push({ type: 'text', value: remaining.slice(lastIndex) });
    }
    
    if (segments.length === 0 && remaining) {
      segments.push({ type: 'text', value: remaining });
    }
    
    // Process each segment
    segments.forEach((segment, segIndex) => {
      if (segment.type === 'string') {
        parts.push(
          <span key={`${lineIndex}-${partIndex++}`} className="code-string">
            {segment.value}
          </span>
        );
      } else {
        // Process keywords and numbers in text segments
        const words = segment.value.split(/(\s+|[()[\]{},.:=+\-*/<>!])/);
        words.forEach((word, wordIndex) => {
          if (keywords.includes(word)) {
            parts.push(
              <span key={`${lineIndex}-${partIndex++}`} className="code-keyword">
                {word}
              </span>
            );
          } else if (builtins.includes(word)) {
            parts.push(
              <span key={`${lineIndex}-${partIndex++}`} className="text-accent">
                {word}
              </span>
            );
          } else if (/^\d+(\.\d+)?$/.test(word)) {
            parts.push(
              <span key={`${lineIndex}-${partIndex++}`} className="code-number">
                {word}
              </span>
            );
          } else {
            parts.push(
              <span key={`${lineIndex}-${partIndex++}`} className="text-code-text">
                {word}
              </span>
            );
          }
        });
      }
    });
    
    // Add comment
    if (comment) {
      parts.push(
        <span key={`${lineIndex}-comment`} className="code-comment">
          {comment}
        </span>
      );
    }
    
    return (
      <div key={lineIndex} className="leading-relaxed">
        {parts.length > 0 ? parts : <span>&nbsp;</span>}
      </div>
    );
  });
};

const CodeBlock = ({ code, language = 'python', className = '' }: CodeBlockProps) => {
  return (
    <div className={`code-block font-mono text-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">{language}</span>
      </div>
      <code>{highlightPython(code)}</code>
    </div>
  );
};

export default CodeBlock;
