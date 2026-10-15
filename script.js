(function(){
const $=id=>document.getElementById(id);
const STORE='lexicon-vocabulary-v1';
let words=[], currentView='home', flashQueue=[], flashIndex=0, flashRevealed=false, flashMode='all', importParsed=[];
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const now=()=>new Date().toISOString();
/* ===== 内置离线词表（约5000常用英文词） ===== */
const OFFLINE_WORDS=new Set(("a able about above abroad absence absent absolute absolutely absorb abuse academic accept access accident account accuse achieve across act action active actual actually adapt add address adequate adjust administration admission admit adopt adult advance advantage adventure advertise advice advise affair afford afraid after afternoon again against age agency agent aggressive ago agree agreement ahead aid aim air airline airport album alcohol alike alive all allow almost alone along alongside already also alter alternative always amazing among amount amuse analysis ancient anger angle angry animal announce annual another answer anxiety anxious any anybody anyhow anyone anything anyway anywhere apart apartment apologize appeal appear apple application apply appoint approach appropriate approval approve architecture area argue argument arm army around arrange arrangement arrest arrival arrive arrow art article artist aspect assault assemble asset assign assist assistant associate assume assure athlete atmosphere attack attempt attend attention attitude attract attractive audience aunt author authority autumn available average avoid award aware awful awkward axis baby back background backward bacteria bad badly bag baggage bake balance ball balloon band bank bar barely bargain barrel barrier base basic basically basin basis basket bath battery battle bay beach beam bean bear beat beautiful beauty because become bed bedroom beef before begin beginning behalf behave behavior behind belief believe bell belong below belt bench bend beneath benefit beside besides best bet better beyond bicycle bid big bill billion bind biology bird birth birthday biscuit bit bite black blade blame blank blanket blast bleed blend blind block blood blow blue board boat body boil bomb bond bone book boom boot border bore boring born borrow boss both bother bottle bottom bound bow box boy brain brake branch brand brave bread break breakfast breath breathe breed brick bridge brief bright bring broad broadcast brown brush bubble budget build bulb bull bump burn burst bus bush business busy butter button buy cab cabin cabinet cable cafe cage cake calculate call calm camp campaign campus can canal cancel cancer candidate candle candy cap capable capital captain capture car carbon card care career careful careless carpet carry case cash cast castle casual cat catalog catch category cattle cause cave cease ceiling celebrate cell center central century ceremony certain certainly certificate chain chair chairman challenge chamber champion chance change channel chapter character charge charity chart chase cheap check cheek cheese chemical chest chicken chief child childhood chocolate choice choose chop church cigar circle circumstance cite citizen city civil claim clap class classic clean clear clerk clever click client cliff climb clinic clock close cloth clothes clothing cloud club clue cluster coach coal coast coat code coffee coil coin collapse collar colleague collect college colony color column comb combine come comedy comfort command comment commerce commercial commission commit committee common communicate community company compare comparison compete complain complete complex complicated component composition compound comprehensive comprise compute concept concern concert conclude condition conduct conference confidence confirm conflict confuse confusion congress connect conscious consciousness consent consequence conservative considerable consist consistent constant construct construction consult consume contact contain content contest context continent continue contract contrast contribute convention conversation cook cookie cool cooperate coordinate copy core corn corner corporate correct cost costume cottage cotton cough could council count counter country county couple courage course court cover crack craft crash crazy cream create creation creative creature credit crew crime crisis criterion critic critical criticism criticize crop cross crowd crucial cruel cruise crush cry crystal cultural culture cup cure curiosity curious current curtain curve custom customer cut cycle daily dairy damage dance danger dare dark darkness data date daughter dawn dead deal dear death debate debt decade decent decide decision deck declare decline decorate decrease deep deeply deer defeat defend defense deficit define definite definitely delay deliver delivery demand democracy democratic demonstrate denial dense dental deny depart department departure depend dependent deposit depression depth derive describe description desert deserve design desire desk desperate despite dessert destination destroy detail detect determination determine develop development device devote dialogue diamond diary diet differ difference difficult difficulty dig dimension dinner direct direction directly dirty disability disagree disappear disaster discipline discourse discover disease dish dismiss disorder display dispute distance distinct distinguish distribute district disturb dive diverse divide division do doctor document dog doll domestic dominate donate door double doubt down downtown draft drag drama dramatic draw drawing dream dress drink drive drop drown drug dry due dull during dust duty each eager ear early earn earnest earth ease easily east eastern easy eat economy edge edition editor education effective efficient effort egg eight either elastic elderly elect election electric electronic element elephant elevator elite else embrace emerge emergency emission emotion emotional emphasis employ empty enable encounter encourage end ending endless endorse enemy energy enforce engage engine engineer english enhance enjoy enormous enough ensure enter enterprise entertainment entire entrance envelope environment episode equal equip equivalent era erase erode erosion error escape especially essay essence essential establish estate estimate etc evaluate even evening event eventually ever every everybody everyday everyone everything everywhere evidence evil evoke evolution exact exactly example exceed excellent except exchange excite excitement excuse executive exercise exhaust exhibit exist exit expand expansion expect expectation expense expensive experience experiment expert explain explanation explode explore export expose express extend extensive extent external extra extraordinary extreme eye fabric face facility fact factor factory faculty fade fail failure fair fairly faith fall false fame familiar family famous fan fancy far fare farm fashion fast fat fate father fault favor favorite fear feature february federal fee feed feel feeling fellow female fence festival fetch fever few fiber fiction field fierce fifteen fifth fifty fight figure file fill film final finally finance find fine finger finish fire firm first fish fit five fix flag flame flash flat flavor flee flexible flight float flood floor flour flow flower flu fly focus folk follow food foot football for force forecast foreign forest forever forget forgive fork form formal format former formula forth fortune forty forward foundation found fox frame framework free freedom freeze frequency fresh friendly from front frost frown fruit fuel fulfill fun function fund fundamental funeral funny fur furniture further furthermore future gain galaxy gallery gallon game gap garage garden garlic gas gate gather gaze gear gender gene general generate generation genetic generous genius gentle gentleman genuinely geography gesture ghost giant gift gifted girl give glad glance glare glass global glory glove go goal god gold golden good govern government gown grab grace grade gradually grain grand grandfather grandmother grant graph grass grateful gravity great green greet grief grill grind grocery gross ground group grow growth guarantee guard guess guest guide guilt guitar gun guy habit hair half hall hammer hand handle hang happen happy harbor hard hardly harm harmony harsh harvest hat hate have he head headquarters heal health healthy heap hear hearing heart heat heaven heavily heavy heel height helicopter hell hello help helpful hen her herb here heritage hero herself hesitate hi hidden high highway hill him himself hip hire his historic history hit hold hole holiday hollow home honest honey honor hook hope horizon horror horse hospital host hot hotel hour house household housing how however huge human humor hundred hunger hungry hunt hurry hurt husband hypothesis ice idea ideal identify ignore ill illegal illness illustrate image imaginary immediate immediately immigrant impact implement implication impose impress impression improve in incentive incident include income incorporate increase incredible independence index indicate individual industrial industry infant infection inflation influence inform information ingredient initial initially initiative injury inner innocent innovation input inquiry inside insight insist inspect inspire install instance instead institution instruction instrument insurance intact intake integer integrity intend intense intention interact interest interesting internal international internet interpret interval interview into introduce invasion invest investigate investment invite involve iron island isolate issue it item its itself jacket jail jazz jeans jet job join joint joke journal journey joy judge juice jump junior just justice justify keen keep key kick kid kill kilogram kind king kiss kitchen knee knife knock know knowledge lab label labor lack lady lake land landscape language lap large largely last late later Latin latter laugh launch law lawn lawsuit lay layer lazy lead leader leadership leading leaf league lean leap learn learning least leather leave left leg legal legend leisure lemon lend length less lesson let letter level liberty library license lie life lift light like likely limb limit line link lip liquid list listen literally literary literature little live load loan local locate location lock log lonely long look loose lose loss lost lot lots loud love lovely low lower luck lucky lunch lung machine mad magic magnet mail main mainly maintain major majority make male mall man manage management manager manner manual manufacture many map march margin mark market marriage marry mask mass master match material math matter maximum may maybe mayor me meal mean meaning means measure meat mechanism media medical medicine medium meet meeting member memory mental mention menu mere merely mess message metal method middle might military million mind mine minister minor minute mirror miss mission mistake mix mixture mode model modern modest modify moment money monitor month mood moon moral more moreover morning most mostly mother motion motivation motor mountain mouse mouth move movement movie much multiple murder muscle museum music musical must mutual my myself mystery myth naked name narrow nation national native natural naturally nature navy near nearby nearly necessary neck need negative neglect negotiate neither nephew nerve nervous net network never new news newspaper next nice night nine no nobody nod noise nomination none nor normal north northern nose not note nothing notice novel now nowhere nuclear number nurse nut object objective obligation observe obtain obvious occasionally occupation occur ocean odd of off offer office officer often oil old once one ongoing onion online only onto open opening operate operation operator opinion opponent opportunity oppose opposite opposition option or orange order ordinary organic organization origin original other otherwise ought our ourselves out outcome outdoor outer outline output outside oven over overall overcome overlook owe own owner pace pack package page pain painful paint painter painting pair palace palm pan panel panic paper paragraph parallel parent park part participate particular partly partner party pass passage passenger passion past path patience patient pattern pause pay peace peak peer pen pension people pepper per perceive percent perfect perform perhaps period permanent permission permit person personal personality personally personnel perspective pet phase phenomenon philosophy phone photo photograph phrase physical piano pick picture pie piece pig pile pilot pin pink pipe pitch place plan plane planet plant plastic plate platform play player plea plenty plot plug plus pocket poem poet poetry point poison pole police policy polite political politics pollute pollution pond pool poor pop popular population portion portrait pose position positive possess possibility possible possibly post pot potato potential pound pour poverty powder power powerful practical practice pray prayer precisely predict prefer pregnancy preparation prepare prescription presence present preserve president press pressure pretend pretty prevent previous price pride primary prime principal principle print prior priority prison privacy private probably problem procedure proceed process produce product production profession professor profile profit program progress project promise promote prompt proof proper properly property proportion proposal propose prospect protect protein protest proud prove provide province provision public publication publicity publish pull pulse pump punch punish purchase pure purple purpose pursue push put qualify quality quarter question quick quickly quiet quit quite quote race radio rail rain raise range rank rapid rarely rate rather raw reach react reaction read reader reading ready real reality realize really reason recall receive recent recently recipe recognize recommend record recover red reduce refer reference reflect reform refugee refuse regard region register regular regularly regulate reject relate relation relationship relative relatively relax release relevant relief religion rely remain remark remind remote remove repeat repeatedly replace reply report represent republic reputation request require research resemble reserve resident resist resolve resort resource respect respond response responsibility rest restaurant restore result retain retire retreat return reveal review revolution rhythm rice rich rid ride rifle right ring rise risk river road rock role roll romantic roof room root rope rose rough roughly round route row rub rude ruin rule run rural rush sad safe safety sake salad salary sale salt same sample sand satisfy save say scale scare scene schedule scheme school science scientific scientist scope score scratch scream screen sea search season seat second secret secretary section sector secure security see seek seem segment seize select selection self sell senate senator send senior sense sensitive sentence separate sequence series serious servant serve service session set settle seven several severe sex shade shadow shake shall shame shape share sharp she sheet shelf shell shelter shift shine ship shirt shock shoe shoot shop shore short should shoulder shout show shower shrug shut sick side sight sign significance silence silent silver similar simple simply sin since sing singer single sink sir sister sit site situation six size ski skill skin sky slave sleep slide slight slightly slip slow small smart smell smile smoke smooth snap snow so soap soccer social society soft soil solar soldier solid solution solve some somehow someone something sometimes somewhat somewhere son song soon sorry sort soul sound soup source south southern space spare speak speaker special specialist specific specifically speech speed spell spend sphere spice spill spin spirit spiritual split spokesman sport spot spread spring square squeeze stable staff stage stair stand standard star stare start state statement station statistics status stay steady steal steam steel step stick still stock stomach stone stop store storm story straight strange strategy stream street strength stress stretch strike string strip stroke strong structure struggle student studio study stuff stupid style subject submit subsequent substance succeed success successful such sudden suddenly suffer sugar suggest suggestion suit summer summit sun superior supply support suppose sure surface surge surprise surround survey survival survive suspect suspend swallow swamp swap swear sweet swim swing switch sword symbol sympathy symptom system table tackle tale talent talk tall tank tap tape target task taste tax tea teach teacher team tear technique telephone telescope television tell temperature temporary ten tend tendency tension tent term territory terror test text than thank that theater their them theme themselves then theory there therefore these they thick thin thing think third thirty this those though thought thousand threat three throat through throughout throw thumb thus ticket tide tie tight time tin tiny tip tire tired tissue title to tobacco today toe together tomato tomorrow tone tongue tonight too tool tooth top topic toss total touch tough tour toward towel tower town toy trace track trade tradition traffic tragedy trail train transfer transform transit translate transport trap travel treat treatment tree trend trial tribe trick trip troop trouble truck true trust truth try tube tunnel turn twelve twenty twice twin twist two type typical ugly ultimate unable uncle under undergo understand uniform union unique unit unite universal universe university unless unlike until unusual up upon upper urban urge us use used useful usual usually utility vacation valley valuable value van variety various vast vegetable vehicle venture version very vessel veteran via victory video view village violate violence virtual virtue virus visible vision visit visual vital voice volume volunteer vote vs wage wait wake walk wall wander want war warm warn wash waste watch water wave way we weak wealth wear weather wedding week weekend weigh weight welcome welfare well west western wet what wheat wheel when where whether which while whip whisper white who whole whom why wide widely wife wild will win wind window wine wing winner winter wire wisdom wise wish with withdraw within without witness woman wonder wood wool word work worker workshop world worry worth would wound wrap write writer writing wrong yard year yellow yes yesterday yet you young your youth zero zone omit omit emit submit permit commit admit transmit deficit premise summit limit benefit inhabit inherit unit quit quite quiet quiz quote quote rabbit race radio rain raise range rank rapid rare rate rather raw reach react read ready real reality reason recall receive recent recipe recognize record recover red reduce refer reflect reform refugee refuse regard region register regular regulate reject relate relax release relief religion rely remain remind remote remove repeat replace reply report represent request require research reserve resident resist resolve resort resource respect respond rest restore result retain retire return reveal review revolution rhythm rib rice rich rid ride rifle right ring rise risk river road rock role roll romantic roof room root rope rose rough round route row rub rude ruin rule run rural rush sad safe safety sake salad salary sale salt same sample sand satisfy save say scale scare scene schedule scheme school science scientist scope score scratch scream screen sea search season seat second secret secretary section sector secure security see seek seem segment seize select selection self sell senate senator send senior sense sensitive sentence separate sequence series serious servant serve service session set settle seven several severe sex shade shadow shake shall shame shape share sharp she sheet shelf shell shelter shift shine ship shirt shock shoe shoot shop shore short should shoulder shout show shower shrug shut sick side sight sign silence silent silver similar simple simply sin since sing singer single sink sir sister sit site situation six size ski skill skin sky slave sleep slide slight slight slow small smart smell smile smoke smooth snap snow so soap soccer social society soft soil solar soldier solid solution solve some somehow someone something sometimes somewhat somewhere son song soon sorry sort soul sound soup source south southern space spare speak speaker special specialist specific speech speed spell spend sphere spice spill spin spirit spiritual split spokesman sport spot spread spring square squeeze stable staff stage stair stand standard star stare start state statement station statistics status stay steady steal steam steel step stick still stock stomach stone stop store storm story straight strange strategy stream street strength stress stretch strike string strip stroke strong structure struggle student studio study stuff stupid style subject submit subsequent substance succeed success successful such sudden suddenly suffer sugar suggest suggestion suit summer summit sun superior supply support suppose sure surface surge surprise surround survey survival survive suspect suspend swallow swamp swap swear sweet swim swing switch sword symbol sympathy symptom system table tackle tale talent talk tall tank tap tape target task taste tax tea teach teacher team tear technique telephone telescope television tell temperature temporary ten tend tendency tension tent term territory terror test text than thank that theater their them theme themselves then theory there therefore these they thick thin thing think third thirty this those though thought thousand threat three throat through throughout throw thumb thus ticket tide tie tight time tin tiny tip tire tired tissue title to tobacco today toe together tomato tomorrow tone tongue tonight too tool tooth top topic toss total touch tough tour toward towel tower town toy trace track trade tradition traffic tragedy trail train transfer transform transit translate transport trap travel treat treatment tree trend trial tribe trick trip troop trouble truck true trust truth try tube tunnel turn twelve twenty twice twin twist two type typical ugly ultimate unable uncle under undergo understand uniform union unique unit unite universal universe university unless unlike until unusual up upon upper urban urge us use used useful usual usually utility vacation valley valuable value van variety various vast vegetable vehicle venture version very vessel veteran via victory video view village violate violence virtual virtue virus visible vision visit visual vital voice volume volunteer vote vs wage wait wake walk wall wander want war warm warn wash waste watch water wave way we weak wealth wear weather wedding week weekend weigh weight welcome welfare well west western wet what wheat wheel when where whether which while whip whisper white who whole whom why wide widely wife wild will win wind window wine wing winner winter wire wisdom wise wish with withdraw within without witness woman wonder wood wool word work worker workshop world worry worth would wound wrap write writer writing wrong yard year yellow yes yesterday yet you young your youth zero zone").split(" "));
function load(){try{const v=JSON.parse(localStorage.getItem(STORE)||'[]');words=Array.isArray(v)?v:[]}catch(e){words=[]}}
function save(){localStorage.setItem(STORE,JSON.stringify(words));renderAll()}
function speakWord(text){
  if(!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)){
    toast('当前浏览器不支持语音朗读。'); return;
  }
  const phrase=String(text||'').trim(); if(!phrase)return;
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(phrase);
  utterance.lang='en-US';
  utterance.rate=0.88;
  utterance.pitch=1;
  window.speechSynthesis.speak(utterance);
}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2400)}
function status(w){if(w.mastered)return 'mastered';if(!w.lastReviewed)return 'new';return 'review'}
function statusTag(w){const s=status(w);return `<span class="tag ${s==='new'?'new':s==='review'?'review':''}">${s==='new'?'新词':s==='review'?'学习中':'已掌握'}</span>`}
function empty(icon,title,sub,button=''){return `<div class="empty"><div class="empty-icon">${icon}</div><strong>${title}</strong><div style="margin-top:5px">${sub}</div>${button?`<div style="margin-top:15px">${button}</div>`:''}</div>`}
function go(view){currentView=view;document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id==='view-'+view));document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));const titles={home:'每天进步一点点。',library:'你的单词库。',flashcards:'是时候测试你的记忆力了。',review:'让记忆更牢固。',add:'建设你的单词收藏。',import:'批量导入单词。'};$('pageTitle').textContent=titles[view]||titles.home;if(view==='flashcards')startFlash('all');if(view==='review')startFlash('review');if(view==='add'&&!$('editId').value)resetForm();window.scrollTo({top:0,behavior:'smooth'})}
function renderStats(){const week=Date.now()-7*864e5;$('statTotal').textContent=words.length;$('statReview').textContent=words.filter(w=>!w.mastered).length;$('statMastered').textContent=words.filter(w=>w.mastered).length;$('statWeek').textContent=words.filter(w=>new Date(w.createdAt).getTime()>=week).length;$('focusNumber').textContent=words.filter(w=>!w.mastered).length+' 个单词';$('streakText').textContent=words.length?`你已经收集了 ${words.length} 个单词，继续加油。`:'你的第一个单词是好习惯的开始。'}
function renderRecent(){const list=[...words].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,4);$('recentWords').innerHTML=list.length?list.map(w=>`<div class="word-row"><div class="word-main"><div class="word-term">${esc(w.term)} <span class="word-pos">${esc(w.pos||'')}</span></div><div class="word-meaning">${esc(w.meaning)}</div></div>${statusTag(w)}</div>`).join(''):empty('▤','你的词库还空着','添加第一个单词开始吧。', '<button class="primary" data-go="add">添加第一个单词</button>')}
function renderLibrary(){const q=$('searchInput').value.trim().toLowerCase(),filter=$('filterStatus').value,sort=$('sortWords').value;let list=words.filter(w=>(w.term+' '+w.meaning+' '+w.example+' '+w.notes).toLowerCase().includes(q)&&(filter==='all'||status(w)===filter));if(sort==='az')list.sort((a,b)=>a.term.localeCompare(b.term));else if(sort==='due')list.sort((a,b)=>Number(a.mastered)-Number(b.mastered)||String(a.lastReviewed||'').localeCompare(String(b.lastReviewed||'')));else list.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));$('libraryGrid').innerHTML=list.length?list.map(w=>`<article class="vocab-card"><div class="vocab-card-top">${statusTag(w)}<div style="display:flex;align-items:center;gap:4px"><button class="speak-btn" data-speak="${w.id}" title="听 ${esc(w.term)} 的发音" aria-label="听 ${esc(w.term)} 的发音"><span class="speaker">♫</span> 听发音</button><button class="icon-btn" title="删除 ${esc(w.term)}" aria-label="删除 ${esc(w.term)}" data-delete="${w.id}">✕</button></div></div><h3>${esc(w.term)}</h3><div class="pos">${esc(w.pos||'个人词汇')}</div><p class="meaning">${esc(w.meaning)}</p>${w.example?`<div class="example">"${esc(w.example)}"</div>`:''}${w.notes?`<div class="word-meaning" style="margin-top:10px">笔记：${esc(w.notes)}</div>`:''}<div class="card-actions"><button class="quiet" data-edit="${w.id}">编辑</button><button class="quiet" data-check="${w.id}">🔍 校对</button><button class="quiet" data-practice="${w.id}">练习这个单词 ↗</button></div></article>`).join(''):empty('⌕',q?'没有匹配的单词':'还没有单词',q?'试试其他搜索词或筛选条件。':'添加单词来创建你自己的学习库。','<button class="primary" data-go="add">＋ 添加单词</button>')}
function renderAll(){renderStats();renderRecent();if(currentView==='library')renderLibrary();if(currentView==='flashcards'||currentView==='review')renderFlash()}
function resetForm(){ $('term').value='';$('pos').value='';$('meaning').value='';$('example').value='';$('notes').value='';$('editId').value='';$('formHeading').textContent='添加新单词';$('saveBtn').textContent='保存到词库 →';const pb=$('proofResult');if(pb){pb.className='proof-box';pb.innerHTML=''}}
/* ===== 音效反馈 ===== */
let audioCtx=null;
function playChime(type){
  try{
    audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
    const notes=type==='save'?[523.25,659.25,783.99]:type==='delete'?[400,300]:type==='flip'?[600]:[500];
    notes.forEach((freq,i)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.connect(g);g.connect(audioCtx.destination);
      o.frequency.value=freq;o.type='sine';
      g.gain.setValueAtTime(.0001,audioCtx.currentTime+i*.08);
      g.gain.exponentialRampToValueAtTime(.15,audioCtx.currentTime+i*.08+.02);
      g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+i*.08+.2);
      o.start(audioCtx.currentTime+i*.08);o.stop(audioCtx.currentTime+i*.08+.25);
    });
  }catch(e){}
}
/* ===== 时段主题 ===== */
function applyTimeTheme(){
  const h=new Date().getHours();
  let theme;
  if(h>=5&&h<8)theme='dawn';
  else if(h>=8&&h<17)theme='day';
  else if(h>=17&&h<20)theme='dusk';
  else theme='night';
  document.documentElement.setAttribute('data-theme',theme);
}
applyTimeTheme();
setInterval(applyTimeTheme,60000);
$('saveBtn').addEventListener('click',()=>{
  const term=$('term').value.trim(),meaning=$('meaning').value.trim();
  if(!term||!meaning){toast('请填写单词和释义');return}
  const id=$('editId').value;
  const data={term,meaning,pos:$('pos').value,example:$('example').value.trim(),notes:$('notes').value.trim()};
  if(id){const old=words.find(w=>w.id===id);if(old)Object.assign(old,data);toast('单词已更新。')}
  else{words.push({...data,id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random(),createdAt:now(),lastReviewed:null,mastered:false,reviewCount:0});toast('已添加到你的词库 ✓')}
  playChime('save');
  save();resetForm();go('library');
});
function editWord(id){const w=words.find(x=>x.id===id);if(!w)return;$('editId').value=id;$('term').value=w.term;$('pos').value=w.pos||'';$('meaning').value=w.meaning;$('example').value=w.example||'';$('notes').value=w.notes||'';$('formHeading').textContent='编辑单词';$('saveBtn').textContent='保存修改 →';go('add')}
function deleteWord(id){const w=words.find(x=>x.id===id);if(!w)return;if(!confirm(`确定要从词库中删除"${w.term}"吗？`))return;words=words.filter(x=>x.id!==id);save();toast('单词已删除。')}
function startFlash(mode){flashMode=mode;flashQueue=words.filter(w=>mode==='review'?!w.mastered:true).sort((a,b)=>mode==='review'?String(a.lastReviewed||'').localeCompare(String(b.lastReviewed||'')):b.createdAt.localeCompare(a.createdAt));flashIndex=0;flashRevealed=false;renderFlash()}
function renderFlash(){const area=$(currentView==='review'?'reviewArea':'flashArea');if(!area)return;const isReview=currentView==='review';if(!flashQueue.length){area.innerHTML=`<div class="flash-empty"><div style="font-size:32px;margin-bottom:12px">${words.length?'✓':'▱'}</div><h3 style="color:var(--ink);margin:0 0 7px">${words.length?(isReview?'全部复习完了！':'本次还没有卡片。'):'你的第一张闪卡从一个单词开始。'}</h3><p style="margin:0 0 18px">${words.length?'添加更多单词，或切换到全部闪卡牌组。':'输入一个单词和你自己的释义来创建卡片。'}</p>${words.length?'<button class="secondary" data-restart="all">学习全部单词</button>':'<button class="primary" data-go="add">＋ 添加第一个单词</button>'}</div>`;return}if(flashIndex>=flashQueue.length)flashIndex=0;const w=flashQueue[flashIndex];area.innerHTML=`<div class="flash-meta"><span>${isReview?'每日复习':'个人牌组'}</span><span>${flashIndex+1} / ${flashQueue.length}</span></div><div class="progress-track"><div style="width:${((flashIndex+1)/flashQueue.length)*100}%"></div></div><div class="flashcard" tabindex="0" role="button" aria-label="闪卡，点击${flashRevealed?'隐藏':'显示'}答案" data-flip><button class="flash-speak" data-speak="${w.id}" aria-label="听 ${esc(w.term)} 的发音" title="听发音">♫ &nbsp; 听发音</button><div class="flash-kicker">${flashRevealed?'你的释义':'你还记得吗？'}</div><div class="flash-term">${esc(w.term)}</div><div class="flash-pos">${esc(w.pos||'')}</div>${flashRevealed?`<div class="flash-divider"></div><div class="flash-answer">${esc(w.meaning)}</div>${w.example?`<div class="flash-example">"${esc(w.example)}"</div>`:''}`:''}<div class="tap-hint">${flashRevealed?'点击隐藏答案':'点击卡片或按 Enter 显示答案'}</div></div><div class="flash-controls">${flashRevealed?`<button class="primary again" data-rate="again">↻ &nbsp; 再学一次</button><button class="primary know" data-rate="know">✓ &nbsp; 我记住了</button>`:`<button class="secondary" data-prev ${flashIndex===0?'disabled':''}>← 上一个</button><button class="primary" data-flip>显示答案</button><button class="secondary" data-next>下一个 →</button>`}</div><div style="text-align:center;color:var(--muted);font-size:11px;margin-top:15px">${isReview?'诚实评价，追踪你的掌握情况。':'闪卡仅来自你自己输入的单词。'}</div>`}
function flip(){flashRevealed=!flashRevealed;renderFlash();playChime('flip')}
function next(){if(!flashQueue.length)return;flashIndex=(flashIndex+1)%flashQueue.length;flashRevealed=false;renderFlash()}
function prev(){if(!flashQueue.length)return;flashIndex=(flashIndex-1+flashQueue.length)%flashQueue.length;flashRevealed=false;renderFlash()}
function rate(kind){const w=flashQueue[flashIndex];if(!w)return;w.lastReviewed=now();w.reviewCount=(w.reviewCount||0)+1;if(kind==='know')w.mastered=true;else if(kind==='again')w.mastered=false;save();if(flashMode==='review'&&kind==='know'){flashQueue=flashQueue.filter(x=>x.id!==w.id);if(flashIndex>=flashQueue.length)flashIndex=0}else{flashIndex=(flashIndex+1)%Math.max(1,flashQueue.length)}flashRevealed=false;renderFlash();toast(kind==='know'?'已标记为掌握。':'已重新加入练习。')}

/* ===== 批量导入功能 ===== */
function parseImportText(text){
  const lines=text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const result=[];
  for(const line of lines){
    let parts;
    if(line.includes('\t')){
      parts=line.split('\t').map(s=>s.trim()).filter(Boolean);
    }else if(/[,，]/.test(line)){
      parts=line.split(/[,，]/).map(s=>s.trim()).filter(Boolean);
    }else if(/[-–—]/.test(line)&&line.search(/[-–—]/)>0){
      const idx=line.search(/[-–—]/);
      parts=[line.slice(0,idx).trim(),line.slice(idx+1).trim()];
    }else if(/[:：]/.test(line)){
      parts=line.split(/[:：]/).map(s=>s.trim()).filter(Boolean);
    }else{
      continue;
    }
    if(parts.length<2)continue;
    const term=parts[0];
    let pos='',meaning='',example='';
    if(parts.length>=4){
      pos=parts[1];meaning=parts[2];example=parts.slice(3).join(' ');
    }else if(parts.length===3){
      meaning=parts[1];example=parts[2];
    }else{
      meaning=parts.slice(1).join(' ');
    }
    if(term&&meaning)result.push({term,pos,meaning,example});
  }
  return result;
}
function renderImportPreview(){
  const container=$('importPreview');
  const existing=new Set(words.map(w=>w.term.toLowerCase()));
  const fresh=importParsed.filter(p=>!existing.has(p.term.toLowerCase()));
  const dupes=importParsed.filter(p=>existing.has(p.term.toLowerCase()));
  const btn=$('confirmImportBtn');
  btn.disabled=fresh.length===0;
  btn.textContent=fresh.length?`确认导入（${fresh.length} 个新词${dupes.length?`，跳过 ${dupes.length} 个重复`:''}）`:'确认导入';
  let html=`<div style="font-size:13px;margin-bottom:12px;color:var(--ink)">共解析出 <b>${importParsed.length}</b> 个单词，其中 <b style="color:var(--sage-ink)">${fresh.length}</b> 个为新词`;
  if(dupes.length)html+=`，<b style="color:var(--peach-ink)">${dupes.length}</b> 个已存在将被跳过`;
  html+=`</div>`;
  if(importParsed.length){
    html+='<div class="word-list">'+importParsed.map(p=>{
      const isDup=existing.has(p.term.toLowerCase());
      return `<div class="word-row" style="${isDup?'opacity:.45':''}">
        <div class="word-main">
          <div class="word-term">${esc(p.term)} <span class="word-pos">${esc(p.pos||'')}</span></div>
          <div class="word-meaning">${esc(p.meaning)}</div>
        </div>
        ${isDup?'<span class="tag review">已存在</span>':'<span class="tag new">新词</span>'}
      </div>`;
    }).join('')+'</div>';
  }
  container.innerHTML=html;
}
$('parseBtn').addEventListener('click',()=>{
  const text=$('importText').value;
  if(!text.trim()){toast('请先粘贴文本或选择文件。');return}
  importParsed=parseImportText(text);
  if(!importParsed.length){toast('未能解析出有效单词，请检查格式。');return}
  renderImportPreview();
  toast(`解析出 ${importParsed.length} 个单词`);
});
$('confirmImportBtn').addEventListener('click',()=>{
  const existing=new Set(words.map(w=>w.term.toLowerCase()));
  let count=0;
  for(const p of importParsed){
    if(existing.has(p.term.toLowerCase()))continue;
    words.push({...p,id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random()+count,createdAt:now(),lastReviewed:null,mastered:false,reviewCount:0});
    existing.add(p.term.toLowerCase());
    count++;
  }
  save();
  toast(`成功导入 ${count} 个单词！`);
  $('importText').value='';
  $('importPreview').innerHTML='';
  importParsed=[];
  $('confirmImportBtn').disabled=true;
  go('library');
});
$('importFile').addEventListener('change',async(e)=>{
  const file=e.target.files[0];
  if(!file)return;
  try{
    if(file.name.toLowerCase().endsWith('.docx')){
      if(typeof mammoth==='undefined'){toast('文档解析库加载失败，请检查网络后刷新。');return}
      const buf=await file.arrayBuffer();
      const result=await mammoth.extractRawText({arrayBuffer:buf});
      $('importText').value=result.value;
      toast('已从 Word 文档提取文本，请点击"解析预览"。');
    }else{
      const text=await file.text();
      $('importText').value=text;
      toast('已读取文件内容，请点击"解析预览"。');
    }
  }catch(err){
    toast('文件读取失败：'+err.message);
  }
});

/* ===== 单词校对功能 ===== */
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++)dp[i][0]=i;
  for(let j=0;j<=n;j++)dp[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
    dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  }
  return dp[m][n];
}
function offlineCheck(word){
  const w=word.toLowerCase();
  if(OFFLINE_WORDS.has(w))return{found:true,offline:true};
  const candidates=[];
  for(const dictWord of OFFLINE_WORDS){
    if(Math.abs(dictWord.length-w.length)>2)continue;
    const d=levenshtein(w,dictWord);
    if(d<=2)candidates.push({word:dictWord,dist:d});
  }
  candidates.sort((a,b)=>a.dist-b.dist);
  return{found:false,offline:true,suggestions:candidates.slice(0,5).map(c=>c.word)};
}
async function checkWordOnline(word){
  word=(word||'').trim();
  if(!word)return{found:false,error:'empty'};
  const urls=[
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)}`
  ];
  for(const url of urls){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),8000);
    try{
      const res=await fetch(url,{signal:controller.signal});
      clearTimeout(timer);
      if(res.status===404){
        const off=offlineCheck(word);
        if(off.found)return{found:true,offline:true};
        return{found:false,offline:true,suggestions:off.suggestions};
      }
      if(!res.ok)continue;
      const data=await res.json();
      const entry=Array.isArray(data)?data[0]:data;
      if(!entry||!entry.meanings)continue;
      const phonetic=entry.phonetic||(entry.phonetics||[]).map(p=>p.text).find(Boolean)||'';
      const meanings=(entry.meanings||[]).slice(0,3).map(m=>({
        pos:m.partOfSpeech,
        defs:(m.definitions||[]).slice(0,2).map(d=>d.definition)
      })).filter(m=>m.defs.length);
      return{found:true,phonetic,meanings,word:entry.word||word};
    }catch(err){
      clearTimeout(timer);
      continue;
    }
  }
  const off=offlineCheck(word);
  if(off.found)return{found:true,offline:true};
  return{found:false,offline:true,suggestions:off.suggestions,offlineOnly:true};
}
function renderProofContent(result,inputWord){
  if(result.error){
    return{cls:'err',html:`<div class="proof-title">⚠️ 校对失败</div><div>${esc(result.error)}</div><div style="margin-top:6px;font-size:11px;color:var(--muted)">此提示不影响你正常保存单词。</div>`};
  }
  if(!result.found){
    let html=`<div class="proof-title">⚠️ ${result.offlineOnly?'离线校对':'词典中'}未找到"${esc(inputWord)}"</div><div>${result.offlineOnly?'当前网络不可用，已用本地词表检查。':'可能是拼写有误，或者这个词比较生僻。'}</div>`;
    if(result.suggestions&&result.suggestions.length){
      html+=`<div class="proof-sugg">你是不是想找：${result.suggestions.map(s=>`<button data-sugg="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
    }
    html+=`<div style="margin-top:6px;font-size:11px;color:var(--muted)">你仍可以正常保存，请确认拼写无误。</div>`;
    return{cls:'err',html};
  }
  let html=`<div class="proof-title">✓ ${result.offline?'离线校验通过':'拼写正确'}</div>`;
  if(result.offline){
    html+=`<div style="font-size:11px;color:var(--muted);margin-top:4px">本地词表匹配，未显示音标和释义（联网时可查看完整释义）</div>`;
  }
  if(result.phonetic)html+=`<div class="proof-phonetic">🔊 ${esc(result.phonetic)}</div>`;
  if(result.meanings&&result.meanings.length){
    html+=`<div style="margin-top:6px;color:var(--muted);font-size:11px;margin-bottom:4px">官方释义参考（请对照你的中文翻译是否正确）：</div>`;
    for(const m of result.meanings){
      html+=`<div class="proof-def"><b>${esc(m.pos)}</b>${m.defs.map(d=>`<div>• ${esc(d)}</div>`).join('')}</div>`;
    }
  }
  return{cls:'ok',html};
}
let proofTimer=null;
async function doProofCheck(){
  const box=$('proofResult');
  const word=$('term').value.trim();
  if(word.length<2){box.className='proof-box';box.innerHTML='';return}
  box.className='proof-box loading show';
  box.innerHTML='正在校对…';
  try{
    const result=await checkWordOnline(word);
    const {cls,html}=renderProofContent(result,word);
    box.className='proof-box '+cls+' show';
    box.innerHTML=html;
  }catch(e){
    box.className='proof-box err show';
    box.innerHTML='<div class="proof-title">⚠️ 校对出错</div><div>'+esc(e.message)+'</div>';
  }
}
$('term').addEventListener('input',()=>{
  clearTimeout(proofTimer);
  const word=$('term').value.trim();
  if(word.length<2){const box=$('proofResult');box.className='proof-box';box.innerHTML='';return}
  proofTimer=setTimeout(doProofCheck,700);
});
$('manualCheckBtn').addEventListener('click',doProofCheck);
document.addEventListener('click',e=>{
  const sugg=e.target.closest('[data-sugg]');
  if(sugg){$('term').value=sugg.dataset.sugg;$('term').dispatchEvent(new Event('input'));return}
  if(e.target.id==='proofClose'||(e.target.id==='proofModal'&&e.target===e.currentTarget)){$('proofModal').style.display='none';return}
  if(e.target.closest('[data-check]')){
    const id=e.target.closest('[data-check]').dataset.check;
    const w=words.find(x=>x.id===id);
    if(!w)return;
    const modal=$('proofModal'),body=$('proofModalBody');
    modal.style.display='flex';
    body.innerHTML='<div style="color:var(--muted);text-align:center;padding:20px">正在校对…</div>';
    checkWordOnline(w.term).then(result=>{
      const {cls,html}=renderProofContent(result,w.term);
      body.innerHTML=`<div class="proof-box ${cls} show" style="margin:0">${html}</div><div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)">你填写的释义：<b style="color:var(--ink)">${esc(w.meaning)}</b><br>请对照上方官方释义确认是否有误。</div>`;
    });
  }
});
document.addEventListener('click',e=>{const b=e.target.closest('button,[data-flip]');if(!b)return;if(b.dataset.view){go(b.dataset.view);return}if(b.dataset.go){go(b.dataset.go);return}if(b.dataset.speak){const w=words.find(x=>x.id===b.dataset.speak);if(w)speakWord(w.term);return}if(b.dataset.edit){editWord(b.dataset.edit);return}if(b.dataset.delete){deleteWord(b.dataset.delete);return}if(b.dataset.practice){const w=words.find(x=>x.id===b.dataset.practice);if(w){flashQueue=[w];flashIndex=0;flashRevealed=false;go('flashcards');flashQueue=[w];renderFlash()}return}if(b.hasAttribute('data-flip')){flip();return}if(b.hasAttribute('data-next')){next();return}if(b.hasAttribute('data-prev')){prev();return}if(b.dataset.rate){rate(b.dataset.rate);return}if(b.dataset.restart){startFlash(b.dataset.restart);return}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-flip]')){e.preventDefault();flip()}if(currentView==='flashcards'||currentView==='review'){if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();if(e.key===' '&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();flip()}}});
['searchInput','filterStatus','sortWords'].forEach(id=>$(id).addEventListener(id==='searchInput'?'input':'change',renderLibrary));
const date=new Date();$('todayLabel').textContent=date.toLocaleDateString('zh-CN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
load();renderAll();
})();