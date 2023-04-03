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
    await this.isUserSignedInGoogle()
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
      currentEventId: '',
      isAuthenticatedByGoogle: false,
      shouldDisableFormFields: false
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
      this.currentEventId = '';
    },
    eventClick: function(info) {
      // Set the form values to the clicked event's properties
      const jobRecordId = info.event._def.extendedProps.job_record_id;
      if(jobRecordId != null){
        this.shouldDisableFormFields = true
      }else{
        this.shouldDisableFormFields = false
      }
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
    addEvent: async function() {
      if (!this.eventTitle) {
        alert('Please enter a title for the event.');
        return;
      }

      // Parse the start and end dates and times as Date objects
      const startDate = new Date(this.eventStartDate + 'T' + this.eventStartTime);
      const endDate = new Date(this.eventEndDate + 'T' + this.eventEndTime);

      // Validate the start and end dates
      if (startDate > endDate) {
        alert('The start date cannot be later than the end date.');
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
      const existingEvent = this.calendarOptions.events.find(event => event.id == this.currentEventId);
      if (existingEvent) {
        // Update the existing event with new data
        existingEvent.title = this.eventTitle,
        existingEvent.start = `${yearStart}-${monthStart.toString().padStart(2, '0')}-${dayStart.toString().padStart(2, '0')}T${hourStart.toString().padStart(2, '0')}:${minuteStart.toString().padStart(2, '0')}:${secondStart.toString().padStart(2, '0')}`;
        existingEvent.end = `${yearEnd}-${monthEnd.toString().padStart(2, '0')}-${dayEnd.toString().padStart(2, '0')}T${hourEnd.toString().padStart(2, '0')}:${minuteEnd.toString().padStart(2, '0')}:${secondEnd.toString().padStart(2, '0')}`;
        existingEvent.location = this.eventLocation;
        existingEvent.note = this.eventNote;
        existingEvent.notification = this.shouldNotify ? 1 : 0;

        await eventApi.updateEvent(existingEvent.id, existingEvent).then(() => {this.showPopup = false})
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

        
        await eventApi.createEvent(newEvent).then(respond => {
        newEvent.id = respond.data.id
        this.calendarOptions.events.push(newEvent);
        this.scheduleNotification(newEvent)
        this.showPopup = false})
      }
      
      // this.showPopup = false;
    },
    async signInGoogle() {
      await eventApi.authenticateGoogleCalendar().then(response => {
        if (response.status == 200){
          window.location.href = response.data
        }
      })
    },
    async revokeGoogleCredentials() {
      await eventApi.revokeGoogleCredentials().then(response => {
        if (response.status == 200){
          window.location.reload()
          alert("Successfully revoked Google credentials!")
        }
      })
    },
    async syncGoogleCalendar() {
      await eventApi.syncCalendar().then(response => {
        if (response.status == 200){
          alert("Calendar synchronization succeeded")
        } else {
          alert("Calendar synchronization failed!")
        }
      })
    },
    async isUserSignedInGoogle() {
      await eventApi.isUserAuthenticatedByGoogle().then(response => {
        if (response.status == 200){
          this.isAuthenticatedByGoogle = response.data
        }
      })
    }
  }
}