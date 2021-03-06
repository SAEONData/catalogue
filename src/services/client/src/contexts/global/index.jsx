import { createContext } from 'react'
import QuickForm from '@saeon/quick-form'
import getUriState from '../../lib/fns/get-uri-state'
import FromSavedSearch from './from-saved-search'

export const context = createContext()

/**
 * From URL query:
 * "search" indicates the ID of a saved search
 * "text" is the text value of search input
 * "referrer" is for tracking page source
 *
 * NOTE
 * referrer will be set once per app load,
 * navigating to other routes will NOT reset
 * referrer since this component will only be
 * rendered once!!
 *
 * Updating the global state actually results in
 * the QuickForm component rerendering. Might
 * have been better to split the component into
 * a parent and child, but works as expected.
 */
export default ({ children }) => {
  const { search, text = undefined, referrer = undefined } = getUriState()

  return (
    <FromSavedSearch id={search}>
      {search => (
        <QuickForm
          referrer={referrer}
          text={text || search?.text || undefined}
          extent={search?.extent || undefined}
          terms={search?.terms || []}
          ids={search?.ids || []}
          dois={search?.dois || []}
          selectedIds={search?.selectedIds || []}
        >
          {(setGlobal, global) => {
            return (
              <context.Provider
                value={{
                  global,
                  setGlobal: (obj, clearHistory = false, cb) => {
                    setGlobal(
                      Object.assign(
                        clearHistory
                          ? {
                              layers: [],
                              text: undefined,
                              extent: undefined,
                              terms: [],
                            }
                          : {},
                        obj
                      )
                    )
                    if (cb) cb()
                  },
                }}
              >
                {children}
              </context.Provider>
            )
          }}
        </QuickForm>
      )}
    </FromSavedSearch>
  )
}
