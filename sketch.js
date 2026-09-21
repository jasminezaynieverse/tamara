// AI assistance note:
// I designed the interaction, visual direction, asset placement, and overall reading flow.
// I used AI as a coding assistant when I needed help understanding unfamiliar p5.js techniques
// or debugging specific interactions. The comments below point out the main techniques I learned
// or adapted with that assistance.

// I keep repeated timing, movement, and sound values in one SETTINGS object
// so I can test and adjust them without changing values throughout the sketch.
const SETTINGS = {
  introLineDelay: 1550,
  introFadeDuration: 1600,
  scrollSpeed: 100,
  
  natureVolume: 0.55,
  
  endingMusicVolume: 0.65,
  
  cityMusicVolume: 0.65,
  returnDelay: 600,
  returnDuration: 1500,
  appearDuration: 450,
  fontWeight: 100,

  bootBlack: 500,
  bootFade: 3000,
  bootPause: 1900,
  typingInterval: 48,
  transitionHold: 3000,
  transitionFade: 1200,
  desktopHold: 8000,
  desktopDissolve: 4000,
  endingLineDelay: 1400,
  endingLineFade: 1800,
  endingHoldAfterLastLine: 15000,
  endingFade: 5000,
};

const INTRO = 'You walk for days among trees and among stones. Rarely does the eye light on a thing, and then only when it has recognized that thing as the sign of another thing: a print in the sand indicates the tiger’s passage; a marsh announces a vein of water; the hibiscus flower, the end of winter. All the rest is silent and interchangeable; trees and stones are only what they are.';
const PASSAGE = "Finally the journey leads to the city of Tamara. You penetrate it along streets thick with signboards jutting from the walls. The eye does not see things but images of things that mean other things: pincers point out the tooth-drawer's house; a tankard, the tavern; halberds, the barracks; scales, the grocer's. Statues and shields depict lions, dolphins, towers, stars: a sign that something—who knows what?—has as its sign a lion or a dolphin or a tower or a star. Other signals warn of what is forbidden in a given place (to enter the alley with wagons, to urinate behind the kiosk, to fish with your pole from the bridge) and what is allowed (watering zebras, playing bowls, burning relatives' corpses). From the doors of the temples the gods' statues are seen, each portrayed with his attributes—the cornucopia, the hourglass, the medusa—so that the worshiper can recognize them and address his prayers correctly. If a building has no signboard or figure, its very form and the position it occupies in the city's order suffice to indicate its function: the palace, the prison, the mint, the Pythagorean school, the brothel.";
const LEAVING = '>> However the city may really be, beneath this thick coating of signs, whatever it may contain or conceal, you leave Tamara without having discovered it.';
const ENDING_LINES = ['Outside, the land stretches,', 'empty to the horizon;', 'the sky opens,', 'with speeding clouds.', 'In the shape that chance and wind give the clouds,', 'you are already intent on recognizing figures:', 'a sailing ship,', 'a hand,', 'an elephant.',];
let backgrounds = {};
let natureSound;
let cityMusic;
let endingMusic;
let leavingLines = [];
let endingLines = [];
let endingFontSize = 28;

// I adjusted these positions to match the layout I wanted on screen.
const SIGN_POSITIONS = {
  journey: [.355, .23, 196],
  tamara: [.675, .30, 166],
  city: [.28, .43, 204],
  leads: [.72, .525, 267],
  thick: [.28, .71, 259],
  penetrate: [.84, .35, 265],
  jutting: [.455, .575, 150],
  walls: [.745, .805, 217],
  street: [.37, .92, 409],
  images: [.255, .37, 115],
  see: [.275, .865, 64],
  '11.5-walls': [.62, .445, 228],
  scales: [.60, .18, 228],
  grocers: [.805, .255, 250],
  house: [.195, .56, 120],
  barracks: [.22, .535, 106],
  tavern: [.81, .905, 150],
  tooth: [.69, .60, 230],
  pincers: [.43, .23, 177],
  'tooth-drawers': [.57, .68, 136],
  statues: [.365, .105, 116],
  depict: [.13, .51, 222],
  stars: [.855, .43, 137],
  towers: [.085, .83, 44],
  dolphins: [.425, .765, 174],
  forbidden: [.875, .8, 132],
  warn: [.445, .953, 125],
  lions: [.10, .215, 94],
  relatives: [.14, .335, 111],
  wagons: [.48, .30, 190],
  bridge: [.865, .40, 94],
  'playing-bowls': [.43, .465, 115],
  urinate: [.19, .17, 115],
  'watering-zebras': [.185, .60, 249],
  alley: [.836, .55, 90],
  fish: [.795, .26, 83],
  corpse: [.25, .438, 151],
  burning: [.75, .833, 95],
  kiosk: [.75, .28, 120],
  pole: [.68, .955, 70],
  portrayed: [.54, .615, 160],
  'gods-statues': [.565, .365, 97],
  prayers: [.315, .34, 76],
  temples: [.63, .865, 136],
  medusa: [.155, .35, 120],
  worshiper: [.245, .50, 214],
  cornucopia: [.80, .478, 217],
  hourglass: [.535, .419, 178],
  order: [.455, .37, 153],
  occupies: [.145, .80, 152],
  citys: [.71, .68, 119],
  'no-signboard': [.30, .545, 118],
  figure: [.50, .535, 145],
  building: [.79, .60, 127],
  form: [.645, .75, 193],
  function: [.53, .79, 270],
  mint: [.235, .375, 107],
  'pythagorean-school': [.516, .56, 185],
  brothel: [.227, .955, 164],
  palace: [.515, .095, 154],
  prison: [.67, .72, 178],
};

const APPEAR_ORDER = ['journey', 'leads', 'city', 'tamara', 'penetrate', 'street', 'thick', 'jutting', 'walls', 'see', 'images', 'pincers', 'tooth', 'tooth-drawers', 'house', 'tavern', 'barracks', 'scales', 'grocers', 'statues', 'depict', 'lions', 'dolphins', 'towers', 'stars', 'warn', 'forbidden', 'alley', 'wagons', 'urinate', 'kiosk', 'fish', 'pole', 'bridge', 'watering-zebras', 'playing-bowls', 'burning', 'relatives', 'corpse', 'temples', 'gods-statues', 'portrayed', 'cornucopia', 'hourglass', 'medusa', 'worshiper', 'prayers', 'building', 'no-signboard', 'figure', 'form', 'occupies', 'citys', 'order', 'function', 'palace', 'prison', 'mint', 'pythagorean-school', 'brothel'];
let manifest;
let signs = [];
let introAssets = {};
let uiAssets = {};
let idlePanel;

// I use one scene variable to keep track of which part of the experience is currently displayed.
let scene = 'nature';
let sceneStarted = 0;
let ready = false;
let assetError = false;

let readingOffset = 0;
let maxScroll = 1;
let lines = [];
let readingWidth = 0;
let fontSize = 32;
let lineHeight = 48;
let cityScale = 1;
let exitArt;
let controls = [];
let focusedControl = '';
let soundEnabled = false;
let musicRequested = false;
let musicPlaying = false;
let lastMusicTime = 0;
let lastMusicChange = 0;

let activeSign = null;
let activeTouch = null;
let heldDown = false; 
let keyboardDown = false; 
let grabX = 0;
let grabY = 0;
let dragStartX = 0;
let dragStartY = 0;
let keyboardSelection = false;
let cityStarted = 0;
let introRows = [];
let introDuration = 0;
let introScale = 1;
let introLeft = 0;
let introTop = 0;
let introFont = 34;
let smallScreen = false;

// Change this to true to stop the floating effect.
const reducedMotion = false;

// I use this simple easing formula so movement can start and end more gently.
function ease(t) {
  return t * t *(3 - 2 * t);
}

let regularFont;
let thinFont;
let monoFont;

// If an image, font, or file fails to load, keep track of it here.
// This stops the project from starting before everything is ready.
function assetFailed() {
  assetError = true;
}

// I keep each image's name, path, crop settings, and loaded image together.
// loadImage() loads the file so the same artwork data can be reused later.
function loadArt(data) {
  
  return {
    id: data.id,
    name: data.name,
    path: data.path,
    crop: data.crop,
    img: loadImage(data.path, undefined, assetFailed)
  };
}

// I wanted the artwork data to load before the experience starts.
// AI helped me understand how preload() and loadJSON() work in p5.js,
// and I adapted that approach to organize the sign assets from manifest.json.

function preload() {
  regularFont = loadFont('assets/Inter-Regular.ttf', undefined, assetFailed);
  thinFont = loadFont('assets/Inter-Thin.ttf', undefined, assetFailed);
  monoFont = loadFont('assets/ShareTechMono-Regular.ttf', undefined, assetFailed);
  backgrounds.transition = loadImage('assets/backgrounds/transition.png', undefined, assetFailed);
  backgrounds.windows = loadImage('assets/backgrounds/windows.png', undefined, assetFailed);
  backgrounds.clouds = loadImage('assets/backgrounds/clouds.png', undefined, assetFailed);
  manifest = loadJSON('assets/manifest.json', loadManifest, assetFailed);
}

// This loads the sign information from manifest.json.
// The loop goes through every sign automatically instead of loading them one by one.
// "at" controls when each sign appears: 0 is the start and 1 is the end.

function loadManifest(data) {
  for (let i = 0; i < data.signs.length; i++) {
    const item = data.signs[i];
    if (item.name === 'exit') {
      exitArt = loadArt(item);
      continue;
    }
    
    const sign = loadArt(item);
    // Each sign uses the matching search panel stored beside it in the asset data.
    sign.panel = loadArt(item.panel);
    let rank = APPEAR_ORDER.indexOf(item.name);
    if (item.id === '11.5-walls') {
      rank = 11;
    }
    if (rank < 9) {
      sign.at = 0.006 + rank * 0.032;
    } else {
      sign.at = 0.28 +(rank - 9) /(APPEAR_ORDER.length - 10) * 0.64;
    }
    
    sign.visible = false;
    sign.releasedAt = null;
    sign.dx = 0;
    sign.dy = 0;
    sign.homeX = 0;
    sign.homeY = 0;
    signs.push(sign);
  }
  for (const name in data.intro) {
    introAssets[name] = loadArt(data.intro[name]);
  }
  for (const name in data.ui) {
    uiAssets[name] = loadArt(data.ui[name]);
  }
  idlePanel = loadArt(data.idle);
}

// setup() runs once at the beginning.
// I use createCanvas() as the main space for the whole project.
// The canvas starts from the top-left corner of the page.

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  pixelDensity(min(displayDensity(), 2));
  frameRate(60);
  setupAudio();
  for (let i = 0; i < signs.length; i++) {
    signs[i].img.loadPixels();
  }
  if (assetError) {
    return;
  }
  layout();
  ready = true;
  sceneStarted = millis();
  startNatureSound();
  // describe() is a p5.js accessibility function that provides a text alternative.
  describe('Tamara, an interactive reading. Use the down arrow to read. Drag signs to reveal their associations. Tab selects a control; Enter activates it. Left and right arrows explore visible signs; Escape releases a sign. ' + INTRO + ' ' + PASSAGE + ' ' + LEAVING.slice(3) + ' ' + ENDING_LINES.join(' '));
}

// These audio elements are created in p5.js and reused across the different scenes.
function setupAudio() {
  natureSound = createAudio('assets/audio/babbling-brook.mp3');
  natureSound.hide();
  natureSound.volume(SETTINGS.natureVolume);
  cityMusic = createAudio('assets/audio/midtown-map-score.mp3');
  cityMusic.hide();
  cityMusic.volume(SETTINGS.cityMusicVolume);
  endingMusic = createAudio('assets/audio/reflection-pond.mp3');
  endingMusic.hide();
  endingMusic.volume(SETTINGS.endingMusicVolume);
}

// This resets the river sound when the first page starts again.
// startMusic() only requests playback after a click or key press has enabled sound.
function startNatureSound() {
  natureSound.stop();
  startMusic();
}

// This lays out the words and decorative text for the first page.
// I made a separate small-screen layout so the words can wrap instead of becoming too small.
function layoutIntro() {
  introRows = [];
  if (!smallScreen) {
    introScale = min(width / 1512, height / 982);
    introLeft =(width - 1512 * introScale) / 2;
    introTop =(height - 982 * introScale) / 2;
    introFont = 32;
    function introText(words, x, y) {
      return {
        text: words,
        x: x,
        y: y
      };
    }
    function introImage(name, x, y, w) {
      return {
        name: name,
        x: x,
        y: y,
        w: w
      };
    }
    introRows = [[introText('You walk for days among', 80, 200), introImage('tree', 480, 82, 220), introText('and among', 582, 200), introImage('stone', 772, 160, 269), introText('.', 1068, 200)], [introText('Rarely does the', 80, 361), introImage('eye', 330, 305, 151)], [introText('light on a thing, and then only when it has recognized', 378, 441)], [introText('that thing as the sign of another thing: a print in the', 80, 521), introImage('sand', 853, 496, 184), introText('indicates the', 1058, 521), introImage('tiger', 1248, 468, 131), introText('’s', 1381, 521)], [introText('passage;', 80, 601)], [introText('a', 80, 681), introImage('marsh', 142, 647, 153), introText('announces a vein of', 315, 681), introImage('water', 644, 625, 170)], [introText('; the hibiscus', 106, 761), introImage('flower', 307, 728, 169), introText(', the end of', 484, 761), introImage('winter', 686, 727, 247), introText('.', 906, 761)], [introText('All the rest is silent and interchangeable; trees and stones are only what they are.', 212, 841)],];
  } else {
    
    introScale = 1;
    introLeft = 0;
    introTop = 0;
    introFont = constrain(width * .044, 16, 23);
    setFont(400, introFont);
    const tokens = INTRO.split(' ');
    const decorated = {
      'trees': 'tree',
      'stones.': 'stone',
      'eye': 'eye',
      'sand': 'sand',
      'tiger’s': 'tiger',
      'marsh': 'marsh',
      'water;': 'water',
      'flower,': 'flower',
      'winter.': 'winter'
    };
    let row = [];
    let x = 22;
    let y = 55;
    const space = textWidth(' ');
    for (let index = 0; index < tokens.length; index++) {
      const word = tokens[index];
      let name;
      if (index < tokens.indexOf('All')) {
        name = decorated[word];
      } else {
        name = null;
      }
      const artwork = name && introAssets[name];
      let w;
      if (artwork) {
        w = min(introFont * 3.4, (artwork.crop[2] - artwork.crop[0]) /(artwork.crop[3] - artwork.crop[1]) * introFont * 1.65);
      } else {
        w = textWidth(word);
      }
      if (x + w > width - 22 && row.length) {
        introRows.push(row);
        row = [];
        x = 22;
        y += introFont * 2.1;
      }
      if (artwork) {
        row.push( {
          name: name,
          x: x,
          y: y - introFont,
          w: w
        });
      } else {
        row.push( {
          text: word,
          x: x,
          y: y
        });
      }
      x += w + space;
      if (artwork) {
        let suffix = '';
        const lastLetter = word.charAt(word.length - 1);
        if (word.endsWith('’s')) {
          suffix = '’s';
        } else if (lastLetter === '.' || lastLetter === ';' || lastLetter === ',') {
          suffix = lastLetter;
        }
        if (suffix) {
          row.push( {
            text: suffix,
            x: x - space,
            y: y
          });
          x += textWidth(suffix);
        }
      }
    }
    if (row.length) {
      introRows.push(row);
    }
    introTop = max(0, (height - 80 - y) / 2);
  }
  introDuration =(introRows.length - 1) * SETTINGS.introLineDelay + SETTINGS.introFadeDuration;
}

// I wanted the opening to fade in over time and the image-words to drift very slightly.
// AI helped me understand how millis() can measure elapsed time and how sin() can create
// a repeated back-and-forth motion; I adjusted the timing and movement for this scene.
function drawNature() {
  const elapsed = millis() - sceneStarted;
  push();
  translate(introLeft, introTop);
  scale(introScale);
  setFont(400, introFont);
  textAlign(LEFT, CENTER);
  noStroke();
  for (let i = 0; i < introRows.length; i++) {
    const row = introRows[i];
    
    const alpha = ease(constrain((elapsed - i * SETTINGS.introLineDelay) / SETTINGS.introFadeDuration, 0, 1));
    if (alpha <= 0) {
      continue;
    }
    for (let j = 0; j < row.length; j++) {
      const part = row[j];
      if (part.name) {
        
        const phase = i * 1.73 + j * .91;
        let driftX;
        if (reducedMotion) {
          driftX = 0;
        } else {
          driftX = sin(elapsed / 3200 + phase) * 3.5;
        }
        let driftY;
        if (reducedMotion) {
          driftY = 0;
        } else {
          driftY = sin(elapsed / 2500 + phase * 1.3) * 5;
        }
        const art = introAssets[part.name];
        const h = aspectHeight(art, part.w);
        drawArt(art, part.x + driftX, part.y + driftY, part.w, h, alpha);
      } else {
        fill(17, alpha * 255);
        text(part.text, part.x, part.y);
      }
    }
  }
  pop();
  const finished = elapsed >= introDuration;
  if (finished && (heldDown || keyboardDown)) {
    enterCity();
  }
}

// Switches to the city after the introduction has finished.
// River sound stops, city music starts.
function enterCity() {
  if (!ready || millis() - sceneStarted < introDuration) {
    return;
  }
  scene = 'city';
  cityStarted = millis();
  heldDown = false;
  natureSound.stop();
  startMusic();
  focusedControl = '';
}

// This recalculates the text layout, sign sizes, and positions for the current window size.
function layout() {
  const progress = readingOffset / maxScroll;
  smallScreen = width <= 760;
  if (smallScreen) {
    readingWidth = width - 44;
  } else {
    readingWidth = width * 0.50;
  }
  cityScale = readingWidth / 756;
  fontSize = constrain(readingWidth * .0423, 22, 42);
  lineHeight = fontSize * 1.51;
  setFont(SETTINGS.fontWeight, fontSize);
  lines = [];
  let line = '';
  let padding;
  if (smallScreen) {
    padding = 12;
  } else {
    padding = 18 * cityScale;
  }
  const words = PASSAGE.split(' ');
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];
    let candidate;
    if (line) {
      candidate = line + ' ' + word;
    } else {
      candidate = word;
    }
    if (line && textWidth(candidate) > readingWidth - padding * 2) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) {
    lines.push(line);
  }
  maxScroll = max(1, lines.length * lineHeight - height * .67);
  readingOffset = constrain(progress * maxScroll, 0, maxScroll);
  for (let index = 0; index < signs.length; index++) {
    const s = signs[index];
    const pos = SIGN_POSITIONS[s.id] || SIGN_POSITIONS[s.name];
    s.position = pos;
    s.w = pos[2] * cityScale;
    s.h = aspectHeight(s, s.w);
    s.homeX = pos[0] * readingWidth;
    s.homeY = pos[1] * height;
    s.dx = 0;
    s.dy = 0;
    s.releasedAt = null;
    s.currentX = s.homeX;
    s.currentY = s.homeY;
  }
  layoutIntro();
  layoutEnding();
}

function draw() {
  background(255);
  if (!ready) {
    textFont(regularFont);
    textSize(18);
    fill(40);
    textAlign(LEFT, TOP);
    text('An image or font could not load. Please reload the page.', 24, 24);
    return;
  }
  if (!focused) {
    clearInput();
  }
  if (scene === 'nature') {
    drawNature();
  } else if (scene === 'city') {
    // deltaTime keeps the held-arrow movement more consistent across frame rates.
    // The limit prevents a large jump if the tab pauses for a moment.
    const seconds = min(deltaTime, 50) / 1000;
    if (!activeSign && (heldDown || keyboardDown)) {
      readingOffset = min(maxScroll, readingOffset + SETTINGS.scrollSpeed * seconds);
    }
    drawCity();
  } else {
    drawEnding();
  }
  updateMusicState();
  drawControls();
}

// I connect each sign to reading progress rather than a fixed timer.
// A sign stays visible once it appears, so the city gradually becomes more crowded.
function drawCity() {
  const progress = readingOffset / maxScroll;
  const now = millis();
  const entry = ease(constrain((now - cityStarted) / 650, 0, 1));
  push();
  noStroke();
  setFont(SETTINGS.fontWeight, fontSize);
  textAlign(CENTER, TOP);
  fill(41, entry * 255);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const y = index * lineHeight - readingOffset - 5 * cityScale;
    if (y > - lineHeight && y < height) {
      text(line, readingWidth / 2, y);
    }
  }

  const lift = ease(constrain((progress - .74) / .26, 0, 1)) * height * .30;
  for (let signIndex = 0; signIndex < signs.length; signIndex++) {
    const s = signs[signIndex];
    if (!s.visible && progress >= s.at) {
      s.visible = true;
      s.appearedAt = now;
    }
    if (!s.visible) {
      continue;
    }
    s.homeX = s.position[0] * readingWidth;
    s.homeY = s.position[1] * height - lift;
    updateReturn(s, now);
    s.currentX = s.homeX + s.dx;
    s.currentY = s.homeY + s.dy;
    const alpha = ease(constrain((now - s.appearedAt) / SETTINGS.appearDuration, 0, 1));
    drawArt(s, s.currentX - s.w / 2, s.currentY - s.h / 2, s.w, s.h, alpha * entry);
  }
  drawCityUI(progress, entry);
  pop();
}

// This adds the map details and the search-style panel to the city.
// When a sign is dragged, I use the same drag distance to move its matching panel.
function drawCityUI(progress, alpha) {
  const c = cityScale;
  if (!smallScreen) {
    drawArt(uiAssets.categories, width * .513, height * .043, width * .405, aspectHeight(uiAssets.categories, width * .405), alpha);
  }
  const buttonW = constrain(62 * c, 40, 62);
  drawArt(uiAssets.zoom, 12 * c, height * .035, buttonW, aspectHeight(uiAssets.zoom, buttonW), alpha);
  drawArt(uiAssets.pegman, 12 * c, height * .171, buttonW, buttonW, alpha);
  const walkerW = constrain(63 * c, 28, 63);
  const walkerY = 28 +(height * .75 - 28) * progress;
  drawArt(uiAssets.walker, readingWidth / 2 - walkerW / 2, walkerY - walkerW * .23, walkerW, aspectHeight(uiAssets.walker, walkerW), alpha);
  drawRoute(progress, alpha);
  let available;
  if (smallScreen) {
    available = width - 65;
  } else {
    available = width - readingWidth - width * .085;
  }
  const panelW = min(449 * c, available * .88);
  let centerX;
  if (smallScreen) {
    centerX = width * .56;
  } else {
    centerX = readingWidth + available * .50;
  }
  const centerY = height * .51;
  if (activeSign) {
    
    const dx = activeSign.currentX - dragStartX;
    const dy = activeSign.currentY - dragStartY;
    const panelH = aspectHeight(activeSign.panel, panelW);
    drawArt(activeSign.panel, centerX - panelW / 2 + dx, centerY - panelH / 2 + dy, panelW, panelH, alpha);
  } else if (!smallScreen) {
    const idleW = min(370 * c, available * .70);
    drawArt(idlePanel, centerX - idleW / 2, centerY - aspectHeight(idlePanel, idleW) / 2, idleW, aspectHeight(idlePanel, idleW), alpha);
  }
}

// The blue marker moves along the route based on the reading progress.
// As the reading continues, it gets closer to the destination.
function drawRoute(progress, alpha) {
  const trackW = constrain(width * .035, 27, 60);
  let margin = width * 0.025;
  if (smallScreen) {
    margin = 9;
  }
  const x = width - margin - trackW;
  const y = height * .045;
  const h = height * .92;
  drawArt(uiAssets.track, x, y, trackW, h, alpha);
  const cx = x + trackW / 2;
  const startY = y + trackW * .65;
  const endY = y + h - trackW * .80;
  const markerY = startY +(endY - startY - constrain(46 * cityScale, 29, 48)) * progress;
  
  const routeW = constrain(15 * cityScale, 9, 16);
  const routeH = endY - startY;
  drawRoutePart(uiAssets.route8, cx - routeW / 2, startY, routeW, routeH, markerY, .44, alpha);
  drawRoutePart(uiAssets.route11, cx - routeW / 2, startY + routeH * .44, routeW, routeH * .26, markerY, 1, alpha);
  drawRoutePart(uiAssets.route10, cx - routeW / 2, startY + routeH * .70, routeW, routeH * .30, markerY, 1, alpha);
  const pinW = constrain(27 * cityScale, 20, 30);
  const locW = constrain(34 * cityScale, 22, 36);
  drawArt(uiAssets.destination, cx - pinW / 2, endY - pinW * .86, pinW, aspectHeight(uiAssets.destination, pinW), alpha);
  drawArt(uiAssets.location, cx - locW / 2, markerY - locW / 2, locW, locW, alpha);
}

// constrain() keeps the reading position inside its allowed range.
function navigate(amount) {
  if (!ready || activeSign) {
    return;
  }
  if (scene === 'nature') {
    if (amount > 0) {
      enterCity();
    }
    return;
  }
  if (scene === 'city') {
    readingOffset = constrain(readingOffset + amount, 0, maxScroll);
  }
}

// The down arrow moves the reading. Tab chooses a canvas button; Enter activates it.
// Left/right arrows select visible signs. Escape releases them. M toggles music; R restarts.
function keyPressed() {
  if (!ready) {
    return;
  }
  if (keyCode === TAB) {
    layoutControls();
    let index = -1;
    for (let i = 0; i < controls.length; i++) {
      if (controls[i].id === focusedControl) {
        index = i;
      }
    }
    if (controls.length > 0) {
      if (keyIsDown(SHIFT)) {
        index = (index - 1 + controls.length) % controls.length;
      } else {
        index = (index + 1) % controls.length;
      }
      focusedControl = controls[index].id;
    }
    return false;
  }
  if (keyCode === ENTER || key === ' ') {
    if (focusedControl) {
      useControl(focusedControl, false);
    } else {
      allowSound();
    }
    return false;
  }
  if (keyCode === DOWN_ARROW) {
    allowSound();
    keyboardDown = true;
    if (scene === 'nature') {
      navigate(1);
    }
    return false;
  }
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    let direction = 1;
    if (keyCode === LEFT_ARROW) {
      direction = -1;
    }
    selectNextSign(direction);
    return false;
  }
  if (keyCode === ESCAPE) {
    releaseSign();
    focusedControl = '';
    return false;
  }
  if (key === 'm' || key === 'M') {
    toggleMusic();
  }
  if (key === 'r' || key === 'R') {
    restartReading();
  }
}

// When I release the down arrow, keyboardDown becomes false and the reading stops.
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    keyboardDown = false;
  }
}

function mousePressed() {
  if (mouseButton !== LEFT) {
    return;
  }
  pressAt(mouseX, mouseY);
  return false;
}

function mouseDragged() {
  dragSign(mouseX, mouseY);
  return false;
}

function mouseReleased() {
  heldDown = false;
  if (!keyboardSelection) {
    releaseSign();
  }
}

function mouseMoved() {
  layoutControls();
  if (controlAt(mouseX, mouseY)) {
    cursor('pointer');
  } else if (scene === 'city' && signAt(mouseX, mouseY)) {
    cursor('grab');
  } else {
    cursor('default');
  }
}

// I wanted the same interaction to still work on a touch screen.
// AI helped me understand how p5.js touch events could reuse the mouse-based drag logic.
// One finger controls the interaction, and extra fingers do not take over an existing drag.
function touchStarted() {
  if (touches.length === 0) {
    return;
  }
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].id === activeTouch) {
      return false;
    }
  }
  activeTouch = touches[0].id;
  pressAt(touches[0].x, touches[0].y);
  return false;
}

// This finds the finger that started the drag and uses its current position.
// It calls the same dragSign() function as the mouse interaction.
function touchMoved() {
  if (activeTouch === null) {
    return;
  }
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].id === activeTouch) {
      dragSign(touches[i].x, touches[i].y);
      break;
    }
  }
  return false;
}

function touchEnded() {
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].id === activeTouch) {
      return false;
    }
  }
  heldDown = false;
  if (!keyboardSelection) {
    releaseSign();
  }
  activeTouch = null;
  return false;
}

// This selects the topmost visible sign under the pointer.
// Clicking empty canvas space releases the previous selection.
function pressSign(x, y) {
  if (!ready || scene !== 'city') {
    return;
  }
  const sign = signAt(x, y);
  if (sign) {
    activateSign(sign, x, y);
  } else {
    releaseSign();
  }
}

// I want the sign to stay under the exact point where it was grabbed instead of jumping.
// grabX and grabY remember where inside the sign it was first pressed, while dx and dy
// record how far the sign has moved away from its home position.
function dragSign(x, y) {
  if (!activeSign || keyboardSelection) {
    return;
  }
  activeSign.dx = x - grabX - activeSign.homeX;
  activeSign.dy = y - grabY - activeSign.homeY;
  activeSign.currentX = activeSign.homeX + activeSign.dx;
  activeSign.currentY = activeSign.homeY + activeSign.dy;
}

// Overlapping transparent signs created a selection problem in this scene.
// AI suggested checking the PNG alpha value, and I adapted that approach here.
// The loop starts with the last drawn sign, which is visually on top, and ignores
// transparent pixels so an empty part of a PNG does not block a sign underneath.
function signAt(x, y) {
  for (let i = signs.length - 1; i >= 0; i--) {
    const s = signs[i];
    if (!s.visible) {
      continue;
    }
    const u =(x - s.currentX) / s.w + .5;
    const v =(y - s.currentY) / s.h + .5;
    if (u < 0 || u >= 1 || v < 0 || v >= 1) {
      continue;
    }
    const sx = s.crop[0];
    const sy = s.crop[1];
    const ex = s.crop[2];
    const ey = s.crop[3];
    
    const px = floor(sx + u *(ex - sx));
    const py = floor(sy + v *(ey - sy));

    // Each pixel has red, green, blue, and alpha values. The fourth value is transparency.
    // Only visible pixels count as part of the draggable sign.
    if (s.img.pixels[(py * s.img.width + px) * 4 + 3] > 24) {
      return s;
    }
  }
  return null;
}

// Moving the selected sign to the end of the array makes it draw on top of the others.
function activateSign(sign, x, y, keyboard = false) {
  activeSign = sign;
  keyboardSelection = keyboard;
  grabX = x - sign.currentX;
  grabY = y - sign.currentY;
  dragStartX = sign.currentX;
  dragStartY = sign.currentY;
  sign.releasedAt = null;
  signs.splice(signs.indexOf(sign), 1);
  signs.push(sign);
  cursor('grabbing');
}

function releaseSign() {
  if (activeSign) {
    activeSign.fromDX = activeSign.dx;
    activeSign.fromDY = activeSign.dy;
    activeSign.releasedAt = millis();
  }
  activeSign = null;
  keyboardSelection = false;
  cursor('default');
}

function clearInput() {
  heldDown = false;
  keyboardDown = false;
  releaseSign();
  activeTouch = null;
}

// I wanted a released sign to return gently instead of snapping back.
// AI helped me understand lerp(), which finds a position between two values.
// After a short delay, the amount goes from 0 to 1 and the drag offset returns to zero.
function updateReturn(s, now) {
  if (s === activeSign || s.releasedAt === null) {
    return;
  }
  const t = constrain((now - s.releasedAt - SETTINGS.returnDelay) / SETTINGS.returnDuration, 0, 1);
  s.dx = lerp(s.fromDX, 0, ease(t));
  s.dy = lerp(s.fromDY, 0, ease(t));
  if (t === 1) {
    s.releasedAt = null;
  }
}

// Restarting resets the scene, sounds, reading position, and sign offsets together.
function restartReading() {
  clearInput();
  scene = 'nature';
  sceneStarted = millis();
  readingOffset = 0;
  cityMusic.stop();
  endingMusic.stop();
  endingMusic.volume(SETTINGS.endingMusicVolume);
  startNatureSound();
  signs.sort(function (a, b) {
    return a.at - b.at;
  });
  for (let i = 0; i < signs.length; i++) {
    const sign = signs[i];
    sign.visible = false;
    sign.dx = 0;
    sign.dy = 0;
    sign.releasedAt = null;
  }
  focusedControl = '';
}

// resizeCanvas() changes the canvas size; layout() recalculates where everything goes.
function windowResized() {
  clearInput();
  resizeCanvas(windowWidth, windowHeight);
  if (ready) {
    layout();
  }
}

// Starting the ending also switches the audio and starts a new scene timer.
function startEnding() {
  if (scene !== 'city' || readingOffset / maxScroll < 0.985) {
    return;
  }
  clearInput();
  scene = 'booting';
  sceneStarted = millis();
  cityMusic.stop();
  endingMusic.volume(SETTINGS.endingMusicVolume);
  endingMusic.play();
  focusedControl = '';
}

function nextScene(name) {
  scene = name;
  sceneStarted = millis();
}

// I lay out the complete sentences before revealing them letter by letter.
// This keeps words from jumping between lines during the typing effect.
function layoutEnding() {
  
  endingFontSize = constrain(width * 28 / 1512, 16, 32);
  push();
  textFont(monoFont);
  textSize(endingFontSize);
  leavingLines = wrapEndingText(LEAVING, min(width * .78, 1000));
  endingLines = [];
  for (let i = 0; i < ENDING_LINES.length; i++) {
    const wrapped = wrapEndingText(ENDING_LINES[i], width * 0.86);
    for (let j = 0; j < wrapped.length; j++) {
      endingLines.push(wrapped[j]);
    }
  }
  pop();
}

function wrapEndingText(sentence, maxWidth) {
  const result = [];
  let line = '';
  const words = sentence.split(' ');
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];
    let candidate;
    if (line) {
      candidate = line + ' ' + word;
    } else {
      candidate = word;
    }
    if (line && textWidth(candidate) > maxWidth) {
      result.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) {
    result.push(line);
  }
  return result;
}

// I designed the ending as a sequence of timed scenes: boot screen, typed text, desktop, clouds, and fade.
// AI helped me understand how to coordinate several timed transitions with millis() and constrain(),
// and I adjusted the durations and sequence to match the pacing I wanted.
function drawEnding() {
  const elapsed = millis() - sceneStarted;
  if (scene === 'booting') {
    background(0);

    let bootTime;
    // Once the music is playing, its playback time keeps the boot transition in sync.
    // If the track has not started, the scene clock still lets the visuals continue.
    if (endingMusic.time() === 0) {
      bootTime = elapsed;
    } else {
      bootTime = endingMusic.time() * 1000;
    }
    const brightness = ease(constrain((bootTime - SETTINGS.bootBlack) / SETTINGS.bootFade, 0, 1));
    if (brightness > 0) {
      drawBackground('transition', brightness);
    }
    if (bootTime >= SETTINGS.bootBlack + SETTINGS.bootFade + SETTINGS.bootPause) {
      nextScene('leaving');
    }
  } else if (scene === 'leaving') {
    drawBackground('transition');
    const typingDuration = LEAVING.length * SETTINGS.typingInterval;
    const fade = 1 - constrain((elapsed - typingDuration - SETTINGS.transitionHold) / SETTINGS.transitionFade, 0, 1);

    // The longer the scene has been running, the more letters slice() will reveal.
    let letters = floor(elapsed / SETTINGS.typingInterval);
    push();
    textFont(monoFont);
    textSize(endingFontSize);
    textAlign(LEFT, TOP);
    noStroke();
    fill(255, fade * 255);
    const lineGap = endingFontSize * 1.55;
    const top =(height - leavingLines.length * lineGap) / 2;
    for (let i = 0; i < leavingLines.length; i++) {
      const line = leavingLines[i];
      text(line.slice(0, max(0, letters)), (width - min(width * .78, 1000)) / 2, top + i * lineGap);
      letters -= line.length + 1;
    }
    pop();
    if (elapsed >= typingDuration + SETTINGS.transitionHold + SETTINGS.transitionFade) {
      nextScene('desktop');
    }
  } else if (scene === 'desktop') {
    drawBackground('windows');

    const dissolve = ease(constrain((elapsed - SETTINGS.desktopHold) / SETTINGS.desktopDissolve, 0, 1));
    if (dissolve > 0) {
      drawBackground('clouds', dissolve);
    }
    if (elapsed >= SETTINGS.desktopHold + SETTINGS.desktopDissolve) {
      nextScene('clouds');
    }
  } else if (scene === 'clouds') {
    drawBackground('clouds');
    push();
    textFont(monoFont);
    textSize(endingFontSize);
    textAlign(CENTER, CENTER);
    noStroke();
    const lineGap = endingFontSize * 1.75;
    const top = height / 2 -(endingLines.length - 1) * lineGap / 2;
    for (let i = 0; i < endingLines.length; i++) {
      const line = endingLines[i];
      const alpha = ease(constrain((elapsed - i * SETTINGS.endingLineDelay) / SETTINGS.endingLineFade, 0, 1));
      let dx;
      if (reducedMotion) {
        dx = 0;
      } else {
        dx = sin(elapsed / 5500 + i * 1.3) * 7;
      }
      let dy;
      if (reducedMotion) {
        dy = 0;
      } else {
        dy = sin(elapsed / 4200 + i * .9) * 5;
      }
      fill(255, alpha * 255);
      text(line, width / 2 + dx, top + i * lineGap + dy);
    }
    pop();
    
    const allTextVisible =(endingLines.length - 1) * SETTINGS.endingLineDelay + SETTINGS.endingLineFade;
    const fade = constrain((elapsed - allTextVisible - SETTINGS.endingHoldAfterLastLine) / SETTINGS.endingFade, 0, 1);

    // The image and sound use the same fade amount so they disappear together.
    endingMusic.volume(SETTINGS.endingMusicVolume *(1 - ease(fade)));
    if (fade > 0) {
      push();
      noStroke();
      fill(0, ease(fade) * 255);
      rect(0, 0, width, height);
      pop();
    }
    if (fade === 1) {
      endingMusic.stop();
      nextScene('black');
      focusedControl = '';
    }
  } else if (scene === 'black') {
    background(0);
  }
}

// This fills the screen while keeping the background image's original proportions.
function drawBackground(name, alpha = 1) {
  
  const img = backgrounds[name];
  const ratio = max(width / img.width, height / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  push();
  imageMode(CORNER);
  tint(255, alpha * 255);
  image(img, (width - w) / 2, (height - h) / 2, w, h);
  pop();
}

function setFont(weight, size) {
  if (weight === 100) {
    textFont(thinFont);
  } else {
    textFont(regularFont);
  }
  textSize(size);
}

function aspectHeight(art, w) {
  return w *(art.crop[3] - art.crop[1]) /(art.crop[2] - art.crop[0]);
}

// I use the longer version of image() to draw only the cropped part of each artwork.
// x, y, w, and h describe its position and size on the canvas.
// tint() controls opacity, while push() and pop() keep that opacity from affecting other drawings.
function drawArt(art, x, y, w, h, alpha = 1) {
  if (!art || !art.img) {
    return;
  }
  const sx = art.crop[0];
  const sy = art.crop[1];
  const ex = art.crop[2];
  const ey = art.crop[3];
  push();
  imageMode(CORNER);
  tint(255, alpha * 255);
  image(art.img, x, y, w, h, sx, sy, ex - sx, ey - sy);
  pop();
}

// I wanted the route ahead of the blue marker to get shorter as reading progress increases.
// AI helped me understand how to convert the marker position into a crop fraction for the image.
// first and last are fractions between 0 and 1; after the marker passes a section,
// that part of the route is no longer drawn.
function drawRoutePart(art, x, y, w, h, markerY, last, alpha) {
  const first = constrain((markerY - y) / h, 0, last);
  if (first >= last) {
    return;
  }
  const sx = art.crop[0];
  const sy = art.crop[1];
  const ex = art.crop[2];
  const ey = art.crop[3];
  push();
  imageMode(CORNER);
  tint(255, alpha * 255);
  image(art.img, x, y + h * first, w, h *(last - first), sx, sy +(ey - sy) * first, ex - sx, (ey - sy) *(last - first));
  pop();
}

function currentMusic() {
  if (scene === 'nature') {
    return natureSound;
  }
  if (scene === 'city') {
    return cityMusic;
  }
  return null;
}

function allowSound() {
  if (!soundEnabled) {
    soundEnabled = true;
    startMusic();
  }
}

// I keep the playback request separate from confirmed playback so the label does not say
// "on" while the file is still waiting to play.
function startMusic() {
  musicRequested = false;
  musicPlaying = false;
  const sound = currentMusic();
  if (sound && soundEnabled) {
    lastMusicTime = sound.time();
    lastMusicChange = millis();
    musicRequested = true;
    sound.loop();
  }
}

function toggleMusic() {
  const sound = currentMusic();
  if (!sound) {
    return;
  }
  soundEnabled = true;
  if (musicRequested) {
    sound.pause();
    musicRequested = false;
    musicPlaying = false;
  } else {
    startMusic();
  }
}

// p5.js time() lets me check whether the track is actually moving forward.
// If the playback time changes, the label can say "on". After a long wait with no progress,
// the request stops so the reader can try again.
function updateMusicState() {
  const sound = currentMusic();
  if (!sound || !musicRequested) {
    musicPlaying = false;
    return;
  }
  const now = sound.time();
  if (now !== lastMusicTime) {
    lastMusicTime = now;
    lastMusicChange = millis();
    musicPlaying = true;
  }
  if (millis() - lastMusicChange > 2000) {
    musicPlaying = false;
  }
  if (millis() - lastMusicChange > 5000) {
    sound.pause();
    musicRequested = false;
  }
}

function layoutControls() {
  controls = [];
  if (!ready) {
    return;
  }
  push();
  textFont(regularFont);
  textSize(14);
  let right = width * 0.93;
  if (smallScreen) {
    right = width - 12;
  }
  const top = height - 50;
  if (scene === 'black') {
    controls.push({id: 'restart', label: 'Restart', x: right - 60, y: top, w: 60, h: 38});
    pop();
    return;
  }
  if (scene !== 'nature' && scene !== 'city') {
    pop();
    return;
  }
  const introFinished = millis() - sceneStarted >= introDuration;
  if (scene === 'city' || introFinished) {
    controls.push({id: 'down', label: '', x: right - 38, y: top, w: 38, h: 38});
    right -= 54;
    controls.push({id: 'restart', label: 'Restart', x: right - 52, y: top, w: 52, h: 38});
    right -= 68;
  }
  let label = 'Sound';
  if (scene === 'city') {
    label = 'Music';
  }
  if (musicPlaying) {
    label += ': on';
  } else if (musicRequested) {
    label += ': loading';
  } else {
    label += ': off';
  }
  const musicWidth = textWidth(label) + 8;
  controls.push({id: 'music', label: label, x: right - musicWidth, y: top, w: musicWidth, h: 38});
  if (scene === 'city' && readingOffset / maxScroll >= 0.985) {
    const exitWidth = max(72, 92 * cityScale);
    const exitHeight = aspectHeight(exitArt, exitWidth);
    controls.push({id: 'exit', label: 'EXIT', x: readingWidth / 2 - exitWidth / 2, y: height * 0.90 - exitHeight / 2, w: exitWidth, h: exitHeight});
  }
  pop();
}

function drawControls() {
  layoutControls();
  push();
  if (smallScreen && controls.length > 0 && scene !== 'black') {
    let panelHeight = 56;
    if (scene === 'city' || millis() - sceneStarted >= introDuration) {
      panelHeight = 84;
    }
    const panelWidth = width - 16;
    noStroke();
    fill(255, 242);
    rect(width - panelWidth - 8, height - panelHeight, panelWidth, panelHeight - 4, 12);
  }
  textFont(regularFont);
  textSize(14);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < controls.length; i++) {
    const button = controls[i];
    if (button.id === 'exit') {
      drawArt(exitArt, button.x, button.y, button.w, button.h);
    } else if (button.id === 'down') {
      fill(255);
      stroke(225);
      strokeWeight(1);
      circle(button.x + 19, button.y + 19, 38);
      stroke(120);
      strokeWeight(1.5);
      line(button.x + 19, button.y + 10, button.x + 19, button.y + 28);
      line(button.x + 12, button.y + 21, button.x + 19, button.y + 28);
      line(button.x + 26, button.y + 21, button.x + 19, button.y + 28);
    } else {
      noStroke();
      fill(120);
      if (scene === 'black') {
        fill(180);
      }
      text(button.label, button.x + button.w / 2, button.y + button.h / 2);
    }
    if (button.id === focusedControl) {
      noFill();
      stroke(38, 92, 255);
      strokeWeight(2);
      rect(button.x - 3, button.y - 3, button.w + 6, button.h + 6, 4);
    }
  }
  if (scene === 'city' || (scene === 'nature' && millis() - sceneStarted >= introDuration)) {
    let hint = 'Press the down arrow';
    if (scene === 'city') {
      hint = 'Hold the down arrow · Drag signs';
    }
    noStroke();
    fill(120);
    if (smallScreen) {
      textAlign(CENTER, CENTER);
      text(hint, width / 2, height - 64);
    } else {
      textAlign(RIGHT, CENTER);
      const musicButton = controls[2];
      text(hint, musicButton.x - 16, height - 31);
    }
  }
  pop();
}

// A button click is checked against its rectangular bounds.
// The pointer must be between the left/right edges and the top/bottom edges.
// The function returns that button, or null if no button was hit.
function controlAt(x, y) {
  for (let i = controls.length - 1; i >= 0; i--) {
    const button = controls[i];
    if (x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h) {
      return button;
    }
  }
  return null;
}

// Buttons are checked before signs so pressing a control does not drag artwork behind it.
// A click elsewhere can enable sound and select a sign.
function pressAt(x, y) {
  if (!ready || x < 0 || x > width || y < 0 || y > height) {
    return;
  }
  layoutControls();
  const button = controlAt(x, y);
  focusedControl = '';
  if (button) {
    useControl(button.id, true);
  } else {
    allowSound();
    pressSign(x, y);
  }
}

function useControl(id, hold) {
  if (id === 'music') {
    toggleMusic();
  } else if (id === 'restart') {
    restartReading();
  } else if (id === 'exit') {
    startEnding();
  } else if (id === 'down') {
    allowSound();
    if (scene === 'nature') {
      navigate(1);
    } else if (!hold) {
      navigate(height * 0.12);
    }
    heldDown = hold;
  }
}

function selectNextSign(direction) {
  if (scene !== 'city') {
    return;
  }
  const available = [];
  for (let i = 0; i < signs.length; i++) {
    if (signs[i].visible) {
      available.push(signs[i]);
    }
  }
  available.sort(function (a, b) {
    return a.at - b.at;
  });
  if (available.length === 0) {
    return;
  }
  let index = available.indexOf(activeSign);
  releaseSign();
  if (index < 0 && direction < 0) {
    index = 0;
  }
  index = (index + direction + available.length) % available.length;
  const sign = available[index];
  activateSign(sign, sign.currentX, sign.currentY, true);
  describeElement('Selected sign', sign.name.replaceAll('-', ' ') + '. Its associated search panel is visible. Press Escape to release it.');
}
