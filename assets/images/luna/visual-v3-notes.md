# LUNA 게임 화면 V3 자산

내장 image_gen으로 생성한 PNG를 그대로 복사했다. 비교 기준 커밋은 `c683c8a`이다. 배경은 동일한 1672×941 RGB, 식재와 Lotus는 기존 V2 RGBA를 사용한다.

---

## 현재 적용

- `garden-dormant-v3.png`: 밀도 있는 온실 식재·돌길·작은 연못의 복구 전 배경.
- `garden-restored-fresh-v3.png`: 같은 구도의 밝고 산뜻한 복구 후 배경. 군락별 마스크와 최종 Lotus 전체 전환에 사용.
- `prism-turns.png`, `prism-pedestal.png`: 사용자가 선택한 기존 가늘고 비대칭인 결정·아이보리 받침.
- `botanical-states-v2.png`, `lotus-states-v2.png`: 세 가지 식재와 Lotus의 휴면/개화.

`garden-restored-v3.png`, `prism-optical-v3.png`, `pedestal-v3.png`와 V2 배경·Prism은 비교용 미사용 자산이다. 현재 파일 참조를 기준으로 판단한다.

---

## 최종 생성 프롬프트

### 복구 전

A production background for an exquisite dreamy botanical puzzle game, LUNA LIGHT GARDEN. Widescreen 16:9 landscape, no text or interface. Elevated 45 degree garden view, NOT looking straight at a wall and NOT a topdown plan. An intimate magical glasshouse garden under soft pearly moonlight, elegant curved bronze and clear glass ribs framing upper corners, lush fine fern fronds, silvery sage foliage and soft moss throughout, pale lilac and ivory CLOSED flower buds. A winding narrow path of beautifully weathered small limestone stepping stones connects planting islands through the CENTER of the composition, a rich garden to explore, not an empty paved plaza, not a circular arena. Only 20% exposed stone, 65% planted moss and low foliage, 8% small water, balance delicate architecture. Center composition: small shallow lotus pool at image x51% y37%, no large lotus (separate sprite added). Four modest clear mossy patches for small optical devices at x29% y37%, x29% y61%, x66% y61%, x66% y37%, no devices or pedestals baked in. Low planted bed between those patches in center around x48% y54%, intricate feathered ferns and delicate closed buds, do not block straight imaginary lines between the four patches. Additional natural flower bed anchor areas x16% y61%, x82% y37%, x66% y82%, all integrated within surrounding planting, no potted plants. Graceful airy foliage, varied sizes, organic growth. No huge leaves or giant flowers, no statues, no mushrooms, no crystals. Color palette luminous soft blue-green, silver sage, ivory, subtle lavender and a little champagne warmth. Rich but quiet mids, clean detail, dreamy depth, restrained soft haze only in distance. Beautiful botanical environment, cinematic art direction, NO neon, no glitter or speckled sparkles. Full bleed to all edges; calm dark-toned foliage only in top 12% and lower 10% for overlay UI. The viewer should feel inside a living enchanting garden rather than a blue cave or empty showroom. Fine natural materials, painterly cinematic realism, polished high-end game background.


### 복구 후 중간 편집

Edit the latest image: the dense botanical glasshouse with central small pond and moss patches. Produce restored blooming state of this EXACT background. Preserve EXACT camera, framing, every glasshouse rib, stone, path, clear mossy patch, pond edge and foliage position so the two images can crossfade in place. Only open existing closed buds into airy ivory lilies, soft lilac star flowers and a few pale peach blossoms around outer beds and central planted island. Do not cover everything with white speckles. Raise local reflected light on nearby leaves and make foliage slightly fresher, retaining the same overall cool moonlit exposure. Soft ivory centers in a few flowers and slightly brighter water reflection. NO fairy dust, new objects, large lotus, crystals, interfaces, text or composition changes. Same widescreen resolution. Believable restrained restoration, clear elegant petals, no neon, no glitter.


### 복구 후 최종 밝기·색감 편집

Edit the displayed full garden background into the fully restored LUNA LIGHT GARDEN at joyful NOVA LAND. Keep EXACT composition, camera, every plant bed, stone path, small pond and architecture unchanged for aligned game-state crossfade. It is too dark, grey and melancholic now. Make restored garden distinctly CLEAR, FRESH, LUMINOUS and HOPEFUL: brighter natural mint and fresh sage-green leaves with soft chartreuse new growth, clean ivory and pale peach blossoms, delicate lavender flowers, pearly blue transparent glass arches and soft champagne reflected highlights. Magical evening/blue-hour with generous luminous ambient light, lifted midtones and open readable shadows, as though life and soft light returned. Center and planted beds are distinctly brighter and fresher. Pale aqua pond reflection. NO blown white highlights or foggy grey veil, no flat exposure filter. Change lighting and natural plant color, keeping depth and fine detail while removing gloomy blue-black/olive cast. Keep clear sophisticated night garden mood. Floral magic rather than neon. No new objects, fireflies, glitter, fluorescent outlines, giant flowers, text or UI. Same exact full-bleed widescreen layout.

---

## 검증과 한계

PNG 무결성·크기·색상 모드를 확인했다. 경로 참조 편집에서 발생한 PNG 읽기 오류는 대화 이미지 참조로 재시도해 생성했다. 브라우저에서 부분 복구·전체 개화·재시작을 확인했으며 정확한 검수 범위는 roadmap.md에 기록한다. 생성 이미지의 상태 전환이며 실제 3D 식물 생장이나 연속 결정 회전 모델은 아니다.
