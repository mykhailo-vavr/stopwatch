import { view } from './stopwatchView.js';

export const model = {
  timeList: ['minutes', 'seconds', 'milliseconds'],
  second: 1000,
  countOfLaps: 0,
  msAfterPrevLapFix: 0,
  msAfterCurrentLapFix: 0,
  elapsedTime: 0,

  startMeasuring() {
    view.animate('start');
    this.startTime = Date.now() - this.elapsedTime;
    this.elapsedTime = Date.now() - this.startTime;
    view.setTime(this.getTimeText());

    this.stopwatchID = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      view.setTime(this.getTimeText());
    }, this.second / 10);
  },

  stopMeasuring() {
    view.animate('stop');
    clearInterval(this.stopwatchID);
  },

  restartMeasuring() {
    clearInterval(this.stopwatchID);
    this.countOfLaps = 0;
    this.msAfterPrevLapFix = 0;
    this.msAfterCurrentLapFix = 0;
    view.restartMeasuring();
    this.elapsedTime = 0;
  },

  fixLap() {
    let difference =
      this.elapsedTime -
      this.msAfterCurrentLapFix -
      (this.msAfterCurrentLapFix - this.msAfterPrevLapFix);

    view.addLap({
      count: ++this.countOfLaps,
      time: this.getTimeText(
        this.elapsedTime - this.msAfterCurrentLapFix,
        ':'
      ),
      difference: this.getTimeText(Math.abs(difference), ':'),
      differenceSign: difference < 0 ? '-' : '+'
    });
    this.msAfterPrevLapFix = this.msAfterCurrentLapFix;
    this.msAfterCurrentLapFix = this.elapsedTime;
  },

  getTimeText(ms = this.elapsedTime, separator = ' : ') {
    const capitalizeFirst = word =>
      word[0].toUpperCase() + word.slice(1);

    return this.timeList
      .map(timeName => this['get' + capitalizeFirst(timeName)](ms))
      .map(time => (time <= 9 ? `0${time}` : time))
      .join(separator);
  },

  getMinutes(ms = this.elapsedTime) {
    return Math.floor((ms / 1000 / 60) % 60);
  },

  getSeconds(ms = this.elapsedTime) {
    return Math.floor((ms / 1000) % 60);
  },

  getMilliseconds(ms = this.elapsedTime) {
    return Math.floor((ms % 1000) / 100);
  }
};
