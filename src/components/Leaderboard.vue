<template>
  <section class="section" id="pastWinners">
    <h2 class="title has-text-centered">This Week's Winners</h2>
    <div class="container">
      
      <b-table :data="winners" :bordered="true" :striped="true" :mobile-cards="true">
        <template slot-scope="props" sortable>
          <b-table-column label="First Name">
            {{ props.row.firstName }}
          </b-table-column>
          <b-table-column label="Last Name">
            {{ props.row.lastName }}
          </b-table-column>
          <b-table-column label="Points" numeric centered>
            <b>{{ props.row.points }}</b>
          </b-table-column>
          <b-table-column label="Win Date" centered>
            <span class="tag is-success">
              {{ props.row['Win Date'] }}
            </span>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="sentiment_very_dissatisfied" size="is-large">
                </b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import winnersData from '../utils/winnersData';

export default {
  data() {
    return {
      winners: winnersData,
    }
  } 
}
</script>

<style lang="scss">
// table {
//   max-width: 600px;
// }
</style>