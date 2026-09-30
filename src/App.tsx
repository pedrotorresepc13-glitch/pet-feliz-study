import {useEffect,useMemo,useState,type ReactNode} from 'react'
import {BookOpen,Brain,Building2,CheckCircle2,ChevronRight,CircleAlert,Gauge,GraduationCap,Home,Layers3,RefreshCcw,RotateCcw,Sparkles,Target,Trophy} from 'lucide-react'
import {modules,decisions,references,type Question} from './data'

type Screen='home'|'module'|'simulation'|'review'|'exam'|'references'
type Metrics={estrategia:number;cliente:number;marca:number;operacao:number;financas:number}
type Stored={completed:string[];scores:Record<string,number>;errors:string[];seen:Record<string,number>;strength:Record<string,number>;due:Record<string,number>;decisions:Record<string,number>;metrics:Metrics;streak:number;lastStudy?:string;examBest:number}
const initial:Stored={completed:[],scores:{},errors:[],seen:{},strength:{},due:{},decisions:{},metrics:{estrategia:50,cliente:50,marca:50,operacao:50,financas:50},streak:0,examBest:0}

const load=():Stored=>{try{return {...initial,...JSON.parse(localStorage.getItem('pet-feliz-study-v1')||'{}')}}catch{return initial}}
const clamp=(n:number)=>Math.max(0,Math.min(100,n))
const today=()=>new Date().toISOString().slice(0,10)
const shuffle=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5)

export default function App(){
 const [state,setState]=useState<Stored>(load)
 const [screen,setScreen]=useState<Screen>('home')
 const [activeId,setActiveId]=useState(modules[0].id)
 const [quizIndex,setQuizIndex]=useState(0)
 const [quizCorrect,setQuizCorrect]=useState(0)
 const [selected,setSelected]=useState<number|null>(null)
 const [answered,setAnswered]=useState(false)
 const [examQuestions,setExamQuestions]=useState<Question[]>([])
 const [examIndex,setExamIndex]=useState(0)
 const [examScore,setExamScore]=useState(0)
 const [examDone,setExamDone]=useState(false)

 useEffect(()=>localStorage.setItem('pet-feliz-study-v1',JSON.stringify(state)),[state])
 useEffect(()=>{const d=today();setState(s=>s.lastStudy===d?s:{...s,streak:s.lastStudy?s.streak+1:1,lastStudy:d})},[])
 const progress=Math.round(state.completed.length/modules.length*100)
 const prosperity=Math.round(Object.values(state.metrics).reduce((a,b)=>a+b,0)/5)
 const allQuestions=useMemo(()=>modules.flatMap(m=>m.questions),[])
 const active=modules.find(m=>m.id===activeId) ?? modules[0]
 const reviewQuestions=useMemo(()=>{
   const ids=new Set(state.errors)
   const wrong=allQuestions.filter(q=>ids.has(q.id))
   const now=Date.now()
   const due=allQuestions.filter(q=>(state.seen[q.id]||0)>0&&!ids.has(q.id)&&(state.due[q.id]||0)<=now)
   return [...wrong,...shuffle(due).slice(0,Math.max(0,8-wrong.length))]
 },[state.errors,state.seen,state.due,allQuestions])

 const markQuestion=(q:Question,correct:boolean)=>setState(s=>{const current=s.strength[q.id]||0;const nextStrength=correct?Math.min(current+1,4):0;const days=[0,1,3,7,14][nextStrength];return {...s,errors:correct?s.errors.filter(id=>id!==q.id):Array.from(new Set([...s.errors,q.id])),seen:{...s.seen,[q.id]:(s.seen[q.id]||0)+1},strength:{...s.strength,[q.id]:nextStrength},due:{...s.due,[q.id]:correct?Date.now()+days*86400000:Date.now()}}})
 const openModule=(id:string)=>{setActiveId(id);setQuizIndex(0);setQuizCorrect(0);setSelected(null);setAnswered(false);setScreen('module')}
 const finishModule=()=>{
   const score=Math.round(quizCorrect/active.questions.length*100)
   setState(s=>({...s,scores:{...s.scores,[active.id]:score},completed:score>=active.masteryTarget?Array.from(new Set([...s.completed,active.id])):s.completed}))
   setScreen('simulation')
 }
 const chooseDecision=(index:number)=>{
   const d=decisions.find(x=>x.moduleId===active.id);if(!d)return
   const op=d.options[index]
   setState(s=>{const m={...s.metrics};Object.entries(op.impact).forEach(([k,v])=>{m[k as keyof Metrics]=clamp(m[k as keyof Metrics]+(v||0))});return {...s,decisions:{...s.decisions,[d.id]:index},metrics:m}})
 }
 const startExam=()=>{setExamQuestions(shuffle(allQuestions).slice(0,20));setExamIndex(0);setExamScore(0);setExamDone(false);setSelected(null);setAnswered(false);setScreen('exam')}
 const reset=()=>{if(confirm('Apagar todo o progresso local e recomeçar?')){localStorage.removeItem('pet-feliz-study-v1');setState(initial);setScreen('home')}}

 return <div className="app-shell">
  <aside className="sidebar">
   <button className="brand" onClick={()=>setScreen('home')}><span className="brand-mark">PF</span><span className="brand-copy"><strong>PET FELIZ</strong><small>STUDY LAB</small></span></button>
   <nav>
    <Nav active={screen==='home'} icon={<Home size={18}/>} label="Visão geral" onClick={()=>setScreen('home')}/>
    <Nav active={screen==='review'} icon={<RefreshCcw size={18}/>} label="Revisão inteligente" badge={state.errors.length||undefined} onClick={()=>setScreen('review')}/>
    <Nav active={screen==='exam'} icon={<GraduationCap size={18}/>} label="Simulado" onClick={startExam}/>
    <Nav active={screen==='references'} icon={<BookOpen size={18}/>} label="Fontes e método" onClick={()=>setScreen('references')}/>
   </nav>
   <div className="side-foot"><span>PROGRESSO GLOBAL</span><div className="progress"><i style={{width:progress+'%'}}/></div><div><small>{progress}% concluído</small><small>{state.completed.length}/{modules.length}</small></div></div>
  </aside>
  <main className="main">
   {screen==='home'&&<HomeScreen state={state} progress={progress} prosperity={prosperity} openModule={openModule} startExam={startExam}/>}
   {screen==='module'&&<ModuleScreen module={active} quizIndex={quizIndex} quizCorrect={quizCorrect} selected={selected} answered={answered} setSelected={setSelected}
      answer={()=>{if(selected===null||answered)return;const q=active.questions[quizIndex];const ok=selected===q.answer;setAnswered(true);if(ok)setQuizCorrect(x=>x+1);markQuestion(q,ok)}}
      next={()=>{if(quizIndex<active.questions.length-1){setQuizIndex(x=>x+1);setSelected(null);setAnswered(false)}else finishModule()}} back={()=>setScreen('home')}/>}
   {screen==='simulation'&&<SimulationScreen moduleId={active.id} state={state} choose={chooseDecision} done={()=>setScreen('home')} prosperity={prosperity}/>}
   {screen==='review'&&<ReviewScreen questions={reviewQuestions} state={state} markQuestion={markQuestion}/>}
   {screen==='exam'&&<ExamScreen questions={examQuestions} index={examIndex} score={examScore} done={examDone} best={state.examBest} selected={selected} answered={answered} setSelected={setSelected}
     answer={()=>{if(selected===null||answered)return;const q=examQuestions[examIndex];const ok=selected===q.answer;setAnswered(true);if(ok)setExamScore(x=>x+1);markQuestion(q,ok)}}
     next={()=>{if(examIndex<examQuestions.length-1){setExamIndex(x=>x+1);setSelected(null);setAnswered(false)}else{const final=examScore;const pct=Math.round(final/examQuestions.length*100);setState(s=>({...s,examBest:Math.max(s.examBest,pct)}));setExamDone(true)}}} restart={startExam}/>}
   {screen==='references'&&<References reset={reset}/>}
  </main>
 </div>
}

function Nav({active,icon,label,onClick,badge}:{active:boolean;icon:ReactNode;label:string;onClick:()=>void;badge?:number}){return <button className={'nav '+(active?'active':'')} onClick={onClick}>{icon}<span>{label}</span>{badge?<b>{badge}</b>:null}</button>}

function HomeScreen({state,progress,prosperity,openModule,startExam}:{state:Stored;progress:number;prosperity:number;openModule:(id:string)=>void;startExam:()=>void}){
 return <>
  <header className="hero"><div><span className="eyebrow"><Sparkles size={14}/> LABORATÓRIO DE APRENDIZAGEM APLICADA</span><h1>Aprenda Plano de Negócios fazendo o <em>PET FELIZ</em> prosperar.</h1><p>Estudo guiado, recuperação ativa, revisão de erros, decisões de negócio e simulação integrada em uma única trilha.</p></div><div className="hero-score"><Gauge/><strong>{prosperity}</strong><span>Índice PET FELIZ</span><small>{prosperity>=80?'Negócio muito sólido':prosperity>=60?'Em evolução':'Precisa de decisões melhores'}</small></div></header>
  <section className="stats-grid">
   <Stat icon={<Target/>} label="Domínio da trilha" value={progress+'%'} hint={state.completed.length+' de '+modules.length+' módulos dominados'}/>
   <Stat icon={<Brain/>} label="Erros para revisar" value={String(state.errors.length)} hint={state.errors.length?'Fila de recuperação ativa':'Nenhuma lacuna registrada'}/>
   <Stat icon={<Trophy/>} label="Melhor simulado" value={state.examBest+'%'} hint="Meta recomendada: 85%+"/>
   <Stat icon={<RefreshCcw/>} label="Sequência de estudo" value={state.streak+'d'} hint="Consistência gera retenção"/>
  </section>
  <section className="section-head"><div><span className="eyebrow">TRILHA DE DOMÍNIO</span><h2>Do conceito à decisão</h2></div><button className="ghost-btn" onClick={startExam}>Simulado de 20 questões <ChevronRight size={17}/></button></section>
  <div className="modules">{modules.map((m,i)=>{const locked=i>0&&!state.completed.includes(modules[i-1].id);const score=state.scores[m.id];return <button key={m.id} className={'module-card '+(locked?'locked':'')} disabled={locked} onClick={()=>openModule(m.id)}><div className="module-top"><span className="module-no">{String(m.order).padStart(2,'0')}</span>{state.completed.includes(m.id)?<CheckCircle2 className="ok" size={20}/>:<small>{locked?'bloqueado':'disponível'}</small>}</div><h3>{m.title}</h3><p>{m.subtitle}</p><div className="module-bottom"><span>{score!==undefined?'Último domínio: '+score+'%':'Meta: '+m.masteryTarget+'%'}</span><ChevronRight size={18}/></div></button>})}</div>
 </>
}
function Stat({icon,label,value,hint}:{icon:ReactNode;label:string;value:string;hint:string}){return <div className="stat"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></div>}

function ModuleScreen({module,quizIndex,quizCorrect,selected,answered,setSelected,answer,next,back}:{module:(typeof modules)[number];quizIndex:number;quizCorrect:number;selected:number|null;answered:boolean;setSelected:(n:number)=>void;answer:()=>void;next:()=>void;back:()=>void}){
 const q=module.questions[quizIndex]
 return <div className="learning-page">
  <button className="back" onClick={back}>← voltar à trilha</button>
  <div className="learning-head"><div><span className="eyebrow">MÓDULO {String(module.order).padStart(2,'0')}</span><h1>{module.title}</h1><p>{module.subtitle}</p></div><div className="mastery-chip"><Brain size={18}/><span>meta</span><strong>{module.masteryTarget}%</strong></div></div>
  <div className="lesson-grid">{module.lessons.map((l,i)=><article className="lesson" key={l.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{l.title}</h3><p>{l.text}</p>{l.bullets&&<ul>{l.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</article>)}</div>
  <section className="quiz-box"><div className="quiz-meta"><span>VALIDAÇÃO {quizIndex+1}/{module.questions.length}</span><span>{quizCorrect} acerto(s)</span></div><h2>{q.prompt}</h2><div className="options">{q.options.map((o,i)=><button key={o} onClick={()=>!answered&&setSelected(i)} className={(selected===i?'selected ':'')+(answered&&i===q.answer?'correct ':'')+(answered&&selected===i&&i!==q.answer?'wrong':'')}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></button>)}</div>
  {answered&&<div className={'feedback '+(selected===q.answer?'good':'bad')}>{selected===q.answer?<CheckCircle2/>:<CircleAlert/>}<div><strong>{selected===q.answer?'Correto.':'Ainda não.'}</strong><p>{q.explanation}</p></div></div>}
  <div className="quiz-actions">{!answered?<button className="primary" disabled={selected===null} onClick={answer}>Confirmar resposta</button>:<button className="primary" onClick={next}>{quizIndex===module.questions.length-1?'Aplicar no PET FELIZ':'Próxima questão'} <ChevronRight size={17}/></button>}</div></section>
 </div>
}

function SimulationScreen({moduleId,state,choose,done,prosperity}:{moduleId:string;state:Stored;choose:(i:number)=>void;done:()=>void;prosperity:number}){
 const d=decisions.find(x=>x.moduleId===moduleId)!;const picked=state.decisions[d.id]
 return <div className="sim-page"><span className="eyebrow">SIMULAÇÃO APLICADA</span><h1>Agora você administra o PET FELIZ.</h1><p className="lead">Seu conhecimento precisa funcionar quando aparece uma decisão real.</p>
 <div className="business-panel"><div className="pet-score"><Building2/><div><span>Índice de prosperidade</span><strong>{prosperity}/100</strong></div></div><MetricBars m={state.metrics}/></div>
 <article className="decision"><span>CENÁRIO</span><h2>{d.situation}</h2><h3>{d.question}</h3><div className="decision-options">{d.options.map((o,i)=><button key={o.label} disabled={picked!==undefined} className={picked===i?'picked '+o.quality:''} onClick={()=>choose(i)}><strong>{o.label}</strong>{picked===i&&<p>{o.rationale}</p>}</button>)}</div>{picked!==undefined&&<button className="primary" onClick={done}>Continuar a trilha <ChevronRight size={17}/></button>}</article></div>
}
function MetricBars({m}:{m:Metrics}){return <div className="metrics">{Object.entries(m).map(([k,v])=><div className="metric" key={k}><div><span>{k}</span><b>{v}</b></div><div className="metric-track"><i style={{width:v+'%'}}/></div></div>)}</div>}

function ReviewScreen({questions,state,markQuestion}:{questions:Question[];state:Stored;markQuestion:(q:Question,c:boolean)=>void}){
 const [i,setI]=useState(0),[sel,setSel]=useState<number|null>(null),[ans,setAns]=useState(false)
 if(!questions.length)return <Empty icon={<CheckCircle2 size={44}/>} title="Fila limpa" text="Continue a trilha. Erros e conceitos antigos aparecerão aqui para recuperação."/>
 const q=questions[Math.min(i,questions.length-1)]
 return <div className="review-page"><span className="eyebrow">REVISÃO INTELIGENTE</span><h1>Recupere antes de reler.</h1><p className="lead">Erros voltam primeiro; depois conceitos antigos são misturados para testar retenção.</p><div className="review-count">{i+1} de {questions.length} · {state.errors.includes(q.id)?'erro prioritário':'reforço'}</div>
 <section className="quiz-box"><h2>{q.prompt}</h2><div className="options">{q.options.map((o,ix)=><button key={o} onClick={()=>!ans&&setSel(ix)} className={(sel===ix?'selected ':'')+(ans&&ix===q.answer?'correct ':'')+(ans&&sel===ix&&ix!==q.answer?'wrong':'')}><b>{String.fromCharCode(65+ix)}</b><span>{o}</span></button>)}</div>{ans&&<div className={'feedback '+(sel===q.answer?'good':'bad')}><div><strong>{sel===q.answer?'Recuperado.':'Revise este ponto.'}</strong><p>{q.explanation}</p></div></div>}
 <div className="quiz-actions">{!ans?<button className="primary" disabled={sel===null} onClick={()=>{if(sel===null)return;setAns(true);markQuestion(q,sel===q.answer)}}>Confirmar</button>:<button className="primary" onClick={()=>{if(i<questions.length-1){setI(x=>x+1);setSel(null);setAns(false)}else{setI(0);setSel(null);setAns(false)}}}>{i<questions.length-1?'Próxima revisão':'Recomeçar fila'}</button>}</div></section></div>
}

function ExamScreen({questions,index,score,done,best,selected,answered,setSelected,answer,next,restart}:{questions:Question[];index:number;score:number;done:boolean;best:number;selected:number|null;answered:boolean;setSelected:(n:number)=>void;answer:()=>void;next:()=>void;restart:()=>void}){
 if(!questions.length)return null
 if(done){const pct=Math.round(score/questions.length*100);return <div className="exam-result"><Trophy size={56}/><span className="eyebrow">RESULTADO DO SIMULADO</span><h1>{pct}%</h1><p>{pct>=85?'Domínio forte. Revise somente as lacunas registradas.':pct>=70?'Boa base, mas ainda há conceitos para recuperar.':'Volte aos módulos e trabalhe as lacunas antes da próxima tentativa.'}</p><div className="result-grid"><Stat icon={<Target/>} label="Acertos" value={score+'/'+questions.length} hint="Questões respondidas"/><Stat icon={<Trophy/>} label="Melhor marca" value={Math.max(best,pct)+'%'} hint="Recorde local"/></div><button className="primary" onClick={restart}><RotateCcw size={17}/> Novo simulado</button></div>}
 const q=questions[index]
 return <div className="exam-page"><div className="exam-top"><div><span className="eyebrow">SIMULADO FINAL</span><h1>Questão {index+1}</h1></div><div className="counter">{index+1}/{questions.length}</div></div><div className="exam-progress"><i style={{width:((index+1)/questions.length*100)+'%'}}/></div>
 <section className="quiz-box"><h2>{q.prompt}</h2><div className="options">{q.options.map((o,i)=><button key={o} onClick={()=>!answered&&setSelected(i)} className={(selected===i?'selected ':'')+(answered&&i===q.answer?'correct ':'')+(answered&&selected===i&&i!==q.answer?'wrong':'')}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></button>)}</div>{answered&&<div className={'feedback '+(selected===q.answer?'good':'bad')}><div><strong>{selected===q.answer?'Correto.':'Incorreto.'}</strong><p>{q.explanation}</p></div></div>}<div className="quiz-actions">{!answered?<button className="primary" disabled={selected===null} onClick={answer}>Responder</button>:<button className="primary" onClick={next}>{index===questions.length-1?'Finalizar':'Próxima'}</button>}</div></section></div>
}

function References({reset}:{reset:()=>void}){return <div className="refs"><span className="eyebrow">FONTES + DESIGN PEDAGÓGICO</span><h1>Por que a plataforma funciona assim?</h1><p className="lead">O PET FELIZ é o caso central. Conceitos de gestão ampliam o material e técnicas de aprendizagem ativa transformam leitura em domínio.</p>
 <div className="method-grid"><article><Brain/><h3>Recuperação ativa</h3><p>Tentar lembrar antes de reler fortalece retenção e revela lacunas.</p></article><article><RefreshCcw/><h3>Revisão espaçada</h3><p>Erros e conceitos antigos reaparecem em momentos posteriores.</p></article><article><Layers3/><h3>Interleaving</h3><p>Conceitos semelhantes são misturados para treinar discriminação.</p></article></div>
 <h2 className="ref-title">Referências utilizadas</h2><div className="ref-list">{references.map(r=><article key={r.title}><div><strong>{r.title}</strong><p>{r.note}</p></div>{r.url&&<a href={r.url} target="_blank" rel="noreferrer">abrir fonte ↗</a>}</article>)}</div>
 <div className="danger-zone"><div><strong>Recomeçar experimento</strong><p>O progresso fica salvo neste navegador.</p></div><button className="ghost-btn" onClick={reset}>Apagar progresso</button></div></div>}
function Empty({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="empty">{icon}<h1>{title}</h1><p>{text}</p></div>}
