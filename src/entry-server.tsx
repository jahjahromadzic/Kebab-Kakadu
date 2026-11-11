import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Prerender u buildu (scripts/prerender.mjs): HTML stranice je u index.html odmah, React ga samo hidrira. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
