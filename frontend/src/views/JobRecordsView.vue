<!--https://mdbootstrap.com/docs/vue/components/cards/#section-basic-examples-->

<template>
  <h1>Job Records</h1>
  <div>
    <MDBRow :cols="['1', 'md-3']" class="g-4">
      <MDBCol>
        <MDBCard class="h-80">
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardTitle subtitle class="mb-2 text-muted">Card subtitle</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the bulk of the
              card's content.
            </MDBCardText>
            <MDBCardLink href="#">Card link</MDBCardLink>
            <MDBCardLink href="#">Another link</MDBCardLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard class="h-80">
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>This is a short card.</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard class="h-80">
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a longer card with supporting text below as a natural lead-in to
              additional content.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard class="h-80">
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              This is a longer card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </div>
</template>

<script>
  import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink  } from "mdb-vue-ui-kit";
  export default {
    components: {
      MDBCol,
      MDBRow,
      MDBCard,
      MDBCardBody,
      MDBCardTitle,
      MDBCardText,
      MDBCardLink
    }
  };
</script>

<style scoped src="../assets/css/jobRecordsPage.css">
</style>
