import { useState } from 'react'
import './index.css'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ko', name: 'Korean' },
]

const RAPIDAPI_KEY = '59541be028msh4db3fd0337b6d56p12aa94jsnf9593e946a26'
const RAPIDAPI_HOST = 'google-translate113.p.rapidapi.com'

function App() {
  const [text, setText] = useState('')
  const [targetLang, setTargetLang] = useState('hi')
  const [translated, setTranslated] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    setTranslated('')

    try {
      const response = await fetch(
        `https://${RAPIDAPI_HOST}/api/v1/translator/text`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
          },
          body: JSON.stringify({
            from: 'en',
            to: targetLang,
            text: text,
          }),
        }
      )
      const data = await response.json()
      setTranslated(data.trans)
    } catch (err) {
      setError('Translation failed. Check your API key or internet.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedLang = LANGUAGES.find((l) => l.code === targetLang)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Lingua<span className="text-purple-400">X</span>
          </h1>
          <p className="text-purple-300 mt-2 text-sm">Powered by Google Translate via RapidAPI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">English</span>
              <span className="text-xs text-white/30">{text.length}/500</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 500))}
              placeholder="Type your text here..."
              rows={4}
              className="w-full bg-transparent text-white placeholder-white/20 focus:outline-none resize-none text-base"
            />
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <label className="text-xs font-bold text-purple-300 uppercase tracking-widest block mb-3">
              Translate To
            </label>
            <div className="grid grid-cols-5 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLang(lang.code)}
                  className={`py-2 px-1 rounded-xl text-xs font-medium transition-all duration-150 ${
                    targetLang === lang.code
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white font-bold py-4 rounded-2xl transition-all duration-150 active:scale-95 shadow-lg shadow-purple-500/30 text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Translating...
              </span>
            ) : `Translate to ${selectedLang?.name}`}
          </button>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-300 text-sm rounded-2xl px-4 py-3">
              {error}
            </div>
          )}

          {translated && (
            <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                  {selectedLang?.name} Translation
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-all"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-white text-lg leading-relaxed">{translated}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App