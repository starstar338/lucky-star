import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NebulaBackground } from '@/components/NebulaBackground'
import { Navigation } from '@/components/Navigation'
import { Home } from '@/pages/Home'
import { ZodiacDetail } from '@/pages/ZodiacDetail'
import { Fortune } from '@/pages/Fortune'
import { Compatibility } from '@/pages/Compatibility'
import { DailyStick } from '@/pages/DailyStick'
import { Wallpaper } from '@/pages/Wallpaper'
import { NotFound } from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0D0A1A] text-[#F0E6FF]">
        <NebulaBackground />
        <Navigation />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zodiac/:sign" element={<ZodiacDetail />} />
            <Route path="/fortune" element={<Fortune />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/daily-stick" element={<DailyStick />} />
            <Route path="/wallpaper" element={<Wallpaper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
