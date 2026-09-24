// ===== PRELOADER =====
function hidePreloader(){
  document.getElementById('preloader').classList.add('hide');
}
window.addEventListener('load', () => {
  setTimeout(hidePreloader, 5200);
});
// Fallback in case 'load' fires late or assets are missing
setTimeout(hidePreloader, 6500);

// ===== AOS INIT =====
AOS.init({ duration: 900, once: true, offset: 80 });

// ===== COUNTDOWN SCREEN =====
const countdownScreen = document.getElementById('countdown-screen');
const peekBtn = document.getElementById('peekBtn');
// Target: next 25 September (current year, or next year if already passed)
function getNextBirthday(){
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 8, 25, 0, 0, 0); // month is 0-indexed: 8 = September
  if (target.getTime() <= now.getTime()){
    target = new Date(year + 1, 8, 25, 0, 0, 0);
  }
  return target;
}
const birthdayTarget = getNextBirthday();

function updateCountdown(){
  const now = new Date().getTime();
  const diff = birthdayTarget.getTime() - now;
  if (diff <= 0){
    countdownScreen.classList.add('hide');
    clearInterval(countdownInterval);
    return;
  }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
  const secs = Math.floor((diff % (1000*60)) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

peekBtn.addEventListener('click', () => {
  countdownScreen.classList.add('hide');
});

// ===== GUESTBOOK WALL =====
const gbTrack = document.getElementById('guestbookTrack');
const gbName = document.getElementById('gbName');
const gbMsg = document.getElementById('gbMsg');
const gbSubmit = document.getElementById('gbSubmit');
const guestbookMsg = document.getElementById('guestbookMsg');

gbSubmit.addEventListener('click', () => {
  const name = gbName.value.trim();
  const msg = gbMsg.value.trim();
  if (!msg){
    guestbookMsg.textContent = 'Please write a message before adding it to the wall.';
    return;
  }
  const card = document.createElement('div');
  card.className = 'g-card';
  card.innerHTML = `<i class="fa-solid fa-heart"></i><p>${escapeHtml(msg)}</p><div class="g-name">— ${escapeHtml(name || 'Anonymous')}</div>`;
  gbTrack.appendChild(card);
  gbName.value = '';
  gbMsg.value = '';
  guestbookMsg.textContent = 'Thank you for your wish! ❤️';
  card.scrollIntoView({ behavior:'smooth', inline:'end' });
  setTimeout(() => guestbookMsg.textContent = '', 4000);
});
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== CERTIFICATE PRINT =====
document.getElementById('printCert').addEventListener('click', () => {
  window.print();
});

// ===== HER JOURNEY OVERLAY =====
const journeyBtn = document.getElementById('journeyBtn');
const journeyOverlay = document.getElementById('journeyOverlay');
const journeyClose = document.getElementById('journeyClose');
const journeyContinue = document.getElementById('journeyContinue');

journeyBtn.addEventListener('click', () => {
  journeyOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  journeyOverlay.scrollTop = 0;
});
journeyClose.addEventListener('click', closeJourney);
journeyContinue.addEventListener('click', () => {
  closeJourney();
  document.getElementById('who-is').scrollIntoView({ behavior:'smooth' });
});
function closeJourney(){
  journeyOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== HERO ANIMATED TEXT =====
const heroLines = [
  "Some teachers teach lessons.",
  "Some teachers build careers.",
  "Some teachers inspire lives.",
  "But only a few teachers become family.",
  "Dr. S. Banu Chitra Mam is one of those extraordinary people."
];
const heroAnim = document.getElementById('heroAnim');
let lineIndex = 0;
function cycleHeroLines(){
  heroAnim.style.opacity = 0;
  setTimeout(() => {
    heroAnim.textContent = heroLines[lineIndex];
    heroAnim.style.transition = 'opacity 1s ease';
    heroAnim.style.opacity = 1;
    lineIndex = (lineIndex + 1) % heroLines.length;
  }, 500);
}
cycleHeroLines();
setInterval(cycleHeroLines, 3000);

// ===== REVEAL SECTION =====
const revealBtn = document.getElementById('revealBtn');
const revealContent = document.getElementById('revealContent');
revealBtn.addEventListener('click', () => {
  revealContent.classList.add('show');
  revealBtn.style.display = 'none';
  burstHearts();
});

// ===== ENVELOPE LETTER =====
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letterContent');
envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  setTimeout(() => letterContent.classList.add('show'), 500);
});

// ===== MUSIC TOGGLE =====
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-audio');
musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(()=>{});
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
  }
});

// ===== FALLING ROSE PETALS & FLOATING HEARTS =====
const particleContainer = document.getElementById('particles');
function spawnPetal(){
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.innerHTML = '🌸';
  petal.style.left = Math.random()*100 + 'vw';
  petal.style.fontSize = (0.8 + Math.random()*1.2) + 'rem';
  const duration = 8 + Math.random()*10;
  petal.style.animationDuration = duration + 's';
  particleContainer.appendChild(petal);
  setTimeout(() => petal.remove(), duration*1000);
}
function spawnHeart(){
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.innerHTML = '💖';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.fontSize = (0.7 + Math.random()*1) + 'rem';
  const duration = 7 + Math.random()*8;
  heart.style.animationDuration = duration + 's';
  particleContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration*1000);
}
setInterval(spawnPetal, 800);
setInterval(spawnHeart, 1200);

// ===== HEART BURST ON REVEAL =====
function burstHearts(){
  for(let i=0;i<25;i++){
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = '❤️';
    heart.style.left = (40 + Math.random()*20) + 'vw';
    heart.style.bottom = '30vh';
    heart.style.fontSize = (1 + Math.random()*1.5) + 'rem';
    const duration = 2 + Math.random()*2;
    heart.style.animationDuration = duration + 's';
    particleContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration*1000);
  }
}

// ===== CONFETTI ON FINAL SECTION =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let confettiPieces = [];
const confettiColors = ['#B76E79','#E8B4B8','#D4AF7A','#F7E1E1','#FFFFFF'];
function createConfetti(){
  confettiPieces = [];
  for(let i=0;i<120;i++){
    confettiPieces.push({
      x: Math.random()*canvas.width,
      y: Math.random()*-canvas.height,
      size: 4 + Math.random()*6,
      color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
      speed: 1 + Math.random()*3,
      drift: -1 + Math.random()*2,
      rotation: Math.random()*360
    });
  }
}
let confettiActive = false;
function animateConfetti(){
  if(!confettiActive) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let stillActive = false;
  confettiPieces.forEach(p => {
    p.y += p.speed; p.x += p.drift; p.rotation += 2;
    if(p.y < canvas.height + 20) stillActive = true;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI/180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
    ctx.restore();
  });
  if(stillActive){
    requestAnimationFrame(animateConfetti);
  } else {
    confettiActive = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
}

const finalSection = document.querySelector('.final-section');
let confettiFired = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting && !confettiFired){
      confettiFired = true;
      createConfetti();
      confettiActive = true;
      animateConfetti();
    }
  });
}, { threshold: 0.4 });
observer.observe(finalSection);

// ===== FINAL SECTION LINE-BY-LINE REVEAL =====
const finalLines = document.querySelectorAll('#finalLines p');
finalLines.forEach(p => p.style.opacity = 0);
const finalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      finalLines.forEach((p, i) => {
        setTimeout(() => {
          p.style.transition = 'opacity 1.2s ease';
          p.style.opacity = 0.9;
        }, i*900);
      });
      finalObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
finalObserver.observe(document.getElementById('finalLines'));
