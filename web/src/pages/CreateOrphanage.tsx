import React, { FormEvent, ChangeEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import '../styles/pages/create-orphanage.css';
import SideBar from '../components/SideBar'
import mapIcon from "../utils/mapIcon";
import orphanagesRepository from '../repositories/Orphanages'

export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [instructions, setInstructions] = useState('')
  const [about, setAbout] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>()
  const [previewImages, setPreviewImages] = useState<string[]>([])


  function handleMapClick(event: LeafletMouseEvent) {
    setPosition({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()    
    const { latitude, longitude } = position

    const formData = new FormData()
    formData.append('name', name)
    formData.append('about', about)
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))
    formData.append('instructions', instructions)
    formData.append('opening_hours', openingHours)
    formData.append('open_on_weekends', String(openOnWeekends))
    images?.forEach(image => formData.append('images', image))

    try {
      await orphanagesRepository.create(formData)
      alert('Cadastro realizado com sucesso !')
      history.push('/app')

    } catch(err) {
      console.log(err)
      alert('Ocorreu um erro ao salvar o orfanato')
    }
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return
    }
    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image))
    setPreviewImages(selectedImagesPreview)
  }

  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              { position.latitude !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} /> }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={e => setName(e.target.value)} id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea value={about} onChange={e => setAbout(e.target.value)} id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">
                {previewImages.map(image => (
                  <img src={image} alt={name} key={image}/>
                ))}
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple type="file" id='image[]' onChange={handleSelectImages}/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea value={instructions} onChange={e => setInstructions(e.target.value)}  id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input value={openingHours} onChange={e => setOpeningHours(e.target.value)} id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)} type="button" className={openOnWeekends ? 'active': ''}>Sim</button>
                <button onClick={() => setOpenOnWeekends(false)} type="button" className={!openOnWeekends ? 'active': ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
