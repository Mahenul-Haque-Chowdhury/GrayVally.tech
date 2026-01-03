import {
  Building2,
  Users,
  Handshake,
  CheckSquare,
  Banknote,
  Truck,
  Store,
  BarChart3,
  ShieldCheck,
  Megaphone,
  Headphones,
  Settings,
} from "lucide-react";

export const softwareSolutionCategories = [
  {
    title: "Core Business & Enterprise Systems",
    description: "Foundational platforms that run the entire organization.",
    icon: Building2,
    items: [
      {
        id: "company-management",
        title: "Company Management System",
      },
      {
        id: "erp",
        title: "Enterprise Resource Planning (ERP) System",
      },
      {
        id: "accounting",
        title: "Accounting & Financial Management System",
      },
      {
        id: "compliance",
        title: "Business Compliance & Document Management System",
      },
    ],
  },
  {
    title: "Human Capital & Workforce Management",
    description: "Everything related to people, roles, and compensation.",
    icon: Users,
    items: [
      {
        id: "hrms",
        title: "Human Resource Management System (HRMS)",
      },
      {
        id: "payroll",
        title: "Payroll Management System",
      },
      {
        id: "user-access",
        title: "User Access & Role Management System",
      },
    ],
  },
  {
    title: "Sales, CRM & Relationship Management",
    description: "Customer, partner, and executive-level relationship tools.",
    icon: Handshake,
    items: [
      {
        id: "crm",
        title: "Customer Relationship Management (CRM) System",
      },
      {
        id: "sales-pipeline",
        title: "Sales Pipeline & Lead Management System",
      },
      {
        id: "client-portal",
        title: "Client & Partner Portal System",
      },
      {
        id: "founder-crm",
        title: "Founder & Executive CRM",
      },
    ],
  },
  {
    title: "Operations, Projects & Productivity",
    description: "Execution, collaboration, and internal workflows.",
    icon: CheckSquare,
    items: [
      {
        id: "project-management",
        title: "Project Management System",
      },
      {
        id: "task-collaboration",
        title: "Task & Team Collaboration System",
      },
      {
        id: "bpm",
        title: "Business Process Management System (BPM)",
      },
      {
        id: "workflow-automation",
        title: "Workflow Automation System",
      },
    ],
  },
  {
    title: "Finance, Billing & Subscription Systems",
    description: "Money flow, recurring revenue, and financial visibility.",
    icon: Banknote,
    items: [
      {
        id: "invoicing",
        title: "Invoicing & Billing System",
      },
      {
        id: "subscription",
        title: "Subscription Management System",
      },
      {
        id: "expense",
        title: "Expense & Budget Management System",
      },
      {
        id: "investment",
        title: "Investment & Portfolio Management System",
      },
    ],
  },
  {
    title: "Supply Chain, Assets & Operations Management",
    description: "Physical and digital resource control.",
    icon: Truck,
    items: [
      {
        id: "inventory",
        title: "Inventory & Supply Chain Management System",
      },
      {
        id: "asset-booking",
        title: "Asset & Resource Booking Management System",
      },
      {
        id: "logistics",
        title: "Logistics & Delivery Management System",
      },
    ],
  },
  {
    title: "Industry-Specific Management Systems",
    description: "Vertical-focused enterprise solutions.",
    icon: Store,
    items: [
      {
        id: "restaurant",
        title: "Restaurant Management System (RMS / POS)",
      },
      {
        id: "retail",
        title: "Retail Management System",
      },
      {
        id: "education",
        title: "Education Management System",
      },
      {
        id: "healthcare",
        title: "Healthcare / Clinic Management System",
      },
      {
        id: "property",
        title: "Property & Facility Management System",
      },
    ],
  },
  {
    title: "Data, Analytics & Business Intelligence",
    description: "Decision-making and performance insights.",
    icon: BarChart3,
    items: [
      {
        id: "bi",
        title: "Business Intelligence & Analytics Platform",
      },
      {
        id: "reporting",
        title: "Reporting & Dashboard Management System",
      },
      {
        id: "kpi",
        title: "Performance & KPI Tracking System",
      },
    ],
  },
  {
    title: "Security, Identity & Governance",
    description: "Enterprise security, compliance, and traceability.",
    icon: ShieldCheck,
    items: [
      {
        id: "iam",
        title: "Identity & Access Management (IAM) System",
      },
      {
        id: "audit",
        title: "Audit Log & Activity Monitoring System",
      },
    ],
  },
  {
    title: "Marketing, Branding & Growth Tools",
    description: "External presence, brand control, and outreach.",
    icon: Megaphone,
    items: [
      {
        id: "digital-card",
        title: "Digital Business Card Management System",
      },
      {
        id: "brand-asset",
        title: "Brand Asset Management System",
      },
      {
        id: "marketing-campaign",
        title: "Marketing Campaign Management System",
      },
    ],
  },
  {
    title: "Booking, Service & Customer Support Systems",
    description: "Service delivery and post-sales support.",
    icon: Headphones,
    items: [
      {
        id: "booking",
        title: "Appointment Booking & Scheduling System",
      },
      {
        id: "ticketing",
        title: "Service Request & Ticket Management System",
      },
      {
        id: "helpdesk",
        title: "Customer Support & Helpdesk System",
      },
    ],
  },
  {
    title: "SaaS Platform Infrastructure & Administration",
    description: "The backbone for running SaaS products at scale.",
    icon: Settings,
    items: [
      {
        id: "saas-admin",
        title: "SaaS Platform Management & Admin System",
      },
    ],
  },
];
