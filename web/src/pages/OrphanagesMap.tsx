import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/pages/orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import orphanagesRepository, { Orphanages } from '../repositories/Orphanages'

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([])

  useEffect(() => {
    const loadOrphanages = async () => {
      const orphanages = await orphanagesRepository.index()
      setOrphanages(orphanages)
    }
    loadOrphanages()
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Campinas</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-22.9473732,-47.0875054]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
            icon={mapIcon}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
              {orphanage.name}
              <Link to={`orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color='#FFF' />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to='orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='FFF'/>
      </Link>
    </div>
  )
}

export default OrphanagesMap