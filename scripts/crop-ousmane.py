from PIL import Image, ImageDraw, ImageFilter
import numpy as np

img = Image.open('src/assets/ousmane.jpeg').convert('RGB')
w, h = img.size

# ─────────────────────────────────────────────────────────────────
# 1. PORTRAIT CLOSE (Visage + Col + Haut du torse, À Propos)
# ─────────────────────────────────────────────────────────────────
# Box: x in [300, 670], y in [250, 750]
# In this region:
# - Cap apex: (485, 255)
# - Left cap: from (485, 255) to (345, 365)
# - Left ear / cheek: (335, 410)
# - Left neck: (380, 510)
# - Left shoulder (t-shirt): (310, 650) to (300, 750)
# - Right cap: from (485, 255) to (615, 365)
# - Right ear / cheek: (630, 410)
# - Right neck: (575, 510)
# - Right shoulder (t-shirt): (640, 650) to (670, 750)

# Outside Ousmane:
# - top: text at y < 255
# - top-left: orange ring of circuit board at x < 350, y < 350
# - middle-left: text at x < 320, y in [480, 600]
# - top-right: split AC and outdoor AC at x > 640, y < 580

# We create a smooth mask that keeps Ousmane and clears everything outside to transparent / clean white!
crop_close = img.crop((300, 255, 665, 740)).convert('RGBA')
cw, ch = crop_close.size

# Coordinates relative to crop_close (offset x=300, y=255):
# Create polygon for Ousmane in close crop:
ousmane_poly_close = [
    (185, 5),    # top of cap
    (240, 25),
    (300, 75),
    (315, 115),   # right cap edge
    (315, 155),   # right ear
    (275, 230),   # right neck
    (280, 280),   # right neck base
    (315, 340),   # right shoulder
    (325, 480),   # right torso edge
    (0, 480),     # bottom
    (20, 340),    # left shoulder
    (80, 255),    # left neck
    (35, 155),    # left ear
    (55, 105),    # left cap edge
    (125, 25),
]

mask_close = Image.new('L', (cw, ch), 0)
draw_close = ImageDraw.Draw(mask_close)
draw_close.polygon(ousmane_poly_close, fill=255)
# Soft feather for natural boundary
mask_close_feathered = mask_close.filter(ImageFilter.GaussianBlur(1.5))

# Also extract the background color or make transparent:
crop_close_trans = crop_close.copy()
crop_close_trans.putalpha(mask_close_feathered)

# Also create a version with clean white studio background:
bg_white_close = Image.new('RGBA', (cw, ch), (255, 255, 255, 255))
bg_white_close.paste(crop_close, (0, 0), mask_close_feathered)

# Save close portraits
crop_close_trans.save('public/assets/portrait-ousmane-close.webp', 'WEBP', quality=92)
bg_white_close.save('scratch/portrait-ousmane-close-white.png')


# ─────────────────────────────────────────────────────────────────
# 2. PORTRAIT HERO (Visage + Torse + Outils, sans aucun texte)
# ─────────────────────────────────────────────────────────────────
# Bounding box on flyer: x in [220, 830], y in [255, 855]
# Bottom y=855 is just above the orange "Dakar, Rue fleuriste..." banner.
crop_hero = img.crop((215, 255, 835, 855)).convert('RGBA')
hw, hh = crop_hero.size

# Coordinates relative to crop_hero (offset x=215, y=255):
# Top of cap: (270, 5)
ousmane_poly_hero = [
    (270, 5),     # top of cap (485-215, 260-255)
    (330, 25),
    (385, 75),
    (400, 115),   # right cap edge
    (400, 155),   # right ear
    (360, 230),   # right neck
    (365, 280),   # right neck base
    (400, 340),   # right shoulder
    (440, 410),   # upper right arm
    (615, 430),   # wrench & left hand
    (615, 595),   # bottom right
    (0, 595),     # bottom left
    (35, 430),    # multimeter & right hand
    (105, 410),   # upper left arm
    (165, 340),   # left shoulder
    (165, 255),   # left neck
    (120, 155),   # left ear
    (140, 105),   # left cap edge
    (210, 25),
]

mask_hero = Image.new('L', (hw, hh), 0)
draw_hero = ImageDraw.Draw(mask_hero)
draw_hero.polygon(ousmane_poly_hero, fill=255)
mask_hero_feathered = mask_hero.filter(ImageFilter.GaussianBlur(1.8))

crop_hero_trans = crop_hero.copy()
crop_hero_trans.putalpha(mask_hero_feathered)

# Clean white background version
bg_white_hero = Image.new('RGBA', (hw, hh), (255, 255, 255, 255))
bg_white_hero.paste(crop_hero, (0, 0), mask_hero_feathered)

# Save hero portrait (both transparent WebP and white studio WebP)
crop_hero_trans.save('public/assets/portrait-ousmane.webp', 'WEBP', quality=92)
bg_white_hero.save('public/assets/portrait-ousmane-studio.webp', 'WEBP', quality=92)

print("Saved clean portraits:")
print(f"portrait-ousmane-close.webp: {crop_close_trans.size}")
print(f"portrait-ousmane.webp: {crop_hero_trans.size}")
