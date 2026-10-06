from PIL import Image

img = Image.open('src/assets/ousmane.jpeg')
w, h = img.size
print(f"Original size: {w}x{h}")

# Let's define candidates for objects based on visual inspection:
# 1. Raccord PVC: circle top left
# 2. Carte électronique: next to PVC
# 3. Split clim intérieur: top right
# 4. Unité extérieure clim: middle right
# 5. Caméra dôme: right (and/or left)
# 6. Pompe bleue: left
# 7. Ousmane portrait & close

crops = {
    "raccord_pvc": (30, 200, 215, 360),
    "carte_electronique": (210, 215, 385, 360),
    "split_clim": (660, 210, 885, 345),
    "unite_exterieure": (630, 335, 845, 470),
    "camera_dome_right": (770, 400, 896, 560),
    "camera_dome_left": (30, 680, 185, 805),
    "pompe_bleue": (20, 565, 195, 685),
    "ousmane_portrait": (150, 190, 890, 860),
    "ousmane_close": (340, 190, 660, 530),
}

for name, box in crops.items():
    cropped = img.crop(box)
    cropped.save(f"scratch/{name}.png")
    print(f"Saved {name}: box={box}, size={cropped.size}")
