import { view } from './stopwatchView.js';

export const model = {
  timeList: ['minutes', 'seconds', 'milliseconds'],
  second: 1000,
  countOfLaps: 0,
  milliseconds: 0,
  millisecondsAfterLapFix: 0,

  startMeasuring() {
    // view.animate('start');
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
    this.milliseconds = 0;
    view.restartMeasuring();
  },

  fixLap() {
    view.addLap({
      count: ++this.countOfLaps
    });
    this.millisecondsAfterLapFix = this.milliseconds;
  },

  setTime() {
    this.milliseconds++;

    for (const timeName of this.timeList) {
      const capitalizeFirst = word =>
        word[0].toUpperCase() + word.slice(1);

      let time = this['get' + capitalizeFirst(timeName)]();
      view.setTimeToCell(timeName, time);
    }
  },

  getTimeText(time) {},

  getMinutes(milliseconds = this.milliseconds) {
    return Math.floor((milliseconds / 10 / 60) % 60);
  },

  getSeconds(milliseconds = this.milliseconds) {
    return Math.floor((milliseconds / 10) % 60);
  },

  getMilliseconds(milliseconds = this.milliseconds) {
    return milliseconds % 10;
  }

  // setTime() {
  //   const timeDifference = this.getTimeDifference();

  //   for (const timeName of this.timeList) {
  //     const capitalizeFirst = word =>
  //       word[0].toUpperCase() + word.slice(1);

  //     let time =
  //       this['get' + capitalizeFirst(timeName)](timeDifference);
  //     view.setTimeToCell(timeName, time);
  //   }
  // },

  // getTimeDifference() {
  //   console.log(this.timeAfterResume, this.timeAfterStop);
  //   return (
  //     Date.now() -
  //     this.time -
  //     ((this.timeAfterResume || 0) - (this.timeAfterStop || 0))
  //   );
  // },

  // getMinutes(timestamp) {
  //   return Math.floor((timestamp / 1000 / 60) % 60);
  // },

  // getSeconds(timestamp) {
  //   return Math.floor((timestamp / 1000) % 60);
  // },

  // getMilliseconds(timestamp) {
  //   return Math.round((timestamp % 1000) / 100);
  // }
};
