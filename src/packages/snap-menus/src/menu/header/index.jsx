import CloseIcon from 'mdi-react/CloseIcon'
import MinimizeIcon from 'mdi-react/WindowMinimizeIcon'
import MaximizeIcon from 'mdi-react/WindowMaximizeIcon'
import CardContent from '@material-ui/core/CardContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'

export default ({ draggable, state, title, onMinify, disableMinify, onClose }) => {
  return (
    <CardContent style={{ padding: 0 }}>
      <AppBar position="relative" variant="outlined">
        <Toolbar
          style={{ cursor: draggable ? 'grab' : 'default', minHeight: '25px' }}
          disableGutters
          className={clsx({
            'drag-handle': draggable ? true : false,
          })}
        >
          {/* TITLE */}
          <Typography
            style={Object.assign(
              { margin: 'auto', fontSize: '0.7em' },
              state.minimized ? { display: 'none' } : {}
            )}
            variant="overline"
          >
            {title}
          </Typography>

          <div style={{ position: 'absolute', right: 0 }}>
            {/* MINIFY */}
            <IconButton
              onTouchStart={onMinify}
              onClick={onMinify}
              edge="start"
              color="inherit"
              style={
                (Object.assign({
                  order: 2,
                  marginLeft: 'auto',
                  padding: 2,
                }),
                disableMinify ? { display: 'none' } : {})
              }
              size="small"
              aria-label="close"
            >
              {state.minimized && <MaximizeIcon size="20" />}
              {!state.minimized && <MinimizeIcon size="20" />}
            </IconButton>

            {/* CLOSE */}
            <IconButton
              onTouchStart={onClose}
              onClick={() => onClose()}
              edge="start"
              color="inherit"
              style={Object.assign(
                {
                  order: 2,
                  marginLeft: 'auto',
                  padding: 2,
                },
                onClose ? {} : { display: 'none' }
              )}
              aria-label="close"
              size="small"
            >
              <CloseIcon size="20" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </CardContent>
  )
}
