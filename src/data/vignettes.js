// src/data/vignettes.js
// Complete vignettes data for Activity Classification Exercise

export const vignettesData = [
  {
    id: 1,
    title: "Pre-NDD Round Preparation",
    program: "Deworming (DtWI)",
    state: "Rajasthan",
    timeline: "7 days before NDD Round",
    scenario: `Priya Sharma, State MLE Officer in Rajasthan, has exactly 7 days before the February NDD round. A major drug consignment of 2.5 million Albendazole tablets has arrived at the state warehouse, but the bundling plan isn't finalized. Three districts are showing 15% higher enrollment due to new private schools in UDISE, requiring target revision.

The Central MLE Team has requested last round's coverage data analysis and Cost Per Child calculations for an upcoming donor review. They've flagged that telecalling completion was only 67% in August and want a variance analysis.

The Regional Coordinator has shared photos of damaged drug cartons at Ajmer warehouse - 50,000 tablets may need recall and replacement. The NHM Additional Director has called twice for the SCCM presentation draft.`,
    activities: [
      { id: 1, text: "Update UDISE database with latest private school enrollment figures", correctAnswer: "PROGRAM" },
      { id: 2, text: "Revise drug bundling plan based on updated district-wise targets", correctAnswer: "PROGRAM" },
      { id: 3, text: "Calculate district and block level targets for NDD round", correctAnswer: "PROGRAM" },
      { id: 4, text: "Prepare and present SCCM presentation to NHM leadership", correctAnswer: "PROGRAM" },
      { id: 5, text: "Create login credentials and upload contact database for new TCs", correctAnswer: "PROGRAM" },
      { id: 6, text: "Conduct orientation session for newly hired Telecallers", correctAnswer: "PROGRAM" },
      { id: 7, text: "Coordinate drug recall from Ajmer and arrange replacement stock", correctAnswer: "PROGRAM" },
      { id: 8, text: "Coordinate with NHM for training venue approvals and logistics", correctAnswer: "PROGRAM" },
      { id: 9, text: "Analyze last round's telecalling completion rate and prepare variance report", correctAnswer: "MLE" },
      { id: 10, text: "Calculate Cost Per Child metrics from August round for donor reporting", correctAnswer: "MLE" },
      { id: 11, text: "Update real-time tracker template based on field team feedback", correctAnswer: "GREY" },
      { id: 12, text: "Finalize monitoring checklists for preparatory phase visits", correctAnswer: "GREY" },
      { id: 13, text: "Share coverage reporting guidance and Google Forms with districts", correctAnswer: "GREY" },
      { id: 14, text: "Review and clean previous round's government monitoring visit data", correctAnswer: "MLE" },
      { id: 15, text: "Prepare detailed program factsheet with round-wise achievements", correctAnswer: "MLE" }
    ]
  },
  {
    id: 2,
    title: "IFA Monthly Review",
    program: "Iron Folic Acid (IFA)",
    state: "Madhya Pradesh",
    timeline: "Third week of month",
    scenario: `Amit Kumar, State MLE Officer for IFA in Madhya Pradesh, is managing multiple deadlines. The Mission Director has called an urgent review meeting - IFA coverage in 14 tribal districts has dropped 8% compared to last year, and he wants root cause analysis with corrective actions.

Three Regional Coordinators have escalated issues: CAPI tool crashing on Android 8 tablets, 340 invalid school contact numbers, and expired Google Form links. The Central Team needs the quarterly GT/Donor report next week.

Six new districts have been added to IFA intensification starting next month. Amit needs to coordinate facility mapping and ensure supply chain includes them in procurement.`,
    activities: [
      { id: 1, text: "Compile and analyze district-wise PPM and DDM data for NHM review", correctAnswer: "MLE" },
      { id: 2, text: "Analyze E-Aushadhi stock data to identify blocks needing redistribution", correctAnswer: "GREY" },
      { id: 3, text: "Link HMIS consumption data with E-Aushadhi for supply optimization", correctAnswer: "MLE" },
      { id: 4, text: "Troubleshoot CAPI tool crashing on Android 8 tablets", correctAnswer: "GREY" },
      { id: 5, text: "Clean TC contact database by removing invalid school numbers", correctAnswer: "PROGRAM" },
      { id: 6, text: "Regenerate Google Form links and re-share with Jabalpur region", correctAnswer: "GREY" },
      { id: 7, text: "Prepare monthly HMIS trend analysis showing coverage patterns", correctAnswer: "MLE" },
      { id: 8, text: "Compile Hb testing results from 5 districts for donor reporting", correctAnswer: "MLE" },
      { id: 9, text: "Update PPM tracker with current month's coverage figures", correctAnswer: "MLE" },
      { id: 10, text: "Map CHCs, PHCs, AWCs, and schools for 6 new intensification districts", correctAnswer: "PROGRAM" },
      { id: 11, text: "Coordinate with supply chain for including new districts in procurement", correctAnswer: "PROGRAM" },
      { id: 12, text: "Conduct field visit to monitor IFA distribution in underperforming blocks", correctAnswer: "GREY" },
      { id: 13, text: "Document Sagar district Shakti Divas model as best practice", correctAnswer: "MLE" },
      { id: 14, text: "Set up weekly IFA supply tracker system for new districts", correctAnswer: "GREY" },
      { id: 15, text: "Prepare quarterly presentation based on DDM analysis findings", correctAnswer: "MLE" },
      { id: 16, text: "Follow up with RCs on pending government monitoring visit data", correctAnswer: "MLE" }
    ]
  },
  {
    id: 3,
    title: "Annual Review and Planning",
    program: "DtWI + IFA",
    state: "Jharkhand",
    timeline: "Last 2 weeks of March (FY End)",
    scenario: `Sunita Devi, State MLE Officer in Jharkhand, is managing the year-end crunch. The State Health Secretary has convened an annual review meeting next week covering both NDD and IFA programs. She needs round-wise NDD coverage data, district scorecards, IFA HMIS trends, and "evidence of impact beyond coverage numbers."

The Global Team deadline for Cost Per Child calculations is March 25th - requiring expenditure compilation and 3-year variance analysis. The Central MLE Team needs the CES findings dissemination report.

The NHM Finance Controller is pressing for next year's PIP draft with census-extrapolated population figures and drug projections for 4 NDD rounds.`,
    activities: [
      { id: 1, text: "Compile round-wise NDD coverage data and prepare district scorecards", correctAnswer: "MLE" },
      { id: 2, text: "Analyze annual IFA HMIS trends and prepare comparison report", correctAnswer: "MLE" },
      { id: 3, text: "Calculate Cost Per Child for NDD and IFA programs", correctAnswer: "MLE" },
      { id: 4, text: "Conduct 3-year CPC variance analysis for donor reporting", correctAnswer: "MLE" },
      { id: 5, text: "Prepare CES findings dissemination report and presentation", correctAnswer: "MLE" },
      { id: 6, text: "Share census-extrapolated population figures for next year's PIP", correctAnswer: "PROGRAM" },
      { id: 7, text: "Develop activity-wise budget estimates based on current year actuals", correctAnswer: "PROGRAM" },
      { id: 8, text: "Project drug requirements for 4 NDD rounds and submit to supply chain", correctAnswer: "PROGRAM" },
      { id: 9, text: "Prepare ROP analysis document justifying budget requests", correctAnswer: "GREY" },
      { id: 10, text: "Collect and compile incomplete CPC data from 6 districts", correctAnswer: "MLE" },
      { id: 11, text: "Follow up on missing drug recall documentation from 3 districts", correctAnswer: "PROGRAM" },
      { id: 12, text: "Review consultant monitoring reports for payment processing", correctAnswer: "GREY" },
      { id: 13, text: "Develop state-specific MLE workplan for next financial year", correctAnswer: "GREY" },
      { id: 14, text: "Coordinate with NHM for annual review meeting logistics", correctAnswer: "PROGRAM" },
      { id: 15, text: "Prepare evidence synthesis on 'impact beyond coverage' for Secretary", correctAnswer: "MLE" },
      { id: 16, text: "Assess feasibility of tablet-based monitoring and integrated dashboards", correctAnswer: "GREY" }
    ]
  },
  {
    id: 4,
    title: "Water Quality Alert Response",
    program: "In-line Safe Water (ISW)",
    state: "Madhya Pradesh",
    timeline: "Mid-week urgent response",
    scenario: `Rajesh Patel, State MLE Officer for ISW in Madhya Pradesh, receives an urgent alert: 23 out of 156 LMT sites are showing FCR values below 0.2 mg/L for three consecutive days. These sites serve 45,000 households. The Program Director needs answers by tomorrow's state call - is this a dosing issue, measurement error, or equipment malfunction?

The Water Point Survey team flagged 8 of these sites last month for infrastructure issues - damaged pipes, faulty tanks, irregular power supply. But repairs haven't happened.

The IM supervisor reports 4 devices with calibration errors. The Central Team needs the quarterly KPI tracker update this week.`,
    activities: [
      { id: 1, text: "Analyze FHH vs LHH FCR variance to identify chlorine degradation cause", correctAnswer: "MLE" },
      { id: 2, text: "Review LMT dose-check data and flag discrepancies to program team", correctAnswer: "GREY" },
      { id: 3, text: "Cross-reference WPS infrastructure findings with low-FCR sites", correctAnswer: "MLE" },
      { id: 4, text: "Clean Process Monitoring data - remove duplicate entries", correctAnswer: "MLE" },
      { id: 5, text: "Integrate 'Other-Specify' responses into standard categories", correctAnswer: "MLE" },
      { id: 6, text: "Monitor KPIs and generate High Frequency Error Reports", correctAnswer: "MLE" },
      { id: 7, text: "Coordinate with IM for emergency recalibration of 4 devices", correctAnswer: "PROGRAM" },
      { id: 8, text: "Reschedule monitoring visits to free technical staff for repairs", correctAnswer: "GREY" },
      { id: 9, text: "Escalate infrastructure repair needs for 8 flagged sites to program team", correctAnswer: "GREY" },
      { id: 10, text: "Prepare root cause analysis report for weekly state call", correctAnswer: "MLE" },
      { id: 11, text: "Update site coverage tracker for Process Monitoring survey", correctAnswer: "MLE" },
      { id: 12, text: "Maintain schedulers and planners for ongoing survey activities", correctAnswer: "MLE" },
      { id: 13, text: "Update Power BI dashboard with latest dose-check data", correctAnswer: "MLE" },
      { id: 14, text: "Refresh HTML site dashboard for district team access", correctAnswer: "MLE" },
      { id: 15, text: "Update quarterly ISW KPI tracker for central reporting", correctAnswer: "MLE" },
      { id: 16, text: "Share WPS back-check findings with survey agency for corrections", correctAnswer: "MLE" }
    ]
  },
  {
    id: 5,
    title: "Program Expansion Planning",
    program: "In-line Safe Water (ISW)",
    state: "Andhra Pradesh",
    timeline: "Quarterly planning period",
    scenario: `Lakshmi Narayana, State MLE Officer for ISW in Andhra Pradesh, is managing program expansion from 3 pilot districts to 8 districts. She must support site selection by short-listing Group A sites from the water point database, and the Pre-implementation Survey tools need Telugu translation.

The existing pilot districts need attention too. Performance Monitoring data shows only 62% of connected households regularly use treated water. The device calibration dashboard shows 11 devices pending calibration.

The Central Team needs: updated Operational Tracker, Monthly Activity Calendar, and weekly progress call data.`,
    activities: [
      { id: 1, text: "Short-list Group A sites from water point database for expansion", correctAnswer: "PROGRAM" },
      { id: 2, text: "Facilitate Telugu translation of Pre-implementation Survey tools", correctAnswer: "GREY" },
      { id: 3, text: "Design and deliver training for IM teams on TA and LMT protocols", correctAnswer: "PROGRAM" },
      { id: 4, text: "Update training materials with pilot phase lessons learned", correctAnswer: "GREY" },
      { id: 5, text: "Analyze household-level Performance Monitoring data on water usage", correctAnswer: "MLE" },
      { id: 6, text: "Review Model B formative research for behavior change insights", correctAnswer: "MLE" },
      { id: 7, text: "Monitor device calibration status through dashboards", correctAnswer: "MLE" },
      { id: 8, text: "Coordinate with IM firm to clear calibration backlog", correctAnswer: "PROGRAM" },
      { id: 9, text: "Support program team in updating Operational Tracker", correctAnswer: "GREY" },
      { id: 10, text: "Prepare Monthly Activity Calendar for program reporting", correctAnswer: "GREY" },
      { id: 11, text: "Compile weekly progress call data for stakeholder communication", correctAnswer: "MLE" },
      { id: 12, text: "Coordinate with survey agency on Process Monitoring submissions", correctAnswer: "MLE" },
      { id: 13, text: "Update AP FC Dashboard with quarterly compliance data", correctAnswer: "MLE" },
      { id: 14, text: "Prepare cost efficiency metrics for leadership presentation", correctAnswer: "MLE" },
      { id: 15, text: "Design SurveyCTO forms for WPS mop-up round", correctAnswer: "GREY" },
      { id: 16, text: "Conduct field supervision for Pre-implementation survey", correctAnswer: "GREY" }
    ]
  }
];

// Color configuration
export const colors = {
  program: { bg: '#1e3a5f', light: '#e8f1f8', text: '#1e3a5f' },
  grey: { bg: '#b8860b', light: '#fff3cd', text: '#856404' },
  mle: { bg: '#5c3d2e', light: '#faf3ee', text: '#5c3d2e' }
};

// State options
export const stateOptions = [
  'Rajasthan',
  'Madhya Pradesh',
  'Jharkhand',
  'Haryana',
  'Uttarakhand',
  'Andhra Pradesh',
  'Bihar',
  'Chhattisgarh',
  'Telangana'
];

// Team options
export const teamOptions = [
  'Team 1',
  'Team 2',
  'Team 3',
  'Team 4',
  'Team 5',
  'Team 6',
  'Team 7',
  'Team 8'
];
