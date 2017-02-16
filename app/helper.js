export const random = n => Math.floor(Math.random() * n)

export const shuffle = a => {
    let i = a.length, tmp, j
    while (i !== 0) {
        j = random(i)
        i -= 1
        tmp = a[i]
        a[i] = a[j]
        a[j] = tmp
    }
    return a
}

export const range = n => {
    return Array(n).fill().map((x,i) => i)
}

export const array = (n, func) => {
    return Array(n).fill().map(x => func())
}
