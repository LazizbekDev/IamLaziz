from PIL import Image, ImageDraw

BG = (8, 8, 8, 255)
GLOW = (17, 17, 17, 255)
CREAM = (242, 239, 232, 255)
LIME = (232, 255, 71, 255)

BASE = 512  # design coordinate space

def draw_icon(size, rounded=True, corner_ratio=96/512):
    scale = size / BASE
    img = Image.new("RGBA", (size, size), (0,0,0,0))
    draw = ImageDraw.Draw(img)

    radius = int(BASE * corner_ratio * scale) if rounded else 0

    # background
    draw.rounded_rectangle([0,0,size-1,size-1], radius=radius, fill=BG)

    # subtle overlay tone (kept flat at small sizes, ImageMagick removed to avoid mud at 16px)
    if size >= 64:
        draw.rounded_rectangle([0,0,size-1,size-1], radius=radius, fill=None)

    # monogram L, built from the same coordinate ratios as the master SVG (512 space)
    def pt(x, y):
        return (x*scale, y*scale)

    l_poly = [
        pt(168,96), pt(168,344), pt(416,344),
        pt(416,416), pt(96,416), pt(96,96),
    ]
    draw.polygon(l_poly, fill=CREAM)

    # lime accent dot (the cursor dot from the site)
    cx, cy, r = 400*scale, 400*scale, 42*scale
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=LIME)

    return img

sizes_png = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
    "apple-touch-icon.png": 180,   # apple wants no transparency + slight padding, handled below
}

for name, size in sizes_png.items():
    if name == "apple-touch-icon.png":
        # Apple ignores alpha and adds its own rounding, so give a square, non-transparent, well-padded icon
        img = Image.new("RGBA", (size, size), BG)
        inner = draw_icon(size, rounded=False)
        img.alpha_composite(inner)
        img = img.convert("RGB")
        img.save(name)
    else:
        img = draw_icon(size, rounded=True)
        img.save(name)

# multi-size .ico
ico_sizes = [16, 32, 48]
base_img = draw_icon(256, rounded=True)
base_img.save("favicon.ico", sizes=[(s,s) for s in ico_sizes])

print("done")
