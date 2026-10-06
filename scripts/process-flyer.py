import os
from PIL import Image, ImageFilter
import numpy as np

img = Image.open('src/assets/ousmane.jpeg').convert('RGB')
w, h = img.size
print(f"Loaded flyer: {w}x{h}")

os.makedirs('public/assets', exist_ok=True)
os.makedirs('scratch', exist_ok=True)

# ─────────────────────────────────────────────────────────────
# 1. EXTRACTION DES OBJETS DU FLYER (Fond transparent ou net)
# ─────────────────────────────────────────────────────────────

def extract_with_alpha(image, box, pad=4, bg_threshold=238, edge_feather=2):
    """Découpe un objet et rend le fond blanc/bleu très clair transparent."""
    cropped = image.crop(box).convert('RGBA')
    arr = np.array(cropped)
    
    r = arr[:, :, 0].astype(float)
    g = arr[:, :, 1].astype(float)
    b = arr[:, :, 2].astype(float)
    
    # Distance à la couleur de fond (blanc / gris très clair du flyer)
    # Dans les zones d'objet sur fond blanc
    is_bg = (r > bg_threshold) & (g > bg_threshold) & (b > bg_threshold)
    
    # Calcul de masque d'alpha
    diff = np.maximum(255 - r, np.maximum(255 - g, 255 - b))
    alpha = np.clip(diff * 5.0, 0, 255).astype(np.uint8)
    
    # Adoucir les bords
    alpha_img = Image.fromarray(alpha, mode='L')
    if edge_feather > 0:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(edge_feather / 2.0))
    
    arr[:, :, 3] = np.array(alpha_img)
    return Image.fromarray(arr, 'RGBA')

objects = {
    # 1. Raccord PVC (cercle orange avec raccord PVC 3 voies)
    "raccord-pvc": (40, 240, 202, 352),
    # 2. Carte électronique (cercle orange avec circuit imprimé)
    "carte-electronique": (220, 238, 380, 352),
    # 3. Split climatisation intérieur
    "split-clim": (675, 242, 896, 338),
    # 4. Unité extérieure climatisation
    "unite-exterieure": (655, 350, 845, 465),
    # 5. Caméra dôme (vue complète avec socle et leds)
    "camera-dome": (35, 705, 175, 815),
    # 6. Pompe à eau bleue
    "pompe-bleue": (35, 595, 192, 692),
}

print("\n--- Extraction des objets du flyer ---")
extracted_objects = {}
for name, box in objects.items():
    crop = img.crop(box)
    
    # Pour les badges ronds (raccord-pvc et carte-electronique), on crée un masque circulaire net
    if name in ["raccord-pvc", "carte-electronique"]:
        rgba = crop.convert('RGBA')
        cw, ch = rgba.size
        # Masque circulaire
        mask = Image.new('L', (cw, ch), 0)
        from PIL import ImageDraw
        draw = ImageDraw.Draw(mask)
        draw.ellipse((2, 2, cw - 3, ch - 3), fill=255)
        rgba.putalpha(mask)
        out_img = rgba
    else:
        out_img = extract_with_alpha(img, box, bg_threshold=235)
    
    out_path = f"public/assets/{name}.webp"
    out_img.save(out_path, "WEBP", quality=90)
    stat = os.stat(out_path)
    extracted_objects[name] = {"path": out_path, "size": stat.st_size, "dimensions": out_img.size}
    print(f"Objet sauvé: {out_path} ({out_img.size[0]}x{out_img.size[1]}, {stat.st_size / 1024:.1f} KB)")


# ─────────────────────────────────────────────────────────────
# 2. RECADRAGES D'OUSMANE SANS AUCUN TEXTE VISIBLE
# ─────────────────────────────────────────────────────────────
print("\n--- Traitement des portraits d'Ousmane ---")

# Pour Ousmane, on nettoie les zones de texte et objets périphériques :
# - Au-dessus de sa casquette (y < 210) : fond neutre
# - À gauche de son torse (x < 220) : fond neutre
# - À droite au-dessus de son bras (x > 660, y < 650) : fond neutre
# - En dessous de ses mains (y > 855) : coupé avant le bandeau orange

# A. PORTRAIT HERO (Visage + Torse avec ses outils, sans aucun texte du flyer)
# Box : x in [210, 845], y in [205, 855]
ousmane_hero = img.crop((210, 205, 845, 855)).convert('RGBA')

# Nettoyage des petits éléments périphériques sur le fond :
hero_arr = np.array(ousmane_hero)
# Le fond autour de sa casquette et de ses épaules est du blanc pur / écru
# Nettoyons tout artefact de texte en haut (y_rel < 35, c'est-à-dire au-dessus de la casquette) :
# Le sommet de la casquette est vers x_rel ~265 (475 absolu).
# À gauche et à droite du sommet de la casquette :
for y_rel in range(min(50, hero_arr.shape[0])):
    for x_rel in range(hero_arr.shape[1]):
        # Si on est au-dessus ou à côté de la casquette et que la couleur est foncée (texte)
        if (x_rel < 210 or x_rel > 310) and (hero_arr[y_rel, x_rel, 0] < 120 and hero_arr[y_rel, x_rel, 2] > 50):
            hero_arr[y_rel, x_rel] = [255, 255, 255, 255]

# Coin haut gauche (reste de circuit imprimé si x_rel < 170 et y_rel < 150) :
for y_rel in range(min(150, hero_arr.shape[0])):
    for x_rel in range(min(170, hero_arr.shape[1])):
        # Si c'est du fond ou du circuit board en dehors de la tête
        # La tête d'Ousmane commence à x_rel >= 120
        if x_rel < 100:
            hero_arr[y_rel, x_rel] = [255, 255, 255, 255]

# Coin haut droit (clim et unité extérieure si x_rel > 440 et y_rel < 420) :
for y_rel in range(min(420, hero_arr.shape[0])):
    for x_rel in range(440, hero_arr.shape[1]):
        # Remplacer par le blanc neutre pour isoler Ousmane
        hero_arr[y_rel, x_rel] = [255, 255, 255, 255]

clean_hero = Image.fromarray(hero_arr, 'RGBA')

# B. PORTRAIT CLOSE (Recadrage plus serré pour "À propos")
# Visage + haut du col (x in [300, 660], y in [205, 610])
ousmane_close = img.crop((305, 205, 655, 610)).convert('RGBA')
close_arr = np.array(ousmane_close)

# Nettoyer les bords gauche/droite au niveau du haut :
# Haut gauche (x_rel < 80, y_rel < 140) :
for y_rel in range(min(140, close_arr.shape[0])):
    for x_rel in range(min(80, close_arr.shape[1])):
        close_arr[y_rel, x_rel] = [255, 255, 255, 255]

# Haut droit (x_rel > 270, y_rel < 250) :
for y_rel in range(min(250, close_arr.shape[0])):
    for x_rel in range(270, close_arr.shape[1]):
        close_arr[y_rel, x_rel] = [255, 255, 255, 255]

# Ligne de texte au-dessus de la casquette (y_rel < 40) :
for y_rel in range(min(40, close_arr.shape[0])):
    for x_rel in range(close_arr.shape[1]):
        if (x_rel < 130 or x_rel > 220):
            close_arr[y_rel, x_rel] = [255, 255, 255, 255]

clean_close = Image.fromarray(close_arr, 'RGBA')

# Sauvegarde des portraits en WebP haute qualité
hero_path = "public/assets/portrait-ousmane.webp"
close_path = "public/assets/portrait-ousmane-close.webp"

clean_hero.save(hero_path, "WEBP", quality=92)
clean_close.save(close_path, "WEBP", quality=92)

stat_hero = os.stat(hero_path)
stat_close = os.stat(close_path)

print(f"> portrait-ousmane.webp: {clean_hero.size[0]}x{clean_hero.size[1]}, {stat_hero.st_size / 1024:.1f} KB")
print(f"> portrait-ousmane-close.webp: {clean_close.size[0]}x{clean_close.size[1]}, {stat_close.st_size / 1024:.1f} KB")
