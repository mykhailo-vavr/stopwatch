import { model } from './stopwatchModel.js';

export const view = {
  animatedItems: [
    document.querySelector('.stopwatch-clockwise'),
    document.querySelector('.stopwatch-clock-clockwise')
  ],
  btnContainer: document.querySelector('.btn_container'),
  lapsContainer: document.querySelector('.laps_container'),

  start() {
    for (const timeName of model.timeList) {
      this[timeName] = document.querySelector(
        `[data-time="${timeName}"]`
      );
    }
  },

  animate(action) {
    for (const item of this.animatedItems) {
      this[`${action}Animate`](item);
    }
  },

  startAnimate(item) {
    item.style.animation = `rotate ${
      item.dataset.period || 0
    }s linear 0s infinite`;
  },

  stopAnimate(item) {
    item.style.animation = '';
  },

  setTimeToCell(timeName, time) {
    let timeText = this.getTimeText(time);
    this[timeName].textContent = timeText;
  },

  getTimeText(time) {
    return time <= 9 ? `0${time}` : time;
  },

  restartMeasuring() {
    for (const timeName of model.timeList) {
      this.setTimeToCell(timeName, 0);
    }

    for (const item of this.animatedItems) {
      item.style.cssText = '';
    }

    this.lapsContainer.innerHTML = '';
  },

  addLap(options) {
    let lapHTML = `
      <div class="laps_container">
        <div class="laps_container-item">
          <span class="laps_container-item-counter">
            Lap<sup>${options.count}</sup>
          </span>
          <span class="laps_container-item-time">00:03.1</span>
          <span class="laps_container-item-difference">
            +00:22.2
          </span>
      </div>
    `;

    this.lapsContainer.insertAdjacentHTML('afterbegin', lapHTML);
  },

  replaceBtn(btns) {
    // let btnsOptions = {
    //   start: {
    //     title: 'Start',
    //     class: ['btn', 'start-btn'],
    //     action: 'startMeasuring',
    //     replace: ['lap', 'stop']
    //   },
    //   lap: {
    //     title: 'Lap',
    //     class: ['btn', 'left-btn'],
    //     action: 'fixLap',
    //     replace: []
    //   },
    //   stop: {
    //     title: 'Stop',
    //     class: ['btn', 'right-btn'],
    //     action: 'stopMeasuring',
    //     replace: []
    //   },
    //   restart: {
    //     title: 'Restart',
    //     class: ['btn', 'left-btn'],
    //     action: 'restartMeasuring',
    //     replace: ['start']
    //   },
    //   resume: {
    //     title: 'Resume',
    //     class: ['btn', 'right-btn'],
    //     action: 'startMeasuring',
    //     replace: ['lap', 'stop']
    //   }
    // };
    let btnsHTML = {
      start: `
        <button
          class="btn start-btn"
          data-action="startMeasuring"
          data-replace="lap-stop"
        >
          Start
        </button>`,
      lap: `
        <button class="btn left-btn" data-action="fixLap">
          Lap
        </button>`,
      stop: `
        <button
          class="btn right-btn"
          data-action="stopMeasuring"
          data-replace="restart-resume"
        >
          Stop
        </button>`,
      restart: `
        <button
            class="btn left-btn"
            data-action="restartMeasuring"
            data-replace="start"
          >
            Restart
          </button>`,
      resume: `
        <button
          class="btn right-btn"
          data-action="startMeasuring"
          data-replace="lap-stop"
        >
          Resume
        </button>`
    };
    this.btnContainer.innerHTML = '';

    for (const btn of btns) {
      this.btnContainer.insertAdjacentHTML(
        'beforeend',
        btnsHTML[btn]
      );
    }
  }
};
