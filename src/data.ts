export type Question={
  id:string; moduleId:string; prompt:string; options:string[]; answer:number; explanation:string
}

export type Lesson={
  id:string
  title:string
  kicker:string
  source:'material'|'aprofundamento'
  intro:string
  paragraphs:string[]
  bullets?:string[]
  exampleTitle?:string
  example?:string
  keyTakeaway:string
  visual?:'plan-map'|'mvv'|'customer'|'market'|'porter'|'value'|'journey'|'operations'|'finance'|'swot'|'integration'|'memory'
}

export type Module={
  id:string
  order:number
  title:string
  subtitle:string
  description:string
  masteryTarget:number
  outcomes:string[]
  lessons:Lesson[]
  questions:Question[]
}

export type Decision={
  id:string
  moduleId:string
  situation:string
  question:string
  options:{
    label:string
    rationale:string
    impact:Partial<Record<'estrategia'|'cliente'|'marca'|'operacao'|'financas',number>>
    quality:'best'|'ok'|'bad'
  }[]
}

const q=(id:string,moduleId:string,prompt:string,options:string[],answer:number,explanation:string):Question=>({id,moduleId,prompt,options,answer,explanation})

export const modules:Module[]=[
{
 id:'fundamentos',order:1,title:'O que é um Plano de Negócios',subtitle:'Antes de responder questões, entenda o mapa inteiro do negócio.',
 description:'Você começa aprendendo para que serve um plano de negócios, como o PET FELIZ aparece no material e por que planejamento não é “adivinhar o futuro”, mas organizar hipóteses, escolhas e riscos.',
 masteryTarget:75,
 outcomes:['Entender a função real de um plano de negócios','Reconhecer os blocos centrais de análise','Distinguir fato, hipótese e decisão'],
 lessons:[
  {id:'f1',title:'Plano de negócios: o mapa antes da viagem',kicker:'CONCEITO CENTRAL',source:'aprofundamento',
   intro:'Um plano de negócios é uma ferramenta de decisão. Ele conecta ideia, mercado, clientes, operação e finanças antes que a empresa comprometa tempo e dinheiro.',
   paragraphs:[
    'O Sebrae define o plano de negócios como um documento que descreve objetivos e os passos necessários para alcançá-los, ajudando a reduzir riscos e incertezas. A ideia principal é simples: é melhor descobrir incoerências no planejamento do que somente depois de investir.',
    'Um bom plano não serve apenas para “abrir uma empresa”. Ele também ajuda a expandir, reorganizar, comparar cenários, explicar o negócio para sócios e acompanhar se as premissas continuam verdadeiras.',
    'Por isso, o estudante precisa olhar para o plano como um sistema. Se o público muda, a proposta de valor pode mudar. Se a operação fica mais cara, a margem muda. Se o mercado muda, a estratégia precisa ser revista.'
   ],
   bullets:['Ideia e propósito','Mercado, cliente e concorrência','Proposta de valor e estratégia','Operação, pessoas e fornecedores','Investimento, custos, receita e viabilidade','Riscos e cenários'],
   exampleTitle:'Pense no PET FELIZ',example:'Não basta dizer que o mercado pet cresce. É preciso perguntar: quem compra? por que compraria do PET FELIZ? quais serviços exigem estrutura? quanto custa entregar? o preço cobre o custo? a demanda é suficiente?',
   keyTakeaway:'Plano de negócios é uma cadeia de decisões conectadas; não uma coleção de textos.',visual:'plan-map'},
  {id:'f2',title:'O caso PET FELIZ que você recebeu',kicker:'DO MATERIAL',source:'material',
   intro:'O material apresenta um caso-base já estruturado. Ele é o ponto de partida de toda a plataforma.',
   paragraphs:[
    'O PET FELIZ está localizado em Feliz, no Rio Grande do Sul. O empreendimento será uma sociedade limitada com dois sócios: Flávio da Silva e Ana da Silva, cada um com 50% de participação.',
    'Ana da Silva é indicada como administradora e os dois sócios participam das deliberações mais importantes. Esse detalhe importa porque já define parte da governança do negócio.',
    'O documento também apresenta missão, visão, valores, clientes, concorrentes, fornecedores, crescimento de mercado, diferenciais e indicadores financeiros. Esses elementos formam o núcleo do plano apresentado.'
   ],
   bullets:['Local: Feliz/RS','Sociedade limitada','Flávio: 50%','Ana: 50% e administradora','Decisões importantes: ambos os sócios'],
   keyTakeaway:'Os dados do caso serão preservados; o restante do curso aprofunda o raciocínio em volta deles.',visual:'plan-map'},
  {id:'f3',title:'Fato, hipótese e decisão',kicker:'COMO PENSAR',source:'aprofundamento',
   intro:'Uma das habilidades mais importantes em prova e em gestão é saber o que o material afirma, o que precisa ser validado e o que depende de escolha.',
   paragraphs:[
    'Fato do caso é algo explicitamente informado no material, como o investimento de R$ 194.750,00. Hipótese é uma suposição usada para planejar, como estimar que determinado serviço terá uma taxa de ocupação. Decisão é a ação tomada a partir das informações, como ampliar ou não a creche.',
    'Confundir esses três níveis gera erros. Um mercado que cresce 30% a 35% ao ano, conforme o documento, não garante automaticamente que o PET FELIZ terá a mesma taxa de crescimento. Esse dado é parte do contexto; o desempenho da empresa depende de execução e aderência.',
    'Durante a plataforma, os blocos “Do material” mostram o que veio do arquivo. Os blocos “Aprofundamento” ampliam o estudo com conceitos de gestão.'
   ],
   keyTakeaway:'Aprender bem também é saber separar o que foi dado do que foi inferido.'}
 ],
 questions:[
  q('q1','fundamentos','Qual é a função mais adequada de um plano de negócios?',['Garantir lucro','Eliminar riscos','Organizar decisões e avaliar viabilidade','Substituir a gestão diária'],2,'O plano reduz incertezas e organiza decisões, mas não garante resultado nem elimina risco.'),
  q('q2','fundamentos','Qual dado vem diretamente do material do PET FELIZ?',['Ana possui 70% da empresa','O negócio será uma sociedade limitada com dois sócios de 50%','O negócio será uma franquia','Flávio será o único administrador'],1,'O caso informa uma sociedade limitada, com Flávio e Ana possuindo 50% cada.'),
  q('q3','fundamentos','“O crescimento local informado é de 30% a 35% ao ano” deve ser entendido como:',['Garantia de crescimento do PET FELIZ','Dado do contexto de mercado apresentado no caso','Meta obrigatória de vendas','Rentabilidade do projeto'],1,'É um dado de mercado apresentado no material, não uma garantia de desempenho individual da empresa.')
 ]
},
{
 id:'identidade',order:2,title:'Missão, Visão, Valores e Direção',subtitle:'Entenda como identidade vira estratégia — e não apenas frase de parede.',
 description:'O material dedica espaço importante à missão, visão e valores. Aqui você aprende o significado de cada conceito e como ele influencia escolhas reais.',
 masteryTarget:80,
 outcomes:['Diferenciar missão, visão e valores','Relacionar identidade a decisões','Evitar frases genéricas sem função estratégica'],
 lessons:[
  {id:'i1',title:'Missão: por que a empresa existe agora',kicker:'DO MATERIAL + CONCEITO',source:'material',
   intro:'A missão responde à pergunta “qual é a razão de existir da empresa e que valor ela entrega hoje?”.',
   paragraphs:[
    'No PET FELIZ, a missão é disponibilizar aos apaixonados por pets uma linha completa de produtos e serviços de qualidade, em ambiente agradável e com atendimento personalizado.',
    'Observe que a missão combina público, oferta e forma de entrega. Ela não fala apenas “vender produtos pet”; fala também em qualidade, ambiente e atendimento.',
    'Na prática, uma missão deve ajudar a filtrar decisões. Se a empresa promete atendimento personalizado, por exemplo, processos que tornam o atendimento impessoal podem entrar em conflito com a própria missão.'
   ],
   bullets:['Quem atendemos?','O que entregamos?','Com que padrão?','Que experiência prometemos?'],
   keyTakeaway:'Missão é presente: explica a razão de existir e o valor entregue hoje.',visual:'mvv'},
  {id:'i2',title:'Visão: para onde o PET FELIZ quer chegar',kicker:'DO MATERIAL + CONCEITO',source:'material',
   intro:'A visão descreve o futuro desejado e funciona como direção de longo prazo.',
   paragraphs:[
    'O material afirma que o PET FELIZ pretende ser reconhecido no mercado de cuidados com animais de estimação como uma empresa completa, capaz de atender às necessidades dos pets com qualidade, eficiência e excelência na prestação dos serviços.',
    'A diferença para a missão é temporal e estratégica: a missão explica o presente; a visão representa a posição futura desejada.',
    'Uma boa visão ajuda a orientar prioridades. Se o objetivo é ser reconhecido como empresa completa, a empresa precisa construir amplitude de solução sem comprometer a qualidade.'
   ],
   keyTakeaway:'Visão é futuro: descreve o lugar que a organização deseja ocupar.',visual:'mvv'},
  {id:'i3',title:'Valores: comportamento que sustenta a promessa',kicker:'DO MATERIAL',source:'material',
   intro:'Valores orientam o modo como a empresa deve agir enquanto busca seus objetivos.',
   paragraphs:[
    'O PET FELIZ apresenta valores ligados a amor e dedicação aos pets, higiene, qualidade dos serviços, atendimento especializado, benefícios para clientes, ética profissional, segurança, cuidado e profissionalismo.',
    'A parte mais importante é transformar cada valor em comportamento observável. “Higiene”, por exemplo, precisa virar rotina, checklist, frequência, responsabilidade e padrão de controle.',
    'Quando valores ficam somente no texto institucional, não influenciam a execução. Quando viram processo, critério de contratação e indicador, passam a fazer parte da gestão.'
   ],
   exampleTitle:'Exemplo prático',example:'Valor “segurança” → treinamento de manejo, registro de incidentes, regras de acesso, capacidade máxima por ambiente e plano de resposta.',
   keyTakeaway:'Valor organizacional só ganha força quando aparece no comportamento e no processo.',visual:'mvv'}
 ],
 questions:[
  q('q4','identidade','“Disponibilizar uma linha completa de produtos e serviços de qualidade...” é:',['Visão','Missão','Indicador','Meta financeira'],1,'É a missão apresentada no caso: descreve o propósito atual do PET FELIZ.'),
  q('q5','identidade','“Ser reconhecido no mercado como empresa completa...” é:',['Visão','Valor','Processo','Fornecedor'],0,'A frase descreve uma posição futura desejada, portanto é visão.'),
  q('q6','identidade','Qual alternativa representa melhor um valor organizacional?',['Abrir uma filial','Ética profissional','Faturar R$ 1 milhão','Vender 300 unidades'],1,'Ética profissional é um princípio de comportamento; os demais são ações ou metas.')
 ]
},
{
 id:'clientes',order:3,title:'Clientes, Necessidades e Segmentação',subtitle:'Quem compra, por que compra e o que realmente valoriza.',
 description:'O PET FELIZ foi pensado para tutores preocupados com saúde, bem-estar e conveniência. Agora você vai aprender a transformar essa descrição em análise de cliente.',
 masteryTarget:80,
 outcomes:['Diferenciar público-alvo, segmento e persona','Mapear necessidades funcionais e emocionais','Conectar necessidade a oferta'],
 lessons:[
  {id:'c1',title:'Quem é o cliente descrito no caso',kicker:'DO MATERIAL',source:'material',
   intro:'O documento identifica um público com necessidades mais específicas do que simplesmente “quem tem pet”.',
   paragraphs:[
    'Os clientes são tutores de cães e gatos preocupados com seus animais, especialmente com alimentação saudável e com serviços que ajudem a proporcionar uma vida tranquila aos pets.',
    'O material cita preocupação com alimentação livre de corantes, transgênicos e ingredientes que possam ser prejudiciais, além de interesse em hospedagem, creche, pet sitter, dog walker e adestramento.',
    'Também informa gasto médio de R$ 190,00 por mês. Esse número ajuda a caracterizar o consumo do público, mas não substitui uma análise detalhada de renda, frequência, ticket e disposição a pagar.'
   ],
   keyTakeaway:'O público do PET FELIZ busca saúde, cuidado e conveniência — não apenas produto.',visual:'customer'},
  {id:'c2',title:'Segmentação: nem todo tutor é igual',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Segmentar significa dividir o mercado em grupos com características ou necessidades relevantes para a estratégia.',
   paragraphs:[
    'Um pet shop pode segmentar por tipo de animal, frequência de compra, faixa de renda, estilo de vida, localização, preocupação com saúde, necessidade de conveniência ou intensidade de uso de serviços.',
    'A segmentação evita desperdício de marketing e ajuda a definir oferta. Um tutor que busca apenas preço reage de forma diferente de um tutor que valoriza alimentação natural, creche e atendimento especializado.',
    'Para o PET FELIZ, o caso sugere maior aderência de clientes que valorizam qualidade, bem-estar e soluções integradas.'
   ],
   bullets:['Demográfica: renda, composição familiar','Geográfica: distância e área de atendimento','Comportamental: frequência, gasto, uso de serviços','Psicográfica: valores, estilo de vida e preocupação com bem-estar'],
   keyTakeaway:'Segmentação é uma ferramenta de decisão: ajuda a escolher quem priorizar e como atender.',visual:'customer'},
  {id:'c3',title:'Necessidade, dor, benefício e valor percebido',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Pessoas não compram “serviços” de forma abstrata; compram resultados desejados.',
   paragraphs:[
    'Hospedagem pode resolver a dor “preciso viajar e não tenho com quem deixar meu pet”. Dog walker pode resolver falta de tempo. Alimentação saudável pode responder à preocupação com qualidade de vida.',
    'O benefício pode ser funcional, como praticidade; emocional, como tranquilidade; ou social, como sentir que está cuidando bem do animal.',
    'Quanto mais claramente a empresa liga uma necessidade a um benefício confiável, maior a chance de gerar valor percebido.'
   ],
   exampleTitle:'Aplicação',example:'Serviço: creche. Dor: pet fica sozinho. Benefício funcional: supervisão e atividade. Benefício emocional: tranquilidade do tutor. Prova de confiança: equipe treinada, rotina, higiene e comunicação.',
   keyTakeaway:'A oferta fica forte quando traduz serviço em problema resolvido e benefício percebido.',visual:'customer'}
 ],
 questions:[
  q('q7','clientes','Quem é o público central apresentado no caso?',['Apenas criadores profissionais','Tutores de cães e gatos preocupados com saúde e bem-estar','Somente clínicas veterinárias','Apenas tutores de animais exóticos'],1,'O documento descreve tutores de cães e gatos com preocupação ampliada com saúde e serviços.'),
  q('q8','clientes','Segmentação de mercado significa:',['Vender a mesma coisa para todos','Agrupar clientes por características e necessidades relevantes','Criar apenas uma persona fictícia','Diminuir o preço'],1,'Segmentação organiza grupos que ajudam a decidir oferta, comunicação e prioridade.'),
  q('q9','clientes','Qual é o melhor exemplo de “dor” atendida por pet sitter?',['Nome da marca','Tutor precisa se ausentar e quer cuidado confiável no período','Cor do uniforme','Margem bruta'],1,'A dor é a necessidade concreta ou problema vivido pelo cliente.')
 ]
},
{
 id:'mercado',order:4,title:'Mercado, Concorrência e Fornecedores',subtitle:'Entenda o ambiente onde o PET FELIZ precisa competir.',
 description:'Aqui o foco sai de dentro da empresa e vai para o ambiente externo: tamanho e crescimento do mercado, concorrentes, fornecedores, sazonalidade e participação.',
 masteryTarget:80,
 outcomes:['Interpretar crescimento de mercado sem confundir com resultado da empresa','Analisar concorrentes por critérios relevantes','Entender o papel estratégico dos fornecedores'],
 lessons:[
  {id:'m1',title:'Crescimento de mercado: oportunidade, não garantia',kicker:'DO MATERIAL',source:'material',
   intro:'O documento informa expansão do mercado pet na cidade de Feliz, com taxa de crescimento anual de 30% a 35%.',
   paragraphs:[
    'Esse dado reforça a existência de oportunidade no caso estudado. Além disso, o material afirma que clientes buscam produtos e serviços diferenciados que não encontram nos pet shops locais.',
    'Mas crescimento do mercado não significa que qualquer empresa terá sucesso. Para capturar a oportunidade, o PET FELIZ precisa ser conhecido, desejado, acessível, operacionalmente capaz e financeiramente sustentável.',
    'Em análise de mercado, também é importante estudar localização do consumidor, sazonalidade da demanda, participação de mercado e comportamento de compra.'
   ],
   keyTakeaway:'Mercado em crescimento aumenta oportunidade; execução continua sendo decisiva.',visual:'market'},
  {id:'m2',title:'Concorrência: compare o que importa para o cliente',kicker:'DO MATERIAL + APROFUNDAMENTO',source:'material',
   intro:'O material cita Pet Shop 1, Pet Shop 2 e Pet Shop 3 como principais concorrentes e afirma que possuem ofertas muito semelhantes.',
   paragraphs:[
    'Uma análise competitiva útil não deve se limitar a listar nomes. É preciso comparar preço, mix de produtos, variedade de serviços, localização, qualidade percebida, reputação, canais, conveniência, atendimento e capacidade.',
    'O caso sustenta que o PET FELIZ pretende ocupar espaço de diferenciação oferecendo alimentação saudável e serviços como hospedagem, creche, adestramento, pet sitter e dog walker.',
    'A pergunta estratégica é: quais desses diferenciais são realmente valorizados, difíceis de copiar e economicamente viáveis?'
   ],
   bullets:['Preço e ticket','Qualidade e confiança','Amplitude de serviços','Localização e conveniência','Experiência e atendimento','Reputação e relacionamento'],
   keyTakeaway:'Concorrente deve ser analisado pela mesma lógica com que o cliente escolhe.',visual:'market'},
  {id:'m3',title:'Fornecedores também influenciam a estratégia',kicker:'DO MATERIAL',source:'material',
   intro:'O caso aponta Pet Care Brasil e Natural Food como fornecedores principais.',
   paragraphs:[
    'A escolha é associada a portfólio diferenciado, sustentabilidade, qualidade e bem-estar animal. Isso cria coerência com a proposta de alimentação saudável e cuidado.',
    'Do ponto de vista de gestão, fornecedores afetam preço, qualidade, prazo, disponibilidade, inovação e risco de ruptura. Dependência excessiva de um fornecedor pode aumentar vulnerabilidade.',
    'Por isso, avaliar fornecedor envolve mais do que preço de compra: é preciso considerar confiabilidade, nível de serviço, qualidade, alternativas e impacto na proposta de valor.'
   ],
   keyTakeaway:'Fornecedor faz parte da capacidade de entregar a promessa ao cliente.',visual:'market'}
 ],
 questions:[
  q('q10','mercado','O crescimento de 30% a 35% citado no caso significa:',['Que o PET FELIZ terá exatamente esse crescimento','Que o mercado analisado é apresentado como crescente','Que a margem será 35%','Que não haverá concorrência'],1,'É um dado contextual do mercado, não garantia de desempenho individual.'),
  q('q11','mercado','Qual análise de concorrência é mais útil?',['Somente nome e endereço','Comparar atributos relevantes para decisão do cliente','Somente número de funcionários','Somente logotipo'],1,'A análise deve focar os critérios pelos quais o cliente percebe valor e escolhe.'),
  q('q12','mercado','Por que fornecedor é tema estratégico?',['Porque só define a cor da embalagem','Porque afeta custo, qualidade, prazo e continuidade da oferta','Porque elimina concorrentes','Porque substitui o cliente'],1,'Fornecedores influenciam diretamente capacidade, custo, qualidade e risco.')
 ]
},
{
 id:'porter',order:5,title:'As Cinco Forças de Porter',subtitle:'Vá além de “quem é meu concorrente?”.',
 description:'O próprio material introduz Porter. Nesta etapa você aprende as cinco forças, como elas mudam a atratividade do setor e como aplicá-las ao PET FELIZ.',
 masteryTarget:85,
 outcomes:['Nomear e explicar as cinco forças','Distinguir concorrente de substituto','Relacionar força competitiva a decisão estratégica'],
 lessons:[
  {id:'p1',title:'Por que Porter olha além da rivalidade',kicker:'DO MATERIAL + CONCEITO',source:'material',
   intro:'O documento afirma que a análise do segmento deve considerar concorrentes, fornecedores, compradores, substitutos e novos entrantes.',
   paragraphs:[
    'Esse raciocínio corresponde às Cinco Forças de Porter. A ferramenta amplia a análise porque a pressão competitiva não vem apenas dos concorrentes diretos.',
    'Clientes podem pressionar preço. Fornecedores podem aumentar custos. Novos entrantes podem disputar demanda. Substitutos podem resolver a mesma necessidade de outra maneira.',
    'O objetivo é entender a estrutura competitiva do setor e pensar em posicionamento, proteção de margem e diferenciação.'
   ],
   keyTakeaway:'Competição é um sistema de pressões, não apenas uma lista de rivais.',visual:'porter'},
  {id:'p2',title:'As cinco forças aplicadas ao PET FELIZ',kicker:'APLICAÇÃO',source:'aprofundamento',
   intro:'Veja como cada força pode aparecer no caso.',
   paragraphs:[
    'Rivalidade: Pet Shop 1, 2 e 3 disputam os mesmos clientes. Poder dos compradores: tutores podem comparar preço, qualidade e conveniência e trocar de fornecedor.',
    'Poder dos fornecedores: marcas diferenciadas ou pouco substituíveis podem ter maior poder de negociação. Novos entrantes: outra empresa pode perceber a oportunidade local e copiar serviços.',
    'Substitutos: cuidadores independentes, plataformas, familiares, compras online ou outros formatos podem resolver parte da mesma necessidade sem serem pet shops tradicionais.'
   ],
   bullets:['Rivalidade entre concorrentes','Poder de negociação dos compradores','Poder de negociação dos fornecedores','Ameaça de novos entrantes','Ameaça de produtos/serviços substitutos'],
   keyTakeaway:'A força relevante é a que consegue pressionar valor, preço, custo ou demanda.',visual:'porter'},
  {id:'p3',title:'Como transformar análise em ação',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'A ferramenta só é útil se levar a decisões.',
   paragraphs:[
    'Se compradores têm muitas alternativas, fortalecer fidelização e diferenciação pode reduzir sensibilidade a preço. Se fornecedores concentram poder, diversificar fontes ou negociar volume pode reduzir risco.',
    'Se a ameaça de entrada é alta, construir reputação, processos, relacionamento e experiência pode criar barreiras difíceis de copiar.',
    'Se substitutos ganham força, a empresa precisa entender qual benefício eles entregam melhor e reforçar sua própria proposta.'
   ],
   keyTakeaway:'Porter não termina no diagnóstico; o valor está na resposta estratégica.',visual:'porter'}
 ],
 questions:[
  q('q13','porter','Qual item NÃO é uma das cinco forças originais de Porter?',['Fornecedores','Compradores','Clima organizacional','Novos entrantes'],2,'Clima organizacional é um tema interno, não uma das cinco forças.'),
  q('q14','porter','Um aplicativo de cuidadores independentes pode ser visto como:',['Substituto','Valor interno','Missão','Investimento fixo'],0,'Ele pode resolver parte da necessidade do cliente por outra forma de oferta.'),
  q('q15','porter','Se poucos fornecedores controlam produtos diferenciados, qual força tende a aumentar?',['Poder dos compradores','Poder dos fornecedores','Ameaça de clientes','Visão organizacional'],1,'Concentração e baixa substituição tendem a elevar o poder do fornecedor.')
 ]
},
{
 id:'valor',order:6,title:'Proposta de Valor e Diferenciação',subtitle:'Por que o cliente escolheria o PET FELIZ?',
 description:'O material fala em valor agregado e inovação de valor. Aqui você transforma esse conceito em uma lógica prática de benefício, preço, custo e diferenciação.',
 masteryTarget:85,
 outcomes:['Explicar valor percebido','Relacionar benefício, preço e custo','Avaliar se um diferencial realmente cria valor'],
 lessons:[
  {id:'v1',title:'Valor para o cliente e valor para a empresa',kicker:'DO MATERIAL',source:'material',
   intro:'O documento diferencia dois lados do valor agregado.',
   paragraphs:[
    'Para compradores, o valor agregado depende da utilidade e do preço dos produtos e serviços. Para a empresa, o valor também precisa considerar a relação entre preço e custo.',
    'Isso mostra um princípio essencial: não basta encantar o cliente se a entrega destrói margem; e não basta ter boa margem se o cliente não percebe benefício.',
    'A proposta sustentável precisa equilibrar necessidade real, benefício percebido, preço aceitável, custo controlado e capacidade de entrega.'
   ],
   keyTakeaway:'Valor precisa funcionar para os dois lados: cliente e empresa.',visual:'value'},
  {id:'v2',title:'Os diferenciais do PET FELIZ',kicker:'DO MATERIAL',source:'material',
   intro:'O caso lista alimentação saudável e vários serviços como elementos de diferenciação.',
   paragraphs:[
    'Hospedagem, creche, adestramento, pet sitter e dog walker ampliam o escopo do negócio. Eles podem gerar conveniência e uma relação mais contínua com o cliente.',
    'Mas “ter mais serviços” não é automaticamente melhor. Cada serviço precisa de demanda, capacidade, processo e margem.',
    'Diferencial estratégico é aquilo que o cliente valoriza, distingue a empresa das alternativas e pode ser entregue de forma consistente.'
   ],
   keyTakeaway:'Diferenciação não é quantidade de recursos; é diferença relevante e sustentável.',visual:'value'},
  {id:'v3',title:'Inovação de valor',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'O material associa inovação de valor ao alinhamento entre utilidade, preço e custo.',
   paragraphs:[
    'A ideia é criar uma oferta em que o cliente perceba ganho relevante ao mesmo tempo em que a empresa encontra uma estrutura econômica viável.',
    'No PET FELIZ, um pacote integrado de serviços poderia aumentar conveniência; porém, se exigir estrutura muito cara e tiver baixa adesão, o valor econômico pode desaparecer.',
    'Por isso, inovação de valor exige testar o que realmente importa, eliminar complexidade desnecessária e concentrar investimento no que produz benefício percebido.'
   ],
   exampleTitle:'Pergunta de gestão',example:'“Este serviço aumenta o valor percebido o suficiente para justificar o custo e a complexidade de operá-lo?”',
   keyTakeaway:'Uma inovação só cria valor quando melhora a experiência sem destruir a lógica econômica.',visual:'value'}
 ],
 questions:[
  q('q16','valor','No caso, valor para o comprador depende principalmente de:',['Utilidade e preço','Número de funcionários','Forma societária','Quantidade de concorrentes'],0,'O material relaciona valor para o comprador à utilidade e ao preço.'),
  q('q17','valor','Qual alternativa descreve melhor um diferencial estratégico?',['Qualquer item novo','Algo valorizado pelo cliente, distinto e entregável de forma consistente','Somente preço baixo','Qualquer serviço caro'],1,'Diferenciação precisa ser relevante e sustentável.'),
  q('q18','valor','Adicionar serviços sem demanda comprovada pode:',['Sempre aumentar valor','Aumentar complexidade e custo sem criar valor suficiente','Garantir rentabilidade','Eliminar substitutos'],1,'Amplitude de oferta sem aderência pode gerar custo e perda de foco.')
 ]
},
{
 id:'marketing',order:7,title:'Marketing, Posicionamento e Jornada',subtitle:'Transforme estratégia em atração, experiência e fidelização.',
 description:'O material não detalha um plano de marketing. Esta etapa amplia o caso para mostrar como público, posicionamento, canais, preço e jornada podem ser organizados.',
 masteryTarget:80,
 outcomes:['Entender posicionamento','Aplicar os 4 Ps ao caso','Mapear a jornada do cliente'],
 lessons:[
  {id:'mk1',title:'Posicionamento: a ideia que queremos ocupar na mente',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Posicionamento é como a empresa deseja ser percebida em relação às alternativas.',
   paragraphs:[
    'Para o PET FELIZ, um posicionamento coerente com o material seria algo próximo de “cuidado completo, saudável e confiável para pets”.',
    'O posicionamento não é só slogan. Ele precisa aparecer em produto, atendimento, ambiente, preço, comunicação e operação.',
    'Se a marca promete cuidado especializado, mas entrega atendimento desorganizado, há ruptura entre promessa e experiência.'
   ],
   keyTakeaway:'Posicionamento é uma promessa comparativa sustentada pela experiência.',visual:'journey'},
  {id:'mk2',title:'Os 4 Ps aplicados',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Produto, preço, praça e promoção ajudam a transformar estratégia em execução comercial.',
   paragraphs:[
    'Produto envolve o que será oferecido: produtos saudáveis e serviços. Preço envolve política de cobrança, margem, pacotes e percepção de valor.',
    'Praça trata de onde e como o cliente acessa a oferta: loja física, área atendida por dog walker, canais digitais e facilidade de agendamento. Promoção trata de comunicação, aquisição e relacionamento.',
    'O ponto principal é coerência. Um serviço premium exige comunicação, operação e experiência compatíveis.'
   ],
   keyTakeaway:'Os 4 Ps precisam contar a mesma história estratégica.',visual:'journey'},
  {id:'mk3',title:'Jornada do cliente',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'A jornada mostra os momentos em que o cliente forma sua percepção.',
   paragraphs:[
    'Ela pode começar em uma busca no Google ou indicação, passar por comparação, contato, visita, compra, uso do serviço, pós-venda e recompra.',
    'Cada etapa tem perguntas diferentes. Antes da compra: “posso confiar?”. Durante: “é fácil contratar?”. Depois: “meu pet foi bem cuidado?”.',
    'Mapear a jornada ajuda a identificar fricções e oportunidades de fidelização.'
   ],
   bullets:['Descoberta','Consideração','Contato','Compra/agendamento','Experiência','Pós-venda','Recompra e indicação'],
   keyTakeaway:'Marketing não termina na venda; a experiência alimenta recompra e reputação.',visual:'journey'}
 ],
 questions:[
  q('q19','marketing','Posicionamento é:',['O endereço da loja','A percepção desejada da marca diante das alternativas','Somente o logotipo','A folha de pagamento'],1,'Posicionamento está ligado à forma como a marca quer ser percebida comparativamente.'),
  q('q20','marketing','Nos 4 Ps, “Praça” trata principalmente de:',['Canais e acesso à oferta','Missão','Valor contábil','Treinamento'],0,'Praça envolve distribuição, localização, canais e acesso.'),
  q('q21','marketing','Por que a jornada continua após a compra?',['Porque pós-venda, experiência e recompra afetam valor e reputação','Porque preço deixa de existir','Porque não há concorrência','Porque missão muda'],0,'A experiência após a compra influencia fidelização e indicação.')
 ]
},
{
 id:'operacao',order:8,title:'Operação, Pessoas e Qualidade',subtitle:'A promessa do marketing precisa caber na rotina.',
 description:'O caso valoriza higiene, segurança, cuidado e profissionalismo. Aqui esses valores viram processo, capacidade, responsabilidade e padrão de execução.',
 masteryTarget:85,
 outcomes:['Entender capacidade operacional','Transformar valores em processos','Relacionar pessoas, qualidade e experiência'],
 lessons:[
  {id:'o1',title:'Serviço bom depende de processo',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Cada serviço do PET FELIZ exige uma cadeia operacional própria.',
   paragraphs:[
    'Hospedagem e creche exigem entrada, identificação, critérios de saúde, rotina, alimentação, higiene, supervisão, comunicação com tutor e resposta a incidentes.',
    'Dog walker exige agenda, rota, controle de segurança e confirmação de execução. Pet sitter exige acesso ao domicílio, confiança, registro e protocolo.',
    'Quando o processo não é definido, a qualidade depende demais da pessoa do momento, aumentando variabilidade e risco.'
   ],
   keyTakeaway:'Processo transforma promessa em entrega repetível.',visual:'operations'},
  {id:'o2',title:'Capacidade: vender mais também pode piorar o negócio',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Capacidade é o limite seguro e eficiente de atendimento.',
   paragraphs:[
    'Se a creche comporta 20 animais com o padrão definido, vender 35 vagas pode aumentar receita no curto prazo e destruir qualidade, segurança e reputação.',
    'Capacidade depende de espaço, equipe, tempo, equipamento e complexidade do serviço. Ela precisa acompanhar o crescimento.',
    'Um plano operacional deve identificar gargalos antes que a demanda apareça.'
   ],
   keyTakeaway:'Crescimento sem capacidade pode converter oportunidade em problema.',visual:'operations'},
  {id:'o3',title:'Pessoas, governança e responsabilidade',kicker:'DO MATERIAL + APROFUNDAMENTO',source:'material',
   intro:'O material informa Ana como administradora e participação dos dois sócios nas decisões importantes.',
   paragraphs:[
    'Isso já cria uma base de governança, mas ainda seria necessário definir quais decisões são operacionais, quais exigem os dois sócios e quais podem ser delegadas.',
    'A equipe também precisa de papéis claros: atendimento, cuidado, limpeza, vendas, agenda, financeiro e supervisão.',
    'Treinamento, critérios de contratação e indicadores ajudam a transformar valores como segurança e profissionalismo em prática.'
   ],
   keyTakeaway:'Estrutura de pessoas precisa combinar responsabilidade, autoridade e competência.',visual:'operations'}
 ],
 questions:[
  q('q22','operacao','O principal risco de vender acima da capacidade é:',['Melhora automática da qualidade','Queda de qualidade, segurança e experiência','Menor necessidade de processo','Eliminação de custos'],1,'Demanda acima da capacidade cria gargalos e aumenta falhas.'),
  q('q23','operacao','Como um valor como “higiene” vira gestão?',['Ficando apenas no site','Virando padrão, rotina, responsável e indicador','Sendo citado em reunião anual','Substituindo treinamento'],1,'Valores precisam ser traduzidos em comportamento e controle.'),
  q('q24','operacao','Quem é indicada como administradora no caso?',['Ana da Silva','Flávio da Silva','Pet Care Brasil','Natural Food'],0,'O material indica Ana da Silva como administradora.')
 ]
},
{
 id:'financas',order:9,title:'Finanças e Viabilidade',subtitle:'Aprenda a ler os números do caso sem confundir os indicadores.',
 description:'O material conclui que o empreendimento é viável com base em investimento, lucratividade, rentabilidade e prazo de retorno. Aqui você aprende exatamente o que cada indicador significa.',
 masteryTarget:90,
 outcomes:['Diferenciar lucratividade, rentabilidade e payback','Interpretar investimento e origem de recursos','Entender o que faltaria em uma análise financeira completa'],
 lessons:[
  {id:'fn1',title:'Os números apresentados no material',kicker:'DO MATERIAL',source:'material',
   intro:'Os principais números do caso precisam ser memorizados e, principalmente, compreendidos.',
   paragraphs:[
    'O investimento total informado é de R$ 194.750,00. A fonte de recursos será 100% própria.',
    'O material apresenta lucratividade de 9,51%, rentabilidade de 70,99% ao ano e retorno do investimento em 1,4 anos.',
    'A conclusão do documento é que o empreendimento é viável.'
   ],
   bullets:['Investimento: R$ 194.750,00','Recursos próprios: 100%','Lucratividade: 9,51%','Rentabilidade: 70,99% a.a.','Retorno: 1,4 anos'],
   keyTakeaway:'Decore os números, mas entenda o que eles medem.',visual:'finance'},
  {id:'fn2',title:'Lucratividade x rentabilidade x payback',kicker:'CONCEITO DE PROVA',source:'aprofundamento',
   intro:'Esses três conceitos são parecidos na linguagem cotidiana, mas medem coisas diferentes.',
   paragraphs:[
    'Lucratividade relaciona o lucro obtido com a receita. Em termos simplificados: lucro dividido pela receita, multiplicado por 100.',
    'Rentabilidade relaciona retorno com o capital investido. Em termos simplificados: resultado ou retorno dividido pelo investimento, multiplicado por 100.',
    'Payback é tempo. Ele estima quanto tempo é necessário para recuperar o capital investido por meio dos fluxos gerados pelo negócio.'
   ],
   exampleTitle:'Memória rápida',example:'Lucratividade → vendas/receita. Rentabilidade → investimento. Payback → tempo.',
   keyTakeaway:'Pergunte sempre: “percentual sobre quê?” ou “tempo para quê?”.',visual:'finance'},
  {id:'fn3',title:'O que uma análise financeira completa também observaria',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'O resumo traz indicadores finais, mas um plano completo costuma exigir mais detalhes.',
   paragraphs:[
    'Seriam normalmente analisados custos fixos e variáveis, projeção de faturamento, margem de contribuição, capital de giro, fluxo de caixa, ponto de equilíbrio e cenários.',
    'O fluxo de caixa é especialmente importante porque uma empresa pode vender e ainda assim enfrentar falta de caixa devido a prazos de recebimento, estoque, investimento e custos.',
    'Cenários ajudam a testar sensibilidade: o que acontece se a ocupação da creche for menor? se fornecedor aumentar preço? se o ticket médio cair?'
   ],
   keyTakeaway:'Viabilidade robusta depende de testar como os números se comportam quando as premissas mudam.',visual:'finance'}
 ],
 questions:[
  q('q25','financas','Qual é o investimento total informado no caso?',['R$ 19.475,00','R$ 194.750,00','R$ 1.947.500,00','R$ 190.000,00'],1,'O material informa investimento total de R$ 194.750,00.'),
  q('q26','financas','Lucratividade se relaciona mais diretamente com:',['Receita/vendas','Tempo de retorno','Número de fornecedores','Missão'],0,'Lucratividade relaciona lucro à receita.'),
  q('q27','financas','Payback mede:',['Percentual de margem','Tempo para recuperar o investimento','Crescimento do mercado','Número de clientes'],1,'Payback é um indicador de tempo de recuperação do investimento.')
 ]
},
{
 id:'riscos',order:10,title:'SWOT, Riscos e Cenários',subtitle:'Aprenda a pensar antes do problema aparecer.',
 description:'O material destaca que estratégia precisa olhar mercado e ambiente interno. A análise SWOT e os cenários ajudam a transformar essa ideia em ferramenta prática.',
 masteryTarget:85,
 outcomes:['Diferenciar fatores internos e externos','Construir uma leitura SWOT coerente','Pensar em prevenção e resposta'],
 lessons:[
  {id:'r1',title:'Ambiente interno e externo',kicker:'DO MATERIAL + CONCEITO',source:'material',
   intro:'O documento afirma que o foco entre mercado e ambiente interno é fundamental para o sucesso.',
   paragraphs:[
    'O ambiente interno inclui recursos, pessoas, processos, cultura, capacidade e competências que estão mais diretamente sob controle da empresa.',
    'O ambiente externo inclui clientes, concorrentes, fornecedores, economia, tendências, legislação e tecnologia.',
    'Estratégia é justamente a tentativa de alinhar capacidade interna com oportunidade externa.'
   ],
   keyTakeaway:'A empresa precisa ser boa por dentro e relevante por fora.',visual:'swot'},
  {id:'r2',title:'SWOT/FOFA sem confusão',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'A matriz SWOT separa fatores por origem e efeito.',
   paragraphs:[
    'Forças e fraquezas são internas. Oportunidades e ameaças são externas. Esse detalhe é central para não errar questões de prova.',
    'Exemplo: equipe bem treinada é força. Falta de processo é fraqueza. Mercado crescente é oportunidade. Novo concorrente com grande capital é ameaça.',
    'A matriz só é útil quando gera ação: usar forças para aproveitar oportunidades, corrigir fraquezas e reduzir exposição a ameaças.'
   ],
   keyTakeaway:'Interno: força/fraqueza. Externo: oportunidade/ameaça.',visual:'swot'},
  {id:'r3',title:'Cenários e plano de resposta',kicker:'APROFUNDAMENTO',source:'aprofundamento',
   intro:'Cenário é uma forma de testar decisões contra futuros possíveis.',
   paragraphs:[
    'Um plano pode trabalhar com cenário base, favorável e adverso. O objetivo não é prever exatamente o futuro, mas entender como o negócio reage a mudanças importantes.',
    'Para cada risco relevante, é útil registrar probabilidade, impacto, sinais de alerta, prevenção e resposta.',
    'No PET FELIZ, exemplos incluem aumento de custo de fornecedor, baixa ocupação de serviços, entrada de concorrente, incidente operacional e queda de demanda.'
   ],
   keyTakeaway:'Risco bem gerenciado tem sinal, prevenção e resposta — não só preocupação.',visual:'swot'}
 ],
 questions:[
  q('q28','riscos','Na SWOT, uma equipe bem treinada é normalmente:',['Força','Ameaça','Oportunidade','Substituto'],0,'É um fator interno positivo, portanto força.'),
  q('q29','riscos','Mercado em crescimento é normalmente classificado como:',['Força','Fraqueza','Oportunidade','Valor'],2,'É um fator externo favorável, portanto oportunidade.'),
  q('q30','riscos','Qual é a função de cenários?',['Adivinhar o futuro exatamente','Testar como o negócio reage a diferentes premissas','Substituir o plano financeiro','Eliminar riscos'],1,'Cenários ajudam a avaliar sensibilidade e preparar respostas.')
 ]
},
{
 id:'integracao',order:11,title:'Integração: o PET FELIZ como Sistema',subtitle:'Agora junte todas as peças do plano.',
 description:'Nesta etapa você deixa de estudar conceitos isolados e passa a verificar coerência entre cliente, valor, operação, finanças e estratégia.',
 masteryTarget:90,
 outcomes:['Conectar os blocos do plano','Identificar incoerências','Pensar em trade-offs'],
 lessons:[
  {id:'g1',title:'A cadeia de coerência',kicker:'SÍNTESE',source:'aprofundamento',
   intro:'Um plano forte conta uma história coerente do início ao fim.',
   paragraphs:[
    'Cliente tem uma necessidade. A empresa escolhe uma proposta de valor. Essa proposta exige uma oferta e uma operação. A operação gera custos. O preço e a demanda geram receita. O resultado precisa remunerar o investimento.',
    'Se qualquer elo não fecha, o plano precisa ser revisto. Um serviço desejado mas impossível de operar com segurança não é uma boa decisão. Um serviço rentável que ninguém deseja também não.',
    'A qualidade do plano está menos na quantidade de páginas e mais na consistência entre decisões.'
   ],
   keyTakeaway:'Cliente → valor → oferta → operação → custos → receita → retorno.',visual:'integration'},
  {id:'g2',title:'Trade-offs: escolher também é renunciar',kicker:'ESTRATÉGIA',source:'aprofundamento',
   intro:'Toda estratégia tem escolhas e limites.',
   paragraphs:[
    'O PET FELIZ não precisa ser tudo para todos. Se quiser oferecer experiência especializada, talvez não consiga competir sempre pelo menor preço.',
    'Se quiser ampliar o mix, terá de investir em capacidade e processos. Se decidir crescer rapidamente, precisará proteger qualidade e caixa.',
    'Trade-off não é necessariamente problema; é a consequência de priorizar uma direção estratégica.'
   ],
   keyTakeaway:'Estratégia exige prioridade; tentar maximizar tudo ao mesmo tempo costuma gerar incoerência.',visual:'integration'},
  {id:'g3',title:'Leia o caso como professor leria',kicker:'PREPARAÇÃO PARA PROVA',source:'aprofundamento',
   intro:'Em prova, o mais importante é reconhecer relações entre os conceitos.',
   paragraphs:[
    'Missão se conecta a propósito atual. Visão a futuro. Valores a comportamento. Segmentação define público. Porter analisa estrutura competitiva. Valor agregado conecta utilidade, preço e custo.',
    'Lucratividade, rentabilidade e payback medem aspectos diferentes. Crescimento de mercado não é sinônimo de viabilidade. SWOT separa interno e externo.',
    'Questões mais difíceis costumam misturar conceitos próximos. Por isso o curso usa revisão e perguntas intercaladas.'
   ],
   keyTakeaway:'Domínio real aparece quando você consegue comparar conceitos e aplicar em contexto.',visual:'integration'}
 ],
 questions:[
  q('q31','integracao','Qual sequência representa melhor a lógica de um plano integrado?',['Logo → slogan → seguidores','Cliente → valor → operação → finanças','Preço → desconto → volume','Missão → fachada → estoque'],1,'Um plano integrado conecta necessidade, entrega e sustentabilidade econômica.'),
  q('q32','integracao','Se o PET FELIZ promete serviço premium mas corta higiene para reduzir custo, há:',['Coerência estratégica','Incoerência entre proposta e operação','Maior valor percebido','Redução automática do risco'],1,'A operação contradiz a promessa de qualidade e cuidado.'),
  q('q33','integracao','Qual frase é correta?',['Mercado crescente garante viabilidade','Toda diferenciação gera valor','Viabilidade depende da coerência entre mercado, execução e finanças','Payback é sinônimo de lucratividade'],2,'Viabilidade é resultado de vários elementos conectados.')
 ]
},
{
 id:'prova',order:12,title:'Preparação Final para a Prova',subtitle:'Recupere, compare, aplique e prove domínio.',
 description:'O último módulo organiza as principais pegadinhas conceituais e ensina como revisar de forma ativa antes do simulado final.',
 masteryTarget:90,
 outcomes:['Revisar conceitos confundíveis','Usar recuperação ativa','Entrar no simulado com estratégia'],
 lessons:[
  {id:'pf1',title:'As diferenças que mais confundem',kicker:'REVISÃO',source:'aprofundamento',
   intro:'Algumas questões existem justamente para testar se você separa conceitos parecidos.',
   paragraphs:[
    'Missão x visão: presente e razão de existir versus futuro desejado. Lucratividade x rentabilidade: resultado sobre receita versus retorno sobre investimento.',
    'Concorrente x substituto: concorrente oferece alternativa no mesmo espaço competitivo; substituto resolve a necessidade de outra forma.',
    'Força x oportunidade: força é interna e positiva; oportunidade é externa e favorável.'
   ],
   bullets:['Missão ≠ visão','Lucratividade ≠ rentabilidade','Rentabilidade ≠ payback','Concorrente ≠ substituto','Força ≠ oportunidade','Crescimento de mercado ≠ sucesso garantido'],
   keyTakeaway:'Comparar conceitos é mais eficaz do que decorar definições isoladas.',visual:'memory'},
  {id:'pf2',title:'Recuperação ativa e revisão espaçada',kicker:'MÉTODO DE ESTUDO',source:'aprofundamento',
   intro:'A plataforma não mostra apenas conteúdo; ela tenta fazer você lembrar.',
   paragraphs:[
    'Pesquisas sobre efeito de teste mostram que recuperar uma informação da memória pode melhorar retenção de longo prazo em comparação com apenas reler.',
    'Pesquisas sobre prática distribuída mostram que separar os episódios de estudo no tempo tende a melhorar retenção em comparação com concentrar tudo de uma vez.',
    'Por isso, os erros entram em uma fila de revisão e os conceitos reaparecem em diferentes momentos.'
   ],
   keyTakeaway:'Aprender não é reconhecer a resposta quando vê; é conseguir recuperar e aplicar sem ajuda.',visual:'memory'},
  {id:'pf3',title:'Como fazer o simulado',kicker:'ESTRATÉGIA DE PROVA',source:'aprofundamento',
   intro:'Use o simulado como diagnóstico, não como jogo de pontuação.',
   paragraphs:[
    'Leia o enunciado procurando o conceito central. Elimine alternativas que misturam categorias. Antes de clicar, tente explicar mentalmente por que a resposta está correta.',
    'Quando errar, leia a explicação e identifique qual confusão ocorreu. Depois volte na revisão inteligente.',
    'A meta de domínio de 85% ou mais é um bom sinal de preparação, mas o objetivo principal é entender os erros restantes.'
   ],
   keyTakeaway:'O melhor simulado é aquele que revela exatamente o que ainda precisa ser aprendido.',visual:'memory'}
 ],
 questions:[
  q('q34','prova','“Onde queremos chegar?” corresponde mais diretamente a:',['Missão','Visão','Valor','Processo'],1,'Visão descreve futuro desejado.'),
  q('q35','prova','Qual par está corretamente associado?',['Lucratividade → investimento; Rentabilidade → receita','Lucratividade → receita; Rentabilidade → investimento','Payback → valor organizacional','Visão → fornecedor'],1,'Lucratividade olha receita; rentabilidade olha investimento.'),
  q('q36','prova','Qual afirmação é correta?',['Oportunidade é fator interno','Força é fator externo','Oportunidade é externa e força é interna','As duas são sempre financeiras'],2,'Na SWOT, forças são internas; oportunidades são externas.')
 ]
}
]

export const decisions:Decision[]=[
{id:'d1',moduleId:'fundamentos',situation:'Os sócios querem abrir rápido para aproveitar o crescimento de mercado informado no estudo.',question:'Qual primeiro movimento é mais consistente com um plano de negócios?',options:[
 {label:'Assinar o maior ponto imediatamente',rationale:'Transforma uma hipótese em custo fixo antes de validar demanda e operação.',impact:{financas:-10,estrategia:-8},quality:'bad'},
 {label:'Validar demanda, dimensionar operação e testar premissas financeiras',rationale:'Reduz incerteza antes de comprometer capital.',impact:{estrategia:10,financas:7},quality:'best'},
 {label:'Começar apenas pela identidade visual',rationale:'Comunicação é importante, mas não substitui análise de viabilidade.',impact:{marca:3,estrategia:-2},quality:'ok'}]},
{id:'d2',moduleId:'identidade',situation:'A equipe precisa escolher entre ações que aumentam volume e ações que reforçam atendimento personalizado.',question:'Como missão e visão devem entrar na decisão?',options:[
 {label:'Servir de filtro para escolher ações coerentes com a proposta',rationale:'Missão, visão e valores devem orientar escolhas.',impact:{estrategia:10,marca:5},quality:'best'},
 {label:'Ser ignoradas porque são apenas frases institucionais',rationale:'Isso rompe a conexão entre identidade e estratégia.',impact:{estrategia:-8,marca:-5},quality:'bad'},
 {label:'Olhar somente faturamento bruto',rationale:'Receita isolada não mede coerência nem qualidade.',impact:{financas:1,estrategia:-4},quality:'ok'}]},
{id:'d3',moduleId:'clientes',situation:'O orçamento de lançamento é limitado e não dá para falar com todos da mesma forma.',question:'Qual público deve receber prioridade?',options:[
 {label:'Toda a cidade com mensagem genérica',rationale:'Dilui orçamento e reduz relevância.',impact:{cliente:-6,financas:-4},quality:'bad'},
 {label:'Tutores mais aderentes a saúde, conveniência e cuidado especializado',rationale:'Concentra recursos em necessidades alinhadas ao caso.',impact:{cliente:10,marca:6,financas:4},quality:'best'},
 {label:'Somente consumidores que buscam menor preço',rationale:'Pode conflitar com a proposta de qualidade e diferenciação.',impact:{cliente:-2,marca:-4},quality:'ok'}]},
{id:'d4',moduleId:'mercado',situation:'Um fornecedor importante informa que haverá aumento de preço e prazo maior de entrega.',question:'Qual resposta é mais sólida?',options:[
 {label:'Esperar até faltar produto',rationale:'Aumenta risco de ruptura.',impact:{financas:-8,operacao:-8},quality:'bad'},
 {label:'Simular impacto, negociar e desenvolver alternativas compatíveis',rationale:'Protege custo, continuidade e proposta de valor.',impact:{financas:7,operacao:8,estrategia:5},quality:'best'},
 {label:'Trocar imediatamente por qualquer opção barata',rationale:'Pode comprometer qualidade e posicionamento.',impact:{financas:2,marca:-6},quality:'ok'}]},
{id:'d5',moduleId:'porter',situation:'Surge um aplicativo de cuidadores independentes na cidade.',question:'Como interpretar essa mudança?',options:[
 {label:'Ignorar porque não é um pet shop tradicional',rationale:'Substitutos podem competir pela mesma necessidade.',impact:{estrategia:-9,cliente:-5},quality:'bad'},
 {label:'Analisar como substituto e reforçar confiança, integração e conveniência',rationale:'Responde à pressão competitiva de forma estratégica.',impact:{estrategia:9,marca:6},quality:'best'},
 {label:'Reduzir todos os preços imediatamente',rationale:'Preço sem diagnóstico pode destruir margem.',impact:{financas:-7,cliente:2},quality:'ok'}]},
{id:'d6',moduleId:'valor',situation:'A equipe quer lançar dez novos serviços de uma vez para parecer “completa”.',question:'Qual decisão protege melhor o valor?',options:[
 {label:'Lançar tudo imediatamente',rationale:'Aumenta complexidade e custo antes de validar demanda.',impact:{operacao:-10,financas:-7},quality:'bad'},
 {label:'Priorizar serviços valorizados, operáveis e economicamente sustentáveis',rationale:'Equilibra utilidade, custo e capacidade.',impact:{estrategia:8,cliente:9,financas:6,operacao:5},quality:'best'},
 {label:'Copiar exatamente o mix do concorrente',rationale:'Reduz diferenciação e não considera necessidades específicas.',impact:{marca:-5},quality:'ok'}]},
{id:'d7',moduleId:'marketing',situation:'O PET FELIZ precisa comunicar sua proposta no lançamento.',question:'Qual mensagem é mais coerente com o caso?',options:[
 {label:'Tudo barato, sempre',rationale:'Conflita com qualidade, cuidado e diferenciação.',impact:{marca:-8,financas:-5},quality:'bad'},
 {label:'Cuidado completo, saudável e confiável para o seu pet',rationale:'Conecta necessidades, diferenciais e valores.',impact:{marca:10,cliente:8},quality:'best'},
 {label:'Temos muitos produtos',rationale:'É descrição de variedade, não posicionamento claro.',impact:{marca:1},quality:'ok'}]},
{id:'d8',moduleId:'operacao',situation:'Uma promoção lotou a creche acima da capacidade segura.',question:'O que fazer?',options:[
 {label:'Aceitar todos para aproveitar o faturamento',rationale:'Aumenta risco de falha, incidente e dano à marca.',impact:{operacao:-12,marca:-9,cliente:-9,financas:3},quality:'bad'},
 {label:'Limitar vagas e ampliar capacidade de forma planejada',rationale:'Protege padrão e permite crescimento sustentável.',impact:{operacao:10,marca:6,cliente:5},quality:'best'},
 {label:'Cancelar a creche definitivamente',rationale:'Elimina uma oportunidade sem resolver o problema de capacidade.',impact:{cliente:-5,financas:-4},quality:'ok'}]},
{id:'d9',moduleId:'financas',situation:'As vendas aumentaram, mas o caixa está apertado.',question:'Qual análise vem primeiro?',options:[
 {label:'Dar mais desconto para vender ainda mais',rationale:'Pode piorar margem e necessidade de caixa.',impact:{financas:-10},quality:'bad'},
 {label:'Revisar fluxo de caixa, margem, capital de giro, prazos e custos',rationale:'Receita não é igual a liquidez.',impact:{financas:10,estrategia:5},quality:'best'},
 {label:'Olhar somente quantidade de clientes',rationale:'Volume não explica sozinho a falta de caixa.',impact:{financas:-3},quality:'ok'}]},
{id:'d10',moduleId:'riscos',situation:'Existe chance de um concorrente maior entrar na cidade.',question:'Qual atitude é mais profissional?',options:[
 {label:'Ignorar até que aconteça',rationale:'Reduz tempo de resposta.',impact:{estrategia:-8,marca:-4},quality:'bad'},
 {label:'Simular impacto, reforçar diferenciação e criar sinais de monitoramento',rationale:'Combina cenário, prevenção e resposta.',impact:{estrategia:9,marca:6},quality:'best'},
 {label:'Baixar preços preventivamente sem cálculo',rationale:'Pode corroer margem sem necessidade.',impact:{financas:-7},quality:'ok'}]},
{id:'d11',moduleId:'integracao',situation:'Sugerem cortar higiene e treinamento para aumentar margem rapidamente.',question:'Qual decisão é coerente com o plano?',options:[
 {label:'Cortar porque margem é o único objetivo',rationale:'Contradiz valores e destrói atributos centrais da proposta.',impact:{marca:-12,cliente:-12,operacao:-9,financas:3},quality:'bad'},
 {label:'Buscar eficiência sem reduzir segurança, higiene e confiança',rationale:'Protege proposta e sustentabilidade econômica.',impact:{financas:6,marca:8,operacao:7},quality:'best'},
 {label:'Ignorar qualquer possibilidade de eficiência',rationale:'Protege qualidade, mas deixa de buscar melhoria operacional.',impact:{financas:-3},quality:'ok'}]},
{id:'d12',moduleId:'prova',situation:'Faltam 40 minutos para a prova.',question:'Qual estratégia de estudo oferece melhor diagnóstico?',options:[
 {label:'Reler tudo passivamente',rationale:'Aumenta familiaridade, mas testa pouco a recuperação.',impact:{estrategia:1},quality:'ok'},
 {label:'Responder questões, revisar erros e comparar conceitos confundíveis',rationale:'Revela lacunas e fortalece recuperação.',impact:{estrategia:10},quality:'best'},
 {label:'Estudar somente o último assunto visto',rationale:'Ignora integração e retenção de conteúdos anteriores.',impact:{estrategia:-7},quality:'bad'}]}
]

export const references=[
 {title:'Material-base: SUMARIO DE NEGOCIO — PET FELIZ',note:'Fonte dos dados específicos do caso: sociedade, missão, visão, valores, clientes, concorrentes, fornecedores, mercado e indicadores financeiros.'},
 {title:'Sebrae — Como elaborar um plano de negócio',url:'https://loja.sebrae.com.br/como-elaborar-um-plano-de-negocio-1-371440103447',note:'Estrutura de planejamento, mercado, operações, competitividade e finanças.'},
 {title:'Sebrae — 5 Forças de Porter',url:'https://sebrae.com.br/Sebrae/Portal%20Sebrae/Anexos/ME_5-Forcas-Porter.PDF',note:'Ferramenta de análise do ambiente competitivo.'},
 {title:'Roediger & Karpicke (2006) — Test-Enhanced Learning',url:'https://doi.org/10.1111/j.1467-9280.2006.01693.x',note:'Base para recuperação ativa e efeito de testes na retenção.'},
 {title:'Cepeda et al. (2006) — Distributed Practice',url:'https://doi.org/10.1037/0033-2909.132.3.354',note:'Síntese quantitativa sobre prática distribuída e espaçamento.'}
]
