 document.addEventListener('DOMContentLoaded', function () {
    // Consultorios
    const calendarEl1 = document.getElementById('calendar-consultorios');
    const calendar1 = new FullCalendar.Calendar(calendarEl1, {
      initialView: 'dayGridMonth',
      locale: 'es',
      events: [
        { title: 'Turno Dr. Pérez', start: '2025-10-03' },
        { title: 'Turno Dra. López', start: '2025-10-07' }
      ]
    });
    calendar1.render();

    // Guardia
    const calendarEl2 = document.getElementById('calendar-guardia');
    const calendar2 = new FullCalendar.Calendar(calendarEl2, {
      initialView: 'dayGridMonth',
      locale: 'es',
      events: [
        { title: 'Guardia mañana', start: '2025-10-02' },
        { title: 'Guardia noche', start: '2025-10-05' }
      ]
    });
    calendar2.render();
  });