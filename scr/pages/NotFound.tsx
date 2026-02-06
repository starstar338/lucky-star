import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center relative">
        {/* Floating Runes */}
        <div className="absolute inset-0 -m-20 pointer-events-none">
          {['✦', '✧', '✦', '✧'].map((rune, i) => (
            <span
              key={i}
              className="absolute text-2xl text-[#7B2FFD]/30 animate-float"
              style={{
                top: `${i * 25}%`,
                left: i % 2 === 0 ? '10%' : 'auto',
                right: i % 2 === 1 ? '10%' : 'auto',
                animationDelay: `${i * 2}s`
              }}
            >
              {rune}
            </span>
          ))}
        </div>
        
        <div className="text-4xl text-[#7B2FFD]/50 mb-4 animate-pulse">✧</div>
        <h1 className="font-['Orbitron'] text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#7B2FFD] to-[#FFD700] bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#F0E6FF] mb-4">魔法迷路了</h2>
        <p className="text-[#F0E6FF]/70 mb-8">
          你寻找的页面似乎被星尘吹散了<br />
          让魔法指引你回到正确的方向
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="magic-btn">
            ✨ 返回首页
          </Link>
          <Link to="/fortune" className="glow-btn">
            🔮 查看运势
          </Link>
        </div>
      </div>
    </div>
  )
}
