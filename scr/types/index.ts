// 星座类型
export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

// 星座信息
export interface ZodiacInfo {
  id: ZodiacSign
  name: string
  nameEn: string
  symbol: string
  dateRange: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
  element: 'fire' | 'earth' | 'air' | 'water'
  rulingPlanet: string
  qualities: string[]
  positiveTraits: string[]
  negativeTraits: string[]
  preferences: {
    food: string[]
    fashion: string[]
    hobbies: string[]
    avoid: string[]
  }
  compatible: ZodiacSign[]
  incompatible: ZodiacSign[]
  lucky: {
    numbers: number[]
    colors: string[]
    days: string[]
  }
}

// 运势类型
export type FortuneType = 'daily' | 'weekly' | 'monthly'

export interface Fortune {
  type: FortuneType
  date: string
  career: {
    score: number
    description: string
    humor: string
  }
  wealth: {
    score: number
    description: string
    humor: string
  }
  love: {
    score: number
    description: string
    humor: string
  }
  health: {
    score: number
    description: string
    humor: string
  }
  lucky: {
    number: number
    color: string
    direction: string
    item: string
  }
  advice: string
}

// 配对结果
export interface CompatibilityResult {
  sign1: ZodiacSign
  sign2: ZodiacSign
  overall: number
  love: number
  friendship: number
  career: number
  bonds: string[]
  conflicts: string[]
  advice: string[]
  description: string
}

// 运势签
export interface FortuneStick {
  id: string
  type: 'luck' | 'warning' | 'love' | 'wealth' | 'career'
  title: string
  content: string
  humor: string
  advice: string
  blessing: string
}

// 主题
export type ThemeType = 'nebula' | 'scroll' | 'altar'

// 用户设置
export interface UserSettings {
  theme: ThemeType
  darkMode: boolean
  autoSwitch: boolean
  notifications: boolean
  language: 'zh' | 'en' | 'ja' | 'ko'
}

// 性能等级
export type PerformanceLevel = 'high' | 'medium' | 'low' | 'minimal'

// 设备信息
export interface DeviceInfo {
  performanceLevel: PerformanceLevel
  supportsWebGL: boolean
  pixelRatio: number
  screenSize: {
    width: number
    height: number
  }
  isTouch: boolean
  isMobile: boolean
}
