import { useState } from 'react'
import { remixContent } from './api/remixContent'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [remixStyle, setRemixStyle] = useState('creative')

  const handleRemix = async () => {
    setIsLoading(true)
    try {
      const remixed = await remixContent(inputText, remixStyle)
      setOutputText(remixed)
    } catch (error) {
      console.error('Error:', error)
      setOutputText('Error remixing content. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Content Remixer</h1>
        
        {/* Input Box */}
        <textarea
          className="w-full h-40 p-4 border rounded-lg shadow-sm"
          placeholder="Paste your content here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Remix Style Selector */}
        <select
          className="w-full p-2 border rounded-lg shadow-sm"
          value={remixStyle}
          onChange={(e) => setRemixStyle(e.target.value)}
        >
          <option value="creative">Creative & Engaging</option>
          <option value="professional">Professional & Formal</option>
          <option value="casual">Casual & Friendly</option>
          <option value="social">Social Media Style</option>
        </select>

        {/* Remix Button */}
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={handleRemix}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? 'Remixing...' : 'Remix Content'}
        </button>

        {/* Output Box */}
        {outputText && (
          <div className="w-full p-4 bg-white border rounded-lg shadow-sm">
            <h2 className="font-bold mb-2">Remixed Output:</h2>
            <p className="whitespace-pre-wrap">{outputText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 