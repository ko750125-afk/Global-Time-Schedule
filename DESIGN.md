# 🎨 Design System: Global Aurora (Meeting Calculator)

병일아! 전 세계를 연결하는 **글로벌 미팅 계산기**의 디자인 가이드야. 
Stitch MCP의 정수를 담아 '연결성'과 '시간의 흐름'을 테마로 잡았어. ✨

---

## 1. 디자인 컨셉: "The Ethereal Connection" (공기처럼 투명한 연결)
이 시스템은 시차라는 장벽을 허물고 마치 옆방에 있는 것처럼 느낄 수 있는 투명한 인터페이스를 지향해.

### 핵심 키워드
- **Flow Control**: 부드러운 타임 슬라이더로 시간의 흐름을 조절.
- **Glassmorphism 3.0**: 각 카드의 배경이 레이어처럼 겹쳐지는 깊이감.
- **Time Aurora**: 밤낮의 변화를 은은한 그라데이션으로 표현.

---

## 2. 컬러 팔레트 (Time Spectrum)
| 역할 | 컬러명 | 코드 (Hex) | 느낌 |
| :--- | :--- | :--- | :--- |
| **Primary** | Aurora Teal | `#58a6ff` | 메인 액션, 현재 시간 강조 |
| **Secondary** | Twilight Violet | `#bc8cf2` | 밤/취침 상태, 보조 정보 |
| **Success** | Working Mint | `#3fb950` | 근무 가능 시간 (Golden Time) |
| **Base** | Space Black | `#0d1117` | 깊고 차분한 배경 |

---

## 3. 타이포그래피
- **Main Font**: `Outfit` (현대적이고 깔끔한 느낌)
- **Time Display**: `Outfit` (Bold), 자간 `-0.05em`으로 가독성 극대화.

---

## 4. 핵심 UI 요소
### ✨ Glass Cards
- `background: rgba(22, 27, 34, 0.7)`
- `backdrop-filter: blur(20px)`
- `border: 1px solid rgba(255, 255, 255, 0.1)`

### 🕒 Interactive Slider
- 중앙 집중식 컨트롤로 모든 카드의 상태를 실시간 제어.
