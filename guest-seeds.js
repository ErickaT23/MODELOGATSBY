(function () {
    const guestDirectorySeed = {
        "1": { nombre: "Carlos Mendez", pases: 2, ninos: 0 },
        "2": { nombre: "Andrea Soto", pases: 1, ninos: 0 },
        "3": { nombre: "Familia Herrera", pases: 3, ninos: 1 },
        "4": { nombre: "Luis y Mariana Perez", pases: 2, ninos: 0 },
        "5": { nombre: "Gabriela Torres", pases: 1, ninos: 0 }
    };

    const guestDirectoriesByEvent = {
        marioroberto2027: guestDirectorySeed
    };

    window.LocalGuestSeeds = {
        ...(window.LocalGuestSeeds || {}),
        ...guestDirectoriesByEvent
    };

    window.getLocalGuestDirectoryForEvent = function (eventId) {
        const safeEventId = String(eventId || "").trim();
        return guestDirectoriesByEvent[safeEventId] || {};
    };
}());
