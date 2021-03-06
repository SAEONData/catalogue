import { useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { context as databookContext } from '../../../contexts/databook-provider'
import { context as filtersContext } from '../../../contexts/filters-provider'
import HeaderControls from './header-controls'
import Filter from './filter'
import Fade from '@material-ui/core/Fade'
import useLocalStorage from '../../../../../hooks/use-localstorage'

export default forwardRef((props, ref) => {
  const { id } = useContext(databookContext)
  const filters = useContext(filtersContext)
  const [activeTabIndex, setActiveTabIndex] = useLocalStorage(
    `${id}-resource-builder-filters-tabs-index`,
    filters.length > 0 ? filters.length - 1 : 0
  )

  return (
    <>
      {ref &&
        createPortal(
          <Fade key="filters-instances" unmountOnExit mountOnEnter={false} in={Boolean(ref)}>
            <span>
              <HeaderControls
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
              />
            </span>
          </Fade>,
          ref
        )}
      {filters.map((filter, i) => {
        return (
          <Fade in={activeTabIndex === i} unmountOnExit mountOnEnter={false} key={filter.id}>
            <div style={{ height: '100%' }} role="tabpanel" hidden={activeTabIndex !== i}>
              {activeTabIndex === i && (
                <Filter
                  activeTabIndex={activeTabIndex}
                  setActiveTabIndex={setActiveTabIndex}
                  filter={filter}
                />
              )}
            </div>
          </Fade>
        )
      })}
    </>
  )
})
