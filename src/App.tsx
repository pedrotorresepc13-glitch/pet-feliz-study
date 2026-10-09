import {useEffect,useMemo,useState,type CSSProperties,type ReactNode} from 'react'
import {
  ArrowLeft,ArrowRight,BookOpen,Brain,BriefcaseBusiness,Building2,CheckCircle2,
  ChevronRight,CircleAlert,Compass,GraduationCap,Home,Layers3,Lightbulb,
  RefreshCcw,RotateCcw,Sparkles,Target,Trophy,Users,WalletCards
} from 'lucide-react'
import {modules,decisions,references,type Lesson,type Module,type Question} from './data'

type Screen='home'|'module'|'simulation'|'review'|'exam'|'references'
type Metrics={estrategia:number;cliente:number;marca:number;operacao:number;financas:number}
type Stored={
  completed:string[]
  scores:Record<string,number>
  errors:string[]
  seen:Record<string,number>
  strength:Record<string,number>
  due:Record<string,number>
  decisions:Record<string,number>
  metrics:Metrics
  streak:number
  lastStudy?:string
  examBest:number
  moduleStep:Record<string,number>
}
const initial:Stored={
  completed:[],scores:{},errors:[],seen:{},strength:{},due:{},decisions:{},
  metrics:{estrategia:50,cliente:50,marca:50,operacao:50,financas:50},
  streak:0,examBest:0,moduleStep:{}
}

const load=():Stored=>{try{return {...initial,...JSON.parse(localStorage.getItem('pet-feliz-study-v2')||'{}')}}catch{return initial}}
const clamp=(n:number)=>Math.max(0,Math.min(100,n))
const today=()=>new Date().toISOString().slice(0,10)
const shuffle=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5)

export default function App(){
  const [state,setState]=useState<Stored>(load)
  const [screen,setScreen]=useState<Screen>('home')
  const [activeId,setActiveId]=useState(modules[0].id)
  const [lessonIndex,setLessonIndex]=useState(0)
  const [quizMode,setQuizMode]=useState(false)
  const [quizIndex,setQuizIndex]=useState(0)
  const [quizCorrect,setQuizCorrect]=useState(0)
  const [selected,setSelected]=useState<number|null>(null)
  const [answered,setAnswered]=useState(false)
  const [examQuestions,setExamQuestions]=useState<Question[]>([])
  const [examIndex,setExamIndex]=useState(0)
  const [examScore,setExamScore]=useState(0)
  const [examDone,setExamDone]=useState(false)

  useEffect(()=>localStorage.setItem('pet-feliz-study-v2',JSON.stringify(state)),[state])
  useEffect(()=>{
    const d=today()
    setState(s=>s.lastStudy===d?s:{...s,streak:s.lastStudy?s.streak+1:1,lastStudy:d})
  },[])

  const active=modules.find(m=>m.id===activeId) ?? modules[0]
  const allQuestions=useMemo(()=>modules.flatMap(m=>m.questions),[])
  const progress=Math.round(state.completed.length/modules.length*100)
  const prosperity=Math.round(Object.values(state.metrics).reduce((a,b)=>a+b,0)/5)

  const reviewQuestions=useMemo(()=>{
    const ids=new Set(state.errors)
    const now=Date.now()
    const wrong=allQuestions.filter(q=>ids.has(q.id))
    const due=allQuestions.filter(q=>(state.seen[q.id]||0)>0&&!ids.has(q.id)&&(state.due[q.id]||0)<=now)
    return [...wrong,...shuffle(due).slice(0,Math.max(0,10-wrong.length))]
  },[state.errors,state.seen,state.due,allQuestions])

  const nextModule=useMemo(()=>{
    const first=modules.find(m=>!state.completed.includes(m.id))
    return first??modules[modules.length-1]
  },[state.completed])

  const markQuestion=(q:Question,correct:boolean)=>setState(s=>{
    const current=s.strength[q.id]||0
    const nextStrength=correct?Math.min(current+1,4):0
    const days=[0,1,3,7,14][nextStrength]
    return {
      ...s,
      errors:correct?s.errors.filter(id=>id!==q.id):Array.from(new Set([...s.errors,q.id])),
      seen:{...s.seen,[q.id]:(s.seen[q.id]||0)+1},
      strength:{...s.strength,[q.id]:nextStrength},
      due:{...s.due,[q.id]:correct?Date.now()+days*86400000:Date.now()}
    }
  })

  const openModule=(id:string,forceStart=false)=>{
    const m=modules.find(x=>x.id===id)??modules[0]
    const saved=forceStart?0:Math.min(state.moduleStep[id]||0,m.lessons.length-1)
    setActiveId(id);setLessonIndex(saved);setQuizMode(false);setQuizIndex(0);setQuizCorrect(0)
    setSelected(null);setAnswered(false);setScreen('module')
  }

  const nextLesson=()=>{
    if(lessonIndex<active.lessons.length-1){
      const n=lessonIndex+1
      setLessonIndex(n)
      setState(s=>({...s,moduleStep:{...s.moduleStep,[active.id]:n}}))
      window.scrollTo({top:0,behavior:'smooth'})
    }else{
      setQuizMode(true);setQuizIndex(0);setQuizCorrect(0);setSelected(null);setAnswered(false)
      setState(s=>({...s,moduleStep:{...s.moduleStep,[active.id]:active.lessons.length}}))
      window.scrollTo({top:0,behavior:'smooth'})
    }
  }

  const finishModule=()=>{
    const score=Math.round(quizCorrect/active.questions.length*100)
    setState(s=>({...s,scores:{...s.scores,[active.id]:score},completed:score>=active.masteryTarget?Array.from(new Set([...s.completed,active.id])):s.completed}))
    setScreen('simulation')
  }

  const chooseDecision=(index:number)=>{
    const d=decisions.find(x=>x.moduleId===active.id);if(!d)return
    const op=d.options[index]
    setState(s=>{
      const m={...s.metrics}
      Object.entries(op.impact).forEach(([k,v])=>{m[k as keyof Metrics]=clamp(m[k as keyof Metrics]+(v||0))})
      return {...s,decisions:{...s.decisions,[d.id]:index},metrics:m}
    })
  }

  const startExam=()=>{
    setExamQuestions(shuffle(allQuestions).slice(0,24));setExamIndex(0);setExamScore(0)
    setExamDone(false);setSelected(null);setAnswered(false);setScreen('exam')
  }

  const reset=()=>{
    if(confirm('Apagar todo o progresso deste navegador e recomeçar?')){
      localStorage.removeItem('pet-feliz-study-v2');setState(initial);setScreen('home')
    }
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <button className="brand" onClick={()=>setScreen('home')}>
        <span className="brand-mark"><Sparkles size={18}/></span>
        <span className="brand-copy"><strong>PET FELIZ</strong><small>BUSINESS STUDY LAB</small></span>
      </button>
      <nav>
        <Nav active={screen==='home'} icon={<Home size={18}/>} label="Início" onClick={()=>setScreen('home')}/>
        <Nav active={screen==='review'} icon={<RefreshCcw size={18}/>} label="Revisão inteligente" badge={state.errors.length||undefined} onClick={()=>setScreen('review')}/>
        <Nav active={screen==='exam'} icon={<GraduationCap size={18}/>} label="Simulado" onClick={startExam}/>
        <Nav active={screen==='references'} icon={<BookOpen size={18}/>} label="Fontes e método" onClick={()=>setScreen('references')}/>
      </nav>
      <div className="side-foot">
        <div className="side-progress-label"><span>PROGRESSO DO CURSO</span><b>{progress}%</b></div>
        <div className="progress"><i style={{width:progress+'%'}}/></div>
        <small>{state.completed.length} de {modules.length} módulos dominados</small>
      </div>
    </aside>

    <main className="main">
      {screen==='home'&&<HomeScreen state={state} progress={progress} prosperity={prosperity} nextModule={nextModule} openModule={openModule} startExam={startExam}/>}
      {screen==='module'&&!quizMode&&<StudyScreen module={active} lessonIndex={lessonIndex} state={state} next={nextLesson} prev={()=>setLessonIndex(i=>Math.max(0,i-1))} back={()=>setScreen('home')}/>}
      {screen==='module'&&quizMode&&<QuizScreen module={active} quizIndex={quizIndex} quizCorrect={quizCorrect} selected={selected} answered={answered}
        setSelected={setSelected}
        answer={()=>{
          if(selected===null||answered)return
          const question=active.questions[quizIndex]
          const ok=selected===question.answer
          setAnswered(true);if(ok)setQuizCorrect(x=>x+1);markQuestion(question,ok)
        }}
        next={()=>{
          if(quizIndex<active.questions.length-1){setQuizIndex(x=>x+1);setSelected(null);setAnswered(false)}
          else finishModule()
        }}
        review={()=>{setQuizMode(false);setLessonIndex(0)}}
      />}
      {screen==='simulation'&&<SimulationScreen moduleId={active.id} state={state} choose={chooseDecision} done={()=>setScreen('home')} prosperity={prosperity}/>}
      {screen==='review'&&<ReviewScreen questions={reviewQuestions} state={state} markQuestion={markQuestion}/>}
      {screen==='exam'&&<ExamScreen questions={examQuestions} index={examIndex} score={examScore} done={examDone} best={state.examBest} selected={selected} answered={answered}
        setSelected={setSelected}
        answer={()=>{
          if(selected===null||answered)return
          const question=examQuestions[examIndex]
          const ok=selected===question.answer
          setAnswered(true);if(ok)setExamScore(x=>x+1);markQuestion(question,ok)
        }}
        next={()=>{
          if(examIndex<examQuestions.length-1){setExamIndex(x=>x+1);setSelected(null);setAnswered(false)}
          else{
            const finalScore=examScore+(selected===examQuestions[examIndex]?.answer?1:0)
            const pct=Math.round(finalScore/examQuestions.length*100)
            setExamScore(finalScore)
            setState(s=>({...s,examBest:Math.max(s.examBest,pct)}));setExamDone(true)
          }
        }}
        restart={startExam}
      />}
      {screen==='references'&&<References reset={reset}/>}
    </main>
  </div>
}

function Nav({active,icon,label,onClick,badge}:{active:boolean;icon:ReactNode;label:string;onClick:()=>void;badge?:number}){
  return <button className={'nav '+(active?'active':'')} onClick={onClick}>{icon}<span>{label}</span>{badge?<b>{badge}</b>:null}</button>
}

function HomeScreen({state,progress,prosperity,nextModule,openModule,startExam}:{state:Stored;progress:number;prosperity:number;nextModule:Module;openModule:(id:string,forceStart?:boolean)=>void;startExam:()=>void}){
  return <>
    <section className="welcome-card">
      <div className="welcome-copy">
        <span className="eyebrow"><Sparkles size={14}/> ESTUDO GUIADO + SIMULAÇÃO DE NEGÓCIO</span>
        <h1>Você não vai só responder perguntas.<br/><em>Vai aprender a construir o PET FELIZ.</em></h1>
        <p>Leia a matéria em etapas curtas, veja exemplos e visualizações, teste o entendimento e depois tome decisões que fazem o negócio melhorar ou piorar.</p>
        <div className="hero-actions">
          <button className="primary big" onClick={()=>openModule(nextModule.id)}>
            {progress===0?'Começar os estudos':'Continuar de onde parei'} <ArrowRight size={18}/>
          </button>
          {state.examBest>0&&<button className="ghost-btn" onClick={startExam}>Refazer simulado</button>}
        </div>
        <div className="study-promise">
          <div><BookOpen/><span><strong>Estude</strong><small>matéria completa e guiada</small></span></div>
          <div><Brain/><span><strong>Entenda</strong><small>exemplos e relações</small></span></div>
          <div><BriefcaseBusiness/><span><strong>Aplique</strong><small>decisões no PET FELIZ</small></span></div>
          <div><RefreshCcw/><span><strong>Revise</strong><small>erros voltam depois</small></span></div>
        </div>
      </div>
      <div className="business-health">
        <span className="mini-label">PET FELIZ AGORA</span>
        <div className="health-ring" style={{'--score':prosperity} as CSSProperties}><div><strong>{prosperity}</strong><small>/100</small></div></div>
        <h3>{prosperity>=80?'Negócio muito sólido':prosperity>=65?'Em crescimento':prosperity>=50?'Em construção':'Precisa de correções'}</h3>
        <p>Suas decisões de estudo alteram estratégia, cliente, marca, operação e finanças.</p>
      </div>
    </section>

    <section className="stats-grid">
      <Stat icon={<Target/>} label="Domínio da trilha" value={progress+'%'} hint={state.completed.length+' de '+modules.length+' módulos'}/>
      <Stat icon={<Brain/>} label="Pontos para revisar" value={String(state.errors.length)} hint={state.errors.length?'Erros registrados':'Fila limpa'}/>
      <Stat icon={<Trophy/>} label="Melhor simulado" value={state.examBest+'%'} hint="Meta recomendada: 85%+"/>
      <Stat icon={<RefreshCcw/>} label="Sequência" value={state.streak+' dias'} hint="Consistência de estudo"/>
    </section>

    <section className="section-head">
      <div><span className="eyebrow">ROTEIRO DE APRENDIZAGEM</span><h2>Uma trilha que começa pelo básico e termina na integração do negócio.</h2></div>
    </section>

    <div className="roadmap">
      {modules.map((m,i)=>{
        const locked=i>0&&!state.completed.includes(modules[i-1].id)
        const completed=state.completed.includes(m.id)
        const score=state.scores[m.id]
        return <div key={m.id} className={'roadmap-row '+(locked?'locked':'')+(completed?' completed':'')}>
          <div className="roadmap-line"><span>{completed?<CheckCircle2 size={19}/>:String(m.order).padStart(2,'0')}</span></div>
          <div className="roadmap-card">
            <div className="roadmap-main">
              <div className="roadmap-title"><span>MÓDULO {m.order}</span><h3>{m.title}</h3><p>{m.description}</p></div>
              <div className="roadmap-meta">
                <span><BookOpen size={14}/>{m.lessons.length} aulas</span>
                <span><Target size={14}/>meta {m.masteryTarget}%</span>
                {score!==undefined&&<span className="score-pill">último: {score}%</span>}
              </div>
            </div>
            <button disabled={locked} className={completed?'ghost-btn':'primary'} onClick={()=>openModule(m.id,completed)}>
              {locked?'Conclua o anterior':completed?'Revisar':'Estudar'} {!locked&&<ChevronRight size={16}/>}
            </button>
          </div>
        </div>
      })}
    </div>
  </>
}

function Stat({icon,label,value,hint}:{icon:ReactNode;label:string;value:string;hint:string}){
  return <div className="stat"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></div>
}

function StudyScreen({module,lessonIndex,state,next,prev,back}:{module:Module;lessonIndex:number;state:Stored;next:()=>void;prev:()=>void;back:()=>void}){
  const lesson=module.lessons[lessonIndex]
  const pct=Math.round((lessonIndex/module.lessons.length)*100)
  return <div className="study-layout">
    <aside className="study-outline">
      <button className="back" onClick={back}><ArrowLeft size={16}/> Voltar à trilha</button>
      <div className="outline-head">
        <span>MÓDULO {String(module.order).padStart(2,'0')}</span>
        <h3>{module.title}</h3>
        <div className="outline-progress"><i style={{width:pct+'%'}}/></div>
        <small>{lessonIndex+1} de {module.lessons.length} aulas</small>
      </div>
      <div className="outline-lessons">
        {module.lessons.map((l,i)=><button key={l.id} className={(i===lessonIndex?'active ':'')+(i<lessonIndex?'done':'')} onClick={()=>i<=lessonIndex&&undefined}>
          <span>{i<lessonIndex?<CheckCircle2 size={15}/>:i+1}</span><div><strong>{l.title}</strong><small>{l.kicker}</small></div>
        </button>)}
      </div>
      <div className="outline-goals"><span>AO FINAL, VOCÊ SABERÁ</span>{module.outcomes.map(x=><div key={x}><CheckCircle2 size={13}/>{x}</div>)}</div>
    </aside>

    <section className="study-content">
      <div className="lesson-top">
        <span className={'source-badge '+lesson.source}>{lesson.source==='material'?'DO MATERIAL PET FELIZ':'APROFUNDAMENTO'}</span>
        <span className="lesson-count">AULA {lessonIndex+1}/{module.lessons.length}</span>
      </div>
      <span className="eyebrow">{lesson.kicker}</span>
      <h1>{lesson.title}</h1>
      <p className="lesson-intro">{lesson.intro}</p>

      <Visual kind={lesson.visual}/>

      <div className="reading">
        {lesson.paragraphs.map((p,i)=><p key={i}>{p}</p>)}
        {lesson.bullets&&<div className="concept-list">{lesson.bullets.map((b,i)=><div key={b}><span>{String(i+1).padStart(2,'0')}</span><p>{b}</p></div>)}</div>}
      </div>

      {lesson.example&&<div className="example-box"><div className="example-icon"><Lightbulb/></div><div><span>{lesson.exampleTitle||'Exemplo'}</span><p>{lesson.example}</p></div></div>}

      <div className="takeaway"><Compass/><div><span>IDEIA PARA LEVAR</span><strong>{lesson.keyTakeaway}</strong></div></div>

      <div className="study-actions">
        <button className="ghost-btn" disabled={lessonIndex===0} onClick={prev}><ArrowLeft size={17}/> Aula anterior</button>
        <button className="primary big" onClick={next}>{lessonIndex===module.lessons.length-1?'Ir para verificação de aprendizagem':'Continuar estudo'} <ArrowRight size={18}/></button>
      </div>
      {state.completed.includes(module.id)&&<div className="already-mastered"><CheckCircle2/>Você já dominou este módulo. Esta leitura é uma revisão.</div>}
    </section>
  </div>
}

function Visual({kind}:{kind?:Lesson['visual']}){
  if(!kind)return null
  const common=<span className="visual-label">VISUALIZAÇÃO DO CONCEITO</span>
  if(kind==='plan-map')return <div className="concept-visual plan-map">{common}<div className="flow-nodes"><Node i={<Users/>} t="Cliente"/><ArrowRight/><Node i={<Target/>} t="Valor"/><ArrowRight/><Node i={<Building2/>} t="Operação"/><ArrowRight/><Node i={<WalletCards/>} t="Finanças"/></div></div>
  if(kind==='mvv')return <div className="concept-visual">{common}<div className="mvv-grid"><div><b>MISSÃO</b><strong>Por que existimos?</strong><small>presente</small></div><div><b>VISÃO</b><strong>Onde queremos chegar?</strong><small>futuro</small></div><div><b>VALORES</b><strong>Como devemos agir?</strong><small>comportamento</small></div></div></div>
  if(kind==='customer')return <div className="concept-visual">{common}<div className="customer-map"><div className="persona-dot"><Users/><strong>Tutor</strong></div><div><span>Precisa</span><b>saúde + cuidado + conveniência</b></div><div><span>Busca</span><b>confiança + solução</b></div><div><span>Percebe valor</span><b>benefício ÷ esforço/preço</b></div></div></div>
  if(kind==='market')return <div className="concept-visual">{common}<div className="market-orbit"><div className="orbit-center">PET<br/>FELIZ</div><span className="o1">Clientes</span><span className="o2">Concorrentes</span><span className="o3">Fornecedores</span><span className="o4">Tendências</span></div></div>
  if(kind==='porter')return <div className="concept-visual">{common}<div className="porter-grid"><div className="porter-top">Novos entrantes</div><div className="porter-left">Fornecedores</div><div className="porter-center">Rivalidade<br/><small>concorrentes</small></div><div className="porter-right">Compradores</div><div className="porter-bottom">Substitutos</div></div></div>
  if(kind==='value')return <div className="concept-visual">{common}<div className="value-triangle"><div className="v-top">UTILIDADE</div><div className="v-left">PREÇO</div><div className="v-right">CUSTO</div><strong>VALOR</strong></div></div>
  if(kind==='journey')return <div className="concept-visual">{common}<div className="journey">{['Descoberta','Consideração','Contato','Compra','Experiência','Recompra'].map((x,i)=><div key={x}><span>{i+1}</span><b>{x}</b></div>)}</div></div>
  if(kind==='operations')return <div className="concept-visual">{common}<div className="ops-flow"><div>Entrada</div><ArrowRight/><div>Processo</div><ArrowRight/><div>Controle</div><ArrowRight/><div>Experiência</div></div></div>
  if(kind==='finance')return <div className="concept-visual">{common}<div className="finance-grid"><div><span>LUCRATIVIDADE</span><strong>Lucro ÷ Receita</strong></div><div><span>RENTABILIDADE</span><strong>Retorno ÷ Investimento</strong></div><div><span>PAYBACK</span><strong>Tempo de recuperação</strong></div></div></div>
  if(kind==='swot')return <div className="concept-visual">{common}<div className="swot-grid"><div className="positive"><b>FORÇAS</b><span>interno +</span></div><div className="positive"><b>OPORTUNIDADES</b><span>externo +</span></div><div className="negative"><b>FRAQUEZAS</b><span>interno −</span></div><div className="negative"><b>AMEAÇAS</b><span>externo −</span></div></div></div>
  if(kind==='integration')return <div className="concept-visual">{common}<div className="integration-line">{['Cliente','Necessidade','Valor','Operação','Custos','Receita','Retorno'].map((x,i)=><div key={x}><span>{i+1}</span><b>{x}</b></div>)}</div></div>
  return <div className="concept-visual">{common}<div className="memory-flow"><div>Estudar</div><ArrowRight/><div>Recuperar</div><ArrowRight/><div>Errar</div><ArrowRight/><div>Revisar</div><ArrowRight/><div>Dominar</div></div></div>
}
function Node({i,t}:{i:ReactNode;t:string}){return <div className="flow-node">{i}<b>{t}</b></div>}

function QuizScreen({module,quizIndex,quizCorrect,selected,answered,setSelected,answer,next,review}:{module:Module;quizIndex:number;quizCorrect:number;selected:number|null;answered:boolean;setSelected:(n:number)=>void;answer:()=>void;next:()=>void;review:()=>void}){
  const question=module.questions[quizIndex]
  return <div className="assessment-page">
    <div className="assessment-head">
      <div><span className="eyebrow">VERIFICAÇÃO DE APRENDIZAGEM</span><h1>Agora prove que entendeu.</h1><p>Seu professor está verificando se você consegue explicar a decisão: use os conceitos estudados e justifique mentalmente cada resposta.</p></div>
      <div className="assessment-score"><span>ACERTOS</span><strong>{quizCorrect}/{module.questions.length}</strong></div>
    </div>
    <div className="exam-progress"><i style={{width:((quizIndex+1)/module.questions.length*100)+'%'}}/></div>
    <section className="quiz-box">
      <div className="quiz-meta"><span>QUESTÃO {quizIndex+1} DE {module.questions.length}</span><span>meta do módulo: {module.masteryTarget}%</span></div>
      <h2>{question.prompt}</h2>
      <div className="options">{question.options.map((o,i)=><button key={o} onClick={()=>!answered&&setSelected(i)} className={(selected===i?'selected ':'')+(answered&&i===question.answer?'correct ':'')+(answered&&selected===i&&i!==question.answer?'wrong':'')}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></button>)}</div>
      {answered&&<div className={'feedback '+(selected===question.answer?'good':'bad')}>{selected===question.answer?<CheckCircle2/>:<CircleAlert/>}<div><strong>{selected===question.answer?'Você entendeu este ponto.':'Aqui existe uma lacuna.'}</strong><p>{question.explanation}</p>{selected!==question.answer&&<small>Essa questão entrou na sua revisão inteligente.</small>}</div></div>}
      <div className="quiz-actions">
        <button className="text-btn" onClick={review}>Rever matéria</button>
        {!answered?<button className="primary" disabled={selected===null} onClick={answer}>Confirmar resposta</button>:<button className="primary" onClick={next}>{quizIndex===module.questions.length-1?'Aplicar no PET FELIZ':'Próxima questão'} <ChevronRight size={17}/></button>}
      </div>
    </section>
  </div>
}

function SimulationScreen({moduleId,state,choose,done,prosperity}:{moduleId:string;state:Stored;choose:(i:number)=>void;done:()=>void;prosperity:number}){
  const d=decisions.find(x=>x.moduleId===moduleId)!
  const picked=state.decisions[d.id]
  return <div className="sim-page">
    <div className="sim-head"><div><span className="eyebrow">LABORATÓRIO DE DECISÃO</span><h1>O conhecimento agora vira consequência.</h1><p className="lead">Você estudou o conceito. Agora tome uma decisão gerencial e veja o impacto no PET FELIZ.</p></div><div className="sim-index"><Building2/><span>Índice do negócio</span><strong>{prosperity}</strong></div></div>
    <div className="business-panel"><MetricBars m={state.metrics}/></div>
    <article className="decision"><span>CENÁRIO REALISTA</span><h2>{d.situation}</h2><h3>{d.question}</h3><div className="decision-options">{d.options.map((o,i)=><button key={o.label} disabled={picked!==undefined} className={picked===i?'picked '+o.quality:''} onClick={()=>choose(i)}><strong>{o.label}</strong>{picked===i&&<p>{o.rationale}</p>}</button>)}</div>{picked!==undefined&&<button className="primary big" onClick={done}>Voltar à trilha <ArrowRight size={17}/></button>}</article>
  </div>
}
function MetricBars({m}:{m:Metrics}){return <div className="metrics">{Object.entries(m).map(([k,v])=><div className="metric" key={k}><div><span>{k}</span><b>{v}</b></div><div className="metric-track"><i style={{width:v+'%'}}/></div></div>)}</div>}

function ReviewScreen({questions,state,markQuestion}:{questions:Question[];state:Stored;markQuestion:(q:Question,c:boolean)=>void}){
  const [i,setI]=useState(0),[sel,setSel]=useState<number|null>(null),[ans,setAns]=useState(false)
  if(!questions.length)return <Empty icon={<CheckCircle2 size={44}/>} title="Nada vencido para revisar" text="Continue os estudos. Erros e conceitos já vistos voltarão aqui no momento adequado."/>
  const question=questions[Math.min(i,questions.length-1)]
  return <div className="review-page">
    <span className="eyebrow">REVISÃO INTELIGENTE</span><h1>Tente lembrar antes de reler.</h1><p className="lead">Erros têm prioridade. Depois, conteúdos antigos reaparecem em intervalos crescentes para testar retenção.</p>
    <div className="review-count">{i+1} de {questions.length} · {state.errors.includes(question.id)?'erro prioritário':'revisão programada'}</div>
    <section className="quiz-box"><h2>{question.prompt}</h2><div className="options">{question.options.map((o,ix)=><button key={o} onClick={()=>!ans&&setSel(ix)} className={(sel===ix?'selected ':'')+(ans&&ix===question.answer?'correct ':'')+(ans&&sel===ix&&ix!==question.answer?'wrong':'')}><b>{String.fromCharCode(65+ix)}</b><span>{o}</span></button>)}</div>
      {ans&&<div className={'feedback '+(sel===question.answer?'good':'bad')}><div><strong>{sel===question.answer?'Recuperado com sucesso.':'Ainda precisa reforçar.'}</strong><p>{question.explanation}</p></div></div>}
      <div className="quiz-actions">{!ans?<button className="primary" disabled={sel===null} onClick={()=>{if(sel===null)return;setAns(true);markQuestion(question,sel===question.answer)}}>Confirmar</button>:<button className="primary" onClick={()=>{if(i<questions.length-1){setI(x=>x+1);setSel(null);setAns(false)}else{setI(0);setSel(null);setAns(false)}}}>{i<questions.length-1?'Próxima revisão':'Recomeçar fila'}</button>}</div>
    </section>
  </div>
}

function ExamScreen({questions,index,score,done,best,selected,answered,setSelected,answer,next,restart}:{questions:Question[];index:number;score:number;done:boolean;best:number;selected:number|null;answered:boolean;setSelected:(n:number)=>void;answer:()=>void;next:()=>void;restart:()=>void}){
  if(!questions.length)return null
  if(done){
    const pct=Math.round(score/questions.length*100)
    return <div className="exam-result"><Trophy size={56}/><span className="eyebrow">RESULTADO DO SIMULADO</span><h1>{pct}%</h1><p>{pct>=85?'Domínio forte. Use a revisão inteligente para limpar as últimas lacunas.':pct>=70?'Boa base, mas ainda há conceitos para consolidar.':'Volte à matéria e trabalhe os pontos que ficaram frágeis.'}</p><div className="result-grid"><Stat icon={<Target/>} label="Acertos" value={score+'/'+questions.length} hint="Questões respondidas"/><Stat icon={<Trophy/>} label="Melhor marca" value={Math.max(best,pct)+'%'} hint="Recorde neste navegador"/></div><button className="primary big" onClick={restart}><RotateCcw size={17}/> Novo simulado</button></div>
  }
  const question=questions[index]
  return <div className="exam-page">
    <div className="exam-top"><div><span className="eyebrow">SIMULADO INTEGRADO</span><h1>Questão {index+1}</h1><p>Conceitos de módulos diferentes aparecem misturados, como em uma prova real.</p></div><div className="counter">{index+1}/{questions.length}</div></div>
    <div className="exam-progress"><i style={{width:((index+1)/questions.length*100)+'%'}}/></div>
    <section className="quiz-box"><h2>{question.prompt}</h2><div className="options">{question.options.map((o,i)=><button key={o} onClick={()=>!answered&&setSelected(i)} className={(selected===i?'selected ':'')+(answered&&i===question.answer?'correct ':'')+(answered&&selected===i&&i!==question.answer?'wrong':'')}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></button>)}</div>
      {answered&&<div className={'feedback '+(selected===question.answer?'good':'bad')}><div><strong>{selected===question.answer?'Correto.':'Incorreto.'}</strong><p>{question.explanation}</p></div></div>}
      <div className="quiz-actions">{!answered?<button className="primary" disabled={selected===null} onClick={answer}>Responder</button>:<button className="primary" onClick={next}>{index===questions.length-1?'Finalizar simulado':'Próxima questão'}</button>}</div>
    </section>
  </div>
}

function References({reset}:{reset:()=>void}){
  return <div className="refs">
    <span className="eyebrow">FONTES + MÉTODO</span><h1>O que veio do arquivo e o que foi aprofundado.</h1>
    <p className="lead">Dentro das aulas, todo conteúdo aparece marcado como <b>“Do material PET FELIZ”</b> ou <b>“Aprofundamento”</b>. Assim você sabe exatamente o que está no caso original e o que foi adicionado para tornar o estudo completo.</p>
    <div className="method-grid">
      <article><BookOpen/><h3>Matéria antes da pergunta</h3><p>O fluxo agora começa por estudo guiado, exemplos e visualizações. A pergunta vem depois.</p></article>
      <article><Brain/><h3>Recuperação ativa</h3><p>Questões não são enfeite: elas obrigam você a recuperar o conceito antes de receber a explicação.</p></article>
      <article><RefreshCcw/><h3>Revisão espaçada</h3><p>Erros retornam imediatamente e acertos reaparecem em intervalos progressivos.</p></article>
    </div>
    <h2 className="ref-title">Referências utilizadas</h2>
    <div className="ref-list">{references.map(r=><article key={r.title}><div><strong>{r.title}</strong><p>{r.note}</p></div>{r.url&&<a href={r.url} target="_blank" rel="noreferrer">abrir fonte ↗</a>}</article>)}</div>
    <div className="danger-zone"><div><strong>Recomeçar o estudo</strong><p>O progresso fica salvo apenas neste navegador nesta versão.</p></div><button className="ghost-btn" onClick={reset}>Apagar progresso</button></div>
  </div>
}

function Empty({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <div className="empty">{icon}<h1>{title}</h1><p>{text}</p></div>}
