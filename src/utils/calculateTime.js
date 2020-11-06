export function getDaysHoursMinFromMin(time) {
    let days = getDaysFromMinutes(time)
    time = time - (days * 60 * 24)
    let hours = getHoursFromMinutes(time)
    let minutes = time - (hours * 60)
    return days + " days " + hours + ' hours ' + minutes + " min";
}


export function getDaysHoursMinFroSec(time) {
    let days = getDaysFromSeconds(time)
    time = time - (days * 60 * 60 * 24)
    let hours = getHoursFromSeconds(time)
    let minutes = getMinFromSeconds(time - (hours * 60 * 60))
    return days + " days " + hours + ' hours ' + minutes + " min";
}

export function getSecondsFromDdHhMm(dd, hh, mm){
    let ddInS = dd * 24 * 60 * 60
    let hhInS = hh * 60 * 60
    let mmInS = mm * 60
    return ddInS + hhInS + mmInS
}

export function getDaysFromMinutes(minutes) {
    return Math.floor(minutes / 24 / 60)
}

export function getHoursFromMinutes(minutes) {
    return Math.floor(minutes / 60) % 60
}

export function getDaysFromSeconds(sec) {
    return Math.floor(sec / 24 / 60 / 60)
}

export function getHoursFromSeconds(sec) {
    return Math.floor(sec / 60 / 60) % 60
}
export function getMinFromSeconds(sec) {
    return Math.floor(sec / 60 ) % 60
}