# FerroUI Business Associate Agreement (BAA) Template

**Version:** 1.0  
**Effective Date:** April 28, 2026

---

## 1. Introduction

This Business Associate Agreement ("BAA") is entered into by and between [Customer Name] ("Covered Entity") and the FerroUI Project Team ("Business Associate") to satisfy the requirements of the Health Insurance Portability and Accountability Act of 1996 ("HIPAA").

---

## 2. Definitions

- **Protected Health Information (PHI):** Any information that relates to the past, present, or future physical or mental health of an individual.
- **Security Rule:** The Security Standards for the Protection of Electronic Protected Health Information.

---

## 3. Obligations of Business Associate

### 3.1 Safeguards

Business Associate shall use appropriate safeguards to prevent the use or disclosure of PHI other than as provided for by this BAA.

### 3.2 Reporting

Business Associate shall report to Covered Entity any use or disclosure of PHI not provided for by this BAA of which it becomes aware, including breaches of unsecured PHI.

### 3.3 Access to PHI

Business Associate shall make PHI available to Covered Entity to provide an individual with access to their PHI in accordance with HIPAA.

---

## 4. Permitted Uses and Disclosures

Business Associate may use or disclose PHI only as necessary to perform the services set forth in the Service Agreement or as required by law.

---

## 5. Security for AI-Driven UI

For FerroUI specifically, Business Associate agrees to:

- Redact PII/PHI from tool outputs before they reach the LLM (Task B.6/D.4 related).
- Enforce strict audit logging with tamper detection for all data access events.
- Ensure all LLM providers used in the pipeline are also HIPAA compliant or provide BAA-compatible interfaces.
