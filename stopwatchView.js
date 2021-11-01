export const view = {
  animatedItems: [
    document.querySelector('.stopwatch-clockwise'),
    document.querySelector('.stopwatch-clock-clockwise')
  ],
  btnContainer: document.querySelector('.btn_container'),
  lapsContainer: document.querySelector('.laps_container'),
  timeText: document.querySelector('.stopwatch-time_text'),

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

  setTime(timeText = '00 : 00 : 00') {
    this.timeText.textContent = timeText;
  },

  restartMeasuring() {
    this.setTime();

    for (const item of this.animatedItems) {
      item.style.cssText = '';
    }

    this.lapsContainer.innerHTML = '';
  },

  addLap(options) {
    let lapsContainer = this.lapsContainer;
    let lapHTML = `
      <div class="laps_container-item">
        <span class="laps_container-item-counter">
          Lap<sup>${options.count}</sup>
        </span>
        <span class="laps_container-item-time">${options.time}</span>
        <span class="laps_container-item-difference">
          ${options.differenceSign}${options.difference}
        </span>
      </div>
    `;
    lapsContainer.insertAdjacentHTML('afterbegin', lapHTML);
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
