export const INFO_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "recognition", label: "Recognition" },
  { id: "significance", label: "Diagnostic Value" },
  { id: "differential", label: "Differential" },
  { id: "reporting", label: "Reporting" },
];

const makeFeatureTemplate = ({
  title,
  subtitle,
  overview,
  recognition,
  significance,
  differential,
  reporting,
}) => ({
  title,
  subtitle,
  sections: {
    overview: {
      heading: "Overview",
      blocks: [
        {
          type: "lead",
          content: overview.lead,
        },
        {
          type: "bullets",
          title: "Key Points",
          items: overview.points,
        },
      ],
    },
    recognition: {
      heading: "How to Recognize It",
      blocks: [
        {
          type: "bullets",
          title: "What to Look For",
          items: recognition.lookFor,
        },
        {
          type: "bullets",
          title: "How It Usually Appears",
          items: recognition.appearance,
        },
      ],
    },
    significance: {
      heading: "Diagnostic Value",
      blocks: [
        {
          type: "lead",
          content: significance.lead,
        },
        {
          type: "bullets",
          title: "Why It Matters",
          items: significance.points,
        },
      ],
    },
    differential: {
      heading: "Common Confusions",
      blocks: [
        {
          type: "bullets",
          title: "Possible Misinterpretations",
          items: differential.confusions,
        },
        {
          type: "bullets",
          title: "How to Confirm",
          items: differential.confirmation,
        },
      ],
    },
    reporting: {
      heading: "Reporting Guidance",
      blocks: [
        {
          type: "bullets",
          title: "How to Document",
          items: reporting.documentation,
        },
        {
          type: "bullets",
          title: "Cautions",
          items: reporting.cautions,
        },
      ],
    },
  },
});

export const FEATURE_CONTENT = {
  EntamoebaHystolytica: {
    trophozoite: {
      nucleus: makeFeatureTemplate({
        title: "One Nucleus",
        subtitle: "Primary nuclear landmark of the trophozoite",
        overview: {
          lead: "The trophozoite of Entamoeba histolytica has a single nucleus. This is one of the first structures a lab technician should confirm before interpreting finer nuclear details.",
          points: [
            "Expected number: one nucleus in the trophozoite stage.",
            "Usually identified before assessing karyosome position and chromatin pattern.",
            "Should be interpreted together with overall trophozoite morphology.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for one rounded nuclear structure within the cytoplasm.",
            "It should be distinct from food vacuoles and ingested inclusions.",
            "Check that the structure is internal to the organism and not an external overlap.",
          ],
          appearance: [
            "Usually appears as a rounded internal body.",
            "Visibility may vary with stain quality and focal plane.",
            "May appear clearer after adjusting focus and comparing with nearby vacuoles.",
          ],
        },
        significance: {
          lead: "The presence of a single nucleus supports identification of the trophozoite stage and helps separate it from cyst forms, which contain multiple nuclei when mature.",
          points: [
            "Confirms trophozoite-stage interpretation when seen with compatible body morphology.",
            "Provides the reference point for evaluating karyosome and peripheral chromatin.",
            "Should not be used alone for species-level confirmation.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for a vacuole if the nuclear membrane is faint.",
            "May be obscured by granular cytoplasm or overlapping material.",
            "Debris and stain artifacts can simulate rounded internal bodies.",
          ],
          confirmation: [
            "Verify that the internal body shows a true nuclear pattern, not just an empty round space.",
            "Next inspect the karyosome and peripheral chromatin.",
            "Confirm trophozoite body shape and cytoplasmic character.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite with one nucleus observed when clearly visualized.",
            "Correlate with karyosome position and chromatin distribution before final interpretation.",
          ],
          cautions: [
            "Do not overcall a nucleus if stain quality is poor.",
            "Do not rely on the nucleus alone for final species confirmation.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Small Central Karyosome",
        subtitle: "High-value nuclear detail",
        overview: {
          lead: "The karyosome is the dense central structure within the nucleus. In Entamoeba histolytica trophozoites it is typically small and centrally placed.",
          points: [
            "A central karyosome is an important nuclear detail.",
            "Best interpreted only after the nucleus itself is confidently identified.",
            "Useful in species differentiation when combined with chromatin pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a small dense dot near the center of the nucleus.",
            "Assess whether it is central rather than eccentric.",
            "Check more than one focus level if visibility is uncertain.",
          ],
          appearance: [
            "Typically small and compact.",
            "Should not dominate the whole nucleus.",
            "Usually more helpful when the nuclear outline is also visible.",
          ],
        },
        significance: {
          lead: "A small central karyosome supports the expected nuclear morphology of Entamoeba histolytica trophozoites.",
          points: [
            "Helps distinguish from amoebae with eccentric or irregular karyosome position.",
            "Should be assessed together with fine peripheral chromatin.",
            "Improves confidence when multiple supporting features are present.",
          ],
        },
        differential: {
          confusions: [
            "Can be missed if the nucleus is poorly focused.",
            "Can appear off-center due to angle, distortion, or incomplete visualization.",
            "May be confused with stain artifact if the nucleus itself is not well defined.",
          ],
          confirmation: [
            "Re-evaluate the full nucleus boundary before deciding position.",
            "Confirm chromatin distribution around the nuclear edge.",
            "Compare with other trophozoites in the same field if present.",
          ],
        },
        reporting: {
          documentation: [
            "Record as central karyosome when clearly seen within a well-defined nucleus.",
            "Use as supportive nuclear morphology rather than a stand-alone finding.",
          ],
          cautions: [
            "Do not label as central if the nucleus is only partially visible.",
            "Avoid overinterpreting distorted or folded specimens.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Fine Peripheral Chromatin",
        subtitle: "Important nuclear edge pattern",
        overview: {
          lead: "Peripheral chromatin refers to the chromatin distribution along the inner nuclear membrane. In Entamoeba histolytica trophozoites it is typically fine and evenly distributed.",
          points: [
            "This is a high-value discriminating feature.",
            "Best assessed after identifying the nucleus and karyosome.",
            "Pattern quality matters more than simple presence or absence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the edge of the nucleus for delicate chromatin lining.",
            "Look for even, fine distribution rather than coarse clumping.",
            "Check whether the pattern is continuous or regularly spaced around the nuclear margin.",
          ],
          appearance: [
            "Usually fine rather than coarse.",
            "More even than patchy in the expected morphology.",
            "Can become hard to see in poor staining or dense cytoplasm.",
          ],
        },
        significance: {
          lead: "Fine peripheral chromatin is one of the most useful supporting features for recognizing Entamoeba histolytica trophozoites.",
          points: [
            "Helps separate from organisms with coarse or irregular peripheral chromatin.",
            "Strengthens interpretation when paired with a small central karyosome.",
            "Supports species-level recognition when the rest of morphology agrees.",
          ],
        },
        differential: {
          confusions: [
            "Patchy stain or noise may falsely simulate chromatin lining.",
            "Peripheral debris may be mistaken for nuclear edge detail.",
            "Overstaining may make chromatin appear coarser than it is.",
          ],
          confirmation: [
            "Inspect the full nuclear outline, not only one edge.",
            "Compare with karyosome position and overall nucleus shape.",
            "If uncertain, treat as supportive but not definitive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as fine peripheral chromatin when evenly seen around the nuclear margin.",
            "Use together with karyosome position in the final morphology note.",
          ],
          cautions: [
            "Do not overcall fine chromatin if only a fragment of the nuclear edge is visible.",
            "Be cautious in thick or poorly stained preparations.",
          ],
        },
      }),

      RBC: makeFeatureTemplate({
        title: "Ingested RBCs",
        subtitle: "Very high-value feature",
        overview: {
          lead: "Ingested red blood cells are among the most important findings in Entamoeba histolytica trophozoites. When confidently internal, they strongly support this identification.",
          points: [
            "One of the strongest supportive findings for E. histolytica trophozoites.",
            "Must be truly internal to the organism, not lying above or below it.",
            "Should be interpreted with the surrounding cytoplasm and trophozoite outline.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for round red-cell-like inclusions inside the trophozoite cytoplasm.",
            "Confirm that they are enclosed within the organism rather than overlapping externally.",
            "Assess whether the surrounding cytoplasm belongs to the trophozoite.",
          ],
          appearance: [
            "Usually seen as contained RBC-like bodies within vacuolar spaces or cytoplasm.",
            "May vary in clarity depending on stain, focus, and overlap.",
            "Can appear more obvious after isolating the surrounding structure visually.",
          ],
        },
        significance: {
          lead: "Confidently identified ingested RBCs are a major diagnostic clue favoring Entamoeba histolytica over noninvasive look-alikes.",
          points: [
            "Strongly increases confidence in E. histolytica trophozoite interpretation.",
            "Much more diagnostically important than non-specific food vacuoles.",
            "Should be treated as a high-priority confirmatory feature.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with food vacuoles containing debris.",
            "Can be falsely simulated by overlapping background erythrocytes.",
            "Artifact and partial overlap may create the illusion of ingestion.",
          ],
          confirmation: [
            "Check that the RBC-like bodies are clearly inside the trophozoite boundary.",
            "Confirm trophozoite morphology and inspect the nucleus.",
            "Evaluate the same field in different focal planes if needed.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite containing ingested RBCs when internality is clear.",
            "Pair with other nuclear and cytoplasmic findings in the morphology note.",
          ],
          cautions: [
            "Do not report RBC ingestion if overlap cannot be excluded.",
            "Use careful wording if the finding is suggestive but not unequivocal.",
          ],
        },
      }),

      cytoplasm: makeFeatureTemplate({
        title: "Granular / Ground-Glass Cytoplasm",
        subtitle: "Supportive texture feature",
        overview: {
          lead: "The cytoplasm of Entamoeba histolytica trophozoites is often described as granular or ground-glass in appearance. This is useful as a supportive texture feature.",
          points: [
            "Helpful for overall morphological interpretation.",
            "Not specific enough to stand alone.",
            "Best used together with nuclear details and RBC ingestion.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the internal body texture rather than just the outer contour.",
            "Look for a fine granular, softly clouded internal appearance.",
            "Compare with more vacuolated or dirtier-looking cytoplasm in other amoebae.",
          ],
          appearance: [
            "Usually appears softly granular rather than empty and clear.",
            "May look denser in some areas and lighter in others.",
            "Granularity can be affected by lighting, stain, and rendering angle.",
          ],
        },
        significance: {
          lead: "Granular or ground-glass cytoplasm supports the expected trophozoite appearance but should not be treated as a decisive feature by itself.",
          points: [
            "Useful as a supporting texture cue.",
            "Strengthens the overall pattern when nuclear features match.",
            "More valuable when combined with RBC ingestion and correct nucleus morphology.",
          ],
        },
        differential: {
          confusions: [
            "May be confused with dirty or debris-filled cytoplasm.",
            "Poor slide quality may exaggerate apparent granularity.",
            "Rendering or lighting can make texture seem stronger than it is.",
          ],
          confirmation: [
            "Use texture as supportive evidence, not final evidence.",
            "Always confirm nucleus, karyosome, and chromatin pattern.",
            "If RBC ingestion is present, weigh that more heavily.",
          ],
        },
        reporting: {
          documentation: [
            "Record as granular or ground-glass cytoplasm only as a supportive morphological feature.",
            "Use in combination with stronger diagnostic findings.",
          ],
          cautions: [
            "Do not over-rely on cytoplasmic texture in isolation.",
            "Avoid making species-level calls from texture alone.",
          ],
        },
      }),
    },
  },
};

export const getFeatureContent = ({
  parasiteId,
  stage,
  markerId,
  fallbackTitle = "Diagnostic Feature",
}) => {
  const content = FEATURE_CONTENT?.[parasiteId]?.[stage]?.[markerId];

  if (content) return content;

  return {
    title: fallbackTitle,
    subtitle: "Structured diagnostic note",
    sections: {
      overview: {
        heading: "Overview",
        blocks: [
          {
            type: "lead",
            content:
              "Content for this diagnostic feature has not been written yet. Use the same template structure to add practical microscope recognition notes, diagnostic value, differential points, and reporting guidance.",
          },
        ],
      },
      recognition: {
        heading: "How to Recognize It",
        blocks: [],
      },
      significance: {
        heading: "Diagnostic Value",
        blocks: [],
      },
      differential: {
        heading: "Common Confusions",
        blocks: [],
      },
      reporting: {
        heading: "Reporting Guidance",
        blocks: [],
      },
    },
  };
};
