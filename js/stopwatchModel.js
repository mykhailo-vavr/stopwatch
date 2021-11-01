import { view } from './stopwatchView.js';

export const model = {
  timeList: ['minutes', 'seconds', 'milliseconds'],
  second: 1000,
  countOfLaps: 0,
  ms: 0,
  msAfterPrevLapFix: 0,
  msAfterCurrentLapFix: 0,

  startMeasuring() {
    view.animate('start');
    this.setTime();
    this.stopwatchID = setInterval(
      this.setTime.bind(this),
      this.second / 10
    );
  },

  stopMeasuring() {
    view.animate('stop');
    clearInterval(this.stopwatchID);
  },

  restartMeasuring() {
    clearInterval(this.stopwatchID);
    this.countOfLaps = 0;
    this.ms = 0;
    this.msAfterPrevLapFix = 0;
    this.msAfterCurrentLapFix = 0;
    view.restartMeasuring();
  },

  fixLap() {
    let difference =
      this.ms -
      this.msAfterCurrentLapFix -
      (this.msAfterCurrentLapFix - this.msAfterPrevLapFix);

    view.addLap({
      count: ++this.countOfLaps,
      time: this.getTimeText(
        this.ms - this.msAfterCurrentLapFix,
        ':'
      ),
      difference: this.getTimeText(Math.abs(difference), ':'),
      differenceSign: difference < 0 ? '-' : '+'
    });
    this.msAfterPrevLapFix = this.msAfterCurrentLapFix;
    this.msAfterCurrentLapFix = this.ms;
  },

  setTime() {
    this.ms++;
    view.setTime(this.getTimeText());
  },

  getTimeText(ms = this.ms, separator = ' : ') {
    const capitalizeFirst = word =>
      word[0].toUpperCase() + word.slice(1);

    return this.timeList
      .map(timeName => this['get' + capitalizeFirst(timeName)](ms))
      .map(time => (time <= 9 ? `0${time}` : time))
      .join(separator);
  },

  getMinutes(ms = this.ms) {
    return Math.floor((ms / 10 / 60) % 60);
  },

  getSeconds(ms = this.ms) {
    return Math.floor((ms / 10) % 60);
  },

  getMilliseconds(ms = this.ms) {
    return ms % 10;
  }
};
