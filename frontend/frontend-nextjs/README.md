# EVA
https://github.com/talking-objects/archive/tree/frontend

# Ref
- [TOA-Miro](https://miro.com/app/board/uXjVKzMakEM=/)
- Design Sketch(Adobe XD)
- [pandora](https://talkingobjects.0x2620.org/)
- [d3example](https://observablehq.com/explore)
- Pandora ID & Passwrod -> .env.local

# Fragen
- Edit Page Design Problem -> Items Limit
- API-Leaflet Map
- Index Page Categories
- How to navigate from Index to Index/:children


# TODOS:
- [x] D3js Data Vis Resize Event
- [x] PlaceBox + [turkjs](https://turfjs.org/)
- [x] Testing the Dockerfile on the Hetzner server(🔔 after upate you need to create a new image)
- [ ] Index Page Experiment
- [ ] Index/places Page Experiment

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
            └── 📁components # Home Component
            └── page.js
        └── 📁about # About page
            └── 📁components # About Component
            └── page.js
        └── 📁clip # Clips page
            └── 📁[slug] # Clip page
                └── 📁components # Clip Component
                └── page.js
            └── 📁components # Clips Component
            └── page.js
        └── 📁components # Global Components
        └── 📁edit # Edits Page
            └── 📁[slug] # Edit Page
                └── 📁components # Edit Component
                └── page.js
            └── page.js
        └── 📁forest # Index Page
            └── 📁[slug] # Index Children Page
                └── 📁[id]
                    └── page.js
                └── 📁components # Index Children Component
                └── page.js
            └── 📁components # Index Component
            └── page.js
        └── 📁imprint # Imprint Page
            └── 📁components # Imporint Component
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
                └── page.js
            └── 📁components
            └── page.js
        └── favicon.ico
        └── globals.css
        └── layout.js
```




# URL
### Home
- / 

### Video Page
- /video <code>Redirect to /forest</code> <!-- Redirect to /forest -->
- /video/:id <code>ein Original Video</code>   <!-- ein Original Video 🟢 -->

### Edited Video Page
- /edit/:id <code>Edit Video</code>  <!-- Edit Video 🟡 -->

### Clip Page
- /clip <code>Redirect to /forest</code>  <!-- Redirect to /forest -->
- /clip/:id <code>ein Clip</code>  <!-- ein Clip -->

### Index
- /forest(Overview) <!-- item videos, clips, annotations, events, references, places -->
    - /place/:id 
    - /reference/:id
    - /event/:id
    - /annotation/:id

### Imprint

### About

### Search
/search?name=

