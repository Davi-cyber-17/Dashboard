/* Juventude e Organização — dashboard da pesquisa.
   Todos os números são calculados a partir de data/respostas.js (as respostas originais).
   Nenhum total ou porcentagem está escrito à mão neste arquivo. */
(function () {
  'use strict';

  const { perguntas, respostas: brutas } = window.PESQUISA;

  /* ---------- Dados ---------- */
  // O Forms gravou "Ás vezes" (P1) e "Às vezes" (P3): tratadas como a mesma opção.
  const grafia = (v) => (v === 'Ás vezes' ? 'Às vezes' : v);
  const dados = brutas.map((r) => {
    const o = { id: r.id };
    perguntas.forEach((p) => { o[p.id] = p.multipla ? r[p.id].map(grafia) : grafia(r[p.id]); });
    return o;
  });
  const TOTAL = dados.length;
  const P = Object.fromEntries(perguntas.map((p) => [p.id, p]));

  const NIVEL_MINIMO = 3; // níveis 3, 4 e 5 = impacto moderado ou significativo
  const nivel = (r) => parseInt(r.q6, 10);
  const COR = ['#1b2a8f', '#3446c9', '#6f7fe0', '#a9b3ee', '#d6dbf7', '#e9a23b'];

  /* ---------- Utilitários ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const nf = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pct = (n, base) => (base ? (n * 100) / base : 0);
  const fp = (v) => nf.format(v) + '%';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pl = (n, s, p) => (n === 1 ? s : p);

  const marcou = (r, q, valor) => (P[q].multipla ? r[q].includes(valor) : r[q] === valor);

  // acha o valor original de uma opção a partir do começo do texto
  function opc(q, inicio) {
    const o = P[q].opcoes.find((x) => x.valor.startsWith(inicio));
    if (!o) console.error('Opção não encontrada:', q, inicio);
    return o ? o.valor : inicio;
  }
  const qtd = (lista, q, valores) => lista.filter((r) => valores.some((v) => marcou(r, q, v))).length;

  function contagem(lista, q) {
    return P[q].opcoes.map((o) => ({ ...o, n: lista.filter((r) => marcou(r, q, o.valor)).length }));
  }
  // ordem fixa dos gráficos: escala original, ou frequência decrescente de TODOS os participantes
  const ordem = {};
  perguntas.forEach((p) => {
    const c = contagem(dados, p.id);
    ordem[p.id] = (p.ordenar === 'frequencia' ? [...c].sort((a, b) => b.n - a.n) : c).map((o) => o.valor);
  });
  const contagemOrdenada = (lista, q) => {
    const c = contagem(lista, q);
    return ordem[q].map((v) => c.find((o) => o.valor === v));
  };

  /* ---------- Filtros (estado) ---------- */
  const filtros = {};
  perguntas.forEach((p) => { filtros[p.id] = ''; });
  const selecao = () => dados.filter((r) => perguntas.every((p) => !filtros[p.id] || marcou(r, p.id, filtros[p.id])));
  const filtrosAtivos = () => perguntas.filter((p) => filtros[p.id]);

  /* ---------- Tooltip ---------- */
  const dica = $('#dica');
  function posicionar(x, y) {
    const m = 10, w = dica.offsetWidth, h = dica.offsetHeight;
    let left = x + 14, top = y + 16;
    if (left + w > innerWidth - m) left = x - w - 14;
    if (left < m) left = m;
    if (top + h > innerHeight - m) top = y - h - 14;
    if (top < m) top = m;
    dica.style.left = left + 'px';
    dica.style.top = top + 'px';
  }
  function mostrarDica(el, x, y) {
    dica.innerHTML = el.dataset.tip;
    dica.hidden = false;
    posicionar(x, y);
  }
  const temDica = (t) => (t && t.closest ? t.closest('[data-tip]') : null);
  document.addEventListener('pointerover', (e) => { const el = temDica(e.target); if (el && el.dataset.tip) mostrarDica(el, e.clientX, e.clientY); });
  document.addEventListener('pointermove', (e) => { if (!dica.hidden && e.pointerType !== 'touch') posicionar(e.clientX, e.clientY); });
  document.addEventListener('pointerout', (e) => { if (temDica(e.target) && e.pointerType !== 'touch') dica.hidden = true; });
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    const el = temDica(e.target);
    if (el && el.dataset.tip) mostrarDica(el, e.clientX, e.clientY); else dica.hidden = true;
  });
  document.addEventListener('focusin', (e) => {
    const el = temDica(e.target);
    if (el && el.dataset.tip) { const r = el.getBoundingClientRect(); mostrarDica(el, r.left + Math.min(r.width / 2, 120), r.top); }
  });
  document.addEventListener('focusout', () => { dica.hidden = true; });
  window.addEventListener('scroll', () => { dica.hidden = true; }, { passive: true });

  /* ---------- Textos que dependem do total ---------- */
  $$('[data-total]').forEach((el) => { el.textContent = TOTAL; });
  $$('[data-nperg]').forEach((el) => { el.textContent = perguntas.length; });

  /* ---------- Hero: um ponto por participante ---------- */
  function montarPontos() {
    $('#pontos').innerHTML = dados.map((r, i) =>
      `<span class="ponto n${nivel(r)}" style="--i:${i}" data-id="${r.id}" data-tip="<strong>Participante ${r.id}</strong><br>Impacto da falta de organização: nível ${nivel(r)}"></span>`).join('');
    const niveis = P.q6.opcoes.filter((o) => dados.some((r) => nivel(r) === o.marca));
    $('#pontos-legenda').innerHTML = niveis.map((o) => `<li><i class="n${o.marca}"></i>Nível ${o.marca} · ${esc(o.rotulo.toLowerCase())}</li>`).join('');
  }
  function atualizarPontos(ids) {
    $$('.ponto').forEach((el) => el.classList.toggle('fora', !ids.has(Number(el.dataset.id))));
  }

  /* ---------- Indicadores ---------- */
  function topo(lista, q, aceita) {
    const c = contagem(lista, q).filter((o) => (aceita ? aceita(o) : true));
    const max = Math.max(0, ...c.map((o) => o.n));
    if (!max) return null;
    return { nomes: c.filter((o) => o.n === max).map((o) => o.rotulo), n: max };
  }
  const GR = {
    planejam: () => [opc('q1', 'Sempre'), opc('q1', 'Frequentemente')],
    naoCumprem: () => [opc('q3', 'Frequentemente'), opc('q3', 'Às vezes')],
  };

  function atualizarKpis(lista) {
    const n = lista.length;
    const planejam = qtd(lista, 'q1', GR.planejam());
    const naoCumprem = qtd(lista, 'q3', GR.naoCumprem());
    const impacto = lista.filter((r) => nivel(r) >= NIVEL_MINIMO).length;
    const dif = topo(lista, 'q2', (o) => !o.neutro); // "Não tenho grandes dificuldades" não é uma dificuldade
    const rec = topo(lista, 'q7');
    const sub = (v) => (n ? `${fp(pct(v, n))} da seleção` : '—');
    const textoTopo = (t) => (t ? { v: t.nomes.join(' e '), s: `${t.n} de ${n} (${fp(pct(t.n, n))})` } : { v: '—', s: 'sem respostas na seleção' });
    const d = textoTopo(dif), r = textoTopo(rec);
    const cards = [
      { i: 'users', nome: 'Total de participantes', v: n, s: `de ${TOTAL} no total` },
      { i: 'cal', nome: 'Planejam as atividades sempre ou frequentemente', v: planejam, s: sub(planejam) },
      { i: 'hourglass', nome: 'Deixam de cumprir tarefas por falta de organização (frequentemente ou às vezes)', v: naoCumprem, s: sub(naoCumprem) },
      { i: 'gauge', nome: 'Relatam impacto moderado ou significativo da falta de organização (níveis 3 a 5)', v: impacto, s: sub(impacto) },
      { i: 'target', nome: 'Dificuldade mais mencionada', v: d.v, s: d.s, texto: true },
      { i: 'bell', nome: 'Recurso mais solicitado', v: r.v, s: r.s, texto: true },
    ];
    $('#kpis').innerHTML = cards.map((c) => `
      <article class="kpi">
        <svg class="icone" aria-hidden="true"><use href="#i-${c.i}"/></svg>
        <p class="kpi-nome">${esc(c.nome)}</p>
        <p class="kpi-valor${c.texto ? ' kpi-texto' : ''}">${esc(c.v)}</p>
        <p class="kpi-sub">${esc(c.s)}</p>
      </article>`).join('');
  }

  /* ---------- Gráficos das 7 perguntas ---------- */
  const opcoesDe = (p) => ordem[p.id].map((v) => p.opcoes.find((o) => o.valor === v));
  const ROSCA_C = 2 * Math.PI * 46;

  function htmlGrafico(p) {
    const ops = opcoesDe(p);
    if (p.grafico === 'barras') {
      return `<div class="barras" role="list">${ops.map((o, i) => `
        <div class="barra" role="listitem" tabindex="0" data-i="${i}">
          <div class="barra-topo"><span>${esc(o.rotulo)}</span><span class="barra-valor"></span></div>
          <div class="barra-trilho"><div class="barra-fill"></div></div>
        </div>`).join('')}</div>`;
    }
    if (p.grafico === 'colunas') {
      return `<div class="colunas" role="list">${ops.map((o, i) => `
        <div class="col" role="listitem" tabindex="0" data-i="${i}">
          <div class="col-trilho"><div class="col-fill${o.marca >= NIVEL_MINIMO ? ' alto' : ''}"><span class="col-valor"></span></div></div>
          <span class="col-rotulo">${o.marca ? `<b>${o.marca}</b>` : ''}${esc(o.rotulo)}</span>
        </div>`).join('')}</div>`;
    }
    return `<div class="rosca">
      <svg class="rosca-svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="rosca-fundo" cx="60" cy="60" r="46"/>
        ${ops.map((o, i) => `<circle class="rosca-seg" data-i="${i}" cx="60" cy="60" r="46" style="stroke:${COR[i % COR.length]}"/>`).join('')}
        <text class="rosca-n" x="60" y="62"></text><text class="rosca-sub" x="60" y="75">participantes</text>
      </svg>
      <div class="rosca-leg" role="list">${ops.map((o, i) => `
        <div class="rosca-item" role="listitem" tabindex="0" data-i="${i}"><i style="background:${COR[i % COR.length]}"></i><span>${esc(o.rotulo)}</span><span class="v"></span></div>`).join('')}</div>
    </div>`;
  }

  function montarCartoes() {
    $('#cartoes').innerHTML = perguntas.map((p) => `
      <article class="cartao-q" aria-labelledby="${p.id}-t">
        <h3 id="${p.id}-t">Pergunta ${p.numero} · ${esc(p.titulo)}</h3>
        <p class="q-enunciado">${esc(p.enunciado)}</p>
        ${p.multipla ? '<span class="selo">Múltipla seleção · % sobre os participantes</span>' : ''}
        <div class="grafico" data-q="${p.id}">${htmlGrafico(p)}</div>
        ${p.id === 'q6' ? `<p class="legenda-cor"><span><i style="background:var(--accent)"></i>Níveis 3 a 5 (usados no teste da hipótese)</span><span><i style="background:var(--accent-mid)"></i>Níveis 1 e 2</span></p>` : ''}
        <p class="grafico-desc" id="${p.id}-desc"></p>
        <details>
          <summary>Ver os dados em tabela</summary>
          <div class="tab-wrap"><table id="${p.id}-tab"><caption></caption>
            <thead><tr><th scope="col">Opção</th><th scope="col">Qtd.</th><th scope="col">%</th></tr></thead><tbody></tbody></table></div>
        </details>
      </article>`).join('');
  }

  function descricao(p, c, base) {
    if (!base) return 'Nenhum participante na seleção atual.';
    const max = Math.max(...c.map((o) => o.n));
    const tops = c.filter((o) => o.n === max);
    let t = `${tops.length > 1 ? 'Opções mais frequentes' : 'Opção mais frequente'}: ${tops.map((o) => o.completo).join(' e ')}, com ${max} de ${base} (${fp(pct(max, base))}).`;
    if (p.id === 'q6') {
      const k = c.filter((o) => o.marca >= NIVEL_MINIMO).reduce((s, o) => s + o.n, 0);
      t += ` Níveis 3 a 5: ${k} de ${base} (${fp(pct(k, base))}).`;
    }
    return t;
  }

  function atualizarGrafico(p, lista) {
    const base = lista.length;
    const c = contagemOrdenada(lista, p.id);
    const host = $(`.grafico[data-q="${p.id}"]`);
    let acc = 0;
    // colunas: o eixo vai até o maior valor (arredondado para cima, de 10 em 10); os rótulos mostram os valores reais
    const eixo = Math.max(10, Math.ceil(Math.max(...c.map((o) => pct(o.n, base))) / 10) * 10);
    c.forEach((o, i) => {
      const v = pct(o.n, base);
      const tip = `<strong>${esc(o.completo)}</strong><br>${o.n} de ${base} participantes · ${fp(v)}`;
      const rotulo = `${o.completo}: ${o.n} de ${base} participantes, ${fp(v)}`;
      $$(`[data-i="${i}"]`, host).forEach((el) => {
        el.dataset.tip = tip;
        if (el.getAttribute('role') === 'listitem') el.setAttribute('aria-label', rotulo);
      });
      if (p.grafico === 'barras') {
        const el = $(`.barra[data-i="${i}"]`, host);
        $('.barra-fill', el).style.width = v + '%';
        $('.barra-valor', el).innerHTML = `<b>${o.n}</b> · ${fp(v)}`;
      } else if (p.grafico === 'colunas') {
        const el = $(`.col[data-i="${i}"]`, host);
        const f = $('.col-fill', el);
        f.style.height = (v * 100) / eixo + '%';
        f.classList.toggle('zero', o.n === 0);
        $('.col-valor', el).innerHTML = `<b>${o.n}</b>${fp(v)}`;
      } else {
        const len = base ? (ROSCA_C * o.n) / base : 0;
        const seg = $(`.rosca-seg[data-i="${i}"]`, host);
        seg.style.strokeDasharray = `${len} ${ROSCA_C - len}`;
        seg.style.strokeDashoffset = -acc;
        acc += len;
        $('.rosca-item[data-i="' + i + '"] .v', host).innerHTML = `<b>${o.n}</b> · ${fp(v)}`;
      }
    });
    if (p.grafico === 'rosca') $('.rosca-n', host).textContent = base;
    $('#' + p.id + '-desc').textContent = descricao(p, c, base);
    const tab = $('#' + p.id + '-tab');
    $('caption', tab).textContent = `Base: ${base} ${pl(base, 'participante', 'participantes')}${p.multipla ? ' (cada um pôde marcar várias opções)' : ''}`;
    $('tbody', tab).innerHTML = c.map((o) => `<tr><th scope="row">${esc(o.completo)}</th><td>${o.n}</td><td>${fp(pct(o.n, base))}</td></tr>`).join('');
  }

  /* ---------- Filtros (interface) ---------- */
  function montarFiltros() {
    $('#filtros-campos').innerHTML = perguntas.map((p) => {
      const c = contagem(dados, p.id);
      return `<div class="campo">
        <label for="f-${p.id}">P${p.numero} · ${esc(p.curto)}${p.multipla ? ' <small>(quem marcou)</small>' : ''}</label>
        <select id="f-${p.id}" data-q="${p.id}">
          <option value="">Todos</option>
          ${c.map((o) => `<option value="${esc(o.valor)}">${esc(o.rotulo)} (${o.n})</option>`).join('')}
        </select></div>`;
    }).join('');
    $$('#filtros-campos select').forEach((s) => s.addEventListener('change', () => { filtros[s.dataset.q] = s.value; atualizar(); }));
    $('#limpar').addEventListener('click', limpar);
    $('#pilula-limpar').addEventListener('click', limpar);
    $('#chips').addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (b) { filtros[b.dataset.q] = ''; atualizar(); }
    });
  }
  function limpar() { perguntas.forEach((p) => { filtros[p.id] = ''; }); atualizar(); }

  function atualizarStatus(lista) {
    const n = lista.length, ativos = filtrosAtivos();
    $('#sel-n').textContent = n;
    $('#sel-total').textContent = TOTAL;
    $('#sel-pct').textContent = fp(pct(n, TOTAL));
    $('#sel-barra').style.width = pct(n, TOTAL) + '%';
    $$('#filtros-campos select').forEach((s) => { s.value = filtros[s.dataset.q]; s.classList.toggle('ativo', !!s.value); });
    $('#chips').innerHTML = ativos.map((p) => {
      const o = p.opcoes.find((x) => x.valor === filtros[p.id]);
      return `<button type="button" class="chip" data-q="${p.id}">P${p.numero} · ${esc(p.curto)}: ${esc(o.rotulo)}<span aria-hidden="true">×</span><span class="so-leitor">remover filtro</span></button>`;
    }).join('');
    $('#limpar').disabled = !ativos.length;
    $('#limpar').style.opacity = ativos.length ? 1 : .55;
    $('#vazio').hidden = n !== 0;
    $('#pilula').hidden = !ativos.length;
    $('#pilula-txt').textContent = `${ativos.length} ${pl(ativos.length, 'filtro ativo', 'filtros ativos')} · ${n} de ${TOTAL}`;
  }

  function atualizar() {
    const lista = selecao();
    atualizarStatus(lista);
    atualizarKpis(lista);
    perguntas.forEach((p) => atualizarGrafico(p, lista));
    atualizarPontos(new Set(lista.map((r) => r.id)));
  }

  /* ---------- Análise exploratória (todos os participantes) ---------- */
  function montarAchados() {
    const q = (qid, valores) => qtd(dados, qid, valores);
    const itens = [
      { t: 'Procrastinação', n: q('q2', [opc('q2', 'Procrastinação')]), x: 'marcaram a procrastinação entre suas dificuldades (pergunta 2).' },
      { t: 'Distrações', n: q('q2', [opc('q2', 'Distrações')]), x: 'marcaram distrações, como celular e redes sociais, entre suas dificuldades (pergunta 2).' },
      { t: 'Uso da memória', n: q('q4', [opc('q4', 'Memorizo')]), x: 'disseram memorizar as atividades para se organizar (pergunta 4).' },
      { t: 'Tarefas não cumpridas', n: q('q3', GR.naoCumprem()), x: 'deixam de cumprir tarefas frequentemente ou às vezes por falta de organização (pergunta 3).' },
      { t: 'Impacto da falta de organização', n: dados.filter((r) => nivel(r) >= NIVEL_MINIMO).length, x: 'indicaram impacto moderado ou significativo, níveis 3 a 5 (pergunta 6).' },
      { t: 'Lembretes automáticos', n: q('q7', [opc('q7', 'Lembretes')]), x: 'consideram úteis os lembretes automáticos (pergunta 7).' },
    ];
    $('#achados').innerHTML = itens.map((a) => `
      <article class="achado">
        <h3>${esc(a.t)}</h3>
        <p class="achado-pct">${fp(pct(a.n, TOTAL))}</p>
        <p class="achado-qtd">${a.n} de ${TOTAL} ${pl(a.n, 'participante', 'participantes')}</p>
        <div class="barra-trilho" aria-hidden="true"><div class="barra-fill" data-w="${pct(a.n, TOTAL)}"></div></div>
        <p class="achado-txt">${a.n} ${pl(a.n, 'pessoa', 'pessoas')} ${esc(a.x)}</p>
      </article>`).join('');
    const prio = q('q5', [opc('q5', 'Organizo as tarefas por ordem')]);
    const apps = q('q4', [opc('q4', 'Aplicativos')]);
    $('#achados-extra').textContent = `Também chama atenção: ${prio} (${fp(pct(prio, TOTAL))}) organizam as tarefas por ordem de prioridade (pergunta 5), e só ${apps} (${fp(pct(apps, TOTAL))}) usam aplicativos de organização (pergunta 4).`;
  }

  /* ---------- Teste da hipótese ---------- */
  function pBinomial(k, n) { // P(X >= k), X ~ Binomial(n; 0,5)
    const coef = [1];
    for (let i = 1; i <= n; i++) coef.push((coef[i - 1] * (n - i + 1)) / i);
    let s = 0;
    for (let i = k; i <= n; i++) s += coef[i];
    return s / Math.pow(2, n);
  }
  function fmtP(p) {
    if (p >= 0.001) return p.toLocaleString('pt-BR', { maximumFractionDigits: 4 });
    const [m, e] = p.toExponential(2).split('e');
    return `${m.replace('.', ',')} × 10<sup>${String(parseInt(e, 10)).replace('-', '−')}</sup>`;
  }

  function montarHipotese() {
    const n = TOTAL;
    const k = dados.filter((r) => nivel(r) >= NIVEL_MINIMO).length;
    const baixo = n - k;
    const prop = k / n;
    const apoia = prop > 0.5;
    const p = pBinomial(k, n);

    $('#hip-niveis').innerHTML = P.q6.opcoes.map((o) => {
      const c = dados.filter((r) => nivel(r) === o.marca).length;
      return `<div class="hip-nivel${o.marca >= NIVEL_MINIMO ? ' grupo' : ''}"><b>${c}</b><span>Nível ${o.marca}</span></div>`;
    }).join('');

    $('#hip-numeros').innerHTML = `
      <div><dt>Níveis 3, 4 e 5</dt><dd>${k} de ${n} · ${fp(pct(k, n))}</dd></div>
      <div><dt>Níveis 1 e 2</dt><dd>${baixo} de ${n} · ${fp(pct(baixo, n))}</dd></div>
      <div><dt>Limite de H0</dt><dd>50,0%</dd></div>
      <div><dt>Valor-p (binomial exato)</dt><dd>${fmtP(p)}<small>Complementar: chance de ver ${k} ou mais em ${n} se H0 fosse verdadeira. Abaixo de 0,05 reforça H1.</small></dd></div>`;

    const linhas = [
      { r: 'Limite de H0', v: 50, c: 'limite', t: 'Limite de H0: 50,0%' },
      { r: 'Níveis 3 a 5 (observado)', v: pct(k, n), c: '', t: `Níveis 3 a 5: ${k} de ${n} · ${fp(pct(k, n))}` },
      { r: 'Níveis 1 e 2', v: pct(baixo, n), c: 'baixo', t: `Níveis 1 e 2: ${baixo} de ${n} · ${fp(pct(baixo, n))}` },
    ];
    $('#hip-grafico').innerHTML = linhas.map((l) => `
      <div class="comp-linha" tabindex="0" data-tip="${esc(l.t)}" aria-label="${esc(l.t)}">
        <div class="comp-topo"><span>${esc(l.r)}</span><b>${fp(l.v)}</b></div>
        <div class="comp-trilho"><div class="comp-fill ${l.c}" data-w="${l.v}"></div></div>
      </div>`).join('');

    $('#hip-conclusao').innerHTML = apoia
      ? `<h3>Conclusão</h3>
         <p>Os resultados da pesquisa apoiam a hipótese H1, pois ${fp(pct(k, n))} dos participantes consideram que a falta de organização pessoal prejudica sua rotina de maneira moderada ou significativa.</p>
         <p>Essa conclusão descreve os ${n} participantes pesquisados e não representa necessariamente toda a população.</p>`
      : `<h3>Conclusão</h3>
         <p>Os resultados da pesquisa não apoiam a hipótese H1: apenas ${fp(pct(k, n))} dos participantes consideram que a falta de organização pessoal prejudica sua rotina de maneira moderada ou significativa, o que não passa de 50%.</p>
         <p>Essa conclusão descreve os ${n} participantes pesquisados e não representa necessariamente toda a população.</p>`;
  }

  /* ---------- Conclusão geral (texto com números calculados) ---------- */
  function montarConclusao() {
    const lista = (q, aceita) => contagemOrdenada(dados, q).filter(aceita || (() => true));
    const fmt = (o) => `${o.rotulo.toLowerCase()}, com ${o.n} (${fp(pct(o.n, TOTAL))})`;
    const dif = lista('q2', (o) => !o.neutro).slice(0, 3).map(fmt);
    const rec = lista('q7').slice(0, 3).map(fmt);
    const juntar = (a) => (a.length > 1 ? a.slice(0, -1).join('; ') + '; e ' + a[a.length - 1] : a[0]);
    const nao = qtd(dados, 'q3', GR.naoCumprem());
    const plan = qtd(dados, 'q1', GR.planejam());
    const rar = qtd(dados, 'q1', [opc('q1', 'Raramente'), opc('q1', 'Nunca')]);
    const imp = dados.filter((r) => nivel(r) >= NIVEL_MINIMO).length;
    const alto = dados.filter((r) => nivel(r) >= 4).length;
    const blocos = [
      ['Principais dificuldades', `As dificuldades mais marcadas foram ${juntar(dif)}.`],
      ['Frequência dos problemas', `${nao} participantes (${fp(pct(nao, TOTAL))}) deixam de cumprir tarefas frequentemente ou às vezes por falta de organização. Já ${plan} (${fp(pct(plan, TOTAL))}) planejam as atividades sempre ou frequentemente, e ${rar} (${fp(pct(rar, TOTAL))}) planejam raramente ou nunca.`],
      ['Impacto relatado', `${imp} participantes (${fp(pct(imp, TOTAL))}) indicaram impacto moderado ou significativo, e ${alto} (${fp(pct(alto, TOTAL))}) marcaram os níveis 4 ou 5.`],
      ['Recursos que gostariam de usar', `Os mais citados foram ${juntar(rec)}.`],
      ['Hábitos de planejamento', 'Os resultados sugerem espaço para desenvolver melhores hábitos de planejamento. Eles descrevem os participantes pesquisados e não indicam, por si só, relações de causa e efeito.'],
    ];
    $('#conclusao-texto').innerHTML = blocos.map(([t, x]) => `<div><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join('');
  }

  /* ---------- Navegação ---------- */
  function navegacao() {
    const btn = $('.menu-btn'), menu = $('#menu');
    btn.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto);
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => { menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false'); }));

    const links = new Map($$('a', menu).map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.removeAttribute('aria-current'));
          const a = links.get(e.target.id);
          if (a) a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

    const sobe = $('#topo-btn');
    const checa = () => { sobe.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', checa, { passive: true });
    checa();
    sobe.addEventListener('click', () => window.scrollTo({ top: 0 }));

    // barras das descobertas e da hipótese crescem quando aparecem na tela
    const barras = $$('[data-w]');
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          el.style.width = el.dataset.w + '%';
          io2.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    barras.forEach((b) => io2.observe(b));
  }

  /* ---------- Início ---------- */
  montarPontos();
  montarCartoes();
  montarFiltros();
  montarAchados();
  montarHipotese();
  montarConclusao();
  atualizar();
  navegacao();
})();
