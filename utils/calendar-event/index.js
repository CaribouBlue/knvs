import uuid from 'uuid/v4'

class CalendarEvent {
  constructor(config) {
    this.id = uuid()
    this.title = config.title
    this.desc = config.desc
    this.date = null
    this._startTime = null
    this._endTime = null
    this.isAllDay = config.isAllDay
    this.height = 24

    if (config.date) {
      this.date = new Date(config.date.toLocaleString())
    } else {
      this.date = new Date()
    }
    console.log(this.date.toLocaleString())
    this.startTime = this.generateTimeTuple(this.date)
  }

  generateTimeTuple(date) {
    return [date.getHours(), date.getMinutes()]
  }

  fixTimeTuple(timeTuple) {
    let [hrs, mins] = timeTuple
    if (mins >= 0 && hrs >= 0) {
      hrs = hrs % 24
      hrs += Math.floor(mins / 60)
      mins = mins % 60
      return [hrs, mins]
    } else if (mins < 0) {
      hrs -= Math.ceil(Math.abs(mins) / 60)
      mins = 60 + mins % 60
      return this.fixTimeTuple([hrs, mins])
    } else if (hrs < 0) {
      hrs += 23
      return this.fixTimeTuple([hrs, mins])
    }
  }

  convert24hrto12hr(timeTuple) {
    let [hrs, mins] = timeTuple
    let sec = 'am'
    if (hrs >= 12) sec = 'pm'
    if (hrs === 0) hrs = 12
    else if (hrs > 12) hrs = hrs % 12
    return [hrs, mins, sec]
  }

  generateTimeString(timeTuple, twelveHr=false) {
    let [hrs, mins] = timeTuple
    if (twelveHr) {
      let [hrs, mins, sec] = this.convert24hrto12hr(timeTuple)
      return `${hrs}:${(mins + '').padStart(2, '0')} ${sec}`
    } else {
      return `${hrs}:${(mins + '').padStart(2, '0')}`
    }
  }

  getLabel(twelve=false) {
    if (this.isAllDay)
      return this.title
    else {
      const timeStr = twelve ? this.startTimeStr12 : this.startTimeStr24
      return `${timeStr} | ${this.title}`
    }
  }

  set startTime(timeTuple) {
    if (!this.date) throw new Error('Set date before startTime')
    timeTuple = this.fixTimeTuple(timeTuple)
    this._startTime = new Date(this.date.toLocaleString())
    this._startTime.setHours(timeTuple[0])
    this._startTime.setMinutes(timeTuple[1])
    if (!this._endTime || this._startTime > this._endTime)
      this.endTime = [timeTuple[0], timeTuple[1] + 30]
  }

  get startTime() {
    return this.generateTimeTuple(this._startTime)
  }

  get startTimeStr12() {
    return this.generateTimeString(this.startTime, true)
  }

  get startTimeStr24() {
    return this.generateTimeString(this.startTime)
  }

  set endTime(timeTuple) {
    if (!this.date) throw new Error('Set date before endTime')
    timeTuple = this.fixTimeTuple(timeTuple)
    this._endTime = new Date(this.date.toLocaleString())
    this._endTime.setHours(timeTuple[0])
    this._endTime.setMinutes(timeTuple[1])
    if (!this._startTime || this._startTime > this._endTime)
      this.startTime = [timeTuple[0], timeTuple[1] - 30]
  }

  get endTime() {
    return this.generateTimeTuple(this._endTime)
  }

  get endTimeStr12() {
    return this.generateTimeString(this._endTime, true)
  }

  get endTimeStr24() {
    return this.generateTimeString(this._endTime)
  }

  get duration() {
    let mins = (this._endTime - this._startTime) / 60000
    const hrs = Math.floor(mins / 60)
    mins = mins % 60
    return [hrs, mins]
  }
}

export {
  CalendarEvent,
}
