from PIL import Image
import numpy as np

def make_transparent(img_crop, bg_color_sample=(255, 255, 255), tolerance=28):
    """Make the light background of flyer objects transparent with smooth alpha."""
    rgba = img_crop.convert('RGBA')
    data = np.array(rgba)
    
    # Calculate difference from background (white/off-white)
    # The flyer background is around (245..255, 248..255, 252..255)
    r = data[:, :, 0].astype(float)
    g = data[:, :, 1].astype(float)
    b = data[:, :, 2].astype(float)
    
    # Distance from white
    dist = np.sqrt((255 - r)**2 + (255 - g)**2 + (255 - b)**2)
    
    # Alpha mask: 0 where near white, 255 where far from white
    alpha = np.clip((dist - tolerance) * (255.0 / 30.0), 0, 255).astype(np.uint8)
    
    data[:, :, 3] = alpha
    return Image.fromarray(data, 'RGBA')

img = Image.open('src/assets/ousmane.jpeg')

# Test on split-clim
clim = img.crop((670, 230, 896, 335))
clim_trans = make_transparent(clim, tolerance=22)
clim_trans.save('scratch/test_clim_trans.png')

# Test on pompe-bleue
pompe = img.crop((30, 595, 190, 690))
pompe_trans = make_transparent(pompe, tolerance=22)
pompe_trans.save('scratch/test_pompe_trans.png')

# Test on camera-dome (bottom left)
cam = img.crop((35, 705, 175, 810))
cam_trans = make_transparent(cam, tolerance=22)
cam_trans.save('scratch/test_cam_trans.png')

print("Saved test transparency crops!")
