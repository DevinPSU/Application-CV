#!/usr/bin/env python3
"""
Embeds all external images in the Senior Journal Article .htm file as
base64 data URIs, making the file fully self-contained for iframe use.
"""

import base64
import mimetypes
import re
from pathlib import Path
from urllib.parse import unquote

HTM_FILE = Path("Senior Journal Article Devin Hendrix Spr 2024 Final Draft From html.htm")

def embed_images(htm_path: Path) -> None:
    content = htm_path.read_text(encoding="utf-8", errors="replace")

    pattern = re.compile(r'src="([^"]*)"')
    missing = []
    replaced = 0

    def replace_src(match):
        nonlocal replaced
        raw_src = match.group(1)
        # Skip already-embedded data URIs
        if raw_src.startswith("data:"):
            return match.group(0)

        img_path = htm_path.parent / unquote(raw_src)
        if not img_path.exists():
            missing.append(raw_src)
            return match.group(0)

        mime, _ = mimetypes.guess_type(str(img_path))
        if mime is None:
            suffix = img_path.suffix.lower()
            mime = {"png": "image/png", "gif": "image/gif",
                    "jpg": "image/jpeg", "jpeg": "image/jpeg",
                    "svg": "image/svg+xml"}.get(suffix.lstrip("."), "image/png")

        data = base64.b64encode(img_path.read_bytes()).decode("ascii")
        replaced += 1
        return f'src="data:{mime};base64,{data}"'

    new_content = pattern.sub(replace_src, content)

    out_path = htm_path.with_stem(htm_path.stem + "_embedded")
    out_path.write_text(new_content, encoding="utf-8")

    print(f"Done: {replaced} image(s) embedded -> {out_path.name}")
    if missing:
        print(f"Warning: {len(missing)} image(s) not found:")
        for m in missing:
            print(f"  {m}")

if __name__ == "__main__":
    if not HTM_FILE.exists():
        print(f"ERROR: '{HTM_FILE}' not found. Run this script from the project root.")
    else:
        embed_images(HTM_FILE)
