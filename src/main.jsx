
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import {
  FpjsProvider,
  FingerprintJSPro,
} from '@fingerprintjs/fingerprintjs-pro-react'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FpjsProvider
      loadOptions={{
        apiKey: import.meta.env.VITE_FPJS_PUBLIC_API_KEY,
        endpoint: [FingerprintJSPro.defaultEndpoint],
        region: 'us',
        scriptUrlPattern: [
          // 'https://metrics.yourwebsite.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
      }}
    >
      <App />
    </FpjsProvider>
  </BrowserRouter>,
)
