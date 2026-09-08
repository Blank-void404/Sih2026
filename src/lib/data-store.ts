// Unified Data Store for Jharkhand Societal Innovation Portal (JSIP)

export interface TeamMember {
  id: string;
  name: string;
  branch: string;
  university: string;
  role: string;
  avatarUrl?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  department: string;
  university: string;
  specialization: string;
  email: string;
}

export interface IndustryPartner {
  id: string;
  name: string;
  sector: string;
  supportType: ("FUNDING" | "MENTORSHIP" | "TECHNOLOGY" | "INFRASTRUCTURE" | "TESTING")[];
  fundingPledged?: string;
  contactPerson: string;
  contactEmail: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING";
  dueDate: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  title: string;
  content: string;
}

export interface ActiveProject {
  id: string;
  title: string;
  challengeId: string;
  challengeTitle: string;
  problemStatement: string;
  category:
    | "Water & Sanitation"
    | "Renewable Energy"
    | "Agriculture & Soil"
    | "Healthcare & Nutrition"
    | "Education & Skills"
    | "Forest & Environment"
    | "Rural Infrastructure";
  district: string;
  university: string;
  universityId: string;
  progress: number; // 0 to 100
  status: "PLANNING" | "ONGOING" | "REVIEW" | "COMPLETED";
  startDate: string;
  expectedCompletionDate: string;
  team: TeamMember[];
  mentor: Mentor;
  industryPartner?: IndustryPartner;
  description: string;
  currentMilestone: string;
  nextMilestone: string;
  milestones: Milestone[];
  recentUpdates: ProjectUpdate[];
}

export interface SocietalChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  district: string;
  status: "SUBMITTED" | "ANALYZING" | "RECOMMENDED" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED";
  ai_domain: string;
  ai_priority: "Low" | "Medium" | "High" | "Critical";
  ai_severity: number;
  ai_skills_required: string[];
  funding_needed: string;
  reported_by: string;
  created_at: string;
  assigned_university?: string;
  assigned_project_id?: string;
}

// Initial 5 Realistic Flagship Active Projects + Demo Journey Project
export const INITIAL_PROJECTS: ActiveProject[] = [
  {
    id: "proj-river",
    title: "Subarnarekha River Effluent Real-Time Monitoring Network",
    challengeId: "jh-ch-08",
    challengeTitle: "Industrial Acid Effluent Real-Time Sensor Alert on Subarnarekha River",
    problemStatement:
      "Unregulated discharge of industrial metal plating effluents into the Subarnarekha River is killing aquatic life and contaminating irrigation water for 1,200 farming families in Tupudana and Namkum blocks. Fish mortality events increased 3x in the past year. pH levels drop to 3.2–4.8 (normal: 6.5–8.5). Chromium levels exceed safe limits by 8x.",
    category: "Water & Sanitation",
    district: "Ranchi",
    university: "IIT (ISM) Dhanbad",
    universityId: "univ-iit-dhanbad",
    progress: 78,
    status: "ONGOING",
    startDate: "2026-06-15",
    expectedCompletionDate: "2026-12-31",
    team: [
      {
        id: "tm-r1",
        name: "Arjun Nayak",
        branch: "Chemical Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Lead Sensor Chemist",
      },
      {
        id: "tm-r2",
        name: "Divya Shekhar",
        branch: "Electronics & Communication",
        university: "IIT (ISM) Dhanbad",
        role: "IoT Network Architect",
      },
      {
        id: "tm-r3",
        name: "Prakash Murmu",
        branch: "Computer Science",
        university: "IIT (ISM) Dhanbad",
        role: "Data Pipeline & Dashboard",
      },
      {
        id: "tm-r4",
        name: "Sunita Oraon",
        branch: "Environmental Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Field Environmental Researcher",
      },
      {
        id: "tm-r5",
        name: "Rahul Birua",
        branch: "Civil Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Field Deployment Lead",
      },
    ],
    mentor: {
      id: "men-river",
      name: "Dr. Priya Bhattacharya",
      title: "Associate Professor",
      department: "Department of Environmental Science & Engineering",
      university: "IIT (ISM) Dhanbad",
      specialization: "River Pollution Monitoring & Electrochemical Sensors",
      email: "pbhattacharya@iitism.ac.in",
    },
    industryPartner: {
      id: "ind-river",
      name: "Tata Steel CSR Foundation",
      sector: "Metallurgy & Environmental Responsibility",
      supportType: ["FUNDING", "TECHNOLOGY", "TESTING", "MENTORSHIP"],
      fundingPledged: "₹5,80,000",
      contactPerson: "Dr. Vivek Chhabra (VP, CSR & Sustainability)",
      contactEmail: "csr.environment@tatasteel.com",
    },
    description:
      "Deploying 60 solar-powered multi-parameter electrochemical sensor nodes along 18 km of the Subarnarekha River bank. Each node measures pH, dissolved oxygen, chromium, lead, and turbidity in real-time over LoRaWAN, feeding a live dashboard accessible to the Jharkhand State Pollution Control Board for automated regulatory alerts.",
    currentMilestone: "60 sensor nodes deployed and transmitting live on Subarnarekha riverbanks",
    nextMilestone: "Regulatory handover to JSPCB + Deployment certification and public dashboard launch",
    milestones: [
      {
        id: "mr-1",
        title: "Electrochemical Sensor Array Fabrication",
        description: "Built and NABL-calibrated 60 multi-parameter sensor nodes. pH, Cr, Pb, DO sensors validated against standard solutions.",
        status: "COMPLETED",
        dueDate: "2026-07-30",
      },
      {
        id: "mr-2",
        title: "LoRaWAN Gateway Setup & Data Pipeline",
        description: "Installed 6 gateway nodes and built real-time data ingestion pipeline to cloud dashboard with JSPCB API integration.",
        status: "COMPLETED",
        dueDate: "2026-08-20",
      },
      {
        id: "mr-3",
        title: "Field Deployment — 60 Nodes on 18 km Riverbank",
        description: "All sensor buoys deployed at 300m intervals from Tupudana discharge point to Namkum agricultural zone.",
        status: "COMPLETED",
        dueDate: "2026-09-01",
      },
      {
        id: "mr-4",
        title: "Field Testing & Validation (Live Data)",
        description: "Ongoing real-time monitoring. 3 illegal discharge events already flagged and reported to JSPCB enforcement team.",
        status: "IN_PROGRESS",
        dueDate: "2026-11-30",
      },
      {
        id: "mr-5",
        title: "Regulatory Handover & Deployment Certification",
        description: "Full system handover to JSPCB, public dashboard launch, and official deployment press release.",
        status: "PENDING",
        dueDate: "2026-12-31",
      },
    ],
    recentUpdates: [
      {
        id: "ur-1",
        date: "2026-09-06",
        author: "Arjun Nayak",
        title: "3 illegal discharge events detected and reported",
        content: "Automated pH drop alerts (pH 3.8) triggered at 02:14 AM on Sept 4 — JSPCB enforcement visited the site within 4 hours. This is the first use of the system for live regulatory action.",
      },
      {
        id: "ur-2",
        date: "2026-08-28",
        author: "Dr. Priya Bhattacharya",
        title: "All 60 nodes transmitting — Tata Steel CSR review completed",
        content: "Industry mentor Dr. Vivek Chhabra conducted a field review. Sensor accuracy validated at 97.4%. Tata Steel confirmed full funding tranche released.",
      },
      {
        id: "ur-3",
        date: "2026-08-15",
        author: "Rahul Birua",
        title: "Field deployment completed 2 weeks ahead of schedule",
        content: "All sensor buoys anchored along riverbank. Solar panels and LoRaWAN antennas tested. Data flowing to cloud dashboard live.",
      },
    ],
  },

  {
    id: "proj-01",
    title: "Smart Water Quality Monitoring System",
    challengeId: "jh-ch-01",
    challengeTitle: "Borewell Arsenic & Heavy Metal Contamination in Khunti",
    problemStatement:
      "Over 42 tribal hamlets in Khunti and Murhu blocks face toxic levels of arsenic and fluoride in groundwater. Lack of real-time monitoring leads to prolonged health hazards.",
    category: "Water & Sanitation",
    district: "Khunti",
    university: "Birsa Institute of Technology (BIT) Mesra",
    universityId: "univ-bit-mesra",
    progress: 68,
    status: "ONGOING",
    startDate: "2025-10-15",
    expectedCompletionDate: "2026-11-30",
    team: [
      {
        id: "tm-1",
        name: "Aarav Sharma",
        branch: "Computer Engineering",
        university: "BIT Mesra",
        role: "ML Developer",
      },
      {
        id: "tm-2",
        name: "Priya Patil",
        branch: "Electronics & Communication",
        university: "BIT Mesra",
        role: "IoT Developer",
      },
      {
        id: "tm-3",
        name: "Rohan Kumar",
        branch: "Computer Science",
        university: "BIT Mesra",
        role: "Backend Developer",
      },
      {
        id: "tm-4",
        name: "Sneha Verma",
        branch: "Civil & Environmental Engineering",
        university: "BIT Mesra",
        role: "Water Systems Researcher",
      },
    ],
    mentor: {
      id: "men-1",
      name: "Dr. Anjali Mehta",
      title: "Professor",
      department: "Environmental Engineering",
      university: "BIT Mesra",
      specialization: "Water Management & IoT Sensor Telemetry",
      email: "amehta@bitmesra.ac.in",
    },
    industryPartner: {
      id: "ind-1",
      name: "Tata Steel CSR Foundation",
      sector: "Metallurgy & Social Development",
      supportType: ["FUNDING", "TESTING", "TECHNOLOGY"],
      fundingPledged: "₹4,50,000",
      contactPerson: "Dr. Vivek Chhabra (CSR Lead)",
      contactEmail: "csr.projects@tatasteel.com",
    },
    description:
      "Deploying solar-powered IoT multi-sensor buoys measuring pH, dissolved solids, heavy metals, and arsenic markers with LoRaWAN wireless telemetry backhauled to district health dashboard.",
    currentMilestone: "Installation of 15 IoT sensing probes in Murhu and Torpa rural borewells",
    nextMilestone: "Field telemetry validation and automated SMS alerts to Panchayat health workers",
    milestones: [
      {
        id: "m-1",
        title: "Electrochemical Sensor Calibration",
        description: "Benchmarked sensor readings against NABL accredited lab samples",
        status: "COMPLETED",
        dueDate: "2025-12-10",
      },
      {
        id: "m-2",
        title: "Hardware Enclosure & Solar PCB Prototyping",
        description: "Fabricated IP67 weatherproof enclosures with solar harvesting circuit",
        status: "COMPLETED",
        dueDate: "2026-02-15",
      },
      {
        id: "m-3",
        title: "Rural Borewell Field Pilot (15 Probes)",
        description: "Active deployment across 15 high-fluoride villages in Khunti",
        status: "IN_PROGRESS",
        dueDate: "2026-09-30",
      },
      {
        id: "m-4",
        title: "District Health Alert Integration",
        description: "Cloud telemetry pipeline integration with Jharkhand Jal Nigam portal",
        status: "PENDING",
        dueDate: "2026-11-30",
      },
    ],
    recentUpdates: [
      {
        id: "u-1",
        date: "2026-09-02",
        author: "Aarav Sharma",
        title: "Telemetry accuracy tested at 98.2%",
        content: "Calibrated 15 probe units with standard arsenic baseline solutions in BIT environmental lab.",
      },
      {
        id: "u-2",
        date: "2026-08-20",
        author: "Dr. Anjali Mehta",
        title: "Field visit to Murhu Gram Panchayat",
        content: "Demonstrated early prototype to Mukhiya and conducted clean water awareness session.",
      },
    ],
  },
  {
    id: "proj-02",
    title: "AI-Based Crop Disease Detection",
    challengeId: "jh-ch-03",
    challengeTitle: "Post-Harvest Crop Rot and Early Fungal Blight in Giridih",
    problemStatement:
      "Smallholder farmers in Tisri and Gawan blocks suffer severe crop destruction due to late detection of fungal blights and pest attacks on tomato, maize, and mustard crops.",
    category: "Agriculture & Soil",
    district: "Giridih",
    university: "Birsa Agricultural University (BAU) Kanke",
    universityId: "univ-bau-kanke",
    progress: 82,
    status: "ONGOING",
    startDate: "2025-08-01",
    expectedCompletionDate: "2026-10-15",
    team: [
      {
        id: "tm-5",
        name: "Vikram Mahato",
        branch: "Agricultural Engineering",
        university: "BAU Kanke",
        role: "Edge Vision Lead",
      },
      {
        id: "tm-6",
        name: "Ananya Roy",
        branch: "Computer Science & Engineering",
        university: "BAU Kanke",
        role: "Mobile App Engineer",
      },
      {
        id: "tm-7",
        name: "Deepak Hansda",
        branch: "Electronics & Communication",
        university: "BAU Kanke",
        role: "Drone Telemetry Specialist",
      },
      {
        id: "tm-8",
        name: "Tanvi Sen",
        branch: "Agronomy & Soil Science",
        university: "BAU Kanke",
        role: "Plant Pathology Researcher",
      },
    ],
    mentor: {
      id: "men-2",
      name: "Dr. Rajeshwar Singh",
      title: "Associate Professor",
      department: "Department of Agronomy",
      university: "BAU Kanke",
      specialization: "Precision Farming & AI Plant Pathology",
      email: "rsingh@baujharkhand.ac.in",
    },
    industryPartner: {
      id: "ind-2",
      name: "Dhanuka AgriTech & JSW Foundation",
      sector: "Agri-Inputs & Rural Technology",
      supportType: ["FUNDING", "TESTING", "MENTORSHIP"],
      fundingPledged: "₹3,80,000",
      contactPerson: "Sunil Agrawal (Field Research Director)",
      contactEmail: "field.trials@dhanuka.com",
    },
    description:
      "A lightweight mobile neural network running offline on low-cost Android phones, diagnosing 14 regional leaf blights in seconds and providing organic treatment formulations in Hindi and Santhali.",
    currentMilestone: "Large-scale pilot rollout with 500+ Kisan Vikas Kendra registered farmers",
    nextMilestone: "Automated SMS notification bridge with Jharkhand State Krishi Seva Portal",
    milestones: [
      {
        id: "m-5",
        title: "Dataset Collection (12,000 Field Images)",
        description: "Photographed local crops with symptoms verified by plant pathologists",
        status: "COMPLETED",
        dueDate: "2025-11-30",
      },
      {
        id: "m-6",
        title: "Quantized MobileNet Model Training",
        description: "Achieved 95.4% validation accuracy with model size under 14MB",
        status: "COMPLETED",
        dueDate: "2026-03-10",
      },
      {
        id: "m-7",
        title: "Multilingual Offline App Release",
        description: "Testing dialect voice guides and offline diagnosis caching",
        status: "IN_PROGRESS",
        dueDate: "2026-09-15",
      },
      {
        id: "m-8",
        title: "Kisan Mela Public Demonstration",
        description: "Live demonstration and drone multispectral scan showcase",
        status: "PENDING",
        dueDate: "2026-10-15",
      },
    ],
    recentUpdates: [
      {
        id: "u-3",
        date: "2026-09-01",
        author: "Vikram Mahato",
        title: "Diagnostic accuracy hit 95.4%",
        content: "Tested on 120 live diseased tomato leaves in Tisri block with zero false positives.",
      },
    ],
  },
  {
    id: "proj-03",
    title: "Rural Healthcare Assistance Platform",
    challengeId: "jh-ch-05",
    challengeTitle: "Maternal Anemia & Remote Primary Diagnostic Deficit in Latehar",
    problemStatement:
      "Latehar tribal hamlets lack immediate primary diagnostic access. Pregnant women frequently suffer from undetected severe anemia and high-risk obstetric emergencies.",
    category: "Healthcare & Nutrition",
    district: "Latehar",
    university: "AIIMS Deoghar & Kolhan University",
    universityId: "univ-aiims-deoghar",
    progress: 55,
    status: "ONGOING",
    startDate: "2025-11-10",
    expectedCompletionDate: "2026-12-20",
    team: [
      {
        id: "tm-9",
        name: "Neha Kumari",
        branch: "Biomedical Engineering",
        university: "Kolhan University",
        role: "Tele-Triage Coordinator",
      },
      {
        id: "tm-10",
        name: "Abhinav Prasad",
        branch: "Software Engineering",
        university: "Kolhan University",
        role: "Offline Database Architect",
      },
      {
        id: "tm-11",
        name: "Pooja Tirkey",
        branch: "Health Informatics",
        university: "Kolhan University",
        role: "Community Care Facilitator",
      },
      {
        id: "tm-12",
        name: "Amit Tirkey",
        branch: "Electronics & Instrumentation",
        university: "Kolhan University",
        role: "Portable Vitals Monitor Engineer",
      },
    ],
    mentor: {
      id: "men-3",
      name: "Dr. Sunita Soren",
      title: "Professor & Chief of Community Medicine",
      department: "Community Medicine",
      university: "AIIMS Deoghar",
      specialization: "Tribal Public Health & Tele-Obstetrics",
      email: "ssoren@aiimsdeoghar.edu.in",
    },
    industryPartner: {
      id: "ind-3",
      name: "Apollo Telehealth & Tech Mahindra Foundation",
      sector: "Healthcare Solutions & CSR",
      supportType: ["FUNDING", "TECHNOLOGY", "MENTORSHIP"],
      fundingPledged: "₹5,20,000",
      contactPerson: "Dr. Aradhana Rao",
      contactEmail: "aradhana.rao@apollotelehealth.com",
    },
    description:
      "A ruggedized backpack kit containing non-invasive hemoglobinometer, digital fetal doppler, and offline tele-consultation tablet connecting Anganwadi Sahiyyas directly with Sadar Hospital doctors.",
    currentMilestone: "Equipping 28 Anganwadi sub-centers with solar-rechargeable vital screening kits",
    nextMilestone: "Live tele-consultation pilot connecting Latehar rural clinics with Sadar Hospital",
    milestones: [
      {
        id: "m-9",
        title: "Non-invasive Hemoglobin Sensor Validation",
        description: "Clinical correlation study against laboratory blood draw metrics",
        status: "COMPLETED",
        dueDate: "2026-01-30",
      },
      {
        id: "m-10",
        title: "Offline Sync Software Engine",
        description: "Built SQLite encrypted sync protocol for erratic 2G connectivity",
        status: "COMPLETED",
        dueDate: "2026-05-15",
      },
      {
        id: "m-11",
        title: "Sahiyya Training & Backpack Deployment",
        description: "Hands-on certification for 40 local tribal healthcare workers",
        status: "IN_PROGRESS",
        dueDate: "2026-10-15",
      },
      {
        id: "m-12",
        title: "District Health Dashboard Handover",
        description: "Automated high-risk maternal alert system linking to 108 Ambulance",
        status: "PENDING",
        dueDate: "2026-12-20",
      },
    ],
    recentUpdates: [
      {
        id: "u-4",
        date: "2026-08-28",
        author: "Neha Kumari",
        title: "Screened 1,420 mothers in Latehar",
        content: "Flagged 88 severe anemia cases who received immediate therapeutic iron sucrose supplements.",
      },
    ],
  },
  {
    id: "proj-04",
    title: "Smart Waste Management System",
    challengeId: "jh-ch-08",
    challengeTitle: "Municipal Slurry & Solid Waste Accumulation in Dhanbad",
    problemStatement:
      "Urban slums and mining clusters across Dhanbad face hazardous garbage heaps, toxic drainage choke points, and irregular garbage vehicle clearance schedules.",
    category: "Rural Infrastructure",
    district: "Dhanbad",
    university: "IIT (ISM) Dhanbad",
    universityId: "univ-iit-dhanbad",
    progress: 74,
    status: "ONGOING",
    startDate: "2025-09-12",
    expectedCompletionDate: "2026-10-30",
    team: [
      {
        id: "tm-13",
        name: "Siddharth Jha",
        branch: "Mechanical Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Robotics & Sorting Designer",
      },
      {
        id: "tm-14",
        name: "Rahul Marandi",
        branch: "Computer Science",
        university: "IIT (ISM) Dhanbad",
        role: "Routing Optimization Engineer",
      },
      {
        id: "tm-15",
        name: "Shreya Murmu",
        branch: "Environmental Science",
        university: "IIT (ISM) Dhanbad",
        role: "Waste Segregation Lead",
      },
      {
        id: "tm-16",
        name: "Kunal Baski",
        branch: "Electrical Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Ultrasonic Sensor Developer",
      },
      {
        id: "tm-17",
        name: "Tanya Agarwal",
        branch: "Urban Engineering",
        university: "IIT (ISM) Dhanbad",
        role: "Logistics Modeler",
      },
    ],
    mentor: {
      id: "men-4",
      name: "Prof. Amitava Ghosh",
      title: "Professor",
      department: "Department of Environmental Science & Engineering",
      university: "IIT (ISM) Dhanbad",
      specialization: "Solid Waste Management & Smart Urban Infrastructure",
      email: "aghosh@iitism.ac.in",
    },
    industryPartner: {
      id: "ind-4",
      name: "Bokaro Steel Plant (SAIL) & JSW Steel",
      sector: "Heavy Industry & Urban Infrastructure",
      supportType: ["FUNDING", "INFRASTRUCTURE", "TESTING"],
      fundingPledged: "₹6,10,000",
      contactPerson: "Rajesh Sahu (General Manager, Environmental Management)",
      contactEmail: "sail.bokaro.csr@sail.in",
    },
    description:
      "Solar-powered ultrasonic volume bin nodes communicating fill levels over cellular NB-IoT, feeding dynamic vehicle routing algorithms that reduce municipal diesel expenditure by 34%.",
    currentMilestone: "Live deployment on 60 communal dump bins in Dhanbad Zone 3",
    nextMilestone: "Automated conveyor AI segregation trial at Dhanbad Central Composting Facility",
    milestones: [
      {
        id: "m-13",
        title: "Sensor Node Ruggedization",
        description: "Methane and ultrasonic sensor arrays tested against high humidity",
        status: "COMPLETED",
        dueDate: "2025-12-20",
      },
      {
        id: "m-14",
        title: "Dynamic Dispatch Route Algorithm",
        description: "Optimized multi-truck shortest path calculation with vehicle capacity constraints",
        status: "COMPLETED",
        dueDate: "2026-03-30",
      },
      {
        id: "m-15",
        title: "60-Bin Urban Pilot",
        description: "Real-time telemetry monitored by Dhanbad Municipal Corporation",
        status: "IN_PROGRESS",
        dueDate: "2026-09-25",
      },
      {
        id: "m-16",
        title: "Recycling Sorter AI Integration",
        description: "Vision-based robotic separator for dry recyclable plastics",
        status: "PENDING",
        dueDate: "2026-10-30",
      },
    ],
    recentUpdates: [
      {
        id: "u-5",
        date: "2026-08-30",
        author: "Rahul Marandi",
        title: "Municipal fleet saved 310 liters diesel in 2 weeks",
        content: "Dynamic routing reduced unnecessary rounds for under-filled bins across Katras road corridor.",
      },
    ],
  },
  {
    id: "proj-05",
    title: "Rural Education & Digital Learning Platform",
    challengeId: "jh-ch-07",
    challengeTitle: "Lack of STEM Connectivity in Remote Simdega High Schools",
    problemStatement:
      "Over 35 tribal residential schools in Simdega have zero internet access. Students lack exposure to modern STEM experiments, coding, and quality vernacular educational media.",
    category: "Education & Skills",
    district: "Simdega",
    university: "Ranchi University",
    universityId: "univ-ranchi-univ",
    progress: 45,
    status: "ONGOING",
    startDate: "2026-01-10",
    expectedCompletionDate: "2026-11-15",
    team: [
      {
        id: "tm-18",
        name: "Sumit Kumar",
        branch: "Information Technology",
        university: "Ranchi University",
        role: "Micro-Cloud Network Engineer",
      },
      {
        id: "tm-19",
        name: "Kavita Bage",
        branch: "Educational Sciences",
        university: "Ranchi University",
        role: "Vernacular Content Specialist",
      },
      {
        id: "tm-20",
        name: "Manish Soren",
        branch: "Computer Science",
        university: "Ranchi University",
        role: "Interactive Simulation Developer",
      },
      {
        id: "tm-21",
        name: "Divya Prakash",
        branch: "Electronics & Communications",
        university: "Ranchi University",
        role: "Solar Hardware Engineer",
      },
    ],
    mentor: {
      id: "men-5",
      name: "Dr. Manisha Oraon",
      title: "Associate Professor",
      department: "Department of Computer Applications",
      university: "Ranchi University",
      specialization: "Educational Technology & Offline Mesh Micro-Clouds",
      email: "moraon@ranchiuniversity.ac.in",
    },
    industryPartner: {
      id: "ind-5",
      name: "Tech Mahindra Foundation",
      sector: "Information Technology & Education CSR",
      supportType: ["TECHNOLOGY", "FUNDING", "MENTORSHIP"],
      fundingPledged: "₹3,00,000",
      contactPerson: "Sanjay Bose (Director CSR East)",
      contactEmail: "sanjay.bose@techmahindra.com",
    },
    description:
      "A solar-powered Raspberry Pi local micro-server creating an autonomous 100m Wi-Fi intranet bubble inside school classrooms, streaming Khan Academy, NCERT labs, and PhET simulations with zero internet cost.",
    currentMilestone: "Installing micro-cloud mesh hubs in 10 tribal Kasturba Gandhi Balika Vidyalayas",
    nextMilestone: "Student interactive STEM competition and teacher vernacular training",
    milestones: [
      {
        id: "m-17",
        title: "Content Localization (Ho, Mundari, Santhali)",
        description: "Dubbed 60 STEM interactive modules into local tribal dialects",
        status: "COMPLETED",
        dueDate: "2026-03-20",
      },
      {
        id: "m-18",
        title: "Low-Power Solar Battery Box Design",
        description: "Built 12V LiFePO4 battery pack providing 14 hours continuous server run",
        status: "COMPLETED",
        dueDate: "2026-06-15",
      },
      {
        id: "m-19",
        title: "10 School Deployment Pilot",
        description: "Deploying hubs in Bano, Jaldega, and Kurdeg blocks",
        status: "IN_PROGRESS",
        dueDate: "2026-09-30",
      },
      {
        id: "m-20",
        title: "Evaluation & Scaling Strategy",
        description: "Assessment of student learning curve and digital literacy score gains",
        status: "PENDING",
        dueDate: "2026-11-15",
      },
    ],
    recentUpdates: [
      {
        id: "u-6",
        date: "2026-08-25",
        author: "Sumit Kumar",
        title: "Server hardware deployed in 4 KGBV schools",
        content: "Students accessed 450 hours of math simulations without requiring cellular data connection.",
      },
    ],
  },
];

// Available Grassroots Challenges for Adoptions / Industry Support
export const INITIAL_CHALLENGES: SocietalChallenge[] = [
  {
    id: "jh-ch-01",
    title: "Borewell Arsenic & Heavy Metal Filtration in Khunti Blocks",
    description:
      "Over 42 tribal hamlets in Khunti and Murhu blocks face toxic levels of arsenic and fluoride in borewell water. Lack of low-maintenance, chemical-free community filtration systems causes severe fluorosis among children.",
    category: "Water & Sanitation",
    district: "Khunti",
    status: "IN_PROGRESS",
    ai_domain: "Environmental Engineering & IoT",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Hydrogeology", "Bio-adsorption Filters", "Solar Pump Integration"],
    funding_needed: "₹4,50,000",
    reported_by: "Birsa Gram Vikas Samiti",
    created_at: "2026-08-28T10:00:00Z",
    assigned_university: "Birsa Institute of Technology (BIT) Mesra",
    assigned_project_id: "proj-01",
  },
  {
    id: "jh-ch-02",
    title: "Underground Coal Fire Smoke Suppression & Early Warning in Jharia",
    description:
      "Subsurface coal seams continue burning across Jharia mining zones, emitting carbon monoxide and sulphur dioxide. Local residents need affordable low-cost air quality alert sensors and localized suppression barriers.",
    category: "Forest & Environment",
    district: "Dhanbad",
    status: "RECOMMENDED",
    ai_domain: "IoT & Thermal Geospatial Mapping",
    ai_priority: "Critical",
    ai_severity: 10,
    ai_skills_required: ["Thermal Drone Imaging", "Sensor Mesh Networks", "Hazard Modeling"],
    funding_needed: "₹8,00,000",
    reported_by: "Dhanbad Environmental Action Cell",
    created_at: "2026-08-20T14:30:00Z",
  },
  {
    id: "jh-ch-03",
    title: "Decentralized Solar Cold Storage for Perishable Vegetables",
    description:
      "Smallholder farmers growing tomatoes and cauliflower in Tisri and Gawan blocks suffer 40% post-harvest rot during transit due to erratic grid power. A portable thermal battery cold room is needed.",
    category: "Renewable Energy",
    district: "Giridih",
    status: "IN_PROGRESS",
    ai_domain: "Renewable Energy & Thermal Storage",
    ai_priority: "High",
    ai_severity: 8,
    ai_skills_required: ["Phase Change Materials", "Solar PV Systems", "Embedded Microcontrollers"],
    funding_needed: "₹3,20,000",
    reported_by: "Giridih Kisan Utthan Producer Co.",
    created_at: "2026-08-24T09:15:00Z",
    assigned_university: "Birsa Agricultural University (BAU) Kanke",
    assigned_project_id: "proj-02",
  },
  {
    id: "jh-ch-04",
    title: "AI Elephant Corridor Detection to Prevent Human-Wildlife Conflict",
    description:
      "In the dense Saranda forest belt of West Singhbhum, wild elephant herds frequently cross into agrarian villages, leading to fatal encounters and crop loss. An optical/acoustic early-warning buzzer system is urgently requested.",
    category: "Forest & Environment",
    district: "West Singhbhum",
    status: "RECOMMENDED",
    ai_domain: "Computer Vision & Edge AI",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Edge AI Camera traps", "LoRaWAN Transceivers", "Audio Spectrogram ML"],
    funding_needed: "₹5,00,000",
    reported_by: "Saranda Van Suraksha Samiti",
    created_at: "2026-08-15T11:45:00Z",
  },
  {
    id: "jh-ch-05",
    title: "Maternal Anemia & Malnutrition Supply Tracking in Latehar & Gumla",
    description:
      "Over 65% of pregnant women in remote Latehar forest pockets suffer from severe anemia. Anganwadi iron supplements frequently experience delivery stockouts with no digitized distribution visibility.",
    category: "Healthcare & Nutrition",
    district: "Latehar",
    status: "IN_PROGRESS",
    ai_domain: "Health Informatics & Predictive Logistics",
    ai_priority: "High",
    ai_severity: 8,
    ai_skills_required: ["Offline-first PWA", "SMS Gateway Integration", "Inventory Optimization"],
    funding_needed: "₹2,50,000",
    reported_by: "Jharkhand Women & Child Health Collective",
    created_at: "2026-08-22T08:30:00Z",
    assigned_university: "AIIMS Deoghar & Kolhan University",
    assigned_project_id: "proj-03",
  },
  {
    id: "jh-ch-06",
    title: "Solar-Powered Processing & Deseeding Machine for Mahua Flowers",
    description:
      "Tribal women collectors spend 6–8 hours manually drying and destoning forest Mahua and Chironji fruits, resulting in low sale margins to middlemen. A mechanized solar dryer and peeler would double producer income.",
    category: "Agriculture & Soil",
    district: "Gumla",
    status: "RECOMMENDED",
    ai_domain: "Mechanical Design & Rural Engineering",
    ai_priority: "Medium",
    ai_severity: 6,
    ai_skills_required: ["Low-Cost Mechanical Design", "Solar Thermal Drying", "Ergonomics"],
    funding_needed: "₹1,80,000",
    reported_by: "Mahila Vanopaj Mandali Gumla",
    created_at: "2026-08-18T16:20:00Z",
  },
  {
    id: "jh-ch-07",
    title: "Solar-Powered Mesh Micro-Cloud for Remote Digital Classrooms",
    description:
      "More than 35 government secondary schools in forested Simdega have no cellular coverage. Students lack access to video lectures, interactive STEM labs, and NCERT digital simulations.",
    category: "Education & Skills",
    district: "Simdega",
    status: "IN_PROGRESS",
    ai_domain: "Decentralized Networks & EdTech",
    ai_priority: "High",
    ai_severity: 7,
    ai_skills_required: ["Linux Microservers", "Wi-Fi Hotspot Caching", "Interactive Web Apps"],
    funding_needed: "₹2,20,000",
    reported_by: "Vidyalaya Sahayog Manch",
    created_at: "2026-08-10T13:10:00Z",
    assigned_university: "Ranchi University",
    assigned_project_id: "proj-05",
  },
  {
    id: "jh-ch-08",
    title: "Industrial Acid Effluent Real-Time Sensor Alert on Subarnarekha River",
    description:
      "Unregulated discharge of industrial metal plating effluents into the Subarnarekha River kills aquatic life and affects downstream farming in Tupudana and Namkum. Real-time water probe monitoring is required.",
    category: "Water & Sanitation",
    district: "Ranchi",
    status: "IN_PROGRESS",
    ai_domain: "Environmental Sensing & Geo-Telemetry",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Chemical Electro-sensors", "Water Quality Analytics", "LoRaWAN"],
    funding_needed: "₹5,80,000",
    reported_by: "Subarnarekha Bachao Samiti",
    created_at: "2026-08-30T17:00:00Z",
    assigned_university: "IIT (ISM) Dhanbad",
    assigned_project_id: "proj-river",
  },
];

// Helper functions for reading & updating stored data
const STORAGE_PROJECTS_KEY = "jsip_active_projects_v1";
const STORAGE_CHALLENGES_KEY = "jsip_challenges_v1";

export function getStoredProjects(): ActiveProject[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  try {
    const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: ActiveProject[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects to localStorage", e);
  }
}

export function getStoredChallenges(): SocietalChallenge[] {
  if (typeof window === "undefined") return INITIAL_CHALLENGES;
  try {
    const saved = localStorage.getItem(STORAGE_CHALLENGES_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_CHALLENGES_KEY, JSON.stringify(INITIAL_CHALLENGES));
      return INITIAL_CHALLENGES;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_CHALLENGES;
  }
}

export function saveStoredChallenges(challenges: SocietalChallenge[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_CHALLENGES_KEY, JSON.stringify(challenges));
  } catch (e) {
    console.error("Failed to save challenges to localStorage", e);
  }
}

// Add new project from university challenge adoption
export function adoptChallengeAsProject(
  challenge: SocietalChallenge,
  universityName: string,
  facultyMentor: Mentor,
  studentTeam: TeamMember[]
): ActiveProject {
  const currentProjects = getStoredProjects();
  const currentChallenges = getStoredChallenges();

  const newProject: ActiveProject = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    title: `Project: ${challenge.title.slice(0, 50)}`,
    challengeId: challenge.id,
    challengeTitle: challenge.title,
    problemStatement: challenge.description,
    category: challenge.category as any,
    district: challenge.district,
    university: universityName,
    universityId: `univ-${Date.now()}`,
    progress: 15,
    status: "PLANNING",
    startDate: new Date().toISOString().split("T")[0],
    expectedCompletionDate: new Date(Date.now() + 180 * 86400000).toISOString().split("T")[0],
    team: studentTeam,
    mentor: facultyMentor,
    description: `Academic research and prototype development addressing ${challenge.title} in ${challenge.district} district.`,
    currentMilestone: "Initial field assessment and stakeholder interviews",
    nextMilestone: "System architecture and component procurement",
    milestones: [
      {
        id: `m-init-${Date.now()}-1`,
        title: "Field Problem Formulation & Stakeholder Alignment",
        description: "Engage with local citizens and administrative officials to refine requirements",
        status: "IN_PROGRESS",
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      },
      {
        id: `m-init-${Date.now()}-2`,
        title: "Proof of Concept Prototyping",
        description: "Develop working lab prototype satisfying key performance indicators",
        status: "PENDING",
        dueDate: new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
      },
      {
        id: `m-init-${Date.now()}-3`,
        title: "Field Pilot Demonstration",
        description: "Deploy pilot in district community setting and gather feedback",
        status: "PENDING",
        dueDate: new Date(Date.now() + 180 * 86400000).toISOString().split("T")[0],
      },
    ],
    recentUpdates: [
      {
        id: `upd-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        author: facultyMentor.name,
        title: "Challenge adopted by University research team",
        content: `Team formed under mentor ${facultyMentor.name} with ${studentTeam.length} student researchers.`,
      },
    ],
  };

  // Update challenges
  const updatedChallenges = currentChallenges.map((c) =>
    c.id === challenge.id
      ? { ...c, status: "IN_PROGRESS" as const, assigned_university: universityName, assigned_project_id: newProject.id }
      : c
  );

  saveStoredChallenges(updatedChallenges);
  saveStoredProjects([newProject, ...currentProjects]);

  return newProject;
}

// Add Industry Support to a Project
export function addIndustrySupportToProject(
  projectId: string,
  partner: IndustryPartner,
  updateNote: string
) {
  const currentProjects = getStoredProjects();
  const updated = currentProjects.map((p) => {
    if (p.id === projectId) {
      const newUpdate: ProjectUpdate = {
        id: `upd-ind-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        author: partner.name,
        title: `Industry Partnership Established: ${partner.supportType.join(", ")}`,
        content: updateNote || `${partner.name} pledged ${partner.fundingPledged || "support"} under Corporate CSR initiative.`,
      };
      return {
        ...p,
        industryPartner: partner,
        recentUpdates: [newUpdate, ...p.recentUpdates],
      };
    }
    return p;
  });
  saveStoredProjects(updated);
  return updated;
}

// Update milestone status in project
export function updateProjectMilestoneStatus(
  projectId: string,
  milestoneId: string,
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING"
) {
  const currentProjects = getStoredProjects();
  const updated = currentProjects.map((p) => {
    if (p.id === projectId) {
      const updatedMilestones = p.milestones.map((m) =>
        m.id === milestoneId ? { ...m, status } : m
      );
      // Recalculate progress %
      const completedCount = updatedMilestones.filter((m) => m.status === "COMPLETED").length;
      const progress = Math.round((completedCount / updatedMilestones.length) * 100);
      return {
        ...p,
        milestones: updatedMilestones,
        progress,
      };
    }
    return p;
  });
  saveStoredProjects(updated);
  return updated;
}
