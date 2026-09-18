# Calculator_foreman

## 파일 구조

- `index.html`: 계산기 페이지의 진입 문서입니다. React가 마운트될 `#root` 영역과 계산기 표시 영역 및 조작부를 제공하고, `styles.css`와 `app.js`를 연결합니다.
- `app.js`: 계산기의 핵심 계산 로직과 상태 변경 동작을 정의합니다. 사칙연산, 소수 입력, 오류 처리, 초기화 동작을 포함하며 `window.CalculatorCore`를 통해 핵심 로직을 노출합니다. React UI에서 사용할 계산기 버튼도 선언합니다.
- `styles.css`: 계산기 컨테이너, 표시 영역, 버튼 조작부의 레이아웃과 시각 스타일을 정의합니다. 화면 너비에 따른 반응형 레이아웃도 포함합니다.
- `tests/`: 저장소 파일을 대상으로 계산기 동작과 페이지 연결 상태를 검증하는 테스트가 들어 있습니다.

## 검증 방법

저장소 루트에서 다음 명령을 실행합니다.

```bash
pytest -q
```

테스트는 다음 내용을 검증합니다.

- 계산기 핵심 계약과 사칙연산, 소수 계산, 0으로 나누기 오류, 초기화 동작
  - `test_calculator_core_contract_is_present`
  - `test_addition_vector`
  - `test_decimal_vector`
  - `test_division_by_zero_vector`
  - `test_clear_vector`
- 페이지의 React 연결과 필수 계산기 컨트롤
  - `test_page_wires_react_app`
  - `test_app_declares_required_controls`
  - `test_app_declares_error_and_reset_behavior`
- 계산기 레이아웃과 정적 자산 연결
  - `test_styles_define_calculator_layout`
  - `test_index_loads_stylesheet`
  - `test_index_contains_react_mount_and_assets`

