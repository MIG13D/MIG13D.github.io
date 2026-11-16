(function () {
  'use strict';

  const copy = {
    pt: { title: 'Mais dados meteorológicos', apparent: 'Sensação térmica', humidity: 'Umidade relativa', wind: 'Vento', rain: 'Precipitação', sunrise: 'Nascer do sol', sunset: 'Pôr do sol', forecast: 'Previsão de 7 dias', hourly: 'Temperatura nas últimas 24 horas', hour: 'Hora (JST)', temperature: 'Temperatura (°C)', date: 'Data', range: 'Arquivo por período', start: 'Data inicial', end: 'Data final', load: 'Consultar período', share: 'Compartilhar período', min: 'Mínima', max: 'Máxima', mean: 'Média', loading: 'Carregando dados adicionais…', error: 'Não foi possível carregar estes dados. Tente novamente.', invalid: 'Escolha datas válidas desde 2010, com até 366 dias, e não posteriores a hoje.', empty: 'Sem dados disponíveis para este período.', day: 'Dia', refresh: 'Atualiza a cada 10 minutos enquanto a página está visível' },
    en: { title: 'More weather data', apparent: 'Feels like', humidity: 'Relative humidity', wind: 'Wind', rain: 'Precipitation', sunrise: 'Sunrise', sunset: 'Sunset', forecast: '7-day forecast', hourly: 'Temperature over the last 24 hours', hour: 'Hour (JST)', temperature: 'Temperature (°C)', date: 'Date', range: 'Date-range archive', start: 'Start date', end: 'End date', load: 'Load range', share: 'Share range', min: 'Minimum', max: 'Maximum', mean: 'Mean', loading: 'Loading additional weather…', error: 'Could not load this data. Please try again.', invalid: 'Choose valid dates from 2010 onward, no more than 366 days apart and not after today.', empty: 'No data is available for this range.', day: 'Day', refresh: 'Refreshes every 10 minutes while this page is visible' },
    es: { title: 'Más datos meteorológicos', apparent: 'Sensación térmica', humidity: 'Humedad relativa', wind: 'Viento', rain: 'Precipitación', sunrise: 'Amanecer', sunset: 'Atardecer', forecast: 'Pronóstico de 7 días', hourly: 'Temperatura de las últimas 24 horas', hour: 'Hora (JST)', temperature: 'Temperatura (°C)', date: 'Fecha', range: 'Archivo por período', start: 'Fecha inicial', end: 'Fecha final', load: 'Consultar período', share: 'Compartir período', min: 'Mínima', max: 'Máxima', mean: 'Media', loading: 'Cargando datos adicionales…', error: 'No se pudieron cargar estos datos. Inténtalo de nuevo.', invalid: 'Elige fechas válidas desde 2010, con un máximo de 366 días y no posteriores a hoy.', empty: 'No hay datos disponibles para este período.', day: 'Día', refresh: 'Se actualiza cada 10 minutos mientras la página está visible' },
    ja: { title: '追加の気象情報', apparent: '体感温度', humidity: '相対湿度', wind: '風速', rain: '降水量', sunrise: '日の出', sunset: '日の入り', forecast: '7日間予報', hourly: '過去24時間の気温', hour: '時刻 (JST)', temperature: '気温 (°C)', date: '日付', range: '期間別アーカイブ', start: '開始日', end: '終了日', load: '期間を表示', share: '期間を共有', min: '最低', max: '最高', mean: '平均', loading: '追加データを読み込み中…', error: 'データを読み込めませんでした。再試行してください。', invalid: '2010年以降、366日以内で今日までの日付を選択してください。', empty: 'この期間のデータはありません。', day: '日', refresh: 'ページ表示中は10分ごとに更新' }
  };
  const cache = new Map();
  let host, section, currentController, archiveController, currentRequest = 0, archiveRequest = 0, lastFetch = 0, currentData = null, archiveData = null, archiveError = false, currentError = false;
  const tr = key => {const value=(copy[language] || copy.en)[key] || copy.en[key];return key==='temperature'&&window.weatherUnit==='F'?value.replace('°C','°F'):value;};
  const windLabel = () => 'km/h';
  const windValue = value => Number.isFinite(value) ? `${(value * (windLabel() === 'mph' ? 0.621371 : windLabel() === 'm/s' ? 1 / 3.6 : 1)).toFixed(1)} ${windLabel()}` : '—';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = value => Number.isFinite(value) ? temperature(value) : '—';
  const validISO = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T12:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  };
  const todayJST = () => { const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()); return `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`; };
  const limitRange = (start, end) => {
    if (!validISO(start) || !validISO(end) || start < '2010-01-01' || end > todayJST() || start > end) return false;
    return (Date.parse(end + 'T00:00:00Z') - Date.parse(start + 'T00:00:00Z')) / 86400000 <= 365;
  };
  function urlFor(path, params) {
    const url = new URL(path);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    return url;
  }
  async function request(url, signal) {
    const key = String(url), cached = cache.get(key);
    if (cached && Date.now() - cached.time < 600000) return cached.data;
    const response = await fetch(key, { signal });
    if (!response.ok) throw new Error('weather request failed');
    const data = await response.json();
    if (!data || typeof data !== 'object' || data.error) throw new Error(data?.reason || 'weather response invalid');
    cache.set(key, { time: Date.now(), data });
    return data;
  }
  function mount() {
    if (!selected || (!selected.id && selected.id !== 0)) return;
    host = document.querySelector('main');
    if (!host) return;
    if (!section) {
      section = document.createElement('section');
      section.className = 'wx-extra';
      section.setAttribute('aria-labelledby', 'wx-title');
      host.append(section);
    }
    render();
    if (!currentData || Date.now() - lastFetch >= 600000) loadCurrent();
  }
  function render() {
    if (!section) return;
    const oldStart = section.querySelector('#wx-start')?.value;
    const oldEnd = section.querySelector('#wx-end')?.value;
    const params = new URLSearchParams(location.search);
    const initialStart = validISO(oldStart || '') ? oldStart : validISO(params.get('start') || '') ? params.get('start') : '';
    const initialEnd = validISO(oldEnd || '') ? oldEnd : validISO(params.get('end') || '') ? params.get('end') : '';
    const cur = currentData?.current || null;
    const todayIndex=currentData?.daily?.time?.indexOf(todayJST())??-1;
    const selectedStart = oldStart !== undefined ? oldStart : initialStart;
    const selectedEnd = oldEnd !== undefined ? oldEnd : initialEnd;
    section.innerHTML = `<header class="wx-head"><div><span class="wx-kicker">Open-Meteo</span><h2 id="wx-title">${tr('title')}</h2></div><span class="wx-updated">${currentError?tr('error'):tr('refresh')}</span></header>
      <div class="wx-facts" aria-live="polite">${[['apparent', cur?.apparent_temperature, true], ['humidity', cur?.relative_humidity_2m, false], ['wind', cur?.wind_speed_10m, false], ['rain', cur?.precipitation, false], ['sunrise', currentData?.daily?.sunrise?.[todayIndex], 'time'], ['sunset', currentData?.daily?.sunset?.[todayIndex], 'time']].map(([label, value, type]) => `<div class="wx-fact"><span>${tr(label)}</span><strong>${type === 'time' ? clock(value) : type === false && label === 'humidity' ? (Number.isFinite(value) ? `${value}%` : '—') : type === false && label === 'wind' ? windValue(value) : type === false && label === 'rain' ? (Number.isFinite(value) ? `${value} mm` : '—') : num(value)}</strong></div>`).join('')}</div>
      <div class="wx-columns"><section class="wx-block"><h3>${tr('forecast')}</h3>${forecastMarkup()}</section><section class="wx-block"><h3>${tr('hourly')}</h3>${hourlyMarkup()}</section></div>
      <section class="wx-archive"><div class="wx-block-title"><h3>${tr('range')}</h3><button type="button" class="wx-share" id="wx-share" ${selectedStart && selectedEnd ? '' : 'disabled'}>${tr('share')}</button></div><form id="wx-form" class="wx-form"><label>${tr('start')}<input id="wx-start" type="date" min="2010-01-01" max="${todayJST()}" value="${esc(selectedStart)}" required></label><label>${tr('end')}<input id="wx-end" type="date" min="2010-01-01" max="${todayJST()}" value="${esc(selectedEnd)}" required></label><button type="submit">${tr('load')}</button></form><p class="wx-status" id="wx-status" role="status">${archiveError ? tr('error') : archiveController ? tr('loading') : ''}</p><div id="wx-archive-result">${archiveMarkup()}</div>${currentData?'<a class="wx-api-source" target="_blank" rel="noopener">Open-Meteo ↗</a>':''}</section>`;
    const startInput = section.querySelector('#wx-start'), endInput = section.querySelector('#wx-end'), shareButton = section.querySelector('#wx-share');
    const updateShare = () => { shareButton.disabled = !limitRange(startInput.value, endInput.value); };
    if(currentData){const source=section.querySelector('.wx-api-source');if(source)source.href=urlFor('https://api.open-meteo.com/v1/forecast',{latitude:selected.lat,longitude:selected.lon,current:'apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation',hourly:'temperature_2m',daily:'temperature_2m_min,temperature_2m_max,precipitation_sum,sunrise,sunset',timezone:'Asia/Tokyo',forecast_days:'7',past_days:'1'}).toString();}updateShare();startInput.addEventListener('input', updateShare); endInput.addEventListener('input', updateShare);
    section.querySelector('#wx-form').addEventListener('submit', event => { event.preventDefault(); loadArchive(startInput.value, endInput.value); });
    section.querySelector('#wx-share').addEventListener('click', shareRange);
    if (initialStart && initialEnd && limitRange(initialStart, initialEnd) && !archiveData && !archiveController && archiveRequest === 0) loadArchive(initialStart, initialEnd);
  }
  const clock = iso => {if(typeof iso!=='string')return '—';const date=new Date(/(?:Z|[+-]\d{2}:\d{2})$/.test(iso)?iso:iso+'+09:00');return Number.isFinite(date.getTime())?new Intl.DateTimeFormat(locale(), {hour:'2-digit',minute:'2-digit',timeZone:'Asia/Tokyo'}).format(date):'—';};
  function forecastMarkup() {
    const d = currentData?.daily;
    if (!d?.time) return `<p class="wx-status">${tr(currentError?'error':'loading')}</p>`;
    return `<div class="wx-table-wrap"><table><thead><tr><th>${tr('day')}</th><th>${tr('min')}</th><th>${tr('max')}</th><th>${tr('rain')}</th></tr></thead><tbody>${d.time.map((day, i) => ({ day, i })).filter(({day})=>day>=todayJST()).slice(0, 7).map(({ day, i }) => `<tr><th scope="row">${esc(new Intl.DateTimeFormat(locale(), { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(day + 'T12:00:00Z')))}</th><td>${num(d.temperature_2m_min?.[i])}</td><td>${num(d.temperature_2m_max?.[i])}</td><td>${Number.isFinite(d.precipitation_sum?.[i]) ? `${d.precipitation_sum[i]} mm` : '—'}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function hourlyMarkup() {
    const h = currentData?.hourly;
    if (!h?.time) return `<p class="wx-status">${tr(currentError?'error':'loading')}</p>`;
    const now = Date.now(), indices = h.time.map((v, i) => [Date.parse(v + '+09:00'), i]).filter(([time]) => time <= now && time >= now - 24 * 3600000).map(([, i]) => i);
    const values = indices.map(i => h.temperature_2m?.[i]);
    const validValues=values.filter(Number.isFinite),min=validValues.length?Math.min(...validValues):NaN,max=validValues.length?Math.max(...validValues):NaN,span=max-min||1;
    const paths=[];let segment=[];values.forEach((v,i)=>{if(Number.isFinite(v))segment.push(`${(i*300/Math.max(1,values.length-1)).toFixed(1)},${(90-(v-min)/span*76).toFixed(1)}`);else if(segment.length){paths.push(segment.join(' '));segment=[]}});if(segment.length)paths.push(segment.join(' '));
    return `<figure class="wx-chart"><svg viewBox="0 0 300 100" role="img" aria-label="${esc(tr('hourly'))}" preserveAspectRatio="none"><line x1="0" y1="90" x2="300" y2="90"/>${paths.map(points=>`<polyline points="${points}"/>`).join('')} </svg><figcaption>${values.length ? `${num(min)} – ${num(max)}` : tr('empty')}</figcaption></figure><div class="wx-table-wrap"><table><thead><tr><th>${tr('hour')}</th><th>${tr('temperature')}</th></tr></thead><tbody>${indices.map(i => `<tr><th scope="row">${esc(clock(h.time[i] + '+09:00'))}</th><td>${num(h.temperature_2m?.[i])}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function archiveMarkup() {
    if (!archiveData) return '';
    const d = archiveData.daily;
    if (!d?.time?.length) return `<p class="wx-status">${tr('empty')}</p>`;
    const values = d.temperature_2m_mean || [], mins = (d.temperature_2m_min || []).filter(Number.isFinite), maxes = (d.temperature_2m_max || []).filter(Number.isFinite), min = mins.length ? Math.min(...mins) : NaN, max = maxes.length ? Math.max(...maxes) : NaN;
    const chartValues=values,validValues=chartValues.filter(Number.isFinite),lo=validValues.length?Math.min(...validValues):NaN,hi=validValues.length?Math.max(...validValues):NaN,span=hi-lo||1;
    const paths=[];let segment=[];chartValues.forEach((v,i)=>{if(Number.isFinite(v))segment.push(`${(i*640/Math.max(1,chartValues.length-1)).toFixed(1)},${(80-(v-lo)/span*65).toFixed(1)}`);else if(segment.length){paths.push(segment.join(' '));segment=[]}});if(segment.length)paths.push(segment.join(' '));
    return `<figure class="wx-chart wx-archive-chart"><svg viewBox="0 0 640 90" role="img" aria-label="${esc(tr('range'))}" preserveAspectRatio="none"><line x1="0" y1="80" x2="640" y2="80"/>${paths.map(points=>`<polyline points="${points}"/>`).join('')} </svg><figcaption>${tr('min')}: ${num(min)} · ${tr('max')}: ${num(max)}</figcaption></figure><div class="wx-table-wrap"><table><thead><tr><th>${tr('date')}</th><th>${tr('min')}</th><th>${tr('max')}</th><th>${tr('mean')}</th></tr></thead><tbody>${d.time.map((day, i) => `<tr><th scope="row">${esc(day)}</th><td>${num(d.temperature_2m_min?.[i])}</td><td>${num(d.temperature_2m_max?.[i])}</td><td>${num(values[i])}</td></tr>`).join('')}</tbody></table></div>`;
  }
  async function loadCurrent() {
    currentController?.abort(); const controller = new AbortController(); currentController = controller; const requestId = ++currentRequest;
    const timer = setTimeout(() => controller.abort(), 18000);
    const p = selected;
    const url = urlFor('https://api.open-meteo.com/v1/forecast', { latitude: p.lat, longitude: p.lon, current: 'apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation', hourly: 'temperature_2m', daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum,sunrise,sunset', timezone: 'Asia/Tokyo', forecast_days: '7', past_days: '1' });
    try { const data = await request(url, controller.signal); if (requestId !== currentRequest) return; currentError=false; currentData = data; lastFetch = Date.now(); render(); if (data.daily?.time?.[0]) { const link=section.querySelector('.wx-api-source');if(link)link.href=urlFor('https://api.open-meteo.com/v1/forecast', { latitude: p.lat, longitude: p.lon, current: 'apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation', hourly: 'temperature_2m', daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum,sunrise,sunset', timezone: 'Asia/Tokyo', forecast_days: '7', past_days: '1' }).toString(); } }
    catch (error) { if (requestId === currentRequest && section){currentError=true;lastFetch=Date.now();render();} }
    finally { clearTimeout(timer); if (requestId === currentRequest) currentController = null; }
  }
  async function loadArchive(start, end) {
    const status = section.querySelector('#wx-status');
    if (!limitRange(start, end)) { status.textContent = tr('invalid'); return; }
    archiveController?.abort(); const controller = new AbortController(); archiveController = controller; const requestId = ++archiveRequest;
    const timer = setTimeout(() => controller.abort(), 25000);
    archiveError = false; status.textContent = tr('loading'); archiveData = null;section.querySelector('#wx-archive-result').replaceChildren();
    const p = selected;
    const url = urlFor('https://archive-api.open-meteo.com/v1/archive', { latitude: p.lat, longitude: p.lon, start_date: start, end_date: end, daily: 'temperature_2m_mean,temperature_2m_max,temperature_2m_min', timezone: 'Asia/Tokyo' });
    try { const data = await request(url, controller.signal); if (requestId !== archiveRequest) return; if(!Array.isArray(data.daily?.time)||!data.daily.time.length||data.daily.time.some(day=>!validISO(day)||day<start||day>end))throw Error('Invalid archive dates');archiveData = data; const qs = new URLSearchParams(location.search); qs.set('id', p.id); qs.set('lang', language); qs.set('start', start); qs.set('end', end); history.replaceState(null, '', `${location.pathname}?${qs.toString()}${location.hash}`); render(); section.querySelector('#wx-status').textContent = ''; }
    catch (error) { if (requestId === archiveRequest) { archiveError = true; section.querySelector('#wx-status').textContent = tr('error'); } }
    finally { clearTimeout(timer); if (requestId === archiveRequest){archiveController=null;render();} }
  }
  function shareRange() {
    const start = section.querySelector('#wx-start').value, end = section.querySelector('#wx-end').value;
    if (!limitRange(start, end)) { section.querySelector('#wx-status').textContent = tr('invalid'); return; }
    const url = new URL(location.href); url.searchParams.set('id', selected.id); url.searchParams.set('lang', language); url.searchParams.set('start', start); url.searchParams.set('end', end);
    if (navigator.share) navigator.share({ title: document.title, url: url.toString() }).catch(() => { section.querySelector('#wx-status').textContent = url.toString(); });
    else if (navigator.clipboard) navigator.clipboard.writeText(url.toString()).then(() => { section.querySelector('#wx-status').textContent = url.toString(); }).catch(() => { section.querySelector('#wx-status').textContent = url.toString(); });
    else section.querySelector('#wx-status').textContent = url.toString();
  }
  document.addEventListener('change', event => { if ((event.target?.id === 'language-select' || event.target?.matches?.('[data-weather-unit]')) && section) render(); });
  window.addEventListener('weather-preferences', () => { if (section) render(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && section && Date.now() - lastFetch >= 600000) loadCurrent(); });
  window.addEventListener('online', () => { if (section) { cache.clear(); loadCurrent(); } });
  const init = () => { if (selected&&document.querySelector('#detail-page')) mount(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
  setInterval(() => { if (section && !document.hidden && Date.now() - lastFetch >= 600000) loadCurrent(); }, 60000);
})();
