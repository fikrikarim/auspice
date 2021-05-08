import React, { useState } from 'react';
import Card from '../framework/card';

const variants = [
  {
    name: "19A",
    description: `Also known as B.1.617.1

    The Pango lineage B.1.617 includes both Variant20A/S:154K and its sister lineage Variant20A/S:478K.
    B.1.617 was first detected in late 2020 in India, and has appeared to expand rapidly.

    These sequences have Spike mutations at positions S:L452D (see Variant20C/S:452R page for more details) and MutationS:P681, both of which impact antibody binding.

    In addition, many sequences have mutation S:G142D, in the N-terminal domain, which is an escape mutatant to some antibodies (McCallum et al., bioRxiv ) and has appeared in viruses grown in the presence of a monoclonal antibody (Suryadevara et al, Cell ).

    These sequences therefore have mutations in the N-terminal domain, receptor binding domain (RBD), and furin cleavage site of the spike protein, which could impact a variety of antibodies.
    `
  },
  {
    name: "19B",
    description: `Another variant with S:S477N arose independently in Australia (Nextstrain Clade 20F) and was responsible for much of the Jun-Oct 2020 outbreak (Nextstrain build ).
    Over the northern-hemisphere summer of 2020, Variant20A.EU2 became the second most dominant variant in western Europe, after Variant20E (EU1). Though early sequences come from France, more detailed analysis of the origins is needed.

    MutationS:S477 is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition.
    `
  },
  {
    name: "20A",
    description: `These sequences have Spike mutations at positions S:L452D (see Variant20C/S:452R page for more details) and MutationS:P681, both of which impact antibody binding.

    In addition, many sequences have mutation S:G142D, in the N-terminal domain, which is an escape mutatant to some antibodies (McCallum et al., bioRxiv ) and has appeared in viruses grown in the presence of a monoclonal antibody (Suryadevara et al, Cell ).
    `
  },
  {
    name: "20B",
    description: `20B is found primarily in Sweden and northern European countries, including Norway and Denmark.
    `
  },
  {
    name: "20C",
    description: `20C was first identified in California and appears to have increased in frequency (Zhang et al., JAMA ).
    Neutralizing titers in plasma from vaccinated individuals were reduced 3-6 fold against Variant20C/S:452R compared to wild-type, and neutralization of mAbs targetting N-terminal domain was completely lost (McCallum et al., bioRxiv )
    Viral shedding was increased 2-fold for Variant20C/S:452R compared to wild-type in pseudoviruses, and neutralization titers showed a 4-6.7 fold and 2-fold decrease in convalescent plasma and plasma from vaccinated individuals, respectively (Deng et al., bioRxiv )
    California Dept of Public Health announcement  about the variant (17 Jan 2021)
    `
  },
  {
    name: "20D",
    description: `20D is largely found within the USA, particularly in New York state, and seems to have arisen in late 2020.
    20C/S:484K contains a mutation in MutationS:E484, like the 2 of the variants of concern and some other currently circulating clusters. Further, this variant has the same 3 amino acid deletion in ORF1a at positions 3675-5677 that is seen in all three variants of concern, as well as in Variant20A/S:484K.
    `
  },
  {
    name: "20I/501Y.V1",
    description: `Also known as B.1.1.7
    Announced on the 14 Dec 2020, this variant appears to have arisen and/or initially expanded in the South East of England.

    501Y.V1 is associated with multiple mutations in Spike. Most notably: S:N501Y (see MutationS:N501), and a deletion at 69/70 (see MutationS:H69-)).
    But also MutationS:Y144- (deletion) and S:P681H (adjacent to the furin cleavage site).

    There is also a notable truncation of ORF8, with ORF8:Q27* (becomes a stop codon) (deletion of ORF8 was previously associated with reduced clinical severity (Young et al., Lancet )), and mutations in Nucleocapsid: N:D3L and N:S235F, as well as a deletion in ORF1a(Nsp6) 3675-3677 (also seen in 20H/501Y.V2 and 20J/501Y.V3).
    `
  }
];

function VariantButton(props) {
  const selected = props.variant.name === props.selected.name;

  return (
    <a onClick={props.onClick} style={{ borderRadius: "4px", margin: "4px", padding: "8px", borderColor: "gray", backgroundColor: selected ? "#f2f3f5" : null, fontSize: "16px" }}>
      {props.variant.name}
    </a>
  );
}

function Variants(props) {
  const [selectedVariant, selectVariant] = useState(variants[0]);

  return (
    <Card title="Variants" style={{ width: props.width, fontSize: "14px" }}>
      <div style={{ marginTop: "6px" }}>
        <div>
          {variants.map((variant) => <VariantButton variant={variant} selected={selectedVariant} key={variant.name} onClick={() => selectVariant(variant)} />)}
        </div>

        <p style={{ color: "#333" }}>
          {selectedVariant.description}
        </p>
      </div>
    </Card>
  );
}

export default Variants;
