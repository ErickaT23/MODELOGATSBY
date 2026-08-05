function waitForRSVPDatabase(timeoutMs) {
    const maxWait = typeof timeoutMs === 'number' ? timeoutMs : 8000;
    const startedAt = Date.now();

    return new Promise(function(resolve, reject) {
        const timer = window.setInterval(function() {
            if (window.RSVPDatabase) {
                window.clearInterval(timer);
                resolve(window.RSVPDatabase);
                return;
            }

            if (Date.now() - startedAt >= maxWait) {
                window.clearInterval(timer);
                reject(new Error('No se pudo inicializar window.RSVPDatabase.'));
            }
        }, 60);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const eventId = String(window.config && window.config.event && window.config.event.defaultEventId || 'marioroberto2027').trim() || 'marioroberto2027';
    const eventIdEl = document.getElementById('event-id');
    const eventPathEl = document.getElementById('event-path');
    const statusEl = document.getElementById('seed-status');
    const outputEl = document.getElementById('seed-output');
    const seedBtn = document.getElementById('btn-seed');
    const checkBtn = document.getElementById('btn-check');

    if (eventIdEl) eventIdEl.textContent = eventId;
    if (eventPathEl) eventPathEl.textContent = 'eventos/' + eventId;

    function setStatus(message, type) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.className = 'status' + (type ? ' ' + type : '');
    }

    function setOutput(value) {
        if (!outputEl) return;
        outputEl.textContent = typeof value === 'string'
            ? value
            : JSON.stringify(value, null, 2);
    }

    async function getDatabase() {
        return waitForRSVPDatabase(10000);
    }

    async function verifyConnection() {
        setStatus('Verificando Firebase...', '');
        checkBtn.disabled = true;

        try {
            const db = await getDatabase();
            const config = await db.getEventConfig(eventId);
            setStatus('Firebase respondió correctamente.', 'ok');
            setOutput({
                ok: true,
                eventId: eventId,
                configExists: Boolean(config),
                configPreview: config
            });
        } catch (error) {
            console.error(error);
            setStatus('Falló la verificación con Firebase.', 'error');
            setOutput({
                ok: false,
                eventId: eventId,
                error: error && error.message ? error.message : String(error)
            });
        } finally {
            checkBtn.disabled = false;
        }
    }

    async function runSeed() {
        setStatus('Creando config, invitados, RSVP y deseos...', '');
        seedBtn.disabled = true;
        checkBtn.disabled = true;

        try {
            const db = await getDatabase();
            if (typeof db.clearEventConfigMigrationMark === 'function') {
                db.clearEventConfigMigrationMark(eventId);
            }

            const configResult = await db.seedEventConfigToFirebase(eventId, { force: true });
            const dataResult = await db.seedEventData(eventId, { force: true });

            setStatus('Seed ejecutado correctamente.', 'ok');
            setOutput({
                config: configResult,
                data: dataResult,
                eventBasePath: typeof db.getEventBasePath === 'function' ? db.getEventBasePath(eventId) : 'eventos/' + eventId
            });
        } catch (error) {
            console.error(error);
            setStatus('No se pudo crear el seed en Firebase.', 'error');
            setOutput({
                ok: false,
                eventId: eventId,
                error: error && error.message ? error.message : String(error)
            });
        } finally {
            seedBtn.disabled = false;
            checkBtn.disabled = false;
        }
    }

    if (checkBtn) {
        checkBtn.addEventListener('click', verifyConnection);
    }

    if (seedBtn) {
        seedBtn.addEventListener('click', runSeed);
    }
});
