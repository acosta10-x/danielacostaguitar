document.documentElement.classList.add('js');
const nav=document.querySelector('nav'),menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
const english=document.documentElement.lang==='en';
const text={play:english?'Play video':'Reproducir vídeo',loading:english?'Loading YouTube…':'Cargando YouTube…',failed:english?'YouTube could not load here. Retry or use the direct link below.':'YouTube no pudo cargar aquí. Reintenta o utiliza el enlace directo de abajo.',retry:english?'Retry':'Reintentar',blocked:english?'Press play inside the player to start the video.':'Pulsa reproducir dentro del reproductor para iniciar el vídeo.',unavailable:english?'This video cannot be played here. Open it on YouTube using the link below.':'Este vídeo no se puede reproducir aquí. Ábrelo en YouTube con el enlace de abajo.'};
let youtubeAPI;
function loadYouTubeAPI(){
  if(window.YT?.Player)return Promise.resolve(window.YT);
  if(youtubeAPI)return youtubeAPI;
  youtubeAPI=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;
    const timeout=setTimeout(()=>{script.remove();youtubeAPI=null;reject(new Error('YouTube API timed out'))},20000);
    window.onYouTubeIframeAPIReady=()=>{clearTimeout(timeout);resolve(window.YT)};
    script.onerror=()=>{clearTimeout(timeout);script.remove();youtubeAPI=null;reject(new Error('YouTube API unavailable'))};
    document.head.append(script);
  });
  return youtubeAPI;
}
const activePlayers=new Set();
document.querySelectorAll('[data-video]').forEach((button,index)=>{
  const parent=button.closest('.player'),screen=document.createElement('div'),status=document.createElement('p'),retry=document.createElement('button');
  const id=button.dataset.video;screen.className='player-screen';button.before(screen);screen.append(button);
  status.className='player-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');parent.append(status);
  retry.type='button';retry.className='player-retry';retry.textContent=text.retry;retry.hidden=true;parent.append(retry);
  let player,timer;
  function fail(message){clearTimeout(timer);status.textContent=message;retry.hidden=false;screen.removeAttribute('aria-busy')}
  async function start(){
    retry.hidden=true;status.textContent=text.loading;screen.setAttribute('aria-busy','true');clearTimeout(timer);
    if(location.protocol==='file:'){fail(english?'Open this site through GitHub Pages or a local HTTP server to use the YouTube player.':'Abre el sitio desde GitHub Pages o un servidor HTTP local para utilizar el reproductor de YouTube.');return}
    if(player){activePlayers.delete(player);player.destroy();player=null}
    const frame=document.createElement('iframe');frame.id='youtube-player-'+index;
    const params=new URLSearchParams({autoplay:'1',playsinline:'1',rel:'0',enablejsapi:'1',hl:english?'en':'es'});
    if(/^https?:$/.test(location.protocol))params.set('origin',location.origin);
    frame.src='https://www.youtube-nocookie.com/embed/'+id+'?'+params;
    frame.title=(english?'YouTube performance ':'Interpretación en YouTube ')+(index+1);
    frame.referrerPolicy='strict-origin-when-cross-origin';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;
    screen.replaceChildren(frame);timer=setTimeout(()=>fail(text.failed),25000);
    try{
      const YT=await loadYouTubeAPI();
      player=new YT.Player(frame,{events:{
        onReady:()=>{clearTimeout(timer);screen.removeAttribute('aria-busy');status.textContent='';retry.hidden=true},
        onStateChange:event=>{if(event.data===YT.PlayerState.PLAYING){clearTimeout(timer);status.textContent='';retry.hidden=true;activePlayers.forEach(other=>{if(other!==event.target)other.pauseVideo()})}},
        onError:()=>fail(text.unavailable),
        onAutoplayBlocked:()=>{clearTimeout(timer);status.textContent=text.blocked;screen.removeAttribute('aria-busy')}
      }});
      activePlayers.add(player);
    }catch{fail(text.failed)}
  }
  button.addEventListener('click',start);retry.addEventListener('click',start);
});
const dialog=document.querySelector('dialog');let opener;
document.querySelectorAll('.photo-gallery img').forEach((img,i)=>{const button=document.createElement('button');button.type='button';button.style.cssText='display:block;width:100%;border:0;padding:0;background:transparent';button.setAttribute('aria-label',(english?'Enlarge photograph ':'Ampliar fotografía ')+(i+1));img.replaceWith(button);button.append(img);button.addEventListener('click',()=>{opener=button;dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('p').textContent=img.alt;dialog.showModal()})});
document.querySelector('.close')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog?.addEventListener('close',()=>opener?.focus());
const search=document.querySelector('#search');if(search){const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const root=document.querySelector('.repertoire');let groups=[],group;for(const node of [...root.children]){if(node.tagName==='H2'){group={heading:node,items:[]};groups.push(group)}else if(node.tagName==='P'){if(!group){group={heading:null,items:[]};groups.push(group)}group.items.push(node)}}let composer='';for(const g of groups){composer='';for(const item of g.items){if(item.querySelector('strong'))composer=item.querySelector('strong').textContent;item.dataset.search=normalize((g.heading?.textContent||'')+' '+composer+' '+item.textContent)}}function filter(){const q=normalize(search.value.trim());let count=0;for(const g of groups){let visible=0;for(const item of g.items){item.hidden=!!q&&!item.dataset.search.includes(q);if(!item.hidden){visible++;count++}}if(g.heading)g.heading.hidden=visible===0}document.querySelector('#results').textContent=q?(count?count+(english?' matching entries':' entradas coincidentes'):(english?'No results. Try another composer or work.':'No hay resultados. Prueba otro compositor u obra.')) : (english?'Complete repertoire':'Repertorio completo')}search.addEventListener('input',filter);filter()}
