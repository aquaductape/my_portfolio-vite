import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import $ from "jquery";
import jQueryFusionCharts from "jquery-fusioncharts";
import { createEffect, onMount } from "solid-js";
import { WakaData, WakaSchema } from "../../ts";

TimeSeries(FusionCharts); // Resolve Charts as dependency for FusionCharts.
jQueryFusionCharts(FusionCharts); // Resolve FusionCharts as dependency for jqueryFusionCharts.

const chartConfig = {
  type: "timeseries",
  renderAt: "container",
  width: "100%",
  height: "400",
  dataSource: {
    chart: {},
    // caption: {
    //   text: "Web visits & downloads"
    // },
    data: {},
    extensions: {
      standardRangeSelector: {
        enabled: "1",
        style: {
          "button-text:active": {
            fill: "rgb(158, 158, 158)",
          },
        },
      },
      customRangeSelector: {
        enabled: "0",
      },
    },
    // subcaption: {
    //   text: "since 2015"
    // },
    navigator: {
      enabled: false,
    },
    yAxis: [
      {
        title: "",
        plot: [
          {
            value: "Total",
            type: "column",
          },
        ],
        format: {
          suffix: "h",
        },
      },
    ],
    xaxis: {
      initialInterval: {
        from: "2019-16-11",
        to: "2019-21-11",
      },
    },
    series: "Project",
  },
};

const FusionTimeChart = ({
  fetchResult,
  setLoading,
}: {
  fetchResult: { res: [WakaData[], WakaSchema] };
  setLoading: (v: boolean) => void;
}) => {
  onMount(() => {
    const [data, schema] = fetchResult.res;
    setLoading(false);
    const fusionDataStore = new FusionCharts.DataStore();
    // After that we are creating a DataTable by passing our data and schema as arguments
    const fusionTable = fusionDataStore.createDataTable(data, schema);
    // const timeseriesDs = { ...chartConfig.timeseriesDs };
    chartConfig.dataSource.data = fusionTable;
    // timeseriesDs.dataSource.data = fusionTable;
    // setChartConfig({ timeseriesDs });
    // setLoading(() => false);
    // @ts-ignore
    $("#chart-container").insertFusionCharts(chartConfig);
  });
  return <div id="chart-container"></div>;
};

export default FusionTimeChart;
