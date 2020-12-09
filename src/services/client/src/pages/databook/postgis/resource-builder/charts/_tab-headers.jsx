import { Tabs, Tab, Avatar, Tooltip, Fade } from '@material-ui/core'
import useStyles from '../../../style'
import clsx from 'clsx'

export default ({ charts, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()

  return (
    <Fade in={true} key={'charts-in'}>
      <Tabs
        indicatorColor="primary"
        variant={charts.length > 5 ? 'scrollable' : 'standard'}
        value={activeTabIndex}
        onChange={(event, newValue) => setActiveTabIndex(newValue)}
      >
        {charts.map(({ id }, i) => (
          <Tab
            key={id}
            className={clsx(classes.tab)}
            label={
              <Tooltip title={`Chart ${id}`}>
                <Avatar className={clsx(classes.smallAvatar, classes.green)} variant="circular">
                  {i + 1}
                </Avatar>
              </Tooltip>
            }
            id={`tab-${id}`}
          />
        ))}
      </Tabs>
    </Fade>
  )
}