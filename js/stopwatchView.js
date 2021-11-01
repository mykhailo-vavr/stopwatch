export const view = {
  animatedItems: [
    {
      item: document.querySelector('.stopwatch-clockwise'),
      name: 'Triangle'
    },
    {
      item: document.querySelector('.stopwatch-clock-clockwise'),
      name: 'Line'
    }
  ],
  btnContainer: document.querySelector('.btn_container'),
  lapsContainer: document.querySelector('.laps_container'),
  timeText: document.querySelector('.stopwatch-time_text'),
  styleContainer: document.querySelector('style'),

  animate(action) {
    for (const item of this.animatedItems) {
      this[`${action}Animate`](item);
    }
    if (action === 'stop') {
      this.clearKeyframes();
    }
  },

  startAnimate({ item, name }) {
    this.setKeyframe(name, this.getAngle(item));
    item.style.animation = `rotate${name} ${
      item.dataset.period || 0
    }s linear 0s infinite`;
  },

  stopAnimate({ item }) {
    item.style.transform = `rotate(${this.getAngle(item)}deg`;
    item.style.animation = '';
  },

  setKeyframe(name, angle) {
    let keyframeCSS = `
      @keyframes rotate${name} {
        from {
          transform: rotate(${angle}deg);
        }
        to {
          transform: rotate(${angle + 360}deg);
        }
      }`;

    this.styleContainer.insertAdjacentHTML('afterbegin', keyframeCSS);
  },

  clearKeyframes() {
    this.styleContainer.innerHTML = '';
  },

  getAngle(item) {
    let matrix = getComputedStyle(item).transform;
    if (matrix === 'none') return 0;
    let values = matrix.split(',');
    let a = values[0].split('(')[1];
    let b = values[1];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  },

  setTime(timeText = '00 : 00 : 00') {
    this.timeText.textContent = timeText;
  },

  restartMeasuring() {
    this.setTime();

    for (const { item } of this.animatedItems) {
      item.style.cssText = '';
    }
    this.clearKeyframes();

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
