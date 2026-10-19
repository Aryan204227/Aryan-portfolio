import React, { useState, useEffect, useRef } from 'react';

/**
 * TypeWriter.jsx
 *
 * Premium infinite looping typewriter animation.
 * - Types each phrase character-by-character at natural speed
 * - Pauses, then deletes character-by-character
 * - Loops indefinitely without getting stuck
 * - Blinking neon-lime cursor
 * - Respects prefers-reduced-motion (shows static text instead)
 * - Reserves stable height to prevent layout shift
 */
const PHRASES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Java & DSA Enthusiast',
  'AI Project Developer',
];

const TYPING_SPEED_MIN = 55;
const TYPING_SPEED_MAX = 100;
const DELETE_SPEED = 38;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 380;

export default function TypeWriter({ className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor blink
  useEffect(() => {
    if (prefersReducedMotion) return;
    const blink = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(blink);
  }, [prefersReducedMotion]);

  // Typing engine
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(PHRASES[0]);
      return;
    }

    const currentPhrase = PHRASES[phraseIndex];

    const tick = () => {
      if (isPaused) return;

      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentPhrase.length) {
          const speed =
            TYPING_SPEED_MIN +
            Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN);
          timeoutRef.current = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          }, speed);
        } else {
          // Finished typing — pause then start deleting
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, PAUSE_AFTER_TYPE);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, displayText.length - 1));
          }, DELETE_SPEED);
        } else {
          // Finished deleting — pause then move to next phrase
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(false);
            setPhraseIndex(i => (i + 1) % PHRASES.length);
          }, PAUSE_AFTER_DELETE);
        }
      }
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, isPaused, phraseIndex, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={`text-lime-400 ${className}`}>
        {PHRASES[0]}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-lime-400 font-semibold">{displayText}</span>
      {/* Blinking cursor */}
      <span
        className="ml-0.5 inline-block w-[2px] h-[1.1em] bg-lime-400 rounded-full"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.08s',
          verticalAlign: 'middle',
          position: 'relative',
          top: '-0.05em',
        }}
        aria-hidden="true"
      />
    </span>
  );
}
