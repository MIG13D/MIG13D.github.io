// JMA observations are kept separate from Open-Meteo modeled weather.
(()=>{
const messages={pt:['Observações oficiais · JMA / AMeDAS','Estação próxima','Distância','Horário da medição','Observação próxima, não uma medição exata deste local.','Não foi possível atualizar a JMA.','Consultar JMA / AMeDAS','Dados da observação','Cadastro de estações','Atualização automática a cada 10 minutos.','Carregando observações oficiais…'],en:['Official observations · JMA / AMeDAS','Nearby station','Distance','Observation time','Nearby observation, not an exact measurement at this place.','Could not refresh JMA data.','Visit JMA / AMeDAS','Observation data','Station registry','Automatic refresh every 10 minutes.','Loading official observations…'],es:['Observaciones oficiales · JMA / AMeDAS','Estación cercana','Distancia','Hora de medición','Observación cercana, no una medición exacta de este lugar.','No se pudieron actualizar los datos de JMA.','Consultar JMA / AMeDAS','Datos de observación','Registro de estaciones','Actualización automática cada 10 minutos.','Cargando observaciones oficiales…'],ja:['公式観測値 · 気象庁 / AMeDAS','近隣の観測所','距離','観測時刻','近隣の観測値であり、この地点そのものの測定値ではありません。','気象庁のデータを更新できませんでした。','気象庁アメダスを見る','観測データ','観測所一覧','10分ごとに自動更新します。','公式観測値を読み込み中…']};
const panel=document.createElement('section');panel.className='jma-panel';panel.setAttribute('aria-live','polite');document.querySelector('main').append(panel);
let stationTable=null,observation=null,failed=false,busy=false,lastAttempt=0;
const links={portal:'https://www.jma.go.jp/bosai/amedas/',registry:'https://www.jma.go.jp/bosai/amedas/const/amedastable.json',latest:'https://www.jma.go.jp/bosai/amedas/data/latest_time.txt'};
const point=document.querySelector('#detail-page')&&typeof selected!=='undefined'?selected:null;
function distance(a,b,c,d){const r=Math.PI/180,x=Math.sin((c-a)*r/2)**2+Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
function render(){
 const lang=document.documentElement.lang.startsWith('pt')?'pt':document.documentElement.lang;const m=messages[lang]||messages.en;
 panel.replaceChildren();const title=document.createElement('h2');title.textContent=m[0];panel.append(title);
 const paragraph=value=>{const p=document.createElement('p');p.textContent=value;panel.append(p)};
 if(point&&observation){const o=observation;paragraph(`${m[1]}: ${lang==='ja'?o.station.kjName:o.station.enName} (${o.station.kjName})`);paragraph(`${temperature(o.temp)} · ${m[2]}: ${o.distance.toFixed(1)} km`);paragraph(`${m[3]}: ${new Intl.DateTimeFormat(lang,{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Tokyo'}).format(new Date(o.time))} JST`);paragraph(m[4]);}
 if(failed)paragraph(m[5]);else if(point&&!observation)paragraph(m[10]);
 paragraph(m[9]);
 [[m[6],links.portal],[m[8],links.registry],...(observation?[[m[7],observation.url]]:[])].forEach(([label,url])=>{const a=document.createElement('a');a.textContent=label+' ↗';a.href=url;a.target='_blank';a.rel='noopener noreferrer';panel.append(a)});
}
async function refresh(){
 if(!point||busy||document.hidden)return;busy=true;lastAttempt=Date.now();const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
 const get=async(url,json=true)=>{const r=await fetch(url,{signal:controller.signal});if(!r.ok)throw Error('JMA');return json?r.json():r.text()};
 try{
 const [table,raw]=await Promise.all([stationTable||get(links.registry),get(links.latest,false)]);stationTable=table;const time=raw.trim();if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/.test(time))throw Error('time');
 const url='https://www.jma.go.jp/bosai/amedas/data/map/'+time.slice(0,19).replace(/[-:T]/g,'')+'.json';const data=await get(url);
 const candidates=Object.entries(table).filter(([id,s])=>Array.isArray(s.lat)&&Array.isArray(s.lon)&&Number.isFinite(data[id]?.temp?.[0])&&data[id].temp[1]===0).map(([id,station])=>({station,temp:data[id].temp[0],distance:distance(point.lat,point.lon,station.lat[0]+station.lat[1]/60,station.lon[0]+station.lon[1]/60),time,url})).sort((a,b)=>a.distance-b.distance);
 if(!candidates.length||candidates[0].distance>100)throw Error('No nearby observation');observation=candidates[0];failed=false;
 }catch{failed=true;}finally{clearTimeout(timeout);busy=false;render();}
}
render();refresh();setInterval(()=>{if(Date.now()-lastAttempt>=600000)refresh()},60000);
document.addEventListener('visibilitychange',()=>{if(Date.now()-lastAttempt>=600000)refresh()});window.addEventListener('online',refresh);document.querySelector('#language-select').addEventListener('change',render);window.addEventListener('weather-preferences',render);
// Let standard modified clicks and open-in-new-tab behavior work normally.
const grid=document.querySelector('#location-grid');
if(grid){let navigating=false;grid.addEventListener('click',event=>{const card=event.target.closest('a.card-link');if(!card||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();if(navigating)return;navigating=true;const destination=card.href;card.closest('.location-card').classList.add('card-confirmed');setTimeout(()=>location.assign(destination),180);});window.addEventListener('pageshow',()=>{navigating=false;grid.querySelectorAll('.card-confirmed').forEach(c=>c.classList.remove('card-confirmed'))});}
})();
