// JavaScript functionalities for Gera Mais Energia
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Header background on scroll
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shadow-lg', 'bg-[#18040f]/95');
      } else {
        header.classList.remove('shadow-lg', 'bg-[#18040f]/95');
      }
    });
  }

  // Simulator Calculator
  const billRange = document.getElementById('billRange');
  const billValueDisplay = document.getElementById('billValueDisplay');
  const monthlySavings = document.getElementById('monthlySavings');
  const annualSavings = document.getElementById('annualSavings');
  const twentyFiveYears = document.getElementById('twentyFiveYears');
  const simType = document.getElementById('simType');

  function updateSavings() {
    if (!billRange) return;
    const bill = parseFloat(billRange.value);
    
    // Format currency
    const formatBRL = (val) => {
      return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    };

    if (billValueDisplay) {
      billValueDisplay.textContent = formatBRL(bill);
    }

    // 92% to 95% average reduction
    const monthly = bill * 0.93;
    const annual = monthly * 12;
    const total25 = annual * 25 * 1.04; // Considering conservative energy inflation

    if (monthlySavings) monthlySavings.textContent = formatBRL(monthly) + ' /mês';
    if (annualSavings) annualSavings.textContent = formatBRL(annual);
    if (twentyFiveYears) twentyFiveYears.textContent = formatBRL(total25);

    // Update whatsapp link dynamic text
    const simWhatsappBtn = document.getElementById('simWhatsappBtn');
    if (simWhatsappBtn) {
      const typeText = simType ? simType.value : 'meu imóvel';
      const msg = encodeURIComponent(`Olá, Gera Mais Energia! Fiz uma simulação no site com conta média de ${formatBRL(bill)} (${typeText}) e gostaria de receber um estudo técnico gratuito com proposta personalizada.`);
      simWhatsappBtn.href = `https://wa.me/5531985558000?text=${msg}`;
    }
  }

  if (billRange) {
    billRange.addEventListener('input', updateSavings);
    if (simType) simType.addEventListener('change', updateSavings);
    updateSavings();
  }

  // Contact Form Submission (Lead capture)
  const contactForm = document.getElementById('leadContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName')?.value || '';
      const phone = document.getElementById('leadPhone')?.value || '';
      const city = document.getElementById('leadCity')?.value || 'Sete Lagoas';
      const bill = document.getElementById('billRange')?.value || '800';

      const msg = encodeURIComponent(`Olá, Gera Mais Energia! Me chamo ${name}. Meu telefone é ${phone}, sou de ${city} e minha conta de energia média é de cerca de R$ ${bill}. Gostaria de solicitar um orçamento.`);
      window.open(`https://wa.me/5531985558000?text=${msg}`, '_blank');
    });
  }
});
