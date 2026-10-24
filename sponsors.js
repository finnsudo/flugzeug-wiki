/* Novium sponsor dialog. Broadcasts are coordinated by auth.js via Supabase Realtime. */
(() => {
  const dialog = document.getElementById('noviumSponsorDialog');
  const closeButton = document.getElementById('noviumSponsorClose');
  const countdown = document.getElementById('noviumSponsorCountdown');
  if (!dialog) return;

  let closeAllowedAt = 0;
  let countdownInterval = null;

  function updateCloseCountdown() {
    const seconds = Math.max(0, Math.ceil((closeAllowedAt - Date.now()) / 1000));
    closeButton.disabled = seconds > 0;
    if (countdown) countdown.textContent = seconds > 0
      ? `Schließen in ${seconds} ${seconds === 1 ? 'Sekunde' : 'Sekunden'} möglich.`
      : 'Du kannst dieses Fenster jetzt schließen.';
    if (seconds === 0 && countdownInterval) {
      window.clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  window.showNoviumSponsorDialog = function showNoviumSponsorDialog(options = {}) {
    const force = options.force === true;
    if (!force) {
      try {
        if (sessionStorage.getItem('noviumSponsorShownThisSession') === '1') return;
        sessionStorage.setItem('noviumSponsorShownThisSession', '1');
      } catch (_) {}
    }
    if (dialog.open) return;
    closeAllowedAt = Date.now() + 5000;
    dialog.showModal();
    updateCloseCountdown();
    if (countdownInterval) window.clearInterval(countdownInterval);
    countdownInterval = window.setInterval(updateCloseCountdown, 200);
  };

  closeButton?.addEventListener('click', () => {
    if (Date.now() >= closeAllowedAt) dialog.close();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && Date.now() >= closeAllowedAt) dialog.close();
  });
  dialog.addEventListener('cancel', event => {
    if (Date.now() < closeAllowedAt) event.preventDefault();
  });
  dialog.addEventListener('close', () => {
    if (countdownInterval) window.clearInterval(countdownInterval);
    countdownInterval = null;
    closeButton.disabled = false;
  });
})();
