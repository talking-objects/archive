# EVA
https://github.com/talking-objects/archive/tree/frontend

# Ref
- [TOA-Miro](https://miro.com/app/board/uXjVKzMakEM=/)
- Design Sketch(Adobe XD)
- [pandora](https://talkingobjects.0x2620.org/)
- [d3example](https://observablehq.com/explore)
- Pandora ID & Passwrod -> .env.local


# Folder Structure (updated: 28.10.24)
```bash
└── 📁frontend-nextjs
    └── .env.local
        └── .eslintrc.json
        └── .gitignore
        └── Dockerfile
        └── jsconfig.json
        └── next.config.mjs
        └── package-lock.json
        └── package.json
        └── postcss.config.mjs
        └── README.md
        └── tailwind.config.js
    └── 📁app
        └── 📁(home) # Home page
            └── 📁components
                └── HomeWrapper.js
            └── page.js
        └── 📁about # About page
            └── 📁components
                └── ImprintWrapper.js
            └── page.js
        └── 📁clip # Clips page
            └── 📁[slug] # Clip page
                └── 📁components
                    └── ClipWrapper.js
                └── page.js
            └── 📁components
                └── ClipsWrapper.js
            └── page.js
        └── 📁components # Global Components
            └── 📁containers
                └── Containers.js
            └── 📁elements
                └── Elements.js
        └── 📁edit # Edits Page
            └── 📁[slug] # Edit Page
                └── 📁components
                    └── EditWrapper.js
                └── page.js
            └── page.js
        └── 📁forest # Index Page
            └── 📁[slug] # Index Children Page
                └── 📁[id]
                    └── page.js
                └── 📁components
                    └── ForestEventWrapper.js
                    └── ForestPlaceWrapper.js
                    └── ForestRefWrapper.js
                └── page.js
            └── 📁components
                └── ForestWrapper.js
            └── page.js
        └── 📁imprint # Imprint Page
            └── 📁components
                └── ImprintWrapper.js
            └── page.js
        └── 📁utils # Utils
            └── 📁constant # Constant
                └── etc.js
            └── 📁hooks # my Hooks
                └── etc.js # ETC
                └── pandora_api.js # PANDORA API using SWR
                └── toaFetch.js # PANDORA FETCH
        └── 📁video # Videos Page
            └── 📁[slug] # Video Page
                └── 📁components
                    └── VideoWrapper.js
                └── page.js
            └── 📁components
                └── VideoWrapper.js
            └── page.js
        └── favicon.ico
        └── globals.css
        └── layout.js
```




# URL
### Home
- / 

### Video Page
- /video = Original Videos 
- /video/:id = ein Original Video 🟢

### Edited Video Page
- /edit/:id = Edit Video 🟡

### Clip Page
- /clip = Clips
- /clip/:id = ein Clip

### Index
- /forest(Overview) = item videos, clips, annotations, events, references, places
    - /place/:id 
    - /reference/:id
    - /event/:id
    - /annotation/:id

### Imprint

### About

### Search
/search?name=

