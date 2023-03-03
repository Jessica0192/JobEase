<template>
  <div>
    <div v-if="notificationMessages.length">
      <h4>Event Reminder:</h4>
      <ul>
        <li v-for="(messageObj, index) in notificationMessages" :key="index">{{ messageObj.message }}</li>
      </ul>
    </div>
    <FullCalendar ref="myCalendar" :options="calendarOptions" />
    <dialog v-if="showPopup" class="popup">
      <div class="popup-content">
        <div style="display: inline-block;">
          <a href="#!" @click="showPopup = false" title="close">
            <i class="fas fa-times close-icon" aria-hidden="true"></i>
          </a>
          <h3>Event Details</h3>
        </div>
        <div style="display: inline-block; margin-top: 10px;">
          <label for="title" style="margin-right: 10px;">Title:</label>
          <input type="text" v-model="eventTitle" id="title" style="padding-left: 5px;"/>
        </div>        
        <div style="display: inline-block;">
          <label for="startDate" style="margin-right: 10px;">Start Date:</label>
          <input type="date" v-model="eventStartDate" id="startDate" style="padding-left: 5px;">
        </div>
        <div style="display: inline-block;">
          <label for="startTime" style="margin-right: 10px;">Start Time:</label>
          <input type="time" v-model="eventStartTime" id="startTime" style="padding-left: 5px;">
        </div>
        <div style="display: inline-block; margin-top: 10px;">
          <label for="endDate" style="margin-right: 10px;">End Date:</label>
          <input type="date" v-model="eventEndDate" id="endDate" style="padding-left: 5px;">
        </div>
        <div style="display: inline-block;">
          <label for="endTime" style="margin-right: 10px;">End Time:</label>
          <input type="time" v-model="eventEndTime" id="endTime" style="padding-left: 5px;">
        </div>        
        <div style="display: inline-block; margin-top: 10px;">
          <label for="title" style="margin-right: 10px;">Location:</label>
          <input type="text" v-model="eventLocation" id="location" style="padding-left: 5px; width: 150px;"/>
        </div>
        <div style="display: flex; flex-direction: column;">
          <label for="title" style="margin-bottom: 5px;">Note:</label>
          <textarea v-model="eventNote" id="note" rows="3" style="padding-left: 5px; overflow: auto;"></textarea>
        </div>
        <div style="display: inline-block;  margin-top: 15px;">
          <input type="checkbox" v-model="shouldNotify" id="shouldNotify" style="margin-right: 10px;"/>
          <label for="shouldNotify">Notify me</label>
        </div>
        <div style="display: inline-block; margin-top: 30px; text-align: center;">
          <button class="addBtn" @click="addEvent">Add Event</button>
          <button class="removeBtn" @click="removeEvent(currentEventId)">Remove</button>
        </div>        
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
    FullCalendar
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
      counter: 1,
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

      // Set the showPopup property to true to open the dialog
      this.showPopup = true;      
    },
    removeEvent(eventId) {
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
    addEvent: function() {
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

      for(let i=0; i <this.calendarOptions.events.length; i++) {
        if (this.calendarOptions.events[i].id == this.currentEventId) {
          this.removeEvent(this.calendarOptions.events[i].id)
        }
      }
      
      let newEvent = {
        id: this.counter++,
        title: this.eventTitle,
        start: new Date(this.eventStartDate + 'T' + this.eventStartTime).toISOString(),
        end: new Date(this.eventEndDate + 'T' + this.eventEndTime).toISOString(),
        location: this.eventLocation,
        note: this.eventNote,
        notified: false
      };

      this.calendarOptions.events.push(newEvent);

      if (this.shouldNotify) {
        newEvent.notified = false;
      } else {
        newEvent.notified = true;
      }
      
      this.showPopup = false;

      // Calculate the time difference between the event start time and the current time
      let eventStartTime = new Date(newEvent.start);
      let currentTime = new Date();
      let timeDifference = (eventStartTime.getTime() - currentTime.getTime()) / 1000;
      timeDifference /= (60 * 60);
      const notificationTime = Math.abs(Math.round(timeDifference));

      if (notificationTime <= 24 && !newEvent.notified) {
        setTimeout(function() {
          Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
              new Notification('Event reminder', {
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
    }
  }
}
</script>

<style scoped>

  li {
    list-style: none; 
    color: rgb(177, 2, 2);
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
    text-align: left;
  }

  .popup-content h3 {
    margin-top: 0;
    text-align: center;
    color: rgb(37, 37, 149);
  }
  
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .close-icon:hover {
    color: red;
  }

  .removeBtn {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 15px;
    background-color: lightgray;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border: 1px solid rgb(124, 122, 122);
  }

  .addBtn {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    left: 15px;
    background-color: lightgray;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border: 1px solid rgb(124, 122, 122);
  }

  .addBtn:hover {border-color: rgb(74, 109, 225); background-color:rgb(186, 220, 248)}
  .removeBtn:hover {border-color: rgb(137, 3, 3); background-color:rgb(207, 120, 117)}

  input[type="checkbox"] {
    transform: scale(1.5);
    margin-right: 10px;
  }

</style>
