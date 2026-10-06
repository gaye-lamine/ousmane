from PIL import Image, ImageDraw, ImageFont

img = Image.open('src/assets/ousmane.jpeg').convert('RGB')
draw = ImageDraw.Draw(img)
w, h = img.size

# Draw grid lines every 50 pixels
for x in range(0, w, 50):
    draw.line([(x, 0), (x, h)], fill=(255, 0, 0, 128) if x % 100 == 0 else (200, 200, 200, 100), width=2 if x % 100 == 0 else 1)
    draw.text((x + 2, 10), str(x), fill=(255, 0, 0))
    draw.text((x + 2, 500), str(x), fill=(255, 0, 0))
    draw.text((x + 2, 900), str(x), fill=(255, 0, 0))

for y in range(0, h, 50):
    draw.line([(0, y), (w, y)], fill=(0, 0, 255, 128) if y % 100 == 0 else (200, 200, 200, 100), width=2 if y % 100 == 0 else 1)
    draw.text((10, y + 2), str(y), fill=(0, 0, 255))
    draw.text((450, y + 2), str(y), fill=(0, 0, 255))
    draw.text((800, y + 2), str(y), fill=(0, 0, 255))

img.save('scratch/flyer_grid.png')
print("Saved scratch/flyer_grid.png")
