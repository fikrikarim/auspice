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

  const getOptions = (title) => ({
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
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  });

  const genderData = {
    labels: ["Laki-laki", "Perempuan", "Unknown"],
    datasets: [
      {
        label: ["Persentase Kasus Positif"],
        data: [48.81, 51.18, 2.28],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: ["Persentase Sequences GISAID"],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        data: [46.51, 52.1, 1.37],
        borderWidth: 1,
      },
    ],
  };

  const ageData = {
    labels: ["0-5", "6-18", "19-30", "31-45", "46-59", "≥ 60", "Unknown"],
    datasets: [
      {
        label: ["Persentase Kasus Positif"],
        data: [2.84, 9.54, 24.63, 29.12, 22.53, 11.3, 1.61],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: ["Persentase Sequences GISAID"],
        data: [1.55, 4.8, 26.04, 30.69, 21.86, 13.25, 1.78],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card title="Case" style={{ fontSize: "14px", display: "block" }}>
      <div>
        <Bar
          data={data}
          options={getOptions("Data Per Provinsi")}
          width={props.width}
          height={400}
        />

        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1, marginRight: "20px" }}>
            <Bar
              data={genderData}
              options={getOptions("Data Jenis Kelamin")}
              width={props.width / 2}
              height={250}
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Bar
              data={ageData}
              options={getOptions("Data Kelompok Umur")}
              width={props.width / 2}
              height={250}
            />
          </div>
        </div>
      </div>
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
