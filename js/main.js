import { initNavigation } from './modules/navigation.js'
import { initModals } from './modules/modal.js'
import { initAnimations } from './modules/animations.js'
import { initReviews } from './modules/reviews.js'
import { initLanguage } from './modules/language.js'
document.addEventListener('DOMContentLoaded', () => {
  initNavigation()
  initModals()
  initAnimations()
  initReviews()
  initLanguage()
})
