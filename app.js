const places = [
  ['Sapporo','札幌市','Hokkaido','city',43.0618,141.3545],['Hakodate','函館市','Hokkaido','city',41.7687,140.7291],['Asahikawa','旭川市','Hokkaido','city',43.7706,142.3650],['Kushiro','釧路市','Hokkaido','city',42.9849,144.3818],['Aomori','青森市','Aomori','city',40.8222,140.7474],['Hirosaki','弘前市','Aomori','city',40.6031,140.4638],['Morioka','盛岡市','Iwate','city',39.7021,141.1545],['Miyako','宮古市','Iwate','city',39.6414,141.9571],['Sendai','仙台市','Miyagi','city',38.2682,140.8694],['Ishinomaki','石巻市','Miyagi','city',38.4345,141.3029],['Akita','秋田市','Akita','city',39.7199,140.1024],['Yokote','横手市','Akita','city',39.3139,140.5669],['Yamagata','山形市','Yamagata','city',38.2554,140.3396],['Tsuruoka','鶴岡市','Yamagata','city',38.7272,139.8267],['Fukushima','福島市','Fukushima','city',37.7608,140.4747],['Iwaki','いわき市','Fukushima','city',37.0504,140.8877],['Mito','水戸市','Ibaraki','city',36.3659,140.4712],['Tsukuba','つくば市','Ibaraki','city',36.0835,140.0764],['Utsunomiya','宇都宮市','Tochigi','city',36.5658,139.8836],['Nikko','日光市','Tochigi','city',36.7198,139.6982],['Maebashi','前橋市','Gunma','city',36.3895,139.0634],['Takasaki','高崎市','Gunma','city',36.3219,139.0033],['Saitama','さいたま市','Saitama','city',35.8617,139.6455],['Kawagoe','川越市','Saitama','city',35.9251,139.4858],['Chiba','千葉市','Chiba','city',35.6073,140.1063],['Narita','成田市','Chiba','city',35.7766,140.3188],['Tokyo','東京都','Tokyo','ward',35.6762,139.6503],['Shinjuku','新宿区','Tokyo','ward',35.6938,139.7034],['Hachioji','八王子市','Tokyo','city',35.6664,139.3160],['Yokohama','横浜市','Kanagawa','city',35.4437,139.6380],['Kamakura','鎌倉市','Kanagawa','city',35.3192,139.5467],['Niigata','新潟市','Niigata','city',37.9161,139.0364],['Nagaoka','長岡市','Niigata','city',37.4464,138.8513],['Toyama','富山市','Toyama','city',36.6953,137.2113],['Takaoka','高岡市','Toyama','city',36.7541,137.0257],['Kanazawa','金沢市','Ishikawa','city',36.5613,136.6562],['Wajima','輪島市','Ishikawa','city',37.3906,136.8992],['Fukui','福井市','Fukui','city',36.0641,136.2196],['Tsuruga','敦賀市','Fukui','city',35.6452,136.0558],['Kofu','甲府市','Yamanashi','city',35.6642,138.5684],['Fujiyoshida','富士吉田市','Yamanashi','city',35.4875,138.8074],['Nagano','長野市','Nagano','city',36.6486,138.1948],['Matsumoto','松本市','Nagano','city',36.2380,137.9720],['Gifu','岐阜市','Gifu','city',35.4233,136.7607],['Takayama','高山市','Gifu','city',36.1461,137.2522],['Shizuoka','静岡市','Shizuoka','city',34.9756,138.3828],['Hamamatsu','浜松市','Shizuoka','city',34.7108,137.7261],['Nagoya','名古屋市','Aichi','city',35.1815,136.9066],['Toyota','豊田市','Aichi','city',35.0824,137.1563],['Tsu','津市','Mie','city',34.7186,136.5057],['Ise','伊勢市','Mie','city',34.4875,136.7093],['Otsu','大津市','Shiga','city',35.0179,135.8546],['Hikone','彦根市','Shiga','city',35.2744,136.2597],['Kyoto','京都市','Kyoto','city',35.0116,135.7681],['Uji','宇治市','Kyoto','city',34.8845,135.7997],['Osaka','大阪市','Osaka','city',34.6937,135.5023],['Sakai','堺市','Osaka','city',34.5733,135.4828],['Kobe','神戸市','Hyogo','city',34.6901,135.1956],['Himeji','姫路市','Hyogo','city',34.8151,134.6853],['Nara','奈良市','Nara','city',34.6851,135.8049],['Wakayama','和歌山市','Wakayama','city',34.2305,135.1708],['Tottori','鳥取市','Tottori','city',35.5011,134.2351],['Yonago','米子市','Tottori','city',35.4281,133.3309],['Matsue','松江市','Shimane','city',35.4681,133.0484],['Izumo','出雲市','Shimane','city',35.3671,132.7548],['Okayama','岡山市','Okayama','city',34.6551,133.9195],['Kurashiki','倉敷市','Okayama','city',34.5850,133.7719],['Hiroshima','広島市','Hiroshima','city',34.3853,132.4553],['Fukuyama','福山市','Hiroshima','city',34.4859,133.3623],['Yamaguchi','山口市','Yamaguchi','city',34.1785,131.4737],['Shimonoseki','下関市','Yamaguchi','city',33.9578,130.9415],['Tokushima','徳島市','Tokushima','city',34.0703,134.5548],['Naruto','鳴門市','Tokushima','city',34.1726,134.6088],['Takamatsu','高松市','Kagawa','city',34.3428,134.0466],['Marugame','丸亀市','Kagawa','city',34.2895,133.7977],['Matsuyama','松山市','Ehime','city',33.8392,132.7657],['Imabari','今治市','Ehime','city',34.0661,132.9978],['Kochi','高知市','Kochi','city',33.5597,133.5311],['Shimanto','四万十市','Kochi','city',32.9913,132.9335],['Fukuoka','福岡市','Fukuoka','city',33.5904,130.4017],['Kitakyushu','北九州市','Fukuoka','city',33.8835,130.8752],['Saga','佐賀市','Saga','city',33.2494,130.2988],['Karatsu','唐津市','Saga','city',33.4500,129.9680],['Nagasaki','長崎市','Nagasaki','city',32.7503,129.8777],['Sasebo','佐世保市','Nagasaki','city',33.1799,129.7151],['Kumamoto','熊本市','Kumamoto','city',32.8031,130.7079],['Aso','阿蘇市','Kumamoto','city',32.9523,131.1218],['Oita','大分市','Oita','city',33.2396,131.6093],['Beppu','別府市','Oita','city',33.2795,131.4979],['Miyazaki','宮崎市','Miyazaki','city',31.9077,131.4202],['Nichinan','日南市','Miyazaki','city',31.6018,131.3788],['Kagoshima','鹿児島市','Kagoshima','city',31.5966,130.5571],['Yakushima','屋久島町','Kagoshima','town',30.3586,130.5328],['Naha','那覇市','Okinawa','city',26.2124,127.6809],['Ishigaki','石垣市','Okinawa','city',24.3448,124.1572],
  ['Otaru Station','小樽駅','Hokkaido','station',43.1970,140.9938],['Shin-Aomori Station','新青森駅','Aomori','station',40.8273,140.6941],['Sendai Station','仙台駅','Miyagi','station',38.2601,140.8824],['Tokyo Station','東京駅','Tokyo','station',35.6812,139.7671],['Shinjuku Station','新宿駅','Tokyo','station',35.6896,139.7006],['Yokohama Station','横浜駅','Kanagawa','station',35.4658,139.6223],['Kanazawa Station','金沢駅','Ishikawa','station',36.5781,136.6482],['Nagoya Station','名古屋駅','Aichi','station',35.1709,136.8815],['Kyoto Station','京都駅','Kyoto','station',34.9858,135.7588],['Osaka Station','大阪駅','Osaka','station',34.7025,135.4959],['Shin-Osaka Station','新大阪駅','Osaka','station',34.7335,135.5001],['Hiroshima Station','広島駅','Hiroshima','station',34.3974,132.4757],['Hakata Station','博多駅','Fukuoka','station',33.5902,130.4207],['Naha Airport Station','那覇空港駅','Okinawa','station',26.1958,127.6458],
  ['Niseko','ニセコ町','Hokkaido','town',42.8048,140.6874],['Teshikaga','弟子屈町','Hokkaido','town',43.4868,144.4594],['Shiraoi','白老町','Hokkaido','town',42.5513,141.3555],['Oirase','おいらせ町','Aomori','town',40.5997,141.4051],['Shichinohe','七戸町','Aomori','town',40.6964,141.1575],['Rikuzentakata','陸前高田市','Iwate','city',39.0142,141.6277],['Zao','蔵王町','Miyagi','town',38.0984,140.6583],['Daisen','大仙市','Akita','city',39.4532,140.4756],['Zao Onsen','蔵王温泉','Yamagata','station',38.1667,140.3982],['Ouchi-juku','大内宿','Fukushima','town',37.3333,139.8608],['Oarai','大洗町','Ibaraki','town',36.3136,140.5745],['Mashiko','益子町','Tochigi','town',36.4674,140.0932],['Kusatsu','草津町','Gunma','town',36.6203,138.5967],['Chichibu','秩父市','Saitama','city',35.9903,139.0764],['Katsuura','勝浦市','Chiba','city',35.1525,140.3208],['Ome','青梅市','Tokyo','city',35.7881,139.2758],['Hakone','箱根町','Kanagawa','town',35.2324,139.1069],['Yuzawa','湯沢町','Niigata','town',36.9364,138.8174],['Tateyama','立山町','Toyama','town',36.6639,137.3136],['Kaga','加賀市','Ishikawa','city',36.3020,136.3147],['Eiheiji','永平寺町','Fukui','town',36.0927,136.2982],['Fujikawaguchiko','富士河口湖町','Yamanashi','town',35.4972,138.7550],['Karuizawa','軽井沢町','Nagano','town',36.3480,138.5969],['Shirakawa-go','白川村','Gifu','town',36.2708,136.8986],['Atami','熱海市','Shizuoka','city',35.0956,139.0717],['Inuyama','犬山市','Aichi','city',35.3786,136.9445],['Iga','伊賀市','Mie','city',34.7687,136.1292],['Nagahama','長浜市','Shiga','city',35.3808,136.2788],['Amanohashidate','天橋立','Kyoto','station',35.5576,135.1868],['Koyasan','高野町','Wakayama','town',34.2128,135.5855],['Miyoshi','三好市','Tokushima','city',34.0257,133.8075],['Kotohira','琴平町','Kagawa','town',34.1913,133.8211],['Dogo Onsen','道後温泉','Ehime','station',33.8505,132.7865],['Shimanto Town','四万十町','Kochi','town',33.2120,133.1360],['Dazaifu','太宰府市','Fukuoka','city',33.5128,130.5239],['Arita','有田町','Saga','town',33.2136,129.9000],['Unzen','雲仙市','Nagasaki','city',32.8353,130.1878],['Kurokawa Onsen','黒川温泉','Kumamoto','station',33.0765,131.1383],['Yufuin','由布市','Oita','city',33.2658,131.3550],['Takachiho','高千穂町','Miyazaki','town',32.7115,131.3077],['Ibusuki','指宿市','Kagoshima','city',31.2527,130.6333],['Miyakojima','宮古島市','Okinawa','city',24.8055,125.2811],['Yonaguni','与那国町','Okinawa','town',24.4670,123.0044]
].map((p,i)=>({id:i,name:p[0],jp:p[1],pref:p[2],type:p[3],lat:p[4],lon:p[5],temp:null,condition:'',loaded:false}));

'use strict';
const $=s=>document.querySelector(s);
const dict=JP_I18N.dictionary;
// Priority: explicit shared-link language, saved choice, browser preferences, Portuguese fallback.
function supportedLanguage(value){
  if(typeof value!=='string')return null;
  const base=value.trim().toLowerCase().replace(/_/g,'-').split('-')[0];
  return Object.hasOwn(dict,base)?base:null;
}
const browserLanguages=[...(Array.isArray(navigator.languages)?navigator.languages:[]),navigator.language];
let language=browserLanguages.map(supportedLanguage).find(Boolean)||'pt';
try { const saved=supportedLanguage(localStorage.getItem('japan-weather-language')); if(saved)language=saved; } catch {}
const urlLanguage=supportedLanguage(new URLSearchParams(location.search).get('lang'));if(urlLanguage)language=urlLanguage;
const t=key=>dict[language].text[key] ?? dict.pt.text[key] ?? key;
const locale=()=>JP_I18N.locale[language];
const temperature=value=>Number.isFinite(value)?`${new Intl.NumberFormat(locale(),{maximumFractionDigits:1,minimumFractionDigits:1}).format(window.weatherUnit==='F'?value*9/5+32:value)} °${window.weatherUnit==='F'?'F':'C'}`:t('unknown');
const number=value=>new Intl.NumberFormat(locale(),{maximumFractionDigits:5}).format(value);
const stamp=value=>!Number.isFinite(new Date(value).getTime())?t('unknown'):new Intl.DateTimeFormat(locale(),{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Tokyo'}).format(new Date(value))+' JST';
const condition=code=>dict[language].weather[code]||t('unknown');
const placeName=p=>language==='ja'?p.jp:p.name;
const tokyoToday=()=>{
  const parts=new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Tokyo'}).formatToParts(new Date());
  return ['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');
};
const dateLabel=iso=>new Intl.DateTimeFormat(locale(),{dateStyle:'long',timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
const grid=$('#location-grid');
const PAGE_SIZE=40;
let currentPage=1,sortAsc=true,activeRequests=0,lastRefresh=Date.now(),lastSuccess=null;
const detailId=new URLSearchParams(location.search).get('id');
const selected=detailId!==null&&/^\d+$/.test(detailId)?places.find(p=>p.id===Number(detailId)):null;
const detail={mode:'current',current:null,history:null,status:'idle',busy:false,version:0,controller:null};
const currentEndpoint=p=>`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,weather_code&timezone=Asia%2FTokyo`;
function setText(selector,value){const el=$(selector);if(el)el.textContent=value;}
function fillStatic(){
  document.documentElement.lang=locale();
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
  $('#language-select').value=language;
  setText('.brand .brand-title',t('brand'));
  setText('footer .footer-brand','日 '+t('brand'));
  setText('#updated',lastSuccess?`${t('updating')} · ${stamp(lastSuccess)}`:t('autoRefresh'));
  document.title=selected?`${placeName(selected)} | ${t('brand')}`:t('title');
  if(grid){
    $('#search').placeholder=t('search');$('#search').setAttribute('aria-label',t('search'));
    const labels={all:'typeAll',city:'cityAll',ward:'wardAll',town:'townAll',station:'stationAll'};
    [...$('#type-filter').options].forEach(o=>o.textContent=t(labels[o.value]));
    $('#pref-filter').options[0].textContent=t('prefAll');
    $('#sort-button').title=t('sort');
  }
}
function setLanguage(next){
  if(!Object.hasOwn(dict,next))return;
  language=next;const languageURL=new URL(location.href);languageURL.searchParams.set('lang',next);history.replaceState(history.state,'',languageURL.href);try{localStorage.setItem('japan-weather-language',language)}catch{}
  fillStatic();
  if(grid){renderList();window.dispatchEvent(new Event('weather-data-updated'));window.dispatchEvent(new Event('language-changed'));}
  else if(selected){updateMonths();renderDetail();}
}
$('#language-select').addEventListener('change',e=>setLanguage(e.target.value));
function filtered(){
  const q=$('#search').value.trim().toLocaleLowerCase();
  return places.filter(p=>(!window.exploreState?.onlyFavorites||window.exploreState.favorites.has(p.id))&&(!q||(window.placeMatches?window.placeMatches(p,q):[p.name,p.jp,p.pref,dict[language][p.type]].some(x=>x.toLocaleLowerCase().includes(q))))&&($('#type-filter').value==='all'||p.type===$('#type-filter').value)&&($('#pref-filter').value==='all'||p.pref===$('#pref-filter').value)).sort((a,b)=>{if(window.exploreState&&window.exploreState.sort!=='name'){if(a.temp===null)return b.temp===null?0:1;if(b.temp===null)return -1;return (window.exploreState.sort==='cold'?1:-1)*(a.temp-b.temp);}return (sortAsc?1:-1)*placeName(a).localeCompare(placeName(b),locale());});
}
function renderList(){
  const rows=filtered();
  currentPage=Math.min(currentPage,Math.max(1,Math.ceil(rows.length/PAGE_SIZE)));
  const shown=rows.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);
  const focused=document.activeElement?.dataset.placeId;
  const markup=shown.map(p=>`<article class="location-card" data-place-id="${p.id}"><a class="card-link" href="local.html?id=${p.id}&lang=${language}" data-place-id="${p.id}" aria-label="${t('viewDetails')} ${placeName(p)}"><span class="card-top"><span><span class="place-name">${placeName(p)}</span><span class="place-name-ja">${language==='ja'?p.name:p.jp}</span><span class="place-kind">${dict[language][p.type]}</span></span><span class="temp ${p.temp===null?'undefined':p.temp>=20?'warm':'cool'}">${p.temp===null&&(!p.loaded||p.loading)?'…':temperature(p.temp)}</span></span><span class="card-bottom"><span>${p.pref}</span><span>${p.loading?t('loadingWeather'):p.temp===null?t('unknown'):condition(p.weatherCode)}</span></span></a><span class="card-actions"><button type="button" data-favorite="${p.id}"></button><button type="button" data-compare="${p.id}"></button></span></article>`).join('');
  const template=document.createElement('template');template.innerHTML=markup;
  const existing=new Map([...grid.children].map(el=>[el.dataset.placeId,el]));
  const wanted=new Set(shown.map(p=>String(p.id)));
  for(const el of [...grid.children])if(!wanted.has(el.dataset.placeId))el.remove();
  [...template.content.children].forEach((fresh,index)=>{
    const old=existing.get(fresh.dataset.placeId);
    const node=old||fresh;
    if(old){
      old.querySelector('a').setAttribute('aria-label',fresh.querySelector('a').getAttribute('aria-label'));old.querySelector('a').href=fresh.querySelector('a').href;
      // Keep links and their descendants alive while the user presses a card.
      const before=old.querySelector('a').querySelectorAll('span'),after=fresh.querySelector('a').querySelectorAll('span');
      after.forEach((el,i)=>{if(!el.children.length&&before[i].textContent!==el.textContent)before[i].textContent=el.textContent;if(before[i].className!==el.className)before[i].className=el.className;});
    }
    if(grid.children[index]!==node)grid.insertBefore(node,grid.children[index]||null);
  });
  if(focused)grid.querySelector(`.card-link[data-place-id="${focused}"]`)?.focus({preventScroll:true});
  setText('#result-count',`${rows.length} · ${t('locations')}`);
  $('#empty-state').hidden=rows.length>0;renderPagination(rows.length);
  pumpQueue();
}
function pumpQueue(){
  if(!grid||document.hidden)return;
  const pending=(window.exploreState&&window.exploreState.sort!=='name'?filtered():filtered().slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE)).filter(p=>!p.loading&&!p.loaded);
  while(activeRequests<3&&pending.length)fetchPlace(pending.shift());
}
async function fetchPlace(p){
  p.loading=true;activeRequests++;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try{
    const response=await fetch(currentEndpoint(p),{signal:controller.signal});
    if(!response.ok)throw Error('weather');const data=await response.json();
    if(!Number.isFinite(data.current?.temperature_2m))throw Error('missing');
    p.temp=data.current.temperature_2m;p.weatherCode=data.current.weather_code;p.fetched=Date.now();p.loaded=true;p.error=false;lastSuccess=Date.now();
  }catch{p.error=true; /* Preserve a previously retrieved temperature during a transient failure. */ }
  finally{clearTimeout(timer);p.loading=false;p.loaded=true;activeRequests--;renderList();window.dispatchEvent(new Event('weather-data-updated'));window.dispatchEvent(new Event('weather-place-updated'));setText('#updated',lastSuccess?`${t('updating')} · ${stamp(lastSuccess)}`:t('weatherUnavailable'));}
}
function buildDetail(){
  $('#detail-loading').hidden=true;
  if(!selected){$('#detail-error').hidden=false;return;}
  const panel=$('#detail-page');panel.hidden=false;
  panel.innerHTML=`<section class="detail-hero"><div class="detail-identity"><div class="eyebrow" id="detail-kind"></div><h1 id="detail-name"></h1><p class="detail-japanese" id="detail-alternate"></p><div class="detail-coordinates">${selected.lat}° N · ${selected.lon}° E</div></div><div class="detail-temp-block"><span class="detail-label" id="detail-mode-label"></span><strong id="detail-temp-value">—</strong><span id="detail-condition"></span></div></section>
  <nav class="detail-tabs" data-i18n-aria="conditions"><button class="detail-tab active" type="button" data-mode="current" data-i18n="current"></button><button class="detail-tab" type="button" data-mode="history" data-i18n="history"></button></nav>
  <section id="history-panel" class="history-panel" hidden><div class="history-heading"><div><span class="section-kicker" data-i18n="archive"></span><h2 data-i18n="chooseDate"></h2></div><span class="history-range" data-i18n="since"></span></div><form id="history-form" class="history-form"><label><span data-i18n="day"></span><select id="history-day" required></select></label><label><span data-i18n="month"></span><select id="history-month" required></select></label><label><span data-i18n="year"></span><select id="history-year" required></select></label><button type="submit" id="history-submit" data-i18n="query"></button></form><p class="history-status" data-i18n="historicalNote"></p></section>
  <p id="detail-status" class="history-status" role="status"></p>
  <div class="detail-content"><section class="detail-section"><div class="detail-section-head"><div><span class="section-kicker" id="weather-kicker"></span><h2 data-i18n="conditions"></h2></div><span class="live-pill" id="weather-pill"></span></div><dl class="detail-facts">${[['airTemp','temp'],['weatherCondition','condition'],['weatherCode','code'],['observation','time'],['min','min'],['max','max'],['precipitation','rain'],['elevation','elevation'],['timezone','timezone'],['coordinates','coordinates']].map(([label,id])=>`<div id="row-${id}"><dt data-i18n="${label}"></dt><dd id="fact-${id}">—</dd></div>`).join('')}</dl><p class="detail-footnote" id="weather-note"></p></section>
  <aside class="detail-section sources-section"><span class="section-kicker" data-i18n="references"></span><h2 data-i18n="portals"></h2><p data-i18n="portalDesc"></p><ul class="portal-list"><li><a id="source-api" target="_blank" rel="noopener noreferrer"></a></li><li><a href="https://open-meteo.com/en/docs" target="_blank" rel="noopener noreferrer" data-i18n="docs"></a></li><li><a href="https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lon}#map=11/${selected.lat}/${selected.lon}" target="_blank" rel="noopener noreferrer" data-i18n="map"></a></li></ul><div class="source-meta"><span data-i18n="provider"></span><strong>Open-Meteo</strong><span id="detail-updated"></span></div></aside></div>`;
  const today=tokyoToday();
  // Default to an older date so the archive has time to publish its data.
  const initial=new Date(today+'T12:00:00Z');initial.setUTCDate(initial.getUTCDate()-7);
  for(let y=Number(today.slice(0,4));y>=2010;y--)$('#history-year').add(new Option(String(y),String(y)));
  $('#history-year').value=String(initial.getUTCFullYear());
  updateMonths();$('#history-month').value=String(initial.getUTCMonth()+1).padStart(2,'0');updateDays();$('#history-day').value=String(initial.getUTCDate()).padStart(2,'0');
  $('#history-month').addEventListener('change',updateDays);$('#history-year').addEventListener('change',updateDays);
  $('#history-form').addEventListener('submit',event=>{event.preventDefault();submitHistory();});
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
    if(detail.mode===button.dataset.mode)return;
    detail.controller?.abort();detail.version++;detail.busy=false;detail.mode=button.dataset.mode;detail.status='idle';renderDetail();
    if(detail.mode==='current'&&(!detail.current||Date.now()-detail.current.fetched>=600000))requestDetail('current');
  }));
  fillStatic();renderDetail();requestDetail('current');
}
function updateMonths(){
  const select=$('#history-month');if(!select)return;
  const value=select.value||'01';select.replaceChildren();
  for(let m=1;m<=12;m++)select.add(new Option(new Intl.DateTimeFormat(locale(),{month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2020,m-1,1))),String(m).padStart(2,'0')));
  select.value=value;
}
function updateDays(){
  const select=$('#history-day'),old=Number(select.value)||1;
  const days=new Date(Date.UTC(Number($('#history-year').value),Number($('#history-month').value),0)).getUTCDate();
  select.replaceChildren();for(let day=1;day<=days;day++)select.add(new Option(String(day).padStart(2,'0'),String(day).padStart(2,'0')));
  select.value=String(Math.min(old,days)).padStart(2,'0');
}
function submitHistory(){
  if(detail.busy||detail.mode!=='history')return;
  const iso=`${$('#history-year').value}-${$('#history-month').value}-${$('#history-day').value}`;
  const d=new Date(iso+'T12:00:00Z');
  if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==iso){detail.status='invalidDate';renderDetail();return;}
  if(iso<'2010-01-01'||iso>tokyoToday()){detail.status='pastOnly';renderDetail();return;}
  requestDetail('history',iso);
}
async function requestDetail(mode,iso){
  detail.controller?.abort();const version=++detail.version;
  const controller=new AbortController();detail.controller=controller;detail.busy=true;detail.status='loading';
  if(mode==='history')detail.history=null;
  renderDetail();
  const url=mode==='current'?currentEndpoint(selected):`https://archive-api.open-meteo.com/v1/archive?latitude=${selected.lat}&longitude=${selected.lon}&start_date=${iso}&end_date=${iso}&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Asia%2FTokyo`;
  const timer=setTimeout(()=>controller.abort(),20000);
  try{
    const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw Error('request');const data=await response.json();
    if(version!==detail.version)return;
    const values=mode==='current'?data.current:data.daily;
    const temp=mode==='current'?values?.temperature_2m:values?.temperature_2m_mean?.[0];
    if(!Number.isFinite(temp))throw Error('missing');
    if(mode==='history'&&values.time?.[0]!==iso)throw Error('wrong archive date');
    detail[mode]={temp,code:mode==='current'?values.weather_code:values.weather_code?.[0],time:mode==='current'?values.time:iso,min:values.temperature_2m_min?.[0],max:values.temperature_2m_max?.[0],rain:values.precipitation_sum?.[0],elevation:data.elevation,zone:data.timezone||'Asia/Tokyo',fetched:Date.now(),url};
    detail.status='success';lastSuccess=Date.now();
  }catch{if(version===detail.version)detail.status='noData';}
  finally{clearTimeout(timer);if(version===detail.version){detail.busy=false;renderDetail();}}
}
function renderDetail(){
  if(!selected)return;
  const historical=detail.mode==='history',data=detail[detail.mode];
  document.title=`${placeName(selected)} | ${t('brand')}`;
  setText('#detail-name',placeName(selected));setText('#detail-alternate',language==='ja'?selected.name:selected.jp);
  setText('#detail-kind',`${dict[language][selected.type]} · ${selected.pref}`);
  $('#history-panel').hidden=!historical;
  document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===detail.mode);b.setAttribute('aria-pressed',String(b.dataset.mode===detail.mode));});
  setText('#detail-mode-label',historical?`${t('historicalTemp')} · ${t('dailyMean')}`:t('currentTemp'));
  setText('#detail-temp-value',data?temperature(data.temp):detail.busy?'…':t('unknown'));
  setText('#detail-condition',data?condition(data.code):detail.busy?t('loadingWeather'):t('unknown'));
  setText('#weather-kicker',historical?t('selectedDate'):t('now'));setText('#weather-pill',historical?t('history'):t('statusCurrent'));
  setText('#weather-note',t(historical?'historicalNote':'footnote'));
  setText('#fact-temp',data?temperature(data.temp):'—');setText('#fact-condition',data?condition(data.code):'—');setText('#fact-code',data?.code??'—');
  setText('#fact-time',data?(historical?`${dateLabel(data.time)} · ${t('dailyMean')} (JST)`:stamp(typeof data.time==='string'?( /(?:Z|[+-]\d{2}:\d{2})$/.test(data.time)?data.time:data.time+'+09:00'):NaN)):'—');
  setText('#fact-min',temperature(data?.min));setText('#fact-max',temperature(data?.max));setText('#fact-rain',Number.isFinite(data?.rain)?number(data.rain)+' mm':t('unknown'));
  ['min','max','rain'].forEach(k=>$('#row-'+k).hidden=!historical);
  setText('#fact-elevation',Number.isFinite(data?.elevation)?number(data.elevation)+' m':t('unknown'));
  setText('#fact-timezone','Asia/Tokyo · UTC+9');setText('#fact-coordinates',`${selected.lat}, ${selected.lon}`);
  const source=$('#source-api');source.textContent=t(historical?'archiveApi':'api')+' ↗';
  if(data)source.href=data.url;else if(!historical)source.href=currentEndpoint(selected);else source.removeAttribute('href');
  setText('#detail-updated',data?`${t('updatedAt')} ${stamp(data.fetched)}`:t('notAvailable'));
  let status='';
  if(detail.busy)status=t(historical?'consulting':'loadingWeather');
  else if(detail.status==='success'&&historical&&data)status=t('result')(dateLabel(data.time),temperature(data.temp));
  else if(['noData','invalidDate','pastOnly'].includes(detail.status))status=t(detail.status);
  else status=t(historical?'selectDate':'autoRefresh');
  setText('#detail-status',status);$('#history-submit').disabled=detail.busy;setText('#history-submit',t(detail.busy?'querying':'query'));
  setText('#updated',lastSuccess?`${t('updating')} · ${stamp(lastSuccess)}`:t('autoRefresh'));
}
function refreshIfDue(){
  if(document.hidden||Date.now()-lastRefresh<600000)return;
  if(!grid&&(!selected||detail.mode!=='current'||detail.busy))return;
  lastRefresh=Date.now();
  if(grid){places.filter(p=>!p.loading).forEach(p=>p.loaded=false);pumpQueue();}
  else if(selected&&detail.mode==='current'&&!detail.busy)requestDetail('current');
}
if(grid){
  [...new Set(places.map(p=>p.pref))].sort().forEach(p=>$('#pref-filter').add(new Option(p,p)));
  setText('#location-count',places.length);
  ['search','type-filter','pref-filter'].forEach(id=>$('#'+id).addEventListener(id==='search'?'input':'change',()=>{currentPage=1;renderList();window.dispatchEvent(new Event('weather-data-updated'));}));
  $('#pagination').addEventListener('click',event=>{
    const button=event.target.closest('button[data-page]');if(!button||button.disabled)return;
    currentPage=Number(button.dataset.page);renderList();
    $('.results-head').scrollIntoView?.({block:'start',behavior:'auto'});
    $('#pagination').querySelector('[aria-current="page"]')?.focus({preventScroll:true});
  });
  $('#sort-button').addEventListener('click',()=>{sortAsc=!sortAsc;currentPage=1;$('#sort-button').textContent='↕ '+(sortAsc?'A–Z':'Z–A');renderList();});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search').focus();}});
  fillStatic();renderList();
}else{fillStatic();buildDetail();}
setInterval(refreshIfDue,60000);
document.addEventListener('visibilitychange',()=>{refreshIfDue();if(grid)pumpQueue();});

window.addEventListener('online',()=>{if(grid){places.filter(p=>!p.loading&&p.temp===null).forEach(p=>p.loaded=false);pumpQueue();}else if(selected&&!detail.busy&&detail.mode==='current')requestDetail('current');});

function renderPagination(total){
 const nav=$('#pagination'),count=Math.ceil(total/PAGE_SIZE);
 const labels={pt:['Páginas','Anterior','Próxima','Página'],en:['Pages','Previous','Next','Page'],es:['Páginas','Anterior','Siguiente','Página'],ja:['ページ','前へ','次へ','ページ']}[language];
 nav.hidden=count===0;nav.setAttribute('aria-label',labels[0]);
 const markup='<button type="button" data-page="'+(currentPage-1)+'" '+(currentPage===1?'disabled':'')+'>'+labels[1]+'</button>'+Array.from({length:count},(_,i)=>'<button type="button" data-page="'+(i+1)+'" aria-label="'+labels[3]+' '+(i+1)+'" '+(currentPage===i+1?'aria-current="page"':'')+'>'+(i+1)+'</button>').join('')+'<button type="button" data-page="'+(currentPage+1)+'" '+(currentPage===count?'disabled':'')+'>'+labels[2]+'</button>';
 if(nav.innerHTML!==markup)nav.innerHTML=markup;
}
