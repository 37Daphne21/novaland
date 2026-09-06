# LUNA 게임 화면 V2 자산과 검수

비교 기준 커밋: `c683c8a`. 새 자산은 내장 `image_gen`으로 제작하고 생성 파일의 RGB/RGBA를 그대로 프로젝트에 복사했다. 기존 자산은 비교용으로 보존한다. 체크무늬가 불투명하게 생성된 4방향 가로 시트는 사용하지 않는다.

---

## 적용 자산

- `garden-full-v2.png`: 전체 화면 온실. 비율 유지 Cover, Lotus 높이에 맞춘 위치 기준. 게임 요소 좌표는 기존 광학 보드 데이터 유지.
- `botanical-states-v2.png`: 3열 × 2행. 백합·별꽃·살구빛 꽃의 휴면/개화. 실제 RGBA.
- `prism-materials-v2.png`: 2열 중 왼쪽의 이끼가 있는 낮은 석재 받침 사용. 오른쪽 단일 결정은 최종 화면에서 미사용.
- `prism-views-v2.png`: 2열 × 2행의 실제 RGBA 90° 방향 시트. 고정 받침과 별도 연결면을 유지. 연속 3D 렌더링은 아님.
- `lotus-states-v2.png`: 2열 휴면/개화. 물 위의 잎만 남기고 아래로 늘어진 뿌리 없는 실제 RGBA.

---

## 최종 생성 프롬프트

### garden-full-v2.png

Create a production-quality background asset for LUNA LIGHT GARDEN, an elegant dreamlike botanical light puzzle game. Widescreen 16:9 landscape, highest resolution. No text, UI, icons, crystals, pedestals or big specimen flowers (interactive objects are added separately). An elevated three-quarter overhead view DOWN into a magical Victorian glass conservatory at night, lush delicate botanical gardens, clear pale blue moonlight with restrained champagne highlights, transparent curved glass roof arches visible only on the upper and side edges. The playable center 70% is a calm broad oval terrace of aged fine pale blue-grey stone, subtly mossy seams and tiny low groundcover around its edges, NOT a maze of paths. It must feel like a real exquisite garden, not a blue cavern. Central luminous clear space for objects at x30% y38%, x30% y64%, x68% y64%, x68% y38%. A SMALL shallow naturally edged lotus pool around x50% y37%, clear calm water and a few small plain lily pads but no lotus flower. The main water feature occupies less than 8% of the image. Detailed soft fern beds and lush fine foliage with scattered small ivory/lavender flowers frame the entire left and right edges with no blank borders. Foreground plants are delicate not enormous leaves. The upper 13% and bottom 12% remain restrained for overlay interface; preserve continuity and atmosphere there with architecture and shadowed vegetation, no black bars. Beautiful luminous center with believable occlusion and rich depth. Color palette blue-green foliage, silvery slate, ivory moonlight, gentle warm brass; no neon, no glitter storms, no glowing mushrooms, no text, no busy particles. Fine premium fantasy film environment art, graceful natural growth, clean tonal separation, no muddy painted textures. FULL BLEED all edges.


### botanical-states-v2.png

Production game sprite atlas, transparent RGBA background, landscape 3:2 canvas. EXACTLY SIX isolated botanical garden clumps arranged in an evenly spaced 3-column by 2-row grid, each occupies its own square cell with 12% clear padding. NO labels, no text, no visible grid, no background, no containers or pots, no cast shadow beyond cell. Render realistic premium fantasy botanical art from 40 degree elevated front view, cool soft moonlight from upper left, controlled ivory highlights NOT overexposed, detailed natural foliage, moss ground hugging at base with feathered organic edges. TOP ROW shows dormant closed buds, BOTTOM ROW same three plants at IDENTICAL scale, placement, foliage, base and camera with opened flowers. Column1: a graceful small planting of five upright ivory moon lilies, narrow arching muted sage leaves, subtle creamy pale pink petal undersides, airy silhouette not a dense ball. Column2: a low broad soft natural mound of delicate pale lavender star-shaped bellflowers with small fern fronds and tiny silver green leaves, lower height than lilies. Column3: an elegant spreading airy clump of pale peach and champagne cosmos flowers on slender branching stems above muted feathery foliage. All three distinct silhouettes, beautiful refined plants, full plants including subtle mossy roots, not floating bouquets. In top row all main flower heads closed; bottom all open. Do not add sparkles or magical glow. Truly transparent outside all plant silhouettes, high-quality alpha cutouts for compositing into a moonlit conservatory.


### prism-materials-v2.png

Transparent RGBA game asset sprite sheet, 2:1 landscape canvas divided into TWO equal square cells. Left cell: a low wide circular aged blue-grey limestone pedestal viewed from 40 degree elevated front camera, shallow cylindrical thickness, visible oval top face with refined thin brushed champagne brass inlaid concentric rings, subtle botanical engraving, a little real moss nestled around the base perimeter, no crystal. RIGHT cell: one squat broad beautifully faceted CLEAR optical crystal, an asymmetrical cut quartz prism like a fine optical jewel, width nearly equal to height, tapered pointed top, translucent cool colorless glass with broad clean triangular cut faces, soft pearl-white upper-left reflections and very subtle mint refraction, no neon glow, no rainbow, no jewellery setting, no pedestal. Crystal stands upright but is SHORT and BROAD rather than a tall icicle. Each object precisely centered in own cell with 15% transparent padding all sides. Physical realistic material, premium moonlit fantasy conservatory puzzle art. Stone should be muted cool medium grey, not bright cream. No text, no frame, no scene or colored backdrop. Truly transparent alpha surrounding both subjects. Matched scale and camera for a game that will overlay the crystal on the pedestal center; separate independent objects.


### prism-views-v2.png

Transparent RGBA PNG production sprite sheet: FOUR upright clear glass quartz prisms in a TWO BY TWO layout on real alpha transparent background (not checkerboard). Square canvas. Each equal square cell contains one short wide asymmetric faceted optical crystal, same size, center and baseline with 15% clear padding. Top left front view, top right right-side view, bottom left rear view, bottom right left-side view: same asymmetric crystal rotated in 90 degree increments about upright vertical axis, fixed elevated 40 degree camera. Colorless clear optical glass with a tiny hint of cool mint, clean broad facets, subtle white moonlight from upper left, not milky rock, not icicle. No pedestal, no jewellery setting, no environment, no shadow outside object, no labels or text. CRITICAL actual transparent PNG alpha outside silhouettes. Do not paint a checkerboard. Keep the glass grounded on identical cell baseline and do not change camera angle between views. Fine crisp premium game prop with believable refraction, no glitter, no intense glow.


### lotus-states-v2.png

Two-state production game sprite atlas, wide 2:1 canvas, TWO equal square cells. Genuine RGBA transparent background. A beautiful single pale ivory-pink lotus floating directly on a small cluster of flat muted jade lily pads, elevated 45 degree overhead camera. LEFT cell one graceful closed lotus bud. RIGHT cell the identical lotus fully opened into a beautiful layered ivory flower, extremely subtle pale pink tips, warm pale gold stamens. Exact same lily pads, scale, ground anchor and camera both cells. Refined realistic translucent thin petals under cool moonlight from upper left, subtle warm interior light only in open flower. The pads lie perfectly FLAT on the water plane, NO hanging roots, NO visible stem underneath, NO dirt or floating island, NO water backdrop, NO vessel or pedestal. A clean transparent alpha cutout following the pad edges, ample padding 15% each cell. High detail premium elegant fantasy botanical game art, avoid glitter grain or metallic leaf texture. Color must be quiet and natural, not neon or oversaturated. No text, checkerboard, borders or labels. All outside pixels actually transparent alpha zero.
