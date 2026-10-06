from PIL import Image
import rembg
import io

print("Testing rembg on objects...")

img = Image.open('src/assets/ousmane.jpeg')

# 1. Test on objects
crops = {
    "pompe-bleue": (25, 585, 200, 700),
    "split-clim": (665, 225, 895, 345),
    "unite-exterieure": (645, 340, 850, 470),
    "camera-dome": (25, 695, 185, 820),
    "camera-dome-large": (780, 410, 896, 565),
    "raccord-pvc": (35, 235, 210, 360),
    "carte-electronique": (215, 230, 385, 360),
}

for name, box in crops.items():
    cropped = img.crop(box)
    transparent = rembg.remove(cropped)
    transparent.save(f"scratch/{name}_nobg.png")
    print(f"Processed {name}: size={transparent.size}")

print("Objects rembg completed!")
