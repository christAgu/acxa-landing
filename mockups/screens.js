/* Écrans Senou Pay réutilisables dans les mockups */

const AST = '<span class="ast-mark">✱</span>';

const ICONS = {
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="10" cy="8" r="4"/><path d="M3 21c0-3.5 3.1-6 7-6M18 8v6M15 11h6"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z"/></svg>',
  bank: '<svg viewBox="0 0 24 24" class="ic"><path d="M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18M12 3l9 5H3z"/></svg>',
  person: '<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
  bag: '<svg viewBox="0 0 24 24" class="ic"><path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  phone: '<svg viewBox="0 0 24 24" class="ic"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>',
  cart: '<svg viewBox="0 0 24 24" class="ic"><path d="M3 4h2l2.5 11h10L20 7H6"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>',
  home: '<svg viewBox="0 0 24 24" class="ic"><path d="M4 11 12 4l8 7v9H4z"/></svg>',
  music: '<svg viewBox="0 0 24 24" class="ic"><path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" class="ic"><path d="M12 5v14M5 12h14"/></svg>',
  gear: '<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/></svg>',
  menu: '<svg viewBox="0 0 24 24" class="ic"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  copy: '<svg viewBox="0 0 24 24" class="ic"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
  eye: '<svg viewBox="0 0 24 24" class="ic"><path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>'
};

const flagBJ = '<span class="flag-bj"><i></i><i></i><i></i></span>';

const tabbar = (active = 0) => `
  <div class="tabbar">
    ${[ICONS.grid, ICONS.card, ICONS.user, ICONS.bell, ICONS.compass]
      .map((ic, i) => `<span class="${i === active ? 'on' : ''}">${ic}</span>`).join('')}
  </div>`;

/* Écran « Cartes » */
const screenCards = () => `
  <div class="s s-cards">
    <div class="s-head">
      <h3>Cartes</h3>
      <span class="menu">${ICONS.menu}</span>
    </div>
    <div class="card-wrap">
      <div class="sp-card">
        <div class="chip"></div>
        <div class="ast">✱</div>
        <div class="mark">Senou Pay</div>
        <div class="visa">VISA</div>
      </div>
      <div class="card-ghost"></div>
    </div>
    <div class="dots"><i class="on"></i><i></i></div>
    <p class="muted tiny lbl-block">Carte Senou Pay</p>
    <div class="src">
      <div class="chiprow">
        <span class="av-sm">${ICONS.person}</span>
        <span><span class="muted tiny">Source à débiter :</span><br>Compte commun</span>
        <span class="menu">${ICONS.menu}</span>
      </div>
    </div>
    <div class="cardnum">4785 54•• •••• 1234 <span class="eye">${ICONS.eye}${ICONS.copy}</span></div>
  </div>`;

/* Écran « Mon argent » */
const screenMoney = () => `
  <div class="s s-money">
    <h3>Mon argent</h3>
    <div class="tiles">
      <div class="tile">
        <div class="logo-dot">✱</div>
        <div class="val">516 400 F</div>
        <div class="lbl">Compte Senou</div>
      </div>
      <div class="tile photo">
        <div class="ph g1"></div>
        <div class="cap"><div class="val">198 600 F</div><div class="lbl">Compte commun</div></div>
      </div>
      <div class="tile">
        <div class="emoji">${ICONS.bank}</div>
        <div class="val">1 328 500 F</div>
        <div class="lbl">Ma banque</div>
      </div>
      <div class="tile photo">
        <div class="ph g2"></div>
        <div class="cap"><div class="val">152 800 F</div><div class="lbl">Voyage</div></div>
      </div>
    </div>
    <p class="muted sect">Dernières transactions</p>
    <div class="tx"><span class="av ph-a">LG</span>Laura Gomez<span class="amt">- 16 000 F</span></div>
    <div class="tx"><span class="av">${ICONS.bag}</span>Maison Déco<span class="amt">- 67 600 F</span></div>
    <div class="tx"><span class="av">${ICONS.bank}</span>Virement Banque<span class="amt in">+ 600 000 F</span></div>
    <div class="tx"><span class="av">${ICONS.phone}</span>Recharge MTN<span class="amt">- 9 900 F</span></div>
    <div class="cta-bar"><div>Recevoir</div><div>Payer</div></div>
    ${tabbar(0)}
  </div>`;

/* Écran « Profil & IBAN » */
const screenProfile = () => `
  <div class="s s-profile">
    <div class="s-head"><h3>Profil &amp; IBAN</h3><span class="gear">${ICONS.gear}</span></div>
    <div class="profile-card">
      <div>
        <div class="name">Sebastian</div>
        <div class="sub">Utilisateur Senou Premium</div>
      </div>
      <div class="adv">Avantages Senou Premium <span class="arw">→</span></div>
      <span class="ava">${ICONS.person}</span>
    </div>
    <div class="iban">
      <div>
        <div class="tiny muted">${flagBJ} RIB Senou Pay</div>
        <div class="num">BJ66 1679 8000 01XX 5782 194</div>
      </div>
      <span class="copy">${ICONS.copy}</span>
    </div>
    <div class="rowline">Identité <span class="arw">→</span></div>
    <div class="rowline">Mes avantages Senou Premium <span class="arw">→</span></div>
  </div>`;

/* Écran « Membres & transactions » (compte commun) */
const screenMembers = () => `
  <div class="s s-members">
    <div class="topbal"><div class="val">198 600 F</div><div class="lbl">Compte commun</div></div>
    <p class="muted sect">Membres</p>
    <div class="tx"><span class="av ph-b">TH</span>Thibaut Hubert<span class="amt tiny muted">Admin</span></div>
    <div class="tx"><span class="av ph-a">MS</span>Marion Sossou<span class="amt tiny muted">Membre</span></div>
    <div class="tx add"><span class="av">${ICONS.plus}</span>Ajouter un membre</div>
    <p class="muted sect">Transactions</p>
    <div class="tx"><span class="av">${ICONS.cart}</span>Courses<span class="amt">- 34 800 F</span></div>
    <div class="tx"><span class="av">${ICONS.home}</span>Logement<span class="amt">- 66 900 F</span></div>
    <div class="tx"><span class="av">${ICONS.music}</span>Abonnement<span class="amt">- 14 500 F</span></div>
  </div>`;
