import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { EN, VN } from './translation'
import i18next from "i18next"
import { I18nextProvider } from 'react-i18next'

i18next.init({
  interpolation: { escapeValue: false },
  lng: "vn",
  resources: {
    en: {
      global: EN,
    },
    vn: {
      global: VN,
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)