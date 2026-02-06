import { useState } from 'react'
import { zodiacData } from '@/data/zodiacData'
import { Download, RefreshCw } from 'lucide-react'

const zodiacList = Object.values(zodiacData)
const themes = [
  { id: 'nebula', name: '星云秘境', icon: '🌌' },
  { id: 'scroll', name: '魔法卷轴', icon: '📜' },
  { id: 'altar', name: '暗黑星坛', icon: '🔮' }
]
const resolutions = [
  { id: '1080p', name: '1080P', width: 1920, height: 1080 },
  { id: '2k', name: '2K', width: 2560, height: 1440 },
  { id: '4k', name: '4K', width: 3840, height: 2160 }
]

export function Wallpaper() {
  const [config, setConfig] = useState({
    zodiacSign: 'aries',
    theme: 'nebula',
    text: '',
    resolution: '1080p'
  })
  const [previewUrl, setPreviewUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const generateWallpaper = async () => {
    setIsGenerating(true)
    
    const canvas = document.createElement('canvas')
    const resolution = resolutions.find(r => r.id === config.resolution) || resolutions[0]
    canvas.width = resolution.width
    canvas.height = resolution.height
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#0D0A1A')
    gradient.addColorStop(0.5, '#1A1238')
    gradient.addColorStop(1, '#2D2366')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 3 + 1
      const opacity = Math.random() * 0.5 + 0.2
      
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(123, 47, 253, ${opacity})`
      ctx.fill()
    }
    
    // Zodiac symbol
    const zodiac = zodiacData[config.zodiacSign]
    ctx.font = `bold ${canvas.width * 0.15}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#F0E6FF'
    ctx.shadowColor = '#7B2FFD'
    ctx.shadowBlur = 50
    ctx.fillText(zodiac.symbol, canvas.width / 2, canvas.height / 2)
    
    // Zodiac name
    ctx.font = `bold ${canvas.width * 0.04}px 'Noto Sans SC', sans-serif`
    ctx.fillStyle = '#FFD700'
    ctx.shadowBlur = 20
    ctx.fillText(zodiac.name, canvas.width / 2, canvas.height / 2 + canvas.width * 0.12)
    
    // Date range
    ctx.font = `${canvas.width * 0.02}px 'Noto Sans SC', sans-serif`
    ctx.fillStyle = 'rgba(240, 230, 255, 0.7)'
    ctx.fillText(zodiac.dateRange, canvas.width / 2, canvas.height / 2 + canvas.width * 0.16)
    
    // Custom text
    if (config.text) {
      ctx.font = `${canvas.width * 0.025}px 'Noto Sans SC', sans-serif`
      ctx.fillStyle = '#F0E6FF'
      ctx.fillText(config.text, canvas.width / 2, canvas.height * 0.85)
    }
    
    // Runes
    ctx.font = `${canvas.width * 0.03}px serif`
    ctx.fillStyle = 'rgba(123, 47, 253, 0.5)'
    ctx.fillText('✦', canvas.width * 0.1, canvas.height * 0.15)
    ctx.fillText('✧', canvas.width * 0.9, canvas.height * 0.15)
    ctx.fillText('✦', canvas.width * 0.1, canvas.height * 0.85)
    ctx.fillText('✧', canvas.width * 0.9, canvas.height * 0.85)
    
    setPreviewUrl(canvas.toDataURL('image/png'))
    setIsGenerating(false)
  }
  
  const downloadWallpaper = () => {
    if (!previewUrl) return
    const link = document.createElement('a')
    link.download = `星语秘典_${zodiacData[config.zodiacSign].name}_${Date.now()}.png`
    link.href = previewUrl
    link.click()
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
            🖼️ 壁纸生成
          </h1>
          <p className="text-[#F0E6FF]/60">定制你的专属星座魔法壁纸</p>
        </div>
        
        {/* Config */}
        <div className="magic-card p-6 mb-6">
          {/* Zodiac */}
          <div className="mb-6">
            <label className="block text-sm text-[#F0E6FF]/60 mb-3">选择星座</label>
            <div className="grid grid-cols-4 gap-2">
              {zodiacList.map((zodiac) => (
                <button
                  key={zodiac.id}
                  onClick={() => setConfig(c => ({ ...c, zodiacSign: zodiac.id }))}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                    config.zodiacSign === zodiac.id
                      ? 'border-[#7B2FFD] bg-[#7B2FFD]/30'
                      : 'border-[#7B2FFD]/20 bg-[#1A1238]/50 hover:border-[#7B2FFD]/50'
                  }`}
                >
                  <span className="text-2xl mb-1">{zodiac.symbol}</span>
                  <span className="text-xs text-[#F0E6FF]">{zodiac.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Theme */}
          <div className="mb-6">
            <label className="block text-sm text-[#F0E6FF]/60 mb-3">选择主题</label>
            <div className="flex gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setConfig(c => ({ ...c, theme: theme.id }))}
                  className={`flex-1 flex flex-col items-center p-4 rounded-lg border transition-all ${
                    config.theme === theme.id
                      ? 'border-[#7B2FFD] bg-[#7B2FFD]/30'
                      : 'border-[#7B2FFD]/20 bg-[#1A1238]/50 hover:border-[#7B2FFD]/50'
                  }`}
                >
                  <span className="text-3xl mb-2">{theme.icon}</span>
                  <span className="text-sm text-[#F0E6FF]">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Text */}
          <div className="mb-6">
            <label className="block text-sm text-[#F0E6FF]/60 mb-3">自定义文字</label>
            <input
              type="text"
              value={config.text}
              onChange={(e) => setConfig(c => ({ ...c, text: e.target.value }))}
              placeholder="输入你想要的文字..."
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl bg-[#1A1238]/50 border border-[#7B2FFD]/30 text-[#F0E6FF] focus:border-[#7B2FFD] focus:outline-none focus:ring-2 focus:ring-[#7B2FFD]/30"
            />
          </div>
          
          {/* Resolution */}
          <div className="mb-6">
            <label className="block text-sm text-[#F0E6FF]/60 mb-3">分辨率</label>
            <div className="flex gap-2">
              {resolutions.map((res) => (
                <button
                  key={res.id}
                  onClick={() => setConfig(c => ({ ...c, resolution: res.id }))}
                  className={`flex-1 py-3 rounded-lg border transition-all ${
                    config.resolution === res.id
                      ? 'border-[#7B2FFD] bg-[#7B2FFD]/20 text-[#F0E6FF]'
                      : 'border-[#7B2FFD]/20 bg-[#1A1238]/50 text-[#F0E6FF]/70 hover:border-[#7B2FFD]/50'
                  }`}
                >
                  {res.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Generate */}
          <button
            onClick={generateWallpaper}
            disabled={isGenerating}
            className="w-full magic-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="animate-spin">✨</span>
            ) : (
              <>
                <span>✨</span>
                <span>生成壁纸</span>
              </>
            )}
          </button>
        </div>
        
        {/* Preview */}
        {previewUrl && (
          <div className="animate-in fade-in">
            <h3 className="text-lg font-medium text-[#F0E6FF] text-center mb-4">预览</h3>
            <div className="magic-card p-4 mb-4">
              <img src={previewUrl} alt="壁纸预览" className="w-full rounded-lg" />
            </div>
            <div className="flex gap-3">
              <button onClick={downloadWallpaper} className="flex-1 magic-btn flex items-center justify-center gap-2">
                <Download size={16} />
                <span>下载壁纸</span>
              </button>
              <button onClick={() => setPreviewUrl('')} className="flex-1 py-3 rounded-xl bg-[#7B2FFD]/20 border border-[#7B2FFD]/30 text-[#F0E6FF] flex items-center justify-center gap-2 hover:bg-[#7B2FFD]/30 transition-all">
                <RefreshCw size={16} />
                <span>重新生成</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
