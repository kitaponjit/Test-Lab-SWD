<template>
  <div>
    <layout ref="page">
      <template #body>
        <div class="card">
          <div class="card-body">
            <!-- Tab -->
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  v-bind:class="{ active: active == 'list' }"
                  @click.prevent="changeTab('list')"
                  ><i class="fas fa-table"></i> List Table</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  v-bind:class="{ active: active == 'calendar' }"
                  @click.prevent="changeTab('calendar')"
                  ><i class="fas fa-calendar"></i> Calendar</a
                >
              </li>
              <li class="nav-item ml-auto">
                <vs-button @click="openViewGraph()"
                  ><i class="fas fa-chart-line"></i>&nbsp; Graph</vs-button
                >
              </li>
            </ul>

            <!-- Table List -->
            <div style="margin-top: 10px" v-if="active == 'list'">
              <vs-table striped>
                <template #thead>
                  <vs-tr>
                    <vs-th>ID</vs-th>
                    <vs-th>Data</vs-th>
                    <vs-th>Timestamp</vs-th>
                    <vs-th>Data 2</vs-th>
                  </vs-tr>
                </template>
                <template #tbody>
                  <vs-tr
                    v-for="(tr, idx) in $vs.getPage(data, page, max)"
                    v-bind:key="idx"
                    :data="tr"
                  >
                    <vs-td>{{ tr.id }}</vs-td>
                    <vs-td>{{ tr.data }}</vs-td>
                    <vs-td>{{ dateFormat(tr.timestamp) }}</vs-td>
                    <vs-td>{{ tr.data2 }}</vs-td>
                  </vs-tr>
                </template>
                <template #footer>
                  <vs-pagination
                    v-model="page"
                    :length="$vs.getLength(data, max)"
                  />
                </template>
              </vs-table>
            </div>

            <!-- Calendar-->
            <div style="margin-top: 10px" v-if="active == 'calendar'">
              <full-calendar
                :events="loadCalendar()"
                locale="en"
              ></full-calendar>
            </div>
          </div>
        </div>
      </template>
    </layout>

    <!-- Modal : Graph -->
    <div
      class="modal"
      id="viewGraph"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-chart-line"></i> Graph
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="renderGraph">
              <apexchart width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let page = {};
let moment = require("moment");
export default {
  data() {
    return {
      page: 1,
      max: 15,
      data: [],
      active: "list",
      chartOptions: {},
      series: [],
      renderGraph: false
    };
  },
  methods: {
    async loadDocument() {
      const loading = this.$vs.loading();
      await fetch("https://swdapi.ddns.net:8090/data/ttntest")
        .then((response) => response.json())
        .then((data) => this.$set(this, "data", data));
      loading.close();
    },
    loadCalendar() {
      let events = [];
      for (var x of this.data) {
        events.push({
          title: `${moment(x.timestamp).format("HH:mm:ss")} : ${x.data}`,
          start: moment(x.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      return events;
    },
    openViewGraph() {
      this.renderGraph = false
      $("#viewGraph").modal("show")

      let chartOptions = {
        chart: {
          id: "graph",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      }

      let series = [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ]

      this.$set(this, 'chartOptions', chartOptions)
      this.$set(this, 'series', series)

      this.renderGraph = true
    },
    changeTab(tab) {
      this.$set(this, "active", tab);
    },
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  mounted() {
    page = this.$refs.page;

    this.loadDocument();
  },
};
</script>
