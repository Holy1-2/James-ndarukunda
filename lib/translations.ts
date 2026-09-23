export type Lang = "en" | "fr" | "rw";

export interface LangDef {
  code: Lang;
  flag: string;
  label: string;
}

export const LANGS: LangDef[] = [
  { code: "rw", flag: "🇷🇼", label: "Kinyarwanda" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export const en = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.music": "Music",
  "nav.gallery": "Gallery",
  "nav.events": "Events",
  "nav.contact": "Contact",
  "nav.linksToBio": "BIO",
  "nav.listenToMusic": "LISTEN TO MUSIC",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.menu": "Menu",

  "hero.label": "Rwandan Poet & Founder",
  "hero.tagline":
    "Poetry that preserves culture and delivers meaningful messages.",

  "about.eyebrow": "About the Artist",
  "about.eyebrowJaems": "About Jaems",
  "about.heading1": "The Journey, The Music,",
  "about.heading2": "The Mission.",
  "about.story1":
    "James Ndarukunda is a Rwandan poet and the Founder and Owner of IMIKARAGO POETS GROUP. Since 2021, he has been creating and performing ibisigo (poetry) that deliver messages through different themes and perspectives. His work is centered on preserving and promoting Rwandan culture and literary heritage.",
  "about.story2":
    "From church choirs to street radios to packed arenas — every song is a letter written to the heart. James believes the stage is a home, and everyone listening is family.",

  "milestones.title": "Milestones",
  "milestones.1Title": "Beginning of His Poetry Journey",
  "milestones.1Text":
    "Started his journey in poetry, creating ibisigo focused on delivering meaningful messages rather than music.",
  "milestones.2Title": "Cultural & Literary Expression",
  "milestones.2Text":
    "Developed poetry across different themes, bringing together messages that contribute to preserving Rwandan culture and literary heritage.",
  "milestones.3Title": "Founder of IMIKARAGO POETS GROUP",
  "milestones.3Text":
    "Founded and became the owner of IMIKARAGO POETS GROUP, creating a platform dedicated to poetry and the promotion of Rwandan literary culture.",

  "cta.listen": "LISTEN TO MY MUSIC",

  "music.eyebrow": "Latest Music",
  "music.heading1": "Listen to My",
  "music.heading2": "Latest Tracks",
  "music.desc": "Fresh videos and releases, straight from the channel.",
  "music.viewAll": "VIEW ALL ON YOUTUBE",
  "music.newUpload": "New Upload",
  "music.views": "views",

  "events.eyebrow": "Events",
  "events.heading": "Upcoming Shows & Events",
  "events.desc":
    "Where James performs next — shows, festivals and appearances.",
  "events.empty":
    "No upcoming events right now — check back soon for new dates.",
  "events.tickets": "Tickets & Info",

  "gallery.eyebrow": "Gallery",
  "gallery.heading": "Moments & Vibes",
  "gallery.desc":
    "Frames from the studio, the stage, and everything in between.",
  "gallery.prev": "Previous photo",
  "gallery.next": "Next photo",
  "gallery.close": "Close",
  "gallery.open": "Open {title}",
  "gallery.goTo": "Go to photo {n}",
  "gallery.loading": "Loading images…",
  "gallery.empty":
    "No images yet — the gallery is being filled. Check back soon.",

  "photo.1": "Portrait",
  "photo.2": "Studio Session",
  "photo.3": "Live Performance",
  "photo.4": "Behind the Scenes",
  "photo.5": "In the Studio",
  "photo.6": "On Stage",

  "contact.eyebrow": "Contact",
  "contact.heading1": "Let's Create Something",
  "contact.heading2": "Meaningful.",
  "contact.desc":
    "For bookings, event performances, brand collaborations, media interviews and everything in between — the line is always open.",
  "contact.booking": "Booking & Management",
  "contact.phone": "Phone / WhatsApp",
  "contact.based": "Based in",
  "contact.basedValue": "Rwanda · East Africa",
  "contact.avail": "Availability",
  "contact.availValue": "{{year}} Tour & Show Dates",

  "form.name": "Full Name",
  "form.email": "Email Address",
  "form.phone": "Phone Number",
  "form.type": "Inquiry Type",
  "form.message": "Message",
  "form.namePh": "Your name",
  "form.emailPh": "you@example.com",
  "form.phonePh": "+250 …",
  "form.messagePh": "Tell me about your project, event, or idea…",
  "form.send": "SEND MESSAGE",
  "form.sent": "MESSAGE SENT",
  "form.sentBody":
    "Thank you for reaching out. The team will get back to you within a few days.",
  "form.again": "SEND ANOTHER MESSAGE",
  "form.opt1": "Booking Inquiry",
  "form.opt2": "Event Performance",
  "form.opt3": "Brand Collaboration",
  "form.opt4": "Media Interview",
  "form.opt5": "Music Production",
  "form.opt6": "General Message",

  "footer.rights": "© {{year}} James Ndarukunda. All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Use",
};

export type TranslationKey = keyof typeof en;

export const fr: Record<TranslationKey, string> = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.music": "Musique",
  "nav.gallery": "Galerie",
  "nav.events": "Événements",
  "nav.contact": "Contact",
  "nav.linksToBio": "BIO",
  "nav.listenToMusic": "ÉCOUTER",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.menu": "Menu",

  "hero.label": "Poète rwandais et fondateur",
  "hero.tagline":
    "Une poésie qui préserve la culture et porte des messages porteurs de sens.",

  "about.eyebrow": "À propos de l'artiste",
  "about.eyebrowJaems": "À propos de Jaems",
  "about.heading1": "Le parcours, la musique,",
  "about.heading2": "la mission.",
  "about.story1":
    "James Ndarukunda est un poète rwandais, fondateur et propriétaire de l'IMIKARAGO POETS GROUP. Depuis 2021, il crée et interprète des ibisigo (poèmes) qui transmettent des messages à travers différents thèmes et perspectives. Son travail vise à préserver et à promouvoir la culture rwandaise et son héritage littéraire.",
  "about.story2":
    "Des chorales d'églises aux radios de rue jusqu'aux salles combles — chaque chanson est une lettre écrite pour le cœur. James croit que la scène est une maison et que chaque auditeur fait partie de la famille.",

  "milestones.title": "Étapes clés",
  "milestones.1Title": "Début de son parcours poétique",
  "milestones.1Text":
    "A débuté son parcours dans la poésie, créant des ibisigo axés sur la transmission de messages porteurs de sens plutôt que sur la musique.",
  "milestones.2Title": "Expression culturelle et littéraire",
  "milestones.2Text":
    "A développé une poésie à travers différents thèmes, rassemblant des messages qui contribuent à préserver la culture rwandaise et son héritage littéraire.",
  "milestones.3Title": "Fondateur de l'IMIKARAGO POETS GROUP",
  "milestones.3Text":
    "A fondé et est devenu propriétaire de l'IMIKARAGO POETS GROUP, créant une plateforme dédiée à la poésie et à la promotion de la culture littéraire rwandaise.",

  "cta.listen": "ÉCOUTER MA MUSIQUE",

  "music.eyebrow": "Dernière musique",
  "music.heading1": "Écoutez mes",
  "music.heading2": "derniers titres",
  "music.desc":
    "Nouvelles vidéos et sorties, directement depuis la chaîne.",
  "music.viewAll": "TOUT VOIR SUR YOUTUBE",
  "music.newUpload": "Nouvelle vidéo",
  "music.views": "vues",

  "events.eyebrow": "Événements",
  "events.heading": "Concerts & événements à venir",
  "events.desc":
    "Où James se produira ensuite — concerts, festivals et apparitions.",
  "events.empty":
    "Aucun événement à venir pour le moment — revenez bientôt pour de nouvelles dates.",
  "events.tickets": "Billets & infos",

  "gallery.eyebrow": "Galerie",
  "gallery.heading": "Moments & Ambiances",
  "gallery.desc":
    "Des images du studio, de la scène et de tout ce qui se trouve entre les deux.",
  "gallery.prev": "Photo précédente",
  "gallery.next": "Photo suivante",
  "gallery.close": "Fermer",
  "gallery.open": "Ouvrir {title}",
  "gallery.goTo": "Aller à la photo {n}",
  "gallery.loading": "Chargement des images…",
  "gallery.empty":
    "Aucune image pour le moment — la galerie est en cours de remplissage. Revenez bientôt.",

  "photo.1": "Portrait",
  "photo.2": "Session studio",
  "photo.3": "Performance en direct",
  "photo.4": "Dans les coulisses",
  "photo.5": "En studio",
  "photo.6": "Sur scène",

  "contact.eyebrow": "Contact",
  "contact.heading1": "Créons quelque chose",
  "contact.heading2": "d'impactant.",
  "contact.desc":
    "Pour les réservations, les performances d'événements, les collaborations de marque, les interviews médiatiques et tout le reste — la ligne est toujours ouverte.",
  "contact.booking": "Réservations & Management",
  "contact.phone": "Téléphone / WhatsApp",
  "contact.based": "Basé à",
  "contact.basedValue": "Rwanda · Afrique de l'Est",
  "contact.avail": "Disponibilité",
  "contact.availValue": "{{year}} Tournées & dates de concerts",

  "form.name": "Nom complet",
  "form.email": "Adresse e-mail",
  "form.phone": "Numéro de téléphone",
  "form.type": "Type de demande",
  "form.message": "Message",
  "form.namePh": "Votre nom",
  "form.emailPh": "vous@exemple.com",
  "form.phonePh": "+250 …",
  "form.messagePh": "Parlez-moi de votre projet, événement ou idée…",
  "form.send": "ENVOYER LE MESSAGE",
  "form.sent": "MESSAGE ENVOYÉ",
  "form.sentBody":
    "Merci de nous avoir écrit. L'équipe vous répondra sous quelques jours.",
  "form.again": "ENVOYER UN AUTRE MESSAGE",
  "form.opt1": "Demande de réservation",
  "form.opt2": "Performance d'événement",
  "form.opt3": "Collaboration de marque",
  "form.opt4": "Interview médiatique",
  "form.opt5": "Production musicale",
  "form.opt6": "Message général",

  "footer.rights": "© {{year}} James Ndarukunda. Tous droits réservés.",
  "footer.privacy": "Politique de confidentialité",
  "footer.terms": "Conditions d'utilisation",
};

export const rw: Record<TranslationKey, string> = {
  "nav.home": "Ahabanza",
  "nav.about": "Ibyerekeye",
  "nav.music": "Umuziki",
  "nav.gallery": "Galeri",
  "nav.events": "Ibitaramo",
  "nav.contact": "Twandikire",
  "nav.linksToBio": "BIO",
  "nav.listenToMusic": "UMUZIKI",
  "nav.openMenu": "Fungura menu",
  "nav.closeMenu": "Funga menu",
  "nav.menu": "Menyu",

  "hero.label": "Umusizi nyarwanda",
  "hero.tagline":
    "Ibisigo bibungabunga umuco kandi bitanga ubutumwa .",

  "about.eyebrow": "Ibyerekeye Umuhanzi",
  "about.eyebrowJaems": "Ibyerekeye Jaems",
  "about.heading1": "Urugendo, umuziki,",
  "about.heading2": "n'ubutumwa.",
  "about.story1":
    "James Ndarukunda ni umusizi nyarwanda, akaba n'umwashinze kandi nyir'iMIKARAGO POETS GROUP. Kuva mu 2021, akora kandi akavuga ibisigo bishyikiriza ubutumwa mu ngingo n'imyumvire zitandukanye. Umurimo we ni ukubungabunga no guteza imbere umuco n'umurage w'indimi z'u Rwanda.",
  "about.story2":
    "Kuva mu makorari y'itorero, mu maradio yo mu muhanda kugeza ku ngoro zuzuye — indirimbo yose ni ibaruwa yandikiwe umutima. James yizera ko murimbarango ari urugo, n'uwumva wese ari umuryango.",

  "milestones.title": "Intambwe z'ingenzi",
  "milestones.1Title": "Intangiriro y'urugendo rw'ibisigo",
  "milestones.1Text":
    "Yatangiye urugendo rwe mu bisigo, akora ibisigo bishyira ku gutanga ubutumwa bw'akamaro aho kuba umuziki.",
  "milestones.2Title": "Gushyigikira umuco n'ubuvanganzo",
  "milestones.2Text":
    "Yatejeje imbere ibisigo mu ngingo zitandukanye, akusanya ubutumwa bufasha kubungabunga umuco n'umurage w'ubuvanganzo bw'u Rwanda.",
  "milestones.3Title": "Uwashinze IMIKARAGO POETS GROUP",
  "milestones.3Text":
    "Yashinze kandi aba umunyamigabane w'iMIKARAGO POETS GROUP, ashinga urubuga rwiyeguriye ibisigo no guteza imbere umuco w'ubuvanganzo bw'u Rwanda.",

  "cta.listen": "TEGA AMATWI UMUZIKI WANJYE",

"music.eyebrow": "Umuziki mushya",
  "music.heading1": "Mutege amatwi",
  "music.heading2": "Indirimbo Nshya",
  "music.desc": "Amashusho n'indirimbo nshya, bituruka kuri chaneli.",
  "music.viewAll": "REBA BYOSE KURI YOUTUBE",
  "music.newUpload": "Umutangizo",
  "music.views": "ababirebye",

  "events.eyebrow": "Ibitaramo",
  "events.heading": "Ibikorwa n'ibitaramo bizaza",
  "events.desc":
    "Aho James azakorera ubutaha — ibitaramo, festivals n'ibindi.",
  "events.empty":
    "Nta bikorwa bizaza ubungubu — mugaruke kugira umenye amatariki mashya.",
  "events.tickets": "Bitiketi n'amakuru",

  "gallery.eyebrow": "Galeri",
  "gallery.heading": "Ibihe n'Uburanga",
  "gallery.desc":
    "Amafoto yo muri studio, kuri stage ndetse n'ayandi aho aboneka.",
  "gallery.prev": "Ifoto yabanje",
  "gallery.next": "Ifoto ikurikira",
  "gallery.close": "Funga",
  "gallery.open": "Fungura {title}",
  "gallery.goTo": "Kuri ifoto {n}",
  "gallery.loading": "Birimo kupakira amafoto…",
  "gallery.empty":
    "Nta mafoto ubu — galeri irimo kuzuzwa. Garuka vuba.",

  "photo.1": "Ifoto",
  "photo.2": "Muri studio",
  "photo.3": "Igitaramo",
  "photo.4": "Mu biganiro",
  "photo.5": "Muri studio",
  "photo.6": "Kuri Televisiyo",

  "contact.eyebrow": "Twandikire",
  "contact.heading1": "Reka dukorane",
  "contact.heading2": "mu birori byawe.",
  "contact.desc":
    "Ku byerekeye kudutumira, ibitaramo, ubufatanye, ibiganiro n'ibindi  — umurongo uhoraho ufunguye twandikire.",
  "contact.booking": "Gutumira & Kwandikira",
  "contact.phone": "Telefone / WhatsApp",
  "contact.based": "Aho ibarizwa",
  "contact.basedValue": "Rwanda · Afurika y'Iburasirazuba",
  "contact.avail": "Ubushobozi bw'igihe",
  "contact.availValue": "{{year}} Iminsi y'ibitaramo",

  "form.name": "Amazina",
  "form.email": "Imeyili",
  "form.phone": "Nomero ya telefone",
  "form.type": "Ubwoko bw'ikibazo",
  "form.message": "Ubutumwa",
  "form.namePh": "Amazina yawe",
  "form.emailPh": "wowe@urugero.com",
  "form.phonePh": "+250 …",
  "form.messagePh": "Bwira ibyerekeye umushinga wawe, ibitaramo cyangwa igitekerezo…",
  "form.send": "OHEREZA UBUTUMWA",
  "form.sent": "UBUTUMWA BWOZANYWE",
  "form.sentBody":
    "Murakoze kutwandikira. Itsinda rizabasubiza mu minsi mike.",
  "form.again": "OHEREZA UBUTUMWA BUNDI",
  "form.opt1": "Gutumira",
  "form.opt2": "Igitaramo",
  "form.opt3": "Ubufatanye bw'umurika",
  "form.opt4": "Interivu",
  "form.opt5": "Gukora umuziki",
  "form.opt6": "Ubutumwa rusange",

  "footer.rights": "© {{year}} James Ndarukunda. Uburenganzira bwose bwabitswe.",
  "footer.privacy": "Uburyo bw'ibanga",
  "footer.terms": "Amabwiriza y'igikoreshwa",
};

export const translations: Record<Lang, typeof en> = { en, fr, rw };

export type Translate = (
  key: TranslationKey,
  vars?: Record<string, string | number>
) => string;