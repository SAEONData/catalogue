import { parse, isMatch, lastDayOfYear } from 'date-fns'

const _parse = (id, dt) => {
  // 2020-08-27
  if (isMatch(dt, 'yyyy-MM-dd')) {
    return parse(dt, 'yyyy-MM-dd', new Date())
  }

  // 2020-08-05T00:00:00+02:00
  if (isMatch(dt, "yyyy-MM-dd'T'HH:mm:ssxxxxx")) {
    return parse(dt, "yyyy-MM-dd'T'HH:mm:ssxxxxx", new Date())
  }

  throw new Error(id, 'Unexpected date format from ODP', JSON.stringify(dt))
}

export default (id, dates) =>
  dates.map(({ date, dateType }) => {
    const dateStrings = date.split('/')
    const from = dateStrings[0]
    const to = dateStrings[1] || dateStrings[0]

    const gte = _parse(id, from)
    const lte = _parse(id, to)

    return {
      gte: gte.toISOString(),
      lte: to === from ? lastDayOfYear(lte).toISOString() : lte.toISOString(),
      dateType,
    }
  })
