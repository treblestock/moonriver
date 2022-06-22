// burger
document.body.addEventListener('click', burgerHandler)

function burgerHandler(event) {
  const target = event.target.closest('.burger')
  const header = document.querySelector('#header')
  if (!target) return 

  target.classList.toggle('_active')
  header.classList.toggle('_active')
  header.querySelector('.header-dropdown__section').classList.toggle('_active')
}

// slider
const sliders = document.querySelectorAll('.slider')
const sliderContentClassName = 'socials-slider__content'
const sliderBtnClassName = 'socials-slider__btn'
const sliderPaginationClassName = 'socials-slider__pagination-item'

for (const slider of sliders) {  
  let activeIndex = 0
  slider.addEventListener('click', (event) => {
    const target = event.target.closest(`[class*="${sliderBtnClassName}"], [class*=${sliderPaginationClassName}]`)
    console.log(target)
    if (!target.classList.contains(sliderBtnClassName) 
        && !target.classList.contains(sliderPaginationClassName) ) return
    const sliderPaginations = [...slider.querySelectorAll('.' + sliderPaginationClassName)]
    const slides = slider.querySelector('.' + sliderContentClassName)
    // const stepWidth = window.getComputedStyle(slides).width
    const stepWidth = '380px'


    activeIndex = getNewActiveIndex(target, activeIndex, sliderPaginations.length)    

    ;[...slider.querySelectorAll('._active')].forEach(item => item.classList.remove('_active') )
    shiftSlides(stepWidth, slides, activeIndex)
    sliderPaginations[activeIndex].classList.add('_active')
  })
}



function shiftSlides(stepWidth, slides, activeIndex) {
  slides.style.transform = `translateX(-${Number.parseFloat(stepWidth) * activeIndex}px)`
}

function getNewActiveIndex(target, activeIndex, itemsCount) {
  if (target.classList.contains(sliderBtnClassName) ) {
    return target.className.includes('next') 
    ? (activeIndex + 1) % itemsCount 
    : activeIndex - 1 < 0
      ? itemsCount - 1
      : activeIndex - 1
  }
  return [...target.parentElement.children].indexOf(target) 
    // a weak place: if there is a wrapper for paggination-item 
    // (for example we use pictures as pagination-items)
    // we will always have 0, so we should find paggination-container exactly

}


// tabs
const tabs = [...document.querySelectorAll('.tabs')]
const contentClass = 'header-dropdown-tabs__content'
const contentItemClass = 'header-dropdown-tabs__content-item'
const insetClass = 'header-dropdown-tabs__inset'

for (const tab of tabs) {
  // let activeTabIndex = 0
  tab.addEventListener('click', (event) => {
    const target = event.target.closest(`[class*=${insetClass}]`)
    if (!target.className.includes(insetClass) || target.classList.contains('_active') ) return
    
    const insets = [...target.parentElement.children]
    const contents = [...tab.querySelectorAll('.' + contentItemClass)]
    const ind = insets.findIndex(el => el == target )
    
    console.log(target)
    console.log(ind)
    console.log(contents)
    insets.forEach(inset => inset.classList.remove('_active') )
    contents.forEach(content => content.classList.remove('_active') )
  
    target.classList.add('_active')
    contents[ind].classList.add('_active')
  })  
}

