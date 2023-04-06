<template>
  <vue-basic-alert
   :duration="300"
   :closeIn="2500"
   ref="alert" />
  <div>
    <div class="google-btn-wrapper">
      <button v-if="!isAuthenticatedByGoogle" class="signInBtn" @click="signInGoogle">
        <i class="fab fa-google"></i> Sign in with Google
      </button>
      <button v-if="isAuthenticatedByGoogle" class="revokeBtn" @click="revokeGoogleCredentials">
        <i class="fab fa-google"></i> Sign Out
      </button>
      <button v-if="isAuthenticatedByGoogle" class="syncBtn" @click="syncGoogleCalendar">
        <i class="fa-solid fa-rotate"></i> Sync Calendar
      </button>
    </div>

    <div v-if="notificationMessages.length">
      <h4>Event Reminder:</h4>
      <ul>
        <li v-for="(messageObj, index) in notificationMessages" :key="index">{{ messageObj.message }}</li>
      </ul>
    </div>
    <FullCalendar ref="myCalendar" :options="calendarOptions" style="background: white; border-radius: 5px; padding: 20px"/>
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
          <input id="event-title" v-model="eventTitle" type="text" class="form-control" :disabled="shouldDisableFormFields" />
        </div>
        <div style="display: inline-block;">
          <label for="startDate" style="margin-right: 10px;">Start Date:</label>
          <input type="date" v-model="eventStartDate" id="startDate" style="padding-left: 5px;" :disabled="shouldDisableFormFields"/>
        </div>
        <div style="display: inline-block;">
          <label for="startTime" style="margin-right: 10px;">Start Time:</label>
          <input type="time" v-model="eventStartTime" id="startTime" style="padding-left: 5px;" :disabled="shouldDisableFormFields">
        </div>
        <div style="display: inline-block; margin-top: 10px;">
          <label for="endDate" style="margin-right: 10px;">End Date:</label>
          <input type="date" v-model="eventEndDate" id="endDate" style="padding-left: 5px;" :disabled="shouldDisableFormFields">
        </div>
        <div style="display: inline-block;">
          <label for="endTime" style="margin-right: 10px;">End Time:</label>
          <input type="time" v-model="eventEndTime" id="endTime" style="padding-left: 5px;" :disabled="shouldDisableFormFields">
        </div>
        <div style="display: inline-block; margin-top: 10px;">
          <label for="title" style="margin-right: 10px;">Location:</label>
          <input type="text" v-model="eventLocation" id="location" style="padding-left: 5px; width: 150px;" :disabled="shouldDisableFormFields"/>
        </div>
        <div style="display: flex; flex-direction: column;">
          <label for="title" style="margin-bottom: 5px;">Note:</label>
          <textarea v-model="eventNote" id="note" rows="3" style="padding-left: 5px; overflow: auto;" :disabled="shouldDisableFormFields"></textarea>
        </div>
        <div style="display: inline-block;  margin-top: 15px;">
          <input type="checkbox" v-model="shouldNotify" id="shouldNotify" style="margin-right: 10px;" :disabled="shouldDisableFormFields"/>
          <label for="shouldNotify">Notify me</label>
        </div>
        <div style="display: inline-block; margin-top: 30px; text-align: center;">
          <button class="addBtn" @click="addEvent" :disabled="shouldDisableFormFields">Save</button>
          <button class="removeBtn" @click="removeEvent(currentEventId)" :disabled="shouldDisableFormFields">Remove</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script src="../modules/calendar.js">
</script>

<style scoped src="../assets/css/calendar.css">
</style>
