import { useState } from 'react'
import { zodiacData, calculateCompatibility } from '@/data/zodiacData'
import { RefreshCw, Share2 } from 'lucide-react'

const zodiacList = Object.values(zodiacData)

export function Compatibility() {
  const [sign1, setSign1] = useState<string | null>(null)
  const [sign2, setSign2] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const calculate = async () => {
    if (!sign1 || !sign2) return
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setResult(calculateCompatibility(sign1, sign2))
    setIsCalculating(false)
  }
  
  const reset = () => {
    setSign1(null)
    setSign2(null)
    setResult(null)
  }
  
  const share = () => {
    if (!result) return
    const text = `${zodiacData[result.sign1].name}与${zodiacData[result.sign2].name}的配对契合度：${result.overall}分！`
    if (navigator.share) {
      navigator.share({ title: '星座配对结果', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('配对结果已复制到剪贴板！')
    }
  }
  
  const scoreColor = result?.overall >= 80 ? '#FFD700' : result?.overall >= 60 ? '#4A90E2' : '#FF6B9D'
  
  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              💫 星座配对
            </h1>
          </div>
          
          {/* Result Header */}
          <div className="magic-card p-6 mb-4">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <span className="text-5xl block mb-2">{zodiacData[result.sign1].symbol}</span>
                <span className="text-[#F0E6FF]">{zodiacData[result.sign1].name}</span>
              </div>
              <span className="text-3xl">💫</span>
              <div className="text-center">
                <span className="text-5xl block mb-2">{zodiacData[result.sign2].symbol}</span>
                <span className="text-[#F0E6FF]">{zodiacData[result.sign2].name}</span>
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <div 
                className="w-28 h-28 rounded-full flex flex-col items-center justify-center relative"
                style={{ background: `conic-gradient(${scoreColor} ${result.overall * 3.6}deg, rgba(123, 47, 253, 0.2) 0deg)` }}
              >
                <div className="absolute inset-1.5 rounded-full bg-[#1A1238]" />
                <span className="relative text-3xl font-bold text-[#F0E6FF]">{result.overall}</span>
                <span className="relative text-xs text-[#F0E6FF]/60">契合度</span>
              </div>
            </div>
            
            <p className="text-center text-[#F0E6FF]/80">{result.description}</p>
          </div>
          
          {/* Dimensions */}
          <div className="magic-card p-4 mb-4">
            <div className="space-y-3">
              {[
                { icon: '💕', name: '爱情', score: result.love },
                { icon: '🤝', name: '友情', score: result.friendship },
                { icon: '💼', name: '事业', score: result.career },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="w-12 text-sm text-[#F0E6FF]/70">{item.name}</span>
                  <div className="flex-1 h-2 bg-[#7B2FFD]/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#7B2FFD] to-[#FFD700] rounded-full transition-all duration-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-semibold text-[#FFD700] text-right">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bonds */}
          {result.bonds.length > 0 && (
            <div className="magic-card p-4 mb-4">
              <h3 className="text-sm font-medium text-[#F0E6FF] mb-3">💫 魔法羁绊</h3>
              <ul className="space-y-2">
                {result.bonds.map((bond: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#F0E6FF]/80">
                    <span className="text-[#FFD700]">✦</span>
                    <span>{bond}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Conflicts */}
          {result.conflicts.length > 0 && (
            <div className="magic-card p-4 mb-4">
              <h3 className="text-sm font-medium text-[#F0E6FF] mb-3">⚡ 魔咒冲突</h3>
              <ul className="space-y-2">
                {result.conflicts.map((conflict: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#F0E6FF]/80">
                    <span className="text-[#FF6B9D]">✧</span>
                    <span>{conflict}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Advice */}
          <div className="magic-card p-4 mb-4">
            <h3 className="text-sm font-medium text-[#F0E6FF] mb-3">🌟 和解咒语</h3>
            <ul className="space-y-2">
              {result.advice.map((advice: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#F0E6FF]/80">
                  <span className="text-[#7B2FFD]">💫</span>
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={reset} className="flex-1 py-3 rounded-xl bg-[#7B2FFD]/20 border border-[#7B2FFD]/30 text-[#F0E6FF] flex items-center justify-center gap-2 hover:bg-[#7B2FFD]/30 transition-all">
              <RefreshCw size={16} />
              <span>重新配对</span>
            </button>
            <button onClick={share} className="flex-1 glow-btn flex items-center justify-center gap-2">
              <Share2 size={16} />
              <span>分享结果</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
            💫 星座配对
          </h1>
          <p className="text-[#F0E6FF]/60">探索你们的宇宙契合度</p>
        </div>
        
        <div className="magic-card p-6">
          <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6">
            {/* Sign 1 */}
            <div>
              <label className="block text-sm text-[#F0E6FF]/60 mb-3 text-center">你的星座</label>
              <div className="grid grid-cols-3 gap-2">
                {zodiacList.map((zodiac) => (
                  <button
                    key={zodiac.id}
                    onClick={() => setSign1(zodiac.id)}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                      sign1 === zodiac.id
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
            
            {/* VS */}
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-[#FFD700] px-4 py-2 rounded-full border-2 border-[#FFD700]/30">
                VS
              </span>
            </div>
            
            {/* Sign 2 */}
            <div>
              <label className="block text-sm text-[#F0E6FF]/60 mb-3 text-center">TA的星座</label>
              <div className="grid grid-cols-3 gap-2">
                {zodiacList.map((zodiac) => (
                  <button
                    key={zodiac.id}
                    onClick={() => setSign2(zodiac.id)}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                      sign2 === zodiac.id
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
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#7B2FFD]/10 flex justify-center">
            <button
              onClick={calculate}
              disabled={!sign1 || !sign2 || isCalculating}
              className="magic-btn flex items-center gap-2 disabled:opacity-50"
            >
              {isCalculating ? (
                <span className="animate-spin">✨</span>
              ) : (
                <>
                  <span>✨</span>
                  <span>开始配对</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
