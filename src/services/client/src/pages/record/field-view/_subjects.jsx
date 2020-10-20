import { useContext } from 'react'
import Row from '../_row'
import { Grid, Chip } from '@material-ui/core'
import { GlobalContext } from '../../../contexts/global'
import { useHistory } from 'react-router-dom'

export default ({ subjects }) => {
  const { setGlobal } = useContext(GlobalContext)
  const history = useHistory()
  return (
    <Row title="Keywords">
      <Grid container spacing={1} justify="flex-start">
        {subjects
          .slice(0)
          .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
          .map(subject => (
            <Grid item key={subject.subject}>
              <Chip
                size="small"
                color="primary"
                clickable
                onClick={() => {
                  setGlobal(
                    {
                      terms: [
                        {
                          field: 'subjects.subject.raw',
                          value: subject.subject.toLowerCase().trim(),
                        },
                      ],
                    },
                    true
                  )
                  history.push('/records')
                }}
                label={subject.subject.toUpperCase()}
              />
            </Grid>
          ))}
      </Grid>
    </Row>
  )
}