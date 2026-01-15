import {
  Building2,
  Users,
  TrendingUp,
  Banknote,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface SoftwareSolutionItem {
  id: string;
  title: string;
}

export interface SoftwareSolutionCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  highlights: string[];
  expandedItems: SoftwareSolutionItem[];
}

export const softwareSolutionCategories: SoftwareSolutionCategory[] = [
  {
    id: "enterprise-core",
    title: "Enterprise Core & Operations Platform",
    tagline: "The operational backbone of your business",
    description: "Unified platforms that integrate core business processes, workflow automation, and resource management into a single powerful system.",
    icon: Building2,
    gradient: "from-violet-500 to-purple-600",
    highlights: [
      "ERP & Core Business Platforms",
      "Operations & Workflow Automation",
      "Supply Chain & Asset Management",
    ],
    expandedItems: [
      { id: "erp", title: "Enterprise Resource Planning (ERP) System" },
      { id: "company-management", title: "Company Management System" },
      { id: "bpm", title: "Business Process Management System (BPM)" },
      { id: "workflow-automation", title: "Workflow Automation System" },
      { id: "project-management", title: "Project Management System" },
      { id: "task-collaboration", title: "Task & Team Collaboration System" },
      { id: "inventory", title: "Inventory & Supply Chain Management System" },
      { id: "logistics", title: "Logistics & Delivery Management System" },
      { id: "asset-booking", title: "Asset & Resource Booking Management System" },
    ],
  },
  {
    id: "people-identity",
    title: "People, Identity & Access",
    tagline: "Empower your workforce, secure your systems",
    description: "Comprehensive solutions for workforce management, identity governance, and role-based access control that signal enterprise readiness.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    highlights: [
      "Workforce & Payroll Systems",
      "Identity, Roles & Access Control",
      "Compliance & Audit Frameworks",
    ],
    expandedItems: [
      { id: "hrms", title: "Human Resource Management System (HRMS)" },
      { id: "payroll", title: "Payroll Management System" },
      { id: "user-access", title: "User Access & Role Management System" },
      { id: "iam", title: "Identity & Access Management (IAM) System" },
      { id: "audit", title: "Audit Log & Activity Monitoring System" },
      { id: "compliance", title: "Business Compliance & Document Management System" },
    ],
  },
  {
    id: "revenue-sales",
    title: "Revenue, Sales & Customer Platforms",
    tagline: "Drive growth and customer success",
    description: "End-to-end platforms for managing customer relationships, accelerating sales, and delivering exceptional service experiences.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500",
    highlights: [
      "CRM & Sales Enablement",
      "Marketing & Growth Platforms",
      "Customer Service & Engagement",
    ],
    expandedItems: [
      { id: "crm", title: "Customer Relationship Management (CRM) System" },
      { id: "sales-pipeline", title: "Sales Pipeline & Lead Management System" },
      { id: "client-portal", title: "Client & Partner Portal System" },
      { id: "founder-crm", title: "Founder & Executive CRM" },
      { id: "marketing-campaign", title: "Marketing Campaign Management System" },
      { id: "brand-asset", title: "Brand Asset Management System" },
      { id: "digital-card", title: "Digital Business Card Management System" },
      { id: "booking", title: "Appointment Booking & Scheduling System" },
      { id: "ticketing", title: "Service Request & Ticket Management System" },
      { id: "helpdesk", title: "Customer Support & Helpdesk System" },
    ],
  },
  {
    id: "finance-monetization",
    title: "Finance & Monetization Systems",
    tagline: "Master your financial operations",
    description: "Complete financial management suite covering billing, subscriptions, expense tracking, and investment oversight.",
    icon: Banknote,
    gradient: "from-amber-500 to-orange-500",
    highlights: [
      "Billing & Subscriptions",
      "Financial Management & Reporting",
      "Investment & Portfolio Oversight",
    ],
    expandedItems: [
      { id: "invoicing", title: "Invoicing & Billing System" },
      { id: "subscription", title: "Subscription Management System" },
      { id: "accounting", title: "Accounting & Financial Management System" },
      { id: "expense", title: "Expense & Budget Management System" },
      { id: "investment", title: "Investment & Portfolio Management System" },
    ],
  },
  {
    id: "data-analytics",
    title: "Data, Analytics & Intelligence",
    tagline: "Transform data into decisions",
    description: "Business intelligence platforms that turn raw data into actionable insights, powering smarter decisions across your organization.",
    icon: BarChart3,
    gradient: "from-pink-500 to-rose-500",
    highlights: [
      "BI & Analytics Platforms",
      "Dashboards & KPI Tracking",
    ],
    expandedItems: [
      { id: "bi", title: "Business Intelligence & Analytics Platform" },
      { id: "reporting", title: "Reporting & Dashboard Management System" },
      { id: "kpi", title: "Performance & KPI Tracking System" },
    ],
  },
  {
    id: "industry-saas",
    title: "Industry & SaaS Platforms",
    tagline: "Vertical solutions, horizontal scale",
    description: "Purpose-built solutions for specific industries combined with the architecture to run SaaS products at scale.",
    icon: Layers,
    gradient: "from-indigo-500 to-violet-500",
    highlights: [
      "Vertical Solutions (Retail, Healthcare, Education)",
      "SaaS Platform Architecture & Administration",
    ],
    expandedItems: [
      { id: "restaurant", title: "Restaurant Management System (RMS / POS)" },
      { id: "retail", title: "Retail Management System" },
      { id: "education", title: "Education Management System" },
      { id: "healthcare", title: "Healthcare / Clinic Management System" },
      { id: "property", title: "Property & Facility Management System" },
      { id: "saas-admin", title: "SaaS Platform Management & Admin System" },
    ],
  },
];

// Calculate total solutions
export const totalSolutions = softwareSolutionCategories.reduce(
  (acc, cat) => acc + cat.expandedItems.length,
  0
);
