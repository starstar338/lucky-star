import { useState } from 'react'
import { zodiacData, generateRandomFortune } from '@/data/zodiacData'
import { RefreshCw, Share2 } from 'lucide-react'

const zodiacList = Object.values(zodiacData)

export function Fortune() {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)
  const [fortune, setFortune] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [isLoading, setIsLoading] = useState(false)
  
  const loadFortune = async (sign: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setFortune(generateRandomFortune(sign))
    setIsLoading(false)
  }
  
  const selectZodiac = (sign: string) => {
    setSelectedZodiac(sign)
    loadFortune(sign)
  }
  
  const refreshFortune = () => {
    if (selectedZodiac) {
      loadFortune(selectedZodiac)
    }
  }
  
  const shareFortune = () => {
    if (!fortune) return
    const text = `今日运势综合评分：${Math.round((fortune.career.score + fortune.wealth.score + fortune.love.score + fortune.health.score) / 4)}分！`
    if (navigator.share) {
      navigator.share({ title: '我的星座运势', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('运势已复制到剪贴板！')
    }
  }
  
  const overallScore = fortune ? Math.round((fortune.career.score + fortune.wealth.score + fortune.love.score + fortune.health.score) / 4) : 0
  
  const scoreColor = overallScore >= 85 ? '#FFD700' : overallScore >= 70 ? '#4A90E2' : '#FF6B9D'
  
  if (!selectedZodiac) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              🔮 运势占卜
            </h1>
            <p className="text-[#F0E6FF]/60">探索你的今日、本周、本月运势</p>
          </div>
          
          <div className="magic-card p-6">
            <h3 className="text-lg font-medium text-[#F0E6FF] text-center mb-6">选择你的星座</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {zodiacList.map((zodiac) => (
                <button
                  key={zodiac.id}
                  onClick={() => selectZodiac(zodiac.id)}
                  className="flex flex-col items-center p-4 rounded-xl bg-[#1A1238]/50 border border-[#7B2FFD]/20 hover:border-[#7B2FFD]/50 hover:bg-[#7B2FFD]/10 transition-all"
                >
                  <span className="text-3xl mb-2">{zodiac.symbol}</span>
                  <span className="text-sm text-[#F0E6FF]">{zodiac.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
            🔮 运势占卜
          </h1>
        </div>
        
        {/* Selected Zodiac */}
        <div className="flex items-center justify-center gap-4 mb-6 p-4 rounded-xl bg-[#7B2FFD]/10">
          <span className="text-4xl">{zodiacData[selectedZodiac].symbol}</span>
          <span className="text-xl font-semibold text-[#F0E6FF]">{zodiacData[selectedZodiac].name}</span>
          <button 
            onClick={() => { setSelectedZodiac(null); setFortune(null); }}
            className="px-3 py-1 rounded-full border border-[#7B2FFD]/30 text-xs text-[#F0E6FF]/70 hover:border-[#7B2FFD] transition-all"
          >
            更换
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-[#7B2FFD]/10">
          {[
            { id: 'daily', label: '今日运势', icon: '🌅' },
            { id: 'weekly', label: '本周运势', icon: '📅' },
            { id: 'monthly', label: '本月运势', icon: '🌙' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#7B2FFD]/50 to-[#4A90E2]/30 text-[#F0E6FF]'
                  : 'text-[#F0E6FF]/70 hover:text-[#F0E6FF]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="magic-card p-12 text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-2 border-transparent border-t-[#7B2FFD] border-r-[#FFD700] rounded-full animate-spin" />
              <div className="absolute inset-2 border-2 border-transparent border-t-[#FFD700] border-l-[#4A90E2] rounded-full animate-spin reverse" />
            </div>
            <p className="text-[#F0E6FF]/70 animate-pulse">正在占卜中...</p>
          </div>
        ) : fortune ? (
          <div className="space-y-4 animate-in fade-in">
            {/* Header with Score */}
            <div className="magic-card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#F0E6FF]/50 uppercase">{activeTab === 'daily' ? '今日' : activeTab === 'weekly' ? '本周' : '本月'}</span>
                <p className="text-lg font-semibold text-[#F0E6FF]">{fortune.date}</p>
              </div>
              <div 
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center relative"
                style={{ background: `conic-gradient(${scoreColor} ${overallScore * 3.6}deg, rgba(123, 47, 253, 0.2) 0deg)` }}
              >
                <div className="absolute inset-1 rounded-full bg-[#1A1238]" />
                <span className="relative text-2xl font-bold text-[#F0E6FF]">{overallScore}</span>
                <span className="relative text-xs text-[#F0E6FF]/60">综合</span>
              </div>
            </div>
            
            {/* Fortune Items */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'career', icon: '💼', name: '事业魔法', data: fortune.career },
                { key: 'wealth', icon: '💰', name: '财运水晶', data: fortune.wealth },
                { key: 'love', icon: '💕', name: '爱情咒语', data: fortune.love },
                { key: 'health', icon: '💪', name: '健康结界', data: fortune.health },
              ].map((item) => (
                <div key={item.key} className="magic-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-[#F0E6FF]">{item.name}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-[#7B2FFD]/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#7B2FFD] to-[#FFD700] rounded-full transition-all duration-500"
                          style={{ width: `${item.data.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#FFD700]">{item.data.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#F0E6FF]/90 mb-2">{item.data.description}</p>
                  <p className="text-xs text-[#F0E6FF]/50 italic">💫 {item.data.humor}</p>
                </div>
              ))}
            </div>
            
            {/* Lucky Info */}
            <div className="magic-card p-4">
              <h3 className="text-sm font-medium text-[#F0E6FF] text-center mb-4">✨ 今日幸运</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: '🔢', label: '幸运数字', value: fortune.lucky.number },
                  { icon: '🎨', label: '幸运颜色', value: fortune.lucky.color },
                  { icon: '🧭', label: '吉利方位', value: fortune.lucky.direction },
                  { icon: '🔮', label: '开运物品', value: fortune.lucky.item },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-lg bg-[#7B2FFD]/10">
                    <span className="text-2xl mb-1 block">{item.icon}</span>
                    <span className="text-xs text-[#F0E6FF]/50 block">{item.label}</span>
                    <span className="text-sm font-semibold text-[#FFD700]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Advice */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#7B2FFD]/15 to-[#FFD700]/10">
              <p className="text-sm text-[#F0E6FF]/90 text-center">🌟 {fortune.advice}</p>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={refreshFortune} className="flex-1 py-3 rounded-xl bg-[#7B2FFD]/20 border border-[#7B2FFD]/30 text-[#F0E6FF] flex items-center justify-center gap-2 hover:bg-[#7B2FFD]/30 transition-all">
                <RefreshCw size={16} />
                <span>重新占卜</span>
              </button>
              <button onClick={shareFortune} className="flex-1 glow-btn flex items-center justify-center gap-2">
                <Share2 size={16} />
                <span>分享运势</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
