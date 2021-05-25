import React, { useState } from "react";
import { connect } from "react-redux";
import { rgb } from "d3-color";

import Card from "../framework/card";
import { parseMarkdown } from "../../util/parseMarkdown";
import { variants } from "./variants";

function VariantButton(props) {
  const selected = props.variant.name === props.selected.name;

  return (
    <a
      onClick={props.onClick}
      style={{
        borderRadius: "4px",
        margin: "4px",
        paddingLeft: "12px",
        paddingRight: "12px",
        paddingTop: "4px",
        paddingBottom: "4px",
        border: "1px solid",
        backgroundColor: selected ? props.color : "white",
        fontSize: "14px",
        color: selected ? "white" : props.color,
      }}
    >
      {props.variant.name}
    </a>
  );
}

function Variants(props) {
  const [selectedVariant, selectVariant] = useState(variants[0]);

  return (
    <Card title="Variants" style={{ width: props.width, fontSize: "14px" }}>
      <div style={{ marginTop: "8px" }}>
        <div>
          {variants.map((variant) => (
            <VariantButton
              variant={variant}
              selected={selectedVariant}
              color={rgb(props.colorScale.scale(variant.name)).toString()}
              key={variant.name}
              onClick={() => selectVariant(variant)}
            />
          ))}
        </div>

        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(selectedVariant.description) }}></div>
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

export default connect(mapStateToProps)(Variants);
