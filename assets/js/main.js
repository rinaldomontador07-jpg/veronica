/**
 * VV Braids Studio - Interactive Features & Logic
 * Trancista Verônica | www.vvbraidsstudio.com.br
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });

    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  // 2. Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 3. Service Category Tabs Filter
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (serviceTabs.length > 0 && serviceCards.length > 0) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        serviceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        serviceCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Portfolio Filter Tabs (Photos / Videos / Category)
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (portfolioFilterBtns.length > 0 && portfolioItems.length > 0) {
    portfolioFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        portfolioFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const type = item.getAttribute('data-type'); // 'image' or 'video'
          const cat = item.getAttribute('data-cat');

          if (filter === 'all') {
            item.style.display = 'block';
          } else if (filter === 'video' || filter === 'image') {
            item.style.display = (type === filter) ? 'block' : 'none';
          } else {
            item.style.display = (cat === filter) ? 'block' : 'none';
          }
        });
      });
    });
  }

  // 5. Video Modal Lightbox
  const videoModal = document.getElementById('videoModal');
  const modalVideoPlayer = document.getElementById('modalVideoPlayer');
  const modalVideoSource = document.getElementById('modalVideoSource');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalClose = document.getElementById('modalClose');

  function openVideoModal(videoSrc, title) {
    if (!videoModal || !modalVideoPlayer || !modalVideoSource) return;
    modalVideoSource.src = videoSrc;
    modalVideoPlayer.load();
    if (modalVideoTitle) modalVideoTitle.textContent = title || 'Trabalho VV Braids';
    videoModal.classList.add('open');
    modalVideoPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !modalVideoPlayer) return;
    modalVideoPlayer.pause();
    modalVideoPlayer.currentTime = 0;
    videoModal.classList.remove('open');
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // Attach click to video portfolio cards
  const videoPortfolioCards = document.querySelectorAll('.portfolio-item[data-type="video"]');
  videoPortfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoSrc = card.getAttribute('data-video-src');
      const title = card.getAttribute('data-title');
      if (videoSrc) openVideoModal(videoSrc, title);
    });
  });

  // 6. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. Dynamic WhatsApp Message Generator for Custom Booking Buttons
  const bookingButtons = document.querySelectorAll('[data-service-booking]');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-booking');
      const basePhone = '5511966733297';
      const text = encodeURIComponent(
        `Olá, Verônica! Vi o site da VV Braids Studio e gostaria de agendar meu horário para o serviço: *${serviceName}*. Como estão as datas disponíveis?`
      );
      window.open(`https://wa.me/${basePhone}?text=${text}`, '_blank');
    });
  });

  // 8. Atendimento a Domicílio WhatsApp Inquiry
  const homeServiceBtn = document.getElementById('homeServiceInquiryBtn');
  if (homeServiceBtn) {
    homeServiceBtn.addEventListener('click', () => {
      const basePhone = '5511966733297';
      const text = encodeURIComponent(
        'Olá, Verônica! Gostaria de consultar a taxa de deslocamento e disponibilidade para atendimento a domicílio com a VV Braids Studio. Meu bairro/cidade é: '
      );
      window.open(`https://wa.me/${basePhone}?text=${text}`, '_blank');
    });
  }
});
