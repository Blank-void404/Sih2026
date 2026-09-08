// AI-Assisted Classification Engine (Prototype - Deterministic/Rule-Based)
// This module provides keyword-based classification for societal problem submissions.
// In production, this would be replaced with an actual ML/NLP API.

export interface AIClassification {
  category: string;
  domains: string[];
  potentialSolution: string;
  requiredSkills: string[];
  urgency: "Low" | "Medium" | "High" | "Critical";
  technologies: string[];
  universityDisciplines: string[];
  confidence: number; // 0-100
}

interface KeywordRule {
  keywords: string[];
  category: string;
  domains: string[];
  potentialSolution: string;
  requiredSkills: string[];
  urgency: "Low" | "Medium" | "High" | "Critical";
  technologies: string[];
  universityDisciplines: string[];
}

const CLASSIFICATION_RULES: KeywordRule[] = [
  {
    keywords: ["water", "river", "borewell", "arsenic", "fluoride", "groundwater", "drinking", "contamination", "pollution", "effluent", "sewage", "drainage", "flood", "dam"],
    category: "Water & Sanitation",
    domains: ["Environmental Engineering", "IoT", "Chemical Engineering"],
    potentialSolution: "Automated water quality monitoring and filtration system",
    requiredSkills: ["Water Quality Analytics", "IoT Sensor Design", "Embedded Systems", "Environmental Engineering"],
    urgency: "Critical",
    technologies: ["IoT Sensors", "LoRaWAN", "Solar Power", "Bio-filtration"],
    universityDisciplines: ["Environmental Engineering", "Chemical Engineering", "Electronics & Communication"],
  },
  {
    keywords: ["waste", "garbage", "plastic", "trash", "dump", "recycling", "solid waste", "landfill", "composting", "sewage"],
    category: "Rural Infrastructure",
    domains: ["Environmental Engineering", "IoT", "Mechanical Engineering"],
    potentialSolution: "Smart waste segregation and collection optimization system",
    requiredSkills: ["Embedded Systems", "Mechanical Design", "IoT", "Route Optimization"],
    urgency: "High",
    technologies: ["Ultrasonic Sensors", "NB-IoT", "Computer Vision", "GPS Tracking"],
    universityDisciplines: ["Mechanical Engineering", "Computer Science", "Environmental Science"],
  },
  {
    keywords: ["crop", "agriculture", "farming", "pest", "soil", "irrigation", "harvest", "seed", "fertilizer", "cattle", "livestock", "dairy", "mahua", "paddy", "rice", "wheat", "vegetable"],
    category: "Agriculture & Soil",
    domains: ["Agricultural Engineering", "AI/ML", "IoT"],
    potentialSolution: "AI-powered precision agriculture and crop monitoring system",
    requiredSkills: ["Machine Learning", "Image Processing", "IoT", "Agricultural Science"],
    urgency: "High",
    technologies: ["Edge AI", "Drone Imaging", "Mobile App", "Satellite Data"],
    universityDisciplines: ["Agricultural Engineering", "Computer Science", "Agronomy"],
  },
  {
    keywords: ["health", "hospital", "medical", "disease", "anemia", "malnutrition", "maternal", "pregnancy", "doctor", "medicine", "clinic", "diagnosis", "telemedicine"],
    category: "Healthcare & Nutrition",
    domains: ["Health Informatics", "Biomedical Engineering", "Telemedicine"],
    potentialSolution: "Mobile health diagnostics and telemedicine platform",
    requiredSkills: ["Mobile App Development", "Health Informatics", "Biomedical Sensors", "Offline-first PWA"],
    urgency: "Critical",
    technologies: ["Non-invasive Sensors", "Offline Sync", "SMS Gateway", "Tablet App"],
    universityDisciplines: ["Biomedical Engineering", "Computer Science", "Public Health"],
  },
  {
    keywords: ["school", "education", "student", "teacher", "learning", "digital", "classroom", "literacy", "skill", "training", "college", "university"],
    category: "Education & Skills",
    domains: ["EdTech", "Decentralized Networks", "Content Development"],
    potentialSolution: "Offline digital learning micro-cloud platform",
    requiredSkills: ["Linux Systems", "Wi-Fi Mesh Networking", "Content Localization", "Web Development"],
    urgency: "High",
    technologies: ["Raspberry Pi", "Wi-Fi Mesh", "Solar Power", "Offline Content Server"],
    universityDisciplines: ["Computer Science", "Educational Technology", "Electronics"],
  },
  {
    keywords: ["solar", "energy", "electricity", "power", "battery", "renewable", "wind", "grid", "electrification", "cold storage", "thermal"],
    category: "Renewable Energy",
    domains: ["Renewable Energy", "Electrical Engineering", "Thermal Storage"],
    potentialSolution: "Decentralized solar energy system with storage",
    requiredSkills: ["Solar PV Design", "Battery Management", "Embedded Systems", "Thermal Engineering"],
    urgency: "High",
    technologies: ["Solar Panels", "LiFePO4 Batteries", "Phase Change Materials", "Microcontrollers"],
    universityDisciplines: ["Electrical Engineering", "Mechanical Engineering", "Energy Systems"],
  },
  {
    keywords: ["forest", "wildlife", "elephant", "tiger", "tree", "deforestation", "coal", "mining", "air quality", "smoke", "fire", "environment", "pollution", "biodiversity"],
    category: "Forest & Environment",
    domains: ["Environmental Science", "Computer Vision", "Edge AI"],
    potentialSolution: "AI-powered environmental monitoring and early warning system",
    requiredSkills: ["Edge AI", "Sensor Networks", "Audio/Image ML", "Hazard Modeling"],
    urgency: "Critical",
    technologies: ["Camera Traps", "LoRaWAN", "Thermal Imaging", "Acoustic Sensors"],
    universityDisciplines: ["Environmental Science", "Computer Science", "Electronics & Communication"],
  },
  {
    keywords: ["road", "bridge", "infrastructure", "transport", "connectivity", "building", "housing", "construction", "erosion", "embankment"],
    category: "Rural Infrastructure",
    domains: ["Civil Engineering", "Urban Planning", "Geotechnical Engineering"],
    potentialSolution: "Smart rural infrastructure monitoring system",
    requiredSkills: ["Structural Analysis", "GIS Mapping", "IoT", "Civil Engineering"],
    urgency: "Medium",
    technologies: ["GPS Mapping", "Drone Survey", "Structural Sensors", "GIS"],
    universityDisciplines: ["Civil Engineering", "Urban Planning", "Geotechnical Engineering"],
  },
];

const DEFAULT_CLASSIFICATION: AIClassification = {
  category: "Rural Infrastructure",
  domains: ["Applied Technology", "Community Development"],
  potentialSolution: "Technology-assisted community development solution",
  requiredSkills: ["System Design", "Community Engagement", "Project Management"],
  urgency: "Medium",
  technologies: ["Mobile App", "Cloud Computing", "Data Analytics"],
  universityDisciplines: ["Computer Science", "Social Work", "Management"],
  confidence: 30,
};

export function classifyProblem(description: string): AIClassification {
  if (!description || description.trim().length < 10) {
    return { ...DEFAULT_CLASSIFICATION, confidence: 0 };
  }

  const text = description.toLowerCase();
  let bestMatch: KeywordRule | null = null;
  let bestScore = 0;

  for (const rule of CLASSIFICATION_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        score += keyword.length; // Weight by keyword specificity
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  if (!bestMatch || bestScore < 3) {
    return { ...DEFAULT_CLASSIFICATION, confidence: Math.min(bestScore * 10, 25) };
  }

  // Find secondary matches for cross-domain classification
  const secondaryDomains: string[] = [];
  for (const rule of CLASSIFICATION_RULES) {
    if (rule === bestMatch) continue;
    let score = 0;
    for (const keyword of rule.keywords) {
      if (text.includes(keyword.toLowerCase())) score++;
    }
    if (score >= 2) {
      secondaryDomains.push(...rule.domains.slice(0, 1));
    }
  }

  const allDomains = [...new Set([...bestMatch.domains, ...secondaryDomains])];
  const confidence = Math.min(45 + bestScore * 5, 96);

  return {
    category: bestMatch.category,
    domains: allDomains,
    potentialSolution: bestMatch.potentialSolution,
    requiredSkills: bestMatch.requiredSkills,
    urgency: bestMatch.urgency,
    technologies: bestMatch.technologies,
    universityDisciplines: bestMatch.universityDisciplines,
    confidence,
  };
}

export function generateChallengeId(category: string): string {
  const categoryMap: Record<string, string> = {
    "Water & Sanitation": "WTR",
    "Agriculture & Soil": "AGR",
    "Healthcare & Nutrition": "HLT",
    "Education & Skills": "EDU",
    "Renewable Energy": "ENR",
    "Forest & Environment": "ENV",
    "Rural Infrastructure": "INF",
  };
  const code = categoryMap[category] || "GEN";
  const serial = String(Math.floor(Math.random() * 900) + 100);
  return `JH-${code}-2026-${serial}`;
}
