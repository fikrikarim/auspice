import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

import Card from "../framework/card";

const API_URL = "/charon/getDataset?prefix=/prov";
const sequences = [
  369, 327, 45, 153, 9, 22, 8, 115, 345, 50, 100, 26, 52, 23, 24, 11, 3, 1, 9, 8, 8, 2, 4, 7, 8, 3,
  17, 1, 3, 5, 3, 23, 3, 1,
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
        label: ["% Sekuens GISAID/Jumlah Kasus"],
        data: sequences.map((totalSeq, i) => (totalSeq / prov?.list_data[i].jumlah_kasus) * 100),
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
        yAxisID: "sequence",
      },
    ],
  };

  const getOptions = ({ title, firstAxisName, secondAxisName, enableSecondAxis }) => ({
    scales: {
      case: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: firstAxisName,
        },
      },
      sequence: {
        display: enableSecondAxis || false,
        type: "linear",
        position: "right",
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: secondAxisName,
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
        data: [47.7, 50.09, 2.26],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: ["Persentase Sequences GISAID"],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        data: [48.48, 50.61, 0.89],
        borderWidth: 1,
      },
    ],
  };

  const ageData = {
    labels: ["0-5", "6-18", "19-30", "31-45", "46-59", "≥ 60", "Unknown"],
    datasets: [
      {
        label: ["Persentase Kasus Positif"],
        data: [2.84, 9.55, 24.63, 29.1, 22.53, 11.32, 1.6],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: ["Persentase Sequences GISAID"],
        data: [1.52, 4.85, 26.29, 28.49, 22.06, 13.37, 3.38],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card title="Case" style={{ fontSize: "14px", display: "block" }}>
      <div style={{ paddingRight: "20px", maxWidth: "100%" }}>
        <Bar
          data={data}
          options={getOptions({
            title: "Data Per Provinsi",
            firstAxisName: "Jumlah Kasus",
            secondAxisName: "% Sekuens GISAID/Jumlah Kasus",
            enableSecondAxis: true,
          })}
          width={props.width}
          height={400}
        />

        <div style={{ display: "flex", maxWidth: "100%" }}>
          <div style={{ marginRight: "20px" }}>
            <Bar
              data={genderData}
              options={getOptions({ title: "Data Jenis Kelamin" })}
              width={props.width / 2 - 10}
              height={250}
            />
          </div>
          <div style={{}}>
            <Bar
              data={ageData}
              options={getOptions({ title: "Data Kelompok Umur" })}
              width={props.width / 2 - 10}
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
