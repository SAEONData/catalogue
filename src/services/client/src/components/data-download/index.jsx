import { useState } from 'react'
import {
  Tooltip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import DownloadIcon from 'mdi-react/DownloadIcon'
import SimpleLink from '../link'
import { CATALOGUE_API_ADDRESS } from '../../config'

const PLACEHOLDER_URI = 'http://nothing.com'

export default ({
  immutableResource,
  children,
  size = 22,
  IconButtonSize = 'medium',
  tooltipPlacement,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || PLACEHOLDER_URI).protocol === 'http:'
      ? `${CATALOGUE_API_ADDRESS}/download-proxy?uri=${resourceDownload?.downloadURL}`
      : resourceDownload?.downloadURL

  if (!resourceDownload?.downloadURL) {
    return null
  }

  return (
    <>
      <Tooltip
        placement={tooltipPlacement || 'bottom'}
        title={
          `${resourceDescription || 'Unknown resource'} (${downloadURL?.replace(/.*\./, '')})` ||
          'Unknown download'
        }
      >
        <span>
          {children ? (
            <Button onClick={() => setOpen(!open)} {...props} startIcon={<DownloadIcon />}>
              {children}
            </Button>
          ) : (
            <IconButton
              onClick={() => setOpen(!open)}
              disabled={downloadURL === PLACEHOLDER_URI}
              size={IconButtonSize}
              {...props}
            >
              <DownloadIcon size={size} />
            </IconButton>
          )}
        </span>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textAlign: 'center' }}>Terms of use</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            These data are made available with the express understanding that any such use will
            properly acknowledge the originator(s) and publisher and cite the associated Digital
            Object Identifiers (DOIs). Anyone wishing to use these data should properly cite and
            attribute the data providers listed as authors in the metadata provided with each
            dataset. It is expected that all the conditions of the data license will be strictly
            honoured. Use of any material herein should be properly cited using the dataset&apos;s
            DOIs. SAEON cannot be held responsible for the quality of data provided by third
            parties, and while we take reasonable care in referencing these datasets, the content of
            both metadata and data is under control of the third-party provider.
          </Typography>
        </DialogContent>
        <DialogActions>
          <SimpleLink
            download={resourceDescription || 'Unknown resource'}
            style={{ display: 'block' }}
            uri={downloadURL}
          >
            <Typography variant="overline" style={{ margin: theme.spacing(2) }}>
              I AGREE
            </Typography>
          </SimpleLink>
        </DialogActions>
      </Dialog>
    </>
  )
}
