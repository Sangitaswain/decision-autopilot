# Decision Autopilot - Architecture

## System Overview

Decision Autopilot is a multi-agent decision orchestration system that helps analyze high-stakes decisions through a pipeline of specialized AI agents.

## Architecture Diagram

```mermaid
graph TD
    subgraph Frontend["Frontend (React + TypeScript)"]
        UI[User Interface]
        API[API Client]
        FD[features/decision]
        FA[features/adversarial]
        FE[features/experiments]
        FV[features/verdict]
    end
    
    subgraph Backend["Backend (FastAPI)"]
        Routes[API Routes]
        Orch[Orchestrator]
        
        subgraph Agents["AI Agents"]
            A1[Decomposer]
            A2[Adversarial]
            A3[Experiment Planner]
            A4[Confidence]
            A5[Stakeholder]
        end
        
        Gemini[Gemini Service]
    end
    
    UI --> API
    API --> Routes
    Routes --> Orch
    Orch --> A1
    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> A5
    
    A1 --> Gemini
    A2 --> Gemini
    A3 --> Gemini
    A4 --> Gemini
    A5 --> Gemini
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite |
| Backend | Python, FastAPI, Pydantic |
| AI | Google Gemini API |
| Styling | Tailwind CSS |

## Design Principles

1. **Agent Separation**: Each AI agent has its own file with a single responsibility
2. **Feature-Based Frontend**: UI mirrors backend agent structure for easy reasoning
3. **Explicit Orchestration**: Pipeline flow is clearly defined in `orchestrator.py`
4. **Type Safety**: Pydantic (backend) and TypeScript (frontend) enforce data contracts
