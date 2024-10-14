import { setupEventListeners, loadItemsFromLocalStorage } from './script.js';

export function initApp() {
    console.log('Aplicação inicializada');
    loadItemsFromLocalStorage(); 
    setupEventListeners();
}
