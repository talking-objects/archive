# pan.do/ra site config overlay

fork this repo into pandora_sitename and add your pan.do/ra customizations

place your config as config.jsonc, add custom files to static/js, poster scripts to scripts

custom files should be in the form <file>.<sitename>.js

i.e. js overlay:

    static/js/home.<sitename>.js

png overly the same i.e.

 static/png/icon.<sitename>.png

poster/icon script without <sitename>:
    script/item_icon.py
    script/list_icon.py
    script/potser.py

if you need a custom django module, touch __init__.py and install.py will take care of that too.

to use js pages from other sites, add them to overwrite in install.py

to deploy, checkout your fork into /srv/pandora/pandora/<sitename> and run ./install.py
