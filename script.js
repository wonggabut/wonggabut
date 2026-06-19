// ===== NAVBAR SCROLL EFFECT =====
(function() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close nav on link click
  if (navLinks) {
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        navLinks.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
      });
    }
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    var counters = document.querySelectorAll('.stat-number');
    for (var i = 0; i < counters.length; i++) {
      (function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;

        function updateCounter() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        updateCounter();
      })(counters[i]);
    }
  }

  // ===== PARTICLES =====
  function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    var colors = ['#00f5ff', '#ff00e4', '#f5ff00', '#39ff14'];

    for (var i = 0; i < 30; i++) {
      var particle = document.createElement('div');
      particle.classList.add('particle');
      var size = Math.random() * 4 + 2;
      var color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = color;
      particle.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + color;
      particle.style.left = (Math.random() * 100) + '%';
      particle.style.top = (Math.random() * 100) + '%';
      particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';

      container.appendChild(particle);
    }
  }

  // ===== CALENDAR =====
  var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  var holidays = {
    2026: {
      '1-1': 'Tahun Baru',
      '1-16': 'Isra Mikraj',
      '2-17': 'Imlek',
      '3-19': 'Nyepi',
      '3-20': 'Idul Fitri',
      '3-21': 'Idul Fitri',
      '5-1': 'Hari Buruh',
      '5-2': 'Hardiknas',
      '5-27': 'Idul Adha',
      '5-31': 'Waisak',
      '6-1': 'Hari Pancasila',
      '8-17': 'HUT RI',
      '8-25': 'Maulid Nabi',
      '12-22': 'Hari Ibu',
      '12-25': 'Natal'
    },
    2027: {
      '1-1': 'Tahun Baru',
      '8-17': 'HUT RI',
      '12-25': 'Natal'
    }
  };

  var currentCalYear = 2026;

  function renderCalendar(year) {
    var grid = document.getElementById('calendarGrid');
    if (!grid) {
      return;
    }
    grid.innerHTML = '';

    var today = new Date();
    var calYearEl = document.getElementById('calYear');
    if (calYearEl) {
      calYearEl.textContent = year;
    }

    for (var month = 0; month < 12; month++) {
      var card = document.createElement('div');
      card.className = 'month-card';

      // Month name header
      var monthHeader = document.createElement('div');
      monthHeader.className = 'month-name';
      monthHeader.textContent = monthNames[month];
      card.appendChild(monthHeader);

      // Day name headers
      var daysHeader = document.createElement('div');
      daysHeader.className = 'month-days-header';
      for (var d = 0; d < dayNames.length; d++) {
        var span = document.createElement('span');
        span.textContent = dayNames[d];
        daysHeader.appendChild(span);
      }
      card.appendChild(daysHeader);

      // Days grid
      var daysGrid = document.createElement('div');
      daysGrid.className = 'month-days';

      var firstDay = new Date(year, month, 1).getDay();
      var daysInMonth = new Date(year, month + 1, 0).getDate();

      // Empty cells for offset
      for (var i = 0; i < firstDay; i++) {
        var empty = document.createElement('div');
        empty.className = 'day-cell';
        empty.textContent = '';
        daysGrid.appendChild(empty);
      }

      // Day cells
      for (var day = 1; day <= daysInMonth; day++) {
        var cell = document.createElement('div');
        cell.className = 'day-cell';
        cell.textContent = day;

        var dateKey = (month + 1) + '-' + day;
        var dayOfWeek = new Date(year, month, day).getDay();

        if (holidays[year] && holidays[year][dateKey]) {
          cell.className += ' holiday';
          cell.title = holidays[year][dateKey];
        }

        if (dayOfWeek === 0) {
          cell.className += ' sunday';
        }

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          cell.className += ' today';
        }

        daysGrid.appendChild(cell);
      }

      card.appendChild(daysGrid);
      grid.appendChild(card);
    }
  }

  // ===== GALLERY FILTER =====
  function initGalleryFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');

    for (var i = 0; i < filterBtns.length; i++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove('active');
          }
          btn.classList.add('active');

          var filter = btn.getAttribute('data-filter');

          for (var k = 0; k < galleryItems.length; k++) {
            if (filter === 'all' || galleryItems[k].getAttribute('data-type') === filter) {
              galleryItems[k].classList.remove('hidden');
            } else {
              galleryItems[k].classList.add('hidden');
            }
          }
        });
      })(filterBtns[i]);
    }
  }

  // ===== LIGHTBOX =====
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightboxContent');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox) return;

    var currentIndex = 0;
    var items = [];

    function openLightbox(index) {
      items = [];
      var allItems = document.querySelectorAll('.gallery-item:not(.hidden)');
      for (var i = 0; i < allItems.length; i++) {
        items.push(allItems[i]);
      }
      currentIndex = index;
      showItem();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function showItem() {
      var item = items[currentIndex];
      if (!item) return;
      lightboxContent.innerHTML = '';

      if (item.classList.contains('video-item')) {
        var video = item.querySelector('video');
        if (video) {
          var newVideo = document.createElement('video');
          newVideo.controls = true;
          newVideo.autoplay = true;
          var source = video.querySelector('source');
          if (source) newVideo.src = source.src;
          lightboxContent.appendChild(newVideo);
        }
      } else {
        var img = item.querySelector('img');
        if (img) {
          var newImg = document.createElement('img');
          newImg.src = img.src;
          newImg.alt = img.alt || '';
          lightboxContent.appendChild(newImg);
        }
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      var video = lightboxContent.querySelector('video');
      if (video) video.pause();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem();
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem();
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % items.length;
        showItem();
      }
    });

    for (var i = 0; i < galleryItems.length; i++) {
      (function(index) {
        galleryItems[index].addEventListener('click', function() {
          openLightbox(index);
        });
      })(i);
    }
  }

  // ===== SCROLL TO TOP =====
  function initScrollTop() {
    var scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== MUSIC TOGGLE =====
  function initMusicToggle() {
    var musicToggle = document.getElementById('musicToggle');
    var musik = document.getElementById('musik');
    var isPlaying = false;

    if (!musicToggle || !musik) return;

    musicToggle.addEventListener('click', function() {
      if (isPlaying) {
        musik.pause();
        musicToggle.classList.remove('playing');
      } else {
        musik.play().catch(function() {});
        musicToggle.classList.add('playing');
      }
      isPlaying = !isPlaying;
    });
  }

  // ===== CALENDAR NAVIGATION =====
  function initCalendarNav() {
    var prevBtn = document.getElementById('prevYear');
    var nextBtn = document.getElementById('nextYear');

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (currentCalYear > 2026) {
          currentCalYear--;
          renderCalendar(currentCalYear);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentCalYear < 2027) {
          currentCalYear++;
          renderCalendar(currentCalYear);
        }
      });
    }
  }

  // ===== SCROLL ANIMATIONS =====
  function handleScrollAnimations() {
    var timelineItems = document.querySelectorAll('.timeline-item.animate');
    for (var i = 0; i < timelineItems.length; i++) {
      var rect = timelineItems[i].getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        timelineItems[i].classList.add('visible');
      }
    }

    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
      var rect = reveals[i].getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        reveals[i].classList.add('visible');
      }
    }
  }

  // ===== INITIALIZE =====
  function init() {
    // Render calendar immediately
    renderCalendar(currentCalYear);
    initCalendarNav();

    // Other initializations
    createParticles();
    animateCounters();
    initGalleryFilter();
    initLightbox();
    initScrollTop();
    initMusicToggle();

    // Add reveal class to sections for animation
    var revealEls = document.querySelectorAll('.about-card, .section-header, .gallery-cta, .join-content');
    for (var i = 0; i < revealEls.length; i++) {
      revealEls[i].classList.add('reveal');
    }

    // Scroll animations
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
