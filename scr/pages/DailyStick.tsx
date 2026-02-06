import { useState } from 'react'
import { fortuneSticks } from '@/data/zodiacData'
import { RefreshCw, Share2 } from 'lucide-react'

const typeIcons: Record<string, string> = {
  luck: '🍀',
  wealth: '💰',
  love: '💕',
  career: '💼',
  warning: '⚠️'
}

export function DailyStick() {
  const [stick, setStick] = useState<any>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [remaining, setRemaining] = useState(3)
  const [history, setHistory] = useState<any[]>([])
  
  const drawStick = async () => {
    if (remaining <= 0 || isShaking) return
    
    setIsShaking(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const randomStick = fortuneSticks[Math.floor(Math.random() * fortuneSticks.length)]
    setStick(randomStick)
    setRemaining(r => r - 1)
    setHistory(h => [{ ...randomStick, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }, ...h])
    setIsShaking(false)
  }
  
  const shareStick = () => {
    if (!stick) return
    const text = `今日运势签：${stick.title}\n${stick.content}\n${stick.blessing}`
    if (navigator.share) {
      navigator.share({ title: '我的今日运势签', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      alert('签文已复制到剪贴板！')
    }
  }
  
  const typeColors: Record<string, string> = {
    luck: 'from-[#FFD700]/10 to-[#7B2FFD]/10 border-[#FFD700]/30',
    wealth: 'from-[#6AB04C]/10 to-[#7B2FFD]/10 border-[#6AB04C]/30',
    love: 'from-[#FF6B9D]/10 to-[#7B2FFD]/10 border-[#FF6B9D]/30',
    career: 'from-[#4A90E2]/10 to-[#7B2FFD]/10 border-[#4A90E2]/30',
    warning: 'from-[#FF9650]/10 to-[#7B2FFD]/10 border-[#FF9650]/30'
  }
  
  if (!stick) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              🎋 每日运势签
            </h1>
            <p className="text-[#F0E6FF]/60">抽取你的专属幸运签</p>
          </div>
          
          <div className="text-center">
            {/* Stick Tube */}
            <div 
              onClick={drawStick}
              className={`relative w-40 h-52 mx-auto mb-6 cursor-pointer transition-transform hover:scale-105 ${isShaking ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''}`}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-36 bg-gradient-to-br from-[#7B2FFD]/30 to-[#4A90E2]/20 border-2 border-[#7B2FFD]/40 rounded-b-full flex items-center justify-center overflow-hidden">
                <span className="text-6xl relative z-10">🎋</span>
                <div className="absolute inset-0 bg-[#7B2FFD]/20 animate-pulse" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-2xl text-[#FFD700]/70 animate-[sway_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}>
                    |
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-lg text-[#F0E6FF] mb-2">点击签筒抽取今日运势签</p>
            <p className="text-sm text-[#F0E6FF]/50">今日剩余次数：{remaining}</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
            🎋 每日运势签
          </h1>
        </div>
        
        {/* Stick Card */}
        <div className={`magic-card p-6 mb-6 bg-gradient-to-br ${typeColors[stick.type]}`}>
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">{typeIcons[stick.type]}</span>
            <h3 className="text-xl font-bold text-[#F0E6FF]">{stick.title}</h3>
          </div>
          
          <div className="p-4 rounded-xl bg-black/20 mb-4">
            <p className="text-lg text-[#F0E6FF] text-center">{stick.content}</p>
          </div>
          
          <div className="p-3 rounded-lg bg-black/10 mb-3">
            <span className="text-xs text-[#F0E6FF]/50 uppercase block mb-1">💫 宇宙吐槽</span>
            <p className="text-sm text-[#F0E6FF]/80 italic">{stick.humor}</p>
          </div>
          
          <div className="p-3 rounded-lg bg-black/10 mb-4">
            <span className="text-xs text-[#F0E6FF]/50 uppercase block mb-1">🌟 魔法建议</span>
            <p className="text-sm text-[#F0E6FF]/90">{stick.advice}</p>
          </div>
          
          <div className="text-center pt-4 border-t border-[#7B2FFD]/20">
            <span className="text-[#FFD700] font-medium">{stick.blessing}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 mb-6">
          {remaining > 0 && (
            <button 
              onClick={() => setStick(null)} 
              className="flex-1 py-3 rounded-xl bg-[#7B2FFD]/20 border border-[#7B2FFD]/30 text-[#F0E6FF] flex items-center justify-center gap-2 hover:bg-[#7B2FFD]/30 transition-all"
            >
              <RefreshCw size={16} />
              <span>再抽一次</span>
            </button>
          )}
          <button onClick={shareStick} className="flex-1 glow-btn flex items-center justify-center gap-2">
            <Share2 size={16} />
            <span>分享签文</span>
          </button>
        </div>
        
        {/* History */}
        {history.length > 1 && (
          <div className="magic-card p-4">
            <h3 className="text-sm font-medium text-[#F0E6FF] text-center mb-3">今日抽签记录</h3>
            <div className="space-y-2">
              {history.slice(1).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#1A1238]/50">
                  <span className="text-lg">{typeIcons[item.type]}</span>
                  <span className="flex-1 text-sm text-[#F0E6FF]">{item.title}</span>
                  <span className="text-xs text-[#F0E6FF]/50">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
