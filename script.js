const display  = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const lapBtn   = document.getElementById("lap-btn");
const resetBtn = document.getElementById("reset-btn");
const lapTable = document.getElementById("lap-table");
const lapBody  = document.getElementById("lap-body");
const emptyMsg = document.getElementById("empty-msg");

let running = false;
let startTime = 0;        // moment the current run started
let elapsedBefore = 0;    // time collected before the current run (from earlier runs)
let rafId = null;
let laps = [];            // { n, lapTime, total }
let lastLapTotal = 0;

/* ---------- Time helpers ---------- */
function getElapsed() {
  return running ? elapsedBefore + (performance.now() - startTime) : elapsedBefore;
}

function format(ms) {
  const pad = n => String(n).padStart(2, "0");
  const centis = Math.floor(ms / 10) % 100;
  const totalSec = Math.floor(ms / 1000);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60) % 60;
  const hrs = Math.floor(totalSec / 3600);
  return (hrs > 0 ? pad(hrs) + ":" : "") + pad(min) + ":" + pad(sec) + "." + pad(centis);
}

/* ---------- Rendering ---------- */
function renderTime() {
  const text = format(getElapsed());
  display.textContent = text;
  document.title = running ? text + " - Stopwatch" : "Stopwatch";
}

function tick() {
  renderTime();
  rafId = requestAnimationFrame(tick);
}

function updateButtons() {
  startBtn.textContent = running ? "Pause" : (elapsedBefore > 0 ? "Resume" : "Start");
  startBtn.classList.toggle("is-running", running);
  lapBtn.disabled = !running;
  resetBtn.disabled = !(running || elapsedBefore > 0 || laps.length > 0);
}

function renderLaps() {
  lapBody.innerHTML = "";
  emptyMsg.hidden = laps.length > 0;
  lapTable.hidden = laps.length === 0;

  const times = laps.map(l => l.lapTime);
  const fastest = Math.min(...times);
  const slowest = Math.max(...times);
  const canCompare = laps.length >= 2 && fastest !== slowest;

  // Newest lap on top
  [...laps].reverse().forEach(lap => {
    const row = document.createElement("tr");
    const c1 = document.createElement("td");
    const c2 = document.createElement("td");
    const c3 = document.createElement("td");

    c1.textContent = lap.n;
    c2.textContent = format(lap.lapTime);
    c3.textContent = format(lap.total);

    if (canCompare && lap.lapTime === fastest) {
      row.className = "fastest";
      c1.insertAdjacentHTML("beforeend", '<span class="tag">Fastest</span>');
    } else if (canCompare && lap.lapTime === slowest) {
      row.className = "slowest";
      c1.insertAdjacentHTML("beforeend", '<span class="tag">Slowest</span>');
    }

    row.append(c1, c2, c3);
    lapBody.appendChild(row);
  });
}

/* ---------- Actions ---------- */
function start() {
  startTime = performance.now();
  running = true;
  rafId = requestAnimationFrame(tick);
  updateButtons();
}

function pause() {
  elapsedBefore += performance.now() - startTime;
  running = false;
  cancelAnimationFrame(rafId);
  renderTime();
  updateButtons();
}

function toggle() {
  running ? pause() : start();
}

function lap() {
  if (!running) return;
  const total = getElapsed();
  laps.push({ n: laps.length + 1, lapTime: total - lastLapTotal, total });
  lastLapTotal = total;
  renderLaps();
  updateButtons();
}

function reset() {
  running = false;
  cancelAnimationFrame(rafId);
  elapsedBefore = 0;
  lastLapTotal = 0;
  laps = [];
  renderTime();
  renderLaps();
  updateButtons();
}

/* ---------- Events ---------- */
startBtn.addEventListener("click", toggle);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);

// Keyboard shortcuts: Space = start/pause, L = lap, R = reset
document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;   // keep browser shortcuts like Ctrl+R working
  if (e.code === "Space") {
    e.preventDefault();                              // stops page scroll and accidental button click
    if (!e.repeat) toggle();
  } else if (e.code === "KeyL" && !e.repeat) {
    lap();
  } else if (e.code === "KeyR" && !e.repeat) {
    reset();
  }
});
document.addEventListener("keyup", e => {
  if (e.code === "Space") e.preventDefault();        // some browsers click a focused button on Space release
});

// Initial screen
renderTime();
renderLaps();
updateButtons();
