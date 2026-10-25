/**
 * ===================================================================
 * TRƯỜNG PTDTNT THCS VÀ THPT PHƯỚC SƠN
 * HOLIDAY & SEASONAL PARTICLE ENGINE (GSAP 3D POWERED)
 * Hỗ trợ 6 chủ đề:
 * 1. Mùa Thu Tựu Trường (Autumn) - Lá vàng rơi
 * 2. Giáng Sinh (Christmas) - Bông tuyết pha lê & hoa tuyết
 * 3. Halloween - Dơi bay lượn & bí ngô huyền bí
 * 4. Tết Cổ Truyền (Lunar New Year) - Mưa hoa đào, mai vàng & bao lì xì
 * 5. Happy New Year - Kim tuyến confetti, sao vàng & pháo hoa
 * 6. Tết Trung Thu (Mid-Autumn) - Đèn ông sao, lồng đèn & trăng rằm
 * ===================================================================
 */

const THEMES_DATA = {
  autumn: {
    id: 'autumn',
    name: 'Mùa Thu Tựu Trường',
    icon: '🍂',
    badgeName: 'Thu Tựu Trường',
    emblemIcon: 'fa-solid fa-graduation-cap',
    actionName: 'Gió mùa thu thổi lá',
    actionIcon: 'fa-solid fa-wind',
    quote: '<i class="fa-solid fa-feather-pointed"></i> "Tiên học lễ - Hậu học văn" • Thu tựu trường 2026 - 2027',
    densityDefault: 16,
    speedFactor: 1.0,
    particles: [
      // 1. Lá phong đỏ cam
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="34" height="34">
          <path d="M50 5 L55 25 L75 15 L70 35 L95 40 L75 55 L85 75 L60 70 L52 95 L48 95 L40 70 L15 75 L25 55 L5 40 L30 35 L25 15 L45 25 Z" fill="url(#grad-autumn-maple)" />
          <path d="M50 25 L50 90 M50 50 L70 35 M50 55 L75 65 M50 50 L30 35 M50 55 L25 65" stroke="rgba(140, 30, 10, 0.45)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        </svg>`,
        gradient: `<linearGradient id="grad-autumn-maple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444"/><stop offset="50%" stop-color="#f97316"/><stop offset="100%" stop-color="#b45309"/>
        </linearGradient>`
      },
      // 2. Lá bạch quả vàng
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="32" height="32">
          <path d="M50 95 C48 70 45 60 25 50 C10 40 5 25 20 15 C35 5 45 15 50 22 C55 15 65 5 80 15 C95 25 90 40 75 50 C55 60 52 70 50 95 Z" fill="url(#grad-autumn-ginkgo)" />
          <path d="M50 90 C50 65 40 50 30 35 M50 65 C55 50 65 35 70 25" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>`,
        gradient: `<linearGradient id="grad-autumn-ginkgo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047"/><stop offset="60%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
        </linearGradient>`
      },
      // 3. Lá sồi mật ong
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="30" height="36">
          <path d="M50 5 C60 15 70 12 68 25 C75 28 80 38 72 45 C80 50 78 62 68 68 C72 75 65 82 50 95 C35 82 28 75 32 68 C22 62 20 50 28 45 C20 38 25 28 32 25 C30 12 40 15 50 5 Z" fill="url(#grad-autumn-oak)" />
          <path d="M50 15 L50 92 M50 35 L65 30 M50 48 L68 45 M50 62 L65 60 M50 35 L35 30 M50 48 L32 45 M50 62 L35 60" stroke="rgba(120, 53, 15, 0.4)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        </svg>`,
        gradient: `<linearGradient id="grad-autumn-oak" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#d97706"/><stop offset="100%" stop-color="#78350f"/>
        </linearGradient>`
      },
      // 4. Lá bạch dương hổ phách
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="26">
          <path d="M50 10 C68 25 80 50 65 75 C55 90 52 95 50 95 C48 95 45 90 35 75 C20 50 32 25 50 10 Z" fill="url(#grad-autumn-birch)" />
          <path d="M50 18 L50 90 M50 35 L62 42 M50 52 L62 60 M50 35 L38 42 M50 52 L38 60" stroke="rgba(180, 83, 9, 0.4)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>`,
        gradient: `<linearGradient id="grad-autumn-birch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>`
      }
    ]
  },

  christmas: {
    id: 'christmas',
    name: 'Giáng Sinh (Noel)',
    icon: '🎄',
    badgeName: 'Giáng Sinh Noel',
    emblemIcon: 'fa-solid fa-holly-berry',
    actionName: 'Cơn bão tuyết trắng',
    actionIcon: 'fa-solid fa-snowflake',
    quote: '<i class="fa-solid fa-gift"></i> "Merry Christmas!" • Chúc Thầy Cô & Các Em Mùa Đông Ấm Áp & An Lành',
    densityDefault: 22,
    speedFactor: 0.85,
    particles: [
      // 1. Hoa tuyết pha lê 6 cánh tinh xảo
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="30" height="30">
          <g stroke="url(#grad-xmas-snow)" stroke-width="3" stroke-linecap="round">
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="15" y1="30" x2="85" y2="70" />
            <line x1="15" y1="70" x2="85" y2="30" />
            <!-- Nhánh tuyết nhỏ -->
            <path d="M50 25 L40 18 M50 25 L60 18 M50 75 L40 82 M50 75 L60 82" />
            <path d="M30 38 L25 28 M30 38 L38 32 M70 62 L62 68 M70 62 L75 72" />
            <path d="M30 62 L25 72 M30 62 L38 68 M70 38 L62 32 M70 38 L75 28" />
          </g>
          <circle cx="50" cy="50" r="4" fill="#ffffff" />
        </svg>`,
        gradient: `<linearGradient id="grad-xmas-snow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#93c5fd"/>
        </linearGradient>`
      },
      // 2. Sao tuyết lấp lánh 8 cánh
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="24" height="24">
          <polygon points="50,5 58,35 90,35 64,55 74,85 50,68 26,85 36,55 10,35 42,35" fill="url(#grad-xmas-star)" />
          <circle cx="50" cy="50" r="6" fill="#fef08a" />
        </svg>`,
        gradient: `<linearGradient id="grad-xmas-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="60%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#60a5fa"/>
        </linearGradient>`
      },
      // 3. Bông tuyết tròn mờ ảo
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="18" height="18">
          <circle cx="50" cy="50" r="42" fill="url(#grad-xmas-dot)" />
          <circle cx="50" cy="50" r="20" fill="#ffffff" opacity="0.9" />
        </svg>`,
        gradient: `<radialGradient id="grad-xmas-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="70%" stop-color="#93c5fd" stop-opacity="0.6"/><stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
        </radialGradient>`
      },
      // 4. Nhánh thông & quả Holly đỏ
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="26">
          <path d="M50 20 C40 35 25 45 15 50 C28 58 40 58 48 52 C42 65 30 75 22 82 C38 85 52 78 56 68 C62 78 76 85 88 82 C80 75 68 65 62 52 C70 58 82 58 95 50 C85 45 70 35 60 20 Z" fill="#15803d" />
          <circle cx="45" cy="46" r="8" fill="#dc2626" />
          <circle cx="58" cy="48" r="8" fill="#ef4444" />
          <circle cx="52" cy="36" r="7" fill="#b91c1c" />
        </svg>`,
        gradient: ``
      }
    ]
  },

  halloween: {
    id: 'halloween',
    name: 'Lễ Hội Halloween',
    icon: '🎃',
    badgeName: 'Halloween Party',
    emblemIcon: 'fa-solid fa-ghost',
    actionName: 'Bầy dơi ma quái bay',
    actionIcon: 'fa-solid fa-ghost',
    quote: '<i class="fa-solid fa-hat-wizard"></i> "Trick or Treat!" • Chúc Thầy Cô & Các Em Mùa Lễ Hội Kỳ Thú & Đầy Hứng Khởi',
    densityDefault: 15,
    speedFactor: 1.15,
    particles: [
      // 1. Dơi đêm bay lượn
      {
        svg: `<svg viewBox="0 0 100 70" class="leaf-svg" width="34" height="24">
          <path d="M50 35 Q40 10 15 15 Q25 35 10 55 Q30 50 45 42 Q48 50 50 50 Q52 50 55 42 Q70 50 90 55 Q75 35 85 15 Q60 10 50 35 Z" fill="url(#grad-hall-bat)" />
          <circle cx="47" cy="32" r="1.8" fill="#f97316" />
          <circle cx="53" cy="32" r="1.8" fill="#f97316" />
        </svg>`,
        gradient: `<linearGradient id="grad-hall-bat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4c1d95"/><stop offset="60%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#09090b"/>
        </linearGradient>`
      },
      // 2. Bí ngô ma thuật Jack-o-Lantern
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="28" height="28">
          <!-- Cuống bí -->
          <path d="M48 10 Q50 3 58 5 Q54 16 50 18 Z" fill="#15803d" />
          <!-- Thân bí ngô -->
          <ellipse cx="50" cy="55" rx="42" ry="36" fill="url(#grad-hall-pumpkin)" />
          <!-- Mắt tam giác phát sáng -->
          <polygon points="32,45 42,45 37,35" fill="#fef08a" />
          <polygon points="58,45 68,45 63,35" fill="#fef08a" />
          <polygon points="50,50 46,56 54,56" fill="#fef08a" />
          <!-- Nụ cười răng cưa -->
          <path d="M30 65 Q50 82 70 65 L65 67 L60 63 L55 67 L50 63 L45 67 L40 63 L35 67 Z" fill="#fef08a" />
        </svg>`,
        gradient: `<radialGradient id="grad-hall-pumpkin" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#fdba74"/><stop offset="60%" stop-color="#f97316"/><stop offset="100%" stop-color="#c2410c"/>
        </radialGradient>`
      },
      // 3. Bóng ma nhỏ dễ thương
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="30">
          <path d="M50 15 C30 15 25 35 25 60 C25 78 30 85 36 82 C42 80 44 86 50 84 C56 86 58 80 64 82 C70 85 75 78 75 60 C75 35 70 15 50 15 Z" fill="url(#grad-hall-ghost)" />
          <circle cx="42" cy="40" r="4" fill="#1e1b4b" />
          <circle cx="58" cy="40" r="4" fill="#1e1b4b" />
          <ellipse cx="50" cy="52" rx="4" ry="6" fill="#1e1b4b" />
        </svg>`,
        gradient: `<linearGradient id="grad-hall-ghost" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="70%" stop-color="#f3e8ff"/><stop offset="100%" stop-color="#c084fc"/>
        </linearGradient>`
      },
      // 4. Mạng nhện ánh tím
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="26">
          <circle cx="50" cy="50" r="10" fill="#a855f7" />
          <ellipse cx="50" cy="40" rx="6" ry="6" fill="#9333ea" />
          <!-- Chân nhện -->
          <path d="M44 48 Q25 35 20 45 M44 52 Q20 50 18 62 M56 48 Q75 35 80 45 M56 52 Q80 50 82 62" stroke="#d8b4fe" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`,
        gradient: ``
      }
    ]
  },

  tet: {
    id: 'tet',
    name: 'Tết Cổ Truyền (Xuân 2027)',
    icon: '🧧',
    badgeName: 'Tết Xuân 2027',
    emblemIcon: 'fa-solid fa-fan',
    actionName: 'Mưa hoa đào & mai vàng',
    actionIcon: 'fa-solid fa-fan',
    quote: '<i class="fa-solid fa-fire"></i> "Vạn Sự Như Ý - Đắc Lộc Toàn Gia" • Mừng Xuân Mới 2027 Rực Rỡ & Thắng Lợi',
    densityDefault: 20,
    speedFactor: 0.95,
    particles: [
      // 1. Cánh hoa đào hồng thắm (Peach blossom petal)
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="25" height="25">
          <path d="M50 10 C70 15 85 40 75 70 C65 90 52 95 50 95 C48 95 35 90 25 70 C15 40 30 15 50 10 Z" fill="url(#grad-tet-dao)" />
          <path d="M50 25 Q50 65 50 85" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1.5" fill="none" />
        </svg>`,
        gradient: `<linearGradient id="grad-tet-dao" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbcfe8"/><stop offset="50%" stop-color="#fb7185"/><stop offset="100%" stop-color="#e11d48"/>
        </linearGradient>`
      },
      // 2. Hoa mai vàng 5 cánh rực rỡ
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="30" height="30">
          <g fill="url(#grad-tet-mai)">
            <ellipse cx="50" cy="28" rx="14" ry="20" />
            <ellipse cx="50" cy="72" rx="14" ry="20" />
            <ellipse cx="28" cy="50" rx="20" ry="14" />
            <ellipse cx="72" cy="50" rx="20" ry="14" />
            <circle cx="36" cy="36" r="14" />
            <circle cx="64" cy="36" r="14" />
            <circle cx="36" cy="64" r="14" />
            <circle cx="64" cy="64" r="14" />
          </g>
          <!-- Nhuỵ cam -->
          <circle cx="50" cy="50" r="9" fill="#ea580c" />
          <circle cx="50" cy="50" r="5" fill="#fef08a" />
        </svg>`,
        gradient: `<linearGradient id="grad-tet-mai" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="60%" stop-color="#facc15"/><stop offset="100%" stop-color="#eab308"/>
        </linearGradient>`
      },
      // 3. Bao lì xì đỏ may mắn
      {
        svg: `<svg viewBox="0 0 100 130" class="leaf-svg" width="22" height="28">
          <!-- Thân bao lì xì -->
          <rect x="15" y="15" width="70" height="100" rx="10" fill="url(#grad-tet-lixi)" stroke="#fbbf24" stroke-width="2"/>
          <!-- Nắp bao -->
          <path d="M15 35 Q50 65 85 35" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
          <!-- Chữ Lộc/Họa tiết vàng ở giữa -->
          <circle cx="50" cy="75" r="16" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
          <text x="50" y="81" font-size="16" font-family="'Plus Jakarta Sans', serif" font-weight="bold" fill="#dc2626" text-anchor="middle">LỘC</text>
        </svg>`,
        gradient: `<linearGradient id="grad-tet-lixi" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444"/><stop offset="70%" stop-color="#dc2626"/><stop offset="100%" stop-color="#991b1b"/>
        </linearGradient>`
      },
      // 4. Đồng xu vàng tài lộc
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="22" height="22">
          <circle cx="50" cy="50" r="42" fill="url(#grad-tet-coin)" stroke="#ca8a04" stroke-width="3"/>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#fef08a" stroke-width="1.5"/>
          <!-- Lỗ vuông -->
          <rect x="40" y="40" width="20" height="20" fill="#78350f" stroke="#ca8a04" stroke-width="2"/>
        </svg>`,
        gradient: `<linearGradient id="grad-tet-coin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
        </linearGradient>`
      }
    ]
  },

  newyear: {
    id: 'newyear',
    name: 'Happy New Year (2027)',
    icon: '🎆',
    badgeName: 'Năm Mới 2027',
    emblemIcon: 'fa-solid fa-sparkles',
    actionName: 'Bắn pháo hoa rực rỡ',
    actionIcon: 'fa-solid fa-champagne-glasses',
    quote: '<i class="fa-solid fa-sparkles"></i> "Happy New Year 2027!" • Bứt Phá Mục Tiêu Mới - Chinh Phục Đỉnh Cao Học Vấn',
    densityDefault: 24,
    speedFactor: 1.05,
    particles: [
      // 1. Ngôi sao vàng lấp lánh (Golden Flare Star)
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="26">
          <polygon points="50,5 57,38 90,45 57,52 50,85 43,52 10,45 43,38" fill="url(#grad-ny-star)" />
          <circle cx="50" cy="45" r="5" fill="#ffffff" />
        </svg>`,
        gradient: `<linearGradient id="grad-ny-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#fde047"/><stop offset="100%" stop-color="#eab308"/>
        </linearGradient>`
      },
      // 2. Dải kim tuyến xoắn Confetti vàng
      {
        svg: `<svg viewBox="0 0 60 100" class="leaf-svg" width="18" height="32">
          <path d="M20 5 Q45 25 15 50 Q45 75 20 95" stroke="url(#grad-ny-confetti-gold)" stroke-width="8" stroke-linecap="round" fill="none" />
        </svg>`,
        gradient: `<linearGradient id="grad-ny-confetti-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/>
        </linearGradient>`
      },
      // 3. Dải kim tuyến xanh sapphire & hồng neon
      {
        svg: `<svg viewBox="0 0 60 100" class="leaf-svg" width="18" height="32">
          <path d="M40 5 Q15 25 45 50 Q15 75 40 95" stroke="url(#grad-ny-confetti-cyan)" stroke-width="8" stroke-linecap="round" fill="none" />
        </svg>`,
        gradient: `<linearGradient id="grad-ny-confetti-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/><stop offset="50%" stop-color="#818cf8"/><stop offset="100%" stop-color="#f43f5e"/>
        </linearGradient>`
      },
      // 4. Tia pháo hoa lung linh
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="28" height="28">
          <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
            <line x1="50" y1="15" x2="50" y2="30" stroke="#f43f5e"/>
            <line x1="50" y1="70" x2="50" y2="85" stroke="#f43f5e"/>
            <line x1="15" y1="50" x2="30" y2="50" stroke="#38bdf8"/>
            <line x1="70" y1="50" x2="85" y2="50" stroke="#38bdf8"/>
            <line x1="25" y1="25" x2="36" y2="36" stroke="#fde047"/>
            <line x1="64" y1="64" x2="75" y2="75" stroke="#fde047"/>
            <line x1="25" y1="75" x2="36" y2="64" stroke="#a855f7"/>
            <line x1="64" y1="36" x2="75" y2="25" stroke="#a855f7"/>
          </g>
          <circle cx="50" cy="50" r="5" fill="#fef08a" />
        </svg>`,
        gradient: ``
      }
    ]
  },

  midautumn: {
    id: 'midautumn',
    name: 'Tết Trung Thu',
    icon: '🏮',
    badgeName: 'Hội Trăng Rằm',
    emblemIcon: 'fa-solid fa-moon',
    actionName: 'Đèn lồng bay lên cung trăng',
    actionIcon: 'fa-solid fa-moon',
    quote: '<i class="fa-solid fa-star"></i> "Đêm Hội Trăng Rằm" • Rước Đèn Trung Thu - Thắp Sáng Ước Mơ Học Trò Phước Sơn',
    densityDefault: 16,
    speedFactor: 0.9,
    particles: [
      // 1. Đèn Ông Sao 5 cánh truyền thống
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="32" height="32">
          <!-- Vòng tre tròn -->
          <circle cx="50" cy="50" r="32" stroke="#ea580c" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Ngôi sao đỏ viền vàng -->
          <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" fill="url(#grad-ma-star)" stroke="#fde047" stroke-width="2.2" />
          <circle cx="50" cy="50" r="8" fill="#fef08a" />
          <!-- Tua rua đèn -->
          <path d="M50 78 L50 95 M46 80 L44 95 M54 80 L56 95" stroke="#f43f5e" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`,
        gradient: `<linearGradient id="grad-ma-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444"/><stop offset="60%" stop-color="#dc2626"/><stop offset="100%" stop-color="#b91c1c"/>
        </linearGradient>`
      },
      // 2. Lồng đèn giấy tròn đỏ ấm áp
      {
        svg: `<svg viewBox="0 0 100 120" class="leaf-svg" width="28" height="34">
          <!-- Khung lồng đèn -->
          <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#grad-ma-lantern)" stroke="#fde047" stroke-width="2"/>
          <!-- Đường gân giấy xếp -->
          <path d="M50 23 L50 87 M30 28 Q20 55 30 82 M70 28 Q80 55 70 82" stroke="rgba(254, 240, 138, 0.45)" stroke-width="1.8" fill="none" />
          <!-- Nắp trên và dưới vàng -->
          <rect x="36" y="20" width="28" height="6" rx="2" fill="#eab308" />
          <rect x="38" y="85" width="24" height="6" rx="2" fill="#eab308" />
          <!-- Dây tua rua đỏ vàng -->
          <path d="M50 91 L50 115 M46 91 L44 112 M54 91 L56 112" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        gradient: `<radialGradient id="grad-ma-lantern" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#fca5a5"/><stop offset="40%" stop-color="#ef4444"/><stop offset="100%" stop-color="#991b1b"/>
        </radialGradient>`
      },
      // 3. Vầng trăng vàng rực rỡ
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="26" height="26">
          <circle cx="50" cy="50" r="38" fill="url(#grad-ma-moon)" />
          <circle cx="38" cy="38" r="8" fill="rgba(217, 119, 6, 0.15)" />
          <circle cx="62" cy="55" r="10" fill="rgba(217, 119, 6, 0.12)" />
        </svg>`,
        gradient: `<radialGradient id="grad-ma-moon" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#fde047"/><stop offset="100%" stop-color="#f59e0b"/>
        </radialGradient>`
      },
      // 4. Cánh hoa cúc vàng mùa thu
      {
        svg: `<svg viewBox="0 0 100 100" class="leaf-svg" width="22" height="26">
          <path d="M50 10 C62 30 70 60 50 92 C30 60 38 30 50 10 Z" fill="url(#grad-ma-petal)" />
        </svg>`,
        gradient: `<linearGradient id="grad-ma-petal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/><stop offset="60%" stop-color="#facc15"/><stop offset="100%" stop-color="#eab308"/>
        </linearGradient>`
      }
    ]
  }
};

class HolidayParticlesEngine {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentThemeId = options.theme || localStorage.getItem('school_ai_theme') || 'autumn';
    this.theme = THEMES_DATA[this.currentThemeId] || THEMES_DATA.autumn;

    this.options = Object.assign({
      density: this.theme.densityDefault,
      enabled: true,
      speedMultiplier: 1.0
    }, options);

    this.particles = [];
    this.timelines = [];
    this.isRunning = false;

    this.initSvgDefs();
    if (this.options.enabled) {
      this.start();
    }
  }

  // Khởi tạo defs SVG chứa gradient màu của tất cả các chủ đề
  initSvgDefs() {
    let defsContainer = document.getElementById('holiday-particles-svg-defs');
    if (!defsContainer) {
      defsContainer = document.createElement('div');
      defsContainer.id = 'holiday-particles-svg-defs';
      defsContainer.style.width = '0';
      defsContainer.style.height = '0';
      defsContainer.style.position = 'absolute';
      defsContainer.style.visibility = 'hidden';
      defsContainer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(defsContainer);
    }

    // Ghép toàn bộ gradients của cả 6 chủ đề
    const allGradients = Object.values(THEMES_DATA)
      .flatMap(t => t.particles.map(p => p.gradient))
      .filter(Boolean)
      .join('\n');

    defsContainer.innerHTML = `<svg><defs>${allGradients}</defs></svg>`;
  }

  // Chuyển đổi chủ đề linh hoạt
  setTheme(newThemeId) {
    if (!THEMES_DATA[newThemeId] || this.currentThemeId === newThemeId) return;

    this.currentThemeId = newThemeId;
    this.theme = THEMES_DATA[newThemeId];
    this.options.density = parseInt(localStorage.getItem('school_leaf_density') || this.theme.densityDefault, 10);

    // Cập nhật thuộc tính trên thẻ body
    document.body.setAttribute('data-theme', newThemeId);
    localStorage.setItem('school_ai_theme', newThemeId);

    // Dọn dẹp hạt cũ mượt mà và sinh hạt mới theo chủ đề
    this.timelines.forEach(tl => tl.kill());
    this.timelines = [];

    gsap.to(this.particles, {
      opacity: 0,
      scale: 0.3,
      duration: 0.4,
      stagger: 0.02,
      onComplete: () => {
        this.particles.forEach(p => p.remove());
        this.particles = [];
        if (this.isRunning) {
          this.spawnInitialBatch();
        }
      }
    });

    // Cập nhật giao diện bên ngoài (Banner quote, action button)
    this.updateUIElements();
  }

  updateUIElements() {
    // 1. Cập nhật câu biểu ngữ trên bảng phấn
    const quoteContainer = document.querySelector('.chalk-quote .quote-text');
    if (quoteContainer) {
      gsap.to(quoteContainer, {
        opacity: 0,
        y: -5,
        duration: 0.25,
        onComplete: () => {
          quoteContainer.innerHTML = this.theme.quote;
          gsap.to(quoteContainer, { opacity: 1, y: 0, duration: 0.3 });
        }
      });
    }

    // 2. Cập nhật nút bấm tương tác (Wind Gust / Special Action)
    const btnAction = document.getElementById('btn-wind-gust');
    if (btnAction) {
      btnAction.title = this.theme.actionName;
      btnAction.setAttribute('aria-label', this.theme.actionName);
      const icon = btnAction.querySelector('i');
      if (icon) {
        icon.className = this.theme.actionIcon;
      }
    }

    // 3. Cập nhật nhãn chọn chủ đề ở dropdown header
    const currentThemeLabel = document.getElementById('current-theme-label');
    const currentThemeIcon = document.getElementById('current-theme-icon');
    if (currentThemeLabel) currentThemeLabel.textContent = this.theme.name;
    if (currentThemeIcon) currentThemeIcon.textContent = this.theme.icon;

    // 4. Cập nhật biểu tượng Emblem trên Header
    const emblemIcon = document.getElementById('header-emblem-icon');
    if (emblemIcon && this.theme.emblemIcon) {
      gsap.to(emblemIcon, {
        scale: 0.3,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          emblemIcon.className = this.theme.emblemIcon;
          gsap.to(emblemIcon, { scale: 1, opacity: 1, duration: 0.25 });
        }
      });
    }

    // 5. Cập nhật huy hiệu lễ hội trên Board Subbar
    const festiveBadgeIcon = document.getElementById('festive-badge-icon');
    const festiveBadgeText = document.getElementById('festive-badge-text');
    if (festiveBadgeIcon) festiveBadgeIcon.textContent = this.theme.icon;
    if (festiveBadgeText) festiveBadgeText.textContent = this.theme.badgeName;
  }

  createParticle(isInitial = false) {
    if (!this.isRunning || !this.container) return;

    const el = document.createElement('div');
    el.className = 'leaf-particle';

    const pTypes = this.theme.particles;
    const selectedType = pTypes[Math.floor(Math.random() * pTypes.length)];
    el.innerHTML = selectedType.svg;

    // Chiều sâu không gian
    const scale = gsap.utils.random(0.65, 1.25);
    const opacity = gsap.utils.random(0.65, 0.95);

    this.container.appendChild(el);
    this.particles.push(el);

    this.animateParticle(el, scale, opacity, isInitial);
  }

  animateParticle(el, scale, opacity, isInitial = false) {
    if (!this.isRunning) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const startX = gsap.utils.random(-40, winW + 40);
    const startY = isInitial ? gsap.utils.random(-80, winH * 0.75) : -70;

    const driftX = gsap.utils.random(-140, 160);
    const endX = startX + driftX;
    const endY = winH + 80;

    // Thời gian rơi tùy thuộc vào tốc độ chủ đề
    const baseDuration = gsap.utils.random(7, 13) / (this.options.speedMultiplier * this.theme.speedFactor);

    gsap.set(el, {
      x: startX,
      y: startY,
      scale: scale,
      opacity: opacity,
      rotationX: gsap.utils.random(0, 360),
      rotationY: gsap.utils.random(0, 360),
      rotationZ: gsap.utils.random(-180, 180),
      transformPerspective: 600,
      transformOrigin: '50% 50%'
    });

    // 1. Quỹ đạo rơi thẳng xuống
    const mainTl = gsap.timeline({
      onComplete: () => {
        if (this.isRunning && this.particles.length <= this.options.density) {
          this.animateParticle(el, gsap.utils.random(0.65, 1.25), gsap.utils.random(0.65, 0.95), false);
        } else {
          this.removeParticle(el);
        }
      }
    });

    mainTl.to(el, {
      y: endY,
      duration: baseDuration,
      ease: 'none'
    });

    // 2. Chuyển động lượn sóng ngang (Sway)
    const swayDistance = gsap.utils.random(35, 90);
    const swayDuration = gsap.utils.random(2.2, 4.0);

    gsap.to(el, {
      x: `+=${swayDistance}`,
      duration: swayDuration,
      yoyo: true,
      repeat: Math.ceil(baseDuration / swayDuration),
      ease: 'sine.inOut'
    });

    // 3. Xoay 3D theo đặc trưng từng mùa
    if (this.currentThemeId === 'christmas') {
      // Tuyết rơi chao liêng nhẹ nhàng, ít nhào lộn mạnh
      gsap.to(el, {
        rotationZ: `+=${gsap.utils.random(60, 180)}`,
        duration: gsap.utils.random(5, 9),
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    } else if (this.currentThemeId === 'halloween') {
      // Dơi bay chớp nhoáng, liệng cánh
      gsap.to(el, {
        rotationZ: `+=${gsap.utils.random(-45, 45)}`,
        rotationY: '+=360',
        duration: gsap.utils.random(1.5, 3.5),
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      });
    } else {
      // Nhào lộn tự nhiên cho lá thu, cánh hoa xuân, confetti, lồng đèn
      gsap.to(el, {
        rotationX: '+=360',
        duration: gsap.utils.random(3, 7),
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(el, {
        rotationY: '+=360',
        duration: gsap.utils.random(2.5, 6),
        repeat: -1,
        ease: 'sine.inOut'
      });
      gsap.to(el, {
        rotationZ: `+=${gsap.utils.random(90, 270)}`,
        duration: gsap.utils.random(4, 8),
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      });
    }

    this.timelines.push(mainTl);
  }

  spawnInitialBatch() {
    for (let i = 0; i < this.options.density; i++) {
      setTimeout(() => {
        if (this.isRunning) this.createParticle(true);
      }, i * 140);
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.spawnInitialBatch();
  }

  stop() {
    this.isRunning = false;
    this.timelines.forEach(tl => tl.kill());
    this.timelines = [];

    gsap.to(this.particles, {
      opacity: 0,
      scale: 0.4,
      duration: 0.5,
      onComplete: () => {
        this.particles.forEach(p => p.remove());
        this.particles = [];
      }
    });
  }

  removeParticle(el) {
    const idx = this.particles.indexOf(el);
    if (idx > -1) this.particles.splice(idx, 1);
    el.remove();
  }

  setDensity(newDensity) {
    this.options.density = newDensity;
    if (this.isRunning) {
      if (this.particles.length < newDensity) {
        const diff = newDensity - this.particles.length;
        for (let i = 0; i < diff; i++) {
          this.createParticle(false);
        }
      } else if (this.particles.length > newDensity) {
        const diff = this.particles.length - newDensity;
        const toRemove = this.particles.splice(0, diff);
        gsap.to(toRemove, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => toRemove.forEach(p => p.remove())
        });
      }
    }
  }

  /**
   * KÍCH HOẠT HIỆU ỨNG TƯƠNG TÁC ĐẶC TRƯNG TỪNG CHỦ ĐỀ
   * - Mùa Thu: Cơn gió thổi lá vàng vút qua
   * - Giáng Sinh: Cơn bão tuyết trắng xoáy
   * - Halloween: Bầy dơi bay túa ra
   * - Tết: Gió xuân thổi tung cánh hoa đào mai & lì xì
   * - New Year: Pháo hoa bùng nổ kim tuyến
   * - Trung Thu: Đèn lồng bay vút lên cung trăng
   */
  triggerWindGust() {
    if (!this.isRunning || this.particles.length === 0) return;

    this.particles.forEach((p) => {
      const gustX = gsap.utils.random(240, 550);
      const gustY = gsap.utils.random(-80, 140);
      const gustRot = gsap.utils.random(180, 540);

      gsap.to(p, {
        x: `+=${gustX}`,
        y: `+=${gustY}`,
        rotationZ: `+=${gustRot}`,
        rotationX: '+=720',
        scale: '+=0.2',
        duration: gsap.utils.random(1.2, 2.0),
        ease: 'power2.out'
      });
    });

    // Bổ sung hạt bay nhanh qua màn hình tạo hiệu ứng cực đã
    const pTypes = this.theme.particles;
    for (let i = 0; i < 8; i++) {
      const extra = document.createElement('div');
      extra.className = 'leaf-particle';
      const selected = pTypes[Math.floor(Math.random() * pTypes.length)];
      extra.innerHTML = selected.svg;
      this.container.appendChild(extra);

      const startY = gsap.utils.random(50, window.innerHeight * 0.85);
      gsap.set(extra, {
        x: -80,
        y: startY,
        scale: gsap.utils.random(0.8, 1.4),
        opacity: 0.95
      });

      gsap.to(extra, {
        x: window.innerWidth + 120,
        y: startY + gsap.utils.random(-100, 180),
        rotationZ: 720,
        rotationY: 720,
        duration: gsap.utils.random(1.4, 2.4),
        ease: 'power1.inOut',
        onComplete: () => extra.remove()
      });
    }
  }
}

// Tương thích ngược: Đặt cả HolidayParticlesEngine và AutumnLeavesEngine
window.HolidayParticlesEngine = HolidayParticlesEngine;
window.AutumnLeavesEngine = HolidayParticlesEngine;
window.THEMES_DATA = THEMES_DATA;
