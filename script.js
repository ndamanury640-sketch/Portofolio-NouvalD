/* ── FLOATING BUBBLES BACKGROUND ── */
(function(){
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let W, H, bubbles = [];
  const colors = [
    'rgba(249,115,22,',
    'rgba(99,102,241,',
    'rgba(14,165,233,',
    'rgba(244,63,94,',
    'rgba(253,186,116,',
  ];
  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  function mkBubble(){
    const c = colors[Math.floor(Math.random()*colors.length)];
    return { 
      x: Math.random()*W, 
      y: Math.random()*H, 
      r: Math.random()*18+4, 
      a: Math.random()*.18+.04, 
      speed: Math.random()*.15+.03,
      dx: (Math.random()-.5)*.2,
      color: c
    };
  }
  function init(){ resize(); bubbles = Array.from({length:40}, mkBubble); }
  function draw(){
    ctx.clearRect(0,0,W,H);
    bubbles.forEach(s=>{
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = s.color + s.a + ')';
      ctx.fill();
      s.y -= s.speed;
      s.x += s.dx;
      if(s.y < -s.r){ s.y = H+s.r; s.x = Math.random()*W; }
      if(s.x < -s.r) s.x = W+s.r;
      if(s.x > W+s.r) s.x = -s.r;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  init(); draw();
})();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ── */
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
toggle.addEventListener('click', ()=>{
  mobileMenu.classList.toggle('open');
  toggle.innerHTML = mobileMenu.classList.contains('open')
    ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
function closeMobile(){
  mobileMenu.classList.remove('open');
  toggle.innerHTML = '<i class="fas fa-bars"></i>';
}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ── PROGRESS BARS ── */
const bars = [
  { bar: 'bar-html', pct: 'pct-html' },
  { bar: 'bar-js',   pct: 'pct-js'   },
  { bar: 'bar-web',  pct: 'pct-web'  },
  { bar: 'bar-php',  pct: 'pct-php'  },
];
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    bars.forEach(({bar, pct})=>{
      const el = document.getElementById(bar);
      const pctEl = document.getElementById(pct);
      if(!el || el.dataset.animated) return;
      el.dataset.animated = '1';
      const target = parseInt(el.dataset.width);
      el.style.width = target + '%';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(()=>{
        current = Math.min(current + step, target);
        pctEl.textContent = Math.round(current) + '%';
        if(current >= target) clearInterval(timer);
      }, 20);
    });
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if(skillsSection) barObs.observe(skillsSection);

/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();

  const inputs = this.querySelectorAll('.form-control');

  const name = inputs[0].value;
  const email = inputs[1].value;
  const subject = inputs[2].value;
  const message = inputs[3].value;

  const mailSubject = encodeURIComponent(subject || 'Portfolio Contact');
  const mailBody = encodeURIComponent(
`Name: ${name}
Email: ${email}

Message:
${message}`
  );

  window.location.href = `mailto:ndamanury640@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

/* ── DOWNLOAD CV ── */
function downloadCV(e){
  e.preventDefault();
  const b64 = 'JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GMyAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjQgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Db250ZW50cyAxMCAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCA5IDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgOSAwIFIgL1R5cGUgL0NhdGFsb2cKPj4KZW5kb2JqCjggMCBvYmoKPDwKL0F1dGhvciAoYW5vbnltb3VzKSAvQ3JlYXRpb25EYXRlIChEOjIwMjYwNTE5MDg1MDQwKzAwJzAwJykgL0NyZWF0b3IgKGFub255bW91cykgL0tleXdvcmRzICgpIC9Nb2REYXRlIChEOjIwMjYwNTE5MDg1MDQwKzAwJzAwJykgL1Byb2R1Y2VyIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSBcKG9wZW5zb3VyY2VcKSkgCiAgL1N1YmplY3QgKHVuc3BlY2lmaWVkKSAvVGl0bGUgKHVudGl0bGVkKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL0NvdW50IDEgL0tpZHMgWyA2IDAgUiBdIC9UeXBlIC9QYWdlcwo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggNDUyMAo+PgpzdHJlYW0KR2IhO2c9YGA9VyZxOEg5XnNlVF5lbVNncShaM2VSM3VMaGFAaj5Rb1tPTnI7NypDTjs4ayJXWnFWUTREXDY6LVE6cCF1JFI3dFRCQjtrOiZkQF9VUztZV1Y3XlNhXmtJW2NHTkReXzw8OVB0MHUjcShwUEVdRyFgV1IuKVJQLCk3K1ckRF0ianFWVW5VVy8wZiwjTVNZYyJXbnBZIjtpXGdMIUdXZjkuUksnI2tWJVBVJjk0M0NXRHNMVi4rYlxQLltAM0RnWWlXNixyWywjI2ldWFo5TFUtOzkmNy5WRlUoT3FPbDBYYSNfYmt0JFZgX2Y/WU1RQGlEKzdSNyhFZzg6VkZWKTIlOVA5PDpcISZ0Ki1sM2JVUydKJ1NuWytZaT9GX3MvcGlMaFhFXzZ0VlMtNjxeNk9kXUQqQl5lMTRuPGMmJFpDRmErOV1jdWM5UiE0bkwxaEZrPWYqRjA7Jy01cC1paFoxITJWI3E5VGdNZi5eXXAiJ3VKcCgkPFQuPjlBNE82YF5APShiX0guajRKXHFtJzlKbzIpLkJNRD8wM1hSOyFOcENBSTZaZV5SO0FPLVZKTE5pU2tZL3EqbF5HUmFrNzJuMFxQRmhbQysmS15GWVxHcDUiVDRIaktyUS1qOWBYbnFLVE5DO2NNVWUpJ2RLbSxlZj1lOGgiL3JGNWZvXitlZmNWbi8lMD8sVzhtLiF0Yzplc0UuJnVcZnJkcWhrT24rKTM8UGknWjFbNFlbYmtxUmNGU1JidW80SmEwImpeS1g4PDElZ0ZvQ140WTREWktXI3Vnbik2ckY2ZWFNX0tPcThYIzBaaCJKXTtALWhKLiZCT1YiWmVtcFhGPG8oSmUiSmMxOyFULVlNV2twRGBSWGliRm46TFU3P1AjZDdmKyxSTDQhRGU4a3RPNEExKUwnLm9rV0RRLGo3QWhOODBWdU4sO01sS09MWDYlX2w8XCtpbmsnSzcvP0pKdGJyVCpGMSZNO0tfUlZNZG5BO2hQYjxycCdLSylKLVAsNC1iLSdUOF5BJ1c6I2xSQjtwYFgsPFo2JGJjKTZvLy8hXlI5LGxpcmwzSVVDTCM5bXBENithUCFgVCVXVyIoWU4mIypiQ1twdVRiUEJpUGxKbVhpcVMhJTArPm5YOi1JNmgvRiw2RU0zSV8hZ0hzL0RWPEQ/YHBPNDtGTDNwN1pNXURoPzI+U1FwJD0tLTNoPjtZcT9ZcCVfSTtfNS5OaUtPWC01ZmhgbiNZT3AhUGVyYFNCcF9ZUztPMm5GP1EmNFRAby4rOSpoNmxnVSFLVzVwK01ZQzAlKi5hZycyOWhtY3NYcE4sQUpXYiEybjYsKFZgOUs4U1A2biNzamphU0MnUiUwXjQ9QWskQyotTzVcYGpiSzdgUjowXWg2UkFPXWpobzpIZHBeOCVMdC4jUSkjOitkUXBIc0JWMzRNYSQ2cEkqSmkyJCkoNT8/WyRxOyNQLiNIQVwwVnFnXVwlczpmQT8zYzkmVkdcbi5TIVUiTjBmUDlCKjY1bFIkU09Caz5ASzNeIyJiI0ZFQkhmbEM+KDNhdFZwTUMuXT0zM0IlVVtjNFFBWzQ1REIhJzEsJE1ba0tIY0BQLy1mXHJUanVpRmUjPDBkcjdJR3A5WThTKWE2UDREaC5sayRaMj5cTj1YTmBXUV0pLT1FUDglQUYkTjBgb0BfMjJFdClqOXMoTShmKyRqKilNNi9EVnA6ZWkqSTIpZVI5a20hQ01FWGRMa0pUNWUuPDNlZWlITCttSTs8aDA5c1koX2dRNmtbP0xRLHEtb0A1VWlXP0A7cUlpQEZcYSE2Oi1uSyg4P2FBKEMpNUFgPHQ7ZlA9NTNwTik7XFk6dTBPZEU1Jy0oKj1nSEwoMTAxWXE7U1ldb2hwQ1YuOyJacCc9MWhvcSNWQ3JqWTFYKSNIZjw5XFU+ajIrbnI6KFhVYDc6b04yTltRXTtWaSI0IV5PJ2tic0FLVlVdNUdOM2ZfP1hmNlVRdFw9bFwiWDp1TDwwWy8mLWgpbzNMXlFtVTpjMT89VTkoZzVnaXI+Tzo9RUdQYE5adCVVNVUlRy8iIktxXjdjUWhWWENvSCRxWWIrTkBBR2RQNUFzTCxuOyE9U1tKXFZENCJlS2YhUiFCNCheL1ozJD4tVz1XXWVCJkFHXWFMaic3WDJBbTc0YmM7YFVpLkYrYWJnb0VaNkpFbjZJTUZWXUNAcUAxR1IkVFFEQnNATk0/bmE6OHBdYmBZL3FiJTVvQFQ2bEJEVmIkM0wwIzovLUUkSkZxPzdsX1ghMSgkKWQoR0JzYUsiP1VLQmw0SHNQRS1maCVsamJxJkhGKzxjLTNEY0ttUVE3WV4tRkJoSF0uVEBHdG9VYkZzcFYmLUlTVl00TykyPUknajNPcklPOWRqRWxyI1dLUScuJHRSLUJmJVxUNlFIRjlxMXIuM00lYm1MKSs6YWZbSWJMYWJrVnAqI0c2NDhqaWNUKEIxXk44YFc0V2JqPiMuVU1CNixvJzxRTHMqY2hsSTQ7TEQzVV1TZ2hrKiRwUDdrLkgpWFxwMnAuXUhlOnInajV1QSYobl4mUz1CTktTT0BIJzJUYSZXQDNoPDhzaEA3JFEsaCZYLE0hI0tLS0dJalVrcUhULS04a11HbXVKajpUXCQ4SUc6SmNLIl9GUy9rP3BBX2JYOkNpZzQ4VU9zY15lRE1qdExgVmopLlBlKz5rV29WVU9fSGNsX1FIWkdkOFJYYVswKTFYRVNGJHQvNDo7MDc3cWppI2drcT1ebXFCa01yKCdTZ3B0JzJXVCxhckJwWyEkViM5UyYpQEooVjA9ITptMDlYW0pPYEI1YktfWUk2Li07JUswI0VHJi9kblRlS191dHBLYCEhXjMlUnRMOTFNT28/YzU7MSZFTmJHX09cazNPWkcpc1wrMGM2a2h1WFkuYGhrS0F0WzB1IlsqWCMsXW9jP0M0dFlrJTQ3ZCM2JVszMSVPcWYxLUMnQz5NQEdKPyYkUSVHVFMicCEqSkErZSxVNFQtSmNiIzhgO0s1QDcrcEdTaCsvUVNKSic6a0FlVEY5I3BORE45T1shSTlPVkloYSEuImNnQlwqNzcrQ2lYNyQlZDVVOkFHT0MnLVlSTF1UYm9MYUVtKDlRSDouaV9wXGZRcFFIZD9fVkIqbXIicV05TD11XGhjP2RQW3FVY25pQ3FKPkBvYlJFQE8/QzAxWFRdcDpiXHRsTDU/MTdzMClWPjs4RC1EOiVdODgiYlgocWJiOjBdUjliTjhKTzsrLTRiaClCMGdtSz0qP2Q4XCRDSjo7ZSdVL2lLbVRHOVVOTCoqRXFFTVhnWm1JUU4rN15gLzRNLC0vNFI/dS85OGxuTklbKlpgNlhONktYaiZlVlJwKitJTHJmQGZGWT9FMzkpXjIuamw+XCtjP3FqPVtcWCItam9dNG1tY1dhS1olI0A7cENaSl80TVolMU9aVSJePTYhcUMrLyRZOV1YNDNsYSUrP15SVyFOKiQ+JmZITzlqTGNLcDdUaDlZSXFyLkI/dHJvQ1FKYz90J1xYc2FrUWFmWmcwTUc8Y1c0TSdTQEVvOjxjR0xWKF5nISZjXl01dWg4MjRMbVdRRiFVREQjJ1NOYyhQdTtOIVR1ckFhbkpuJkFuPipuIytpI0c8RF9jYzw8QmQ4a11nYFxhak9bPEpUTj5Hc0lVIkEiRj9bJSwvZ0JAQTFcQyJzVD5HLlZOP2NHR3ViTnBXKyclbCo4dC8oYip1QkA1MSxVMkY7KT0nZWpRP05BOVRsUGpXdFZOS25FNWJoYmQ9OiFNSEQlPGlNWF9jXlowLjpncXUwXTgzZ289XC4oXTsiI0ZGQCYwb2JEJ2g2MlkwWGU9KUNZOSVwc0FNZiliUGBbdV9xVzpVUikzSj1IdUs+UElXVyphSyFycXNPNUJoImRKS0koNE5qbWJLKD4xP0VoajswTE5tWDB1ZCpBRiRaRydLXyNVT08nUSVhYHU6XGIlQlwtYTAyVS1CY25HIT4xLFFYLEdUXChJNjlELU0qP0U6RioybiZgYUBUOzVQdEFOQjVbbDwoakZfIkdpIydHQ1Z1K2BzJ29nXUVnOGtcV2Y0cENmdUAlZFVFR0sjL2lyJUdcJV83QVUqMScnWzM4bVErSk40bStnWW9aKiFxOkQlZSFePz8hIi5zclYmVVEqPVVXK2tYITFoVy9Ec1FDN1VeN1JwbHMlVVYnMT5xZjVpaWVZM3QyQV8rWE1RP0dqV09JTlBoLkhYJzFlcmpMVVksYSEub1ZeNTxVamgiSytDSjZXJ2UqS2E9M0cxLjo8UVNhPFNhTlcnJHNeLS8hbiRxVzJ0LiFEOD11JTNAL2xHRzRVPCVNSmIvTVI/cWJXLT1CUlBUbUtDW01VZD5kRXRfbyJiV0xoSDI3ST9yOFxAISQkRlVEOC9scC8xQGs/bDY5dHFmOWtlNy8zMCJyJzs+Z21OQ2xERiRNLVoibClaQ3JlSDc5YmpyXT1LUmdwNDBxT09CX0lFXzwsVENpVyhFcS1jYCpCUFY9VVpmL3Fob1NrWnFIXjpZVChSbS9PTy1mXWdjQHI8WFYxdW5IPW87JnFOJVg2OU0qamxoRTNJRV9uL0E/RWxMKS4pcyVFJjJBV0osKlNRZk1YVD0ldTkrR0g3aWhxbyVSaGtSRnFtNTMiPTpCUVA5XC8hSi0qTi4ldTJeJ1UibSp0MHJUcU1FNExMW1k2SGMjPV5CbV1PMUprZHRTLiwwI2ArQydJbiRtZlFxIlRRRyEsSjZJazRGb1BoJCVLYGMqaE9xKmZZUFJLaGZxJmlPSGIqPlApZmYvZElMSERbPDtGck4tOFQ6LjBqQFxPXEVOP3U8XmYocFEuYk1dYE1VNEBhQDUyb2BCYG5zKU88MktIZFBmOD8nJTpqTERCTFJXXk4zbihdTy1mRmBsLkttSlpNUE5AZ0Bhb1BPaGUzMSxabjloOjpNLXBnbDBkLCFRTi8+YUBqKztaMXBfYHVJdG0uWnVhZylbZTFLUyZmXjNRaGdNMjBAdExkOF5eYTtwcHFoPEYrRDVJTFtZalhNSE1oXCguP29hbmIqUShaX0gjb1ZPZjE6XEBndTNlOkFpUkBXYidlQTZORG1PPj81L3Q2Y2subGUmIzowajk7UjRfXDxMbktYKjk9IzU1P19nVDBJREBbZVchTCNXKWRuMUonRCFtSmhYMnVWQ2prcVYsMmZ1MVssTVYpJykyISdkRy9PTW5pNjsuQEVkbjxEcT41MTJtWFFtcW43VFBlYFZFOihkTmdUUzNmKl81XTliLVhdaSdyZUYkMUZmOSZkMzlHYVJ1YlxSTT5TVlEiLXI8Q14pRDRbYnA8NUVSdCk8QDc+NGsnbywrNU03bkZPZmIkW2RWQjRlU1NOVWMpZVdEcUw2TCNscyRIcklJNkJLRXFRVzpham9MP3IvRnJnU3BnVFdwIzU7U0hRbE5SWXI/MzpwSSZAUEosNEZlKTAsODRhKypQJGhPL2dvMjpZISpOUTo4Yjo/MnRSRC9GSEo0WXJYWFIuYkJASTw8SW43ZDRxMSFBbkc0IlNnNE5AKmhtPlcrNzhXZ1NDTDFRKnFVQ2VhO0toIUZeYkhMPXI0VmEtT1ozREZWRklyQUtVYjpzOFVwaWcnSzQ3KWVeai0oMjVQXHNmJU4mPyk1O1JFLGckRlVyKE1TK0dIWVgmdEZHR21YZEBvPkpJWHJbJSxwRmM9Tj9wPTV1JmtCQG05aSJzJWRQJSF0XDBEPl9VOio9PkFqKGVVRTo+R1gyNmdtUC5ma1NvJUM4IidyVmUiOG9RcmsqMlhiUUwmU2gqREFyTUFoaF4wJVZjKi03bT0zSE8zPWE0Ok4xbVwvIiFmbmMqbDpiNERgMDhBNEhPc04wTCciKkdfPEpwMTlZckVlUVJWZjRnMG9lRiVIaFxPZnJgbTIvRlhkP0toPHUtVGhnQiJQNmpUZ21pQz1BZ29LVCM9MGdsfj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCAxMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEyMiAwMDAwMCBuIAowMDAwMDAwMjI5IDAwMDAwIG4gCjAwMDAwMDAzNDEgMDAwMDAgbiAKMDAwMDAwMDQyNCAwMDAwMCBuIAowMDAwMDAwNTM5IDAwMDAwIG4gCjAwMDAwMDA3NDMgMDAwMDAgbiAKMDAwMDAwMDgxMSAwMDAwMCBuIAowMDAwMDAxMDcyIDAwMDAwIG4gCjAwMDAwMDExMzEgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8OGY5MmRhYTgzYTI3MTc4ZDhiYmI1OWQ2ZDZlNDNhNjU+PDhmOTJkYWE4M2EyNzE3OGQ4YmJiNTlkNmQ2ZTQzYTY1Pl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMQo+PgpzdGFydHhyZWYKNTc0MwolJUVPRgo=';
  const byteChars = atob(b64);
  const byteArr = new Uint8Array(byteChars.length);
  for(let i=0;i<byteChars.length;i++) byteArr[i] = byteChars.charCodeAt(i);
  const blob = new Blob([byteArr], {type:'application/pdf'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Nouval_Damanury_CV.pdf';
  a.click();
  URL.revokeObjectURL(url);
}

/* ── SMOOTH NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});