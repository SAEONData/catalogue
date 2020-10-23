import multiMatch from './_multi-match.js'
import geoShape from './_geo-shape.js'
import termsQuery from './_terms.js'
import doisQuery from './_dois.js'
import idsQuery from './_ids.js'
import min_score from './_min-score.js'

export default ({ dsl, ids, dois, text, terms, extent, isAggregation = false }) => {
  if (isAggregation) {
    if (extent || terms?.length || text || ids?.length || dois?.length) {
      dsl.query = {
        bool: {
          must: [],
          filter: [],
        },
      }
    }
  }

  if (terms?.length || text) {
    dsl.min_score = min_score
  }

  if (ids && ids.length) {
    dsl.query.bool.filter = [idsQuery(ids)]
  } else if (dois && dois.length) {
    dsl.query.bool.filter = [doisQuery(dois)]
  } else {
    if (text) {
      dsl.query.bool.must = [...dsl.query.bool.must, multiMatch(text.toLowerCase())]
    }
    if (terms?.length) {
      dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
      dsl.query.bool.filter = [...dsl.query.bool.filter, ...termsQuery(terms)]
    }
    if (extent) {
      dsl.query.bool.must = [...dsl.query.bool.must, geoShape(extent)]
      dsl.query.bool.filter = [...dsl.query.bool.filter, geoShape(extent)]
    }
  }

  return dsl
}
