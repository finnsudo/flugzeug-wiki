/* Novium sponsor window integration. Draft only: call window.showNoviumSponsorDialog()
   from auth.js after a successful sign-in. Do not publish before sponsorship approval. */
(() => {
  const dialog = document.getElementById('noviumSponsorDialog');
  const closeButton = document.getElementById('noviumSponsorClose');
  if (!dialog) return;

  window.showNoviumSponsorDialog = function showNoviumSponsorDialog() {
    if (sessionStorage.getItem('noviumSponsorShownThisSession') === '1') return;
    sessionStorage.setItem('noviumSponsorShownThisSession', '1');
    if (!dialog.open) dialog.showModal();
  };

  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
})();
