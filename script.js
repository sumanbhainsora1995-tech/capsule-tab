var cur = 0;
var pwd = '';
var PASS = '1102';
var ti = null;
var letter = 'Diki,\n\nI know you hate tickling - so I promise this letter won\'t do that.\n\nBut just so you know...\n\nFrom 2021 to now, from our first conversations to Ooty hills to Kodaikanal fog to Nuggy Piggy chaos - every single moment with you has been my favourite part of life.\n\nYou became my Vasooli. My person. My chaos partner.\n\nAnd Diki... you also became the person I choose, every single day.\n\nHappy Birthday, my forever headache.\n\nP.S. - Nuggy Piggy, Black Black, Oogy, Tin Tin and Buddy Giddy also say Happy Birthday. They love you more than me. Don\'t tell them I said that.';

function doFlash(){
  var f = document.getElementById('fl');
  if(!f) return;
  f.style.transition = 'none';
  f.style.opacity = '1';
  setTimeout(function(){
    f.style.transition = 'opacity 0.7s';
    f.style.opacity = '0';
  }, 80);
}

function goTo(n){
  var a = document.getElementById('s' + cur);
  if(a) a.classList.remove('on');
  cur = n;
  var b = document.getElementById('s' + n);
  if(b) b.classList.add('on');
  if(n === 4) startLetter();
}

function openBox(){
  doFlash();
  setTimeout(function(){ goTo(1); }, 350);
}

function tone(n){
  try {
    var A = window.AudioContext || window.webkitAudioContext;
    if(!A) return;
    var c = new A();
    var fr = {'1':261,'2':294,'3':329,'4':349,'5':392,'6':440,'7':494,'8':523,'9':587,'0':392};
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = 'sine';
    o.frequency.value = fr[String(n)] || 440;
    g.gain.setValueAtTime(0.07, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.18);
  } catch(e){}
}

function ul(){
  var s = '';
  for(var i = 0; i < 4; i++){
    s += i < pwd.length ? '*' : '\u2022';
  }
  var el = document.getElementById('lcd');
  if(el) el.textContent = s;
}

function nk(n){
  if(pwd.length >= 4) return;
  tone(n);
  pwd += String(n);
  ul();
  if(pwd.length === 4){
    setTimeout(function(){
      if(pwd === PASS){
        doFlash();
        setTimeout(function(){ goTo(2); }, 300);
      } else {
        alert('Wrong code, Diki! Think harder.');
        pwd = '';
        ul();
      }
    }, 300);
  }
}

function nc(){
  pwd = pwd.slice(0, -1);
  ul();
}

function showHint(){
  alert('Hint: 1102 - November 2021, when it all started!');
}

function toggleTl(i){
  var e = document.getElementById('tl' + i);
  if(e) e.classList.toggle('open');
}

function startLetter(){
  var i = 0;
  var el = document.getElementById('lt');
  if(!el) return;
  el.innerHTML = '<span class="cur">|</span>';
  clearInterval(ti);
  ti = setInterval(function(){
    i++;
    el.innerHTML = letter.slice(0, i) + '<span class="cur">|</span>';
    if(i >= letter.length){
      clearInterval(ti);
      el.innerHTML = letter;
      var btn = document.getElementById('cbtn');
      if(btn) btn.style.display = 'block';
    }
  }, 28);
}

function celebrate(){
  var cv = document.getElementById('cc');
  if(!cv) return;
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
  var ctx = cv.getContext('2d');
  var ps = [];
  var cols = ['#e8c87a','#f0a050','#c89840','#fff8e0','#ffaa00','#ff6b6b'];
  for(var i = 0; i < 160; i++){
    ps.push({
      x: Math.random() * cv.width,
      y: -20,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 5,
      c: cols[Math.floor(Math.random() * cols.length)],
      s: 4 + Math.random() * 7,
      r: Math.random() * 360,
      vr: (Math.random() - 0.5) * 8,
      a: 1
    });
  }
  function draw(){
    ctx.clearRect(0, 0, cv.width, cv.height);
    var alive = false;
    for(var i = 0; i < ps.length; i++){
      var p = ps[i];
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.a -= 0.006;
      if(p.a > 0) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r * Math.PI / 180);
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s);
      ctx.restore();
    }
    if(alive) requestAnimationFrame(draw);
  }
  draw();
}

(function(){
  var p = document.getElementById('ptc');
  if(!p) return;
  for(var i = 0; i < 22; i++){
    var d = document.createElement('div');
    var s = 1 + Math.random() * 3;
    d.className = 'dust';
    d.style.left = Math.random() * 100 + '%';
    d.style.width = s + 'px';
    d.style.height = s + 'px';
    d.style.animationDuration = (12 + Math.random() * 15) + 's';
    d.style.animationDelay = Math.random() * 8 + 's';
    p.appendChild(d);
  }
})();

window.openBox = openBox;
window.nk = nk;
window.nc = nc;
window.showHint = showHint;
window.toggleTl = toggleTl;
window.goTo = goTo;
window.celebrate = celebrate;