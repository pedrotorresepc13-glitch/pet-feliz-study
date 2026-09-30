export type Question={id:string;moduleId:string;prompt:string;options:string[];answer:number;explanation:string}
export type Lesson={title:string;text:string;bullets?:string[]}
export type Module={id:string;order:number;title:string;subtitle:string;masteryTarget:number;lessons:Lesson[];questions:Question[]}
export type Decision={id:string;moduleId:string;situation:string;question:string;options:{label:string;rationale:string;impact:Partial<Record<'estrategia'|'cliente'|'marca'|'operacao'|'financas',number>>;quality:'best'|'ok'|'bad'}[]}

export const modules:Module[]=[
{id:'fundamentos',order:1,title:'Fundamentos do Plano de Negócios',subtitle:'Por que planejar antes de executar.',masteryTarget:75,lessons:[
{title:'Plano como sistema de decisão',text:'O plano de negócios organiza proposta, mercado, operação, estratégia e finanças. Ele não elimina risco: torna hipóteses visíveis para serem testadas antes de decisões caras.',bullets:['Descreve objetivos e modelo do negócio','Analisa clientes, concorrentes e fornecedores','Projeta recursos, custos, receitas e viabilidade','Permite comparar cenários e antecipar riscos']},
{title:'O caso PET FELIZ',text:'O material-base apresenta um empreendimento em Feliz/RS, sociedade limitada com Flávio e Ana em partes iguais. Ana administra. A empresa combina produtos com serviços de cuidado e conveniência.'}
],questions:[
{id:'q1',moduleId:'fundamentos',prompt:'Qual é a principal função de um plano de negócios?',options:['Garantir lucro','Eliminar concorrentes','Organizar hipóteses e avaliar viabilidade','Substituir a gestão'],answer:2,explanation:'O plano reduz incertezas ao organizar mercado, estratégia, operação e finanças; não garante resultado.'},
{id:'q2',moduleId:'fundamentos',prompt:'No caso PET FELIZ, qual estrutura societária aparece no material?',options:['Franquia','Sociedade limitada com dois sócios de 50%','Sociedade anônima','MEI individual'],answer:1,explanation:'Flávio e Ana possuem 50% cada; Ana é a administradora.'}
]},
{id:'identidade',order:2,title:'Missão, Visão, Valores e Objetivos',subtitle:'Transforme identidade em direção estratégica.',masteryTarget:75,lessons:[
{title:'Missão, visão e valores',text:'Missão explica por que a empresa existe hoje; visão descreve o futuro desejado; valores orientam comportamentos. No PET FELIZ, qualidade, cuidado, higiene, ética, segurança e profissionalismo aparecem como princípios centrais.'},
{title:'Identidade precisa orientar escolha',text:'Esses elementos só têm valor gerencial quando funcionam como filtro para prioridades, investimentos e comportamento da equipe.'}
],questions:[
{id:'q3',moduleId:'identidade',prompt:'“Ser reconhecido como empresa completa em cuidados com pets” é:',options:['Missão','Visão','Valor','Indicador'],answer:1,explanation:'É uma declaração de futuro desejado, portanto visão.'},
{id:'q4',moduleId:'identidade',prompt:'Qual alternativa representa um valor organizacional?',options:['Abrir nova loja','Ética profissional','Atingir margem de 15%','Vender ração natural'],answer:1,explanation:'Ética é princípio de comportamento; as demais são meta ou oferta.'}
]},
{id:'clientes',order:3,title:'Clientes, Segmentação e Persona',subtitle:'Saiba para quem o PET FELIZ cria valor.',masteryTarget:75,lessons:[
{title:'Público-alvo',text:'O caso foca tutores de cães e gatos preocupados com saúde, bem-estar e conveniência. O material informa gasto médio mensal de R$ 190 e interesse em alimentação saudável, hospedagem, creche, pet sitter, dog walker e adestramento.'},
{title:'Segmentação e persona',text:'Segmentar é agrupar clientes por necessidades e comportamentos relevantes. Persona é uma representação operacional de um segmento e deve ajudar a decidir oferta, canal, mensagem e experiência.'}
],questions:[
{id:'q5',moduleId:'clientes',prompt:'Quem é o público central descrito no caso?',options:['Somente criadores','Tutores de cães e gatos atentos a saúde e bem-estar','Somente clínicas','Apenas donos de cães grandes'],answer:1,explanation:'O caso enfatiza tutores de cães e gatos com preocupação ampliada com saúde e conveniência.'},
{id:'q6',moduleId:'clientes',prompt:'Segmentar mercado significa:',options:['Vender igual para todos','Agrupar clientes por características e necessidades relevantes','Criar descontos','Inventar um personagem'],answer:1,explanation:'Segmentação organiza grupos com necessidades semelhantes para decisões mais precisas.'}
]},
{id:'mercado',order:4,title:'Mercado, Concorrência e Cinco Forças',subtitle:'Entenda a estrutura competitiva completa.',masteryTarget:80,lessons:[
{title:'Mercado do caso',text:'O documento apresenta crescimento anual local de 30% a 35% e demanda por soluções diferenciadas. Em um plano real, esse dado deve ser tratado como premissa a validar, não como garantia de sucesso.'},
{title:'Cinco Forças de Porter',text:'A análise considera rivalidade, poder dos fornecedores, poder dos compradores, ameaça de novos entrantes e ameaça de substitutos.',bullets:['Concorrência direta é apenas uma parte','Substitutos resolvem a mesma necessidade de outra forma','Fornecedores e compradores também afetam atratividade']}
],questions:[
{id:'q7',moduleId:'mercado',prompt:'Qual item NÃO pertence às cinco forças originais de Porter?',options:['Fornecedores','Novos entrantes','Substitutos','Clima organizacional'],answer:3,explanation:'Clima é tema interno de gestão, não força competitiva do modelo.'},
{id:'q8',moduleId:'mercado',prompt:'Crescimento de mercado de 30% a 35% significa que o negócio é automaticamente viável?',options:['Sim','Não'],answer:1,explanation:'Crescimento ajuda a caracterizar oportunidade, mas viabilidade também depende de execução, preço, custos e demanda capturável.'}
]},
{id:'valor',order:5,title:'Proposta de Valor e Diferenciação',subtitle:'Faça o cliente perceber por que escolher o PET FELIZ.',masteryTarget:80,lessons:[
{title:'Valor não é só preço',text:'Valor combina utilidade, confiança, conveniência, experiência e preço. Para a empresa, a oferta precisa manter relação sustentável entre preço, custo e capacidade.'},
{title:'Diferenciais do caso',text:'Alimentação saudável, hospedagem, creche, adestramento, pet sitter e dog walker ampliam a proposta. Diferenciação só cria valor quando é desejada pelo cliente e economicamente sustentável.'}
],questions:[
{id:'q9',moduleId:'valor',prompt:'Proposta de valor é melhor definida como:',options:['Lista de produtos','Razão clara para o cliente preferir a oferta','Desconto permanente','Nome da empresa'],answer:1,explanation:'Ela conecta necessidade do cliente, benefício e diferença relevante.'},
{id:'q10',moduleId:'valor',prompt:'Adicionar muitos serviços sem demanda comprovada pode:',options:['Sempre aumentar valor','Elevar complexidade e custos sem aumentar valor percebido','Garantir rentabilidade','Eliminar concorrência'],answer:1,explanation:'Amplitude sem aderência e capacidade pode destruir valor em vez de criar.'}
]},
{id:'marketing',order:6,title:'Marketing, Posicionamento e Jornada',subtitle:'Converta estratégia em aquisição e fidelização.',masteryTarget:80,lessons:[
{title:'Posicionamento',text:'É como a empresa deseja ser percebida em relação às alternativas. Para o PET FELIZ, “cuidado completo, saudável e confiável” é coerente com o caso.'},
{title:'4 Ps e jornada',text:'Produto, preço, praça e promoção organizam a execução. A jornada percorre descoberta, consideração, compra, uso, pós-venda e recompra.'}
],questions:[
{id:'q11',moduleId:'marketing',prompt:'Qual ação pertence principalmente a Praça nos 4 Ps?',options:['Definir margem','Escolher canais e localização','Criar slogan','Treinar equipe'],answer:1,explanation:'Praça trata de acesso, distribuição e canais.'},
{id:'q12',moduleId:'marketing',prompt:'Posicionamento é:',options:['Local físico','Percepção desejada da marca frente às alternativas','Apenas identidade visual','Sinônimo de preço'],answer:1,explanation:'Posicionamento é relativo e existe na mente do público.'}
]},
{id:'operacao',order:7,title:'Operações, Qualidade e Capacidade',subtitle:'Faça a promessa caber na operação.',masteryTarget:80,lessons:[
{title:'Processo e capacidade',text:'Cada serviço precisa de processo, padrão, responsável, insumos, capacidade e resposta a incidentes. Vender acima da capacidade pode deteriorar segurança e experiência.'},
{title:'Valores viram controles',text:'Higiene, segurança e profissionalismo só são gerenciáveis quando traduzidos em checklists, treinamento, responsáveis e indicadores.'}
],questions:[
{id:'q13',moduleId:'operacao',prompt:'Qual risco surge ao dobrar a demanda sem ampliar capacidade?',options:['Nenhum','Queda de qualidade e insatisfação','Margem automática maior','Menos necessidade de processo'],answer:1,explanation:'Demanda acima da capacidade aumenta atraso, falha e dano à marca.'},
{id:'q14',moduleId:'operacao',prompt:'Um valor como higiene vira gestão quando:',options:['Fica no site','É traduzido em padrões e indicadores','É citado anualmente','Substitui treinamento'],answer:1,explanation:'Princípios precisam virar comportamentos e controles observáveis.'}
]},
{id:'pessoas',order:8,title:'Pessoas, Papéis e Governança',subtitle:'Estruture responsabilidades para crescer.',masteryTarget:75,lessons:[
{title:'Governança do caso',text:'Ana administra e ambos os sócios participam das deliberações importantes. É essencial separar decisões operacionais, estratégicas e financeiras.'},
{title:'Papéis e competências',text:'Atendimento, manejo seguro, higiene, vendas e finanças exigem competências diferentes. Cada função precisa ter objetivo, responsabilidade, autoridade e indicadores.'}
],questions:[
{id:'q15',moduleId:'pessoas',prompt:'Quem é indicada como administradora no material-base?',options:['Flávio','Ana','Fornecedor principal','Gerente externo'],answer:1,explanation:'Ana da Silva é a administradora indicada.'},
{id:'q16',moduleId:'pessoas',prompt:'Qual prática reduz conflito e gargalo?',options:['Decisões implícitas','Papéis, alçadas e responsáveis definidos','Sem indicadores','Centralização total'],answer:1,explanation:'Clareza de papéis e autoridade melhora coordenação e responsabilização.'}
]},
{id:'financas',order:9,title:'Finanças e Viabilidade',subtitle:'Domine investimento, lucratividade, rentabilidade e retorno.',masteryTarget:85,lessons:[
{title:'Números do caso',text:'O investimento informado é R$ 194.750,00, 100% com recursos próprios. Lucratividade: 9,51%. Rentabilidade: 70,99% ao ano. Retorno indicado: 1,4 anos.'},
{title:'Indicadores diferentes',text:'Lucratividade relaciona resultado à receita. Rentabilidade relaciona retorno ao capital investido. Payback mede tempo de recuperação. Uma análise completa também considera fluxo de caixa, capital de giro, ponto de equilíbrio e cenários.'}
],questions:[
{id:'q17',moduleId:'financas',prompt:'Qual é o investimento total do caso?',options:['R$ 19.475','R$ 194.750','R$ 1.947.500','R$ 190.000'],answer:1,explanation:'O material informa R$ 194.750,00.'},
{id:'q18',moduleId:'financas',prompt:'Lucratividade e rentabilidade diferem porque:',options:['São sinônimos','Lucratividade olha receita; rentabilidade olha investimento','Rentabilidade mede vendas','Lucratividade mede patrimônio'],answer:1,explanation:'Elas respondem a perguntas financeiras diferentes.'}
]},
{id:'riscos',order:10,title:'SWOT, Riscos e Cenários',subtitle:'Prepare decisões quando as premissas mudarem.',masteryTarget:80,lessons:[
{title:'SWOT/FOFA',text:'Forças e fraquezas são internas; oportunidades e ameaças são externas. A matriz é útil quando gera ação, não apenas listas.'},
{title:'Cenários e riscos',text:'Teste cenário base, favorável e adverso. Para riscos relevantes, defina probabilidade, impacto, prevenção, gatilho e resposta.'}
],questions:[
{id:'q19',moduleId:'riscos',prompt:'Equipe bem treinada é, normalmente, na SWOT:',options:['Força','Ameaça','Oportunidade','Substituto'],answer:0,explanation:'É um fator interno positivo.'},
{id:'q20',moduleId:'riscos',prompt:'Novo concorrente com grande capital entrando na cidade é:',options:['Força','Fraqueza','Ameaça','Valor'],answer:2,explanation:'É condição externa potencialmente negativa.'}
]},
{id:'integracao',order:11,title:'Integração Estratégica',subtitle:'Conecte mercado, valor, operação e finanças.',masteryTarget:85,lessons:[
{title:'Coerência',text:'Estratégia forte conecta cliente, necessidade, proposta de valor, oferta, processo, recursos, custos, receita e indicadores. Se um elo não fecha, o plano precisa ser revisto.'},
{title:'Trade-offs',text:'Escolher também significa renunciar. Prometer serviço premium e cortar higiene ou treinamento para competir só por preço é incoerente com a proposta.'}
],questions:[
{id:'q21',moduleId:'integracao',prompt:'Qual cadeia representa melhor a lógica integrada?',options:['Logo → slogan → seguidores','Cliente → valor → operação → economia','Preço → desconto → volume','Missão → fachada → estoque'],answer:1,explanation:'A estratégia conecta cliente, entrega e sustentabilidade econômica.'},
{id:'q22',moduleId:'integracao',prompt:'Quando o mercado muda significativamente, o plano deve:',options:['Permanecer igual','Ser revisado com novas premissas','Ser descartado sem análise','Alterar só o logo'],answer:1,explanation:'Plano de negócios é instrumento vivo de decisão.'}
]},
{id:'prova',order:12,title:'Preparação para Prova',subtitle:'Treine distinções, recuperação e aplicação.',masteryTarget:90,lessons:[
{title:'Conceitos confundíveis',text:'Missão x visão; lucratividade x rentabilidade; força x oportunidade; concorrente x substituto; proposta de valor x lista de produtos; crescimento de mercado x viabilidade.'},
{title:'Recuperação ativa',text:'Tentar lembrar antes de reler melhora o diagnóstico de domínio. Por isso erros e conceitos antigos reaparecem ao longo da plataforma.'}
],questions:[
{id:'q23',moduleId:'prova',prompt:'“Onde queremos chegar?” corresponde mais diretamente a:',options:['Missão','Visão','Valor','Processo'],answer:1,explanation:'Visão descreve futuro desejado.'},
{id:'q24',moduleId:'prova',prompt:'Uma oportunidade na SWOT é:',options:['Fator interno positivo','Fator externo favorável','Fator interno negativo','Meta financeira'],answer:1,explanation:'Oportunidades são condições externas favoráveis.'}
]}
]

export const decisions:Decision[]=[
{id:'d1',moduleId:'fundamentos',situation:'Os sócios querem abrir rápido para aproveitar o mercado.',question:'Qual primeiro movimento é mais sólido?',options:[{label:'Alugar o maior ponto antes de validar',rationale:'Transforma hipótese em custo fixo cedo.',impact:{financas:-10,estrategia:-8},quality:'bad'},{label:'Validar demanda e dimensionar recursos',rationale:'Reduz incerteza antes de comprometer capital.',impact:{estrategia:10,financas:6},quality:'best'},{label:'Começar apenas pelo logo',rationale:'Comunicação sem viabilidade é insuficiente.',impact:{marca:2,estrategia:-2},quality:'ok'}]},
{id:'d2',moduleId:'identidade',situation:'A equipe precisa escolher um caminho de expansão.',question:'Como usar missão e visão?',options:[{label:'Usá-las como filtro para propósito, público e futuro',rationale:'Identidade orienta escolhas.',impact:{estrategia:10,marca:5},quality:'best'},{label:'Ignorar porque são frases institucionais',rationale:'Perde coerência.',impact:{estrategia:-8,marca:-4},quality:'bad'},{label:'Olhar somente faturamento bruto',rationale:'Receita isolada não mede coerência.',impact:{financas:1,estrategia:-4},quality:'ok'}]},
{id:'d3',moduleId:'clientes',situation:'O orçamento de lançamento é limitado.',question:'Quem priorizar?',options:[{label:'Toda a cidade com a mesma mensagem',rationale:'Dilui orçamento.',impact:{cliente:-6,financas:-4},quality:'bad'},{label:'Segmentos aderentes a saúde, conveniência e cuidado',rationale:'Concentra recursos em necessidades compatíveis.',impact:{cliente:10,marca:6,financas:4},quality:'best'},{label:'Apenas caçadores de menor preço',rationale:'Pode conflitar com a proposta.',impact:{cliente:-2,marca:-2},quality:'ok'}]},
{id:'d4',moduleId:'mercado',situation:'Surge um app de cuidadores independentes.',question:'Como reagir?',options:[{label:'Ignorar porque não é pet shop',rationale:'Substitutos competem pela mesma necessidade.',impact:{estrategia:-9,cliente:-4},quality:'bad'},{label:'Analisar como substituto e reforçar confiança e conveniência',rationale:'Resposta competitiva coerente.',impact:{estrategia:9,marca:5},quality:'best'},{label:'Baixar todos os preços',rationale:'Pode destruir margem sem diagnóstico.',impact:{financas:-7,cliente:2},quality:'ok'}]},
{id:'d5',moduleId:'valor',situation:'A equipe quer lançar dez serviços juntos.',question:'Qual decisão é mais sólida?',options:[{label:'Lançar tudo',rationale:'Complexidade sem validação.',impact:{operacao:-10,financas:-6},quality:'bad'},{label:'Priorizar serviços desejados e sustentáveis',rationale:'Equilibra utilidade, custo e capacidade.',impact:{estrategia:8,cliente:8,financas:6,operacao:4},quality:'best'},{label:'Copiar o concorrente',rationale:'Reduz diferenciação.',impact:{marca:-5},quality:'ok'}]},
{id:'d6',moduleId:'marketing',situation:'O PET FELIZ precisa de posicionamento.',question:'Qual mensagem é mais coerente?',options:[{label:'Tudo barato, sempre',rationale:'Conflita com qualidade e cuidado.',impact:{marca:-7,financas:-5},quality:'bad'},{label:'Cuidado completo, saudável e confiável',rationale:'Conecta público e diferenciação.',impact:{marca:10,cliente:8},quality:'best'},{label:'Temos muitos produtos',rationale:'É descrição, não posicionamento.',impact:{marca:1},quality:'ok'}]},
{id:'d7',moduleId:'operacao',situation:'Uma promoção lotou a creche acima da capacidade.',question:'O que fazer?',options:[{label:'Aceitar todos',rationale:'Arrisca segurança e experiência.',impact:{operacao:-12,marca:-8,cliente:-8},quality:'bad'},{label:'Limitar vagas e ampliar capacidade com controle',rationale:'Protege padrão e crescimento.',impact:{operacao:10,marca:5,cliente:4},quality:'best'},{label:'Cancelar o serviço',rationale:'Elimina oportunidade sem gerenciar capacidade.',impact:{cliente:-4,financas:-3},quality:'ok'}]},
{id:'d8',moduleId:'pessoas',situation:'Ana virou gargalo de decisões.',question:'Qual evolução é melhor?',options:[{label:'Manter tudo centralizado',rationale:'Aumenta dependência.',impact:{operacao:-8,estrategia:-3},quality:'bad'},{label:'Definir papéis, alçadas e indicadores',rationale:'Permite delegação com controle.',impact:{operacao:9,estrategia:6},quality:'best'},{label:'Delegar sem critérios',rationale:'Troca gargalo por inconsistência.',impact:{operacao:-2},quality:'ok'}]},
{id:'d9',moduleId:'financas',situation:'Vendas cresceram, mas o caixa apertou.',question:'Qual análise vem primeiro?',options:[{label:'Dar mais desconto',rationale:'Pode piorar margem e caixa.',impact:{financas:-10},quality:'bad'},{label:'Revisar fluxo de caixa, margem, capital de giro e prazos',rationale:'Receita não garante liquidez.',impact:{financas:10,estrategia:4},quality:'best'},{label:'Olhar apenas clientes',rationale:'Volume não explica caixa.',impact:{financas:-3},quality:'ok'}]},
{id:'d10',moduleId:'riscos',situation:'Fornecedor-chave pode subir preço em 20%.',question:'Como preparar o negócio?',options:[{label:'Esperar acontecer',rationale:'Reação tardia reduz opções.',impact:{financas:-8,estrategia:-5},quality:'bad'},{label:'Simular impacto, negociar, buscar alternativas e gatilhos',rationale:'Combina cenário, prevenção e resposta.',impact:{financas:8,estrategia:8},quality:'best'},{label:'Trocar sem avaliar qualidade',rationale:'Pode destruir valor.',impact:{financas:2,marca:-5},quality:'ok'}]},
{id:'d11',moduleId:'integracao',situation:'Sugerem cortar higiene e treinamento para ganhar margem.',question:'Qual decisão é coerente?',options:[{label:'Cortar, margem é tudo',rationale:'Destrói atributos centrais.',impact:{marca:-12,cliente:-12,operacao:-8,financas:3},quality:'bad'},{label:'Buscar eficiência sem cortar segurança e confiança',rationale:'Protege proposta e sustentabilidade.',impact:{financas:6,marca:8,operacao:6},quality:'best'},{label:'Ignorar toda eficiência',rationale:'Evita otimização necessária.',impact:{financas:-3},quality:'ok'}]},
{id:'d12',moduleId:'prova',situation:'Faltam 40 minutos para a prova.',question:'Qual estratégia maximiza diagnóstico?',options:[{label:'Reler tudo passivamente',rationale:'Gera familiaridade, pouco diagnóstico.',impact:{estrategia:1},quality:'ok'},{label:'Recuperar, revisar erros e testar conceitos confundíveis',rationale:'Revela lacunas e fortalece lembrança.',impact:{estrategia:10},quality:'best'},{label:'Estudar só o último módulo',rationale:'Ignora integração e retenção.',impact:{estrategia:-7},quality:'bad'}]}
]

export const references=[
{title:'Material-base: SUMARIO DE NEGOCIO — PET FELIZ',note:'Fonte principal dos dados específicos do caso.'},
{title:'Sebrae — Como elaborar o plano de negócios',url:'https://sebrae.com.br/sites/PortalSebrae/artigos/passo-a-passo-para-elaborar-o-plano-de-negocios-de-sua-empresa%2Cd7296a2bd9ded410VgnVCM1000003b74010aRCRD',note:'Estrutura de planejamento e viabilidade.'},
{title:'Sebrae — 5 Forças de Porter',url:'https://sebrae.com.br/Sebrae/Portal%20Sebrae/Anexos/ME_5-Forcas-Porter.PDF',note:'Análise competitiva.'},
{title:'Roediger & Karpicke (2006)',url:'https://doi.org/10.1111/j.1467-9280.2006.01693.x',note:'Recuperação ativa e efeito de testes.'},
{title:'Cepeda et al. (2006)',url:'https://doi.org/10.1037/0033-2909.132.3.354',note:'Prática distribuída e espaçamento.'},
{title:'Firth et al. (2021)',url:'https://doi.org/10.1002/rev3.3266',note:'Interleaving para discriminar conceitos.'}
]
