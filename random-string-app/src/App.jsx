import { useState, useCallback, useEffect } from 'react'
import './index.css'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function App() {
  const [length, setLength] = useState(16)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])

  const generateString = useCallback(() => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*'

    const generated = Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')

    setResult(generated)
    setHistory((prev) => [generated, ...prev.slice(0, 4)])
    setCopied(false)
  }, [length, includeNumbers, includeSymbols])

  useEffect(() => {
    generateString()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            String<span className="text-purple-400">Gen</span>
          </h1>
          <p className="text-purple-300 mt-2 text-sm">Generate secure random strings instantly</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5">

          {/* Result */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">Generated String</span>
              <button
                onClick={handleCopy}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-all"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-white font-mono text-sm break-all leading-relaxed">
              {result || '—'}
            </p>
          </div>

          {/* Length slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-purple-300 uppercase tracking-widest">Length</label>
              <span className="text-white font-bold text-sm">{length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-3">
            <button
              onClick={() => setIncludeNumbers((p) => !p)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                includeNumbers
                  ? 'bg-purple-500 border-purple-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
              }`}
            >
              Numbers
            </button>
            <button
              onClick={() => setIncludeSymbols((p) => !p)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                includeSymbols
                  ? 'bg-purple-500 border-purple-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
              }`}
            >
              Symbols
            </button>
          </div>

          {/* Generate button */}
          <button
            onClick={generateString}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl transition-all duration-150 active:scale-95 shadow-lg shadow-purple-500/30"
          >
            Generate
          </button>

          {/* History */}
          {history.length > 1 && (
            <div>
              <label className="text-xs font-bold text-purple-300 uppercase tracking-widest block mb-2">
                Recent
              </label>
              <div className="space-y-2">
                {history.slice(1).map((str, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/40 font-mono text-xs truncate"
                  >
                    {str}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App