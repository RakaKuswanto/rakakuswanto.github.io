import './game/Globals.js';

async function boot() {
    // Load modules in the exact order of the original <script> tags
    // and expose their exports to window to maintain legacy compatibility
    
    const BigVars = await import('./game/BigVars.js');
    Object.assign(window, BigVars);
    
    const Menu = await import('./game/Menu.js');
    Object.assign(window, Menu);
    
    const Functions = await import('./game/Functions.js');
    Object.assign(window, Functions);
    
    const Perso = await import('./game/Perso.js');
    Object.assign(window, Perso);
    
    const Pipa = await import('./game/Pipa.js');
    Object.assign(window, Pipa);
    
    const Balao = await import('./game/Balao.js');
    Object.assign(window, Balao);
    
    const Cenarios = await import('./game/Cenarios.js');
    Object.assign(window, Cenarios);
    
    const Controler = await import('./game/Controler.js');
    Object.assign(window, Controler);
    
    const Pipas = await import('./game/Pipas.js');
    Object.assign(window, Pipas);
    
    const Relo = await import('./game/Relo.js');
    Object.assign(window, Relo);
    
    const Armacoes = await import('./game/Armacoes.js');
    Object.assign(window, Armacoes);
    
    const Camera = await import('./game/Camera.js');
    Object.assign(window, Camera);
    
    const Main = await import('./game/Main.js');
    Object.assign(window, Main);

    // Initialize dependent globals now that all functions and variables are available on window
    window.cameraDefault = window.cam1;
    window.mobile = window.isMobileAll();
    window.android = window.isMobile.Android();
    window.iOS = window.isMobile.iOS();
    window._90graus = window.de2ra(90);
    window._180graus = window.de2ra(180);
    window._360graus = window.de2ra(360);

    // Finally, initialize the game (previously called at the bottom of index.html)
    window.init();
}

boot();
