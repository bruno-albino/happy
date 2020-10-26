import Orphanage from "../models/Orphanages"
import images_view from "./images_view"

export default {
  render(orphanage: Orphanage) {
    return {
      ...orphanage,
      images: images_view.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}