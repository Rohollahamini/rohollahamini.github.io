// انتخاب تمام تب‌ها و محتواها
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// وقتی روی یکی از تب‌ها کلیک می‌کنیم:
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // حذف حالت active از همه تب‌ها
    tabs.forEach(t => t.classList.remove('active'));
    // اضافه کردن حالت active به تب انتخاب‌شده
    tab.classList.add('active');

    // مخفی کردن تمام محتواها
    contents.forEach(c => c.classList.remove('active'));

    // نمایش دادن محتوای مرتبط با تب انتخاب‌شده
    const target = document.getElementById(tab.dataset.tab);
    target.classList.add('active');
    
    // پاک کردن جستجو هنگام تغییر تب
    searchInput.value = '';
    filterCards('');
  });
});

// عملکرد جستجو
searchInput.addEventListener('input', (e) => {
  filterCards(e.target.value);
});

function filterCards(searchTerm) {
  const cards = document.querySelectorAll('.card');
  const searchLower = searchTerm.toLowerCase();
  
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-description').textContent.toLowerCase();
    
    if (title.includes(searchLower) || description.includes(searchLower)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// سیستم تغییر تم
const themes = ['light', 'dark', 'green', 'green-black'];
let currentThemeIndex = 0;

// بارگذاری تم ذخیره شده
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    const themeIndex = themes.indexOf(savedTheme);
    if (themeIndex !== -1) {
      currentThemeIndex = themeIndex;
    }
  }
  applyTheme();
}

// اعمال تم
function applyTheme() {
  const currentTheme = themes[currentThemeIndex];
  body.setAttribute('data-theme', currentTheme);
  
  // تغییر آیکون دکمه
  const icons = ['🌙', '☀️', '🌿', '⚡'];
  themeToggle.textContent = icons[currentThemeIndex];
  
  // ذخیره تم
  localStorage.setItem('theme', currentTheme);
}

// تغییر تم
themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme();
});

// انیمیشن برای کارت‌ها
document.addEventListener('DOMContentLoaded', () => {
  // بارگذاری تم
  loadTheme();
  
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeIn 0.5s ease forwards';
  });
});
