import React, { useEffect } from 'react';

/**
 * Universal Escape Key & Backdrop Click Handler for all modals & drawers
 * Automatically closes any open popup form / modal dialog across the entire website
 * whenever the user presses the 'Escape' key or clicks outside the modal dialog.
 */
const GlobalModalEscapeHandler = () => {
  useEffect(() => {
    // 1. ESCAPE KEY LISTENER
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        // Find visible modal overlays (fixed inset-0 or dialogs)
        const openModals = Array.from(
          document.querySelectorAll('.fixed.inset-0, [role="dialog"], [data-modal], div[class*="backdrop-blur"]')
        ).filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        });

        if (openModals.length > 0) {
          const topModal = openModals[openModals.length - 1];

          // Priority 1: Explicit close button or button with X icon in header
          const closeButton = topModal.querySelector(
            '[data-modal-close], button[aria-label*="close" i], button[title*="close" i], button:has(svg.lucide-x), .flex.items-center.justify-between button'
          );
          if (closeButton) {
            closeButton.click();
            return;
          }

          // Priority 2: "Cancel" button in footer
          const cancelButton = Array.from(topModal.querySelectorAll('button')).find(
            (b) => b.textContent.trim().toLowerCase() === 'cancel'
          );
          if (cancelButton) {
            cancelButton.click();
            return;
          }

          // Priority 3: Fallback click on backdrop
          topModal.click();
        }
      }
    };

    // 2. BACKDROP CLICK LISTENER (Click outside modal content box)
    const handleBackdropClick = (e) => {
      if (
        e.target &&
        e.target.classList &&
        e.target.classList.contains('fixed') &&
        e.target.classList.contains('inset-0')
      ) {
        // Find close or cancel button inside this modal
        const closeBtn = e.target.querySelector(
          '[data-modal-close], button[aria-label*="close" i], button[title*="close" i], button:has(svg.lucide-x), .flex.items-center.justify-between button'
        );
        if (closeBtn) {
          closeBtn.click();
        } else {
          const cancelBtn = Array.from(e.target.querySelectorAll('button')).find(
            (b) => b.textContent.trim().toLowerCase() === 'cancel'
          );
          if (cancelBtn) cancelBtn.click();
        }
      }
    };

    // Use capture phase so Esc is intercepted even when inputs have focus
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('click', handleBackdropClick, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('click', handleBackdropClick, true);
    };
  }, []);

  return null;
};

export default GlobalModalEscapeHandler;
