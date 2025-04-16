// ==UserScript==
// @name         Démineur.eu - Observer les tuiles et les remplacer
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Remplace les tuiles spécifiques dès qu'elles apparaissent ou changent (clic gauche + droit), change le fond du plateau en noir, et ajuste les tailles d'image automatiquement.
// @match        https://xn--dmineur-bya.eu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // CASE NON DÉCOUVERTE
    const targetSrc_not_discovery = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb3///97e3uVBMaVAAAAHklEQVQI12MIDQ0NARFBDAEMDFzkEl6rVq1i0AISAIlSC03msuDYAAAAAElFTkSuQmCC";
    const replacementURL_not_discovery = "https://i.imgur.com/cr99xMW.png";
    const targetSrc_discovery = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEW9vb17e3tXxGy+AAAAEElEQVQI12P4/5+hgYF4BAAJYgl/JfpRmAAAAABJRU5ErkJggg==";
    const replacementURL_discovery = "https://i.imgur.com/Fqno1th.png";
    const targetSrc_flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEW9vb3///97e3sAAAD/AABQHuKJAAAAOklEQVQI12MQhAABGIOJQZABDJRADBYHCIPFBcpwcUGIIKsB6zJAZxgbQxjGQIDEQFghoAQBDExQBgCHngoRLPdU8QAAAABJRU5ErkJggg==";
    const replacementURL_flag = "https://i.imgur.com/0uV6RY4.png";
    const targetSrc_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb0AAP97e3u7pKrVAAAAJUlEQVQI12NYBQQMDQxAACUCgAQjiGAFEaIQLiYhGgojEHqBGAB4Gw2cMF3q+AAAAABJRU5ErkJggg==";
    const replacementURL_1 = "https://i.imgur.com/1u4au54.png";
    const targetSrc_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb0AewB7e3vro336AAAANUlEQVQI12NYBQQMDQxAACFCQxkYGkNDHRgaA1gdgGJgIhQowRoCknUAygIZYCVgAqwNQQAA1rsQB7h1rwIAAAAASUVORK5CYII=";
    const replacementURL_2 = "https://i.imgur.com/Afu50rU.png";
    const targetSrc_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb3/AAB7e3uBZQfoAAAAKUlEQVQI12NYBQQMDQxAACYaQ0PBhAOQywojWIFiIAIhBlICJiDaEAQAtlYPHU2zahQAAAAASUVORK5CYII=";
    const replacementURL_3 = "https://i.imgur.com/X5mY7x0.png";
    const targetSrc_4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb0AAHt7e3vZn4u5AAAAJklEQVQI12NYBQQMDQxAACFERWFECIxoDA11ABNAJUAuBsGARAAAgHoNeXfAhZYAAAAASUVORK5CYII=";
    const replacementURL_4 = "https://i.imgur.com/ODTf4CS.png";
    const targetSrc_5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb17AAB7e3sERFEmAAAAKUlEQVQI12NYBQQMDQxAACYaQ0MdoEQAiBsAEYNIAJWwQgi4Oog2BAEA7gEQV+EiCoQAAAAASUVORK5CYII=";
    const replacementURL_5 = "https://i.imgur.com/ptLyCNn.png";
    const targetSrc_6 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb0Ae3t7e3tXnVpnAAAAKklEQVQI12NYBQQMDQxAACFCQxkYGsFEAAOMgIo5ALmsEALMBSmGaEMQAOO9EHd34ZsRAAAAAElFTkSuQmCC";
    const replacementURL_6 = "https://i.imgur.com/GfxozYk.png";
    const targetSrc_7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEW9vb0AAAB7e3tloawkAAAAKUlEQVQI12NYBQQMDQxAACYaQ0MdwASQywonRBlgRAiMYAwAExBtCAIAoJQN/Vp/RC0AAAAASUVORK5CYII=";
    const replacementURL_7 = "https://i.imgur.com/tYqumaJ.png";
    const targetSrc_8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEW9vb17e3tXxGy+AAAAJklEQVQI12P4/5+hgQGE+j8wzP/BMMcCiIBsIIKwgYJANlABBAEAuf8Q+fimVN8AAAAASUVORK5CYII=";
    const replacementURL_8 = "https://i.imgur.com/8AilmGf.png";
    const targetSrc_bomb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEW9vb0AAAB7e3v///9j2HHCAAAANElEQVQI12NYBQQMDQxA0MDgACNcQxwYGkRDgaz4UAcI0RoaGsLQEApkAQmwLEQdQhvYFAAmDxJuxV7pRgAAAABJRU5ErkJggg==";
    const replacementURL_bomb = "https://i.imgur.com/Ylv7mGY.png";
    const targetSrc_bomb_click = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX/AAAAAAB7e3v///9Ql2ugAAAANElEQVQI12NYBQQMDQxA0MDgACNcQxwYGkRDgaz4UAcI0RoaGsLQEApkAQmwLEQdQhvYFAAmDxJuxV7pRgAAAABJRU5ErkJggg==";
    const replacementURL_bomb_click = "https://i.imgur.com/1MQyIXM.png";

    function replaceTiles() {
        const tiles = document.querySelectorAll('img');
        tiles.forEach(tile => {
            if (tile.src === targetSrc_not_discovery) tile.src = replacementURL_not_discovery, adjustImageSize(tile);
            else if (tile.src === targetSrc_discovery) tile.src = replacementURL_discovery, adjustImageSize(tile);
            else if (tile.src === targetSrc_flag) tile.src = replacementURL_flag, adjustImageSize(tile);
            else if (tile.src === targetSrc_1) tile.src = replacementURL_1, adjustImageSize(tile);
            else if (tile.src === targetSrc_2) tile.src = replacementURL_2, adjustImageSize(tile);
            else if (tile.src === targetSrc_3) tile.src = replacementURL_3, adjustImageSize(tile);
            else if (tile.src === targetSrc_4) tile.src = replacementURL_4, adjustImageSize(tile);
            else if (tile.src === targetSrc_5) tile.src = replacementURL_5, adjustImageSize(tile);
            else if (tile.src === targetSrc_6) tile.src = replacementURL_6, adjustImageSize(tile);
            else if (tile.src === targetSrc_7) tile.src = replacementURL_7, adjustImageSize(tile);
            else if (tile.src === targetSrc_8) tile.src = replacementURL_8, adjustImageSize(tile);
            else if (tile.src === targetSrc_bomb) tile.src = replacementURL_bomb, adjustImageSize(tile);
            else if (tile.src === targetSrc_bomb_click) tile.src = replacementURL_bomb_click, adjustImageSize(tile);
        });
    }

    function adjustImageSize(image) {
        const width = image.style.width ? parseFloat(image.style.width) : 32;
        const height = image.style.height ? parseFloat(image.style.height) : 32;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        image.style.imageRendering = 'pixelated';
    }

    function setBackgroundColor() {
        const board = document.getElementById('board');
        if (board) {
            board.style.backgroundColor = 'black';
        }

        const rightbarTable = document.querySelector('#rightbar > table');
        if (rightbarTable) {
            rightbarTable.style.display = 'none';
        }
    }

    const observer = new MutationObserver(() => {
        replaceTiles();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']
    });

    window.addEventListener('load', () => {
        replaceTiles();
        setBackgroundColor();
    });
})();
