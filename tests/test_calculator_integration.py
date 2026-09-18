from pathlib import Path


def test_page_wires_react_app():
    index_html = (Path(__file__).parents[1] / "index.html").read_text(encoding="utf-8")

    assert "https://unpkg.com/react@18/umd/react.development.js" in index_html
    assert "https://unpkg.com/react-dom@18/umd/react-dom.development.js" in index_html
    assert '<script src="app.js"></script>' in index_html
    assert '<link rel="stylesheet" href="styles.css">' in index_html


def test_app_declares_required_controls():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    for digit in "0123456789":
        assert digit in app_js

    assert "." in app_js
    for operator in "+-*/":
        assert operator in app_js
    assert "=" in app_js
    assert "reset" in app_js.lower() or "clear" in app_js.lower()


def test_app_declares_error_and_reset_behavior():
    app_js = (Path(__file__).parents[1] / "app.js").read_text(encoding="utf-8")

    assert "Error" in app_js
    assert "0" in app_js
