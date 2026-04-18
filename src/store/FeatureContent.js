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

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Key maturity feature of the cyst",
        overview: {
          lead: "A mature Entamoeba histolytica cyst classically contains four nuclei. This is one of the most important features for recognizing the mature cyst stage.",
          points: [
            "Expected number in a mature cyst: four nuclei.",
            "Immature cysts may show fewer nuclei, so count carefully.",
            "Nuclear number should be interpreted together with chromatoid bodies and cyst wall shape.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for multiple rounded nuclei distributed within the cyst interior.",
            "Confirm that the nuclei are internal and distinct from debris or vacuolar spaces.",
            "Count them carefully rather than estimating at a glance.",
          ],
          appearance: [
            "Typically small, rounded nuclei inside the cyst.",
            "Some nuclei may be more obvious than others depending on focal plane.",
            "A full set of four strongly supports a mature cyst.",
          ],
        },
        significance: {
          lead: "Four nuclei are a defining maturity clue for the Entamoeba histolytica cyst and help distinguish the mature cyst from earlier stages.",
          points: [
            "Strongly supports mature cyst interpretation.",
            "Helps differentiate from immature cysts with fewer nuclei.",
            "Should be correlated with central karyosome and chromatoid body pattern.",
          ],
        },
        differential: {
          confusions: [
            "Partial visibility may make a four-nuclei cyst appear to have fewer nuclei.",
            "Debris or overlapping structures may mimic a nuclear profile.",
            "Counting can be difficult in dense or poorly focused preparations.",
          ],
          confirmation: [
            "Change focus and inspect the full cyst interior before final counting.",
            "Confirm karyosome position within visible nuclei.",
            "Check for compatible cyst wall and chromatoid bodies.",
          ],
        },
        reporting: {
          documentation: [
            "Record as cyst with four nuclei when all nuclei are clearly visualized.",
            "If fewer are seen, note whether the cyst may be immature or partially visualized.",
          ],
          cautions: [
            "Do not force a count if the preparation is unclear.",
            "Avoid reporting maturity from one uncertain focal plane.",
          ],
        },
      }),

      chromatoid: makeFeatureTemplate({
        title: "Chromatoid Bodies",
        subtitle: "Supportive internal cyst structures",
        overview: {
          lead: "Chromatoid bodies are internal structures within the cyst that provide useful supportive evidence when identifying Entamoeba histolytica cysts.",
          points: [
            "Useful supportive feature in cyst recognition.",
            "Should be evaluated along with nuclear count and cyst outline.",
            "Shape and visibility can vary with maturity and slide quality.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for elongated or rod-like internal bodies within the cyst.",
            "Check whether they are distinct from debris and internal folds.",
            "Assess their position relative to the nuclei and cyst interior.",
          ],
          appearance: [
            "Usually appear as compact internal chromatoid structures.",
            "May be single or multiple depending on the specimen.",
            "Often easier to appreciate after identifying the cyst boundary first.",
          ],
        },
        significance: {
          lead: "Chromatoid bodies support cyst identification and help reinforce interpretation when seen with compatible nuclear and wall features.",
          points: [
            "Helpful supportive finding in Entamoeba histolytica cyst morphology.",
            "Adds confidence when four nuclei are also present.",
            "More valuable when interpreted as part of the complete cyst pattern.",
          ],
        },
        differential: {
          confusions: [
            "Can be mistaken for debris, stain precipitate, or internal artifact.",
            "Partial chromatoid structures may be overlooked or misread.",
            "Other internal inclusions may falsely suggest chromatoid material.",
          ],
          confirmation: [
            "Confirm that the structures lie within the cyst and not outside it.",
            "Re-evaluate nuclei and karyosome pattern.",
            "Use the overall rounded cyst morphology to support the finding.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatoid bodies as supportive internal cyst structures when clearly seen.",
            "Pair with nuclear count and cyst wall appearance in the report.",
          ],
          cautions: [
            "Do not report chromatoid bodies when internal debris cannot be excluded.",
            "Avoid relying on this feature alone.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Rounded Cyst Wall",
        subtitle: "Outer structural feature of the cyst",
        overview: {
          lead: "The rounded cyst wall defines the outer contour of the Entamoeba histolytica cyst and is an important structural feature when staging the organism.",
          points: [
            "Provides the outer boundary for evaluating internal structures.",
            "Supports cyst-stage interpretation rather than trophozoite-stage interpretation.",
            "Best assessed together with nuclear count and internal content.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a smooth rounded outer boundary enclosing the internal structures.",
            "Assess whether the contour is regular and cyst-like rather than amoeboid.",
            "Check that the wall fully encloses nuclei and chromatoid bodies.",
          ],
          appearance: [
            "Usually rounded and well-contained.",
            "Appears as a clear outer outline around the cyst contents.",
            "Can become less distinct in poor contrast or overlapping material.",
          ],
        },
        significance: {
          lead: "A rounded cyst wall supports recognition of a cyst form and helps separate it from trophozoite morphology.",
          points: [
            "Important for confirming stage.",
            "Provides context for interpreting nuclei and chromatoid bodies.",
            "Supports mature-cyst morphology when paired with four nuclei.",
          ],
        },
        differential: {
          confusions: [
            "Folded debris or circular artifacts may mimic a cyst outline.",
            "Overlapping material can distort the apparent wall shape.",
            "A poorly visualized wall may make the organism appear irregular.",
          ],
          confirmation: [
            "Confirm that the wall encloses true internal cyst structures.",
            "Check for multiple nuclei and internal chromatoid bodies.",
            "Use shape and content together rather than shape alone.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as rounded cyst wall when the contour is clearly seen.",
            "Use as stage-supporting evidence rather than a stand-alone conclusion.",
          ],
          cautions: [
            "Do not overcall a cyst from outline alone.",
            "Ensure the structure is biological and not an artifact.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Centrally Located Karyosome",
        subtitle: "Supportive nuclear detail within cyst nuclei",
        overview: {
          lead: "Each visible nucleus in the Entamoeba histolytica cyst should be assessed for a centrally located karyosome. This is a supportive nuclear detail that strengthens cyst identification.",
          points: [
            "Best assessed after nuclei are clearly identified.",
            "Used with nuclear number and chromatin pattern.",
            "Helpful as a supportive confirmation feature.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a dense central dot.",
            "Assess whether the karyosome is centered rather than displaced.",
            "Check more than one nucleus if some are unclear.",
          ],
          appearance: [
            "Usually small and central within each nucleus.",
            "Should not dominate the nucleus.",
            "May be easier to see in some nuclei than others.",
          ],
        },
        significance: {
          lead: "A centrally located karyosome supports the expected nuclear morphology of Entamoeba histolytica cyst nuclei.",
          points: [
            "Strengthens interpretation when four nuclei are present.",
            "Helpful for confirming that internal bodies identified as nuclei are true nuclei.",
            "Adds confidence to species-consistent cyst morphology.",
          ],
        },
        differential: {
          confusions: [
            "Can be hard to see in partially visualized nuclei.",
            "Poor staining may make the karyosome look eccentric or indistinct.",
            "Artifact may simulate internal nuclear dots.",
          ],
          confirmation: [
            "Verify the nuclear boundary first.",
            "Compare several nuclei within the same cyst.",
            "Use together with cyst wall and chromatoid bodies.",
          ],
        },
        reporting: {
          documentation: [
            "Document centrally located karyosome as supportive nuclear morphology when clearly seen.",
            "Mention it alongside nuclear count rather than in isolation.",
          ],
          cautions: [
            "Do not assign precise position if the nucleus is incomplete or poorly focused.",
            "Use conservative wording when only one nucleus is interpretable.",
          ],
        },
      }),
    },
  },

  EntamoebaHartmanni: {
    trophozoite: {
      nucleus: makeFeatureTemplate({
        title: "One Nucleus",
        subtitle: "Primary nuclear landmark of the trophozoite",
        overview: {
          lead: "Entamoeba hartmanni trophozoites contain a single nucleus. This is the first structure to confirm before interpreting finer nuclear details such as karyosome position and peripheral chromatin.",
          points: [
            "Expected number: one nucleus in the trophozoite stage.",
            "Best assessed before evaluating nuclear detail.",
            "Should be interpreted together with size and the absence of ingested RBCs.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for one rounded nuclear structure within the trophozoite cytoplasm.",
            "Ensure it is internal to the organism and not an external overlap.",
            "Differentiate it from food vacuoles and other internal inclusions.",
          ],
          appearance: [
            "Usually appears as a compact rounded internal body.",
            "May be subtle in low contrast or dense preparations.",
            "Often easier to confirm after isolating the nuclear region visually.",
          ],
        },
        significance: {
          lead: "A single nucleus supports trophozoite-stage interpretation and provides the basis for evaluating other nuclear features used in recognition.",
          points: [
            "Confirms trophozoite-stage morphology rather than mature cyst morphology.",
            "Provides the reference point for central karyosome and fine peripheral chromatin assessment.",
            "Should not be used alone for species-level distinction.",
          ],
        },
        differential: {
          confusions: [
            "May be confused with a vacuole if the nuclear outline is faint.",
            "Can be obscured by cytoplasmic texture or poor focus.",
            "Artifact and debris may simulate a rounded internal body.",
          ],
          confirmation: [
            "Confirm the nuclear boundary before interpreting internal detail.",
            "Next check for central karyosome and fine peripheral chromatin.",
            "Correlate with the absence of ingested RBCs.",
          ],
        },
        reporting: {
          documentation: [
            "Document as trophozoite with one nucleus when clearly visualized.",
            "Use together with the rest of the nuclear pattern for interpretation.",
          ],
          cautions: [
            "Do not overcall a nucleus if the outline is unclear.",
            "Avoid relying on this feature alone.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Central Karyosome",
        subtitle: "Supportive nuclear detail",
        overview: {
          lead: "The karyosome in Entamoeba hartmanni trophozoites is typically central. This helps support correct interpretation of the nucleus when paired with fine peripheral chromatin.",
          points: [
            "Central position is the key point to assess.",
            "Best interpreted after the nucleus is confidently identified.",
            "Useful as part of the overall nuclear pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a dense internal dot near the center of the nucleus.",
            "Assess whether it is central rather than eccentric.",
            "Check multiple focus levels if the structure appears ambiguous.",
          ],
          appearance: [
            "Usually small and centrally placed.",
            "Should not appear markedly eccentric.",
            "Most useful when the full nuclear edge is also visible.",
          ],
        },
        significance: {
          lead: "A central karyosome supports the expected nuclear morphology of Entamoeba hartmanni trophozoites.",
          points: [
            "Useful supportive feature in distinguishing similar amoebae.",
            "Should be assessed together with fine peripheral chromatin.",
            "Improves confidence when the trophozoite lacks ingested RBCs.",
          ],
        },
        differential: {
          confusions: [
            "May seem off-center if the nucleus is only partially in focus.",
            "Poor stain can make the karyosome indistinct.",
            "Artifact can simulate an internal nuclear dot.",
          ],
          confirmation: [
            "Verify the full nuclear boundary first.",
            "Compare with chromatin pattern around the nuclear edge.",
            "Use together with other trophozoite features rather than alone.",
          ],
        },
        reporting: {
          documentation: [
            "Record as central karyosome when clearly seen within a well-defined nucleus.",
            "Use as supportive nuclear morphology.",
          ],
          cautions: [
            "Avoid precise interpretation if the nucleus is incomplete or distorted.",
            "Do not separate this from the rest of the nuclear pattern in your note.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Fine Peripheral Chromatin",
        subtitle: "Important nuclear edge detail",
        overview: {
          lead: "Fine peripheral chromatin is part of the expected nuclear pattern in Entamoeba hartmanni trophozoites. It should be interpreted together with the central karyosome.",
          points: [
            "High-value nuclear edge feature.",
            "Most useful when the nucleus is clearly visible.",
            "Should be described by quality and distribution, not merely presence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the nuclear edge for delicate chromatin lining.",
            "Look for fine and fairly even distribution.",
            "Avoid overcalling patchy stain as true chromatin pattern.",
          ],
          appearance: [
            "Usually fine rather than coarse.",
            "Appears around the nuclear margin rather than clumped centrally.",
            "May be hard to appreciate in poor preparations.",
          ],
        },
        significance: {
          lead: "Fine peripheral chromatin supports the expected nuclear morphology of Entamoeba hartmanni trophozoites and helps separate it from coarser-pattern organisms.",
          points: [
            "Supports recognition when paired with a central karyosome.",
            "Helps distinguish from organisms with more irregular or coarse chromatin.",
            "Should be interpreted in context with trophozoite size and absence of RBC ingestion.",
          ],
        },
        differential: {
          confusions: [
            "Patchy artifact may mimic peripheral chromatin.",
            "Overstaining can make the margin look coarser than it is.",
            "Poor focus can obscure even distribution.",
          ],
          confirmation: [
            "Inspect the full nuclear circumference when possible.",
            "Correlate with karyosome position.",
            "Treat uncertain edge detail as supportive, not definitive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe as fine peripheral chromatin when the margin is clearly visualized.",
            "Pair with central karyosome in the morphology note.",
          ],
          cautions: [
            "Do not overcall this feature if only a segment of the edge is visible.",
            "Be cautious in thick or low-contrast preparations.",
          ],
        },
      }),

      noRBCs: makeFeatureTemplate({
        title: "No Ingested RBCs",
        subtitle: "Important exclusion feature",
        overview: {
          lead: "Entamoeba hartmanni trophozoites do not show ingested red blood cells. This absence is important when distinguishing them from Entamoeba histolytica trophozoites.",
          points: [
            "This is an exclusion feature rather than a positive inclusion feature.",
            "Absence of RBC ingestion supports a noninvasive interpretation pattern.",
            "Should be evaluated together with overall nuclear morphology and organism size.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect internal vacuolar spaces and cytoplasm for absence of true internal red blood cells.",
            "Check that visible inclusions are food vacuoles or non-RBC material rather than erythrocytes.",
            "Confirm that the trophozoite does not contain engulfed RBC-like bodies.",
          ],
          appearance: [
            "Food vacuoles may be present without true RBC ingestion.",
            "The cytoplasm may contain inclusions, but not diagnostic internal RBCs.",
            "This feature is based on what is not seen as much as what is seen.",
          ],
        },
        significance: {
          lead: "Absence of ingested RBCs is a practical differentiating point when separating Entamoeba hartmanni from Entamoeba histolytica trophozoites.",
          points: [
            "Supports distinction from E. histolytica when other features align.",
            "Should not be interpreted alone without nuclear morphology.",
            "Useful as part of the full differential assessment.",
          ],
        },
        differential: {
          confusions: [
            "Background RBC overlap may falsely suggest internal erythrocytes.",
            "Food vacuoles may be misread as RBC ingestion.",
            "Poor contrast can make interpretation of internality difficult.",
          ],
          confirmation: [
            "Verify whether any RBC-like body is truly internal to the trophozoite.",
            "Reassess the nucleus, karyosome, and peripheral chromatin.",
            "Use careful comparison with known E. histolytica-like morphology.",
          ],
        },
        reporting: {
          documentation: [
            "Report the trophozoite pattern without claiming RBC ingestion unless unequivocally seen.",
            "Use absence of ingested RBCs as supportive differential evidence.",
          ],
          cautions: [
            "Absence is only meaningful when the organism is well visualized.",
            "Do not state absence confidently if overlap or poor visualization prevents assessment.",
          ],
        },
      }),
    },

    cyst: {
      nuclei: makeFeatureTemplate({
        title: "4 Nuclei",
        subtitle: "Mature cyst nuclear count",
        overview: {
          lead: "A mature Entamoeba hartmanni cyst typically contains four nuclei. This is one of the core maturity features to confirm when identifying the cyst stage.",
          points: [
            "A mature cyst is expected to show four nuclei.",
            "Immature cysts may contain fewer nuclei.",
            "Nuclear count should be assessed together with cyst shape, chromatoid bars, and nuclear detail.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for four distinct internal nuclei distributed within the cyst.",
            "Confirm they are internal cyst nuclei rather than debris or optical artifacts.",
            "Count carefully across focal planes if all nuclei are not visible at once.",
          ],
          appearance: [
            "The nuclei are usually small and rounded.",
            "Some may appear clearer than others depending on focus.",
            "A full set of four supports mature cyst interpretation.",
          ],
        },
        significance: {
          lead: "The presence of four nuclei strongly supports interpretation as a mature Entamoeba hartmanni cyst.",
          points: [
            "Helps stage the organism as a mature cyst.",
            "Supports distinction from immature cysts with fewer nuclei.",
            "Should be correlated with central karyosome and even chromatin distribution.",
          ],
        },
        differential: {
          confusions: [
            "Some nuclei may be missed if the cyst is not fully in focus.",
            "Internal debris may mimic a nuclear structure.",
            "Partial visualization can lead to undercounting.",
          ],
          confirmation: [
            "Examine the entire cyst interior across focus levels.",
            "Check nuclear detail such as karyosome and chromatin to confirm true nuclei.",
            "Use the cyst outline and chromatoid bars as supporting context.",
          ],
        },
        reporting: {
          documentation: [
            "Document as a cyst with four nuclei when all nuclei are confidently visualized.",
            "If fewer are seen, note whether the cyst may be immature or incompletely visualized.",
          ],
          cautions: [
            "Do not force a four-nuclei call if visibility is poor.",
            "Avoid exact counting from a single uncertain focal plane.",
          ],
        },
      }),

      chromatoid: makeFeatureTemplate({
        title: "Rounded / Elongated Chromatoid Bars",
        subtitle: "Supportive internal cyst bodies",
        overview: {
          lead: "Chromatoid bars are supportive internal structures in Entamoeba hartmanni cysts. Their presence adds confidence when interpreted alongside nuclear count and cyst shape.",
          points: [
            "Useful supportive feature for cyst interpretation.",
            "Should be read with the rest of the cyst morphology, not alone.",
            "May vary in visibility depending on maturity and preparation quality.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for compact internal bar-like structures within the cyst.",
            "Assess whether they are distinct from debris or stain precipitate.",
            "Check their position relative to nuclei and the cyst boundary.",
          ],
          appearance: [
            "May appear rounded or elongated.",
            "Usually seen as discrete internal dense bodies.",
            "Often easiest to identify after the cyst wall and nuclei are recognized.",
          ],
        },
        significance: {
          lead: "Chromatoid bars support cyst identification and add weight to a Hartmanni cyst interpretation when the nuclear pattern is also compatible.",
          points: [
            "Supportive rather than stand-alone feature.",
            "Useful in strengthening the overall cyst pattern.",
            "More informative when seen with four nuclei and a spherical cyst wall.",
          ],
        },
        differential: {
          confusions: [
            "Can be confused with internal debris or precipitated stain.",
            "May be overlooked if faint or partially obscured.",
            "Irregular inclusions may falsely suggest chromatoid material.",
          ],
          confirmation: [
            "Confirm the bars lie inside the cyst rather than outside or overlying it.",
            "Reassess nuclei and cyst outline.",
            "Interpret as one part of the full morphological pattern.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatoid bars as supportive internal cyst structures when clearly visualized.",
            "Pair with nuclear count and nuclear morphology in the report.",
          ],
          cautions: [
            "Do not overcall chromatoid bars when debris cannot be excluded.",
            "Avoid basing the identification on this feature alone.",
          ],
        },
      }),

      cystWall: makeFeatureTemplate({
        title: "Spherical Shape",
        subtitle: "Outer cyst contour",
        overview: {
          lead: "The Entamoeba hartmanni cyst is characteristically spherical in shape. This outer contour helps establish that the organism is in the cyst stage.",
          points: [
            "Spherical shape supports cyst-stage interpretation.",
            "Provides the external boundary for evaluating internal structures.",
            "Should be interpreted with nuclear count and chromatoid bars.",
          ],
        },
        recognition: {
          lookFor: [
            "Look for a rounded, enclosed cyst outline.",
            "Check that internal structures lie within a defined spherical boundary.",
            "Assess whether the shape is cyst-like rather than irregular or amoeboid.",
          ],
          appearance: [
            "Typically round to spherical.",
            "The wall encloses the nuclei and internal bars.",
            "Shape may appear slightly distorted in poor preparations or overlaps.",
          ],
        },
        significance: {
          lead: "A spherical cyst contour is important for confirming stage and giving context to the internal nuclear findings.",
          points: [
            "Supports interpretation as a cyst rather than trophozoite.",
            "Helps frame the evaluation of internal nuclei and bars.",
            "Useful supportive stage feature when the internal pattern is compatible.",
          ],
        },
        differential: {
          confusions: [
            "Round debris or artifacts may mimic a cyst outline.",
            "Overlapping material can distort the apparent shape.",
            "A faint wall may make the organism appear less regular than it truly is.",
          ],
          confirmation: [
            "Check that the wall encloses true internal cyst structures.",
            "Correlate with multiple nuclei and supportive nuclear detail.",
            "Use shape and internal content together.",
          ],
        },
        reporting: {
          documentation: [
            "Describe the cyst as spherical when the outer boundary is clearly visualized.",
            "Use as stage-supporting evidence alongside internal morphology.",
          ],
          cautions: [
            "Do not identify the organism from shape alone.",
            "Make sure the outline is biological and not a preparation artifact.",
          ],
        },
      }),

      karyosome: makeFeatureTemplate({
        title: "Centrally Located Karyosome",
        subtitle: "Supportive nuclear feature of each cyst nucleus",
        overview: {
          lead: "Each visible nucleus in an Entamoeba hartmanni cyst should be assessed for a centrally located karyosome. This is an important nuclear detail within the cyst stage.",
          points: [
            "Best assessed after the nuclei themselves are identified.",
            "Useful with nuclear count and chromatin distribution.",
            "Supports recognition of the expected nuclear pattern.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect each visible nucleus for a central dense dot.",
            "Assess whether the dot is centrally placed rather than eccentric.",
            "Compare multiple nuclei if one is unclear.",
          ],
          appearance: [
            "Usually appears as a small central internal body within the nucleus.",
            "Should not dominate the nucleus.",
            "May be easier to see in some nuclei than others.",
          ],
        },
        significance: {
          lead: "A central karyosome supports the expected nuclear morphology of Entamoeba hartmanni cyst nuclei.",
          points: [
            "Adds confidence that the internal structures are true nuclei.",
            "Supports the typical Hartmanni cyst nuclear pattern.",
            "Most useful when the chromatin distribution is also compatible.",
          ],
        },
        differential: {
          confusions: [
            "Poor focus may make the karyosome appear eccentric or indistinct.",
            "Artifact may simulate a nuclear dot.",
            "Incomplete nuclear visualization may make position unreliable.",
          ],
          confirmation: [
            "Verify the nuclear boundary first.",
            "Compare several nuclei in the same cyst.",
            "Use together with chromatin distribution and nuclear count.",
          ],
        },
        reporting: {
          documentation: [
            "Document centrally located karyosome as supportive nuclear morphology when clearly seen.",
            "Mention alongside the number of nuclei rather than in isolation.",
          ],
          cautions: [
            "Do not assign precise position when the nucleus is incomplete or blurred.",
            "Use cautious wording if only one or two nuclei are clearly interpretable.",
          ],
        },
      }),

      chromatin: makeFeatureTemplate({
        title: "Evenly Distributed Chromatin",
        subtitle: "Nuclear edge pattern of the cyst",
        overview: {
          lead: "Even chromatin distribution along the nuclear margin is part of the expected cyst nuclear pattern in Entamoeba hartmanni.",
          points: [
            "This is a supportive nuclear feature.",
            "Best evaluated after nuclei and karyosome are clearly identified.",
            "Should be assessed for distribution and fineness, not just presence.",
          ],
        },
        recognition: {
          lookFor: [
            "Inspect the edge of each visible nucleus for evenly distributed chromatin.",
            "Look for a balanced margin pattern rather than coarse patchy clumps.",
            "Assess more than one nucleus when possible.",
          ],
          appearance: [
            "Usually appears as fairly even chromatin around the nuclear margin.",
            "More regular than random or patchy artifact.",
            "May be subtle if the preparation is thick or poorly focused.",
          ],
        },
        significance: {
          lead: "Evenly distributed chromatin supports the expected Hartmanni cyst nuclear morphology and strengthens interpretation when seen with four nuclei and a central karyosome.",
          points: [
            "Useful supportive feature for cyst recognition.",
            "Helps confirm that observed internal bodies are true nuclei.",
            "Works best as part of the overall cyst pattern.",
          ],
        },
        differential: {
          confusions: [
            "Patchy stain or optical noise may mimic chromatin.",
            "Overstaining can make the margin seem coarser than it is.",
            "Only seeing part of the nucleus can lead to misinterpretation.",
          ],
          confirmation: [
            "Inspect the full nuclear edge when possible.",
            "Correlate with central karyosome and nuclear count.",
            "Treat uncertain edge detail as supportive, not decisive.",
          ],
        },
        reporting: {
          documentation: [
            "Describe chromatin as evenly distributed when clearly visualized around the nuclear margin.",
            "Pair with karyosome position and nuclear count in the final note.",
          ],
          cautions: [
            "Do not overcall the feature when only a small part of the nucleus is seen.",
            "Be conservative in poorly stained specimens.",
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
