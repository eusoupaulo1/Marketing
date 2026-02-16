const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const messageTemplate = document.getElementById('messageTemplate');
const campaignTip = document.getElementById('campaignTip');
const newTipBtn = document.getElementById('newTipBtn');
const kpiLeads = document.getElementById('kpiLeads');
const kpiReply = document.getElementById('kpiReply');
const kpiSales = document.getElementById('kpiSales');

const quickTips = [
  'Faça uma oferta relâmpago de 24h para reativar clientes antigos com urgência.',
  'Crie uma sequência de 3 stories: dor, prova social e convite para conversa no WhatsApp.',
  'Ofereça um bônus para quem indicar 2 amigos e acompanhe os resultados com cupom.',
  'Use depoimentos em vídeo e transforme em anúncio com foco em prova e confiança.',
  'Publique antes/depois do seu produto para destacar valor percebido em poucos segundos.'
];

const openingMessages = [
  'Oi! Sou sua IA de marketing 📈\nPosso criar campanhas, ideias de conteúdo e textos de venda para sua empresa.',
  'Me conte seu objetivo (mais leads, mais vendas ou retenção) e seu nicho para eu montar um plano rápido.'
];

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
});

function addMessage(text, sender = 'ai') {
  const node = messageTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(sender === 'user' ? 'message--user' : 'message--ai');
  node.querySelector('p').textContent = text;
  node.querySelector('time').textContent = timeFormatter.format(new Date());
  chatMessages.appendChild(node);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getMarketingReply(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('dia das mães')) {
    return 'Plano Dia das Mães:\n1) Oferta emocional com kits limitados.\n2) Campanha de tráfego por 5 dias com vídeo curto.\n3) Script de atendimento com gatilho de escassez no WhatsApp.';
  }

  if (lowerPrompt.includes('instagram') || lowerPrompt.includes('reels')) {
    return 'Para Instagram/Reels, use a fórmula 3x3:\n• 3 vídeos de dor do cliente\n• 3 provas sociais\n• 3 CTAs diretos para o WhatsApp.\nQuer que eu escreva os roteiros?';
  }

  if (lowerPrompt.includes('vender mais') || lowerPrompt.includes('vendas')) {
    return 'Para aumentar vendas esta semana:\n• Reative leads parados com oferta exclusiva de 48h.\n• Envie 2 follow-ups com prova social.\n• Feche com bônus de ação rápida.';
  }

  if (lowerPrompt.includes('tráfego') || lowerPrompt.includes('anúncio')) {
    return 'Estrutura de anúncio recomendada:\nGancho forte (2s) + Dor real + Solução + Prova + CTA para WhatsApp.\nPosso gerar 5 variações de copy agora.';
  }

  return 'Boa ideia! Para te ajudar melhor, me diga:\n1) seu público-alvo\n2) ticket médio\n3) canal principal (Instagram, WhatsApp, Google)\nAssim eu monto um plano de marketing objetivo.';
}

function bumpKpis() {
  const leads = Number.parseInt(kpiLeads.textContent, 10);
  const sales = Number.parseInt(kpiSales.textContent, 10);
  const reply = Number.parseInt(kpiReply.textContent, 10);

  kpiLeads.textContent = String(leads + Math.floor(Math.random() * 3));
  kpiSales.textContent = String(sales + Math.floor(Math.random() * 2));
  kpiReply.textContent = `${Math.min(reply + Math.floor(Math.random() * 2), 95)}%`;
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();

  if (!text) {
    return;
  }

  addMessage(text, 'user');
  messageInput.value = '';

  setTimeout(() => {
    addMessage(getMarketingReply(text), 'ai');
    bumpKpis();
  }, 520);
});

newTipBtn.addEventListener('click', () => {
  const tip = quickTips[Math.floor(Math.random() * quickTips.length)];
  campaignTip.textContent = `Sugestão: ${tip}`;
  addMessage(`Nova ideia de campanha: ${tip}`, 'ai');
});

openingMessages.forEach((msg, index) => {
  setTimeout(() => addMessage(msg), 220 * (index + 1));
});
