;(function () {
  "use strict";

  // Mobile navbar hooks
  on('.navbar-toggle',   'click', toggleNavbar)
  on('#js-close-navbar', 'click', toggleNavbar)
  on('.full-nav a',      'click', toggleNavbar)

  // Subscribe form
  on('form', 'submit', function(event) {
    var form = this
    var formData = new FormData(form)
    var url = form.action + '&EMAIL='  + formData.get('email')
    var notice = form.querySelector('.js-submit-notice')

    notice.innerHTML = 'Sending...'

    http({
      url: url,
      method: 'GET',
      success: function(response) {
        window.location.href = '/thankyou?email=' + formData.get('email')
      },
      error: function() {
        notice.innerHTML = 'We seem to be having problems subscribing you to the newsletter, please try again later.'

        setTimeout(function() { notice.innerHTML = ''}, 2200)
      }
    })

    event.preventDefault()
  })

  // Main embeded video
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

  if (typeof Siema !== 'undefined') {
    // Slider
    var slider = new Siema({
      selector: '#js-blog-carousel',
      perPage: {
        800: 2,
        1240: 3
      },
      loop: true
    })

    var prevArrow = document.createElement('div')
    var nextArrow = document.createElement('div')
    prevArrow.className = 'arrow prev'
    nextArrow.className = 'arrow next'

    slider.selector.appendChild(prevArrow)
    slider.selector.appendChild(nextArrow)

    on(prevArrow, 'click', function() {
      slider.prev()
    })
    on(nextArrow, 'click', function() {
      slider.next()
    })
  }


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
    var elements = typeof selector === 'string'
    ? Array.prototype.slice.call(document.querySelectorAll(selector))
    : [ selector ] // asume DOM element

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(type, event, true)
    }
  }

  function getById(id) {
    return document.getElementById(id)
  }

  function http(options, success) {
    var xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function(result) {
      if (xmlhttp.readyState === 4) {
        if(xmlhttp.status >= 400) {
          options.error && options.error(xmlhttp.responseText, xmlhttp)
        } else {
          options.success && options.success(xmlhttp.responseText, xmlhttp)
        }
      }
    }

    xmlhttp.open(options.method, options.url, true)

    if (options.headers) {
      for(var header in options.headers) {
        xmlhttp.setRequestHeader(header, options.headers[header])
      }
    }

    var data = options.formData || JSON.stringify(options.data || null)
    xmlhttp.send(data)
  }

})()
