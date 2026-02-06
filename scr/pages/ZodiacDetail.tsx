import { useParams, useNavigate, Link } from 'react-router-dom'
import { zodiacData } from '@/data/zodiacData'
import { ArrowLeft } from 'lucide-react'

const elementIcons: Record<string, string> = {
  fire: '🔥',
  earth: '🌍',
  air: '💨',
  water: '💧'
}

const elementNames: Record<string, string> = {
  fire: '火象',
  earth: '土象',
  air: '风象',
  water: '水象'
}

export function ZodiacDetail() {
  const { sign } = useParams<{ sign: string }>()
  const navigate = useNavigate()
  const zodiac = sign ? zodiacData[sign] : null
  
  if (!zodiac) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#F0E6FF]/60">星座未找到</p>
          <button onClick={() => navigate('/')} className="magic-btn mt-4">
            返回首页
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#F0E6FF]/70 hover:text-[#F0E6FF] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        
        {/* Hero Card */}
        <div className="magic-card p-8 text-center mb-6">
          <div className="relative inline-block mb-4">
            <span className="text-8xl filter drop-shadow-[0_0_20px_rgba(123,47,253,0.5)]">{zodiac.symbol}</span>
            <div className="absolute inset-0 bg-[#7B2FFD]/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F0E6FF] to-[#FFD700] bg-clip-text text-transparent mb-2">
            {zodiac.name}
          </h1>
          <p className="text-[#F0E6FF]/50 uppercase tracking-widest mb-4">{zodiac.nameEn}</p>
          <p className="text-lg text-[#F0E6FF]/70 mb-6">{zodiac.dateRange}</p>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 rounded-full bg-[#7B2FFD]/20 text-[#F0E6FF] text-sm">
              {elementIcons[zodiac.element]} {elementNames[zodiac.element]}
            </span>
            <span className="px-4 py-2 rounded-full bg-[#7B2FFD]/20 text-[#F0E6FF] text-sm">
              🪐 守护星：{zodiac.rulingPlanet}
            </span>
          </div>
        </div>
        
        {/* Traits */}
        <div className="magic-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#F0E6FF] mb-4">✨ 魔法特质</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-[#FFD700] text-sm font-medium mb-2">魔法天赋</h3>
              <ul className="space-y-2">
                {zodiac.positiveTraits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#F0E6FF]/80 text-sm">
                    <span className="text-[#7B2FFD] mt-1">✦</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-[#7B2FFD]/10">
              <h3 className="text-[#FF6B9D] text-sm font-medium mb-2">🌑 魔咒弱点</h3>
              <ul className="space-y-2">
                {zodiac.negativeTraits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#F0E6FF]/80 text-sm">
                    <span className="text-[#FF6B9D] mt-1">✧</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Preferences */}
        <div className="magic-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#F0E6FF] mb-4">生活指南</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🍽️', title: '美食偏好', items: zodiac.preferences.food },
              { icon: '👗', title: '穿搭风格', items: zodiac.preferences.fashion },
              { icon: '🎨', title: '兴趣爱好', items: zodiac.preferences.hobbies },
              { icon: '⚠️', title: '避坑指南', items: zodiac.preferences.avoid },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-[#7B2FFD]/10">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h4 className="text-[#F0E6FF] font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-[#F0E6FF]/70">{item.items.join('、')}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Compatibility */}
        <div className="magic-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#F0E6FF] mb-4">星座配对</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-[#FFD700] text-sm font-medium mb-3">💕 最佳配对</h3>
              <div className="flex flex-wrap gap-2">
                {zodiac.compatible.map((sign) => (
                  <Link
                    key={sign}
                    to={`/zodiac/${sign}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2FFD]/15 border border-[#7B2FFD]/30 hover:bg-[#7B2FFD]/30 transition-all"
                  >
                    <span>{zodiacData[sign].symbol}</span>
                    <span className="text-[#F0E6FF] text-sm">{zodiacData[sign].name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-[#7B2FFD]/10">
              <h3 className="text-[#FF6B9D] text-sm font-medium mb-3">⚡ 挑战配对</h3>
              <div className="flex flex-wrap gap-2">
                {zodiac.incompatible.map((sign) => (
                  <Link
                    key={sign}
                    to={`/zodiac/${sign}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B9D]/10 border border-[#FF6B9D]/30 hover:bg-[#FF6B9D]/20 transition-all"
                  >
                    <span>{zodiacData[sign].symbol}</span>
                    <span className="text-[#F0E6FF] text-sm">{zodiacData[sign].name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Lucky */}
        <div className="magic-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#F0E6FF] mb-4">幸运魔法</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🔢', label: '幸运数字', value: zodiac.lucky.numbers.join('、') },
              { icon: '🎨', label: '幸运颜色', value: zodiac.lucky.colors.join('、') },
              { icon: '📅', label: '幸运日期', value: zodiac.lucky.days.join('、') },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-[#7B2FFD]/10">
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <span className="text-xs text-[#F0E6FF]/50 block mb-1">{item.label}</span>
                <span className="text-[#FFD700] font-medium text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Link to="/fortune" className="flex-1 magic-btn text-center">
            🔮 查看运势
          </Link>
          <Link to="/compatibility" className="flex-1 glow-btn text-center">
            💫 星座配对
          </Link>
        </div>
      </div>
    </div>
  )
}
