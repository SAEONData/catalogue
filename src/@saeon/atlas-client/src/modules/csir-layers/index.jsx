import React from 'react'
import Esri from '../esri'
import layers from './layers'
import { ATLAS_API_ADDRESS } from '../../config'

const PROXY_ADDRESS = `${ATLAS_API_ADDRESS}/proxy/csir`

export default () => (
  <Esri
    servicesAddress="https://pta-gis-2-web1.csir.co.za/server2/rest/services"
    layers={layers}
    proxy={PROXY_ADDRESS}
  />
)
