import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

/**
 * React Application Entry Point
 * Initializes the root React element and mounts the app into the DOM.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)

/**
 * Global Scroll Animation Logic
 * This script detects elements with the 'animate-on-scroll' class and 
 * reveals them as they enter the viewport.
 */
const startScrollObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, observerOptions);

  // Function to find and observe elements
  const observeElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
  };

  // Run on initial load
  observeElements();

  // MutationObserver to detect new elements added by React during navigation
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Initialize the observer
if (typeof window !== 'undefined') {
  startScrollObserver();
}


