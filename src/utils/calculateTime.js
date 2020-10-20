export function getDaysHoursMinFromMin(time) {
    let days = getDaysFromMinutes(time)
    time = time - (days * 60 * 24)
    let hours = getHoursFromMinutes(time)
    let minutes = time - (hours * 60)
    return days + " days " + hours + ' hours ' + minutes + " min";
  }
  

export function getDaysFromMinutes(minutes){
    return Math.floor(minutes / 24 / 60)
}

export function getHoursFromMinutes(minutes){
    return Math.floor(minutes / 60) % 60
}