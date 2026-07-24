const landingStage = document.querySelector('#landingStage');
const deviceStage = document.querySelector('#deviceStage');
const desktopStage = document.querySelector('#desktopStage');
const systemMode = document.querySelector('#systemMode');
const clockDisplay = document.querySelector('#clockDisplay');
const appSheetLayer = document.querySelector('#appSheetLayer');
const taskSwitcher = document.querySelector('#taskSwitcher');
const taskStackList = document.querySelector('#taskStackList');
const getStartedBtn = document.querySelector('#getStartedBtn');
const backButton = document.querySelector('#backButton');
const homeButton = document.querySelector('#homeButton');
const stacksButton = document.querySelector('#stacksButton');
const closeStacksBtn = document.querySelector('#closeStacksBtn');

const stockDatabase = [
  { symbol: 'AAPL', name: 'Apple Inc.', market: 'NASDAQ', currency: '$', price: 214.42 },
  { symbol: 'TSLA', name: 'Tesla Inc.', market: 'NASDAQ', currency: '$', price: 286.15 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', market: 'NASDAQ', currency: '$', price: 162.88 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', market: 'NSE', currency: '₹', price: 1429.2 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', market: 'NSE', currency: '₹', price: 3892.5 },
  { symbol: 'INFOSYS', name: 'Infosys Ltd.', market: 'NSE', currency: '₹', price: 1584.3 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', market: 'NASDAQ', currency: '$', price: 501.31 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', market: 'NASDAQ', currency: '$', price: 193.75 },
];

const appRegistry = {
  clock: {
    title: 'Stocks Shower',
    subtitle: 'Global Market Terminal',
    icon: 'fa-solid fa-chart-line',
    theme: 'theme-clock',
    body: () => `
      <section class="market-terminal" aria-label="Stocks Shower market terminal">
        <article class="panel-card">
          <p class="terminal-kicker">Search & Directory Panel</p>
          <h3>Equity Directory</h3>
          <input class="display-panel" data-stock-search type="text" autocomplete="off" placeholder="Search AAPL, TSLA, NVDA, RELIANCE..." aria-label="Search stock tickers" />
          <div class="stock-directory" data-stock-directory aria-label="Filtered stock directory"></div>
        </article>
        <article class="panel-card stock-chart-panel">
          <div class="stock-profile">
            <div>
              <p class="terminal-kicker">Live Charting Panel</p>
              <h3 data-stock-name>Select a ticker</h3>
              <p class="muted" data-stock-market>Waiting for market feed.</p>
            </div>
            <div>
              <span class="stock-live-label">LIVE</span>
              <div class="big-metric stock-price" data-stock-price>--</div>
              <small data-stock-delta>0.00%</small>
            </div>
          </div>
          <svg id="stockChart" class="stock-chart" viewBox="0 0 500 200" preserveAspectRatio="none" role="img" aria-label="Live stock trend graph">
            <path data-stock-path d="" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </article>
      </section>
    `,
  },
  converter: {
    title: 'Any-to-Any Transcoder',
    subtitle: 'Local client-side image and data pipeline',
    icon: 'fa-solid fa-right-left',
    theme: 'theme-converter',
    body: () => `
      <section class="transcoder-shell" aria-label="Any-to-any transcoder">
        <article class="panel-card wide drop-zone" data-drop-zone>
          <h3>Import Console</h3>
          <p>Drop a PNG, JPG, WebP, JSON, CSV, Markdown, or mock large file into this local-only processing surface.</p>
          <input class="display-panel" data-file-input type="file" accept="image/png,image/jpeg,image/webp,.json,.csv,.md,.markdown,text/*" />
        </article>
        <article class="panel-card wide">
          <div class="converter-grid">
            <label>Input format<select class="select-field" data-input-format><option value="auto">Auto Detect</option><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option><option value="json">JSON</option><option value="csv">CSV</option><option value="markdown">Markdown</option></select></label>
            <label>Target output<select class="select-field" data-target-format><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option><option value="csv">CSV</option><option value="json">JSON</option><option value="html">HTML</option><option value="zip">Mock ZIP</option></select></label>
            <button class="soft-key primary-soft-key" data-transcode-button type="button">Process & Transcode</button>
          </div>
        </article>
        <article class="panel-card wide">
          <h3>High-Performance Progress Simulator</h3>
          <div class="progress-rail"><span class="progress-fill" data-transcode-progress style="--progress:0%"></span></div>
          <div class="transcode-metrics" data-transcode-metrics>Idle · 0 MB/s · 0 bytes read · block 0/100</div>
          <pre data-transcode-log>Awaiting import.</pre>
        </article>
      </section>
    `,
  },
  notepad: {
    title: 'Micro-Control Lab',
    subtitle: 'Visual wiring workspace and code synthesis engine',
    icon: 'fa-solid fa-microchip',
    theme: 'theme-notepad',
    body: () => `
      <section class="micro-lab-shell" aria-label="Micro-Control Lab">
        <article class="panel-card">
          <p class="terminal-kicker">Interactive Wire Map</p>
          <h3>Controller + Peripheral Modules</h3>
          <label>Microcontroller<select class="select-field" data-board-select><option value="arduino">Arduino Uno</option><option value="esp32">ESP32</option></select></label>
          <div class="hardware-options">
            ${['RGB LED','10K Potentiometer','Analog Temperature Sensor','Micro Servo Motor'].map((part) => `<button class="hardware-chip" type="button" data-component="${part}">${part}</button>`).join('')}
          </div>
          <h3>Wiring Blueprints</h3>
          <pre class="blueprint-output" data-wiring-output>Select a module to generate exact pinout instructions.</pre>
        </article>
        <article class="panel-card">
          <div class="code-header"><h3>Live Generated Source Code</h3><button class="soft-key primary-soft-key" data-copy-code type="button">Copy Code</button></div>
          <pre class="code-output" data-code-output></pre>
          <div class="ohm-diagnostic">
            <h3>Ohm's Law Circuit Diagnostic</h3>
            <label>Input Voltage: <span data-voltage-label>5.0V</span><input data-voltage-input type="range" min="1" max="12" step="0.1" value="5" /></label>
            <label>Resistance: <span data-resistor-label>220Ω</span><input data-resistor-input type="range" min="50" max="2000" step="10" value="220" /></label>
            <p data-ohm-output></p>
          </div>
        </article>
      </section>
    `,
  },
  ai: {
    title: 'Jarvis Terminal',
    subtitle: 'System console and shell utilities',
    icon: 'fa-solid fa-brain',
    theme: 'theme-ai',
    body: () => `
      <section class="chat-panel" aria-label="Jarvis terminal">
        <div class="chat-log" data-chat-log><div class="message system">Jarvis Terminal online. Commands: /clear, /time, /note [text].</div></div>
        <form class="chat-form" data-chat-form><input data-chat-input type="text" autocomplete="off" placeholder="Type /time, /note build plan, or /clear" /><button type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button></form>
      </section>
    `,
  },
  calculator: {
    title: 'Calculator',
    subtitle: 'Quick formulas and arithmetic',
    icon: 'fa-solid fa-calculator',
    theme: 'theme-calculator',
    body: () => `<section class="calculator-shell"><input class="display-panel" data-calculator-display value="0" readonly /> <div class="key-grid">${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'].map((key) => `<button class="soft-key" type="button" data-calc-key="${key}">${key}</button>`).join('')}<button class="soft-key primary-soft-key" type="button" data-calc-key="=" style="grid-column:1/-1">=</button></div></section>`,
  },
  video: {
    title: 'Video Studio',
    subtitle: 'Media/video timeline panel',
    icon: 'fa-solid fa-film',
    theme: 'theme-video',
    body: () => `<section class="panel-grid"><article class="panel-card wide"><h3>Timeline Assembly</h3><p>Storyboard clips, transitions, captions, b-roll, aspect-ratio presets, and export lanes.</p><div class="progress-rail"><span class="progress-fill" style="--progress:66%"></span></div></article></section>`,
  },
  audio: {
    title: 'Audio Studio',
    subtitle: 'Voice and audio production panel',
    icon: 'fa-solid fa-microphone-lines',
    theme: 'theme-audio',
    body: () => `<section class="panel-grid"><article class="panel-card wide"><h3>Production Chain</h3><p>Narration, music beds, ambience, sound design, and mastering controls.</p><div class="progress-rail"><span class="progress-fill" style="--progress:72%"></span></div></article></section>`,
  },
};

let activeDevice = 'Computer';
let currentAppKey = null;
let stockInterval = null;
let activeStock = null;
let uploadedFile = null;
const runningApps = new Set();
const appHistory = [];
const stages = { landing: landingStage, device: deviceStage, desktop: desktopStage };

function switchStage(stageName) {
  Object.entries(stages).forEach(([name, stage]) => {
    const active = name === stageName;
    stage.classList.toggle('is-active', active);
    stage.setAttribute('aria-hidden', String(!active));
  });
}

function showDeviceSelection(event) {
  event?.preventDefault();
  switchStage('device');
}

function updateClock() {
  const now = new Date();
  clockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  clockDisplay.dateTime = now.toISOString();
}

function launchDesktop(device) {
  activeDevice = device || 'Computer';
  systemMode.textContent = `WizOS - ${activeDevice} Mode`;
  closeTaskSwitcher();
  closeActiveSheet({ clearHistory: true });
  switchStage('desktop');
}

function openApp(appKey, options = {}) {
  const app = appRegistry[appKey];
  if (!app) return;
  stopStockTicker();
  if (currentAppKey && currentAppKey !== appKey && options.trackHistory !== false) appHistory.push(currentAppKey);
  runningApps.add(appKey);
  currentAppKey = appKey;
  appSheetLayer.innerHTML = createAppSheetMarkup(appKey, app);
  appSheetLayer.classList.add('is-open');
  appSheetLayer.setAttribute('aria-hidden', 'false');
  const sheet = appSheetLayer.querySelector('.app-sheet');
  requestAnimationFrame(() => sheet.classList.add('is-active'));
  hydrateAppSheet(appKey);
  renderTaskSwitcher();
}

function createAppSheetMarkup(appKey, app) {
  return `
    <article class="app-sheet" data-active-app="${appKey}" role="dialog" aria-modal="true" aria-label="${app.title}">
      <header class="sheet-header">
        <span class="sheet-app-icon ${app.theme}"><i class="${app.icon}" aria-hidden="true"></i></span>
        <div class="sheet-title-group"><h2>${app.title}</h2><p>${app.subtitle}</p></div>
      </header>
      <div class="sheet-body">${app.body()}</div>
    </article>
  `;
}

function closeActiveSheet(options = {}) {
  stopStockTicker();
  if (options.clearHistory) appHistory.length = 0;
  currentAppKey = null;
  const sheet = appSheetLayer.querySelector('.app-sheet');
  if (!sheet) {
    appSheetLayer.classList.remove('is-open');
    appSheetLayer.setAttribute('aria-hidden', 'true');
    return;
  }
  sheet.classList.remove('is-active');
  window.setTimeout(() => {
    if (!currentAppKey) {
      appSheetLayer.innerHTML = '';
      appSheetLayer.classList.remove('is-open');
      appSheetLayer.setAttribute('aria-hidden', 'true');
    }
  }, 280);
}

function goBack() {
  closeTaskSwitcher();
  if (!currentAppKey) return;
  const previousApp = appHistory.pop();
  if (previousApp) openApp(previousApp, { trackHistory: false });
  else closeActiveSheet();
  renderTaskSwitcher();
}

function goHome() {
  closeTaskSwitcher();
  closeActiveSheet({ clearHistory: true });
  renderTaskSwitcher();
}

function toggleTaskSwitcher() {
  const willOpen = !taskSwitcher.classList.contains('is-open');
  taskSwitcher.classList.toggle('is-open', willOpen);
  taskSwitcher.setAttribute('aria-hidden', String(!willOpen));
  stacksButton.classList.toggle('is-active', willOpen);
  if (willOpen) renderTaskSwitcher();
}

function closeTaskSwitcher() {
  taskSwitcher.classList.remove('is-open');
  taskSwitcher.setAttribute('aria-hidden', 'true');
  stacksButton.classList.remove('is-active');
}

function renderTaskSwitcher() {
  if (!runningApps.size) {
    taskStackList.innerHTML = '<div class="empty-stacks">No running utilities yet. Launch a WizOS tool from the dock to build your stack.</div>';
    return;
  }
  taskStackList.innerHTML = [...runningApps].map((appKey) => {
    const app = appRegistry[appKey];
    const currentClass = appKey === currentAppKey ? ' is-current' : '';
    return `
      <article class="stack-card${currentClass}" data-stack-app="${appKey}" role="button" tabindex="0" aria-label="Switch to ${app.title}">
        <span class="stack-card-icon ${app.theme}"><i class="${app.icon}" aria-hidden="true"></i></span>
        <span class="stack-card-copy"><strong>${app.title}</strong><small>${app.subtitle}</small></span>
        <button class="terminate-app-btn" type="button" data-terminate-app="${appKey}" aria-label="Terminate ${app.title}">×</button>
      </article>
    `;
  }).join('');
  taskStackList.querySelectorAll('[data-stack-app]').forEach((card) => {
    card.addEventListener('click', () => { openApp(card.dataset.stackApp); closeTaskSwitcher(); });
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openApp(card.dataset.stackApp);
      closeTaskSwitcher();
    });
  });
  taskStackList.querySelectorAll('[data-terminate-app]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      terminateApp(button.dataset.terminateApp);
    });
  });
}

function terminateApp(appKey) {
  runningApps.delete(appKey);
  for (let index = appHistory.length - 1; index >= 0; index -= 1) {
    if (appHistory[index] === appKey) appHistory.splice(index, 1);
  }
  if (currentAppKey === appKey) closeActiveSheet();
  renderTaskSwitcher();
}

function hydrateAppSheet(appKey) {
  if (appKey === 'clock') hydrateStocksShower();
  if (appKey === 'converter') hydrateTranscoder();
  if (appKey === 'notepad') hydrateMicroLab();
  if (appKey === 'ai') hydrateJarvisTerminal();
  if (appKey === 'calculator') hydrateCalculator();
}

function hydrateStocksShower() {
  const searchInput = appSheetLayer.querySelector('[data-stock-search]');
  searchInput.addEventListener('input', () => renderStockDirectory(searchInput.value));
  renderStockDirectory('');
  selectStock('AAPL');
}

function renderStockDirectory(query = '') {
  const directory = appSheetLayer.querySelector('[data-stock-directory]');
  if (!directory) return;
  const normalized = query.trim().toUpperCase();
  const rows = stockDatabase.filter((stock) => `${stock.symbol} ${stock.name} ${stock.market}`.toUpperCase().includes(normalized));
  directory.innerHTML = rows.map((stock) => `
    <button class="stock-row${activeStock?.symbol === stock.symbol ? ' is-selected' : ''}" type="button" data-stock-symbol="${stock.symbol}">
      <span><strong>${stock.symbol}</strong><small>${stock.name}</small></span>
      <span>${stock.market}</span>
    </button>
  `).join('');
  directory.querySelectorAll('[data-stock-symbol]').forEach((button) => button.addEventListener('click', () => selectStock(button.dataset.stockSymbol)));
}

function selectStock(symbol) {
  const baseStock = stockDatabase.find((stock) => stock.symbol === symbol);
  if (!baseStock) return;
  activeStock = {
    ...baseStock,
    history: Array.from({ length: 20 }, (_, index) => baseStock.price * (0.97 + Math.random() * 0.06 + index / 1800)),
  };
  stopStockTicker();
  updateStockTicker();
  stockInterval = window.setInterval(updateStockTicker, 1000);
  renderStockDirectory(appSheetLayer.querySelector('[data-stock-search]')?.value || '');
}

function updateStockTicker() {
  if (!activeStock) return;
  const oldPrice = activeStock.price;
  const newPrice = activeStock.price * (1 + (Math.random() - 0.495) * 0.02);
  activeStock.price = Math.max(0.01, newPrice);
  activeStock.history.push(activeStock.price);
  activeStock.history = activeStock.history.slice(-20);
  const change = activeStock.price - oldPrice;
  const percent = oldPrice ? change / oldPrice * 100 : 0;
  const wentUp = change >= 0;
  const priceNode = appSheetLayer.querySelector('[data-stock-price]');
  priceNode.textContent = `${activeStock.currency}${activeStock.price.toFixed(2)}`;
  priceNode.classList.toggle('is-up', wentUp);
  priceNode.classList.toggle('is-down', !wentUp);
  appSheetLayer.querySelector('[data-stock-delta]').textContent = `${wentUp ? '+' : ''}${percent.toFixed(2)}% · ${wentUp ? '+' : ''}${activeStock.currency}${change.toFixed(2)}`;
  appSheetLayer.querySelector('[data-stock-name]').textContent = `${activeStock.symbol} · ${activeStock.name}`;
  appSheetLayer.querySelector('[data-stock-market]').textContent = `${activeStock.market} · 20-point live random-walk feed`;
  drawStockGraph(activeStock.history);
}

function drawStockGraph(history) {
  const path = appSheetLayer.querySelector('[data-stock-path]');
  if (!path) return;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const points = history.map((price, index) => {
    const x = index / (history.length - 1) * 500;
    const y = 185 - (price - min) / range * 170;
    return [x, y];
  });
  const d = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  path.setAttribute('d', d);
}

function stopStockTicker() {
  if (stockInterval) window.clearInterval(stockInterval);
  stockInterval = null;
}

function hydrateTranscoder() {
  const input = appSheetLayer.querySelector('[data-file-input]');
  const dropZone = appSheetLayer.querySelector('[data-drop-zone]');
  const processButton = appSheetLayer.querySelector('[data-transcode-button]');
  input.addEventListener('change', () => { uploadedFile = input.files[0] || null; writeTranscodeLog(uploadedFile ? `Loaded ${uploadedFile.name}` : 'Awaiting import.'); });
  ['dragenter', 'dragover'].forEach((type) => dropZone.addEventListener(type, (event) => { event.preventDefault(); dropZone.classList.add('is-dragging'); }));
  ['dragleave', 'drop'].forEach((type) => dropZone.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.remove('is-dragging');
    if (event.dataTransfer?.files?.[0]) {
      input.files = event.dataTransfer.files;
      uploadedFile = event.dataTransfer.files[0];
      writeTranscodeLog(`Loaded ${uploadedFile.name}`);
    }
  }));
  processButton.addEventListener('click', () => processTranscode());
}

function processTranscode() {
  const file = uploadedFile || appSheetLayer.querySelector('[data-file-input]').files[0];
  const targetFormat = appSheetLayer.querySelector('[data-target-format]').value;
  if (!file) { writeTranscodeLog('Choose or drop a file before processing.'); return; }
  const extension = file.name.split('.').pop().toLowerCase();
  if (file.type.startsWith('image/') && ['png', 'jpeg', 'webp'].includes(targetFormat)) {
    transcodeImage(file, targetFormat);
    return;
  }
  if (['json', 'csv', 'md', 'markdown'].includes(extension)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => transcodeText(file.name, extension, targetFormat, String(reader.result || '')));
    reader.readAsText(file);
    return;
  }
  simulateLargeFileTranscode(file.name);
}

function transcodeImage(file, targetFormat) {
  const image = new Image();
  image.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext('2d').drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL(`image/${targetFormat}`, 0.92);
    downloadData(`wizos-transcoded-${Date.now()}.${targetFormat}`, dataUrl);
    writeTranscodeLog(`Canvas pipeline exported ${image.naturalWidth}×${image.naturalHeight} image/${targetFormat}.`);
    URL.revokeObjectURL(image.src);
  });
  image.src = URL.createObjectURL(file);
}

function transcodeText(fileName, extension, targetFormat, text) {
  if (extension === 'json' && targetFormat === 'csv') {
    const rows = JSON.parse(text);
    const normalizedRows = Array.isArray(rows) ? rows : [rows];
    const keys = [...new Set(normalizedRows.flatMap((row) => Object.keys(row)))];
    const csv = [keys.join(','), ...normalizedRows.map((row) => keys.map((key) => JSON.stringify(row[key] ?? '')).join(','))].join('\n');
    downloadData(fileName.replace(/\.[^.]+$/, '.csv'), `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    writeTranscodeLog('JSON-to-CSV parser completed successfully.');
  } else if (extension === 'csv' && targetFormat === 'json') {
    const [headerLine = '', ...lines] = text.trim().split(/\r?\n/);
    const headers = headerLine.split(',').map((header) => header.trim());
    const json = lines.filter(Boolean).map((line) => Object.fromEntries(line.split(',').map((value, index) => [headers[index], value.trim()])));
    downloadData(fileName.replace(/\.[^.]+$/, '.json'), `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json, null, 2))}`);
    writeTranscodeLog('CSV-to-JSON parser completed successfully.');
  } else if ((extension === 'md' || extension === 'markdown') && targetFormat === 'html') {
    const html = text
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
    downloadData(fileName.replace(/\.[^.]+$/, '.html'), `data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    writeTranscodeLog('Markdown-to-HTML renderer completed successfully.');
  } else {
    simulateLargeFileTranscode(fileName);
  }
}

function simulateLargeFileTranscode(fileName) {
  const progress = appSheetLayer.querySelector('[data-transcode-progress]');
  const metrics = appSheetLayer.querySelector('[data-transcode-metrics]');
  let step = 0;
  const ticker = window.setInterval(() => {
    step += 1;
    const speed = 40 + Math.random() * 120;
    const bytesRead = Math.floor(step * 1048576 * (1 + Math.random() * 2));
    progress.style.setProperty('--progress', `${step}%`);
    metrics.textContent = `${speed.toFixed(1)} MB/s · ${bytesRead.toLocaleString()} bytes read · block ${step}/100`;
    writeTranscodeLog(`Processing ${fileName}\nActive block ${step}/100 · byte window ${bytesRead.toLocaleString()}`);
    if (step >= 100) {
      window.clearInterval(ticker);
      downloadData('wizos-transcoded-output.zip', 'data:application/zip;base64,V2l6T1Mgc2ltdWxhdGVkIHppcCBvdXRwdXQ=');
      writeTranscodeLog('Simulated ZIP output compiled and downloaded.');
    }
  }, 35);
}

function writeTranscodeLog(message) {
  appSheetLayer.querySelector('[data-transcode-log]').textContent = message;
}

function downloadData(fileName, href) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = fileName;
  anchor.hidden = true;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function hydrateMicroLab() {
  appSheetLayer.querySelectorAll('[data-component]').forEach((button) => button.addEventListener('click', () => {
    button.classList.toggle('is-selected');
    compileMicroLab();
  }));
  ['[data-board-select]', '[data-voltage-input]', '[data-resistor-input]'].forEach((selector) => appSheetLayer.querySelector(selector).addEventListener('input', compileMicroLab));
  appSheetLayer.querySelector('[data-copy-code]').addEventListener('click', () => navigator.clipboard?.writeText(appSheetLayer.querySelector('[data-code-output]').textContent));
  compileMicroLab();
}

function compileMicroLab() {
  const board = appSheetLayer.querySelector('[data-board-select]').value;
  const components = [...appSheetLayer.querySelectorAll('[data-component].is-selected')].map((button) => button.dataset.component);
  const pins = board === 'esp32'
    ? { 'RGB LED': 'GPIO 18/19/21', '10K Potentiometer': 'GPIO 34', 'Analog Temperature Sensor': 'GPIO 35', 'Micro Servo Motor': 'GPIO 23' }
    : { 'RGB LED': 'Pins D9/D10/D11', '10K Potentiometer': 'A0', 'Analog Temperature Sensor': 'A1', 'Micro Servo Motor': 'Pin D6' };
  const wiring = components.map((component) => createWiringLine(component, pins[component])).join('\n') || 'Select a module to generate exact pinout instructions.';
  appSheetLayer.querySelector('[data-wiring-output]').textContent = wiring;
  appSheetLayer.querySelector('[data-code-output]').textContent = board === 'esp32' ? createMicroPython(components) : createArduinoSketch(components);
  updateOhmDiagnostic();
}

function createWiringLine(component, pin) {
  if (component === 'RGB LED') return `Connect RGB LED anodes to ${pin}; connect common cathode through 220 Ohm resistors to GND.`;
  if (component === '10K Potentiometer') return `Connect 10K Potentiometer outer legs to VCC and GND; connect center wiper to ${pin}.`;
  if (component === 'Analog Temperature Sensor') return `Connect Analog Temperature Sensor VOUT to ${pin}; connect VCC to regulated supply and GND to common ground.`;
  return `Connect Micro Servo Motor signal to ${pin}; red wire to 5V external rail; brown/black wire to common GND.`;
}

function updateOhmDiagnostic() {
  const voltage = Number(appSheetLayer.querySelector('[data-voltage-input]').value);
  const resistance = Number(appSheetLayer.querySelector('[data-resistor-input]').value);
  const currentMa = voltage / resistance * 1000;
  appSheetLayer.querySelector('[data-voltage-label]').textContent = `${voltage.toFixed(1)}V`;
  appSheetLayer.querySelector('[data-resistor-label]').textContent = `${resistance}Ω`;
  const danger = currentMa > 20;
  appSheetLayer.querySelector('[data-ohm-output]').innerHTML = `I = V / R = ${currentMa.toFixed(2)}mA · <strong class="${danger ? 'danger flash' : 'warning'}">${danger ? 'DANGER: EXCESSIVE CURRENT DRAW! You will burn out the microcontroller pin! Use a larger current-limiting resistor.' : 'Safe current draw for a typical microcontroller GPIO pin.'}</strong>`;
}

function createArduinoSketch(components) {
  return `#include <Servo.h>\nServo servo;\n\nvoid setup() {\n  Serial.begin(9600);\n${components.includes('RGB LED') ? '  pinMode(9, OUTPUT);\n  pinMode(10, OUTPUT);\n  pinMode(11, OUTPUT);\n' : ''}${components.includes('Micro Servo Motor') ? '  servo.attach(6);\n' : ''}}\n\nvoid loop() {\n${components.includes('RGB LED') ? '  analogWrite(9, 255);\n  analogWrite(10, 80);\n  analogWrite(11, 20);\n' : ''}${components.includes('10K Potentiometer') ? '  int potValue = analogRead(A0);\n  Serial.println(potValue);\n' : ''}${components.includes('Analog Temperature Sensor') ? '  int rawTemp = analogRead(A1);\n  float celsius = rawTemp * 0.48828125;\n  Serial.println(celsius);\n' : ''}${components.includes('Micro Servo Motor') ? '  servo.write(90);\n' : ''}  delay(250);\n}`;
}

function createMicroPython(components) {
  return `from machine import Pin, ADC, PWM\nfrom time import sleep\n\n${components.includes('RGB LED') ? 'red = PWM(Pin(18), freq=1000)\ngreen = PWM(Pin(19), freq=1000)\nblue = PWM(Pin(21), freq=1000)\n' : ''}${components.includes('10K Potentiometer') ? 'pot = ADC(Pin(34))\n' : ''}${components.includes('Analog Temperature Sensor') ? 'temp = ADC(Pin(35))\n' : ''}${components.includes('Micro Servo Motor') ? 'servo = PWM(Pin(23), freq=50)\n' : ''}\nwhile True:\n${components.includes('RGB LED') ? '    red.duty(1023)\n    green.duty(320)\n    blue.duty(80)\n' : ''}${components.includes('10K Potentiometer') ? '    print(pot.read())\n' : ''}${components.includes('Analog Temperature Sensor') ? '    print(temp.read())\n' : ''}${components.includes('Micro Servo Motor') ? '    servo.duty(77)\n' : ''}    sleep(0.25)`;
}

function hydrateJarvisTerminal() {
  const form = appSheetLayer.querySelector('[data-chat-form]');
  const input = appSheetLayer.querySelector('[data-chat-input]');
  const log = appSheetLayer.querySelector('[data-chat-log]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    if (message === '/clear') { log.innerHTML = ''; return; }
    appendMessage(log, message, 'user');
    if (message === '/time') appendMessage(log, `System date: ${new Date().toString()} · epoch: ${Date.now()}ms`, 'system');
    else if (message.startsWith('/note ')) {
      const note = message.slice(6).trim();
      const notes = JSON.parse(localStorage.getItem('wizos-notes') || '[]');
      notes.push(note);
      localStorage.setItem('wizos-notes', JSON.stringify(notes));
      appendMessage(log, `Stored localStorage note #${notes.length}: ${note}`, 'system');
    } else appendMessage(log, 'Command parsed. Use /time, /note [text], or /clear for shell utilities.', 'system');
  });
  input.focus();
}

function appendMessage(log, text, type) {
  const bubble = document.createElement('div');
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  log.appendChild(bubble);
  log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
}

function hydrateCalculator() {
  const display = appSheetLayer.querySelector('[data-calculator-display]');
  let expression = '';
  appSheetLayer.querySelectorAll('[data-calc-key]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.calcKey;
      if (key === 'C') { expression = ''; display.value = '0'; return; }
      if (key === '=') {
        const sanitized = expression.replace(/[^0-9.+\-*/()]/g, '');
        display.value = sanitized ? String(Function(`"use strict"; return (${sanitized})`)()) : '0';
        expression = display.value;
        return;
      }
      expression += key;
      display.value = expression;
    });
  });
}

getStartedBtn.addEventListener('click', showDeviceSelection, { passive: false });
backButton.addEventListener('click', goBack);
homeButton.addEventListener('click', goHome);
stacksButton.addEventListener('click', toggleTaskSwitcher);
closeStacksBtn.addEventListener('click', closeTaskSwitcher);
document.querySelectorAll('[data-device]').forEach((button) => button.addEventListener('click', () => launchDesktop(button.dataset.device)));
document.querySelectorAll('[data-app]').forEach((button) => button.addEventListener('click', () => openApp(button.dataset.app)));

updateClock();
renderTaskSwitcher();
window.setInterval(updateClock, 1000);
