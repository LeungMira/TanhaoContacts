document.addEventListener('DOMContentLoaded', () => {
  const bgSquareWrap = document.getElementById('bgSquareWrap');
  const stickyHeader = document.getElementById('stickyHeader');
  const headerBookBtn = document.getElementById('headerBookBtn');

  const dynamicLogText = document.getElementById('dynamicLogText');
  const phaseTitleText = document.getElementById('phaseTitleText');
  const phaseDetailText = document.getElementById('phaseDetailText');
  const statEfficiency = document.getElementById('statEfficiency');
  const statLoad = document.getElementById('statLoad');
  const statNodes = document.getElementById('statNodes');

  const logoStage = document.getElementById('logoStage');
  const logoTiltWrap = document.getElementById('logoTiltWrap');
  const logoModeBadge = document.getElementById('logoModeBadge');
  const surgeBtn = document.getElementById('surgeBtn');

  const btnShowServices = document.getElementById('btnShowServices');
  const btnShowPlans = document.getElementById('btnShowPlans');
  const servicesViewGrid = document.getElementById('servicesViewGrid');
  const plansViewGrid = document.getElementById('plansViewGrid');
  const bottomSectionTitle = document.getElementById('bottomSectionTitle');
  const inspectorText = document.getElementById('inspectorText');
  const servicesSection = document.getElementById('servicesSection');

  const cyberToast = document.getElementById('cyberToast');
  const toastBody = document.getElementById('toastBody');
  const toastCloseBtn = document.getElementById('toastCloseBtn');

  let toastTimer = null;

  function showToast(message) {
    toastBody.innerHTML = message;
    cyberToast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      cyberToast.hidden = true;
    }, 5500);
  }

  toastCloseBtn.addEventListener('click', () => {
    cyberToast.hidden = true;
  });

  function pushTerminalLog(text) {
    dynamicLogText.textContent = text;
  }

  // 1. Sticky Header Scroll Effect:
  // Header blurs to oblivion on scroll down while [TAN][HAO] website logo stays & enlarges
  function handleScroll() {
    if (window.scrollY > 28) {
      stickyHeader.classList.add('is-scrolled');
    } else {
      stickyHeader.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Header "BOOK BRIEFING" Contact Button
  headerBookBtn?.addEventListener('click', () => {
    showToast(
      `<strong>DIRECT CONTACT // TAN HAO OPS</strong><br/>` +
      `• <strong>Email:</strong> ops@tanhao.ph<br/>` +
      `• <strong>Viber / Mobile:</strong> +63 917 882 6426<br/>` +
      `• <strong>Onboarding:</strong> 30-Day OPSPULSE-PILOT (₱4,500)`
    );
    pushTerminalLog('Contact channel opened: ops@tanhao.ph | +63 917 882 6426');
  });

  // 2. Background Slanting Square Parallax
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;

    const shiftX = (normX * 18).toFixed(1);
    const shiftY = (normY * 18).toFixed(1);
    const rot = (-14 + normX * 3.5).toFixed(2);

    bgSquareWrap.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px)) rotate(${rot}deg) skewX(-10deg)`;
  });

  // 3. Persistent Website Logo [TAN] [HAO] Cyber Scramble + Scroll-to-Top
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₱∑◈//';
  document.querySelectorAll('.skew-plate').forEach((plate) => {
    const textEl = plate.querySelector('.plate-text');
    const original = plate.dataset.glitch;

    plate.addEventListener('click', () => {
      if (window.scrollY > 60) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      let step = 0;
      const interval = setInterval(() => {
        textEl.textContent = original
          .split('')
          .map((char, idx) => (idx < step ? original[idx] : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join('');
        step += 1 / 3;
        if (step >= original.length) {
          textEl.textContent = original;
          clearInterval(interval);
        }
      }, 35);
      pushTerminalLog(`Tanhao Identity [${original}] verified — "Math is Math".`);
    });
  });

  // 4. Info Primary Window Tabs & 'X' Button Interaction
  const pills = document.querySelectorAll('.pill');
  const tabViews = document.querySelectorAll('.tab-view');
  const infoWinTitle = document.getElementById('infoWinTitle');
  const infoCloseBtn = document.getElementById('infoCloseBtn');

  const tabOrder = ['origin', 'philosophy', 'pricing'];
  const tabTitles = {
    origin: '01_ORIGIN_AND_MISSION.EXE',
    philosophy: '02_AXIOM_MATH_IS_MATH.EXE',
    pricing: '03_OPSPULSE_AND_PILOT.EXE',
  };
  let currentTabIndex = 0;

  function activateTab(tabKey) {
    currentTabIndex = tabOrder.indexOf(tabKey);
    pills.forEach((p) => p.classList.toggle('active', p.dataset.tab === tabKey));
    tabViews.forEach((v) => v.classList.toggle('active', v.id === `view-${tabKey}`));
    infoWinTitle.textContent = tabTitles[tabKey] || 'TANHAO_BRIEFING.EXE';
    pushTerminalLog(`Loaded briefing module: ${infoWinTitle.textContent}`);
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => activateTab(pill.dataset.tab));
  });

  infoCloseBtn.addEventListener('click', () => {
    const nextIndex = (currentTabIndex + 1) % tabOrder.length;
    activateTab(tabOrder[nextIndex]);
  });

  // Info Interactive Concept Chips
  const chipDetails = {
    math: {
      log: 'Axiom "Math is Math": Uncovering operational reality & diagnosing financial leaks objectively.',
      eff: '₱4,500 PILOT',
      load: '₱9,000 / MO',
    },
    gold: {
      log: '"Gold In, Gold Out": Mobile-first daily digital intake replacing messy paper receipts & cash tallies.',
      eff: '100% VERIFIED',
      load: 'DAILY INTAKE',
    },
    nopos: {
      log: 'Zero-Bloat Approach: No risky from-scratch custom POS builds—structured intelligence that works.',
      eff: 'ZERO BLOAT',
      load: 'LOW FRICTION',
    },
  };

  document.querySelectorAll('.cyber-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const data = chipDetails[chip.dataset.inspect];
      if (data) {
        pushTerminalLog(data.log);
        statEfficiency.textContent = data.eff;
        statLoad.textContent = data.load;
        showToast(`<strong>TAN HAO PRINCIPLE:</strong><br/>${data.log}`);
      }
    });
  });

  // 5. 30-Day "Ops Baseline" Foundation Pilot Phase Selector (Phase 1, 2, 3)
  const phaseData = {
    '1': {
      title: 'Phase 1 // Landscape Study & Mobile Intake',
      detail: 'Studying direct costs & workflows; deploying low-friction mobile daily intake ("gold in, gold out").',
      log: 'Phase 1 Active: Digitizing paper logs, cash tallies & receipts.',
    },
    '2': {
      title: 'Phase 2 // Weekly Cross-Verification & Handler',
      detail: 'Shadowing physical logs, auditing input accuracy, status reports & introducing your Dedicated Handler.',
      log: 'Phase 2 Active: Cross-verifying physical vs. digital ledgers weekly.',
    },
    '3': {
      title: 'Phase 3 // Diagnostic Briefing & 30–60d Forecast',
      detail: 'Month-end executive visual dashboard, cash/inventory forecast & seamless transition to ₱9k/mo OpsPulse.',
      log: 'Phase 3 Complete: Ready for ongoing ₱9,000/mo OPSPULSE-STANDARD retainer.',
    },
  };

  const phaseBtns = document.querySelectorAll('[data-phase]');
  function selectPhase(phaseKey) {
    const info = phaseData[phaseKey];
    if (!info) return;
    phaseBtns.forEach((b) => b.classList.toggle('active-phase', b.dataset.phase === phaseKey));
    phaseTitleText.textContent = info.title;
    phaseDetailText.textContent = info.detail;
    pushTerminalLog(info.log);
  }

  phaseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectPhase(btn.dataset.phase);
    });
  });

  // 6. Right Column: Interactive Two-Hemisphere Brain Logo (Data × Operational Strategy)
  logoStage.addEventListener('mousemove', (e) => {
    const rect = logoStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = (x * 22).toFixed(2);
    const rotX = (-y * 22).toFixed(2);
    logoTiltWrap.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });

  logoStage.addEventListener('mouseleave', () => {
    logoTiltWrap.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
  });

  const nodeDescriptions = {
    PAPER_LOGS_TO_LEDGER: 'Left Hemisphere (Data): Digitizing paper logs, cash tallies & physical receipts into a clean ledger.',
    GOLD_IN_GOLD_OUT_AUDIT: 'Left Hemisphere (Data): Weekly cross-verification ensuring "gold in, gold out" data integrity.',
    RUNWAY_MODEL_30_60D: 'Left Hemisphere (Math): 30-to-60 day mathematical forecasting for cash runway & direct costs.',
    FINANCIAL_LEAK_DETECTION: 'Right Hemisphere (Strategy): Diagnosing hidden financial leaks and margin erosion in MSME operations.',
    INVENTORY_VELOCITY_SYNC: 'Right Hemisphere (Strategy): Tracking stock movement and reorder velocity rooted in family-business logistics.',
    MONTHLY_STRATEGY_BRIEFING: 'Right Hemisphere (Strategy): Monthly advisory sessions translating numbers into concrete owner decisions.',
    MATH_IS_MATH_NEXUS: 'Central Nexus: "Math is Math" — uniting CS-driven mathematical models with practical MSME execution.',
  };

  document.querySelectorAll('.node-dot').forEach((node) => {
    node.addEventListener('mouseenter', () => {
      const nodeName = node.dataset.node;
      pushTerminalLog(nodeDescriptions[nodeName] || `Node [${nodeName}] inspected.`);
      logoModeBadge.textContent = nodeName.replace(/_/g, ' ');
    });
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const nodeName = node.dataset.node;
      showToast(`<strong>${nodeName.replace(/_/g, ' ')}</strong><br/>${nodeDescriptions[nodeName] || ''}`);
    });
  });

  function triggerOverclock() {
    logoStage.classList.toggle('overclocked');
    const isOver = logoStage.classList.contains('overclocked');
    logoModeBadge.textContent = isOver ? 'OPSPULSE // SYNCED' : 'MATH IS MATH';
    statNodes.textContent = isOver ? 'RUNWAY: 60D' : '30–60 DAYS';
    pushTerminalLog(
      isOver
        ? 'OPSPULSE CORE SYNCED: Data ledger, 30–60d forecast models & monthly advisory aligned.'
        : 'Two-hemisphere emblem set to baseline monitoring.'
    );
  }

  surgeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerOverclock();
  });

  logoStage.addEventListener('click', () => {
    triggerOverclock();
  });

  // 7. Bottom Section: Switch between "Services" (3 Core Services) and "Plans" (OPSPULSE-PILOT & OPSPULSE-STANDARD)
  function switchBottomMode(mode) {
    const isPlans = mode === 'plans';
    btnShowServices.classList.toggle('active', !isPlans);
    btnShowServices.setAttribute('aria-selected', String(!isPlans));
    btnShowPlans.classList.toggle('active', isPlans);
    btnShowPlans.setAttribute('aria-selected', String(isPlans));

    servicesViewGrid.classList.toggle('hidden-view', isPlans);
    plansViewGrid.classList.toggle('hidden-view', !isPlans);
    bottomSectionTitle.textContent = isPlans ? 'plans' : 'services';

    if (isPlans) {
      inspectorText.innerHTML =
        `ACTIVE VIEW: <strong>Plans (OPSPULSE-PILOT &amp; OPSPULSE-STANDARD)</strong> — Includes full service breakdown &amp; accepted PH payment methods (GCash, Maya, Bank Transfer, Check).`;
      pushTerminalLog('Switched to Plans view: OPSPULSE-PILOT (₱4,500) & OPSPULSE-STANDARD (₱9,000/mo).');
    } else {
      inspectorText.innerHTML =
        `ACTIVE VIEW: <strong>Services (1. Operational Intelligence, 2. Software Development &amp; Maintenance, 3. Marketing)</strong> — Click "Plans" to view pricing &amp; payment methods.`;
      pushTerminalLog('Switched to Services view: Operational Intelligence, Software & Maintenance, Marketing.');
    }
  }

  btnShowServices.addEventListener('click', () => switchBottomMode('services'));
  btnShowPlans.addEventListener('click', () => switchBottomMode('plans'));

  // Jump to Plans from Pricing Tab button or Service 01 card button
  document.getElementById('pingDiagnosticBtn')?.addEventListener('click', () => {
    switchBottomMode('plans');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('[data-switch-plan]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchBottomMode('plans');
    });
  });

  // Service Cards selection
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    card.addEventListener('click', () => {
      serviceCards.forEach((c) => c.classList.remove('active-service'));
      card.classList.add('active-service');
      const title = card.querySelector('.srv-name').textContent;
      inspectorText.innerHTML = `SELECTED SERVICE: <strong>${title}</strong> — Switch to <strong>Plans</strong> to see OPSPULSE-PILOT &amp; OPSPULSE-STANDARD packages.`;
      pushTerminalLog(`Selected service: ${title}`);
    });
  });

  document.querySelectorAll('.srv-deploy-btn[data-deploy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modName = btn.dataset.deploy;
      showToast(
        `<strong>SERVICE INQUIRY // ${modName}</strong><br/>` +
        `Available selectively alongside your <strong>OPSPULSE</strong> retainer. Contact <strong>ops@tanhao.ph</strong> or <strong>+63 917 882 6426</strong>.`
      );
      pushTerminalLog(`Inquiry initialized for [${modName}].`);
    });
  });

  // Plan Selection Buttons (OPSPULSE-PILOT & OPSPULSE-STANDARD)
  document.querySelectorAll('[data-select-plan]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const planName = btn.dataset.selectPlan;
      inspectorText.innerHTML = `SELECTED PLAN: <strong>${planName}</strong> — Payment accepted via GCash, Maya, InstaPay/PESONet, or BDO/BPI/UnionBank transfer.`;
      showToast(
        `<strong>PLAN SELECTED // ${planName}</strong><br/>` +
        `• <strong>Payment Methods:</strong> GCash, Maya, BDO / BPI / UnionBank, or Corporate Check<br/>` +
        `• <strong>Next Step:</strong> Email <strong>ops@tanhao.ph</strong> or Viber <strong>+63 917 882 6426</strong> to schedule kickoff.`
      );
      pushTerminalLog(`Plan selected: ${planName}`);
    });
  });

  document.getElementById('initConsultBtn')?.addEventListener('click', () => {
    switchBottomMode('plans');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
    showToast(
      `<strong>LAUNCH OPSPULSE-PILOT (₱4,500 — 50% OFF)</strong><br/>` +
      `Reach us at <strong>ops@tanhao.ph</strong> or <strong>+63 917 882 6426</strong>. Accepted via GCash, Maya, or Bank Transfer.`
    );
  });
});
