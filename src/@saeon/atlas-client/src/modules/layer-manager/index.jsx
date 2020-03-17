import React, { Component } from 'react'
import {
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore,
  DragIndicator,
  Info as InfoIcon,
  VpnKey
} from '@material-ui/icons'
import {
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Collapse,
  Slider,
  Button,
  Grid
} from '@material-ui/core'
import { MenuContext } from '../menu-provider'
import { Form, DragAndDrop, DragMenu } from '../../components'
import { debounce } from '../../../../fns-lib'

const headerButtonProps = {
  color: 'inherit',
  size: 'small'
}

const layerButtonStyle = {
  width: '100%'
}

export default class extends Component {
  state = {
    disableDrag: false
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { state } = this
    const { proxy } = this.props
    return (
      <MenuContext.Consumer>
        {({ addMenu, removeMenu, addedMenus }) => (
          <>
            {proxy.getLayers().getArray().length > 0 ? (
              <DragAndDrop
                items={proxy.getLayers().getArray()}
                reorderItems={result => {
                  if (!result.destination) return
                  const from = result.source.index
                  const to = result.destination.index
                  proxy.reorderLayers(from, to)
                }}
                listStyle={() => ({
                  padding: 8
                })}
                itemStyle={(isDragging, draggableStyle) => ({
                  userSelect: 'none',
                  margin: `0 0 4px 0`,
                  background: isDragging ? 'lightgrey' : 'transparent',
                  ...draggableStyle
                })}
              >
                {(items, makeDraggable) =>
                  items.map((layer, i) =>
                    // A single layer item
                    makeDraggable(
                      <Card
                        style={{
                          background: 'transparent',
                          borderRadius: 'unset',
                          border: 'none'
                        }}
                        variant="outlined"
                      >
                        {/* Layer item header */}
                        <CardHeader
                          component={({ children }) => (
                            <AppBar position="relative" variant="outlined">
                              <Toolbar
                                style={{ paddingRight: 0, paddingLeft: 0 }}
                                className="thin-toolbar"
                              >
                                {/* Drag icon */}
                                <DragIndicator style={{ marginRight: 10 }} />

                                {/* Title (comes from CardHeader.title prop) */}
                                {children}

                                {/* Epand layer info button */}
                                <IconButton
                                  {...headerButtonProps}
                                  onClick={() =>
                                    this.setState({
                                      [layer.get('id')]: state[layer.get('id')] ? false : true
                                    })
                                  }
                                  aria-label="expand-item-card"
                                >
                                  {state[layer.get('id')] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>

                                {/* Toggle layer visibility icon */}
                                <IconButton
                                  {...headerButtonProps}
                                  onClick={() => layer.setVisible(!layer.get('visible'))}
                                  aria-label="toggle-visibility"
                                >
                                  {layer.get('visible') ? <Visibility /> : <VisibilityOff />}
                                </IconButton>

                                {/* Delete layer icon */}
                                <IconButton
                                  {...headerButtonProps}
                                  onClick={() => proxy.removeLayer(layer)}
                                  aria-label="delete-layer"
                                  style={{ marginRight: 10 }}
                                >
                                  <Delete />
                                </IconButton>
                              </Toolbar>
                            </AppBar>
                          )}
                          title={
                            <Typography style={{ wordBreak: 'break-word' }} variant="caption">
                              {layer.get('id')}
                            </Typography>
                          }
                        />
                        <Collapse in={state[layer.get('id')]} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Grid container spacing={3}>
                              <Grid item xs={6}>
                                <Button
                                  style={layerButtonStyle}
                                  variant="outlined"
                                  startIcon={<VpnKey />}
                                  size="small"
                                  onClick={() => {
                                    if (addedMenus[`${layer.get('id')}-legend`]) {
                                      removeMenu(`${layer.get('id')}-legend`)
                                    } else {
                                      addMenu({
                                        id: `${layer.get('id')}-legend`,
                                        Component: i => (
                                          <DragMenu
                                            key={i}
                                            onMouseDown={() => console.log('todo')}
                                            zIndex={99}
                                            defaultPosition={{ x: 650, y: 25 }}
                                            width={200}
                                            title={'Legend'}
                                            active={true}
                                            close={() => removeMenu(`${layer.get('id')}-legend`)}
                                          >
                                            <Typography>{layer.get('id').truncate(50)}</Typography>
                                          </DragMenu>
                                        )
                                      })
                                    }
                                  }}
                                >
                                  Legend
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  style={layerButtonStyle}
                                  variant="outlined"
                                  startIcon={<InfoIcon />}
                                  size="small"
                                  onClick={() => {
                                    if (addedMenus[`${layer.get('id')}-info`]) {
                                      removeMenu(`${layer.get('id')}-info`)
                                    } else {
                                      addMenu({
                                        id: `${layer.get('id')}-info`,
                                        Component: i => (
                                          <DragMenu
                                            key={i}
                                            onMouseDown={() => console.log('todo')}
                                            zIndex={99}
                                            defaultPosition={{ x: 650, y: 25 }}
                                            width={200}
                                            title={'Layer info'}
                                            active={true}
                                            close={() => removeMenu(`${layer.get('id')}-info`)}
                                          >
                                            <Typography>{layer.get('id').truncate(50)}</Typography>
                                          </DragMenu>
                                        )
                                      })
                                    }
                                  }}
                                >
                                  Info
                                </Button>
                              </Grid>
                            </Grid>

                            <Form value={layer.get('opacity') * 100}>
                              {({ updateForm, value }) => (
                                <div style={{ margin: '5px 0', paddingRight: 5, width: '100%' }}>
                                  <Typography style={{ display: 'table-cell', paddingRight: 20 }}>
                                    Opacity
                                  </Typography>
                                  <Slider
                                    style={{ display: 'table-cell' }}
                                    onMouseEnter={() => this.setState({ disableDrag: true })}
                                    onMouseLeave={() => this.setState({ disableDrag: false })}
                                    defaultValue={50}
                                    getAriaValueText={() => parseInt(value, 10)}
                                    value={value}
                                    onChange={(e, v) =>
                                      updateForm(
                                        { value: v },
                                        debounce(() => layer.setOpacity(v / 100))
                                      )
                                    }
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={0.00001}
                                    marks={false}
                                    min={1}
                                    max={100}
                                    valueLabelDisplay="off"
                                  />
                                </div>
                              )}
                            </Form>
                          </CardContent>
                        </Collapse>
                      </Card>,
                      i,
                      this.state.disableDrag
                    )
                  )
                }
              </DragAndDrop>
            ) : (
              'No map layers'
            )}
          </>
        )}
      </MenuContext.Consumer>
    )
  }
}