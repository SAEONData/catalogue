import Row from '../_row'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import DownloadButton from '../../../components/data-download'
import { isMobile } from 'react-device-detect'

export default ({ immutableResource }) => {
  const theme = useTheme()
  const { resourceDescription } = immutableResource

  return (
    <Row title={'Download'} style={{ position: 'relative' }}>
      <Typography variant="body2" component="h2">
        {resourceDescription || '(Missing resource description and/or download URI)'}
      </Typography>
      {!isMobile && (
        <span style={{ position: 'absolute', top: `calc(50% - 30px)`, right: theme.spacing(2) }}>
          <DownloadButton size={36} immutableResource={immutableResource} />
        </span>
      )}
    </Row>
  )
}