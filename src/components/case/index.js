import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Bar, Line } from "react-chartjs-2";

import Card from "../framework/card";

const PROV_API = "/charon/getDataset?prefix=/prov";
const SAMPLING_API = "/charon/getDataset?prefix=/sampling";

function Case(props) {
  const [prov, setProv] = useState(null);
  const [sampling, setSampling] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const provRes = await fetch(PROV_API);
      setProv(await provRes.json());

      const samplingRes = await fetch(SAMPLING_API);
      setSampling(await samplingRes.json());
    }

    fetchData();
  }, []);

  const data = {
    labels: prov?.map(({ key }) => key),
    datasets: [
      {
        label: ["Jumlah Kasus"],
        data: prov?.map(({ jumlah_kasus }) => jumlah_kasus),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        yAxisID: "case",
      },
      {
        label: ["% Sekuens GISAID/Jumlah Kasus"],
        data: prov?.map(({ sequences, jumlah_kasus }) => (sequences / jumlah_kasus) * 100),
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

  const samplingData = {
    labels: sampling?.map(({ key }) => key),
    datasets: [
      {
        label: "Jumlah sekuens GISAID Indonesia",
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        data: sampling?.map(({ count }) => count),
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

        <Line data={samplingData} width={props.width} height={400} />
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
