from pathlib import Path


def test_index_contains_react_mount_and_assets():
    index_html = (Path(__file__).parents[1] / "index.html").read_text(encoding="utf-8")

    assert '<div id="root">' in index_html
    assert "https://unpkg.com/react@18/umd/react.development.js" in index_html
    assert "https://unpkg.com/react-dom@18/umd/react-dom.development.js" in index_html
    assert '<script src="app.js"></script>' in index_html
    assert '<link rel="stylesheet" href="styles.css">' in index_html
