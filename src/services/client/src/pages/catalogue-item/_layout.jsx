import React from 'react'
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Chip,
  CardHeader,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import useStyles from './style'
import GetAppIcon from '@material-ui/icons/GetApp'
import { Link as SimpleLink, CitationDialog, DataDownloadButton } from '../../components'
/**TO DO:
 * Figure out what sasdi.net -> Related Resources -> Data: Preview is equivalent to. json.linkedResources is similar but not the same
 * remove div from bottom of page and size container better
 * verify if SANS 1878 card at bottom of metaview should stay. its hardcorded currently because the values arent in metadata
 * citation-dialog styling is currently inline. Move it to style.js
 * add error handling to citation.js. Check if value exists before adding it to strings 
 * citation dialog transition animation to resizing (flex grow) [recommend to not use material-ui transition but react-transition-group package]
 * transition guides:
 * http://reactcommunity.org/react-transition-group/css-transition
 * https://alligator.io/react/react-transition-group/
 * https://css-tricks.com/using-css-transitions-auto-dimensions/
 * https://material-ui.com/components/transitions/#grow
 *  Bug Fixes:
 * bottom of scrollbar is behind footer
 *  
 * http://localhost:3001/catalogue/c770a2bfa4108b82725ae1174bf881cd
 * http://www.sasdi.net/metaview.aspx?uuid=c770a2bfa4108b82725ae1174bf881cd#downloads
 * http://www.sasdi.net/metaview.aspx?uuid=1d9fa3fd257fea3ec81b5bc6c8fde61f# citations work here

 */

const formatText = text => {
  return (text = text.replace(/([A-Z])/g, ' $1').trim())
}
export default ({ json, id }) => {
  const history = useHistory()
  const classes = useStyles()
  const gridItemSize = 10
  if (!id || !json) {
    return 'ID not found'
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ marginTop: 10, marginBottom: 20 }}
        item
        xs={12}
        justify="flex-end"
      >
        {/* CITATTION */}
        <Grid item>
          <CitationDialog json={json} />
        </Grid>

        {/* METADATA Download */}
        <Grid item>
          <SimpleLink
            uri={'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))}
            download={`metadata_${id}.json`}
          >
            <Tooltip title="Download this page in JSON format">
              <Button
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
                disableElevation
              >
                Metadata
              </Button>
            </Tooltip>
          </SimpleLink>
        </Grid>

        {/* DATA DOWNLOAD */}
        <Grid item>
          <DataDownloadButton
            disableElevation
            variant="contained"
            color="primary"
            immutableResource={json.immutableResource}
          >
            Download Data
          </DataDownloadButton>
        </Grid>
      </Grid>

      <Grid
        container
        // direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.grid}
      >
        {/* OVERVIEW */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardHeader
              style={{ textAlign: 'center' }}
              disableTypography
              title={
                <Typography style={{ margin: 'auto' }} gutterBottom variant="h4">
                  {json.titles?.[0].title}
                </Typography>
              }
              action={json.rightsList?.map((rl, i) => (
                <SimpleLink key={`rights-list-right${i}`} uri={rl.rightsURI}>
                  <Tooltip title={rl.rights}>
                    <img src="https://licensebuttons.net/l/by/4.0/88x31.png" />
                  </Tooltip>
                </SimpleLink>
              ))}
            />
            <CardContent>
              <Typography variant="h6">Author</Typography>

              {json.creators?.map(creator => (
                <div key={creator.name}>
                  <Typography variant="body2">
                    {creator.name}
                    <br />
                    {creator.affiliations.map(aff => aff.affiliation)}
                  </Typography>
                </div>
              ))}
              <br />

              <Typography variant="h6">Publisher </Typography>
              <Typography variant="body2">
                {`${json.publisher} : ${json.publicationYear}`}
              </Typography>
              <br />
              <Typography variant="h6">Resources </Typography>
              {json.linkedResources?.map((lr, i) => (
                <div key={`linked-resource${i}`}>
                  <Typography variant="body2">
                    {lr.resourceDescription}
                    <b>
                      <em> ({lr.linkedResourceType})</em>
                    </b>
                  </Typography>
                  <SimpleLink uri={lr.resourceURL} />
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* CONTRIBUTORS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contributors
              </Typography>
              {json.contributors?.map(contributor => (
                <div key={contributor.name}>
                  <Typography variant="h6">{formatText(contributor.contributorType)}</Typography>
                  <Typography variant="body2">
                    {contributor.name}
                    <br />
                    {contributor.affiliations.map(aff => aff.affiliation)}
                  </Typography>
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* KEYWORDS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Keywords
              </Typography>
              <Grid container spacing={1} justify="flex-start">
                {json.subjects
                  .slice(0)
                  .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
                  .map(subject => (
                    <Grid item key={subject.subject}>
                      <Chip
                        size="small"
                        clickable
                        icon={<SearchIcon />}
                        onClick={() => history.push(`/catalogue?terms=${subject.subject}`)}
                        label={subject.subject.toUpperCase()}
                      />
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* ABSTRACT */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Abstract
              </Typography>
              <Typography variant="body2">
                {json.descriptions.map(desc =>
                  desc.descriptionType === 'Abstract' ? desc.description : undefined
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* IDENTIFIERS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Identifiers
              </Typography>
              <Typography variant="h6"> Local</Typography>
              {json.alternateIdentifiers.map(ai => (
                <div key={ai.alternateIdentifier}>
                  <Typography variant="body2">
                    {ai.alternateIdentifier}
                    <br />
                  </Typography>
                </div>
              ))}
              <br />
              <Typography variant="h6">Identifier Type</Typography>
              <Typography variant="body2">{json.identifier.identifierType}</Typography>
              <br />
              <Typography variant="h6">Identifier</Typography>
              <Typography variant="body2">{json.identifier.identifier}</Typography>
              <br />
              <Typography variant="h6">URI</Typography>
              {json.alternateIdentifiers.map(alt => (
                <div key={alt.alternateIdentifier}>
                  <SimpleLink
                    uri={`http://www.sasdi.net/metaview.aspx?uuid=${alt.alternateIdentifier}`}
                  />
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* SANS 1878? */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                SANS 1878
              </Typography>
              <Typography variant="body2">In development</Typography>
            </CardContent>
          </Card>
        </Grid>
        <div style={{ height: '200px', width: '100%' }} />
      </Grid>
    </>
  )
}
