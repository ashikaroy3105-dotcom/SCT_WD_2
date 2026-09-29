# Stopwatch Web Application

An interactive, user-friendly stopwatch built with plain HTML, CSS and JavaScript. It can start, pause, resume and reset, and it records lap times.

Built as **Task 02** of the Web Development Internship at SkillCraft Technology.
`

## Task Requirements

| Requirement | How it is done |
|---|---|
| Interactive, user-friendly stopwatch | Large time display, clear buttons, keyboard shortcuts, responsive layout |
| Start, pause and reset | One main button switches between Start, Pause and Resume; a separate Reset button clears everything |
| Track and display lap times | Each lap shows its number, lap time and total time in a list, newest on top |

## Features

- Time display in `MM:SS.cs` format (minutes, seconds, hundredths); hours appear after one hour
- Start, Pause, Resume, Lap and Reset controls
- Lap list with lap time and total time for each lap
- Fastest and slowest laps highlighted with color and a text label
- Buttons are disabled when they cannot be used (for example, Lap before Start)
- Keyboard shortcuts: `Space` start/pause, `L` lap, `R` reset
- Elapsed time shown in the browser tab title while running
- Responsive layout for phones, tablets and desktops
- Visible focus outlines and reduced-motion support

## Technologies Used

- **HTML5** for structure
- **CSS3** for styling (Grid, CSS variables, media queries)
- **JavaScript (ES6)** for the stopwatch logic
- **Google Fonts** (Bricolage Grotesque and Figtree)

## Project Structure

```
stopwatch/
├── index.html    # Page structure
├── style.css     # Styles and responsive rules
├── script.js     # Stopwatch logic, laps and keyboard shortcuts
└── README.md     # Project documentation
```

## How to Run

1. Download or clone this repository.
2. Open the folder in **VS Code**.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a modern browser.

## How It Works

**Accurate timing:** the stopwatch does not add up small timer ticks, which drift over time. It stores the start moment with `performance.now()` and calculates `elapsed = time before + (now - start moment)` on every screen refresh using `requestAnimationFrame`.

**Pause and resume:** on pause, the time of the current run is added to `elapsedBefore`. On resume, a new start moment is stored, so the count continues from where it stopped.

**Laps:** on each lap, the current total is saved. The lap time is the total minus the previous lap's total. The fastest and slowest laps are found with `Math.min` and `Math.max`.

## Testing Checklist

- [ ] Start begins counting and the button changes to Pause
- [ ] Pause stops the time; the button changes to Resume
- [ ] Resume continues from the paused time
- [ ] Lap records a time without stopping the stopwatch
- [ ] Lap list shows lap time and total, newest on top
- [ ] Fastest and slowest laps are highlighted (after 2 or more laps)
- [ ] Reset clears the time and the lap list
- [ ] Space, L and R shortcuts work
- [ ] Layout looks correct on a phone-size screen

