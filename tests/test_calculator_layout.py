from pathlib import Path


def test_styles_define_calculator_layout():
    styles = (Path(__file__).parents[1] / "styles.css").read_text(encoding="utf-8")

    assert "box-sizing: border-box" in styles
    assert ".calculator" in styles
    assert "display: flex" in styles
    assert "max-width: 100%" in styles
    assert ".calculator-controls" in styles
    assert "display: grid" in styles
    assert "grid-template-columns" in styles
    assert ".calculator-display" in styles
    assert "overflow-wrap" in styles
    assert "@media" in styles
    assert "max-width: 30rem" in styles


def test_index_loads_stylesheet():
    index_html = (Path(__file__).parents[1] / "index.html").read_text(encoding="utf-8")

    assert '<link rel="stylesheet" href="styles.css">' in index_html
