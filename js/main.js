;(function () {
  "use strict";

  // Mobile navbar hooks
  on('.navbar-toggle',   'click', toggleNavbar)
  on('#js-close-navbar', 'click', toggleNavbar)
  on('.full-nav a',      'click', toggleNavbar)

  on('form', 'submit', function(event) {
    var email = this.querySelector('[type="email"]').value
    window.open(this.action + '&MERGE0=' + email, '_blank')
    event.preventDefault()
  })

  on('#js-play-video', 'click', function(event) {
    var modal = picoModal({
      content: '<iframe class="embed wow fadeIn" width="560" height="315" src="https://www.youtube.com/embed/O6DUV19Ri_8?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
      closeHtml: '<i class="icon icon-close"></i>',
      closeStyles: {
        top: '10px', right: '-40px', position: 'absolute',
        padding: '5px 10px', background: 'transparent', cursor: 'pointer',
        outline: 'none', border: 'none'
      },
      modalClass: 'video-modal',
      modalStyles: {
        width: '',
        padding: '25px 0 45.25% 0',
        height: '0',
        borderRadius: '20px'
      }
    })
    .afterShow(function() {
      getById('js-background-video').pause()
    })
    .afterClose(function() {
      getById('js-background-video').play()
      modal.destroy()
    }).show()
  })

  // ---------------------------------------------------
  // Utils

  function toggleClass(el, className) {
    el.classList.toggle(className)
    return el
  }

  function toggleNavbar() {
    var navbarCollapse = document.querySelector('.navbar-collapse')
    var navbar = document.querySelector('.navbar')

    toggleClass(toggleClass(navbarCollapse, 'collapse'), 'expand')
    toggleClass(navbar, 'navbar-fixed-top')
    toggleClass(document.body, 'fixed-scroll-xs')
  }

  function on(selector, type, event) {
    var elements = Array.prototype.slice.call(
      document.querySelectorAll(selector)
    )

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(type, event, true)
    }
  }

  function getById(id) {
    return document.getElementById(id)
  }

})()
