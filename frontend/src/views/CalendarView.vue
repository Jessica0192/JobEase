<template>
  <div>
    <div v-if="notificationMessage.length">
      <h4>Event Reminder:</h4>
      <ul>
        <li v-for="(message, index) in notificationMessage" :key="index">{{ message }}</li>
      </ul>
    </div>
    <FullCalendar :options="calendarOptions" />
    <dialog v-if="showPopup" class="popup">
      <div class="popup-content">
        <a href="#!" @click="showPopup = false" title="close">
          <i class="fas fa-times close-icon" aria-hidden="true"></i>
        </a>
        <h3>Add Event</h3>
        <label for="title">Title</label>
        <input type="text" v-model="eventTitle" id="title" />
        <label for="startDate">Start Date</label>
        <input type="date" v-model="eventStartDate" id="startDate" />
        <label for="startTime">Start Time</label>
        <input type="time" v-model="eventStartTime" id="startTime" />
        <label for="endDate">End Date</label>
        <input type="date" v-model="eventEndDate" id="endDate" />
        <label for="endTime">End Time</label>
        <input type="time" v-model="eventEndTime" id="endTime" />
        <div>
          <input type="checkbox" v-model="shouldNotify" id="shouldNotify" />
          <label for="shouldNotify">Notify me</label>
        </div>
        <button @click="addEvent">Add Event</button>
      </div>
    </dialog>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: []
      },
      showPopup: false,
      eventTitle: '',
      eventStartDate: '',
      eventEndDate: '',
      eventStartTime: '',
      eventEndTime: '',
      shouldNotify: false,
      notificationMessage: []
    }
  },
  methods: {
    handleDateClick: function(arg) {
      this.showPopup = true
      this.eventTitle = ''
      this.eventStartDate = arg.dateStr
      this.eventEndDate = arg.dateStr
      this.eventStartTime = new Date().toLocaleTimeString('en-US', {hour12: false})
      this.eventEndTime = new Date().toLocaleTimeString('en-US', {hour12: false})
    },
    addEvent: function() {
      // Check if notification permission has been granted
      if (Notification.permission !== 'granted') {
        // Request permission if it hasn't been granted
        Notification.requestPermission().then(function(permission) {
          if (permission !== 'granted') {
            this.notificationMessage = 'You need to grant notification permission to receive event reminders.';
          } else {
            this.notificationMessage = 'Notification permission granted.';
          }
        }.bind(this));
      }

      const newEvent = {
        title: this.eventTitle,
        start: new Date(this.eventStartDate + 'T' + this.eventStartTime).toISOString(),
        end: new Date(this.eventEndDate + 'T' + this.eventEndTime).toISOString(),
        notified: false
      };

      this.calendarOptions.events.push(newEvent);
      this.showPopup = false;

      // Calculate the time difference between the event start time and the current time
      let eventStartTime = new Date(newEvent.start);
      let currentTime = new Date();
      let timeDifference = (eventStartTime.getTime() - currentTime.getTime()) / 1000;
      timeDifference /= (60 * 60);
      const notificationTime = Math.abs(Math.round(timeDifference));

      if (notificationTime <= 24) {
        setTimeout(function() {
          Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
              new Notification('Event reminder', {
                body: 'Your event "' + newEvent.title + '" is tomorrow!'
              });
              var eventTime = new Date(newEvent.start).toLocaleTimeString();
              this.notificationMessage.push ('Your event " ' + newEvent.title.toUpperCase() + '" at: '+ eventTime + ' is tomorrow! Do not miss it!');
            } else {
              this.notificationMessage = 'Notification permission denied.';
            }
          }.bind(this));
        }.bind(this), notificationTime);
      }
    }
  }
}
</script>

<style scoped>

  li {
    list-style: none; /* remove bullet point */
    color: rgb(177, 2, 2); /* change color to red */
  }
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-content input[type="text"],
  .popup-content input[type="date"] {
    margin-bottom: 10px;
  }

  .popup-content {
    position: relative;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .popup-content h3 {
    margin-top: 0;
  }
  
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .close-icon:hover {
    color: red;
  }

</style>
