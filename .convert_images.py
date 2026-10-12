from pathlib import Path
from PIL import Image
import shutil
root=Path.cwd()
converted=[]
for folder in (root/'src/assets/images',root/'public/images'):
 for path in folder.rglob('*'):
  if path.is_file() and path.suffix.lower() in {'.png','.jpg','.jpeg'}:
   target=path.with_suffix('.webp')
   with Image.open(path) as im:
    im=im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
    im.save(target,'WEBP',quality=86,method=5)
   converted.append((path,target))
preview=root/'screenshot-preview.jpg'
if preview.exists():
 with Image.open(preview) as im: im.convert('RGB').save(root/'screenshot-preview.webp','WEBP',quality=86,method=5)
 converted.append((preview,root/'screenshot-preview.webp'))
# Replace local imports, manifest file names, and blog placeholder asset paths.
for source in [root/'src']+[root/'index.html']:
 paths=[source] if source.is_file() else [p for p in source.rglob('*') if p.is_file() and p.suffix.lower() in {'.js','.jsx','.css','.json','.html','.md'}]
 for f in paths:
  try: text=f.read_text(encoding='utf-8')
  except (UnicodeError,OSError): continue
  updated=text
  for old,new in converted:
   if old.is_relative_to(root/'src/assets/images'):
    rel=old.relative_to(root/'src/assets/images').as_posix()
    updated=updated.replace(rel,str(Path(rel).with_suffix('.webp')).replace('\\','/'))
   elif old.parent == root/'public/images':
    updated=updated.replace('/images/'+old.name,'/assets/images/'+Path(old.name).with_suffix('.webp').name)
  if updated!=text: f.write_text(updated,encoding='utf-8')
# Public files use /assets/images URLs; move completed asset tree.
old_dir=root/'public/images'; new_dir=root/'public/assets/images'
new_dir.parent.mkdir(parents=True,exist_ok=True)
if old_dir.exists(): shutil.move(str(old_dir),str(new_dir))
# Remove only successfully converted sources.
for old,new in converted: old.unlink(missing_ok=True)
print('Converted and updated',len(converted),'images')
