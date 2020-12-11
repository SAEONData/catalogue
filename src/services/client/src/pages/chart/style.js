import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}))
