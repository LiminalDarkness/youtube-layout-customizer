// ==UserScript==
// @name         YouTube Layout Customizer (Responsive Breakpoints)
// @namespace    http://tampermonkey.net/
// @icon         https://media.tenor.com/8uAPPH9GpOUAAAAe/white-monkey-confused.png
// @version      1.7
// @author       Darkside
// @description  Responsive YouTube layout customization for homepage and channels with breakpoints for screen width changes.
// @match        https://www.youtube.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/LiminalDarkness/youtube-layout-customizer/main/youtube-layout-customizer.user.js
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    document.head.appendChild(style);

    function getPageType() {
        const path = location.pathname;

        if (path === '/' || path.startsWith('/feed')) {
            return 'home';
        }

        if (path.match(/^\/@[^\/]+(\/(videos|featured|shorts)?)?$/) ||
            path.startsWith('/channel/')) {
            return 'channel';
        }

        return 'other';
    }

    function updateStyle() {
        const pageType = getPageType();

        style.textContent = `
            /* Homepage layout breakpoints */
            ${pageType === 'home' ? `
            @media (min-width: 2000px) {
                ytd-rich-grid-renderer {
                    --ytd-rich-grid-items-per-row: 6 !important;
                }
            }
            @media (min-width: 1700px) and (max-width: 1999px) {
                ytd-rich-grid-renderer {
                    --ytd-rich-grid-items-per-row: 5 !important;
                }
            }
            /* Below 1700px, let YouTube handle it by default */
            ` : ''}

            /* Channel layout (override only for ultra-wide screens) */
            @media (min-width: 1800px) {
                ytd-browse[page-subtype="channels"] ytd-rich-grid-renderer {
                    --ytd-rich-grid-items-per-row: 4 !important;
                }
            }
        `;
    }

    window.addEventListener('yt-navigate-finish', updateStyle);
    updateStyle();
})();
