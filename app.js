const landingStage = document.querySelector('#landingStage') || document.querySelector('#stage0');
const deviceStage = document.querySelector('#deviceStage') || document.querySelector('#stage1');
const desktopStage = document.querySelector('#desktopStage') || document.querySelector('#stage2');
const systemMode = document.querySelector('#systemMode') || document.querySelector('#deviceLabel');
const clockDisplay = document.querySelector('#clockDisplay') || document.querySelector('#systemClock');
const appSheetLayer = document.querySelector('#appSheetLayer') || document.querySelector('#sheet');
const taskSwitcher = document.querySelector('#taskSwitcher');
const taskStackList = document.querySelector('#taskStackList') || document.querySelector('#taskSwitcher');
const getStartedBtn = document.querySelector('#getStartedBtn') || document.querySelector('[data-next-stage]');
const backButton = document.querySelector('#backButton') || document.querySelector('#navBack');
const homeButton = document.querySelector('#homeButton') || document.querySelector('#navHome');
const stacksButton = document.querySelector('#stacksButton') || document.querySelector('#navStacks');
const closeStacksBtn = document.querySelector('#closeStacksBtn');
const launcherGrid = document.querySelector('#launcherGrid');
const sheetBody = document.querySelector('#sheetBody');
const sheetTitle = document.querySelector('#sheetTitle');
const sheetIcon = document.querySelector('#sheetIcon');
const sheetClose = document.querySelector('#closeSheet');

const systemStorage = { notes: [] };
const stockState = { timer: null, selected: null };
const stockDatabase = [
  { symbol: 'AAPL', name: 'Apple Inc.', market: 'NASDAQ', currency: '$', price: 214.42 },
  { symbol: 'TSLA', name: 'Tesla Inc.', market: 'NASDAQ', currency: '$', price: 286.15 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', market: 'NASDAQ', currency: '$', price: 162.88 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', market: 'NASDAQ', currency: '$', price: 501.31 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', market: 'NASDAQ', currency: '$', price: 193.75 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', market: 'NSE', currency: '₹', price: 1429.2 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', market: 'NSE', currency: '₹', price: 3892.5 },
  { symbol: 'INFOSYS', name: 'Infosys Ltd.', market: 'NSE', currency: '₹', price: 1584.3 },
];

const appRegistry = {
  clock: {
    title: 'Stocks Shower',
    subtitle: 'Global market terminal',
    icon: 'fa-solid fa-chart-line',
    emoji: '📈',
    theme: 'theme-clock',
    body: () => `
      <section class="market-terminal" aria-label="Stocks Shower market terminal">
        <article class="panel-card wide market-hero">
          <div>
            <p class="terminal-kicker">Global Market Terminal</p>
            <h3 data-stock-name>Select a ticker</h3>
            <p data-stock-market>Search major technology and market symbols.</p>
          </div>
          <div class="stock-price-wrap">
            <span class="stock-live-label">LIVE</span>
            <div class="big-metric stock-price" data-stock-price>--</div>
            <small data-stock-delta>Awaiting feed</small>
          </div>
        </article>
        <article class="panel-card stock-search-card">
          <label for="stockSearchInput">Search ticker</label>
          <input id="stockSearchInput" class="display-panel" data-stock-search autocomplete="off" placeholder="AAPL, TSLA, NVDA, RELIANCE..." />
          <div class="stock-suggestions" data-stock-suggestions hidden></div>
        </article>
        <article class="panel-card wide">
          <svg class="stock-chart" data-stock-chart viewBox="0 0 900 260" preserveAspectRatio="none" role="img" aria-label="Historical stock price trendline">
            <defs>
              <linearGradient id="stockGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="rgba(98, 244, 255, .42)" />
                <stop offset="100%" stop-color="rgba(98, 244, 255, 0)" />
              </linearGradient>
            </defs>
            <path data-stock-area fill="url(#stockGradient)"></path>
            <path data-stock-line fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
          </svg>
        </article>
      </section>
    `,
  },
  video: {
    title: 'Video Studio',
    subtitle: 'Media/video timeline panel',
    icon: 'fa-solid fa-film',
    emoji: '🎞️',
    theme: 'theme-video',
    body: () => `<section class="panel-grid"><article class="panel-card wide"><h3>Timeline Assembly</h3><p>Storyboard clips, transitions, captions, b-roll, aspect-ratio presets, and export lanes.</p><div class="progress-rail"><span class="progress-fill" style="--progress:66%"></span></div></article></section>`,
  },
  audio: {
    title: 'Audio Studio',
    subtitle: 'Voice & audio production panel',
    icon: 'fa-solid fa-microphone-lines',
    emoji: '🎙️',
    theme: 'theme-audio',
    body: () => `<section class="panel-grid"><article class="panel-card wide"><h3>Production Chain</h3><p>Generate narration, music beds, ambience, sound design, and mastering presets from one control surface.</p><div class="progress-rail"><span class="progress-fill" style="--progress:72%"></span></div></article></section>`,
  },
  ai: {
    title: 'AI Assistant',
    subtitle: 'Jarvis terminal communication system',
    icon: 'fa-solid fa-brain',
    emoji: '◈',
    theme: 'theme-ai',
    body: () => `
      <section class="chat-panel" aria-label="Jarvis terminal">
        <div class="chat-log" data-chat-log>
          <div class="message system">Jarvis Terminal online. Commands: /clear, /time, /note [text].</div>
        </div>
        <form class="chat-form" data-chat-form>
          <input data-chat-input type="text" autocomplete="off" placeholder="Type a command or message..." aria-label="Message Jarvis Terminal" />
          <button type="submit" aria-label="Send message"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i><span class="fallback-icon">➤</span></button>
        </form>
      </section>
    `,
  },
  calculator: {
    title: 'Calculator',
    subtitle: 'Quick formulas & arithmetic tool',
    icon: 'fa-solid fa-calculator',
    emoji: '🧮',
    theme: 'theme-calculator',
    body: () => `<section class="calculator-shell"><input class="display-panel" data-calculator-display value="0" readonly aria-label="Calculator display" /><div class="key-grid">${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'].map((key) => `<button class="soft-key" type="button" data-calc-key="${key}">${key}</button>`).join('')}<button class="soft-key" type="button" data-calc-key="=" style="grid-column:1/-1">=</button></div></section>`,
  },
  converter: {
    title: 'Any-to-Any File Transcoder',
    subtitle: 'Local client-side transcoding engine',
    icon: 'fa-solid fa-right-left',
    emoji: '🧬',
    theme: 'theme-converter',
    body: () => `
      <section class="transcoder-shell" aria-label="Any-to-any file transcoder">
        <article class="panel-card wide drop-zone" data-drop-zone>
          <h3>Drop a file into the local engine</h3>
          <p>Images convert through Canvas. JSON, CSV, and Markdown translate in-browser. Larger mock packages run through the simulator.</p>
          <input class="display-panel" data-file-input type="file" accept="image/png,image/jpeg,image/webp,.json,.csv,.md,.markdown,text/*" />
        </article>
        <div class="converter-grid">
          <select class="select-field" data-target-format aria-label="Destination format">
            <option value="png">PNG image</option>
            <option value="jpeg">JPG image</option>
            <option value="webp">WebP image</option>
            <option value="csv">CSV data</option>
            <option value="json">JSON data</option>
            <option value="html">HTML document</option>
            <option value="zip">Mock ZIP package</option>
          </select>
          <button class="soft-key primary-soft-key" data-transcode-button type="button">Run Transcode</button>
        </div>
        <article class="panel-card wide">
          <h3>Core Processing Simulator</h3>
          <div class="progress-rail"><span class="progress-fill" data-transcode-progress style="--progress:0%"></span></div>
          <div class="transcode-metrics" data-transcode-metrics>Idle · 0 MB/s · 0 active bytes</div>
          <pre class="transcode-log" data-transcode-log>Awaiting file.</pre>
        </article>
      </section>
    `,
  },
  notepad: {
    title: 'Micro-Control Lab',
    subtitle: 'Hardware blueprint & code synthesis workspace',
    icon: 'fa-solid fa-microchip',
    emoji: '🔌',
    theme: 'theme-notepad',
    body: () => `
      <section class="micro-lab-shell" aria-label="Micro-Control Lab">
        <article class="panel-card">
          <h3>Hardware Selector</h3>
          <label>Controller</label>
          <select class="select-field" data-board-select>
            <option value="arduino">Arduino Uno</option>
            <option value="esp32">ESP32</option>
          </select>
          <div class="hardware-options">
            ${['LED','Potentiometer','Analog Temperature Sensor','Micro Servo Motor'].map((part) => `<button class="hardware-chip" type="button" data-component="${part}">${part}</button>`).join('')}
          </div>
          <h3>Pin-to-Pin Blueprint</h3>
          <pre class="blueprint-output" data-wiring-output>Select hardware to generate wiring.</pre>
          <h3>Ohm's Law Diagnostic Core</h3>
          <label>Input voltage: <span data-voltage-label>5.0V</span></label>
          <input data-voltage-input type="range" min="1" max="12" step="0.1" value="5" />
          <label>Resistor value: <span data-resistor-label>220Ω</span></label>
          <input data-resistor-input type="range" min="100" max="1000" step="10" value="220" />
          <p data-ohm-output></p>
        </article>
        <article class="panel-card wide">
          <div class="code-header"><h3>Live Code Compilation</h3><button class="soft-key primary-soft-key" data-copy-code type="button">Copy Code</button></div>
          <pre class="code-output" data-code-output></pre>
        </article>
      </section>
    `,
  },
};

let activeDevice = 'Computer';
let currentAppKey = null;
const runningApps = new Set();
const appHistory = [];
const stages = { landing: landingStage, device: deviceStage, desktop: desktopStage };

function iconMarkup(app, className) {
  return app.icon ? `<i class="${app.icon}" aria-hidden="true"></i><span class="fallback-icon">${app.emoji || '•'}</span>` : `<span>${app.emoji || '•'}</span>`;
}

function setStageActive(stage, active) {
  if (!stage) return;
  stage.classList.toggle('is-active', active);
  stage.classList.toggle('active', active);
  stage.setAttribute('aria-hidden', String(!active));
}

function switchStage(stageName) {
  Object.entries(stages).forEach(([name, stage]) => setStageActive(stage, name === stageName));
}

function showDeviceSelection(event) {
  event?.preventDefault();
  switchStage('device');
}

function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  if (clockDisplay) {
    clockDisplay.textContent = formatted;
    clockDisplay.dateTime = now.toISOString();
  }
  document.querySelectorAll('[data-live-clock]').forEach((node) => { node.textContent = formatted; });
}

function launchDesktop(device) {
  activeDevice = device || 'Computer';
  if (systemMode) systemMode.textContent = `WizOS - ${activeDevice} Mode`;
  closeTaskSwitcher();
  closeActiveSheet({ clearHistory: true });
  switchStage('desktop');
}

function openApp(appKey, options = {}) {
  const app = appRegistry[appKey];
  if (!app) return;
  stopStockFeed();
  const shouldTrackHistory = options.trackHistory !== false;
  if (currentAppKey && currentAppKey !== appKey && shouldTrackHistory) appHistory.push(currentAppKey);
  runningApps.add(appKey);
  currentAppKey = appKey;

  if (sheetBody && sheetTitle && sheetIcon) {
    sheetTitle.textContent = app.title;
    sheetIcon.innerHTML = iconMarkup(app, 'sheet-app-icon');
    sheetBody.innerHTML = app.body();
    appSheetLayer?.classList.add('open', 'is-open');
    appSheetLayer?.setAttribute('aria-hidden', 'false');
  } else if (appSheetLayer) {
    appSheetLayer.innerHTML = createAppSheetMarkup(appKey, app);
    appSheetLayer.classList.add('is-open');
    appSheetLayer.setAttribute('aria-hidden', 'false');
    const sheet = appSheetLayer.querySelector('.app-sheet');
    requestAnimationFrame(() => sheet?.classList.add('is-active'));
  }

  hydrateAppSheet(appKey);
  renderTaskSwitcher();
}

function createAppSheetMarkup(appKey, app) {
  return `
    <article class="app-sheet" data-active-app="${appKey}" role="dialog" aria-modal="true" aria-label="${app.title}">
      <header class="sheet-header">
        <span class="sheet-app-icon ${app.theme}">${iconMarkup(app, 'sheet-app-icon')}</span>
        <div class="sheet-title-group"><h2>${app.title}</h2><p>${app.subtitle}</p></div>
      </header>
      <div class="sheet-body">${app.body()}</div>
    </article>
  `;
}

function closeActiveSheet(options = {}) {
  stopStockFeed();
  if (options.clearHistory) appHistory.length = 0;
  currentAppKey = null;
  const sheet = appSheetLayer?.querySelector('.app-sheet');
  if (!sheet && sheetBody) {
    appSheetLayer?.classList.remove('open', 'is-open');
    appSheetLayer?.setAttribute('aria-hidden', 'true');
    return;
  }
  sheet?.classList.remove('is-active');
  window.setTimeout(() => {
    if (!currentAppKey) {
      if (sheetBody) sheetBody.innerHTML = '';
      else if (appSheetLayer) appSheetLayer.innerHTML = '';
      appSheetLayer?.classList.remove('open', 'is-open');
      appSheetLayer?.setAttribute('aria-hidden', 'true');
    }
  }, 320);
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
  const willOpen = !taskSwitcher?.classList.contains('is-open') && !taskSwitcher?.classList.contains('open');
  taskSwitcher?.classList.toggle('is-open', willOpen);
  taskSwitcher?.classList.toggle('open', willOpen);
  taskSwitcher?.setAttribute('aria-hidden', String(!willOpen));
  stacksButton?.classList.toggle('is-active', willOpen);
  if (willOpen) renderTaskSwitcher();
}

function closeTaskSwitcher() {
  taskSwitcher?.classList.remove('is-open', 'open');
  taskSwitcher?.setAttribute('aria-hidden', 'true');
  stacksButton?.classList.remove('is-active');
}

function renderTaskSwitcher() {
  if (!taskStackList) return;
  if (!runningApps.size) {
    taskStackList.innerHTML = '<div class="empty-stacks">No running utilities yet. Launch a WizOS tool from the grid to build your stack.</div>';
    return;
  }
  taskStackList.innerHTML = [...runningApps].map((appKey) => {
    const app = appRegistry[appKey];
    const currentClass = appKey === currentAppKey ? ' is-current' : '';
    return `
      <article class="stack-card task-card${currentClass}" data-stack-app="${appKey}" role="button" tabindex="0" aria-label="Switch to ${app.title}">
        <span class="stack-card-icon mini ${app.theme}">${iconMarkup(app, 'stack-card-icon')}</span>
        <span class="stack-card-copy"><strong>${app.title}</strong><small>${app.subtitle}</small></span>
        <button class="terminate-app-btn task-exit" type="button" data-terminate-app="${appKey}" aria-label="Close ${app.title}">×</button>
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
  for (let index = appHistory.length - 1; index >= 0; index -= 1) if (appHistory[index] === appKey) appHistory.splice(index, 1);
  if (currentAppKey === appKey) closeActiveSheet();
  renderTaskSwitcher();
}

function hydrateAppSheet(appKey) {
  if (appKey === 'clock') hydrateStocksShower();
  if (appKey === 'ai') hydrateAiAssistant();
  if (appKey === 'calculator') hydrateCalculator();
  if (appKey === 'converter') hydrateTranscoder();
  if (appKey === 'notepad') hydrateMicroLab();
  updateClock();
}

function hydrateStocksShower() {
  const input = appSheetLayer.querySelector('[data-stock-search]');
  const suggestions = appSheetLayer.querySelector('[data-stock-suggestions]');
  if (!input || !suggestions) return;
  input.addEventListener('input', () => {
    const query = input.value.trim().toUpperCase();
    const matches = stockDatabase.filter((stock) => `${stock.symbol} ${stock.name} ${stock.market}`.toUpperCase().includes(query)).slice(0, 6);
    suggestions.hidden = !query;
    suggestions.innerHTML = matches.map((stock) => `<button type="button" data-stock-pick="${stock.symbol}"><strong>${stock.symbol}</strong><span>${stock.name} · ${stock.market}</span></button>`).join('');
    suggestions.querySelectorAll('[data-stock-pick]').forEach((button) => button.addEventListener('click', () => selectStock(button.dataset.stockPick)));
  });
  selectStock('AAPL');
}

function selectStock(symbol) {
  const base = stockDatabase.find((stock) => stock.symbol === symbol);
  if (!base) return;
  stockState.selected = {
    ...base,
    history: Array.from({ length: 42 }, (_, index) => base.price * (0.96 + Math.random() * 0.08 + index / 1200)),
  };
  const input = appSheetLayer.querySelector('[data-stock-search]');
  const suggestions = appSheetLayer.querySelector('[data-stock-suggestions]');
  if (input) input.value = base.symbol;
  if (suggestions) suggestions.hidden = true;
  stopStockFeed();
  updateStockReadout();
  stockState.timer = window.setInterval(updateStockReadout, 1000);
}

function updateStockReadout() {
  const stock = stockState.selected;
  if (!stock) return;
  const previous = stock.price;
  stock.price = Math.max(1, stock.price + (Math.random() - 0.48) * stock.price * 0.014);
  stock.history.push(stock.price);
  stock.history = stock.history.slice(-52);
  const isUp = stock.price >= previous;
  const price = appSheetLayer.querySelector('[data-stock-price]');
  const delta = appSheetLayer.querySelector('[data-stock-delta]');
  const name = appSheetLayer.querySelector('[data-stock-name]');
  const market = appSheetLayer.querySelector('[data-stock-market]');
  if (price) {
    price.textContent = `${stock.currency}${stock.price.toFixed(2)}`;
    price.classList.toggle('is-up', isUp);
    price.classList.toggle('is-down', !isUp);
  }
  if (delta) delta.textContent = `${isUp ? '▲' : '▼'} ${stock.currency}${Math.abs(stock.price - previous).toFixed(2)} · ${new Date().toLocaleTimeString()}`;
  if (name) name.textContent = `${stock.symbol} · ${stock.name}`;
  if (market) market.textContent = `${stock.market} · Random-walk live simulation`;
  drawStockChart(stock.history);
}

function drawStockChart(history) {
  const line = appSheetLayer.querySelector('[data-stock-line]');
  const area = appSheetLayer.querySelector('[data-stock-area]');
  if (!line || !area) return;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const spread = max - min || 1;
  const points = history.map((value, index) => [index / (history.length - 1) * 900, 238 - (value - min) / spread * 216]);
  const path = points.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  line.setAttribute('d', path);
  area.setAttribute('d', `${path} L900,260 L0,260 Z`);
}

function stopStockFeed() {
  if (stockState.timer) window.clearInterval(stockState.timer);
  stockState.timer = null;
}

function hydrateTranscoder() {
  const input = appSheetLayer.querySelector('[data-file-input]');
  const target = appSheetLayer.querySelector('[data-target-format]');
  const button = appSheetLayer.querySelector('[data-transcode-button]');
  const dropZone = appSheetLayer.querySelector('[data-drop-zone]');
  if (!input || !target || !button) return;
  ['dragenter', 'dragover'].forEach((type) => dropZone?.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.add('is-dragging');
  }));
  ['dragleave', 'drop'].forEach((type) => dropZone?.addEventListener(type, (event) => {
    event.preventDefault();
    dropZone.classList.remove('is-dragging');
    if (event.dataTransfer?.files?.[0]) input.files = event.dataTransfer.files;
  }));
  button.addEventListener('click', () => transcodeFile(input.files[0], target.value));
}

function transcodeFile(file, targetFormat) {
  if (!file) {
    writeTranscodeLog('Choose or drop a file before transcoding.');
    return;
  }
  const extension = file.name.split('.').pop().toLowerCase();
  if (file.type.startsWith('image/') && ['png', 'jpeg', 'webp'].includes(targetFormat)) {
    transcodeImage(file, targetFormat);
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('load', () => processStructuredText(file.name, extension, targetFormat, String(reader.result || '')));
  reader.readAsText(file);
}

function transcodeImage(file, targetFormat) {
  const image = new Image();
  image.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext('2d').drawImage(image, 0, 0);
    const mime = targetFormat === 'jpeg' ? 'image/jpeg' : `image/${targetFormat}`;
    downloadData(`wizos-${Date.now()}.${targetFormat}`, canvas.toDataURL(mime, 0.92));
    writeTranscodeLog(`Canvas transcoder exported ${image.naturalWidth}×${image.naturalHeight} ${targetFormat.toUpperCase()} image.`);
    URL.revokeObjectURL(image.src);
  });
  image.src = URL.createObjectURL(file);
}

function processStructuredText(fileName, extension, targetFormat, text) {
  if (extension === 'json' && targetFormat === 'csv') {
    const rows = JSON.parse(text);
    const normalized = Array.isArray(rows) ? rows : [rows];
    const headers = [...new Set(normalized.flatMap((row) => Object.keys(row)))];
    const csv = [headers.join(','), ...normalized.map((row) => headers.map((key) => JSON.stringify(row[key] ?? '')).join(','))].join('\n');
    downloadData(fileName.replace(/\.[^.]+$/, '.csv'), `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    writeTranscodeLog('JSON translated to CSV locally.');
  } else if (extension === 'csv' && targetFormat === 'json') {
    const [headerLine = '', ...lines] = text.trim().split(/\r?\n/);
    const headers = headerLine.split(',').map((header) => header.trim());
    const json = lines.filter(Boolean).map((line) => Object.fromEntries(line.split(',').map((value, index) => [headers[index], value.trim()])));
    downloadData(fileName.replace(/\.[^.]+$/, '.json'), `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json, null, 2))}`);
    writeTranscodeLog('CSV translated to JSON locally.');
  } else if ((extension === 'md' || extension === 'markdown') && targetFormat === 'html') {
    const html = text.replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^## (.*)$/gm, '<h2>$1</h2>').replace(/^# (.*)$/gm, '<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
    downloadData(fileName.replace(/\.[^.]+$/, '.html'), `data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    writeTranscodeLog('Markdown translated to HTML locally.');
  } else {
    simulateTranscodeBundle(fileName);
  }
}

function simulateTranscodeBundle(fileName) {
  const progress = appSheetLayer.querySelector('[data-transcode-progress]');
  const metrics = appSheetLayer.querySelector('[data-transcode-metrics]');
  let percent = 0;
  const interval = window.setInterval(() => {
    percent = Math.min(100, percent + 7 + Math.random() * 12);
    const mbps = 24 + Math.random() * 52;
    const bytes = Math.floor(percent * 1048576 * 3.7);
    if (progress) progress.style.setProperty('--progress', `${percent}%`);
    if (metrics) metrics.textContent = `${mbps.toFixed(1)} MB/s · ${bytes.toLocaleString()} active bytes · block ${Math.ceil(percent)}`;
    writeTranscodeLog(`Processing ${fileName}\nCompiling virtual chunks at ${mbps.toFixed(1)} MB/s...`);
    if (percent >= 100) {
      window.clearInterval(interval);
      downloadData('wizos-transcoded-package.zip', 'data:application/zip;base64,V2l6T1MgbW9jayB0cmFuc2NvZGVkIHBhY2thZ2U=');
      writeTranscodeLog('Mock ZIP folder compiled and downloaded.');
    }
  }, 220);
}

function writeTranscodeLog(message) {
  const log = appSheetLayer.querySelector('[data-transcode-log]');
  if (log) log.textContent = message;
}

function downloadData(fileName, href) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function hydrateMicroLab() {
  appSheetLayer.querySelectorAll('[data-component]').forEach((button) => button.addEventListener('click', () => {
    button.classList.toggle('is-selected');
    compileMicroLab();
  }));
  ['[data-board-select]', '[data-voltage-input]', '[data-resistor-input]'].forEach((selector) => appSheetLayer.querySelector(selector)?.addEventListener('input', compileMicroLab));
  appSheetLayer.querySelector('[data-copy-code]')?.addEventListener('click', () => navigator.clipboard?.writeText(appSheetLayer.querySelector('[data-code-output]')?.textContent || ''));
  compileMicroLab();
}

function compileMicroLab() {
  const board = appSheetLayer.querySelector('[data-board-select]')?.value || 'arduino';
  const components = [...appSheetLayer.querySelectorAll('[data-component].is-selected')].map((button) => button.dataset.component);
  const pins = board === 'esp32'
    ? { LED: 'GPIO 18', Potentiometer: 'GPIO 34', 'Analog Temperature Sensor': 'GPIO 35', 'Micro Servo Motor': 'GPIO 19' }
    : { LED: 'Pin 9', Potentiometer: 'A0', 'Analog Temperature Sensor': 'A1', 'Micro Servo Motor': 'Pin 10' };
  const wiring = components.map((component) => {
    if (component === 'LED') return `LED: Connect anode to ${pins.LED}; cathode through a 220Ω resistor to GND.`;
    if (component === 'Potentiometer') return `Potentiometer: Outer legs to VCC/GND; wiper to ${pins.Potentiometer}.`;
    if (component === 'Analog Temperature Sensor') return `Analog Temperature Sensor: VOUT to ${pins['Analog Temperature Sensor']}; VCC to regulated supply; GND common.`;
    return `Micro Servo Motor: Signal to ${pins['Micro Servo Motor']}; red to 5V external rail; brown/black to common GND.`;
  }).join('\n') || 'Select hardware to generate wiring.';
  const voltage = Number(appSheetLayer.querySelector('[data-voltage-input]')?.value || 5);
  const resistor = Number(appSheetLayer.querySelector('[data-resistor-input]')?.value || 220);
  const currentMa = voltage / resistor * 1000;
  const warning = currentMa > 20 ? 'DANGER: exceeds the 20mA LED pin safety threshold.' : 'Safe for a typical indicator LED pin.';
  const voltageLabel = appSheetLayer.querySelector('[data-voltage-label]');
  const resistorLabel = appSheetLayer.querySelector('[data-resistor-label]');
  if (voltageLabel) voltageLabel.textContent = `${voltage.toFixed(1)}V`;
  if (resistorLabel) resistorLabel.textContent = `${resistor}Ω`;
  appSheetLayer.querySelector('[data-wiring-output]').textContent = wiring;
  appSheetLayer.querySelector('[data-ohm-output]').innerHTML = `I = V / R = ${currentMa.toFixed(1)}mA · <strong class="${currentMa > 20 ? 'danger' : 'warning'}">${warning}</strong>`;
  appSheetLayer.querySelector('[data-code-output]').textContent = board === 'esp32' ? createMicroPython(components) : createArduinoSketch(components);
}

function createArduinoSketch(components) {
  return `#include <Servo.h>\nServo servo;\n\nvoid setup() {\n  Serial.begin(9600);\n${components.includes('LED') ? '  pinMode(9, OUTPUT);\n' : ''}${components.includes('Micro Servo Motor') ? '  servo.attach(10);\n' : ''}}\n\nvoid loop() {\n${components.includes('LED') ? '  analogWrite(9, 180);\n' : ''}${components.includes('Potentiometer') ? '  int potValue = analogRead(A0);\n  Serial.println(potValue);\n' : ''}${components.includes('Analog Temperature Sensor') ? '  int tempRaw = analogRead(A1);\n  float celsius = tempRaw * 0.48828125;\n  Serial.println(celsius);\n' : ''}${components.includes('Micro Servo Motor') ? '  servo.write(90);\n' : ''}  delay(250);\n}`;
}

function createMicroPython(components) {
  return `from machine import Pin, ADC, PWM\nfrom time import sleep\n\n${components.includes('LED') ? 'led = PWM(Pin(18), freq=1000)\n' : ''}${components.includes('Potentiometer') ? 'pot = ADC(Pin(34))\n' : ''}${components.includes('Analog Temperature Sensor') ? 'temp = ADC(Pin(35))\n' : ''}${components.includes('Micro Servo Motor') ? 'servo = PWM(Pin(19), freq=50)\n' : ''}\nwhile True:\n${components.includes('LED') ? '    led.duty(700)\n' : ''}${components.includes('Potentiometer') ? '    print(pot.read())\n' : ''}${components.includes('Analog Temperature Sensor') ? '    print(temp.read())\n' : ''}${components.includes('Micro Servo Motor') ? '    servo.duty(77)\n' : ''}    sleep(0.25)`;
}

function hydrateAiAssistant() {
  const form = appSheetLayer.querySelector('[data-chat-form]');
  const input = appSheetLayer.querySelector('[data-chat-input]');
  const log = appSheetLayer.querySelector('[data-chat-log]');
  if (!form || !input || !log) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    if (message === '/clear') {
      log.innerHTML = '';
      return;
    }
    appendMessage(log, message, 'user');
    if (message === '/time') appendMessage(log, `System clock: ${new Date().toString()}`, 'system');
    else if (message.startsWith('/note ')) {
      const note = message.slice(6).trim();
      systemStorage.notes.push(note);
      appendMessage(log, `Saved note #${systemStorage.notes.length}: ${note}`, 'system');
    } else window.setTimeout(() => appendMessage(log, createAssistantReply(message), 'system'), 300);
  });
  input.focus();
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

function appendMessage(log, text, type) {
  const bubble = document.createElement('div');
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  log.appendChild(bubble);
  log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
}

function createAssistantReply(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('stock') || lowerMessage.includes('market')) return 'Stocks Shower is live with local ticker search, SVG trendlines, and random-walk price updates.';
  if (lowerMessage.includes('convert') || lowerMessage.includes('transcode')) return 'The transcoder can process images with Canvas, structured text formats, and mock large-file bundles locally.';
  if (lowerMessage.includes('micro') || lowerMessage.includes('arduino') || lowerMessage.includes('esp32')) return 'Micro-Control Lab can synthesize wiring diagrams, safety diagnostics, and controller code.';
  return 'I captured that. Use /time for the OS clock, /note text to save local storage notes, or /clear to wipe this terminal.';
}

function renderFallbackLauncher() {
  if (!launcherGrid) return;
  launcherGrid.innerHTML = Object.entries(appRegistry).map(([key, app]) => `
    <button class="launcher-tile" data-app="${key}" type="button">
      <span class="launcher-orb ${app.theme}">${app.emoji || iconMarkup(app)}</span>
      <span class="launcher-name">${app.title}</span>
    </button>
  `).join('');
}

getStartedBtn?.addEventListener('click', showDeviceSelection, { passive: false });
backButton?.addEventListener('click', goBack);
homeButton?.addEventListener('click', goHome);
stacksButton?.addEventListener('click', toggleTaskSwitcher);
closeStacksBtn?.addEventListener('click', closeTaskSwitcher);
sheetClose?.addEventListener('click', () => closeActiveSheet());

document.querySelectorAll('[data-device]').forEach((button) => button.addEventListener('click', () => launchDesktop(button.dataset.device)));
if (launcherGrid && !launcherGrid.children.length) renderFallbackLauncher();
document.querySelectorAll('[data-app]').forEach((button) => button.addEventListener('click', () => openApp(button.dataset.app)));

updateClock();
renderTaskSwitcher();
window.setInterval(updateClock, 1000);
