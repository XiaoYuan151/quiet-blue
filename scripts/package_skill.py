"""Refresh the portable starter and create a self-contained .skill ZIP."""
from pathlib import Path
import json
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
skill = root / 'skills/electron-page-design'
template = skill / 'assets/template'
files = [
    '.gitignore', 'main.js', 'preload.js', 'theme-init.js',
    'theme.css', 'styles.css', 'index.html', 'renderer.js',
    'scripts/check.js', 'scripts/preview.js',
]
for relative in files:
    target = template / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(root / relative, target)
package = json.loads((root / 'package.json').read_text())
package['scripts'].pop('package:skill')
(template / 'package.json').write_text(json.dumps(package, indent=2) + '\n')
references = skill / 'references'
references.mkdir(parents=True, exist_ok=True)
shutil.copy2(root / 'docs/design-guidelines.md', references / 'design-guidelines.md')
shutil.copy2(root / 'docs/source-manifest.json', references / 'source-manifest.json')
artifacts = root / 'artifacts'
artifacts.mkdir(exist_ok=True)
archive = artifacts / 'electron-page-design.skill'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for file in sorted(skill.rglob('*')):
        if file.is_file():
            bundle.write(file, file.relative_to(skill.parent))
print(f'Packaged {archive}')
