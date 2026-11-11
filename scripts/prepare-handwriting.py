"""
Priprema crno-bijele maske rukopisnog natpisa „Kebab Kakadu" s fotografije fasade
(research/sources/gm-07.jpg) za vektorizaciju (scripts/trace-handwriting.mjs).

Koraci: izrez table → ispravljanje nagiba → izdvajanje svijetlih zlatnih slova
→ spajanje lica slova i 3D ivice → popunjavanje sitnih rupa (zadržava
unutrašnjost slova e, b, a, d) → uklanjanje LED trake i plamena → zaglađivanje.

Pokretanje:  python -I scripts/prepare-handwriting.py <ulaz.jpg> <izlaz.png>
Zahtijeva:   pillow, numpy, scipy
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

src, dst = sys.argv[1], sys.argv[2]
ANGLE = 8.5          # nagib table na fotografiji
SCALE = 4            # uvećanje prije zaglađivanja
CLOSE_R = 4          # radijus spajanja (u px originala)
MAX_HOLE = 260       # rupe manje od ovoga (px originala) se popunjavaju

im = Image.open(src).convert("RGB")
w, h = im.size
crop = im.crop((int(w * 0.31), 0, int(w * 0.86), int(h * 0.16)))
rot = crop.rotate(ANGLE, resample=Image.BICUBIC, expand=True, fillcolor=(40, 40, 46))

a = np.asarray(rot, dtype=np.int32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
mask = (lum > 135) & ((r - b) > 28) & (g > 110)

# Samo pojas sa slovima (iznad LED trake, lijevo od plamena).
mask = mask[165:362, 55:795]

# Spoji lice slova i ivicu ekstruzije.
st = ndi.generate_binary_structure(2, 1)
mask = ndi.binary_closing(mask, structure=st, iterations=CLOSE_R)

# Popuni samo male rupe; veće (unutrašnjost slova) ostaju.
holes = ndi.binary_fill_holes(mask) & ~mask
lab, n = ndi.label(holes)
sizes = ndi.sum(holes, lab, range(1, n + 1))
small = np.isin(lab, np.where(sizes < MAX_HOLE)[0] + 1)
mask = mask | small

# Ukloni sitne mrlje.
lab, n = ndi.label(mask)
sizes = ndi.sum(mask, lab, range(1, n + 1))
mask = np.isin(lab, np.where(sizes > 120)[0] + 1)

img = Image.fromarray((mask * 255).astype(np.uint8))
big = img.resize((img.width * SCALE, img.height * SCALE), Image.LANCZOS)
big = big.filter(ImageFilter.GaussianBlur(SCALE * 1.2)).point(lambda v: 255 if v > 120 else 0)
# potrace traži crne oblike na bijelom
big = Image.eval(big, lambda v: 255 - v)
big.save(dst)
big.resize((img.width, img.height)).save(dst.replace(".png", "-preview.png"))
print("ok", big.size, "komponenti:", n)
