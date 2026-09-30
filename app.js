const initialData = {
  clients:[
    {id:1,name:'Mariana Souza',phone:'61998765432'},
    {id:2,name:'Fernanda Lima',phone:'61992345678'},
    {id:3,name:'Juliana Alves',phone:'61993456789'},
    {id:4,name:'Camila Rocha',phone:'61994567890'}
  ],
  services:[
    {id:1,name:'Corte Feminino',duration:60,price:90},
    {id:2,name:'Escova',duration:45,price:70},
    {id:3,name:'Coloração',duration:120,price:220},
    {id:4,name:'Manicure',duration:50,price:45},
    {id:5,name:'Hidratação',duration:60,price:100}
  ],
  products:[
    {id:1,name:'Shampoo Repair',brand:'Lumière',cost:38,sale:69,stock:3,min:5},
    {id:2,name:'Máscara Nutritiva',brand:'Lumière',cost:45,sale:89,stock:9,min:4},
    {id:3,name:'Óleo Finalizador',brand:'Belle Pro',cost:28,sale:55,stock:2,min:3},
    {id:4,name:'Coloração 6.0',brand:'Color Max',cost:19,sale:42,stock:12,min:6}
  ],
  bills:[
    {id:1,name:'Distribuidora Beleza',due:'2026-09-18',value:680,status:'Pendente'},
    {id:2,name:'Energia elétrica',due:'2026-09-14',value:412,status:'Pendente'},
    {id:3,name:'Internet',due:'2026-09-22',value:129,status:'Pendente'},
    {id:4,name:'Aluguel',due:'2026-09-10',value:1800,status:'Pago'}
  ],
  transactions:[
    {id:1,date:'2026-09-17',type:'Entrada',desc:'Serviços do dia',value:520},
    {id:2,date:'2026-09-16',type:'Entrada',desc:'Serviços do dia',value:680},
    {id:3,date:'2026-09-16',type:'Saída',desc:'Reposição de produtos',value:290},
    {id:4,date:'2026-09-15',type:'Entrada',desc:'Serviços do dia',value:430},
    {id:5,date:'2026-09-15',type:'Saída',desc:'Material descartável',value:85}
  ],
  appointments:[
    {id:1,clientId:1,serviceId:3,date:'2026-09-17',time:'09:00',value:220,status:'Confirmado'},
    {id:2,clientId:2,serviceId:1,date:'2026-09-17',time:'11:30',value:90,status:'Confirmado'},
    {id:3,clientId:3,serviceId:4,date:'2026-09-17',time:'14:00',value:45,status:'Confirmado'},
    {id:4,clientId:4,serviceId:2,date:'2026-09-18',time:'10:00',value:70,status:'Confirmado'}
  ]
};
let state = JSON.parse(localStorage.getItem('bellaData')||'null') || structuredClone(initialData);
let currentPage='dashboard';
const money = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
const save=()=>localStorage.setItem('bellaData',JSON.stringify(state));
const today='2026-09-17';

function app(){
  document.getElementById('app').innerHTML = `
  <div id="loginView" class="login-page">
    <section class="login-hero"><div class="brand brand-login"><img src="logo-jessica-carneiro.png" alt="Espaço Jéssica Carneiro"></div><div class="login-copy"><h1>Seu espaço, organizado em um só lugar.</h1><p>Agenda, clientes, estoque e financeiro em uma experiência elegante e personalizada para o Espaço Jéssica Carneiro.</p></div><div style="z-index:2;color:#806b50">Beauty • Hair • Nails</div></section>
    <section class="login-panel"><div class="card login-card"><h2>Bem-vinda</h2><p>Acesso exclusivo da proprietária do salão.</p><div class="field"><label>E-mail ou usuário</label><input id="loginUser" value="dona@salao.com"></div><div class="field"><label>Senha</label><input id="loginPass" type="password" value="123456"></div><button class="btn btn-primary btn-full" onclick="doLogin()">Entrar no sistema</button><div class="demo-note">Para o protótipo, qualquer usuário e senha preenchidos permitem o acesso.</div></div></section>
  </div>`;
}
function doLogin(){
  const u=document.getElementById('loginUser').value.trim(),p=document.getElementById('loginPass').value.trim(); if(!u||!p)return toast('Preencha usuário e senha.'); renderShell();
}
function renderShell(){
  document.getElementById('app').innerHTML=`<div class="shell"><aside class="sidebar" id="sidebar"><div class="brand sidebar-brand"><img src="logo-jessica-carneiro.png" alt="Espaço Jéssica Carneiro"><span>Gestão do Espaço</span></div><nav class="nav">
  ${[['dashboard','⌂','Visão geral'],['agenda','◷','Agenda'],['clientes','♡','Clientes'],['servicos','✦','Serviços'],['estoque','▣','Estoque'],['financeiro','R$','Financeiro']].map(i=>`<button data-page="${i[0]}" onclick="navigate('${i[0]}')"><span class="icon">${i[1]}</span>${i[2]}</button>`).join('')}
  </nav><div class="sidebar-footer"><div class="owner"><strong>Jéssica Carneiro</strong><br><small>Proprietária • Administradora</small></div></div></aside><main class="main"><header class="topbar"><div style="display:flex;align-items:center;gap:12px"><button class="mobile-menu" onclick="toggleMenu()">☰</button><h2 id="topTitle"></h2></div><div class="topbar-right"><span class="pill">Hoje, 17 set 2026</span><button class="btn btn-secondary" onclick="logout()">Sair</button></div></header><div class="content" id="content"></div></main></div>`;
  navigate(currentPage);
}
function navigate(page){currentPage=page;document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));document.getElementById('sidebar')?.classList.remove('open'); const titles={dashboard:'Visão geral',agenda:'Agenda',clientes:'Clientes',servicos:'Serviços',estoque:'Estoque',financeiro:'Financeiro'};document.getElementById('topTitle').textContent=titles[page]; window['render'+page[0].toUpperCase()+page.slice(1)]();}
function toggleMenu(){document.getElementById('sidebar').classList.toggle('open')}
function logout(){app()}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2400)}
function clientName(id){return state.clients.find(x=>x.id==id)?.name||'-'} function serviceObj(id){return state.services.find(x=>x.id==id)||{name:'-',duration:0,price:0}}
function renderDashboard(){
  const entradas=state.transactions.filter(x=>x.type==='Entrada').reduce((a,b)=>a+b.value,0), saidas=state.transactions.filter(x=>x.type==='Saída').reduce((a,b)=>a+b.value,0), saldo=entradas-saidas, apToday=state.appointments.filter(x=>x.date===today).length, low=state.products.filter(x=>x.stock<=x.min), pend=state.bills.filter(x=>x.status==='Pendente');
  document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Olá! 👋</h1><p>Acompanhe o que está acontecendo no salão hoje.</p></div><button class="btn btn-primary" onclick="navigate('agenda');setTimeout(openAppointmentModal,50)">+ Novo agendamento</button></div>
  <div class="grid stats"><div class="card stat"><div class="label">Saldo do período</div><div class="value">${money(saldo)}</div><div class="trend green">↑ fluxo positivo</div></div><div class="card stat"><div class="label">Entradas</div><div class="value">${money(entradas)}</div><div class="trend green">Receitas registradas</div></div><div class="card stat"><div class="label">Saídas</div><div class="value">${money(saidas)}</div><div class="trend orange">Despesas registradas</div></div><div class="card stat"><div class="label">Atendimentos hoje</div><div class="value">${apToday}</div><div class="trend">Agenda do dia</div></div></div>
  <div class="grid section-grid"><section class="card panel"><div class="panel-head"><h3>Agenda de hoje</h3><button class="btn btn-secondary" onclick="navigate('agenda')">Ver agenda</button></div><div class="table-wrap"><table><thead><tr><th>Horário</th><th>Cliente</th><th>Serviço</th><th>Valor</th><th>Status</th></tr></thead><tbody>${state.appointments.filter(a=>a.date===today).sort((a,b)=>a.time.localeCompare(b.time)).map(a=>`<tr><td><strong>${a.time}</strong></td><td>${clientName(a.clientId)}</td><td>${serviceObj(a.serviceId).name}</td><td>${money(a.value)}</td><td><span class="status paid">${a.status}</span></td></tr>`).join('')||'<tr><td colspan="5">Nenhum atendimento hoje.</td></tr>'}</tbody></table></div></section>
  <section class="card panel"><div class="panel-head"><h3>Alertas</h3></div><div class="alert-list">${pend.slice(0,3).map(b=>`<div class="alert"><strong class="${b.due<today?'red':'orange'}">${b.due<today?'Boleto vencido':'Boleto próximo'}</strong><span>${b.name} • ${money(b.value)} • ${fmtDate(b.due)}</span></div>`).join('')}${low.map(p=>`<div class="alert"><strong class="red">Estoque baixo</strong><span>${p.name}: ${p.stock} unidade(s)</span></div>`).join('')}</div></section></div>`;
}
function renderAgenda(){
  const days=['2026-09-15','2026-09-16','2026-09-17','2026-09-18','2026-09-19','2026-09-20'], times=['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Agenda</h1><p>Visualize horários e evite conflitos automaticamente.</p></div><div class="toolbar"><button class="btn btn-primary" onclick="openAppointmentModal()">+ Agendar cliente</button></div></div><div class="card panel" style="overflow:auto"><div class="calendar"><div class="cal-cell cal-head"></div>${days.map(d=>`<div class="cal-cell cal-head">${new Date(d+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit'})}</div>`).join('')}${times.map(t=>`<div class="cal-cell cal-time">${t}</div>${days.map(d=>{const aps=state.appointments.filter(a=>a.date===d&&a.time===t);return `<div class="cal-cell">${aps.map(a=>`<div class="appointment" onclick="showAppointment(${a.id})"><strong>${clientName(a.clientId)}</strong><small>${serviceObj(a.serviceId).name}</small></div>`).join('')}</div>`}).join('')}`).join('')}</div></div>`;
}
function openAppointmentModal(){
  modal(`<div class="modal-head"><h3>Novo agendamento</h3><button class="x" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Cliente</label><select id="apClient">${state.clients.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></div><div class="field"><label>Serviço</label><select id="apService" onchange="syncPrice()">${state.services.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div><div class="field"><label>Data</label><input id="apDate" type="date" value="${today}"></div><div class="field"><label>Horário</label><input id="apTime" type="time" value="09:00"></div><div class="field full"><label>Valor</label><input id="apValue" type="number" value="${state.services[0]?.price||0}"></div></div><button class="btn btn-primary btn-full" onclick="saveAppointment()">Confirmar agendamento</button>`)
}
function syncPrice(){const s=serviceObj(+document.getElementById('apService').value);document.getElementById('apValue').value=s.price}
function saveAppointment(){const clientId=+apClient.value,serviceId=+apService.value,date=apDate.value,time=apTime.value,value=+apValue.value,s=serviceObj(serviceId);const start=toMin(time),end=start+s.duration;const conflict=state.appointments.some(a=>{if(a.date!==date)return false;const os=serviceObj(a.serviceId),astart=toMin(a.time),aend=astart+os.duration;return astart<end&&aend>start});if(conflict)return toast('⚠️ Conflito de horário: já existe atendimento nesse período.');state.appointments.push({id:Date.now(),clientId,serviceId,date,time,value,status:'Confirmado'});save();closeModal();renderAgenda();toast('Agendamento criado com sucesso!')}
function showAppointment(id){const a=state.appointments.find(x=>x.id===id),c=state.clients.find(x=>x.id===a.clientId),s=serviceObj(a.serviceId);modal(`<div class="modal-head"><h3>Detalhes do agendamento</h3><button class="x" onclick="closeModal()">×</button></div><p><strong>${c.name}</strong></p><p>${s.name} • ${fmtDate(a.date)} às ${a.time}</p><p>Valor: <strong>${money(a.value)}</strong></p><div style="display:flex;gap:10px;margin-top:20px"><button class="btn btn-success" onclick="sendWhats('${c.phone}','${encodeURIComponent(`Olá, ${c.name}! Confirmando seu agendamento de ${s.name} para ${fmtDate(a.date)} às ${a.time}. Até lá!`)}')">WhatsApp</button><button class="btn btn-danger" onclick="deleteAppointment(${a.id})">Cancelar horário</button></div>`)}
function deleteAppointment(id){state.appointments=state.appointments.filter(x=>x.id!==id);save();closeModal();renderAgenda();toast('Agendamento cancelado.')}
function sendWhats(phone,msg){window.open(`https://wa.me/55${phone}?text=${msg}`,'_blank')}
function toMin(t){const[h,m]=t.split(':').map(Number);return h*60+m}

function renderClientes(){document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Clientes</h1><p>Cadastre e encontre rapidamente suas clientes.</p></div><button class="btn btn-primary" onclick="openClientModal()">+ Nova cliente</button></div><div class="list-cards">${state.clients.map(c=>`<div class="card item-card"><h4>${c.name}</h4><p>WhatsApp: ${formatPhone(c.phone)}</p><div class="item-meta"><span class="status ok">Cliente ativa</span><button class="btn btn-secondary" onclick="sendWhats('${c.phone}','${encodeURIComponent(`Olá, ${c.name}!`) }')">WhatsApp</button></div></div>`).join('')}</div>`}
function openClientModal(){modal(`<div class="modal-head"><h3>Nova cliente</h3><button class="x" onclick="closeModal()">×</button></div><div class="field"><label>Nome completo</label><input id="cName" placeholder="Ex.: Ana Paula"></div><div class="field"><label>WhatsApp</label><input id="cPhone" placeholder="61999999999"></div><button class="btn btn-primary btn-full" onclick="saveClient()">Salvar cliente</button>`)}
function saveClient(){if(!cName.value.trim()||!cPhone.value.trim())return toast('Preencha nome e telefone.');state.clients.push({id:Date.now(),name:cName.value.trim(),phone:cPhone.value.replace(/\D/g,'')});save();closeModal();renderClientes();toast('Cliente cadastrada!')}

function renderServicos(){document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Serviços</h1><p>Valores e duração dos atendimentos.</p></div><button class="btn btn-primary" onclick="openServiceModal()">+ Novo serviço</button></div><div class="list-cards">${state.services.map(s=>`<div class="card item-card"><h4>${s.name}</h4><p>Duração média: ${s.duration} min</p><div class="item-meta"><span class="price">${money(s.price)}</span><span class="status ok">Ativo</span></div></div>`).join('')}</div>`}
function openServiceModal(){modal(`<div class="modal-head"><h3>Novo serviço</h3><button class="x" onclick="closeModal()">×</button></div><div class="field"><label>Nome</label><input id="sName"></div><div class="form-grid"><div class="field"><label>Duração (min)</label><input id="sDuration" type="number" value="60"></div><div class="field"><label>Valor</label><input id="sPrice" type="number" value="80"></div></div><button class="btn btn-primary btn-full" onclick="saveService()">Salvar serviço</button>`)}
function saveService(){state.services.push({id:Date.now(),name:sName.value||'Novo serviço',duration:+sDuration.value,price:+sPrice.value});save();closeModal();renderServicos();toast('Serviço cadastrado!')}

function renderEstoque(){document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Estoque</h1><p>Controle produtos e receba alertas de reposição.</p></div><button class="btn btn-primary" onclick="openProductModal()">+ Novo produto</button></div><div class="card panel"><div class="table-wrap"><table><thead><tr><th>Produto</th><th>Marca</th><th>Custo</th><th>Venda</th><th>Estoque</th><th>Status</th><th>Ação</th></tr></thead><tbody>${state.products.map(p=>`<tr><td><strong>${p.name}</strong></td><td>${p.brand}</td><td>${money(p.cost)}</td><td>${money(p.sale)}</td><td>${p.stock}</td><td><span class="status ${p.stock<=p.min?'low':'ok'}">${p.stock<=p.min?'Estoque baixo':'Normal'}</span></td><td><button class="btn btn-secondary" onclick="moveStock(${p.id})">Movimentar</button></td></tr>`).join('')}</tbody></table></div></div>`}
function openProductModal(){modal(`<div class="modal-head"><h3>Novo produto</h3><button class="x" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field full"><label>Produto</label><input id="pName"></div><div class="field full"><label>Marca</label><input id="pBrand"></div><div class="field"><label>Custo</label><input id="pCost" type="number"></div><div class="field"><label>Venda</label><input id="pSale" type="number"></div><div class="field"><label>Qtd. inicial</label><input id="pStock" type="number" value="0"></div><div class="field"><label>Estoque mínimo</label><input id="pMin" type="number" value="3"></div></div><button class="btn btn-primary btn-full" onclick="saveProduct()">Salvar produto</button>`)}
function saveProduct(){state.products.push({id:Date.now(),name:pName.value||'Produto',brand:pBrand.value||'-',cost:+pCost.value||0,sale:+pSale.value||0,stock:+pStock.value||0,min:+pMin.value||0});save();closeModal();renderEstoque();toast('Produto cadastrado!')}
function moveStock(id){const p=state.products.find(x=>x.id===id);modal(`<div class="modal-head"><h3>Movimentar estoque</h3><button class="x" onclick="closeModal()">×</button></div><p><strong>${p.name}</strong> • Estoque atual: ${p.stock}</p><div class="form-grid"><div class="field"><label>Tipo</label><select id="mType"><option>Entrada</option><option>Saída</option></select></div><div class="field"><label>Quantidade</label><input id="mQty" type="number" value="1"></div></div><button class="btn btn-primary btn-full" onclick="applyMove(${id})">Confirmar</button>`)}
function applyMove(id){const p=state.products.find(x=>x.id===id),q=+mQty.value;if(q<=0)return toast('Informe uma quantidade válida.');if(mType.value==='Saída'&&q>p.stock)return toast('Estoque insuficiente.');p.stock+=mType.value==='Entrada'?q:-q;save();closeModal();renderEstoque();toast('Estoque atualizado!')}

function renderFinanceiro(){const entradas=state.transactions.filter(x=>x.type==='Entrada').reduce((a,b)=>a+b.value,0),saidas=state.transactions.filter(x=>x.type==='Saída').reduce((a,b)=>a+b.value,0);document.getElementById('content').innerHTML=`<div class="page-head"><div><h1>Financeiro</h1><p>Entradas, saídas, boletos e saldo do salão.</p></div><div class="toolbar"><button class="btn btn-secondary" onclick="openBillModal()">+ Boleto</button><button class="btn btn-primary" onclick="openTransactionModal()">+ Lançamento</button></div></div><div class="grid stats"><div class="card stat"><div class="label">Entradas</div><div class="value">${money(entradas)}</div></div><div class="card stat"><div class="label">Saídas</div><div class="value">${money(saidas)}</div></div><div class="card stat"><div class="label">Saldo</div><div class="value">${money(entradas-saidas)}</div></div><div class="card stat"><div class="label">Boletos pendentes</div><div class="value">${state.bills.filter(x=>x.status==='Pendente').length}</div></div></div><div class="grid section-grid"><section class="card panel"><div class="panel-head"><h3>Movimentações</h3></div><div class="table-wrap"><table><thead><tr><th>Data</th><th>Descrição</th><th>Tipo</th><th>Valor</th></tr></thead><tbody>${state.transactions.sort((a,b)=>b.date.localeCompare(a.date)).map(t=>`<tr><td>${fmtDate(t.date)}</td><td>${t.desc}</td><td><span class="status ${t.type==='Entrada'?'paid':'pending'}">${t.type}</span></td><td>${money(t.value)}</td></tr>`).join('')}</tbody></table></div></section><section class="card panel"><div class="panel-head"><h3>Boletos</h3></div><div class="alert-list">${state.bills.map(b=>`<div class="alert"><strong>${b.name}</strong><span>${fmtDate(b.due)} • ${money(b.value)}</span><div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center"><span class="status ${b.status==='Pago'?'paid':b.due<today?'overdue':'pending'}">${b.status==='Pago'?'Pago':b.due<today?'Vencido':'Pendente'}</span>${b.status!=='Pago'?`<button class="btn btn-secondary" onclick="payBill(${b.id})">Marcar pago</button>`:''}</div></div>`).join('')}</div></section></div>`}
function openTransactionModal(){modal(`<div class="modal-head"><h3>Novo lançamento</h3><button class="x" onclick="closeModal()">×</button></div><div class="form-grid"><div class="field"><label>Tipo</label><select id="tType"><option>Entrada</option><option>Saída</option></select></div><div class="field"><label>Data</label><input id="tDate" type="date" value="${today}"></div><div class="field full"><label>Descrição</label><input id="tDesc"></div><div class="field full"><label>Valor</label><input id="tValue" type="number"></div></div><button class="btn btn-primary btn-full" onclick="saveTransaction()">Salvar lançamento</button>`)}
function saveTransaction(){state.transactions.push({id:Date.now(),date:tDate.value,type:tType.value,desc:tDesc.value||'Lançamento',value:+tValue.value||0});save();closeModal();renderFinanceiro();toast('Lançamento salvo!')}
function openBillModal(){modal(`<div class="modal-head"><h3>Novo boleto</h3><button class="x" onclick="closeModal()">×</button></div><div class="field"><label>Fornecedor / conta</label><input id="bName"></div><div class="form-grid"><div class="field"><label>Vencimento</label><input id="bDue" type="date" value="${today}"></div><div class="field"><label>Valor</label><input id="bValue" type="number"></div></div><button class="btn btn-primary btn-full" onclick="saveBill()">Salvar boleto</button>`)}
function saveBill(){state.bills.push({id:Date.now(),name:bName.value||'Conta',due:bDue.value,value:+bValue.value||0,status:'Pendente'});save();closeModal();renderFinanceiro();toast('Boleto cadastrado!')}
function payBill(id){state.bills.find(x=>x.id===id).status='Pago';save();renderFinanceiro();toast('Boleto marcado como pago!')}

function modal(html){const d=document.createElement('div');d.id='modalBackdrop';d.className='modal-backdrop';d.innerHTML=`<div class="card modal">${html}</div>`;d.onclick=e=>{if(e.target===d)closeModal()};document.body.appendChild(d)}
function closeModal(){document.getElementById('modalBackdrop')?.remove()}
function fmtDate(s){return new Date(s+'T12:00:00').toLocaleDateString('pt-BR')}
function formatPhone(p){const x=p.replace(/\D/g,'');return x.length>=11?`(${x.slice(0,2)}) ${x.slice(2,7)}-${x.slice(7,11)}`:p}
app();
