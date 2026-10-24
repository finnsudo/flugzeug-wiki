(() => {
  const dialog = document.getElementById('accountDialog');
  const openButton = document.getElementById('accountButton');
  const closeButton = document.getElementById('accountClose');
  const message = document.getElementById('accountMessage');
  const notice = document.getElementById('authNotice');
  const providers = document.getElementById('providerButtons');
  const userBox = document.getElementById('accountUser');
  const name = document.getElementById('userName');
  const email = document.getElementById('userEmail');
  const avatar = document.getElementById('userAvatar');
  const label = document.getElementById('accountButtonLabel');
  const emailForm = document.getElementById('emailForm');
  const emailField = document.getElementById('emailAddress');
  const passwordField = document.getElementById('emailPassword');
  const emailSubmit = document.getElementById('emailSubmit');
  const emailMode = document.getElementById('emailMode');
  const rememberMe = document.getElementById('rememberMe');
  const emailUsernameGroup = document.getElementById('emailUsernameGroup');
  const emailUsername = document.getElementById('emailUsername');
  const teamButton = document.getElementById('teamButton');
  const teamDialog = document.getElementById('teamDialog');
  const teamClose = document.getElementById('teamClose');
  const teamStatus = document.getElementById('teamStatus');
  const teamUsers = document.getElementById('teamUsers');
  const f12Status = document.getElementById('f12Status');
  const f12Users = document.getElementById('f12Users');
  const workMode = document.getElementById('workMode');
  const maintenanceHoursInput = document.getElementById('maintenanceHours');
  const saveWorkMode = document.getElementById('saveWorkMode');
  const sponsorSelect = document.getElementById('sponsorSelect');
  const sendSponsorAd = document.getElementById('sendSponsorAd');
  const sponsorSendStatus = document.getElementById('sponsorSendStatus');
  const maintenanceScreen = document.getElementById('maintenanceScreen');
  const workScreenTitle = document.getElementById('workScreenTitle');
  const workScreenMessage = document.getElementById('workScreenMessage');
  const maintenanceCountdown = document.getElementById('maintenanceCountdown');
  const siteFunFact = document.getElementById('siteFunFact');
  const userBlockScreen = document.getElementById('userBlockScreen');
  const userBlockTitle = document.getElementById('userBlockTitle');
  const userBlockMessage = document.getElementById('userBlockMessage');
  const softBanLiftButton = document.getElementById('softBanLiftButton');
  const softBanScreen = document.getElementById('softBanScreen');
  const config = window.AIRCRAFT_AUTH_CONFIG || {};
  const rememberPreferenceKey = 'aircraftArchiveRememberMe';
  try { rememberMe.checked = localStorage.getItem(rememberPreferenceKey) !== 'false'; } catch (_) { rememberMe.checked = true; }
  function selectedAuthStorage() { return rememberMe.checked ? window.localStorage : window.sessionStorage; }
  function moveAuthSession(remember) {
    try {
      if (config.supabaseUrl) {
        const prefix = `sb-${new URL(config.supabaseUrl).hostname.split('.')[0]}-`;
        const source = remember ? window.sessionStorage : window.localStorage;
        const target = remember ? window.localStorage : window.sessionStorage;
        for (const key of Object.keys(source)) {
          if (key.startsWith(prefix)) { target.setItem(key, source.getItem(key)); source.removeItem(key); }
        }
      }
      localStorage.setItem(rememberPreferenceKey, String(remember));
    } catch (_) {}
  }
  const supabaseAuthStorage = {
    getItem(key) { try { return selectedAuthStorage().getItem(key); } catch (_) { return null; } },
    setItem(key, value) { try { selectedAuthStorage().setItem(key, value); } catch (_) {} },
    removeItem(key) { try { localStorage.removeItem(key); sessionStorage.removeItem(key); } catch (_) {} }
  };
  let authClient = null;
  let currentUser = null;
  let isAdmin = false;
  let emailAction = 'signin';
  let autoOpenTimer = null;
  let settingsChannel = null;
  let sponsorBroadcastChannel = null;
  let siteMode = 'off';
  let maintenanceUntil = null;
  let countdownTimer = null;
  let profileRefreshTimer = null;
  let profileChannel = null;
  let teamProfileChannel = null;
  let userIsBanned = false;
  let userBanReason = null;
  let userSuspendedUntil = null;
  let userF12SoftBannedAt = null;
  let firstF12SoftBanPending = false;
  let firstF12SoftBanRunning = false;
  let secondF12BanPending = false;
  let secondF12BanRunning = false;
  const funFacts = [
    'Das Flugzeug-Wiki wurde von einer Person entwickelt.',
    'Die Website wird mit GitHub Pages veröffentlicht.',
    'Flugzeuge lassen sich nach Motor, Herstellungsland, Erstflug und Länge filtern.',
    'Zu den Flugzeugprofilen gehören technische Daten und weiterführende Quellen.',
    'Das Wiki zeigt Verkehrsflugzeuge, historische Maschinen und Leichtflugzeuge.'
  ];
  siteFunFact.textContent = `Fun Fact: ${funFacts[Math.floor(Math.random() * funFacts.length)]}`;

  const configured = Boolean(config.supabaseUrl && config.supabasePublishableKey);
  const show = () => { if (!dialog.open) dialog.showModal(); };
  openButton.addEventListener('click', show);
  rememberMe.addEventListener('change', () => moveAuthSession(rememberMe.checked));
  closeButton.addEventListener('click', () => { if (currentUser) dialog.close(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog && currentUser) dialog.close(); });
  dialog.addEventListener('cancel', (event) => { if (!currentUser) event.preventDefault(); });
  teamButton.addEventListener('click', openTeam);
  workMode.addEventListener('change', () => {
    maintenanceHoursInput.disabled = workMode.value !== 'maintenance';
    if (maintenanceHoursInput.disabled) maintenanceHoursInput.value = '';
  });
  teamClose.addEventListener('click', () => teamDialog.close());
  teamDialog.addEventListener('click', (event) => { if (event.target === teamDialog) teamDialog.close(); });
  softBanLiftButton.addEventListener('click', async () => {
    if (!isAdmin || !currentUser) return;
    softBanLiftButton.disabled = true;
    if (userIsBanned) {
      const { error } = await authClient.rpc('set_user_access', { p_user_id: currentUser.id, p_is_banned: false, p_suspended_until: null });
      if (error) {
        document.getElementById('softBanNote').textContent = 'Die Kontosperre konnte nicht aufgehoben werden. Prüfe die Supabase-Einrichtung.';
        softBanLiftButton.disabled = false;
        return;
      }
      userIsBanned = false;
      userSuspendedUntil = null;
      applyUserBlock();
    }
    if (userF12SoftBannedAt) {
      const { error } = await authClient.rpc('clear_user_f12_soft_ban', { p_user_id: currentUser.id });
      if (error) {
        document.getElementById('softBanNote').textContent = 'Der gespeicherte F12-Soft-Ban konnte nicht aufgehoben werden. Prüfe die Supabase-Einrichtung.';
        softBanLiftButton.disabled = false;
        return;
      }
      userF12SoftBannedAt = null;
    }
    try {
      sessionStorage.removeItem('aircraftWikiSoftBan');
      sessionStorage.removeItem('aircraftWikiF12Presses');
    } catch (_) {}
    softBanScreen.hidden = true;
    softBanLiftButton.disabled = false;
  });

  function setEmailMode(mode) {
    emailAction = mode;
    emailSubmit.textContent = mode === 'signup' ? 'KONTO ERSTELLEN' : 'MIT E-MAIL ANMELDEN';
    emailMode.textContent = mode === 'signup' ? 'Ich habe schon ein Konto: Anmelden' : 'Noch kein Konto? Registrieren';
    emailUsernameGroup.hidden = mode !== 'signup';
    emailUsername.disabled = mode !== 'signup';
    emailUsername.required = mode === 'signup';
  }
  emailMode.addEventListener('click', () => setEmailMode(emailAction === 'signin' ? 'signup' : 'signin'));
  setEmailMode('signin');

  function applyLoginGate() {
    const locked = !currentUser;
    closeButton.hidden = locked;
    document.querySelectorAll('body > header, body > main, body > footer, body > dialog:not(#accountDialog)').forEach((element) => { element.inert = locked; });
  }

  function getAccountIdentity(user) {
    const metadata = user.user_metadata || {};
    const provider = user.app_metadata?.provider || user.identities?.[0]?.provider || 'email';
    const identity = user.identities?.find((item) => item.provider === provider)?.identity_data || {};
    const fallback = user.email?.split('@')[0] || user.id.slice(0, 8);
    const displayName = provider === 'discord'
      ? identity.username || identity.user_name || metadata.username || metadata.user_name || identity.global_name || metadata.global_name || identity.name || metadata.name || metadata.full_name || fallback
      : metadata.username || metadata.preferred_username || metadata.user_name || metadata.full_name || metadata.name || identity.username || identity.name || fallback;
    return { displayName, provider };
  }

  async function checkAdmin() {
    isAdmin = false;
    teamButton.hidden = true;
    if (currentUser && authClient) {
      const { data, error } = await authClient.rpc('is_site_admin');
      isAdmin = !error && data === true;
      teamButton.hidden = !isAdmin;
      softBanLiftButton.hidden = !isAdmin;
      if (isAdmin) loadTeamData();
    } else {
      softBanLiftButton.hidden = true;
    }
    if (isAdmin && !teamProfileChannel) {
      teamProfileChannel = authClient.channel('team-f12-cases')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => { void loadTeamData(); })
        .subscribe();
    } else if (!isAdmin && teamProfileChannel) {
      authClient.removeChannel(teamProfileChannel);
      teamProfileChannel = null;
    }
    applyUserBlock();
    applyMaintenance();
  }

  function applyUserBlock() {
    if (!userBlockScreen) return;
    const timedOut = !userIsBanned && userSuspendedUntil && Date.parse(userSuspendedUntil) > Date.now();
    const blocked = (userIsBanned || timedOut) && !isAdmin;
    const softBlocked = Boolean(userF12SoftBannedAt) && !blocked && !isAdmin;
    userBlockScreen.hidden = !blocked;
    if (blocked) softBanScreen.hidden = true;
    if (softBlocked) softBanScreen.hidden = false;
    document.body.style.overflow = blocked || softBlocked ? 'hidden' : '';
    document.querySelectorAll('body > header, body > main, body > footer, body > dialog').forEach((element) => { element.inert = blocked || softBlocked; });
    if (blocked) { if (dialog.open) dialog.close(); if (teamDialog.open) teamDialog.close(); }
    userBlockTitle.textContent = userIsBanned ? 'Du bist von der Website gesperrt' : 'Dein Zugang ist vorübergehend pausiert';
    userBlockMessage.textContent = userIsBanned
      ? 'Dieses Konto kann das Flugzeug-Wiki derzeit nicht nutzen.'
      : timedOut ? `Dein Zugang wird am ${new Date(userSuspendedUntil).toLocaleString('de-DE')} wieder freigegeben.` : 'Dieses Konto kann das Wiki zurzeit nicht verwenden.';
  }

  async function refreshUserBlock() {
    if (!authClient || !currentUser) return;
    const { data, error } = await authClient.from('profiles').select('is_banned,suspended_until,ban_reason,f12_soft_banned_at').eq('id', currentUser.id).maybeSingle();
    if (!error && data) {
      const hadF12SoftBan = Boolean(userF12SoftBannedAt);
      userIsBanned = Boolean(data.is_banned);
      userBanReason = data.ban_reason;
      userSuspendedUntil = data.suspended_until;
      userF12SoftBannedAt = data.f12_soft_banned_at;
      applyUserBlock();
      if (userIsBanned) window.dispatchEvent(new Event('aircraft-wiki:clear-f12-soft-ban'));
      else if (userF12SoftBannedAt && !isAdmin) window.dispatchEvent(new Event('aircraft-wiki:server-soft-ban-active'));
      else if (hadF12SoftBan && !userF12SoftBannedAt) window.dispatchEvent(new Event('aircraft-wiki:clear-f12-soft-ban'));
    }
  }

  async function recordFirstF12SoftBan() {
    if (firstF12SoftBanRunning) return;
    if (!authClient || !currentUser) { firstF12SoftBanPending = true; return; }
    firstF12SoftBanRunning = true;
    const { data: adminStatus, error: adminCheckError } = await authClient.rpc('is_site_admin');
    if (!adminCheckError && adminStatus === true) {
      document.getElementById('softBanNote').textContent = 'Teamkonten werden nicht in der F12-Sperrliste erfasst.';
      firstF12SoftBanRunning = false;
      return;
    }
    const { error } = await authClient.rpc('record_my_f12_soft_ban');
    if (error) {
      document.getElementById('softBanNote').textContent = 'Der Soft-Ban ist nur in diesem Tab aktiv. Führe die aktualisierte Supabase-Moderationsdatei aus, um F12-Fälle zu speichern.';
    } else {
      userF12SoftBannedAt = new Date().toISOString();
      document.getElementById('softBanNote').textContent = 'F12-Soft-Ban gespeichert. Nur das Website-Team kann ihn aufheben.';
    }
    firstF12SoftBanRunning = false;
  }
  window.addEventListener('aircraft-wiki:first-f12', () => { void recordFirstF12SoftBan(); });

  async function applySecondF12Ban() {
    if (secondF12BanRunning) return;
    if (!authClient || !currentUser) { secondF12BanPending = true; return; }
    secondF12BanRunning = true;
    const title = document.getElementById('softBanTitle');
    const text = document.getElementById('softBanMessage');
    const note = document.getElementById('softBanNote');
    const { data: adminStatus, error: adminCheckError } = await authClient.rpc('is_site_admin');
    if (!adminCheckError && adminStatus === true) {
      title.textContent = 'Teamkonto geschützt';
      text.textContent = 'Teamkonten werden vor einer automatischen Kontosperre geschützt.';
      note.textContent = 'Die Soft-Ban-Ansicht bleibt bis zum Schließen dieses Tabs sichtbar.';
      secondF12BanRunning = false;
      return;
    }
    const { error } = await authClient.rpc('ban_my_account_after_f12');
    if (error) {
      title.textContent = 'Soft-Ban bleibt aktiv';
      text.textContent = 'Die Kontosperre konnte nicht gespeichert werden. Der Zugriff bleibt in diesem Tab blockiert.';
      note.textContent = 'Führe SUPABASE-USER-MODERATION.sql im Supabase SQL Editor erneut aus oder kontaktiere das Team über Discord.';
    } else {
      userIsBanned = true;
      userSuspendedUntil = null;
      applyUserBlock();
      softBanScreen.hidden = true;
    }
    secondF12BanRunning = false;
  }
  window.addEventListener('aircraft-wiki:second-f12', () => { void applySecondF12Ban(); });

  async function syncProfileIdentity(user) {
    if (!authClient || !user) return;
    const { displayName, provider } = getAccountIdentity(user);
    const { data } = await authClient.from('profiles').select('display_name,auth_provider').eq('id', user.id).maybeSingle();
    if (data && (data.display_name !== displayName || data.auth_provider !== provider)) {
      await authClient.rpc('update_my_profile_identity', { p_display_name: displayName, p_auth_provider: provider });
    }
  }

  function applyMaintenance() {
    if (!maintenanceScreen) return;
    const expired = siteMode === 'maintenance' && maintenanceUntil && Date.parse(maintenanceUntil) <= Date.now();
    const active = (siteMode === 'rebuild' || (siteMode === 'maintenance' && !expired)) && !isAdmin;
    maintenanceScreen.hidden = !active;
    workScreenTitle.textContent = siteMode === 'rebuild' ? 'Die Website wird gerade umgebaut' : 'Die Website ist in Wartung';
    workScreenMessage.textContent = siteMode === 'rebuild'
      ? 'Bitte gedulden Sie sich, bis die Umbauten fertig sind.'
      : 'Wir führen gerade Wartungsarbeiten durch. Bitte schauen Sie später wieder vorbei.';
    maintenanceCountdown.hidden = !(siteMode === 'maintenance' && maintenanceUntil && !expired);
    if (siteMode === 'maintenance' && maintenanceUntil && !expired) {
      const remaining = Math.max(0, Date.parse(maintenanceUntil) - Date.now());
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      maintenanceCountdown.textContent = `Die Wartung dauert voraussichtlich noch circa ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.`;
    }
  }

  async function loadMaintenance() {
    if (!authClient) return;
    const { data, error } = await authClient.from('site_settings').select('maintenance_mode,rebuild_mode,maintenance_until').eq('id', 1).maybeSingle();
    if (!error && data) {
      siteMode = data.rebuild_mode ? 'rebuild' : data.maintenance_mode ? 'maintenance' : 'off';
      maintenanceUntil = data.maintenance_until;
      applyMaintenance();
    }
  }

  async function loadTeamData() {
    if (!isAdmin || !authClient) return;
    teamStatus.textContent = 'Teamdaten werden geladen …';
    const [{ data: profiles, error: profileError }, { data: settings, error: settingsError }] = await Promise.all([
      authClient.from('profiles').select('id, created_at, display_name, auth_provider, is_banned, suspended_until, ban_reason, f12_soft_banned_at, f12_banned_at').order('created_at', { ascending: false }),
      authClient.from('site_settings').select('maintenance_mode,rebuild_mode,maintenance_until').eq('id', 1).maybeSingle()
    ]);
    if (profileError || settingsError || !settings) {
      teamStatus.textContent = 'Teamfunktionen sind noch nicht eingerichtet. Bitte die Supabase-Einrichtung aus README.txt ausführen.';
      teamUsers.replaceChildren();
      f12Status.textContent = 'F12-Fälle konnten nicht geladen werden. Führe die aktualisierte SUPABASE-USER-MODERATION.sql aus.';
      f12Users.replaceChildren();
      return;
    }
    teamStatus.textContent = `${profiles.length} Nutzerkonto${profiles.length === 1 ? '' : 'en'} · Name, Anmeldeart und Zugangskontrolle.`;
    teamUsers.replaceChildren(...profiles.map((profile) => {
      const row = document.createElement('article'); row.className = 'team-user-row';
      const details = document.createElement('div'); details.className = 'team-user-details';
      const title = document.createElement('div'); title.className = 'team-user-title';
      const displayName = document.createElement('b'); displayName.textContent = profile.display_name || 'Name noch nicht verfügbar';
      const provider = document.createElement('span'); provider.className = 'team-provider';
      provider.textContent = ({ discord: 'Discord', twitch: 'Twitch', email: 'E-Mail' })[profile.auth_provider] || profile.auth_provider || 'Unbekannt';
      title.append(displayName, provider);
      const id = document.createElement('code'); id.textContent = `ID: ${profile.id}`;
      const created = document.createElement('time'); created.textContent = profile.created_at ? `Angemeldet: ${new Date(profile.created_at).toLocaleDateString('de-DE')}` : '';
      const suspended = profile.suspended_until && Date.parse(profile.suspended_until) > Date.now();
      const status = document.createElement('small'); status.className = `team-access-status${profile.is_banned ? ' is-blocked' : suspended ? ' is-timeout' : ''}`;
      status.textContent = profile.is_banned ? 'Gesperrt' : suspended ? `Timeout bis ${new Date(profile.suspended_until).toLocaleString('de-DE')}` : 'Zugang aktiv';
      details.append(title, id, created, status);

      const actions = document.createElement('div'); actions.className = 'team-user-actions';
      const ban = document.createElement('button'); ban.type = 'button'; ban.className = `moderation-button${profile.is_banned ? ' is-restore' : ' is-danger'}`; ban.textContent = profile.is_banned ? 'Entsperren' : 'Sperren';
      ban.addEventListener('click', async () => {
        ban.disabled = true;
        const { error } = await authClient.rpc('set_user_access', { p_user_id: profile.id, p_is_banned: !profile.is_banned, p_suspended_until: null });
        teamStatus.textContent = error ? 'Änderung nicht gespeichert. Prüfe die Supabase-Update-Datei.' : profile.is_banned ? 'Nutzer wurde entsperrt.' : 'Nutzer wurde gesperrt.';
        await loadTeamData();
      });
      const timeoutChoice = document.createElement('select'); timeoutChoice.className = 'timeout-select'; timeoutChoice.setAttribute('aria-label', `Timeout für ${profile.display_name || 'Nutzer'}`);
      [['3600000','1 Stunde'],['86400000','24 Stunden'],['604800000','7 Tage']].forEach(([value,labelText]) => timeoutChoice.add(new Option(labelText,value)));
      const timeout = document.createElement('button'); timeout.type = 'button'; timeout.className = 'moderation-button'; timeout.textContent = 'Timeout'; timeout.disabled = Boolean(profile.is_banned);
      timeout.addEventListener('click', async () => {
        timeout.disabled = true;
        const suspendedUntil = new Date(Date.now() + Number(timeoutChoice.value)).toISOString();
        const { error } = await authClient.rpc('set_user_access', { p_user_id: profile.id, p_is_banned: false, p_suspended_until: suspendedUntil });
        teamStatus.textContent = error ? 'Änderung nicht gespeichert. Prüfe die Supabase-Update-Datei.' : `Timeout gesetzt bis ${new Date(suspendedUntil).toLocaleString('de-DE')}.`;
        await loadTeamData();
      });
      actions.append(ban, timeoutChoice, timeout);
      if (suspended && !profile.is_banned) {
        const restore = document.createElement('button'); restore.type = 'button'; restore.className = 'moderation-button is-restore'; restore.textContent = 'Timeout beenden';
        restore.addEventListener('click', async () => {
          restore.disabled = true;
          const { error } = await authClient.rpc('set_user_access', { p_user_id: profile.id, p_is_banned: false, p_suspended_until: null });
          teamStatus.textContent = error ? 'Timeout konnte nicht beendet werden. Prüfe die Supabase-Update-Datei.' : 'Timeout wurde beendet.';
          await loadTeamData();
        });
        actions.append(restore);
      }
      row.append(details, actions);
      return row;
    }));
    const f12Cases = profiles.filter((profile) => profile.f12_soft_banned_at || profile.f12_banned_at);
    f12Status.textContent = f12Cases.length
      ? `${f12Cases.length} ${f12Cases.length === 1 ? 'Konto' : 'Konten'} mit erfasster F12-Sperre.`
      : 'Noch keine F12-Soft-Bans oder F12-Bans erfasst.';
    f12Users.replaceChildren(...f12Cases.map((profile) => {
      const row = document.createElement('article'); row.className = 'team-user-row f12-case-row';
      const details = document.createElement('div'); details.className = 'team-user-details';
      const title = document.createElement('div'); title.className = 'team-user-title';
      const displayName = document.createElement('b'); displayName.textContent = profile.display_name || 'Name noch nicht verfügbar';
      const provider = document.createElement('span'); provider.className = 'team-provider';
      provider.textContent = ({ discord: 'Discord', twitch: 'Twitch', email: 'E-Mail' })[profile.auth_provider] || profile.auth_provider || 'Unbekannt';
      title.append(displayName, provider);
      const id = document.createElement('code'); id.textContent = `ID: ${profile.id}`;
      const labels = document.createElement('div'); labels.className = 'f12-case-labels';
      if (profile.f12_soft_banned_at) {
        const soft = document.createElement('span'); soft.className = 'f12-case-label is-soft';
        soft.textContent = `F12-Soft-Ban seit ${new Date(profile.f12_soft_banned_at).toLocaleString('de-DE')}`; labels.append(soft);
      }
      if (profile.f12_banned_at) {
        const banned = document.createElement('span'); banned.className = 'f12-case-label';
        banned.textContent = `F12-Ban seit ${new Date(profile.f12_banned_at).toLocaleString('de-DE')}`; labels.append(banned);
      }
      details.append(title, id, labels);
      const actions = document.createElement('div'); actions.className = 'f12-case-actions';
      const addLiftButton = (label, rpcName, successText) => {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'moderation-button is-restore'; button.textContent = label;
        button.addEventListener('click', async () => {
          button.disabled = true;
          const { error } = await authClient.rpc(rpcName, { p_user_id: profile.id });
          teamStatus.textContent = error ? 'F12-Sperre konnte nicht aufgehoben werden. Prüfe die aktualisierte Supabase-Moderationsdatei.' : successText;
          await loadTeamData();
        });
        actions.append(button);
      };
      if (profile.f12_soft_banned_at) addLiftButton('F12-Soft-Ban aufheben', 'clear_user_f12_soft_ban', 'F12-Soft-Ban wurde aufgehoben.');
      if (profile.f12_banned_at) addLiftButton('F12-Ban aufheben', 'clear_user_f12_ban', 'F12-Ban wurde aufgehoben.');
      row.append(details, actions);
      return row;
    }));
    siteMode = settings.rebuild_mode ? 'rebuild' : settings.maintenance_mode ? 'maintenance' : 'off';
    maintenanceUntil = settings.maintenance_until;
    workMode.value = siteMode;
    maintenanceHoursInput.disabled = siteMode !== 'maintenance';
    if (maintenanceUntil) {
      const hoursLeft = Math.ceil((Date.parse(maintenanceUntil) - Date.now()) / 3600000);
      maintenanceHoursInput.value = hoursLeft > 0 ? String(Math.min(720, hoursLeft)) : '';
    } else maintenanceHoursInput.value = '';
    applyMaintenance();
  }

  async function openTeam() {
    if (!isAdmin) return;
    if (!teamDialog.open) teamDialog.showModal();
    await loadTeamData();
  }

  async function sendSponsorAnnouncement() {
    if (!sendSponsorAd) {
      console.error('[Aircraft Archive] Werbe-Button #sendSponsorAd wurde nicht gefunden.');
      return;
    }
    if (sponsorSendStatus) {
      sponsorSendStatus.hidden = false;
      sponsorSendStatus.style.display = 'block';
      sponsorSendStatus.textContent = 'Werbe-Button erkannt. Prüfe Team-Berechtigung …';
    }
    if (!isAdmin || !currentUser || !authClient) {
      if (sponsorSendStatus) sponsorSendStatus.textContent = 'Du musst mit einem berechtigten Team-Konto angemeldet sein.';
      return;
    }
    if (sponsorSelect?.value !== 'novium') {
      if (sponsorSendStatus) sponsorSendStatus.textContent = 'Bitte wähle zuerst einen Sponsor aus.';
      return;
    }

    sendSponsorAd.disabled = true;
    if (sponsorSendStatus) sponsorSendStatus.textContent = 'Verbinde mit dem Werbekanal …';
    let channel = null;
    let timeoutId = null;
    try {
      channel = authClient.channel('aircraft-archive-sponsor-announcements', {
        config: { broadcast: { self: false } }
      });

      await new Promise((resolve, reject) => {
        let settled = false;
        const finish = (fn, value) => {
          if (settled) return;
          settled = true;
          if (timeoutId) window.clearTimeout(timeoutId);
          fn(value);
        };

        timeoutId = window.setTimeout(() => {
          finish(reject, new Error('Zeitüberschreitung: Supabase Realtime antwortet nicht.'));
        }, 10000);

        channel.subscribe(async status => {
          if (status === 'SUBSCRIBED') {
            if (sponsorSendStatus) sponsorSendStatus.textContent = 'Sende die Werbung an verbundene Besucher …';
            try {
              const result = await channel.send({
                type: 'broadcast',
                event: 'show-sponsor',
                payload: { sponsor: 'novium', sentAt: Date.now() }
              });
              if (result === 'ok') finish(resolve, result);
              else finish(reject, new Error(`Supabase hat die Werbung nicht bestätigt (${String(result)}).`));
            } catch (error) {
              finish(reject, error);
            }
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            finish(reject, new Error(`Realtime-Kanalstatus: ${status}`));
          }
        });
      });

      if (sponsorSendStatus) sponsorSendStatus.textContent = 'Novium-Werbung wurde gesendet. Verbundene Besucher ohne Team-Berechtigung sehen das Fenster.';
    } catch (error) {
      console.error('[Aircraft Archive] Sponsor-Werbung konnte nicht gesendet werden:', error);
      if (sponsorSendStatus) sponsorSendStatus.textContent = 'Senden fehlgeschlagen. Bitte prüfe die Internetverbindung und ob Supabase Realtime für dieses Projekt funktioniert.';
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (channel && authClient) {
        try { await authClient.removeChannel(channel); } catch (_) {}
      }
      sendSponsorAd.disabled = false;
    }
  }

  // Capture the click explicitly so other UI handlers cannot swallow it.
  // The status message is updated immediately, making failures visible to the admin.
  if (sendSponsorAd) {
    sendSponsorAd.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      void sendSponsorAnnouncement();
    }, true);
  }
  window.sendNoviumSponsorAnnouncement = sendSponsorAnnouncement;

  function listenForSponsorAnnouncements() {
    if (!authClient || sponsorBroadcastChannel) return;
    sponsorBroadcastChannel = authClient.channel('aircraft-archive-sponsor-announcements');
    sponsorBroadcastChannel.on('broadcast', { event: 'show-sponsor' }, async ({ payload }) => {
      if (payload?.sponsor !== 'novium') return;
      // Admins and anyone who can see the private Team panel must never see the ad.
      // For signed-in users, fail closed if the admin check cannot be completed.
      if (currentUser) {
        try {
          const { data, error } = await authClient.rpc('is_site_admin');
          if (error || data === true) return;
        } catch (_) {
          return;
        }
      }
      window.showNoviumSponsorDialog?.({ force: true });
    }).subscribe();
  }

  saveWorkMode.addEventListener('click', async () => {
    if (!isAdmin || !authClient) return;
    saveWorkMode.disabled = true;
    const mode = workMode.value;
    const hoursText = mode === 'maintenance' ? maintenanceHoursInput.value.trim() : '';
    const hours = hoursText ? Number(hoursText) : null;
    if (hoursText && (!Number.isInteger(hours) || hours < 1 || hours > 720)) {
      teamStatus.textContent = 'Bitte gib eine Wartungsdauer zwischen 1 und 720 Stunden ein.';
      saveWorkMode.disabled = false;
      return;
    }
    const until = hours ? new Date(Date.now() + hours * 3600000).toISOString() : null;
    const { error } = await authClient.from('site_settings').update({ maintenance_mode: mode === 'maintenance', rebuild_mode: mode === 'rebuild', maintenance_until: until }).eq('id', 1);
    if (error) {
      teamStatus.textContent = 'Änderung wurde nicht gespeichert. Bitte aktualisiere die Supabase-Einrichtung über die SQL-Datei.';
    } else {
      siteMode = mode; maintenanceUntil = until; applyMaintenance();
      teamStatus.textContent = mode === 'maintenance' ? (until ? 'Wartungsmodus mit Countdown ist eingeschaltet.' : 'Wartungsmodus ist eingeschaltet. Es wurde kein Endzeitpunkt gesetzt.') : mode === 'rebuild' ? 'Umbau-Modus ist eingeschaltet. Er bleibt aktiv, bis du ihn beendest.' : 'Website ist wieder für alle sichtbar.';
    }
    saveWorkMode.disabled = false;
  });

  function renderUser(user) {
    const identityChanged = currentUser?.id !== user?.id;
    currentUser = user || null;
    if (identityChanged && profileChannel) { authClient.removeChannel(profileChannel); profileChannel = null; }
    if (identityChanged) { userIsBanned = false; userBanReason = null; userSuspendedUntil = null; userF12SoftBannedAt = null; }
    if (user) {
      if (autoOpenTimer) window.clearTimeout(autoOpenTimer);
      if (dialog.open) dialog.close();
      if (identityChanged) {
        syncProfileIdentity(user); refreshUserBlock();
        profileChannel = authClient.channel(`profile-access:${user.id}`).on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` }, ({ new: profile }) => {
          const hadF12SoftBan = Boolean(userF12SoftBannedAt);
          userIsBanned = Boolean(profile.is_banned); userBanReason = profile.ban_reason; userSuspendedUntil = profile.suspended_until; userF12SoftBannedAt = profile.f12_soft_banned_at; applyUserBlock();
          if (userIsBanned) window.dispatchEvent(new Event('aircraft-wiki:clear-f12-soft-ban'));
          else if (userF12SoftBannedAt && !isAdmin) window.dispatchEvent(new Event('aircraft-wiki:server-soft-ban-active'));
          else if (hadF12SoftBan && !userF12SoftBannedAt) window.dispatchEvent(new Event('aircraft-wiki:clear-f12-soft-ban'));
        }).subscribe();
      }
      const displayName = getAccountIdentity(user).displayName;
      message.textContent = 'Du bist mit deinem Aircraft-Archive-Konto angemeldet.';
      providers.hidden = true; emailForm.hidden = true; userBox.hidden = false;
      name.textContent = displayName; email.textContent = user.email || 'Angemeldet';
      avatar.textContent = displayName.trim().charAt(0).toUpperCase() || 'A';
      label.textContent = displayName.split(/\s+/)[0].slice(0, 14).toUpperCase();
    } else {
      userIsBanned = false; userBanReason = null; userSuspendedUntil = null; userF12SoftBannedAt = null; applyUserBlock();
      message.textContent = 'Für den Zugang zum Flugzeug-Wiki musst du dich anmelden.';
      providers.hidden = false; emailForm.hidden = false; userBox.hidden = true;
      label.textContent = 'ANMELDEN';
    }
    applyLoginGate();
    checkAdmin();
    // After login, show the sponsor window to ordinary users only, never to team admins.
    if (user && identityChanged) {
      window.setTimeout(async () => {
        await checkAdmin();
        if (!isAdmin) window.showNoviumSponsorDialog?.();
      }, 250);
    }
    let recordedF12Presses = 0;
    try { recordedF12Presses = Number(sessionStorage.getItem('aircraftWikiF12Presses')) || 0; } catch (_) {}
    if (currentUser && (secondF12BanPending || recordedF12Presses >= 2)) { secondF12BanPending = false; void applySecondF12Ban(); }
    else if (currentUser && (firstF12SoftBanPending || (recordedF12Presses === 1 && !userF12SoftBannedAt))) { firstF12SoftBanPending = false; void recordFirstF12SoftBan(); }
    if (!user) promptGuestAfterLoading();
  }

  function promptGuestAfterLoading() {
    if (autoOpenTimer) window.clearTimeout(autoOpenTimer);
    autoOpenTimer = window.setTimeout(() => { if (!currentUser) show(); }, Math.max(0, 3450 - performance.now()));
  }

  const params = new URLSearchParams(`${window.location.search}&${window.location.hash.slice(1)}`);
  const authError = params.get('error_description');
  if (authError) {
    notice.textContent = `Anmeldung fehlgeschlagen: ${authError.replace(/\+/g, ' ')}`;
    history.replaceState(null, '', `${location.pathname}`);
  }

  if (!configured) {
    notice.textContent = 'Der Anmeldedienst muss noch in Supabase eingerichtet werden. Details stehen in README.txt.';
    applyLoginGate();
    promptGuestAfterLoading(); return;
  }
  if (!window.supabase?.createClient) {
    notice.textContent = 'Der Anmeldedienst konnte nicht geladen werden. Bitte versuche es später erneut.';
    applyLoginGate();
    promptGuestAfterLoading(); return;
  }

  moveAuthSession(rememberMe.checked);
  authClient = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: { storage: supabaseAuthStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  listenForSponsorAnnouncements();
  loadMaintenance();
  authClient.auth.getSession().then(({ data, error }) => {
    if (error) notice.textContent = 'Dein Anmeldestatus konnte nicht geladen werden.';
    renderUser(data?.session?.user || null);
    if (!data?.session?.user) promptGuestAfterLoading();
  });
  authClient.auth.onAuthStateChange((_event, session) => renderUser(session?.user || null));
  profileRefreshTimer = window.setInterval(() => { if (currentUser) refreshUserBlock(); }, 12000);

  for (const button of providers.querySelectorAll('[data-provider]')) {
    button.addEventListener('click', async () => {
      if (location.protocol === 'file:') { notice.textContent = 'Die Anmeldung funktioniert über den veröffentlichten Website-Link.'; return; }
      notice.textContent = '';
      for (const item of providers.querySelectorAll('button')) item.disabled = true;
      const oauthOptions = { redirectTo: `${location.origin}${location.pathname}` };
      if (button.dataset.provider === 'twitch') oauthOptions.scopes = 'user:read:email';
      const { error } = await authClient.auth.signInWithOAuth({ provider: button.dataset.provider, options: oauthOptions });
      if (error) {
        const providerName = button.dataset.provider === 'discord' ? 'Discord' : 'Twitch';
        notice.textContent = `${providerName}-Anmeldung nicht verfügbar. Prüfe, ob ${providerName} in Supabase aktiviert und gespeichert ist.`;
        for (const item of providers.querySelectorAll('button')) item.disabled = false;
      }
    });
  }

  emailForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    notice.textContent = '';
    const username = emailUsername.value.trim();
    if (emailAction === 'signup' && username.length < 2) {
      notice.textContent = 'Bitte gib einen Nutzernamen mit mindestens 2 Zeichen an.';
      emailUsername.focus();
      return;
    }
    emailSubmit.disabled = true;
    const credentials = { email: emailField.value.trim(), password: passwordField.value };
    const result = emailAction === 'signup'
      ? await authClient.auth.signUp({ ...credentials, options: { data: { username }, emailRedirectTo: `${location.origin}${location.pathname}` } })
      : await authClient.auth.signInWithPassword(credentials);
    emailSubmit.disabled = false;
    if (result.error) {
      notice.textContent = emailAction === 'signup' ? 'Konto konnte nicht erstellt werden. Prüfe E-Mail und Passwort.' : 'Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort.';
    } else if (emailAction === 'signup' && !result.data.session) {
      notice.textContent = 'Fast geschafft: Bitte bestätige deine E-Mail über den Link in deinem Postfach.';
    } else {
      notice.textContent = 'E-Mail-Konto ist angemeldet.';
      emailForm.reset();
    }
  });

  document.getElementById('signOutButton').addEventListener('click', async () => {
    const { error } = await authClient.auth.signOut();
    notice.textContent = error ? 'Abmelden hat nicht geklappt. Bitte versuche es erneut.' : 'Du wurdest abgemeldet.';
  });

  authClient.channel('public:site_settings').on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, ({ new: row }) => {
    if (row && typeof row.maintenance_mode === 'boolean') {
      siteMode = row.rebuild_mode ? 'rebuild' : row.maintenance_mode ? 'maintenance' : 'off';
      maintenanceUntil = row.maintenance_until;
      applyMaintenance();
    }
  }).subscribe();
  countdownTimer = window.setInterval(() => { applyMaintenance(); applyUserBlock(); }, 1000);
})();
