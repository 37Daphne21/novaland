# LUNA 게임 자산 제작 기록

내장 image_gen 도구로 생성한 투명 PNG를 원본 알파 그대로 복사했다. 아래는 생성에 사용한 최종 프롬프트다. 정원 배경과 공통 EVE 원본은 이번 작업에서 변경하지 않았다.

---

## prism-turns.png

Use case: stylized-concept. Production transparent PNG horizontal sprite atlas for premium botanical light puzzle game, four equal square cells in ONE row, 4:1 overall canvas. Same single elegant tall three-dimensional clear optical crystal mounted in a small slim brass collar, NO pedestal, NO text, NO labels, NO background. Each crystal centered in its own equal cell with identical scale, position and silhouette bounding box, generous transparent margins. Four successive orientations rotated about the UPRIGHT VERTICAL AXIS by 0,90,180,270 degrees, camera fixed elevated three-quarter view looking down 35 degrees. The gemstone is a slender hexagonal quartz optical prism with an asymmetrical diagonal cut at its top so rotation can be seen, elongated rather than wide triangular. Distinct front side and top facets, pale icy mint transparent glass, internal pearly refractions and crisp white highlights, subtle champagne edges, photoreal AAA fantasy prop render. All four remain upright, no spinning upside-down. Restrained glow, premium pristine clarity, bright readable faceted glass not dark muddy cyan. True transparent alpha background.

실제 출력은 2172×724이며 가로 네 칸을 CSS 배경 위치로 표시한다. 받침·연결면과 결정 이미지는 분리되어 있다. 연속 3D 회전 렌더링은 아니다.

---

## prism-pedestal.png

Use case: stylized-concept. One production game asset isolated on true transparent alpha background. A low round ancient pale limestone optical pedestal, elevated three-quarter view looking downward 35 degrees. The visible top is a broad ellipse, substantial carved cylindrical stone side wall with two shallow steps beneath, clear believable 3D thickness, soft contact shadow under base. Top has fine concentric engraved botanical orbits and FOUR tiny inset pale brass socket notches at north east south west, clean central round mounting socket empty. Weathered ivory limestone with soft blue-grey shadows, very thin champagne brass trim, a few tiny moss tufts at foot edges. Beautiful elegant greenhouse artifact, not technology console, not a flat plate. Crisp photoreal AAA fantasy render, restrained natural materials, readable bright top illuminated from upper left. No crystal, no text, no numbers, no enclosing scene. Entire object fully contained with generous transparent margin. 1024 square composition.

---

## flower-bed-states.png

Production sprite atlas for a beautiful botanical moonlit greenhouse game, true transparent alpha background. TWO EQUAL SQUARE CELLS SIDE BY SIDE (2:1 overall), exact same planted low flower bed in sleeping and awakened state. Fixed elevated three quarter camera looking down 40 degrees. LEFT CELL: sleeping clump of SEVEN slim closed lily buds of varied small heights among dense rich green little leaves, graceful fern fronds, tiny groundcover and irregular soft moss carpet. RIGHT CELL: exact same bed and same foliage positions, buds now opened into creamy ivory and very pale lavender star lilies with warm delicate pollen, several tiny companion flowers open along bottom. Natural varied sizes, not one oversized bouquet. Both beds much wider than tall, grounded sprawling island with ragged organic perimeter tapering to transparency, no pot, no slab, no floating root ball. Same scale and framing both cells, botanical details pristine, light soft and clear upper left with blue hour shadow, photoreal AAA fantasy game material. Center each bed in its cell, entire plant fully contained inside equal margins. No separate background, no UI, no text, no black rectangle, no excessive sparkle, no neon. Upper and side translucent petals catch subtle pearl light. Matched low silhouette, all foliage remains stationary between cells for state crossfade.

---

## lotus-states.png

Use case stylized-concept. Production transparent PNG TWO STATE sprite atlas, two equal square cells side by side. Same magical botanical Lotus rooted on a floating cluster of three broad veined lotus leaves. Left cell: elegant CLOSED ivory lavender lotus bud. Right cell: same Lotus FULLY OPEN with many delicate translucent ivory pearl petals, subtle pale lavender tips and warm golden stamens, breathtaking luminous yet natural. Both cells same fixed elevated three quarter camera down40 degrees, same scale anchor and leaf positions, each subject centered and fully inside its equal cell with empty margins. Single medium lotus, low wide silhouette, leaf platform seen as ellipse. Crisp photoreal fantasy asset, soft blue hour ambient and bright natural ivory highlights, rich sage leaves, subtle golden heart, no neon. True transparent alpha all around and between cells, no water rectangle, no pedestal, no text or label. No excessive sparkle, no opaque background.

화면에서는 CSS 마스크로 뿌리 아래쪽을 수면에 연결하고 두 상태를 교차 전환한다. 생성된 두 상태의 잎 위치는 완전히 동일하지 않으며 꽃잎별 골격 애니메이션은 아니다.

---

## 기존 자산 보존

`cluster-bud.png`, `cluster-bloom.png`, `prism-crystal.png`는 이전 샘플의 원본을 보존한 것이며 현재 화면에서 참조하지 않는다. `garden-sample-bg.png`와 `prism.svg`는 현재도 사용한다.
