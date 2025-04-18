// Interface for calendar events
interface CalendarEvent {
    title: string;
    start: string;
  }
  
  // Class to handle the calendar functionality
  class EventCalendar {
    private calendarElement: HTMLElement | null;
    
    constructor(elementId: string) {
      this.calendarElement = document.getElementById(elementId);
    }
    
    // Initialize the calendar
    initialize(): void {
      if (!this.calendarElement) return;
      
      // Fetch events from the server
      fetch('/api/events')
        .then(response => response.json())
        .then(events => this.renderCalendar(events))
        .catch(error => console.error('Error fetching events:', error));
    }
    
    // Render the calendar with events
    private renderCalendar(events: CalendarEvent[]): void {
      if (!this.calendarElement) return;
      
      // Create a new FullCalendar instance
      // @ts-ignore (FullCalendar is loaded from CDN)
      const calendar = new FullCalendar.Calendar(this.calendarElement, {
        initialView: 'dayGridMonth',
        events: events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        eventClick: (info: any) => {
          // Show event details when clicked
          alert(`Event: ${info.event.title}`);
        }
      });
      
      // Render the calendar
      calendar.render();
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    const calendar = new EventCalendar('calendar');
    calendar.initialize();
  });