import api from "../services/api"
import { Image } from "./Images"

export interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Image[]
}


const index = async (): Promise<Orphanages[]> => {
  try {
    const response = await api.get('orphanages')
    return response.data
  } catch(err) {
    throw err
  }
}

const show = async (id: string): Promise<Orphanages> => {
  try {
    const response = await api.get(`orphanages/${id}`)
    return response.data
  } catch(err) {
    throw err
  }
}

const create = async (orphanage: FormData): Promise<void> => {
  try {
    const response = await api.post('orphanages', orphanage)
    return response.data
  } catch(err) {
    throw err
  }
}

export default {
  index,
  show,
  create
}