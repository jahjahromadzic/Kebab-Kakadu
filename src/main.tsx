import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// U produkciji je HTML prerenderovan (scripts/prerender.mjs), pa se samo hidrira.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
