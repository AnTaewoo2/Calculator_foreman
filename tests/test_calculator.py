from pathlib import Path


def test_calculator_core_contract_is_present():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "window.CalculatorCore" in app_js
    assert "Error" in app_js


def test_addition_vector():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "2 + 3" in app_js or "2, 3" in app_js
    assert "5" in app_js


def test_decimal_vector():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "1.5" in app_js
    assert "3" in app_js


def test_division_by_zero_vector():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "8 / 0" in app_js or "8, 0" in app_js
    assert '"Error"' in app_js


def test_clear_vector():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "display: \"0\"" in app_js
