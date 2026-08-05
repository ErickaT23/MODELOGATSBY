const config = {
    event: {
        defaultEventId: "marioroberto2027",
        eventIdParam: "eventId",
        eventDate: "2027-08-02T20:00:00",
        eventName: "Mario Roberto",
        maxGuests: 6,
        legacyFallback: {
            read: false,
            write: false,
            subscribe: false
        }
    },

    admin: {
        adminKey: "twodesign123",
        keyParam: "key",
        legacyKeyParam: "admin"
    },

    seo: {
        titulo: "Mario Roberto",
        descripcion: "Celebremos juntos sus 65 años",
        autor: "Two Design"
    },

    pareja: {
        nombres: "Mario Roberto",
        fecha: "02-08-2027",
        fechaVisible: "02.08.2027"
    },

    musica: {
        titulo: "Nuestra Canción",
        archivo: "audio/cancion.mp3"
    },

    evento: {
        recepcion: {
            titulo: "Recepción",
            lugar: "Charleston Antigua",
            hora: "8:00 PM",
            direccion: "6a Avenida Norte 1, Antigua Guatemala",
            ubicacionUrl: "https://maps.app.goo.gl/b6E9c3MDqrjuk1768"
        }
    },

    textos: {
        mensajeInvitado: "Tu presencia hace este momento aún más memorable",
        mensajePases: "Hemos reservado para ti {pases}"
    },

    footer: {
        hashtag: "#MarioRoberto65",
        instagramUrl: "https://instagram.com/thetwodesign",
        facebookUrl: "https://facebook.com/thetwodesign",
        marcaTexto: "Diseño",
        marcaNombre: "Two Design",
        marcaUrl: "https://twodesign.com"
    }
};

window.config = config;
