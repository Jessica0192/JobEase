import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { eventApi } from '../../src/services/EventApi'

export default {
  components: {
    FullCalendar
  },
  async mounted () {
    await this.loadEvents()
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: this.eventClick,
        events: []
      },
      showPopup: false,
      eventTitle: '',
      eventStartDate: '',
      eventEndDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventLocation: '',
      eventNote:'',
      shouldNotify: false,
      notificationMessages: [],
      removeSelectedEvent: false,
      currentEventId: ''
    }
  },
  methods: {
    handleDateClick: function(arg) {
      this.showPopup = true;
      this.eventTitle = '';
      this.eventStartDate = arg.dateStr;
      this.eventEndDate = arg.dateStr;

      this.eventStartTime = new Date().toLocaleTimeString('en-US', {hour12: false});
      this.eventEndTime = new Date().toLocaleTimeString('en-US', {hour12: false});

      this.eventLocation = '';
      this.eventNote = '';
    },
    eventClick: function(info) {
      // Set the form values to the clicked event's properties
      this.eventTitle = info.event.title;
      this.eventStartDate = info.event.startStr.substr(0, 10);
      this.eventEndDate = (info.event.endStr || info.event.startStr).substr(0, 10);      
      this.eventStartTime = info.event.start.toLocaleTimeString('en-US', {hour12: false});
      this.eventEndTime = (info.event.end || info.event.start).toLocaleTimeString('en-US', {hour12: false});
      this.eventLocation = info.event._def.extendedProps.location
      this.eventNote = info.event._def.extendedProps.note
      this.currentEventId = info.event.id

      if (info.event._def.extendedProps.notification == 1) {
        this.shouldNotify = true
      } else {
        this.shouldNotify = false
      }
       
      // Set the showPopup property to true to open the dialog
      this.showPopup = true;
    },
    async loadEvents () {
      try {
        const events = await eventApi.getAllEvents()
        this.calendarOptions.events = events.data

        for (let i=0; i < this.calendarOptions.events.length; i++) {
          if (this.calendarOptions.events[i].notification == 1) {
            this.scheduleNotification(this.calendarOptions.events[i]);
          }
        }

      } catch (error) {
        console.error('Error loading events', error)
      }
    },
    async removeEvent(eventId) {
      let calendarApi = this.$refs.myCalendar.getApi();
      let event = calendarApi.getEventById(eventId);

      if (event) {       
        let index = -1
        for (let i=0; i< this.calendarOptions.events.length; i++) {
          if (this.calendarOptions.events[i].id == eventId) {
            index = i
            break
          }
        }        

        if (index !== -1) {
          this.calendarOptions.events.splice(index, 1);
        }

        await eventApi.deleteEvent(eventId)
        event.remove();

        // Remove the notification message associated with the deleted event
        for (let i=0; i< this.notificationMessages.length; i++) {
          if (this.notificationMessages[i].id == eventId) {
            this.notificationMessages.splice(i, 1);
            break
          }
        }
        
        this.showPopup = false;
      }
    },
    scheduleNotification: function(newEvent) {
      // Check if notification permission has been granted
      if (Notification.permission !== 'granted') {
        // Request permission if it hasn't been granted
        Notification.requestPermission().then(function(permission) {
          if (permission !== 'granted') {
            alert('You need to grant notification permission to receive event reminders.');
          } else {
            alert('Notification permission granted.');
          }
        }.bind(this));
      }

      if (!this.notificationMessages) {
        this.notificationMessages = [];
      }

      // Calculate the time difference between the event start time and the current time
      let eventStartTime = new Date(newEvent.start);
      let currentTime = new Date();
      let timeDifference = (eventStartTime.getTime() - currentTime.getTime()) / 1000;
      timeDifference /= (60 * 60);
      const notificationTime = Math.abs(Math.round(timeDifference));

      if (notificationTime <= 24 && newEvent.notification == 1) {
        setTimeout(function() {
          Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
              new Notification('JobEase Event Reminder', {
                body: 'Your event "' + newEvent.title + '" is due soon!'
              });
              var eventTime = new Date(newEvent.start).toLocaleTimeString();
              this.notificationMessages.push({
                id: newEvent.id,
                message: 'Your event " ' + newEvent.title.toUpperCase() + ' at '+ eventTime + ' " is due soon! Do not miss it!'
              });
            } else {
              alert('Notification permission denied.');
            }
          }.bind(this));
        }.bind(this), notificationTime);
      }
    },
    addEvent: function() {
      if (!this.eventTitle) {
        alert('Please enter a title for the event.');
        return;
      }

      const inputDateStart = new Date(`${this.eventStartDate}T${this.eventStartTime}`);
      const yearStart = inputDateStart.getFullYear();
      const monthStart = inputDateStart.getMonth() + 1;
      const dayStart = inputDateStart.getDate();
      const hourStart = inputDateStart.getHours();
      const minuteStart = inputDateStart.getMinutes();
      const secondStart = inputDateStart.getSeconds();

      const inputDateEnd = new Date(`${this.eventEndDate}T${this.eventEndTime}`);
      const yearEnd = inputDateEnd.getFullYear();
      const monthEnd = inputDateEnd.getMonth() + 1;
      const dayEnd = inputDateEnd.getDate();
      const hourEnd = inputDateEnd.getHours();
      const minuteEnd = inputDateEnd.getMinutes();
      const secondEnd = inputDateEnd.getSeconds();

      // Check if the event already exists
      const existingEvent = this.calendarOptions.events.find(event => event.title === this.eventTitle);
      if (existingEvent) {
        // Update the existing event with new data
        existingEvent.start = `${yearStart}-${monthStart.toString().padStart(2, '0')}-${dayStart.toString().padStart(2, '0')}T${hourStart.toString().padStart(2, '0')}:${minuteStart.toString().padStart(2, '0')}:${secondStart.toString().padStart(2, '0')}`;
        existingEvent.end = `${yearEnd}-${monthEnd.toString().padStart(2, '0')}-${dayEnd.toString().padStart(2, '0')}T${hourEnd.toString().padStart(2, '0')}:${minuteEnd.toString().padStart(2, '0')}:${secondEnd.toString().padStart(2, '0')}`;
        existingEvent.location = this.eventLocation;
        existingEvent.note = this.eventNote;
        existingEvent.notification = this.shouldNotify ? 1 : 0;

        eventApi.updateEvent(existingEvent.id, existingEvent);
        
      } else {
        // Create a new event
        const newEvent = {
          title: this.eventTitle,
          start: `${yearStart}-${monthStart.toString().padStart(2, '0')}-${dayStart.toString().padStart(2, '0')}T${hourStart.toString().padStart(2, '0')}:${minuteStart.toString().padStart(2, '0')}:${secondStart.toString().padStart(2, '0')}`,
          end: `${yearEnd}-${monthEnd.toString().padStart(2, '0')}-${dayEnd.toString().padStart(2, '0')}T${hourEnd.toString().padStart(2, '0')}:${minuteEnd.toString().padStart(2, '0')}:${secondEnd.toString().padStart(2, '0')}`,
          location: this.eventLocation,
          note: this.eventNote,
          notification: this.shouldNotify ? 1 : 0
        };

        this.calendarOptions.events.push(newEvent);
        eventApi.createEvent(newEvent)

        this.scheduleNotification(newEvent);
      }
      
      this.showPopup = false;
      //location.reload()
    }
  }
}