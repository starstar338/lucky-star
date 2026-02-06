import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { zodiacData, getZodiacByDate } from '@/data/zodiacData'
import { Sparkles, ChevronDown } from 'lucide-react'

const zodiacList = Object.values(zodiacData)

export function Home() {
  const navigate = useNavigate()
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState(new Date().getDate())
  const [result, setResult] = useState<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate()
  
  const queryZodiac = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const sign = getZodiacByDate(month, day)
      setResult(zodiacData[sign])
      setIsAnimating(false)
    }, 800)
  }
  
  useEffect(() => {
    setResult(null)
  }, [month, day])
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFD]/15 border border-[#7B2FFD]/30 mb-8">
            <span className="text-[#FFD700] animate-pulse">✦</span>
            <span className="text-sm text-[#F0E6FF]/80">神秘唯美魔幻风</span>
            <span className="text-[#FFD700] animate-pulse">✦</span>
          </div>
          
          {/* Title */}
          <h1 className="mb-6">
            <span className="block text-4xl md:text-6xl font-light text-[#F0E6FF]/90 mb-2">
              探索你的
            </span>
            <span className="block text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#F0E6FF] via-[#FFD700] to-[#7B2FFD] bg-clip-text text-transparent">
              星座魔法
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#F0E6FF]/70 mb-10 leading-relaxed">
            输入生日，唤醒专属星座能量<br />
            让宇宙为你指引方向
          </p>
          
          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('query-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="magic-btn flex items-center gap-2"
            >
              <Sparkles size={18} />
              <span>开始探索</span>
            </button>
            <Link to="/fortune" className="glow-btn flex items-center gap-2">
              <span>🔮</span>
              <span>查看运势</span>
            </Link>
          </div>
        </div>
        
        {/* Floating Runes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['✦', '✧', '✦', '✧'].map((rune, i) => (
            <span
              key={i}
              className="absolute text-2xl text-[#7B2FFD]/30 animate-float"
              style={{
                top: `${20 + i * 15}%`,
                left: i % 2 === 0 ? `${10 + i * 5}%` : 'auto',
                right: i % 2 === 1 ? `${10 + i * 5}%` : 'auto',
                animationDelay: `${i * 2}s`
              }}
            >
              {rune}
            </span>
          ))}
        </div>
        
        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-[#F0E6FF]/50 uppercase tracking-widest">向下滚动</span>
          <ChevronDown size={20} className="text-[#F0E6FF]/50" />
        </div>
      </section>
      
      {/* Query Section */}
      <section id="query-section" className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <span className="text-3xl mb-4 block">🔮</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              星座查询
            </h2>
            <p className="text-[#F0E6FF]/60">发现属于你的宇宙密码</p>
          </div>
          
          <div className="magic-card p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-[#F0E6FF]/60 mb-2">月份</label>
                <select 
                  value={month} 
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1238]/50 border border-[#7B2FFD]/30 text-[#F0E6FF] focus:border-[#7B2FFD] focus:outline-none focus:ring-2 focus:ring-[#7B2FFD]/30"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}月</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#F0E6FF]/60 mb-2">日期</label>
                <select 
                  value={day} 
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1238]/50 border border-[#7B2FFD]/30 text-[#F0E6FF] focus:border-[#7B2FFD] focus:outline-none focus:ring-2 focus:ring-[#7B2FFD]/30"
                >
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}日</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={queryZodiac}
              disabled={isAnimating}
              className="w-full magic-btn flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnimating ? (
                <span className="animate-spin">✨</span>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>唤醒星座魔法</span>
                </>
              )}
            </button>
            
            {/* Result */}
            {result && (
              <div className="mt-6 pt-6 border-t border-[#7B2FFD]/20 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(123,47,253,0.5)]">{result.symbol}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-[#F0E6FF]">{result.name}</h3>
                    <p className="text-[#F0E6FF]/60">{result.dateRange}</p>
                  </div>
                </div>
                <p className="text-[#F0E6FF]/80 mb-4">{result.qualities.join(' · ')}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => navigate(`/zodiac/${result.id}`)}
                    className="flex-1 py-2 px-4 rounded-full bg-[#7B2FFD]/20 border border-[#7B2FFD]/30 text-[#F0E6FF] text-sm hover:bg-[#7B2FFD]/30 transition-all"
                  >
                    查看详情
                  </button>
                  <Link 
                    to="/fortune"
                    className="flex-1 py-2 px-4 rounded-full glow-btn text-center text-sm"
                  >
                    查看运势
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Zodiac Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">⭐</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              十二星座
            </h2>
            <p className="text-[#F0E6FF]/60">点击卡片探索每个星座的魔法特质</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {zodiacList.map((zodiac) => (
              <Link
                key={zodiac.id}
                to={`/zodiac/${zodiac.id}`}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1A1238]/80 to-[#2D2366]/60 border border-[#7B2FFD]/20 hover:border-[#7B2FFD]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: zodiac.element === 'fire' ? 'radial-gradient(circle at center, rgba(255,107,107,0.1), transparent)' :
                               zodiac.element === 'earth' ? 'radial-gradient(circle at center, rgba(106,176,76,0.1), transparent)' :
                               zodiac.element === 'air' ? 'radial-gradient(circle at center, rgba(147,90,254,0.1), transparent)' :
                               'radial-gradient(circle at center, rgba(74,144,226,0.1), transparent)'
                  }}
                />
                <div className="relative text-center">
                  <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform duration-300"
                    style={{
                      filter: zodiac.element === 'fire' ? 'drop-shadow(0 0 10px rgba(255,107,107,0.5))' :
                              zodiac.element === 'earth' ? 'drop-shadow(0 0 10px rgba(106,176,76,0.5))' :
                              zodiac.element === 'air' ? 'drop-shadow(0 0 10px rgba(147,90,254,0.5))' :
                              'drop-shadow(0 0 10px rgba(74,144,226,0.5))'
                    }}
                  >
                    {zodiac.symbol}
                  </span>
                  <h3 className="text-[#F0E6FF] font-medium">{zodiac.name}</h3>
                  <p className="text-xs text-[#F0E6FF]/50">{zodiac.dateRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#7B2FFD]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">🌟</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
              魔法功能
            </h2>
            <p className="text-[#F0E6FF]/60">更多有趣的星座玩法等你探索</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { path: '/fortune', icon: '🔮', title: '运势占卜', desc: '今日、本周、本月运势全面解析' },
              { path: '/compatibility', icon: '💫', title: '星座配对', desc: '探索你们的宇宙契合度' },
              { path: '/daily-stick', icon: '🎋', title: '每日运势签', desc: '抽取你的专属幸运签' },
              { path: '/wallpaper', icon: '🖼️', title: '壁纸生成', desc: '定制你的星座魔法壁纸' },
            ].map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="group p-6 rounded-2xl bg-gradient-to-br from-[#1A1238]/80 to-[#2D2366]/60 border border-[#7B2FFD]/20 hover:border-[#7B2FFD]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-[#F0E6FF] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#F0E6FF]/60 mb-4">{feature.desc}</p>
                <span className="text-[#7B2FFD] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#7B2FFD]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl text-[#FFD700]">✦</span>
            <span className="font-['Orbitron'] text-xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent">
              星语秘典
            </span>
          </div>
          <p className="text-[#F0E6FF]/60 mb-6">探索宇宙奥秘，发现星座魔法</p>
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="text-sm text-[#F0E6FF]/60 hover:text-[#F0E6FF] transition-colors">关于我们</a>
            <a href="#" className="text-sm text-[#F0E6FF]/60 hover:text-[#F0E6FF] transition-colors">隐私政策</a>
            <a href="#" className="text-sm text-[#F0E6FF]/60 hover:text-[#F0E6FF] transition-colors">联系我们</a>
          </div>
          <p className="text-xs text-[#F0E6FF]/40">© 2024 星语秘典 Starlight Oracle · MIT License</p>
        </div>
      </footer>
    </div>
  )
}
