import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import useStyles from '../../../style'
import clsx from 'clsx'
import CreateChartButton from './_create-chart-button'

export default ({ charts, activeTabIndex, setActiveTabIndex }) => {
  const classes = useStyles()

  return (
    <Fade in={true} key={'charts-in'}>
      <div style={{ display: 'flex' }}>
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
        {/* ADD CHART TAB BUTTON */}
        <div style={{ alignSelf: 'center' }}>
          <CreateChartButton />
        </div>
      </div>
    </Fade>
  )
}