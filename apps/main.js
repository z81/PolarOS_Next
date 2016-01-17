import React from 'react'
import ReactDOM from 'react-dom'
import Channel from 'jschannel'
import '../node_modules/photon/sass/photon.scss'

window.Channel = Channel
// is not OS
if (document.location.pathname !== "/") {
  // export vendors for apps
  window.React = React
  window.ReactDOM = ReactDOM
  window.polarComponents = require('../src/components/Elements')
  window.Channel = Channel

  const scope = `app${window.name}`

  // app api
  window.Chan = Channel.build({
      window: window.parent,
      origin: "*",
      scope: scope
  })

  Chan.call({
         method: "title.change",
         params: document.title,
         success: ()=> {}
  })



  //






}
