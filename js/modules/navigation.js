export const initNavigation = () => {
  const header = document.querySelector('.header')
  const menuIcon = document.querySelector('.menu__icon')
  const menuList = document.querySelector('.menu__list')
  const body = document.body

  if (!menuIcon || !menuList || !header) return

  const isMobileMedia = window.matchMedia('(max-width: 768px)')
  let isMenuOpen = false

  // Оптимізація скролу
  let scrollTimeout
  const handleScroll = () => {
    if (scrollTimeout) return
    scrollTimeout = requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 50)
      scrollTimeout = null
    })
  }

  const toggleMenu = shouldOpen => {
    isMenuOpen = typeof shouldOpen === 'boolean' ? shouldOpen : !isMenuOpen

    menuIcon.classList.toggle('active', isMenuOpen)
    menuList.classList.toggle('active', isMenuOpen)
    body.classList.toggle('lock', isMenuOpen)
    menuIcon.setAttribute('aria-expanded', isMenuOpen.toString())
  }

  const closeMenu = () => toggleMenu(false)

  const handleMediaChange = e => {
    if (!e.matches && isMenuOpen) closeMenu()
  }

  const initEventListeners = () => {
    menuIcon.addEventListener('click', e => {
      e.stopPropagation()
      toggleMenu()
    })

    menuList.addEventListener('click', e => {
      if (e.target.closest('.menu__link') && isMobileMedia.matches) closeMenu()
    })

    document.addEventListener('click', e => {
      if (isMenuOpen && !header.contains(e.target)) closeMenu()
    })

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu()
    })

    isMobileMedia.addEventListener('change', handleMediaChange)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }

  initEventListeners()

  return () => {
    window.removeEventListener('scroll', handleScroll)
    isMobileMedia.removeEventListener('change', handleMediaChange)
  }
}
