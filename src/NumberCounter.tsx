import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

interface NumberCounterProps {
  start: number;
  end: number;
  duration: number;
}


const NumberCounter: React.FC<NumberCounterProps> = ({ start, end, duration }) => {
  const editorRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (editorRef.current) {
      const editor = grapesjs.init({
        container: editorRef.current,
        fromElement: true,
        plugins: ['gjs-preset-webpage'],
        storageManager: false,
      });

      const counterComponent = editor.DomComponents.addComponent({
        name: 'NumberCounter',
        isComponent: (el: HTMLElement) => el.classList && el.classList.contains('number-counter'),
        model: {
        defaults: {
          start,
          end,
          duration,
        },
      },
      view: {
        init() {
          this.listenTo(this.model, 'change:start change:end change:duration', this.updateContent);
        },
        updateContent() {
          const { start, end, duration } = this.model.attributes;
          const element = this.el;
          element.innerHTML = start.toString(); // Initial value

          let current = start;
          const step = (end - start) / (duration / 1000); // Calculate step based on duration

          const intervalId = setInterval(() => {
            current += step;
            element.innerHTML = Math.round(current).toString();

            if (current >= end) {
              clearInterval(intervalId);
              element.innerHTML = end.toString(); // Ensure the final value is exact
            }
          }, 1000); // Update every second
        },
      },
    });

    editor.setComponents([counterComponent]);
  }}, [start, end, duration]);

  return <div ref={editorRef}></div>;
};

export default NumberCounter;
