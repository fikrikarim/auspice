import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

import Card from "../framework/card";

const API_URL = "/charon/getDataset?prefix=/prov";
const sequences = [
  332, 320, 31, 129, 6, 22, 1, 115, 23, 50, 100, 11, 35, 0, 1, 11, 3, 1, 9, 8, 0, 2, 0, 7, 2, 1, 17,
  1, 3, 5, 3, 23, 2, 1,
];

function Case(props) {
  const [prov, setProv] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(API_URL);
      const json = await res.json();

      setProv(json);
    }

    fetchData();
  }, []);

  const data = {
    labels: prov?.list_data.map(({ key }) => key),
    datasets: [
      {
        label: ["Jumlah Kasus"],
        data: prov?.list_data.map(({ jumlah_kasus }) => jumlah_kasus),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        yAxisID: "case",
      },
      {
        label: ["Jumlah Sequence GISAID"],
        data: sequences,
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
        yAxisID: "sequence",
      },
    ],
  };

  const options = {
    scales: {
      case: {
        type: "linear",
        position: "left",
      },
      sequence: {
        type: "linear",
        position: "right",
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <Card title="Case" style={{ fontSize: "14px" }}>
      <Bar data={data} options={options} width={props.width} height={400} />
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    colorBy: state.controls.colorBy,
    colorings: state.metadata.colorings,
    colorScale: state.controls.colorScale,
    legendOpen: state.controls.legendOpen,
  };
}

export default connect(mapStateToProps)(Case);
